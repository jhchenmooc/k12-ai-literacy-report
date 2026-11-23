# 每日短訊查核紀錄：2026-11-23（0 則）

> 每日短訊例行作業，由排程觸發，在每日短訊專用 session 執行。今天週一，候選池沿用 2026-11-20_2026-11-26。
> - **檢索：** 三個子代理分頭執行（國際研究、國際政策、臺灣中央來源）；判讀由本 session 複核。只查一次。
> - **查詢時間：** 2026-11-23T00:23Z–00:30Z（UTC）。
> - **請求紀錄：** 都沒帶 email 或 mailto；沒換 User-Agent；沒用無頭瀏覽器。ScienceDirect 回 403，未繞過。韓國教育部 보도자료 curl 連線中斷（rc=35，重試 8 次），改以 WebFetch 讀列表（模型轉述，只作線索）。行政院公報開放資料回 HTTP 521（重試一次）。
> - **結果：0 則。** 國際研究、國際政策、臺灣都沒有合格項目。

## 國際

### 研究查詢

| 來源 | 查詢 | 狀態 | 結果 |
|---|---|---|---|
| Crossref | from／until-created 11-22～11-23，六組關鍵詞，rows=60 | 200 | 143／415／195／252／503／265 |
| Crossref（proceedings-article） | 同日期 | 200 | 7／10／6／8／11／46，無合格項目 |
| Crossref（監測期刊 ISSN，J01–J53，6 批） | 帶與不帶 AI 詞 | 200 | 不帶 48 筆、帶 AI 詞 9 筆 |
| 教學代理人 | Crossref、OpenAlex（11-15 起）、arXiv | 200 | 無新合格項目 |
| arXiv | API 四組（索引只到 11-19）；cs.CY、cs.HC /new 00:26Z 仍為 11-20 批 | 200 | 無 K-12 正式論文 |
| alphaXiv | discover_papers，11-15 後 | 成功 | 9 筆皆預印本，不收 |

**不收：**
- 監測清單內：ILE `10.1080/10494820.2026.2758770`（巴基斯坦大學生，高教）；Eurasia JMSTE 19992（大一工科）、19993、19994（無 AI）；Sci Rep、HSSC 新件與 AI 素養無關。
- 職前：Sage Open 1510843、APER s40299-026-01164-4、Frontiers in Psychology 1869502。
- 清單外：ETAIC 2026 `10.1145/3856604.3856624`（國中生程式環境中的教學代理人回應策略；Crossref 無摘要、會議不在清單，同 11-22 ETAIC 多篇觀察）；低能見度期刊多篇（ijggsd、timer、erd、IJRISS、IJFMR、IJRSE、tjiss）不收。
- ASCILITE 依先例屬高教；本日無命中「不收出處」。

**回查：**
- arXiv 2611.21306：仍只有 v1，WiPSCE 2026 論文集未上線，維持觀察。
- Computers and Education Open `10.1016/j.caeo.2026.100436`：OpenAlex 已有摘要，對象為「533 pre-service teachers, in-service teachers, and university lecturers」，比例未載；Crossref 無 published-online、ScienceDirect 403，首發日與學段比例都不明，列瀏覽器清單。
- Computers in Human Behavior Reports `10.1016/j.chbr.2026.101457`：OpenAlex 摘要 43 名參與者看真人與 AI 分身講師影片，學段未寫，傾向成人或大學，不收。
- Studies in Educational Evaluation `10.1016/j.stueduc.2026.101705`：仍無摘要與文章類型，OpenAlex 日期 11-21；篇名看為架構文，比照 101707 傾向不發，列瀏覽器清單確認。

### 政策查詢

| 來源 | 狀態 | 結果 |
|---|---|---|
| GOV.UK DfE | 200 | 11-22〈Pupils learn money skills for real life in curriculum shake-up〉：理財課程改革，全文無 AI，C |
| GOV.UK Ofqual、Ofsted、AI 交叉、全站 AI × education | 200 | 無新教育項目 |
| DfE 諮詢網站 | 200 | 與昨天相同；其餘 post-16 諮詢未發布 |
| Federal Register | 200 | ED 篩選 5 件已記；ED × AI、「AI literacy」0 筆；11-23 期與 public inspection 無 ED、無教育 AI 項目 |
| MEXT | 200 | 無新項目；mext_00753 文字版仍未上傳；指引頁仍為 Ver.2.0 |
| 中國教育部 | 200 | 與昨天相同 |
| 香港政府新聞公報 | 200 | 11-22 全日（多為選委會選舉）、11-23 上午，無 AI 教育 |
| 韓國教育部 | curl 讀取失敗（connection reset）；WebFetch 列表 | 11-23〈교육부, 「대입 허위 원서접수 신고센터」 설치〉依標題判 C（入學行政防弊），原頁未讀，明日補核 |
| KICE、KERIS、UNESCO、Eurydice | 200 | 無新項目 |

- **E5a：** 11-16～11-23 未見漏收；韓國教育部此段因 curl 失敗只能對照 WebFetch 轉述的列表標題，記「搜尋未見」。另查到先前未記的 Ofsted 局長演講（11-18，演講不屬每日類型）、DCMS Million Hours Fund 評估（非 AI 教育）、中國教育部大學生網絡文化節通知（高教），都不收。

## 臺灣

| 來源 | 狀態 | 新筆數（11-22 08:23 後） | AI 命中 |
|---|---|---|---|
| 教育部即時新聞 RSS | 200 | 2（青年海外和平志工、沉浸式族語課程） | 0 |
| 國教署即時新聞 | 200 | 1（族語課程，重複） | 0 |
| 資科司、師培藝教司、學特司 RSS | 200 | 0 | — |
| 行政院公報開放資料 | **521**（讀取失敗） | 無法確認 | 上次確認為 115-11-20 期，明日補查 |
| 行政院本院新聞 RSS、國科會 RSS、數位部 | 200 | 0 | — |

- **E5a：** 11-16～11-23 RSS 項目全文比對，有 AI 詞者都已處理，未漏收；公報因 521 無法確認。
- **資訊月教育部專場論壇（11-14）：** 仍無新聞稿。

## 需要管理者處理

- **觀察：** MEXT mext_00753 文字版；arXiv 2611.21306 等 WiPSCE 論文集；韓國教育部 9094 原頁待補核；行政院公報 521 待補查。

## 請管理者用瀏覽器處理（2026-11-23）

| 序 | 項目 | 要什麼 | 期限 |
|---|---|---|---|
| 1 | https://doi.org/10.1016/j.caeo.2026.100436 （J41；AI 聊天機器人與二語讀寫的設計特徵量表；533 名職前、在職教師與大學教師；本期新列） | ScienceDirect 頁 Available online 日期與方法節樣本比例截圖（看在職中小學教師是否過半） | 依截圖日期，最遲 11-29 |
| 2 | https://doi.org/10.1016/j.stueduc.2026.101705 （J23；生成式 AI 時代的評量效度架構；本期新列） | ScienceDirect 頁 Available online 日期、文章類型與摘要截圖（概念文則不發） | 11-28 |
