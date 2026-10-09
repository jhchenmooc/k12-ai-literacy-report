# 2026 全年依作者檢索：60 篇逐篇篩選與入庫（2026-10-09）

> **性質：人工搜尋輔助的整合紀錄，不是認證。** 篩選子代理與整合者為同一模型，**不算獨立審閱**。候選池、`publication/issues.json`、`research/drafts/`、閘門未動；網站只動 `render-site.js --write` 產生區塊。

## 範圍與方法

- 輸入：編輯 session 的 2026 全年概覽（#121，[`k12-ai-hits.json`](../p0-scholar-year2026-2026-10-09/k12-ai-hits.json)）中 `in_kb: false` 的 60 篇（關鍵字粗分的 K-12＋AI，未逐篇判讀）。[todo.json](todo.json) 標出與 #119 `screen.json` 重疊的 17 篇。
- 重疊 17 篇沿用 #119 判讀：8 篇已有決定（2 篇已於 #120 入庫、3 篇待判、3 篇排除），9 篇在 #119 為學段不明或非 AI 主題，不入庫。
- 新篩 43 篇分兩批（[screen-a](screen-a.md)、[screen-b](screen-b.md)）：OpenAlex 作品資料（作者 ORCID 與單位、摘要）、Crossref 書目；逐篇判作者歸屬、學段、主題、版本（預印本只當線索）、與知識庫去重。**所有請求均未帶 email 或 mailto。**
- 學段依管理者 2026-10-09 規則：中小學（含幼兒園至高中）在職教師算 K-12；職前教師、師培另標「師培」（可入庫、不進週報候選）；混合且未寫主要對象者記「不明」。

## 結果

| 來源 | 篇數 | 入庫 | 已在庫 | 待判 | 排除 | 主題符合但非 K-12 |
|---|---|---|---|---|---|---|
| 沿用 #119 | 17 | 0（2 篇已於 #120 入庫） | — | 3 | 3（另 9 篇不符） | — |
| A 批 | 22 | 6 | 1（arXiv 2601.06101 → KB-2026-0013） | 7 | 7 | 1 |
| B 批 | 21 | 3 | 0 | 4 | 14 | 0 |

- 新篩 43 篇學段：K-12 30、師培 0、非 K-12 5、不明 8。作者歸屬：同名／混入 0、不確定 1（H20，排除）。
- 排除主因：AI 只當學習工具 15、與 AI 教育無關 6、勘誤 1、資料集 1。

**管理者決定（2026-10-09）**：照整合者建議。
1. 入庫 9 篇；整合者把子代理建議入庫的 4 篇改為待判：`caeai.2026.100551`（只寫 school education，比照「只寫 schools 者待判」）、`caeai.2026.100555`（中學＋大學、未寫主要對象，記不明）、`s44436-026-00028-4`（early childhood 可能含 0–3 歲）、`01443410.2026.2668683`（GenAI 主要為回饋工具，AI 素養只是結果變項之一）。
2. 主題符合但非 K-12 的 1 篇（arXiv 2601.21631／EDUCON 2026，大學 CS1）不入庫：知識庫入選仍以 K-12 為主；「列入學者清單不論學段」只指監測學者的選取。
3. #121 `runs.json` 的 62 筆 2026 全年查詢寫入 `search_runs.csv`（`P0-20261009-SCHOLAR2026-<ID>`，與 90 天試跑 `P0-20261009-SCHOLAR-*` 分開）。

## 入庫明細（全部 `discovered_unverified`、首發日 unknown、`year_basis=issue_year`；題名與年份取自 Crossref）

| record_id | DOI | 出處 | 監測代碼 | 類別 | 國別 | 命中學者 |
|---|---|---|---|---|---|---|
| KB-2026-0130 | `10.1145/3786761` | ACM TOCE | J14 | K6 |  | H01 |
| KB-2026-0131 | `10.1111/ejed.70464` | European Journal of Education | — | K3 | TW | T01 |
| KB-2026-0132 | `10.1016/j.caeai.2026.100556` | Computers and Education: AI | J02 | K2 |  | H21 |
| KB-2026-0133 | `10.1080/02619768.2026.2621848` | European Journal of Teacher Education | — | K4 |  | H11 |
| KB-2026-0134 | `10.1080/1475939x.2026.2619458` | Technology, Pedagogy and Education | — | K1 | SE | H12 |
| KB-2026-0135 | `10.1145/3731459.3773305` | TEI '26 | — | K6 |  | H01 |
| KB-2026-0136 | `10.1609/aaai.v40i47.41526` | AAAI Proceedings（EAAI-26，vol 40 no 47） | C22 | K6 |  | H14 |
| KB-2026-0137 | `10.1609/aaai.v40i47.41522` | AAAI Proceedings（EAAI-26，vol 40 no 47） | C22 | K6 |  | H15、H17 |
| KB-2026-0138 | `10.1007/s10639-026-13998-y` | Education and Information Technologies | J05 | K2（高風險，待 G2–G4） |  | H11 |

- records 209→218、relations 549→565、search runs 178→240。`results_seen`＝OpenAlex 總數、`results_screened`＝關鍵字 K-12＋AI 子集、`results_recorded`＝該學者命中的入庫數。測試未修改；本機 `node --test research/*.test.js` 201／201 通過。

## 待判（14 篇）與限制

- A 批：`caeai.2026.100551`、`caeai.2026.100555`、`s44436-026-00028-4`、UEF 典藏 W7215575453（芬蘭國中教師、只有 submitted version）、UTS Figshare 報告（灰色文獻）、SSRN 6278616（無摘要）、`tate.2026.105384`（職前＋在職混合回顧）。
- B 批：`01443410.2026.2668683`、arXiv 2603.20056（職業教育機構、學段不明、只有預印本）、Edward Elgar 章節（無摘要）、IDC 2026 `3806146`（只寫 youth）。
- 沿用 #119：`caeo.2026.100422`、`10494820.2026.2744403`、OSF TAIL 預印本。
- 未讀出版社頁或全文；預印本找正式版只比對 OpenAlex locations 與 Crossref 題名查詢前數筆，改題名的正式版可能漏掉。兩篇 EAAI 未讀期次頁分節，依指南 vol 40 no 47 屬 EAAI-26。
