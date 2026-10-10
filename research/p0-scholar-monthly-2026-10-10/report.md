# 學者追蹤月檢索：A3、A4、B、H、V（2026-10-10）

> **性質：** 這是人工搜尋輔助的篩選紀錄，不是認證。判讀子代理與整合者是同一模型，**不算獨立審閱**。
>
> **依據：** [學者追蹤運用規格](../scholar-watch-usage-spec.md) v1.1，查法依[學者清單](../scholar-watchlist.md)第 5 節。
>
> **請求：** 所有請求都沒有帶 email 或 mailto，也沒有繞過出版社頁。

## 範圍

- **學者：** 共 79 人，依級別為 A3 4 人、A4 7 人、B 9 人、H 33 人、V 26 人。
- **查詢期間：** OpenAlex `publication_date` 2026-08-29～10-10。
  - 這涵蓋 10 月月報的觀察期 08-29～09-29，再延伸到 10-10。
  - `publication_date` 不等於首發日。
- **查詢方式：** 每位學者一筆查詢，寫入 `search_runs.csv`，編號為 `SCHOLAR-20261010-<學者 ID>`。
  - S06、V07 依清單加了教育主題詞，另外也跑一次不加篩選的查詢核對，兩種查法的筆數相同（S06 5 筆、V07 0 筆）。
  - V17 依清單改用 OpenAlex 作者 ID 查詢。
- **79 筆查詢都回 HTTP 200，沒有查詢失敗。**

## 各級結果

| 級別 | 人數 | 有作品 | 命中數（合著重複計） | 教育相關 |
|---|---|---|---|---|
| A3 | 4 | 2 | 4 | 3 |
| A4 | 7 | 3 | 6 | 5 |
| B | 9 | 7 | 16 | 12 |
| H | 33 | 14 | 34 | 24 |
| V | 26 | 14 | 36 | 31 |

- **去重與排除：** 去重後共 89 篇，排除 21 篇。
  - 排除的原因有：非教育論文、附檔或資料集副本、會議論文集整冊、書評。
  - 其中 1 篇是同名混入：T19 名下的 `10.1016/j.bios.2026.119215` 是微流體論文，作者是臺大另一位同名者。
- **逐篇判讀：** 其餘 68 篇的範圍判讀為 A 16、B 15、C 33、不明 4。
- **已在知識庫：** `10.33422/ejte.v8i3.1872`（KB-2026-0129）、`10.15388/infedu.2601.025`（KB-2026-0128）。
- **其他：** 其餘作品都不在知識庫，也不在候選池。
- **逐篇明細：** [results.json](results.json)。

## 可進週報的候選（3 筆，交編輯 session 匯入）

這 3 篇的首次公開日都早於本週週報期，屬背景回補；匯入後全部 hold。批次檔是 [batch-2026-10-10-scholar-M-1.json](batch-2026-10-10-scholar-M-1.json)。

| DOI | 學者 | 類別 | 對象 | 首次公開 |
|---|---|---|---|---|
| `10.3389/feduc.2026.1885959`（數學教師 AI 信念量表 B-AIMT） | H09 | A | k12 | 2026-08-31（Frontiers 頁 `citation_online_date`） |
| `10.1016/j.chbah.2026.100402`（AI Mindset） | H18 | A | other_stakeholders | 2026-06-02（PsyArXiv 預印本，OSF API）；正式版 Elsevier 頁讀不到 |
| `10.1007/s44436-026-00043-5`（SCALE × AI 藝術本位教學） | V03 | B | k12 | 2026-09-02（Springer 頁 `citation_online_date`） |

- **模擬匯入：** 用 `ingest-candidates.js` 的 `merge()` 對 `research/drafts/2026-10-09_2026-10-15.json` 的副本做模擬匯入，可新增 3 筆，沒有重複。
- **知識庫對應紀錄：** 依規格 v1.1，匯入候選池時要同時在 `records.csv` 為每筆建一筆對應紀錄。紀錄的欄位如下：
  - `discovered_unverified`
  - 首發日空白
  - `year_basis=unknown`
  - `source_candidate_id` 填匯入後的候選編號

  知識庫測試要求候選池與這類紀錄一一對應，所以兩者要在同一個 commit。**本 PR 不寫這 3 筆知識庫紀錄**，由編輯 session 匯入候選池時一併建立。以下是建議值，紀錄編號以匯入當時的 2026 年最大號加 1 為準：

| DOI | record_type | title | primary_url |
|---|---|---|---|
| `10.3389/feduc.2026.1885959` | journal_article | The B-AIMT: development and initial validation of a domain-specific instrument for assessing mathematics teachers’ beliefs about artificial intelligence | https://www.frontiersin.org/articles/10.3389/feduc.2026.1885959/full |
| `10.1016/j.chbah.2026.100402` | journal_article | AI Mindset – An empirically tested theoretical framework on the psychological factors shaping AI competence and AI use | https://doi.org/10.1016/j.chbah.2026.100402 |
| `10.1007/s44436-026-00043-5` | journal_article | Fostering SCALE habits of mind through AI-empowered arts-based pedagogy | https://link.springer.com/article/10.1007/s44436-026-00043-5 |

## 管理者決定（2026-10-10）

1. **`feduc.1885959`：** 對象記 k12。樣本是職前與在職數學教師，沒有寫任教學段。
2. **`chbah.100402`：** 對象記 other_stakeholders，比照「未限定學段的教育工作者」。
3. **`s44436-…043-5`：** 對象記 k12。原文寫「K-12 education and beyond」。
4. **`s44436-…044-4`：** 這篇是社論，依慣例排除，不進週候選，只留在月報批次。
5. **研究群代碼：** S02、S06、S14、S12 經常合著。是否在學者清單第 0 節登記共用研究群代碼，另行決定，本 PR 不寫入。

## 月報專用（63 筆，不匯入、不入庫）

依規格 v1.1，這些只留在 [batch-2026-10-10-scholar-M-2-monthly-only.json](batch-2026-10-10-scholar-M-2-monthly-only.json) 與 results.json，供月報第 2、3 項選用。

- **依類別：** C 33、B 14、A 12、不明 4。
- **依對象：** 不明 26、大學 17、k12 14、師培 5、成人 1。
- **可能符合月報第 2 項的有 6 篇：** 條件是正式版、A／B 類、對象不是 unknown，而且出版者頁的日期落在 08-29～09-29。
  - `26gma225`、`26gma226`、`26gma243`：GMS 研討會摘要，09-04。
  - `s44217-026-02129-x`：09-15。
  - `feduc.2026.1926201`：09-07。
  - `s44436-026-00044-4`：社論，09-14。

  這 6 篇仍須先入庫，並核到 `bibliographic_checked`。
- **下個月再看：** LNCS `978-3-032-37979-5_9` 的 First Online 是 10-07，落在下一個觀察期。
- **高風險（不得寫成成效或因果）：** `26gma225`、`1475939x`、`14790718`、`chbah.100402`、`37979-5_9`、`10447318`、`ejmste/19279`、`feduc.1943906`、`s44217-02129-x`、`chbr.101340`、`jcal.70327`。

## 限制

- **出版社頁讀不到：** Elsevier、T&F、Wiley、Sage、MDPI、Emerald、Routledge 的頁面讀不到（403 或被轉址），沒有繞過，首次公開日記 unknown。
- **Frontiers 的日期：** 頁面上的 `citation_online_date` 等於接受日。
- **Semantic Scholar：** 多數 DOI 查詢回 404，依題名的搜尋則被限流（429）。
- **只依題名判斷：** 8 篇。
- **收錄落差：** OpenAlex 的收錄可能落後。
