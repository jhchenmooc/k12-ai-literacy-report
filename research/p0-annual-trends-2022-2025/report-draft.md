# K-12 AI 素養期刊研究：2022–2025 四年合併報告（內部草稿，已移出公開 repo）

> **狀態：內部草稿，不公開。**管理者 2026-10-11 決定（[方案](../annual-paper-trend-analysis-plan.md)第 10 節第 32 項）：四年合併報告草稿在 D5 人工驗證完成前，只放在研究團隊的私人 repo；本檔只留說明。早期版本（#249、#251）仍在本 repo 的 git 歷史中，那些版本有已知錯誤，已在後續修訂更正，**請勿引用**。

## 仍在公開 repo、可供查核的部分

- **語料與逐篇判讀：**`research/trend-corpus/<年>/corpus.csv`、`2025/corpus-v2.csv`（不含摘要；摘要以 `abstract_sha256` 核對）。
- **計算程式：**`research/trend-corpus/scripts/fouryear_tables.py`（在 repo 根目錄執行 `python3 -I research/trend-corpus/scripts/fouryear_tables.py research/trend-corpus --tables` 可重算主表、結論規則與多數附表；部分探索性數字為手算，見草稿附錄 A。`--journal-csv` 會覆寫指定檔案，重算時請寫到暫存路徑再與 `journal-year.csv` 比對）、`recall_refset.py`、`wos_compare.py`。
- **逐刊逐年資料：**[journal-year.csv](journal-year.csv)。
- **規則、偏離與更正：**[PROTOCOL](../trend-corpus/PROTOCOL.md)、[DEVIATIONS.csv](../trend-corpus/DEVIATIONS.csv)（DEV-001–022）、[ERRATA.csv](../trend-corpus/ERRATA.csv)（ERR-001–007）、方案第 10 節決定 1–33。
- **一致性與對照：**`research/p0-annual-trends-2022-2024/step3-agreement.md`、`research/trend-corpus/wos/report.md`、`research/trend-corpus/recall.csv`。
- **自檢紀錄：**PR #252 的留言（第 4–12 輪多角度自檢的剩餘問題清單）。
