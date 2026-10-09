"use strict";
const {test}=require("node:test"),assert=require("node:assert/strict"),fs=require("node:fs"),os=require("node:os"),path=require("node:path"),crypto=require("node:crypto");
const {build,archiveData,renderDailyEdition,fillHomepage}=require("./render-site.js");
const {validate}=require("./validate-publication.js");
const root=path.join(__dirname,"..");

test("generated site pages in the repository are up to date",()=>{
 for(const [rel,text] of Object.entries(build(root)))assert.equal(fs.readFileSync(path.join(root,rel),"utf8"),text,rel);
});

test("generated pages contain no scripts, inline handlers or unsafe URL schemes",()=>{
 for(const [rel,text] of Object.entries(build(root))){
  assert.ok(!/<\/?(script|iframe|object|embed|form)\b/i.test(text),rel);
  assert.ok(!/\son[a-z]+\s*=/i.test(text),rel);
  assert.ok(!/(href|src)\s*=\s*["']\s*(javascript|data|vbscript|file):/i.test(text),rel);
  if(rel.endsWith(".html"))assert.ok(text.includes('assets/favicon.svg" type="image/svg+xml"'),rel+" must link the site icon");
 }
});

test("homepage keeps feedback entry and both generated blocks",()=>{
 const home=build(root)["index.html"];
 assert.ok(home.includes("feedback/")&&home.includes("GitHub"));
 for(const m of ["daily-latest","archive-stats"])assert.ok(home.includes("<!-- generated:"+m+":start -->")&&home.includes("<!-- generated:"+m+":end -->"));
 assert.throws(()=>fillHomepage("<html></html>",[],{policy:[],research:[]}),/marker missing/);
});

test("archive excludes weekly candidates, escapes titles and keeps unknown dates unknown",()=>{
 const records=[
  {record_id:"KB-2026-9001",title:"Held <b>candidate</b>",primary_url:"https://example.org/a",record_type:"journal_article",year_value:"",year_basis:"unknown",first_published_on:"",verification_status:"discovered_unverified",source_candidate_id:"W2026-10-09-A99"},
  {record_id:"KB-2026-9002",title:"Study <script>x</script>",primary_url:"https://example.org/b",record_type:"journal_article",year_value:"2026",year_basis:"issue_year",first_published_on:"",verification_status:"discovered_unverified",source_candidate_id:""},
  {record_id:"KB-2024-9003",title:"National framework",primary_url:"https://example.org/c",record_type:"framework",year_value:"2024",year_basis:"first_publication",first_published_on:"2024-05-01",verification_status:"bibliographic_checked",source_candidate_id:""}];
 const relations=[{subject_id:"KB-2026-9002",predicate:"published_in",object_id:"J02"},{subject_id:"KB-2024-9003",predicate:"applies_to_country",object_id:"JP"}];
 const d=archiveData(records,relations,[{id:"J02",name:"Journal Two"}]);
 const all=[...d.policy,...d.journals,...d.conferences].flatMap(g=>g.rows);
 assert.equal(all.length,2);assert.ok(!all.some(r=>r.id==="KB-2026-9001"));
 assert.equal(d.journals[0].rows[0].date,"卷期年（首發日未知）");assert.equal(d.conferences.length,0);
 assert.equal(d.policy[0].name,"日本");assert.equal(d.policy[0].rows[0].date,"2024-05-01 首發");
});

test("a generated daily edition page passes the publication gate unchanged",t=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),"render-site-"));t.after(()=>fs.rmSync(dir,{recursive:true,force:true}));
 const excerpt="This fictional agency published a nonbinding advisory for secondary-school educators.";
 fs.mkdirSync(path.join(dir,"publication","claims"),{recursive:true});fs.mkdirSync(path.join(dir,"publication","sources"),{recursive:true});
 fs.writeFileSync(path.join(dir,"publication","sources","fixture.txt"),excerpt+"\n");
 const c={audience:"k12",ai_lit_class:"A",ai_lit_dims:["T-PD"],ai_lit_note:"合成示例：教師 AI 素養建議",evidence_path:"publication/sources/fixture.txt",evidence_sha256:crypto.createHash("sha256").update(excerpt+"\n").digest("hex"),original_excerpt:excerpt,evidence_source_url:"https://example.org/official?id=7&lang=en",interpretation_note:"合成公告僅表明提出非拘束性建議，不包含成效評估。",scope_limitation:"此合成示例不涉及全國法規之效力。",assertion_type:"direct_statement",translation_reviewed:true,claim_id:"C1",kind:"news_policy",ai_crosscheck_status:"concordant",ai_crosscheck_passes:2,ai_crosscheck_record:"two isolated original-source cross-check records",source_url:"https://example.org/official?id=7&lang=en",source_locator:"公告第2段",publication_date:"2026-10-10",source_type:"official",source_checked:true,scope_checked:true,outcome_checked:false,independent_review:false,conflict_unresolved:false,decision:"publish",
  claim_class:"bibliographic",risk_tier:"low",level:"N-V1",checked_at:"2026-10-10",source_title:"Synthetic school AI announcement",source_organization:"Example Institution",daily_fact_kind:"official_notice",source_document_type:"official_guidance",first_disclosed_on:"2026-10-10",claim_text:"來源機構：Example Institution；資料標題：Synthetic school AI announcement；來源刊登日：2026-10-10。"};
 fs.mkdirSync(path.join(dir,"daily","2026-10-10"),{recursive:true});
 fs.writeFileSync(path.join(dir,"daily","2026-10-10","index.html"),renderDailyEdition({date:"2026-10-10",claims:[c]}));
 fs.writeFileSync(path.join(dir,"publication","claims","daily-2026-10-10.json"),JSON.stringify([c]));
 fs.writeFileSync(path.join(dir,"publication","issues.json"),JSON.stringify({schema_version:1,editions:[{path:"daily/2026-10-10/index.html",claims_file:"publication/claims/daily-2026-10-10.json",publication_mode:"ai_low_risk_source_facts"}]}));
 const r=validate(dir);assert.deepEqual(r.errors,[]);assert.equal(r.ok,true);
 // Navigation, title and notice sit outside <main>; altering the claim text in HTML still fails.
 fs.writeFileSync(path.join(dir,"daily","2026-10-10","index.html"),renderDailyEdition({date:"2026-10-10",claims:[{...c,claim_text:c.claim_text+"另有成效"}]}));
 assert.equal(validate(dir).ok,false);
});

test("journals and conferences are split by record type and every quick-index link has a target",()=>{
 const records=[
  {record_id:"KB-2026-9101",title:"Conference paper",primary_url:"https://example.org/c",record_type:"conference_paper",year_value:"2026",year_basis:"issue_year",first_published_on:"",verification_status:"discovered_unverified",source_candidate_id:""},
  {record_id:"KB-2025-9102",title:"Journal article",primary_url:"https://example.org/j",record_type:"journal_article",year_value:"2025",year_basis:"issue_year",first_published_on:"",verification_status:"discovered_unverified",source_candidate_id:""}];
 const d=archiveData(records,[{subject_id:"KB-2026-9101",predicate:"published_in",object_id:"C22"}],[{id:"C22",name:"EAAI"}]);
 assert.equal(d.conferences[0].name,"EAAI");assert.equal(d.journals[0].name,"其他期刊");
 const files=build(root);
 for(const rel of ["archive/policy/index.html","archive/journals/index.html","archive/conferences/index.html"]){
  const html=files[rel];assert.ok(html.includes('id="index"'),rel);
  const ids=new Set([...html.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]));
  for(const m of html.matchAll(/href="#([^"]+)"/g))assert.ok(ids.has(m[1]),rel+" missing anchor "+m[1]);
  const head=html.match(/<table class="index-table"><thead><tr>([\s\S]*?)<\/tr>/)[1];
  const years=[...head.matchAll(/<th scope="col">(\d{4})<\/th>/g)].map(m=>Number(m[1]));
  assert.ok(years.length&&years.at(-1)<=2023,rel+" year columns must reach back to 2023");
  for(let i=1;i<years.length;i++)assert.equal(years[i],years[i-1]-1,rel+" year columns must be contiguous");
  assert.ok(html.includes('assets/site.css?v='),rel+" stylesheet must carry a version query");
 }
 assert.ok(files["archive/research/index.html"].includes("../journals/")&&files["archive/research/index.html"].includes("../conferences/"));
});
