"""Shared helpers for trend-corpus scripts: refusal exits and atomic output writes.

Import from a sibling script with the repo pattern (works under `python3 -I`):
    HERE = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, HERE); import safeio

Write rules (REPAIR-PLAN v5.10 W1-W5):
- W1: callers validate everything first and build outputs in memory as bytes;
  nothing is opened for writing until then.
- W2/W3: write_atomic() writes every output to a temp file in the target directory,
  closes all of them, and only then os.replace()s them one by one. Any failure, while
  writing or while replacing, removes the temps this call created that are not yet in
  place. The gap between two os.replace() calls is NOT covered: a failure there can leave
  the files inconsistent (the earlier output is already replaced and is not rolled back).
- W5: die() writes the reason to stderr and exits nonzero. Callers pass IDs, file
  names, line numbers, lengths or hashes only, never abstract or evidence text.
  Values read from coder batches (model output) are untrusted: show them with
  show_id() / show_label(), which print only an ID-shaped or label-shaped value and
  otherwise its type, length and hash.
"""
import csv, hashlib, io, json, os, re, sys, tempfile


def describe(v):
    """Type, length and SHA-256 prefix of an untrusted value; the value itself is never printed."""
    t = v if isinstance(v, str) else json.dumps(v, ensure_ascii=False, sort_keys=True, default=str)
    return f"{type(v).__name__}, {len(t)} chars, sha256 {hashlib.sha256(t.encode('utf-8')).hexdigest()[:12]}"


def show_id(v):
    """An untrusted work_id: printed only if it looks like an OpenAlex work ID."""
    return v if isinstance(v, str) and re.fullmatch(r"W\d{1,12}", v) else f"<work_id {describe(v)}>"


def show_label(v):
    """An untrusted short label such as a model ID: printed only if it is a plain token."""
    return v if isinstance(v, str) and re.fullmatch(r"[A-Za-z0-9._:-]{1,64}", v) else f"<value {describe(v)}>"


def die(lines, code=1):
    """Print a refusal (one string or a list of strings) to stderr and exit nonzero."""
    if isinstance(lines, str):
        lines = [lines]
    prog = os.path.basename(sys.argv[0]) if sys.argv and sys.argv[0] else "script"
    for x in lines:
        sys.stderr.write(f"{prog}: {x}\n")
    sys.stderr.flush()
    sys.exit(code)


def csv_bytes(header, rows, lineterminator="\r\n"):
    """Serialise rows the way csv.writer would write them to a file opened with newline=''."""
    buf = io.StringIO(newline="")
    w = csv.writer(buf, lineterminator=lineterminator)
    if header is not None:
        w.writerow(header)
    w.writerows(rows)
    return buf.getvalue().encode("utf-8")


def json_bytes(obj, **kw):
    """json.dump() output as UTF-8 bytes; newlines stay '\\n' on every platform."""
    return json.dumps(obj, **kw).encode("utf-8")


def _umask():
    m = os.umask(0)
    os.umask(m)
    return m


def write_atomic(outputs):
    """outputs: list of (path, bytes). All temps are written and closed before the first replace.

    Every temp file this call creates and has not yet moved into place is removed on any failure,
    including a failed os.replace; the raw descriptor from mkstemp is closed even if wrapping it fails
    (an open descriptor would make the temp undeletable on Windows). Outputs already replaced are not
    rolled back (W3: no cross-file transaction).
    """
    pending, mode = [], 0o666 & ~_umask()  # (temp, target) not yet replaced
    try:
        for path, data in outputs:
            d = os.path.dirname(os.path.abspath(path))
            fd, tmp = tempfile.mkstemp(dir=d, prefix="." + os.path.basename(path) + ".", suffix=".tmp")
            pending.append((tmp, path))
            try:
                f = os.fdopen(fd, "wb")
            except BaseException:
                os.close(fd)
                raise
            with f:
                f.write(data)
                f.flush()
                os.fsync(f.fileno())
            os.chmod(tmp, mode)  # mkstemp creates 0600; give the output the usual permissions
        while pending:
            tmp, path = pending[0]
            os.replace(tmp, path)
            pending.pop(0)
    finally:
        for tmp, _ in pending:
            try:
                os.unlink(tmp)
            except OSError:
                pass


def read_jsonl_batches(paths, errors):
    """Read coder batch files. Returns {work_id: (obj, file, line)}.

    Every duplicate work_id (same or different content, same or different file) and every
    malformed line is appended to `errors` with file name and line number.
    """
    seen = {}
    for f in paths:
        with open(f, encoding="utf-8") as fh:
            for n, line in enumerate(fh, 1):
                if not line.strip():
                    continue
                where = f"{os.path.basename(f)}:{n}"
                try:
                    o = json.loads(line)
                except ValueError as e:
                    errors.append(f"{where}: bad JSON ({e.msg})")
                    continue
                w = o.get("work_id") if isinstance(o, dict) else None
                if not isinstance(w, str) or not w.strip():
                    errors.append(f"{where}: missing, empty or non-string work_id")
                    continue
                if w in seen:
                    _, f0, n0 = seen[w]
                    errors.append(f"{show_id(w)}: duplicate second coding at {os.path.basename(f0)}:{n0} and {where}")
                    continue
                seen[w] = (o, f, n)
    return seen


def check_code2_values(batches, errors):
    """Reject second-coding values the agreement tables use but the codebook does not allow.

    Checks ai_lit_class (required), audience_role, stage, method (empty or missing = unknown) and
    ai_lit_dims (list, or ';'/',' separated string). Errors name file, line and field, never the value.
    """
    HERE = os.path.dirname(os.path.abspath(__file__))
    sys.path.insert(0, HERE)
    from validate_coding import ENUM, DIMS  # noqa: E402
    for o, f, n in batches.values():
        where = f"{os.path.basename(f)}:{n}"
        for k in ("ai_lit_class", "audience_role", "stage", "method"):
            v = o.get(k)
            if k != "ai_lit_class" and v in (None, ""):
                continue
            if not (isinstance(v, str) and v in ENUM[k]):
                errors.append(f"{where}: {k} value not allowed ({describe(v)})")
        d = o.get("ai_lit_dims")
        if d in (None, ""):
            items = []
        elif isinstance(d, list):
            items = d
        elif isinstance(d, str):
            items = [t for t in d.replace(";", ",").split(",") if t.strip()]
        else:
            items = [d]
        for t in items:
            if not (isinstance(t, str) and t in DIMS):
                errors.append(f"{where}: ai_lit_dims value not allowed ({describe(t)})")
