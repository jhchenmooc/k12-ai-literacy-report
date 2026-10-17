# 登錄刊物的 HTML 貢獻契約

這份規則適用於 `publication/issues.json` 新登錄的 daily／weekly／monthly 頁面。閘門驗證靜態結構與證據綁定，不代表來源內容、翻譯或無障礙已通過人工審查。既有 legacy 刊物仍不受 claim 認證，不應重新登錄為已核准新刊。

## 正文與標題

- 恰好一個 HTML namespace 的 main，直接位於 body；main 可不帶屬性，或只用 `id="content"`、`class="content"`。
- 有文字的 p、h1–h4、li、blockquote、figcaption、td、th 必須用 `data-claim-id` 綁定已核准 claim，文字一致且每項主張只出現一次。其他正文文字不能獨立逸出綁定元素。
- main 內元素屬性只允許 `data-claim-id`、`href`、`datetime`、`colspan`、`rowspan`、`scope`；另有限定用途：p 的 `data-claim-tags`／`data-claim-kind`（每日短訊）、與 `data-claim-kind` 同用的 `data-kind`，td 的 `data-kind`（policy／research／background）、tr 的 `id="item-N"`（分段週報，含 item-bN／tN／cN）、h2／section 的 `data-region`（intl／tw）。2026-10-18 起的每日頁與含臺灣項目的每日頁分「國際」「臺灣」兩段，整頁須等於 renderer 輸出。`title` tooltip 禁止，即使文字與正文相同也不例外。
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
- 未帶 `weekly_section` 的週報 `<main>` 內只有逐則 claim 段落。任一 claim 帶 `weekly_section` 的週報為分段週報：`<main>` 由 renderer 依 claims 產生（本週導讀／本週精選／本週其他短訊／背景補充、表頭、類型與來源類型、首次公開、標籤、中文譯名、依據／相關編號、本期概況、上一期／下一期），閘門重產整頁逐節點比對（同月報），規則見主控 SOP「週報版型」與「週報增補」。
- 月報 `<main>` 分為四區：政策動態、研究動態、本刊追蹤學者本月新作、學者觀點動向。分區標題、段首說明、「本刊分析」「依據來源」小標與「本期無合格項目。」是 renderer 內的固定文字（`MONTHLY_SECTIONS`），修改須走程式審查。閘門以 claims 重新產生整頁、連 `<main>` 內一起逐節點比對，只有在整頁相符時才承認這些固定文字；最小頁面不適用。
- 月報每則 claim 必須有 `section`（`policy`、`research`、`scholars`、`trends`）；`scholars` 須有 `research_group`。趨勢歸納寫成 `assertion_type: "editorial_analysis"`、`claim_class: "descriptive"` 的 claim，只能放 `trends`，並以 `supporting_claim_ids` 列出同期至少兩則其他非歸納 claim，且來自至少兩個不同 `research_group`。閘門只檢查結構，不判斷趨勢是否成立。
- 研習、座談、課程等活動公告只進每日短訊與週報，不進月報（管理者 2026-10-10 決定）；月報沒有活動分區，不要把活動放進政策動態。`research_group` 預設為學者代碼，見 [scholar-watchlist.md](scholar-watchlist.md) 第 0 節。
- 期別不合法的頁面仍只能使用 main-only body。不要用 main 包住整個網站版面，也不要解除正文外的檢查。

## 驗證與提交

使用 Node 22，先 `npm ci --ignore-scripts --no-audit --no-fund`，再依 [local-validation.md](local-validation.md) 執行現行的測試與驗證命令（與 CI 的 verify 工作相同；趨勢語料的離線 Python 測試見 `research/trend-corpus/README.md`「重算」）。`research/audits/2026-10-10/verify-review.cjs` 是 2026-10-10 稽核的封存回放工具，會比對當時固定的資料基準，只能在稽核合併當時的 commit 回放，例如 `git worktree add <暫存目錄> 6cd79e3aa10cd13530181cbabb53a235a56c8e08` 後在該目錄安裝套件並執行（2026-10-12 已確認可通過；背景見 [audits/2026-10-10/README.md](audits/2026-10-10/README.md)）；資料更新後的 main 上執行會失敗，不作為現行驗證。使用隔離的合成 fixture 重現反例，不修改原始來源、候選決策或 legacy 刊物。建立 PR 後仍須等遠端 CI 通過；本機通過不等同遠端 CI、部署或來源真實性已驗證。
