# 每日短訊查核紀錄：2026-11-15（1 則）

> 每日短訊例行作業，由排程觸發，在每日短訊專用 session 執行。今天週日。
> - **檢索：** 由同一 session 的三個子代理分頭執行（國際研究、國際政策、臺灣中央來源），判讀由本 session 複核。子代理只查一次、不迴圈等待，三組都在 5 分鐘內回報。
> - **查詢時間：** 2026-11-15T00:23Z–00:27Z（UTC）。
> - **請求紀錄：** 都沒帶 email 或 mailto；沒換 User-Agent。Wiley、ACS、Sage 出版社頁回 403，未繞過。Federal Register 以 ED 機構篩選的查詢回 403（IP 封鎖訊息），未重試、未繞過；其餘 Federal Register 查詢 200，週末無刊。Crossref 兩次 429、資科司 RSS 一次 reset，重試成功。
> - **工作目錄：** 研究子代理一度把原始檔寫入前一日的 scratchpad 資料夾（覆蓋 11-14 部分原始回應，已在回報中說明），並在 repo 根目錄誤寫 seen.txt，已刪除、未提交。
> - **結果：1 則。** 國際研究 1 則（只發書目）；國際政策 0 則；臺灣 0 則。

## 本期項目

| 編號 | 來源 | 首發日（依據） | 範圍 | 對象 | 型態 |
|---|---|---|---|---|---|
| D20261115-01 | British Journal of Educational Technology（J04）〈Generative AI empowered contextual educational games as facilitators of elementary school students' computational thinking tendencies〉 | 2026-11-13（Crossref published-online；Wiley 403） | B（S-LRN、S-BAS） | k12（五年級兩班） | 只發書目（摘要只見 Crossref） |

- **-01：** 準實驗研究，成效不寫。第二輪：中文篇名、引句、日期、作者、分類通過；範圍說明「華東」改「東部」。
- **候選池與知識庫：** W2026-11-13-A07（batch 2026-11-15-daily-1）；KB-2026-0569。

## 國際

### 研究查詢

| 來源 | 查詢 | 狀態 | 結果 |
|---|---|---|---|
| Crossref | from／until-created 11-14～11-15，六組關鍵詞，rows=60 | 200（q3 一次 429，重試成功） | 總數 804／821／1773／5149／702／1758 |
| Crossref（proceedings-article） | 同日期 | 200 | 357 筆，取 40；無 K-12 AI 新筆 |
| Crossref（監測期刊 ISSN） | 29 個 ISSN；帶與不帶關鍵詞 | 200（J49 一次 429，重試成功） | K-12 AI 未判過者只有 J04 bjet.70101 → D20261115-01 |
| 教學代理人 | Crossref × 期刊／會議；OpenAlex；arXiv | 200 | CEDTECH 19950（見觀察） |
| arXiv | API 三組（11-08 後）；cs.CY、cs.HC /new（週末無新批） | 200 | 無 K-12 新筆 |
| alphaXiv | discover_papers | 成功 | 未判過者皆高教或通論 |
| 回查 | IJBD 1500063；Davao 647；AI, Brain and Child 46 | 200／403 | IJBD：OpenAlex 已有摘要（非原文，Sage 仍 403）；Davao：出版社頁 Published 2026-11-11；AI, Brain and Child：Springer 頁 Published 2026-11-11，摘要可讀 |

**觀察（清單外；管理者決定是否單篇例外）：**
- Journal of Chemical Education（ACS）`10.1021/acs.jchemed.6c01077`：8–12 年級 62 人設計規則式聊天機器人學化學並培養批判 AI 素養；Crossref 2026-11-14；A（S-SYS、S-BAS、S-ETH）；ACS 403，摘要只見 Crossref；文章型態可能為教學活動報告。
- Contemporary Educational Technology `10.30935/cedtech/19950`：中國五年級 206 人雙代理 AI 數學家教準實驗；出版社頁 Published Online 14 November 2026；B（S-LRN）。
- IJPES `10.52380/ijpes.2027.14.1.1718`：中學生 316 人 AI 依賴量表再驗證；出版社頁 Published 2026-11-14；A（S-LRN、S-ETH）。
- Journal of Educational Change（Springer）`10.1007/s10833-026-09578-z`：南韓 AI 教育改革與教師能動性的論述文（essay）；Published 14 November 2026；學段只見旁證（中小學 AI 數位教科書），擬 k12，A（T-PD、T-BAS）；非實證。
- The Journal of School Nursing（Sage）`10.1177/10598405261506332`：臺灣 42 名學校護理師生成式 AI 在職培訓；Crossref 2026-11-14；學校護理師屬何種對象準則未定（擬 other_stakeholders），請管理者決定。
- JLLSA `10.63056/jllsa.2.11.2026.446`：巴基斯坦 9–10 年級 80 人 AI 寫作準實驗；刊出日早於投稿日、效果量異常，品質疑點，不建議。

**不收（摘要）：** 只有年份或年月 2 篇；法律期刊刊登的學校 GenAI 回顧（領域不符）；學段不明 2 篇；ACI ICER 會議 4 篇（高教或職前）；higher_ed 4 篇；teacher_ed 5 篇；窗口外 9 篇；日期異常 1 篇；KACE 29(10)（窗口外，11-14 已記）；其餘 C。

### 政策查詢

| 來源 | 狀態 | 結果 |
|---|---|---|
| GOV.UK | 200 | DfE、Ofqual、Ofsted 無新項目；全站 11-14 起 6 筆非教育；AI 關鍵詞 2 筆（DWP 青年就業、FCDO 旅遊建議），C |
| Federal Register | term 三組、ED × AI、public inspection 200；ED 機構篩選 403（讀取失敗，未繞過） | 週末無刊；public inspection 11-16、11-17 期 ED 只有 2026-23262（無 AI） |
| MEXT | 200 | 無新項目；mext_00750、00751 文字版仍未上傳 |
| 中國教育部 | 200 | 1 筆（漢語橋 25 週年），無 AI |
| 香港政府新聞公報 | 200 | 11-14 全日英 4、中 5 則，11-15 各 1 則，無 AI |
| 韓國教育部 | 200 | 107657（醫學院，C）、107659（大學生住宿，hwpx 已讀，C） |
| KICE、KERIS、UNESCO、Eurydice | 200 | 沒有新項目 |

- **E5a：** 11-08～11-15 未見漏收。

## 臺灣

| 來源 | 狀態 | 新筆數（11-14 08:24 後） | AI 命中 |
|---|---|---|---|
| 教育部即時新聞 RSS | 200 | 0 | — |
| 資科司 RSS | 200（一次 reset） | 0 | — |
| 國教署即時新聞 | 200 | 0 | — |
| 行政院公報 | 200 | 11-13 期後無新期 | — |
| 行政院本院新聞 RSS | 200 | 2 | 0（苗栗玉清宮參拜「AI 科技時代」屬地方產業語境，C；總統盃街舞大賽無 AI） |
| 國科會新聞 RSS | 200 | 1 | 0（臺拉立年會，科研語境，C） |
| 數位發展部、師培藝教司、學特司 | 200 | 0 | — |

- **E5a：** 11-08～11-15 未漏收。
- **資訊月教育部專場論壇（11-14）：** 尚無新聞稿，明日再查。

## 需要管理者處理

- **待你在本 session「確認」：** Leadership and Policy in Schools `10.1080/15700763.2026.2762927`（迦納 187 名校長，A，other_stakeholders；期限 11-19）單篇例外；以及 11-12～11-14 其他清單外論文（見 2026-11-14 回報的建議清單）。
- **AFT、UFT 與 Anthropic 協議（利益衝突）：** 期限 11-17。
- **本期清單外觀察 6 篇：** 是否單篇例外（見上）。
- **CAEAI 100692：** ScienceDirect Available online 2026-11-13（管理者截圖，文獻 session 轉知）；摘要為一般性的教師自建教學 AI 代理人框架，示例案例為長者用代理人，未明確針對 K-12，依概念論文先例不收。
- **補查（明日）：** 資訊月論壇新聞；Federal Register 11-16 期（ED 篩選改讀 govinfo）；MEXT mext_00750、00751。

## 請管理者用瀏覽器處理（2026-11-15）

| 序 | 項目 | 要什麼 | 期限 |
|---|---|---|---|
| 1 | https://doi.org/10.1111/bjet.70101 （J04；D20261115-01 書目型；本期新列） | 文章頁 First published 日期與摘要截圖，或全文 PDF（可改為作者摘要型） | 11-20 |
| 2 | https://doi.org/10.1177/01650254261500063 （清單外 IJBD；11-14 列） | 摘要截圖或全文 PDF（若決定單篇例外，可發作者摘要型） | 11-20 |

- 11-14 清單的 1、3–6 項已由管理者 11-14 提供全文處理完畢（#466）；第 2 項 CAEAI 100692 依上不收；第 7 項 LPS 已有截圖，待確認。
