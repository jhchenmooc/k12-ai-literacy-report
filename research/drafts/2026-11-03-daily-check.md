# 每日短訊查核紀錄：2026-11-03（4 則）

> 每日短訊例行作業，由排程觸發，在每日短訊專用 session 執行。今天週二。
> - **檢索：** 由同一 session 的三個子代理分頭執行（國際研究、國際政策、臺灣中央來源），判讀由本 session 複核。
> - **查詢時間：** 2026-11-03T00:24Z–01:34Z（UTC）。
> - **請求紀錄：** 都沒帶 email 或 mailto。MDPI 兩篇出版社頁回 403（Akamai「Access Denied」）、Wiley 與 ACM 頁回 403（Cloudflare），都未繞過，沒換 User-Agent；Springer 頁 200。中國教育部 moe_176 欄目改為 301，跟著轉址讀到 200。
> - **結果：4 則。** 國際研究 3 則（1 則作者摘要型、2 則只發書目），國際政策 1 則；臺灣 0 則。
> - **政策來源試辦：** 本期照常檢索並發布 1 則政策項目。（2026-11-04 更正：原寫「今天是試辦最後一天」有誤。依 exceptions.md，11/03 是規則凍結到期、之後開始檢討，不是試辦結束；新來源原定試辦一個月，自 10-22 起每週四讀一次。管理者 11-04 決定跑滿四次，11/13 週報出刊前檢查決定去留，見 #426。）

## 本期項目

| 編號 | 來源 | 首發日（依據） | 範圍 | 對象 | 型態 |
|---|---|---|---|---|---|
| D20261103-01 | J07 Educational Technology Research and Development（Springer），Walkington、Feng、Pruitt-Britton、Beauchamp、Lan〈Should there be a teacher in-the-loop? A study of generative AI-personalized tasks middle school〉 https://doi.org/10.1007/s11423-026-10756-2 | 2026-11-02（出版社頁 Published 02 November 2026；citation_online_date 與 Crossref published-online 同日） | A（T-BAS、T-TEA） | k12（美國 6 所學校的七年級數學教師 7 人與其學生） | 作者摘要型 |
| D20261103-02 | J52 Behavioral Sciences（MDPI），Chen、Yan、Zheng〈Enacting AI Literacy in Historical Inquiry Among Chinese Junior Secondary Students〉 https://doi.org/10.3390/bs16112038 | 2026-11-01（Crossref published-online；出版社頁 403） | A（S-BAS、S-ETH） | k12（中國七年級學生 12 人） | 只發書目 |
| D20261103-03 | J47 Education Sciences（MDPI），Gabrovšek、Rihtaršič〈Design and Preliminary Evaluation of an AI-Enabled Physical Systems Workshop〉 https://doi.org/10.3390/educsci16111833 | 2026-11-01（Crossref published-online；出版社頁 403） | A（S-BAS、S-SYS） | k12（中學生） | 只發書目 |
| D20261103-04 | 韓國教育課程評價院（KICE）〈[동정자료] 한국교육과정평가원, 지역 교육 발전을 위한 교사 초청연수 개최〉 https://www.kice.re.kr/boardCnts/view.do?boardID=10024&boardSeq=5101214&lev=0&m=050102&searchType=S&statusYN=W&page=1&s=kice | 2026-11-03（列表與內頁등록일；hwpx 附件「배포 2026. 11. 3.(화) 08:00」） | A（T-TEA、T-BAS；11-04 由 B 改判） | k12（忠清北道中小學教師約 130 人） | 官方摘要型（研習） |

- **D20261103-01：**
  - **摘要依據：** Abstract 第 4、5、6、8 句。第 7 句是學生偏好的比較結果，末句是作者的延伸討論，都不寫入。樣本學校數依 Method／Sample 段一句，已收進快照第 5 行。
  - **分類：** 研究重點是教師的提示操作，以及教師如何檢核生成題目的深度、倫理與真實性，屬教師 AI 素養的使用策略。依準則「兩者兼有時判 A」，不判 B。
  - **第二輪對照：** 隔離子代理判定通過。依建議修改如下，修正後一致：
    - 學生評分寫明為「對題目的評分」。
    - references 改譯「流行文化元素」。
    - 篇名 Should there be 改譯「是否應有」。
    - 快照補收 Sample 段的學校數句。
- **D20261103-02、-03（只發書目）：**
  - 出版社頁 403、只讀到 Crossref 摘要，依 Crossref 例外只發書目，列入下方瀏覽器清單。
  - -03 是單組前後測，作者寫明 "do not establish causal effects"；範圍說明不寫成效。
  - **第二輪對照：** 隔離子代理對照中文篇名與範圍說明，判定通過。依建議，-03 的範圍說明刪去快照沒收的「單組前後測」。
- **D20261103-04：**
  - **分類：** 子代理初判傾向 A，本 session 改判 B。理由：研習內容是分享 AI 自動評分模型的研究成果，教師是工具的使用方，所以不是 C；準則「生成式 AI 教學培訓一律判 A」指培養教師 AI 素養或 AI 教學能力的培訓，這場不屬於，所以不是 A。
  - **摘要依據：** 網頁本文副標與第 1、2 段；附件中院長的期待語不寫入。
  - **第二輪對照：** 隔離子代理判定大致忠實。依建議修改如下，修正後一致：
    - 서논술형譯為「敘述型與論述型」。
    - 補上時刻與地點。
    - 研習名稱改為「促進地區教育發展之」。
    - 改為不帶時態的寫法。
    - 篇名補「促進」。
  - **待管理者決定：** 這是邊界案例。若管理者認為「AI 相關教師研習一律判 A」，可改判 A（T-PD）。
- **候選池與知識庫：** W2026-10-30-A13～A16（batch 2026-11-03-daily-1）→ KB-2026-0515～0518，KR-15828 起。
  - published_in：-01 J07、-02 J52、-03 J47。
  - studies_country：-01 US、-02 CN；-03 摘要未寫研究地點，不標。

## 國際

### 查詢

| 來源 | 查詢 | 狀態 | 結果 |
|---|---|---|---|
| Crossref | `filter=from-created-date:2026-11-02,until-created-date:2026-11-03,type:journal-article`，六組 `query.bibliographic`，每組 rows=60 | 200 | 各組總數 704／613／1326／2119／420／1159，各取 60 |
| Crossref（proceedings-article） | 同上日期 | 200 | 429（取 40），多為 IEEE ICAIE 2026 |
| Crossref（監測期刊 ISSN） | 29 個 ISSN（含 J52、J53）；帶關鍵詞 rows=60、不帶 rows=200 | 200（多個 ISSN 遇 429，重試成功） | 不帶關鍵詞：J07 1、J29 7、J32 2、J33 9、J36 1、J47 24、J48 156、J49 2、J52 34，其餘 0 |
| 教學代理人 | Crossref 兩組 × 期刊／會議論文；OpenAlex（10-27 起）四組；arXiv 一組 | 200 | 無教學代理人 × K-12 研究 |
| arXiv API（https） | 三組（同前） | 200 | 10-27 起 49 筆（最新提交 10-30T17:53Z），新 16 筆都不是 K-12；**週二新一批到 01:34Z 仍未進 API，列表頁仍停在 Monday, 2 November** |
| arXiv 列表頁 | cs.CY、cs.HC /new（週一批） | 200 | 無 K-12 合格項目 |
| alphaXiv | discover_papers，published_after 2026-10-27 | 連線成功 | 10 筆，無新的 K-12 合格項目 |
| 出版者頁面 | Springer | 200 | — |
| 出版者頁面 | MDPI、Wiley、ACM | 403 | 未繞過 |
| GOV.UK | DfE、Ofqual、Ofsted（10-27 起 70 筆）；全站 11-02 起 443 筆；AI 關鍵詞七組 | 200 | 機構新 6 筆，內文無 AI；全站標題含 AI 的 2 筆（AI Upskilling Challenge Fund：成人；Spärck AI Master's Scholarship：高教），C |
| Federal Register | term 三組、ED 篩選、ED × AI、11-03 期、public inspection | 200 | 11-03 期查詢時尚未收錄；public inspection ED 只有 2026-22437〈Perkins CAR ICR〉，無 AI，C |
| MEXT | 報道発表、新着、大臣記者會見 | 200 | 新項目都 C（新着中提到 AI 的是國立大學法人評價委員會，屬高教）；mext_00747（10-30）、mext_00748（11-02）文字版都未上傳 |
| 中國教育部 | 19 欄目（http） | 200 | 16 筆，C（AI 只見於外交會談、高教雙邊合作、高校通知） |
| 香港政府新聞公報 | 11-02 全日（英 35、中 31）；11-03 | 200 | 提到 AI 的公報屬金融科技與財政，C；11-03 查詢時只有 2 則 |
| 韓國教育部 | 보도자료 | 200 | 1 則 107537（學校藝術教育慶典），hwpx 無 AI，C |
| 韓國 KICE | 보도자료 | 200 | 1 則 5101214 → D20261103-04 |
| 韓國 KERIS | 보도자료 | 200 | 無新項目 |
| UNESCO | `/en/newsroom` | 200 | 無新項目 |
| Eurydice | /news | 200 | 無新項目 |

### E5a 前 7 天回查（首次公開 10-27～11-03）

無漏收的 A、B 項目。GOV.UK 三個機構 × AI 三組交叉查出的都是已判過的 C 項目；Federal Register 與韓國三個機構 10-27 後的項目都已判過。

### 列觀察（出處不在監測清單，首發在 10-27～11-03）

- `10.1002/berj.70306` British Educational Research Journal，Aydogan：TALIS 2024 AI 模組，54,276 名教師的 AI 採用分群（k12 在職教師；可判 A，T-PD、T-TEA）。Crossref published-online 2026-11-01；Wiley 頁 403。
- `10.1145/3856766.3856768` ACM SIGAPP Applied Computing Review，Heilala 等：芬蘭高中生 N=1525 的 AI 能力與風險認知（k12；可判 A）。Crossref online 2026-11-02，但期別日期 2026-09-01，首發日有疑義；ACM 頁 403。
- `10.65525/ipe.v3i2.123` Interdisciplinary Perspectives of Education：印度高中生物教師 150 人的 AI 準備度；11-02。
- `10.56238/revgeov17n11-001`、`-006` Revista de Geopolítica：巴西小學低年級 AI 文獻研究、高中作業 AI 作者歸屬評量；11-02；地緣政治期刊刊登教育文章，出處性質待查。
- `10.70267/jlce.v3n6.1926` Journal of Language, Culture and Education：義務教育 AI 輔助專題學習的挑戰（文獻研究）；11-02。
- `10.33097/jncta.2026.10.10.3257`（韓國期刊）：國中生生成式 AI 素養中介效果；無摘要，只有 published-print 2026-10-28，首發日待確認。
- IEEE ICAIE 2026 會議論文 5 篇（小學科學、國中作文、高中 AI 倫理專題、中小學教師 AI 數位素養、小學數學）：不在會議池，Crossref 只有 2026-05，首發日無法確認。

### 不收

- **監測期刊：** J49 `ejed.70923`、J47 `educsci16111834`／`11831`／`11839`／`11827`／`11837`、J32 `s44217-026-02381-1`：高教或大學。J52 其餘（`bs16112059` 非 AI、`bs16112047` 非教育、`bs16112062` 企業、`bs16112067` 大學生）。J48 非 K-12 或非教育。
- **Crossref 關鍵詞：**
  - 職前教師：`s11218-026-10314-x`、`fpsyg.2026.1984940`、`su182111145`、`15348458.2026.2750492`。
  - `21582440261504502`：混合樣本，職前 119 人多於在職 49 人，依多數判 teacher_ed。
  - 高教：`s44163-026-02689-9` 等。
  - 首發日無法確認：`ijtes.7426`、`.8155`、`procs.2026.10.139`、`chapman.000762`。
  - 首發早於窗口：`jaitd.2026.2(5).08`、`pss.155`。
  - C：`ejceel.2026.4(5).23`（AI 只是系統後端）。
- **arXiv、alphaXiv：** 大學、研究生、專家、一般成人、概念論文或技術論文；2610.41215 自動評分，C。

## 臺灣

| 來源 | 狀態 | 列表最新項目（臺灣時間） | 11-02 08:24 後新筆數 |
|---|---|---|---|
| 教育部即時新聞 RSS | 200 | 2026-11-02 16:50 | 3（ART TAIPEI 藝術教育日、國教院院長交接、青聚點 GOOD DESIGN AWARD：原頁無 AI；RSS 命中的 "AI" 是 "TAIPEI"） |
| 資訊及科技教育司 RSS | 200 | 2026-10-30 13:49 | 0 |
| 國教署即時新聞 | 200（一次成功） | 2026-11-03 | 0 篇新新聞（體育教學一則日期更新為 11-03，11-02 已判過，無 AI） |
| 行政院公報開放資料 | 200 | 115-11-02 | 1 期 8 筆，無教育部或國教署 |
| 行政院本院新聞 RSS | 200 | 2026-10-31 16:24 | 0 |
| 國科會新聞資料 RSS | 200 | 2026-10-30 10:00 | 0 |
| 數位發展部新聞發布（第 1 頁） | 200 | 2026-11-02 | 1（憑證更新，C） |
| 師資培育及藝術教育司 RSS | 200 | 2026-11-02 16:50 | 1（ART TAIPEI，重複） |
| 學生事務及特殊教育司 RSS | 200 | 2026-10-31 11:25 | 0 |

- **E5a（首次公開 10-27～11-03）：** 無漏收；公報 10-27 至 11-02 各期都已查，無缺期。

## 需要管理者處理

- **補查（明日一併查）：**
  - arXiv 週二新一批。
  - MEXT 記者會見文字版（mext_00747、mext_00748）。
  - Federal Register 11-03 期全文與 public inspection 11-04 期。
  - 香港 11-03 全日公報。
- **分類邊界：** D20261103-04 KICE 研習判 B（見上），如要改判 A，請告知。
- **觀察項：** 不在監測清單的出處（見上）只列觀察，是否發布或評估，由管理者決定。BERJ（TALIS AI 模組）與芬蘭高中生研究規模較大，可考慮由文獻 session 評估。

## 請管理者用瀏覽器處理（2026-11-03）

| 序 | 項目 | 要什麼 | 拿到後可做什麼 | 期限 |
|---|---|---|---|---|
| 1 | https://doi.org/10.3390/bs16112038 （J52 Behavioral Sciences，中國七年級學生在歷史探究中實踐 AI 素養；MDPI 403） | 文章頁「Published」日期與摘要截圖，或全文 PDF | D20261103-02 由書目升級為作者摘要型（需更正紀錄） | 11-08 |
| 2 | https://doi.org/10.3390/educsci16111833 （J47 Education Sciences，中學生 AI 賦能實體系統工作坊；MDPI 403） | 文章頁「Published」日期與摘要截圖，或全文 PDF | D20261103-03 由書目升級為作者摘要型（需更正紀錄） | 11-08 |

## 補記（2026-11-04，管理者改判 D20261103-04）

- **決定：** 管理者 2026-11-04 決定 D20261103-04（KICE 教師邀請研習）由 B 改判 A。
- **理由：** 這場是以中小學教師為對象的在職研習，整場以 AI 自動評分模型的應用為主題。D20261023-03 流行音樂種子教師創作營的 AI 只佔部分課程，已判 A；比照該例，這則也判 A。原文沒寫是否為生成式 AI，也沒寫倫理或監督，所以不對應「執行監督以檢核AI產出」。
- **改動：**
  - claim、候選池 W2026-10-30-A16 的 `ai_lit_class` 改為 A，`ai_lit_dims` 改為 T-TEA、T-BAS。
  - 知識庫 KB-2026-0518：KR-15867 由 AILIT_B 改為 AILIT_A，新增 KR-15869（T-BAS）。
  - issues.json 加 `revised_on` 2026-11-04；corrections.json 加 `daily-2026-11-03-r1`。
- **摘要文字：** 不變。
