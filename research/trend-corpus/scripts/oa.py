"""OpenAlex helper for trend-corpus step 1.

Single-threaded, >=0.2 s between requests, honours Retry-After on 429.
No email / mailto / credentials are added to any URL (the environment proxy
may add its own; nothing is printed).  Every request is appended to a JSONL
log: url, utc, http status, meta.count (if any).
"""
import json, os, ssl, sys, time, urllib.parse, urllib.request

BASE = "https://api.openalex.org"
LOG = os.environ.get("OA_LOG", "openalex-requests.jsonl")
_last = [0.0]
_ctx = None


def _context():
    global _ctx
    if _ctx is None:
        cafile = os.environ.get("SSL_CERT_FILE") or ("/root/.ccr/ca-bundle.crt" if os.path.exists("/root/.ccr/ca-bundle.crt") else None)
        _ctx = ssl.create_default_context(cafile=cafile)
    return _ctx


def get(path, params=None, purpose=""):
    q = urllib.parse.urlencode(params or {}, safe=":|,()\"*!<>")
    url = f"{BASE}{path}" + (f"?{q}" if q else "")
    for attempt in range(5):
        wait = 0.21 - (time.time() - _last[0])
        if wait > 0:
            time.sleep(wait)
        _last[0] = time.time()
        utc = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
        req = urllib.request.Request(url, headers={"User-Agent": "k12-ai-literacy-report trend-corpus (https://github.com/jhchenmooc/k12-ai-literacy-report)"})
        try:
            with urllib.request.urlopen(req, context=_context(), timeout=60) as r:
                body = json.loads(r.read().decode("utf-8"))
                status = r.status
        except urllib.error.HTTPError as e:
            status = e.code
            body = None
            if e.code == 429:
                ra = e.headers.get("Retry-After")
                _log(url, utc, status, None, purpose)
                time.sleep(float(ra) if ra and ra.isdigit() else 2 ** attempt)
                continue
        _log(url, utc, status, (body or {}).get("meta", {}).get("count") if isinstance(body, dict) else None, purpose)
        return status, body
    return 429, None


def _log(url, utc, status, count, purpose):
    with open(LOG, "a", encoding="utf-8") as f:
        f.write(json.dumps({"url": url, "utc": utc, "http": status, "count": count, "purpose": purpose}, ensure_ascii=False) + "\n")


def calls():
    if not os.path.exists(LOG):
        return 0
    return sum(1 for _ in open(LOG, encoding="utf-8"))
