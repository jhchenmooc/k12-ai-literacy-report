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

六大類別 K1 政策框架、K2 學術研究、K3 素養評量、K4 教學師培、K5 工具治理、K6 活動實踐。K1–K6 是知識庫的導航分類（資料類型與主題），**不是**教育部 AI 素養框架的面向代碼（T-ETH 等 8 個，見 [AI 素養範圍判斷準則](../ai-literacy-scope-criteria.md)），兩者不可互相代替。A／B 範圍與面向代碼以 `has_ailit_class`、`has_ailit_dim` 記錄（管理者 2026-10-10 同意，見下方「AI 素養範圍與框架面向」），屬 AI 判讀、不是書目事實；判讀過程仍寫在篩選報告。現有 47 本期刊／21 個正式會議來源 ID 以 `research/venue-watchlist.md` 為權威；官方登錄與定期增刪見 `research/source-registry-and-review-policy-v17.md`。這些分類不表示研究具有實證支持。

## 學段與身分（`has_population`）

研究紀錄（期刊、會議、專書章節）以 `has_population`（`object_namespace=vocabulary`）標記學段與身分，可多筆。

| 代碼 | 網站標記 | 意義 |
|---|---|---|
| `ROLE_STUDENT` | #學生 | 主要對象為特定學段的學生 |
| `ROLE_INSERVICE_TEACHER` | #在職教師 | K-12 在職教師 |
| `TEACHER_ED` | #職前師培 | 職前師資生（沿用舊代碼，不加 `ROLE_` 前綴） |
| `ROLE_OTHER_STAKEHOLDER` | #家長行政 | 家長、校長、教育行政主管 |
| `STAGE_PRESCHOOL`／`STAGE_PRIMARY`／`STAGE_LOWER_SECONDARY`／`STAGE_UPPER_SECONDARY` | #幼兒／#國小／#國中／#高中職 | 學段；教師研究記其任教學段 |
| `STAGE_SECONDARY` | #中學未分 | 只寫 secondary、青少年，未分國高中 |
| `STAGE_K12_MULTI`／`STAGE_K12_GENERAL` | #K12跨學段／#K12未細分 | 兩個以上學段／只寫 K-12 等泛稱 |

- 判讀依題名與摘要，規則見 [p0-trends-2026-10-10/notes.md](../p0-trends-2026-10-10/notes.md) 第 3 節；由 AI 判讀，未經人工逐筆核對，`verification_status` 一律 `discovered_unverified`。判讀為「不明」者不標。
- 2026-10-10 首批由 `p0-trends-2026-10-10/records.json` 的 `stage`、`stage_secondary` 轉入；只有主要學段為特定學段（幼兒至中學）時才加 `ROLE_STUDENT`。
- 之後新入庫的研究紀錄，入庫時一併加上這些關聯。驗證程式只接受上表代碼。

## 主題與研究方法（`has_topic`、`has_method`）

研究紀錄以 `has_topic`（可多筆）與 `has_method`（至多一筆）標記，`object_namespace=vocabulary`。

- **主題代碼 → 網站標記**：`TOPIC_GENAI` #生成式AI、`TOPIC_CURRICULUM` #AI素養課程、`TOPIC_ASSESSMENT` #評量與量表、`TOPIC_TEACHER_PD` #教師專業發展、`TOPIC_ETHICS` #倫理與安全、`TOPIC_INTERVENTION` #教學介入、`TOPIC_CT` #運算思維與程式、`TOPIC_LANGUAGE` #語言學習、`TOPIC_STEM` #STEM、`TOPIC_EQUITY` #特教與公平、`TOPIC_POLICY` #政策與治理。
- **方法代碼 → 網站標記**：`METHOD_REVIEW` #文獻回顧、`METHOD_EXPERIMENT` #實驗或準實驗、`METHOD_MIXED` #混合方法、`METHOD_DESIGN` #設計本位、`METHOD_QUALITATIVE` #質性個案、`METHOD_SURVEY` #問卷量表。方法判不出者不標。
- 規則見 [p0-trends-2026-10-10/notes.md](../p0-trends-2026-10-10/notes.md) 第 5、6 節，都是題名與摘要的關鍵字規則，會有偽陽性（例如 risk、writing、policy 等常見字）。`#教學介入` 只表示研究做了教學介入，**不表示有成效**。
- 2026-10-10 首批由 `p0-trends-2026-10-10/records.json` 的 `topics`、`method` 轉入，一律 `discovered_unverified`。
- 網站同一行也顯示既有的 `studies_country`（研究國別）；只有部分論文有標，不能用來比較各國研究多寡。

## AI 素養範圍與框架面向（`has_ailit_class`、`has_ailit_dim`）

- `has_ailit_class`：`AILIT_A`（網站 #AI素養核心）、`AILIT_B`（#AI工具應用）；C 類不入庫，所以沒有代碼。
- `has_ailit_dim`：教育部《臺灣中小學教師與學生AI素養框架》八個面向，代碼與網站標記為 `S-BAS` #學生AI基礎與技術、`S-ETH` #學生AI倫理、`S-LRN` #學生AI賦能學習、`S-SYS` #學生AI系統設計、`T-BAS` #教師AI基礎與技術、`T-ETH` #教師AI倫理、`T-TEA` #教師AI賦能教學、`T-PD` #教師AI專業發展。可多筆。
- 依 [AI 素養範圍判斷準則](../ai-literacy-scope-criteria.md)（本刊共用準則）判讀，是 AI 把國際論文對照臺灣框架的分析選擇，**不代表論文作者採用此框架**；未經人工逐筆核對，一律 `discovered_unverified`。
- 論文年度趨勢分析（`research/annual-paper-trend-analysis-plan.md`）另有操作細則（接受度研究判 B、非教育情境判 C），兩者結果可能不同。
- 2026-10-10 首批由 `p0-trends-2026-10-10/records.json` 的 `ai_lit_class`、`ai_lit_dims` 轉入；各輪判讀不一致（`ai_lit_conflict` 非空）的 9 篇不標。relation_id 從 KR-3001 起編。

## 高引用（`has_citation_flag`）

- `CITED_TOP10_SAME_YEAR`（網站 #高引用）：論文年度趨勢分析回推入庫的論文中（方案第 8 節），OpenAlex `cited_by_count` 在**同一年**回推論文內排名前 10% 者。
- 只在同年內比較；各年門檻不同（2026-10-11 查詢：2025 年 ≥37、2024 年 ≥141），不可跨年比較，也不代表研究品質。查詢日期與門檻記在各年的 `research/p0-annual-trends-YYYY/kb-pushback.md`。
- 關聯一律 `discovered_unverified`；`evidence_url` 指向 OpenAlex 作品頁。

## 首次資料與限制

目前 CSV 先從真實 `research/drafts/2026-10-09_2026-10-15.json` 唯讀匯入九筆「發現但未認證」的來源，**未驗證首發日也不推測學術文獻類型**。沒有可驗證日期的資料不會因為發現於 2026 年就被自動歸成 2026 年首發。搜尋執行表目前只有標頭，不誤把先前審查與研究對話當可重現機器搜尋批次。其他確有查核的來源在下一輪分批補入。

## MVP 驗收範圍

資料欄位格式、ID 唯一、HTTPS、日期精度、參照完整性、來源候選一致性、年度索引可重建、標題公式風險的匯出隔離與 v1.6 檔案不可寫入的結構邊界。正式出版需繼續通過 v1.6 獨立來源和首發日核驗。

## v1.7 第二階段：保守去重與安全匯出

`research/knowledge-base-utils.js` 提供獨立 DOI 正規化、保留原路徑大小寫與查詢參數的 HTTPS 比對，以及「可能同 DOI／同 URL／同標題」檢閱訊號；不自行合併、覆寫、批准出版。命令 `node research/knowledge-base-utils.js > safe-export.csv` 僅產生帶公式防護的衍生 CSV 輸出，不修改原始主表。為避免將原始標題改寫，安全字串的單引號前綴只套用在匯出視圖。此為供試算表開啟的最低安全防線，不代表已對每種試算表／匯入設定逐一實測。
