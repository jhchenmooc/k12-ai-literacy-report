# 版本與檢查覆蓋矩陣

SHA：2329a91d1e5af66da00848fa72daca2c230edb47。2026-10-10（臺灣）。
「已檢查」不代表零缺陷；各項結果與限制如下。動態案例使用隔離資料，不是原始來源真實性認證。

## 重要預期行為與依據

| 條件 | 需求依據 | 結果 |
|---|---|---|
| 實際 main 與逐項 claim 對應，恰好一個 main | validate-publication 的契約及 body-claim-binding-guide | S1 反例違反；既有正常文字绑定及负向測試通過 |
| 靜態期別不得有執行腳本 URL | editorial-workflow-master「v1.6 第三輪自檢」 | 字面 scheme 被拒，S2 named entity 繞過 |
| 新報告須登錄且具合格 claims | publication-check-spec／validate-publication | 一層 index 被覆蓋；S3 公開 HTML 範圍漏檢 |
| 高風險及未知衝突不得自動發布 | low-human-review-policy／validate-claims | 主 gate 拒絕；S4 CLI exit 有錯誤 |
| 去重保留不同來源，疑似更新待複核 | editorial-workflow-master:181、207；KB schema 作佐證 | DATA-01、02 缺陷 |
| 零搜尋不代表全球無新聞，仍可形成空待審包 | prepare-daily-brief 的空狀態輸出及現有 test | DATA-03 跨工具契約錯誤 |
| 題名原樣保存、合法 CSV escaping | knowledge-base/schema.md | DATA-04 非法欄／重複表頭被靜默改值 |
| 已知搜尋計數上下游一致，未知保留未知 | KB validator／schema | DATA-05 部分計數矛盾放行 |
| 晚核證重新列入，跨週只作背景 | editorial-workflow-master:205、207 | DATA-06 CLI 漏列；修復不能沿用舊週提名 |
| 同輸入生成相同網站，CI 比較生成頁 | render-site/check模式與現有測試 | SF-04 locale／換行契約未固定 |

## 模組與流程覆蓋

| 範圍 | 方法 | 結果／證據 | 限制 |
|---|---|---|---|
| 全部程式入口、設定及依賴 | tracked inventory、副作用搜尋、37 JS syntax check | core-results.json；無 package.json／lockfile；未安装套件 | 不作全面第三方漏洞掃描 |
| 全部 JSON | 92 個逐一 JSON.parse | 無格式錯誤 | 不代表每個研究記錄的語意已查核 |
| 19 個 test 檔 | Node --test 全量 | canonical 217/218；詳見 baseline-canonical-tests.log | 本地 Node24；Node22 以同SHA CI紀錄佐證 |
| validate-claims | 全文、既有測試、accept/reject 探針及 CLI exit | S4；高風險／非法日期／不安全來源等被拒 | 未驗證自填 review 記錄真實性 |
| validate-source-trace | 全文、雜湊／摘錄／URL／路徑／翻譯反例 | 正向通過、反例拒絕 | symlink、IO故障邊界未動態測 |
| validate-publication | 全文、既有測試、註解main／URL／未知HTML | S1–S3；正常 registered fixture 通過 | 不等於全 CI 攻擊案例演練 |
| ai-literacy-scope | 全文及發布／候選相關現有測試 | A/B、dims、audience 結構規則檢查 | 分類是否合理須內容審查 |
| scaffold-weekly | 全文、現有日期／拒覆寫測試、串接 brief | DATA-03 | 不自行建立正式出刊 |
| ingest-candidates | 全文、URL／duplicate／note探針、rename故障 | DATA-01/02；原檔保留、清理、重試成功 | 不涵蓋斷電／SIGKILL／實際並行競爭 |
| prepare-daily-brief | 全文、既有測試、實際CLI、跨週fixture | 正常CLI通過；DATA-03/06 | 輸出為review-only，不代表發布核准 |
| validate-knowledge-base | 369／929／281全量、CSV及計數反例 | DATA-04/05；既有index一致 | 未測所有編碼／所有欄位異常組合 |
| knowledge-base-utils/import-preview | 全文、現有測試、URL大小寫／query控制 | 保留差異；safe export現有測試通過 | 未實測所有試算表匯入器 |
| index／YEARS產生器 | 全文、CLI check、deterministic基線 | 同LF index與YEARS一致 | Markdown完整轉義安全未全面動態測 |
| render-site | 全文、既有測試、build比較、en排序對照 | SF-04；正常生成10頁、明定en可對齊 | read-failure轉空列改善；不認證正文來源 |
| 所有16 HTML本地連結 | 434個本地href/src/fragment存在性 | site-repro.cjs/log 無缺失 | 不含外部可達性、登入與來源查核 |
| HTML/CSS／手機與可及性 | 全頁類型靜態閱讀、CSS尺寸推導 | SF-01；skip/main/focus/table語意有既有支援 | Edge headless啟動失敗；實際键盤、對比、放大、輔助技術未驗證 |
| feedback/no-login/privacy | HTML/設定/Issue form及現有測試 | 停用狀態與公開資訊揭露一致 | GitHub表單實際畫面未驗證 |
| summarize-reader-feedback | 全文、既有測試、離線VM mock1001資料 | SF-02；GET10頁POST僅記憶體 | 未呼叫正式digest，不建立Issue |
| benchmark／compare／coverage diagnostics | 全文、既有基準CLI、畸形輸入探針 | 維持review/hold；SF-03 | 不是任意自然語言語意有效性評估 |
| blind pack／primary／remaining40／documentary | 全文／資料、相關全量測試及pack CLI | preparation狀態保留、answer leakage負向測試 | 真人金標／仲裁流程未実測 |
| Actions verify/deploy | 全文、同SHA job/steps、隔離打包 | verify/deploy成功；S3；权限建议 | 正式部署／回滾未演練；environment限制未驗證 |
| main ruleset | read-only GitHub API | active、strict verify、PR、無bypass | 傳統protection403；不宣稱所有環境控制已確認 |
| 原始碼保全 | 逐 tracked file 與git show HEAD比較 | trackedContentMismatch=[] | 既有三份工作副本僅讀，未清理其變更 |

## 效能與覆蓋收斂

本輪驗證現有369筆資料規模，檢查相關排序／去重／掃描流程；未發現足以要求大規模壓力測試的已驗證瓶頸。未以測試覆蓋率數字代替重要行為覆蓋，也未新增大型測試框架。

全量結構驗證與人工／靜態抽查範圍分開列出。未驗證事項保留為限制；所有矩陣項目已有結果或原因，固定版本的這輪審查完成。

## 主要可重跑證據

- `node D:/codex/ai/audit-results-20261010/core-checks.cjs`
- `node D:/codex/ai/audit-results-20261010/security-probes/reproduce.js`
- `node D:/codex/ai/audit-results-20261010/security-probes/full-artifact.js`
- `node D:/codex/ai/audit-results-20261010/data-repro.cjs`
- `node D:/codex/ai/audit-results-20261010/site-repro.cjs`

探針重跑只覆寫審查目錄的合成資料與log，不寫原始repo；full-artifact會在審查目錄的測試副本重產生頁面。
