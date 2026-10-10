# Favicon 第三方請求補修

使用者提供的 Claude 複審針對 `56621b8eb9ad4a755fe080c8dd07270030e38f04`，確認 metadata 缺口修正、沒有阻擋合併問題或回歸，另指出最小頁面 icon 可指向第三方追蹤網址。本輪自行重現該 P3 後選擇補修。

登錄刊物的 `link rel="icon"` 現只接受 `../../assets/favicon.svg`，可省略；第三方 HTTP(S)、protocol-relative 網址、不同本地路徑、query 或空 href 均拒絕。這避免透過登錄頁面的任意 favicon URL 引發第三方請求；不表示所有網站請求、第三方內容或 legacy 已完成隱私認證。完整日報原 renderer 使用相同固定路徑，legacy 範圍不變。[貢獻契約](../../../PUBLICATION-CONTRIBUTING.md) 已區分「本站外部 SVG 檔案」和「第三方網址」。

新增兩個測試：五種非法 href 與兩種合法本站圖示寫法；修正前 1 fail／1 pass，修正後 Windows Node 22.23.3／24.16.0 全套 **292/292**、0 skipped。Node 22 portable verifier 七個其他 CLI、27 個保全資料檔案、22 個公開產物及 434 個本機參照通過。原 80 份佐證未更動。

封存紀錄來自 56621b8 加尚未提交補修的 working tree；JSON 已標明該狀態，最新提交須重新執行 verifier。本輪沒有重跑瀏覽器／版面、遠端 CI、Pages、真實 API、screen reader 或來源人工查證。

尚未整合 main 的 B1 入庫更新；PR 前需整合並驗證，PR 後等待遠端 CI。未建立 PR、未合併 main、未部署。
