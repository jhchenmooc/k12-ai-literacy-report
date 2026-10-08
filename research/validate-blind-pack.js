"use strict";
const fs=require("node:fs"),path=require("node:path");
const VALID=["supported","partially_supported","unsupported","cannot_determine"];
function inspect(pack,requireReady=false){
 const errors=[],warnings=[];
 if(!pack||!Array.isArray(pack.cases))return {ok:false,errors:["cases array missing"],warnings};
 if(pack.cases.length<50||pack.cases.length>100)errors.push("case count must be 50..100");
 const ids=new Set(),groups=new Map();
 for(const c of pack.cases){
  if(!c||typeof c!=="object"){errors.push("invalid record");continue}
  if(!/^BLIND-[NR][0-9]{2}-[0-9]{2}$/.test(c.case_id||""))errors.push("bad case_id");
  if(ids.has(c.case_id))errors.push("duplicate case "+c.case_id);ids.add(c.case_id);
  if(typeof c.claim!=="string"||c.claim.length<12)errors.push("missing substantive claim "+c.case_id);
  if(!/^https:\/\//.test(c.source_url||""))errors.push("source url missing "+c.case_id);
  if(!["news","research"].includes(c.domain))errors.push("invalid domain "+c.case_id);
  if("expected" in c||"gold_label" in c||"answer" in c)errors.push("answer leakage in reviewer candidate "+c.case_id);
  groups.set(c.source_group,(groups.get(c.source_group)||0)+1);
  if(!c.source_excerpt||!c.source_locator){
   if(requireReady)errors.push("source excerpt/locator not reviewed "+c.case_id);
   else warnings.push("source not yet staged "+c.case_id);
  }
  if(requireReady&&c.source_verification!=="verified_by_human")errors.push("original text not independently checked "+c.case_id);
 }
 if(groups.size!==10)errors.push("expected ten source themes");
 if([...groups.values()].some(n=>n!==6))errors.push("expected six statements per theme");
 if(requireReady&&pack.status!=="READY_FOR_REVIEW")errors.push("pack must be marked ready only after evidence checked");
 return {ok:errors.length===0,errors,warnings,count:pack.cases.length,staged:pack.cases.filter(x=>!!x.source_excerpt&&!!x.source_locator).length,ready:requireReady};
}
function inspectAdjudications(pack,ratings){
 const errors=[],cases=new Set(pack.cases.map(x=>x.case_id)),byCase=new Map();
 for(const r of ratings){
  if(!cases.has(r.case_id))errors.push("unknown case");
  if(!VALID.includes(r.verdict))errors.push("invalid verdict "+r.case_id);
  if(!r.reviewer_id||!r.reviewed_at||!r.source_locator||!r.reasoning)errors.push("incomplete review "+r.case_id);
  if(!byCase.has(r.case_id))byCase.set(r.case_id,[]);
  byCase.get(r.case_id).push(r);
 }
 for(const c of cases){const rs=byCase.get(c)||[];if(rs.length<2)errors.push("fewer than two reviews "+c);if(rs.length>=2&&rs[0].reviewer_id===rs[1].reviewer_id)errors.push("reviewer not independent "+c)}
 return {ok:errors.length===0,errors,reviewed_cases:byCase.size};
}
if(require.main===module){const pack=JSON.parse(fs.readFileSync(path.resolve(process.argv[2]||"research/benchmarks/blind-review-candidates-60.json"),"utf8"));const ready=process.argv.includes("--ready");const r=inspect(pack,ready);console.log(JSON.stringify({ok:r.ok,count:r.count,staged:r.staged,ready:r.ready,errors:r.errors,unverified_count:r.warnings.length},null,2));if(!r.ok)process.exitCode=1}
module.exports={inspect,inspectAdjudications};
