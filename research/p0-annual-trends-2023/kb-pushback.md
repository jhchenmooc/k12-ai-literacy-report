# 2023 趨勢語料回推知識庫（2026-10-11）

依 `research/annual-paper-trend-analysis-plan.md` 第 8 節「回推知識庫」（管理者 2026-10-10 選乙）辦理，流程與 2024（[../p0-annual-trends-2024/kb-pushback.md](../p0-annual-trends-2024/kb-pushback.md)）相同。逐篇對照表見 [kb-pushback.csv](kb-pushback.csv)。

## 範圍

- 來源：`research/trend-corpus/2023/corpus.csv`（含 3 篇寫入前補編的面向）。
- 2023 主要分母 49 篇少於每年 50 篇，依第 6 節預定方式與 2022 合併為前期處理；這屬「合併」而非未通過門檻，回推照做（編輯 session 2026-10-11 核對）。
- 納入：`ai_lit_class=A`，且 `audience_role` 為 `student` 或 `inservice_teacher`，共 **47 篇**（學生 37、在職教師 10）。`other_stakeholder` 2 篇、B 類、C 類不回推。2023 沒有撤稿與重複紀錄。
- 操作細則判 B 的接受度／採用研究比照 2024、2025 維持 B、不回推：W4321499810、W4385765907、W4389742464。
- 只記書目（題名、DOI、OpenAlex 年份），不存摘要；一律 `discovered_unverified`。
- 回推是把結果複製進知識庫，不改 trend-corpus 語料，也不作為召回率參考集。

## 結果

| 項目 | 篇數 | 關聯數 |
|---|---:|---:|
| 新入庫（KB-2023-0013～0059） | 47（學生 37、在職教師 10） | 417（KR-5468～5884） |
| 高引用標記 | 5 | 5（KR-5885～5889） |
| 已在庫 | 0 | 0 |

以 DOI 規範化比對與題名比對，知識庫都沒有這 47 篇，全部新入庫。

## 編碼轉換

與 2024、2025 相同（學段身分、主題、方法、範圍、面向五種標記，新入庫者另加 `has_category=K2` 與監測清單的 `published_in`）。依管理者 2026-10-11 裁定（選甲），方法沒有對應代碼的 5 篇不標方法：`instrument_dev` 2 篇、`conceptual` 2 篇、`unknown` 1 篇。

## 高引用（`has_citation_flag`）

依 #235 新增的 `has_citation_flag`／`CITED_TOP10_SAME_YEAR` 直接加關聯。引用數為 OpenAlex `cited_by_count`，**查詢日期 2026-10-11**，只在這 47 篇內比較。前 10%（⌈47×0.1⌉＝5 名，門檻 ≥324）共 5 篇：

| work_id | DOI | cited_by_count | record_id | relation_id |
|---|---|---:|---|---|
| W4386417345 | 10.1080/10494820.2023.2253861 | 835 | KB-2023-0040 | KR-5885 |
| W4366393300 | 10.1186/s40594-023-00418-7 | 697 | KB-2023-0026 | KR-5886 |
| W4315641685 | 10.1016/j.caeai.2023.100124 | 476 | KB-2023-0015 | KR-5887 |
| W4389681621 | 10.1111/bjet.13411 | 369 | KB-2023-0058 | KR-5888 |
| W4367189069 | 10.1016/j.chb.2023.107798 | 324 | KB-2023-0029 | KR-5889 |

各年門檻不同（2025 ≥37、2024 ≥141、2023 ≥324），不可跨年比較；`schema.md` 的門檻列表已補上 2023。

## 檢查

- `node research/validate-knowledge-base.js --write-index`：641 筆、5,762 關聯，通過。
- `node research/render-knowledge-base-years.js --write`、`node research/render-site.js --write`：已重建年度索引與網站頁。
- `node --test research/*.test.js`：309 通過。
- `node research/validate-publication.js .`、`node research/public-site.js . --build`：通過。
