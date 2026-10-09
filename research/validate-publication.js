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
 * <p>, <h1>, <h2>, <h3>, <h4>, <li>, <blockquote>, <figcaption>, <td> and <th> INSIDE
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
 // Fail closed on HTML features this small static matcher cannot audit.
 if(/<!--[\s\S]*?-->|<![^>]*>|<\?/i.test(body))errors.push("comments/declarations unsupported within main");
 if(/<\/?(script|style|template|noscript|iframe|svg|math|canvas|object|embed|form|input|button|textarea|select|picture|video|audio)\b/i.test(body))errors.push("dynamic/embedded elements unsupported within main");
 if(/\s(?:on[a-z]+|style|hidden|srcdoc|contenteditable)\s*(?:=|(?=[\s>]))/i.test(body))errors.push("dynamic/hidden HTML attributes unsupported within main");
 // Only well-understood static presentation tags may surround claim-bound text.
 const safeTags=new Set(["main","article","section","div","header","footer","p","h1","h2","h3","h4","li","ul","ol","blockquote","figcaption","figure","table","thead","tbody","tfoot","tr","td","th","strong","b","em","i","span","a","small","code","br","hr","sup","sub","time"]);
 for(const tag of body.matchAll(/<\/?([a-z][a-z0-9-]*)\b/gi))
   if(!safeTags.has(tag[1].toLowerCase()))errors.push("unsupported HTML tag in main: "+tag[1].toLowerCase());
 const nodes=[...body.matchAll(/<(p|h1|h2|h3|h4|li|blockquote|figcaption|td|th)\b([^>]*)>([\s\S]*?)<\/\1>/gi)];
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
 // Strip all matched claim-bearing nodes, then reject any residual visible text.
 // This catches bare text in div/section/aside-like containers that the node list misses.
 const remaining=body.replace(/<(p|h1|h2|h3|h4|li|blockquote|figcaption|td|th)\b[^>]*>[\s\S]*?<\/\1>/gi,"");
 if(plain(remaining))errors.push("unbound text outside claim elements: "+plain(remaining).slice(0,70));
 for(const c of claims){if(!c||typeof c.claim_id!=="string")continue;const count=counts.get(c.claim_id)||0;if(count!==1)errors.push("claim must appear exactly once in HTML: "+c.claim_id+" ("+count+")")}
 return errors;
}

function dailyFact(c,issueDate){
 const errors=[];
 const attributed=c.daily_fact_kind==="official_attributed_summary"||c.daily_fact_kind==="research_abstract_attributed_summary";
 if(attributed){
  if(c.claim_class!=="descriptive"||c.risk_tier!=="medium")errors.push("attributed summary requires descriptive medium risk");
  if(c.assertion_type!=="direct_statement")errors.push("attributed summary must reflect a directly sourced statement");
  if(typeof c.attributed_summary!=="string"||c.attributed_summary.length<15||c.attributed_summary.length>180||/[<>\r\n]/.test(c.attributed_summary))errors.push("invalid attributed_summary");
  if(!c.evidence_path||!c.evidence_sha256||!c.original_excerpt||c.translation_reviewed!==true)errors.push("attributed summary needs original excerpt, pinned evidence and translation crosscheck");
  if(c.ai_crosscheck_passes!==2||c.ai_crosscheck_status!=="concordant")errors.push("attributed summary needs recorded two-pass crosscheck");
 }else if(c.claim_class!=="bibliographic"||c.risk_tier!=="low")errors.push("daily AI channel permits low-risk bibliographic claims only");
 if(!["official_notice","research_bibliography","official_attributed_summary","research_abstract_attributed_summary"].includes(c.daily_fact_kind))errors.push("invalid daily_fact_kind");
 if(c.kind==="news_policy"&&!["official_notice","official_attributed_summary"].includes(c.daily_fact_kind))errors.push("policy source cannot use research daily category");
 if(c.kind==="research"&&!["research_bibliography","research_abstract_attributed_summary"].includes(c.daily_fact_kind))errors.push("research source cannot use policy daily category");
 if(typeof c.source_title!=="string"||!c.source_title.trim()||c.source_title.length>300||/[\r\n<>]/.test(c.source_title))errors.push("invalid source_title");
 if(typeof c.source_organization!=="string"||!c.source_organization.trim()||c.source_organization.length>150||/[\r\n<>]/.test(c.source_organization))errors.push("invalid source_organization");
 if(typeof c.source_title==="string"&&typeof c.source_organization==="string"){
  const prefix="來源機構："+c.source_organization+"；資料標題："+c.source_title+"；來源刊登日："+c.publication_date+"。";
  const attribution=c.daily_fact_kind==="research_abstract_attributed_summary"?"作者摘要報告：":"官方文件表示：";
  const expected=attributed?prefix+attribution+c.attributed_summary+"（AI 輔助摘要，未經真人逐則審稿；請參閱原文。）":prefix;
  if(c.claim_text!==expected)errors.push("daily claim must use exact source-attributed or bibliographic template");
 }
 if(c.checked_at>issueDate||c.publication_date>issueDate)errors.push("source or review date occurs after daily issue date");
 if(typeof c.first_disclosed_on!=="string"||c.first_disclosed_on!==c.publication_date)errors.push("verified first disclosure required");
 if(c.first_disclosed_on&&c.first_disclosed_on>issueDate)errors.push("first disclosure occurs after daily issue date");
 if(typeof c.first_disclosed_on==="string"&&/^\d{4}-\d{2}-\d{2}$/.test(c.first_disclosed_on)){
  const delta=Date.parse(issueDate+"T00:00:00Z")-Date.parse(c.first_disclosed_on+"T00:00:00Z");
  if(!Number.isFinite(delta)||delta<0||delta>7*86400000)errors.push("daily source first disclosed outside recent 7-day window; background only");
 }
 if(attributed&&(!Array.isArray(c.summary_evidence_spans)||c.summary_evidence_spans.length===0||c.summary_evidence_spans.some(v=>typeof v!=="string"||v.length<16||!String(c.original_excerpt||"").includes(v))))errors.push("source-aligned evidence spans required");
 if(c.assertion_type&&c.assertion_type!=="direct_statement")errors.push("daily AI channel excludes editorial interpretation");
 if(attributed&&/(已證實|證明|因果|必然|全面強制|所有學生|所有教師|保證有效|應在臺灣推動)/.test(c.attributed_summary||""))errors.push("attributed summary contains disallowed inference or high-impact wording");
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
  if(typeof p!=="string"||!(/^(weekly|monthly|daily)\/[a-zA-Z0-9_-]+\/index\.html$/.test(p))){errors.push("invalid edition path");continue}
  if(encountered.has(p))errors.push("duplicate edition "+p);encountered.add(p);
  const daily=p.startsWith("daily/");
  const issueDate=daily?(p.match(/^daily\/(\d{4}-\d{2}-\d{2})\/index\.html$/)||[])[1]:null;
  if(daily&&(!issueDate||!Number.isFinite(Date.parse(issueDate+"T00:00:00Z"))||new Date(issueDate+"T00:00:00Z").toISOString().slice(0,10)!==issueDate))errors.push("daily path must contain real ISO issue date");
  if(daily&&issue.publication_mode!=="ai_low_risk_source_facts")errors.push("daily publication mode not explicitly authorized");
  if(daily&&q!==("publication/claims/daily-"+issueDate+".json"))errors.push("daily claims filename must match daily issue date");
  if(LEGACY.has(p)){errors.push("legacy issue must not be reclassified "+p);continue}
  const htmlPath=path.join(root,p);
  if(!fs.existsSync(htmlPath)){errors.push("edition HTML missing "+p);continue}
  if(typeof q!=="string"||!/^publication\/claims\/[a-zA-Z0-9_-]+\.json$/.test(q)){errors.push("invalid claims file path "+p);continue}
  const f=path.join(root,q);if(!fs.existsSync(f)){errors.push("claims JSON missing "+q);continue}
  let data;try{data=JSON.parse(fs.readFileSync(f,"utf8"))}catch(e){errors.push("invalid claims JSON "+q);continue}
  if(!Array.isArray(data)||data.length===0){errors.push("edition must have non-empty claims "+p);continue}
  let html;try{html=fs.readFileSync(htmlPath,"utf8")}catch(e){errors.push("edition HTML unreadable "+p+": "+e.message);continue}
  if(/<\/?(?:script|iframe|object|embed)\b/i.test(html)||/\son[a-z]+\s*=/i.test(html))errors.push(p+": active HTML content outside claim-bound main is forbidden");
  // Static pages cannot carry executable or protocol-relative URL attributes.
  for(const m of html.matchAll(/\b(?:href|src|action|formaction)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/gi)){
   const raw=m[1]??m[2]??m[3]??"";
   const decoded=raw.replace(/&#(?:x([0-9a-f]+)|([0-9]+));?/gi,(_,h,n)=>String.fromCodePoint(parseInt(h||n,h?16:10))).replace(/&colon;/gi,":").replace(/[\u0000-\u0020\u007f]+/g,"").toLowerCase();
   if(/^(javascript|data|vbscript|file):/.test(decoded)||decoded.startsWith("//"))
    errors.push(p+": unsafe URL scheme in registered HTML");
  }
  errors.push(...matchBody(html,data).map(e=>p+": "+e));
  const claimIds=new Set();
  for(const c of data){
   if(!c||typeof c!=="object"){errors.push("invalid claim in "+q);continue}
   if(claimIds.has(c.claim_id))errors.push("duplicate claim_id in "+q+": "+c.claim_id);claimIds.add(c.claim_id);
   if(c.decision!=="publish"){errors.push("edition contains unpublished/held claim "+q+" "+c.claim_id);continue}
   if(daily)errors.push(...dailyFact(c,issueDate||"0000-00-00").map(e=>q+" "+c.claim_id+": "+e));
   const result=check(c);
   if(!result.allow)errors.push(q+" "+c.claim_id+": "+result.reasons.join("; "));
   errors.push(...sourceTrace(root,c,{requireBibliographicSnapshot:daily}).map(e=>q+" "+c.claim_id+": "+e));
   if(c.claim_class==="high_impact"&&(!c.reviewer_id||!c.reviewer_evidence))errors.push(q+" "+c.claim_id+": reviewer record missing");
  }
 }
 const issues=[...scan(root,"weekly"),...scan(root,"monthly"),...scan(root,"daily")];
 for(const p of issues){if(LEGACY.has(p)){warnings.push("Legacy issue not certified by this gate: "+p);continue}if(!encountered.has(p))errors.push("Unregistered issue (blocked): "+p)}
 for(const p of encountered)if(!issues.includes(p))errors.push("Listed issue not found "+p);
 return {ok:errors.length===0,errors,warnings,checked_editions:encountered.size,legacy_editions:issues.filter(p=>LEGACY.has(p)).length};
}
if(require.main===module){const result=validate(path.resolve(process.argv[2]||"."));console.log(JSON.stringify(result,null,2));if(!result.ok)process.exitCode=1}
module.exports={validate};
