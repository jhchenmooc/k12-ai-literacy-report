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
const claim={audience:"k12",ai_lit_class:"A",ai_lit_dims:["T-PD"],ai_lit_note:"合成示例：教師 AI 素養建議",evidence_path:"publication/sources/fixture.txt",evidence_sha256:crypto.createHash("sha256").update(excerpt+"\n").digest("hex"),original_excerpt:excerpt,evidence_source_url:"https://example.org/official",interpretation_note:"合成公告僅表明提出非拘束性建議，不包含成效評估。",scope_limitation:"此合成示例不涉及全國法規之效力。",assertion_type:"direct_statement",translation_reviewed:true,claim_id:"C1",kind:"news_policy",claim_class:"descriptive",risk_tier:"medium",ai_crosscheck_status:"concordant",ai_crosscheck_passes:2,ai_crosscheck_record:"two isolated original-source cross-check records",claim_text:"合成案例：某機構公告",source_url:"https://example.org/official",source_locator:"公告第2段",checked_at:"2026-10-16",publication_date:"2026-10-10",source_type:"official",source_checked:true,scope_checked:true,outcome_checked:false,independent_review:false,conflict_unresolved:false,decision:"publish",level:"N-V2"};
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
 fs.writeFileSync(path.join(dailyDir,"index.html"),'<html><main><p data-claim-id="C1"><a href="'+c.source_url+'">'+c.claim_text+'</a></p></main></html>');
 fs.writeFileSync(path.join(d,"publication","claims","daily-2026-10-10.json"),JSON.stringify([c]));
 fs.writeFileSync(path.join(d,"publication","issues.json"),JSON.stringify({schema_version:1,editions:[{path:"daily/2026-10-10/index.html",claims_file:"publication/claims/daily-2026-10-10.json",publication_mode:"ai_low_risk_source_facts"}]}));
}
const dailyLow={...claim,claim_class:"bibliographic",risk_tier:"low",level:"N-V1",checked_at:"2026-10-10",source_title:"Synthetic school AI announcement",source_organization:"Example Institution",daily_fact_kind:"official_notice",source_document_type:"official_guidance",first_disclosed_on:"2026-10-10",claim_text:"來源機構：Example Institution；資料標題：Synthetic school AI announcement；來源刊登日：2026-10-10。"};
const reviewedMain='<main><p data-claim-id="C1">合成案例：某機構公告</p></main>';
test('P3 favicon regression: external and noncanonical icons are rejected',t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));issue(d,[claim]);
 for(const href of ['https://tracker.example/p.png','//tracker.example/p.png','../../assets/other.svg','../../assets/favicon.svg?tracking=1','']){
  updateHtml(d,'<head><link rel="icon" href="'+href+'"></head>'+reviewedMain);assert.equal(validate(d).ok,false,href);
 }
});
test('P3 favicon control: fixed local SVG file is accepted',t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));issue(d,[claim]);
 for(const link of ['<link rel="icon" href="../../assets/favicon.svg">','<link rel="icon" href="../../assets/favicon.svg" type="image/svg+xml">']){
  updateHtml(d,'<head>'+link+'</head>'+reviewedMain);assert.equal(validate(d).ok,true,link);
 }
});
test('P3 metadata regression: unreviewed search and social text is rejected',t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));issue(d,[claim]);
 for(const meta of ['<meta name="description" content="UNVERIFIED: 臺灣全面強制 AI 考試">','<meta property="og:title" content="UNVERIFIED">','<meta name="twitter:description" content="UNVERIFIED">','<meta name="viewport" content="width=device-width,initial-scale=1" property="og:title">','<meta name="viewport" content="width=1,initial-scale=100">','<meta charset="utf-8" name="description" content="UNVERIFIED">']){
  updateHtml(d,'<head><title>週報 2026-10-09_10-15｜K-12 AI 素養國際動態</title>'+meta+'</head>'+reviewedMain);assert.equal(validate(d).ok,false,meta);
 }
});
test('P3 metadata control: fixed viewport and neutral description are accepted',t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));issue(d,[claim]);
 for(const meta of ['<meta name="viewport" content="width=device-width,initial-scale=1">','<meta name="description" content="週報 2026-10-09_10-15｜K-12 AI 素養國際動態">','<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">']){
  updateHtml(d,'<head>'+meta+'</head>'+reviewedMain);assert.equal(validate(d).ok,true,meta);
 }
});
test('P3 regression: unreviewed tooltips on claims and links are rejected',t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));issue(d,[claim]);
 for(const html of [reviewedMain.replace('<p ','<p title="UNVERIFIED: 全面強制" '),reviewedMain.replace('合成案例：某機構公告','<a href="https://example.org/official" title="UNVERIFIED">合成案例：某機構公告</a>')]){
  updateHtml(d,html);assert.equal(validate(d).ok,false);
 }
});
test('P3 regression: arbitrary bare report tab titles are rejected',t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));issue(d,[claim]);
 updateHtml(d,'<head><title>UNVERIFIED: 全面強制</title></head>'+reviewedMain);assert.equal(validate(d).ok,false);
});
test('P3 control: bare report neutral issue title is accepted',t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));issue(d,[claim]);
 updateHtml(d,'<head><title>週報 2026-10-09_10-15｜K-12 AI 素養國際動態</title></head>'+reviewedMain);assert.equal(validate(d).ok,true);
});
test('P3 regression: non-UTF-8 or empty charset declarations are rejected',t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));issue(d,[claim]);
 for(const charset of ['big5','windows-1252','utf-16','']){
  updateHtml(d,'<head><meta charset="'+charset+'"></head>'+reviewedMain);assert.equal(validate(d).ok,false,charset);
 }
 for(const content of ['text/html; charset=big5','text/html; charset="utf-16"']){
  updateHtml(d,'<head><meta http-equiv="Content-Type" content=\''+content+'\'></head>'+reviewedMain);assert.equal(validate(d).ok,false,content);
 }
});
test('P3 control: absent and UTF-8 charset declarations are accepted',t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));issue(d,[claim]);
 for(const meta of ['', '<meta charset="utf-8">','<meta charset="UTF-8">','<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">']){
  updateHtml(d,'<head>'+meta+'</head>'+reviewedMain);assert.equal(validate(d).ok,true,meta);
 }
});
const shellAttacks={
 "outside heading":reviewedMain+'<h1>未審核結論</h1>',
 "outside aside":reviewedMain+'<aside>未審核結論</aside>',
 "outside text":reviewedMain+'未審核結論',
 "hidden class ancestor":'<div class="skip">'+reviewedMain+'</div>',
 "closed dialog":'<dialog>'+reviewedMain+'</dialog>',
 "closed details":'<details>'+reviewedMain+'</details>',
 "inert ancestor":'<div inert>'+reviewedMain+'</div>',
 "aria hidden ancestor":'<div aria-hidden="true">'+reviewedMain+'</div>',
 "hidden html":'<html class="skip">'+reviewedMain+'</html>',
 "hidden body":'<body inert>'+reviewedMain+'</body>',
 "inline stylesheet":'<style>main{display:none}body::after{content:"unreviewed"}</style>'+reviewedMain,
 "external stylesheet":'<link rel="stylesheet" href="https://example.org/hide.css">'+reviewedMain,
 "alternate stylesheet":'<link rel="alternate stylesheet" href="../../assets/other.css">'+reviewedMain,
 "main class":reviewedMain.replace('<main>','<main class="skip">'),
 "hidden claim class":reviewedMain.replace('<p ','<p class="skip" '),
 "claim inert":reviewedMain.replace('<p ','<p inert '),
 "claim aria hidden":reviewedMain.replace('<p ','<p aria-hidden="true" '),
 "claim slot":reviewedMain.replace('<p ','<p slot="hidden" '),
 "svg namespace main":'<svg><main><td data-claim-id="C1">合成案例：某機構公告</td></main></svg>',
 "svg animate":reviewedMain+'<svg><a><animate attributeName="href" values="javascript:void(document.title=\'PWNED\')"/><text>click</text></a></svg>',
 "svg set":reviewedMain+'<svg><a><set attributeName="href" to="javascript:void(document.title=\'PWNED\')"/><text>click</text></a></svg>',
 "math namespace":reviewedMain+'<math><mtext>unreviewed</mtext></math>'
};
for(const [name,html] of Object.entries(shellAttacks))test('external-review regression: '+name,t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));issue(d,[claim]);updateHtml(d,html);
 assert.equal(validate(d).ok,false,name);
});
test('external-review control: exact daily renderer shell is accepted',t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));dailyFixture(d,dailyLow);
 const html=require('./render-site.js').renderDailyEdition({date:'2026-10-10',claims:[dailyLow]});
 const file=path.join(d,'daily','2026-10-10','index.html');fs.writeFileSync(file,html);
 assert.equal(validate(d).ok,true);
 for(const changed of [html.replace('跳至主要內容','未審核結論'),html.replace('2026-10-10 每日短訊</h1>','未審核結論</h1>'),html.replace('<body>','<body class="skip">'),html.replace('</footer>','<p>未審核結論</p></footer>')]){
  fs.writeFileSync(file,changed);assert.equal(validate(d).ok,false);
 }
});
test('renderer control: exact weekly and monthly renderer shells are accepted, any change outside main is not',t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));issue(d,[claim]);
 const {renderWeeklyEdition,renderMonthlyEdition}=require('./render-site.js');
 const html=renderWeeklyEdition({period:'2026-10-09_10-15',claims:[claim]});
 updateHtml(d,html);assert.deepEqual(validate(d).errors,[]);
 for(const changed of [html.replace('跳至主要內容','未審核結論'),html.replace('2026-10-09 至 2026-10-15 週報</h1>','未審核結論</h1>'),html.replace('未經獨立認證','已經獨立認證'),
  html.replace('<body>','<body class="skip">'),html.replace('</footer>','<p>未審核結論</p></footer>'),html.replace('</header>','</header><script>alert(1)</script>'),
  html.replace('<a href="../../daily/">','<a href="../../daily/" onclick="alert(1)">'),html.replace('<a href="../../daily/">','<a href="https://example.org/">'),
  renderWeeklyEdition({period:'2026-10-08_10-14',claims:[claim]}),renderMonthlyEdition({period:'2026-10',claims:[claim]})]){
  updateHtml(d,changed);assert.equal(validate(d).ok,false);
 }
 fs.mkdirSync(path.join(d,'monthly','2026-10'),{recursive:true});fs.writeFileSync(path.join(d,'monthly','2026-10','index.html'),renderMonthlyEdition({period:'2026-10',claims:[claim]}));
 fs.writeFileSync(path.join(d,'publication','issues.json'),JSON.stringify({editions:[{path:'monthly/2026-10/index.html',claims_file:'publication/claims/a.json'}]}));
 fs.rmSync(path.join(d,'weekly'),{recursive:true});assert.deepEqual(validate(d).errors,[]);
});
test('renderer control: a full shell needs a valid weekly or monthly period',t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));
 const {renderWeeklyEdition,periodRange}=require('./render-site.js');
 for(const bad of ['test','2026-10-09_10-25','2026-02-28_02-30','2026-10-15_10-09x'])assert.equal(periodRange('weekly',bad),null,bad);
 for(const bad of ['2026-13','2026-1','2026-10-01'])assert.equal(periodRange('monthly',bad),null,bad);
 assert.deepEqual(periodRange('weekly','2026-12-28_01-03'),{start:'2026-12-28',end:'2027-01-03'});
 assert.throws(()=>renderWeeklyEdition({period:'test',claims:[]}));
 // A valid weekly shell copied under a path whose period is invalid is still refused.
 fs.rmSync(path.join(d,'weekly','2026-10-09_10-15'),{recursive:true});fs.mkdirSync(path.join(d,'weekly','test'),{recursive:true});
 fs.writeFileSync(path.join(d,'weekly','test','index.html'),renderWeeklyEdition({period:'2026-10-09_10-15',claims:[claim]}));
 fs.writeFileSync(path.join(d,'publication','issues.json'),JSON.stringify({editions:[{path:'weekly/test/index.html',claims_file:'publication/claims/a.json'}]}));
 fs.writeFileSync(path.join(d,'publication','claims','a.json'),JSON.stringify([claim]));
 const r=validate(d);assert.equal(r.ok,false);assert.ok(r.errors.some(e=>e.includes('valid period')));
});
test('external-review control: bare reports accept only reviewed local stylesheets',t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));issue(d,[claim]);
 for(const href of ['../../assets/design-system.css','../../assets/site.css?v=0123456789']){
  updateHtml(d,'<head><link rel="stylesheet" href="'+href+'"></head>'+reviewedMain);assert.equal(validate(d).ok,true);
 }
});
test('external-review regression: legacy CSS stays allowed but SVG animation is blocked',t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));
 fs.rmSync(path.join(d,'weekly','2026-10-09_10-15'),{recursive:true});
 const folder=path.join(d,'weekly','2026-09-29_10-08');fs.mkdirSync(folder,{recursive:true});
 const file=path.join(folder,'index.html');
 fs.writeFileSync(file,'<style>p{color:red}</style><p>Historical, uncertified report</p>');assert.equal(validate(d).ok,true);
 fs.appendFileSync(file,'<svg><a><set attributeName="href" to="javascript:void(0)"/><text>click</text></a></svg>');
 const result=validate(d);assert.equal(result.ok,false);assert.ok(result.errors.some(e=>e.includes('foreign namespaces')));
});
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
 const c={...attributed,kind:"research",level:"V2",daily_fact_kind:"research_abstract_attributed_summary",source_document_type:"peer_reviewed_article",claim_text:"來源機構：Example Institution；資料標題：Synthetic school AI announcement；來源刊登日：2026-10-10。作者摘要報告："+summaryText+"（AI 輔助摘要，未經真人逐則審稿；請參閱原文。）"};
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

test("daily bibliography requires actual pinned source checksum",t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));
 dailyFixture(d,{...dailyLow,evidence_sha256:""});
 const out=validate(d);assert.equal(out.ok,false);
 assert.ok(out.errors.some(x=>x.includes("snapshot SHA256")));
});
test("older-than-seven-days bibliographic data cannot masquerade as daily breaking news",t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));
 const c={...dailyLow,publication_date:"2026-09-29",first_disclosed_on:"2026-09-29"};
 c.claim_text="來源機構：Example Institution；資料標題：Synthetic school AI announcement；來源刊登日：2026-09-29。";
 dailyFixture(d,c);
 const out=validate(d);assert.equal(out.ok,false);
 assert.ok(out.errors.some(x=>x.includes("recent 7-day")));
});
test("scriptable https-looking claim anchor is blocked on the full static page",t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));
 issue(d,[claim]);
 updateHtml(d,'<html><main><p data-claim-id="C1"><a href="javascript:alert(1)">合成案例：某機構公告</a></p></main></html>');
 assert.ok(validate(d).errors.some(x=>x.includes("unsafe URL scheme")));
});
test("HTML numeric entity obfuscation of unsafe href is blocked",t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));
 issue(d,[claim]);
 updateHtml(d,'<html><main><p data-claim-id="C1"><a href="&#x6a;avascript:alert(1)">合成案例：某機構公告</a></p></main></html>');
 assert.ok(validate(d).errors.some(x=>x.includes("unsafe URL scheme")));
});
test("safe HTTPS static claim anchor is still permitted",t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));
 issue(d,[claim]);
 updateHtml(d,'<html><main><p data-claim-id="C1"><a href="https://example.org/official">合成案例：某機構公告</a></p></main></html>');
 assert.equal(validate(d).ok,true);
});

test("daily issue cannot omit reader-visible primary source",t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));dailyFixture(d,dailyLow);
 fs.writeFileSync(path.join(d,"daily","2026-10-10","index.html"),'<html><main><p data-claim-id="C1">'+dailyLow.claim_text+'</p></main></html>');
 assert.ok(validate(d).errors.some(x=>x.includes("original source URL")));
});
test("daily issue cannot substitute an unrelated source link",t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));dailyFixture(d,dailyLow);
 const f=path.join(d,"daily","2026-10-10","index.html");
 fs.writeFileSync(f,fs.readFileSync(f,"utf8").replace(dailyLow.source_url,"https://unrelated.example/path"));
 assert.ok(validate(d).errors.some(x=>x.includes("original source URL")));
});
test("legacy files retain noncertified warning but reject malicious script",t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));
 fs.rmSync(path.join(d,"weekly"),{recursive:true,force:true});
 const dir=path.join(d,"monthly","2026-09");fs.mkdirSync(dir,{recursive:true});
 fs.writeFileSync(path.join(dir,"index.html"),'<html><script>alert(1)</script><main></main></html>');
 const v=validate(d);assert.equal(v.ok,false);assert.ok(v.errors.some(x=>x.includes("active or redirect-capable")));
 assert.ok(v.warnings.some(x=>x.includes("Legacy issue not certified")));
});
test("legacy benign static content remains exempt from retrospective claim recertification",t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));
 fs.rmSync(path.join(d,"weekly"),{recursive:true,force:true});
 const dir=path.join(d,"monthly","2026-09");fs.mkdirSync(dir,{recursive:true});
 fs.writeFileSync(path.join(dir,"index.html"),'<html><main><p>Archived report</p></main></html>');
 const v=validate(d);assert.equal(v.ok,true);assert.ok(v.warnings.some(x=>x.includes("Legacy issue not certified")));
});

test("deployed-site historical monthly reports do not link to excluded research directory",()=>{
 const html=fs.readFileSync(path.join(__dirname,"..","monthly","2026-09","index.html"),"utf8");
 assert.doesNotMatch(html,/href=["']\.\.\/\.\.\/research\//);
 assert.match(html,/github\.com\/jhchenmooc\/k12-ai-literacy-report\/blob\/main\/research\/legacy-editions-review/);
});

test("daily policy must identify formal policy, guidance, draft, commentary or event",t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));
 dailyFixture(d,{...dailyLow,source_document_type:undefined});
 assert.ok(validate(d).errors.some(e=>e.includes("document type")));
});
test("daily research cannot be mislabelled as an official guidance document",t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));
 dailyFixture(d,{...dailyLow,kind:"research",daily_fact_kind:"research_bibliography",source_document_type:"official_guidance",level:"V1"});
 assert.ok(validate(d).errors.some(e=>e.includes("document type")));
});

test("daily original source link outside its claim does not count",t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));dailyFixture(d,dailyLow);
 const file=path.join(d,"daily","2026-10-10","index.html");
 fs.writeFileSync(file,'<html><nav><a href="'+dailyLow.source_url+'">Reference</a></nav><main><p data-claim-id="C1">'+dailyLow.claim_text+'</p></main></html>');
 const res=validate(d);assert.equal(res.ok,false);assert.ok(res.errors.some(e=>e.includes("original source URL")));
});

test("a new daily issue cannot override a held matching candidate in the shared weekly pool",t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));dailyFixture(d,dailyLow);
 const dir=path.join(d,"research","drafts");fs.mkdirSync(dir,{recursive:true});
 const sheet={items:[{candidate_id:"W2026-10-09-A07",source_url:dailyLow.source_url,decision:"hold",source_checked:false,first_disclosed_on:null}]};
 fs.writeFileSync(path.join(dir,"2026-10-09_2026-10-15.json"),JSON.stringify(sheet));
 const result=validate(d);
 assert.equal(result.ok,false);
 assert.ok(result.errors.some(e=>e.includes("contradicts held/unverified cumulative candidate")));
});
test("an approved matching candidate permits the unchanged structured daily checks",t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));dailyFixture(d,dailyLow);
 const dir=path.join(d,"research","drafts");fs.mkdirSync(dir,{recursive:true});
 const sheet={items:[{candidate_id:"W2026-10-09-A07",source_url:dailyLow.source_url,decision:"publish",source_checked:true,first_disclosed_on:"2026-10-10"}]};
 fs.writeFileSync(path.join(dir,"2026-10-09_2026-10-15.json"),JSON.stringify(sheet));
 assert.equal(validate(d).ok,true);
});

test("pending corrections in any cumulative worksheet veto daily publication",t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));dailyFixture(d,dailyLow);
 const dir=path.join(d,"research","drafts");fs.mkdirSync(dir,{recursive:true});
 const file=path.join(dir,"2026-10-02_2026-10-08.json"),candidate={candidate_id:"prior",source_url:dailyLow.source_url+"?utm_source=archive",decision:"publish",source_checked:true,first_disclosed_on:"2026-10-10"};
 for(const field of ["source_updates","cross_week_updates","unresolved_duplicate_discoveries"]){
  const row={related_candidate_id:"prior",review_required:true};
  const sheet=field==="source_updates"?{items:[{...candidate,source_updates:[row]}]}:{items:[candidate],[field]:[row]};
  fs.writeFileSync(file,JSON.stringify(sheet));const blocked=validate(d);assert.equal(blocked.ok,false);assert.ok(blocked.errors.some(x=>x.includes("unresolved cumulative source review")));
  row.review_required=false;fs.writeFileSync(file,JSON.stringify(sheet));assert.equal(validate(d).ok,true);
 }
 fs.writeFileSync(file,JSON.stringify({items:[null]}));const malformed=validate(d);assert.equal(malformed.ok,false);assert.ok(malformed.errors.some(x=>x.includes("2026-10-02_2026-10-08.json")));
});

test("source snapshots must be regular repository files and hash raw bytes",t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));issue(d,[claim]);
 const sourceDir=path.join(d,"publication","sources"),file=path.join(sourceDir,"fixture.txt");
 fs.writeFileSync(file,Buffer.concat([Buffer.from(excerpt+"\n"),Buffer.from([0xff])]));
 issue(d,[{...claim,evidence_sha256:crypto.createHash("sha256").update(fs.readFileSync(file,"utf8")).digest("hex")}]);
 assert.equal(validate(d).ok,false);
 issue(d,[claim]);fs.unlinkSync(file);fs.rmdirSync(sourceDir);
 const outside=fs.mkdtempSync(path.join(os.tmpdir(),"source-outside-"));t.after(()=>fs.rmSync(outside,{recursive:true,force:true}));fs.writeFileSync(path.join(outside,"fixture.txt"),excerpt+"\n");
 fs.symlinkSync(outside,sourceDir,process.platform==="win32"?"junction":"dir");
 const result=validate(d);assert.equal(result.ok,false);assert.ok(result.errors.some(x=>x.includes("symbolic link")));
});

test("real A07 source URL remains blocked by existing held candidate despite valid synthetic source structure",t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));
 const w=JSON.parse(fs.readFileSync(path.join(__dirname,"drafts","2026-10-09_2026-10-15.json"),"utf8"));
 const a07=w.items.find(c=>c.candidate_id==="W2026-10-09-A07");
 assert.ok(a07&&a07.decision==="hold");
 const c={...dailyLow,source_url:a07.source_url,evidence_source_url:a07.source_url};
 dailyFixture(d,c);
 const dir=path.join(d,"research","drafts");fs.mkdirSync(dir,{recursive:true});
 fs.writeFileSync(path.join(dir,"2026-10-09_2026-10-15.json"),JSON.stringify(w));
 const result=validate(d);
 assert.equal(result.ok,false);
 assert.ok(result.errors.some(e=>e.includes("contradicts held/unverified cumulative candidate")));
});

test("weekly claim outside AI literacy scope (C, unknown or missing) is blocked",t=>{
 for(const bad of [{ai_lit_class:"C"},{ai_lit_class:"unknown"},{ai_lit_class:undefined}]){
  const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));issue(d,[{...claim,...bad}]);
  const result=validate(d);assert.equal(result.ok,false);assert.ok(result.errors.some(e=>e.includes("AI literacy scope must be A or B")));
 }
});
test("AI literacy scope needs valid framework codes and a reason",t=>{
 for(const bad of [{ai_lit_dims:[]},{ai_lit_dims:["T-XYZ"]},{ai_lit_dims:"T-PD"},{ai_lit_dims:["T-PD","T-PD"]},{ai_lit_note:""},{ai_lit_note:"短"},{ai_lit_note:undefined}]){
  const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));issue(d,[{...claim,...bad}]);
  assert.equal(validate(d).ok,false,JSON.stringify(bad));
 }
});
test("class B with a framework code publishes like class A",t=>{const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));issue(d,[{...claim,ai_lit_class:"B",ai_lit_dims:["S-LRN"]}]);assert.equal(validate(d).ok,true)});
test("daily channel also requires A or B scope",t=>{const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));dailyFixture(d,{...dailyLow,ai_lit_class:"C"});const result=validate(d);assert.equal(result.ok,false);assert.ok(result.errors.some(e=>e.includes("AI literacy scope must be A or B")))});
test("daily claim cannot relabel the scope of its cumulative candidate",t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));dailyFixture(d,dailyLow);
 const dir=path.join(d,"research","drafts");fs.mkdirSync(dir,{recursive:true});
 const sheet={items:[{candidate_id:"W2026-10-09-A07",source_url:dailyLow.source_url,decision:"publish",source_checked:true,first_disclosed_on:"2026-10-10",ai_lit_class:"C"}]};
 fs.writeFileSync(path.join(dir,"2026-10-09_2026-10-15.json"),JSON.stringify(sheet));
 const result=validate(d);assert.equal(result.ok,false);assert.ok(result.errors.some(e=>e.includes("AI literacy scope differs from cumulative candidate")));
});

function monthlyIssue(d,claims){
 const dir=path.join(d,"monthly","2026-10");fs.mkdirSync(dir,{recursive:true});
 fs.renameSync(path.join(d,"weekly","2026-10-09_10-15","index.html"),path.join(dir,"index.html"));
 fs.writeFileSync(path.join(d,"publication","issues.json"),JSON.stringify({editions:[{path:"monthly/2026-10/index.html",claims_file:"publication/claims/m.json"}]}));
 fs.writeFileSync(path.join(d,"publication","claims","m.json"),JSON.stringify(claims));
}
test("weekly edition blocks teacher-education, higher-education, adult, unknown or missing audience",t=>{
 for(const audience of ["teacher_ed","higher_ed","adult","unknown",undefined,"students"]){
  const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));issue(d,[{...claim,audience}]);
  const result=validate(d);assert.equal(result.ok,false,String(audience));assert.ok(result.errors.some(e=>e.includes("audience")),String(audience));
 }
});
test("other education stakeholders may publish in weekly and daily editions",t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));issue(d,[{...claim,audience:"other_stakeholders"}]);assert.equal(validate(d).ok,true);
 const e=setup();t.after(()=>fs.rmSync(e,{recursive:true,force:true}));dailyFixture(e,{...dailyLow,audience:"other_stakeholders"});assert.equal(validate(e).ok,true);
});
test("daily edition blocks teacher-education audience",t=>{const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));dailyFixture(d,{...dailyLow,audience:"teacher_ed"});const result=validate(d);assert.equal(result.ok,false);assert.ok(result.errors.some(e=>e.includes("not allowed in daily")))});
test("monthly edition may carry teacher-education items but never an unknown audience",t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));monthlyIssue(d,[{...claim,audience:"teacher_ed"}]);assert.equal(validate(d).ok,true);
 const e=setup();t.after(()=>fs.rmSync(e,{recursive:true,force:true}));monthlyIssue(e,[{...claim,audience:"unknown"}]);assert.equal(validate(e).ok,false);
});
test("daily claim cannot relabel the audience of its cumulative candidate",t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));dailyFixture(d,dailyLow);
 const dir=path.join(d,"research","drafts");fs.mkdirSync(dir,{recursive:true});
 const sheet={items:[{candidate_id:"W2026-10-09-A07",source_url:dailyLow.source_url,decision:"publish",source_checked:true,first_disclosed_on:"2026-10-10",audience:"teacher_ed"}]};
 fs.writeFileSync(path.join(dir,"2026-10-09_2026-10-15.json"),JSON.stringify(sheet));
 const result=validate(d);assert.equal(result.ok,false);assert.ok(result.errors.some(e=>e.includes("audience differs from cumulative candidate")));
});
