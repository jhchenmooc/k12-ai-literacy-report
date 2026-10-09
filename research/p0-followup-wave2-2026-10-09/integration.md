# P0第二波：九來源少量樣本平行初篩

基準main `6afbbfea5faf6891f4af21a9fe0bfcb91d1a6807`；第一波[PR #91](https://github.com/jhchenmooc/k12-ai-literacy-report/pull/91)最新HEAD verify [37943747596](https://github.com/jhchenmooc/k12-ai-literacy-report/actions/runs/37943747596)成功後以expected_head_sha合併，main [37943852243](https://github.com/jhchenmooc/k12-ai-literacy-report/actions/runs/37943852243) verify/deploy均成功才啟動第二波。

帳號5小時使用74%、每週23%，本批以三組、每來源至多一個代表樣本與少量條件查詢執行，保留獨立核查及整合額度；不是九來源全面／系統性回顧。A J15–J17、B J18–J19/C09、C C10–C12來源责任不重疊，只寫各自暫存；正式三表及候選／manifest由中央雜湊核對後獨占寫入。

## 逐源裁決

| 來源 | 列出樣本 | 中央裁決與限制 |
|---|---:|---|
| J15 | 1 | Undergraduate研究，且是既有audit線索重訪；排除K–12直接證據，日期unknown，非新發現。 |
| J16 | 1 | 12th-grade ELA質性／social design-based研究；出版社indexed題名/DOI/online2026-08-04明列，可入歷史書目。62 essays不等學生數；獨立核查讀到n69、不同分析集合，不能混用或作因果優效。 |
| J17 | 1 | 統合分析正式身份可定位；學段分布／原始研究設計與偏差仍未完整核查，維持暫存。Prediction interval與non-significant moderators不支持普遍K–12因果效果或教法優越。 |
| J18 | 1 | SAGE首發online2024-12-06、issue2026-02；範圍外背景。pre-K–12身障學生AI工具介入不等直接AI素養成效。 |
| J19 | 1 | 整合者直接讀SAGE題名、DOI、online2025-10-30與Review article；混合學段概念綜述／提案模型，可作歷史書目，不是已驗證成效或具效力政策。 |
| C09 | 0 listed | 三次實際查詢，未取得可核實樣本；僅query_scoped/partial，總命中unknown。0列出/入庫不是0命中。 |
| C10 | 1 | Springer直接元資料：First Online2025-09-02、citation/copyright2026、EC-TEL2025；TOC Poster，五位國中教師焦點團體，可入書目，不採學生效果。 |
| C11 | 1 | APSCE正式頁DOI/Published2025-12-01；正式PDF選定方法，小六單校145招募、15訪談，配對分析保留分母unknown；無對照描述。可入書目，full/short未確認。 |
| C12 | 1 | Author preprint系統demo、ACM原文受阻；示例國中代數非已招募學生介入。正式日期／篇型unknown，保留暫存，arXiv submission不是精確first-public。 |

八樣本、八個規範化DOI，組間及既有32主紀錄匹配0；J15在舊audit出現過，不能當八篇全部新發現。七筆其他樣本是本批新增線索；只選四筆歷史書目（J16/J19/C10/C11），不為湊數入庫待核或排除項。日期只記被確認的出版社manifestation，不認證全球最早公開／所有預印本。所有主紀錄仍bibliographic_checked；没有完整正式全文逐段核讀，沒有content_checked提升。

九source-specific run全部partial、results_seen空白unknown；八來源items_screened、C09 query_scoped。組C原暫存coverage_level使用query_scoped_partial合成字串，中央正式映射依實際逐篇樣本為items_screened，沒有升級全文。正式表預期records32→36、relations74→82、runs25→34，唯一來源ID17→26/60；來源ID計數包括入口／條件搜尋等不同深度，**不是26來源全面查核完成**。

## 計時、二輪與驗收

| 組 | 開始UTC | 原文查核結束UTC | 寫檔後clock UTC | 起始clock至交付 |
|---|---|---|---|---:|
| A | 14:26:13 | 14:27:21 | 14:28:55 | 162秒 |
| B | 14:26:32 | 14:27:48 | 14:29:17 | 165秒 |
| C | 14:26:49 | 14:28:38 | 14:30:21 | 212秒 |

共用dispatch參考14:25:47至最後交付14:30:21為274秒，包含依序啟動；三組clock起始至最早交付重疊126秒。B/C部分逐查詢精確時戳仍未留存，以null及觀測窗記錄；未用補造時間填平。組耗時相加539秒不是實測串行比較，費用/token unknown，不報加速倍數或成本。

未參與第一輪、未讀組別結論的四筆二輪核查見[JSON](second-round.json)／[報告](second-round.md)，原始頁／選定正式PDF／作者原始摘要的可讀範圍明列；兩輪同模型家族AI不是真人review。不能將索引片段／選定段落視為正式全文已完整閱讀。

中央CSV round-trip、安全衍生匯出、ID/DOI/日期/來源一致性、既有索引重建及195項regression須實際通過；最新PR HEAD verify成功才合併，main verify/deploy另核。九候選hold、source_checked=false、manifest零期別與v1.6规则保持。無自動發刊、排程或新服務。

下一批仍P0：C09正式AACE論文集與可核樣本、J17學段與原文研究品質；上波J10日期、C05分母/版本/首發、C06原文、C07/C08正式版本差異；政策版本與其餘J20–J39/C13–C22逐優先級分批。先再看usage及整合負擔，不直接擴充六個同時搜尋者、不啟動P1/P2。實站／試算表及正向新訊端到端驗收仍待，不能用本PR CI代替。

整合後195/195tests、CSV安全/round-trip、知識庫/年度索引/出版驗證成功；36records/82relations/34runs。J16日期中央依官方indexed DOI與latest-articles確認，獨立核查直接入口403仍unknown，不宣稱雙輪日期確認。第二輪14:29:58–14:32:59為181秒。usage96%/27%，不再啟第三批或額度重置。
