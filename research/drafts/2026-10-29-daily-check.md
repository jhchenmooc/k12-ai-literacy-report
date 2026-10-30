# 每日短訊查核紀錄：2026-10-29（4 則；週四必查）

> 每日短訊例行作業，由排程觸發，在每日短訊專用 session 執行。今天是週四，也是 10 月最後一個週四。依管理者 2026-10-23 的決定，「需要管理者處理」的瀏覽器清單已先行合併到 main（#399），供 10:37 由管理者請編輯 session 轉交本機 session；本次補上檢索結果、發布項目與週四必查紀錄，並在清單加第 4 項。
> - **檢索：** 由同一 session 的五個子代理分頭執行（國際研究、國際政策、臺灣中央來源、週四必查第 1 組、第 2 組），判讀由本 session 複核；四則發布項目由本 session 重讀原頁（Behavioral Sciences 只讀 Crossref 紀錄）。
> - **查詢時間：** 2026-10-29T00:20Z–01:00Z（UTC）。
> - **請求紀錄：** 都沒帶 email 或 mailto。MDPI 回 403（Access Denied），未繞過；federalregister.gov 全文改讀 govinfo。韓國教育部、UNESCO、INTEF 單篇頁有連線中斷，用同一個預設 curl 重試後成功，沒換 User-Agent。智利 Mineduc 與 eTwinning 頁是代理通道中斷（502／connection reset），不是網站回 403。
> - **結果：發布 4 則**（國際研究 1 則、國際政策 2 則〔香港、西班牙〕、臺灣 1 則）。

## 國際

### 查詢

| 來源 | 查詢 | 狀態 | 結果 |
|---|---|---|---|
| Crossref | `filter=from-created-date:2026-10-28,until-created-date:2026-10-29,type:journal-article`，六組 `query.bibliographic`，每組 rows=60 | 200 | 各組總數 476／501／1076／2208／404／1076，各取 60；created 全是 10-28，查詢時尚無 10-29 |
| Crossref（proceedings-article） | 同上日期 | 200 | 96（取 40），無合格項目 |
| Crossref（監測期刊 ISSN） | 27 個 ISSN（含 J52 2076-328X、J50 兩個 ISSN）；帶關鍵詞 rows=60、不帶 rows=200 | 200（J04 一次 429，重試成功） | J29 22、J33 5、J40 1、J47 10、J48 170、J49 2、J50 2、J52 10，其他 0 |
| Crossref J52 回查 | `journals/2076-328X/works`，from-pub-date:2026-10-22 | 200 | 66 筆，AI × 中小學只有 bs16112017 |
| 教學代理人 | Crossref 兩組 × 期刊／會議論文；OpenAlex（10-22 起）四組；arXiv 一組 | 200 | 無教學代理人 × K-12 研究 |
| arXiv API（https） | 三組（同前） | 200 | 10-22 起提交 62 筆，未判過者皆不合格 |
| alphaXiv | discover_papers，published_after 2026-10-22 | 連線成功 | 10 筆，皆已判過或不合格 |
| 出版者頁面 | MDPI | 403 | 未繞過 |
| GOV.UK | DfE、Ofqual、Ofsted（10-21 起 126 筆）；關鍵詞六組 | 200 | 新 15 則（10-28）無 AI；關鍵詞無新項目 |
| Federal Register | term 三組、ED 篩選、ED × AI、10-28 期、public inspection | 200 | term 命中 2 則（IRS 諮詢會、DMCA 1201 規則草案），與教育無關，C；ED 2026-22047 NCES〈Request for Information〉AI 只見於第 4 題，C；2026-22040 HEAL 貸款，C；10-29 期查詢時 0 筆 |
| MEXT | 報道発表、新着、大臣記者會見 | 200 | 10-28 新項目皆 C；10-27 記者會見文字版未上傳；情報・技術 WG 第 11、12 回議事録（見下） |
| 中國教育部 | 首頁加 18 欄目 | 200 | 3 則皆 C |
| 香港政府新聞公報 | 10-28 全日（英 57、中 57，另有只發中文的議案發言稿）；10-29 | 200 | **1 則命中，發布**；其餘 AI 項目屬高教或與教育無關，C；10-29 查詢時索引為空 |
| 韓國教育部 | 보도자료（第 2 次重試成功） | 200 | 3 則（hwpx 附件都讀過），C |
| 韓國 KICE | 보도자료 | 200 | 無新項目 |
| 韓國 KERIS | 보도자료 | 200 | 3 則（含 10-27 上次漏讀 1 則）；邊界 1 則不發（見下） |
| UNESCO | `/en/newsroom` | 200（文章頁重試後全數 200） | 7 則，C |
| Eurydice | /news | 200 | 1 則（瑞典數位國家考試，無 AI） |

### 發布

| 編號 | 來源 | 首發日（依據） | 範圍 | 對象 | 型態 |
|---|---|---|---|---|---|
| D20261029-01 | J52 Behavioral Sciences（MDPI），Nan、Yan、Gai〈Developmental, Contextual, and Profile-Based Heterogeneity in K–12 Students’ Artificial Intelligence Literacy〉 https://doi.org/10.3390/bs16112017 | 2026-10-27（Crossref published-online；出版社頁 403） | A（S-BAS、S-ETH） | k12（長春 6、9、11 年級學生 141,988 人） | 書目型 |
| D20261029-04 | 香港特區政府教育局〈立法會：教育局局長就「推動新時代下的教師專業發展」議員議案開場發言（只有中文）〉 https://www.info.gov.hk/gia/general/202610/28/P2026102800679.htm | 2026-10-28（頁尾香港時間 20:06；內文寫明當日立法會會議） | A（T-PD） | k12（中小學領導人員與教師） | 官方摘要型 |

- **D20261029-01：**
  - 10-28 查核紀錄列為觀察項；J52 已於 10-28 列入正式監測清單（#398），本次以正式候選發布。
  - MDPI 對程式回 403，依 Crossref 例外規則只發書目，不轉述 Crossref 摘要內容。
  - 出版社頁「Published」日期與摘要已列入瀏覽器清單第 1 項；回傳後重讀，若可升為作者摘要型，以更正方式處理（`revised_on` 與 corrections）。
- **D20261029-04：**
  - **摘要依據：** 「至於在創科及數字教育方面」段全句，以及其後一段第 1、2 句。
  - **首發判斷：** 發言稿本身 10-28 首次公開。分層式課程與 30 小時培訓要求，原文寫明出自今年六月的《中小學數字教育發展藍圖》，本則不寫成新政策首次公布；「五萬個培訓名額」原文置於數字教育支援的語境，未寫明為 AI 專屬，摘要照此寫。
  - **第二輪對照：** 隔離子代理判定大致一致。依建議修改如下，修正後一致：
    - 五萬個名額的主語改為教育局（原稿讀起來像由校本支援組提供）。
    - 補上名額對象為全港公帑資助中小學教師。
    - 刪去依據不足的 T-BAS 對應，只留 T-PD。
  - 同一議案的教育局局長總結發言，查詢時還沒上載。

### E5a 前 7 天回查（政策，首次公開 10-22～10-29）

本輪新讀到、落在窗口內的項目中，只有上述香港發言稿命中。上次漏讀 1 則：KERIS 43993〈제1회 디지털교육 종단연구 학술대회〉（10-27 登錄），內文無 AI，C。10-22～10-27 的其他項目已在前幾日判過，無漏收。

### 不發（政策）

- **韓國 KERIS〈한국교육학술정보원, 공군교육사령부와 '제197회 디지털교육포럼' 공동 개최〉**（2026-10-28）
  - **內容：** 10-29 論壇公告，主題為「AI 日常化時代，智慧學習生態系的創新與未來」，與空軍教育司令部 HRD 研討會合辦。
  - **不發原因：** 活動公告，對象混合公教育與軍事訓練，不明確屬 k12；B／C 邊界。
- **日本 MEXT〈情報・技術ワーキンググループ（第11回）、（第12回）議事録〉**（10-28 掛出）
  - **不發原因：** 是 2026-06-25、07-30 會議的紀錄，內容為委員發言；與 10-28 判過的第 10 回相同處理，首次公開早於窗口。可記為觀察。

### 待補（監測清單內，未達門檻）

無。J29 `10.3389/feduc.2026.1942554`（以 Gemini 模擬國中幾何論證）無中小學參與者，摘要說明用途為師培，不發。

### 列觀察（出處不在監測清單）

- `10.1177/08959048261500084` Educational Policy（Sage）〈From Articulation to Enforcement: District Governance of Generative AI Under Policy Ambiguity in Chicago Public Schools〉：Crossref published-online 2026-10-28；K-12 學區生成式 AI 治理的文件分析，A（T-ETH、T-BAS），對象 other_stakeholders。與主題最直接。
- `10.33225/jbse/26.25.884` Journal of Baltic Science Education：土耳其公私立學校科學教師 434 人的 AI 覺知與 AI-TPACK，A；Crossref published-online 10-28，但 published-print 10-25 較早，首發日待核。
- `10.1108/ijem-02-2026-0240` International Journal of Educational Management（Emerald）：土耳其 17 名公立學校校長以生成式 AI 輔助決策；Crossref published-online 2026-10-30，晚於今天，需另核。
- `10.15804/tner.2026.85.3.13` The New Educational Review：波蘭各學段教師 240 人對 AI 的態度；Crossref 只有年份，首發日不明。
- `10.1108/aiie-08-2025-0257` Emerald Artificial Intelligence in Education（觀察池刊）：K-12 與高教生成式 AI 的整合性綜述，對象混合，邊界。
- `10.3389/fpsyg.2026.1989652` Frontiers in Psychology：教師負責任使用生成式 AI 決策的概念模型，教師未限學段。
- `10.3390/aieduc2040035` MDPI AI in Education：AI 賦能在職教師專業發展的文獻綜述，教師未限學段。

### 不收

- **J52 回查：** `bs16112019`（醫學生）、`bs16112014`（碩士生）、`bs16112022`（大學教師）為 higher_ed；`bs16112002`、`bs16111983` 為 adult；`bs16111998` 職前教師已判過；`bs16112009`、`bs16112007` 摘要無 AI。
- **監測期刊：** J49 `ejed.70921`（大學生）、`ejed.70916`（職場）；J29 `feduc.2026.1990735`（大學 AI-GIS）及 `1944529`、`1953367`、`1949516`、`1955212`、`1956809`、`1978272`、`1939503`（高教、非 K-12 或無 AI）；J47 `educsci16111813`（師培概念論文）、`educsci16111816`（AI 為後端預測模型）及其他 8 筆無 AI；J50 `ejmste/19683`、`19684` 無 AI；J40、J33、J48 無合格項目。
- **Crossref 關鍵詞：** 粗篩 72 筆，首發早於 10-22 約 20 筆，其餘屬高教、師培、非教育或無 AI；`10.1177/21582440261502588`（AI 評分中學數學作答）師生未與 AI 互動，C。
- **arXiv、alphaXiv：** 未判過者皆屬技術、高教或成人。
- **其餘政策新項目：** 中國教育部 10-28 兩篇黨建文章、10-27 天津南開中學一文（一句 AI 培訓）；香港 10-28 其餘 AI 項目（大學校長峰會講辭屬 higher_ed，低空經濟、新型工業化、政府網站聊天機器人等與教育無關）；韓國教育部青少年創業競賽、農漁村好學校、生技 bootcamp；UNESCO 南蘇丹媒體與資訊素養中心（AI 只見於學生引述）、Almaty（higher_ed）；皆 C。

## 週四必查（F2 試行來源）

窗口 2026-10-22～10-29。原始檔留在 session 暫存區，未入 repo。

### (a) 原試行來源

| 來源 | 狀態 | 列表最新 | 7 天內新項目 | 命中 |
|---|---|---|---|---|
| 德國 KMK | 200 | 2026-10-16 | 0 | 0 |
| 芬蘭 EDUFI | 200（上週 503，本週恢復） | 2026-10-28 | 2（教育經費報告、Team Finland Knowledge 高教計畫） | 0 |
| TeachAI 各州指引追蹤 | 200 | 無逐州日期 | 43 筆，與 10-22 快照完全相同 | 0 |
| 愛沙尼亞教育研究部 RSS | 200 | 2026-10-27 | 9（全文都讀過；2 篇順帶提到 AI，皆 C） | 0 |

### (b) F2 風險關切與政策調整來源

| 來源 | 狀態 | 列表最新 | 7 天內新項目 | 命中 |
|---|---|---|---|---|
| UNICEF 新聞稿 | 200 | 2026-10-26 | 3（無 AI） | 0 |
| EI 新聞 | 200 | 2026-10-28 | 2（全文無 AI） | 0 |
| 英國 ICO | 無頭 200 | 2026-10-28 | 1（與 AI 無關） | 0 |
| 法國 CNIL | 200（上週 503，本週恢復） | 2026-10-20 | 0 | 0 |
| 美國 NEA | 200 | 2026-10-01 | 0 | 0 |
| Ada Lovelace Institute | 200 | 2026-06-15（有日期者） | 0 | 0 |
| 瑞典 Skolverket | 200 | 2026-10-20 | 0 | 0 |
| 西班牙教育部 | 200 | 2026-10-27 | 4（InnovaSur 參訪 AI 只描述企業業務，C；10-27 體育補助單篇頁 2 次 connection reset，從標題看為體育補助） | 0 |
| 西班牙 INTEF | 200（2 篇單篇頁 connection reset，重試成功） | 2026-10-22 | 1 | **1，發布** |
| 捷克教育部 | 無頭 200（網址已轉向，改讀 /aktuality） | 2026-10-27 | 6（全文都讀過，無 AI） | 0 |
| 南非基礎教育部 | 200 | 2026-09-26 | 0 | 0 |

### (c) 第二批國家教育部門

| 來源 | 狀態 | 列表最新 | 7 天內新項目 | 命中 |
|---|---|---|---|---|
| 挪威 Udir | 無頭 200 | 2026-10-26 | 4（原頁無 AI） | 0 |
| 丹麥 UVM | 無頭 200 | 2026-10-28 | 1（職業教育補助） | 0 |
| 荷蘭 OCW | 無頭 200 | 2026-10-28 | 4（Team Ouders 只在頁尾有「AI-gebruik」） | 0 |
| 荷蘭 Kennisnet | 200 | 2026-10-22 | 1（PHP 資安漏洞） | 0 |
| 北愛爾蘭教育部 | 200 | 2026-10-19 | 0 | 0 |
| 加拿大卑詩省教育與托育部 | 200 | 2026-09-08 | 0 | 0 |
| 智利 Mineduc | **讀取失敗**（無頭 2 次 502、curl 2 次 connection reset；代理通道中斷） | — | — | — |
| 墨西哥 SEP | 200 | 2026-10-27 | 10（Boletín 356、347 順帶提到 AI，C） | 0 |
| 義大利教育與功績部 | 無頭 200 | 2026-10-28 | 9 | 1（與 D20261022-05 同一活動，不另發） |
| 印尼初中等教育部 | 無頭 200 | 2026-10-28 | 首頁只見 10-27～10-28 共 8 則 | 0 |

### (d) 丙：智庫與工會

| 來源 | 狀態 | 列表最新 | 7 天內新項目 | 命中 |
|---|---|---|---|---|
| EPI | 200 | 2026-10-14 | 0 | 0 |
| Brookings K-12 教育 | 200 | 2026-10-27 | 2（K-12 段無 AI） | 0 |
| Brookings 教育科技 | 200 | 2026-09-18 | 0 | 0 |
| CRPE | 無頭 200 | 2026-10-20 | 0 | 0 |
| AFT 新聞稿 | 200 | 2026-10-28 | 4（無 AI） | 0 |
| EI Worlds of Education | 200 | 2026-10-27 | 1（教師短缺） | 0 |
| UNICEF Innocenti | 200 | 2026-10-09 | 0 | 0 |
| UNESCO AI 與教育專頁 | 無頭 2 次 502，改用 curl 200（只看到首批） | 2026-10-28 | 1（Almaty，C） | 0 |

### 命中處理

| 編號 | 來源 | 首發日（依據） | 範圍 | 對象 | 型態 |
|---|---|---|---|---|---|
| D20261029-02 | 西班牙 INTEF〈INTEF participa en SIMO EDUCACIÓN 2026〉 https://intef.es/Noticias/intef-en-simo-2026/ | 2026-10-22（頁面日期 22-10-2026；datePublished 2026-10-22T09:57:38+00:00；窗口最後一天） | A（T-ETH、T-BAS） | k12（非大學教育階段的教師與學校） | 官方摘要型 |

- **D20261029-02：**
  - **摘要依據：** 「Presentación de la actualización 2026 de la Guía sobre el uso de la inteligencia artificial en el ámbito educativo」段第 1、2 句與「Liderazgo y estrategia para integrar la IA」段第 1、2 句。
  - **限定：** 活動是 11-11～13 在馬德里舉行的教育科技展，AI 是其中兩場發表的議題。兩份指引的全文本次未見公開版本，不轉述其內容；新指引〈Orientaciones para la integración de la inteligencia artificial en los centros educativos〉待活動當天發表後再判。
  - **第二輪對照：** 隔離子代理判定大致一致。依建議補「主要新內容」「關鍵要素」「在教育社群中」，Proyecto Educativo 改譯「學校教育計畫」並寫明「相符」，第二份寫明為另一份新指引；修正後一致。
- **義大利 MIM〈Next Gen AI 2026, il Ministro Valditara all'iniziativa di chiusura〉**（10-22）：直播預告，與已發的 D20261022-05 同一活動，不另發。
- **TeachAI：** 本次快照與 `research/drafts/policy-tracker-snapshots/teachai-2026-10-22.txt` 完全相同，不另存。
- **反思池：** INVALSI 院長社論（10-20，窗口外）寫入 `research/drafts/reflection-pool.md`，供週報反思選讀；TALIS 2024 數字選錄前須對照 OECD 原表。
- **線索：** eTwinning（INDIRE）網路研討會〈AI, algoritmi e manipolazione dell'informazione: da Internet alla tua classe〉，來源為 MIM 第 286 期電子報（10-26）；原頁無頭 2 次 502、curl 1 次 reset，首發日與活動日期都不明，列入下方瀏覽器清單第 4 項。
- **窗口外：** UNESCO〈Faculties of Education in Latin America address how to prepare future teachers for the age of artificial intelligence〉（datePublished 10-20、dateModified 10-27），屬師培，每日短訊與週報不收，可供月報。
- **來源檔建議：** 捷克教育部網址改為 `https://msmt.gov.cz/aktuality`（可篩「Tiskové zprávy」標籤），原網址已轉向只列「Ministerstvo」標籤的頁面。需管理者同意後另開 PR。

## 臺灣

### 每日

| 來源 | 狀態 | 列表最新項目（臺灣時間） | 10-28 08:22 後新筆數 |
|---|---|---|---|
| 教育部即時新聞 RSS | 200 | 2026-10-28 11:19 | 2（臺灣台語認證報名、幼兒園本土語；無 AI） |
| 資訊及科技教育司 RSS | 200 | 2026-10-27 10:25 | 0 |
| 國教署即時新聞 | 200 | 2026-10-28 | 1（與教育部 RSS 重複） |
| 行政院公報開放資料 | 開放資料兩次逾時、一次 522；改讀網頁版 200 | 032 卷 198 期（2026-10-28） | 1 期；教育部、國教署條目 3 則（學生輔導諮商中心要點、專科以上遠距教學預告〔高教〕、教保服務機構要點〔幼教〕），無 AI |
| 行政院本院新聞 RSS | 200 | 2026-10-26 16:16 | 0 |
| 國科會新聞資料 RSS | 200 | 2026-10-27 16:00 | 1（災防科技中心合作備忘錄；上次紀錄後才看到，無 AI） |
| 數位發展部新聞發布（第 1 頁） | 200 | 2026-10-22 | 0 |
| 師資培育及藝術教育司 RSS | 200 | 2026-10-25 08:35 | 0 |
| 學生事務及特殊教育司 RSS | 200 | 2026-10-22 16:35 | 0 |

### 週四

| 來源 | 狀態 | 最新項目／卷期 | 7 天內新項目 | AI 相關 |
|---|---|---|---|---|
| 教育部主管法規查詢系統 | 200 | 115.10.28 | 4（10-28 兩筆同公報；10-22 兩筆身障輔導要點廢止、非正規教育課程認證） | 0 |
| 國家教育研究院最新消息與新聞公告 | 200（fid=15 第一次 reset，重試 200） | 2026-10-28 | 2 | **1，發布** |
| 國科會人工智慧基本法專頁 | 200 | 更新日期 2026/02/10 | 未更新 | — |
| OpenAlex（TW 機構，10-22 起） | 200 | 9 組單一詞去重 23 筆，教育相關 6 筆 | 0 筆可發 | — |
| 教育科學研究期刊 | 200 | 71(3) 九月刊 | 無新卷期（AI 專刊已於 10-15 截稿，尚未出刊） | 0 |
| 教育研究集刊 | 200 | 72(2)，2026-06-30 | 無新卷期 | 0 |
| 當代教育研究季刊 | 200 | 34(3)，2026-09-30 | 無新卷期 | 0 |

### 發布

| 編號 | 來源 | 首發日（依據） | 範圍 | 對象 | 型態 |
|---|---|---|---|---|---|
| D20261029-03 | 國家教育研究院〈國教院舉辦數學自主學習與數位資源應用國際課綱研討會～聚焦AI時代數學教育轉型　深化自主學習與教學創新〉 https://www.naer.edu.tw/PageDoc/Detail?fid=15&id=5690 | 2026-10-28（新聞公告發布日期） | B（T-TEA） | k12（首場演講講題為給國中小教師的實務分享） | 官方摘要型 |

- **摘要依據：** 第 1 段第 2 句、第 3 段第 1、2 句。第二場演講為香港大學職前教師研究（teacher_ed），不作為摘要依據。
- **第二輪對照：** 隔離子代理判定基本一致。依建議修改如下，修正後一致：
  - 寫明主辦單位全稱。
  - 首場演講改以講題呈現（不寫成聽眾限國中小教師）。
  - 補回「師生互動與情感支持」。
  - 分類說明刪去「在職」並改寫。
- **OpenAlex：** `10.1007/s40815-026-02305-z`（國立臺南大學，LLM 模糊代理人用於 STEM 與台語、英語共學，2026-10-26 線上刊出）摘要未寫學段與樣本，對象不明，C 邊界，暫不發；`10.3390/asi9110220` 為科技大學學生，higher_ed；其餘 4 筆 C。
- **國教院列表較早項目：** 2026-10-01 學術活動〈AI時代，老師還要教什麼？～高中以下教師角色的變遷：家長互動與學生教練〉在 repo 查無紀錄，首發超過 7 天，不進每日，可供月報參考。

## 候選池與知識庫

| 候選 | 知識庫 | 關係 |
|---|---|---|
| W2026-10-23-A21（Behavioral Sciences） | KB-2026-0460 | KR-15333～15342 |
| W2026-10-23-A22（INTEF） | KB-2026-0461 | KR-15343～15352 |
| W2026-10-23-A23（國教院） | KB-2026-0462 | KR-15353～15361 |
| W2026-10-23-A24（香港教育局） | KB-2026-0463 | KR-15362～15370 |

四筆同屬 batch 2026-10-29-daily-1。

## 需要管理者處理

本節為週四瀏覽器清單，由管理者轉交本機 session。結果請回傳每日短訊專用 session；回傳內容由本 session 重讀原頁後才發布。

### 0. 本日其他待辦（不需瀏覽器）

- **補查：** MEXT 10-27 大臣記者會見文字版（仍未上傳）、香港教育局局長同一議案的總結發言、Federal Register 10-29 期、香港 10-29 公報、行政院公報開放資料 zip。
- **讀取失敗：** 智利 Mineduc（代理通道中斷）下週四重讀，或改列瀏覽器清單，請管理者決定。
- **來源檔：** 捷克教育部網址建議改為 `/aktuality`（見上）。
- **仍待管理者回覆：** J52 Behavioral Sciences 知識庫回補（21 篇）由文獻 session（建議）或本 session 執行。


### 1. 待補論文（每日短訊）

| 項目 | 要什麼 | 期限 |
|---|---|---|
| https://www.mdpi.com/2076-328X/16/11/2017 （J52 Behavioral Sciences，`10.3390/bs16112017`〈Developmental, Contextual, and Profile-Based Heterogeneity in K–12 Students' Artificial Intelligence Literacy〉；MDPI 對程式回 403） | 文章頁「Published」日期與摘要的截圖，或全文 PDF | 11-03（首次公開 10-27） |

### 2. 週四政策列表掃描

範圍是 2026-10-22 以後的新項目。逐站看有沒有中小學 AI 相關項目，有的話給連結即可。

| 站 | 網址 |
|---|---|
| OECD 教育 | https://www.oecd.org/en/topics/education.html |
| 美國教育部新聞稿 | https://www.ed.gov/about/news/press-releases |
| 歐盟 European Education Area 新聞 | https://education.ec.europa.eu/news |
| 紐西蘭教育部新聞 | https://www.education.govt.nz/news |
| 新加坡教育部新聞稿 | https://www.moe.gov.sg/news/press-releases |
| 法國國民教育部 | https://www.education.gouv.fr/actualites |
| 阿聯教育部新聞 | https://www.moe.gov.ae/En/MediaCenter/News/Pages/default.aspx |
| 澳洲教育部新聞室 | https://www.education.gov.au/newsroom |
| 澳洲教育部長新聞 | https://ministers.education.gov.au/news |
| 澳洲 eSafety 媒體新聞稿 | https://www.esafety.gov.au/newsroom/media-releases |
| 英國 NEU（AI 篩選頁） | https://neu.org.uk/latest/press-releases?topic[679]=679 |
| 美國 FTC 新聞稿（只看標題含 AI、children、teens、students、schools） | https://www.ftc.gov/news-events/news/press-releases |
| 印度 PIB 新聞稿（教育部） | https://www.pib.gov.in/Allrel.aspx |

### 3. 臺灣期刊（每月最後一個週四；供 11-03 月報「臺灣研究」）

請看各刊最新一期（2026 年 9～10 月出刊者），列出與中小學 AI 相關的篇目：篇名、作者、卷期、出刊年月、網址或 DOI。

| 期刊 | 入口 |
|---|---|
| 教育研究與發展期刊（國家教育研究院） | https://naeraj.naer.edu.tw/wSite/JERD |
| 中等教育季刊（臺師大師資培育學院） | https://tecs.otecs.ntnu.edu.tw/index.aspx |
| 課程與教學季刊 | ISSN 1560-1277，全文在華藝線上圖書館（Airiti） |
| 臺灣教育評論月刊 | http://www.ater.org.tw/ |
| 教育科學研究期刊 AI 專刊（若本期有） | https://jories.ntnu.edu.tw/jres/ |

### 4. 線索（每日短訊）

| 項目 | 要什麼 | 期限 |
|---|---|---|
| https://etwinning.indire.it/eventi/webinar-ai-algoritmi-e-manipolazione-dellinformazione-da-internet-alla-tua-classe/ （eTwinning／INDIRE 網路研討會〈AI, algoritmi e manipolazione dell'informazione: da Internet alla tua classe〉；程式讀取遇代理通道中斷） | 頁面發布日期、活動日期與活動說明的截圖 | 11-03 |

## 補記（2026-10-30，管理者提供出版者 PDF 後）

D20261029-01（Behavioral Sciences `10.3390/bs16112017`）依管理者 2026-10-30 提供的出版者 PDF 改為作者摘要型；PDF 首頁 Published 27 October 2026，與 Crossref 一致。詳見 [2026-10-30 查核紀錄補記二](2026-10-30-daily-check.md)。瀏覽器清單第 1 項完成；第 4 項（eTwinning）仍待處理。
