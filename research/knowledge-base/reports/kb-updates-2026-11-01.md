# 知識庫更新：KB-2026-0446 升級、ILE 2754919 入庫、研究國別測試放寬（2026-11-01）

管理者 2026-11-01 指示三項。

1. **KB-2026-0446**（Interactive Learning Environments 10.1080/10494820.2026.2744403，H11）：依出版者 PDF「Published online: 08 Oct 2026」（私人 repo `from-literature-session/scholar-monthly-1026/`），紀錄補首發日 2026-10-08、升 `bibliographic_checked`，5 筆既有關聯同步升級，另補 `published_in` J40（KR-15776）。週候選池 W2026-10-23-A13 由 hold 改為 publish（`source_checked` true、`first_disclosed_on` 2026-10-08），依 10-27 管理者「甲」：月報選用時才改 publish。**10 月號第 2 項 H11 改留 2744403 與 2735920（KB-2026-0449），stueduc.101698（KB-2026-0453）不列。**
2. **KB-2026-0507**（ILE 10.1080/10494820.2026.2754919，Yang、Gu〈Teachers' perceptions of students' generative AI use, professional judgment, and pedagogical adaptation: a mixed-methods study〉）：管理者提供出版者 PDF（私人 repo `from-editor-session/daily-pdfs/no-kb__ile-2754919.pdf`），首頁印 Published online: 30 Oct 2026。不發每日短訊；對象記 **higher_ed**，比照高教紀錄不加 `has_population`。**備註：樣本為中國在職教師 658 人，其中高中 302 人（45.9%）、高教 356 人（54.1%），質性訪談 24 人（高中 11、高教 13）。** A（T-TEA）、TOPIC_GENAI、METHOD_MIXED、研究國別 CN、published_in J40；`bibliographic_checked`；關聯 KR-15777～15783。
3. **研究國別測試放寬**：`research/validate-knowledge-base.test.js` 原以 deepEqual 斷言 `by-country/GB`、`GR`、`BR` 只含 KB-2025-0002，任何新紀錄標這三國都會失敗（2026-10-25 起記在 `research/exceptions.md`）。改為「包含 KB-2025-0002」，仍確認該筆的國別對應，不再排除其他紀錄。KB-2026-0503（JCAL 10.1002/jcal.70362，巴西樣本）補標 `studies_country` BR（KR-15784）。同樣因此未標的 KB-2026-0440（SLE，巴西樣本）本次未補，待管理者決定。
4. **補記（同日）**：管理者指示 KB-2026-0440（SLE 10.1186/s40561-026-00465-x，巴西樣本）補標 `studies_country` BR（KR-15785）。
