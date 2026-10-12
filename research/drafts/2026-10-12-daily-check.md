# 每日短訊查核紀錄：2026-10-12（1 則）

> 每日短訊例行作業，由排程觸發，編輯 session 執行。查詢時間 2026-10-12T00:23Z–00:27Z（UTC）。請求未帶 email 或 mailto。結果是：**新增 1 筆候選並發布 1 則短訊**（中國教育部，教師人工智能素養全覆蓋培訓啟動）；另有 4 筆 K–12 相關研究的出處不在監測清單，列觀察交管理者決定。

## 查詢

| 來源 | 查詢 | 狀態 | 結果 |
|---|---|---|---|
| Crossref | `filter=from-created-date:2026-10-11,until-created-date:2026-10-11,type:journal-article`，六組 `query.bibliographic`（同 10-11）；每組取前 40 筆 | 200（全部） | 6 組合計 240 筆、去重 177 筆。題名加摘要同時含 AI 與學校／學生／教師字詞者 47 筆，逐筆看上線日、學段與範圍（見下） |
| arXiv API | 摘要含 AI literacy、artificial intelligence literacy，或 generative AI 加 K-12／high school／middle school／primary school／secondary school／elementary；依提交日排序，取 40 筆 | 200 | 10-05 之後只有 2610.10743、2610.06619，都已判過 |
| alphaXiv | discover_papers，AI literacy／K-12／children／generative AI，2026-10-05 起（只作發現） | ok | 新出現 2610.08703、2610.12064、2610.07744（見下） |
| GOV.UK Search API | q=artificial intelligence schools，2026-10-05 起；另以 DfE 篩選 10-10 起 | 200 | 無 K–12 AI 素養相關項目；DfE 10-10 起無新項目 |
| Federal Register API | term artificial intelligence education，2026-10-05 起；ED 機關篩選 | 200 | 4 筆與 0 筆，皆與 K–12 AI 素養無關 |
| MEXT 新聞列表 | 首頁列表 | 200 | 中教審「デジタル学習基盤特別委員会（第 11 回）」開會通知，議題含修訂初等中等教育生成 AI 利用指引的檢討狀況；但會議在 2026-10-01 召開，超出 7 天，不列候選 |
| 中國教育部 | 工作動態、文件列表 | 200 | **10-10「人工智能赋能教师发展现场会举行」**（見下，已發布） |
| 香港政府新聞公報 | 2026-10-11、10-12 當日列表 | 200 | 無 AI 教育相關項目 |
| UNESCO | articles 列表，經 WebFetch（內容為模型轉述，只當線索） | ok | 10-05 後 6 則，無 AI 相關項目 |

查詢的限制：Crossref 每組只看依相關度排序的前 40 筆，不是全量篩選；登記日不等於上線日。政策來源只查上列列表，未查者不代表當天沒有發布。

## 初篩結果

### 匯入候選池並發布

| 候選 | 項目 | 首次公開 | 範圍 | 對象 | 說明 |
|---|---|---|---|---|---|
| W2026-10-09-A17 | 中華人民共和國教育部〈人工智能赋能教师发展现场会举行〉 | 2026-10-10（原頁日期行「2026-10-10　来源：教育部」） | A（T-PD、T-TEA） | k12（服務基礎教育；在京中小學教師代表等） | 官方新聞稿，`source_document_type: official_commentary`。會上啟動教師人工智能素養全覆蓋培訓。https 網址轉址至 http 版 |

同時建立知識庫紀錄 KB-2026-0270（`government_announcement`，`bibliographic_checked`，首發日 2026-10-10），關聯 KR-6272～6281，並重建索引與逐年 Markdown。

### 列觀察，交管理者決定（出處不在監測清單）

| 項目 | 首次線上 | 範圍 | 對象 | 出處說明 |
|---|---|---|---|---|
| `10.1609/aies.v9i1.43131` Culturally Situated AI Safety for Youth: Saudi Arabian Perspectives of Youth, Parents and Teachers | 2026-10-11（Crossref） | A（S-ETH） | k12（7–17 歲青少年、家長、教師） | AAAI/ACM Conference on AI, Ethics, and Society（AIES）論文集，同儕審查會議；不在監測清單 |
| `10.29333/ejmste/19564` Teachers’ perceptions of ChatGPT support across TPACK domains: A cross-sectional survey in UAE schools | Crossref 無 published-online | A（T-TEA，AI-TPACK） | k12（阿聯 109 名在職教師） | Eurasia Journal of Mathematics, Science and Technology Education；不在監測清單；首發日未核 |
| `10.2478/fcds-2026-0013` Exploring Tunisian Primary School Teachers’ Perceptions of ChatGPT Integration in Education | 2026-10-11（Crossref） | A（T-TEA） | k12（突尼西亞小學教師） | Foundations of Computing and Decision Sciences（De Gruyter，計算科學期刊）；不在監測清單 |
| `10.56879/ijbm.v5i4.164` Trading privacy for personalisation: Ethical trust and high school students’ intention to use AI in education | 2026-10-11（Crossref） | A（S-ETH） | k12（323 名高中生） | International Journal of Business and Management（IJBM）；不在監測清單，審查品質無法核實 |

### 不匯入

| 項目 | 範圍 | 對象 | 處理 |
|---|---|---|---|
| `10.1177/07356331261494805`（JECR，J36）GAI-assisted formative feedback | B | teacher_ed（中國某大學職前教師 114 人） | 不進短訊 |
| `10.1609/aies.v9i1.43179`、`10.1609/aies.v9i3.43245` | B／A | higher_ed（國際生、大學寫作課） | 不進短訊 |
| `10.1609/aies.v9i2.43193` Parental Notification Gaps in ChatGPT-5 | 不明（平台家長控制機制評測，非師生素養本身） | unknown | 不匯入 |
| `10.1177/21582440261496363`、`10.1177/21582440261497008`（Sage Open） | B | higher_ed | 不進短訊 |
| `10.52041/serj.860` 統計素養 | C（未涉及 AI） | — | 不收 |
| arXiv `2610.08703`（LLM 判讀家教對話）、`2610.12064`（故事學習平台） | C（AI 為方法或系統） | — | 不收 |
| arXiv `2610.07744` 推薦系統教學工具 | A | adult（6 名年輕成人） | 不進短訊 |
| 其餘 Crossref 命中 | — | 大學、成人、醫療，或上線日早於 10-05 | 不收 |

本日未命中不收出處。

## 發布的短訊

**D20261012-01**（官方文件表示）：10 月 10 日於北京舉行人工智能賦能教師發展現場會，主題為「爭做數智時代好老師、服務基礎教育高質量發展」；會上升級上線國家智慧教育平台教師發展中心，啟動教師人工智能素養全覆蓋培訓，並要求各級教育部門和學校以教師是否解決實際問題、課堂是否發生積極變化、學生是否獲得更有針對性的學習支持，作為檢驗培訓成效的核心標準。

兩輪對照：第一輪 00:23Z 讀原頁並撰寫；第二輪 00:27Z 重讀原頁（三段原句逐字相同），隔離子代理對照後指出主題被截短、漏一字，修正後再對照判定一致。同一模型，非獨立審閱。

## 既有候選池

本週候選池現為 17 筆：publish 4 筆（A14–A17），其餘 hold；`screening_summary` 的 `ready_to_publish`、`verified_for_publication` 同步改為 4。

## 驗證

依 `.github/workflows/verify-and-deploy.yml` 的 verify 步驟在本機逐一跑過（npm ci 之後；public-site 建置前先刪除 `_public_site`），全部通過。
