# 結構化來源證據卡與逐項主張比對（v0.1，2026-10-09）

## 用途與界線

本工具 `research/compare-source-facts.js` 是**來源事實數值／文字欄位的保守核對器**，不是通用中文自然語言理解模型、真正的獨立專家驗證，也不是自動審稿放行工具。

它接受兩份**人或 AI 已事先結構化**的資料：
- 來源證據卡 `cards[].facts[]`：來源 URL、存取證據等級、欄位（例：最初招募、最後分析、研究對象）、值、原文定位、短摘錄以及來源核對狀態。
- 中文主張的結構化表示 `cases[].assertions[]`：逐條要比較的欄位、比較運算符及主張值。

**注意：並不會自行從任意中文句子擷取所有可驗證的主張。** 倘若主張欄位漏標，即使現有欄位全部吻合，也只代表它們與「目前輸入的證據卡」一致，**不能認定整句中文都受支持**。因此結果一律帶 `publication_decision:"hold"`。

## 判讀邏輯

| 輸出 | 意義 |
|---|---|
| `conflict_with_entered_evidence` | 至少一個明確填入的主張值與證據卡相矛盾 |
| `consistent_with_entered_evidence` | **僅**所填結構化主張與證據卡相容；不代表全文來源或中文語意已正確 |
| `cannot_determine` | 證據卡缺乏所需欄位、欄位不在支持清單或主張表示不完整 |
| `invalid_input` | 證據卡格式、來源對應或核查狀態不符合安全規則 |

**沒有資料 ≠ 資料指出「否」。** UNESCO 活動公告若沒寫是否立法或學力成效，只能 `cannot_determine`，不得默認為 `false`。

## 目前實作的案例

[8 個結構化事實測試](structured-source-fact-probes-2026-10-09.json)以先前已檢索到的兩篇發布機構／期刊段落為依據，涵蓋：
- 電磁學修題研究，招募116人、最終分析95人、實驗50人與對照45人：可攔下「116人全數完成並納入分析」；
- 大學 STEM 二年級學生，不能改寫為國小受試者；
- UNESCO 設計培訓：活動類型可核對，強制政策／隨機試驗／滿意度**不能因來源未記載就判斷真假**。

來源內容在前輪僅由出版社可檢索片段取得，尚未下載原始完整網頁並封存 SHA256。證據卡 `evidence_checked:false`，不能視為已驗證真實性的原文。測試只是手動建構的回歸例，不是盲測或模型成效數據。

## 本地使用方法

```bash
node research/compare-source-facts.js research/benchmarks/structured-source-fact-probes-2026-10-09.json
node --test research/compare-source-facts.test.js
```

工具不修改 `publication/issues.json`、已發布報告及其查核資料。未來要往正式報告整合，必須先驗證資料卡源自可信的原文快照，建立主張完整性審查，並與 `research/validate-source-trace.js` 與 `research/validate-claims.js` 的發布閘門銜接；不能只靠通過本工具就發布。
