# 每日短訊查核紀錄：2026-10-17（3 則）

> 每日短訊例行作業，由排程觸發，編輯 session 執行（檢索由同 session 子代理執行，判讀由編輯 session 複核）。查詢時間 2026-10-17T00:23Z–00:28Z（UTC）。請求未帶 email 或 mailto；遇 403 或機器人驗證都未繞過。結果：**發布 3 則**（D20261017-01～03）。本日首次套用管理者 2026-10-16 的 Crossref 首發日規則（D20261017-02）。

## 查詢

| 來源 | 查詢 | 狀態 | 結果 |
|---|---|---|---|
| Crossref | `filter=from-created-date:2026-10-16,until-created-date:2026-10-16,type:journal-article`，六組 `query.bibliographic`（同 10-11）；每組取前 40 筆 | 200 | 去重 191 筆；同時含 AI 與學校／學生／教師字詞者 62 筆；監測清單命中 J32、J49（2）、J07、J37、J47、J29（2） |
| Crossref（複查） | `10.1177/21582440261497443`、`10.36312/wp1j4x29`（10-16 暫緩） | 200 | 兩筆都已有完整的 published-online 2026-10-15，但摘要仍只有 Crossref 版 |
| 出版者頁面（各試一次） | 8 筆 | Springer 200；Wiley 2 筆、SAGE 403 | Springer 本日可讀 |
| arXiv API | 同 10-16 兩組查詢，各取 40 筆 | 200 | 新見 2610.21663（大學統計課）、2610.18765（C），其餘已判過或為 C |
| alphaXiv | discover_papers（只作發現），以 arXiv API id_list 與 abs 頁核對 | ok／200 | 2610.21233（見下）；2610.22163（大學課程） |
| GOV.UK | Search API（10-10 起）、DfE（10-15 起）、Content API 2 篇演講 | 200 | Ofqual 10-16 演講見「需要管理者處理」；Ofsted 10-16 演講無 AI 內容 |
| Federal Register | term 查詢；ED 機關篩選 | 200；**ED 篩選 403（IP 封鎖）** | term 1 筆無關；ED 篩選未能讀取，未重試 |
| MEXT | 首頁、報道発表、10-16 大臣記者會 | 200 | 無 AI 項目 |
| 中國教育部 | 工作動態、文件、中央文件；10-16 兩則原頁 | 200 | 10-16 雙減會議、學科專業會議皆無 AI 內容 |
| 香港政府新聞公報 | 10-16、10-17 中英文列表 | 200 | 10-16 只有創科局長 RAISe+ 演講（依題名判 C）；10-17 讀取時未上載 |
| 韓國 KICE | 보도자료列表 | 200 | 10-16〈KICE 교육데이터 톡톡 제9호〉題名無 AI，未讀到內文 |
| 韓國教育部 | 보도자료列表 | 200（第一次即成功） | 最新 10-15，無 AI 項目 |
| KERIS | 보도자료列表 | 200 | 10-15 ESG 獎項，屬 C |
| UNESCO | `/en/articles`（已轉址到 `/en/newsroom`） | 301→200 | 10-12～10-16 無 AI 教育項目；10-16 喀麥隆科技峰會屬 C |

查詢的限制：Crossref 每組只看依相關度排序的前 40 筆；登記日不等於上線日。UNESCO 列表網址已改，涵蓋範圍可能與前幾日不同。

## 發布

| 編號 | 來源 | 首發日（依據） | 範圍 | 對象 | 型態 |
|---|---|---|---|---|---|
| D20261017-01 | `10.1007/s44217-026-02264-5` Riachi〈A qualitative typology of teachers' orientations toward artificial intelligence integration in Lebanese schools〉，Discover Education（J32） | 2026-10-16（出版者頁 Published） | A（T-PD、T-ETH、T-TEA） | k12（黎巴嫩公私立學校在職教師 28 人） | 作者摘要歸屬型 |
| D20261017-02 | `10.1111/ejed.70907` Lu、Pei〈Young Learners' Motivation for AI‐Supported Extracurricular French Vocabulary Learning〉，European Journal of Education（J49） | 2026-10-15（首發日依 Crossref published-online，出版社頁讀取失敗） | B（S-LRN） | k12（國小學生 20 人，依 Crossref 摘要） | 書目型（摘要只讀到 Crossref 版） |
| D20261017-03 | arXiv 2610.21233〈"Do You Trust It... or Check It?": Exploring Children's Verification Behaviors in Game-Based Human-AI Collaboration〉 | 2026-10-15（arXiv [v1]） | A（S-ETH、S-LRN） | k12（8–10 歲兒童，遊戲情境） | 作者摘要歸屬型；條件比較，不寫結果 |

兩則摘要型都經隔離子代理第二輪對照，判定一致，依建議微調兩處用詞。候選池 W2026-10-16-A03～A05；知識庫 KB-2026-0381～0383（KR-13887～13913）。

## 列觀察，交管理者決定（出處不在監測清單）

| 項目 | 首次公開 | 範圍 | 對象 | 說明 |
|---|---|---|---|---|
| `10.18178/ijiet.2026.16.10.2714` Teachers Behavior in the AI Assessment Tools Adoption in Morocco | 2026-10-16（原頁） | B（T-TEA） | k12（摩洛哥公立中學教師） | IJIET；原頁有摘要 |
| `10.70838/pemj.640202` AI in the Teaching of Filipino | 2026-10-11（Crossref；原頁只標年份） | A（T-TEA） | k12（高中教師 5 人） | 摘要只有 Crossref 版 |
| `10.1177/02614294261496216` What AI Cannot Give Gifted Learners | 2026-10-16（Crossref；SAGE 403） | A？（概念文章） | 不明 | Gifted Education International |
| `10.24239/pdg.vol15.iss2.1483` Fiqh Education in the Context of AI（系統性回顧） | 2026-10-16（原頁） | A（S-ETH、S-LRN） | 不明 | Paedagogia |
| `10.1002/aaai.70111` AI, intelligence, and children（AI Magazine） | 2026-10-16（Crossref；Wiley 403） | 不明 | 不明 | 無摘要 |
| `10.1177/21582440261497443`、`10.36312/wp1j4x29`（10-16 列過） | 2026-10-15（Crossref 已有完整日期） | A／B | 不明／k12 | 摘要仍只有 Crossref 版 |

## 不匯入

- 職前師資：J07 `10.1007/s11423-026-10746-4`、J37 `10.1007/s10956-026-10365-x` 等。
- 大學、成人、醫護：J47 `educsci16101731` 等。
- 首發早於窗口：`decrc.2026.8.3.625`（09-30）等；`10.68156/5qrrg921` 標示 2026-10-31，晚於期別日。
- J29 `feduc.2026.2003621`（C）、`feduc.2026.1986356`（勘誤）；J49 `ejed.70908` 與 AI 無關。
- C：`10.15290/lingdid.2026.30.05`；`tsc.2026.102394`（Thinking Skills and Creativity，依不收出處排除，且為大學）。
- 官方來源：Ofsted 演講、MEXT、中國教育部、香港、KICE、韓國教育部、KERIS、UNESCO 各項屬 C 或無新項目。

## 需要管理者處理

- **範圍判斷：** GOV.UK〈Connecting curriculum, assessment and trust – qualifications for the next decade〉（Ofqual 署長 Sir Ian Bauckham，2026-10-16 CST 年會演講）https://www.gov.uk/government/speeches/connecting-curriculum-assessment-and-trust-qualifications-for-the-next-decade 。全文約 2,321 字，AI 段落約 1,100 字，談資格考試是否仍需要、AI 作弊與 AI 評分，沒有具體政策宣布。依主要內容屬 A（S-ETH 學術誠信）與 C 的邊界，請決定是否收。

## 請管理者用瀏覽器處理（2026-10-17）

1. https://doi.org/10.1111/ejed.70907 （J49，D20261017-02 已以書目型發布）：需要出版社頁或全文 PDF 的摘要，拿到後可補成摘要型。
2. https://doi.org/10.36312/wp1j4x29 （不在監測清單，k12，首發 2026-10-15）：需要摘要原文；目前列觀察，若管理者同意收錄可發摘要型。

## 既有候選池

本週（10-16～10-22）候選池 5 筆，皆 publish（A01～A05）。
