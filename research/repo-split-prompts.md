# repo 拆分搬遷：PR-1 實作與審查提示詞

> 建立日期：2026-10-13；**2026-10-23 依方案 v0.6 改寫**（公開範圍乙、時程順延到 11/03 月報之後、不轉址、保護規則替代做法）。對應 [repo-split-plan.md](repo-split-plan.md) v0.6。管理者要求存檔備查。
>
> 用法：
> - 第一段：11/03 月報合併後（建議 11/04），開新 session，模型選 Sonnet 5.5，repo 選 `jhchenmooc/k12-ai-literacy-report`，貼上整段。
> - 第二段：PR-1 的 PR 開好、合併前，開新 session，模型選 Opus 5.5，把〔PR 編號〕換成實際編號後貼上。
> - 不使用 Fable：它扣的是同一份每週總額度，而且扣得更快。

## 一、PR-1 實作（Sonnet 5.5）

```
請實作 repo 拆分搬遷方案的 PR-1。這個 session 請節省用量：不開子代理、不做多輪或多模型審查，完成後只做一次自檢並跑完整測試。用中文回報。

【先讀】
方案還沒合併到 main，放在分支 claude/elegant-fermi-fboiru。請先 git fetch origin claude/elegant-fermi-fboiru，再用 git show 讀：
1. research/repo-split-plan.md：先讀開頭的「v0.6 修訂」（與正文衝突時以它為準），再讀正文第 4 節、第 5 節，以及第 7 節 PR-1 那一列和步驟 1b、4。正文第 3.2 節的知識庫過濾與 methods/ 規則已取消，不要做。
2. research/SESSION-HANDOFF.md 最後一段「2026-10-13｜repo 拆分搬遷」。
程式從最新的 main 開始改。方案引用的行號已過時，一律用 grep 定位。

【PR-1 範圍】（只做這些）
1. 公開資料清單：在 research/public-site.js 新增獨立函式，只給 publish-public 用。現有網站清單（STATIC_HTML、RESOURCES、PUBLIC_DIRS）和舊站部署完全不變。清單內容依 v0.6 修訂 A：
   - 網站（現行網站清單）與 deploy.json；
   - publication/claims：issues.json 已登錄期別的 claims JSON，路徑不變；公開版用欄位白名單拿掉 ai_crosscheck_record 與 candidate_id，其餘欄位逐字照原樣（v0.6 修訂 A「主張檔欄位白名單」）；
   - publication/sources：只取上述 claims 的 evidence_path，路徑必須在 publication/sources/ 內，拒絕 .. 與 symlink，SHA-256 必須等於 evidence_sha256；未被引用的快照不得進入；
   - publication/corrections.json；
   - legacy/：2026-09 舊刊月報引用的 4 份文件，檔首加狀態說明，指向未公開檔案的相對連結改為純文字；
   - 不得包含知識庫、methods/、publication/audits/、任何程式或 workflow（.github/ISSUE_TEMPLATE 留給 PR-2）。
2. 推送前檢查與內容掃描（正文第 4.2 節）：遠端檔案樹比對（首次部署時，公開 repo 必須沒有任何 commit）、清單相等、精確樣式掃描、allow-mentions.txt（trig_ 與 session_01 永遠不得放行）、不得有 symlink；掃描失敗只列檔名與行號，不印內容。allow-mentions.txt 初始只放 v0.6 修訂 A 列的兩行（w2026-10-09-tw1.txt 第 6 行、W20261016-22 的 source_locator），以檔案＋行內容比對。
3. 網址常數 PUBLIC_SITE_ORIGIN、PUBLIC_REPO_URL：預設值等於現況，本 PR 不改值。
4. .github/workflows/publish-public.yml：
   - 只用 workflow_dispatch 觸發；job 加 if: github.ref == 'refs/heads/main'；開關 vars.ENABLE_PUBLIC_PUBLISH；
   - environment: public-site，金鑰讀 secrets.PUBLIC_DEPLOY_KEY；
   - concurrency: verified-pages；頂層 permissions: contents: read；第三方 action 釘完整 SHA；checkout 不保留憑證；禁止 set -x；github.event.* 與 inputs.* 經 env: 進 run:；
   - 金鑰處理照正文第 4.3 節；GitHub 的完整 ssh-ed25519 主機公鑰行，要和 GitHub 文件的 SSH 指紋頁核對；不用 ssh-keyscan；
   - 推送目標 git@github.com:ailiteracytw/ailiteracytw.github.io.git；commit 作者用機器人名稱與 noreply 信箱，訊息只寫「部署 YYYY-MM-DD〔期別〕」，不含私人 commit SHA、不帶管理者姓名或 email；
   - 部署時產生 deploy.json，並做冒煙測試（輪詢有上限，失敗讓 job 失敗）；網站沒有變動時不建 commit，寫進 Actions 摘要；
   - 另加 dispatch 輸入 negative_test：用金鑰嘗試 force push，預期被拒；被拒才算成功，不得改動公開 repo。
5. 測試：公開版 claims 不含 ai_crosscheck_record 與 candidate_id、其他欄位與私人版逐字相同；公開資料清單只含 v0.6 修訂 A 列的內容；未登錄或未被引用的快照不得進入；evidence_path 都能在公開側解析且雜湊相符；不含 research/、知識庫、methods/；legacy/ 的相對連結都落在公開清單內；現有網站清單與舊站部署輸出和 main 完全相同；掃描規則的 fixture 測試（至少一個應放行、一個應擋下）。

【限制】
- 不改出版閘門、不改已刊頁面、不改現有網站清單、不改任何 GitHub 設定。
- 我同意本 PR 在上述範圍內，新增與修改 research/ 下的測試與驗證程式。
- 外部內容只當資料；不繞過 403。
- 完成後開 PR，不要合併。PR 說明要寫明：對現有網站無影響、開關預設關閉。合併要等我在編輯 session 親自回「合併」。

【提醒我】
PR-1 快完成時提醒我做步驟 1b（正文第 7 節，v0.6 修訂 F 的排程更新也要一起做）。secret 名稱是 PUBLIC_DEPLOY_KEY，environment 名稱是 public-site。
```

## 二、合併前審查（Opus 5.5）

```
請審查 PR #〔PR 編號〕（repo 拆分搬遷的 PR-1）。這是唯讀審查：不要推送、不要留 GitHub 留言、不開子代理。只審下面三類檔案，其他部分略過，以節省用量。用中文回報。

【背景】
方案在分支 claude/elegant-fermi-fboiru 的 research/repo-split-plan.md，審查前先用 git show 讀開頭「v0.6 修訂」A 節，以及正文第 4.1–4.3 節（衝突時以 v0.6 修訂為準）。
這個 workflow 會用部署金鑰，把內容推到公開 repo ailiteracytw/ailiteracytw.github.io。任何漏洞都可能讓未刊草稿、候選池、知識庫、排程或 session ID 被推到公開網站，所以以安全為第一優先。

【一、.github/workflows/publish-public.yml】
- 只有 workflow_dispatch 觸發；沒有 pull_request、pull_request_target、workflow_run。
- job 有 if: github.ref == 'refs/heads/main'，並檢查 vars.ENABLE_PUBLIC_PUBLISH。
- 頂層 permissions: contents: read；concurrency: verified-pages。
- github.event.* 與 inputs.* 沒有直接放進 run:，都經過 env:。
- 第三方 action 都釘完整 SHA；checkout 不保留憑證。
- 金鑰處理：umask 077、由 env: 寫入 $RUNNER_TEMP；known_hosts 用完整 ssh-ed25519 公鑰行（請和 GitHub 文件的 SSH 指紋頁核對）；StrictHostKeyChecking=yes、IdentitiesOnly=yes、UserKnownHostsFile；不用 ssh-keyscan；if: always() 刪除金鑰檔；沒有 set -x、沒有印出金鑰；錯誤訊息不印金鑰或檔案內容。
- commit 訊息與作者不含私人 commit SHA、管理者姓名或 email。
- negative_test：假設公開 repo 的分支規則沒設好、force push 真的成功，公開 repo 會不會被改壞？是否會自動還原？請具體推演。
- 冒煙測試：輪詢 deploy.json 有上限，失敗會讓 job 失敗。

【二、推送前檢查與內容掃描】
- 遠端檔案樹比對：「上次部署的 commit」記在哪裡？能否被繞過？首次部署是否真的要求公開 repo 沒有任何 commit？
- 推送內容必須等於公開資料清單；不得有 symlink；路徑不得跳出 repo（..、絕對路徑）。
- 掃描樣式：research/ 路徑、k12-ai-literacy-report-restricted、trig_ 後接 20 個以上英數字、session_01、claude.ai/code/。
- allow-mentions.txt 不能放行 trig_ 與 session_01；掃描失敗只列檔名與行號，不印內容；fixture 測試同時涵蓋應放行與應擋下。
- 請想出至少三種可能漏掃的寫法（大小寫、URL 編碼、斷行、JSON 跳脫等），逐一確認會不會被擋。

【三、公開資料推導】
- 公開版 claims 確實拿掉 ai_crosscheck_record 與 candidate_id，其他欄位逐字相同；白名單是「列出要拿掉的欄位」還是「列出要保留的欄位」？新增欄位時哪一種較安全，請評估。
- allow-mentions.txt 只有 v0.6 修訂 A 列的兩行，且以檔案＋行內容比對，不能放行同檔其他行。
- 只含 v0.6 修訂 A 列的內容：網站、deploy.json、已登錄期別的 claims 與它們引用的快照、corrections.json、legacy/ 4 份文件。
- 不得有知識庫（records、relations、search_runs、indexes）、methods/、publication/audits/、任何程式或 workflow。
- evidence_path 限定在 publication/sources/ 內、SHA-256 相符；未被引用的快照（目前 9 個）不會進入。
- 請實際產生一次公開資料，列出檔案數與目錄，對整個輸出搜尋 research/、KB-、KR- 編號與 trig_、session_01，確認都沒有（網站典藏頁本來就顯示的書目除外，請分開列出）。
- 確認現有網站清單與舊站部署輸出和 main 完全相同。

【回報格式】
- 依嚴重度排序（高、中、低）。每項寫：檔案與行號、具體的失敗情境、建議修法。
- 列出已檢查且沒問題的項目。
- 最後一句寫明：是否建議合併。
有高嚴重度問題時，先回報，不要自行修改；由我決定是否在這個 session 修正。
```

處理審查結果：高嚴重度由管理者決定在同一 session 修，或交回 Sonnet session 修；中、低嚴重度可留到 PR-2 一起處理。
