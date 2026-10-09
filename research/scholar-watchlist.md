# K-12 AI 素養學者監測清單 v0.2（草稿）

> 建立日期：2026-10-09。用途：搜尋時可**依作者追蹤**，補足依期刊會議（[venue-watchlist](venue-watchlist.md)）與關鍵字的檢索。這是**監測來源池**，不是學者排名或推薦，也不表示他們的每篇著作都適用 K-12；入選理由只代表與本刊主題的關聯。
>
> 來源：使用者提供的「2026 數位學習國際論壇（IFDE 2026，2026/8/6–8/7，高雄，教育部資訊及科技教育司主辦）」整理文件兩份。這兩份是內部文件，未公開，也**未放入 repo**；本清單只摘錄學者姓名、公開職稱與單位，以及其公開著作的書目。

## 0. 使用規則

- **只收公開的專業資訊**：姓名、公開職稱與單位、研究主題、公開著作書目。不收電子郵件、電話或其他個人資料（論壇文件中出現的聯絡信箱一律不錄）。
- **職稱、單位**依論壇資料（2026 年 8 月）所載；人會異動，使用前以機構頁為準。
- **作者確認（2026-10-09）**：以 ORCID 公開任職紀錄、OpenAlex 檔案的 ORCID 與機構，以及近期著作主題交叉比對；臺灣學者的單位另依管理者告知。結果見各表「確認」欄：
  - **已確認**：ORCID 現職與論壇所載（或管理者告知）一致，且 OpenAlex 檔案的 ORCID 相同。
  - **大致確認**：單位與研究領域相符，但缺 ORCID 任職紀錄或 OpenAlex 檔案混入他人作品。
  - **未找到**：OpenAlex 找不到對應檔案。
- **OpenAlex 作者檔案會分裂或混入同名者**。有 ORCID 的學者，檢索時優先用 ORCID 篩選（可把分裂檔案一起帶出）；但 ORCID 篩選擋不住已混入的同名者作品（S06 實測如此），所以依作者找到的每篇論文仍要看作者單位。
- **著作欄是論壇整理所列，尚未核對書目**（尤其預印本編號與 DOI）。正式入庫前，照知識庫流程核對。
- **列入清單不看研究對象學段**：論壇發表的學者一律納入，不論其研究以大學生、成人或 K-12 為對象（管理者 2026-10-09 決定）。依作者找到的論文都可記入知識庫，以 `record_type` 和學段欄如實標示；但**進入週報、月報或每日短訊的候選**，仍依刊物範圍逐篇判斷是否涉及 K-12。
- 預印本不是同儕審查的結果；入庫時 `verification_status` 照常從 discovered_unverified 開始。

## 1. 優先級

- **A 核心**：論壇的學術講者，分為國際（A1）與臺灣（A2）。每週依作者檢索新作。
- **B 擴充**：A 級學者的主要共同作者，或論壇中被多位講者引用的研究者。每月檢索。
- **C 政策與實務窗口**：論壇的政策官員與學校實務講者，不是學術作者。追蹤其所屬機構的發布（併入政策來源搜尋），不依作者檢索論文。

## 2. A1 核心：論壇國際學術講者（5 位）

| ID | 學者 | 單位與角色（論壇所載） | 與本刊相關的主題 | 論壇所列代表著作（未核） | OpenAlex／ORCID 與確認 |
|---|---|---|---|---|---|
| S01 | Mutlu Cukurova | UCL Knowledge Lab；*British Journal of Educational Technology* 總編輯；UNESCO、OECD、歐盟外部專家 | 人機協作三典範（取代、互補、綜效）、教師與 AI 組隊、教師 AI 能力框架 | Miao & Cukurova (2024) UNESCO AI Competency Framework for Teachers；Cukurova (2025) BJET 56(2) hybrid intelligence；Nazaretsky et al. (2022) BJET 53(4) 教師對 AI 的信任 | A5010726815；ORCID 0000-0001-5843-4854。**已確認**（ORCID 現職 UCL） |
| S02 | Dragan Gašević | 論壇所載為香港大學講座教授；學習分析研究學會創辦人；*Computers & Education: AI* 總編輯 | 表現增益不等於學習、後設認知怠惰、Agentivism 學習理論、FLoRA、CELLA 跨國研究 | Yan, Greiff, Teuber & Gašević (2024) Nature Human Behaviour 8(10)；Fan et al. (2025) BJET 56(2) DOI 10.1111/bjet.13544；Yan, Greiff, Lodge & Gašević (2025) Nature Reviews Psychology 4；Gašević & Yan (2026) OECD Digital Education Outlook 2026 | A5036855560；ORCID 0000-0001-9265-1908。**已確認**（ORCID 現職香港大學講座教授；Monash 任職於 2026 年結束）。OpenAlex 另有零星分裂檔案，建議用 ORCID 檢索 |
| S03 | Inge Molenaar | Radboud University；荷蘭國家教育 AI 實驗室（NOLAI）主持人 | 偵測、診斷、行動框架；六層自動化模型；混合人機調節；低年齡學習者的自主學習 | Molenaar (2022) European Journal of Education 57(4) DOI 10.1111/ejed.12527；Molenaar (2022) Computers and Education: AI 3, 100070；Lim et al. (2024) BJET 55(4) DOI 10.1111/bjet.13414 | A5037990414；ORCID 0000-0003-4639-2524。**已確認**（ORCID 現職 Radboud） |
| S04 | Henriikka Vartiainen | 東芬蘭大學；Generation AI 專案工作包主持人（議程有列，簡報未收錄） | 兒少 AI 素養教學、資料能動性、共同設計；Generation AI 開放教具（4–8 年級實證） | Vartiainen et al. (2025) New Media & Society DOI 10.1177/14614448241252820（7 年級 N=209）；Kahila et al. (2024) Informatics in Education DOI 10.15388/infedu.2024.15；Pope et al. (2025) IEEE TLT DOI 10.1109/TLT.2025.3529994 | A5083898518；ORCID 0000-0001-6005-907X。**已確認**（ORCID 現職東芬蘭大學） |
| S05 | Yasushi Mori | 茨城大學 | 日本 Society 5.0 下的中小學 AI 與 ICT 教育、教師研習 | 論壇引用日本 ICT 教育首長協議會 2026 全國調查（非期刊論文） | **未找到**：OpenAlex 以茨城大學篩選查無此人（同名者分屬岡山大學等，均非本人）。日文姓名與 researchmap 頁待查；可能主要以日文發表 |

## 2b. A2 核心：論壇臺灣學術講者（7 位）

> 英文姓名依 ORCID 與 OpenAlex 檔案所用拼法。單位：郭伯臣、李政軒、黃國禎為國立臺中教育大學（管理者告知，與 ORCID 一致）；劉遠楨為國立臺北教育大學資訊科學系特聘教授兼副校長（管理者告知）。劉晨鐘為國立中央大學資訊工程學系講座教授、網路學習科技研究所教授（管理者告知，與 ORCID 一致）。

| ID | 學者 | 單位與角色 | 論壇場次與主題 | OpenAlex／ORCID 與確認 |
|---|---|---|---|---|
| T01 | 郭伯臣 | 國立臺中教育大學校長、講座教授 | Day 1 專題：AI 人才方舟計畫核心支柱、因材網 TALP 與 e度實證 | Bor-Chen Kuo：A5054302891；ORCID 0000-0003-1741-2450。**已確認**（ORCID：臺中教大講座教授、校長）。另有分裂檔案 A5111888041 等，用 ORCID 檢索較完整 |
| T02 | 李政軒 | 國立臺中教育大學教授 | Day 2 專題：e度從 AI 學伴到人機協作；座談二主持 | Cheng-Hsuan Li：A5006434175；ORCID 0000-0001-5059-8256。**已確認**（ORCID：臺中教大教授）。同名者多（臺大醫院等），務必用此 ID 或 ORCID |
| T03 | 黃國禎 | 國立臺中教育大學講座教授（ORCID 另列國立臺灣科技大學講座教授） | 座談一主持：深化教師 AI 素養與專業發展 | Gwo-Jen Hwang：A5049547394；ORCID 0000-0001-5155-276X。**已確認**。OpenAlex 另有分裂檔案（A5102430538、A5112411994、A5110313723），用 ORCID 檢索較完整；著作量大（600 篇以上），檢索須加主題詞 |
| T04 | 劉遠楨 | 國立臺北教育大學資訊科學系特聘教授兼副校長 | 座談一：教師 AI 素養四面向、風險與紅線 | Yuan-Chen Liu：A5029607042（北教大）。**大致確認**：單位與資訊、教育領域相符，但無 ORCID，檔案混有醫學影像等論文（可能是本人的資訊研究，也可能混入同名者）；另有小檔案 A5017336861、A5024743533、A5093536863。依作者找到的論文須逐篇看單位 |
| T05 | 許庭嘉 | 國立臺灣師範大學特聘教授 | 座談一：AI 倫理三件事、學習歷程可見 | Ting-Chia Hsu：A5017170544；ORCID 0000-0001-6504-9540。**已確認**（ORCID：臺師大教授）。另有小型分裂檔案 |
| T06 | 劉晨鐘 | 國立中央大學資訊工程學系講座教授、網路學習科技研究所教授 | 座談二：四條保護原則 | Chen-Chung Liu：A5103076432；ORCID 0000-0001-6128-0227。**已確認**（ORCID：中央大學；近期著作為生成式 AI 教學代理人）。另有同名臺大醫院作者 A5058832950，勿混用 |
| T07 | 張耀中 | 國立臺東大學研發長 | 座談二：從「會用 AI」到「會驗證」 | Yao-Chung Chang：A5032462085；ORCID 0000-0002-2545-8910。**大致確認**：單位相符，ORCID 無任職紀錄；著作以網路通訊為主，2026 年有生成式 AI 教育論文。檢索須加教育主題詞 |

## 3. B 擴充（11 位）

| ID | 學者 | 單位（ORCID 現職） | 為何列入 | OpenAlex／ORCID 與確認 |
|---|---|---|---|---|
| S06 | Lixiang Yan | 清華大學助理教授（ORCID；Monash 研究員任職於 2025 年結束） | Gašević 的主要共同作者；Agentivism、表現與學習之分 | ORCID 0000-0003-3818-045X。**已確認本人，但 OpenAlex 檔案不可用**：A5041301106 混入大量醫學論文，A5016844140 只有少數作品。實測以 ORCID 篩選 2026 年作品（20 筆）仍帶出醫學論文，所以**一律加教育主題詞，並逐篇看作者單位** |
| S07 | Yizhou Fan | Peking University | 後設認知怠惰、後設認知取徑（與 Gašević、Molenaar 合著） | A5006305255；ORCID 0000-0003-2777-1705。**已確認**（ORCID 現職與單位欄一致） |
| S08 | Samuel Greiff | Technical University of Munich | 生成式 AI 對人類學習的總體評估（Nature Human Behaviour 2024 共同作者） | A5006173637；ORCID 0000-0003-2900-3734。**已確認**（ORCID 現職與單位欄一致） |
| S09 | Jason M. Lodge | The University of Queensland | 表現增益與學習之分（Nature Reviews Psychology 2025 共同作者） | A5069874026；ORCID 0000-0001-6330-6160。**已確認**（ORCID 現職與單位欄一致） |
| S10 | Matti Tedre | University of Eastern Finland | Generation AI 專案主持人；K-12 AI 與運算思維教育 | A5050967195；ORCID 0000-0003-1037-3313。**已確認**（ORCID 現職與單位欄一致） |
| S11 | Juho Kahila | University of Eastern Finland | 兒童資料能動性、AI 素養中的「失敗作為學習機會」 | A5048489248；ORCID 0000-0002-9913-0627。**已確認**（ORCID 現職與單位欄一致） |
| S12 | Sanna Järvelä | University of Oulu | 自主與共享調節學習；與 Molenaar 合著多模態測量回顧 | A5054198262；ORCID 0000-0001-6223-3668。**大致確認**（OpenAlex 檔案 ORCID 相同、單位奧盧大學；ORCID 無公開任職紀錄） |
| S13 | Roger Azevedo | University of Central Florida | 自主學習的多模態測量（同上回顧共同作者） | A5019212451；ORCID 0000-0002-5018-6232。**已確認**（ORCID 現職與單位欄一致） |
| S14 | Maria Bannert | Technical University of Munich | 即時個人化鷹架（FLoRA 研究群） | A5052257833；ORCID 0000-0001-7045-2764。**已確認**（ORCID 現職與單位欄一致） |
| S15 | Hamsa Bastani | University of Pennsylvania Wharton School | PNAS 2025 高中數學研究（論壇三位講者引用：無護欄的生成式 AI 會傷害學習） | A5075456619；ORCID 0000-0002-8793-4732。**已確認**（ORCID 現職與單位欄一致） |
| S16 | Fengchun Miao | UNESCO | UNESCO 教師與學生 AI 能力框架主要作者（政策文件多，OpenAlex 收錄少） | A5019417534（無 ORCID）。**大致確認**（OpenAlex 單位 UNESCO）；收錄少，建議改追 UNESCO 出版 |

## 4. C 政策與實務窗口（7 位，不依作者檢索）

| ID | 人物 | 機構 | 追蹤方式 |
|---|---|---|---|
| P01 | Hai Siang Chia | 新加坡教育部（Student Learning Space） | 追 MOE Rapid Research 專頁、EdTech Masterplan 2030 |
| P02 | Jongwon Seo | 韓國教育學術情報院（KERIS） | 追韓國教育部、KERIS 的教師 AI 與數位素養框架修訂 |
| P03 | Liina Kanter | 愛沙尼亞教育及青年局（HARNO） | 追 AI Leap（AI 躍進）計畫與 HARNO 公告 |
| P04 | 葉家宏 | 教育部資訊及科技教育司司長 | 追 AI 人才方舟計畫與資科司公告 |
| P05 | 林瑋茹 | 教育部師資培育及藝術教育司 | 追智慧教育師培聯盟（子計畫六）與師藝司公告 |
| P06 | 徐臺屏 | 臺北市日新國小 | 學校實務講者（座談二）。OpenAlex 有一檔案可能是本人：Tai-Ping Hsu，A5067092156，ORCID 0000-0003-1787-9173，臺師大，主題為 AI 教育與遊戲式學習；ORCID 無任職紀錄，**待確認** |
| P07 | 施信源 | 新北市鳳鳴國小 | 學校實務講者（座談一）：萬人 Gemini Pro 導入問卷 |

## 5. 檢索方式

- **OpenAlex**：有 ORCID 者用 `/works?filter=author.orcid:<ORCID>,from_publication_date:<窗口起日>`；沒有 ORCID 者用已確認的作者 ID（`author.id:<ID>`）。著作量大或跨領域的學者（如 T03、T04、T07）加教育主題詞。要找週報、月報候選時，再加 K-12 主題詞（例如 school、K-12、primary、secondary、teacher、child）。一次查詢的布林運算子不要超過約 5 個（超過會 429），也不要用萬用字元（會 400）。
- **ORCID**：同名者多時，以 ORCID 為準。
- **預印本**：arXiv、PsyArXiv 依作者名檢索；預印本只能當候選線索，查到期刊正式版再改用正式版。
- **搜尋紀錄**：依作者檢索也要寫入 `search_runs.csv`；查詢失敗記為失敗，不記為零命中。

## 6. 待辦

1. 尚未解決：S05 Yasushi Mori 的日文姓名與 researchmap；P06 徐臺屏的 OpenAlex 檔案是否為本人；T04、T07 是否有 ORCID。
2. 核對第 2 節論壇所列著作的書目（DOI、卷期、預印本編號），符合者依知識庫流程入庫，並逐篇判斷學段。
3. 試跑一次依作者檢索（建議 A1 五位與 ID 已確認的 A2、近 90 天），評估命中數與 K-12 比例，再決定每週或每月的頻率。
