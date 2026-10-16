# 每日短訊查核紀錄：2026-10-16（0 則）

> 每日短訊例行作業，由排程觸發，編輯 session 執行（檢索由同 session 子代理執行，判讀由編輯 session 複核）。查詢時間 2026-10-16T00:24Z–00:29Z（UTC）。請求未帶 email 或 mailto；遇 403 或機器人驗證都未繞過。結果：**無合格短訊，不建頁、不登記**。監測清單出處命中 J14（ACM TOCE）一筆 A 類、k12 的論文，但出版者頁面 403，上線日與摘要只來自 Crossref；J32、J41 兩筆讀不到摘要與原頁。UNESCO 10-15 一則報導 7 月活動，學生學段未寫明。清單外 6 筆 K–12 相關論文列觀察交管理者決定。

## 查詢

| 來源 | 查詢 | 狀態 | 結果 |
|---|---|---|---|
| Crossref | `filter=from-created-date:2026-10-15,until-created-date:2026-10-15,type:journal-article`，六組 `query.bibliographic`（同 10-11）；每組取前 40 筆 | 200 | 去重 188 筆；題名加摘要同時含 AI 與學校／學生／教師字詞者 66 筆，逐筆看上線日、學段與範圍；監測清單出處命中 J14、J32、J41、J47（4 筆）、J29（3 筆） |
| Crossref（複查） | `works/10.1186/s40594-026-00653-8`（10-15 暫緩項目） | 200 | 紀錄未變，摘要仍未限定學段，對象維持 unknown |
| 出版者頁面（doi.org，各試一次） | 9 筆 | ACM、SAGE、LITPAM、ScienceDirect 皆 403；Springer 回 JavaScript 攔截頁；Paedagogia、DergiPark、JIP、HNUE 200 | 4 筆讀到原頁日期 |
| arXiv API | 同 10-15 兩組查詢，依提交日排序，各取 40 筆 | 200 | 10-09 起的條目皆已判過，或為 teacher/student 指模型蒸餾的 ML 論文（C） |
| alphaXiv | discover_papers，AI literacy／K-12／children／generative AI／teachers，2026-10-09 起（只作發現） | ok | 2610.19654（模擬學生，C）、2610.15834（大學統計課，higher_ed），其餘無關 |
| GOV.UK Search API | q=artificial intelligence schools，2026-10-09 起（依日期與相關度）；DfE 10-14 起；Content API 讀 1 頁 | 200 | 教育大臣 10-15 CST Conference 演講見「不匯入」 |
| Federal Register API | term artificial intelligence education，2026-10-09 起；ED 機關篩選 | 200 | 1 筆與 2 筆，皆與 K–12 AI 素養無關 |
| MEXT | 首頁與報道発表列表 | 200 | 10-09～10-15 無 AI 相關項目 |
| 中國教育部 | 工作動態、教育部文件、中央文件列表 | 200 | 工作動態無 10-14 之後的新項目；文件列表無新項目；中央文件 10-09《关于发展新质生产力的意见》依題名非教育文件，未開啟 |
| 香港政府新聞公報 | 2026-10-15、10-16 中英文列表；2 則新聞原頁 | 200 | 10-15 金管局負責任 AI 框架（銀行業）、兩則創科局演講皆屬 C；10-16 讀取時當日公報幾乎未上載 |
| 韓國 KICE | 보도자료列表 boardID=10024 | 200 | 10-14 之後無新項目 |
| 韓國教育部 | 보도자료列表（moe.go.kr boardID=294） | 前兩次連線被重設，第三次 200 | 10-14～10-15 項目（幼兒園入園申請、幼兒程度測驗、學校太陽能）皆與 AI 無關 |
| KERIS | 보도자료列表 mi=1088&bbsId=1090 | 200 | 最新仍為 10-07 一則（已判過） |
| UNESCO | articles 列表與 1 則原頁，以 curl 讀取 | 200 | 10-15 CODEMAO 一則見下 |

查詢的限制：Crossref 每組只看依相關度排序的前 40 筆，不是全量篩選；登記日不等於上線日。政策來源只查上列列表，未查者不代表當天沒有發布。

## 初篩結果

### 可發布候選

無。最接近的幾筆：

| 項目 | 首次公開 | 範圍 | 對象 | 未發布原因 |
|---|---|---|---|---|
| `10.1145/3856302` Interaction Patterns and Embodied Design Processes Using an AI Robotics Kit for K–12 Education（ACM Transactions on Computing Education，J14） | 2026-10-15（僅 Crossref；ACM 頁 403） | A（S-BAS、S-SYS） | k12（10、11、13 歲兒童，三次研究者帶領的介入） | 原頁讀不到，上線日與摘要未經原頁核對；請管理者提供頁面截圖或 PDF |
| UNESCO〈UNESCO and CODEMAO advance Africa-Asia cooperation in AI education through Youth AI Tour〉 https://www.unesco.org/en/articles/unesco-and-codemao-advance-africa-asia-cooperation-ai-education-through-youth-ai-tour | 頁面日期 2026-10-15；所報導活動為 2026-07-20～25 | A（S-BAS） | unknown（只寫 students、young people、68 所學校獲試點認證，未寫年齡或學段） | 對象不明；活動本身早於窗口；商業夥伴共同主辦 |
| `10.1007/s44217-026-02048-x` Development and validation of an artificial intelligence literacy scale for students（Discover Education，J32） | 2026-10-15（僅 Crossref；Springer 頁為 JavaScript 攔截頁） | A（AI 素養量表） | unknown（Crossref 無摘要） | 對象不明、原頁讀不到 |
| `10.1016/j.caeo.2026.100427` Can AI help teachers? Experimental evidence on the effects of generative AI use and AI training on teachers' lesson preparation（Computers and Education Open，J41） | Crossref 只有 2026-10 印刷日；ScienceDirect 403 | A（T-TEA、T-PD；依 AI 培訓規則） | unknown | 上線日與對象無法核實 |

### 列觀察，交管理者決定（出處不在監測清單）

| 項目 | 首次公開 | 範圍 | 對象 | 說明 |
|---|---|---|---|---|
| `10.24239/pdg.vol15.iss2.1477` Proposed Pedagogical Framework for Positioning Generative AI as a Thinking Companion in Recount Writing | 2026-10-14（原頁 Published；DC.Date.issued 09-28） | A（S-LRN、S-ETH） | k12（九年級 56 名學生、1 名教師） | Paedagogia: Jurnal Pendidikan；作者註明框架未經專家驗證或課堂測試 |
| `10.36312/wp1j4x29` Integrating PhET Simulations and ChatGPT within the 7E Learning Cycle | 2026-10-15（僅 Crossref；LITPAM 頁 403） | B（S-LRN） | k12（十一年級 71 人，準實驗） | 介入研究，若收錄只寫設計 |
| `10.17244/eku.1836092` AI-Assisted Post-Reading Presentations … Secondary School Students' Attitudes Towards Developing Turkish Vocabulary | 2026-10-16（DergiPark 原頁） | B（S-LRN） | k12（土耳其公立中學五年級 56 人） | Eğitimde Kuram ve Uygulama；相關研究 |
| `10.69569/jip.2026.446` AI Dependency as a Predictor of Perceived Reading Comprehension Barriers Among Senior High School Students in the Philippines | 2026-10-14（原頁） | A（S-LRN，依賴行為） | k12（菲律賓高中 319 人） | 自陳相關研究 |
| `10.1177/21582440261497443` Teacher PD for Digital Education Reform: Digital-AI Literacy Enactment in Resource-Constrained Tanzanian STEM Classrooms | 2026-10-15（僅 Crossref；SAGE 頁 403） | A（T-PD） | 學段未寫明，暫記 unknown | Sage Open |
| `10.18173/2354-1075.2026-0092` From Video-Based Learning to Critical Engagement with AI-Generated Video | 2026-10-11（原頁） | A（S-ETH，概念框架） | unknown（只寫 learners） | HNUE Journal of Science |

學段未寫明的邊界項目：`10.71176/edup/19619`（教師評量 AI 知識框架，可能屬 other_stakeholders）、`10.46630/phm.18.2026.61`（塞爾維亞 ESL 教師以 ChatGPT 評量，B）、`10.58578/mikailalsys.v4i3.12325`（伊斯蘭宗教教育教師，A）。

### 不匯入

| 項目 | 處理 |
|---|---|
| J47 `10.3390/educsci16101718`、`16101722`、`16101725`、`16101728`；J29 `10.3389/feduc.2026.2005440`、`feduc.2026.1917686` 與其他大學研究 | higher_ed |
| `10.54855/ijte.26643`、`10.33619/2414-2948/131/72` 等職前教師研究 | teacher_ed，月報可收 |
| `10.32431/kace.2026.29.9.004`、`10.30974/kaice.2026.15.5.32` 等 K–12 研究 | 上線日早於窗口（多為 09-30 印刷日） |
| J29 `10.3389/feduc.2026.2019221` | 勘誤 |
| 其餘 Crossref 命中（C 類、醫護、成人、商管，或對象不明的一般論文） | 不收 |
| GOV.UK 教育大臣 10-15 CST Conference 演講 | 主要內容為機會、職業資格與口語能力，AI 只出現約 5 句，無 AI 政策宣布，依主要內容判 C |
| HK、MEXT、Federal Register、中國教育部、韓國教育部、KICE、KERIS 各項 | 屬 C 或無新項目 |

本日未命中不收出處。

## 需要管理者處理

- **出版者頁 403 或攔截，如需請提供 PDF 或頁面截圖：** https://doi.org/10.1145/3856302 （J14，若提供可補發短訊）、 https://doi.org/10.1007/s44217-026-02048-x （J32）、 https://doi.org/10.1016/j.caeo.2026.100427 （J41）、 https://doi.org/10.1177/21582440261497443 、 https://doi.org/10.36312/wp1j4x29

## 既有候選池

本週（10-09～10-15）候選池 24 筆不變，publish 11 筆（A14–A24）。本日無新增候選。

## 補發（2026-10-16，管理者提供全文後）

- **D20261016-01**：`10.1145/3856302`（J14，ACM TOCE）。管理者提供出版者 PDF（Just Accepted 版）與 ACM DL 文章頁截圖（Online AM: 15 October 2026；Accepted on 17 September 2026），首發日依文章頁取 2026-10-15。A（S-BAS），k12。作者摘要歸屬型，只寫研究目的、設計與分析方法，不寫結果；內文 2.3 節載三次介入各 1 名兒童（共 3 人），經監護人招募，記於範圍限制。候選池新一週檔案 `2026-10-16_2026-10-22.json`（W2026-10-16-A01），知識庫 KB-2026-0379（KR-13721～13729）。PDF 與截圖存私人 repo。
- `10.1007/s44217-026-02048-x`（J32）：管理者提供出版者 PDF。對象為土耳其國小、國中 4–8 年級學生 870 人，A（AI 素養量表），k12；PDF 只有 Received 19 March 2026／Accepted 13 August 2026，沒有上線日，Crossref published-online 2026-10-15 不算原頁日期，暫不發，待 Springer 文章頁截圖。
- `10.1016/j.caeo.2026.100427`（J41）：管理者提供 Journal Pre-proof。樣本為德國成人教育教師（TAEPS 研究），audience 為 adult，不進短訊；隨機對照實驗的成效結果本來也不寫入短訊。
