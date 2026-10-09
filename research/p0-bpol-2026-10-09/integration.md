# B-POL 各國官方 K–12 AI 政策歷年紀錄＋B-IDX 國別補強：整合報告（2026-10-09）

> **性質：人工搜尋輔助的整合紀錄，不是認證。** 三組＋B-IDX 皆為同一 Claude session 的子代理，彼此同意**不算獨立審閱**。候選池（10 筆 hold）、`publication/issues.json`、`research/drafts/` 未動；網站檔只有 `render-site.js --write` 產生的區塊。

## 基準與時間

- 基準 main `fb53ab1`（#104）；正式三表、`issues.json`、本期候選 JSON 雜湊見 [baseline-sha256.txt](baseline-sha256.txt)，入庫後後兩者仍一致。
- UTC：A 組（亞洲）17:28:21–17:49:31、B 組（美英澳）17:28:20–17:36:36、C 組（國際）17:28:20–17:36:54、B-IDX 17:31:50–17:36:05。平行牆鐘約 21 分。
- 證據：[group-a](group-a.md)、[group-b](group-b.md)、[group-c](group-c.md)、[bidx-countries](bidx-countries.md) 及同名 JSON（每次讀取的 URL、方法、HTTP 狀態、UTC；原頁日期字樣）。

## 取得與日期規則

- 首發日只採 **curl 讀到的官方原頁或官方 API／元資料**（GOV.UK Content API `first_published_at`、Federal Register API `publication_date`、EU 出版局、原頁發布日字樣）；WebSearch／WebFetch 只當線索。讀不到者 unknown 或待判。
- 未繞過任何驗證頁：UNESDOC captcha、federalregister.gov 全文頁 access check、CDE 2023 舊版 Radware captcha、AERA 2025 議程驗證頁、EUR-Lex 後段 202 空回應；未停用 TLS 驗證（pads.moe.edu.tw 憑證錯誤）。
- 整合者 curl 抽查：MEXT 頁「令和5年5月19日」「令和5年7月4日」、GOV.UK API product safety 2025-01-22、EUR-Lex 2026/1744 存在、中國「人工智能+教育」行動計畫頁（https 可讀）、新加坡 COS 2026 講稿含 AI literacy，均相符。

## 結果

| 組 | 範圍 | 候選 | 待判 | 已在庫 | 入庫 |
|---|---|---|---|---|---|
| A | 日本、中國、韓國、香港、新加坡、臺灣 | 19 | 8 | 2 | 19 |
| B | 美國聯邦＋6 州、英格蘭、澳洲聯邦＋NSW | 15 | 7 | 3 | 14 |
| C | UNESCO、OECD、歐盟、歐洲理事會、UNICEF | 8 | 9 | 3 | 6 |

（B 組回報寫 17 件候選，實際 JSON 為 15 件。）

**管理者決定（2026-10-09）**：照整合者建議入庫；新代碼由搜尋 session 補登。
- 改列待判：歐盟 AI Act（2024/1689）與 Digital Omnibus（2026/1744）——AI 素養條款非 K–12 專屬；DfE《Generative AI in education: user research and technical report》——研究報告非政策文件。
- UNESCO《Guidance for generative AI in education and research》入庫（以年齡門檻與適齡設計規範學校使用；原頁未明寫 K–12）。
- 韓國《수행평가 시 AI 활용 관리 방안》記月精度 2025-12（網頁登錄 12-23、報導禁刊至 12-24）。
- 香港藍圖兩份附件採 2026-06-17（通告明寫附有；PDF 本身無日期）。
- 中國 2024-12 中小學 AI 教育通知以官方新聞頁入庫（通知原文官網未見）。
- 新代碼已登錄 [source-registry-and-review-policy-v17.md](../source-registry-and-review-policy-v17.md)：O-US-WH、O-US-CA-CDE、O-US-NC-DPI、O-US-WA-OSPI、O-US-OR-ODE、O-US-OH-DEW、O-US-GA-DOE、O-AU-NSW-DOE、O-TW-EY。
- record_type 對應網站分類：行政命令與補助優先事項定案 `binding_policy`、草案 `draft`、徵集證據 `consultation`。

## 入庫明細（39 筆，全部 `discovered_unverified`）

有首發日者 `year_basis=first_publication`；無者 `date_precision=unknown`、`year_basis=unknown`、年份留空（ID 年份沿用發現年慣例 2026）。中國教育部網址改為 https（原頁 https 可讀）。

| record_id | 發布機關 | 適用 | 類型 | 首發日 | 題名 |
|---|---|---|---|---|---|
| KB-2023-0003 | O-JP-MEXT | JP | government_announcement | 2023-05-19 | ChatGPT等の生成AIの学校現場の利用に向けた今後の対応について（事務連絡） |
| KB-2023-0004 | O-JP-MEXT | JP | official_guidance | 2023-07-04 | 初等中等教育段階における生成AIの利用に関する暫定的なガイドライン |
| KB-2024-0005 | O-CN-MOE | CN | government_announcement | 2024-12-02 | 教育部办公厅关于加强中小学人工智能教育的通知（官方新闻：教育部部署加强中小学人工智能教育） |
| KB-2026-0088 | O-CN-MOE | CN | official_guidance | 2026-04-10 | 教育部等五部门关于印发《“人工智能+教育”行动计划》的通知（教科信〔2026〕1号） |
| KB-2020-0001 | O-KR-MOE | KR | official_guidance | 2020-11-20 | 인공지능 시대 교육정책방향과 핵심과제（제19차 사회관계장관회의 안건） |
| KB-2022-0001 | O-KR-MOE | KR | framework | 2022-08-11 | 교육분야 인공지능 윤리원칙 |
| KB-2023-0005 | O-KR-MOE | KR | government_announcement | 2023-06-08 | 인공지능(AI) 디지털교과서 추진방안 |
| KB-2025-0043 | O-KR-MOE | KR | official_guidance | 2025-11-10 | 모두를 위한 인공지능(AI) 인재양성 방안（AI for All） |
| KB-2025-0044 | O-KR-MOE | KR | official_guidance | 2025-12 | 수행평가 시, 인공지능(AI) 활용 관리 방안 |
| KB-2023-0006 | O-HK-EDB | HK | framework | 2023-06-19 | Education Bureau Circular Memorandum No. 109/2023: Curriculum Modules  |
| KB-2026-0089 | O-HK-EDB | HK | official_guidance | 2026-06-17 | Blueprint for Digital Education Development in Primary and Secondary S |
| KB-2026-0090 | O-HK-EDB | HK | framework | 2026-06-17 | Supplement I: AI Literacy Learning Framework for Primary and Secondary |
| KB-2026-0091 | O-HK-EDB | HK | official_guidance | 2026-06-17 | Supplement II: Guide to Using AI in Teaching in Primary and Secondary  |
| KB-2026-0092 | O-HK-EDB | HK | framework | 2026-07-21 | “Preliminary Study of Artificial Intelligence” Strand (Pilot Version)  |
| KB-2023-0007 | O-SG-MOE | SG | government_announcement | 2023-02-07 | Managing the use of artificial intelligence (AI) bots such as ChatGPT  |
| KB-2023-0008 | O-SG-MOE | SG | government_announcement | 2023-09-20 | More Support for Schools and Students to Shape the Future of Learning（ |
| KB-2026-0093 | O-SG-MOE | SG | official_guidance | unknown | MOE's position on AI use in education and assessment |
| KB-2026-0094 | O-SG-MOE | SG | government_announcement | 2026-03-03 | MOE Committee of Supply Debate 2026: “Four Learns” approach to strengt |
| KB-2026-0095 | O-TW-EY | TW | government_announcement | 2026-05-21 | 打造AI智慧教育新生態─AI人才方舟計畫（115–118年） |
| KB-2026-0096 | O-US-WH | US | binding_policy | unknown | Executive Order 14277: Advancing Artificial Intelligence Education for |
| KB-2025-0045 | O-US-ED | US | draft | 2025-07-21 | Proposed Priority and Definitions—Secretary's Supplemental Priority an |
| KB-2026-0097 | O-US-ED | US | binding_policy | 2026-04-13 | Final Priority and Definitions—Secretary's Supplemental Priority and D |
| KB-2026-0098 | O-US-CA-CDE | US | official_guidance | unknown | Guidance for the Safe and Effective Use of Artificial Intelligence in  |
| KB-2026-0099 | O-US-NC-DPI | US | official_guidance | unknown | NCDPI Generative AI Implementation Recommendations and Considerations  |
| KB-2024-0006 | O-US-WA-OSPI | US | official_guidance | 2024-01-18 | Human-Centered AI Guidance for K-12 Public Schools |
| KB-2026-0100 | O-US-OR-ODE | US | official_guidance | unknown | Generative Artificial Intelligence (AI) in K-12 Classrooms Guidance (v |
| KB-2025-0046 | O-US-OH-DEW | US | official_guidance | 2025-12-30 | AI in Education: Model Policy for Ohio Districts and Schools |
| KB-2025-0047 | O-US-GA-DOE | US | official_guidance | 2025-01-21 | Leveraging AI in the K-12 Setting |
| KB-2023-0009 | O-UK-DFE | GB-ENG | consultation | 2023-06-14 | Generative artificial intelligence in education call for evidence |
| KB-2024-0007 | O-UK-DFE | GB-ENG | official_guidance | 2024-02-07 | Generative artificial intelligence (AI) and data protection in schools |
| KB-2025-0048 | O-UK-DFE | GB-ENG | official_guidance | 2025-01-22 | Generative AI: product safety standards |
| KB-2025-0049 | O-UK-DFE | GB-ENG | official_guidance | 2025-06-10 | Using AI in education settings: support materials |
| KB-2026-0101 | O-AU-NSW-DOE | AU | official_guidance | unknown | Guidelines regarding the use of generative AI |
| KB-2022-0002 | O-UNESCO | 國際 | policy_review | 2022 | K-12 AI curricula: a mapping of government-endorsed AI curricula |
| KB-2023-0010 | O-UNESCO | 國際 | official_guidance | 2023-09-07 | Guidance for generative AI in education and research |
| KB-2022-0003 | O-EU-EC | EU | official_guidance | 2022-10-25 | Ethical guidelines on the use of artificial intelligence (AI) and data |
| KB-2026-0102 | O-EU-EC | EU | official_guidance | 2026-03-05 | Guidelines on the ethical use of artificial intelligence and data in t |
| KB-2021-0001 | O-UNICEF | 國際 | official_guidance | 2021 | Policy guidance on AI for children (Version 2.0) |
| KB-2025-0050 | O-UNICEF | 國際 | official_guidance | 2025-12 | Guidance on AI and children (Version 3.0): Recommendations for AI poli |

**版本關係（只記官方明示）**：KB-2024-0003（日本 Ver.2.0）`revises` KB-2023-0004（暫定版）；KB-2026-0102 `revises` KB-2022-0003（歐盟指引 2026 版）；KB-2025-0050 `revises` KB-2021-0001（UNICEF 3.0）；KB-2026-0097 `revises` KB-2025-0045（ED 補助優先事項定案←草案）；KB-2026-0090、KB-2026-0091 `supplements` KB-2026-0089（香港藍圖附件）。不自動合併。

## B-IDX：研究國別補強

89 筆無 `studies_country` 的論文（候選對應紀錄除外）重讀摘要：found 5、none_stated 79、no_abstract 5。新增 4 筆 `studies_country`：KB-2025-0005 KR、KB-2025-0012 HK、KB-2026-0017 US、KB-2026-0087 US（議程摘要明寫 "U.S. states"，修正 B1 時的留空）。KB-2025-0003 只在背景提及美國，不收。只寫州名者（KB-2026-0054、0072、0080、0083）維持留空。2 篇不在監測來源的論文（KB-2026-0005、KB-2026-0051）不補 `published_in`。

## 數字與測試

- records 135→174、relations 307→468、search runs 79→101（每發布機關一筆 `P0-20261009-BPOL-*`，`query_scoped`／`partial`；O-COE 全站 403 記 `unavailable`、計數留空）。索引以既有 `--write-index`／`--write` 重建；網站以 `render-site.js --write` 重建（首頁政策數 8→47，政策清單 10 組）。
- `validate-knowledge-base.test.js` 四個測試的寫死清單／數量改為保留同樣保護（逐條見 PR 說明）；本機 `node --test research/*.test.js` 200／200 通過，CI verify 內容本機均通過。

## 待判（24 件，只在 group JSON）與限制

1. 臺灣教育部 4 件（pads.moe.edu.tw TLS 錯誤）：數位教學指引 3.0、中小學使用生成式 AI 注意事項 1.0→2.1、學習評量使用生成式 AI 注意事項、中小學師生 AI 素養框架。
2. 美國 ED 4 件（ed.gov 403）：2023 AI and the Future of Teaching and Learning、2024 開發者指引與 Leaders Toolkit、2025-07 補助款指引。
3. OECD 4 件（全站 403；日期只有 Crossref）、UNESCO 3 件（UNESDOC captcha）、歐洲理事會 AI 素養建議（403）、歐盟理事會教師結論（只讀到草案）。
4. 中國 2025 年兩份中小學 AI 指南（原頁未見）、義務教育信息科技課標（PDF 掃描）；韓國 AI 教科書開發；澳洲聯邦 2 件（站台連線失敗）；NSW NSWEduChat 家長頁。
5. 州層級只取代表，非全美普查；行政命令首發日未讀白宮原頁（FR 簽署日 2025-04-23、刊登日 2025-04-28 另記）。
6. 指南 3.7 實測差異（由編輯 session 維護，未改）：新加坡 MOE curl 可讀、香港 EDB 通告 PDF 可直讀、臺灣 pads.moe.edu.tw TLS 錯誤、韓國 moe.go.kr 常 connection reset。
