# 2022 趨勢語料回推知識庫（2026-10-11）

依 `research/annual-paper-trend-analysis-plan.md` 第 8 節「回推知識庫」（管理者 2026-10-10 選乙）辦理，流程與 2023（[../p0-annual-trends-2023/kb-pushback.md](../p0-annual-trends-2023/kb-pushback.md)）相同。本次由編輯 session 執行。逐篇對照表見 [kb-pushback.csv](kb-pushback.csv)。

## 範圍

- 來源：`research/trend-corpus/2022/corpus.csv`（#242，含專家受訪者準則改判的 2 篇）。
- 2022 主要分母 43 篇少於每年 50 篇，依第 6 節預定方式與 2023 合併為前期處理；這屬「合併」而非未通過門檻，回推照做（比照 2023）。
- 納入：`ai_lit_class=A`，且 `audience_role` 為 `student` 或 `inservice_teacher`，共 **43 篇**（學生 34、在職教師 9）。B 類、C 類、`unknown` 不回推；2022 沒有 `other_stakeholder`。2022 沒有撤稿與重複紀錄。
- 只記書目（題名、DOI、OpenAlex 年份），不存摘要；一律 `discovered_unverified`。
- 回推是把結果複製進知識庫，不改 trend-corpus 語料，也不作為召回率參考集。

## 結果

| 項目 | 篇數 | 關聯數 |
|---|---:|---:|
| 新入庫（KB-2022-0005～0047） | 43（學生 34、在職教師 9） | 376（KR-5890～6265） |
| 高引用標記 | 5 | 5（KR-6266～6270） |
| 已在庫 | 0 | 0 |

以 DOI 規範化比對與題名比對，知識庫都沒有這 43 篇，全部新入庫。

## 編碼轉換

與 2023 相同：學段身分、主題、方法、範圍、面向五種標記，新入庫者另加 `has_category=K2` 與監測清單的 `published_in`。轉換表依 2023、2024 已入庫紀錄核對，結果一致（`vocational_secondary` 對 `STAGE_UPPER_SECONDARY`；學段 `unknown` 不標）。依管理者 2026-10-11 裁定（選甲），方法沒有對應代碼的 7 篇不標方法：`conceptual` 3 篇、`instrument_dev` 2 篇、`unknown` 2 篇。

## 高引用（`has_citation_flag`）

引用數為 OpenAlex `cited_by_count`，**查詢日期 2026-10-11**，只在這 43 篇內比較。前 10%（⌈43×0.1⌉＝5 名，門檻 ≥433）共 5 篇：

| work_id | DOI | cited_by_count | record_id | relation_id |
|---|---|---:|---|---|
| W4293731327 | 10.1016/j.chb.2022.107468 | 968 | KB-2022-0028 | KR-6266 |
| W4221079197 | 10.1007/s10639-021-10831-6 | 656 | KB-2022-0013 | KR-6267 |
| W4229456833 | 10.1111/bjet.13232 | 555 | KB-2022-0017 | KR-6268 |
| W4284993420 | 10.1016/j.compedu.2022.104582 | 466 | KB-2022-0023 | KR-6269 |
| W4221022300 | 10.1016/j.caeai.2022.100061 | 433 | KB-2022-0012 | KR-6270 |

各年門檻不同（2025 ≥37、2024 ≥141、2023 ≥324、2022 ≥433），不可跨年比較；`schema.md` 的門檻列表已補上 2022。

## 檢查

- `node research/validate-knowledge-base.js --write-index`：684 筆、6,143 關聯，通過。
- `node research/render-knowledge-base-years.js --write`、`node research/render-site.js --write`：已重建年度索引與網站頁。
- `node --test research/*.test.js`：313 通過；verify-and-deploy 全部指令（含 `validate-publication.js`、`public-site.js --build`）：通過。
