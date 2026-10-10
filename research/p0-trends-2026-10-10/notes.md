# 知識庫學術紀錄「年份 × 學段」趨勢資料集：規則與限制說明

> **性質：** 這是同一模型用關鍵字規則與既有篩選檔整理出的描述性資料，**不是獨立審閱**，也不是文獻計量研究。產出日 2026-10-10（UTC）。repo 只讀，沒有 commit。

## 1. 範圍

- 來源：`research/knowledge-base/data/records.csv`，record_type 為 journal_article、conference_paper、book_chapter、preprint，共 326 筆（preprint 0 筆）。
- 排除 `research/ai-literacy-c-records.json` 所列 C 類：**1 筆**（KB-2026-0163，資料素養量表），所以 **N = 325**。另外兩筆 C 類（KB-2026-0004、0007）不是學術紀錄，本來就不在範圍內。
- 關聯取自 `relations.csv`：has_category（K1–K6）、has_population（TEACHER_ED，33 筆）、published_in（J／C 代碼，名稱依 `research/venue-watchlist.md`）、studies_country（只有 79 筆有）。

## 2. 年份

- `year`：`year_value`。272 筆是 issue_year（卷期年），47 筆是 first_publication，7 筆 unknown（年份空白，表中列「未知」）。1 筆 2027（已排定 2027 卷期）。
- `first_published_on` 只有 47 筆有值，所以另外給了一張首次公開年的對照表，參考就好。
- **2026 只到 2026-10-10**，不是全年。2025 和 2026 的筆數不能直接比成長；要比就比各年內部的比例。

## 3. 學段（stage）

只取一個主要值，次要值放在 `stage_secondary`（可多選）。判斷依據記在 `stage_basis`：

1. **audit（285 筆）**：比對 `research/p0-*/**/*.json` 與 `research/drafts/*.json`。DOI 一律小寫比對，`formal_doi` 也算；KB-2026-0187 另外對應它的 arXiv DOI。比對的欄位有 population、population_evidence、school_level、school_stage、k12_phrase、audience、k12，以及 has_population=TEACHER_ED。
   - 如果這些欄位只寫泛稱 `k12`，就再用摘要規則細分。細分成功的記為 abstract_rule。
   - 摘要也細分不出來時，再看篩選檔的 `ai_lit_note`（中文判讀說明）有沒有寫學段；還是沒有，就維持 audit 的「K-12 未細分」。
2. **abstract_rule（39 筆）**：OpenAlex 摘要（以 inverted index 重組）＋題名的關鍵字規則。
3. **title_rule（0 筆）**：只看題名。
4. **none（1 筆）**：KB-2025-0003 生物課個案（沒有摘要，題名也沒寫學段），記為「不明」。

**學校層級規則**（英文不分大小寫；中文直接比對）：

- 幼兒/學前：preschool、kindergarten、early childhood、pre-K（不含 pre-K-12）、幼兒、學前。
- 國小：primary school／education／students、elementary、K-2～K-6、小學、國小；1–6 年級；6–11 歲。
- 國中：middle school、junior high、lower secondary、國中、初中；7–9 年級；12–14 歲。
- 高中（含中職）：high school（不含 junior high）、upper／senior secondary、senior high、vocational high、高中、高職、中職、高一到高三；10–12 年級；15–18 歲。
- 年級可以是數字、英文序數（ninth grade）或中文（九年級、6、9 年級）。年齡區間逐歲歸到上述學段，某學段要占 ≥2 歲才算（區間只有 1～2 歲時，占 1 歲就算）。所以 9–11 年級會歸「國中＋高中」，因為臺灣 9 年級屬國中。
- 只寫 secondary／中學／teenagers／adolescents／青少年，沒分國高中：主要值記「K-12 未細分」，次要值加「中學（未分國高中）」（共 37 筆有此旗標）。
- K-12、中小學、school students、school-aged、youth、primary and secondary 這類泛稱：記「K-12 未細分」。
- 出現兩個以上學校層級：記「K-12 跨學段」。

**對象角色規則**（角色判定優先於學校層級；學校層級改放次要值）：

- 職前師培：pre-service、student teachers、teacher candidates、teacher education program、職前、師培、師資生。
  - 摘要規則下，需要題名出現這類詞，或摘要提到 ≥2 次且不少於學生字眼。
  - 知識庫有 TEACHER_ED 關聯的一律記職前師培（33 筆）。
  - 篩選檔同時寫職前和在職、但知識庫沒標 TEACHER_ED 的有 2 筆，改記在職教師，次要值加職前師培，旗標「職前混合_未標TEACHER_ED」。依據是 SESSION-HANDOFF 的原則：在職教師屬 K-12，混合對象依主要對象判。
- 在職教師（K-12）：篩選檔只寫教師、沒寫學生時算；摘要規則下，教師字眼要多於學生字眼。
- 其他教育關係人：parents、principals、school leaders、superintendents、administrators、家長、校長。
- 題名有 K-12、但沒寫學段和角色時，不讓摘要中偶然出現的學段字眼覆蓋題名，記「K-12 未細分」。文獻回顧類同理：題名沒提教師時，不從摘要判成教師研究。
- 另有旗標「高教提示」（12 筆）：出現 university／undergraduate／higher education 字樣。多半是職前師培，或混合 K-12 與高教的文獻回顧，只作提醒。

## 4. AI 素養類別與面向

- 優先順序：
  1. `p0-ailit-boundary-2026-10-09/decisions.json`（final_class，管理者決定）。
  2. `p0-ailit-classify-2026-10-09/step3-kb-part*.json`（依 record_id）。
  3. `p0-b1-browser-abstracts-2026-10-10/judgments.json` 與 `p0-reexam-excluded-2026-10-09/imported.json`。
  4. pending3、step2-scholar-hits、rescreen 與其他篩選檔（依 DOI）。
- 首選來源是 unknown、但其他來源有 A／B 時，用 A／B。有 8 筆因此由 unknown 改為瀏覽器補摘要後的判讀。
- KB-2026-0113 的結果只寫在 `p0-kb-0113-scope-2026-10-09/report.md`，是手動帶入：A；T-ETH、T-PD、S-ETH；方法為文獻回顧。
- 面向代碼一律正規化為 8 碼，例如 `S-BAS:理解` 記為 `S-BAS`。
- 結果：A 258、B 67，沒有 unknown。

## 5. 主題（topics，多選；規則套在題名＋摘要，沒有摘要就只看題名）

| 主題 | 主要關鍵字 |
|---|---|
| 生成式AI/ChatGPT/LLM | generative AI、GenAI、ChatGPT、LLM、GPT-n、chatbot、conversational agent、Copilot、生成式 |
| AI素養課程與教學 | 須同時出現兩組詞：(1) AI literacy／AI education／teaching (about) AI／AI curriculum；(2) curriculum、lesson、course、unit、workshop、pedagogy、instruction、program、teaching、learning activity |
| 評量與量表 | develop／validate＋scale／instrument／test／assessment、psychometric、Rasch、IRT、rubric、confirmatory factor、AI literacy scale／test |
| 教師信念與專業發展 | teachers' beliefs、perceptions、attitudes、readiness、self-efficacy、acceptance…、professional development／learning、teacher education／training、pre-／in-service、TPACK |
| 倫理與安全 | ethic、responsible AI、bias、fairness、privacy、safety、academic integrity、misinformation、deepfake、risk、plagiarism、critical AI literacy |
| 學習成效介入 | experiment、intervention、randomized、control group、pre／post-test、learning outcomes／gains／achievement |
| 運算思維/程式/資料 | computational thinking、programming、coding、data science／literacy、block-based、Scratch、computer science、algorithm、robotics |
| 語言學習 | EFL、ESL、language learning、English writing、writing、L2、second／foreign language、reading comprehension、ELA |
| STEM/科學 | STEM、STEAM、science education（不含 computer／data science）、mathematics、physics、chemistry、biology |
| 特教/公平 | special education、disability、autism、dyslexia、neurodiverse、equity、inclusion、underrepresented、rural、gender、girls、Black、Latinx、Indigenous、digital divide、SES |
| 政策與治理 | policy、governance、guidelines、regulation、ministry、school district、leadership、principals、national strategy、curriculum standards |

關鍵字粗略，會有偽陽性。例如 risk、writing、policy 等字很常見，「倫理與安全」「語言學習」「政策與治理」可能被高估；「評量與量表」可能被低估。

## 6. 研究方法（method，單選；依序判定）

1. **文獻回顧/統合分析**：題名寫 review，或摘要寫 systematic／scoping／literature review、meta-analysis、bibliometric、PRISMA，且沒有實驗字眼。
2. **實驗或準實驗**：quasi-experiment、randomized、control／experimental group、pre／post-test、RCT。
3. **混合**：mixed methods 等明確字眼，或同時出現量化字眼與質性字眼。
4. **設計本位/系統開發**：design-based research、prototype、co-design、participatory design、usability，或「we／this paper present／develop … system／tool／game／platform／curriculum」。
5. **質性/個案**：interview、focus group、case study、thematic analysis、qualitative、observation、document／content analysis、policy documents。
6. **量化問卷/量表**：survey、questionnaire、SEM、PLS、regression、factor analysis、N=、ANOVA、correlation、cluster／latent profile。
7. **不明**：以上都沒有。若出現 conceptual、position paper、perspective 等字眼，在 `method_evidence` 註「概念/立場性」。

限制：
- 57 筆沒有 OpenAlex 摘要（AERA、IDC、部分會議論文為主），方法多半是「不明」。全部 93 筆「不明」中，約一半是沒有摘要所致。表中另附「僅有摘要者」的方法分布。
- 「混合」包含只是同時提到 survey 和 interview 的研究，可能高估。

## 7. 國別與出處

- 國別：只用 studies_country，79／325 筆有值。多數紀錄沒記國別（入庫時摘要沒寫國名就不記），所以國別排行**不能代表全領域分布**。
- 出處：published_in，303 筆有值，名稱依 venue-watchlist.md。

## 8. 覆蓋與解讀限制（重要）

- **知識庫是編輯部的監測樣本**，不是全領域母體。來源限定在 47 種期刊／21 個會議的監測清單、依作者檢索與重新篩選，並經 K-12 與 AI 素養範圍篩選後才入庫。
  - 各年比例反映的是「我們收進來的」，不是學界真實趨勢。
- **搜尋時窗**：多數學術搜尋覆蓋 2025-01-01～2026-10-10（search_runs.csv 的 scope 多為此區間），而且全部紀錄都在 2026-10-09／10 兩天入庫，屬回溯式補搜。
  - 2025 年可能因搜尋深度不同而偏少。
  - 2026 年只到 10/10，Online First 文章之後還會改到 2026／2027 卷期。
- **issue_year 位移**：年份以卷期年為主（272 筆）。2025 年線上首發、2026 年才排入卷期的文章會算在 2026。目前已有 1 筆 2027。
- **刻意補搜造成的偏差**：
  - J40–J42（Interactive Learning Environments、Computers and Education Open、Informatics in Education）是特別補搜 2025 年至今加入的，共 61 筆（2025：17、2026：44）。
  - 其中師培（TEACHER_ED）19 筆是刻意收入。TEACHER_ED 共 33 筆（2025：12、2026：21），所以「職前師培」的比例受這次補搜影響很大。
  - AERA 2026 年會（C17）一次進來 25 筆，也墊高了 2026 年會議論文與部分學段的筆數。
- **學段證據**：285 筆 audit 中，有 42 筆只有泛稱 K-12（記「K-12 未細分」）。abstract_rule 39 筆是規則推得，沒有逐篇人工確認。
- **同一模型**做規則、判讀與整合，**不是獨立審閱**。抽查時發現的明顯誤判已改規則（例如 K-12 回顧被摘要中的 high school 拉成高中），但應該還有殘留誤判。
- `raw/` 存有 OpenAlex 原始回應與重組摘要，只供重跑使用，不可對外引用。records.json 的證據片段每段都在 13 字以內。
- OpenAlex 查詢共 9 次（filter=doi 批次，每次 ≤40 筆），全部 HTTP 200，325／325 筆 DOI 都有回應，其中 267 筆有摘要。URL 沒有帶 email 或 key，紀錄見 `openalex_query_log.json`。

## 9. 檔案

- `records.json`：325 筆，含 year、first_published_on、stage、stage_secondary、stage_basis、stage_flags、stage_evidence、ai_lit_class、ai_lit_dims、ai_lit_source、topics、topic_evidence、method、method_evidence、countries、venues、categories 等欄位。
- `tables.json`、`tables.md`：交叉表。
- `scripts/`：fetch.py（OpenAlex 批次抓取）、build.py（逐筆推導）、tables.py（交叉表）。
- `raw/`：OpenAlex 原始資料。
