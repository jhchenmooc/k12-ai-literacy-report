# 臺灣來源監測清單（2026-10-18 起）

> 管理者 2026-10-17 決定：每日短訊與週報加入臺灣部分，只收中央機關與臺灣研究，與國際分開呈現（規則見主控 SOP「臺灣部分」）。本表為 2026-10-17 讀取檢查結果：預設 curl 各一次，不改 User-Agent、不繞過；轉址或錯誤網址以正確網址重試一次。

## 讀取檢查

| 類別 | 來源 | 網址 | HTTP 狀態 | 可程式讀取（是/否/部分） | 日期是否可見 | RSS/API | 備註 |
|---|---|---|---|---|---|---|---|
| 政策 | 教育部 即時新聞 | https://www.edu.tw/News.aspx?n=9E7AC85F1954DDA8&sms=169B8E91BB75571F | 200 | 是 | 是（民國 115-10-16 格式） | RSS：https://www.edu.tw/Rss_News.aspx?n=9E7AC85F1954DDA8（200，50 則，含 pubDate 與全文摘要） | 優先用 RSS；列表為伺服器端 HTML 表格（標題／發布單位／日期）。最新一則即為 AI 師培研討會新聞 |
| 政策 | 教育部主管法規查詢系統（最新訊息／命令） | https://edu.law.moe.gov.tw/ | 200 | 是 | 是（115.10.15 格式） | 未見 RSS | 首頁最新訊息為 HTML；法規預告連到 join.gov.tw。命令類：/index.aspx?LawType=07,08,09 |
| 政策 | 國教署 即時新聞 | https://www.k12ea.gov.tw/Tw/News/K12eaNewsLlist?filter=9F92BBB7-0251-4CB7-BF06-82385FD996A0 | 200（原猜測網址 /Tw/News/K12eaNews 為 302→err.html，改用首頁連結後重試一次） | 是 | 是（發布日期：2026-10-15） | RSS：https://www.k12ea.gov.tw/Tw/Unique/RSS（200，但僅 9 則，多為「最新消息」公告，不含即時新聞；link 為 // 開頭需補 https:） | 網址拼字為 NewsLlist（雙 L）。另有最新消息 /Tw/News/NewsList?filter=35950C34-6713-4B14-AB90-2461920C0386 |
| 政策 | 國家教育研究院 最新消息 | https://www.naer.edu.tw/PageDoc?fid=11 | 200 | 是 | 是（2026-10-16） | 未見 RSS | 新聞公告另在 PageDoc?fid=15 |
| 政策 | 教育部資訊及科技教育司 即時新聞 | https://depart.moe.edu.tw/ED2700/News.aspx?n=727087A8A1328DEE&sms=49589CE1E2730CC8 | 200（/ED2700/ 根目錄 302→Default.aspx，連結取自該頁） | 是 | 是（115-10-07） | RSS：https://depart.moe.edu.tw/ED2700/Rss_News.aspx?n=727087A8A1328DEE（200，50 則） | 與教育部本部同一 CMS；電子布告欄 n=A1E30194B1C3ACDF 也可同法取 RSS |
| 政策 | 行政院公報資訊網（教育科技文化篇） | https://gazette.nat.gov.tw/egFront/ | 200 | 是 | 是（2026-10-16） | 未見 RSS；有開放資料：openData02.do?action=last（每期 zip，檔名為出刊日，如 115-10-16.zip）、openData03.do（本月）、openData04.do（歷史）；欄位說明 openData01.do | 教育類瀏覽：advancedSearchResult.do?action=doQuery&chapter=5…（教育科技文化篇）。首頁已列教育部／國教署令與公告 |
| 政策 | data.gov.tw 教育部新聞稿資料集 | https://data.gov.tw/api/v2/rest/dataset?q=教育部新聞稿 | 405 | 否 | — | 未找到教育部新聞稿資料集（網頁搜尋只見陸委會、中研院等新聞稿資料集） | 不需要：教育部 RSS 已涵蓋 |
| 研究 | Crossref API（bibliographic 查詢） | https://api.crossref.org/works?query.bibliographic=Taiwan+artificial+intelligence+elementary&filter=from-created-date:2026-01-01,type:journal-article&rows=5 | 200 | 是 | 是（created） | API | 雜訊高：只依相關性排序，「Taiwan」不構成篩選（前 5 筆含印尼、黎巴嫩研究、臺灣大地水準面論文）。不適合作為臺灣篩選器 |
| 研究 | OpenAlex API | https://api.openalex.org/works?filter=institutions.country_code:TW,concepts.id:C19417346,from_publication_date:2026-01-01,default.search:artificial%20intelligence&per-page=5 | 200 | 是 | 是（publication_date） | API（經 proxy，未加 email） | 2026 年至今共 187 筆，可依國別真正篩選。注意 default.search 被轉為全文檢索 → 建議改用 title_and_abstract.search:"artificial intelligence"，以降低雜訊 |
| 研究 | 教育科學研究期刊（臺師大） | https://jories.ntnu.edu.tw/jres/ （目錄：/jres/PaperList.aspx） | 首頁原猜測 jries.ntnu.edu.tw 連線失敗；更正後 200 | 是 | 是（首頁「71(3)九月刊」；目錄頁有卷期年月） | 未見 RSS | 首頁 HTML 未見 DOI。值得追蹤：專刊徵稿「人工智慧應用於教育之成效與影響」（2026/10/15 截稿） |
| 研究 | 教育研究集刊（臺師大教育系） | https://ber.ed.ntnu.edu.tw/issues | 200 | 是 | 是（Volume 72 No.1 2026-03-31，首頁有 72(2)） | 未見 RSS | 有 DOI（10.6910/BER.…），但 DOI 註冊機構為 Airiti，非 Crossref |
| 研究 | 當代教育研究季刊 | http://contemporary.cere.ntnu.edu.tw/ | 200 | 是 | 是（34(3)，2026-09） | 未見 RSS（投稿系統 OJS：ojs.lib.ntnu.edu.tw/index.php/CERQ，未測） | 首頁有 DOI 10.6151/CERQ.202609_34(3).xxxx，Crossref /agency 回傳 Airiti |
| 研究 | 教育研究與發展期刊（國教院） | https://naeraj.naer.edu.tw/wSite/JERD | 301→lp?ctNode=667…，重試 200 | 部分 | 否（落地頁為編委名單，未見最新卷期） | 未見 RSS | 入口：naer.edu.tw/PagePublish?fid=62（200）。最新目錄需人工點選 |
| 研究 | 中等教育季刊（臺師大師培學院） | https://tecs.otecs.ntnu.edu.tw/index.aspx | 301（http→https），重試 200 | 部分 | 只見師培學院公告日期；期刊「各期內容」在子選單 | 未見 RSS | 刊物頁藏在學院網站選單下，無獨立 TOC 網址 |
| 研究 | 課程與教學季刊 | （未找到官網） | 未測 | 否 | — | — | 唯一一次網頁搜尋未找到學會／期刊官網（ISSN 1560-1277，五南印行，全文在 Airiti）。需人工查找 |
| 研究 | 臺灣教育評論月刊 | http://www.ater.org.tw/ | 302→/wordpress/，重試得 301→ater.org.tw/wordpress/（已用完重試次數） | 未確認 | 未確認 | 未確認 | 屬 WordPress，可能有 /feed/，但這次未驗證 |
| 研究 | Crossref container-title 查詢 | https://api.crossref.org/works?query.container-title=Journal+of+Research+in+Education+Sciences&sort=published&order=desc&rows=3 | 200 | 否（結果無關） | — | — | 回傳無關期刊。臺灣期刊 DOI（10.6151、10.6910 等）由 Airiti 註冊（以 api.crossref.org/works/{doi}/agency 確認），Crossref 查不到 |

## 查詢安排

| 頻率 | 來源 |
|---|---|
| 每日 | 教育部即時新聞 RSS、資訊及科技教育司 RSS、國教署即時新聞列表（HTML）、行政院公報開放資料每期 zip（篩教育部與國教署的令與公告）；另見下方「擴充」：行政院、國科會、數位發展部、師培藝教司、學特司 |
| 每週四 | 教育部主管法規查詢系統最新訊息、國家教育研究院最新消息、OpenAlex（`institutions.country_code:TW` 加 `title_and_abstract.search` 與 `from_publication_date`）、教育科學研究期刊、教育研究集刊、當代教育研究季刊目錄 |
| 每月列入「請管理者用瀏覽器處理」 | 教育研究與發展期刊（國教院）、中等教育季刊、課程與教學季刊（華藝）、臺灣教育評論月刊；教育科學研究期刊 AI 專刊出刊時 |

- 不用 Crossref 找臺灣期刊：DOI 多由華藝註冊，Crossref 查詢結果雜。
- 國內外刊物中以臺灣為樣本的研究，國際刊物者列國際段並標 `taiwan_sample`（週報），臺灣刊物者列臺灣段。
- 縣市教育局與學校活動不收（管理者 2026-10-17）。
- 民國日期一律換算為西元 YYYY-MM-DD；以公告或新聞頁日期為首發日，文件印有核定日期且早於公告者依 2026-10-10 管理者規則採核定日並註明。

## 擴充（管理者 2026-10-17：加入 5 個中央機關）

| 類別 | 來源 | 網址 | HTTP 狀態 | 可程式讀取 | 日期是否可見 | RSS/API | 備註 |
|---|---|---|---|---|---|---|---|
| 政策 | 行政院 本院新聞 | https://www.ey.gov.tw/Page/6485009ABEC1CB9C | 200 | 是 | 是（民國年） | RSS：https://www.ey.gov.tw/RSS_Content.aspx?ModuleType=3（50 則，有 pubDate） | 跨部會 AI 教育計畫（例：AI 人才方舟計畫） |
| 政策 | 國科會 新聞資料 | https://www.nstc.gov.tw/folksonomy/list/9aa56881-8df0-4eb6-a5a7-32a2f72826ff?l=ch | 200 | 是 | 是 | RSS：https://www.nstc.gov.tw/nstc/rss/newsdata（30 則） | 人工智慧基本法專頁 https://www.nstc.gov.tw/folksonomy/list/5b1cf154-339b-4ec8-a2d0-6feaf96ca00c?l=ch 為單頁，只看「更新日期」 |
| 政策 | 數位發展部 新聞發布 | https://moda.gov.tw/press/press-releases/372 | 200 | 是 | 是（2026-10-15 格式） | 未見 RSS | `/press/press-releases/`（無編號）回 404，列表頁為 /372；每頁 15 則 |
| 政策 | 教育部師資培育及藝術教育司 即時新聞 | https://depart.moe.edu.tw/ED2600/News.aspx?n=E491D1720010EE05&sms=D4AB88F29491B48F | 302→200 | 是 | 是 | RSS：https://depart.moe.edu.tw/ED2600/Rss_News.aspx?n=E491D1720010EE05（50 則） | 在職教師專業發展、師資培育；電子布告欄 n=AE443212458A3B9E 同格式 |
| 政策 | 教育部學生事務及特殊教育司 即時新聞 | https://depart.moe.edu.tw/ED2800/News.aspx?n=9C2F51A0AD31862F&sms=EA52AE3CDCB7AE20 | 302→200 | 是 | 是 | RSS：https://depart.moe.edu.tw/ED2800/Rss_News.aspx?n=9C2F51A0AD31862F（50 則） | 學生網路安全、深偽、特教 AI；電子布告欄 n=29D1A6CC2883568E 同格式 |

查詢頻率：行政院、師培藝教司、學特司、國科會新聞資料 RSS 每日（皆為小型 XML）；數位發展部列表每日讀第一頁；國科會人工智慧基本法專頁每週四看更新日期。判斷標準不變：只收 AI 素養 A／B、對象為中小學或教育工作者者；一般產業 AI 政策不收。
