# P0 三組試行：A 組 J10／J11 暫存初篩

2026-10-09 執行，完成觀測 13:41:35 UTC。起始時計回應未保存，不能虛構耗時；由整合者的 dispatch/completion 時計估計。可重現的 30 個實際查詢字串、範圍限制與逐項 evidence 在 `group-a.json`。

已讀最新 SESSION-HANDOFF、v1.6 核查表、watchlist 和現有 records。搜尋目標為 2025-01-01–2026-10-09 的 AI 素養、生成式 AI、批判思考與 K–12；實際是 web-engine 定向查詢，不是出版社完整日期篩選。大量查詢會混入引用本刊的其他來源及同名姊妹刊，已按正式刊名／DOI 區分。

ScienceDirect 直接 open 多次回 Internal Error；官方頁的搜尋索引可取得書目、摘要及部分方法／限制段落。**兩來源均 items_screened / partial，總命中 unknown，全文查核 0。** J10 2 樣本、J11 3 樣本不等於整刊完整覆蓋，未取到全文的項目不標 full_text_checked。

| 樣本 | DOI／正式出版社頁 | 可證範圍與裁決 |
|---|---|---|
| A-J10-01 | [10.1016/j.chb.2025.108779](https://www.sciencedirect.com/science/article/pii/S0747563225002262) | AI 與 LSAT 推理／後設認知兩研究；未證 K–12 樣本，排除直接 K–12 證據。2026-02 為卷期。作者原始紀錄／作者持有出版稿日期存在 2025-10-27 vs 2025-10-09 衝突，first-online unknown。 |
| A-J10-02 | [10.1016/j.chb.2025.108838](https://www.sciencedirect.com/science/article/pii/S0747563225002857) | 三所大學橫斷問卷／SEM 與多組分析；高教排除。2026-02 卷期，first-online unknown。 |
| A-J11-01 | [10.1016/j.chbr.2026.101041](https://doi.org/10.1016/j.chbr.2026.101041) | 香港中學生兩波 AI 素養測驗／網絡分析，保留 partial 書目線索。2026-05 卷期；首發日 unknown。原文限制為一份測驗及香港樣本，未直接評估實作表現。 |
| A-J11-02 | [10.1016/j.chbr.2025.100833](https://www.sciencedirect.com/science/article/pii/S2451958825002489) | MASEM；摘要談 K–12／高教，但納入研究及分組細节未全文核實。保留 partial 背景，不能當 K–12 專屬效果研究。2025-12 卷期；首發日 unknown。 |
| A-J11-03 | [10.1016/j.chbr.2025.100724](https://www.sciencedirect.com/science/article/pii/S2451958825001393) | 12 位應用科技大學本科程式學習者訪談／主題分析；高教排除。2025-08 卷期；首發日 unknown。 |

五個 DOI 在讀取時未見 records.csv 已有紀錄；正式整合需再對最新主表和其他組去重。姊妹刊 Computers in Human Behavior: Artificial Humans、其他刊物及 2024 書目只是檢索噪音，不混記成 J10/J11 樣本。

第二輪需獨立核查 A-J10-01 的日期衝突、招募及後設認知外推；A-J11-01 的 middle-school 方法與網絡因果／課程建議；A-J11-02 的 K–12 分組、原始納入研究及 intention vs 學習效果。保留 unknown／partial，不使用因果結論或高風險效果數字。所有最早公開／預印本日期尚未確證。

本組未改正式 CSV、索引、handoff、九筆候選、claims 或 issues，未 commit。全部是歷史書目初篩，不是當週首發新聞；v1.6 與九筆 hold 維持。
