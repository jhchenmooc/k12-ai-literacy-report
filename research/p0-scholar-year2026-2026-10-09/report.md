# 依作者檢索：2026 全年概覽（2026-10-09）

> **性質：只評估，不入庫。** 管理者要求「試跑這些學者 2026 整年的版本」，由編輯 session 執行。未寫入 `search_runs.csv` 或知識庫三表（同 #119 的作法：查詢紀錄只放本資料夾，決定入庫時再寫入）。未動 `publication/issues.json`、候選池或閘門。
>
> 與 [#119 近 90 天試跑](../p0-scholar-trial-2026-10-09/report.md) 的分工：#119 由文獻搜尋 session **逐篇人工判讀**（單位、學段、AI 主題）；本概覽只用**關鍵字粗分**看全年規模，數字較粗，正式使用以逐篇判讀為準。

## 範圍與方法

- 清單：[scholar-watchlist.md](../scholar-watchlist.md) v0.5 正表中可依作者檢索的已確認學者 62 人（A1 4、A2 6、A3 4、A4 6、B 9、H 33）。
- 窗口：OpenAlex `publication_date` 2026-01-01～2026-10-09（**不是首發日**）。
- 查詢：每人一次 `/works?filter=author.orcid:<ORCID>,from_publication_date:2026-01-01,to_publication_date:2026-10-09`，cursor 分頁取全部。UTC 19:18:29–19:19:12，62 次全部成功。完整查詢與每人命中數見 [runs.json](runs.json)。**請求未帶 email 或 mailto**；OpenAlex key 由 proxy 帶上，未出現在紀錄中。
- 抽查 ORCID 與作者 ID 兩種查法（T01、T03、T12、S02、H07、H11、H24、H33）：ORCID 命中數都大於或等於作者 ID，未發現漏抓。零命中者兩種查法都是 0。
- 粗分（題名＋摘要關鍵字，**未逐篇判讀**）：
  - 教育相關：learn、educat、student、teacher、school 等，或 OpenAlex 主題子領域為 Education。
  - K-12：K-12、school、primary、elementary、secondary、middle／high school、kindergarten、early childhood、child、adolescent、pupil、grade、youth、in-/pre-service teacher 等，且須同時教育相關。
  - AI：artificial intelligence、AI、GenAI、generative、ChatGPT、LLM、large language、machine learning、chatbot、intelligent tutor。
- 與知識庫比對：小寫 DOI。

## 結果

| 項目 | 數字 |
|---|---|
| 不重複作品（OpenAlex ID） | 631（依題名再去重約 590） |
| 教育相關 | 498 |
| 教育＋AI | 310 |
| K-12＋AI（依題名去重） | **73** |
| 其中不在知識庫 | **60** |
| 其中僅有預印本版本 | 17 |
| 其中 OpenAlex 日期在近 90 天（2026-07-11 起） | 19 |

### 依級別

| 級別 | 作品數 | 教育相關 | K-12＋AI | 已在知識庫 |
|---|---|---|---|---|
| A1 2026 國際講者（4） | 122 | 116 | 14 | 1 |
| A2 2026 臺灣講者（6） | 60 | 56 | 5 | 0 |
| A3 歷屆國際（4） | 46 | 43 | 6 | 0 |
| A4 歷屆臺灣（6） | 53 | 39 | 5 | 1 |
| B 擴充（9） | 132 | 100 | 8 | 1 |
| H 高被引（33） | 257 | 182 | 45 | 13 |

（共著作品會在多個級別各計一次。）

### K-12＋AI 依 OpenAlex 月份（依題名去重）

| 1 月 | 2 月 | 3 月 | 4 月 | 5 月 | 6 月 | 7 月 | 8 月 | 9 月 | 10 月（至 9 日） |
|---|---|---|---|---|---|---|---|---|---|
| 14 | 7 | 9 | 9 | 5 | 10 | 2 | 6 | 8 | 3 |

1 月的 14 篇中有 6 篇日期為 1 月 1 日，可能是只有年份、被記成年初；月份只能當粗略參考。

## 觀察

1. **補漏價值**：73 篇 K-12＋AI 中 60 篇不在知識庫，期刊會議與關鍵字監測漏了相當多，按作者檢索有補漏價值。
2. **高被引作者貢獻最多**：H 級 45 篇（Thomas Chiu、江紹祥、Breazeal 團隊、Davy Ng 較多）。論壇講者作品多為教育相關，但明寫 K-12 的比例低（多為高教或一般學習研究），與 #119 逐篇判讀一致。
3. **量可人工處理**：全年約 73 篇、每月約 6–9 篇。
4. **粗分有雜訊**：編輯 session 目視約 10 篇明顯不相關（藥品機器學習、商學院 AI 採用、醫學生診斷分流、期刊文獻計量、視覺語言模型等），另有 arXiv 與正式版重複。實際相關約 55–60 篇，須逐篇判讀。
5. **零命中**：T12、H07、H24、H33 今年在 OpenAlex 無作品（兩種查法皆 0），可能是收錄延遲或今年未發表。
6. **資料混入**：T03 43 篇中 AI 相關 15 篇；T19、T22 檔案混有其他領域，經教育與 AI 粗分後影響不大。

## 反查期刊與會議（管理者 2026-10-09 要求）

把 2026 全年作品的出處（OpenAlex `primary_location.source`，排除只有預印本者、依題名去重）與 [venue-watchlist.md](../venue-watchlist.md) 比對。下表只列**不在監測清單**、且清單學者今年在該處有 3 篇以上教育相關作品或至少 1 篇 K-12＋AI 作品者。數字來自關鍵字粗分，只供評估優先序。

| 出處 | 教育相關 | K-12＋AI | 初步建議 |
|---|---|---|---|
| Interactive Learning Environments（T&F） | 13 | 1 | 建議納入（擴充）：教育科技主流期刊，清單學者今年發表多 |
| Research and Practice in Technology Enhanced Learning（APSCE） | 8 | 0 | 建議納入（擴充）：亞太學會期刊，臺灣與亞洲學者常投 |
| Computers and Education Open（Elsevier） | 5 | 1 | 建議納入（擴充）：開放取用，2024 年多篇 AI 素養高被引論文出自此刊 |
| International Journal of Technology and Design Education | 4 | 0 | 評估：中小學科技教育，與 AI 課程相關 |
| International Journal of Science Education | 3 | 1 | 評估：科學教育，K-12 比例高，AI 相關篇數少 |
| Education Sciences（MDPI） | 3 | 2 | 評估：K-12＋AI 有命中，但需特別檢查審稿品質，建議列背景 |
| Informatics in Education | 2 | 1 | 評估：K-12 運算與 AI 教育（芬蘭 Generation AI 團隊投稿） |
| Technology, Pedagogy and Education | 2 | 1 | 評估：學校 AI 教育個案（瑞典團隊） |
| Thinking Skills and Creativity | 3 | 0 | 背景：與 AI 共創、批判思考相關，學段不一 |
| International Journal of Applied Linguistics | 3 | 2 | 背景：語言學習中的生成式 AI，學段不一 |
| European Journal of Education | 1 | 1 | 背景 |
| The Internet and Higher Education | 3 | 0 | 不建議：高等教育專刊 |
| Asian Conference on Education（IAFOR） | 4 | 0 | 不建議：論文集審查程度不明 |

說明：
- LAK（C03）、ICCE（C11）、CHI（C13）、IDC（C14）、AERA（C17）、EAAI（C22）已在清單；OpenAlex 名稱與清單寫法不同，自動比對未對上，已人工確認。
- Lecture Notes in Computer Science、Communications in Computer and Information Science、Springer eBooks 與手冊系列是出版叢書，不是單一期刊或會議，要再拆到所屬會議（如 AIED、EC-TEL 多收於 LNCS）才能評估。
- 這份比對只來自清單學者的作品，會偏向這群人常投的出處，不代表整個領域；是否納入、列哪一級，由文獻搜尋 session 依 venue-watchlist 既有標準評估後交管理者決定。

## 交接

- K-12＋AI 命中清單（不含摘要）：[k12-ai-hits.json](k12-ai-hits.json)，73 筆，`in_kb: false` 者 60 筆。管理者 2026-10-09 決定交由文獻搜尋 session 逐篇篩選，符合者入庫。
- 篩選時可沿用 #119 的 [screen.json](../p0-scholar-trial-2026-10-09/screen.json) 已判讀結果，與本清單重疊者不重做。
- 入庫時再把本資料夾 `runs.json` 的查詢寫入 `search_runs.csv`。
- 上節期刊與會議的納入評估，交由文獻搜尋 session 依 venue-watchlist 既有標準複核（可合併 #119 的 90 天命中出處），結果交管理者決定。
