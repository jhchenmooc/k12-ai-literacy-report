# 資料工具與每日待審包審查

基準：`2329a91d1e5af66da00848fa72daca2c230edb47`，Windows、Node.js v24.16.0。只讀正式 repo；合成資料、重現程式與輸出均位於 `D:/codex/ai/audit-results-20261010/`。未執行外部寫入、未修改正式資料、未重跑全套基線。

重現命令：

```powershell
node D:\codex\ai\audit-results-20261010\data-repro.cjs
```

退出碼 0。具體輸出存 `data-repro.log`。腳本重跑會覆寫審查目錄下自身合成 fixtures，不改 repo。

## 已確認問題

### DATA-01 [P2] URL 去重把大小寫路徑或未知查詢參數的不同來源排為重複

- 位置：`research/ingest-candidates.js:6`，後續刪除候選分支在 `20–30`。
- 觸發：同批或歷史來源含 `https://example.org/Doc` 與 `/doc`；或 `/read?item=10` 與 `/read?item=11`。
- 預期：沒有同 DOI／同事件證據時，保留兩筆可能不同的來源。URL path 可區分大小寫，未知 query 可承載文件身分。
- 實際：两種重現皆 `items=1`、`duplicates=1`。第二筆只有 URL 被保存為 unresolved duplicate，標題、定位、DOI 等來源內容不入候選。
- 原因：`canonical` 小寫化 path、移除所有不在六種 allowlist 內的 query，並移除尾端 slash；後續只要任一 identity key 相同就跳過新增。
- 影響：可漏收合法不同來源，錯誤連到舊候選並阻擋其每日建議。不是全部來源消失：URL 與待複核標記仍在；但完整候選內容未保留。
- 依據：`editorial-workflow-master.md:181,207` 要求保守去重；KB schema 也明定大小寫敏感 URL／未知參數不得自动併檔。KB `strictUrl` 保留這些差異，候選匯入行為不一致。
- 修正方向：保留 path 大小寫與未知 query，僅刪除已確認的追蹤參數；疑似同來源作為 review 訊號，不因未證實的正規化自動排掉候選。增加上述兩種反例。
- 證據名：`path-case`、`unknown-query`。

### DATA-02 [P2] 非字串 update_note 讓重複來源更新完全漏記

- 位置：`research/ingest-candidates.js:24–30`。
- 觸發：duplicate candidate 的 `update_note` 為物件或其他 truthy 非字串。
- 預期：拒絕不合法欄位，或至少保留 `review_required:true` 的 unresolved discovery。
- 實際：匯入成功、duplicate 計數增加，但 `unresolved=[]`、`source_updates=[]`；已帶合法 publish／scope／audience 旗標的舊候選仍出現在每日 `suggested_for_publication`。
- 原因：第一個分支要求 `!update_note`，第二個要求字串；truthy 非字串兩邊都不走，直接 continue。
- 影響：違反「重複來源沒有更新理由也應記待核對」的契約（`editorial-workflow-master.md:207`），讓編輯看不到更正線索。每日仍只是提名，不能據此聲稱正式出版 gate 已被繞過。
- 修正方向：先驗證 update_note 型別；合法非空文字記更新，其餘拒絕或保留 unresolved。驗證物件、數字、空文字等案例。
- 證據名：`nonstring-update-note`。

### DATA-03 [P2] 空白週稿無法產生零搜尋日待審包

- 位置：`research/scaffold-weekly.js:10–20` 與 `research/prepare-daily-brief.js:11`。
- 觸發：使用正式 scaffold 產生新週稿，尚未匯入批次就執行每日待審包。
- 預期：零批次、零候選應產生帶「無已記錄批次」提示的空待審包。
- 實際：`dailyBrief(makeDraft('2026-10-09').data,'2026-10-10')` 拋 `invalid cumulative worksheet`。
- 原因：scaffold 沒有 `search_runs:[]`，reader 強制要求此欄是陣列。
- 影響：零搜尋本來是正常狀態，卻在週初始化後報錯；既有 zero-source test 手動補欄，未測兩個正式工具的契約。
- 修正方向：新稿初始化 search_runs，或 reader 在明確允許的空狀態補為空陣列；以真正 scaffold → brief 串接作回歸案例。
- 證據名：`empty-scaffold`。

### DATA-04 [P2] CSV 解析接受不合法引號及重複表頭，默默改寫欄值

- 位置：`research/validate-knowledge-base.js:8–13,18–19`。
- 觸發與實際：`record_id,title\n1,"A"B\n` 被解析成 title=`AB`；`record_id,title,title\n1,Original,Replacement\n` 被解析成 title=`Replacement`。
- 預期：引號關閉後只能有分隔符／換行／結尾；表頭必须唯一，不应默默覆寫原欄。
- 原因：沒有關閉引號後的狀態檢查；Object.fromEntries 對重複 key 取最後一欄。
- 影響：損壞或人工編輯錯誤 CSV 可被當合法資料，造成來源原題改寫／欄位丟失，進入索引、預覽與頁面。正常 quoted comma／escaped quotes／多行欄位重現可正確解析。
- 依據：`knowledge-base/schema.md` 指定 RFC 4180 escaping 並原樣保存題名。
- 修正方向：嚴格檢查引號結束狀態、空／重複表頭及各表必要欄位；保持合法多行 CSV 的支援。
- 證據名：兩筆 `invalid-csv`。

### DATA-05 [P2] 部分已知搜尋計數的矛盾不被驗證

- 位置：`research/validate-knowledge-base.js:68–70`。
- 觸發：results_seen 空白、results_screened=`3`、results_recorded=`4`，status=`partial`。
- 預期：即使總命中未知，已知 recorded 不能大於已知 screened。
- 實際：`validate([validRecord],[],[run],[])` 返回 `[]`。
- 原因：只有三個數字全非 null 才比較順序。
- 影響：部分查詢紀錄可夾帶不可能的已知計數而通過。未發現現有資料已含此例，不聲稱現有知識庫已損壞。
- 修正方向：對每組同時已知的上下游數字檢查大小；保留 unknown 與 unavailable 的正確意義。
- 證據名：`partial-search-count`。

### DATA-06 [P2] CLI 每日待審包漏掉上一週於昨日完成核證的候選

- 位置：`research/prepare-daily-brief.js:32–36`（對比函式內 `13` 的 verification_completed_on）。
- 觸發：10/09–10/15 候選於 10/16 完成核證，10/17 呼叫 create；當期 10/16–10/22 worksheet 為空。
- 預期：既有「於核證完成日重新列入待審包」功能能顯示這筆舊候選，且跨期仍只作背景／待審。
- 實際：直接對舊 worksheet 呼叫 dailyBrief，pending=1；正式 CLI 所用 create 只讀 10/16 週稿，pending=0。
- 影響：跨週晚核證資料在每日輸出消失，使用者可能誤認沒有待複核項目。
- 依據：`editorial-workflow-master.md:205` 的晚核證重新列入待審包規則；`prepare-daily-brief.test.js` 只有同週晚核證測試。
- 修正方向：每日 reader 納入相關歷史 worksheet 的昨日核證／更新項目；跨期不得進本週新事件建議清單。若產品實際只打算支援同週，需明確縮限文件契約。
- 證據名：`cross-week-late-verification`，隔離 fixtures 在 data-fixture/research/drafts。

## 已驗證的正常行為

- 無效曆日 2026-02-30 被拒絕，合法閏日 2024-02-29 被接受；日期主流程使用 UTC，未見直接主機時區依賴。
- 合法 CSV 的 CRLF、多行、逗號、雙引號可保存。
- knowledge-base-utils.strictUrl／compare 保留路徑大小寫和 query 差異，回傳 distinct_or_unknown；import-preview 對上述大小寫不同來源保留兩筆，僅輸出檢閱建議。
- 合成 rename 失敗：原始 worksheet 位元組未改，tmp 與 lock 清理，重試成功新增一筆。此驗證涵蓋 catchable exception，不涵蓋斷電／SIGKILL；文件已有鎖檔人工恢復說明（editorial-workflow-master.md:220），不將殘留鎖單獨列為缺陷。
- index builder 以排序輸出，生成 CLI 將 index/YEARS 寫入限於明確 write 旗標。主控基線的 CRLF/LF 差異由整合者處理，本報告不將那兩個測試失敗判為資料損壞。

## 覆蓋與限制

已讀七個分配模組全文、KB schema、相關測試與主控 SOP；以匯出函式做上述隔離反例，並驗證 ingest rename 失敗恢復。

未實跑 Linux／其他 Node major、未對所有 CSV 編碼或試算表匯入器做相容性測試、未做網路來源真實性查核、未量測大規模效能、未測斷電／磁碟滿／真實並行競爭。正式資料全量基線由整合者統一執行。render-knowledge-base-years 僅做靜態閱讀，Markdown URL 的完整轉義與原生 HTML 注入應由安全審查與整合者一併確認，不在此重複列未證實問題。
