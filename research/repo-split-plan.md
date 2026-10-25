# 拆分為私人來源 repo 與公開網站 repo：搬遷方案 v0.9

> 建立日期：2026-10-13；v0.7 改寫日期：2026-10-23。本方案不改任何程式、設定或 repo；所有 GitHub 設定變更（repo 可見度、轉移、金鑰、Pages、ruleset、App 安裝）由管理者親自操作。
>
> 修訂紀錄：
> - v0.1–v0.4（2026-10-13）：三輪模型模擬審查（見 [repo-split-plan-reviews.md](repo-split-plan-reviews.md)）；審查與修正都是 Anthropic 模型執行，不是外部真人審查。
> - v0.5（2026-10-13）：管理者決定全拆、改用組織 `ailiteracytw`。
> - v0.6（2026-10-23）：公開範圍改為「只放網頁與精簡摘錄」。
> - v0.7（2026-10-23）：依兩路多角度自檢（一致性與可行性；安全與 GitHub 文件核對）全面改寫，取代先前各版正文。管理者「照建議，第 4 項選 (a)」。
> - v0.8（2026-10-24）：依第二輪兩路自檢（PR-1 實作演練；攻防與外洩演練）修正 4.1、4.2、4.4–4.7、第 2、6、8、12、13 節。管理者「照建議」。
> - v0.9（2026-10-25）：依第三輪兩路自檢（一致性與實作演練；管理者操作與回退）修正。管理者「照建議，同意第 3 項」（改現有 CI 的排隊群組）。之後不再單獨自檢方案，剩餘細節由 PR-1 合併前審查與步驟 4 實測處理。
> - **v0.9.1（2026-10-25）**：第四輪自檢（無高、5 項中）的小修：CI 排隊群組改為「PR 一組、push 與手動執行一組」、冒煙測試略過快取、`deploy.json` 不加結尾斜線、Pages 上傳 action 用 v4 以上、步驟 1b 的 App 安裝與 Windows 金鑰指令。管理者「照建議」。
>
> PR-1 實作與審查提示詞見 [repo-split-prompts.md](repo-split-prompts.md)。本檔放在目前仍公開的 repo 分支上，**不寫排程或 session 編號**。

## 0. 已決定事項

| 項目 | 決定 |
|---|---|
| 拆分方式 | 全拆：原 repo 改私人並轉到組織；公開 repo 只收部署（2026-10-13） |
| 帳號 | GitHub 組織 `ailiteracytw`，由管理者現有帳號建立並擔任擁有者，不另開個人帳號（2026-10-13；步驟 1a 已完成） |
| 公開範圍 | 只放網頁與每期精簡摘錄 `evidence/`（2026-10-23，第 2 節） |
| 分析型項目 | 只公開主張編號與依據的主張編號（2026-10-23，第 4 項選 (a)） |
| 舊網址 | 不轉址；舊網址只有兩人知道，管理者直接告知（2026-10-23） |
| 付費方案 | 不升級 Pro／Team；私人 repo 的保護規則以合併前檢查加每週稽核替代（2026-10-23，第 10 節） |
| 部署金鑰 | 接受「能推送到私人 repo 的人都用得到部署金鑰」並照實寫明（2026-10-13 S9 甲） |
| 推送紀錄 | 用部署金鑰推送時，公開 repo 的推送紀錄顯示加入金鑰的管理員帳號；接受，不另開機器帳號（2026-10-24） |

## 1. 目標

- 公開 repo `ailiteracytw/ailiteracytw.github.io` 只放讀者需要的網頁，以及讓讀者自行對照原文的精簡摘錄。
- 程式、閘門、測試、候選池、完整主張檔、快照、知識庫、方法文件、查核紀錄、草稿都留在私人 repo，避免被 fork 或複製。
- 網址：`https://ailiteracytw.github.io/`（網站在根路徑）。
- 以前公開期間的歷史無法收回（第 11 節）。

## 2. 公開 repo 的內容

| 位置 | 內容 | 規則 |
|---|---|---|
| 根目錄 | 網站：現行網站清單（`public-site.js` 的 STATIC_HTML、RESOURCES、PUBLIC_DIRS）**扣掉 `publication/issues.json`**；`deploy.json` | 網頁不讀取 issues.json（2026-10-23 核對）；新函式過濾 `inventory()` 的輸出即可，舊站清單與出版閘門不改。`deploy.json` 內容：臺北日期、最新一期路徑（已登錄的**每日短訊**中日期最新者，例如 `daily/2026-10-23/`；週報、月報路徑的日期格式不一，不納入比較）、其他檔案的內容雜湊、上一次部署的公開 repo SHA（首次為空）；不放私人提交 SHA |
| `evidence/<claims 檔名>` | 每個 `issues.json` 已登錄期別一檔，檔名沿用 `claims_file` 的檔名（例如 `daily-2026-10-23.json`） | 見下方「evidence 規則」 |
| `README.md` | 說明這是網站發布 repo、`evidence/` 的用途、如何回報錯誤 | 範本放私人 repo 的 `research/public-repo/README.md`，PR-1 先放最小版、PR-2 定稿；不在公開 repo 直接編輯 |
| `.github/ISSUE_TEMPLATE/` | 讀者回饋表單 | 複製私人 repo 的 `.github/ISSUE_TEMPLATE/reader-feedback.yml` |
| `.github/workflows/pages.yml` | 極小的 Pages 部署流程（第 4.5 節） | 範本放 `research/public-repo/pages.yml`（**不得放在私人 repo 的 `.github/workflows/`**，否則會在私人 repo 執行）；`.github/` 底下的檔案集合與內容雜湊固定，推送前比對 |

**evidence 規則**：
- 只取 `issues.json` 已登錄期別的主張；未登錄期別（例如月報草稿）不出現。
- **一般項目**：每則只輸出 7 個欄位 `claim_id`、`source_title`、`title_zh`、`source_organization`、`source_url`、`first_disclosed_on`、`original_excerpt`；沒有的欄位省略（2026-10-23 一般項目中 13 則中文原文沒有 `title_zh`）；值逐字照私人端。
- **分析型項目**（有 `supporting_claim_ids` 者，例如週報導讀、臺灣對照說明；2026-10-23 共 10 則）：只輸出 `claim_id` 與 `supporting_claim_ids`。理由：它們的 `source_url` 是本刊舊站網址、`original_excerpt` 是內部交叉引用，不是原文；讀者由依據的主張找到原文。
- 欄位是**保留清單**：私人端以後新增的欄位一律不公開，不需逐次決定。
- 2026-10-23 核對：90 則主張的 7 個欄位都沒有作業紀錄字樣（research/、trig_、session_01、KB-、curl、403、pdftotext、sha256）。

**不公開**：快照（`publication/sources/`）、完整 claims、`corrections.json`（更正頁已顯示更正內容）、`issues.json`、`publication/audits/`、知識庫、方法文件、舊刊引用的內部文件、整理程式。理由：快照書目行與主張的多數欄位含作業紀錄（全文由誰提供、403、讀取工具、全文雜湊、知識庫編號），且快照雜湊已鎖定不能刪改。

## 3. 私人端

- 現有 repo 在切換時改私人並轉到組織（`ailiteracytw/k12-ai-literacy-report`），保留歷史、Issue、PR。
- 出版閘門、測試、每日短訊、週報、月報流程都不變，照舊在私人 repo 開 PR、跑 verify、等管理者回「合併」（每日短訊照權限 B）。
- `k12-ai-literacy-report-restricted` 也轉到組織（步驟 3），維持私人。
- 新快照與主張不寫內部路徑、repo 名稱、session 或排程編號、全文由誰提供（`PUBLICATION-CONTRIBUTING.md`，2026-10-23 #375 已合併）。

## 4. 部署流程與安全

### 4.1 `publish-public.yml`（私人 repo，獨立 workflow）

- **觸發**：PR-1 只用 `workflow_dispatch`；PR-3 再加 `push: branches: [main]`。不使用 `pull_request`、`pull_request_target`、`workflow_run`。
- **開關**：`vars.ENABLE_PUBLIC_PUBLISH`（預設關）。
- **只發布已驗證的提交**（私人 repo 在免費方案下 main 沒有保護）：job 層加 `actions: read`、`pull-requests: read`，開頭依序確認：
  1. `GET /repos/{repo}/git/ref/heads/main` 的 SHA 等於 `github.sha`（是 main 的 HEAD），之後一律以這個 SHA checkout；
  2. `GET /repos/{repo}/actions/workflows/verify-and-deploy.yml/runs?head_sha=<SHA>&event=push` 找到該 SHA 的 push 執行，且其中 **verify job** 的結論為 success（看 job，不看整個 run：步驟 8 前舊站 deploy job 失敗不應擋住發布）。本 repo 一律 squash 合併，PR 上的 verify 跑的是另一個 SHA，不能代替。執行尚未建立或還在跑就輪詢，上限 20 分鐘，逾時停止。
  3. `GET /repos/{repo}/commits/<SHA>/pulls` 有一個已合併的 PR，且其 `merge_commit_sha` 等於該 SHA。
  第 1 點不符（main 已被較新的提交取代）時以「略過」結束，不算失敗；第 2、3 點不符或逾時才算失敗。不另在本 workflow 複製 verify 步驟（會走樣）。**這道檢查只防意外**（直接推送、CI 未過就合併），防不了有寫入權、存心繞過的人（與第 0 節部署金鑰的決定一致）。`if: github.ref == 'refs/heads/main'` 只防誤觸。job 層權限要寫完整 `contents: read, actions: read, pull-requests: read`（job 層設定會整個取代頂層）。
- **排隊群組**：用自己的群組 `publish-public`，不與 `verify-and-deploy.yml` 共用。**現有 `verify-and-deploy.yml` 的排隊群組改為依事件分開**：PR 一組、push 與手動執行共用另一組，寫法 `verified-pages-${{ github.event_name == 'pull_request' && 'pr' || 'main' }}`（管理者 2026-10-25 同意改現有 CI）。不可單純依 `event_name` 分組，否則 push 與手動執行落在不同組，舊站可能同時跑兩次部署、較舊的 SHA 蓋掉較新的。目的：避免 PR 的 verify 與 main 的 verify 互相取消、使 main 上的提交沒有 success 而卡住部署（最近 100 次執行已發生 1 次取消）。
- **寫法**：頂層 `permissions: contents: read`，其他權限只在 job 層加；第三方 action 釘完整 SHA（用 `git ls-remote https://github.com/actions/<name> refs/tags/<確切版本>` 取得，PR 說明列出版本與 SHA 對照）；checkout 不保留憑證；`github.event.*` 與 `inputs.*` 經 `env:` 進 `run:`；禁止 `set -x`。
- **輸出目錄**：推導結果放 `_public_repo/`（加入 `.gitignore`），不與 `_public_site/` 共用。
- **金鑰**：secret 名稱 `PUBLIC_DEPLOY_KEY`。步驟 1b 先放在 `environment: public-site`（只允許 main）；免費方案私人 repo 不能使用 environment secret，所以步驟 9 改私人後**重新產生一把金鑰**存為 repo secret、撤銷舊的，再以小 PR 拿掉 `environment:`（第 8 節）。secret 存入後讀不回來，不能「搬移」。

### 4.2 推送前檢查（任一失敗就停止）

1. **公開 repo 沒有被別人改過（SHA 鏈）**：先用 `git ls-remote` 判斷公開 repo 是否為空（首次部署時必須沒有任何提交）。非首次時 fetch 公開 repo 的 main，確認：(a) 遠端 HEAD 的 `deploy.json` 所記內容雜湊等於遠端檔案（扣掉 `deploy.json`）的實際雜湊；(b) 遠端 HEAD 的父提交等於其 `deploy.json` 記的「上一次部署 SHA」；「沒有父提交」只在「上一次部署 SHA 為空」（即遠端 HEAD 是首次部署）時成立。推導函式在 fetch 公開 repo 之後才產生 `deploy.json`，把遠端 HEAD 的 SHA 當參數傳入。任一不符代表有人直接改了公開 repo，停止並回報。這只偵測一般的手動修改，防不了刻意重算雜湊的人。不以「作者名稱」判斷（可偽造）。
2. **內容等於推導結果**：清空工作樹後放入推導結果，檔案集合必須等於公開清單；不得有 symlink；路徑不得跳出（`..`、絕對路徑）。`.github/` 底下只能有 `ISSUE_TEMPLATE/reader-feedback.yml` 與 `workflows/pages.yml`，且內容雜湊等於私人端範本。
3. **精確樣式掃描**（只擋本 repo 的內部痕跡，不擋外部網址）：
   - 本 repo 的內部路徑：`research/` 後接本 repo 實際存在的頂層目錄或檔名（由程式依 `git ls-files research/` 產生清單比對），或 `github.com/<任何帳號>/k12-ai-literacy-report` 後接 `/blob/`、`/tree/`；外部網址中的 `/research/`（例如 KEDI 的 `kedi.re.kr/.../research/...`）不擋；
   - `k12-ai-literacy-report-restricted`、`trig_` 後接 20 個以上英數字、`session_01` 後接英數字、`claude.ai/code/`。
   - `allow-mentions.txt` 以「檔案＋命中的完整網址或路徑」放行（命中字串延伸到引號或空白為止，不只放行網址開頭，否則以後新增的連結也會被放過；不用整行，典藏頁一行可達 300 KB 且常改）；`trig_` 與 `session_01` 永遠不得放行。PR-1 預先放行現有網站中、PR-4 才會改掉的舊連結（2026-10-24 以 main 實測，共 7 檔：`assets/archive-filter.js` 的註解路徑；`about/` 的 venue-watchlist 連結；`archive/journals/`、`archive/policy/`、`archive/conferences/` 的知識庫連結；`monthly/2026-09/` 的 3 份內部文件連結；`weekly/2026-09-29_10-08/` 的 1 份內部文件連結），每筆註明「PR-4 刪除」；PR-4 合併時刪除這些放行。
   - 掃描失敗只列檔名與命中字串的位置，不印內容。原文逐字摘錄若剛好命中，由管理者決定是否放行。
4. **空差異**：比對網站有沒有變動時排除 `deploy.json`；沒有變動就不建提交，寫進 Actions 摘要（驗收期的「實際變更」以此為準）。

### 4.3 推送

- 用部署金鑰推到公開 repo 的 main，每次一個新提交；作者固定為機器人名稱（例如「ailiteracytw 部署」）與不屬於任何真人帳號的 noreply 信箱（不用 `github-actions[bot]` 或真人的 noreply 信箱，否則提交會歸到那個帳號）；訊息只寫「部署 YYYY-MM-DD〔期別〕」，不含私人提交 SHA、管理者姓名或 email。推送紀錄（pusher）會顯示加入金鑰的管理員帳號，已接受（第 0 節）。
- 金鑰處理：ed25519；`umask 077` 後經 `env:` 寫入 `$RUNNER_TEMP`；known_hosts 寫入 `github.com ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIOMqqnkVzrm0SdG6UOoqKLsabgH5C9okWi0dh2l9GKJl`（GitHub 文件 SSH 指紋頁所列 ed25519 指紋 `SHA256:+DiY3wvvV6TuJJhbpZisF/zLDA0zPMSvHdkr4UvCOqU`；PR-1 實作與審查時都要再對一次文件），workflow 內以 `ssh-keygen -lf` 核對指紋相符才繼續；不用 `ssh-keyscan`；`GIT_SSH_COMMAND` 設 `IdentitiesOnly=yes`、`StrictHostKeyChecking=yes`、`UserKnownHostsFile`；步驟結尾 `if: always()` 刪除金鑰檔。

### 4.4 冒煙測試

- **固定測新網址** `https://ailiteracytw.github.io/`，與網址常數無關（PR-1 時網址常數仍是舊站）。輪詢 `deploy.json`（每 30 秒、最多 15 分鐘；請求加 `?v=<run_id>-<attempt>` 略過 Pages 的 10 分鐘快取），直到其內容雜湊等於本次推送值；再抓首頁與 `deploy.json` 記的最新一期，必須回 200；失敗讓 job 失敗。
- 目錄網址（首頁、最新一期）帶結尾斜線（否則 Pages 回 301）；`deploy.json` 是檔案，不加。
- dispatch 輸入 `skip_smoke`：只在首次推送遇到 Pages 尚未就緒時使用，改寫警告。

### 4.5 公開 repo 的 Pages

- GitHub 文件把「用部署金鑰推送」列為分支部署的網站**可能不會建置**的原因之一，所以 Pages 來源改為 **GitHub Actions**：公開 repo 放 `.github/workflows/pages.yml`，在 `push` 到 main 時觸發，另加 `workflow_dispatch`（供首次部署或內容未變時手動重跑），用 `actions/upload-pages-artifact`（**v4 以上**，舊版內部以 tag 引用其他 action，可能被「強制釘 SHA」擋下；不要照抄現有 CI 的 v3）與 `actions/deploy-pages`（釘 SHA）發布根目錄；權限放 job 層（`pages: write`、`id-token: write`、`contents: read`）、`environment: github-pages`、`concurrency: {group: pages, cancel-in-progress: false}`。`upload-pages-artifact` 會排除點開頭的檔案；網站唯一的點開頭檔 `.nojekyll` 在 Actions 來源下不需要。
- 部署金鑰推送能否觸發 `pages.yml`、能否推送 `.github/workflows/` 下的檔案，文件未寫明，**步驟 4 首次推送時實測**：`pages.yml` 有執行、網站內容等於推送值。不成立時回報管理者再議。

### 4.6 公開 repo 的保護

- **ruleset**：禁止 force push、禁止刪除 main；另一條規則禁止建立 main 以外的分支與所有 tag（部署金鑰推到其他分支也會公開）；不要求 PR；bypass 留空，**不得把部署金鑰加入 bypass**。免費組織的公開 repo 可用 ruleset（GitHub 文件）。
- **Actions 設定**（公開 repo 的 Settings → Actions）：Workflow permissions 設為唯讀；Allowed actions 只允許 GitHub 官方 action；開啟「Require actions to be pinned to a full-length commit SHA」；外部貢獻者的 fork PR 一律要核准才執行。
- **限制檔案路徑做不到**：推送規則只適用私人與內部 repo，所以私人端推送前檢查是唯一能擋內容的防線。
- **Claude GitHub App 不得能寫入公開 repo**：組織的 App 安裝只選私人 repo 與 restricted repo，明確排除 `ailiteracytw.github.io`；步驟 3 確認各 session 對公開 repo 只能讀或讀不到。
- **組織不得停用部署金鑰**：組織設定停用部署金鑰時，既有金鑰全部失效。
- 不設 interaction limits（會擋讀者回饋）。

### 4.7 負向測試（步驟 4）

dispatch 輸入 `negative_test`：以 `git commit-tree <遠端 HEAD 的 tree>` 建立**沒有父提交**的提交（內容相同、一定是非快轉），用金鑰 force push 到 main，預期被拒；被拒才算成功。這次執行不做一般部署。萬一被接受，立即把遠端 main 推回原本的 SHA（同樣需要 force push，若也被接受即恢復；失敗則立刻通知管理者手動處理），讓 job 失敗並回報管理者。

### 4.8 金鑰輪替與誤推處置

- 部署金鑰每年輪替；交接檔記輪替日期，每日短訊在到期前 14 天提醒。
- 誤推私人內容：(0) **先止血**：公開 repo Settings → Pages → Unpublish site；(1) 開關設 false、撤銷金鑰；(2) 管理者用自己的帳號：公開 repo 的 ruleset 設為 Disabled → 在自己電腦執行 `git push --force origin <上一次正常部署 SHA>:main` → **立即把 ruleset 設回 Active**（重設到上一次正常提交，SHA 鏈自然成立），並刪除該次 `pages.yml` 的執行紀錄（其中的 Pages artifact 含誤推內容）；編輯 session 可協助寫指令，但不經手任何憑證；(3) 向 GitHub Support 請求清除快取與懸空提交；(4) 檢查有無新 fork；(5) 記錄外洩範圍，必要時依更正政策對外說明，接受無法保證收回。

## 5. 頁面、網址與測試（PR-4）

- **網址常數只留一個來源**：PR-1 新增 `PUBLIC_SITE_ORIGIN`（預設等於現況 `https://jhchenmooc.github.io`）與站台路徑（現況 `/k12-ai-literacy-report/`），`SITE_URL` 由兩者推導，不另寫死；`PUBLIC_REPO_URL` 預設等於現況。PR-4 才改值為 `https://ailiteracytw.github.io` 與 `/`、`https://github.com/ailiteracytw/ailiteracytw.github.io`。
- **已刊頁主文會變**：`SITE_URL` 寫在每期頁面 `<main>` 內的「引用本日／本期」句子；出版閘門與 renderer 輸出整頁比對，所以 PR-4 改常數並重新產生全部頁面，同時在 `corrections.json` 加一筆「網站搬遷：引用網址與頁尾連結更新」總說明（不逐期加 revised_on，管理者 2026-10-23）。
- **要改的位置**（一律用 grep 定位，不依行號）：
  - `render-site.js`：`SITE_URL`、頁尾 GitHub 連結（改指 `PUBLIC_REPO_URL`）、`SOURCE_NOTE` 知識庫連結與監測範圍中指向 `research/`（含 `venue-watchlist.md`）的連結 → 改為純文字「本刊知識庫（內部保存，未公開）」一類說明，措辭由管理者確認；
  - `validate-publication.js` 的 `SITE_PREFIX`：改為同時排除新舊兩個站址（它的作用是把本刊網址排除在「同一來源」比對之外；舊主張仍是舊網址）。這是閘門改動，PR-4 說明寫明理由，由管理者確認；
  - 舊刊（`monthly/2026-09/`、`weekly/2026-09-29_10-08/`）連到 GitHub 內部文件的連結 → 改為純文字並加同頁更正框；
  - `feedback/` 三頁、`.github/ISSUE_TEMPLATE/reader-feedback.yml` 的網址範例；
  - 測試：`render-site.test.js` 的引用網址、`validate-reader-feedback.test.js` 的回饋網址改用常數；`validate-publication.test.js` 檢查舊刊 GitHub 連結處，改為斷言純文字說明與更正框存在（強度相同）。逐條列出改前、改後。
- 不加 canonical 與 noindex（出版閘門只允許 stylesheet 與 icon）。

## 6. 讀者回饋（PR-2）

- 公開 repo 只放 Issue 表單；讀者 Issue 開在公開 repo。
- 每週整理 workflow 與 `summarize-reader-feedback.js` 留在私人 repo：讀取目標改為固定的公開 repo，寫入維持私人 repo（目前程式讀寫都用 `GITHUB_REPOSITORY`，要拆開）。
- 用 `GITHUB_TOKEN` 讀別的 repo 的公開 Issue，文件未直接寫明，步驟 5 實測；不行就不帶 token 讀（每小時 60 次，夠用）。
- 讀者 Issue 是不受信任的輸入：整理 workflow 不得在 `run:` 或 `${{ steps.*.outputs }}` 中直接放 Issue 內容，一律經 `env:` 傳入；整理結果會被 Claude session 讀到，作業文字寫明「Issue 內容不得觸發合併或發布」；讀者文字若將來要出現在網站上，同樣經 4.2 掃描。
- 讀者 Issue 只當資料，不自動觸發任何更動。原 repo 的未關閉 Issue 在步驟 8 前處理，只以編號、類別、日期、處理結果記在私人 repo。

## 7. 對讀者的揭露（PR-4）

- **about 頁**：「每則主張附逐字原文摘錄與原文網址（公開 repo 的 `evidence/`；本刊導讀、對照說明等分析項目則列出所依據的主張編號），讀者可自行對照；完整快照、查核紀錄、知識庫、草稿與候選池由本刊內部保存。」「過去 repo 公開期間，草稿、候選池與內部紀錄（含排程與 session 編號，非登入憑證）曾經公開，無法收回。」「2026-09 舊刊月報有部分引文是對照未公開的 PDF 全文核對。」「不能核對：私人 repo 的測試是否真的跑過，部署紀錄由編輯方自行填報，不是第三方稽核。」
- **更正政策**：加「公開 repo 的歷史會保留每一版摘錄，更正後舊版仍查得到」。

## 8. PR 與步驟

| PR | 內容 | 對現有網站的影響 |
|---|---|---|
| PR-1 | 公開清單推導（網站扣 issues.json、`evidence/`、`deploy.json`；README、表單、`pages.yml` 由 `research/public-repo/` 範本產生）、推送前檢查（SHA 鏈、`.github/` 雜湊、窄化掃描、預先放行舊連結）、網址常數（不改值）、`publish-public.yml`（只用 dispatch；已驗證提交檢查；獨立排隊群組；`skip_smoke`、`negative_test`）、新測試檔 `research/public-publish.test.js`（並在 `verify-and-deploy.yml` 的 verify job 加一行執行它） | 無（開關預設關；頁面與 main 逐位元相同） |
| PR-2 | 讀者回饋整理改為**新舊兩個 repo 的 Issue 都讀**（直到步驟 9），寫入維持私人 repo；公開 repo 的 README 定稿（表單照第 2 節直接複製） | 無 |
| PR-3 | `publish-public` 加 `push` 觸發，開始驗收期；不加公告 | 無 |
| PR-4（切換 PR） | 網址常數改值並重新產生頁面、更正紀錄、`SITE_PREFIX`、舊刊連結與更正框、`feedback/` 與表單、測試、about 頁與更正政策 | 已刊頁引用網址與頁尾連結變更 |
| PR-5 | 拿掉 `publish-public.yml` 的 `environment:`；**在步驟 9 第 (4) 項之後才開**（不受步驟 8「關閉所有 PR」影響），由管理者在網頁按合併，或先讓編輯 session 連上新 repo 名稱再合併；同時讀者回饋整理改為只讀公開 repo | 無 |

| 步驟 | 內容 | 誰做 |
|---|---|---|
| 1a | **已完成（2026-10-13）**：組織、App 安裝、空的 `ailiteracytw.github.io`（私人） | 管理者 |
| 1b | PR-1 接近完成時，管理者依下列操作（編輯 session 可在旁逐步說明）：<br>(1) `ailiteracytw.github.io` Settings → General → Danger Zone → Change visibility → Public，確認仍無提交；<br>(2) Settings → Pages → Source 選 **GitHub Actions**（空 repo 若設不了，改在步驟 4 首次推送前設）；<br>(3) Settings → Rules → Rulesets：(a) New branch ruleset，目標 Include default branch，勾 Restrict deletions、Block force pushes；(b) 另一個 branch ruleset，目標 Include all branches 再 Exclude default branch，勾 Restrict creations（找不到 Exclude default branch 時，改用 Exclude by pattern 填 `main`）；(c) New tag ruleset，目標所有 tag，勾 Restrict creations；三個都 Active、Bypass list 留空；<br>(4) Settings → Actions → General：Actions permissions 選允許本組織與指定的 action，只勾 Allow actions created by GitHub；若畫面有「Require actions to be pinned to a full-length commit SHA」就勾選；fork PR 選 Require approval for all external contributors；Workflow permissions 選 Read repository contents；<br>(5) 組織 Settings → Access → Member privileges → Deploy keys 選 **Enabled** → Save（新組織預設停用）；<br>(6) 產生金鑰：Windows PowerShell 或 macOS 終端機先輸入 `cd ~`，再輸入 `ssh-keygen -t ed25519 -C ailiteracytw-deploy -f ailtw_deploy`，問密碼時直接按兩次 Enter；公鑰（`ailtw_deploy.pub`）加到公開 repo Settings → Deploy keys → Add deploy key，勾 Allow write access；私鑰全文（含 BEGIN、END 兩行）存到原 repo Settings → Environments → New environment `public-site` → Deployment branches 選 Selected branches 加 `main` → Add secret，名稱 `PUBLIC_DEPLOY_KEY`；**私鑰不得貼進任何 Claude 對話或截圖**；用完以 `Remove-Item`／`rm` 刪除兩個檔案，不要丟資源回收筒；<br>(7) 組織的 Claude App：此時組織裡只有公開 repo，「只選部分 repo」至少要選一個，所以先**解除安裝**（組織 Settings → GitHub Apps → Claude → Uninstall），步驟 3 再安裝並只選私人 repo | 管理者 |
| 2 | 讀最近 10 次 run 的實際分鐘數，估每月用量，須低於 2,000 分鐘的 80% | 編輯 session |
| 3 | **restricted repo 轉移日**（挑一天，當日 08:22 短訊合併後一次做完）：(1) 管理者把 `k12-ai-literacy-report-restricted` 轉到組織（Settings → General → Danger Zone → Transfer ownership）；(2) 在組織重新安裝 Claude App，只選它（步驟 1b 已解除安裝；明確不選 `ailiteracytw.github.io`）；(3) 編輯 session 用 `list_triggers` 列出排程、逐一 `get_trigger`，以 `update_trigger` 更新 repo 名稱；(4) 各 session 重新加入新名稱的 repo 並 `git remote set-url`；雲端環境選用的 repo 由管理者在 claude.ai 環境設定改；(5) 各 session 在組織的 restricted repo 開測試 PR、合併；(6) 確認各 session 對公開 repo 不能寫入 | 管理者、編輯 session |
| 4 | 合併 PR-1；設 `ENABLE_PUBLIC_PUBLISH=true`；手動首次推送（Pages 尚未就緒才用 `skip_smoke`）；確認公開 repo 的 `pages.yml` 有執行、網站正確（沒有執行就手動 dispatch `pages.yml`）；跑 `negative_test`，確認被拒的原因是規則擋下（例如錯誤碼 GH013），不只是推送失敗；以第 9 節清單驗收 | 編輯 session、管理者 |
| 5 | 合併 PR-2；在公開 repo 送一則測試 Issue，確認私人端整理讀得到（舊 repo 的 Issue 也照常讀到） | 編輯 session、管理者 |
| 6 | 合併 PR-3，開始驗收期；每日短訊在 daily-check 加「publish-public 驗收」一節 | 編輯 session、管理者 |
| 7 | 驗收期：連續 7 個日曆日 `publish-public` 沒有失敗，其中至少 3 天有實際網站變更；漏記一天就算失敗，不得為湊天數製造變更 | 自動 |
| 8 | 切換日：暫停當日每日短訊一次；合併或關閉所有開啟中的 PR；處理原 repo 未關閉的 Issue；合併 PR-4；`vars.ENABLE_VERIFIED_PAGES_DEPLOY` 設 false（舊站部署 job 保留至少一個月） | 編輯 session、管理者 |
| 9 | 依序：(1) 列出現有 fork 記入交接檔；(2) `ENABLE_PUBLIC_PUBLISH` 設 false；(3) 刪除 `public-site` environment（改私人後設定頁可能看不到）；(4) **原 repo 先改私人（舊站隨之下架；私人 repo 不能用 environment secret），再轉到組織**；(5) 組織的 App 安裝加入此 repo（安裝不會隨轉移），確認 Actions 變數仍在；(6) **重新產生部署金鑰**（照 1b 第 (6) 項，改存到 Settings → Secrets and variables → Actions → Repository secrets），撤銷舊金鑰；(7) 開 PR-5 並合併（開關關著，這次觸發不會推送）；(8) 開關設回 true，手動 dispatch 一次並確認冒煙測試通過；(9) 更新各 session 的 git remote、雲端環境選用的 repo 與排程（同步驟 3 的做法）；若步驟 8 以停用排程暫停短訊，當日恢復並以 `get_trigger` 確認。排在 08:22 每日短訊之外，也避開管理者當天回覆「合併」的時段 | 管理者（約 45 分鐘）、編輯 session |
| 10 | 驗收；更新交接檔、SOP、README；隔日短訊照常，前一日項目若仍在 7 天內就補發 | 編輯 session、管理者 |

**時程**：
- 規則凍結到 11/03；月報 11/01 檢查、11/03 出刊。**PR-1 在 11/03 月報合併後才開始**（11/04 起）。
- PR-1 之後依序走審查、步驟 1b、首次推送、PR-2、PR-3，再加 7 天驗收期；**切換最早約 11/16（一）**，未達條件就延後；11/30 仍未達成，由管理者決定是否放棄。
- 切換日與步驟 9 避開週五（週報）、週四（週四清單）、每月 1、3 日，以及 08:22 每日短訊。

## 9. 驗收清單

- 新站各網址（首頁、daily、weekly、monthly、archive 五頁、about、corrections、feedback 三頁、design-system）在桌面與手機都回 200，沒有水平溢出。
- 公開 repo 的檔案集合等於公開清單；`deploy.json` 為本次推送值；`pages.yml` 有執行。
- 公開 repo 沒有 `research/`、快照、完整主張檔、`issues.json`、知識庫；`evidence/` 只有規定欄位，分析型項目只有兩個欄位。
- 讀者回饋表單能送出測試 Issue，私人端整理讀得到。
- PR-4 後：網頁裡不再有 `github.com/jhchenmooc`；舊刊連結已改純文字並加更正框；更正頁有「網站搬遷」一筆。

## 10. 保護規則失效後的替代做法

原 repo 改私人後，免費方案不執行 main 的 ruleset（必須 PR、CI 通過、禁止 force push 與刪除）。

- 每日短訊排程既有的「範圍檢查、verify 成功、核對 expected head SHA 後才合併」保留；每日短訊、週報、月報作業文字補一句：不得直接推送 main、不得強制推送、不得刪除 main。
- `publish-public` 只發布已驗證的提交（4.1）。
- **每週稽核**：編輯 session 每週五做週報時，用 `list_commits`（main、since 上週五）列出每筆提交，逐筆以 `search_pull_requests` 找到已合併的 PR（merge commit 等於該 SHA），並以 `actions_list` 列出 verify-and-deploy.yml 在 main 的 push 執行，確認該 SHA 的 verify job 為 success；異常立即回報管理者，結果記在週報出刊前檢查文件。

## 11. 排程與 session

- 週報、月報、週四清單採方案甲（推播提醒，管理者在編輯 session 手動開始），每日短訊在專用 session 自動執行。詳見 `research/schedule-recovery.md`。
- 步驟 3（restricted repo 轉移後）與步驟 9（原 repo 轉移後）：用 `list_triggers` 列出所有排程，逐一 `get_trigger` 讀出（含停用的），更新 repo 名稱與網站網址，併入第 10 節的禁止事項；文獻搜尋、每日短訊、本機 session 的通知內容先給管理者確認。
- 排程屬於建立者的 claude.ai 帳號，不跟著組織走（第 14 節）。

## 12. 回退

- **步驟 9 之前**：隨時可回舊站：`ENABLE_PUBLIC_PUBLISH` 設 false、`ENABLE_VERIFIED_PAGES_DEPLOY` 設回 true、revert PR-3／PR-4。步驟 9 是回到舊站的最後期限。
- **步驟 9 之後新站失效**：(1) 開關設 false；(2) **在私人端 revert 造成問題的 PR**（不直接改公開 repo，否則 4.2 第 1 點的 SHA 鏈會擋下之後的部署）；(3) 開關設回 true 並手動推送；(4) 只有 Actions 本身無法使用時，才考慮把私人 repo 改回公開，須管理者書面同意，且先評估私人期間的歷史會公開哪些內容；改回公開也**不會恢復舊網址**（Pages 不隨轉移轉址）。

## 13. 風險

| 風險 | 處理 |
|---|---|
| 私人內容被推到公開 repo | 保留清單＋推送前掃描（4.2）；誤推處置（4.8） |
| 直接推到私人 main 的提交被發布 | 只發布已驗證的提交（4.1，只防意外）；每週稽核（10） |
| 公開 repo 的 workflow 被改成可由讀者觸發 | `.github/` 雜湊固定（4.2）；Actions 設定唯讀、只允許官方 action、強制釘 SHA（4.6） |
| 有人直接改公開 repo | SHA 鏈（4.2）；回退一律在私人端做（12） |
| 自動 session 直接改公開 repo | App 安裝排除公開 repo（4.6） |
| 部署金鑰推送不觸發 Pages | Pages 改用 Actions 來源，步驟 4 實測（4.5） |
| 部署被排隊擠掉 | 獨立排隊群組（4.1） |
| 金鑰外洩或失效 | 每年輪替；冒煙測試失敗讓 job 失敗，GitHub 寄 Actions 失敗通知給管理者；組織不得停用部署金鑰 |
| 私人 repo 的 Actions 額度 | 每月 2,000 分鐘；步驟 2 實測 |
| 讀者勘誤中斷 | PR-2 新舊兩個 repo 都讀（到步驟 9）；步驟 5 先測；未關閉 Issue 在步驟 8 前處理 |
| main 的 push verify 被取消，部署卡住 | 現有 CI 的排隊群組依事件分開（4.1） |
| 已刊頁引用網址變更 | PR-4 一次改並加更正紀錄 |
| 公開 repo 歷史保留舊版摘錄 | 更正政策照實寫明 |
| 已公開的歷史與 fork | 無法收回；照實記錄；步驟 9 前再列 fork（2026-10-23 為 0） |

## 14. 移交

- 先把接手者加為組織第二位擁有者，交接期兩人並存，再移除原擁有者；不交出任何帳號密碼。
- 跟著組織走：repo、Issue、Pages、部署金鑰、Actions secret；Actions 變數與 environment 文件未寫明，轉移後要確認。
- 不會跟著走、要接手者重建：claude.ai 上的排程、雲端環境設定與連線的服務。
- 組織聯絡信箱目前用管理者的信箱，移交時改為接手者或單位信箱。
- 交接檔記錄擁有者名單、金鑰輪替日期、排程清單與內容。
