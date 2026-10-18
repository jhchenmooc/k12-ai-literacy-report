# 每日短訊查核紀錄：2026-10-18（0 則）

> 每日短訊例行作業，由排程觸發，在每日短訊專用 session 執行（管理者 2026-10-17 決定 D9）。檢索由同 session 三個子代理（國際研究、國際政策、臺灣中央來源）執行，判讀由本 session 複核。查詢時間 2026-10-18T00:24Z–00:45Z（UTC）。請求未帶 email 或 mailto；遇 403、Client Challenge 或機器人驗證都未繞過。結果：**國際、臺灣皆無合格短訊，不建頁、不登記**。本日首次執行臺灣段每日查詢（10-18 起）與 E5a 前 7 天回查（管理者 2026-10-17「E 全照建議」）。監測清單出處只有 J32 一筆可能屬 K–12，但出版者頁遇 Client Challenge、Crossref 無摘要，學段不明。

## 國際

### 查詢

| 來源 | 查詢 | 狀態 | 結果 |
|---|---|---|---|
| Crossref | `filter=from-created-date:2026-10-17,until-created-date:2026-10-17,type:journal-article`，六組 `query.bibliographic`（同 10-11）；每組取前 40 筆 | 200 | 去重 196 筆；同時含 AI 與學校／學生／教師字詞者 55 筆；監測清單命中 J32、J33（大學生）、J20（職前，無 AI）、J05（撤稿聲明） |
| Crossref（proceedings-article） | 同日期，`query.bibliographic=artificial intelligence school students teachers`，rows=40 | 第一次 429，重試 200 | 前 40 筆皆 Innovative Academy（`10.70413`）烏茲別克論文集回補紀錄，多為舊稿，不在清單 |
| Crossref（監測期刊 ISSN 補查） | 同日期，22 本監測期刊 ISSN，關鍵詞 artificial intelligence generative AI ChatGPT，rows=60 | 200 | 10 筆；新見 J32 `s44217-026-02317-9`、`s44217-026-02307-x`、J01 `compedu.2026.105767`，其餘為 Scientific Reports 非教育論文 |
| Crossref（複查） | 10-17 列觀察的 6 筆 DOI | 200 | 見「觀察」 |
| 出版者頁面（各試一次） | Springer 4、Nature 1、Elsevier 1、SAGE 2、Wiley 1、其他 3 | Springer 皆 Client Challenge；Nature 200；Elsevier 只回轉址；SAGE、Wiley 403；其他 200 | Springer 本日讀不到 |
| arXiv API | 同 10-17 兩組查詢，依提交日排序，各 40 筆；另一組加廣查詢 100 筆 | http 回 301，改 https 得 200 | 最新送件 10-15；10-11 後只有 2610.22062（C）、2610.15692（方法性綜述，對象不明） |
| alphaXiv | discover_papers，2026-10-11 起（只作發現） | ok | 7 筆中 5 筆已判過，2610.16980、16860 屬 C |
| GOV.UK | Search API（DfE 61、Ofqual 13、Ofsted 11 筆，10-11 起），Content API 逐筆掃 AI 字詞 | 200 | 只有已判過的教育大臣 10-15 演講（C）、DUAA 法遵清單（C）、Ofqual 署長 10-16 演講（10-17 已交管理者決定） |
| Federal Register | `curl -g`：term 三組與 ED 機關篩選，10-11 起 | 200（10-17 的 403 本日未出現） | ED 三筆為成人教育報告系統、HS&B:22 成績單、IHE 關閉研究的資料蒐集，與 AI 無關 |
| MEXT | 首頁、報道発表、新着；6 頁原頁 | 200 | 1 筆邊界（教員養成部会第 164 回，見下） |
| 中國教育部 | 工作動態、s5147、s5148、s5987、中央文件、教育部文件；21 篇原頁 | 200 | 1 筆邊界（10-12 中國教育報現場會報導），2 筆不收 |
| 香港政府新聞公報 | 10-17、10-18 中英文列表；E5a 回看 10-11～10-16 | 200 | 無 AI 教育項目；10-18 讀取時（香港 08:27）只有 1 則 |
| 韓國 KICE | 보도자료列表 | 第一次 reset，第二次 200 | 10-16〈교육데이터 톡톡 제9호〉PDF 內容為課程修訂意見調查，無 AI |
| 韓國教育部 | 보도자료列表 | 200（第一次即成功） | 10-18〈데이터로 읽는 우리 교육 제16호〉為 OECD 高等教育指標，C |
| KERIS | 보도자료列表 | 200 | 最新 10-15（已判 C） |
| UNESCO | `/en/newsroom`（curl 列表由 JS 載入只得 1 則；以 WebFetch 讀列表作線索，再以 curl 讀 11 篇原頁） | 200 | 1 筆不收（Karishma 專訪）；其餘已判過或 C |
| Eurydice 新聞（試行） | https://eurydice.eacea.ec.europa.eu/news | 200 | 10-11 起 2 則（丹麥 10-16、愛爾蘭 10-14），AI 皆 0 次；命中 0 |
| 澳洲教育部新聞室（10-18 重測） | https://www.education.gov.au/newsroom | 未能讀取（HTTP/2 INTERNAL_ERROR 3 次、HTTP/1.1 empty reply 2 次、WebFetch 503） | — |
| 澳洲教育部長新聞（附帶） | https://ministers.education.gov.au/news | 未能讀取（同上） | — |
| eSafety 媒體新聞稿（10-18 重測） | https://www.esafety.gov.au/newsroom/media-releases | 未能讀取（同上，WebFetch 503） | — |

查詢的限制：Crossref 每組只看依相關度排序的前 40 筆；登記日不等於上線日。UNESCO 列表需 JS，列表以 WebFetch 轉述作線索，各則以原頁核對。澳洲三站連續兩天以程式讀不到，失敗方式一致，較像來源站拒絕自動請求。

### E5a 前 7 天回查（政策，首次公開 10-11～10-18）

各政策列表回看後，未在候選池（10-09_10-15、10-16_10-22）與前幾日查核紀錄判過、且與 K–12 AI 素養相關者 2 筆，皆列邊界、不發：

| 項目 | 首次公開 | 判定 | 不發理由 |
|---|---|---|---|
| 中華人民共和國教育部網站轉載《中國教育報》〈这场别开生面的现场会，蕴含教师未来发展秘籍〉 http://www.moe.gov.cn/jyb_xwfb/s5147/202610/t20261012_1453662.html | 2026-10-12（PubDate 2026-10-12 08:19 北京時間） | A（T-PD、T-TEA、T-BAS、T-ETH）；k12；official_commentary；CN；含自述成效 | 與已發的 D20261012-01（10-10 人工智能赋能教师发展现场会）同一事件的後續報導，不另立新事件；週報如需補充可參考 |
| 日本文部科學省〈中央教育審議会初等中等教育分科会教員養成部会（第164回）の開催について〉 https://www.mext.go.jp/b_menu/shingi/chukyo/chukyo3/002/mext_00026.html | 2026-10-15（新着列表，JST） | 議題含「生成AI時代の教師・学校の役割について」；會議預告，非政策；對象可能為 teacher_ed（unknown）；JP | 會議預告不收；10-22 會後配付資料上網再判 |

### 待補（監測清單內，未達門檻）

| 項目 | 首次公開 | 範圍 | 對象 | 說明 |
|---|---|---|---|---|
| J32 `10.1007/s44217-026-02332-w` Mellouk、Ouelfatmi〈The impact of AI on students' achievement, confidence, and critical thinking in education in Morocco〉，Discover Education 5:1191 | 2026-10-17（Crossref published-online；出版者頁 Client Challenge） | 依題名可能 A／B（S-LRN、S-ETH） | unknown | 出版者頁與 PDF 皆 Client Challenge，Crossref 無摘要；學段不明不能發。題名含 impact，若為成效研究，結果不寫入短訊。見「請管理者用瀏覽器處理」 |
| J32 `10.1007/s44217-026-02307-x`〈AI content detection in student text assignments, false positive rates, and academic integrity〉 | 2026-10-17（Crossref） | 依題名偏 C，學術誠信部分屬邊界 | unknown | 無摘要，Springer Challenge |
| J32 `10.1007/s44217-026-02317-9`〈Development and evaluation of eduvate CBT as an integrated artificial intelligence powered assessment ecosystem〉 | 2026-10-17（Crossref） | 依題名偏 C（系統開發） | unknown | 無摘要，Springer Challenge |

### 列觀察，交管理者決定（出處不在監測清單）

| 項目 | 首次公開 | 範圍 | 對象 | 說明 |
|---|---|---|---|---|
| `10.70838/pemj.640202` AI in the Teaching of Filipino（10-17 列過） | 2026-10-11（Crossref published-online；原頁只標年份） | A（T-TEA、T-PD、T-ETH） | k12（國立高中菲律賓語教師 5 人） | **新：** scimatic 原頁 https://scimatic.org/show_manuscript/11054 本日可讀到摘要；若管理者同意收此出處，可發摘要型（首發 10-11，仍在 7 天內至 10-18） |
| `10.69685/pcbx4086` Secondary education teachers' perspectives on the use of ChatGPT in teaching（International Journal of Educational Innovation） | 2026-10-17（Crossref） | A（T-TEA、T-ETH） | k12（中學教師） | 摘要只有 Crossref 版 |
| `10.47772/ijriss.2026.100900537` Adoption of Generative AI for Lesson Planning Among Basic Education Teachers（IJRISS） | 2026-10-16（Crossref） | B（T-TEA） | k12（宿霧私立基礎教育教師 166 人） | 摘要只有 Crossref 版 |
| `10.30554/p.e.35.2.5677.2026` Entre algoritmos y cuentos（Plumilla Educativa） | 2026-10-16（Crossref） | B（S-LRN） | k12（國小） | 反思文章 |
| `10.18178/ijiet.2026.16.10.2714`、`10.1177/02614294261496216`、`10.24239/pdg.vol15.iss2.1483`、`10.1002/aaai.70111`、`10.1177/21582440261497443`（10-17 列過） | — | — | — | 本日複查無變化 |

### 不匯入

- 大學、高教、職前、成人：J33 `10.1057/s41599-026-09477-x`（大學生 405 人）、J20 `tate.2026.105878`（職前，無 AI）、Sage Open `21582440261498551`、`10.26877/jettle.v2i2.4196`、BMC Med Educ `s12909-026-10637-5`、`ijer.2026.103139`、`10.55549/epess.1057`、`epess.1067`；`10.63090/ijters…0041`（阿曼 EFL，學段混合）；`10.69639/arandu.v13i3.2599`（14–22 歲，學段混合）。
- J01 `compedu.2026.105767`：無 published-online、無摘要，Elsevier 讀不到，日期與學段皆不明，待後續複查。
- 依不收出處排除：`10.33422/worldcte.v4i2.1756`。
- 首發早於窗口：`10.70413/*` 多筆等。
- C 或與 AI 無關：J05 `s10639-026-14173-z`（撤稿聲明）、arXiv 2610.22062、2610.16980、2610.16860、2610.15870、2610.18019（大學作業評分）等。
- 對象不明：arXiv 2610.15692、`10.21275/sr261014061131`、`10.1016/j.dr.2026.101304`、`10.66928/salima.v1i4.161`、`10.69849/bcnjqj75`。
- 官方來源：中國教育報〈开学满月 拾光生长〉（10-11，AI 只出現在一段，依主要內容判 C；該段含自述成效）；〈李强主持召开国务院常务会议〉（10-16，AI 部分不涉教育）；UNESCO〈How Karishma from India broadens access to sexuality education via AI and digital channels〉（10-16 個人專訪，AI 素養只出現在受訪者倡議句，非政策）；MEXT 教育課程企画特別部会第 21 回（通知無 AI）；香港 10-14 LCQ6、10-15 創科局長演講（C）。

## 臺灣（本日起每日查詢）

### 查詢

| 來源 | 網址 | 狀態 | 涵蓋最新日期 | 10-17～18 筆數 | AI 相關 |
|---|---|---|---|---|---|
| 教育部即時新聞 RSS | https://www.edu.tw/Rss_News.aspx?n=9E7AC85F1954DDA8 | 200 | 2026-10-17 18:50 | 2 | 1 則順帶提及（不收） |
| 資訊及科技教育司 RSS | https://depart.moe.edu.tw/ED2700/Rss_News.aspx?n=727087A8A1328DEE | 200 | 2026-10-07 | 0 | — |
| 國教署即時新聞 | https://www.k12ea.gov.tw/Tw/News/K12eaNewsLlist?filter=9F92BBB7-0251-4CB7-BF06-82385FD996A0 | 200 | 2026-10-15 | 0 | — |
| 行政院公報開放資料 | https://gazette.nat.gov.tw/egFront/openData02.do?action=last （對照 openData03.do） | 200 | 115-10-16 期（週末無刊） | 0（10-16 期 10 筆，無教育部或國教署） | 0 |
| 行政院本院新聞 RSS | https://www.ey.gov.tw/RSS_Content.aspx?ModuleType=3 | 200 | 2026-10-17 21:09 | 3 | 0 |
| 國科會新聞資料 RSS | https://www.nstc.gov.tw/nstc/rss/newsdata | 200 | 2026-10-15 | 0 | — |
| 數位發展部新聞發布（第 1 頁） | https://moda.gov.tw/press/press-releases/372 | 200 | 2026-10-15 | 0 | — |
| 師資培育及藝術教育司 RSS | https://depart.moe.edu.tw/ED2600/Rss_News.aspx?n=E491D1720010EE05 | 200 | 2026-10-16 | 0 | — |
| 學生事務及特殊教育司 RSS | https://depart.moe.edu.tw/ED2800/Rss_News.aspx?n=9C2F51A0AD31862F | 200 | 2026-10-16 | 0 | — |

RSS 的 pubDate 為 GMT，已換算為臺灣時間再篩日期。每個網址以預設請求讀一次，未遇 403 或驗證碼。今天非週四，不查法規系統、國教院、臺灣期刊與 OpenAlex。

### E5a 前 7 天回查（首次公開 10-11～10-18）

10-11～10-16 各則 AI 相關項目都已在 2026-10-17 臺灣補查紀錄判過；補查後無新出現或漏收的 AI 相關項目。另：本日數到教育部 RSS 在 10-09～10-16 共 22 則，補查紀錄記 21 則；逐筆比對，標題含 AI 者皆已判過，其餘標題與 AI 無關，不影響結論。

### 不收

- 教育部〈學習新「識」力 終身「媒」煩惱 第4屆終身學習節暨2026年媒體素養教育週熱鬧登場〉 https://www.edu.tw/News_Content.aspx?n=9E7AC85F1954DDA8&s=74A21130A8D75C95 （2026-10-17 16:04）：AI 只在次長談話背景與得獎單位培訓中順帶提及，主體為終身學習表揚，對象 adult，依主要內容不收。
- 教育部〈第30屆TDK盃全國大專校院創思設計與製作競賽〉（2026-10-17 18:50）：higher_ed，與 AI 無關。
- 行政院 10-17 三則（全民運動會、伏流水工程、緝毒）：與 AI 無關。

## 需要管理者處理

- **澳洲三站（教育部新聞室、教育部長新聞、eSafety）**：10-17、10-18 兩天以程式皆讀不到（失敗方式一致）。建議自下週四起併入「政策列表掃描」的瀏覽器清單；10/23 週報出刊前檢查回報試行命中數時一併說明。
- **出處不在監測清單的觀察項目**（見國際「列觀察」）：`10.70838/pemj.640202` 本日已可讀到摘要，若管理者同意收此出處，今日（10-18）是 7 天內最後一天，可補發摘要型，過了今天就轉月報；其餘待管理者決定。
- **技術註記**：arXiv API 的 http 端點本日回 301，改用 https 才成功；建議日後查詢一律使用 https。

## 請管理者用瀏覽器處理（2026-10-18）

1. https://doi.org/10.1007/s44217-026-02332-w （J32 Discover Education，首發 2026-10-17，Springer Client Challenge）：需要出版者頁截圖或全文 PDF 的摘要與研究對象。若對象為中小學學生或在職教師，可補發摘要型（7 天內，至 10-24）；成效結果不寫入。

前幾日清單（10-16、10-17）各項皆已處理完畢，無延續項目。

## 既有候選池

本週（10-16～10-22）候選池 5 筆，皆 publish（A01～A05）；本日無新增候選，未匯入候選池與知識庫。
