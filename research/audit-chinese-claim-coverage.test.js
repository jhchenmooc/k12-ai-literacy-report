"use strict";
const {test}=require("node:test"),assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path");
const {auditCoverage,auditCase}=require("./audit-chinese-claim-coverage.js");
const pack=JSON.parse(fs.readFileSync(path.join(__dirname,"benchmarks","structured-source-fact-probes-2026-10-09.json"),"utf8"));
const card=pack.cards[0],unesco=pack.cards[1];
function annotations(text,fields){
 const re=/(?<![A-Za-z0-9])\d+(?:,\d{3})*(?:\.\d+)?/g;const nums=[...text.matchAll(re)];
 assert.equal(nums.length,fields.length);
 return nums.map((m,i)=>({text:m[0],start:m.index,end:m.index+m[0].length,role:"asserted",field:fields[i]}));
}
test("detects hidden population and causal overclaim despite matching N=95",()=>{
 const claim={source_id:card.card_id,claim:"95人大學STEM研究證明國小學生學力提升",assertions:[{key:"sample.analysed",op:"eq",value:95}]};
 claim.number_annotations=annotations(claim.claim,["sample.analysed"]);
 const r=auditCase(card,claim);
 assert.equal(r.evidence.status,"consistent_with_entered_evidence");
 assert.equal(r.status,"incomplete_claim_mapping");
 assert.ok(r.coverage.warnings.some(x=>x.cue==="population_scope"));
 assert.ok(r.coverage.warnings.some(x=>x.cue==="causal_or_effectiveness"));
 assert.equal(r.publication_decision,"hold");
});
test("116 recruited and analyzed contradiction remains blocked with mapped numbers",()=>{
 const claim={source_id:card.card_id,claim:"最初招募116人且116人全部完成並納入分析。",assertions:[{key:"sample.initial_recruited",op:"eq",value:116},{key:"sample.analysed",op:"eq",value:116}]};
 claim.number_annotations=annotations(claim.claim,["sample.initial_recruited","sample.analysed"]);
 const r=auditCase(card,claim);
 assert.equal(r.status,"conflict_with_entered_evidence");
 assert.ok(r.evidence.conflicts.some(x=>x.key==="sample.analysed"));
});
test("unmapped number and policy implication force incomplete even if subset matches",()=>{
 const claim={source_id:unesco.card_id,claim:"UNESCO有20多國參加培訓，因此已制定強制課程法規。",assertions:[{key:"event.kind",op:"eq",value:"hands-on design training"}]};
 const r=auditCase(unesco,claim);
 assert.equal(r.status,"incomplete_claim_mapping");
 assert.ok(r.coverage.warnings.some(x=>x.type==="unmapped_number"));
 assert.ok(r.coverage.warnings.some(x=>x.cue==="binding_policy"));
});
test("a fully mapped typed statement remains held and not certified",()=>{
 const claim={source_id:card.card_id,claim:"招募116人，實驗組50人，對照組45人。",assertions:[{key:"sample.initial_recruited",op:"eq",value:116},{key:"sample.experimental",op:"eq",value:50},{key:"sample.control",op:"eq",value:45}]};
 claim.number_annotations=annotations(claim.claim,["sample.initial_recruited","sample.experimental","sample.control"]);
 const r=auditCase(card,claim);
 assert.equal(r.coverage.coverage,"no_known_gap_detected");
 assert.equal(r.status,"typed_fields_consistent_not_semantically_certified");
 assert.equal(r.publication_decision,"hold");
});
test("number shown as context-only never counted as verified",()=>{
 const claim={source_id:card.card_id,claim:"分析95人。",assertions:[{key:"sample.analysed",op:"eq",value:95}]};
 claim.number_annotations=annotations(claim.claim,["sample.analysed"]);claim.number_annotations[0].role="context_only";
 assert.equal(auditCase(card,claim).status,"incomplete_claim_mapping");
});
test("made-up annotations do not bypass coverage",()=>{
 const claim={source_id:card.card_id,claim:"招募116人。",assertions:[{key:"sample.initial_recruited",op:"eq",value:116}]};
 claim.number_annotations=[{text:"117",start:2,end:5,role:"asserted",field:"sample.initial_recruited"}];
 const r=auditCoverage(claim);assert.ok(r.warnings.some(x=>x.type==="annotation_not_in_text"));assert.ok(r.warnings.some(x=>x.type==="unmapped_number"));
});
test("unknown mandatory field never silently treated as false",()=>{
 const claim={source_id:unesco.card_id,claim:"已制定強制法規。",assertions:[{key:"policy.binding_mandate",op:"eq",value:true}]};
 const r=auditCase(unesco,claim);assert.equal(r.status,"cannot_determine");assert.equal(r.publication_decision,"hold");
});
test("missing or malformed claim text fails closed",()=>{
 const r=auditCase(card,{source_id:card.card_id,assertions:[{key:"sample.analysed",op:"eq",value:95}]});
 assert.equal(r.status,"invalid_input");
});

test("malformed coverage collections return the existing invalid format and keep publication held",()=>{
 for(const extra of [
  {assertions:[null]},{assertions:[[]]},{assertions:{}},
  {number_annotations:[null]},{number_annotations:[[]]},{number_annotations:{}},
  {number_annotations:[{text:"194",start:"0",end:3,role:"asserted",field:"sample.analysed"}]}
 ]){
  const claim={source_id:card.card_id,claim:"194 人",assertions:[],...extra};
  const coverage=auditCoverage(claim);
  assert.equal(coverage.coverage,"invalid_input");
  assert.ok(coverage.reason.length);assert.deepEqual(coverage.numbers,[]);assert.deepEqual(coverage.warnings,[]);
  const result=auditCase(card,claim);
  assert.equal(result.status,"invalid_input");assert.equal(result.publication_decision,"hold");
 }
});

test("coverage CLI rejects duplicate evidence-card IDs rather than choosing the last",t=>{
 const root=fs.mkdtempSync(path.join(require("node:os").tmpdir(),"coverage-duplicate-"));t.after(()=>fs.rmSync(root,{recursive:true,force:true}));
 const file=path.join(root,"pack.json");fs.writeFileSync(file,JSON.stringify({...pack,cards:[pack.cards[0],{...pack.cards[0]}]}));
 const result=require("node:child_process").spawnSync(process.execPath,[path.join(__dirname,"audit-chinese-claim-coverage.js"),file],{encoding:"utf8"});
 assert.equal(result.status,1);assert.match(result.stderr,/duplicate card IDs/);assert.equal(result.stdout,"");
});
