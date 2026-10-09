# B1-2 組文獻搜尋紀錄（J27、J28、J29、J30、J32、J33、J34、J39）

- 起訖 UTC：2026-10-09T16:58:44Z – 2026-10-09T17:04:45Z
- 日期範圍：2025-01-01..2026-10-09（OpenAlex publication_date）
- 工具：OpenAlex works API（proxy 帶 key）、Crossref works/<DOI>；未讀出版社頁；verify_bibtex 不可用
- 查詢：每來源 q1a/q1b（AI 素養詞 × 學段詞兩組）、q2a/q2b（GenAI 詞 × 學段詞兩組）、q4a/q4b（同上 × school/primary education/secondary education 補充）；缺摘要 ≥20% 的 J27、J28、J34、J39 另加 q3t（has_abstract:false＋title.search）。共 52 次查詢，全部 HTTP 200。

## 結果表

| 來源 | 刊名 | 範圍內作品（有摘要/無摘要） | 去重命中 | 細讀摘要 | 題名初篩 | 候選 | 待判 | 排除 |
|---|---|---|---|---|---|---|---|---|
| J27 | IEEE Transactions on Learning Technologies | 106/39 | 15 | 4 | 11 | 2 | 1 | 12 |
| J28 | IEEE Transactions on Education | 49/61 | 3 | 0 | 3 | 0 | 0 | 3 |
| J29 | Frontiers in Education | 3961/14 | 58 | 15 | 43 | 6 | 16 | 36 |
| J30 | International Review of Research in Open and Distributed Learning | 99/3 | 3 | 1 | 2 | 1 | 0 | 2 |
| J32 | Discover Education | 1759/10 | 15 | 11 | 4 | 4 | 3 | 8 |
| J33 | Humanities and Social Sciences Communications | 4799/22 | 5 | 2 | 3 | 1 | 0 | 4 |
| J34 | Canadian Journal of Science, Mathematics and Technology Education | 39/121 | 10 | 0 | 10 | 0 | 2 | 8 |
| J39 | International Journal of Computer-Supported Collaborative Learning | 24/31 | 2 | 0 | 2 | 0 | 0 | 2 |

各查詢 API meta.count 見 JSON `queries`。J28、J34、J39 主查詢 0 命中（HTTP 200）。

## 候選清單

| DOI | 題名 | 來源 | 學段（摘要） | 國別 | 類別 | 高風險 | 已知 DOI |
|---|---|---|---|---|---|---|---|
| 10.1109/tlt.2026.3668051 | Leveraging Generative AI Agent to Promote Teaching Reflection in a K–12 AI Course: Effects on Teachers’ Reflection Self-Efficacy, Instructional Design, and Reflective Thinking | J27 | K-12（在職教師，K-12 AI 課程） | — | K4 | 是 | 否 |
| 10.1109/tlt.2026.3672830 | Interdisciplinary Integration: The Connotation and Methods of Cultivating Artificial Intelligence Talents in K-12 Education | J27 | K-12（分學段） | — | K2 | 是 | 否 |
| 10.3389/feduc.2026.1831415 | Developing an AI literacy competency model for primary school Chinese language teachers: a pilot study | J29 | 小學（國語文教師） | — | K3 | 否 | 否 |
| 10.3389/feduc.2026.1811339 | From learners to contributors: how an AI-infused STEM program shaped youth identity and initiated them to an AI-future | J29 | 高中（校外 STEM 計畫） | — | K6 | 是 | 否 |
| 10.3389/feduc.2026.1769204 | Preparing teachers for the age of artificial intelligence: understanding the challenges and needs of AI-TPACK in Indonesian elementary education | J29 | 小學（在職教師） | ID | K4 | 否 | 否 |
| 10.3389/feduc.2025.1543746 | Free word association analysis of students' perception of artificial intelligence | J29 | 高中（德國，10–20 歲） | DE | K2 | 否 | 否 |
| 10.3389/feduc.2026.1800516 | Current status of responsible use of generative AI in senior high school science teaching in China | J29 | 高中（高二高三，senior high） | CN | K5 | 否 | 否 |
| 10.3389/feduc.2026.1805617 | Anchored to the text, owned by the student: a policy & practice review for generative AI in literature education | J29 | 小學至高中（primary to upper secondary） | — | K5 | 否 | 否 |
| 10.19173/irrodl.v27i2.9140 | Bringing Artificial Intelligence Literacy Into Online Education: Machine-Learning Integration Through Geometry in K–12 Teacher Professional Development | J30 | K-12（在職教師） | — | K4 | 是 | 否 |
| 10.1007/s44217-026-01695-4 | AI literacy functions as cultural capital in stratified Egyptian schools | J32 | K-12（12 所公私立與國際學校） | EG | K2 | 否 | 否 |
| 10.1007/s44217-026-02092-7 | Cultivating AI literacy among high school students through generative AI as a collaborative partner | J32 | 高中 | — | K6 | 是 | 是 |
| 10.1007/s44217-026-01403-2 | AI competence domains and experience-based differences among science and technology teachers investigated using structural equation modeling | J32 | 中學（科學與科技教師） | TH | K3 | 否 | 否 |
| 10.1007/s44217-025-00630-3 | Exploring artificial intelligence literacy among basic school teachers in Ghana | J32 | 基礎教育（basic school）教師 | GH | K3 | 否 | 否 |
| 10.1057/s41599-026-07392-9 | Determinants of AI teachers’ behavioural intention to use virtual simulation platforms: an integrated SEM and fsQCA study | J33 | K-12（AI 教師） | — | K4 | 否 | 否 |

## 待判清單

| DOI | 題名 | 來源 | 待判原因 |
|---|---|---|---|
| 10.1109/tlt.2025.3575030 | Science Education in the Age of Artificial Intelligence: Opportunities, Challenges, and Research | J27 | OpenAlex 無摘要（2025 卷 18 頁 635–638，可能為社論）；學段與是否涉及 AI 教育不明 |
| 10.3389/feduc.2026.1870536 | Curriculum innovation through artificial intelligence and its influence on pupils’ independent learning in Azerbaijan | J29 | 學段明示；但主體為 AI 作為課程／學習工具，教師 AI 素養僅為調節變項，是否入選待管理者判斷；迴歸係數勿作因果，高風險，待 G2–G4 |
| 10.3389/feduc.2026.1780826 | Ethical and equitable heutagogy: integrating AI to support learner agency | J29 | 超過細讀上限未讀（J29 已細讀 15 篇）；題名與查詢命中顯示可能相關，學段／主題待讀摘要 |
| 10.3389/feduc.2025.1716353 | Learning with, rather than through, AI: co-designing science education for critical AI literacy | J29 | OpenAlex 摘要欄實為正文開頭，學段僅以「high school settings」「teens」旁及，未見明確研究對象學段；待讀原文確認 |
| 10.3389/feduc.2025.1632990 | From tools to co-learners: entangled humanism and the co-evolution of intelligence in AI education | J29 | 超過細讀上限未讀（J29 已細讀 15 篇）；題名與查詢命中顯示可能相關，學段／主題待讀摘要 |
| 10.3389/feduc.2026.1755301 | Modeling K-12 teachers’ continuance intention to use generative AI: influencing factors and a hybrid SEM-ANN approach | J29 | 超過細讀上限未讀（J29 已細讀 15 篇）；題名與查詢命中顯示可能相關，學段／主題待讀摘要；題名偏工具採用 |
| 10.3389/feduc.2026.1929017 | K-12 in-service teachers' beliefs about generative AI in classrooms: insights from the United States, India, Qatar, Colombia, and the Philippines | J29 | 學段明示；主題為教師 GenAI 信念與風險疑慮，是否屬「K-12 生成式 AI 風險」待管理者判斷 |
| 10.3389/feduc.2026.1874510 | A framework for integrating large language models in secondary physics education: practical design, opportunities, risks, and pedagogical principles | J29 | 學段明示；主要為 LLM 作為教學工具，但含風險（認知卸載、偏誤）與倫理鷹架原則，邊界待判；單組前後測 pilot，高風險，待 G2–G4 |
| 10.3389/feduc.2025.1597249 | GenAI as a cognitive mediator: a critical-constructivist inquiry into computational thinking in pre-university education | J29 | 學段明示；以 GenAI 作為程式／設計思維學習工具為主，但結論強調批判數位素養與認知警覺，邊界待判 |
| 10.3389/feduc.2025.1610836 | Addressing student use of generative AI in schools and universities through academic integrity reporting | J29 | 理論文章；題名提 schools，摘要僅寫 academic environment，未明示中小學學段 |
| 10.3389/feduc.2026.1792351 | Text features associated with students’ generative AI use: Norwegian teachers’ perspectives | J29 | 超過細讀上限未讀（J29 已細讀 15 篇）；題名與查詢命中顯示可能相關，學段／主題待讀摘要 |
| 10.3389/feduc.2025.1681836 | Artificial intelligence in education: applications and limitations for teachers in low- and middle-income countries | J29 | 超過細讀上限未讀（J29 已細讀 15 篇）；題名與查詢命中顯示可能相關，學段／主題待讀摘要 |
| 10.3389/feduc.2025.1609518 | Homework in the AI era: cheating, challenge, or change? | J29 | 超過細讀上限未讀（J29 已細讀 15 篇）；題名與查詢命中顯示可能相關，學段／主題待讀摘要 |
| 10.3389/feduc.2026.1825182 | Teacher technophobia toward Generative AI: evidence from an Italian survey | J29 | 超過細讀上限未讀（J29 已細讀 15 篇）；題名與查詢命中顯示可能相關，學段／主題待讀摘要 |
| 10.3389/feduc.2026.1875856 | Empowering teachers to use AI for differentiation: changes in teachers’ acceptance of AI-based technologies following participation in a short professional development training session | J29 | 超過細讀上限未讀（J29 已細讀 15 篇）；題名與查詢命中顯示可能相關，學段／主題待讀摘要；題名偏 AI 工具使用研習 |
| 10.3389/feduc.2026.1818555 | Epistemic practices and beliefs of Chilean adolescents in digital environments | J29 | 超過細讀上限未讀（J29 已細讀 15 篇）；題名與查詢命中顯示可能相關，學段／主題待讀摘要；是否涉 AI 不明 |
| 10.3389/feduc.2026.1790642 | Exploring the IntelligentTPACK gap: a qualitative analysis of teachers’ AI competencies and AI self-reported classroom uses | J29 | 211 名斯洛伐克在職教師；摘要僅寫 schools，未明示中小學學段；主題含教師 AI 能力 |
| 10.1007/s44217-025-00924-6 | Landscape of AI literacy in education: approaches, impacts, and challenges for student preparedness—a narrative review | J32 | 摘要提及 K-12 至高教與專業教育的不同需求，K-12 僅為其一；是否符合「學段明示 K-12」待管理者判斷 |
| 10.1007/s44217-026-01688-3 | A mixed methods study of the three low trap in high school information technology teaching in underdeveloped China in the AI era | J32 | 學段明示；主題為 AI 時代資訊科技教學的基礎設施、教師能力與政策落實，是否屬教 AI 不明；資料為網路評論情緒分析與 13 名教師訪談 |
| 10.1007/s44217-026-01611-w | Understanding K-12 teachers’ adoption of generative AI through an integrated technology acceptance and perceived risk framework | J32 | 學段明示；主體為工具採用（TAM），但知覺風險為核心構念，是否屬 K-12 GenAI 風險待管理者判斷 |
| 10.1007/s42330-025-00404-x | From TV to AI: Evolving Challenges and Enduring Questions in STEM Education | J34 | OpenAlex 無摘要；可能為評論文，學段與是否涉 AI 教育不明 |
| 10.1007/s42330-026-00434-z | Exploring the Influence of AI on the Professional Development of Science Teachers in STEM Education | J34 | OpenAlex 無摘要；教師 AI 相關專業發展，學段不明 |

排除項（含題名初篩排除）完整列於 JSON `items`。

## 限制

- 缺摘要：J27 有 39/145、J28 有 61/110、J34 有 121/160、J39 有 31/55 篇在 OpenAlex 無摘要；布林查詢對這些作品只比對題名。已對此四刊加 q3t（has_abstract:false＋title.search AI 詞），但題名未提 AI 者仍會漏；q3t 命中者均無摘要，只能依題名判斷，相關者列 pending。
- J29（Frontiers in Education）命中 58 篇，依指示細讀摘要上限 15 篇；另有 9 篇題名可能相關但未細讀，列 pending 並註明「超過細讀上限未讀」；其餘以題名初篩排除（abstract_source=none），題名初篩可能誤判。
- J29、J32、J33 為大型 OA 刊（範圍內約 3975、1769、4821 篇），本組只用 6 組片語布林查詢（AI 素養詞／GenAI 詞 × 三組學段詞），未用 students、teachers、children、adolescents、grade 等泛詞；只寫 students／teachers 而不寫學段詞的 K-12 研究可能漏查。
- J28、J34、J39 的 q1a–q4b 主查詢皆 0 命中（HTTP 200，非失敗）；結果只代表 OpenAlex 片語比對，未核對 OpenAlex 對這些刊的收錄完整度。
- 10.3389/feduc.2025.1716353的 OpenAlex 摘要欄實為正文開頭，非真正摘要；學段判斷不可靠，列 pending。
- Research Desk verify_bibtex 在本環境不可用（ToolSearch 查無），verify_bibtex_status 一律 unchecked；以 Crossref works/<DOI> 取書目並人工比對 OpenAlex 題名（OpenAlex 多取自 Crossref，不算兩個獨立來源）。
- IEEE TLT（J27）DOI 在 Crossref 無 published-online，只有 issued／published-print 年（2025、2026），crossref_online 為 null；Frontiers（J29）無 journal-issue 日期，crossref_issue_year 依卷號推卷年（vol 10＝2025、vol 11＝2026；10.3389/feduc.2025.1681836 issued 2026-01-09 但屬 vol 10，記 2025 並註明）；Springer（J32、J33、J34）journal-issue 多為當年 12 月，卷年照記。first_public_date 一律 unknown。
- 未讀任何出版社頁（IEEE Xplore、Frontiers、Springer、Nature），verification_status 應為 discovered_unverified。國別只記摘要明寫者；題名初篩項一律不記國別。
- 所有查詢 HTTP 200，無 429／504 失敗與重試。
