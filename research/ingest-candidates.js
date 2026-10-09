"use strict";
/* Offline, append-only source-discovery batches. No network, publishing or approval. */
const fs=require("node:fs"),path=require("node:path");
const {candidateScope}=require("./ai-literacy-scope.js");
function day(s){if(typeof s!=="string"||!/^\d{4}-\d\d-\d\d$/.test(s))throw Error("invalid ISO date");const d=new Date(s+"T00:00:00Z");if(!Number.isFinite(+d)||d.toISOString().slice(0,10)!==s)throw Error("invalid calendar date");return d}
function canonical(url){
 if(typeof url!=="string")return "";
 try{
  const u=new URL(url);if(u.protocol!=="https:"||u.username||u.password)return "";
  u.hash="";
  // Preserve path case, trailing slash, unknown parameters and their order.
  // Only these explicitly identified tracking parameters lack source identity.
  const parts=u.search.slice(1).split("&"),kept=parts.filter(part=>{
   let key=part.split("=",1)[0];try{key=decodeURIComponent(key.replace(/\+/g," "))}catch{return true}
   return !/^(utm_[a-z0-9_]+|fbclid|gclid|dclid|msclkid|mc_cid|mc_eid)$/i.test(key);
  });
  // Avoid URLSearchParams re-encoding identity parameters while removing tracking.
  if(kept.length!==parts.length)u.search=kept.length?"?"+kept.join("&"):"";
  return u.toString();
 }catch{return ""}
}
function key(c){return [c.doi&&"doi:"+String(c.doi).toLowerCase().replace(/^https?:\/\/doi.org\//,"").trim(),c.event_key&&"event:"+String(c.event_key).trim().toLowerCase(),canonical(c.source_url)&&"url:"+canonical(c.source_url)].filter(Boolean)}
function merge(worksheet,batch,history=[]){
 if(!Array.isArray(history))throw Error("invalid history");
 if(!worksheet||!Array.isArray(worksheet.items)||!worksheet.period)throw Error("invalid worksheet");
 if(!batch||!Array.isArray(batch.candidates)||!Array.isArray(batch.sources)||!batch.sources.length)throw Error("batch requires candidates and source-coverage records");
 // Validate the entire batch before a duplicate branch can discard bad input.
 for(const c of batch.candidates)if(c&&Object.hasOwn(c,"update_note")&&typeof c.update_note!=="string")throw Error("update_note must be a string when provided");
 const today=day(batch.searched_on),start=day(worksheet.period.start),end=day(worksheet.period.end);
 if(today<start||today>end)throw Error("search date outside selected week");
 for(const source of batch.sources)if(!source||!source.group||!source.query||!["ok","unavailable"].includes(source.status))throw Error("coverage requires group/query/status");
 const result=structuredClone(worksheet),existing=new Set(result.items.flatMap(key)),prior=new Map(),seen=new Set(),added=[],duplicates=[];
 for(const item of history.flatMap(w=>w.items||[]))for(const k of key(item))if(!prior.has(k))prior.set(k,item.candidate_id);
 if(typeof batch.batch_id!=="string"||!batch.batch_id.trim()||[result,...history].some(w=>(w.search_runs||[]).some(x=>x.batch_id===batch.batch_id)))throw Error("batch_id missing or already ingested");
 for(const c of batch.candidates){
  if(!c||!canonical(c.source_url)||!c.source_title||!c.source_locator)throw Error("candidate needs https original URL/title/locator");
  const keys=key(c);if(keys.some(k=>existing.has(k)||seen.has(k)||prior.has(k))){
   duplicates.push(c.source_url);
   const match=result.items.find(item=>key(item).some(k=>keys.includes(k)));
   const ref=match?.candidate_id||keys.map(k=>prior.get(k)).find(Boolean);
   if(!c.update_note?.trim())result.unresolved_duplicate_discoveries=[...(result.unresolved_duplicate_discoveries||[]),{searched_on:batch.searched_on,batch_id:batch.batch_id,source_url:c.source_url,related_candidate_id:ref||null,review_required:true}];
   if(c.update_note?.trim()){
     const update={discovered_on:batch.searched_on,batch_id:batch.batch_id,source_url:c.source_url,related_candidate_id:ref||null,note:c.update_note.slice(0,350),review_required:true};
     if(match)match.source_updates=[...(match.source_updates||[]),update];
     else result.cross_week_updates=[...(result.cross_week_updates||[]),update];
   }
   continue
  }
  const scope=candidateScope(c);
  const published=c.source_publication_date||"unknown";
  if(published!=="unknown"&&day(published)>today)throw Error("source publication date is in the future");
  if(published!=="unknown")day(published);
  const backfill=published!=="unknown"&&day(published)<start;
  const uncertain=published==="unknown";
  const nextId="W"+worksheet.period.start+"-A"+String(result.items.length+1).padStart(2,"0");
  result.items.push({candidate_id:nextId,category:c.category||"news_policy",source_url:c.source_url,source_title:c.source_title,source_organization:c.source_organization||"unknown",source_publication_date:published,source_locator:c.source_locator,discovered_on:batch.searched_on,discovery_batch_id:batch.batch_id,first_disclosed_on:null,source_updates:[],original_excerpt:c.original_excerpt||"",source_checked:false,claim_text:c.claim_text||"",claim_class:"descriptive",risk_tier:"medium",scope_limitation:c.scope_limitation||"Source not independently verified; not for publication.",translation_reviewed:false,conflict_unresolved:null,decision:"hold",ai_crosscheck_status:"not_started",ai_crosscheck_passes:0,ai_crosscheck_record:"",...scope,...(c.doi?{doi:c.doi}:{}),...(c.event_key?{event_key:c.event_key}:{}),screening_note:(backfill?"30-day backfill/background: earlier than issue period; ":"")+(uncertain?"Original publication date unknown; ":"")+"Discovery only, hold pending first-disclosure check."});
  keys.forEach(k=>seen.add(k));keys.forEach(k=>existing.add(k));added.push(nextId);
 }
 const searchRuns=result.search_runs||[];
 
 searchRuns.push({batch_id:batch.batch_id,searched_on:batch.searched_on,lookback_days:Number.isInteger(batch.lookback_days)&&batch.lookback_days>=0?batch.lookback_days:null,lookback_days_target:30,sources:batch.sources,discovered:batch.candidates.length,added:added.length,duplicates:duplicates.length});
 result.search_runs=searchRuns;
 if(result.screening_summary){result.screening_summary.candidate_count=result.items.length}
 return {worksheet:result,added,duplicates};
}
function ingest(root,friday,batchFile){
 const {filename}=require("./scaffold-weekly.js").makeDraft(friday),file=path.join(root,"research","drafts",filename),dir=path.dirname(file);
 const lock=file+".lock";let handle;
 // Exclusive writer lock protects read/merge/replace, not just atomic renaming.
 try{
  handle=fs.openSync(lock,"wx");
  const batch=JSON.parse(fs.readFileSync(batchFile,"utf8")),worksheet=JSON.parse(fs.readFileSync(file,"utf8"));
  const history=fs.readdirSync(dir).filter(n=>/^\d{4}-\d{2}-\d{2}_\d{4}-\d{2}-\d{2}\.json$/.test(n)&&n!==filename).map(n=>JSON.parse(fs.readFileSync(path.join(dir,n),"utf8")));
  const result=merge(worksheet,batch,history),tmp=file+".tmp-"+process.pid;
  try{fs.writeFileSync(tmp,JSON.stringify(result.worksheet,null,2)+"\n",{flag:"wx"});fs.renameSync(tmp,file)}
  finally{if(fs.existsSync(tmp))fs.unlinkSync(tmp)}
  return {file,added:result.added,duplicate_count:result.duplicates.length};
 }finally{
  if(handle!==undefined){fs.closeSync(handle);fs.unlinkSync(lock)}
 }
}
if(require.main===module)try{const [friday,batchFile,root="."]=process.argv.slice(2);if(!friday||!batchFile)throw Error("Usage: node research/ingest-candidates.js FRIDAY batch.json [root]");console.log(JSON.stringify(ingest(path.resolve(root),friday,batchFile)))}catch(e){console.error(e.message);process.exitCode=1}
module.exports={merge,ingest,canonical};
