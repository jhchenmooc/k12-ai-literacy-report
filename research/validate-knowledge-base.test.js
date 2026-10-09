"use strict";
const {test}=require("node:test"),assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path");
const {parseCsv,dateOk,validate,index}=require("./validate-knowledge-base.js");
const dir=path.join(__dirname,"knowledge-base","data");
const read=n=>parseCsv(fs.readFileSync(path.join(dir,n+".csv"),"utf8"));
const records=read("records"),relations=read("relations"),runs=read("search_runs");
const candidates=JSON.parse(fs.readFileSync(path.join(__dirname,"drafts","2026-10-09_2026-10-15.json"),"utf8")).items;
test("actual nine held candidates remain discovery-only",()=>{
 assert.equal(records.length,9);assert.equal(candidates.length,9);
 assert.ok(candidates.every(x=>x.decision==="hold"&&x.source_checked===false));
 assert.ok(records.every(x=>x.verification_status==="discovered_unverified"&&x.first_published_on===""&&x.year_basis==="unknown"));
 assert.deepEqual(validate(records,relations,runs,candidates),[]);
});
test("indexes remain deterministic",()=>{
 const s=index(records,relations);
 assert.equal(s,fs.readFileSync(path.join(__dirname,"knowledge-base","indexes","index.json"),"utf8"));
 assert.equal(index([...records].reverse(),relations),s);
});
test("date precision rejects fabricated day",()=>{
 assert.equal(dateOk("2026-10","month"),true);assert.equal(dateOk("2026-10","day"),false);
 assert.equal(dateOk("2026-02-30","day"),false);
});
test("CSV quoted commas and double quotes preserve content",()=>{
 const parsed=parseCsv('id,title\n1,"A ""quoted"", title"\n');
 assert.equal(parsed[0].title,'A "quoted", title');
});
test("invalid duplicate IDs and references fail closed",()=>{
 assert.ok(validate([...records,records[0]],relations,runs,candidates).some(x=>x.includes("duplicate ID")));
 const rel=[{relation_id:"R1",subject_id:records[0].record_id,predicate:"revises",object_namespace:"record",object_id:"MISSING"}];
 assert.ok(validate(records,rel,runs,candidates).some(x=>x.includes("unknown target")));
});
test("unavailable searches must not claim zero hits",()=>{
 const x=[{run_id:"x",searched_on:"2026-10-09",source_id:"J01",query:"AI",coverage_level:"entry_only",status:"unavailable",results_seen:"0",results_screened:"0",results_recorded:"0"}];
 assert.ok(validate(records,relations,x,candidates).some(e=>e.includes("cannot claim zero")));
});
