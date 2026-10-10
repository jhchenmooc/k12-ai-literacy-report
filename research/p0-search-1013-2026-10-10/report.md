# 編輯 session 交辦四項：教育部指引官方頁、政策重試、B1、Diamond Scientific（2026-10-10）

> **性質：** 這是人工搜尋輔助的查核紀錄，不是認證。查詢子代理與整合者是同一模型，不算獨立審閱。
>
> **請求規則：** 所有請求都沒有帶 email、mailto 或金鑰，沒有繞過 captcha、403 或 Cloudflare，TLS 驗證全程開著，也沒有用程式操控瀏覽器。下載檔只放 scratchpad，不入 repo。
>
> **交辦：** 編輯 session（session_01XLm9YebBcin2xA95hg9kye）2026-10-10 交辦，期限 10/13。

## 一、KB-2026-0259 教育部官方頁：搜尋未見

- **結論：** 2026-10-10 18:05–18:11 UTC 查過下列各處，都沒有找到《高級中等以下學校人工智慧使用和學習指引》的教育部官方公告頁或原件下載頁。`primary_url` 維持新竹縣轉載網址。
- **查過的地方：**
  - WebSearch 9 個查詢，包括題名、「人工智慧使用和學習指引 教育部」、函號 1152701618，以及限定 edu.tw、k12ea.gov.tw、moe.gov.tw 網域的查詢。結果全是學校轉載，沒有部會網域。
  - 教育部即時新聞列表，涵蓋 115-03-23～115-10-10，HTTP 200。
  - 資科司的首頁、電子布告欄、資料下載、即時新聞、校園資訊應用與推廣，以及四個數位學習相關頁，都是 HTTP 200。
  - 國教署最新消息、即時新聞、公文公告平台的關鍵字搜尋，HTTP 200。
  - 教育部主管法規查詢系統：關鍵字「人工智慧」有 3 筆，都無關；函號查詢 0 筆。
  - pads.moe.edu.tw 的 download2.php、「115年中小學數位與AI教學指引」分類、「中小學使用生成式人工智慧注意事項」分類、news.php，HTTP 200。分類裡只有教師、校長、家長指引與注意事項，沒有這份總指引。
- **發送方式：** 屏東縣政府 115-06-15 的轉發函（屏府教發字第 1155107876 號）寫「依據教育部115年6月5日臺教資(一)字第1152701618號函辦理」，但沒有附教育部網址。看來本指引是以公文附件發送，教育部可能沒有另設公告頁。這是推論，沒有證實。
- **其他轉載的比對：**
  - 臺中大里高中轉載版（public.dali.tc.edu.tw/rules/doc/2025/pdf/810-11.pdf）：大小同為 333,083 bytes、15 頁，文字和新竹版完全相同。只有 PDF 修改日不同，所以 SHA-256 不同。
  - 屏東三校轉載版：轉發函 1 頁加指引 15 頁，指引的文字相同。
- **修訂版與期內公告：** 搜尋未見晚於 2026-06-05 的修訂版。10/09～10/15 也沒有和本指引相關的官方公告。
- **線索：** pads 資料下載頁上的「115年中小學AI之學習應用手冊」與「臺灣教師與學生AI素養框架」，是本指引前言提到的配套文件，但不是本指引本身。這次沒有下載。

## 二、政策待判：只重試一次，仍讀不到

| 待判 | 網址 | 2026-10-10 UTC | 結果 |
|---|---|---|---|
| B-US-04 | https://www.ed.gov/media/document/guidance-artificial-intelligence-use-schools-112052.pdf | 18:05:20 | 403 |
| B-US-04 | ed.gov 新聞稿頁（依題名推測的網址） | 18:05:21 | 403 |
| B-AU-01 | https://www.education.gov.au/node/20276 | 18:05:21、18:05:30 | HTTP/2 連線中斷；改 HTTP/1.1 仍是空回應 |
| B-AU-02 | https://ministers.education.gov.au/clare/draft-schools-ai-framework-open-consultation | 18:05:22、18:06:01 | 同上 |
| C-09 | https://www.oecd.org/en/about/projects/pisa-2029-media-and-artificial-intelligence-literacy.html | 18:05:23 | 403 |
| C-12 | https://www.oecd.org/en/publications/what-should-teachers-teach-and-students-learn-in-a-future-of-powerful-ai_ca56c7d6-en.html | 18:05:23 | 403 |

- 五件都維持待判。
- 中國 2 件、臺灣評量注意事項、UNESCO 3 件，這次沒有新證據，維持現有判斷，也沒有再查。

### 需管理者用瀏覽器另存的清單

| 待判 | 要存的內容 | 網址 |
|---|---|---|
| C-18 | 歐洲理事會 CM/Rec(2026)12 正式文本，含編號與通過日 | https://search.coe.int/cm?i=CM/Rec(2026)12 ；新聞頁 https://www.coe.int/en/web/portal/-/new-council-of-europe-recommendation-places-education-at-the-heart-of-response-to-ai |
| C-09 | OECD PISA 2029 MAIL 框架官方頁，含題名、首發日、版本 | https://www.oecd.org/en/about/projects/pisa-2029-media-and-artificial-intelligence-literacy.html （國家教育研究院轉載的初稿只當線索） |
| C-12 | OECD〈What should teachers teach and students learn in a future of powerful AI?〉出版頁，含日期與範圍 | https://www.oecd.org/en/publications/what-should-teachers-teach-and-students-learn-in-a-future-of-powerful-ai_ca56c7d6-en.html |
| B-US-04 | 美國教育部 AI 經費運用指引原件 | https://www.ed.gov/media/document/guidance-artificial-intelligence-use-schools-112052.pdf |
| B-AU-01 | 澳洲政府對國會《Study Buddy or Influencer》報告的回應 | https://www.education.gov.au/node/20276 |
| B-AU-02 | 部長新聞稿〈Draft schools AI framework open for consultation〉 | https://ministers.education.gov.au/clare/draft-schools-ai-framework-open-consultation |

## 三、B1 待判 41 件

- **Scopus 補摘要：** 編輯 session 核對後，只有 3 件 AI & Society 需要（10.1007/s00146-025-02609-y、10.1007/s00146-025-02606-1、10.1007/s00146-025-02458-9），清單已由編輯 session 直接交給管理者。文獻搜尋 session 沒有另外列。
  - **Scopus 結果（2026-10-10 管理者一般檢索加正式匯出）：** 三件的文件類型都是 Note，Abstract 欄都是「[No abstract available]」：
    - 02606-1：41(2):1269–1271。
    - 02609-y：41(2):1275–1276。
    - 02458-9：41(1):475–476。
  - **判讀：** 這三件是兩三頁的短評，出版者沒有提供摘要。比照 Frontiers 兩篇 Opinion 的處理，維持待判，已更新到 [b1-results.json](../p0-pending-final-2026-10-10/b1-results.json)。匯出檔沒有入 repo。
- **其餘：** 學段不明或混合的 23 件、AI 素養歸類不明的 1 件、管理者已決定待判的 7 件，這次都不動，沒有放寬規則，也沒有再查。

## 四、Diamond Scientific Publishing 出版商查核

> **更正縮寫：** [p0-pending-final](../p0-pending-final-2026-10-10/report.md) 第三節寫「EJTE 的出版商 Diamond Scientific」，這裡的 EJTE 指 European Journal of Teaching and Education（ISSN 2669-0667，DOI 前綴 `10.33422`）。監測清單的 J44 是 European Journal of Teacher Education（Taylor & Francis，ISSN 0261-9768），已入庫的 KB-2026-0133 也是這本，清單第 238 行也簡寫成 EJTE。兩本刊名的縮寫相同，所以不收規則**不可用「EJTE」比對**，要用 DOI 前綴、ISSN 和出版商名稱。

- **建議：** 整個出版商列為不收出處，以 DOI 前綴 `10.33422`（Crossref 會員 18905，Mokslinės leidybos deimantas, MB，登記地 Vilnius）界定。這只是建議，由管理者決定，這次沒有改清單。
- **理由：** 不寫成「比照 Atlantic」，而是寫成「以會議為主的商業模式，加上審查無法核實」。
  1. **主業是會議：**
     - Crossref 上約 5,300 個 DOI，其中 Conference Paper 有 3,113 個。
     - 2025-01-01～2026-10-10 共 948 個 DOI，大多屬約 100 個會議論文集，旗下 15 本期刊合計約 330 篇。
     - 出版商頁連到 57 個會議網站。抽查 etconf.org，宣稱論文可登上 Scopus、WoS、DOAJ 期刊，但自家期刊在 DOAJ 是 0 筆。
  2. **審查品質無法從外部核實：** 自稱雙盲審查，但 DOAJ 和 OpenAlex（is_in_doaj=false）都沒收錄，Scopus、WoS 也查不到收錄證據。
  3. **出版紀錄有瑕疵：**
     - 2025 年起有 37 組同一論文編號、不同 DOI 的登錄，可能只是 Crossref 登錄錯誤。
     - 2019～2022 年有 16 篇期刊論文和自家會議論文同名。
  4. **排除的代價小：** 2025 年起全部 923 篇（OpenAlex）中，#121 的 AI×K-12 查詢只命中 9 篇，真正相關的約 2～3 篇。例如 `10.33422/ejte.v8i3.1872`（瑞典中學教師），沒有逐篇判讀。
- **和 Atlantic Academic Press 的不同：** Diamond 的透明度明顯較好。
  - 2019 年創刊，出版商已營運約 8 年。
  - 網站寫明審查流程，2025 年起 44 篇都標了投稿日與接受日：中位數 58.5 天，30 天內接受的有 8 篇。
  - 編委都列了單位。
  - 有一個小疑點：副主編沒有單位，信箱是出版商的公用信箱。
- **替代方案：** 只把 European Journal of Teaching and Education 列為不收，其餘逐篇判。但這樣每次檢索都要重查，不符合不收出處「不必每次重查」的用意。
- **不確定：**
  - 沒查付費觀察名單（例如 Cabells）。WebSearch 沒找到具名的掠奪性出版討論，但這不等於已經確認沒有問題。
  - 會議網站和出版商是否同一主辦方，是從出版商頁上的連結推斷的。
  - 沒有抽查全文的方法品質。
- **證據：** 出版商網站、DOAJ API、Crossref 期刊／前綴／會員 API、OpenAlex sources 與計數查詢，2026-10-10 18:05–18:08 UTC，都是 HTTP 200。會議論文集頁回 HTTP 500，但有回傳內容。

## 週報標記（10/09～10/15）

這四項都沒有首次公開日落在 10/09～10/15、對象為 k12 的新項目。
