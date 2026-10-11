# 每日短訊查核紀錄：2026-10-11（0 則）

> 每日短訊例行作業，由排程觸發，編輯 session 執行。查詢時間 2026-10-11T00:31:37Z–2026-10-11T00:35Z（UTC）。請求未帶 email 或 mailto。結果是：**新增 3 筆候選（全部 hold），沒有可發布的短訊，不建頁、不登記**。原因見「為何 0 則」。

## 查詢

| 來源 | 查詢 | 狀態 | 結果 |
|---|---|---|---|
| Crossref | `filter=from-created-date:2026-10-10,until-created-date:2026-10-10,type:journal-article`，六組 `query.bibliographic`：AI literacy／artificial intelligence literacy／generative AI school students／AI education teachers K-12／ChatGPT secondary school／artificial intelligence primary school children；每組取前 40 筆 | 200（全部） | 6 組合計 240 筆、去重 182 筆。題名加摘要同時含 AI 與學校／學生／教師字詞者 38 筆，逐筆看上線日、學段與範圍（見下） |
| arXiv API | 摘要含 AI literacy、artificial intelligence literacy，或 generative AI 加 K-12／high school／middle school／primary school／secondary school／elementary；依提交日排序，取 30 筆 | 200 | 10-04 之後 2 筆：2610.10743（10-10 已判，對象不明）、2610.06619（新） |
| alphaXiv | discover_papers，AI literacy／K-12／children／generative AI，2026-10-04 起（只作發現） | ok | 6 筆，新增 2610.06619 以外：2610.08554、2610.10463、2610.05783、2610.08279（見下） |
| GOV.UK Search API | q=artificial intelligence schools，2026-10-04 起；另以 DfE 篩選最新 40 筆 | 200 | 無 K-12 AI 素養相關項目（關鍵詞與時間排序同用時篩選效果差，只能逐筆看題名）；10-10 無 DfE 新項目 |
| Federal Register API | term artificial intelligence education，2026-10-04 起；ED 機關篩選，2026-10-04 起 | 200 | 4 筆與 6 筆，皆與 K-12 AI 素養無關 |
| MEXT 新聞列表 | 首頁列表 | 200 | 10-04 後只有「AI for Science」委員會議事錄，與 K-12 無關 |
| 中國教育部 | 工作動態、文件列表 | 200 | 10-04 後無人工智能相關項目 |
| 香港政府新聞公報 | 2026-10-10、10-11 當日列表 | 200 | 無 AI 教育相關項目（10-10 有自動駕駛車輛工作組新聞，與教育無關） |
| UNESCO | articles 列表，經 WebFetch（內容為模型轉述，只當線索） | ok | 10-04 後無 AI 相關項目 |

查詢的限制：Crossref 每組只看依相關度排序的前 40 筆，不是全量篩選；登記日不等於上線日。政策來源只查上列列表，未查者不代表當天沒有發布。

## 初篩結果

### 匯入候選池（全部 hold）

| 候選 | 項目 | 首次公開 | 範圍 | 對象 | 說明 |
|---|---|---|---|---|---|
| W2026-10-09-A14 | arXiv `2610.06619` If My Toy Could Talk: How Young Children Imagine, Design, and Test AI-Enabled Toys | 2026-10-05（arXiv abs 頁 Submission history v1；submission 不等於 announce） | A（S-SYS、S-BAS） | k12（美國東南部五所小學 7–9 歲兒童） | 預印本，未經同儕審查。上次 10-10 查詢未出現 |
| W2026-10-09-A15 | `10.1038/s41598-026-73410-0` Young children’s knowledge of ChatGPT and its relationship with their achievement in english as a second language（Scientific Reports） | 2026-10-10（出版者頁 Published；Received 2026-04-09、Accepted 2026-09-22） | A（S-BAS、S-ETH） | k12（沙烏地阿拉伯三年級學生 255 人） | 期刊**不在監測清單**；但 DOAJ 收錄、標示單盲同儕審查，OpenAlex `is_in_doaj=true`，審查型態可核實，所以匯入而不列觀察。請管理者確認是否同意 |
| W2026-10-09-A16 | `10.1177/07356331261494821` Socratic, Artifact-Gated Generative AI Scaffolding in a 6E Inquiry Unit…Elementary Students’ Computational Thinking（JECR，J36） | 未核（Crossref published-online 2026-10-10；SAGE 頁回 403／驗證頁，未繞過） | B（S-LRN） | k12（臺灣十個三年級班級，229 人） | 摘要含效果量，高風險待 G2–G4。首發日讀不到原頁，不能進短訊 |

三筆都同時建立知識庫紀錄 KB-2026-0267～0269（`discovered_unverified`，首發日留空），關聯 KR-3920～3948。A14 的 `record_type` 用 `preprint`（知識庫首次出現此類型；候選紀錄不列入網站歷年資料庫）。

### 不匯入

| 項目 | 首次線上 | 範圍 | 對象 | 處理 |
|---|---|---|---|---|
| `10.1080/0969594x.2026.2738711` Students' emotional regulation in response to feedback from teachers, peers, and technology/AI tools（Assessment in Education，J22） | 2026-10-10（Crossref） | 不明 | unknown | 無摘要、T&F 頁讀不到。週內重查 |
| `10.1016/j.compedu.2026.105766` Disengaged Conversational Behaviors and Learning in Student-AI Dialogues for Mathematical Problem Solving（Computers & Education，J01） | Crossref 無 published-online | 不明 | unknown | 無摘要、Elsevier 頁讀不到。週內重查 |
| `10.3390/educsci16101679` Digital and AI-Supported Game-Based Interventions for Executive Function Development in Early Childhood（Education Sciences，J47） | 2026-10-10（Crossref） | 不明（以數位遊戲為主，AI 只占一部分） | k12／學前（3–8 歲） | 不匯入；範圍待管理者決定是否算 B |
| `10.54097/yz6kv776` AI-Supported Gamified Classroom…Introverted Students（Darcy & Roy Press） | 2026-10-08（Crossref） | B？ | unknown | 不在監測清單、審查品質無法核實，**列觀察交管理者決定** |
| `10.1080/10572317.2026.2738016` AI Literacy…Pre-Service STEM Teachers | 2026-10-10 | A | teacher_ed | 不進短訊與週報 |
| `10.1017/s2058631026101317` LLMs…Mediterranean archaeology websites（Journal of Classics Teaching） | 2026-10-10 | B | higher_ed（Wentworth Institute of Technology） | 不進短訊 |
| arXiv `2610.08554` SoK: Human-Centered AI Safety for Youth | 2026-10-06 | 不明（AI 安全防護文獻回顧，非師生素養本身） | unknown（學校、家庭、照護、公共服務混合） | 不匯入 |
| arXiv `2610.10463` assigned AI use before class | 2026-10-07 | B | higher_ed（MBA） | 不進短訊 |
| arXiv `2610.05783`、`2610.08279`；`10.33003/fjs-2026-1020-6105`；`10.1007/s12144-026-10158-w`；`10.1007/s44163-026-02114-1` | — | C（AI 為研究方法或系統後端） | — | 不收 |
| 其餘 Crossref 命中 | — | — | 大學、成人、醫療或上線日早於 10-04 | 不收 |

本日未命中不收出處（Atlantic Academic Press `10.70767`、Diamond Scientific Publishing `10.33422`）。

## 為何 0 則

A14（預印本，10-05）與 A15（Scientific Reports，10-10）在內容上符合短訊條件：首次公開在 7 天內、範圍 A、對象 k12、原頁可讀。但目前無法合法發布，原因是兩條現行規則互相衝突：

1. `validate-publication.js` 要求候選池中同一來源的候選必須是 `decision: publish`、`source_checked: true`，且 `first_disclosed_on` 與主張一致，否則以 `daily claim contradicts held/unverified cumulative candidate` 擋下。
2. `research/validate-knowledge-base.test.js` 的「actual nine held candidates remain discovery-only」測試要求本週候選池**每一筆**都是 `hold` 且 `source_checked: false`；知識庫測試也要求候選池與知識庫 `source_candidate_id` 一一對應。

所以任何進了候選池的來源都不能發短訊；不進候選池又違反「結果須匯入候選池」的作業規則。依指示不得修改閘門或測試，因此本日不建頁、不登記。**需要管理者決定**：是否調整知識庫測試，允許已完成來源核對的候選改為 `publish`／`source_checked: true`（另案修改，須管理者同意）。

## 既有候選池

本週候選池現為 16 筆，全部 hold，`source_checked` 全部 false。

## 驗證

依 `.github/workflows/verify-and-deploy.yml` 的 verify 步驟在本機跑過（npm ci 之後），全部通過。
