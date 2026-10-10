"""Step 2: same-day four-year ID snapshot (PROTOCOL sections 2.1-2.3, 2.6).

Usage:  python3 -I step2_snapshot.py <out_dir>
Writes <out_dir>/YYYY/{queries.json, ids-<code>.json} for 2022-2025 and
<out_dir>/step2-summary.json.  Only work IDs and counts are stored; no
titles, abstracts or authors.  Requests go through oa.py (single thread,
>=0.2 s apart, no email / mailto / key in URLs).
"""
import csv, json, os, sys, time

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import oa  # noqa: E402

ROOT = os.path.dirname(HERE)
YEARS = (2022, 2023, 2024, 2025)
OLD = ["AI education", "artificial intelligence education", "AI curriculum", "artificial intelligence curriculum",
       "teaching AI", "teaching artificial intelligence", "teaching about AI", "teaching machine learning",
       "machine learning education", "machine learning for kids", "AI4K12", "five big ideas", "AI ethics education",
       "AI awareness", "children's conceptions of artificial intelligence", "explainable artificial intelligence",
       "Teachable Machine", "Cognimates", "PopBots", "LearningML", "eCraft2Learn", "voice assistant", "smart speaker",
       "intelligent tutoring system"]
NEW = ["AI literacy", "artificial intelligence literacy", "AI-literacy", "algorithmic literacy", "AI competency",
       "AI ethics", "generative AI", "generative artificial intelligence", "GenAI", "ChatGPT", "Chat GPT", "GPT-4",
       "large language model", "LLM", "chatbot", "conversational agent"]
NEUTRAL = ["artificial intelligence", "AI", "machine learning", "educational robotics", "Scratch", "robot",
           "social robot", "natural language processing", "facial recognition", "image recognition", "deep learning",
           "neural network", "intelligent agent", "pedagogical agent", "adaptive learning"]


def q(t):
    return f'"{t}"' if (" " in t or "-" in t) else t


def groups(terms, prefix):
    return {f"{prefix}{i // 6 + 1}": "(" + " OR ".join(q(t) for t in terms[i:i + 6]) + ")" for i in range(0, len(terms), 6)}


MAIN = groups(OLD + NEW, "M")
MAIN.update({
    "C1": '("computational thinking" AND ("artificial intelligence" OR "machine learning"))',
    "C2": '("App Inventor" AND "machine learning")',
    "C3": '("data literacy" AND "artificial intelligence")',
    "C4": '("summer camp" AND "artificial intelligence")',
})
NEUT = groups(NEUTRAL, "N")


def panel_ids():
    rows = list(csv.DictReader(open(os.path.join(ROOT, "journals.csv"), encoding="utf-8")))
    return [r for r in rows if r["in_panel"] == "yes"]


def fetch_ids(filt, purpose):
    ids, pages, cursor, count, status = [], 0, "*", None, 200
    started = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
    urls = []
    while cursor:
        params = {"filter": filt, "per-page": 200, "cursor": cursor, "select": "id"}
        status, body = oa.get("/works", params, purpose)
        pages += 1
        if status != 200 or not body:
            break
        count = body["meta"]["count"]
        ids += [r["id"].rsplit("/", 1)[-1] for r in body["results"]]
        cursor = body["meta"].get("next_cursor") if body["results"] else None
    return {"utc_start": started, "filter": filt, "http": status, "count": count, "ids_got": len(ids),
            "pages": pages, "per_page": 200, "paging": "cursor"}, sorted(set(ids))


def main(out):
    jr = panel_ids()
    sids = "|".join(sorted(r["source_id_2025"] for r in jr))
    summary = {"utc_start": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()), "years": {}}
    for y in YEARS:
        ydir = os.path.join(out, str(y))
        os.makedirs(ydir, exist_ok=True)
        base = f"primary_location.source.id:{sids},type:article|review,is_paratext:false,publication_year:{y}"
        log = {"year": y, "base_filter": base, "subqueries": {}, "title_subqueries": {}, "neutral": {},
               "panel_size": None, "panel_missing_abstract": None, "outside_panel": {}}
        main_union, title_union, neut_union = set(), set(), set()
        for code, expr in MAIN.items():
            meta, ids = fetch_ids(f"{base},title_and_abstract.search:{expr}", f"step2 {y} {code}")
            meta["query"] = expr
            log["subqueries"][code] = meta
            json.dump(ids, open(os.path.join(ydir, f"ids-{code}.json"), "w"))
            main_union |= set(ids)
        for code, expr in MAIN.items():
            meta, ids = fetch_ids(f"{base},has_abstract:false,title.search:{expr}", f"step2 {y} T-{code}")
            meta["query"] = expr
            log["title_subqueries"]["T-" + code] = meta
            json.dump(ids, open(os.path.join(ydir, f"ids-T-{code}.json"), "w"))
            title_union |= set(ids)
        for code, expr in NEUT.items():
            meta, ids = fetch_ids(f"{base},title_and_abstract.search:{expr}", f"step2 {y} {code}")
            meta["query"] = expr
            log["neutral"][code] = meta
            json.dump(ids, open(os.path.join(ydir, f"ids-{code}.json"), "w"))
            neut_union |= set(ids)
        st, b = oa.get("/works", {"filter": base, "group_by": "primary_location.source.id", "per-page": 200},
                       f"step2 {y} panel size")
        log["panel_size"] = {"http": st, "total": sum(x["count"] for x in b["group_by"]),
                             "by_source": {x["key"].rsplit("/", 1)[-1]: x["count"] for x in b["group_by"]}}
        st, b = oa.get("/works", {"filter": base + ",has_abstract:false", "group_by": "primary_location.source.id",
                                  "per-page": 200}, f"step2 {y} panel missing abstract")
        log["panel_missing_abstract"] = {"http": st, "total": sum(x["count"] for x in b["group_by"]),
                                         "by_source": {x["key"].rsplit("/", 1)[-1]: x["count"] for x in b["group_by"]}}
        obase = f"type:article|review,is_paratext:false,publication_year:{y}"
        for code, expr in MAIN.items():
            st, b = oa.get("/works", {"filter": f"{obase},title_and_abstract.search:{expr}", "per-page": 1,
                                      "select": "id"}, f"step2 {y} outside {code}")
            log["outside_panel"][code] = {"http": st, "count": (b or {}).get("meta", {}).get("count")}
        corpus = main_union | title_union
        log["union"] = {"main": len(main_union), "title_only_added": len(title_union - main_union),
                        "corpus": len(corpus), "neutral": len(neut_union),
                        "neutral_minus_main": len(neut_union - main_union)}
        json.dump(sorted(corpus), open(os.path.join(ydir, "ids-corpus.json"), "w"))
        json.dump(sorted(neut_union - main_union), open(os.path.join(ydir, "ids-neutral-minus-main.json"), "w"))
        json.dump(log, open(os.path.join(ydir, "queries.json"), "w"), indent=1, ensure_ascii=False)
        summary["years"][y] = log["union"] | {"panel_size": log["panel_size"]["total"],
                                             "panel_missing_abstract": log["panel_missing_abstract"]["total"]}
        print(y, summary["years"][y], "calls so far", oa.calls(), flush=True)
    summary["utc_end"] = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
    json.dump(summary, open(os.path.join(out, "step2-summary.json"), "w"), indent=1)


if __name__ == "__main__":
    main(sys.argv[1])
