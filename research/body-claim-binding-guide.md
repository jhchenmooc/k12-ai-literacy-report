# 新期週報／月報：正文與證據逐項綁定（提案）

此規範僅適用於 **新建立** 的 `weekly/<期別>/index.html` 或 `monthly/<月份>/index.html`；2026/9/29–10/8 創刊特刊及 2026/9 月歷史月報維持 legacy，不得冒稱已通過。

## 必須一起提交的三項檔案

1. 新期靜態 HTML（至少一個 `<main>`）。
2. `publication/claims/<unique-id>.json`：逐條、已完成核查的 publish 主張；禁止 hold 與偽造核查。
3. `publication/issues.json`：登記 HTML 相對路徑與 claims_file。

## HTML 標記方法

每個 `<main>` 內的 `p, h3, h4, li, blockquote, figcaption, td, th` 可見敘述要以 `data-claim-id` 綁定唯一主張；同一 `claim_id` 在當期只出現一次。當正文被修改，JSON 中的 `claim_text` 也須對齊並重新查核；**不得單純為了 CI 綠燈而修改查核紀錄**。

示意（僅為合成測試，並非真正的已核實新聞）：

```html
<main>
  <section>
    <h2>重要國際動態</h2>
    <article>
      <h3 data-claim-id="DEMO-1">某機構公開了一份教育指引</h3>
      <p data-claim-id="DEMO-2">該指引目前仍屬非拘束性建議。</p>
    </article>
  </section>
</main>
```

兩句敘述都要各自建立 JSON 主張及原文定位，才能正式發布。具有影響的標題也應標記：目前檢查 h3/h4，但**尚未涵蓋 h1/h2、圖片說明以外的圖中文字、JavaScript 產生內容或 CSS pseudo-content**，這些屬仍待加強的風險範圍。

## 程式會拒絕

- 新期 HTML 未列 `issues.json`、或沒有 claims JSON。
- HTML 主要內容有未標記的句子或未知 `claim_id`。
- HTML 用的主張在 JSON 不存在；JSON 有主張卻未出現在正文。
- 同一 `claim_id` 在同一期被使用超過一次，或同一 `claim_id` 被重複登記。
- 正文文字與 `claim_text` 不一致；例如把「提出草案」改成「已正式強制實施」卻未重新核對。
- 主張被標為 `hold`、來源衝突未解、查核等級不足或高風險主張缺獨立審閱。

## 重要限制

現行比對是**保守的靜態 HTML 規則**，不具備完整 HTML 樹解析或自然語意查核能力：它不能知道來源 URL 是否真的含有所宣稱內容，也無法偵測全部未標記的非指定 HTML 標籤，亦不能核實 `source_checked=true` 是否屬實。故 CI 通過是必要但非充分條件。

若將來使用 React、互動產生內容、複雜巢狀表格，須改成正式的 DOM parser 與更全面測試後才可宣稱完整覆蓋。正式政策重大效果仍須真人核查。
