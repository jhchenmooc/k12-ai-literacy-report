"use strict";
const {test}=require("node:test"),assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path");
const {compare,evaluate,validateCard}=require("./compare-source-facts.js");
const d=JSON.parse(fs.readFileSync(path.join(__dirname,"benchmarks","structured-source-fact-probes-2026-10-09.json"),"utf8"));
test("eight typed probes produce conservative reproducible outcomes",()=>{
 const results=evaluate(d);assert.equal(results.length,8);
 assert.deepEqual(results.map(x=>x.status),d.cases.map(c=>c.expected_triage));
 for(const r of results){assert.equal(r.publication_decision,"hold");assert.equal(r.full_text_verified,false);}
});
test("116 initially recruited cannot support 116 analyzed",()=>{
 const r=evaluate(d).find(x=>x.case_id==="FACT-RCT-002");
 assert.equal(r.status,"conflict_with_entered_evidence");
 assert.ok(r.conflicts.some(x=>x.key==="sample.analysed"&&x.recorded===95&&x.expected===116));
});
test("unknown legal mandates and learning outcomes remain unknown, not false",()=>{
 for(const id of ["FACT-UNESCO-002","FACT-UNESCO-003","FACT-UNESCO-004"]){
  const r=evaluate(d).find(x=>x.case_id===id);assert.equal(r.status,"cannot_determine");assert.equal(r.unknowns.length,1);
 }
});
test("partial matches cannot hide a contradiction",()=>{
 const card=d.cards[0],r=compare(card,{source_id:card.card_id,assertions:[{key:"sample.initial_recruited",op:"eq",value:116},{key:"sample.analysed",op:"eq",value:116},{key:"sample.experimental",op:"eq",value:50}]});
 assert.equal(r.status,"conflict_with_entered_evidence");assert.equal(r.matches.length,2);assert.equal(r.conflicts.length,1);
});
test("missing facts do not become a negative conclusion",()=>{
 const card=d.cards[1],r=compare(card,{source_id:card.card_id,assertions:[{key:"sample.analysed",op:"eq",value:95}]});
 assert.equal(r.status,"cannot_determine");
});
test("fact provenance is fail closed on missing locator and pretend verification",()=>{
 let card=structuredClone(d.cards[0]);card.facts[0].locator="";assert.ok(validateCard(card).length>0);
 card=structuredClone(d.cards[0]);card.facts[0].evidence_checked=true;assert.ok(validateCard(card).length>0);
 card=structuredClone(d.cards[0]);card.evidence_level="full_primary_snapshot";assert.ok(validateCard(card).length>0);
});
test("invalid schema and fake source mapping never pass as evidence",()=>{
 const card=d.cards[0];
 assert.equal(compare(card,{source_id:"WRONG",assertions:[{key:"sample.analysed",op:"eq",value:95}]}).status,"invalid_input");
 assert.equal(compare(card,{source_id:card.card_id,assertions:[{key:"sample.analysed",op:"eq",value:"95"}]}).status,"cannot_determine");
 assert.equal(compare(card,{source_id:card.card_id,assertions:[]}).status,"cannot_determine");
});
test("not a natural language validator, and no automatic publication even when values agree",()=>{
 const card=d.cards[0];const r=compare(card,{source_id:card.card_id,claim:"該研究證明國小學生全面提升",assertions:[{key:"sample.analysed",op:"eq",value:95}]});
 assert.equal(r.status,"consistent_with_entered_evidence");
 assert.equal(r.publication_decision,"hold");
 assert.match(r.note,/not original source truth/);
});
