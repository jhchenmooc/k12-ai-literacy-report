# 新聞／研究通用發布檢核規格 v1.0

這是對研究與新聞核查規範的**機器可檢查部分**。程式只能驗證欄位是否完整、前後邏輯與發布授權，**不能**理解原文是否正確支持一個中文解讀。

## 必備資料欄位

每個結論各自為一筆 JSON，至少包含：

- `claim_id`、`kind`（news_policy/research）、`claim_text`、`source_url`、`source_locator`（條款／章節／表格／原始公告定位）、`checked_at`、`publication_date`、`source_type`
- `level`：新聞 `N-U/N-V1/N-V2/N-V3`；研究 `U/V1/V2/V3`。
- `claim_class`：`bibliographic`／`descriptive`／`high_impact`。高風險指實施效力、強制適用、因果效果、精確效果量或政策採納結論。
- `source_checked`：人工確認確實取用原始文件（true/false）。
- `scope_checked`：是否有檢查學段、地域、規範效力或研究對象（true/false）。這是**主張的適用範圍**，不是 AI 素養範圍。
- `ai_lit_class`（A／B／C／unknown）、`ai_lit_dims`（教育部框架代碼陣列）、`ai_lit_note`（8–300 字，指出對應的內涵）：**AI 素養範圍**，依 [AI 素養範圍判斷準則](ai-literacy-scope-criteria.md)。
- `outcome_checked`：效果及數值是否有原文方法／結果依據（true/false）。
- `independent_review`：是否經**真人且不同核查者**核對高影響結論（true/false）。
- `conflict_unresolved`、`contradiction_type`：是否仍有未解決的原文／日期／樣本／效果數據衝突。
- `decision`：`publish` 或 `hold`。

## 最小機器判定邏輯

1. 兩類資料均需來源 URL、原文位置、查核日與 `source_checked=true`。沒有上述欄位，禁止把 `decision` 設為 publish。
2. 純書目事件 `bibliographic`：最低新聞 N-V1、研究 V1。
3. 一般事實摘要 `descriptive`：新聞最低 N-V2、研究最低 V2，且 `scope_checked=true`。
4. 高影響主張 `high_impact`：新聞最低 N-V3、研究最低 V3，並要求 `scope_checked`、`outcome_checked`、`independent_review` 均為 true；但**現行 `risk_tier=high` 仍一律禁止經自動路徑發布**，上述條件必要但不構成放行例外。
5. 任一未解決原始衝突、沒有明確來源或狀態 U/N-U，一律 hold。
6. **AI 素養範圍（2026-10-09 起，`research/ai-literacy-scope.js`）**：已登錄的新期別（週報、月報、每日短訊；九月兩份舊刊不追溯）中每則 publish 主張，`ai_lit_class` 須為 A 或 B，`ai_lit_dims` 至少一個有效代碼且不重複，`ai_lit_note` 須有理由；C、unknown 或缺欄位即擋下。每日短訊若候選池已有同一來源且記有 `ai_lit_class`，兩者須一致。欄位由篩選者自填，程式只防漏判，不能保證判得對。
7. `decision=hold` 不代表來源不存在；可能只是本刊沒有足夠資料。違規的 `decision=publish` 應被程式拒絕。
7. 同時包含政策及研究因果結論的主張，不能把兩種型態混成單筆已核准資料：須拆成各自 claim_id，分別通過門檻。

## 編輯核准、技術驗證及部署分界（D、G）

**編輯核准**：原文確實支持正文、必要限制已核對、未解衝突及 `hold` 不進正式刊物。**CI 成功**：證明資料欄位、快照及靜態文字規則通過，不能保證原始網站／翻譯真偽。**網站驗收**：確認主分支部署成功及公開頁面顯示與連結正常。

以下 V3／N-V3 及真人複核是必要證據條件，不是自動發布許可；現有 `validate-claims.js` **對所有 `risk_tier=high` 一律拒絕**。PR前須檢查公開Repo不含金鑰、個資、版權全文或內部機密。

## 實例測試（設計用合成案例，不代表真實新聞）

| 案例 | 輸入 | 預期 |
|---|---|---|
| T1 | 官方發布日可定位，N-V1，純事件 | publish |
| T2 | 只有 N-V1 卻宣稱全國已生效 | hold |
| T3 | N-V3 但來源有未解衝突 | hold |
| T4 | 高影響政策已核原文但沒有獨立真人複核 | hold |
| T5 | 一般政策摘要 N-V2、學段範圍核對 | publish |
| T6 | V1 論文書目消息 | publish |
| T7 | V1 論文卻寫因果成效 | hold |
| T8 | 大學實驗卻寫 K-12 直接有效且範圍未核對 | hold |
| T9 | V3 高影響研究結果，且已獨立複核、無衝突 | hold（high 不允許自動發布） |
| T10 | 缺原文定位的任何等級資料 | hold |

## 對已有資料的處置

先前 9/29–10/8 創刊特刊的四則新聞，在沒有逐項查核卡與原文位置之前，**不應宣稱整期均已達 N-V2 或 N-V3**。後續正式回查時，先抽取所有事實性主張、依來源定位建立查核資料，再由上述機器門檻測試「能否刊登」，不允許機器直接假定 `source_checked` 或 `independent_review` 為 true。

這是必要但非充分條件：**通過機器檢查仍需真正的來源查核**。
