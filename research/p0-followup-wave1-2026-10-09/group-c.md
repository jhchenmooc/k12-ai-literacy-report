# P0 Wave 1 C 組：C05／C08 補核

基準 main `ade85459b2f2809787866bfca258190c0a007aa9`；dispatch UTC 2026-10-09 14:08:42，開始 14:09:27。僅補三個既有 DOI，不擴張樣本。精確查詢、時間、讀取範圍及失敗網址見 `group-c.json`。總搜尋命中未知，維持 null；三樣本仍 partial／items_screened，沒有完整正式全文核讀。

## C05：首發與 PDF v2 仍未知，補得作者稿方法及新差異

[ISLS long paper](https://repository.isls.org/handle/1/11843) DOI `10.22318/cscl2025.817482`，既有 `KB-2025-0006`。官方索引仍只列 2025 與 `CSCL2025_196-204_v2.pdf`；full metadata 與正式 PDF 受阻，不能用 filename、upload 或更新日代替 first-public。

新找到 [作者網站](https://shellyyin96.github.io/) 直接連結的 [10 頁作者 PDF](https://shellyyin96.github.io/paper/CSCL25_RAI.pdf)，工具辨識文件名為 pre-print。已讀招募、方法、樣本表及選定結果段；原稿為教師問卷、相關及迴歸。其區域性招募和人口分布不能支持全國代表性，也不支持學生學習因果。原稿摘要／招募 N=98，但情境分組列 23＋22＋23=68；不補成 98，不推算失訪原因。正式 ISLS 196–204 為九頁，而作者檔十頁，未逐版比對，不視為正式 v2。

作者網站「Mar 2025 accepted」是接受訊息；當前頁面不能證明 PDF 當時已公開或同一版本，首發日仍 unknown。獨立核查應先釐清 98／68 及原稿與正式 v2 差異，並取得原始公開／修訂歷程。

[ISLS Poster](https://repository.isls.org/handle/1/11944) DOI `10.22318/cscl2025.107218`，既有 `KB-2025-0007`。原文／full metadata 受阻；只有 indexed 官方摘要與 2025 issue 年。維持首發 unknown、work-in-progress、參與者學段／方法 unknown；不得拿預期成果當已完成教學效果。

## C08：較早預印本關係重核；合法正式版典藏仍受阻

DOI `10.1145/3702652.3744217`，既有 `KB-2025-0008`。直接 ACM 頁受阻，但 indexed 正式出版史仍是 2025-08-02。新找到 [University of Michigan 合法典藏 PDF](https://deepblue.lib.umich.edu/bitstream/handle/2027.42/198869/3702652.3744217.pdf?isAllowed=y&sequence=1)，索引首頁顯示相同 DOI、ACM ICER V.1 引用格式、16 頁及 CC BY 4.0；直接下載 403，不能宣称已完整核讀正式版。

[版本固定的 arXiv v1](https://arxiv.org/abs/2503.00079v1) 重核題名／作者與 submission timestamp 2025-02-27 23:32:03 UTC。[目前版本頁](https://arxiv.org/abs/2503.00079) 明列 related ACM DOI；注意 v1 固定頁本身沒有 related DOI。這支持同作品較早版本關係，不能將不同版本去重為內容完全相同；時戳為 arXiv submission，不宣稱精確 public-availability 瞬間或全球更早來源已窮盡。

已讀 [arXiv v3 方法及限制段](https://arxiv.org/html/2503.00079v3)：integrative review、K–12／大學混合，124 是文獻数；EC1 排除教師素養，Section 6 明言不評估介入有效性。v1 metadata 為29頁、v3為25頁，正式版16頁，仍須正式版逐段差異核查；不能将預印本段落標成正式全文已讀。

主表 2025-08-02 的 first_publication 只能指 ACM manifestation。任何同作品 first-public 或新聞閘門均必須保留更早 2/27 警示。整合者決定是否新增保守版本關係；本組不修改 CSV。

## 交給獨立核查的命題

1. C05 作者稿情境分組 68 與摘要 98 的不一致在正式 v2 是否仍存在？不確定時不採效果、比例或因果敘述。
2. C05 官方 first-public／v2 更動歷程可否證實？接受、會議、deposit、更新不能替代。
3. C08 2/27 v1 submission 與 current related ACM DOI 能否再次獨立確認？版本同作品關係與正式 manifestation 日期必須分離。
4. C08 正式版是否同樣排除教師素養與介入有效性評估？本波只有預印本相關段落直接可讀，正式版仍 partial。

沒有修改正式表、索引、handoff、候選、出版檔或 git。九筆 hold／正式新期別零／不自動發刊维持。
