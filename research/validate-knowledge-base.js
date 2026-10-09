"use strict";
/* v1.7 knowledge-base: local data-only; deliberately no publication writes. */
const fs=require("node:fs"),path=require("node:path");
const base=path.join(__dirname,"knowledge-base");
function parseCsv(s){
 const rows=[];let row=[],value="",q=false;
 for(let i=0;i<s.length;i++){const c=s[i];
  if(q){if(c==='"'&&s[i+1]==='"'){value+='"';i++}else if(c==='"')q=false;else value+=c}
  else if(c==='"'){if(value!=="")throw Error("malformed CSV quote");q=true}
  else if(c===","){row.push(value);value=""}
  else if(c==="\n"){row.push(value);rows.push(row);row=[];value=""}
  else if(c==="\r"){if(s[i+1]!=="\n")throw Error("invalid CR")}
  else value+=c;
 }
 if(q)throw Error("unclosed CSV quote");
 if(value!==""||row.length){row.push(value);rows.push(row)}
 if(!rows.length)throw Error("empty CSV");
 const keys=rows.shift();
 return rows.filter(x=>x.some(Boolean)).map(x=>{if(x.length!==keys.length)throw Error("CSV width mismatch");return Object.fromEntries(keys.map((k,i)=>[k,x[i]]))});
}
function read(name){return parseCsv(fs.readFileSync(path.join(base,"data",name+".csv"),"utf8"))}
function dateOk(s,p){
 if(p==="unknown")return s==="";
 if(p==="year")return /^\d{4}$/.test(s);
 if(p==="month")return /^\d{4}-(0[1-9]|1[0-2])$/.test(s);
 if(p==="day"){if(!/^\d{4}-\d{2}-\d{2}$/.test(s))return false;const d=new Date(s+"T00:00:00Z");return !Number.isNaN(+d)&&d.toISOString().slice(0,10)===s}
 return false;
}
function validate(records,relations,runs,candidates){
 const errors=[],ids=new Set(),groups=new Set(records.map(x=>x.work_group_id).filter(Boolean));
 const check=(ok,msg)=>{if(!ok)errors.push(msg)};
 for(const x of records){
  check(/^KB-\d{4}-\d{4,}$/.test(x.record_id),"invalid record ID: "+x.record_id);
  check(!ids.has(x.record_id),"duplicate ID: "+x.record_id);ids.add(x.record_id);
  check(!!x.title&&!!x.record_type,"missing title/type: "+x.record_id);
  try{const u=new URL(x.primary_url);check(u.protocol==="https:"&&!u.username&&!u.password,"unsafe URL: "+x.record_id)}catch{errors.push("invalid URL: "+x.record_id)}
  check(dateOk(x.first_published_on,x.date_precision),"invalid date precision: "+x.record_id);
  check(["unknown","first_publication","issue_year","event_year"].includes(x.year_basis),"invalid year basis: "+x.record_id);
  check((x.year_basis==="unknown"&&x.year_value==="")||(x.year_basis!=="unknown"&&/^\d{4}$/.test(x.year_value)),"invalid year basis/value: "+x.record_id);
  if(x.year_basis==="first_publication")check(x.first_published_on!==""&&x.year_value===x.first_published_on.slice(0,4),"year/first date mismatch: "+x.record_id);
  check(["discovered_unverified","bibliographic_checked","content_checked"].includes(x.verification_status),"bad verification status: "+x.record_id);
  if(x.source_candidate_id&&candidates){
   const c=candidates.find(c=>c.candidate_id===x.source_candidate_id);
   check(!!c&&c.source_url===x.primary_url&&c.source_title===x.title,"candidate trace mismatch: "+x.record_id);
   if(c)check(c.decision==="hold"||x.verification_status!=="discovered_unverified","uncertified source misclassified: "+x.record_id);
  }
 }
 const relationsIds=new Set(),allowed=["record","work","source","vocabulary"];const vocab=["K1","K2","K3","K4","K5","K6"];
 for(const x of relations){
  check(!!x.relation_id&&!relationsIds.has(x.relation_id),"duplicate/missing relation ID");relationsIds.add(x.relation_id);
  check(ids.has(x.subject_id),"unknown relation subject: "+x.subject_id);
  check(allowed.includes(x.object_namespace),"unknown namespace: "+x.relation_id);
  if(x.object_namespace==="record")check(ids.has(x.object_id),"unknown target record: "+x.object_id);
  if(x.object_namespace==="work")check(groups.has(x.object_id),"unknown work group: "+x.object_id);
  if(x.object_namespace==="vocabulary"&&x.predicate==="has_category")check(vocab.includes(x.object_id),"unknown category: "+x.object_id);
  if(x.object_namespace==="source")check(/^(J(?:0[1-9]|[1-3][0-9]|4[0-7])|C(?:0[1-9]|1[0-8]|20|21|22)|O-[A-Z0-9-]+)$/.test(x.object_id),"invalid source ID: "+x.object_id);
  check(x.verification_status==="discovered_unverified"||x.verification_status==="bibliographic_checked"||x.verification_status==="content_checked","invalid relation status: "+x.relation_id);
  if(x.predicate==="has_category")check(x.object_namespace==="vocabulary"&&vocab.includes(x.object_id),"invalid category relation: "+x.relation_id);
  if(x.predicate==="published_in")check(x.object_namespace==="source"&&/^[JC]/.test(x.object_id),"invalid venue relation: "+x.relation_id);
  if(x.predicate==="issued_by")check(x.object_namespace==="source"&&x.object_id.startsWith("O-"),"invalid issuing agency: "+x.relation_id);
 }
 const runIds=new Set();
 for(const x of runs){
  check(!!x.run_id&&!runIds.has(x.run_id),"duplicate/missing run ID");runIds.add(x.run_id);
  check(dateOk(x.searched_on,"day"),"bad search date");
  check(["entry_only","query_scoped","items_screened","full_text_checked"].includes(x.coverage_level),"bad coverage level");
  check(["ok","partial","unavailable"].includes(x.status),"bad search status");
  const nums=[x.results_seen,x.results_screened,x.results_recorded].map(v=>v===""?null:Number(v));
  check(nums.every(v=>v===null||(Number.isInteger(v)&&v>=0)),"invalid search count");
  if(nums.every(v=>v!==null))check(nums[2]<=nums[1]&&nums[1]<=nums[0],"inconsistent search counts");
  if(x.status==="unavailable")check(nums.every(v=>v===null),"unavailable source cannot claim zero results");
 }
 return errors;
}
function index(records,relations){
 const buckets=new Map();
 const add=(k,x)=>{if(!buckets.has(k))buckets.set(k,new Set());buckets.get(k).add(x)};
 for(const x of records){
  add("by-year/"+(x.year_value||"unknown")+"/"+(x.year_basis||"unknown"),x.record_id);
  add("by-type/"+x.record_type,x.record_id);
 }
 const relationsIndex={has_category:"by-category",applies_to_country:"by-country",studies_country:"by-country",published_in:"by-source",issued_by:"by-source",has_topic:"by-topic"};
 for(const rel of relations){
  const p=relationsIndex[rel.predicate];
  if(p){
   add(p+"/"+rel.object_id,rel.subject_id);
   if(rel.predicate==="published_in"&&rel.object_id.startsWith("J"))add("by-journal/"+rel.object_id,rel.subject_id);
   if(rel.predicate==="published_in"&&rel.object_id.startsWith("C"))add("by-conference/"+rel.object_id,rel.subject_id);
  }
 }
 const result={};
 for(const k of [...buckets.keys()].sort())result[k]=[...buckets.get(k)].sort();
 return JSON.stringify(result,null,2)+"\n";
}
function main(){
 const records=read("records"),relations=read("relations"),runs=read("search_runs");
 const candidates=JSON.parse(fs.readFileSync(path.join(__dirname,"drafts","2026-10-09_2026-10-15.json"),"utf8")).items;
 const errors=validate(records,relations,runs,candidates);
 if(errors.length){console.error(errors.join("\n"));process.exitCode=1;return}
 const output=path.join(base,"indexes","index.json"),text=index(records,relations);
 if(process.argv.includes("--write-index")){fs.mkdirSync(path.dirname(output),{recursive:true});fs.writeFileSync(output,text)}
 else if(fs.existsSync(output)&&fs.readFileSync(output,"utf8")!==text){console.error("stale index");process.exitCode=1;return}
 else if(!fs.existsSync(output)){console.error("missing index");process.exitCode=1;return}
 console.log("v1.7 knowledge base valid",records.length,"records",relations.length,"relations",runs.length,"search runs");
}
if(require.main===module)main();
module.exports={parseCsv,dateOk,validate,index};
