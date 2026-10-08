# K-12 AI 素養國際動態｜週報與月度趨勢

以 GitHub Pages 公開發布 K-12 AI 素養國際政策、研究及學校實務資訊。採每日蒐集、每週發布、月底跨週趨勢總結的編輯流程。

## 已發布
- 網站首頁：`index.html`
- 創刊特刊（2026/09/29–10/08，10 天過渡期）：`weekly/2026-09-29_10-08/index.html`
- 2026 年 9 月歷史月報：`monthly/2026-09/index.html`（保留歷史網址及內容）

## 後續出版
- 每週五：整理前一個週五至週四的週報；創刊特刊為 2026/09/29–10/08，第一期標準週報緊接涵蓋 2026/10/09–10/15，排定 10/16 製作。
- 月底：跨週趨勢綜整，不重複堆疊週報。首次預定 2026/10/29。
- 標準週報目錄：`weekly/YYYY-Www/index.html`，已出版的過渡期特刊使用日期範圍作路徑。

## 編輯原則
優先原始資料，按事件鏈去重，核實發布日期、事件發生日期、適用學段、政策效力、研究限制及重要數字。區分外部來源事實與臺灣 K-12 AI 素養政策分析；禁止將國際觀點宣稱為本地架構的直接實證驗證。

GitHub Pages：Settings → Pages → Source = GitHub Actions。正式更新經 PR、必要 `verify` 及 Pages 部署。


## 每週來源多元性與證據品質檢核（2026-10-08 起）

1. **先排內容價值，再評來源多元性**：不為湊數而收錄無關或未經核實內容；每期優先檢查臺灣教育部／地方教育機關、OECD、UNESCO、歐盟及歐洲理事會、美英日韓教育機關、期刊及學術機構。
2. **同一機構不可冒充多個獨立證據**：同一政策公告、FAQ 與後續說明納入同一事件鏈；同一發布機構的多篇報導也應揭露集中度。
3. **當期來源集中時直接揭露**：若選中的事件都來自同一機構，公開週報註明來源侷限；不得以四則同源訊息推論全球政策共識。
4. **區分證據類型**：具法律／行政效力的規範、政策指引、研究論文、機構評論、教師個案、活動預告不可互相替代；並註明發布日與實際事件日。
5. **來源原文對應**：每張新聞卡片至少一個直接支持核心敘述的原始連結；重要數字、原文引述與因果限制須逐項核實。
6. **臺灣政策啟示為獨立分析**：以學生及教師 AI 素養、提示／脈絡—駕馭—代理三層、應用／驗證雙途徑、PAK、AI 摩擦學習、學段適切及評量規準對照，但不宣稱國際資料直接驗證本地架構。
7. **編輯前最後檢查**：確認 3–5 則有價值動態（不足就少）、機構和地理分布、重複事件、失效 URL、手機排版、鍵盤導覽、字體與網站內部連結；只有完成查核的事件才發布。

2026/09/29–10/08 創刊特刊修訂後包含 Education International 與 UNESCO 兩個發布體系，並揭露來源侷限；往後依上述原則提升實質來源多樣性，不會為滿足機構配額犧牲證據品質。

## 學術期刊與會議固定監測池

- [監測清單、優先級、布林搜尋與審查 SOP](research/venue-watchlist.md)（34 種期刊、19 個會議系列、跨資料庫補漏）
- [機器可讀搜尋來源表 CSV](research/venue-watchlist.csv)
- 自 2026/10/08 起，文獻週次蒐集與月底整合應優先使用監測池；期刊／會議及研究全文的 K-12 適用性仍須逐篇確認。

- [2026/9/29–10/8 學術文獻回查候選池](research/retrospective-2026-09-29_10-08.md)（v1.2 兩輪多專業模擬審查修訂；已校正樣本、結果變項與證據外推限制，未完成原始資料重分析）。

- 第二輪學術品質控管已納入監測清單 v1.2：研究重要性 A/B/C 與查核進度 V1/V2/V3/U 分開；要求保存搜尋式、出版日期及結果變項，避免將短期修題或自陳感受誤寫成 K-12 長期學習成效。

## 研究證據防誤判機制

- [來源優先、逐項追溯及發布閘門 SOP](research/evidence-safety-gates.md)：建立 G1–G6 檢查、U/V1/V2/V3 驗證狀態、重大結論獨立核對與修訂流程。
- 2026/09/29–10/08 六篇學術文獻先列**候選**；尚未完成逐句原文證據鏈前，不可作為已審定的政策證據或自動導入公開週報。

## 新聞、政策與研究的雙軌防誤判

- [新聞／政策原始來源與解讀查核 SOP（N1–N8）](research/news-policy-verification.md)：查核公布、更新、實施日期及效力，逐項追溯、檢查例外和原文翻譯，避免誤將評論、新聞稿或試辦當成法律。
- [學術研究證據查核 SOP（G1–G6）](research/evidence-safety-gates.md)：核實樣本、方法、結果、因果與跨學段外推。
- 同一來源同時包含研究與政策主張時兩套均須通過適用關卡。未取得原文證據的解讀保留在候選池，不以多次 AI 角色模擬代替獨立確認。

## 經多專業檢視的雙軌查核及機器測試

- [新聞政策查核規範 v1.1](research/news-policy-verification.md)：以事件與個別主張為單位；確認政策效力、日期、適用範圍與獨立核查要求。
- [研究證據查核規範 v1.1](research/evidence-safety-gates.md)：學段、結果變項、因果限制與重要數字原文定位。
- [發布檢核欄位與合成情境](research/publication-check-spec.md)；[結構驗證程式](research/validate-claims.js)：測試可刊／暫緩邏輯，並非網頁原文與新聞真實性驗證。
- 執行方式：`node research/validate-claims.js claims.json`。實際公開前必須提供真實查核紀錄；未核實內容應暫緩，不能僅以程式回傳 allow=true 當出版許可。

## GitHub Actions 發布查核（試行）

- [驗證 workflow](.github/workflows/verify-and-deploy.yml)：於推送與 PR 進行 Node.js 合成測試，以及掃描週報、月報目錄和發布紀錄。
- [未來期別登記](publication/issues.json)：每個新出版的 weekly 或 monthly HTML 必須列入清單，並附 publication/claims/ 下對應的逐項查核 JSON；缺少或列出 hold 主張會使檢查失敗。
- [創刊特刊 13 筆歷史查核資料](publication/audits/2026-09-29_10-08.json)：均保留為 hold、未經獨立驗證，**不屬於已放行證據**；9 月歷史月報同樣保留為未經此 CI 認證的 legacy 內容。
- **目前 GitHub Pages 舊的分支部署仍能繞過此檢查。** 為避免部署衝突，新工作流程的 Pages 部署步驟預設停用，只有專案變數 ENABLE_VERIFIED_PAGES_DEPLOY 設為 true 才會開啟。
- 啟用真正的受檢部署：由有管理權限者進入 Settings → Pages，將 Source 改成 GitHub Actions，接著於 Settings → Secrets and variables → Actions → Variables 設 ENABLE_VERIFIED_PAGES_DEPLOY=true。另建議設定 main 的 branch protection 和必要檢查，限制未審查的直接推送。
- 程式只能檢查欄位與狀態邏輯，不能辨別使用者是否真的正確閱讀原文，也不能取代真人領域審核。上線前仍須獨立查核來源及主要結論。

## 新期正文與證據逐項對照（開發分支）

新建週報與月報除原本 `publication/issues.json` 與 `publication/claims/*.json` 外，須讓 `<main>` 內具實質內容的 p、h3/h4、li、blockquote、figcaption、td/th 逐項標記 `data-claim-id`，CI 對照 JSON 中 `claim_text`；請參閱 [正文綁定操作說明](research/body-claim-binding-guide.md)。這項功能僅能檢查格式與文字一致，不能判斷原始資料真偽；legacy 期刊不自動追認通過。

## 原文快照與中文解讀核驗（新期刊）

新週報與月報的實質性主張，除了正文與 claim_id 對照，須附可逐字比對的原文摘錄、具 SHA-256 的來源快照、來源 URL 及解讀／適用範圍說明。參閱 [來源證據與人工語意審查 SOP](research/source-to-claim-review.md)。程式只檢查資料鏈及檔案一致性；不能保證原始快照真實、譯文解讀正確，亦不能替代不同真人的高影響內容複核。

## 新聞／研究誤讀壓力測試（初步合成基準）

- [30 筆合成誤讀測試與初步結果](research/benchmarks/semantic-evaluation-v0.1.md)：涵蓋 5 個新聞與 5 個研究主題；20 個暫定不支持的敘述中，關鍵字規則漏警示 2 個（10%）；這是合成案例的漏警示比例，不是實際週報錯誤率。
- [案例 JSON](research/benchmarks/semantic-cases-2026-10.json)、[警示評估程式](research/benchmark-semantic.js)、[回歸測試](research/benchmark-semantic.test.js)。所有案例均標示暫定編輯標籤，尚非真人獨立審閱的黃金標準。
- 語意警示工具一律輸出 `review`，不自動放行新聞或論文。真正的語意審核仍須原始文章全文與不同真人審閱者確認。

## 60 題新聞／論文語意盲測：審閱準備中

- [未標記答案的 60 題候選資料](research/benchmarks/blind-review-candidates-60.json)、[兩位真人獨立審查／仲裁規範](research/benchmarks/blind-review-protocol-v0.1.md)、[題庫完整性與準備狀態驗證](research/validate-blind-pack.js)。
- 目前 60 題尚未填妥逐題原始摘錄及定位，屬 **PREPARATION_ONLY_NOT_READY_FOR_BLIND_JUDGING**；CI 只會確認題庫完整，不認證原始研究或允許直接評分。
- 待各題從原始來源補齊證據、再由兩名不同真人獨立判讀與第三人仲裁後，才能建立正式黃金標準及評估真實語意漏判率。答案與專家個別標註在完成盲測前不得公布在公開 GitHub。

## 讀者評鑑 v1.1：多專業模擬審查改善

讀者可由 [公開評鑑入口](feedback/) 提交可信度感受與易讀性評分或具體勘誤。純評分僅需報告網址等必要欄位，不強制長篇說明；公開週整理不再複製讀者自填標題，並顯示評分有效樣本數與未評分數。請參閱 [讀者回饋改善 SOP](research/reader-feedback-policy.md)。這是 AI 模擬多專業檢查與程式測試，不是外部真人專家審核。GitHub 登入和公開姓名仍是限制，未建匿名表單前不宣稱無帳號即可提交。

## 低人力風險分級發布門檻（2026/10 更新）

[風險分級與查核 SOP](research/low-human-review-policy.md)：低風險書目與公告存在資訊可在原始來源核對後發布；中風險限定性敘述需原文快照、逐項來源追溯與兩次查核紀錄；高風險政策效力、介入因果成效及重大外推一律不得經自動流程直接發布。結構檢查及關鍵字警示不能證明語意真實，必要時應保留候選／hold。60 題盲測不阻擋一般低風險週報運作；Google Forms 維持停用。

## 首期標準週報建稿（不預填未查核內容）

已建立 [2026/10/09–10/15 週報候選工作表](research/drafts/2026-10-09_2026-10-15.json)。初始 `items` 為空，狀態為 `draft_pending_source_verification`，並不是已發布的新聞、已審核的論文或 `publication/issues.json` 中的正式報告。可以用 `node research/scaffold-weekly.js 2026-10-16` 在本地建立下一期候選檔；只接受合法週五起始日期，既有檔案不得覆寫。填入真實來源與逐條核對資料後，仍須另外依 [風險分級規範](research/low-human-review-policy.md) 產生正式 HTML／查核 JSON，通過必要 CI 才能發布。暫停的 Google Forms 不在本流程內。

## 60 題語意審查：初步資料覆蓋，不是正式驗證

[60題第一階段初篩報告](research/benchmarks/semantic-screening-60-progress-2026-10-09.md)；[後40題資料](research/benchmarks/semantic-screening-remaining40-2026-10-09.json)。已涵蓋60/60題並註記來源與暫定判讀，但**沒有全文逐題原始證據快照、獨立真人金標籤或可宣稱的真實模型漏判率**。所有資料維持 hold；不得把結構測試通過當作新聞或論文語意已正確核實。60題已經經過暫定判讀，不應再冒充真正未見過答案的獨立盲測。
