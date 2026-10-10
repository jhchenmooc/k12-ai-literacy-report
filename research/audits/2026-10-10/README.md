# Claude 獨立審查交接包

**PR 整合狀態**：已整合 main 的 B1 入庫提交 071d288，解決生成頁面衝突並重新驗證。原 27 份保全資料中，25 份保持原始基準，2 份 CSV 精確符合固定 upstream 的合法更新；原歷史紀錄未改寫。見 [整合報告](integration/REPORT.md) 與 [固定資料基準](integration/data-baseline.json)。Node 22／24 全套仍為 292/292，公開產物 22 份、本機參照 436 個。已獲授權建立 PR 並於遠端 CI 通過後合併；下方各輪「main 待整合／未建 PR」描述的是歷史階段。

**最新 favicon 補修**：Claude 對 56621b8 確認 metadata 已修正且無回歸，另提出第三方 favicon 的可選 P3。本輪已限定登錄刊物使用本站固定圖示，新增兩個測試；Windows Node 22／24 各 292/292 通過。見 [favicon 補修報告](favicon-followup/REPORT.md)，以下各輪紀錄仍保留為歷史。main B1 更新仍待整合，遠端 CI 尚待 PR。

**最新 metadata 補修**：Claude 對 6360e21 未發現阻擋問題，另指出搜尋／分享 metadata 的 P3 缺口。本輪收緊最小頁面完整 meta 白名單，新增兩個測試；Windows Node 22／24 各 290/290 通過。見 [metadata 補修報告](metadata-followup/REPORT.md)，以實際最新 HEAD 為審查目標。原始基準未變，main 的 B1 入庫更新尚未整合，遠端 CI 尚待 PR。

此分支用於外部獨立程式碼審查，已包含原 repository 的資料、程式修正及稽核佐證。沒有因建立此分支而修改 main、建立正式刊物、改變候選決策或部署 Pages。

**Claude 審查後更新**：原 S1／S2 仍有繞過，已獨立重現並補修。最新說明見 [補修報告](claude-followup/REPORT.md) 與 [原始外部回覆](claude-followup/claude-review.txt)。新增 25 個測試，Windows Node 22／24 各 283/283 通過；以分支實際 HEAD 檢查本輪修正，不要只檢查下表的第一輪程式提交。27 個保全資料檔案仍不變。

**最新複審與 P3 收尾**：Claude 對 e37ec61 確認 P1-1／P2-1 已修正，無阻擋合併問題。本輪再處理 tooltip、最小頁面標題與編碼宣告，新增 [貢獻契約](../../PUBLICATION-CONTRIBUTING.md) 和 [P3 報告](p3-followup/REPORT.md)。Windows Node 22／24 各 288/288 通過。週／月報完整 renderer 仍是首次正式出刊前待辦；遠端 CI 尚未跑過修正提交。

| 項目 | 固定值 |
|---|---|
| Repository | `jhchenmooc/k12-ai-literacy-report` |
| 審查分支 | `review/claude-audit-20261010` |
| 原始稽核基準 | `2329a91d1e5af66da00848fa72daca2c230edb47` |
| 程式修正提交 | `a1b686dd64a10cd759ea195c17c4c857a46c313e` |
| 審查範圍 | 基準到上述程式提交的 40 個檔案差異；本包與入口連結是其後的文件提交 |
| 最新本機測試 | Windows：Node 22.23.3 與 24.16.0 各 292/292，0 skipped；封存時為 favicon 補修 working tree |
| 資料保全 | 25 份與原始基準不變；2 份 CSV 精確符合 main B1 固定 upstream；原始 27 份歷史紀錄保留 |

## 閱讀順序

1. [原始發現與 14 項問題](baseline/REPORT.md)、[覆蓋與限制](baseline/COVERAGE.md)、[原修正優先順序](baseline/FIX-ORDER.md)。
2. [修正與第二輪自檢報告](fixes/REPORT.md)，以及 `baseline/security.md`、`baseline/data.md`、`baseline/site-feedback.md` 的重現細節。
3. Git 差異：`git diff 2329a91d1e5af66da00848fa72daca2c230edb47 a1b686dd64a10cd759ea195c17c4c857a46c313e -- .`。
4. [完整審查 prompt](CLAUDE-PROMPT.md)；先獨立檢查程式與反例，再對照既有結論。

## 證據分層與時間

- `baseline/` 是原始稽核的歷史紀錄，包括測試失敗、重現腳本、GitHub 狀態及修正前瀏覽器測量。
- `fixes/` 是本機修正完成時的歷史紀錄，最新全測為 `self-review-node22-tests.log` 與 `self-review-node24-tests.log`；較早的 `all-node*-tests.log` 為 250 項版本。`self-review-*-red-tests.log` 保存修正前反例，不是最終失敗。
- `fixes/REPORT.md`、`change-summary.json` 內「未 commit／未 push」、舊分支與 Windows 絕對路徑，描述的是封存時的狀態。本分支已將程式提交並整理交接；以本入口、Git commit 和自行取得的 HEAD 為審查依據。
- `baseline` 的 GitHub CI 是基準 SHA 的紀錄，不能當作修正提交通過 CI 的證據。本審查分支未建立 PR；既有 workflow 的 push 觸發只包含 main，推送此分支不會自動執行該 CI 或部署。
- 本包的歷史檔案保持原始位元組；[evidence-manifest.json](evidence-manifest.json) 記錄原 63 份、第一輪外部審查補修 7 份、P3 收尾 5 份、metadata 補修 5 份、favicon 補修 5 份及 main 整合 2 份，共 87 份檔案的大小及 SHA-256。排除可重建的 Node 安裝包、node_modules、npm cache、完整 repository 壓縮副本及重複產物。未帶入憑證。

## 重現檢查

在乾淨 checkout 使用 Node.js 22：

```sh
git checkout review/claude-audit-20261010
npm ci --ignore-scripts --no-audit --no-fund
node research/audits/2026-10-10/verify-review.cjs
```

`verify-review.cjs` 校驗封存紀錄雜湊、與固定基準比較 27 個原始檔案、跑全部測試與 7 組驗證 CLI，再於暫存副本建置公開產物，檢查產物位元組、內部連結和 fragment。它不呼叫 GitHub API、不部署、不寫入原始 tracked 檔案；詳細輸出與 JSON 留在終端顯示的暫存目錄。需要 npm 套件先安裝完成。

資料包整理後的本機執行紀錄見 [package-verification.json](package-verification.json)：258 項測試及驗證命令通過、63 份封存佐證雜湊一致、27 個原始檔案不變、22 個產物與 434 個本機連結／fragment 參照通過。這仍是本機紀錄，Claude 須自行驗證。

原始 `baseline/*.cjs`、`baseline/security-probes/*.js` 及 `fixes/*.cjs` 是當時使用的腳本，包含原 Windows 路徑，**不是移植後的執行入口**。如要在基準重現，請先以固定 SHA 建立另一個暫存 clone，調整腳本路徑與輸出位置；不要在正式 main 或此修正分支重建原始惡意 fixture。修正的可攜式反例已納入 `research/*.test.js`。

## 原先找到的來源資料

完整原 repository 在此分支保持可用，不只收錄稽核摘要。重要入口：

- `research/drafts/2026-10-09_2026-10-15.json`：當期候選與既有 hold 決策。
- `research/drafts/` 的來源搜尋、日期核對與候選稽核紀錄；`research/p0-*/` 的原搜尋及候選資料。
- `research/knowledge-base/data/`：records、relations、search_runs 等 CSV。
- `publication/sources/`、`research/reference/`：已保存的來源與參考內容。
- [歷史 URL 影響掃描](fixes/historical-url-impact.json)：191 個出現位置、73 個不同網址；舊鍵會混同 32 個 AERA 論文 URL。這是誤合併風險，不是已丟失 32 筆資料的證明；本次未重寫歷史資料。
- [來源保全明細](fixes/source-preservation.json)：原始檔案與基準雜湊。

程式閘門及 AI 審查只提供結構與流程證據；仍不能取代原文真實性、中文翻譯或內容編輯核准。手機檢查是 5 頁、4 寬度及鍵盤焦點抽查，沒有宣稱完整無障礙認證。

## 獨立審查的交付要求

請逐一標記 14 項原問題及 6 類追加問題為：已修正、部分修正、未修正、原判斷不成立或無法驗證。對新問題列出檔案與行號、觸發條件、最小重現、實際／預期結果、影響與最小修正建議。單獨列出阻止合併的問題與未執行檢查；不要僅以既有測試全綠宣告安全。

此次交給 Claude 的授權是獨立檢查與報告，不包含變更 main、提交／推送修正、建立 PR、發布摘要 Issue、改 GitHub 設定或部署。若需要程式修正，請先提出具體問題與建議供使用者確認。
