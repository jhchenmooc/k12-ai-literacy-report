# 每日短訊查核紀錄：2026-10-25（0 則）

> 每日短訊例行作業，由排程觸發，在每日短訊專用 session 執行。
>
> - **檢索方式：** 同 session 的三個子代理分頭檢索（國際研究、國際政策、臺灣中央來源），判讀由本 session 複核。
> - **查詢時間：** 2026-10-25T00:23Z–00:31Z（UTC）。
> - **請求紀錄：** 都沒帶 email 或 mailto。ScienceDirect 回 403，未繞過；另一出版社頁連線重設，未讀到。
> - **結果：0 則**（國際、臺灣皆無合格項目）。依 SOP 第 5 步，不建頁、不登記，只提交本查核紀錄。
> - **週日：** Crossref created 10-25 在查詢時為 0 筆，10-24（週六）的登記量也偏低。

## 國際

### 查詢

| 來源 | 查詢 | 狀態 | 結果 |
|---|---|---|---|
| Crossref | `filter=from-created-date:2026-10-24,until-created-date:2026-10-24,type:journal-article`，六組 `query.bibliographic`，每組 rows=40 | 200 | 各組總數 260／307／841／1268／261／626，各取 40 |
| Crossref（created 10-25） | 同六組 | 200（q5 先 429，重試成功） | 查詢時 0 筆 |
| Crossref（proceedings-article） | 10-24、10-25 | 200 | 72／0，無合格項目 |
| Crossref（監測期刊 ISSN） | 23 本；帶關鍵詞 rows=60、不帶 rows=200；10-24 與 10-25 | 200（J36、J37 各一次 429，重試成功） | 10-24 為 7 筆／104 筆，10-25 為 0 |
| 教學代理人 | Crossref 兩組 × 期刊／會議論文，本機過濾；OpenAlex（10-18 起）四組；arXiv 一組 | 200 | Crossref 0；OpenAlex 1 筆（`10.64728/sirad.v2i3.art8`，10-24 已列觀察）；arXiv 10-18 後 0 |
| arXiv API（https） | 三組（同 10-20） | 200 | 去重 183 筆，10-18 後提交 83 筆，未判過者皆不合格 |
| alphaXiv | discover_papers 四組，published_after 2026-10-18 | 連線成功 | 8 筆，與 arXiv 重疊，皆不合格 |
| 出版者頁面（各試一次） | Springer、Nature 2、SpringerOpen、unnes.ac.id、ScienceDirect、Médiations et médiatisations | 前五個 200；ScienceDirect 403；Médiations et médiatisations 兩次 connection reset | — |
| OpenAlex DOI 查詢 | `10.1016/j.caeo.2026.100428` | 404 | 尚未收錄 |
| GOV.UK | DfE、Ofqual、Ofsted（10-17 起）；三機構 × AI 關鍵詞交叉查 | 200 | 無新項目；不分機構查詢命中 HM Treasury〈Chancellor unveils Britain's ambitious plan for AI〉（10-24），學校只出現在一句泛稱，C |
| Federal Register | term 三組、ED 篩選、ED × AI；public inspection | 200 | 10-24、10-25 為週末，無公報；public inspection 10-26 期 ED 只有 2026-21804（已讀，無 AI） |
| MEXT | 報道発表、新着、10-23 大臣記者會見 | 200 | 〈教育課程企画特別部会（第22回）の開催について〉議題為關係團體聽證，無 AI，C；10-23 記者會見「テキスト版」仍寫「後日、アップロードします。」 |
| 中國教育部 | 10 個欄目 | 200 | 10-23 三則（高教兩則、無 AI 一則），C；另補記 10-22 中辦國辦〈關於推動科技創新和產業創新深度融合的意見〉，AI 只在產業與法規句，不涉及教育，C |
| 香港政府新聞公報 | 10-24 全日（英 11、中 13）、10-25（查詢時英 1、中 1） | 200 | AI 相關 3 則（創新科技嘉年華、制服團隊領袖論壇、財政司司長致辭），AI 只是附帶提及，C |
| 韓國 KICE／KERIS | 列表 | 200 | 無新項目（最新 10-20／10-15） |
| 韓國教育部 | 보도자료 | 第一次 connection reset，重試 200 | 〈인공지능 시대, '인문학은 질문합니다.'〉（10-25 09:00 보도）第 21 회 인문주간，對象為一般民眾與大學人文教育，adult／higher_ed，不收 |
| UNESCO | `/en/newsroom` | 200 | 10-24、10-25 無新項目 |
| Eurydice | /news | 200 | 無新項目（最新 10-23 Spain，已判 C） |

### E5a 前 7 天回查（政策，首次公開 10-18～10-25）

- **GOV.UK：** 關鍵詞命中都是更新日，或 AI 只用在行政上，前幾日已判過。
- **Federal Register：** 窗口內 term 命中都不是教育機構，C。
- **UNESCO：** 找到前幾日未記錄的 3 則，複核後都不發：
  - 〈UNESCO reaffirms that young people are at the heart of the Organization's future〉（datePublished 2026-10-22）
    - 內容是執行局決定召開特別大會，討論是否制定「AI 時代年輕人與數位環境」國際準則文書。屬程序決定，沒有談到師生 AI 素養或學校，C。
    - 2027-01-29 特別大會可列為追蹤線索。
  - 〈UNESCO MIL Alliance announces the creation of 16 Chapters to strengthen global cooperation〉（2026-10-22）
    - 聯盟分會成立公告，內容是「Artificial Intelligence and MIL」等分會名稱與宗旨，沒有具體的 AI 素養內容，C。
  - 〈Education Beyond 2030: Foresight Thematic Consultations〉（sdg4education2030 子站，2026-10-23）
    - 諮詢會議預告；AI 場次在 2026-12-14，由芬蘭與 OECD 主辦。不是政策文件，AI 只是五個主題之一，不發。
    - 場次成果可留作週報或月報的追蹤線索。

無漏收。

### 待補（監測清單內，未達門檻）

| 項目 | 首次公開 | 範圍 | 對象 | 說明 |
|---|---|---|---|---|
| J41 Computers and Education Open `10.1016/j.caeo.2026.100428`〈Revisiting Pedagogical Content Knowledge (PCK) development for the age of Generative AI〉（Webb、MacCallum、Torrington 等 11 人） | 不明：Crossref 只有 published-print 2026-10，沒有 published-online；ScienceDirect 403 | 可能 A（T-TEA） | 不明（在職教師或師培） | Crossref 無摘要，OpenAlex 404；見瀏覽器清單 |

### 列觀察（出處不在監測清單）

- **`10.1186/s40561-026-00464-y`**：Smart Learning Environments（SpringerOpen），Bergdahl〈Student epistemic agency in AI-mediated practices〉。
  - 首次公開 2026-10-24。
  - 研究場域是一所瑞典學校的「AI on the schedule」試辦，對象為 47 名七年級學生。
  - 判 A（S-ETH）、k12。
  - 可考慮把 SLE 列入來源擴充評估。
- **`10.52358/mm.vi24.529`**：Médiations et médiatisations，Zeyringer〈Au-delà de l'adoption : les non-usages des IA génératives par les lycéens en France au prisme de l'éthique〉。
  - 首次公開 2026-10-24（Crossref）；出版者頁連線重設，未讀到。
  - 對象為 153 名不使用生成式 AI 的法國高中生。
  - 判 A（S-ETH）、k12。
- **`10.15294/lc.v21i2.58110`**：Language Circle，印尼十年級 37 名學生以 Grammarly 回饋修改論說文的混合方法研究。
  - 首次公開 2026-10-21。
  - 判 B（S-LRN）、k12；屬介入研究。

### 不收

- **監測期刊：**
  - higher_ed：J05 `s10639-026-14175-x`（大學設計系學生）、J32 `s44217-026-02350-8`（醫學生）、J32 `s44217-026-02356-2`（高教教職員）、J36 `07356331261498975`（高等教育綜整）。
  - J48 `s41598-026-76173-w`：大學生，機器學習只是分析方法，C。
  - J33 `s41599-026-09527-4`、`s41599-026-09480-2`：只談數位能力或 STEM 專業發展，不涉及 AI，C。
  - 其餘監測期刊命中無 AI 或非教育。
- **Crossref 關鍵詞命中：**
  - teacher_ed：`10.5296/elr.v12i2.24111`、`10.64880/pcjaict.v1i6.12`。
  - 文獻計量、對象不明：`10.56855/ijmme.v4i3.2370`。
  - 其餘首次公開不在窗口內（早於 10-18，或 published-online 在 10-31）。
- **arXiv／alphaXiv：**
  - 已判過：2610.28859（D20261023-01）、2610.26758、2610.28840、2610.25192、2610.27448、2610.27162。
  - higher_ed：2610.31481、2610.30599、2610.30195、2610.29140、2610.25560。
  - 2610.30828 為 LLM 家教基準，沒有師生參與者，C；2610.31041 為概念或技術論文，對象不明。

## 臺灣

| 來源 | 狀態 | 列表最新項目 | 10-24 08:24 後新筆數 |
|---|---|---|---|
| 教育部即時新聞 RSS | 200 | 2026-10-24 08:40 | 2（AI 相關 1 則，C） |
| 資訊及科技教育司 RSS | 200 | 2026-10-07 | 0 |
| 國教署即時新聞 | 200 | 2026-10-21 | 0 |
| 行政院公報開放資料 | 200 | 115-10-22 期 | 0（10-23 期仍未補出） |
| 行政院本院新聞 RSS | 200 | 2026-10-22 13:52 | 0 |
| 國科會新聞資料 RSS | 200 | 2026-10-20 | 0 |
| 數位發展部新聞發布（第 1 頁） | 200 | 2026-10-22 | 0 |
| 師資培育及藝術教育司 RSS | 200 | 2026-10-21 | 0 |
| 學生事務及特殊教育司 RSS | 200 | 2026-10-22 16:35 | 0 |

- **〈青探號輔導員善用AI陪伴迷惘青少年重返校園〉**（青年署，2026-10-24 08:40）
  - 主體是「青少年生涯探索號計畫」績優輔導員的個案故事，AI 只出現在一句：輔導員「將AI工具利用在文獻探討以及教案發想上」。
  - 對象是國中畢業後未升學、未就業的青少年，以及地方輔導人員，不是中小學在校師生。C。
- **〈從運動走向多元學習 打造兼具運動學習交流的校園空間〉**（國教署，10-24 08:30）：無 AI，不收。
- **行政院公報：** 115-10-23 期仍未補出（最新下載、本月清單與首頁本期皆停在 10-22），10-26 再確認。

臺灣段無新項目。

## 候選池與知識庫

無新增候選；觀察 3 筆不在監測清單，依規則不直接匯入。

## 需要管理者處理

- **補查：** MEXT 10-23 大臣記者會見文字版（頁面列出的關鍵詞無 AI）、行政院公報 10-23 期（是否補出），10-26 查。
- **來源擴充（供參考）：** 這幾天的觀察項目中，Smart Learning Environments 出現 k12、A 的研究（10-25 的 SLE 一篇），Nordic Journal of Digital Literacy 也有（10-24）。是否列入監測清單，由管理者與編輯 session 決定。

## 請管理者用瀏覽器處理（2026-10-25）

1. https://doi.org/10.1016/j.caeo.2026.100428 （J41 Computers and Education Open〈Revisiting Pedagogical Content Knowledge (PCK) development for the age of Generative AI〉；ScienceDirect 403，Crossref 只有出版年月、無摘要）
   - 要什麼：文章頁「Available online」日期截圖與摘要，或全文 PDF。
   - 拿到後：若首次上線在 10-18 之後、對象為在職中小學教師，可補發（至上線日後 7 天內）。

前幾日清單已處理完畢，無延續項目。
