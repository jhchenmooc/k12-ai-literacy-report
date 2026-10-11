# 2024 趨勢語料回推知識庫（2026-10-11）

依 `research/annual-paper-trend-analysis-plan.md` 第 8 節「回推知識庫」（管理者 2026-10-10 選乙）辦理，流程與 2025（[../p0-annual-trends-2025/kb-pushback.md](../p0-annual-trends-2025/kb-pushback.md)）相同。逐篇對照表見 [kb-pushback.csv](kb-pushback.csv)。

## 範圍

- 來源：`research/trend-corpus/2024/corpus.csv`（含 ERR-004 寫回的 2 篇面向）。
- 納入：`ai_lit_class=A`，且 `audience_role` 為 `student` 或 `inservice_teacher`，不含撤稿與重複紀錄，共 **73 篇**（學生 49、在職教師 24）。`other_stakeholder`、B 類、C 類不回推。
- 操作細則判 B 的 4 篇接受度研究比照 2025 處理，維持 B、不回推：W4398175004、W4399610489、W4402750117、W4403971764。
- 只記書目（題名、DOI、OpenAlex 年份），不存摘要；一律 `discovered_unverified`。
- 回推是把結果複製進知識庫，不改 trend-corpus 語料，也不作為召回率參考集。

## 結果

| 項目 | 篇數 | 關聯數 |
|---|---:|---:|
| 新入庫（KB-2024-0011～0083） | 73（學生 49、在職教師 24） | 667（KR-4781～5447） |
| 已在庫 | 0 | 0 |

以 DOI 規範化比對與題名比對，知識庫都沒有這 73 篇，全部新入庫。

## 編碼轉換

與 2025 相同（學段身分、主題、方法、範圍、面向五種標記，新入庫者另加 `has_category=K2` 與監測清單的 `published_in`）。依管理者 2026-10-11 裁定（選甲），方法沒有對應代碼的 14 篇不標方法：`instrument_dev` 11 篇、`conceptual` 2 篇、`unknown` 1 篇。

2024 的 A 類學生／在職教師論文面向都已有值（W4396705023、W4403472097 由 ERR-004 寫回），沒有只進知識庫的補值。

## 高引用（本 PR 不加標）

引用數為 OpenAlex `cited_by_count`，**查詢日期 2026-10-11**，只在這 73 篇內比較。前 10%（⌈73×0.1⌉＝8 名，門檻 ≥141）共 8 篇。本 PR 不建立「高引用」關聯，清單如下供核：

| work_id | DOI | cited_by_count | record_id |
|---|---|---:|---|
| W4392767952 | 10.1016/j.caeo.2024.100171 | 532 | KB-2024-0020 |
| W4394680566 | 10.1016/j.caeo.2024.100178 | 220 | KB-2024-0024 |
| W4392998181 | 10.1007/s10639-024-12621-2 | 200 | KB-2024-0022 |
| W4395028987 | 10.1109/tlt.2024.3392830 | 195 | KB-2024-0029 |
| W4396623184 | 10.1057/s41599-024-03101-6 | 168 | KB-2024-0032 |
| W4391792217 | 10.1016/j.caeai.2024.100211 | 164 | KB-2024-0015 |
| W4392452962 | 10.1016/j.caeai.2024.100214 | 162 | KB-2024-0019 |
| W4403339696 | 10.1007/s10639-024-13094-z | 141 | KB-2024-0065 |

2024 論文累積引用的時間比 2025 多一年，兩年的門檻（2025 為 ≥37）不可互相比較。

## 檢查

- `node research/validate-knowledge-base.js --write-index`：594 筆、5,320 關聯，通過。
- `node research/render-knowledge-base-years.js --write`、`node research/render-site.js --write`：已重建年度索引與網站頁。
- `node --test research/*.test.js`：308 通過。
- `node research/validate-publication.js .`、`node research/public-site.js . --build`：通過。
