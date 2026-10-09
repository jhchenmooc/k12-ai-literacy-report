# P0 官方政策版本查核｜第一批（2026-10-09）

> v1.7 知識庫**查核筆記**，非新聞、非法律意見、非 v1.6 出版認證。只記本次直接查得的官方入口；原文未取得／版本未完成者列待查。歷年資料不得當作 2026-10-09–15 首次公開事件。

## 查核範圍與分層

| 來源 | 原始官方證據 | 事件／發布／更新日期 | 地理範圍與文書性質 | 核查層級 | 尚待查證 |
|---|---|---|---|---|---|
| O-JP-MEXT | [文科省日文彙整頁](https://www.mext.go.jp/a_menu/other/mext_02412.html)、[指引入口](https://www.mext.go.jp/zyoukatsu/ai/index.html) | 暫行指引：2023-07（僅月精度）；Ver.2.0：2024-12-26 公表 | 日本初等中等教育；供學校及教育行政參考的指引，非直接法律命令 | 官方入口和修訂說明已查；尚非完整 PDF 逐條校讀 | 暫行版確切日期／原 PDF、Ver.2.0 後是否另有正式新版本及完整差異 |
| O-UK-DFE | [DfE 政府發布頁與更新歷史](https://www.gov.uk/government/publications/generative-artificial-intelligence-in-education)、[官方 HTML 內文](https://www.gov.uk/government/publications/generative-artificial-intelligence-in-education/generative-artificial-intelligence-ai-in-education) | 初次公布 2023-03-29；2023-10-26、2025-01-22、2025-06-10、2025-08-12 更新 | **England**；DfE position/guidance，並非自動延伸至 UK 其他司法管轄區 | 官方更新歷史與正文已查；尚非歷次文本逐字比對 | 各更新對核心義務的影響；不得把集合頁更新當全新法規 |
| O-KR-MOE | [韓國法令中心《初・中等教育法》第29及29-2條](https://www.law.go.kr/LSW/lsInfoP.do?ancYnChk=0&chrClsCd=010202&efYd=20250814&lsiSeq=273351&urlMode=lsInfoP)、[2026-09-11 生效版本第29-2條](https://www.law.go.kr/LSW/lsLinkCommonInfo.do?chrClsCd=010202&lsJoLnkSeq=1032275677)、[教育部 AI/數位教育資料說明](https://www.moe.go.kr/boardCnts/viewRenew.do?boardID=294&boardSeq=105007&lev=0&m=020) | 2024-11-29 舊導入公告為另一歷史事件；第29-2條 2025-08-14 增訂；查得法令頁標示目前版本施行日 2026-09-11（**不可推論該條自此日才生效**） | 韓國法規；將 AI／數位學習支援軟體置於教育資料選用規範，並和教科用圖書區別 | 官方法條已查；2024 公告與法規版本鏈仍部分 | 2025-08-14 各條正式施行規定、過渡安排、2026 政策實施狀況須另核對原始公告；不可說「全面禁止」 |
| O-SG-MOE | [MOE 官方入口](https://www.moe.gov.sg/) | 未核實特定政策文件發布日 | 新加坡中央教育主管機關；**目前未取得足夠特定政策原文** | partial/unavailable；**沒有零命中結論** | 具名官方文件、初版與修訂、K–12 範圍、發布／生效日 |

## 第二輪反證與一致性檢查

1. **發表 vs 更新**：日本 2024-12-26 是 Ver.2.0 公表；英格蘭 2025-08-12 是既有 2023 出版品更新；韓國 2026-09-11 是檢視法條頁所示**法版本施行日**，不是 29-2 條初次發布日。
2. **文件效力**：英格蘭 DfE position/guidance 不等同國會制定的新法；日本學校指引不等同法定強制義務；韓國法條與 2024 政策宣傳應分記。
3. **不同地理管轄區**：England ≠ UK；韓國中央法條不可推論個別學校實施狀態；新加坡沒有足夠可指認文件時不填猜測日期。
4. **跨期去重**：以上都不是證明 2026-10-09 當天首次公開的新事件；不放入首期 claims，亦不更新九筆候選 hold 或 publication/issues.json。
5. **來源限制**：部分頁面為政策／法規索引，尚未下載並比對所有歷史 PDF、修訂前後完整正文；不得升格成 full_text_checked。
6. **機器覆蓋紀錄**：本次屬單次定向官方來源查核，不表示已逐源完成 39 種期刊、21 個會議，亦不表示檢索零命中；正式 search_runs.csv 待依可重現的來源 ID、時間、查詢範圍分批登錄。

## 後續批次（依 v1.7 P0→P1→P2）

- P0-A2：找新加坡 MOE 具名原文與發布日期；補日本原版日期與完整版本鏈；補韓國公布／實施與轉換細節；英格蘭歷版差異。
- P0-B：逐批依 J01–J39、C01–C18/C20–C22 的來源 ID 真正檢索，按 entry_only/query_scoped/items_screened/full_text_checked/partial-unavailable 如實記錄；不把首頁瀏覽等同逐篇。
- P1：才補歷年關係／分類與實際 Excel/Sheets／Pages 驗收、真實新訊端到端；P2 最後處理來源池檢閱與自動化排程。

**出版安全**：只記官方 URL 和自撰短摘意義，不複製未授權全文；無真人獨立認證主張；不變更 v1.6 風險閘門。
