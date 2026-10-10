# 建立 PR 前整合 main B1 更新

使用者已授權建立 PR，等待遠端 CI 通過後合併。審查分支原 HEAD 為 `ebd124e9a0b376b08dbe89c6fff07988889dc77a`，整合 main `071d2884289595c6aa86f9a94da911997eb2642d`（B1 入庫 #155）。Git merge 只有 `archive/journals/index.html` 衝突；保留已審查的 renderer 版面後，以整合資料重新產生網站頁面與年份索引。原固定稽核基準仍為 `2329a91`。

## 資料與證據

原 27 個保全檔案中，25 個仍與原始基準逐位元組相同。只有 `records.csv`、`relations.csv` 因 main 的 B1 更新而變更；兩者逐位元組等於固定 upstream 071d288，沒有因修正程式而改寫資料。B1 的兩份匯入說明與 index.json 亦逐位元組等於 upstream；生成 HTML 與 YEARS.md 依 renderer 驗證。

[data-baseline.json](data-baseline.json) 額外記錄兩份 CSV 的固定 upstream 與 SHA-256。portable verifier 仍先驗證原始歷史基準／所有封存佐證，再要求這兩份 CSV 與固定 Git upstream 及記錄雜湊都相同，其餘 25 份仍嚴格比對原基準。不改寫舊 source-preservation.json，也不籠統放寬資料保全。驗證輸出明列 originalUnchangedSourceFiles=25、acceptedUpstreamSourceFiles=2。這是本次稽核／B1 快照，未來其他合法資料更新需要另記整合來源。

## 本機整合驗證

Windows Node 22.23.3 portable verifier：292 項測試、0 skipped；另外七個 CLI 通過；22 個公開產物、436 個本機連結／fragment 通過。Node 24.16.0 全套亦為 292/292。原 85 份封存佐證不更動；新增本整合報告與資料基準兩份，共 87 份。

目前紀錄是尚未提交的整合 working tree，並非宣稱舊 ebd124e 已含 B1。遠端建立 PR 後，須以最終 PR HEAD／合併測試提交的 CI 成功為合併條件；本機結果不是遠端 CI 證據。遠端 CI 待執行，尚未合併 main。Pages、真實 API、screen reader 與來源真實性不在本輪本機驗證範圍。
