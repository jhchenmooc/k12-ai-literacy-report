# 每日短訊查核紀錄：2026-11-18（1 則）

> 每日短訊例行作業，由排程觸發，在每日短訊專用 session 執行。今天週三。
> - **檢索：** 由同一 session 的三個子代理分頭執行（國際研究、國際政策、臺灣中央來源）；判讀由本 session 複核。子代理只查一次、不迴圈等待。
> - **查詢時間：** 2026-11-18T00:24Z–00:33Z（UTC）。
> - **請求紀錄：** 都沒帶 email 或 mailto；沒換 User-Agent。T&F 出版社頁回 403（Cloudflare），Elsevier 只回轉址頁，都未繞過。Federal Register 11-17 期 API 與「AI literacy」查詢回 403（IP 封鎖訊息），未繞過，改讀 govinfo 11-12～11-17 期目錄（只算「目錄未見」，不等於全文搜尋）。UNESCO newsroom 今天恢復正常。
> - **結果：1 則（臺灣）。** D20261118-01 教育部〈深化臺韓AI教育與數位學習交流〉（官方摘要型，A 邊界）。國際 0 則。
>   - 知識庫：KB-2026-0578（候選 W2026-11-13-A15）。
>   - 第二輪：隔離子代理逐句對照原頁，判定需修改（分類理由「應考量」改回原文「可參考」），已修正；摘要補「進行中小學 AI 教育暨數位學習考察」。同一模型，非獨立審閱。
> - **英國教育部 post-16 資格科目內容諮詢（不發，轉月報背景；請管理者決定）：** 三批諮詢（science、health and care 11-11 首發，為 E5a 漏收；enterprise and professional services 11-17 首發）共 14 份科目內容草案，本 session 逐份計數：每份 AI 出現 5–21 處（約 5,000–14,500 字），內容為各科學習目標中的 AI 用途、限制、查核與個資保護；三份諮詢總覽文件只在說明回應處理時提到 AI。AI 是職業資格科目內容中的一小部分，主體不是 AI 素養，比照 11-18 Milburn 報告（AI 只是一節，C）不發每日短訊，轉月報背景（英國 16–19 歲職業資格草案把 AI 查核與限制寫進各科學習目標）。若管理者認為應發，enterprise 一批首發 11-17，可發至 11-24；science、health and care 兩批 11-11 首發，今日為 7 天最後一天，過了就只能轉月報。

## 國際

### 研究查詢

| 來源 | 查詢 | 狀態 | 結果 |
|---|---|---|---|
| Crossref | from／until-created 11-17～11-18，六組關鍵詞，rows=60 | 200 | 總數 774／2152／859／1085／2131／1261 |
| Crossref（proceedings-article） | 同日期 | 200 | 307／425／22／916／330／348；無合格項目 |
| Crossref（監測期刊 ISSN，J01–J53） | 帶與不帶 AI 詞 | 200 | 不帶 217 筆、帶 AI 詞 32 筆 |
| 教學代理人 | Crossref（11-10～11-18）；OpenAlex（from_publication_date）；arXiv | 200 | 無合格項目 |
| arXiv | API 三組（submittedDate 範圍語法今天有效，索引至少到 11-14）；cs.CY、cs.HC /new（11-17 批） | 200 | 無新的 K-12 正式論文 |
| alphaXiv | discover_papers，11-10 後 | 成功 | 新的 K-12 論文只有 2611.21306（見觀察） |

**接近合格，待原文：**
- **ILE `10.1080/10494820.2026.2762378`（J40）**〈Exploring characteristics of primary school students' behaviors and interaction qualities in human-GenAI collaborative creative problem-solving activities〉：Crossref published-online 2026-11-17；T&F 403，Crossref 與 OpenAlex 都沒有摘要；依篇名對象為小學生，暫判 B（S-LRN），可能為 A。沒有摘要無法判讀，不發書目型，列入瀏覽器清單。

**觀察（不收或待管理者決定）：**
- arXiv `2611.21306`〈Share your Screen and Talk to Gemini〉（11-16）：5–6 年級 23 人使用多模態 GenAI 導師解 Scratch 題；附註已獲 WiPSCE 接受，論文集未出；預印本、清單外，列觀察。
- Frontiers in Education `10.3389/feduc.2026.1910214`（J29，11-17）：厄瓜多非裔青年領導與 AI 素養，樣本 90 人以教育工作者（學段未明）與青年為主、參與者均為成人；AI 素養只是六個面向之一；對象不屬 k12，不收。
- IICFE `10.59482/iicfe.2026.5.24.01`：五年級 12 人生成式 AI 倫理課程；Crossref 只有出版日 11-11、無線上日；清單外，列觀察。
- Early Education and Development `10.1080/10409289.2026.2762493`（11-16，幼教教師）：T&F 403、無摘要，學前是否為 3–6 歲待確認；清單外。
- IJER `10.1016/j.ijer.2026.103160`、CAEAI `10.1016/j.caeai.2026.100695`：無摘要、無線上日，暫不收，明日補查。
- 11-17 alphaXiv 列出的 `2611.17858`：對象不明，不收（11-17 未逐筆列出，在此補記）。

**不收（摘要）：** Discover Education `s44217-026-02427-4`（大學工作坊）；Frontiers in Education 1998715（高教回顧）、1894455（teacher_ed）；Education Sciences 1972（職前）、1966（高教）；Sci Rep 78895-3（職前）、81207-4（管理者）；ILE 2764522（大學生）；ASCILITE 各篇（依不收出處排除）；其餘與 AI 或 K-12 無關。

### 政策查詢

| 來源 | 狀態 | 結果 |
|---|---|---|
| GOV.UK DfE | 200 | 11-17 新 11 件；post-16 enterprise and professional services 諮詢見上（不發，轉月報背景）；KCSIE 修訂與其餘新聞稿無 AI |
| GOV.UK Ofqual、Ofsted | 200 | Ofqual 無新項目；Ofsted 1 件（Area SEND）無 AI |
| GOV.UK 全站 AI × education | 200 | DWP 委託的 Milburn 獨立報告（11-17）：對象為 NEET 青年，AI 只是其中一節，C |
| Federal Register | ED 篩選、ED × AI、public inspection 200；11-17 期 API 與「AI literacy」403（讀取失敗，未繞過）；govinfo 11-12～11-17 目錄 200 | ED × AI 只有 2026-23155（11-13 已判 C）；目錄標題未見 AI；11-18 期尚未上架 |
| MEXT | 200 | 新着 5、報道発表 1，無 AI；mext_00751、00752 文字版未上傳 |
| 中國教育部 | 200 | 三頁與昨天相同，無新項目 |
| 香港政府新聞公報 | 200 | 11-17 全日英、中各 39 則：教育局與中國科學院學部工作局 MOU（AI 只是致辭一句重申舊藍圖，不發）；立法會 AI 小組委員會考察醫管局（C）；11-18 尚無稿 |
| 韓國教育部 | 200 | 107676–107680：CO-SHOW（大學，higher_ed，C）與高教法規等，無 K-12 AI |
| KICE | 200 | 報道資料無新項目；研究板正確網址已找到，今天建立基準（最新序號 3948），前 10 筆無 AI |
| KERIS、Eurydice | 200 | 沒有新項目 |
| UNESCO newsroom | 200（今天恢復） | 11-16〈AI models abandon climate facts…〉對象為一般公眾，C；其餘無 AI |

**邊界，不發：** GOV.UK〈Key stage 2 tests: access arrangements〉2027 版（11-11）：只規定無法關閉 AI 功能的輔具不得用於考試，屬考試規則，C。Ofqual V Level 監管諮詢（11-12）：已讀部分無 AI，C。

- **E5a：** 英國教育部 post-16 science、health and care 兩批諮詢（11-11）為漏收：11-12 只讀 GOV.UK 頁面、未讀 consult.education.gov.uk 上的科目內容 PDF；今日補讀，判不發、轉月報背景（見上）。之後 DfE 諮詢一律讀 consult 網站 PDF。Federal Register「AI literacy」全站詞查詢仍讀取失敗，只能寫「目錄未見」。

## 臺灣

| 來源 | 狀態 | 新筆數（11-17 08:23 後） | AI 命中 |
|---|---|---|---|
| 教育部即時新聞 RSS | 200 | 3（臺韓 AI 教育考察、臺美半導體教育聯盟 AASCU 年會、幼兒園特教支持） | 1 → D20261118-01；AASCU 為高教，C |
| 資科司 RSS | 200 | 1（臺韓考察，重複） | — |
| 國教署即時新聞 | 200 | 1（幼兒園特教，重複） | 0 |
| 行政院公報 | 200 | 115-11-17 期 25 筆，教育部 169527（涉性別事件不適任人員通報辦法），國教署 0 | 0 |
| 行政院本院新聞 RSS | 200 | 1（CRPD 國家報告審查） | 0 |
| 國科會 RSS | 200 | 1（國際防災研習營） | 0（C） |
| 數位部、師培藝教司、學特司 | 200 | 0 | — |

- **D20261118-01 判讀：** 出國考察新聞稿，內容多為韓國做法，未宣布新措施；教育部表示 AI 工具選用可參考韓國重視教育適切性、學生年齡及個資保護的原則，對應 T-BAS、T-ETH。比照 D20261111-02（資訊月主題館）判 A，邊界案例；KERIS 與烏拉圭 MOU（11-17 不發）為機構協議活動報導、AI 素養只一句，與本則不同。
- **E5a：** 11-11～11-18 未漏收。
- **資訊月教育部專場論壇（11-14）：** 仍無新聞稿。

## 需要管理者處理

- **英國教育部 post-16 諮詢：** 本 session 判不發、轉月報背景（理由見上）；如要發，請在本 session 說明。
- **待你在本 session「確認」（沿用 11-17）：** 清單外觀察是否單篇例外（merz 兩篇、J Chem Educ 6c01329、J Educ Sci、JCT、IJEM）；Education Sciences 1953 是否收；今日新增觀察 arXiv 2611.21306、IICFE 5.24.01。
- **ISSN 回溯（沿用 11-17）：** 10-10～10-17 原 29 刊是否回溯；8 筆無摘要是否列瀏覽器清單；10 月月報 3 筆可能漏收轉編輯 session。
- **補查（明日）：** Federal Register「AI literacy」與 11-18 期；MEXT mext_00751、00752；香港 11-18；DfE 其餘三批 post-16 諮詢（construction、engineering and manufacturing、sport and leisure，預定 11 月下旬）；KICE 研究板（基準 3948）；ILE 2762378、CAEAI 100695、IJER 103160 摘要；資訊月論壇新聞。

## 請管理者用瀏覽器處理（2026-11-18）

| 序 | 項目 | 要什麼 | 期限 |
|---|---|---|---|
| 1 | https://doi.org/10.1080/10494820.2026.2762378 （J40 ILE；小學生與 GenAI 協作解題；本期新列） | 文章頁 Published online 日期與摘要截圖，或全文 PDF；拿到後可發作者摘要型 | 11-24 |
| 2 | https://doi.org/10.1111/bjet.70101 （J04；D20261115-01 書目型；11-15 列） | First published 日期與摘要截圖，或全文 PDF | 11-20 |
| 3 | https://doi.org/10.1177/01650254261500063 （清單外 IJBD；11-14 列） | 摘要截圖或全文 PDF（若決定單篇例外） | 11-20 |
| 4 | https://doi.org/10.1177/21582440261501742 （Sage Open；D20261117-02 書目型；11-17 列） | 上線日期與摘要截圖，或全文 PDF（升級用） | 11-22 |
| 5 | https://doi.org/10.3390/educsci16111959 （J47；D20261117-07 書目型；11-17 列） | Published 日期與摘要截圖，或全文 PDF | 11-23 |
| 6 | https://doi.org/10.3390/educsci16111953 （J47；觀察；11-17 列） | 文章類型與摘要截圖 | 11-23 |
| 7 | https://doi.org/10.1177/10598405261506332 （J School Nursing；D20261117-05 書目型；11-17 列） | 摘要截圖或全文 PDF（升級用，非必要） | 11-24 |
