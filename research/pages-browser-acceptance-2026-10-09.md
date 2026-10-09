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

## 4. 真人瀏覽器確認結果（2026-10-09 補記）

第 3 節第 1 項的 5 個連結，由專案管理者用一般瀏覽器開啟，另存頁面（PDF／HTML）交給 Claude 比對頁面標題、原始網址與頁內書目資訊。另存檔**未放入 repo**（含第三方網站全文與介面）。

| # | 連結（刊載頁） | 結果 | 頁面上核對到的資訊 |
|---|---|---|---|
| 1 | `https://pads.moe.edu.tw/download2.php`（9 月月報，2 處） | 可開啟、內容對應 | 頁面標題「AI人才方舟計畫 - 資料下載」，主辦單位教育部資訊及科技教育司；頁內有「115年中小學數位與AI教學指引」與「115年中小學AI之學習應用手冊」兩個分類。屬下載總頁而非單一檔案，連結文字「官方指引下載入口」相符，**不需更正**。中繼憑證問題仍在（管理者瀏覽器可開，嚴格裝置仍可能報錯）。日後引用可改用分類網址 `download2.php?action=115年中小學數位與AI教學指引`、`download2.php?action=115年中小學AI之學習應用手冊`；個別檔案由頁面動態載入，另存檔中無直接下載網址。 |
| 2 | 英國國會書面質詢 27912（9 月月報） | 可開啟、內容對應；**連結名稱已更正** | UIN 27912，2026-09-08 由 Chris Evans 向教育部提出，題目「Education: Artificial Intelligence and Numeracy」（numeracy skills 與 AI skills），2026-09-16 由 Georgia Gould 答覆，答覆提及 AI literacy 與 numeracy 的課程基礎。月報原標示「AI literacy in education」不精確，管理者選擇走更正流程：連結文字改為正式題目，月報頁首加註更正說明，網址不變。 |
| 3 | 歐洲理事會 CM/Rec(2026)12（9 月月報） | 可開啟、內容對應 | 頁面寫明 2026-09-02 第 1567 次部長代表會議通過。月報引文「AI literacy encompasses the human, technological and practical dimensions of AI」不在此摘要頁上，應在建議全文；**引文尚未逐字核對**。 |
| 4 | OECD PISA findings on AI use…（9 月月報） | 可開啟、內容對應 | 頁面 `datePublished` 2026-09-08，為 Andreas Schleicher 的影片說明，與月報 10/09 更正後「影片說明」的描述一致。月報引文「While these results cannot determine causality」不在此頁上，月報已註明需對照 OECD 原始資料；**引文尚未逐字核對**。 |
| 5 | Sage 10.1177/14749041261473066（創刊特刊） | 可開啟、內容對應 | European Educational Research Journal，Michele Martini、Susan L. Robertson，OnlineFirst 首次線上刊登 2026-08-18，與特刊標示「期刊論文摘要（8/18）」一致。 |

- 以上是「連結可開啟、指向所述來源」的確認，不是內容認證；兩則英文引文仍待對照原文全文。
- 更正依 [reader-feedback-policy](reader-feedback-policy.md) 與 [news-policy-verification](news-policy-verification.md) E 節：記錄原說法、錯誤類型（連結名稱不精確，非事實錯誤）、原始來源與修訂後內容，網站明示更正，不默默覆蓋。
