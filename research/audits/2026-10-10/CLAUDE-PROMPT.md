# 可直接交給 Claude 的 prompt

本次最新任務：你對 6360e2148b68208412f09c88c2671a396291db8b 未發現阻擋問題，指出最小頁面任意 description／Open Graph／Twitter metadata 的 P3 缺口。請先比較該 SHA 到分支最新 HEAD，獨立檢查完整 meta 白名單、混合屬性、合法 viewport／中性 description、原日報 renderer 與 UTF-8 Content-Type 相容性。讀取 `metadata-followup/REPORT.md` 及貢獻契約，重新執行 verifier（預期 290 項測試、80 份佐證）；不要接受舊版本驗證作為最新提交證據。既有 main B1 入庫更新尚未整合，請將該整合需求與本次安全修正分開評估。僅審查，不建 PR、不合併、不部署。下方各輪說明為歷史脈絡。

請對以下 GitHub 分支做一次獨立、多角度程式碼審查。這是對已有修正的驗證，請不要直接接受 Codex 報告的結論；檢查實作、重現反例、尋找回歸及未涵蓋的繞過。

最新狀態：你對 e37ec618d1c58198957751e6ee4729d0879fb7b9 已確認 P1-1／P2-1 修正、無阻擋事項。本輪為 P3 收尾，先比較該 SHA 到最新 HEAD，驗證 tooltip 禁止、最小頁面中性期別 title、charset／Content-Type 的 UTF-8 規則與合法控制組。讀取 `p3-followup/REPORT.md` 與 `research/PUBLICATION-CONTRIBUTING.md`，確認 P3-2 的保守語法限制已記錄，P3-3 的週／月報 renderer 是明確待辦而非冒稱完成。重新執行 portable verifier，預期 288 項測試與 75 份佐證。請勿建立 PR、合併或部署。

本次為你先前指出 P1-1（main 外內容／隱藏正文）與 P2-1（SVG animate／set）的補修複審。先記錄最新 HEAD，比較 `c015a5c5b608c0c2622fcea11dc4a0120d67f0dd..HEAD`；再檢查完整基準差異。讀取 `claude-followup/claude-review.txt`、`claude-followup/REPORT.md` 與新增測試，獨立確認正文直接位於 HTML body、正文外固定 shell、共享 CSS／renderer 信任邊界、foreign namespace 阻擋及合法內容相容性。對 shared CSS 被修改、head metadata、任意屬性與新的 parser 重建反例提出明確範圍判斷，不能把 283 項通過當成安全證明。

Repository：https://github.com/jhchenmooc/k12-ai-literacy-report
審查分支：`review/claude-audit-20261010`
原始基準：`2329a91d1e5af66da00848fa72daca2c230edb47`
程式修正提交：`a1b686dd64a10cd759ea195c17c4c857a46c313e`
交接入口：`research/audits/2026-10-10/README.md`

開始先取得並記錄此分支的實際 HEAD，確認上述兩個提交及被審查的 c015a5c 存在於歷史，使用固定基準比較；不要把之後可能變動的 main 當成原始基準。a1b686d 是第一輪程式修正，最新 HEAD 才包含本輪補修。

先讀交接入口、`baseline/REPORT.md`、`baseline/COVERAGE.md`、`baseline/FIX-ORDER.md`、`fixes/REPORT.md` 及相關證據。封存文件中的 Windows 路徑、舊分支、未提交狀態與先前測試失敗是歷史紀錄。基準的 GitHub CI 成功不代表修正分支已通過遠端 CI。

請從以下角度審查：

1. **發布安全與 DOM**：確認真實 main／claim 綁定；註解、template、隱藏內容、HTML entities、URL 控制字元與反斜線、namespace／屬性歧義是否可繞過。檢查合法內容是否遭誤拒。
2. **公開產物與檔案邊界**：gate 與 builder 的公開檔案清單是否一致；未知及巢狀檔案、manifest、符號連結／junction、來源快照、非一般檔案與輸出目錄是否處理正確。確認研究資料不會誤部署、來源 SHA-256 比對原始位元組。
3. **資料完整性與匯入**：URL 身分與追蹤參數是否正確；update_note 型別、重複／跨週修正、CSV 引號／空欄／表頭／換行、部分未知搜尋數量、atomic write 失敗與重試是否會漏資料或誤判。
4. **跨週流程一致性**：新 scaffold、舊版空白工作表、歷史延後查核、較早未解決修正、去重及畸形資料。驗證 daily 建議與正式發布閘門都不會忽略待複核修正；解除複核及不同來源的控制組應正常，不得把背景或 hold 自動提升為 publish。
5. **讀者回饋**：完整分頁、1001 筆、整頁／空頁、失敗／畸形 API、重複及重疊頁面、摘要去重與 PR 同名、PII 保全。只能用 mock API，禁止實際 POST Issue。
6. **診斷、測試與相容性**：CLI 非零退出、null／型別錯誤、重複 claim／evidence ID、錯誤訊息、Node 22／24、Windows／Linux 換行及 locale 排序。檢查測試是否只鏡像實作、是否漏掉整合路徑或掩蓋錯誤。
7. **網站與維護成本**：256／320／375／1280px、內部連結與 fragment、鍵盤導覽、產生頁面一致性、解析器依賴及 CI 權限／部署條件，是否產生回歸或不必要的複雜度。

在乾淨 checkout 使用 Node.js 22 執行：

```sh
npm ci --ignore-scripts --no-audit --no-fund
node research/audits/2026-10-10/verify-review.cjs
```

可以再使用 Node 24 及 Linux 交叉驗證，並在暫存 fixture 寫最小反例。不能執行的檢查須說明原因；只有瀏覽器或 GitHub 網頁存取時，不可宣稱已跑本機測試。不要直接執行封存中帶原 Windows 路徑的腳本，也不要把故意失敗的 red-test log 認作最終結果。

請交付繁體中文報告：

- 先列阻止合併的具體問題，依 P1／P2／P3、證據信心排序。每項附檔案與行號、觸發條件、最小重現或測試、實際／預期結果、影響、最小修正建議。純風格偏好另列，不當成功能缺陷。
- 用表格逐項評估原 14 項問題及第二輪 6 類追加修正：已修正／部分修正／未修正／原判斷不成立／無法驗證，附理由與證據。
- 列出實際執行的命令、環境、結果，以及未驗證範圍、可能的資料遷移／相容性影響。
- 確認 27 個受保護原始檔案是否與固定基準完全相同；把 32 個 AERA 網址的鍵碰撞與「已丟失資料」區分清楚。
- 最後判斷是否適合建立 PR，以及必須先修正的項目。即使沒有新發現，也須列出審查限制。

本次只授權獨立檢查與報告。不要修改或推送 main／審查分支，不要 commit、建立 PR、發布 Issue、改設定或部署。需要修正時，先給我具體發現與最小修正方案，等我確認。
