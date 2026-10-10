# 10 月月報 claim 兩輪交叉核對紀錄（2026-10-10）

> **性質：AI 輔助核對紀錄，不是認證。** 兩輪由兩個彼此隔離的子代理執行（同一模型），各自回原始來源核對，看不到彼此結果；不等於真人獨立審閱。未修改任何候選或刊物。

## M2026-10-S04（Vartiainen、Kahila、Pope、Tedre，2026，*Informatics in Education*）

- **第 1 輪（逐句對照）**：出版者頁 `citation_publication_date` 2026/09/30、頁面「Pub. online: 30 September 2026」；作者單位 University of Eastern Finland（出版者頁、ORCID）；40 名 6、9 年級學生小組訪談、三年期共同設計累積式課程、分類器／社群媒體機制／同溫層、個人與社會層面倫理推理，皆與摘要相符。判 **concordant**，翻譯審閱通過。
- **第 2 輪（找反例）**：Crossref、OpenAlex 日期皆 2026-09-30，無預印本；全文提到 EdMedia 2026 會議論文用同一訪談資料但只分析 3 段，不是本文早期版本；§4.2 為 14 場小組訪談、8 校、每組 2–4 人、2025 春季蒐集；§8 自述「Instead of demonstrating causal effects」。判 **concordant**；建議補作者自述限制（教師以密集取樣挑選、樣本小、芬蘭情境可遷移性有限）。
- **處理**：`claim_text` 不變；`scope_limitation` 補入作者自述限制。

## M2026-10-A09（Wang、Chuang、Wu，2026，*Computers and Education: AI*）

- **來源**：管理者自出版者頁提供的摘要與期刊預校樣（Journal Pre-proof）；出版者網站拒絕自動讀取，未繞過。預校樣首頁：Received 2025-12-29、Revised 2026-07-16、Accepted 2026-08-01；未載 Available online，2026-08-24 依管理者自出版者頁確認，Crossref created 亦為 2026-08-24。
- **初稿**兩輪皆判 **needs-fix**：
  - 第 1 輪：線上刊出應註明為預校樣；問卷另含一題開放式回饋；可補約 30 分鐘。
  - 第 2 輪：37 名教師是在帶領課堂或自行審閱後作答（§3.2），不是全部在課堂試用，原句把 831 人都寫成「課堂試用後」略為誇大。
- **改寫後**兩輪複核皆判 **concordant**，翻譯審閱通過。
- **兩輪都提到、但不影響主張的事**：預校樣首頁 Funding 欄列教育部資科司，文末卻寫「no specific grant」，原文前後不一致；主張只寫教育部「支持編製」手冊（依致謝），不涉研究經費。中文書名《AI學習應用指引手冊》見預校樣附錄 A 中文問卷題目。
