# P0 官方政策版本查核｜第二批（2026-10-09）

> 本文件只記本次可追溯之原始官方入口與頁面明示資訊，非政策效力完整鑑證、非新訊認證。配合 [第一批](p0-policy-version-audit-2026-10-09.md) 使用。

## 官方來源與版本補核

| source_id | 官方原始頁面 | 可確認結果 | 閱讀與覆蓋限制 | 下一步 |
|---|---|---|---|---|
| O-SG-MOE | [2023-09-20 MOE press release](https://www.moe.gov.sg/news/press-releases/20230920-more-support-for-schools-and-students-to-shape-the-future-of-learning)、[EdTech Masterplan 2030](https://www.moe.gov.sg/education-in-sg/educational-technology-journey/edtech-masterplan)、[AI in education](https://www.moe.gov.sg/education-in-sg/educational-technology-journey/edtech-masterplan/artificial-intelligence-in-education) | 2023-09-20 官方新聞標題及摘要指出 EdTech Masterplan 2030 相關措施自 2024 年陸續實施；MOE 有獨立 AI in education 主題頁。**這不代表頁面的現行文字均於 2023-09-20 首發** | 官方網頁直接讀取遭 JavaScript/robot verification 阻擋；本次只有搜尋索引片段及官方入口，標記 **partial/unavailable**，不可冒充全文查核 | 後續取得 MOE 公告全文，區分計畫公布／漸進落地／AI 功能細節及文件更新日期 |
| O-JP-MEXT | [官方指引及行政通知索引](https://www.mext.go.jp/a_menu/other/mext_02412.html)、[新版官網](https://www.mext.go.jp/zyoukatsu/ai/index.html) | 官方明列 2023-07-04 暫定指引作成通知、2024-12-26 Ver.2.0 修訂通知；新版指引正文 PDF 可從官網找到 | 確認的是官網日期與版本鏈，不是歷次 PDF 全文對照。2025/2026 新網站內容不等於 Ver.3.0 正式發布 | 查新版本是否另有發布通知，按版本逐條對照 |
| O-KR-MOE | [國家法令中心舊版本](https://www.law.go.kr/lsInfoP.do?lsiSeq=273351)、[現行第29-2條](https://law.go.kr/LSW/lsLinkCommonInfo.do?lsJoLnkSeq=1029394715) | 2025-08-14 增訂第29-2條：AI 學習支援軟體屬「教育資料」，與第29條教科用圖書不同；選用涉及個資主管機關協調標準及學校運營委員會審議。現行頁另顯示法令 2026-09-11 版本施行 | 第29-2條增訂日不等於後續整部法律每次施行日；不能推論「韓國禁止 AI 課本」或學校全數停用 | 追完整修法公布／施行及過渡規定，2024 教育部公告仍列歷史版本 |
| O-UK-DFE | [DfE 更新歷程及原文](https://www.gov.uk/government/publications/generative-artificial-intelligence-in-education) | 首發 2023-03-29、2023-10-26 個資／智慧財產更新、2025-01-22 智財和產品安全、2025-06-10 支援教材連結、2025-08-12 Ofsted 指引／研究簡介補充 | 這些不同類型更新**不等於**每次都更換法律或對學校新增法定要求；適用 England | 必要時再向 National Archives 逐版比對 HTML 正文 |

## 反證與出版安全自檢

1. **官方入口≠全文查核**：新加坡站點受到阻擋，不能以搜尋摘要推測細部政策或完整日期；本批不得以 `full_text_checked` 登錄。
2. **發文 vs 生效 vs 更新**：日本通知、韓國法條增訂與法令版本施行、新加坡措施逐步實施、英格蘭指引更新為四種不同時間，不能混用。
3. **指引 vs 法律**：MEXT、DfE/SG MOE 公告不等同韓國國會修正法律；不可把政策話語當校園落地成效。
4. **首週排除**：以上為 2023–2025 的來源脈絡與 2026 年前既有法律，不代表 2026-10-09–15 本週首次公開；不得進入正式出版 claims。
5. **資料操作**：不改 `publication/issues.json`、九筆候選的 `hold`、知識庫認證旗標、驗證器及 CI；不抄錄受限全文。
6. **學術監測**：尚未展開 J01–J39/C01–C22 的逐篇搜尋，不能宣稱已完成覆蓋或零命中。

本批僅就政策版本進行定向查核；後續依 v1.7 P0 搜尋池優先級分批記錄 query_scoped / items_screened 等真實覆蓋。
