# 每日短訊查核紀錄：2026-11-02（1 則，晨間 0 則、管理者決定後補發 1 則）

> 每日短訊例行作業，由排程觸發，在每日短訊專用 session 執行。今天週一。
> - **檢索：** 由同一 session 的三個子代理分頭執行（國際研究、國際政策、臺灣中央來源），判讀由本 session 複核。
> - **查詢時間：** 2026-11-02T00:24Z–00:40Z（UTC）。
> - **請求紀錄：** 都沒帶 email 或 mailto；本次未請求出版社頁，沒遇到 403 或驗證頁。中國教育部 https 網址現在 302 轉到 http，改用 http 讀取，19 個欄目都回 200（不是被擋）。
> - **結果：0 則。** 國際與臺灣都沒有合格項目；依規則不建頁、不登記，只提交本查核紀錄。
> - **前日待決事項：** main #418 已放寬 by-country 測試並替 KB-2026-0503 補標 BR；ILE `10.1080/10494820.2026.2754919` 依管理者 11-01 決定入庫為 higher_ed（KB-2026-0507），不發每日短訊。

## 國際

### 查詢

| 來源 | 查詢 | 狀態 | 結果 |
|---|---|---|---|
| Crossref | `filter=from-created-date:2026-11-01,until-created-date:2026-11-02,type:journal-article`，六組 `query.bibliographic`，每組 rows=60 | 200（一組一次 429，重試成功） | 各組總數 289／321／800／1735／235／616，各取 60 |
| Crossref（proceedings-article） | 同上日期 | 200 | 66（取 40），無 K-12 × AI |
| Crossref（監測期刊 ISSN） | 29 個 ISSN（含 J52、J53）；帶關鍵詞 rows=60、不帶 rows=200 | 200（J06、J47 一次 429，重試成功） | J33 1（非教育）、J48 39（非教育），其餘 0 |
| 教學代理人 | Crossref 兩組 × 期刊／會議論文；OpenAlex（10-26 起）四組；arXiv 一組 | 200 | 無教學代理人 × K-12 研究 |
| arXiv API（https） | 三組（同前） | 200 | 10-26 起 51 筆（最新提交 10-29），皆已判過；週一新一批查詢時尚未進 API |
| alphaXiv | discover_papers，published_after 2026-10-26 | 連線成功 | 12 筆，無新的 K-12 合格項目 |
| GOV.UK | DfE、Ofqual、Ofsted（10-25 起 76 筆）；全站 11-01 起；AI 關鍵詞七組 | 200 | 機構無新項目；全站 27 筆非教育；關鍵詞無新項目 |
| Federal Register | term 三組、ED 篩選、ED × AI、11-02 期、public inspection | 200 | 11-02 期新 2 則（海軍、NOAA），C；其餘與前次相同 |
| MEXT | 報道発表、新着、大臣記者會見 | 200 | 無新項目；10-30 記者會見（mext_00747）文字版仍未上傳 |
| 中國教育部 | 首頁加 18 欄目（http） | 200 | 無新項目 |
| 香港政府新聞公報 | 11-01 全日（英 9、中 11）；11-02 | 200 | 正文無 AI；11-02 查詢時尚未上載 |
| 韓國教育部 | 보도자료（第 1 次就成功） | 200 | 無新項目 |
| 韓國 KICE | 보도자료 | 200 | 無新項目 |
| 韓國 KERIS | 보도자료 | 200 | 無新項目 |
| UNESCO | `/en/newsroom` | 200 | 無新項目 |
| Eurydice | /news | 200 | 無新項目 |

### E5a 前 7 天回查（政策，首次公開 10-26～11-02）

無漏收的 A、B 項目。本次另補讀 4 項，皆 C：DfE〈School and college voice: June 2026〉（10-29 新增，全文無 AI）；Ofqual〈Regulating Technical Qualifications in T Levels〉諮詢（10-29，6 個分頁無 AI）；DWP 對 SSAC Occasional Paper 27 的回應（10-26，AI 僅用於地方政府資料分析）；〈Further education: initial teacher education〉（10-28，只更新機構名單）。中國教育部 1456151（上海財經大學，10-27）屬高教。

### 列觀察（出處不在監測清單，首發在 10-26～11-02）

- `10.58421/gehu.v5i5.1993` Journal of General Education and Humanities〈Tangible AI in the Elementary Classroom: Effects on AI Literacy, Computational Thinking, and Learner Dispositions〉：小學五年級 36 人與教師 1 人，單組前後測；Crossref published-online 11-01；A（S-BAS）；出處審查品質未核實。
- `10.46336/ijeer.v6i4.1443` International Journal of Ethno-Sciences and Education Research：小學四、五年級 AI 輔助學習與傳統媒材的準實驗（各組 42 人）；11-01。
- `10.55681/jige.v7i4.6975` Jurnal Ilmiah Global Education：Gemini AI 繪本用於印尼小學三年級（質性，informant 4 人）；10-31。
- `10.33578/jpfkip.v15i5.1423-1444` Primary: Jurnal Pendidikan Guru Sekolah Dasar：小學數學使用 AI 的系統性回顧（15 篇）；10-31。
- `10.21608/ijcte.2026.535293`、`10.21608/ijcte.2026.535524.1141`（沙烏地國中、小學 AI 相關研究）：Crossref 首發記為 2026-12-01，無摘要，首發日無法確認。
- `10.25078/pw.v11i2.7372` Pratama Widya：AI 視覺媒材與幼兒品格（文獻研究）；10-31。

### 不收

- alphaXiv〈Scale of Artificial Intelligence Awareness and Usage Tendencies for Middle School Students〉（`10.53444/deubefd.1611893`）：Crossref published-online 2025-06-30，首發早於窗口。
- alphaXiv 2610.39538（大學課程）、2610.36181、2610.37348（一般成人）、2610.40584（數學研究者）、2610.39606（高教）；其餘已判過。
- Crossref 關鍵詞：高教或大學教師（`eu-jer.16.1.137`、`0869-3617-2026-35-10-96-111`、`sej.v8i4.4904`、`ijelt.13/vol14n33445`、`w8phsw49`）；學段未寫（`aje.13-4-4`、`ijfmr.2026.v08i05.90918`）；首發早於 10-26 者；非教育或 C 類者。

## 臺灣

| 來源 | 狀態 | 列表最新項目（臺灣時間） | 11-01 08:35 後新筆數 |
|---|---|---|---|
| 教育部即時新聞 RSS | 200 | 2026-11-01 13:47 | 1（國教署〈深化素養導向體育教學…〉，原頁無 AI） |
| 資訊及科技教育司 RSS | 200 | 2026-10-30 13:49 | 0 |
| 國教署即時新聞 | 200（一次成功） | 2026-10-29 | 0 |
| 行政院公報開放資料 | 200 | 115-10-30（與前日相同） | 0 期 |
| 行政院本院新聞 RSS | 200 | 2026-10-31 16:24 | 0 |
| 國科會新聞資料 RSS | 200 | 2026-10-30 10:00 | 0 |
| 數位發展部新聞發布（第 1 頁） | 200 | 2026-10-22 | 0 |
| 師資培育及藝術教育司 RSS | 200 | 2026-10-30 11:13 | 0 |
| 學生事務及特殊教育司 RSS | 200 | 2026-10-31 11:25 | 0 |

- **E5a（首次公開 10-26～11-02）：** 無漏收。

## 需要管理者處理

- **補查：** MEXT 10-30 大臣記者會見文字版（mext_00747）仍未上傳；arXiv 週一新一批與香港 11-02 公報，明日一併查。
- **觀察項：** 不在監測清單的出處（見上）只列觀察，是否發布或評估，由管理者決定。

## 請管理者用瀏覽器處理（2026-11-02）

今日無（11-01 清單兩項已處理：JCAL 已發 D20261101-01，ILE 依管理者決定入庫為 higher_ed）。

## 補記（2026-11-02，管理者決定單篇例外後）

文獻 session 轉告管理者 2026-11-02 決定：觀察項 `10.58421/gehu.v5i5.1993` 以單篇例外收錄並發布（A，S-BAS，k12）；單組前後測、無對照組，不得寫成效或因果；期刊是否列入清單由文獻 session 另行反查。本則的決定經由其他 session 轉述，PR 開出後待管理者在本 session 確認才合併。

| 編號 | 來源 | 首發日（依據） | 範圍 | 對象 | 型態 |
|---|---|---|---|---|---|
| D20261102-01 | Journal of General Education and Humanities（不在監測清單，單篇例外），Prabawa、Kusnendar、Sopianti、Fitriani、Rohati〈Tangible AI in the Elementary Classroom: Effects on AI Literacy, Computational Thinking, and Learner Dispositions〉 https://doi.org/10.58421/gehu.v5i5.1993 | 2026-11-01（出版社頁 Published 2026-11-01；citation_date 與 Crossref published-online 同日） | A（S-BAS） | k12（一所公立小學五年級學生 36 人與教師 1 人） | 作者摘要型 |

- **摘要依據：** Abstract 第 2、3、4 句與末句；只寫研究目的、介入設計、樣本與作者自述限制，前後變化、效果量與百分比依規則不寫入；末句前半（作者對實體 AI 前景的評語）亦不寫入。
- **出處：** 期刊不在監測清單，審查程序未獨立核實，限制欄已註明；作者單位為印尼教育大學與占碑大學，摘要未寫研究地點，知識庫不記研究國別。
- **第二輪對照：** 隔離子代理判定通過。依建議修改如下，修正後一致：
  - 補「整合」兩框架的架構。
  - 中文篇名的 Effects 不譯為「效果」，改以與摘要一致的「變化」譯出。
- **頁面：** 本期晨間為 0 則、未建頁；本次新建 `daily/2026-11-02/` 並在 issues.json 登記（前無已刊頁面，不需更正紀錄）。
- **候選池與知識庫：** W2026-10-30-A12（batch 2026-11-02-daily-1）→ KB-2026-0508，KR-15786～15793；不加 `published_in`（不在監測清單）。
