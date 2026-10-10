# 10 月月報學者新作素材：S04 Vartiainen 等（2026-09-30）

> **性質：月報素材的書目與摘要核對，不是刊物。** 還沒建 claims 檔，也沒有登錄期別。同一模型核對，不算獨立審閱；`claim_text` 為草稿，尚未兩輪交叉核對、未經翻譯審閱。

## 書目（出版者頁核對，2026-10-10）

- **題名**：Understanding AI Mechanisms Supports Disciplinary Reasoning and Ethical Judgment in K–12 AI Literacy Education
- **作者**：Henriikka Vartiainen、Juho Kahila、Nicolas Pope、Matti Tedre（S04 為第一作者）
- **刊物**：*Informatics in Education*（J42）25 卷 3 期；DOI 10.15388/infedu.2601.025
- **首次公開日**：2026-09-30。依據為出版者頁 <https://infedu.vu.lt/journal/INFEDU/article/868/info> 的 `citation_publication_date` 2026/09/30（HTTP 200，TLS 驗證正常），與 Crossref、OpenAlex 一致。
- **知識庫**：KB-2026-0128 補首發日 2026-09-30，題名、作者、刊名、卷期與出版者頁相符，升為 `bibliographic_checked`；`published_in` J42 關聯一併升級。

## 月報欄位（草稿）

| 欄位 | 值 |
|---|---|
| `section` | `scholars` |
| `research_group` | `S04`（預設學者代碼；Generation AI 團隊目前未登記共用代碼） |
| `ai_lit_class`／`ai_lit_dims` | A；S-BAS、S-ETH |
| `audience` | `k12`（6、9 年級學生 40 人） |
| `claim_class`／`risk_tier` | `descriptive`／`medium` |
| `assertion_type` | `research_finding` |
| `source_locator` | Abstract |
| 觀察期間 | 落在 10 月月報期間 2026-09-30～10-29 內 |

**原文摘錄（摘要）**：

> we qualitatively analyzed group interviews with 40 K–12 students in grades 6 and 9. The results show that students fluently used AI concepts as mediating tools.

**`claim_text` 草稿**：

> 芬蘭研究團隊以質性方式分析40名6年級與9年級學生的小組訪談，學生參與三年期、共同設計的累積式AI教育課程後，作者報告學生能以AI概念解釋分類器、社群媒體推薦與同溫層等機制，並延伸到個人與社會層面的倫理思辨；屬質性研究，不是學習成效的因果驗證。

## 出刊前還要做

- 存原文短摘錄快照到 `publication/sources/` 並記 SHA-256。
- 兩輪原文交叉核對（`ai_crosscheck_passes` 2）與翻譯審閱。
- `kind: research`、`level`（V2）、`checked_at`、`publication_date` 2026-09-30、`source_type`、`scope_checked` 等查核欄位。
