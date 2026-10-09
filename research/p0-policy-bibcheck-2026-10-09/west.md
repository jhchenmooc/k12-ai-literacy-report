# 政策紀錄書目核對：美英澳組

- 起訖 UTC：2026-10-09T18:26:27Z – 2026-10-09T18:29:15Z
- 結果：match 10／mismatch 4／unverifiable 0（共 14）

## 結果表

| record_id | verdict | title | issued_by | applies_to_country | first_published_on | record_type | primary_url | 日期字樣 |
|---|---|---|---|---|---|---|---|---|
| KB-2026-0096 | mismatch | ok | ok | ok | mismatch | ok | ok | publication_date: 2025-04-28; signing_date: 2025-04-23 |
| KB-2025-0045 | match | ok | ok | ok | ok | ok | ok | publication_date: 2025-07-21; dates: comments on or before August 20, 2025 |
| KB-2026-0097 | match | ok | ok | ok | ok | ok | ok | publication_date: 2026-04-13; effective_on: 2026-05-13 |
| KB-2026-0098 | match | ok | ok | ok | ok | ok | ok | Last Reviewed: Friday, October 02, 2026（非首發日） |
| KB-2026-0099 | mismatch | ok | ok | ok | mismatch | ok | ok | Publication Date 1/16/24；Update Log: 1/16/2024 01 Original publication |
| KB-2024-0006 | mismatch | ok | ok | ok | mismatch | ok | ok | 原頁無日期；PDF：Version 3.0, Date of publication: July 1, 2024 |
| KB-2026-0100 | match | ok | ok | ok | ok | ok | ok | 無日期；「...(v2.0) into the current v3.0 web-based interactive guide」 |
| KB-2025-0046 | mismatch | ok | ok | ok | mismatch | ok | ok | Last Modified: 1/29/2026 10:22:29 AM（非首發日） |
| KB-2025-0047 | match | ok | ok | ok | ok | ok | ok | Date Published: Jan 21, 2025 |
| KB-2023-0009 | match | ok | ok | ok | ok | ok | ok | first_published_at: 2023-06-14T09:44:19+01:00 |
| KB-2024-0007 | match | ok | ok | ok | ok | ok | ok | first_published_at: 2024-02-07T16:35:44+00:00 |
| KB-2025-0048 | match | ok | ok | ok | ok | ok | ok | first_published_at: 2025-01-22T00:00:00+00:00 |
| KB-2025-0049 | match | ok | ok | ok | ok | ok | ok | first_published_at: 2025-06-10T10:18:00+01:00 |
| KB-2026-0101 | match | ok | ok | ok | ok | ok | ok | Last updated: 01-Apr-2026（非首發日） |

## mismatch 明細

- **KB-2026-0096** `first_published_on`：紀錄「（空）」；原頁／API「2025-04-28」；字樣：publication_date "2025-04-28"（signing_date "2025-04-23" 另欄）
- **KB-2026-0099** `first_published_on`：紀錄「（空）」；原頁／API「2024-01-16」；字樣："Publication Date 1/16/24"；版本表 "1/16/2024 | 01 | Original publication"
- **KB-2024-0006** `first_published_on`：紀錄「2024-01-18」；原頁／API「原頁未明寫（現行 PDF v3.0 為 2024-07-01 版本日）」；字樣：PDF 封面 "Version 3.0 / Date of publication: July 1, 2024"；原頁無日期字樣
- **KB-2025-0046** `first_published_on`：紀錄「2025-12-30」；原頁／API「原頁未明寫首發日」；字樣："Last Modified: 1/29/2026 10:22:29 AM"；HB 96 "Not later than December 31, 2025"（法定期限）

## unverifiable 原因

- 無。（federalregister.gov 全文頁遇存取檢查，但官方 API 可讀，故以 API 核對）

## 限制

- federalregister.gov 全文頁 curl 轉向 unblock.federalregister.gov 存取檢查，未繞過；3 筆 Federal Register 紀錄改以官方 API 核對
- NC 文件託管於 docs.google.com（JS 頁），以 Google Docs 公開純文字匯出讀取
- WA 與 OH 原頁無首發日字樣：判 mismatch 指『紀錄日期無原頁依據』，不代表已證明紀錄日期錯誤；未查新聞稿等其他來源
- record_type 合理性為判讀，非 API 欄位一對一對應
- 未做任何資料修改；未使用 WebSearch／WebFetch

## 請求紀錄

| UTC | URL | HTTP | 轉址 |
|---|---|---|---|
| 2026-10-09T18:26:40Z | https://www.federalregister.gov/api/v1/documents/2025-07368.json | 200 |  |
| 2026-10-09T18:26:40Z | https://www.federalregister.gov/api/v1/documents/2025-13650.json | 200 |  |
| 2026-10-09T18:26:41Z | https://www.federalregister.gov/api/v1/documents/2026-07087.json | 200 |  |
| 2026-10-09T18:26:41Z | https://www.gov.uk/api/content/government/calls-for-evidence/generative-artificial-intelligence-in-education-call-for-evidence | 200 |  |
| 2026-10-09T18:26:41Z | https://www.gov.uk/api/content/guidance/data-protection-in-schools/generative-artificial-intelligence-ai-and-data-protection-in-schools | 200 |  |
| 2026-10-09T18:26:42Z | https://www.gov.uk/api/content/government/publications/generative-ai-product-safety-standards | 200 |  |
| 2026-10-09T18:26:43Z | https://www.gov.uk/api/content/government/collections/using-ai-in-education-settings-support-materials | 200 |  |
| 2026-10-09T18:26:43Z | https://www.cde.ca.gov/ci/pl/aiincalifornia.asp | 200 |  |
| 2026-10-09T18:26:44Z | https://go.ncdpi.gov/AI_Guidelines | 200 | https://docs.google.com/document/d/1U-AwwwBg7glJ4ZDlcKVzARuFRPWwUWzqRN2rOgT9zlA/ |
| 2026-10-09T18:26:46Z | https://ospi.k12.wa.us/student-success/resources-subject-area/human-centered-artificial-intelligence-schools | 200 |  |
| 2026-10-09T18:26:47Z | https://www.oregon.gov/ode/educator-resources/teachingcontent/Pages/Generative-Artificial-Intelligence-%28AI%29-for-K-12-Schools.aspx | 200 |  |
| 2026-10-09T18:26:48Z | https://education.ohio.gov/Topics/AI-in-Ohio-s-Education/Model-Policy | 200 |  |
| 2026-10-09T18:26:49Z | https://login.community.gadoe.org/documents/leveraging-ai-in-the-k-12-setting | 200 |  |
| 2026-10-09T18:26:49Z | https://education.nsw.gov.au/teaching-and-learning/education-for-a-changing-world/guidelines-regarding-use-of-generative-ai | 200 |  |
| 2026-10-09T18:26:51Z | https://www.federalregister.gov/documents/2025/04/28/2025-07368/advancing-artificial-intelligence-education-for-american-youth | 200 | https://unblock.federalregister.gov/ |
| 2026-10-09T18:27:20Z | https://docs.google.com/document/d/1U-AwwwBg7glJ4ZDlcKVzARuFRPWwUWzqRN2rOgT9zlA/export?format=txt | 200 | https://doc-14-4o-docstext.googleusercontent.com/export/s8v029du74rmth76t5k6ldhb |
| 2026-10-09T18:27:46Z | https://ospi.k12.wa.us/sites/default/files/2024-08/comprehensive-ai-guidance.pdf | 200 |  |
| 2026-10-09T18:28:12Z | https://education.ohio.gov/getattachment/Topics/AI-in-Ohio-s-Education/Model-Policy/AI-In-Education-Model-Policy.pdf.aspx?lang=en-US | 200 |  |
