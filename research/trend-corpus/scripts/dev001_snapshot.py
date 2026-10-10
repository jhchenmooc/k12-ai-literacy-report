"""DEV-001: same-day four-year ID snapshot rerun with generic-AI x K-12 audience subqueries.

Usage:  python3 -I dev001_snapshot.py <out_dir>
Runs step2_snapshot.main() with MAIN extended by A1-A6 (probe_aud.AQ).  The
original step-2 snapshots in YYYY/ are left untouched; output goes to
<out_dir>/YYYY/.  Only work IDs and counts are stored.
"""
import os, sys
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import step2_snapshot as s2  # noqa: E402
from probe_aud import AQ  # noqa: E402

s2.MAIN.update(AQ)

if __name__ == "__main__":
    s2.main(sys.argv[1])
