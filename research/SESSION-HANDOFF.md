# K–12 AI 素養國際動態｜固定 Session 工作交接檔

> **固定檔案：`research/SESSION-HANDOFF.md`**  
> 基準時間：2026-10-09（臺灣）；本次查核的是 GitHub `main`，本次接手查得 commit `1dadc18814bdd966b3db571c0c92995462c0ebc8`（PR #32 合併後）。  
> **性質：工作交接和可追溯進度紀錄，不是刊物、不是對所有來源的認證。** 下次工作開始必須先檢查最新 `main`、PR、Actions 與工作表，**不能把此檔的歷史快照當作最新狀態**。

## 0. 新 Session 先讀這一段

**要繼續的任務**：以最少人力、可追溯的原始證據，製作並公開 K–12 AI 素養國際週報／月報；第一期標準週報涵蓋 **2026/10/09–10/15**，預定 **10/16** 出刊。網站：[GitHub Pages](https://jhchenmooc.github.io/k12-ai-literacy-report/)；儲存庫：[jhchenmooc/k12-ai-literacy-report](https://github.com/jhchenmooc/k12-ai-literacy-report)。

**目前不可當作完成的事項**：第一期正式週報尚未製作及登錄；`publication/issues.json` 仍為 `{"schema_version":1,"editions":[]}`；七個候選都在 `hold`，不能宣稱已經獲獨立來源認證。新版 CI 能檢查結構，**不能自動證明來源真實**。

**下一步**：不要再擴充系統；先針對 10/9–10/15 新發布的真正 K–12 政策／研究做查證，完成少量合格主張的正式來源證據、中文對讀與編輯核准，再按既有 PR → CI → Pages 流程出刊。高風險不能為趕期限而假降級。

## 1. 既有重要決策：後續工作不可隨意推翻

1. **不新增功能**：近期 A–G 精簡改善已做，只整理既有 SOP；不新增模型、測試集、語意評分器、爬蟲、資料庫或新工具；除非管理者明確另行同意。
2. **低人力與邊際效益**：先篩日期／學段／去重／價值，再核查原文；有價值但難判斷者保留在[重要待查清單](important-unresolved-watchlist.md)。不為湊 3–5 則而發布不充分證據，少於 3 則甚至 0 則可接受。
3. **兩輪 AI 查核**：第一輪獨立擷取原文事實，第二輪反向找例外、反證、版本差異、分母和測量變項；同一模型的多角色同意不是獨立真人審閱。
4. **主張而非整篇決策**：未核實、高影響、矛盾主張保留 `hold` 或刪句；已充分證實的低、中風險內容可單獨處理。
5. **嚴守高風險規則**：目前 `validate-claims.js` 對 `risk_tier=high` **一律阻擋自動發布**；即使 N-V3/V3 或真人複核也不是 CI 放行例外。不能改風險標籤來繞過。
6. **舊刊編輯結案但未認證**：2026/09 月報與 9/29–10/8 創刊特刊已作重點追溯檢查、公開勘誤；仍保留 legacy／非獨立認證警示，不應重建全篇認證以延誤新刊。
7. **Google Forms 暫停**：目前只使用 GitHub Issues 讀者回饋，勿重啟 Google Forms 或增加匿名表單；[回饋 SOP](reader-feedback-policy.md) 與 [啟用清單](no-login-feedback-launch-checklist.md) 的歷史狀態說明已對齊。
8. **Public Repo 保持現況**：未核實草稿、來源短摘錄只在符合公開／版權／隱私條件下提交；不得放入個資、秘密、未授權全文或機密政策資料。Pages 從 Repo 根目錄 `.` 打包。

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

**最近實際確認**：GitHub Actions [Run #37900505465](https://github.com/jhchenmooc/k12-ai-literacy-report/actions/runs/37900505465)（主分支 commit `1dadc188`）整體成功；請依 GitHub job 紀錄核對 verify／deploy。這證明該次建置與部署成功，並不證明之後不存在新的改動。

## 4. 第一期間編輯進度：不是正式出刊

- 報導區間：**2026-10-09（週五）至 2026-10-15（週四）**；預定出刊 **2026-10-16**。
- 候選 **7 項 A01–A07**，`decision:"hold"` 與 `source_checked:false` 均維持；`ready_to_publish=0`，`verified_for_publication=0`。
- A01 賓州州立青少年 AI 查證活動：活動日 10/9；首發公告日不明，非政策成效研究。
- A02+A03 香港教育局小／中學教師課程：官方課表日 10/9；應合併觀察，首發日期不明。
- A04 UNESCO 技職活動：前期公告且偏 TVET，不列當期 K–12 新政策。
- A05 西班牙幼教與國小教師研究：10/7 前期發表，僅跨期延伸閱讀，不能當學生因果研究。
- A06 多倫多大學批判 AI 素養座談：活動備選，首發日期未明。
- **A07 UNESCO 墨西哥校園裝置規範與素養建議**：UNESCO 10/9 發文。墨西哥 SEP 規範 **9/22** 早已公告、**11/3** 是宣布的起始適用日；本週新事件是 UNESCO **評論／建議**，不是墨西哥新頒法。已做初篩及原始政策事件鏈核對；本次另在[短名單](drafts/2026-10-09_2026-10-15-shortlist.md)記錄 UNESCO 原文及 SEP 官方索引的反證（SEP 直接讀取受限）；**仍缺正式證據快照、完整第二輪核證與編輯簽核**，保持 `hold`。
- **切勿**為使進度看起來較快而把 A07 的 `source_checked` 強制改為 true：目前首期固定 [scaffold-weekly.test.js](scaffold-weekly.test.js) 預期所有候選仍未認證。正式核證應在出版階段另建立 `publication/claims/` 與來源快照。

**A07 日期反證後續裁決（2026-10-09）**：新發現同一論壇發言於 10/7 舉行、同內容已於 10/8 見諸媒體，UNESCO 官網英文文章則標示 10/9；因此 A07 **不能視為本期 10/9 首次公開的新事件**。詳見[首期短名單新增反證段落](drafts/2026-10-09_2026-10-15-shortlist.md)。繼續保留 `hold`，不製作其正式發稿主張證據，先轉向當期真正新發布的 K–12 政策／研究，並保留背景欄可能性。

**10/09 接續進度（原始來源核對）**：已在[本期短名單](drafts/2026-10-09_2026-10-15-shortlist.md)記錄 UNESCO 官方全文、SEP 9/25 新聞稿與總統府 9/21 公告的反證，以及同日來源初篩排除案例。此屬實質查核進度，不是正式短快照、獨立真人認證或期刊出刊；7 候選仍 hold，出版清單不變。

## 5. 明確未完成與後續次序

1. **來源發現**：對 10/9–10/15 當期逐日尋找新的原始政策、K–12 學術研究（含正式線上發表日期），不要拿活動預告湊數。
2. **先完成 A07 或更高價值的新候選查核**：核對來源原文與完整上下文、不同日期和法規效力、例外、反證；在證據真實足夠時做第二輪 AI 核查、必要譯文對讀及最短合法快照。
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
