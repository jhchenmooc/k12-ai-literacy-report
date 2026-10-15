# 學者週檢索重跑：A1、A2（2026-10-15）

> **依據：**學者追蹤運用規格 v1.1 第 1 項（[scholar-watch-usage-spec.md](../scholar-watch-usage-spec.md)）；管理者 2026-10-10 交辦於 10/15 重跑，補抓本週窗口 OpenAlex 晚收錄的論文。
>
> **性質：**同一模型判讀，不算獨立審閱。請求沒有帶 email、mailto 或金鑰。

## 檢索

- 工具：`research/scholar-watch-run.js`（`fetch --tiers A1,A2 --from 2026-10-09 --to 2026-10-15`）。
- 12 位學者，16 個查詢（T03、T04、T07、T08 另跑不加主題詞的核對查詢），全部成功，沒有失敗。
- 窗口用 OpenAlex `publication_date`，不是首發日。
- 去重：`collect` 對照週工作表 `research/drafts/2026-10-09_2026-10-15.json` 與知識庫。

## 結果

共 2 筆，都不新增：

| 學者 | 作品 | 判斷 |
|---|---|---|
| T02 | 10.1177/07356331261494821，國小學生運算思維的生成式 AI 鷹架準實驗 | 已在知識庫（KB-2026-0269），也已在本週候選池；不重複匯入 |
| S02 | 10.5281/zenodo.23164110，資料集（大學生 AI 信任與依賴） | 資料集而非論文，對象為大學生；不匯入、不入庫 |

本週沒有可進週報或每日短訊的新項目，不建學者批次檔。

## 紀錄

- `research/knowledge-base/data/search_runs.csv` 新增 12 筆 `SCHOLAR-20261015-*`（每位學者一筆；`results_screened` 只計 S02、T02 各 1，`results_recorded` 皆 0）。
- 原始回應與 `works.json` 只放在 scratch，不放 repo。
