# 韓國教師生成式 AI 指引：KB-2026-0277 補註與 KB-2025-0414 新增（2026-10-13）

管理者 2026-10-13 決定（「照建議，1–3 都做」）。來源由文獻 session 提出（私人 repo 分支 `lit-session-kr`），編輯 session 讀官方原檔核對後寫入。全文 PDF 存私人 repo，不放公開 repo。

## KB-2026-0277：KICE 研究報告第 13 號（補註）

紀錄本身於同日補發短訊 D20261013-05 時建立（PR #280），主網址為 KICE 보도자료頁（등록일 2026-10-07），附件即報告 PDF。本次只補下列資訊，題名、網址、首發日不變。

- 新增關聯 `has_ailit_dim` = `T-BAS`（KR-11558），AI 判讀，`discovered_unverified`。
- 書目（讀報告 PDF 版權頁，2026-10-13T16:26Z 從官方附件下載）：
  - 題名：《2025 교사의 수업 및 평가 지원을 위한 생성형 AI 활용 방안 탐색》（KICE 연구리포트 2025）。
  - 研究責任者：홍선주；發行日：2026 年 10 月 7 日；發行處：한국교육과정평가원。
  - 編號：홍보자료 PIM 2026-1-13；ISBN 979-11-6846-567-1 95370（套書 979-11-6846-554-1）。
- 內容要點（報告原文）：教師調查抽樣國小至高中教師 2,740 人（回應率 60.5%）；開發《수업 및 평가를 위한 생성형 AI 활용 가이드라인》，含 5 項倫理原則、15 條共同指引，及依教學設計階段的運用策略與指引。
- 同一研究的指引本身是研究資料 **ORM 2025-112**（版權頁「발행일: 2025. 12. 31.」，發行處 한국교육과정평가원）。當時找不到官方公開頁面，未另立紀錄；同日稍後在 KICE 연구보고서資料庫找到官方頁，已另立 KB-2025-0415（見下節）。2026-10-11 的財經新聞報導屬事後報導，不作首發依據。

## KB-2025-0414：京畿道教育廳《생성형 인공지능 활용교육 교사용 가이드라인》（新增）

- 主網址：<https://www.goe.go.kr/resource/old/BBSMSTR_000000000126/BBS_202502240135524570.pdf>（官方 PDF；2026-10-13T16:39Z 讀取，HTTP 200，88 頁）。
- 首發日 2025-02-24（`day`，`first_publication`）：依版權頁「발행일 2025년 2월 24일」；網址檔名時間戳 `20250224` 一致。未找到該 PDF 所在的官方公告頁。
- 發行處：경기도교육청 미래교육담당관（新機構代碼 `O-KR-GOE`）。適用範圍：國小至高中教師（「초중고 교사 대상」）。
- `record_type=official_guidance`，`bibliographic_checked`；關聯 KR-11559～11570：K4、K5；`issued_by` O-KR-GOE；`applies_to_country` KR（京畿道地方教育廳，非全國）；`ROLE_INSERVICE_TEACHER`、`STAGE_K12_MULTI`；`TOPIC_GENAI`、`TOPIC_ETHICS`；A 類，T-ETH、T-BAS、T-TEA。標記為 AI 判讀，`discovered_unverified`。
- 授權：공공누리 제4유형（出處標示、禁止商業使用、禁止變更）。私人 repo 存檔與文獻 session 上傳檔相同。

## KB-2025-0415、KB-2025-0416：KICE 指引與完整研究報告（2026-10-13 補建）

管理者 2026-10-13 同意（「依照建議」）。在 KICE 연구보고서資料庫（https://www.kice.re.kr/resrchBoard/list.do?cate=0&m=030109&s=kice ）以「생성형 AI」搜尋，找到兩個官方條目，2026-10-13T22:03Z 讀取。

- **KB-2025-0415**：《수업 및 평가를 위한 생성형 AI 활용 가이드라인(ORM 2025-112)》，`official_guidance`，條目頁 <https://www.kice.re.kr/resrchBoard/view.do?seq=1308&s=kice&m=030109>。
  - 條目頁：연구자료 ORM 2025-112，研究責任者 홍선주，共同研究者 권점례、김광규、박용효、이재봉，16 頁（PDF 17 頁），發刊年度 2025，公開。
  - 從官方頁下載的 PDF 與先前私人 repo 存檔（文獻 session 上傳）SHA-256 相同（e06f274d…4f30）。
  - 首發日 2025-12（`month`）：版權頁發行日 2025-12-31，但官方附件路徑時間戳為 2025-12-22（`/resrchBoard/2025/12/1766376773695_…`），兩者不一致，只取到月。
  - 關聯 KR-11571～11583：K4、K5；`issued_by` O-KR-KICE；KR；在職教師、K12 跨學段；生成式 AI、評量；A 類，T-TEA、T-ETH、T-BAS；`supplements` KB-2025-0416。標記為 AI 判讀。
- **KB-2025-0416**：《교사의 수업 및 평가 지원을 위한 생성형 AI 활용 방안 탐색(RRI 2025-3)》，`policy_review`（KICE 研究報告），條目頁 <https://www.kice.re.kr/resrchBoard/view.do?seq=1305&s=kice&m=030109>。
  - 條目頁：연구보고 RRI 2025-3，英文名 A Guideline for Using Generative AI to Support Teachers' Instruction and Assessment；研究責任者 홍선주，共同研究者 권점례、김광규、박용효、이재봉、박연정（全北大學）；339 頁（PDF 338 頁）；ISBN 979-11-6846-527-5 93370；研究類型「기초」；公開。
  - 首發日 2025-12（`month`）：官方附件路徑時間戳 2025-12-22，PDF 建立日 2025-12-11；條目頁只標發刊年度 2025。
  - 關聯 KR-11584～11596：K4、K2；`issued_by` O-KR-KICE；KR；在職教師、K12 跨學段；生成式 AI、評量；混合方法（文獻分析、2,740 名教師問卷、訪談、專家協議）；A 類，T-TEA、T-ETH、T-BAS。標記為 AI 判讀。
  - 完整報告 PDF 存私人 repo `from-editor-session/daily-pdfs/KICE-RRI-2025-3__full-research-report.pdf`。
- KB-2026-0277（2026-10-07 新聞稿）介紹的研究簡報 PIM 2026-1-13，是這份報告的摘要。
