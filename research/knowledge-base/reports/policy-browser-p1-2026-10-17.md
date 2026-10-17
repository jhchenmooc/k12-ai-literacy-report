# 政策第 2 批待核：管理者瀏覽器取得的 5 筆入庫（2026-10-17）

管理者 2026-10-16 起在自己的電腦上開「瀏覽器文獻確認」session，用本人的 Chrome 開啟自動讀取會被擋下的官方網頁。第一批是政策第 2 批待核 P1 的 16 筆（管理者 2026-10-17 准許），取得 5 筆、6 個檔案，存在私人 repo 的 `from-editor-session/daily-pdfs/browser/2026-10-17-P1/`。逐筆狀態、頁面日期原文與 SHA-256 見同資料夾的 `notes.csv`。管理者 2026-10-17 決定「核對入庫」。

編輯 session 讀過 6 個檔的內文與中繼資料後，寫入 5 筆紀錄。格式比照政策第 2 批（PR #285、#288）：`official_guidance`，`discovered_unverified`，K4、K5，`issued_by`、`applies_to_country`，對象與學段，A 類與面向代碼。

| 紀錄 | 待核編號 | 文件 | 首發日 | 日期依據 |
|---|---|---|---|---|
| KB-2025-0474 | B2-002 | 澳洲北領地教育廳〈Generative artificial intelligence - guidelines〉 | 2025-10-23（日） | 文件版本頁「Date approved 23 October 2025」，依核定日為準（比照 #167）；頁尾 28 October 2025 |
| KB-2024-0370 | B2-003 | 昆州課程評量局（QCAA）〈Developing artificial intelligence capabilities〉學校版與學生家長版 | 2024-02（月） | 兩份 PDF 皆印「February 2024」；官方頁「Last updated 27 August 2026」為更新日 |
| KB-2025-0475 | B2-005 | eSafety Commissioner〈AI companions information sheet for educators〉 | 2025-07（月） | 官方檔案路徑 /2025-07/、PDF 建立 2025-07-25；列出頁「Last updated 12/12/2025」為更新日 |
| KB-2026-0384 | B2-062 | 馬里蘭州教育廳〈Guidance for the Responsible Use of Artificial Intelligence: Executive Summary〉 | 不明 | PDF 與列出頁都未見日期；PDF 中繼資料 2026-06-23 不作依據 |
| KB-2026-0385 | B2-067 | 密西西比州教育廳〈Artificial Intelligence: Guidance for K-12 Classrooms〉 | 不明 | 封面與內文未見發布日期；PDF 中繼資料 2024-04-04 與搜尋線索不作依據 |

關聯 KR-13914～13966；逐筆欄位見 [policy-browser-p1-2026-10-17.csv](policy-browser-p1-2026-10-17.csv)。

**沒有入庫的 11 筆**：管理者 2026-10-17 要求重試，待瀏覽器 session 回報。原因如下：
- Chrome 存不了檔：NT 的 PDF 版、密西根 3 筆。
- 已找到檔案但未下載：明尼蘇達、教育部 pads 學生版 2.1。
- 網站問題：山東憑證錯誤未繞過；JCQ 官方 PDF 連結 404。
- 本來就沒有 PDF：NCCA、佛州新聞稿。
- 未找到官方來源：臺灣兩份注意事項。

**限制**：
- #8 馬里蘭、#13 密西西比是瀏覽器 session 直接下載，沒經過 Chrome。
- 本批沒有截圖，頁面日期以瀏覽器 session 記錄的原文為準。
- 日期取自 PDF 中繼資料的，一律不作首發依據。
