# 每日短訊查核紀錄：2026-10-22（6 則；週四必查首次執行）

> 每日短訊例行作業，由排程觸發，在每日短訊專用 session 執行。檢索由同 session 五個子代理分頭執行：國際研究、國際政策、臺灣中央來源，週四必查分兩組（原試行來源加第二批國家；F2 加丙組）。判讀由本 session 複核。查詢時間 2026-10-22T00:22Z–00:36Z（UTC）。請求都沒帶 email 或 mailto；遇 403、503、Client Challenge 或驗證頁都沒有繞過；無頭瀏覽器只用在來源清單標明的網站。
>
> 結果：**發布 6 則**（國際 6 則：研究 3 則、政策 3 則；臺灣 0 則）。今天週四，依排程加查週四必查來源（管理者 2026-10-19、10-20 決定），本日是第一次執行。規則凍結至 11/03（見 research/exceptions.md）。外文篇名依管理者 2026-10-21 決定附 `title_zh`。

## 國際

### 查詢

| 來源 | 查詢 | 狀態 | 列表最新／結果 |
|---|---|---|---|
| Crossref | `filter=from-created-date:2026-10-21,until-created-date:2026-10-21,type:journal-article`，六組 `query.bibliographic`（同 10-20），每組 rows=40 | q4 第一次 429，重試 200；其餘 200 | 連同下兩組去重 416 筆；題名同時含 AI 與學校類字詞者 48 筆 |
| Crossref（proceedings-article） | 同日期，`artificial intelligence school students teachers`，rows=40 | 200 | 不在清單或無摘要，不收 |
| Crossref（監測期刊 ISSN 補查） | 同日期，22 本監測期刊；帶關鍵詞 rows=60、不帶 rows=200 | 200 | 帶關鍵詞 19 筆；全量 200 筆（Scientific Reports 161、HSSC 13、Frontiers in Education 12、Education Sciences 5、Discover Education 3、ETRD 2 等） |
| Crossref（created 10-22） | 以上各組改查 10-22 | 200（q1、q2 先 429，重試成功） | 查詢時 0 筆 |
| 出版者頁面（各試一次） | Springer 4、Frontiers 2、T&F 1、Wiley 2 | Springer、Frontiers 200；T&F、Wiley 403 | Springer、Frontiers 讀到上線日與摘要 |
| OpenAlex | 21 個 DOI；另查臺灣機構（見臺灣段） | 1 筆 200，其餘 404 | 臺灣段查詢帶出 J06 `jcal.70356`（見發布 D20261022-03） |
| arXiv API（https） | 三組（同 10-20），依送件日排序，40／40／100 筆 | 200 | 最新 v1 10-20；10-15 後新見 4 筆皆不合格 |
| alphaXiv | discover_papers，2026-10-15 起（只作發現） | ok | 7 筆，皆已判過或屬大學 |
| GOV.UK | Search API（DfE 58、Ofqual 5、Ofsted 10 筆，10-15 起），Content API 逐筆讀 73 筆 | 200 | DfE 最新 10-21；10-21 新增 11 筆無 AI；有 AI 字詞的 3 筆皆已判過；DCMS〈Joining the TechFirst community〉無 AI，C |
| Federal Register | `curl -g`：term 三組、ED 篩選（10-15 起）、10-21 與 10-22 期、public inspection | 200 | 10-21 期 63 筆，ED 1 筆（2026-21493，昨天已判無 AI）；2026-21505 純文字版回 Request Access 頁，未繞過，改讀 govinfo 版，C；10-22 期 API 未上線 |
| MEXT | 報道発表、新着 | 200 | 最新 10-21；ユースアジェンダ起草会議（無 AI，C）；10-20 大臣記者會見文字版仍未上傳 |
| 中國教育部 | 工作動態、部領導活動、s5147、s5148、s5987（正確路徑 gzdt_gzdt/s5987）、中央文件、教育部文件 | 200 | 最新 10-20（首頁 10-21）；無 A／B 項目 |
| 香港政府新聞公報 | 10-21 全日（英 57、中 60 則）、10-22 | 200 | 10-21 AI 相關 2 則皆 C；10-22 讀取時尚無項目 |
| 韓國 KICE | 보도자료列表 | 200 | 最新 10-20，無新項目 |
| 韓國教育部 | 보도자료列表 | 200（第一次即成功） | 最新 10-20，無新項目 |
| KERIS | 보도자료列表 | 200 | 最新 10-15，無新項目 |
| UNESCO | `/en/newsroom`；7 篇原頁 | 200 | 新 AI 項目〈50 emerging leaders…〉（10-21，25–45 歲，adult）；另由週四 UNESCO AI 與教育專頁發現 10-19 文章（見發布 D20261022-06） |
| Eurydice 新聞（試行） | https://eurydice.eacea.ec.europa.eu/news | 200 | 最新 10-21；新 2 則（塞爾維亞閱讀與數理素養方案、資料集上架）皆 C；命中 0 |

### 發布

| 編號 | 來源 | 首發日（依據） | 範圍 | 對象 | 型態 |
|---|---|---|---|---|---|
| D20261022-01 | J07 ETRD Chen 等〈What AI competency do K-12 teachers need? Framework construction based on teachers' work scenarios and the development and validation of a scale〉 https://doi.org/10.1007/s11423-026-10741-9 | 2026-10-21（Springer 頁 Published） | A（T-BAS、T-TEA、T-ETH） | k12（中小學教師，18,295 份有效回應） | 作者摘要型 |
| D20261022-02 | J29 Frontiers in Education Li、Zhou〈AI-mediated tools in primary English language education: a scoping review…〉 https://doi.org/10.3389/feduc.2026.1968516 | 2026-10-21（Frontiers 頁 Published；citation_online_date 10-05 為接受日） | B（S-LRN、T-TEA） | k12（國小英語，範疇回顧 119 份報告） | 作者摘要型 |
| D20261022-03 | J06 JCAL Duong、Chen〈Writing Motivation and Self‐Efficacy in AI‐Chatbot‐Supported EFL Writing…〉 https://doi.org/10.1002/jcal.70356 | 2026-10-15（Crossref published-online；Wiley 403） | B（S-LRN） | k12（越南高中學生 47 人） | 書目型（摘要只讀到 Crossref；介入研究不寫結果） |
| D20261022-04 | 德國 KMK 新聞稿〈Was Schülerinnen und Schüler im Umgang mit KI können sollen〉 https://www.kmk.org/aktuelles/pressearchiv/mitteilung/was-schuelerinnen-und-schueler-im-umgang-mit-ki-koennen-sollen.html | 2026-10-16（頁面日期） | A（S-BAS、S-ETH） | k12 | 官方摘要型；official_guidance；DE |
| D20261022-05 | 義大利教育與功績部〈Next Gen AI, a Milano e Cernobbio il secondo Summit internazionale sull'Intelligenza Artificiale nella scuola organizzato dal MIM〉 https://www.mim.gov.it/web/guest/-/next-gen-ai-a-milano-e-cernobbio-il-secondo-summit-internazionale-sull-intelligenza-artificiale-nella-scuola-organizzato-dal-mim | 2026-10-17（頁面日期；10-21 更新） | A（T-PD、S-ETH；AI 素養活動公告） | k12（學生、教師、校長） | 官方摘要型；training_event；IT |
| D20261022-06 | UNESCO〈UNESCO's Digital Transformation Collaborative: Charting how AI is reshaping education systems〉 https://www.unesco.org/en/articles/unescos-digital-transformation-collaborative-charting-how-ai-reshaping-education-systems | 2026-10-19（datePublished） | A（T-BAS、T-PD） | other_stakeholders（政策制定者與實務工作者） | 官方摘要型；official_commentary；INTL |

- **D20261022-01**：摘要第 3、4、5 句；作者另報告的信效度評語、能力水準與群體差異不寫入。
- **D20261022-02**：摘要第 2 至 7 句；成效差異與延宕效果的描述不寫入。
- **D20261022-03**：昨天以前漏收。Crossref 紀錄 10-16 05:53Z 建立，10-17 補查時未命中，今天由臺灣段 OpenAlex（作者機構在臺灣）帶出；10-15 首發，今天是 7 天內最後一天，先發書目型，見「請管理者用瀏覽器處理」。樣本為越南學生，非臺灣樣本。
- **D20261022-04**：週四必查命中。第 1 段第 1、2 句與第 3 段第 1、2、4 句；部長引述與支援工具不寫入。KMK 本週四才首次查，10-16 發布至今在 7 天內。
- **D20261022-05**：週四必查命中。公告於開幕前（10-17）發布，活動 10-19～10-22；同系列 10-19 部長致詞〈Scuola, Valditara: "Italia all'avanguardia nell'Intelligenza Artificiale…"〉以部長自述成效為主（數位教室數、經費），同一活動不另發。
- **D20261022-06**：週四必查 UNESCO AI 與教育專頁命中（每日 newsroom 列表未見）。報導 2026-09-11 會議，文章 10-19 首次公開。

第二輪由隔離子代理逐項對照原文：研究三則判定一致，依建議改為「三維整合框架」「探索性與驗證性因素分析」「寫作、詞彙與回饋鷹架」「五類反覆出現的教學功能」，譯名「教師調控」改「教師統籌」、JCAL 譯名改為「…不同程度學習者的探索性發現」並標 EFL。政策三則：KMK 判定一致，依建議補上「透明處理 AI 生成或經 AI 處理的作品」、改為「資料保護與倫理問題」，並刪去摘錄無直接依據的 S-LRN；義大利一則依建議把時態改為預告（原文全用未來式），「各國教育部長」改「各國教育首長」，補上歐洲及國際層級部會代表；UNESCO 一則判定一致，依建議改為「體認」「會中最一致提出的關切」並補帶入課堂一句，AI 素養對應由 T-ETH 改為 T-PD。候選池 W2026-10-16-A12～A17；知識庫 KB-2026-0403～0408（KR-14407～14468）。

### E5a 前 7 天回查（政策，首次公開 10-15～10-22）

每日來源 10-15～10-20 的項目已在 10-16～10-21 查核紀錄判過；今天重掃 GOV.UK 三機構 73 筆、ED 4 筆、UNESCO、Eurydice、KICE、韓國教育部、KERIS、中國教育部各欄目，無漏收。週四來源本週首次查，命中的 KMK（10-16）、義大利教育與功績部（10-17）、UNESCO（10-19）仍在 7 天內，今天發布。

### 待補（監測清單內，未達門檻）

| 項目 | 首次公開 | 範圍 | 對象 | 說明 |
|---|---|---|---|---|
| J40 `10.1080/10494820.2026.2750864`〈Mathematics teachers' AI-TMPK: exploring structural relationships and latent profiles〉，Interactive Learning Environments | 2026-10-20（Crossref published-online；T&F 403） | 依題名 A（T-TEA） | 不明（在職或職前） | Crossref 無摘要、OpenAlex 404；見「請管理者用瀏覽器處理」 |
| J49 `10.1111/ejed.70912` Ünsal 等〈Being a Teacher in a Digital World: Deepening the Relationships Among Teachers' AI‐TPACK, AI Literacy, and AI Acceptance Levels〉，European Journal of Education | 2026-10-21（Crossref published-online；Wiley 403） | A（T-BAS、T-TEA） | Crossref 摘要只寫土耳其教師 306 人，未寫學段；J49 須逐篇確認學段 | 暫不發；見「請管理者用瀏覽器處理」 |
| J32 `10.1007/s44217-026-02316-w` Parra-Sánchez、Uribe-Arengas〈Mapping research trends in artificial intelligence for K–12 teaching and learning: a scientometric analysis〉，Discover Education | 2026-10-21（Springer 頁） | 不明（文獻計量，無人類樣本；四個研究群集之一為 AI 素養，但全文主題是 K–12 AI 研究趨勢，對不到框架內涵） | k12（主題） | 維持不明，不發；可留週報或月報背景 |

### 列觀察（出處不在監測清單）

| 項目 | 首次公開 | 範圍 | 對象 | 說明 |
|---|---|---|---|---|
| `10.1108/pdsp-05-2026-0014`（PDS Partners）K–8 教師線上研習：探究與 AI 支持學科讀寫教學 | 2026-10-22（Crossref） | A（T-TEA、T-PD） | k12（K–8 教師 9 人） | Emerald；Crossref 有摘要 |
| `10.3389/fpsyg.2026.1939220`（Frontiers in Psychology）AI 支援虛擬實驗室翻轉物理學習 | 2026-10-21 | B | k12（中國九年級 90 人，準實驗） | 觀察池 |
| `10.1080/00220671.2026.2747653`（Journal of Educational Research）AI 輔助機率任務中的國中生推理 | 2026-10-20 | B | k12 | 無摘要 |
| `10.1051/shsconf/202624002009`（SHS Web of Conferences）國中生課外使用生成式 AI 學英語 | 2026-10-21 | B | k12 | 樣本數未寫 |
| `10.53515/aijpkm.v7i1.303`（印尼社區服務期刊）小學 4–6 年級 157 人 AI 素養推廣 | 2026-10-21 | A | k12 | 摘要為印尼文 |
| `10.2080/2331186x.2026.2746221`（Cogent Education）學生修改 AI 輔助寫作的策略 | 2026-10-21 | B | 學段不明 | 無摘要 |

### 不匯入

- 邊界：J07 `10.1007/s11423-026-10735-7` Tawfik 等〈Data science for K-12: A design-based research study〉（資料科學課程，AI 只是五項設計要素之一）。
- 高教：J29 `feduc.2026.1908499`、`1948818`、`1998449`、`1978846`、`1934276`；J32 `s44217-026-02330-y`；J02 `caeai.2026.100689`；J48 `s41598-026-77394-9`（高職院校）。teacher_ed：J29 `feduc.2026.1913331`。
- 其他：J32 `s44217-026-02173-7`（成人與勞動力脈絡）；J29 `feduc.2026.1902338`（純理論）。
- C：J47 `educsci16101761`～`16101765`；J06 `jcal.70363`（無 AI）；J29 `1964887`、`1947608`、`1783442`；HSSC 與 Scientific Reports 其餘各筆。
- arXiv：2610.27626（模型基準，C）、2610.27448（大學）、2610.27162（年齡不明）、2610.27248（大學）。
- 首發早於窗口：`10.55677/craj/05-2026-vol03i10`、`10.21580/jieed.v6i2.32196` 等。
- 官方來源：香港〈創新科技及工業局常任秘書長出席香港政協青年聯會互動交流分享會致辭〉（10-21，對象為全社會，C）、〈粵港信息化合作專責小組第二十一次會議〉（C）；UNESCO〈50 emerging leaders…〉（adult）；中國教育部首頁 10-21 兩則（非教育或無 AI）。

## 週四必查（F2 試行來源）

每個來源記讀取狀態、列表最新項目日期、7 天內（10-15～10-22）新項目數、命中數；「讀取失敗」與「沒有新項目」分開寫。耗時為子代理概估。

### (a) 原試行來源

| 來源 | 讀取狀態 | 列表最新 | 7 天內新項目 | 命中 | 約耗時 |
|---|---|---|---|---|---|
| 德國 KMK | curl 200 | 2026-10-16 | 4 | 2（K-12 1 則已發 D20261022-04；文化部門 1 則 C） | 5 秒 |
| 芬蘭 EDUFI | **讀取失敗**：503 兩次，頁面為維運停機公告 | — | — | — | 1 秒 |
| TeachAI 各州指引追蹤 | curl 200 | 無逐州日期（頁尾 © 2025） | 首份快照，無前次可比 | — | 1 秒 |
| 愛沙尼亞教育研究部 RSS | curl 200 | 2026-10-21 | 5 | 1（部長京都論壇演講，科研政策，C） | 5 秒 |
| 印度 PIB RSS | **讀不到教育部 RSS**：英文目錄只有全部新聞稿、照片、專題三個 feed；新聞稿 feed 轉到印地文版，無日期、無部會欄位 | 無日期 | 無法判定 | 0 | 5 秒 |

TeachAI 快照存 `research/drafts/policy-tracker-snapshots/teachai-2026-10-22.txt`（43 筆：美國 30 州，另 13 個國家或地區），下週四起比對差異。印度 PIB 依來源檔「讀不到就移到下一列」，建議改列瀏覽器清單或停查，請管理者決定（見「需要管理者處理」）。

### (b) F2 風險關切與政策調整來源

| 來源 | 讀取狀態 | 列表最新 | 7 天內新項目 | 命中 | 約耗時 |
|---|---|---|---|---|---|
| UNICEF 新聞稿 | 200 | 2026-10-20 | 7 | 0 | 1 秒 |
| Education International 新聞 | 200 | 2026-10-21 | 3 | 1（亞太區大會，見下） | 10 秒 |
| 英國 ICO | 無頭 200 | 2026-10-20 | 1（英文、威爾斯文各一版；兒童資料外洩申誡，與 AI 無關） | 0 | 9 秒 |
| 法國 CNIL | **讀取失敗**：503 維護頁，3 次皆同 | — | — | — | 3 秒 |
| 美國 NEA 新聞稿 | 200 | 2026-10-01 | 0（沒有新項目） | 0 | 1 秒 |
| Ada Lovelace Institute | 200 | 有日期者最新 2026-06-15 | 0 | 0 | 3 秒 |
| 瑞典 Skolverket | 200 | 2026-10-20 | 1（職業教育） | 0 | 3 秒 |
| 西班牙教育部 | 200（代理多次 connection reset，重試成功） | 2026-10-20 | 7 | 0 | 20 秒 |
| 西班牙國家教育科技與師資培育研究所（INTEF） | 200（同上） | 2026-09-23 | 0（沒有新項目） | 0 | 40 秒 |
| 捷克教育部 | 無頭 200 | 2026-08-19 | 0（沒有新項目） | 0 | 19 秒 |
| 南非基礎教育部 | 200 | 2026-09-26 | 0（沒有新項目） | 0 | 5 秒 |

### (c) 第二批國家教育部門

| 來源 | 讀取狀態 | 列表最新 | 7 天內新項目 | 命中 | 約耗時 |
|---|---|---|---|---|---|
| 挪威 Udir | 無頭 200 | 2026-10-20 | 3 | 1（邊界：考試規定頁，只印最後修改日 16.10.2026，AI 段首發日不明；記入反思候選池） | 8 秒 |
| 丹麥 UVM | 無頭 200 | 2026-10-09 | 0（沒有新項目） | 0 | 13 秒 |
| 荷蘭 OCW | 無頭 200 | 2026-10-16 | 1 | 0 | 7 秒 |
| 荷蘭 Kennisnet | curl 200 | 2026-10-15 | 1 | 0（10-13〈公共 AI 服務規劃〉在 7 天外） | 1 秒 |
| 北愛爾蘭教育部 | curl 200 | 2026-10-19 | 1 | 0 | 1 秒 |
| 加拿大卑詩省教育與托育部 | curl 200 | 2026-09-08 | 0（沒有新項目） | 0 | 1 秒 |
| 智利 Mineduc | 無頭 200 | 2026-10-21 | 7 | 0 | 25 秒 |
| 墨西哥 SEP | curl 200（第 1、2 頁） | 2026-10-21 | 12 | 3（AI 培訓中心為青年職訓 adult；Boletín 336 部長致詞記入反思候選池；Boletín 338 兒少數位環境令，AI 只是平台技術，C） | 16 秒 |
| 義大利教育與功績部 | 無頭 200 | 2026-10-21 | 6 | 2（高峰會公告已發 D20261022-05；部長致詞同一活動，不另發） | 35 秒 |
| 印尼初中等教育部 | **讀取失敗**：無頭瀏覽器 60 秒、120 秒各逾時一次；curl 補讀首頁 200，5 則（10-15～17）無 AI，僅供參考 | 約 2026-10-17 | 約 5 | 0 | 180 秒 |

### (d) 丙：智庫與工會

| 來源 | 讀取狀態 | 列表最新 | 7 天內新項目 | 7 天內命中 | 較早命中 | 約耗時 |
|---|---|---|---|---|---|---|
| EPI | 200 | 2026-10-14 | 0 | 0 | 1（09-22，已在回溯清單） | 3 秒 |
| Brookings K-12 教育 | 200 | 2026-10-21 | 2 | 0（10-16 只一句提到 AI） | — | 8 秒 |
| Brookings 教育科技 | 200 | 2026-09-18 | 0 | 0 | 2（09-08 已在回溯清單；09-03 記入候選池） | 1 秒 |
| CRPE | 無頭 200 | 2026-10-20 | 1 | 1（日期有矛盾，記入候選池） | 2（09-03 已在回溯清單） | 15 秒 |
| AFT 新聞稿 | 200 | 2026-10-16 | 3 | 0 | 1（09-09 與微軟聯名，已在回溯清單） | 2 秒 |
| EI Worlds of Education | 200 | 2026-10-19 | 1 | 0 | 1（09-30 已在回溯清單） | 4 秒 |
| UNICEF Innocenti | 200（reports/view-all 403，未繞過） | 2026-10-09 | 0 | 0 | 2（皆已在回溯清單） | 16 秒 |
| UNESCO AI 與教育專頁 | 無頭 200（點 Load more） | 2026-10-19 | 3 | 3（10-19 已發 D20261022-06；10-15 CODEMAO、10-16 Karishma 不收，見下） | 2（09-08 已在回溯清單；10-02 內容溫和，不列） | 24 秒 |

### 命中處理

- **EI〈Education unions in the Asia-Pacific ready to organise for the future we want〉**（10-21，https://www.ei-ie.org/en/item/33179:education-unions-in-the-asia-pacific-ready-to-organise-for-the-future-we-want ）：亞太區大會新聞，AI 只是第二天一節，主題是區域大會，不發每日短訊。連結的 EIAP〈An Exploratory Study on AI in Education〉報告重點記入反思候選池。
- **UNESCO〈UNESCO and CODEMAO advance Africa-Asia cooperation in AI education through Youth AI Tour〉**（10-15）：署名欄為業者 CODEMAO，活動在 7 月，只寫機會；業者撰稿，不收。
- **UNESCO〈How Karishma from India broadens access to sexuality education via AI and digital channels〉**（10-16）：主角為網路創作者，與學校 AI 素養無直接關係，C。
- 反思候選池新增 5 則（EIAP 報告重點、CRPE〈State of the American Student 2026〉、墨西哥 SEP Boletín 336、Brookings 2026-09-03、挪威 Udir 考試規定），見 research/drafts/reflection-pool.md；其餘較早命中已在受限 repo 回溯清單。
- 線索（不屬本組監測範圍）：Brookings 09-08 與 AFT 09-09 都提到紐約市、洛杉磯 2026 年 9 月宣布的學生使用 AI 暫停措施；屬學區層級，不收，只記錄。

## 臺灣

### 查詢

| 來源 | 網址 | 狀態 | 列表最新項目 | 10-21 08:24 後新筆數 | AI 相關 |
|---|---|---|---|---|---|
| 教育部即時新聞 RSS | https://www.edu.tw/Rss_News.aspx?n=9E7AC85F1954DDA8 | 200 | 2026-10-21 16:49 | 4 | 3（1 則邊界、2 則不收） |
| 資訊及科技教育司 RSS | https://depart.moe.edu.tw/ED2700/Rss_News.aspx?n=727087A8A1328DEE | 200 | 2026-10-07 | 0 | — |
| 國教署即時新聞 | https://www.k12ea.gov.tw/Tw/News/K12eaNewsLlist?filter=9F92BBB7-0251-4CB7-BF06-82385FD996A0 | 200 | 2026-10-21 | 2（教育部 RSS 皆已有） | 1（順帶提及，不收） |
| 行政院公報開放資料 | https://gazette.nat.gov.tw/egFront/openData02.do?action=last | 200 | 115-10-21 期 | 10-21 期 9 筆，教育部、國教署 0 筆 | 0 |
| 行政院本院新聞 RSS | https://www.ey.gov.tw/RSS_Content.aspx?ModuleType=3 | 200 | 2026-10-21 17:17 | 2 | 0 |
| 國科會新聞資料 RSS | https://www.nstc.gov.tw/nstc/rss/newsdata | 200 | 2026-10-20 09:00 | 0 | — |
| 數位發展部新聞發布（第 1 頁） | https://moda.gov.tw/press/press-releases/372 | 200 | 2026-10-15 | 0 | — |
| 師資培育及藝術教育司 RSS | https://depart.moe.edu.tw/ED2600/Rss_News.aspx?n=E491D1720010EE05 | 200 | 2026-10-21 13:41 | 1（與教育部 RSS 同一則） | 1 則邊界 |
| 學生事務及特殊教育司 RSS | https://depart.moe.edu.tw/ED2800/Rss_News.aspx?n=9C2F51A0AD31862F | 200 | 2026-10-16 | 0 | — |

週四加查：

| 來源 | 狀態 | 最新項目／卷期 | 新項目 | AI 相關 |
|---|---|---|---|---|
| 教育部主管法規查詢系統（最新訊息、命令） | 200 | 2026-10-15 | 0（10-15 以前已在 10-17 補查判過） | 0 |
| 國家教育研究院最新消息（另看新聞公告 fid=15） | 200 | 2026-10-16 | 0 | — |
| 國科會人工智慧基本法專頁 | 200 | 更新日期 2026-02-10 | 未更新 | — |
| OpenAlex（institutions.country_code:TW，10-15 起，四組詞） | 200 | 去重 18 筆 | 教育相關 2 筆 | 1 筆大學（`10.1108/dta-02-2026-0223`）；1 筆國際段漏收（`jcal.70356`，已發 D20261022-03） |
| 教育科學研究期刊 | 200 | 71(3) 九月刊 | 無新卷期 | 0（AI 專刊 10-15 截稿，未出刊） |
| 教育研究集刊 | 200 | 72(2) 2026-06-30 | 無新卷期 | 0 |
| 當代教育研究季刊 | 200 | 34(3) 2026-09-30 | 無新卷期 | 0 |

行政院公報 10-21 期已補查（發布機關為個資會籌備處、財政部、農業部、核安會、環境部、勞動部、衛福部，與 AI 無關）；10-22 期查詢時尚未上線，10-23 補查。

### E5a 前 7 天回查（首次公開 10-15～10-22）

10-15～10-20 各則已在 10-16～10-21 查核紀錄判過，維持原判；無漏收。

### 邊界，不收

| 項目 | 首發日 | 不收理由 |
|---|---|---|
| 教育部〈鄭英耀部長引領師資培育新方向 攜手培育具教育愛、專業力及未來力的教師〉 https://www.edu.tw/News_Content.aspx?n=9E7AC85F1954DDA8&s=A395D1B6BA4DAB97 （師藝司 RSS 同刊） | 2026-10-21 13:41 | AI 段屬 A（T-PD、T-ETH、T-TEA），主要對象為師資培育之大學與師資生（teacher_ed），比照 10-16、10-19、10-20 前例不進每日與週報；月報可收。現職教師部分只有一句未來計畫 |

### 不收

- 教育部〈教育部促成比利時布魯塞爾自由大學訪臺 深化AI跨域交流與臺比高教合作〉（10-21 11:42，高教）；國教署〈跨越國界共享教育資源！ 國際教育交流聯盟與大分縣簽署教育交流合作備忘錄〉（10-21 09:44，AI 只順帶並列，C）；國教署〈115學年度全國高級中等學校學生技藝競賽月啟動〉（10-21 16:49，無 AI）；行政院 10-21 兩則（颱風、永續會）。

## 需要管理者處理

- **讀取失敗來源：** 芬蘭 EDUFI（503，網站因 PHP 漏洞停機）、法國 CNIL（503 維護）、印尼初中等教育部（無頭逾時），下週四重試。
- **印度 PIB：** 找不到教育部 RSS，新聞稿 RSS 轉印地文版且無日期與部會欄位。依來源檔規定應移到下一列；請決定改列週四瀏覽器清單或停查。
- **補查：** Federal Register 10-22 期、香港 10-22 公報、MEXT 10-20 記者會文字版、行政院公報 10-22 期，10-23 一併查。

## 請管理者用瀏覽器處理（2026-10-22）

1. https://doi.org/10.1080/10494820.2026.2750864 （J40 ILE〈Mathematics teachers' AI-TMPK〉，首發 10-20；T&F 403、Crossref 無摘要）：需要文章頁摘要截圖或全文 PDF。若對象為在職中小學教師，可補發摘要型（至 10-27）。
2. https://doi.org/10.1111/ejed.70912 （J49 EJED〈Being a Teacher in a Digital World〉，首發 10-21；Wiley 403）：需要全文 PDF 的研究對象段落（學段）。若為中小學教師，可補發摘要型（至 10-28）。
3. https://doi.org/10.1002/jcal.70356 （J06 JCAL〈Writing Motivation and Self‐Efficacy…〉，已發書目型 D20261022-03；Wiley 403）：需要全文 PDF 或文章頁摘要截圖，拿到後可升為摘要型（設計與對象；介入結果不寫）。
4. **週四政策列表掃描：** OECD、美國教育部、歐盟 European Education Area、紐西蘭教育部、新加坡教育部、法國國民教育部、阿聯教育部、澳洲教育部新聞室、澳洲教育部長新聞、eSafety、英國 NEU（AI 篩選頁 https://neu.org.uk/latest/press-releases?topic[679]=679 ）、美國 FTC 新聞稿（只看標題含 AI、children、teens、students、schools）。看 10-15 以後有無中小學 AI 相關新項目，有的話給連結即可。

前幾日清單（10-21 J08）已處理完畢，無延續項目。

## 既有候選池

本週（10-16～10-22）候選池 17 筆，皆 publish（A01～A17）。本週最後一天；下一份候選池 2026-10-23_2026-10-29 於 10-23 以 `node research/scaffold-weekly.js 2026-10-23` 建立。
