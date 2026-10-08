"use strict";
const {test}=require("node:test"),assert=require("node:assert/strict"),fs=require("node:fs"),os=require("node:os"),path=require("node:path");
const {validate}=require("./validate-publication.js");
const crypto=require("node:crypto");
const excerpt="This fictional agency published a nonbinding advisory for secondary-school educators.";
function setup(){
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),"publication-gate-"));fs.mkdirSync(path.join(dir,"publication","claims"),{recursive:true});fs.mkdirSync(path.join(dir,"publication","sources"),{recursive:true});fs.writeFileSync(path.join(dir,"publication","sources","fixture.txt"),excerpt+"\n");fs.mkdirSync(path.join(dir,"weekly","2026-10-09_10-15"),{recursive:true});
 fs.writeFileSync(path.join(dir,"weekly","2026-10-09_10-15","index.html"),'<html><main><article><p data-claim-id="C1">合成案例：某機構公告</p></article></main></html>');
 fs.writeFileSync(path.join(dir,"publication","issues.json"),JSON.stringify({editions:[]}));
 return dir;
}
const claim={evidence_path:"publication/sources/fixture.txt",evidence_sha256:crypto.createHash("sha256").update(excerpt+"\n").digest("hex"),original_excerpt:excerpt,evidence_source_url:"https://example.org/official",interpretation_note:"合成公告僅表明提出非拘束性建議，不包含成效評估。",scope_limitation:"此合成示例不涉及全國法規之效力。",assertion_type:"direct_statement",translation_reviewed:true,claim_id:"C1",kind:"news_policy",claim_class:"descriptive",claim_text:"合成案例：某機構公告",source_url:"https://example.org/official",source_locator:"公告第2段",checked_at:"2026-10-16",publication_date:"2026-10-10",source_type:"official",source_checked:true,scope_checked:true,outcome_checked:false,independent_review:false,conflict_unresolved:false,decision:"publish",level:"N-V2"};
function issue(d,claims){fs.writeFileSync(path.join(d,"publication","issues.json"),JSON.stringify({editions:[{path:"weekly/2026-10-09_10-15/index.html",claims_file:"publication/claims/a.json"}]}));fs.writeFileSync(path.join(d,"publication","claims","a.json"),JSON.stringify(claims))}
test("unregistered new week fails closed",t=>{const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));assert.equal(validate(d).ok,false)});
test("registered synthetic descriptive claim passes structural checks",t=>{const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));issue(d,[claim]);assert.equal(validate(d).ok,true)});
test("unresolved contradiction is blocked",t=>{const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));issue(d,[{...claim,conflict_unresolved:true}]);assert.equal(validate(d).ok,false)});
test("unsupported high-impact claim blocked",t=>{const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));issue(d,[{...claim,claim_class:"high_impact"}]);assert.equal(validate(d).ok,false)});
test("hold claim cannot be silently published",t=>{const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));issue(d,[{...claim,decision:"hold"}]);assert.equal(validate(d).ok,false)});
test("fake high-impact review fields rejected",t=>{const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));issue(d,[{...claim,level:"N-V3",claim_class:"high_impact",outcome_checked:true,independent_review:true}]);assert.equal(validate(d).ok,false)});
test("duplicate claim id blocked",t=>{const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));issue(d,[claim,claim]);assert.equal(validate(d).ok,false)});
test("new monthly without manifest entry blocked",t=>{const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));issue(d,[claim]);fs.mkdirSync(path.join(d,"monthly","2026-10"),{recursive:true});fs.writeFileSync(path.join(d,"monthly","2026-10","index.html"),"<html/>");assert.equal(validate(d).ok,false)});

test("legacy audit stays non-certified",()=>{const a=JSON.parse(fs.readFileSync(path.join(__dirname,"..","publication","audits","2026-09-29_10-08.json"),"utf8"));assert.equal(a.claims.length,13);assert.equal(a.certified,false);assert.ok(a.claims.every(c=>c.decision==="hold"&&c.independent_review===false&&c.source_checked===false));assert.equal(a.claims.filter(c=>c.source_url).length,11)});

function updateHtml(d,html){fs.writeFileSync(path.join(d,"weekly","2026-10-09_10-15","index.html"),html)}
test("unregistered sentence in report is blocked",t=>{const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));issue(d,[claim]);updateHtml(d,'<html><main><article><p data-claim-id="C1">合成案例：某機構公告</p><p>未經查核的新敘述</p></article></main></html>');assert.equal(validate(d).ok,false)});
test("modified published text without updating evidence is blocked",t=>{const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));issue(d,[claim]);updateHtml(d,'<html><main><p data-claim-id="C1">某機構已全面強制實施</p></main></html>');assert.equal(validate(d).ok,false)});
test("claim present in JSON but absent from HTML is blocked",t=>{const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));issue(d,[claim,{...claim,claim_id:"C2",claim_text:"第二筆未刊出的主張"}]);assert.equal(validate(d).ok,false)});
test("unlisted claim id in HTML is blocked",t=>{const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));issue(d,[claim]);updateHtml(d,'<html><main><p data-claim-id="X999">合成案例：某機構公告</p></main></html>');assert.equal(validate(d).ok,false)});
test("duplicate claim id in HTML is blocked",t=>{const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));issue(d,[claim]);updateHtml(d,'<html><main><p data-claim-id="C1">合成案例：某機構公告</p><p data-claim-id="C1">合成案例：某機構公告</p></main></html>');assert.equal(validate(d).ok,false)});
test("missing main region is blocked",t=>{const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));issue(d,[claim]);updateHtml(d,'<html><body><article><p data-claim-id="C1">合成案例：某機構公告</p></article></body></html>');assert.equal(validate(d).ok,false)});
test("nested text markup preserves claim when normalised",t=>{const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));issue(d,[claim]);updateHtml(d,'<html><main><p data-claim-id="C1"><strong>合成案例：</strong>某機構公告</p></main></html>');assert.equal(validate(d).ok,true)});
test("unregistered list item in main is blocked",t=>{const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));issue(d,[claim]);updateHtml(d,'<html><main><p data-claim-id="C1">合成案例：某機構公告</p><ul><li>全國推廣</li></ul></main></html>');assert.equal(validate(d).ok,false)});

test("missing original excerpt prevents release",t=>{const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));issue(d,[{...claim,original_excerpt:"No such sentence appears in the pinned source"}]);assert.equal(validate(d).ok,false)});
test("altered archived source checksum prevents release",t=>{const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));issue(d,[claim]);fs.writeFileSync(path.join(d,"publication","sources","fixture.txt"),"different body");assert.equal(validate(d).ok,false)});
test("missing interpretation and limitations prevents release",t=>{const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));issue(d,[{...claim,interpretation_note:"",scope_limitation:""}]);assert.equal(validate(d).ok,false)});
test("source and claim URL mismatch prevents release",t=>{const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));issue(d,[{...claim,evidence_source_url:"https://example.org/other"}]);assert.equal(validate(d).ok,false)});
test("unreviewed translation prevents release",t=>{const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));issue(d,[{...claim,translation_reviewed:false}]);assert.equal(validate(d).ok,false)});
test("source excerpt genuinely included and checksummed passes structural validation",t=>{const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));issue(d,[claim]);assert.equal(validate(d).ok,true)});
