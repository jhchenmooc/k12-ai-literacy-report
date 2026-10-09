# B1 其餘待判複核（2026-10-09）

> **性質：人工搜尋輔助的整合紀錄，不是認證。** 三組子代理與整合者為同一模型，**不算獨立審閱**。候選池、`publication/issues.json`、`research/drafts/`、閘門未動；網站只動 `render-site.js --write` 產生區塊。

## 範圍與方法

- B1（[group-b1-1/2/3](../p0-b1-2026-10-09/)）留下的待判中，#113 已處理 IDC、AERA；本批處理其餘 69 件：J20 9、J21 3、J24 10、J25 1、J26 3、J29 16、J32 3、J34 2、J27 1、C13 CHI 15、C15 FAccT 3、C16 CSCW 2、C18 ICALT 1。
- 每件都嘗試讀摘要（OpenAlex、Crossref abstract、arXiv 同題、可直接讀的出版者頁如 Frontiers）；Elsevier、Springer、SAGE、ACM DL、IEEE 擋自動讀取，未繞過、未停用 TLS。**所有請求均未帶 email 或 mailto。**
- 基準 main `0f84592`；雜湊見 [baseline-sha256.txt](baseline-sha256.txt)，入庫前核對一致（main 其後的 #116、#117 未動知識庫三表）。UTC：J20–J26 18:59:16–19:08:52、J27–J34 18:59:15–19:02:53、會議 18:59:15–19:05:25。證據：[j1](j1.md)、[j2](j2.md)、[conf](conf.md) 及同名 JSON。

## 結果

| 組 | 待判 | 候選 | 重複 | 排除 | 仍待判 | 入庫 |
|---|---|---|---|---|---|---|
| J20–J26 | 26 | 2 | 0 | 1 | 23 | 0 |
| J27–J34 | 22 | 2 | 0 | 10 | 10 | 1 |
| CHI／FAccT／CSCW／ICALT | 21 | 5 | 0 | 1 | 15 | 4 |
| 合計 | 69 | 9 | 0 | 12 | 48 | 5 |

**管理者決定（2026-10-09）**：照整合者建議入庫 5 件；J25 `14749041261473066`、J26 `2024.2438933`（摘要只寫 schools，比照先前「只寫 schools 者維持待判」）、J32 `00924-6`（跨學段回顧）、CHI `3791483`（校外 AI 迷因，AI 素養只在結論）維持待判。

## 入庫明細（全部 `discovered_unverified`、首發日 unknown、`year_basis=issue_year`；題名與年份以 Crossref 重抓核對一致）

| record_id | DOI | 來源 | 類別 | 國別（摘要明示） | 學段原話 |
|---|---|---|---|---|---|
| KB-2026-0123 | `10.3389/feduc.2026.1929017` | J29 | K2 | US;IN;QA;CO;PH | K-12 in-service teachers |
| KB-2026-0124 | `10.1145/3772318.3790908` | C13 | K5 | US;ZA;TW | 30 K-12 teachers |
| KB-2026-0125 | `10.1145/3772363.3798981` | C13 | K2 |  | primary-school children aged 6–11 |
| KB-2026-0126 | `10.1145/3772363.3799047` | C13 | K6 |  | ages 8–12（規劃中研究，4 頁 EA） |
| KB-2026-0127 | `10.1145/3772318.3790584` | C13 | K5 | US | middle and high schools；20 educators |

- records 202→207、relations 527→546、search runs 103→116（每來源一筆 `P0-20261009-B1P2-*`，`items_screened`／`partial`）。測試未修改；本機 `node --test research/*.test.js` 201／201 通過，CI verify 內容本機均通過。

## 仍待判（48 件）與限制

1. 摘要不可得：J20 8、J24 9、CHI 2025 6、FAccT 3、CSCW Companion 1、IEEE TLT 1 等；高相關但只能由題名看學段者：TATE `105032`（初中 AI 課程實施）、AI & Society `02749-1`（學校 AI 教育）。
2. 學段未明示（只寫 teachers、schools、youth）或主題邊界（工具採用、AIED 倫理、AI 教育科技資料公平）者，見各 group md。
3. arXiv export API 多次 429，改用 arxiv.org 搜尋頁；alphaXiv 只作線索。類別為建議值，未讀全文。
