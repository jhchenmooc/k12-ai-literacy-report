# 建議修正順序與未決事項

基準：2329a91d1e5af66da00848fa72daca2c230edb47。下列是建議工作，尚未執行修復。

## 第一批：發布正文與公開產物邊界

處理 S1、S2、S3。用正確HTML解析或等效嚴格靜態處理對齊瀏覽器語義；不能只在擷取後的main內找comment。URL檢查以解碼後attribute與規範化scheme為準。建立允許公開HTML的inventory，使驗證與打包使用一致範圍，保留明確legacy與utility例外。

驗收：正常期別與合法來源連結仍可通過；comment fake-main、Tab/NewLine URL、未登記額外HTML均被拒絕或不進公開產物。跨模組測試須覆蓋驗證→打包，不能只測各函式。

這三項彼此相關，可放同一修正批次，但不必重建整套發布系統。修正前重新查最新main，若根因已改則增量驗證，不盲目套本輪快照。

## 第二批：候選保存與更新待核對

處理 DATA-01、DATA-02。URL保留path大小寫與未知身份query，僅處理已確認追蹤參數；同DOI／同事件規則須保留既有意義。update_note先做型別與空值驗證，不讓truthy非字串落入不記錄分支。

驗收：兩種不同來源皆保存完整候選；已確認同來源的duplicate仍維持預期行為；非法note拒絕或保留待核紀錄；未處理更新不能被提名。提名仍review-only，不新增自動發布。

## 第三批：跨工具資料與日期契約

處理 DATA-03、DATA-04、DATA-06。新scaffold與每日reader對空search_runs一致；CSV拒絕非法關閉引號及重複表頭，同時保留合法多行／逗號／escaped quote。每日reader按既有SOP納入歷史昨日核證線索，依當前出刊週重分類為背景，不直接拼接舊週suggested。

驗收：真正scaffold→dailyBrief空流程成功；合法CSV不改值、非法資料明確拒絕；跨週晚核證可見且不當成新事件。涉及跨週規則時先以SOP為準，若使用者想縮限為同週須明確另作需求決定。

## 第四批：可重現建置與直接CLI行為

處理 SF-04、S4。固定排序locale/options及穩定tie-breaker，選定檔案換行與CSS hash契約；避免Windows重產生產物會使UbuntuCI失敗。CLI依原始紀錄／索引對應decision，驗證ID唯一。

驗收：相同資料在支持環境產生相同頁面；檔案換行政策明確；重複ID及違規publish使CLI非零，合法hold保持既定成功意義。檢查Windows與CI Node22，至少保留本輪反例。

## 第五批：讀者回饋、手機與低影響健壯性

處理 SF-02、SF-01，再處理 DATA-05、SF-03。分頁取完整資料；若保留上限，在末頁滿額時拒絕發完整統計或清楚揭露不完整。網格最小尺寸限制在容器內。部分計數逐對比大小；畸形診斷輸入回結構化錯誤。

驗收：1001筆mock資料不悄悄漏計；320px與放大重排需真正瀏覽器驗證；null/object輸入不使整包意外中斷；未知總數仍拒絕recorded>screened。

## 另外確認／可選改善

- Pages environment允許部署的分支及手動dispatch控制，目前未驗證；確認設定後再判斷是否需要變更。
- verify權限收斂到read，pages/id-token只給deploy；不預設需要新憑證或外部服務。
- Actions pin、renderer讀取錯誤、Issue form字面換行屬改善，可併入相關批次，不擴張成新工具／框架專案。
- Edge測試啟動失敗的環境限制不需在repo內建立永久瀏覽器服務；改用可用測試環境完成UI驗收即可。

修復交付後再重跑受影響測試、對应反例及必要CI；只有新失敗、變更或風險才擴大測試。正式修正、PR、設定變更與部署需要後續授權，本輪報告沒有執行這些操作。
