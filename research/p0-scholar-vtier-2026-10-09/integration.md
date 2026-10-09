# V 級學者 2026 依作者檢索：40 篇逐篇篩選與入庫（2026-10-09）

> **性質：人工搜尋輔助的整合紀錄，不是認證。** 篩選子代理與整合者為同一模型，**不算獨立審閱**。候選池、`publication/issues.json`、`research/drafts/`、閘門未動；網站只動 `render-site.js --write` 產生區塊。

## 範圍與方法

- 輸入：編輯 session 的 V 級學者 2026 概覽（[v-2026-runs.json](v-2026-runs.json)，26 位學者，publication_date 2026-01-01..2026-10-09）中關鍵字粗分為 K-12＋AI、且不在知識庫的 40 篇（[todo.json](todo.json)）。
- 分兩批（[screen-a](screen-a.md)、[screen-b](screen-b.md)）：OpenAlex 作品資料（作者 ORCID 與單位、摘要）、Crossref 書目；逐篇判作者歸屬、學段、主題、版本（預印本只當線索）、與知識庫去重。**所有請求均未帶 email 或 mailto。**
- 學段依管理者 2026-10-09 規則：中小學在職教師算 K-12；職前教師、師培另標「師培」；混合且未寫主要對象者記「不明」。

## 結果

| 批次 | 篇數 | 入庫 | 待判 | 排除 | 主題符合但非 K-12 |
|---|---|---|---|---|---|
| A 批 | 20 | 5 | 3 | 11 | 1 |
| B 批 | 20 | 4 | 3 | 13 | 0 |

（上表已套用下方第 2 點改判；子代理原建議見各批 md。）

**管理者決定（2026-10-09）**
1. 子代理建議入庫的 6 篇照入庫。
2. **新規則：教師 AI-TPACK／生成式 AI 教學培訓研究屬「教師專業面向的 AI 素養」**，不再一律判「AI 只當工具」。學段規則不變（K-12 在職教師才算 K-12；職前另標師培；學段不明者待判）。本批因此改判：
   - `10.58459/rptel.2026.21041`（新加坡 K-12 在職教師 PD，i-TPACK）：待判 → 入庫。
   - `10.1007/s44163-026-01456-0`（阿聯 K-12 在職教師 8 週 GenAI 課程調適培訓，TPACK）：排除 → 入庫。
   - `10.30935/cedtech/17983`（阿聯在職教師 TAM-TPACK-GenAI 接受度；摘要寫 teachers of grades 4-9）：排除 → 入庫（邊界：屬接受度而非能力，管理者可再議）。
   - `10.1016/j.caeai.2026.100599`（26 國在職教師 TPACK-GenAI）：排除 → 待判（摘要只寫 in-service teachers／school level，未寫學段）。
   - 此規則尚未回溯套用到先前批次被判 tool_only 的教師 TPACK／GenAI 研究。
3. 26 筆 V 級查詢寫入 `search_runs.csv`（`P0-20261009-SCHOLARV-<ID>`）；`results_screened` 為關鍵字 K-12＋AI 子集（含已在庫者），`results_recorded` 為本次入庫且歸到該學者的篇數（一篇多位學者者各計一次）。

## 入庫明細（全部 `discovered_unverified`、首發日 unknown、`year_basis=issue_year`；題名與年份取自 Crossref）

| record_id | DOI | 出處 | 監測代碼 | 類型 | 類別 | 國別 | 命中學者 |
|---|---|---|---|---|---|---|---|
| KB-2026-0164 | `10.1111/bjet.70069` | British Journal of Educational Technology | J04 | 期刊 | K2 |  | V26 |
| KB-2026-0165 | `10.1080/15391523.2026.2661641` | Journal of Research on Technology in Education | J08 | 期刊 | K1 |  | V13、V14 |
| KB-2026-0166 | `10.1080/08872376.2026.2632617` | Science Scope | — | 期刊 | K4 |  | V24、V25 |
| KB-2026-0167 | `10.4324/9781003607304-10` | Routledge 專書章節（AI in Early Childhood Education） | — | book_chapter | K2（高風險） |  | V11 |
| KB-2026-0168 | `10.4324/9781003661443-5` | Routledge 專書章節（AI in Literacy Education） | — | book_chapter | K4（高風險） |  | V19 |
| KB-2026-0169 | `10.1145/3815598.3815638` | FDG 2026 | — | 會議 | K2（高風險） |  | V26 |
| KB-2026-0170 | `10.58459/rptel.2026.21041` | Research and Practice in Technology Enhanced Learning | J43 | 期刊 | K4（高風險） | SG | V10 |
| KB-2026-0171 | `10.1007/s44163-026-01456-0` | Discover Artificial Intelligence | — | 期刊 | K4 | AE | V12 |
| KB-2026-0172 | `10.30935/cedtech/17983` | Contemporary Educational Technology | — | 期刊 | K4 | AE | V12 |

- 國別只在摘要明寫國名時記錄。
- `book_chapter` 為知識庫首次使用的類型；`render-site.js` 目前只把期刊論文、會議論文列入網站研究清單，這 2 筆在網站上暫不顯示。

## 待判（6）

- A 批：`10.5040/9781350518810`（幼兒 CS／AI 專書，作者歸屬未能以單位核實）、`10.2139/ssrn.7330465`（SSRN 預印本，無正式版）、`10.3102/2283935`（AERA 海報，無摘要、無單位）。
- B 批：`10.1007/978-3-032-29773-0_25`（無摘要，題名只寫 adolescents）、`10.1016/j.ssaho.2026.103755`（只寫 rural schools）、`10.1016/j.caeai.2026.100599`（第 2 點改判，學段不明）。
