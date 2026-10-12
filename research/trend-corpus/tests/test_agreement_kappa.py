"""F03: agreement_kappa.py (2025) and agreement_kappa_backfill.py (2022-2024)."""
import collections, csv, io, json, os, unittest
from support import Case, TC, put, csv_text, jsonl, sha, SENTINEL

CORPUS_H = ["work_id", "doi", "title", "ai_lit_class", "audience_role", "stage", "method", "ai_lit_dims"]
CLASSES = ["A", "B", "C", "A", "B", "C", "A", "unknown"]


def corpus_rows(prefix, n=8):
    return [[f"{prefix}{i}", "", "T", CLASSES[i % 8], "student", "primary", "survey", "S-BAS" if i % 2 else ""]
            for i in range(1, n + 1)]


def code2(wid, cls="A", **kw):
    o = {"work_id": wid, "ai_lit_class": cls, "b_subtype": "", "audience_role": "student", "stage": "primary",
         "ai_lit_dims": ["S-BAS"], "level": "apply", "topic": ["none"], "method": "survey", "outcome_measured": "",
         "genai_flag": "no", "ai_lit_note": "", "rationale": "synthetic", "model_id": "m"}
    o.update(kw)
    return o


class Kappa2025(Case):
    """python3 -I agreement_kappa.py corpus.csv, run in a dir holding sample.json and out/."""
    OUT = ["agreement.csv"]

    def fixture(self, batches=None, sample=None):
        rows = corpus_rows("W")
        put(self.p("corpus.csv"), csv_text(CORPUS_H, rows))
        ids = [r[0] for r in rows]
        put(self.p("sample.json"), json.dumps(sample if sample is not None else [{"work_id": i} for i in ids]))
        if batches is None:
            batches = {"batch1.jsonl": [code2(i, CLASSES[k % 8]) for k, i in enumerate(ids[:4], 1)],
                       "batch2.jsonl": [code2(i, "A") for i in ids[4:]]}
        if os.path.isdir(self.p("out")):
            for f in os.listdir(self.p("out")):
                os.remove(self.p("out", f))
        for name, objs in batches.items():
            put(self.p("out", name), jsonl(objs) if isinstance(objs, list) else objs)
        return ids

    def run_(self, *extra):
        return self.run_script("agreement_kappa.py", "corpus.csv", *extra)

    def test_legal_unique_sample_updates_output(self):
        self.fixture()
        self.plant("agreement.csv")
        r = self.run_()
        self.assert_ok(r)
        b = self.read("agreement.csv")
        self.assertNotEqual(b, SENTINEL)
        self.assertTrue(b.startswith(b"dimension,n,agree,kappa,"))
        self.assertEqual(b.count(b"\r\n"), b.count(b"\n"), "2025 agreement.csv keeps csv default CRLF")
        self.assertNotIn(b"\r\r\n", b)
        rows = list(csv.reader(io.StringIO(b.decode("utf-8"), newline="")))
        self.assertEqual(rows[1][:2], ["A vs non-A", "8"])

    def test_windows_default_text_mode_same_bytes(self):
        self.fixture()
        put(self.p("corpus.csv"), csv_text(CORPUS_H, [r[:2] + ["Tïtle – “κ” 中文"] + r[3:] for r in corpus_rows("W")]))
        self.same_bytes_on_windows_text_mode(lambda win: self.run_script("agreement_kappa.py", "corpus.csv", win=win), self.OUT)
        self.assertNotIn(b"\r\r\n", self.read("agreement.csv"))

    def test_conflicting_duplicate_across_files_both_orders(self):
        for early in (True, False):
            with self.subTest(conflict_in_earlier_batch=early):
                self.fresh()
                ids = [f"W{i}" for i in range(1, 9)]
                good = {"batch1.jsonl": [code2(i) for i in ids[:4]], "batch2.jsonl": [code2(i) for i in ids[4:]]}
                good["batch0.jsonl" if early else "batch3.jsonl"] = [code2(ids[0], "C")]
                self.fixture(batches=good)
                self.plant("agreement.csv")
                want = "batch0.jsonl:1 and batch1.jsonl:1" if early else "batch1.jsonl:1 and batch3.jsonl:1"
                self.assert_rejected(self.run_(), self.OUT, stderr_has=f"{ids[0]}: duplicate second coding at {want}")

    def test_identical_duplicate_rejected(self):
        ids = self.fixture()
        objs = [code2(i) for i in ids]
        self.fixture(batches={"batch1.jsonl": objs, "batch2.jsonl": [code2(ids[2])]})
        self.plant("agreement.csv")
        self.assert_rejected(self.run_(), self.OUT, stderr_has="batch1.jsonl:3 and batch2.jsonl:1")

    def test_duplicate_within_one_file_rejected(self):
        ids = self.fixture()
        self.fixture(batches={"batch1.jsonl": [code2(i) for i in ids] + [code2(ids[5], "C")]})
        self.plant("agreement.csv")
        self.assert_rejected(self.run_(), self.OUT, stderr_has="batch1.jsonl:6 and batch1.jsonl:9")

    def test_rejections_without_existing_output(self):
        ids = self.fixture()
        self.fixture(batches={"batch1.jsonl": [code2(i) for i in ids] + [code2(ids[0])]})
        self.assert_rejected(self.run_(), self.OUT, planted=False)

    def test_extra_work_id_not_in_sample_rejected(self):
        ids = self.fixture()
        self.fixture(batches={"batch1.jsonl": [code2(i) for i in ids] + [code2("W999")]})
        self.plant("agreement.csv")
        self.assert_rejected(self.run_(), self.OUT, stderr_has="W999: second coding in out/ is not in sample.json")

    def test_partial_rejected_by_default(self):
        ids = self.fixture()
        self.fixture(batches={"batch1.jsonl": [code2(i) for i in ids[:-1]]})
        self.plant("agreement.csv")
        self.assert_rejected(self.run_(), self.OUT, stderr_has="1 sampled work_id(s) have no second coding")
        self.assertFalse(os.path.exists(self.p("agreement.partial.csv")))

    def test_allow_partial_writes_partial_names_only(self):
        ids = self.fixture()
        self.fixture(batches={"batch1.jsonl": [code2(i) for i in ids[:-1]]})
        self.plant("agreement.csv")
        r = self.run_("--allow-partial")
        self.assert_ok(r)
        self.assertEqual(self.read("agreement.csv"), SENTINEL)
        self.assertTrue(self.read("agreement.partial.csv").startswith(b"dimension,"))
        self.assertEqual(self.read("partial-missing.txt"), (ids[-1] + "\n").encode())

    def test_bad_sample_rejected(self):
        cases = {"dup": lambda ids: [{"work_id": i} for i in ids] + [{"work_id": ids[0]}],
                 "empty": lambda ids: [{"work_id": i} for i in ids] + [{"work_id": " "}],
                 "nonstring": lambda ids: [{"work_id": i} for i in ids] + [{"work_id": 7}],
                 "missing_key": lambda ids: [{"work_id": i} for i in ids] + [{}],
                 "no_corpus_record": lambda ids: [{"work_id": i} for i in ids] + [{"work_id": "W404"}]}
        for name, make in cases.items():
            with self.subTest(name):
                self.fresh()
                ids = self.fixture()
                put(self.p("sample.json"), json.dumps(make(ids)))
                self.plant("agreement.csv")
                self.assert_rejected(self.run_(), self.OUT)

    def test_bad_batch_line_reports_location(self):
        ids = self.fixture()
        self.fixture(batches={"batch1.jsonl": jsonl([code2(i) for i in ids]) + "{not json\n"})
        self.plant("agreement.csv")
        self.assert_rejected(self.run_(), self.OUT, stderr_has="batch1.jsonl:9: bad JSON")


BF_H = CORPUS_H


class Backfill(Case):
    """python3 -I agreement_kappa_backfill.py <trend-corpus root>, run in a dir holding sample.json and out/."""
    OUT = ["agreement.csv", "coding2.csv"]

    def fixture(self, batches=None, sample=None):
        root = self.p("root")
        put(os.path.join(root, "prompts", "code2.md"), b"synthetic prompt\r\nline two\n")
        sample_ = []
        for y in (2022, 2023, 2024):
            rows = corpus_rows(f"W{y}", 4)
            put(os.path.join(root, str(y), "corpus.csv"), csv_text(BF_H, rows))
            sample_ += [{"year": y, "work_id": r[0], "stratum_class": r[3], "stratum_stage": "primary"} for r in rows]
        put(self.p("sample.json"), json.dumps(sample if sample is not None else sample_, indent=1))
        ids = [s["work_id"] for s in sample_]
        if batches is None:
            batches = {"batch1.jsonl": [code2(i, "A") for i in ids[:6]], "batch2.jsonl": [code2(i, "B") for i in ids[6:]]}
        if os.path.isdir(self.p("out")):
            for f in os.listdir(self.p("out")):
                os.remove(self.p("out", f))
        for name, objs in batches.items():
            put(self.p("out", name), jsonl(objs))
        return ids, sample_

    def run_(self, *extra, win=False):
        return self.run_script("agreement_kappa_backfill.py", self.p("root"), *extra, win=win)

    def test_legal_updates_both_outputs(self):
        ids, _ = self.fixture()
        self.plant(*self.OUT)
        self.assert_ok(self.run_())
        a, c = self.read("agreement.csv"), self.read("coding2.csv")
        self.assertNotIn(b"\r", a + c)
        rows = list(csv.DictReader(io.StringIO(c.decode("utf-8"))))
        self.assertEqual([r["work_id"] for r in rows], ids)
        self.assertEqual(rows[0]["batch_id"], "CB-1")
        self.assertEqual(rows[-1]["batch_id"], "CB-2")
        self.assertEqual(rows[0]["prompt_sha256"], sha(b"synthetic prompt\r\nline two\n"))
        agr = list(csv.DictReader(io.StringIO(a.decode("utf-8"))))
        self.assertEqual({r["subset"] for r in agr}, {"all_sampled_2022-2024", "year_2022", "year_2023", "year_2024"})

    def test_windows_default_text_mode_same_bytes(self):
        ids, _ = self.fixture(batches={"batch1.jsonl": [code2(i, rationale="Lehrkräfte – “κ” 中小學 café") for i in
                                                        [f"W{y}{k}" for y in (2022, 2023, 2024) for k in range(1, 5)]]})
        self.same_bytes_on_windows_text_mode(lambda win: self.run_(win=win), self.OUT)
        self.assertIn("中小學".encode("utf-8"), self.read("coding2.csv"))

    def test_kappa_matches_independent_computation(self):
        ids, sample = self.fixture()
        self.assert_ok(self.run_())
        agr = {(r["dimension"], r["subset"]): r for r in csv.DictReader(io.StringIO(self.read("agreement.csv").decode("utf-8")))}
        first = {s["work_id"]: s["stratum_class"] for s in sample}
        second = {i: ("A" if k < 6 else "B") for k, i in enumerate(ids)}
        a, b = [first[i] for i in ids], [second[i] for i in ids]
        n = len(a)
        po = sum(x == y for x, y in zip(a, b)) / n
        pe = sum(a.count(c) * b.count(c) for c in set(a) | set(b)) / n / n
        row = agr[("A/B/C/unknown", "all_sampled_2022-2024")]
        self.assertEqual((row["n"], row["agree"], row["kappa"]), (str(n), str(round(po, 3)), str(round((po - pe) / (1 - pe), 3))))

    def test_unencodable_text_fails_before_any_write(self):
        """A lone surrogate in a batch cannot be written as UTF-8: the run fails and both outputs stay intact."""
        ids, _ = self.fixture()
        objs = [code2(i) for i in ids]
        lines = jsonl(objs).replace('"rationale": "synthetic"', '"rationale": "bad \\ud800 text"', 1)
        put(self.p("out", "batch1.jsonl"), lines)
        os.remove(self.p("out", "batch2.jsonl"))
        self.plant(*self.OUT)
        r = self.run_()
        self.assert_rejected(r, self.OUT, stderr_has="UnicodeEncodeError")

    def test_conflicting_duplicate_rejected_both_outputs_kept(self):
        ids, _ = self.fixture()
        self.fixture(batches={"batch1.jsonl": [code2(i, "A") for i in ids], "batch2.jsonl": [code2(ids[0], "B")]})
        self.plant(*self.OUT)
        self.assert_rejected(self.run_(), self.OUT, stderr_has=f"{ids[0]}: duplicate second coding at batch1.jsonl:1 and batch2.jsonl:1")

    def test_conflict_in_earlier_batch_rejected(self):
        ids, _ = self.fixture()
        self.fixture(batches={"batch0.jsonl": [code2(ids[0], "B")], "batch1.jsonl": [code2(i, "A") for i in ids]})
        self.plant(*self.OUT)
        self.assert_rejected(self.run_(), self.OUT, stderr_has="batch0.jsonl:1 and batch1.jsonl:1")

    def test_identical_duplicate_rejected(self):
        ids, _ = self.fixture()
        self.fixture(batches={"batch1.jsonl": [code2(i) for i in ids] + [code2(ids[3])]})
        self.plant(*self.OUT)
        self.assert_rejected(self.run_(), self.OUT)

    def test_year_mismatch_and_bad_year_rejected(self):
        for bad in (2023, 2025, "2022", None):
            with self.subTest(year=bad):
                self.fresh()
                ids, s = self.fixture()
                s[0]["year"] = bad
                put(self.p("sample.json"), json.dumps(s))
                self.plant(*self.OUT)
                self.assert_rejected(self.run_(), self.OUT, stderr_has=ids[0])

    def test_sample_duplicate_and_missing_corpus_rejected(self):
        for name in ("dup", "nocorpus", "nonstring"):
            with self.subTest(name):
                self.fresh()
                ids, s = self.fixture()
                extra = {"dup": dict(s[0]), "nocorpus": dict(s[0], work_id="W404"), "nonstring": dict(s[0], work_id=5)}[name]
                put(self.p("sample.json"), json.dumps(s + [extra]))
                self.plant(*self.OUT)
                self.assert_rejected(self.run_(), self.OUT)

    def test_extra_and_partial(self):
        ids, _ = self.fixture()
        self.fixture(batches={"batch1.jsonl": [code2(i) for i in ids] + [code2("W1")]})
        self.plant(*self.OUT)
        self.assert_rejected(self.run_(), self.OUT, stderr_has="W1: second coding in out/ is not in sample.json")
        put(self.p("out", "batch1.jsonl"), jsonl([code2(i) for i in ids[1:]]))
        self.assert_rejected(self.run_(), self.OUT)
        r = self.run_("--allow-partial")
        self.assert_ok(r)
        for n in self.OUT:
            self.assertEqual(self.read(n), SENTINEL)
        self.assertEqual(self.read("partial-missing.txt"), (ids[0] + "\n").encode())
        self.assertIn(ids[1].encode(), self.read("coding2.partial.csv"))

    def test_second_temp_write_failure_keeps_both(self):
        """A failure while writing the second temp file leaves both outputs untouched."""
        ids, _ = self.fixture()
        self.plant(*self.OUT)
        hook = self.p("hook")
        put(os.path.join(hook, "sitecustomize_hook.py"), (
            "import os, runpy, sys\n"
            "real = os.fdopen\n"
            "n = [0]\n"
            "def fdopen(*a, **k):\n"
            "    n[0] += 1\n"
            "    if n[0] == 2: raise OSError('injected: second temp write failed')\n"
            "    return real(*a, **k)\n"
            "os.fdopen = fdopen\n"
            "sys.argv = sys.argv[1:]\n"
            "runpy.run_path(sys.argv[0], run_name='__main__')\n"))
        import subprocess, sys
        from support import SCRIPTS
        r = subprocess.run([sys.executable, "-I", os.path.join(hook, "sitecustomize_hook.py"),
                            os.path.join(SCRIPTS, "agreement_kappa_backfill.py"), self.p("root")],
                           cwd=self.d, capture_output=True)
        self.assert_rejected(r, self.OUT, stderr_has="injected")


class TrackedRoundtrip(Case):
    """Self-consistency gate: batches rebuilt from tracked coding2.csv reproduce tracked outputs.

    This checks serialisation and determinism only; it cannot show whether the original
    private batches contained duplicates.
    """

    def rebuild(self, rows, keys, lists):
        by = collections.defaultdict(list)
        for x in rows:
            o = {k: x.get(k, "") for k in keys}
            for k in lists:
                o[k] = [t for t in x[k].split(";") if t]
            by[x["batch_id"]].append(o)
        for b, items in by.items():
            put(self.p("out", "batch" + b.split("-")[-1] + ".jsonl"), jsonl(items))

    def test_backfill_byte_identical(self):
        src = os.path.join(TC, "backfill-2022-2024")
        with open(os.path.join(src, "sample.json"), "rb") as f:
            put(self.p("sample.json"), f.read())
        with open(os.path.join(src, "coding2.csv"), encoding="utf-8", newline="") as f:
            rows = list(csv.DictReader(f))
        self.rebuild(rows, ["work_id", "ai_lit_class", "b_subtype", "audience_role", "stage", "level", "method",
                            "outcome_measured", "genai_flag", "ai_lit_note", "rationale", "model_id"], ["ai_lit_dims", "topic"])
        r = self.run_script("agreement_kappa_backfill.py", TC)
        self.assert_ok(r)
        for n in ("coding2.csv", "agreement.csv"):
            with open(os.path.join(src, n), "rb") as f:
                self.assertEqual(sha(self.read(n)), sha(f.read()), n)

    def test_2025_values_match_tracked(self):
        with open(os.path.join(TC, "2025", "coding2.csv"), encoding="utf-8", newline="") as f:
            rows = list(csv.DictReader(f))
        put(self.p("sample.json"), json.dumps([{"work_id": x["work_id"]} for x in rows]))
        self.rebuild(rows, ["work_id", "ai_lit_class", "b_subtype", "audience_role", "stage", "level", "method",
                            "outcome_measured", "genai_flag", "model_id"], ["ai_lit_dims"])
        r = self.run_script("agreement_kappa.py", os.path.join(TC, "2025", "corpus-v2.csv"))
        self.assert_ok(r)
        mine = {x[0]: x[1:] for x in csv.reader(io.StringIO(self.read("agreement.csv").decode("utf-8"), newline=""))}
        with open(os.path.join(TC, "2025", "agreement.csv"), encoding="utf-8", newline="") as f:
            tracked = [x for x in csv.reader(f) if x[-1] == "all_sampled"]
        # Known, documented differences: S-LRN changed after ERR-004 (report-2025-draft.md:426);
        # T-ETH / S-SYS kappa is left blank in the tracked file by the "<5 positives" report rule.
        known = {"dim S-LRN", "dim T-ETH", "dim S-SYS"}
        same = [x[0] for x in tracked if x[0] not in known and mine.get(x[0]) == x[1:10]]
        self.assertEqual(len(same), len(tracked) - len(known), [x[0] for x in tracked])


if __name__ == "__main__":
    unittest.main()


class NoEcho(Case):
    """W5: values taken from coder batches (model output) never reach stdout/stderr; invalid values are rejected."""
    SECRET = "SENTINEL restricted abstract text"

    def fixture(self, entry, mutate):
        ids = [f"W{i}" for i in range(1, 7)]
        if entry == "2025":
            put(self.p("corpus.csv"), csv_text(CORPUS_H, corpus_rows("W", 6)))
            put(self.p("sample.json"), json.dumps([{"work_id": w} for w in ids]))
            script, args = "agreement_kappa.py", ["corpus.csv"]
        else:
            put(self.p("root", "prompts", "code2.md"), b"p")
            sample, ids = [], []
            for y in (2022, 2023, 2024):
                rows = corpus_rows(f"W{y}", 2)
                put(self.p("root", str(y), "corpus.csv"), csv_text(CORPUS_H, rows))
                sample += [{"year": y, "work_id": r[0], "stratum_class": r[3], "stratum_stage": "primary"} for r in rows]
                ids += [r[0] for r in rows]
            put(self.p("sample.json"), json.dumps(sample))
            script, args = "agreement_kappa_backfill.py", [self.p("root")]
        put(self.p("out", "batch1.jsonl"), jsonl(mutate([code2(w) for w in ids])))
        return script, args

    def run_case(self, entry, mutate):
        script, args = self.fixture(entry, mutate)
        r = self.run_script(script, *args)
        out = (r.stdout + r.stderr).decode("utf-8", "replace")
        self.assertNotIn("SENTINEL", out)
        self.assertNotIn("restricted abstract", out)
        return r, out

    def test_batch_values_never_echoed(self):
        S = self.SECRET
        cases = {
            "duplicate work_id": (lambda o: o + [code2(S), code2(S)], 1, "duplicate second coding"),
            "work_id not in sample": (lambda o: o + [code2(S)], 1, "is not in sample.json"),
            "invalid ai_lit_class": (lambda o: [dict(o[0], ai_lit_class=S)] + o[1:], 1, "batch1.jsonl:1: ai_lit_class value not allowed"),
            "invalid audience_role": (lambda o: [dict(o[0], audience_role=S)] + o[1:], 1, "audience_role value not allowed"),
            "invalid stage": (lambda o: [dict(o[0], stage=S)] + o[1:], 1, "stage value not allowed"),
            "invalid method": (lambda o: [dict(o[0], method=S)] + o[1:], 1, "method value not allowed"),
            "invalid dim": (lambda o: [dict(o[0], ai_lit_dims=["S-BAS", S])] + o[1:], 1, "ai_lit_dims value not allowed"),
            "non-string class": (lambda o: [dict(o[0], ai_lit_class={"x": S})] + o[1:], 1, "ai_lit_class value not allowed"),
            "model_id (legal run)": (lambda o: [dict(x, model_id=S) for x in o], 0, "model_ids"),
        }
        for entry in ("2025", "backfill"):
            for name, (mutate, code, expect) in cases.items():
                with self.subTest(entry=entry, case=name):
                    self.fresh()
                    if code:
                        self.plant(*(["agreement.csv"] if entry == "2025" else ["agreement.csv", "coding2.csv"]))
                    r, out = self.run_case(entry, mutate)
                    self.assertEqual(r.returncode, code, out)
                    self.assertIn(expect, out)
                    if code:
                        self.assertEqual(self.read("agreement.csv"), SENTINEL)

    def test_ordinary_ids_still_shown(self):
        r, out = self.run_case("2025", lambda o: o + [code2("W999")])
        self.assertIn("W999: second coding in out/ is not in sample.json", out)
        r, out = self.run_case("2025", lambda o: [dict(x, model_id="claude-x-1.0") for x in o])
        self.assertEqual(r.returncode, 0)
        self.assertIn("'claude-x-1.0': 6", out)

    def test_missing_optional_fields_still_accepted(self):
        r, out = self.run_case("2025", lambda o: [dict(x, audience_role="", stage=None, method="", ai_lit_dims="") for x in o])
        self.assertEqual(r.returncode, 0, out)
