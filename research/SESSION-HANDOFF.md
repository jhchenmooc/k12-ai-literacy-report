# K–12 AI 素養國際動態｜固定 Session 工作交接檔

> **固定檔案：`research/SESSION-HANDOFF.md`**  
> 基準時間：2026-10-09（臺灣）；階段 A 以 main `823614bd4d71` 為檢查起點；PR 合併後以最新 main/Actions 為準。現行唯一流程入口：[v1.6 主控 SOP](editorial-workflow-master.md)、[首發查核表](first-disclosure-checklist-v16.md)及[九筆候選審核](drafts/2026-10-09-candidate-audit-v16.md)。  
> **性質：工作交接和可追溯進度紀錄，不是刊物、不是對所有來源的認證。** 下次工作開始必須先檢查最新 `main`、PR、Actions 與工作表，**不能把此檔的歷史快照當作最新狀態**。

## 0. 新 Session 先讀這一段

**要繼續的任務**：以最少人力、可追溯的原始證據，製作並公開 K–12 AI 素養國際週報／月報；第一期標準週報涵蓋 **2026/10/09–10/15**，預定 **10/16** 出刊。網站：[GitHub Pages](https://jhchenmooc.github.io/k12-ai-literacy-report/)；儲存庫：[jhchenmooc/k12-ai-literacy-report](https://github.com/jhchenmooc/k12-ai-literacy-report)。

**目前不可當作完成的事項**：第一期正式週報尚未製作及登錄；`publication/issues.json` 仍為 `{"schema_version":1,"editions":[]}`；九個候選都在 `hold`，不能宣稱已經獲獨立來源認證。新版 CI 能檢查結構，**不能自動證明來源真實**。

**下一步**：不要再擴充系統；先針對 10/9–10/15 新發布的真正 K–12 政策／研究做查證，完成少量合格主張的正式來源證據、中文對讀與編輯核准，再按既有 PR → CI → Pages 流程出刊。高風險不能為趕期限而假降級。

## 1. 既有重要決策：後續工作不可隨意推翻

1. **不新增功能**：近期 A–G 精簡改善已做，只整理既有 SOP；不新增模型、測試集、語意評分器、爬蟲、資料庫或新工具；除非管理者明確另行同意。
2. **低人力與邊際效益**：先篩日期／學段／去重／價值，再核查原文；有價值但難判斷者保留在[重要待查清單](important-unresolved-watchlist.md)。不為湊 3–5 則而發布不充分證據，少於 3 則甚至 0 則可接受。
3. **兩輪 AI 查核**：第一輪獨立擷取原文事實，第二輪反向找例外、反證、版本差異、分母和測量變項；同一模型的多角色同意不是獨立真人審閱。
4. **主張而非整篇決策**：未核實、高影響、矛盾主張保留 `hold` 或刪句；已充分證實的低、中風險內容可單獨處理。
5. **嚴守高風險規則**：目前 `validate-claims.js` 對 `risk_tier=high` **一律阻擋自動發布**；即使 N-V3/V3 或真人複核也不是 CI 放行例外。不能改風險標籤來繞過。
6. **舊刊編輯結案但未認證**：2026/09 月報與 9/29–10/8 創刊特刊已作重點追溯檢查、公開勘誤；仍保留 legacy／非獨立認證警示，不應重建全篇認證以延誤新刊。
7. **Google Forms 暫停**：目前只使用 GitHub Issues 讀者回饋，勿重啟 Google Forms 或增加匿名表單；[回饋 SOP](reader-feedback-policy.md) 與 [啟用清單](no-login-feedback-launch-checklist.md) 的歷史狀態說明已對齊。
8. **Public Repo 保持現況**：未核實草稿、來源短摘錄只在符合公開／版權／隱私條件下提交；不得放入個資、秘密、未授權全文或機密政策資料。Pages 現從 `_public_site` 只打包公開網站目錄，Public GitHub 原始儲存庫仍公開。

## 2. 主控文件與檔案所在（以實際 main 為準）

| 類別 | 固定位置／用途 |
|---|---|
| **完整主控 SOP** | [`research/editorial-workflow-master.md`](editorial-workflow-master.md)：搜尋到勘誤 15 節、A–G 操作原則 |
| 政策查核 | [`research/news-policy-verification.md`](news-policy-verification.md)：N1–N8 |
| 學術查核 | [`research/evidence-safety-gates.md`](evidence-safety-gates.md)：G1–G6 |
| 低人力門檻 | [`research/low-human-review-policy.md`](low-human-review-policy.md) |
| 來源中文對讀 | [`research/source-to-claim-review.md`](source-to-claim-review.md) |
| 搜尋來源池 | [`research/venue-watchlist.md`](venue-watchlist.md)：34 期刊、19 會議 |
| 來源與主張欄位 | [`research/publication-check-spec.md`](publication-check-spec.md) |
| 本期編輯短名單 | [`research/drafts/2026-10-09_2026-10-15-shortlist.md`](drafts/2026-10-09_2026-10-15-shortlist.md) |
| 本期候選資料 | [`research/drafts/2026-10-09_2026-10-15.json`](drafts/2026-10-09_2026-10-15.json) |
| 待查事項 | [`research/important-unresolved-watchlist.md`](important-unresolved-watchlist.md) |
| 正式期別登錄 | [`publication/issues.json`](../publication/issues.json) |
| 主張與來源快照 | `publication/claims/*.json`、`publication/sources/*.{txt,md}`（新刊依實際主張建立） |
| 出刊程式閘門 | [`validate-claims.js`](validate-claims.js)、[`validate-source-trace.js`](validate-source-trace.js)、[`validate-publication.js`](validate-publication.js) |
| CI／部署 | [`.github/workflows/verify-and-deploy.yml`](../.github/workflows/verify-and-deploy.yml) |
| 舊刊回查 | [9 月流程驗證](september-2026-retro-workflow-review.md)、[兩舊刊回查](legacy-editions-review-2026-10-09.md) |
| 網站／回饋 | [首頁](https://jhchenmooc.github.io/k12-ai-literacy-report/)、[GitHub Issues](https://github.com/jhchenmooc/k12-ai-literacy-report/issues) |

## 3. 已完成且有 GitHub 證據

| 完成事項 | 證據 | 限制 |
|---|---|---|
| 9 月舊刊來源回查、PISA 二次補正、紐約市政策例外補充 | [PR #26](https://github.com/jhchenmooc/k12-ai-literacy-report/pull/26)、[PR #27](https://github.com/jhchenmooc/k12-ai-literacy-report/pull/27) | 有抽查與更正，但**不等於全部獨立認證** |
| 10/9–10/15 候選初篩與活動備稿 | [PR #28](https://github.com/jhchenmooc/k12-ai-literacy-report/pull/28) | 活動日期不能當首次公告日 |
| 不新增功能的 A–G 精簡流程修正，7 份既有 Markdown | [PR #29](https://github.com/jhchenmooc/k12-ai-literacy-report/pull/29)、[主分支成功 Run](https://github.com/jhchenmooc/k12-ai-literacy-report/actions/runs/37897141483) | 僅文件修正，不是新的自動驗證能力 |
| 新增 UNESCO 墨西哥 10/9 候選 A07、比對墨西哥先前規定 | [PR #30](https://github.com/jhchenmooc/k12-ai-literacy-report/pull/30)、[成功 Run](https://github.com/jhchenmooc/k12-ai-literacy-report/actions/runs/37898015881) | **仍 hold**；尚未完成正式快照、第二輪主張認證 |
| 完整主控 SOP 與 README 入口 | [PR #31](https://github.com/jhchenmooc/k12-ai-literacy-report/pull/31)、[成功 Run](https://github.com/jhchenmooc/k12-ai-literacy-report/actions/runs/37899084578) | 主要內容、連結與程式對齊已檢查；不等於真實新刊端到端驗收 |
| 歷史 Pages 部署已通過 | [部署驗收紀錄](pages-deployment-acceptance-2026-10-09.md) | 成功部署不代表每條來源與文字獲真實性認證 |

**歷史部署紀錄（非當前最新）**：GitHub Actions [Run #37900505465](https://github.com/jhchenmooc/k12-ai-literacy-report/actions/runs/37900505465)（主分支 commit `1dadc188`）整體成功；請依 GitHub job 紀錄核對 verify／deploy。這證明該次建置與部署成功，並不證明之後不存在新的改動。

## 4. 第一期間編輯進度：不是正式出刊

- 報導區間：**2026-10-09（週五）至 2026-10-15（週四）**；預定出刊 **2026-10-16**。
- 候選 **9 項 A01–A09**（A08–A09 為跨期學術背景），`decision:"hold"` 與 `source_checked:false` 均維持；`ready_to_publish=0`，`verified_for_publication=0`。
- A01 賓州州立青少年 AI 查證活動：活動日 10/9；首發公告日不明，非政策成效研究。
- A02+A03 香港教育局小／中學教師課程：官方課表日 10/9；應合併觀察，首發日期不明。
- A04 UNESCO 技職活動：前期公告且偏 TVET，不列當期 K–12 新政策。
- A05 西班牙幼教與國小教師研究：10/7 前期發表，僅跨期延伸閱讀，不能當學生因果研究。
- A06 多倫多大學批判 AI 素養座談：活動備選，首發日期未明。
- **A07 UNESCO 墨西哥校園裝置規範與素養建議**：UNESCO 10/9 發文。墨西哥 SEP 規範 **9/22** 早已公告、**11/3** 是宣布的起始適用日；UNESCO 官網 10/9 刊載的是**評論／建議**，不是墨西哥新頒法；但同一論壇意見 10/7–10/8 已公開報導，**不能當本週首次公開的新事件**，僅保留為背景。已做初篩及原始政策事件鏈核對；本次另在[短名單](drafts/2026-10-09_2026-10-15-shortlist.md)記錄 UNESCO 原文及 SEP 官方索引的反證（SEP 直接讀取受限）；**仍缺正式證據快照、完整第二輪核證與編輯簽核**，保持 `hold`。
- **切勿**為使進度看起來較快而把 A07 的 `source_checked` 強制改為 true：目前首期固定 [scaffold-weekly.test.js](scaffold-weekly.test.js) 預期所有候選仍未認證。正式核證應在出版階段另建立 `publication/claims/` 與來源快照。

**A07 日期反證後續裁決（2026-10-09）**：新發現同一論壇發言於 10/7 舉行、同內容已於 10/8 見諸媒體，UNESCO 官網英文文章則標示 10/9；因此 A07 **不能視為本期 10/9 首次公開的新事件**。詳見[首期短名單新增反證段落](drafts/2026-10-09_2026-10-15-shortlist.md)。繼續保留 `hold`，不製作其正式發稿主張證據，先轉向當期真正新發布的 K–12 政策／研究，並保留背景欄可能性。

**10/09 接續進度（原始來源核對）**：已在[本期短名單](drafts/2026-10-09_2026-10-15-shortlist.md)記錄 UNESCO 官方全文、SEP 9/25 新聞稿與總統府 9/21 公告的反證，以及同日來源初篩排除案例。此屬實質查核進度，不是正式短快照、獨立真人認證或期刊出刊；7 候選仍 hold，出版清單不變。

**主控 SOP 自檢更正（2026-10-09）**：依 PR #36–#37 的 A07 經驗，已對 `editorial-workflow-master.md` 補明「官網上架日期≠事件首次公開」「編輯適格性與證據驗證分離」「反證後同步候選 summary、note、短名單與交接檔」「跨語文早期報導去重」。僅修正既有 SOP 的具體執行說明，**不新增門檻／欄位／程式／CI／測試**；七候選保留 hold，正式出刊仍為零。

**跨文件回歸檢查（2026-10-09）**：發現 PR #36 已判定 A07 不符合本週首次公開事件資格，但候選 JSON 的 warning／screening_note 和短名單前段仍沿用舊的「10/9 首筆合格」說法。本次只同步這些編輯狀態／導覽文字，保留 UNESCO 官方文章自身 10/9 日期，並保留九項 `hold`、全部 source_checked=false、translation_reviewed=false、crosscheck 未開始、正式 issues 空清單。已核對來源日期 10/7–10/9、主控 SOP、N1–N8、G1–G6、現行發布程式及 CI；未發現需要修改核心程式、測試或 CI 的阻斷缺陷。真正的新刊全鏈驗收仍未發生。

**出版驗證器最小加固（2026-10-09）**：依多專業模擬審查之 A–D 優先工作，在 `validate-publication.js` 對缺失正式 HTML 回報可讀錯誤、對 HTML 註解／非支援標籤及動態／隱藏屬性採保守拒絕，新增少量合成回歸測試；主控 SOP 與原文對讀文件補明出刊前首發／跨語文去重核對、低風險書目來源確認與兩輪查核紀錄。仍需真正新刊的編輯核准與網站內容驗收。僅限目前 PR 的核驗成果，勿將合成測試當成真實來源認證。

**第一期真實端到端驗收首日（2026-10-09）**：已實際核對 GitHub main `e552833b86a1`、PR #40 部署成功、正式出刊清單仍空，以及 UNESCO、英國教育部與 Edutech 等首日來源的首次公開／K–12 AI 關聯；相關可追溯來源、排除理由與分層驗收記錄在[首期短名單末段](drafts/2026-10-09_2026-10-15-shortlist.md)。**結果為部分驗收、正式出刊流程尚未通過**；不能將首日初篩、合成 CI、已部署網站等同首次真實期別出刊成功。七候選繼續 hold；到期後才可完成整週範圍與正式出刊驗收。

**驗證器第二輪微調（2026-10-09）**：修補 claim 節點外的容器裸文字漏檢、出版主張日期／HTTPS URL 的基本語法與日曆驗證，並新增涵蓋 HTML 容器、日期和離線完整期別來源雜湊異動的合成回歸案例；主控 SOP 收斂為五項出刊前檢核。不使用新 schema 或服務；保留原有 hold、publication manifest 空清單。**離線期別測試不是新一期真實出刊驗收。**

**累積搜尋批次工具（2026-10-09）**：新增 `research/ingest-candidates.js`（離線批次、30 天補漏、依 DOI／URL／明確 event_key 去重），沿用既有每週 JSON，將搜尋覆蓋紀錄存於 `search_runs`；未啟用每日自動搜尋或自動發刊。新候選一律 hold，原有七件仍未認證；週五須集中編輯決策。測試不構成原文核查。

**每日快訊 v1.5 PR A／B**：候選新增發現日期／批次識別，跨週相同事件以參照與待查更新處理；離線 `prepare-daily-brief.js` 輸出昨日搜尋之待審包，共用每週候選 JSON。測試涵蓋同週週報可讀、歷史研究背景及 0 則不出版。`daily/`、正式編輯核准、每日自動搜尋排程皆未啟用；不得將 CI 成功當作真實編輯認證。

## 5. 明確未完成與後續次序

1. **來源發現**：對 10/9–10/15 當期逐日尋找新的原始政策、K–12 學術研究（含正式線上發表日期），不要拿活動預告湊數。
2. **優先處理真正符合本週首發的新候選**：A07 已有 10/7–10/8 先行公開反證，僅作背景 `hold`，不再投入正式出刊快照。對新候選核對原文上下文、同事件較早版本、法規效力、例外與反證；通過編輯適格性初篩後才做完整查核、譯文對讀及最短合法快照。
3. **編輯放行**：只保留低、中風險且原始證據可支持的逐項中文主張；未解／高風險 `hold`。除非真的完成真人專家查核，不能宣稱獨立複核。
4. **出刊準備**：正式 HTML `data-claim-id`、對應 claims JSON、必要 sources 快照與 SHA-256、`publication/issues.json` 一起提交；先審核**公開資料／個資／著作權**。
5. **PR → CI → 合併 → 部署驗收**：PR `verify` 通過後合併；主分支 `verify` 和 `deploy` 成功，再核對網站首頁、正式內文、手機、來源連結與讀者可見更正。
6. **出刊後回饋與月報**：既有 GitHub Issues，月底跨週綜整；不重啟 Google Forms。

## 6. 第二輪跨文件一致性結論與仍存限制

- **本輪核對**：既有 `scaffold-weekly.test.js` 仍要求本期草稿 `source_checked:false`；主控 SOP 明確區分候選初查與正式 claims 認證，不改測試、候選狀態或出刊清單。
- **Google Forms 文件**：已釐清原有啟用敘述只是 10/09 的歷史配置，現行 `feedback/no-login-config.js` 的 URL、provider 均為 `null`，`receiptVerified:false`。相關文件不再暗示目前可收件。
- **新聞 N1–N8／研究 G1–G6／發布規則／CI**：就現行文件可直接交叉核對的風險分級、原文限制、AI 查核邊界與正式發布資料鏈，未發現需修改程式或 CI 的新阻斷差異。此結論僅為文件／程式一致性審視，不認證任何真實內容。


- **README 舊部署文字**：本次已對齊最近成功 CI／部署的紀錄；舊排查文件僅供歷史參考，不代表現在仍故障。
- **首期短名單候選數**：本次已統一為七項，全部 `hold`；未更動 JSON 的正式核證旗標。
- **正文綁定指南**：本次已依 [實際程式](validate-publication.js) 對齊 h1/h2 及唯一靜態 main；未新增功能或測試。
- **發布規格 T9 舊期待**：本次已改為 high 一律 hold，與程式一致；未放寬風險門檻。
- **候選資料不等於完整原始核查**：目前首期測試把候選 `source_checked=false` 固定成安全假設。若將來真正要讓候選表保留更深入階段，應另行設計與明確核准；**現階段沿用正式 claims 的驗證管道，不改程式**。
- **出刊前品質風險**：除了 GitHub 綠燈，仍需實際編輯者核對原始資料與完整網頁。系統目前不能保證全自動原文真偽、真人獨立複審或全球新聞窮盡搜尋。

## 7. 新 Session 的五分鐘接手檢查

1. 打開本檔和[主控 SOP](editorial-workflow-master.md)，理解重要決策，避免重新設計。
2. 到 [Pull Requests](https://github.com/jhchenmooc/k12-ai-literacy-report/pulls) 和 [Actions](https://github.com/jhchenmooc/k12-ai-literacy-report/actions) 查最新 PR／commit／verify／deploy，**逐項更新本檔過期資訊**。
3. 讀本期[候選 JSON](drafts/2026-10-09_2026-10-15.json)、[短名單](drafts/2026-10-09_2026-10-15-shortlist.md)及 [issues](../publication/issues.json)，確認資料量與真實出版狀態。
4. 區分「已部署的文件修正」「已初步閱讀網頁」「來源主張真正獲核查」「正式登錄刊物」四種證據，不混用。
5. 直接接續**未完成的本期查核及正式出刊**；如有新發現先更新證據與本交接檔，再提交 PR。已完成的歷史工作不重做。

## 8. 更新規則（固定路徑，不另造平行交接檔）

- **每次重要 PR 合併或期別正式發布後，直接修改本檔**：更新基準時間／commit、完成項、未完項、候選數、`issues.json` 狀態、關鍵 Run 和下一步。
- 每次只改真正變動段落，保留關鍵歷史 PR 鏈接；不要累積冗長每日流水帳或私密資料。
- **「已完成」必須附 GitHub 檔案、PR、CI 或正式網站等實際證據**；只有討論中規劃的事項放「待辦」，不能升成完成。
- 文件本身也是 Public Repo 內容，不加入私人帳號、秘密、學生資料、個人或機密來源。

> **接手底線**：讀取最新主分支後，優先依照[主控 SOP](editorial-workflow-master.md)完成可查證的新刊，**不擴充功能、不偽造認證、不提前出刊、不重做已完成工作**。

**2026-10-09 daily 出版閘門現況：** PR C 安全前置版納入 `daily/` HTML 掃描並強制阻擋所有正式 daily；未完成授權設定與實測，沒有每日正式發布能力。請勿以 CI 成功冒充核准。詳見主控 SOP。

## 2026-10-09 v1.6 自檢修復狀態（現行說明）

舊文「daily 一律禁止」及「需要真人逐日 Review」為歷史 v1.5 決策，不再代表現行低風險、來源歸屬摘要通道。現行無逐日真人審稿，但需有可追溯原文、首次公開日期、實際兩輪交叉核對與內容限制。此修復分支補上每日首發日期必填、摘要原文片段、重複來源待查記錄、重要 URL 參數保留、跨日完成核查待審，以及回歸測試。**現有正式期別依舊 0、9 筆候選均 hold、未啟用自動搜尋和出刊**。實際 GitHub main 與部署驗收以 PR 合併之後最新 Actions 為準。請勿將測試旗標當作原文認證；本修復不保證所有語意錯誤皆會自動攔截。

### v1.6 第三輪多角度自檢：提交與接手提醒（2026-10-09）

本輪核查基準為 main `2f2b87a8682440340bc279034a4177c1e43edd81`。發現：正式 daily 的書目型內容原可跳過來源快照驗證、HTML 危險 href 未完整攔截、匯入候選無併發鎖、匯入時會把既有 ready/verified 數量清零、搜尋批次固定宣稱 30 天查回、以及跨週重複 batch ID 等風險。本修復分支追加 fail-closed 證據檢核、排他鎖、URL/日期反例、可信資料狀態保護和更誠實的回查資訊。最終修復狀態須以該 PR 最後 HEAD 的 verify 和合併後 main deploy 為準，不能以早期歷史 Actions 綠燈或此段文字宣稱已驗收。

持續不可宣稱的事項：正式新期別目前 0、九筆候選仍 hold、沒有每日自動網路搜尋或自動出刊；來源中文摘要語意一致、首次公開日及真實官方頁面，需要實際來源核證，光看 JSON/CI 無法證明。

## 2026-10-09 多角色模擬審查修復接手狀態

本輪以 main `72e1eef77a6a78d62190c7e704b6d23cb6d0c0e4` 為起點，修復舊刊 HTML 安全豁免、月報研究相對連結，以及每日正式 claims 必須顯示對應原始 source_url 的問題；亦補合成正負向測試。舊刊仍不宣稱新版內容認證。另已將 AI/政策/研究來源忠實轉述的最小人力檢查程序納入主控 SOP。**九筆候選仍 hold，正式新期別 0；真實來源正向出刊與網頁點擊驗收未完成，不能以此 PR 的綠燈冒充實站認證。**


## 2026-10-09｜v1.7 知識庫最新狀態與尚待完成（新 Session 以此段為準）

> 此段優先於上面歷史的「7 筆候選」「PR 仍進行中」或早期 v1.5 說明。資料狀態一律依最新 main、Actions 與主表重新確認。

### 已完成且有 GitHub 證據

- **來源監測池**：39 本期刊、21 個正式會議，NARST 僅觀察；官方來源登錄與每季輕量、每年完整及重大事件即時檢閱的規則已寫入 `research/venue-watchlist.md`、`research/source-registry-and-review-policy-v17.md`（PR #63）。
- **v1.7-R5 最小知識庫**：`research/knowledge-base/data/{records,relations,search_runs}.csv`、`schema.md`、`indexes/index.json`；校驗器、保守 DOI／URL 相似訊號、安全 CSV 衍生匯出、唯讀新來源匯入預覽及 T01–T12 類測試已併入 CI（PR #64–#69）。
- **歷年索引與真實書目種子**：`research/knowledge-base/indexes/YEARS.md` 由程式產生並經 CI 一致性檢驗。PR #70 澳洲框架／檢討、#71 三篇 Springer K–12 研究、#72 兩篇 LAK ACM 會議論文、#73 日本／韓國／英格蘭官方文件、#74 兩篇 Discover Education 研究已合併。官網書目日期與學段等限於各報告記載的實際核查範圍。
- **最新 main**：`7cc5fd274ec9e8237f9553e64946c3316e47f09f`；PR [#74](https://github.com/jhchenmooc/k12-ai-literacy-report/pull/74) 已於 2026-10-09 合併；合併後 [Actions #37932072973](https://github.com/jhchenmooc/k12-ai-literacy-report/actions/runs/37932072973) 成功。現有 **24 筆知識庫主紀錄**（其中原九筆仍 `discovered_unverified`）、正式新期別 **0**。PR 曾有失敗測試，後經修正並以最新成功 CI 為準；不得把歷史失敗視為主分支現況。

### 尚待完成｜下次依序執行

1. **P0：官方政策與版本**：繼續核實新加坡 MOE 確切原文及發布日期；日本指引初版、Ver.2.0 與後續版本關係；韓國 AI 數位教科書政策 2024 公告後的法定地位及修訂；英格蘭 DfE 2023 初版及後續更新。逐件記錄發布日、生效日、更新日、適用地區及文件效力，不猜測現行狀態。
2. **P0：39 期刊、21 會議逐源搜尋**：按 `venue-watchlist.md` 的來源 ID 和優先級逐批檢索正式出版社／論文集，記錄真實搜尋範圍、檢索式、學段、DOI、Online First／Published 日期、無法取得內容與去重。現有來源紀錄**不是 39＋21 的全面覆蓋**；避免將只開首頁誤標逐篇審核。
3. **P0：搜尋覆蓋對帳**：`search_runs.csv` 仍須依實際可重現搜尋批次填寫；目前主要是查核報告，不能冒稱零命中或完整查核。建立可稽核的分層覆蓋報告，區分 `entry_only`、`query_scoped`、`items_screened`、`full_text_checked` 及 `partial/unavailable`。
4. **P1：歷年知識庫深度與分類**：逐步補政策版本、國別角色、學段、教師／學生能力與評量構念、期刊／會議關係，建立更完整的「各年×各國政策、各年×各期刊／會議論文」閱讀索引；未知首發日維持 `unknown`。同 DOI、版本、事件用保守關聯，不自動合併或把卷期日期當首發。
5. **P1：真實軟體與使用者端驗收**：用 Excel／Google Sheets 實際開啟安全匯出，檢查公式字串與編碼；公開 GitHub Pages 的首頁、手機、來源連結、讀者更正入口需真正瀏覽器實測。CI／Actions 成功**不等於**外部頁面已逐項驗收。
6. **P1：v1.6 真實新訊正向端到端驗收**：只有查到 **10/09–10/15 同事件當期首次公開**、K–12 直接相關、正式證據鏈完整的新來源才能走 claims／HTML／PR／CI／部署與實站驗收。現有首週九筆候選均 `hold`；A07 UNESCO 墨西哥報導有 10/07–08 更早事件反證，已撤稿，**禁止以 10/09 文章日期重新出刊**。無合格來源就零則。
7. **P2：來源池檢閱**：每季檢查來源可達、獨特 K–12 產出與維護負擔；每年決定增加、核心／擴充／背景調級、降頻、暫停或移出主動監測；重大停刊、更名、主辦及政策主管機關變更立即檢閱。保留歷史資料與決定理由。**制度已文件化，尚未排程或自動執行**。
8. **P2：排程／自動化最後才啟用**：在真正正向出刊、逐源覆蓋與公開實站驗收完成前，不啟用每日自動發布；任何候選只進入待審、不可讓知識庫的 `bibliographic_checked` 取代 v1.6 編輯及首發驗證。

### 下一個 Session 開工順序與安全閘門

先查 main／open PR／CI，核對 `records.csv`、`relations.csv`、`indexes/index.json`、`indexes/YEARS.md`、首週候選 JSON 及 `publication/issues.json`；再依序 **政策版本 → 逐源學術查核及覆蓋紀錄 → 歷年分類品質 → 真實端到端驗收**。每批資料與程式透過 PR，`verify` 通過才合併，合併後再核對 `main verify/deploy`；不得更動九筆 `hold`，不得將歷史書目當成當期新聞。更新本 handoff 時修改同一檔案，避免平行交接檔。
