"use strict";
const {test}=require("node:test"),assert=require("node:assert/strict");
const {makeDraft}=require("./scaffold-weekly.js"),{merge,ingest}=require("./ingest-candidates.js");
const fs=require("node:fs"),os=require("node:os"),path=require("node:path");
const original=()=>({...makeDraft("2026-10-09").data,items:[{candidate_id:"W2026-10-09-A01",source_url:"https://example.org/existing",source_title:"Existing",decision:"hold",source_checked:false}],screening_summary:{candidate_count:1,ready_to_publish:0,verified_for_publication:0}});
const batch={batch_id:"2026-10-09-policies-1",searched_on:"2026-10-09",sources:[{group:"official-policy",query:"K12 AI education",status:"ok"}],candidates:[{source_url:"https://example.org/NEW?tracking=1",source_title:"New",source_locator:"page",source_publication_date:"2026-10-09",event_key:"policy-a"},{source_url:"https://example.org/new#copy",source_title:"Repeated",source_locator:"page",source_publication_date:"2026-10-09"},{source_url:"https://example.org/old",source_title:"Old",source_locator:"page",source_publication_date:"2026-09-23",doi:"10.1234/test"}]};
test("cumulative import de-duplicates and preserves existing hold",()=>{const r=merge(original(),batch);assert.equal(r.added.length,2);assert.equal(r.duplicates.length,1);assert.equal(r.worksheet.items[0].source_checked,false);assert.equal(r.worksheet.items[1].decision,"hold");assert.match(r.worksheet.items[2].screening_note,/backfill/);assert.equal(r.worksheet.screening_summary.candidate_count,3);assert.equal(r.worksheet.search_runs[0].sources[0].group,"official-policy")});
test("duplicate batch rejected and original untouched",()=>{const first=merge(original(),batch).worksheet;const before=JSON.stringify(first);assert.throws(()=>merge(first,batch),/already ingested/);assert.equal(JSON.stringify(first),before)});
test("invalid coverage and source date fail closed",()=>{assert.throws(()=>merge(original(),{...batch,sources:[]}),/source-coverage/);assert.throws(()=>merge(original(),{...batch,candidates:[{source_url:"https://example.org/b",source_title:"bad",source_locator:"x",source_publication_date:"2026-02-30"}]}),/calendar/)});
test("event key merges across different language URLs",()=>{const a=merge(original(),batch).worksheet;const x=merge(a,{...batch,batch_id:"2026-10-10-policies-2",searched_on:"2026-10-10",candidates:[{source_url:"https://another.example/news",source_title:"Translation",source_locator:"text",event_key:"policy-a"}]});assert.equal(x.added.length,0);assert.equal(x.duplicates.length,1)});

test("new candidate has day and batch provenance for weekly reuse",()=>{const w=merge(original(),batch).worksheet;assert.equal(w.items[1].discovered_on,"2026-10-09");assert.equal(w.items[1].discovery_batch_id,batch.batch_id);assert.equal(w.items[1].decision,"hold");assert.equal(w.items.length,3)});
test("cross-week duplicate is linked instead of reintroduced",()=>{const previous=merge(original(),batch).worksheet;const next=makeDraft("2026-10-16").data;const x=merge(next,{...batch,batch_id:"next-week",searched_on:"2026-10-16",candidates:[{source_url:"https://example.org/new",source_title:"Old story",source_locator:"ref",update_note:"Important correction requires fresh review."}]},[previous]).worksheet;assert.equal(x.items.length,0);assert.equal(x.cross_week_updates[0].related_candidate_id,"W2026-10-09-A02");assert.equal(x.cross_week_updates[0].review_required,true)});
test("same-week update reference does not upgrade hold",()=>{const first=merge(original(),batch).worksheet;const second=merge(first,{...batch,batch_id:"second",searched_on:"2026-10-10",candidates:[{source_url:"https://example.org/new",source_title:"Revised",source_locator:"notice",update_note:"Official updated interpretation"}]}).worksheet;assert.equal(second.items.length,3);assert.equal(second.items[1].decision,"hold");assert.equal(second.items[1].source_updates.length,1)});

test("source URLs with substantive query params remain distinct",()=>{const first=merge(original(),{...batch,candidates:[{source_url:"https://example.org/doc?id=10",source_title:"a",source_locator:"x"}]}).worksheet;const second=merge(first,{...batch,batch_id:"query2",candidates:[{source_url:"https://example.org/doc?id=11",source_title:"b",source_locator:"x"}]}).worksheet;assert.equal(second.items.length,3)});
test("unannotated duplicate is retained as unresolved instead of silently discarded",()=>{const first=merge(original(),batch).worksheet;const next=merge(first,{...batch,batch_id:"again",candidates:[{source_url:"https://example.org/new",source_title:"a",source_locator:"x"}]}).worksheet;assert.equal(next.unresolved_duplicate_discoveries.length,2)});
test("import date outside selected week is rejected",()=>{assert.throws(()=>merge(original(),{...batch,searched_on:"2026-10-16"}),/outside selected week/)});

test("incremental import preserves existing verified summary counters",()=>{
 const w=original();w.screening_summary.ready_to_publish=2;w.screening_summary.verified_for_publication=2;
 const next=merge(w,batch).worksheet;
 assert.equal(next.screening_summary.ready_to_publish,2);
 assert.equal(next.screening_summary.verified_for_publication,2);
 assert.equal(next.screening_summary.candidate_count,3);
});
test("search log never claims 30 days were actually inspected unless provided",()=>{
 const next=merge(original(),batch).worksheet;
 assert.equal(next.search_runs[0].lookback_days,null);
 assert.equal(next.search_runs[0].lookback_days_target,30);
});
test("duplicate batch IDs across different weekly sheets cannot be silently reused",()=>{
 const past=merge(original(),batch).worksheet;
 const w=makeDraft("2026-10-16").data;
 assert.throws(()=>merge(w,{...batch,searched_on:"2026-10-16"},[past]),/already ingested/);
});
test("candidate source with embedded URL credentials fails closed",()=>{
 assert.throws(()=>merge(original(),{...batch,candidates:[{source_url:"https://u:p@example.org/abc",source_title:"bad",source_locator:"x"}]}),/candidate needs https/);
});
test("candidate marked as already published in the future fails closed",()=>{
 assert.throws(()=>merge(original(),{...batch,candidates:[{source_url:"https://example.org/abc",source_title:"bad",source_locator:"x",source_publication_date:"2026-10-12"}]}),/future/);
});
test("exclusive writer lock prevents losing concurrent candidate writes",t=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),"ingest-lock-"));t.after(()=>fs.rmSync(root,{recursive:true,force:true}));
 const dir=path.join(root,"research","drafts");fs.mkdirSync(dir,{recursive:true});
 const draft=makeDraft("2026-10-09");
 const target=path.join(dir,draft.filename),batchPath=path.join(root,"batch.json");
 fs.writeFileSync(target,JSON.stringify(draft.data));
 fs.writeFileSync(batchPath,JSON.stringify(batch));
 fs.writeFileSync(target+".lock","busy");
 const before=fs.readFileSync(target,"utf8");
 assert.throws(()=>ingest(root,"2026-10-09",batchPath),/EEXIST/);
 assert.equal(fs.readFileSync(target,"utf8"),before);
 fs.unlinkSync(target+".lock");
 const result=ingest(root,"2026-10-09",batchPath);
 assert.equal(result.added.length,2);
 assert.equal(fs.existsSync(target+".lock"),false);
 assert.equal(JSON.parse(fs.readFileSync(target,"utf8")).items.length,2);
});
