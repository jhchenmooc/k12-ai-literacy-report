"use strict";
const {test}=require("node:test"),assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path");
const {parseCsv}=require("./validate-knowledge-base.js"),{preview}=require("./knowledge-base-import-preview.js");
const root=__dirname;
const records=parseCsv(fs.readFileSync(path.join(root,"knowledge-base","data","records.csv"),"utf8"));
const w=JSON.parse(fs.readFileSync(path.join(root,"drafts","2026-10-09_2026-10-15.json"),"utf8"));
test("all real held candidates map to existing KB, never to publication",()=>{
 const p=preview(records,w.items);
 assert.equal(p.length,w.items.length);assert.ok(p.length>=9);
 assert.ok(p.every(x=>x.discovery_status==="review_existing"&&x.verified===false&&x.publication_decision==="not_applicable"));
 assert.ok(w.items.every(x=>x.decision==="hold"));
});
test("new candidate remains unverified and source batch is unchanged",()=>{
 const item={candidate_id:"NEW",source_title:"New source",source_url:"https://example.org/new?a=3"};
 const snapshot=JSON.stringify(item);
 const p=preview(records,[item]);
 assert.equal(p[0].discovery_status,"new_unverified");
 assert.equal(JSON.stringify(item),snapshot);
});
test("same URL within batch is not added twice without review",()=>{
 const item={source_title:"New",source_url:"https://example.org/new"};
 const p=preview([], [item,item]);
 assert.equal(p[1].discovery_status,"repeat_in_batch");
});
test("unsafe/invalid sources fail closed",()=>{
 assert.throws(()=>preview([], [{source_title:"No",source_url:"http://example.org/x"}]),/source URL/);
 assert.throws(()=>preview([], [{source_url:"https://example.org/x"}]),/source URL/);
});
