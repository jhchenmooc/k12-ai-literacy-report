# B1-1 組文獻搜尋紀錄（J20–J26）

- 起訖 UTC：2026-10-09T16:58:51Z – 2026-10-09T17:03:45Z
- 日期範圍：2025-01-01..2026-10-09
- 來源：OpenAlex（查詢與摘要判斷）、Crossref（書目）；未讀出版社頁

## 查詢字串

- q1：`("AI literacy" OR "artificial intelligence literacy" OR "AI education") AND ("K-12" OR school)`
- q2：`("generative AI" OR ChatGPT OR "large language model") AND ("K-12" OR school)`
- q3：`("AI literacy" OR "artificial intelligence literacy" OR "AI education") AND (pupils OR children OR elementary)`
- q4：`"artificial intelligence" AND ("K-12" OR school OR pupils)`
- q5：`("artificial intelligence" OR "generative AI" OR ChatGPT) AND (teacher OR teachers)`
- qt：`title.search:("AI" OR "artificial intelligence" OR ChatGPT OR generative) + has_abstract:false（僅缺摘要比例 >20% 的 J20、J21、J23、J24）`

## 結果表

| 來源 | 期刊 | has_abstract true/false | 查詢命中（去重） | 細讀摘要（有摘要） | 候選 | 待判 | 排除 |
|---|---|---|---|---|---|---|---|
| J20 | Teaching and Teacher Education | 377/361 | 55 | 15（4） | 1 | 9 | 7 |
| J21 | Journal of Teacher Education | 36/11 | 6 | 6（5） | 0 | 3 | 3 |
| J22 | Assessment in Education Principles Policy and Practice | 67/11 | 0 | 0（0） | 0 | 0 | 0 |
| J23 | Studies In Educational Evaluation | 95/111 | 9 | 2（0） | 0 | 0 | 2 |
| J24 | AI & Society | 544/666 | 441 | 20（2） | 1 | 10 | 6 |
| J25 | European Educational Research Journal | 129/2 | 1 | 1（1） | 0 | 1 | 0 |
| J26 | Learning Media and Technology | 116/4 | 12 | 9（9） | 1 | 3 | 5 |

各查詢 count 見 JSON `queries`；所有查詢 HTTP 200，無失敗。

## 候選清單

| DOI | 來源 | 題名 | 卷期年 | 學段（摘要） | 類別 | 已知重複 | 理由 |
|---|---|---|---|---|---|---|---|
| 10.1016/j.tate.2026.105517 | J20 | Teaching with and about GenAI: A video study of English and Norwegian lessons in secondary classrooms in Norway | 2026 | 中學（secondary schools，5 校 20 班） | K4 | 否 | 摘要明示中學課堂，GenAI 實踐同時指向學生的 AI 素養與負責任使用；國別僅見於題名（Norway），摘要未明寫國名故 countries 留空 |
| 10.1007/s00146-025-02425-4 | J24 | The phenomenon of deep nudes—a new threat to children and adults | 2026 | 小學與中學學生（primary and secondary school students） | K5 | 否 | 摘要明示捷克中小學生大規模問卷，屬 K-12 生成式 AI 風險；含盛行率與性別勝算比等量化數字，高風險，待 G2–G4 |
| 10.1080/17439884.2026.2698577 | J26 | AI in rural classrooms: digital discretion, teacher agency, and student engagement in Vermont high schools | 2026 | 高中（two rural high schools） | K5 | 否 | 摘要明示 Vermont 兩所鄉村高中（國別由州名推得 US，需人工確認是否接受），討論 GenAI 委派界線、AI 素養與學術誠信框架之不足，屬 K-12 GenAI 治理 |

## 待判清單

| DOI | 來源 | 題名 | 卷期年 | 學段（摘要） | 類別 | 已知重複 | 理由 |
|---|---|---|---|---|---|---|---|
| 10.1016/j.tate.2026.105707 | J20 | Mapping in-service teacher AI literacy: A systematic review of empirical studies | 2026 | unknown | K4 | 是 | OpenAlex 無摘要；題名為在職教師 AI 素養，學段未能由摘要確認 |
| 10.1016/j.tate.2025.105286 | J20 | ChatGPT in school mathematics education: A systematic review of opportunities, challenges, and pedagogical implications | 2026 | unknown（題名：school mathematics） | K4 | 否 | OpenAlex 無摘要；學段僅見題名，主題可能偏 ChatGPT 作為學習／教學工具（若是則應排除） |
| 10.1016/j.tate.2025.105375 | J20 | From surface to substance: Experiential learning to promote understanding of ChatGPT for K-12 lesson planning | 2026 | unknown（題名：K-12 lesson planning） | K4 | 否 | OpenAlex 無摘要；對象可能為師資生、主題可能為工具使用，待讀摘要 |
| 10.1016/j.tate.2026.105746 | J20 | Beyond adoption: Teachers’ pedagogical reasoning about generative artificial intelligence in schooling | 2026 | 初中（middle-school teachers） | K5 | 否 | 摘要明示 24 位 middle-school 教師；主題介於 GenAI 教學採用與課堂層級 GenAI 限制／治理之間，是否屬入選主題需管理者判斷 |
| 10.1016/j.tate.2025.105270 | J20 | Teachers’ AI-TPACK as a tangible outcome in the digital transformation of education: A machine learning-based multilevel approach | 2026 | unknown | K4 | 否 | OpenAlex 無摘要；AI-TPACK 可能是用 AI 教學而非教 AI，學段未明 |
| 10.1016/j.tate.2026.105435 | J20 | Anticipating AI panacea? Teacher imaginaries of AI digital textbooks in South Korea | 2026 | unknown | K5 | 否 | OpenAlex 無摘要；AIDT 為國家層級學校 AI 政策，學段與主題待讀摘要 |
| 10.1016/j.tate.2025.105032 | J20 | Unveiling teacher identity development: A case study of AI curriculum implementation in a rural middle school computer science class | 2025 | unknown（題名：rural middle school） | K4 | 否 | OpenAlex 無摘要；題名顯示初中 AI 課程實施（教關於 AI），學段僅見題名 |
| 10.1016/j.tate.2026.105739 | J20 | Empowering teachers for artificial intelligence integration in gifted education: Evidence from a professional development program | 2026 | unknown | K4 | 是 | OpenAlex 無摘要；可能為 AI 工具整合而非 AI 素養，學段未明 |
| 10.1016/j.tate.2026.105433 | J20 | Predicting in-service teachers’ AI readiness from emotions in teaching and mindsets about teaching ability: Testing the direct and moderating effects | 2026 | unknown | K4 | 否 | OpenAlex 無摘要；學段與「AI 準備度」內涵未明 |
| 10.1177/00224871251325073 | J21 | Uncovering the Hidden Curriculum in Generative AI: A Reflective Technology Audit for Teacher Educators | 2025 | unknown | K5 | 否 | 摘要未明示 K-12 學段（僅提「inner-city school」作為實驗描述）；主題為 GenAI 評分偏誤風險，接近工具使用 |
| 10.1177/00224871251325083 | J21 | AI Literacy in Teacher Education: Empowering Educators Through Critical Co-Discovery | 2025 | unknown（educators；線上 AIEd 課程） | K4 | 否 | 摘要談教育工作者 AI 素養，但未明示為中小學在職教師 |
| 10.1177/00224871251325058 | J21 | Social-Emotional Learning and Generative AI: A Critical Literature Review and Framework for Teacher Education | 2025 | unknown（pre-service 與 in-service teachers） | K4 | 否 | 摘要提及職前與在職教師，但未明示中小學；主題含 GenAI 風險（偏誤、隱私） |
| 10.1007/s00146-025-02749-1 | J24 | Moral grounding before algorithms: a cross-cultural critique of AI education in schools | 2026 | unknown（題名：schools） | K2 | 否 | OpenAlex 無摘要；題名為學校 AI 教育，學段僅見題名 |
| 10.1007/s00146-025-02570-w | J24 | Shaping the future of education: school principals’ views on AI, big data and robot teachers | 2026 | unknown（題名：school principals） | K5 | 否 | OpenAlex 無摘要；學段與主題（治理或工具）待讀摘要 |
| 10.1007/s00146-025-02609-y | J24 | Where are the children? The missing piece of AI ethics | 2026 | unknown | K5 | 否 | OpenAlex 無摘要，短評（2 頁）；是否涉 K-12 教育未明，低優先 |
| 10.1007/s00146-025-02606-1 | J24 | Curiosity killed? Blame schools, not AI | 2026 | unknown | K2 | 否 | OpenAlex 無摘要，短評（3 頁）；低優先 |
| 10.1007/s00146-026-03227-y | J24 | Epistemia in the classroom: the problem of evidence of understanding in education in the age of generative AI | 2026 | unknown | K3 | 否 | OpenAlex 無摘要；學段未明，低優先 |
| 10.1007/s00146-025-02266-1 | J24 | AI in education: A shortcut or a roadblock to foundational knowledge? | 2025 | unknown | K2 | 否 | OpenAlex 無摘要，短評（2 頁）；學段未明，低優先 |
| 10.1007/s00146-025-02458-9 | J24 | Not just a plus: rethinking the “AI + Education” illusion | 2026 | unknown | K1 | 否 | OpenAlex 無摘要，短評（2 頁）；可能涉教育政策，學段未明，低優先 |
| 10.1007/s00146-026-02961-7 | J24 | Hard to find, harder to understand: examining transparency in educational generative AI | 2026 | unknown（teachers） | K5 | 否 | 摘要只說 GenAI tools for teachers，未明示中小學；主題屬 GenAI 工具治理／透明度 |
| 10.1007/s00146-026-03216-1 | J24 | Reflections on the Always-Answering Classroom: AI, Uncertainty, and Pedagogical Silence | 2026 | unknown | K2 | 否 | OpenAlex 無摘要；學段未明，低優先 |
| 10.1007/s00146-025-02530-4 | J24 | When knowing becomes compliance: reframing AI literacy in a measured world | 2026 | unknown | K3 | 否 | OpenAlex 無摘要；AI 素養主題但學段未明，低優先 |
| 10.1177/14749041261473066 | J25 | Turning schools into AI testing grounds and sites of extraction: The strategic selectivities of IOs AI literacy frameworks | 2026 | unknown（題名：schools；摘要僅提 students、classrooms、national education systems） | K1 | 是 | 高相關：國際組織 AI 素養政策框架；但摘要未明寫 K-12／中小學，學段僅見題名，依規則待判 |
| 10.1080/17439884.2025.2517335 | J26 | Using ethical scenarios to explore the future of artificial intelligence in primary and secondary education | 2026 | unknown（題名：primary and secondary education；摘要僅提 schools） | K5 | 否 | 學段主要見題名；主題為 AIED（非僅 GenAI）倫理情境，是否屬 K-12 AI 治理需判斷 |
| 10.1080/17439884.2026.2717578 | J26 | Structured participation pathways in AI-driven education governance: the case of South Korea’s AI digital textbook initiative | 2026 | unknown | K1 | 否 | 摘要談國家 AI 教育改革治理與教師專業發展，但未明寫中小學學段 |
| 10.1080/17439884.2024.2438933 | J26 | Conflicting motives: challenges of generative AI in education | 2025 | unknown（school development activity；students、teachers、principals） | K5 | 否 | 摘要提及學校發展活動與校長，屬 GenAI 治理；但未明示中小學學段 |

## 排除（細讀或明顯相關者）

- 10.1016/j.tate.2026.105698（J20）Investigating the barriers affecting in-service teachers’ continued use of generative AI for teaching innovation: Evidence from SEM and qualitative insights：GenAI 作為教學工具的採用意向，非 AI 素養／教 AI
- 10.1016/j.tate.2025.105157（J20）A case study of teachers’ generative artificial intelligence integration processes and factors influencing them：GenAI 作為教學工具整合，非 AI 素養／教 AI
- 10.1016/j.tate.2026.105501（J20）How teacher feedback literacy changed by using Generative Artificial Intelligence (GenAI) feedback as exemplars: Case studies of English as a foreign language school teachers in China：無摘要；題名顯示 GenAI 作為回饋工具
- 10.1016/j.tate.2026.105735（J20）Tools as well-being? AI teaching applications and teacher work stress: Evidence from TALIS 2024：無摘要；題名顯示 AI 作為教學工具與壓力
- 10.1016/j.tate.2025.105253（J20）Teachers’ perceptions of value-sensitive AI in education: A case study of AI tutor：無摘要；題名顯示 AI 家教工具
- 10.1016/j.tate.2026.105582（J20）A scientometric analysis and systematic review of artificial intelligence for pre-service teachers from 2011 to 2025：題名明示師資生，未見教中小學 AI 素養
- 10.1016/j.tate.2026.105802（J20）AI knowledge, AI reliance, and attitudes toward AI use in academic work: A cross-sectional study of preservice English teachers：題名明示師資生與學術工作用 AI
- 10.1177/00224871251324713（J21）Teacher Education in the Age of Generative Artificial Intelligence: Introducing the Special Issue：特刊導言／社論，無摘要；非研究文章
- 10.1177/00224871251325079（J21）“Let’s Ask the Robot!”: Epistemic Stance Between Teacher Candidates Toward AI in Mathematics Lesson Planning：師資生、ChatGPT 作為備課工具
- 10.1177/00224871251325109（J21）Designing GenAI Tools for Personalized Learning Implementation: Theoretical Analysis and Prototype of a Multi-Agent System：師資生專業學習工具，未談教中小學 AI 素養
- 10.1016/j.stueduc.2026.101656（J23）Artificial intelligence for online and hybrid teaching, learning, and assessment: Systematic review：無摘要；題名顯示 AI 作為教學評量工具
- 10.1016/j.stueduc.2026.101651（J23）Revisiting the effects of artificial intelligence in education: A meta-analysis of academic achievement and student motivation：無摘要；題名顯示 AI 工具成效（高風險，待 G2–G4），非 AI 素養
- 10.1007/s00146-026-03306-0（J24）Investigating human-AI partnership in early childhood STEM teaching: evidence from Vietnamese preschool teachers：無摘要；題名為學前且 AI 作為教學夥伴，不在 K-12 範圍
- 10.1007/s00146-026-03206-3（J24）Perceived and actual AI literacy in military organizations: a self-efficacy framework for training design：非教育學段（軍事組織成人）
- 10.1007/s00146-026-03187-3（J24）Negotiating creator identity: agency and ethical awareness in AI-assisted art education：無摘要；學段未明且偏 AI 作為創作工具
- 10.1007/s00146-025-02194-0（J24）Building trustworthy AI solutions: integrating artificial intelligence literacy into records management and archival systems：非 K-12（紀錄管理專業領域）
- 10.1007/s00146-025-02529-x（J24）Reconceptualizing AI literacy to address the risks of AI agents: a citizen science approach：無摘要；題名顯示一般公民／成人取向，可人工複核
- 10.1007/s00146-026-03130-6（J24）Who speaks for culture? Generative AI, epistemic authority, and narrative negotiation in an intercultural classroom：無摘要；學段未明且偏 GenAI 作為課堂工具，可人工複核
- 10.1080/17439884.2025.2537959（J26）When the prompting stops: exploring teachers’ work around the educational frailties of generative AI tools：GenAI 作為行政／教學工具，非 AI 素養；學段亦未明寫中小學
- 10.1080/17439884.2025.2550502（J26）Defining ‘the Force’ of artificial intelligence in education: exploring the future of teaching through informed speculation：AI 作為未來教學工具的想像，非學習關於 AI 或 GenAI 治理
- 10.1080/17439884.2026.2688826（J26）‘Whack the prompt in there and see what it says’: making sense of Communicative AI in education：非 K-12（國際學生語言學校），ChatGPT 為學習工具
- 10.1080/17439884.2024.2447946（J26）Of teachers and centaurs: Exploring the interactions and intra-actions of educators on AI education platforms：理論文章，AI 平台作為教學工具，無學段
- 10.1080/17439884.2025.2452199（J26）Generative AI and the (Re)turn to Luddism：歷史／概念論述，未明示 K-12 AI 素養或治理對象

## 限制

- OpenAlex 缺摘要比例高：J20 361/738、J23 111/206、J24 666/1210、J21 11/47（2025-01-01..2026-10-09）；布林查詢對這些作品只比對題名，已加 qt 題名查詢（has_abstract:false）補查，但題名未含 AI 詞者仍會漏。
- 細讀時多數 Elsevier（J20、J23）與 Springer（J24）作品在 OpenAlex 無 abstract_inverted_index（逐篇查詢確認），故大量項目只能依題名列為 pending；依規定未讀出版社頁。
- J24 qt 題名查詢 count=433，分 3 頁全讀（200+200+33）；因 AI & Society 幾乎全刊皆 AI 主題，先以教育／學段／素養關鍵詞程式過濾題名，再人工初篩，題名未含此類詞的教育相關論文可能漏看。
- J22（Assessment in Education）q1–q5 全為 0 命中，且缺摘要比例低（11/78），未加 qt；學段詞以 "K-12" OR school 為主，未逐一列 primary/secondary 等同義詞（受 ≤5 運算子限制，以 q3 pupils/children/elementary 補），可能漏查。
- Research Desk verify_bibtex 在本 session 不可用（工具清單無此 MCP），改依指南 3.5 替代法手動比對 Crossref 與 OpenAlex 題名，全部一致；未比對作者與年份。OpenAlex 與 Crossref 非獨立來源。
- first_public_date 一律 unknown；crossref_online 只記錄 published-online，Elsevier DOI 無此欄。crossref_issue_year 以 published-print／journal-issue 年為準，online-first 無卷期者取 issued 年並於 crossref_issue 註明。
- 10.1080/17439884.2026.2698577 的 countries=US 是由摘要明寫的州名 Vermont 推得，非摘要直接寫國名，請管理者確認。10.1016/j.tate.2026.105517 國別僅見於題名（Norway），依規定未記。
- J26 有兩篇 DOI 為 2024 字首（2024.2438933、2024.2447946），OpenAlex publication_date 在 2025 範圍內故列入。
- 已知 DOI 重複：10.1016/j.tate.2026.105707、10.1016/j.tate.2026.105739、10.1177/14749041261473066。
