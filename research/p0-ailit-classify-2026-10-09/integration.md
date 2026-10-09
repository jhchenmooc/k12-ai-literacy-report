# 依《臺灣中小學教師與學生 AI 素養框架》補判 A／B／C（2026-10-09）

> **性質：人工搜尋輔助的範圍判斷，不是認證。** 判讀子代理與整合者為同一模型，**不算獨立審閱**。準則：`research/ai-literacy-scope-criteria.md` v0.2（#131）。知識庫三表結構不變；本資料夾只記判讀結果。所有請求均未帶 email 或 mailto。

## 第 2 件：依作者檢索 100 篇套用準則

- **輸入（共 100 篇）：**
  - 2026 全年依作者檢索 60 篇：新篩 43 篇，加上沿用 #119 判讀的 17 篇。
  - V 級依作者檢索 40 篇。
- **判讀明細：** [step2-scholar-hits.md](step2-scholar-hits.md)、[json](step2-scholar-hits.json)。每筆都有 `ai_lit_class`、`ai_lit_dims`、`ai_lit_note` 三欄。
- **子代理結果：**
  - 類別：A 41、B 23、C 25、不明 11。
  - 建議：入庫 39（含已在庫者）、待判 19、排除 42。
  - 建議改變的有 38 筆，其中 9 筆原本沒有個別決定。

### 整合者調整（待管理者決定）

子代理有 4 篇建議入庫，整合者改列待判，理由是學段規則沒有變：

| DOI | 子代理 | 整合者 | 理由 |
|---|---|---|---|
| `10.1016/j.caeai.2026.100551` | 入庫 | 待判 | 管理者 2026-10-09 已決定待判（只寫 school education） |
| `10.1016/j.caeai.2026.100555` | 入庫 | 待判 | 管理者已決定待判（中學＋大學，未寫主要對象） |
| `10.1007/978-3-032-26816-7_8` | 入庫 | 待判 | 只寫 general education／school context，比照「只寫 schools 者待判」 |
| `10.1016/j.caeo.2026.100422` | 入庫 | 待判 | 專家情境涵蓋小學到高教，未寫主要對象 |

另外兩篇的處理：
- `10.48550/arxiv.2604.05702` 找到正式版 `10.1007/978-3-032-29763-1_38`（AIED 2026，LNCS，C01）。正式版沒有摘要，學段（九年級）依同題 arXiv 摘要判斷，入庫時用正式版 DOI。
- `10.48550/arxiv.2601.06101` 的正式版已在庫（KB-2026-0013），不新增紀錄。

### 入庫 14 篇（管理者 2026-10-09 同意；KB-2026-0174～0187）

全部 `discovered_unverified`、首發日 unknown、`year_basis=issue_year`；題名與年份取自 Crossref。摘要都沒有明寫國名，所以不記國別。`10.1177/07356331261479569` 另記 `has_population` TEACHER_ED。管理者同時同意：上表 4 篇維持待判；C 類 2 筆與不明 2 筆保留在庫不刪（C 類不進刊物）；42 筆邊界案例另行逐筆呈報。

| DOI | 出處 | 代碼 | 類別 | A／B | 面向 |
|---|---|---|---|---|---|
| `10.3390/educsci16030384` | Education Sciences | J47 | K2 | B | S-LRN、T-TEA |
| `10.1002/jcal.70245` | Journal of Computer Assisted Learning | J06 | K2 | B | S-LRN |
| `10.1080/01443410.2026.2668683` | Educational Psychology | — | K2 | A | S-LRN、S-ETH |
| `10.1111/ijal.70256` | International Journal of Applied Linguistics | — | K2 | B | S-LRN、S-BAS |
| `10.3390/educsci16060972` | Education Sciences | J47 | K2 | B | S-LRN |
| `10.1080/09588221.2026.2640087` | Computer Assisted Language Learning | — | K2 | B | S-LRN |
| `10.1145/3785022.3785094` | LAK26 | C03 | K2 | B（邊界，可判 A） | S-LRN |
| `10.1145/3773077.3812151` | IDC 2026 | C14 | K2 | B（邊界：線上設計研究，4–8 歲） | S-LRN |
| `10.1016/j.compedu.2026.105707` | Computers & Education | J01 | K2 | B | T-TEA、S-LRN |
| `10.1080/10494820.2026.2685798` | Interactive Learning Environments | J40 | K2 | B | S-LRN |
| `10.1111/ijal.70320` | International Journal of Applied Linguistics | — | K2 | B | S-LRN |
| `10.1111/bjet.70083` | British Journal of Educational Technology | J04 | K2 | B | S-LRN |
| `10.1177/07356331261479569` | Journal of Educational Computing Research | J36 | K4（師培） | A | T-ETH、T-TEA |
| `10.1007/978-3-032-29763-1_38` | AIED 2026 | C01 | K2 | B | S-LRN |

## 第 3 件：知識庫既有 269 筆補判

- **判讀明細：** [part1](step3-kb-part1.md)、[part2](step3-kb-part2.md)、[part3](step3-kb-part3.md) 與對應 JSON。
- **類別：** A 256、B 9、C 2、不明 2；邊界案例 42 筆。
- **面向**（一筆可多選）：S-BAS 127、S-ETH 85、T-ETH 68、T-TEA 59、T-PD 47、T-BAS 32、S-LRN 31、S-SYS 30。
- **判斷依據：** 摘要 176、官方頁 28、只看題名 65（無摘要或頁面讀不到）。
- **C（2）：**
  - KB-2026-0004：UNESCO IITE 的 TVET 綠色技能系列，AI 只出現在一門課名。
  - KB-2026-0007：UNESCO 談墨西哥學校螢幕規範，屬一般數位素養，不涉及 AI。
- **不明（2）：**
  - KB-2026-0113：沒有摘要，題名不足以判斷。
  - KB-2026-0163：職前教師資料能動性量表，摘要沒有提到 AI。
- **B（9）：** KB-2023-0005、KB-2023-0008、KB-2024-0004、KB-2025-0002、KB-2025-0011、KB-2025-0048、KB-2025-0063、KB-2026-0015、KB-2026-0162。
- 知識庫紀錄不刪不改。C 類依準則不進刊物，是否保留在庫由管理者決定。
