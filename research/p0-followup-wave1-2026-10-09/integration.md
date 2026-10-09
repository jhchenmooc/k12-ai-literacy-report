# P0 第一波補核：中央裁決

基準 main `ade85459b2f2809787866bfca258190c0a007aa9`，PR #90 已合併；[Run 37940711049](https://github.com/jhchenmooc/k12-ai-literacy-report/actions/runs/37940711049) verify/deploy 成功，開工時無 open PR。另建乾淨 checkout，沒有覆蓋上一批本機工作檔。三組只寫各自暫存，正式三表及候選／manifest 雜湊由中央整合者核對。

## 補核結果及正式資料用途

本波六來源、九個既有逐篇樣本／DOI，沒有新發現 DOI。原本未入主表的 C07 在補核後可新增歷史書目；新增主表不是新發現論文。搜尋總命中未知，所有批次保留 partial，沒有將排除或新增零筆當零命中。

- **J11 101041**：整合者直接讀作者 Weipeng Shen 上傳、明示 CC BY-NC-ND 的出版格式原文，footer 為 Available online 2026-04-02；主表既有紀錄可補出版社版本日期，以 first_publication 索引，並非同作品全球最早公開認證。Grades 7–9、58校追蹤2573與各波大池不同，不採網絡因果或教學效果外推。仍 bibliographic_checked。
- **C07 3729069**：作者機構原始登錄確認題名、DOI、ACM V.1，作者上傳方法段確認現職primary/secondary教師。僅新增 historical bibliography，首發 unknown、2025 issue_year。單組自評及教師感受不等於学生測驗或因果效果；正式出版社全文仍未完整核讀。整合者 Academia 直接開啟失敗，沒有將第一輪可讀狀態當每次都可重現。
- **J10 108779**：Aalto 的10/27確實是 Early online 欄，與作者出版格式稿footer10/9衝突，不能將其簡化為無關引用匯出。保留unknown及學段排除，不新增主表。
- **C05 817482**：作者稿自稱preprint，N98與情境分組合計68不一致；作者10頁與正式9頁不能視為相同版本。不能自行補缺失值或將此差異定為正式論文錯誤；正式v2及日期歷程仍待核。107218 poster原文方法及首發也unknown。
- **C08 3744217**：正式ACM版本8/2不改。arXiv v1的2/27是submission時戳，**不是已證實的精確公開可讀日期**；修正上一批將其直接稱公開日的過度確定措辭。current metadata 的related DOI支持同作品不同版本，較早預印本仍否定把ACM正式日當全球首次公開。混合學段、124文獻及不評估介入有效性的說明，只依實際讀到的預印本段落歸屬，不冒認正式版全文一致。
- **C06**：官方poster摘要與BOF節目可讀；教師回饋與討論不能作學生成效證據。publisher日期／poster原始instrument受阻，繼續暫存。

主要證據URL／locators／存取失敗見各組JSON。各作者原文只閱讀選定段落；沒有任何樣本因此升 full_text_checked 或 content_checked。公共repo僅保存書目和短转述，不儲存未授權全文或兒少個資。

## 計時與品質

| 組別 | 起始可觀測UTC | 來源查核結束UTC | 檔案交付UTC | 起始觀測至交付 |
|---|---|---|---|---:|
| A J10/J11 | 14:09:11 | 14:11:08 | 14:13:23 | 252秒 |
| B C06/C07 | 14:09:47 | 14:11:23 | 14:14:03 | 256秒 |
| C C05/C08 | 14:09:27 | 14:12:19 | 14:13:16 | 229秒 |

共用dispatch參考14:08:42至最後交付14:14:03為321秒，包含依序dispatch與等候；B初次repo閱讀早於第一clock、精確開始unknown，不能宣稱三組全部生命週期都已精確測得。B查詢時間未逐筆留存，null與觀測窗明列。三組起始clock至最早交付重疊209秒，可證平行執行；組耗時相加737秒不是實測串行基準，不報加速倍數。第二輪與整合另記機器資料，不混入搜尋耗時。

九DOI組間重複0，四筆重訪既有主表；五筆先前僅audit/staging。C07是由舊線索補核後首次入庫；J11是既有日期補充。原文存取改善來自合法作者稿選定段落，仍無完整正式全文核讀。不能把知識庫來源ID覆蓋當全文普查。

## 第二輪、出版安全及下一步

未參與第一輪的核查者只收到DOI及待核命題，不讀本波組別結論；以實際獨立來源紀錄 [second-round.json](second-round.json)／[second-round.md](second-round.md)為準。來源衝突及高風險效果不放行；兩輪同模型AI並非真人獨立審稿。

中央獨占匯入、DOI對帳、CSV round-trip／安全衍生匯出、既有索引重建及v1.6 regression。Windows乾淨clone的index/YEARS換行轉CRLF造成基準測試193/195；只恢復衍生檔LF，不改測試或出版程式。整合後195/195既有tests、知識庫／年度索引及出版驗證通過，records32、relations74、runs25。第二輪來源核查14:14:09–14:18:49為280秒，六笔均partial；選定段落核查並非全文認證。中央資料寫入UTC14:19:52；正式表雜湊在搜尋期间未變，候選／manifest也未改。

九候選hold/source_checked=false與manifest零期別保持不變。單一整合PR最新HEAD verify成功才能合併，合併後核main verify/deploy；GitHub綠燈不等於來源認證。第一波完成後重查usage，再接第二波三組J15–J17／J18–J19+C09／C10–C12；不擴充為六個同時執行者，不啟動P1/P2或自動發刊。
