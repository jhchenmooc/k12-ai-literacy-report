# 論文搜尋與核對工具試跑（2026-10-09）

> **性質：人工搜尋輔助的試跑紀錄，不是新功能、不是排程、不構成獨立認證。** 所有結果仍走既有 P0／v1.6 SOP；同一模型完成的搜尋與核對不等於真人或跨模型獨立審閱。九筆候選 hold／`source_checked=false`、`publication/issues.json` 零期別均未更動。

- 讀取基準：main `a5a70a6`（#96），無 open PR；main [Run 37955009731](https://github.com/jhchenmooc/k12-ai-literacy-report/actions/runs/37955009731) verify/deploy 成功。
- 試跑前正式表 SHA-256：records `81759fbe…`、relations `5f9a2620…`、search_runs `d69b9a6b…`、issues.json `4f09dbff…`。
- 試跑 UTC：2026-10-09T15:55:35Z 開始；最後一次外部查詢 16:00:57Z。各步驟耗時以下表 UTC 窗口為準，未逐呼叫計時者寫「未計」。

## A1｜Research Desk `verify_reference`／`verify_bibtex`（本機版）

| 範圍 | 結果 | 說明 |
|---|---|---|
| `discovered_unverified` **9 筆**（KB-2026-0001～0009；任務單寫 8 筆，實際為 9 筆） | 3 筆論文 `partial`：A05（以題名配到 DOI `10.3390/app16199907`）、A08 `10.1002/jcal.70308`、A09 `10.1016/j.caeai.2026.100661`；6 筆活動／新聞網頁 `unchecked`（工具只查學術索引；A07 試查回 `not_found`，屬預期，不代表網頁不存在） | 主表無作者欄，工具最多只能給 `partial`（題名＋DOI＋年份相符）。**未改**九筆的任何欄位；A05 主表仍無 DOI。 |
| `bibliographic_checked` 中有 DOI 的 **22 筆**（超出原訂 3–5 筆抽查，因批次呼叫成本低） | 21 筆 `partial`；1 筆 `not_found` | `not_found` 為 KB-2026-0010 OECD 框架：OpenAlex 題名只收主標題，工具判 DOI「指向另一篇」。Crossref 查同 DOI 得 title「Empowering Learners for the Age of AI」＋subtitle「An AI Literacy Framework for Primary and Secondary Education」、published 2026-06-18，與主表一致 → **工具偽陰性，非書目錯誤**。 |
| 負控制（KB-2025-0012 題名配 KB-2025-0010 DOI） | `mismatch` | 確認工具能抓到 DOI 張冠李戴。 |
| 無 DOI 的官方文件（UNESCO、澳洲、日本、韓國、英格蘭） | 未查 | 工具只涵蓋 OpenAlex／arXiv，不適用官方政策頁。 |

**結論**：沒有發現真正的 mismatch／not_found 書目。工具適合 G1 的「DOI↔題名↔第一作者↔年份」快速對帳與抓錯配；**不核首發日、版本、學段或內容**，年份差一年也不會被標記（例：KB-2027-0001 Crossref 卷期 2027、OpenAlex 2026，仍為 `verified`）。OpenAlex 大量取自 Crossref，兩者一致不等於兩個獨立來源。

## A2｜paper-search（OpenAlex）定向查詢：J01／J02／J03

選擇理由：三本核心期刊在 `search_runs.csv` 中**沒有任何搜尋紀錄**；`p0-academic-entry-a` 記錄 J01／J02 出版社首頁 403、J03 2026 起改由 Elsevier 出版。OpenAlex source ID：J01 `S4210172634`、J02 `S4210183364`、J03 `S171267539`（Elsevier 2026 DOI `10.1016/j.ijaied.2026.100001` 也歸同一 ID）。

外掛的 `search.sh` 沒有期刊／日期過濾，因此直接呼叫同一 OpenAlex API（proxy 自動帶 key，未讀取或印出 key）加 `filter=`。範圍 `publication_date` 2025-01-01～2026-10-09。

| 代號 | UTC | 查詢（`title_and_abstract.search`，另加來源與日期 filter） | HTTP／耗時 | 命中（OpenAlex 精確 count） |
|---|---|---|---|---|
| q1 | 15:58:04–15:58:06 | `("AI literacy" OR "artificial intelligence literacy" OR "AI education") AND ("K-12" OR "primary school" OR "elementary school" OR "secondary school" OR "middle school" OR "high school" OR "K12")` | 200／1.28 s | 23（J01 6、J02 13、J03 4） |
| q2 | 15:58:06 | 同 q2b 但含 `competenc*`、`teacher*` 萬用字元 | **400**：stemmed 欄位不支援萬用字元 | **失敗，不記零命中、不入 search_runs** |
| q2b | 15:58:11 | `("generative AI" OR "ChatGPT" OR "large language model") AND (<同上學段詞>) AND (literacy OR competency OR competencies OR curriculum OR teacher OR teachers)` | 200／0.77 s | 10（J01 1、J02 6、J03 3） |
| q3 | 15:58:25–15:58:26 | 只查 J01 且 `has_abstract:false`：`title.search:("artificial intelligence" OR "AI" OR "generative" OR "ChatGPT" OR "chatbot" OR "large language model")` | 200／0.61 s | 53 |

**為何加 q3**：範圍內 J01 有 193／329 篇在 OpenAlex 無摘要（J02 11／322、J03 1／98），q1／q2b 對 J01 實際上只比對標題。q3 補標題面，仍可能漏掉標題未提 AI 的論文。

**實際讀取範圍**：81 篇不重複作品逐題名初篩；其中 22 篇讀 OpenAlex 摘要（3 篇無摘要只看題名）；**未讀出版社頁或全文**（ScienceDirect 403、Springer 303 cookie 轉址）。逐篇裁決見 [`screening.csv`](screening.csv)（只存書目與裁決，不存摘要）。

**去重**：以小寫 DOI 對主表 24 個 DOI 及 `research/` 內 145 個既有 DOI 字串比對：主表重複 1（A09 `caeai.2026.100661`）；既有 audit 重訪 0。

**裁決**：入庫 16、重複 1、讀摘要後排除 6、題名排除 58。入庫條件：摘要（或 N16 題名）明示 K-12／中小學學段，且主題為 AI 素養、AI 教育、教師教 AI 的能力，或 K-12 生成式 AI 風險治理。排除：非 K-12 專屬、AI 只作學習工具、無摘要且學段不明。

> **同日更正（PR #97 合併後）**：管理者決定學段一律須由摘要明示，不再只憑題名入選。N16 `10.1016/j.compedu.2025.105435`（KB-2025-0021，OpenAlex 無摘要）已撤回為待判，其 records／relations 移除、`P0-20261009-TOOLQ1-J01` 的 recorded 由 4 改為 3；**本批實際入庫 15 筆**，KB-2025-0021 不再重用。詳見 [p0-tool-wave-2026-10-09/integration.md](../p0-tool-wave-2026-10-09/integration.md)。

### 入庫方式（依 schema.md）

- 16 筆 `journal_article`，`verification_status=discovered_unverified`。**未升 `bibliographic_checked`**：既有該級紀錄均讀過出版社頁，本批只核 Crossref／OpenAlex metadata，出版社頁不可讀。
- `first_published_on` 留空、`date_precision=unknown`。Crossref 對這些 DOI **沒有 `published-online`**，只有卷期月；OpenAlex `publication_date` 來源不明，不能當首發日。`year_value` 取 Crossref 卷期年，`year_basis=issue_year`（與 KB-2025-0006／0009 一致）；KB-2027-0001 卷期為 2027-01，故索引年 2027，不代表 2027 才公開。
- relations：每筆 `has_category`（K2／K3／K4／K5）＋`published_in`（J01／J02／J03），`studies_country` 只在摘要明示時加（US、CN、HK）；全部 `discovered_unverified`。
- search_runs：q1、q2b 依來源拆 6 列、q3 1 列，共 7 列；皆 `items_screened`／`partial`；`results_seen`＝OpenAlex 對該來源的精確 count（不是出版社總量）；同一 DOI 只計入第一個撈到它的 run。
- 方法提醒（G2–G4 尚未做）：KB-2025-0015 單組前後測；KB-2026-0024 前後測效果量、KB-2026-0023 混合中學與大學樣本；這些都不能直接寫成成效主張。KB-2026-0024 與既有 KB-2025-0012（ICCE，同一作者群、同主題）可能是相關作品，**未設 work_group、未合併**。

## A3｜alphaXiv（預印本首發日佐證）

| 測試 | 結果 |
|---|---|
| `get_paper_content` 2503.00079（C08 預印本） | 回傳 AI 生成的長摘要，**沒有版本歷程或日期**，且含推測（如作者職級「likely」）。不能當證據。 |
| `discover_papers`（K-12 AI literacy，2026-09-01 起） | 8 篇，每篇有「Published」日。抽 3 篇（2610.10743、2609.13479、2609.31569）對 arXiv API：皆等於 v1 `<published>` 日期（同日）。 |
| 對照 arXiv API／abs 頁（16:00:43–16:00:57） | 2503.00079 目前最新 **v3**（2025-03-28），v1 2025-02-27T23:32:03Z、v2 03-04，`arxiv:doi` 為 ACM 10.1145/3702652.3744217；2505.07736 v1 2025-05-12、v2 05-13。 |

**評估**：alphaXiv 適合**發現**最新預印本（可直接按日期過濾）；首發日證據仍應引用 arXiv abs 頁的 Submission history 或 arXiv API。v1 submission 時間戳不等於 announce／公開可讀時間（沿用 C08 既有判讀）。關於 wave3 integration 記為「arXiv v4 歷程未解」：2026-10-09 arXiv API 顯示最新只有 v3；這只代表查詢當下的版本狀態，不改主表。本次發現的 2609／2610 預印本未入庫：多非 P0 監測來源，且 2610.10743（10/07）早於 10/09–10/15 當期，不能作當週首發。

## 工具評估表

| 工具 | 本次狀態 | 耗時（實測） | 建議用途 | 限制 |
|---|---|---|---|---|
| Research Desk 本機 `verify_reference`／`verify_bibtex`／`lookup_reference` | 可用 | 單批 17 筆一次回應（未逐筆計時） | G1 書目對帳：DOI↔題名↔作者↔年份；抓錯配 | 只查 OpenAlex／arXiv；副標題偽陰性；年份差不標記；不核日期／版本／學段／內容 |
| Research Desk 雲端版（`reference-lookup-hosted`） | 連得上但 `lookup_reference` 回 **OpenAlex HTTP 429** | — | 暫不用 | 限流；本機版可替代 |
| paper-search（OpenAlex API） | 可用（HTTP 200；proxy 帶 key） | 每查詢 0.6–1.3 s | P0 補漏：按期刊 source ID＋日期定向查詢、DOI 去重 | 外掛腳本無 filter，需直呼 API；萬用字元需 `.exact` 欄位；Elsevier（J01）大量缺摘要；`publication_date` 不是首發日；不是出版社全量 |
| Crossref API | 可用 | 22 筆共約 15 s（含 OpenAlex） | 補副標題、卷期日、確認 DOI 歸屬 | 這些 Elsevier／Springer DOI 無 `published-online` |
| arXiv API／abs 頁 | 可用 | <1 s | 首發日佐證（Submission history） | submission ≠ announce |
| alphaXiv | 可用 | 未計 | 預印本**發現**（日期過濾） | 內容工具是 AI 摘要、無版本／日期；不能當證據 |
| SciSpace、LR-AI、Citation Needed | 本次未試 | — | — | 本次範圍外；LR-AI 依賴 Semantic Scholar，先前曾 429 |
| Exa、Liner、Wiley Scholar Gateway | **本 session 不可用**：顯示需要 OAuth 授權（非互動 session 無法授權） | — | — | 需到 claude.ai connector 設定授權；之前 session 記錄為 proxy 403 |
| ScienceDirect／Springer 出版社頁 | **不可讀**（403／303） | — | — | 新入庫 16 筆因此停在 `discovered_unverified` |

## 仍未解

1. 16 筆新紀錄的出版社頁（Available online 日、作者版本、學段細節）未核；升 `bibliographic_checked` 前需可讀的出版社或作者頁。
2. J01 缺摘要造成的漏查無法由 OpenAlex 補足；J01／J02／J03 仍非完整覆蓋（只是 `items_screened`／`partial`）。
3. 讀摘要階段排除 6 筆，其中 2 筆其實是因無摘要、學段不明而暫不入庫（`compedu.2025.105492`、`.105536`），待讀出版社頁再判。
4. 雲端 Research Desk 429、Exa／Liner／Wiley 需授權。
