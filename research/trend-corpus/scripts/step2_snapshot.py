"""Step 2: same-day four-year ID snapshot (PROTOCOL sections 2.1-2.3, 2.6).

Usage:  python3 -I step2_snapshot.py <out_dir>
Writes <out_dir>/YYYY/{queries.json, ids-<code>.json} for 2022-2025 and
<out_dir>/step2-summary.json.  Only work IDs and counts are stored; no
titles, abstracts or authors.  Requests go through oa.py (single thread,
>=0.2 s apart, no email / mailto / key in URLs).

Snapshot files are written only after every query has completed. A non-200
response or a repeated cursor makes the run incomplete: no snapshot file of
this run is written, <out_dir>/step2-incomplete.json records the failing query,
and the exit code is nonzero. <out_dir> must not be the frozen snapshots
(research/trend-corpus itself, its 2022/-2025/ or rerun-dev001/).
"""
import csv, json, os, sys, time

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import oa  # noqa: E402
import safeio  # noqa: E402

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


FROZEN = ["2022", "2023", "2024", "2025", "rerun-dev001"]


class Incomplete(Exception):
    """A query did not finish; the snapshot must not be written as complete."""


def frozen_target(out):
    """Return the frozen snapshot path that <out> would write into, or None."""
    o, root = os.path.realpath(out), os.path.realpath(ROOT)
    if o == root:
        return root
    for d in FROZEN:
        f = os.path.join(root, d)
        if o == f or o.startswith(f + os.sep):
            return f
    return None


def panel_ids():
    with open(os.path.join(ROOT, "journals.csv"), encoding="utf-8", newline="") as fh:
        rows = list(csv.DictReader(fh))
    return [r for r in rows if r["in_panel"] == "yes"]


def fetch_ids(filt, purpose):
    ids, pages, cursor, count, status = [], 0, "*", None, 200
    started = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
    used = set()
    while cursor:
        params = {"filter": filt, "per-page": 200, "cursor": cursor, "select": "id"}
        status, body = oa.get("/works", params, purpose)
        pages += 1
        if status != 200 or not body:
            raise Incomplete({"purpose": purpose, "filter": filt, "http": status, "pages": pages, "ids_got": len(ids),
                              "reason": f"HTTP {status} on page {pages}" if status != 200 else f"empty body on page {pages}"})
        count = body["meta"]["count"]
        ids += [r["id"].rsplit("/", 1)[-1] for r in body["results"]]
        used.add(cursor)
        cursor = body["meta"].get("next_cursor") if body["results"] else None
        if cursor and cursor in used:
            raise Incomplete({"purpose": purpose, "filter": filt, "http": status, "pages": pages, "ids_got": len(ids),
                              "reason": f"repeated cursor after page {pages}"})
    return {"utc_start": started, "filter": filt, "http": status, "count": count, "ids_got": len(ids),
            "pages": pages, "per_page": 200, "paging": "cursor"}, sorted(set(ids))


def group_by(params, purpose):
    st, b = oa.get("/works", params, purpose)
    if st != 200 or not isinstance(b, dict) or not isinstance(b.get("group_by"), list):
        raise Incomplete({"purpose": purpose, "filter": params["filter"], "http": st, "reason": f"HTTP {st} or no group_by"})
    return {"http": st, "total": sum(x["count"] for x in b["group_by"]),
            "by_source": {x["key"].rsplit("/", 1)[-1]: x["count"] for x in b["group_by"]}}


def main(out):
    f = frozen_target(out)
    if f:
        safeio.die(f"refusing to write a snapshot into frozen {f}; choose a new output directory")
    files = []
    try:
        summary = collect(files)
    except Incomplete as e:
        os.makedirs(out, exist_ok=True)
        info = dict(e.args[0], status="incomplete", utc=time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
                    note="no snapshot file of this run was written")
        safeio.write_atomic([(os.path.join(out, "step2-incomplete.json"), safeio.json_bytes(info, indent=1, ensure_ascii=False))])
        safeio.die(f"incomplete snapshot: {info['purpose']}: {info['reason']}; see {os.path.join(out, 'step2-incomplete.json')}")
    for y in YEARS:
        os.makedirs(os.path.join(out, str(y)), exist_ok=True)
    files.append(("step2-summary.json", safeio.json_bytes(summary, indent=1)))
    safeio.write_atomic([(os.path.join(out, rel), data) for rel, data in files])
    stale = os.path.join(out, "step2-incomplete.json")
    if os.path.exists(stale):  # an earlier failed run's marker no longer describes this directory
        os.remove(stale)


def collect(files):
    """Run every query; append (relative path, bytes) to files. Raises Incomplete on any failure."""
    jr = panel_ids()
    sids = "|".join(sorted(r["source_id_2025"] for r in jr))
    summary = {"utc_start": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()), "years": {}}
    for y in YEARS:
        put = lambda name, obj, **kw: files.append((os.path.join(str(y), name), safeio.json_bytes(obj, **kw)))
        base = f"primary_location.source.id:{sids},type:article|review,is_paratext:false,publication_year:{y}"
        log = {"year": y, "base_filter": base, "subqueries": {}, "title_subqueries": {}, "neutral": {},
               "panel_size": None, "panel_missing_abstract": None, "outside_panel": {}}
        main_union, title_union, neut_union = set(), set(), set()
        for code, expr in MAIN.items():
            meta, ids = fetch_ids(f"{base},title_and_abstract.search:{expr}", f"step2 {y} {code}")
            meta["query"] = expr
            log["subqueries"][code] = meta
            put(f"ids-{code}.json", ids)
            main_union |= set(ids)
        for code, expr in MAIN.items():
            meta, ids = fetch_ids(f"{base},has_abstract:false,title.search:{expr}", f"step2 {y} T-{code}")
            meta["query"] = expr
            log["title_subqueries"]["T-" + code] = meta
            put(f"ids-T-{code}.json", ids)
            title_union |= set(ids)
        for code, expr in NEUT.items():
            meta, ids = fetch_ids(f"{base},title_and_abstract.search:{expr}", f"step2 {y} {code}")
            meta["query"] = expr
            log["neutral"][code] = meta
            put(f"ids-{code}.json", ids)
            neut_union |= set(ids)
        log["panel_size"] = group_by({"filter": base, "group_by": "primary_location.source.id", "per-page": 200},
                                     f"step2 {y} panel size")
        log["panel_missing_abstract"] = group_by({"filter": base + ",has_abstract:false",
                                                  "group_by": "primary_location.source.id", "per-page": 200},
                                                 f"step2 {y} panel missing abstract")
        obase = f"type:article|review,is_paratext:false,publication_year:{y}"
        for code, expr in MAIN.items():
            filt = f"{obase},title_and_abstract.search:{expr}"
            st, b = oa.get("/works", {"filter": filt, "per-page": 1, "select": "id"}, f"step2 {y} outside {code}")
            if st != 200:
                raise Incomplete({"purpose": f"step2 {y} outside {code}", "filter": filt, "http": st, "reason": f"HTTP {st}"})
            log["outside_panel"][code] = {"http": st, "count": (b or {}).get("meta", {}).get("count")}
        corpus = main_union | title_union
        log["union"] = {"main": len(main_union), "title_only_added": len(title_union - main_union),
                        "corpus": len(corpus), "neutral": len(neut_union),
                        "neutral_minus_main": len(neut_union - main_union)}
        put("ids-corpus.json", sorted(corpus))
        put("ids-neutral-minus-main.json", sorted(neut_union - main_union))
        put("queries.json", log, indent=1, ensure_ascii=False)
        summary["years"][y] = log["union"] | {"panel_size": log["panel_size"]["total"],
                                             "panel_missing_abstract": log["panel_missing_abstract"]["total"]}
        print(y, summary["years"][y], "calls so far", oa.calls(), flush=True)
    summary["utc_end"] = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
    return summary


if __name__ == "__main__":
    main(sys.argv[1])
