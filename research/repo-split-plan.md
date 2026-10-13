# 拆分為私人來源 repo 與公開網站 repo：搬遷方案 v0.3（草稿）

> 建立日期：2026-10-13。狀態：**草稿，待管理者決定第 10 節 S0–S8**。本方案不改任何程式、設定或 repo；所有 GitHub 設定變更（建立 repo、改私人、金鑰、Pages、ruleset）由管理者親自操作。
>
> 修訂紀錄：
> - v0.1 → v0.2：依第一輪（Sonnet）審查修正；
> - v0.2 → v0.3：依第二輪（Fable，36 項）審查修正。
>
> 紀錄見 [repo-split-plan-reviews.md](repo-split-plan-reviews.md)。審查與修正都是 Anthropic 模型執行，不是外部真人審查。
>
> 管理者 2026-10-13 的方向：私人 repo 編寫與驗證，CI 把網站推到公開 repo；網站網址可以改，可換新名稱。

## 摘要

- **方案（S0）**：
  - 建議甲「全拆」：現在的 repo 保留原名改私人；新建公開 repo 收 CI 推送。
  - 乙「只搬草稿」列為比較（第 1 節）。
- **原則**：已刊出主張所依據的證據必須能公開查到；只有未刊內容可以私人（第 2 節）。
- **公開內容由程式依規則推導**，不手寫清單（第 3 節）：
  - 只公開已登錄期別的主張，以及它們實際引用的快照；
  - 知識庫套用網站既有的過濾規則；
  - 方法文件原樣公開，指向私人檔案的連結改為純文字。
- **三層防護**（第 4 節）：
  1. 私人端：公開 repo 內容必須與推導結果完全相同，並做精確樣式的內容掃描；
  2. GitHub 端：ruleset 限制檔案路徑；
  3. 金鑰放在只允許 main 分支取用的環境中，PR 拿不到。
- **切換用開關，不改程式**（第 6 節）：
  - 網站模式變數：`legacy-notice`（舊站加公告）、`preview`（新站預覽）、`live`（新站正式）；
  - 推送與舊站部署各有一個開關。
- **步驟拆成 6 個小 PR**；前 3 個不改變現有網站，可在 10/17–10/20 完成（第 7 節）。
- **新站失效時**，在公開 repo 撤回上一次部署即可，不需要把私人 repo 改回公開。

## 1. 方案比較（S0）

| | 甲、全拆（建議） | 乙、只搬草稿 |
|---|---|---|
| 做法 | 現有 repo 保留原名改私人；新建公開 repo 收 CI 推送 | 網站與程式留在現有公開 repo；草稿、候選池、內部方案搬到 `k12-ai-literacy-report-restricted` |
| 網址 | 改變 | 不變 |
| 讀者勘誤、排程 | 要搬、要改寫 | 不變 |
| 主要難處 | 新 repo、金鑰、推送流程、改連結與測試、公告期兩站並行 | **CI 拆成跨 repo**：知識庫測試要求候選池與知識庫紀錄一一對應，候選池在 `research/drafts/`；月報草稿的快照也在 `publication/sources/` |
| 保護範圍 | 全部未刊內容與以後的內部工作 | 只有搬走的檔案；日後新增的檔案要靠紀律放對地方 |
| 已公開的歷史 | 兩案都無法收回 | 同左 |

**建議甲**。理由：乙的「CI 讀不到私人 repo」會牽動出版閘門本身；甲的 CI 不必拆，只多一道推送。

## 2. 公開與私人的原則

1. **已刊出主張所依據的證據，必須能公開查到**：逐項主張、原文短快照、更正紀錄、查核方法。
   - 已知例外：2026-09 月報部分引文，是對照未放入 repo 的 PDF 全文核對的（`research/pages-browser-acceptance-2026-10-09.md`）。這是 legacy 期別，維持現有說明。
   - 新期別若出現無法公開的證據，**先建立標示機制，再刊出**。
2. **只有未刊內容可以私人**，類別與理由寫在 about 頁：
   - 未刊草稿與候選池：尚未查核，公開容易被誤當結論；
   - 未發表的審查紀錄與內部方案；
   - 個資與讀者隱私；
   - 受版權限制的原件。
3. **以前已公開的歷史無法收回**，照實記錄。本方案與教師資訊方案目前也已在公開 repo 的分支上。
4. **讀者能核對與不能核對的事**（寫進 about 頁「我們不宣稱的事」）：
   - 能核對：網站與公開資料的雜湊一致；每則已刊主張的來源快照。
   - 不能核對：私人 repo 的測試是否真的跑過；部署清單上的測試結果由編輯方自行填報，不是第三方稽核。
   - 和既有的「同一模型多次查核不等於獨立審閱」並列，避免讀者以為拆分後多了保證。

## 3. 拆分後的內容

### 3.1 私人來源 repo（原名 `jhchenmooc/k12-ai-literacy-report`）

- 全部原始碼、測試與 CI；
- `research/` 全部，**特別是** `SESSION-HANDOFF.md`（含 session 與排程 ID）、`research/audits/`（含後台設定快照）、草稿與候選池；
- 未登錄期別的快照（例如 10 月月報草稿引用的 `publication/sources/m2026-10-*.txt`）；
- 版權原件。

### 3.2 公開網站 repo（新名稱，S1）

公開內容**由 `research/public-site.js` 依規則推導**，網站清單與公開資料清單共用同一個來源，不另外手寫第二份。

| 目錄 | 內容 | 推導規則 |
|---|---|---|
| 根目錄 | 網站與 `.nojekyll`；`deploy.json`（部署日期、期別、建置雜湊） | 現行公開清單 |
| `verification/claims/` | 已登錄於 `publication/issues.json` 的期別所對應的 claims JSON | 依 `issues.json` |
| `verification/sources/` | 上述 claims 的 `evidence_path` 實際指到的快照 | **只取被引用的快照**；未登錄期別的快照不公開 |
| `verification/legacy/` | `publication/audits/2026-09-29_10-08.json` | 明確標示「legacy、全部 hold、未經出版閘門」 |
| `verification/README.md` | 欄位說明：claims 中 `candidate_id` 對應的候選池在私人側；`ai_crosscheck_record` 等欄位照原樣公開 | 手寫 |
| `corrections/` | 更正日誌（原說法、錯誤類型、來源、修訂、日期、讀者回饋歸檔編號）；每次部署的清單（檔案雜湊、期別、私人端 verify 結果） | 部署時產生 |
| `methods/` | N1–N8、G1–G6、evidence-safety-gates、news-policy-verification、publication-check-spec、ai-literacy-scope-criteria、low-human-review-policy、reader-feedback-policy；舊刊連到的 4 份文件 | **原樣公開**，不另做公開版；推送時在檔首加一行「內部工作文件原樣公開，含管理者決定紀錄」；指向私人檔案的連結改為純文字並註「未公開」 |
| `knowledge-base/` | `data/records.csv`、`relations.csv`、`search_runs.csv`、`indexes/`；`README.md`（核對狀態圖例與「書目索引，不是認證」聲明） | 依 `render-site.js` 第 182 行的同一條規則，濾掉「有 `source_candidate_id` 且 `discovered_unverified`」的審查中候選；`search_runs.csv` 的 notes 欄中，私人路徑改寫為「內部紀錄，未公開」；`schema.md`、`reports/` 不公開 |
| `tools/`、`.github/` | 讀者回饋 Issue 表單；每週整理 workflow；`summarize-reader-feedback.js`（從私人 repo 複製，workflow 路徑改指 `tools/`） | 例外清單 |
| `feedback-archive/` | 改私人前匯出的讀者 Issue：編號、類別、日期、處理結果，加一句去識別化的問題摘要（不含帳號、不轉貼原文）；歷週整理的數字 | 一次性 |
| `README.md` | 說明這是網站與公開資料的發布 repo、來源在私人 repo、如何回報錯誤 | 手寫 |

**推導程式要加的測試**：

- 未登錄期別的快照不得進入公開清單；
- 審查中候選不得進入公開的知識庫；
- `methods/` 的相對連結都必須落在公開內容內。

## 4. 部署流程與安全

### 4.1 推送 workflow

`publish-public.yml` **獨立成一個 workflow**，不放在 `verify-and-deploy.yml`：

- **觸發**：`workflow_dispatch`；第 7 節 PR-F 之後再加 `push: branches: [main]`。不使用 `pull_request`、`pull_request_target`、`workflow_run`。
- **開關**：`vars.ENABLE_PUBLIC_PUBLISH`。
- **金鑰保護**：部署金鑰放在 `environment: public-site`，設「只允許 main 分支」的部署分支規則，PR 情境拿不到金鑰。
- **與現有 workflow 的關係**：沿用 `concurrency: verified-pages`，避免交錯。新站推送失敗，不影響舊站 deploy 的結果。
- **寫法規範**：
  - `${{ github.event.* }}` 不直接放進 `run:`，改用 `env:`；
  - 第三方 action 釘到完整 SHA；
  - 頂層 `permissions: contents: read`；
  - 禁止 `set -x`。
- **網站模式**：建置時帶 `SITE_MODE`（見第 6 節）。

### 4.2 三道檢查（私人端，任一失敗就停止）

1. **內容完全相同**：清空公開 repo 工作樹後放入推導結果，與上次部署的差異只能出現在推導清單內的檔案。
2. **精確樣式的內容掃描**，比對下列樣式：
   - `research/drafts/`、`k12-ai-literacy-report-restricted`；
   - `trig_` 後接 20 個以上英數字、`session_01` 後接英數字；
   - `claude.ai/code/`；
   - 候選池檔名。

   規則與允許清單（`allow-mentions.txt`，讓 `methods/` 文件中說明用途的字面提及通過）放在 `public-site.js`，並附 fixture 測試：至少一個應放行的例子、一個應擋下的例子。掃描失敗時只列檔名與行號，不印內容。
3. **不得有 symlink。**

**空差異**：網站沒有變動時（例如當日短訊 0 則），推送算成功但不建 commit，寫進 Actions 摘要。

### 4.3 推送與冒煙測試

- **推送**：用部署金鑰推到公開 repo 的 main，每次一個新 commit。
  - commit 訊息只寫「部署 YYYY-MM-DD〔期別代號〕」，作者固定為機器人名稱與 noreply 信箱；私人 commit SHA 只留在私人 repo 的 Actions 紀錄。
  - 依 GitHub 文件，用部署金鑰推送會觸發分支部署的 Pages；用 `GITHUB_TOKEN` 推送則不會。
- **金鑰使用方式**（不使用第三方 ssh action）：
  - 金鑰型別 ed25519；
  - `umask 077` 後，經 `env:` 把金鑰寫入 `$RUNNER_TEMP/key`；
  - `GIT_SSH_COMMAND` 指定該檔，並設 `IdentitiesOnly=yes`、`StrictHostKeyChecking=yes`；
  - 使用 workflow 中寫死的 GitHub 主機指紋，不用 `ssh-keyscan`；
  - 步驟結尾 `if: always()` 刪除金鑰檔。
- **冒煙測試**：
  - 每 30 秒輪詢新網址的 `deploy.json`，最多 10 分鐘，直到內容等於本次推送值；
  - 再抓首頁與最新一期，必須回 200；
  - 失敗就讓 job 失敗。
  - 並列抓舊站首頁，兩站結果都寫進摘要，排程不必再人工逐站確認。

### 4.4 GitHub 端的保護（公開 repo）

- **ruleset**：免費方案的公開 repo 可用，設定：
  - 禁止 force push；
  - 禁止刪除 main；
  - **限制檔案路徑**：禁止 `research/**`、`**/drafts/**`、`*.pdf`，以及 `.github/workflows/` 中除例外以外的檔案。
- **不設 bypass**：管理者本人也受限制；需要時暫時關閉 ruleset。
- 部署金鑰的寫入權相當於管理者等級的操作，所以私人端的三道檢查仍是主要防線。
- 步驟 1 後，用金鑰嘗試推一個 `research/x` 檔，預期被拒絕（負向測試）。

### 4.5 金鑰輪替

- 部署金鑰沒有到期日，自訂每年輪替一次，到期前 14 天提醒。
- 交接檔記下輪替程序與負責人。

### 4.6 誤推處置（私人內容被推到公開 repo）

1. 立即撤銷部署金鑰；
2. 由管理者暫時關閉 ruleset，force push 清除該 commit；
3. 向 GitHub Support 請求清除快取頁面與懸空的 commit；
4. 檢查有無 fork；
5. 記錄外洩範圍，必要時依更正政策對外說明，並**接受「無法保證收回」**；
6. 只有外洩內容是個資或版權原件時，才考慮重建新 repo（網址會再變）。

## 5. 連結、網址與測試

- **網址與模式變數**：`render-site.js` 增加 `PUBLIC_SITE_ORIGIN`、`PUBLIC_REPO_URL`、`SITE_MODE`，預設值等於現況；產生的頁面與測試共用這些常數。
- **要改的位置**（2026-10-13 核對）：
  - **產生程式**：`render-site.js` 第 52 行頁尾、第 252 行知識庫說明。改完執行 `render-site.js --write`，重新產生首頁、about、archive、daily 等頁。
  - **手寫頁**：`feedback/index.html`、`feedback/no-login/index.html`、`feedback/privacy/index.html`。
  - **測試**：`validate-reader-feedback.test.js` 第 15 行、`validate-publication.test.js` 第 456 行，改用常數。
  - **讀者回饋**：`validate-reader-feedback.test.js` 第 23–27 行與 `reader-feedback-digest.yml` 第 18、22 行寫死 `research/summarize-reader-feedback.js`；私人 repo 內維持，複製到公開 repo 時改路徑。
- **舊刊**：4 份研究文件放進 `methods/`；舊刊連結改指向新位置，沿用 `monthly/2026-09/index.html` 第 60 行的更正框格式（legacy 規則允許最小改動加更正紀錄）。
- **讀者回饋停用設定**：`feedback/no-login-config.js` 維持停用，不隨搬遷重啟。
- **canonical 與 noindex**（見第 6 節）。

## 6. 切換期（兩站並行）

**網站模式**：

| 模式 | 用在 | 頁面效果 |
|---|---|---|
| `legacy-notice` | 舊站，公告期內 | 首頁與列表頁頂端加更名公告（由共用頁首產生）；每頁 `<link rel="canonical">` 指向新站 |
| `preview` | 新站，公告期內 | 橫幅寫「新網址，內容與舊站相同；〔切換日〕前以舊站為準」並連回舊站；`noindex`，canonical 指向舊站 |
| `live` | 新站，切換後 | 拿掉橫幅與 `noindex`，canonical 指向自己 |

**其他規則**：

- 已登錄的正式期別頁受出版閘門限制，不加公告。
- 兩站由同一份原始碼、不同模式建置；第 7.1 節的雜湊比對以「相同模式重建」為準。
- **驗收條件**：連續 7 個日曆日 `publish-public` 沒有失敗，且其中至少 3 天有實際網站變更。未達成就延後切換，不壓縮。
- **每日短訊排程**：步驟 6 改為「確認冒煙測試摘要中兩站都正常」，不另做人工逐站確認。

## 7. 執行步驟

**PR 拆分**（每個都要 verify 全過，可以各自回退）：

| PR | 內容 | 對現有網站的影響 | 時間 |
|---|---|---|---|
| PR-A | `public-site.js` 推導公開清單（含快照、知識庫過濾、`methods/` 連結檢查）、三道檢查與掃描規則，以及測試 | 無 | 10/17–10/20 |
| PR-B | 網址常數、`SITE_MODE`（預設等於現況），測試改用常數 | 無 | 10/17–10/20 |
| PR-C | `publish-public.yml`（只用 `workflow_dispatch`）、金鑰處理、冒煙測試 | 無（開關預設關） | 10/17–10/20（需步驟 1 完成） |
| PR-D | `methods/` 原樣公開的處理、舊刊連結與更正框、`verification/README.md`、`knowledge-base/README.md` | 舊刊兩頁的連結 | 10/23 或 10/30 |
| PR-E | 讀者回饋表單與整理程式的公開 repo 版本（`tools/`；釘 SHA、`concurrency`） | 無 | 10/23 或 10/30 |
| PR-F | about 頁「我們不宣稱的事」補充、公告文字；`publish-public` 加 `push` 觸發 | 舊站開始顯示公告（設 `SITE_MODE=legacy-notice`） | 10/30 |

**執行順序**：

| 步驟 | 內容 | 誰做 | 確認點 | 可否回復 |
|---|---|---|---|---|
| 0 | 決定 S0–S8 | 管理者 | — | — |
| 1 | 建立公開 repo；開 Pages（從分支部署）；設 ruleset（含限制檔案路徑）；建立部署金鑰並存入 `environment: public-site`；設 interaction limits | 管理者（時段一，約 30 分鐘，建議 10/17–10/20） | 負向測試被擋 | 可刪除、可撤銷 |
| 2 | 讀取私人化前最近 10 次 run 的實際分鐘數，乘以每月預期次數 | 編輯 session | 低於 2,000 分鐘的 80% | — |
| 3 | 權限試跑：各工作 session 在既有私人 repo `k12-ai-literacy-report-restricted` 開 PR、合併 | 編輯 session、管理者 | 試跑成功 | — |
| 4 | 合併 PR-A、B、C；手動觸發推送；新站以 `preview` 模式驗收 | 編輯 session | 第 7.1 節清單 | 可重推 |
| 5 | 合併 PR-D、E；新 repo 的讀者回饋表單送出一則測試 Issue | 編輯 session、管理者 | 表單與每週整理正常 | 可回退 |
| 6 | 合併 PR-F：舊站公告上線、開始兩站並行；用 `list_triggers` 查實際的每日短訊排程 ID，改寫其步驟 6 | 編輯 session、管理者 | 排程試跑一次 | 可回退 |
| 7 | 驗收期（至少 7 個日曆日，第 6 節條件） | 自動 | 條件達成 | — |
| 8 | 切換日：暫停當日每日短訊排程一次（切換後補發）；合併或關閉所有開啟中的 PR；只刪除「對應 PR 已合併或關閉」的分支；匯出讀者 Issue 到 `feedback-archive/`；新站改 `live`；把 `vars.ENABLE_VERIFIED_PAGES_DEPLOY` 設為 false 停用舊站部署（不刪除 job，保留至少一個月） | 編輯 session | 新站 `live` 正常 | 可回退 |
| 9 | **現 repo 改私人**；停用私人 repo 的 `reader-feedback-digest.yml`（否則會讀私人 repo 的 Issue） | **管理者（時段二，約 30 分鐘，排在當日短訊時間之外）** | 新站正常；私人 repo CI 正常；第 7.1 節清單 | **實質不可回復** |
| 10 | 驗收；更新交接檔、SOP、README；補發當日短訊 | 編輯 session、管理者 | 驗收紀錄 | — |

**新站失效時的回復**（依序）：

1. 在公開 repo `git revert` 上一次部署的 commit（每次部署只有一個 commit，revert 乾淨）；
2. 私人 repo 修正後，重新手動推送；
3. 只有 Actions 本身無法使用時，才考慮把私人 repo 改回公開，而且須管理者書面同意。

改回公開前，要先處理兩件事：
- 私人期間的 Actions 紀錄會對所有人公開，須先刪除私人期間的 workflow 執行紀錄；
- 評估私人期間的歷史會公開哪些內容。

### 7.1 驗收清單

- 新站各公開網址（首頁、daily、weekly、monthly、archive 四頁、about、feedback），桌面與手機都回 200，沒有水平溢出；
- 公開 repo 的檔案雜湊等於私人 repo main 以相同模式重建的結果；
- 公開 repo 沒有 `research/`、`drafts`、未登錄期別的快照、審查中候選；
- `methods/` 沒有指向 `research/` 的連結；
- 讀者回饋表單能送出測試 Issue，每週整理能讀到；
- 舊刊連結指向 `methods/`，更正框已加；
- 舊站公告在首頁與列表頁頂端；
- 沿用 `research/pages-browser-acceptance-2026-10-09.md` 的格式做瀏覽器實測紀錄。

### 7.2 要改的文件與排程

- **SOP 與說明文件**：
  - `editorial-workflow-master.md`：流程圖、PR → verify → deploy 段落、「公開 repo 仍可能公開研究紀錄」一句；
  - `SESSION-HANDOFF.md`：「Public Repo 保持現況」等句、部署驗收步驟、新 session 先看公開 PR 與 Actions 的指示、每日短訊排程 ID；
  - `README.md`、`research/pages-*.md`、`vars.ENABLE_VERIFIED_PAGES_DEPLOY` 的說明。
- **排程**：步驟 6 用 `list_triggers` 查實際 ID。2026-10-13 查到啟用中的每日短訊是 trig_01Tr5NNASUdpZzAi2ZwR99Pj，交接檔另記 trig_013Gz1Pk85Fe18FZiuDc7HYv，兩者不一致，以實查為準。
- **分支清單**：列出各 session 分支、負責人與切換前狀態；切換後保留未合併的分支。

## 8. 對讀者的揭露

- **舊站公告**（PR-F 起）：
  - 新網址、切換日期；
  - 原因：直接寫「已刊內容與證據全部留在公開側；草稿與候選池改為不公開」；
  - 請讀者更新書籤，並說明切換日前兩邊內容相同；
  - 舊網址何時停止服務。
- **about 頁**：在「我們不宣稱的事」補充第 2 節第 4 點；另列私人類別與理由。
- **更正政策**：加一句「repo 拆分不改變已刊主張的來源可查性」。
- **讀者回饋政策與 `feedback/` 頁**：Issue 位置改為新 repo；「切換日前的回饋已歸檔於 `feedback-archive/`」；更正紀錄改引用歸檔編號。

## 9. 風險

| 風險 | 處理 |
|---|---|
| 私人內容被推到公開 repo | 三層防護（第 4 節）；誤推處置流程 |
| 金鑰外洩或失效 | 只放在受保護的 environment；每年輪替；冒煙測試失敗即報警 |
| 推送悄悄停止 | 冒煙測試輪詢 `deploy.json`；公開 repo 60 天無活動時排程會被自動停用，每日部署可維持活動 |
| 私人 repo 的 Actions 額度 | 免費方案每月 2,000 分鐘（GitHub 文件）；步驟 2 實測；達 80% 時警示 |
| 讀者勘誤中斷 | 步驟 5 先測新表單；步驟 8 匯出舊 Issue（GitHub 不允許從私人 repo 轉移 Issue 到公開 repo） |
| 舊連結失效 | 公告期加 canonical；S8 轉址選項；已寄出的連結無法修正 |
| 切換時有進行中的工作 | 步驟 8 暫停短訊一次、處理開啟中的 PR |
| 已公開的歷史 | 無法收回；照實記錄 |

## 10. 待管理者決定（附預設值，可以只回「同意」或改單項）

- **S0 方案**：預設甲（全拆）。
- **S1 新 repo 與網站名稱**：預設 `k12-ai-literacy-tw`（網址 `jhchenmooc.github.io/k12-ai-literacy-tw/`）。用自訂網域可以讓日後再換 repo 時網址不變，若要用，另案處理。
- **S2 公開內容**：預設第 3.2 節的推導規則。
- **S3 讀者回饋**：預設表單、每週整理 workflow 與整理程式都放公開 repo，用公開 repo 自己的 `GITHUB_TOKEN`。
- **S4 `k12-ai-literacy-report-restricted`**：預設維持獨立；步驟 3 用它做權限試跑。
- **S5 舊刊連結**：預設 4 份文件放進 `methods/`，連結改指向新位置，加更正框。
- **S6 時程**：
  - 預設 10/17–10/20 完成步驟 1–4；
  - 10/30 舊站放公告、開始兩站並行；
  - 驗收條件達成後切換，最早 11/9。
- **S7 公告期**：預設至少 10 天。
- **S8 舊網址轉址**：
  - **預設不做**，以公告期與 canonical 代替。
  - 若要做，私人 repo 須改名（例如 `-src`），再以原名建一個只放轉址頁、沒有 CI 與 secret 的公開 repo，並設 ruleset 限制檔案路徑。
  - 風險：任何仍使用舊名稱的 git 設定或排程，會把內容推到這個公開的轉址 repo；必須先確認所有 session、排程、本機設定都已改用新名稱。

## 11. 本方案不處理

- 已公開歷史中的內容（例如 `research/drafts/2026-10-monthly-crosscheck.md` 第 40 行）：無法收回；是否在私人 repo 中修改，或依更正政策處理，另行決定。
- 自訂網域與 HTTPS 憑證。
- 公開 repo 的授權條款（LICENSE），另案決定。
