"""F10: agreement_inputs.py must not write inputs.json when an abstract cannot be matched to its hash."""
import hashlib, json, os, re, subprocess, sys, unittest
from support import Case, SCRIPTS, MOCKRUN, TESTS, put, csv_text, sha, SENTINEL

OUT = ["inputs.json"]
SCRIPT = os.path.join(SCRIPTS, "agreement_inputs.py")
# norm() must stay byte-identical: corpus abstract_sha256 values were computed with it (REPAIR-PLAN F10/F11).
NORM_SHA256 = "eac3c9ca63b482f51abf9365bdbfa018840bf0186c821be70384d3c3d46ec5ff"


def norm_source():
    with open(SCRIPT, encoding="utf-8") as f:
        s = f.read()
    a = s.index("def norm")
    return s[a:s.index("\n", s.index("return re.sub", a)) + 1]


_ns = {"re": re}
exec(norm_source(), _ns)
norm = _ns["norm"]
h = lambda text: hashlib.sha256(norm(text).encode()).hexdigest()

TEXT = {
    "S1": "Abstract: Synthetic primary pupils – “AI literacy” in 中小學 classrooms; κ reported for café talk. © 2025 Elsevier Ltd.",
    "S2": "Synthetic secondary teachers designed lessons on machine learning with plain ASCII text only.",
    "O1": "Synthetic kindergarten robots study with Lehrkräfte and résumé words.",
    "O2": "Synthetic middle school chatbot ethics unit evaluated with surveys.",
}
WRONG = "Synthetic WRONGTEXT abstract that does not match the stored hash."


def inv(text):
    d = {}
    for i, t in enumerate(text.split(" ")):
        d.setdefault(t, []).append(i)
    return d


class AgreementInputs(Case):
    def fixture(self, scopus=None, oa_ids=("O1", "O2"), sources=None, extra_corpus=()):
        sources = sources or {"S1": "scopus", "S2": "scopus", "O1": "openalex", "O2": "openalex"}
        rows = [[w, f"Title {w}", f"https://doi.org/10.1/{w.lower()}", src, h(TEXT.get(w, ""))] for w, src in sources.items()]
        rows += list(extra_corpus)
        put(self.p("corp.csv"), csv_text(["work_id", "title", "doi", "abstract_source", "abstract_sha256"], rows))
        put(self.p("sample.json"), json.dumps([{"work_id": r[0]} for r in rows]))
        if scopus is None:
            scopus = {"a.csv": [["10.1/s1", TEXT["S1"]], ["10.1/s2", TEXT["S2"]]]}
        for name, rr in scopus.items():
            put(self.p("scopus", name), b"\xef\xbb\xbf" + csv_text(["DOI", "Abstract"], rr).encode("utf-8"))
        return [{"id": f"https://openalex.org/{w}", "abstract_inverted_index": inv(TEXT[w])} for w in oa_ids]

    def run_(self, works, wrap=(), **spec):
        put(self.p("spec.json"), json.dumps(dict(spec, works=works)))
        return subprocess.run([sys.executable, "-I", *wrap, MOCKRUN, self.p("spec.json"), SCRIPT, "corp.csv", "scopus"],
                              cwd=self.d, capture_output=True)

    def assert_no_text_leak(self, r):
        for t in list(TEXT.values()) + [WRONG]:
            for word in ("WRONGTEXT", "kindergarten", "Lehrkräfte", "中小學", "ASCII"):
                self.assertNotIn(word, (r.stdout + r.stderr).decode("utf-8", "replace"))

    def outputs(self):
        return json.loads(self.read("inputs.json").decode("utf-8"))

    def test_norm_unchanged(self):
        self.assertEqual(hashlib.sha256(norm_source().encode()).hexdigest(), NORM_SHA256)

    def test_legal_both_sources(self):
        works = self.fixture()
        self.plant(*OUT)
        r = self.run_(works)
        self.assert_ok(r)
        out = self.outputs()
        self.assertEqual([o["work_id"] for o in out], ["S1", "S2", "O1", "O2"])
        for o in out:
            self.assertEqual(hashlib.sha256(o["abstract"].encode()).hexdigest(), h(TEXT[o["work_id"]]))
        self.assertNotIn("©", out[0]["abstract"])
        self.assertNotIn(b"\r", self.read("inputs.json"))
        self.assert_no_text_leak(r)

    def test_scopus_rejections(self):
        cases = {
            "only_wrong": {"a.csv": [["10.1/s1", WRONG], ["10.1/s2", TEXT["S2"]]]},
            "doi_absent": {"a.csv": [["10.1/s2", TEXT["S2"]]]},
            "two_both_wrong": {"a.csv": [["10.1/s1", WRONG], ["10.1/s2", TEXT["S2"]]], "b.csv": [["10.1/s1", WRONG + " v2"]]},
        }
        for name, sc in cases.items():
            for planted in (True, False):
                with self.subTest(name, planted=planted):
                    self.fresh()
                    works = self.fixture(scopus=sc)
                    if planted:
                        self.plant(*OUT)
                    r = self.run_(works)
                    self.assert_rejected(r, OUT, planted=planted, stderr_has="S1: ")
                    self.assert_no_text_leak(r)

    def test_scopus_two_exports_one_matching_both_orders(self):
        results = []
        for first, second in ((WRONG, TEXT["S1"]), (TEXT["S1"], WRONG)):
            with self.subTest(first_is_wrong=first == WRONG):
                self.fresh()
                works = self.fixture(scopus={"a.csv": [["10.1/S1", first], ["https://doi.org/10.1/s2", TEXT["S2"]]],
                                             "b.csv": [["10.1/s1", second]]})
                r = self.run_(works)
                self.assert_ok(r)
                results.append(self.read("inputs.json"))
        self.assertEqual(results[0], results[1])

    def test_normalised_identical_candidates_deduplicated(self):
        variant = TEXT["S2"] + " Copyright 2024 Publisher."
        works = self.fixture(scopus={"a.csv": [["10.1/s1", TEXT["S1"]], ["10.1/s2", TEXT["S2"]]], "b.csv": [["10.1/S2", variant]]})
        r = self.run_(works)
        self.assert_ok(r)
        self.assertEqual(self.outputs()[1]["abstract"], norm(TEXT["S2"]))

    def test_openalex_rejections(self):
        def wrong(ws):
            ws[0]["abstract_inverted_index"] = inv(WRONG)
            return ws
        cases = {"wrong": wrong, "missing": lambda ws: ws[1:], "null": lambda ws: [dict(ws[0], abstract_inverted_index=None)] + ws[1:]}
        for name, f in cases.items():
            with self.subTest(name):
                self.fresh()
                works = f(self.fixture())
                self.plant(*OUT)
                r = self.run_(works)
                self.assert_rejected(r, OUT, stderr_has="O1: openalex")
                self.assert_no_text_leak(r)

    def test_openalex_second_batch_transport_failure(self):
        ids = [f"W{i}" for i in range(60)]
        for i in ids:
            TEXT[i] = f"Synthetic openalex abstract number {i} for batch testing."
        try:
            works = self.fixture(sources={i: "openalex" for i in ids}, oa_ids=ids)
            self.plant(*OUT)
            r = self.run_(works, calls={"2": {"url_error": True}})
            self.assert_rejected(r, OUT, stderr_has="OpenAlex batch 2: transport failure")
            r = self.run_(works, calls={"1": {"http": 500}})
            self.assert_rejected(r, OUT, stderr_has="OpenAlex batch 1: transport failure (HTTP 500)")
            r = self.run_(works)
            self.assert_ok(r)
            self.assertEqual(len(self.outputs()), 60)
        finally:
            for i in ids:
                TEXT.pop(i)

    def test_unknown_abstract_source_rejected(self):
        works = self.fixture(extra_corpus=[["N1", "T", "https://doi.org/10.1/n1", "none", h("")]])
        self.plant(*OUT)
        r = self.run_(works)
        self.assert_rejected(r, OUT, stderr_has="N1: abstract_source 'none' is not openalex or scopus")
        self.assertFalse(os.path.exists(self.p("mock-log.json")) and json.loads(self.read("mock-log.json")))

    def test_refuses_inside_git_work_tree(self):
        works = self.fixture()
        os.mkdir(self.p(".git"))
        before = sorted(os.listdir(self.d))
        r = self.run_(works)
        self.assertNotEqual(r.returncode, 0)
        self.assertIn("refusing to run inside a git work tree", r.stderr.decode())
        self.assertFalse(os.path.exists(self.p("inputs.json")))
        self.assertEqual(sorted(x for x in os.listdir(self.d) if x not in ("mock-log.json", "spec.json")), before)
        self.assertEqual(json.loads(self.read("mock-log.json")), [])

    def test_windows_default_text_mode_same_bytes(self):
        works = self.fixture()
        r = self.run_(works)
        self.assert_ok(r)
        utf8 = self.read("inputs.json")
        os.remove(self.p("inputs.json"))
        r = self.run_(works, wrap=(os.path.join(TESTS, "winrun.py"),))
        self.assert_ok(r)
        self.assertEqual(self.read("inputs.json"), utf8)
        utf8.decode("utf-8")


if __name__ == "__main__":
    unittest.main()
