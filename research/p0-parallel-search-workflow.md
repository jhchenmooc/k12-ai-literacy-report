# P0 三組學術來源平行搜尋作業

此流程只加速實際來源搜尋與書目整合，不新增排程、爬蟲或出版能力。沿用 [v1.6 主控 SOP](editorial-workflow-master.md)、[首發核查表](first-disclosure-checklist-v16.md)與[知識庫規格](knowledge-base/schema.md)。

## 試行範圍與寫入權

| 任務 | 唯一來源責任 | 唯一可寫暫存檔 |
|---|---|---|
| A | J10、J11 | `p0-parallel-pilot-2026-10-09/group-a.{json,md}` |
| B | J12、J13、J14 | `p0-parallel-pilot-2026-10-09/group-b.{json,md}` |
| C | C05、C06、C07、C08 | `p0-parallel-pilot-2026-10-09/group-c.{json,md}` |
| 整合 | 核對三組、獨立反查、去重與正式匯入 | 正式 CSV、衍生索引、本交接檔與整合報告 |

三個真實搜尋子任務可同時讀主表，只能写各自暫存檔；禁止修改正式 CSV、索引、共享交接、候選、claims、issues 或網站。開始前確認 main SHA、open PR、最新 verify/deploy；鎖定讀取基準並記錄正式三表與出版檔案雜湊。此試行採同 checkout 的檔案隔離，不宣稱不同 worktree、不同模型或真人獨立審閱。

## 搜尋與暫存契約

1. 每組先確認來源 ID、既有樣本與 DOI。J12/J13 已有初篩，只補缺日期、版本或新樣本，避免無目的重查。
2. 以 2025-01-01 至 2026-10-09 為定向發現範圍，優先官方出版頁／正式會議論文集。實際命中較早文獻可作背景，但須說明範圍外。這不是完整年度系統性回顧。
3. 留下 UTC 開始／結束、完整查詢、來源 ID、實際讀取範圍與失敗網址；每篇保存原題、官方 URL、DOI 或 unknown、日期證據、學段、AI 素養範圍（`ai_lit_class`／`ai_lit_dims`／`ai_lit_note`，依 [準則](ai-literacy-scope-criteria.md)）、方法、排除／保留原因。分清 full/short/poster/companion/workgroup。
4. 分開記錄最早公開、預印本、出版社 online、issue、會議活動與發現日期。官方 Published 日期只證明該頁的出版資訊；未查更早版本不能認證全球最早公開日。
5. 搜尋引擎總命中未知用 null／unknown，正式 `results_seen` 留空。`results_screened` 只計逐篇列出且實際初篩的樣本；0 新增主紀錄不等於0命中。原文／日期受阻保留 partial/unavailable；不得以搜尋摘要冒充全文閱讀。
6. 原文只作必要短轉述與定位資訊，不上傳未授權全文、個資、秘密。高風險效果／因果／代表性結論單獨標記待二輪，不能只靠多角色同意。

## 單一整合者的閘門

所有搜尋組完成並停止寫入後，確認正式三表基準雜湊未變，再依既有 `knowledge-base-utils.js` 正規化 DOI；同 DOI 必須人工確認同版本才去重，同標題／不同 DOI 不自動合併。對既有主紀錄與歷史 audit 也對帳，區分已入庫重複與既有初篩重訪。

整合者逐篇重新讀正式來源，核對 DOI／題名／venue、日期、學段與方法。對可能支撐高風險結論的項目，由未參與該組搜尋的核查任務獨立讀原始頁／全文，記錄反證、讀取限制及裁決；無法核查則不採納效果結論。兩輪 AI 不等於真人或跨模型獨立認證。

只有可識別且符合知識庫收錄用途的來源才新增 records／relations；日期未知仍可保留 unknown，不能升級 `content_checked`。排除與重訪樣本留在稽核檔，不為湊資料量強行入庫。每筆 search run 連到實際暫存／整合證據，unknown 命中數留空。匯入後重建既有索引，執行既有知識庫、CSV 安全與 v1.6 regression；不修改出版規則來讓 CI 過關。

## PR、評估與下一批

提交單一整合 PR。核對最新 PR HEAD SHA 所對應的 verify job 成功後，使用 expected head SHA 合併；HEAD 有任何新改動就重新等待。合併後分別讀 main verify 與 deploy，不拿 PR CI 代替 main／部署。更新同一份 `SESSION-HANDOFF.md` 的完成、未完、下一批與可追溯 PR／Run 證據。

評估記錄每組耗時、平行牆鐘時間、來源／樣本數、已入庫及組間 DOI 重複、原文讀取限制、日期與學段修正、整合補查及 CI 結果。串行未實測時只能提供「組耗時相加」估算，不宣稱實證加速倍數；工具費用未知不虛構成本。只有來源契約、一致性與單一寫入有效，且讀取限制和補查負擔可處理後，才另行決定六組；本次不自動擴充。

九筆候選維持 hold、正式期別保持零；歷史學術書目不得當成 10/09–10/15 首次公開新闻，不自動發刊。P0 未完成前不提前 P1/P2。
