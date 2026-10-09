# v1.7 第四階段：歷年分類索引與資料品質摘要

> 2026-10-09。索引由 `research/validate-knowledge-base.js` 的 `index(records,relations)` 確定性產生，`indexes/index.json` 是唯讀衍生結果；CI 檢查它和三張資料主表一致。

## 當前可用索引

- **年份＋依據**：`by-year/unknown/unknown`，九筆尚無核實首發日期；不能把發現日 2026-10-09 當作 2026 年首次公開。
- **文獻類型**：`by-type/journal_article` 3 筆、`by-type/source_document` 6 筆。
- **知識分類**：K2 學術研究（3）、K4 教學師培（2）、K5 工具及治理（1）、K6 教育活動（3）。K1、K3 目前尚無已歸類實體；不能填入臆測紀錄。
- **期刊監測 ID**：J02（1）、J06（1）；僅代表兩篇既有書目與期刊關聯。其他 37 本期刊、21 個會議目前尚無這九筆資料的有效關聯，不代表沒有相關論文。
- **官方來源機構**：O-HK-EDB（2）、O-UNESCO（1）。使用 `issued_by` 而不是錯誤的 `published_in`。
- **國家、會議、主題**：索引函式已支援 `applies_to_country`、`studies_country`、會議 `published_in`、`has_topic`；現有九筆未有足夠經核實的具體值，不建立推測標籤。合成測試確認生成函式正確。

## 防止誤讀

- 分類關係 14 筆均是 `discovered_unverified`；它們根據現有來源標題、URL／DOI 及候選資料建立查閱入口，而不是出版資格或政策效力核證。
- 原始 `records.csv` 九筆、`relations.csv` 及 `search_runs.csv` 彼此分離；搜尋紀錄無可核實實際執行批次時維持空白，不偽造來源覆蓋率。
- 對不同事件較早公開、卷期日與首次公開日的衝突，仍交由原有 v1.6 出版流程判斷。A07 的 `hold` 不受歷史索引影響。
- 本階段以分類索引**可重建**及已收資料的資料品質驗證為驗收；不是 39 本期刊、21 個會議的歷年文獻全面蒐集成果。

## 下一階段

以官方公開原始頁面能核實的政策與研究，逐批新增歷年記錄、首發精度、國別及主題關聯；依 PR 與 CI 驗收。後續每季／每年來源增刪檢閱制度沿用 `research/source-registry-and-review-policy-v17.md`，目前未啟用排程。
