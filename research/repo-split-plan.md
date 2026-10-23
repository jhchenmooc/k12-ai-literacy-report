# 拆分為私人來源 repo 與公開網站 repo：搬遷方案 v0.7

> 建立日期：2026-10-13；v0.7 改寫日期：2026-10-23。本方案不改任何程式、設定或 repo；所有 GitHub 設定變更（repo 可見度、轉移、金鑰、Pages、ruleset、App 安裝）由管理者親自操作。
>
> 修訂紀錄：
> - v0.1–v0.4（2026-10-13）：三輪模型模擬審查（見 [repo-split-plan-reviews.md](repo-split-plan-reviews.md)）；審查與修正都是 Anthropic 模型執行，不是外部真人審查。
> - v0.5（2026-10-13）：管理者決定全拆、改用組織 `ailiteracytw`。
> - v0.6（2026-10-23）：公開範圍改為「只放網頁與精簡摘錄」。
> - **v0.7（2026-10-23）**：依兩路多角度自檢（一致性與可行性；安全與 GitHub 文件核對）全面改寫，取代先前各版正文。管理者「照建議，第 4 項選 (a)」。
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

## 1. 目標

- 公開 repo `ailiteracytw/ailiteracytw.github.io` 只放讀者需要的網頁，以及讓讀者自行對照原文的精簡摘錄。
- 程式、閘門、測試、候選池、完整主張檔、快照、知識庫、方法文件、查核紀錄、草稿都留在私人 repo，避免被 fork 或複製。
- 網址：`https://ailiteracytw.github.io/`（網站在根路徑）。
- 以前公開期間的歷史無法收回（第 11 節）。

## 2. 公開 repo 的內容

| 位置 | 內容 | 規則 |
|---|---|---|
| 根目錄 | 網站：現行網站清單（`public-site.js` 的 STATIC_HTML、RESOURCES、PUBLIC_DIRS）**扣掉 `publication/issues.json`**；`deploy.json`（部署日期、期別） | 網頁不讀取 issues.json（2026-10-23 核對）；新函式過濾 `inventory()` 的輸出即可，舊站清單與出版閘門不改 |
| `evidence/<claims 檔名>` | 每個 `issues.json` 已登錄期別一檔，檔名沿用 `claims_file` 的檔名（例如 `daily-2026-10-23.json`） | 見下方「evidence 規則」 |
| `README.md` | 說明這是網站發布 repo、`evidence/` 的用途、如何回報錯誤 | 由私人端產生後推送，不在公開 repo 直接編輯 |
| `.github/ISSUE_TEMPLATE/` | 讀者回饋表單 | 同上 |
| `.github/workflows/pages.yml` | 極小的 Pages 部署流程（第 4.5 節） | 同上；第三方 action 釘完整 SHA |

**evidence 規則**：
- 只取 `issues.json` 已登錄期別的主張；未登錄期別（例如月報草稿）不出現。
- **一般項目**：每則只輸出 7 個欄位 `claim_id`、`source_title`、`title_zh`、`source_organization`、`source_url`、`first_disclosed_on`、`original_excerpt`；沒有的欄位省略（23 則沒有 `title_zh`）；值逐字照私人端。
- **分析型項目**（有 `supporting_claim_ids` 者，例如週報導讀、臺灣對照說明；2026-10-23 共 10 則）：只輸出 `claim_id` 與 `supporting_claim_ids`。理由：它們的 `source_url` 是本刊舊站網址、`original_excerpt` 是內部交叉引用，不是原文；讀者由依據的主張找到原文。
- 欄位是**保留清單**：私人端以後新增的欄位一律不公開，不需逐次決定。
- 2026-10-23 核對：90 則主張的 7 個欄位都沒有作業紀錄字樣（research/、trig_、session_01、KB-、curl、403、pdftotext、sha256）。

**不公開**：快照（`publication/sources/`）、完整 claims、`corrections.json`（更正頁已顯示更正內容）、`issues.json`、`publication/audits/`、知識庫、方法文件、舊刊引用的內部文件、整理程式。理由：快照書目行與主張的多數欄位含作業紀錄（全文由誰提供、403、讀取工具、全文雜湊、知識庫編號），且快照雜湊已鎖定不能刪改。

## 3. 私人端

- 現有 repo 在切換時改私人並轉到組織（`ailiteracytw/k12-ai-literacy-report`），保留歷史、Issue、PR。
- 出版閘門、測試、每日短訊、週報、月報流程都不變，照舊在私人 repo 開 PR、跑 verify、等管理者回「合併」（每日短訊照權限 B）。
- `k12-ai-literacy-report-restricted` 也轉到組織（步驟 1b），維持私人。
- 新快照與主張不寫內部路徑、repo 名稱、session 或排程編號、全文由誰提供（`PUBLICATION-CONTRIBUTING.md`，2026-10-23 #375 已合併）。

## 4. 部署流程與安全

### 4.1 `publish-public.yml`（私人 repo，獨立 workflow）

- **觸發**：PR-1 只用 `workflow_dispatch`；PR-3 再加 `push: branches: [main]`。不使用 `pull_request`、`pull_request_target`、`workflow_run`。
- **開關**：`vars.ENABLE_PUBLIC_PUBLISH`（預設關）。
- **只發布已驗證的提交**（私人 repo 在免費方案下 main 沒有保護）：job 開頭確認目前提交是 main 的 HEAD，且來自已合併的 PR、該 PR 合併前的 verify 為 success（用 GitHub API 查）；或在同一個 workflow 內先完整跑一次 verify。任一不符就停止。`if: github.ref == 'refs/heads/main'` 只防誤觸，不算這道檢查。
- **排隊群組**：用自己的群組（例如 `publish-public`），**不與 `verify-and-deploy.yml` 的 `verified-pages` 共用**（共用時待執行的部署可能被下一個 PR 的 verify 擠掉）。
- **寫法**：頂層 `permissions: contents: read`；第三方 action 釘完整 SHA；checkout 不保留憑證；`github.event.*` 與 `inputs.*` 經 `env:` 進 `run:`；禁止 `set -x`。
- **金鑰**：secret 名稱 `PUBLIC_DEPLOY_KEY`。步驟 1b 先放在 `environment: public-site`（只允許 main）；免費方案私人 repo 不能使用 environment secret，所以步驟 9 改私人後**重新產生一把金鑰**存為 repo secret、撤銷舊的，再以小 PR 拿掉 `environment:`（第 8 節）。secret 存入後讀不回來，不能「搬移」。

### 4.2 推送前檢查（任一失敗就停止）

1. **公開 repo 沒有被別人改過**：fetch 公開 repo 的 main，每一筆提交的作者都必須是部署機器人；首次部署時公開 repo 必須沒有任何提交。
2. **內容等於推導結果**：清空工作樹後放入推導結果，檔案集合必須等於公開清單；不得有 symlink；路徑不得跳出（`..`、絕對路徑）。
3. **精確樣式掃描**：`research/` 後接路徑、`k12-ai-literacy-report-restricted`、`trig_` 後接 20 個以上英數字、`session_01` 後接英數字、`claude.ai/code/`。`allow-mentions.txt` 以「檔案＋行內容」放行，初始為空；`trig_` 與 `session_01` 永遠不得放行。掃描失敗只列檔名與行號，不印內容。原文逐字摘錄若剛好含這些樣式，由管理者決定是否放行。
4. **空差異**：網站沒有變動時不建提交，寫進 Actions 摘要。

### 4.3 推送

- 用部署金鑰推到公開 repo 的 main，每次一個新提交；作者固定為機器人名稱與 noreply 信箱；訊息只寫「部署 YYYY-MM-DD〔期別〕」，不含私人提交 SHA、管理者姓名或 email。
- 金鑰處理：ed25519；`umask 077` 後經 `env:` 寫入 `$RUNNER_TEMP`；known_hosts 用 GitHub 文件 SSH 指紋頁核對過的完整 ssh-ed25519 公鑰行，不用 `ssh-keyscan`；`GIT_SSH_COMMAND` 設 `IdentitiesOnly=yes`、`StrictHostKeyChecking=yes`、`UserKnownHostsFile`；步驟結尾 `if: always()` 刪除金鑰檔。

### 4.4 冒煙測試

- 輪詢新網址的 `deploy.json`（每 30 秒、最多 10 分鐘），直到等於本次推送值；再抓首頁與最新一期，必須回 200；失敗讓 job 失敗。
- dispatch 輸入 `skip_smoke`：只用於步驟 4 首次推送（當時 Pages 尚未設定），改寫警告。

### 4.5 公開 repo 的 Pages

- GitHub 文件把「用部署金鑰推送」列為分支部署的網站**可能不會建置**的原因之一，所以 Pages 來源改為 **GitHub Actions**：公開 repo 放 `.github/workflows/pages.yml`，在 `push` 到 main 時用 `actions/upload-pages-artifact` 與 `actions/deploy-pages`（釘 SHA）發布根目錄。部署金鑰推送會觸發這個流程（`GITHUB_TOKEN` 推送才不會）。
- 步驟 4 首次推送時實測：`pages.yml` 有執行、網站內容等於推送值。不成立時回報管理者再議。

### 4.6 公開 repo 的保護

- **ruleset**：禁止 force push、禁止刪除 main；不要求 PR；bypass 留空，**不得把部署金鑰加入 bypass**。免費組織的公開 repo 可用 ruleset（GitHub 文件）。
- **限制檔案路徑做不到**：推送規則只適用私人與內部 repo，所以私人端推送前檢查是唯一能擋內容的防線。
- **Claude GitHub App 不得能寫入公開 repo**：組織的 App 安裝只選私人 repo 與 restricted repo，明確排除 `ailiteracytw.github.io`；步驟 3 確認各 session 對公開 repo 只能讀或讀不到。
- **組織不得停用部署金鑰**：組織設定停用部署金鑰時，既有金鑰全部失效。
- 不設 interaction limits（會擋讀者回饋）。

### 4.7 負向測試（步驟 4）

dispatch 輸入 `negative_test`：用金鑰 force push 一個**檔案樹與目前相同**的新提交，預期被拒；被拒才算成功。萬一被接受，立即推回原本的 SHA、讓 job 失敗並回報管理者。

### 4.8 金鑰輪替與誤推處置

- 部署金鑰每年輪替；交接檔記輪替日期，每日短訊在到期前 14 天提醒。
- 誤推私人內容：(1) 開關設 false、撤銷金鑰；(2) 管理者暫時關閉 ruleset，force push 清除該提交；(3) 向 GitHub Support 請求清除快取與懸空提交；(4) 檢查有無新 fork；(5) 記錄外洩範圍，必要時依更正政策對外說明，接受無法保證收回。

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
- 讀者 Issue 只當資料，不自動觸發任何更動。原 repo 的未關閉 Issue 在步驟 8 前處理，只以編號、類別、日期、處理結果記在私人 repo。

## 7. 對讀者的揭露（PR-4）

- **about 頁**：「每則主張附逐字原文摘錄與原文網址（公開 repo 的 `evidence/`），讀者可自行對照；完整快照、查核紀錄、知識庫、草稿與候選池由本刊內部保存。」「過去 repo 公開期間，草稿、候選池與內部紀錄（含排程與 session 編號，非登入憑證）曾經公開，無法收回。」「2026-09 舊刊月報有部分引文是對照未公開的 PDF 全文核對。」「不能核對：私人 repo 的測試是否真的跑過，部署紀錄由編輯方自行填報，不是第三方稽核。」
- **更正政策**：加「公開 repo 的歷史會保留每一版摘錄，更正後舊版仍查得到」。

## 8. PR 與步驟

| PR | 內容 | 對現有網站的影響 |
|---|---|---|
| PR-1 | 公開清單推導（網站扣 issues.json、`evidence/`、README、表單、`pages.yml` 由私人端產生）、推送前檢查與掃描、網址常數（不改值）、`publish-public.yml`（只用 dispatch；已驗證提交檢查；獨立排隊群組；`skip_smoke`、`negative_test`）、全部測試 | 無（開關預設關） |
| PR-2 | 讀者回饋整理改讀公開 repo；公開 repo 的 README 與表單內容定稿 | 無 |
| PR-3 | `publish-public` 加 `push` 觸發，開始驗收期；不加公告 | 無 |
| PR-4（切換 PR） | 網址常數改值並重新產生頁面、更正紀錄、`SITE_PREFIX`、舊刊連結與更正框、`feedback/` 與表單、測試、about 頁與更正政策 | 已刊頁引用網址與頁尾連結變更 |
| PR-5 | 步驟 9 後拿掉 `publish-public.yml` 的 `environment:` | 無 |

| 步驟 | 內容 | 誰做 |
|---|---|---|
| 1a | **已完成（2026-10-13）**：組織、App 安裝、空的 `ailiteracytw.github.io`（私人） | 管理者 |
| 1b | PR-1 接近完成時：`ailiteracytw.github.io` 改公開並確認仍無提交；設 ruleset（4.6）；確認組織允許部署金鑰；在自己電腦產生 ed25519 金鑰，公鑰加到公開 repo 的 Deploy keys 並勾允許寫入，私鑰存入原 repo 的 `environment: public-site`（只允許 main），之後刪除本機私鑰；組織的 App 安裝只選私人 repo 與 restricted repo、排除公開 repo；把 `k12-ai-literacy-report-restricted` 轉到組織並加入 App 安裝 | 管理者 |
| 2 | 讀最近 10 次 run 的實際分鐘數，估每月用量，須低於 2,000 分鐘的 80% | 編輯 session |
| 3 | 各 session 在組織的 restricted repo 開 PR、合併（驗證 App）；確認各 session 對公開 repo 不能寫入；用 `list_triggers` 列出排程、再逐一 `get_trigger`，更新 restricted repo 名稱 | 編輯 session、管理者 |
| 4 | 合併 PR-1；設 `ENABLE_PUBLIC_PUBLISH=true`；以 `skip_smoke` 手動首次推送；管理者在公開 repo 設 Pages 來源為 GitHub Actions；確認 `pages.yml` 執行、網站正確；跑 `negative_test`；以第 9 節清單驗收 | 編輯 session、管理者 |
| 5 | 合併 PR-2；在公開 repo 送一則測試 Issue，確認私人端整理讀得到 | 編輯 session、管理者 |
| 6 | 合併 PR-3，開始驗收期；每日短訊在 daily-check 加「publish-public 驗收」一節 | 編輯 session、管理者 |
| 7 | 驗收期：連續 7 個日曆日 `publish-public` 沒有失敗，其中至少 3 天有實際網站變更；漏記一天就算失敗，不得為湊天數製造變更 | 自動 |
| 8 | 切換日：暫停當日每日短訊一次；合併或關閉所有開啟中的 PR；處理原 repo 未關閉的 Issue；合併 PR-4；`vars.ENABLE_VERIFIED_PAGES_DEPLOY` 設 false（舊站部署 job 保留至少一個月） | 編輯 session、管理者 |
| 9 | 列出現有 fork 記入交接檔；**原 repo 先改私人（舊站隨之下架），再轉到組織**；組織的 App 安裝加入此 repo（安裝不會隨轉移）；確認 Actions 變數、secret 仍在；**重新產生部署金鑰**存為 repo secret、撤銷舊金鑰；合併 PR-5；更新各 session 的 git remote、雲端環境選用的 repo 與排程；排在 08:22 每日短訊之外 | 管理者（約 45 分鐘）、編輯 session |
| 10 | 驗收；更新交接檔、SOP、README；隔日短訊照常，前一日項目若仍在 7 天內就補發 | 編輯 session、管理者 |

**時程**：
- 規則凍結到 11/03；月報 11/01 檢查、11/03 出刊。**PR-1 在 11/03 月報合併後才開始**（11/04 起）。
- PR-1 之後依序走審查、步驟 1b、首次推送、PR-2、PR-3，再加 7 天驗收期；**切換最早約 11/16（一）**，未達條件就延後；11/30 仍未達成，由管理者決定是否放棄。
- 切換日與步驟 9 避開週五（週報）、週四（週四清單）、每月 1、3 日，以及 08:22 每日短訊。

## 9. 驗收清單

- 新站各網址（首頁、daily、weekly、monthly、archive 四頁、about、corrections、feedback）在桌面與手機都回 200，沒有水平溢出。
- 公開 repo 的檔案集合等於公開清單；`deploy.json` 為本次推送值；`pages.yml` 有執行。
- 公開 repo 沒有 `research/`、快照、完整主張檔、`issues.json`、知識庫；`evidence/` 只有規定欄位，分析型項目只有兩個欄位。
- 讀者回饋表單能送出測試 Issue，私人端整理讀得到。
- PR-4 後：網頁裡不再有 `github.com/jhchenmooc`；舊刊連結已改純文字並加更正框；更正頁有「網站搬遷」一筆。

## 10. 保護規則失效後的替代做法

原 repo 改私人後，免費方案不執行 main 的 ruleset（必須 PR、CI 通過、禁止 force push 與刪除）。

- 每日短訊排程既有的「範圍檢查、verify 成功、核對 expected head SHA 後才合併」保留；每日短訊、週報、月報作業文字補一句：不得直接推送 main、不得強制推送、不得刪除 main。
- `publish-public` 只發布已驗證的提交（4.1）。
- **每週稽核**：編輯 session 每週五做週報時，列出上週以來 main 的每筆提交，逐筆確認都來自已合併的 PR、且合併時 verify 為 success；異常立即回報管理者，結果記在週報出刊前檢查文件。

## 11. 排程與 session

- 週報、月報、週四清單採方案甲（推播提醒，管理者在編輯 session 手動開始），每日短訊在專用 session 自動執行。詳見 `research/schedule-recovery.md`。
- 步驟 3（restricted repo 轉移後）與步驟 9（原 repo 轉移後）：用 `list_triggers` 列出所有排程，逐一 `get_trigger` 讀出（含停用的），更新 repo 名稱與網站網址，併入第 10 節的禁止事項；文獻搜尋、每日短訊、本機 session 的通知內容先給管理者確認。
- 排程屬於建立者的 claude.ai 帳號，不跟著組織走（第 14 節）。

## 12. 回退

- **步驟 9 之前**：隨時可回舊站：`ENABLE_PUBLIC_PUBLISH` 設 false、`ENABLE_VERIFIED_PAGES_DEPLOY` 設回 true、revert PR-3／PR-4。步驟 9 是回到舊站的最後期限。
- **步驟 9 之後新站失效**：(1) 開關設 false；(2) 在公開 repo revert 上一次部署提交；(3) 私人端修正後重新開啟並手動推送；(4) 只有 Actions 本身無法使用時，才考慮把私人 repo 改回公開，須管理者書面同意，且先評估私人期間的歷史會公開哪些內容。

## 13. 風險

| 風險 | 處理 |
|---|---|
| 私人內容被推到公開 repo | 保留清單＋推送前掃描（4.2）；誤推處置（4.8） |
| 直接推到私人 main 的提交被發布 | 只發布已驗證的提交（4.1）；每週稽核（10） |
| 自動 session 直接改公開 repo | App 安裝排除公開 repo（4.6） |
| 部署金鑰推送不觸發 Pages | Pages 改用 Actions 來源，步驟 4 實測（4.5） |
| 部署被排隊擠掉 | 獨立排隊群組（4.1） |
| 金鑰外洩或失效 | 每年輪替；冒煙測試失敗寄通知；組織不得停用部署金鑰 |
| 私人 repo 的 Actions 額度 | 每月 2,000 分鐘；步驟 2 實測 |
| 讀者勘誤中斷 | 步驟 5 先測；未關閉 Issue 在步驟 8 前處理 |
| 已刊頁引用網址變更 | PR-4 一次改並加更正紀錄 |
| 公開 repo 歷史保留舊版摘錄 | 更正政策照實寫明 |
| 已公開的歷史與 fork | 無法收回；照實記錄；步驟 9 前再列 fork（2026-10-23 為 0） |

## 14. 移交

- 先把接手者加為組織第二位擁有者，交接期兩人並存，再移除原擁有者；不交出任何帳號密碼。
- 跟著組織走：repo、Issue、Pages、部署金鑰、Actions secret；Actions 變數與 environment 文件未寫明，轉移後要確認。
- 不會跟著走、要接手者重建：claude.ai 上的排程、雲端環境設定與連線的服務。
- 組織聯絡信箱目前用管理者的信箱，移交時改為接手者或單位信箱。
- 交接檔記錄擁有者名單、金鑰輪替日期、排程清單與內容。
