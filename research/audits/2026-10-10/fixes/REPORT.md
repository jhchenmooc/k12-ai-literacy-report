# 程式碼稽核修正交付

日期：2026-10-10。已完成原稽核的 14 項程式修正，以及第二輪多角度自檢後的 6 類追加修正、回歸測試與本機整合驗證。

- Repository：`jhchenmooc/k12-ai-literacy-report`
- 基準：`2329a91d1e5af66da00848fa72daca2c230edb47`
- 修正副本：`D:\codex\ai\fix-review-20261010`
- 分支：`fix/audit-findings-20261010`
- 交付形式：工作目錄中 32 個已追蹤檔案修改、8 個新增檔案，尚未 commit；另附可套用 patch。
- 原有 `k12-ai-literacy-report`、`-next`、`-wave2` 工作副本未修改。未 push、建立 PR、合併、部署或修改 GitHub 設定。

## 14 項修正與驗收

| ID | 修正 | 驗收證據 |
|---|---|---|
| S1 | 發布閘門以 parse5 的 DOM 解析綁定主張，不再用正規表示式辨認 main；拒絕註解偽裝、inert template、隱藏祖先與假屬性綁定 | 惡意案例拒絕；合法巢狀文字與 entity 案例通過 |
| S2 | 在解析及解碼 URL 屬性後檢查協定 | `java&Tab;script:`、`java&NewLine;script:` 均被阻擋 |
| S3 | 閘門與 deploy 共用公開檔案清單及建置器，拒絕未知檔案、連結與非一般檔案；取代遞迴複製 | 未宣告 HTML、深層檔案、額外資源、junction 均失敗；22 個公開檔案建置與雜湊比對成功 |
| S4 | claims CLI 依輸入索引處理每筆結果，拒絕重複 ID 與格式錯誤 | 前筆 hold 不能遮蔽後筆不合法 publish；CLI 回傳非零 |
| DATA01 | URL 保留路徑大小寫、尾斜線、未知參數、參數順序與編碼，僅移除明確追蹤參數 | 路徑、query、百分比編碼差異與追蹤參數控制組通過；另附唯讀歷史掃描 |
| DATA02 | 匯入前驗證所有 update_note；非字串拒絕，空白修正列為未解決 | 不合法批次不寫回；未解決更正阻止發布建議；寫入失敗保留原檔並可重試 |
| DATA03 | scaffold 初始化 search_runs | 新建空白草稿可產生待審包；已知舊版空白 scaffold 可相容讀取 |
| DATA04 | CSV 檢查引號狀態、欄寬及唯一非空表頭 | 拒絕閉引號後夾字與重複表頭；保留合法逗號、換行、空值與跳脫引號 |
| DATA05 | 已知搜尋數量依序兩兩比較，不讓 unknown 跳過其他已知欄位 | seen unknown、screened 3、recorded 4 會失敗 |
| DATA06 | 每日待審包納入較早工作表的延後查核與來源更新，僅列背景及待複核 | 跨週可見、未來工作表忽略、原檔不變、不新增歷史發布建議；完全相同紀錄去重；格式錯誤包含檔名 |
| SF01 | 卡片最小寬度限制為容器可用寬度 | Edge 下 5 頁 × 4 寬度，共 20 組均無頁面水平溢出 |
| SF02 | 回饋彙整讀完所有分頁才寫入；API 格式錯誤及重複頁面先停止 | 1001 筆、整頁結束、空頁、後段 API 失敗、PR 同名、重複及重疊頁面均有模擬測試 |
| SF03 | 來源事實與中文主張診斷檢查空值、物件及陣列型別 | 畸形輸入回傳可理解的失敗／hold，避免未處理 TypeError |
| SF04 | 固定排序規則與 ID 同名次序；Git 屬性固定程式／頁面 LF，證據與 CSV 保留原位元組 | Node 22、24 全測通過；最新實際 autocrlf=true checkout 的 318 個檔案中，指定文字檔無 CRLF 違規，產生頁面檢查通過 |

另外補上公開建置 CLI 的獨立程序測試，修正只有以 CLI 啟動才發生的循環載入問題；重跑遇到非空輸出目錄會停止，不會刪除既有檔案。README 已連結本機驗證文件。

## 第二輪多角度自檢後的修正

此次以發布安全、來源保全、工作表資料型別、跨週流程一致性、CLI 證據映射、回饋分頁及建置重現性重新檢視。共補上以下 6 類問題；新增 8 項回歸測試，全部測試由 250 增至 258。

| 角度／問題 | 修正及驗證 |
|---|---|
| 跨週修正可見，但沒有阻擋當期建議或正式閘門 | 新增共用 `source-review-state.js`。同一來源、關聯候選 ID、直接附在候選上的待複核修正，均阻止 daily 建議與正式發布。已完成複核時可恢復；不同識別參數的來源不會誤擋。仍未解決的舊修正列入待審包，避免只顯示昨日修正而漏掉舊問題。 |
| null、陣列或其他畸形 manifest 會 throw，部分缺少 editions 的 inventory 卻顯示成功 | manifest 必須是物件且 editions 為陣列；閘門和 inventory 均回傳明確失敗。 |
| 工作表只驗證最外層陣列，内部 null／錯誤型別可導致例外或忽略修正 | 驗證 period、日期與檔名一致性、候選及搜尋紀錄、修正紀錄陣列和 review_required 布林狀態。錯誤包含工作表檔名。已知舊版空白 scaffold 的相容處理保留。 |
| 反斜線可偽裝成瀏覽器會解析的協定相對網址 | URL 檢查比照瀏覽器處理反斜線，阻擋 `\\example.org` 等繞過。 |
| 原文快照能經符號連結讀取外部內容；雜湊原先基於解碼後字串 | 來源快照必須是 repository 內的一般檔案，禁止 junction／symlink；SHA-256 比對原始位元組，避免非法 UTF-8 解碼改變雜湊輸入。合法既有快照仍通過。 |
| 中文診斷 CLI 對重複 card_id 靜默選取最後一筆 | 明確拒絕重複證據 ID，回傳非零狀態，不產生容易誤讀的診斷結果。 |

初次新增案例曾重現失敗，見 [第一組修正前測試](self-review-red-tests.log) 與 [來源／CLI 修正前測試](self-review-source-red-tests.log)。正式 daily 閘門另有來源修正、跨週重複發現、解除複核及畸形歷史資料控制組。回饋分頁、既有產生頁面與手機 CSS 在本輪未變動，原有回歸測試持續通過。

## 驗證結果

| 檢查 | 結果 | 紀錄 |
|---|---|---|
| Windows / Node.js 22.23.3 全部測試 | 258/258 通過，0 skipped | [Node 22](self-review-node22-tests.log) |
| Windows / Node.js 24.16.0 全部測試 | 258/258 通過，0 skipped | [Node 24](self-review-node24-tests.log) |
| npm ci 乾淨安裝 | 官方 registry 的鎖定套件安裝成功，停用 lifecycle scripts；安裝後發布測試 96/96 通過 | [安裝後回歸](clean-install-security-tests.log) |
| CI 對應資料、語意、發布、產生頁面與建置 CLI | 8 組全部 exit 0 | [命令結果](validation-commands.json) |
| 來源保全 | 27 個 CSV、原文、reference、draft、publication JSON 與既有刊物檔案 SHA-256 全部相同 | [雜湊明細](source-preservation.json) |
| autocrlf=true 實際 checkout | 最新 318 檔中指定文字檔 LF；9 個換行例外檔案位元組一致；頁面可重現 | [Checkout 與產物](checkout-and-artifact-self-review.json) |
| 公開產物 | 22 檔與來源一致；相對 href/src 無缺少目標 | [Checkout 與產物](checkout-and-artifact-self-review.json) |
| 瀏覽器 | Edge 154.0.4258.62，256/320/375/1280px；首頁、about、archive、feedback、既有週報全無水平溢出；記錄首個 Tab 焦點 | [瀏覽器測量](browser-results.json)、[320px 畫面](about-320.png) |
| 差異與 patch | git diff --check 通過；patch 對原基準 git apply --check 通過 | [變更摘要](change-summary.json)、[Patch](audit-fixes.patch) |

瀏覽器檢查使用離線本機頁面，未提交回饋。這些尺寸與鍵盤抽查不等同完整無障礙認證。尚未執行修正分支的 GitHub Ubuntu CI 或 Pages 部署，不能以本機通過取代遠端狀態。

## 歷史 URL 影響

唯讀掃描已追蹤 research 與 publication JSON 的 191 個 source_url 出現位置，共 73 個不同網址；其中 66 個位置的新舊去重鍵不同。發現 1 組實際鍵碰撞：32 個不同 AERA 論文網址原本都會失去 `selected_paper_id` 等參數，變成同一去重鍵。新規則將它們分開。

完整位置見 [歷史影響掃描](historical-url-impact.json)。這代表舊規則有誤合併風險，**不代表這 32 筆已被匯入器刪除**。此次未改寫歷史資料、候選 ID 或既有決策；未保存的原始匯入批次也無法從現有資料還原。

## 交付與後續界線

修改可直接在上述修正副本檢視；`audit-fixes.patch` 包含新增檔案。套用前應确认目標是基準版本且無衝突，先執行 `git apply --check`。

本次程式修正與本機驗證已完成。尚待後續另行處理的是 Git commit／PR、遠端 CI 與部署；本次沒有進行對外發布。發布閘門仍是結構性檢查，不能證明來源事實、翻譯或編輯判斷正確。
