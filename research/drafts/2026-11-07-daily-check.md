# 每日短訊查核紀錄：2026-11-07（4 則）

> 每日短訊例行作業，由排程觸發，在每日短訊專用 session 執行。今天週六。
> - **檢索：** 由同一 session 的三個子代理分頭執行（國際研究、國際政策、臺灣中央來源），判讀由本 session 複核。子代理只查一次、不迴圈等待。
> - **查詢時間：** 2026-11-07T00:25Z–01:10Z（UTC）。
> - **請求紀錄：** 都沒帶 email 或 mailto；沒換 User-Agent。下列頁面都未繞過：
>   - Sage、Wiley、T&F 出版社頁回 Cloudflare 驗證頁。
>   - govinfo 的 11-06 期目錄頁回 403；federalregister.gov 全文頁轉向驗證頁，改讀 govinfo 單篇頁。
>   - 行政院公報開放資料回 HTTP 521，共試 4 次，都沒讀到。
>
>   Crossref 兩次 429，各重試一次成功。
> - **結果：4 則。** 國際研究 4 則；國際政策 0 則；臺灣 0 則。

## 本期項目

| 編號 | 來源 | 首發日（依據） | 範圍 | 對象 | 型態 |
|---|---|---|---|---|---|
| D20261107-01 | J40 Interactive Learning Environments，Song、Lin、Wang、Wu〈Navigating AI ethics in K–12 classrooms: exploring teachers' AI ethics alignment through activity theory〉 https://doi.org/10.1080/10494820.2026.2754924 | 2026-11-05（Crossref published-online；出版社頁 Cloudflare） | A（T-ETH） | k12（在職教師 26 人） | 只發書目 |
| D20261107-02 | J29 Frontiers in Education，Anagnostopoulou 等〈Self-efficacy, engagement, attitudes, and perceived learning in AI-assisted STEM education〉 https://doi.org/10.3389/feduc.2026.1977754 | 2026-11-06（出版社頁 Published 06 November 2026；Crossref 同日） | B（S-LRN） | k12（希臘、葡萄牙、西班牙中學一年級 710 人） | 作者摘要型 |
| D20261107-03 | J29 Frontiers in Education，Song〈Toward calibrated AI readiness in K–12 school-based practice…〉 https://doi.org/10.3389/feduc.2026.1946896 | 2026-11-06（出版社頁 Published 06 November 2026；Crossref 同日） | A（T-ETH、T-BAS） | other_stakeholders（K–12 學校心理師、輔導等學校專業人員） | 作者摘要型 |
| D20261107-04 | arXiv 2611.07792，Favero、Käser、Pérez-Ortiz、Oliver〈Thinking Is Not Writing: Designing AI Chatbots to Connect Reasoning and Revision〉 | 2026-11-05（v1 提交時間；Crossref、OpenAlex 篇名查詢無較早版本） | B（S-LRN） | k12（瑞士 IB 中學學生 65 人） | 作者摘要型（預印本） |

- **-01（J40）：** 11-06 列入瀏覽器清單；今天 OpenAlex 已收錄摘要。
  - **型態：** OpenAlex 不是出版社頁，依規則只發書目。快照收錄 OpenAlex 摘要一句，並註明不是原文。
  - **對象：** 依篇名（K–12 classrooms、teachers）與 OpenAlex 摘要判讀，未經原文核對。研究國別也未經原文核對，不標。
  - **瀏覽器清單：** 仍保留，取得原頁摘要後升為作者摘要型。
  - **第二輪對照：** 依建議修改以下兩處。
    - 範圍說明只寫快照所引句子的內容。
    - 篇名補譯 Navigating。
- **-02：**
  - **不寫入：** 路徑係數（β）。
  - **作者自述限制：** 結果只描述同時性關聯，未確立學習變化可歸因於 AI 學習夥伴。
  - **利益與經費：** 經費來自歐盟 Horizon FAITH 計畫，已記在範圍說明。
  - **第二輪對照：** 判定通過，依建議微調末句。
- **-03：**
  - **對象：** 以學校心理師、輔導人員為主，第二階段 25 人全部不是教師，所以記 other_stakeholders。
  - **不寫入：** 係數與第二階段的前後測變化。
  - **用詞：** 作者原文 "do not establish causal effects"，因用詞規則改寫為「不能確立效應」。
  - **第二輪對照：** 依建議修改以下兩處。
    - 補回構念的限定語。
    - 範圍說明補第二階段職別人數（學校心理師 15 人、輔導人員 10 人）。
- **-04：**
  - **研究性質：** 有對照組的探索性課堂研究。
  - **不寫入：** 成績提升比例、對話比例與成效關聯。
  - **第二輪對照：** 判定通過，依建議註明年齡資料只來自 63 人的填答。
- **候選池與知識庫：**
  - **候選池：** W2026-11-06-A04～A07（batch 2026-11-07-daily-1）。
  - **知識庫：** KB-2026-0534～0537。

## 國際

### 研究查詢

| 來源 | 查詢 | 狀態 | 結果 |
|---|---|---|---|
| Crossref | from／until-created 11-06～11-07，六組關鍵詞，rows=60 | 200（一組一次 429，重試成功） | 總數 640／543／1229／2666／408／1042 |
| Crossref（proceedings-article） | 同日期 | 200 | 231（取 40），無相關 |
| Crossref（監測期刊 ISSN） | 29 個 ISSN；帶與不帶關鍵詞 | 200（J04 一次 429，重試成功） | 不帶關鍵詞：J01 1、J07 2、J08 1、J29 19、J32 6、J33 12、J36 1、J37 1、J47 10、J48 126、J49 2、J52 10，其餘 0 |
| 教學代理人 | Crossref 兩組 × 期刊／會議；OpenAlex 四組；arXiv 一組 | 200 | 無合格項目 |
| arXiv | API 四組；cs.CY、cs.HC /new 一次（週五批） | 200 | K-12 相關新筆只有 2611.07792 |
| alphaXiv | discover_papers | 連線成功 | 7 筆，新 2 筆（其一不合格） |
| 補查 | J40 2754924、J52 bs16112107、Koli 3856289（Crossref、OpenAlex） | 200 | J40 OpenAlex 已有摘要 → D20261107-01；J52 摘要仍未寫學段；Koli 3289 OpenAlex 已有摘要（見下） |

**接近合格、列入瀏覽器清單（監測清單內，對象或摘要未能確認）：**
- **J36 Journal of Educational Computing Research** `10.1177/07356331261503523`〈Developing and Validating an AI-Literacy-Integrated Teaching Acceptance and Readiness Scale for Mathematics Teachers〉。
  - 首發：Crossref published-online 11-05。
  - 摘要：寫 549 名中國數學教師，未寫學段，也未寫在職或職前。
  - 出版社頁：Sage Cloudflare。
- **J08 JRTE** `10.1080/15391523.2026.2758174`〈Empowering K-12 teachers through GenAI-supported vibe coding for educational software development〉。
  - 首發：Crossref published-online 11-06。
  - 摘要：Crossref 沒有摘要。
  - 出版社頁：T&F Cloudflare。
- **J49 European Journal of Education** `10.1111/ejed.70925`（中國 EFL 教師 679 人的 GenAI 與情緒素養）。
  - 首發：Crossref published-online 11-05。
  - 摘要：未寫學段，可能含大學。
  - 出版社頁：Wiley Cloudflare。
- **J52** `10.3390/bs16112107`：仍待全文（11-06 列）。
- **J44 EJTE** `10.1080/02619768.2026.2758679`（歐洲師培與在職專業發展方案中的 AI 倫理，文件分析）：
  - 對象混合職前與在職，判 teacher_ed／unknown，暫不列瀏覽器清單。

**Koli Calling 2026（C23）：**
- **`3856208.3856289`〈Translating Trustworthy AI Requirements into Lower-Secondary Computing Education: A Classroom Workshop Design〉**
  - OpenAlex 摘要首句寫「This poster describes a design for a workshop for learners aged 12–14」，並寫明 "No learning-outcome results are reported."。
  - 依 C23「須區分 full paper、short paper、poster、demo」與會議論文類型區分原則（2025 屆 demo 不收），poster 是否收錄請管理者決定。
  - 若可發：首發 11-04，在 7 天內（到 11-11）。
- **`3856228`、`3856281`：** 仍待瀏覽器清單結果。
- **`3856286`：** demo，不收。

**不收（摘要）：**
- **職前教師：** J47 `educsci16111883`、J32 `s44217-026-02396-8`。
- **高教或大學：**
  - J33 `s41599-026-09604-8`。
  - J29 `1947867`（學校層級只占 6.13%）、`1954396`、`1993147`。
  - arXiv 2611.08431、2611.07297、2611.04783。
- **無 AI 或非 K-12：** J29 `1975110`；J47 `educsci16111884`、`…886`；J52 `bs16112121`；J48 三篇（醫學）。
- **arXiv 2611.07072：** 摘要無 AI，對象不明。
- **arXiv 2611.07798：** 對象未寫。

**列觀察（不在監測清單）：**
- Journal of Moral Education `10.1080/03057240.2026.2748431`：無摘要。
- IEEE Access `10.1109/access.2026.3750896`：無摘要。
- KAIROS `10.64370/vsep9858`：只有年月，摘要寫的是預期結果。
- Educational Policy `10.1177/08959048261476219`：校長落實績效責任政策時使用 AI，概念論文，2026-11-05。
- Education Study 兩篇（只有年份）、QualiSearch、IJMRD、Kognitif。
- Emerald IJLLS（職前，online 11-09）。

### 政策查詢

| 來源 | 狀態 | 結果 |
|---|---|---|
| GOV.UK | 200 | 機構新 9 筆，都是舊頁更新，無 AI；全站標題含 AI 只有企業名錄一則，C |
| Federal Register | 200；全文頁轉向驗證頁，改讀 govinfo 單篇；govinfo 11-06 期目錄 403 | 11-06 期 80 筆，無 ED 或 AI；2026-22680（DOL 學徒制，AI 只見於意見摘要）、22739（CMS），C；public inspection 11-09、11-10 期無 ED 或 AI |
| MEXT | 200 | 報道発表 4 則、新着 2 則，無 AI；大臣記者會見 mext_00749（11-06）只有關鍵詞行，文字版未上傳（見下） |
| 中國教育部 | 200（moe176 回 301，未解析） | 4 則，C |
| 香港政府新聞公報 | 200 | 11-06 全日與 11-07 共 103 篇。律政司司長提到法改會將就 AI 相關罪行、規管未成年人使用 AI 發出諮詢，屬法律範疇，C；正式諮詢發布後留意 |
| 韓國教育部、KICE、KERIS | 200 | 沒有新項目 |
| UNESCO newsroom | 200 | 5 則，C（拉美資料治理不涉教育） |
| Eurydice | 200 | 1 則（賽普勒斯幼教策略，無 AI），C |

- **待追蹤：** MEXT〈関芳弘文部科学大臣記者会見録（令和8年11月6日）〉https://www.mext.go.jp/b_menu/daijin/detail/mext_00749.html 。
  - 關鍵詞列有「米国Google社が公表した学習アカウントにおけるインターネット検索やAIの利用制限への対応方針」。
  - 文字版寫「後日、アップロードします。」，讀不到原文，暫不判讀。
  - 11-13 前上傳就仍在 7 天內。
- **E5a（首次公開 10-31～11-07）：** 無漏收的 A、B 項目。

## 臺灣

| 來源 | 狀態 | 列表最新項目（臺灣時間） | 11-06 08:23 後新筆數 |
|---|---|---|---|
| 教育部即時新聞 RSS | 200 | 2026-11-06 15:37 | 3（比利時根特師培交流、樂齡論壇、凱斯西儲大學訪臺），無 AI |
| 資訊及科技教育司 RSS | 200 | 2026-11-05 14:09 | 0 |
| 國教署即時新聞 | 200 | 2026-11-04 | 0 |
| 行政院公報開放資料 | 521（4 次，未讀到） | — | — |
| 行政院本院新聞 RSS | 200 | 2026-11-05 20:26 | 0 |
| 國科會新聞資料 RSS | 200 | 2026-10-30 10:00 | 0 |
| 數位發展部（第 1 頁） | 200 | 2026-11-03 | 0 |
| 師培藝教司 RSS | 200 | 2026-11-04 16:39 | 0 |
| 學生事務及特殊教育司 RSS | 200 | 2026-11-05 14:31 | 0 |

- **E5a（首次公開 10-31～11-07）：** 無漏收；公報 11-06 期因 521 未查，是唯一缺口，明日補查 11-06 與 11-07 期。

## 需要管理者處理

- **Koli 3856289（poster）：** 是否收錄，請管理者決定。
- **補查（明日）：**
  - 行政院公報 11-06、11-07 期。
  - MEXT mext_00749 文字版。
- **觀察項：** 不在監測清單的出處只列觀察，是否評估由管理者決定。

## 請管理者用瀏覽器處理（2026-11-07）

| 序 | 項目 | 要什麼 | 拿到後可做什麼 | 期限 |
|---|---|---|---|---|
| 1 | https://doi.org/10.1080/10494820.2026.2754924 （J40；本期 -01 只發書目） | 文章頁摘要截圖或全文 PDF | D20261107-01 升為作者摘要型 | 11-12 |
| 2 | https://doi.org/10.1177/07356331261503523 （J36，數學教師 AI 素養融入教學量表） | 全文 PDF（Methods 的教師學段、在職或職前） | 確認為中小學在職教師後發 | 11-12 |
| 3 | https://doi.org/10.1080/15391523.2026.2758174 （J08 JRTE，K-12 教師 vibe coding；無摘要） | 文章頁摘要截圖或全文 PDF | 確認對象後發 | 11-13 |
| 4 | https://doi.org/10.1111/ejed.70925 （J49，中國 EFL 教師 679 人） | 全文 PDF（教師任教學段） | 確認為中小學後發 | 11-12 |
| 5 | https://doi.org/10.3390/bs16112107 （J52；11-06 列） | 全文 PDF（樣本學校與年齡） | 確認為中小學生後發 | 11-12 |
| 6 | https://doi.org/10.1145/3856208.3856228 （Koli；11-06 列） | 全文 PDF（受訪者各組人數） | 依多數樣本判對象 | 11-11 |
| 7 | https://doi.org/10.1145/3856208.3856281 （Koli；11-06 列） | ACM 頁論文類型與摘要截圖 | 確認不是 demo 後發 | 11-11 |
| 8 | https://doi.org/10.3390/bs16112038 （11-03 列） | 文章頁截圖或 PDF | D20261103-02 升為作者摘要型 | 11-08 |
| 9 | https://doi.org/10.3390/educsci16111833 （11-03 列） | 同上 | D20261103-03 升為作者摘要型 | 11-08 |
| 10 | https://doi.org/10.1002/berj.70306 （11-04 列） | 摘要截圖或 PDF | D20261104-01 升為作者摘要型 | 11-08 |
| 11 | https://doi.org/10.1145/3856766.3856768 （11-04 列） | 摘要截圖或 PDF | D20261104-02 升為作者摘要型 | 11-09 |
| 12 | https://doi.org/10.3390/computers15110795 （11-05 列） | 文章頁截圖或 PDF | D20261105-08 升為作者摘要型 | 11-10 |
| 13 | https://doi.org/10.3390/educsci16111866 （11-05 列） | 文章頁截圖或 PDF | D20261105-01 升為作者摘要型 | 11-11 |

## 後續（2026-11-08）

- D20261107-01 依管理者 2026-11-08 提供的出版者 PDF 改為作者摘要型；細節見 2026-11-08-daily-check.md 的 r1 節與 publication/corrections.json。
