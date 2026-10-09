# 程式碼多角度審查報告

日期：2026-10-10（臺灣）。受檢 repo：jhchenmooc/k12-ai-literacy-report。
固定提交：`2329a91d1e5af66da00848fa72daca2c230edb47`（PR #154）。
隔離副本：`D:/codex/ai/audit-repo-20261010`。本輪只審查與隔離驗證，未修正正式程式、提交 PR、寫入 Issue、變更 GitHub 設定或部署。

## 結論

確認 14 項問題：1 項 P1、11 項 P2、2 項 P3。最優先處理的是 HTML 註解中的假 main 能使未驗證的可見正文通過發布檢查。另有 URL 安全解碼、公開 HTML 檢查與打包範圍不一致、候選去重與資料工具契約問題。

缺陷是可重現的條件式行為，沒有證據顯示目前線上網站已遭利用或現有來源資料已因此損壞。三個 AI 審查角色分工，主審重跑安全／資料探針，再對重要發現交叉複核；不等同外部真人專家審核。

## 基線與環境

| 項目 | 結果 |
|---|---|
| Windows Node | v24.16.0，預設 locale zh-TW，時區 Asia/Taipei |
| GitHub CI | Ubuntu、Node 22；同 SHA verify 與 deploy 成功 |
| 預設 Windows checkout | 218 tests：215 通過、3 失敗；2 個索引比較及網站產生比較受 CRLF 影響 |
| 提交原始 bytes（LF） | 218 tests：217 通過、1 失敗；archive/policy 的標題排序因預設 locale 不同而改變 |
| 排序原因驗證 | 隔離呼叫明定 en 後，10 個生成頁與提交內容均相符；未修改正式程式 |
| 語法／格式盤點 | 37 個 JS 語法檢查通過（其中 19 個測試檔）；92 個 JSON 均可解析 |
| 知識庫結構 | 369 records、929 relations、281 search runs 通過現有驗證，index/YEARS 一致 |
| 現有正式期別 | checked_editions=0；2 個 legacy 期別保留未認證警示，未將其視為新流程通過 |
| 本地網站連結 | 16 個 HTML、434 個本地檔案／fragment 參照未發現缺失；不含外部網址可達性 |
| 範圍一致性 | 受檢副本全部 tracked files 與 HEAD bytes 相符；正式程式未改 |

GitHub 證據：[同 SHA Actions](https://github.com/jhchenmooc/k12-ai-literacy-report/actions/runs/37995375712)、[main ruleset](https://github.com/jhchenmooc/k12-ai-literacy-report/rules/24733165)。Ruleset active、必須 PR、strict required verify、無 bypass actors；不要求一般 approving review。傳統 branch protection endpoint 回 403，不能据此判斷其他設定。

## 已確認問題

P1：優先修正的高影響流程缺陷。P2：在具體條件下造成錯誤行為，應修正。P3：較低影響的健壯性／紀錄一致性問題。嚴重程度與證據信心分開；沒有把未知環境設定當漏洞。

| ID | 級別 | 位置（隔離副本） | 觸發、結果與影響 |
|---|---|---|---|
| S1 | P1 | [validate-publication.js:29](/D:/codex/ai/audit-repo-20261010/research/validate-publication.js:29) | 合法 main 全部置於 HTML comment，body 顯示未驗證文字、無真正 main；validate 仍 ok:true。CI 核對的是隱藏文字，違反正文／claim 對應。週／月報 renderer 不會修復正文。 |
| S2 | P2 | validate-publication.js:64–67 | `java&Tab;script:void(0)` 與 NewLine 變體通過；HTML 解碼後 URL protocol 為 javascript。字面 javascript 被拒絕。證明檢查繞過，未執行 payload。 |
| S3 | P2 | validate-publication.js:8–10；verify-and-deploy.yml:84–85 | 未登記 extra.html 不被掃描，卻被遞迴複製到公開產物；隔離生成頁一致性及 gate 通過仍包含它。未跑整套 CI 或正式部署。 |
| DATA-01 | P2 | ingest-candidates.js:6、20–30 | 路徑大小寫或 `?item=10/11` 不同仍被判 duplicate。第二筆完整候選不保存，URL 待核紀錄可能錯掛第一筆；保守去重契約與其他 KB 工具不一致。 |
| DATA-02 | P2 | ingest-candidates.js:24–30 | update_note 為 truthy 非字串時，既不拒絕也不保留更新／unresolved；旧候選仍可在每日待審提名中出現。不是正式發布放行漏洞。 |
| DATA-03 | P2 | scaffold-weekly.js:10–20；prepare-daily-brief.js:11 | 正式新週 scaffold 缺 search_runs，零匯入時直接接 dailyBrief 報 invalid cumulative worksheet，無法產生正常空待審包。 |
| DATA-04 | P2 | validate-knowledge-base.js:8–13、18–19 | `"A"B` 解析為 AB；重複 title 表頭只留下最後值。非法 CSV 被靜默改值，影響原題與下游資料。合法多行／quoted comma／escaped quote 控制案例正常。 |
| SF-04 | P2 | render-site.js:132；:22；render-site.test.js:7 | title.localeCompare 未指定 locale；同 SHA LF 在 zh-TW 排序不同。Windows CRLF 另改變 CSS bytes hash 與生成比較。兩個不同原因，均需固定建置契約。 |
| S4 | P2 | validate-claims.js:59–61 | 相同 ID 先 hold 後違規 publish，JSON allow:false 但 CLI exit=0；因 find 取首筆 decision。正式 publication gate 有 duplicate 防線，影響限直接依賴 CLI exit 的使用者。 |
| DATA-06 | P2 | prepare-daily-brief.js:32–36 | 舊週候選在昨日才核證，create 只讀目前週稿而漏列。SOP 要求晚核證重列；修復時須依當前週重分類為背景，不能沿用舊週提名。 |
| SF-02 | P2 | summarize-reader-feedback.js:57–67 | API 超過 1000 筆仍只讀 10 頁，離線 1001 筆重現發布 1000 筆統計且沒有截斷警示；一般 Issue／PR／近期更新舊資料也佔頁数。尚非已發生的線上事件。 |
| SF-01 | P2 | assets/site.css:23–24 | 320px viewport 下 content=276px，但 grid min=300px，欄超出容器至少 24px。CSS 靜態可證；尚未完成瀏覽器重排量測。 |
| DATA-05 | P3 | validate-knowledge-base.js:68–70 | seen 未知、screened=3、recorded=4 被接受；只在三數全已知時比較。影響搜尋紀錄可信度，未發現現有資料已含此例；整合後由 P2 降為 P3。 |
| SF-03 | P3 | compare-source-facts.js:30–32；audit-chinese-claim-coverage.js:21、28、34–35 | facts={} 或 null assertion／annotation 拋 TypeError，一筆畸形資料中斷整包診斷。CLI 非零，無自動發布放行。 |

精確重現、修正方向與原始證據：[安全報告](security.md)、[資料報告](data.md)、[網站／回饋報告](site-feedback.md)。主審重跑安全／資料探針，跨角色確認重要問題的範圍，並將搜尋計數矛盾調整為較低優先。

## 正向驗證

- 正常主張與來源快照通過；錯誤雜湊、短／缺摘錄、不同來源 URL、路徑穿越及未核對翻譯被拒絕。
- 高風險主張即使宣稱真人審核仍被拒絕；未知 conflict、非法日期、非 HTTPS 與中風險缺第二次核對被拒絕。
- ingest 的可捕捉 rename 失敗保留原檔，清理 tmp/lock，重試成功；此結論不涵蓋斷電與強制殺程序。
- 日期使用 UTC；無效曆日被拒絕、合法閏日通過。KB URL 工具保留大小寫與 query，與候選工具缺陷形成對照。
- PR 不進 deploy，deploy 依賴 verify 與啟用變數。生成器預設檢查不寫檔，沒有確認 verify/deploy 分別 checkout 造成目前產物漂移。
- no-login 服務保持停用，入口揭露 GitHub 登入與公開資訊；未發現目前資料含不安全來源 URL。

## 改善建議與未決事項

- verify 繼承 pages/id-token 寫入權限，可收斂到 deploy job；不是已證實 fork PR 寫入漏洞。
- Actions major tag/runtime major 可按維護需求固定；本 repo 無 package.json/lockfile，本輪未安装依賴或做全面供應鏈掃描。
- render-site 對 claims 讀取錯誤靜默轉空，卻仍呈現通過標記；現行正式 CI 有 publication 防線，列防禦性改善。
- Issue form literal block 含字面 `\n`，列呈現改善，不阻擋提交。
- workflow_dispatch 非 main 部署是否允許，取決於 Pages environment branch rules；目前未驗證該私有設定，未判定漏洞。

## 限制與停止條件

範圍矩陣每項已檢查或標明限制；核心流程有正常／負向證據，重要疑點經反向挑戰及交叉複核。本輪審查完成，沒有執行修復。

未在本地實跑 Ubuntu/Node22；同 SHA CI 成功可作相應證據，但不等於新增反例也已在該環境跑過。未作全套 CI 攻擊案例演練、正式部署或 rollback；未確認線上 bytes 與 artifact 完全相等。

嘗試使用本機 Edge headless 做隔離版面／鍵盤驗證，瀏覽器程序在本環境啟動後關閉；已留 browser-limitation.txt。因此手機版、键盤巡覽、對比量測、螢幕閱讀器結論仍以靜態檢查為限，不宣稱瀏覽器實測通過。

未作斷電、磁碟滿、真實並行競爭、大規模效能測試；未逐篇檢查來源真實性、翻譯、分類與自填核對記錄。沒有用多角色同意或測試全綠代替這些驗證。

其餘詳見 [覆蓋矩陣](COVERAGE.md) 與 [修正順序](FIX-ORDER.md)。
