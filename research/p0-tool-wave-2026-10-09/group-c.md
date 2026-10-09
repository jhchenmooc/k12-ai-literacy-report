# P0 工具波次 C 組：AIED／EDM／WiPSCE／EAAI 定向搜尋（暫存，未入庫）

- 範圍：C01 AIED、C02 EDM、C21 WiPSCE、C22 EAAI；日期 2025-01-01～2026-10-09。
- UTC：2026-10-09T16:11:46Z 開始 → 2026-10-09T16:28:06Z 結束。
- 性質：暫存候選清單，**未修改任何正式 CSV／索引／交接檔**，未 commit。`first_public_date` 一律 unknown。同一模型完成搜尋與核對，不等於獨立審閱。

## 1. 各會議在索引中的出現方式

| 代號 | 狀態 | 索引方式 | 定位入口 | DOI 前綴 |
|---|---|---|---|---|
| C01 AIED | partial | Springer 書籍章節（Crossref type=book-chapter）。主論文集在 LNCS（container「Lecture Notes in Computer Science / Artificial Intelligence in Education」），posters／late-breaking／workshops／practitioners／DC／Blue Sky／WideAIED 在 CCIS。OpenAlex 不設獨立 source，歸入 LNCS book series S106296714（CCIS 卷另歸 CCIS），且幾乎無摘要；OpenAlex publication_date 對 2025 卷多為佔位 2025-01-01。 | Crossref filter=isbn:<電子版 ISBN>（18 冊）；OpenAlex primary_location.source.id:S106296714 + 以 AIED ISBN 前綴後篩 | 10.1007/978-3-031-98414-3、-98417-4、-98420-4、-98459-4、-98462-4、-98465-5（2025 LNCS）；10.1007/978-3-031-99261-2、-99264-3、-99267-4（2025 CCIS）；10.1007/978-3-032-29744-0、-29755-6、-29760-0、-29763-1、-29770-9、-29773-0（2026 LNCS）；10.1007/978-3-032-29788-4、-29791-4、-29794-5（2026 CCIS） |
| C02 EDM | located | educationaldatamining.org 自行出版 HTML 論文集，每篇有 Zenodo DOI（10.5281/zenodo.*，DataCite 註冊，非 Crossref）。OpenAlex conference source S4306418235 範圍內 0 筆；208 個 Zenodo DOI 在 OpenAlex 只命中 1 筆。 | 官方目錄 https://educationaldatamining.org/edm2025/proceedings/ 、/edm2026/proceedings/（含 pdf、bib、doi 連結與分節） | 10.5281/zenodo.1587xxxx（2025）、10.5281/zenodo.2103xxxx–2104xxxx（2026） |
| C21 WiPSCE | located | ACM ICPS 論文集（Crossref container「Proceedings of the 20th WiPSCE Conference on Primary and Secondary Computing Education Research」；event 標為 WiPSCE 2026, Aachen Germany）。OpenAlex source S7407087161。 | OpenAlex primary_location.source.id:S7407087161；Crossref query.container-title=WiPSCE | 10.1145/3801749.* |
| C22 EAAI | located | 收在 Proceedings of the AAAI Conference on Artificial Intelligence（OJS，DOI 10.1609/aaai.v<卷>i<期>.<文章ID>）。EAAI-25 在 vol 39 no 28（與 IAAI-25、學生摘要等合刊）；EAAI-26 在 vol 40 no 47（Main track、Resources for Teaching AI in K-12）與 no 48（AI for Education、Model AI Assignments）。OpenAlex 只有 AAAI 整體 source S4210191458。 | ojs.aaai.org 期次頁 issue/view/651、729、732 之分節標題（article ID ↔ 分軌）；OpenAlex S4210191458 + 查詢後以 article ID 對應分軌 | 10.1609/aaai.v39i28.*（EAAI-25 article 35164–35198）；10.1609/aaai.v40i47.* 與 v40i48.*（EAAI-26 article 41499–41530、42113–42128） |

**要點**：
- C01：書目可完整列舉（916 篇）；摘要不可得：Springer 頁回 JS「Client Challenge」、Crossref／OpenAlex 無摘要、Semantic Scholar 標示 abstract 被出版社隱藏。只能題名初篩＋少數 arXiv 版摘要。是否另有 AIED 卷未被 relevance 查詢帶出，未完全排除。
- C02：索引不可用但官方論文集完整可讀；以本機布林在官方頁題名＋摘要比對代替 OpenAlex 查詢。EDM workshop 論文（若在 CEUR 等另出版）未涵蓋。
- C21：範圍內只有 1 冊 39 篇（Crossref issued 2026-03-11、published-online 2026-08-20，兩者先後異常，照錄）；39 篇皆有摘要。未見 21st 卷；WiPSCE 2025 前一屆（19th）若出版於 2024 則在範圍外，未查。
- C22：可精確區分 EAAI 與主會議：只計 OJS 分節為「EAAI Symposium: …」者；C22-Q2 的 IAAI 1 筆已排除。

## 2. 每會議統計

| 會議 | 列舉／範圍內總數 | 主要布林查詢命中（屬該會議） | 實際讀摘要 | candidate | pending | exclude | duplicate |
|---|---|---|---|---|---|---|---|
| C01 | 916 篇（18 冊）全數題名初篩 | Q1 30（AIED 20）；Q2 26（AIED 12） | 3（arXiv 版）；26 篇查無官方摘要 | 3 | 28 | 8 | 0 |
| C02 | 208 篇（2025: 88、2026: 120）全數題名＋摘要本機比對 | Q1 0；Q2 4 | 208 頁本機比對；人工細讀 1 | 0 | 1 | 3 | 0 |
| C21 | 39 篇全數題名初篩 | Q1 2；Q2 2 | 12 | 5 | 1 | 6 | 0 |
| C22 | 83 篇 EAAI（全數題名初篩） | Q1 26（全 EAAI）；Q2 6（EAAI 5） | 20 | 20 | 13 | 8 | 0 |

去重：全部 DOI 以小寫對 `known_dois.txt`（230 筆）比對，**重複 0**。

## 3. 查詢表

| ID | 來源 | UTC | HTTP | count | 讀取 | 狀態 | 備註 |
|---|---|---|---|---|---|---|---|
| L01 | C01 | 16:11:46–16:11:46 | 200 | 10 | 10 | locate | OpenAlex sources 搜尋：只有同名期刊與 S4306417720（works_count 0）；AIED 論文集不以獨立 source 出現 |
| L02 | C02 | 16:11:46–16:11:47 | 200 | 3 | 3 | locate | S4306418235「Educational Data Mining」conference source；2025–2026 範圍內 0 筆（見 L05b） |
| L03 | C21 | 16:11:47–16:11:47 | 200 | 2 | 2 | locate | S7407087161 WiPSCE Conference（2025–2026 有 39 筆）、S4306421215 舊 Workshop 名 |
| L04 | C22 | 16:11:47–16:11:48 | 200 | 3 | 3 | locate | S4210191458 AAAI Proceedings（含主會議，無法以 source 區分 EAAI） |
| L05 | C02 | 16:11:54–16:11:55 | 400 |  | 0 | failed | 錯誤日期 filter 語法（publication_date:range）→ 400；以 L05b 重跑 |
| L06 | C21 | 16:11:55–16:11:55 | 400 |  | 0 | failed | 同上 → 400；以 L06b 重跑 |
| L08 | C01 | 16:11:57–16:11:58 | 400 |  | 0 | failed | doi_starts_with 不是合法 filter／日期語法錯 → 400 |
| L05b | C02 | 16:12:06–16:12:06 | 200 | 0 | 0 | locate | EDM conference source 在範圍內 count=0：EDM 2025/2026 不在此 source 下 |
| L06b | C21 | 16:12:06–16:12:06 | 200 | 39 | 0 | locate | S4306421215|S7407087161 範圍內 39 筆，全在 2026 |
| L07 | C01 | 16:11:55–16:11:57 | 200 | 98466 | 0 | locate | Crossref container-title 查詢 facet：看到 Artificial Intelligence in Education 617 筆 chapter（relevance 排序，非精確篩選） |
| L09 | C01 | 16:12:06–16:12:08 | 200 | 98466 | 1000 | locate | 未加 prefix，前 1000 筆幾乎無 AIED；只作定位紀錄 |
| L10 | C01 | 16:12:15–16:12:17 | 200 | 40538 | 1000 | locate | 加 prefix:10.1007；在前 1000 筆辨識出 2025 年 6 冊、2026 年 6 冊 LNCS AIED ISBN |
| L11 | C01 | 16:12:28–16:12:29 | 200 | 3 | 3 | locate | OpenAlex 對 AIED chapter 的 primary source = S106296714 LNCS book series；樣本無摘要 |
| L12 | C01 | 16:12:35–16:12:37 | 200 | 40538 | 0 | locate | facet 顯示 AIED 主卷 610、2026 CCIS 189、2025 CCIS 130（relevance 子集） |
| L13 | C01 | 16:13:00–16:13:01 | 200 | 41758 | 1000 | locate | 辨識 CCIS 卷：2025 年 3 冊、2026 年 3 冊（posters／late-breaking／workshops 等） |
| E01 | C01 | 16:13:05–16:13:05 | 429 |  | 0 | failed | Crossref 429 限流；以 E01r 重跑 |
| E01r | C01 | 16:13:33–16:13:34 | 200 | 32 | 32 | enumerated | ISBN 9783031984143 全卷列舉，逐題名初篩 |
| E02 | C01 | 16:13:06–16:13:06 | 429 |  | 0 | failed | Crossref 429 限流；以 E02r 重跑 |
| E02r | C01 | 16:13:37–16:13:38 | 200 | 35 | 35 | enumerated | ISBN 9783031984174 全卷列舉，逐題名初篩 |
| E03 | C01 | 16:13:06–16:13:07 | 200 | 35 | 35 | enumerated | ISBN 9783031984204 全卷列舉，逐題名初篩 |
| E04 | C01 | 16:13:07–16:13:08 | 200 | 37 | 37 | enumerated | ISBN 9783031984594 全卷列舉，逐題名初篩 |
| E05 | C01 | 16:13:08–16:13:09 | 200 | 61 | 61 | enumerated | ISBN 9783031984624 全卷列舉，逐題名初篩 |
| E06 | C01 | 16:13:09–16:13:11 | 200 | 60 | 60 | enumerated | ISBN 9783031984655 全卷列舉，逐題名初篩 |
| E07 | C01 | 16:13:11–16:13:13 | 200 | 58 | 58 | enumerated | ISBN 9783031992612 全卷列舉，逐題名初篩 |
| E08 | C01 | 16:13:13–16:13:14 | 200 | 47 | 47 | enumerated | ISBN 9783031992643 全卷列舉，逐題名初篩 |
| E09 | C01 | 16:13:14–16:13:15 | 200 | 42 | 42 | enumerated | ISBN 9783031992674 全卷列舉，逐題名初篩 |
| E10 | C01 | 16:13:15–16:13:17 | 200 | 43 | 43 | enumerated | ISBN 9783032297440 全卷列舉，逐題名初篩 |
| E11 | C01 | 16:13:17–16:13:17 | 200 | 53 | 53 | enumerated | ISBN 9783032297556 全卷列舉，逐題名初篩 |
| E12 | C01 | 16:13:17–16:13:18 | 200 | 62 | 62 | enumerated | ISBN 9783032297600 全卷列舉，逐題名初篩 |
| E13 | C01 | 16:13:18–16:13:19 | 200 | 46 | 46 | enumerated | ISBN 9783032297631 全卷列舉，逐題名初篩 |
| E14 | C01 | 16:13:19–16:13:20 | 200 | 70 | 70 | enumerated | ISBN 9783032297709 全卷列舉，逐題名初篩 |
| E15 | C01 | 16:13:20–16:13:21 | 200 | 41 | 41 | enumerated | ISBN 9783032297730 全卷列舉，逐題名初篩 |
| E16 | C01 | 16:13:21–16:13:22 | 200 | 81 | 81 | enumerated | ISBN 9783032297884 全卷列舉，逐題名初篩 |
| E17 | C01 | 16:13:22–16:13:23 | 200 | 39 | 39 | enumerated | ISBN 9783032297914 全卷列舉，逐題名初篩 |
| E18 | C01 | 16:13:23–16:13:24 | 200 | 74 | 74 | enumerated | ISBN 9783032297945 全卷列舉，逐題名初篩 |
| C01-E | C01 | 16:13:05–16:13:24 | 200 | 916 | 916 | items_screened | 18 冊共 916 篇；本機 regex 篩出 192 篇題名再人工初篩；Crossref 全無摘要 |
| C01-Q1 | C01 | 16:18:43–16:18:44 | 200 | 30 | 30 | partial | OpenAlex 以 LNCS book series（S106296714）+ 日期 + title_and_abstract.search（Q1：AI 素養／AI 教育 × K-12 學段）；30 筆中 20 筆屬 AIED ISBN，其餘 10 筆為其他 LNCS／CCIS 會議（排除，不屬 C01）。AIED 章節在 OpenAlex 幾乎無摘要，實際近似題名比對 |
| C01-Q2 | C01 | 16:18:44–16:18:45 | 200 | 26 | 26 | partial | Q2：（AI／ML／生成式 AI）×（teacher）× K-12 學段；26 筆中 12 筆屬 AIED |
| C01-ABS | C01 | 16:19:10–16:19:11 | 200 | 26 | 26 | abstract_unavailable | 26 篇 AIED 入圍題名之 OpenAlex 摘要：26/26 無摘要 |
| C01-ARXIV | C01 | 16:19:29–16:20:54 | 200 | 3 | 26 | partial | 26 篇中 3 篇找到同題 arXiv 版本（相似度>0.85），以其摘要判讀；其餘 23 篇無 |
| L16 | C21 | 16:14:01–16:14:03 | 200 | 39 | 0 | locate | Crossref container-title=WiPSCE 範圍內 39 筆，全屬「Proceedings of the 20th WiPSCE Conference…」 |
| C21-E | C21 | 16:14:00–16:14:00 | 200 | 39 | 39 | enumerated | S7407087161 範圍內全部 39 篇逐題名初篩 |
| L15 | C21 | 16:14:00–16:14:01 | 200 | 0 | 0 | locate | 舊 Workshop source 2024 起 0 筆 |
| C21-ALL | C21 | 16:18:45–16:18:45 | 200 | 39 | 0 | locate | has_abstract:true 39/39 → 摘要完整 |
| C21-Q1 | C21 | 16:18:40–16:18:41 | 200 | 2 | 2 | items_screened | Q1 布林查詢 |
| C21-Q2 | C21 | 16:18:41–16:18:42 | 200 | 2 | 2 | items_screened | Q2 布林查詢 |
| C21-ABS | C21 | 16:21:28–16:21:29 | 200 | 12 | 12 | items_screened | 12 篇讀 OpenAlex 摘要 |
| L17 | C22 | 16:14:10–16:14:10 | 200 |  | 0 | locate | ojs.aaai.org 期次總表第 1 頁（AAAI-26 vol 40 no 1–25） |
| L18_2 | C22 | 16:14:27–16:14:28 | 200 |  | 0 | locate | 期次總表；EAAI 在 vol 39 no 28、vol 40 no 47–48 |
| L18_3 | C22 | 16:14:28–16:14:28 | 200 |  | 0 | locate | 期次總表；EAAI 在 vol 39 no 28、vol 40 no 47–48 |
| L18_4 | C22 | 16:14:32–16:14:33 | 200 |  | 0 | locate | 期次總表；EAAI 在 vol 39 no 28、vol 40 no 47–48 |
| I651 | C22 | 16:14:40–16:14:40 | 200 |  | 0 | enumerated | vol 39 no 28：EAAI Main 17、Resources for Teaching AI in K-12 17、Model AI Assignments 1 |
| I729 | C22 | 16:14:40–16:14:41 | 200 |  | 0 | enumerated | vol 40 no 47：EAAI Main 23、Resources for Teaching AI in K-12 9 |
| I732 | C22 | 16:14:41–16:14:42 | 200 |  | 0 | enumerated | vol 40 no 48：EAAI AI for Education 15、Model AI Assignments 1 |
| C22-E | C22 | 16:14:40–16:14:42 | 200 | 83 | 83 | items_screened | EAAI 共 83 篇逐題名初篩；分軌名稱可精確區分 EAAI 與主會議／IAAI |
| C22-Q1 | C22 | 16:18:42–16:18:42 | 200 | 26 | 26 | items_screened | AAAI source + 日期 + Q1；26/26 落在 EAAI 分軌 |
| C22-Q2 | C22 | 16:18:43–16:18:43 | 200 | 6 | 6 | items_screened | Q2；6 筆中 5 筆 EAAI、1 筆 IAAI（排除） |
| C22-ABS | C22 | 16:21:20–16:21:21 | 200 | 20 | 20 | items_screened | 20 篇讀 OpenAlex 摘要 |
| L19 | C02 | 16:14:56–16:14:56 | 200 | 186 | 5 | locate | OpenAlex search + doi_starts_with（非合法 filter 被忽略）結果無關，不採 |
| L20 | C02 | 16:14:56–16:14:58 | 200 |  | 25 | locate | DataCite 全文查詢雜訊大，不採 |
| L21-會議總表 | C02 | 16:15:03–16:15:05 | 200 |  | 0 | locate | 會議總表 |
| L21-EDM 2025 論文集 | C02 | 16:15:05–16:15:05 | 200 |  | 0 | locate | EDM 2025 論文集 |
| L21-EDM2025（大寫）同頁 | C02 | 16:15:05–16:15:06 | 200 |  | 0 | locate | EDM2025（大寫）同頁 |
| L21-EDM 2026 論文集 | C02 | 16:15:06–16:15:07 | 200 |  | 0 | locate | EDM 2026 論文集 |
| L21-EDM2026（大寫）同頁 | C02 | 16:15:07–16:15:07 | 200 |  | 0 | locate | EDM2026（大寫）同頁 |
| C02-E | C02 | 16:15:05–16:15:07 | 200 | 208 | 208 | enumerated | 2025：88 篇（Full 29、Short 24、Posters/Demos 19、Workshops/Tutorials 8、DC 5、Industry 3）；2026：120 篇（Full 32、Short 24、Posters/Demos 45、DC 16、Industry 3）；全部附 Zenodo DOI |
| EDMcov1 | C02 | 16:15:28–16:15:29 | 200 | 1 | 0 | locate | 以 208 個 Zenodo DOI 查 OpenAlex：僅 1 筆命中（arXiv 版），EDM 在 OpenAlex 幾無 DOI 覆蓋 |
| EDMcov2 | C02 | 16:15:29–16:15:29 | 200 | 0 | 0 | locate | 以 208 個 Zenodo DOI 查 OpenAlex：僅 1 筆命中（arXiv 版），EDM 在 OpenAlex 幾無 DOI 覆蓋 |
| EDMcov3 | C02 | 16:15:29–16:15:30 | 200 | 0 | 0 | locate | 以 208 個 Zenodo DOI 查 OpenAlex：僅 1 筆命中（arXiv 版），EDM 在 OpenAlex 幾無 DOI 覆蓋 |
| C02-Q1 | C02 | 16:15:52–16:18:21 | 200 | 0 | 208 | items_screened | 非 OpenAlex 查詢；208 頁全部 HTTP 200；摘要只在記憶體比對，未保存 |
| C02-Q2 | C02 | 16:15:52–16:18:21 | 200 | 4 | 208 | items_screened | 4 筆命中皆 AI 為工具；另有 18 筆含學段詞 |
| PD1 | ALL | 16:26:34–16:26:35 | 200 | 50 | 50 | metadata | OpenAlex publication_date 批次 |
| PD2 | ALL | 16:26:41–16:26:41 | 200 | 42 | 42 | metadata | OpenAlex publication_date 批次（Zenodo DOI 多未收） |

完整 URL 見 `group-c.json` 的 `queries[].query_url`（不含任何 key）。布林查詢：
- Q1：`("AI literacy" OR "artificial intelligence literacy" OR "AI education" OR "artificial intelligence education" OR "machine learning education" OR "teaching AI" OR "learning about AI") AND ("K-12" OR "K12" OR "primary school" OR "elementary" OR "secondary school" OR "middle school" OR "high school" OR "children" OR "young learners")`
- Q2：`("artificial intelligence" OR "machine learning" OR "generative AI") AND ("teacher" OR "teachers") AND ("K-12" OR "K12" OR "primary school" OR "elementary" OR "secondary school" OR "middle school" OR "high school")`

## 4. 候選（candidate）

| 來源 | DOI | 題名 | 篇型 | Crossref issued | 學段 | 國別 | 建議分類 | 理由 | verify_bibtex |
|---|---|---|---|---|---|---|---|---|---|
| C01 | 10.1007/978-3-031-99264-3_19 | LLMs to Support K–12 Teachers in Culturally Relevant Pedagogy: An AI Literacy Example | CCIS 卷（Posters／Late-Breaking／Workshops／Practitioners／DC／Blue Sky／WideAIED 等）；確切篇型待官方頁，9 頁 | 2025 | K-12 教師 | unknown | K4 教師 AI 能力 | 官方摘要不可讀（Springer JS 挑戰、OpenAlex/Crossref 無摘要）；以同題 arXiv 2505.08083v1 摘要判定：明示 K-12 教師、AI literacy curricula。須以官方版複核。 | verified (doi) |
| C01 | 10.1007/978-3-032-29763-1_23 | Analyzing Middle School Students’ Dialogue and Behaviors During Collaborative AI Chatbot Development Using Ordered Network Analysis | LNCS 主論文集；15 頁（約 12 頁以上多為 full、約 8 頁多為 short，推估待核） | 2026-6-27 | 國中 | unknown | K2 AI 素養課程／教學 | 依 arXiv 2607.21603v1 摘要：明示 K-12 AI education、middle school students 設計開發 chatbot。arXiv 編號與 API published 日期不一致，僅作線索。 | verified (doi) |
| C01 | 10.1007/978-3-032-29770-9_56 | Democratizing Foundations of Problem-Solving with AI: A Breadth-First Search Curriculum for Middle School Students | LNCS 主論文集；10 頁（約 12 頁以上多為 full、約 8 頁多為 short，推估待核） | 2026-6-27 | 國中（rural middle school） | unknown | K2 AI 素養課程／教學 | 依同題 arXiv 2604.01396v2 摘要：明示 K-12 AI education、rural middle school；含前後測（成效高風險，待 G2–G4）。 | verified (doi) |
| C21 | 10.1145/3801749.3801755 | Turning Students into Neurons — Evaluating an Embodied CS Unplugged Learning Activity on Neural Networks | WiPSCE 論文；10 頁（篇型 full/short 待 ACM 頁確認） | 2026-3-11 | 高中 | unknown | K2 | 讀 OpenAlex 摘要：明示學段且主題為學習關於 AI／ML。含自評能力提升，高風險，待 G2–G4。 | verified (doi) |
| C21 | 10.1145/3801749.3801759 | Towards a Conceptual Change of 7th Grade Students regarding Artificial Intelligence | WiPSCE 論文；4 頁（篇型 full/short 待 ACM 頁確認） | 2026-3-11 | 七年級（德國，28 人） | DE | K2 | 讀 OpenAlex 摘要：明示學段且主題為學習關於 AI／ML。單組教學介入，高風險。 | verified (doi) |
| C21 | 10.1145/3801749.3801762 | Teaching Machine Learning and Computational Thinking in Secondary Education: Hands-On vs. Video-Based Approaches | WiPSCE 論文；9 頁（篇型 full/short 待 ACM 頁確認） | 2026-3-11 | 高中（32 人） | unknown | K2 | 讀 OpenAlex 摘要：明示學段且主題為學習關於 AI／ML。準實驗小樣本，高風險。 | verified (doi) |
| C21 | 10.1145/3801749.3801767 | Exploring Preservice Teachers’ Conceptual Trajectories While Teaching an AI and STEM Integrated Unit: A Research-in-Practice Report | WiPSCE 論文；6 頁（篇型 full/short 待 ACM 頁確認） | 2026-3-11 | 職前教師教 K-5 | US | K4 | 讀 OpenAlex 摘要：明示學段且主題為學習關於 AI／ML。 | verified (doi) |
| C21 | 10.1145/3801749.3801788 | Should we open the Black Box? Investigating Transparency in K-12 Machine Learning Education | WiPSCE 論文；2 頁（篇型 full/short 待 ACM 頁確認） | 2026-3-11 | K-12（試行 N=66） | unknown | K2 | 讀 OpenAlex 摘要：明示學段且主題為學習關於 AI／ML。 | verified (doi) |
| C22 | 10.1609/aaai.v39i28.35181 | “AlphAI”: Teaching AI Algorithms to K12 by Training Learning Robots and Visualizing How It Works | EAAI 分軌：EAAI Symposium: Resources for Teaching AI in K-12；8 頁 | 2025-4-11 | K-12（8 歲起） | unknown | K2 | 讀 OpenAlex 摘要：明示 K-12／學段且主題為學習關於 AI 或教師教 AI 能力。 | verified (doi) |
| C22 | 10.1609/aaai.v39i28.35183 | Understanding K-12 Teachers’ Needs for AI Education: A Survey-Based Study | EAAI 分軌：EAAI Symposium: Resources for Teaching AI in K-12；8 頁 | 2025-4-11 | K-12 教師 | unknown | K4 | 讀 OpenAlex 摘要：明示 K-12／學段且主題為學習關於 AI 或教師教 AI 能力。 | verified (doi) |
| C22 | 10.1609/aaai.v39i28.35185 | Smart Motor: A Low-Cost Hardware and Software Toolkit for Introducing Supervised Machine Learning to Elementary School Students | EAAI 分軌：EAAI Symposium: Resources for Teaching AI in K-12；9 頁 | 2025-4-11 | 國小 | unknown | K2 | 讀 OpenAlex 摘要：明示 K-12／學段且主題為學習關於 AI 或教師教 AI 能力。 | verified (doi) |
| C22 | 10.1609/aaai.v39i28.35186 | Empowering Educators in AI: Insights from Co-Designing an AI Microcredential with and for K-12 Educators | EAAI 分軌：EAAI Symposium: Resources for Teaching AI in K-12；8 頁 | 2025-4-11 | K-12 教師 | unknown | K4 | 讀 OpenAlex 摘要：明示 K-12／學段且主題為學習關於 AI 或教師教 AI 能力。 | verified (doi) |
| C22 | 10.1609/aaai.v39i28.35188 | Shaping AI Interest in Rural Middle Schools with Unplugged Learning: Gender Differences and Teacher Insights | EAAI 分軌：EAAI Symposium: Resources for Teaching AI in K-12；9 頁 | 2025-4-11 | 國中（鄉村） | unknown | K2 | 讀 OpenAlex 摘要：明示 K-12／學段且主題為學習關於 AI 或教師教 AI 能力。 | verified (doi) |
| C22 | 10.1609/aaai.v39i28.35191 | Supporting AI Literacy Teaching Through the Development of Assessments for Classroom Use | EAAI 分軌：EAAI Symposium: Resources for Teaching AI in K-12；8 頁 | 2025-4-11 | 國中、高中 | unknown | K2 | 讀 OpenAlex 摘要：明示 K-12／學段且主題為學習關於 AI 或教師教 AI 能力。含前後測／成效敘述，高風險，待 G2–G4。 | verified (doi) |
| C22 | 10.1609/aaai.v39i28.35192 | Learning About Algorithm Auditing in Five Steps: Scaffolding How High School Youth Can Systematically and Critically Evaluate Machine Learning Applications | EAAI 分軌：EAAI Symposium: Resources for Teaching AI in K-12；9 頁 | 2025-4-11 | 高中（校外工作坊） | unknown | K2 | 讀 OpenAlex 摘要：明示 K-12／學段且主題為學習關於 AI 或教師教 AI 能力。 | verified（以 arXiv 題名比對 2412.06989v3，非 DOI；預印本早於會議論文，首發日須另核） |
| C22 | 10.1609/aaai.v39i28.35193 | What Can Youth Learn About Artificial Intelligence and Machine Learning in One Hour? Examining How Hour of Code Activities Address the Five Big Ideas of AI | EAAI 分軌：EAAI Symposium: Resources for Teaching AI in K-12；8 頁 | 2025-4-11 | K-12 | unknown | K2 | 讀 OpenAlex 摘要：明示 K-12／學段且主題為學習關於 AI 或教師教 AI 能力。 | verified（以 arXiv 題名比對 2412.11911v2，非 DOI；預印本早於會議論文，首發日須另核） |
| C22 | 10.1609/aaai.v40i47.41499 | Exploring Cross-Cultural Perspectives on AI Education: Insights from Teachers in Nigeria and the USA | EAAI 分軌：EAAI Symposium: Main track；9 頁 | 2026-3-14 | 國中教師（奈及利亞、美國） | NG; US | K4 | 讀 OpenAlex 摘要：明示 K-12／學段且主題為學習關於 AI 或教師教 AI 能力。 | verified (doi) |
| C22 | 10.1609/aaai.v40i47.41501 | Unplugged Activities on Machine Learning and Their Evaluation Through Mental States Attribution | EAAI 分軌：EAAI Symposium: Main track；9 頁 | 2026-3-14 | 9–12 歲兒童 | unknown | K2 | 讀 OpenAlex 摘要：明示 K-12／學段且主題為學習關於 AI 或教師教 AI 能力。 | verified (doi) |
| C22 | 10.1609/aaai.v40i47.41504 | Integrating AI Competencies into Teacher Education Programs | EAAI 分軌：EAAI Symposium: Main track；9 頁 | 2026-3-14 | PK-12（師培） | unknown | K4 | 讀 OpenAlex 摘要：明示 K-12／學段且主題為學習關於 AI 或教師教 AI 能力。 | verified (doi) |
| C22 | 10.1609/aaai.v40i47.41507 | ‘What Do Children Think About AI?’: Insights and Educational Implications from Primary School Students’ Perceptions of AI | EAAI 分軌：EAAI Symposium: Main track；9 頁 | 2026-3-14 | 國小（233 名學生、7 校） | unknown | K2 | 讀 OpenAlex 摘要：明示 K-12／學段且主題為學習關於 AI 或教師教 AI 能力。 | verified (doi) |
| C22 | 10.1609/aaai.v40i47.41511 | Impact of a Data-driven Teaching Approach on 9th Graders Conceptual Understanding of Machine Learning | EAAI 分軌：EAAI Symposium: Main track；9 頁 | 2026-3-14 | 九年級（德國，83 人） | DE | K2 | 讀 OpenAlex 摘要：明示 K-12／學段且主題為學習關於 AI 或教師教 AI 能力。含前後測／成效敘述，高風險，待 G2–G4。 | verified (doi) |
| C22 | 10.1609/aaai.v40i47.41518 | AI Scholars Program: Scaling AI Literacy Through K-12 Outreach | EAAI 分軌：EAAI Symposium: Main track；9 頁 | 2026-3-14 | K-12（教師與學生推廣） | US | K2 | 讀 OpenAlex 摘要：明示 K-12／學段且主題為學習關於 AI 或教師教 AI 能力。含前後測／成效敘述，高風險，待 G2–G4。 | verified (doi) |
| C22 | 10.1609/aaai.v40i47.41520 | Learning to Use AI for Learning: Teaching Responsible Use of AI Chatbot to K-12 Students Through an AI Literacy Module | EAAI 分軌：EAAI Symposium: Main track；9 頁 | 2026-3-14 | 中學 | unknown | K2 | 讀 OpenAlex 摘要：明示 K-12／學段且主題為學習關於 AI 或教師教 AI 能力。含前後測／成效敘述，高風險，待 G2–G4。 | verified (doi) |
| C22 | 10.1609/aaai.v40i47.41524 | Beetrap-MC: A Minecraft-Based AI Literacy Tool for Teaching Filter Bubbles to Middle School Students | EAAI 分軌：EAAI Symposium: Resources for Teaching AI in K-12；8 頁 | 2026-3-14 | 國中 | unknown | K2 | 讀 OpenAlex 摘要：明示 K-12／學段且主題為學習關於 AI 或教師教 AI 能力。含前後測／成效敘述，高風險，待 G2–G4。 | verified (doi) |
| C22 | 10.1609/aaai.v40i47.41525 | Breakable Machine: A K–12 Classroom Game for Transformative AI Literacy Through Spoofing and eXplainable AI (XAI) | EAAI 分軌：EAAI Symposium: Resources for Teaching AI in K-12；9 頁 | 2026-3-14 | 10–15 歲課堂 | unknown | K2 | 讀 OpenAlex 摘要：明示 K-12／學段且主題為學習關於 AI 或教師教 AI 能力。 | verified (doi) |
| C22 | 10.1609/aaai.v40i47.41527 | Catching the First Light of Tomorrow: A Hackathon-Based Framework for Introducing High School Students to AI Agents | EAAI 分軌：EAAI Symposium: Resources for Teaching AI in K-12；9 頁 | 2026-3-14 | 高中 | unknown | K2 | 讀 OpenAlex 摘要：明示 K-12／學段且主題為學習關於 AI 或教師教 AI 能力。 | verified (doi) |
| C22 | 10.1609/aaai.v40i47.41529 | Co-Designing Unplugged Learning Activities with K-2 Teachers for Early AI Literacy Education | EAAI 分軌：EAAI Symposium: Resources for Teaching AI in K-12；9 頁 | 2026-3-14 | K-2 教師／低年級 | unknown | K4 | 讀 OpenAlex 摘要：明示 K-12／學段且主題為學習關於 AI 或教師教 AI 能力。 | verified (doi) |
| C22 | 10.1609/aaai.v40i47.41530 | From Embeddings to Chatbots: Playful NLP Activities for Middle School AI Literacy | EAAI 分軌：EAAI Symposium: Resources for Teaching AI in K-12；9 頁 | 2026-3-14 | 國中（11–14 歲） | unknown | K2 | 讀 OpenAlex 摘要：明示 K-12／學段且主題為學習關於 AI 或教師教 AI 能力。 | verified (doi) |

## 5. 待定（pending）

| 來源 | DOI | 題名 | 篇型 | Crossref issued | 學段 | 國別 | 建議分類 | 理由 | verify_bibtex |
|---|---|---|---|---|---|---|---|---|---|
| C01 | 10.1007/978-3-031-98414-3_11 | Empower Secondary School Teachers to Create ML-Supported Inquiry-Based Learning Activities | LNCS 主論文集；15 頁（約 12 頁以上多為 full、約 8 頁多為 short，推估待核） | 2025 | 中學教師 | unknown | K4 | AIED 官方摘要不可讀（Springer 頁面 JS 挑戰；OpenAlex、Crossref、Semantic Scholar 皆無摘要），僅依題名；題名明示學段與 AI 教育主題，待讀官方頁或作者版本 | verified (doi) |
| C01 | 10.1007/978-3-031-98414-3_26 | The Effects of Professional Development Training on Teachers’ AI Literacy | LNCS 主論文集；13 頁（約 12 頁以上多為 full、約 8 頁多為 short，推估待核） | 2025 | 未明示 | unknown | 未定 | 摘要不可讀；題名「教師 AI 素養專業發展」，學段未明示 | verified (doi) |
| C01 | 10.1007/978-3-031-98459-4_25 | Epistemic Curiosity in K-12 AI Education: A Trajectory Analysis | LNCS 主論文集；14 頁（約 12 頁以上多為 full、約 8 頁多為 short，推估待核） | 2025 | K-12 | unknown | K2 | AIED 官方摘要不可讀（Springer 頁面 JS 挑戰；OpenAlex、Crossref、Semantic Scholar 皆無摘要），僅依題名；題名明示學段與 AI 教育主題，待讀官方頁或作者版本 | verified (doi) |
| C01 | 10.1007/978-3-031-98462-4_13 | Generative AI in K-12 Education Policy: A Preliminary Global Review | LNCS 主論文集；8 頁（約 12 頁以上多為 full、約 8 頁多為 short，推估待核） | 2025 | K-12 | unknown | K5 治理／政策 | AIED 官方摘要不可讀（Springer 頁面 JS 挑戰；OpenAlex、Crossref、Semantic Scholar 皆無摘要），僅依題名；題名明示學段與 AI 教育主題，待讀官方頁或作者版本 | verified (doi) |
| C01 | 10.1007/978-3-031-98465-5_35 | Insights from Culturally Relevant AI Education Programme for Secondary School Students | LNCS 主論文集；8 頁（約 12 頁以上多為 full、約 8 頁多為 short，推估待核） | 2025 | 中學 | unknown | K2 | AIED 官方摘要不可讀（Springer 頁面 JS 挑戰；OpenAlex、Crossref、Semantic Scholar 皆無摘要），僅依題名；題名明示學段與 AI 教育主題，待讀官方頁或作者版本 | verified (doi) |
| C01 | 10.1007/978-3-031-98465-5_36 | Supporting Middle School English Teachers’ AI Literacy Goals Through a Generative AI Tutor | LNCS 主論文集；8 頁（約 12 頁以上多為 full、約 8 頁多為 short，推估待核） | 2025 | 國中（英文教師） | unknown | K4 | AIED 官方摘要不可讀（Springer 頁面 JS 挑戰；OpenAlex、Crossref、Semantic Scholar 皆無摘要），僅依題名；題名明示學段與 AI 教育主題，待讀官方頁或作者版本 | verified (doi) |
| C01 | 10.1007/978-3-031-99261-2_23 | Does the Early Bird Get the Worms? K-12 Teachers’ Perceptions on the Use of Generative Artificial Intelligence in Chinese Classrooms | CCIS 卷（Posters／Late-Breaking／Workshops／Practitioners／DC／Blue Sky／WideAIED 等）；確切篇型待官方頁，14 頁 | 2025 | 未明示 | unknown | 未定 | 摘要不可讀；K-12 教師對生成式 AI 課堂使用之看法；可能屬 AI 作為工具，需讀摘要判斷 | verified (doi) |
| C01 | 10.1007/978-3-031-99264-3_11 | Modeling Socially Constructed Knowledge Using Multimodal Machine Learning: A Case Study in K-12 AI Literacy Education Classroom | CCIS 卷（Posters／Late-Breaking／Workshops／Practitioners／DC／Blue Sky／WideAIED 等）；確切篇型待官方頁，8 頁 | 2025 | K-12 | unknown | K2 | AIED 官方摘要不可讀（Springer 頁面 JS 挑戰；OpenAlex、Crossref、Semantic Scholar 皆無摘要），僅依題名；題名明示學段與 AI 教育主題，待讀官方頁或作者版本 | verified (doi) |
| C01 | 10.1007/978-3-031-99264-3_25 | Riding on the Back of a Whale: A Hackathon Framework for Introducing High School Students to Large Language Models | CCIS 卷（Posters／Late-Breaking／Workshops／Practitioners／DC／Blue Sky／WideAIED 等）；確切篇型待官方頁，9 頁 | 2025 | 高中 | unknown | K2 | AIED 官方摘要不可讀（Springer 頁面 JS 挑戰；OpenAlex、Crossref、Semantic Scholar 皆無摘要），僅依題名；題名明示學段與 AI 教育主題，待讀官方頁或作者版本 | verified (doi) |
| C01 | 10.1007/978-3-031-99267-4_22 | Teachers’ Perspectives on Using and Teaching Artificial Intelligence in Early Primary Education | CCIS 卷（Posters／Late-Breaking／Workshops／Practitioners／DC／Blue Sky／WideAIED 等）；確切篇型待官方頁，8 頁 | 2025 | 國小低年級（教師） | unknown | K4 | AIED 官方摘要不可讀（Springer 頁面 JS 挑戰；OpenAlex、Crossref、Semantic Scholar 皆無摘要），僅依題名；題名明示學段與 AI 教育主題，待讀官方頁或作者版本 | verified (doi) |
| C01 | 10.1007/978-3-031-99267-4_32 | AI Literacy For All: 1st International Workshop on AI Literacy Education For All | CCIS 卷（Posters／Late-Breaking／Workshops／Practitioners／DC／Blue Sky／WideAIED 等）；確切篇型待官方頁，6 頁 | 2025 | 未明示 | unknown | 未定 | 摘要不可讀；AIED 2025 工作坊「AI Literacy For All」介紹，篇型為 workshop summary，學段未明示 | verified (doi) |
| C01 | 10.1007/978-3-031-99267-4_8 | Playful Pathways to AI Literacy: Designing NLP Activities for Middle School AI Education | CCIS 卷（Posters／Late-Breaking／Workshops／Practitioners／DC／Blue Sky／WideAIED 等）；確切篇型待官方頁，8 頁 | 2025 | 國中 | unknown | K2 | AIED 官方摘要不可讀（Springer 頁面 JS 挑戰；OpenAlex、Crossref、Semantic Scholar 皆無摘要），僅依題名；題名明示學段與 AI 教育主題，待讀官方頁或作者版本 | verified (doi) |
| C01 | 10.1007/978-3-032-29763-1_19 | Learning About Artificial Intelligence in Algebra 1 Classes in Virtual School Settings | LNCS 主論文集；14 頁（約 12 頁以上多為 full、約 8 頁多為 short，推估待核） | 2026-6-27 | 高中（Algebra 1，虛擬學校） | unknown | K2 | AIED 官方摘要不可讀（Springer 頁面 JS 挑戰；OpenAlex、Crossref、Semantic Scholar 皆無摘要），僅依題名；題名明示學段與 AI 教育主題，待讀官方頁或作者版本 | verified (doi) |
| C01 | 10.1007/978-3-032-29763-1_8 | A Framework for LLM Integration in Secondary Education: Insights from Computing Teachers | LNCS 主論文集；15 頁（約 12 頁以上多為 full、約 8 頁多為 short，推估待核） | 2026-6-27 | 中學運算教師 | unknown | K5 治理／政策 | AIED 官方摘要不可讀（Springer 頁面 JS 挑戰；OpenAlex、Crossref、Semantic Scholar 皆無摘要），僅依題名；題名明示學段與 AI 教育主題，待讀官方頁或作者版本 | verified (doi) |
| C01 | 10.1007/978-3-032-29770-9_12 | Supporting K-12 Teachers in the Presidential AI Challenge: A Case Study of a Faculty-Mentored Workshop for AI Tool Creation | LNCS 主論文集；9 頁（約 12 頁以上多為 full、約 8 頁多為 short，推估待核） | 2026-6-27 | K-12 教師 | unknown | K4 | AIED 官方摘要不可讀（Springer 頁面 JS 挑戰；OpenAlex、Crossref、Semantic Scholar 皆無摘要），僅依題名；題名明示學段與 AI 教育主題，待讀官方頁或作者版本 | verified (doi) |
| C01 | 10.1007/978-3-032-29770-9_57 | An Attitude Paradox? Examining Ability Beliefs and Persistence Intentions in a Middle School Conversational AI Learning Experience | LNCS 主論文集；9 頁（約 12 頁以上多為 full、約 8 頁多為 short，推估待核） | 2026-6-27 | 國中 | unknown | K2 | AIED 官方摘要不可讀（Springer 頁面 JS 挑戰；OpenAlex、Crossref、Semantic Scholar 皆無摘要），僅依題名；題名明示學段與 AI 教育主題，待讀官方頁或作者版本 | verified (doi) |
| C01 | 10.1007/978-3-032-29770-9_9 | Ethical Reasoning About AI in Middle Schools: Students’ Misconceptions and Mental Models in Sociocultural Contexts | LNCS 主論文集；9 頁（約 12 頁以上多為 full、約 8 頁多為 short，推估待核） | 2026-6-27 | 國中 | unknown | K2 | AIED 官方摘要不可讀（Springer 頁面 JS 挑戰；OpenAlex、Crossref、Semantic Scholar 皆無摘要），僅依題名；題名明示學段與 AI 教育主題，待讀官方頁或作者版本 | verified (doi) |
| C01 | 10.1007/978-3-032-29773-0_11 | Mapping AI Literacy: How Do DigComp 3.0 and OECD/EC AILit Inform K–12 Curriculum Integration Decisions? | LNCS 主論文集；16 頁（約 12 頁以上多為 full、約 8 頁多為 short，推估待核） | 2026-6-27 | K-12 | unknown | K5 治理／政策 | AIED 官方摘要不可讀（Springer 頁面 JS 挑戰；OpenAlex、Crossref、Semantic Scholar 皆無摘要），僅依題名；題名明示學段與 AI 教育主題，待讀官方頁或作者版本 | verified (doi) |
| C01 | 10.1007/978-3-032-29773-0_17 | What Children’s AI Literacy Books Teach: A Content Analysis Using the AI4K12 Framework | LNCS 主論文集；15 頁（約 12 頁以上多為 full、約 8 頁多為 short，推估待核） | 2026-6-27 | 兒童 | unknown | K2 | AIED 官方摘要不可讀（Springer 頁面 JS 挑戰；OpenAlex、Crossref、Semantic Scholar 皆無摘要），僅依題名；題名明示學段與 AI 教育主題，待讀官方頁或作者版本 | verified (doi) |
| C01 | 10.1007/978-3-032-29773-0_20 | A Survey of AI Misconception and Adoption Among Indonesian K-12 Teachers | LNCS 主論文集；15 頁（約 12 頁以上多為 full、約 8 頁多為 short，推估待核） | 2026-6-27 | K-12 教師（印尼） | ID | K4 | AIED 官方摘要不可讀（Springer 頁面 JS 挑戰；OpenAlex、Crossref、Semantic Scholar 皆無摘要），僅依題名；題名明示學段與 AI 教育主題，待讀官方頁或作者版本 | verified (doi) |
| C01 | 10.1007/978-3-032-29773-0_25 | Introducing Adolescents to the Social Dimensions of AI Through Story-Driven Game-Based Learning | LNCS 主論文集；9 頁（約 12 頁以上多為 full、約 8 頁多為 short，推估待核） | 2026-6-27 | 青少年 | unknown | K2 | AIED 官方摘要不可讀（Springer 頁面 JS 挑戰；OpenAlex、Crossref、Semantic Scholar 皆無摘要），僅依題名；題名明示學段與 AI 教育主題，待讀官方頁或作者版本 | verified (doi) |
| C01 | 10.1007/978-3-032-29773-0_35 | Design Tensions for Generative AI in Education for Early to Mid-adolescent Youth: An Exploration of Autonomy, Critical Reflection, and Psychological Safety | LNCS 主論文集；9 頁（約 12 頁以上多為 full、約 8 頁多為 short，推估待核） | 2026-6-27 | 未明示 | unknown | 未定 | 摘要不可讀；早期至中期青少年之生成式 AI 設計張力，可能屬 AI 作為工具 | verified (doi) |
| C01 | 10.1007/978-3-032-29773-0_7 | Evaluating the Impact of Workshop Interventions on AI Literacy and STEM Career Aspirations with Australian Secondary Students | LNCS 主論文集；14 頁（約 12 頁以上多為 full、約 8 頁多為 short，推估待核） | 2026-6-27 | 中學（澳洲） | AU | K2 | AIED 官方摘要不可讀（Springer 頁面 JS 挑戰；OpenAlex、Crossref、Semantic Scholar 皆無摘要），僅依題名；題名明示學段與 AI 教育主題，待讀官方頁或作者版本 | verified (doi) |
| C01 | 10.1007/978-3-032-29773-0_8 | Implementing a Statewide AI Curriculum: One Brazilian Experience | LNCS 主論文集；14 頁（約 12 頁以上多為 full、約 8 頁多為 short，推估待核） | 2026-6-27 | K-12（州層級；題名未明示學段） | BR | K5 治理／政策 | AIED 官方摘要不可讀（Springer 頁面 JS 挑戰；OpenAlex、Crossref、Semantic Scholar 皆無摘要），僅依題名；題名明示學段與 AI 教育主題，待讀官方頁或作者版本 | verified (doi) |
| C01 | 10.1007/978-3-032-29788-4_71 | Design and Feasibility of an LLM-Powered Humanoid Robot as a Reading Companion to Support Children’s AI Literacy | CCIS 卷（Posters／Late-Breaking／Workshops／Practitioners／DC／Blue Sky／WideAIED 等）；確切篇型待官方頁，7 頁 | 2026 | 兒童 | unknown | K2 | AIED 官方摘要不可讀（Springer 頁面 JS 挑戰；OpenAlex、Crossref、Semantic Scholar 皆無摘要），僅依題名；題名明示學段與 AI 教育主題，待讀官方頁或作者版本 | verified (doi) |
| C01 | 10.1007/978-3-032-29794-5_1 | AI4CAREER: Responsible AI for STEM Career Development at Scale in K-16 Education | CCIS 卷（Posters／Late-Breaking／Workshops／Practitioners／DC／Blue Sky／WideAIED 等）；確切篇型待官方頁，6 頁 | 2026 | 未明示 | unknown | 未定 | 摘要不可讀；AI4CAREER K-16 負責任 AI 職涯發展，K-16 跨學段 | verified (doi) |
| C01 | 10.1007/978-3-032-29794-5_40 | Teach to Learn AI Literacy: A Teachable Agent with Evaluator-Guided Scaffolding and Analytics | CCIS 卷（Posters／Late-Breaking／Workshops／Practitioners／DC／Blue Sky／WideAIED 等）；確切篇型待官方頁，7 頁 | 2026 | 未明示 | unknown | 未定 | 摘要不可讀；教學代理人培養 AI 素養，學段未明示 | verified (doi) |
| C01 | 10.1007/978-3-032-29794-5_8 | AI Literacy For All: 2nd International Workshop on AI Literacy Education For All | CCIS 卷（Posters／Late-Breaking／Workshops／Practitioners／DC／Blue Sky／WideAIED 等）；確切篇型待官方頁，7 頁 | 2026 | 未明示 | unknown | 未定 | 摘要不可讀；AIED 2026 第 2 屆「AI Literacy For All」工作坊介紹，workshop summary，學段未明示 | verified (doi) |
| C02 | 10.5281/zenodo.15870131 | Scaffolding AI Literacy Through Student-AI Collaboration in Chatbot Development | doctoral consortium | DataCite publicationYear 2025; published 2025 | 未明示 | unknown | K2 | EDM 2025 Doctoral Consortium；主題為 AI 素養，但摘要未明示 K-12／學段，待讀全文 | verified，但工具配到 concept DOI 10.5281/zenodo.15870130（Zenodo 版本 DOI 與概念 DOI 之別） |
| C21 | 10.1145/3801749.3801764 | Strategy-Oriented Feedback for Fostering Systematic Problem-Solving in Machine Learning Education | WiPSCE 論文；11 頁（篇型 full/short 待 ACM 頁確認） | 2026-3-11 | 未明示 | unknown | K2 | 主題為 ML 教育，但摘要未明示學段（N=205），待讀全文 | verified (doi) |
| C22 | 10.1609/aaai.v39i28.35182 | Designing Characters with AI: An Art &amp; AI Learning Activity | EAAI 分軌：EAAI Symposium: Resources for Teaching AI in K-12；8 頁 | 2025-4-11 | 題名部分明示／屬 K-12 track | unknown | K2 | EAAI-25「Resources for Teaching AI in K-12」分軌，主題為 AI 教學；未讀摘要（細讀上限），待補讀確認學段：AI 藝術角色設計活動 | verified（score 0.97，& 與 and 差異） |
| C22 | 10.1609/aaai.v39i28.35184 | Advancing Research on Equitable AI Education Through a Focus on Implementation: Insights from a Middle School Computer Vision Module Beta-Test | EAAI 分軌：EAAI Symposium: Resources for Teaching AI in K-12；8 頁 | 2025-4-11 | 題名部分明示／屬 K-12 track | unknown | K2 | EAAI-25「Resources for Teaching AI in K-12」分軌，主題為 AI 教學；未讀摘要（細讀上限），待補讀確認學段：國中電腦視覺課程之公平 AI 教育實施 | verified (doi) |
| C22 | 10.1609/aaai.v39i28.35187 | “From Unseen Needs to Classroom Solutions”: Exploring AI Literacy Challenges &amp; Opportunities with Project-Based Learning Toolkit in K-12 Education | EAAI 分軌：EAAI Symposium: Resources for Teaching AI in K-12；8 頁 | 2025-4-11 | 題名部分明示／屬 K-12 track | unknown | K2 | EAAI-25「Resources for Teaching AI in K-12」分軌，主題為 AI 教學；未讀摘要（細讀上限），待補讀確認學段：專題式學習探究 AI 素養挑戰（課堂） | verified（score 0.99） |
| C22 | 10.1609/aaai.v39i28.35189 | A Versatile Low-Cost Kit for Teaching Novice Learners AI Using Robotics Components and a No-Code Development Playground | EAAI 分軌：EAAI Symposium: Resources for Teaching AI in K-12；9 頁 | 2025-4-11 | 題名部分明示／屬 K-12 track | unknown | K2 | EAAI-25「Resources for Teaching AI in K-12」分軌，主題為 AI 教學；未讀摘要（細讀上限），待補讀確認學段：以機器人零件與無程式平台教新手 AI | verified (doi) |
| C22 | 10.1609/aaai.v39i28.35190 | Fostering Epistemic Insights into AI Ethics through a Constructionist Pedagogy: An Interdisciplinary Approach to AI Literacy | EAAI 分軌：EAAI Symposium: Resources for Teaching AI in K-12；7 頁 | 2025-4-11 | 題名部分明示／屬 K-12 track | unknown | K2 | EAAI-25「Resources for Teaching AI in K-12」分軌，主題為 AI 教學；未讀摘要（細讀上限），待補讀確認學段：建構主義教 AI 倫理之跨領域 AI 素養 | verified (doi) |
| C22 | 10.1609/aaai.v39i28.35194 | An XAI Social Media Platform for Teaching K-12 Students AI-Driven Profiling, Clustering, and Engagement-Based Recommending | EAAI 分軌：EAAI Symposium: Resources for Teaching AI in K-12；9 頁 | 2025-4-11 | 題名部分明示／屬 K-12 track | unknown | K2 | EAAI-25「Resources for Teaching AI in K-12」分軌，主題為 AI 教學；未讀摘要（細讀上限），待補讀確認學段：以 XAI 社群平台教 K-12 學生分群與推薦 | verified (doi) |
| C22 | 10.1609/aaai.v39i28.35195 | Learning to Think Like a Neuron in Middle School | EAAI 分軌：EAAI Symposium: Resources for Teaching AI in K-12；8 頁 | 2025-4-11 | 題名部分明示／屬 K-12 track | unknown | K2 | EAAI-25「Resources for Teaching AI in K-12」分軌，主題為 AI 教學；未讀摘要（細讀上限），待補讀確認學段：國中生像神經元一樣思考 | verified (doi) |
| C22 | 10.1609/aaai.v39i28.35196 | AI Chef Trainer: Introducing Students to the Importance of Data in Machine Learning | EAAI 分軌：EAAI Symposium: Resources for Teaching AI in K-12；8 頁 | 2025-4-11 | 題名部分明示／屬 K-12 track | unknown | K2 | EAAI-25「Resources for Teaching AI in K-12」分軌，主題為 AI 教學；未讀摘要（細讀上限），待補讀確認學段：AI Chef Trainer：資料在 ML 的重要性 | verified (doi) |
| C22 | 10.1609/aaai.v39i28.35197 | Word2Vec4Kids: Interactive Challenges to Introduce Middle School Students to Word Embeddings | EAAI 分軌：EAAI Symposium: Resources for Teaching AI in K-12；8 頁 | 2025-4-11 | 題名部分明示／屬 K-12 track | unknown | K2 | EAAI-25「Resources for Teaching AI in K-12」分軌，主題為 AI 教學；未讀摘要（細讀上限），待補讀確認學段：Word2Vec4Kids：國中生詞向量互動挑戰 | verified (doi) |
| C22 | 10.1609/aaai.v40i47.41522 | Situating Youth Agency in Designing AI &amp; Art Policies | EAAI 分軌：EAAI Symposium: Resources for Teaching AI in K-12；8 頁 | 2026-3-14 | 屬 K-12 track；學段待確認 | unknown | K2 | EAAI-26「Resources for Teaching AI in K-12」分軌；未讀摘要（細讀上限）：青少年參與 AI 與藝術政策設計 | verified（score 0.97，& 與 and 差異） |
| C22 | 10.1609/aaai.v40i47.41523 | AI Education Across the Curriculum: Design and Pilot Study of a Cross-Disciplinary Module Set | EAAI 分軌：EAAI Symposium: Resources for Teaching AI in K-12；8 頁 | 2026-3-14 | 屬 K-12 track；學段待確認 | unknown | K2 | EAAI-26「Resources for Teaching AI in K-12」分軌；未讀摘要（細讀上限）：跨學科 AI 教育模組（學段未明示） | verified (doi) |
| C22 | 10.1609/aaai.v40i47.41526 | Games of Representation: Developing Card-Based Activities to Teach About Representation and Bias in AI Datasets | EAAI 分軌：EAAI Symposium: Resources for Teaching AI in K-12；8 頁 | 2026-3-14 | 屬 K-12 track；學段待確認 | unknown | K2 | EAAI-26「Resources for Teaching AI in K-12」分軌；未讀摘要（細讀上限）：卡牌活動教 AI 資料集代表性與偏差 | verified (doi) |
| C22 | 10.1609/aaai.v40i47.41528 | Bot Blitz: A Scalable Hands-On Workshop for Teaching AI and Robotics Concepts Through Narrative-Driven Problem Solving | EAAI 分軌：EAAI Symposium: Resources for Teaching AI in K-12；7 頁 | 2026-3-14 | 屬 K-12 track；學段待確認 | unknown | K2 | EAAI-26「Resources for Teaching AI in K-12」分軌；未讀摘要（細讀上限）：Bot Blitz：AI 與機器人工作坊 | verified (doi) |

## 6. 排除（exclude，留痕）

| 來源 | DOI | 題名 | 篇型 | Crossref issued | 學段 | 國別 | 建議分類 | 理由 | verify_bibtex |
|---|---|---|---|---|---|---|---|---|---|
| C01 | 10.1007/978-3-031-98420-4_2 | Cultivating AI Literacy in Higher Education Students: A Four-Step Conceptual Framework | LNCS 主論文集；14 頁（約 12 頁以上多為 full、約 8 頁多為 short，推估待核） | 2025 | 高教或非學習關於 AI | unknown | — | 題名排除：高教學生 AI 素養框架 | not_run（exclude 不跑） |
| C01 | 10.1007/978-3-031-98462-4_15 | Advancing AI Literacy in Medical Education: A Medical AI Competency Framework Development | LNCS 主論文集；8 頁（約 12 頁以上多為 full、約 8 頁多為 short，推估待核） | 2025 | 高教或非學習關於 AI | unknown | — | 題名排除：醫學教育 AI 素養 | not_run（exclude 不跑） |
| C01 | 10.1007/978-3-031-99264-3_26 | Design and Validation of the Psychometric Properties of a Questionnaire Measuring AI Literacy Among University Students: Preliminary Results | CCIS 卷（Posters／Late-Breaking／Workshops／Practitioners／DC／Blue Sky／WideAIED 等）；確切篇型待官方頁，8 頁 | 2025 | 高教或非學習關於 AI | unknown | — | 題名排除：大學生 AI 素養問卷 | not_run（exclude 不跑） |
| C01 | 10.1007/978-3-031-99264-3_31 | ‘The World of AI’: A Novel Approach to AI Literacy for First-Year Engineering Students | CCIS 卷（Posters／Late-Breaking／Workshops／Practitioners／DC／Blue Sky／WideAIED 等）；確切篇型待官方頁，8 頁 | 2025 | 高教或非學習關於 AI | unknown | — | 題名排除：大一工程學生 AI 素養 | not_run（exclude 不跑） |
| C01 | 10.1007/978-3-032-29773-0_21 | Mapping AI Literacy in Medical Education: A Review of Concepts and Teaching Practices | LNCS 主論文集；9 頁（約 12 頁以上多為 full、約 8 頁多為 short，推估待核） | 2026-6-27 | 高教或非學習關於 AI | unknown | — | 題名排除：醫學教育 AI 素養回顧 | not_run（exclude 不跑） |
| C01 | 10.1007/978-3-032-29773-0_36 | AI That Helps—or Widens Gaps? Equity Impacts of a Learning-by-Teaching Tutor in K–12 Mathematics | LNCS 主論文集；8 頁（約 12 頁以上多為 full、約 8 頁多為 short，推估待核） | 2026-6-27 | 高教或非學習關於 AI | unknown | — | 題名排除：K-12 數學學習型教學代理人公平性，AI 為學習工具 | not_run（exclude 不跑） |
| C01 | 10.1007/978-3-032-29788-4_47 | Translating Game-Based AI Literacy Activities Across Age Groups: A Pilot Study in Undergraduate Computer Science | CCIS 卷（Posters／Late-Breaking／Workshops／Practitioners／DC／Blue Sky／WideAIED 等）；確切篇型待官方頁，7 頁 | 2026 | 高教或非學習關於 AI | unknown | — | 題名排除：大學資工 AI 素養遊戲 | not_run（exclude 不跑） |
| C01 | 10.1007/978-3-032-29788-4_70 | A Dialogue-Based Board Game for AI Literacy in Higher Education | CCIS 卷（Posters／Late-Breaking／Workshops／Practitioners／DC／Blue Sky／WideAIED 等）；確切篇型待官方頁，7 頁 | 2026 | 高教或非學習關於 AI | unknown | — | 題名排除：高教 AI 素養桌遊 | not_run（exclude 不跑） |
| C02 | 10.5281/zenodo.15870229 | Who to Help?  A Time-Slice Analysis of K-12 Teachers' Decisions in Classes with AI-Supported Tutoring | poster/demo | DataCite publicationYear 2025; published 2025 | K-12／中學 | unknown | — | 排除：K-12 教師在 AI 輔助家教課堂中的決策（AI 為學習工具） | not_run（exclude 不跑） |
| C02 | 10.5281/zenodo.15870244 | Quest-Genius: An AI-Driven Personalised Learning Platform Bridging Educational Gaps for Secondary Students - A Quasi-Experimental Study on Academic Performance, Engagement, and Equity | poster/demo | DataCite publicationYear 2025; published 2025 | K-12／中學 | unknown | — | 排除：中學生 AI 個人化學習平台（AI 為學習工具） | not_run（exclude 不跑） |
| C02 | 10.5281/zenodo.21040119 | Scalable Argumentative Writing Support: The Efficacy of Small Open-Source Models in K-12 Writing Instruction | poster/demo | DataCite publicationYear 2026; published 2026 | K-12／中學 | unknown | — | 排除：K-12 寫作教學小型開源模型（AI 為學習工具） | not_run（exclude 不跑） |
| C21 | 10.1145/3801749.3801753 | Leveraging LLMs to Grade Code Comments in High School Assessment | WiPSCE 論文；10 頁（篇型 full/short 待 ACM 頁確認） | 2026-3-11 | K-12 | unknown | — | 排除：LLM 批改高中程式註解（AI 為工具） | not_run（exclude 不跑） |
| C21 | 10.1145/3801749.3801761 | "It's important, but..." -- Secondary Computing Teachers’ Beliefs and Self-Efficacy about Teaching Social Issues | WiPSCE 論文；10 頁（篇型 full/short 待 ACM 頁確認） | 2026-3-11 | K-12 | unknown | — | 排除：中學運算教師教社會議題之信念，摘要未聚焦 AI | not_run（exclude 不跑） |
| C21 | 10.1145/3801749.3801770 | Enhancing K-12 Computer Science Learning with AI: Pedagogical Prompt-Guided Pair Programming in Student Exercises | WiPSCE 論文；2 頁（篇型 full/short 待 ACM 頁確認） | 2026-3-11 | K-12 | unknown | — | 排除：AI 作為配對程式學習夥伴（AI 為學習工具） | not_run（exclude 不跑） |
| C21 | 10.1145/3801749.3801772 | Investigating AI Tool Use in K-12 Computer Science Classrooms | WiPSCE 論文；2 頁（篇型 full/short 待 ACM 頁確認） | 2026-3-11 | K-12 | unknown | — | 排除：K-12 CS 教師與學生使用 AI 工具之分類（AI 為工具，非學習關於 AI） | not_run（exclude 不跑） |
| C21 | 10.1145/3801749.3801782 | Proposing an AI-Assistant to Help Teachers Analyse and Modify Computational Problem Solving Activities | WiPSCE 論文；2 頁（篇型 full/short 待 ACM 頁確認） | 2026-3-11 | K-12 | unknown | — | 排除：協助教師分析活動之 AI 助理（AI 為工具） | not_run（exclude 不跑） |
| C21 | 10.1145/3801749.3801786 | Flemish Learning Objective: Pupils to Analyse the Impact of Digital Systems on Society through Computational Thinking | WiPSCE 論文；2 頁（篇型 full/short 待 ACM 頁確認） | 2026-3-11 | K-12 | unknown | — | 排除：數位系統社會影響，未聚焦 AI | not_run（exclude 不跑） |
| C22 | 10.1609/aaai.v39i28.35144 | AI-Driven Virtual Teacher for Enhanced Educational Efficiency: Leveraging Large Pretrain Models for Autonomous Error Analysis and Correction | EAAI 分軌：IAAI Technical Track on Deployed Highly Innovative Applications of AI；9 頁 | 2025-4-11 | — | unknown | — | 排除：IAAI 分軌（非 EAAI），AI 虛擬教師 | not_run（exclude 不跑） |
| C22 | 10.1609/aaai.v39i28.35166 | The Essentials of AI for Life and Society: An AI Literacy Course for the University Community | EAAI 分軌：EAAI Symposium: Main Track；6 頁 | 2025-4-11 | — | unknown | — | 排除：大學社群 AI 素養課 | not_run（exclude 不跑） |
| C22 | 10.1609/aaai.v39i28.35168 | Artificial Intelligence for Future Presidents: Teaching AI Literacy to Everyone | EAAI 分軌：EAAI Symposium: Main Track；8 頁 | 2025-4-11 | — | unknown | — | 排除：面向所有人之大學 AI 素養 | not_run（exclude 不跑） |
| C22 | 10.1609/aaai.v40i47.41509 | Brains vs. Algorithms? How Experts and Students See AI-Generated Distractors | EAAI 分軌：EAAI Symposium: Main track；8 頁 | 2026-3-14 | — | unknown | — | 排除：AI 生成誘答選項之專家／學生看法，學段未明示且主題為 AI 工具 | not_run（exclude 不跑） |
| C22 | 10.1609/aaai.v40i47.41515 | AI Unplugged: Embodied Interactions for AI Literacy in Higher Education | EAAI 分軌：EAAI Symposium: Main track；9 頁 | 2026-3-14 | — | unknown | — | 排除：高教 AI 素養 | not_run（exclude 不跑） |
| C22 | 10.1609/aaai.v40i47.41521 | The Essentials of AI for Life and Society: A Full-Scale AI Literacy Course Accessible to All | EAAI 分軌：EAAI Symposium: Main track；7 頁 | 2026-3-14 | — | unknown | — | 排除：大學 AI 素養課 | not_run（exclude 不跑） |
| C22 | 10.1609/aaai.v40i48.42117 | “Debate Guru”: Honing Public Speaking Skills Among Secondary School Students with AI Tutoring Systems | EAAI 分軌：EAAI Symposium: AI for Education；8 頁 | 2026-3-14 | — | unknown | — | 排除：中學生 AI 辯論導師，AI 為學習工具 | not_run（exclude 不跑） |
| C22 | 10.1609/aaai.v40i48.42127 | TacpAgent: Enhancing Student Engagement in Classroom Exercises Through LLM-Generated Feedback | EAAI 分軌：EAAI Symposium: AI for Education；9 頁 | 2026-3-14 | — | unknown | — | 排除：AI for Education 分軌：LLM 回饋工具，AI 為學習工具 | not_run（exclude 不跑） |

## 7. 限制

- AIED 摘要不可讀（Springer Client Challenge、Crossref／OpenAlex 無摘要、Semantic Scholar 標示出版社隱藏摘要）；28 篇 AIED 項目只能列 pending，3 篇 candidate 的學段判讀依 arXiv 版摘要，須以官方版複核。
- AIED 試圖以 Crossref cursor 全量列舉失敗（JSON 解析錯誤，疑似逾時；未計入查詢表），改以 ISBN 逐冊列舉；ISBN 清單來自 relevance 查詢，可能漏掉其他 AIED 卷。
- OpenAlex LNCS source 查詢也帶回非 AIED 的 LNCS／CCIS 會議論文（C01-Q1 10 筆、C01-Q2 14 筆），已以 ISBN 前綴排除，不列入 items。
- EDM 在 OpenAlex 幾乎未收；改用官方論文集逐頁比對，C02-Q1／Q2 是本機 regex 布林，與 OpenAlex title_and_abstract.search 的斷詞／詞幹行為不同。EDM workshop 論文未涵蓋。
- WiPSCE Crossref 日期異常（issued 2026-03-11 早於 published-online 2026-08-20），會議實際舉辦日未取得。
- EAAI 有 13 篇 K-12 分軌論文因細讀上限（每會議約 15–20 篇）未讀摘要，列 pending。
- 35192、35193 經 verify_bibtex 配到 2024-12 arXiv 預印本（2412.06989、2412.11911），代表有早於會議論文集的公開版本；first_public_date 一律 unknown。
- verify_bibtex 只對題名／作者／年份／DOI，不核學段、首發日或內容；exclude 項目未跑。
- 成效敘述（前後測、準實驗、自評提升）一律標高風險，待 G2–G4；本檔不作任何效果主張。
- Crossref 曾回 429（E01、E02 與 4 個 DOI），皆已重試成功。
- Exa／Liner／Wiley Scholar Gateway 需 OAuth，本次未使用；SciSpace 試查 1 次無法取得 AIED 摘要。
- 未保存任何摘要全文；raw 回應在 scratchpad 暫存。

## 8. 給整合者的建議

- EAAI「Resources for Teaching AI in K-12」分軌是本組產量最高、最乾淨的入口（每年約 9–17 篇，摘要可讀），建議列為固定監測分軌。
- AIED 需可讀的 Springer 頁或作者版本才能升級 pending；不要只憑題名入庫。
- EDM 與 K-12 AI 素養交集極少（208 篇中 0 篇可直接入選），維持低頻監測即可。
- WiPSCE 每冊約 40 篇、摘要完整，可整冊逐篇初篩。
