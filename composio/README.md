# Composio 自動化層（規劃）

## 階段

1. **設計系統與網站（進行中）**：`assets/design-system.css`、`design-system/index.html`；之後逐步將新頁面改用共用樣式。
2. **搜尋與蒐集來源（下一步）**：以 Composio 工具搜尋新聞／政策／學術來源，寫入候選清單。

## 階段 2 設計草案

- 輸入：`research/venue-watchlist.csv`（34 期刊、19 會議）及機構來源表。
- Composio 搜尋工具取得候選 → 輸出 JSON，欄位對齊 `research/ingest-candidates.js` 的格式。
- 候選一律為 **U（未驗證）**，須走 `research/news-policy-verification.md` 與 `research/evidence-safety-gates.md`；自動化不得直接發布。
- 憑證僅放 GitHub Secrets（`COMPOSIO_API_KEY`），不進 repo。
- 以排程 workflow 每日產生候選 PR，不直接推 main。

## 待決定

- 蒐集結果存放處（repo JSON、Google Sheets 或 Notion）。
- 使用哪些 Composio toolkit（搜尋來源、通知管道）。
