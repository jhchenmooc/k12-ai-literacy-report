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
"""
import csv, io, json, os, sys, tempfile


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
                    errors.append(f"{w}: duplicate second coding at {os.path.basename(f0)}:{n0} and {where}")
                    continue
                seen[w] = (o, f, n)
    return seen
