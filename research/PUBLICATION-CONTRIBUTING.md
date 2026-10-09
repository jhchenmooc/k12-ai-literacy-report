# 登錄刊物的 HTML 貢獻契約

這份規則適用於 `publication/issues.json` 新登錄的 daily／weekly／monthly 頁面。閘門驗證靜態結構與證據綁定，不代表來源內容、翻譯或無障礙已通過人工審查。既有 legacy 刊物仍不受 claim 認證，不應重新登錄為已核准新刊。

## 正文與標題

- 恰好一個 HTML namespace 的 main，直接位於 body；main 可不帶屬性，或只用 `id="content"`、`class="content"`。
- 有文字的 p、h1–h4、li、blockquote、figcaption、td、th 必須用 `data-claim-id` 綁定已核准 claim，文字一致且每項主張只出現一次。其他正文文字不能獨立逸出綁定元素。
- main 內元素屬性只允許 `data-claim-id`、`href`、`datetime`、`colspan`、`rowspan`、`scope`。`title` tooltip 禁止，即使文字與正文相同也不例外。
- 最小頁面的 body 只能包含 main 和格式空白。head 可省略 title；若提供，必須是由路徑產生的固定中性標題，例如 `週報 2026-10-09_10-15｜K-12 AI 素養國際動態`、`月報 2026-10｜K-12 AI 素養國際動態`、`每日短訊 2026-10-10｜K-12 AI 素養國際動態`。
- 日報完整頁面由 `renderDailyEdition` 產生；正文外 DOM 必須符合 renderer 的固定版面，包括標題、日期、警語、導覽、頁尾與 stylesheet 雜湊。CSS 修改後應重跑 `node research/render-site.js --write` 並檢查差異。

## 保守限制與合法語法誤拒

一般 HTML 合法不代表此發布契約支援。body 註解、`rel="noopener"`、`span lang="en"`、`html dir="rtl"`、mailto／tel 連結、任意 class／id、style、hidden、inert、aria-hidden、slot、SVG／MathML 和宣告式 shadow DOM 都會被拒絕。現有 renderer 不使用這些語法；若新增需求，應先修訂契約及合法／攻擊控制組，不能直接豁免整頁。

登錄頁面禁止 inline stylesheet；stylesheet 只接受 `../../assets/design-system.css` 或 `../../assets/site.css`（可帶 renderer 的十位十六進位 `?v=`）。共用 CSS 與 renderer 是需程式碼審查的信任邊界，閘門不分析任意 CSS 的視覺效果。外部 favicon.svg 可以使用，inline SVG 不可使用。HTTP／HTTPS 原始來源連結仍須通過 URL 安全檢查。

檔案必須儲存為 UTF-8。meta charset 可以不宣告，或宣告 `utf-8`（大小寫不限）；空值與其他編碼拒絕。舊式 `http-equiv="Content-Type"` 若使用，只接受 `text/html; charset=utf-8`，避免依靠部署 HTTP 標頭才能排除編碼差異。此規則不重新認證 legacy 頁面。

最小頁面的 meta 只接受：單一 `charset` 屬性；`name="viewport"` 加固定 `content="width=device-width,initial-scale=1"`；`name="description"` 加與中性期別 title 完全相同的 content；以及上述僅指定 UTF-8 的舊式 Content-Type。都可省略，但不能混入其他屬性。禁止 `property`、Open Graph／Twitter 卡文字及其他未支援 meta。完整日報的 description 仍依固定 renderer shell 核對，不使用最小頁面規則。

## 週／月報首次正式出刊前

目前新登錄週／月報只能使用 main-only body，不能自行加入頁首、導覽、頁尾或跳至正文連結。這是暫時且明確的限制：**第一份正式週／月報使用網站完整版面前，必須新增各自 renderer 與正文外固定版面比對**，並驗證 claim 綁定、shell 注入、合法頁面、鍵盤導覽及生成一致性。不要用 main 包住整個網站版面，也不要解除正文外的檢查。

## 驗證與提交

使用 Node 22，先 `npm ci --ignore-scripts --no-audit --no-fund`，再執行 `node research/audits/2026-10-10/verify-review.cjs`。使用隔離的合成 fixture 重現反例，不修改原始來源、候選決策或 legacy 刊物。建立 PR 後仍須等遠端 CI 通過；本機通過不等同遠端 CI、部署或來源真實性已驗證。
