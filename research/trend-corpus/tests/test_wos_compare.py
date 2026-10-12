"""F01: wos_compare.py must not label failed or anomalous OpenAlex lookups as not_in_openalex."""
import csv, io, json, os, unittest
from support import Case, put, csv_text, SENTINEL

OUT = ["wos-compare.csv", "summary.json"]
WOS_H = ["PT", "UT", "DI", "PY", "EA", "DT", "SN", "EI", "SO"]


def work(n, doi, year=2025, src="S1"):
    return {"id": f"https://openalex.org/W{n}", "doi": f"https://doi.org/{doi}", "publication_year": year,
            "primary_location": {"source": {"id": f"https://openalex.org/{src}"}}}


class WosCompare(Case):
    def fixture(self, dois, union=(("10.1/u", "W1"),), ids=("W1", "W100")):
        root = self.p("root")
        put(os.path.join(root, "2025", "corpus-v2.csv"), csv_text(["work_id", "doi"], [[w, "https://doi.org/" + d] for d, w in union]))
        put(os.path.join(root, "rerun-dev001", "2025", "ids-corpus.json"), json.dumps(list(ids)))
        put(os.path.join(root, "journals.csv"), csv_text(["journal_code", "in_panel", "issns"], [["J1", "yes", "1234-5678"]]))
        rows = [["J", f"WOS:{k:05d}", d, "2025", "", "Article", "1234-5678", "", "Synthetic Journal – Ü"] for k, d in enumerate(dois, 1)]
        text = "\t".join(WOS_H) + "\n" + "".join("\t".join(r) + "\n" for r in rows)
        put(self.p("wos", "export.txt"), b"\xef\xbb\xbf" + text.encode("utf-8"))

    def run_(self, spec, win=False):
        return self.run_mock(spec, "wos_compare.py", self.p("root"), self.p("wos"), win=win)

    def test_windows_default_text_mode_same_bytes(self):
        self.fixture(["10.1/u", "10.1/a", "10.1/b", ""])
        works = [work(100, "10.1/a"), work(200, "10.1/b", 2024)]
        self.same_bytes_on_windows_text_mode(lambda win: self.run_({"works": works}, win=win), OUT)

    def statuses(self):
        return {r["doi"]: r for r in csv.DictReader(io.StringIO(self.read("wos-compare.csv").decode("utf-8")))}

    def test_legal_classification(self):
        self.fixture(["10.1/u", "10.1/a", "10.1/b", "10.1/c", "10.1/missing", ""])
        works = [work(100, "10.1/a"), work(200, "10.1/b"), work(300, "10.1/c", 2024)]
        self.plant(*OUT)
        r = self.run_({"works": works})
        self.assert_ok(r)
        st = self.statuses()
        self.assertEqual({d: x["status"] for d, x in st.items()},
                         {"10.1/u": "in_union", "10.1/a": "in_union", "10.1/b": "oa_2025_not_in_union",
                          "10.1/c": "oa_other_year", "10.1/missing": "not_in_openalex", "": "no_doi"})
        self.assertEqual(st["10.1/c"]["oa_year"], "2024")
        self.assertEqual(st["10.1/b"]["oa_source"], "S1")
        self.assertNotIn(b"\r", self.read("wos-compare.csv"))
        s = json.loads(self.read("summary.json"))
        self.assertEqual(s["multi_work_doi_count"], 0)
        self.assertEqual(s["by_journal"], {"J1": 6})

    def test_legit_not_found_in_second_batch(self):
        dois = [f"10.2/{i}" for i in range(60)]
        self.fixture(dois)
        works = [work(1000 + i, d, 2024) for i, d in enumerate(dois) if i < 42]
        self.plant(*OUT)
        r = self.run_({"works": works})
        self.assert_ok(r)
        self.assertEqual(len(self.mock_calls()), 2)
        s = json.loads(self.read("summary.json"))
        self.assertEqual(s["status"], {"oa_other_year": 42, "not_in_openalex": 18})

    def test_zero_results_is_success(self):
        self.fixture(["10.3/a", "10.3/b"])
        r = self.run_({"works": []})
        self.assert_ok(r)
        self.assertEqual(json.loads(self.read("summary.json"))["status"], {"not_in_openalex": 2})

    def test_transport_failures_rejected(self):
        dois = [f"10.4/{i}" for i in range(60)]
        works = [work(2000 + i, d) for i, d in enumerate(dois)]
        cases = {
            "batch1_url_error": {"fail_from": {"n": 1, "action": {"url_error": True}}},
            "batch2_url_error": {"fail_from": {"n": 2, "action": {"url_error": True}}},
            "batch2_http500": {"fail_from": {"n": 2, "action": {"http": 503}}},
            "batch1_http429": {"fail_from": {"n": 1, "action": {"http": 429}}},
            "batch1_http404_no_retry": {"calls": {"1": {"http": 404}}},
        }
        for name, extra in cases.items():
            for planted in (True, False):
                with self.subTest(name, planted=planted):
                    self.fresh()
                    self.fixture(dois)
                    if planted:
                        self.plant(*OUT)
                    r = self.run_(dict(extra, works=works))
                    self.assert_rejected(r, OUT, planted=planted, stderr_has="transport failure")
                    if name == "batch1_http404_no_retry":
                        self.assertEqual(len(self.mock_calls()), 1)
                    elif name.startswith("batch1"):
                        self.assertEqual(len(self.mock_calls()), 4)
                    else:
                        self.assertEqual(len(self.mock_calls()), 5)

    def test_retry_then_success(self):
        self.fixture(["10.5/a"])
        r = self.run_({"works": [work(5, "10.5/a")], "calls": {"1": {"http": 429}, "2": {"url_error": True}}})
        self.assert_ok(r)
        self.assertEqual(self.statuses()["10.5/a"]["status"], "oa_2025_not_in_union")

    def test_response_anomalies_rejected(self):
        page = lambda results, **meta: {"json": {"meta": dict({"count": len(results)}, **meta), "results": results}}
        cases = {
            "not_json": {"body": "<html>busy</html>"},
            "no_results": {"json": {"meta": {"count": 0}}},
            "results_not_list": {"json": {"meta": {"count": 1}, "results": {"x": 1}}},
            "bad_meta": {"json": {"meta": {"count": "3"}, "results": []}},
            "unrequested_doi": page([work(7, "10.9/other")]),
            "bad_work_id": page([dict(work(7, "10.6/a"), id="https://openalex.org/A7")]),
        }
        for name, act in cases.items():
            with self.subTest(name):
                self.fresh()
                self.fixture(["10.6/a", "10.6/b"])
                self.plant(*OUT)
                r = self.run_({"works": [], "calls": {"1": act}})
                self.assert_rejected(r, OUT, stderr_has="response anomaly")

    def test_response_without_meta_is_a_single_page(self):
        self.fixture(["10.6/a", "10.6/b"])
        r = self.run_({"calls": {"1": {"json": {"results": [work(61, "10.6/a")]}}}})
        self.assert_ok(r)
        self.assertEqual({d: x["status"] for d, x in self.statuses().items()},
                         {"10.6/a": "oa_2025_not_in_union", "10.6/b": "not_in_openalex"})

    def test_meta_count_above_received_rejected(self):
        self.fixture(["10.7/a", "10.7/b"])
        self.plant(*OUT)
        r = self.run_({"works": [work(70, "10.7/a")], "meta_add": 1})
        self.assert_rejected(r, OUT, stderr_has="meta.count 2 but only 1 works received")

    def test_cursor_paging_collects_all_pages(self):
        dois = [f"10.8/{i}" for i in range(30)]
        self.fixture(dois)
        works = [work(3000 + 2 * i + k, d, 2024) for i, d in enumerate(dois) for k in (0, 1)]
        r = self.run_({"works": works})
        self.assert_ok(r)
        self.assertEqual(len(self.mock_calls()), 2)
        s = json.loads(self.read("summary.json"))
        self.assertEqual(s["multi_work_doi_count"], 30)
        self.assertEqual(s["status"], {"oa_other_year": 30})

    def test_repeated_cursor_rejected(self):
        dois = [f"10.8/{i}" for i in range(30)]
        self.fixture(dois)
        works = [work(3000 + 2 * i + k, d) for i, d in enumerate(dois) for k in (0, 1)]
        self.plant(*OUT)
        again = {"json": {"meta": {"count": 60, "next_cursor": "50"}, "results": [works[0]]}}
        r = self.run_({"works": works, "calls": {"2": again}})
        self.assert_rejected(r, OUT, stderr_has="repeated cursor")

    def test_multi_work_doi_is_order_independent(self):
        outs = []
        for reverse in (False, True):
            with self.subTest(reverse=reverse):
                self.fresh()
                self.fixture(["10.10/a", "10.10/b", "10.10/c"], ids=("W1", "W90"))
                works = [work(95, "10.10/a"), work(90, "10.10/a", 2024, "S9"),   # one in union -> in_union, rep W90
                         work(81, "10.10/b", 2024), work(85, "10.10/b"), work(83, "10.10/b"),  # 2025 tier -> W83
                         work(77, "10.10/c", 2023), work(76, "10.10/c", 2024)]  # all other years -> W76
                r = self.run_({"works": works, "reverse": reverse})
                self.assert_ok(r)
                st = self.statuses()
                self.assertEqual([(st[d]["status"], st[d]["work_id"], st[d]["oa_year"], st[d]["oa_source"]) for d in ("10.10/a", "10.10/b", "10.10/c")],
                                 [("in_union", "W90", "2024", "S9"), ("oa_2025_not_in_union", "W83", "2025", "S1"),
                                  ("oa_other_year", "W76", "2024", "S1")])
                s = json.loads(self.read("summary.json"))
                self.assertEqual(s["multi_work_dois"], {"10.10/a": ["W90", "W95"], "10.10/b": ["W81", "W83", "W85"],
                                                        "10.10/c": ["W76", "W77"]})
                outs.append((self.read("wos-compare.csv"), self.read("summary.json")))
        self.assertEqual(outs[0], outs[1])


if __name__ == "__main__":
    unittest.main()
