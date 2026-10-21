# 每日短訊查核紀錄：2026-10-21（1 則）

> 每日短訊例行作業，由排程觸發，在每日短訊專用 session 執行。檢索由同 session 三個子代理（國際研究、國際政策、臺灣中央來源）執行，判讀由本 session 複核。查詢時間 2026-10-21T00:24Z–00:31Z（UTC）。請求未帶 email 或 mailto；遇 403、Client Challenge 或驗證頁都未繞過。結果：**發布 1 則**（國際 D20261021-01，官方摘要型；臺灣 0 則）。今天週三，週四專屬來源不查。規則凍結至 11/03（見 research/exceptions.md）。

## 國際

### 查詢

| 來源 | 查詢 | 狀態 | 列表最新／結果 |
|---|---|---|---|
| Crossref | `filter=from-created-date:2026-10-20,until-created-date:2026-10-20,type:journal-article`，六組 `query.bibliographic`（同 10-20），每組 rows=40 | 200 | 連同下兩組去重 424 筆；題名同時含 AI 與學校類字詞者 60 筆；監測清單內 K–12 相關只有 J08 一筆（待補） |
| Crossref（proceedings-article） | 同日期，`artificial intelligence school students teachers`，rows=40 | 200 | iSTEM-Ed、希臘 Pan-Hellenic 兩會議，不在清單、無摘要 |
| Crossref（監測期刊 ISSN 補查） | 同日期，22 本監測期刊（34 個 ISSN）；帶關鍵詞 rows=60、不帶 rows=200 | 帶關鍵詞第一次 429，重試 200 | 帶關鍵詞 11 筆；全量 201 筆（Scientific Reports 162、Frontiers in Education 11、HSSC 10、Education Sciences 5、Discover Education 5 等） |
| 出版者頁面（各試一次） | T&F 1、Springer 3、Frontiers 1 | T&F 403；Springer 皆 Client Challenge；Frontiers 200 | 只讀到 Frontiers |
| OpenAlex | 6 個 DOI | J05、J32 200；其餘 404 | J32 有摘要 |
| arXiv API（https） | 三組（同 10-20），依送件日排序，40／40／100 筆 | 200 | 最新 v1 10-19；10-14 後新見 4 筆皆不合格 |
| alphaXiv | discover_papers，2026-10-14 起（只作發現） | ok | 7 筆，新見 2610.26758 經 arXiv 核對（首發早於窗口） |
| GOV.UK | Search API（DfE 58、Ofqual 7、Ofsted 10 筆，10-14 起），Content API 逐筆讀 74 筆 | 200 | DfE 最新 10-20；5 筆有 AI 字詞，皆已判過或為更新日；DfE 10-20 新增 4 筆無 AI |
| Federal Register | `curl -g`：term 三組、ED 篩選（10-14 起）、10-20 與 10-21 期、public inspection | 200 | 10-20 期 82 筆、ED 1 筆（IES 特教研究經費公告，govinfo 版全文無 AI）；10-21 期 API 未上線；public inspection ED 2026-21493（IDEA Part C 資料蒐集）無 AI |
| MEXT | 報道発表、新着 | 200 | 最新 10-21；無 AI 教育項目 |
| 中國教育部 | 工作動態、部領導活動、s5147、s5148、s5987、中央文件、教育部文件；10 篇原頁 | 200 | 最新 10-20；無 A／B 項目 |
| 香港政府新聞公報 | 10-20、10-21 中英文列表 | 200 | 10-20 英 31、中 33 則，無 AI 教育項目；10-21 讀取時各 3 則 |
| 韓國 KICE | 보도자료列表 | 第 1、2 次 reset，第 3 次 200 | 最新 10-20；1 則新項目判 C（見不匯入） |
| 韓國教育部 | 보도자료列表；4 則附件 hwpx | 200（附件下載 1 次 reset，重試成功） | 最新 10-20；**1 則發布**（D20261021-01），其餘 3 則 C |
| KERIS | 보도자료列表 | 200 | 最新 10-15，已判 C |
| UNESCO | `/en/newsroom`（curl 可讀）；6 篇原頁 | 200 | 最新 10-20；1 則 higher_ed |
| Eurydice 新聞（試行） | https://eurydice.eacea.ec.europa.eu/news | 200 | 最新 10-16，無新項目；命中 0 |

### 發布

| 編號 | 來源 | 首發日（依據） | 範圍 | 對象 | 型態 |
|---|---|---|---|---|---|
| D20261021-01 | 韓國教育部 보도자료〈아시아태평양경제협력체(APEC) 학교 경영자, 함께 모여 인공지능 기반 교육 혁신의 길을 찾다〉 https://www.moe.go.kr/boardCnts/viewRenew.do?boardID=294&boardSeq=107458&lev=0&searchType=null&statusYN=W&page=1&s=moe&m=020402&opType=N | 2026-10-20（登錄日；附件 배포 10-20 08:00、網路解禁 10-20 12:00 KST） | A（T-BAS、T-PD、T-TEA；對象為其他教育關係人的 AI 素養活動公告） | other_stakeholders（APEC 會員經濟體中小學校長與副校長 52 人，國內 28、國外 24，含臺灣 2 人） | 官方摘要型；training_event；KR |

研習預告（10-21～10-23），摘要寫「將於…舉辦」；新聞稿所述規模擴大與官員期望不寫入。第二輪由隔離子代理對照韓文原文，判定一致，依建議改為預告語氣並把소프트랩譯為「Soft Lab」。候選池 W2026-10-16-A10；知識庫 KB-2026-0391（KR-14018～14027）。

### E5a 前 7 天回查（政策，首次公開 10-14～10-21）

10-14～10-19 項目皆已在 10-15～10-20 查核紀錄判過，無漏收；10-20 以後新出現的 AI 相關政策項目只有上列韓國教育部一則。

### 待補（監測清單內，未達門檻）

| 項目 | 首次公開 | 範圍 | 對象 | 說明 |
|---|---|---|---|---|
| J08 `10.1080/15391523.2026.2749067` Lu、Zhang〈Critical Fairness Literacy for PK–12 teachers: a fairness-specific dimension of teacher AI competency〉，Journal of Research on Technology in Education | 2026-10-20（Crossref published-online；T&F 403） | 依題名 A（T-ETH） | 依題名 PK–12 教師，樣本與設計不明（可能為概念性論文） | Crossref 無摘要、OpenAlex 404；只憑題名判對象，暫不發。見「請管理者用瀏覽器處理」 |
| J05 `10.1007/s10639-026-14126-6`〈Are AI Multimodal Learning Assistants Up to the Task? Evaluating NotebookLM Through the Task-Technology Fit Model〉 | 2026-10-19（Crossref） | 不明 | 依題名與作者推測為大學 | 複查仍無摘要；不再追 |

### 列觀察（出處不在監測清單）

| 項目 | 首次公開 | 範圍 | 對象 | 說明 |
|---|---|---|---|---|
| `10.61838/kman.jayps.6307`（Journal of Adolescent and Youth Psychological Studies）AI literacy 調節生成式 AI 依賴與學業自我效能 | 不明（Crossref 只標 2026） | A（S-LRN、S-ETH） | k12（加拿大中學生 612 人） | 首發日無法確定 |
| `10.1080/19404158.2026.2742132`（Australian Journal of Learning Difficulties）AI 寫字介入，中文書寫障礙兒童 | 2026-10-20（Crossref） | B | k12（兒童） | 無摘要 |
| `10.54254/2753-7064/2026.37831`（Communications in Humanities Research）生成式 AI 與高中英文教學 | 2026-10-20 | A（T-TEA） | k12（高中英文教師 3 人） | 出處品質需另評估 |
| `10.47772/ijriss.2026.1026edu0648`（IJRISS） | 2026-10-19 | B | k12（高中學生 252 人） | 摘要只有 Crossref 版 |

### 不匯入

- 高教：J04 `bjet.70096`（大學生 64 人）、J29 `feduc.2026.1924557`（大學生）、J06 `jcal.70360`（高教範疇回顧）；J01 `compedu.2026.105771`（程式設計情緒，可能為大學，無上線日）。
- C：J32 `10.1007/s44217-026-02267-2`（OpenAlex 摘要可讀：阿曼小學教師創新教學 PLS-SEM，無 AI）；J09 `s10758-026-10044-1`、J07 `s11423-026-10726-8`、Scientific Reports 各筆、Education Sciences 5 筆。
- 首發早於窗口：arXiv 2610.26758〈AI Misconception and Adoption Among Indonesian K-12 Teachers〉，同一研究已於 2026-06-27 刊於 AIED LNCS（`10.1007/978-3-032-29773-0_20`）。
- arXiv 其他：2610.25244（大學程式課）、2610.24335（牙科）、2610.24259（C）、2610.25192（學段不明）。
- 官方來源：KICE〈PISA·ICILS 상위국의 성취 특성 분석(연구리포트 14호 발간)〉（10-20，k12，主題為一般數位素養與運算思維，本文無 AI，判 C；附件報告 PDF 未讀）；韓國教育部 10-20 其他三則（點字教科書、初中等教育法施行令、2027 修能）無 AI；UNESCO〈DIGITAfrica Summer School advances digital research capacity in Senegal〉（higher_ed）與 10-20 其他三則；中國教育部〈教育部等三部门部署防控儿童青少年高度近视〉（無 AI）、〈为建设教育强国…作出新贡献〉（10-19，一句 AI、屬大學，C）；香港 10-20 創科局長與行政長官致辭（C）；MEXT 10-20、10-21 各則。

## 臺灣

### 查詢

| 來源 | 網址 | 狀態 | 列表最新項目 | 10-20 08:24 後新筆數 | AI 相關 |
|---|---|---|---|---|---|
| 教育部即時新聞 RSS | https://www.edu.tw/Rss_News.aspx?n=9E7AC85F1954DDA8 | 200 | 2026-10-20 13:43 | 3 | 1 則邊界（師培） |
| 資訊及科技教育司 RSS | https://depart.moe.edu.tw/ED2700/Rss_News.aspx?n=727087A8A1328DEE | 200 | 2026-10-07 | 0 | — |
| 國教署即時新聞 | https://www.k12ea.gov.tw/Tw/News/K12eaNewsLlist?filter=9F92BBB7-0251-4CB7-BF06-82385FD996A0 | 200 | 2026-10-20 | 1（教育部 RSS 已有） | 0 |
| 行政院公報開放資料 | https://gazette.nat.gov.tw/egFront/openData02.do?action=last （對照 openData03.do） | 200 | 115-10-20 期 | 10-20 期 12 筆，教育部、國教署 0 筆 | 0 |
| 行政院本院新聞 RSS | https://www.ey.gov.tw/RSS_Content.aspx?ModuleType=3 | 第一次 reset，重試 200 | 2026-10-20 20:38 | 3 | 2 則一般 AI 產業政策，不收 |
| 國科會新聞資料 RSS | https://www.nstc.gov.tw/nstc/rss/newsdata | 200 | 2026-10-20 09:00 | 1 | 0 |
| 數位發展部新聞發布（第 1 頁） | https://moda.gov.tw/press/press-releases/372 | 200 | 2026-10-15 | 0 | — |
| 師資培育及藝術教育司 RSS | https://depart.moe.edu.tw/ED2600/Rss_News.aspx?n=E491D1720010EE05 | 200 | 2026-10-20 13:43 | 1（與教育部 RSS 同一則） | 1 則邊界 |
| 學生事務及特殊教育司 RSS | https://depart.moe.edu.tw/ED2800/Rss_News.aspx?n=9C2F51A0AD31862F | 200 | 2026-10-16 | 0 | — |

行政院公報 10-20 期已補查（發布機關為金管會、財政部、經濟部、農業部、環境部、勞動部，與 AI 無關）；10-21 期查詢時尚未上線，10-22 補查。

### E5a 前 7 天回查（首次公開 10-14～10-21）

10-14～10-19 各則已在 10-17 補查紀錄與 10-18～10-20 查核紀錄判過，維持原判；國教署 10-15 運動教練增能研習當時未登記，核對詳細頁無 AI。無漏收。

### 邊界，不收

| 項目 | 首發日 | 不收理由 |
|---|---|---|
| 教育部〈115年度師資培育大學主管聯席會議 智匯師培・韌性領航 攜手共探AI驅動教育轉型〉 https://www.edu.tw/News_Content.aspx?n=9E7AC85F1954DDA8&s=AD3F5EEDB3035063 （師藝司 RSS 同刊） | 2026-10-20 13:43 | 內容屬 A（T-PD、T-TEA），對象為師資培育之大學主管（teacher_ed），比照 10-16、10-19 前例不進每日與週報；月報可收 |

### 不收

- 教育部〈「復原與再生」串聯國際博物館對話 ICME 2026科工館登場〉（10-20 11:39，C）；教育部／國教署〈深化臺比教育夥伴關係！…中小學線上交流會〉（10-20 09:56，無 AI）；行政院 10-20 三則（一般 AI 產業政策或與 AI 無關）；國科會〈《人文沙龍系列》我們為什麼說「廢話」？〉（10-20，無關）。

## 需要管理者處理

- **補查：** Federal Register 10-21 期、香港 10-21 後段公報、MEXT 10-20 記者會文字版、行政院公報 10-21 期，10-22 一併查。

## 請管理者用瀏覽器處理（2026-10-21）

1. https://doi.org/10.1080/15391523.2026.2749067 （J08 JRTE〈Critical Fairness Literacy for PK–12 teachers〉，首發 10-20；T&F 403、Crossref 無摘要）：需要文章頁截圖或全文 PDF 的摘要與研究設計。若為以中小學教師為對象的研究或框架，可補發摘要型（至 10-27）。

前幾日清單（10-16～10-20）各項皆已處理完畢，無延續項目。

## 既有候選池

本週（10-16～10-22）候選池 10 筆，皆 publish（A01～A10）。
