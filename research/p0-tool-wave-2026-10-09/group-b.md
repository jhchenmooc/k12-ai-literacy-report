# P0 平行搜尋 B 組：J31／J35／J36／J37／J38（2026-10-09）

> 暫存結果，**未入庫**。同一模型搜尋與核對，非獨立認證。範圍 2025-01-01～2026-10-09（OpenAlex `publication_date`），不是完整系統性回顧，也不是出版社全量。

- UTC：2026-10-09T16:11:43Z 開始；2026-10-09T16:15:47Z 結束。
- 方法：照 [J01–J03 試跑](../tool-trial-2026-10-09/report.md)。ISSN→OpenAlex source ID；q1（AI literacy/AI education × K-12 學段詞）、q2b（generative AI/ChatGPT/LLM × 學段 × literacy/competency/curriculum/teacher）；缺摘要多的 J35/J37/J38 加 q3（`title.search` AI 詞，限 `has_abstract:false`）；另五來源皆加補充 q4（AI 詞 × children/adolescents/youth/pupils/school 等）。完整查詢 URL 見 `group-b.json`。

## 來源

| 代號 | 期刊 | OpenAlex ID | 範圍內有摘要 | 無摘要 |
|---|---|---|---|---|
| J31 | International Journal of STEM Education | `S2738571837` | 129 | 1 |
| J35 | International Journal of Child-Computer Interaction | `S2493636226` | 49 | 37 |
| J36 | Journal of Educational Computing Research | `S127795871` | 140 | 2 |
| J37 | Journal of Science Education and Technology | `S158654976` | 70 | 93 |
| J38 | Educational Psychology Review | `S187318745` | 161 | 85 |

## 查詢紀錄（成功與失敗）

| 查詢 | 來源 | UTC | HTTP | OpenAlex count | 讀取（題名初篩） | 狀態 |
|---|---|---|---|---|---|---|
| J31-q1-attempt1 | J31 | 16:12:03Z–16:12:04Z | 400 | — | 0 | failed: 本組腳本 select 欄位錯誤（has_abstract 不是合法 select 欄位），已修正重跑 |
| J31-q2b-attempt1 | J31 | 16:12:04Z–16:12:05Z | 400 | — | 0 | failed: 本組腳本 select 欄位錯誤（has_abstract 不是合法 select 欄位），已修正重跑 |
| J35-q1-attempt1 | J35 | 16:12:05Z–16:12:06Z | 400 | — | 0 | failed: 本組腳本 select 欄位錯誤（has_abstract 不是合法 select 欄位），已修正重跑 |
| J35-q2b-attempt1 | J35 | 16:12:06Z–16:12:07Z | 400 | — | 0 | failed: 本組腳本 select 欄位錯誤（has_abstract 不是合法 select 欄位），已修正重跑 |
| J36-q1-attempt1 | J36 | 16:12:07Z–16:12:08Z | 400 | — | 0 | failed: 本組腳本 select 欄位錯誤（has_abstract 不是合法 select 欄位），已修正重跑 |
| J36-q2b-attempt1 | J36 | 16:12:08Z–16:12:09Z | 400 | — | 0 | failed: 本組腳本 select 欄位錯誤（has_abstract 不是合法 select 欄位），已修正重跑 |
| J37-q1-attempt1 | J37 | 16:12:09Z–16:12:09Z | 400 | — | 0 | failed: 本組腳本 select 欄位錯誤（has_abstract 不是合法 select 欄位），已修正重跑 |
| J37-q2b-attempt1 | J37 | 16:12:09Z–16:12:10Z | 429 | — | 0 | failed: HTTP 429，已重跑 |
| J38-q1-attempt1 | J38 | 16:12:10Z–16:12:11Z | 400 | — | 0 | failed: 本組腳本 select 欄位錯誤（has_abstract 不是合法 select 欄位），已修正重跑 |
| J38-q2b-attempt1 | J38 | 16:12:11Z–16:12:12Z | 400 | — | 0 | failed: 本組腳本 select 欄位錯誤（has_abstract 不是合法 select 欄位），已修正重跑 |
| J35-q3-attempt1 | J35 | 16:12:12Z–16:12:13Z | 400 | — | 0 | failed: 本組腳本 select 欄位錯誤（has_abstract 不是合法 select 欄位），已修正重跑 |
| J37-q3-attempt1 | J37 | 16:12:13Z–16:12:14Z | 400 | — | 0 | failed: 本組腳本 select 欄位錯誤（has_abstract 不是合法 select 欄位），已修正重跑 |
| J38-q3-attempt1 | J38 | 16:12:14Z–16:12:15Z | 400 | — | 0 | failed: 本組腳本 select 欄位錯誤（has_abstract 不是合法 select 欄位），已修正重跑 |
| J31-q1 | J31 | 16:12:24Z–16:12:24Z | 200 | 3 | 3 | items_screened |
| J31-q2b | J31 | 16:12:26Z–16:12:27Z | 200 | 2 | 2 | items_screened |
| J35-q1 | J35 | 16:12:28Z–16:12:29Z | 200 | 0 | 0 | items_screened |
| J35-q2b | J35 | 16:12:31Z–16:12:40Z | 504 | — | 0 | failed: HTTP 504 逾時；見 J35-q2b-retry |
| J36-q1 | J36 | 16:12:42Z–16:12:45Z | 200 | 1 | 1 | items_screened |
| J36-q2b | J36 | 16:12:47Z–16:12:47Z | 200 | 2 | 2 | items_screened |
| J37-q1 | J37 | 16:12:49Z–16:12:50Z | 200 | 2 | 2 | items_screened |
| J37-q2b | J37 | 16:12:51Z–16:12:52Z | 200 | 6 | 6 | items_screened |
| J38-q1 | J38 | 16:12:54Z–16:12:55Z | 200 | 0 | 0 | items_screened |
| J38-q2b | J38 | 16:12:56Z–16:12:57Z | 200 | 1 | 1 | items_screened |
| J35-q3 | J35 | 16:12:59Z–16:12:59Z | 200 | 2 | 2 | items_screened |
| J37-q3 | J37 | 16:13:01Z–16:13:02Z | 200 | 15 | 15 | items_screened |
| J38-q3 | J38 | 16:13:03Z–16:13:04Z | 200 | 8 | 8 | items_screened |
| J35-q2b-retry | J35 | 16:13:17Z–16:13:18Z | 200 | 0 | 0 | items_screened |
| J31-q4 | J31 | 16:13:20Z–16:13:21Z | 200 | 8 | 8 | items_screened |
| J35-q4 | J35 | 16:13:23Z–16:13:24Z | 200 | 1 | 1 | items_screened |
| J36-q4 | J36 | 16:13:26Z–16:13:27Z | 200 | 12 | 12 | items_screened |
| J37-q4 | J37 | 16:13:29Z–16:13:30Z | 200 | 9 | 9 | items_screened |
| J38-q4 | J38 | 16:13:32Z–16:13:32Z | 200 | 3 | 3 | items_screened |

失敗查詢不記零命中；第一輪 400 為本組腳本錯誤（非法 select 欄位），已修正重跑。

## 候選與待判

| 決定 | 來源 | DOI | 題名 | 學段 | 國別 | 建議類別 | Crossref 卷期 | Crossref online | verify_bibtex | 理由 |
|---|---|---|---|---|---|---|---|---|---|---|
| candidate | J31 | 10.1186/s40594-025-00543-5 | Study of an effective machine learning-integrated science curriculum for high school youth in an informal learning setting | 高中（high school youth；博物館非正式學習情境） | — | K4 | vol 12(1), 23; 無 published-print; issued 2025-04-19 | 2025-04-19 | verified | 摘要明示高中青少年、ML 整合科學課程並提 AI literacy；國別摘要未明寫（僅提 AMNH），不記；成效數字為高風險，待 G2–G4，不作因果判斷 |
| candidate | J31 | 10.1186/s40594-026-00604-3 | Enact-Examine-Extract (E3): an epistemic tool to scaffold upper elementary students’ conceptual and epistemic understanding of artificial intelligence | 小學五年級 | HK | K4 | vol 13(1), 17; 無 published-print; issued 2026-03-16 | 2026-03-16 | verified | 摘要明示 Grade 5、香港、學習 AI 機制與限制 |
| candidate | J31 | 10.1186/s40594-026-00629-8 | STEAM education for AI literacy: a systematic literature review | K-12（多為初中、高中） | — | K2 | vol 13(1), 46; 無 published-print; issued 2026-06-29 | 2026-06-29 | verified | 摘要明示 K-12、AI 作為內容之 AI literacy 回顧 |
| candidate | J31 | 10.1186/s40594-026-00637-8 | Navigating AI in STEM: what secondary students actually do with generative AI-driven tools | 中學（secondary，商業導向中學） | CZ | K5 | vol 13(1), 36; 無 published-print; issued 2026-07-17 | 2026-07-17 | verified | 摘要明示 secondary students、捷克；涉及機構規範／禁止與隱性使用，屬 K-12 生成式 AI 治理面；非 AI 素養教學，類別待整合者確認 |
| candidate | J36 | 10.1177/07356331251360442 | Constructionism in K-12 AI Literacy Education: A Systematic Review of Pedagogical Designs, Student Outcomes, and Learning Mechanisms | K-12 | — | K2 | vol 63(7-8), 1748-1781; published-print 2025-12; issued 2025-07-18 | 2025-07-18 | verified | 摘要明示 K-12 AI literacy education |
| candidate | J36 | 10.1177/07356331261487830 | Measuring Secondary School Students’ Verification Capability in GenAI-Supported Learning: Development and Application of the α − v − M Framework | 中學（secondary school students） | — | K3 | 尚無卷期（online first）; 無 published-print; issued 2026-09-16 | 2026-09-16 | verified | 摘要明示 422 名中學生；查證 GenAI 輸出屬批判性 AI 使用能力；屬 AI 素養延伸，待整合者確認是否符「學習關於 AI」；成效數字為高風險，待 G2–G4，不作因果判斷 |
| candidate | J37 | 10.1007/s10956-026-10302-y | Science Educators’ Attitudes and Perspectives on Artificial Intelligence (SEAP-AI) Scale | K-12 科學教師 | US | K4 | vol 35(4), 1102-1115; published-print 2026-08; issued 2026-03-17 | 2026-03-17 | verified | 摘要明示 853 名 K-12 科學教師（Missouri、Texas）；屬教師 AI 能力／觀點，非直接「教 AI」能力，類別待確認 |
| pending | J35 | 10.1016/j.ijcci.2026.100815 | “When AI generates ideas for you, that kind of defeats the purpose”: An exploration of teens’ uses and concerns about AI | 青少年（teens；學校學段未知） | — | K5 | vol 48, 100815; published-print 2026-06; issued 2026-06 | none | verified | OpenAlex 與 Crossref 均無摘要；題名切題（青少年對 AI 的擔憂）但學段與情境未明，需讀出版社頁 |
| pending | J37 | 10.1007/s10956-025-10280-7 | Physics Teachers’ Insights into the Usability and Challenges of a Platform with Integrated Simulations and Generative AI | 物理教師（學段不明） | — | K4 | vol 35(3), 776-794; published-print 2026-06; issued 2025-11-26 | 2025-11-26 | verified | 無摘要；學段不明，題名偏工具可用性，可能排除；與 10359-9 同作者群可能相關 |
| pending | J37 | 10.1007/s10956-026-10359-9 | Situated AI Literacy Change Through GenAI-Supported Simulation in Secondary Physics: Field Evidence from Curriculum-Integrated Inquiry | 中學物理（僅題名） | — | K4 | 尚無卷期（online first）; 無 published-print; issued 2026-09-17 | 2026-09-17 | verified | OpenAlex 與 Crossref 均無摘要；題名明示 AI Literacy 與 Secondary Physics，但硬規則要求摘要明示，待讀出版社頁；與 10.1007/s10956-025-10280-7 同作者群 |

`first_public_date` 一律 unknown。所有候選 DOI 對 `known_dois.txt` 與 repo 既有 DOI 字串去重：0 重複。

## 每來源統計

| 來源 | 成功查詢 | 不重複命中 | 細讀摘要 | 候選 | 待判 | 重複 | 排除 |
|---|---|---|---|---|---|---|---|
| J31 | 3 | 8 | 7（含無摘要者只看題名＋Crossref） | 4 | 0 | 0 | 4 |
| J35 | 4 | 3 | 3（含無摘要者只看題名＋Crossref） | 0 | 1 | 0 | 2 |
| J36 | 3 | 12 | 5（含無摘要者只看題名＋Crossref） | 2 | 0 | 0 | 10 |
| J37 | 4 | 23 | 6（含無摘要者只看題名＋Crossref） | 1 | 2 | 0 | 20 |
| J38 | 4 | 10 | 1（含無摘要者只看題名＋Crossref） | 0 | 0 | 0 | 10 |

排除共 46 篇：讀摘要後排除 13 篇（主因 AI 只作學習／評量工具、學段混合）；題名排除 33 篇（AI 作工具、高教樣本、跨學段後設分析）。逐篇理由見 JSON。

## 限制

- J35 有 37/86、J37 有 93/163、J38 有 85/246 篇在 OpenAlex 無摘要；q1/q2b/q4 對這些作品實際只比對題名，已加 q3 title-only（has_abstract:false）補，但題名未提 AI 者仍會漏。
- J35（IJCCI）在範圍內 OpenAlex 僅 86 篇，q1、q2b 皆 0 命中；兒童 HCI 論文常用 children/kids 而非學段詞，主查詢學段詞對此刊不敏感，已加補充查詢 q4（AI 詞 × children/adolescents/school 等），仍可能漏查。OpenAlex 對該刊收錄完整度未核。
- 補充查詢 q4（五來源皆跑）超出原定兩組，屬本組追加；未使用萬用字元。
- 第一輪 13 次查詢因本組腳本 select 欄位錯誤（has_abstract 非合法 select 欄位）回 HTTP 400，另 J37-q2b 首次回 429（OpenAlex 對 >5 布林運算子限速）；J35-q2b 第二輪回 504，已重跑（J35-q2b-retry, count=0）。失敗查詢不記零命中。
- first_public_date 一律 unknown：OpenAlex publication_date 與 Crossref issued／published-online 均非已證首發日；Springer／SAGE DOI 在 Crossref 有 published-online（Elsevier IJCCI 無），只記錄不升格。
- 未讀出版社頁或全文；學段、國別、方法只依 OpenAlex 摘要。成效數字（如 d 值、量表效度）標高風險，待 G2–G4。
- verify_bibtex（本機 Research Desk）只核 DOI↔題名↔作者↔年份，10 筆全 verified；不核日期、版本、學段或內容。作者只取 Crossref 前三位。
- 去重只比對 known_dois.txt（230 筆）與 repo 內 DOI 字串，0 重複；同題名不同 DOI 未自動合併。10359-9 與 10280-7 同作者群，可能為相關作品，未合併。
- 每來源細讀摘要上限約 15 篇；實際細讀 22 篇（J31 7、J35 3、J36 5、J37 6、J38 1），其餘 34 篇只看題名。這不是完整系統性回顧，非出版社全量。
