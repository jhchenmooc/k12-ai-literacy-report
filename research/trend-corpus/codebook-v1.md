# 編碼手冊 v1（草稿，D1 時凍結）

> **適用範圍：**[論文逐年趨勢分析方案](../annual-paper-trend-analysis-plan.md) v0.14 的 2022–2025 固定面板語料。
>
> **版本：**
> - `codebook_version`：v1
> - `criteria_version`：[AI 素養範圍判斷準則](../ai-literacy-scope-criteria.md) v0.4，加上方案第 2.5 節的兩條操作細則（ITS、接受度研究）。
>
> **性質：** 由同一模型起草，不算獨立審閱。2022 年試編 20 篇的結果與據此做的修改，見第 9 節。

## 0. 總則

1. **只看題名與摘要。** 年份、期刊、DOI、作者都已移除。摘要沒寫的事項記 `unknown`，即使認得這篇論文也一樣。
2. **每筆各自判斷**，不參照同批其他筆。
3. **非 `unknown` 的值要附證據片段：**每個值附一段逐字出現在摘要（或題名）中、不超過 15 個英文詞的片段。`unknown` 不附片段。
4. **依研究實際教什麼、測什麼判斷**，不依摘要自稱的目標。例如自稱「培養 AI 素養」，但只用 AI 工具教其他科目者，判 B。
5. **沒有摘要的紀錄**（處理後少於 20 詞）：
   - 面向、層級、方法、主題、成效測量、生成式 AI 旗標一律記 `unknown`。
   - 學段與對象只在題名明寫時才記。
   - 範圍判斷可依題名判 A／B／C，看不出來就記 `unknown`。

## 1. 範圍類別 `ai_lit_class`（A／B／C／unknown）

| 值 | 判定 | 典型例子 |
|---|---|---|
| A | 主要內容是 K-12 學生或教師（含職前、其他教育關係人）對 AI 的知識、技能、態度或實踐：怎麼理解、培養、教學、評量、描述或治理這些能力；且能對應到第 3 節至少一個面向。 | AI 素養課程、量表、框架；學生理解 AI 原理或偏見；教師 AI 素養、準備度或專業發展；教師 AI-TPACK；生成式 AI 教學研習及其成效；校園 AI 使用規範與倫理教學；學生用 AI 自主學習的策略與自我調節；學生 AI 專案設計 |
| B | 師生在教學或學習中實際使用 AI 工具，研究重點是工具的使用或成效，而不是對 AI 的素養本身。 | 學生用 ChatGPT 練英文寫作的成效；ITS 數學家教；教師用生成式 AI 備課 |
| C | AI 只是研究方法或系統後端，師生沒有直接和 AI 互動；或主題根本不涉及 AI。 | 用機器學習預測學業表現；自動評分演算法的準確度；學習分析；只談資料素養而沒有提到 AI；一般數位素養 |
| unknown | 摘要或題名不足以判斷 | — |

### 補充規則

1. **A 與 B 的分界：**研究對象是「師生的 AI 素養」判 A，包括理解、能力、態度、倫理、設計、使用策略與自我調節。研究對象是「AI 工具在教學或學習中的使用或成效」判 B。兩者兼有時判 A，但第 3 條例外。
2. **教師 AI-TPACK 與生成式 AI 教學培訓：**一律判 A，即使同時評估培訓後的工具使用。
3. **接受度研究（本方案操作細則，管理者 2026-10-10 決定）：**以特定 AI 工具的接受度、使用意願或滿意度為主的研究判 B，例如 TAM、UTAUT、技術接受問卷。以 AI 本身的理解、態度或倫理為主者判 A。第 1 條「兩者兼有時判 A」不適用於這類研究。
4. **ITS 操作細則（P9 補充：看研究中是否有師生實際使用並蒐集其資料）：**
   - K-12 師生直接操作 ITS 判 B。
   - 只用 ITS 的演算法、記錄檔或建模，師生沒有在研究中操作者判 C，例如知識追蹤模型、作答資料分析。
5. **資料素養：**只談資料或演算法、摘要沒有提到 AI 者判 C。
6. **非 K-12 對象：**大學、成人或醫學教育的研究，內容仍依上列規則判 A／B／C，對象另記 `non_k12`。報告的主要分母只計 K-12 相關對象（見第 2 節）。
7. **非教育情境判 C（試編修改 P1）：**研究的主題不是教學、學習或教育治理者判 C，並在 `ai_lit_note` 註記「非教育情境」。例如大眾對 AI 的看法、職場 AI 風險、社會層面的 AI 倫理評論、家庭使用語音助理而沒有學習活動。教育科技公司、學校或教育行政對 AI 倫理與治理的研究仍屬教育情境。
8. **看不出來就記 `unknown`**，不勉強歸類。

### B 類子型 `b_subtype`（只有 B 類才填）

依下列順序取第一個符合者：

1. `genai`：生成式 AI，包括 LLM、ChatGPT、GPT 類聊天機器人、文字或圖像生成。
2. `its_adaptive`：ITS 與自適應系統。
3. `robot_agent`：機器人與代理，包括教育機器人、社交機器人、教學代理、非 LLM 聊天機器人。
4. `other`：其他。只寫「AI chatbot」等、看不出是否為 LLM、也沒寫是規則式者，記 `other`，並將 `genai_flag` 記 `unknown`（試編修改 P8）。

例如「LLM 家教」歸 `genai`。

## 2. 對象角色 `audience_role` 與學段 `stage`

### 對象角色（只記一個值）

| 值 | 判定 |
|---|---|
| `student` | 研究對象是中小學學生（含學前） |
| `inservice_teacher` | 在職中小學教師 |
| `preservice_teacher` | 職前師培、師資生、student teachers、teacher candidates |
| `other_stakeholder` | 家長、校長、行政人員、未限定學段的一般教育工作者 |
| `non_k12` | 大學生、成人、醫學教育等非中小學對象 |
| `unknown` | 看不出來 |

- **多種對象並存時：**取研究資料主要來源的那一類；看不出主要來源時記 `unknown`。
- **只寫 teachers 而沒寫學段時：**記 `inservice_teacher`，學段記 `k12_unspecified`。但若同一摘要出現 university、higher education 或 faculty，記 `non_k12`。
- **回顧研究：**依所回顧研究的對象判斷；涵蓋中小學與大學而沒寫主要對象時，記 `unknown`。

### 學段（只記一個主要值；教師研究記任教學段）

| 值 | 對照詞 |
|---|---|
| `preschool` | preschool、kindergarten、early childhood、ages 3–6 |
| `primary` | primary、elementary、grades 1–6、ages 6–12（學制名稱優先） |
| `lower_secondary` | middle school、lower secondary、junior high、grades 7–9 |
| `upper_secondary` | high school、upper secondary、senior high、grades 10–12 |
| `vocational_secondary` | vocational high school、technical high school、secondary TVET（高職、中職） |
| `secondary_unspecified` | 只寫 secondary、adolescents、teenagers、teens、youth（年齡在 12–18 歲之間） |
| `k12_multi` | 明寫跨兩個以上學段，例如 primary and secondary |
| `k12_unspecified` | 只寫 K-12、school、schoolchildren、pupils、children（未給年齡） |
| `unknown` | 看不出來，或屬非 K-12 對象 |

1. **學制名稱優先於年級。**例如美國 middle school 含 6 年級，「sixth-grade middle school students」記 `lower_secondary`。
2. **主要值的選法：**多個學段而有明確主體（例如人數過半）時，記主體學段；沒有主體時記 `k12_multi`。
3. **只寫年齡時（試編修改 P6）：**依該國學制換算。不知國別時，3–5 歲記 `preschool`、6–11 歲記 `primary`、12–14 歲記 `lower_secondary`、15–17 歲記 `upper_secondary`；跨兩區以上記 `k12_multi`。家長研究的學段依子女年齡判斷。
4. **職業教育依學段判斷：**中等職業學校屬 `vocational_secondary`。高等職業院校、專科、科大屬 `non_k12`。

## 3. AI 素養面向 `ai_lit_dims`（多選；只有 A、B 類才填）

面向依教育部《臺灣中小學教師與學生AI素養框架》（2026-04-17）的八個面向，內涵見[範圍判斷準則](../ai-literacy-scope-criteria.md)第 1 節。**面向代碼的前綴必須與對象角色一致：**

- 學生研究只記 `S-` 開頭的代碼。
- 教師研究（在職、職前）只記 `T-` 開頭的代碼。
- 其他教育關係人：教育領導者可記 `T-BAS`（參與 AI 校園治理部署與決策）。

| 代碼 | 面向 | 摘要中常見的線索 |
|---|---|---|
| `S-ETH` | 學生 AI 倫理 | bias、fairness、privacy、responsible use、academic integrity、ethical reasoning about AI |
| `S-BAS` | 學生 AI 基礎與技術 | how AI works、machine learning concepts、training data、prompting、AI limitations、AI4K12 big ideas |
| `S-LRN` | 學生 AI 賦能學習 | learning with AI tools、self-regulated learning with AI、AI-supported domain learning |
| `S-SYS` | 學生 AI 系統設計 | design and build AI systems with a design process (needs, architecture, evaluation) |
| `T-ETH` | 教師 AI 倫理 | teachers' AI ethics、responsible AI teaching、school AI policy |
| `T-BAS` | 教師 AI 基礎與技術 | teachers' AI knowledge or skills、prompting、tool selection、AI literacy of teachers |
| `T-TEA` | 教師 AI 賦能教學 | integrating AI into teaching、lesson design with AI、AI-TPACK |
| `T-PD` | 教師 AI 促進專業發展 | professional development、training、workshop、teacher learning about AI |

### 優先規則

1. **教師研究：**以培訓或研習本身為研究對象記 `T-PD`；以教學設計或課堂實施為研究對象記 `T-TEA`。兩者可以並列。
2. **學生的系統開發：**有系統設計流程（需求、架構、評估）的模型或系統開發記 `S-SYS`。以人文或在地問題為導向、不涉及系統開發的專案記 `S-BAS`。
3. **生成式 AI 以前的對應**（`ai_lit_note` 開頭標「[pre-genAI 類比對應]」）：
   - 用無程式碼工具訓練分類器（例如 Teachable Machine），而沒有系統設計流程者，記 `S-BAS`，層級 `apply`。
   - AI4K12 五大概念：感知、表徵與推理、學習對應 `S-BAS`；社會影響對應 `S-ETH`；自然互動對應 `S-BAS`，層級 `understand`。
4. **B 類**通常只記 `S-LRN`（學生）或 `T-TEA`（教師）。教師（含職前）在自己的培訓或課程中**以學習者身分**使用 AI 工具者，記 `T-PD`（試編修改 P3）。
5. **非 K-12 對象的前綴（試編修改 P2）：**大學生、成人學習者比照學生記 `S-`；大學教師比照教師記 `T-`。這些紀錄不進主要分母，面向只作描述。其他教育關係人沒有合適面向時可以不記，留空。

### 與 UNESCO 2024 的對照（只供參考，不用來編碼）

- **學生：**`S-ETH` 對應 Ethics of AI；`S-BAS` 對應 AI techniques and applications，以及 Human-centred mindset 的一部分；`S-SYS` 對應 AI system design；`S-LRN` 在 UNESCO 沒有獨立面向。
- **教師：**`T-ETH` 對應 Ethics of AI；`T-BAS` 對應 AI foundations and applications；`T-TEA` 對應 AI pedagogy；`T-PD` 對應 AI for professional development。
- UNESCO 另有 Human-centred mindset 面向，本框架分散在各面向。

## 4. 研究所針對的層級 `level`（只依摘要明寫的學習目標或任務）

| 值 | 判定 |
|---|---|
| `understand` | 認識、辨識或說明 AI（取得理解） |
| `apply` | 在情境中使用 AI（深化應用） |
| `create` | 設計、創作或建構 AI 方案（創造轉型） |
| `unknown` | 摘要沒有明寫 |

- **只針對與 AI 有關的學習目標或任務**（試編修改 P5）。B 類研究中其他學科的學習目標，例如代數、SQL、射擊訓練，不據以判層級，記 `unknown`。
- 依第 3 節面向規則已指定層級者，以面向規則為準。
- `S-SYS` 也依框架內涵判層級，不一律記 `create`。
- 報告一律稱「研究所針對的層級」，不稱能力層級。

## 5. 主題 `topic`（多選，封閉清單）

| 代碼 | 主題 | 納入 | 排除 |
|---|---|---|---|
| `genai` | 生成式 AI／ChatGPT／LLM | 研究的工具或主題是生成式 AI | 只在背景提到 ChatGPT |
| `ailit_curriculum` | AI 素養課程與教學 | 教 AI 的課程、單元、工作坊、教學活動 | 用 AI 教其他科目 |
| `assessment` | 評量與量表 | 發展或驗證量表、測驗、評分規準 | 只用現成問卷蒐集資料 |
| `teacher_pd` | 教師信念與專業發展 | 教師的信念、態度、準備度、自我效能、專業發展、TPACK | 學生的態度 |
| `ethics_safety` | 倫理與安全 | 研究問題直接處理偏見、隱私、安全、學術誠信、批判 AI 素養 | 只在結論提到要注意倫理 |
| `learning_intervention` | 學習成效介入 | 有教學介入並測量學習結果 | 只有滿意度 |
| `ct_programming_data` | 運算思維／程式／資料 | 運算思維、程式、資料科學、機器人程式 | — |
| `language` | 語言學習 | EFL、ESL、寫作、閱讀、第二語言 | 一般學科的寫作作業 |
| `stem_science` | STEM／科學 | STEM、科學、數學（不含資訊科學） | — |
| `equity_special` | 特教／公平 | 特殊需求、性別、族群、偏鄉、低社經、數位落差 | — |
| `policy_governance` | 政策與治理 | 政策、指引、規範、學校治理、領導 | — |

摘要沒有對應內容時，可以一個主題都不選，記 `none`。

## 6. 方法 `method`（只記一個主要值，依序判定）

1. `review`：文獻回顧、系統性回顧、範疇回顧、統合分析、書目計量。最先判定，不受摘要中「experimental and control groups」等字眼影響。
2. `instrument_dev`：發展或驗證量表、測驗、評分規準。
3. `conceptual`：概念、立場、評論、理論文章，沒有蒐集實證資料。
4. `experimental`：實驗或準實驗、隨機分派、控制組或實驗組、前後測。
5. `mixed`：明寫 mixed methods，或同時有量化與質性的資料蒐集與分析。
6. `design_based`：設計本位研究、原型、共同設計、參與式設計、可用性測試，或「開發某系統、工具、課程並評估」。
7. `qualitative`：訪談、焦點團體、個案研究、主題分析、觀察、文件或內容分析。
8. `survey`：問卷、量表施測、SEM、迴歸、相關、群集或潛在剖面分析。
9. `unknown`：以上都不符合，或沒有摘要。

### 介入研究

- 方法為 `experimental`、`design_based`，或為 `mixed` 而摘要描述了實際實施的教學活動者，記為介入研究。
- 介入研究另記 `outcome_measured`：有前後測（含單組前後測）或對照組記 `yes`，只有後測或只有滿意度記 `no`。非介入研究記空白（試編修改 P4）。
- 單組前後測加問卷或反思者記 `experimental`；只有後測加訪談者記 `mixed`（試編修改 P4）。

## 7. 生成式 AI 旗標 `genai_flag`（yes／no／unknown）

| 值 | 判定 |
|---|---|
| `yes` | 研究使用的工具或研究主題明寫 LLM、GPT、ChatGPT、generative，或其他生成式模型 |
| `unknown` | 只寫「AI chatbot」等，看不出是否為 LLM |
| `no` | 規則式聊天機器人、ITS、機器學習分類器等非生成式 AI；或研究沒有涉及特定工具 |

2022 年標 `yes` 者，逐筆覆核。

## 8. 輸出格式（每筆一個 JSON 物件）

```json
{"work_id":"W…","ai_lit_class":"A","b_subtype":"","audience_role":"student","stage":"primary",
 "ai_lit_dims":["S-BAS"],"level":"understand","topic":["ailit_curriculum"],"method":"experimental",
 "outcome_measured":"yes","genai_flag":"no","ai_lit_note":"","rationale":"<改述，不引原句>",
 "evidence":[{"field":"stage","span":"<≤15 英文詞的逐字片段>"}],"model_id":"<自報>"}
```

- `rationale` 只寫改述，不引用摘要原句。
- 證據片段只留在 scratchpad。repo 只存片段在摘要中的起訖位置（`evidence_offsets`）。
- 驗證不合格（片段不逐字、超過 15 詞、`unknown` 附了片段）者重編一次，仍不合格就記 `unknown` 並計數。
- **表示「沒有」的值不必附片段（試編修改 P7）：**`genai_flag` 為 `no`、`topic` 為 `none`、`outcome_measured` 空白者，不要求證據片段。

## 9. 2022 年試編 20 篇的結果與修改

見 [pilot-2022/report.md](pilot-2022/report.md)。

- **試編方式：**2022 年預查詢只供試編，不算快照、不進語料；只抽 OpenAlex 有摘要者。
- **修改：**據試編結果對本手冊做的修改共 9 項（P1–P9），逐項記在該報告第 3 節，並已併入上文，在文中以「試編修改 Pn」標示。
