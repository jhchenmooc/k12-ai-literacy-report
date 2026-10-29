# Smart Learning Environments 回補 11 篇與每日短訊觀察項 3 篇入庫（2026-10-25）

管理者 2026-10-25 在文獻搜尋 session 回覆「照建議」，並在編輯 session 要求依私人 repo 分支 `lit-session-sle-1025` 入庫：`from-literature-session/obs-1025/intake-obs-1025.csv`（3 篇）與 `from-literature-session/sle-backfill-1025/intake-sle-1025.csv`（11 篇）。出版者頁存檔與管理者提供的全文都在私人 repo（`obs-1025/`、`sle-backfill-1025/pages/`、`uploads/`）。

| 紀錄 | 出處 | 首次公開日 | 範圍 | 對象與學段 | 研究國別 |
|---|---|---|---|---|---|
| KB-2026-0433 | Smart Learning Environments 10.1186/s40561-026-00464-y | 2026-10-24 | A（S-ETH、S-BAS） | 學生，國中（7 年級 47 人） | SE |
| KB-2026-0434 | Language Circle 10.15294/lc.v21i2.58110 | 2026-10-21 | B（S-LRN） | 學生，高中（10 年級 37 人） | ID |
| KB-2026-0435 | Médiations et médiatisations 10.52358/mm.vi24.529 | 2026-10-24 | A（S-ETH） | 學生，高中（不使用生成式 AI 者 153 人） | FR |
| KB-2025-0496 | SLE 10.1186/s40561-025-00385-2 | 2025-05-08 | B（S-LRN） | 學生，國中（9–10 年級 106 人） | DE |
| KB-2025-0497 | SLE 10.1186/s40561-025-00419-9 | 2025-12-01 | B（S-LRN） | 學生，國小（5 年級 52 人） | — |
| KB-2025-0498 | SLE 10.1186/s40561-025-00413-1 | 2025-09-03 | A（T-PD、S-BAS） | 在職教師，國中 | US |
| KB-2026-0436 | SLE 10.1186/s40561-026-00442-4 | 2026-02-13 | A（T-PD） | 在職教師，K12 未細分（532 人） | DE、DK |
| KB-2026-0437 | SLE 10.1186/s40561-026-00433-5 | 2026-01-21 | A（T-BAS） | 在職教師，K12 未細分（270 人；學段依任教科目推定，信心 medium） | IL |
| KB-2026-0438 | SLE 10.1186/s40561-026-00430-8 | 2026-01-13 | A（T-TEA） | 在職教師，K12 未細分（244 人，融合教育） | AE |
| KB-2026-0439 | SLE 10.1186/s40561-026-00461-1 | 2026-08-12 | A（T-TEA） | 在職教師，K12 跨學段（回顧 29 篇 K-12 研究） | — |
| KB-2026-0440 | SLE 10.1186/s40561-026-00465-x | 2026-09-24 | B（T-TEA、S-LRN） | 在職教師，國小（19 班、學生 320 人） | —（巴西，見下） |
| KB-2026-0441 | SLE 10.1186/s40561-026-00472-y | 2026-10-01 | B（S-LRN） | 學生，國小（親子 25 組，校外非正式學習） | — |
| KB-2025-0499 | SLE 10.1186/s40561-025-00422-0 | 2025-11-25 | A（T-BAS） | 職前師資生（TEACHER_ED），K12 跨學段（254 人，信心 medium） | AT |
| KB-2026-0442 | Médiations et médiatisations 10.52358/mm.vi25.576 | 2026-08-28 | A（S-BAS、S-ETH） | K12 跨學段（概念論文，信心 low；2026-10-25 依接受稿全文改） | — |

- 格式比照先前入庫：`discovered_unverified`、K2；關聯 KR-15112～15211（100 列）。首次公開日依出版者頁「Published」與 Crossref published-online（兩者同日）；MM 兩篇依 Crossref published-online。
- **未連期刊代碼**：Smart Learning Environments 已列入監測清單 J51（2026-10-25），但 `validate-knowledge-base.js` 目前只接受到 J50，依文獻 session 說明暫不加 `published_in`，不改驗證程式。Language Circle 與 Médiations et médiatisations 不在監測清單，同樣不加。
- **對象與學段**：依知識庫規則，學生研究只在主要學段明確時加 `ROLE_STUDENT`，所以 KB-2026-0442（K-12 概念論文）不加 ROLE_STUDENT；教師研究照常標在職教師；職前師資生用 `TEACHER_ED`。
- **主題**：依題名與摘要加 TOPIC_GENAI、TOPIC_ETHICS、TOPIC_LANGUAGE、TOPIC_STEM、TOPIC_CURRICULUM、TOPIC_TEACHER_PD、TOPIC_EQUITY（逐筆見 .csv）；未加研究方法代碼。
- **研究國別**：只標文獻 session 依摘要或全文明寫樣本地點者（9 筆）；KB-2025-0497、KB-2026-0441 的清單未寫地點，回顧與概念論文不標。KB-2026-0440 樣本在巴西，但 `validate-knowledge-base.test.js` 寫死「研究國別 BR 只有 KB-2025-0002」，加上會使測試失敗；依「不得為通過而修改測試」不加，列入 `research/exceptions.md` 11/03 後待辦。
- **00433-5 的更正**（10.1186/s40561-026-00441-5，2026-02-14）：文獻 session 請作 correction 關聯、不另立研究紀錄；但知識庫目前沒有對應更正的關聯類型（只有 revises、supplements、reviews，且客體須為紀錄），所以入庫時只在本報告記錄。2026-10-29 管理者選甲，驗證程式新增 `doi` 命名空間與 `has_correction` 後，以 KR-15481（KB-2026-0437 → 10.1186/s40561-026-00441-5）補上。
- **KB-2026-0442 後續（2026-10-25）**：管理者提供接受稿全文（私人 repo `from-literature-session/uploads/10d5fc2a-mm-vi25-576-accepted-manuscript.pdf`），文獻 session 讀全文後判讀維持 A（low）、學段改 k12_multi；本筆改為 `bibliographic_checked`（紀錄與 6 列關聯），學段 KR-15207 改 STAGE_K12_MULTI。依知識庫規則，學生研究只在主要學段為特定學段時加 `ROLE_STUDENT`，本筆仍不加。
- **待確認**：KB-2025-0496 文獻 session 判 B，註明若「有效使用生成式 AI」屬 S-BAS 可改 A，本次照 B 入庫。
- **中文篇名**：文獻 session 請補 title_zh；依規則凍結，論文篇名 11/03 後再議，本批未補。
- 同分支另含 J41 caeo 2026.100428 pre-proof（`uploads/`，供每日短訊）與每日短訊 10/24 存入的 3 個 PDF，隨私人 repo 合併一併收錄，不涉本次入庫。
- 文獻 session 篩選：SLE 2025-01-01～2026-10-25 共 118 篇，預篩 23 篇，排除與已處理 15 篇（見私人 repo `screened-out.csv`）。DOI 與既有紀錄無重複。
- 逐筆依據：[sle-obs-intake-2026-10-25.csv](sle-obs-intake-2026-10-25.csv)。
