# 政策紀錄書目核對：亞洲組

- 起訖 UTC：2026-10-09T18:26:27Z – 2026-10-09T18:32:28Z
- 結果：match 13／mismatch 5／unverifiable 1（共 19 筆）
- 請求數：26（明細見 asia.json `requests`）

## 結果表

| record_id | 國別 | verdict | 原頁日期字樣 | HTTP | 不符／無法核對欄位 |
|---|---|---|---|---|---|
| KB-2023-0003 | JP | match | (令和5年5月19日)Chat GPT 等の生成AI の学校現場の利用に向けた今後の対応について；PDF：令和５年５月１９日 | 200 | — |
| KB-2023-0004 | JP | match | (令和5年7月4日)…作成について(通知)；PDF：令和５年７月４日 | 200 | — |
| KB-2024-0005 | CN | mismatch | 2024-12-02　来源：教育部 | 200 | title |
| KB-2026-0088 | CN | unverifiable | — | — | title、issued_by、applies_to_country、first_published_on、record_type、primary_url |
| KB-2020-0001 | KR | match | 2020-11-20；附件「[교육부 11-20(금) 10시30분보도자료]」 | 200 | — |
| KB-2022-0001 | KR | match | 2022-08-11；正文「8월 11일(목)」 | 200 | — |
| KB-2023-0005 | KR | match | 2023-06-08 | 200 | — |
| KB-2025-0043 | KR | match | 2025-11-10 | 200 | — |
| KB-2025-0044 | KR | mismatch | 2025-12-23；附件「[교육부 12-24(수) 조간보도자료]」 | 200 | first_published_on |
| KB-2023-0006 | HK | match | Date : 19 June 2023 | 200 | — |
| KB-2026-0089 | HK | match | 17/06/2026 [EDBC No. 11/2026] The release of the Blueprint… | 200 | — |
| KB-2026-0090 | HK | mismatch | 封面「Prepared by the Curriculum Development Council / Published by the Education Bureau, HKSARG / 2026」 | 200 | first_published_on |
| KB-2026-0091 | HK | mismatch | 封面「Published by the Education Bureau, HKSARG / 2026」 | 200 | first_published_on |
| KB-2026-0092 | HK | match | Date : 21 July 2026 | 200 | — |
| KB-2023-0007 | SG | match | Published on: 07 Feb 2023 | 200 | — |
| KB-2023-0008 | SG | match | Published on: 20 Sep 2023 | 200 | — |
| KB-2026-0093 | SG | match | Last Updated: 31 Jul 2026（更新日） | 200 | — |
| KB-2026-0094 | SG | mismatch | Published on: 03 Mar 2026 | 200 | title |
| KB-2026-0095 | TW | match | 日期：115-05-21 | 200 | — |

## mismatch 明細

### KB-2024-0005
- 欄位：title
  - 紀錄值：教育部办公厅关于加强中小学人工智能教育的通知（官方新闻：教育部部署加强中小学人工智能教育）
  - 原頁值：教育部部署加强中小学人工智能教育
  - 原頁字樣：近日，教育部办公厅印发通知，探索中小学人工智能教育实施途径，加强中小学人工智能教育。
- 附註：日期 2024-12-02 為新聞發布日；原頁未明寫通知本身的發布日

### KB-2025-0044
- 欄位：first_published_on／date_precision
  - 紀錄值：2025-12（month）
  - 原頁值：2025-12-23（頁面登記日）；附件標 12-24(수) 조간
  - 原頁字樣：2025-12-23；[교육부 12-24(수) 조간보도자료]
- 附註：原頁日精度日期有兩個（登記日 12-23 與報紙早報禁發日 12-24），若紀錄因此刻意取月精度，需在紀錄附註說明；本核對不判定取哪一天

### KB-2026-0090
- 欄位：first_published_on／date_precision
  - 紀錄值：2026-06-17（day）
  - 原頁值：2026（year）
  - 原頁字樣：封面：2026
- 附註：2026-06-17 可在藍圖專頁（KB-2026-0089 primary_url）的 EDBC No. 11/2026 日期找到，但不在本筆 primary_url 上
- 附註：因只目視封面、前兩頁與末頁，不能排除內頁另有日期

### KB-2026-0091
- 欄位：first_published_on／date_precision
  - 紀錄值：2026-06-17（day）
  - 原頁值：2026（year）
  - 原頁字樣：封面：2026
- 附註：同 KB-2026-0090：日精度日期只見於藍圖專頁
- 附註：不能排除內頁另有日期

### KB-2026-0094
- 欄位：title
  - 紀錄值：MOE Committee of Supply Debate 2026: “Four Learns” approach to strengthen students' AI literacy（Response by MOS Jasmin Lau; COS 2026 announcements）
  - 原頁值：MOE Committee of Supply Debate 2026 Response by Minister of State for Education Jasmin Lau
  - 原頁字樣：grep「Four Learns」0 筆；「announcement」0 筆；原頁有 We want every student to "learn about AI, learn to use AI, learn with AI, and most importantly, learn beyond AI".

## unverifiable 原因

- KB-2026-0088：curl（-L，瀏覽器 UA，經 agent proxy、TLS 驗證開啟）讀官方原頁；HTML 以 Python -I 去標籤；PDF 以 pdftotext 抽文字；4 次嘗試（18:26:52Z、18:27:56Z、18:30:31Z、18:30:56Z）皆 curl (35) Recv failure: Connection reset by peer；agent proxy 狀態頁記錄 www.moe.gov.cn:443 tunnel closed (code 1006)。未改走 http、未停用 TLS 驗證

## 其他附註（match 但值得留意）

- KB-2023-0003：primary_url 為彙整頁而非文件本身；該頁目前主推 Ver.2.0（令和6年12月26日）
- KB-2023-0004：primary_url 與 KB-2023-0003 相同（彙整頁）；頁面標題為「生成AIの利用について：文部科学省」
- KB-2020-0001：primary_url 為新聞稿頁，政策文件為其附件 PDF（未下載）
- KB-2023-0006：record_type 判斷依據：通告本身為公告性質，內容為兩套課程單元；如專案規則要求以載體分類，可再議
- KB-2026-0089：頁尾「Last revision date: 01 July 2019」為版型殘留，非發布日；日期依據為頁面列出的 EDBC No. 11/2026 發布通告日期
- KB-2026-0092：藍圖專頁註明該 Strand 文件本身「Chinese version only」；本筆 primary_url 為英文通告
- KB-2026-0093：紀錄題名為頁內段落標題，非頁面標題
- KB-2026-0095：院會日不等於教育部發布日；本筆紀錄的 issued_by 為行政院，與原頁一致

## 限制

- 只讀 primary_url 原頁（日本另讀該頁連出的兩份通知 PDF 作為補充）；未使用 WebSearch／WebFetch；未讀 research/p0-bpol-2026-10-09/。
- 中國教育部 www.moe.gov.cn 間歇性 connection reset（agent proxy 記錄 tunnel closed code 1006）；KB-2026-0088 四次皆失敗，未改走 http、未停用 TLS 驗證。KB-2024-0005 第 3 次成功，伺服器將 https 轉址至 http 同路徑。
- 香港 Supplement I／II PDF 為圖像無文字層，環境無 OCR；僅以低解析度影像目視封面、前 2 頁與末頁，不能排除內頁有其他日期。
- 韓國 moe.go.kr 本次 5 頁皆一次成功（HTTP 200）。新加坡 MOE 本次 curl 可讀到伺服器端渲染內容（與工具指南 3.7 所記「JS 空頁」不同）。
- record_type 是否「合理」屬判斷；HK 兩筆以通告為 primary_url 但記為 framework，判為可接受並附註。
- 原頁含聯絡人姓名、電話等個資，未寫入本檔；未存全文。
