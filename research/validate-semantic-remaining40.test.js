"use strict";
const {test}=require("node:test"),assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path");
const dir=path.join(__dirname,"benchmarks"),load=p=>JSON.parse(fs.readFileSync(path.join(dir,p),"utf8"));
const blind=load("blind-review-candidates-60.json"),first=load("primary-source-screening-2026-10-09.json"),rest=load("semantic-screening-remaining40-2026-10-09.json");
test("40 remaining claim assessments cover four items in each of ten groups",()=>{
 assert.equal(rest.reviews.length,40);
 assert.equal(rest.claim_count,40);
 assert.equal(rest.source_topic_count,10);
 const groups=["N01","N02","N03","N04","N05","R01","R02","R03","R04","R05"];
 for(const g of groups){const items=rest.reviews.filter(x=>x.group===g);assert.equal(items.length,4,g);assert.deepEqual(items.map(x=>x.candidate_id.slice(-2)),["03","04","05","06"],g)}
});
test("the two preliminary reviews exactly cover all sixty original candidates without duplicates",()=>{
 assert.equal(first.reviews.length,20);
 const ids=[...first.reviews,...rest.reviews].map(x=>x.candidate_id);
 assert.equal(new Set(ids).size,60);
 assert.deepEqual(ids.slice().sort(),blind.cases.map(x=>x.case_id).sort());
 const claims=new Map(blind.cases.map(x=>[x.case_id,x.claim]));
 for(const x of [...first.reviews,...rest.reviews])assert.equal(x.claim,claims.get(x.candidate_id));
});
test("remaining preliminary assessments do not masquerade as validated ground truth",()=>{
 assert.equal(rest.evaluation_type,"PROVISIONAL_SOURCE_BASED_SCREENING_NOT_BLIND_GOLD");
 const priorSources=new Map(first.source_topics.map(x=>[x.group,x]));
 for(const x of rest.reviews){
  assert.equal(x.decision,"hold");
  assert.equal(x.is_independent_human_gold,false);
  assert.equal(x.full_original_article_checked,false);
  assert.equal(x.verbatim_snapshot_archived,false);
  assert.match(x.source_url,/^https:\/\//);
  assert.equal(x.source_url,priorSources.get(x.group)?.url);
  assert.ok(x.source_locator?.length>=8);
  assert.ok(x.source_excerpt_short?.length>=16);
  assert.ok(x.reason?.length>=16);
  assert.ok(!Object.hasOwn(x,"gold_label"));
 }
});
test("abstentions and editorial interpretations are explicitly separated from factual support",()=>{
 assert.ok(rest.reviews.filter(x=>x.provisional_verdict==="cannot_determine").length>=2);
 assert.ok(rest.reviews.filter(x=>x.provisional_verdict==="editorial_inference_not_empirical_finding").length>=5);
 assert.ok(rest.reviews.some(x=>x.provisional_verdict==="unsupported_overgeneralization"));
});
test("blind review source never gets assessment labels",()=>{
 assert.equal(blind.status,"PREPARATION_ONLY_NOT_READY_FOR_BLIND_JUDGING");
 for(const x of blind.cases)for(const field of ["gold_label","answer","expected","provisional_verdict"])assert.equal(Object.hasOwn(x,field),false);
});
