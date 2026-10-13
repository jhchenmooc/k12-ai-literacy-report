# 四年趨勢報告：補充分析程式與輸出

管理者 2026-10-13 同意，把四年合併報告（內部草稿，私人儲存庫）中可公開的補充分析移入公開儲存庫（方案第 10 節第 36 項；草稿附錄 A 管理者決定第 20、21 項 (7)）。這些分析只作品質紀錄或敏感度，**不改主表與主結論**；四年報告在 D5 人工驗證完成前不對外引用。

只收「只讀公開語料」的程式，以及只含書目與標記的輸出。含摘要、題名對照或全文的原始輸入輸出、Scopus／Web of Science 匯出、全文與含判讀依據的逐篇檔都留在私人儲存庫。

## 程式與輸出

在儲存庫根目錄執行；`research/trend-corpus` 是公開語料目錄。

| 程式（`scripts/`） | 輸出（`outputs/`） | 內容 |
|---|---|---|
| `extra_sensitivity.py research/trend-corpus` | `extra-sensitivity-output.txt` | 草稿第 3.3 節補充敏感度 |
| `journal_denominators.py research/trend-corpus`（加 `--summary` 得摘要） | `journal-denominators.csv`、`journal-denominators-summary.txt` | 每千篇的逐刊分母（OpenAlex 面板篇數） |
| `batch_effects.py research/trend-corpus` | `batch-effects-output.txt` | 第二次判讀逐批一致率、第一次判讀的位置與批次效應 |
| `fetch_author_countries.py research/trend-corpus <輸出 CSV>`（連 OpenAlex） | `author-countries.csv` | OpenAlex 作者國別（公開書目欄位） |
| `author_country_analysis.py research/trend-corpus outputs/author-countries.csv` | `author-country-output.txt` | 作者國別分布與分國別敏感度 |
| `make_figures.py <輸出目錄>` | `figures/fig1–3.svg` | 圖 1–3（數字寫在程式內，取自主表與補充敏感度） |
| `pool89_scenario.py research/trend-corpus outputs/pool89-fulltext-coding-public.csv` | `pool89-scenario-output.txt` | 草稿第 3.2 節後期 89 篇補讀的情境重算 |
| `interleaved_rerun_analysis.py`（輸入含摘要，只放程式） | `interleaved-rerun-output.txt` | 交錯重判的彙總輸出（不含摘要） |

`pool89-fulltext-coding-public.csv`：後期 89 篇補讀的逐篇判定（模型讀全文判讀，**未經人工核對**），已刪去判讀依據與 class_concern 欄；管理者 2026-10-13 同意公開。判讀結果的標記已在知識庫公開（方案第 10 節第 34 項）。

## 核對

2026-10-13 在公開儲存庫以 `research/trend-corpus` 重跑：`extra_sensitivity`、`journal_denominators`（兩種輸出）、`batch_effects`、`author_country_analysis`、`pool89_scenario`（讀公開版 CSV）、`make_figures` 的輸出都與本目錄檔案逐位元組相同。`fetch_author_countries` 需連 OpenAlex，未重跑；`interleaved_rerun_analysis` 的輸入不公開，無法在公開儲存庫重跑。

判讀用的模型與第一次判讀相同，不算獨立審閱。
