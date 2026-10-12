"""Shared helpers for the offline trend-corpus regression tests.

Run all tests (CI does the same):  python3 -I -m unittest discover -s research/trend-corpus/tests -v
Fixtures are synthetic, written as bytes into fresh OS temp directories (outside any git
work tree); scripts run as documented with `python3 -I`. Network scripts go through
mockrun.py, which blocks real sockets.
"""
import csv, hashlib, io, json, os, subprocess, sys, tempfile, unittest

TESTS = os.path.dirname(os.path.abspath(__file__))
TC = os.path.dirname(TESTS)
SCRIPTS = os.path.join(TC, "scripts")
MOCKRUN = os.path.join(TESTS, "mockrun.py")
WINRUN = os.path.join(TESTS, "winrun.py")
SENTINEL = b"SENTINEL: existing legitimate output\n"


def sha(b):
    return hashlib.sha256(b).hexdigest()


def put(path, data):
    """Write fixture bytes exactly (str is UTF-8 encoded, newlines untouched)."""
    os.makedirs(os.path.dirname(path) or ".", exist_ok=True)
    with open(path, "wb") as f:
        f.write(data.encode("utf-8") if isinstance(data, str) else data)


def csv_text(header, rows, lt="\n"):
    buf = io.StringIO(newline="")
    w = csv.writer(buf, lineterminator=lt)
    w.writerow(header)
    w.writerows(rows)
    return buf.getvalue()


def jsonl(objs):
    return "".join(json.dumps(o, ensure_ascii=False) + "\n" for o in objs)


class Case(unittest.TestCase):
    def setUp(self):
        self._tmp = tempfile.TemporaryDirectory(prefix="tc-test-")
        self.d = self._tmp.name

    def tearDown(self):
        self._tmp.cleanup()

    def fresh(self):
        """New empty temp dir (for subTest loops)."""
        self._tmp.cleanup()
        self.setUp()

    def p(self, *parts):
        return os.path.join(self.d, *parts)

    def run_script(self, script, *args, cwd=None, win=False):
        """win=True simulates Windows default text I/O (cp950, CRLF) via winrun.py."""
        pre = [WINRUN] if win else []
        return subprocess.run([sys.executable, "-I", *pre, os.path.join(SCRIPTS, script), *map(str, args)],
                              cwd=cwd or self.d, capture_output=True)

    def run_mock(self, spec, script, *args, cwd=None, win=False):
        put(self.p("spec.json"), json.dumps(spec))
        pre = [WINRUN] if win else []
        return subprocess.run([sys.executable, "-I", *pre, MOCKRUN, self.p("spec.json"), os.path.join(SCRIPTS, script),
                               *map(str, args)], cwd=cwd or self.d, capture_output=True)

    def same_bytes_on_windows_text_mode(self, run, outputs):
        """Run once normally and once under winrun; every output must be byte-identical UTF-8."""
        first = {}
        for win in (False, True):
            for n in outputs:
                if os.path.exists(self.p(n)):
                    os.remove(self.p(n))
            self.assert_ok(run(win))
            for n in outputs:
                b = self.read(n)
                self.assertGreater(len(b), 0, n)
                b.decode("utf-8")
                if win:
                    self.assertEqual(b, first[n], n)
                else:
                    first[n] = b

    def mock_calls(self):
        with open(self.p("mock-log.json"), encoding="utf-8") as f:
            return json.load(f)

    def read(self, name):
        with open(self.p(name), "rb") as f:
            return f.read()

    def plant(self, *names):
        for n in names:
            put(self.p(n), SENTINEL)

    def assert_rejected(self, r, outputs, planted=True, stderr_has=None):
        """Nonzero exit; outputs keep the SENTINEL (or stay absent); no temp files left."""
        self.assertNotEqual(r.returncode, 0, r.stdout.decode("utf-8", "replace"))
        for n in outputs:
            if planted:
                self.assertEqual(self.read(n), SENTINEL, n)
            else:
                self.assertFalse(os.path.exists(self.p(n)), n)
        self.assert_no_temps()
        if stderr_has:
            self.assertIn(stderr_has, r.stderr.decode("utf-8", "replace"))

    def assert_ok(self, r):
        self.assertEqual(r.returncode, 0, r.stderr.decode("utf-8", "replace"))
        self.assert_no_temps()

    def assert_no_temps(self):
        for root, _, files in os.walk(self.d):
            for f in files:
                self.assertFalse(f.endswith(".tmp"), os.path.join(root, f))
