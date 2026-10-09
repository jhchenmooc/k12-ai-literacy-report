# K-12 AI 素養學者監測清單 v0.5（草稿）

> 建立日期：2026-10-09。用途：搜尋時可**依作者追蹤**，補足依期刊會議（[venue-watchlist](venue-watchlist.md)）與關鍵字的檢索。這是**監測來源池**，不是學者排名或推薦，也不表示他們的每篇著作都適用 K-12；入選理由只代表與本刊主題的關聯。
>
> 來源：使用者提供的「2026 數位學習國際論壇（IFDE 2026，2026/8/6–8/7，高雄，教育部資訊及科技教育司主辦）」整理文件兩份。這兩份是內部文件，未公開，也**未放入 repo**；本清單只摘錄學者姓名、公開職稱與單位，以及其公開著作的書目。講者職稱與單位以論壇官方網站為準（2026-10-09 查閱）：[2026](https://sites.google.com/view/idif2026/home)、[2025](https://sites.google.com/view/2025-idlf/home)、[2024](https://event.lafunproject.com/digital_forum/index.html)、[2023 議程](https://sites.google.com/mail.ntcu.edu.tw/dlf/%E6%B4%BB%E5%8B%95%E8%AD%B0%E7%A8%8B_1)與[2023 與會貴賓](https://sites.google.com/mail.ntcu.edu.tw/dlf/%E8%88%87%E6%9C%83%E8%B2%B4%E8%B3%93)。2023–2025 年的職稱是當年所載，可能已異動。

## 0. 使用規則

- **只收公開的專業資訊**：姓名、公開職稱與單位、研究主題、公開著作書目。不收電子郵件、電話或其他個人資料（論壇文件中出現的聯絡信箱一律不錄）。
- **職稱、單位**依論壇官方網站所載（2026 年 8 月論壇時）；人會異動，使用前以機構頁為準。
- **作者確認（2026-10-09）**：以 ORCID 公開任職紀錄、OpenAlex 檔案的 ORCID 與機構，以及近期著作主題交叉比對；臺灣學者的單位另依管理者告知。結果見各表「確認」欄：
  - **已確認**：ORCID 現職與論壇所載（或管理者告知）一致，且 OpenAlex 檔案的 ORCID 相同。
  - **大致確認**：單位與研究領域相符，但缺 ORCID 任職紀錄或 OpenAlex 檔案混入他人作品。
  - **未找到**：OpenAlex 找不到對應檔案。
- **OpenAlex 作者檔案會分裂或混入同名者**。有 ORCID 的學者，檢索時優先用 ORCID 篩選（可把分裂檔案一起帶出）；但 ORCID 篩選擋不住已混入的同名者作品（S06 實測如此），所以依作者找到的每篇論文仍要看作者單位。
- **著作欄是論壇整理所列，尚未核對書目**（尤其預印本編號與 DOI）。正式入庫前，照知識庫流程核對。
- **列入清單不看研究對象學段**：論壇發表的學者一律納入，不論其研究以大學生、成人或 K-12 為對象（管理者 2026-10-09 決定）。依作者找到的論文都可記入知識庫，以 `record_type` 和學段欄如實標示；但**進入週報、月報或每日短訊的候選**，仍依刊物範圍逐篇判斷是否涉及 K-12。
- 預印本不是同儕審查的結果；入庫時 `verification_status` 照常從 discovered_unverified 開始。

## 1. 優先級

- **A 核心**：2026 年論壇的學術講者與主持人，分為國際（A1）與臺灣（A2）。每週依作者檢索新作。
- **A 歷屆**：2023–2025 年論壇的學術講者、引言人與與談人，分為國際（A3）與臺灣（A4）。每月依作者檢索。
- **H 高被引**：AI 素養高被引論文的作者（選取方式見第 3b 節）。每月依作者檢索。
- **B 擴充**：A 級學者的主要共同作者，或論壇中被多位講者引用的研究者。每月檢索。
- **C 政策與實務窗口**：論壇的政策官員與學校實務講者，不是學術作者。追蹤其所屬機構的發布（併入政策來源搜尋），不依作者檢索論文。

## 2. A1 核心：論壇國際學術講者（4 位，只列已確認）

| ID | 學者 | 單位與角色（論壇所載） | 與本刊相關的主題 | 論壇所列代表著作（未核） | OpenAlex／ORCID 與確認 |
|---|---|---|---|---|---|
| S01 | Mutlu Cukurova | University College London 教授（Learning and Artificial Intelligence）；*British Journal of Educational Technology* 主編；UNESCO、IAEA、歐盟專家 | 人機協作三典範（取代、互補、綜效）、教師與 AI 組隊、教師 AI 能力框架 | Miao & Cukurova (2024) UNESCO AI Competency Framework for Teachers；Cukurova (2025) BJET 56(2) hybrid intelligence；Nazaretsky et al. (2022) BJET 53(4) 教師對 AI 的信任 | A5010726815；ORCID 0000-0001-5843-4854。**已確認**（ORCID 現職 UCL） |
| S02 | Dragan Gašević | 香港大學講座教授；學習分析研究學會創辦人；*Computers & Education: AI* 總編輯（後二項依論壇整理文件） | 表現增益不等於學習、後設認知怠惰、Agentivism 學習理論、FLoRA、CELLA 跨國研究 | Yan, Greiff, Teuber & Gašević (2024) Nature Human Behaviour 8(10)；Fan et al. (2025) BJET 56(2) DOI 10.1111/bjet.13544；Yan, Greiff, Lodge & Gašević (2025) Nature Reviews Psychology 4；Gašević & Yan (2026) OECD Digital Education Outlook 2026 | A5036855560；ORCID 0000-0001-9265-1908。**已確認**（ORCID 現職香港大學講座教授；Monash 任職於 2026 年結束）。OpenAlex 另有零星分裂檔案，建議用 ORCID 檢索 |
| S03 | Inge Molenaar | Radboud University 教授；荷蘭國家教育 AI 實驗室（NOLAI）主任 | 偵測、診斷、行動框架；六層自動化模型；混合人機調節；低年齡學習者的自主學習 | Molenaar (2022) European Journal of Education 57(4) DOI 10.1111/ejed.12527；Molenaar (2022) Computers and Education: AI 3, 100070；Lim et al. (2024) BJET 55(4) DOI 10.1111/bjet.13414 | A5037990414；ORCID 0000-0003-4639-2524。**已確認**（ORCID 現職 Radboud） |
| S04 | Henriikka Vartiainen | 東芬蘭大學副教授；Generation AI 專案工作包主持人（議程場次：Towards Transformative AI Education in Finland；整理文件未收錄其簡報） | 兒少 AI 素養教學、資料能動性、共同設計；Generation AI 開放教具（4–8 年級實證） | Vartiainen et al. (2025) New Media & Society DOI 10.1177/14614448241252820（7 年級 N=209）；Kahila et al. (2024) Informatics in Education DOI 10.15388/infedu.2024.15；Pope et al. (2025) IEEE TLT DOI 10.1109/TLT.2025.3529994 | A5083898518；ORCID 0000-0001-6005-907X。**已確認**（ORCID 現職東芬蘭大學） |

## 2b. A2 核心：論壇臺灣學術講者（6 位，只列已確認）

> 英文姓名依 ORCID 與 OpenAlex 檔案所用拼法。職稱依論壇官方網站。單位：郭伯臣、李政軒、黃國禎為國立臺中教育大學（管理者告知，與 ORCID 一致）；劉遠楨為國立臺北教育大學資訊科學系特聘教授兼副校長（管理者告知）。劉晨鐘為國立中央大學資訊工程學系講座教授、網路學習科技研究所教授（管理者告知，與 ORCID 一致）。

| ID | 學者 | 單位與角色 | 論壇場次與主題 | OpenAlex／ORCID 與確認 |
|---|---|---|---|---|
| T01 | 郭伯臣 | 國立臺中教育大學講座教授兼校長；教育部 AI 人才方舟計畫推動營運中心主持人 | Day 1 專題：AI 人才方舟計畫核心支柱、因材網 TALP 與 e度實證 | Bor-Chen Kuo：A5054302891；ORCID 0000-0003-1741-2450。**已確認**（ORCID：臺中教大講座教授、校長）。另有分裂檔案 A5111888041 等，用 ORCID 檢索較完整 |
| T02 | 李政軒 | 國立臺中教育大學講座教授兼校務中心主任；AI 人才方舟計畫推動營運中心協同主持人 | Day 2 專題：e度從 AI 學伴到人機協作；座談二主持 | Cheng-Hsuan Li：A5006434175；ORCID 0000-0001-5059-8256。**已確認**（ORCID：臺中教大教授）。同名者多（臺大醫院等），務必用此 ID 或 ORCID |
| T03 | 黃國禎 | 國立臺中教育大學講座教授兼副校長（ORCID 另列國立臺灣科技大學講座教授） | 座談一主持：深化教師 AI 素養與專業發展 | Gwo-Jen Hwang：A5049547394；ORCID 0000-0001-5155-276X。**已確認**。OpenAlex 另有分裂檔案（A5102430538、A5112411994、A5110313723），用 ORCID 檢索較完整；著作量大（600 篇以上），檢索須加主題詞 |
| T05 | 許庭嘉 | 國立臺灣師範大學特聘教授 | 座談一：AI 倫理三件事、學習歷程可見 | Ting-Chia Hsu：A5017170544；ORCID 0000-0001-6504-9540。**已確認**（ORCID：臺師大教授）。另有小型分裂檔案 |
| T06 | 劉晨鐘 | 國立中央大學資訊工程學系講座教授、網路學習科技研究所教授 | 座談二：四條保護原則 | Chen-Chung Liu：A5103076432；ORCID 0000-0001-6128-0227。**已確認**（ORCID：中央大學；近期著作為生成式 AI 教學代理人）。另有同名臺大醫院作者 A5058832950，勿混用 |
| T07 | 張耀中 | 國立臺東大學資訊工程學系教授兼研發長 | 座談二：從「會用 AI」到「會驗證」 | Yao-Chung Chang：A5032462085；ORCID 0000-0002-2545-8910。**已確認**（管理者確認此臺東大學檔案為本人；ORCID 無公開任職紀錄）。著作以網路通訊為主，2026 年有生成式 AI 教育論文，檢索須加教育主題詞。另一組 ORCID 0000-0001-5174-8586 在 OpenAlex 對到化學論文，不是本人，勿用 |

## 2c. 歷屆出席：已在 A1、A2 或 C 者

| ID | 人物 | 出席年份與角色 |
|---|---|---|
| S01 | Mutlu Cukurova | 2025 專題（AI in Education: From Stochastic Parrots to Synergistic Partners）、2026 |
| S02 | Dragan Gašević | 2024 專題（時任 Monash）、2025 專題（時任 Monash）、2026 |
| P02 | Jongwon Seo | 2024、2025 專題、2026 |
| T01 | 郭伯臣 | 2023 政策報告、2024 與 2025 專題（時任數位學習精進方案專案辦公室執行秘書）、2026 |
| T02 | 李政軒 | 2023 主持、引言、與談（時任教育部資訊及科技教育司司長）、2024 與 2025 專題（時任專案辦公室副執行秘書）、2026 |
| T03 | 黃國禎 | 2023 引言人與圓桌討論人（時任臺中教大副校長）、2026 主持 |
| T05 | 許庭嘉 | 2025 座談（教育大數據分析之應用）、2026 |
| T06 | 劉晨鐘 | 2023 與談（新時代數位學習教學法）、2026 |

## 2d. A3 歷屆國際學術講者（2023–2025，4 位，只列已確認）

| ID | 學者 | 單位與職稱（當年論壇所載） | 年份與講題 | OpenAlex／ORCID 與確認 |
|---|---|---|---|---|
| S18 | Hiroaki Ogata（緒方廣明） | 京都大學學術情報媒體中心教授 | 2025：LEAF（Learning Evidence and Analytics Framework） | A5079543720；ORCID 0000-0001-5216-1576。**已確認**（ORCID 現職京都大學教授）。另有分裂檔案 A5069891576 |
| S20 | Lung-Hsiang Wong（黃龍翔） | 南洋理工大學（論壇所載 Doctor） | 2024：新加坡學校的教學法與科技 | A5052533140；ORCID 0000-0002-0402-9199。**已確認**（ORCID 現職南洋理工大學國立教育學院 Senior Education Research Scientist）。另有分裂檔案 |
| S23 | Hyo-Jeong So | 梨花女子大學教授 | 2024：韓國數位學習軌跡 | A5026147191；ORCID 0000-0002-1713-9653。**已確認**（ORCID 現職梨花女大教授）。另有分裂檔案 A5104011861 |
| S24 | 胡祥恩（Xiangen Hu） | 香港理工大學講座教授、高等教育研究及發展院院長 | 2024 專題（人類智慧遇見人工智慧）、2025 座談（生成式 AI 於教育現場） | A5015950959；ORCID 0000-0001-9045-4070。**已確認**（ORCID 現職香港理工大學講座教授） |

## 2e. A4 歷屆臺灣學術講者（2023–2025，6 位，只列已確認）

> 英文姓名為推測拼法，依 OpenAlex 檔案與單位比對。

| ID | 學者 | 單位與職稱（當年論壇所載） | 年份與角色 | OpenAlex／ORCID 與確認 |
|---|---|---|---|---|
| T10 | 吳穎沺 | 2023 國立中央大學教授；2025 教育部資訊及科技教育司司長 | 2023 與談；2025 專題（國小教師 AI-TPACK）與座談主持 | Ying-Tien Wu：A5062421922；ORCID 0000-0001-9494-2848。**已確認**（ORCID 現職中央大學） |
| T12 | 楊子奇 | 國立陽明交通大學副教授 | 2025 座談：教育大數據分析 | Tzu-Chi Yang：A5070980933；ORCID 0000-0002-7721-5902。**已確認**（ORCID 現職陽明交大副教授） |
| T14 | 蔡今中 | 國立臺灣師範大學講座教授 | 2024 專題：以 PISA 2022 看臺灣數位學習 | Chin-Chung Tsai：A5018045318；ORCID 0000-0001-7744-9971。**已確認**（ORCID 現職臺師大） |
| T19 | 張俊彥 | 國立臺灣師範大學講座教授 | 2023 與談：全球視野下數位學習政策 | Chun-Yen Chang：A5033782932；ORCID 0000-0003-2373-2004。**已確認**（ORCID 現職臺師大講座教授）。檔案混有半導體論文；另有同名臺大教授 A5101477936，勿混用 |
| T21 | 侯惠澤 | 國立臺灣科技大學特聘教授 | 2023 與談：新時代數位學習教學法 | Huei-Tse Hou：A5085454224；ORCID 0000-0003-1783-8830。**已確認**（ORCID 現職臺科大）。另有分裂檔案 A5059055927 |
| T22 | 陳志銘 | 國立政治大學特聘教授 | 2023 與談：應用學習分析提升學習成效 | Chih-Ming Chen：A5102019604；ORCID 0000-0002-7088-5516。**已確認**（ORCID 現職政大）。同名者多（中興大學材料、推薦系統），勿混用；A5009476853 同 ORCID 但混入大氣科學論文 |

## 3. B 擴充（9 位，只列已確認）

| ID | 學者 | 單位（ORCID 現職） | 為何列入 | OpenAlex／ORCID 與確認 |
|---|---|---|---|---|
| S06 | Lixiang Yan | 清華大學助理教授（ORCID；Monash 研究員任職於 2025 年結束） | Gašević 的主要共同作者；Agentivism、表現與學習之分 | ORCID 0000-0003-3818-045X。**已確認本人，但 OpenAlex 檔案不可用**：A5041301106 混入大量醫學論文，A5016844140 只有少數作品。實測以 ORCID 篩選 2026 年作品（20 筆）仍帶出醫學論文，所以**一律加教育主題詞，並逐篇看作者單位** |
| S07 | Yizhou Fan | Peking University | 後設認知怠惰、後設認知取徑（與 Gašević、Molenaar 合著） | A5006305255；ORCID 0000-0003-2777-1705。**已確認**（ORCID 現職與單位欄一致） |
| S08 | Samuel Greiff | Technical University of Munich | 生成式 AI 對人類學習的總體評估（Nature Human Behaviour 2024 共同作者） | A5006173637；ORCID 0000-0003-2900-3734。**已確認**（ORCID 現職與單位欄一致） |
| S09 | Jason M. Lodge | The University of Queensland | 表現增益與學習之分（Nature Reviews Psychology 2025 共同作者） | A5069874026；ORCID 0000-0001-6330-6160。**已確認**（ORCID 現職與單位欄一致） |
| S10 | Matti Tedre | University of Eastern Finland | Generation AI 專案主持人；K-12 AI 與運算思維教育 | A5050967195；ORCID 0000-0003-1037-3313。**已確認**（ORCID 現職與單位欄一致） |
| S11 | Juho Kahila | University of Eastern Finland | 兒童資料能動性、AI 素養中的「失敗作為學習機會」 | A5048489248；ORCID 0000-0002-9913-0627。**已確認**（ORCID 現職與單位欄一致） |
| S13 | Roger Azevedo | University of Central Florida | 自主學習的多模態測量（同上回顧共同作者） | A5019212451；ORCID 0000-0002-5018-6232。**已確認**（ORCID 現職與單位欄一致） |
| S14 | Maria Bannert | Technical University of Munich | 即時個人化鷹架（FLoRA 研究群） | A5052257833；ORCID 0000-0001-7045-2764。**已確認**（ORCID 現職與單位欄一致） |
| S15 | Hamsa Bastani | University of Pennsylvania Wharton School | PNAS 2025 高中數學研究（論壇三位講者引用：無護欄的生成式 AI 會傷害學習） | A5075456619；ORCID 0000-0002-8793-4732。**已確認**（ORCID 現職與單位欄一致） |

## 3b. H 高被引 AI 素養論文作者（33 位，只列已確認）

> 選取方式（2026-10-09，OpenAlex）：題名含「AI literacy」或「artificial intelligence literacy」的作品，依被引次數取前 60 篇；納入前 30 篇的第一或最後作者，以及在前 60 篇中出現 2 篇以上的作者，共 56 位。其中 OpenAlex 檔案附 ORCID、且 ORCID 有公開現職紀錄者列為**已確認**，列於下表；其餘 23 位列在附錄。被引次數為查詢當日 OpenAlex 數值，會變動；不同資料庫數字不同。這是依被引數的機械篩選，不代表研究品質，也不限 K-12（部分作者研究醫學、管理或高等教育的 AI 素養）。每月依作者檢索。

| ID | 學者 | ORCID 現職 | 前 60 名內的 AI 素養論文（名次、年份、題名、出處、被引數） | OpenAlex／ORCID 與確認 |
|---|---|---|---|---|
| H01 | Duri Long | Northwestern University/Assistant Professor | #1 2020〈What is AI Literacy? Competencies and Design Considerations〉CHI Conference on Human Factors in Computing Systems，被引 2988；#55 2021〈Co-Designing AI Literacy Exhibits for Informal Learning Spac…〉Proceedings of the ACM on Human-Computer Interaction，被引 128 | A5035682073；ORCID 0000-0001-7613-0029。**已確認** |
| H02 | Davy Tsz Kit Ng | The Education University of Hong Kong/Assistant Professor | #2 2021〈Conceptualizing AI literacy: An exploratory review〉Computers and Education Artificial Intelligence，被引 2019；#9 2021〈AI Literacy: Definition, Teaching, Evaluation and Ethical Is…〉Proceedings of the Association for Information Science and Technology，被引 518；#10 2023〈Artificial Intelligence (AI) Literacy in Early Childhood Edu…〉Computers and Education Artificial Intelligence，被引 476（共 6 篇） | A5061992787；ORCID 0000-0002-2380-7814。**已確認** |
| H03 | Jac Ka Lok Leung | Hong Kong University of Science and Technology/Lecturer I, Division of Integrative Systems and Design | #2 2021〈Conceptualizing AI literacy: An exploratory review〉Computers and Education Artificial Intelligence，被引 2019；#9 2021〈AI Literacy: Definition, Teaching, Evaluation and Ethical Is…〉Proceedings of the Association for Information Science and Technology，被引 518；#14 2023〈Design and validation of the AI literacy questionnaire: The …〉British Journal of Educational Technology，被引 369（共 4 篇） | A5055574300；ORCID 0000-0001-6490-7005。**已確認** |
| H04 | Maggie Shen Qiao | Education University of Hong Kong | #2 2021〈Conceptualizing AI literacy: An exploratory review〉Computers and Education Artificial Intelligence，被引 2019；#9 2021〈AI Literacy: Definition, Teaching, Evaluation and Ethical Is…〉Proceedings of the Association for Information Science and Technology，被引 518 | A5031505975；ORCID 0000-0001-8268-4802。**已確認** |
| H05 | Tianyi Yuan | Tsinghua University | #4 2022〈Measuring user competence in using artificial intelligence: …〉Behaviour and Information Technology，被引 993 | A5072053715；ORCID 0000-0002-7134-130X。**已確認** |
| H06 | Lorena Casal Otero | Universidade de Santiago de Compostela/Senior University Lecturer | #5 2023〈AI literacy in K-12: a systematic literature review〉International Journal of STEM Education，被引 696 | A5057389396；ORCID 0000-0002-0906-4321。**已確認** |
| H07 | Senén Barro | Universidade de Santiago de Compostela - Campus Vida/Catedrático de Ciencias de la Computación e Inteligencia Artificial | #5 2023〈AI literacy in K-12: a systematic literature review〉International Journal of STEM Education，被引 696 | A5033266665；ORCID 0000-0001-6035-540X。**已確認** |
| H08 | Jane Southworth | University of Florida/Professor | #6 2023〈Developing a model for AI Across the curriculum: Transformin…〉Computers and Education Artificial Intelligence，被引 637 | A5007456103；ORCID 0000-0002-7246-7879。**已確認** |
| H09 | Matthias Carl Laupichler | Universitätsklinikum Bonn/Research Assistant | #7 2022〈Artificial intelligence literacy in higher and adult educati…〉Computers and Education Artificial Intelligence，被引 634；#27 2023〈Development of the “Scale for the assessment of non-experts’…〉Computers in Human Behavior Reports，被引 251；#41 2024〈Medical students’ AI literacy and attitudes towards AI: a cr…〉BMC Medical Education，被引 162（共 4 篇） | A5013041617；ORCID 0000-0003-3104-1123。**已確認** |
| H10 | Tobias Raupach | University of Bonn/Director | #7 2022〈Artificial intelligence literacy in higher and adult educati…〉Computers and Education Artificial Intelligence，被引 634；#27 2023〈Development of the “Scale for the assessment of non-experts’…〉Computers in Human Behavior Reports，被引 251；#41 2024〈Medical students’ AI literacy and attitudes towards AI: a cr…〉BMC Medical Education，被引 162（共 4 篇） | A5035935031；ORCID 0000-0003-2555-8097。**已確認** |
| H11 | Thomas K. F. Chiu | Chinese University of Hong Kong/Professor | #8 2024〈What are artificial intelligence literacy and competency? A …〉Computers and Education Open，被引 532；#14 2023〈Design and validation of the AI literacy questionnaire: The …〉British Journal of Educational Technology，被引 369 | A5023880578；ORCID 0000-0003-2887-5477。**已確認** |
| H12 | Katarina Sperling | Linköpings Universitet/Affiliated researcher | #11 2024〈In search of artificial intelligence (AI) literacy in teache…〉Computers and Education Open，被引 469 | A5035716427；ORCID 0000-0003-0664-3640。**已確認** |
| H13 | Linnéa Stenliden | Linköping University/Ass. Professor / Bitr. Professor | #11 2024〈In search of artificial intelligence (AI) literacy in teache…〉Computers and Education Open，被引 469 | A5045117039；ORCID 0000-0002-3115-9060。**已確認** |
| H14 | Helen Zhang | Boston College | #12 2022〈Integrating Ethics and Career Futures with Technical Learnin…〉International Journal of Artificial Intelligence in Education，被引 390 | A5011323930；ORCID 0000-0001-8495-6920。**已確認** |
| H15 | Safinah Ali | New York University/Assistant Professor | #12 2022〈Integrating Ethics and Career Futures with Technical Learnin…〉International Journal of Artificial Intelligence in Education，被引 390；#20 2021〈Developing Middle School Students' AI Literacy〉ACM Technical Symposium on Computer Science Education (SIGCSE)，被引 288 | A5003895851；ORCID 0000-0003-1543-6301。**已確認** |
| H16 | Daniella DiPaola | Massachusetts Institute of Technology | #12 2022〈Integrating Ethics and Career Futures with Technical Learnin…〉International Journal of Artificial Intelligence in Education，被引 390；#20 2021〈Developing Middle School Students' AI Literacy〉ACM Technical Symposium on Computer Science Education (SIGCSE)，被引 288 | A5029252194；ORCID 0000-0003-4762-2838。**已確認** |
| H17 | Cynthia Breazeal | Massachusetts Institute of Technology | #12 2022〈Integrating Ethics and Career Futures with Technical Learnin…〉International Journal of Artificial Intelligence in Education，被引 390；#20 2021〈Developing Middle School Students' AI Literacy〉ACM Technical Symposium on Computer Science Education (SIGCSE)，被引 288 | A5108541589；ORCID 0000-0002-0587-2065。**已確認** |
| H18 | Astrid Carolus | Julius-Maximilians-Universität Würzburg | #13 2023〈MAILS - Meta AI literacy scale: Development and testing of a…〉Computers in Human Behavior Artificial Humans，被引 388 | A5090515328；ORCID 0000-0003-2206-2715。**已確認** |
| H19 | Jan Marco Leimeister | University of St. Gallen/Chair Professor, Director | #15 2024〈AI literacy and its implications for prompt engineering stra…〉Computers and Education Artificial Intelligence，被引 361 | A5031171331；ORCID 0000-0002-1990-2894。**已確認** |
| H20 | Teng Yu | University of Surrey/Postdoctoral researcher | #16 2024〈Factors Influencing University Students’ Behavioral Intentio…〉International Journal of Human-Computer Interaction，被引 349 | A5071067826；ORCID 0000-0001-5198-7261。**已確認** |
| H21 | Siu Cheung Kong | The Education University of Hong Kong/Research Chair Professor of e-Learning and Digital Competency | #17 2021〈Evaluation of an artificial intelligence literacy course for…〉Computers and Education Artificial Intelligence，被引 332；#42 2024〈Developing an artificial intelligence literacy framework: Ev…〉Computers and Education Artificial Intelligence，被引 162；#51 2022〈Evaluating artificial intelligence literacy courses for fost…〉Computers in Human Behavior Reports，被引 132（共 4 篇） | A5049617212；ORCID 0000-0002-8691-3016。**已確認** |
| H22 | William Man-Yin Cheung | University of Hong Kong/Principal Lecturer | #17 2021〈Evaluation of an artificial intelligence literacy course for…〉Computers and Education Artificial Intelligence，被引 332；#42 2024〈Developing an artificial intelligence literacy framework: Ev…〉Computers and Education Artificial Intelligence，被引 162；#51 2022〈Evaluating artificial intelligence literacy courses for fost…〉Computers in Human Behavior Reports，被引 132（共 4 篇） | A5000814220；ORCID 0000-0002-8576-6464。**已確認** |
| H23 | Guo Zhang | La Trobe University/Lecturer | #17 2021〈Evaluation of an artificial intelligence literacy course for…〉Computers and Education Artificial Intelligence，被引 332 | A5101564147；ORCID 0000-0003-2370-381X。**已確認** |
| H24 | Omaima Almatrafi | King Abdulaziz University/Assistant Professor | #18 2024〈A systematic review of AI literacy conceptualization, constr…〉Computers and Education Open，被引 322 | A5019672674；ORCID 0000-0003-2105-2275。**已確認** |
| H25 | Tomáš Lintner | Masaryk University/Assistant Professor | #21 2024〈A systematic review of AI literacy scales〉npj Science of Learning，被引 271 | A5066574134；ORCID 0000-0002-1448-4064。**已確認** |
| H26 | Karin Stolpe | Linköping University/Senior associate professor | #22 2024〈Artificial intelligence literacy for technology education〉Computers and Education Open，被引 266 | A5051985957；ORCID 0000-0002-6859-1420。**已確認** |
| H27 | Jonas Hällström | Linköping University/Full Professor of Technology Education | #22 2024〈Artificial intelligence literacy for technology education〉Computers and Education Open，被引 266 | A5031187250；ORCID 0000-0003-0829-3349。**已確認** |
| H28 | Marie Hornberger | Leibniz Institute for Educational Trajectories/Research Associate | #23 2023〈What do university students know about Artificial Intelligen…〉Computers and Education Artificial Intelligence，被引 264；#46 2024〈AI advocates and cautious critics: How AI attitudes, AI inte…〉Computers and Education Artificial Intelligence，被引 140 | A5000415562；ORCID 0009-0006-3682-2358。**已確認** |
| H29 | Arne Bewersdorff | University of Georgia | #23 2023〈What do university students know about Artificial Intelligen…〉Computers and Education Artificial Intelligence，被引 264；#46 2024〈AI advocates and cautious critics: How AI attitudes, AI inte…〉Computers and Education Artificial Intelligence，被引 140 | A5015478550；ORCID 0000-0002-9725-268X。**已確認** |
| H30 | İsmail Çelik | University of Oulu/Academy Research Fellow, Docent | #25 2023〈Exploring the Determinants of Artificial Intelligence (AI) L…〉Telematics and Informatics，被引 263 | A5019795328；ORCID 0000-0002-5027-8284。**已確認** |
| H31 | Heng Luo | Central China Normal University/Professor | #28 2022〈Developing AI Literacy for Primary and Middle School Teacher…〉Sustainability，被引 238 | A5029326556；ORCID 0000-0002-6551-8885。**已確認** |
| H32 | Alexander Benlian | Technische Universitat Darmstadt/Professor | #29 2024〈AI literacy for users – A comprehensive review and future re…〉Computers in Human Behavior Artificial Humans，被引 236 | A5082912598；ORCID 0000-0002-7294-3097。**已確認** |
| H33 | Ahlam Mohammed Al-Abdullatif | King Faisal University/Associate Professor | #40 2024〈Modeling Teachers’ Acceptance of Generative Artificial Intel…〉Education Sciences，被引 162；#60 2024〈ChatGPT in Learning: Assessing Students’ Use Intentions thro…〉Behavioral Sciences，被引 121 | A5078581123；ORCID 0000-0003-2815-1137。**已確認** |

## 4. C 政策與實務窗口（不依作者檢索）

### 4a. 2026 年

| ID | 人物 | 機構 | 追蹤方式 |
|---|---|---|---|
| P01 | Hai Siang Chia | 新加坡教育部 Principal Specialist（Student Learning Space） | 追 MOE Rapid Research 專頁、EdTech Masterplan 2030 |
| P02 | Jongwon Seo | 韓國教育學術情報院（KERIS）Director | 追韓國教育部、KERIS 的教師 AI 與數位素養框架修訂 |
| P03 | Liina Kanter | 愛沙尼亞教育及青年局（HARNO）教育創新部主任 | 追 AI Leap（AI 躍進）計畫與 HARNO 公告 |
| P05 | 林瑋茹 | 教育部師資培育及藝術教育司專門委員 | 追智慧教育師培聯盟（子計畫六）與師藝司公告 |
| P06 | 徐臺屏 | 臺北市日新國小 | 學校實務講者（座談二）。OpenAlex 有一檔案可能是本人：Tai-Ping Hsu，A5067092156，ORCID 0000-0003-1787-9173，臺師大，主題為 AI 教育與遊戲式學習；ORCID 無任職紀錄，**待確認** |
| P07 | 施信源 | 新北市鳳鳴國小教師 | 學校實務講者（座談一）：萬人 Gemini Pro 導入問卷 |
| P08 | 蔡明貴 | 新北市永福國小校長 | 學校實務講者（座談二）；論壇官網有列，整理文件未見其內容 |

### 4b. 2023–2025 年

| ID | 人物 | 機構與職稱（當年論壇所載） | 年份與角色 |
|---|---|---|---|
| P09 | Masatomo Tani | 日本教育 ICT 政策諮詢組織（JEIPO）代表理事 | 2024：日本 GIGA 計畫現況與未來 |
| P10 | Actchara Srevattanangkul | 泰國教育部基礎教育委員會辦公室資深教育專員 | 2025：泰國數位學習 |
| P11 | Justus Lenz | 德國 Friedrich Naumann 自由基金會 Liberal Institute 主任 | 2025：聯邦制教育體系的數位轉型 |
| P12 | Dominique Dallas | 美國科學家聯合會（FAS）Education Impact Fellow | 2025：教育體系的數位準備度與 AI 素養 |
| P13 | 何世敏 | 香港中文大學專業顧問 | 2024 座談：生成式 AI 在不同領域的應用 |
| P14 | 潘文忠 | 教育部部長（2023） | 2023 致詞 |
| P15 | 劉孟奇 | 教育部政務次長（2023） | 2023 圓桌主持 |
| P16 | 陳守正 | 台灣微軟總經理（2023） | 2023 與談：生成式 AI 輔助數位學習 |
| P17 | 高誌健 | 臺南市政府教育局資訊中心主任 | 2025 座談：生成式 AI 於教育現場 |
| P18 | 陳錫安 | 臺北市數位學習教育中心系統組組長 | 2025 座談：生成式 AI 於教育現場 |
| P19 | 陳思如 | 新北市政府教育局教育網路中心組長 | 2025 座談：教育大數據分析 |
| P20 | 楊宗榮 | 臺中市豐原區翁子國小主任 | 2023 圓桌、2024 座談 |
| P21 | 王政忠 | 南投縣立爽文國中教師 | 2023 圓桌 |
| P22 | 張啟中 | 國立中興大學附屬高中秘書 | 2024 座談：生成式 AI 在不同領域的應用 |
| P23 | 林穎俊 | 宜蘭縣立中山國小教師 | 2024 座談：生成式 AI 在不同領域的應用 |
| P24 | 蕭宜君 | 國立彰化女中教師 | 2024 座談：雙語數位學習 |
| P25 | 林健豐 | 高雄市立右昌國中教師 | 2024 座談：雙語數位學習 |
| P26 | 林玉姬 | 臺北市南港國小教師 | 2024 座談：雙語數位學習 |

## 5. 檢索方式

- **OpenAlex**：有 ORCID 者用 `/works?filter=author.orcid:<ORCID>,from_publication_date:<窗口起日>`；沒有 ORCID 者用已確認的作者 ID（`author.id:<ID>`）。著作量大或跨領域的學者（如 T03、T04、T07）加教育主題詞。要找週報、月報候選時，再加 K-12 主題詞（例如 school、K-12、primary、secondary、teacher、child）。一次查詢的布林運算子不要超過約 5 個（超過會 429），也不要用萬用字元（會 400）。
- **ORCID**：同名者多時，以 ORCID 為準。
- **預印本**：arXiv、PsyArXiv 依作者名檢索；預印本只能當候選線索，查到期刊正式版再改用正式版。
- **搜尋紀錄**：依作者檢索也要寫入 `search_runs.csv`；查詢失敗記為失敗，不記為零命中。

## 6. 待辦

1. 尚未解決：見附錄待確認名單；S05 Yasushi Mori 的日文姓名與 researchmap；P06 徐臺屏的 OpenAlex 檔案是否為本人；（T04 確認無公開 ORCID；T07 已確認）。
2. 核對第 2 節論壇所列著作的書目（DOI、卷期、預印本編號），符合者依知識庫流程入庫，並逐篇判斷學段。
3. 試跑一次依作者檢索（建議 A1、A2 中已確認者，近 90 天），評估命中數與 K-12 比例，再決定每週或每月的頻率。

## 附錄：待確認名單（暫不列入檢索）

管理者 2026-10-09 決定先只列已確認者。以下人物身分尚未確認，暫不依作者檢索；確認後移回正表。

### 論壇講者與擴充學者

| ID | 姓名 | 目前狀態 |
|---|---|---|
| S05 | Yasushi Mori | **未找到**：OpenAlex 以茨城大學篩選查無此人（同名者分屬岡山大學等，均非本人）。日文姓名與 researchmap 頁待查；可能主要以日文發表 |
| T04 | 劉遠楨 | Yuan-Chen Liu：A5029607042（北教大）。**大致確認**：單位與資訊、教育領域相符；無公開 ORCID（管理者確認），只能用 OpenAlex 檔案，檔案混有醫學影像等論文（可能是本人的資訊研究，也可能混入同名者）；另有小檔案 A5017336861、A5024743533、A5093536863。依作者找到的論文須逐篇看單位 |
| T08 | 葉家宏 | Chia-Hung Yeh：A5012962861；ORCID 0000-0002-2837-6662。**大致確認**：ORCID 現職為臺師大電機系特聘教授、科技與工程學院副院長，與官網「臺師大特聘教授」相符，但 ORCID 未列教育部職務，英文拼法為推測。研究以影像與視訊處理為主，檢索須加教育主題詞 |
| S17 | Tatsuya Horita（堀田龍也） | A5112237308；ORCID 0000-0001-7296-0463。**大致確認**（單位、教育科技主題相符；ORCID 無公開任職紀錄） |
| S19 | Ben Leong | A5002787275；ORCID 0000-0003-1738-5958。**大致確認**（ORCID 現職新加坡國立大學副教授；論文以網路通訊為主，ORCID 未列 AICET） |
| S21 | Hyeon-Cheol Kim | A5021651278；ORCID 0000-0003-0555-8591。**大致確認**：主題含 AI 教育，但檔案混有地質論文；另有分裂檔案 A5061889586（同 ORCID）。同名牙醫、醫師多，勿混用 |
| S22 | Natalie Lao | A5079275123（MIT）。**大致確認**（無 ORCID；程式教育主題相符） |
| T09 | 莫慕貞 | Magdalena Mo Ching Mok：A5017750244；ORCID 0000-0002-6503-8152。**大致確認**（臺中教大、測驗與教育主題相符；ORCID 無任職紀錄） |
| T11 | 陳世文 | **待確認**：東華大學只找到 1 篇的小檔案 A5135839118（Shih-Wen Chen） |
| T13 | 張道宜 | **未找到** |
| T15 | 陳浩然 | Howard Hao-Jan Chen：A5004951634；ORCID 0000-0002-8943-5689。**大致確認**（英語教學主題相符；ORCID 無任職紀錄）。另有分裂檔案 |
| T16 | 吳慧珉 | **待確認**：臺中教大有 Huey-Min Wu（A5015947753），但主題為兒童動作發展，未必是本人 |
| T17 | 王雅茵 | **未找到** |
| T18 | 楊鎮華 | Stephen J.H. Yang：A5039275245；ORCID 0000-0003-1059-620X。**大致確認**（中央大學、學習分析主題相符；ORCID 無任職紀錄） |
| T20 | 黃思華 | **未找到** |
| T23 | 吳俊育 | Jiun-Yu Wu：A5054803462；ORCID 0000-0002-3160-9658。**大致確認**（學習分析主題相符；ORCID 任職紀錄未更新） |
| T24 | 黃孝雲 | **未找到**：輔仁大學同名檔案均為醫學論文 |
| T25 | 曾憲雄 | Shian-Shyong Tseng：A5108465870；ORCID 0000-0003-0760-5224。**大致確認**（智慧教學系統主題相符；ORCID 無任職紀錄） |
| T26 | 葉丙成 | Ping-Cheng Yeh：A5102196683。**大致確認**（臺大；無 ORCID；論文以無線通訊為主，檢索須加教育主題詞） |
| T27 | 楊思偉 | **待確認**：只有 1 篇的小檔案（A5108184828 等），主題為高教治理 |
| T28 | 鄭淵全 | **未找到**：OpenAlex 無國家教育研究院機構資料，依姓名查無相符者 |
| S12 | Sanna Järvelä | A5054198262；ORCID 0000-0001-6223-3668。**大致確認**（OpenAlex 檔案 ORCID 相同、單位奧盧大學；ORCID 無公開任職紀錄） |
| S16 | Fengchun Miao | A5019417534（無 ORCID）。**大致確認**（OpenAlex 單位 UNESCO）；收錄少，建議改追 UNESCO 出版 |

### 高被引 AI 素養論文作者（未確認）

| 姓名 | 前 60 名內的論文名次 | 未列入原因 |
|---|---|---|
| Brian Magerko（A5070099167） | #1, #55 | ORCID 無公開現職紀錄 |
| Samuel Kai Wah Chu（A5013895875） | #2, #10, #14, #24, #33 | ORCID 無公開現職紀錄 |
| Yoshija Walter（A5078892242） | #3 | ORCID 無公開現職紀錄 |
| Bingcheng Wang（A5059927190） | #4 | ORCID 無公開現職紀錄 |
| Aaron Thomas（A5102274032） | #6 | OpenAlex 檔案無 ORCID |
| Alexandra Aster（A5019405964） | #7, #27, #41, #44 | ORCID 無公開現職紀錄 |
| Ismaila Temitayo Sanusi（A5076869143） | #8 | ORCID 無公開現職紀錄 |
| Jiahong Su（A5012595132） | #10, #33 | ORCID 無公開現職紀錄 |
| Irene A. Lee（A5101948816） | #12, #20 | ORCID 無公開現職紀錄 |
| Carolin Wienrich（A5011213220） | #13 | ORCID 無公開現職紀錄 |
| Nils Knoth（A5095764701） | #15 | ORCID 無公開現職紀錄 |
| Chengliang Wang（A5049452519） | #16 | ORCID 只列期刊編輯職務，OpenAlex 檔案單位混雜 |
| Hyuna Lee（A5111157356） | #18 | OpenAlex 檔案無 ORCID |
| Stefania Druga（A5062766716） | #19 | ORCID 無公開現職紀錄 |
| Tammy Qiu（A5053679815） | #19 | OpenAlex 檔案無 ORCID |
| Claudia Nerdel（A5063270174） | #23, #46 | ORCID 無公開現職紀錄 |
| Elena A. Wood（A5087940705） | #26 | ORCID 無公開現職紀錄 |
| D. Douglas Miller（A5038726741） | #26 | ORCID 無公開現職紀錄 |
| Leilei Zhao（A5004825018） | #28 | ORCID 無公開現職紀錄 |
| Marc Pinski（A5005229831） | #29 | ORCID 無公開現職紀錄 |
| Peter Wilson Cardon（A5034996327） | #30 | ORCID 無公開現職紀錄 |
| Jeanette Heidewald（A5092054609） | #30 | OpenAlex 檔案無 ORCID |
| Olson Tsang（A5012410522） | #42, #58 | OpenAlex 檔案無 ORCID |
