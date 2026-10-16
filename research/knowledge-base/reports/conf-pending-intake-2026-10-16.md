# 會議論文 pending 全文判讀後入庫 18 篇（2026-10-16）

文獻搜尋 session 依管理者 2026-10-16 指示（「先把能收的先收」）完成 conf2224 pending 265 篇的全文判讀。可收的 18 篇由編輯 session 寫入知識庫；來源在私人 repo 分支 `lit-session-conf-pending`（commit c7273cc），路徑 `from-literature-session/conf2224/pending/intake-pending-include.csv`。

- 欄位格式比照 PR #276（conf-2022-2024 intake）：`record_type=conference_paper`，`year_basis=event_year`，日期 unknown，`verification_status=discovered_unverified`，不放摘要。
- 紀錄 KB-2023-0197～0203（7 筆）、KB-2024-0359～0369（11 筆）；關聯 KR-13740～13883（144 筆）。
- 分布：A 9、B 9；學生 9、在職教師 7、職前師資生 1、其他教育關係人 1。
- 會議：ICCE 7；EAAI、AIED、EC-TEL、ICLS 各 2；SIGCSE、LAK、CSCL 各 1。都有 DOI，DOI 與題名都不在知識庫。
- 逐筆判讀依據（全文一句改寫）見 [conf-pending-intake-2026-10-16.csv](conf-pending-intake-2026-10-16.csv) 的 `decision_note`。
- 兩筆依管理者同意的建議改判：職前教師生成式 AI 任務設計改 A；ICLS 2023 土耳其教師聊天機器人使用意願調查改 B（接受度研究）。
- **待補**：KB-2024-0361（ICLS 2024〈Toward a Theory-Grounded Associative Model of AI Literacy〉）判 A，但來源檔沒有 AI 素養面向代碼，目前只有 `AILIT_A`、沒有 `has_ailit_dim`。已請文獻 session 補代碼。

其餘 247 篇不寫入：未讀 172 篇；非中小學、無研究對象或判 C 等 62 篇；仍不明 13 篇。
