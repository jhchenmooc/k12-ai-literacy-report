# P0 平行試行 C 組：C05–C08（2026-10-09）

本組獨占四個會議來源，只寫本檔及 `group-c.json`。已讀最新 SESSION-HANDOFF、v1.6 首發核查表、venue-watchlist 及主紀錄。工作範圍是 2025–2026-10-09 的定向搜尋；實際列出七個 2025 歷史樣本，2026 查詢未核實項目，不能宣称 2026 論文集不存在。未知搜尋總命中數全部維持 null；每來源均為 items_screened / partial，正式出版社全文已核讀數為 0。詳細精確查詢式、UTC 開始結束時間與逐項證據見 group-c.json。

| 來源 | 已列樣本 | 可讀證據與限制 | 裁決 |
| --- | ---: | --- | --- |
| C05 CSCL | 2 | 官方 ISLS 索引 metadata/abstract；handle/PDF 直接讀取 403 或 unavailable | 一篇 Long Paper、一篇 Poster；首發日期未知 |
| C06 SIGCSE TS | 2 | 官方會議摘要、作者 UNSW 書目；ACM DOI 原頁 403 | Poster 保留 partial；BOF 排除為實證研究 |
| C07 ITiCSE | 2 | 官方主會議 program、作者大學 repository 索引摘要；ACM 原頁受阻 | V.1 教師研究待核學段；V.2 成人 Poster 排除 K–12 直接證據 |
| C08 ICER | 1 | 官方研究議程、ACM 索引出版史、arXiv v3 方法段及版本紀錄；正式全文 403 | 混合 K–12／大學整合回顧，非因果 meta-analysis |

七個 DOI 在本組內無重複，與讀取的 records.csv DOI 無重複；整合者仍須重查最新 main 與其他兩組。未修改三張共用 CSV、候選、出版檔或交接檔，未 commit。

## 逐項來源與不可外推界線

1. [Toward Teacher-Centered AI Design](https://repository.isls.org/handle/1/11843)，DOI `10.22318/cscl2025.817482`，CSCL 2025 Long Paper，196–204。官方摘要列 98 位 K–12 教師問卷。沒有介入因果證據；first-public day 未知。PDF 名含 v2，版本最早公開另待核。
2. [Utilizing LLMs to Support Teacher Understanding of AI Literacy](https://repository.isls.org/handle/1/11944)，DOI `10.22318/cscl2025.107218`，Poster，646–648。工作進行中的教師支援設計；不能將預期成果當成已完成學生效果。
3. [Day of AI Australia](https://sigcse2025.sigcse.org/details/sigcse-ts-2025-posters/55/Day-of-AI-Australia-Teacher-Insights-from-a-Nation-Wide-AI-Literacy-Program-for-K-12)，作者機構書目對應 DOI `10.1145/3641555.3705158`。官方 Poster 摘要指課程對象為 10–16 歲，資料為逾 60 位教師課後回饋；不能當學生測驗因果證據。ORCID 報 2025-02-18，正式出版首發未在 ACM 原頁驗證，保留 unknown。
4. [Building Global AI Literacy](https://sigcse2025.sigcse.org/details/sigcse-ts-2025-birds-of-a-feather/19/Building-Global-AI-Literacy-Preparing-Teachers-for-the-Future-of-AI-Driven-Classroom)，作者 [UNSW 書目](https://research.unsw.edu.au/people/dr-jake-renzella/publications) 對應 DOI `10.1145/3641555.3705101`。2025-02-27 是 BOF 事件日；單頁 V.2 貢獻不是主會議實證研究。正式首發仍 unknown。
5. [From Teachers to Students: Evaluating Canvas City as a Path to AI Literacy](https://iticse.acm.org/2025/program/)，[作者大學 repository](https://kypseli.ouc.ac.cy/entities/publication/7ac4b4cb-42fe-4ff3-b7d3-a0540a9b70af) 列 DOI `10.1145/3724363.3729069`、V.1 16–22、Date Issued 2025-06-27、90 位 Prolific 教師。2025-06-30 是 program 演講日。教師實際學段尚未原文驗證，題名不能推導學生效果。[研究中心活動頁](https://www.cycat.io/events/30th-acm-conference-on-innovation-and-technology-in-computer-science-education-iticse-2025/) 的該 DOI 連結末碼被截斷，不匯入錯碼；以 repository 完整碼作待核。
6. ['AI Training Should Be for Everyone'](https://kypseli.ouc.ac.cy/entities/publication/e6532977-8876-4839-a94d-e543b8ab60f8)，DOI `10.1145/3724389.3730776`，V.2 778 單頁 Poster。36 人、18–30 歲非 K–12 樣本，排除直接學校證據。Repository 2025-06-27 僅 Date Issued，不能充當最早公開。
7. [ICER integrative review](https://doi.org/10.1145/3702652.3744217)，DOI `10.1145/3702652.3744217`。ACM 索引 Published 2025-08-02；會議 8/3–8/6。[arXiv 原始版本紀錄](https://arxiv.org/abs/2503.00079) 明列 2025-02-27 23:32:03 UTC v1 與 related ACM DOI，故同研究至少有更早 preprint。已讀 [v3 方法段](https://arxiv.org/html/2503.00079v3) 為 integrative review，124 為文獻數，混合 K–12 與大學，教師素養在 EC1 排除；不是 K–12 專屬介入效果 meta-analysis。正式全文未讀，保留 partial 與版本關係。

## 二輪獨立原始來源核查清單

- C08-01：優先重核 arXiv v1 時戳、related DOI 與 ACM Publication History；保留同研究較早公開反證，不把正式會議日期重新當研究首發。
- C05-01／02：重讀官方 PDF，核對教師樣本／work-in-progress，補版本與最早上線；受阻則維持 unknown。
- C06-01：教師回饋與學生學習效果分離，重核 ACM DOI、日期及 Poster 類型。
- C07-01：教師納入條件及學段、實驗設計、正式 DOI 完整碼及最早版本。學段未確認則維持 partial。

本批只更新歷史搜尋覆蓋與資料品質證據。九筆候選 hold、正式新期別零與 v1.6 出版安全閘門維持；不啟用搜尋／出刊排程。擴充六組前先比較組間實際時間、正式全文受阻比例與整合者補查負擔。
