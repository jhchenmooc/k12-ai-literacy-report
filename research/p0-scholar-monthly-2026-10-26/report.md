# 學者追蹤月檢索：全級別（2026-10-26）

> **性質：** 這是人工搜尋輔助的篩選紀錄，不是認證。判讀與整合是同一模型，**不算獨立審閱**。
>
> **依據：** [學者追蹤運用規格](../scholar-watch-usage-spec.md) v1.1，查法依[學者清單](../scholar-watchlist.md)第 5 節。
>
> **請求：** 所有請求都沒有帶 email 或 mailto，也沒有繞過出版社頁。

## 範圍

- **用途：** 10 月號月報（11/01 出刊前檢查、11/03 出刊）第 2 項「本刊追蹤學者本月新作」與第 3 項「學者觀點動向」。
- **學者：** 93 人：A1 4、A2 8、A3 4、A4 7、B 11（含 10/24 新增的 S26）、H 33、V 26。
- **查詢期間：** OpenAlex `publication_date` 2026-09-30～10-26。`publication_date` 不等於首發日。10/27～10/31 由 10/31 補跑涵蓋。
- **查詢：** 99 筆（依清單須加教育主題詞者另跑一次不加篩選的查詢核對），全部 HTTP 200，沒有失敗。寫入 `search_runs.csv`，編號 `SCHOLAR-20261026-<學者 ID>`。

## 結果

共 65 篇（去重後）：

| 狀態 | 篇數 |
|---|---|
| 已在知識庫 | 4 |
| 先前週檢索或 10/10 月檢索已判讀 | 16 |
| 非教育或未涉 AI，直接排除 | 22 |
| 本次判讀：可進週報候選池 | 5 |
| 本次判讀：月報專用 | 8 |
| 本次判讀：排除（社論 1、C 類 9） | 10 |

- 逐篇明細見 [results.json](results.json)。
- 直接排除的包括 H06 永續發展遊戲化手冊 5 個語言版、資料集副本、會議論文集整冊、書評，以及兩篇疑為同名者的非教育論文（H08 環境科學、H25 醫學）。
- `10.1080/10494820.2026.2744403` 在 10/10 判為 unknown（當時無摘要），本次 OpenAlex 已有摘要，改判 A。

## 可進週報的候選（5 筆，交編輯 session 匯入）

批次檔：[batch-2026-10-26-scholar-M-1.json](batch-2026-10-26-scholar-M-1.json)。用 `ingest-candidates.js` 的 `merge()` 對 `research/drafts/2026-10-23_2026-10-29.json` 的副本模擬匯入，可新增 5 筆，沒有重複。

| DOI | 學者 | 類別 | 對象 | 首次公開 |
|---|---|---|---|---|
| `10.1080/10494820.2026.2744403`（中小學教師 AI 融入的自我決定論縱貫研究） | H11 | A | k12 | 2026-10-08（Crossref published-online；T&F 頁 403） |
| `10.1016/j.compedu.2026.105769`（七年級生與生成式 AI 的共享認識能動性） | T14 | B | k12 | unknown（Elsevier 頁 403；Crossref 無 published-online） |
| `10.1016/j.appdev.2026.102014`（AI 對話練習與一年級生提問） | V18 | B | k12 | unknown（同上；只依題名） |
| `10.18261/njdl.21.2.4`（瑞典國中的世界中心 AI 素養，立場論文） | H12、H13、H27 | A | k12 | 2026-10-23（Crossref published-print；出版者頁 403） |
| `10.5753/wie.2026.28044`（巴西公立高中 AI 作文評分工具經驗報告） | S02 | B | k12 | 2026-10-05（Crossref published-online；SBC 頁連線被重置） |

依規格 v1.1，匯入候選池時要同時在 `records.csv` 為每筆建對應紀錄（`discovered_unverified`、首發日空白、`year_basis=unknown`、`source_candidate_id`）。**本 PR 不寫知識庫紀錄**，由編輯 session 匯入候選池時一併建立。

## 月報專用（18 筆，不匯入、不入庫）

批次檔：[batch-2026-10-26-scholar-M-2-monthly-only.json](batch-2026-10-26-scholar-M-2-monthly-only.json)，含月報專用 8 筆與排除 10 筆。

| DOI | 學者 | 類別 | 對象 | 首次公開 |
|---|---|---|---|---|
| `10.1080/10494820.2026.2735920`（高教 AI 素養螺旋模型，回顧） | H11 | A | higher_ed | 2026-10-12（Crossref） |
| `10.1007/s44163-026-02298-6`（奈及利亞大學生 AI 倫理參與） | V04 | A | higher_ed | 2026-10-12（Springer 頁） |
| `10.1186/s41239-026-00627-4`（生成式 AI 時代高教評量，回顧） | V13、V14 | B | higher_ed | 2026-10-16（Springer 頁） |
| `10.1111/bjet.70096`（生成式 AI 擔任 CSCL 小組調節者） | H31 | B | higher_ed | 2026-10-20（Crossref） |
| `10.1080/03075079.2026.2747551`（高教學習者能動性與人機協作） | H02 | A（待全文） | higher_ed | 2026-10-21（Crossref） |
| `10.1016/j.compedu.2026.105767`（生成式 AI 支援寫作內在回饋） | S02、S07 | B | unknown | unknown |
| `10.1016/j.stueduc.2026.101698`（AI 輔助同儕評量與二語字彙） | H11 | B | unknown | unknown |
| `10.31234/osf.io/47ks6_v2`（生成式 AI 教育統合分析的方法學稽核） | V19 | B | unknown | 2026-10-11（OSF，預印本） |

- **月報第 2 項：** 須已入庫且至少 `bibliographic_checked`、出版者頁日期落在 09-30～10-31、A／B、對象不是 unknown。本次新作中出版者頁有日期的只有 Springer 兩篇（`s44163-…02298-6`、`s41239-…00627-4`），入庫核到 `bibliographic_checked` 後可用。T&F、Wiley、Elsevier 頁讀不到，月報第 2 項不接受 Crossref 日期，需管理者以瀏覽器協助。
- **已在知識庫、可供第 2 項：** KB-2026-0128（09-30）、KB-2026-0269（10-10）、KB-2026-0379（10-15），都是 `bibliographic_checked`。0128 與 0379 同屬 G-GENAI-FI。
- **KB-2026-0129 不可用：** DOI 前綴 `10.33422` 屬「不收出處」Diamond Scientific Publishing（2026-10-10 列入），該紀錄在列入前已入庫。
- **預印本** `47ks6` 只能作第 3 項的線索，須標明「預印本，未經同儕審查」。
- **排除：** `10.1186/s40594-026-00653-8`（H11、H27）是社論，依慣例不收；C 類 9 篇（AI 是受評系統或研究方法，或未涉 AI）。

## 研究群

- H11 屬 G-CHIU。
- H12、H13、H27 合著 `njdl.21.2.4`；H11 與 H27 本月合著 IJSTEM 社論。依清單第 0 節，2022 年後有任何合著即算同一個聲音，所以判斷趨勢時 `njdl.21.2.4` 與 H11 的論文不能算兩個獨立研究群。
- S02、S07 屬 G-GASEVIC。

## 限制

- **出版社頁讀不到：** T&F、Wiley、Elsevier、MDPI、SCUP（NJDL）回 403，SBC 連線被重置；沒有繞過。
- **只依題名判斷：** `appdev.102014`、`stueduc.101698`、`compedu.105767`、`compedu.105773`。
- **Semantic Scholar：** 多數查詢被限流（429）。
- **收錄落差：** OpenAlex 的收錄可能落後，10/31 補跑會再查一次。

## 更正（2026-10-27）

管理者 2026-10-26 以瀏覽器提供出版者頁與 PDF（存私人 repo，不放公開 repo）。results.json 與月報專用批次檔已更新；週候選批次檔維持匯入時原樣，候選 A11～A15 的更新由編輯 session 處理。

| DOI | 原記 | 更正 |
|---|---|---|
| `wie.2026.28044` | 10-05（Crossref） | 10-05（出版者頁 Publicado） |
| `compedu.2026.105769` | unknown | 10-15（Elsevier PDF Available online） |
| `10494820.2026.2744403` | 10-08（Crossref） | 10-08（T&F PDF Published online） |
| `appdev.2026.102014` | unknown | 10-15（Elsevier PDF）；190 名一年級生 |
| `10494820.2026.2735920` | 10-12（Crossref） | 10-12（T&F PDF） |
| `compedu.2026.105767` | unknown，對象 unknown | 10-17（Elsevier PDF）；對象 higher_ed（368 名 STEM 大學生） |
| `stueduc.2026.101698` | unknown，對象 unknown | 10-17（Elsevier PDF）；對象 higher_ed（74 名大學 EFL 學生） |
| `03075079.2026.2747551` | A，higher_ed | 社論（EDITORIAL），排除 |
| `bjet.70096` | 10-20（Crossref） | 10-20（Wiley 頁 First published，管理者 2026-10-27 截圖） |
| `njdl.21.2.4` | 10-23（Crossref print） | 不變；PDF 只有卷期 |

- **月報第 2 項可用（入庫並核到 `bibliographic_checked` 後）：** `2735920`（H11）、`s44163-…02298-6`（V04）、`s41239-…00627-4`（V13、V14）、`compedu.105767`（S02、S07）、`stueduc.101698`（H11）、`bjet.70096`（H31）。
- **每人上限：** H11 本月有 3 篇合格（另含週候選 `2744403`），超過每人 2 則；管理者 2026-10-26 同意建議，留 `2735920` 與 `stueduc.101698`。
