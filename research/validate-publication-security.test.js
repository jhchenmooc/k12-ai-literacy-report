"use strict";
const {test}=require("node:test"),assert=require("node:assert/strict"),fs=require("node:fs"),os=require("node:os"),path=require("node:path"),{spawnSync}=require("node:child_process");
const {validate}=require("./validate-publication.js");
const claim={claim_id:"C1",kind:"news_policy",claim_class:"bibliographic",risk_tier:"low",claim_text:"Synthetic notice",source_url:"https://example.org/source",source_locator:"Title",checked_at:"2026-10-10",publication_date:"2026-10-10",source_type:"official",source_checked:true,level:"N-V1",decision:"publish",conflict_unresolved:false,ai_lit_class:"A",ai_lit_dims:["T-PD"],ai_lit_note:"Teacher AI literacy announcement",audience:"k12"};
function put(root,name,text){const f=path.join(root,name);fs.mkdirSync(path.dirname(f),{recursive:true});fs.writeFileSync(f,text)}
function fixture(t,html){const root=fs.mkdtempSync(path.join(os.tmpdir(),"publication-security-"));t.after(()=>fs.rmSync(root,{recursive:true,force:true}));put(root,"publication/issues.json",JSON.stringify({editions:[{path:"weekly/test/index.html",claims_file:"publication/claims/test.json"}]}));put(root,"publication/claims/test.json",JSON.stringify([claim]));put(root,"weekly/test/index.html",html||'<main><p data-claim-id="C1">Synthetic notice</p></main>');return root}
test("a main inside a comment cannot certify unrelated visible content",t=>{
 const root=fixture(t,'<!-- <main><p data-claim-id="C1">Synthetic notice</p></main> --><p>Unreviewed visible claim</p>');assert.equal(validate(root).ok,false);
});

test("inert templates and hidden ancestors cannot stand in for the visible main",t=>{
 for(const html of [
  '<template><main><p data-claim-id="C1">Synthetic notice</p></main></template><p>Visible unchecked text</p>',
  '<div hidden><main><p data-claim-id="C1">Synthetic notice</p></main></div><p>Visible unchecked text</p>'
 ])assert.equal(validate(fixture(t,html)).ok,false);
});
test("entity-encoded whitespace cannot disguise executable URLs",t=>{
 for(const entity of ["Tab","NewLine"]){const root=fixture(t,'<main><p data-claim-id="C1"><a href="java&'+entity+';script:void(0)">Synthetic notice</a></p></main>');assert.equal(validate(root).ok,false,entity)}
});
test("attribute text cannot impersonate a real claim binding",t=>{
 const root=fixture(t,'<main><p title="data-claim-id=\'C1\'">Synthetic notice</p></main>');assert.equal(validate(root).ok,false);
});
test("DOM entity decoding preserves legal claim text and nested markup",t=>{
 const root=fixture(t,'<main><p data-claim-id="C1"><strong>Synthetic</strong> notice</p></main>');assert.equal(validate(root).ok,true);
 put(root,"publication/claims/test.json",JSON.stringify([{...claim,claim_text:"Synthetic © notice"}]));put(root,"weekly/test/index.html",'<main><p data-claim-id="C1">Synthetic &copy; notice</p></main>');assert.equal(validate(root).ok,true);
});
test("undeclared HTML beside an issue and in deeper folders fails closed",t=>{
 for(const extra of ["weekly/test/extra.html","daily/extra.html","weekly/test/nested/index.html"]){const root=fixture(t);put(root,extra,"<p>Unreviewed</p>");assert.equal(validate(root).ok,false,extra)}
});
test("duplicate claim IDs cannot suppress an invalid publication CLI exit",t=>{
 const root=fixture(t),file=path.join(root,"duplicates.json");fs.writeFileSync(file,JSON.stringify([{...claim,decision:"hold"},{...claim,risk_tier:"high",claim_class:"high_impact"}]));
 const result=spawnSync(process.execPath,[path.join(__dirname,"validate-claims.js"),file],{encoding:"utf8"});assert.equal(result.status,1);assert.match(result.stdout,/duplicate claim_id/);
});
test("CLI tolerates invalid records with a clear failing status",t=>{
 const root=fixture(t),file=path.join(root,"invalid.json");fs.writeFileSync(file,JSON.stringify([null]));const result=spawnSync(process.execPath,[path.join(__dirname,"validate-claims.js"),file],{encoding:"utf8"});assert.equal(result.status,1);assert.match(result.stdout,/invalid record/);
});
test("public inventory rejects undeclared resources and symlink directories",t=>{
 const {inventory}=require("./public-site.js"),root=fixture(t);put(root,"assets/private.json",'{"private":true}');assert.equal(inventory(root).ok,false);
 const other=fs.mkdtempSync(path.join(os.tmpdir(),"publication-link-"));t.after(()=>fs.rmSync(other,{recursive:true,force:true}));put(other,"index.html","<p>outside</p>");fs.symlinkSync(other,path.join(root,"monthly"),process.platform==="win32"?"junction":"dir");assert.ok(inventory(root).errors.some(e=>e.includes("symbolic link")));
});
test("public builder copies only accepted inventory and rechecks source validation",t=>{
 const {buildPublic}=require("./public-site.js"),root=fixture(t);put(root,"index.html","<p>Home</p>");put(root,".nojekyll","");put(root,"about/index.html","<p>About</p>");put(root,"archive/index.html","<p>Archive</p>");put(root,"research/private.txt","not public");
 const result=buildPublic(root);assert.ok(result.files.includes("weekly/test/index.html"));assert.ok(fs.existsSync(path.join(root,"_public_site/weekly/test/index.html")));assert.equal(fs.existsSync(path.join(root,"_public_site/research")),false);
 put(root,"weekly/test/extra.html","<p>Unreviewed</p>");assert.throws(()=>buildPublic(root),/Unknown public file/);
});

test("public builder CLI runs in a fresh process and rejects stale output",t=>{
 const root=fixture(t);for(const file of ["index.html",".nojekyll","about/index.html","archive/index.html"])put(root,file,"");
 const run=()=>spawnSync(process.execPath,[path.join(__dirname,"public-site.js"),root,"--build"],{encoding:"utf8"});
 const result=run();assert.equal(result.status,0,result.stderr);assert.equal(result.stderr,"");
 assert.ok(JSON.parse(result.stdout).files.includes("weekly/test/index.html"));
 const repeat=run();assert.equal(repeat.status,1);assert.match(repeat.stderr,/new or empty regular directory/);
});

test("invalid manifest shapes fail with a structured result",t=>{
 const {inventory}=require("./public-site.js"),root=fixture(t);
 for(const value of [null,[],42,"bad",{}, {editions:null}]){
  put(root,"publication/issues.json",JSON.stringify(value));
  const result=validate(root);assert.equal(result.ok,false);assert.ok(result.errors.some(x=>/manifest|editions/.test(x)));
  assert.equal(inventory(root).ok,false);
 }
});

test("backslashes cannot disguise a protocol-relative link",t=>{
 const root=fixture(t,'<main><p data-claim-id="C1"><a href="\\\\example.org/source">Synthetic notice</a></p></main>');
 assert.equal(validate(root).ok,false);
});
