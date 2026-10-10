# PROTOCOL-2025（第 2 步快照）

> 依凍結的 [PROTOCOL](../PROTOCOL.md)（管理者 2026-10-10 核准 D1）執行，**不得更動 PROTOCOL**。

## 檢索
- **執行時間（UTC）：**2026-10-10T19:27:20Z～2026-10-10T19:27:49Z，與其他三年同一天（2026-10-10）執行。
- **請求數：**60 次，全部 HTTP 200，逐筆見 `../step2/openalex-requests.jsonl`；本年各組子查詢的完整 filter、筆數、頁數見 `queries.json`。
- **source ID：**47 刊，與 `../journals.csv` 的 `source_id_2025` 相同。

## 結果
- **主查詢聯集：**1545 筆，未達 2,500 筆的暫停門檻。
- **題名子查詢（`has_abstract:false`）新增：**0 筆。`title.search` 的命中都已包含在主查詢（`title_and_abstract.search`）裡，所以沒有新增，見 README。
- **語料 ID 快照：**`ids-corpus.json` 共 1545 筆。
- **中性查詢聯集：**2827 筆；中性減主查詢的差集 1470 筆，存於 `ids-neutral-minus-main.json`，供漏收抽樣。
- **面板規模：**article＋review 共 11352 篇；其中 OpenAlex `has_abstract:false` 的 1560 篇。逐刊數字見 `queries.json`。
- **面板外監測：**各子查詢不限期刊的 `meta.count` 記在 `queries.json` 的 `outside_panel`，只記錄、不編碼。

## 參考集
- 本年參考集篇數以 OpenAlex 年份比對後，於第 3 步（2025）或回溯時記入。

## 種子（20261010＋年份×10＋用途代碼）

- 漏收抽樣：20281261
- 一致性抽樣：20281262
- 全文對照：20281263
- 批次順序：20281264
- 校準插入：20281265
- 錨定樣本：20281266

## 已知差異
- **分頁筆數與 `meta.count` 的微小差異：**M5（281／282）、M7（522／523）、N1（2640／2643）。OpenAlex 在分頁期間的索引更新所致，以實際取得的 ID 為準。
