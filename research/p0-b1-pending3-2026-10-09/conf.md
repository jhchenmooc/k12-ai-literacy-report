# B1 會議待判 51 件：摘要補讀與 AI 素養判定（2026-10-09）

> **性質：** 同一模型的子代理判讀，與整合者是同一模型，**不算獨立審閱**。repo 未動；輸出只在 scratchpad。輸出不含摘要全文、作者姓名或 email。

## 方法

- 請求 UTC 2026-10-09T20:39:14Z–2026-10-09T20:44:55Z。順序：OpenAlex → Crossref（User-Agent: k12-ai-literacy-report）→ Semantic Scholar（無 429），每次請求間隔約 1 秒。**所有請求都沒有帶 email 或 mailto。** ACM DL 沒有請求。
- Crossref 51 件都沒有 abstract 欄（1 次 429，重試後成功）。OpenAlex 有 19 件有摘要欄，其中 2 件只是圖說、1 件只是會議資訊。**Semantic Scholar 對全部 35 件 ACM/IEEE 論文都有摘要**，補上先前記為無摘要的 17 件（含 OpenAlex 只有會議資訊的 1 件），以及 OpenAlex 只給圖說的 2 件。這次沒有用 arXiv 預印本當線索。
- AERA：Crossref、OpenAlex、Semantic Scholar 都沒有摘要。2025 議程先載入 focus 頁，再試讀 View Paper 一次（2197285），仍回驗證頁（"please complete"），**未繞過**，之後沒有再請求 2025 頁。2026 年 4 件重讀議程頁，內容與先前紀錄相同。
- 學段規則沿用先前做法：摘要必須明寫學段，或寫出 3–18 歲的年齡而且是學習情境；只寫 youth、teens、children 的判「不明」。

## 統計

| 決定 | 件數 |
|---|---|
| pending | 36 |
| import | 12 |
| exclude | 3 |

| 組 | 匯入 | 待判 | 排除 |
|---|---|---|---|
| IDC | 6 | 13 | 0 |
| AERA | 0 | 16 | 0 |
| CONF | 6 | 7 | 3 |

- 類別：A 36, unknown 12, B 1, C 2；學段：unclear 25, k12 13, unknown 12, non_k12 1；邊界 11 件。
- 摘要來源：openalex 16, semanticscholar 19, none 12, aera_program 4。

## 建議匯入（12 件，全部是 A 類、K-12）

| DOI | 會議（年） | 類 | 面向 | 學段原話 | 類別建議 | 國別 |
|---|---|---|---|---|---|---|
| `10.1145/3713043.3731513` | 24th Interaction Design and Children（2025） | A | S-BAS、S-ETH | in a school with 17 children from the 1st grade | K6 |  |
| `10.1145/3713043.3728853` | 24th Interaction Design and Children（2025） | A | S-BAS | 43 Japanese and 20 Finnish high school students | K2 | JP;FI |
| `10.1145/3713043.3727052` | 24th Interaction Design and Children（2025） | A | S-ETH、S-BAS | six diverse youth (ages 14-17) | K6 |  |
| `10.1145/3713043.3731520` | 24th Interaction Design and Children（2025） | A | S-BAS、S-LRN | 12 students aged 8 to 14 | K6 |  |
| `10.1145/3773077.3812183` | 25th Annual ACM Interaction Design and Children Conference（2026） | A | S-BAS、S-ETH | 22 teenagers (aged 15–17) | K6 |  |
| `10.1145/3713043.3728857` | 24th Interaction Design and Children（2025） | A | T-TEA、S-BAS | two elementary schools and one high school with nine teachers | K4 |  |
| `10.1145/3706598.3714402` | 2025 CHI Conference on Human Factors in Computing Systems（2025） | A | S-ETH | 72 children (aged 10–12) and 4 teachers | K2 | GB;TR |
| `10.1145/3706599.3719789` | EA CHI Conference on Human Factors in Computing Systems（2025） | A | S-BAS | 48 students from 6th to 8th grade | K6 |  |
| `10.1145/3706598.3714037` | 2025 CHI Conference on Human Factors in Computing Systems（2025） | A | S-BAS、S-ETH | 39 Black, Hispanic, and Asian high school girls and non-binary youth | K6 |  |
| `10.1145/3805689.3812305` | 2026 ACM Conference on Fairness, Accountability, and Transparency（2026） | A | S-ETH、T-ETH | interviewed 18 high school students | K5 |  |
| `10.1145/3715275.3732176` | 2025 ACM Conference on Fairness, Accountability, and Transparency（2025） | A | T-ETH、T-TEA | survey study with K-12 teachers (N = 98) | K5 |  |
| `10.1145/3805689.3812281` | 2026 ACM Conference on Fairness, Accountability, and Transparency（2026） | A | T-TEA、T-ETH | eight focus groups with 26 K-12 teachers | K4 |  |

附註：
- `3713043.3731513`、`3713043.3728857`：OpenAlex 的摘要欄只是圖說，學段依 Semantic Scholar 的正式摘要判定。
- `3706598.3714402`：先前因主題範圍（AI 教育科技的資料公平）留待判。依 v0.3 準則，兒童對 AI 資料處理公平的看法對應 S-ETH，所以建議匯入；國別 Scotland 記為 GB。若管理者認為仍屬邊界，可改回待判。
- `3805689.3812281`：同時有 B（工具使用）與 A（教師倫理判斷）的成分，依「兩者兼有判 A」。`3706599.3719789` 是 CHI Extended Abstracts，篇幅較短。
- `3713043.3728853`：國別依摘要中的 Japanese、Finnish 記為 JP;FI。

## 仍待判

| DOI | 組 | 類 | 原因 |
|---|---|---|---|
| `10.1145/3713043.3731495` | IDC | A | 摘要只寫 children，無年齡、年級或學校情境 |
| `10.1145/3773077.3812156` | IDC | A | 只寫 teenagers，無年齡、年級 |
| `10.1145/3773077.3806125` | IDC | A | 只寫 teens，無年齡、年級 |
| `10.1145/3773077.3813778` | IDC | A | 博士生論壇摘要，只寫 youth 與社區情境；K-12 只在背景敘述 |
| `10.1145/3773077.3816198` | IDC | A | 工作坊提案、無研究對象；3–8 歲橫跨學前（管理者先前決定維持待判） |
| `10.1145/3713043.3731604` | IDC | A | 博士生論壇摘要；只寫 children，無年齡、年級 |
| `10.1145/3773077.3806107` | IDC | A | 只寫 teenagers，無年齡、年級 |
| `10.1145/3773077.3813783` | IDC | A | 博士生論壇摘要（研究規劃），只寫 youth |
| `10.1145/3773077.3813772` | IDC | A | 展示（demo）論文；只寫 children and families、科學中心，無年齡 |
| `10.1145/3773077.3806146` | IDC | A | 只寫 youth，無年齡、年級 |
| `10.1145/3773077.3812189` | IDC | A | 年齡 11–17 明示，但為 AI 治理研究工具（進行中），非學習情境；學段規則要求學習情境 |
| `10.1145/3773077.3806124` | IDC | A | 只寫 teens，無年齡；主題為青年參與 AI 治理 |
| `10.1145/3773077.3812130` | IDC | A | 回顧本身只寫 young people；13–14 歲僅為所提後續研究（管理者先前決定維持待判） |
| `10.3102/2197285` | AERA | unknown | AERA 2025 議程頁回驗證頁（本次試讀 2197285 一次，未繞過）；Crossref、OpenAlex、Semantic Scholar 皆無摘要；本件議程頁本次試讀一次回驗證頁 |
| `10.3102/2194864` | AERA | unknown | AERA 2025 議程頁回驗證頁（本次試讀 2197285 一次，未繞過）；Crossref、OpenAlex、Semantic Scholar 皆無摘要 |
| `10.3102/2185074` | AERA | unknown | AERA 2025 議程頁回驗證頁（本次試讀 2197285 一次，未繞過）；Crossref、OpenAlex、Semantic Scholar 皆無摘要 |
| `10.3102/2193015` | AERA | unknown | AERA 2025 議程頁回驗證頁（本次試讀 2197285 一次，未繞過）；Crossref、OpenAlex、Semantic Scholar 皆無摘要 |
| `10.3102/2183399` | AERA | unknown | AERA 2025 議程頁回驗證頁（本次試讀 2197285 一次，未繞過）；Crossref、OpenAlex、Semantic Scholar 皆無摘要 |
| `10.3102/2184589` | AERA | unknown | AERA 2025 議程頁回驗證頁（本次試讀 2197285 一次，未繞過）；Crossref、OpenAlex、Semantic Scholar 皆無摘要；可能為 2026 議程 10.3102/2280689（KB-2026-0110）之前期版本 |
| `10.3102/2195238` | AERA | unknown | AERA 2025 議程頁回驗證頁（本次試讀 2197285 一次，未繞過）；Crossref、OpenAlex、Semantic Scholar 皆無摘要 |
| `10.3102/2190458` | AERA | unknown | AERA 2025 議程頁回驗證頁（本次試讀 2197285 一次，未繞過）；Crossref、OpenAlex、Semantic Scholar 皆無摘要 |
| `10.3102/2288144` | AERA | A | 摘要未寫學段，K-12 只在場次名 |
| `10.3102/2186829` | AERA | unknown | AERA 2025 議程頁回驗證頁（本次試讀 2197285 一次，未繞過）；Crossref、OpenAlex、Semantic Scholar 皆無摘要 |
| `10.3102/2272689` | AERA | A | K–20 混合學段，未指定主要對象 |
| `10.3102/2276315` | AERA | A | 對象為教育領導者（依新規則可判 A），但資料為 2020–21 疫情訪談，AI 部分為推論（管理者先前改回待判） |
| `10.3102/2190722` | AERA | unknown | AERA 2025 議程頁回驗證頁（本次試讀 2197285 一次，未繞過）；Crossref、OpenAlex、Semantic Scholar 皆無摘要 |
| `10.3102/2194056` | AERA | unknown | AERA 2025 議程頁回驗證頁（本次試讀 2197285 一次，未繞過）；Crossref、OpenAlex、Semantic Scholar 皆無摘要 |
| `10.3102/2198280` | AERA | unknown | AERA 2025 議程頁回驗證頁（本次試讀 2197285 一次，未繞過）；Crossref、OpenAlex、Semantic Scholar 皆無摘要 |
| `10.3102/2281719` | AERA | B | 年齡明示，但為全國線上調查、非學習情境，主題偏日常使用與福祉（管理者先前決定維持待判） |
| `10.1145/3772363.3778682` | CONF | A | 工作坊提案、只寫 youth |
| `10.1145/3706598.3713443` | CONF | A | 工具回顧，只寫 children，無年齡、學段 |
| `10.1145/3706598.3713173` | CONF | A | K-12 只在研究動機；參與的 26 名學生未寫年級或年齡 |
| `10.1145/3706598.3713510` | CONF | A | college bridge 暑期課程，可能為升大學前後，未寫年級或年齡 |
| `10.1145/3772363.3798673` | CONF | A | 系統性回顧只寫 youth；內容偏風險治理 |
| `10.1145/3772318.3791483` | CONF | A | 年齡明示但非學習情境，AI 素養只在結論（管理者先前決定維持待判） |
| `10.1109/icalt64023.2025.00035` | CONF | A | 只寫 students，無學段或年齡 |

## 排除

| DOI | 類 | 原因 |
|---|---|---|
| `10.1145/3706599.3719844` | A | 摘要明示對象為成人 |
| `10.1145/3772318.3791346` | C | 範圍外（C）：主題為 AI 系統安全研究方法，非教與學；且只寫 youth |
| `10.1145/3715070.3748294` | C | 範圍外（C）：AI 開發流程與兒少網路安全工作坊提案，非教與學 |

## 邊界（請管理者決定）

| DOI | 目前決定 | 說明 |
|---|---|---|
| `10.1145/3773077.3816198` | pending | 工作坊提案、無研究對象；3–8 歲橫跨學前（管理者先前決定維持待判） |
| `10.1145/3773077.3812189` | pending | 年齡 11–17 明示，但為 AI 治理研究工具（進行中），非學習情境；學段規則要求學習情境 |
| `10.1145/3773077.3812130` | pending | 回顧本身只寫 young people；13–14 歲僅為所提後續研究（管理者先前決定維持待判） |
| `10.3102/2272689` | pending | K–20 混合學段，未指定主要對象 |
| `10.3102/2276315` | pending | 對象為教育領導者（依新規則可判 A），但資料為 2020–21 疫情訪談，AI 部分為推論（管理者先前改回待判） |
| `10.3102/2281719` | pending | 年齡明示，但為全國線上調查、非學習情境，主題偏日常使用與福祉（管理者先前決定維持待判） |
| `10.1145/3706598.3713510` | pending | college bridge 暑期課程，可能為升大學前後，未寫年級或年齡 |
| `10.1145/3772363.3798673` | pending | 系統性回顧只寫 youth；內容偏風險治理 |
| `10.1145/3772318.3791346` | exclude | 範圍外（C）：主題為 AI 系統安全研究方法，非教與學；且只寫 youth |
| `10.1145/3772318.3791483` | pending | 年齡明示但非學習情境，AI 素養只在結論（管理者先前決定維持待判） |
| `10.1145/3715070.3748294` | exclude | 範圍外（C）：AI 開發流程與兒少網路安全工作坊提案，非教與學 |

## 限制

- Semantic Scholar 的摘要沒有和 ACM 官方頁逐字核對（依指示未請求 ACM DL）。題名與年份已用 Crossref 核對。
- 待判中「只寫 youth／teens」的 IDC 件，主題都是 A 類；如果管理者放寬「teens 可視為 K-12」，可以再逐件轉為匯入。
- 類別建議沒有讀全文。AERA 2025 的 12 件需要人工登入議程頁，或等官方開放才能判定。
