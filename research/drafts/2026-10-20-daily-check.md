# 每日短訊查核紀錄：2026-10-20（3 則，含管理者提供全文後補登 2 則）

> 每日短訊例行作業，由排程觸發，在每日短訊專用 session 執行。檢索由同 session 三個子代理（國際研究、國際政策、臺灣中央來源）執行，判讀由本 session 複核。查詢時間 2026-10-20T00:24Z–00:45Z（UTC）。請求未帶 email 或 mailto；遇 403、Client Challenge 或驗證頁都未繞過。結果：**發布 1 則**（國際 D20261020-01，書目型；臺灣 0 則）。今天週二，週四專屬來源不查；澳洲三站已改列週四瀏覽器清單。

## 國際

### 查詢

| 來源 | 查詢 | 狀態 | 結果 |
|---|---|---|---|
| Crossref | `filter=from-created-date:2026-10-19,until-created-date:2026-10-19,type:journal-article`，六組 `query.bibliographic`（AI literacy／artificial intelligence literacy／generative AI school students／AI education teachers K-12／ChatGPT secondary school／artificial intelligence primary school children），每組 rows=40 | 前五組 200；第 6 組 429 兩次、第三次 200 | 連同下兩組去重 337 筆；同時含 AI 與學校／學生／教師字詞者 61 筆 |
| Crossref（proceedings-article） | 同日期，`artificial intelligence school students teachers`，rows=40 | 200 | 1 筆相關（IEEE，高教），不收 |
| Crossref（監測期刊 ISSN 補查） | 同日期加 22 本監測期刊 ISSN（J01、J02、J03、J04、J05、J06、J07、J08、J09、J13、J14、J29、J31、J32、J33、J35、J36、J37、J40、J41、J47、J48）；帶關鍵詞 `artificial intelligence generative AI ChatGPT` rows=60，另不帶關鍵詞 rows=200 | 200 | 帶關鍵詞 9 筆；全量 111 筆（Scientific Reports 55、HSSC 18、Education Sciences 17、Frontiers in Education 12、BJET 3、ETRD 2、EAIT 2、JSET 1、Discover Education 1） |
| 出版者頁面（各試一次） | Springer 3 筆、Wiley 1 筆 | Springer 皆 Client Challenge；Wiley 403 | 未讀到 |
| OpenAlex | 上述 4 筆 DOI | 404（尚未收錄） | — |
| arXiv API（https） | ① `abs:"AI literacy" OR abs:"artificial intelligence literacy"`（40）② `(abs:"generative AI" OR abs:ChatGPT OR abs:"large language model") AND (abs:"K-12" OR abs:"high school" OR abs:"middle school" OR abs:"primary school" OR abs:"secondary school" OR abs:elementary)`（40）③ AI 詞 × school／teachers／students／classroom／children／K-12 × cs.CY／HC／AI／CL（100）；皆依送件日排序 | 200 | 最新 v1 為 10-16；新見 2610.22894、23149、23530、23651、22949 皆不合格 |
| alphaXiv | discover_papers，2026-10-13 起（只作發現），以 arXiv id_list 核對 | ok | 5 筆，3 筆已判過，2 筆不合格 |
| GOV.UK | Search API（DfE 66、Ofqual 13、Ofsted 10 筆，10-13 起），Content API 逐筆讀 88 筆 | 200 | 5 筆有 AI 字詞，皆已判過或為更新日 |
| Federal Register | `curl -g`：term 三組與 ED 機關篩選（10-13 起）；10-19、10-20 期；public inspection | 200 | 10-19 期 146 筆、ED 0 筆；10-20 期 API 尚未上線，public inspection 的 ED 2026-21427（IES 經費公告）無 AI |
| MEXT | 報道発表、新着 | 200 | 新着 10-19 四筆、10-20 一筆，皆不收 |
| 中國教育部 | 工作動態、部領導活動、s5147、s5148、s5987、中央文件、教育部文件；34 篇原頁 | 200 | 最新 10-19；無 A／B 項目 |
| 香港政府新聞公報 | 10-19、10-20 中英文列表 | 200 | 10-19 中英文各 12 則，無 AI 教育項目；10-20 讀取時（香港 08:27）未上載 |
| 韓國 KICE | 보도자료列表 | 200 | 最新 10-16，已判過 |
| 韓國教育部 | 보도자료列表 | 200（第一次即成功） | 最新 10-19，題名皆與 AI 無關 |
| KERIS | 보도자료列表 | 200 | 最新 10-15，已判 C |
| UNESCO | `/en/newsroom`（本日 curl 讀得到列表；WebFetch 對照一致），curl 讀 6 篇原頁 | 200 | 10-19 新聞 4 則，1 則邊界（見下） |
| Eurydice 新聞（試行） | https://eurydice.eacea.ec.europa.eu/news | 200 | 最新 10-16，皆已判過；命中 0 |

### 發布

| 編號 | 來源 | 首發日（依據） | 範圍 | 對象 | 型態 |
|---|---|---|---|---|---|
| D20261020-01 | `10.1111/bjet.70094` Diordiev、Stenberdt、Makransky〈Prompt‐based emotional scaffolding in generative AI: Effects on self‐regulated learning and socio‐emotional outcomes〉，British Journal of Educational Technology（J04） | 2026-10-18（首發日依 Crossref published-online，出版社頁讀取失敗：Wiley 403；無更早預印本） | B（S-LRN） | k12（Crossref 摘要載高中學生 144 人，隨機分派三組） | 書目型（摘要只讀到 Crossref 版；介入研究，結果不寫入） |

第二輪由本 session 重新讀 Crossref 紀錄核對題名、DOI、日期、期刊與對象，兩輪一致。候選池 W2026-10-16-A07；知識庫 KB-2026-0388（KR-13988～13996）。

### E5a 前 7 天回查（政策，首次公開 10-13～10-20）

10-13～10-18 與 AI 相關的政策項目皆已在候選池或 10-15～10-19 查核紀錄判過，無漏收。10-19 後新出現者只有下列 UNESCO 一則。

### 邊界，不發

| 項目 | 首次公開 | 判定 | 不發理由 |
|---|---|---|---|
| UNESCO〈UNESCO's Digital Transformation Collaborative: Charting how AI is reshaping education systems〉 https://www.unesco.org/en/articles/unescos-digital-transformation-collaborative-charting-how-ai-reshaping-education-systems | 2026-10-19（datePublished 2026-10-19T15:39:09+0200） | A 與活動報導的邊界（T-ETH、T-BAS、T-PD）；other_stakeholders；official_commentary；INTL | 報導 2026-09-11 Digital Learning Week 的 Strategy Lab 討論，非政策、無具體決定，活動早於窗口五週以上（比照 10-16 CODEMAO 前例）；週報如需背景可參考 |

### 待補（監測清單內，未達門檻）

| 項目 | 首次公開 | 範圍 | 對象 | 說明 |
|---|---|---|---|---|
| J07 `10.1007/s11423-026-10716-w` Ran、Zhang、Liu、Li、Zhou〈AIgnite: an educational toolkit for supporting primary students' AI literacy cultivation〉，Educational Technology Research and Development | 2026-10-19（Crossref published-online；Springer Client Challenge；無更早預印本） | 依題名 A（S-BAS） | 依題名 k12（primary students），樣本不明 | Crossref 無摘要、OpenAlex 404；只憑題名判對象，暫不發。見「請管理者用瀏覽器處理」 |
| J05 `10.1007/s10639-026-14126-6`（NotebookLM 與任務—科技契合模型） | 2026-10-19（Crossref） | 不明 | 不明（依題名可能為大學） | 無摘要，Springer Challenge |
| J32 `10.1007/s44217-026-02267-2`（阿曼小學教師創新教學實踐） | 2026-10-19（Crossref） | 不明（題名無 AI） | 可能 k12 | 無摘要，暫不追 |

### 列觀察（出處不在監測清單）

| 項目 | 首次公開 | 範圍 | 對象 | 說明 |
|---|---|---|---|---|
| `10.1155/ahci/8302982`〈Psychological Mechanisms of Generative AI Discontinuance Intention Among Chinese K–12 Teachers〉（Advances in Human-Computer Interaction，Wiley／Hindawi） | 2026-10-18（Crossref） | A／B（T-TEA、T-ETH） | k12（中國中小學在職教師 256 人） | 問卷 SEM 加 fsQCA；摘要只有 Crossref 版；請管理者決定是否收此出處 |
| `10.59075/jsrd.v7i8.614`（Journal of Social Research Development） | 2026-10-19 | 不明 | k12（9–12 年級教師） | 摘要為研究計畫（will be employed），建議不發 |
| `10.33600/ircj.54.4.2026.15`〈The Gap Between AI Policy and AI Practice in Schools〉（Illinois Reading Council Journal） | 2026-10-19 | 不明 | 不明 | 無摘要 |
| `10.1038/s44220-026-00735-0`〈Improving safety frameworks for generative AI and youth well-being policy〉（Nature Mental Health） | 2026-10-19 | A（S-ETH）或 C | 不明 | 評論類，無摘要 |
| `10.1080/08924562.2026.2716607`〈PEARL to the Rescue: An AI Assistant Designed for Physical Education Teachers〉（Strategies） | 2026-10-19 | 不明 | 不明 | 無摘要 |

### 不匯入

- 高教、職前、成人：J05 `s10639-026-14056-3`；J47 `educsci16101753`、`16101755`、`16101752`（LLM 模擬學生供師培練習）；J29 `feduc.2026.1931442`、`1948805`、`1925782`、`1933319`；`bs16101942`、`aijeps.2026.7146`、`001c.172637`、`fjst.v5i9.161` 等；arXiv 2610.23530（EduWild，大學生 200 人）、2610.22949（社區學院物理）、2610.23149（大學生）。
- 首發早於窗口：`tjye.2026.34.5.925`（中學與高中學生 3,854 人，A，但首發 2026-09-30）；`10.37478/mahajana.v7i3.8693`（10-05）等。
- C：J37 `s10956-026-10362-0`（BERT 自動評分，大學）；J29 `feduc.2026.2011570`；Scientific Reports 55 筆、HSSC 18 筆；arXiv 2610.22894、2610.23651 等。
- BJET 另兩筆為期號資訊，非論文。
- 官方來源：GOV.UK Ofqual 署長 10-16 演講（管理者已決定）、教育大臣 10-15 演講與 DUAA 清單（C）、〈Data protection in schools〉（10-14 更新日）、T Levels 諮詢結果（首發 06-08）、Ofsted 10-16 與 10-19 演講及 DfE Update（無 AI）；MEXT〈デジタルな形態を含む教科書の発行・採択等の指針に関する検討会議（第6回）〉（會議預告，無 AI）、学校安全部会、大学分科会（higher_ed）、10-20 大臣談話；中國教育部〈全球职业教育携手奔赴未来的崭新起点〉（10-19，C）、〈《世界职业技术教育标准框架》发布〉（10-18，C）等；韓國教育部 10-19 課後托育 QR 碼；UNESCO 10-19 其餘三則；香港 10-19 各則。

## 臺灣

### 查詢

| 來源 | 網址 | 狀態 | 涵蓋最新日期 | 10-19 08:26 後新筆數 | AI 相關 |
|---|---|---|---|---|---|
| 教育部即時新聞 RSS | https://www.edu.tw/Rss_News.aspx?n=9E7AC85F1954DDA8 | 200 | 2026-10-19 15:51 | 3 | 1 則邊界，2 則順帶提及 |
| 資訊及科技教育司 RSS | https://depart.moe.edu.tw/ED2700/Rss_News.aspx?n=727087A8A1328DEE | 200 | 2026-10-07 | 0 | — |
| 國教署即時新聞 | https://www.k12ea.gov.tw/Tw/News/K12eaNewsLlist?filter=9F92BBB7-0251-4CB7-BF06-82385FD996A0 | 200 | 2026-10-18 | 0 | — |
| 行政院公報開放資料 | https://gazette.nat.gov.tw/egFront/openData02.do?action=last （對照 openData03.do 與首頁） | 200 | 115-10-19 期（第 032 卷第 193 期） | 10-19 期 13 筆，教育部、國教署 0 筆 | 0 |
| 行政院本院新聞 RSS | https://www.ey.gov.tw/RSS_Content.aspx?ModuleType=3 | 200 | 2026-10-18 19:30 | 0 | — |
| 國科會新聞資料 RSS | https://www.nstc.gov.tw/nstc/rss/newsdata | 200 | 2026-10-19 13:00 | 1 | 0 |
| 數位發展部新聞發布（第 1 頁） | https://moda.gov.tw/press/press-releases/372 | 200 | 2026-10-15 | 0 | — |
| 師資培育及藝術教育司 RSS | https://depart.moe.edu.tw/ED2600/Rss_News.aspx?n=E491D1720010EE05 | 200 | 2026-10-19 10:15 | 1（與教育部 RSS 同一則） | 1 則邊界 |
| 學生事務及特殊教育司 RSS | https://depart.moe.edu.tw/ED2800/Rss_News.aspx?n=9C2F51A0AD31862F | 200 | 2026-10-16 | 0 | — |

行政院公報 10-19 期已補查（10-19 清晨 521、08:26 時尚未上線）；10-19 期教育科技文化篇只有文化部令與運動部令，與 AI 無關。10-20 期查詢時尚未出刊，10-21 補查。

### E5a 前 7 天回查（首次公開 10-13～10-20）

10-13～10-18 各則已在 10-17 補查紀錄與 10-18、10-19 查核紀錄判過，維持原判；10-19 新項目見下。無漏收。

### 邊界，不收

| 項目 | 首發日 | 不收理由 |
|---|---|---|
| 教育部〈教育部率師培專家學者赴新加坡考察 聚焦AI時代師資培育與教育科技創新實踐〉 https://www.edu.tw/News_Content.aspx?n=9E7AC85F1954DDA8&s=4B91120FDBD65265 （師藝司 RSS 同刊） | 2026-10-19 10:15 | 內容屬 A（T-PD、T-TEA、T-ETH），但參訪團為 13 位師培專家學者，目標為精進師培 AI 課程架構，主要對象為 teacher_ed（比照 10-17 師資培育國際學術研討會），不進每日與週報；月報可收 |

### 不收

- 教育部（青年署）〈大專校院職涯輔導計畫成果分享會 展現AI與多元共融創新成效〉（10-19 15:51）：higher_ed。
- 教育部〈「美感」就是符合你的學習需求！ 從園藝實作到藝術展演，美感校園開箱〉（10-19 15:40）：AI 只在背景句，C。
- 國科會〈「車門一開，未來展開」 2026臺灣科普環島列車 盛大啟程〉（10-19 13:00）：命中「智慧醫療」，C。

## 需要管理者處理

- **出處不在監測清單的觀察項目：** `10.1155/ahci/8302982`（中國中小學在職教師 256 人，首發 10-18）最接近收錄條件，請決定是否收此出處；7 天內至 10-25。
- **補查：** 香港 10-20 公報、Federal Register 10-20 期、行政院公報 10-20 期，10-21 一併查。

## 請管理者用瀏覽器處理（2026-10-20）

1. https://doi.org/10.1007/s11423-026-10716-w （J07 ETRD〈AIgnite: an educational toolkit for supporting primary students' AI literacy cultivation〉，首發 10-19；Springer Client Challenge、Crossref 無摘要）：需要文章頁截圖或全文 PDF 的摘要與研究對象。若對象為小學生，可補發摘要型（至 10-26）；若有成效評估，結果不寫入。
2. https://doi.org/10.1111/bjet.70094 （J04 BJET，D20261020-01 已以書目型發布）：需要出版者頁或全文 PDF 的摘要，拿到後可補成摘要型；介入研究，只寫設計與對象。

前幾日清單（10-16～10-19）各項皆已處理完畢，無延續項目。

## 既有候選池

本週（10-16～10-22）候選池 9 筆，皆 publish（A01～A09；A08、A09 為補記後新增）。

## 補記（2026-10-20，管理者提供全文與決定後）

- **D20261020-01 改為摘要型：** 管理者提供出版者 PDF（British Journal of Educational Technology 2026;00:1–31，Received 2025-05-23、Accepted 2026-09-29，摘要與 Crossref 相同）。依摘要第 2、3、5 句改為作者摘要歸屬型，只寫框架、設計、對象與資料蒐集時點，不寫比較結果。內文載對象為丹麥兩所高中選修心理學的學生、17–20 歲。第二輪由隔離子代理對照，判定一致。
- **補登 D20261020-02：** J07 `10.1007/s11423-026-10716-w`〈AIgnite〉。管理者提供出版者 PDF（Received 2025-09-08、Accepted 2026-09-02，PDF 無上線日），首發日依 Crossref published-online 2026-10-19（出版社頁 Client Challenge）。摘要寫明對象為國小四至六年級學生；使用者研究 42 人平均 10.5 歲，在地方圖書館工作坊進行。A（S-BAS、S-ETH），k12。以摘要第 3、4、6、7 句撰寫，第 7 句只取參與人數、不寫成效。第二輪由隔離子代理對照，判定一致，依建議調整教具組成用字。候選池 W2026-10-16-A08；知識庫 KB-2026-0389（KR-13997～14007）。
- **補登 D20261020-03：** `10.1155/ahci/8302982`〈Psychological Mechanisms of Generative AI Discontinuance Intention Among Chinese K–12 Teachers〉，Advances in Human-Computer Interaction。管理者回覆「這論文可以收」，同意收錄此出處（不在監測清單）；並提供出版者 PDF（Received 2026-06-08、Accepted 2026-09-23，PDF 無上線日），首發日依 Crossref published-online 2026-10-18（Wiley 403）。期刊概況（OpenAlex，2026-10-20）：Wiley（原 Hindawi）開放取用期刊，列於 DOAJ，累計 336 篇、h-index 41，2025 年 14 篇、2026 年至今 17 篇；Crossref 查無本刊撤稿通知。對象為中國中小學在職教師 256 人（國小 90、國中 88、高中 78）。A（T-ETH、T-TEA），k12。以摘要第 1–4 句撰寫，不寫相關分析結果。第二輪由隔離子代理對照，判定一致，依建議潤飾兩處用字。候選池 W2026-10-16-A09；知識庫 KB-2026-0390（KR-14008～14017）。
- 本頁加 `revised_on: 2026-10-20`，並在 `publication/corrections.json` 記一筆（daily-2026-10-20-r1）。
- 三份 PDF 存私人 repo `from-editor-session/daily-pdfs/`（KB-2026-0388__bjet-70094.pdf、KB-2026-0389__etrd-s11423-026-10716-w.pdf、KB-2026-0390__ahci-8302982.pdf），已登記於 FULLTEXT-INDEX.md。
- 瀏覽器清單兩項皆已處理完畢；「需要管理者處理」的出處決定已完成。
