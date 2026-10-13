# 拆分為私人來源 repo 與公開網站 repo：搬遷方案 v0.1（草稿）

> 建立日期：2026-10-13。狀態：**草稿，待管理者決定第 7 節**。本方案不改任何程式、設定或 repo；所有 GitHub 設定變更（建立 repo、改私人、權杖、Pages）由管理者親自操作。
>
> 管理者 2026-10-13 的方向：採「私人 repo 編寫與驗證，CI 把網站推到公開 repo」；網站網址可以改，網站規模已擴大，可換新名稱。

## 摘要

- **私人來源 repo**：現在的 `jhchenmooc/k12-ai-literacy-report` **保留原名**，改為私人。所有原始碼、研究、草稿、知識庫、查核資料、測試與 CI 都留在這裡。
- **公開網站 repo**：新建，名稱待定（第 7 節 S1）。只放網站與管理者決定公開的查核資料，由私人 repo 的 CI 推送。
- **為什麼不沿用原名**：原 repo 不改名，就不會出現「舊網址改指向公開 repo、私人草稿被誤推到公開」的風險。
- **代價**：
  - 舊網站網址會失效；免費方案的私人 repo 不能開 Pages，也無法自動轉址。
  - 讀者勘誤的 GitHub Issues 要搬到新 repo。
  - 每日短訊排程與交接檔要改寫。
- **效果有限之處**：已經公開過的歷史內容，可能已被複製或封存，搬遷後無法收回。搬遷保護的是以後的草稿。
- **建議時程**：避開 10/16 首期週報與 10/29 月報，11 月初進行。

## 1. 現況盤點（2026-10-13 查核）

| 項目 | 現況 | 搬遷時要處理 |
|---|---|---|
| repo | 公開；0 fork、0 star、0 個未關閉 Issue；Pages 已開啟（GitHub API） | 改私人前，確認已關閉的讀者回饋 Issue 數量 |
| 網站部署 | `.github/workflows/verify-and-deploy.yml`：verify 通過後，`node research/public-site.js . --build` 產生 `_public_site/`，用 GitHub Actions 部署 Pages（需 `vars.ENABLE_VERIFIED_PAGES_DEPLOY == 'true'`） | 改為「建置後推到公開 repo」 |
| 公開檔案清單 | `research/public-site.js`：首頁、daily／weekly／monthly、about、archive、feedback、design-system、assets，以及 `publication/issues.json`；**不含** `publication/claims`、`publication/sources`、`research/` | 決定公開 repo 是否另放查核資料（S2） |
| 網站上指向 GitHub 的連結 | `render-site.js` 第 52 行頁尾「GitHub 原始碼」、第 252 行知識庫說明連到 `research/knowledge-base`；`feedback/index.html` 的 Issue 表單與列表；`about/index.html`、`index.html` | 全部改指向公開 repo；知識庫連結視 S2 決定 |
| 舊刊 | `weekly/2026-09-29_10-08/`、`monthly/2026-09/` 各有連到 GitHub 研究文件的連結 | 改私人後會失效，依 legacy 規則處理（S5） |
| 讀者回饋 | `.github/ISSUE_TEMPLATE/reader-feedback.yml`；`.github/workflows/reader-feedback-digest.yml`（每週一整理，需 `research/summarize-reader-feedback.js`） | 移到公開 repo，或由私人 repo 讀公開 Issues |
| 排程 | 5 個啟用中；**每日短訊**（trig_01Tr5NNASUdpZzAi2ZwR99Pj）的步驟 6 會合併 PR，並確認 main 的 verify、deploy 與 Pages 新頁 | 改寫步驟 6；其他排程只讀 repo，不受影響 |
| 其他工作 session | 編輯 session、文獻搜尋 session 都在本 repo 作業 | 確認 Claude GitHub App 對私人 repo 仍有權限 |
| 既有私人 repo | `jhchenmooc/k12-ai-literacy-report-restricted`（四年報告草稿） | 可併入私人來源 repo，或維持獨立 |

## 2. 拆分後的分工

| | 私人來源 repo（原名） | 公開網站 repo（新名） |
|---|---|---|
| 內容 | 全部原始碼、research、drafts、知識庫、claims、sources、測試、CI | 建置好的網站；讀者回饋表單；管理者決定公開的查核資料（S2） |
| 誰寫入 | 編輯者、各工作 session（經 PR） | **只有**私人 repo 的 CI（部署機器人） |
| 歷史 | 保留完整歷史 | 從乾淨的歷史開始 |
| Pages | 不開 | 開，網址為新名稱 |

## 3. 部署流程

1. 私人 repo 照現行流程：PR → verify（全部測試與出版閘門）→ 合併到 main。
2. main 合併後，私人 repo 的新 workflow：
   - 依 `public-site.js` 的公開清單建置 `_public_site/`；
   - 加一道檢查：要推送的檔案清單必須完全等於公開清單（加上 S2 決定公開的資料），多一個檔案就停止；
   - 用只對公開 repo 有寫入權限的權杖，把結果推到公開 repo 的 main，commit 訊息只寫私人 repo 的 commit SHA。
3. 公開 repo 用「從分支部署」開 Pages，不需要自己的 CI（讀者回饋整理除外，見 S3）。
4. 公開 repo 的 main 設規則：只允許部署機器人推送。

**權杖**：細粒度權杖（fine-grained PAT）或部署金鑰，只授權公開 repo 的內容寫入，設到期日；存成私人 repo 的 Actions secret。由管理者建立。

## 4. 連結與網址

- 網站內部連結多為相對路徑（`render-site.js` 以 `p` 前綴產生），換網址不受影響。
- 要改的絕對連結：頁尾 GitHub 連結、知識庫連結、讀者回饋表單與列表、about、首頁。全部改成公開 repo 的對應網址。
- **舊網址**：
  - 改私人後，舊 Pages 會停止服務，無法自動轉址。
  - 改私人前，在舊網站首頁與每頁頂端放更名公告，至少 7 天。
  - 不建議用「改名後再以原名建轉址 repo」的做法，因為會重新帶回誤推風險。

## 5. 執行順序與確認點

| 步驟 | 內容 | 誰做 | 確認點 | 可否回復 |
|---|---|---|---|---|
| 0 | 決定第 7 節 S1–S7 | 管理者 | — | — |
| 1 | 建立公開 repo（空的），開 Pages（從分支部署） | 管理者 | repo 公開、Pages 設定完成 | 可刪除 |
| 2 | 建立權杖，存成私人 repo 的 secret | 管理者 | 權杖只對公開 repo 有寫入權 | 可撤銷 |
| 3 | PR：新增「推送到公開 repo」workflow（先手動觸發） | 編輯 session | verify 全過；推送的檔案清單等於公開清單 | 可回退 |
| 4 | 手動觸發一次，檢查新網站 | 編輯 session、管理者 | 新網址各頁可開；手機版正常 | 可重推 |
| 5 | PR：改網站上所有絕對連結；搬讀者回饋表單（S3）；舊刊連結處理（S5） | 編輯 session | verify 全過；新網站連結都可開 | 可回退 |
| 6 | 舊網站放更名公告 | 編輯 session | 公告上線 | 可回退 |
| 7 | 改寫每日短訊排程步驟 6、交接檔、相關 SOP | 編輯 session、管理者 | 排程試跑一次 | 可回退 |
| 8 | 公告期滿，現 repo 改私人；停用舊的 Pages 部署 job | **管理者** | 新網站正常；私人 repo CI 正常 | 可改回公開 |
| 9 | 驗收：新網站、讀者回饋、排程、各 session 權限；寫入交接檔 | 編輯 session、管理者 | 驗收紀錄 | — |

步驟 1–7 都在原 repo 仍公開時完成，隨時可以停止；步驟 8 之後才真正切換。

## 6. 風險與注意事項

| 風險 | 處理 |
|---|---|
| 私人檔案被推到公開 repo | 推送前比對公開清單，多一個檔案就停止；權杖只能寫公開 repo；公開 repo 只收部署機器人的推送 |
| 權杖外洩 | 細粒度、單一 repo、只給內容寫入權、設到期日；只存在 Actions secret |
| 私人 repo 的 Actions 額度 | 免費方案的私人 repo 有每月分鐘數上限，公開 repo 則不限（數字以 GitHub 帳單頁為準，需管理者確認方案與目前用量）。必要時減少 PR 上重複執行的測試 |
| 讀者勘誤中斷 | 搬遷前移好 Issue 表單；既有讀者 Issue 若要保留公開，須在改私人前處理（GitHub 不允許把 Issue 從私人 repo 轉移到公開 repo，需管理者確認） |
| 舊連結失效 | 至少 7 天公告；已寄出的連結無法修正 |
| 排程誤用舊流程 | 步驟 7 先改排程，並試跑一次 |
| 已公開的歷史 | 無法收回；交接檔照實記錄 |

## 7. 待管理者決定

- **S1 新 repo 與網站名稱**：例如 `k12-ai-literacy-tw`、`tw-k12-ai-literacy`（網址為 `jhchenmooc.github.io/〔名稱〕/`）。若日後要用自訂網域，也可以在這一步決定。
- **S2 公開 repo 要放哪些查核資料**（透明度與草稿保護的取捨）：
  - 建議公開：已刊出期別的 `publication/claims` 與對應的 `publication/sources` 短快照；查核方法頁已在網站上。
  - 建議私人：候選池、草稿、審查紀錄、內部方案、PDF 原件。
  - 待定：知識庫資料（網站「歷年資料庫」說明連到 GitHub 上的知識庫），以及編輯 SOP。
- **S3 讀者回饋**：Issue 表單與每週整理移到公開 repo（需要把整理程式與測試一起放公開），或公開 repo 只放表單、由私人 repo 讀取並整理。
- **S4 `k12-ai-literacy-report-restricted`**：併入私人來源 repo，或維持獨立。
- **S5 舊刊連結**：2026-09 月報與創刊特刊中連到 GitHub 研究文件的連結，改私人後會失效。依 legacy 規則，只做必要的連結修正並加更正說明，或保留原樣並在新網站註明。
- **S6 時程**：建議 11 月初，避開 10/16 首期週報、10/29 月報。
- **S7 舊網站公告期**：建議至少 7 天。

## 8. 本方案不處理

- 已公開歷史中的內容（例如 `research/drafts/2026-10-monthly-crosscheck.md` 第 40 行）：無法收回，是否在私人 repo 中修改，另行決定。
- 自訂網域、HTTPS 憑證等（若 S1 決定使用，另案）。
