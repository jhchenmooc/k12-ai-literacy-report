# 本機驗證與公開產物

使用 Node.js 22（與 GitHub Actions 相同）。在 repository 根目錄執行：

```sh
npm ci --ignore-scripts --no-audit --no-fund
node --test research/*.test.js
node research/validate-knowledge-base.js .
node research/render-knowledge-base-years.js
node research/validate-publication.js .
node research/render-site.js
node research/public-site.js . --build
```

HTML 閘門使用鎖定版本的 `parse5` 解析實際 DOM、屬性與 HTML entities。請提交 `package.json` 與 `package-lock.json`，CI 以 `npm ci` 安裝，不執行套件生命週期腳本。

修改資料或樣式後，可用 `node research/render-site.js --write` 更新產生的頁面，再執行不帶 `--write` 的檢查。排序使用固定字元順序及 ID 決定同名項目的次序，避免系統語系影響產物。

`.gitattributes` 固定程式與產生頁面的 LF；CSV、`publication/sources/` 和 `research/reference/` 保留原始位元組，避免改變原文證據雜湊。不要對整個專案進行換行正規化。

`research/public-site.js` 同時提供發布閘門與建置所用的公開檔案清單。新增公開頁面或資源時，須更新此清單並審查內容；新刊物須登錄 manifest。未知檔案、符號連結及非一般檔案會阻止建置。這份清單界定可部署的檔案，不能取代內容及證據的人工查核。

`--build` 只將清單中的檔案複製至 `_public_site/`；輸出目錄必須不存在或為空。重跑前請確認路徑，再移除先前的產物。建置不會自動刪除目錄，也不會發布網站。GitHub 的 verify 與 deploy 工作各自在新 checkout 中使用同一建置器。

每日待審包會讀取當期及較早週次工作表，讓延後查核與來源修正保持可見。歷史資料僅供背景及待複核，不會因此加入當期發布建議。舊版空白 scaffold 可相容讀取；有候選資料卻缺少搜尋紀錄、或搜尋紀錄型別錯誤時，會回報檔名並停止。完全相同的跨週紀錄會去重，內容不同的修正保留供編輯判斷。

同一來源的歷史未解決修正也會阻止當期發布建議及 daily 正式發布閘門。比對保留來源識別參數，只忽略已知追蹤參數；關聯候選 ID 與直接附在候選上的修正均納入。待審包會顯示仍未解決的舊修正，直到編輯明確完成複核。來源快照必須是 repository 中的一般檔案，禁止符號連結，SHA-256 比對原始位元組。

讀者回饋彙整會讀完所有分頁後才寫入摘要。API 失敗、格式錯誤、重複或重疊頁面均先停止，避免將不完整結果發布。測試使用模擬 API，不會寫入 GitHub。
