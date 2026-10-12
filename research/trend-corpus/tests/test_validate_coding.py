"""F05 (input work_id uniqueness) and F02 (required evidence spans) in validate_coding.py."""
import json, unittest
from support import Case, put, jsonl

TITLE = "Primary pupils learn machine learning"
ABS = ("We taught grade 4 students to train image classifiers. Teachers co-designed the unit. "
       "A pre/post test showed gains. ChatGPT was used to explain ethics of data.")


def inp(*ids, **over):
    return [dict({"work_id": i, "title": TITLE, "abstract": ABS}, **over) for i in ids]


def scope(wid, cls="A", role="student", ev=()):
    return {"work_id": wid, "ai_lit_class": cls, "b_subtype": "", "audience_role": role, "rationale": "x",
            "evidence": [{"field": f, "span": s} for f, s in ev], "model_id": "m"}


def code1(wid, ev=(), **kw):
    o = {"work_id": wid, "audience_role": "student", "stage": "primary", "ai_lit_dims": ["S-BAS"], "level": "apply",
         "topic": ["ailit_curriculum"], "method": "experimental", "outcome_measured": "yes", "genai_flag": "yes",
         "ai_lit_note": "", "rationale": "x", "model_id": "m"}
    o.update(kw)
    o["evidence"] = [{"field": f, "span": s} for f, s in ev]
    return o


FULL_CODE1_EV = [("audience_role", "grade 4 students"), ("stage", "Primary pupils"), ("ai_lit_dims", "train image classifiers"),
                 ("level", "to train image classifiers"), ("topic", "learn machine learning"), ("method", "A pre/post test"),
                 ("outcome_measured", "pre/post test showed gains"), ("genai_flag", "ChatGPT was used")]


class Validator(Case):
    def run_(self, kind, inputs, outputs, *flags):
        put(self.p("in.jsonl"), inputs if isinstance(inputs, str) else jsonl(inputs))
        put(self.p("out.jsonl"), jsonl(outputs))
        r = self.run_script("validate_coding.py", kind, "in.jsonl", "out.jsonl", *flags)
        return r, json.loads(r.stdout.decode("utf-8")) if r.stdout.strip() else None

    # ---- F05: input work_id ----
    def test_unique_input_passes(self):
        r, rep = self.run_("scope", inp("W1", "W2"), [scope("W1", "C", "unknown"), scope("W2", "C", "unknown")])
        self.assertEqual(r.returncode, 0, rep)

    def test_duplicate_input_rejected_any_order_or_content(self):
        variants = {"identical": inp("W1", "W2", "W1"),
                    "a_then_b": inp("W1", "W2") + [dict(inp("W1")[0], abstract="Other text")],
                    "b_then_a": [dict(inp("W1")[0], abstract="Other text")] + inp("W2", "W1")}
        for name, rows in variants.items():
            with self.subTest(name):
                r, rep = self.run_("scope", rows, [scope("W1", "C", "unknown"), scope("W2", "C", "unknown")])
                self.assertEqual(r.returncode, 1)
                self.assertEqual(rep["errors"], ["W1: duplicate input work_id at lines 1 and 3"])

    def test_invalid_input_work_id_rejected(self):
        for name, row in {"missing": {"title": "t"}, "empty": {"work_id": ""}, "blank": {"work_id": "  "},
                          "nonstring": {"work_id": 12}}.items():
            with self.subTest(name):
                r, rep = self.run_("scope", inp("W1") + [row], [scope("W1", "C", "unknown")])
                self.assertEqual(r.returncode, 1)
                self.assertEqual(rep["errors"], ["input line 2: missing, empty or non-string work_id"])

    def test_existing_output_checks_unchanged(self):
        r, rep = self.run_("scope", inp("W1", "W2"), [scope("W1", "C", "unknown"), scope("W1", "C", "unknown")])
        self.assertEqual(r.returncode, 1)
        self.assertIn("W1: duplicate", rep["errors"])
        self.assertEqual(rep["missing"], ["W2"])

    def test_windows_default_text_mode_reads_utf8(self):
        rows = inp("W1", abstract=ABS + " Lehrkräfte – “κ” 中小學 café.")
        out = [scope("W1", "A", "student", [("ai_lit_class", "“κ” 中小學 café."), ("audience_role", "grade 4 students")])]
        r, rep = self.run_("scope", rows, out, "--require-evidence")
        self.assertEqual(r.returncode, 0, rep)
        w = self.run_script("validate_coding.py", "scope", "in.jsonl", "out.jsonl", "--require-evidence", win=True)
        self.assertEqual(w.returncode, 0, w.stderr)
        self.assertEqual(w.stdout.replace(b"\r\n", b"\n"), r.stdout.replace(b"\r\n", b"\n"))

    # ---- F02: required evidence ----
    def test_diagnosed_but_not_enforced_without_flag(self):
        r, rep = self.run_("scope", inp("W1"), [scope("W1", "A", "student")])
        self.assertEqual(r.returncode, 0)
        self.assertFalse(rep["required_evidence"]["enforced"])
        self.assertEqual(rep["required_evidence"]["by_field"], {"ai_lit_class": 1, "audience_role": 1})

    def scope_case(self, out, ok):
        r, rep = self.run_("scope", inp("W1"), [out], "--require-evidence")
        self.assertEqual(r.returncode, 0 if ok else 1, rep)
        return rep

    def test_scope_rules(self):
        cases = [
            ("A both spans", scope("W1", "A", "student", [("ai_lit_class", "train image classifiers"), ("audience_role", "grade 4 students")]), True),
            ("A missing class span", scope("W1", "A", "student", [("audience_role", "grade 4 students")]), False),
            ("B missing role span", scope("W1", "B", "student", [("ai_lit_class", "train image classifiers")]), False),
            ("C role unknown no spans", scope("W1", "C", "unknown"), True),
            ("C role student with role span", scope("W1", "C", "student", [("audience_role", "grade 4 students")]), True),
            ("C role student no span", scope("W1", "C", "student"), False),
            ("C class span not verbatim", scope("W1", "C", "unknown", [("ai_lit_class", "not in the text")]), False),
            ("C class span verbatim", scope("W1", "C", "unknown", [("ai_lit_class", "Teachers co-designed the unit")]), True),
            ("empty span", scope("W1", "A", "student", [("ai_lit_class", ""), ("audience_role", "grade 4 students")]), False),
            ("unknown with span", scope("W1", "unknown", "unknown", [("ai_lit_class", "grade 4 students")]), False),
            ("all unknown", scope("W1", "unknown", "unknown"), True),
        ]
        for name, out, ok in cases:
            with self.subTest(name):
                self.scope_case(out, ok)

    def test_scope_reports_class_c_count_and_share(self):
        outs = [scope("W1", "C", "unknown"), scope("W2", "C", "unknown"), scope("W3", "unknown", "unknown")]
        r, rep = self.run_("scope", inp("W1", "W2", "W3"), outs)
        self.assertEqual(rep["class_C"]["count"], 2)
        self.assertEqual(rep["class_C"]["share"], 0.6667)

    def code1_case(self, out, ok):
        r, rep = self.run_("code1", inp("W1"), [out], "--require-evidence")
        self.assertEqual(r.returncode, 0 if ok else 1, rep)
        return rep

    def test_code1_rules(self):
        drop = lambda f: [e for e in FULL_CODE1_EV if e[0] != f]
        cases = [
            ("full evidence", code1("W1", FULL_CODE1_EV), True),
            ("missing method span", code1("W1", drop("method")), False),
            ("missing outcome span (yes)", code1("W1", drop("outcome_measured")), False),
            ("outcome blank needs none", code1("W1", drop("outcome_measured"), outcome_measured=""), True),
            ("genai no needs none", code1("W1", drop("genai_flag"), genai_flag="no"), True),
            ("topic none needs none", code1("W1", drop("topic"), topic=["none"]), True),
            ("level unknown needs none", code1("W1", drop("level"), level="unknown"), True),
            ("two dims, one span", code1("W1", FULL_CODE1_EV, ai_lit_dims=["S-BAS", "S-ETH"]), False),
            ("two dims, same span twice", code1("W1", FULL_CODE1_EV + [("ai_lit_dims", "train image classifiers")],
                                                ai_lit_dims=["S-BAS", "S-ETH"]), False),
            ("two dims, two distinct spans", code1("W1", FULL_CODE1_EV + [("ai_lit_dims", "explain ethics of data")],
                                                   ai_lit_dims=["S-BAS", "S-ETH"]), True),
            ("two topics, one span", code1("W1", FULL_CODE1_EV, topic=["ailit_curriculum", "genai"]), False),
            ("all unknown", code1("W1", (), audience_role="unknown", stage="unknown", ai_lit_dims=[], level="unknown",
                                  topic=["none"], method="unknown", outcome_measured="", genai_flag="unknown"), True),
        ]
        for name, out, ok in cases:
            with self.subTest(name):
                rep = self.code1_case(out, ok)
                self.assertIn("per-value correspondence of evidence is not verified", rep["required_evidence"]["limitation"])

    def test_invalid_values_are_never_echoed(self):
        """W5: an output field holding restricted text (here a synthetic sentinel) must not reach stdout/stderr."""
        secret = "SENTINEL restricted abstract sentence that must never be printed"
        rows = inp("W1", abstract=ABS + " " + secret)
        scope_cases = {
            "enum value": [scope("W1", secret, "student")],
            "evidence field": [scope("W1", "C", "unknown", [(secret, "not in the text at all")])],
            "long span field": [scope("W1", "C", "unknown", [(secret, " ".join(["word"] * 16))])],
            "unknown work_id": [scope("W1", "C", "unknown"), scope(secret, "C", "unknown")],
        }
        code1_cases = {
            "dim value": [code1("W1", ai_lit_dims=[secret])],
            "topic value": [code1("W1", topic=[secret])],
            "enum value": [code1("W1", method=secret)],
            "non-string value": [code1("W1", stage={"text": secret})],
        }
        for kind, cases in (("scope", scope_cases), ("code1", code1_cases)):
            for name, outs in cases.items():
                for flags in ((), ("--require-evidence",)):
                    with self.subTest(kind=kind, case=name, flags=flags):
                        r, rep = self.run_(kind, rows, outs, *flags)
                        self.assertEqual(r.returncode, 1, rep)
                        self.assertTrue(rep["errors"])
                        self.assertNotIn(b"SENTINEL", r.stdout + r.stderr)
                        self.assertNotIn(b"restricted abstract", r.stdout + r.stderr)

    def test_unknown_openalex_id_is_still_shown(self):
        r, rep = self.run_("scope", inp("W1"), [scope("W1", "C", "unknown"), scope("W999", "C", "unknown")])
        self.assertEqual(r.returncode, 1)
        self.assertIn("line 2: unknown work_id W999", rep["errors"])

    def test_report_has_no_span_text(self):
        r, rep = self.run_("scope", inp("W1"), [scope("W1", "A", "student", [("ai_lit_class", "not in the text at all")])],
                           "--require-evidence")
        self.assertEqual(r.returncode, 1)
        self.assertNotIn(b"not in the text at all", r.stdout + r.stderr)
        self.assertNotIn(b"image classifiers", r.stdout + r.stderr)


if __name__ == "__main__":
    unittest.main()
