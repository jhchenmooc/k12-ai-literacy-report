# 依作者檢索試跑：入庫決定（2026-10-09）

> 承 [report.md](report.md)。判斷由同一模型完成，**不算獨立審閱**。候選池、`publication/issues.json`、閘門未動。

試跑中「K-12 明寫且涉 AI 主題」的 11 篇，依知識庫既有入選規則（學段由摘要明示；主題為 AI 素養、學習關於 AI、教師教 AI 的能力，或 K-12 生成式 AI 風險／治理；預印本只當線索）逐篇判斷。**管理者 2026-10-09 同意照整合者建議。**

| 作品 | 處理 | 理由 |
|---|---|---|
| `10.1016/j.caeai.2026.100661`（T10） | 已在庫 KB-2026-0009 | — |
| `10.1016/j.compedu.2026.105745`（H11） | 已在庫 KB-2027-0001 | — |
| `10.15388/infedu.2601.025`（S04，Informatics in Education） | **入庫 KB-2026-0128**（K2） | 摘要明示 40 名 6、9 年級學生，三年期 K-12 AI 素養課程 |
| `10.33422/ejte.v8i3.1872`（H26，European Journal of Teaching and Education） | **入庫 KB-2026-0129**（K5，SE） | 摘要明示瑞典中學教師；生成式 AI 時代書面作業評量（K-12 生成式 AI 治理） |
| `10.1016/j.caeo.2026.100422`（S04） | 待判 | 學段有寫，但主題為整體 AI 教育未來情境，非 AI 素養 |
| `10.1080/10494820.2026.2744403`（H11） | 待判 | OpenAlex、Crossref 皆無摘要 |
| `10.31234/osf.io/afuq2_v1`（H25，TAIL） | 待判 | 主題相符但為預印本，等正式版 |
| `10.48550/arxiv.2607.21777`（H29） | 待判 | 預印本；學段只能由 NGSS 推斷 |
| `10.5281/zenodo.22108724`（T02）、`10.48550/arxiv.2608.09289`（S18）、`10.1111/ijal.70320`（H11） | 排除 | AI 只當學習工具（其一為資料集） |

- 入庫兩筆皆 `journal_article`、`discovered_unverified`、首發日 unknown、`year_basis=issue_year`；題名與年份取自 Crossref。兩份期刊不在監測清單，未加 `published_in`（網站歸於「其他期刊與會議」）。
- 依先前約定，決定入庫時一併把試跑的 62 筆查詢寫入 `search_runs.csv`：`P0-20261009-SCHOLAR-<ID>`，`source_id` 用 `SCHOLAR-<ID>`（與 J／C／O 代碼區分），`query_scoped`／`partial`，`results_seen` 為 OpenAlex meta.count、`results_screened` 為命中筆數、`results_recorded` 為入庫數。
- records 207→209、relations 546→549、search runs 116→178。測試未修改；本機 `node --test research/*.test.js` 201／201 通過。
