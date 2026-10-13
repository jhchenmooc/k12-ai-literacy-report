# repo 拆分搬遷：PR-1 實作與審查提示詞

> 建立日期：2026-10-13。對應 [repo-split-plan.md](repo-split-plan.md) v0.5。管理者要求存檔備查。
>
> 用法：
> - 第一段：下週一（10/19）用量重置後，開新 session，模型選 Sonnet 5.5，repo 選 `jhchenmooc/k12-ai-literacy-report`，貼上整段。
> - 第二段：PR-1 的 PR 開好、合併前，開新 session，模型選 Opus 5.5，把〔PR 編號〕換成實際編號後貼上。
> - 不使用 Fable：它扣的是同一份每週總額度，而且扣得更快（Claude 說明中心「Claude Fable models on your plan」）。

## 一、PR-1 實作（Sonnet 5.5）

```
請實作 repo 拆分搬遷方案的 PR-1。這個 session 請節省用量：不開子代理、不做多輪或多模型審查，完成後只做一次自檢並跑完整測試。

【先讀】
方案還沒合併到 main，放在分支 claude/elegant-fermi-fboiru。請先 git fetch origin claude/elegant-fermi-fboiru，再用 git show 讀：
1. research/repo-split-plan.md（v0.5）：第 3.2 節、第 4 節、第 5 節，以及第 7 節 PR-1 那一列和步驟 1b、4。
2. research/SESSION-HANDOFF.md 最後一段「2026-10-13｜repo 拆分搬遷」。
程式從最新的 main 開始改。

【PR-1 範圍】（只做這些）
1. 公開資料清單：在 research/public-site.js 新增獨立函式，只給 publish-public 用。現有網站清單（STATIC_HTML、RESOURCES、PUBLIC_DIRS）和舊站部署完全不變。
   - publication/claims、publication/sources：只取 issues.json 已登錄期別引用的快照，路徑不變；路徑必須在 publication/sources/ 內，拒絕 .. 與 symlink，SHA-256 必須等於 evidence_sha256。
   - knowledge-base：隱藏條件取 render-site.js 第 182 行條件與 research/ai-literacy-c-records.json 的聯集；relations 的主體或客體是隱藏紀錄就移除；indexes/ 由過濾後資料重新產生；search_runs notes 依方案的樣式改寫。
   - methods/：檔首加狀態說明；指向未公開檔案的相對連結改為純文字；框架 PDF 改連教育部官方頁。
2. 推送前檢查與內容掃描（方案第 4.2 節）：遠端檔案樹比對（首次部署時，公開 repo 必須沒有任何 commit）、清單相等、精確樣式掃描、allow-mentions.txt、不得有 symlink。
3. 網址常數 PUBLIC_SITE_ORIGIN、PUBLIC_REPO_URL：預設值等於現況，本 PR 不改值。
4. .github/workflows/publish-public.yml：
   - 只用 workflow_dispatch 觸發；job 加 if: github.ref == 'refs/heads/main'；開關 vars.ENABLE_PUBLIC_PUBLISH；
   - environment: public-site，金鑰讀 secrets.PUBLIC_DEPLOY_KEY；
   - concurrency: verified-pages；頂層 permissions: contents: read；第三方 action 釘完整 SHA；禁止 set -x；
   - 金鑰處理照方案第 4.3 節。GitHub 的完整 ssh-ed25519 主機公鑰行，要和 GitHub 文件的 SSH 指紋頁核對；
   - 推送目標 git@github.com:ailiteracytw/ailiteracytw.github.io.git；部署時產生 deploy.json，並做冒煙測試；
   - 另加一個 dispatch 輸入（例如 negative_test）：用金鑰嘗試 force push，預期被拒；被拒才算成功，不得改動公開 repo。這是步驟 4 的負向測試。
5. 方案第 3.2 節列的全部測試，加上 fixture 測試。

【限制】
- 不改出版閘門、不改已刊頁面、不改現有網站清單、不改任何 GitHub 設定。
- 我同意本 PR 在上述範圍內，新增與修改 research/ 下的測試與驗證程式。
- 完成後開 PR，不要合併。PR 說明要寫明：對現有網站無影響、開關預設關閉。

【提醒我】
PR-1 快完成時提醒我做步驟 1b（方案第 7 節）。secret 名稱是 PUBLIC_DEPLOY_KEY，environment 名稱是 public-site。
```

## 二、合併前審查（Opus 5.5）

```
請審查 PR #〔PR 編號〕（repo 拆分搬遷的 PR-1）。這是唯讀審查：不要推送、不要留 GitHub 留言、不開子代理。只審下面三類檔案，其他部分略過，以節省用量。

【背景】
方案在分支 claude/elegant-fermi-fboiru 的 research/repo-split-plan.md（v0.5），審查前先用 git show 讀第 3.2、4.1–4.3 節。
這個 workflow 會用部署金鑰，把內容推到公開 repo ailiteracytw/ailiteracytw.github.io。任何漏洞都可能讓未刊草稿、候選池、排程或 session ID 被推到公開網站，所以以安全為第一優先。

【一、.github/workflows/publish-public.yml】
- 只有 workflow_dispatch 觸發；沒有 pull_request、pull_request_target、workflow_run。
- job 有 if: github.ref == 'refs/heads/main'，並檢查 vars.ENABLE_PUBLIC_PUBLISH。
- 頂層 permissions: contents: read；concurrency: verified-pages。
- github.event.* 與 inputs.* 沒有直接放進 run:，都經過 env:。
- 第三方 action 都釘完整 SHA；checkout 不保留憑證。
- 金鑰處理：
  - umask 077，由 env: 寫入 $RUNNER_TEMP；
  - known_hosts 用完整 ssh-ed25519 公鑰行，並請你和 GitHub 文件的 SSH 指紋頁核對；
  - 設 StrictHostKeyChecking=yes、IdentitiesOnly=yes、UserKnownHostsFile；
  - 不用 ssh-keyscan；if: always() 刪除金鑰檔；
  - 沒有 set -x、沒有 echo 出金鑰；錯誤訊息不會印出金鑰或檔案內容。
- commit 訊息與作者不含私人 commit SHA。
- negative_test 輸入：假設公開 repo 的分支規則沒設好，force push 真的成功，公開 repo 會不會被改壞？是否會自動還原？請具體推演。
- 冒煙測試：輪詢 deploy.json 有上限，失敗會讓 job 失敗。

【二、推送前檢查與內容掃描】
- 遠端檔案樹比對：「上次部署的 commit」記在哪裡？能否被繞過？首次部署是否真的要求公開 repo 沒有任何 commit？
- 推送內容必須等於公開資料清單；不得有 symlink；路徑不得跳出 repo（..、絕對路徑）。
- 掃描樣式：research/ 路徑、k12-ai-literacy-report-restricted、trig_ 後接 20 個以上英數字、session_01、claude.ai/code/。
- allow-mentions.txt 不能放行 trig_ 與 session_01；掃描失敗只列檔名與行號，不印內容。
- fixture 測試同時涵蓋應放行與應擋下的例子。
- 請想出至少三種可能漏掃的寫法（例如大小寫、URL 編碼、斷行、JSON 跳脫），逐一確認會不會被擋。

【三、公開資料推導與知識庫過濾】
- 只取 publication/issues.json 已登錄期別的 claims 與它們引用的快照；evidence_path 限定在 publication/sources/ 內，SHA-256 相符；未登錄的 m2026-10-* 快照不會進入公開清單。
- 知識庫隱藏條件 = render-site.js 第 182 行條件 ∪ research/ai-literacy-c-records.json；relations 的主體或客體是隱藏紀錄就移除；indexes/ 由過濾後資料重新產生。
- 請實際產生一次公開資料，對整個輸出搜尋每一個隱藏編號，確認一個都不在；並確認 search_runs notes 已改寫。
- 確認現有網站清單與舊站部署輸出和 main 完全相同。

【執行】
跑完整測試；實際產生一次公開資料輸出，並列出檔案數與目錄。

【回報格式】
- 依嚴重度排序（高、中、低）。每項寫：檔案與行號、具體的失敗情境（什麼輸入會造成什麼後果）、建議修法。
- 列出已檢查且沒問題的項目。
- 最後一句寫明：是否建議合併。
有高嚴重度問題時，先回報，不要自行修改；由我決定是否在這個 session 修正。
```

處理審查結果：高嚴重度由管理者決定在同一 session 修，或交回 Sonnet session 修；中、低嚴重度可留到 PR-2 一起處理。
