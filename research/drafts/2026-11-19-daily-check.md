# 每日短訊查核紀錄：2026-11-19（2 則；r1 補登後 3 則）

> 每日短訊例行作業，由排程觸發，在每日短訊專用 session 執行。今天週四。
> - **檢索：** 由同一 session 的四個子代理分頭執行（國際研究、國際政策每日來源、臺灣中央來源含週四加查、週四保留試行來源 12 個）；判讀由本 session 複核。子代理只查一次、不迴圈等待。
> - **查詢時間：** 2026-11-19T00:23Z–00:40Z（UTC）。
> - **請求紀錄：** 都沒帶 email 或 mailto；沒換 User-Agent。MDPI、T&F、ScienceDirect 出版社頁回 403，未繞過。Federal Register public inspection 回 403（IP 封鎖訊息），未繞過；「AI literacy」查詢與 11-18 期今天讀得到。mext_00751 與 UNESCO 一頁各遇一次連線中斷，腳本自動重試一次取得 200（記於子代理 log）。
> - **結果：2 則。** 國際 1 則：D20261119-02 英國 Ofqual 教案〈AI and your coursework〉（官方摘要型，A）。臺灣 1 則：D20261119-01 教育部〈中小學AI教學實踐計畫期中成果發表會〉（官方摘要型，A）。
>   - 知識庫：KB-2026-0586、0587（候選 W2026-11-13-A20、A21）。
>   - 第二輪：隔離子代理逐句對照。教育部一則需修改（摘要把「規劃建立」寫成已建立，已恢復原文語氣）；Ofqual 一則通過，依建議補「適用範圍為英格蘭」。同一模型，非獨立審閱。

## 國際

### 研究查詢

| 來源 | 查詢 | 狀態 | 結果 |
|---|---|---|---|
| Crossref | from／until-created 11-18～11-19，六組關鍵詞，rows=60 | 200 | 總數 559／1743／738／799／1579／1085 |
| Crossref（proceedings-article） | 同日期 | 200 | 無合格項目 |
| Crossref（監測期刊 ISSN，J01–J53） | 帶與不帶 AI 詞 | 200 | 不帶 255 筆、帶 AI 詞 34 筆 |
| 教學代理人 | Crossref、OpenAlex、arXiv | 200 | 無合格項目 |
| arXiv | API 三組（索引到 11-14）；cs.CY、cs.HC /new（11-18 批） | 200 | 2611.19099 為大學，其餘無 K-12 AI |
| alphaXiv | discover_papers，11-11 後 | 成功 | 新的 K-12 項目只有預印本（不收） |

**接近合格，待原文（列瀏覽器清單）：**
- Education Sciences `10.3390/educsci16111982`（J47，11-18）〈Perceived Benefits and Reported Uses of Generative AI for Accessibility: An Exploratory Survey of Minnesota Educators〉：樣本為「293 Minnesota PK-12 and higher education educators」，摘要未給學段人數；MDPI 403。PK-12 過半才可發，暫判 B（T-TEA）。
- IJER `10.1016/j.ijer.2026.103160`：小學生（依篇名），Crossref 無線上日、無摘要，ScienceDirect 403。

**回查：** CAEAI `10.1016/j.caeai.2026.100695`：OpenAlex 摘要顯示為高教教學評鑑的系統性回顧，不收。Early Education and Development `10.1080/10409289.2026.2762493`：OpenAlex 已有摘要（含 PDF 行號殘字、結尾截斷），樣本「1,696 Chinese ECE educators」，未寫服務幼兒年齡，無法確認為 3–6 歲學前教師；清單外，維持觀察。arXiv 2611.21306：仍只有 v1，未寫論文類型，維持觀察。

**清單外觀察（管理者決定是否單篇例外）：**
- IJSME `10.1007/s10763-026-10747-y`〈Generative AI-Enhanced STEM-Education: Investigating Teachers' Experiences from Implementation in Primary School Settings〉：Springer 頁 200，Published 2026-11-18；瑞典 11 位小學在職教師六個月專業發展先導研究，使用 Digital Promise AI Literacy Framework；A（T-TEA、T-PD）。如收可發至 11-25。
- Journal of Children and Media `10.1080/17482798.2026.2764275`〈Using without understanding: AI literacy and trust in large language models among elementary school children in Germany〉：Crossref 2026-11-18；T&F 403、無摘要；依篇名 A。
- Next Research 希臘中學教師 AI 素養測驗、Discover Sustainability 南亞校長、ICER（ACI）研究計畫、IJISRT、Int J Educ Humanities 等：首發日不符、無摘要或品質待核，不收。

**不收（摘要）：** Frontiers in Education 1968847（研究生）、1983378、1957370（高教回顧）、1941774（師培）；Education Sciences 1981、1975、1979（職前）、1976（高教）、1980（無 AI）；EJED 70947、70948（大學）、70951（學段不明）；Smart Learning Environments 00478-6（大學）；Sci Rep 約 25 篇非教育；ASCILITE 依不收出處排除。

### 政策查詢（每日來源）

| 來源 | 狀態 | 結果 |
|---|---|---|
| GOV.UK DfE | 200 | 11-18 新 13 件、11-19 新 1 件，無 AI；其餘三批 post-16 諮詢尚未開放 |
| GOV.UK Ofqual | 200 | 4 件：教案〈AI and your coursework〉→ D20261119-02；致考試機構信（AI 與穿戴裝置舞弊）C；局長演講不屬每日類型 |
| GOV.UK Ofsted | 200 | 4 件（含演講），無每日項目 |
| Federal Register | ED 篩選、ED × AI、「AI literacy」（11-12 起 0 筆）、11-18 期 200；public inspection 403（讀取失敗，未繞過）；11-19 期尚未刊出 | ED 無新件 |
| MEXT | 200 | 6 件無 AI 新措施；mext_00751、00752 文字版仍未上傳 |
| 中國教育部 | 200 | 文件 1 件（哲社研究專項，高教），無 AI |
| 香港政府新聞公報 | 200 | 11-18 全日英 53、中 71 則；LCQ12 書面答覆重述舊藍圖，C；11-19 尚無稿 |
| 韓國教育部 | 200 | 107692、107693、107697：修能防 AI 舞弊考場措施與政府 TF，考試安全，C |
| KICE | 200 | 報道資料 1 件（文解力），無 AI；研究板無新項目（基準 3948） |
| KERIS、Eurydice | 200 | 無新 AI 項目 |
| UNESCO newsroom | 200 | 4 件；AI 與人權活動採訪邀請，對象為一般公眾，C |

- **D20261119-02 說明：** 母頁〈AI in coursework: resources for schools〉2026-03-09 首發（已入庫 KB-2026-0331）；11-18 更新新增教案、海報、集會簡報與家長通訊稿並撤下 3 月版教案。本則以 11-18 首次公開的教案 HTML 為來源。Ofqual 同日致考試機構信預告將因 AI 修改 A Level 歷史與英文非考試評量，日後正式諮詢發布時再判。
- **E5a：** 11-12～11-19 未見漏收；Federal Register「AI literacy」11-16～11-18 的讀取缺口今天補上（0 筆）。

## 臺灣

### 每日（上次 11-18 08:23 臺灣時間之後）

| 來源 | 狀態 | 新筆數 | AI 命中 |
|---|---|---|---|
| 教育部即時新聞 RSS | 200 | 6 | 中小學 AI 教學實踐計畫期中成果 → D20261119-01；中小學教師教學創新行動計畫（AI 為四焦點之一）不收，見下；國資圖「讀享AI」（全民讀者服務）C；國教署防詐研習（AI 詐騙一句）C；農技競賽、大學住宿無 AI |
| 資科司 RSS | 200 | 1（重複） | — |
| 國教署即時新聞 | 200 | 2（重複） | 0 |
| 行政院公報 | 200 | 115-11-18 期 19 筆，教育部 169564（私立技專經費要點，高教） | 0 |
| 行政院本院新聞、國科會 RSS | 200 | 3、1 | 0 |
| 數位部、學特司 | 200 | 0 | — |
| 師培藝教司 RSS | 200（一次連線中斷後重試） | 1（重複） | — |

- **不收：** 教育部〈教學現場就是研發基地！教育部推動中小學教師教學創新行動計畫〉（11-18）：116 年度補助計畫以 AI 前瞻教學創新、人權教育、SEL、美感教育為四焦點，AI 只是其中之一，主體為教師自主研究；比照 AI 只占一部分判 C 的先例不發，轉月報背景。

### 週四（上次 11-12）

| 來源 | 狀態 | 列表最新 | 新項目 | 命中 |
|---|---|---|---|---|
| 教育部主管法規查詢系統 | 200 | 2026-11-18 | 6（軍訓教官、教師證書、專業輔導人員、涉性別事件通報、私立技專經費） | 0 |
| 國家教育研究院最新消息 | 200 | 2026-11-12 | 0 | 0 |
| 國科會人工智慧基本法專頁 | 200 | 更新日期 2026-02-10 | 0 | 0 |
| OpenAlex（臺灣機構） | 200 | 2026-11-16 | 7 | 0（教育相關 3 筆為國際刊物，前幾期已處理） |
| 教育科學研究期刊、教育研究集刊、當代教育研究季刊 | 200 | 71(3)、72(2)、34(3) | 0 | 0 |

- **E5a：** 11-12～11-19 未漏收。
- **資訊月教育部專場論壇（11-14）：** 仍無新聞稿。

## 週四保留來源（F2 試行來源，依「試行來源去留」2026-11-19 起每週 12 個）

上次讀取 2026-11-12 約 01:00 UTC。愛沙尼亞（雙週，11-26 起）、月查與停查來源本週不讀。

| 來源 | 讀取狀態 | 列表最新 | 新項目 | K-12×AI 相關 | 命中 |
|---|---|---|---|---|---|
| 德國 KMK | 200 | 18.11.2026 | 2 | 1 | 每日候選 1（見下，另以補登處理） |
| Education International 新聞 | 200 | 17 Nov 2026 | 2 | 0 | 0 |
| 西班牙教育部 | 200 | 18/11/2026 | 8 | 1（SIMO 參訪順帶一句，與 D20261029-02 同一活動） | 0 |
| 西班牙 INTEF | 200 | 2026-11-10 | 沒有新項目 | — | 0 |
| 挪威 Udir | 無頭（200） | 17.11.2026 | 4 | 0 | 0 |
| 丹麥 UVM | 無頭（200） | 17.11.2026 | 3 | 0 | 0 |
| 墨西哥 SEP | 200 | 18 nov 2026 | 8（Boletín 377、379–385） | 0 | 0 |
| 義大利 MIM | 無頭（200） | 17/11/2026 | 5＋電子報 289 期 | 0 | 0（線索 2，見下） |
| Brookings 教育科技 | 200 | 2026-10-29 | 沒有新項目 | — | 0 |
| CRPE | 無頭（200） | 2026-11-12 | 1 | 1 | 反思候選 1 |
| 美國 AFT 新聞稿 | 200 | 11/10/26 | 沒有新項目 | — | 0 |
| UNESCO AI 與教育專頁 | 無頭（內容已載入，無 HTTP 碼） | 活動頁 2026-11-17 | 1 | 1 | 每日候選 1（待決，見下） |

- **每日候選 → D20261119-03（r1 補登，KB-2026-0588）：** 德國 KMK〈Berufliche Schulen sollen zu Innovationstreibern für digitales und KI-gestütztes Lernen werden〉（2026-11-16）與建議文件〈Handlungsempfehlungen zweiter Arbeitszyklus〉：職業學校以 KI 發展教學與考試、學生的數位自主與對 KI 的批判反思；A，對象為職業學校學生與教師（中等職業教育屬 K-12；berufliche Schulen 含少數中學後 Fachschule，於範圍限制註明）。本 session 重讀原頁、建快照；第二輪由隔離子代理逐句對照，判定需修改（範圍說明「須」改「將」、Modellprojekte 改譯「試點計畫」），修正後一致，今日以補登加入本期（revised_on 與 corrections.json）。
- **每日候選（待管理者決定）：** UNESCO 聖地牙哥辦事處〈Online workshop 'Teachers, dive into AI!'〉（頁面 datePublished 2026-11-17）：對象為拉丁美洲與加勒比中小學教師的 AI 線上工作坊，A（T-BAS、T-ETH）；屬活動公告，合辦者 CodeAI、屬「Hour of AI 2026」，活動於 11-19 19:00 UTC 舉行。本 session 暫不發，請管理者決定。
- **反思候選：** CRPE〈Putting AI Into Practice: Lessons from Educator-Led Pilots in California〉（2026-11-12），已記入 reflection-pool.md。
- **線索（未讀、未判）：** MIM 電子報 289 期的 INDIRE 網路研討會〈Educazione al digitale〉（INDIRE 頁 11-05，窗口外）與 INVALSI〈Oltre lo schermo: che cosa dicono i primi dati INVALSI sulle competenze digitali〉；KMK Pakt 專頁確認建議書是否更早公開。
- **AFT：** 本週沒有新項目；11-10 的 AFT、UFT 與 Anthropic 協議已由管理者決定不發每日、轉月報背景。

## 需要管理者處理

- **待你在本 session 決定：**
  - UNESCO〈Teachers, dive into AI!〉線上工作坊是否收（見上）。
  - 清單外單篇例外：IJSME `10.1007/s10763-026-10747-y`（瑞典小學教師 GenAI STEM 專業發展，A，可發至 11-25）；Journal of Children and Media `10.1080/17482798.2026.2764275`（德國小學生 AI 素養與對 LLM 的信任，無摘要）。
- **補查（明日）：** Federal Register public inspection 與 11-19 期；香港 11-19；MEXT mext_00751、00752；DfE 其餘三批 post-16 諮詢；Ofqual A Level 非考試評量修改提案；韓國修能舞弊 TF 後續；Education Sciences 1982、IJER 103160、Studies in Educational Evaluation 101707；arXiv 11-19 批 /new；KMK Pakt 專頁；INVALSI 數位能力資料。

## 請管理者用瀏覽器處理（2026-11-19）

### 1. 待補論文（每日短訊）

| 序 | 項目 | 要什麼 | 期限 |
|---|---|---|---|
| 1 | https://doi.org/10.3390/educsci16111982 （J47；明尼蘇達教師 GenAI 與無障礙；PK-12 與高教混合；本期新列） | 全文 PDF（看 PK-12 與高教人數；PK-12 過半可發） | 11-25 |
| 2 | https://doi.org/10.1016/j.ijer.2026.103160 （IJER；小學生 ChatGPT 數學寫作；本期新列） | ScienceDirect 頁 Available online 日期與摘要截圖 | 依截圖日期，最遲 11-24 |
| 3 | https://doi.org/10.1080/17482798.2026.2764275 （清單外 Journal of Children and Media；德國小學生 AI 素養；本期新列） | 摘要截圖（若決定單篇例外） | 11-25 |
| 4 | https://doi.org/10.1080/10409289.2026.2762493 （清單外 Early Education and Development；中國幼教教師 AI 接受度；11-18 列） | 全文或方法節截圖（確認是否為 3–6 歲學前教師；若決定單篇例外） | 11-23 |

### 2. 週四政策列表掃描（11-12 以後的新項目）

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
| 印度 PIB 新聞稿（教育部） | https://www.pib.gov.in/Allrel.aspx |

看到首次公開 2026-11-12 以後、與中小學 AI 相關的項目，請貼網址或截圖；沒有新項目也請回「無」。依「試行來源去留」，美國 FTC 已自清單移除；英國 NEU 改在每月最後一個週四（11-26）列入。
