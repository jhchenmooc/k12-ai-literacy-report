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
const claim={evidence_path:"publication/sources/fixture.txt",evidence_sha256:crypto.createHash("sha256").update(excerpt+"\n").digest("hex"),original_excerpt:excerpt,evidence_source_url:"https://example.org/official",interpretation_note:"合成公告僅表明提出非拘束性建議，不包含成效評估。",scope_limitation:"此合成示例不涉及全國法規之效力。",assertion_type:"direct_statement",translation_reviewed:true,claim_id:"C1",kind:"news_policy",claim_class:"descriptive",risk_tier:"medium",ai_crosscheck_status:"concordant",ai_crosscheck_passes:2,ai_crosscheck_record:"two isolated original-source cross-check records",claim_text:"合成案例：某機構公告",source_url:"https://example.org/official",source_locator:"公告第2段",checked_at:"2026-10-16",publication_date:"2026-10-10",source_type:"official",source_checked:true,scope_checked:true,outcome_checked:false,independent_review:false,conflict_unresolved:false,decision:"publish",level:"N-V2"};
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
test("unregistered major heading in main is blocked",t=>{const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));issue(d,[claim]);updateHtml(d,'<html><main><h2>各國已全面強制AI教育</h2><p data-claim-id="C1">合成案例：某機構公告</p></main></html>');assert.equal(validate(d).ok,false)});
test("registered heading with unrelated body claim is blocked",t=>{const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));issue(d,[claim]);updateHtml(d,'<html><main><h1 data-claim-id="C1">其他完全不同的結論</h1></main></html>');assert.equal(validate(d).ok,false)});
test("unregistered list item in main is blocked",t=>{const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));issue(d,[claim]);updateHtml(d,'<html><main><p data-claim-id="C1">合成案例：某機構公告</p><ul><li>全國推廣</li></ul></main></html>');assert.equal(validate(d).ok,false)});

test("missing original excerpt prevents release",t=>{const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));issue(d,[{...claim,original_excerpt:"No such sentence appears in the pinned source"}]);assert.equal(validate(d).ok,false)});
test("altered archived source checksum prevents release",t=>{const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));issue(d,[claim]);fs.writeFileSync(path.join(d,"publication","sources","fixture.txt"),"different body");assert.equal(validate(d).ok,false)});
test("missing interpretation and limitations prevents release",t=>{const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));issue(d,[{...claim,interpretation_note:"",scope_limitation:""}]);assert.equal(validate(d).ok,false)});
test("source and claim URL mismatch prevents release",t=>{const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));issue(d,[{...claim,evidence_source_url:"https://example.org/other"}]);assert.equal(validate(d).ok,false)});
test("unreviewed translation prevents release",t=>{const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));issue(d,[{...claim,translation_reviewed:false}]);assert.equal(validate(d).ok,false)});
test("source excerpt genuinely included and checksummed passes structural validation",t=>{const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));issue(d,[claim]);assert.equal(validate(d).ok,true)});

test("medium-risk claim without two-pass agreement is held",t=>{const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));issue(d,[{...claim,ai_crosscheck_status:"disagreed"}]);assert.equal(validate(d).ok,false)});
test("medium-risk claim cannot omit crosscheck trace",t=>{const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));issue(d,[{...claim,ai_crosscheck_record:""}]);assert.equal(validate(d).ok,false)});
test("high risk remains held despite purported human review fields",t=>{const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));issue(d,[{...claim,risk_tier:"high",claim_class:"high_impact",level:"N-V3",outcome_checked:true,independent_review:true,reviewer_id:"demo-reviewer",reviewer_evidence:"example review record"}]);assert.equal(validate(d).ok,false)});
test("risk classification cannot hide impact behind low tier",t=>{const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));issue(d,[{...claim,risk_tier:"low",claim_class:"high_impact"}]);assert.equal(validate(d).ok,false)});
test("missing risk tier blocks release",t=>{const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));const x={...claim};delete x.risk_tier;issue(d,[x]);assert.equal(validate(d).ok,false)});
test("low-risk bibliographic item can publish without expert labels",t=>{const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));const x={...claim,risk_tier:"low",claim_class:"bibliographic",level:"N-V1",ai_crosscheck_status:"not_required",ai_crosscheck_passes:0};issue(d,[x]);assert.equal(validate(d).ok,true)});

test("missing registered HTML returns validation error, not exception",t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));issue(d,[claim]);
 fs.rmSync(path.join(d,"weekly","2026-10-09_10-15","index.html"));
 const result=validate(d);assert.equal(result.ok,false);
 assert.ok(result.errors.some(e=>e.includes("edition HTML missing")));
});
test("HTML comment pretending to contain a bound claim is rejected",t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));issue(d,[claim]);
 updateHtml(d,'<main><!-- <p data-claim-id="C1">合成案例：某機構公告</p> --><article><div>未驗證內容</div></article></main>');
 assert.equal(validate(d).ok,false);
});
test("unsupported visible content tag cannot bypass claim binding",t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));issue(d,[claim]);
 updateHtml(d,'<main><p data-claim-id="C1">合成案例：某機構公告</p><aside>未經核對的政策公告</aside></main>');
 assert.equal(validate(d).ok,false);
});
test("inline event handlers and hidden attributes are blocked",t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));issue(d,[claim]);
 updateHtml(d,'<main><p data-claim-id="C1" onclick="x()">合成案例：某機構公告</p></main>');
 assert.equal(validate(d).ok,false);
});

test("unbound direct div text is rejected",t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));issue(d,[claim]);
 updateHtml(d,'<main><p data-claim-id="C1">合成案例：某機構公告</p><div>未核准的政策結論</div></main>');
 assert.equal(validate(d).ok,false);
});
test("unbound text inside section outside paragraphs is rejected",t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));issue(d,[claim]);
 updateHtml(d,'<main><section>額外主張<p data-claim-id="C1">合成案例：某機構公告</p></section></main>');
 assert.equal(validate(d).ok,false);
});
test("bound content in wrapper elements remains valid",t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));issue(d,[claim]);
 updateHtml(d,'<main><section><div><p data-claim-id="C1">合成案例：某機構公告</p></div></section></main>');
 assert.equal(validate(d).ok,true);
});
test("invalid calendar dates and malformed source URLs are rejected",t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));issue(d,[{...claim,publication_date:"2026-02-30",checked_at:"2026-13-01",source_url:"https://"}]);
 assert.equal(validate(d).ok,false);
});
test("offline full-issue fixture fails closed when evidence is tampered with",t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));issue(d,[claim]);
 assert.equal(validate(d).ok,true);
 fs.appendFileSync(path.join(d,"publication","sources","fixture.txt"),"tampered");
 assert.equal(validate(d).ok,false);
});

test("unregistered daily HTML is blocked, not silently deployed",t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));
 const folder=path.join(d,"daily","2026-10-10");fs.mkdirSync(folder,{recursive:true});
 fs.writeFileSync(path.join(folder,"index.html"),'<main><p>not registered</p></main>');
 const result=validate(d);assert.equal(result.ok,false);assert.ok(result.errors.some(e=>e.includes("Unregistered issue")&&e.includes("daily/")));
});
test("registered daily HTML without explicit narrow channel is blocked",t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));issue(d,[claim]);
 const pathToWeekly=path.join(d,"weekly","2026-10-09_10-15","index.html"),dailyDir=path.join(d,"daily","2026-10-10");
 fs.mkdirSync(dailyDir,{recursive:true});fs.renameSync(pathToWeekly,path.join(dailyDir,"index.html"));
 const manifestPath=path.join(d,"publication","issues.json"),manifest=JSON.parse(fs.readFileSync(manifestPath,"utf8"));manifest.editions[0].path="daily/2026-10-10/index.html";
 fs.writeFileSync(manifestPath,JSON.stringify(manifest));
 const result=validate(d);assert.equal(result.ok,false);assert.ok(result.errors.some(e=>e.includes("publication mode")));
});

function dailyFixture(d,c){
 const dailyDir=path.join(d,"daily","2026-10-10");fs.mkdirSync(dailyDir,{recursive:true});
 const old=path.join(d,"weekly","2026-10-09_10-15","index.html");
 if(fs.existsSync(old))fs.rmSync(old);
 fs.writeFileSync(path.join(dailyDir,"index.html"),'<html><main><p data-claim-id="C1">'+c.claim_text+'</p></main></html>');
 fs.writeFileSync(path.join(d,"publication","claims","daily-2026-10-10.json"),JSON.stringify([c]));
 fs.writeFileSync(path.join(d,"publication","issues.json"),JSON.stringify({schema_version:1,editions:[{path:"daily/2026-10-10/index.html",claims_file:"publication/claims/daily-2026-10-10.json",publication_mode:"ai_low_risk_source_facts"}]}));
}
const dailyLow={...claim,claim_class:"bibliographic",risk_tier:"low",level:"N-V1",checked_at:"2026-10-10",source_title:"Synthetic school AI announcement",source_organization:"Example Institution",daily_fact_kind:"official_notice",first_disclosed_on:"2026-10-10",claim_text:"來源機構：Example Institution；資料標題：Synthetic school AI announcement；來源刊登日：2026-10-10。"};
test("opt-in daily fixed low-risk source record passes structural validation",t=>{const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));dailyFixture(d,dailyLow);assert.equal(validate(d).ok,true)});
test("daily descriptive or high risk cannot bypass structural gate",t=>{const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));dailyFixture(d,{...dailyLow,claim_class:"descriptive",risk_tier:"medium"});assert.equal(validate(d).ok,false)});
test("daily prose policy analysis cannot be disguised as a bibliographic claim",t=>{const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));dailyFixture(d,{...dailyLow,claim_text:"學校已全面強制導入AI課程"});assert.equal(validate(d).ok,false)});
test("daily issue future source date is blocked",t=>{const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));dailyFixture(d,{...dailyLow,checked_at:"2026-10-12"});assert.equal(validate(d).ok,false)});
test("daily does not allow fabricated wrong first-disclosure date",t=>{const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));dailyFixture(d,{...dailyLow,first_disclosed_on:"2026-10-09"});assert.equal(validate(d).ok,false)});

const summaryText="文件說明面向中學教師的非強制性建議，並未提出實施成效的資料。";
const attributed={...dailyLow,claim_class:"descriptive",risk_tier:"medium",level:"N-V2",daily_fact_kind:"official_attributed_summary",attributed_summary:summaryText,summary_evidence_spans:[excerpt],assertion_type:"direct_statement",claim_text:"來源機構：Example Institution；資料標題：Synthetic school AI announcement；來源刊登日：2026-10-10。官方文件表示："+summaryText+"（AI 輔助摘要，未經真人逐則審稿；請參閱原文。）"};
test("attributed official summary with pinned excerpt and two passes passes structural gate",t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));dailyFixture(d,attributed);assert.equal(validate(d).ok,true);
});
test("research abstracts are explicitly attributed to their authors",t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));
 const c={...attributed,kind:"research",level:"V2",daily_fact_kind:"research_abstract_attributed_summary",claim_text:"來源機構：Example Institution；資料標題：Synthetic school AI announcement；來源刊登日：2026-10-10。作者摘要報告："+summaryText+"（AI 輔助摘要，未經真人逐則審稿；請參閱原文。）"};
 dailyFixture(d,c);assert.equal(validate(d).ok,true);
});
test("freeform claims and unsupported causal policy wording fail closed",t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));dailyFixture(d,{...attributed,attributed_summary:"研究已證實所有學生必然提升能力"});assert.equal(validate(d).ok,false);
});
test("summary without two reviews or pinned source cannot publish",t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));dailyFixture(d,{...attributed,ai_crosscheck_passes:1,evidence_sha256:""});assert.equal(validate(d).ok,false);
});
test("no silent expansion to weekly and monthly publishing policy",t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));issue(d,[{...claim,decision:"hold"}]);assert.equal(validate(d).ok,false);
});

test("daily rejects missing first disclosure",t=>{const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));dailyFixture(d,{...dailyLow,first_disclosed_on:null});assert.equal(validate(d).ok,false)});
test("daily summary rejects missing source-aligned spans",t=>{const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));dailyFixture(d,{...attributed,summary_evidence_spans:[]});assert.equal(validate(d).ok,false)});
test("daily summary rejects raw newline",t=>{const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));dailyFixture(d,{...attributed,attributed_summary:summaryText+"\\nExtra"});assert.equal(validate(d).ok,false)});

test("daily rejects cross-category source misrepresentation",t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));
 dailyFixture(d,{...dailyLow,kind:"research",level:"V1",daily_fact_kind:"official_notice"});
 assert.equal(validate(d).ok,false);
});
test("daily rejects claims path borrowed from unrelated issue",t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));dailyFixture(d,dailyLow);
 const p=path.join(d,"publication","issues.json"),m=JSON.parse(fs.readFileSync(p,"utf8"));
 m.editions[0].claims_file="publication/claims/other.json";
 fs.writeFileSync(path.join(d,"publication","claims","other.json"),JSON.stringify([dailyLow]));
 fs.writeFileSync(p,JSON.stringify(m));
 assert.equal(validate(d).ok,false);
});

test("registered report refuses script injected outside main",t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));issue(d,[claim]);
 updateHtml(d,'<html><head><script>document.cookie</script></head><main><p data-claim-id="C1">合成案例：某機構公告</p></main></html>');
 assert.equal(validate(d).ok,false);
});
test("registered daily source facts refuse inline handlers outside main",t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));dailyFixture(d,dailyLow);
 fs.writeFileSync(path.join(d,"daily","2026-10-10","index.html"),'<html><nav><a onclick="run()">link</a></nav><main><p data-claim-id="C1">'+dailyLow.claim_text+'</p></main></html>');
 assert.equal(validate(d).ok,false);
});
