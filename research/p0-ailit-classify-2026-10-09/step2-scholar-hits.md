# Step 2 重判結果：AI 素養準則 v0.2（A／B／C）

> 2026-10-09。依 `research/ai-literacy-scope-criteria.md` v0.2 對 step2-items.json 100 筆重判。同一模型判讀，不算獨立審閱。摘要取自 OpenAlex（無則 Crossref），輸出不存摘要全文；Crossref 另對所有 DOI 取題名、刊名、年份。

## 統計

| 類別 | 筆數 |
|---|---|
| A | 41 |
| B | 23 |
| C | 25 |
| unknown | 11 |

| 新建議 | 筆數 |
|---|---|
| import | 39 |
| pending | 19 |
| exclude | 42 |

變動 38 筆（其中 9 筆前判未決）；新增入庫候選（尚未在知識庫）15 筆；邊界 26 筆。

變動方向：exclude->import 14、pending->exclude 5、exclude->pending 8、import->pending 1、None->exclude 6、None->import 2、pending->import 1、None->pending 1

規則說明：import＝A 或 B、學段 k12 或師培、正式版、歸屬無疑、非社論／勘誤／資料集；只有預印本者依本次規則改 exclude（原多為 pending）；無摘要或學段不明者 pending。國別只在摘要寫出國名時填（「Chinese students」等形容詞不算）。

## 變動清單

| # | DOI | 題名（節錄） | 舊→新 | 類別 | 面向 | 理由 |
|---|---|---|---|---|---|---|
| 0 | 10.1007/978-3-032-26816-7_8 | The Use of Intelligent Tutoring Systems in the Context of Ge | exclude→import | B | T-TEA:應用, T-BAS:創造 | 摘要只寫 general education／school context，未寫年級；沿用前判 k12。屬政策導入比較，B 類 |
| 1 | W7215575453 | The Core of Teaching Cannot Be Outsourced: Teachers’ Perspec | pending→exclude | A | T-PD:理解 | 內容屬 A 且學段明確，但只有機構典藏投稿版（無正式版），依新規則預印本即排除；若日後出正式版可重審 |
| 2 | 10.70725/748674ovwknd | Enhancing Teacher Competency for Creative Problem Solving wi | exclude→pending | A | T-TEA:應用, T-PD | 依管理者規則 GenAI 教學培訓判 A；但在職與職前混合、未寫任教學段 |
| 4 | 10.2139/ssrn.6278616 | Operationalizing Child Rights in Educational Technology Desi | pending→exclude | unknown | S-SYS, T-ETH | 僅 SSRN 預印本；類別難判（設計倫理 vs. 師生素養） |
| 19 | 10.3390/educsci16030384 | Designing and Evaluating a 5E-Structured GenAI Coach for Gui | exclude→import | B | S-LRN:應用, T-TEA:創造 | 依新規則 B 類（師生實際使用 AI 工具）屬範圍內 |
| 21 | 10.1007/s44436-026-00028-4 | Framing early childhood AI literacy: What did the literature | import→pending | A | S-BAS, S-ETH | 摘要只寫 early childhood，未寫年齡；依規則學段不明。前判 import 但尚未入庫 |
| 25 | 10.48550/arxiv.2603.20056 | From School AI Readiness to Student AI Literacy: A National  | pending→exclude | A | S-BAS, T-PD | 只有 arXiv 預印本；且職業院校學段不明 |
| 26 | 10.1109/cste69562.2026.11649645 | Can Generative Artificial Intelligence Improve Primary Stude | exclude→pending | unknown | S-LRN | 無摘要（OpenAlex、Crossref 皆無），只能依題名；可能為 B |
| 29 | 10.48550/arxiv.2604.05702 | Dialogue Act Patterns in GenAI-Mediated L2 Oral Practice: A  | exclude→import | B | S-LRN:應用 | 條目 DOI 為 arXiv；前判以題名找到 AIED 2026 LNCS 正式章節，入庫時應改用正式版 DOI 並核對 |
| 30 | 10.1002/jcal.70245 | Enhancing Emotional Intelligence Through Generative AI ‐Supp | exclude→import | B | S-LRN:應用 | 依新規則 B 類（師生實際使用 AI 工具）屬範圍內 |
| 38 | 10.1111/ijal.70256 | How L2 Learners Negotiate Meaning in GenAI‐Supported Creativ | exclude→import | B | S-LRN:應用, S-BAS:應用 | 依新規則 B 類（師生實際使用 AI 工具）屬範圍內 |
| 40 | 10.3390/educsci16060972 | Understanding How Technology Acceptance Relates to Programmi | exclude→import | B | S-LRN:應用 | 依新規則 B 類（師生實際使用 AI 工具）屬範圍內 |
| 45 | 10.1007/978-3-032-15743-0_3 | Block-Based Programming vs Prompt-Based Programming: An Expl | exclude→pending | unknown | S-LRN, S-BAS | 無摘要，只能依題名；可能為 B |
| 46 | 10.2139/ssrn.7330465 | What 5,000 Questions to AI Reveal About Children’s Curiosity | pending→exclude | A | S-ETH:理解, S-LRN:理解 | 內容屬 A，但只有 SSRN 預印本；且為家庭情境 |
| 54 | 10.30935/cedtech/17983 | AI transformation in education: Examining teachers’ percepti | exclude→import | A | T-TEA:理解, T-ETH | 已在知識庫 KB-2026-0172；前判 tool_only 排除，新規則改 A |
| 58 | 10.1080/09588221.2026.2640087 | ChatGPT-assisted EFL learning beyond the classroom: impact o | exclude→import | B | S-LRN:應用 | 依新規則 B 類（師生實際使用 AI 工具）屬範圍內 |
| 61 | 10.1145/3785022.3785094 | From Wandering to Collaboration: Discourse Patterns in Middl | exclude→import | B | S-LRN:應用 | 重點在學生使用 AI 的行為型態，依準則也可判 A（S-LRN） |
| 65 | 10.1080/10409289.2026.2669922 | Using Generative Artificial Intelligence to Facilitate Early | exclude→pending | B | T-TEA:應用, S-LRN | 摘要只寫 kindergarten，未寫年齡，依規則學段不明 |
| 66 | 10.1016/j.caeai.2026.100599 | From proficiency to pedagogy: A mixed-methods study of in-se | exclude→pending | A | T-TEA | 依新規則改 A；但只寫 in-service teachers 與 school level，未寫學段 |
| 67 | 10.1016/j.caeo.2026.100383 | Protecting teacher agency in times of strong technology push | exclude→pending | unknown | T-PD | AI 只是教育科技之一，是否屬 AI 素養待管理者判斷；只寫 schools |
| 68 | 10.1007/s44163-026-01456-0 | The impact of generative AI training on teachers’ curriculum | exclude→import | A | T-PD:應用, T-TEA:應用 | 已在知識庫 KB-2026-0171；前判 tool_only 排除，新規則改 A |
| 71 | 10.1145/3773077.3812151 | Designing Conversational Agents for Young Children: Comparin | exclude→import | B | S-LRN | 線上設計研究，非學校情境；重點為代理設計 |
| 72 | 10.1007/978-3-032-29770-9_55 | AI Evaluation and Feedback to Support Middle-School Students | exclude→pending | unknown | S-LRN | 無摘要；可能為 B，也可能僅為 AI 評分後端（C） |
| 74 | 10.1016/j.compedu.2026.105707 | A community of inquiry perspective on human–AI co-facilitati | exclude→import | B | T-TEA:創造, S-LRN:應用 | 依新規則 B 類（師生實際使用 AI 工具）屬範圍內 |
| 75 | 10.1080/10494820.2026.2685798 | Bidirectional relations of epistemic beliefs and their impac | exclude→import | B | S-LRN:應用 | 依新規則 B 類（師生實際使用 AI 工具）屬範圍內 |
| 79 | 10.1007/s44436-026-00043-5 | Fostering SCALE habits of mind through AI-empowered arts-bas | exclude→pending | B | T-TEA:創造 | 寫 K-12 education and beyond，學段混合；概念論文 |
| 83 | 10.5281/zenodo.21319936 | Dynamic prediction of final diagnostic outcomes to support f | （未決）→exclude | C |  | C 類 |
| 84 | 10.1111/ijal.70320 | Using Generative Artificial Intelligence to Support Secondar | exclude→import | B | S-LRN:應用 | 依新規則 B 類（師生實際使用 AI 工具）屬範圍內 |
| 85 | 10.1111/bjet.70083 | From emotion regulation to academic success: A self‐determin | （未決）→import | B | S-LRN:應用 | 前判 ai_topic=no；全文摘要寫明代理結合 GenAI，學生直接互動 |
| 87 | 10.1177/07356331261479569 | Beyond AI Literacy: Exploring Pre-Service Teachers’ Pedagogi | （未決）→import | A | T-ETH:應用, T-TEA:理解 | 對象為職前教師（師培），不進週報候選 |
| 89 | 10.1016/j.compedu.2026.105755 | Fifty Years of Topic Development, Thematic Combination, and  | （未決）→exclude | C |  | C 類 |
| 90 | 10.1016/j.compedu.2026.105756 | Mapping fifty years of technology-enhanced science and mathe | （未決）→exclude | C |  | C 類 |
| 91 | 10.1080/09500693.2026.2727692 | Human-in-the-loop: leveraging generative artificial intellig | （未決）→exclude | B | T-TEA, S-LRN | 摘要自稱 editorial（Crossref 標 journal-article） |
| 92 | 10.1002/jcal.70331 | Trace Data of Secondary Students and Linguistic Analysis to  | （未決）→exclude | C |  | C 類 |
| 93 | 10.1016/j.caeo.2026.100422 | Navigating AI’s educational future: expert scenarios and imp | pending→import | A | T-PD:理解, T-TEA, S-LRN | 專家情境研究，涵蓋小學到高教多學段；前判 pending |
| 94 | 10.3389/feduc.2026.1885959 | The B-AIMT: development and initial validation of a domain-s | （未決）→pending | A | T-TEA:理解, T-ETH | 職前＋在職混合，未寫任教學段 |
| 95 | 10.31234/osf.io/afuq2_v1 | TAIL: A Test of AI Literacy for Adolescents and Teachers | pending→exclude | A | S-BAS:理解, T-BAS:理解 | 內容為高價值 A 類評量，但只有 PsyArXiv 預印本；依新規則排除，出正式版後應重審 |
| 98 | 10.1145/3776591.3832522 | Can Vision-Language Models Extract Relevant Multimodal Cues  | （未決）→exclude | C |  | C 類 |

## 新增入庫候選（不在知識庫）

| # | DOI | Crossref 刊名 | 年 | 建議類別 | 國別 |
|---|---|---|---|---|---|
| 0 | 10.1007/978-3-032-26816-7_8 | Digital Education and Innovation | 2026 | K5 | NL, KR |
| 19 | 10.3390/educsci16030384 | Education Sciences | 2026 | K2 | — |
| 29 | 10.48550/arxiv.2604.05702 | — | — | K2 | — |
| 30 | 10.1002/jcal.70245 | Journal of Computer Assisted Learning | 2026 | K2 | — |
| 38 | 10.1111/ijal.70256 | International Journal of Applied Linguistics | 2026 | K2 | — |
| 40 | 10.3390/educsci16060972 | Education Sciences | 2026 | K2 | — |
| 54 | 10.30935/cedtech/17983 | Contemporary Educational Technology | 2026 | K4 | AE |
| 58 | 10.1080/09588221.2026.2640087 | Computer Assisted Language Learning | 2026 | K2 | — |
| 61 | 10.1145/3785022.3785094 | Proceedings of the LAK26: 16th International Learning Analytics and Knowledge Conference | 2026 | K2 | — |
| 68 | 10.1007/s44163-026-01456-0 | Discover Artificial Intelligence | 2026 | K4 | AE |
| 71 | 10.1145/3773077.3812151 | Proceedings of the 25th Annual ACM Interaction Design and Children Conference | 2026 | K2 | — |
| 74 | 10.1016/j.compedu.2026.105707 | Computers &amp; Education | 2026 | K2 | — |
| 75 | 10.1080/10494820.2026.2685798 | Interactive Learning Environments | 2026 | K2 | — |
| 84 | 10.1111/ijal.70320 | International Journal of Applied Linguistics | 2026 | K2 | — |
| 85 | 10.1111/bjet.70083 | British Journal of Educational Technology | 2026 | K2 | — |
| 87 | 10.1177/07356331261479569 | Journal of Educational Computing Research | 2026 | K4 | — |
| 93 | 10.1016/j.caeo.2026.100422 | Computers and Education Open | 2026 | K4 | — |

## 邊界案例（請管理者決定）

| # | DOI | 新建議 | 類別 | 理由 |
|---|---|---|---|---|
| 0 | 10.1007/978-3-032-26816-7_8 | import | B | 摘要只寫 general education／school context，未寫年級；沿用前判 k12。屬政策導入比較，B 類 |
| 1 | W7215575453 | exclude | A | 內容屬 A 且學段明確，但只有機構典藏投稿版（無正式版），依新規則預印本即排除；若日後出正式版可重審 |
| 2 | 10.70725/748674ovwknd | pending | A | 依管理者規則 GenAI 教學培訓判 A；但在職與職前混合、未寫任教學段 |
| 4 | 10.2139/ssrn.6278616 | exclude | unknown | 僅 SSRN 預印本；類別難判（設計倫理 vs. 師生素養） |
| 10 | 10.1016/j.caeai.2026.100551 | import | A | 摘要只寫 school education，未寫年級；沿用前判 k12，尚未入庫，管理者可改 pending |
| 14 | 10.1016/j.caeai.2026.100555 | import | A | 樣本為香港中學＋大學混合；中學明寫，沿用前判 import，尚未入庫，管理者可改 pending |
| 21 | 10.1007/s44436-026-00028-4 | pending | A | 摘要只寫 early childhood，未寫年齡；依規則學段不明。前判 import 但尚未入庫 |
| 26 | 10.1109/cste69562.2026.11649645 | pending | unknown | 無摘要（OpenAlex、Crossref 皆無），只能依題名；可能為 B |
| 28 | 10.1007/978-3-032-29760-0_37 | exclude | C | 若日後回饋實際交付學生使用則可能轉 B |
| 29 | 10.48550/arxiv.2604.05702 | import | B | 條目 DOI 為 arXiv；前判以題名找到 AIED 2026 LNCS 正式章節，入庫時應改用正式版 DOI 並核對 |
| 45 | 10.1007/978-3-032-15743-0_3 | pending | unknown | 無摘要，只能依題名；可能為 B |
| 46 | 10.2139/ssrn.7330465 | exclude | A | 內容屬 A，但只有 SSRN 預印本；且為家庭情境 |
| 47 | 10.1007/978-3-032-06565-0_3 | exclude | C | 若教師實際使用此工具出題可算 T-TEA「客製AI教學工具與資源」（B）；且學段混合（K-12 科學＋醫學） |
| 61 | 10.1145/3785022.3785094 | import | B | 重點在學生使用 AI 的行為型態，依準則也可判 A（S-LRN） |
| 64 | 10.1016/j.asw.2026.101053 | exclude | C | 摘要稱提示是教師與 LLM 互動之途，但研究未涉教師實際使用 |
| 65 | 10.1080/10409289.2026.2669922 | pending | B | 摘要只寫 kindergarten，未寫年齡，依規則學段不明 |
| 66 | 10.1016/j.caeai.2026.100599 | pending | A | 依新規則改 A；但只寫 in-service teachers 與 school level，未寫學段 |
| 67 | 10.1016/j.caeo.2026.100383 | pending | unknown | AI 只是教育科技之一，是否屬 AI 素養待管理者判斷；只寫 schools |
| 71 | 10.1145/3773077.3812151 | import | B | 線上設計研究，非學校情境；重點為代理設計 |
| 72 | 10.1007/978-3-032-29770-9_55 | pending | unknown | 無摘要；可能為 B，也可能僅為 AI 評分後端（C） |
| 76 | 10.4324/9781003657590 | exclude | C | 涉及青少年 AI 倫理參與，但非教育研究；學段不明 |
| 79 | 10.1007/s44436-026-00043-5 | pending | B | 寫 K-12 education and beyond，學段混合；概念論文 |
| 82 | 10.1016/j.ssaho.2026.103755 | pending | B | 只寫 rural schools；治理偏工具採用 |
| 93 | 10.1016/j.caeo.2026.100422 | import | A | 專家情境研究，涵蓋小學到高教多學段；前判 pending |
| 94 | 10.3389/feduc.2026.1885959 | pending | A | 職前＋在職混合，未寫任教學段 |
| 95 | 10.31234/osf.io/afuq2_v1 | exclude | A | 內容為高價值 A 類評量，但只有 PsyArXiv 預印本；依新規則排除，出正式版後應重審 |

## 全部 100 筆

| # | DOI | 學段 | 舊 | 新 | 類別 | 面向 | 對應說明 |
|---|---|---|---|---|---|---|---|
| 0 | 10.1007/978-3-032-26816-7_8 | k12 | exclude | import | B | T-TEA:應用, T-BAS:創造 | 荷蘭與南韓學校導入智慧家教系統（ITS）之策略比較，師生實際使用 AI 學習工具，對應 T-TEA「評估AI與教學法整合的適切性」與 T-BAS「參與AI校園治理部署與決策」。 |
| 1 | W7215575453 | k12 | pending | exclude | A | T-PD:理解 | 芬蘭國中教師對哪些工作可交給 AI 的看法，對應 T-PD「理解AI時代教師專業自主與責任」。 |
| 2 | 10.70725/748674ovwknd | unclear | exclude | pending | A | T-TEA:應用, T-PD | 教師生成式 AI 創意解題工作坊（教師 GenAI 培訓，依準則一律判 A），對應 T-TEA「設計AI與教學法整合的策略」。 |
| 3 | 10.71741/4pyxmbnjaq.31302475 | k12 | pending | pending | A | S-LRN:理解, S-ETH, T-TEA | 報告談學生以 AI 認知卸載之風險與教學對策，對應 S-LRN「理解AI在學習的角色與界線」目標下「理解AI輔助學習的角色功能」。 |
| 4 | 10.2139/ssrn.6278616 | k12 | pending | exclude | unknown | S-SYS, T-ETH | 以兒童權利指導兩款 AI 教育工具設計，偏向開發者設計準則；勉強可對應 S-SYS「洞悉AI系統的設計責任」與 T-ETH「保護個資與AI數據隱私」，但主體不是師生素養。 |
| 5 | 10.1007/978-981-96-6435-1_47 | unclear | exclude | exclude | unknown |  | 勘誤，無摘要，無從對應內涵。 |
| 6 | 10.1145/3786761 | k12 | import | import | A | S-BAS:理解 | 國中年齡學生以不插電具身活動理解 AI 推理，對應 S-BAS「理解AI運作原理與限制」。 |
| 7 | 10.48550/arxiv.2601.06101 | k12 | import | import | A | T-PD, T-BAS:理解, T-ETH | 教師 AI 素養自陳與客觀測量之比較，對應 T-PD「評估教師AI素養以規劃專業增能」與 T-BAS「培養AI的基礎知識」。 |
| 8 | 10.1111/ejed.70464 | k12 | import | import | A | T-TEA | 臺灣中小學教師 AI 教學內容知識（AIPACK）量表，對應 T-TEA「整合AI與教學法」目標下「評估AI與教學法整合的適切性」。 |
| 9 | 10.1016/j.tate.2026.105384 | unclear | pending | pending | A | T-PD | 教師 AI 能力發展之系統性回顧，對應 T-PD「評估教師AI素養以規劃專業增能」。 |
| 10 | 10.1016/j.caeai.2026.100551 | k12 | import | import | A | S-BAS, S-ETH, T-BAS, T-PD | 學校教育 AI 素養定義與心理向度回顧，涵蓋師生，對應 S-BAS「理解AI運作原理與限制」與 T-BAS「培養AI的基礎知識」。 |
| 11 | 10.1080/02619768.2026.2621848 | k12 | import | import | A | T-PD:應用 | 中學教師 AI 素養專業發展與線上專業學習社群，對應 T-PD「參與社群共學反思AI時代教師角色」。 |
| 12 | 10.48550/arxiv.2601.21631 | non_k12 | exclude | exclude | A | S-BAS:理解 | 大學 CS1 學生自訓小型語言模型以理解訓練原理，對應 S-BAS「理解AI運作原理與限制」，但對象為大學。 |
| 13 | 10.3390/asi9020038 | k12 | exclude | exclude | C |  | 資優與一般高中生眼動研究，機器學習只是分類方法，對應不到任何內涵。 |
| 14 | 10.1016/j.caeai.2026.100555 | k12 | import | import | A | S-ETH:理解 | 學生以 AI 解題之賦能感與 AI 倫理意識，對應 S-ETH「覺察AI倫理展現人類價值」。 |
| 15 | 10.5061/dryad.h9w0vt4tw | non_k12 | exclude | exclude | C |  | 醫藥配送機器學習資料集，與教育無關，對應不到任何內涵。 |
| 16 | 10.1016/j.caeai.2026.100556 | k12 | import | import | A | S-BAS:理解, S-LRN:應用, S-ETH | K-12 AI 能力框架範疇回顧並提出 Understanding／Using／Unleashing 框架，對應 S-BAS「理解AI運作原理與限制」與 S-LRN「應用AI工具強化領域學習」。 |
| 17 | 10.1080/1475939x.2026.2619458 | k12 | import | import | A | S-BAS, S-ETH:理解 | 瑞典高中 AI 科目課綱之 AI 素養分析，對應 S-BAS「理解AI運作原理與限制」與 S-ETH「具備對AI的批判思考」。 |
| 18 | 10.1007/s10639-026-13928-y | k12 | exclude | exclude | C |  | 元宇宙 WebQuest 媒體素養，生成式 AI 只是背景，師生未使用 AI，對應不到任何內涵。 |
| 19 | 10.3390/educsci16030384 | k12 | exclude | import | B | S-LRN:應用, T-TEA:創造 | 國中生使用 5E 結構 GenAI 化學探究教練之成效，對應 S-LRN「應用AI工具強化領域學習」與 T-TEA「客製AI教學工具與資源」。 |
| 20 | 10.1145/3731459.3773305 | k12 | import | import | A | S-BAS:理解 | 博物館展品培養國中生 AI 素養，對應 S-BAS「理解AI運作原理與限制」與「覺察AI的世界並產生好奇心」。 |
| 21 | 10.1007/s44436-026-00028-4 | unclear | import | pending | A | S-BAS, S-ETH | 幼兒 AI 素養三級回顧，對應 S-BAS「認知AI基礎以參與互動」與 S-ETH「理解AI倫理困境」。 |
| 22 | 10.1609/aaai.v40i48.42118 | k12 | exclude | exclude | C |  | 以視覺語言模型分析學生手寫歷程，AI 為學習分析後端，學生未直接與 AI 互動，對應不到任何內涵。 |
| 23 | 10.1609/aaai.v40i47.41526 | k12 | import | import | A | S-ETH:理解, S-BAS:理解 | 以卡牌活動教青少年 AI 資料集代表性與偏誤，對應 S-ETH「具備對AI的批判思考」與 S-BAS「連結AI服務與資料來源」。 |
| 24 | 10.1609/aaai.v40i47.41522 | k12 | import | import | A | S-ETH | 國高中美術學生設計 AI 與藝術政策，對應 S-ETH「思辨AI中的應用與取捨」。 |
| 25 | 10.48550/arxiv.2603.20056 | unclear | pending | exclude | A | S-BAS, T-PD | 職業院校 AI 準備度、教師 AI 能力與學生 AI 素養多層次分析，對應 T-PD「評估教師AI素養以規劃專業增能」。 |
| 26 | 10.1109/cste69562.2026.11649645 | k12 | exclude | pending | unknown | S-LRN | 無摘要；題名為生成式 AI 提升小學生類比推理，可能對應 S-LRN「應用AI工具強化領域學習」，未能確認。 |
| 27 | W7149873627 | unclear | exclude | exclude | C |  | 以 LLM 產生差分隱私合成資料供研究共享，AI 為研究方法，對應不到任何內涵。 |
| 28 | 10.1007/978-3-032-29760-0_37 | k12 | exclude | exclude | C |  | 研究者以 MLLM 對學生科學繪圖產生回饋並檢驗其效度，學生未直接與 AI 互動，對應不到任何內涵。 |
| 29 | 10.48550/arxiv.2604.05702 | k12 | exclude | import | B | S-LRN:應用 | 九年級 EFL 學生與 GenAI 語音聊天機器人口說練習之對話行為，對應 S-LRN「應用AI工具強化領域學習」。 |
| 30 | 10.1002/jcal.70245 | k12 | exclude | import | B | S-LRN:應用 | 國中生以生成式 AI 輔助數位說故事之成效，對應 S-LRN「應用AI工具強化領域學習」。 |
| 31 | 10.1016/j.ijme.2026.101430 | non_k12 | exclude | exclude | unknown |  | 無摘要；題名為商學院生成式 AI 採用，對象非 K-12。 |
| 32 | 10.1007/s10639-026-13998-y | k12 | import | import | A | S-BAS, S-ETH, S-LRN:理解 | 中學生一年期 AI 課程之 AI 學習動機轉變與 AI 素養，對應 S-LRN「認知AI可優化學習而提升動機」與 S-BAS「理解AI運作原理與限制」。 |
| 33 | 10.4337/9781035330676.00029 | unclear | pending | pending | unknown |  | 無摘要；題名為學校 AI 承諾之民族誌，無法對應內涵。 |
| 34 | 10.1108/aiie-12-2026-269 | non_k12 | exclude | exclude | B | S-LRN | 高等教育 AI 輔助學術寫作與翻譯之客座社論，可對應 S-LRN「應用AI工具強化領域學習」，但為社論且非 K-12。 |
| 35 | 10.1080/01443410.2026.2668683 | k12 | import | import | A | S-LRN:應用, S-ETH:理解 | 中三學生以 GenAI 聊天機器人取得回饋，結果含 AI 素養與批判關注，對應 S-LRN「應用AI工具強化領域學習」與 S-ETH「具備對AI的批判思考」。 |
| 36 | 10.48550/arxiv.2605.14228 | k12 | exclude | exclude | C |  | 中學生線上寫作自我調整學習，機器學習僅為分析方法，對應不到任何內涵。 |
| 37 | 10.48550/arxiv.2606.01592 | k12 | exclude | exclude | C |  | LLM 預先產生文法練習題，學生使用一般練習 App 而非直接與 AI 互動，對應不到任何內涵。 |
| 38 | 10.1111/ijal.70256 | k12 | exclude | import | B | S-LRN:應用, S-BAS:應用 | 國中生與生成式 AI 協商意義以創作英文繪本，對應 S-LRN「應用AI工具強化領域學習」與 S-BAS「運用提示詞優化AI互動」。 |
| 39 | 10.1016/j.learninstruc.2026.102418 | k12 | exclude | exclude | C |  | 協作解題鷹架以序列探勘設計，摘要未見學生使用 AI，AI 僅為設計方法，對應不到任何內涵。 |
| 40 | 10.3390/educsci16060972 | k12 | exclude | import | B | S-LRN:應用 | 高中生在 AI 代理輔助程式學習中的科技接受與自我效能，對應 S-LRN「應用AI工具強化領域學習」。 |
| 41 | 10.1145/3773077.3806146 | unclear | pending | pending | A | S-ETH:理解, S-BAS | 少數族裔青少年批判性 AI 課程與拒用 AI 判斷，對應 S-ETH「思辨AI中的應用與取捨」。 |
| 42 | 10.1145/3774398.3811610 | non_k12 | exclude | exclude | B | S-LRN | 十所高等教育機構學生使用 GenAI 家教之投入型態，對應 S-LRN「應用AI工具強化領域學習」，但非 K-12。 |
| 43 | 10.1007/978-3-032-34157-0_8 | k12 | exclude | exclude | C |  | 六年級數位課本日誌之學習分析方法比較，與 AI 無涉，對應不到任何內涵。 |
| 44 | 10.5040/9781350518810 | k12 | pending | pending | A | S-BAS:理解 | 3–8 歲幼兒運算思維與 AI 素養課程專書，對應 S-BAS「覺察AI的世界並產生好奇心」。 |
| 45 | 10.1007/978-3-032-15743-0_3 | k12 | exclude | pending | unknown | S-LRN, S-BAS | 無摘要；題名為積木式與提示式程式設計比較，可能對應 S-BAS「實踐AI強化運算思維」，未能確認。 |
| 46 | 10.2139/ssrn.7330465 | k12 | pending | exclude | A | S-ETH:理解, S-LRN:理解 | 8–10 歲兒童在家向 AI 提問並評估回應，對應 S-ETH「具備對AI的批判思考」與 S-LRN「理解AI輔助學習的角色功能」。 |
| 47 | 10.1007/978-3-032-06565-0_3 | unclear | exclude | exclude | C |  | 生成式 AI 自動產生評量題目之工具開發，師生未直接與 AI 互動，對應不到任何內涵。 |
| 48 | 10.3102/2283935 | k12 | pending | pending | unknown | S-BAS, S-LRN | 無摘要；題名為互動式機器學習與對話代理支援中學科學探究，未能確認對應內涵。 |
| 49 | 10.3389/feduc.2025.1737928 | non_k12 | exclude | exclude | B | S-LRN | 大學生使用生成式 AI 自學，對應 S-LRN「應用AI工具強化領域學習」，但非 K-12。 |
| 50 | 10.58459/rptel.2026.21041 | k12 | import | import | A | T-PD:應用, T-TEA, T-ETH | 新加坡在職教師 AI 素養專業發展（i-TPACK），對應 T-PD「評估教師AI素養以規劃專業增能」與 T-TEA「整合AI與教學法」。 |
| 51 | 10.1145/3770762.3772634 | k12 | exclude | exclude | C |  | 語文整合 Scratch 運算思維課程，未涉 AI 內容，對應不到任何內涵。 |
| 52 | 10.4018/979-8-3373-6546-6 | unclear | exclude | exclude | C |  | 資訊教育教學創新專書導論，AI 僅為背景，對應不到任何內涵。 |
| 53 | 10.1002/jcal.70214 | non_k12 | exclude | exclude | B | S-LRN | 大學生 GenAI 自我調節鷹架準實驗，對應 S-LRN「AI轉化自我、共同與社會調節」，但非 K-12。 |
| 54 | 10.30935/cedtech/17983 | k12 | exclude | import | A | T-TEA:理解, T-ETH | 阿聯 4–9 年級教師以 TAM-TPACK-GenAI 框架看 AI 融入教學（教師 AI-TPACK，依準則判 A），對應 T-TEA「評估AI工具輔助教學的適用性」。 |
| 55 | 10.1016/j.wss.2026.100375 | non_k12 | exclude | exclude | A | S-ETH:應用 | 阿聯大學生倫理 AI 使用與身心福祉，對應 S-ETH「落實AI使用規範與責任」，但非 K-12。 |
| 56 | 10.1080/08872376.2026.2632617 | k12 | import | import | A | S-BAS:應用, S-ETH:理解 | 七年級學生建 AI 模型並探討偏誤（Shark AI），對應 S-BAS「理解AI運作原理與限制」與 S-ETH「具備對AI的批判思考」。 |
| 57 | 10.4324/9781003607304-10 | k12 | import | import | A | S-BAS:理解 | 4–6 歲幼兒以社交機器人學 AI（PopBots），對應 S-BAS「理解AI運作原理與限制」。 |
| 58 | 10.1080/09588221.2026.2640087 | k12 | exclude | import | B | S-LRN:應用 | 高中 EFL 學生以 ChatGPT 語音練習口說之成效，對應 S-LRN「應用AI工具強化領域學習」。 |
| 59 | 10.1609/aaai.v40i48.42116 | k12 | exclude | exclude | C |  | 以 LLM 分析中學生合作對話之學習分析框架，AI 為分析後端，對應不到任何內涵。 |
| 60 | 10.1111/bjet.70069 | k12 | import | import | A | S-BAS:理解 | 四五年級學生 AI 基礎概念學習進程與動態評量，對應 S-BAS「理解AI運作原理與限制」。 |
| 61 | 10.1145/3785022.3785094 | k12 | exclude | import | B | S-LRN:應用 | 國中生使用課堂 GenAI 寫作家教之對話與投入型態，對應 S-LRN「應用AI工具強化領域學習」。 |
| 62 | 10.1145/3785022.3785065 | k12 | exclude | exclude | C |  | 以 LLM 分類中學生合作解題對話，AI 為分析後端，對應不到任何內涵。 |
| 63 | 10.1080/15391523.2026.2661641 | k12 | import | import | A | T-ETH:應用, T-BAS:創造, S-ETH:應用 | K-12 GenAI 政策與指引框架（Delphi），對應 T-ETH「健全校園AI使用規範」與 S-ETH「正用AI符合學術誠信」。 |
| 64 | 10.1016/j.asw.2026.101053 | k12 | exclude | exclude | C |  | 以 LLM 提示做中學生論說文自動評分之信度研究，屬自動評分準確度，對應不到任何內涵。 |
| 65 | 10.1080/10409289.2026.2669922 | unclear | exclude | pending | B | T-TEA:應用, S-LRN | 幼兒園師生以 GenAI 進行 STEM 專題及教師看法，對應 T-TEA「設計AI與教學法整合的策略」。 |
| 66 | 10.1016/j.caeai.2026.100599 | unclear | exclude | pending | A | T-TEA | 26 國在職教師 TPACK-GenAI（教師 AI-TPACK，依準則判 A），對應 T-TEA「整合AI與教學法」。 |
| 67 | 10.1016/j.caeo.2026.100383 | unclear | exclude | pending | unknown | T-PD | 教育科技（含 AI）推進下保護教師能動性之概念論文，可能對應 T-PD「理解AI時代教師專業自主與責任」，但 AI 非唯一主題。 |
| 68 | 10.1007/s44163-026-01456-0 | k12 | exclude | import | A | T-PD:應用, T-TEA:應用 | K-12 在職教師 GenAI 課程調適培訓（GenAI 教學培訓，依準則判 A），對應 T-TEA「設計AI與教學法整合的策略」。 |
| 69 | 10.4324/9781003661443-5 | k12 | import | import | A | S-LRN:應用, S-ETH:應用 | 將 AI 素養融入語言學習並提出以人為本框架（PapyrusAI），對應 S-LRN「應用AI工具強化領域學習」與 S-ETH「落實AI使用規範與責任」。 |
| 70 | 10.35542/osf.io/62qsn_v1 | unclear | exclude | exclude | C |  | AI 玩具對兒童發展與遊戲影響之回顧，非教學或學習情境，對應不到任何內涵。 |
| 71 | 10.1145/3773077.3812151 | k12 | exclude | import | B | S-LRN | 4–8 歲兒童與 LLM 教學對話代理互動，比較具身與外觀設計，對應 S-LRN「理解AI輔助學習的角色功能」。 |
| 72 | 10.1007/978-3-032-29770-9_55 | k12 | exclude | pending | unknown | S-LRN | 無摘要；題名為 AI 評量與回饋支援國中生科學論證，可能對應 S-LRN「應用AI工具強化領域學習」，未能確認。 |
| 73 | 10.1007/978-3-032-29773-0_25 | unclear | pending | pending | unknown | S-ETH, S-BAS | 無摘要；題名為以故事遊戲讓青少年認識 AI 社會面向，可能對應 S-ETH「理解AI倫理困境」。 |
| 74 | 10.1016/j.compedu.2026.105707 | k12 | exclude | import | B | T-TEA:創造, S-LRN:應用 | 高中代數課教師與對話式 AI 代理共同引導，對應 T-TEA「促進教師與AI教學協作的正向循環」與 S-LRN「應用AI工具強化領域學習」。 |
| 75 | 10.1080/10494820.2026.2685798 | k12 | exclude | import | B | S-LRN:應用 | 七年級生在兩種 GenAI 平台學程式之知識信念與投入，對應 S-LRN「應用AI工具強化領域學習」。 |
| 76 | 10.4324/9781003657590 | unclear | exclude | exclude | C |  | 網路心理學取向探討 AI 與青少年數位參與及心理健康，非教學或學習，對應不到任何內涵。 |
| 77 | 10.1145/3815598.3815638 | k12 | import | import | A | S-BAS:理解, S-LRN | 11–14 歲學生在敘事遊戲中使用 AI 診斷工具以培養 AI 素養，對應 S-BAS「理解AI運作原理與限制」。 |
| 78 | 10.14742/ajet.10934 | non_k12 | exclude | exclude | B | S-LRN | 高等教育跨學科 AI 回顧，對應 S-LRN「應用AI工具強化領域學習」，但非 K-12。 |
| 79 | 10.1007/s44436-026-00043-5 | unclear | exclude | pending | B | T-TEA:創造 | AI 賦能藝術本位教學之概念論文，對應 T-TEA「創新AI教學與設計學習體驗」。 |
| 80 | 10.1007/s44436-026-00044-4 | k12 | exclude | exclude | A | T-PD, S-ETH | 社論討論 AI 時代 K-12 教育重構，對應 T-PD「理解AI時代教師專業自主與責任」。 |
| 81 | 10.1007/s11528-026-01223-z | k12 | exclude | exclude | C |  | K-12 科學敘事中心學習環境回顧，AI 只在結論，對應不到任何內涵。 |
| 82 | 10.1016/j.ssaho.2026.103755 | unclear | pending | pending | B | T-BAS:創造 | 奈及利亞鄉村學校 AI 導入之公民參與治理框架，對應 T-BAS「參與AI校園治理部署與決策」。 |
| 83 | 10.5281/zenodo.21319936 | non_k12 | （未決） | exclude | C |  | 醫學院 AI 模擬病人紀錄之預測模型，AI 為分析方法，對應不到任何內涵。 |
| 84 | 10.1111/ijal.70320 | k12 | exclude | import | B | S-LRN:應用 | 中一學生在歷程寫作教學中使用 GenAI 聊天機器人，對應 S-LRN「應用AI工具強化領域學習」。 |
| 85 | 10.1111/bjet.70083 | k12 | （未決） | import | B | S-LRN:應用 | 六年級生使用結合 GenAI 與情感運算之情緒代理，對應 S-LRN「應用AI工具強化領域學習」與「AI轉化自我、共同與社會調節」。 |
| 86 | 10.48550/arxiv.2608.09289 | k12 | exclude | exclude | C |  | 以 LLM 校正管線診斷國中生英文寫作，AI 為分析後端，對應不到任何內涵。 |
| 87 | 10.1177/07356331261479569 | teacher_ed | （未決） | import | A | T-ETH:應用, T-TEA:理解 | 芬蘭職前教師對 GenAI 教學案例之教學與倫理推理，對應 T-ETH「探究AI問題責任歸屬」與 T-TEA「評估AI工具輔助教學的適用性」。 |
| 88 | 10.5281/zenodo.22108724 | k12 | exclude | exclude | B | S-LRN | 五年級 GenAI 學習夥伴研究之前後測資料集，可對應 S-LRN，但屬資料集。 |
| 89 | 10.1016/j.compedu.2026.105755 | unclear | （未決） | exclude | C |  | Computers & Education 五十年主題模型與 AI 出現比例之書目計量，對應不到任何內涵。 |
| 90 | 10.1016/j.compedu.2026.105756 | unclear | （未決） | exclude | C |  | 五十年科學與數學科技輔助教育研究之主題模型回顧，對應不到任何內涵。 |
| 91 | 10.1080/09500693.2026.2727692 | unclear | （未決） | exclude | B | T-TEA, S-LRN | 科學教育 GenAI 專刊導言，可對應 T-TEA「分析AI工具輔助教學的有效性」，但為社論。 |
| 92 | 10.1002/jcal.70331 | k12 | （未決） | exclude | C |  | 以機器學習預測中學生寫作表現，屬學習分析，對應不到任何內涵。 |
| 93 | 10.1016/j.caeo.2026.100422 | k12 | pending | import | A | T-PD:理解, T-TEA, S-LRN | 國際專家對 2030 AI 教育情境與職前師培之意涵，對應 T-PD「理解AI時代教師專業自主與責任」與 T-TEA「設計AI與教學法整合的策略」。 |
| 94 | 10.3389/feduc.2026.1885959 | unclear | （未決） | pending | A | T-TEA:理解, T-ETH | 德國數學教師對 AI 教學信念量表（B-AIMT），對應 T-TEA「評估AI工具輔助教學的適用性」。 |
| 95 | 10.31234/osf.io/afuq2_v1 | k12 | pending | exclude | A | S-BAS:理解, T-BAS:理解 | 捷克中學生與教師 AI 素養測驗（TAIL），對應 S-BAS「理解AI運作原理與限制」與 T-BAS「培養AI的基礎知識」。 |
| 96 | 10.15388/infedu.2601.025 | k12 | import | import | A | S-BAS:應用, S-ETH:理解 | 6、9 年級學生運用 AI 概念進行倫理推理，對應 S-BAS「理解AI運作原理與限制」與 S-ETH「具備對AI的批判思考」。 |
| 97 | 10.33422/ejte.v8i3.1872 | k12 | import | import | A | T-TEA:理解, T-ETH:應用 | 瑞典中學教師在 GenAI 情境下的評量實踐與 TPACK，對應 T-TEA「反思與優化AI工具輔助教學的應用」與 T-ETH「健全校園AI使用規範」。 |
| 98 | 10.1145/3776591.3832522 | unclear | （未決） | exclude | C |  | 以視覺語言模型推論成人與兒童互動之情感，AI 為研究方法，對應不到任何內涵。 |
| 99 | 10.1080/10494820.2026.2744403 | k12 | pending | pending | unknown | T-TEA, S-LRN | 無摘要；題名為以自我決定論將 AI 整合入 K-12 學校教育之縱貫研究，未能確認對應內涵。 |

請求紀錄：共 198 次（明細見 step2-result.json `requests`）；DataCite DOI（arXiv、Zenodo、Dryad、Figshare）於 Crossref 回 404 屬預期；10.4324/9781003657590 Crossref 連線失敗一次（OpenAlex 已有摘要）。
