# 每日短訊查核紀錄：2026-11-16（0 則）

> 每日短訊例行作業，由排程觸發，在每日短訊專用 session 執行。今天週一。
> - **檢索：** 由同一 session 的三個子代理分頭執行（國際研究、國際政策、臺灣中央來源），另派一個子代理補查 ISSN 篩選缺漏的監測期刊（見下）；判讀由本 session 複核。子代理只查一次、不迴圈等待。
> - **查詢時間：** 2026-11-16T00:21Z–00:50Z（UTC）。
> - **請求紀錄：** 都沒帶 email 或 mailto；沒換 User-Agent。Sage、ScienceDirect 出版社頁回 403，未繞過；IJELP 出版社頁 TLS reset 4 次，未讀到。Federal Register「AI literacy」查詢回 403（IP 封鎖訊息），未重試、未繞過，改讀 govinfo 11-16 期目錄。Crossref 多次 429，重試成功。
> - **結果：0 則。** 國際研究 0 則；國際政策 0 則；臺灣 0 則。依 SOP 第 5 步不建頁、不登記，只提交本查核紀錄。

## 國際

### 研究查詢

| 來源 | 查詢 | 狀態 | 結果 |
|---|---|---|---|
| Crossref | from／until-created 11-15～11-16，六組關鍵詞，rows=60 | 200（兩次 429，重試成功） | 總數 120／175／274／659／78／292（週末量少） |
| Crossref（proceedings-article） | 同日期 | 200 | 26 筆，無 K-12 AI |
| Crossref（監測期刊 ISSN，原 29 個） | 帶與不帶關鍵詞 | 200 | 有新筆：J01、J32、J35、J41、J48、J50；無合格 K-12 AI 新筆 |
| Crossref（監測期刊 ISSN，補查 26 刊） | created 11-09～11-16，不帶關鍵詞 | 200（9 刊 429，重試成功） | 新筆 53，AI 相關 7，皆非 K-12 或教育關係人（見下） |
| 教學代理人 | Crossref × 期刊／會議；OpenAlex；arXiv | 200 | 無合格項目 |
| arXiv | API 三組＋教學代理人（11-09 後）；cs.CY、cs.HC /new | 200 | 全部已判過；/new 仍為 11-13 批 |
| alphaXiv | discover_papers | 成功 | 10 筆皆已判過 |
| 回查 BJET 70101 | OpenAlex | 200 | 已收錄，摘要與 Crossref 逐字相同，非新的原文來源；維持書目型 |

**ISSN 篩選缺漏（本期發現並補查）：** 每日研究腳本的 Crossref ISSN 篩選只涵蓋 29 個 ISSN，缺監測清單 J10、J11、J12、J15–J28、J30、J34、J38、J39、J42–J46 共 26 刊（含核心 J10 Computers in Human Behavior、J11 CHB Reports、J12 Journal of Learning Analytics、J38 Educational Psychology Review），這些期刊先前只能靠關鍵詞查詢（每組前 60 筆）帶到。本期由子代理以 Crossref journals API 查出各刊 ISSN，對 11-09～11-16 逐刊補查：AI 相關 7 筆（J10 chb.2026.109260 高齡者；J11 chbr.2026.101449 大學生、101445、101444 非教育；J26 17439884.2026.2760369 徵稿啟事文件分析；J28 te.2026.3742511、3738469 大學工程課程），皆不收，**未發現漏收**。缺漏 ISSN 已補進本 session 每日檢索腳本（scratchpad），之後各期一併篩選。11-09 以前的期間未回溯補查；如需回溯，請管理者決定期間。

**觀察（清單外；管理者決定是否單篇例外）：**
- Sage Open `10.1177/21582440261501742`〈Teacher Artificial Intelligence Adoption Configurations in Europe: Attitudes, Reported Use, and Non-use in TALIS 2024〉：歐洲 31 個教育系統 13,440 名國中教師的 AI 態度剖面與使用型態（TALIS 2024 次級分析）；Crossref published-online 2026-11-15（published-print 2026-10）；Sage 403，摘要只見 Crossref；A（T-TEA、T-PD、T-BAS）。
- Edusoshum `10.52366/edusoshum.v6i3.728`（印尼十年級 43 人 GenAI 輔助 TPS 寫作行動研究，無對照組；7 天刊出）、IJLLS `10.36892/ijlls.v8i6.2866`（菲律賓 12 年級作文與 ChatGPT 生成文比較，學生未使用 AI，擬 C）、IJELP `10.51200/ijelp.v9i1.8608`（馬來西亞中學 30 人，效果量異常）、JBEM `10.62379/jbem.v3i2.2201`（1 天刊出）、IJAIMR `10.70382/mejaimr.v14i2.0141`（構念不清，2 天刊出）：品質疑點，不建議。

**不收（摘要）：** Sci Rep `s41598-026-79820-4`（大學部，higher_ed）；CAE `compedu.2026.105801`（日期只有年月、無摘要，待回查）；IJCCI `ijcci.2026.100862`（無 AI）；CAE Open `caeo.2026.100435`（higher_ed）；Discover Education 4 篇；JLLSA 448（teacher_ed）；VMJSTE（higher_ed）；MEDDA（日期不全）；Reforma（學段不明）；JUILMU（日期異常）；JPMBISTEK（社區服務報告）；窗口外或只有年份數篇；其餘約 40 筆與 AI 或 K-12 無關。

### 政策查詢

| 來源 | 狀態 | 結果 |
|---|---|---|
| GOV.UK | 200 | DfE、Ofqual、Ofsted 無新項目；全站 46 筆非教育 |
| Federal Register | ED 篩選、ED × AI 200（昨日 403 已恢復）；「AI literacy」403（讀取失敗，未繞過）；govinfo 11-16 期目錄 200 | 11-16 期 106 件，ED 只有 2026-23262（無 AI），整期無 "artificial intelligence"；public inspection 11-16～11-18 無新件 |
| MEXT | 200 | 新着 1（大學 WG），C；mext_00750、00751 文字版仍未上傳 |
| 中國教育部 | 200 | 1 則（世界中文大會全體會議），無 AI |
| 香港政府新聞公報 | 200 | 11-15 全日英 7、中 5 則，AI 只見航空業黑客松與海運峰會致辭，C；11-16 尚無稿 |
| 韓國教育部 | 200 | 107658（大學修學能力試驗考卷配送），無 AI |
| KICE、KERIS、Eurydice | 200 | 沒有新項目 |
| UNESCO newsroom | 200 | 2 則，無 AI |

- **E5a：** 11-09～11-16 未見漏收（GOV.UK 唯一 AI 項目為已收的 D20261111-01）。

## 臺灣

| 來源 | 狀態 | 新筆數（11-15 08:23 後） | AI 命中 |
|---|---|---|---|
| 教育部即時新聞 RSS | 200 | 2（教育家人物典範、數學巡迴展） | 0（全文無 AI） |
| 資科司 RSS | 200 | 0 | — |
| 國教署即時新聞 | 200 | 1（數學巡迴展，重複） | 0 |
| 行政院公報 | 200 | 11-13 期後無新期 | — |
| 行政院本院新聞 RSS | 200 | 1 | 0（嘉義參拜「無人機 AI 創新應用研發中心」屬產業語境，C） |
| 國科會、數位部、學特司 RSS | 200 | 0 | — |
| 師培藝教司 RSS | 200 | 1（教育家人物典範，重複） | 0 |

- **E5a：** 11-09～11-16 未漏收。
- **資訊月教育部專場論壇（11-14）：** 仍無新聞稿。

## 需要管理者處理

- **待你在本 session「確認」：** Leadership and Policy in Schools `10.1080/15700763.2026.2762927` 單篇例外（期限 11-19）；11-12～11-16 其他清單外論文是否單篇例外。
- **AFT、UFT 與 Anthropic 協議（利益衝突）：** 期限 11-17。
- **ISSN 缺漏回溯：** 是否回溯補查 11-09 以前的期間（見上）。
- **補查（明日）：** Federal Register「AI literacy」查詢；香港 11-16 全日；MEXT mext_00750、00751；資訊月論壇新聞；CAE 105801 日期與摘要。

## 請管理者用瀏覽器處理（2026-11-16）

| 序 | 項目 | 要什麼 | 期限 |
|---|---|---|---|
| 1 | https://doi.org/10.1111/bjet.70101 （J04；D20261115-01 書目型；11-15 列） | 文章頁 First published 日期與摘要截圖，或全文 PDF | 11-20 |
| 2 | https://doi.org/10.1177/01650254261500063 （清單外 IJBD；11-14 列） | 摘要截圖或全文 PDF（若決定單篇例外） | 11-20 |
| 3 | https://doi.org/10.1177/21582440261501742 （清單外 Sage Open TALIS 2024；本期新列） | 文章頁上線日期與摘要截圖（若決定單篇例外） | 11-22 |
