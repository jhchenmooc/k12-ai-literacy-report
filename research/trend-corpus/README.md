# trend-corpus：K-12 AI 素養期刊研究逐年趨勢語料（草稿）

> **狀態：**[論文逐年趨勢分析方案](../annual-paper-trend-analysis-plan.md)第 7 節第 1 步「準備與 PROTOCOL」的產出；管理者 2026-10-10 核准 D1，PROTOCOL 已凍結。第 2 步四年同日 ID 快照已於 2026-10-10 完成，見各年目錄。
>
> **不上網站、不進出版閘門、不改知識庫。**repo 是公開的，本目錄任何人都讀得到。

## 資料來源與著作權

書目資料來自 OpenAlex（CC0）與 Crossref 中繼資料；題名、DOI 屬書目事實。本目錄不含摘要、全文或作者資料；`rationale` 欄為改述。各論文著作權屬原權利人。本目錄自行產生的編碼資料以 CC BY 4.0 授權（D3，管理者 2026-10-10 決定）。

## 檔案

| 檔案 | 內容 |
|---|---|
| [PROTOCOL.md](PROTOCOL.md) | 四年共用的事前凍結內容，目前是草稿 |
| [codebook-v1.md](codebook-v1.md) | 編碼手冊 v1 |
| [codebook-v2.md](codebook-v2.md) | 編碼手冊 v2（DEV-002，管理者 2026-10-10 核准） |
| [DEVIATIONS.csv](DEVIATIONS.csv) | PROTOCOL 偏離紀錄 |
| [ERRATA.csv](ERRATA.csv) | 已發布資料檔的更正紀錄（不改編碼結果的處理錯誤） |
| [prompts/](prompts/) | 範圍判斷、第一次編碼、第二次編碼三組提示（v2），附 `SHA256SUMS`；v1 在 `prompts/v1/` |
| [journals.csv](journals.csv) | J01–J47 的 source ID、面板判定、面板分層、摘要覆蓋率 |
| [calib.csv](calib.csv) | 校準集，真實 16 筆、合成 15 筆 |
| [refset.csv](refset.csv) | 召回參考集，目前只有表頭 |
| [systematic-reviews.md](systematic-reviews.md) | 系統性回顧候選清單 |
| [pilot-2022/](pilot-2022/) | 2022 年試編 20 篇的結果，不含摘要與證據原文 |
| [open-questions.md](open-questions.md) | 方案沒寫清楚、待決定的地方 |
| `2022/`～`2025/` | 第 2 步快照：`PROTOCOL-YYYY.md`、`queries.json`（每組子查詢的完整 filter、筆數、頁數，以及面板規模、缺摘要、面板外監測）、`ids-*.json`（work ID 快照）、`SHA256SUMS` |
| `step2/` | 第 2 步的 OpenAlex 請求紀錄與四年摘要 |
| `2024/corpus.csv` 等 | 2024 回溯（v2＋DEV-004）：`corpus.csv`、`neutral-sample.json`（n=200，DEV-008）、`fulltext-sample.csv`、`dev004a-pool39.csv`；報告見 `research/p0-annual-trends-2024/step3-interim.md`。已知限制：對象詞組沒有 young people；只寫 machine learning 而未寫泛稱 AI 的 K-12 研究不會被命中（管理者 2026-10-11 決定不擴詞） |
| `2023/corpus.csv` 等 | 2023 回溯（v2＋DEV-004）：`corpus.csv`、`neutral-sample.json`（n=200，種子 20281241，DEV-008）、`fulltext-sample.csv`、`dev004a-pool.csv`；報告見 `research/p0-annual-trends-2023/step3-interim.md`。對象不明的 A 類經書目線索、典藏版與管理者下載全文後只剩 1 篇，未抽樣推估 |
| `2022/corpus.csv` 等 | 2022 回溯（v2＋DEV-004）：`corpus.csv`、`neutral-sample.json`（n=200，種子 20281231，DEV-008）、`fulltext-sample.csv`、`dev004a-pool.csv`；報告見 `research/p0-annual-trends-2022/step3-interim.md`。錨定改用 2025 v2 錨點（DEV-011）；主要分母 43 篇（專家受訪者準則改判 2 篇），依預定方式與 2023 合併為前期 |
| `rerun-dev001/` | DEV-001 四年同日重跑快照（加泛稱 AI × 對象詞組 A1–A6）；原 `2022/`～`2025/` 快照保留不動 |
| `step1/` | 第 1 步的 OpenAlex 請求紀錄、試查筆數、source 查詢結果，不含論文 ID 快照 |
| `scripts/oa.py` | OpenAlex 請求小工具：單執行緒、間隔 0.2 秒以上、記錄每次請求 |
| `2025/coding2.csv` | 第二次編碼（編輯 session，code2.md v2）125 篇的結果，不含摘要與證據原文 |
| `2025/agreement.csv` | 第一次對第二次編碼的一致率與 Cohen κ（方案 4.5），另附「雙方皆 K-12 對象的 A 類」面向列 |
| `backfill-2022-2024/` | 回溯三年合併一致性（DEV-012）：`sample.json`（124 篇，種子 20281232／20281242／20281252）、`coding2.csv`（第二次編碼，不含摘要與證據原文）、`agreement.csv`（三年合併 κ，另附各年 A／B 列）；報告見 `research/p0-annual-trends-2022-2024/step3-agreement.md`；腳本 `scripts/agreement_sample_backfill.py`、`scripts/agreement_kappa_backfill.py` |
| `scripts/agreement_*.py`、`scripts/fulltext_*.py` | 一致性抽樣、摘要重組（只在 scratchpad 執行）、κ 計算、全文對照抽樣；用法見各檔開頭 |

## 資料字典

### journals.csv

| 欄位 | 說明 |
|---|---|
| `journal_code` | 監測清單代碼 J01–J47 |
| `name_watchlist` | 監測清單上的刊名 |
| `tier` | 監測清單上的級別 |
| `scope_watchlist` | 監測清單上的適用主題 |
| `openalex_display_name` | OpenAlex 上的刊名 |
| `issn_l` | OpenAlex 的 ISSN-L |
| `issns` | OpenAlex 的 ISSN，以 `;` 分隔 |
| `publisher_openalex` | OpenAlex 的出版者 |
| `source_id_YYYY` | 該年 `primary_location.source.id` |
| `match_evidence` | 比對方式與結果 |
| `articles_YYYY` | 該年 `type:article`、`is_paratext:false` 篇數，2026-10-10 取得 |
| `article_review_YYYY` | 該年 `type:article\|review`、`is_paratext:false` 篇數 |
| `oa_abstract_coverage_YYYY` | 該年 article＋review 中，OpenAlex `has_abstract:true` 的比例（OpenAlex 的定義，不是本方案的「20 詞以上」） |
| `in_panel` | 是否在固定面板（四年每年至少 1 篇 article） |
| `panel_stratum` | 面板分層：教育科技 24 刊、一般教育與心理 23 刊 |
| `stratum_reason` | 分層理由（規則見 open-questions Q1） |
| `watchlist_basis` | 加入監測清單的依據 |
| `j35_j47_sensitivity` | 排除 J35–J47 的敏感度表中標 `exclude` |

### calib.csv

| 欄位 | 說明 |
|---|---|
| `calib_id` | R 開頭為真實紀錄，S 開頭為合成案例 |
| `kind` | `real`、`synthetic`、`synthetic_boundary` |
| `work_id` | OpenAlex work ID，真實紀錄才有 |
| `doi` | DOI，真實紀錄才有 |
| `kb_record` | 知識庫紀錄代碼，真實紀錄才有 |
| `answer_class` | 答案 A／B／C |
| `answer_dims` | 面向，以 `;` 分隔 |
| `answer_stage` | 學段 |
| `answer_source` | 答案出處 |
| `synthetic_text` | 合成案例的全文，為自擬文字，不是任何論文的摘要 |
| `note` | 附註 |

真實紀錄的摘要只在 scratchpad，以 OpenAlex `filter=doi` 重抓，不入 repo。

### refset.csv

| 欄位 | 說明 |
|---|---|
| `refset_id` | 參考集代碼 |
| `review_doi`、`review_title`、`review_year` | 系統性回顧的 DOI、題名、年份 |
| `included_work_doi`、`included_work_title`、`included_year` | 回顧所納入論文的 DOI、題名、年份 |
| `journal_code` | 納入論文所在期刊的監測清單代碼 |
| `in_panel` | 是否刊於面板期刊 |
| `read_from` | 讀取來源 |
| `read_utc` | 讀取時間 |
| `note` | 附註 |

### step1/openalex-requests.jsonl

每行一筆請求：`url, utc, http, count, purpose`。網址不含 email、mailto 或任何憑證。

## 第 2 步快照（2026-10-10，同一天執行）

| 年 | 主查詢聯集 | 題名子查詢新增 | 中性聯集 | 中性減主查詢 | 面板 article＋review | 其中 `has_abstract:false` |
|---|---|---|---|---|---|---|
| 2022 | 145 | 0 | 736 | 629 | 6,654 | 1,760 |
| 2023 | 279 | 0 | 952 | 743 | 7,629 | 1,734 |
| 2024 | 813 | 0 | 1,644 | 973 | 9,432 | 1,601 |
| 2025 | 1,545 | 0 | 2,827 | 1,470 | 11,352 | 1,560 |

- **請求：**ID 快照共 193 次，全部 HTTP 200，UTC 19:26:14～19:27:49。另於同日以 30 次請求補抓四年語料的 OpenAlex `cited_by_count`，存於各年 `cited-by-count.json`（只有數字與查詢時間），供方案第 8 節的回推知識庫使用。
- **門檻：**四年都未達 2,500 筆的暫停門檻。
- **題名子查詢新增 0：**`title.search` 搜的欄位是 `title_and_abstract.search` 的子集，沒有摘要的論文只要題名有命中，主查詢就已經抓到。題名子查詢仍照 PROTOCOL 執行並保留 ID 快照，用來計算「靠題名命中、沒有摘要」的筆數。
- **分頁筆數差異：**少數子查詢實際取得的 ID 數與 `meta.count` 差 1～3 筆，是 OpenAlex 在分頁期間更新索引所致，以實際取得的 ID 為準，逐項列在各年 `PROTOCOL-YYYY.md`。
- **Scopus 補摘要清單（2025）：**另以 16 次請求檢查 2025 語料的 OpenAlex 摘要長度。1,545 篇中，處理後不足 20 詞的有 320 篇，全部有 DOI，依 PROTOCOL 第 15 節分成 4 批 `DOI(…) OR DOI(…)` 檢索式。檢索式只放 scratchpad，交編輯 session 轉管理者，不入 repo；請求紀錄在 `step2/openalex-requests.jsonl`，用途標「abstract length check」。

## DEV-001 重跑快照（2026-10-10，同一天執行）

依管理者 2026-10-10 決定（漏收做法乙，`DEVIATIONS.csv` DEV-001），主查詢加 6 組「泛稱 AI × K-12 對象詞」子查詢 A1–A6：`("artificial intelligence" OR AI) AND (<方案第 2.3 節對象詞，每 6 詞一組>)`，其他子查詢、中性查詢、題名子查詢與面板監測都照 PROTOCOL 不變，四年同日重跑。腳本是 `scripts/dev001_snapshot.py`（沿用 `step2_snapshot.py`）與 `scripts/probe_aud.py`。

| 年 | 原主查詢聯集 | 重跑主查詢聯集 | 新增（只靠 A1–A6） | 原有而消失 | 中性減主查詢 |
|---|---|---|---|---|---|
| 2022 | 145 | 216 | 71 | 0 | 558 |
| 2023 | 279 | 383 | 104 | 0 | 640 |
| 2024 | 813 | 981 | 168 | 0 | 805 |
| 2025 | 1,545 | 1,861 | 316 | 0 | 1,156 |

- **請求：**重跑共 270 次，全部 HTTP 200，UTC 19:54:47～19:57:13；紀錄在 `rerun-dev001/openalex-requests.jsonl`。重跑前另以 6 次請求試查 2025 年 A1–A6 筆數（`rerun-dev001/probe-requests.jsonl`，只取筆數）。
- **門檻：**四年都未達 2,500 筆。A5（含 teacher、educators、youth）命中最多，2025 年 781 筆。
- **分頁筆數差異：**2024 M7、2025 M7 與 A5 實際取得的 ID 比 `meta.count` 多 1 筆，以實際取得的 ID 為準。
- **題名子查詢新增：**四年仍為 0。
- **Scopus 補充批次（2025）：**新增 316 篇中，OpenAlex 摘要處理後不足 20 詞的有 55 篇，全部有 DOI，列為補充批次 5；檢索式只放 scratchpad，交編輯 session 轉管理者，不入 repo。

## 重算

第 1 步的計數都可以依 `step1/openalex-requests.jsonl` 中的網址重新請求。OpenAlex 資料會更新，重算結果可能與 2026-10-10 不同。

## PRISMA-S 必報項目（第 2 步起逐項填）

- 資料庫與介面：OpenAlex API。
- 每次執行日期。
- 每組子查詢完整網址。
- 各項限制與理由。
- 詞表來源：方案第 2.3 節。
- 沒有引文追蹤，也沒有聯絡作者。
- 檢索式審查方式：同一模型扮演審查角色，不算獨立審閱。
- 每組子查詢命中數。
- 去重前後筆數與方法。
- 改版紀錄。

## 引用與勘誤

- **建議引用：**K-12 AI 素養國際研究監測，trend-corpus 資料集，〈年份〉，版本〈git tag〉。
- **勘誤：**到 GitHub issue 回報，標籤 `trend-corpus-erratum`；更正記入 `ERRATA.csv`，於下一版發布。
