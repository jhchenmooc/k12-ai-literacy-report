# 各國 K-12 AI 政策與指引：第 1 批入庫（2026-10-13）

管理者 2026-10-13 決定（「依照建議」）：文獻 session 依發布單位搜尋各國官方 K-12 AI 政策與指引，A 類第 1 批寫入公開知識庫。來源清單與全部官方 PDF 存私人 repo `from-literature-session/policy-agencies/`（`intake-batch1-A.csv`、`intake-batch1-sources.csv`；各組搜尋與讀取紀錄見該目錄 README）。本報告不放摘要或全文。

## 篩選條件（文獻 session）

A 類、官方網域、信心 medium 以上、完全 K-12、無待判斷問題、不在知識庫。另有 71 份待核（`batch2-A-to-review.csv`）與 B 類 45 份（`deferred-B.csv`）暫不入庫。

## 編輯 session 入庫核對

- 166 份中寫入 **163 筆**，逐筆清單（含中文題名、日期依據、文獻 session 的一句中文說明）見 [`policy-agencies-batch1-2026-10-13.csv`](policy-agencies-batch1-2026-10-13.csv)。
- **移回待核 2 份**（臺灣）：《高級中等學校學生學習評量及學習歷程檔案使用「生成式人工智慧」注意事項》、《國民中小學學生學習評量及作業使用生成式人工智慧注意事項》。官方頁網址空白，只有學校網站上的檔案，不符「官方網域」條件。
- **再移回待核 1 份**（臺灣，文獻 session 2026-10-13 提醒）：《中小學使用「生成式人工智慧」注意事項（學生版）》。官方頁欄只有 `https://pads.moe.edu.tw/download.php`（無參數，無法對應到這份文件），檔案在師大附中網站，曾暫編 KB-2024-0339，已移除。
- **網址**：
  - 預設用官方頁（`official_url`）。
  - 多份文件共用同一官方頁時，改用各自的官方檔案網址（`file_url`），以免多筆紀錄指向同一頁；沒有檔案網址者仍用官方頁。
  - 白宮 Presidential AI Challenge 指南：ai.gov 頁 2026-10-13 已轉址到 si.gov 首頁（標題「America's Super Intelligence Initiatives」），改用 whitehouse.gov 上的指南 PDF（HTTP 200）。白宮 Pledge 頁 2026-10-13 讀取時正常顯示「AI」。
- **日期**：照文獻 session 的官方日期依據填入，不推測；日期不明者 `first_published_on` 空白、`year_basis=unknown`（ID 依入庫年編為 KB-2026-）。
- **核對程度**：全部 `discovered_unverified`。編輯 session 核對了格式、網址、與既有紀錄的網址與題名重複（無重複），未逐筆讀原文。
- **類型對應**：guideline、handbook、policy_plan → `official_guidance`；announcement → `government_announcement`；curriculum、framework → `framework`；report → `policy_review`。
- **關聯**（全部 `discovered_unverified`，屬 AI 判讀）：
  - 分類：指引與手冊 K4、K5；其他 K1。
  - `issued_by`：文獻 session 提議的機構代碼，新代碼依既有 `O-國別-機構` 格式。
  - `applies_to_country`：英國依機構分 GB-ENG、GB-SCT、GB-WLS、GB-NIR；UNESCO 不加國別。
  - `has_population`：依讀者欄（teachers → 在職教師；students → 學生；admin、parents、schools → 家長行政），一律加 `STAGE_K12_GENERAL`。
  - `has_ailit_class` AILIT_A，`has_ailit_dim` 照面向欄。
- 關聯編號 KR-11597～13227。
