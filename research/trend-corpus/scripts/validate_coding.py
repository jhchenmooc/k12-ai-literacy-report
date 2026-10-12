"""Validate coder JSONL output against the input records (codebook-v1 section 8).

Usage: python3 -I validate_coding.py <scope|code1> <input.jsonl> <output.jsonl> [--require-evidence]
Checks: input work_ids are present, non-empty strings and unique (duplicates are
rejected with both line numbers, even with identical content); one output per input
work_id; enum values; every evidence span occurs verbatim in title + " " + abstract
and has <= 15 whitespace words; `unknown` values carry no span. Prints a JSON report;
exit code 1 if any error. The report never contains abstract or span text, nor any value
taken from an output record: invalid values and unrecognised evidence fields are reported
by type, length and SHA-256 prefix only.

Required evidence (prompts/scope.md, prompts/code1.md) is always diagnosed under
"required_evidence"; it only counts as an error with --require-evidence. That flag is
the stricter execution rule of REPAIR-PLAN F02 and must not be used for real coding
until approved and logged in DEVIATIONS.csv.
- scope: non-unknown ai_lit_class needs a span, except C (exempt; counted in
  "class_C"); non-unknown audience_role needs a span, also for C records.
- code1: every non-unknown value of audience_role, stage, level, method, genai_flag
  and outcome_measured needs a span, except genai_flag "no" and blank outcome_measured;
  each listed dim / topic (not "none") needs a span.
- spans must be non-empty. For ai_lit_dims and topic, the number of DISTINCT spans on
  that field must be >= the number of listed values. LIMITATION: evidence.field names
  only the field, so this cannot verify that each dim / topic value has its own
  corresponding evidence; only span count and verbatim-ness are checked.
"""
import hashlib, json, re, sys

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
EVIDENCE_FIELDS = {"scope": set(FIELDS["scope"]), "code1": set(FIELDS["code1"]) | {"ai_lit_dims", "topic"}}


def describe(v):
    """Type, length and hash of an untrusted value; the value itself is never printed (W5)."""
    s = v if isinstance(v, str) else json.dumps(v, ensure_ascii=False, sort_keys=True, default=str)
    return f"{type(v).__name__}, {len(s)} chars, sha256 {hashlib.sha256(s.encode('utf-8')).hexdigest()[:12]}"


def allowed(v, values):
    return isinstance(v, str) and v in values


def required_fields(kind, o):
    """Fields that must carry evidence -> number of distinct spans needed."""
    need = {}
    if kind == "scope":
        if o.get("ai_lit_class") not in ("unknown", "C", "", None):
            need["ai_lit_class"] = 1
        if o.get("audience_role") not in ("unknown", "", None):
            need["audience_role"] = 1
        return need
    for f in FIELDS["code1"]:
        v = o.get(f, "")
        if v in ("unknown", "", None) or (f == "genai_flag" and v == "no"):
            continue
        need[f] = 1
    dims = o.get("ai_lit_dims") or []
    topics = [t for t in (o.get("topic") or []) if t != "none"]
    if dims:
        need["ai_lit_dims"] = len(set(dims))
    if topics:
        need["topic"] = len(set(topics))
    return need


def main(kind, inp, outp, require_evidence=False):
    src, where, errors = {}, {}, []
    for n, line in enumerate(open(inp, encoding="utf-8"), 1):
        if not line.strip():
            continue
        try:
            r = json.loads(line)
        except ValueError as e:
            errors.append(f"input line {n}: bad json {e.msg}")
            continue
        w = r.get("work_id") if isinstance(r, dict) else None
        if not isinstance(w, str) or not w.strip():
            errors.append(f"input line {n}: missing, empty or non-string work_id")
            continue
        if w in where:
            errors.append(f"{w}: duplicate input work_id at lines {where[w]} and {n}")
            continue
        where[w] = n
        src[w] = (r.get("title") or "") + " " + (r.get("abstract") or "")
    if errors:
        rep = {"inputs": len(src), "outputs": 0, "missing": [], "errors": errors}
        print(json.dumps(rep, ensure_ascii=False, indent=1))
        sys.exit(1)
    seen = set()
    req = {"checked_outputs": 0, "records_failing": 0, "by_field": {}, "failures": [],
           "limitation": "dim/topic: only span count and verbatim-ness are checked; "
                         "per-value correspondence of evidence is not verified"}
    class_c = 0
    for n, line in enumerate(open(outp, encoding="utf-8"), 1):
        line = line.strip()
        if not line:
            continue
        try:
            o = json.loads(line)
        except ValueError as e:
            errors.append(f"line {n}: bad json {getattr(e, 'msg', 'invalid')}")
            continue
        if not isinstance(o, dict):
            errors.append(f"line {n}: not a JSON object")
            continue
        w = o.get("work_id")
        if not allowed(w, src):
            shown = w if isinstance(w, str) and re.fullmatch(r"W\d{1,12}", w) else f"({describe(w)})"
            errors.append(f"line {n}: unknown work_id {shown}")
            continue
        if w in seen:
            errors.append(f"{w}: duplicate")
        seen.add(w)
        for f in FIELDS[kind]:
            v = o.get(f, "")
            if not allowed(v, ENUM[f]):
                errors.append(f"{w}: {f} value not allowed ({describe(v)})")
        if kind == "code1":
            for d in o.get("ai_lit_dims") or []:
                if not allowed(d, DIMS):
                    errors.append(f"{w}: ai_lit_dims value not allowed ({describe(d)})")
            for t in o.get("topic") or []:
                if not allowed(t, TOPICS):
                    errors.append(f"{w}: topic value not allowed ({describe(t)})")
        if kind == "scope" and o.get("ai_lit_class") == "C":
            class_c += 1
        ev_fields, spans, empty = set(), {}, 0
        for ev in o.get("evidence") or []:
            span = ev.get("span", "") if isinstance(ev, dict) else None
            if not isinstance(span, str):
                errors.append(f"{w}: evidence entry is not an object with a string span")
                continue
            fld = ev.get("field")
            if allowed(fld, EVIDENCE_FIELDS[kind]):
                label = fld
            else:  # untrusted text: report only its shape, and keep it out of the per-field counts
                fld, label = None, f"unrecognised field: {describe(ev.get('field'))}"
            ev_fields.add(fld)
            if not span.strip():
                empty += 1
            if len(span.split()) > 15:
                errors.append(f"{w}: span >15 words ({label})")
            if span not in src[w]:
                errors.append(f"{w}: span not verbatim ({label})")
            if span.strip():
                spans.setdefault(fld, set()).add(span)
        for f in FIELDS[kind]:
            if o.get(f) == "unknown" and f in ev_fields:
                errors.append(f"{w}: unknown {f} has a span")
        req["checked_outputs"] += 1
        fails = [f"{empty} empty span(s)"] if empty else []
        if empty:
            req["by_field"]["(empty span)"] = req["by_field"].get("(empty span)", 0) + 1
        for f, k in required_fields(kind, o).items():
            got = len(spans.get(f, ()))
            if got < k:
                fails.append(f"{f} needs {k} distinct non-empty span(s), has {got}")
                req["by_field"][f] = req["by_field"].get(f, 0) + 1
        if fails:
            req["records_failing"] += 1
            req["failures"].append({"work_id": w, "line": n, "problems": fails})
            if require_evidence:
                errors.extend(f"{w}: required evidence: {x}" for x in fails)
    missing = sorted(set(src) - seen)
    rep = {"inputs": len(src), "outputs": len(seen), "missing": missing, "errors": errors,
           "required_evidence": dict(req, enforced=require_evidence)}
    if kind == "scope":
        rep["class_C"] = {"count": class_c, "share": round(class_c / len(seen), 4) if seen else None,
                          "note": "C records are exempt from an ai_lit_class span (scope.md); sample them for manual review"}
    print(json.dumps(rep, ensure_ascii=False, indent=1))
    sys.exit(1 if errors or missing else 0)

if __name__ == "__main__":
    a = [x for x in sys.argv[1:] if x != "--require-evidence"]
    if len(a) != 3 or a[0] not in FIELDS:
        sys.stderr.write("usage: validate_coding.py <scope|code1> <input.jsonl> <output.jsonl> [--require-evidence]\n")
        sys.exit(2)
    main(*a, require_evidence="--require-evidence" in sys.argv[1:])
