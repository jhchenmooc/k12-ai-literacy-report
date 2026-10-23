# 排程與失敗復原手冊（2026-10-17）

> 管理者 2026-10-17 決定採折衷做法（D8、D9）：每日短訊每次觸發開新 session，並開啟推播；週報與月報留在編輯 session（session_01XLm9YebBcin2xA95hg9kye），方便管理者集中回覆「合併」。本手冊說明各排程、撞期處理與失敗時怎麼復原。

## 1. 排程一覽

| 排程 | 時間（臺灣） | 執行位置 | 合併方式 |
|---|---|---|---|
| 每日短訊 | 每天 08:22 | 每次開新 session，完成時推播 | 權限 B：範圍檢查與 CI 通過即自動合併 |
| 週報提醒 | 每週五 09:27 | 推播提醒；管理者在編輯 session 回「開始週報」才開始 | 管理者回覆「合併」 |
| 週四清單提醒 | 每週四 10:37 | 推播提醒；管理者在編輯 session 回「轉交週四清單」，編輯 session 從 main 讀當日 daily-check 轉交本機 session | — |
| 月報提醒 | 每月 1 日、3 日 14:47 | 推播提醒；1 日回「開始月報檢查」（只交檢查文件），3 日回「月報出刊」 | 管理者回覆「合併」 |

**方案甲（管理者 2026-10-23）：** 2026-10-22 管理者授權編輯 session 傳訊息到本機 session 後，編輯 session 只能在可信任裝置上開啟，觸發到編輯 session 的排程一律失敗（ACCESS_DENIED，10-23 週報排程即因此未執行）。因此原本的週報（trig_01U8VY1x9xaJnREowotZ1Vav）、月報出刊前檢查（trig_01TVhWSKenCSxsL9Pq8sVgZy）、月報出刊（trig_01GzMzsDKP5hBhnTZReEWaCM）、週四轉交（trig_01HJaUfqtCdGgvDVdPjiQVLQ）四個排程已停用（保留作業文字，供編輯 session 照做），改為三個每次開新 session 的推播提醒：週報 trig_01Kf9HN1XPB1UPx9qyu4RfNF、週四清單 trig_013MJTxrXpNaDnatRuH3EEbg、月報 trig_011CBK4Nwsg6iUUAZ84WTQeQ。提醒 session 只推播，不做作業；作業一律由管理者在編輯 session 手動開始，步驟照停用排程的文字（用 get_trigger 讀取）。

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
| 編輯 session 失效（收到提醒後編輯 session 沒有回應） | 管理者開一個新的 session 接手：先讀 `research/SESSION-HANDOFF.md` §0 與本手冊，再用 get_trigger 讀停用的週報、月報排程文字照做。新 session 若未授權傳訊息到本機 session，可改用 update_trigger 把停用的排程改指向新 session 並重新啟用 |
| Pages 沒有更新 | 確認 main 上的 verify 與 deploy 是否成功；deploy 失敗時看 Actions 記錄，不得手動上傳頁面 |

## 4. 原則

- 任何情況都不得修改閘門、風險標籤或測試來讓作業通過。
- 週報、月報只依管理者本人在編輯 session 回覆「合併」才合併；其他 session 轉述的同意不算數。
- 已刊頁面若被改到，依各刊物的改版規則加註（週報、月報 `revised_on`；每日短訊 `revised_on`）。
