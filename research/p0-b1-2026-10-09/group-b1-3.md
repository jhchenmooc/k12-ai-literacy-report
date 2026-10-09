# B1-3 組（會議組）P0 文獻搜尋紀錄

- 範圍：C13 CHI、C14 IDC、C15 FAccT、C16 CSCW、C17 AERA、C18 ICALT、C20 SITE Interactive；出版 2025-01-01～2026-10-09
- 起訖 UTC：2026-10-09T16:58:35Z ～ 2026-10-09T17:19:40Z
- 查詢 117 筆（含定位、列舉、失敗與重試）；items 135 筆。結構化資料見 group-b1-3.json。

## 1. 會議定位結果

| 會議 | 狀態 | 定位方式 | DOI 前綴／ISBN |
|---|---|---|---|
| C13 ACM CHI 2025／2026（主論文集＋Extended Abstracts） | located | OpenAlex primary_location.source.id:S4363607743｜S7407087610；Crossref filter=prefix:10.1145,container-title:<各卷全名>（CHI EA 2025 卷名無年份，另加 from/until-pub-date 2025） | 10.1145/3706598（CHI 2025，ISBN 9798400713941）、10.1145/3772318（CHI 2026，ISBN 9798400722783）、10.1145/3706599（CHI EA 2025，ISBN 未取得：Crossref 429）、10.1145/3772363（CHI EA 2026，ISBN 9798400722813） |
| C14 ACM IDC 2025／2026 | located | OpenAlex primary_location.source.id:S4306418951｜S7407086122；Crossref container-title「Proceedings of the 24th Interaction Design and Children」「Proceedings of the 25th Annual ACM Interaction Design and Children Conference」 | 10.1145/3713043（IDC 2025，ISBN 9798400714733）、10.1145/3773077（IDC 2026，ISBN 9798400722837） |
| C15 ACM FAccT 2025／2026 | located | OpenAlex primary_location.source.id:S4363608463 | 10.1145/3715275（FAccT 2025，ISBN 9798400714825）、10.1145/3805689（FAccT 2026，ISBN 9798400725968） |
| C16 CSCW：PACM HCI CSCW 期次 2025–2026＋CSCW 2025 Companion | partial | OpenAlex primary_location.source.id:S4210183893｜S7407086786；Crossref container-title「Proceedings of the ACM on Human-Computer Interaction」（973 篇）與「Companion Publication of the 2025 Conference on Computer-Supported Cooperative Work and Social Computing」（105 篇） | 10.1145/37xxxxx–38xxxxx（PACM HCI 單篇 DOI，無期次前綴）；10.1145/3715070（CSCW Companion 2025，ISBN 9798400714801） |
| C17 AERA Annual Meeting 2025／2026 | located | OpenAlex primary_location.source.id:S4363608631；Crossref query.container-title=AERA Annual Meeting（L17-CR）；官方議程頁 research.allacademic.com/meta/p<ID>_index.html | 10.3102/21xxxxx–22xxxxx（2025）、10.3102/22xxxxx–23xxxxx（2026）；另有 iPresentation DOI 10.3102/ip.26.<ID> |
| C18 IEEE ICALT 2025 | located | OpenAlex primary_location.source.id:S4363608377；Crossref filter=prefix:10.1109,container-title:2025 IEEE International Conference on Advanced Learning Technologies (ICALT) | 10.1109/icalt64023.2025.*（ISBN 9798331565305） |
| C18 IEEE ICALT 2026 | unavailable | 無 | unknown |
| C16 CSCW 2026 Companion | unavailable | 無 | unknown |
| C20 SITE Interactive 2025（AACE） | unavailable | 無可靠入口 | 無（AACE 論文集通常無 DOI） |

- **C13 ACM CHI 2025／2026（主論文集＋Extended Abstracts）**：ACM 論文集（Crossref type=proceedings-article）。OpenAlex：主論文集 S4363607743（2025：1249、2026：1702）、Extended Abstracts S7407087610（2025：923、2026：1002）；Crossref container-title 精確列舉數相同（1249／1702／922／1005）。缺摘要：主論文集 685 篇、EA 664 篇（多在 2025）。 Crossref filter=isbn: 只命中論文集本身，不能逐篇列舉；改用 container-title 精確 filter。CHI 2025 有大量無摘要篇，布林查詢只能比對題名，故加 has_abstract:false 題名查詢＋Crossref 相關度補查＋全卷題名 regex 補篩。主論文集與 EA 以 DOI 前綴區分。
- **C14 ACM IDC 2025／2026**：ACM 論文集。OpenAlex 每年一個 source：S4306418951（IDC 2025，145 篇）、S7407086122（IDC 2026，164 篇）；Crossref 列舉 145／164 一致。缺摘要 18／23 篇。 IDC 全為兒童主題，改用 AI 寬查詢（105 篇）逐題名初篩；相關篇數遠超細讀上限，大量列 pending。full／short／demo／workshop 細類未能從索引判讀。
- **C15 ACM FAccT 2025／2026**：ACM 論文集。OpenAlex S4363608463（2025：206、2026：314）；缺摘要 35 篇。 Crossref container-title filter 因卷名含逗號回 400（C15-EN25／EN26），未做 Crossref 全卷列舉；只依 OpenAlex。
- **C16 CSCW：PACM HCI CSCW 期次 2025–2026＋CSCW 2025 Companion**：主論文以期刊 PACM HCI（S4210183893，ISSN 2573-0142，type=journal-article）出版：vol 9 issue 2（210 篇，2025-05）、issue 7（315 篇，2025-10）依 ACM 慣例為 CSCW 期次；vol 10 issue 2（46 篇，2026-04）題名帶 CSCW 文章號；vol 10 issue 6（154 篇，2026-09）歸屬未確認。Companion 2025：OpenAlex S7407086786（77 篇）、Crossref 105 篇。 查詢涵蓋整個 PACM HCI（含 GROUP、MHCI、ETRA、EICS、CHI PLAY 等期次），item 以 volume／issue 標示是否屬 CSCW 期次；vol 9 issue 2／7 屬 CSCW 係依 ACM 慣例，未在 ACM DL 核對（ACM DL 不嘗試）。CSCW 2026 Companion 在 Crossref 查無（L16-CRC26、CRC26b；CSCW 2026 會議在 10 月，可能尚未出版）→ 該部分 unavailable。OpenAlex Companion 2025 只收 77／105 篇。
- **C17 AERA Annual Meeting 2025／2026**：AERA 線上論文庫／議程為每篇註冊 Crossref DOI（10.3102/<7 位數>，type=proceedings-article，container「Proceedings of the 2025/2026 AERA Annual Meeting」，event 有會期）。OpenAlex conference source S4363608631（2025：4668、2026：7121），publication_date 為佔位 YYYY-01-01，且 11789 篇中 11748 篇無摘要；同一篇常有 Stage／SIG／Poster 多筆重複 DOI 紀錄。摘要可在官方線上議程頁讀取（research.allacademic.com/meta/p<ID>_index.html 轉至 convention2.allacademic.com，無驗證頁）。 OpenAlex 布林查詢實際只比對題名。15 篇議程摘要於 2026-10-09T17:10:54Z–17:12:36Z 讀取（每篇一次 HTTP 200），只作判斷不存檔。AERA 為議程論文（未經期刊審查之 conference paper／poster／roundtable），請管理者決定證據等級。
- **C18 IEEE ICALT 2025**：IEEE 論文集（Crossref proceedings-article）。Crossref container「2025 IEEE International Conference on Advanced Learning Technologies (ICALT)」118 筆；OpenAlex S4363608377 只收 82 筆。 OpenAlex 漏收約 36 筆，以 Crossref 全卷列舉（C18-CRALL-retry）題名補篩。IEEE Xplore 摘要頁未嘗試。
- **C18 IEEE ICALT 2026**：未在 Crossref（L18-CR26、CR26b、CR26c）或 OpenAlex（S4363608377 最新為 2025-07-14）找到 2026 論文集。 2026 論文集尚未登記 DOI 或未被索引；不記零命中，待日後重查。
- **C16 CSCW 2026 Companion**：Crossref 以 container／bibliographic 查詢只回 DIS 2026、ICMI 等 Companion，無 CSCW 2026 Companion。 CSCW 2026 會議於 2026 年 10 月舉行，Companion 可能尚未出版；待日後重查。
- **C20 SITE Interactive 2025（AACE）**：OpenAlex 無 SITE Interactive 來源（L20c），SITE 年會來源 S4306530332 最新只到 2021；Crossref 查無 AACE SITE 2025 紀錄（L20-CR、L20-CR2）；LearnTechLib 頁面對自動請求回 HTTP 202 空內容（疑似機器人驗證），未嘗試繞過。 需可讀 LearnTechLib 的環境或真人列舉；不記零命中。

## 2. 數字表

| 會議 | 索引規模（2025–2026） | 查詢（成功） | 題名初篩後列入 | 實際細讀摘要 | candidate | pending | exclude |
|---|---|---|---|---|---|---|---|
| C13 | 主 1249+1702、EA 923+1002 | 34 | 27 | 21 篇嘗試／16 篇有摘要 | 8 | 15 | 4 |
| C14 | 145+164 | 14 | 42 | 15／9 | 5 | 37 | 0 |
| C15 | 206+314 | 7 | 6 | 6／3（含 1 篇 arXiv） | 1 | 3 | 2 |
| C16 | PACM HCI 698+274（CSCW 期次 210+315+46，10(6) 154 未確認）；Companion 2025 105 | 23 | 6 | 6／5 | 1 | 2 | 3 |
| C17 | OpenAlex 4668+7121（含重複議程紀錄） | 14 | 48 | 15／15（官方議程頁） | 15 | 33 | 0 |
| C18 | 2025：Crossref 118／OpenAlex 82；2026 unavailable | 12 | 6 | 6／6 | 0 | 1 | 5 |
| C20 | unavailable | 7 | 0 | — | 0 | 0 | 0 |

## 3. 候選清單（candidate）

| DOI | 會議 | 篇型 | 學段 | 主題 | 類別 | 高風險 |
|---|---|---|---|---|---|---|
| 10.1145/3772318.3790471 | CHI 2026 | CHI 主論文集 paper；21 頁 | 小學低年級（K–3，6–9 歲） | 敘事遊戲式數位繪本支持幼年 AI 素養（兩版本比較） | K6 活動實踐 | 是 |
| 10.1145/3772318.3791480 | CHI 2026 | CHI 主論文集 paper；20 頁 | 國中（middle school，10–14 歲） | 兒童建置 LLM 聊天機器人過程中的 AI 幻覺辨識鷹架 | K6 活動實踐 | 是 |
| 10.1145/3772363.3799163 | CHI 2026（Extended Abstracts） | CHI Extended Abstracts（LBW／case study／workshop 提案等細類待官方頁）；6 頁 | 青少年在學學生（adolescents／students，年級未明） | 規則式與資料驅動 AI 比較之實體桌遊（青少年 AI 素養） | K6 活動實踐 |  |
| 10.1145/3772363.3798847 | CHI 2026（Extended Abstracts） | CHI Extended Abstracts（LBW／case study／workshop 提案等細類待官方頁）；7 頁 | 中學教師（secondary school teachers） | 奈及利亞中學教師 AI 素養工作坊與低資源「手算 AI」框架 | K4 教學師培 |  |
| 10.1145/3772318.3791555 | CHI 2026 | CHI 主論文集 paper；18 頁 | 國中（middle school，11–14 歲） | BiasViz：國中生分析 LLM 偏誤之專題式敘事學習工具 | K6 活動實踐 | 是 |
| 10.1145/3706599.3719876 | CHI 2025（Extended Abstracts） | CHI Extended Abstracts（LBW／case study／workshop 提案等細類待官方頁）；11 頁 | 國中（middle school） | 不插電 AI 素養與倫理推理活動設計 | K6 活動實踐 |  |
| 10.1145/3706598.3714106 | CHI 2025 | CHI 主論文集 paper；30 頁 | 國中（middle school） | Briteller：以光學實體互動學習 AI 推薦系統（內積） | K6 活動實踐 | 是 |
| 10.1145/3772318.3791477 | CHI 2026 | CHI 主論文集 paper；16 頁 | 兒童 10–11 歲（約小學高年級） | 以設計虛構情境促進兒童 AI 倫理素養之批判反思 | K2 學術研究 | 是 |
| 10.1145/3773077.3812170 | IDC 2026 | IDC 論文集（full／short／demo／workshop 細類待官方頁）；6 頁 | 高中（11 年級學生與高中教師） | 拉丁裔高中生與教師以參與式設計發展批判 AI 素養 | K4 教學師培 |  |
| 10.1145/3773077.3812139 | IDC 2026 | IDC 論文集（full／short／demo／workshop 細類待官方頁）；7 頁 | K-12 學生（年級未明，ELA 單元） | 融入英語文論證單元之 AI 使用素養課程 | K4 教學師培 | 是 |
| 10.1145/3773077.3812137 | IDC 2026 | IDC 論文集（full／short／demo／workshop 細類待官方頁）；4 頁 | 國中（middle school） | Parse：不插電實體模組教 AI 如何學習 | K6 活動實踐 |  |
| 10.1145/3773077.3806141 | IDC 2026 | IDC 論文集（full／short／demo／workshop 細類待官方頁）；15 頁 | 高中教師 | 與高中教師參與式設計 NLP 動手做活動（AI 素養） | K4 教學師培 |  |
| 10.1145/3713043.3727057 | IDC 2025 | IDC 論文集（full／short／demo／workshop 細類待官方頁）；17 頁 | 高中生 | 高中生參與式設計 GenAI 工具與學校政策 | K5 工具治理 |  |
| 10.1145/3715275.3732142 | FAccT 2025 | FAccT 論文集 paper（細類待官方頁）；14 頁 | 青少年（18 歲以下） | 青少年 AI 稽核與批判 AI 素養鷹架 | K6 活動實踐 |  |
| 10.1145/3757620 | CSCW（PACM HCI 9(7)） | PACM HCI 期刊論文 vol 9 issue 7，CSCW 期次（依 ACM 慣例 vol 9 issue 2/7）；29 頁 | 高中年齡（14–15 歲） | 青少年稽核 TikTok Effect House 生成式 AI 模型以學習 AI | K6 活動實踐 |  |
| 10.3102/2279866 | AERA 2026 Annual Meeting | AERA 年會論文（paper／symposium，題名未標示場次型） | K-12（專家觀點） | 專家觀點下的 K-12 AI 素養與評量框架 | K3 素養評量 |  |
| 10.3102/2287154 | AERA 2026 Annual Meeting | AERA 年會論文（paper／symposium，題名未標示場次型） | K-12 STEM 教師 | K-12 STEM 教師專業發展融入 AI 素養之設計原則 | K4 教學師培 |  |
| 10.3102/2194735 | AERA 2025 Annual Meeting | AERA 年會論文（paper／symposium，題名未標示場次型） | 高中（黑人高中生與教師） | 黑人高中生 AI 素養課程實施 | K6 活動實踐 | 是 |
| 10.3102/2186733 | AERA 2025 Annual Meeting | AERA 海報（依 OpenAlex 題名標記） | K-12 教師（高中） | 高中教師在 AI 課程共同設計專業學習中的目標 | K4 教學師培 |  |
| 10.3102/2273521 | AERA 2026 Annual Meeting | AERA 年會論文（paper／symposium，題名未標示場次型） | 幼兒園（pre-K 與 kindergarten 教師） | 幼兒 AI 課程平台共同設計（DBR） | K4 教學師培 |  |
| 10.3102/2276758 | AERA 2026 Annual Meeting | AERA 海報（依 OpenAlex 題名標記） | 小學五年級 | GenAI 學習環境中培養小五學生 AI 素養（隨機分組） | K6 活動實踐 | 是 |
| 10.3102/2282134 | AERA 2026 Annual Meeting | AERA 海報（依 OpenAlex 題名標記） | 小學 K-2 教師與學生 | AI by 8：鄉村 K-2 英語文融入 AI 素養 | K4 教學師培 |  |
| 10.3102/2283563 | AERA 2026 Annual Meeting | AERA 年會論文（paper／symposium，題名未標示場次型） | K-12 學生 | 學校類型與地區對 K-12 學生 AI 素養之影響 | K3 素養評量 |  |
| 10.3102/2277136 | AERA 2026 Annual Meeting | AERA 圓桌（roundtable） | K-12（平台政策） | 五大生成式 AI 平台 K-12 教育政策比較 | K5 工具治理 |  |
| 10.3102/2275753 | AERA 2026 Annual Meeting | AERA 圓桌（roundtable） | K-12 學區 | 加州五學區 ChatGPT／GenAI 指引政策分析 | K1 政策框架 |  |
| 10.3102/2283932 | AERA 2026 Annual Meeting | AERA 海報（依 OpenAlex 題名標記） | K-12（政策文件） | K-12 負責任 AI 政策回顧與利害關係人框架 | K1 政策框架 |  |
| 10.3102/2279151 | AERA 2026 Annual Meeting | AERA 圓桌（roundtable） | 小學五年級 | 非正式 AI 課程促進小五學生倫理推理與能動性 | K6 活動實踐 | 是 |
| 10.3102/2186946 | AERA 2025 Annual Meeting | AERA 年會論文（paper／symposium，題名未標示場次型） | 國中（黑人國中生，夏令營） | 黑人國中生 AI 夏令營之自我效能與結果預期性別差異 | K6 活動實踐 | 是 |
| 10.3102/2276835 | AERA 2026 Annual Meeting | AERA 海報（依 OpenAlex 題名標記） | K-12（文獻回顧） | K-12 AI 教育設計之系統性回顧（55 篇） | K2 學術研究 |  |
| 10.3102/2280516 | AERA 2026 Annual Meeting | AERA 年會論文（paper／symposium，題名未標示場次型） | K-12（州政策） | 美國各州 K-12 AI 指引中的 AI 與公平概念化 | K1 政策框架 |  |

## 4. 待判（pending）

### 4.1 已讀或嘗試讀摘要但未能定案

- 10.1145/3772318.3790908（C13）Do Teachers Dream of GenAI Widening Educational (In)equality? Envisioning the Future of K-12 GenAI Education from Global Teachers’ Perspectives — 摘要明示 K-12 teachers；但「GenAI education」偏 GenAI 進入課堂（使用）與不平等，未明確為教學關於 AI；主題是否屬 K-12 GenAI 治理待管理者判
- 10.1145/3706598.3714402（C13）Fairness by Design: Cross-Cultural Perspectives from Children on AI and Fair Data Processing in their Education Futures — 摘要明示 10–12 歲兒童與教師（蘇格蘭、土耳其）；主題為 AI-EdTech 資料治理，非生成式 AI、非學習關於 AI；是否納入 K5 待管理者判
- 10.1145/3772363.3798981（C13）Thinking, Making, Enacting --- A Multi-Modal Approach to Children's Conception of AI — 摘要明示 primary-school children 6–11 歲；主題為兒童 AI 概念理解，未明示 AI 素養教學；屬 AI 素養基礎研究與否待判；Extended Abstract
- 10.1145/3772363.3778682（C13）Developmentally Safe Generative AI Environment for Youth — 摘要為 workshop 提案，談 youth 使用 GenAI 之發展風險；未明示學校／年級，非實證論文
- 10.1145/3706598.3713443（C13）Technologies for Children's AI Learning: Design Features and Future Opportunities — OpenAlex 摘要欄為會議資訊而非摘要，摘要實質不可得；題名相關
- 10.1145/3706599.3719789（C13）From Pre-Conceptions to Theories: How Middle School Student Ideas about Predictive Text Evolve after Interaction with a New Software Tool — 摘要不可得（OpenAlex 無摘要、arXiv 標題檢索無對應；ACM DL 不嘗試），題名相關但學段未由摘要確認
- 10.1145/3706598.3713173（C13）AI Literacy for Underserved Students: Leveraging Cultural Capital from Underserved Communities for AI Education Research — 摘要不可得（OpenAlex 無摘要、arXiv 標題檢索無對應；ACM DL 不嘗試），題名相關但學段未由摘要確認
- 10.1145/3706598.3714037（C13）Escape or D13: Understanding Youth Perspectives of AI through Educational Game Co-design — 摘要不可得（OpenAlex 無摘要、arXiv 標題檢索無對應；ACM DL 不嘗試），題名相關但學段未由摘要確認
- 10.1145/3706599.3719844（C13）ImaginAItion: Promoting Generative AI Literacy Through Game-Based Learning — 摘要不可得（OpenAlex 無摘要、arXiv 標題檢索無對應；ACM DL 不嘗試），題名相關但學段未由摘要確認；學段亦可能非 K-12
- 10.1145/3713043.3731495（C14）Experts Unite, Kids Delight: Co-Designing an Inclusive AI Literacy Educational Tool for Children — 摘要只寫 children，未明示學段／年齡
- 10.1145/3713043.3731513（C14）Creat’AI: Using Tangible Storytelling to Teach AI to Children — OpenAlex 摘要為圖說；只見 young children，學段未明
- 10.1145/3773077.3812156（C14）Understanding teens’ self-beliefs when learning to construct and deconstruct AI/ML systems: Developing a survey instrument — 摘要明示 124 名 teenagers 與 AI literacy 量表，但未明示在學／年級
- 10.1145/3773077.3806125（C14）"Are you biased right now, AI?": Investigating Supporting Youths' Systematic Evaluation of GenAI — 摘要明示 AI literacy camp、teens N=16，未明示在學／年級
- 10.1145/3713043.3728853（C14）"It’s Just a Machine that Predicts" - Demystifying Artificial Intelligence / Machine Learning with Teenagers — 摘要不可得（OpenAlex 無摘要、arXiv 標題檢索無對應；ACM DL 不嘗試），題名相關但學段未由摘要確認
- 10.1145/3713043.3728836（C14）“AI just keeps guessing”: Using ARC Puzzles to Help Children Identify Reasoning Errors in Generative AI — 摘要不可得（OpenAlex 無摘要、arXiv 標題檢索無對應；ACM DL 不嘗試），題名相關但學段未由摘要確認
- 10.1145/3713043.3728856（C14）Children's Mental Models of AI Reasoning: Implications for AI Literacy Education — 摘要不可得（OpenAlex 無摘要、arXiv 標題檢索無對應；ACM DL 不嘗試），題名相關但學段未由摘要確認
- 10.1145/3713043.3727052（C14）Beyond the Algorithm: Speculative Approaches to Critical AI Literacies with Diverse Youth — 摘要不可得（OpenAlex 無摘要、arXiv 標題檢索無對應；ACM DL 不嘗試），題名相關但學段未由摘要確認
- 10.1145/3713043.3731520（C14）Empowering Children’s AI Literacy Through Co-Creating Stories with LLM — 摘要不可得（OpenAlex 無摘要、arXiv 標題檢索無對應；ACM DL 不嘗試），題名相關但學段未由摘要確認
- 10.1145/3773077.3812183（C14）AI Literacy with Teenagers: Exploring Large Language Models Beneath the Surface — 摘要不可得（OpenAlex 無摘要、arXiv 標題檢索無對應；ACM DL 不嘗試），題名相關但學段未由摘要確認
- 10.1145/3805689.3812305（C15）Investigating ChatGPT Usage in High Schools: Student Perspectives on Policy and Practice — 摘要不可得（OpenAlex 無摘要、arXiv 標題檢索無對應；ACM DL 不嘗試），題名相關但學段未由摘要確認
- 10.1145/3715275.3732176（C15）Responsible AI in Education: Understanding Teachers’ Priorities and Contextual Challenges — 摘要不可得（OpenAlex 無摘要、arXiv 標題檢索無對應；ACM DL 不嘗試），題名相關但學段未由摘要確認
- 10.1145/3805689.3812281（C15）When AI Breaks, Teachers Repair: Pedagogical Repair Work in Situated Classroom Practice — 摘要不可得（OpenAlex 無摘要、arXiv 標題檢索無對應；ACM DL 不嘗試），題名相關但學段未由摘要確認
- 10.1145/3816972（C16）Mind the Trust Gap: Identifying (Mis)alignments in Teacher-Student Views Toward Control and Agency in K-12 Classroom AI — 摘要明示 K-12 classroom、school students 與 teachers（德國）；主題為課堂 AI 決策控制權，非 AI 素養、非明確生成式 AI；且 PACM HCI 10(6) 是否屬 CSCW 期次未確認
- 10.1145/3715070.3748294（C16）Bridging Expertise and Participation in AI: Multistakeholder Approaches to Safer AI Systems for Youth Online Safety — OpenAlex 無摘要、未細讀；題名為青少年網路安全，教育情境不明
- 10.1109/icalt64023.2025.00035（C18）WekiMusic: Machine Learning Music Activities to Foster Constructionist AI Education — 摘要為學習關於 AI 之音樂活動，但只寫 students，未明示學段
- 10.3102/2232872（C17）High School Teachers’ Emergent AI Literacy Goals During Professional Learning About Lesson Co-Design (Poster 17): SIG-Learning Sciences, Stage 2, 3:56 PM — 疑為 10.3102/2186733 之 SIG 場次重複紀錄（同題加 SIG 標記）；未讀議程頁
- 10.3102/2335691（C17）Fostering Elementary Students’ AI Literacy in a Learning Environment Empowered by Generative AI (Stage 1, 11:02 AM) — 疑為 10.3102/2276758 之 Stage 場次重複紀錄；未讀議程頁

### 4.2 超過細讀上限未讀（題名相關）

- C13（6 篇）：10.1145/3706598.3713510、10.1145/3772363.3798673、10.1145/3772318.3791346、10.1145/3772363.3799047、10.1145/3772318.3790584、10.1145/3772318.3791483
- C14（27 篇）：10.1145/3773077.3813778、10.1145/3773077.3816198、10.1145/3773077.3813775、10.1145/3773077.3813782、10.1145/3773077.3806143、10.1145/3713043.3731604、10.1145/3773077.3813780、10.1145/3773077.3806144、10.1145/3713043.3731605、10.1145/3713043.3731525、10.1145/3713043.3731602、10.1145/3773077.3806107、10.1145/3713043.3728849、10.1145/3773077.3813783、10.1145/3773077.3813763、10.1145/3773077.3813772、10.1145/3773077.3812166、10.1145/3773077.3806146、10.1145/3773077.3812189、10.1145/3773077.3806124、10.1145/3713043.3728839、10.1145/3773077.3812142、10.1145/3773077.3806104、10.1145/3713043.3728857、10.1145/3773077.3812130、10.1145/3713043.3731498、10.1145/3773077.3806128
- C17（31 篇）：10.3102/2280689、10.3102/2288539、10.3102/2282137、10.3102/2197285、10.3102/2194864、10.3102/2276914、10.3102/2273564、10.3102/2185074、10.3102/2277717、10.3102/2353011、10.3102/2279932、10.3102/2193015、10.3102/2183399、10.3102/2288639、10.3102/2289481、10.3102/2279837、10.3102/2184589、10.3102/2195238、10.3102/2281139、10.3102/2273778、10.3102/2288275、10.3102/2190458、10.3102/2288144、10.3102/2186829、10.3102/2272689、10.3102/2276315、10.3102/2284174、10.3102/2190722、10.3102/2194056、10.3102/2198280、10.3102/2281719

## 5. 排除（exclude，已細讀）

- 10.1145/3772318.3790765（C13）Do Children Trust AI, and Should They? Designing and Validating a Child-Centred K-AI Trust Scale for Intelligent Systems — 摘要主題為兒童與智慧系統互動之信任測量，非 AI 素養／AI 教育；兒童學段未明示
- 10.1145/3706598.3713714（C13）"Here the GPT made a choice, and every choice can be biased": How Students Critically Engage with LLMs through End-User Auditing Activity — 摘要明示大學（North American public research university）學生；只有高教
- 10.1145/3772318.3791296（C13）"Let’s talk about data": Co-Designing Critical Data Literacy Tools for K-12 Education through Dialogic Learning — 摘要明示 K-12、六年級，但主題為批判資料素養，非 AI 素養／AI 教育
- 10.1145/3772318.3790489（C13）Amplifying Rural Educators’ Perspectives: A Qualitative Study on the Impacts of Generative AI in Rural U.S. High Schools — 摘要明示 rural high school educators；主題為教師使用 GenAI 作教學工具與資源落差（AI 只當工具），非學習關於 AI；提及缺乏 AI 素養培訓僅為障礙之一
- 10.1145/3805689.3812325（C15）Operationalizing Governance for Youth-Facing LLM Well-being Support: A Community-Based Participatory Study — 摘要為 youth 使用 LLM 作身心支持之治理（青少年、家長、照護者），非教育／學校情境，亦非學習關於 AI
- 10.1145/3715275.3732175（C15）Difficult Lessons on Social Prediction from Wisconsin Public Schools — 摘要明示公立學校預測系統（EWS）；屬演算法治理但非 AI 素養、亦非生成式 AI
- 10.1145/3757476（C16）Exploring the Usage of Generative AI for Group Project-Based Offline Art Courses in Elementary Schools — 摘要明示 K-6 美術課；GenAI 為創作學習工具，非學習關於 AI
- 10.1145/3711026（C16）Making ChatGPT Work for Me — 摘要明示 US K12 public school teachers；ChatGPT 作備課工具，非教 AI 能力
- 10.1145/3710966（C16）Equality Engine: Fostering Critical Machine Learning Bias Literacy Through a Transformational Game — 摘要明示 post-secondary students；只有高教
- 10.1109/icalt64023.2025.00078（C18）Learning by Doing in Promoting GAI Literacy — 摘要明示 IT undergraduates 英語課；只有高教
- 10.1109/icalt64023.2025.00084（C18）Obstacles or Opportunities: Teachers' Concerns About Adopting Generative AI in Learning and Teaching — 摘要明示 K-12、83 名香港教師；主題為採用 GAI 作教學工具之關注，非教 AI 能力
- 10.1109/icalt64023.2025.00069（C18）AI Integration in Vietnamese Primary Education: Educator Perspectives and Implementation Challenges — 摘要明示 primary education 教師；AI 工具用於教學與評量（AI 只當工具）
- 10.1109/icalt64023.2025.00121（C18）Competency-Based Model for CS Education in the Era of AI — 摘要談 CS 教育評量框架與學界／業界落差，未見 K-12；主題非 AI 素養
- 10.1109/icalt64023.2025.00067（C18）SHIELD-ing Education: On-Device AI for Equitable, Offline Computing Education — 摘要明示 rural Indian school 學生；AI 為家教工具；有前後問卷（高風險）

## 6. 限制

- 每會議細讀摘要上限約 15 篇：CHI 實際嘗試 21 篇（16 篇有摘要）、IDC 15 篇（9 篇有摘要）、FAccT 6 篇、CSCW 6 篇、AERA 15 篇（官方議程頁）、ICALT 6 篇；IDC 27 篇、AERA 31 篇、CHI 6 篇題名相關者因超過上限列 pending「超過細讀上限未讀」。
- ACM 無摘要篇（CHI 2025、IDC 2025 尤多）：OpenAlex 無摘要、arXiv API 標題檢索無對應者，一律 pending；ACM DL 未嘗試讀取。兩篇 candidate 以 arXiv 版摘要判讀（2503.22113v1、2502.18576v1），須以官方版複核。
- OpenAlex 部分摘要欄內容錯誤（10.1145/3706598.3713443 為會議資訊、10.1145/3713043.3731513 為圖說、10.1145/3706599.3719876 截斷），已註明。
- 學段判定規則（本組一致採用）：摘要明寫學校／年級，或明寫落在中小學的年齡（如 10–14 歲、18 歲以下）→ 可 candidate；只寫 children／teens／youth 而無學校、年級或年齡 → pending。此為對「明確兒童／青少年在學學生」的保守解讀，請管理者確認。
- CSCW：查詢涵蓋整個 PACM HCI；vol 9 issue 2／7 屬 CSCW 係依 ACM 慣例推定，vol 10 issue 6 歸屬未確認；CSCW 2026 第二輪期次可能尚未出版。
- AERA：OpenAlex 只能比對題名（摘要幾乎全缺），日期為佔位值；同一篇有多筆議程 DOI（Stage／SIG／Poster），已標 2 筆疑似重複，未全面去重。AERA 議程頁另有 Index Date（上傳日）資訊，依規則 first_public_date 仍記 unknown。
- ICALT 2026、CSCW 2026 Companion、SITE Interactive 2025 為 unavailable（原因見 venues），未記零命中。
- FAccT 無法以 Crossref container-title filter 列舉（逗號造成 400），只依 OpenAlex；Crossref 其他 429 皆已重試成功或註明。
- Crossref 相關度補查（C13-CR1～CR4）total-results 不是主題命中數，只讀前 40 筆。
- 成效敘述（前後測、隨機分組、自評提升）一律標高風險，待 G2–G4；本檔不作效果主張。
- 未保存任何摘要全文；raw 回應與 meta 在 scratchpad/b1/work-b1-3/ 暫存。known_dois_duplicate：135 筆皆不在 known-dois.txt。
- paper_type 細類（full／short／LBW／poster）多未能從索引判讀，只依論文集與頁數標示，待官方頁核對。
