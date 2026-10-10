# PROTOCOL（2022–2025 共用；草稿，待管理者核准 D1 後凍結）

> **依據：**[論文逐年趨勢分析方案](../annual-paper-trend-analysis-plan.md) v0.14（main `2a7599b`）。
>
> **狀態：**第 7 節第 1 步的草稿。凍結時記下 commit 雜湊與日期。凍結後的任何偏離都記入 `DEVIATIONS.csv`；影響主表或摘要的偏離，須經管理者核准。
>
> **性質：**由文獻搜尋 session 起草，同一模型，不算獨立審閱。方案沒寫清楚、需要決定的地方列在 [open-questions.md](open-questions.md)。

## 1. 固定面板、期刊清單與面板分層

- **面板規則：**[監測清單](../venue-watchlist.md) J01–J47 中，2022–2025 四年在 OpenAlex 每年至少有 1 篇 `type:article`（`is_paratext:false`）的期刊。
- **結果：**47 刊全部符合，詳見 [journals.csv](journals.csv)。
  - 計數用 `group_by=primary_location.source.id`，2026-10-10 取得。
  - 每刊逐年列出 source ID、article 數、article＋review 數、OpenAlex 摘要覆蓋率。
- **source ID 的確認：**
  - 以刊名查 `/sources?search=`，取類型為 journal、且刊名、ISSN-L、出版者一致者。J13 取第 2 筆，第 1 筆是 SIGCSE 會議。J01 另查一次。
  - 再以全部 ISSN 反查 2022–2025 的 `primary_location.source.id`，確認沒有其他 source ID。
  - J01、J03、J41 四年都是同一個 ID，見 open-questions Q10。
- **面板分層：**「教育科技與 AI 教育」24 刊、「一般教育與心理」23 刊。機械規則見 open-questions Q1。J10、J11、J24、J29、J32 依機械規則原判教育科技，經編輯 session 2026-10-10 裁定逐刊改判為一般教育與心理，理由寫在 `journals.csv`。
- **敏感度表：**排除 J35–J47，`journals.csv` 的 `j35_j47_sensitivity` 欄標 `exclude`。
- **不進主要分母：**會議論文與專書章節。

## 2. 子查詢表與檢索規則

### 2.1 主查詢

- **檢索欄位：**`title_and_abstract.search`；filter 限面板 source ID、`type:article|review`、`is_paratext:false`、`publication_year:YYYY`。
- **不設限：**不限制 `language`。檢索詞全為英文，非英文論文大多找不到，列為限制。
- **片語：**多字詞與含連字號的詞一律加雙引號，單字不加。
- **單複數：**不使用 `.search.no_stem`。`title_and_abstract.search.no_stem` 在 2026-10-10 實測回 HTTP 400。預設的詞幹處理下，單複數命中相同，所以不另列複數組。試查結果如下（2025 年面板）：

| 單數 | 複數 | 2025 命中 |
|---|---|---|
| "large language model" | "large language models" | 309／309 |
| chatbot | chatbots | 204／204 |
| "intelligent tutoring system" | "intelligent tutoring systems" | 40／40 |

- **11 組子查詢：**40 個 AI 詞依方案第 2.3 節的順序，每 6 詞一組，得 7 組；另加 4 組組合查詢。下表的試查只取 `meta.count`，沒有存 ID。

| 代碼 | 子查詢 | 2025 試查命中 | 2022 預查詢命中（只限有摘要） |
|---|---|---|---|
| M1 | ("AI education" OR "artificial intelligence education" OR "AI curriculum" OR "artificial intelligence curriculum" OR "teaching AI" OR "teaching artificial intelligence") | 59 | 19 |
| M2 | ("teaching about AI" OR "teaching machine learning" OR "machine learning education" OR "machine learning for kids" OR AI4K12 OR "five big ideas") | 4 | 4 |
| M3 | ("AI ethics education" OR "AI awareness" OR "children's conceptions of artificial intelligence" OR "explainable artificial intelligence" OR "Teachable Machine" OR Cognimates) | 24 | 6 |
| M4 | (PopBots OR LearningML OR eCraft2Learn OR "voice assistant" OR "smart speaker" OR "intelligent tutoring system") | 52 | 24 |
| M5 | ("AI literacy" OR "artificial intelligence literacy" OR "AI-literacy" OR "algorithmic literacy" OR "AI competency" OR "AI ethics") | 281 | 26 |
| M6 | ("generative AI" OR "generative artificial intelligence" OR GenAI OR ChatGPT OR "Chat GPT" OR "GPT-4") | 1,045 | 0 |
| M7 | ("large language model" OR LLM OR chatbot OR "conversational agent") | 522 | 17 |
| C1 | ("computational thinking" AND ("artificial intelligence" OR "machine learning")) | 15 | 5 |
| C2 | ("App Inventor" AND "machine learning") | 0 | 1 |
| C3 | ("data literacy" AND "artificial intelligence") | 6 | 1 |
| C4 | ("summer camp" AND "artificial intelligence") | 0 | 0 |

- **2025 年命中量：**各組加總 2,008 筆。聯集要到第 2 步才算，但必小於加總，未達 2,500 筆的暫停門檻。
- **2022 年預查詢：**有摘要者的聯集是 93 筆。只供試編，不算快照，ID 不入 repo。

### 2.2 題名子查詢

同一 11 組改用 `title.search`，另加 `has_abstract:false`，以整個面板為一次 filter。逐刊缺摘要比例用 `group_by=primary_location.source.id` 計算。

### 2.3 中性查詢（漏收估計用）

- **拆組：**依方案第 2.3 節同法，每 6 詞一組，取聯集。
- **N1：**("artificial intelligence" OR AI OR "machine learning" OR "educational robotics" OR Scratch OR robot)，2025 試查 2,640 筆。
- **N2：**("social robot" OR "natural language processing" OR "facial recognition" OR "image recognition" OR "deep learning" OR "neural network")，2025 試查 281 筆。
- **N3：**("intelligent agent" OR "pedagogical agent" OR "adaptive learning")，2025 試查 148 筆。
- **差集：**中性查詢聯集減去主查詢聯集，以 work ID 計。
- **抽樣：**以種子（用途代碼 1）隨機抽樣判 A／B。2025 年抽 100 筆，回溯年各 50 筆。

### 2.4 文件類型與排除清單

- **filter：**`type:article|review`、`is_paratext:false`。
- **撤稿：**記 `is_retracted`，撤稿不進主要分母。
- **短評與社論：**OpenAlex 摘要不足 20 詞者，依 Scopus 匯出的 `Document Type` 判斷；Note、Editorial、Letter、Erratum 不進主要分母，也不算入缺摘要比例（方案第 2.5 節）。

### 2.4.1 B 子型的已知限制

看不出是否為 LLM 的 chatbot，B 子型記 `other`，`genai_flag` 記 `unknown`（編碼手冊試編修改 P8；編輯 session 2026-10-10 裁定維持）。2022–2023 年的 chatbot 多為規則式，這樣可能低估 `robot_agent`，列入報告限制。

### 2.5 請求禮節

- 單一執行緒，請求間隔至少 0.2 秒；遇 429 依 `Retry-After` 退避。
- 不帶 email、mailto、API key 或任何憑證。
- User-Agent 只放專案名稱與 repo 網址。
- 每筆請求記入 `step1/openalex-requests.jsonl`，記網址、UTC、HTTP 狀態、`meta.count`、用途。
- 第 1 步共用 100 次呼叫，上限約 150 次。

### 2.6 擴詞方式（漏收上界超過 5% 或召回率低於 0.80 時升版一次）

依漏收樣本中判為 A／B 的論文所用的詞，從方案「不放主查詢」的詞中選命中最多的 6 個，加一組子查詢 M8。四年同步重跑，記入 `DEVIATIONS.csv`。具體加哪些詞由漏收樣本決定，PROTOCOL 只凍結這個規則。

## 3. 摘要詞數算法與 `abstract_sha256`

1. **OpenAlex 摘要的重組：**由 `abstract_inverted_index` 依位置排序後，以單一空格連接。
2. **兩種來源都做的處理，依序為：**
   1. 去除開頭的「Abstract」標題（不分大小寫，連同其後的冒號或句點）。
   2. 去除結尾的出版者版權聲明：從 ©、(c) 或 Copyright 起到結尾。
   3. 去頭尾空白，連續空白併為一個半形空格。
3. **詞數：**以空白切分；少於 20 詞記 `has_abstract=false`。
4. **雜湊：**`abstract_sha256` 以處理後的文字，用 UTF-8 計算。
5. **摘要來源優先順序：**OpenAlex 有 20 詞以上就用 OpenAlex，否則用 Scopus 匯出。

## 4. 系統性回顧、`refset.csv`、漏收估計

- **候選清單：**見 [systematic-reviews.md](systematic-reviews.md)，共 5 篇，待編輯 session 核對、管理者協助下載。
- **`refset.csv`：**目前只有表頭，讀完附錄後填入。
- **漏收估計：**見第 2.3 節。以 95% 上界判斷門檻，0 筆時用 3/n。

## 5. 去重與平手規則

1. 先比小寫 DOI。
2. 再比正規化題名加第一作者。
   - **題名正規化：**轉小寫、去除標點與連續空白、去除開頭的 the／a／an。
   - **判定：**正規化題名完全相同，且第一作者姓氏相同，判為同一作品。題名的 token 集合 Jaccard 達 0.9 以上而作者相同者，列為疑似重複，人工判定。
   - 第一作者姓名只在 scratchpad 比對，不入 repo。
3. 同一作品不同版本只算一次，年份取最早正式版本的 OpenAlex `publication_year`。
4. 無法判定者保留兩筆，記入 README。
5. **平手規則：**
   - A／B 無法判定記 `unknown`。
   - 學段多值時，取人數過半的主要值；沒有主要值時記 `k12_multi`（編碼手冊第 2 節）。

## 6. 範圍準則與操作細則、編碼手冊、提示

- **範圍準則：**[AI 素養範圍判斷準則](../ai-literacy-scope-criteria.md) v0.4，加上本方案三條操作細則：ITS（方案第 2.5 節）、接受度研究（管理者 2026-10-10 決定）、非教育情境判 C（試編修改 P1，管理者 2026-10-10 決定）。
- **編碼手冊：**[codebook-v1.md](codebook-v1.md)，含 2022 年試編 20 篇的結果與修改，見 [pilot-2022/report.md](pilot-2022/report.md)。試編修改 P1（非教育情境判 C）由管理者 2026-10-10 決定採用，只作本方案操作細則。
- **提示：**[prompts/](prompts/) 共三組，SHA-256 見 `prompts/SHA256SUMS`。D1 時凍結；凍結後任何修改都要重算雜湊並記入 `DEVIATIONS.csv`。

## 7. `calib.csv` 與 `anchor.csv`

### `calib.csv`

- **內容：**共 30 筆。
  - 真實 16 筆：A 8、B 8，從 `research/p0-trends-2026-10-10/records.json` 中有摘要的期刊紀錄抽出。
  - 合成 15 筆：C 4，加邊界 11 筆（C 5、B 4、A 2）。
- **答案：**由編輯 session 在 PROTOCOL 送出前核對。
- **重抽（編輯 session 2026-10-10 裁定）：**最初以種子 20261010 抽的 16 筆已全部作廢，改用種子 20281268 重抽，讓 PROTOCOL 與實際抽樣一致。最初版的 R01（KB-2026-0144，教師對 AI 的接受度）改寫為合成邊界案例 S15，答案 B。
- **插入方式：**只插在範圍判斷批次。每批 20 筆中含 3 筆校準題，以種子（用途代碼 5）從 `calib.csv` 抽，可重複使用。
- **正確率：**每個編碼 session 累計至少 30 筆校準題後計算 A／B／C 正確率，低於 0.85 停工。

### `anchor.csv` 的抽選規則

- **抽樣：**
  - 試行時，從 2025 年第一次編碼的結果中，以種子 20261010＋2025×10＋6 抽 15 篇；依 A／B／C／unknown 分層，比例同該年分布，每層至少 1 篇。
  - 從 2022 年主查詢命中（限 OpenAlex 有摘要者）中，以種子 20261010＋2022×10＋6 抽 15 篇。
- **答案：**2022 年的 15 篇在試行期間以同版手冊編碼，作為錨定答案。
- **欄位：**`anchor.csv` 記 `work_id, year, ai_lit_class, stage, coded_session, codebook_version, prompt_sha256`。
- **何時重編：**只在每個編碼 session 開始時，以及偵測到 `model_id` 改變時重編一次。
- **一致率：**計算 A／B／C 與學段兩項，低於 0.80 時停止該 session。

## 8. 全文對照的抽樣與授權

- **範圍與抽樣：**只做 2025 年。從開放取用全文中，依學段與開放取用狀態分層，以種子（用途代碼 3）抽 20 篇。
- **授權：**
  - 只用標示 CC BY、CC BY-NC、CC BY-ND、CC0 的出版者或典藏庫版本。
  - bronze 只可逐篇讀取，不得批次下載，也不引用原文。
  - ND 授權不翻譯摘錄。
- **紀錄：**全文不入 repo，每篇記入 `fulltext-sample.csv`。

## 9. 模型 ID 與換版

- **模型 ID：**`model_id` 由每批第一筆輸出自報，並與工具紀錄核對。子代理的參數為「預設、不可設定」。
- **換版：**偵測到 `model_id` 改變時立即停工，重編錨定樣本與校準集。
  - 錨定一致率低於 0.80，或校準正確率下降超過 5 個百分點時，四年全部以新版重編，須經管理者核准。
  - 未達此程度時，在 `DEVIATIONS.csv` 註記後繼續。

## 10. 種子推導式

**種子＝20261010＋年份×10＋用途代碼。**

| 用途代碼 | 用途 |
|---|---|
| 1 | 漏收抽樣 |
| 2 | 一致性抽樣 |
| 3 | 全文對照 |
| 4 | 批次順序 |
| 5 | 校準插入 |
| 6 | 錨定樣本 |
| 7 | 2022 試編 |
| 8 | 校準集抽選（編輯 session 2026-10-10 裁定） |

- 例：2022 年試編的種子是 20281237。
- 抽樣一律先把候選 ID 依字串排序，再以 Python `random.Random(seed)` 洗牌或抽樣。
- 校準集抽選用種子 20281268（2025 年、用途代碼 8）：A 類、B 類各自依 record_id 排序後，以同一個 `random.Random(20281268)` 先洗 A、再洗 B，各取前 8 筆。A 類中題名含接受度、使用意願類字詞（accept、intention、TAM、UTAUT、adoption、willingness）者，邊界不清楚，跳過並依序遞補；本次跳過 KB-2026-0140。

## 11. 門檻

照錄方案第 6 節，未作修改：

- **主要決策門檻：**
  - 單年命中超過 2,500 筆
  - 漏收 95% 上界超過 5%，或召回率低於 0.80
  - 校準正確率低於 0.85
  - A／B 判定 κ 低於 0.60
  - 主要分母每年少於 50 篇
- **品質紀錄門檻：**依方案第 6.2 節全表。

## 12. 區間、時期、預定比較、敏感度表

- **區間：**Wilson 95%。時期占比以兩年合併計算，分子相加、分母相加。
- **時期：**前期 2022–23、後期 2024–25。
- **合併規則：**某年主要分母少於 50 篇時，只能併入同一時期；合併後仍不足，只列篇數。
- **8 項預定比較：**照錄方案第 1 節，作為最終版。
- **三張核心敏感度表：**
  1. 排除 J35–J47
  2. 不明全數計為 A
  3. 2023 歸後期
- **用語：**依方案第 5 節的用語表。

## 13. 延後項目與啟用程序

- **延後項目（方案標「延後」者）：**
  - 面板組成表
  - Web of Science 對照（D7）
  - Crossref 與卷期年的敏感度表
  - 研究場域、情境旗標、摘要語言比率、面向共現矩陣
  - 位置與選項順序偏差報告
  - 回溯年的全文對照
  - 命中最多的面板外來源清單
- **啟用程序：**試行的可行性備忘逐項列出是否需要。需要者在回溯前記入 `DEVIATIONS.csv`，經編輯 session 核對後啟用；影響主表者須經管理者核准。

## 14. 偏離

- 任何偏離 PROTOCOL 的情形都記入 `DEVIATIONS.csv`，欄位見方案附錄 A。
- 影響主表或摘要的偏離，須經管理者核准。
- 結果新舊版並列；方向不同時寫「不確定」。

## 15. Scopus DOI 檢索式的分批規則（D6）

- **清單產生：**第 2 步取得 ID 快照後，列出 OpenAlex 摘要不足 20 詞（含無摘要）且有 DOI 的紀錄。
- **分批：**依期刊、年份排序，每批最多 100 個 DOI，組成 `DOI(…) OR DOI(…)`。實際上限以管理者首次執行時的 Scopus 回應為準，偏離時記入 README。
- **檔名：**每批一個文字檔，命名 `scopus-batch-YYYY-NN.txt`，只放 scratchpad，交編輯 session 轉管理者。
- **紀錄：**README 記每批的建立日期、DOI 數、匯出日期與匯出筆數，不記摘要。
- **不用**「關鍵字＋ISSN＋`PUBYEAR`」的寫法（方案第 2.7 節）。
