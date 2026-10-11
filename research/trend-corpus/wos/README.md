# D7 Web of Science 對照（2025）

結果見 [report.md](report.md)。

方案第 2.4 節、§10 第 22 項（管理者 2026-10-11：先只做 2025 一年，在四年合併報告前完成，不擋回溯；結果只作限制說明與方法檢查）。

- **檢索式：**`queries.txt`（由 `scripts/wos_query.py` 產生）。詞組與 2025 主查詢（DEV-001 重跑版：M1–M7、C1–C4、A1–A6）相同，檢索欄位用 TI＋AB 對應 OpenAlex `title_and_abstract.search`；限面板 47 刊的 84 個 ISSN；PY 2024–2026（WoS 的 PY 是卷期年，取前後各一年）；文件類型 Article、Review。
- **執行紀錄：**2026-10-11 管理者以 `query-single.txt`（#1–#5 合成單一字串；檢索歷史編號因中途另查而錯位，合併式查無結果）檢索 WoS Core Collection（Editions: All（實際只含 SCI-EXPANDED、SSCI、CPCI-S、CPCI-SSH、CCR、IC，不含 ESCI）），得 **2,226 筆**。#1 單獨為 95,938 筆；WoS 的「Did you mean」拼字建議會改動 AI4K12、Cognimates、PopBots、LearningML 等詞，不採用。
- **匯出：**原定只需書目與 DOI；實際由管理者匯出 Full Record（含摘要，Tab delimited），每檔上限 1,000 筆；匯出檔只放 scratchpad，不 commit。
- **比對（已完成，結果見 report.md）：**`scripts/wos_compare.py`，以小寫 DOI 比對 `2025/corpus-v2.csv`（＝`rerun-dev001/2025` 主查詢聯集 1,861 篇）；不在聯集者以 DOI 查 OpenAlex 全庫，歸為 `oa_other_year`（OpenAlex 年份不是 2025，不算漏收）、`oa_2025_not_in_union`（候選漏收）、`not_in_openalex`；沒有 DOI 者 `no_doi` 另列，都不算漏收。輸出 `wos-compare.csv`（只有 UT、DOI、年份、類型、期刊代碼與歸類，不含題名與摘要）與 `summary.json`。
- **抽樣判 A／B：**候選漏收以種子 20281270（2025 年、用途代碼 10「WoS 對照抽樣」，新增，記入 DEVIATIONS 的 DEV-013；原誤寫為用途代碼 8，已於 2026-10-11 更正）抽 100 筆（不足 100 全判），依 `prompts/scope.md` 判 A／B／C／不明；報候選漏收篇數、其中主要分母比例與 Wilson 95% 區間，只作限制說明與方法檢查，不據此擴詞或停止（另訂門檻須管理者決定）。
- **J02 未收錄（2026-10-11 管理者確認）：**Computers & Education: Artificial Intelligence 以 `SO=` 與 `IS=(2666-920X)` 檢索 WoS Core Collection（Editions: All）皆 0 筆，正式對照只比其餘 46 刊；J02 是面板中 AI 論文最多的期刊之一，列為限制。 （2026-10-11 補：本次可用的 WoS 版本不含 ESCI，47 刊中只有 32 刊有命中，對照約涵蓋一半的 2025 年檢索結果，見 report.md 第 4 節。）
- **期刊覆蓋：**`summary.json` 的 `by_journal` 列出各面板期刊在 WoS 的命中數；WoS 未收錄的面板期刊列為限制。
- **與 OpenAlex 的差異：**WoS 有詞形還原（lemmatization），OpenAlex 有詞幹處理；組合與 A 組子查詢在 OpenAlex 是對題名＋摘要整體比對，WoS 拆成兩邊各自在 TI 或 AB 比對，可能略有出入，列為限制。
