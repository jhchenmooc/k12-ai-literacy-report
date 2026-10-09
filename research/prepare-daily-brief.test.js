"use strict";
const {test}=require("node:test"),assert=require("node:assert/strict");
const {makeDraft}=require("./scaffold-weekly.js"),{merge}=require("./ingest-candidates.js"),{dailyBrief,markdown}=require("./prepare-daily-brief.js");
test("daily import remains fully visible to weekly selection",()=>{
 const week=makeDraft("2026-10-09").data;
 const a=merge(week,{batch_id:"oct09-1",searched_on:"2026-10-09",sources:[{group:"official",query:"AI literacy",status:"ok"}],candidates:[{source_url:"https://example.org/ai",source_title:"Synthetic AI item",source_locator:"paragraph",source_publication_date:"2026-10-09"}]}).worksheet;
 const brief=dailyBrief(a,"2026-10-10");
 assert.equal(brief.pending.length,1);assert.equal(brief.suggested_for_publication.length,0);
 assert.equal(a.items.length,1);assert.equal(a.items[0].decision,"hold");
 assert.match(markdown(brief),/非正式刊物/);
});
test("yesterday discovery of older study is background, not new research",()=>{
 const a=merge(makeDraft("2026-10-09").data,{batch_id:"retro",searched_on:"2026-10-09",sources:[{group:"research",query:"K12",status:"ok"}],candidates:[{source_url:"https://example.org/old",source_title:"Old synthetic paper",source_locator:"abstract",source_publication_date:"2026-08-01"}]}).worksheet;
 const d=dailyBrief(a,"2026-10-10");assert.equal(d.background.length,1);assert.equal(d.pending.length,0);
});
test("zero-source day creates no eligible publication",()=>{const a={...makeDraft("2026-10-09").data,search_runs:[]};const x=dailyBrief(a,"2026-10-10");assert.deepEqual(x.suggested_for_publication,[]);assert.match(markdown(x),/不可自動發布/)});
test("uncertified held candidates never enter publishable list",()=>{const a=merge(makeDraft("2026-10-09").data,{batch_id:"t",searched_on:"2026-10-09",sources:[{group:"policy",query:"AI",status:"unavailable"}],candidates:[{source_url:"https://example.org/p",source_title:"P",source_locator:"x"}]}).worksheet;assert.equal(dailyBrief(a,"2026-10-10").pending.length,1);assert.equal(dailyBrief(a,"2026-10-10").suggested_for_publication.length,0)});

test("late verified items remain visible for daily editorial selection",()=>{const w=makeDraft("2026-10-09").data;w.items=[{candidate_id:"late",source_url:"https://example.org/late",source_title:"Late",source_publication_date:"2026-10-09",discovered_on:"2026-10-09",verification_completed_on:"2026-10-11",decision:"hold",source_checked:true,first_disclosed_on:"2026-10-09",conflict_unresolved:false}];w.search_runs=[];const z=dailyBrief(w,"2026-10-12");assert.equal(z.pending.length,1);assert.equal(z.suggested_for_publication.length,0)});
test("duplicate discovery remains visible even without an update note",()=>{const w=makeDraft("2026-10-09").data;w.search_runs=[];w.unresolved_duplicate_discoveries=[{searched_on:"2026-10-09",source_url:"https://example.org/old",review_required:true}];const z=dailyBrief(w,"2026-10-10");assert.equal(z.source_updates.length,1);assert.match(markdown(z),/待核對/)});

test("same-week updated original sources surface in the next daily review pack",()=>{
 const w=makeDraft("2026-10-09").data;w.search_runs=[];
 w.items=[{candidate_id:"a",source_updates:[{discovered_on:"2026-10-09",source_url:"https://example.org/a",note:"new version",review_required:true}]}];
 assert.equal(dailyBrief(w,"2026-10-10").source_updates.length,1);
});
test("old verified background never enters publication suggestion",()=>{
 const w=makeDraft("2026-10-09").data;w.search_runs=[];
 w.items=[{candidate_id:"old",source_url:"https://example.org/a",source_title:"old",
 source_publication_date:"2026-09-01",first_disclosed_on:"2026-09-01",verification_completed_on:"2026-10-09",source_checked:true,conflict_unresolved:false,decision:"publish"}];
 assert.equal(dailyBrief(w,"2026-10-10").suggested_for_publication.length,0);
});
