# Prompt: second coding pass (第二次編碼) — v2 (manager-approved 2026-10-10)

This is an independent re-coding pass. You have not seen any earlier codes and must not look for
them. You get `work_id`, `title`, `abstract` only; nothing about year, venue, DOI or authors. Decide
every record on its own and only from the text. Where the text is silent, write `unknown` — do so
even when you think you know the paper. Never consult `research/knowledge-base/`, any
`research/p0-*` file, `calib.csv`, or any earlier coding output.

## What to record
- `ai_lit_class` — unknown | C | B | A.
  A: the study is about AI literacy of school students or school teachers (pre-service included;
  also parents, principals) — how they understand, learn, are taught, are assessed on, describe or
  govern AI. B: students or teachers use an AI tool for teaching/learning and the study looks at that
  use or its effect, not at AI literacy. C: AI is just the researchers' method or a hidden back-end, or
  there is no AI. If unsure: unknown. Acceptance / intention-to-use / satisfaction studies of a given
  AI tool (TAM, UTAUT …) are B. Learners operating an ITS: B; ITS logs or models only: C. AI-TPACK or
  GenAI teacher training: A. When a study has both A and B content (other than acceptance studies), take A.
  Outside education altogether (public opinion, workplace, society-level ethics essays, home use with no
  learning) → C, noting "非教育情境"; EdTech firms, schools or authorities discussing AI ethics count as
  education. (v2) HOW students use AI (strategies, prompting, reliance, self-regulation while using) → A; the
  EFFECT of a tool → B. Teachers preparing teaching with GenAI: their understanding/judgement of AI → A; the
  product or efficiency → B. LLM output judged only by researchers/experts, nobody learning → C; a learning
  activity such as student teachers auditing LLM bias → A. ITS: did learners/teachers actually use it and were their data collected here?
- `b_subtype` for B only — check in this order and take the first: genai, its_adaptive, robot_agent
  (robots, agents, chatbots explicitly rule-based), other (incl. chatbots of unstated type).
- `audience_role` — unknown | non_k12 | other_stakeholder | preservice_teacher | inservice_teacher | student.
  (v2) If nothing signals K-12 (school, grade, K-12, ages, school type) and only "students/learners" appears → unknown;
  then leave `ai_lit_dims` empty.
- `stage` — unknown | k12_unspecified | k12_multi | secondary_unspecified | vocational_secondary |
  upper_secondary | lower_secondary | primary | preschool. Teachers: the level they teach. A school-type
  name outranks a grade number. A majority level wins; several levels without a majority → k12_multi.
  (Same mapping as the codebook: elementary/primary = primary; middle/junior high = lower_secondary;
  high school/senior high = upper_secondary; only "adolescents/teenagers/youth/secondary" =
  secondary_unspecified; only "K-12/school/pupils/children" = k12_unspecified. Ages only, country unknown:
  15–17 upper_secondary, 12–14 lower_secondary, 6–11 primary, 3–5 preschool, spanning → k12_multi; for
  parents use the children's ages.)
- `ai_lit_dims` — any of T-PD, T-TEA, T-BAS, T-ETH (teachers only) or S-SYS, S-LRN, S-BAS, S-ETH
  (students only). Training itself → T-PD; classroom/lesson design → T-TEA. System building with a design
  process → S-SYS, otherwise project work → S-BAS. Teachable-Machine-style classifier training without a
  design process → S-BAS, level apply, note "[pre-genAI 類比對應]". AI4K12: societal impact → S-ETH; other
  big ideas → S-BAS. B records: usually S-LRN or T-TEA, but teachers learning with an AI tool in their
  own training → T-PD. Non-K-12 learners S-, university teachers T-. No fitting dimension → empty.
- `level` — unknown | create | apply | understand (only for a stated AI-related goal or task; other
  subject goals → unknown).
- `topic` — any of policy_governance, equity_special, stem_science, language, ct_programming_data,
  learning_intervention, ethics_safety, teacher_pd, assessment, ailit_curriculum, genai; or ["none"].
- `method` — test in this order and stop at the first match: review, instrument_dev, conceptual,
  experimental, mixed, design_based, qualitative, survey; else unknown.
- `outcome_measured` — interventions only (experimental, design_based, or mixed describing teaching that
  was delivered): yes with a pre/post test (one group is enough) or a comparison group; no with a
  post-test only or satisfaction only; blank otherwise. One-group pre/post + surveys = experimental;
  post-test only + interviews = mixed.
- `genai_flag` — no | unknown | yes.

## Output
JSON Lines, one object per record:
{"work_id":"...","ai_lit_class":"...","b_subtype":"","audience_role":"...","stage":"...","ai_lit_dims":[],
 "level":"...","topic":[],"method":"...","outcome_measured":"","genai_flag":"...","ai_lit_note":"",
 "rationale":"<own words>","evidence":[{"field":"...","span":"<exact copy, at most 15 English words>"}],
 "model_id":"<self-reported>"}
Each value other than unknown (and each dim/topic) must cite an exact copied span of at most 15 words;
unknown values cite nothing; values that state an absence (no, none, blank) need no span.
