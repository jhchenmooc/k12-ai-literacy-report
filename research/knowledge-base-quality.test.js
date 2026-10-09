"use strict";
const {test}=require("node:test"),assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path"),crypto=require("node:crypto");
const {parseCsv,dateOk,validate,index}=require("./validate-knowledge-base.js");
const {compare,safeCell}=require("./knowledge-base-utils.js");
const root=__dirname,kb=path.join(root,"knowledge-base");
const read=n=>parseCsv(fs.readFileSync(path.join(kb,"data",n+".csv"),"utf8"));
const rec=read("records"),rel=read("relations"),runs=read("search_runs");
const sheet=path.join(root,"drafts","2026-10-09_2026-10-15.json");
const manifest=path.join(root,"..","publication","issues.json");
const hash=p=>crypto.createHash("sha256").update(fs.readFileSync(p)).digest("hex");
test("T1-3: DOI similarity and versions are suggestions, not automatic merges",()=>{
 const a={doi:"10.1234/ABC",primary_url:"https://example.edu/preprint",title:"Same research"};
 const b={doi:"https://doi.org/10.1234/abc",primary_url:"https://journal.example/paper",title:"Same research updated"};
 assert.equal(compare(a,b).status,"review_same_doi");
 assert.equal(compare({...a,doi:"10.1234/other"},{...b,doi:"10.1234/another"}).status,"distinct_or_unknown");
 const versions=[{...rec[0],record_id:"KB-2024-8888",source_candidate_id:"",work_group_id:"WORK-1"},{...rec[0],record_id:"KB-2024-8889",source_candidate_id:"",work_group_id:"WORK-1",primary_url:"https://example.edu/v2"}];
 assert.ok(!validate(versions,[],[],null).some(e=>e.includes("duplicate ID")));
});
test("T4-5: URL distinctions and partial dates are preserved",()=>{
 assert.equal(compare({primary_url:"https://example.org/Doc?key=1"},{primary_url:"https://example.org/doc?key=1"}).status,"distinct_or_unknown");
 assert.equal(dateOk("2026-10","month"),true);
 assert.equal(dateOk("2026-10","day"),false);
 const partial={...rec[0],record_id:"KB-2026-8888",source_candidate_id:"",first_published_on:"",date_precision:"unknown",year_value:"2026",year_basis:"issue_year"};
 assert.deepEqual(validate([partial],[],[],null),[]);
 const ix=JSON.parse(index([partial],[]));
 assert.deepEqual(ix["by-year/2026/issue_year"],["KB-2026-8888"]);
 assert.equal(ix["by-year/2026/first_publication"],undefined);
});
test("T6-8: revision links, multi-national and multi-label relations have traceable IDs",()=>{
 const a={...rec[0],record_id:"KB-2024-7777",source_candidate_id:""};
 const b={...a,record_id:"KB-2026-7777",primary_url:"https://example.org/revised"};
 const x=[{relation_id:"r1",subject_id:b.record_id,predicate:"revises",object_namespace:"record",object_id:a.record_id,verification_status:"discovered_unverified"},
 {relation_id:"r2",subject_id:b.record_id,predicate:"applies_to_country",object_namespace:"vocabulary",object_id:"TW",verification_status:"discovered_unverified"},
 {relation_id:"r3",subject_id:b.record_id,predicate:"applies_to_country",object_namespace:"vocabulary",object_id:"JP",verification_status:"discovered_unverified"},
 {relation_id:"r4",subject_id:b.record_id,predicate:"has_category",object_namespace:"vocabulary",object_id:"K1",verification_status:"discovered_unverified"},
 {relation_id:"r5",subject_id:b.record_id,predicate:"has_category",object_namespace:"vocabulary",object_id:"K3",verification_status:"discovered_unverified"}];
 assert.deepEqual(validate([a,b],x,[],null),[]);
 const ix=JSON.parse(index([a,b],x));
 assert.deepEqual(ix["by-country/TW"],[b.record_id]);
 assert.deepEqual(ix["by-country/JP"],[b.record_id]);
 assert.deepEqual(ix["by-category/K1"],[b.record_id]);
 assert.deepEqual(ix["by-category/K3"],[b.record_id]);
});
test("T9-11: unavailable coverage, broken refs, and spreadsheet formula hazards",()=>{
 const bad=[{run_id:"bad",searched_on:"2026-10-09",source_id:"J01",query:"K12 AI",coverage_level:"entry_only",status:"unavailable",results_seen:"0",results_screened:"0",results_recorded:"0"}];
 assert.ok(validate(rec,rel,bad,null).some(s=>s.includes("cannot claim zero")));
 const missing=[{relation_id:"r1",subject_id:rec[0].record_id,predicate:"revises",object_namespace:"record",object_id:"INVALID",verification_status:"discovered_unverified"}];
 assert.ok(validate(rec,missing,[],null).some(s=>s.includes("unknown target")));
 assert.equal(safeCell("=1+1"),"'=1+1");
 assert.equal(safeCell("Original title"),"Original title");
 const data=index(rec,rel);assert.equal(data,fs.readFileSync(path.join(kb,"indexes","index.json"),"utf8"));
});
test("T12: knowledge-base operations cannot mutate nine held candidates or publication manifest",()=>{
 const before=[hash(sheet),hash(manifest)];
 const a=JSON.parse(fs.readFileSync(sheet,"utf8")).items;
 assert.equal(a.length,9);assert.ok(a.every(x=>x.decision==="hold"&&x.source_checked===false));
 assert.equal(JSON.parse(fs.readFileSync(manifest,"utf8")).editions.length,0);
 assert.deepEqual(validate(rec,rel,runs,a),[]);
 JSON.parse(index(rec,rel));
 assert.deepEqual([hash(sheet),hash(manifest)],before);
});
