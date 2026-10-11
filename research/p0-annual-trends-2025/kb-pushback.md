# 2025 趨勢語料回推知識庫（2026-10-11）

依 `research/annual-paper-trend-analysis-plan.md` 第 8 節「回推知識庫」（管理者 2026-10-10 選乙）辦理。逐篇對照表見 [kb-pushback.csv](kb-pushback.csv)。

## 範圍

- 來源：`research/trend-corpus/2025/corpus-v2.csv`（含 ERR-001～003 更正後的結果）。
- 納入：`ai_lit_class=A`，且 `audience_role` 為 `student` 或 `inservice_teacher`，共 **118 篇**（學生 69、在職教師 49）。`other_stakeholder`、B 類、C 類不回推。
- 操作細則判 B 的 4 篇接受度研究（W4411214117、W4412968221、W4413077749、W4417425684）維持 B，不回推。
- 只記書目（題名、DOI、OpenAlex 年份），不存摘要；一律 `discovered_unverified`。
- 回推是把結果複製進知識庫，不改 trend-corpus 語料，也不作為召回率參考集。

## 結果

| 項目 | 篇數 | 關聯數 |
|---|---:|---:|
| 新入庫（KB-2025-0136～0223） | 88（學生 50、在職教師 38） | 794 |
| 已在庫，只補缺漏標記 | 21 | 37 |
| 已在庫，無缺漏可補 | 9（其中 6 篇另有不一致） | 0 |
| 合計 | 118 | 831（KR-3950～4780） |

已在庫的 30 篇以 DOI 規範化比對找到，不重複入庫。補標只限第 8 節列的五種標記（學段與身分、主題、方法、範圍、面向），不補 `has_category`、`published_in`。

## 編碼轉換

| 趨勢語料欄位 | 知識庫關聯 | 對應 |
|---|---|---|
| `audience_role` | `has_population` | student→`ROLE_STUDENT`；inservice_teacher→`ROLE_INSERVICE_TEACHER` |
| `stage` | `has_population` | preschool→`STAGE_PRESCHOOL`；primary→`STAGE_PRIMARY`；lower_secondary→`STAGE_LOWER_SECONDARY`；upper_secondary、vocational_secondary→`STAGE_UPPER_SECONDARY`；secondary_unspecified→`STAGE_SECONDARY`；k12_multi→`STAGE_K12_MULTI`；k12_unspecified→`STAGE_K12_GENERAL`；unknown 不標 |
| `topic` | `has_topic` | genai→GENAI；ailit_curriculum→CURRICULUM；assessment→ASSESSMENT；teacher_pd→TEACHER_PD；ethics_safety→ETHICS；learning_intervention→INTERVENTION；ct_programming_data→CT；language→LANGUAGE；stem_science→STEM；equity_special→EQUITY；policy_governance→POLICY；none 不標 |
| `method` | `has_method` | experimental→EXPERIMENT；survey→SURVEY；review→REVIEW；qualitative→QUALITATIVE；mixed→MIXED；design_based→DESIGN |
| `ai_lit_class` | `has_ailit_class` | `AILIT_A` |
| `ai_lit_dims` | `has_ailit_dim` | 原代碼 |

新入庫者另加 `has_category=K2`，`journal_code` 為監測清單 ID 時加 `published_in`。

**待核：方法沒有對應代碼的 18 篇不標方法**——`instrument_dev`（量表／測驗發展）11 篇、`conceptual` 5 篇、`unknown` 2 篇。知識庫方法代碼沒有「量表發展」與「概念性」；`instrument_dev` 是否併入 `METHOD_SURVEY`（#問卷量表）屬新規則，未自行決定，請編輯 session／管理者裁示。

## 已在庫但不一致（未改動，請核）

只補缺漏、不覆寫。下列 11 篇知識庫既有標記與本次編碼不同，保留知識庫原值：

| record_id | work_id | 不一致 |
|---|---|---|
| KB-2025-0089 | W4406235811 | 範圍：知識庫 B／本次 A |
| KB-2025-0101 | W7117153629 | 範圍：知識庫 B／本次 A |
| KB-2025-0063 | W4416996082 | 身分：知識庫在職教師／本次學生；範圍：知識庫 B／本次 A |
| KB-2025-0118 | W4409483111 | 身分：知識庫學生／本次在職教師（因此未補 T-TEA 面向；範圍 A 已補） |
| KB-2025-0022 | W4409577958 | 方法：知識庫問卷／本次實驗 |
| KB-2025-0111 | W4413878265 | 方法：知識庫設計本位／本次質性 |
| KB-2026-0053 | W4411932223 | 學段：知識庫國小＋中學未分／本次 K12跨學段 |
| KB-2025-0072 | W7117486229 | 學段：知識庫國小＋中學未分／本次 K12跨學段 |
| KB-2025-0005 | W4414614366 | 學段：知識庫國小／本次 K12未細分 |
| KB-2025-0018 | W4416828367 | 學段：知識庫 K12未細分／本次中學未分 |
| KB-2026-0150 | W4416998556 | 學段：知識庫 K12未細分／本次 K12跨學段 |

身分不一致時，該篇的學段與面向一律不補，以免同一筆出現互相矛盾的標記。

## 面向補值（只進知識庫）

下列 9 篇在 corpus-v2 的 `ai_lit_dims` 為空，面向由文獻搜尋 session 以盲測子代理補判（2025 趨勢第 3 步之後），**只寫入知識庫，corpus-v2 不回寫**（`kb-pushback.csv` 的 `dims_source=backfill_kb_only`）：

| work_id | record_id | 面向 |
|---|---|---|
| W4406297484 | KB-2025-0137 | T-TEA |
| W4407190006 | KB-2025-0144 | T-TEA |
| W4411033383 | KB-2025-0169 | S-LRN；S-ETH |
| W4411452249 | KB-2025-0172 | T-TEA |
| W4412749651 | KB-2025-0177 | T-TEA |
| W4414705813 | KB-2025-0198 | S-LRN |
| W4415696757 | KB-2025-0010（已在庫） | T-ETH；T-TEA（已在庫者只補缺漏的 T-TEA） |
| W4416975691 | KB-2025-0215 | S-LRN |
| W4417182238 | KB-2025-0217 | T-TEA |

## A／B 邊界案例

W4414705813（KB-2025-0198）與 W4416975691（KB-2025-0215）維持 A 並回推，但兩篇都只有「AI 賦能學習」面向，與 B 類（AI 工具應用）界線接近；2025 報告限制段一併列出。

## 高引用（本 PR 不加標）

引用數為 OpenAlex `cited_by_count`，**查詢日期 2026-10-11**，只在這 118 篇內比較。前 10%（⌈118×0.1⌉＝12 名，門檻 ≥37）共 12 篇；與先前候選清單的 12 篇相同。本 PR 不建立「高引用」關聯，清單如下供核：

| work_id | DOI | cited_by_count | record_id |
|---|---|---:|---|
| W4406818641 | 10.1016/j.caeai.2025.100373 | 169 | KB-2025-0142 |
| W4408656469 | 10.1007/s10639-025-13463-2 | 110 | KB-2025-0155 |
| W4406071401 | 10.1016/j.caeai.2024.100358 | 79 | KB-2025-0136 |
| W4406107150 | 10.1016/j.caeai.2025.100363 | 73 | KB-2025-0020 |
| W4409454078 | 10.1080/10494820.2025.2487538 | 66 | KB-2025-0061 |
| W4412647175 | 10.1080/17439884.2025.2537959 | 53 | KB-2025-0176 |
| W4411452249 | 10.3389/feduc.2025.1622240 | 50 | KB-2025-0172 |
| W4414866981 | 10.1016/j.caeai.2025.100487 | 50 | KB-2025-0199 |
| W4410524363 | 10.1016/j.caeai.2025.100422 | 44 | KB-2025-0016 |
| W4407750016 | 10.1007/s10639-025-13350-w | 39 | KB-2025-0149 |
| W4408475772 | 10.1007/s10639-025-13347-5 | 37 | KB-2025-0152 |
| W4412749651 | 10.1016/j.tate.2025.105157 | 37 | KB-2025-0177 |

## 檢查

- `node research/validate-knowledge-base.js --write-index`：521 筆、4,653 關聯，通過。
- `node research/render-knowledge-base-years.js --write`、`node research/render-site.js --write`：已重建年度索引與網站頁。
- `node --test research/*.test.js`：308 通過。
- `node research/validate-publication.js .`、`node research/public-site.js . --build`：通過。
