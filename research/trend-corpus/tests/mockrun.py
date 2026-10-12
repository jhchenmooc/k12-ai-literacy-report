"""Run a network-using trend-corpus script with a mocked OpenAlex transport and no real network.

Usage: python3 -I mockrun.py <spec.json> <script.py> [script args...]

The script runs in this process (runpy) so urllib.request.urlopen can be replaced; an
audit hook refuses every socket connect / DNS lookup, and time.sleep is a no-op.
Each urlopen call is logged to mock-log.json in the working directory on exit.

spec.json:
  works        list of OpenAlex work objects served by the fake API
  reverse      true: return matching works in reverse order
  meta_add     integer added to meta.count (simulate truncated results)
  calls        {"<n>": action} for the n-th urlopen call (1-based, retries count)
  fail_from    action applied to every call from this number on: {"n": 3, "action": {...}}
  actions:     {"url_error": true} | {"http": 500} | {"body": "raw text"} | {"json": {...}}
"""
import io, json, os, runpy, sys, time, urllib.error, urllib.parse, urllib.request
import atexit


def _block(event, args):
    if event in ("socket.connect", "socket.getaddrinfo", "socket.gethostbyname"):
        raise RuntimeError(f"mockrun: real network blocked ({event})")


sys.addaudithook(_block)

spec_path, script = sys.argv[1], sys.argv[2]
with open(spec_path, encoding="utf-8") as fh:
    SPEC = json.load(fh)
LOG = []


@atexit.register
def _write_log():
    with open("mock-log.json", "w", encoding="utf-8") as fh:
        fh.write(json.dumps(LOG))


time.sleep = lambda s: None


class Resp(io.BytesIO):
    status = 200

    def __enter__(self):
        return self

    def __exit__(self, *a):
        self.close()


def ndoi(d):
    return (d or "").lower().replace("https://doi.org/", "")


def serve(url):
    q = urllib.parse.parse_qs(urllib.parse.urlsplit(url).query)
    kind, _, vals = q["filter"][0].partition(":")
    want = vals.split("|")
    if kind == "doi":
        want = {ndoi(v) for v in want}
        hits = [w for w in SPEC.get("works", []) if ndoi(w.get("doi")) in want]
    else:
        want = set(want)
        hits = [w for w in SPEC.get("works", []) if (w.get("id") or "").rsplit("/", 1)[-1] in want]
    if SPEC.get("reverse"):
        hits = hits[::-1]
    per = int(q.get("per-page", ["25"])[0])
    cur = q.get("cursor", [None])[0]
    off = 0 if cur in (None, "*") else int(cur)
    page = hits[off:off + per]
    nxt = str(off + per) if cur is not None and off + per < len(hits) else None
    meta = {"count": len(hits) + SPEC.get("meta_add", 0), "per_page": per}
    if cur is not None:
        meta["next_cursor"] = nxt
    return {"meta": meta, "results": page}


def fake_urlopen(url, timeout=None, **kw):
    url = url.full_url if hasattr(url, "full_url") else url
    n = len(LOG) + 1
    LOG.append(url)
    act = SPEC.get("calls", {}).get(str(n))
    ff = SPEC.get("fail_from")
    if act is None and ff and n >= ff["n"]:
        act = ff["action"]
    if act:
        if act.get("url_error"):
            raise urllib.error.URLError("mock connection refused")
        if "http" in act:
            raise urllib.error.HTTPError(url, act["http"], "mock", {}, None)
        if "body" in act:
            return Resp(act["body"].encode("utf-8"))
        if "json" in act:
            return Resp(json.dumps(act["json"]).encode("utf-8"))
    return Resp(json.dumps(serve(url)).encode("utf-8"))


urllib.request.urlopen = fake_urlopen
sys.argv = [script] + sys.argv[3:]
runpy.run_path(script, run_name="__main__")
