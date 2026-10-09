# K–12 AI 素養國際動態｜固定 Session 工作交接檔

> **固定檔案：`research/SESSION-HANDOFF.md`**  
> 基準時間：2026-10-09（臺灣）；階段 A 以 main `823614bd4d71` 為檢查起點；PR 合併後以最新 main/Actions 為準。現行唯一流程入口：[v1.6 主控 SOP](editorial-workflow-master.md)、[首發查核表](first-disclosure-checklist-v16.md)及[九筆候選審核](drafts/2026-10-09-candidate-audit-v16.md)。  
> **性質：工作交接和可追溯進度紀錄，不是刊物、不是對所有來源的認證。** 下次工作開始必須先檢查最新 `main`、PR、Actions 與工作表，**不能把此檔的歷史快照當作最新狀態**。

## 0. 新 Session 先讀這一段

**要繼續的任務**：以最少人力、可追溯的原始證據，製作並公開 K–12 AI 素養國際週報／月報；第一期標準週報涵蓋 **2026/10/09–10/15**，預定 **10/16** 出刊。網站：[GitHub Pages](https://jhchenmooc.github.io/k12-ai-literacy-report/)；儲存庫：[jhchenmooc/k12-ai-literacy-report](https://github.com/jhchenmooc/k12-ai-literacy-report)。

**目前不可當作完成的事項**：第一期正式週報尚未製作及登錄；`publication/issues.json` 仍為 `{"schema_version":1,"editions":[]}`；九個候選都在 `hold`，不能宣稱已經獲獨立來源認證。新版 CI 能檢查結構，**不能自動證明來源真實**。

**論文搜尋與核對工具**：怎麼調用、踩過的坑、何時平行化，見 [research-tools-guide.md](research-tools-guide.md)（Claude 與 ChatGPT 通用）；現況摘要見本檔末段「論文搜尋與核對工具現況（2026-10-09 起）」。僅人工輔助、不構成認證。

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

### 2026-10-09 P0 接續批次核查進度（#76–#78）

- PR #76 日本／韓國／英格蘭／新加坡政策初核，verify 成功 Actions 37934019555，已合併 ca738c55431e407ac3ce9b54e7df2cc69386bc08。證據見 research/p0-policy-version-audit-2026-10-09.md。
- PR #77 政策版本補核，verify 成功 Actions 37934338466，已合併 a196a5763bdf6f78a1bcdffd8825fdcb62e4a1cd。新加坡 MOE 頁面受 robot/JavaScript 限制，仍 partial/unavailable。證據見 research/p0-policy-version-audit-b-2026-10-09.md。
- PR #78 J01–J03、C01–C02 入口層查核，verify 成功 Actions 37934548017，已合併 de4f880e62779dbc9298dda4b7779bbeee274da7。證據見 research/p0-academic-entry-a-2026-10-09.md。J01/J02 官方直接存取 403，不代表零命中；C01/02 尚未逐篇 DOI 篩選。
- J03 重要監測來源變動：官方 Springer 頁明列 2026-01-01 起由 Elsevier 出版，本修正 PR 更新 research/venue-watchlist.md 的 Elsevier 新入口與 Springer 歷史入口。這只是來源入口維護，尚非逐篇搜尋完成。
- 仍未完成 39 期刊／21 會議全面覆蓋與 search_runs.csv 逐源條件搜尋；九筆候選 hold、正式出版新期別 0。不能把入口檢查當 full_text_checked 或本週新刊內容。
- 下一批：優先逐源實際 query_scoped 查核、記錄可重現搜尋式/日期/DOI/學段/例外；依次 P0→P1→P2。任何合併前確認最新 PR HEAD verify，合併後確認 main verify/deploy；維持 v1.6 出版安全閘門。

### 2026-10-09 P0 學術主題搜尋接續（PR #80–#81）

- [PR #80](https://github.com/jhchenmooc/k12-ai-literacy-report/pull/80)：J06 Journal of Computer Assisted Learning 四篇 Wiley 出版商文章 DOI、首次上線日、K–12 學段與方法初篩；既有 A08 同 DOI 去重，未提升候選狀態。`verify` 成功 [Run #37935071997](https://github.com/jhchenmooc/k12-ai-literacy-report/actions/runs/37935071997)，合併 commit `bba05dd4b52a5725d291863ea346c567dc1b3d95`。
- [PR #81](https://github.com/jhchenmooc/k12-ai-literacy-report/pull/81)：J05 Education and Information Technologies 四篇 Springer 出版商文章的範圍限定初篩；不將 SEM、質性或數位能力研究冒稱 AI 素養教學因果。`verify` 成功 [Run #37935252331](https://github.com/jhchenmooc/k12-ai-literacy-report/actions/runs/37935252331)，合併 commit `c9d29339c240a66718344a82a88702ea0cf61abb`。
- 這些都是**定向搜尋的少量文章初篩**，不是完整來源索引覆蓋、全文查核或真實 10/09–10/15 首發新聞。`search_runs.csv` 仍未同步新增驗證器格式的批次列，必須以真正實行的查詢及覆蓋範圍補記，不填假零結果。
- 下一順序：P0 對 J04、J07、C03 等依來源 ID 執行可重現搜尋並核對正式 DOI、Online First、學段；核對索引分層及歷年資料去重，最後才進 P1 與 P2。九筆候選 hold 與正式新期別零則維持；v1.6 出版安全規則不變。

### 2026-10-09 P0 J04/J07/C03 來源初篩續報
- [PR #83](https://github.com/jhchenmooc/k12-ai-literacy-report/pull/83) 已在 [verify run #37935730529](https://github.com/jhchenmooc/k12-ai-literacy-report/actions/runs/37935730529) 通過後合併（commit b738d479772ab6415b6a06b0ca9d3653f59f0128）。新增 research/p0-j04-j07-c03-audit-2026-10-09.md，記錄三來源七篇正式 DOI 頁之有限初篩。
- 已區分 BJET 2025 first published 與 2026 卷期；LAK 正式發表日與會議日、short paper、既有 KB-2026-0012 同 DOI；J07 高教研究排除 K–12 直接證據。
- coverage 僅限列出項目 items_screened，絕非 39＋21 全面查核；search_runs.csv 尚無可據實填寫的完整命中總數。不得虛構零結果，也不得將搜尋日當首次出版日期。
- 下次先核對 main verify/deploy 與本交接檔，再依 P0 補記可稽核、允許未知命中之覆蓋批次及後續監測來源；完成 P0 才推進 P1、P2。九筆 hold／正式新期別零／v1.6 出版規則不變。

### 2026-10-09 P0 實際搜尋覆蓋對帳（待本 PR 驗收）

- 本次僅回填先前已留原始 DOI／查詢式記錄的 J04、J05、J06、J07、C03 **五個定向查詢批次**至 `research/knowledge-base/data/search_runs.csv`，合計**15 個逐篇初篩樣本**（含重複已知 DOI、非 K–12 排除），不是 15 篇新增知識庫主紀錄，也不是全部檢索命中。對應原文參照見 `research/p0-j04-j07-c03-audit-2026-10-09.md`、`research/p0-j05-query-audit-2026-10-09.md`、`research/p0-j06-query-audit-2026-10-09.md`。
- 每批 `results_seen` 留空表示**未知搜尋引擎總命中數**、`results_screened` 為列出樣本數、`results_recorded=0` 表示本次沒有新增主紀錄；`status=partial`。如果校驗器不接受留空，**不可改填 0**，必須先修正資料編碼策略並以 CI 驗收。
- 尚未補齊 J01–J03/C01–C02 入口型、其他 52 個未完成來源的正式檢索；未核查的來源不得視為搜尋零命中。已刊內容、九筆 `hold`、正式期別仍完全不動。下一步 P0 繼續來源 ID 覆蓋及補證，P1/P2 不提前。

### P0 搜尋覆蓋補登（2026-10-09，#85–#86）
- PR #85 將既有 J04、J05、J06、J07、C03 五個定向搜尋批次與 15 個列出樣本登錄 `search_runs.csv`，未知總命中數留空、未新增主紀錄；verify run 37936163588 成功，已合併 eede537e3c9cfbd73d9299bc77a040a8729c8f82。
- PR #86 查核 J08／J09 六個正式出版社 DOI 樣本，將 2025 first-online/2026 issue、K–12 教師／校長與大學生樣本分離；verify run 37936333111 成功，合併 a614e85c7ceeafd6e7d7fe215bc75110914a40c9。
- 本 PR 補登兩筆 J08/J09 scoped 批次至 `search_runs.csv`，未知總命中仍空白，樣本計數 2＋4。累積七個查詢批次共 21 個樣本（含排除與重複），不等於 21 篇新增論文或已覆蓋全部 60 個來源。v1.6 正式出版／九筆 hold 不變。
- 下一步 P0 按監測優先級繼續 J10–J14、C04 等來源；核查來源官方全文／索引、DOI、首發日期、學段及排除。完成 P0 之前不提前 P1/P2；每批 verify 通過才合併，合併後 main Actions 須另核對。

### P0 J12/J13/C04 scoped evidence and coverage (2026-10-09; current PR pending CI)
- Scoped primary-source audit in `research/p0-j12-j13-c04-audit-2026-10-09.md`: five listed item samples (J12 2, J13 2, C04 1), journals' online vs issue dates, higher education exclusion, and ICLS proceedings year without invented first-online day. J10/J11/J14 remain unverified; no zero-hit conclusion.
- Append three partial `search_runs.csv` batches with unknown `results_seen` left blank; cumulative ten logged search runs and 26 item-level samples, not 26 unique papers or whole-venue coverage. No new knowledge-base master records or publication approval.
- Next P0: verify J10/J11/J14 official journal article records, then other journal/conference series; reconcile coverage honestly. Maintain v1.6 publication gate, nine hold candidates, zero new editions, no automation.


### 2026-10-09｜後續 P0 加速執行決策：Codex 三組平行搜尋試行（尚未啟動）

**目的**：加速 39 本期刊／21 個會議的逐源搜尋，保留真實原始來源、日期與 DOI 核查品質，不降低 v1.6 出版安全標準。此段是**工作交接／試行計畫**，不是已建立 Agent、已完成搜尋或已核准自動出版的宣稱。

1. **優先平台**：先在具備 GitHub repo 存取的 Codex 環境啟動三個可隔離的搜尋任務（獨立分支或 worktree）；ChatGPT Work 可用於受阻網頁的瀏覽器核證、人工 UI／Google Sheets 驗收。若未提供真正多 Agent 平行執行能力，改用獨立平行工作任務，不得假稱已啟動子 Agent；暫不開發 Agents API 的自動編排系統。
2. **試行分工（先核對目前 main，避免重複）**：
   - 搜尋組 A：J10、J11（Computers in Human Behavior／Reports），必要時延伸同刊最新卷期。
   - 搜尋組 B：J14（ACM TOCE）及待補核 J12／J13 中仍未釐清的原始來源；已有逐篇資料不能無目的重查。
   - 搜尋組 C：C05–C08 正式會議論文集（先以 `venue-watchlist.md` 確認名稱、年份、主會／短篇／補充集分類）。
   - C04 已有一筆 ISLS 初篩，但首次公開日不詳，另列整合者待查；已核對的 J12/J13/C04 不能被誤報為零篇或全來源完成。
3. **搜尋產物**：各組各自交付可回溯的查詢字串、搜尋執行日期、檢索時段／範圍、期刊／會議 ID、官方出版社或正式論文集 URL、DOI（無則明註）、first online／issue／event 日期分離、K–12 學段與方法、排除／不確定原因、實際 `coverage_level` 與無法讀取的原始頁面。區分 `entry_only`／`query_scoped`／`items_screened`／`full_text_checked`／`partial/unavailable`；未完整查閱不得升級。
4. **隔離規範**：並行組只修改各自的暫存工作檔，不得同時寫入 `research/knowledge-base/data/search_runs.csv`、`records.csv`、`relations.csv`、年度索引、正式候選／claims／issues 或共用 handoff，避免競爭覆寫與重複 DOI。
5. **中央整合**：完成來源正式性、DOI／版本去重、首發日反證、K–12 適用性、研究設計與因果用語核查，區分真實搜尋總命中數和**僅列出之初篩樣本數**。未知總命中數留空／unknown，查詢失敗不能填 0；對高風險結論安排第二輪獨立原文交叉查證。整合者獨占正式 CSV／索引／本 handoff 寫入。
6. **品質與 GitHub 閘門**：先執行 schema、CSV 安全、去重、日期／跨來源一致性及 v1.6 regression；整批合併成**單一整合 PR**，只有最新 PR HEAD 的 `verify` 成功才可合併。合併後再核查 main verify/deploy，必要時檢查公開 GitHub Pages；不能把 PR CI 當實站通過。
7. **試行評估**：比較平行與串行的來源處理時間、每來源可核查文章數、重複／漏查／無法讀取比例、日期及學段錯誤、人工補查負擔、PR／CI 失敗與實際成本。通過品質標準後才考慮由 3 組擴展至 6 組搜尋加獨立驗證者；不為了速度犧牲可追溯性。
8. **階段順序**：**目前仍是 P0**；補完政策版本、逐源查核與覆蓋對帳後才啟動 P1 歷年知識庫深化、試算表及網站真實驗收；最後 P2 定期來源池檢閱／排程。九筆首週候選維持 `hold`、正式新期別保持零；不可用歷年文獻冒充 10/09–10/15 當週首次公開新聞，不啟用自動發刊。

**下一個 Session**：先讀本段及上方 P0 歷史；重新檢查 main、open PR、已完成來源與 `search_runs.csv`，再依上述三組開始試行；先查原始來源、自檢、整合 PR，CI 通過才合併。

### 2026-10-09｜P0 三組平行試行已執行：整合與下一批

**已完成**：從 main `e8adfb508890d77712268a0fc68a4323b8a01991`（#89）接手，當時無 open PR；[基準 Run 37937913130](https://github.com/jhchenmooc/k12-ai-literacy-report/actions/runs/37937913130) verify/deploy 都成功。三個真實子任務互不重疊：A J10/J11、B J12/J13/J14、C C05–C08；各自只寫[獨立暫存](p0-parallel-pilot-2026-10-09/)，不是三個 worktree。正式三表與候選／manifest在平行搜尋期間雜湊未變，整合者才獨占更新。

- [可重用流程](p0-parallel-search-workflow.md)與[整合裁決／評估](p0-parallel-pilot-2026-10-09/integration.md)：九來源18個逐篇樣本、18個DOI，組間與既有主表重複0；J12/J13四筆舊audit補核不算新發現。七筆只作歷史書目新增，records 24→31、relations 58→72、search runs 10→19，唯一來源覆蓋17/60。44是累積列出樣本出現次數，包含重訪／排除，不能寫44篇獨特文章或全來源完成。所有新批次partial、總命中留空unknown；三筆新主紀錄首發仍unknown、以issue_year索引。
- [第二輪獨立原始來源核查](p0-parallel-pilot-2026-10-09/second-round.md)：核查者未讀第一輪結論，重新檢索八筆，另兩筆原文unknown。拒絕網絡／MASEM因果、low-tech因果優效、五教師全國／現行政策、作品數當學生分母等外推；同模型AI不等於真人複審。正式全文完整核读0，未升content_checked。
- 日期反證：ACM3816694 Online AM 2026-05-25早於7/15 Published／12月issue；ICER3744217正式版8/2，但同研究arXiv v1於2025-02-27更早公開。主表C08日期僅指正式ACM manifestation，**不能當同作品首次公開或本週新聞**。JLA9127文章2/25、issue3/30分開；J13兩篇2025 online不改成2026；J10 108779原版footer10/9與institutional export10/27日期衝突未解。

**尚待完成**：C06/C07出版社原文、教師學段／方法、日期；C05首發／PDF v2歷程；J10日期衝突；未窮盡預印本與2026會議分冊。18樣本都未完整讀正式全文；官方indexed片段僅partial。P0整體未完成，不推進P1/P2。九候選仍hold、source_checked=false、正式新期別零，無自動搜尋／發刊。

**三→六組決策**：暫不擴充。B/C有99秒／183秒有界搜尋觀察且重疊81秒，但A開始未留存，完整牆鐘／串行基準與費用unknown；不能報實證加速倍數。來源直接讀取受阻及整合／第二輪補查仍是瓶頸。下一批維持三組並完整記dispatch至交付及整合工時；先补C06/C07/J10/C05/C08，再沿優先級J15–J19/C09–C12，未查來源不得報零命中。

**本整合[PR #90](https://github.com/jhchenmooc/k12-ai-literacy-report/pull/90)的GitHub閘門**：本地195/195既有tests、CSV安全與知識庫／年度索引／出版驗證皆通過；僅修正主表固定總數、固定conference集合及Windows測試路徑假設，未改出版程式。PR最新HEAD verify、合併及main verify/deploy須由實際GitHub結果另行核對，不預寫成功。合併後以本PR的merge SHA與Actions為準，下一session先核對該鏈；CI通過不等於來源真實或正式出刊。基準Run不是本次整合的最終部署證據。

### 2026-10-09｜P0第一波補核：三組local平行與下一波

**已確認上批驗收**：PR #90最新HEAD `e61e236634a25b05e5e148b92841f6bcfd9060ff` 的[verify Run37940604564](https://github.com/jhchenmooc/k12-ai-literacy-report/actions/runs/37940604564)成功；合併main `ade85459b2f2809787866bfca258190c0a007aa9`，本次開工再次確認[Run37940711049](https://github.com/jhchenmooc/k12-ai-literacy-report/actions/runs/37940711049) verify/deploy成功，無open PR。這補正上段提交時尚未寫入的GitHub結果。

**第一波實際工作與證據**：使用者已同意六個工作組分兩波、同時三組，而非六個同時執行者；電腦持續開機，維持local。乾淨checkout中A J10/J11、B C06/C07、C C05/C08各寫[獨立暫存](p0-followup-wave1-2026-10-09/)，中央核對正式表與出版檔雜湊後獨占整合。六來源九個舊樣本，組間DOI重複0，四筆既有主表重訪、五筆旧audit/staging；沒有新發現DOI。新增一筆C07歷史書目、補一筆J11出版社版本日期；records31→32、relations72→74、search runs19→25，唯一來源ID仍17/60，總命中unknown、全批partial。具體裁決、原文可讀範圍及獨立核查見[整合報告](p0-followup-wave1-2026-10-09/integration.md)。

- J11 `101041`作者上傳出版稿footer確認2026-04-02 Available online；既有書目補該出版社manifestation日期，並非已窮盡同作品更早公開。兩波連結2573與T1/T2大池分開；不採網絡教學因果。C07 `3729069`作者原文與獨立核查支持現職小學／中學教師單組自評，沒有直接學生成效；新主表首發unknown、issue_year2025。全部保留bibliographic_checked，不升content_checked。
- J10 `108779`機構10/27明標Early online，與作者稿footer10/9仍衝突，非單純無關匯出。C05 `817482`作者preprint N98與情境分組合计68、10頁與正式9頁，不能自行修補數字或冒認正式v2也有同一問題。C05另一poster與C06原始方法／日期仍受阻。
- **日期用語補正**：C08 arXiv2/27是submission時戳，不是已核證精確公開可讀日；上批把它直接寫公開日過度確定。current metadata的related DOI支持較早同作品預印本，仍不得以ACM8/2正式版日期冒稱全球首次公開；正式／作者版本不得自動合併。

**尚待完成**：上述衝突、C05 first-public/v2歷程、C06正式原文與日期、C07正式publisher／作者版本歷程、C08正式版與preprint逐段差異，完整正式全文仍未核讀。B初始repo閱讀／各查詢精確時間未留存，以null與觀測窗記錄；321秒dispatch參考至最後交付可證平行批次牆鐘，但沒有實測串行／費用，不報加速倍數。

**第一波GitHub實際驗收**：[PR #91](https://github.com/jhchenmooc/k12-ai-literacy-report/pull/91)最新HEAD `1a5591bdb83f2092ad3b4c8f1830f45a7837af16`的[Run37943747596](https://github.com/jhchenmooc/k12-ai-literacy-report/actions/runs/37943747596) verify成功，核對head_sha/event後以expected_head_sha合併。main `6afbbfea5faf6891f4af21a9fe0bfcb91d1a6807`的[Run37943852243](https://github.com/jhchenmooc/k12-ai-literacy-report/actions/runs/37943852243) verify/deploy均成功。本段於下一波補正，不以早期CI代替最新HEAD驗收。

**下一波與額度**：完成第一波後帳號5小時使用74%、每週23%，因此第二波按授權維持三組，但每來源最多一筆代表樣本、少量條件查詢，保留核查／整合額度；不是九來源全文普查。A J15–J17、B J18–J19/C09、C C10–C12，每組來源責任隔離。政策版本補核、其餘39期刊／21會議覆蓋及P0對帳仍待完成；不提前P1/P2。九筆候選hold/source_checked=false、正式新期別零、不自動搜尋／發刊及v1.6規則保持不變。

### 2026-10-09｜P0第二波完成搜尋／獨立核查與整合

三組local按上述來源責任實際平行，產物見[p0-followup-wave2](p0-followup-wave2-2026-10-09/integration.md)。九來源八樣本／八DOI；組間及既有主表重複0，J15為旧audit重訪，不能報八篇全新發現。四筆歷史書目J16/J19/C10/C11入庫，records32→36、relations74→82、runs25→34、唯一來源ID26/60；C09僅query_scoped，其餘items_screened，全批partial／命中unknown，不代表全面覆蓋。四筆獨立核查未讀第一輪結論；所有書目保持bibliographic_checked，無完整正式全文認證。

J18 online2024年不能因2026卷期改首發；J19 online2025-10-30而issue2026-03；C10 online2025-09-02而citation2026。J16中央以官方indexed DOI頁及latest-articles確認8/4，但獨立核查該次直接存取受阻、日期unknown，不能宣稱兩輪日期都直接確認。C11單校小六無已核對照組，145招募不等已確認配對分析分母；J17學段分布/研究品質仍待原文；C12示例不是學生實驗。高風險成效未採納，未知日期/版本/方法不猜補。

尚待：C09正式論文集可核樣本；J17全文學段/設計；第一波J10日期、C05分母與v2/首發、C06原文、C07/C08正式版本；政策版本與其餘J20–J39/C13–C22依優先級。P0未完，不進P1/P2，不再擴六個同時執行者。第二波後usage5小時96%、每週27%，不啟第三批或額度重置。九候選hold/source_checked=false、零正式期別與v1.6不變，無自動發刊。

本批整合[PR #92](https://github.com/jhchenmooc/k12-ai-literacy-report/pull/92)最新HEAD verify成功才合併，main verify/deploy另核；提交時不預寫成功，最終結果以該PR描述/Actions為準。

### 2026-10-09｜Claude 接手入口（優先閱讀本段）

**最新已驗收資料基準**：main `36c4d879bb37ac62d81d96b74c45edbae396ff10`，第二波[PR #92](https://github.com/jhchenmooc/k12-ai-literacy-report/pull/92)已合併。最新PR HEAD `ecc910d037405b462e0242eef4125400a5fedeeb` 的[verify Run37945471117](https://github.com/jhchenmooc/k12-ai-literacy-report/actions/runs/37945471117)成功，實際核對head_sha、pull_request event及verify job後以expected_head_sha合併；合併後[main Run37945558725](https://github.com/jhchenmooc/k12-ai-literacy-report/actions/runs/37945558725) verify/deploy均成功。這补正上段提交時尚待確認的結果；更晚main以GitHub重新讀取為準。此交接文件PR的結果以其PR／Actions為準，不把資料基準當交接PR驗收。

**已完成、不要重做**：PR #90初次三組試行；#91第一波補核；#92第二波九來源少量樣本搜尋、四筆獨立核查與中央整合。正式表目前36 records、82 relations、34 search runs；26/60是已有搜尋紀錄的唯一來源ID（含不同深度），不是26來源普查完成。本地195/195既有tests通過；來源完整正式全文未被全面閱讀，沒有新的content_checked。三批完整queries、逐篇裁決、存取失敗與時間證據都在各自資料夾，不能把重訪樣本或累積出現次数當独特新論文。

**必讀文件**：本檔最新段落；`research/editorial-workflow-master.md`、`research/first-disclosure-checklist-v16.md`、`research/p0-parallel-search-workflow.md`、`research/venue-watchlist.md`、`research/knowledge-base/schema.md`；`research/p0-parallel-pilot-2026-10-09/`及兩份`research/p0-followup-wave{1,2}-2026-10-09/integration.md`、`second-round.{json,md}`。既有正式表／索引／九候選／publication manifest須一起對帳。

**建議下一個有界P0批次（先三組，不自動六組）**：
- A 日期／版本補核：J10 `10.1016/j.chb.2025.108779`（10/9原文footer vs 10/27機構Early online）；C05 `10.22318/cscl2025.817482`（作者稿98 vs 分組68、作者10頁 vs 正式9頁、v2歷程）及 `.107218`（首發／poster原文）；C08 `10.1145/3702652.3744217`（正式版與預印本差異／公開歷程）。只補缺口，避免重查已核基本書目。
- B 方法／學段補核：J17 `10.1016/j.edurev.2026.100813`（各學段、設計、偏差）；C06 `10.1145/3641555.3705158`（正式poster原文、日期、instrument）；C07 `10.1145/3724363.3729069`（publisher及作者版本歷程，教師學段／單組自評已核）；C11 `10.58459/icce.2025.6011`（配對分析分母、遺失資料／篇型）。來源責任不得與A/C重疊。
- C 覆蓋／政策：優先C09 SITE/AACE正式論文集可核樣本；再核新加坡MOE存取受限的原始政策日期／版本及既有政策audit未解項。其餘J20–J39及後續會議按現行watchlist優先級另開下一批，不在同批無限制擴範圍。需確認政策現行性時重新讀當時官方版本，不用歷史文獻當現行法規證據。

**可讀證據邊界與不可猜補**：
- J16 online8/4由中央官方indexed頁確認，但獨立核查該次日期受阻unknown；不能寫雙輪日期都直接確認。
- C05作者preprint分母矛盾不能自行修正，也不能說正式v2一定有同一錯誤。
- C08 arXiv2/27是submission timestamp，精確公開可讀日未核；出版社manifestation日不是同作品全球最早首發。其他arXiv timestamp同樣分開。
- C07教師感受不是學生效果；C11單組前後變化不是因果效果；J17平均效果／非顯著moderator不是普遍K–12優效。Publisher索引／作者選定段落不能冒認正式全文完整核讀。
- 搜尋總命中未知留空/null/unknown；query失敗或0入庫不能填0命中。記錄entry_only/query_scoped/items_screened/full_text_checked與partial/unavailable，不虛構查全。

**平行及交付契約**：先重新核main/open PR/CI與本機git status；鎖定讀取基準及正式三表／候選／manifest雜湊。三組只寫各自新暫存檔，不得同時改正式CSV、索引、候選、claims、issues、本handoff或網站。中央整合者才核DOI／同版本／日期／來源一致性並入庫；不同版本不自動合併。高風險命題由未讀第一輪結論的獨立任務重新核原始來源，原文受阻保留未解，不以角色投票或同模型雙輪冒稱真人審稿。每組在開始讀檔前記真實UTC，分開查詢、查核、寫檔、交付及整合時間；缺時戳仍unknown，不報沒有實測的串行加速／成本。

**驗證與合併**：沿用現有CLI／CI，先schema／CSV安全／round-trip／DOI／索引一致性及v1.6 regression；195是此基準既有測試數，不硬編碼未来數量。單批一個整合PR；核最新HEAD SHA對應verify成功後expected_head_sha合併，改HEAD就重新等；合併後分別確認main verify/deploy。不改出版閘門讓資料過關、不開新服務／爬蟲／排程。若Claude環境不能開平行agent、查來源或存取GitHub，要明示真實限制，採有界替代，不能模擬已完成。

**工作目錄提醒**：本機`D:/codex/ai/k12-ai-literacy-report`、`...-next`、`...-wave2`仍有此前自己產生、已透過GitHub提交的工作差異，checkout HEAD可能落後；先查git status，不hard reset／清除／覆寫他人或未知修改。可另建乾淨clone從最新main續接。`D:/codex/ai/*integrate.cjs`等是本次本機單次輔助，不是repository必要依賴；GitHub版證據與既有工具足夠接手。Windows CRLF可能令生成索引字串比對失敗，先核LF／生成結果，勿直接改測試期待值。

**安全及範圍**：九筆候選繼續hold/source_checked=false、正式新期別零；歷史學術書目不當當週首次發布新聞，v1.6不放寬、不自動發刊。P0未完，不提前P1/P2。之前Codex usage5小時96%／每週27%是查詢當時帳號快照，並非Claude額度；按接手環境實際額度安排有界批次，不自行使用額度重置。每批更新同一份本檔的完成／未完／下一批及實際PR/Run證據，不另建平行handoff。

### 2026-10-09｜P0 第三波補核（Composio 讀取；已合併並部署）

- 基準 main `819c493`（#93）。三組 A（J10/C05/C08）、B（J17/C06/C07/C11）、C（C09/MOE/政策版本）平行，另有未讀結論的獨立核查；細節見 [integration.md](p0-followup-wave3-2026-10-09/integration.md)。環境限制：Bash／WebFetch 連不到出版社，改用 Composio（Exa、雲端瀏覽器）；多為快取文字。
- 新增 2 筆書目（KB-2026-0019 J17 meta-analysis；KB-2025-0013 C06 Day of AI Australia）；records 38、relations 87、search runs 42。J10 日期衝突已解釋（Available online 10/9、VoR 10/27），但為成人樣本，不入庫。C05 98/68 矛盾在正式 v2 仍在。
- 提醒：雲端瀏覽器代理曾自行點擊驗證頁（A 組），獨立核查不互動並取得一致結果；之後不要指示或容許繞過驗證頁。
- 未變：九筆候選 hold／source_checked=false、`issues.json` 零期別、無自動搜尋或發刊。PR 與 main 的 verify／deploy 結果以實際 GitHub 為準，此處不預寫成功。
- 下一批：未解項見 integration.md；再依優先級 J20–J39、C13–C22；P0 未完，不進 P1/P2。

**第三波與設計系統的 GitHub 驗收（2026-10-09）**：
- [PR #94](https://github.com/jhchenmooc/k12-ai-literacy-report/pull/94) 設計系統 v0.1（`assets/design-system.css`、`design-system/`、`composio/README.md` 規劃文件）：PR HEAD `8abc532` verify 成功，squash 合併為 main `2647819`；[main Run 37954446852](https://github.com/jhchenmooc/k12-ai-literacy-report/actions/runs/37954446852) 成功。
- [PR #95](https://github.com/jhchenmooc/k12-ai-literacy-report/pull/95) P0 第三波：首次合併被必要檢查 `verify` 規則擋下（main 因 #94 前進），將 main 併入分支後新 HEAD `c2b3355` verify 成功，squash 合併為 main `fbb9582`；[main Run 37954601280](https://github.com/jhchenmooc/k12-ai-literacy-report/actions/runs/37954601280) 的 verify 與 deploy job 均成功。
- Pages 實站抽查（Composio 抓取文字，非瀏覽器實測）：首頁、`/design-system/`、`/assets/design-system.css` 可讀；`/research/SESSION-HANDOFF.md` 回 404（研究目錄未公開）。**未做**：手機版／無障礙的瀏覽器實測、首頁頁尾設計系統連結的視覺確認（抓取文字未含頁尾）。
- 部署後若新增公開目錄，須同步 `verify-and-deploy.yml` 的打包清單（本次已加入 `assets`、`design-system`）。
- 提醒：Composio 規劃（`composio/README.md`）僅文件，未建任何蒐集程式、排程或憑證；啟用前須先決定結果存放處與 toolkit，並維持候選一律 hold、不自動發刊。

### 論文搜尋與核對工具現況（2026-10-09 起）

> **僅為人工搜尋輔助，不構成新功能、排程、爬蟲或獨立認證。** 工具結果一律回到既有 P0／v1.6 SOP 與 G1–G6／N1–N8 閘門；同一模型的搜尋＋核對不是真人或跨模型獨立審閱。試跑細節、完整查詢、UTC 與逐篇裁決見 [tool-trial-2026-10-09/report.md](tool-trial-2026-10-09/report.md)、[screening.csv](tool-trial-2026-10-09/screening.csv)。

| 工具 | 可用性（2026-10-09 實測） | 適用流程步驟 | 已知限制 |
|---|---|---|---|
| Research Desk 本機 `verify_reference`／`verify_bibtex`／`lookup_reference`（需 ToolSearch 載入） | 可用 | **G1 書目核對**：DOI↔題名↔作者↔年份、抓 DOI 錯配 | 只查 OpenAlex／arXiv；副標題會偽陰性（KB-2026-0010 OECD 實例，Crossref 證實無誤）；年份差一年不標記；不核首發日、版本、學段、內容；主表無作者欄，舊紀錄最多得 `partial` |
| paper-search（OpenAlex；key 由 proxy 帶上，勿讀取／印出） | 可用 | **P0 補漏**：按期刊 source ID＋日期定向查詢；DOI 去重 | 外掛腳本無 filter，需直呼 API；萬用字元要用 `.exact` 欄位，否則 HTTP 400；J01 Elsevier 範圍內 193／329 篇無摘要；`publication_date` 不是首發日；不等於出版社全量 |
| Crossref API | 可用 | G1 補副標題、卷期日、DOI 歸屬 | 本批 Elsevier／Springer DOI 無 `published-online` |
| arXiv API／abs 頁 | 可用 | **首發日期佐證**（Submission history） | submission 時戳 ≠ announce／公開可讀時間 |
| alphaXiv | 可用 | 預印本**發現**（可按日期過濾；抽 3 篇日期與 arXiv v1 同日） | `get_paper_content` 是 AI 摘要、無版本／日期，不得當證據 |
| Research Desk 雲端版 | 連得上但回 OpenAlex **HTTP 429** | 暫不用 | 以本機版替代 |
| SciSpace、LR-AI、Citation Needed | 本次未試 | — | LR-AI 依賴 Semantic Scholar（曾 429） |
| **連不上／不可用**：Exa、Liner、Wiley Scholar Gateway（本 session 顯示需 OAuth 授權）；ScienceDirect（403）、Springer（303 cookie 轉址）出版社頁 | — | — | 不得以模擬或編造結果頂替；需授權者到 claude.ai connector 設定 |

**本批已完成**（[PR #97](https://github.com/jhchenmooc/k12-ai-literacy-report/pull/97) HEAD `ce20604` verify 成功，squash 合併為 main `f35c5e2`；[main Run 37960845032](https://github.com/jhchenmooc/k12-ai-literacy-report/actions/runs/37960845032) verify 與 deploy 均成功）：
- A1 書目核對：九筆 `discovered_unverified`（任務單寫 8 筆，實為 9 筆）中 3 篇論文 `partial`、6 筆網頁不適用；`bibliographic_checked` 有 DOI 的 22 筆：21 `partial`、1 偽陰性 `not_found`（OECD）；負控制 `mismatch` 正確。**未發現真正錯誤書目，九筆欄位未改。**
- A2 J01／J02／J03 首次定向查詢：q1、q2b、q3 三組成功，q2 HTTP 400 不記零命中；81 篇不重複作品，主表重複 1（A09）、既有 audit 重訪 0。
- 入庫 16 筆（**其後 N16 KB-2025-0021 依「學段須摘要明示」撤回為待判，實際 15 筆；見下一段**；KB-2025-0014～0021、KB-2026-0020～0026、KB-2027-0001），全部 `discovered_unverified`、首發日 unknown、`year_basis=issue_year`（KB-2027-0001 為 2027 卷期年，非公開年）；records 38→54、relations 87→128、search runs 42→49。索引經既有 `--write-index`／`--write` 重建。
- 測試：`validate-knowledge-base.test.js` 兩處 J02／J03 期刊清單由精確相等改為「既有紀錄仍在」（同 #95、5edf5bc 先例），其餘斷言不變；本機 `node --test research/*.test.js` 195／195 通過，CI 的 benchmark、blind-pack、source-facts、知識庫、YEARS 與 publication 檢查本機均通過。
- A3 alphaXiv 試用；arXiv API 顯示 C08 預印本 2503.00079 查詢當下最新為 v3（wave3 記「v4 歷程未解」可據此補註，主表不改）。

**尚未完成／下一步**：
1. 15 筆新紀錄需讀出版社或作者頁（Available online、學段細節）後才可評估升 `bibliographic_checked`；G2–G4 方法核查未做，效果量／單組前後測不得寫成成效主張。
2. 是否接受「Crossref＋OpenAlex 一致」為 G1 書目核對，需管理者決定；決定前不升級。
3. J01–J03 仍是 `items_screened`／`partial`；其餘 J20–J39、C01／C02、C13–C22 依 watchlist 優先級續做，可用同一 OpenAlex source-ID 查法。
4. 九筆候選 hold／`source_checked=false`、`issues.json` 零期別、無自動搜尋或發刊——均未變。

### 2026-10-09｜P0 工具平行搜尋（三組）與 35 筆入庫

> 細節：[p0-tool-wave-2026-10-09/integration.md](p0-tool-wave-2026-10-09/integration.md)；調用與平行化方法：[research-tools-guide.md](research-tools-guide.md)。三組皆同一 Claude session 的子代理，**不算獨立審閱**。

**管理者決定（2026-10-09）**：新紀錄一律 `discovered_unverified`（Crossref＋OpenAlex 一致不升 `bibliographic_checked`）；**學段必須由摘要明示，只憑題名者列待判**（N16 因此撤回，KB-2025-0021 不重用）；EAAI「Resources for Teaching AI in K-12」列 C22 固定監測分軌（已寫入 `venue-watchlist.md`）；A 組週報候選不入知識庫。

**本批已完成**（[PR #98](https://github.com/jhchenmooc/k12-ai-literacy-report/pull/98) HEAD `073e01a` 的 [verify Run 37961139429](https://github.com/jhchenmooc/k12-ai-literacy-report/actions/runs/37961139429) 成功，核對 HEAD 後 squash 合併為 main `cab5577`；[main Run 37961226735](https://github.com/jhchenmooc/k12-ai-literacy-report/actions/runs/37961226735) verify 與 deploy 均成功。Pages 實站未另做瀏覽器驗收）：
- 三組平行（UTC 16:10:39 派工，牆鐘約 18 分）：A 本週新發表 3 候選／19 排除；B J31、J35–J38 7 候選／3 待判／46 排除；C AIED、EDM、WiPSCE、EAAI 28 候選／43 待判／25 排除。跨組與對主表 DOI 重複 0；開工雜湊於完成後核對一致；整合者另以 Crossref 抽查 4 筆相符。
- 入庫 35 筆（期刊 7、會議 28；KB-2025-0022～0032、KB-2026-0027～0050），首發日 unknown、`year_basis=issue_year`；records 54→88、relations 128→205、search runs 49→58（每來源一筆 `P0-20261009-TOOLWAVE-*`）。至此 J01–J03、J31、J35–J38、C01、C02、C21、C22 有搜尋紀錄（皆 `partial`）。
- 新增 `research/research-tools-guide.md`：各工具的 HTTP 呼叫方式、限制（萬用字元 400、>5 布林運算子 429、`from_created_date` 需付費、登記日≠上線日、Crossref 題名含換行／JATS、出版社頁 403 等）、四個核心會議的索引定位、平行化時機與實測耗時、Git 注意事項。

**尚未完成／下一步**：
1. **週報（10/09–10/15）**：A 組 3 筆待查證（T&F 那篇 online 10/08 很可能出窗）；預印本需週內重查；正式出刊仍須 v1.6 首發查核、中文對讀與編輯放行。
2. 46 筆待判：優先讀 EAAI K-12 分軌 13 筆摘要；AIED 28 筆需可讀官方摘要；B 組 3 筆無摘要。
3. 50 筆（15＋35）新紀錄的出版社頁、Available online 日與 G2–G4 方法核查未做；高風險成效數字不得寫成主張。
4. 其餘未搜尋來源：J20–J30、J32–J34、J39、C13–C18、C20；可照指南的期刊／會議流程再分三組。
5. 候選全部 hold／`source_checked=false`（其後新增 A10，現為 10 筆，見下一段）、`issues.json` 零期別、無自動搜尋或發刊——均未變。

### 2026-10-09｜週報學術候選查證與雙 session 分工（新 Session 以此段為準）

**已完成**：
- PR #99 已合併為 main `0c27fd1`，[main Run 37961779468](https://github.com/jhchenmooc/k12-ai-literacy-report/actions/runs/37961779468) verify 與 deploy 均成功。
- A 組三筆本週學術線索查證：T&F `1475939x.2026.2739390` 出版社存入日期 2026-10-08，**出窗排除**；JOLTIDA `joltida.1893531` 為大學附設職業學院，**高教排除**；BMC Psychology `s40359-026-05721-w`（10/09 上線、中職＋高職教師混合、相關研究、接受稿）以既有 `ingest-candidates.js` 加入為 **W2026-10-09-A10，hold**，知識庫對應 KB-2026-0051。見 [查證紀錄](drafts/2026-10-09-weekly-research-a-verification.md)。
- **候選池現為 10 筆，全部 hold／`source_checked=false`**。原寫死「9 筆」的 5 個測試檔改為不固定數量但保留同樣保護（全部 hold 且未核、每筆有對應知識庫紀錄、每日摘要不改數量）。

**雙 session 分工（管理者 2026-10-09 決定）**：
| | 編輯 session（本 session） | 文獻搜尋 session（新開） |
|---|---|---|
| 負責 | 週報候選發現與首發查核、出刊或 0 則決定、`SESSION-HANDOFF.md` | P0 未搜來源逐源搜尋、待判書目、知識庫入庫 |
| 可寫 | `research/drafts/`、`publication/`、週報網站檔、`SESSION-HANDOFF.md` | `research/knowledge-base/data/*`、`indexes/`、`venue-watchlist.md`、新的 `research/p0-*` 稽核資料夾、`research-tools-guide.md`（補坑） |
| 不可寫 | 知識庫三表與索引（候選對應紀錄除外，需先在交接檔註明） | `research/drafts/`、`publication/`、`SESSION-HANDOFF.md`、出版閘門 |
- 兩邊各用自己的分支與 PR，合併前都要管理者確認。搜尋 session 的 PR 說明要附「交接檔摘要」，由編輯 session 統一寫入本檔。
- 搜尋 session 在本段所在 PR 合併後才從最新 main 開工；第一批 B1：J20–J26、J27–J30＋J32–J34＋J39、C13–C18＋C20 三組平行。

**驗收與後續（同日）**：
- [PR #100](https://github.com/jhchenmooc/k12-ai-literacy-report/pull/100) HEAD `56559ad` verify 成功，squash 合併為 main `0aa9287`；[main Run 37962656959](https://github.com/jhchenmooc/k12-ai-literacy-report/actions/runs/37962656959) verify 與 deploy 均成功。
- **文獻搜尋 session 已開**：`session_01EdyajNQzH5bBmza4TgNoff`（標題「K12 AI 素養：文獻搜尋 session（P0 B1）」），依上表分工執行 B1；其 PR 的「交接檔摘要」由編輯 session 寫入本檔。
- **政策來源搜尋（10/09）**：子代理查 42 個官方來源／頁面（成功 26、失敗或讀不到 16），**候選 0**、背景 10（皆 10/09 前公開）、排除 4；美國 ED、OECD、歐盟執委會、澳洲、新加坡 MOE、加拿大各省、香港 EDB 通告列表讀不到，只能說「搜尋未見」。紀錄：[drafts/2026-10-09-weekly-policy-search.md](drafts/2026-10-09-weekly-policy-search.md)；各來源取用方式已寫入 [工具指南 3.7](research-tools-guide.md)。
- **本週現況**：學術候選只有 A10（hold），政策 0；10/16 很可能 0 則或極少則，依規則可接受，不為湊數出刊。

**尚未完成（編輯 session）**：10/10–10/15 每日重查（10/10 00:00 UTC 後的預印本、Crossref 新登記 DOI、官方政策列表）；候選首發查核與逐句原文；10/15 前決定出刊或 0 則並照實記錄。

### 2026-10-09｜編輯 session：Pages 實測、A10 原文核對、政策背景核日期

- PR #101 已合併為 main `0024d15`，[main Run 37963020348](https://github.com/jhchenmooc/k12-ai-literacy-report/actions/runs/37963020348) verify 與 deploy 均成功。
- **Pages 瀏覽器實測**（[紀錄](pages-browser-acceptance-2026-10-09.md)）：8 個公開網址 × 桌面／手機皆 200、無水平溢出；9 個公開檔與 main 雜湊一致；`research/` 未公開。45 個連結：40 可開、4 個 Cloudflare 驗證頁無法自動判斷、1 個有問題（月報的臺灣教育部 `pads.moe.edu.tw/download2.php`：伺服器未送中繼憑證、網址無參數）。**未修改網站**，待真人確認。
- **A10 原文核對（G1／G2）**：讀出版社接受稿 PDF，確認回收 812／有效 768、中職 378（49.2%）、橫斷面自陳、剖面結果未分學段；`source_checked` 仍 `false`，G3 數字未逐表核對。見 [查證紀錄](drafts/2026-10-09-weekly-research-a-verification.md)。
- **政策背景回原頁核日期**：MEXT 公眾意見徵集 2026-10-06（至 11/05，AI 內容未核，e-Gov 403）、中國《人工智能+教育行动计划》4/2 落款 4/10 發布、香港數字教育藍圖 6/17（將制定中小學 AI 素養學習框架，需追蹤）；皆非本期首發，已寫入 [待查清單](important-unresolved-watchlist.md)。
- **0 則記錄方式**：出版閘門要求正式期別 claims 非空，「只有狀態摘要」不能登記為期別；若本週 0 則，建議不出刊、只在 `research/drafts/` 留決定紀錄（草稿未提交，10/15 前交管理者決定）。

### 2026-10-09｜網站新版面 v1、每日短訊啟用與分類清單（管理者決定）

**管理者決定**：啟用每日短訊（臺灣時間每日 09:00；只發書目型或來源歸屬型、閘門全過；**daily PR 由編輯 session 在 verify 成功後自行 squash 合併並事後回報**，其他類型 PR 仍需管理者同意）；歷年資料庫公開到網站；新版面依[示意頁](https://claude.ai/artifact/LyanStNqiSEESyBJ9i3zUZ)實作（4 畫面：首頁、每日短訊、歷年資料庫、查核方法）。

**網站結構**：首頁（`index.html`，手寫＋兩個產生區塊）、`daily/`、`weekly/`、`monthly/` 列表頁、`archive/`（`policy/` 國別 × 年份、`research/` 期刊／會議 × 年份）、`about/` 查核方法。共用樣式 `assets/site.css`（沿用設計系統 tokens）。創刊特刊與 9 月月報**原檔未改**，只列入列表頁。

**產生程式 `research/render-site.js`**：
- `node research/render-site.js --write` 由 `publication/issues.json` 與知識庫重新產生列表頁、歷年資料庫、查核方法、已登記的每日短訊單頁，以及首頁「今日短訊」「資料庫筆數」兩個區塊；不帶參數為檢查模式，CI verify 會檢查並跑 `research/render-site.test.js`。
- 每日短訊頁由 claims 產生：導覽與說明放在 `<main>` 外，`<main>` 內只有綁定 claim 的段落，來源標題即原文連結；測試確認產出的頁面能原樣通過 `validate-publication.js`。
- 歷年資料庫**不列週報審查中的候選**（有 `source_candidate_id` 者）；每筆標示核對程度，首發日未核者標「卷期年（首發日未知）」。
- deploy 打包清單加入 `archive`、`about`。

**分工更新**：知識庫或 `issues.json` 一有變動，衍生頁面就會過期而讓 CI 失敗。因此**兩個 session 改完資料後都要執行 `node research/render-site.js --write` 並一起提交**；但網站檔案的手動修改（首頁文字、`site.css`、`render-site.js` 本身）仍只由編輯 session 做。

**每日短訊例行作業**：已設定每日 08:22（臺灣）觸發本 session 的 Routine，流程：重查 → 合格才建 claims／快照／登記 → `render-site.js --write` 產生頁面 → 測試 → PR → verify 成功後合併 → 確認 Pages → 中文回報。沒有合格項目不發刊、只留紀錄。注意：同一來源在候選池中若仍為 hold，閘門會擋下 daily（`daily claim contradicts held/unverified cumulative candidate`）。

### 2026-10-09｜P0 第 B1 批（文獻搜尋 session）與網站 v1 驗收

**P0 第 B1 批**（[PR #103](https://github.com/jhchenmooc/k12-ai-literacy-report/pull/103)，摘要照該 PR「交接檔摘要」）：
- 完成：J20–J30、J32–J34、J39、C13–C18 三組平行搜尋（UTC 16:58–17:20，牆鐘約 21 分），入庫 46 筆（期刊 16、會議 30，含 AERA 議程 15），KB-2025-0033～0042、KB-2026-0052～0087，全部 `discovered_unverified`、首發日 unknown、`issue_year`。
- 數字：records 89→135、relations 207→307、search runs 58→79；待判 139（只在 group JSON）；C20 SITE Interactive unavailable（LearnTechLib 擋自動請求）、ICALT 2026／CSCW 2026 Companion 未登記。
- 證據：`research/p0-b1-2026-10-09/integration.md`、`group-b1-{1,2,3}.{json,md}`、`baseline-sha256.txt`。
- 未解：46 筆出版社頁與 G2–G4 方法核查未做（17 筆含成效敘述標高風險）；待判優先 IDC 27、AERA 31、J29 9、J20 `tate.2025.105032`；CSCW 期次歸屬為推定；AERA 多個議程 DOI 未全面去重；`verify_bibtex` 在該 session 環境不可用；J20／J23／J24／J28／J34／J39 缺摘要比例高。
- 驗收：PR HEAD `c4ef42c` verify 成功，squash 合併為 main `5ef41e0`；[main Run 37966463817](https://github.com/jhchenmooc/k12-ai-literacy-report/actions/runs/37966463817) verify 與 deploy 均成功。

**網站新版面 v1**（[PR #104](https://github.com/jhchenmooc/k12-ai-literacy-report/pull/104)）：#103 合併後先把 main 併入並以 `render-site.js --write` 重新產生（研究書目 71→117），HEAD `997f088` verify 成功，squash 合併為 main `fb53ab1`；[main Run 37966600130](https://github.com/jhchenmooc/k12-ai-literacy-report/actions/runs/37966600130) verify 與 deploy 均成功。線上 8 個新頁面與 `assets/site.css` 皆 200，抽查 5 檔與 main 雜湊一致。

**下一步**：
- 文獻搜尋 session：已通知「改知識庫須執行 `render-site.js --write`」新規則；B-POL（各國官方 K–12 AI 政策歷年紀錄，估 30–60 筆、1 批）與 B-IDX（既有紀錄國別／分類／來源關聯補強，約 135 筆；清單格式已定案上線）依序進行，入庫前與開 PR 前先向管理者回報。
- 編輯 session：10/10 08:22（臺灣）起每日短訊例行作業；10/15 01:00 UTC 整理第一期出刊決定。
