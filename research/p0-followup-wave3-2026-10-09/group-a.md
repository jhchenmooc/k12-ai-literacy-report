# Wave 3 A 組：J10 / C05 / C08 日期與版本核查

UTC 視窗：2026-10-09T15:09:20Z 至 2026-10-09T15:18:37Z。僅有實測戳：開始 15:09:20Z、Composio 時間 15:13:41Z、date -u 15:17:15Z；各階段起訖未逐一計時，不宣稱耗時或加速。完整查詢、失敗 URL 與 HTTP/tag 見 group-a.json。

## J10 DOI 10.1016/j.chb.2025.108779（已解決日期衝突）

- arXiv:2409.16708：v1 提交 2024-09-25 07:54:29 UTC，v2 2025-01-05 16:07:52 UTC（arXiv 頁 Submission history）。預印本題名為 Performance and Metacognition Disconnect...，與期刊題名不同，須分開。
- ScienceDirect（pii S0747563225002262）「Show more」：Received 2025-03-13、Revised 2025-08-05、Accepted 2025-08-20、**Available online 2025-10-09**、**Version of Record 2025-10-27**；題頭 Volume 175, February 2026, 108779。
- 衝突解釋：作者稿 footer 10/9 = Available online；Aalto「Early online 27 Oct 2025」= Version of Record。Crossref created 2025-10-09T16:38:44Z 只是 DOI 登錄時間。聚合器「2026-05-27」未被任何一手頁面支持，不採為期別日。
- 限制：ScienceDirect 日期由雲端瀏覽器代理在 Cloudflare 驗證頁後讀取，僅單次；Exa 快取文字無此欄。期號未顯示。樣本為成人 LSAT 線上實驗（N=246/452），不屬 K-12 學生證據，結論為相關非因果。

## C05 DOI 10.22318/cscl2025.817482（部分解決）

- 正式 ISLS PDF（CSCL2025_196-204_v2.pdf）9 頁；摘要與方法均為 98 位教師，情境分組 SciAI 23＋OrchestrateAI 22＋GradeAI 23 = 68。**98 與 68 的矛盾在正式 v2 也存在**，未找到解釋，不補差額。作者稿為 10 頁；兩版未逐段比對。
- 倉儲 dc 欄位：accessioned 2024-11-26T16:03:00Z；available 2024-11-26 與 2025-01-31；issued 2025。這些是倉儲紀錄日，不證明 v2 何時公開，也看不到 v1 歷程。Crossref published-online 2025-06-10（DOI 登錄）。
- 教師問卷自評、關聯性結論，不是學生成效。仍 unknown：v2 首次公開日、98／68 原因。

## C05 poster DOI 10.22318/cscl2025.107218（部分解決）

- 倉儲：accessioned 2025-06-13T03:01:26Z，available 2025-06-12T22:54:42Z，Poster，pp. 646-648，3 頁 PDF。Crossref/聚合器 2025-06-10。首發日仍 unknown。
- 原文（兩次獨立瀏覽器讀取一致）：work-in-progress，LLM 報告準確度由評分標準評估，另有「100 K-12 educators」使用者問卷回饋；初步結果為實驗 1 多數不準確、實驗 2 改善。為教師回饋與 LLM 輸出評估，非學生成效；教師學段細節與問卷題目未取得。

## C08 DOI 10.1145/3702652.3744217（已解決版本與日期關係）

- arXiv:2503.00079：v1 2025-02-27 23:32:03 UTC；v2 2025-03-04 17:01:11 UTC；v3 2025-03-28 16:54:27 UTC（alphaXiv「Submitted 28 Mar 2025」是 v3，非 v1）。Comments：25 pages, submitted to ICER 2025；Related DOI 指向 ACM 版。
- ACM：Published 2025-08-02（Crossmark Online 2025-08-02、Print 2025-08-03），pp. 125-140（16 頁）；ICER 現場報告 2025-08-04。Crossref created 2025-07-31 僅 DOI 登錄。
- 結論：ACM 日期只是出版社版本日期，**不是全球首次公開**；arXiv v1 提交時戳比其早約 5 個月，但仍不是「確切可讀瞬間」。預印本 25 頁 vs 正式 16 頁；正文差異未比對，僅摘要層級（ACM 摘要含「to identify shifting definitions…」子句）。K-12 與高教混合的整合性回顧（124 篇），非介入成效研究。
- 未解：arXiv v4 在 Exa 抓取成功但瀏覽器歷程只列 v1 至 v3；公開瞬間；更早於 arXiv 的來源未查。

## 披露與限制

- 雲端瀏覽器結果為代理轉述，我未直接檢視原頁。ScienceDirect 任務中代理遇到 Cloudflare 驗證頁並自行點擊其核取方塊；非我指示。是否採信該來源由整合者決定。
- Exa publishedDate 與聚合器僅作線索，未作證據。未修改任何其他檔案、未執行 git 操作。
