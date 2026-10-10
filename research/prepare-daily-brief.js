"use strict";
/* Offline editorial briefing only; never certifies, approves, registers or publishes. */
const fs=require("node:fs"),path=require("node:path");
const {makeDraft}=require("./scaffold-weekly.js");
const {PUBLISHABLE,CHANNEL_AUDIENCES}=require("./ai-literacy-scope.js");
const {reviewStateErrors,pendingReviews}=require("./source-review-state.js");
function validWorksheet(value){
 const iso=s=>typeof s==="string"&&/^\d{4}-\d{2}-\d{2}$/.test(s)&&Number.isFinite(Date.parse(s+"T00:00:00Z"))&&new Date(s+"T00:00:00Z").toISOString().slice(0,10)===s;
 return reviewStateErrors(value).length===0&&value.period&&iso(value.period.start)&&iso(value.period.end)&&value.period.start<=value.period.end&&
  Array.isArray(value.search_runs)&&value.search_runs.every(x=>x&&typeof x==="object"&&!Array.isArray(x)&&Array.isArray(x.sources)&&x.sources.every(s=>s&&typeof s==="object"&&!Array.isArray(s)));
}
function dailyBrief(worksheet,issueDate){
 if(typeof issueDate!=="string")throw Error("invalid issue date");
 const date=new Date(issueDate+"T00:00:00Z");
 if(!/^\d{4}-\d{2}-\d{2}$/.test(issueDate)||!Number.isFinite(+date)||date.toISOString().slice(0,10)!==issueDate)throw Error("invalid issue date");
 const yesterday=new Date(+date-86400000).toISOString().slice(0,10);
 if(!validWorksheet(worksheet))throw Error("invalid cumulative worksheet");
 const runs=worksheet.search_runs.filter(x=>x.searched_on===yesterday);
 const items=worksheet.items.filter(x=>x.discovered_on===yesterday||x.verification_completed_on===yesterday||runs.some(run=>x.discovery_batch_id===run.batch_id));
 const related=[...(worksheet.cross_week_updates||[]),...(worksheet.unresolved_duplicate_discoveries||[]),...worksheet.items.flatMap(x=>x.source_updates||[])].filter(x=>x.discovered_on===yesterday||x.searched_on===yesterday);
 const pending=[],background=[],excluded=[];
 for(const c of items){
  const older=typeof c.source_publication_date==="string"&&c.source_publication_date!=="unknown"&&c.source_publication_date<worksheet.period.start;
  const o={candidate_id:c.candidate_id,title:c.source_title,source_url:c.source_url,discovered_on:c.discovered_on,source_publication_date:c.source_publication_date,first_disclosed_on:c.first_disclosed_on||null,decision:c.decision,reason:"Not certified or approved; requires original-source review."};
  if(older){o.reason="Earlier source publication: background only, not this week's new event";background.push(o)}
  else if(c.screening_disposition==="exclude"){o.reason="Marked excluded at screening";excluded.push(o)}
  else pending.push(o);
 }
 const eligible=c=>c.decision==="publish"&&c.source_checked===true&&c.conflict_unresolved===false&&
  c.first_disclosed_on===c.source_publication_date&&c.verification_completed_on===yesterday&&
  c.screening_disposition!=="exclude"&&PUBLISHABLE.includes(c.ai_lit_class)&&CHANNEL_AUDIENCES.daily.includes(c.audience)&&
  c.source_publication_date>=worksheet.period.start&&c.source_publication_date<=yesterday&&pendingReviews([worksheet],c).length===0;
 return {issue_date:issueDate,collection_date:yesterday,status:"editorial_review_only_not_for_publication",suggested_for_publication:items.filter(eligible).map(c=>({candidate_id:c.candidate_id,source_url:c.source_url,review_only:true})),pending,background,excluded,source_updates:related,coverage:runs.map(x=>({batch_id:x.batch_id,sources:x.sources,discovered:x.discovered,added:x.added})),notice:"AI shortlist is not actual source verification, editorial approval, or permission to publish."};
}
function markdown(x){
 const rows=(xs)=>xs.length?xs.map(v=>"- "+v.candidate_id+"｜"+v.title+"｜"+v.source_publication_date+"｜"+v.reason+"｜"+v.source_url).join("\n"):"（無）";
 return "# K–12 AI 素養每日快訊待審包（非正式刊物）\n\n蒐集日："+x.collection_date+"；編輯日："+x.issue_date+"\n\n**未有核准快訊；不可自動發布。**\n\n## 待查\n"+rows(x.pending)+"\n\n## 跨期背景\n"+rows(x.background)+"\n\n## 排除\n"+rows(x.excluded)+"\n\n## 搜尋覆蓋\n"+(x.coverage.length?x.coverage.map(z=>"- "+z.batch_id+"："+z.sources.map(y=>y.group+"/"+y.status+" ("+y.query+")").join("；")).join("\n"):"（無已記錄批次，不代表當日全球無新聞）")+"\n\n## 跨週更新待複核\n"+(x.source_updates.length?x.source_updates.map(z=>"- "+z.source_url+"｜"+(z.note||"重複事件：更新內容待核對")).join("\n"):"（無）")+"\n\n"+x.notice+"\n"
}
function readWorksheet(dir,file){
 try{
  const value=JSON.parse(fs.readFileSync(path.join(dir,file),"utf8"));
  // Only the known pre-search_runs empty scaffold is compatible. Do not hide
  // malformed values or silently discard missing coverage on populated drafts.
  if(value?.schema_version===1&&value.status==="draft_pending_source_verification"&&
    Array.isArray(value.items)&&value.items.length===0&&value.item_template&&
    !Object.hasOwn(value,"search_runs")&&!value.cross_week_updates&&!value.unresolved_duplicate_discoveries)value.search_runs=[];
  if(!validWorksheet(value)||file!==value.period.start+"_"+value.period.end+".json")throw Error("invalid cumulative worksheet");
  return value;
 }catch(e){throw Error(file+": "+e.message)}
}
function uniqueRecords(records){
 const stable=value=>Array.isArray(value)?value.map(stable):value&&typeof value==="object"?Object.fromEntries(Object.keys(value).sort().map(k=>[k,stable(value[k])])):value;
 const seen=new Set();return records.filter(value=>{const key=JSON.stringify(stable(value));if(seen.has(key))return false;seen.add(key);return true});
}
function create(root,issueDate){
 if(typeof issueDate!=="string"||!/^\d{4}-\d{2}-\d{2}$/.test(issueDate)||!Number.isFinite(Date.parse(issueDate+"T00:00:00Z"))||new Date(issueDate+"T00:00:00Z").toISOString().slice(0,10)!==issueDate)throw Error("invalid issue date");
 const yesterday=new Date(Date.parse(issueDate+"T00:00:00Z")-86400000).toISOString().slice(0,10);
 const d=new Date(yesterday+"T00:00:00Z");const day=(d.getUTCDay()+2)%7;
 const friday=new Date(+d-day*86400000).toISOString().slice(0,10);
 const name=makeDraft(friday).filename;
 const dir=path.join(root,"research","drafts"),worksheet=readWorksheet(dir,name);
 const brief=dailyBrief(worksheet,issueDate);
 const sheets=[worksheet];
 // Late verification and corrections may live in an earlier week's worksheet.
 // Review them against the current period; never inherit old publication suggestions.
 for(const file of fs.readdirSync(dir).filter(n=>/^\d{4}-\d{2}-\d{2}_\d{4}-\d{2}-\d{2}\.json$/.test(n)&&n<name).sort()){
  const old=readWorksheet(dir,file);
  sheets.push(old);
  let history;try{history=dailyBrief({...old,period:worksheet.period},issueDate)}catch(e){throw Error(file+": "+e.message)}
  brief.background.push(...history.background,...history.pending.map(item=>({...item,reason:"Earlier worksheet: background only, not this week's new event"})));
  brief.excluded.push(...history.excluded);
  brief.source_updates.push(...history.source_updates);
 }
 brief.suggested_for_publication=brief.suggested_for_publication.filter(suggestion=>{
  const candidate=worksheet.items.find(item=>item.candidate_id===suggestion.candidate_id);
  const unresolved=pendingReviews(sheets,candidate);brief.source_updates.push(...unresolved);return unresolved.length===0;
 });
 for(const field of ["background","excluded","source_updates"])brief[field]=uniqueRecords(brief[field]);
 return brief;
}
if(require.main===module)try{const [date,root="."]=process.argv.slice(2);if(!date)throw Error("Usage: node research/prepare-daily-brief.js YYYY-MM-DD [root]");process.stdout.write(markdown(create(path.resolve(root),date)))}catch(e){console.error(e.message);process.exitCode=1}
module.exports={dailyBrief,markdown,create};
