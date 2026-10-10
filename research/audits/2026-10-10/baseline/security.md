# 發布、安全與 CI 審查

受檢版本：2329a91d1e5af66da00848fa72daca2c230edb47。日期：2026-10-10（臺灣）。
範圍：research/validate-claims.js、validate-source-trace.js、validate-publication.js；兩份 .github/workflows。另閱讀 render-site.js、相關發布規格以確認呼叫關係與既有要求。
方法：靜態審查與隔離合成探針；未跑所有測試、未執行 GitHub 外部寫入、未修改受檢程式。探針 Node 為 v24.16.0，與 CI 指定 Node 22 不同。未實際部署或執行瀏覽器腳本。

## 已確認缺陷

### S1 [P1] HTML 註解中的假 main 可取代實際正文檢查

- 位置：research/validate-publication.js:29–33（根因：在完整 HTML 上直接以 regex 擷取 main，只在擷取結果內拒絕註解）。
- 觸發：註解中放置完整合法的 `<main><p data-claim-id="C1">Synthetic notice</p></main>`，實際 `<body>` 中顯示其他未驗證文字，完全沒有真正 main。
- 結果：`validate()` 回 `ok:true`。註解外框在擷取 body 之前已被排除，故內部註解檢查無效。這違反「恰好一個靜態 main」與正文／claim 對應的既有要求。
- 重現：security-probes/reproduce.js 的 comment_fake_main；完整 HTML 已留在 security-probes/comment-fake-main/weekly/2026-10-09_10-15/index.html。
- 影響：新週報或月報可讓 CI 核對隱藏的合成內容，公開完全不同的可見正文。需有人將檔案加入 repo 並通過正常合併流程；不代表外部訪客可修改網站。
- 修正建議：用 HTML parser 建立 DOM，忽略 comment 節點後檢查 main 數量與正文節點；建立「整段 main 位於註解」負向案例。僅增加 main 內註解 regex 不能修復。

### S2 [P2] named character reference 可繞過禁止 javascript URL 的檢查

- 位置：research/validate-publication.js:64–67。
- 觸發：合法的 claim 節點內放 `<a href="java&Tab;script:void(0)">Synthetic notice</a>`，或 `&NewLine;` 變體。
- 結果：两者 `validate()` 均回 `ok:true`；相同內容使用字面 `javascript:void(0)` 則被正確拒絕。
- 證據：security-probes/results.json；decode-anchors.py 使用 Python 標準 HTMLParser 得到 `java\tscript:void(0)`、`java\nscript:void(0)`；Node WHATWG URL 對兩值的 protocol 均為 `javascript:`。未執行任何 JavaScript payload。
- 影響：使用者點擊此類連結時，瀏覽器可將其解讀為執行腳本的 URL。需有內容提交／合併能力，且執行取決於瀏覽器與 CSP。探針只使用無害 void(0)，不宣稱已發生攻擊。
- 修正建議：從正式 HTML parser 取得解碼後的 attribute，正規化後採允許的 URL scheme／相對路徑策略；加入 named Tab／NewLine 反例。

### S3 [P2] 驗證只列 index.html，部署卻遞迴公開額外 HTML

- 位置：research/validate-publication.js:8–10、184–188；.github/workflows/verify-and-deploy.yml:84–85。
- 觸發：新增 weekly/2026-09-29_10-08/extra.html，其中放未審查的可見內容，不加入 issues.json。
- 結果：publication gate 仍 `ok:true`；依 workflow 相同目錄白名單與遞迴複製方式建置的隔離 artifact 包含 extra.html。render-site 的生成頁檢查也不檢查額外檔案。
- 完整探針：security-probes/full-artifact.js、full-artifact-results.json。固定版本在本地原有 archive/policy/index.html 一致性失敗；只在測試副本執行 render-site --write 正規化後，生成頁一致性檢查退出 0，publication gate 仍 ok:true，extra.html 仍進 artifact。此探針未跑全 CI，未將正規化產物寫回受檢 repo。
- 影響：發布包包含門檻未覆蓋的報告 HTML，直接 URL 可讀取。包含新名稱、額外副本或更深層報告路徑時亦有相同範圍差異。此項不把刻意保留的 legacy index.html 誤列為違規。
- 修正建議：建立公開 HTML inventory，區分生成索引、允許的 legacy／utility 頁面及已登記報告；驗證與打包共用 inventory，未知 HTML 拒絕或不打包。加入 artifact 範圍負向測試。

### S4 [P2] validate-claims CLI 用第一筆重複 ID 的 decision 判斷退出碼

- 位置：research/validate-claims.js:59–61。
- 觸發：同一 claim_id 先放合法 hold，再放違規的 high-risk publish。
- 結果：JSON 輸出第二筆 allow:false，但 CLI exit status = 0，因 rows.find() 返回第一筆 hold。
- 重現：security-probes/duplicate-id.json、reproduce.js 的 duplicate_id_cli。
- 影響：使用此 CLI 的操作腳本若僅依退出碼判定成功，會漏掉違規 publish。正式 validate-publication 另有重複 ID 與 high-risk 阻擋，故此項不是正式 CI 的既證實放行漏洞。
- 修正建議：直接按原輸入索引／紀錄對應結果，並驗證 claim_id 唯一性；加入重複 ID 順序變化的負向測試。

## 通過／未發現缺陷的範圍

- sourceTrace 正向案例通過；錯誤 SHA256、空摘錄、來源 URL 不匹配、路徑穿越字串與未核對翻譯均回錯誤。證據 results.json 的 source_trace_checks。
- check 正向案例通過；high-risk 即使宣稱完成真人審閱仍拒絕，未知 conflict、無效日期、非 HTTPS source URL、中風險單次 crosscheck 均拒絕。證據 results.json 的 claim_checks。
- validate-publication 明確阻擋 decision != publish，並檢查重複 claim_id；既有 publication 測試亦涵蓋主要負向情境（本分工僅閱讀，由主代理執行基線）。
- daily 發布需明確 publication_mode、精確模板、合法 issue date、來源直接連結、七天首發窗口、來源快照及已知候選狀態對照；閱讀後未另確認程式缺陷。未逐一補跑全部 daily 反例。
- LEGACY 是兩個確定路徑，manifest 不能將它們重新登記認證；保留頁仍經 staticHtmlSafety。legacy 未經認證是明確既有政策，不當作本輪新增缺陷。
- deploy depends on verify，PR 事件不進 deploy，且需 ENABLE_VERIFIED_PAGES_DEPLOY=true；部署只複製公開目錄並排除 research。
- verify 的 render-site 與 render-knowledge-base-years 使用預設檢查模式，不會先建置新產物再丟棄。verify／deploy 的兩次預設 checkout 對應同一 workflow ref，未找到此處的固定 SHA 漂移缺陷。
- feedback workflow 僅使用 contents:read、issues:write，沒有 pull_request 觸發；有明確公開 Issue 外部寫入，因此本輪未執行其正式 digest 命令。

## 改善建議與未驗證事項

- verify job 繼承 workflow 層的 pages:write、id-token:write（verify-and-deploy.yml:8–11），應將這兩項收斂到 deploy job；不宣稱現有 fork PR 已可取得寫入 token。
- actions/* 使用 major tag，Node 使用 major 22；可固定 Actions commit 與記錄 runtime，以改善來源與可重現性。未進行全面 supply-chain 或套件漏洞掃描。
- workflow_dispatch 未額外限制 main（:73）；實際是否允許其他分支部署取決於 github-pages environment branch rules。本分工未取得 environment 保護設定，因此列為需確認，未判定漏洞。
- branch ruleset／傳統 branch protection、GitHub Pages 環境規則、variable 實值、公開線上版本及 artifact 對照由主代理統一取證；本分工未自行讀取，不以無資料推定通過。
- 機器只證明快照內有摘錄、SHA 及自填 metadata 合法；不能證明官方來源真實、翻譯／語意正確或 AI crosscheck 確實執行。此限制已被文件明確揭露。
- syntactic 路徑限制已驗證；symlink 邊界、snapshot 檔案 IO 失敗與完整瀏覽器／CSP 行為尚未動態驗證。

## 可重跑命令

```powershell
node D:/codex/ai/audit-results-20261010/security-probes/reproduce.js
node D:/codex/ai/audit-results-20261010/security-probes/full-artifact.js
& 'C:/Users/user/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe' D:/codex/ai/audit-results-20261010/security-probes/decode-anchors.py
node -e "console.log(new URL('java\tscript:void(0)').protocol,new URL('java\nscript:void(0)').protocol)"
```

full-artifact.js 只重建 audit-results 下的獨立測試副本，會覆寫該測試副本中的生成頁；不改受檢 repo，不觸發部署。
