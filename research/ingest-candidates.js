"use strict";
/* Offline, append-only source-discovery batches. No network, publishing or approval. */
const fs=require("node:fs"),path=require("node:path");
function day(s){if(typeof s!=="string"||!/^\d{4}-\d\d-\d\d$/.test(s))throw Error("invalid ISO date");const d=new Date(s+"T00:00:00Z");if(!Number.isFinite(+d)||d.toISOString().slice(0,10)!==s)throw Error("invalid calendar date");return d}
function canonical(url){if(typeof url!=="string")return "";try{const u=new URL(url);if(u.protocol!=="https:")return "";u.hash="";u.search="";return u.origin.toLowerCase()+u.pathname.replace(/\/+$/,"").toLowerCase()}catch{return ""}}
function key(c){return [c.doi&&"doi:"+String(c.doi).toLowerCase().replace(/^https?:\/\/doi.org\//,"").trim(),c.event_key&&"event:"+String(c.event_key).trim().toLowerCase(),canonical(c.source_url)&&"url:"+canonical(c.source_url)].filter(Boolean)}
function merge(worksheet,batch){
 if(!worksheet||!Array.isArray(worksheet.items)||!worksheet.period)throw Error("invalid worksheet");
 if(!batch||!Array.isArray(batch.candidates)||!Array.isArray(batch.sources)||!batch.sources.length)throw Error("batch requires candidates and source-coverage records");
 const today=day(batch.searched_on),start=day(worksheet.period.start),end=day(worksheet.period.end);
 if(today<start)throw Error("search date precedes week");
 for(const source of batch.sources)if(!source||!source.group||!source.query||!["ok","unavailable"].includes(source.status))throw Error("coverage requires group/query/status");
 const result=structuredClone(worksheet),existing=new Set(result.items.flatMap(key)),seen=new Set(),added=[],duplicates=[];
 for(const c of batch.candidates){
  if(!c||!canonical(c.source_url)||!c.source_title||!c.source_locator)throw Error("candidate needs https original URL/title/locator");
  const keys=key(c);if(keys.some(k=>existing.has(k)||seen.has(k))){duplicates.push(c.source_url);continue}
  const published=c.source_publication_date||"unknown";
  if(published!=="unknown")day(published);
  const backfill=published!=="unknown"&&day(published)<start;
  const uncertain=published==="unknown";
  const nextId="W"+worksheet.period.start+"-A"+String(result.items.length+1).padStart(2,"0");
  result.items.push({candidate_id:nextId,category:c.category||"news_policy",source_url:c.source_url,source_title:c.source_title,source_organization:c.source_organization||"unknown",source_publication_date:published,source_locator:c.source_locator,original_excerpt:c.original_excerpt||"",source_checked:false,claim_text:c.claim_text||"",claim_class:"descriptive",risk_tier:"medium",scope_limitation:c.scope_limitation||"Source not independently verified; not for publication.",translation_reviewed:false,conflict_unresolved:null,decision:"hold",ai_crosscheck_status:"not_started",ai_crosscheck_passes:0,ai_crosscheck_record:"",...(c.doi?{doi:c.doi}:{}),...(c.event_key?{event_key:c.event_key}:{}),screening_note:(backfill?"30-day backfill/background: earlier than issue period; ":"")+(uncertain?"Original publication date unknown; ":"")+"Discovery only, hold pending first-disclosure check."});
  keys.forEach(k=>seen.add(k));keys.forEach(k=>existing.add(k));added.push(nextId);
 }
 const searchRuns=result.search_runs||[];
 if(searchRuns.some(x=>x.batch_id===batch.batch_id))throw Error("batch_id already ingested");
 if(typeof batch.batch_id!=="string"||!batch.batch_id.trim())throw Error("batch_id required");
 searchRuns.push({batch_id:batch.batch_id,searched_on:batch.searched_on,lookback_days:30,sources:batch.sources,discovered:batch.candidates.length,added:added.length,duplicates:duplicates.length});
 result.search_runs=searchRuns;
 if(result.screening_summary){result.screening_summary.candidate_count=result.items.length;result.screening_summary.ready_to_publish=0;result.screening_summary.verified_for_publication=0}
 return {worksheet:result,added,duplicates};
}
function ingest(root,friday,batchFile){
 const {filename}=require("./scaffold-weekly.js").makeDraft(friday),file=path.join(root,"research","drafts",filename);
 const batch=JSON.parse(fs.readFileSync(batchFile,"utf8")),worksheet=JSON.parse(fs.readFileSync(file,"utf8"));
 const result=merge(worksheet,batch);
 fs.writeFileSync(file,JSON.stringify(result.worksheet,null,2)+"\n",{flag:"w"});
 return {file,added:result.added,duplicate_count:result.duplicates.length};
}
if(require.main===module)try{const [friday,batchFile,root="."]=process.argv.slice(2);if(!friday||!batchFile)throw Error("Usage: node research/ingest-candidates.js FRIDAY batch.json [root]");console.log(JSON.stringify(ingest(path.resolve(root),friday,batchFile)))}catch(e){console.error(e.message);process.exitCode=1}
module.exports={merge,ingest};
