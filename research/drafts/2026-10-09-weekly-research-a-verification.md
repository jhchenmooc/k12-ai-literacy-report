# 2026-10-09 週報學術候選查證（A 組三筆）

> **性質：首發與學段初篩紀錄，不是出版核准。** 依 [首發查核表](../first-disclosure-checklist-v16.md) 只做「資料身分、日期、學段、較早版本」四項；未做逐句原文核對、中文主張或 G2–G4。查證者為 Claude（同一 session），不算獨立審閱。來源：[A 組搜尋](../p0-tool-wave-2026-10-09/group-a.md)。查證時間 2026-10-09 16:46–16:52 UTC。

| 候選 | 首次公開日證據 | 學段證據 | 判定 |
|---|---|---|---|
| T&F *Technology, Pedagogy and Education* `10.1080/1475939x.2026.2739390`「Trending use of GenAI tools in K–12 school settings」 | Crossref 出版社存入的 assertion `published` = **2026-10-08**、`published-online` 2026-10-08、CC BY-NC-ND 授權起始 2026-10-08；DOI 登記 2026-10-09T05:21Z（登記晚於上線）。T&F 頁 403、Semantic Scholar 404 | 僅題名（無摘要可讀） | **排除出本期**：早於 10/09 窗口；可作背景 |
| *Journal of Learning and Teaching in Digital Age* `10.53850/joltida.1893531`「Exploring Vocational School Students' Conceptualizations of AI Through Metaphors」 | DergiPark 頁 Publication Date 2026-10-09（在窗口內） | 正文 Study Group：198 名「students enrolled in the vocational school of a state university」，一、二年級 | **排除**：高教（大學附設職業學院），非 K–12 |
| *BMC Psychology* `10.1186/s40359-026-05721-w`「Latent profiles of AI teaching self-efficacy … vocational education teachers in China」 | 出版社頁「Published: 09 October 2026」、`citation_online_date` 2026/10/09；頁面註明為提前分享的接受稿，將由正式版取代。Crossref 同題名查詢 1 次未見較早預印本（非窮盡） | 摘要 Methods：768 名在職教師，**378 名中職**、390 名高職院校 | **列入候選 W2026-10-09-A10，hold** |

## A10 hold 的理由與限制

- 學段混合：只有 378／768 屬中學階段（中職），不能寫成 K–12 教師整體結論。
- 橫斷面相關研究；摘要中的 Cohen's d（0.39–2.06）、B 值屬高風險數字，待 G2–G4，不得作因果解讀。
- 接受稿版本，正式版尚未發布；主題為教師 AI 教學自我效能與職業幸福感，不是 AI 素養課程或政策。
- 已以既有 `ingest-candidates.js` 匯入（batch `2026-10-09-tool-wave-a-1`），自動 `decision=hold`、`source_checked=false`；知識庫對應紀錄 KB-2026-0051（`discovered_unverified`，依候選慣例首發日留空）。

## 其他

- 同批另有 `jmetp.v3i7.1312`（中小學教師 AI 素養指標），出版社頁 Published 2026-10-08，早於窗口，只作背景，未列候選。
- 預印本：查詢當下 10/09 送件尚未 announce，需 2026-10-10 00:00 UTC 之後重查。

## A10 G1／G2 原文核對（2026-10-09 17:05–17:10 UTC）

讀取來源：出版社提供的接受稿 PDF（`link.springer.com/content/pdf/10.1186/s40359-026-05721-w_reference.pdf`，23 頁，頁尾標「Article in Press」）。網頁版目前只有摘要，正文僅見於此 PDF。核對者為 Claude（同一 session），不算獨立審閱；**`source_checked` 維持 `false`**，是否升級由管理者決定。

| 項目（G1／G2） | 原文所見 | 位置 |
|---|---|---|
| 題名／作者／期刊 | 與 Crossref、出版社頁一致；作者 Jiamiao Hu、Sheng Zhou | 首頁、出版社頁 |
| 版本 | 接受稿提前分享，將由正式版取代 | 出版社頁說明、PDF 頁尾 |
| 設計 | 橫斷面、自填線上問卷；區域分層＋合作學校便利抽樣（東、中、西部） | Methods › Participants and procedure |
| 對象 | 中國大陸全職在職教師：中職（SVS）與高職院校（HVC） | 同上 |
| 回收與分析人數 | 回收 812 份，依預設清理規則保留 768 份（94.6%）；SVS 378（49.2%）、HVC 390 | 同上（valid responses 段） |
| 工具 | TAICS（教師 AI 能力自我效能，六向度）、AI 焦慮量表（教學情境改編）、TSWQ（職業幸福感）；未有中文版者做前後翻譯與 32 名教師認知前測 | Methods › Measures |
| 學段相關結果 | TAICS 在 SVS／HVC 間達完全純量不變性；R3STEP 中 HVC 教師較 SVS 教師**較不可能**屬於部分較發展的剖面（OR 約 0.30）。剖面比例與幸福感結果**未分學段報告** | Table 2 Panel C；Table 5 |
| 作者自陳限制 | 橫斷面＋自陳，關係為同時而非因果；共同方法變異無法排除；部分交互作用結果依模型設定而定，應視為暫定 | Discussion › limitations 段 |
| 倫理 | 金華職業技術大學 IRB（JHUT-IRB-2025-0253），電子知情同意 | Ethics declarations |

**對週報的意義**：若要寫，只能是「中國職業教育教師 AI 教學自我效能剖面研究」的描述性短訊。可寫：樣本與學段組成、四種剖面、相關而非因果。不可寫：K–12 教師整體結論、任何因果或介入效果、未分學段的比例套用到中職。主要數字（剖面比例、OR、Cohen's d）屬 G3 範圍，尚未逐表核對，維持高風險、hold。
