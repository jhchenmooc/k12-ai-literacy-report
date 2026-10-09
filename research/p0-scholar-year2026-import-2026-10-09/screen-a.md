# 2026 全年作者檢索：A 批逐篇篩選

篩選時間（UTC）：2026-10-09T19:29:11Z；共 22 篇。資料來源：OpenAlex works（逐篇）、Crossref works（import 候選與正式版查找）。未寫入作者姓名與摘要。

## 計數

| 項目 | 數值 |
|---|---|
| recommendation=exclude | 7 |
| recommendation=pending | 4 |
| recommendation=import | 10 |
| recommendation=not_k12_fit | 1 |
| recommendation=teacher_ed_fit | 0 |
| population=k12 | 16 |
| population=unclear | 4 |
| population=non_k12 | 2 |
| population=teacher_ed | 0 |
| known_duplicate | 1 |
| import（新，不含已在庫） | 9 |

## 結果表

| # | DOI | 學者 | 歸屬 | 學段 | population | 主題 | 版本 | 建議 | 類別 | 國別 | 理由 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 0 | 10.1007/978-3-032-26816-7_8 | S03 | valid | explicit | k12 | tool_only | formal_doi | **exclude** |  |  | ORCID 對到，Radboud 一致；主題為智慧家教系統（ITS）在普通教育之導入政策比較，AI 為學習工具，非學習關於 AI；書籍章節 |
| 1 | （無 DOI） | S04 | valid | explicit | k12 | fit | preprint_only | **pending** |  |  | ORCID 對到（OpenAlex 無單位，UEF 機構典藏與清單單位一致）；教師對 AI 分工之看法，主題屬邊界（教師與 AI／治理）；僅機構典藏 submittedVersion（OpenAlex 標 conference-paper，無 DOI），Crossref 題名查無正式版 |
| 2 | 10.70725/748674ovwknd | S23 | valid | unclear | unclear | tool_only | formal_doi | **exclude** |  |  | ORCID 對到，梨花女大一致；教師以 GenAI 進行創意問題解決之專業發展，AI 為教學工具；在職＋職前教師混合，未寫任教學段 |
| 3 | 10.71741/4pyxmbnjaq.31302475 | S09 | valid | explicit | k12 | fit | grey_report | **pending** |  |  | ORCID 對到，OpenAlex 無單位（UTS Figshare 報告，與清單所載 UQ 不同，但主題一致，判 valid 並註記）；K-12 生成式 AI 風險（認知卸載）；非期刊／會議，屬機構報告（灰色文獻），版本欄記 grey_report，由管理者決定是否以報告類型入庫 |
| 4 | 10.2139/ssrn.6278616 | S10 | valid | explicit | k12 | fit | preprint_only | **pending** |  |  | ORCID 對到，OpenAlex 無單位；SSRN 預印本、無摘要；Crossref 另有同作者群 2025 MIPRO 會議論文 10.1109/mipro65660.2025.11131841（題名不同，是否同一研究未確認，且為 2025 年）與較早 SSRN 版 10.2139/ssrn.5314368；兩者均不在知識庫 |
| 5 | 10.1007/978-981-96-6435-1_47 | H02 | valid | unclear | unclear | unrelated | erratum | **exclude** |  |  | ORCID 對到，教大一致；類型為勘誤（Correction to），非研究論文；原章節（Generative AI for School Leaders）未在本批，可另查 |
| 6 | 10.1145/3786761 | H01 | valid | explicit | k12 | fit | formal_doi | **import** | K6 |  | ORCID 對到，Northwestern 一致；不插電具身活動學習 AI 推理（20 名國中年齡參與者），AI 素養 |
| 7 | 10.48550/arxiv.2601.06101 | H11 | valid | explicit | k12 | fit | formal_doi | **import** | K3 |  | ORCID 對到（arXiv 無單位）；arXiv 2601.06101 兩筆 OpenAlex 紀錄為同一預印本；Crossref 題名同之 LAK26 會議正式版 10.1145/3785022.3785088 已在知識庫（KB-2026-0013），不需新增，僅可補記預印本為其版本 |
| 8 | 10.1111/ejed.70464 | T01 | valid | explicit | k12 | fit | formal_doi | **import** | K3 | TW | ORCID 對到，臺中教大一致；教師 AI 教學內容知識量表（AIPACK）編製與驗證，含職前／在職比較但對象界定為中小學教師；類別亦可 K4 |
| 9 | 10.1016/j.tate.2026.105384 | H11 | valid | unclear | unclear | fit | formal_doi | **pending** |  |  | ORCID 對到，港中大一致；教師 AI 能力系統性回顧（42 篇，職前＋在職、AI Education 與 AI in Education），摘要未寫學段 |
| 10 | 10.1016/j.caeai.2026.100551 | H18 | valid | explicit | k12 | fit | formal_doi | **import** | K2 |  | ORCID 對到，Würzburg 一致；學校教育 AI 素養定義與心理向度之系統性回顧（58 篇） |
| 11 | 10.1080/02619768.2026.2621848 | H11 | valid | explicit | k12 | fit | formal_doi | **import** | K4 |  | ORCID 對到，港中大一致；以自我決定論設計教師 AI 素養專業發展與線上專業學習社群；摘要未寫國別 |
| 12 | 10.48550/arxiv.2601.21631 | S10 | valid | not_k12 | non_k12 | fit | formal_doi | **not_k12_fit** |  |  | ORCID 對到，UEF 一致；學生自行訓練小型語言模型以理解 LLM 訓練（大學 CS1，162 人），僅於結論提及對 K-12 AI 素養之意涵；Crossref 有同題 EDUCON 2026 正式版（作者姓氏兩位全同） |
| 13 | 10.3390/asi9020038 | T19 | valid | explicit | k12 | unrelated | formal_doi | **exclude** |  |  | ORCID 對到，臺師大一致（另列印尼單位）；資優與一般高中生科學解題眼動研究，機器學習僅為分析方法 |
| 14 | 10.1016/j.caeai.2026.100555 | H21 | valid | explicit | unclear | fit | formal_doi | **import** | K2 | HK | ORCID 對到，教大一致；AI 解題賦能與 AI 倫理意識之結構方程模型；樣本為中學＋大學混合、未寫主要對象（population=unclear），依 k12 明寫仍建議 import，管理者可改 pending |
| 15 | 10.5061/dryad.h9w0vt4tw | S15 | valid | not_k12 | non_k12 | unrelated | dataset | **exclude** |  |  | ORCID 對到，Wharton 一致；Dryad 資料集，主題為醫藥配送機器學習，與教育無關 |
| 16 | 10.1016/j.caeai.2026.100556 | H21 | valid | explicit | k12 | fit | formal_doi | **import** | K2 |  | ORCID 對到，教大一致；K-12 AI 能力框架範疇回顧（54 篇）並提出三成分框架；類別亦可 K1 |
| 17 | 10.1080/1475939x.2026.2619458 | H12 | valid | explicit | k12 | fit | formal_doi | **import** | K1 | SE | ORCID 對到，Linköping 一致；瑞典高中 AI 科目課綱與支援材料之 3D 素養分析 |
| 18 | 10.1007/s10639-026-13928-y | T22 | valid | explicit | k12 | unrelated | formal_doi | **exclude** |  |  | ORCID 對到（OpenAlex 作者 A5102019604，即清單註記之正確檔案），政大一致；元宇宙 WebQuest 媒體素養，生成式 AI 僅為背景，非 AI 教育 |
| 19 | 10.3390/educsci16030384 | T02 | valid | explicit | k12 | tool_only | formal_doi | **exclude** |  |  | ORCID 對到，臺中教大一致；GenAI 化學探究教練，AI 為學習工具 |
| 20 | 10.1145/3731459.3773305 | H01 | valid | explicit | k12 | fit | formal_doi | **import** | K6 |  | ORCID 對到，Northwestern 一致；博物館 AI 素養展品原型設計研究（TEI 2026 會議論文） |
| 21 | 10.1007/s44436-026-00028-4 | H02 | valid | explicit | k12 | fit | formal_doi | **import** | K2 |  | ORCID 對到，教大一致；幼兒 AI 素養三級回顧（11 篇回顧）；依整合者補充規則幼兒園納入 k12，但 early childhood 可能含 0–3 歲，管理者可改 pending |

## 建議入庫（import）

- 10.1145/3786761；Crossref 題名：AI Unplugged: Exploring Pathways from Physical Simulation to Conceptualization of AI Reasoning Processes；ACM Transactions on Computing Education（2026）；學段原話：middle-school-age participants / young adolescents；類別 K6；國別 摘要未寫。ORCID 對到，Northwestern 一致；不插電具身活動學習 AI 推理（20 名國中年齡參與者），AI 素養
- 10.1145/3785022.3785088；Crossref 題名：How to Assess AI Literacy: Misalignment Between Self-Reported and Objective-Based Measures；Proceedings of the LAK26: 16th International Learning Analytics and Knowledge Conference（2026）；學段原話：teachers' AI literacy … K-12 education；類別 K3；國別 摘要未寫；**已在庫 KB-2026-0013**。ORCID 對到（arXiv 無單位）；arXiv 2601.06101 兩筆 OpenAlex 紀錄為同一預印本；Crossref 題名同之 LAK26 會議正式版 10.1145/3785022.3785088 已在知識庫（KB-2026-0013），不需新增，僅可補記預印本為其版本
- 10.1111/ejed.70464；Crossref 題名：Constructing and Validating the AIPACK Scale: Measuring Teachers' AI Pedagogical Content Knowledge；European Journal of Education（2026）；學段原話：primary and secondary school teachers in Taiwan；類別 K3；國別 TW。ORCID 對到，臺中教大一致；教師 AI 教學內容知識量表（AIPACK）編製與驗證，含職前／在職比較但對象界定為中小學教師；類別亦可 K4
- 10.1016/j.caeai.2026.100551；Crossref 題名：Artificial intelligence literacy at school: A systematic review with a focus on psychological foundations；Computers and Education: Artificial Intelligence（2026）；學段原話：AI literacy … in school education（teachers, students）；類別 K2；國別 摘要未寫。ORCID 對到，Würzburg 一致；學校教育 AI 素養定義與心理向度之系統性回顧（58 篇）
- 10.1080/02619768.2026.2621848；Crossref 題名：Teacher education for artificial intelligence literacy through a self-determination theory perspective；European Journal of Teacher Education（2026）；學段原話：382 secondary school teachers；類別 K4；國別 摘要未寫。ORCID 對到，港中大一致；以自我決定論設計教師 AI 素養專業發展與線上專業學習社群；摘要未寫國別
- 10.1016/j.caeai.2026.100555；Crossref 題名：Exploring the relationship between empowerment in using artificial intelligence for problem-solving and artificial intelligence ethical awareness: Multi-group structural equation modelling；Computers and Education: Artificial Intelligence（2026）；學段原話：students from secondary schools and a university in Hong Kong；類別 K2；國別 HK。ORCID 對到，教大一致；AI 解題賦能與 AI 倫理意識之結構方程模型；樣本為中學＋大學混合、未寫主要對象（population=unclear），依 k12 明寫仍建議 import，管理者可改 pending
- 10.1016/j.caeai.2026.100556；Crossref 題名：Unleashing human potential: An artificial intelligence competency framework for K–12 education；Computers and Education: Artificial Intelligence（2026）；學段原話：K–12 education（題名）；類別 K2；國別 摘要未寫。ORCID 對到，教大一致；K-12 AI 能力框架範疇回顧（54 篇）並提出三成分框架；類別亦可 K1
- 10.1080/1475939x.2026.2619458；Crossref 題名：Introducing AI education in school contexts: a 3D-literacy analysis of the Swedish AI subject；Technology, Pedagogy and Education（2026）；學段原話：Swedish upper secondary school policy documents；類別 K1；國別 SE。ORCID 對到，Linköping 一致；瑞典高中 AI 科目課綱與支援材料之 3D 素養分析
- 10.1145/3731459.3773305；Crossref 題名：Designing and Evaluating Museum Exhibit Prototypes to Foster Middle Schoolers’ AI Literacy through Creativity and Embodiment；Proceedings of the Twentieth International Conference on Tangible, Embedded, and Embodied Interaction（2026）；學段原話：middle schoolers（題名與摘要）；類別 K6；國別 摘要未寫。ORCID 對到，Northwestern 一致；博物館 AI 素養展品原型設計研究（TEI 2026 會議論文）
- 10.1007/s44436-026-00028-4；Crossref 題名：Framing early childhood AI literacy: What did the literature review tell us?；AI, Brain and Child（2026）；學段原話：early childhood（幼兒教育）；類別 K2；國別 摘要未寫。ORCID 對到，教大一致；幼兒 AI 素養三級回顧（11 篇回顧）；依整合者補充規則幼兒園納入 k12，但 early childhood 可能含 0–3 歲，管理者可改 pending

## 非 K-12 但主題相符（not_k12_fit）

- 10.1109/educon67543.2026.11574425。ORCID 對到，UEF 一致；學生自行訓練小型語言模型以理解 LLM 訓練（大學 CS1，162 人），僅於結論提及對 K-12 AI 素養之意涵；Crossref 有同題 EDUCON 2026 正式版（作者姓氏兩位全同）

## 師培主題相符（teacher_ed_fit）

（無）

## 待定（pending）

- W7215575453。ORCID 對到（OpenAlex 無單位，UEF 機構典藏與清單單位一致）；教師對 AI 分工之看法，主題屬邊界（教師與 AI／治理）；僅機構典藏 submittedVersion（OpenAlex 標 conference-paper，無 DOI），Crossref 題名查無正式版
- 10.71741/4pyxmbnjaq.31302475。ORCID 對到，OpenAlex 無單位（UTS Figshare 報告，與清單所載 UQ 不同，但主題一致，判 valid 並註記）；K-12 生成式 AI 風險（認知卸載）；非期刊／會議，屬機構報告（灰色文獻），版本欄記 grey_report，由管理者決定是否以報告類型入庫
- 10.2139/ssrn.6278616。ORCID 對到，OpenAlex 無單位；SSRN 預印本、無摘要；Crossref 另有同作者群 2025 MIPRO 會議論文 10.1109/mipro65660.2025.11131841（題名不同，是否同一研究未確認，且為 2025 年）與較早 SSRN 版 10.2139/ssrn.5314368；兩者均不在知識庫
- 10.1016/j.tate.2026.105384。ORCID 對到，港中大一致；教師 AI 能力系統性回顧（42 篇，職前＋在職、AI Education 與 AI in Education），摘要未寫學段

## 排除（exclude）

- 10.1007/978-3-032-26816-7_8。ORCID 對到，Radboud 一致；主題為智慧家教系統（ITS）在普通教育之導入政策比較，AI 為學習工具，非學習關於 AI；書籍章節
- 10.70725/748674ovwknd。ORCID 對到，梨花女大一致；教師以 GenAI 進行創意問題解決之專業發展，AI 為教學工具；在職＋職前教師混合，未寫任教學段
- 10.1007/978-981-96-6435-1_47。ORCID 對到，教大一致；類型為勘誤（Correction to），非研究論文；原章節（Generative AI for School Leaders）未在本批，可另查
- 10.3390/asi9020038。ORCID 對到，臺師大一致（另列印尼單位）；資優與一般高中生科學解題眼動研究，機器學習僅為分析方法
- 10.5061/dryad.h9w0vt4tw。ORCID 對到，Wharton 一致；Dryad 資料集，主題為醫藥配送機器學習，與教育無關
- 10.1007/s10639-026-13928-y。ORCID 對到（OpenAlex 作者 A5102019604，即清單註記之正確檔案），政大一致；元宇宙 WebQuest 媒體素養，生成式 AI 僅為背景，非 AI 教育
- 10.3390/educsci16030384。ORCID 對到，臺中教大一致；GenAI 化學探究教練，AI 為學習工具

## 請求紀錄

共 40 次 HTTP 請求，狀態：200；明細見 screen-a.json `requests`（不含 key、不含 email）。

## 限制

- 只讀 OpenAlex 摘要與 Crossref 書目，未讀出版社頁與全文；學段、國別只依摘要明寫。
- 3 篇無摘要或摘要不完整：W7130729456（SSRN）、W7134190273（勘誤）無摘要；其餘摘要可讀。
- 正式版查找只用 Crossref query.bibliographic 題名相關度查詢（讀前 5 筆），可能漏掉改題名的正式版；未查 arXiv 頁與 Google Scholar。
- 去重只比對 kb-titles.tsv 的 DOI 與正規化題名。
- 歸屬判斷依 OpenAlex 作者 ORCID 與機構；3 篇 OpenAlex 無機構資料（W7215575453、W7133520779、W7130729456），以 ORCID 與主題一致判 valid。
- 成效相關結論（如前後測、效果量）未納入判斷，入庫時仍標高風險待 G2–G4。
- K1–K6 類別建議依 repo 既有用法推定（K1 政策框架、K2 學術研究、K3 素養評量、K4 教學師培、K5 工具治理、K6 活動實踐），未見正式定義檔。
