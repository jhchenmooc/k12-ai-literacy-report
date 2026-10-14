# 每日短訊查核紀錄：2026-10-14（0 則）

> 每日短訊例行作業，由排程觸發，編輯 session 執行（檢索由同 session 子代理執行，判讀由編輯 session 複核）。查詢時間 2026-10-14T00:24Z–00:28Z（UTC）。請求未帶 email 或 mailto。結果：**無合格短訊，不建頁、不登記**。監測清單出處、arXiv 與官方來源在 10-07～10-14 沒有屬 A／B、對象為 k12／other_stakeholders 的新項目；清單外 9 筆 K–12 相關論文列觀察交管理者決定。本日首次查韓國來源（管理者 2026-10-13 決定）。

## 查詢

| 來源 | 查詢 | 狀態 | 結果 |
|---|---|---|---|
| Crossref | `filter=from-created-date:2026-10-13,until-created-date:2026-10-13,type:journal-article`，六組 `query.bibliographic`（同 10-11）；每組取前 40 筆 | 200（未遇 429） | 去重 195 筆；題名加摘要同時含 AI 與學校／學生／教師字詞者 56 筆，逐筆看上線日、學段與範圍；監測清單出處只命中 J47 一筆（大學） |
| Crossref（複查） | `works/10.1108/jced-12-2025-0024`（10-13 暫緩項目） | 200；Emerald 頁 403 | published-online 2026-10-14；大學專業教育的概念論文，出處不在清單，不匯入 |
| arXiv API | 摘要含 AI literacy、artificial intelligence literacy，或 generative AI 加 K-12／high school／middle school／primary school／secondary school／elementary；依提交日排序，取 40 筆；另以 AI／LLM／ChatGPT／chatbot 加 K-12／school／children／teachers／classroom 加廣一次 | 200 | 10-07 起只有 2610.10743、2610.12834，皆已判過；2610.08703 首發 10-06 且屬 C |
| alphaXiv | discover_papers，AI literacy／K-12／children／generative AI，2026-10-07 起（只作發現） | ok | 2610.10463（MBA 學生）、2610.12755（大學學術搜尋），abs 頁讀取 200，對象皆為大學 |
| GOV.UK Search API | q=artificial intelligence schools，2026-10-07 起；DfE 10-12 起 | 200 | 無 K–12 AI 素養相關項目；10-12 的 AI 資安演講與教育無關；DfE 21 項皆與 AI 無關 |
| Federal Register API | term artificial intelligence education，2026-10-07 起；ED 機關篩選 | 200 | 2 筆與 5 筆，皆與 K–12 AI 素養無關 |
| MEXT | 首頁與報道発表列表 | 200 | 10-07 後無 AI 相關項目 |
| 中國教育部 | 工作動態、教育部文件、中央文件列表 | 200 | 無新的 K–12 AI 素養項目（10-10 現場會已於 10-12 發布） |
| 香港政府新聞公報 | 2026-10-13、10-14 列表 | 200 | 10-13 無 AI 教育項目；10-14 讀取時（香港 08:26）當日公報尚未上載 |
| 韓國 KICE | 보도자료列表 boardID=10024；10-14 一則原頁 | 200 | 10-14〈영어과 교육과정의 기본 어휘 개선 방향 제시〉只把 AI 當背景，判 C；10-07 研究報告 13 號已收（A24） |
| 韓國教育部 | 보도자료列表（moe.go.kr boardID=294） | 200（第一次即成功） | 10-07 後 4 則，皆與 K–12 AI 素養無關 |
| KERIS | 例行網址 mi=1080&bbsId=1104；改讀「보도자료」mi=1088&bbsId=1090；10-07 一則原頁 | 200 | 例行網址不是新聞列表（編輯 session 複查：頁名為「계약정보공개」），新聞列表應為 mi=1088&bbsId=1090。10-07 與 초록우산 的業務協約為機構合作，無 AI 素養內容，不收 |
| UNESCO | articles 列表，經 WebFetch（只當線索）；Doha 一則以 curl 讀原頁 | ok／200 | 10-13 Doha 辦公室 AI 倫理論壇報導，非教育，屬 C |

查詢的限制：Crossref 每組只看依相關度排序的前 40 筆，不是全量篩選；登記日不等於上線日。政策來源只查上列列表，未查者不代表當天沒有發布。

## 初篩結果

### 可發布候選

無。

### 列觀察，交管理者決定（出處不在監測清單）

| 項目 | 首次公開 | 範圍 | 對象 | 說明 |
|---|---|---|---|---|
| `10.3390/bs16101892` Transformational Leadership and Heterogeneity in Teachers' Readiness for AI Integration | 2026-10-13（Crossref；MDPI 頁 403） | A（T-PD、T-TEA） | k12（中國 596 名在職教師，問卷） | Behavioral Sciences（MDPI） |
| `10.69685/wqsg8693` Artificial Intelligence in School Leadership | 原頁無上線日（Crossref 10-13） | A（T-BAS） | other_stakeholders（希臘 63 名中學校長） | International Journal of Educational Innovation；實為研討會論文 |
| `10.69685/alrt7360` Secondary School Teachers' Interaction with Artificial Intelligence Systems | 原頁無上線日 | A（T-BAS、T-ETH、T-PD） | k12（10 名中學教師，訪談） | 同上出處 |
| `10.69685/shli3061` 幼教師對學前 AI 素養的看法 | 原頁無上線日 | A（T-BAS、T-PD） | 學前（97 名幼教師） | 同上出處；學前是否算 k12 待決定 |
| `10.66437/qjerp.v2i10.026` Senior High School Teachers in Adopting AI-Enhanced Instruction | 2026-10-12（Crossref；原頁無法載入） | B（T-TEA） | k12（菲律賓 8 名高中教師） | 審查品質無法核實 |
| `10.36713/epra29152` Grade 8 Science Teachers Embedded with AI-Driven Adaptive Learning System | 2026-10-13（原頁） | B（T-TEA） | k12（6 名教師、499 名學生） | EPRA IJMR；品質疑慮高 |
| `10.22219/raden.v6i2.46226` AI-assisted maritime poetry writing book for junior high school students | 2026-10-13（原頁） | B（S-LRN） | k12（八年級） | 介入研究，若收錄只寫設計 |
| `10.64540/pj9sts76` Exploring Students' Critical Thinking through Interaction with Generative AI | 2026-10-07（原頁） | A（S-LRN、S-ETH） | k12（兩所中學，多個案質性） | Al-Hikmah（Nus Publications） |
| `10.59211/mjpjetl.v4i2.468` ChatGPT-Supported FiqhTaharah Learning | 原頁 2026-10-21（晚於期別日） | B（S-LRN） | k12（伊斯蘭高中個案） | 下期再看 |

另有兩筆 Springer 文章（出處不在清單），頁面只回 JavaScript 攔截頁，未繞過：`10.1007/s44436-026-00045-3`（AI, Brain and Child，澳中日韓幼兒教保課程的 AI 素養比較，Crossref 10-13，A；學前是否算 k12 待決定）、`10.1007/s40692-026-00407-z`（Journal of Computers in Education，EFL 教師 AI 素養，學段不明）。

### 不匯入

| 項目 | 處理 |
|---|---|
| `10.1108/jced-12-2025-0024` | higher_ed，出處不在清單 |
| `10.3390/educsci16101704`、`10.3390/educsci16101698`（J47） | 大學，不進短訊 |
| 其餘 Crossref 命中（大學、師培、成人、醫療，或上線日早於 10-07；含韓國期刊 08-31／09-30 卷期） | 不收 |
| KICE 10-14 英語基本詞彙、KERIS 10-07 協約、UNESCO Doha AI 倫理論壇 | 屬 C 或無 AI 素養內容 |

本日未命中不收出處。

## 需要管理者處理

- **出版者頁 403 或攔截，如需請提供 PDF 或頁面截圖：** https://doi.org/10.3390/bs16101892 、 https://doi.org/10.1007/s44436-026-00045-3 、 https://doi.org/10.1007/s40692-026-00407-z
- **例行 trigger 的 KERIS 網址有誤**：建議改為 https://www.keris.or.kr/main/na/ntt/selectNttList.do?mi=1088&bbsId=1090 （待管理者同意後更新）。

## 既有候選池

候選池 24 筆不變，publish 11 筆（A14–A24）。
