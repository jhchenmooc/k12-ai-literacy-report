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
