# 每日短訊查核紀錄：2026-10-24（3 則）

> 每日短訊例行作業，由排程觸發，在每日短訊專用 session 執行。檢索由同 session 三個子代理（國際研究、國際政策、臺灣中央來源）執行，判讀由本 session 複核。查詢時間 2026-10-24T00:23Z–00:45Z（UTC）。請求都沒帶 email 或 mailto；遇 403、挑戰頁未繞過。結果：**發布 3 則**（國際研究 3 則；國際政策、臺灣 0 則）。alphaXiv 本次連線失敗，未用於發現（不是「無新項目」）。依管理者 2026-10-23 決定，快照與主張不寫內部路徑、repo 或 session 編號與全文提供者。

## 國際

### 查詢

| 來源 | 查詢 | 狀態 | 結果 |
|---|---|---|---|
| Crossref | `filter=from-created-date:2026-10-23,until-created-date:2026-10-23,type:journal-article`，六組 `query.bibliographic`，每組 rows=40 | 200（q3 先 429，重試成功） | 各組總數 724／679／1240／2132／345／1169，各取 40 |
| Crossref（proceedings-article） | 同日期，rows=40 | 200 | 無合格項目 |
| Crossref（監測期刊 ISSN） | 23 本（含 J49）；帶關鍵詞 rows=60、不帶 rows=200 | 200 | 12 筆／168 筆 |
| Crossref（created 10-24） | 以上各組 | 200 | 查詢時 0 筆 |
| 教學代理人 | Crossref 兩組本機過濾 160 筆；arXiv 一組；OpenAlex（10-17 起）四組 | 200 | Crossref 0、arXiv 10-17 後 0、OpenAlex 1 筆（不在監測清單，不收） |
| 出版者頁面（各試一次） | Frontiers 2、Springer、Nature、MDPI 2、Wiley、idunn、ACM | Frontiers、Springer、Nature 200；其餘 403 | — |
| OpenAlex DOI 查詢 | 7 個 DOI | 全 404 | 新 DOI 尚未收錄 |
| arXiv API（https） | 三組（同 10-20） | 200 | 10-17 後未判過者皆不合格 |
| alphaXiv | — | 連線失敗 | 未使用 |
| GOV.UK | DfE、Ofqual、Ofsted（10-17 起）；Content API 讀 10-23 新增 13 筆 | 200 | 皆無 AI 字詞；關鍵詞交叉查命中皆已判過 |
| Federal Register | term 三組、ED 篩選、10-23 期（82 筆）、10-24 期、public inspection | 200 | 10-23 期 ED 3 筆無 AI；10-24 為週六無公報；public inspection ED 2026-21804（10-26 刊登）讀 PDF 無 AI；FederalRegister.gov 的 public-inspection HTML 頁回 Request Access 頁，未繞過 |
| MEXT | 報道発表、新着、10-23 大臣記者會見 | 200 | 〈産業イノベーション人材育成等に資する高等学校等教育改革促進事業 採択結果〉AI 只出現在少數案件名稱，主體為補助核定，C；10-23 記者會見文字版未上傳 |
| 中國教育部 | 各欄目 | 200 | 10-23 一則高教，C |
| 香港政府新聞公報 | 10-23 全日（英 53、中 56）、10-24 | 200 | AI 相關 3 則皆非教育或高教，C |
| 韓國 KICE／韓國教育部／KERIS | 列表 | 200 | 無新項目 |
| UNESCO | `/en/newsroom` | 第一次 empty reply，重試 200 | 10-23、10-24 無新項目 |
| Eurydice | /news | 200 | 〈Spain: New guidance for designing school bullying and cyberbullying protocols〉AI 只在風險清單一句，C |

### 發布

| 編號 | 來源 | 首發日（依據） | 範圍 | 對象 | 型態 |
|---|---|---|---|---|---|
| D20261024-01 | J29 Frontiers in Education Topcubaşı 等〈Teachers' artificial intelligence self-efficacy: development and validation of a multidimensional scale grounded in social cognitive theory〉 https://doi.org/10.3389/feduc.2026.1948951 | 2026-10-23（Frontiers 頁 Published；citation_online_date 10-08 為接受日） | A（T-PD） | k12（土耳其在學校任教的教師，EFA 313 人、CFA 559 人；未分學段） | 作者摘要型 |
| D20261024-02 | J47 Education Sciences Sánchez-Trujillo 等〈Adaptive Generative Tutoring in Resource-Limited Secondary Education…in Nigeria〉 https://doi.org/10.3390/educsci16111780 | 2026-10-23（Crossref published-online；MDPI 403） | B（S-LRN） | k12（奈及利亞 9 所公立中學 1,328 名學生；隨機試驗的次級分析） | 書目型（介入研究，結果不寫） |
| D20261024-03 | J47 Education Sciences Payevsky 等〈A Human–AI Orchestration Framework for Mathematics Education〉 https://doi.org/10.3390/educsci16111774 | 2026-10-22（Crossref published-online；MDPI 403） | B（T-TEA、S-LRN） | k12（八年級 32 人，探索性設計試行） | 書目型 |

- **D20261024-01**：摘要 Introduction 末句、Methods 第 1 至 3 句與 2.2 Participants 首句；因素結構適配指標與信效度數值不寫入。
- **D20261024-02**：原試驗可能另有發表（版本鏈），本則只為書目事實；見瀏覽器清單。
- **D20261024-03**：作者自述框架成效有待日後評估；見瀏覽器清單。

第二輪由隔離子代理對照原頁與 Crossref，三則判定一致；依建議 -01 改為「土耳其不同地區」並只保留 T-PD，-02 譯名改「課業輔導」並調整國名位置，-03 譯名改「人機教學調度架構」。候選池 W2026-10-23-A05～A07；知識庫 KB-2026-0430～0432（KR-15081～15111）。

### E5a 前 7 天回查（政策，首次公開 10-17～10-24）

10-17～10-22 各則已判過；今日以 GOV.UK 關鍵詞與 Federal Register term 查詢重掃，無新增；10-23 新項目今日全數判畢。無漏收。

### 待補（監測清單內，未達門檻）

| 項目 | 首次公開 | 範圍 | 對象 | 說明 |
|---|---|---|---|---|
| J49 `10.1111/ejed.70893`〈Exploring Chinese Students' Perceived Strategies for Regulating AI Anxiety in Their Education: A Focus Group Inquiry〉 | 2026-10-22（Crossref；Wiley 403） | A（S-ETH、S-LRN） | 不明（「Chinese general education students」20 人，未寫學段） | 見瀏覽器清單 |
| J37 `10.1007/s10956-026-10368-8`〈Deskilling the Laboratory…〉系統性回顧 | 2026-10-23（Springer 頁） | B | 不明（school and university science，納入研究多為大學） | 不發 |

### 列觀察（出處不在監測清單）

- `10.3389/frai.2026.1970792`（Frontiers in Artificial Intelligence）南非小學數學教師專業發展框架，概念分析，A、k12。
- `10.18261/njdl.21.2.4`（Nordic Journal of Digital Literacy）瑞典國中 AI 素養反思，2026-10-23；idunn 403、無摘要。可考慮列入來源擴充評估。
- `10.1145/3797867.3829007`（ASSETS 2026）視障學生教師整合生成式 AI；ACM 403、無摘要。
- 另有 `10.11594/nstp.2026.5209`、`10.63468/pss.128`、`10.47772/ijriss.2026.100900761`、`10.63539/isrn.2026027`、`10.70579/rfd.v2i3.303`、`10.64728/sirad.v2i3.art8`、`10.1007/s40841-026-00495-6`（teacher_ed）。

### 不匯入

- teacher_ed：J29 `feduc.2026.1897627`。高教：J48 `s41598-026-75820-6`、J49 `ejed.70914`、J33 `s41599-026-09383-2`。
- 其餘監測期刊命中無 AI × K-12 內容或屬 C；arXiv 10-17 後未判過者皆為大學、基準或技術論文。

## 臺灣

| 來源 | 狀態 | 列表最新項目 | 10-23 08:24 後新筆數 |
|---|---|---|---|
| 教育部即時新聞 RSS | 200 | 2026-10-23 08:00 | 0 |
| 資訊及科技教育司 RSS | 200 | 2026-10-07 | 0 |
| 國教署即時新聞 | 第一次 reset，重試 200 | 2026-10-21 | 0 |
| 行政院公報開放資料 | 200 | 115-10-22 期 | 0（10-23 期未出刊，三處確認） |
| 行政院本院新聞 RSS | 200 | 2026-10-22 13:52 | 0 |
| 國科會新聞資料 RSS | 200 | 2026-10-20 | 0 |
| 數位發展部新聞發布（第 1 頁） | 200 | 2026-10-22 | 0 |
| 師資培育及藝術教育司 RSS | 200 | 2026-10-21 | 0 |
| 學生事務及特殊教育司 RSS | 200 | 2026-10-22 16:35 | 0 |

臺灣段無新項目。行政院公報 115-10-23 期未出刊（最新下載、本月清單與首頁本期皆停在 10-22），10-26 再確認。

## 候選池與知識庫

本週候選池（10-23～10-29）A05～A07 新增，皆 publish；知識庫 KB-2026-0430～0432。

## 需要管理者處理

- **補查：** MEXT 10-23 大臣記者會見文字版、行政院公報 10-23 期（是否補出），下個工作日查。

## 請管理者用瀏覽器處理（2026-10-24）

1. https://doi.org/10.3390/educsci16111780 （J47 奈及利亞中學生成式 AI 輔導，已發書目型 D20261024-02；MDPI 403）：需要文章頁或全文 PDF，拿到後可升為摘要型（設計與對象；介入結果不寫），並確認原隨機試驗的出處。
2. https://doi.org/10.3390/educsci16111774 （J47 數學教育人機教學調度架構，已發書目型 D20261024-03；MDPI 403）：需要文章頁或全文 PDF，拿到後可升為摘要型。
3. https://doi.org/10.1111/ejed.70893 （J49 中國學生調節 AI 焦慮策略，首發 10-22；Wiley 403）：需要全文的研究對象學段。若為中小學，可補發（至 10-29）。

前幾日清單已處理完畢，無延續項目。

## 補記（2026-10-24，管理者提供全文後）

管理者當日提供三份出版者 PDF。

- **D20261024-02 改為摘要型：** Education Sciences `educsci16111780` 的 PDF 印 Published 23 October 2026，與 Crossref 一致。摘要依據為摘要第 1、2 句，加上第 2 節資料來源段的首句。原隨機試驗的出處已確認：世界銀行 De Simone 等人（2025）的 Policy Research Working Paper No. 11125，以及重現資料包 RR_NGA_2025_349（DOI 10.60572/cre7-j348）。效果量、出席與次群體結果不寫入。新快照為 `d2026-10-24-a04`，舊快照 a02 保留不改。
- **D20261024-03 改為摘要型：** `educsci16111774` 的 PDF 印 Published 22 October 2026，與 Crossref 一致。摘要依據為摘要第 3 至 5 句。限制欄註明：試行在以色列海法一所公立宗教男校，一個班 32 名男生，為期六週，未評估學習成效。新快照為 `d2026-10-24-a05`，舊快照 a03 保留不改。
- **不發：** J49 EJED `10.1111/ejed.70893`。3.1 節寫明對象是中國大學學士學位前 2 年的通識教育學生，年齡 16–20 歲，屬高等教育，不入候選池。
- **第二輪對照：** 由隔離子代理進行。-02 初判不一致，依建議修正兩處後一致：「參加」改為「獲提供」（offered）；資料來源改寫成「所選來源為……（對應 De Simone 等人的工作論文）」。-03 判定一致，補上「探討其實務實施」。子代理另建議把「調度」改成「編排」，因與已發布的中文譯名不一致，未採用。
- **存檔與紀錄：** 三份 PDF 已存入受限 repo 並登記（FULLTEXT-INDEX 共 27 份）。`publication/corrections.json` 新增 daily-2026-10-24-r1。瀏覽器清單三項全部處理完畢。
