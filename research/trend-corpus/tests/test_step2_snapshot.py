"""D3: step2_snapshot.py must not write a snapshot after a failed page or a repeated cursor."""
import json, os, shutil, unittest
from support import Case, SCRIPTS, put, csv_text


class Step2Snapshot(Case):
    """Runs a copy of the scripts inside a synthetic trend-corpus tree, so the real frozen snapshots are never at risk."""

    def setUp(self):
        super().setUp()
        self.root = self.p("tc")
        for f in ("step2_snapshot.py", "oa.py", "safeio.py"):
            os.makedirs(self.p("tc", "scripts"), exist_ok=True)
            shutil.copy(os.path.join(SCRIPTS, f), self.p("tc", "scripts", f))
        put(self.p("tc", "journals.csv"), csv_text(["journal_code", "in_panel", "source_id_2025"], [["J1", "yes", "S1"]]))
        for d in ("2025", "rerun-dev001"):
            put(self.p("tc", d, "ids-corpus.json"), b"[]")

    def run_(self, out, spec=None):
        return self.run_mock(spec or {}, os.path.join(self.root, "scripts", "step2_snapshot.py"), out)

    def snapshot_files(self, out):
        got = []
        for r, ds, fs in os.walk(out):
            ds[:] = [d for d in ds if d != "__pycache__"]
            got += [os.path.relpath(os.path.join(r, f), out) for f in fs]
        return sorted(got)

    def test_complete_run_writes_snapshot(self):
        r = self.run_(self.p("out"))
        self.assert_ok(r)
        files = self.snapshot_files(self.p("out"))
        self.assertIn("step2-summary.json", files)
        self.assertIn(os.path.join("2022", "ids-corpus.json"), files)
        self.assertIn(os.path.join("2025", "queries.json"), files)
        self.assertNotIn("step2-incomplete.json", files)

    def test_repeated_cursor_fails_after_second_request(self):
        page = {"json": {"meta": {"count": 3, "next_cursor": "c1"}, "results": [{"id": "https://openalex.org/W1"}]}}
        r = self.run_(self.p("out"), {"calls": {"1": page, "2": page}})
        self.assertNotEqual(r.returncode, 0)
        self.assertIn("repeated cursor after page 2", r.stderr.decode())
        self.assertEqual(len(self.mock_calls()), 2)
        self.assertEqual(self.snapshot_files(self.p("out")), ["step2-incomplete.json"])
        info = json.loads(self.read(os.path.join("out", "step2-incomplete.json")))
        self.assertEqual((info["status"], info["pages"]), ("incomplete", 2))
        self.assert_no_temps()

    def test_mid_query_http_error_is_incomplete(self):
        page = {"json": {"meta": {"count": 300, "next_cursor": "c1"}, "results": [{"id": "https://openalex.org/W1"}]}}
        r = self.run_(self.p("out"), {"calls": {"1": page, "2": {"http": 503}, "3": {"http": 503}}})
        self.assertNotEqual(r.returncode, 0)
        self.assertIn("HTTP 503 on page 2", r.stderr.decode())
        self.assertEqual(self.snapshot_files(self.p("out")), ["step2-incomplete.json"])

    def test_failure_keeps_an_earlier_complete_snapshot(self):
        self.assert_ok(self.run_(self.p("out")))
        before = {f: self.read(os.path.join("out", f)) for f in self.snapshot_files(self.p("out"))}
        r = self.run_(self.p("out"), {"fail_from": {"n": 5, "action": {"http": 500}}})
        self.assertNotEqual(r.returncode, 0)
        for f, b in before.items():
            self.assertEqual(self.read(os.path.join("out", f)), b, f)

    def test_refuses_frozen_snapshot_dirs(self):
        for out in (self.root, os.path.join(self.root, "2025"), os.path.join(self.root, "rerun-dev001"),
                    os.path.join(self.root, "2023", "sub")):
            with self.subTest(out=os.path.relpath(out, self.d)):
                before = self.snapshot_files(self.root)
                r = self.run_(out)
                self.assertNotEqual(r.returncode, 0)
                self.assertIn("refusing to write a snapshot into frozen", r.stderr.decode())
                self.assertEqual(self.snapshot_files(self.root), before)
                self.assertEqual(self.mock_calls(), [])


if __name__ == "__main__":
    unittest.main()
