# 召回參考集：系統性回顧清單（第 1 步提出，待編輯 session 核對）

> **依據：**[方案](../annual-paper-trend-analysis-plan.md)第 2.4 節：選 2024 年以後發表、附納入論文清單的 K-12 AI 素養系統性回顧，至多 5 篇，逐篇人工讀附錄，不批次下載全文。

## 候選檢索

2026-10-10 用 OpenAlex 查一次，命中 151 筆，依被引次數排序讀前 50 筆。請求紀錄見 `step1/openalex-requests.jsonl`，用途標「refset candidate search」。檢索式是：

```text
title_and_abstract.search:
  ("systematic review" OR "scoping review" OR "systematic literature review")
  AND ("AI literacy" OR "artificial intelligence literacy" OR "AI education" OR "artificial intelligence education")
  AND ("K-12" OR K12 OR "primary school" OR "secondary school" OR school)
from_publication_date: 2024-01-01
type: article|review
```

## 選取條件

1. 2024 年以後發表。
2. 主題是 K-12 AI 素養或 AI 教育，不是單純用 AI 工具教其他科目。
3. 開放取用（gold 或 hybrid），可以逐篇人工讀附錄。
4. 檢索年限涵蓋 2022–2025 的一部分。
5. 合起來涵蓋生成式 AI 以前與以後的研究。

## 建議的 5 篇

| # | DOI | 題名（節錄） | 年 | OA | 涵蓋期間（依題名或摘要） | 選取理由 |
|---|---|---|---|---|---|---|
| 1 | 10.1016/j.caeai.2024.100211 | A systematic review of AI education in K-12 classrooms from 2018 to 2023 | 2024 | gold | 2018–2023 | 涵蓋 2022–2023，K-12 AI 教育全面回顧 |
| 2 | 10.1016/j.caeai.2024.100217 | A systematic review of learning task design for K-12 AI education | 2024 | gold | 至 2023 前後 | 著重 AI 素養課程與任務設計 |
| 3 | 10.1016/j.caeai.2025.100487 | A systematic literature review of GenAI literacy in schools | 2025 | gold | 生成式 AI 以後 | 補 2023–2024 的生成式 AI 素養研究 |
| 4 | 10.1016/j.caeai.2025.100422 | Fostering responsible AI literacy: a systematic review of K-12 AI ethics education | 2025 | gold | 至 2024 前後 | 補倫理面向 |
| 5 | 10.1016/j.caeai.2026.100551 | Artificial intelligence literacy at school: a systematic review with a focus on psychological … | 2026 | gold | 可能涵蓋 2025 | 補最新年份 |

### 備選

- **非開放取用，需管理者以學校權限下載：**
  - `10.1080/10494820.2025.2482586`，Unveiling AI literacy in K-12 education（ILE，closed）
  - `10.1016/j.edurev.2024.100642`，How educators teach AI in K-12（ERR，closed）
  - `10.1177/07356331251360442`，Constructionism in K-12 AI literacy education（JECR，closed）
- **hybrid：**
  - `10.1007/s40593-025-00466-w`，Towards an AI-Literate Future（IJAIED，hybrid）

## 需要管理者協助下載

5 篇都在 ScienceDirect。依方案第 2.7 節，不用程式或操控瀏覽器抓取 ScienceDirect，所以**請管理者以瀏覽器下載 5 篇的全文 PDF 與補充附錄**，交給文獻搜尋 session 逐篇人工讀取納入論文清單。這些都是 CC BY 開放取用。PDF 不入 repo。

讀取後的結果寫入 `refset.csv`，只記：
- 納入論文的 DOI 與題名
- 年份
- 是否刊於面板期刊
- 讀取來源

`refset.csv` 已填入，見下方「讀取結果」。

## 讀取結果（2026-10-10）

管理者 2026-10-10 提供 5 篇的全文 PDF（CC BY），由同一模型的子代理逐篇人工讀出納入研究清單，再比對 `journals.csv`。PDF 不入 repo。

| 回顧 | 自述納入數 | 讀出筆數 | 清單來源 | 問題 |
|---|---|---|---|---|
| 100211 | 25 | 25 | 參考文獻以星號標示 | 1 筆題名印刷截斷 |
| 100217 | 47 | 47 | **沒有明列**；依結果章節與表 2、表 3 的引用重建，與回顧自述的 47 篇及各情境百分比相符 | 全部沒有印 DOI |
| 100422 | 68 | 68 | 表 4（依方法分組） | 表 4 有 2 篇重複列出；另 2 篇只在結果與表 6–8 出現，補入後才是 68 |
| 100487 | 51 | 51 | 附錄表 A1；參考文獻也有星號 | 星號與表 A1 差 1 篇，依表 A1；1 筆引用錯亂，依內容判為 Liu 等人 2024 |
| 100551 | 58 | 58 | **沒有明列**（資料在外部補充檔）；依表 2–4 的引用重建，對象分組 21／32／5 與各刊篇數都與回顧自述相符 | 建議日後以補充檔核對 |

- **合計：**249 筆。其中刊於面板期刊的有 92 筆；出版年在 2022–2025 的有 85 筆，跨回顧去重後 76 篇（2026-10-11 依 ERR-006 移出 1 筆後：面板內 91 筆、2022–2025 有 84 筆、去重 75 篇、2024 年 32 篇）。
- **逐年：**2022 年 20 篇、2023 年 16 篇、2024 年 33 篇、2025 年 7 篇。依方案第 2.4 節，某年參考集達 20 篇才報召回率：2022、2024 可報，2023、2025 只報漏收估計（四年報告改依 OpenAlex 年份計，2022 只有 18 篇，只報 2024；見四年報告第 4 節）。
- **年份口徑：**這裡的年份是回顧引用時所印的年份，不是 OpenAlex `publication_year`。第 2 步比對時以 OpenAlex 年份為準，逐年篇數可能變動，結果記入 PROTOCOL-YYYY。
- **沒有 DOI：**面板內的 76 篇中有 8 篇沒有印 DOI，第 2 步以題名比對。
- **明細：**見 [refset.csv](refset.csv)，每列是一筆回顧所納入的研究。`note` 欄標示「依引用重建」與中、低信心者。

## 注意

- **納入論文多在面板外：**這些回顧的納入論文可能有相當比例是會議論文或面板外期刊。依方案第 2.4 節，某年參考集達 20 篇才報召回率，不足時只報漏收估計。
- **循環問題：**第 1、2、3、4 篇都刊在 J02（面板內）。回顧本身是否進語料，依範圍判斷規則處理，不另設規則。
