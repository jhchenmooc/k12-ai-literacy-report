"""Shared write helper: all temps before any replace, no leftovers on failure, exact bytes."""
import os, sys, unittest
from unittest import mock
from support import Case, SCRIPTS, put, SENTINEL

sys.path.insert(0, SCRIPTS)
import safeio  # noqa: E402


class SafeIO(Case):
    def test_writes_exact_bytes_and_replaces(self):
        self.plant("a.csv")
        safeio.write_atomic([(self.p("a.csv"), b"x,y\r\n1,2\r\n"), (self.p("b.json"), "é\n".encode())])
        self.assertEqual(self.read("a.csv"), b"x,y\r\n1,2\r\n")
        self.assertEqual(self.read("b.json"), "é\n".encode())
        self.assert_no_temps()

    def test_failure_on_second_temp_keeps_everything(self):
        self.plant("a.csv", "b.csv")
        real = os.fdopen
        calls = []

        def fdopen(*a, **k):
            calls.append(1)
            if len(calls) == 2:
                raise OSError("injected")
            return real(*a, **k)
        with mock.patch.object(safeio.os, "fdopen", fdopen), self.assertRaises(OSError):
            safeio.write_atomic([(self.p("a.csv"), b"new"), (self.p("b.csv"), b"new")])
        self.assertEqual(self.read("a.csv"), SENTINEL)
        self.assertEqual(self.read("b.csv"), SENTINEL)
        self.assertEqual(sorted(os.listdir(self.d)), ["a.csv", "b.csv"])

    def test_no_replace_before_all_temps_written(self):
        order = []
        real_replace, real_fdopen = os.replace, os.fdopen
        with mock.patch.object(safeio.os, "replace", lambda a, b: (order.append("replace"), real_replace(a, b))), \
             mock.patch.object(safeio.os, "fdopen", lambda *a, **k: (order.append("temp"), real_fdopen(*a, **k))[1]):
            safeio.write_atomic([(self.p("a"), b"1"), (self.p("b"), b"2"), (self.p("c"), b"3")])
        self.assertEqual(order, ["temp", "temp", "temp", "replace", "replace", "replace"])

    def test_csv_bytes_line_endings(self):
        self.assertEqual(safeio.csv_bytes(["a", "b"], [[1, None]]), b"a,b\r\n1,\r\n")
        self.assertEqual(safeio.csv_bytes(["a"], [["x\ny"]], lineterminator="\n"), b'a\n"x\ny"\n')

    def test_read_batches_reports_every_duplicate_with_location(self):
        put(self.p("out", "batch1.jsonl"), '{"work_id":"W1","v":1}\n\n{"work_id":"W2"}\n')
        put(self.p("out", "batch2.jsonl"), '{"work_id":"W1","v":1}\n{"work_id":""}\nnot json\n')
        errors = []
        got = safeio.read_jsonl_batches([self.p("out", "batch1.jsonl"), self.p("out", "batch2.jsonl")], errors)
        self.assertEqual(sorted(got), ["W1", "W2"])
        self.assertEqual(errors[0], "W1: duplicate second coding at batch1.jsonl:1 and batch2.jsonl:1")
        self.assertEqual(errors[1], "batch2.jsonl:2: missing, empty or non-string work_id")
        self.assertTrue(errors[2].startswith("batch2.jsonl:3: bad JSON"))


if __name__ == "__main__":
    unittest.main()
