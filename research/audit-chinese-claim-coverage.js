"use strict";
/* Chinese claim-coverage audit. Conservative warning rules, NOT semantic proof.
 * Prevents a partial typed assertion from being mistaken for complete prose review.
 */
const fs=require("node:fs");
const {compare}=require("./compare-source-facts.js");
const CUES=[
 {id:"causal_or_effectiveness",re:/證明|證實|顯著提升|學力提升|成績提高|成績提升|改善學習|學習成效|因果|有效提升|有效改善|必然提升/,field:"outcome.randomized_learning_result_reported"},
 {id:"binding_policy",re:/強制|必修|依法|法令|法規|法律|全面實施|已經制定|正式上路|法定/,field:"policy.binding_mandate"},
 {id:"population_scope",re:/國小|小學生|大學生|中學生|國中|高中|師資生|全國學生|各國學生|所有學生/,field:"sample.population"},
 {id:"analysis_population",re:/完成.*(分析|納入)|納入分析|分析人數|樣本流失|全部.*完成/,field:"sample.analysed"},
 {id:"recruitment",re:/招募|招收|初始樣本/,field:"sample.initial_recruited"},
 {id:"experimental_size",re:/實驗組/,field:"sample.experimental"},
 {id:"control_size",re:/對照組/,field:"sample.control"},
 {id:"study_design",re:/隨機|RCT|對照試驗|訪談|問卷|相關模型|結構方程/,field:"study.design"},
 {id:"cross_country_scope",re:/各國|全球|跨國|二十多國|20多國|多個國家|國家已/,field:"event.participant_countries"}
];
const NUM_RE=/(?<![A-Za-z0-9])\d+(?:,\d{3})*(?:\.\d+)?/g;
function auditCoverage(claim){
 if(!claim||typeof claim.claim!=="string"||!claim.claim.trim())return {coverage:"invalid_input",reason:["missing Chinese claim"],numbers:[],warnings:[]};
 const assertions=Array.isArray(claim.assertions)?claim.assertions:[],keys=new Set(assertions.map(x=>x.key));
 const warnings=[];
 // Presence of a numeric token does not identify its meaning. Require explicit
 // span annotations to show each number was considered, even when assertion is absent.
 const numericTokens=[...claim.claim.matchAll(NUM_RE)].map(m=>({text:m[0],start:m.index,end:m.index+m[0].length}));
 const numericAnnotations=Array.isArray(claim.number_annotations)?claim.number_annotations:[];
 for(const token of numericTokens){
  const annotation=numericAnnotations.find(a=>a.start===token.start&&a.end===token.end&&a.text===token.text);
  if(!annotation){warnings.push({type:"unmapped_number",text:token.text,start:token.start});continue;}
  if(!["asserted","context_only","unverifiable"].includes(annotation.role))warnings.push({type:"invalid_annotation_role",start:token.start});
  if(annotation.role==="asserted"&&!keys.has(annotation.field))warnings.push({type:"number_assertion_missing",start:token.start,field:annotation.field||null});
  if(annotation.role==="context_only"||annotation.role==="unverifiable")warnings.push({type:"number_not_fact_checked",start:token.start,role:annotation.role});
 }
 for(const a of numericAnnotations){
  if(!numericTokens.some(n=>n.start===a.start&&n.end===a.end&&n.text===a.text))warnings.push({type:"annotation_not_in_text",start:a.start});
 }
 for(const cue of CUES){
  if(cue.re.test(claim.claim)&&!keys.has(cue.field))warnings.push({type:"unmapped_semantic_cue",cue:cue.id,expected_field:cue.field});
 }
 // All textual cues can be ambiguous; even full coverage is not a validation of
 // extraction accuracy or the truth of the provenance card.
 return {coverage:warnings.length?"incomplete":"no_known_gap_detected",numbers:numericTokens,warnings,
   note:"Heuristic token/cue coverage only, not a complete Chinese semantic parser."};
}
function auditCase(card,claim){
 const evidence=compare(card,claim),coverage=auditCoverage(claim);
 const status=evidence.status==="invalid_input"||coverage.coverage==="invalid_input"?"invalid_input":
   evidence.status==="conflict_with_entered_evidence"?"conflict_with_entered_evidence":
   coverage.coverage!=="no_known_gap_detected"?"incomplete_claim_mapping":
   evidence.status==="consistent_with_entered_evidence"?"typed_fields_consistent_not_semantically_certified":"cannot_determine";
 return {status,coverage,evidence,publication_decision:"hold",
  note:"Never trust partial assertions, a no-gap heuristic signal, or an unverified evidence card as publication approval."};
}
if(require.main===module){
 try{
  const filename=process.argv[2];if(!filename)throw Error("Usage: node research/audit-chinese-claim-coverage.js case-pack.json");
  const pack=JSON.parse(fs.readFileSync(filename,"utf8"));if(!Array.isArray(pack.cards)||!Array.isArray(pack.cases))throw Error("cards and cases required");
  const cards=new Map(pack.cards.map(x=>[x.card_id,x]));
  const results=pack.cases.map(c=>({case_id:c.case_id,...auditCase(cards.get(c.source_id),c)}));
  console.log(JSON.stringify({disclaimer:"HEURISTIC COVERAGE, NOT VALIDATED SEMANTIC REVIEW",results},null,2));
  if(results.some(r=>r.status==="invalid_input"))process.exitCode=1;
 }catch(e){console.error(e.message);process.exitCode=1;}
}
module.exports={auditCoverage,auditCase};
