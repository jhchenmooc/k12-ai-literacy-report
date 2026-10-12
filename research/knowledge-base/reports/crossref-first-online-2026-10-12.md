# 研究紀錄補首發日：Crossref 線上首發日（2026-10-12）

管理者 2026-10-12 決定：知識庫中以卷期年歸類（`year_basis=issue_year`，網站「卷期年（首發日未知）」）的研究紀錄，以 Crossref 登記的線上首發日補上首發日。

## 查詢

- 對象：`records.csv` 中 `year_basis=issue_year` 的 869 筆（期刊論文 751、會議論文 116、專書章節 2），全部有 DOI。
- 來源：Crossref REST API `https://api.crossref.org/works/{doi}`，2026-10-12T21:09Z–21:11Z（UTC）查詢，869 筆全部回應 200。取 `published-online`、`published-print`、`issued` 三個日期。
- 逐筆結果：[crossref-first-online-2026-10-12.csv](crossref-first-online-2026-10-12.csv)（查得的線上日、紙本日、處理與理由）。

## 規則

填入首發日（`first_published_on`＝Crossref `published-online`，精度依登記到日或月；`year_basis` 改 `first_publication`；`year_value` 改為該日期的年份），須同時符合：

1. Crossref 有 `published-online`，且不晚於查詢日。
2. 若同時有 `published-print`，線上日不晚於紙本日（比到兩者共同的精度）。線上日晚於紙本卷期日時，首發可能是紙本，判不出來，不填。
3. 線上年與原卷期年相差不到兩年（本次沒有相差兩年以上者）。
4. 紀錄為 `discovered_unverified`。「書目已核」紀錄的日期須對過原頁，不以 Crossref 覆寫。

所有填入者 `verification_status` 維持 `discovered_unverified`（網站「僅發現・未核」）：Crossref 是出版者登記的資料，本次沒有讀出版者原頁。另檢查填入者的線上日都等於 Crossref `issued`（Crossref 記錄的最早日期）。

## 結果

| 處理 | 筆數 |
|---|---:|
| 填入首發日（期刊 504、會議 68；到日 566、到月 6） | 572 |
| 不填：Crossref 無線上首發日 | 284 |
| 不填：線上日晚於紙本卷期日 | 11 |
| 不填：書目已核紀錄 | 2 |
| 合計 | 869 |

不填者維持卷期年。

### 歸屬年份改變的 18 筆

17 筆由 2026 改為 2025（2025 年線上先行刊出、2026 年才排入卷期），1 筆由 2025 改為 2026（KB-2025-0206：Crossref 線上 2026-04-21、紙本 2026-09-30，原歸 2025 的依據不明）。

KB-2025-0062、0063、0064、0091、0093、0094、0100、0101、0105、0108、0109、0111、0116、0117、0119、0120、KB-2026-0053（2026→2025）；KB-2025-0206（2025→2026）。紀錄編號不變（編號中的年份只是入庫批次，不是歸屬年份）。

## 限制

- Crossref 日期由出版者自行登記，有的出版者把線上日登記成卷期日或上傳日；本次未逐筆讀原頁。被週報或月報引用時，仍依既有流程讀原頁再升為「書目已核」。
- 只動日期欄位，不改標記、關聯或核對程度。年度論文趨勢報告使用自己的語料與年份，不受影響。
- 重建知識庫索引與網站頁面；網站上的年份分組與快速索引數字隨之變動。

## 第二輪：其餘 297 筆（管理者 2026-10-12 決定）

Crossref 無線上首發日或判不出首發的 297 筆，再逐組查（2026-10-12 UTC 21 時，Crossref 完整紀錄與出版者原頁）。逐筆結果：[first-online-rest-2026-10-12.csv](first-online-rest-2026-10-12.csv)。

| 分組 | 筆數 | 依據 | 處理 |
|---|---:|---|---|
| IEEE Transactions on Learning Technologies 15、Contemporary Educational Technology（Bastas）1 | 16 | 出版者原頁（瀏覽器讀取 IEEE Xplore「Date of Publication」、期刊頁「Published Online」） | 填入首發日 |
| Taylor & Francis 3、Springer 1、ACM 期刊 1 | 5 | Crossref 出版者登記的「Published online／First Online」；紙本卷期日為名目封面日 | 填入線上日 |
| Routledge 專書章節 | 2 | Crossref 專書出版日（`published-print`）；專書出版即章節首發 | 填入出版日 |
| AERA 年會 38、IEEE ICALT 2、ACM 會議 6、ISLS CSCL 2 | 48 | 首次公開為會議發表；會議日期見 CSV | `year_basis` 改 `event_year`（網站「會議年（首發日未知）」） |
| Elsevier 期刊 | 226 | ScienceDirect 拒絕自動讀取；Crossref 與 Elsevier API 無線上首發日 | 維持卷期年 |

- 填入者 `date_precision=day`、`year_basis=first_publication`；年份都沒有改變。所有紀錄的核對程度不變（ISLS 2 筆維持「書目已核」，只改年份依據）。
- Elsevier 226 筆只查得 DOI 登記日（Crossref `created`，OpenAlex `publication_date` 與之相同），不等於首發日，不填入。其中 5 筆 DOI 登記年與卷期年不同，可能歸錯年，待以一般瀏覽器開 ScienceDirect 讀「Available online」後補：KB-2027-0001（登記 2026-08-28）、KB-2026-0150（2025-12-04）、KB-2026-0155（2025-11-29）、KB-2026-0215（2025-12-13）、KB-2026-0233（2025-10-28）。

## 第三輪：Elsevier 待查 5 筆（2026-10-12，管理者提供出版者 PDF）

管理者以一般瀏覽器下載 5 篇的出版者 PDF（ScienceDirect 正式版），由首頁的「Available online」讀出首發日並填入；核對程度不變。PDF 不納入公開 repo。

| 紀錄 | 文章 | Available online | DOI 登記日 | 歸屬年份 |
|---|---|---|---|---|
| KB-2026-0233 | Teaching and Teacher Education 169 (2026) 105270 | 2025-10-28 | 2025-10-28 | 2026 → 2025 |
| KB-2027-0001 | Computers & Education 256 (2027) 105745 | 2026-08-28 | 2026-08-28 | 2027 → 2026 |
| KB-2026-0155 | Computers and Education Open 10 (2026) 100320 | 2025-11-29 | 2025-11-29 | 2026 → 2025 |
| KB-2026-0150 | Computers and Education Open 10 (2026) 100321 | 2025-12-04 | 2025-12-04 | 2026 → 2025 |
| KB-2026-0215 | Computers and Education Open 10 (2026) 100325 | 2025-12-13 | 2025-12-13 | 2026 → 2025 |

5 篇的 Available online 都與 Crossref DOI 登記日（`created`）同日。這 5 篇是因年份不符而挑出，不是隨機樣本；其餘 221 筆 Elsevier 是否可用 DOI 登記日代替首發日，須另以隨機抽樣核對後再決定，本輪不改。

## 第四輪：其餘 Elsevier 以 DOI 登記日補首發月（管理者 2026-10-12 決定）

**隨機抽查**：其餘 221 筆 Elsevier 以 Python `random.seed(20261012)` 抽 10 篇，管理者以一般瀏覽器下載出版者 PDF，讀出「Available online」，與 Crossref `created`（DOI 登記時間，UTC）比對：同日 5 篇、DOI 登記晚 1 天 4 篇、早 1 天 1 篇，沒有相差 2 天以上者。連同第三輪 5 篇（全部同日），15 篇都在 ±1 天內，差異可能來自時區。

**處理**（逐筆結果：[elsevier-doi-date-2026-10-12.csv](elsevier-doi-date-2026-10-12.csv)）：

| 處理 | 筆數 |
|---|---:|
| 抽查 10 篇：填 PDF 的 Available online，精度到日 | 10 |
| 其餘：以 DOI 登記日的年月填首發日（`date_precision=month`，網站顯示「YYYY-MM 首發」） | 202 |
| 不填：DOI 登記日在月初或月底，±1 天可能跨月（甚至跨年），維持卷期年 | 9 |
| 合計 | 221 |

- 歸屬年份都沒有改變；核對程度維持「僅發現・未核」。
- 以 DOI 登記日代替首發日是推定：抽查只涵蓋 Elsevier 的 4 種期刊（C&E: AI、C&E、C&E Open、TATE），其他 Elsevier 期刊或較早年份的登記習慣可能不同。被週報或月報引用時，仍讀出版者原頁。

## 補記：月初月底 9 筆（PR #271）

第四輪未填的 9 筆（KB-2022-0026、KB-2023-0073、KB-2024-0046、0090、0150、KB-2025-0018、0309、0353、KB-2026-0231），已由文獻搜尋工作階段依管理者提供的全文 PDF 補首發日（精度到日；Elsevier 7 筆取 Available online，IJAIED 2 筆取 Springer 原版 Published online），見 PR #271。至此研究紀錄已無「卷期年（首發日未知）」。
