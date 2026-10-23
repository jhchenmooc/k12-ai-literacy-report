# 拆分為私人來源 repo 與公開網站 repo：搬遷方案 v0.6（草稿）

> 建立日期：2026-10-13。狀態：**管理者 2026-10-13 已決定全部待決項目（S0、帳號、S6、S8、S9；其餘照預設）**。本方案不改任何程式、設定或 repo；所有 GitHub 設定變更（建立 repo、改私人、金鑰、Pages、ruleset）由管理者親自操作。
>
> 修訂紀錄：
> - v0.1 → v0.2：依第一輪（Sonnet）審查修正；
> - v0.2 → v0.3：依第二輪（Fable）審查修正；
> - v0.3 → v0.4：依第三輪（Haiku，37 項）審查修正。本版拿掉網站模式與 GitHub 端路徑限制（兩者經核對做不到），新增 S9；
> - v0.4 → v0.5：記錄管理者決定（全拆、改用組織 `ailiteracytw`），改寫帳號、網址、轉移時機，新增第 12 節移交。本版未另做審查；其後依管理者 2026-10-13 指示，組織名稱由 `k12-ai-literacy-tw` 改為 `ailiteracytw`（網址較短，網站在根路徑）；並自檢修正：步驟 1 拆成 1a（已完成）與 1b（PR-1 接近完成時做，不在此步開 Pages），負向測試與開 Pages 移到步驟 4，切換時金鑰改存為 repo secret，首次部署與切換後冒煙測試的規則。
>
> - v0.5 → v0.6（2026-10-23）：管理者決定公開範圍改為「乙」，並依 10/13 之後的變動更新時程、舊網址、排程與保護規則；**見下方「v0.6 修訂」，與正文衝突時以 v0.6 修訂為準**。
>
> PR-1 實作與審查提示詞見 [repo-split-prompts.md](repo-split-prompts.md)。
>
> 紀錄見 [repo-split-plan-reviews.md](repo-split-plan-reviews.md)。審查與修正都是 Anthropic 模型執行，不是外部真人審查。
>
> 管理者 2026-10-13 的方向與決定：
> - 私人 repo 編寫與驗證，CI 把網站推到公開 repo；網站網址可以改，可換新名稱；
> - **S0：全拆**；
> - **帳號：改用 GitHub 組織 `ailiteracytw`**，不另開個人帳號，以便日後移交。

## v0.6 修訂（2026-10-23，優先於下文）

管理者 2026-10-23 決定：組織 repo 只放讀者需要的網頁與已刊證據，資料處理都在私人 repo。下列各點取代正文的對應內容；正文其餘部分照舊。

### A. 公開範圍：乙（精簡版，管理者 2026-10-23「照建議」；取代第 3.2 節全部內容）

2026-10-23 逐欄、逐檔核對已刊 90 則主張與 61 個快照後決定：**快照與完整主張檔都不公開**。快照書目行全部含作業紀錄（全文由誰提供、403、讀取工具、全文雜湊、知識庫編號），且雜湊已鎖定不能刪改；主張檔 63 個欄位中，頁面已顯示者不必重複，其餘多為內部查核紀錄（`source_locator` 90 則中 39 則含作業紀錄）。讀者核對需要而頁面沒有的，只有逐字原文摘錄。

公開 repo `ailiteracytw/ailiteracytw.github.io` 只放：

| 位置 | 內容 | 規則 |
|---|---|---|
| 根目錄 | 網站（現行網站清單，**但不含 `publication/issues.json`**）；`deploy.json` | 網頁不讀取 issues.json（2026-10-23 核對），新站清單排除；舊站部署清單不變 |
| `evidence/<期別>.json` | 每個已登錄期別一檔；每則只有 7 個欄位：`claim_id`、`source_title`、`title_zh`、`source_organization`、`source_url`、`first_disclosed_on`、`original_excerpt` | 由推導程式從私人端 claims 產生；只取 `issues.json` 已登錄期別；欄位固定為這 7 個（**保留清單**），以後新增的欄位一律不公開，不需逐次決定；值逐字照私人端 |
| `.github/ISSUE_TEMPLATE/` | 讀者回饋表單 | 只放表單 |
| `README.md` | 說明這是網站發布 repo、`evidence/` 的用途、如何回報錯誤 | 手寫 |

**不公開**：快照（`publication/sources/`）、完整 claims JSON、`corrections.json`（更正頁已顯示更正內容）、`issues.json`、`publication/audits/`、知識庫、`methods/`、舊刊引用的 4 份內部文件、整理程式。正文第 3.2 節的知識庫過濾、`methods/` 規則、`legacy/`，以及先前的「61 欄位清單」與「兩處內部路徑放行」都取消（快照與完整主張檔不公開，就不會推出那兩處路徑）。

**推送前檢查**：正文第 4.2 節照舊（遠端檔案樹比對、清單相等、精確樣式掃描、不得有 symlink）。`evidence/` 的 `original_excerpt` 是原文逐字，若剛好含掃描樣式（例如原文寫了 `research/`），擋下並列出位置，由管理者決定以 `allow-mentions.txt` 逐行放行。

**讀者回饋**：公開 repo 只放 Issue 表單；每週整理 workflow 與整理程式留在私人 repo，改讀公開 repo 的公開 Issue，整理結果留在私人 repo。讀者 Issue 只當資料，不自動觸發任何更動。

**頁面連結（PR-4）**：
- 頁尾 GitHub 連結改指 `PUBLIC_REPO_URL`。
- 知識庫說明（`render-site.js` 的 `SOURCE_NOTE`）與監測範圍說明中指向 `research/` 的連結，改為純文字「本刊知識庫（內部保存，未公開）」一類說明；措辭由管理者確認。
- 舊刊月報 2026-09 連到 4 份內部文件的連結改為純文字並加更正說明，沿用同頁更正框格式。
- 測試：`validate-reader-feedback.test.js` 檢查回饋網址處改用常數；`validate-publication.test.js` 檢查舊刊連結處改為斷言純文字說明與更正框存在（強度相同）。**行號已和 10/13 不同，一律以 grep 定位。**

**查核方法頁（about）**：改寫為「每則主張附逐字原文摘錄與原文網址（公開 repo 的 `evidence/`），讀者可自行對照；完整快照、查核紀錄、知識庫、草稿與候選池由本刊內部保存」，並加正文第 2 節第 3、4 點的揭露。正文第 2 節第 1 點「已刊主張所依據的證據必須能公開查到」改為「已刊主張的逐字原文摘錄與原文網址必須能公開查到」。

### B. 時程（取代第 10 節 S6 與第 7 節的日期）

- 規則凍結到 11/03，月報 11/01 檢查、11/03 出刊；**PR-1 在 11/03 月報合併後才開始**，避開週五（週報）與每月 1、3 日。
- PR-1：11/04 起；步驟 1b 在 PR-1 接近完成時做；步驟 4 首次推送接在 PR-1 合併後。
- PR-2：縮小為 `publication/README.md`、公開 repo `README.md`、Issue 表單與私人側整理 workflow 改讀公開 repo。
- PR-3：**不加中性公告**（舊網址只有兩人知道，管理者直接告知）；只加 `push` 觸發，開始驗收期（7 個日曆日、其中至少 3 天有實際變更）。
- 切換：驗收期滿後的第一個非週五、非 1／3 日；最早約 11/11，未達條件就延後；11/30 仍未達成由管理者決定是否放棄。

### C. 舊網址：丁、不轉址（取代 S8）

舊網址只有兩人知道。切換時不建個人站台、不轉址，由管理者直接告知新網址。步驟 8 的「S8 轉址上線並實測」刪除。

### D. 驗收紀錄（取代第 6 節「09:30 那次執行」）

每日短訊排程目前在 08:22 執行。驗收期間由每日短訊 session 在當日 daily-check 加一節「publish-public 驗收」（日期、run ID、結果、有無 commit、`deploy.json` 內容），隨 daily-check PR 提交。

### E. 保護規則失效後的替代做法（補充第 4.4 節與 S9）

原 repo 改私人後，免費方案不執行 main 的 ruleset（必須 PR、CI 通過、禁止 force push 與刪除）。
- 每日短訊排程既有的「範圍檢查、verify 成功、核對 expected head SHA 後才合併」保留；每日短訊、週報、月報作業文字補一句：不得直接推送 main、不得強制推送、不得刪除 main。
- **每週稽核**：編輯 session 每週五做週報時，列出上週以來 main 的每筆提交，逐筆確認都來自已合併的 PR、且合併時 verify 為 success；異常立即回報管理者，結果記在週報出刊前檢查文件。

### F. 排程與 session（取代第 7.2 節的排程段）

- 10/13 記的排程編號已過時。2026-10-23 現況：每日短訊 `trig_01Y4TDEX4rJfvmnzHFrg9mHd`（每日短訊專用 session）；週報、月報、週四清單改為**方案甲**（推播提醒，管理者在編輯 session 手動開始；觸發到編輯 session 會因可信任裝置限制失敗），停用的作業排程保留文字供照做。詳見 `research/schedule-recovery.md`。
- 步驟 1b 把 `k12-ai-literacy-report-restricted` 轉到組織後、步驟 9 把本 repo 轉到組織後，都要用 `get_trigger` 讀出所有排程（含停用的），更新 repo 名稱與網站網址；文獻搜尋、每日短訊、本機 session 的通知內容先給管理者確認。

## 摘要

- **已決定**：全拆；兩個 repo 都放在組織 `ailiteracytw`。
- **全部決定（2026-10-13）**：S6、S8、S9 照預設：最早 11/9 切換；舊網址用個人站台 404 轉址（須先實測，不成立改為不轉址）；部署金鑰保護採「接受並照實寫明」；其餘項目照預設。
- **新網址**：`https://ailiteracytw.github.io/`（公開 repo 取名 `ailiteracytw.github.io`，網站在根路徑）。
- **私人來源 repo**：現有 repo 在切換日**轉移到組織並改私人**，保留歷史、Issue 與 PR。
- **原則**：已刊出主張所依據的證據必須能公開查到；只有未刊內容可以私人（第 2 節）。
- **公開內容由程式依規則推導**（第 3 節）：
  - 只公開已登錄期別的主張與它們引用的快照，**路徑與現在相同**（`publication/…`），主張中的 `evidence_path` 不必改寫；
  - 知識庫套用網站既有的兩條隱藏規則，關聯與索引一併過濾並重新產生；
  - 方法文件原樣公開，指向未公開檔案的連結依固定規則改為純文字。
- **防護**（第 4 節）：
  - 主要防線在私人端：推送前比對公開 repo 遠端內容、精確樣式掃描、只從 main 執行；
  - GitHub 端只能防 force push 與刪除 main。**公開 repo 無法用 ruleset 限制檔案路徑**（GitHub 文件：推送規則只適用私人與內部 repo）。
  - **私人 repo 在免費方案下，environment 的保護會被忽略**（GitHub 文件），改私人後，任何能推送到私人 repo 的人都用得到部署金鑰（S9）。
- **切換不靠網站模式**：兩站並行期間，兩站都顯示同一則中性公告（第 6 節）。
- **4 個 PR**：前 2 個不改變現有網站（第 7 節）。
- **舊網址**：改私人那一刻舊站就 404。建議用個人站台的 404 頁轉址，須先實測（S8）。

## 1. 方案比較（S0，已決定：甲）

| | 甲、全拆（建議） | 乙、只搬草稿 |
|---|---|---|
| 做法 | 現有 repo 保留原名改私人；新建公開 repo 收 CI 推送 | 網站與程式留在現有公開 repo；草稿、候選池、內部方案搬到 `k12-ai-literacy-report-restricted` |
| 網址 | 改變 | 不變 |
| 讀者勘誤、排程 | 要搬、要改寫 | 不變 |
| 主要難處 | 新 repo、金鑰、推送流程、改連結與測試、兩站並行 | **CI 拆成跨 repo**：知識庫測試要求候選池與知識庫紀錄一一對應，候選池在 `research/drafts/`；月報草稿的快照也在 `publication/sources/` |
| 保護範圍 | 全部未刊內容與以後的內部工作 | 只有搬走的檔案；日後新增的檔案要靠紀律放對地方 |
| 已公開的歷史 | 兩案都無法收回，含已存在的 fork | 同左 |

**管理者 2026-10-13 決定甲**。理由：乙的「CI 讀不到私人 repo」會牽動出版閘門本身；甲的 CI 不必拆，只多一道推送。

## 2. 公開與私人的原則

1. **已刊出主張所依據的證據，必須能公開查到**：逐項主張、原文短快照、更正紀錄、查核方法。
   - 已知例外：2026-09 舊刊月報部分引文，是對照未放入 repo 的 PDF 全文核對的（`research/pages-browser-acceptance-2026-10-09.md`）。about 頁照實寫明。
   - 新期別若出現無法公開的證據，**先建立標示機制，再刊出**。
2. **只有未刊內容可以私人**，類別與理由寫在 about 頁：
   - 未刊草稿與候選池：尚未查核，公開容易被誤當結論；
   - 未發表的審查紀錄與內部方案；
   - 個資與讀者隱私；
   - 受版權限制的原件。
3. **以前已公開的歷史無法收回**，照實記錄：
   - 過去 repo 公開期間，草稿與候選池都曾公開；
   - 已存在的 fork 會脫離成獨立 repo 並維持公開（GitHub 文件）；
   - 本方案與教師資訊方案目前也在公開 repo 的分支上。
4. **讀者能核對與不能核對的事**（寫進 about 頁「我們不宣稱的事」，用一般讀者的話）：
   - 能核對：每則已刊主張的原文快照；公開 repo 的修改紀錄會列出每次部署改了哪些檔案。
   - 不能核對：私人 repo 的測試是否真的跑過；部署紀錄上的測試結果由編輯方自行填報，不是第三方稽核。
   - 和既有的「同一模型多次查核不等於獨立審閱」並列，避免讀者以為拆分後多了保證。

## 3. 拆分後的內容

### 3.1 私人來源 repo（切換後為 `ailiteracytw/k12-ai-literacy-report`）

現有 repo 在步驟 9 轉移到組織後改私人。依 GitHub 文件，轉移會帶走 Issue、PR、wiki、star、secret 與部署金鑰，github.com 上的舊連結自動轉到新位置；**網站網址不轉址**。

- 全部原始碼、測試與 CI；
- `research/` 全部，**特別是** `SESSION-HANDOFF.md`（含 session 與排程 ID）、`research/audits/`（含後台設定快照）、草稿與候選池；
- 未登錄期別的快照（例如 10 月月報草稿引用的 8 個 `publication/sources/m2026-10-*.txt`）；
- 版權原件。

### 3.2 公開網站 repo（`ailiteracytw/ailiteracytw.github.io`）

**兩份清單分開**：

- **網站清單**：沿用 `public-site.js` 現有的 STATIC_HTML、RESOURCES、PUBLIC_DIRS，舊站部署只用它，內容不變。
- **公開資料清單**：新增一個函式，只有 `publish-public` 會呼叫，舊站部署不會讀到。

| 位置 | 內容 | 推導規則 |
|---|---|---|
| 根目錄 | 網站（網站清單）；`deploy.json`（部署日期、期別） | 現行網站清單 |
| `publication/claims/` | `publication/issues.json` 已登錄期別的 claims JSON | 依 `issues.json`；**路徑不變**，`claims_file` 不必改寫 |
| `publication/sources/` | 上述 claims 的 `evidence_path` 指到的快照 | 只取被引用的快照；路徑必須在 `publication/sources/` 內，拒絕 `..` 與 symlink；SHA-256 必須等於 `evidence_sha256`。2026-10-13 核對：9 則已登錄主張的快照都在、雜湊相符；8 個 m2026 快照未被引用，不公開 |
| `publication/audits/` | `2026-09-29_10-08.json` | 由 `publication/README.md` 標示「legacy、全部 hold、未經出版閘門」 |
| `publication/README.md` | 欄位說明：`candidate_id` 對應的候選池在私人側；其他欄位照原樣 | 手寫 |
| `corrections/` | 更正日誌（原說法、錯誤類型、來源、修訂、日期、讀者回饋歸檔編號） | 手寫，部署時複製 |
| `methods/` | N1–N8、G1–G6、evidence-safety-gates、news-policy-verification、publication-check-spec、ai-literacy-scope-criteria、low-human-review-policy、reader-feedback-policy；舊刊連到的 4 份文件：`september-2026-retro-workflow-review.md`、`legacy-editions-review-2026-10-09.md`、`pages-browser-acceptance-2026-10-09.md`、`news-audit-2026-09-29_10-08.md` | **原樣公開**；檔首加一段狀態說明（見下）；連結依下方規則改寫 |
| `knowledge-base/` | `data/records.csv`、`relations.csv`、`search_runs.csv`；由過濾後資料重新產生的 `indexes/`；`README.md` | 過濾規則見下；`schema.md`、`reports/` 不公開 |
| `tools/`、`.github/` | 讀者回饋 Issue 表單；每週整理 workflow；`summarize-reader-feedback.js`（workflow 路徑改指 `tools/`） | 例外清單 |
| `feedback-archive/` | 改私人前匯出的讀者 Issue：**只有編號、類別、日期、處理結果**，不放問題摘要；歷週整理的數字 | 一次性 |
| `README.md` | 說明這是網站與公開資料的發布 repo、來源在私人 repo、如何回報錯誤 | 手寫 |

**知識庫過濾**：

- 隱藏條件與網站相同，兩條取聯集：
  - `render-site.js` 第 182 行：有 `source_candidate_id` 且 `discovered_unverified`；
  - `research/ai-literacy-c-records.json` 的 C 類清單（`render-site.js` 第 75 行）。
- 2026-10-13 核對：共 14 筆紀錄要隱藏，`relations.csv` 中有 71 列以它們為主體。
- `relations.csv`：主體或客體是隱藏紀錄的列一併移除。
- `indexes/`：由過濾後資料重新產生。
- `search_runs.csv` 的 notes 欄：以 `research/[^\s;；）)]+` 樣式改寫為「內部紀錄，未公開」（361 列中有 355 列含這類路徑）。
- `README.md` 寫明：本次部署隱藏的筆數與理由、三級核對狀態圖例、「書目索引，不是認證」。

**`methods/` 處理**：

- 檔首狀態說明：「內部工作文件原樣公開。文中的『審查』多為模型角色模擬，不是外部真人審查；含管理者決定紀錄。」
- 連結改寫規則：相對連結的目標不在公開資料清單內，就把 `[文字](路徑)` 改為「文字（內部文件，未公開）」。
- 外部 PDF：`ai-literacy-scope-criteria.md` 連到 repo 內的教育部框架 PDF，改為教育部官方下載頁網址，PDF 不公開。

**推導程式要加的測試**：

- 未登錄期別的快照不得進入公開資料清單；`evidence_path` 都能在公開側解析，雜湊相符；
- 公開的知識庫通過 `validate-knowledge-base.js`，且不含任何隱藏編號（含 `indexes/`）；
- `methods/` 的相對連結都落在公開資料清單內；
- 網站清單與現行完全相同（舊站部署不受影響）。

## 4. 部署流程與安全

### 4.1 推送 workflow

`publish-public.yml` **獨立成一個 workflow**，不放在 `verify-and-deploy.yml`：

- **觸發**：先只用 `workflow_dispatch`；PR-3 再加 `push: branches: [main]`。不使用 `pull_request`、`pull_request_target`、`workflow_run`。
- **只從 main 執行**：job 加 `if: github.ref == 'refs/heads/main'`。這只防誤觸，**不防有意**：有寫入權的人可以在分支改掉這一行（見 S9）。
- **開關**：`vars.ENABLE_PUBLIC_PUBLISH`。
- **金鑰存放**：
  - 步驟 9 前，repo 仍是公開的，金鑰放在 `environment: public-site`，設「只允許 main」；
  - 步驟 9 後，依 GitHub 文件，免費方案私人 repo 的 environment 保護與 environment secret 會被忽略。**若不處理，切換當天推送就會因讀不到金鑰而失敗**。所以 S9 選甲時，步驟 9 把金鑰改存為 repo secret，PR-4 同時拿掉 workflow 的 `environment:`；選乙則維持 environment。
- **與現有 workflow 的關係**：沿用 `concurrency: verified-pages`，避免交錯。新站推送失敗不影響舊站部署結果。
- **寫法規範**：
  - `${{ github.event.* }}` 不直接放進 `run:`，改用 `env:`；
  - 第三方 action 釘到完整 SHA；
  - 頂層 `permissions: contents: read`；
  - 禁止 `set -x`。

### 4.2 推送前檢查（私人端，任一失敗就停止）

1. **公開 repo 沒有被別人改過**（首次部署時，公開 repo 必須完全沒有 commit）：先 fetch 公開 repo 的遠端 main，它的檔案樹必須等於上次部署的 commit；不等就停止並報警（有人直接在網頁上改了公開 repo）。
2. **內容等於推導結果**：清空工作樹後放入推導結果，檔案集合必須等於公開資料清單。
3. **精確樣式的內容掃描**：
   - `research/` 後接路徑（涵蓋 `research/drafts/`、`research/p0-*` 與候選池）、`k12-ai-literacy-report-restricted`；
   - `trig_` 後接 20 個以上英數字、`session_01` 後接英數字；
   - `claude.ai/code/`。

   允許清單 `allow-mentions.txt` 以「檔案 + 行內容」為單位，讓 `methods/` 中說明用途的字面提及通過；**`trig_` 與 `session_01` 兩個樣式永遠不得列入允許清單**。附 fixture 測試：至少一個應放行、一個應擋下。掃描失敗只列檔名與行號，不印內容。
4. **不得有 symlink。**

**空差異**：網站沒有變動時（例如當日短訊 0 則），推送算成功但不建 commit，寫進 Actions 摘要。

### 4.3 推送與冒煙測試

- **推送**：用部署金鑰推到公開 repo 的 main，每次一個新 commit。
  - commit 訊息只寫「部署 YYYY-MM-DD〔期別代號〕」，作者固定為機器人名稱與 noreply 信箱；私人 commit SHA 只留在私人 repo 的 Actions 紀錄。
  - 依 GitHub 文件，用部署金鑰推送會觸發分支部署的 Pages；用 `GITHUB_TOKEN` 推送則不會。
- **金鑰使用方式**（不使用第三方 ssh action）：
  - 金鑰型別 ed25519；
  - `umask 077` 後，經 `env:` 把金鑰寫入 `$RUNNER_TEMP/key`；
  - 把 GitHub 的**完整 ssh-ed25519 主機公鑰行**寫進 `$RUNNER_TEMP/known_hosts`。公鑰行在建立 PR-1 時與 GitHub 文件的 SSH 金鑰指紋頁核對，不用 `ssh-keyscan`；
  - `GIT_SSH_COMMAND` 指定金鑰檔、`UserKnownHostsFile`，並設 `IdentitiesOnly=yes`、`StrictHostKeyChecking=yes`；
  - 步驟結尾 `if: always()` 刪除金鑰檔。
- **冒煙測試**：
  - 每 30 秒輪詢新網址的 `deploy.json`，最多 10 分鐘，直到內容等於本次推送值；
  - 再抓首頁與最新一期，必須回 200；
  - 切換前並列抓舊站首頁，兩站結果都寫進 Actions 摘要；PR-4 拿掉舊站檢查（步驟 9 後舊站必然 404 或轉址，留著會每天失敗）。
- **報警**：job 失敗時，GitHub 會寄 Actions 失敗通知給管理者。每日短訊排程也要讀最近一次 `publish-public` 的結果，失敗就寫進當日交接。

### 4.4 GitHub 端的保護（公開 repo）

- **分支規則**（ruleset 或傳統分支保護，以管理者實際能建立的為準）：禁止 force push、禁止刪除 main。
- **限制檔案路徑做不到**：GitHub 文件寫明推送規則只適用私人與內部 repo。第二輪審查寫「免費公開 repo 可用」是錯的，已更正。
- 因此**私人端的推送前檢查是唯一能擋內容的防線**；部署金鑰能寫入公開 repo 的任何檔案。
- **不設 interaction limits**：它會擋住新讀者送出回饋 Issue。

### 4.5 金鑰輪替

- 部署金鑰沒有到期日，自訂每年輪替一次。
- 交接檔記下輪替日期、程序與負責人；每日短訊排程在到期前 14 天起，於交接中提醒。

### 4.6 誤推處置（私人內容被推到公開 repo）

1. 把 `ENABLE_PUBLIC_PUBLISH` 設為 false，並撤銷部署金鑰；
2. 由管理者暫時關閉分支規則，force push 清除該 commit；
3. 向 GitHub Support 請求清除快取頁面與懸空的 commit；
4. 檢查有無新的 fork；
5. 記錄外洩範圍，必要時依更正政策對外說明，並**接受「無法保證收回」**。

## 5. 連結、網址與測試

- **網址常數**：`render-site.js` 增加 `PUBLIC_SITE_ORIGIN`、`PUBLIC_REPO_URL`，預設值等於現況；產生的頁面與測試共用。切換後的值：
  - `PUBLIC_SITE_ORIGIN` = `https://ailiteracytw.github.io`；
  - `PUBLIC_REPO_URL` = `https://github.com/ailiteracytw/ailiteracytw.github.io`。
- **網站改到根路徑**：2026-10-13 核對，網站頁面只用相對連結，沒有以 `/k12-ai-literacy-report/` 開頭的路徑，改到根路徑不會壞連結；驗收時仍逐頁實測。
- **已刊頁面的殼**：出版閘門逐屬性比對已登錄 daily 頁的殼（`validate-publication.js` 第 82–83 行）。所以網址常數只在切換 PR（PR-4）中改值，同時重新產生已刊 daily 頁。這是「已刊頁面頁尾網址變更」，主文不變，要在 PR 說明中列出受影響的頁。
- **要改的位置**（2026-10-13 核對）：
  - **產生程式**：`render-site.js` 第 52 行頁尾、第 252 行知識庫說明（寫死 `research/knowledge-base` 路徑，改指公開 repo 的 `knowledge-base/`）；改完執行 `render-site.js --write`，重新產生首頁、about、archive 四頁、daily 等頁。
  - **手寫頁**：`feedback/index.html`、`feedback/no-login/index.html`、`feedback/privacy/index.html`。
  - **Issue 表單**：`.github/ISSUE_TEMPLATE/reader-feedback.yml` 第 58 行的網址範例。
  - **測試**：
    - `validate-reader-feedback.test.js` 第 15 行，改用常數；
    - `validate-publication.test.js` 第 456 行，改為斷言舊刊連到新 repo 的 `methods/`；
    - `validate-reader-feedback.test.js` 第 21–22 行讀取 `research/summarize-reader-feedback.js`，私人 repo 內維持；複製到公開 repo 時，workflow 改指 `tools/`。
- **舊刊**：`monthly/2026-09/index.html` 第 60 行等處，連到上述 4 份文件，改指新 repo 的 `methods/`，沿用同頁更正框格式（legacy 規則允許最小改動加更正紀錄）。
- **讀者回饋停用設定**：`feedback/no-login-config.js` 維持停用，不隨搬遷重啟。
- **不加 canonical 與 noindex**：出版閘門只允許 stylesheet 與 icon 兩種 link（`validate-publication.js` 第 55–59 行），已登錄期別頁不能加。兩站並行期間內容重複，接受短期的搜尋引擎影響。

## 6. 切換期（兩站並行）

- **不用網站模式**：兩站由同一份已提交的 HTML 建置（`public-site.js` 直接複製，不重新渲染）。
- **中性公告**：PR-3 在首頁與列表頁頂端加一則兩站都正確的公告：「本站將於〔切換日〕改用新網址〔新網址〕；舊網址〔舊網址〕之後〔S8 的處理〕」。已登錄期別頁受出版閘門限制，不加公告。
- **驗收條件**：
  - 從 PR-3 加入 `push` 觸發的那天起算，連續 7 個日曆日 `publish-public` 沒有失敗，且其中至少 3 天有實際網站變更。
  - **驗收紀錄**：每日短訊排程在 09:30 那次執行時，在私人 repo 的驗收紀錄加一列：日期、run ID、結果、有無 commit、`deploy.json` 內容。
  - 漏記一天就算失敗；只有機器人部署 commit 算「有變更」；不得為湊天數製造變更。
  - 未達成就延後切換，不壓縮；**11/30 仍未達成，由管理者決定是否放棄**（放棄時的清理見第 7 節）。

## 7. 執行步驟

**PR 拆分**（每個都要 verify 全過，可以各自回退）：

| PR | 內容 | 對現有網站的影響 | 時間 |
|---|---|---|---|
| PR-1 | 公開資料清單推導（快照、知識庫過濾與索引重建、`methods/` 連結改寫）、推送前檢查與掃描規則、網址常數（預設等於現況）、`publish-public.yml`（只用 `workflow_dispatch`）、金鑰處理、冒煙測試，以及全部測試 | 無（網站清單不變；開關預設關） | 10/19 起，最晚 10/23；可在步驟 1b 前合併 |
| PR-2 | `methods/` 檔首說明、`publication/README.md`、`knowledge-base/README.md`、讀者回饋的公開 repo 版本（`tools/`；釘 SHA、`concurrency`） | 無 | 10/23 |
| PR-3 | 中性公告；`publish-public` 加 `push` 觸發 | 舊站首頁與列表頁出現公告 | 10/30；**10/29 月報部署與冒煙測試都通過才合併**，否則延到 11/2 |
| PR-4（切換 PR） | 網址常數改值並重新產生頁面、舊刊連結與更正框、測試第 15 與 456 行、`feedback/` 三頁與 Issue 表單、about 頁「我們不宣稱的事」與私人類別、拿掉公告 | 已刊 daily 頁頁尾網址變更 | 切換日 |

**執行順序**：

| 步驟 | 內容 | 誰做 | 確認點 | 放棄時的清理 |
|---|---|---|---|---|
| 0 | **2026-10-13 完成**：管理者決定 S0、帳號、S6、S8、S9 | 管理者 | — | — |
| 1a | **2026-10-13 完成**：用現有帳號建立免費組織 `ailiteracytw`（選「My personal account」，日後辦公室正式成立可改簽單位合約）；Claude GitHub App 已安裝到組織；`ailiteracytw.github.io` 已建立，**目前為私人**，步驟 1b 開 Pages 前改為公開，並確認仍無任何 commit。原規劃內容：組織設定：要求成員啟用兩步驟驗證、成員基本權限設為「無」、維持預設的「不允許 fork 私人 repo」；在 https://claude.ai/connect-github 把 Claude GitHub App 安裝到組織（可先只授權所選 repo）；可選：建立**空的**公開 repo `ailiteracytw.github.io` 保留名稱（不勾 README，不開 Pages） | 管理者（**可立即做**，約 15 分鐘） | 組織與 App 安裝完成 | 刪除組織 |
| 1b | `ailiteracytw.github.io` 改為公開；設分支規則（Include default branch；只勾 Restrict deletions、Block force pushes；不要求 PR；bypass 留空）；在自己電腦產生 ed25519 部署金鑰：公鑰加到公開 repo 的 Deploy keys 並勾「允許寫入」，私鑰存入現有 repo 的 `environment: public-site`（只允許 `main`），secret 名稱 `PUBLIC_DEPLOY_KEY`，之後刪除本機私鑰；把 `k12-ai-literacy-report-restricted` 轉移到組織，並加入 Claude GitHub App 的允許清單。**Pages 不在此步開**：repo 仍是空的，沒有 main 分支可選 | 管理者（時段一，約 30 分鐘；**PR-1 接近完成時再做**，金鑰建好即可在步驟 4 使用） | claude.ai 連線頁的 Check repository status 顯示可存取 restricted repo | 撤銷金鑰；restricted repo 可再轉回 |
| 2 | 讀取最近 10 次 run 的實際分鐘數，乘以每月預期次數 | 編輯 session | 低於 2,000 分鐘的 80% | — |
| 3 | 權限試跑：各工作 session 在已轉到組織的 `ailiteracytw/k12-ai-literacy-report-restricted` 開 PR、合併（同時驗證 App 在組織上可用）；用 `get_trigger` 確認每日短訊排程 ID，寫入交接檔 | 編輯 session、管理者 | 試跑成功、ID 已記 | — |
| 4 | 合併 PR-1（若尚未合併）；設 `ENABLE_PUBLIC_PUBLISH=true`；手動觸發第一次推送；推送後由管理者在公開 repo 的 Settings → Pages 設定從 `main` 根目錄部署（若尚未自動啟用）；以 workflow 做負向測試：用金鑰 force push 必須被拒；以第 7.1 節清單驗收新站 | 編輯 session、管理者 | 第 7.1 節清單；force push 被拒 | 開關設 false |
| 5 | 合併 PR-2；新 repo 的讀者回饋表單送出一則測試 Issue | 編輯 session、管理者 | 表單與每週整理正常 | revert PR-2 |
| 6 | 合併 PR-3：公告上線、開始驗收期；改寫每日短訊排程，讀 `publish-public` 結果並記驗收紀錄 | 編輯 session、管理者 | 排程試跑一次 | revert PR-3、還原排程 |
| 7 | 驗收期（第 6 節條件） | 自動 | 條件達成 | 同步驟 6 |
| 8 | 切換日（早於 11/9 不做）：暫停當日每日短訊一次；合併或關閉所有開啟中的 PR；只刪除對應 PR 已合併或關閉的分支；匯出讀者 Issue 到 `feedback-archive/`；合併 PR-4；`vars.ENABLE_VERIFIED_PAGES_DEPLOY` 設為 false，停用舊站部署（job 保留至少一個月）；S8 若要轉址，此時上線並實測 | 編輯 session | 新站正常；轉址實測通過 | 舊站部署開關設回 true、revert PR-4 |
| 9 | 用 API 列出現有 fork 並記入交接檔；**現 repo 轉移到組織，接著改私人**；確認 Actions 變數、secret 與部署金鑰仍在（文件寫明 secret 與部署金鑰會跟著轉移，變數未寫明）；S9 選甲時把部署私鑰改存為 repo secret（第 4.1 節）；停用私人 repo 的 `reader-feedback-digest.yml`；更新各 session 的 git remote、雲端環境選用的 repo 與排程 | **管理者（時段二，約 45 分鐘，排在每日短訊時間之外）** | 新站正常；私人 repo CI 正常；排程能讀到新位置；第 7.1 節清單 | **實質不可回復** |
| 10 | 驗收；更新交接檔、SOP、README；隔日短訊照常，前一日項目若仍在 7 天內就併入並標「補發」 | 編輯 session、管理者 | 驗收紀錄 | — |

**回復**：

- **步驟 9 之前**：隨時可以回到舊站。把 `ENABLE_PUBLIC_PUBLISH` 設為 false，舊站部署開關設回 true，revert PR-3／PR-4。**步驟 9 是回到舊站的最後期限。**
- **步驟 9 之後，新站失效時**（依序）：
  1. 把 `ENABLE_PUBLIC_PUBLISH` 設為 false，停止後續推送；
  2. 在公開 repo `git revert` 上一次部署的 commit（每次部署只有一個 commit）；
  3. 私人 repo 修正後，重新開啟開關並手動推送；
  4. 只有 Actions 本身無法使用時，才考慮把私人 repo 改回公開，而且須管理者書面同意。改回前，先刪除私人期間的 workflow 執行紀錄（改回公開時會一併公開），並評估私人期間的歷史會公開哪些內容。

### 7.1 驗收清單

- 新站各公開網址（首頁、daily、weekly、monthly、archive 四頁、about、feedback），桌面與手機都回 200，沒有水平溢出；
- 公開 repo 的檔案集合等於公開資料清單，`deploy.json` 為本次推送值；
- 公開 repo 沒有 `research/`、`drafts`、未登錄期別的快照、隱藏的知識庫編號；
- `methods/` 沒有指向未公開檔案的連結；
- 讀者回饋表單能送出測試 Issue，每週整理能讀到；
- 舊刊連結指向 `methods/`，更正框已加（PR-4 後）；
- 沿用 `research/pages-browser-acceptance-2026-10-09.md` 的格式做瀏覽器實測紀錄。

### 7.2 要改的文件與排程

- **轉移時機**：現有 repo **不可提早轉移**。它仍公開時轉移，舊站網址會立刻變成組織網址下的路徑，舊網址提前失效；所以轉移與改私人在步驟 9 一起做。
- **SOP 與說明文件**：
  - `editorial-workflow-master.md`：流程圖、PR → verify → deploy 段落、「公開 repo 仍可能公開研究紀錄」一句；
  - `SESSION-HANDOFF.md`：「Public Repo 保持現況」等句、部署驗收步驟、新 session 先看公開 PR 與 Actions 的指示、每日短訊排程 ID、金鑰輪替日期、fork 清單、repo 新位置；
  - `README.md`、`research/pages-*.md`、`vars.ENABLE_VERIFIED_PAGES_DEPLOY` 的說明。
- **排程**：2026-10-13 `list_triggers` 查到啟用中的每日短訊是 trig_01Tr5NNASUdpZzAi2ZwR99Pj，交接檔另記 trig_013Gz1Pk85Fe18FZiuDc7HYv，兩者不一致。步驟 3 用 `get_trigger` 確認後寫入交接檔。
- **分支清單**：列出各 session 分支、負責人與切換前狀態；切換後保留未合併的分支。

## 8. 對讀者的揭露

- **公告**（PR-3 起，兩站都顯示）：新網址、切換日期、舊網址之後的處理（S8）。
- **about 頁**（PR-4），原因照實寫：
  - 「已登錄期別的主張與原文快照都在公開 repo；草稿與候選池改為不公開。」
  - 「過去 repo 公開期間，草稿與候選池曾經公開，無法收回。」
  - 「2026-09 舊刊月報有部分引文是對照未公開的 PDF 全文核對。」
  - 再加上第 2 節第 4 點與私人類別、理由。
- **更正政策**：加一句「repo 拆分不改變已登錄主張的來源可查性」。
- **讀者回饋政策與 `feedback/` 頁**：Issue 位置改為新 repo；切換日前的回饋只以編號清單歸檔於 `feedback-archive/`；每週整理的統計從切換日重新起算。

## 9. 風險

| 風險 | 處理 |
|---|---|
| 私人內容被推到公開 repo | 私人端推送前檢查是唯一能擋內容的防線（第 4.2 節）；誤推處置（第 4.6 節） |
| 能推送到私人 repo 的人改掉檢查、取用金鑰 | 免費方案下無法技術防止（S9）；只防誤觸 |
| 有人直接改公開 repo | 推送前比對遠端檔案樹，不等就停止 |
| 金鑰外洩或失效 | 每年輪替；冒煙測試失敗寄通知 |
| 推送悄悄停止 | 每日驗收紀錄；冒煙測試輪詢 `deploy.json`；公開 repo 60 天無活動時排程會被停用，每日部署可維持活動 |
| 私人 repo 的 Actions 額度 | 免費方案每月 2,000 分鐘（GitHub 文件）；步驟 2 實測 |
| 讀者勘誤中斷 | 步驟 5 先測新表單；步驟 8 匯出舊 Issue 編號（GitHub 不允許從私人 repo 轉移 Issue 到公開 repo） |
| 舊網址在步驟 9 後變成 404 | S8 |
| 已刊 daily 頁頁尾網址變更 | 只在 PR-4 一次改，PR 說明列出受影響頁 |
| 已公開的歷史與 fork | 無法收回；照實記錄 |

## 10. 待管理者決定

**已決定（2026-10-13）**：

- **S0 方案**：甲，全拆。
- **帳號**：GitHub 組織 `ailiteracytw`，由管理者現有帳號建立並擔任擁有者。不另開個人帳號：GitHub 服務條款規定一人只能有一個免費個人帳號，且帳號不得多人共用。
- **S6、S8、S9**：照預設（下列各項標「預設」者）。S9 選甲，所以步驟 9 把部署私鑰改存為 repo secret，PR-4 拿掉 workflow 的 `environment:`。

**各項內容**：

- **S6 時程**：
  - 步驟 1a 已完成；PR-1 在下週一（10/19，用量重置）起做，用 Sonnet 實作、合併前以 Opus 只審 workflow、推送前檢查與知識庫過濾；步驟 1b 在 PR-1 接近完成時做；步驟 1b–4 最晚 10/23；10/21–22 是保護日，不排工作，順延；
  - 10/30 合併 PR-3（10/29 月報部署通過才合併，否則 11/2）；
  - 驗收條件達成後切換，最早 11/9；11/30 未達成由管理者決定是否放棄。
- **S8 舊網址**（步驟 9 後 `jhchenmooc.github.io/k12-ai-literacy-report/` 會 404）：
  - **丙、個人站台 404 轉址（預設，須先實測）**：
    - 做法：在管理者個人帳號建立 `jhchenmooc.github.io` 公開 repo，只放一個 `404.html`，把 `/k12-ai-literacy-report/…` 轉到 `https://ailiteracytw.github.io/…` 的對應路徑；
    - 前提：project 站取消發佈後，GitHub Pages 會改由個人站台處理該路徑。這點沒有在文件上查到，步驟 8 前實測，不成立就改丁；
    - 好處：不佔用舊 repo 名稱，github.com 上的舊 repo 連結仍會轉到組織；沒有誤推到轉址 repo 的風險；
    - 注意：這個 404 頁會成為個人帳號下所有找不到頁面的共同 404，其他路徑只顯示一般的找不到頁面，不轉址。
  - **甲、以舊名稱建轉址 repo**：轉移後個人帳號下的舊名稱空出，可以建一個只放轉址頁的公開 repo。但依 GitHub 文件，在舊位置建新 repo 會永久刪除 github.com 的自動轉址；任何仍用舊名稱的 git 設定或排程，會把內容推到這個公開 repo。
  - **丁、不轉址**：舊網址直接 404，靠公告期讓讀者改書籤。
- **S9 金鑰保護**：
  - **甲、接受（預設）**：明寫「能推送到私人 repo 的人都能用部署金鑰」，靠 main 限定、推送前檢查與誤推處置。目前能推送的只有管理者與編輯 session，它們本來就有私人 repo 全部內容的存取權。
  - **乙、組織改用 GitHub Team（付費，依人數計費）**：私人 repo 恢復 environment 保護與分支保護。

**其餘項目（照預設）**：

- **S1 公開 repo 與網址**：`ailiteracytw/ailiteracytw.github.io`，網址 `https://ailiteracytw.github.io/`。自訂網域另案。
- **S2 公開內容**：第 3.2 節的推導規則。
- **S3 讀者回饋**：表單、每週整理 workflow 與整理程式都放公開 repo，用公開 repo 自己的 `GITHUB_TOKEN`。
- **S4 `k12-ai-literacy-report-restricted`**：維持獨立，步驟 1b 轉移到組織；步驟 3 用它做權限試跑。
- **S5 舊刊連結**：4 份文件放進 `methods/`，連結改指向新位置，加更正框。
- **S7 公告期**：至少 10 天。

## 11. 本方案不處理

- 已公開歷史中的內容（例如 `research/drafts/2026-10-monthly-crosscheck.md` 第 40 行）與已存在的 fork：無法收回；是否在私人 repo 中修改，或依更正政策處理，另行決定。
- 自訂網域與 HTTPS 憑證。
- 公開 repo 的授權條款（LICENSE），另案決定。

## 12. 移交

用組織的目的之一是日後移交。移交時：

- **人員**：
  - 先把接手者加為組織的第二位擁有者，交接期兩人並存，交接完再移除原擁有者；
  - 不交出任何帳號密碼。GitHub 也建議組織至少有兩位擁有者，避免唯一擁有者聯絡不上。
- **跟著組織走的**：repo、Issue、Pages、部署金鑰、Actions secret、Claude GitHub App 的安裝；Actions 變數在文件上未寫明，轉移後要確認。
- **不會跟著組織走、要接手者重建的**：
  - claude.ai 上的排程（每日短訊等）屬於建立者的 claude.ai 帳號，接手者要在自己的帳號重建，並在交接檔記下各排程的內容；
  - 雲端環境設定與連線的服務；
  - 管理者個人帳號下的 S8 轉址 repo（若採丙或甲），可留在原處，或轉移給組織。
- **組織聯絡信箱**：目前用管理者的信箱，移交時改為接手者或單位信箱。
- **交接檔**：記錄組織擁有者名單、金鑰輪替日期、排程清單與內容、轉址 repo 的位置。
