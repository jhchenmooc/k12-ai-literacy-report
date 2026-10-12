"use strict";
const {test}=require("node:test"),assert=require("node:assert/strict"),fs=require("node:fs"),os=require("node:os"),path=require("node:path"),crypto=require("node:crypto");
const {build,archiveData,dailyTags,renderDailyEdition,renderWeeklyEdition,fillHomepage}=require("./render-site.js");
const {validate}=require("./validate-publication.js");
const root=path.join(__dirname,"..");

test("archive ordering is independent of host locale and input order, with stable ID ties",()=>{
 const records=[
  {record_id:"KB-2026-0003",title:"初等中等教育段階",record_type:"journal_article",year_value:"2026"},
  {record_id:"KB-2026-0002",title:"ChatGPT",record_type:"journal_article",year_value:"2026"},
  {record_id:"KB-2026-0001",title:"ChatGPT",record_type:"journal_article",year_value:"2026"}
 ];
 const ids=xs=>archiveData(xs,[],[]).journals[0].rows.map(r=>r.id);
 assert.deepEqual(ids(records),["KB-2026-0001","KB-2026-0002","KB-2026-0003"]);
 assert.deepEqual(ids(records.slice().reverse()),ids(records));
 const native=String.prototype.localeCompare;
 try{
  String.prototype.localeCompare=function(other,locale,options){
   assert.ok(locale,"build must not use the machine's default collation");
   return native.call(this,other,locale,options);
  };
  assert.deepEqual(ids(records),["KB-2026-0001","KB-2026-0002","KB-2026-0003"]);
 }finally{String.prototype.localeCompare=native}
});

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

test("homepage stats count preprints and book chapters separately from journal articles",()=>{
 const shell='<!-- generated:daily-latest:start --><!-- generated:daily-latest:end --><!-- generated:archive-stats:start --><!-- generated:archive-stats:end -->';
 const group=(key,n)=>({key,rows:Array.from({length:n},(_,i)=>({id:key+i}))});
 const stats=journals=>fillHomepage(shell,[],{policy:[group("p",3)],journals,conferences:[group("c",4)]}).match(/<div class="stats">.*?<\/div><!--/)[0];
 const labels=html=>[...html.matchAll(/<strong>(\d+)<\/strong><span>([^<]+)<\/span>/g)].map(m=>m[2]+"="+m[1]);
 assert.deepEqual(labels(stats([group("1-j",5)])),["政策與框架=3","期刊論文=5","會議論文=4"]);
 assert.deepEqual(labels(stats([group("1-j",5),group("7-preprint",1),group("8-book",2)])),["政策與框架=3","期刊論文=5","專書章節=2","預印本=1","會議論文=4"]);
 assert.deepEqual(labels(stats([group("7-preprint",2)])),["政策與框架=3","期刊論文=0","預印本=2","會議論文=4"]);
 const pages=build(root),m=pages["archive/index.html"].match(/(\d+) 筆期刊論文(?:、(\d+) 筆專書章節)?(?:、(\d+) 筆預印本)?/);
 assert.ok(m,"archive overview lists journal articles");
 const home=labels(pages["index.html"]);
 assert.ok(home.includes("期刊論文="+m[1]));
 if(m[2])assert.ok(home.includes("專書章節="+m[2]));
 if(m[3])assert.ok(home.includes("預印本="+m[3]));
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

test("archive lists weekly candidates once their source is checked",()=>{
 const records=[
  {record_id:"KB-2026-9011",title:"Held candidate",primary_url:"https://example.org/h",record_type:"journal_article",year_value:"",year_basis:"unknown",first_published_on:"",verification_status:"discovered_unverified",source_candidate_id:"W2026-10-09-A98"},
  {record_id:"KB-2026-9012",title:"Checked candidate",primary_url:"https://example.org/k",record_type:"journal_article",year_value:"2026",year_basis:"first_publication",first_published_on:"2026-10-10",verification_status:"bibliographic_checked",source_candidate_id:"W2026-10-09-A97"}];
 const relations=[{subject_id:"KB-2026-9011",predicate:"published_in",object_id:"J02"},{subject_id:"KB-2026-9012",predicate:"published_in",object_id:"J02"}];
 const rows=archiveData(records,relations,[{id:"J02",name:"Journal Two"}]).journals.flatMap(g=>g.rows);
 assert.deepEqual(rows.map(r=>r.id),["KB-2026-9012"]);
 assert.equal(rows[0].date,"2026-10-10 首發");assert.equal(rows[0].status[1],"書目已核");
});

test("archive groups preprints separately and shows the high-citation tag",()=>{
 const records=[
  {record_id:"KB-2026-9021",title:"A preprint",primary_url:"https://arxiv.org/abs/1",record_type:"preprint",year_value:"2026",year_basis:"first_publication",first_published_on:"2026-10-05",verification_status:"bibliographic_checked",source_candidate_id:""},
  {record_id:"KB-2025-9022",title:"Cited article",primary_url:"https://example.org/c",record_type:"journal_article",year_value:"2025",year_basis:"issue_year",first_published_on:"",verification_status:"discovered_unverified",source_candidate_id:""}];
 const relations=[{subject_id:"KB-2025-9022",predicate:"published_in",object_id:"J02"},{subject_id:"KB-2025-9022",predicate:"has_citation_flag",object_id:"CITED_TOP10_SAME_YEAR"}];
 const d=archiveData(records,relations,[{id:"J02",name:"Journal Two"}]);
 const pre=d.journals.find(g=>g.key==="7-preprint");
 assert.ok(pre);assert.deepEqual(pre.rows.map(r=>r.id),["KB-2026-9021"]);assert.equal(pre.rows[0].type,"預印本");
 const cited=d.journals.flatMap(g=>g.rows).find(r=>r.id==="KB-2025-9022");
 assert.ok(cited.tags3.includes("高引用"));assert.ok(!pre.rows[0].tags3.includes("高引用"));
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

test("a registered weekly edition is generated by the renderer and passes the publication gate",t=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),"render-site-"));t.after(()=>fs.rmSync(dir,{recursive:true,force:true}));
 for(const f of ["index.html","research/venue-watchlist.csv","research/venue-watchlist.md","research/ai-literacy-c-records.json","assets/site.css"]){fs.mkdirSync(path.dirname(path.join(dir,f)),{recursive:true});fs.copyFileSync(path.join(root,f),path.join(dir,f))}
 fs.cpSync(path.join(root,"research","knowledge-base","data"),path.join(dir,"research","knowledge-base","data"),{recursive:true});
 const excerpt="This fictional agency published a nonbinding advisory for secondary-school educators.";
 fs.mkdirSync(path.join(dir,"publication","claims"),{recursive:true});fs.mkdirSync(path.join(dir,"publication","sources"),{recursive:true});
 fs.writeFileSync(path.join(dir,"publication","sources","fixture.txt"),excerpt+"\n");
 const c={audience:"k12",ai_lit_class:"A",ai_lit_dims:["T-PD"],ai_lit_note:"合成示例：教師 AI 素養建議",evidence_path:"publication/sources/fixture.txt",evidence_sha256:crypto.createHash("sha256").update(excerpt+"\n").digest("hex"),original_excerpt:excerpt,evidence_source_url:"https://example.org/official",interpretation_note:"合成公告僅表明提出非拘束性建議，不包含成效評估。",scope_limitation:"此合成示例不涉及全國法規之效力。",assertion_type:"direct_statement",translation_reviewed:true,claim_id:"C1",kind:"news_policy",claim_class:"descriptive",risk_tier:"medium",ai_crosscheck_status:"concordant",ai_crosscheck_passes:2,ai_crosscheck_record:"two isolated original-source cross-check records",claim_text:"合成案例：某機構公告",source_url:"https://example.org/official",source_locator:"公告第2段",checked_at:"2026-10-16",publication_date:"2026-10-10",source_type:"official",source_checked:true,scope_checked:true,outcome_checked:false,independent_review:false,conflict_unresolved:false,decision:"publish",level:"N-V2"};
 fs.writeFileSync(path.join(dir,"publication","claims","weekly-2026-10-10_10-16.json"),JSON.stringify([c]));
 fs.writeFileSync(path.join(dir,"publication","issues.json"),JSON.stringify({schema_version:1,editions:[{path:"weekly/2026-10-10_10-16/index.html",claims_file:"publication/claims/weekly-2026-10-10_10-16.json"}]}));
 const files=build(dir),page="weekly/2026-10-10_10-16/index.html";
 assert.equal(files[page],renderWeeklyEdition({period:"2026-10-10_10-16",claims:[c]}));
 assert.ok(files["weekly/index.html"].includes('href="2026-10-10_10-16/"'));
 assert.ok(files[page].includes('<a class="skip" href="#content">')&&files[page].includes('<main id="content"'));
 fs.mkdirSync(path.join(dir,"weekly","2026-10-10_10-16"),{recursive:true});fs.writeFileSync(path.join(dir,page),files[page]);
 const r=validate(dir);assert.deepEqual(r.errors.filter(e=>e.startsWith("weekly/")),[]);
 // Changing the claim text in HTML only, without the claims file, still fails the gate.
 fs.writeFileSync(path.join(dir,page),renderWeeklyEdition({period:"2026-10-10_10-16",claims:[{...c,claim_text:c.claim_text+"另有成效"}]}));
 assert.ok(validate(dir).errors.some(e=>e.startsWith("weekly/")));
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

test("book chapters are listed in their own group on the journals page, labelled 專書章節",()=>{
 const records=[
  {record_id:"KB-2026-9201",title:"Book chapter",primary_url:"https://example.org/b",record_type:"book_chapter",year_value:"2026",year_basis:"issue_year",first_published_on:"",verification_status:"discovered_unverified",source_candidate_id:""},
  {record_id:"KB-2026-9202",title:"Journal article",primary_url:"https://example.org/j",record_type:"journal_article",year_value:"2026",year_basis:"issue_year",first_published_on:"",verification_status:"discovered_unverified",source_candidate_id:""}];
 const d=archiveData(records,[],[]);
 const book=d.journals.find(g=>g.key==="8-book");
 assert.ok(book&&book.name==="專書章節");
 assert.deepEqual(book.rows.map(r=>[r.id,r.type]),[["KB-2026-9201","專書章節"]]);
 assert.ok(!d.journals.some(g=>g.key!=="8-book"&&g.rows.some(r=>r.id==="KB-2026-9201")));
 assert.equal(d.conferences.length,0);
});

test("AI literacy scope C records are hidden from the archive and every listed record exists",()=>{
 const records=[
  {record_id:"KB-2026-9101",title:"In scope",primary_url:"https://example.org/a",record_type:"journal_article",year_value:"2026",year_basis:"issue_year",first_published_on:"",verification_status:"discovered_unverified",source_candidate_id:""},
  {record_id:"KB-2026-9102",title:"Scope C",primary_url:"https://example.org/b",record_type:"journal_article",year_value:"2026",year_basis:"issue_year",first_published_on:"",verification_status:"discovered_unverified",source_candidate_id:""}];
 const relations=[{subject_id:"KB-2026-9101",predicate:"published_in",object_id:"J02"},{subject_id:"KB-2026-9102",predicate:"published_in",object_id:"J02"}];
 const d=archiveData(records,relations,[{id:"J02",name:"Journal Two"}],["KB-2026-9102"]);
 assert.deepEqual(d.journals.flatMap(g=>g.rows).map(r=>r.id),["KB-2026-9101"]);
 const list=JSON.parse(fs.readFileSync(path.join(__dirname,"ai-literacy-c-records.json"),"utf8")).records;
 const urls=new Map(fs.readFileSync(path.join(__dirname,"knowledge-base","data","records.csv"),"utf8").split("\n").map(l=>l.match(/^"(KB-\d{4}-\d{4})","[^"]*","[^"]*","(?:[^"]|"")*","([^"]*)"/)).filter(Boolean).map(m=>[m[1],m[2]]));
 for(const x of list){assert.ok(urls.has(x.record_id),x.record_id);assert.ok(fs.existsSync(path.join(__dirname,"..",x.decided_in)),x.decided_in)}
 const pages=["archive/journals/index.html","archive/conferences/index.html","archive/policy/index.html"].map(p=>fs.readFileSync(path.join(__dirname,"..",p),"utf8"));
 assert.ok(pages[0].includes('href="https://doi.org/'),"archive pages render record URLs");
 for(const x of list){const u=urls.get(x.record_id).replace(/&/g,"&amp;");for(const page of pages)assert.ok(!page.includes('"'+u+'"'),x.record_id+" still listed")}
});

test("daily list and edition page show audience, A/B and framework tags",()=>{
 const c={claim_id:"D20990101-01",claim_text:"來源機構：X；資料標題：T；來源刊登日：2099-01-01。",source_title:"T",source_url:"https://example.org/t",audience:"k12",ai_lit_class:"A",ai_lit_dims:["S-SYS","S-BAS"]};
 assert.equal(dailyTags(c),'<div class="tags3"><span class="t">#中小學</span> <span class="t">#AI素養核心</span> <span class="t">#學生AI基礎與技術</span> <span class="t">#學生AI系統設計</span></div>');
 assert.equal(dailyTags({}),"");
 const page=renderDailyEdition({date:"2099-01-01",claims:[c]});
 assert.ok(page.includes('</p><p data-claim-tags="D20990101-01">#中小學 #AI素養核心 #學生AI基礎與技術 #學生AI系統設計</p>'));
 assert.ok(!renderDailyEdition({date:"2099-01-01",claims:[{...c,audience:undefined,ai_lit_class:undefined,ai_lit_dims:undefined}]}).includes("data-claim-tags"));
});

test("daily list and homepage show one card per day with that day's items inside",()=>{
 const pages=build(root),days=JSON.parse(fs.readFileSync(path.join(root,"publication","issues.json"),"utf8")).editions.filter(e=>e.path.startsWith("daily/"));
 const list=pages["daily/index.html"];
 assert.equal((list.match(/class="item daily-card"/g)||[]).length,days.length);
 assert.equal((list.match(/當日短訊頁/g)||[]).length,days.length);
 const home=pages["index.html"].split("generated:daily-latest:start")[1].split("generated:daily-latest:end")[0];
 assert.equal((home.match(/class="item daily-card"/g)||[]).length,1);
});
