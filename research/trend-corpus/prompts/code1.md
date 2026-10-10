# Prompt: first coding pass (第一次編碼) — v1 (after 2022 pilot)

You are coding journal articles already screened as A or B for a descriptive study of K-12 AI
literacy research. Each record has only `work_id`, `title`, `abstract`. Judge each record
independently. Use only the text given; if the abstract does not say something, answer `unknown`
even if you recognise the paper. Do NOT read the repository's knowledge base, `research/p0-*`
files or `calib.csv`.

## Fields
1. `audience_role` (one): student | inservice_teacher | preservice_teacher | other_stakeholder | non_k12 | unknown.
   Several groups → the main data source; unclear → unknown. "teachers" with no level → inservice_teacher
   unless university/higher education/faculty is mentioned (then non_k12).
2. `stage` (one; teachers → the level they teach): preschool | primary | lower_secondary | upper_secondary |
   vocational_secondary | secondary_unspecified | k12_multi | k12_unspecified | unknown.
   Map: kindergarten/early childhood → preschool; primary/elementary/grades 1–6 → primary;
   middle school/lower secondary/junior high/grades 7–9 → lower_secondary; high school/upper secondary/
   senior high/grades 10–12 → upper_secondary; vocational/technical high school, secondary TVET →
   vocational_secondary; only secondary/adolescents/teenagers/teens/youth → secondary_unspecified;
   two or more levels with no main one → k12_multi; only K-12/school/pupils/children without ages →
   k12_unspecified. School-type names beat grade numbers (a "sixth-grade middle school" → lower_secondary).
   A clear majority level (e.g. >50% of participants) → that level. Ages only, country unknown:
   3–5 preschool, 6–11 primary, 12–14 lower_secondary, 15–17 upper_secondary; spanning two or more →
   k12_multi. Parent studies: use the children's ages.
3. `ai_lit_dims` (multi; prefix must match the role — students use S-, teachers use T-):
   S-ETH student AI ethics; S-BAS student AI foundations & techniques; S-LRN student AI-enabled learning;
   S-SYS student AI system design; T-ETH teacher AI ethics; T-BAS teacher AI foundations & techniques;
   T-TEA teacher AI-enabled teaching; T-PD teacher AI for professional development.
   Priority: training/workshop itself studied → T-PD; lesson design or classroom use studied → T-TEA.
   Student system building with a design process (needs, architecture, evaluation) → S-SYS; humanities or
   local-problem projects without system building → S-BAS. No-code classifier training (e.g. Teachable
   Machine) without a design process → S-BAS with level apply, and start `ai_lit_note` with
   "[pre-genAI 類比對應]". AI4K12 big ideas: perception, representation & reasoning, learning → S-BAS;
   societal impact → S-ETH; natural interaction → S-BAS (level understand). B-class records normally get
   S-LRN (students) or T-TEA (teachers). Teachers (incl. pre-service) who use an AI tool AS LEARNERS in
   their own training → T-PD. Non-K-12 learners use S-, university teachers use T- (descriptive only).
   Other stakeholders with no fitting dimension → empty list.
4. `level` (one, only if an AI-related learning goal or task is stated): understand | apply | create | unknown.
   Non-AI subject goals in B studies (algebra, SQL, …) → unknown.
5. `topic` (multi, closed list, or ["none"]): genai, ailit_curriculum, assessment, teacher_pd, ethics_safety,
   learning_intervention, ct_programming_data, language, stem_science, equity_special, policy_governance.
6. `method` (one; decide in this order): review → instrument_dev → conceptual → experimental → mixed →
   design_based → qualitative → survey → unknown. A review stays `review` even if it mentions
   experimental and control groups.
7. `outcome_measured` (only for interventions = experimental, design_based, or mixed where the abstract
   describes teaching that was actually delivered): yes if a pre/post test (single group counts) or a
   comparison group, no if only a post-test or satisfaction; blank for non-interventions.
   Single-group pre/post plus surveys → experimental; post-test only plus interviews → mixed.
8. `genai_flag`: yes (LLM/GPT/ChatGPT/generative named) | unknown (only "AI chatbot" etc.) | no.
9. `ai_lit_note`: optional short note in Chinese or English.

## Output
One JSON object per line:
{"work_id":"...","audience_role":"...","stage":"...","ai_lit_dims":["..."],"level":"...","topic":["..."],
 "method":"...","outcome_measured":"yes|no|","genai_flag":"...","ai_lit_note":"",
 "rationale":"<paraphrase; no quotations>",
 "evidence":[{"field":"<field name>","span":"<verbatim ≤15 English words>"}],"model_id":"<your model id>"}
- Every non-`unknown` value (and each listed dim/topic) needs a verbatim span of ≤15 words.
  `unknown` values must have no span. Absence values (genai_flag no, topic ["none"], blank
  outcome_measured) need no span.
