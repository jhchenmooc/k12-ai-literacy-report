# 每日短訊查核紀錄：2026-11-14（2 則）

> 每日短訊例行作業，由排程觸發，在每日短訊專用 session 執行。今天週六。
> - **檢索：** 由同一 session 的三個子代理分頭執行（國際研究、國際政策、臺灣中央來源），判讀由本 session 複核。子代理只查一次、不迴圈等待，三組都在 4 分鐘內回報。
> - **查詢時間：** 2026-11-14T00:24Z–00:27Z（UTC）。
> - **請求紀錄：** 都沒帶 email 或 mailto；沒換 User-Agent。Sage、ScienceDirect、sciencedomain 出版社頁回 403，未繞過；資科司 RSS 一次 reset、UNESCO 兩頁連線中斷，重試成功；Crossref 一次 429，重試成功。
> - **結果：2 則。** 國際研究 1 則；國際政策 0 則；臺灣 1 則。

## 本期項目

| 編號 | 來源 | 首發日（依據） | 範圍 | 對象 | 型態 |
|---|---|---|---|---|---|
| D20261114-01 | Educational Technology Research and Development（J07）〈Developing and validating the human-AI collaboration competency scale〉 | 2026-11-13（出版社頁 Published；Crossref 同日） | A（S-BAS） | k12（南韓兩所高中 16–17 歲，兩組樣本 195、356 人） | 作者摘要型 |
| D20261114-02 | 教育部（資科司）〈115年度總統盃AI素養爭霸賽圓滿閉幕…〉 | 2026-11-13（上版日期 115-11-13；RSS 16:51 臺灣時間） | A（S-BAS） | k12（國中小學生 384 人） | 官方摘要型（臺灣） |

- **-01：** 摘要依據 Abstract 第 2、4、5 句；效度結果與作者結論不寫入。第二輪：引句、數字、範圍說明與首發日通過，刪去對應不到所引原文的 S-LRN。
- **-02：** 同一活動的晉級名單公告已收 D20261106-03，本則為競賽結果新發布。摘要依據新聞第 1 段首句、第 2 段與第 3 段末句；得獎名單、總冠軍、致詞與 AI 人才方舟計畫背景（KB-2026-0095）、能力展現敘述不寫入。第二輪：改「全國競賽」、把「限時完成」「審核與預選賽」改回原文主語，分類理由刪去原文未寫的「訓練監督式學習模型」。
- **候選池與知識庫：** W2026-11-13-A04～A05（batch 2026-11-14-daily-1）；KB-2026-0566～0567。

## 國際

### 研究查詢

| 來源 | 查詢 | 狀態 | 結果 |
|---|---|---|---|
| Crossref | from／until-created 11-13～11-14，六組關鍵詞，rows=60 | 200 | 總數 519／523／1243／4008／525／1256 |
| Crossref（proceedings-article） | 同日期 | 200 | 247 筆，取 40；TIE 2026 一篇（只有年份） |
| Crossref（監測期刊 ISSN） | 29 個 ISSN；帶與不帶關鍵詞 | 200（J47 一次 429，重試成功） | 有篇數：J02、J07、J29、J31、J32、J33、J47、J48、J52；K-12 AI 相關：J07 s11423-026-10753-5 → D20261114-01 |
| 教學代理人 | Crossref × 期刊／會議；OpenAlex；arXiv | 200 | CAEAI 100692（見下）；其餘不相關 |
| arXiv | API 三組（11-07 後）；cs.CY、cs.HC /new（11-13 批） | 200 | 未判過的 16 筆皆非 K-12 |
| alphaXiv | discover_papers | 成功 | 15 筆；未判過者 C 或非 K-12 |
| 回查 | LPS 2762927；educsci16111942、16111936 | 200 | LPS：OpenAlex 已收錄但仍無摘要；16111942、16111936：OpenAlex 已有摘要（OpenAlex 非原文，書目型維持，待出版社頁或 PDF） |

**監測清單內、待確認：** J02 `10.1016/j.caeai.2026.100692`〈Pedagogical AI Agents as Teacher-Authored Instructional Proxies: Conceptualization and Illustrative Design〉：Crossref 只有 published-print 2026-11（無日）、無摘要，ScienceDirect 403；概念論文，對象不明。見瀏覽器清單。

**觀察（清單外；管理者決定是否單篇例外）：**
- International Journal of Behavioral Development（Sage）`10.1177/01650254261500063`：克羅埃西亞中小學生 3,906 人 AI 科技使用、數位風險與生活滿意度，AI 素養為調節變項；Crossref 2026-11-13；A（S-BAS、S-ETH）；摘要只見 Crossref（Sage 403）。
- Journal of Education, Society and Behavioural Science `10.9734/jesbs/2026/v39i61533`：奈及利亞公立中學教師 360 人生成式 AI 準備度與能力的性別差異；Crossref 2026-11-13；A（T-BAS、T-TEA）；出版商品質訊號弱。
- Technium Education and Humanities `10.47577/teh.v13i.13907`：伊拉克初中二年級 58 人 AI 數學解題準實驗；投稿與刊出同日，品質疑點。
- IJRISS `10.47772/ijriss.2026.101000645`：馬來西亞小學特教 AI 系統性回顧；B。

**不收（摘要）：** TIE 2026 `tie26.114g`（只有年份）；KACE 29(10) 四篇（published-print 2026-10-31，窗口外，可供月報或知識庫）；higher_ed 7 篇；teacher_ed 或窗口外多篇；aere.2026.01.003（C）；學段不明 2 篇；只有年份 2 篇；arXiv 2611.14664、14798、15170、15686、17220（higher_ed）、2611.16986（unknown）、2611.14828（C）、2602.15876（窗口外）。

### 政策查詢

| 來源 | 狀態 | 結果 |
|---|---|---|
| GOV.UK | 200 | 15 筆，content API 逐篇查無 K-12 AI；Data protection in schools 11-13 只更新非 AI 一節（頁面 2023 首發），C |
| Federal Register | 200 | 11-13 期 118 件，ED 只有已判 C 的 2026-23155；public inspection 11-16、11-17 期 ED 1 件（貸款免除資料蒐集，無 AI） |
| MEXT | 200 | 新着 6 件（AI for Science WG 屬科研，C）；11-13 新會見 mext_00751 關鍵詞無 AI，文字版未上傳；mext_00750 文字版仍未上傳 |
| 中國教育部 | 200 | 4 件，無 AI |
| 香港政府新聞公報 | 200 | 11-13 全日英 42、中 47 則；研究資助局〈AI: Enhancing Digital Trust and Physical Wellness〉公眾講座（11-21），對象為一般公眾，不進每日短訊；11-14 英中各 2 則無 AI |
| 韓國教育部、KICE、KERIS | 200 | 沒有新項目 |
| UNESCO newsroom | 200（兩頁重試） | 5 件；〈How youth drafted an agenda for education beyond 2030〉AI 只順帶提及，C |
| Eurydice | 200 | 〈Estonia: AI Leap expands across general and vocational education〉（11-13）：二手報導，擴大實施屬 2026/27 學年，首次公開應早於本週（本刊已收 2025 年啟動 KB-2025-0418）；比照 2026-11-12 比利時前例不發，轉月報背景 |

- **E5a：** 11-07～11-14 未見漏收。

## 臺灣

| 來源 | 狀態 | 新筆數（11-13 08:24 後） | AI 命中 |
|---|---|---|---|
| 教育部即時新聞 RSS | 200 | 5 | 1：總統盃 AI 素養爭霸賽閉幕 → D20261114-02；熊本大學校長訪臺（高教，C）、友善校園獎（無 AI）、身障學生交通車、全球留臺校友獎（無 AI） |
| 資科司 RSS | 200（一次 reset） | 1 | 同上（重複） |
| 國教署即時新聞 | 200 | 0 | — |
| 行政院公報 | 200 | 115-11-13 期 13 筆，教育部 2（軍訓教官遴選辦法，無 AI） | 0 |
| 行政院、國科會、數位部、師培藝教司 | 200 | 0 | — |
| 學特司 RSS | 200 | 1（友善校園獎，重複） | 0 |

- **E5a：** 11-07～11-14 未漏收。
- **資訊月 AI 教育論壇（11-14）：** 查詢時尚無新聞稿，明日再查。

## 需要管理者處理

- **AFT、UFT 與 Anthropic 協議（利益衝突，請管理者決定）：** 見 2026-11-12 daily-check；期限 11-17。
- **清單外論文：** 11-12、11-13 列的各篇與本期觀察 4 篇，是否單篇例外（International Journal of Behavioral Development 那篇樣本大、Sage 出版，品質訊號較好）。
- **補查（明日）：** 資訊月 AI 教育論壇新聞；MEXT mext_00750、00751；Federal Register 11-16 期；韓國教育部 11-13 以後；unesdoc pf0000400013 出版日（瀏覽器）。

## 請管理者用瀏覽器處理（2026-11-14）

| 序 | 項目 | 要什麼 | 期限 |
|---|---|---|---|
| 1 | https://doi.org/10.1080/10494820.2026.2762001 （J40；D20261113-01 書目型；11-12 列） | 文章頁摘要截圖或全文 PDF（可改為作者摘要型） | 11-17 |
| 2 | https://doi.org/10.1016/j.caeai.2026.100692 （J02；教學 AI 代理人概念論文；本期新列） | ScienceDirect 文章頁 Available online 日期與摘要截圖 | 依上線日 |
| 3 | https://doi.org/10.3390/educsci16111942 （J47；D20261113-02 書目型；11-13 列） | 文章頁 Published 日期與摘要截圖，或全文 PDF | 11-19 |
| 4 | https://doi.org/10.3390/educsci16111936 （J47；D20261112-10 書目型；11-12 列） | 同上 | 11-18 |
| 5 | https://doi.org/10.3390/educsci16111928 （J47；學段分布不明；11-12 列） | 全文 PDF（看各學段人數） | 11-18 |
| 6 | https://doi.org/10.1080/2331186x.2026.2752641 （Cogent；D20261112-07 書目型；11-12 列） | 文章頁摘要截圖或全文 PDF | 11-16 |
| 7 | https://doi.org/10.1080/15700763.2026.2762927 （清單外 LPS；11-13 列；OpenAlex 仍無摘要） | 摘要截圖；若要收請決定是否單篇例外 | 11-19 |

- Journal of Intelligence `jintelligence14110294`（11-12 列，期限 11-14）：今日到期，未取得摘要，維持書目型，移除。
- SIGCSE Virtual 三篇（11-12 列）：清單外，若不收可移除。
