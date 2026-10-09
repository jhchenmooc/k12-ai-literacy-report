# v1.7-R5 歷年知識庫（最小可運作規格）

> 知識庫是供政策及文獻回顧的**書目發現與檢索工具**，不認證新聞；不改寫 v1.6 候選池、正式 claims、manifest 或已刊網頁。

## 三張資料表

- `data/records.csv` 每筆為一個可識別來源／版本；`record_id` 穩定，`work_group_id` 只有同作品證據充分才設。來源原題與 URL 原樣保存；可以按 K1–K6 六大分類擴充關聯；不依行號重算 ID。
- `data/relations.csv` 對主紀錄附加國別角色、學段、主題、期刊／會議監測 ID、版本等；`object_namespace` 只允許 `record`、`work`、`source`、`vocabulary`。暫不建獨立 event ID 空間，事件可作紀錄。關聯引用必須能驗證。
- `data/search_runs.csv` 僅記**實際完成且可追溯**的搜尋，區分入口查閱、條件搜尋、逐篇篩選及原文核對；搜尋失敗不記零命中，批次不能虛構。

## 日期、識別與驗證

- `first_published_on` 可為 YYYY-MM-DD／YYYY-MM／YYYY／空白，精度相應為 `day`／`month`／`year`／`unknown`；`year_basis` 為 `first_publication`、`issue_year`、`event_year`、`unknown`。日期不詳則兩者留空／unknown，不以發現日冒充首發日。
- `year_value` 是**索引歸屬年份**。如果未知，保留空白並放入未確定年份索引；索引顯示其依據。對歷年實體研究可按來源逐筆驗證日期後補充。
- `verification_status=discovered_unverified` 不是已閱讀全文或可出版；既有首週九筆候選均以此級別唯讀初始化，保留原始 `hold` 而不搬移 `decision`。
- DOI 去重只能在 DOI 明確規範化匹配且同一版本時自動連結；不同 DOI、標題相似、同事件、大小寫敏感網址及未知查詢參數均不得自動併檔。本 MVP 不自動合併來源。
- CSV 儲存使用 RFC 4180 雙引號 escaping；**試算表安全匯出必須另外處理公式注入**，不得損失主表原文。外部 URL 僅允許 HTTPS 且不得含密碼。

## 分類及來源池

六大類別 K1 政策框架、K2 學術研究、K3 素養評量、K4 教學師培、K5 工具治理、K6 活動實踐。K1–K6 是知識庫的導航分類（資料類型與主題），**不是**教育部 AI 素養框架的面向代碼（T-ETH 等 8 個，見 [AI 素養範圍判斷準則](../ai-literacy-scope-criteria.md)），兩者不可互相代替；知識庫目前不存 A/B/C 與面向代碼，判讀結果寫在篩選報告。現有 47 本期刊／21 個正式會議來源 ID 以 `research/venue-watchlist.md` 為權威；官方登錄與定期增刪見 `research/source-registry-and-review-policy-v17.md`。這些分類不表示研究具有實證支持。

## 首次資料與限制

目前 CSV 先從真實 `research/drafts/2026-10-09_2026-10-15.json` 唯讀匯入九筆「發現但未認證」的來源，**未驗證首發日也不推測學術文獻類型**。沒有可驗證日期的資料不會因為發現於 2026 年就被自動歸成 2026 年首發。搜尋執行表目前只有標頭，不誤把先前審查與研究對話當可重現機器搜尋批次。其他確有查核的來源在下一輪分批補入。

## MVP 驗收範圍

資料欄位格式、ID 唯一、HTTPS、日期精度、參照完整性、來源候選一致性、年度索引可重建、標題公式風險的匯出隔離與 v1.6 檔案不可寫入的結構邊界。正式出版需繼續通過 v1.6 獨立來源和首發日核驗。

## v1.7 第二階段：保守去重與安全匯出

`research/knowledge-base-utils.js` 提供獨立 DOI 正規化、保留原路徑大小寫與查詢參數的 HTTPS 比對，以及「可能同 DOI／同 URL／同標題」檢閱訊號；不自行合併、覆寫、批准出版。命令 `node research/knowledge-base-utils.js > safe-export.csv` 僅產生帶公式防護的衍生 CSV 輸出，不修改原始主表。為避免將原始標題改寫，安全字串的單引號前綴只套用在匯出視圖。此為供試算表開啟的最低安全防線，不代表已對每種試算表／匯入設定逐一實測。
