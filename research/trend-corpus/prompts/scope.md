# Prompt: scope screening (範圍判斷) — v2 (manager-approved 2026-10-10)

You are screening journal articles for a descriptive study of K-12 AI literacy research.
You will receive a batch of records. Each record has only `work_id`, `title`, and `abstract`
(year, journal, DOI and authors are removed). Judge each record independently; do not
compare records within the batch. Use only the text given. If the abstract does not say
something, answer `unknown` — even if you recognise the paper.

Do NOT open or read any file in the repository's `research/knowledge-base/`,
`research/p0-*` or `research/trend-corpus/calib.csv`. Use only the rules below.

## Classes
- **A** — the main content is K-12 students' or teachers' (incl. pre-service teachers, parents,
  principals) knowledge, skills, attitudes or practices regarding AI: understanding, teaching,
  learning, assessing, describing or governing AI literacy. Examples: AI literacy curricula,
  scales, frameworks; students learning how AI works or about bias; teachers' AI literacy,
  readiness, AI-TPACK; generative-AI teacher training and its effects; school AI rules and
  ethics teaching; students' strategies / self-regulation when learning with AI; student AI projects.
- **B** — teachers or students actually use an AI tool in teaching or learning, and the study
  focuses on the tool's use or effects, not on AI literacy itself. Examples: effect of ChatGPT on
  EFL writing; an ITS for maths; teachers using GenAI to plan lessons.
- **C** — AI is only a research method or system back-end (learners do not interact with AI),
  or the topic does not involve AI at all. Examples: ML prediction of achievement; automated
  scoring accuracy; learning analytics; data literacy without AI; general digital literacy.
- **unknown** — the title and abstract are not enough.

## Rules
1. Judge by what the study actually teaches or measures, not by its stated aim.
2. If both A and B content are present, choose A — EXCEPT rule 3.
3. Studies mainly about acceptance, intention to use or satisfaction with a specific AI tool
   (e.g. TAM, UTAUT questionnaires) are **B**. Studies mainly about understanding of, attitudes
   towards, or ethics of AI itself are A.
4. ITS: K-12 learners or teachers operating an ITS → B; only the ITS algorithm, logs or models → C.
5. Teacher AI-TPACK or generative-AI teaching training → A.
6. Non-K-12 populations (university, adult, medical) are still classified A/B/C by content;
   report the population in `audience_role`.
7. B sub-type, first match in this order: `genai` (LLM/ChatGPT/generative) → `its_adaptive` →
   `robot_agent` (robots, pedagogical agents, chatbots stated to be rule-based) → `other`
   (including chatbots whose type is not stated).
8. Not an education setting → **C** (write "非教育情境" in the rationale): public opinion about AI,
   workplace AI risk, general essays on AI ethics in society, home use of assistants with no learning
   activity. Studies of EdTech companies, schools or education authorities on AI ethics or governance
   ARE education settings.
9. (v2) Students and AI: a study asking HOW students use AI (strategies, prompting, dependent vs reflective use,
   self-regulation while using AI) → A; a study asking what EFFECT a tool has (scores, motivation, change in
   self-regulation scores) → B.
10. (v2) Teachers or pre-service teachers using GenAI to prepare teaching: focus on the teachers' understanding or
   judgement of AI (evaluating, critiquing AI output) → A; focus on the teaching product or efficiency → B.
11. (v2) Researchers or experts only evaluating LLM output quality, with no teacher or learner using it → C; if there is a
   learning activity (e.g. student teachers auditing an LLM for bias) → A.
12. (v2) audience_role: if the text gives no K-12 cue at all (school, grade, K-12, ages, school type) and only says
   "students" or "learners", use unknown.
13. ITS rule 4: decide by whether learners or teachers actually used the system and their data were
   collected in this study.

## Output
One JSON object per line, nothing else:
{"work_id":"...","ai_lit_class":"A|B|C|unknown","b_subtype":"genai|its_adaptive|robot_agent|other|",
 "audience_role":"student|inservice_teacher|preservice_teacher|other_stakeholder|non_k12|unknown",
 "rationale":"<one sentence paraphrase; do not quote the abstract>",
 "evidence":[{"field":"ai_lit_class","span":"<verbatim, ≤15 English words from the title or abstract>"}],
 "model_id":"<your model id>"}
- Every non-`unknown` value of `ai_lit_class` and `audience_role` needs one evidence span copied
  verbatim (≤15 words). `unknown` values must have no span. Values that state an absence (e.g. a C
  record with no AI) need no span.
