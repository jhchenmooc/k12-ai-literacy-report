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

`refset.csv` 目前只有表頭。

## 注意

- **納入論文多在面板外：**這些回顧的納入論文可能有相當比例是會議論文或面板外期刊。依方案第 2.4 節，某年參考集達 20 篇才報召回率，不足時只報漏收估計。
- **循環問題：**第 1、2、3、4 篇都刊在 J02（面板內）。回顧本身是否進語料，依範圍判斷規則處理，不另設規則。
