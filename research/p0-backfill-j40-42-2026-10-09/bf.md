# J40–J42 擴充期刊補搜（2025-01-01 至 2026-10-09）

- 開始：2026-10-09T19:39:04Z；結束：2026-10-09T19:48:37Z
- 方法：OpenAlex 每刊 q1–q3 布林查詢＋全刊題名掃描補查；逐篇讀 OpenAlex 摘要判斷；非排除項以 Crossref 取正式題名與 issued 年；知識庫 DOI 去重。

## 每刊結果

| 刊 | OpenAlex ID | 範圍內總數 | 缺摘要 | q1 | q2 | q3 | 查詢去重命中 | 題名掃描補讀 | 篩選總數 | candidate | teacher_ed_fit | pending | exclude | 知識庫重複 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| J40 Interactive Learning Environments | S90466346 | 670 | 34 | 14 | 7 | 17 | 31 | 59 | 90 | 14 | 5 | 24 | 47 | 0 |
| J41 Computers and Education Open | S4210232537 | 181 | 3 | 4 | 3 | 9 | 12 | 24 | 36 | 6 | 12 | 8 | 10 | 0 |
| J42 Informatics in Education | S2764653341 | 41 | 0 | 5 | 1 | 5 | 6 | 10 | 16 | 6 | 2 | 1 | 7 | 1 |
| 合計 | | 892 | 37 | | | | 49 | 93 | 142 | 26 | 19 | 33 | 64 | 1 |

## 候選（candidate）

| 刊 | DOI | 題名（Crossref） | 年 | 學段 | 類別 | 國別 | 高風險 | 理由 |
|---|---|---|---|---|---|---|---|---|
| J40 | 10.1080/10494820.2025.2450658 | Towards a model for primary students’ behavioral intention to learn AI: programming ability, AI literacy and ethics as three fundamental pillars | 2025 | 小學生（"primary school students"，平均 12.69 歲） | K2 |  |  | 摘要明示 439 名小學生，主題為學習 AI 的意圖與 AI 素養 |
| J40 | 10.1080/10494820.2025.2482586 | Unveiling AI literacy in K-12 education: a systematic literature review of empirical research | 2025 | K-12（"K-12 education"，多為中學） | K2 |  |  | 摘要明示 K-12，回顧 22 篇 AI 素養實證研究，含評量與教師 AI 素養議題 |
| J40 | 10.1080/10494820.2025.2487538 | Defining, enhancing, and assessing artificial intelligence literacy and competency in K-12 education from a systematic review | 2025 | K-12（"K-12 education"、schools） | K2 |  |  | 摘要明示 K-12 教育，回顧 AI 素養／能力的定義、教學設計與評量方式 |
| J40 | 10.1080/10494820.2025.2575016 | Exploring the influential factors and key dimensions of AI information literacy among high school students: a social-ecological perspective | 2025 | 高中生（"high school students"） | K2 |  |  | 摘要明示 1,132 名高中生，主題為 AI 素養 |
| J40 | 10.1080/10494820.2025.2591858 | Friend, tool, or threat? High school students’ and teachers’ perspectives on AI in learning | 2025 | 高中生與教師（"high school students and teachers"） | K5 | IN |  | 摘要明示高中，含 AI 風險（抄襲、過度依賴、評量真實性）與 AI 素養／政策建議；主題介於採用研究與風險治理之間，請人工確認 |
| J40 | 10.1080/10494820.2025.2606836 | Navigating GenAI: A participatory narrative inquiry into a teenager's experiences with ChatGPT in informal learning environments | 2025 | 高一（"10th-grade"、"high schooler"） | K2 |  |  | 摘要明示 10 年級學生，敘事探究其 GenAI 使用與 AI 素養、學校 AI 政策；單一個案 |
| J40 | 10.1080/10494820.2026.2649553 | AI literacy for K–12 education: an international Delphi study | 2026 | K-12（"K–12 education"） | K2 |  |  | 摘要明示 K-12，國際專家德懷術就 K-12 AI 素養要素取得共識 |
| J40 | 10.1080/10494820.2026.2658209 | How organizational support enhances teachers’ AI literacy: the chain mediating effects of innovation capability and technology acceptance | 2026 | 在職中小學教師（"primary and secondary school teachers"） | K4 | CN | 高風險，待 G2–G4 | 摘要明示上海中小學教師 10,683 人；報告直接／間接效果比例，高風險，待 G2–G4 |
| J40 | 10.1080/10494820.2026.2667458 | Playfulness and social–emotional support as predictors of elementary students’ AI self-efficacy | 2026 | 小學三、四年級（"Grades 3 and 4"） | K6 |  |  | 摘要明示小學 3–4 年級 AI 學習方案；以 PLS-SEM 報告關聯，非前後測成效 |
| J40 | 10.1080/10494820.2026.2668027 | Turkish adaptation of the artificial intelligence literacy and generative artificial intelligence competency scales | 2026 | 在職小學與幼兒園教師（"primary school and preschool teachers"） | K3 |  |  | 摘要明示 451 名小學與幼兒園教師，屬 K-12 在職教師；量表跨文化調適。摘要只寫 Turkish context，未寫國名，故 countries 留空 |
| J40 | 10.1080/10494820.2026.2672559 | An AI-enhanced computational thinking program: effects on children’s computational thinking, self-regulation, and representations of AI robots | 2026 | 幼兒園 6–7 歲（"kindergartens aged 6–7 years"） | K6 | CN | 高風險，待 G2–G4 | 摘要明示幼兒園 6–7 歲並述及 K-12 AI 教育；單組前後測、報告效果量，高風險，待 G2–G4。城市名不記 |
| J40 | 10.1080/10494820.2026.2677729 | English language teachers’ acceptance of artificial intelligence predicted by AI literacy and intelligent TPACK within an extended TAM framework | 2026 | 在職 K-12 英語教師（"in-service K–12 English language teachers"） | K4 | ET |  | 摘要明示 K-12 在職英語教師，AI 素養為主要預測變項 |
| J40 | 10.1080/10494820.2026.2692615 | How matters more than whether: generative AI role paradigms and learning in K–12 education | 2026 | 八年級（"Grade 8 students"） | K5 | CN | 高風險，待 G2–G4 | 摘要明示 8 年級，比較 GenAI 使用範式並測量學術不端等風險指標；準實驗，高風險，待 G2–G4；主題兼具工具使用，請人工確認 |
| J40 | 10.1080/10494820.2026.2734311 | Integrating artificial intelligence in early childhood education: a systematic review of empirical studies | 2026 | 幼兒教育（"early childhood education"、"preschool settings"） | K2 |  | 高風險，待 G2–G4 | 幼兒園屬 K-12 範圍；回顧指出 AI 主要用於支持 AI 素養與運算思維，並彙整介入成效，高風險，待 G2–G4 |
| J41 | 10.1016/j.caeo.2025.100251 | Artificial intelligence in Ethiopian school curriculum: Educators' practices, challenges, and recommendations | 2025 | 中學（"Ethiopian secondary schools"）、ICT 教師 | K1 | ET |  | 摘要明示衣索比亞中學 ICT 課綱 AI 內容與 10 位 ICT 教師教 AI 的方法與困難 |
| J41 | 10.1016/j.caeo.2025.100321 | Unpacking ethics-domain of intelligent-TPACK scale in relation to in-service teachers’ trust and distrust | 2026 | 跨 K-12 在職教師（"in-service teachers teaching across K-12 levels"） | K4 |  |  | 摘要明示 K-12 在職教師，修讀 AI 技術與倫理模組 |
| J41 | 10.1016/j.caeo.2026.100371 | Beyond operational skills: Teachers’ AI knowledge and interactions with generative AI in lesson planning | 2026 | K-12 教師（"K–12 teachers"） | K4 |  |  | 摘要明示 K-12 教師，主題為教師 AI 素養／知識的實踐 |
| J41 | 10.1016/j.caeo.2026.100376 | Science educators’ AI literacy and AI usage in teaching: Implications for post-qualification programs | 2026 | 中學在職科學教師（"in-service science educators in secondary education"） | K4 | DE,CH |  | 摘要明示中學在職科學教師 |
| J41 | 10.1016/j.caeo.2026.100401 | Levels of AI awareness and pedagogical skills among Nigerian teachers: The differentials of gender and teachers’ experience | 2026 | 中學教師（"secondary school teachers"） | K4 | NG | 高風險，待 G2–G4 | 摘要明示奈及利亞中學教師 2,586 人；報告效果量（d、η²），高風險，待 G2–G4 |
| J41 | 10.1016/j.caeo.2026.100423 | Ethical principles of AI in education: Exploring teachers’ contextual ethical reasoning through an STS lens | 2026 | 中學在職 STEAM 教師（"in-service secondary school STEAM teachers"） | K4 |  |  | 摘要明示中學在職教師；主題為教師 AI 倫理素養 |
| J42 | 10.15388/infedu.2025.00 | Editorial: From Policy to Pedagogy – Building Human-Centered AI Literacy Across Educational Contexts | 2025 | 中小學（"elementary and secondary schools"） | K1 |  |  | 社論；摘要明示中小學 AI 素養政策框架，對齊 UNESCO 學生與教師 AI 能力框架 |
| J42 | 10.15388/infedu.2025.26 | Constructing AI Literacy: A Hands-On Approach for School Children | 2025 | 學齡兒童、K-12（"school-aged children"、"K-12 curricula"） | K4 |  |  | 摘要明示學齡兒童與 K-12 課程，區分小學與中學策略 |
| J42 | 10.15388/infedu.2025.29 | Ethical Thinking: Integration and Measurement in an AI Curriculum for Middle-High School Students | 2025 | K-12（摘要 "K-12 education"；題名 middle-high school） | K4 |  |  | 摘要述 K-12 與 RAICA 課程學生、教師；學段原話以題名較明確 |
| J42 | 10.15388/infedu.2601.025（知識庫已收錄） | Understanding AI Mechanisms Supports Disciplinary Reasoning and Ethical Judgment in K–12 AI Literacy Education | 2026 | K-12 六、九年級（"K–12 students in grades 6 and 9"） | K2 |  |  | 摘要明示 6、9 年級；知識庫已收錄 |
| J42 | 10.15388/infedu.2605.036 | Can Teacher AI Literacy Reach Those Who Need It Most? Professional Learning, Realised Access, and Cumulative Advantage in TALIS 2024 | 2026 | 國中教師（"lower-secondary teachers"，TALIS 2024） | K4 |  |  | 摘要明示 55 個教育系統之國中教師；多層次模型關聯分析 |
| J42 | 10.15388/infedu.2606.033 | Pedagogical Noise in GenAI-Supported Algorithmisation: Scaffolding and Substitution in Upper-Secondary Informatics | 2026 | 高中（"upper-secondary"） | K5 |  |  | 概念論文；主題為 K-12 GenAI 風險，兼具工具使用面向，請人工確認 |

## 師培（teacher_ed_fit）

| 刊 | DOI | 題名（Crossref） | 年 | 學段 | 類別 | 國別 | 高風險 | 理由 |
|---|---|---|---|---|---|---|---|---|
| J40 | 10.1080/10494820.2026.2631728 | Interaction-Rich instructional design in AI-Supported teacher education: Learning processes and educational implications for instructional readiness | 2026 | 職前教師（"pre-service teachers"） | K4 |  | 高風險，待 G2–G4 | 報告 AI 倫理素養等「顯著增長」，高風險，待 G2–G4 |
| J40 | 10.1080/10494820.2026.2642871 | Cultivating pre-service teachers’ design thinking and generative artificial intelligence literacy through an LLM-based educational website design task | 2026 | 職前教師（"pre-service teachers"） | K4 |  | 高風險，待 G2–G4 | 準實驗，高風險，待 G2–G4 |
| J40 | 10.1080/10494820.2026.2690473 | Exploring pre-service teachers’ AI ethics and application strategies in a generative AI-supported knowledge-building community | 2026 | 職前教師（"pre-service teachers"） | K4 |  |  | 職前教師 AI 倫理學習 |
| J40 | 10.1080/10494820.2026.2691906 | Preparing preservice teachers for generative AI: the role of conceptual instruction in shaping epistemic beliefs and self-regulated learning | 2026 | 職前教師（"preservice teachers"） | K4 | IN | 高風險，待 G2–G4 | 前後測準實驗，高風險，待 G2–G4 |
| J40 | 10.1080/10494820.2026.2715568 | Cultivating preservice teachers’ GenAI competencies in a grammar methodology course | 2026 | 職前語言教師（"preservice language teachers"） | K4 | TR |  | 職前教師 |
| J41 | 10.1016/j.caeo.2025.100291 | Rethinking artificial-intelligence literacy through the lens of teacher educators: The adaptive AI model | 2025 | 高教師培者（"higher-education teacher educators"） | K3 |  |  | 由師培者共同建構教師 AI 素養模型 |
| J41 | 10.1016/j.caeo.2025.100305 | Relationship between pre-service teachers’ perceived competencies, affective dispositions, and readiness to use artificial intelligence: A study informed by the intelligent-TPACK | 2025 | 職前教師（"pre-service teachers"） | K4 | US |  | 摘要寫 southeastern U.S. university |
| J41 | 10.1016/j.caeo.2025.100306 | Intelligent‑TPACK in practice: design and evidence from a three‑week teacher preparation module | 2025 | 職前教師（"preservice teachers"） | K4 |  | 高風險，待 G2–G4 | 職前教師三週模組；前後測、效果量，高風險，待 G2–G4 |
| J41 | 10.1016/j.caeo.2025.100307 | Intelligent-TPACK in teacher education: Examining preservice elementary teachers’ emerging views about AI classroom use | 2025 | 職前小學教師（"preservice elementary teachers"） | K4 |  |  | 職前教師 |
| J41 | 10.1016/j.caeo.2025.100314 | Fostering Intelligent-TPACK through AI-assistance: A multi-method study in pre-service teacher education | 2025 | 職前教師（商業教育碩士層級） | K4 |  |  | 摘要只寫 Swiss，未寫國名 |
| J41 | 10.1016/j.caeo.2025.100317 | Understanding pre-service teachers’ needs for integrating AI-based tools in instruction through intelligent TPACK framework | 2025 | 職前教師（"pre-service teachers"） | K4 |  |  | 職前教師 |
| J41 | 10.1016/j.caeo.2025.100320 | Conceptualizing pre-service teachers' readiness for AI integration into teaching practices: An intelligent-TPACK approach | 2026 | 職前教師（"pre-service teachers"） | K3 |  |  | 拉丁美洲職前教師；區域名不記國別 |
| J41 | 10.1016/j.caeo.2026.100366 | Coding, robots, computational concepts, and machine learning using the microbit card and the Maqueen and Nezha kits. A study in initial teacher training | 2026 | 小學教育學系師培生（"Primary Education degree"） | K4 |  | 高風險，待 G2–G4 | 含機器學習學習；準實驗，高風險，待 G2–G4；摘要只寫 Spanish universities |
| J41 | 10.1016/j.caeo.2026.100367 | Teaching the teachers: A systematic review of genAI-specific technological pedagogical knowledge (TPK) in teacher education | 2026 | 師培者（培育 post-primary 教師） | K4 |  |  | 師培者培育中學教師，主張師培納入 AI 素養 |
| J41 | 10.1016/j.caeo.2026.100375 | Assessing AI-TPACK readiness in mathematics teacher education: The role of self-efficacy and teaching beliefs | 2026 | 數學師培學生（"mathematics teacher education students"） | K3 |  |  | 摘要只寫 Chinese，未寫國名 |
| J41 | 10.1016/j.caeo.2026.100399 | Human-centered AI for teacher educators: Designing professional learning for critical AI literacy | 2026 | 師培者／職前教師（"teacher educators"、"preservice teachers"） | K4 |  |  | 對象為師培者，服務職前教師 |
| J41 | 10.1016/j.caeo.2026.100410 | AI training and science student teachers’ TPACK in campus-based and distance education: a comparative study | 2026 | 師培學生（B.Ed 科學） | K4 | ZA | 高風險，待 G2–G4 | 報告 AI 培訓與 TPACK 關聯（含負向差異），高風險，待 G2–G4 |
| J42 | 10.15388/infedu.2025.22 | Investigating Preservice STEM Teachers’ AI Literacy and Self-Efficacy Beliefs: Are They Ready for AI? | 2025 | 職前 STEM 教師（"preservice STEM teachers"） | K3 |  |  | 摘要只寫 Turkish，未寫國名 |
| J42 | 10.15388/infedu.2506.023 | Measuring the Data Agency of Pre-Service Teachers: A Six-Factor Model | 2026 | 職前教師（"pre-service teachers"） | K3 |  |  | 摘要只寫 Finnish，未寫國名 |

## 待判（pending）

| 刊 | DOI | 題名（Crossref） | 年 | 學段 | 類別 | 國別 | 高風險 | 理由 |
|---|---|---|---|---|---|---|---|---|
| J40 | 10.1080/10494820.2025.2494914 | Responsible digital citizen: building AI ethics awareness across subjects | 2025 | 社論，可得文字未寫學段 | K4 |  |  | OpenAlex 僅有社論開頭段落 |
| J40 | 10.1080/10494820.2025.2514372 | AI literacy and competency: definitions, frameworks, development and future research directions | 2025 | 社論，可得文字未寫學段 | K2 |  |  | OpenAlex 僅有社論開頭段落，無法判定學段 |
| J40 | 10.1080/10494820.2025.2524838 | From policy to practice: a thematic analysis of generative AI technologies in China’s education sector | 2025 | 師生（未寫學段） | K5 | CN |  | 摘要未寫學段 |
| J40 | 10.1080/10494820.2025.2530630 | The impact of AI-based visual designs on students’ AI literacy and attitudes toward AI | 2025 | 學生（未寫學段） | K6 |  | 高風險，待 G2–G4 | 摘要未寫學段；前後測，高風險，待 G2–G4 |
| J40 | 10.1080/10494820.2025.2545053 | Developing intelligent-TPACK (I-TPACK) framework from unpacking AI literacy and competency: implementation strategies and future research direction | 2025 | 社論，可得文字未寫學段 | K4 |  |  | OpenAlex 僅有社論開頭段落 |
| J40 | 10.1080/10494820.2025.2556810 | Improving the quality of AI-supported K–12 teaching: the effects of teachers’ AI-TPACK and self-efficacy | 2025 | K-12 教師（"K–12 teachers"、"nine K–12 schools"） | K4 |  |  | 學段明確，但主題為以 AI 教學（工具整合）之能力，是否屬「教師教 AI 的能力」待人工判定 |
| J40 | 10.1080/10494820.2025.2589402 | Artificial intelligence teacher self-efficacy: a scale development and validation study | 2025 | 教師（未寫學段） | K3 |  |  | 摘要未寫學段 |
| J40 | 10.1080/10494820.2025.2591251 | AI integration in EFL teacher development: a mixed-methods evaluation of digital competency, professional trajectories, and pedagogical innovation within adaptive learning ecosystems | 2025 | EFL 教師（同時就讀研究所，未寫任教學段） | K4 |  | 高風險，待 G2–G4 | 摘要未寫任教學段，且偏 AI 作為教學工具；前後測隨機實驗，高風險，待 G2–G4 |
| J40 | 10.1080/10494820.2026.2614087 | Teachers’ digital intelligence learning competence (TDILC): a literature map from Chinese and global perspectives | 2026 | 教師（未寫學段） | K4 |  |  | 摘要未寫學段，主題偏數位能力 |
| J40 | 10.1080/10494820.2026.2615818 | Human-Centric Artificial Intelligence Pedagogy (HCAP) framework developed from TPACK through integration of artificial intelligence literacy and competency | 2026 | 教師（未寫學段） | K4 |  |  | 摘要未寫學段 |
| J40 | 10.1080/10494820.2026.2617482 | Generative artificial intelligence in education: development and validation of a scale for ethical awareness and responsibility | 2026 | 未寫對象 | K3 |  |  | 摘要未寫對象與學段 |
| J40 | 10.1080/10494820.2026.2648342 | Six global frameworks for human-centred AI literacy and competency: comparative analysis and a way forward | 2026 | 社論，可得文字未寫學段 | K1 |  |  | OpenAlex 僅有社論開頭段落；可能涉 UNESCO 學生框架，待讀全文 |
| J40 | 10.1080/10494820.2026.2649550 | Enhancing AI-TPACK and digital pedagogical competence of Turkish language teachers: a longitudinal mixed-methods study | 2026 | 土耳其語教師（未寫學段） | K4 | TR | 高風險，待 G2–G4 | 摘要未寫任教學段；單組前後測，高風險，待 G2–G4 |
| J40 | 10.1080/10494820.2026.2662024 | From awareness to transformation: tracing teacher growth in AI-supported interactive learning | 2026 | 教師（未寫學段） | K4 |  | 高風險，待 G2–G4 | 摘要未寫學段；潛在成長模型報告 AI 素養軌跡，高風險，待 G2–G4 |
| J40 | 10.1080/10494820.2026.2662351 | Student and teacher well-being for the AI Era from a balanced integration framework | 2026 | 無摘要（社論） | K5 |  |  | OpenAlex 無摘要，學段不明 |
| J40 | 10.1080/10494820.2026.2662456 | The relationship between technical support and teachers’ artificial intelligence self-efficacy: a psychological need mediation model grounded in self-determination theory | 2026 | 在職 K-12 教師（"in-service K–12 teachers"） | K4 |  |  | 學段明確，但主題為教師採用 AI 的自我效能，是否屬「教師教 AI 的能力」待人工判定；摘要只寫 Chinese，未寫國名 |
| J40 | 10.1080/10494820.2026.2668793 | Assessing teachers’ AI literacy: a systematic review of measurement tools | 2026 | 無摘要（題名：teachers） | K3 |  |  | OpenAlex 無摘要，無法判定學段；依規定未讀出版社頁 |
| J40 | 10.1080/10494820.2026.2689532 | Designing pedagogical AI agents as digital twins of teachers: insights from a multi-cohort training program | 2026 | 多學段教師（"multiple educational levels"） | K4 |  |  | 混合學段，未寫主要對象（unclear）；台灣為地區名，依規定不記國別 |
| J40 | 10.1080/10494820.2026.2690104 | A cultural-historical activity theory-anchored learning analytics pipeline for Early detection and social-epistemic integration in AI literacy education | 2026 | 無摘要 | K3 |  |  | OpenAlex 無摘要，學段不明 |
| J40 | 10.1080/10494820.2026.2700637 | Generative AI-supported intercultural learning: a mixed-methods study of intercultural communicative competence and multimodal GAI literacy | 2026 | 學生（未寫學段） | K6 | CN,KZ | 高風險，待 G2–G4 | 摘要未寫學段；前後測，高風險，待 G2–G4；Northern Cyprus 未記碼 |
| J40 | 10.1080/10494820.2026.2710463 | AI governance and ethics in education: research gaps, future directions, and methodological approaches | 2026 | 無摘要 | K5 |  |  | OpenAlex 無摘要，學段不明 |
| J40 | 10.1080/10494820.2026.2735911 | Exploring how generative AI image creation enhances secondary students’ AI competencies and learning efficacy in interactive learning environments | 2026 | 無摘要（題名：secondary students） | K6 |  |  | OpenAlex 無摘要；題名示中學生與 AI 能力，可能為候選，待讀摘要 |
| J40 | 10.1080/10494820.2026.2744403 | Integrating artificial intelligence into K-12 school education through self-determination theory from a longitudinal study: opportunities, challenges, and future direction | 2026 | 無摘要（題名：K-12 school education） | K2 |  |  | OpenAlex 無摘要；題名示 K-12，主題是否為 AI 素養待讀摘要 |
| J40 | 10.1080/10494820.2026.2744895 | AI literacy and self-regulated learning: variable- and person-centred evidence from pre-service English language teachers | 2026 | 無摘要（題名：pre-service English language teachers） | K4 |  |  | OpenAlex 無摘要；題名示職前教師，可能為 teacher_ed_fit，待讀摘要 |
| J41 | 10.1016/j.caeo.2025.100303 | Competencies for teaching with and about artificial intelligence in the natural sciences — DiKoLAN AI | 2025 | 教師（未寫學段） | K4 |  |  | 主題切合（teaching with and about AI），但摘要未寫學段 |
| J41 | 10.1016/j.caeo.2025.100318 | AI literacy, educational level, and parenting self-efficacy of children’s education among parents of primary school students | 2025 | 小學生家長（"parents of primary school students"） | K2 | HK |  | 學段明示（小學），但對象為家長，不在入選規則列舉之學生／教師內，待人工判定；HK 為特別行政區 ISO 碼，請確認是否記 |
| J41 | 10.1016/j.caeo.2025.100319 | Measuring Teachers' competencies for AI integration: Development and validation of the AI-TPACK in vocational education | 2025 | 職前與在職職業教育教師（未寫學段） | K3 | ID |  | 職業教育層級未寫（可能為中等或高等） |
| J41 | 10.1016/j.caeo.2026.100346 | Exploring AI perceptions in education: unveiling the role of student and teacher motivation and self-efficacy | 2026 | 小學與國中學生及教師（"primary and lower secondary school students"） | K2 | CH |  | 學段明確，但主題為對「學習中使用 AI」的知覺，介於 AI 素養（態度）與 AI 作為工具之間，待人工判定 |
| J41 | 10.1016/j.caeo.2026.100368 | Situated AI ethics: a cultural-historical and ecological framework for education | 2026 | 教師（未寫學段） | K1 | AU,FI,FR,IT,NZ,KR |  | 摘要未寫學段；國別另含 England（構成國，未轉碼） |
| J41 | 10.1016/j.caeo.2026.100370 | Beyond skepticism: Question marks surrounding AI and AIED policies in Africa | 2026 | 國家 AI／AIED 政策（未限學段） | K1 | BJ,GH,NG,KE,RW,TZ,EG,MU,ZA,ZM |  | 政策主題切合，但摘要未寫 K-12 學段 |
| J41 | 10.1016/j.caeo.2026.100409 | Exploring basic school leaders' AI readiness: The role of professional development | 2026 | 基礎學校校長（"basic school leaders"） | K4 | NG |  | basic school 未明示年級或年齡，依規定記 pending |
| J41 | 10.1016/j.caeo.2026.100422 | Navigating AI’s educational future: expert scenarios and implications for teaching and teacher preparation | 2026 | 跨小學、中學、技職、高教 | K4 |  |  | 混合學段未寫主要對象（unclear） |
| J42 | 10.15388/infedu.2025.27 | GenAI-Assisted Data Science Course to Promote GenAI Literacy for Non-Computing Students | 2025 | 非資訊科系學生（未寫學段） | K6 |  |  | 摘要未寫學段（研判可能為大學），依規定不推定 |

## 排除（exclude）摘要

排除 64 筆，原因分布：AI 僅作學習／教學工具或工具採用、高教／成人、未示 K-12 之社論、非 AI 主題。逐筆見 bf.json。

## 查詢紀錄

| id | HTTP | count | 讀取 | 開始 UTC | 查詢 |
|---|---|---|---|---|---|
| J40-total | 200 | 670 | 1 | 2026-10-09T19:39:04Z | 範圍內總數 |
| J40-abs_false | 200 | 34 | 1 | 2026-10-09T19:39:06Z | 範圍內 has_abstract:false 數 |
| J40-q1 | 200 | 14 | 14 | 2026-10-09T19:39:07Z | ("AI literacy" OR "artificial intelligence literacy" OR "AI education") AND ("K-12" OR school OR schools) |
| J40-q2 | 200 | 7 | 7 | 2026-10-09T19:39:10Z | ("generative AI" OR ChatGPT OR "large language model") AND ("K-12" OR "secondary school" OR "primary school") |
| J40-q3 | 200 | 17 | 17 | 2026-10-09T19:39:12Z | ("AI literacy" OR "AI education") AND (teacher OR teachers) |
| J41-total | 200 | 181 | 1 | 2026-10-09T19:39:14Z | 範圍內總數 |
| J41-abs_false | 200 | 3 | 1 | 2026-10-09T19:39:15Z | 範圍內 has_abstract:false 數 |
| J41-q1 | 200 | 4 | 4 | 2026-10-09T19:39:17Z | ("AI literacy" OR "artificial intelligence literacy" OR "AI education") AND ("K-12" OR school OR schools) |
| J41-q2 | 200 | 3 | 3 | 2026-10-09T19:39:19Z | ("generative AI" OR ChatGPT OR "large language model") AND ("K-12" OR "secondary school" OR "primary school") |
| J41-q3 | 200 | 9 | 9 | 2026-10-09T19:39:21Z | ("AI literacy" OR "AI education") AND (teacher OR teachers) |
| J42-total | 200 | 41 | 1 | 2026-10-09T19:39:23Z | 範圍內總數 |
| J42-abs_false | 200 | 0 | 0 | 2026-10-09T19:39:24Z | 範圍內 has_abstract:false 數 |
| J42-q1 | 200 | 5 | 5 | 2026-10-09T19:39:26Z | ("AI literacy" OR "artificial intelligence literacy" OR "AI education") AND ("K-12" OR school OR schools) |
| J42-q2 | 200 | 1 | 1 | 2026-10-09T19:39:28Z | ("generative AI" OR ChatGPT OR "large language model") AND ("K-12" OR "secondary school" OR "primary school") |
| J42-q3 | 200 | 5 | 5 | 2026-10-09T19:39:30Z | ("AI literacy" OR "AI education") AND (teacher OR teachers) |
| J40-qt-noabs-list | 200 | 34 | 34 | 2026-10-09T19:39:46Z | 範圍內全部缺摘要作品清單（逐題名人工篩） |
| J41-qt-noabs-list | 200 | 3 | 3 | 2026-10-09T19:39:47Z | 範圍內全部缺摘要作品清單（逐題名人工篩） |
| J40-title-scan | 200 | 670 | 670 | 2026-10-09T19:41:27Z | 範圍內全部作品題名（cursor 分頁），以 AI 詞程式過濾後再人工初篩 |
| J41-title-scan | 200 | 181 | 181 | 2026-10-09T19:41:29Z | 範圍內全部作品題名（cursor 分頁），以 AI 詞程式過濾後再人工初篩 |
| J42-title-scan | 200 | 41 | 41 | 2026-10-09T19:41:31Z | 範圍內全部作品題名（cursor 分頁），以 AI 詞程式過濾後再人工初篩 |

完整 URL 見 bf.json `queries[].query_url`（不含 key）。

## 限制

- OpenAlex 布林查詢（q1–q3）命中少（J40 共 14/7/17、J41 4/3/9、J42 5/1/5），題名與摘要未用這些片語者會漏；故另做全刊題名掃描（cursor 分頁讀完 670／181／41 篇題名）補查，補查只依題名決定是否讀摘要，題名未含 AI 相關詞或看似工具／高教者未讀摘要，仍可能漏。
- 題名掃描補讀的 93 篇不在 q1–q3 命中內，first_query_id 記為 Jxx-title-scan；title-scan 屬程式過濾＋人工初篩，不是可重現的單一布林查詢，寫入 search_runs 時請另註明。
- OpenAlex 缺摘要：J40 34/670、J41 3/181、J42 0/41。J40 有 7 筆入篩項目無摘要（2668793、2744895、2735911、2744403、2690104、2710463、2662351），依規定未讀出版社頁，一律列 pending；J40 社論 4 筆（2514372、2545053、2494914、2648342）OpenAlex 只有開頭段落，亦列 pending。
- 入選判斷只依 OpenAlex 摘要；學段、國別只取摘要明寫者。摘要僅用形容詞（Turkish、Chinese、Swiss、Spanish、Finnish）而無國名者 countries 留空；城市／州名（Shanghai、ShanTou、Kashmir 以外另有國名者照記）不記；Hong Kong 記 HK、England 未轉碼，請管理者確認。
- 主題界線需人工確認：(a) 教師「以 AI 教學」能力（AI-TPACK、AI 自我效能，如 2556810、2662456）是否算「教師教 AI 的能力」，本次列 pending；教師 AI 素養明寫者列 candidate。(b) K-12 GenAI 使用研究同時測風險者（2692615、2591858、infedu.2606.033）列 candidate K5，但兼具工具面向。(c) 家長 AI 素養（caeo.2025.100318）與學生對學習中 AI 的知覺（caeo.2026.100346）列 pending。(d) 社論 infedu.2025.00 列 candidate K1，屬社論非研究論文。
- crossref_issue_year 取 Crossref issued 年；Elsevier（caeo）多只有卷期月，issued 可能晚於 OpenAlex 日期（如 caeo.2025.100321 OpenAlex 2025-11、issued 2026-06）。first_public_date 未判定。
- Crossref 僅對 candidate／teacher_ed_fit／pending 共 78 筆查詢，全部 HTTP 200，題名與 OpenAlex 一致（去標點比對）；exclude 項題名取自 OpenAlex。OpenAlex 與 Crossref 非獨立來源；未讀出版社頁，未核作者。
- high_risk 依摘要是否含成效、前後測、效果量判定；部分 SEM 路徑效果（如 2658209）亦保守標 true。
- 知識庫去重以 origin/main 的 research/knowledge-base/data/records.csv（git fetch 後讀取）DOI 小寫比對，僅 10.15388/infedu.2601.025 重複。
- 所有 HTTP 請求未帶 email／mailto；OpenAlex key 由 proxy 帶上，未出現在本檔。摘要全文只在暫存目錄供判斷，已刪除，未寫入輸出。
