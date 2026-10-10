# 補標學段、身分、主題與方法：2026-10-10 後入庫的 18 篇研究紀錄

> **性質：**AI 判讀，未經人工逐筆核對，一律 `discovered_unverified`。不算獨立審閱。
>
> **規則：**依 [knowledge-base/schema.md](../knowledge-base/schema.md)「學段與身分」一節，與 [p0-trends notes.md](../p0-trends-2026-10-10/notes.md) 第 3 節：
> - 教師研究記任教學段。
> - 年齡區間逐歲歸到學段；某學段要占 2 歲以上才算，區間只有 1～2 歲時占 1 歲就算。
> - 兩個以上學段記 `STAGE_K12_MULTI`，並列出各學段。
> - 只有主要學段是特定學段時，才加 `ROLE_STUDENT`。
> - 判為不明者不標。
>
> **證據：**只用各篇入庫報告既有的學段證據，沒有另做查詢。`evidence_url` 用 DOI 網址。
>
> **範圍：**新增 96 筆關聯，KR-2778～KR-2873，接在 #206 之後：
> - `has_population` 53 筆。
> - `has_topic` 與 `has_method` 43 筆。

## 逐筆標記

| 紀錄 | 標記 | 證據（入庫報告） |
|---|---|---|
| KB-2026-0250 | 在職教師；K12 跨學段（高中、國中、國小） | [p0-pending-final](../p0-pending-final-2026-10-10/report.md)：Frontiers 全文，樣本為高中、國中、國小教師 |
| KB-2026-0251 | 在職教師；K12 跨學段（國小、國中、高中） | 同上：任教學生 5–10、11–15、15 歲以上 |
| KB-2026-0252 | 學生；高中 | 同上：arXiv 全文，高中資訊科學課 9–12 年級。9 年級只占 1 歲，不足 2 歲，不計國中 |
| KB-2026-0253 | K12 跨學段（國中、高中） | 同上：14–15 歲，區間只有 2 歲，各占 1 歲都計入 |
| KB-2026-0254 | 學生；高中 | 同上：摘要寫高中生 |
| KB-2025-0123 | 在職教師；K12 跨學段（國小、國中、高中） | 同上：AERA 全文，任教小學、國中、高中 |
| KB-2025-0124 | K12 未細分 | 同上：K-12 州指引 |
| KB-2025-0125 | 在職教師；K12 跨學段（國小、國中、高中） | 同上：141 名在職 K-12 教師，含小學、國中、高中 |
| KB-2025-0126 | 家長行政；K12 未細分 | 同上：K12 school leaders |
| KB-2025-0127 | K12 跨學段（國中、高中） | 同上：國中與高中學生 |
| KB-2025-0128 | 學生；高中 | 同上：高中生 |
| KB-2025-0129 | K12 未細分 | 同上：回顧對象為 K-12 學生 |
| KB-2025-0132 | 學生；高中 | 同上：都市高中 45 名學生 |
| KB-2025-0133 | K12 跨學段（幼兒、國小、國中、高中） | 同上：PolyU 典藏全文，依幼兒園至高中分析 |
| KB-2026-0263 | K12 跨學段（國中、高中） | [p0-b1-fulltext](../p0-b1-fulltext-2026-10-10/report.md)：13–18 歲，13–14 歲計國中，15–18 歲計高中 |
| KB-2026-0264 | 學生；高中 | 同上：高中生約 71%，依多數判 |
| KB-2026-0265 | K12 跨學段（國中、高中） | 同上：13–17 歲青少年。另有家長與業界人員，主要對象為青少年，不加家長行政 |
| KB-2026-0266 | 在職教師；高中 | 同上：高中資訊科技教學的教師 |

## 主題與方法（`has_topic`、`has_method`）

> **規則：**[notes.md](../p0-trends-2026-10-10/notes.md) 第 5、6 節的關鍵字規則，與 #206 首批轉入用的是同一組正規式，套在題名與 OpenAlex 摘要上；沒有 OpenAlex 摘要的只看題名。
> - 摘要是 2026-10-10 以 OpenAlex `filter=doi` 抓 1 次，不計入趨勢方案的呼叫額度，不入 repo。
> - 方法判不出者不標；主題可以多筆。
> - 關鍵字規則有偽陽性，例如 risk、writing、policy 等常見字。

| 紀錄 | OpenAlex 摘要 | 方法 | 主題 |
|---|---|---|---|
| KB-2026-0250 | 有 | METHOD_MIXED | TOPIC_GENAI、TOPIC_LANGUAGE、TOPIC_POLICY |
| KB-2026-0251 | 有 | METHOD_MIXED | TOPIC_GENAI、TOPIC_TEACHER_PD、TOPIC_ETHICS、TOPIC_CT、TOPIC_POLICY |
| KB-2026-0252 | 有 | METHOD_SURVEY | TOPIC_ASSESSMENT |
| KB-2026-0253 | 有 | METHOD_DESIGN | TOPIC_GENAI、TOPIC_ETHICS |
| KB-2026-0254 | 有 | METHOD_EXPERIMENT | TOPIC_CURRICULUM、TOPIC_INTERVENTION、TOPIC_CT、TOPIC_STEM |
| KB-2025-0123 | 無（只看題名） | 不標 | TOPIC_TEACHER_PD |
| KB-2025-0124 | 無（只看題名） | 不標 | TOPIC_EQUITY |
| KB-2025-0125 | 無（只看題名） | 不標 | 無 |
| KB-2025-0126 | 無（只看題名） | 不標 | TOPIC_POLICY |
| KB-2025-0127 | 無（只看題名） | 不標 | 無 |
| KB-2025-0128 | 無（只看題名） | 不標 | TOPIC_CT |
| KB-2025-0129 | 無（只看題名） | METHOD_REVIEW | TOPIC_CURRICULUM |
| KB-2025-0132 | 無（只看題名） | 不標 | TOPIC_GENAI |
| KB-2025-0133 | 有 | 不標 | 無 |
| KB-2026-0263 | 有 | METHOD_SURVEY | TOPIC_GENAI、TOPIC_ETHICS |
| KB-2026-0264 | 有 | METHOD_MIXED | TOPIC_CT、TOPIC_EQUITY、TOPIC_POLICY |
| KB-2026-0265 | 有 | METHOD_QUALITATIVE | TOPIC_ETHICS、TOPIC_CT、TOPIC_EQUITY |
| KB-2026-0266 | 有 | METHOD_MIXED | TOPIC_CURRICULUM、TOPIC_TEACHER_PD、TOPIC_EQUITY、TOPIC_POLICY |

- **AERA 8 篇沒有 OpenAlex 摘要，只看題名：**KB-2025-0123～0129、0132。所以方法多半判不出，主題也少。
  - 入庫時讀過的 AERA 論文庫摘要沒有用，以和首批規則一致。
- **KB-2025-0133 有摘要，但方法與主題都沒命中：**題名與摘要沒有回顧、問卷等字眼，所以不標。

## 範圍與框架面向（`has_ailit_class`、`has_ailit_dim`，2026-10-10 晚補）

> **規則：**依 [knowledge-base/schema.md](../knowledge-base/schema.md)「AI 素養範圍與框架面向」一節：
> - 照各篇入庫報告的 `ai_lit_class` 與 `ai_lit_dims` 轉入；判讀不一致者不標。
> - 依本刊共用準則，不用論文趨勢方案的操作細則。
> - 一律 `discovered_unverified`。
>
> **範圍：**新增 56 筆，KR-3864～KR-3919，接在編輯 session #209 之後。18 篇都是 A 類，各篇只有一個來源，沒有判讀不一致的情況。

| 紀錄 | 範圍 | 面向 | 來源 |
|---|---|---|---|
| KB-2026-0250 | A | T-BAS、T-ETH | [p0-pending-final b1-results.json](../p0-pending-final-2026-10-10/b1-results.json) |
| KB-2026-0251 | A | T-TEA、T-BAS | [p0-pending-final b1-results.json](../p0-pending-final-2026-10-10/b1-results.json) |
| KB-2026-0252 | A | S-BAS、S-ETH | [p0-pending-final b1-results.json](../p0-pending-final-2026-10-10/b1-results.json) |
| KB-2026-0253 | A | S-BAS、S-SYS、S-ETH | [p0-pending-final b1-results.json](../p0-pending-final-2026-10-10/b1-results.json) |
| KB-2026-0254 | A | S-BAS、S-SYS | [p0-pending-final b1-results.json](../p0-pending-final-2026-10-10/b1-results.json) |
| KB-2025-0123 | A | T-PD、T-BAS、T-ETH | [p0-pending-final b1-results.json](../p0-pending-final-2026-10-10/b1-results.json) |
| KB-2025-0124 | A | T-ETH、T-BAS | [p0-pending-final b1-results.json](../p0-pending-final-2026-10-10/b1-results.json) |
| KB-2025-0125 | A | T-PD、T-TEA | [p0-pending-final b1-results.json](../p0-pending-final-2026-10-10/b1-results.json) |
| KB-2025-0126 | A | T-BAS、T-ETH | [p0-pending-final b1-results.json](../p0-pending-final-2026-10-10/b1-results.json) |
| KB-2025-0127 | A | S-BAS、S-ETH | [p0-pending-final b1-results.json](../p0-pending-final-2026-10-10/b1-results.json) |
| KB-2025-0128 | A | S-BAS、S-SYS | [p0-pending-final b1-results.json](../p0-pending-final-2026-10-10/b1-results.json) |
| KB-2025-0129 | A | S-BAS、S-ETH | [p0-pending-final b1-results.json](../p0-pending-final-2026-10-10/b1-results.json) |
| KB-2025-0132 | A | S-ETH、S-BAS | [p0-pending-final b1-results.json](../p0-pending-final-2026-10-10/b1-results.json) |
| KB-2025-0133 | A | S-BAS、S-SYS | [p0-pending-final b1-results.json](../p0-pending-final-2026-10-10/b1-results.json) |
| KB-2026-0263 | A | S-ETH、S-BAS | [p0-b1-fulltext](../p0-b1-fulltext-2026-10-10/report.md) |
| KB-2026-0264 | A | S-ETH、S-BAS | [p0-b1-fulltext](../p0-b1-fulltext-2026-10-10/report.md) |
| KB-2026-0265 | A | S-ETH、S-SYS | [p0-b1-fulltext](../p0-b1-fulltext-2026-10-10/report.md) |
| KB-2026-0266 | A | T-BAS、T-TEA | [p0-b1-fulltext](../p0-b1-fulltext-2026-10-10/report.md) |

## 不標

- **KB-2025-0003：**依交辦判為不明，不標。

## 之後的做法

新入庫的研究紀錄，入庫時一併加上 `has_population`、`has_topic`、`has_method`、`has_ailit_class`、`has_ailit_dim`。
