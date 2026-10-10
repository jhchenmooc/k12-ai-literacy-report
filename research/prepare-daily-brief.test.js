"use strict";
const {test}=require("node:test"),assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path");
const {makeDraft}=require("./scaffold-weekly.js"),{merge}=require("./ingest-candidates.js"),{dailyBrief,markdown,create}=require("./prepare-daily-brief.js");
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

test("daily recommendation never overrides a pending same-week source correction",()=>{
 const w=makeDraft("2026-10-09").data;w.search_runs=[];
 const item={ai_lit_class:"A",audience:"k12",candidate_id:"verified",source_url:"https://example.org/v",source_title:"Verified",source_publication_date:"2026-10-09",first_disclosed_on:"2026-10-09",verification_completed_on:"2026-10-09",source_checked:true,conflict_unresolved:false,decision:"publish",source_updates:[{review_required:true,discovered_on:"2026-10-09",source_url:"https://example.org/v",note:"Unresolved correction"}]};
 w.items=[item];
 assert.deepEqual(dailyBrief(w,"2026-10-10").suggested_for_publication,[]);
 item.source_updates[0].review_required=false;
 assert.equal(dailyBrief(w,"2026-10-10").suggested_for_publication.length,1);
});
test("unresolved duplicate discoveries block recommendation for associated candidate",()=>{
 const w=makeDraft("2026-10-09").data;w.search_runs=[];
 w.items=[{candidate_id:"c",source_url:"https://example.org/v",source_title:"V",source_publication_date:"2026-10-09",first_disclosed_on:"2026-10-09",verification_completed_on:"2026-10-09",source_checked:true,conflict_unresolved:false,decision:"publish"}];
 w.unresolved_duplicate_discoveries=[{related_candidate_id:"c",searched_on:"2026-10-09",review_required:true}];
 assert.equal(dailyBrief(w,"2026-10-10").suggested_for_publication.length,0);
});
test("cannot recommend a future-dated source in yesterday's daily pack",()=>{
 const w=makeDraft("2026-10-09").data;w.search_runs=[];
 w.items=[{candidate_id:"future",source_url:"https://example.org/v",source_publication_date:"2026-10-12",first_disclosed_on:"2026-10-12",verification_completed_on:"2026-10-09",source_checked:true,conflict_unresolved:false,decision:"publish"}];
 assert.deepEqual(dailyBrief(w,"2026-10-10").suggested_for_publication,[]);
});
test("invalid date input fails with clear error",()=>{
 assert.throws(()=>dailyBrief(makeDraft("2026-10-09").data,null),/invalid issue date/);
});

test("real first-week nine candidates remain held and never auto-promote",()=>{
 const w=JSON.parse(fs.readFileSync(path.join(__dirname,"drafts","2026-10-09_2026-10-15.json"),"utf8"));
 const count=w.items.length;assert.ok(count>=9);
 assert.equal(w.items.filter(c=>c.decision==="hold").length,count);
 const a07=w.items.find(c=>c.candidate_id==="W2026-10-09-A07");
 assert.ok(a07);
 assert.equal(a07.source_checked,false);
 assert.match(a07.screening_note,/7 and 8 Oct/);
 const brief=dailyBrief(w,"2026-10-10");
 assert.deepEqual(brief.suggested_for_publication,[]);
 assert.equal(w.items.length,count);
 assert.equal(w.screening_summary.ready_to_publish,0);
 assert.equal(w.screening_summary.verified_for_publication,0);
});
test("daily suggestions require AI literacy scope A/B and a daily audience",()=>{
 const base={candidate_id:"v",source_url:"https://example.org/v",source_title:"V",source_publication_date:"2026-10-09",first_disclosed_on:"2026-10-09",verification_completed_on:"2026-10-09",source_checked:true,conflict_unresolved:false,decision:"publish",ai_lit_class:"A",audience:"k12"};
 const count=extra=>{const w=makeDraft("2026-10-09").data;w.search_runs=[];w.items=[{...base,...extra}];return dailyBrief(w,"2026-10-10").suggested_for_publication.length};
 assert.equal(count({}),1);assert.equal(count({ai_lit_class:"B",audience:"other_stakeholders"}),1);
 for(const bad of [{ai_lit_class:"C"},{ai_lit_class:"unknown"},{ai_lit_class:undefined},{audience:"teacher_ed"},{audience:"unknown"},{audience:undefined}])assert.equal(count(bad),0,JSON.stringify(bad));
});

test("a fresh scaffold produces an empty daily briefing without an import",()=>{
 const brief=dailyBrief(makeDraft("2026-10-09").data,"2026-10-10");
 assert.deepEqual(brief.pending,[]);assert.deepEqual(brief.coverage,[]);assert.match(markdown(brief),/無已記錄批次/);
});
test("CLI reader includes historical late verification and updates only as background",t=>{
 const os=require("node:os"),root=fs.mkdtempSync(path.join(os.tmpdir(),"daily-history-"));t.after(()=>fs.rmSync(root,{recursive:true,force:true}));
 const dir=path.join(root,"research","drafts");fs.mkdirSync(dir,{recursive:true});
 const old=makeDraft("2026-10-09"),current=makeDraft("2026-10-16"),future=makeDraft("2026-10-23");
 old.data.search_runs=[];current.data.search_runs=[];future.data.search_runs=[];
 old.data.items=[{candidate_id:"late",source_url:"https://example.org/late",source_title:"Late",source_publication_date:"2026-10-09",discovered_on:"2026-10-09",verification_completed_on:"2026-10-16",first_disclosed_on:"2026-10-09",source_checked:true,conflict_unresolved:false,decision:"publish",ai_lit_class:"A",audience:"k12"},
 {candidate_id:"unknown",source_url:"https://example.org/unknown",source_title:"Unknown",source_publication_date:"unknown",verification_completed_on:"2026-10-16",decision:"hold"},
 {candidate_id:"updated",source_url:"https://example.org/updated",source_updates:[{discovered_on:"2026-10-16",source_url:"https://example.org/updated",note:"Correction",review_required:true}]}];
 old.data.unresolved_duplicate_discoveries=[{searched_on:"2026-10-16",source_url:"https://example.org/repeat",review_required:true}];
 future.data.items=[{...old.data.items[0],candidate_id:"future"}];
 for(const draft of [old,current,future])fs.writeFileSync(path.join(dir,draft.filename),JSON.stringify(draft.data));
 const before=fs.readFileSync(path.join(dir,old.filename),"utf8"),brief=create(root,"2026-10-17");
 assert.deepEqual(brief.background.map(x=>x.candidate_id),["late","unknown"]);assert.deepEqual(brief.pending,[]);assert.deepEqual(brief.suggested_for_publication,[]);
 assert.deepEqual(brief.source_updates.map(x=>x.source_url).sort(),["https://example.org/repeat","https://example.org/updated"]);
 assert.deepEqual(brief.coverage,[]);assert.equal(fs.readFileSync(path.join(dir,old.filename),"utf8"),before);
});

test("history reader recognizes only empty legacy scaffolds and names malformed files",t=>{
 const root=fs.mkdtempSync(path.join(require("node:os").tmpdir(),"daily-legacy-"));t.after(()=>fs.rmSync(root,{recursive:true,force:true}));
 const dir=path.join(root,"research","drafts");fs.mkdirSync(dir,{recursive:true});
 const current=makeDraft("2026-10-16"),old=makeDraft("2026-10-09");
 fs.writeFileSync(path.join(dir,current.filename),JSON.stringify(current.data));
 delete old.data.search_runs;
 const save=()=>fs.writeFileSync(path.join(dir,old.filename),JSON.stringify(old.data));save();
 assert.deepEqual(create(root,"2026-10-17").background,[]);
 for(const invalid of [null,false,{}]){old.data.search_runs=invalid;save();assert.throws(()=>create(root,"2026-10-17"),/2026-10-09_2026-10-15.json: invalid cumulative worksheet/)}
 delete old.data.search_runs;old.data.items=[{candidate_id:"lost-coverage"}];save();
 assert.throws(()=>create(root,"2026-10-17"),/invalid cumulative worksheet/);
});

test("history removes exact duplicate updates while retaining distinct corrections",t=>{
 const root=fs.mkdtempSync(path.join(require("node:os").tmpdir(),"daily-dedup-"));t.after(()=>fs.rmSync(root,{recursive:true,force:true}));
 const dir=path.join(root,"research","drafts");fs.mkdirSync(dir,{recursive:true});
 const current=makeDraft("2026-10-16"),old=makeDraft("2026-10-09");
 const update={discovered_on:"2026-10-16",source_url:"https://example.org/a",note:"Correction",review_required:true};
 current.data.cross_week_updates=[update];old.data.cross_week_updates=[{...update},{...update,note:"Second correction"}];
 for(const draft of [current,old])fs.writeFileSync(path.join(dir,draft.filename),JSON.stringify(draft.data));
 const brief=create(root,"2026-10-17");assert.deepEqual(brief.source_updates.map(x=>x.note),["Correction","Second correction"]);
 assert.deepEqual(brief.suggested_for_publication,[]);
});

test("unresolved historical corrections veto a current recommendation until reviewed",t=>{
 const root=fs.mkdtempSync(path.join(require("node:os").tmpdir(),"daily-history-veto-"));t.after(()=>fs.rmSync(root,{recursive:true,force:true}));
 const dir=path.join(root,"research","drafts");fs.mkdirSync(dir,{recursive:true});
 const current=makeDraft("2026-10-16"),old=makeDraft("2026-10-09");
 current.data.items=[{candidate_id:"current",source_url:"https://example.org/v?item=1",source_title:"V",source_publication_date:"2026-10-16",first_disclosed_on:"2026-10-16",verification_completed_on:"2026-10-16",source_checked:true,conflict_unresolved:false,decision:"publish",ai_lit_class:"A",audience:"k12"}];
 old.data.items=[{candidate_id:"prior",source_url:"https://example.org/v?item=1&utm_source=prior",source_updates:[{discovered_on:"2026-10-10",note:"Still unresolved",review_required:true}]}];
 const save=()=>{for(const draft of [current,old])fs.writeFileSync(path.join(dir,draft.filename),JSON.stringify(draft.data))};save();
 const brief=create(root,"2026-10-17");assert.deepEqual(brief.suggested_for_publication,[]);assert.ok(brief.source_updates.some(x=>x.note==="Still unresolved"));
 old.data.items[0].source_updates[0].review_required=false;save();assert.equal(create(root,"2026-10-17").suggested_for_publication.length,1);
 old.data.items[0].source_url="https://example.org/v?item=2";old.data.items[0].source_updates[0].review_required=true;save();assert.equal(create(root,"2026-10-17").suggested_for_publication.length,1);
});

test("malformed worksheet internals return a named validation error",t=>{
 const root=fs.mkdtempSync(path.join(require("node:os").tmpdir(),"daily-malformed-"));t.after(()=>fs.rmSync(root,{recursive:true,force:true}));
 const dir=path.join(root,"research","drafts");fs.mkdirSync(dir,{recursive:true});const draft=makeDraft("2026-10-09");
 for(const bad of [{period:null},{items:[null]},{search_runs:[null]},{cross_week_updates:{}},{items:[{source_updates:[null]}]},{items:[{source_updates:[{review_required:"true"}]}]}]){
  fs.writeFileSync(path.join(dir,draft.filename),JSON.stringify({...draft.data,...bad}));
  assert.throws(()=>create(root,"2026-10-10"),/2026-10-09_2026-10-15.json: invalid cumulative worksheet/);
 }
});

test("direct daily briefing matches pending updates by source URL without an ID",()=>{
 const sheet=makeDraft("2026-10-09").data;
 sheet.items=[{candidate_id:"c",source_url:"https://example.org/v",source_publication_date:"2026-10-09",first_disclosed_on:"2026-10-09",verification_completed_on:"2026-10-09",source_checked:true,conflict_unresolved:false,decision:"publish",ai_lit_class:"A",audience:"k12"}];
 sheet.cross_week_updates=[{source_url:"https://example.org/v?utm_source=duplicate",review_required:true,discovered_on:"2026-10-09"}];
 assert.deepEqual(dailyBrief(sheet,"2026-10-10").suggested_for_publication,[]);
 sheet.cross_week_updates[0].review_required=false;assert.equal(dailyBrief(sheet,"2026-10-10").suggested_for_publication.length,1);
});
