# 後期 89 篇補讀全文：知識庫入庫與「#含K12回顧」補標（2026-10-12）

依方案第 10 節第 34 項（管理者 2026-10-12 決定）辦理。交辦來源：四年報告修訂工作階段（私人 repo `report/kb-handoff-pool89.md`）。逐篇對照表見 [kb-pushback-pool89.csv](kb-pushback-pool89.csv)（只含書目與標記）。

## 範圍與來源

- 來源：四年報告後期（2024–2025）「只寫學生或教師、尚未判定對象」的 89 篇。管理者以學校帳號下載需要全文的 76 篇，**由模型讀全文判讀**（與趨勢語料第一次判讀同一模型，不算獨立），未經人工核對。全文與逐篇判讀依據只存私人 repo，不進本 repo。
- 對象、學段、面向、方法來自全文判讀；主題沿用趨勢語料第一次判讀。方法為量表發展或概念文章者不標方法（2026-10-11 裁定）。第二組 14 篇沒有判素養面向，不標面向。
- 只記書目（題名、DOI、OpenAlex 年份），不存摘要；關聯一律 `discovered_unverified`。
- **趨勢語料不改**：全文判讀只作四年報告的敏感度（方案第 10 節第 34 項，選項 A），`research/trend-corpus/` 的 `audience_role` 等欄位維持第一次判讀。**因此這 28 篇在知識庫與語料中的標記不同，這是預期的。**

## 入庫結果

| 組別 | 篇數 | 主要標記 |
|---|---:|---|
| 屬中小學（照第 8 節回推規則） | 14（新入庫 13、KB-2025-0003 補標 1） | 對象、學段、面向、主題、方法、`AILIT_A` |
| 職前師培（一般入庫流程） | 6 | `TEACHER_ED`、主題、方法、`AILIT_A` |
| 回顧，含中小學但非主要（一般入庫流程） | 8 | `REVIEW_INCLUDES_K12`、主題、`METHOD_REVIEW`、`AILIT_A` |
| 合計 | 28（新入庫 27） | 關聯 220 條（KR-6302～6521） |

- 新入庫紀錄：KB-2024-0084～0091、KB-2025-0224～0242（`journal_article`，年份為 OpenAlex 年份）。
- 入庫前以最新 `records.csv` 做 DOI 規範化比對：只有 W4409243556 已在庫（KB-2025-0003），只補 `ROLE_STUDENT`、`STAGE_UPPER_SECONDARY` 兩條；方法不覆寫（知識庫為 `METHOD_MIXED`，全文判讀為實驗，依 2026-10-11 裁定保留知識庫原值）。
- 第 8 節回推規則原只收學生與在職教師；職前師培 6 篇與回顧 8 篇是管理者 2026-10-12 另行決定依一般入庫流程收錄。
- **判讀信心「低」的篇目**：候選時共 7 篇，管理者決定照樣入庫；其中 W4407872437（判讀者註記可能不屬 A 類）管理者另決定暫不入庫，所以實際入庫 6 篇：W4390563453（KB-2024-0084）、W4392866787（KB-2024-0086）、W4407190124（KB-2025-0226）、W4410108866（KB-2025-0227）、W4410379016（KB-2025-0228）、W4411916976（KB-2025-0229）。
- 不入庫：W4407872437。

## 既有回顧回溯補標（#含K12回顧）

對象：入庫前知識庫中 `has_method=METHOD_REVIEW` 的 52 筆（不含本次新入庫者）。依題名與摘要判讀（摘要取自 OpenAlex，缺者用私人 repo 的語料摘要；仍缺 4 筆只看題名），必要時讀開放取用全文。判讀由編輯工作階段的子代理初判、編輯工作階段逐筆複核；同一模型，不算獨立。

| 分類 | 筆數 | 處理 |
|---|---:|---|
| 以中小學為主（含 3 筆幼兒教育回顧；學前在本專案屬中小學範圍） | 43 | 維持既有標記，不加 |
| 含中小學但非主要，且與既有學段標記矛盾 | 2 | **不改、不加，交管理者裁定**（見下） |
| 不含中小學（以職前師資生或師資培育者為主） | 2 | 不加；既有 `TEACHER_ED` 相符 |
| 判不出 | 5 | 不加 |

**結果：本次沒有既有紀錄加上 `REVIEW_INCLUDES_K12`。**

### 交管理者裁定的 2 筆

| 紀錄 | 題名 | 判讀 | 既有標記 |
|---|---|---|---|
| KB-2025-0010 | The AI3 Model: Future Directions for Artificial Intelligence, Assessment Innovation, and Academic Integrity | 依摘要，跨國研究綜整涵蓋中小學與高教，未說各自比例，對象寫成一般教育者與決策者 | 現有 `STAGE_K12_GENERAL`、`ROLE_INSERVICE_TEACHER` |
| KB-2025-0210 | Toward a Coherent AI Literacy Pathway in Technology Education: Bibliometric Synthesis and Cross-Sectional Assessment | 文獻計量部分未限學段；另做的橫斷調查中，高職／中學技術科學生與職前教師約各半，方法不純屬回顧 | 現有 `STAGE_UPPER_SECONDARY`、`ROLE_STUDENT` |

可選處理：(a) 維持現狀；(b) 刪除既有學段與身分標記、改加 `REVIEW_INCLUDES_K12`；(c) 保留既有標記並另加 `REVIEW_INCLUDES_K12`。KB-2025-0210 另可考慮把方法改為混合方法。

### 判不出的 5 筆

| 紀錄 | 題名 | 原因 |
|---|---|---|
| KB-2023-0023 | Do we still need teachers? Navigating the paradigm shift of the teacher's role in the AI era | 摘要未提學段；開放取用全文（CC-BY）把學段列為編碼項，但正文未列學段分布 |
| KB-2025-0088 | Social-Emotional Learning and Generative AI: A Critical Literature Review and Framework for Teacher Education | 摘要未說所回顧文獻的學段；非開放取用 |
| KB-2025-0129 | Conceptualizing Perspectives of AI Literacies in Teaching About AI: A Systematic Review Approach | 沒有摘要（會議論文），題名未示學段 |
| KB-2026-0019 | AI literacy interventions in education: A meta-analysis of effects and moderators | 摘要只說各種教育情境，未提學段；OpenAlex 標開放取用但無可直接讀取的全文連結，未讀 |
| KB-2026-0231 | Mapping in-service teacher AI literacy: A systematic review of empirical studies | 沒有摘要，題名未示是否限中小學教師；非開放取用 |

這 5 筆維持既有標記。另，方法未標 `METHOD_REVIEW` 但實際是回顧的紀錄，本次未追查。

## 驗證

- `node research/validate-knowledge-base.js`：通過（重建索引後）。
- 依 `verify-and-deploy.yml` 的 verify 步驟在本機逐一跑過，全部通過。
