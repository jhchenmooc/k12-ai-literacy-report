# GitHub Pages 瀏覽器實測驗收（2026-10-09）

> **性質：公開網站的技術驗收，不是內容認證。** 以無頭 Chromium（Playwright 1.56）實際載入公開網站，檢查載入、版面、連結與部署一致性。由 Claude 執行；未做真人目視閱讀、螢幕報讀器或實體手機測試。截圖 14 張約 5.4 MB，未放入 repo。

- 時間：2026-10-09 17:02–17:05 UTC；對象：main `0024d15` 部署後的 <https://jhchenmooc.github.io/k12-ai-literacy-report/>（[main Run 37963020348](https://github.com/jhchenmooc/k12-ai-literacy-report/actions/runs/37963020348) verify／deploy 成功）。
- 裝置設定：桌面 1280×900；手機 Playwright「iPhone 13」（390×844，觸控、行動 UA）。

## 1. 頁面載入與版面（8 個網址 × 2 種裝置）

| 頁面 | 桌面 | 手機 | 備註 |
|---|---|---|---|
| `/` 首頁 | 200 | 200 | 桌面 console 有 1 個 404：`favicon.ico`（網站未設 icon），不影響內容 |
| `/feedback/` | 200 | 200 | |
| `/feedback/no-login/` | 200 | 200 | |
| `/feedback/privacy/` | 200 | 200 | |
| `/weekly/2026-09-29_10-08/` 創刊特刊 | 200 | 200 | |
| `/monthly/2026-09/` 月報 | 200 | 200 | |
| `/design-system/` | 200 | 200 | |
| `/publication/issues.json` | 200 | 200 | 內容為 `editions: []` |

- 16 個組合都**沒有水平溢出**（`scrollWidth ≤ innerWidth`）、都有 viewport meta、`lang="zh-Hant"`、無缺 alt 的圖片、無小於 12px 的可見文字。手機截圖目視：首頁標題、說明、按鈕與讀者勘誤區塊排版正常；特刊頁返回鈕與章節導覽可點。
- 部署一致性：9 個公開檔（7 個 HTML、`issues.json`、`assets/design-system.css`）從網站下載的 SHA-256 與 main 完全相同。`/research/SESSION-HANDOFF.md` 回 404，研究目錄確實未公開。

## 2. 頁面上的連結（45 個不重複連結）

先以 curl 檢查，非 200 者再以 Chromium 重測：

| 結果 | 數量 | 說明 |
|---|---|---|
| 可開啟 | 40 | 含 curl 直接 200 的 37 個，及 curl 失敗但瀏覽器可開的雪梨大學、UNESCO 各 1 個；讀者回饋 GitHub Issue 表單轉到 GitHub 登入頁（預期：需 GitHub 帳號） |
| 無法自動判斷 | 4 | Sage（10.1177/14749041261473066）、英國國會書面質詢 27912、歐洲理事會 AI 素養建議、OECD PISA 部落格：皆為 Cloudflare 機器人驗證頁（未繞過），**不代表連結失效**，需真人瀏覽器確認 |
| 有問題 | 1 | 月報「教育部官方指引下載入口」`https://pads.moe.edu.tw/download2.php`：伺服器未送出中繼憑證（openssl：`unable to verify the first certificate`，簽發者 TWCA SSL CA），嚴格驗證的瀏覽器／裝置可能打不開；且網址無任何參數，是否真的指向該份指引無法確認 |

## 3. 未做／待真人

1. 4 個 Cloudflare 驗證頁連結、教育部下載連結，需真人用一般瀏覽器確認能否開啟、內容是否對應。若教育部連結不對，屬已刊月報的連結勘誤，依 SOP 走更正流程（本次**未修改網站**）。
2. 實體手機（iOS Safari／Android Chrome）、螢幕報讀器、深色模式未測。
3. 是否加 favicon 屬網站外觀調整，未處理（非功能問題）。
