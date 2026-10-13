# 會議論文 2022–2024 補入知識庫（2026-10-13）

管理者 2026-10-12 指示補 2022–2024 年會議論文；文獻搜尋 session 以 OpenAlex 與 Crossref 檢索監測清單會議 C01–C22，4 個子代理依題名與摘要判讀；管理者 2026-10-13 採用收錄決定 D1–D5（私人 repo `from-literature-session/conf2224/combined/DECISIONS.md`）。本次寫入 `kb_intake=include` 的 278 篇。

## 寫入方式

- `record_type=conference_paper`；`year_basis=event_year`，`year_value` 為會議年；會議日期未核對，`first_published_on` 留空、`date_precision=unknown`。
- `verification_status=discovered_unverified`（網站「僅發現・未核」）；只放書目與代碼，不放摘要。
- 關聯：`has_category K2`、`published_in`（會議代碼）、`has_population`（身分；學段判讀為 unknown 或對象為職前師資生時不標學段）、`has_topic`、`has_method`（判不出不標）、`has_ailit_class`、`has_ailit_dim`，一律 `discovered_unverified`。
- 4 篇 ICCE 論文沒有 DOI，`primary_url` 用 APSCE 官方論文頁。
- 與既有知識庫以 DOI 與題名比對，無重複。
- 紀錄編號接續各年最大號：KB-2022-0064～0111、KB-2023-0093～0177、KB-2024-0173～0317；關聯 KR-9162～11546。

## 篇數

- 年份：2022 年 48、2023 年 85、2024 年 145。
- 範圍：A 類 208、B 類 70。
- 對象：學生 209、在職教師 43、職前師資生 17、其他教育關係人 9。
- 判讀信心：高 154、中 81、低 43；只看題名判讀（無摘要）37 篇。

| 會議 | 2022 | 2023 | 2024 | 合計 |
|---|---:|---:|---:|---:|
| C01 | 3 | 4 | 7 | 14 |
| C03 | 1 | 0 | 1 | 2 |
| C04 | 0 | 9 | 21 | 30 |
| C05 | 0 | 1 | 3 | 4 |
| C06 | 7 | 16 | 18 | 41 |
| C07 | 5 | 4 | 6 | 15 |
| C08 | 2 | 1 | 2 | 5 |
| C10 | 0 | 2 | 3 | 5 |
| C11 | 0 | 11 | 14 | 25 |
| C12 | 1 | 1 | 6 | 8 |
| C13 | 6 | 3 | 20 | 29 |
| C14 | 5 | 11 | 7 | 23 |
| C15 | 1 | 0 | 0 | 1 |
| C16 | 0 | 1 | 1 | 2 |
| C17 | 2 | 6 | 9 | 17 |
| C18 | 0 | 1 | 5 | 6 |
| C21 | 3 | 2 | 9 | 14 |
| C22 | 12 | 12 | 13 | 37 |

## 限制

- **涵蓋不完整**：SITE 與 SITE Interactive 2022–24、ICLS 2022、CSCL 2022、EDM 2024 取不到；EDM 2022–23、ICCE 2022、EC-TEL 2022–24、EAAI 2022–24 只取得部分（EAAI 無法與 AAAI 其他議程分離）。各會議、各年篇數不能用來比較研究多寡。
- 判讀為同一模型、未經人工或獨立審閱；待定 265 篇與未收 17 篇不在本次範圍（見私人 repo 決定檔）。
- 逐篇對照：[conf-2022-2024-intake.csv](conf-2022-2024-intake.csv)（紀錄編號、DOI、會議、年份、範圍、對象、學段、信心、判讀依據、OpenAlex ID）。
