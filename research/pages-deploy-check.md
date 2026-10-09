# GitHub Pages 部署確認：最小操作指引（2026-10-09）

> **2026-10-09 更新：本部署問題已結案。** [正式驗收紀錄](pages-deployment-acceptance-2026-10-09.md)記錄主分支工作流程 `verify=success`、`deploy=success`，及使用者確認的三項網站實際顯示結果。以下原排查流程僅保留作歷史參考，**目前不需要再變更部署變數**。

**下列敘述是已解決的早期故障記錄**：當時主分支 `verify=success`，但 `deploy=skipped`；其後 [Run #37900505465](https://github.com/jhchenmooc/k12-ai-literacy-report/actions/runs/37900505465) 已成功。參見 [部署工作流程](../.github/workflows/verify-and-deploy.yml)。

**原因目前能確定到的範圍：** `deploy` 有條件 `vars.ENABLE_VERIFIED_PAGES_DEPLOY == 'true'`，且 PR 不執行 deploy；在主分支的驗證已成功而 deploy 仍跳過，代表啟用條件未成立。**不能因此斷言 GitHub Pages 完全沒更新**，因為 GitHub Pages 也可以透過「Deploy from a branch」直接發布，此設定目前無法透過現有連接器可靠讀取。

## 歷史排查步驟（目前無須重做）

1. 進入儲存庫 [Settings → Pages](https://github.com/jhchenmooc/k12-ai-literacy-report/settings/pages)，查看 **Build and deployment / Source**。
2. 若 Source 是 **Deploy from a branch**，且選 `main` / `/(root)`，則網站有可能已透過分支來源更新；先用公開網站實際內容與 GitHub `main` 比對，再決定是否需要切換。**不要同時啟用兩種部署管道**。
3. 若 Source 是 **GitHub Actions**，前往 [Settings → Secrets and variables → Actions → Variables](https://github.com/jhchenmooc/k12-ai-literacy-report/settings/variables/actions)，確認儲存庫變數 `ENABLE_VERIFIED_PAGES_DEPLOY` 的值是否為字串 `true`。若是其他值或缺少，會導致現有 deploy job 跳過。設定前先確認既有網站並非透過分支部署。
4. 若確定 Source 是 GitHub Actions，且準備以此工作流程發布，設定該變數為 `true` 後由管理者觸發 [Validate and deploy reviewed reports](https://github.com/jhchenmooc/k12-ai-literacy-report/actions/workflows/verify-and-deploy.yml) 的 **Run workflow**；確認 `verify=success`、`deploy=success`，再開啟 [公開網站](https://jhchenmooc.github.io/k12-ai-literacy-report/) 目視比對標題及內文。
5. 若網站是公開的舊版，即使 `verify=success` 也**不要宣稱部署完成**。排除設定前，本輪不直接移除部署條件，避免無意改變現行發布方式。

## 本輪自檢邊界

GitHub Repository API 和目前連接器可以查看公開原始碼、GitHub Actions 的驗證與跳過結果；但 **Pages Source / repository variable 的設定端點不可用**，對公開網站的直接讀取也未成功。以上描述僅保存當時的查核限制；現有成功部署與驗收紀錄已排除這項歷史障礙，不得把早期情況當作目前故障。

**只做一次性的設定核對即可，不新增部署工作流程或複雜監控。**
