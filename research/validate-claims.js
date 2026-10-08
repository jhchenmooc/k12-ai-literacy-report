/**
 * K-12 AI literacy: structural publication gate.
 * This checks presence/logic only. It does not verify source truth.
 * Run: node research/validate-claims.js [claims.json]
 */
"use strict";
const rank={ "N-U":0,"N-V1":1,"N-V2":2,"N-V3":3,"U":0,"V1":1,"V2":2,"V3":3 };
function check(c){
  const reasons=[];
  if(!c||typeof c!=="object")return {allow:false,reasons:["invalid record"]};
  if(!["news_policy","research"].includes(c.kind))reasons.push("invalid kind");
  if(!["bibliographic","descriptive","high_impact"].includes(c.claim_class))reasons.push("invalid claim class");
  if(typeof c.claim_text!=="string"||!c.claim_text.trim())reasons.push("missing claim");
  if(!["low","medium","high"].includes(c.risk_tier))reasons.push("missing or invalid risk_tier");
  if(c.claim_class==="high_impact"&&c.risk_tier!=="high")reasons.push("high-impact must be high risk");
  if(c.claim_class==="descriptive"&&c.risk_tier==="low")reasons.push("descriptive claim cannot be low risk");
  if(c.risk_tier==="high")reasons.push("high-risk claim requires separate editorial review and cannot be auto-published");
  // Conservative surface-level flags; not a semantic truth or risk assessment.
  if(c.risk_tier!=="high"&&/(全國.*(強制|必須|上路|生效)|已.*(生效|強制)|證明.*(成效|提升)|證實.*(因果|提高|提升)|顯著(提高|改善|提升)|RCT.*(證明|有效)|因果效果|長期.*(提升|改善)|所有.*(學生|教師).*(有效|提升))/.test(c.claim_text||""))reasons.push("potential high-risk assertion must be held for review");
  for(const field of ["claim_id","source_url","source_locator","checked_at","publication_date","source_type"]){
    if(typeof c[field]!=="string"||!c[field].trim())reasons.push("missing "+field);
  }
  if(typeof c.source_url==="string"&&!/^https:\/\//.test(c.source_url))reasons.push("source url must be https");
  if(c.source_checked!==true)reasons.push("original source not checked");
  const allowed=c.kind==="news_policy"?["N-U","N-V1","N-V2","N-V3"]:["U","V1","V2","V3"];
  if(!allowed.includes(c.level))reasons.push("invalid verification level");
  const need=c.claim_class==="bibliographic"?1:c.claim_class==="descriptive"?2:3;
  if((rank[c.level]??0)<need)reasons.push("insufficient level");
  if(need>=2&&c.scope_checked!==true)reasons.push("scope not checked");
  if(need>=3&&c.outcome_checked!==true)reasons.push("outcome not checked");
  if(need>=3&&c.independent_review!==true)reasons.push("independent human review missing");
  // Two isolated AI passes are metadata and cannot prove genuine independence.
  // Do not require human labels for low/medium; never allow their absence to
  // silently upgrade a claim to a high-risk finding.
  if(c.risk_tier==="medium"){
    if(c.ai_crosscheck_status!=="concordant")reasons.push("medium risk needs two-pass agreement");
    if(c.ai_crosscheck_passes!==2)reasons.push("medium risk needs two review passes");
    if(typeof c.ai_crosscheck_record!=="string"||c.ai_crosscheck_record.trim().length<12)reasons.push("medium risk crosscheck trace missing");
  }
  if(!["publish","hold"].includes(c.decision))reasons.push("invalid or missing decision");
  if(c.conflict_unresolved!==false)reasons.push("unresolved or unknown conflict");
  const allow=reasons.length===0;
  if(c.decision==="publish"&&!allow)reasons.push("invalid publication decision");
  return {allow,reasons};
}
if(require.main===module){
 const fs=require("fs");
 const input=process.argv[2];
 if(!input){console.error("Usage: node research/validate-claims.js file.json");process.exit(2)}
 const rows=JSON.parse(fs.readFileSync(input,"utf8"));
 const result=rows.map((c)=>({id:c.claim_id,...check(c)}));
 console.log(JSON.stringify(result,null,2));
 if(result.some(x=>!x.allow&&rows.find(c=>c.claim_id===x.id)?.decision==="publish"))process.exit(1);
}
module.exports={check};
