"""Simulate Windows default text I/O (locale cp950, '\\r\\n' newline translation) on Linux.

Usage: python3 -I winrun.py <script.py> [args...]   (can wrap mockrun.py)
open() calls that do not name an encoding get cp950, and text writes without an explicit
newline get '\\r\\n', as with Python's default text mode on a Traditional Chinese Windows.
"""
import builtins, io, runpy, sys

_open = io.open


def win_open(file, mode="r", buffering=-1, encoding=None, errors=None, newline=None, closefd=True, opener=None):
    if "b" not in mode:
        if encoding is None:
            encoding = "cp950"
        if newline is None and any(c in mode for c in "wa+"):
            newline = "\r\n"
    return _open(file, mode, buffering, encoding, errors, newline, closefd, opener)


builtins.open = io.open = win_open
sys.argv = sys.argv[1:]
runpy.run_path(sys.argv[0], run_name="__main__")
