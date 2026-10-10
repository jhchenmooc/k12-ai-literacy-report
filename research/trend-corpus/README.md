# trend-corpus：K-12 AI 素養期刊研究逐年趨勢語料（草稿）

> **狀態：**[論文逐年趨勢分析方案](../annual-paper-trend-analysis-plan.md)第 7 節第 1 步「準備與 PROTOCOL」的產出，待管理者核准 D1。**尚未做四年同日檢索，沒有語料快照。**
>
> **不上網站、不進出版閘門、不改知識庫。**repo 是公開的，本目錄任何人都讀得到。

## 資料來源與著作權

書目資料來自 OpenAlex（CC0）與 Crossref 中繼資料；題名、DOI 屬書目事實。本目錄不含摘要、全文或作者資料；`rationale` 欄為改述。各論文著作權屬原權利人。本目錄自行產生的編碼資料授權：**待 D3 決定**（建議 CC BY 4.0）。

## 檔案

| 檔案 | 內容 |
|---|---|
| [PROTOCOL.md](PROTOCOL.md) | 四年共用的事前凍結內容，目前是草稿 |
| [codebook-v1.md](codebook-v1.md) | 編碼手冊 v1 |
| [prompts/](prompts/) | 範圍判斷、第一次編碼、第二次編碼三組提示，附 `SHA256SUMS` |
| [journals.csv](journals.csv) | J01–J47 的 source ID、面板判定、面板分層、摘要覆蓋率 |
| [calib.csv](calib.csv) | 校準集，真實 16 筆、合成 15 筆 |
| [refset.csv](refset.csv) | 召回參考集，目前只有表頭 |
| [systematic-reviews.md](systematic-reviews.md) | 系統性回顧候選清單 |
| [pilot-2022/](pilot-2022/) | 2022 年試編 20 篇的結果，不含摘要與證據原文 |
| [open-questions.md](open-questions.md) | 方案沒寫清楚、待決定的地方 |
| `step1/` | 第 1 步的 OpenAlex 請求紀錄、試查筆數、source 查詢結果，不含論文 ID 快照 |
| `scripts/oa.py` | OpenAlex 請求小工具：單執行緒、間隔 0.2 秒以上、記錄每次請求 |

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
| `panel_stratum` | 面板分層 |
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
