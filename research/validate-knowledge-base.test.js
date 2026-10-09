"use strict";
const {test}=require("node:test"),assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path");
const {parseCsv,dateOk,validate,index}=require("./validate-knowledge-base.js");
const dir=path.join(__dirname,"knowledge-base","data");
const read=n=>parseCsv(fs.readFileSync(path.join(dir,n+".csv"),"utf8"));
const records=read("records"),relations=read("relations"),runs=read("search_runs");
const candidates=JSON.parse(fs.readFileSync(path.join(__dirname,"drafts","2026-10-09_2026-10-15.json"),"utf8")).items;
test("actual nine held candidates remain discovery-only",()=>{
 assert.equal(records.filter(x=>x.source_candidate_id).length,candidates.length);assert.ok(candidates.length>=9);
 assert.ok(candidates.every(x=>x.decision==="hold"&&x.source_checked===false));
 assert.ok(records.filter(x=>x.source_candidate_id).every(x=>x.verification_status==="discovered_unverified"&&x.first_published_on===""&&x.year_basis==="unknown"));
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

test("real knowledge classifications retain unverified status and journal links",()=>{
 const listed=JSON.parse(index(records,relations));
 assert.ok(["KB-2026-0012","KB-2026-0013"].every(id=>listed["by-category/K2"].includes(id)));
 assert.deepEqual(listed["by-journal/J06"],["KB-2026-0008"]);
 assert.ok(listed["by-journal/J02"].includes("KB-2026-0009"));
 assert.deepEqual(listed["by-source/O-HK-EDB"],["KB-2026-0002","KB-2026-0003"]);
 assert.equal(listed["by-year/unknown/unknown"].length,candidates.length);
 assert.ok(["KB-2026-0010","KB-2026-0011","KB-2026-0012","KB-2026-0013"].every(id=>listed["by-year/2026/first_publication"].includes(id)));
 const originalIds=new Set(records.filter(x=>x.source_candidate_id).map(x=>x.record_id));
 assert.ok(relations.filter(x=>originalIds.has(x.subject_id)).every(x=>x.verification_status==="discovered_unverified"));
});
test("synthetic country, topic and conference view is typed and deterministic",()=>{
 const x=[{relation_id:"T1",subject_id:"KB-2026-0001",predicate:"studies_country",object_namespace:"vocabulary",object_id:"TW",verification_status:"discovered_unverified"},
 {relation_id:"T2",subject_id:"KB-2026-0001",predicate:"has_topic",object_namespace:"vocabulary",object_id:"AI_LITERACY",verification_status:"discovered_unverified"},
 {relation_id:"T3",subject_id:"KB-2026-0001",predicate:"published_in",object_namespace:"source",object_id:"C21",verification_status:"discovered_unverified"}];
 const i=JSON.parse(index(records,x));
 assert.deepEqual(i["by-country/TW"],["KB-2026-0001"]);
 assert.deepEqual(i["by-topic/AI_LITERACY"],["KB-2026-0001"]);
 assert.deepEqual(i["by-conference/C21"],["KB-2026-0001"]);
});
test("venue/agency relation mix-up is invalid",()=>{
 const x=[{relation_id:"ERR",subject_id:"KB-2026-0001",predicate:"published_in",object_namespace:"source",object_id:"O-UNESCO",verification_status:"discovered_unverified"}];
 assert.ok(validate(records,x,runs,candidates).some(v=>v.includes("invalid venue relation")));
});

test("three primary-source dated frameworks are archived by original publication year only",()=>{
 const x=JSON.parse(index(records,relations));
 assert.ok(["KB-2024-0001","KB-2024-0002","KB-2024-0003","KB-2024-0004"].every(id=>x["by-year/2024/first_publication"].includes(id)));
 assert.ok(x["by-year/2026/first_publication"].includes("KB-2026-0010"));
 assert.equal(x["by-year/unknown/unknown"].length,candidates.length);
 assert.equal(x["by-type/framework"].length,4);
 assert.ok(x["by-category/K1"].length>=8);
 assert.ok(x["by-category/K3"].includes("KB-2026-0013"));
 assert.ok(records.filter(r=>r.record_type==="framework").every(r=>r.verification_status==="bibliographic_checked"));
 assert.ok(candidates.every(c=>c.decision==="hold"));
});

test("Australian dated policy and review remain separate linked works",()=>{
 const x=JSON.parse(index(records,relations));
 assert.ok(x["by-year/2023/first_publication"].includes("KB-2023-0001"));
 assert.ok(x["by-year/2025/first_publication"].includes("KB-2025-0001"));
 for(const id of ["KB-2023-0001","KB-2025-0001"])assert.ok(x["by-country/AU"].includes(id));
 assert.deepEqual(x["by-type/policy_review"],["KB-2025-0001"]);
 assert.ok(relations.some(r=>r.predicate==="reviews"&&r.subject_id==="KB-2025-0001"&&r.object_id==="KB-2023-0001"));
 assert.ok(candidates.every(c=>c.decision==="hold"));
});

test("dated Springer studies map to monitored J03/J32 and original years",()=>{
 const x=JSON.parse(index(records,relations));
 for(const id of ["KB-2025-0002","KB-2025-0003"])assert.ok(x["by-journal/J03"].includes(id));
 assert.ok(x["by-journal/J32"].includes("KB-2026-0011"));
 assert.ok(x["by-year/2025/first_publication"].includes("KB-2025-0002"));
 assert.ok(x["by-year/2026/first_publication"].includes("KB-2026-0011"));
 for(const country of ["GB","GR","BR"])assert.deepEqual(x["by-country/"+country],["KB-2025-0002"]);
 assert.ok(candidates.every(x=>x.decision==="hold"));
});

test("LAK conference papers have dated C03 source links",()=>{
 const x=JSON.parse(index(records,relations));
 assert.deepEqual(x["by-conference/C03"],["KB-2026-0012","KB-2026-0013"]);
 assert.deepEqual(x["by-type/conference_paper"],records.filter(r=>r.record_type==="conference_paper").map(r=>r.record_id).sort());
 assert.ok(candidates.every(x=>x.decision==="hold"));
});

test("Japan Korea and England historical official announcements retain jurisdiction and first-page dates",()=>{
 const x=JSON.parse(index(records,relations));
 assert.deepEqual(x["by-country/JP"],["KB-2024-0003"]);
 assert.deepEqual(x["by-country/KR"],["KB-2024-0004"]);
 assert.deepEqual(x["by-country/GB-ENG"],["KB-2023-0002"]);
 assert.ok(x["by-source/O-JP-MEXT"].includes("KB-2024-0003"));
 assert.ok(x["by-source/O-KR-MOE"].includes("KB-2024-0004"));
 assert.ok(x["by-source/O-UK-DFE"].includes("KB-2023-0002"));
 assert.ok(candidates.every(c=>c.decision==="hold"));
});

test("Discover Education July and May 2026 studies keep exact online dates",()=>{
 const x=JSON.parse(index(records,relations));
 assert.deepEqual(x["by-journal/J32"],["KB-2026-0011","KB-2026-0014","KB-2026-0015"]);
 assert.deepEqual(x["by-country/TH"],["KB-2026-0015"]);
 assert.ok(x["by-year/2026/first_publication"].includes("KB-2026-0014"));
 assert.ok(candidates.every(y=>y.decision==="hold"));
});
