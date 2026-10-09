# Claude 審查後的補修與驗證

審查輸入為 [Claude 原始回覆](claude-review.txt)，針對 `c015a5c5b608c0c2622fcea11dc4a0120d67f0dd`。原始修正提交仍為 `a1b686dd64a10cd759ea195c17c4c857a46c313e`；本輪新增修正請以審查分支實際 HEAD 比較 `c015a5c`，完整差異仍由固定原始基準 `2329a91` 比較。保留舊報告作為歷史，不能把舊 S1、S2 的完成結論當成完整防護證明。

## 重新確認的阻擋問題

- P1-1／S1：正文外文字未綁定 claim，正文可被祖先、CSS 或非 HTML namespace 隱藏。22 組新增攻擊案例在舊版都通過 gate；合法每日 renderer 的正文外版面遭竄改也未被阻擋。修正前測試見 `red-tests.log`（23 個測試全部失敗，表示當時防護缺失）。
- P2-1／S2：SVG `animate`／`set` 可以動態改寫 href。離線 Edge 154.0.4258.62 重現兩種點擊使合成頁標題變為 `PWNED`，舊 gate 仍判定通過。相同探針修正版都拒絕發布。另一案例 main 的 x=-999、可見未審核標題也被新版拒絕。見 `browser-results.json`；測試全程阻擋 HTTP(S)。這證明發布閘門阻擋 fixture，並非讓惡意 HTML 本身變安全。

## 修正契約

1. main 必須唯一、屬 HTML namespace，直接位於 body。正文元素與屬性採保守白名單；正文不能使用任意 class／id、style、hidden、inert、aria-hidden、slot 或其他未支援屬性。
2. registered report 禁止 inline stylesheet；stylesheet 只接受兩個既有共享 CSS 的固定本地路徑。SVG／MathML 及 foreign namespace 在 registered 與 legacy issue 的靜態安全檢查都禁止，外部 favicon.svg 仍可使用。
3. registered report 可以是只有 main 的最小 body；若使用每日版面，正文外整份 DOM 必須與 `renderDailyEdition` 的固定 shell 相同，包括 main 自身屬性、頁首、日期、警語、導覽及頁尾。比較忽略格式空白與屬性順序，不忽略新增文字或屬性。
4. weekly／monthly 新刊目前只允許 main-only body；未來加入完整版面時，須先新增明確且受檢查的 renderer shell 契約，不得自行豁免正文外主張。既有 legacy 的 inline CSS 保持可用，但仍明確不受 claim 認證。
5. 合法每日 renderer、合法共享 CSS、既有最小 weekly／monthly 正文及 legacy CSS 都有正例控制；shell 竄改、祖先隱藏、正文屬性、SVG／MathML 有負例。

## 本機驗證與時間邊界

- Windows Node 22.23.3：portable verifier 的 command-0 全套 **283/283**、0 skipped，另七個 CLI 通過。
- Windows Node 24.16.0：全套 **283/283**、0 skipped。
- portable verifier：原 63 份歷史佐證雜湊一致；27 個來源／CSV／工作表／publication／既有刊物與原始基準逐位元組相同；22 個公開產物及 434 個本機連結／fragment 通過。
- 此處封存的是提交前 working tree 的檢查；JSON 的 reviewedHead 仍是當時 c015a5c，不能誤稱該舊提交包含補修。`working-tree-verification.json` 額外標明執行狀態。取得最新 HEAD 後，須自行重新執行 portable verifier。
- 瀏覽器探針腳本留在本機 scratchpad，結果 JSON 已封存。程式反例與控制組在 `research/validate-publication.test.js`，可跨平台重跑，無需瀏覽器。

## 保留的限制與非阻擋政策

共享 repository CSS 及 renderer 是需要程式審查的信任邊界；gate 不分析 CSS 視覺效果，也不能證明來源真實性、翻譯正確或無障礙。已知 shared CSS 不能被視為允許未來任意修改而免審的資產。main-only 頁面的 title／meta 屬文件中繼資料，未被認證為來源主張。

Claude 的其他非阻擋事項本輪不擴張成新功能：claims CLI 對 exclude／pending／缺少決策回傳非零為保守決策契約；mailto／tel 目前拒絕，沒有現有用例；URL 路徑與空 query 維持保守區分；feedback offset pagination 無 snapshot 保證，刪除／轉移造成的漏項仍是限制；更早未解決修正對不符合資格的候選不一定顯示；中文診斷缺少 card id 的錯誤訊息仍可改善。AERA 32 個來源僅在既有 p0 資料，並未因補修而匯入、遺失或升級為 publish。

未執行修正提交的遠端 CI、真實 API POST、Pages 部署、screen reader、斷電／磁碟滿模擬或來源人工查證。只更新獨立審查分支；不建立 PR、不合併 main、不部署、不發布 Issue。
