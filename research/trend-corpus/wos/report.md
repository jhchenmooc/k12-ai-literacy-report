# D7 Web of Science 對照結果（2025，2026-10-11）

> 方案第 2.4 節、§10 第 22 項：只作限制說明與方法檢查，不據此擴詞或停止。檢索與做法見 [README.md](README.md)；WoS 匯出檔（含摘要）只放 scratchpad，本目錄只存 UT、DOI、年份、期刊代碼與歸類。

## 1. 檢索與比對

- WoS Core Collection 以 `query-single.txt` 檢索，**2,226 筆**（PY 2024–2026，Article／Review；J02 未收錄，實際比較 46 刊，命中分布見 `summary.json` 的 `by_journal`，有命中的面板期刊 32 刊）。
- 以小寫 DOI 比對 OpenAlex 2025 主查詢聯集（`2025/corpus-v2.csv`，1,861 篇），不在聯集者以 DOI 查 OpenAlex 全庫（`scripts/wos_compare.py`）：

| 歸類 | 筆數 | 說明 |
|---|---:|---|
| `in_union` | 804 | 已在 2025 聯集 |
| `oa_other_year` | 1,371 | OpenAlex 年份不是 2025（多為 WoS PY 2024 或 2026；WoS PY 是卷期年），不算漏收 |
| `oa_2025_not_in_union` | **10** | 候選漏收 |
| `not_in_openalex` | 10 | DOI 在 OpenAlex 查無（年份無法判定），另列 |
| `no_doi` | 31 | 另列，不算漏收 |

## 2. 候選漏收 10 篇

- **候選漏收率：**10／(804＋10)＝1.2%（Wilson 95% 0.7%–2.2%），分母只含 OpenAlex 年份為 2025、WoS 也命中者。
- **原因（逐篇查 OpenAlex，`candidates.csv`）：**
  - 8 篇是 OpenAlex 文件類型與 WoS 不同而被 `type:article|review` 排除：book-chapter 5、editorial 2、supplementary-materials 1。WoS 都標為 Article 或 Review。
  - 1 篇 OpenAlex 摘要含 ChatGPT，但以 `title_and_abstract.search` 查同一 ID 得 0（檢索索引與摘要不一致）。
  - 1 篇 OpenAlex 無摘要，題名寫「GPT-4.0」，`title.search:"GPT-4"` 查不到。
  - 沒有一篇是詞組本身漏列。
- **範圍判斷（全數判，不抽樣；n＜100 故種子 20281268 未使用）：**A 2、B 6、C 1、不明 1；A 類 2 篇的對象都不在主要分母（大學生 1、職前教師 1），**屬主要分母者 0 篇**。

## 3. OpenAlex 查無 10 篇

- DOI 在 OpenAlex 查無，多為 2025 年底至 2026 年初上線（WoS PY 2025 6 篇、2026 4 篇），推測是 OpenAlex 收錄時間差。
- 範圍判斷：A 3、B 5、C 2；**屬主要分母 2 篇**（都是 WoS PY 2026、K-12 在職教師與生成式 AI）。OpenAlex 年份未知，不計入 2025 漏收，列為收錄時間差的限制。

## 4. 判讀與限制

- 在 WoS 也收錄的 46 刊範圍內，OpenAlex 2025 主查詢的候選漏收約 1%，且都不屬主要分母；漏收原因是 OpenAlex 的文件類型、檢索索引與摘要缺漏，不是詞組設計。
- 報告限制應寫入：（1）OpenAlex 文件類型錯標會讓少數期刊論文被排除；（2）OpenAlex 摘要缺漏或檢索索引不一致；（3）OpenAlex 收錄有時間差，最新論文可能尚未收錄；（4）J02 不在 WoS，該刊無法外部對照；（5）WoS 有詞形還原、OpenAlex 有詞幹處理，組合與 A 組子查詢的欄位比對方式不同。
- 範圍判斷由同一模型（`claude-opus-5-5`）依 `prompts/scope.md` 完成，輸入為 WoS 題名與摘要，不算獨立審閱。
- 先行檢查（`ALL=(ai literacy)`）見 [ai-literacy-check.md](ai-literacy-check.md)，結論一致。
