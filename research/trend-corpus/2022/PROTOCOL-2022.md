# PROTOCOL-2022（第 2 步快照）

> 依凍結的 [PROTOCOL](../PROTOCOL.md)（管理者 2026-10-10 核准 D1）執行，**不得更動 PROTOCOL**。

## 檢索
- **執行時間（UTC）：**2026-10-10T19:26:14Z～2026-10-10T19:26:33Z，與其他三年同一天（2026-10-10）執行。
- **請求數：**41 次，全部 HTTP 200，逐筆見 `../step2/openalex-requests.jsonl`；本年各組子查詢的完整 filter、筆數、頁數見 `queries.json`。
- **source ID：**47 刊，與 `../journals.csv` 的 `source_id_2022` 相同。

## 結果
- **主查詢聯集：**145 筆，未達 2,500 筆的暫停門檻。
- **題名子查詢（`has_abstract:false`）新增：**0 筆。`title.search` 的命中都已包含在主查詢（`title_and_abstract.search`）裡，所以沒有新增，見 README。
- **語料 ID 快照：**`ids-corpus.json` 共 145 筆。
- **中性查詢聯集：**736 筆；中性減主查詢的差集 629 筆，存於 `ids-neutral-minus-main.json`，供漏收抽樣。
- **面板規模：**article＋review 共 6654 篇；其中 OpenAlex `has_abstract:false` 的 1760 篇。逐刊數字見 `queries.json`。
- **面板外監測：**各子查詢不限期刊的 `meta.count` 記在 `queries.json` 的 `outside_panel`，只記錄、不編碼。

- **被引次數：**`cited-by-count.json` 記語料每篇的 OpenAlex `cited_by_count` 與查詢時間（同日 2026-10-10），供日後回推知識庫時判定「高引用」（方案第 8 節，管理者 2026-10-10 決定乙）。

## 參考集
- 本年參考集篇數以 OpenAlex 年份比對後，於第 3 步（2025）或回溯時記入。

## 種子（20261010＋年份×10＋用途代碼）

- 漏收抽樣：20281231
- 一致性抽樣：20281232
- 全文對照：20281233
- 批次順序：20281234
- 校準插入：20281235
- 錨定樣本：20281236

## 已知差異
- **分頁筆數與 `meta.count` 的微小差異：**N1（638／637）。OpenAlex 在分頁期間的索引更新所致，以實際取得的 ID 為準。
