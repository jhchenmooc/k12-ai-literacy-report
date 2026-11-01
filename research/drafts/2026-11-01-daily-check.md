# 每日短訊查核紀錄：2026-11-01（0 則）

> 每日短訊例行作業，由排程觸發，在每日短訊專用 session 執行。今天週日。
> - **檢索：** 由同一 session 的三個子代理分頭執行（國際研究、國際政策、臺灣中央來源），判讀由本 session 複核。
> - **查詢時間：** 2026-11-01T00:23Z–00:40Z（UTC）。
> - **請求紀錄：** 都沒帶 email 或 mailto。Wiley、Taylor & Francis 回 403（Cloudflare），未繞過；UNESCO 列表與 3 篇文章第一次空回應、國教署第一次連線 reset，重試後 200，沒換 User-Agent。
> - **結果：0 則。** 國際與臺灣都沒有合格項目；依規則不建頁、不登記，只提交本查核紀錄。

## 國際

### 查詢

| 來源 | 查詢 | 狀態 | 結果 |
|---|---|---|---|
| Crossref | `filter=from-created-date:2026-10-31,until-created-date:2026-11-01,type:journal-article`，六組 `query.bibliographic`，每組 rows=60 | 200（一組兩次 429，重試成功） | 各組總數 411／408／837／1610／239／786，各取 60 |
| Crossref（proceedings-article） | 同上日期 | 200 | 21，無合格項目 |
| Crossref（監測期刊 ISSN） | 29 個 ISSN；帶關鍵詞 rows=60、不帶 rows=200 | 200（J14 一次 429，重試成功） | J05 1、J06 3、J32 7、J33 15、J35 1、J40 1、J48 116、J49 1、J51 1，其他 0（J52、J53 皆 0） |
| 教學代理人 | Crossref 兩組 × 期刊／會議論文；OpenAlex（10-25 起）四組；arXiv 一組 | 200 | 無教學代理人 × K-12 研究 |
| arXiv API（https） | 三組（同前） | 200 | 10-25 起 57 筆（最新提交 10-29），未判過者皆不合格 |
| alphaXiv | discover_papers，published_after 2026-10-25 | 連線成功 | 10 筆，無新的 K-12 合格項目 |
| 出版者頁面 | Springer | 200 | — |
| 出版者頁面 | Wiley、Taylor & Francis | 403 | 未繞過 |
| GOV.UK | DfE、Ofqual、Ofsted（10-25 起 76 筆）；全站 10-31 起；關鍵詞六組 | 200 | 無新項目；全站 15 筆非教育 |
| Federal Register | term 三組、ED 篩選、ED × AI、10-31 期、11-02 期、public inspection | 200 | 10-31 期 0 筆（週六）；11-02 期 ED 只有已判過的 22341；term 新 1 則（FCC 超寬頻裝置），C |
| MEXT | 報道発表、新着、大臣記者會見 | 200 | 無新項目；10-30 記者會見（mext_00747）文字版仍未上傳 |
| 中國教育部 | 首頁加 19 欄目 | 200 | 2 則（黨組會議、中國國際教育年會），無 AI，C |
| 香港政府新聞公報 | 10-31 全日（英 12、中 13）；11-01 | 200 | 正文無 AI；11-01 查詢時尚未上載 |
| 韓國教育部 | 보도자료（第 1 次就成功） | 200 | 1 則：107533〈데이터로 읽는 우리 교육 제17호 발간〉（外國留學生，高教；AI 只見於舊刊標題），C |
| 韓國 KICE | 보도자료 | 200 | 無新項目 |
| 韓國 KERIS | 보도자료 | 200 | 無新項目 |
| UNESCO | `/en/newsroom` | 第一次空回應，重試 200 | 3 則，正文無 AI，C |
| Eurydice | /news | 200 | 無新項目 |

### E5a 前 7 天回查（政策，首次公開 10-25～11-01）

除已於 10-31 發布的韓國 107526 外，無漏收的 A、B 項目；另確認韓國 107520（修能智慧眼鏡作弊對應計畫）hwpx 全文無 AI。

### 待補（監測清單內，未達門檻）

- J06 Journal of Computer Assisted Learning `10.1002/jcal.70362`〈From Design to Classroom Adoption: Teachers' Perspectives on AI‐powered Writing Analytics in Resource‐Constrained Contexts〉：Crossref published-online 2026-10-30；Wiley 頁 403；摘要寫「involving nine teachers」，未寫學段，對象 unknown。若查實為中小學教師，可判 B（T-TEA）。列瀏覽器清單第 1 項。
- J40 Interactive Learning Environments `10.1080/10494820.2026.2754919`〈Teachers' perceptions of students' generative AI use, professional judgment, and pedagogical adaptation: a mixed-methods study〉：Crossref published-online 2026-10-30；T&F 頁 403；Crossref 與 OpenAlex 皆無摘要，作者單位為大學，對象 unknown。列瀏覽器清單第 2 項。

### 列觀察（出處不在監測清單）

- `10.33407/itlt.v115i5.6719` Information Technologies and Learning Tools：摩洛哥卡薩布蘭卡中學生 207 人在科學學習中使用 AI 的意圖（UTAUT）；published-online 10-31；k12。
- `10.15293/2658-6762.2605.07` Science for Education Today：俄國普通中等教育教師的 AI 態度與 4L 準備度模型；10-31；k12。
- `10.3278/zff2602w003` Zeitschrift für Fremdsprachenforschung：中學 EFL 寫作的學習者 AI 使用類型；10-30；無摘要。
- `10.65339/ijggsd.v1.i1.14`（菲律賓小學人員 20 人）、`10.67961/rjiem.v1i2.631`（伊斯蘭小學教師 AI 倫理概念模型）：新刊，品質待核。
- `10.30958/aje.13-4-3`（AI 協作撰寫兒童天文書個案，無受試者）、`10.66073/refocus-conf/0910026`（烏茲別克生物課理論模型，會議論文）、`10.31258/jes.10.10.p.1016-1032`（幼兒園教師與 PictoBlox，摘要無 AI）。
- UIST 2026（不在會議池）：`10.1145/3830398.3830492` PATHWiSE（教師以生成式 AI 編寫機器人輔助學習內容）、`10.1145/3830398.3830617` PACEE（幼兒情緒教育對話的家長中心 AI 鷹架）；published-online 只有 2026-11，無摘要。

### 不收

- **監測期刊：** J05 `s10639-026-14177-9`（高教）；J06 `jcal.70367`、`jcal.70368`（大學生）；J32 `s44217-026-02369-x`（大學一年級）、`02360-6`（無 AI）及其餘 5 筆（無 AI 或高教）；J51 `s40561-026-00475-9`（大學部）；J48 `s41598-026-78337-0`（體育職前教師 AI-TPACK，teacher_ed，可供月報）及其餘非教育；J33 15 筆非 K-12；J35 `ijcci.2026.100860`（無 AI，首發只有年月）；J49 `ejed.70918`（師培，無 AI）。
- **Crossref 關鍵詞：** 職前或師培、高教、首發早於 10-25、非教育或無 AI 者，逐筆紀錄在 session 暫存區。
- **arXiv、alphaXiv：** 大學、研究生、專家、一般人口、無受試者或技術論文；`2610.35609` 學段未寫，C。

## 臺灣

| 來源 | 狀態 | 列表最新項目（臺灣時間） | 10-31 08:26 後新筆數 |
|---|---|---|---|
| 教育部即時新聞 RSS | 200 | 2026-11-01 07:45 | 3（校園通行環境、SEL 嘉年華：原頁無 AI；奧地利大學校長訪臺：AI 只在合作領域列舉，屬高教，C） |
| 資訊及科技教育司 RSS | 200 | 2026-10-30 13:49 | 0 |
| 國教署即時新聞 | 第一次 reset，重試 200 | 2026-10-29 | 0 |
| 行政院公報開放資料 | 200 | 115-10-30（與前日相同） | 0 期 |
| 行政院本院新聞 RSS | 200 | 2026-10-31 16:24 | 3（AI 只見於產業與財政政策，不涉教育，C） |
| 國科會新聞資料 RSS | 200 | 2026-10-30 10:00 | 0 |
| 數位發展部新聞發布（第 1 頁） | 200 | 2026-10-22 | 0 |
| 師資培育及藝術教育司 RSS | 200 | 2026-10-30 11:13 | 0 |
| 學生事務及特殊教育司 RSS | 200 | 2026-10-31 11:25 | 1（SEL 嘉年華，重複，無 AI） |

- **E5a（首次公開 10-25～11-01）：** 無漏收。

## 需要管理者處理

- **補查：** MEXT 10-30 大臣記者會見文字版（mext_00747）仍未上傳。

## 請管理者用瀏覽器處理（2026-11-01）

| 序 | 項目 | 要什麼 | 拿到後可做什麼 | 期限 |
|---|---|---|---|---|
| 1 | https://doi.org/10.1002/jcal.70362 （J06 JCAL，9 位教師評估 AI 寫作分析工具；Wiley 403） | 文章頁 Methods／Participants 段落截圖或全文 PDF（確認教師任教學段） | 若為中小學教師，補登作者摘要型 | 11-06 |
| 2 | https://doi.org/10.1080/10494820.2026.2754919 （J40 ILE，教師對學生使用生成式 AI 的看法；T&F 403，無摘要） | 文章頁「Published online」日期與摘要截圖，或全文 PDF | 確認對象後補登作者摘要型 | 11-06 |
