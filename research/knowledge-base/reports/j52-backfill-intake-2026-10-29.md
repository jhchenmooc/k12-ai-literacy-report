# J52 Behavioral Sciences 2025 年起回補 20 篇入庫（2026-10-29）

管理者 2026-10-29「照建議」（比照 J51 回補），依私人 repo 分支 `lit-session-j52-1029` 的 `from-literature-session/j52-backfill-1029/intake-j52-1029.csv` 入庫。文獻 session 範圍：OpenAlex S4210194710，2025-01-01～2026-10-29，AI 詞查詢 388 篇，預篩 157 篇逐篇看摘要，收 20 篇（A 12、B 8）；未收與待決 19 筆見私人 repo `screened-out.csv`。

- 紀錄：KB-2025-0500～0501、KB-2026-0464～0481（依首次公開日排序編號）；關聯 KR-15371～15479。逐筆見 [j52-backfill-intake-2026-10-29.csv](j52-backfill-intake-2026-10-29.csv)。
- 格式比照先前回補：K2、`discovered_unverified`；首發日依 Crossref published-online（MDPI 頁 403）；判讀依 OpenAlex 摘要（信心 high 13、medium 7）。
- **未連期刊代碼**：J52 已列監測清單（#398），但 `validate-knowledge-base.js` 只接受到 J50，依文獻 session 說明暫不加 `published_in`，不改驗證程式。
- **對象與學段**：學生研究只在學段明確時加 `ROLE_STUDENT`（學段只寫 K-12 的 2 篇不加）；校長研究標 `ROLE_OTHER_STAKEHOLDER`；中學未分標 `STAGE_SECONDARY`。
- **主題**：依題名關鍵字加 TOPIC_GENAI、TOPIC_ETHICS、TOPIC_TEACHER_PD、TOPIC_ASSESSMENT；未加研究方法代碼。
- **研究國別**：清單未逐筆寫明樣本地點，本批不標（英國 deepfake 一篇也因 `validate-knowledge-base.test.js` 寫死 GB 只有一筆而不標，見 `research/exceptions.md`）。
- **bs15030287 的更正 bs15030375**：管理者要求作 correction 關聯，但知識庫目前沒有可指向「不是紀錄的 DOI」的關聯方式（`object_namespace` 只接受 record、work、source、vocabulary），入庫 PR 先不加；管理者 2026-10-29 選甲後，驗證程式新增 `doi` 命名空間與 `has_correction`，以 KR-15480（KB-2025-0501 → 10.3390/bs15030375）補上。
- **職前教師與高教約 10 篇**未納入本次清單，是否回補另由管理者決定。
- 中文篇名：依規則凍結，論文篇名 11/03 後再議，本批未補。DOI 與既有紀錄無重複。
- **2026-10-30 補收 2 篇**（文獻 session a4f0d1a；管理者 2026-10-29 同意收錄校外情境青少年 AI 使用，理論建構 bs16081393 不收）：KB-2025-0502（10.3390/bs15081037，Snapchat My AI，青少年 303 人，A／S-BAS，中學未分）、KB-2025-0503（10.3390/bs15081142，義大利南部青少年 170 人與家長 175 人，A／S-BAS，中學未分，研究國別 IT）；關聯 KR-15482～15493。清單共 22 篇（A 14、B 8）。
