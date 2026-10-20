# 登錄刊物的 HTML 貢獻契約

這份規則適用於 `publication/issues.json` 新登錄的 daily／weekly／monthly 頁面。閘門驗證靜態結構與證據綁定，不代表來源內容、翻譯或無障礙已通過人工審查。既有 legacy 刊物仍不受 claim 認證，不應重新登錄為已核准新刊。

## 正文與標題

- 恰好一個 HTML namespace 的 main，直接位於 body；main 可不帶屬性，或只用 `id="content"`、`class="content"`。
- 有文字的 p、h1–h4、li、blockquote、figcaption、td、th 必須用 `data-claim-id` 綁定已核准 claim，文字一致且每項主張只出現一次。其他正文文字不能獨立逸出綁定元素。
- main 內元素屬性只允許 `data-claim-id`、`href`、`datetime`、`colspan`、`rowspan`、`scope`；另有限定用途：p 的 `data-claim-tags`／`data-claim-kind`（每日短訊）、與 `data-claim-kind` 同用的 `data-kind`，td 的 `data-kind`（policy／research／background／tw）、section 的 `data-part="overview"`（週報導讀）、tr 的 `id="item-N"`（分段週報，含 item-bN／tN／cN）、h2／section 的 `data-region`（intl／tw）。2026-10-18 起的每日頁與含臺灣項目的每日頁分「國際」「臺灣」兩段，整頁須等於 renderer 輸出。`title` tooltip 禁止，即使文字與正文相同也不例外。
- 最小頁面的 body 只能包含 main 和格式空白。head 可省略 title；若提供，必須是由路徑產生的固定中性標題，例如 `週報 2026-10-09_10-15｜K-12 AI 素養國際動態`、`月報 2026-10｜K-12 AI 素養國際動態`、`每日短訊 2026-10-10｜K-12 AI 素養國際動態`。
- 日報完整頁面由 `renderDailyEdition` 產生；正文外 DOM 必須符合 renderer 的固定版面，包括標題、日期、警語、導覽、頁尾與 stylesheet 雜湊。CSS 修改後應重跑 `node research/render-site.js --write` 並檢查差異。

## 保守限制與合法語法誤拒

一般 HTML 合法不代表此發布契約支援。body 註解、`rel="noopener"`、`span lang="en"`、`html dir="rtl"`、mailto／tel 連結、任意 class／id、style、hidden、inert、aria-hidden、slot、SVG／MathML 和宣告式 shadow DOM 都會被拒絕。現有 renderer 不使用這些語法；若新增需求，應先修訂契約及合法／攻擊控制組，不能直接豁免整頁。

登錄頁面禁止 inline stylesheet；stylesheet 只接受 `../../assets/design-system.css` 或 `../../assets/site.css`（可帶 renderer 的十位十六進位 `?v=`）。共用 CSS 與 renderer 是需程式碼審查的信任邊界，閘門不分析任意 CSS 的視覺效果。favicon 可省略；使用時只接受本站外部檔案 `../../assets/favicon.svg`，不能指向第三方網址、其他路徑或加 query。inline SVG 不可使用。HTTP／HTTPS 原始來源連結仍須通過 URL 安全檢查。

檔案必須儲存為 UTF-8。meta charset 可以不宣告，或宣告 `utf-8`（大小寫不限）；空值與其他編碼拒絕。舊式 `http-equiv="Content-Type"` 若使用，只接受 `text/html; charset=utf-8`，避免依靠部署 HTTP 標頭才能排除編碼差異。此規則不重新認證 legacy 頁面。

最小頁面的 meta 只接受：單一 `charset` 屬性；`name="viewport"` 加固定 `content="width=device-width,initial-scale=1"`；`name="description"` 加與中性期別 title 完全相同的 content；以及上述僅指定 UTF-8 的舊式 Content-Type。都可省略，但不能混入其他屬性。禁止 `property`、Open Graph／Twitter 卡文字及其他未支援 meta。完整日報的 description 仍依固定 renderer shell 核對，不使用最小頁面規則。

## 週／月報頁面產生方式

週／月報已有各自的 renderer（`research/render-site.js` 的 `renderWeeklyEdition`、`renderMonthlyEdition`）。登錄在 `publication/issues.json`、期別合法的週／月報頁面，一律由 `node research/render-site.js --write` 依 claims JSON 產生，不手寫 HTML：

- 期別格式：週報 `weekly/YYYY-MM-DD_MM-DD/`（含首尾 1–10 天，可跨年），月報 `monthly/YYYY-MM/`。
- 正文外（頁首、導覽、說明框、頁尾、跳至正文連結）固定，只隨期別變動；出版閘門以同一 renderer 產生的空白外框逐節點比對，任何正文外改動都會被擋。
- 未帶 `weekly_section` 的週報 `<main>` 內只有逐則 claim 段落。任一 claim 帶 `weekly_section` 的週報為分段週報：`<main>` 由 renderer 依 claims 產生（本週導讀／本週精選／本週其他短訊／背景補充、表頭、類型與來源類型、首次公開、標籤、中文譯名、依據／相關編號、本期概況、上一期／下一期，以及臺灣區：分隔線、臺灣標題與說明、對照說明／臺灣本週動態／臺灣對照、「臺 n」「對照 n」編號、「本期國際項目中以臺灣為樣本者」、未查臺灣來源固定說明），閘門重產整頁逐節點比對（同月報）；`issues.json` 的 `revised_on` 或 `taiwan_not_searched` 也觸發整頁比對，規則見主控 SOP「週報版型」與「週報增補」。
- 舊版月報（2026 年 9 月以前的期別，未帶 `indexed_weeklies`）`<main>` 分為四區：政策動態、研究動態、本刊追蹤學者本月新作、學者觀點動向。分區標題、段首說明、「本刊分析」「依據來源」小標與「本期無合格項目。」是 renderer 內的固定文字（`MONTHLY_SECTIONS`），修改須走程式審查。閘門以 claims 重新產生整頁、連 `<main>` 內一起逐節點比對，只有在整頁相符時才承認這些固定文字；最小頁面不適用。
- 月報每則 claim 必須有 `section`（`policy`、`research`、`scholars`、`trends`）；`scholars` 須有 `research_group`。趨勢歸納寫成 `assertion_type: "editorial_analysis"`、`claim_class: "descriptive"` 的 claim，只能放 `trends`，並以 `supporting_claim_ids` 列出同期至少兩則其他非歸納 claim，且來自至少兩個不同 `research_group`。閘門只檢查結構，不判斷趨勢是否成立。
- **分段月報（2026 年 10 月刊起必用；管理者 2026-10-17，方案見 [drafts/2026-10-17-monthly-redesign-plan.md](drafts/2026-10-17-monthly-redesign-plan.md)）**：`issues.json` 月報條目帶 `indexed_weeklies`（凍結出刊當下已登記、要列入「一覽」的週報期別）與 `indexed_through`（YYYY-MM-DD，不早於期末；一覽只列這天以前的每日短訊）時，`<main>` 由 `monthlyMainSectioned` 產生：本期目錄；國際（本月一句話 `overview_line`、本月導讀 `overview`、政策與官方文件 `policy`、研究 `research`、重要學者本月新作 `scholars`、學者觀點動向 `trends`、背景資料 `background`）；分隔線後臺灣（並列重點 `tw_note`、對應的臺灣中央文件 `tw_compare`、臺灣本月動態一覽〔程式產生〕、臺灣研究 `tw_research`）；本月整理（概況與本月週報與每日短訊一覽，皆程式產生）；上一期／下一期與引用本期。閘門規則：
  - 分段月報與 2026-10 以後的月報不得用最小頁面；期別須為合法 YYYY-MM。
  - 期別為日曆月（2026-10 為過渡期 9/30–10/31）；`policy`、`research`、`tw_research` 首次公開在期內，`scholars` 的 `publication_date`（正式刊出）在期內，`background` 早於期首，`tw_compare` 不晚於期末，`trends` 依據在期末前三個月內。
  - 原文僅標示年月者：`date_precision: "month"`、`first_disclosed_on` 等於 `publication_date` 為 `YYYY-MM`（本月或上月）、內文含「說明：」；只限 `policy`、`research`、`tw_research`、`tw_compare`。
  - `policy`、`research`、`tw_research`、`scholars` 不得與 `indexed_through` 以前的每日短訊、所列週報或較早的月報同一來源（比對正規化網址〔不分 www.、尾斜線、主機大小寫〕、證據網址與 DOI；`doi` 欄可寫 `10.xxxx/…` 或 doi.org 網址）；之後刊出的每日短訊、週報精選、其他短訊、臺灣本週動態也不得重複月報已收的項目（閘門擋在後刊者）。
  - 研究加學者新作中，非中小學（師培、大學、成人）則數 ≤ max(2, ⌊合計 ÷ 3⌋)；學者新作須帶 `research_group` 與 `scholar_id`（學者代碼），每研究群至多 4 則、每位學者至多 2 則（不分大小寫與前後空白）。選填 `has_resources: true` 顯示「附可下載資源」、`doi` 顯示 DOI。
  - 導讀 3–5 句、每句 ≤150 字、每句至少 2 則不同來源依據（本期項目或一覽項目）、不談臺灣；本月一句話 ≤60 字；對照說明至多 2 句並同時引用國際與臺灣項目；三者與趨勢都以「（編輯歸納，AI 整理，未經真人審閱。）」結尾，其餘項目以「（AI 輔助整理，未經真人逐則審稿；請參閱原文。）」（或「AI 輔助摘要」、臺灣文件可加「臺灣對照，非本月新訊；」）結尾，且內文須包含 `source_title`（該處成為原文連結）。
  - 趨勢至少 2 個研究群，其中至少一則為 k12 同儕審查研究；臺灣研究對象限 k12 與 other_stakeholders，`taiwan_journals_not_searched: true` 時不得有臺灣研究；月報可帶 `revised_on`。
- 研習、座談、課程等活動公告只進每日短訊與週報，不進月報（管理者 2026-10-10 決定）；月報沒有活動分區，不要把活動放進政策動態。`research_group` 預設為學者代碼，見 [scholar-watchlist.md](scholar-watchlist.md) 第 0 節。
- 期別不合法的頁面仍只能使用 main-only body。不要用 main 包住整個網站版面，也不要解除正文外的檢查。

## 驗證與提交

使用 Node 22，先 `npm ci --ignore-scripts --no-audit --no-fund`，再依 [local-validation.md](local-validation.md) 執行現行的測試與驗證命令（與 CI 的 verify 工作相同；趨勢語料的離線 Python 測試見 `research/trend-corpus/README.md`「重算」）。`research/audits/2026-10-10/verify-review.cjs` 是 2026-10-10 稽核的封存回放工具，會比對當時固定的資料基準，只能在稽核合併當時的 commit 回放，例如 `git worktree add <暫存目錄> 6cd79e3aa10cd13530181cbabb53a235a56c8e08` 後在該目錄安裝套件並執行（2026-10-12 已確認可通過；背景見 [audits/2026-10-10/README.md](audits/2026-10-10/README.md)）；資料更新後的 main 上執行會失敗，不作為現行驗證。使用隔離的合成 fixture 重現反例，不修改原始來源、候選決策或 legacy 刊物。建立 PR 後仍須等遠端 CI 通過；本機通過不等同遠端 CI、部署或來源真實性已驗證。

## 三刊對齊（管理者 2026-10-17）

- 週報其他短訊與臺灣本週動態中帶 `weekly_source_claim`（每日短訊編號）者，頁面一行一則，`claim_text` 須與該則每日短訊相同，不在頁面重刊；官方演講等沒有每日短訊者仍以表格列全文。
- 每日頁由程式在每則下方列「已收入：週報…第 n 則、月報…一覽 n」（`data-claim-links`），並在類型標籤上加錨點 `id=<claim_id>`；閘門以登記的週報與月報重算比對。
- 每日頁可帶 `revised_on`（更正日，不早於頁面日期），頁面顯示更正說明，項目 `checked_at` 可為更正日。
- 每日類型標籤為「研究／政策・來源類型」，書目型加「（僅書目）」。
- 月報新增 `tw_policy`（臺灣本月中央文件）；年月精度只限 `policy`、`tw_policy`、`tw_research`、`tw_compare`；編輯歸納句不再要求逐句結尾揭露句（段首說明一次）。
- 每日 PR 合併前執行 `node research/check-daily-pr-scope.js origin/main`；若改到已刊週報或月報頁，不得依權限 B 自動合併。

## 三刊聯合評審（管理者 2026-10-17，D 全照建議）

- 政策項目 `source_country`（ISO 代碼如 CN、JP、GB-ENG，或 INTL）；2026-10-16 起的週報精選、其他短訊、上期補登與月報政策段必填。
- 2026-10-09 起的週報研究精選須含「。樣本：」「。設計：」「。作者所述發現：」「。限制：」，政策精選須含「。內容：」（2026-10-17 第二次聯合評審 E1b 由 10-16 往前延伸）；原文沒寫的欄位寫「原文未述」。
- 週報一行一則的項目（其他短訊、上期補登、臺灣本週動態）除文字外，`first_disclosed_on`、`source_url`、`kind`、`source_document_type` 也須與每日短訊相同。
- 週報 `weekly_section: "late"`（上期補登）：須指向每日短訊，首次公開在本期開始前 14 天內，且未出現在任何已登記週報。
- `self_reported_outcome: true`：官方新聞稿自述成效時加註，類型標籤顯示「（來源含機構自述成效，本刊未轉述；非同儕審查研究）」。
- 月報一覽的連結是每日短訊錨點與週報頁，不用週報項目編號；新增「上月補列」群組（依上一期月報的 `indexed_through`）。
- 每日短訊分支命名為 `claude/daily-YYYY-MM-DD`，CI 會檢查不改到已刊週報或月報頁。

## 第二次三刊聯合評審（管理者 2026-10-17，E 全照建議）

- 月報研究、學者新作或背景中樣本在臺灣的國際研究加 `taiwan_sample: true`（只限 kind research），臺灣區另列「以臺灣為樣本的國際研究」。
- 頁面用語一律「首次公開」；各則內文沿用閘門模板的「來源刊登日」，查核方法頁說明兩者相同。臺灣項目編號顯示為「臺灣 n」。
- 週報頁首有「本期目錄」，各段 `<section id="sec-*">`。
- 每日與月報作業回查前 7 天是否漏收仍在 7 天內的重要政策（E5a）；週報導讀從 10/23 期起改按主題事實分組（E5b）。
- **更正與改版紀錄**：已刊頁面每次更正、補登或改版（`revised_on`、`tw_backfilled_on` 或其他改動已刊內容的情形），都在 `publication/corrections.json` 加一筆（`id`、`date`、`path`、`target`、`type`、`old`、`new`、`reason`），頁面 `corrections/index.html` 由程式產生；週報與每日頁的改版說明會連過去。
- **固定連結與引用**：分段每日頁每則顯示「固定連結：#編號」（每日 claim_id 錨點，不隨週報改版變動），頁尾有「引用本日」；週報頁尾有「引用本期」，並提示引用單則用每日短訊的固定連結。
- **風險關切與政策調整**（管理者 2026-10-19，方案 F2；2026-10-16 期起）：週報 featured、briefs、late 的國際項目可加標記，欄位全有或全無：`caution_kind`（policy_change／warning／investigation／statement／risk_research）、`caution_excerpt`（8–120 字元，須逐字在該項 `evidence_path` 快照）、`caution_excerpt_zh`（中文譯文，60 字內，經第二輪對照）、`caution_locator`（以「標題」「摘要」或「首段」開頭）、`caution_confirmed_on`（管理者確認日，不早於 `checked_at`）；policy_change 另須 `caution_direction`（tighten／loosen／other），可附 `caution_prior_url`（前一版政策，https）。risk_research 只標研究項目，其餘只標非研究項目；policy_change 限正式政策、官方指引或官方新聞；臺灣項目、演講、草案不標。段落文字由程式產生，閘門比對整頁。briefs 與 late 沿用每日短訊的快照（已鎖雜湊，不可改），摘錄只能取自該快照已有的文字（快照首行含標題）；快照裡沒有合適句子時不標。每日短訊與月報項目不得帶這些欄位（月報自 11 月號另行支援）。
- **國外反思選讀**（管理者 2026-10-20，方案甲、乙；週報 2026-10-16 期起、月報 2026 年 10 月號起）：上一條的週報段落改名「國外反思選讀」（`#sec-caution`，標記欄位不變）。另可收只出現在此段的項目：週報 `weekly_section: "reflection"`（本期首次公開，至多 5 則），月報 `section: "reflection"`（當月與上月首次公開，至多 8 則；2026 年 10 月號另補 9 月回溯，至多 12 則（管理者 2026-10-20），排在「學者觀點動向」之後、「背景資料」之前；先前月報選錄過的來源不重複）；兩者同一機構至多 2 則、同一來源 1 則。欄位：`reflect_type`（commentary 專家評論／statement 團體聲明／report 報告風險段落／official 官方文件風險段落／research 風險相關研究／oversight 監管或國會報告；research 只標研究，研究只能標 research）、`reflect_excerpt_zh`（中文譯文，120 字內，經第二輪對照）、`reflect_locator`（章節、頁碼或段落，80 字內）、`reflect_confirmed_on`（管理者確認日，不早於 `checked_at`），commentary 另須 `reflect_author`（具名作者），report／official／research 原文機會與風險並陳時加 `reflect_mixed: true`（頁面加註「原文同時談機會與風險；此處只摘風險段落」）。引用的原文就是 `original_excerpt`（300 字內，須逐字在快照），其餘照一般 claim 規則（快照、雜湊、兩輪對照、A/B 範圍、對象 k12 或 other_stakeholders、`source_country`）。`claim_text` 必須等於 `render-site.js` 的 `reflectionText(c)`（由欄位組成，不得手寫評語）。`source_organization` 寫中文名並加國名（如「英國全國教育工會（NEU）」；國際組織免加）。週報中已是本期精選、其他短訊、上期補登或背景的來源，不另列為反思項目，改以標記處理（閘門會擋）。月報概況會列出本段則數。頁面類別標籤兩種項目統一（管理者 2026-10-20）：caution_kind warning 顯示「官方警示」、investigation「監管或國會調查」、statement「團體聲明」，與 reflect_type 同名；段首依類別列則數。不收業者單獨發布的文件（與工會等聯名者可收，`source_organization` 列出所有發布者）、報紙投書、個人部落格、匿名評論、社群貼文、二手新聞、學區層級措施與臺灣項目。
- **外國機構冠國名**（管理者 2026-10-17）：`source_country` 為外國的項目，內文提到該國政府機構時要寫「中國教育部」「日本文部科學省」「韓國教育課程評價院」，不寫單獨的「教育部」；閘門會擋（「來源機構：」欄已是全名，不檢查）。臺灣機構照常寫「教育部」。
- **監測範圍**：查核方法頁 `#scope` 列出每日與每週檢查的來源；**不列追蹤學者名單**（管理者 2026-10-17）。新增或停用來源時同步更新該段（`renderAbout`）。
