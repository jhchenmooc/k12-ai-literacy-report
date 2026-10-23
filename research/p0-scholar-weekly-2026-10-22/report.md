# 學者週檢索：A1、A2（2026-10-22）

> **依據：**學者追蹤運用規格 v1.1 第 1 項（[scholar-watch-usage-spec.md](../scholar-watch-usage-spec.md)）；管理者 2026-10-18 同意排程，供 10/23 週報。
>
> **性質：**同一模型判讀，不算獨立審閱。請求沒有帶 email、mailto 或金鑰。

## 檢索

- 工具：`research/scholar-watch-run.js`（`fetch --tiers A1,A2 --from 2026-10-16 --to 2026-10-22`）。
- 12 位學者，16 個查詢（T03、T04、T07、T08 另跑不加主題詞的核對查詢），全部成功，沒有失敗。
- 窗口用 OpenAlex `publication_date`，不是首發日。
- 去重：`collect` 對照週工作表 `research/drafts/2026-10-16_2026-10-22.json` 與知識庫。
- 核對：同一窗口 OpenAlex 全庫有 70 萬餘筆，查詢本身正常。

## 結果

本週窗口 16 個查詢都是 0 筆。本週沒有可進週報或每日短訊的新項目，不建學者批次檔。

## 補查上週窗口（晚收錄）

同日以同一工具補查 2026-10-09～10-15（OpenAlex 晚收錄），共 4 筆，2 筆是 10/15 重跑後才出現，都不新增：

| 學者 | 作品 | 判斷 |
|---|---|---|
| S04 | 10.1145/3856302，K–12 AI 機器人教具的互動與設計歷程 | 已在知識庫（KB-2026-0379）；不重複匯入 |
| S01 | 10.83095/ceurws_04282_short3，LLM 作文回饋的性別偏誤（CEUR-WS PEAF 2026 工作坊） | 讀全文：以 AES 語料 300 篇作文產生 GPT-4o mini 回饋做反事實分析，無研究參與者、未載明學段；評估 AI 回饋偏誤而非師生 AI 素養，判 no_population、類別 C；不匯入、不入庫 |
| S02、T02 | 上週已處理的 2 筆 | 與 10/15 報告相同 |

補查未寫入 `search_runs.csv`：工具以 `SCHOLAR-<日期>-<學者>` 為編號，同日兩次會撞號；補查結果只記在本報告。

## 紀錄

- `research/knowledge-base/data/search_runs.csv` 新增 12 筆 `SCHOLAR-20261022-*`（每位學者一筆；`results_screened`、`results_recorded` 皆 0）。
- 原始回應與 `works.json` 只放在 scratch，不放 repo。
