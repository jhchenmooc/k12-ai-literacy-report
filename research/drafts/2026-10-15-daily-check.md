# 每日短訊查核紀錄：2026-10-15（0 則）

> 每日短訊例行作業，由排程觸發，編輯 session 執行（檢索由同 session 子代理執行，判讀由編輯 session 複核）。查詢時間 2026-10-15T00:23Z–00:40Z（UTC）。請求未帶 email 或 mailto；遇 403 或機器人驗證都未繞過。結果：**無合格短訊，不建頁、不登記**。監測清單出處命中 J31 一筆 A 類論文，但對象學段不明、出版者頁面無法讀取；官方來源只有中國教育部 10-14 一則在一句話提到 AI 素養培訓。清單外 5 筆 K–12 相關論文列觀察交管理者決定。本日起 KERIS 改用新聞列表網址（管理者 2026-10-14 更正）。

## 查詢

| 來源 | 查詢 | 狀態 | 結果 |
|---|---|---|---|
| Crossref | `filter=from-created-date:2026-10-14,until-created-date:2026-10-14,type:journal-article`，六組 `query.bibliographic`（同 10-11）；每組取前 40 筆 | 200（第 2 組首次 429，重試 200） | 去重 192 筆；題名加摘要同時含 AI 與學校／學生／教師字詞者 58 筆，逐筆看上線日、學段與範圍；監測清單出處命中 J31、J10、J29（2 筆）、J47（2 筆） |
| 出版者頁面（doi.org，各試一次） | 7 筆 | Frontiers 200；Springer 回 JavaScript 攔截頁；ScienceDirect、ASM、SAGE、T&F、MDPI 皆 403 | 只有 Frontiers 一筆讀到原頁 |
| arXiv API | 同 10-14 兩組查詢，依提交日排序，各取 40 筆 | 200 | AI 素養查詢 10-07 起只有已判過的 2610.10743；加廣查詢新見 2610.16344（10-12 提交），其餘屬 C 或與 K–12 無關 |
| alphaXiv | discover_papers，AI literacy／K-12／children／generative AI／teachers，2026-10-08 起（只作發現） | ok | 2610.12834（已判過）、2610.16344；另一筆非 arXiv 編號的結果以 arXiv 題名查詢未找到，不採用 |
| GOV.UK Search API | q=artificial intelligence schools，2026-10-08 起（依日期與相關度）；DfE 10-13 起；Content API 讀 3 頁 | 200 | 無 AI 教育項目；DfE 10-14 學校資料保護清單見「不匯入」 |
| Federal Register API | term artificial intelligence education，2026-10-08 起；ED 機關篩選 | 200 | 2 筆與 3 筆，皆與 K–12 AI 素養無關 |
| MEXT | 首頁與報道発表列表 | 200 | 10-08～10-14 無 AI 相關項目 |
| 中國教育部 | 工作動態、教育部文件、中央文件列表；10-14 一則原頁 | 200 | 10-14〈雄安教师发展中心成立暨组团式教师轮岗实训研修开班活动举行〉見下；10-14 AI 素養專區報導已於週報前檢查處理，不重複列 |
| 香港政府新聞公報 | 2026-10-14、10-15 中英文列表；5 則新聞原頁 | 200 | 10-14 無 AI 教育項目（智能算力質詢、創科局長演講、智方便 AI 助理屬 C）；10-15 讀取時（香港 08:26）當日公報尚未上載 |
| 韓國 KICE | 보도자료列表 boardID=10024 | 200 | 只有已判 C 的 10-14 英語基本詞彙一則 |
| 韓國教育部 | 보도자료列表（moe.go.kr boardID=294） | 第一次連線失敗，第二次 200 | 10-08～10-14 共 6 則，題名皆與 AI 無關 |
| KERIS | 보도자료列表 mi=1088&bbsId=1090（新網址） | 200 | 最新仍為 10-07 一則（已判過） |
| UNESCO | articles 列表，經 WebFetch；同頁以 curl 讀原頁 | ok／200 | 本日 curl 讀到原頁，內容與 WebFetch 一致；10-08～10-14 無 AI 教育項目 |

查詢的限制：Crossref 每組只看依相關度排序的前 40 筆，不是全量篩選；登記日不等於上線日。政策來源只查上列列表，未查者不代表當天沒有發布。

## 初篩結果

### 可發布候選

無。最接近的兩筆：

| 項目 | 首次公開 | 範圍 | 對象 | 未發布原因 |
|---|---|---|---|---|
| 中國教育部〈雄安教师发展中心成立暨组团式教师轮岗实训研修开班活动举行〉 http://www.moe.gov.cn/jyb_xwfb/gzdt_gzdt/moe_1485/202610/t20261014_1454169.html | 2026-10-14（原頁，編輯 session 讀原頁確認） | 主要內容是教師發展中心與教師輪崗；AI 只在「下一步」一句：「充分整合国家智慧教育平台等优质数字资源，推进人工智能素养全覆盖培训」，另有「数智赋能」一詞。依「主要內容」規則不判 A，屬邊界 | k12（京雄兩地中小學教師） | 範圍不符；列請管理者決定是否作為週報 10-10 教師 AI 事件的補充 |
| `10.1186/s40594-026-00653-8` AI literacy and STEM education: emerging frontiers and research priorities（International Journal of STEM Education，J31） | 2026-10-14（僅 Crossref；Springer 頁為 JavaScript 攔截頁） | A（S-BAS、S-ETH、S-LRN、T-TEA） | unknown（摘要只寫 students、educators and learners，未限定學段） | 對象不明、原頁讀不到 |

### 列觀察，交管理者決定（出處不在監測清單）

| 項目 | 首次公開 | 範圍 | 對象 | 說明 |
|---|---|---|---|---|
| `10.3389/fpsyg.2026.1987633` Generative AI literacy profiles differ in academic self-efficacy and subjective well-being among adolescents | 2026-10-14（原頁；`citation_online_date` 10-02 為接受日，未採用） | A（S-ETH、S-LRN、S-BAS） | k12（韓國國高中生 3,959 人） | Frontiers in Psychology；監測清單 J29 只含 Frontiers in Education |
| `10.1128/jmbe.00101-26` Developing a generative AI chatbot to support students' higher-order thinking in STEM education | 2026-10-14（僅 Crossref；ASM 頁 403） | B（S-LRN） | k12（五、六年級 33 人） | Journal of Microbiology & Biology Education；小型概念驗證 |
| arXiv 2610.16344 STEPwise: Supporting Teachers in Diagnosing Students' Mathematical Problem-Solving Skills through LLM-Generated Questions and Rubric | 2026-10-12（abs 頁） | B（T-TEA） | 學段未寫明（5 名教師、64 名學生），暫記 unknown | 預印本，cs.HC |
| `10.1177/08920206261494941` Tools versus rules: School leaders as protectors of collective professional capital under the shock of generative AI | 2026-10-14（僅 Crossref；SAGE 頁 403） | A（T-BAS、T-ETH） | 邊界：研究所領導課程的 17 名學員，寫 P-12 學校情境，較接近 teacher_ed | Management in Education |
| `10.1080/1034912x.2026.2745047` Reconceptualizing Teacher–AI Partnership in Inclusive Education | 2026-10-14（僅 Crossref；T&F 頁 403） | 不明（無摘要） | 不明 | Int. J. of Disability, Development and Education |

### 不匯入

| 項目 | 處理 |
|---|---|
| `10.1016/j.chb.2026.109219`（J10，教育 App 選擇） | Crossref 只有 2026-10 印刷日、無摘要；ScienceDirect 403，日期與對象無法核實 |
| `10.3390/educsci16101707`（J47） | 以 LLM 分析 arXiv 文獻的後設研究，不限學段，C／B 邊界，非 k12 |
| `10.3390/educsci16101715`（J47） | C（機器學習預測教師倦怠） |
| `10.3389/feduc.2026.1963902`（J29） | higher_ed |
| `10.3389/feduc.2026.1968133`（J29） | teacher_ed（職前物理教師），A（T-TEA）；月報可收 |
| `10.3390/su182010454`、`10.14333/kjte.2026.42.5.18` | teacher_ed |
| `10.34238/tnu-jst.15697`、`10.34238/tnu-jst.13490` | k12，但上線日（08-19、04-21）早於窗口 |
| 其餘 Crossref 命中（醫護、大學、商管、勘誤、C 類，或上線日早於 10-08） | 不收 |
| GOV.UK DfE〈Data (Use and Access) Act 2025 (DUAA): compliance checklist for schools〉（10-14） | 主要內容為一般資料保護法遵，含「Automated decision-making and AI」小節；依主要內容判 C |
| HK、MEXT、Federal Register、韓國教育部、KICE、KERIS、UNESCO 各項 | 屬 C 或無 AI 教育內容 |

本日未命中不收出處。

## 需要管理者處理

- **出版者頁 403 或攔截，如需請提供 PDF 或頁面截圖：** https://doi.org/10.1186/s40594-026-00653-8 （J31）、 https://doi.org/10.1016/j.chb.2026.109219 （J10）、 https://doi.org/10.1128/jmbe.00101-26 、 https://doi.org/10.1177/08920206261494941 、 https://doi.org/10.1080/1034912x.2026.2745047
- **中國教育部 10-14 雄安教師發展中心報導**：是否作為週報 10-10「人工智能赋能教师发展现场会」事件的補充（只一句提到「推进人工智能素养全覆盖培训」）。

## 既有候選池

候選池 24 筆不變，publish 11 筆（A14–A24）。
