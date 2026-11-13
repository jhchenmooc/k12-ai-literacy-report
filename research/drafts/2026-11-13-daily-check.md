# 每日短訊查核紀錄：2026-11-13（2 則）

> 每日短訊例行作業，由排程觸發，在每日短訊專用 session 執行。今天週五（新一週候選池 2026-11-13_2026-11-19 以 scaffold-weekly.js 建檔）。
> - **檢索：** 由同一 session 的三個子代理分頭執行（國際研究、國際政策、臺灣中央來源），判讀由本 session 複核。子代理只查一次、不迴圈等待，三組都在 6 分鐘內回報。
> - **查詢時間：** 2026-11-13T00:24Z–00:33Z（UTC）。
> - **請求紀錄：** 都沒帶 email 或 mailto；沒換 User-Agent。T&F、ACM、MDPI、journalajess 出版社頁回 403 或 Cloudflare 驗證頁；Federal Register public inspection 文字頁回擋頁（改讀 PDF）；UNESCO 兩篇單篇頁回拒絕頁；皆未繞過。
> - **結果：2 則。** 國際研究 2 則（皆只發書目）；國際政策 0 則；臺灣 0 則。

## 本期項目

| 編號 | 來源 | 首發日（依據） | 範圍 | 對象 | 型態 |
|---|---|---|---|---|---|
| D20261113-01 | Interactive Learning Environments（J40）〈Generative AI as an interactive learning environment in early childhood…〉 | 2026-11-10（Crossref published-online；T&F Cloudflare） | A（S-BAS） | k12（土耳其公立幼兒園 22 名 5–6 歲幼兒；依 2026-11-12 學前規則） | 只發書目（摘要只見於 OpenAlex） |
| D20261113-02 | Education Sciences（J47）〈Effectiveness of an AI-Based Adaptive Assessment System … Grade 8 Mathematics: Protocol…〉 | 2026-11-12（Crossref published-online；MDPI 403） | B（S-LRN） | k12（八年級） | 只發書目（研究計畫書，尚未蒐集資料） |

- **-01：** 11-12 列入瀏覽器清單（當時無摘要）；11-13 回查 OpenAlex 已有摘要，Crossref 仍無，故只發書目。第二輪：引句、日期、作者、分類、範圍說明通過；中文篇名後半句改寫為「將學前兒童萌發的 AI 素養視為協作說故事中社會分散式的詮釋工作」。
- **-02：** 研究計畫書，Crossref 摘要寫明 "No participant data have been collected"，不寫任何成效。分類 B 或 C 邊界：學生直接操作 AI 驅動的適性評量工具，第二輪判 B（不屬僅為系統後端）。第二輪依建議改寫中文篇名、分類理由改為預定語氣。
- **知識庫另加（不發）：** IICFE `10.59482/iicfe.2026.5.23.01`（韓國小學 AI 社交機器人融合教育課程）依管理者 2026-11-12 決定（丙）只入知識庫：候選 W2026-11-13-A03 維持 hold，KB-2026-0565（discovered_unverified；Crossref 只有 published-print 2026-11-04）。
- **候選池與知識庫：** W2026-11-13-A01～A03（batch 2026-11-13-daily-1）；KB-2026-0563～0565。

## 國際

### 研究查詢

| 來源 | 查詢 | 狀態 | 結果 |
|---|---|---|---|
| Crossref | from／until-created 11-12～11-13，六組關鍵詞，rows=60 | 200 | 總數 655／579／1261／2575／398／1157 |
| Crossref（proceedings-article） | 同日期 | 200 | 764 筆，取 40；無 K-12 合格項目 |
| Crossref（監測期刊 ISSN） | 29 個 ISSN；帶與不帶關鍵詞 | 200 | 有篇數：J07、J09、J14、J29、J31、J32、J33、J37、J40、J47、J48、J49、J51、J52；K-12 AI 相關只有 J47 educsci16111942 |
| 教學代理人 | Crossref × 期刊／會議；OpenAlex；arXiv | 200 | 無合格項目 |
| arXiv | API 三組（11-06 後）；cs.CY、cs.HC /new | 200 | /new 仍顯示 11-11（週三）批次；無合格 K-12 項目 |
| alphaXiv | discover_papers | 成功 | 10 筆，9 筆已判過；2611.11673 判 C |
| 回查 | ILE 2762001；educsci16111928 | 200 | ILE：OpenAlex 已有摘要 → D20261113-01；educsci16111928：OpenAlex 無全文，學段分布仍不明，audience 維持 unknown |

**觀察（清單外；管理者決定是否單篇例外）：**
- Leadership and Policy in Schools（T&F）`10.1080/15700763.2026.2762927`：迦納公立基礎教育學校校長的 AI 任務選擇性整合；Crossref 2026-11-12；無摘要（T&F 403、OpenAlex 未收錄）；暫判 A（T-BAS），other_stakeholders。
- Open Journal of Social Sciences（SCIRP）`10.4236/jss.2026.1411010`：八年級 82 人生成式 AI 回饋與英文寫作遷移（準實驗；作者自述不宜因果解釋）；出版社頁 2026-11-12；B（S-LRN）；出版商品質訊號弱。
- IJRISS `10.47772/ijriss.2026.1026edu0707`：菲律賓 7–10 年級 152 人 AI 使用與學業表現（相關研究）；Published 2026-11-07；B（S-LRN）；投稿到接受 5 天。
- Journal of Education and Training Studies `10.11114/jets.v15i1.9327`：印尼職業高中 113 人 AI 輔助專題式情境學習；2026-11-11；B（S-LRN）。
- Asian Journal of Education and Social Studies `10.9734/ajess/2026/v52i113475`（奈及利亞高中生 120 人 ChatGPT 使用與學術誠信，A，S-ETH）、`10.9734/ajess/2026/v52i113473`（菲律賓小學教師 6 人 AI 備課，A，T-BAS）：Crossref 2026-11-12；出版商品質訊號弱。

**不收（摘要）：** IIARD `jbgr…pg69.76`（品質疑點）；PLASU 兩篇（投稿與刊出同日）；JIPSI `jipsi.v5i4.2694`（3 天刊出）；Sage Sphere `hn001w30`（依 11-11 決定不列入）；Journal of the Edutainment 兩篇（只有 print 日、可能在窗口外）；`10.70847/743884`（只有年份）；TOCE `3860998`（無 AI，C）、`3862759`（higher_ed）；higher_ed 6 篇；teacher_ed 6 篇；`s44163-026-02494-4`（adult）；窗口外 4 篇；其餘 C。

### 政策查詢

| 來源 | 狀態 | 結果 |
|---|---|---|
| GOV.UK | 200 | DfE、Ofqual、Ofsted 37 筆，content API 逐篇查 AI：〈Parent, pupil and learner voice: June 2026〉（11-10）AI 只在一處順帶提及，C；RISE West Midlands 頁 2025 首發、11-10 只更新社群名單，不收；UK–Norway AI 聯合聲明無教育內容 |
| Federal Register | 200 | 11-13 期 API 尚未載入；public inspection 11-13 期 ED 1 件 2026-23155（IES／NCEE 特教評估研究 RFI，AI 只一句），C |
| MEXT | 200 | 報道発表無新項目；新着 4 件無 AI；mext_00750 文字版仍未上傳 |
| 中國教育部 | 200 | 約 7 篇；1458085（海外中文教學 AI 助教）、1458040，C |
| 香港政府新聞公報 | 200 | 11-12 全日英 32、中 35 則，無 K-12 AI（教育條例修訂草案無 AI）；11-13 尚無稿 |
| 韓國教育部 | 200 | 107628（4.16 記錄物研討會），無 AI |
| 韓國 KICE | 200 | 沒有新項目 |
| 韓國 KERIS | 200 | 554〈AI for ALL, 모두를 위한 AI 교육과 교원양성〉論壇：對象為職前教師，teacher_ed，不進每日短訊（月報可收） |
| UNESCO newsroom | 200（單篇頁回拒絕頁，未繞過） | 2 則，依列表 metadata 無 AI |
| Eurydice | 200 | 沒有新項目 |

- **E5a：** 11-06～11-13 未見漏收。

## 臺灣

| 來源 | 狀態 | 新筆數（11-12 08:24 後） | AI 命中 |
|---|---|---|---|
| 教育部即時新聞 RSS | 200 | 5 | 0（〈秒懂AI不是夢！2026教育部終身學習樂園〉對象為樂齡與全民，C；國教署衛生組長會議 AI 只為行政工具分享，C；「青少年關機也幸福」無 AI） |
| 資科司 RSS | 200 | 0 | — |
| 國教署即時新聞 | 200 | 2（與教育部 RSS 重複） | 0 |
| 行政院公報 | 200 | 115-11-12 期 11 筆，無教育部、國教署；11-13 期未上架 | 0 |
| 行政院本院新聞 RSS | 200 | 5 | 0（〈115資訊月暨臺灣教育科技展開幕〉為院長致詞稿，中小學部分只重述既有 AI 人才方舟計畫（已入庫 KB-2026-0095）；致詞不屬每日文件類型，C） |
| 國科會新聞 RSS | 200 | 1 | 0（智慧醫療，C） |
| 數位發展部 | 200 | 0 | — |
| 師培藝教司、學特司 RSS | 200 | 0 | — |

- **E5a：** 11-06～11-13 中央 AI 項目都已處理，未漏收。
- **總統盃 AI 素養爭霸賽總決賽（11-13）：** 查詢時尚無新聞稿，明日再查。

## 需要管理者處理

- **AFT、UFT 與 Anthropic 協議（利益衝突，請管理者決定）：** 見 2026-11-12 daily-check；期限 11-17。
- **清單外論文：** 11-12 列的 6 篇（期限 11-18）與本期觀察 6 篇，是否單篇例外。
- **補查（明日）：** 總統盃總決賽新聞；MEXT mext_00750；香港 11-13 全日；Federal Register 11-13 正式期與 public inspection；unesdoc pf0000400013 出版日（瀏覽器）。

## 請管理者用瀏覽器處理（2026-11-13）

| 序 | 項目 | 要什麼 | 期限 |
|---|---|---|---|
| 1 | https://doi.org/10.1080/10494820.2026.2762001 （J40；D20261113-01 書目型；11-12 列） | 文章頁摘要截圖或全文 PDF（可改為作者摘要型） | 11-17 |
| 2 | https://doi.org/10.3390/educsci16111942 （J47；D20261113-02 書目型） | 文章頁 Published 日期與摘要截圖，或全文 PDF | 11-19 |
| 3 | https://doi.org/10.1080/2331186x.2026.2752641 （Cogent；D20261112-07 書目型；11-12 列） | 文章頁摘要截圖或全文 PDF | 11-16 |
| 4 | https://doi.org/10.3390/educsci16111936 （J47；D20261112-10 書目型；11-12 列） | 文章頁 Published 日期與摘要截圖，或全文 PDF | 11-18 |
| 5 | https://doi.org/10.3390/educsci16111928 （J47；跨學段教師，學段分布不明；11-12 列） | 全文 PDF（看各學段人數） | 11-18 |
| 6 | https://doi.org/10.1080/15700763.2026.2762927 （清單外 LPS；迦納校長 AI 整合；無摘要） | 摘要截圖；若要收請決定是否單篇例外 | 11-19 |

- 11-12 列的 Journal of Intelligence `jintelligence14110294`（期限 11-14）：書目型已發，摘要若能補可改作者摘要型。
- SIGCSE Virtual 三篇（11-12 列）：清單外，若不收可移除。
