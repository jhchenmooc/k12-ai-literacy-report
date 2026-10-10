# 學者觀點動向素材：2026-08-01～10-10（10 月月報用）

> **性質：月報「學者觀點動向」的工作紀錄，不是刊物。** 依[學者追蹤運用規格](../scholar-watch-usage-spec.md)第 3 項，彙整清單學者近三個月新作，找出反覆出現的論點。同一模型檢索、歸納與自檢，不算獨立審閱。repo 公開，本紀錄只存書目與一句中文概述，不存摘要全文。

## 方法

- **學者**：[學者清單](../scholar-watchlist.md)中有 OpenAlex 作者 ID 的 A1、A2、A3、A4、B、H、V 級學者，共 91 位（106 個作者 ID）。附錄待確認名單與 C 級政策窗口不查。
- **檢索**：OpenAlex `authorships.author.id` 篩選，出版日 2026-08-01～2026-10-10，每 25 個作者 ID 一批；請求紀錄見 [works.json](works.json) 的 `query_runs`。共取得 168 篇（含預印本）。
- **初篩**：題名或摘要同時提到 AI（AI、generative、LLM、ChatGPT、chatbot、agentic、machine learning 等）與教育（education、learning、teach、student、school 等）者，排除勘誤等非論文，留下 76 篇，清單見 [works.json](works.json)。
- **研究群獨立性**：另查 2022 年以來清單學者之間的合著篇數（同見 works.json 的 `coauthorship_2022_2026`）。本紀錄採**兩兩判斷**：同一論點的兩筆依據，若雙方的清單學者彼此在 2022 年後有任何合著，就算同一個聲音；完全沒有合著才算不同研究群。
- **限制**：OpenAlex 日期是索引日期，正式寫入月報前要回出版者頁核首次公開日；作者 ID 可能漏收分裂檔案；初篩用關鍵詞，可能漏掉未用這些詞的論文。

## 候選論點（每項至少兩個獨立研究群）

### 論點一：AI 素養與 AI 相關信念的測量，從自評走向能力測驗與分領域量表

| 學者 | 作品（日期） | 一句概述 | 對象 |
|---|---|---|---|
| H25 Lintner | TAIL: A Test of AI Literacy for Adolescents and Teachers（2026-09-29，預印本）<br>doi:10.31234/osf.io/afuq2_v1 | 指出多數 AI 素養工具只問自覺能力，改用選擇題測驗，並以捷克中學生與教師驗證 | k12 |
| H09 Laupichler | The B-AIMT（出版者頁 Published 2026-09-28；citation_online_date 2026-08-31 為接受日，2026-10-10 更正；候選 A11）<br>doi:10.3389/feduc.2026.1885959 | 發展並驗證德國數學教師對 AI 教學信念的分領域量表 | k12（含師培生） |
| ~~H18 Carolus~~ | ~~AI Mindset~~ doi:10.1016/j.chbah.2026.100402（候選 A12） | **不計入**：#171 查到 PsyArXiv 預印本 2026-06-02 已公開，早於近三個月範圍 | other_stakeholders |
| V12 ElSayary | Bridging the Gap（2026-09-07）<br>doi:10.1002/jcal.70327 | 以自評 AI 素養探討大學生與就業能力的關聯 | higher_ed |

- **獨立性**：H25、H09、V12 彼此在 2022 年後沒有合著，算三個研究群（H18 因首次公開日早於範圍而不計）。
- **適合度**：直接談 AI 素養，對象以 K-12 師生為主，最貼近本刊範圍。**管理者 2026-10-10 決定：10 月月報採用此項。**

### 論點二：生成式 AI 下的評量重構，從「偵測」轉向「讓學習過程可見」

| 學者 | 作品（日期） | 一句概述 | 對象 |
|---|---|---|---|
| S20 黃龍翔 | Reconfiguring Assessment in the Age of AI（2026-08-03，預印本）<br>doi:10.35542/osf.io/59ryn_v1 | 不把 AI 使用當偵測問題，以「後設任務覺察」讓學習在與 AI 互動中可見 | teacher_ed |
| V05 Oyelere | Scaffolded AI-Verification（2026-08-10）<br>doi:10.1145/3765964.3811644 | 奈及利亞資訊系訪談指出「偵測陷阱」，提出鷹架式 AI 查驗評量模式 | higher_ed |
| H11 Chiu、H27 Hällström | The shifting landscape of assessment in STEM education in the age of generative AI（2026-09-28）<br>doi:10.1186/s40594-026-00648-5 | 以評量三角回顧 GenAI 對評量內容、證據蒐集與推論的影響 | 一般 |
| H26 Stolpe | Teachers' Navigation of Assessing Written Work in Times of Generative AI（2026-10-01）<br>doi:10.33422/ejte.v8i3.1872 | 瑞典中學教師把評量視為重新協商「什麼算知識」的核心實務 | k12 |

- **獨立性**：H26 與 H27 有合著，兩篇只算一個聲音；S20、V05、H11／H27（或 H26）、另加 V12〈GenAI in Assessment〉（doi:10.1002/jcal.70304）彼此無合著，至少三個研究群。

### 論點三：使用 AI 的方式（後設認知、自我調節）決定「表現提升」是否轉成學習

| 學者 | 作品（日期） | 一句概述 | 對象 |
|---|---|---|---|
| S03、S06、S07、S08 | A Metacognitive Approach to Learning and Performance in Human-AI Interaction（2026-08-02，預印本）<br>doi:10.31234/osf.io/s7dvk_v2 | 提出後設認知卸載／承接與 SYNC 模型，說明表現與學習何時脫鉤 | 一般 |
| S02 Gašević | Building AI companions that prioritise learning over performance（2026-09-18）<br>doi:10.1016/j.caeai.2026.100680；Agentivism（2026-09-22）doi:10.1016/j.caeai.2026.100684 | 「學習—表現悖論」與以 AI 協助下的能力轉化為核心的學習理論 | 一般 |
| V09 Valtonen | Self-regulated approaches to students' generative AI use in higher education（2026-09-29）<br>doi:10.1016/j.chbr.2026.101340 | 891 名大學生的 AI 使用分為工具型、構想型、反思型，與表現的關聯不同 | higher_ed |
| S20 黃龍翔 | 同論點二 | 學習者在 AI 協作中調節任務目標與知識責任 | teacher_ed |

- **獨立性**：S02、S03、S06、S07、S08 互有合著，算一個聲音（Gašević 群）；V09、S20 與該群及彼此都無合著，共三個研究群。
- **注意**：依據以大學與一般論述為主，K-12 證據少；寫入時要標明對象。

### 論點四：超越功能性 AI 素養，重視倫理與教學判斷的推理

| 學者 | 作品（日期） | 一句概述 | 對象 |
|---|---|---|---|
| S04、S10、S11 | Understanding AI Mechanisms Supports Disciplinary Reasoning and Ethical Judgment in K–12 AI Literacy Education（2026-09-30）<br>doi:10.15388/infedu.2601.025 | 學生以 AI 概念解釋機制並延伸到倫理思辨，主張 AI 素養不止於功能理解 | k12 |
| H30 Çelik | Beyond AI Literacy（2026-08-22）<br>doi:10.1177/07356331261479569 | 芬蘭師培生面對 GenAI 情境的教學與倫理推理，深層反思較少 | teacher_ed |

- **獨立性**：兩群無合著，剛好兩個研究群，達最低門檻。

## 研究群代碼建議（待管理者決定）

依 2022 年以來合著篇數，下列學者合著密集（任兩人合著 5 篇以上，連成一群），已在學者清單第 0 節登記共用代碼（管理者 2026-10-10 同意）：

| 建議代碼 | 成員 | 依據（2022 年後合著篇數，舉例） |
|---|---|---|
| `G-GASEVIC` | S01、S02、S03、S06、S07、S08、S13、S14、V26 | S02–S06 76、S02–S07 52、S02–S03 23、S02–S14 21、S13–V26 18、S02–S13 6、S01–S13 5 |
| `G-GENAI-FI` | S04、S10、S11、V09 | S04–S10 58、S04–S11 42、S10–S11 44、S04–V09 15 |
| `G-CHIU` | H11、V06、V15、V22 | H11–V06 25、H11–V15 20、H11–V22 12 |
| `G-LAUPICHLER` | H09、H10 | 21 |
| `G-BEWERSDORFF` | H28、H29、V21 | H29–V21 9、H28–H29 6 |
| `G-KONG` | H21、V17 | 7 |

合著 1～4 篇者不併群，但在個別論點中仍依上面的「兩兩判斷」處理，有任何合著就不算獨立。

## 下一步

1. ~~管理者選定論點並確認研究群代碼~~：2026-10-10 決定採論點一，研究群代碼已登記。
2. 被選論點的每筆依據：回出版者頁核首次公開日、存原文短摘錄快照、寫歸屬 claim（`author_opinion` 或 `research_finding`，`section: "trends"` 或已在 `scholars` 者直接引用），兩輪交叉核對。
3. 歸納句寫成 `editorial_analysis`，只寫「哪些研究群在哪些論文中談到某概念」，不寫成效、因果或建議；以 `supporting_claim_ids` 綁定上述依據。
4. 10/29 前補查 10/11～10/29 的新作，更新本紀錄。
