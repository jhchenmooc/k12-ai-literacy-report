# 政策紀錄積壓處理（2026-10-10）

> **性質：人工搜尋輔助的書目核對，不是認證。** 判讀子代理與整合者是同一模型，**不算獨立審閱**。
>
> 只採官方頁面、官方文件或官方 API 明載的資訊。所有請求都開著 TLS 驗證；pads.moe.edu.tw 依管理者核准的方式補完中繼憑證。沒有繞過 captcha、登入或 403，也沒有帶 email 或 mailto。

## 一、書目未核的 10 筆政策紀錄再核

逐筆結果見 [recheck10.json](recheck10.json)。

**8 筆和官方原頁相符，升為 `bibliographic_checked`**；`issued_by`、`applies_to_country` 兩種關聯一併升級：

| 紀錄 | 依據 |
|---|---|
| KB-2026-0099 北卡 NCDPI | 文件「Publication Date 1/16/24」 |
| KB-2024-0006 華盛頓 OSPI | 首發日 unknown 成立。題名改用官方的「K–12」（en dash） |
| KB-2025-0046 俄亥俄 DEW | 首發日 unknown 成立 |
| KB-2026-0102 歐盟倫理指引 | 首發日 unknown 成立 |
| KB-2024-0005 中國教育部 | 原頁「2024-12-02」 |
| KB-2026-0094 新加坡 COS 2026 | 原頁「Published on: 03 Mar 2026」 |
| KB-2026-0090、0091 香港藍圖附件 | 見下 |

香港兩份附件的 PDF 本身沒有日期。教育局通告 EDBC 11/2026（2026-06-17）第 6、8 段與附件明確宣布發布這兩份文件，所以 2026-06-17 有官方依據；日期依據是該通告，不是 `primary_url`。

**2 筆依原頁修正，維持 `discovered_unverified`（下一輪再升級）：**

- **KB-2026-0096 行政命令 14277：** 題名改為官方題名「Advancing Artificial Intelligence Education for American Youth」，去掉「Executive Order 14277:」前綴。日期、機關都相符。
- **KB-2025-0044 韓國評量 AI 方案：**
  - 題名改為原頁新聞稿題名。
  - 首發日由 2025-12（月）改為 2025-12-23（日），依據是原頁登錄日；附件檔名的 12-24 是早報禁刊日。

## 二、B-POL 待判 24 件重試

逐筆結果見 [bpol-retry.json](bpol-retry.json)，輸入見 [bpol-pending-input.json](bpol-pending-input.json)。

**入庫 7 件：**

| record_id | 文件 | 機關 | 狀態 | 首發日 |
|---|---|---|---|---|
| KB-2022-0004 | 义务教育信息科技课程标准（2022年版） | O-CN-MOE | bibliographic_checked | 2022-04-21（原頁「发布日期」） |
| KB-2026-0236 | 韓國 AI 科目認定教科書（新聞稿） | O-KR-MOE | bibliographic_checked | 2026-08-27（附件「배포」） |
| KB-2026-0238 | Council conclusions on teachers in the era of AI | **O-EU-COUNCIL（新代碼）** | bibliographic_checked | 2026-05-11（理事會核准並公開；文件 9003/26 載明）。原記 2026-05-26 為官方公報 OJ C/2026/2826 刊登日，2026-10-10 依管理者決定改正 |
| KB-2024-0008 | 中小學數位教學指引3.0版 | O-TW-MOE | discovered_unverified | unknown |
| KB-2026-0237 | 中小學使用「生成式人工智慧」注意事項2.1 | O-TW-MOE | discovered_unverified | unknown |
| KB-2023-0011 | AI and the Future of Teaching and Learning | O-US-ED | discovered_unverified | unknown |
| KB-2024-0009 | Empowering Education Leaders Toolkit | O-US-ED | discovered_unverified | unknown |

**各筆說明：**

- **中國課標：** 邊界案例。AI 只是課標的一個模組（7–9 年級「人工智能与智慧社会」）。PDF 是掃描檔，由目錄頁目視核對。
- **數位教學指引 3.0：** 教育部新聞寫 2024-08-22 發布，但下載檔封面是 2025 年 1 月，可能是再版，版本關係待確認，所以首發日記 unknown。
- **注意事項 2.1：**
  - 原文只有三次函核定日：1.0 為 2024-07-01，2.0 為 2025-12-23，2.1 為 2026-02-11。核定日不是發布日，所以首發日記 unknown。
  - 學生版（pads title_id=1918）與這筆同屬一個版本系列，這次沒有另建紀錄。
- **美國教育部 2 件：**
  - ed.gov 回 403。依管理者決定，以 ERIC（美國教育部 IES 的官方資料庫）作為官方來源，`primary_url` 用 ERIC 頁。
  - 封面月份（2023-05、2024-10）不是原頁發布日，不填首發日。
  - Toolkit 的主要對象是教育領導者（`other_stakeholders`）。
- **新代碼：** O-EU-COUNCIL 已登錄於 `source-registry-and-review-policy-v17.md`。

**其餘處理：**

- **重複 1 件：** 臺灣 AI 素養框架已在庫，為 KB-2026-0173。
- **排除 2 件：** 美國教育部開發者指引（對象為業者、未限 K-12，判 C）；NSW 家長宣導頁（不是政策文件）。
- **仍待判 14 件：**
  - 中國 2025 年兩份指南、臺灣評量注意事項：找不到官方原件。
  - 美國補助款指引、澳洲 2 件、OECD 4 件、歐洲理事會：網站擋讀取。
  - UNESCO 3 件：題名、機關、日期都已核到，但學段只見於 UNESDOC 全文，而 UNESDOC 被 Cloudflare 擋下。
- **新線索（下一輪處理）：**
  - pads 上的 115 年新版教師、校長、家長數位與 AI 指引，以及《AI之學習應用手冊》。
  - 高級中等學校版評量注意事項。
