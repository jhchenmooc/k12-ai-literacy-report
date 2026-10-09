# 擴充期刊 J40–J42 補搜（2025-01-01～2026-10-09）

> **性質：人工搜尋輔助的整合紀錄，不是認證。** 子代理與整合者為同一模型，**不算獨立審閱**。候選池、`publication/issues.json`、`research/drafts/`、閘門未動；網站只動 `render-site.js --write` 產生區塊。

## 範圍與方法

- 監測清單 v1.4（#124）新增的擴充三刊：J40 Interactive Learning Environments（OpenAlex S90466346）、J41 Computers and Education Open（S4210232537）、J42 Informatics in Education（S2764653341）。
- 每刊三組布林查詢（AI literacy／AI education × K-12／school；GenAI／ChatGPT／LLM × K-12／secondary／primary；AI literacy／AI education × teacher），另讀全刊題名補查（程式依 AI 詞過濾後人工初篩；**無法以單一布林查詢重現**）。只依 OpenAlex 摘要判斷，未讀出版社頁。**所有請求均未帶 email 或 mailto。** 細節與每次請求見 [bf.md](bf.md)、[bf.json](bf.json)。UTC 19:39:04–19:48:37。
- 學段依管理者 2026-10-09 規則：在職中小學（含幼兒園至高中）教師算 K-12；職前教師、師培另標師培；混合未寫主要對象記不明。國別只記摘要明寫的國名（形容詞如 Turkish、Swiss 不記）。

## 結果

| 刊 | 範圍內總數 | 逐篇篩選 | 候選 | 師培 | 待判 | 排除 | 已在庫 |
|---|---|---|---|---|---|---|---|
| J40 | 670 | 90 | 14 | 5 | 24 | 47 | 0 |
| J41 | 181 | 36 | 6 | 12 | 8 | 10 | 0 |
| J42 | 41 | 16 | 6 | 2 | 1 | 7 | 1（KB-2026-0128） |

**管理者決定（2026-10-09）**：
1. 入庫 K-12 22 筆；整合者把 3 篇候選改為待判：`infedu.2025.00`（社論）、`10494820.2026.2734311`（early childhood／preschool，比照先前 `s44436` 處理）、`10494820.2026.2692615`（GenAI 主要為學習工具）。
2. 師培 19 筆入庫，加關聯 `has_population` → `TEACHER_ED`（職前教師／師培課程；可入知識庫，不進週報、每日短訊候選）。
3. 每刊一筆 search run：`P0-20261009-BF-J40/J41/J42`（`items_screened`／`partial`；`results_seen`＝範圍內總數、`results_screened`＝逐篇篩選數、`results_recorded`＝入庫數）。

## 入庫

- K-12 22 筆、師培 19 筆，共 41 筆（KB-2025-0059～0074、KB-2026-0139～0163），全部 `journal_article`、`discovered_unverified`、首發日 unknown、`year_basis=issue_year`；題名與年份以 Crossref 重抓核對一致；`published_in` 為 J40／J41／J42。逐筆清單見 bf.md 候選與 teacher_ed_fit 兩節。
- 有成效或前後測敘述者在 bf.json 標 `high_risk`（標得偏寬，例如 SEM 路徑效果也標），不寫成成效主張。
- records 218→259、relations 568→681、search runs 240→243。測試未修改；本機 `node --test research/*.test.js` 202／202 通過。

## 待判（36 篇，只在 bf.json）與限制

- J40 無摘要 7 篇（含 `2744403`，題名寫 K-12）、社論 4 篇、摘要未寫學段 10 篇；J41 3 篇未寫學段（`caeo.2025.100303` 主題切合）；混合學段 2 篇；主題邊界 4 篇（教師 AI-TPACK／AI 自我效能、小學家長、學生 AI 使用知覺）；`basic school`、職業教育各 1；上列改判 3 篇。
- 題名補查先以程式過濾 AI 詞，未逐篇讀摘要的作品（J40 約 305、J41 約 80 篇題名含 AI 詞）以題名判為工具、高教或非 AI 主題，可能漏收。
