# 每日短訊查核紀錄：2026-11-20（2 則；r1 補登後 4 則）

> 每日短訊例行作業，由排程觸發，在每日短訊專用 session 執行。今天週五，新的一週候選池（2026-11-20_2026-11-26）已以 scaffold-weekly 建檔。
> - **檢索：** 由同一 session 的三個子代理分頭執行（國際研究、國際政策、臺灣中央來源）；判讀由本 session 複核。子代理只查一次、不迴圈等待。
> - **查詢時間：** 2026-11-20T00:24Z–00:30Z（UTC）。
> - **請求紀錄：** 都沒帶 email 或 mailto；沒換 User-Agent。MDPI、ScienceDirect 出版社頁回 403，未繞過；Wayback 舊版頁 403（額外加查），未繞過。
> - **結果：2 則，都是國際研究。** D20261120-01 Frontiers in Education 1999678（作者摘要型，B）、D20261120-02 Behavioral Sciences 2202（書目型，B 邊界）。國際政策 0 則；臺灣 0 則。
>   - 知識庫：KB-2026-0605、0606（候選 W2026-11-20-A01、A02）。
>   - 第二輪：隔離子代理逐句對照，兩則都通過，依建議小修用詞與書目行。同一模型，非獨立審閱。

## 國際

### 研究查詢

| 來源 | 查詢 | 狀態 | 結果 |
|---|---|---|---|
| Crossref | from／until-created 11-19～11-20，六組關鍵詞，rows=60 | 200 | 總數 631／1979／679／812／1651／1049 |
| Crossref（proceedings-article） | 同日期 | 200 | 無合格項目 |
| Crossref（監測期刊 ISSN，J01–J53） | 帶與不帶 AI 詞 | 200 | 不帶 267 筆、帶 AI 詞 39 筆 |
| 教學代理人 | Crossref、OpenAlex、arXiv | 200 | 無新合格項目 |
| arXiv | API 三組（索引仍落後）；cs.CY、cs.HC /new（11-19 批） | 200 | 無 K-12 正式論文 |
| alphaXiv | discover_papers，11-12 後 | 成功 | K-12 相關只有預印本，不收 |

**收錄：**
- **D20261120-01** Frontiers in Education `10.3389/feduc.2026.1999678`（J29）〈Didactic orchestration integrating artificial intelligence tools to develop creative thinking skills in students〉：Published 19 November 2026（citation_online_date 10/23 為接受日，不採用）；哥倫比亞 17 個市鎮，表 1 小學 15.2%、中學 80.4%，依多數標 K-12；單組前後測介入，摘要只寫設計與作者自述限制；B（S-LRN）。
- **D20261120-02** Behavioral Sciences `10.3390/bs16112202`（J52）〈Socioeconomic Status and AI Use for Schoolwork in Relation to Adolescents' School Belonging and Loneliness in Four Chinese Regions〉：Crossref published-online 2026-11-19；MDPI 403，只發書目型；課業 AI 使用頻率為預測變項之一，B 邊界。

**不收或觀察：**
- Frontiers in Education `10.3389/feduc.2026.2043389`（J29，11-19）〈Human-centred AI pedagogy in primary mathematics: a theoretical framework for agency and sense-making〉：Hypothesis and Theory 文章，無實證資料，課例為假設；比照 11-18 Education Sciences 1953（Perspective）不發，列觀察。
- 清單外觀察：BMC Psychology `10.1186/s40359-026-05791-w`（中國中學教師教 AI 的意願，無摘要）；Journal of Special Education Technology `10.1177/01626434261509962`（104 名教育工作者，學段未限定）；ICAIR `10.34190/icair.7.1.5281`（瑞典 3 位小學校長，ACI 系列）；MTI `10.3390/mti10110123`（無真人參與）；另有數篇品質待核的低能見度期刊，不收。
- 回查：Studies in Educational Evaluation `10.1016/j.stueduc.2026.101707`（J23）仍無摘要與線上日，子代理用錯 PII，明日以正確 PII 重讀；arXiv 2611.21306 仍只有 v1，維持觀察。
- 不收（摘要）：Frontiers in Education 2001387（職前）、1983588（大學）等；Education Sciences 1983、1989（無 AI）；Behavioral Sciences 2193（大學生）、2196、2198；Discover Education 02443-4（高教）；CAEAI 100696（工程教育）；Computers & Education 105802 無摘要、學段不明（明日補查）；Sci Rep 約 34 篇非 K-12 教育；ASCILITE 依不收出處排除。

### 政策查詢

| 來源 | 狀態 | 結果 |
|---|---|---|
| GOV.UK DfE | 200 | 11-19 新 22 件；〈Effective governance resources〉更新頁含 AI 小節（約 150 字／1,150 字），AI 只占一小部分，C；同日兩份治理指引全文無 AI |
| GOV.UK Ofqual | 200 | 6 件；V Level enterprise and professional services 諮詢正文與附錄無 AI |
| GOV.UK Ofsted | 200 | 4 件，無 AI |
| GOV.UK 全站 AI × education | 200 | 利物浦青年就業 AI 工具（Cabinet Office、DWP，11-20）：AI 為系統後端，C |
| Federal Register | ED 篩選、ED × AI、「AI literacy」（0 筆）、11-19 期、public inspection 200（今天恢復） | ED 新 2 件無 AI；ACUS 生成式 AI 用於行政裁決，C |
| MEXT | 200 | 新着 2 則無 AI；mext_00751、00752 文字版已上傳，全文無 AI |
| 中國教育部 | 200 | 與昨天相同 |
| 香港政府新聞公報 | 200 | 11-19 全日英 26、中 27 則：資訊及通訊科技獎（產業）、開源 AI 致辭（演講）、高教議案，C；11-20 尚無稿 |
| 韓國教育部 | 200 | 107703（烏茲別克職業學校韓語與 K-職業教育），AI 只在國政課題標籤，C |
| KICE | 200 | 2027 修能出題方向，無 AI；研究板無新項目（基準 3948） |
| KERIS、UNESCO newsroom、Eurydice | 200 | 無新 AI 項目 |

- **E5a：** 11-13～11-20 未見漏收。Ofqual A Level 非考試評量修改提案、DfE 其餘三批 post-16 諮詢都尚未發布。

## 臺灣

| 來源 | 狀態 | 新筆數（11-19 08:23 後） | AI 命中 |
|---|---|---|---|
| 教育部即時新聞 RSS | 200 | 3（僑外生訪視、學習扶助、學前特教鑑定安置） | 0 |
| 資科司、國科會、師培藝教司、學特司 RSS | 200 | 0 | — |
| 國教署即時新聞 | 200 | 2（重複） | 0 |
| 行政院公報 | 200 | 115-11-19 期 13 筆，教育部 2 筆（教師資格考試命題、教師證書補發） | 0 |
| 行政院本院新聞 RSS | 200 | 4 | 0 |
| 數位部 | 200 | 1（綠色軟體，產業） | 0 |

- **E5a：** 11-13～11-20 未漏收。
- **資訊月教育部專場論壇（11-14）：** 仍無新聞稿。

## 需要管理者處理

- **觀察：** Frontiers in Education 2043389（小學數學 AI 教學理論框架，無實證）比照 1953 先例不發；如要收請告知。
- **補查（明日）：** Studies in Educational Evaluation 101707（正確 PII S0191491X26001513）；Computers & Education 105802；Federal Register 11-20 期；香港 11-20；DfE 其餘 post-16 諮詢；Ofqual A Level 修改提案；KICE 研究板。

## 請管理者用瀏覽器處理（2026-11-20）

| 序 | 項目 | 要什麼 | 期限 |
|---|---|---|---|
| 1 | https://doi.org/10.3390/bs16112202 （J52；D20261120-02 書目型；本期新列） | 文章頁 Published 日期與摘要截圖，或全文 PDF（看 PISA 輪次、四個地區與樣本數；可升作者摘要型） | 11-26 |
| 2 | https://doi.org/10.1016/j.stueduc.2026.101707 （J23；生成式 AI 時代的學生評量判斷；無摘要、無線上日；本期新列） | ScienceDirect 頁 Available online 日期與摘要截圖（確認學段） | 依截圖日期，最遲 11-25 |
| 3 | https://doi.org/10.1080/10409289.2026.2762493 （清單外 EED；11-18 列） | 全文或方法節截圖（確認是否為 3–6 歲學前教師；若要收） | 11-23 |

## 補登（r1，2026-11-20）

管理者 2026-11-20 在本 session「確認，照建議」：
- **Frontiers in Education 2043389：** 理論文，比照 1953 不發（管理者確認）。
- **D20261120-03（KB-2026-0607）：** BMC Psychology `10.1186/s40359-026-05791-w`（清單外，單篇例外）。Springer 頁 200，Published: 19 November 2026；218 名中學資訊科技教師教授 AI 意願的橫斷面問卷研究；作者摘要型，A（T-PD）；第二輪需修改（文章類型、對象欄、維度），已修正。
- **D20261120-04（KB-2026-0608）：** Journal of Special Education Technology `10.1177/01626434261509962`（清單外，非 J37，單篇例外）。Sage 403，首發日依 Crossref published-online 2026-11-19；104 名教育工作者評估 AI 輔助教學情境；書目型，A（T-TEA），對象為其他教育關係人；第二輪需修改（句序號、學段標示說明），已修正。
- 瀏覽器清單加列：https://doi.org/10.1177/01626434261509962 （JSET；D20261120-04 書目型）文章頁摘要截圖或全文 PDF，可升作者摘要型，期限 11-26。
