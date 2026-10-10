# 論文搜尋與核對工具：調用方式、限制與平行化指南

> **給所有會操作本 repo 的 AI 助理（Claude、ChatGPT 或其他）與真人編輯。** 依 2026-10-09 兩輪實測寫成：工具試跑見 [tool-trial-2026-10-09/report.md](tool-trial-2026-10-09/report.md)，三組平行搜尋見 [p0-tool-wave-2026-10-09/](p0-tool-wave-2026-10-09/)。
>
> **工具只是人工搜尋輔助。** 不新增功能、爬蟲、資料庫或排程；結果一律回到 [P0 平行搜尋作業](p0-parallel-search-workflow.md)、[G1–G6](evidence-safety-gates.md)、[N1–N8](news-policy-verification.md) 與 [知識庫規格](knowledge-base/schema.md)。同一模型（或同一家 AI）的多個子任務彼此同意，**不算獨立真人審閱**。工具環境會變，開工前先用一個小請求確認可用，不要只照抄本文件的結論。

## 1. 先分清你在哪個環境

| 環境 | 能用什麼 | 注意 |
|---|---|---|
| Claude Code 雲端 session（本文件實測環境） | Bash／curl、MCP 工具（需先用 ToolSearch 載入）、Agent 子代理平行、GitHub MCP（**沒有 `gh` CLI**） | OpenAlex 的 API key 由網路 proxy 自動帶上，**不要尋找、印出或寫入 key**；環境裡沒有 key 變數 |
| ChatGPT（含程式碼執行／瀏覽）或其他 AI | 通常只有 HTTP 請求或瀏覽；沒有本文的 MCP 工具 | 用第 3 節的「通用 HTTP 呼叫」；OpenAlex 沒 key 也能用（速率較低；是否加 `mailto=` 見第 3 節說明）；若沒有網路，照實說明，**不得用記憶或模擬結果頂替搜尋** |
| 真人 | 瀏覽器可讀出版社頁（AI 常被擋） | 出版社頁的 Available online 日期與學段細節，最終多半需要真人或可讀頁面確認 |

## 2. 工具總表（2026-10-09 實測）

| 工具 | 狀態 | 用在哪一步 | 一句話限制 |
|---|---|---|---|
| OpenAlex API | 可用 | P0 逐源搜尋、DOI 去重 | 日期不是首發日；Elsevier 等常缺摘要；新 DOI 當天未收錄 |
| Crossref API | 可用 | G1 書目、卷期／online 日、新登記 DOI | 登記日 ≠ 上線日；Elsevier 多無 published-online |
| arXiv API／abs 頁 | 可用 | 預印本首發日佐證 | submission ≠ announce；當天預印本要隔天才查得到 |
| DataCite／會議官網目錄 | 可用（EDM） | 不在 Crossref 的會議（Zenodo DOI） | 需讀官方目錄頁再自行比對 |
| AAAI OJS 期次頁 | 可用 | 區分 EAAI 與 AAAI 主會議 | 需看分節標題 |
| Research Desk `verify_reference`／`verify_bibtex`（Claude MCP，本機版） | 可用 | G1 書目快速對帳 | 只比 DOI／題名／作者／年；見 3.5 |
| Research Desk 雲端版 | 連得上但 OpenAlex 429 | 暫不用 | 用本機版 |
| alphaXiv（Claude MCP） | 可用 | 預印本**發現** | 內容工具是 AI 摘要，不能當證據 |
| paper-search 外掛（Claude） | 可用但功能少 | 一般關鍵詞查詢 | 腳本不能加來源／日期 filter，直接呼叫 OpenAlex API 較好 |
| Exa、Liner、Wiley Scholar Gateway（Claude 連接器） | **不可用** | — | 需在 claude.ai connector 設定做 OAuth 授權；非互動 session 無法授權 |
| Semantic Scholar | 常 429 | — | LR-AI 外掛依賴它，可能受影響；2026-10-10 學者月檢索實測：DOI 查詢多回 404，題名搜尋 5 次全部 429 |
| 出版社頁：ScienceDirect／Elsevier、Taylor & Francis、Wiley、SAGE、MDPI、Emerald、Routledge、ResearchGate | **AI 多半讀不到** | — | 403、只回轉址腳本（2026-10-10 學者月檢索實測） |
| 出版社頁：Springer（含 BMC）、Frontiers、小型 OJS（如 RPTEL） | 2026-10-10 實測可讀；Springer 時好時壞（同日稍晚回 JS「Client Challenge」頁） | G1 書目、首發日 | 讀頁面 `citation_online_date`、`citation_publication_date`、`citation_volume`；Frontiers 的 `citation_online_date` 是接受日，首發日看 Published（見 3.6）；Springer 曾回 303／JS 驗證頁（PR #115），讀不到時照 3.6 處理 |
| AERA Online Paper Repository（`research.allacademic.com/meta/p<ID>_index.html`） | 2026-10-10 實測可讀 | AERA 會議論文官方摘要；部分有作者上傳全文 | 只用一般 session cookie，沒有驗證頁；作者上傳全文可當學段證據，須註明（管理者 2026-10-10） |
| `research/scholar-watch-run.js` | 可用 | 學者追蹤依作者檢索 | 由學者清單產生查詢、去重、比對知識庫與候選池、產生 `search_runs.csv` 列；不判讀 |
| SciSpace、LR-AI、Citation Needed | 未實測 | — | 使用前先小量試跑並記錄 |

## 3. 各工具的調用方式與踩過的坑

### 3.1 OpenAlex（https://api.openalex.org）

**通用 HTTP 呼叫**（任何環境）：
```
# 1) 用 ISSN 找期刊來源 ID
https://api.openalex.org/sources?filter=issn:2666-920X
# 2) 限定期刊＋日期＋布林查詢
https://api.openalex.org/works?filter=primary_location.source.id:S4210183364,from_publication_date:2025-01-01,to_publication_date:2026-10-09,title_and_abstract.search:("AI literacy" OR "AI education") AND ("K-12" OR "secondary school")&per_page=200&select=id,doi,title,publication_date,primary_location,type,authorships
# 3) 查某來源有多少篇缺摘要
...&filter=primary_location.source.id:SXXXX,has_abstract:false&per_page=1   → 看 meta.count
```
沒有 proxy 帶 key 的環境，OpenAlex 與 Crossref 不加 `mailto` 也能用（速率較低）。**未經管理者明確同意，不得在任何請求（網址參數、User-Agent、標頭）中放入管理者或任何人的電子郵件**；2026-10-09 曾有子代理在 Crossref 請求的 User-Agent 帶出管理者信箱（見 PR #115），平行子代理的提示要明寫此規則。信箱也不寫進 repo。

**已知坑**：
- **萬用字元 `*`／`?` 在 `title_and_abstract.search` 會 HTTP 400**（欄位會做詞幹處理）。改寫完整詞形，或用 `title_and_abstract.search.exact`。
- **布林運算子超過約 5 個會被 429 限流**（訊息 "Rate limit exceeded"）。拆成兩組較短查詢。
- **`from_created_date` 需付費方案**：回 429 "Plan upgrade required"。不能用它找「今天新收錄」的作品，改用 Crossref 登記日（3.2）。
- `has_abstract` 是 **filter**，放進 `select=` 會 HTTP 400。
- 偶發 HTTP 504：重跑一次；仍失敗就記 failed。
- **缺摘要**：J01 Computers & Education 範圍內 193／329 篇、J37 約 57%、J35 約 43%、J38 約 35% 無摘要；這些期刊的布林查詢實際上只比對題名。對缺摘要多的來源再加一組 `title.search`（`has_abstract:false`）補查，並在 search_runs 寫明。
- **`publication_date` 不是首發日**：可能是卷期日、未來日期（如 10-18、12-31）或 2025-01-01 這類佔位值（AIED 2025）。
- **當天新登記的 DOI 尚未收錄**（逐 DOI 查回 404），隔幾天再查。
- **會議**：AIED 沒有自己的來源，併在 Springer LNCS 書系（S106296714）且幾乎無摘要；EDM 會議來源幾乎沒收錄。會議請先用 3.3 的方法定位。
- 兒童 HCI 期刊（J35 IJCCI）多用 children／youth 而不是學段詞，主查詢要補這類詞。
- **大型 OA 期刊**（J29 Frontiers in Education、J32 Discover Education、J33 HSSC，範圍內各 1,700–4,800 篇）：只用片語查詢、設細讀上限，超過者列待判；查詢涵蓋不完整要寫進 notes（B1 批，2026-10-09）。
- **缺摘要高**（B1 實測）：J20 49%、J23 54%、J24 55%、J28 55%、J34 76%、J39 56%；IEEE TLT 在 Crossref 無 `published-online`。AI & Society（J24）幾乎整本與 AI 有關，題名查詢需再用教育／學段詞過濾。
- Frontiers 的卷號對應年份（vol 10＝2025、vol 11＝2026）；issued 日可能落在下一年，`year_basis=issue_year` 依卷號年並註明。

### 3.2 Crossref（https://api.crossref.org）

```
# 單一 DOI 的完整書目（題名、副標題、作者、卷期、published-online）
https://api.crossref.org/works/10.1787/65cd27d4-en
# 某段時間新登記的 DOI＋關鍵詞（找本週新發表）
https://api.crossref.org/works?filter=from-created-date:2026-10-09,until-created-date:2026-10-09&query.bibliographic=AI literacy school&rows=40
# 某 ISSN 的期刊
https://api.crossref.org/journals/0360-1315/works?filter=from-created-date:2026-10-09
# 某本書（AIED LNCS／CCIS 各冊）的所有章節
https://api.crossref.org/works?filter=isbn:978-3-031-98414-3&rows=200
```
**已知坑**：
- `created`（登記日）**不等於**上線日：10/09 登記的 DOI，實際上線日可能是 10/08、08/05 甚至 06/30。上線日看 `published-online`，仍只是出版社 manifestation 日，不是全球最早公開。
- Elsevier（compedu／caeai）的 DOI 多半**沒有** `published-online`，只有卷期月；Springer、SAGE、T&F 通常有。
- 題名可能含 HTML 實體（`&amp;`）、JATS 標記（如 `<i>α</i>`）與**換行字元**；寫入 CSV 前要 unescape、去標記、把空白合併成單一空格，否則一筆紀錄會跨多行。**副標題放在 `subtitle` 欄位**。
- 偶爾回空內容（HTTP 200 但無 JSON）：間隔幾秒重試一次。
- 關鍵詞查詢是相關度排序，`total-results` 不是精確主題命中數；只能記「讀了前 N 筆」。
- 有一筆 WiPSCE 的出版日早於上線日，順序異常 → 照錄，不自行修正。

### 3.3 會議論文集定位（每個會議先做這一步）

| 會議 | 怎麼出現在索引裡（2026-10-09 實測） |
|---|---|
| C01 AIED | Springer 書籍章節：主論文在 LNCS、poster／late-breaking／workshop 在 CCIS；用 Crossref `filter=isbn:` 逐冊列出。2025：LNCS 6 冊（如 978-3-031-98414-3）、CCIS 978-3-031-99261-2／-99264-3／-99267-4；2026：LNCS 6 冊（如 978-3-032-29744-0）、CCIS 978-3-032-29788-4／-29791-4／-29794-5。官方摘要讀不到（JS challenge）。ISBN 清單由相關度查詢得來，可能漏卷 |
| C02 EDM | 自行出版、Zenodo DOI（10.5281/zenodo.*，DataCite，不在 Crossref）；OpenAlex 幾乎沒有。從 `educationaldatamining.org/edm2025/proceedings/`、`/edm2026/proceedings/` 目錄列舉後自行比對。workshop 另外出版，未涵蓋 |
| C21 WiPSCE | ACM，DOI `10.1145/3801749.*`，OpenAlex 來源 S7407087161 |
| C22 EAAI | AAAI Proceedings（ojs.aaai.org）：EAAI-25 在 vol 39 no 28、EAAI-26 在 vol 40 no 47–48；用期次頁分節標題區分 EAAI 與主會議／IAAI。**「Resources for Teaching AI in K-12」分軌產量最高** |
| C13 CHI | ACM。OpenAlex 主論文集 S4363607743、Extended Abstracts S7407087610；DOI 前綴 10.1145/3706598（2025 主）、3772318（2026 主）、3706599（2025 EA）、3772363（2026 EA）。Crossref `filter=isbn:` 只命中論文集本身，逐篇列舉要用 `container-title` 精確 filter。2025 卷大量無摘要 |
| C14 IDC | ACM。OpenAlex 每年一個來源：S4306418951（2025）、S7407086122（2026）；DOI 10.1145/3713043、3773077 |
| C15 FAccT | ACM。OpenAlex S4363608463；DOI 10.1145/3715275、3805689。卷名含逗號，Crossref `container-title` filter 回 HTTP 400，改用 OpenAlex |
| C16 CSCW | 主論文登在 PACM HCI（OpenAlex S4210183893，期刊型）；CSCW 期次（如 vol 9 issue 2／7）依 ACM 慣例推定，需 ACM DL 確認。Companion 2025 為 S7407086786（10.1145/3715070）；2026 Companion 截至 2026-10-09 未登記 |
| C17 AERA | Crossref 有 DOI（10.3102/<7 位數>，container「Proceedings of the 2025/2026 AERA Annual Meeting」）；OpenAlex S4363608631 幾乎無摘要、日期為佔位 YYYY-01-01；摘要可讀官方線上議程頁。**多為 session 層級 DOI，同一論文常有多個議程 DOI**；篇型含 paper／poster／roundtable |
| C18 ICALT | IEEE。2025：Crossref container 列舉 118 筆（10.1109/icalt64023.2025.*），OpenAlex S4363608377 只收 82 筆。2026 截至 2026-10-09 未登記 |
| C20 SITE Interactive | **unavailable**（2026-10-09）：OpenAlex 無此來源（SITE 年會只到 2021）、Crossref 無紀錄；LearnTechLib 對自動請求回 HTTP 202 空白，疑似機器人驗證，不得繞過 |

找不到可靠入口就記 `unavailable` 與原因，不得記零命中。

### 3.4 arXiv 與 alphaXiv

```
https://export.arxiv.org/api/query?id_list=2503.00079        → <published> 為 v1 submission
https://arxiv.org/abs/2503.00079                              → Submission history 列出各版本時間
```
- 首發日證據請引用 arXiv abs 頁的 Submission history（或 API），並說明 **submission 時戳不等於 announce／公開可讀時間**。
- 當天送件的預印本要到下一次 announce 才查得到；週報窗口內的預印本要在週內重查。
- alphaXiv（Claude MCP）`discover_papers` 可按日期過濾，抽 3 篇日期與 arXiv v1 同日，適合**發現**；`get_paper_content` 回的是 AI 生成摘要（含推測），**不能當證據**。

### 3.5 Research Desk 書目核對（Claude MCP）

- 載入：`ToolSearch select:mcp__plugin_research-desk_reference-lookup__verify_bibtex`（另有 `verify_reference`、`lookup_reference`、`search_works`）。一次最多 60 筆 BibTeX。
- 狀態意義：`verified`＝DOI、題名、第一作者、年份都對；`partial`＝沒給作者（records.csv 沒有作者欄，所以舊紀錄最多 partial）；`mismatch`＝DOI 指向別篇（負控制實測能抓到）；`not_found`；`unchecked`。
- 已知偽結果：**副標題造成 not_found**（KB-2026-0010 OECD，Crossref 證實無誤）；**年份差一年不標記**；**當天新 DOI 因 OpenAlex 未收錄而 not_found**；Zenodo 版本 DOI 可能被對到概念 DOI。
- 它只核書目，不核首發日、版本、學段或內容。OpenAlex 大量取自 Crossref，兩者一致**不算兩個獨立來源**。
- 非 Claude 環境的替代：直接比對 Crossref `works/<DOI>` 與 OpenAlex `works/doi:<DOI>` 的題名、作者、年份。

### 3.6 出版社頁

AI 直接讀取多半失敗：ScienceDirect 403、`linkinghub.elsevier.com` 只回轉址腳本、T&F 403；Wiley、SAGE、MDPI、Emerald、Routledge、ResearchGate 也讀不到（2026-10-10）。Springer 曾回 303／JS challenge；2026-10-10 學者月檢索時 Springer、Frontiers 與 RPTEL（OJS）的文章頁都可讀，但同日 B1 待判重篩時 Springer 又回 JS「Client Challenge」頁，所以 Springer 屬時好時壞，日期取自頁面 `citation_*` 標籤；可讀性會變，每次照實記錄。**不要嘗試繞過驗證頁**（之前雲端瀏覽器代理曾自行點擊驗證頁，已列為禁止）。讀不到就把紀錄留在 `discovered_unverified`、日期 unknown，交給可讀的環境或真人。

- **Frontiers 首發日以頁面「Published」或 Crossref `published-online` 為準**（管理者 2026-10-10 決定，取代同日稍早「以 `citation_online_date` 為首發日」的寫法）。`citation_online_date` 等於同頁「Accepted」接受日，不是公開日：B-AIMT（10.3389/feduc.2026.1885959）頁面為 Accepted 2026-08-31、Published 2026-09-28，Crossref 的 published-online 與 DOI 建立日都是 2026-09-28。接受日另記。有更早的預印本時以預印本為準。
- Springer（含 BMC、SpringerOpen）的 `citation_online_date` 是 First Online 日，2026-10-10 抽查 15 筆都與 Crossref `published-online` 相同。

### 3.7 官方政策來源（週報；2026-10-09 實測，由編輯 session 維護）

學術 API 幫不上政策來源。政策發現改用官方新聞列表、少數官方 API 與 WebSearch／WebFetch（Claude）；**讀不到的來源只能寫「搜尋未見」，不能寫「當天沒有發布」**。紀錄見 [drafts/2026-10-09-weekly-policy-search.md](drafts/2026-10-09-weekly-policy-search.md)。

| 來源 | curl 直接讀 | 替代方式 |
|---|---|---|
| UNESCO newsroom | captcha（**不得繞過**） | WebFetch 可讀（內容為模型轉述） |
| 美國 ED | 403 | Federal Register API 可查 ED 公報文件（網址含方括號，**curl 要加 `-g`**，否則報 bad range）：`https://www.federalregister.gov/api/v1/documents.json?conditions[agencies][]=education-department&conditions[term]=artificial+intelligence&conditions[publication_date][gte]=YYYY-MM-DD` |
| 英格蘭 DfE | 可讀 | GOV.UK Search API：`https://www.gov.uk/api/search.json?filter_organisations=department-for-education&order=-public_timestamp&count=40`（關鍵詞與時間排序同時用時篩選效果差） |
| OECD | 403 | WebSearch |
| 歐盟執委會（教育） | 2026-10-10 education.ec.europa.eu 新聞頁與文件庫頁可讀（HTTP 200）；先前曾遇 antibot 表單、列表未渲染 | 直接讀新聞頁；讀不到時用 WebSearch |
| 歐洲理事會（coe.int、rm.coe.int） | Cloudflare 403，建議全文 PDF 亦同 | 請管理者用瀏覽器開啟另存（9 月月報引文即如此核對） |
| 澳洲 Department of Education／部長新聞 | 503、HTTP/2 錯誤 | WebSearch |
| 新加坡 MOE | 2026-10-09 B-POL 實測 moe.gov.sg 可讀；新聞列表偶為轉址 JS 頁、空內容；2026-10-10 單篇頁（forum letter reply、AI in education）直接網址可讀 | WebSearch；國會答覆另查。站內搜尋依相關度排序、不能按日期，只檢視前幾筆時記為「未完整檢視」，不寫「沒有發布」（管理者 2026-10-10） |
| 加拿大 BC／Ontario | SSL 憑證錯誤（**不得停用 TLS 驗證**）／需 JS | WebSearch |
| 香港 EDB 通告 | 列表需表單／JS；**通告 PDF 可直接讀** | 香港政府新聞公報可讀 |
| 日本 MEXT、中國教育部、韓國 MOE、臺灣教育部 | 大致可讀；韓國 moe.go.kr 常 connection reset（需重試）；臺灣 `pads.moe.edu.tw`（AI 人才方舟計畫下載頁）伺服器未送中繼憑證，curl 驗證失敗（rc=60，**不得停用 TLS 驗證**），一般瀏覽器可開 | 臺灣 pads 頁請管理者以瀏覽器確認 |
| OECD 出版品全文（含 PISA 報告章節） | Cloudflare 403 | 請管理者以瀏覽器開啟另存或截圖（PISA 2025 引文即如此核對） |

- WebSearch 索引有延遲，當天新頁常未收錄；WebSearch 摘要與 WebFetch 內容都是模型轉述，**只能當線索**，日期與摘錄要回到可讀的原頁核對。
- 書目核對時的出版者頁（PR #115 實測）：ACM DL Cloudflare 403；Elsevier、Springer、SAGE、T&F、IEEE 常擋自動讀取；Springer／BMC 有 JS 驗證頁；AERA 2025 議程頁回驗證頁。讀不到者記 `unverifiable`，不以 Crossref 單獨相符代替。
- 時區：亞洲機構當天已近日終時，美洲仍在上班；當天稍後的發布要隔天重查。週報期間建議每天重查一次。
- 會議預告、活動報導、家庭宣導不是政策；更新日、活動日不是首發日（見 [首發查核表](first-disclosure-checklist-v16.md)）。

## 4. 實用流程（照做即可）

1. **P0 期刊補漏**：ISSN→OpenAlex 來源 ID → 查缺摘要比例 → 兩組布林查詢（≤5 個運算子）＋缺摘要多時加題名查詢 → 逐題名初篩 → 入選者讀摘要判學段與 AI 素養範圍 A/B/C（[準則](ai-literacy-scope-criteria.md)）→ Crossref 取書目 → `verify_bibtex`（或手動比對）→ 小寫 DOI 對主表與 `research/` 既有 DOI 去重。
2. **會議補漏**：先依 3.3 定位，再同上。
3. **本週新發表（週報）**：Crossref 登記日 filter＋關鍵詞 → 逐筆查 `published-online` → 只要上線日可能早於窗口就標「日期邊界風險」→ 預印本用 alphaXiv／arXiv，週內重查。全部只是「待查證」，要過 v1.6 首發查核才可能進週報。
4. **書目抽查**：既有紀錄整批跑 `verify_bibtex`，加一筆故意錯配的負控制確認工具在工作。

## 5. 記錄規則（每次都要）

- 每個查詢記：完整 URL／查詢字串（**不含 key**）、開始與結束 UTC、HTTP 狀態、API 回報的命中數、實際讀取筆數。
- **失敗不記零命中**；失敗查詢寫進稽核檔，不寫進 `search_runs.csv`（該表只記實際完成且可追溯的搜尋）。
- `first_published_on` 只在讀到可靠首發證據時填；否則留空／unknown，`year_basis=issue_year` 用卷期年。**不能用發現日、登記日或 OpenAlex 日期冒充首發日。**
- 學段、國別只依摘要／原文明寫的；不明就 unknown 或 pending。
- 每篇記 `ai_lit_class`（A／B／C／unknown）、`ai_lit_dims`（教育部框架代碼）、`ai_lit_note`（對應內涵的一句理由），依 [AI 素養範圍判斷準則](ai-literacy-scope-criteria.md)；疑問先查 `research/reference/` 的框架全文。
- 成效、效果量、前後測一律標「高風險，待 G2–G4」，不寫成成效主張。
- 不把摘要全文、未授權全文、個資或金鑰寫進 repo。
- 新紀錄的 `verification_status`：未讀出版社頁 → `discovered_unverified`（管理者 2026-10-09 決定，Crossref＋OpenAlex 一致不升級）。

## 6. 什麼時候平行化、怎麼做

### 6.1 適合平行

- **來源互不重疊的搜尋**：例如 A 組本週新發表、B 組一批期刊、C 組一批會議。每組只負責自己的來源 ID。
- **只寫各自暫存檔**的工作（`group-x.{json,md}`）。
- 整批書目核對可分組同時跑。

### 6.2 不要平行

- **寫正式檔**：`knowledge-base/data/*.csv`、indexes、drafts、`publication/`、`SESSION-HANDOFF.md`、網站檔案只能由**單一整合者**寫。
- 需要互相依賴結果的步驟（例如先定位會議入口再查詢）。
- 同一來源同時給兩組：會造成重複與互相覆蓋。
- 要「獨立核查」高風險主張時：同一模型的平行子任務不算獨立。

### 6.3 實測數據（2026-10-09，Claude Code 子代理，背景執行）

| 組 | 範圍 | 牆鐘 | 工具呼叫 | 子代理 token |
|---|---|---|---|---|
| A 本週新發表 | Crossref／OpenAlex／alphaXiv／arXiv | 約 6.4 分 | 34 | 約 127k |
| B 5 本核心期刊 | OpenAlex＋Crossref＋verify_bibtex | 約 5.0 分 | 21 | 約 107k |
| C 4 個核心會議 | 定位＋查詢＋逐冊列舉 | 約 17.4 分 | 63 | 約 241k |

三組同時開始，總牆鐘由最慢的 C 組決定（約 18 分）。**沒有實測串行版本，不宣稱加速倍數。** 會議組因要先定位、逐冊列舉，耗時約為期刊組的 3 倍；下次可把會議拆得更細或單獨一批。

### 6.4 平行作業契約（照 [p0-parallel-search-workflow.md](p0-parallel-search-workflow.md)）

1. 開工前：確認最新 main、open PR、最新 verify／deploy；記錄正式三表、`issues.json`、本期候選 JSON 的 SHA-256（`sha256sum`）。
2. 每組提示要寫清楚：唯一來源範圍、唯一可寫檔、禁止寫的檔、查詢規則（第 3、5 節）、細讀上限、輸出 JSON 結構。
3. 完成後：整合者核對雜湊未變 → 跨組與對主表 DOI 去重 → 抽查幾筆 DOI 直接查 Crossref（不只信子代理）→ 決定入庫 → 重建索引 → 跑全部測試 → 單一 PR。
4. 子代理回報是模型輸出，**不是使用者核准**；入庫範圍與狀態等級由管理者決定。

### 6.5 Git／PR 注意事項（這次踩過）

- **還沒合併的 PR 分支，不要再把新的暫存檔推上去**，會改動等待審閱的 PR。先把暫存檔放在 repo 外（例如 scratchpad），等 PR 合併後從最新 main 開新分支再提交。
- Claude 雲端 session 有 stop hook：工作目錄有未追蹤檔就會要求提交。若此時不該提交，就把檔案移出 repo，並告知使用者原因。
- 子代理會看到別人移動檔案（例如基準雜湊檔被移走）；整合者要在回報中說明，避免誤判為遺失。
- **紀錄 ID 永不重用**：撤回或移除紀錄後，新紀錄要從「移除前」的最大號續編。
- 新增紀錄會讓測試裡「期刊清單精確相等」的斷言失敗。先例（#95、5edf5bc、本次）是改成「既有紀錄仍在」，其他斷言不動；**不要為了過 CI 刪測試或改出版閘門**。
- 合併後要分別確認 main 的 verify 與 deploy，再把 Run 連結寫進交接檔；PR 的 CI 不能代替 main。
- Windows CRLF 可能讓索引比對失敗，先確認 LF。

## 7. 開工檢查清單

- [ ] 讀 `SESSION-HANDOFF.md` 最新段落、本文件與 [AI 素養範圍判斷準則](ai-literacy-scope-criteria.md)
- [ ] 查最新 main、open PR、Actions；記錄正式檔雜湊
- [ ] 用一個小請求確認 OpenAlex／Crossref／arXiv 可連；Claude 環境另確認 MCP 工具可載入
- [ ] 決定是否平行：來源能否切成互不重疊的組？誰是唯一整合者？
- [ ] 每個查詢照第 5 節記錄；失敗照實寫
- [ ] 入庫狀態不超過實際完成的核對；九筆候選維持 hold、`issues.json` 不動
- [ ] 跑 `node --test research/*.test.js` 與 CI 的 verify 內容，全過才提交；開 PR 前先回報管理者
