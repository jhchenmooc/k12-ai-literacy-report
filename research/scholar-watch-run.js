"use strict";
/* Scholar-watch search runs (research/scholar-watch-usage-spec.md, watchlist section 5).
   Network only in `fetch` (OpenAlex). No email, mailto or key is ever added; the proxy supplies credentials.
   Judgement (scope class, audience, first-publication date) stays with the screener, not this tool. */
const fs=require("node:fs"),path=require("node:path");
const ROOT=path.resolve(__dirname,"..");
const TIERS={"2":"A1","2b":"A2","2d":"A3","2e":"A4","3":"B","3b":"H","3c":"V"};
const EDU="education OR school OR students OR teacher OR learning";
function cells(line){return line.split("|").slice(1,-1).map(s=>s.trim())}
function parseWatchlist(md){
 const out=[];let tier=null;
 for(const line of md.split(/\r?\n/)){
  const h=line.match(/^##\s+(\d+[a-z]?)\.\s/);
  if(h){tier=TIERS[h[1]]||null;continue}
  if(/^##\s/.test(line)){tier=null;continue}
  if(!tier||!/^\|\s*[STHV]\d\d\s*\|/.test(line))continue;
  const c=cells(line),id=c[0],ident=c[c.length-1];
  const orcid=(ident.match(/ORCID\s*(\d{4}-\d{4}-\d{4}-\d{3}[\dX])/)||[])[1]||"";
  const author=(ident.match(/\b(A\d{8,11})\b/)||[])[1]||"";
  const useId=/改用作者\s*ID/.test(ident)||!orcid;
  if(useId&&!author)throw Error(`${id}: no ORCID or OpenAlex author ID in watchlist`);
  out.push({id,tier,name:c[1],filter:useId?"author.id:"+author:"author.orcid:"+orcid,
   edu_topic:/(須|一律)加(教育)?主題詞/.test(ident)});
 }
 const seen=new Set();for(const s of out){if(seen.has(s.id))throw Error("duplicate scholar "+s.id);seen.add(s.id)}
 return out;
}
function day(s){if(!/^\d{4}-\d\d-\d\d$/.test(s||"")||new Date(s+"T00:00:00Z").toISOString().slice(0,10)!==s)throw Error("invalid date "+s);return s}
function queries(s,from,to){
 const base="https://api.openalex.org/works?filter="+s.filter+",from_publication_date:"+day(from)+",to_publication_date:"+day(to);
 if(!s.edu_topic)return [{role:"primary",url:base+"&per_page=200"}];
 return [{role:"primary",url:base+"&search="+encodeURIComponent(EDU)+"&per_page=200"},{role:"supplementary_unfiltered",url:base+"&per_page=200"}];
}
function selectTiers(all,tiers){const want=new Set(tiers);const bad=[...want].filter(t=>!Object.values(TIERS).includes(t));if(bad.length)throw Error("unknown tier "+bad);return all.filter(s=>want.has(s.tier))}
function normDoi(d){return String(d||"").toLowerCase().replace(/^https?:\/\/(dx\.)?doi\.org\//,"").trim()}
function readCsv(file){
 const rows=[],t=fs.readFileSync(file,"utf8");let row=[],f="",q=false;
 for(let i=0;i<t.length;i++){const ch=t[i];
  if(q){if(ch==='"'){if(t[i+1]==='"'){f+='"';i++}else q=false}else f+=ch}
  else if(ch==='"')q=true;else if(ch===","){row.push(f);f=""}else if(ch==="\n"){row.push(f);rows.push(row);row=[];f=""}else if(ch!=="\r")f+=ch}
 if(f||row.length){row.push(f);rows.push(row)}
 const [h,...rest]=rows;return rest.map(r=>Object.fromEntries(h.map((k,i)=>[k,r[i]??""])));
}
function inverted(ab){if(!ab)return "";const p=[];for(const [w,ix] of Object.entries(ab))for(const i of ix)p.push([i,w]);return p.sort((a,b)=>a[0]-b[0]).map(x=>x[1]).join(" ")}
/* Deduplicate works across scholars and mark knowledge-base / candidate-pool presence by lower-case DOI. */
function collectWorks(raws,{kbRecords=[],poolItems=[]}={}){
 const kb=new Map(kbRecords.filter(r=>r.doi).map(r=>[normDoi(r.doi),r.record_id]));
 const pool=new Map(poolItems.filter(c=>c.doi).map(c=>[normDoi(c.doi),c.candidate_id||c.id||true]));
 const works=new Map();
 for(const {scholar,data} of raws)for(const w of (data&&data.results)||[]){
  const doi=normDoi(w.doi),k=doi||w.id;
  let e=works.get(k);
  if(!e){e={openalex_id:String(w.id||"").split("/").pop(),doi,title:w.title||"",type:w.type||"",
   openalex_publication_date:w.publication_date||"",container:((w.primary_location||{}).source||{}).display_name||"",
   scholar_ids:[],scholar_affiliations:{},in_kb:kb.get(doi)||false,in_candidate_pool:pool.get(doi)||false,
   abstract_for_screening_only:inverted(w.abstract_inverted_index)};works.set(k,e)}
  if(!e.scholar_ids.includes(scholar.id))e.scholar_ids.push(scholar.id);
  // Same-name check: institutions listed on the authorship whose identifier matches the scholar filter.
  const [kind,val]=scholar.filter.split(":");
  const a=(w.authorships||[]).find(x=>kind==="author.orcid"?String((x.author||{}).orcid||"").endsWith(val):String((x.author||{}).id||"").endsWith(val));
  e.scholar_affiliations[scholar.id]=a?(a.institutions||[]).map(i=>i.display_name).filter(Boolean):[];
 }
 return [...works.values()];
}
function q(v){return '"'+String(v).replace(/"/g,'""')+'"'}
/* One search_runs.csv row per scholar (primary query); a failed query is `unavailable` with empty counts, never zero hits. */
function searchRunRows(runs,{runDate,label,details,screened={},recorded={}}){
 day(runDate);
 return runs.filter(r=>r.role==="primary").map(r=>{
  const ok=r.status==="ok",seen=ok?r.total:"";
  const qs=r.url.split("?")[1].replace(/^filter=/,"");
  if(/mailto|api_key|@/i.test(qs))throw Error("query must not carry email or key");
  const [, from, to]=qs.match(/from_publication_date:([\d-]+),to_publication_date:([\d-]+)/);
  const note=`Scholar-watch ${label} ${r.utc} UTC; OpenAlex publication_date window ${from}..${to} is not first publication. results_seen = OpenAlex total; results_screened = education-related works individually screened. Same-model screening, not independent review. No email sent.${ok?"":" Query failed (HTTP "+r.http+"); not a zero-hit result."} Details: ${details}.`;
  return [`SCHOLAR-${runDate.replace(/-/g,"")}-${r.scholar_id}`,runDate,r.scholar_id,"OpenAlex works filter "+qs,from,to,
   ok&&r.total?"items_screened":"query_scoped",ok?"ok":"unavailable",seen,ok?(screened[r.scholar_id]??0):"",ok?(recorded[r.scholar_id]??0):"",note].map(q).join(",");
 });
}
async function get(url){
 let last={http:0,data:null,utc:""};
 for(let attempt=0;attempt<5;attempt++){
  const utc=new Date().toISOString().replace(/\.\d+Z$/,"Z");
  try{const r=await fetch(url,{headers:{"User-Agent":"k12-ai-literacy-report"}});last={http:r.status,data:r.status===200?await r.json():null,utc}}
  catch{last={http:0,data:null,utc}}
  if(last.http===200||(last.http>=400&&last.http<500&&last.http!==429))return last;
  await new Promise(res=>setTimeout(res,5000*(attempt+1)));
 }
 return last;
}
function args(argv){const o={};for(let i=0;i<argv.length;i++)if(argv[i].startsWith("--"))o[argv[i].slice(2)]=argv[i+1]&&!argv[i+1].startsWith("--")?argv[++i]:true;return o}
async function main(argv){
 const [cmd,...rest]=argv,o=args(rest);
 const list=()=>selectTiers(parseWatchlist(fs.readFileSync(path.join(ROOT,"research/scholar-watchlist.md"),"utf8")),String(o.tiers||"").split(",").filter(Boolean));
 if(cmd==="list"){for(const s of list())console.log([s.id,s.tier,s.filter,s.edu_topic?"edu-topic":""].join("\t"));return}
 if(!o.out)throw Error("--out <scratch dir> required");
 fs.mkdirSync(path.join(o.out,"raw"),{recursive:true});
 if(cmd==="fetch"){
  const runs=[];
  for(const s of list())for(const {role,url} of queries(s,o.from,o.to)){
   const r=await get(url);
   if(r.data)fs.writeFileSync(path.join(o.out,"raw",`${s.id}_${role}.json`),JSON.stringify(r.data));
   runs.push({scholar_id:s.id,tier:s.tier,role,url,utc:r.utc,http:r.http,status:r.data?"ok":"failed",total:r.data?r.data.meta.count:null});
  }
  fs.writeFileSync(path.join(o.out,"runs.json"),JSON.stringify({from:o.from,to:o.to,scholars:list(),runs},null,1));
  console.log(`queries ${runs.length}, failed ${runs.filter(r=>r.status!=="ok").length}`);return;
 }
 const meta=JSON.parse(fs.readFileSync(path.join(o.out,"runs.json"),"utf8"));
 if(cmd==="collect"){
  const byId=new Map(meta.scholars.map(s=>[s.id,s]));
  const raws=meta.runs.filter(r=>r.status==="ok").map(r=>({scholar:byId.get(r.scholar_id),data:JSON.parse(fs.readFileSync(path.join(o.out,"raw",`${r.scholar_id}_${r.role}.json`),"utf8"))}));
  const kbRecords=readCsv(path.join(ROOT,"research/knowledge-base/data/records.csv"));
  const poolItems=o.pool?JSON.parse(fs.readFileSync(o.pool,"utf8")).items||[]:[];
  const works=collectWorks(raws,{kbRecords,poolItems});
  fs.writeFileSync(path.join(o.out,"works.json"),JSON.stringify(works,null,1));
  console.log(`works ${works.length}, in KB ${works.filter(w=>w.in_kb).length}, in pool ${works.filter(w=>w.in_candidate_pool).length}`);return;
 }
 if(cmd==="search-runs"){
  const read=f=>f?JSON.parse(fs.readFileSync(f,"utf8")):{};
  const rows=searchRunRows(meta.runs,{runDate:day(o["run-date"]),label:o.label||"run",details:o.details||"",screened:read(o.screened),recorded:read(o.recorded)});
  if(o.append){const f=path.join(ROOT,"research/knowledge-base/data/search_runs.csv");let t=fs.readFileSync(f,"utf8");if(!t.endsWith("\n"))t+="\n";fs.writeFileSync(f,t+rows.join("\n")+"\n")}
  else console.log(rows.join("\n"));return;
 }
 throw Error("usage: list|fetch|collect|search-runs (see research/scholar-watch-usage-spec.md)");
}
if(require.main===module)main(process.argv.slice(2)).catch(e=>{console.error(e.message);process.exit(1)});
module.exports={parseWatchlist,queries,selectTiers,collectWorks,searchRunRows,normDoi,EDU};
