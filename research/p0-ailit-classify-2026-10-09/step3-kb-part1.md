# step3-part1 AI 素養範圍判讀結果

依 `research/ai-literacy-scope-criteria.md` v0.2 判讀 step3-part1.json 共 90 筆。只做範圍判斷，不判學段或驗證狀態。與整合者為同一模型，不算獨立審閱。

## 類別統計

| 類別 | 筆數 |
|---|---|
| A | 82 |
| B | 4 |
| C | 2 |
| unknown | 2 |

## 面向統計（每筆面向不重複計）

| 代碼 | 筆數 |
|---|---|
| S-BAS | 41 |
| S-ETH | 22 |
| S-LRN | 8 |
| S-SYS | 7 |
| T-BAS | 11 |
| T-ETH | 19 |
| T-PD | 16 |
| T-TEA | 19 |

## 判讀依據

| 依據 | 筆數 |
|---|---|
| title_only | 22 |
| page | 11 |
| abstract | 57 |

說明：論文摘要取自 OpenAlex（57 筆）；15 篇論文 OpenAlex 與 Crossref 皆無摘要，以標題判讀。政策類若網頁取用失敗、只取得導覽或登入頁、或為影像 PDF，標為 title_only。

## C 與 unknown 紀錄

| ID | 類別 | 標題 | 理由 |
|---|---|---|---|
| KB-2026-0004 | C | Digital Transformation and Green Skills in TVET: Building Pedagogical Capacity – Africa Regional Series | TVET綠色技能與專題式教學增能系列，AI僅為課程名稱中的一項元素，主題不在師生AI素養內涵。 |
| KB-2026-0007 | C | UNESCO calls for pairing school screen regulation in Mexico with digital literacy and continuous monitoring | 墨西哥校園螢幕／行動裝置規範與一般數位素養，未涉及AI，不對應任何內涵。 |
| KB-2026-0113 | unknown | Generative AI Disruption in K-12 Education: Balancing Skepticism and Opportunity | 僅有標題，無法判斷是師生AI素養、工具使用或一般評論。 |
| KB-2026-0163 | unknown | Measuring the Data Agency of Pre-Service Teachers: A Six-Factor Model | 職前教師數據能動性量表，涉及演算法與數據決策，摘要未提及AI。 |

## 邊界案例（請管理者決定）

| ID | 類別 | 標題 | 邊界理由 |
|---|---|---|---|
| KB-2026-0004 | C | Digital Transformation and Green Skills in TVET: Building Pedagogical Capacity – Africa Regional Series | 課程名含「ICT and AI」，但主體為TVET綠色技能與教學法；若管理者視之為教師AI增能可改A（T-PD）。 |
| KB-2025-0010 | A | The AI3 Model: Future Directions for Artificial Intelligence, Assessment Innovation, and Academic Integrity | 重點在評量政策與學術誠信，非直接培養師生AI素養；判A取其學術誠信規範內涵，請管理者確認。 |
| KB-2026-0021 | A | Potential risks of generative artificial intelligence integration into K-12 education: A scoping review | 主體為工具使用風險的綜整而非素養培養，可能屬B；依「依賴行為為重點可判A」暫判A。 |
| KB-2025-0024 | A | LLMs to Support K–12 Teachers in Culturally Relevant Pedagogy: An AI Literacy Example | 僅憑標題；兼具教師使用LLM工具（B）與AI素養教學（A），依兼有判A。 |
| KB-2026-0053 | A | The phenomenon of deep nudes—a new threat to children and adults | 主體為AI濫用現象與盛行率調查，非素養教學；判A取倫理內涵，亦可視為範圍外，請管理者決定。 |
| KB-2026-0088 | A | 教育部等五部门关于印发《“人工智能+教育”行动计划》的通知（教科信〔2026〕1号） | 網頁取用失敗（503）僅憑標題；為綜合國家計畫，素養只是其中一部分。 |
| KB-2023-0008 | B | More Support for Schools and Students to Shape the Future of Learning（Launch of EdTech Masterplan 2030 “Transforming Education through Technology”） | 主體為一般教育科技與21世紀能力，AI只是其中一項；可能屬C。 |
| KB-2025-0048 | B | Generative AI: product safety standards | 屬產品規範而非師生能力；判B取「學校選用工具」關聯，亦可視為C。 |
| KB-2026-0104 | A | Navigating the AI Era: A Multi-Step Approach to Family AI Literacy and Mediation for Young Children | 主要對象為家長，不在框架師生對象內；內容與兒童AI素養相關。 |
| KB-2025-0057 | A | Behind the Scenes: Unpacking Students' Experience during a Collaborative AI Workshop using Multi-Modal Data | 研究重點為多模態學習分析方法與情意狀態，AI素養工作坊僅為情境。 |
| KB-2026-0110 | A | AI Literacy for Educational Leaders: Imagining Futures in K–12 Policy and Practice | 對象為教育領導者，非框架的教師或學生。 |
| KB-2026-0113 | unknown | Generative AI Disruption in K-12 Education: Balancing Skepticism and Opportunity | 摘要無法取得，標題不足以判斷。 |
| KB-2026-0119 | A | Educational Leaders Navigating AI: Policy Challenges and Opportunities in K-12 Implementation | 對象為教育領導者，非框架的教師或學生。 |
| KB-2025-0063 | B | Friend, tool, or threat? High school students’ and teachers’ perspectives on AI in learning | 以TAM為主的採用態度研究；態度可算素養（A），暫判B。 |
| KB-2026-0161 | A | Can Teacher AI Literacy Reach Those Who Need It Most? Professional Learning, Realised Access, and Cumulative Advantage in TALIS 2024 | 研究明言不直接測量教師AI素養，只看AI專業學習參與。 |
| KB-2026-0163 | unknown | Measuring the Data Agency of Pre-Service Teachers: A Six-Factor Model | 演算法／數據素養是否算AI素養（T-BAS「理解AI的數據與運作」）需管理者決定；否則屬C。 |
| KB-2026-0172 | A | AI transformation in education: Examining teachers’ perceptions using an integrated TAM-TPACK-GenAI framework | 主要為科技接受度，TPACK成分有限，亦可判B。 |

## 請求紀錄

共 104 次請求（HTTP 200：100）；明細見 JSON 的 `requests`。
