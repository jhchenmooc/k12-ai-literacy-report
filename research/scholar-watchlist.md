# K-12 AI 素養國際學者監測清單 v0.1（草稿）

> 建立日期：2026-10-09。用途：搜尋時可**依作者追蹤**，補足依期刊會議（[venue-watchlist](venue-watchlist.md)）與關鍵字的檢索。這是**監測來源池**，不是學者排名或推薦，也不表示他們的每篇著作都適用 K-12；入選理由只代表與本刊主題的關聯。
>
> 來源：使用者提供的「2026 數位學習國際論壇（IFDE 2026，2026/8/6–8/7，高雄，教育部資訊及科技教育司主辦）」整理文件兩份。這兩份是內部文件，未公開，也**未放入 repo**；本清單只摘錄學者姓名、公開職稱與單位，以及其公開著作的書目。

## 0. 使用規則

- **只收公開的專業資訊**：姓名、公開職稱與單位、研究主題、公開著作書目。不收電子郵件、電話或其他個人資料（論壇文件中出現的聯絡信箱一律不錄）。
- **職稱、單位**依論壇資料（2026 年 8 月）所載；人會異動，使用前以機構頁為準。
- **OpenAlex 作者 ID 是自動比對的候選結果，尚未人工確認**。同名或作者合併錯誤時，依作者搜尋可能混入他人論文，所以每篇候選仍要回查作者單位與 ORCID。表中標「待確認」者不可直接用 ID 檢索。
- **著作欄是論壇整理所列，尚未核對書目**（尤其預印本編號與 DOI）。正式入庫前，照知識庫流程核對。
- **學段篩選照舊**：這些學者有許多研究以大學生或成人為樣本。依作者找到的論文，仍要逐篇判斷是否明確涉及 K-12，不能因為作者重要就放寬。
- 預印本不是同儕審查的結果；入庫時 `verification_status` 照常從 discovered_unverified 開始。

## 1. 優先級

- **A 核心**：論壇國際學術講者，研究直接處理 AI 時代的學習、教師與 AI 素養。每週依作者檢索新作。
- **B 擴充**：A 級學者的主要共同作者，或論壇中被多位講者引用的研究者。每月檢索。
- **C 政策窗口**：論壇的國際政策講者，不是學術作者。追蹤其所屬機構的政策發布（併入政策來源搜尋），不依作者檢索論文。

## 2. A 核心（5 位）

| ID | 學者 | 單位與角色（論壇所載） | 與本刊相關的主題 | 論壇所列代表著作（未核） | OpenAlex 作者 ID（候選） |
|---|---|---|---|---|---|
| S01 | Mutlu Cukurova | UCL Knowledge Lab；*British Journal of Educational Technology* 總編輯；UNESCO、OECD、歐盟外部專家 | 人機協作三典範（取代、互補、綜效）、教師與 AI 組隊、教師 AI 能力框架 | Miao & Cukurova (2024) UNESCO AI Competency Framework for Teachers；Cukurova (2025) BJET 56(2) hybrid intelligence；Nazaretsky et al. (2022) BJET 53(4) 教師對 AI 的信任 | A5010726815（ORCID 0000-0001-5843-4854） |
| S02 | Dragan Gašević | 論壇所載為香港大學講座教授；學習分析研究學會創辦人；*Computers & Education: AI* 總編輯 | 表現增益不等於學習、後設認知怠惰、Agentivism 學習理論、FLoRA、CELLA 跨國研究 | Yan, Greiff, Teuber & Gašević (2024) Nature Human Behaviour 8(10)；Fan et al. (2025) BJET 56(2) DOI 10.1111/bjet.13544；Yan, Greiff, Lodge & Gašević (2025) Nature Reviews Psychology 4；Gašević & Yan (2026) OECD Digital Education Outlook 2026 | A5036855560（ORCID 0000-0001-9265-1908）；OpenAlex 單位含 Monash，與論壇所載不同，待確認現職 |
| S03 | Inge Molenaar | Radboud University；荷蘭國家教育 AI 實驗室（NOLAI）主持人 | 偵測、診斷、行動框架；六層自動化模型；混合人機調節；低年齡學習者的自主學習 | Molenaar (2022) European Journal of Education 57(4) DOI 10.1111/ejed.12527；Molenaar (2022) Computers and Education: AI 3, 100070；Lim et al. (2024) BJET 55(4) DOI 10.1111/bjet.13414 | A5037990414（ORCID 0000-0003-4639-2524） |
| S04 | Henriikka Vartiainen | 東芬蘭大學；Generation AI 專案工作包主持人 | 兒少 AI 素養教學、資料能動性、共同設計；Generation AI 開放教具（4–8 年級實證） | Vartiainen et al. (2025) New Media & Society DOI 10.1177/14614448241252820（7 年級 N=209）；Kahila et al. (2024) Informatics in Education DOI 10.15388/infedu.2024.15；Pope et al. (2025) IEEE TLT DOI 10.1109/TLT.2025.3529994 | A5083898518（ORCID 0000-0001-6005-907X） |
| S05 | Yasushi Mori | 茨城大學 | 日本 Society 5.0 下的中小學 AI 與 ICT 教育、教師研習 | 論壇引用日本 ICT 教育首長協議會 2026 全國調查（非期刊論文） | **待確認**：OpenAlex 同名者多，前 3 筆都不是茨城大學 |

## 3. B 擴充（11 位）

| ID | 學者 | 單位（OpenAlex 最近單位，未核） | 為何列入 | OpenAlex 作者 ID（候選） |
|---|---|---|---|---|
| S06 | Lixiang Yan | **待確認** | Gašević 的主要共同作者；Agentivism、表現與學習之分 | **待確認**：最相近的結果單位不符（醫學院），ORCID 0000-0003-3818-045X 對到兩個 ID |
| S07 | Yizhou Fan | Peking University | 後設認知怠惰、後設認知取徑（與 Gašević、Molenaar 合著） | A5006305255（ORCID 0000-0003-2777-1705） |
| S08 | Samuel Greiff | Technical University of Munich | 生成式 AI 對人類學習的總體評估（Nature Human Behaviour 2024 共同作者） | A5006173637（ORCID 0000-0003-2900-3734） |
| S09 | Jason M. Lodge | The University of Queensland | 表現增益與學習之分（Nature Reviews Psychology 2025 共同作者） | A5069874026（ORCID 0000-0001-6330-6160） |
| S10 | Matti Tedre | University of Eastern Finland | Generation AI 專案主持人；K-12 AI 與運算思維教育 | A5050967195（ORCID 0000-0003-1037-3313） |
| S11 | Juho Kahila | University of Eastern Finland | 兒童資料能動性、AI 素養中的「失敗作為學習機會」 | A5048489248（ORCID 0000-0002-9913-0627） |
| S12 | Sanna Järvelä | University of Oulu | 自主與共享調節學習；與 Molenaar 合著多模態測量回顧 | A5054198262（ORCID 0000-0001-6223-3668） |
| S13 | Roger Azevedo | University of Central Florida | 自主學習的多模態測量（同上回顧共同作者） | A5019212451（ORCID 0000-0002-5018-6232） |
| S14 | Maria Bannert | Technical University of Munich | 即時個人化鷹架（FLoRA 研究群） | A5052257833（ORCID 0000-0001-7045-2764） |
| S15 | Hamsa Bastani | University of Pennsylvania | PNAS 2025 高中數學研究（論壇三位講者引用：無護欄的生成式 AI 會傷害學習） | A5075456619（ORCID 0000-0002-8793-4732） |
| S16 | Fengchun Miao | UNESCO | UNESCO 教師與學生 AI 能力框架主要作者（政策文件多，OpenAlex 收錄少） | A5019417534（無 ORCID；建議改追 UNESCO 出版） |

## 4. C 政策窗口（3 位，不依作者檢索）

| ID | 人物 | 機構 | 追蹤方式 |
|---|---|---|---|
| P01 | Hai Siang Chia | 新加坡教育部（Student Learning Space） | 追 MOE Rapid Research 專頁、EdTech Masterplan 2030 |
| P02 | Jongwon Seo | 韓國教育學術情報院（KERIS） | 追韓國教育部、KERIS 的教師 AI 與數位素養框架修訂 |
| P03 | Liina Kanter | 愛沙尼亞教育及青年局（HARNO） | 追 AI Leap（AI 躍進）計畫與 HARNO 公告 |

## 5. 檢索方式

- **OpenAlex**（已確認的 ID 才用）：`/works?filter=author.id:<ID>,from_publication_date:<窗口起日>`，再加主題詞篩 K-12（例如 school、K-12、primary、secondary、teacher、student、child）。一次查詢的布林運算子不要超過約 5 個（超過會 429），也不要用萬用字元（會 400）。
- **ORCID**：同名者多時，以 ORCID 為準。
- **預印本**：arXiv、PsyArXiv 依作者名檢索；預印本只能當候選線索，查到期刊正式版再改用正式版。
- **搜尋紀錄**：依作者檢索也要寫入 `search_runs.csv`；查詢失敗記為失敗，不記為零命中。

## 6. 待辦

1. 確認 S02 現職、S05 與 S06 的 OpenAlex 作者 ID（以 ORCID 或機構頁比對）。
2. 核對第 2 節論壇所列著作的書目（DOI、卷期、預印本編號），符合者依知識庫流程入庫，並逐篇判斷學段。
3. 試跑一次依作者檢索（建議 A 級 5 位、近 90 天），評估命中數與 K-12 比例，再決定每週或每月的頻率。
