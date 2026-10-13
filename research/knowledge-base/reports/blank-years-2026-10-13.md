# 年份空白紀錄逐筆核對（2026-10-13）

管理者 2026-10-13 同意修訂工作階段交辦（第三件）：知識庫 26 筆 `year_value` 空白（網站顯示「未知」），逐筆核對能否補上。另交辦的 KB-2027-0001 已於 PR #269 依出版者 PDF 改為 2026（首發 2026-08-28），本次不再處理。

## 補上 5 筆

| 紀錄 | 文件 | 依據 | 填入 |
|---|---|---|---|
| KB-2021-0002 | OECD Digital Education Outlook 2021 | Crossref `published-online`（DOI 10.1787/589b283f-en） | 2021-06-08 |
| KB-2026-0255 | OECD Digital Education Outlook 2026 | Crossref `published-online`（DOI 10.1787/062a7394-en） | 2026-01-19 |
| KB-2025-0134 | What should teachers teach and students learn in a future of powerful AI?（OECD） | Crossref `published-online`（DOI 10.1787/ca56c7d6-en） | 2025-05-23 |
| KB-2023-0011 | AI and the Future of Teaching and Learning（美國教育部 OET） | ERIC API `publicationdateyear`（ED631097） | 2023（精度到年） |
| KB-2024-0009 | Empowering Education Leaders: A Toolkit（美國教育部 OET） | ERIC API `publicationdateyear`（ED661924） | 2024（精度到年） |

- 一律 `year_basis=first_publication`，核對程度維持 `discovered_unverified`（Crossref 與 ERIC 是登記資料，未讀原頁；OECD 網頁對自動請求回 403）。年份都與紀錄編號的入庫年份一致。

## 維持空白 21 筆

- **本週候選 13 筆**（KB-2026-0001～0009、0051、0247～0249，候選 W2026-10-09-A01～A13，都是 `hold`）：知識庫測試規定 hold 候選的紀錄須維持 `year_basis=unknown`、首發日空白，候選改為 publish 前不得填年份。
- **官方指引 7 筆**（2026-10-09 書目核對刻意改為 unknown，見 `research/p0-policy-bibcheck-2026-10-09/`）：primary_url 只有更新或檢閱日，不是首發日。
  - KB-2026-0093 新加坡 MOE（Last Updated 2026-07-31）、KB-2026-0098 加州 CDE（Last Reviewed 2026-10-02）、KB-2026-0100 奧勒岡 ODE（頁面無日期，現行為 v3.0）、KB-2026-0101 新南威爾斯（Last updated 2026-04-01）：沒有首發日來源。
  - 另有三筆在原頁以外有官方日期，**待管理者決定是否採用**：KB-2024-0006 華盛頓 OSPI（新聞稿 2024-01-18；現行 PDF v3.0 為 2024-07-01 版本日）、KB-2025-0046 俄亥俄 DEW（新聞稿 2025-12-30）、KB-2026-0102 歐盟指引（歐盟出版局 Released 2026-06-12）。
- **KB-2026-0261** PISA 2029 MAIL 框架初稿：文件沒有到日的發布日，OECD 頁面對自動請求回 403，維持空白。
