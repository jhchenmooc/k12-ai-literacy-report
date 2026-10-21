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
test("new monthly without manifest entry blocked",t=>{const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));issue(d,[claim]);fs.mkdirSync(path.join(d,"monthly","2026-08"),{recursive:true});fs.writeFileSync(path.join(d,"monthly","2026-08","index.html"),"<html/>");assert.equal(validate(d).ok,false)});

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
 assert.deepEqual(validate(d).errors,[]);
 for(const changed of [html.replace('跳至主要內容','未審核結論'),html.replace('2026-10-10 每日短訊</h1>','未審核結論</h1>'),html.replace('<body>','<body class="skip">'),html.replace('</footer>','<p>未審核結論</p></footer>')]){
  fs.writeFileSync(file,changed);assert.equal(validate(d).ok,false);
 }
});
test('daily tag line: rendered line passes; altered, misplaced, repeated or non-daily lines are blocked',t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));dailyFixture(d,dailyLow);
 const html=require('./render-site.js').renderDailyEdition({date:'2026-10-10',claims:[dailyLow]});
 const line='<p data-claim-tags="C1"><span>#中小學</span> <span>#AI素養核心</span> <span>#教師AI專業發展</span></p>';
 assert.ok(html.includes(line));
 const file=path.join(d,'daily','2026-10-10','index.html');fs.writeFileSync(file,html);
 assert.deepEqual(validate(d).errors,[]);
 for(const changed of [
  html.replace(line,'<p data-claim-tags="C1">#中小學 #AI素養核心 #教師AI專業發展 #成效顯著</p>'),
  html.replace(line,'<p data-claim-tags="C1">#中小學 #AI素養核心</p>'),
  html.replace(line,'<p data-claim-tags="C9">#中小學 #AI素養核心 #教師AI專業發展</p>'),
  html.replace(line,'<p data-claim-tags="C1"><strong>#中小學</strong> #AI素養核心 #教師AI專業發展</p>'),
  html.replace(line,'<div data-claim-tags="C1">#中小學 #AI素養核心 #教師AI專業發展</div>'),
  html.replace(line,line+line),
  html.replace('<article>','<article>'+line).replace('</p>'+line,'</p>'),
  html.replace(line,'<p data-claim-tags="C1" data-claim-id="C1">#中小學 #AI素養核心 #教師AI專業發展</p>'),
  html.replace(line,'<p data-claim-tags="C1"><span class="x">#中小學</span> <span>#AI素養核心</span> <span>#教師AI專業發展</span></p>'),
  html.replace(line,'<p data-claim-tags="C1"><span><b>#中小學</b></span> <span>#AI素養核心</span> <span>#教師AI專業發展</span></p>')
 ]){fs.writeFileSync(file,changed);assert.equal(validate(d).ok,false,changed.slice(changed.indexOf('<article>'),changed.indexOf('</article>')))}
 fs.writeFileSync(path.join(d,'publication','claims','daily-2026-10-10.json'),JSON.stringify([{...dailyLow,ai_lit_dims:['T-PD','T-TEA']}]));
 fs.writeFileSync(file,html);assert.equal(validate(d).ok,false);
});
test('daily kind badge: rendered badge passes; altered, misplaced, repeated or non-daily badges are blocked',t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));dailyFixture(d,dailyLow);
 const {renderDailyEdition,dailyKind}=require('./render-site.js'),html=renderDailyEdition({date:'2026-10-10',claims:[dailyLow]});
 const [cls,label]=dailyKind(dailyLow),badge='<p id="C1" data-claim-kind="C1" data-kind="'+cls+'">'+label+'</p>';
 assert.ok(html.includes(badge+'<p data-claim-id="C1">'));
 const file=path.join(d,'daily','2026-10-10','index.html');fs.writeFileSync(file,html);
 assert.deepEqual(validate(d).errors,[]);
 const other=cls==='policy'?'research':'policy';
 for(const changed of [
  html.replace(badge,'<p id="C1" data-claim-kind="C1" data-kind="'+cls+'">本刊推薦</p>'),
  html.replace(badge,'<p id="C1" data-claim-kind="C1" data-kind="'+other+'">'+label+'</p>'),
  html.replace(badge,'<p id="C1" data-claim-kind="C1" data-kind="'+cls+'" class="kind">'+label+'</p>'),
  html.replace(badge,'<p data-claim-kind="C9" data-kind="'+cls+'">'+label+'</p>'),
  html.replace(badge,'<p id="C1" data-claim-kind="C1" data-kind="'+cls+'"><strong>'+label+'</strong></p>'),
  html.replace(badge,badge+badge),
  html.replace(badge,'').replace('</article>',badge+'</article>'),
  html.replace(badge,'<p data-kind="'+cls+'">'+label+'</p>')
 ]){fs.writeFileSync(file,changed);assert.equal(validate(d).ok,false,changed.slice(changed.indexOf('<article>'),changed.indexOf('</article>')))}
});
test('daily 國際／臺灣 sections: rendered page passes; changed headings or moved items are refused',t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));
 const c={...dailyLow,region:'tw'};dailyFixture(d,c);
 const html=require('./render-site.js').renderDailyEdition({date:'2026-10-10',claims:[c]});
 const file=path.join(d,'daily','2026-10-10','index.html');fs.writeFileSync(file,html);
 assert.deepEqual(validate(d).errors,[]);
 assert.ok(html.includes('<h2 data-region="intl">國際</h2><p>本期無合格項目。</p>'));
 for(const changed of [html.replace('>臺灣</h2>','>臺灣觀點</h2>'),html.replace('本期無合格項目。','今日國際無新聞，臺灣領先。'),
  html.replace('data-region="tw"','data-region="cn"'),require('./render-site.js').renderDailyEdition({date:'2026-10-10',claims:[{...c,region:undefined}]})]){
  fs.writeFileSync(file,changed);assert.equal(validate(d).ok,false,changed.slice(changed.indexOf('<article>'),changed.indexOf('</article>')));
 }
});
test('daily Taiwan backfill: marked earlier page passes with later check date; misuse is refused',t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));
 const r=require('./render-site.js'),tw={...dailyLow,claim_id:'C2',region:'tw',checked_at:'2026-10-17'};
 dailyFixture(d,dailyLow);
 const manifest=path.join(d,'publication','issues.json'),claims=path.join(d,'publication','claims','daily-2026-10-10.json'),file=path.join(d,'daily','2026-10-10','index.html');
 const write=(entry,list,html)=>{fs.writeFileSync(manifest,JSON.stringify({schema_version:1,editions:[{path:'daily/2026-10-10/index.html',claims_file:'publication/claims/daily-2026-10-10.json',publication_mode:'ai_low_risk_source_facts',...entry}]}));fs.writeFileSync(claims,JSON.stringify(list));fs.writeFileSync(file,html)};
 const page=(list,b)=>r.renderDailyEdition({date:'2026-10-10',claims:list,tw_backfilled_on:b});
 const html=page([dailyLow,tw],'2026-10-17');
 assert.ok(html.includes('<p>'+r.dailyBackfillText('2026-10-17')+'</p>'));
 write({tw_backfilled_on:'2026-10-17'},[dailyLow,tw],html);assert.deepEqual(validate(d).errors,[]);
 // A backfilled page with no Taiwan items still shows both sections.
 const empty=page([dailyLow],'2026-10-17');assert.ok(empty.includes('<h2 data-region="tw">臺灣</h2><p>今日查教育部'));
 write({tw_backfilled_on:'2026-10-17'},[dailyLow],empty);assert.deepEqual(validate(d).errors,[]);
 for(const [entry,list,h] of [
  [{},[dailyLow,tw],page([dailyLow,tw])],
  [{tw_backfilled_on:'2026-10-17'},[dailyLow,tw],page([dailyLow,tw])],
  [{tw_backfilled_on:'2026-10-17'},[dailyLow,tw],html.replace(r.dailyBackfillText('2026-10-17'),'本頁已完整查核臺灣來源。')],
  [{tw_backfilled_on:'2026-10-16'},[dailyLow,tw],page([dailyLow,tw],'2026-10-16')],
  [{tw_backfilled_on:'2026-10-17'},[{...dailyLow,checked_at:'2026-10-17'},tw],page([{...dailyLow,checked_at:'2026-10-17'},tw],'2026-10-17')],
  [{tw_backfilled_on:'2026-10-09'},[dailyLow],page([dailyLow],'2026-10-09')],
  [{tw_backfilled_on:'2026-10-32'},[dailyLow],page([dailyLow],'2026-10-32')],
  [{tw_backfilled_on:true},[dailyLow],page([dailyLow],true)]
 ]){write(entry,list,h);assert.equal(validate(d).ok,false,JSON.stringify(entry))}
});
test('daily Taiwan backfill marker is refused on weekly pages and on pages from the sectioned start date',()=>{
 const r=require('./render-site.js');assert.equal(r.DAILY_REGION_FROM,'2026-10-18');
 const d=setup();try{issue(d,[claim]);const m=path.join(d,'publication','issues.json'),j=JSON.parse(fs.readFileSync(m,'utf8'));j.editions[0].tw_backfilled_on='2026-10-17';fs.writeFileSync(m,JSON.stringify(j));
  assert.ok(validate(d).errors.some(e=>e.includes('tw_backfilled_on')))}finally{fs.rmSync(d,{recursive:true,force:true})}
});
test('daily kind badge is not accepted outside daily editions',t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));issue(d,[claim]);
 const html=require('./render-site.js').renderWeeklyEdition({period:'2026-10-09_10-15',claims:[claim]});
 updateHtml(d,html.replace('<p data-claim-id="C1">','<p data-claim-kind="C1" data-kind="policy">短訊</p><p data-claim-id="C1">'));
 const result=validate(d);assert.equal(result.ok,false);assert.ok(result.errors.some(e=>e.includes('only in daily')),result.errors.join('\n'));
});
test('daily tag line is not accepted outside daily editions',t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));issue(d,[claim]);
 const html=require('./render-site.js').renderWeeklyEdition({period:'2026-10-09_10-15',claims:[claim]});
 updateHtml(d,html);assert.deepEqual(validate(d).errors,[]);
 updateHtml(d,html.replace(/(<p data-claim-id="C1">[\s\S]*?<\/p>)/,'$1<p data-claim-tags="C1">#中小學 #AI素養核心 #教師AI專業發展</p>'));
 const result=validate(d);assert.equal(result.ok,false);assert.ok(result.errors.some(e=>e.includes('only in daily')),result.errors.join('\n'));
});
test('renderer control: exact weekly and monthly renderer shells are accepted, any change outside main is not',t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));issue(d,[claim]);
 const {renderWeeklyEdition,renderMonthlyEdition}=require('./render-site.js');
 const html=renderWeeklyEdition({period:'2026-10-09_10-15',claims:[claim]});
 updateHtml(d,html);assert.deepEqual(validate(d).errors,[]);
 for(const changed of [html.replace('跳至主要內容','未審核結論'),html.replace('2026/10/09—10/15 週報</h1>','未審核結論</h1>'),html.replace('未經真人逐則審稿','已經專家審稿'),
  html.replace('<body>','<body class="skip">'),html.replace('</footer>','<p>未審核結論</p></footer>'),html.replace('</header>','</header><script>alert(1)</script>'),
  html.replace('<a href="../../daily/">','<a href="../../daily/" onclick="alert(1)">'),html.replace('<a href="../../daily/">','<a href="https://example.org/">'),
  renderWeeklyEdition({period:'2026-10-08_10-14',claims:[claim]}),renderMonthlyEdition({period:'2026-08',claims:[{...claim,section:'policy'}]})]){
  updateHtml(d,changed);assert.equal(validate(d).ok,false);
 }
});
// Monthly: fixed section text is renderer code; the whole page must equal the render of its claims.
const scholarA={...claim,claim_id:'M2',section:'scholars',research_group:'G-A',claim_text:'合成案例：甲研究群論文'};
const scholarB={...claim,claim_id:'M3',section:'trends',research_group:'G-B',claim_text:'合成案例：乙研究群預印本'};
const trend={...claim,claim_id:'M4',section:'trends',assertion_type:'editorial_analysis',supporting_claim_ids:['M2','M3'],claim_text:'合成案例：兩個研究群都提到表現提升不等於學習'};
const monthlyClaims=[{...claim,section:'policy'},scholarA,scholarB,trend];
function monthlyFull(d,claims,html){
 const {renderMonthlyEdition}=require('./render-site.js');
 fs.rmSync(path.join(d,'weekly'),{recursive:true,force:true});fs.mkdirSync(path.join(d,'monthly','2026-08'),{recursive:true});
 // Claims the renderer refuses still get a page, so the gate (not the fixture) does the refusing.
 let page=html;if(page===undefined)try{page=renderMonthlyEdition({period:'2026-08',claims})}catch{page=renderMonthlyEdition({period:'2026-08',claims:claims.map(c=>({...c,section:'policy'}))})}
 fs.writeFileSync(path.join(d,'monthly','2026-08','index.html'),page);
 fs.writeFileSync(path.join(d,'publication','issues.json'),JSON.stringify({editions:[{path:'monthly/2026-08/index.html',claims_file:'publication/claims/m.json'}]}));
 fs.writeFileSync(path.join(d,'publication','claims','m.json'),JSON.stringify(claims));
 return validate(d);
}
test('monthly control: renderer page with fixed sections and a supported trend is accepted',t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));
 assert.deepEqual(monthlyFull(d,monthlyClaims).errors,[]);
 const html=fs.readFileSync(path.join(d,'monthly','2026-08','index.html'),'utf8');
 for(const text of ['政策動態','本刊分析','依據來源','本期無合格項目。'])assert.ok(html.includes(text),text);
});
test('monthly attack: any change to the rendered page, inside or outside main, is refused',t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));
 const {renderMonthlyEdition}=require('./render-site.js');
 const html=renderMonthlyEdition({period:'2026-08',claims:monthlyClaims});
 for(const changed of [html.replace('<h2>政策動態</h2>','<h2>本刊強烈建議</h2>'),html.replace('<h2>研究動態</h2>','<h2>研究動態</h2><p>未審核結論</p>'),
  html.replace('<h2>研究動態</h2>','<h2>研究動態</h2><p>政策動態</p>'),html.replace('未經真人審閱','已經真人審閱'),html.replace('</footer>','<p>未審核結論</p></footer>'),
  renderMonthlyEdition({period:'2026-08',claims:monthlyClaims.map(c=>c.claim_id==='C1'?{...c,section:'research'}:c)}),
  renderMonthlyEdition({period:'2026-09',claims:monthlyClaims})]){
  assert.equal(monthlyFull(d,monthlyClaims,changed).ok,false);
 }
});
test('monthly attack: fixed section text is allowed only on the full renderer page, never in a bare page',t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));
 const r=monthlyFull(d,[{...claim,section:'policy'}],'<html><main><h2>政策動態</h2><p data-claim-id="C1">合成案例：某機構公告</p></main></html>');
 assert.equal(r.ok,false);assert.ok(r.errors.some(e=>e.includes('unbound content')));
});
test('monthly structure: sections, research groups and trend support are enforced',t=>{
 const cases={
  'missing section':[[{...claim}],'section must be one of'],
  'unknown section':[[{...claim,section:'opinion'}],'section must be one of'],
  'scholar without group':[[{...claim,section:'policy'},{...scholarA,research_group:''},scholarB,trend],'needs research_group'],
  'one supporting claim':[[{...claim,section:'policy'},scholarA,scholarB,{...trend,supporting_claim_ids:['M2']}],'two distinct supporting'],
  'repeated supporting claim':[[{...claim,section:'policy'},scholarA,scholarB,{...trend,supporting_claim_ids:['M2','M2']}],'two distinct supporting'],
  'same research group':[[{...claim,section:'policy'},scholarA,{...scholarB,research_group:'G-A'},trend],'two different research groups'],
  'missing supporting claim':[[{...claim,section:'policy'},scholarA,scholarB,{...trend,supporting_claim_ids:['M2','M9']}],'other non-analysis claims'],
  'supporting claim without group':[[{...claim,section:'policy'},scholarA,scholarB,{...trend,supporting_claim_ids:['M2','C1']}],'every supporting claim needs research_group'],
  'analysis outside trends':[[{...claim,section:'policy'},scholarA,scholarB,{...trend,section:'research'}],'only in the trends section'],
  'analysis citing analysis':[[{...claim,section:'policy'},scholarA,scholarB,trend,{...trend,claim_id:'M5',claim_text:'合成案例：第二項趨勢',supporting_claim_ids:['M2','M4']}],'other non-analysis claims'],
  'support ids on a plain claim':[[{...claim,section:'policy',supporting_claim_ids:['M2','M3']},scholarA,scholarB,trend],'only apply to editorial analysis']
 };
 for(const [name,[claims,reason]] of Object.entries(cases)){
  const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));
  const r=monthlyFull(d,claims);assert.equal(r.ok,false,name);assert.ok(r.errors.some(e=>e.includes(reason)),name+': '+r.errors.join(' | '));
 }
});
// Sectioned weekly (manager decision 2026-10-17): featured items re-checked against full text, then other daily items.
const featured={...claim,claim_id:'W1',weekly_section:'featured',full_text_checked:true,first_disclosed_on:'2026-10-10',source_document_type:'official_guidance',claim_text:'合成案例：精選深入版。內容：合成內容。'};
const brief={...claim,claim_id:'W2',weekly_section:'briefs',weekly_source_claim:'D20261012-01',first_disclosed_on:'2026-10-10',source_document_type:'official_guidance',source_url:'https://example.org/daily-1',evidence_source_url:'https://example.org/daily-1',claim_text:'合成案例：其他短訊'};
// Registered daily items the weekly fixtures repeat: D20261012-01 (international) and D20261012-02 (Taiwan).
function registerDailyForWeekly(d){
 const {renderDailyEdition}=require('./render-site.js');
 const items=[{...dailyLow,claim_id:'D20261012-01',source_url:'https://example.org/daily-1',evidence_source_url:'https://example.org/daily-1'},{...dailyLow,claim_id:'D20261012-02',region:'tw',source_url:'https://example.org/daily-2',evidence_source_url:'https://example.org/daily-2'}];
 fs.mkdirSync(path.join(d,'daily','2026-10-12'),{recursive:true});
 fs.writeFileSync(path.join(d,'daily','2026-10-12','index.html'),renderDailyEdition({date:'2026-10-12',claims:items}));
 fs.writeFileSync(path.join(d,'publication','claims','daily-2026-10-12.json'),JSON.stringify(items));
 return {path:'daily/2026-10-12/index.html',claims_file:'publication/claims/daily-2026-10-12.json',publication_mode:'ai_low_risk_source_facts'};
}
/* Daily pages list where their items went (weekly and monthly numbers), so re-render them once all issues are registered. */
function rerenderDailies(d){
 const r=require('./render-site.js'),m=JSON.parse(fs.readFileSync(path.join(d,'publication','issues.json'),'utf8'));
 const loaded=m.editions.map(e=>({...e,claims:JSON.parse(fs.readFileSync(path.join(d,e.claims_file),'utf8'))}));
 const links=r.dailyBacklinks(loaded);
 for(const e of loaded.filter(x=>x.path.startsWith('daily/')))fs.writeFileSync(path.join(d,e.path),r.renderDailyEdition({date:e.path.slice(6,16),claims:e.claims,tw_backfilled_on:e.tw_backfilled_on,revised_on:e.revised_on,links}));
}
function weeklyFull(d,claims,html,extra={}){
 const {renderWeeklyEdition,weeklyNav}=require('./render-site.js'),nav=weeklyNav('2026-10-09_10-15',['2026-10-09_10-15']);
 const dailyEdition=registerDailyForWeekly(d);
 // A weekly line item repeats its daily claim's text (gate rule); fixtures copy it here.
 const dailyById=Object.fromEntries(JSON.parse(fs.readFileSync(path.join(d,'publication','claims','daily-2026-10-12.json'),'utf8')).map(c=>[c.claim_id,c]));
 const copy=dc=>({claim_text:dc.claim_text});
 claims=claims.map(c=>c&&['briefs','late','taiwan'].includes(c.weekly_section)&&dailyById[c.weekly_source_claim]&&!c.keepText?{...c,...copy(dailyById[c.weekly_source_claim])}:c);
 let page=html;if(page===undefined)try{page=renderWeeklyEdition({period:'2026-10-09_10-15',claims,revised_on:extra.revised_on,taiwan_not_searched:extra.taiwan_not_searched,nav})}catch{page=renderWeeklyEdition({period:'2026-10-09_10-15',claims:claims.map(c=>({...c,weekly_section:'briefs'})),nav})}
 updateHtml(d,page);
 fs.writeFileSync(path.join(d,'publication','issues.json'),JSON.stringify({editions:[dailyEdition,{path:'weekly/2026-10-09_10-15/index.html',claims_file:'publication/claims/a.json',...extra}]}));
 fs.writeFileSync(path.join(d,'publication','claims','a.json'),JSON.stringify(claims));
 rerenderDailies(d);
 return validate(d);
}
test('weekly control: sectioned renderer page with a revision note is accepted',t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));
 assert.deepEqual(weeklyFull(d,[featured,brief],undefined,{revised_on:'2026-10-17'}).errors,[]);
 const html=fs.readFileSync(path.join(d,'weekly','2026-10-09_10-15','index.html'),'utf8');
 for(const text of ['本週精選','本週其他短訊','本期於 2026-10-17 改版'])assert.ok(html.includes(text),text);
 assert.deepEqual(weeklyFull(d,[brief]).errors,[]);
 assert.ok(fs.readFileSync(path.join(d,'weekly','2026-10-09_10-15','index.html'),'utf8').includes('本期無合格項目。'));
});
test('weekly attack: any change to a sectioned page, or section text on a flat page, is refused',t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));
 const {renderWeeklyEdition,weeklyNav}=require('./render-site.js'),nav=weeklyNav('2026-10-09_10-15',['2026-10-09_10-15']),html=renderWeeklyEdition({period:'2026-10-09_10-15',claims:[featured,brief],revised_on:'2026-10-17',nav});
 for(const changed of [html.replace('<h2>本週精選</h2>','<h2>本刊強烈推薦</h2>'),html.replace('<h2>本週其他短訊</h2>','<h2>本週其他短訊</h2><p>未審核結論</p>'),
  html.replace('更正與改版紀錄</a>','改版紀錄已刪除</a>'),renderWeeklyEdition({period:'2026-10-09_10-15',claims:[featured,brief]}),
  renderWeeklyEdition({period:'2026-10-09_10-15',claims:[{...featured,weekly_section:'briefs'},brief],revised_on:'2026-10-17'})]){
  assert.equal(weeklyFull(d,[featured,brief],changed,{revised_on:'2026-10-17'}).ok,false);
 }
 const flat=weeklyFull(d,[claim],'<html><main><h2>本週精選</h2><p data-claim-id="C1">合成案例：某機構公告</p></main></html>');
 assert.equal(flat.ok,false);assert.ok(flat.errors.some(e=>e.includes('unbound content')));
});
test('weekly table: kind badge, date and tag cells come only from the renderer',t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));
 const {renderWeeklyEdition,weeklyNav}=require('./render-site.js'),html=renderWeeklyEdition({period:'2026-10-09_10-15',claims:[featured,brief],nav:weeklyNav('2026-10-09_10-15',['2026-10-09_10-15'])});
 assert.ok(html.includes('<td data-col="kind" data-kind="policy"><span>政策</span><br>官方指引</td><td data-col="date">2026-10-10</td>'),html.slice(html.indexOf('<table>'),html.indexOf('</table>')));
 assert.deepEqual(weeklyFull(d,[featured,brief],html).errors,[]);
 for(const changed of [html.replace('<span>政策</span>','<span>本刊推薦</span>'),html.replace('data-kind="policy"','data-kind="alert"'),
  html.replace('<td data-col="date">2026-10-10</td>','<td data-col="date">2026-10-17</td>'),html.replace('<th scope="col">內容</th>','<th scope="col">結論</th>'),
  html.replace('<td data-col="num">1</td>','<td data-col="num">未審核結論</td>')]){
  assert.equal(weeklyFull(d,[featured,brief],changed).ok,false);
 }
 const bare=weeklyFull(d,[claim],'<html><main><table><tr><td>2026-10-10</td><td data-claim-id="C1">合成案例：某機構公告</td></tr></table></main></html>');
 assert.equal(bare.ok,false);assert.ok(bare.errors.some(e=>e.includes('unbound content')));
});
// Overview (editorial analysis citing item numbers), background before the period, Chinese title, facets, nav.
const overview={...claim,claim_id:'O1',weekly_section:'overview',first_disclosed_on:'2026-10-17',assertion_type:'editorial_analysis',supporting_claim_ids:['W1','W2'],claim_text:'合成案例：本期兩則都以教師為對象'};
const background={...claim,claim_id:'B1',weekly_section:'background',first_disclosed_on:'2026-09-01',source_document_type:'official_guidance',related_claim_ids:['W2'],claim_text:'合成案例：先前的框架'};
test('weekly additions: overview, background, Chinese title, facets and nav render and pass',t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));
 const f2={...featured,title_zh:'合成中文譯名',claim_text:'合成案例：精選深入版。樣本：三年級 20 人。限制：單一學校。內容：合成內容。'};
 const claims=[overview,f2,brief,background];
 const r=weeklyFull(d,claims);assert.deepEqual(r.errors,[]);
 const html=fs.readFileSync(path.join(d,'weekly','2026-10-09_10-15','index.html'),'utf8');
 for(const text of ['本週導讀','<p>依據：第 <a href="#item-1">1</a>、<a href="#item-2">2</a> 則</p>','背景補充','相關：第 <a href="#item-2">2</a> 則','<span>背景</span>','中文譯名：合成中文譯名','。<br><strong>樣本：</strong>三年級','本期 2 則（精選 1、其他短訊 1）'])assert.ok(html.includes(text),text);
 assert.ok(html.indexOf('本週導讀')<html.indexOf('本週精選')&&html.indexOf('本週其他短訊')<html.indexOf('背景補充'));
 for(const changed of [html.replace('、<a href="#item-2">2</a>',''),html.replace('相關：第 <a href="#item-2">2</a> 則','相關：第 1 則'),html.replace('中文譯名：合成中文譯名','中文譯名：未審核譯名'),html.replace('<span>背景</span>','<span>政策</span>')])
  assert.equal(weeklyFull(d,claims,changed).ok,false);
 const {renderWeeklyEdition,weeklyNav}=require('./render-site.js');
 assert.deepEqual(weeklyNav('2026-10-09_10-15',['2026-10-09_10-15','2026-10-16_10-22']),{prev:'2026-09-29_10-08',next:'2026-10-16_10-22'});
 assert.ok(renderWeeklyEdition({period:'2026-10-09_10-15',claims,nav:{prev:'2026-09-29_10-08',next:null}}).includes('<p>上一期：<a href="../2026-09-29_10-08/">2026/09/29—10/08</a></p>'));
});
test('weekly speech brief: no daily claim needed, shown as 官方發言 and 演講',t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));
 const speech={...brief,claim_id:'S1',weekly_source_claim:undefined,source_document_type:'speech',source_url:'https://example.org/speech',evidence_source_url:'https://example.org/speech',claim_text:'合成案例：官方演講（演講，非政策）'};
 assert.deepEqual(weeklyFull(d,[featured,brief,speech]).errors,[]);
 assert.ok(fs.readFileSync(path.join(d,'weekly','2026-10-09_10-15','index.html'),'utf8').includes('<span>官方發言</span><br>演講'));
});
// Taiwan area (manager decision 2026-10-17): Taiwan items, comparison rows and a note citing both sides.
const twItem={...brief,claim_id:'T1',region:'tw',weekly_section:'taiwan',weekly_source_claim:'D20261012-02',source_url:'https://example.org/daily-2',evidence_source_url:'https://example.org/daily-2',claim_text:'合成案例：臺灣中央機關公告'};
const twCompare={...background,claim_id:'C1',region:'tw',weekly_section:'tw_compare',related_claim_ids:['W1'],source_url:'https://example.org/twdoc',evidence_source_url:'https://example.org/twdoc',claim_text:'合成案例：臺灣對照文件'};
const twNote={...overview,claim_id:'N1',region:'tw',weekly_section:'tw_note',supporting_claim_ids:['W1','C1'],claim_text:'合成案例：本期國際一則談教師培訓；臺灣文件列有教師面向'};
test('weekly Taiwan area: renders after the international sections and passes',t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));
 const claims=[featured,{...brief,taiwan_sample:true},twItem,twCompare,twNote];
 assert.deepEqual(weeklyFull(d,claims).errors,[]);
 const html=fs.readFileSync(path.join(d,'weekly','2026-10-09_10-15','index.html'),'utf8');
 for(const text of ['<hr><section id="sec-tw" data-region="tw"><h2>臺灣</h2>','<h3>對照說明</h3>','<h3>臺灣本週動態</h3>','<h3>臺灣對照</h3>','依據：國際第 <a href="#item-1">1</a> 則；臺灣：<a href="#item-c1">對照 1</a>','對照：第 <a href="#item-1">1</a> 則','<li id="item-t1">臺灣 1｜','<h3>以臺灣為樣本的國際研究</h3>','<li><a href="#item-2">第 2 則</a>｜','臺灣本週動態 1 則、臺灣對照 1 列'])assert.ok(html.includes(text),text);
 assert.ok(html.indexOf('本週其他短訊')<html.indexOf('<hr>'));
 const r=weeklyFull(d,[featured,brief,twCompare],undefined,{taiwan_not_searched:true});assert.deepEqual(r.errors,[]);
 assert.ok(fs.readFileSync(path.join(d,'weekly','2026-10-09_10-15','index.html'),'utf8').includes('本期尚未納入臺灣來源查核'));
});
test('weekly Taiwan area: region, citation and wording rules are enforced',t=>{
 const cases={
  'Taiwan item in international section':[[{...featured,region:'tw'},brief],'region tw belongs exactly'],
  'international item in Taiwan section':[[featured,brief,{...twItem,region:undefined}],'region tw belongs exactly'],
  'Taiwan item outside period':[[featured,brief,{...twItem,first_disclosed_on:'2026-10-20'}],'within the period'],
  'Taiwan item without daily claim':[[featured,brief,{...twItem,weekly_source_claim:undefined}],'daily source claim'],
  'comparison inside period':[[featured,brief,{...twCompare,first_disclosed_on:'2026-10-14'}],'before the period'],
  'Taiwan item pointing at international daily':[[featured,brief,{...twItem,weekly_source_claim:'D20261012-01'}],'daily region differ'],
  'brief pointing at unknown daily':[[featured,{...brief,weekly_source_claim:'D20991231-99'}],'not a registered daily claim'],
  'note advice pattern':[[featured,brief,twCompare,{...twNote,claim_text:'合成案例：教育部應參考英格蘭做法'}],'evaluation, outcome or advice'],
  'note comparison word':[[featured,brief,twCompare,{...twNote,claim_text:'合成案例：臺灣框架較為薄弱'}],'evaluation, outcome or advice'],
  'note variant character':[[featured,brief,twCompare,{...twNote,claim_text:'合成案例：臺灣値得一看'}],'evaluation, outcome or advice'],
  'not searched with Taiwan items':[[featured,brief,twItem],'taiwan_not_searched contradicts',{taiwan_not_searched:true}],
  'comparison to Taiwan item':[[featured,brief,twItem,{...twCompare,related_claim_ids:['T1']}],'international featured or brief'],
  'note without Taiwan side':[[featured,brief,twCompare,{...twNote,supporting_claim_ids:['W1','W2']}],'one Taiwan item'],
  'note without international side':[[featured,brief,twItem,twCompare,{...twNote,supporting_claim_ids:['T1','C1']}],'one international item'],
  'note evaluation word':[[featured,brief,twCompare,{...twNote,claim_text:'合成案例：臺灣落後國際'}],'evaluation, outcome or advice'],
  'note advice word':[[featured,brief,twCompare,{...twNote,claim_text:'合成案例：臺灣值得借鏡'}],'evaluation, outcome or advice'],
  'too many notes':[[featured,brief,twCompare,twNote,{...twNote,claim_id:'N2'},{...twNote,claim_id:'N3'}],'note sentences exceed 2'],
  'taiwan_sample on Taiwan item':[[featured,brief,{...twItem,taiwan_sample:true}],'taiwan_sample marks'],
  'bad region value':[[{...featured,region:'cn'},brief],'region must be intl or tw'],
 };
 for(const [name,[claims,reason,extra]] of Object.entries(cases)){
  const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));
  const r=weeklyFull(d,claims,undefined,extra||{});assert.equal(r.ok,false,name);assert.ok(r.errors.some(e=>e.includes(reason)),name+': '+r.errors.join(' | '));
 }
});
test('Taiwan items cannot dodge the sectioned layout: flat weekly with a Taiwan claim and bare sectioned daily are refused',t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));
 issue(d,[{...claim,region:'tw'}]);updateHtml(d,'<html><main><p data-claim-id="C1">合成案例：某機構公告</p></main></html>');
 const r=validate(d);assert.equal(r.ok,false);assert.ok(r.errors.some(e=>e.includes('Taiwan area required')),r.errors.join(' | '));
 const d2=setup();t.after(()=>fs.rmSync(d2,{recursive:true,force:true}));
 const c={...dailyLow,region:'tw'};dailyFixture(d2,c);
 const r2=validate(d2);assert.equal(r2.ok,false);assert.ok(r2.errors.some(e=>e.includes('sectioned daily page must be the full renderer page')),r2.errors.join(' | '));
});
test('weekly additions: overview, background and period rules are enforced',t=>{
 const cases={
  'overview with one support':[[{...overview,supporting_claim_ids:['W1']},featured,brief],'at least two distinct'],
  'overview citing itself or background':[[{...overview,supporting_claim_ids:['W1','B1']},featured,brief,background],'at least two distinct'],
  'overview from one source':[[overview,featured,{...brief,source_url:featured.source_url,evidence_source_url:featured.source_url}],'two different sources'],
  'overview banned word':[[{...overview,claim_text:'合成案例：本期研究證明成效'},featured,brief],'reserved for outcome'],
  'overview too long':[[{...overview,claim_text:'合'.repeat(151)},featured,brief],'at most 150'],
  'overview not analysis':[[{...overview,assertion_type:'direct_statement'},featured,brief],'descriptive editorial analysis'],
  'analysis outside overview':[[{...featured,assertion_type:'editorial_analysis'},brief],'belongs only in the overview'],
  'too many overview':[[overview,{...overview,claim_id:'O2'},{...overview,claim_id:'O3'},{...overview,claim_id:'O4'},featured,brief],'overview sentences exceed 3'],
  'background inside period':[[featured,brief,{...background,first_disclosed_on:'2026-10-12'}],'before the period'],
  'background unrelated':[[featured,brief,{...background,related_claim_ids:['X9']}],'relate to distinct'],
  'related ids on brief':[[featured,{...brief,related_claim_ids:['W1']}],'only apply to background'],
  'brief outside period':[[featured,{...brief,first_disclosed_on:'2026-10-20'}],'within the period'],
  'empty Chinese title':[[{...featured,title_zh:' '},brief],'title_zh'],
  'Chinese title speaking for the newsletter':[[{...featured,source_title:'A study',title_zh:'本刊建議全面採用'},brief],'editorial or advice words'],
  'Chinese title as high-risk assertion':[[{...featured,source_title:'A study',title_zh:'研究證明成效顯著提升'},brief],'high-risk assertion'],
  'Chinese title for a Chinese source':[[{...featured,source_title:'中文標題',title_zh:'中文標題'},brief],'non-Chinese source title'],
  'free text in date':[[{...featured,first_disclosed_on:'2026-10-14 本刊強烈推薦'},brief],'real YYYY-MM-DD'],
  'background free text in date':[[featured,brief,{...background,first_disclosed_on:'2025-07-07（應立即仿效）'}],'real YYYY-MM-DD'],
  'invisible characters':[[{...overview,claim_text:'合成案例：本期證\u200b明'},featured,brief],'invisible format characters'],
  'speech outside briefs':[[{...featured,source_document_type:'speech'},brief],'a speech is a news_policy brief'],
  'research kind with policy type':[[{...featured,kind:'research',level:'V2',source_document_type:'binding_policy'},brief],'invalid research document type'],
 };
 for(const [name,[claims,reason]] of Object.entries(cases)){
  const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));
  const r=weeklyFull(d,claims);assert.equal(r.ok,false,name);assert.ok(r.errors.some(e=>e.includes(reason)),name+': '+r.errors.join(' | '));
 }
});
test('weekly structure: sections, full-text check, daily source and featured cap are enforced',t=>{
 const many=Array.from({length:6},(_,i)=>({...featured,claim_id:'F'+i,claim_text:'合成案例：精選 '+i}));
 const cases={
  'unknown section':[[{...featured,weekly_section:'opinion'},brief],'section must be one of'],
  'mixed with flat claim':[[featured,{...claim}],'section must be one of'],
  'featured without full text':[[{...featured,full_text_checked:false},brief],'checked against the full text'],
  'brief without daily source':[[featured,{...brief,weekly_source_claim:undefined}],'name its daily source claim'],
  'too many featured':[[...many,brief],'featured items exceed 5'],
 };
 for(const [name,[claims,reason]] of Object.entries(cases)){
  const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));
  const r=weeklyFull(d,claims);assert.equal(r.ok,false,name);assert.ok(r.errors.some(e=>e.includes(reason)),name+': '+r.errors.join(' | '));
 }
 for(const bad of ['2026-13-01','yesterday',20261017]){
  const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));
  const r=weeklyFull(d,[featured,brief],undefined,{revised_on:bad});assert.equal(r.ok,false,String(bad));assert.ok(r.errors.some(e=>e.includes('revised_on')),String(bad));
 }
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
 const dir=path.join(d,"monthly","2026-08");fs.mkdirSync(dir,{recursive:true});
 fs.renameSync(path.join(d,"weekly","2026-10-09_10-15","index.html"),path.join(dir,"index.html"));
 fs.writeFileSync(path.join(d,"publication","issues.json"),JSON.stringify({editions:[{path:"monthly/2026-08/index.html",claims_file:"publication/claims/m.json"}]}));
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
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));monthlyIssue(d,[{...claim,section:"policy",audience:"teacher_ed"}]);assert.equal(validate(d).ok,true);
 const e=setup();t.after(()=>fs.rmSync(e,{recursive:true,force:true}));monthlyIssue(e,[{...claim,section:"policy",audience:"unknown"}]);assert.equal(validate(e).ok,false);
});
test("daily claim cannot relabel the audience of its cumulative candidate",t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));dailyFixture(d,dailyLow);
 const dir=path.join(d,"research","drafts");fs.mkdirSync(dir,{recursive:true});
 const sheet={items:[{candidate_id:"W2026-10-09-A07",source_url:dailyLow.source_url,decision:"publish",source_checked:true,first_disclosed_on:"2026-10-10",audience:"teacher_ed"}]};
 fs.writeFileSync(path.join(dir,"2026-10-09_2026-10-15.json"),JSON.stringify(sheet));
 const result=validate(d);assert.equal(result.ok,false);assert.ok(result.errors.some(e=>e.includes("audience differs from cumulative candidate")));
});

/* ---------- sectioned monthly (manager decisions 2026-10-17) ---------- */
const M_END='（AI 輔助整理，未經真人逐則審稿；請參閱原文。）',M_AEND='（編輯歸納，AI 整理，未經真人審閱。）';
const mItem=(id,section,over={})=>({...claim,claim_id:id,section,source_title:'Synthetic source '+id,source_url:'https://example.org/m/'+id,evidence_source_url:'https://example.org/m/'+id,first_disclosed_on:'2026-10-20',publication_date:'2026-10-20',checked_at:'2026-10-25',source_document_type:'official_guidance',claim_text:'合成月報項目《Synthetic source '+id+'》。'+M_END,...over});
const mResearch=(id,section,over={})=>mItem(id,section,{kind:'research',level:'V2',source_document_type:'peer_reviewed_article',source_type:'journal_article',...over});
const mAnalysis=(id,section,ids,text,over={})=>({...claim,claim_id:id,section,assertion_type:'editorial_analysis',claim_class:'descriptive',supporting_claim_ids:ids,claim_text:text+M_AEND,source_url:'https://example.org/m/'+id,evidence_source_url:'https://example.org/m/'+id,...over});
function monthlyBase(){
 return [
  mAnalysis('L1','overview_line',['P1'],'本月各國持續發布教師 AI 素養相關文件'),
  mAnalysis('O1','overview',['P1','R1'],'本月有政策文件與研究談到教師 AI 素養'),
  mAnalysis('O2','overview',['R1','W1'],'本月研究與週報項目都以中小學教師為對象'),
  mAnalysis('O3','overview',['P1','W1'],'本月官方文件談到教師培訓'),
  mItem('P1','policy',{source_country:'JP'}),
  mResearch('R1','research'),
  mResearch('R2','research',{audience:'teacher_ed'}),
  mResearch('S1','scholars',{research_group:'G-A',scholar_id:'H01',publication_date:'2026-10-02',first_disclosed_on:'2026-09-01'}),
  mItem('B1','background',{first_disclosed_on:'2026-08-01',publication_date:'2026-08-01',related_claim_ids:['P1']}),
  mAnalysis('TN1','tw_note',['P1','TR1'],'本月國際政策文件與臺灣研究都談到教師 AI 素養',{region:'tw'}),
  mItem('TC1','tw_compare',{region:'tw',first_disclosed_on:'2026-04-17',publication_date:'2026-04-17',related_claim_ids:['P1']}),
  mResearch('TR1','tw_research',{region:'tw'})];
}
function monthlySetup(d,claims,extra={},transform=x=>x,briefOver={}){
 const r=require('./render-site.js');
 const dailyEdition=registerDailyForWeekly(d);
 const brief={...claim,claim_id:'W1',weekly_section:'briefs',weekly_source_claim:'D20261012-01',first_disclosed_on:'2026-10-10',source_document_type:'official_guidance',claim_text:dailyLow.claim_text,first_disclosed_on:dailyLow.first_disclosed_on,source_url:'https://example.org/daily-1',evidence_source_url:'https://example.org/daily-1',source_document_type:dailyLow.source_document_type,...briefOver};
 const weeklyEdition={path:'weekly/2026-10-09_10-15/index.html',claims_file:'publication/claims/a.json'};
 fs.writeFileSync(path.join(d,'publication','claims','a.json'),JSON.stringify([brief]));
 updateHtml(d,r.renderWeeklyEdition({period:'2026-10-09_10-15',claims:[brief],nav:r.weeklyNav('2026-10-09_10-15',['2026-10-09_10-15'])}));
 const monthlyEdition={path:'monthly/2026-10/index.html',claims_file:'publication/claims/monthly-2026-10.json',indexed_weeklies:['2026-10-09_10-15'],indexed_through:'2026-11-03',...extra};
 const editions=[dailyEdition,weeklyEdition,monthlyEdition];
 fs.writeFileSync(path.join(d,'publication','claims','monthly-2026-10.json'),JSON.stringify(claims));
 const loaded=editions.map(e=>({...e,claims:JSON.parse(fs.readFileSync(path.join(d,e.claims_file),'utf8'))}));
 let html;try{html=r.renderMonthlyEdition({period:'2026-10',claims,...monthlyEdition,context:r.monthlyContext(monthlyEdition,loaded)})}catch(e){html='<html><main><article></article></main></html>'}
 fs.mkdirSync(path.join(d,'monthly','2026-10'),{recursive:true});fs.writeFileSync(path.join(d,'monthly','2026-10','index.html'),transform(html));
 fs.writeFileSync(path.join(d,'publication','issues.json'),JSON.stringify({schema_version:1,editions}));
 rerenderDailies(d);
 return {html,result:validate(d)};
}
test('sectioned monthly control: renderer page passes; contents, listing and Taiwan area are rendered',t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));
 const {html,result}=monthlySetup(d,monthlyBase());
 assert.deepEqual(result.errors,[]);
 for(const s of ['<section id="sec-toc"><h2>本期目錄</h2>','<a href="#sec-policy">政策與官方文件（1）</a>','<section id="sec-tw" data-region="tw"><h2>臺灣</h2>','<h4>週報 2026/10/09—10/15（1 則）</h4>','id="item-l1"','<td data-col="audience"><span>師培</span></td>','非中小學研究 1／3 則','<a href="#sec-tw_research">臺灣研究（1）</a>','引用本期：K-12 AI 素養國際動態，月報 2026 年 10 月。','上一期：<a href="../2026-09/">2026 年 9 月（舊版，未經新查核流程）</a>'])
  assert.ok(html.includes(s),s);
});
test('sectioned monthly: tampered contents, listing or summary text is refused',t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));
 for(const f of [h=>h.replace('政策與官方文件（1）','政策與官方文件（9）'),h=>h.replace('｜<a href="../../weekly/2026-10-09_10-15/">週報 2026/10/09—10/15</a>','｜<a href="../../weekly/2026-10-09_10-15/#item-1">週報 2026/10/09—10/15</a>'),h=>h.replace('非中小學研究 1／3 則','非中小學研究 0／3 則'),h=>h.replace(/<li id="item-l1">.*?<\/li>/,''),h=>h.replace('（舊版，未經新查核流程）',''),h=>h.replace('<td data-col="audience"><span>師培</span></td>','<td data-col="audience"><span>中小學</span></td>')]){
  const {result}=monthlySetup(d,monthlyBase(),{},f);assert.equal(result.ok,false);
 }
});
const monthlyBad={
 'repeats a daily source':c=>c.map(x=>x.claim_id==='P1'?{...x,source_url:'https://example.org/daily-1',evidence_source_url:'https://example.org/daily-1'}:x),
 'non-K-12 research over the cap':c=>c.map(x=>['R1','S1'].includes(x.claim_id)?{...x,audience:'higher_ed'}:x),
 'overview cites one item':c=>c.map(x=>x.claim_id==='O1'?{...x,supporting_claim_ids:['P1']}:x),
 'overview cites two items of one source':c=>c.map(x=>x.claim_id==='O1'?{...x,supporting_claim_ids:['P1','R1']}:x.claim_id==='R1'?{...x,source_url:'https://example.org/m/P1',evidence_source_url:'https://example.org/m/P1'}:x),
 'overview mentions 臺灣':c=>c.map(x=>x.claim_id==='O1'?{...x,claim_text:'本月臺灣與各國都談到教師 AI 素養'+M_AEND}:x),
 'overview of two sentences':c=>c.filter(x=>x.claim_id!=='O3'),
 'one-line summary too long':c=>c.map(x=>x.claim_id==='L1'?{...x,claim_text:'本'.repeat(61)+M_AEND}:x),
 'one-line summary gives advice':c=>c.map(x=>x.claim_id==='L1'?{...x,claim_text:'教師應該立即採用 AI 工具'+M_AEND}:x),
 'policy outside the window':c=>c.map(x=>x.claim_id==='P1'?{...x,first_disclosed_on:'2026-09-29',publication_date:'2026-09-29'}:x),
 'month precision without 說明':c=>c.map(x=>x.claim_id==='P1'?{...x,date_precision:'month',first_disclosed_on:'2026-10',publication_date:'2026-10'}:x),
 'month precision two months back':c=>c.map(x=>x.claim_id==='P1'?{...x,date_precision:'month',first_disclosed_on:'2026-08',publication_date:'2026-08',claim_text:'《Synthetic source P1》說明：原文標示 2026 年 8 月。'+M_END}:x),
 'month precision on a scholar item':c=>c.map(x=>x.claim_id==='S1'?{...x,date_precision:'month'}:x),
 'scholar published outside the window':c=>c.map(x=>x.claim_id==='S1'?{...x,publication_date:'2026-09-20'}:x),
 'scholar without research group':c=>c.map(x=>x.claim_id==='S1'?{...x,research_group:undefined}:x),
 'background not earlier than the period':c=>c.map(x=>x.claim_id==='B1'?{...x,first_disclosed_on:'2026-10-05',publication_date:'2026-10-05'}:x),
 'Taiwan research for higher education':c=>c.map(x=>x.claim_id==='TR1'?{...x,audience:'higher_ed'}:x),
 'Taiwan research without region':c=>c.map(x=>x.claim_id==='TR1'?{...x,region:undefined}:x),
 'Taiwan note citing only international items':c=>c.map(x=>x.claim_id==='TN1'?{...x,supporting_claim_ids:['P1','R1']}:x),
 'Taiwan note with evaluation':c=>c.map(x=>x.claim_id==='TN1'?{...x,claim_text:'臺灣教師 AI 素養較為薄弱'+M_AEND}:x),
 'item without the AI disclosure':c=>c.map(x=>x.claim_id==='R1'?{...x,claim_text:'合成月報項目《Synthetic source R1》。'}:x),
 'item with a reworded AI disclosure':c=>c.map(x=>x.claim_id==='R1'?{...x,claim_text:'合成月報項目《Synthetic source R1》。（已經專家確認，未經真人逐則審稿；請參閱原文。）'}:x),
 'repeats a daily source with a trailing slash':c=>c.map(x=>x.claim_id==='P1'?{...x,source_url:'https://example.org/daily-1/',evidence_source_url:'https://example.org/daily-1/'}:x),
 'repeats a daily source with www.':c=>c.map(x=>x.claim_id==='P1'?{...x,source_url:'https://www.example.org/daily-1',evidence_source_url:'https://www.example.org/daily-1'}:x),
 'invalid doi field':c=>c.map(x=>x.claim_id==='R1'?{...x,doi:'not-a-doi'}:x),
 'research group padded to dodge the cap':c=>[...c,...[1,2,3,4].map(i=>mResearch('S'+(i+1),'scholars',{research_group:i%2?'G-A ':'G-A',scholar_id:'H0'+(i+1),publication_date:'2026-10-0'+(i+2)}))],
 'one scholar with three items':c=>[...c,...[2,3].map(i=>mResearch('S'+i,'scholars',{research_group:'G-B',scholar_id:'h01 ',publication_date:'2026-10-0'+i}))],
 'scholar without scholar_id':c=>c.map(x=>x.claim_id==='S1'?{...x,scholar_id:undefined}:x),
 'item text without its source title':c=>c.map(x=>x.claim_id==='R1'?{...x,claim_text:'合成月報項目 R1。'+M_END}:x),
 'unknown section':c=>c.map(x=>x.claim_id==='R1'?{...x,section:'highlights'}:x),
 'trend without a peer-reviewed K-12 source':c=>[...c,mResearch('T1a','trends',{research_group:'G-A',publication_date:'2026-09-10',source_document_type:'preprint',source_type:'preprint'}),mResearch('T1b','trends',{research_group:'G-B',publication_date:'2026-09-12',audience:'higher_ed'}),mAnalysis('T1','trends',['T1a','T1b'],'兩個研究群都談到自評與實測')],
 'trend from one research group':c=>[...c,mResearch('T1a','trends',{research_group:'G-A',publication_date:'2026-09-10'}),mResearch('T1b','trends',{research_group:'G-A',publication_date:'2026-09-12'}),mAnalysis('T1','trends',['T1a','T1b'],'兩篇研究都談到自評與實測')],
 'trend source older than three months':c=>[...c,mResearch('T1a','trends',{research_group:'G-A',publication_date:'2026-06-10'}),mResearch('T1b','trends',{research_group:'G-B',publication_date:'2026-09-12'}),mAnalysis('T1','trends',['T1a','T1b'],'兩個研究群都談到自評與實測')]
};
for(const [name,mutate] of Object.entries(monthlyBad))test('sectioned monthly refuses: '+name,t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));
 const {result}=monthlySetup(d,mutate(monthlyBase()));assert.equal(result.ok,false,name);
});
test('sectioned monthly accepts a supported trend and month-precision documents of this or the previous month',t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));
 const c=[...monthlyBase().map(x=>x.claim_id==='P1'?{...x,date_precision:'month',first_disclosed_on:'2026-09',publication_date:'2026-09',claim_text:'《Synthetic source P1》說明：原文標示 2026 年 9 月，本刊 10/20 查得，實際上網日不明。'+M_END}:x),
  mResearch('T1a','trends',{research_group:'G-A',publication_date:'2026-09-10'}),mResearch('T1b','trends',{research_group:'G-B',publication_date:'2026-08-12',audience:'teacher_ed'}),mAnalysis('T1','trends',['T1a','T1b'],'兩個研究群都談到自評與實測')];
 const {html,result}=monthlySetup(d,c);assert.deepEqual(result.errors,[]);
 assert.ok(html.includes('2026-09（原文僅標示年月，原文標示上月）'));
 assert.ok(html.includes('<h4>依據來源</h4>')&&html.includes('id="item-d1"'));
});
test('sectioned monthly registration: issue fields are checked',t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));
 for(const extra of [{indexed_through:'2026-10-30'},{indexed_through:undefined},{indexed_weeklies:['2026-10-16_10-22']},{indexed_weeklies:'2026-10-09_10-15'},{taiwan_journals_not_searched:true},{taiwan_journals_not_searched:false},{revised_on:'2026-13-01'}])
  assert.equal(monthlySetup(d,monthlyBase(),extra).result.ok,false,JSON.stringify(extra));
 // A bare main-only page is not accepted for a sectioned monthly.
 assert.ok(monthlySetup(d,monthlyBase(),{},h=>'<html><main>'+h.split('<main')[1].split('>').slice(1).join('>').split('</main>')[0]+'</main></html>').result.errors.some(e=>e.includes('full renderer page')));
 const noTw=monthlyBase().filter(x=>x.section!=='tw_research').map(x=>x.claim_id==='TN1'?{...x,supporting_claim_ids:['P1','TC1']}:x);
 const ok=monthlySetup(d,noTw,{taiwan_journals_not_searched:true,revised_on:'2026-11-05'});
 assert.deepEqual(ok.result.errors,[]);assert.ok(ok.html.includes('本期未查臺灣期刊，將於下期補列。')&&ok.html.includes('本期於 2026-11-05 改版'));
});
test('monthly from 2026-10 must use the sectioned layout',t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));
 const r=require('./render-site.js'),c=[{...claim,section:'policy'}];
 fs.mkdirSync(path.join(d,'monthly','2026-10'),{recursive:true});fs.writeFileSync(path.join(d,'monthly','2026-10','index.html'),r.renderMonthlyEdition({period:'2026-10',claims:c}));
 fs.rmSync(path.join(d,'weekly'),{recursive:true,force:true});
 fs.writeFileSync(path.join(d,'publication','claims','m.json'),JSON.stringify(c));
 fs.writeFileSync(path.join(d,'publication','issues.json'),JSON.stringify({editions:[{path:'monthly/2026-10/index.html',claims_file:'publication/claims/m.json'}]}));
 assert.ok(validate(d).errors.some(e=>e.includes('indexed_weeklies')));
});
test('sectioned monthly refuses a weekly source matched only by DOI written as a URL',t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));
 const {result}=monthlySetup(d,monthlyBase().map(x=>x.claim_id==='R1'?{...x,source_url:'https://doi.org/10.1234/ABC',evidence_source_url:'https://doi.org/10.1234/ABC'}:x),{},x=>x,{doi:'https://doi.org/10.1234/abc'});
 assert.ok(result.errors.some(e=>e.includes('R1: source already published in weekly/2026-10-09_10-15/')),result.errors.join('\n'));
});
test('a later daily may not repeat an item a monthly already carried; earlier ones are judged on the monthly side',t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));
 const {result}=monthlySetup(d,monthlyBase());assert.deepEqual(result.errors,[]);
 const {renderDailyEdition}=require('./render-site.js');
 const late={...dailyLow,claim_id:'D20261104-01',source_url:'https://example.org/m/P1',evidence_source_url:'https://example.org/m/P1',first_disclosed_on:'2026-11-01',publication_date:'2026-11-01',checked_at:'2026-11-04',claim_text:'來源機構：Example Institution；資料標題：Synthetic school AI announcement；來源刊登日：2026-11-01。'};
 fs.mkdirSync(path.join(d,'daily','2026-11-04'),{recursive:true});fs.writeFileSync(path.join(d,'daily','2026-11-04','index.html'),renderDailyEdition({date:'2026-11-04',claims:[late]}));
 fs.writeFileSync(path.join(d,'publication','claims','daily-2026-11-04.json'),JSON.stringify([late]));
 const m=JSON.parse(fs.readFileSync(path.join(d,'publication','issues.json'),'utf8'));m.editions.push({path:'daily/2026-11-04/index.html',claims_file:'publication/claims/daily-2026-11-04.json',publication_mode:'ai_low_risk_source_facts'});fs.writeFileSync(path.join(d,'publication','issues.json'),JSON.stringify(m));
 const errs=validate(d).errors;
 assert.ok(errs.some(e=>e.startsWith('publication/claims/daily-2026-11-04.json D20261104-01: source already published in monthly/2026-10/')),errs.join('\n'));
 // The issued monthly itself is unchanged by the later daily (its list stops at indexed_through).
 assert.ok(!errs.some(e=>e.startsWith('monthly/')),errs.join('\n'));
});
test('month precision is accepted only in a sectioned monthly; an invalid monthly period is refused',t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));
 assert.equal(monthlyFull(d,[{...claim,section:'policy',date_precision:'month',publication_date:'2026-08',first_disclosed_on:'2026-08'}]).ok,false);
 const r=require('./render-site.js'),c=[{...claim,section:'policy'}];
 fs.rmSync(path.join(d,'monthly'),{recursive:true,force:true});fs.mkdirSync(path.join(d,'monthly','2026-011'),{recursive:true});
 fs.writeFileSync(path.join(d,'monthly','2026-011','index.html'),'<html><main><p data-claim-id="C1">'+c[0].claim_text+'</p></main></html>');
 fs.writeFileSync(path.join(d,'publication','claims','m.json'),JSON.stringify(c));
 fs.writeFileSync(path.join(d,'publication','issues.json'),JSON.stringify({editions:[{path:'monthly/2026-011/index.html',claims_file:'publication/claims/m.json'}]}));
 assert.ok(validate(d).errors.some(e=>e.includes('monthly period must be YYYY-MM')));
});

/* ---------- three-publication alignment (manager decisions 2026-10-17, C1–C8) ---------- */
test('weekly line items: a brief from a daily is one line linking to it; its text must equal the daily claim',t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));
 assert.deepEqual(weeklyFull(d,[featured,brief]).errors,[]);
 const html=fs.readFileSync(path.join(d,'weekly','2026-10-09_10-15','index.html'),'utf8');
 assert.ok(html.includes('<li id="item-2">第 2 則｜政策・官方指引｜2026-10-10｜')&&html.includes('<a href="../../daily/2026-10-12/#D20261012-01">每日短訊 2026-10-12</a>'));
 assert.ok(!html.includes('data-claim-id="W2"'),'the line does not repeat the summary');
 assert.equal(weeklyFull(d,[featured,{...brief,claim_text:'與每日短訊不同的文字',keepText:true}]).ok,false);
 const tampered=fs.readFileSync(path.join(d,'weekly','2026-10-09_10-15','index.html'),'utf8');
 assert.equal(weeklyFull(d,[featured,brief],tampered.replace('第 2 則｜','第 9 則｜')).ok,false);
});
test('daily backlinks: a daily item names the weekly item it became; missing or altered links are refused',t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));
 assert.deepEqual(weeklyFull(d,[featured,brief]).errors,[]);
 const file=path.join(d,'daily','2026-10-12','index.html'),html=fs.readFileSync(file,'utf8');
 const line='<p data-claim-links="D20261012-01">已收入：<a href="../../weekly/2026-10-09_10-15/#item-2">週報 2026/10/09—10/15 第 2 則</a></p>';
 assert.ok(html.includes(line),html.slice(html.indexOf('<article>'),html.indexOf('</article>')));
 assert.ok(html.includes('<p id="D20261012-01" data-claim-kind="D20261012-01"'));
 for(const changed of [html.replace(line,''),html.replace('第 2 則</a>','第 1 則</a>'),html.replace('data-claim-links="D20261012-01"','data-claim-links="D20261012-02"')]){
  fs.writeFileSync(file,changed);assert.equal(validate(d).ok,false);
 }
});
test('daily correction: revised_on shows a note and allows a later check date; invalid dates are refused',t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));
 const r=require('./render-site.js'),late={...dailyLow,checked_at:'2026-10-14'};dailyFixture(d,late);
 const manifest=path.join(d,'publication','issues.json'),file=path.join(d,'daily','2026-10-10','index.html');
 const set=(extra,html)=>{fs.writeFileSync(manifest,JSON.stringify({editions:[{path:'daily/2026-10-10/index.html',claims_file:'publication/claims/daily-2026-10-10.json',publication_mode:'ai_low_risk_source_facts',...extra}]}));fs.writeFileSync(file,html)};
 const page=b=>r.renderDailyEdition({date:'2026-10-10',claims:[late],revised_on:b});
 set({revised_on:'2026-10-14'},page('2026-10-14'));assert.deepEqual(validate(d).errors,[]);
 assert.ok(page('2026-10-14').includes(r.dailyRevisionText('2026-10-14')));
 for(const [extra,html] of [[{},page()],[{revised_on:'2026-10-13'},page('2026-10-13')],[{revised_on:'2026-10-09'},page('2026-10-09')],[{revised_on:'2026-10-14'},page('2026-10-14').replace(r.dailyRevisionText('2026-10-14'),'')]])
  {set(extra,html);assert.equal(validate(d).ok,false,JSON.stringify(extra))}
});
test('sectioned monthly: Taiwan central documents of the month; month precision only for official documents and Taiwan journals',t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));
 const tp=mItem('TP1','tw_policy',{region:'tw'}),base=[...monthlyBase(),tp];
 const ok=monthlySetup(d,base);assert.deepEqual(ok.result.errors,[]);
 assert.ok(ok.html.includes('<h3>臺灣本月中央文件</h3>')&&ok.html.includes('id="item-f1"'));
 assert.ok(ok.html.indexOf('id="item-l1"')<ok.html.indexOf('id="item-l2"'),'list numbers follow page order');
 for(const bad of [base.map(x=>x.claim_id==='TP1'?{...x,audience:'higher_ed'}:x),base.map(x=>x.claim_id==='TP1'?{...x,region:undefined}:x),
  base.map(x=>x.claim_id==='R1'?{...x,date_precision:'month',first_disclosed_on:'2026-10',publication_date:'2026-10',claim_text:'《Synthetic source R1》說明：原文標示 2026 年 10 月。（AI 輔助整理，未經真人逐則審稿；請參閱原文。）'}:x)])
  assert.equal(monthlySetup(d,bad).result.ok,false);
 assert.deepEqual(monthlySetup(d,base.map(x=>x.claim_id==='TP1'?{...x,date_precision:'month',first_disclosed_on:'2026-10',publication_date:'2026-10',claim_text:'《Synthetic source TP1》說明：原文標示 2026 年 10 月，本刊 10/20 查得，實際上網日不明。（AI 輔助整理，未經真人逐則審稿；請參閱原文。）'}:x)).result.errors,[]);
});
test('sectioned monthly: daily items listed by the monthly link back to it',t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));
 assert.deepEqual(monthlySetup(d,monthlyBase()).result.errors,[]);
 const html=fs.readFileSync(path.join(d,'daily','2026-10-12','index.html'),'utf8');
 assert.ok(html.includes('<a href="../../monthly/2026-10/#item-l1">月報 2026 年 10 月一覽 1</a>'),html.slice(html.indexOf('<article>'),html.indexOf('</article>')));
});

/* ---------- joint review (manager "D 全照建議", 2026-10-17) ---------- */
function weeklyAt(d,period,claims,transform=x=>x){
 const r=require('./render-site.js');fs.rmSync(path.join(d,'weekly'),{recursive:true,force:true});fs.mkdirSync(path.join(d,'weekly',period),{recursive:true});
 const html=r.renderWeeklyEdition({period,claims,nav:r.weeklyNav(period,[period])});
 fs.writeFileSync(path.join(d,'weekly',period,'index.html'),transform(html));
 fs.writeFileSync(path.join(d,'publication','claims','w.json'),JSON.stringify(claims));
 fs.writeFileSync(path.join(d,'publication','issues.json'),JSON.stringify({editions:[{path:'weekly/'+period+'/index.html',claims_file:'publication/claims/w.json'}]}));
 return {html,result:validate(d)};
}
const facetText='來源機構：Example；資料標題：Synthetic study；來源刊登日：2026-10-17。樣本：國小 30 人。設計：問卷。作者所述發現：作者報告學生多數使用 AI 查詢。限制：便利樣本。（AI 輔助整理，未經真人逐則審稿；請參閱原文。）';
const featuredNew={...featured,claim_id:'F1',kind:'research',level:'V2',source_document_type:'peer_reviewed_article',source_type:'journal_article',first_disclosed_on:'2026-10-17',publication_date:'2026-10-17',source_title:'Synthetic study',claim_text:facetText};
test('weekly from 2026-10-09: featured research needs the four facets; from 2026-10-16 policy items need source_country',t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));
 assert.deepEqual(weeklyAt(d,'2026-10-16_10-22',[featuredNew]).result.errors,[]);
 assert.ok(weeklyAt(d,'2026-10-16_10-22',[{...featuredNew,claim_text:facetText.replace('。限制：便利樣本','')}]).result.errors.some(e=>e.includes('missing 限制')));
 const pol={...featured,claim_id:'F2',first_disclosed_on:'2026-10-17',publication_date:'2026-10-17',claim_text:'來源機構：X；資料標題：Y；來源刊登日：2026-10-17。內容：合成政策。'};
 assert.ok(weeklyAt(d,'2026-10-16_10-22',[featuredNew,pol]).result.errors.some(e=>e.includes('needs source_country')));
 const ok=weeklyAt(d,'2026-10-16_10-22',[featuredNew,{...pol,source_country:'GB-ENG'}]);assert.deepEqual(ok.result.errors,[]);
 assert.ok(ok.html.includes('政策來源：英格蘭 1'));
 assert.equal(weeklyAt(d,'2026-10-16_10-22',[featuredNew,{...pol,source_country:'England'}]).result.ok,false);
 // The four facets reach back to the 10-09 period (joint review E1b); the earlier launch issue is legacy.
 assert.ok(weeklyAt(d,'2026-10-09_10-15',[{...featuredNew,first_disclosed_on:'2026-10-10',publication_date:'2026-10-10',claim_text:facetText.replace('。限制：便利樣本','')}]).result.errors.some(e=>e.includes('missing 限制')));
});
test('self-reported outcome: a fixed note in the type label; any other value is refused',t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));
 const r=require('./render-site.js'),c={...dailyLow,self_reported_outcome:true};
 assert.ok(r.renderDailyEdition({date:'2099-01-01',claims:[c]}).includes('（來源含機構自述成效，本刊未轉述；非同儕審查研究）</p>'));
 const ok=weeklyAt(d,'2026-10-09_10-15',[{...featured,self_reported_outcome:true}]);assert.deepEqual(ok.result.errors,[]);assert.ok(ok.html.includes('官方指引（來源含機構自述成效，本刊未轉述；非同儕審查研究）'));
 assert.equal(weeklyAt(d,'2026-10-09_10-15',[{...featured,self_reported_outcome:'yes'}]).result.ok,false);
});
test('weekly late items: first disclosed in the two weeks before the period, shown as 補 n lines; otherwise refused',t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));
 const late={...brief,claim_id:'L1',weekly_section:'late'};
 const bad=weeklyFull(d,[featured,late]);assert.ok(bad.errors.some(e=>e.includes('two weeks before the period')),bad.errors.join('\n'));
 const r=require('./render-site.js'),html=r.renderWeeklyEdition({period:'2026-10-16_10-22',claims:[featuredNew,{...late,first_disclosed_on:'2026-10-10'}]});
 assert.ok(html.includes('<h2>上期補登</h2>')&&html.includes('<li id="item-p1">補 1｜'));
});
test('a weekly line item must match its daily claim in date, link, kind and document type',t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));
 for(const over of [{first_disclosed_on:'2026-10-11'},{source_document_type:'draft'},{source_url:'https://example.org/else',evidence_source_url:'https://example.org/else'}]){
  const r=weeklyFull(d,[featured,{...brief,...over}]);assert.ok(r.errors.some(e=>e.includes('must equal its daily claim')),JSON.stringify(over));
 }
});
test('sectioned monthly: an international study with a Taiwan sample is listed again in the Taiwan area (joint review E2b)',t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));
 const claims=monthlyBase().map(x=>x.claim_id==='R1'?{...x,taiwan_sample:true}:x);
 const {html,result}=monthlySetup(d,claims);
 assert.deepEqual(result.errors,[]);
 for(const s of ['<a href="#sec-tw_sample">以臺灣為樣本的國際研究（1）</a>','<section id="sec-tw_sample"><h3>以臺灣為樣本的國際研究</h3>','<li>第 <a href="#item-2">2</a> 則｜Synthetic source R1</li>'])assert.ok(html.includes(s),s);
 for(const bad of [x=>x.claim_id==='P1'?{...x,taiwan_sample:true}:x,x=>x.claim_id==='R1'?{...x,taiwan_sample:'yes'}:x]){
  const e=setup();t.after(()=>fs.rmSync(e,{recursive:true,force:true}));
  assert.equal(monthlySetup(e,monthlyBase().map(bad)).result.ok,false);
 }
});
test('foreign agency named in the text carries its country (manager 2026-10-17)',t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));
 const pol=t=>({...featured,source_country:'CN',claim_text:'來源機構：中華人民共和國教育部；資料標題：Y；來源刊登日：2026-10-10。內容：'+t});
 assert.deepEqual(weeklyFull(d,[pol('中國教育部網站轉載報導。'),brief]).errors,[]);
 for(const bad of ['教育部網站轉載報導。','韓國與教育部合作。']){
  const e=setup();t.after(()=>fs.rmSync(e,{recursive:true,force:true}));
  assert.ok(weeklyFull(e,[pol(bad),brief]).errors.some(x=>x.includes('must carry its country')),bad);
 }
 const f=setup();t.after(()=>fs.rmSync(f,{recursive:true,force:true}));
 assert.deepEqual(weeklyFull(f,[pol('要求各級教育部門與學校辦理培訓。'),brief]).errors,[],'教育部門 is not an agency name');
});
test('caution marks (plan F2): renderer section passes; incomplete, unsupported or misplaced marks are refused',t=>{
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));
 const pol={...featured,claim_id:'F2',source_organization:'X',first_disclosed_on:'2026-10-17',publication_date:'2026-10-17',source_country:'GB',claim_text:'來源機構：X；資料標題：Y；來源刊登日：2026-10-17。內容：合成政策。'};
 const mark={caution_kind:'warning',caution_excerpt:'published a nonbinding advisory',caution_excerpt_zh:'發布一份不具拘束力的建議',caution_locator:'首段',caution_confirmed_on:'2026-10-20'};
 const empty=weeklyAt(d,'2026-10-16_10-22',[featuredNew,pol]);assert.deepEqual(empty.result.errors,[]);
 assert.ok(empty.html.includes('<section id="sec-caution"><h2>國外反思選讀（只選批評與風險，非國外整體評價）</h2>')&&empty.html.includes('<p>本期未見符合條件的項目。</p>'),'an empty section stays, saying none was found');
 assert.ok(!/<section id="sec-caution">[\s\S]*本期刊出/.test(empty.html),'the tally counts only this section');
 const ok=weeklyAt(d,'2026-10-16_10-22',[{...featuredNew,...mark,caution_kind:'risk_research'},{...pol,...mark}]);assert.deepEqual(ok.result.errors,[]);
 for(const s of ['<a href="#sec-caution">國外反思選讀（2）</a>','本段列 2 則（本期項目標記 2 則、另選錄 0 則）：官方警示 1 則、風險相關研究 1 則。','｜官方警示｜〔教師〕X於 2026-10-17 發布〈','，文中表示：「發布一份不具拘束力的建議」（首段）<br><small>原文：published a nonbinding advisory</small>','｜風險相關研究｜','，作者報告：','本段列 2 則（本期項目標記 2 則、另選錄 0 則）：','<a href="#item-1">第 1 則</a>｜'])assert.ok(ok.html.includes(s),s);
 const pc=weeklyAt(d,'2026-10-16_10-22',[featuredNew,{...pol,...mark,caution_kind:'policy_change',caution_direction:'loosen',caution_prior_url:'https://example.org/prior'}]);
 assert.deepEqual(pc.result.errors,[]);assert.ok(pc.html.includes('｜政策調整（放寬）｜')&&pc.html.includes('<a href="https://example.org/prior">前一版政策</a>'));
 const bad={
  'missing field':[{...pol,...mark,caution_locator:undefined}],
  'excerpt not in snapshot':[{...pol,...mark,caution_excerpt:'words that the snapshot never contains'}],
  'risk_research on a policy item':[{...pol,...mark,caution_kind:'risk_research'}],
  'warning on a research item':[{...featuredNew,...mark}],
  'policy_change without direction':[{...pol,...mark,caution_kind:'policy_change'}],
  'direction on a warning':[{...pol,...mark,caution_direction:'tighten'}],
  'locator outside title, abstract or first paragraph':[{...pol,...mark,caution_locator:'第 5 頁'}],
  'unknown kind':[{...pol,...mark,caution_kind:'opinion'}],
  'confirmed before checked':[{...pol,...mark,caution_confirmed_on:'2026-10-01'}],
  'translation too long':[{...pol,...mark,caution_excerpt_zh:'譯'.repeat(61)}]};
 for(const [name,extra] of Object.entries(bad)){
  const e=setup();t.after(()=>fs.rmSync(e,{recursive:true,force:true}));
  assert.equal(weeklyAt(e,'2026-10-16_10-22',[featuredNew,...extra]).result.ok,false,name);
 }
 const early=setup();t.after(()=>fs.rmSync(early,{recursive:true,force:true}));
 assert.ok(weeklyAt(early,'2026-10-09_10-15',[{...featured,...mark}]).result.errors.some(x=>x.includes('caution marks start with')),'earlier issues carry no marks');
 const f=setup();t.after(()=>fs.rmSync(f,{recursive:true,force:true}));
 assert.equal(weeklyAt(f,'2026-10-16_10-22',[featuredNew,{...pol,...mark}],h=>h.replace('文中表示','文中警告')).result.ok,false,'the line text comes only from the renderer');
 const g=setup();t.after(()=>fs.rmSync(g,{recursive:true,force:true}));dailyFixture(g,{...dailyLow,...mark});
 assert.ok(validate(g).errors.some(x=>x.includes('caution marks belong to weekly items only')),'a daily item carries no mark');
});
test('國外反思選讀 (manager 2026-10-20): weekly and monthly reflection items render as checked lines; wrong fields are refused',t=>{
 const r=require('./render-site.js');
 const base={...claim,source_organization:'Example Union',source_country:'GB',source_title:'Synthetic statement',source_url:'https://example.org/reflect-1',evidence_source_url:'https://example.org/reflect-1',reflect_type:'statement',reflect_excerpt_zh:'發布一份不具拘束力的建議',reflect_locator:'首段',reflect_confirmed_on:'2026-10-20',checked_at:'2026-10-19'};
 const line=c=>({...c,claim_text:r.reflectionText(c)});
 // Weekly.
 const d=setup();t.after(()=>fs.rmSync(d,{recursive:true,force:true}));
 const wk={...base,claim_id:'RF1',weekly_section:'reflection',first_disclosed_on:'2026-10-18',publication_date:'2026-10-18'};
 const com=line({...wk,claim_id:'RF2',reflect_type:'commentary',reflect_author:'A. Author',source_organization:'Example Institute',source_url:'https://example.org/reflect-2',evidence_source_url:'https://example.org/reflect-2'});
 const ok=weeklyAt(d,'2026-10-16_10-22',[featuredNew,line(wk),com]);assert.deepEqual(ok.result.errors,[]);
 for(const s of ['<a href="#sec-caution">國外反思選讀（2）</a>','本段列 2 則（本期項目標記 0 則、另選錄 2 則）：團體聲明 1 則、專家評論 1 則。','id="item-r1" data-claim-id="RF1">團體聲明｜Example Union於 2026-10-18 發布〈<a href="https://example.org/reflect-1">Synthetic statement</a>〉，文中表示：「發布一份不具拘束力的建議」（首段）<br><small>原文：'+excerpt+'</small></li>','專家評論（非研究、非政策）｜Example Institute（A. Author）'])assert.ok(ok.html.includes(s),s);
 const bad={
  'commentary without author':[line({...wk,reflect_type:'commentary'})],
  'research type on a policy item':[line({...wk,reflect_type:'research'})],
  'mixed note on a statement':[line({...wk,reflect_mixed:true})],
  'missing field':[{...line(wk),reflect_locator:undefined}],
  'claim_text not the built line':[{...line(wk),claim_text:'團體聲明｜自己寫的評語'}],
  'outside the period':[line({...wk,first_disclosed_on:'2026-10-10',publication_date:'2026-10-10'})],
  'Taiwan source':[line({...wk,source_country:'TW'})],
  'confirmed before checked':[line({...wk,reflect_confirmed_on:'2026-10-01'})],
  'bibliographic claim skips the crosscheck':[line({...wk,claim_class:'bibliographic',risk_tier:'low'})],
  'joint statement naming one issuer':[line({...wk,reflect_type:'joint_statement'})],
  'three items from one organisation':[1,2,3].map(i=>line({...wk,claim_id:'RF'+i,source_url:'https://example.org/r'+i,evidence_source_url:'https://example.org/r'+i}))};
 for(const [name,extra] of Object.entries(bad))assert.equal(weeklyAt(d,'2026-10-16_10-22',[featuredNew,...extra]).result.ok,false,name);
 assert.ok(weeklyAt(d,'2026-10-16_10-22',[{...featuredNew,reflect_type:'statement'}]).result.errors.some(e=>e.includes('belong to 國外反思選讀 items only')),'reflect fields stay off other items');
 assert.equal(weeklyAt(d,'2026-10-16_10-22',[featuredNew,line(wk)],h=>h.replace('文中表示','文中警告')).result.ok,false,'the line text comes only from the renderer');
 const joint=weeklyAt(d,'2026-10-16_10-22',[featuredNew,line({...wk,reflect_type:'joint_statement',reflect_partial:true,source_organization:'美國教師聯合會、Microsoft'})]);assert.deepEqual(joint.result.errors,[]);
 assert.ok(joint.html.includes('聯名聲明（含業者）｜美國教師聯合會、Microsoft')&&joint.html.includes('」（節譯）（首段）'),'joint statements and partial translations are labelled');
 assert.ok(weeklyAt(d,'2026-10-16_10-22',[featuredNew,line({...wk,source_url:featuredNew.source_url,evidence_source_url:featuredNew.source_url})]).result.errors.some(e=>e.includes('mark that item instead')),'no second copy of an issue item');
 // Monthly: this month or last month, at most eight, listed after the trend section.
 const m=setup();t.after(()=>fs.rmSync(m,{recursive:true,force:true}));
 const mr={...base,claim_id:'MR1',section:'reflection',first_disclosed_on:'2026-09-25',publication_date:'2026-09-25',reflect_type:'report',reflect_mixed:true,source_organization:'Example Policy Institute',source_url:'https://example.org/m-reflect',evidence_source_url:'https://example.org/m-reflect'};
 const mok=monthlySetup(m,[...monthlyBase(),line(mr)]);assert.deepEqual(mok.result.errors,[]);
 assert.ok(mok.html.includes('id="sec-reflection"')&&mok.html.includes(r.REFLECT_TYPES.report)&&mok.html.includes('（原文同時談機會與風險；此處只摘風險段落）'));
 assert.ok(mok.html.indexOf('id="sec-reflection"')<mok.html.indexOf('id="sec-background"'),'listed before the background');
 assert.ok(mok.html.includes('、國外反思選讀 1'),'counted in the month summary');
 assert.ok(mok.html.includes('本號另補上月回溯，至多 12 則。')&&mok.html.includes('本段只選批評與風險，不選正面評估'),'the October issue says it carries the look-back');
 assert.equal(monthlySetup(m,[...monthlyBase(),line({...mr,first_disclosed_on:'2026-08-30',publication_date:'2026-08-30'})]).result.ok,false,'older than last month');
 // The October 2026 issue carries the September look-back too: up to 12 there, 8 in later issues.
 const many=k=>Array.from({length:k},(_,i)=>line({...mr,claim_id:'MR'+i,source_organization:'Org '+Math.floor(i/2),source_url:'https://example.org/m'+i,evidence_source_url:'https://example.org/m'+i}));
 assert.deepEqual(monthlySetup(m,[...monthlyBase(),...many(12)]).result.errors,[]);
 assert.ok(monthlySetup(m,[...monthlyBase(),...many(13)]).result.errors.some(e=>e.includes('reflection items exceed 12')));
 assert.equal(r.reflectMonthlyMax('2026-11'),8);
 const empty=monthlySetup(m,monthlyBase());assert.deepEqual(empty.result.errors,[]);
 assert.ok(empty.html.includes('<section id="sec-reflection"><h3>國外反思選讀（只選批評與風險，非國外整體評價）</h3>')&&empty.html.includes('<p>本期未見符合條件的項目。</p>'),'an empty monthly section stays');
});
