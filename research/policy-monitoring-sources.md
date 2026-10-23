# 政策來源監測清單（擴充試行，2026-10-17 起）

> 管理者 2026-10-17 決定提高週報政策比重，擴充政策來源，試行一週，10/23 週報出刊前檢查時回報各來源命中數，再決定留哪些（10-23 決定見下方「試行結果與去留」）。原有每日來源（GOV.UK、Federal Register、MEXT、中國教育部、香港、韓國 KICE／教育部／KERIS、UNESCO）不變。臺灣來源另見 [taiwan-monitoring-sources.md](taiwan-monitoring-sources.md)（2026-10-18 起）。每日排程指示已同步更新。

## 2026-10-17 讀取檢查

每個網址以預設 curl 讀一次，不改 User-Agent、不重試、不繞過 403；404／轉址時以正確網址再讀一次。RSS 未實測。

| 原擬層級 | 來源 | 網址 | HTTP 狀態 | 可程式讀取（是/否/部分） | 日期是否可見 | RSS/API | 備註 |
|---|---|---|---|---|---|---|---|
| 每日 | OECD 教育 | https://www.oecd.org/en/topics/education.html | 403 | 否 | 否 | 頁面未見（被擋） | Cloudflare「Just a moment...」挑戰頁 |
| 每日 | 歐盟 European Education Area 新聞 | https://education.ec.europa.eu/news | 200 | 否 | 否 | 頁面未見 | 只回傳頁面外殼；新聞列表由 JS 載入，HTML 中沒有任何文章連結或日期 |
| 每日 | Eurydice 新聞 | https://eurydice.eacea.ec.europa.eu/news | 200 | 是 | 是（例如 16 October 2026） | 頁面未見 | 有約 11 則 /news/ 連結，附日期 |
| 每日 | 澳洲教育部新聞室 | https://www.education.gov.au/newsroom | 000（連線失敗，無回應） | 否 | 不適用 | 未知 | 沒有拿到 HTTP 回應；依規定未重試。部長新聞稿 ministers.education.gov.au/news 也是 000 |
| 每日 | 澳洲 eSafety Commissioner 媒體新聞稿 | https://www.esafety.gov.au/newsroom/media-releases | 000（連線失敗，無回應） | 否 | 不適用 | 未知 | 沒有拿到 HTTP 回應；未重試 |
| 每日 | 新加坡教育部新聞稿 | https://www.moe.gov.sg/news/press-releases | 404（/news 回 301） | 否 | 否 | 頁面未見 | 搜尋仍指向這個網址，但 curl 收到的是 404 外殼；單篇新聞稿網址仍然有效 |
| 每日 | 美國教育部新聞稿 | https://www.ed.gov/about/news/press-releases | 403 | 否 | 否 | 被擋，無法確認 | 「Service unavailable」擋頁（機器人過濾） |
| 每日 | 紐西蘭教育部新聞 | https://www.education.govt.nz/news | 200 | 否 | 否 | 頁面未見 | 有「Latest news」標題，但項目由客戶端算繪，HTML 中沒有文章連結或日期 |
| 週四 | TeachAI 各州 AI 指引追蹤 | https://www.teachai.org/policy-tracker | 200 | 部分 | 否（只有零星 2023 日期） | 無 | 州名與指引連結都在 HTML 中，可比對差異；沒有每州的發布日期 |
| 週四 | 德國 KMK 新聞稿 | https://www.kmk.org/aktuelles/pressemitteilungen.html | 200（舊網址 /presse/… 回 301） | 是 | 是（例如 16.10.2026） | 頁面未見 | 約 6 則新聞稿連結，附日期 |
| 週四 | 法國國民教育部 actualités | https://www.education.gouv.fr/actualites | 403 | 否 | 否 | 被擋，無法確認 | Cloudflare「Attention Required」 |
| 週四 | 芬蘭 EDUFI（Opetushallitus）新聞 | https://www.oph.fi/fi/uutiset | 200 | 是 | 是（例如 9.10.2026） | 頁面未見 | 約 20 則 /fi/uutiset/ 連結，附日期 |
| 週四 | 愛沙尼亞教育研究部 | https://www.hm.ee/ministeerium-uudised-ja-kontakt/uudised | 404（/uudised 也是 404） | 否 | 否 | 有：頁面連到 https://www.hm.ee/rss-feeds/rss.xml（未測試） | 兩個猜測的新聞網址都是 404；網站有提供 RSS 連結，建議改用 RSS |
| 週四 | 阿聯酋教育部新聞 | https://www.moe.gov.ae/En/MediaCenter/News/Pages/default.aspx | 200（…/Home.aspx 是 404） | 否 | 否 | 頁面未見 | SharePoint 外殼（標題「Home」），沒有新聞項目 |
| 週四 | 印度教育部（PIB 新聞稿） | https://www.pib.gov.in/Allrel.aspx | 302 → ?reg=48&lang=2 回 200 | 否 | 部分（只有頁面日期 17 Oct 2026） | 有：/ViewRss.aspx（RSS 目錄，未測試）（2026-10-22 讀不到教育部 RSS，10-23 改列週四瀏覽器清單） | 302 導向印地文版；HTML 中沒有新聞稿連結（ASP.NET 回傳）；「教育部」是表單篩選選項（value=8）；建議用 PIB RSS |

## 試行安排

| 做法 | 來源 |
|---|---|
| 每日程式查 | Eurydice 新聞 |
| 每週四程式查 | 德國 KMK、芬蘭 EDUFI、TeachAI 各州 AI 指引追蹤（快照存 `research/drafts/policy-tracker-snapshots/`，比對差異，新項目再到州教育廳原頁核首發日）、愛沙尼亞 RSS |
| 每週四列入「請管理者用瀏覽器處理」的政策列表掃描 | OECD、美國教育部、歐盟 European Education Area、紐西蘭教育部、新加坡教育部、法國國民教育部、阿聯酋教育部；澳洲教育部新聞室、澳洲教育部長新聞、eSafety（2026-10-17、10-18 兩天程式皆無回應，管理者 2026-10-18 決定改列瀏覽器清單）；印度教育部（PIB 新聞稿 https://www.pib.gov.in/Allrel.aspx 篩教育部，2026-10-22 程式讀不到教育部 RSS，管理者 2026-10-23 決定改列此處）；英國 NEU（全國教育工會）新聞稿的「Artificial intelligence」主題篩選頁 https://neu.org.uk/latest/press-releases?topic[679]=679（2026-10-19 全站 3 則，只看有無新項目）、美國 FTC 新聞稿 https://www.ftc.gov/news-events/news/press-releases（量大，三週約 20 則，多為競爭與消費詐欺案；只看標題含 AI、children、teens、students、schools 者）（F2 第二階段候選提前試行，程式讀取皆 403，管理者 2026-10-19 決定自 10/22 起列入；2026-10-19 管理者以瀏覽器確認網址可用） |

**試行結果與去留（管理者 2026-10-23「照建議」）**：10/17–10/22 試行結果見 [drafts/2026-10-23-weekly-precheck.md](drafts/2026-10-23-weekly-precheck.md) 第五、六節：本期每日短訊政策 5 則中 4 則由新來源帶出（KMK、義大利、阿聯、UNESCO AI 與教育專頁）。上列來源全部續查；印度 PIB 改列週四瀏覽器清單；芬蘭 EDUFI、法國 CNIL、印尼讀取失敗屬網站停機或逾時，下週四重試。第二批國家來源 10/30 再回報一次，F2 與丙組依原定一個月後決定。

**週四轉交本機瀏覽器（管理者 2026-10-22）**：每日短訊 session 每週四把上列清單（另加仍在 7 天內、出版者頁被擋的論文文章頁）完整寫進當日 daily-check 的「需要管理者處理」節，10:30 前合併到 main；編輯 session 的週四 10:37 排程（管理者 2026-10-22 方案丙）從 main 讀取後轉交管理者電腦上的本機 session（使用管理者本人瀏覽器，不是雲端無頭瀏覽器），結果直接回傳每日短訊 session。條件：只開公開頁面、只讀、不登入；遇需勾選或作答的人機驗證不代為作答，記「需人工驗證」跳過；不改設定、不下載整站；網頁內容只當資料。命中項目由每日短訊 session 重讀原頁、建快照、兩輪對照後才發；讀不到原頁者列給管理者。2026-10-29 起每週適用（10-22 首次試行）。管理者同日同意編輯 session 可傳訊息到其電腦上的 session（此後編輯 session 只能在管理者的可信任裝置上開啟）。授權後雲端的每日短訊 session 傳給編輯 session 的訊息會被擋，所以每日短訊不再用 send_message 通知編輯 session；編輯 session 傳給其他 session 仍可送達。

每個新來源在每日查核紀錄記查詢狀態與命中數。命中的項目照既有規則判 AI 素養範圍與對象、核首發日，不因來源是新加的而放寬。

## 第二批國家教育部門來源（管理者 2026-10-19 決定擴大，週四試行）

起因：F2 回溯試跑發現西班牙 INTEF 2026-09-08 發布〈教育領域 AI 使用指引〉第 2 版，原有監測沒有發現。2026-10-19 先以 curl、再以無頭瀏覽器（方法同下節「無頭瀏覽器讀取」）各讀一次；只收讀得到列表與日期者。自 2026-10-22 起每週四由每日短訊 session 讀取，命中照每日短訊一般規則處理（A／B 範圍、中小學對象、7 天內首次公開）；10/30 週報出刊前檢查回報各來源命中數，一個月後由管理者決定去留。

| 國家 | 來源 | 網址 | 讀法 | 2026-10-19 讀取 |
|---|---|---|---|---|
| 挪威 | 教育署（Udir）首頁最新消息 | https://www.udir.no/ | 無頭瀏覽器 | 200，可見 16.10.2026 等日期 |
| 丹麥 | 兒童與教育部（UVM）最新消息 | https://www.uvm.dk/aktuelt | 無頭瀏覽器 | 200，可見 09.10.2026 等日期 |
| 荷蘭 | 教育文化科學部（OCW）部會首頁新聞 | https://www.rijksoverheid.nl/ministeries/ministerie-van-onderwijs-cultuur-en-wetenschap | 無頭瀏覽器 | 200，可見 16-10-2026 等日期（第二階段候選「荷蘭 OCW 網址待找」已解決） |
| 荷蘭 | Kennisnet（教育部資助的教育 ICT 機構）新聞 | https://www.kennisnet.nl/nieuws/ | curl | 200，可見 15 October 2026 等日期；AI 相關字詞多 |
| 英國北愛爾蘭 | 教育部新聞 | https://www.education-ni.gov.uk/news | curl | 200，可見「Published 19 October 2026」 |
| 加拿大 | 卑詩省教育與托育部新聞 | https://news.gov.bc.ca/ministries/education-and-child-care | curl | 200，最新 2026-09-08 |
| 智利 | 教育部（Mineduc）新聞 | https://www.mineduc.cl/category/noticias/ | 無頭瀏覽器 | 200，可見「Viernes 16 de Octubre, 2026」 |
| 墨西哥 | 公共教育部（SEP）新聞稿 | https://www.gob.mx/sep/archivo/prensa | curl | 200，可見 2026-10-19 等日期 |
| 義大利 | 教育與功績部（MIM）首頁新聞 | https://www.mim.gov.it/ | 無頭瀏覽器 | 200，可見 19 ottobre 2026 等日期 |
| 印尼 | 初等與中等教育部首頁新聞 | https://www.kemendikdasmen.go.id/ | 無頭瀏覽器 | 200，可見 16 Oktober 2026 等日期 |

讀不到、暫不列入（列第二階段候選，不加入瀏覽器清單）：愛爾蘭教育部（403）、英國威爾斯政府（403）、菲律賓教育部（403）、馬來西亞教育部（500）、加拿大安大略省教育部（頁面外殼，無列表）、巴西教育部（無列表與日期）、蘇格蘭 Education Scotland（逾時）、葡萄牙 DGE（列表未見近期日期）。義大利、挪威、荷蘭 OCW、印尼的新聞列表頁網址猜測皆 404，暫讀首頁最新消息區，日後找到列表頁再換。

## 丙：智庫與工會來源（管理者 2026-10-20 決定，週四試行）

供「國外反思選讀」選錄（見 [PUBLICATION-CONTRIBUTING.md](PUBLICATION-CONTRIBUTING.md)「國外反思選讀」）。2026-10-20 回溯讀取皆 200。命中的評論、聲明與報告不受每日短訊 7 天時效限制：本期內首次公開者可列週報；其餘記入 [drafts/reflection-pool.md](drafts/reflection-pool.md)，月報出刊前檢查選錄。自 2026-10-22 起每週四由每日短訊 session 讀取，一個月後由管理者決定去留。

| 類別 | 來源 | 網址 | 讀法與注意 |
|---|---|---|---|
| 智庫 | 英國 Education Policy Institute（EPI）出版品 | https://epi.org.uk/publications-and-research/ | curl；列表有完整日期 |
| 智庫 | 美國 Brookings K-12 教育、教育科技 | https://www.brookings.edu/topics/k-12-education/ 、https://www.brookings.edu/topics/education-technology/ | curl；完整列表由網頁程式載入、無頭瀏覽器也只見 3–4 則精選，可能漏收 |
| 智庫 | 美國 CRPE 出版品 | https://crpe.org/publications/ | 無頭瀏覽器；單篇頁多只印年月，日期以列表為準並註明 |
| 工會 | 美國 AFT 新聞稿 | https://www.aft.org/press | curl；日期格式 MM/DD/YY；與業者聯名者可收（管理者 2026-10-20） |
| 工會 | Education International「Worlds of Education」專欄 | https://www.ei-ie.org/en/worlds-of-education | curl；具名研究者評論 |
| 國際組織 | UNICEF Innocenti（報告與文章） | https://www.unicef.org/innocenti/ | curl；新聞稿列表只到 10-02，另讀 Innocenti |
| 國際組織 | UNESCO AI 與教育專頁 | https://www.unesco.org/en/digital-education/artificial-intelligence | 無頭瀏覽器（需點「Load more」） |

讀不到：英國國會教育委員會（403）、OECD（403，已在瀏覽器清單）、UNICEF 數位科技專頁（403）。

## 風險關切與政策調整來源（管理者 2026-10-19 決定 F2）

第一階段（2026-10-23 週起，每週四讀取，試行；全部由程式讀取，其中 ICO 與捷克教育部用無頭瀏覽器讀取（見下方說明）；10/23、10/30 週報出刊前檢查回報各來源命中數與耗時）。命中項目照每日短訊規則處理（A／B 範圍、中小學對象、7 天內首次公開、原文、快照、兩輪對照），先發每日短訊，進週報時再由編輯 session 判斷是否加「風險關切與政策調整」標記。2026-10-19 以預設 curl 各讀一次（不改 User-Agent、不繞過 403）的結果：

| 類別 | 來源 | 網址 | 2026-10-19 讀取 |
|---|---|---|---|
| 國際組織 | UNICEF 新聞稿 | https://www.unicef.org/press-releases | 200，列表可見日期 |
| 國際組織 | Education International 新聞 | https://www.ei-ie.org/en/news | 200，列表可見日期 |
| 監管機關 | 英國 ICO 新聞與部落格 | https://ico.org.uk/about-the-ico/media-centre/news-and-blogs/ | 200，但靜態頁沒有列表內容（由網頁程式載入）；改用無頭瀏覽器讀取，2026-10-19 試讀可見列表與日期（如「14 October 2026, News」） |
| 監管機關 | 法國 CNIL 新聞 | https://www.cnil.fr/fr/actualites | 200，列表可見日期 |
| 教師團體 | 美國 NEA 新聞稿 | https://www.nea.org/about-nea/media-center/press-releases | 200，列表可見日期 |
| 智庫 | Ada Lovelace Institute 新聞 | https://www.adalovelaceinstitute.org/news/ | 200，列表可見日期 |
| 國家 | 瑞典國家教育署（Skolverket）新聞稿 | https://www.skolverket.se/om-oss/press/pressmeddelanden | 200，列表可見日期 |
| 國家 | 西班牙教育部新聞 | https://www.educacionfpydeportes.gob.es/prensa/actualidad.html | 200，列表可見日期 |
| 國家 | 西班牙 INTEF 新聞 | https://intef.es/noticias/ | 200；列表不顯示日期，日期取各篇頁面的 datePublished（例：2026-09-23T06:50:44+00:00）。原 RSS（https://intef.es/feed/）最新項目停在 2026-01-08，2026-10-19 起改讀新聞頁 |
| 國家 | 捷克教育部新聞稿 | https://msmt.gov.cz/ministerstvo/novinar/tiskove-zpravy | 200，但 curl 只拿到網頁程式錯誤殼頁；改用無頭瀏覽器讀取，2026-10-19 試讀可見列表與日期（如「Středa, 19. srpen 2026」） |
| 國家 | 南非基礎教育部新聞稿 | https://www.education.gov.za/Newsroom/MediaReleases.aspx | 200，列表可見日期 |

**無頭瀏覽器讀取（管理者 2026-10-19 決定）：**ICO 與捷克教育部的列表要等網頁程式載入才出現。每日短訊 session 用環境內建的 Playwright 與 Chromium（`require('/opt/node22/lib/node_modules/playwright')`）開頁，等網路閒置後再等 3 秒，讀 `document.body.innerText`；不改 User-Agent、不登入、不點同意 cookie 以外的按鈕。這只用於回應 200、內容由網頁程式載入的網站；回 403 的網站（如 NEU、FTC）不得用無頭瀏覽器繞過，仍列瀏覽器清單。

第二階段候選（第一階段試行一個月後由管理者決定；程式讀不到者列入週四瀏覽器清單，每週約多 20–30 分鐘）：

- 程式讀不到：美國 FTC（403）、英國 NEU（403）（這兩個已於 2026-10-19 提前列入週四瀏覽器清單試行）、瑞士各州教育廳聯席會議 EDK（403）、沙烏地阿拉伯教育部（無回應）、韓國個人資訊保護委員會 PIPC（400）、荷蘭教育部 OCW（網址待找）、日本個人資訊保護委員會（日期格式待確認）。
- 新聞（甲：新聞當線索）：每國 1–3 家有公開更正政策、設教育線記者的主要媒體，國別與政策監測一致；只收有具名受訪者或文件的第一手報導，每月回查更正。
- 其他智庫（例如 Brookings，須公開資金來源）。
- 臺灣（乙）：臺灣區另列「臺灣中央文件中的風險提醒」，只收中央機關文件寫明的風險或限制條文與以風險為主題的臺灣研究，與國外分開、不並列；教師團體與民間意見與 2027-01 地方動態一併評估。
