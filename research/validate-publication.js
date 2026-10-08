"use strict";
/* Build-time publication gate. Structural only; cannot verify evidence truth. */
const fs=require("node:fs"),path=require("node:path");
const {check}=require("./validate-claims.js");
const {sourceTrace}=require("./validate-source-trace.js");
const LEGACY=new Set(["weekly/2026-09-29_10-08/index.html","monthly/2026-09/index.html"]);
function scan(root,folder){
 const base=path.join(root,folder);if(!fs.existsSync(base))return [];
 return fs.readdirSync(base,{withFileTypes:true}).filter(x=>x.isDirectory()).map(x=>folder+"/"+x.name+"/index.html").filter(p=>fs.existsSync(path.join(root,p)));
}

/**
 * Conservative text-to-claim binding for future HTML reports. Every visible
 * <p>, <h3>, <h4>, <li>, <blockquote>, <figcaption>, <td> and <th> INSIDE
 * <main> must have a data-claim-id and identical text in the evidence file.
 *
 * This is intentionally limited to static HTML. Text generated with JS and
 * content in other tags are not fully audited; human review remains necessary.
 */
function plain(html){
 const entities={amp:"&",lt:"<",gt:">",quot:'"',apos:"'",nbsp:" "};
 return html.replace(/<[^>]*>/g,"").replace(/&(#x[0-9a-f]+|#[0-9]+|[a-z]+);/gi,(_,e)=>{
  const t=e.toLowerCase();if(t[0]==="#"){const n=t[1]==="x"?parseInt(t.slice(2),16):parseInt(t.slice(1),10);return Number.isFinite(n)&&n>0&&n<=0x10ffff?String.fromCodePoint(n):" "}
  return Object.prototype.hasOwnProperty.call(entities,t)?entities[t]:"&"+e+";";
 }).replace(/\s+/g," ").trim();
}
function matchBody(html,claims){
 const errors=[],matches=[...html.matchAll(/<main\b[^>]*>([\s\S]*?)<\/main>/gi)];
 if(matches.length!==1)return ["expected exactly one static main region"];
 const body=matches[0][1];
 if(/<script\b/i.test(body)||/\bcontenteditable\s*=/i.test(body))errors.push("dynamic script/contenteditable unsupported within main");
 const nodes=[...body.matchAll(/<(p|h3|h4|li|blockquote|figcaption|td|th)\b([^>]*)>([\s\S]*?)<\/\1>/gi)];
 if(nodes.length===0)errors.push("no inspectable substantive content nodes in main");
 const counts=new Map(),map=new Map(claims.filter(x=>x&&typeof x.claim_id==="string").map(x=>[x.claim_id,x]));
 for(const [,tag,attrs,raw] of nodes){
  const t=plain(raw);if(!t)continue;
  const id=(attrs.match(/\bdata-claim-id\s*=\s*["']([^"']+)["']/i)||[])[1];
  if(!id){errors.push("unbound content <"+tag+">: "+t.slice(0,70));continue}
  counts.set(id,(counts.get(id)||0)+1);
  if(!map.has(id)){errors.push("unknown body claim "+id);continue}
  if(plain(map.get(id).claim_text)!==t)errors.push("body text differs from claim_text: "+id);
 }
 for(const c of claims){if(!c||typeof c.claim_id!=="string")continue;const count=counts.get(c.claim_id)||0;if(count!==1)errors.push("claim must appear exactly once in HTML: "+c.claim_id+" ("+count+")")}
 return errors;
}

function validate(root){
 const errors=[],warnings=[],entry=path.join(root,"publication/issues.json");
 if(!fs.existsSync(entry))return {ok:false,errors:["publication/issues.json missing"],warnings};
 let manifest;try{manifest=JSON.parse(fs.readFileSync(entry,"utf8"))}catch(e){return {ok:false,errors:["Invalid issues JSON: "+e.message],warnings}};
 if(!Array.isArray(manifest.editions))errors.push("editions array missing");
 const editions=Array.isArray(manifest.editions)?manifest.editions:[];
 const encountered=new Set();
 for(const issue of editions){
  if(!issue||typeof issue!=="object"){errors.push("invalid edition");continue}
  const p=issue.path,q=issue.claims_file;
  if(typeof p!=="string"||!(/^(weekly|monthly)\/[a-zA-Z0-9_-]+\/index\.html$/.test(p))){errors.push("invalid edition path");continue}
  if(encountered.has(p))errors.push("duplicate edition "+p);encountered.add(p);
  if(LEGACY.has(p)){errors.push("legacy issue must not be reclassified "+p);continue}
  if(!fs.existsSync(path.join(root,p)))errors.push("edition HTML missing "+p);
  if(typeof q!=="string"||!/^publication\/claims\/[a-zA-Z0-9_-]+\.json$/.test(q)){errors.push("invalid claims file path "+p);continue}
  const f=path.join(root,q);if(!fs.existsSync(f)){errors.push("claims JSON missing "+q);continue}
  let data;try{data=JSON.parse(fs.readFileSync(f,"utf8"))}catch(e){errors.push("invalid claims JSON "+q);continue}
  if(!Array.isArray(data)||data.length===0){errors.push("edition must have non-empty claims "+p);continue}
  errors.push(...matchBody(fs.readFileSync(path.join(root,p),"utf8"),data).map(e=>p+": "+e));
  const claimIds=new Set();
  for(const c of data){
   if(!c||typeof c!=="object"){errors.push("invalid claim in "+q);continue}
   if(claimIds.has(c.claim_id))errors.push("duplicate claim_id in "+q+": "+c.claim_id);claimIds.add(c.claim_id);
   if(c.decision!=="publish"){errors.push("edition contains unpublished/held claim "+q+" "+c.claim_id);continue}
   const result=check(c);
   if(!result.allow)errors.push(q+" "+c.claim_id+": "+result.reasons.join("; "));
   errors.push(...sourceTrace(root,c).map(e=>q+" "+c.claim_id+": "+e));
   if(c.claim_class==="high_impact"&&(!c.reviewer_id||!c.reviewer_evidence))errors.push(q+" "+c.claim_id+": reviewer record missing");
  }
 }
 const issues=[...scan(root,"weekly"),...scan(root,"monthly")];
 for(const p of issues){if(LEGACY.has(p)){warnings.push("Legacy issue not certified by this gate: "+p);continue}if(!encountered.has(p))errors.push("Unregistered issue (blocked): "+p)}
 for(const p of encountered)if(!issues.includes(p))errors.push("Listed issue not found "+p);
 return {ok:errors.length===0,errors,warnings,checked_editions:encountered.size,legacy_editions:issues.filter(p=>LEGACY.has(p)).length};
}
if(require.main===module){const result=validate(path.resolve(process.argv[2]||"."));console.log(JSON.stringify(result,null,2));if(!result.ok)process.exitCode=1}
module.exports={validate};
