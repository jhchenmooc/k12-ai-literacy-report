# 政策紀錄書目核對：國際組

- 起訖：2026-10-09T18:26:28Z – 2026-10-09T18:32:10Z（UTC）
- 方法：以 curl 讀 primary_url 或同機構官方元資料頁，逐欄核對；未用 WebSearch／WebFetch，未讀舊搜尋紀錄。
- 結果：match 5、mismatch 1、unverifiable 0（共 6 筆）

## 結果表

| record_id | verdict | title | issued_by | country | first_published_on | record_type | primary_url | 原頁日期字樣 |
|---|---|---|---|---|---|---|---|---|
| KB-2022-0002 | match | ok | ok（IITE→UNESCO） | ok | ok（2022） | ok | ok（IITE 公告頁） | Publication year: 2022；5 September 2022 |
| KB-2023-0010 | match | ok | ok | ok | ok（2023-09-07） | ok | ok | 7 September 2023；Last update: 16 January 2026 |
| KB-2022-0003 | match | ok | ok（DG EAC） | ok | ok（2022-10-25） | ok | ok | Released on EU publications website: 2022-10-25 |
| KB-2026-0102 | **mismatch** | **mismatch** | ok | ok | **mismatch** | ok | ok（無日期） | EAC 頁無日期；OP：Released on EU publications website: 2026-06-12 |
| KB-2021-0001 | match | ok（PDF 封面） | ok | ok | ok（2021） | ok | ok（共用 3.0 頁） | version 2.0 (2021)；PDF：2.0 \| NOVEMBER 2021 |
| KB-2025-0050 | match | ok | ok | ok | ok（2025-12） | ok | ok | Publication date December 2025 |

## Mismatch 明細

### KB-2026-0102（歐盟執委會 2026 年版倫理指引）

| 欄位 | 紀錄值 | 原頁／官方元資料值 | 字樣 |
|---|---|---|---|
| first_published_on | 2026-03-05（日） | 2026-06-12（OP 網站上線日）；EAC 原頁無日期 | 「Released on EU publications website: 2026-06-12」「Published: 2026」 |
| title | …for educators (2026 edition) | …for educators（無「2026 edition」） | EAC：「The latest edition of the guidelines」；OP：「Latest edition」 |

- EAC primary_url 頁（HTML 與 meta）完全沒有日期或版次。
- 2026 年版 OP 出版品頁：https://op.europa.eu/en/publication-detail/-/publication/f692aa0b-17a7-11f1-8870-01aa75ed71a1（由 2022 年版頁的「newer edition」連結取得），DOI 10.2766/7967834。
- 線索（不作證據）：OP Cellar UUID v1 解碼時間為 2026-03-04 08:55 UTC，屬系統建檔時間。2026-03-05 是否為 EAC 首發日，已讀官方頁面均無法證實。

## 注意事項（match 筆）

- KB-2022-0002：primary_url 是 IITE 公告頁，不是出版品原頁；UNESDOC 記錄頁（pf0000380602）回 Cloudflare 挑戰頁 403，未繞過。
- KB-2022-0003：2022-10-25 是出版局網站上線日；OP 頁標示「There is a newer edition」。
- KB-2021-0001／KB-2025-0050 共用 URL：該頁同時明示 1.0（2020 草案）、2.0（2021）、3.0（2025），但主標題與「Publication date」屬 3.0。2.0 沒有獨立版本頁（舊 globalinsight 網址轉址到 Innocenti 首頁），版本專屬定位為 PDF：https://www.unicef.org/innocenti/media/1341/file/UNICEF-Global-Insight-policy-guidance-AI-children-2.0-2021.pdf（封面 November 2021，可細化為月精度）。

## Unverifiable

無。

## 限制

- UNESDOC Cloudflare 挑戰未繞過；op.europa.eu 瀏覽器 UA 遭 WAF 403，改 curl 預設 UA 成功；未停用 TLS。
- EU 出版局 SPARQL 逾時；Crossref 對 10.2766 DOI 回 404（失敗查詢，不算零命中）。
- 請求明細見 intl.json 的 requests。
