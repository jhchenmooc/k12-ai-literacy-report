"use strict";
const {test}=require("node:test"),assert=require("node:assert/strict"),fs=require("node:fs"),os=require("node:os"),path=require("node:path");
const {validate}=require("./validate-publication.js");
function setup(){
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),"publication-gate-"));fs.mkdirSync(path.join(dir,"publication","claims"),{recursive:true});fs.mkdirSync(path.join(dir,"weekly","2026-10-09_10-15"),{recursive:true});
 fs.writeFileSync(path.join(dir,"weekly","2026-10-09_10-15","index.html"),"<html></html>");
 fs.writeFileSync(path.join(dir,"publication","issues.json"),JSON.stringify({editions:[]}));
 return dir;
}
const claim={claim_id:"C1",kind:"news_policy",claim_class:"descriptive",claim_text:"合成案例：某機構公告",source_url:"https://example.org/official",source_locator:"公告第2段",checked_at:"2026-10-16",publication_date:"2026-10-10",source_type:"official",source_checked:true,scope_checked:true,outcome_checked:false,independent_review:false,conflict_unresolved:false,decision:"publish",level:"N-V2"};
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
