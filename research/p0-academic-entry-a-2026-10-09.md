# v1.7 P0 學術逐源監測｜入口批次 A（2026-10-09）

> 本紀錄是**本次實際入口查核／部分可及性結果**，不是 39 期刊＋21 會議全面檢索；未進行正式布林式全文跨庫搜尋，不能記成 query_scoped 或 items_screened，也不能宣稱任何來源 0 命中。參照 [監測清單](venue-watchlist.md)；原有來源 ID 不變。

## 可重現的批次範圍

- 執行日：2026-10-09（Asia/Taipei）；批次 ID：`P0-ENTRY-20261009-A`。
- 操作：以官方監測清單所列 URL 發出入口查閱；閱讀可取回之官方期刊與會議索引／刊物頁；遇 403 如實記錄。
- 檢索式：**無**（入口型檢查，未進行文章主題條件查詢）；正式文獻查核時間窗：**未設定**。
- 篩選／正式加入篇數：**未執行逐篇學段、DOI、Online First 查證；不以 0 命中表示無文章**。
- Coverage：`entry_only` 或 `partial/unavailable`；這是一份人工可追溯筆記，暫不冒填 `search_runs.csv` 的搜尋式、命中／篩選數。

| ID | 入口（2026-10-09） | 實際觀察 | coverage | 後續處理 |
|---|---|---|---|---|
| J01 Computers & Education | https://www.sciencedirect.com/journal/computers-and-education | 直接瀏覽返回 HTTP 403；不能證明 2026 論文狀況 | partial/unavailable | 用出版商允許的清單頁／Crossref DOI 補查，保留首次公開日期區分 |
| J02 Computers & Education: Artificial Intelligence | https://www.sciencedirect.com/journal/computers-and-education-artificial-intelligence | 直接瀏覽返回 HTTP 403；不可宣稱無 K–12 研究 | partial/unavailable | 另查正式出版商文章頁與 DOI |
| J03 International Journal of Artificial Intelligence in Education | https://link.springer.com/journal/40593 | Springer 歷史期刊首頁明列：**自 2026-01-01 起改由 Elsevier 出版**；該頁最新號為 2025 年卷，不能作為 2026 唯一新文章入口 | entry_only（僅歷史出版社） | **高優先維護事件**：保留 Springer 歷史期數入口，後續確認 Elsevier 的正式 2026 文章入口及 DOI，不自行猜測 URL；不刪除既有 J03 ID |
| C01 AIED | https://www.aied-conference.org/2026/program/proceedings | 官方 2026 論文集分 LNAI Main Proceedings **六部**及 CCIS Supplementary **三部**；不同論文類別不可混成同等正式證據 | entry_only | 下一批沿官方 Volume → 單篇 DOI／出版日期／K–12 學段逐篇審核 |
| C02 EDM | https://educationaldatamining.org/edm2026/accepted-papers/ | 2026 accepted papers 官方入口可讀；**accepted papers 清單不等於逐篇正式論文集完整出版狀態** | entry_only | 釐清正式 proceedings／每篇 DOI 與 paper type，逐篇核對 |

## 反證、自檢與維護事項

1. **重大來源變化**：J03 2026 出版商轉移是 v1.7「重大事件即時檢閱」的案例；此處先標示追查，正式更改來源池入口須在查到 Elsevier 權威網址之後執行，不以猜測 URL 覆寫既有監測設定。
2. **研究與會議不可混**：C01 LNAI Main 與 CCIS Supplementary 分別記錄；C02 accepted 清單與正式 DOI/proceedings 分別核對。
3. **覆蓋層級**：五個監測 ID 只做入口檢查，J01/J02 不可讀；未做任何一個 ID 的「逐篇篩選」「全文核對」或確切零命中結論。保留其餘 55 個來源為未查。
4. **日期與身份**：期刊出版社轉移日不是單篇新研究的發表日；2026 年會議日期也不是單篇論文 Online First。
5. **出版閘門**：本批只新增文件；不改九筆 `hold`、知識庫 `bibliographic_checked`、週報 claims、manifest 或 v1.6 程式；未引入需要授權的全文。

後續順序：先補 J03 新出版社權威入口與 J01/J02 出版商可讀來源，再沿其餘 39/21 名單分批記錄可靠的 `query_scoped`／`items_screened`；未實際執行前不得升級 coverage。
