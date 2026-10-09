# B-POL 政策紀錄書目核對（2026-10-09）

> **性質：人工核對輔助，不是獨立審閱。** 三組核對子代理與當初搜尋者為同一模型（未讀舊搜尋紀錄、只對照官方原頁），彼此同意**不算獨立審閱**。候選池 6 筆（KB-2026-0001～0004、0006、0007）依管理者決定排除；`publication/issues.json`、`research/drafts/` 未動。

## 範圍與方法

- 範圍：非論文類、`discovered_unverified`、非候選池紀錄 39 筆（即 #108 B-POL 入庫的 39 筆）。基準 main `718aca7`。
- 每筆以 curl 讀 `primary_url` 或其官方 API（GOV.UK Content API、Federal Register API、EU 出版局頁），核對六欄：標題、發布機關、適用國別、首發日（含精度）、文件類型、網址是否官方原頁。未繞過驗證頁（federalregister.gov access check、UNESDOC Cloudflare）、未停用 TLS；未用 WebSearch／WebFetch 作核對依據。
- UTC：亞洲 18:26:27–18:32:28、美英澳 18:26:27–18:29:15、國際 18:26:28–18:32:10；整合者 18:33:03 重讀 KB-2026-0088（子代理 4 次 connection reset）成功，標題與「发布日期：2026-04-10」相符，改判 match。
- 證據：[asia](asia.md)、[west](west.md)、[intl](intl.md) 及同名 JSON（每次請求 URL、UTC、HTTP、原頁日期字樣）；實際修改清單 [applied.json](applied.json)。

## 結果：match 29、mismatch 10、unverifiable 0

| 組 | match | mismatch |
|---|---|---|
| 亞洲 19 | 14 | 5 |
| 美英澳 14 | 10 | 4 |
| 國際 6 | 5 | 1 |

**管理者決定（2026-10-09）**：照整合者建議三項。
1. match 29 筆升 `bibliographic_checked`；其 `issued_by`、`applies_to_country` 關聯同步升級（分類與版本關係不在核對範圍，維持 `discovered_unverified`）。
2. mismatch 10 筆維持 `discovered_unverified`，其中 7 筆依原頁修正，下一輪對過原頁再升級：

| 紀錄 | 差異 | 處理 |
|---|---|---|
| KB-2026-0096 行政命令 14277 | 紀錄無首發日；Federal Register API publication_date 2025-04-28（signing_date 2025-04-23） | 補 2025-04-28 |
| KB-2026-0099 北卡 NCDPI | 紀錄無首發日；文件封面「Publication Date 1/16/24」、版本表 Original publication | 補 2024-01-16 |
| KB-2024-0006 華盛頓 OSPI | 2024-01-18 出自新聞稿，不在 primary_url；現行 PDF 為 v3.0（2024-07-01） | 首發日改 unknown |
| KB-2025-0046 俄亥俄 DEW | 2025-12-30 出自新聞稿；primary_url 只有 Last Modified | 首發日改 unknown |
| KB-2026-0102 歐盟指引 2026 版 | 官方頁無 03-05；出版局 Released 2026-06-12；無「(2026 edition)」字樣 | 首發日改 unknown；標題去掉「(2026 edition)」 |
| KB-2024-0005 中國 2024-12 | 原頁標題為新聞題名；通知本身無發布日 | 標題改為「教育部部署加强中小学人工智能教育」 |
| KB-2026-0094 新加坡 COS 2026 | 原頁標題無「Four Learns」等補充 | 標題改為原頁標題 |
| KB-2025-0044 韓國評量 AI 方案 | 管理者先前定月精度；原頁登錄日 12-23、禁刊 12-24 | 不改，維持未核 |
| KB-2026-0090、0091 香港藍圖附件 | 通告日 2026-06-17 不在附件 PDF（封面只寫 2026；純圖像 PDF 未 OCR） | 不改，維持未核 |

3. UNICEF 2.0（KB-2021-0001）：PDF 封面「NOVEMBER 2021」→ 首發日細化為 2021-11（月）；`primary_url` 改為該版本自己的 PDF（原與 3.0 共用 Innocenti 頁）。

## 數字與測試

- bibliographic_checked 政策紀錄 7→36；records 202、relations 527、search runs 103（筆數不變）。索引與網站以既有工具重建（`--write-index`、`render-knowledge-base-years.js --write`、`render-site.js --write`），網站只動產生區塊。
- 測試未修改；本機 `node --test research/*.test.js` 201／201 通過，CI verify 內容本機均通過。

## 限制

- 日本兩筆 primary_url 為 MEXT 彙整頁（文件 PDF 另讀確認）；香港 0006、0092 以通告為 primary_url 記 framework；新加坡 0093 題名為頁內摺疊段標題——皆判 match，如需依載體分類另行決定。
- op.europa.eu 對瀏覽器 UA 回 Azure WAF 403，以 curl 預設 UA 讀取成功（非驗證頁繞過）。
- 首發日只證明該官方頁的發布資訊，不等於全球最早公開。
