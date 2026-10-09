# v1.6 階段 B／C 補查：三篇論文、期刊會議來源池（2026-10-09）

## 0. 本輪性質及不可宣稱的事

本輪為**定向公開搜尋**、既有候選判定比對與可追溯編輯紀錄，**未完整逐筆掃過 34 種期刊、19 個會議**，沒有自動檢索、持續監控或新刊物。只能對實際造訪及搜尋的入口作明確敘述。正式候選池仍有九筆 hold、`publication/issues.json` 仍無新版期別，不能以 CI 通過代替首次公開與內容真實的核證。

## 1. 上次三篇十月卷期論文：新增反證

| 原始文獻 | 第一手來源及對照線索 | 期別裁決 |
|---|---|---|
| Mapping in-service teacher AI literacy: A systematic review of empirical studies; DOI 10.1016/j.tate.2026.105707 | [Elsevier 摘要](https://www.sciencedirect.com/science/article/pii/S0742051X26003318) 明示回顧 43 篇 2020–2025 年 K–12 在職教師 AI 素養研究；[ResearchGate 作者紀錄](https://www.researchgate.net/publication/408248150_Mapping_in-service_teacher_AI_literacy_A_systematic_review_of_empirical_studies) 標 2026 年**六月**，雖不是出版者精確日，但與「十月才首次出現」相衝突 | 高相關**背景**；不得當作 10/09 新研究。尚需出版者 Online First 原始日確認 |
| Empowering teachers for artificial intelligence integration in gifted education; DOI 10.1016/j.tate.2026.105739 | [Elsevier](https://www.sciencedirect.com/science/article/abs/pii/S0742051X2600363X) 確認資優教育教師專業發展研究；[第三方書目](https://ethnos.app/works/22416181) 標 2026-10-01，而非 10/09。出版者未確認精確 Online First 日期 | K–12 可能適用，但視為**背景／首發日待查**，不可列當期首發 |
| Prompting strategies with generative AI during learning from multiple sources; DOI 10.1016/j.learninstruc.2026.102435 | [Elsevier 摘要](https://www.sciencedirect.com/science/article/pii/S0959475226001209) 明確指出 293 名**美國大學生**；[Penn State 作者機構](https://pure.psu.edu/en/publications/prompting-strategies-with-generative-ai-during-learning-from-mult/) 亦列本科生樣本；[早期書目](https://www.researchgate.net/publication/410616703_Prompting_strategies_with_generative_AI_during_learning_from_multiple_sources) 標七月 | **排除 K–12 當期新訊**；僅可做跨學段方法背景，不能宣稱 K–12 學生成效 |

**判定原則**：卷期 October 2026 不等於 Online First 2026-10-09；第三方六月／十月一日書目是更早公開的強烈線索，不能替代出版社精確日期，但足以阻止沒有反證就認定 10/09 為首發。單篇 K–12 高關聯不代表當期可刊。

## 2. 官方與會議定向搜尋實況

- [UNESCO 2026-10-09 教育新聞列表](https://www.unesco.org/en/education/news) 有多則 10/09 教育項目，但未見可核實為**當日同事件首發**且直接有 K–12 AI 素養政策內涵的官方新文件。墨西哥 A07 對應舊事件已撤稿，不能重新用文章日期發布。
- [AIED 2026 官方論文集入口](https://aied-conference.org/2026/program/proceedings?preview=True) 與 [Springer AIED 社會面論文集](https://link.springer.com/book/10.1007/978-3-032-29773-0) 已上線，其會期是 2026 年 6/27–7/3；K–12 AI literacy 框架相關論文為**舊論文集線索**，不是本期 10/09 新訊。
- [LAK 2026 中學生 AI 素養線上模組論文](https://doi.org/10.1145/3785022.3785043)、[教師自陳與客觀 AI 素養評量比較](https://doi.org/10.1145/3785022.3785088)、[國中生 GenAI 互動](https://doi.org/10.1145/3785022.3785094) 均見 ACM **2026-04-26 Published**；僅供背景研究。
- [ITiCSE 2026 官方論文集及獎項](https://iticse.acm.org/2026/awards-proceedings/) 可定位，但未確認本期新首發論文；不宣稱全部論文逐篇審核。
- 其餘 EDM、SIGCSE、EC-TEL 等進行主題／2026 proceedings 定向查詢，未能就 10/09 當期新訊建立發布日證據，保持未認證。

## 3. 本輪覆蓋率誠實申報

**已直接查閱或找到官方／出版社與原始論文入口之指定池項目**：J15（Learning and Instruction）、J20（Teaching and Teacher Education）、C01（AIED）、C03（LAK）、C07（ITiCSE）。另對 C02（EDM）、C06（SIGCSE）及 C10（EC-TEL）搜尋主題／proceedings，但未完整核對論文集或日期。其餘未逐項檢索。不能把上述 5 項視為全覆蓋；即便已查某一期刊／會議入口，**並非核實該源所有文章**。

基準來源池仍為 34 種期刊、19 個會議：`research/venue-watchlist.md`。其他來源池 ID 無逐源核證時，一律標記 **not checked**；不填入假造的搜索日、全面零篇結論或 `lookback_days=30`。

## 4. 正向出版與實站驗收

本輪 **0 件合格當期首次公開**，因此不能建立正式 daily HTML／claims、不能將 held 候選升級為 publish，也不能以測試 fixture 冒充真的首發來源正向出版。CI 能覆核程式但不能證明全球首發或中文語意忠實。

Pages 現有部署僅能從 GitHub Actions 確認 verify/deploy job；公開網站的瀏覽器逐頁點擊及手機顯示未有可重現外部驗收。保持此項未完成，不能據此開啟階段 D 自動出版。

## 5. 後續最小工作

逐批補查尚未完整巡檢的 29 本期刊、16 個會議之可存取出版記錄，優先核實 10/09–10/15 Online First／原始公開日、K–12 學段及同事件更早版本；發現新訊先比對九筆共享候選及跨週反證，再考慮出版。沒有足夠正向證據時**零則不刊**。
