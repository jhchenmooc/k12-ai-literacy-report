# 本週候選池 AI 素養範圍與對象補判（2026-10-09）

> **性質：人工搜尋輔助的範圍判斷，不是認證。** 判讀由文獻搜尋 session 完成（子代理與整合者為同一模型，不算獨立審閱），寫入由編輯 session 執行（搜尋 session 寫入 `research/drafts/` 被自動權限檢查擋下，依管理者指示改由編輯 session 寫入）。

- **對象**：`research/drafts/2026-10-09_2026-10-15.json` 的 10 筆候選（W2026-10-09-A01～A10）。
- **依據**：[AI 素養範圍判斷準則](../ai-literacy-scope-criteria.md) v0.4；與 #134、#135 對同一來源的知識庫紀錄（KB-2026-0001～0009、KB-2026-0051）判讀一致。
- **寫入範圍**：每筆只加 `ai_lit_class`、`ai_lit_dims`、`ai_lit_note`、`audience` 四欄；`decision`（全部 hold）、`source_checked`（全部 false）與其他欄位不動。
- **寫入後檢查**：
  - 刪掉四欄後與原檔逐字相同。
  - 10 筆都通過 `research/ai-literacy-scope.js` 的 `candidateScope`。
  - A04、A07 的 C 類與 `research/ai-literacy-c-records.json` 一致。
- 逐筆數值見 [scope.json](scope.json)。

## 結果

| 候選 | 類別 | 面向 | 對象 | 摘要 |
|---|---|---|---|---|
| A01 | A | S-BAS、S-ETH | k12 | 12–15 歲青少年與家長的戶外 AI 素養活動 |
| A02 | A | T-PD、T-ETH | k12 | 香港教育局中學教師 AI 素養與網絡安全研討會 |
| A03 | A | T-TEA、T-PD | k12 | 香港小學英文教師生成式 AI 教學培訓 |
| A04 | C | — | adult | 非洲 TVET 綠色技能系列，AI 只出現在課名 |
| A05 | A | T-ETH、T-PD | k12 | 西班牙幼教與小學教師的生成式 AI 顧慮與培訓需求 |
| A06 | A | T-ETH | other_stakeholders | 批判性 AI 素養線上座談，對象為一般教育工作者 |
| A07 | C | — | k12 | 墨西哥校園行動裝置規範，未涉及 AI |
| A08 | A | S-BAS、S-ETH | k12 | K-12 AI 教育提升 AI 素養的統合分析 |
| A09 | A | S-BAS、S-ETH | k12 | K-12 師生對分齡 AI 素養指引的接受度（僅依題名） |
| A10 | A | T-TEA、T-PD | higher_ed | 中國職業教育教師 AI 教學自我效能（中職 378 屬 K-12、高職院校 390 屬大專；大專略多） |

## 待管理者決定

- ~~**A10 對象**~~：管理者 2026-10-09 決定記 `higher_ed`（可進月報，不進週報與每日短訊）。樣本為中國大陸在職教師：中職（secondary vocational schools，K-12）378 人、高職院校（higher vocational colleges，大專）390 人。先前誤把高職院校寫成「高職以上」並暫記 `k12`（#148），已更正。
- ~~**A06 對象**~~：管理者 2026-10-09 決定「一般教育工作者」算其他教育關係人，維持 `other_stakeholders`。
- **A04 對象**：技職教育人員暫填 `adult`；已判 C，本來就不會刊出。
