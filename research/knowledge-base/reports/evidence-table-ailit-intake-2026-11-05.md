# 證據對照表補充文獻入庫：AI 素養 10 篇（2026-11-05）

- **來由**：管理者的〈AI素養多元學習方式可行性分析〉證據對照表（2026-11-05）引用了 88 個 DOI，其中只有 11 個已在知識庫。管理者 2026-11-05「依照建議」：只收範圍判 A 的 10 篇；判 C 的 9 篇（運算思維的不插電研究與 PRIMM）和範圍不明的 1 篇不入庫（理由見下）。
- **紀錄**：KB-2017-0001、KB-2018-0001、KB-2019-0001、KB-2020-0002～0003、KB-2021-0003～0006、KB-2022-0119。各年份依首發日排序編號，日期不明者排在最後。關聯 KR-15987～KR-16064，共 78 筆。逐筆見 [evidence-table-ailit-intake-2026-11-05.csv](evidence-table-ailit-intake-2026-11-05.csv)。
- **書目核對**：題名、年份、出處、文獻類型以 Crossref 與 OpenAlex 兩方對照，全部一致；題名照 Crossref 登記原樣保存。三篇 ACM 會議論文（KB-2017-0001、KB-2018-0001、KB-2019-0001）的 Crossref 題名沒有副標。**沒有讀出版者原頁**，所以 `verification_status` 一律為 `discovered_unverified`。DOI 與既有紀錄無重複。
- **首發日**：
  - 有 Crossref published-online 的 3 篇期刊論文（KB-2021-0004、KB-2021-0005、KB-2022-0119）依該日期填，精度到日。
  - Elsevier 的 IJCCI 兩篇（KB-2020-0002、KB-2021-0003）沒有線上日，依 [crossref-first-online-2026-10-12.md](crossref-first-online-2026-10-12.md) 第四輪做法，以 DOI 登記日的年月填入。該輪抽查不含 IJCCI，但既有 IJCCI 紀錄已採同一做法。
  - ACM 會議論文採 `event_year`，日期留空。
  - **KB-2021-0006（Tedre et al., IEEE Access）**：Crossref 只有年份，IEEE Xplore 對自動讀取回傳空白頁（HTTP 202），依規則停止，暫用 `issue_year` 2021。這會是知識庫唯一一筆卷期年研究紀錄，待有人用瀏覽器讀 IEEE Xplore 的 Date of Publication 後補上。
- **`published_in`**：只連監測清單內的來源（J05、J35、C13、C14）。IEEE Access、*Human Behavior and Emerging Technologies*、*Integrative Psychological and Behavioral Science* 不在清單，沒有加。
- **範圍、學段、主題、方法**：依題名與摘要判讀，同一模型，未經人工核對。範圍全部判 A，面向以 S-BAS 為主，加 S-SYS（ML 設計）或 S-ETH（道德歸因）。
  - 學齡前到國小跨段者同時標 `STAGE_PRESCHOOL` 與 `STAGE_PRIMARY`。
  - KB-2018-0001 摘要裡的「4–10 歲」是作者先前研究的對象，本研究年齡未寫，所以不標學段。
  - KB-2021-0005 為概念性回顧，回顧對象比例判不出，所以不標 `REVIEW_INCLUDES_K12`。
- **不入庫的 10 篇**（書目已記在證據對照表）：
  - Huang & Looi 2020、Chen et al. 2023、del Olmo-Muñoz et al. 2020、Brackmann et al. 2017、Taub et al. 2012、Thies & Vahrenhold 2013、Polat & Yılmaz 2022、Sigayret et al. 2022、Sentance et al. 2019：只談 CS／運算思維、未涉及 AI，依範圍準則判 C。入庫後網站也不顯示，所以暫不收。日後若另設「教學設計證據」分類再議。
  - Kahn et al. 2012（兒童與人形機器人 Robovie）：摘要看不出機器人是否由 AI 驅動，範圍判「不明」，不收。
- **未記 search run**：這次是逐篇以題名查 OpenAlex／Crossref 核對，不是條件搜尋批次，依 schema 不記。
- **中文篇名**：論文篇名依現行規則不翻譯，沒有加 `titles_zh`。
