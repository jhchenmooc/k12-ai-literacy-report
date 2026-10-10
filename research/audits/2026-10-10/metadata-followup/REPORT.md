# 最小頁面搜尋／分享 metadata 補修

使用者提供的 Claude 複審針對 `6360e2148b68208412f09c88c2671a396291db8b`，未發現阻擋合併問題，但指出任意 description、og:title、twitter:description 仍可通過。這些外部審查結論與舊 288 項驗證屬前一版本；本輪自行重現 description 缺口後補修。

## 修正與控制

最小頁面的 meta 現採完整元素／屬性白名單，只允許：單一 UTF-8 charset；固定 viewport `width=device-width,initial-scale=1`；與路徑生成的中性期別 title 相同的 description；或僅指定 UTF-8 的舊式 Content-Type。各種宣告都可省略。保留上一版已支援的 UTF-8 Content-Type，是明確相容性選擇。

任意 description、Open Graph／Twitter 文字、property、其他未知屬性／name、任意 viewport，以及混入有效 charset／viewport 的額外屬性全部拒絕。完整日報保持原 renderer shell 精確比對；legacy 範圍不變。[貢獻契約](../../../PUBLICATION-CONTRIBUTING.md) 已更新；其他 meta（包含 CSP／default-style）目前不支援，新增需求需先修訂契約。

新增兩個測試：六種攻擊變體與三種合法 metadata 控制組。修正前反例測試失敗、合法控制組通過（1 fail／1 pass）；修正後全套 **290/290**，Windows Node 22.23.3／24.16.0，0 skipped。Node 22 portable verifier 另外七個 CLI、27 個保全資料檔案、22 個公開產物及 434 個本機參照通過。

封存紀錄為 6360e21 加未提交補修的 working tree，JSON 已標明執行狀態；最新提交須自行重跑 verifier。原 75 份佐證未更動。本輪只改 gate／測試／貢獻與審查文件，沒有重新執行瀏覽器／版面、遠端 CI、Pages、真實 API、screen reader 或來源人工查證。

原始稽核基準仍為 2329a91。先前已發現 main 的 B1 入庫提交 071d288 涉及來源資料與生成頁面，尚未整合到此審查分支；PR 前應處理整合與驗證，PR 後仍須等遠端 CI。未建立 PR、未合併 main、未部署。
