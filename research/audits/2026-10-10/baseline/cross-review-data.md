# DATA-01／02／06 安全與發布角度交叉複核

只讀 data.md、data-repro.cjs、data-repro.log、對應實作及主控 SOP；未重跑測試，未修改正式程式。

- **DATA-01：保留 P2，已確認。** canonical 的 path lowercasing 與未知 query 刪除確實讓兩種反例只保留一筆 items。候選工具的直接契約是 editorial-workflow-master.md:181 的保守去重；KB schema 是跨工具一致性佐證，不能冒稱它直接規定候選格式。影響應精確說第二來源完整候選內容未保存，URL 仍保留為 unresolved，且 unresolved 可能錯掛第一來源並連帶阻止第一來源提名；不要稱資料全部消失或直接影響正式 gate。
- **DATA-02：保留 P2，已確認。** truthy 非字串 update_note 在 ingest-candidates.js:24–30 兩個分支皆漏接，只有 duplicate count，沒有 review_required 記錄。SOP:207 要求無更新理由的重複仍記待核對。探針的 suggested_for_publication 含 review_only:true，故影響限於編輯待審提示／提名，不能稱正式發布已放行。要觸發需不合法輸入；這是輸入處理與更新追蹤缺陷。
- **DATA-06：保留 P2，已確認。** create 只讀昨日所屬週稿，必然漏掉舊週稿昨日完成核證的項目。SOP:205 有核證完成日重新列入待審包，:207 明示跨週只做背景，足以支持期望，不僅是產品需求猜測。directOld.pending=1 只證明低階函式識別核證日，不能證明其舊週分類適用於現在。修復時必須依當前 issue week 重新分類歷史項目為 background；不可直接拼接舊 dailyBrief 的 suggested 清單。這是待審包覆蓋問題，不是正式出版失效。
