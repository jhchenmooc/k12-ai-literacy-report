# 每日短訊查核紀錄：2026-11-05（7 則）

> 每日短訊例行作業，由排程觸發，在每日短訊專用 session 執行。今天週四。
> - **檢索：** 由同一 session 的四個子代理分頭執行，判讀由本 session 複核：國際研究、國際政策每日來源、週四必查政策來源、臺灣來源（含週四來源）。子代理一律只查一次、不迴圈等待；四組都在 25 分鐘內回報。
> - **查詢時間：** 2026-11-05T00:24Z–00:58Z（UTC）。
> - **請求紀錄：** 都沒帶 email 或 mailto；沒換 User-Agent；以下各頁都未繞過：
>   - MDPI、SAGE、ACM、T&F 出版社頁回 403。
>   - 英國 ICO 第 3 次讀取回 Cloudflare 驗證頁（403）。
>   - 智利 Mineduc 無頭 502 兩次、curl reset，依 11-04 安排記「停查」。
> - **結果：7 則。**
>   - 國際研究：1 則（只發書目）。
>   - 國際政策：5 則（美國、西班牙 2、丹麥、UNESCO）。
>   - 臺灣：1 則。
> - **GitHub 授權失效：**
>   - 本 session 的 git 與 GitHub 工具自 11-04 下午起無法推送，11-05 早上連讀取都被拒。
>   - 管理者重新授權後，11-05 約 01:20Z 恢復；11-04 期（#432）先合併，本期改從最新 main 重新建置。
>   - 週四瀏覽器清單已先在本 session 直接交給管理者；本 PR 合併後，main 上也有同一份清單。

## 本期項目

| 編號 | 來源 | 首發日（依據） | 範圍 | 對象 | 型態 |
|---|---|---|---|---|---|
| D20261105-01 | J47 Education Sciences（MDPI），Zhu、Wu、Zhao、Shang〈AI-Supported Programming Environments and Pair Programming Role Strategies in Secondary School: An Exploratory Study〉 https://doi.org/10.3390/educsci16111866 | 2026-11-04（Crossref published-online；出版社頁 403；Crossref 篇名查詢與 arXiv 無較早版本） | B（S-LRN） | k12（西安一所公立國中八年級 198 人） | 只發書目 |
| D20261105-02 | 美國教育部，Federal Register 2026-22615〈Proposed Priorities and Definitions—Secretary’s Supplemental Priorities and Definitions〉 | 2026-11-04（public inspection filed 08:45 ET；預定 11-05 刊登） | A（S-BAS） | other_stakeholders（補助申請者，涵蓋 K-12 與高教） | 官方摘要型（擬議規則） |
| D20261105-03 | 西班牙 INTEF〈Microformaciones en Aula En Abierto〉 | 2026-11-03（頁面日期與 datePublished） | A（T-ETH、T-TEA） | k12（教師） | 官方摘要型 |
| D20261105-04 | 西班牙教育、職業培訓與體育部〈Milagros Tolón: “Necesitamos que los jóvenes sepan utilizar la tecnología sin renunciar a su propio criterio”〉 | 2026-11-04（頁面日期） | A（S-ETH、T-PD） | k12 | 官方摘要型（部長致詞） |
| D20261105-05 | 丹麥教育部（UVM）〈Nye tal om eksamenskarakterer på gymnasierne…〉 | 2026-10-29（頁面日期；10-29 上次週四讀取時列表最新為 10-28） | A（S-ETH） | k12（高中） | 官方摘要型 |
| D20261105-06 | UNESCO 聖地牙哥區域辦公室〈UNESCO Santiago commemorated the 25th anniversary of the Information for All Programme (IFAP)…〉 | 2026-10-29（頁面日期與 datePublished） | A（S-ETH） | other_stakeholders | 官方摘要型（活動回顧） |
| D20261105-07 | 國家教育研究院〈深化媒體素養議題融入，掌握數位時代資訊防身術～2026年第4次審定本教科用書專題研習〉 | 2026-11-01（報導頁日期；研習於 09-02 舉行） | A（T-BAS） | other_stakeholders（教科用書編審相關與會者） | 官方摘要型（臺灣） |

- **-01（Education Sciences）：** 介入研究，只發書目，不寫成效；列入瀏覽器清單。
- **-02（美國教育部）：**
  - **內容：** 除少數例外，以 Super Intelligence（SI）取代所有 AI 用語，AI literacy 定義改稱 SI literacy 並修訂。內容特殊，本 session 以 Federal Register API 核對文件類型、機關、filed_at 與預定刊登日。
  - **依據的行政命令：** PDF 前後寫作 EO 14344 與 EO 14434；Federal Register 登錄〈Inaugurating the Era of Super Intelligence〉為 EO 14434（2026-10-02 刊登），範圍說明已註明。
  - **首發日：** 採 public inspection 公開日 11-04。主控 SOP 沒有 public inspection 與刊登日擇一的規定，請管理者確認；若改採刊登日 11-05，仍在窗口內。
  - **第二輪對照：** 依建議修改如下：
    - 「補助優先項目」改為與篇名一致的「部長補充優先項目」。
    - K-12 項目註明為既有子項改稱，不是新增。
    - 刪去 T-PD。
- **-03～-06（週四來源）：** 第二輪對照依建議修改後一致，細節見各 claim 的 ai_crosscheck_record。
  - 丹麥一則：新聞稿把成績下降與學生可使用生成式 AI 並列，但沒有說是 AI 造成；摘要以「該部另指出」分開兩件事，不寫因果。
  - 西班牙部長一則屬致詞；每日短訊的文件類型不收 speech，記為 official_commentary，並在 interpretation_note 註明。
  - 丹麥機構依原頁 Undervisningsministeriet 寫作「丹麥教育部」（閘門要求外國機構名稱前直接冠國名）。
- **-07（國教院）：**
  - **分類：** 子代理建議 B，本 session 改判 A。研習內容是理解 AI 工具類型、幻覺風險與評估問句，屬 AI 素養；依準則「AI 素養活動公告判 A」。
  - **第二輪對照：** 依建議把「解析」「提醒」的主詞改為講者。
- **不另發：** 義大利 MIM #NoiSiamoLeScuole（10-31，兩校在 Next Gen AI 2026 的分享）與已發的 D20261022-05 屬同一活動，比照上週直播預告的處理，不另發。
- **候選池與知識庫：**
  - 候選池：W2026-10-30-A20～A26（batch 2026-11-05-daily-1）。
  - 知識庫：KB-2026-0523～0529，KR-15915 起。
  - titles_zh.csv：外文政策紀錄 KB-2026-0524～0528 已加中文譯名。

## 國際

### 研究查詢

| 來源 | 查詢 | 狀態 | 結果 |
|---|---|---|---|
| Crossref | from／until-created 11-04～11-05，六組關鍵詞，rows=60 | 200 | 總數 649／637／1304／2371／494／1365 |
| Crossref（proceedings-article） | 同日期 | 200 | 109（取 40） |
| Crossref（監測期刊 ISSN） | 29 個 ISSN；帶與不帶關鍵詞 | 200（含 J50b） | 不帶關鍵詞：J07 1、J09 1、J29 15、J32 3、J33 7、J36 1、J37 1、J40 3、J47 8、J48 170、J49 2、J52 11，其餘 0 |
| 教學代理人 | Crossref 兩組 × 期刊／會議；OpenAlex 四組；arXiv 一組 | 200 | 無教學代理人 × K-12 合格研究 |
| arXiv | API 四組；cs.CY、cs.HC /new 一次 | 200 | 新筆皆非 K-12；/new 仍為週三批 |
| alphaXiv | discover_papers | 連線成功 | 7 筆，新 1 筆（成人），不收 |

**接近合格但不發：**
- J29 `10.3389/feduc.2026.1939585`（GPT-4 產生的高中化學選擇題品質，95 名學生作答）：AI 是研究者端的出題工具，學生不與 AI 互動，判 C（邊界，若管理者認為屬教師評估 AI 工具，可改 B）。
- J47 `10.3390/educsci16111864`（西班牙中學 AI 使用）：填答者為職前教師 504 人，判 teacher_ed。

**不收（摘要）：**
- 高教或大學：J37 `s10956-026-10369-7`；J29 `1968048`、`1988044`、`1929091`、`1908486`。
- 職前教師：J44 `02619768.2026.2755530`、J49 `ejed.70932`。
- 無 AI 或 AI 只是方法：J36 `07356331261503520`、J29 `1959156`、J32 `s44217-026-02281-4`、J52 `bs16112104`。
- 對象 unknown（無摘要）：J09 `s10758-026-10056-x`、J40 `10494820.2026.2759146`、`2754923`、J33 `s41599-026-09605-7`。
- arXiv 2611.03882、2611.04783、2611.02774 等。

**列觀察（不在監測清單）：**
- Koli Calling 2026（ACM，Crossref online 11-04，無摘要，ACM 403）：
  - `10.1145/3856208.3856228`〈What Should We Teach About AI in School and Why: a Multi-Stakeholder Study〉
  - `3856208.3856281`
  - `3856208.3856286`
  - `3856208.3856289`
  - `3856208.3856284`
  - `3856208.3856266`（職前）
- 其他：MDPI Computers `10.3390/computers15110795`（哈薩克 TALIS 2024 ISCED 2 教師 7,360 人）、Societies `10.3390/soc16110389`、SAP Social AI `10.62486/sai2026108`、韓國期刊數篇等。
- arXiv 2611.02016：創業課程 RCT，學生年齡未寫，對象 unknown。

### 政策查詢（每日來源）

| 來源 | 狀態 | 結果 |
|---|---|---|
| GOV.UK | 200 | 機構新 13 筆無 AI；全站 AI 新項目 2 筆（北愛爾蘭 EU AI Act 指引、地方新聞基金），C |
| Federal Register | 200 | 11-04 期 92 筆無 ED × AI；11-05 期查詢時未收錄；public inspection：2026-22615 → D20261105-02；22613（HEA Title II，無 AI）、22644、FDA 22593，C |
| MEXT | 200 | 新着 1 筆，C；mext_00747（10-30）文字版已上傳，談數位教科書資安，無 AI，C；mext_00748 仍未上傳 |
| 中國教育部 | 200 | 5 筆，C（黨務、高教） |
| 香港政府新聞公報 | 200 | 11-04 全日英 55、中 60，AI 只見於非教育議題，C；11-05 查詢時無項目 |
| 韓國教育部 | 200 | 107560（OECD 30 週年研討會，AI 為四議題之一）、107561、107562，C |
| 韓國 KICE | 200 | 5101217（KICE 職員 AI 基礎素養程式教育；對象為機構自身職員），C |
| 韓國 KERIS | 200 | 無新項目 |
| UNESCO newsroom | 200 | 5 筆，C |
| Eurydice | 200 | 1 筆（荷蘭托育補助），C |

- **E5a（首次公開 10-29～11-05）：** 無漏收；中國教育部 1456808（11-02，高教）判 C。

## 週四必查（F2 試行來源，第三次讀取）

依 #426（管理者 2026-11-04）跑第三次。各來源的讀取狀態、新項目數與耗時如下，供 11-12 逐源統計表使用。

### (a) 原試行來源

| 來源 | 狀態 | 列表最新 | 10-29 後新項目 | 有關 | 命中 |
|---|---|---|---|---|---|
| 德國 KMK | 200 | 10-16 | 0（沒有新項目） | 0 | 0 |
| 芬蘭 EDUFI | 200 | 11-04 | 3 | 0 | 0 |
| TeachAI | 200 | 無逐州日期 | 43 筆，與 10-22 快照相同 | 0 | 0 |
| 愛沙尼亞 RSS | 200 | 11-03 | 3 | 1（部長行程預告，不收） | 0 |

### (b) F2 風險關切與政策調整

| 來源 | 狀態 | 列表最新 | 新項目 | 有關 | 命中 |
|---|---|---|---|---|---|
| UNICEF 新聞稿 | 200 | 11-03 | 3 | 0 | 0 |
| EI 新聞 | 200 | 10-28 | 0（沒有新項目） | 0 | 0 |
| 英國 ICO | 讀取失敗（無頭逾時兩次；第 3 次 Cloudflare 403，未繞過） | — | — | — | — |
| 法國 CNIL | 200 | 11-04 | 2 | 0 | 0 |
| 美國 NEA | 200 | 11-03 | 1 | 0 | 0 |
| Ada Lovelace | 200 | 11-04 | 1 | 0 | 0 |
| 瑞典 Skolverket | 200 | 10-20 | 0（沒有新項目） | 0 | 0 |
| 西班牙教育部 | 第 1 次 reset，重試 200 | 11-04 | 2 | 2 | 1（D20261105-04；另 1 則 C） |
| 西班牙 INTEF | 200 | 11-03 | 1 | 1 | 1（D20261105-03） |
| 捷克教育部 | 無頭 200 | 11-04 | 6 | 0 | 0 |
| 南非基礎教育部 | 200 | 09-26 | 0（沒有新項目） | 0 | 0 |

### (c) 第二批國家教育部門

| 來源 | 狀態 | 列表最新 | 新項目 | 有關 | 命中 |
|---|---|---|---|---|---|
| 挪威 Udir | 無頭 200 | 11-03 | 4 | 0 | 0 |
| 丹麥 UVM | 無頭 200 | 10-30 | 3 | 2 | 1（D20261105-05；另 1 則 C） |
| 荷蘭 OCW | 無頭 200 | 10-30 | 1 | 0 | 0 |
| 荷蘭 Kennisnet | 200 | 10-22 | 0（沒有新項目） | 0 | 0 |
| 北愛爾蘭教育部 | 200 | 11-02 | 2 | 0 | 0 |
| 加拿大卑詩省 | 200 | 09-08 | 0（沒有新項目） | 0 | 0 |
| 智利 Mineduc | 讀取失敗（第三次），依 11-04 安排停查 | — | — | — | — |
| 墨西哥 SEP | 200 | 11-04 | 9 | 2（只在大學段提及，C） | 0 |
| 義大利 MIM | 無頭 200 | 11-03 | 5 | 2 | 0（#NoiSiamoLeScuole 與已發活動重複；電子報線索見下） |
| 印尼初中等教育部 | 第 1 次逾時，重試 200 | 11-04 | 約 13 | 2（AI 只是順帶，C） | 0 |

### (d) 丙：智庫與工會

| 來源 | 狀態 | 列表最新 | 新項目 | 有關 | 命中／反思 |
|---|---|---|---|---|---|
| EPI | 200 | 10-14 | 0（沒有新項目） | 0 | 0 |
| Brookings K-12 | 200 | 11-04 | 3 | 0 | 0 |
| Brookings 教育科技 | 200 | 10-29 | 1 | 1 | 反思候選 1 |
| CRPE | 無頭 200 | 10-20 | 0（沒有新項目） | 0 | 0 |
| AFT | 200 | 11-03 | 3 | 0 | 0 |
| EI Worlds of Education | 200 | 10-29 | 1 | 0 | 0 |
| UNICEF Innocenti | 200 | 首頁無日期 | 0 | 0 | 0 |
| UNESCO AI 與教育 | 無頭 200（只讀首批） | 11-02 | 2 | 2 | 1（D20261105-06；另 1 則 C） |

- **耗時（估計）：** (a) 3 分、(b) 4 分、(c) 4 分、(d) 3 分；並行讀取合計約 14 分。
- **反思候選：** Brookings〈Parenting in an AI revolution〉（10-29，podcast 附逐字稿，來賓 Jonathan Haidt），已記入 reflection-pool.md。
- **線索（不發）：**
  - MIM 第 287 期電子報連到 INDIRE〈IA e studenti〉全國調查（網址日期 09-04，超過時效）。
  - MIMeraviglIA 重開報名（無日期）。
  - UNESCO 與 Efekta 協議（10-26，窗口外）。

## 臺灣

### 每日

| 來源 | 狀態 | 列表最新項目（臺灣時間） | 11-04 08:25 後新筆數 |
|---|---|---|---|
| 教育部即時新聞 RSS | 200 | 2026-11-04 17:07 | 4（臺台語創新學習基地、海事水產技藝競賽、教育實習績優獎、臺華獎新生），無 AI |
| 資訊及科技教育司 RSS | 200 | 2026-10-30 13:49 | 0 |
| 國教署即時新聞 | 200 | 2026-11-04 | 1（重複），無 AI |
| 行政院公報開放資料 | 200 | 115-11-04 | 1 期 8 筆，無教育部或國教署 |
| 行政院本院新聞 RSS | 200 | 2026-11-04 18:21 | 3，無 AI |
| 國科會新聞資料 RSS | 200 | 2026-10-30 10:00 | 0 |
| 數位發展部（第 1 頁） | 200 | 2026-11-03 | 0 |
| 師培藝教司 RSS | 200 | 2026-11-04 16:39 | 1（重複，職前） |
| 學特司 RSS | 200 | 2026-10-31 11:25 | 0 |

### 週四

| 來源 | 狀態 | 最新項目 | 10-29 後新項目 | 結果 |
|---|---|---|---|---|
| 教育部主管法規查詢系統 | 200 | 115.11.03 | 2（每日已看過） | 0 |
| 國教院最新消息與新聞公告 | 200（一次 reset，重試成功） | 2026-11-02 | 6 | id=5700 → D20261105-07；id=5699（AI 華語工作坊，對象為全球華語教學者），C |
| 國科會人工智慧基本法專頁 | 200 | 更新 2026/02/10 | 沒有更新 | — |
| OpenAlex（TW 機構，10-29 起，九組） | 200 | 去重 31 筆，教育相關 9 筆 | — | 臺灣段無可發；`10.1016/j.tsc.2026.102415` 屬國際期刊，已依不收出處排除 |
| 教育科學研究期刊、教育研究集刊、當代教育研究季刊 | 200 | 無新卷期 | — | 0 |

- **E5a：** 無漏收；公報 10-29 至 11-04 各期都已查，無缺期。

## 需要管理者處理

- **首發日規則：** Federal Register 項目的首發日採 public inspection 公開日還是刊登日，請確認（本期採 public inspection 日）。
- **分類邊界：** J29 化學 AI 出題研究判 C；如要改 B 請告知。
- **補查（明日）：**
  - Federal Register 11-05 期全文（對照 2026-22615 正式刊登版）。
  - public inspection 11-06 期。
  - 香港 11-05 公報。
  - MEXT mext_00748。
- **觀察項：** Koli Calling 2026 四篇 K-12 AI 素養論文，是否收錄與是否需瀏覽器取摘要，由管理者決定。

## 請管理者用瀏覽器處理（2026-11-05）

已在本 session 直接交給管理者（當時 GitHub 授權失效）；授權恢復後隨本 PR 合併到 main。

### 1. 待補論文（每日短訊）

| 序 | 項目 | 要什麼 | 期限 |
|---|---|---|---|
| 1 | https://doi.org/10.3390/bs16112038 （J52；11-03 列） | 文章頁 Published 日期與摘要截圖，或全文 PDF | 11-08 |
| 2 | https://doi.org/10.3390/educsci16111833 （J47；11-03 列） | 同上 | 11-08 |
| 3 | https://doi.org/10.1002/berj.70306 （BERJ；11-04 列） | 摘要截圖或全文 PDF | 11-08 |
| 4 | https://doi.org/10.1145/3856766.3856768 （ACM ACR；11-04 列；日期截圖已有） | 摘要截圖或全文 PDF | 11-09 |
| 5 | https://doi.org/10.3390/educsci16111866 （J47；本期） | 文章頁 Published 日期與摘要截圖，或全文 PDF | 11-11 |

### 2. 週四政策列表掃描（10-29 以後的新項目）

| 站 | 網址 |
|---|---|
| OECD 教育 | https://www.oecd.org/en/topics/education.html |
| 美國教育部新聞稿 | https://www.ed.gov/about/news/press-releases |
| 歐盟 European Education Area 新聞 | https://education.ec.europa.eu/news |
| 紐西蘭教育部新聞 | https://www.education.govt.nz/news |
| 新加坡教育部新聞稿 | https://www.moe.gov.sg/news/press-releases |
| 法國國民教育部 | https://www.education.gouv.fr/actualites |
| 阿聯教育部新聞 | https://www.moe.gov.ae/En/MediaCenter/News/Pages/default.aspx |
| 澳洲教育部新聞室 | https://www.education.gov.au/newsroom |
| 澳洲教育部長新聞 | https://ministers.education.gov.au/news |
| 澳洲 eSafety 媒體新聞稿 | https://www.esafety.gov.au/newsroom/media-releases |
| 英國 NEU（AI 篩選頁） | https://neu.org.uk/latest/press-releases?topic[679]=679 |
| 美國 FTC 新聞稿（只看標題含 AI、children、teens、students、schools） | https://www.ftc.gov/news-events/news/press-releases |
| 印度 PIB 新聞稿（教育部） | https://www.pib.gov.in/Allrel.aspx |
