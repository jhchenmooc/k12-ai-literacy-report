# 政策來源監測清單（擴充試行，2026-10-17 起）

> 管理者 2026-10-17 決定提高週報政策比重，擴充政策來源，試行一週，10/23 週報出刊前檢查時回報各來源命中數，再決定留哪些。原有每日來源（GOV.UK、Federal Register、MEXT、中國教育部、香港、韓國 KICE／教育部／KERIS、UNESCO）不變。臺灣來源另見 [taiwan-monitoring-sources.md](taiwan-monitoring-sources.md)（2026-10-18 起）。每日排程指示已同步更新。

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
| 週四 | 印度教育部（PIB 新聞稿） | https://www.pib.gov.in/Allrel.aspx | 302 → ?reg=48&lang=2 回 200 | 否 | 部分（只有頁面日期 17 Oct 2026） | 有：/ViewRss.aspx（RSS 目錄，未測試） | 302 導向印地文版；HTML 中沒有新聞稿連結（ASP.NET 回傳）；「教育部」是表單篩選選項（value=8）；建議用 PIB RSS |

## 試行安排

| 做法 | 來源 |
|---|---|
| 每日程式查 | Eurydice 新聞 |
| 每週四程式查 | 德國 KMK、芬蘭 EDUFI、TeachAI 各州 AI 指引追蹤（快照存 `research/drafts/policy-tracker-snapshots/`，比對差異，新項目再到州教育廳原頁核首發日）、愛沙尼亞 RSS、印度 PIB RSS（未實測，讀不到就移到下一列） |
| 每週四列入「請管理者用瀏覽器處理」的政策列表掃描 | OECD、美國教育部、歐盟 European Education Area、紐西蘭教育部、新加坡教育部、法國國民教育部、阿聯酋教育部；澳洲教育部新聞室、澳洲教育部長新聞、eSafety（2026-10-17、10-18 兩天程式皆無回應，管理者 2026-10-18 決定改列瀏覽器清單）；英國 ICO 新聞與部落格、捷克教育部新聞稿（F2 來源；2026-10-19 試跑靜態頁沒有列表內容，管理者 2026-10-19 決定改列瀏覽器清單） |

每個新來源在每日查核紀錄記查詢狀態與命中數。命中的項目照既有規則判 AI 素養範圍與對象、核首發日，不因來源是新加的而放寬。

## 風險關切與政策調整來源（管理者 2026-10-19 決定 F2）

第一階段（2026-10-23 週起，每週四讀取，試行；表中 ICO 與捷克教育部由管理者以瀏覽器瀏覽，其餘由程式讀取；10/23、10/30 週報出刊前檢查回報各來源命中數與耗時）。命中項目照每日短訊規則處理（A／B 範圍、中小學對象、7 天內首次公開、原文、快照、兩輪對照），先發每日短訊，進週報時再由編輯 session 判斷是否加「風險關切與政策調整」標記。2026-10-19 以預設 curl 各讀一次（不改 User-Agent、不繞過 403）的結果：

| 類別 | 來源 | 網址 | 2026-10-19 讀取 |
|---|---|---|---|
| 國際組織 | UNICEF 新聞稿 | https://www.unicef.org/press-releases | 200，列表可見日期 |
| 國際組織 | Education International 新聞 | https://www.ei-ie.org/en/news | 200，列表可見日期 |
| 監管機關 | 英國 ICO 新聞與部落格 | https://ico.org.uk/about-the-ico/media-centre/news-and-blogs/ | 200，但靜態頁沒有列表內容（由網頁程式載入）；2026-10-19 起改由管理者每週四以瀏覽器瀏覽 |
| 監管機關 | 法國 CNIL 新聞 | https://www.cnil.fr/fr/actualites | 200，列表可見日期 |
| 教師團體 | 美國 NEA 新聞稿 | https://www.nea.org/about-nea/media-center/press-releases | 200，列表可見日期 |
| 智庫 | Ada Lovelace Institute 新聞 | https://www.adalovelaceinstitute.org/news/ | 200，列表可見日期 |
| 國家 | 瑞典國家教育署（Skolverket）新聞稿 | https://www.skolverket.se/om-oss/press/pressmeddelanden | 200，列表可見日期 |
| 國家 | 西班牙教育部新聞 | https://www.educacionfpydeportes.gob.es/prensa/actualidad.html | 200，列表可見日期 |
| 國家 | 西班牙 INTEF 新聞 | https://intef.es/noticias/ | 200；列表不顯示日期，日期取各篇頁面的 datePublished（例：2026-09-23T06:50:44+00:00）。原 RSS（https://intef.es/feed/）最新項目停在 2026-01-08，2026-10-19 起改讀新聞頁 |
| 國家 | 捷克教育部新聞稿 | https://msmt.gov.cz/ministerstvo/novinar/tiskove-zpravy | 200，但回傳網頁程式錯誤殼頁，沒有列表；2026-10-19 起改由管理者每週四以瀏覽器瀏覽 |
| 國家 | 南非基礎教育部新聞稿 | https://www.education.gov.za/Newsroom/MediaReleases.aspx | 200，列表可見日期 |

第二階段候選（第一階段試行一個月後由管理者決定；程式讀不到者列入週四瀏覽器清單，每週約多 20–30 分鐘）：

- 程式讀不到：美國 FTC（403）、英國 NEU（403）、瑞士各州教育廳聯席會議 EDK（403）、沙烏地阿拉伯教育部（無回應）、韓國個人資訊保護委員會 PIPC（400）、荷蘭教育部 OCW（網址待找）、日本個人資訊保護委員會（日期格式待確認）。
- 新聞（甲：新聞當線索）：每國 1–3 家有公開更正政策、設教育線記者的主要媒體，國別與政策監測一致；只收有具名受訪者或文件的第一手報導，每月回查更正。
- 其他智庫（例如 Brookings，須公開資金來源）。
- 臺灣（乙）：臺灣區另列「臺灣中央文件中的風險提醒」，只收中央機關文件寫明的風險或限制條文與以風險為主題的臺灣研究，與國外分開、不並列；教師團體與民間意見與 2027-01 地方動態一併評估。
