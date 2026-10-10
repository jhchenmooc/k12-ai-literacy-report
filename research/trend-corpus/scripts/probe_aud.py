"""DEV-001 probe: counts only for generic-AI x K-12 audience subqueries (no IDs)."""
import json, os, sys
HERE = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, HERE)
import oa, step2_snapshot as s2
AUD = ["K-12", "K12", "kindergarten", "early childhood", "primary school", "primary education", "elementary school",
       "middle school", "junior high", "secondary school", "secondary education", "lower secondary", "upper secondary",
       "senior high", "high school", "vocational high school", "technical high school", "TVET", "pupils",
       "schoolchildren", "school students", "children", "adolescents", "teenagers", "youth", "teacher", "educators",
       "pre-service teacher", "preservice teacher", "in-service teacher", "inservice teacher", "student teachers",
       "teacher candidates", "prospective teachers"]
GEN = '("artificial intelligence" OR AI)'
AQ = {f"A{i // 6 + 1}": f"{GEN} AND (" + " OR ".join(s2.q(t) for t in AUD[i:i + 6]) + ")" for i in range(0, len(AUD), 6)}
if __name__ == "__main__":
    sids = "|".join(sorted(r["source_id_2025"] for r in s2.panel_ids()))
    for y in map(int, sys.argv[1:]):
        base = f"primary_location.source.id:{sids},type:article|review,is_paratext:false,publication_year:{y}"
        for c, e in AQ.items():
            st, b = oa.get("/works", {"filter": f"{base},title_and_abstract.search:{e}", "per-page": 1, "select": "id"}, f"DEV-001 probe {y} {c}")
            print(y, c, st, (b or {}).get("meta", {}).get("count"), e)
