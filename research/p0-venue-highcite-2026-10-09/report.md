# 監測期刊高被引 K-12 AI 論文作者（2026-10-09）

> **性質：只評估，不入庫。** 管理者要求「在目前監測的期刊內找高引用率的相關論文，評估這些作者也要放入追蹤名單」，由編輯 session 執行。結果已併入 [scholar-watchlist.md](../scholar-watchlist.md) 第 3c 節與附錄。未寫入知識庫或 `search_runs.csv`；請求未帶 email 或 mailto。

## 方法

- 期刊：[venue-watchlist.md](../venue-watchlist.md) J01–J39，以 OpenAlex sources 依刊名比對來源 ID（見 [queries.json](queries.json)）。J03 自 2026 起改由 Elsevier 出版，新刊號若另有 OpenAlex 來源 ID，本次未涵蓋。
- 查詢：每刊一次 `/works?filter=primary_location.source.id:<ID>,from_publication_date:2019-01-01,title_and_abstract.search:("artificial intelligence" OR "AI literacy" OR "generative AI" OR ChatGPT)`，依被引數排序取前 25 篇。UTC 2026-10-09T19:30:01+00:00–2026-10-09T19:30:32+00:00，39 次全部成功。
- K-12 標記：題名或摘要含 K-12、primary／elementary／secondary／middle／high school、kindergarten、early childhood、children、adolescent、pupil、grade、in-service teacher 等。共 133 篇（依題名去重）。
- 取被引前 60 篇（第 60 名被引 50），目視排除 7 篇非 K-12 AI 研究：#2 成人與高教 AI 素養回顧、#6 通用 AI 哲學論文、#11 師資一般科技能力、#29 演算法公平的軟體從業者教育、#33 線上考試誠信、#39 平板寫字 App、#41 研究可信度實驗。
- 作者：前 30 篇的第一或最後作者，加上前 60 篇中出現 2 篇以上者，共 58 人；其中 19 人已在學者清單（含附錄），新增候選 39 人。
- 確認：OpenAlex 作者檔案附 ORCID、且 ORCID 有公開現職紀錄者為已確認（26 人）；無 ORCID 或無現職紀錄者列附錄（8 人）；只出現在被排除論文中的 5 人不列入。

## 前 60 篇（排除後）

| 名次 | 期刊 | 年 | 被引 | 題名 |
|---|---|---|---|---|
| 1 | J31 | 2023 | 696 | AI literacy in K-12: a systematic literature review |
| 3 | J02 | 2023 | 476 | Artificial Intelligence (AI) Literacy in Early Childhood Education: The Challenges and Opportunities |
| 4 | J03 | 2021 | 441 | Exploring Teachers’ Perceptions of Artificial Intelligence as a Tool to Support their Practice in Estonian K-12 Education |
| 5 | J02 | 2022 | 433 | Artificial Intelligence education for young children: Why, what, and how in curriculum design and implementation |
| 7 | J02 | 2022 | 398 | Teachers’ readiness and intention to teach artificial intelligence in schools |
| 8 | J03 | 2022 | 390 | Integrating Ethics and Career Futures with Technical Learning to Promote AI Literacy for Middle School Students: An Exploratory Study |
| 9 | J28 | 2021 | 371 | Creation and Evaluation of a Pretertiary Artificial Intelligence (AI) Curriculum |
| 10 | J04 | 2023 | 369 | Design and validation of the AI literacy questionnaire: The affective, behavioural, cognitive and ethical approach |
| 12 | J05 | 2022 | 288 | Modeling English teachers’ behavioral intention to use artificial intelligence in middle schools |
| 13 | J01 | 2022 | 238 | An analysis of children’ interaction with an AI chatbot and its impact on their interest in reading |
| 14 | J01 | 2024 | 226 | Improving elementary EFL speaking skills with generative AI chatbots: Exploring individual and paired interactions |
| 15 | J07 | 2024 | 223 | A classification tool to foster self-regulated learning with generative artificial intelligence by applying self-determination theory: a case of ChatGPT |
| 16 | J35 | 2020 | 221 | Learning machine learning with very young children: Who is teaching whom? |
| 17 | J05 | 2023 | 208 | Artificial Intelligence in K-12 Education: eliciting and reflecting on Swedish teachers' understanding of AI and its implications for teaching & learning |
| 18 | J03 | 2022 | 205 | AI + Ethics Curricula for Middle School Youth: Lessons Learned from Three Project-Based Curricula |
| 19 | J06 | 2023 | 204 | An investigation of teachers' perceptions of using ChatGPT as a supporting tool for teaching and learning in the digital era |
| 20 | J08 | 2022 | 201 | Affordances and challenges of artificial intelligence in K-12 education: a systematic review |
| 21 | J04 | 2023 | 198 | The mediating effects of needs satisfaction on the relationships between prior knowledge and self‐regulated learning through artificial intelligence chatbot |
| 22 | J27 | 2024 | 195 | A Human-Centered Learning and Teaching Framework Using Generative Artificial Intelligence for Self-Regulated Learning Development Through Domain Knowledge Learning in K–12 Settings |
| 23 | J01 | 2020 | 177 | Same benefits, different communication patterns: Comparing Children's reading with a conversational agent vs. a human partner |
| 24 | J33 | 2024 | 168 | Exploring the effects of AI literacy in teacher learning: an empirical study |
| 25 | J27 | 2024 | 166 | Using ChatGPT for Science Learning: A Study on Pre-service Teachers' Lesson Planning |
| 26 | J03 | 2025 | 153 | Towards an AI-Literate Future: A Systematic Literature Review Exploring Education, Ethics, and Applications |
| 27 | J01 | 2024 | 146 | A self-determination theory approach to teacher digital competence development |
| 28 | J31 | 2022 | 144 | The exploration of continuous learning intention in STEAM education through attitude, motivation, and cognitive load |
| 30 | J08 | 2022 | 142 | In-service teachers’ (mis)conceptions of artificial intelligence in K-12 science education |
| 31 | J03 | 2023 | 136 | K-12 Education in the Age of AI: A Call to Action for K-12 AI Literacy |
| 32 | J03 | 2020 | 129 | Active Learning is About More Than Hands-On: A Mixed-Reality AI System to Support STEM Education |
| 34 | J03 | 2022 | 118 | Lessons Learned for AI Education with Elementary Students and Teachers |
| 35 | J03 | 2023 | 117 | Can ChatGPT Pass High School Exams on English Language Comprehension? |
| 36 | J06 | 2023 | 111 | AI literacy curriculum and its relation to children's perceptions of robots and attitudes towards engineering and science: An intervention study in early childhood education |
| 37 | J06 | 2024 | 101 | Fostering students' AI literacy development through educational games: AI knowledge, affective and cognitive engagement |
| 38 | J06 | 2023 | 98 | Artificial intelligence education for young children: A case study of technology‐enhanced embodied learning |
| 40 | J26 | 2024 | 89 | ‘No, Alexa, no!’: designing child-safe AI and protecting children from the risks of the ‘empathy gap’ in large language models |
| 42 | J07 | 2022 | 85 | Secondary school students’ intentions to learn AI: testing moderation effects of readiness, social good and optimism |
| 43 | J11 | 2024 | 79 | Advancing AI education: Assessing Kenyan in-service teachers' preparedness for integrating artificial intelligence in competence-based curriculum |
| 44 | J29 | 2024 | 79 | Generative AI and education: dynamic personalization of pupils’ school learning material with ChatGPT |
| 45 | J03 | 2022 | 74 | AI Curriculum for European High Schools: An Embedded Intelligence Approach |
| 46 | J03 | 2024 | 73 | Developing and Validating the Artificial Intelligence Literacy Concept Inventory: an Instrument to Assess Artificial Intelligence Literacy among Middle School Students |
| 47 | J08 | 2024 | 72 | Augmented teachers: K–12 teachers’ needs for artificial intelligence’s complementary role in personalized learning |
| 48 | J21 | 2025 | 69 | Social-Emotional Learning and Generative AI: A Critical Literature Review and Framework for Teacher Education |
| 49 | J35 | 2023 | 67 | Finnish 5th and 6th graders’ misconceptions about artificial intelligence |
| 50 | J35 | 2021 | 67 | Teaching machine learning in elementary school |
| 51 | J30 | 2022 | 65 | The Effects on Secondary School Students of Applying Experiential Learning to the Conversational AI Learning Curriculum |
| 52 | J35 | 2022 | 61 | High school students exploring machine learning and its societal implications: Opportunities and challenges |
| 53 | J03 | 2023 | 58 | Machine Learning for All!—Introducing Machine Learning in Middle and High School |
| 54 | J03 | 2024 | 56 | Examining AI Use in Educational Contexts: A Scoping Meta-Review and Bibliometric Analysis |
| 55 | J36 | 2023 | 56 | Effect of an Analogy-Based Approach of Artificial Intelligence Pedagogy in Upper Primary Schools |
| 56 | J37 | 2025 | 55 | Generative AI as a Dialogic Partner: Enhancing Multiple Perspectives, Reasoning, and Argumentation in Science Education with Customized Chatbots |
| 57 | J09 | 2024 | 52 | Understanding Student Perceptions of Artificial Intelligence as a Teammate |
| 58 | J06 | 2025 | 51 | Can Generative Artificial Intelligence be a Good Teaching Assistant?—An Empirical Analysis Based on Generative AI ‐Assisted Teaching |
| 59 | J06 | 2022 | 51 | Effect of groups size on students' learning achievement, motivation, cognitive load, collaborative problem‐solving quality, and in‐class interaction in an introductory AI course |
| 60 | J06 | 2022 | 50 | Designing a novel teaching platform for AI : A case study in a Thai school context |

## 觀察

- 已在清單的 19 人（Ng、Chu、Su、Chiu、Breazeal 團隊、Kong、Vartiainen、劉晨鐘等）在監測期刊中同樣高被引，兩種選法結果一致。
- 新增者多為 K-12 AI 教育的實證研究者：幼兒 AI 教育（Weipeng Yang）、教師準備度（Ayanwale、Oyelere）、中學 AI 課程（Ching Sing Chai）、兒童與 AI 對話代理（Ying Xu、Warschauer）、科學教育中的 AI（Zhai、Antonenko）、K-12 AI 素養倡議（Lester）等。
- 臺灣單位學者 3 位：Hung-Ming Lin（明新科技大學）、Tzu-Yu Tai（臺北醫學大學）、Chih-Hung Wu（國立清華大學）；中文姓名待確認，不自行推測。
- 7 人的 OpenAlex 單位與 ORCID 現職不同（可能為轉職或作者檔案混入），依作者檢索時須逐篇看作者單位；Helen Crompton 的 OpenAlex 單位為土耳其 Anadolu University，疑似混入。
