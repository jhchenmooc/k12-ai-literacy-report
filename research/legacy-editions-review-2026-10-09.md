# 2026-10-09 舊刊回頭檢驗：9 月月報及創刊特刊

**涵蓋兩份已公開舊刊**：
- [9 月月報](../monthly/2026-09/index.html)（觀察期間 2026/08/29–09/29）
- [創刊特刊](../weekly/2026-09-29_10-08/index.html)（2026/09/29–10/08）

此次按既有編輯原則核對：**來源／發布日／事件日／數值／規範效力／研究因果／跨學段與臺灣政策外推**。直接閱讀兩份 GitHub HTML、既有研究回查、13 筆歷史核查紀錄，並再次查閱部分官方原始文章。這不是全文逐條外部專家審稿，**不得將全部舊刊改標為認證通過**。

## 結論

- **確定需修正的編輯準確性問題：1 項（9 月月報 PISA 2025）**。已直接修正內文，並於刊物開頭保留可見更正告示。
- **重要主張抽樣回查：未在已核對的其他關鍵數值／日期中發現需立即撤回的重大相反證據**。此結論僅限於本次列示的官方原文位置，不是全部主張皆已證實。
- **仍無法獨立認證**：每一條主張的原始全文快照與獨立人員逐項簽核；9 月月報 10 則中的未回查機構指引／教育框架細節。
- **既有舊刊與新版出版門檻分開**：`publication/issues.json` 不為舊刊增加認證項目，原有 [13 筆歷史查核資料](../publication/audits/2026-09-29_10-08.json) 仍保持 `hold`。

## A. 必須更正：月報 OECD PISA 2025

**原刊用語（摘要）**：「探討學生使用 AI、閱讀能力、批判思考與學習表現之關聯」。

**問題**：對應的 OECD PISA 2025「學生以 AI 聊天機器人做學校作業」段落報告主要比較 **PISA 科學成績（science performance）** 與 AI 使用目的、使用頻率、學生在校練習查核 AI 資訊品質的機會，不能將該段當作 AI 使用改善或直接衡量閱讀能力的因果證據。PISA 含閱讀能力測量，不代表每個 AI 分析都在比較閱讀表現。

**改為**：「分析學生使用 AI 聊天機器人協助學習、在校評估 AI 產出品質的機會，以及與科學成績之間的關聯；此段資料不能當成 AI 使用提升閱讀能力的證據。」

**原文位置**：[OECD PISA 2025 Results Volume I / Student school life and beyond / Students’ use of artificial intelligence for schoolwork](https://www.oecd.org/en/publications/pisa-2025-results-volume-i_73451bc5-en/full-report/student-school-life-and-beyond_861e5904.html)；[完整報告發布資訊（2026-09-08）](https://www.oecd.org/en/publications/2026/09/pisa-2025-results-volume-i_5265bfb1/full-report.html)。

**嚴重度**：中。若不改正，會錯置學科結果變項，影響評量與因果判讀；原刊已註記「不能直接視為因果」，但單靠該註記仍不足以消除結果變項混淆。

## B. 9 月月報：官方原文抽查

| 主張 | 抽查結果 | 依據、待注意處 |
|---|---|---|
| OECD 9/8 發布 PISA 2025，AI 使用／品質查證與科學成績關聯 | **更正後可保留有限敘述** | [OECD 原報告](https://www.oecd.org/en/publications/pisa-2025-results-volume-i_73451bc5-en/full-report/student-school-life-and-beyond_861e5904.html)；關聯不代表因果，不能換成閱讀成績 |
| 歐洲理事會 CM/Rec(2026)12 AI literacy 建議 | **核心存在性可保留** | [歐洲理事會官方資料](https://www.coe.int/web/education/-/recommendation-cm/rec-2026-12-of-the-committee-of-ministers-to-member-states-on-artificial-intelligence-literacy)；2026-09-02 **建議（Recommendation）而非各國已生效強制法規**；三維度由官方新聞說明支持 |
| 澳洲 NSW Stage 6 take-home 評量每科最多 1 項、校內評量權重最多 15%，2026/2027 分期 | **可保留，需維持例外** | [NESA 8/31 通告](https://www.nsw.gov.au/education-and-training/nesa/news/all/new-take-home-assessment-rules)及[9/24 FAQ](https://www.nsw.gov.au/education-and-training/nesa/news/all/limits-take-home-assessments-faqs)；限特定 Preliminary / HSC 課程，包含 major project 或 practical exam 例外；不可擴張為所有 NSW 年級 |
| 紐約市 2-K–8 年級 student-facing GenAI 一年暫緩、高中每年兩次 45 分鐘素養模組及受監督試點 | **可保留，須維持界線** | [市府 9/2 公告](https://www.nyc.gov/mayors-office/news/2026/09/mayor-mamdani-and-chancellor-samuels-put-students-first-with-nat)；是紐約市政策，不是全美禁用 AI，也不表示停止所有教師使用 |
| UNESCO/UNICEF Innocenti 97 名 9–17 歲兒少、5 個非洲國家 | **可保留，樣本不可外推** | [UNICEF 官方報告](https://www.unicef.org/innocenti/reports/skills-ai-world)；兒少諮詢（consultations）不是五國代表性隨機抽樣；報告日期為 2026-09 |
| 雪梨大學研究綜整 271 篇，45 個以上國家 | **可保留，勿過度推論** | [雪梨大學 9/3 原公告](https://www.sydney.edu.au/news-opinion/news/2026/09/03/australia-lacks-evidence-on-genai-in-schools--landmark-global-re.html)；是研究綜整，不代表全部研究有可靠因果效果 |
| 荷蘭教師 AI literacy 框架含 Competent/Critical/Creative/Professional 四維度 | **可保留** | [特文特大學 9/16 官方說明](https://www.utwente.nl/en/about-us/news-events-ceremonies/news/2026/9/1159710/ut-contributes-to-new-ai-literacy-framework-for-schools)；屬 Kennisnet 與大學合作框架，不是荷蘭所有學校的法律義務 |
| 臺灣 115 年指引與 AI Agent 內容 | **尚未於本輪核對完整指引文字** | 需回到教育部正式指引文件對照發布版本及手冊條款；不要因此將現有舊刊認證通過 |
| 孟加拉教師 ICT-AI Competency Framework 正式推出之政策效力 | **本輪未做逐條官方文件核對** | 原刊為 UNESCO 活動訊息，應避免讀成全國教師已被強制認證 |
| 月報政策趨勢與「5 個臺灣訊號」 | **本刊編輯分析，非外部實證結論** | 不宜稱為 OECD、UNESCO 或歐洲理事會已採納臺灣專案架構；須保留分析者立場 |

## C. 創刊特刊：原始頁面抽查

| 主張 | 抽查結果 | 限制 |
|---|---|---|
| Education International Robertson／Martini 9/30 評論、10/1 更新 | **來源／日期確認** | [EI 作者評論](https://www.ei-ie.org/en/item/33089%3Ales-cadres-de-reference-sur-lintelligence-artificielle-contribuent-ils-a-transformer-les-ecoles-en-terrains-dexperimentation-et-en-lieux-dextraction-de-valeur-pour-lia)；文本批評不得當成跨國教師自主權實際下降統計 |
| UNESCO 10/2 教育 AI 設計培訓、20 多國參與者 | **來源／日期／活動性質確認** | [UNESCO](https://www.unesco.org/en/articles/start-defining-problem-not-algorithm-designing-ai-education)；20 多國**參與者來源**不是 20 多國正式課綱或國家立法 |
| UNESCO 9/30 報導北京 8/17–23 鄉村教師培力、100 人以上 | **來源／活動時間／人數量級確認** | [UNESCO](https://www.unesco.org/en/articles/china-southeast-asia-programme-strengthens-teacher-capacity-ai-and-stem-education-rural-communities)；不是 100 多名學生完成成效試驗 |
| UNESCO 10/1 兩位肯亞教師訪談、10/3 更新 | **來源／日期／受訪數確認** | [UNESCO](https://www.unesco.org/en/articles/how-kenyan-teachers-embrace-technology-while-keeping-human-connection-classroom)；是教師個人經驗不是可外推的 AI 學力效果 |
| 四則消息反映全球政策共識或直接證實臺灣 PAK、雙途徑鷹架 | **舊刊已明示不支持此結論** | 仍應維持「本刊分析」與來源事實分開，並揭露來源機構偏重 UNESCO |

本輪抽查未發現創刊特刊四則主要來源在上述事實上的明確衝突；**不代表其每句文字及引用均經完整獨立查核**。

## D. 殘留風險與最小後續處置

1. **已完成**：更正月報 OECD 的結果變項用語、公開保留更正說明與此份來源追溯紀錄。
2. **未完成**：整份月報的教育部指引、孟加拉框架政策效力及跨文獻的所有數字逐字獨立查核；不改成「認證合格」。
3. **不值得再擴充**：不補建 9 月舊刊的所有模擬審查題庫、不重新實作新系統，不為補滿既有舊刊而阻擋 10/16 首期標準週報。
4. 若後續有人提供可直接推翻舊刊重要事實的原始公告，再就該句做最小改動並補充更正紀錄，不暗中刪除原始錯誤說明。
