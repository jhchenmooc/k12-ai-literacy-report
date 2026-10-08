# 中文主張拆解覆蓋性警示 v0.1

本工具為 [audit-chinese-claim-coverage.js](../audit-chinese-claim-coverage.js)，承接 `compare-source-facts.js` 的結構化事實卡；**它不是中文語意理解模型，不會驗證完整原文、獨立黃金答案或准予發布**。

## 問題與防護

先前只要輸入主張「95人大學研究證明國小學生學力提升」，但只標註 `sample.analysed=95`，結構化比對器會顯示該**欄位**一致。這個結論可能被誤當成整句已核實。

新工具額外檢查：
- 中文句子的數字位置是否有明確標註；每個數字的 `text/start/end`、`role` 與對應欄位須核對；沒標註即警示，已標為 `context_only/unverifiable` 也不當成核實。
- 明顯高風險詞語是否在 `assertions` 出現相應類別：因果與成效、強制政策、學生學段、招募／分析人數、實驗／對照組、RCT 設計、跨國樣本。
- 已有數值矛盾仍回 `conflict_with_entered_evidence`；少標重要意義則回 `incomplete_claim_mapping`；證據卡無該欄位則 `cannot_determine`。
- 即使沒有檢出缺口，也只回 `typed_fields_consistent_not_semantically_certified`，**一律** `publication_decision:"hold"`。

## 不可誤解的地方

1. **高風險字詞比對不是主張的完整抽取。** 同義改寫、否定句、間接語義、跨段指稱或數字中文大寫都可能漏掉，沒有警示絕不等於內容完整。
2. **number_annotations 是外部提供的標註。** 此程式僅檢查在正文出現的 ASCII 數字是否涵蓋，不會認證標註者把欄位意義標正確。
3. **證據卡事實仍未由完整出版者原件驗證。** 現有測例取自已檢索之出版社部分內容，不能視為真正全文快照。
4. **不可只靠欄位一致放行。** 正式發布仍須完整主張—原文核查、來源可靠性、日期／樣本外推、獨立驗證與先前正式發布閘門。

## 程式驗收

```bash
node --test research/audit-chinese-claim-coverage.test.js
```

這一批測試是**開發期間編寫的對抗性回歸測試**，不是隨機封存的獨立測試集，也不能用來報告真實語意準確率。
