# 每日短訊查核紀錄：2026-10-13（1 則）

> 每日短訊例行作業，由排程觸發，編輯 session 執行。查詢時間 2026-10-13T00:23Z–00:45Z（UTC）。請求未帶 email 或 mailto。結果：**新增 1 筆候選並發布 1 則短訊**（arXiv 預印本，中學運算課教師與 AI 協作備課，B 類）；另有 4 筆 K–12 相關期刊論文的出處不在監測清單，列觀察交管理者決定。

## 查詢

| 來源 | 查詢 | 狀態 | 結果 |
|---|---|---|---|
| Crossref | `filter=from-created-date:2026-10-12,until-created-date:2026-10-12,type:journal-article`，六組 `query.bibliographic`（同 10-11）；每組取前 40 筆 | 200（兩組先遇 429，間隔後重試成功） | 題名加摘要同時含 AI 與學校／學生／教師字詞者 60 筆，逐筆看上線日、學段與範圍（見下） |
| arXiv API | 摘要含 AI literacy、artificial intelligence literacy，或 generative AI 加 K-12／high school／middle school／primary school／secondary school／elementary；依提交日排序，取 40 筆 | 200 | 10-06 之後只有 2610.10743，已判過 |
| alphaXiv | discover_papers，AI literacy／K-12／children／generative AI，2026-10-06 起（只作發現） | ok | 新出現 **2610.12834**（見下，已發布）；2610.11788、2610.10770 與 K–12 無關 |
| GOV.UK Search API | q=artificial intelligence schools，2026-10-06 起；另以 DfE 篩選 10-11 起 | 200 | 無 K–12 AI 素養相關項目；DfE 10-12 九項（RISE、出缺席統計、評量日期等）皆與 AI 無關 |
| Federal Register API | term artificial intelligence education，2026-10-06 起；ED 機關篩選 | 200 | 3 筆與 5 筆，皆與 K–12 AI 素養無關 |
| MEXT | 首頁新聞列表 | 200 | 10-06 後無 AI 相關項目 |
| 中國教育部 | 工作動態、文件列表 | 200 | 10-10「人工智能赋能教师发展现场会举行」已於 10-12 發布；其餘無新項目 |
| 香港政府新聞公報 | 2026-10-12、10-13 當日列表 | 200 | 無 AI 教育相關項目 |
| UNESCO | articles 列表，經 WebFetch（內容為模型轉述，只當線索） | ok | 10-06 後 6 則，無 AI 相關項目 |

查詢的限制：Crossref 每組只看依相關度排序的前 40 筆，不是全量篩選；登記日不等於上線日。政策來源只查上列列表，未查者不代表當天沒有發布。

## 初篩結果

### 匯入候選池並發布

| 候選 | 項目 | 首次公開 | 範圍 | 對象 | 說明 |
|---|---|---|---|---|---|
| W2026-10-09-A20 | arXiv `2610.12834` From Instructional Intent to Classroom-Ready Lessons: Investigating Teacher-AI Collaboration in Lesson Authoring for Secondary Computing Education | 2026-10-09（abs 頁 Submission history：[v1] Fri, 9 Oct 2026 00:35:00 UTC；僅 v1） | B（T-TEA、T-BAS） | k12（8 名中學運算課教師） | 預印本，未經同儕審查；質性研究，不涉及成效 |

同時建立知識庫紀錄 KB-2026-0273（`preprint`，`bibliographic_checked`，首發日 2026-10-09），關聯 KR-9121～9129，並重建索引、逐年 Markdown 與網站頁。

### 列觀察，交管理者決定（出處不在監測清單）

| 項目 | 首次線上 | 範圍 | 對象 | 出處說明 |
|---|---|---|---|---|
| `10.3390/jintelligence14100257` When AI Is—and Is Not—Needed: AI Literacy and Computational Thinking in Primary STEM | 2026-10-12（Crossref） | A（S-BAS） | k12（93 名三年級學生，準實驗） | Journal of Intelligence（MDPI）；不在監測清單。介入研究，若收錄只能寫設計，不寫成效 |
| `10.3390/su182010310` Toward Responsible and Sustainable AI Integration in Education: A Cross-National Analysis… | 2026-10-10（Crossref） | B（T-TEA；教師 AI 採用） | k12（TALIS 2024，阿聯與上海 1,766 名國中教師） | Sustainability（MDPI）；不在監測清單 |
| `10.1177/21582440261496715` A Training Program for Improving Teachers' Knowledge and Attitudes Toward AI Apps Supporting Speech and Language… | 2026-10-12（Crossref） | A（T-PD；教師培訓） | k12（利雅德 31 名聽障學生的國小女教師） | Sage Open；不在監測清單。介入研究，若收錄只能寫設計 |
| `10.70838/pemj.630910` Ethical Perceptions and Readiness for AI Integration in the Classroom Among … High School Teachers | 2026-10-06（Crossref） | A（T-ETH） | k12（菲律賓一所高中教師） | Psychology and Education: A Multidisciplinary Journal；不在監測清單，審查品質無法核實 |

### 不匯入

| 項目 | 範圍 | 對象 | 處理 |
|---|---|---|---|
| `10.3390/educsci16101691`（J47）、`10.1007/s44217-026-02260-9`（J32） | B | higher_ed | 不進短訊 |
| `10.1177/14687984261497078`（Journal of Early Childhood Literacy） | A | teacher_ed（職前幼教師） | 不進短訊 |
| `10.3390/app162010056`、`10.3390/ai7100417`、`10.3389/fpubh.2026.1967799` 等 | A／B | higher_ed | 不進短訊 |
| `10.1007/s41347-026-00731-2`（自閉症學生生成式 AI 治理） | 不明（無摘要） | unknown | 不匯入 |
| `10.1108/jced-12-2025-0024`（AI 倫理教育） | — | — | Crossref 上線日 2026-10-14，晚於期別日，下期再看 |
| 韓國期刊 2026-09-30 卷期多筆 | — | — | 上線日早於 10-06，不收 |
| 其餘 Crossref 命中 | — | 大學、成人、醫療，或上線日早於 10-06 | 不收 |

本日未命中不收出處。

## 發布的短訊

**D20261013-01**（作者摘要報告）：研究團隊以 8 名中學運算課教師進行兩項互補的質性研究：以焦點團體探討既有的教材編寫做法，並以結構化 AI 輔助教案編寫系統 LessonBuilder 作為研究探針進行放聲思考研究；作者報告，教師的教學意圖在製作、檢視與調整教材的過程中形成，教師有選擇地把任務交給 AI，並保留判斷教材是否適合課堂使用的責任。

兩輪對照：第一輪 00:35Z 讀 arXiv API 與 abs 頁撰寫；第二輪 00:45Z 隔離子代理逐項對照英文原句，判定一致，依其建議改用較貼近原文的用詞。同一模型，非獨立審閱。

## 既有候選池

本週候選池現為 20 筆：publish 7 筆（A14–A20），其餘 hold；`screening_summary` 的 `ready_to_publish`、`verified_for_publication` 同步改為 7。

## 驗證

依 `.github/workflows/verify-and-deploy.yml` 的 verify 步驟在本機逐一跑過（npm ci 之後；public-site 建置前先刪除 `_public_site`），全部通過。

## 補發（2026-10-13，管理者同意）

管理者看過觀察 4 筆的說明後決定：1–3 收（逐篇收錄，不列入監測清單），4 不收（2026-10-13）。三篇的出版者網頁（MDPI、Sage）對自動請求回 HTTP 403，依規則不繞過；改由管理者下載出版者 PDF 提供，2026-10-13T05:50Z 讀取。

| 項目 | 原文首次公開 | 處理 |
|---|---|---|
| `10.3390/jintelligence14100257`（Journal of Intelligence） | 2026-10-12（PDF 首頁 Published；Received 2026-08-18、Accepted 2026-10-07） | 匯入候選 W2026-10-09-A21，發布 D20261013-02；介入研究，只寫目的、設計與樣本 |
| `10.3390/su182010310`（Sustainability） | 2026-10-10（PDF 首頁 Published；Received 2026-08-22、Accepted 2026-10-07） | 匯入候選 W2026-10-09-A22，發布 D20261013-03；相關研究，只寫作者報告的關聯 |
| `10.1177/21582440261496715`（Sage Open） | PDF 只有 Received 2025-08-02、Revised 2026-07-30、Accepted 2026-09-21，**沒有上線日** | 暫不匯入：原文首發日未核（Crossref 登記 2026-10-12 不採用），待管理者提供 Sage 網頁「First published」日期 |
| `10.70838/pemj.630910`（PEMJ） | — | 不收（不列為不收出處） |

- 兩筆知識庫紀錄 KB-2026-0274（Journal of Intelligence）、KB-2026-0275（Sustainability），`journal_article`、`bibliographic_checked`，關聯 KR-9130～9148；不加 `published_in`（不在監測清單）。
- 兩輪對照：第一輪 05:50Z 讀 PDF 撰寫；第二輪 05:58Z 隔離子代理逐項對照英文原句，兩則都判定一致，依建議把「多群組分析」改為「多群組結構方程模型」。同一模型，非獨立審閱。
- 本期改為 3 則；候選池 22 筆，publish 9 筆（A14–A22），`screening_summary` 同步為 9。本機 verify 全部通過。
- 出版者 PDF 依管理者指示另存私人 repo，不放公開 repo。

## 補發第二輪（2026-10-13，Sage Open）

管理者提供 SAGE Journals 文章頁 Details 截圖：Received August 2, 2025；Revised July 30, 2026；Accepted September 21, 2026；Issue published October-December 2026；**Online October 12, 2026**。據此以原文頁日期核定首發日 2026-10-12。

- 匯入候選 W2026-10-09-A23，發布 D20261013-04：利雅德 31 名任教聽障與重聽學生的國小女教師，單組準實驗；A（T-PD、T-TEA）；介入研究只寫目的、設計與樣本。
- 知識庫紀錄 KB-2026-0276（`journal_article`、`bibliographic_checked`），關聯 KR-9149～9161。
- 兩輪對照：第一輪 06:00Z 讀 PDF 摘要與截圖撰寫；第二輪 06:05Z 隔離子代理逐項對照，判定一致，依建議微調用詞。同一模型，非獨立審閱。
- 本期改為 4 則；候選池 23 筆，publish 10 筆（A14–A23），`screening_summary` 同步為 10。PDF 與截圖存私人 repo。
