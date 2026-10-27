# 學者月檢索 10/26 週候選 5 筆：首發日核對（2026-10-27）

管理者 2026-10-26 以瀏覽器提供出版者全文或出版者頁，文獻 session 核對後整理於私人 repo `from-literature-session/scholar-monthly-1026/verify-scholar-1026.csv`（分支 `lit-session-scholar-1026`）。對應候選 W2026-10-23-A11～A15（PR #387）與知識庫 KB-2026-0444～0448。

| 候選 | 紀錄 | DOI | 首次公開日 | 依據 | 學段 |
|---|---|---|---|---|---|
| A11 | KB-2026-0444 | 10.5753/wie.2026.28044 | 2026-10-05 | 出版者頁（SBC）「Publicado 05/10/2026」；Crossref published-online 同日 | 高中 |
| A12 | KB-2026-0445 | 10.1016/j.compedu.2026.105769 | 2026-10-15 | 出版者 PDF「Available online 15 October 2026」 | 國中（七年級） |
| A13 | KB-2026-0446 | 10.1080/10494820.2026.2744403 | 2026-10-08 | 出版者 PDF「Published online: 08 Oct 2026」 | K12 跨學段 |
| A14 | KB-2026-0447 | 10.18261/njdl.21.2.4 | 2026-10-23（未核） | 只有 Crossref published-print；出版者頁 403、PDF 只載卷期 | 國中 |
| A15 | KB-2026-0448 | 10.1016/j.appdev.2026.102014 | 2026-10-15 | 出版者 PDF「Available online 15 October 2026」 | 國小（一年級） |

- **處理方式（管理者 2026-10-27「甲」）**：候選維持 `hold`，只把核對結果寫進候選（`source_publication_date`、`source_locator`、`screening_note`）；知識庫紀錄暫不升級。理由：知識庫測試要求 hold 候選對應的紀錄維持 `discovered_unverified`、首發日留空，而候選改 `publish` 代表決定刊出，不宜在週報與月報選錄前先做。
- **之後**：10/30 週報出刊前檢查或 11/01 月報出刊前檢查選用其中幾篇時，把選中的候選改 `publish`、對應紀錄升 `bibliographic_checked` 並填上表的首發日與依據；A14 須先由管理者以瀏覽器確認出版者頁日期。
- 除 A14 外，首發日都早於本週期（10/23 起），屬回補項目。
- 月報專用 5 篇的核對見私人 repo `verify-monthly-only-1026.csv`，不匯入候選池，供 10 月號第 2 項選用。
