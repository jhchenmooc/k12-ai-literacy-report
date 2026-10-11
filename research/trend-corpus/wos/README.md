# D7 Web of Science 對照（2025，準備中）

方案第 2.4 節、§10 第 22 項（管理者 2026-10-11：先只做 2025 一年，在四年合併報告前完成，不擋回溯；結果只作限制說明與方法檢查）。

- **檢索式：**`queries.txt`（由 `scripts/wos_query.py` 產生）。詞組與 2025 主查詢（DEV-001 重跑版：M1–M7、C1–C4、A1–A6）相同，檢索欄位用 TI＋AB 對應 OpenAlex `title_and_abstract.search`；限面板 47 刊的 84 個 ISSN；PY 2024–2026（WoS 的 PY 是卷期年，取前後各一年）；文件類型 Article、Review。
- **匯出：**只需書目與 DOI（Tab delimited，Record Content「Author, Title, Source」即可），每檔上限 1,000 筆；匯出檔只放 scratchpad，不 commit。
- **比對（待匯出後）：**以小寫 DOI 比對 `rerun-dev001/2025` 主查詢聯集；WoS 有、OpenAlex 主查詢聯集沒有者，先以 DOI 查 OpenAlex 全庫，屬其他年份者不算漏收；沒有 DOI 者另列。差集抽樣判 A／B。
- **與 OpenAlex 的差異：**WoS 有詞形還原（lemmatization），OpenAlex 有詞幹處理；組合與 A 組子查詢在 OpenAlex 是對題名＋摘要整體比對，WoS 拆成兩邊各自在 TI 或 AB 比對，可能略有出入，列為限制。
