"""F06: offline scripts read repo data and write outputs identically in Windows default text mode (cp950)."""
import os, unittest
from support import Case, TC


class WindowsTextMode(Case):
    def check(self, script, args, outputs):
        self.same_bytes_on_windows_text_mode(lambda win: self.run_script(script, *args, win=win), outputs)

    def test_fouryear_tables(self):
        self.check("fouryear_tables.py", [TC, "--json", "out.json", "--journal-csv", "jc.csv"], ["out.json", "jc.csv"])

    def test_agreement_samples(self):
        self.check("agreement_sample.py", [os.path.join(TC, "2025", "corpus-v2.csv")], ["sample.json"])
        self.check("agreement_sample_backfill.py", [TC], ["sample.json"])
        with open(os.path.join(TC, "backfill-2022-2024", "sample.json"), "rb") as f:
            self.assertEqual(self.read("sample.json"), f.read())

    def test_stdout_only_scripts_run(self):
        for script, args in (("wos_query.py", [TC]), ("recall_refset.py", [TC, "--offline"])):
            with self.subTest(script):
                a, b = self.run_script(script, *args), self.run_script(script, *args, win=True)
                self.assertEqual((a.returncode, b.returncode), (0, 0), b.stderr)
                self.assertEqual(a.stdout, b.stdout)


if __name__ == "__main__":
    unittest.main()
