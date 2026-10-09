# 論文書目核對（2026-10-09）

> **性質：人工核對輔助，不是獨立審閱。** 四組核對子代理與當初搜尋者為同一模型，彼此同意**不算獨立審閱**。候選池（有 `source_candidate_id` 者）排除；`publication/issues.json`、`research/drafts/`、出版閘門未動；沒有任何紀錄升 `content_checked`。

## 範圍與方法

- 範圍：`journal_article`／`conference_paper`、`discovered_unverified`、非候選池紀錄 124 筆（基準 main `718aca7`；入庫分支基於 `156ecc9`）。管理者 2026-10-09 確認全部 124 筆都做。
- 每筆以 curl 讀出版者官方頁（DOI 落地頁、OJS、Frontiers、IRRODL、Nature）或 AERA 2026 官方線上議程頁，核對題名、作者（與 Crossref 比對人數與順序；**不寫入姓名**）、期刊／會議（對應 `published_in`）、卷期年、DOI／primary_url；首發日只採出版者頁明寫的 Published 日，不以 Crossref created／indexed／published-online 代替。
- 讀不到的頁面一律 `unverifiable`，未繞過驗證頁、未停用 TLS、未用瀏覽器代理；Crossref 單獨相符只記為參考。
- UTC：開放取用 18:38:15–18:45:48、AERA 18:38:28–18:41:52、ACM 18:38:15–18:39:33、其他出版者 18:38:15–18:40:47。整合者 curl 抽查 AAAI `41511`（Published 2026-03-14）、Frontiers `1831415`（Published 05 June 2026），與子代理一致。
- 證據：[oa](oa.md)、[aera](aera.md)、[acm](acm.md)、[pub](pub.md) 及同名 JSON；實際修改清單 [applied.json](applied.json)。

## 結果：match 53、mismatch 0、unverifiable 71

| 組 | 筆數 | match | mismatch | unverifiable | 讀不到的原因 |
|---|---|---|---|---|---|
| 開放取用 | 35 | 28 | 0 | 7 | Springer／BMC JS「Client Challenge」（J31 4、J32 3） |
| AERA | 28 | 25 | 0 | 3 | AERA 2025 議程頁驗證頁 |
| ACM | 35 | 0 | 0 | 35 | ACM DL Cloudflare 403 |
| 其他出版者 | 26 | 0 | 0 | 26 | Elsevier 403／轉址表單、Springer JS 驗證、SAGE／T&F Cloudflare 403、IEEE 202 空內容 |

**管理者決定（2026-10-09）**：照整合者建議三項。
1. match 53 筆升 `bibliographic_checked`，其 `published_in` 關聯同步升級；分類與國別不在核對範圍，維持 `discovered_unverified`。
2. 開放取用 match 28 筆補 `first_published_on`（出版者頁 Published 日、日精度），`year_basis` 由 `issue_year` 改 `first_publication`（年份不變）：2025-04-11（8 筆）、2025-05-21（1 筆）、2026-03-14（12 筆）、2026-04-27（1 筆）、2026-04-28（1 筆）、2026-04-29（1 筆）、2026-05-06（1 筆）、2026-06-05（1 筆）、2026-06-29（1 筆）、2026-07-31（1 筆）。HSSC KB-2026-0065 另標 Version of record 2026-07-02，採 Published 2026-04-27。這些是出版者上線日，不保證為全球最早公開。
3. unverifiable 71 筆維持 `discovered_unverified`，留給可讀出版者頁的環境或真人。

## G2–G4 摘記（28 筆，只在 [oa.md](oa.md)）

只對開放取用、可合法讀全文者（Frontiers、IRRODL CC BY；HSSC CC BY-NC-ND；AAAI 出版者公開 PDF）寫短轉述：學段與分母、測量結果、設計、限制。**不是成效主張，不升 `content_checked`。** 以關鍵詞擷取段落閱讀，非逐字精讀；5 筆無 K–12 受試（KB-2025-0032、KB-2026-0041、0047、0060、0061），2 筆樣本數需人工補（KB-2026-0045、0048）。

## 數字與測試

- bibliographic_checked 論文 0→53；records 202、relations 527、search runs 103（筆數不變）。索引與網站以既有工具重建，網站只動產生區塊。測試未修改；本機 `node --test research/*.test.js` 201／201 通過，CI verify 內容本機均通過。

## 限制與待處理

1. 71 筆 unverifiable 需可讀出版者頁的環境或真人；其中 18 筆（Elsevier 16、Springer 2）Crossref 標示 CC 授權，可合法讀，但出版者頁被擋。
2. Crossref 參考觀察（未改資料）：AIED 2026 KB-2026-0032、0033 published-print 為 2027（紀錄卷期年 2026）；KB-2026-0030（SAGE）、KB-2026-0054（T&F）尚無卷期，`issue_year` 依據可能不成立；KB-2025-0039 CSCW 期次待 ACM DL 確認；WiPSCE 5 筆 published-print 早於 published-online。
3. **操作疏失**：其他出版者組對 Crossref 的 26 次請求在 User-Agent 中帶了管理者 email（mailto），違反「不得在請求中放 email」規則；請求已送出無法撤回。輸出檔與 repo 均不含該 email，暫存腳本中的地址已刪除；之後所有子代理提示明寫不得在任何請求中加入 email 或 mailto。
