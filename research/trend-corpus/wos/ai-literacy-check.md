# 先行檢查：WoS `ALL=(ai literacy)` 對 OpenAlex 2025 主查詢聯集（2026-10-11）

> 不是 D7 正式對照（正式對照用 `queries.txt`）。管理者以 `ALL=(ai literacy)` 檢索 WoS Core Collection 得 5,868 筆，分 6 檔匯出（Full Record，含摘要，只放 scratchpad、不 commit）。本檔只記筆數與歸類。

- **範圍：**以 `scripts/wos_compare.py --panel-only` 篩面板 ISSN、PY 2024–2026、Article／Review，得 386 筆。
- **歸類：**`in_union` 121、`oa_other_year` 243（多為 WoS PY 2024 或 2026）、`no_doi` 5、`not_in_openalex` 1、`oa_2025_not_in_union` 16。
- **16 筆候選逐筆查 OpenAlex：**
  - 13 筆在 OpenAlex 題名與摘要中沒有「AI literacy」：WoS 的 ALL 欄位含作者關鍵字與 Keywords Plus，不符方案「題名＋摘要」定義，不算漏收。
  - 2 筆 OpenAlex 沒有摘要：題名子查詢只看題名，詞只出現在摘要時會漏，列入限制（OpenAlex 摘要缺漏）。
  - 1 筆 OpenAlex 類型為 editorial、WoS 為 Article：被 `type:article|review` 排除，列入限制（類型差異）。
- **其他：**同日另檢 WoS 高被引／熱門論文 188 筆時，另見 1 筆 2023 年論文被 OpenAlex 標為 book-chapter 而排除。面板期刊 J02（Computers & Education: Artificial Intelligence）在這批匯出中沒有紀錄，待正式對照確認 WoS 是否收錄。
- **判讀：**只涵蓋一個詞，不推估漏收率；結果併入 D7 正式對照的限制說明。
