"use strict";
/* Shared veto only: this never certifies a candidate or permits publication. */
const {canonical}=require("./ingest-candidates.js");
const record=value=>!!value&&typeof value==="object"&&!Array.isArray(value);
function reviewStateErrors(sheet){
 const errors=[];
 if(!record(sheet)||!Array.isArray(sheet.items))return ["items must be an array"];
 const updates=value=>Array.isArray(value)&&value.every(x=>record(x)&&typeof x.review_required==="boolean");
 for(const item of sheet.items){
  if(!record(item)){errors.push("invalid candidate item");continue}
  if(item.source_updates!==undefined&&!updates(item.source_updates))errors.push("invalid source_updates");
 }
 for(const field of ["cross_week_updates","unresolved_duplicate_discoveries"])
  if(sheet[field]!==undefined&&!updates(sheet[field]))errors.push("invalid "+field);
 return errors;
}
function pendingReviews(sheets,candidate){
 const url=canonical(candidate.source_url),ids=new Set(candidate.candidate_id?[candidate.candidate_id]:[]);
 const matches=item=>(!!url&&canonical(item.source_url)===url)||(!!item.candidate_id&&ids.has(item.candidate_id));
 for(const sheet of sheets)for(const item of sheet.items)if(matches(item)&&item.candidate_id)ids.add(item.candidate_id);
 const rows=[];
 for(const sheet of sheets){
  for(const item of sheet.items)if(matches(item))rows.push(...(item.source_updates||[]));
  for(const update of [...(sheet.cross_week_updates||[]),...(sheet.unresolved_duplicate_discoveries||[])])
   if((!!url&&canonical(update.source_url)===url)||(!!update.related_candidate_id&&ids.has(update.related_candidate_id)))rows.push(update);
 }
 return rows.filter(x=>x.review_required===true);
}
module.exports={reviewStateErrors,pendingReviews};
