"use strict";
/* Deliberately limited high-recall lexical triage. Never auto-approve a claim. */
const fs=require("node:fs"),path=require("node:path");
const RULES=[
 ["universal_or_cross_scope",/所有|全國|全面|各國|全球|普遍|一般學校|臺灣國小|臺灣K-12|中小學生|國小學生|國小、國中和高中/],
 ["strong_causation",/證實|證明|必然|造成|提高了|顯著提升|學習成效|學業成績|客觀考試|長期批判思考|成績優於/],
 ["binding_policy",/必須|強制|法令|正式.*上路|已正式承認|正式政策|已.*採用/],
 ["research_design_claim",/隨機對照試驗|實驗證明|直接證據|無須.*驗證|等同.*課綱/]
];
function triage(claim){
 if(typeof claim!=="string")return {decision:"review",flags:["invalid_text"]};
 const flags=RULES.filter(([,pattern])=>pattern.test(claim)).map(([name])=>name);
 return {decision:"review",flags}; // NEVER 'publish': flags are warnings, not a finding of falsity
}
function evaluate(cases){
 const rows=cases.map(c=>({...c,...triage(c.claim),flagged:triage(c.claim).flags.length>0}));
 const bad=rows.filter(x=>x.expected==="unsupported"),good=rows.filter(x=>x.expected==="supported_with_scope");
 const FN=bad.filter(x=>!x.flagged).length,TP=bad.length-FN,FP=good.filter(x=>x.flagged).length,TN=good.length-FP;
 return {total:rows.length,unsupported:bad.length,supported:good.length,TP,FN,FP,TN,flag_recall:bad.length?TP/bad.length:null,false_negative_rate:bad.length?FN/bad.length:null,false_positive_rate:good.length?FP/good.length:null,undetected:bad.filter(x=>!x.flagged).map(x=>x.case_id),note:"Metric against provisional synthetic labels only; not a measured real-world error rate or independent gold validation."};
}
if(require.main===module){const file=process.argv[2]||path.join(__dirname,"benchmarks/semantic-cases-2026-10.json");const data=JSON.parse(fs.readFileSync(file,"utf8"));console.log(JSON.stringify(evaluate(data.cases),null,2));}
module.exports={triage,evaluate};
