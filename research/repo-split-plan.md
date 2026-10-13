# 拆分為私人來源 repo 與公開網站 repo：搬遷方案 v0.2（草稿）

> 建立日期：2026-10-13。狀態：**草稿，待管理者決定第 10 節 S0–S8**。本方案不改任何程式、設定或 repo；所有 GitHub 設定變更（建立 repo、改私人、金鑰、Pages、ruleset）由管理者親自操作。
>
> 修訂紀錄：v0.1 → v0.2 依三輪不同模型審查的第一輪（Sonnet，37 項意見）修正，紀錄見 [repo-split-plan-reviews.md](repo-split-plan-reviews.md)。審查與修正都是 Anthropic 模型執行，不是外部真人審查。
>
> 管理者 2026-10-13 的方向：私人 repo 編寫與驗證，CI 把網站推到公開 repo；網站網址可以改，可換新名稱。

## 摘要

- **先選方案（S0）**：
  - **甲、全拆**（管理者目前的方向）：現在的 repo 保留原名改私人；新建公開 repo，只收 CI 推送的內容。
  - **乙、只搬草稿**：網站與程式留在現在的公開 repo，只把草稿、候選池、內部方案搬到私人 repo。
  - 兩者的比較見第 1 節。**建議甲**：CI 與出版閘門不必拆成跨 repo，工程上較乾淨。
- **不可妥協的原則**：**已刊出主張所依據的證據，必須能公開查到**。只有未刊內容（草稿、候選池、未刊審查、個資、版權原件）可以放私人（第 2 節）。
- **公開 repo 的內容**：
  - 網站；
  - 已刊期別的逐項主張與原文短快照；
  - 更正日誌與部署清單（每次部署的檔案雜湊）；
  - 查核方法 SOP；
  - 知識庫；
  - 讀者回饋表單與整理程式（第 3 節）。
- **安全設計**：
  - 用部署金鑰，只能寫入公開 repo；
  - 推送前比對檔案清單，並掃描內容有沒有內部路徑；
  - 每次部署只新增一個 commit，禁止 force push；
  - 先寫好誤推處置流程（第 4 節）。
- **切換期**：公告期內舊站仍是正本，新站標示「預覽」，兩站同時更新；新站連續 7 次每日部署成功並驗收後，才改私人（第 6、7 節）。
- **改私人實際上不可回復**：改回公開時，私人期間的歷史也會一併公開。
- **時程**：公告最早在 10/30 起算，切換在 11/9 以後。管理者需親自處理兩個約 30 分鐘的時段。

## 1. 方案比較（S0）

| | 甲、全拆（建議） | 乙、只搬草稿 |
|---|---|---|
| 做法 | 現有 repo 保留原名改私人；新建公開 repo 收 CI 推送 | 網站與程式留在現有公開 repo；草稿、候選池、內部方案搬到 `k12-ai-literacy-report-restricted` |
| 網址 | 改變（新 repo 名稱） | 不變 |
| 讀者勘誤、排程 | 要搬、要改寫 | 不變 |
| 主要難處 | 新 repo、金鑰、推送流程、改連結與測試、公告期兩站並行 | **CI 拆成跨 repo**：知識庫測試要求候選池與知識庫紀錄一一對應，候選池在 `research/drafts/`；搬走後，出版閘門與測試要能讀到私人 repo |
| 保護範圍 | 全部未刊內容與以後的內部工作 | 只有搬走的檔案；日後新增的檔案要靠紀律放對地方 |
| 已公開的歷史 | 兩案都無法收回 | 同左 |

**建議甲**：
- 乙看似較省事，但「CI 讀不到私人 repo」會牽動出版閘門本身；
- 而且每次新增檔案都要判斷放哪一邊，容易出錯。

甲的 CI 不用拆，只多一道推送；公開的內容由單一清單決定。

## 2. 公開與私人的原則

1. **已刊出主張所依據的證據，必須能公開查到**：逐項主張、原文短快照、更正紀錄、查核方法。不能只存在私人那邊。
2. **只有未刊內容可以私人**，類別與理由要公開寫明（見第 8 節 about 頁）：
   - 未刊草稿與候選池：尚未查核，公開容易被誤當結論；
   - 未發表的審查紀錄與內部方案；
   - 個資與讀者隱私；
   - 受版權限制的原件（例如 PDF 全文）。
3. **以前已公開的歷史無法收回**，照實記錄。
4. **公開資料由編輯方發布，不是第三方稽核**：外部無法獨立重跑私人 repo 的 CI；這一點要在 about 頁照實寫明。

## 3. 拆分後的內容

### 3.1 私人來源 repo（原名 `jhchenmooc/k12-ai-literacy-report`）

- 全部原始碼、測試與 CI；
- `research/`：草稿、候選池、審查、內部方案、趨勢語料、稽核紀錄；
- 版權原件。

### 3.2 公開網站 repo（新名稱，S1）

公開 repo 的內容**只由一份清單決定**：延伸 `research/public-site.js`，從同一個來源產生「網站檔案」與「公開資料檔案」兩份清單，不另外手寫第二份。

| 目錄 | 內容 | 說明 |
|---|---|---|
| 根目錄 | 網站（現行 `_public_site/` 的內容）與 `.nojekyll` | Pages 從 main 根目錄部署 |
| `verification/` | 已刊期別的 `publication/claims/*.json`、對應的 `publication/sources/` 短快照、每期索引、欄位說明 | 只放已登錄於 `publication/issues.json` 的期別 |
| `corrections/` | 更正日誌（原說法、錯誤類型、來源、修訂、日期、讀者 Issue 連結）；每次部署的清單（檔案雜湊、期別、verify 通過的測試名稱） | 部署時自動產生清單 |
| `methods/` | 對外的查核規則：N1–N8、G1–G6、evidence-safety-gates、news-policy-verification、ai-literacy-scope-criteria、low-human-review-policy、reader-feedback-policy；舊刊連到的 4 份文件（S5） | 公開版；內部草稿版留私人 |
| `knowledge-base/` | `data/`（records、relations、search_runs）與 `indexes/` | 歷年資料庫說明連到這裡；只是書目，不是認證 |
| `.github/` | 讀者回饋 Issue 表單；每週整理 workflow（S3） | 例外清單，見第 4 節 |
| `feedback-archive/` | 改私人前匯出的讀者 Issue（只含編號、類別、日期、處理結果，不含個資） | 一次性 |
| `README.md` | 說明這是網站與公開資料的發布 repo、來源在私人 repo、如何回報錯誤 | — |

**不公開**：
- `research/drafts/`、候選池；
- 模型模擬審查的原始紀錄；
- 內部方案（包括本方案與教師資訊方案，要公開時另做公開版）；
- 趨勢語料、PDF 原件、個資。

## 4. 部署流程與安全

**推送方式**：

1. 私人 repo 照現行流程：PR → verify → 合併 main。
2. 新 job `publish-public`（放在 `verify-and-deploy.yml`，需自行宣告權限，並納入現有 `concurrency`）：
   - **觸發**：先只用 `workflow_dispatch`；第 7 節步驟 8 之後才加 `push: branches: [main]`。**禁止** `pull_request`、`pull_request_target`、`workflow_run`。
   - **建置**：產生網站與公開資料。
   - **三道檢查**，任一失敗就停止：
     1. 檔案清單（新增、修改、刪除）必須等於第 3.2 節清單產生的結果，加上 `.github/` 的例外檔案；
     2. 內容掃描：不得出現 `research/drafts`、`restricted`、`-src`、候選池檔名、內部 session 或排程 ID；
     3. 不得有 symlink。
   - **推送**：用部署金鑰推到公開 repo 的 main，每次一個新 commit；訊息寫「部署 YYYY-MM-DD〔期別代號〕」；作者固定為機器人名稱與 noreply 信箱。私人 commit SHA 只留在私人 repo 的 Actions 紀錄。
   - **冒煙測試**：等 Pages 更新後，抓新網址首頁與最新一期，必須回 200；失敗就讓 job 失敗。
   - **workflow 寫法**：`${{ github.event.* }}` 不直接放進 `run:`，改用 `env:`；第三方 action 釘到完整 SHA；頂層 `permissions: contents: read`。
3. 公開 repo 用「從分支部署」開 Pages。GitHub 文件指出，用 `GITHUB_TOKEN` 推送不會觸發 Pages 建置，所以必須用部署金鑰。

**金鑰**：

- **建議部署金鑰**：天生只綁單一 repo，不綁個人帳號，不會因帳號變動而失效。
  - 由管理者在公開 repo 建立並設為讀寫；私鑰只存成私人 repo 的 Actions secret。
  - 部署金鑰沒有到期日，自訂每年輪替一次，並設提醒。
- 替代：細粒度權杖，只授權公開 repo 的內容讀寫，90 天內到期，到期前 14 天提醒；缺點是綁在管理者帳號上。

**公開 repo 的保護**：

- 個人帳號的 repo **無法限制只有某個推送者能寫入**；管理者本人也一定能推送。
- ruleset 只設「禁止 force push、禁止刪除 main」，步驟 1 後由管理者實測能否設定。
- 真正的保護在私人那端的三道檢查。

**誤推處置**（私人內容被推到公開 repo）：

1. 立即撤銷部署金鑰；
2. 公開 repo 暫時改私人（Pages 隨之下架）；
3. 確認外洩範圍並記錄；
4. 以新 repo 或全新歷史重建；不要只靠 force push，已被抓取的內容無法收回；
5. 向管理者回報，必要時依更正政策對外說明。

## 5. 連結、網址與測試

**網址常數**：在 `render-site.js` 設一個公開 repo 網址常數，產生頁面與測試共用，不各寫一份字串。

**要改的位置**（2026-10-13 核對）：

- **產生程式**：`render-site.js` 第 52 行頁尾 GitHub 連結、第 252 行知識庫說明。改完後執行 `render-site.js --write`，重新產生首頁、about、archive、daily 等頁；不直接手改產生的 HTML。
- **其他頁面**：
  - `feedback/index.html`、`feedback/no-login/index.html`、`feedback/privacy/index.html`；
  - `index.html`、`about/index.html`、`archive/{conferences,journals,policy,research}/index.html`、`daily/2026-10-13/index.html`。
  - 產生的頁面由程式更新，手寫頁另改。
- **測試**：
  - `research/validate-reader-feedback.test.js` 第 15 行寫死舊 Issue 表單網址；
  - `research/validate-publication.test.js` 第 456 行要求舊月報含舊 repo 的 `legacy-editions-review` 連結。
  - 兩處都改為使用網址常數。
- **舊刊**（`weekly/2026-09-29_10-08/`、`monthly/2026-09/`）：
  - legacy 規則允許最小改動加更正紀錄（`legacy-editions-review-2026-10-09.md`）。
  - 舊刊連到的 4 份研究文件（`news-audit-2026-09-29_10-08.md`、`legacy-editions-review-2026-10-09.md`、`pages-browser-acceptance-2026-10-09.md`、`september-2026-retro-workflow-review.md`）放進公開 repo 的 `methods/`。
  - 連結改指向新位置，並沿用 `monthly/2026-09/index.html` 第 60 行的更正框格式記錄。
- **讀者回饋停用設定**：`feedback/no-login-config.js` 維持停用，不隨搬遷重啟。

**舊網址**：
- 免費方案的私人 repo 不能開 Pages，改私人當下舊站就消失，無法自動轉址。
- 轉址的替代做法列為 S8。

## 6. 切換期（兩站並行）

- **公告期內**：
  - 舊站仍是正本，照常每日部署；
  - 新站同步推送，首頁與每頁標示「預覽」，並加 `noindex`。
- **舊站公告**：
  - 首頁與各列表頁頂端放更名公告，由 `render-site.js` 的共用頁首產生；
  - 已登錄的正式期別頁受出版閘門限制，不另加公告。
  - 公告內容見第 8 節。
- **每日短訊排程**：公告期內步驟 6 改為「兩站都確認」。
- **對調正本**：新站連續 7 次每日部署成功並驗收後，拿掉新站的「預覽」與 `noindex`，再執行改私人（第 7 節步驟 9）。

## 7. 執行步驟

| 步驟 | 內容 | 誰做 | 確認點 | 可否回復 |
|---|---|---|---|---|
| 0 | 決定 S0–S8 | 管理者 | — | — |
| 1 | 建立公開 repo（空的）；開 Pages（從分支部署）；設 ruleset；建立部署金鑰並存成私人 repo 的 secret | 管理者（時段一，約 30 分鐘） | repo 公開；金鑰只對此 repo；ruleset 實測 | 可刪除、可撤銷 |
| 2 | 查 Actions 帳單用量，估算私人 repo 每月用量 | 管理者 | 預估低於 2,000 分鐘的 80% | — |
| 3 | PR：擴充公開清單（第 3.2 節）；新增 `publish-public`（只用 `workflow_dispatch`）；網址常數；改連結與測試；讀者回饋檔案；`methods/` 公開版 | 編輯 session | verify 全過 | 可回退 |
| 4 | 手動觸發推送；驗收新站 | 編輯 session、管理者 | 第 7.1 節清單；新 repo 的 Issue 表單能送出一則測試 Issue | 可重推 |
| 5 | 舊站放更名公告；about 頁新增「透明度與資料可得性」 | 編輯 session | 公告上線 | 可回退 |
| 6 | 加上 `push` 觸發，兩站並行；改寫每日短訊排程步驟 6（兩站都確認） | 編輯 session、管理者 | 排程試跑一次；新站連續成功 | 可回退 |
| 7 | 凍結窗口（切換前一晚至當日 09:00）：合併或關閉所有開啟的 PR；刪除過期分支；逐一檢查 5 個排程；確認 Claude GitHub App 對私人 repo 能開 PR、合併（用空 PR 試跑）；匯出讀者 Issue 到 `feedback-archive/` | 編輯 session、管理者 | 無開啟中的 PR；權限試跑成功 | 可回退 |
| 8 | 新站拿掉「預覽」與 `noindex`；停用（不刪除）舊的 Pages 部署 job，保留至少一個月 | 編輯 session | 新站正常 | 可回退 |
| 9 | **現 repo 改私人** | **管理者（時段二，約 30 分鐘）** | 新站正常；私人 repo CI 正常；第 7.1 節清單 | **實質不可回復**（改回公開會公開私人期間的歷史） |
| 10 | 驗收：新站、讀者回饋、排程、各 session 權限；更新交接檔、SOP、README | 編輯 session、管理者 | 驗收紀錄 | — |

**步驟 9 的回復程序**（只在新站嚴重失效時使用）：
1. 私人 repo 暫停 `publish-public`；
2. 評估「改回公開」會公開哪些私人期間的內容；
3. 經管理者同意後改回公開，重新啟用舊 Pages 部署 job。

### 7.1 切換清單（步驟 4、9 使用）

- 新站各公開網址（首頁、daily、weekly、monthly、archive 四頁、about、feedback），桌面與手機都回 200，沒有水平溢出；
- 公開 repo 的檔案雜湊與私人 repo main 的建置結果一致；
- `research/`、`drafts` 在公開 repo 與新網址都不存在；
- 讀者回饋表單能送出一則測試 Issue，每週整理能讀到；
- 舊刊連結指向 `methods/`，更正框已加；
- 舊站公告在首頁與列表頁頂端；
- 沿用 `research/pages-browser-acceptance-2026-10-09.md` 的格式做瀏覽器實測紀錄。

### 7.2 要改的文件與排程

- **SOP 與交接檔**：
  - `editorial-workflow-master.md`：流程圖、PR → verify → deploy 段落、「公開 repo 仍可能公開研究紀錄」一句；
  - `SESSION-HANDOFF.md`：「Public Repo 保持現況」等句、部署驗收步驟、新 session 先看公開 PR 與 Actions 的指示；
  - `README.md`；
  - `research/pages-*.md`。
- **部署設定**：`vars.ENABLE_VERIFIED_PAGES_DEPLOY` 的說明。
- **排程**（2026-10-13 列出 5 個啟用中）：
  - 每日短訊（trig_01Tr5NNASUdpZzAi2ZwR99Pj）：改寫步驟 6。
  - 其他 4 個是一次性提醒，會在切換前觸發完畢。
  - 交接檔另記有一個每日排程 ID（trig_013Gz1Pk85Fe18FZiuDc7HYv），目前不在啟用清單中，切換前再確認一次。

## 8. 對讀者的揭露

- **舊站公告**（步驟 5 起）：新網址；變更日期；原因（保護未刊草稿與候選池，不是隱藏已發表內容）；哪些仍公開（網站、已刊主張與快照、更正、方法、知識庫）；哪些改私人；舊網址何時停止服務。
- **about 頁新增「透明度與資料可得性」**：
  - 公開與私人的類別與理由（第 2 節）；
  - 公開資料由編輯方發布、不是第三方稽核；
  - 承諾「已刊主張的證據不會只存在私人側；若某項證據無法公開，會在該主張旁標示」。
- **更正政策加一句**：repo 拆分不改變已刊主張的來源可查性。
- **讀者回饋政策**：GitHub Issue 的位置改為新 repo；舊 Issue 歸檔在 `feedback-archive/`。

## 9. 風險

| 風險 | 處理 |
|---|---|
| 私人內容被推到公開 repo | 第 4 節三道檢查；金鑰只能寫公開 repo；誤推處置流程 |
| 金鑰外洩或失效 | 只存在 Actions secret；每年輪替；冒煙測試失敗即報警 |
| 推送悄悄停止，新站停更 | 冒煙測試；每日短訊排程兩站都確認 |
| 私人 repo 的 Actions 額度 | 免費方案的私人 repo 每月 2,000 分鐘（GitHub 文件），公開 repo 免費；步驟 2 先估算，達 80% 時警示；必要時減少 PR 上重複的測試 |
| 讀者勘誤中斷 | 步驟 4 先測新表單；步驟 7 匯出舊 Issue（GitHub 不允許從私人 repo 轉移 Issue 到公開 repo） |
| 舊連結失效 | 公告期；S8 轉址選項；已寄出的連結無法修正 |
| 切換時有進行中的工作 | 步驟 7 凍結窗口 |
| 已公開的歷史 | 無法收回；照實記錄 |

## 10. 待管理者決定（附預設值，管理者可以只回「同意」或改單項）

- **S0 方案**：預設甲（全拆）。
- **S1 新 repo 與網站名稱**：預設 `k12-ai-literacy-tw`（網址 `jhchenmooc.github.io/k12-ai-literacy-tw/`）。自訂網域可以讓日後再換 repo 時網址不變，若要用，另案處理。
- **S2 公開內容**：預設第 3.2 節的清單，含知識庫與 `methods/`。
- **S3 讀者回饋**：預設 Issue 表單、每週整理 workflow 與整理程式（含測試）都放公開 repo，用公開 repo 自己的 `GITHUB_TOKEN`，不另建跨 repo 權杖。
- **S4 `k12-ai-literacy-report-restricted`**：預設維持獨立，不合併。
- **S5 舊刊連結**：預設 4 份文件放進 `methods/`，連結改指向新位置，加更正框。
- **S6 時程**：預設 10/30 起放公告，11/9 以後切換（需新站連續 7 次成功）。
- **S7 公告期**：預設至少 10 天（10/30 至 11/9）。
- **S8 舊網址轉址**：
  - **預設不做**。
  - 若要做，私人 repo 須改名（例如 `-src`），再以原名建一個只放轉址頁、沒有 CI 與 secret 的公開 repo。
  - 風險：任何仍使用舊名稱的 git 設定或排程，會把內容推到這個公開的轉址 repo。所以必須先確認所有 session、排程、本機設定都已改用新名稱。

## 11. 本方案不處理

- 已公開歷史中的內容（例如 `research/drafts/2026-10-monthly-crosscheck.md` 第 40 行）：無法收回；是否在私人 repo 中修改，或依更正政策處理，另行決定。
- 自訂網域與 HTTPS 憑證。
- 公開 repo 的授權條款（LICENSE），另案決定。
