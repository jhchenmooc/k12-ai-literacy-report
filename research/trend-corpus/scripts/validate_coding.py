"""Validate coder JSONL output against the input records (codebook-v1 section 8).

Usage: python3 -I validate_coding.py <scope|code1> <input.jsonl> <output.jsonl>
Checks: one output per input work_id; enum values; every evidence span occurs
verbatim in title + " " + abstract and has <= 15 whitespace words; `unknown`
values carry no span. Prints a JSON report; exit code 1 if any error.
"""
import json, sys

ENUM = {
    "ai_lit_class": {"A", "B", "C", "unknown"},
    "b_subtype": {"genai", "its_adaptive", "robot_agent", "other", ""},
    "audience_role": {"student", "inservice_teacher", "preservice_teacher", "other_stakeholder", "non_k12", "unknown"},
    "stage": {"preschool", "primary", "lower_secondary", "upper_secondary", "vocational_secondary",
              "secondary_unspecified", "k12_multi", "k12_unspecified", "unknown"},
    "level": {"understand", "apply", "create", "unknown"},
    "method": {"review", "instrument_dev", "conceptual", "experimental", "mixed", "design_based", "qualitative",
               "survey", "unknown"},
    "outcome_measured": {"yes", "no", ""},
    "genai_flag": {"yes", "no", "unknown"},
}
DIMS = {"S-ETH", "S-BAS", "S-LRN", "S-SYS", "T-ETH", "T-BAS", "T-TEA", "T-PD"}
TOPICS = {"genai", "ailit_curriculum", "assessment", "teacher_pd", "ethics_safety", "learning_intervention",
          "ct_programming_data", "language", "stem_science", "equity_special", "policy_governance", "none"}
FIELDS = {"scope": ["ai_lit_class", "b_subtype", "audience_role"],
          "code1": ["audience_role", "stage", "level", "method", "outcome_measured", "genai_flag"]}


def main(kind, inp, outp):
    src = {}
    for line in open(inp, encoding="utf-8"):
        r = json.loads(line)
        src[r["work_id"]] = (r.get("title") or "") + " " + (r.get("abstract") or "")
    errors, seen = [], set()
    for n, line in enumerate(open(outp, encoding="utf-8"), 1):
        line = line.strip()
        if not line:
            continue
        try:
            o = json.loads(line)
        except Exception as e:
            errors.append(f"line {n}: bad json {e}")
            continue
        w = o.get("work_id")
        if w not in src:
            errors.append(f"line {n}: unknown work_id {w}")
            continue
        if w in seen:
            errors.append(f"{w}: duplicate")
        seen.add(w)
        for f in FIELDS[kind]:
            v = o.get(f, "")
            if v not in ENUM[f]:
                errors.append(f"{w}: {f}={v!r} not allowed")
        if kind == "code1":
            for d in o.get("ai_lit_dims") or []:
                if d not in DIMS:
                    errors.append(f"{w}: dim {d!r}")
            for t in o.get("topic") or []:
                if t not in TOPICS:
                    errors.append(f"{w}: topic {t!r}")
        ev_fields = set()
        for ev in o.get("evidence") or []:
            span = ev.get("span", "")
            ev_fields.add(ev.get("field"))
            if len(span.split()) > 15:
                errors.append(f"{w}: span >15 words ({ev.get('field')})")
            if span not in src[w]:
                errors.append(f"{w}: span not verbatim ({ev.get('field')})")
        for f in FIELDS[kind]:
            if o.get(f) == "unknown" and f in ev_fields:
                errors.append(f"{w}: unknown {f} has a span")
    missing = sorted(set(src) - seen)
    rep = {"inputs": len(src), "outputs": len(seen), "missing": missing, "errors": errors}
    print(json.dumps(rep, ensure_ascii=False, indent=1))
    sys.exit(1 if errors or missing else 0)


if __name__ == "__main__":
    main(*sys.argv[1:4])
