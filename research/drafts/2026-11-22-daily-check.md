# 每日短訊查核紀錄：2026-11-22（0 則）

> 每日短訊例行作業，由排程觸發，在每日短訊專用 session 執行。今天週日，候選池沿用 2026-11-20_2026-11-26。
> - **檢索：** 三個子代理分頭執行（國際研究、國際政策、臺灣中央來源）；判讀由本 session 複核。只查一次。
> - **查詢時間：** 2026-11-22T00:24Z–00:40Z（UTC）。
> - **請求紀錄：** 都沒帶 email 或 mailto；沒換 User-Agent；沒用無頭瀏覽器。ScienceDirect 出版社頁回 403，未繞過。
> - **結果：0 則。** 國際研究、國際政策、臺灣都沒有可直接發布的合格項目；兩篇清單外研究待管理者決定單篇例外。
> - **GitHub 寫入受阻：** 本 session 自 2026-11-21 06:4x 起 git 推送與 GitHub API 建分支都回 403（讀取正常），本紀錄與 11-21 r2（EED 2762493 補登）先在本機提交，待權限恢復後推送。

## 國際

### 研究查詢

| 來源 | 查詢 | 狀態 | 結果 |
|---|---|---|---|
| Crossref | from／until-created 11-21～11-22，六組關鍵詞，rows=60 | 200 | 259／817／357／404／753／524 |
| Crossref（proceedings-article） | 同日期 | 200 | 48／63／25／158／67／50，無合格項目 |
| Crossref（監測期刊 ISSN，J01–J53，6 批） | 帶與不帶 AI 詞 | 200 | 不帶 115 筆、帶 AI 詞 21 筆 |
| 教學代理人 | Crossref（11-14 起）、OpenAlex（11-14 起）、arXiv | 200 | 無新合格項目 |
| arXiv | API 三組（索引可能落後）；cs.CY、cs.HC /new 仍為 11-20 批 | 200 | 無 K-12 正式論文 |
| alphaXiv | discover_papers，11-14 後 | 成功 | 8 筆皆預印本，不收 |

**接近合格（監測清單內）：**
- Teaching and Teacher Education `10.1016/j.tate.2026.105913`（J20）〈Teacher Agency in the Integration of Pedagogical AI Agents: Insights from Teacher Experiences in Taiwan〉：ScienceDirect 403；Crossref 無摘要、無 published-online（只有 issued 2027-02）；OpenAlex 404。首發日與對象學段都不明，連書目型也不能發，列瀏覽器清單。

**清單外觀察（待管理者決定單篇例外）：**
- Asia Pacific Education Review `10.1007/s12564-026-10155-5`〈Learner–AI cognitive collaboration for creativity: a divergence–convergence model in elementary project-based learning〉：Springer 頁 200，First online 2026-11-21；36 名六年級學生的準實驗，B（S-LRN）；介入研究，摘要只寫設計。
- International Journal of Technology in Education `10.46328/ijte.9309`〈Artificial Intelligence through the Eyes of Primary Education Students: Analysis of Gender, Educational Cycle, Rural–Urban Differences, and Frequency of Use〉：期刊頁 200，Published 2026-11-20；西班牙 391 名三至六年級學生的橫斷調查，A（S-BAS）。
- 其餘清單外不建議收：IJEMST 8665（首發日只有 Crossref）、JSET 1509965（學段不明、AI 為實務者製作教材）、ETAIC 2026 ACM ICPS 多篇（無摘要、會議不在清單）、Language Teaching Research 1503731、Sage Open 1511655（學段不明）、低能見度期刊。

**不收：** 監測清單內 IJTDE 10149（無 AI）、ILE 2764524（職前）、CAEAI 100694、JECR 1511181、HSSC 09677、TOCE 3864452、Sci Rep 77089、Discover Education 02436（高教）、Discover Education 02455（C）；CAEO 100436、CHBR 101457 無摘要列觀察；SEE 101705 篇名看為架構文，比照 101707 傾向不發。

**回查：** arXiv 2611.21306 仍只有 v1，WiPSCE 2026 論文集未上線，維持觀察。

### 政策查詢

| 來源 | 狀態 | 結果 |
|---|---|---|
| GOV.UK DfE／Ofqual／Ofsted 與 AI 交叉 | 200 | 週末無新件 |
| GOV.UK 全站 AI × education | 200 | DWP 與 i.AI 利物浦青年就業 AI 工具（11-20）：NEET 就業服務後端工具，C |
| DfE 諮詢網站 | 200 | 與昨天相同；其餘 post-16 諮詢未發布 |
| Federal Register | ED 篩選、ED × AI、「AI literacy」、11-23 期、public inspection | 無 ED、無教育 AI 項目 |
| MEXT | 200 | 無新項目；mext_00753 文字版仍未上傳；指引頁仍為 Ver.2.0 |
| 中國教育部 | 200 | 與昨天相同 |
| 香港政府新聞公報 | 200 | 11-21 全日 19 則、11-22 上午 1 則，無 AI 教育 |
| 韓國教育部 | 200 | 107742（托育規則修正，無 AI），C |
| KICE、KERIS、Eurydice | 200 | 無新項目 |
| UNESCO newsroom | 200 | 秘魯網路暴力宣導活動（AI 為培訓五項之一，對象青年組織），C |

- **E5a：** 11-15～11-22 未見漏收（DWP 利物浦新聞稿先前未記，判 C）。

## 臺灣

| 來源 | 狀態 | 新筆數（11-21 08:23 後） | AI 命中 |
|---|---|---|---|
| 教育部即時新聞 RSS | 200 | 2（大專生命教育成果分享會、國教署國際交流） | 生命教育分享會演講題目「AI時代的生命教育」，大專，C |
| 資科司、國教署、師培藝教司、學特司 | 200 | 0 | — |
| 行政院公報 | 200 | 最新仍為 115-11-20 期 | 0 |
| 行政院本院新聞 RSS | 200 | 1（屏東客家總圖書館動土） | 0 |
| 國科會 RSS、數位部 | 200 | 0 | — |

- **E5a：** 11-15～11-22 未漏收。
- **資訊月教育部專場論壇（11-14）：** 仍無新聞稿。

## 需要管理者處理

- **GitHub 寫入權限：** 本 session git 推送與 GitHub API 都回 403；請重新連結 GitHub（claude.ai/connect-github）並確認 Claude GitHub App 仍安裝在兩個 repo。
- **單篇例外待定：** Asia Pacific Education Review 10155、International Journal of Technology in Education 9309。
- **觀察：** MEXT mext_00753 文字版；arXiv 2611.21306 等 WiPSCE 論文集。

## 請管理者用瀏覽器處理（2026-11-22）

| 序 | 項目 | 要什麼 | 期限 |
|---|---|---|---|
| 1 | https://doi.org/10.1016/j.tate.2026.105913 （J20；臺灣教師導入教學 AI 代理的能動性；本期新列） | ScienceDirect 頁 Available online 日期與摘要截圖（確認對象為在職中小學教師） | 依截圖日期，最遲 11-28 |
