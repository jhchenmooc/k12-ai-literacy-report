# P0 工具波次 A 組：2026-10-09 起首次公開之 K–12 AI 論文／預印本初篩

> **性質**：只做發現與初篩，屬「待查證」，不做出版判斷。所有 `first_public_date` 一律為 unknown。結構化紀錄見 [`group-a.json`](group-a.json)。
> 同一模型完成搜尋與初篩，不等於獨立審閱。未修改正式 CSV、索引、drafts、publication 或網站檔案。

- UTC：2026-10-09T16:11:35Z 開始，16:16:56Z 結束（約 5.5 分鐘）。
- 實際窗口：查詢當下只涵蓋 **10/09 當天**，不能代表 10/09–10/15 全週。

## 查詢表

| ID | 工具 | 查詢重點 | UTC | HTTP | 總命中 | 讀取 | 狀態 |
|---|---|---|---|---|---|---|---|
| A-oa1 | OpenAlex | `from_created_date:2026-10-09`＋AI literacy 詞組 AND 學段詞 | 16:11:57–58 | 429 | — | 0 | **failed**：Plan upgrade required |
| A-oa2 | OpenAlex | `from_created_date:2026-10-09`＋GenAI 詞組 AND 學段 AND 教師／政策詞 | 16:11:58 | 429 | — | 0 | **failed**：同上 |
| A-oa3 | OpenAlex | `from_publication_date:2026-10-09`＋AI literacy／GenAI AND 學段 | 16:11:58–59 | 200 | 5 | 5 | ok |
| A-oa4 | OpenAlex | `from_publication_date:2026-10-09`＋GenAI AND 學段 AND 教師／政策 | 16:12:09–10 | 200 | 4 | 4 | ok |
| A-oa5a | OpenAlex | `from_publication_date`＋`title.search` 兩組（共 12 個布林運算子） | 16:12:10 | 429 | — | 0 | **failed**：Rate limit exceeded |
| A-oa5b | OpenAlex | 同上，縮成較少運算子 | 16:12:30 | 200 | 22 | 22 | ok |
| A-cr1 | Crossref | `created=2026-10-09`、journal-article、`query.bibliographic=AI literacy K-12 …` | 16:12:19–20 | 200 | 2029（相關度排序） | 40 | ok |
| A-cr2 | Crossref | `created=2026-10-09`、不限類型、`generative AI ChatGPT … school teachers policy` | 16:12:27–28 | 200 | 162（相關度排序） | 40 | ok |
| A-axv1 | alphaXiv | keywords `AI literacy`、`K-12`；`published_after=2026-10-09` | 16:12:35–46 | （MCP） | 0 | 0 | ok |
| A-ax1 | arXiv API | abs 詞組 AND `submittedDate:[202610080000 TO 202610092359]` | 16:12:46 | 200 | 0 | 0 | ok |
| A-ax2 | arXiv API | 同上改 10/01–10/09（語法對照） | 16:12:52 | 200 | 11 | 11 | ok（全部早於窗口） |
| A-cr3 | Crossref | J10／J11 ISSN＋`created=2026-10-09` | 16:16:46–47 | 200 | 5 | 5 | ok（皆不相關） |
| A-meta-cr | Crossref | 逐 DOI 書目／日期／摘要 22 筆 | 16:13:09–25 | 17×200、5×404 | — | 22 | partial |
| A-meta-oa | OpenAlex | 逐 DOI 9 筆 | 16:13:52–59 | 4×200、5×404 | — | 9 | partial |
| A-meta-pub | 出版社頁 | doi.org 轉址 7 筆 | 16:14:05–16 | T&F 403；Springer JS challenge；Elsevier 只回轉址 | — | 3 可讀 | partial |

搜尋查詢共 12 個（成功 9、失敗 3）；另 3 次逐篇書目／出版社頁對帳。完整查詢字串見 JSON。

## 待查證候選（3 筆）

| DOI | 題名（簡） | 期刊 | 日期跡象 | 學段 | 主要風險 |
|---|---|---|---|---|---|
| 10.1080/1475939x.2026.2739390 | Trending use of GenAI tools in K–12 school settings | Technology, Pedagogy and Education | DOI 登記 10/09；Crossref published-online **10/08** | K–12（僅依題名） | **邊界**：若出版社頁證實 10/08 上線即改排除；T&F 403、無摘要 |
| 10.53850/joltida.1893531 | Vocational school students' conceptualizations of AI through metaphors | J. of Learning and Teaching in Digital Age | DOI 登記 10/09；出版社頁 Publication Date 2026-10-09（非 Available online 欄位） | **unknown**（土耳其 vocational school，可能是高教層級的 MYO） | 學段需讀全文；若為高教層級即排除 |
| 10.1186/s40359-026-05721-w | Latent profiles of AI teaching self-efficacy among vocational education teachers in China | BMC Psychology | DOI 登記 10/09；Crossref online 10/09 | **unknown**（中職或高職不明） | 無摘要、頁面讀不到；相關性研究，不可作因果解讀；低優先 |

三筆皆不在已知 DOI 清單（重複 0）。Research Desk `verify_bibtex` 三筆皆 `not_found`：OpenAlex 尚未收錄這些 10/09 新 DOI（逐 DOI 查詢回 404），屬索引延遲，不是書目錯誤；Crossref 有 DOI 紀錄。三筆都不在監測期刊清單內。

## 排除統計（19 筆逐篇初篩）

| 理由 | 筆數 | 例 |
|---|---|---|
| 高教／研究生／大學教師 | 7 | feduc.2026.1968743（J29）、frai、5xhcsr85、ijim、jmetp.1304、ijse、s11218 |
| 日期早於窗口（出版社頁、Crossref online 或 OpenAlex created 早於 10/09） | 8 | **jmetp.1312**（中小學教師 AI 素養指標；出版社頁 Published 10/08）、stemer（08/05）、uzdanica（10/07）、ijecie（06/30）、maslahah ×2（OpenAlex 10/06）、zenodo ×2 |
| AI 只作學習工具或主題非 AI | 4 | mrj.2026.15.11（12 年級，日期在窗口內）、lmot.2026.102370、ssrn.7589242、s44217（J32，題名無 AI） |

（部分項目同時符合多項理由，以主要理由歸類；日期類中 uzdanica、ijecie 也屬主題不符。）此外，清單查詢中約 110 筆只看題名即排除，未逐筆列出。標記「高風險，待 G2–G4」：stemer（前後測控制組）、mrj（百分比）、BMC（相關性）。

## 限制

1. **OpenAlex `from_created_date` 需付費方案**（HTTP 429），與任務單所稱「已實測可用」不符；改用的 `from_publication_date` 常為未來卷期日，不是建立日也不是首發日。
2. OpenAlex 尚未收錄 10/09 新 DOI，對當日窗口召回極低；本組主要發現來源實際是 Crossref 登記日。
3. Crossref 關鍵詞查詢依相關度排序，總命中不是精確主題數；只讀各前 40 筆。DOI 登記日 ≠ 公開日：多筆 10/09 登記的 DOI 其實已在 10/07、10/08、08/05、06/30 上線。
4. alphaXiv／arXiv 在 10/09 16:12 UTC 都是 0；當日送件尚未 announce，週內須重查。
5. 出版社頁多數讀不到（T&F 403、Springer JS challenge、Elsevier 只回轉址），候選的學段與方法未核。
6. 監測期刊只對 J10／J11 做 ISSN 定向補查；其他期刊只靠關鍵詞查詢覆蓋。
