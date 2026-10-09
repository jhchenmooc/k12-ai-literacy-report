"use strict";
/* Build-time publication gate. Structural only; cannot verify evidence truth. */
const fs=require("node:fs"),path=require("node:path");
const {check}=require("./validate-claims.js");
const {sourceTrace}=require("./validate-source-trace.js");
const {publicationScopeErrors,audienceErrors}=require("./ai-literacy-scope.js");
const parse5=require("parse5");
const {LEGACY,inventory}=require("./public-site.js");
const {canonical}=require("./ingest-candidates.js");
const {reviewStateErrors,pendingReviews}=require("./source-review-state.js");
function scan(root,folder){
 const base=path.join(root,folder);if(!fs.existsSync(base))return [];
 return fs.readdirSync(base,{withFileTypes:true}).filter(x=>x.isDirectory()).map(x=>folder+"/"+x.name+"/index.html").filter(p=>fs.existsSync(path.join(root,p)));
}

/**
 * Conservative text-to-claim binding for future HTML reports. Every visible
 * <p>, <h1>, <h2>, <h3>, <h4>, <li>, <blockquote>, <figcaption>, <td> and <th> INSIDE
 * <main> must have a data-claim-id and identical text in the evidence file.
 *
 * Registered reports accept a bare main-only body or the exact daily renderer
 * shell. Shared repository CSS and the renderer are trusted, reviewed code;
 * this structural gate does not establish source truth or accessibility.
 */
const substantive=new Set(["p","h1","h2","h3","h4","li","blockquote","figcaption","td","th"]);
const safeTags=new Set(["main","article","section","div","header","footer","p","h1","h2","h3","h4","li","ul","ol","blockquote","figcaption","figure","table","thead","tbody","tfoot","tr","td","th","strong","b","em","i","span","a","small","code","br","hr","sup","sub","time"]);
function children(node){return [...(node.childNodes||[]),...(node.content?[node.content]:[])]}
function all(node){return [node,...children(node).flatMap(all)]}
function text(node){if(node.nodeName==="#text")return node.value;return children(node).map(text).join("")}
const normalized=s=>s.replace(/\s+/g," ").trim();
function plain(html){return normalized(text(parse5.parseFragment(String(html??""))))}
const attr=(node,name)=>(node.attrs||[]).find(a=>a.name===name)?.value;
function parsed(html){const errors=[];const document=parse5.parse(html,{onParseError:e=>{if(e.code==="duplicate-attribute")errors.push("duplicate HTML attribute")}});return {document,errors}}
const HTML_NS="http://www.w3.org/1999/xhtml";
// Compare browser-parsed structure, ignoring formatting whitespace and attribute
// order. Only the single main's contents are omitted, never its attributes.
function shellShape(node){
 if(node.nodeName==="#text")return normalized(node.value)?["text",normalized(node.value)]:null;
 return [node.nodeName,node.namespaceURI||"",(node.attrs||[]).map(a=>[a.namespace||"",a.name,a.value]).sort((a,b)=>JSON.stringify(a)<JSON.stringify(b)?-1:1),
  node.tagName==="main"?[]:children(node).map(shellShape).filter(x=>x!==null)];
}
function registeredShell(document,main,issueDate,issuePath){
 const errors=[],nodes=all(document),body=nodes.find(n=>n.tagName==="body"&&n.namespaceURI===HTML_NS);
 if(main.namespaceURI!==HTML_NS||main.parentNode!==body)errors.push("main must be an HTML element directly inside body");
 for(const node of nodes){
  if(node.tagName==="style")errors.push("registered report inline stylesheet forbidden");
  if(node.tagName==="meta"){
   const charset=attr(node,"charset");
   if(charset!==undefined&&charset.trim().toLowerCase()!=="utf-8")errors.push("registered report charset must be UTF-8");
   if(String(attr(node,"http-equiv")||"").trim().toLowerCase()==="content-type"&&!/^text\/html\s*;\s*charset\s*=\s*utf-8\s*$/i.test(attr(node,"content")||""))errors.push("registered report content-type declaration must specify UTF-8");
  }
  if(node.tagName==="link"){
   const rel=attr(node,"rel"),href=attr(node,"href")||"";
   if(rel==="stylesheet"&&!/^\.\.\/\.\.\/assets\/(?:design-system\.css|site\.css(?:\?v=[a-f0-9]{10})?)$/.test(href))errors.push("registered report stylesheet must be a reviewed shared local asset");
   if(!["stylesheet","icon"].includes(rel))errors.push("registered report unsupported link relation");
  }
 }
 const bare=body&&children(body).every(n=>n===main||(n.nodeName==="#text"&&!normalized(n.value)));
 if(bare){
  for(const node of nodes.filter(n=>["html","body"].includes(n.tagName))){
   if((node.attrs||[]).some(a=>node.tagName!=="html"||a.name!=="lang"))errors.push("bare report html/body attributes unsupported");
  }
  const head=nodes.find(n=>n.tagName==="head");
  for(const node of all(head||{}))if(node.tagName&&!["head","meta","title","link"].includes(node.tagName))errors.push("bare report unsupported head element");
  const [channel,period]=issuePath.split("/"),label={daily:"每日短訊",weekly:"週報",monthly:"月報"}[channel];
  const expectedTitle=label+" "+period+"｜K-12 AI 素養國際動態";
  for(const node of nodes.filter(n=>n.tagName==="title"))if(normalized(text(node))!==expectedTitle)errors.push("bare report title must be the neutral issue title: "+expectedTitle);
 }else if(issueDate){
  const expected=parse5.parse(require("./render-site.js").renderDailyEdition({date:issueDate,claims:[]}));
  if(JSON.stringify(shellShape(document))!==JSON.stringify(shellShape(expected)))errors.push("registered daily shell differs from trusted renderer outside main");
 }else errors.push("registered report body outside main requires an approved renderer shell");
 return errors;
}
function matchBody(document,claims,issueDate,issuePath){
 const errors=[],mains=all(document).filter(n=>n.tagName==="main");
 if(mains.length!==1)return ["expected exactly one static main region"];
 const main=mains[0],nodes=all(main),content=nodes.filter(n=>substantive.has(n.tagName));
 errors.push(...registeredShell(document,main,issueDate,issuePath));
 for(let ancestor=main.parentNode;ancestor;ancestor=ancestor.parentNode){
  if((ancestor.attrs||[]).some(a=>["hidden","style","srcdoc","contenteditable"].includes(a.name)))errors.push("dynamic/hidden ancestor of main unsupported");
 }
 if(!content.length)errors.push("no inspectable substantive content nodes in main");
 const counts=new Map(),map=new Map(claims.filter(x=>x&&typeof x.claim_id==="string").map(x=>[x.claim_id,x]));
 for(const node of nodes){
  if(node.nodeName==="#comment"||node.nodeName==="#documentType")errors.push("comments/declarations unsupported within main");
  if(node.tagName&&!safeTags.has(node.tagName))errors.push("unsupported HTML tag in main: "+node.tagName);
  if(node.tagName&&node.namespaceURI!==HTML_NS)errors.push("non-HTML namespace unsupported within main");
  if((node.attrs||[]).some(a=>a.namespace||!(node===main?((a.name==="id"&&a.value==="content")||(a.name==="class"&&a.value==="content")):["data-claim-id","href","datetime","colspan","rowspan","scope"].includes(a.name))))errors.push("dynamic/hidden or unsupported HTML attributes within main");
 }
 for(const node of content){
  const t=normalized(text(node));if(!t)continue;
  const id=attr(node,"data-claim-id");
  if(!id){errors.push("unbound content <"+node.tagName+">: "+t.slice(0,70));continue}
  counts.set(id,(counts.get(id)||0)+1);
  if(!map.has(id)){errors.push("unknown body claim "+id);continue}
  if(plain(map.get(id).claim_text)!==t)errors.push("body text differs from claim_text: "+id);
 }
 function residual(node,covered=false){
  const bound=covered||substantive.has(node.tagName);
  if(node.nodeName==="#text"&&!bound&&normalized(node.value))errors.push("unbound text outside claim elements: "+normalized(node.value).slice(0,70));
  for(const child of children(node))residual(child,bound);
 }
 residual(main);
 for(const c of claims){if(!c||typeof c.claim_id!=="string")continue;const count=counts.get(c.claim_id)||0;if(count!==1)errors.push("claim must appear exactly once in HTML: "+c.claim_id+" ("+count+")")}
 return errors;
}
function staticHtmlSafety(document,label){
 const errors=[];
 for(const node of all(document)){
  if(["script","iframe","object","embed","base","form","template","svg","math"].includes(node.tagName)||(node.tagName&&node.namespaceURI!==HTML_NS))errors.push(label+": active or redirect-capable HTML forbidden (including inert templates and foreign namespaces)");
  if((node.attrs||[]).some(a=>/^on[a-z]+$/.test(a.name)))errors.push(label+": inline event handler forbidden");
  if(node.tagName==="meta"&&String(attr(node,"http-equiv")||"").toLowerCase()==="refresh")errors.push(label+": meta refresh redirect forbidden");
  for(const a of node.attrs||[]){
   if(!["href","src","action","formaction"].includes(a.name))continue;
   const decoded=a.value.replace(/[\u0000-\u0020\u007f]+/g,"");
   // Attributes are already decoded by the same HTML parser a browser uses.
   if(decoded.replace(/\\/g,"/").startsWith("//")||(/^[a-z][a-z0-9+.-]*:/i.test(decoded)&&!/^https?:/i.test(decoded)))errors.push(label+": unsafe URL scheme in registered HTML");
  }
 }
 return errors;
}
function dailySourceLink(document,c){
 const mains=all(document).filter(n=>n.tagName==="main");if(mains.length!==1)return false;
 return all(mains[0]).filter(n=>["p","li","blockquote","td"].includes(n.tagName)&&attr(n,"data-claim-id")===c.claim_id).some(n=>all(n).some(a=>a.tagName==="a"&&attr(a,"href")===c.source_url));
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
 if(c.kind==="news_policy"&&!["binding_policy","official_guidance","draft","official_commentary","training_event"].includes(c.source_document_type))errors.push("missing or invalid policy document type");
 if(c.kind==="research"&&!["peer_reviewed_article","preprint"].includes(c.source_document_type))errors.push("missing or invalid research document type");
 if(c.source_document_type==="draft"&&c.daily_fact_kind==="official_notice"&&c.claim_class!=="bibliographic")errors.push("draft cannot masquerade as enacted policy");
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
function cumulativeWorksheets(root){
 const dir=path.join(root,"research","drafts");
 if(!fs.existsSync(dir))return [];
 const sheets=[];
 for(const name of fs.readdirSync(dir)){
  if(!/^\d{4}-\d{2}-\d{2}_\d{4}-\d{2}-\d{2}\.json$/.test(name))continue;
  let sheet;try{sheet=JSON.parse(fs.readFileSync(path.join(dir,name),"utf8"))}
  catch(e){throw Error("invalid cumulative candidate file "+name+": "+e.message)}
  const malformed=reviewStateErrors(sheet);if(malformed.length)throw Error("invalid cumulative candidate file "+name+": "+malformed.join("; "));
  sheets.push(sheet);
 }
 return sheets;
}
function validate(root){
 const errors=[],warnings=[],entry=path.join(root,"publication/issues.json");
 if(!fs.existsSync(entry))return {ok:false,errors:["publication/issues.json missing"],warnings};
 let manifest;try{manifest=JSON.parse(fs.readFileSync(entry,"utf8"))}catch(e){return {ok:false,errors:["Invalid issues JSON: "+e.message],warnings}};
 if(!manifest||typeof manifest!=="object"||Array.isArray(manifest)||!Array.isArray(manifest.editions))return {ok:false,errors:["Invalid issues manifest: editions array required"],warnings};
 const editions=Array.isArray(manifest.editions)?manifest.editions:[];
 const publicFiles=inventory(root,manifest);errors.push(...publicFiles.errors);
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
  if(LEGACY.has(p)){
   errors.push("legacy issue must not be reclassified "+p);continue;
  }
  const htmlPath=path.join(root,p);
  if(!fs.existsSync(htmlPath)){errors.push("edition HTML missing "+p);continue}
  if(typeof q!=="string"||!/^publication\/claims\/[a-zA-Z0-9_-]+\.json$/.test(q)){errors.push("invalid claims file path "+p);continue}
  const f=path.join(root,q);if(!fs.existsSync(f)){errors.push("claims JSON missing "+q);continue}
  let data;try{data=JSON.parse(fs.readFileSync(f,"utf8"))}catch(e){errors.push("invalid claims JSON "+q);continue}
  if(!Array.isArray(data)||data.length===0){errors.push("edition must have non-empty claims "+p);continue}
  let html;try{html=fs.readFileSync(htmlPath,"utf8")}catch(e){errors.push("edition HTML unreadable "+p+": "+e.message);continue}
  const dom=parsed(html);errors.push(...dom.errors.map(e=>p+": "+e));
  errors.push(...staticHtmlSafety(dom.document,p));
  errors.push(...matchBody(dom.document,data,issueDate,p).map(e=>p+": "+e));
  const claimIds=new Set();
  for(const c of data){
   if(!c||typeof c!=="object"){errors.push("invalid claim in "+q);continue}
   if(claimIds.has(c.claim_id))errors.push("duplicate claim_id in "+q+": "+c.claim_id);claimIds.add(c.claim_id);
   if(c.decision!=="publish"){errors.push("edition contains unpublished/held claim "+q+" "+c.claim_id);continue}
   if(daily)errors.push(...dailyFact(c,issueDate||"0000-00-00").map(e=>q+" "+c.claim_id+": "+e));
   if(daily){
    let sheets;try{sheets=cumulativeWorksheets(root)}catch(e){errors.push(e.message);continue}
    if(pendingReviews(sheets,c).length)errors.push(q+" "+c.claim_id+": unresolved cumulative source review blocks daily publication");
    for(const prior of sheets.flatMap(sheet=>sheet.items).filter(item=>canonical(item.source_url)===canonical(c.source_url))){
     if(prior.decision!=="publish"||prior.source_checked!==true||prior.first_disclosed_on!==c.first_disclosed_on)
      errors.push(q+" "+c.claim_id+": daily claim contradicts held/unverified cumulative candidate "+prior.candidate_id);
     if(prior.ai_lit_class!==undefined&&prior.ai_lit_class!==c.ai_lit_class)
      errors.push(q+" "+c.claim_id+": AI literacy scope differs from cumulative candidate "+prior.candidate_id);
     if(prior.audience!==undefined&&prior.audience!==c.audience)
      errors.push(q+" "+c.claim_id+": audience differs from cumulative candidate "+prior.candidate_id);
    }
   }
   if(daily&&!dailySourceLink(dom.document,c))errors.push(q+" "+c.claim_id+": original source URL must be visible as a direct anchor");
   errors.push(...publicationScopeErrors(c).map(e=>q+" "+c.claim_id+": "+e));
   errors.push(...audienceErrors(c,p.split("/")[0]).map(e=>q+" "+c.claim_id+": "+e));
   const result=check(c);
   if(!result.allow)errors.push(q+" "+c.claim_id+": "+result.reasons.join("; "));
   errors.push(...sourceTrace(root,c,{requireBibliographicSnapshot:daily}).map(e=>q+" "+c.claim_id+": "+e));
   if(c.claim_class==="high_impact"&&(!c.reviewer_id||!c.reviewer_evidence))errors.push(q+" "+c.claim_id+": reviewer record missing");
  }
 }
 const issues=[...scan(root,"weekly"),...scan(root,"monthly"),...scan(root,"daily")];
 for(const p of issues){if(LEGACY.has(p)){warnings.push("Legacy issue not certified by this gate: "+p);
    const legacyHtml=fs.readFileSync(path.join(root,p),"utf8"),dom=parsed(legacyHtml);errors.push(...dom.errors.map(e=>p+": "+e),...staticHtmlSafety(dom.document,p));continue;
   }if(!encountered.has(p))errors.push("Unregistered issue (blocked): "+p)}
 for(const p of encountered)if(!issues.includes(p))errors.push("Listed issue not found "+p);
 return {ok:errors.length===0,errors,warnings,checked_editions:encountered.size,legacy_editions:issues.filter(p=>LEGACY.has(p)).length};
}
if(require.main===module){const result=validate(path.resolve(process.argv[2]||"."));console.log(JSON.stringify(result,null,2));if(!result.ok)process.exitCode=1}
module.exports={validate};
