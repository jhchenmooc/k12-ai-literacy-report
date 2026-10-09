# 第二次 Claude 複審後的 P3 收尾

使用者貼上的複審針對 `e37ec618d1c58198957751e6ee4729d0879fb7b9`，結論為 P1-1／P2-1 已修正、未發現阻擋合併事項。Claude 報稱在 Linux Node 22／24 與 autocrlf clone 的 portable verifier 通過，另測試原 21 個及新增 24 個繞過案例。這些是外部審查回報，並非本輪重跑的所有案例。

## 本輪處理

- **P3-1**：移除正文 `title` 屬性，禁止未綁定 tooltip；最小頁面的 title 不再可任意填寫，限定由已登錄路徑產生的中性期別標題，也可省略。完整日報的固定 renderer 標題仍正常通過。
- **P3-2**：保留保守誤拒取捨，新增 [HTML 貢獻契約](../../../PUBLICATION-CONTRIBUTING.md)，列明 body 註解、noopener、lang、dir、mailto 等合法語法目前不支援；新增需求必須先修訂白名單與正負例。
- **P3-3**：未在沒有新刊需求時擴增週／月報 renderer。貢獻契約明列首次正式週／月報使用完整網站版面前，須先加入 renderer、正文外比對及無障礙／生成檢查。main-only 限制仍存在，這是出刊前待辦，不能說成已實作。
- **P3-4**：登錄刊物的 meta charset 限定 UTF-8 或省略；舊式 Content-Type 宣告亦限定 UTF-8，包含大小寫 HTTP-equiv，不依靠 Pages HTTP header 防護。legacy 範圍維持不變。

## 自行重現與驗證

新增五個測試，包含 tooltip／anchor、任意標題、不同 charset／舊式 Content-Type 的反例，以及中性標題、UTF-8／不宣告的控制組。修正前 **3 fail／2 pass**，見 `red-tests.log`；修正後全套 **288/288**，Node 22.23.3 與 Node 24.16.0 各 0 skipped。原 renderer 控制組與所有既有測試仍通過。

Node 22 portable verifier 七個其他 CLI、27 個資料檔案保全、22 個公開產物及 434 個本機參照通過。封存紀錄來自 e37ec61 加尚未提交補修的 working tree；JSON 的 reviewedHead 是前一提交，已另註明，取得本輪最新 HEAD 後應自行重跑。原 70 份佐證保持位元組與雜湊不變。

Claude 未驗證 Windows／junction；Codex 之前與本輪均是在 Windows 本機跑測試，包含既有 junction 測試，這補上本機平台證據，但不代表 Claude 自行做過 Windows 複審。遠端 CI、Pages environment／部署、真實 API、screen reader 與來源真實性仍未驗證。未建立 PR、未合併 main、未部署。遠端 CI 必須在建立 PR 後另外確認通過。
