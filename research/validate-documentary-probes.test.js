"use strict";
const {test}=require("node:test"),assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path");
const root=path.join(__dirname,"benchmarks");
const probes=JSON.parse(fs.readFileSync(path.join(root,"documentary-contradiction-probes-2026-10-09.json"),"utf8"));
const rest=JSON.parse(fs.readFileSync(path.join(root,"semantic-screening-remaining40-2026-10-09.json"),"utf8"));
const blind=JSON.parse(fs.readFileSync(path.join(root,"blind-review-candidates-60.json"),"utf8"));
const {triage}=require("./benchmark-semantic.js");
test("new targeted probes are distinct from prior sixty cases and not labelled gold",()=>{
 assert.equal(probes.cases.length,8);assert.equal(new Set(probes.cases.map(x=>x.id)).size,8);
 const prior=new Set(blind.cases.map(x=>x.case_id));
 for(const c of probes.cases){assert.equal(prior.has(c.id),false);assert.ok(c.basis.length>20);assert.ok(!Object.hasOwn(c,"gold_label"))}
 assert.match(probes.type,/NOT_INDEPENDENT_GOLD/);
});
test("every targeted probe is mapped to a specific publisher excerpt and provenance limit",()=>{
 assert.equal(probes.sources.length,2);
 for(const s of probes.sources){assert.match(s.url,/^https:\/\//);assert.equal(s.full_text_downloaded,false);assert.equal(s.sha256_archived,false);assert.ok(s.source_excerpt.length>15)}
 for(const c of probes.cases)assert.ok(probes.sources.some(s=>s.source_id===c.source_id));
});
test("RCT recruit/analyzed correction is explicit and remains held",()=>{
 const x=rest.reviews.find(r=>r.candidate_id==="BLIND-R04-06");
 assert.equal(x.provisional_verdict,"contradicted_by_explicit_methods");
 assert.match(x.reason,/116/);assert.match(x.reason,/95/);
 assert.equal(x.full_original_article_checked,false);assert.equal(x.verbatim_snapshot_archived,false);assert.equal(x.decision,"hold");
});
test("lexical alerts cannot equate absence of warnings with evidence support",()=>{
 const misses=probes.cases.filter(c=>c.expected_document_relation==="contradicted_by_excerpt"&&triage(c.claim).flags.length===0);
 assert.ok(misses.length>=1, "At least one explicit contradiction is not signaled by generic keywords");
 for(const c of probes.cases)assert.equal(triage(c.claim).decision,"review");
});
test("unknown and editorial implications are not converted to negative factual gold",()=>{
 assert.ok(probes.cases.some(c=>c.expected_document_relation==="cannot_determine_from_excerpt"));
 assert.ok(probes.cases.some(c=>c.expected_document_relation==="unwarranted_inference"));
});
