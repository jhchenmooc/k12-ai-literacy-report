# 教學代理人回補第三包 2 篇入庫（2026-10-23）

管理者 2026-10-23 在文獻搜尋 session 回覆「照建議」，並在編輯 session 要求依私人 repo 分支 `lit-session-pedagent-els1`（commit 30eb65c）入庫。清單：`from-literature-session/pedagent-backfill-1022/intake-pedagent-els1-include.csv`；判讀見 `ft-els1-results.jsonl`。全文為管理者提供，存私人 repo `ft-els1/`（9 篇、10 檔：6 個 PDF、4 個摘要或書目網頁）。至此回補 79 筆全部處理完畢（共收 16 篇）。

| 紀錄 | 出處 | 首次公開日（依據） | 範圍 | 對象 |
|---|---|---|---|---|
| KB-2026-0426 | Computers & Education（J01）10.1016/j.compedu.2026.105706 | 2026-06-27（PDF 首頁「Available online 27 June 2026」；Crossref 無上線日） | B（S-LRN） | 學生，高一（臺灣北部一所高中 53 人） |
| KB-2023-0225 | British Journal of Educational Technology（J04）10.1111/bjet.13399 | 2023-10-17（Crossref published-online） | B（S-LRN） | 其他教育關係人（家長；兒童為美國國小二年級 12 人），學段國小 |

- 格式比照 PR #362／#365：`discovered_unverified`、K2、published_in 監測期刊代碼；關聯 KR-14919～14932（另 KR-14933～14934 研究國別）。
- KB-2026-0426 樣本在臺灣北部一所高中（PDF p. 5），記 studies_country TW；KB-2023-0225 記 US（KR-14933～14934，第三次自檢補；只補全文明寫樣本地點者，同一回補案其餘 14 篇的研究國別列入 11/03 後待辦，見 `research/exceptions.md`）。KB-2026-0426 首發日 2026-06-27，不在週報或 10 月號月報的期別內；月報「以臺灣為樣本」一段依刊物項目的 taiwan_sample 產生，此筆只供知識庫查詢。
- 主題：KB-2026-0426 加 TOPIC_GENAI、TOPIC_STEM（生成式 AI 代理、物理模擬）；KB-2023-0225 不加。
- 文獻 session 判讀 9 筆，不收 7 筆：
  - 10.1016/j.compedu.2026.105744 設計框架（no_population）；ASEE 海報 10.18260/1-2--55892（no_population）；芬蘭博士論文 W7198508446（樣本為大學生、參與者未直接使用 AI，exclude_nonk12）。
  - 立陶宛文回顧 W7160799831（回顧未列各篇對象，still_unknown）；ijmlo 10.1504/ijmlo.2026.154846 與書籍章節 10.4324/9781003667414-5（只有摘要或書目、全文無法取得）。
  - W7219180506：主因是可信度存疑（期刊頁夾雜博弈垃圾連結、題名用詞錯置），且只有摘要、對象為職前教師。
- 中文篇名：文獻 session 請補 title_zh；依規則凍結，論文篇名 11/03 後再議，本批未補（同 #365、#367）。
- 逐筆依據：[pedagent-els1-intake-2026-10-23.csv](pedagent-els1-intake-2026-10-23.csv)。DOI 與既有紀錄無重複。
