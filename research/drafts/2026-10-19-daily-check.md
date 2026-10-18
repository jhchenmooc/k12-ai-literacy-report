# 每日短訊查核紀錄：2026-10-19（0 則，提前作業）

> 每日短訊例行作業，在每日短訊專用 session 執行。管理者 2026-10-19 06:20（臺灣時間）在編輯 session 要求「今天的日報先提前做」，由編輯 session 轉達（schedule-recovery.md 的重跑做法）。檢索由同 session 三個子代理執行，判讀由本 session 複核。查詢時間 2026-10-18T22:24Z–22:45Z（UTC；臺灣 10-19 06:24–06:45）。請求未帶 email 或 mailto；遇 403、Client Challenge 或驗證頁都未繞過。結果：**國際、臺灣皆無合格短訊，不建頁、不登記**。本日依管理者 2026-10-18 決定：澳洲三站不再每日以程式查（改列週四瀏覽器清單）；Crossref 首發日例外延伸到出版者頁與 PDF 只標年份或年月的情形（PR #323 合併前以編輯 session 轉達的決定「甲」為準）。

**提前作業的限制：** 查詢時間在週一清晨，香港 10-19 新聞公報、MEXT、中國教育部週一發布、Federal Register 10-19 期與行政院公報 10-19 期都還沒上線或讀不到。08:22 排程觸發時重查提前作業之後才出現的項目，有合格者同日補登。

## 國際

### 查詢

| 來源 | 查詢 | 狀態 | 結果 |
|---|---|---|---|
| Crossref | `filter=from-created-date:2026-10-18,until-created-date:2026-10-18,type:journal-article`，六組 `query.bibliographic`（同 10-11），每組前 40 筆 | 200 | 連同下兩組去重 220 筆；同時含 AI 與學校／學生／教師字詞者 37 筆；監測清單命中 0（10-18 為週日，登記量低）；`10.1016/j.tsc.2026.102400` 依不收出處排除 |
| Crossref（proceedings-article） | 同日期，`artificial intelligence school students teachers`，rows=40 | 200 | 1 筆（SPIE，高教數學），不收 |
| Crossref（監測期刊 ISSN 補查） | 同日期，22 本監測期刊 ISSN，帶關鍵詞 rows=60；另不帶關鍵詞全量 rows=200 | 200 | 帶關鍵詞 1 筆、全量 55 筆（Scientific Reports 54、HSSC 1），皆與教育 AI 無關 |
| Crossref／OpenAlex／出版者頁（複查） | J32 `s44217-026-02307-x`、`s44217-026-02317-9`，J01 `compedu.2026.105767` | Springer Client Challenge；ScienceDirect 403 加驗證頁；api.elsevier.com 429 | J32 兩筆依 OpenAlex 摘要皆屬大學；J01 待補 |
| arXiv API（https） | 兩組標準查詢各 40 筆、加廣查詢 100 筆，依送件日排序 | 200 | 最新 v1 為 10-15；10-12 後新見者皆屬 C |
| alphaXiv | discover_papers，2026-10-12 起（只作發現） | ok | 8 筆；2610.19654、2610.21062 經 arXiv 核對屬 C；1 筆 arXiv 查無，不採用；其餘已判過 |
| GOV.UK | Search API（DfE 61、Ofqual 13、Ofsted 11 筆，10-12 起），Content API 逐筆掃 AI 字詞 | 200 | 4 筆命中，皆已判過或為更新日（見不匯入） |
| Federal Register | `curl -g`：term 三組與 ED 機關篩選，10-12 起 | 200 | term 1 筆（CFTC）、ED 3 筆資料蒐集公告，與 AI 無關；10-19 期查詢時未刊出 |
| MEXT | 報道発表、新着；8 頁原頁 | 200 | 最新 10-16；無 AI 教育項目 |
| 中國教育部 | 工作動態、部領導活動、s5147、s5148、s5987、中央文件、教育部文件 | 200 | 最新 10-18；新讀各則皆 C（見不匯入） |
| 香港政府新聞公報 | 10-18、10-19 中英文列表 | 200 | 10-18 英 12、中 14 則，無 AI 教育項目；10-19 讀取時（香港 06:3x）只有 1 則 |
| 韓國 KICE | 보도자료列表 | 200 | 最新 10-16，已判過 |
| 韓國教育部 | 보도자료列表 | 200 | 最新 10-18，題名皆與 AI 無關 |
| KERIS | 보도자료列表 | 200 | 最新 10-15，已判 C |
| UNESCO | `/en/newsroom`（列表以 WebFetch 作線索，curl 讀 3 篇原頁） | 200 | 10-12 起 7 則，無 AI 教育項目；列表只看到第一屏 |
| Eurydice 新聞（試行） | https://eurydice.eacea.ec.europa.eu/news | 200 | 10-12 起 2 則，AI 0 次；命中 0 |
| 澳洲三站 | — | 不查（管理者 2026-10-18 改列週四瀏覽器清單） | — |

### E5a 前 7 天回查（政策，首次公開 10-12～10-19）

與 AI 相關的項目都已在候選池或 10-14～10-18 查核紀錄判過（中國教育報 10-12 現場會報導、中國教育部 10-14 教師發展中心 AI 素養專區、MEXT 教員養成部会第 164 回、Ofqual 署長 10-16 演講），無新出現或漏收者。

### 待補（監測清單內，未達門檻）

| 項目 | 首次公開 | 範圍 | 對象 | 說明 |
|---|---|---|---|---|
| J01 `10.1016/j.compedu.2026.105767` Chen、Schunn、Cao、Banihashem、Gašević、Fan〈GenAI-Supported Internal Feedback Intervention for Writing Improvement: The Roles of Evaluative Judgment and Student-AI Interaction in a Cluster-Randomized Experimental Study〉 | 不明（Crossref 只有 2026-10 年月、無 published-online） | 依題名 A／B（S-LRN、S-ETH） | unknown | 無摘要；ScienceDirect 403 加驗證頁。介入研究，成效結果不寫入短訊。見「請管理者用瀏覽器處理」 |

### 列觀察（出處不在監測清單）

| 項目 | 首次公開 | 範圍 | 對象 | 說明 |
|---|---|---|---|---|
| `10.55549/epess.1075` Ozturk〈AI Behind the Adult, Not in Front of the Child: A Design Framework for Adult-Mediated AI in Early Childhood〉（Eurasia Proceedings of Educational and Social Sciences） | 2026-10-17（出版者頁 citation_date，與 Crossref 一致） | C 與 A（S-ETH）邊界 | 幼兒（4–6 歲）為設計對象，無實證樣本 | 概念性設計框架；建議不發 |
| `10.21608/aiis.2026.536949.1032` AI-Powered Smart Learning Methods… of High School Students | 不明（Crossref published-online 2026-11-01，晚於今日） | 不明 | k12（依題名） | 無摘要；不發 |

### 不匯入

- J32 `10.1007/s44217-026-02307-x`（AI 偵測工具誤判的系統性回顧，大學）、`10.1007/s44217-026-02317-9`（大學部考試的 AI 監考與評分系統，受試者皆 18 歲以上）：higher_ed，範圍偏 C。
- 高教、成人、職前：`10.26907/esd.21.3.04`、`esd.21.3.11`、`esd.21.3.07`、`esd.21.3.06`、`esd.21.3.03`、`10.63371/ic.v5.n4.a1741`、`10.21608/mrk.2026.534966`、`10.1177/21582440261497843` 等。
- 首發早於窗口：`10.30983/biced.v3i1.*`（2025-12）、`10.21015/vtess.v14i2.2568` 等。
- 對象不明：`10.53348/nea1se33`、`nea5se33`（不在清單）。
- C：arXiv 2610.19654、2610.19532、2610.19041、2610.21062 等。
- 官方來源：中國教育部〈教育部关工委第七次工作会议暨成立35周年纪念大会召开〉（10-18，只有「数智关工」一句）、〈2026世界职业技术教育发展大会全体会议举行〉（10-16）、〈教育部召开全国深化"双减"推进会〉（10-16）、轉載〈63所高校携527个项目亮相工博会〉（10-16，higher_ed）、轉載〈中国职业教育国际合作的跃升之路〉（10-13，higher_ed）皆判 C；GOV.UK DfE〈Data protection in schools〉10-14 為更新日，AI 章節早已上線；MEXT 10-13 大臣記者會（日英科技合作，C）；Eurydice〈Education and Youth in 10': Can education keep up with technology?〉日期 10-08，早於窗口。

## 臺灣

### 查詢

| 來源 | 網址 | 狀態 | 涵蓋最新日期 | 昨日查詢後新筆數 | AI 相關 |
|---|---|---|---|---|---|
| 教育部即時新聞 RSS | https://www.edu.tw/Rss_News.aspx?n=9E7AC85F1954DDA8 | 200 | 2026-10-18 16:20 | 2 | 0 |
| 資訊及科技教育司 RSS | https://depart.moe.edu.tw/ED2700/Rss_News.aspx?n=727087A8A1328DEE | 200 | 2026-10-07 | 0 | — |
| 國教署即時新聞 | https://www.k12ea.gov.tw/Tw/News/K12eaNewsLlist?filter=9F92BBB7-0251-4CB7-BF06-82385FD996A0 | 200 | 2026-10-15 | 0 | — |
| 行政院公報開放資料 | https://gazette.nat.gov.tw/egFront/openData02.do?action=last | **未能讀取**（521 兩次；openData03.do 與首頁亦 521，來源伺服器無回應） | — | 未知 | 未知 |
| 行政院本院新聞 RSS | https://www.ey.gov.tw/RSS_Content.aspx?ModuleType=3 | 200 | 2026-10-18 19:30 | 1 | 0 |
| 國科會新聞資料 RSS | https://www.nstc.gov.tw/nstc/rss/newsdata | 200 | 2026-10-15 | 0 | — |
| 數位發展部新聞發布（第 1 頁） | https://moda.gov.tw/press/press-releases/372 | 200 | 2026-10-15 | 0 | — |
| 師資培育及藝術教育司 RSS | https://depart.moe.edu.tw/ED2600/Rss_News.aspx?n=E491D1720010EE05 | 200 | 2026-10-16 | 0 | — |
| 學生事務及特殊教育司 RSS | https://depart.moe.edu.tw/ED2800/Rss_News.aspx?n=9C2F51A0AD31862F | 200 | 2026-10-16 | 0 | — |

教育部 10-18 08:27 一則（教保資源中心）昨日查詢時未見，可能晚於昨日查詢上線；內容與 AI 無關。公報 10-17、10-18 為週末不出刊；10-19 期待 08:22 排程或 10-20 補查。

### E5a 前 7 天回查（首次公開 10-12～10-19）

AI 相關項目皆已在 10-17 補查紀錄或 10-18 查核紀錄判過；行政院 10-12、10-14（兩則）、10-16 四則提到 AI，皆屬一般 AI 人才或產業政策，維持不收。無漏收。

### 不收

- 教育部〈社區育兒好便利 教保資源中心共創親子幸福好時光〉（2026-10-18 08:27）、〈串聯中央地方青年力量 青年署攜手地方深化青年交流〉（10-18 16:20）、行政院〈訪視雲林青農創業成果…〉（10-18 19:30）：與 AI 無關。

## 需要管理者處理

今日無（澳洲三站已依管理者 2026-10-18 決定改列週四瀏覽器清單）。

## 請管理者用瀏覽器處理（2026-10-19）

1. https://doi.org/10.1016/j.compedu.2026.105767 （J01 Computers & Education；ScienceDirect 403 加驗證頁）：需要文章頁「Available online」日期截圖與摘要（或全文 PDF）。若首發在 10-13 之後且對象為中小學學生，可補發；屬介入研究，成效結果不寫入。

前幾日清單（10-16～10-18）各項皆已處理完畢，無延續項目。

## 既有候選池

本週（10-16～10-22）候選池 6 筆，皆 publish（A01～A06）；本日無新增候選，未匯入候選池與知識庫。

## 補記（2026-10-19，管理者提供日期與全文後）

- **J01 `10.1016/j.compedu.2026.105767` 不發：** 管理者告知文章頁「Available online 17 October 2026」，並提供 Journal Pre-proof PDF（55 頁；Received 2026-05-15、Revised 2026-09-08、Accepted 2026-10-10）。摘要寫明「STEM undergraduates' writing performance」「368 students … at a university in China」，3.1 Context and Participants 載「Participants were 368 undergraduate students (Age: 18-22 …)」。對象為 higher_ed，依規則不進每日短訊與週報；月報可收。瀏覽器清單此項已處理完畢。
- PDF 存私人 repo `from-editor-session/daily-pdfs/no-kb__compedu-2026-105767-preproof.pdf`（SHA-256 d64d4f2a…3546c7），已登記於 FULLTEXT-INDEX.md。
