# 排程與失敗復原手冊（2026-10-17）

> 管理者 2026-10-17 決定採折衷做法（D8、D9）：每日短訊每次觸發開新 session，並開啟推播；週報與月報留在編輯 session（session_01XLm9YebBcin2xA95hg9kye），方便管理者集中回覆「合併」。本手冊說明各排程、撞期處理與失敗時怎麼復原。

## 1. 排程一覽

| 排程 | 時間（臺灣） | 執行位置 | 合併方式 |
|---|---|---|---|
| 每日短訊 | 每天 08:22 | 每次開新 session，完成時推播 | 權限 B：範圍檢查與 CI 通過即自動合併 |
| 週報 | 每週五 09:27 | 編輯 session | 管理者回覆「合併」 |
| 月報出刊前檢查 | 每月 1 日 14:47 | 編輯 session | 不建頁，只交檢查文件 |
| 月報出刊 | 每月 3–5 日 14:47 | 編輯 session | 管理者回覆「合併」 |

排程內容以 claude.ai 上的排程為準；本手冊與 `research/drafts/2026-10-17-schedule-prompts-draft.md` 記錄設計理由。

## 2. 撞期（D8）

- **週報與月報同日**（例如 1 日或 3 日剛好是週五）：週報優先。月報作業開始前先確認當天的週報 PR 已合併；尚未合併時，月報出刊延到隔天的補做時段（3–5 日），出刊前檢查則在週報 PR 開出後再做。
- **每日短訊與週報、月報同日**：每日短訊在新 session 獨立執行，不受影響。若週報或月報 PR 合併後，每日 PR 的頁面變成過時（例如首頁卡、每日頁的「已收入」連結），每日作業在合併前重新產生頁面並重跑驗證。
- **兩個要管理者核准的 PR 同時存在**：先合併的那一個不受影響；後合併的那一個先併入最新 main、重新產生頁面、驗證通過，再請管理者確認一次。

## 3. 失敗時怎麼復原

| 情況 | 處理 |
|---|---|
| 每日短訊新 session 啟動後沒有 repo | 依提示用 add_repo 加入 jhchenmooc/k12-ai-literacy-report 與 jhchenmooc/k12-ai-literacy-report-restricted，再 clone。仍失敗就在該 session 回報，並通知編輯 session |
| 每日短訊沒有完成（沒有推播或推播寫失敗） | 管理者在 claude.ai 開啟當天的每日 session 查看原因；或請編輯 session 用 fire_trigger 重跑一次。每日短訊可以晚發，首次公開日仍須在 7 天內 |
| 每日 PR 的 CI 失敗 | 每日 session 修正後重推；修不好就不合併，回報原因。不得改閘門或測試 |
| 每日 PR 的範圍檢查擋下（改到已刊週報或月報頁） | 不自動合併，交管理者決定 |
| 週報或月報作業中斷 | 同一分支已有 PR 就更新該 PR，不重開。重新產生頁面時一律執行 `node research/render-site.js --write`，並跑完整驗證 |
| 編輯 session 失效（週報、月報排程沒有觸發，或沒有回應） | 管理者開一個新的 session 接手：先讀 `research/SESSION-HANDOFF.md` §0 與本手冊，再用 list_triggers 找到週報、月報排程，以 update_trigger 把 persistent_session_id 改為新 session（或改成每次開新 session） |
| Pages 沒有更新 | 確認 main 上的 verify 與 deploy 是否成功；deploy 失敗時看 Actions 記錄，不得手動上傳頁面 |

## 4. 原則

- 任何情況都不得修改閘門、風險標籤或測試來讓作業通過。
- 週報、月報只依管理者本人在編輯 session 回覆「合併」才合併；其他 session 轉述的同意不算數。
- 已刊頁面若被改到，依各刊物的改版規則加註（週報、月報 `revised_on`；每日短訊 `revised_on`）。
