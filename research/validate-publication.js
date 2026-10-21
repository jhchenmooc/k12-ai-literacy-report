"use strict";
/* Build-time publication gate. Structural only; cannot verify evidence truth. */
const fs=require("node:fs"),path=require("node:path");
const {check}=require("./validate-claims.js");
const {sourceTrace}=require("./validate-source-trace.js");
const {publicationScopeErrors,audienceErrors}=require("./ai-literacy-scope.js");
const {dailyTagText}=require("./daily-tags.js");
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
 * Registered reports accept a bare main-only body or the exact renderer shell
 * of their channel (daily by date; weekly/monthly by a valid period). Shared
 * repository CSS and the renderer are trusted, reviewed code; this structural
 * gate does not establish source truth or accessibility.
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
// order. Only the single main's contents are omitted, never its attributes;
// monthly pages are compared whole, main included.
function shellShape(node,withMain=false){
 if(node.nodeName==="#text")return normalized(node.value)?["text",normalized(node.value)]:null;
 return [node.nodeName,node.namespaceURI||"",(node.attrs||[]).map(a=>[a.namespace||"",a.name,a.value]).sort((a,b)=>JSON.stringify(a)<JSON.stringify(b)?-1:1),
  node.tagName==="main"&&!withMain?[]:children(node).map(n=>shellShape(n,withMain)).filter(x=>x!==null)];
}
function registeredShell(document,main,issueDate,issuePath,claims,issue={}){
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
   if(rel==="icon"&&href!=="../../assets/favicon.svg")errors.push("registered report icon must use the fixed local favicon");
   if(!["stylesheet","icon"].includes(rel))errors.push("registered report unsupported link relation");
  }
 }
 const bare=body&&children(body).every(n=>n===main||(n.nodeName==="#text"&&!normalized(n.value)));
 if(bare){
  // Sectioned daily and weekly pages exist only as full renderer pages; a bare body would skip their layout checks.
  {const r=require("./render-site.js"),[ch,per]=issuePath.split("/");
   if(issueDate&&r.dailySectioned({date:issueDate,claims,tw_backfilled_on:issue.tw_backfilled_on,revised_on:issue.revised_on}))errors.push("sectioned daily page must be the full renderer page");
   if(ch==="monthly"&&(r.monthlySectioned(issue)||!r.periodRange("monthly",per)||String(per)>="2026-10"))errors.push("sectioned monthly page must be the full renderer page");
   if(ch==="weekly"&&(r.weeklySectioned(claims)||issue.revised_on!==undefined||issue.taiwan_not_searched!==undefined||(r.periodRange("weekly",per)&&String(per)>=r.TW_FROM_PERIOD)))errors.push("sectioned weekly page must be the full renderer page");}
  for(const node of nodes.filter(n=>["html","body"].includes(n.tagName))){
   if((node.attrs||[]).some(a=>node.tagName!=="html"||a.name!=="lang"))errors.push("bare report html/body attributes unsupported");
  }
  const head=nodes.find(n=>n.tagName==="head");
  for(const node of all(head||{}))if(node.tagName&&!["head","meta","title","link"].includes(node.tagName))errors.push("bare report unsupported head element");
  const [channel,period]=issuePath.split("/"),label={daily:"每日短訊",weekly:"週報",monthly:"月報"}[channel];
  const expectedTitle=label+" "+period+"｜K-12 AI 素養國際動態";
  for(const node of nodes.filter(n=>n.tagName==="title"))if(normalized(text(node))!==expectedTitle)errors.push("bare report title must be the neutral issue title: "+expectedTitle);
  for(const node of nodes.filter(n=>n.tagName==="meta")){
   // No arbitrary search snippets or social-card text, including attributes
   // mixed into an otherwise valid charset/viewport declaration.
   const only=names=>(node.attrs||[]).length===names.length&&(node.attrs||[]).every(a=>!a.namespace&&names.includes(a.name));
   const charset=only(["charset"])&&String(attr(node,"charset")).trim().toLowerCase()==="utf-8";
   const named=only(["name","content"])&&((attr(node,"name")==="viewport"&&attr(node,"content")==="width=device-width,initial-scale=1")||(attr(node,"name")==="description"&&attr(node,"content")===expectedTitle));
   const legacyEncoding=only(["http-equiv","content"])&&String(attr(node,"http-equiv")).trim().toLowerCase()==="content-type"&&/^text\/html\s*;\s*charset\s*=\s*utf-8\s*$/i.test(attr(node,"content"));
   if(!charset&&!named&&!legacyEncoding)errors.push("bare report unsupported or unreviewed metadata");
  }
 }else if(issueDate&&require("./render-site.js").dailySectioned({date:issueDate,claims,tw_backfilled_on:issue.tw_backfilled_on,revised_on:issue.revised_on})){
  // 國際／臺灣 sections: headings and empty-section lines are renderer text, so the page must equal the render.
  let expected=null;try{expected=parse5.parse(require("./render-site.js").renderDailyEdition({date:issueDate,claims,tw_backfilled_on:issue.tw_backfilled_on,revised_on:issue.revised_on,links:issue.dailyLinks}))}catch(e){errors.push("daily renderer refused claims: "+e.message)}
  if(expected&&JSON.stringify(shellShape(document,true))!==JSON.stringify(shellShape(expected,true)))errors.push("registered daily page differs from trusted renderer output for its claims");
  else if(expected){const m=all(expected).find(n=>n.tagName==="main");return {errors,fixedText:new Set(all(m).filter(n=>substantive.has(n.tagName)&&!attr(n,"data-claim-id")&&attr(n,"data-claim-tags")==null&&attr(n,"data-claim-kind")==null).map(n=>normalized(text(n))))}}
 }else if(issueDate){
  const expected=parse5.parse(require("./render-site.js").renderDailyEdition({date:issueDate,claims:[]}));
  if(JSON.stringify(shellShape(document))!==JSON.stringify(shellShape(expected)))errors.push("registered daily shell differs from trusted renderer outside main");
 }else{
  const [channel,period]=issuePath.split("/"),renderer=require("./render-site.js");
  if(channel==="weekly"&&renderer.periodRange(channel,period)&&(renderer.weeklySectioned(claims)||issue.revised_on!==undefined||issue.taiwan_not_searched!==undefined)){
   // Sectioned weekly: section text is fixed renderer code, so the whole page must equal the render of its claims.
   const nav=renderer.weeklyNav(period,issue.weeklyPeriods||[]);
   let expected=null;try{expected=parse5.parse(renderer.renderWeeklyEdition({period,claims,revised_on:issue.revised_on,taiwan_not_searched:issue.taiwan_not_searched,nav}))}catch(e){errors.push("weekly renderer refused claims: "+e.message)}
   if(expected&&JSON.stringify(shellShape(document,true))!==JSON.stringify(shellShape(expected,true)))errors.push("registered weekly page differs from trusted renderer output for its claims");
   // The page equals the render, so every non-claim text node in it is renderer code or a value derived from claim fields.
   else if(expected){const m=all(expected).find(n=>n.tagName==="main");return {errors,fixedText:new Set(all(m).filter(n=>substantive.has(n.tagName)&&!attr(n,"data-claim-id")).map(n=>normalized(text(n))))}}
  }else if(channel==="weekly"&&renderer.periodRange(channel,period)){
   const expected=parse5.parse(renderer.renderWeeklyEdition({period,claims:[]}));
   if(JSON.stringify(shellShape(document))!==JSON.stringify(shellShape(expected)))errors.push("registered weekly shell differs from trusted renderer outside main");
  }else if(channel==="monthly"&&renderer.periodRange(channel,period)&&renderer.monthlySectioned(issue)){
   // Sectioned monthly: lists and counts derive from the frozen weeklies and the dailies, so compare against that render.
   let expected=null;try{expected=parse5.parse(renderer.renderMonthlyEdition({period,claims,indexed_weeklies:issue.indexed_weeklies,revised_on:issue.revised_on,taiwan_journals_not_searched:issue.taiwan_journals_not_searched,context:issue.monthlyContext}))}catch(e){errors.push("monthly renderer refused claims: "+e.message)}
   if(expected&&JSON.stringify(shellShape(document,true))!==JSON.stringify(shellShape(expected,true)))errors.push("registered monthly page differs from trusted renderer output for its claims");
   else if(expected){const m=all(expected).find(n=>n.tagName==="main");return {errors,fixedText:new Set(all(m).filter(n=>substantive.has(n.tagName)&&!attr(n,"data-claim-id")).map(n=>normalized(text(n))))}}
  }else if(channel==="monthly"&&renderer.periodRange(channel,period)){
   // Monthly section text inside main is fixed renderer code, so the whole page must equal the render of its claims.
   let expected=null;try{expected=parse5.parse(renderer.renderMonthlyEdition({period,claims}))}catch(e){errors.push("monthly renderer refused claims: "+e.message)}
   if(expected&&JSON.stringify(shellShape(document,true))!==JSON.stringify(shellShape(expected,true)))errors.push("registered monthly page differs from trusted renderer output for its claims");
   else if(expected)return {errors,fixedText:renderer.MONTHLY_FIXED};
  }else errors.push("registered report body outside main requires an approved renderer shell and a valid period");
 }
 return {errors,fixedText:new Set()};
}
function matchBody(document,claims,issueDate,issuePath,issue={}){
 const errors=[],mains=all(document).filter(n=>n.tagName==="main");
 if(mains.length!==1)return ["expected exactly one static main region"];
 const main=mains[0],nodes=all(main),content=nodes.filter(n=>substantive.has(n.tagName));
 const shellCheck=registeredShell(document,main,issueDate,issuePath,claims,issue);errors.push(...shellCheck.errors);
 for(let ancestor=main.parentNode;ancestor;ancestor=ancestor.parentNode){
  if((ancestor.attrs||[]).some(a=>["hidden","style","srcdoc","contenteditable"].includes(a.name)))errors.push("dynamic/hidden ancestor of main unsupported");
 }
 if(!content.length)errors.push("no inspectable substantive content nodes in main");
 const counts=new Map(),map=new Map(claims.filter(x=>x&&typeof x.claim_id==="string").map(x=>[x.claim_id,x]));
 for(const node of nodes){
  if(node.nodeName==="#comment"||node.nodeName==="#documentType")errors.push("comments/declarations unsupported within main");
  if(node.tagName&&!safeTags.has(node.tagName))errors.push("unsupported HTML tag in main: "+node.tagName);
  if(node.tagName&&node.namespaceURI!==HTML_NS)errors.push("non-HTML namespace unsupported within main");
  if((node.attrs||[]).some(a=>a.namespace||!(node===main?((a.name==="id"&&a.value==="content")||(a.name==="class"&&a.value==="content")):["data-claim-id","href","datetime","colspan","rowspan","scope"].includes(a.name)||(["data-claim-tags","data-claim-kind"].includes(a.name)&&node.tagName==="p")||(a.name==="data-kind"&&node.tagName==="p"&&attr(node,"data-claim-kind")!==undefined)||(a.name==="data-kind"&&node.tagName==="td"&&["policy","research","background","tw"].includes(a.value))||(a.name==="id"&&node.tagName==="tr"&&/^item-(\d+|b\d+|t\d+|c\d+|d\d+|f\d+)$/.test(a.value))||(issuePath.startsWith("weekly/")&&a.name==="id"&&node.tagName==="li"&&/^item-[tpr]?\d+$/.test(a.value))||(issuePath.startsWith("weekly/")&&a.name==="data-col"&&node.tagName==="td"&&["num","kind","date","tags","content"].includes(a.value))||(issuePath.startsWith("daily/")&&node.tagName==="p"&&((a.name==="id"&&/^[A-Za-z0-9_-]+$/.test(a.value)&&attr(node,"data-claim-kind")===a.value)||(a.name==="data-claim-links"&&/^[A-Za-z0-9_-]+$/.test(a.value))))||(a.name==="data-region"&&["h2","section"].includes(node.tagName)&&["intl","tw"].includes(a.value))||(a.name==="data-part"&&node.tagName==="section"&&a.value==="overview")||(issuePath.startsWith("weekly/")&&a.name==="id"&&node.tagName==="section"&&/^sec-[a-z_]+$/.test(a.value))||(issuePath.startsWith("monthly/")&&((a.name==="id"&&node.tagName==="section"&&/^sec-[a-z_]+$/.test(a.value))||(a.name==="id"&&node.tagName==="li"&&/^item-[lr]\d+$/.test(a.value))||(a.name==="data-col"&&node.tagName==="td"&&["num","kind","date","audience","tags","content"].includes(a.value)))))))errors.push("dynamic/hidden or unsupported HTML attributes within main");
 }
 /* Daily tag line (manager decision 2026-10-11): a plain <p data-claim-tags="ID"> directly after the
    claim's own element, whose text must equal dailyTagText(claim); at most once per claim, daily only. */
 const tagCounts=new Map();
 for(const node of nodes.filter(n=>attr(n,"data-claim-tags")!==undefined&&attr(n,"data-claim-tags")!==null)){
  const id=attr(node,"data-claim-tags"),c=map.get(id),expected=c?dailyTagText(c):"";
  if(!issuePath.startsWith("daily/")){errors.push("claim tag line allowed only in daily editions");continue}
  if(attr(node,"data-claim-id")){errors.push("claim tag line cannot also be a claim: "+id);continue}
  if(!c){errors.push("claim tag line names unknown claim "+id);continue}
  tagCounts.set(id,(tagCounts.get(id)||0)+1);
  if(tagCounts.get(id)>1)errors.push("claim tag line repeated: "+id);
  // Each tag may sit in its own plain <span> so it can be styled as a chip; the joined text must still match.
  const plainSpan=x=>x.tagName==="span"&&!(x.attrs||[]).length&&children(x).every(y=>y.nodeName==="#text");
  if(!expected||normalized(text(node))!==expected||children(node).some(x=>x.nodeName!=="#text"&&!plainSpan(x)))errors.push("claim tag line differs from claim fields: "+id);
  const siblings=children(node.parentNode).filter(x=>x.tagName),prev=siblings[siblings.indexOf(node)-1];
  if(!prev||attr(prev,"data-claim-id")!==id)errors.push("claim tag line must directly follow its claim: "+id);
 }
 /* Daily kind badge (manager request 2026-10-17): a plain <p data-claim-kind="ID" data-kind="policy|research">
    directly before its claim, whose text and colour class must equal the renderer's label for the claim's kind. */
 const kindCounts=new Map(),{dailyKind}=require("./render-site.js");
 for(const node of nodes.filter(n=>attr(n,"data-claim-kind")!==undefined&&attr(n,"data-claim-kind")!==null)){
  const id=attr(node,"data-claim-kind"),c=map.get(id);
  if(!issuePath.startsWith("daily/")){errors.push("claim kind badge allowed only in daily editions");continue}
  if(attr(node,"data-claim-id")||attr(node,"data-claim-tags")){errors.push("claim kind badge cannot also be a claim or tag line: "+id);continue}
  if(!c){errors.push("claim kind badge names unknown claim "+id);continue}
  kindCounts.set(id,(kindCounts.get(id)||0)+1);
  if(kindCounts.get(id)>1)errors.push("claim kind badge repeated: "+id);
  const [cls,label]=dailyKind(c);
  if(normalized(text(node))!==label||attr(node,"data-kind")!==cls||children(node).some(x=>x.nodeName!=="#text"))errors.push("claim kind badge differs from claim fields: "+id);
  const siblings=children(node.parentNode).filter(x=>x.tagName),next=siblings[siblings.indexOf(node)+1];
  if(!next||attr(next,"data-claim-id")!==id)errors.push("claim kind badge must directly precede its claim: "+id);
 }
 for(const node of content){
  const t=normalized(text(node));if(!t)continue;
  if(attr(node,"data-claim-tags")!==undefined&&attr(node,"data-claim-tags")!==null)continue;
  if(attr(node,"data-claim-kind")!==undefined&&attr(node,"data-claim-kind")!==null)continue;
  const id=attr(node,"data-claim-id");
  if(!id&&shellCheck.fixedText.has(t))continue;
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
 // Weekly items repeated from a daily brief are shown as one derived line (manager 2026-10-17, C1); their text is the daily's.
 const asLine=c=>issuePath.startsWith("weekly/")&&["briefs","late","taiwan"].includes(c.weekly_section)&&typeof c.weekly_source_claim==="string"&&/^D\d{8}-\d{2}$/.test(c.weekly_source_claim);
 for(const c of claims){if(!c||typeof c.claim_id!=="string")continue;const count=counts.get(c.claim_id)||0;if(count!==(asLine(c)?0:1))errors.push("claim must appear exactly once in HTML: "+c.claim_id+" ("+count+")")}
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
/* Sectioned weekly claims: every claim names a known section; at most five featured items, each marked as
   checked against the full text; every other item names the daily claim it repeats. Structural only. */
/* Foreign government bodies named in the text carry their country or region (manager 2026-10-17: 「中國教育部」, not 「教育部」).
   Checked on items whose source_country is a foreign code; the 來源機構 field before the first 。 is already the full name. */
const AGENCY_WORDS=/(教育部(?!門)|文部科學省|教育廳|教育局|教育課程評價院|教育學術資訊院|國家教育研究院|教育研究院)/g;
function unnamedForeignAgency(c){
 if(!c||typeof c.source_country!=="string"||["TW","INTL"].includes(c.source_country)||c.region==="tw")return false;
 const names=Object.values(require("./render-site.js").COUNTRY).concat(["中華人民共和國","大韓民國","中共中央","國務院"]);
 const t=String(c.claim_text||""),body=t.slice(t.indexOf("。")+1);
 for(const m of body.matchAll(AGENCY_WORDS)){const before=body.slice(Math.max(0,m.index-8),m.index);if(!names.some(n=>before.endsWith(n)))return true}
 return false;
}
/* 風險關切與政策調整 (manager decision 2026-10-19, plan F2): a weekly item may carry a caution mark the
   renderer lists in its own section. The fields are all present or all absent; the original excerpt must sit verbatim
   in the item's evidence snapshot and come from the title, abstract or first paragraph; Taiwan items, speeches and
   drafts are never marked. The line itself is built by the renderer, so no editorial verbs reach the page. */
/* Third joint review, batch A2 (manager 2026-10-21 「照建議」): a quoted fragment is marked 節譯; a translation may not
   add obligation (必須/務必) or causation (導致/造成) the original does not state; a person quoted in a statement is named. */
const isFragment=t=>{const x=String(t||"").trim();return /^[\s"“'‘(\[]*[a-z]/.test(x)||!/[.!?。！？]["”'’)\]]*$/.test(x)||/…|\.\.\./.test(x)};
function toneErrors(ex,zh,label){
 const e=[],o=String(ex||""),z=String(zh||"");
 if(/必須|務必/.test(z)&&!/\b(must|required?|requires|requiring|mandatory|shall|obliged|ha(?:ve|s) to|debe[n]?|obligatori[oa]|muss|müssen|doi(?:t|vent))\b/i.test(o))e.push(label+" adds 必須/務必 where the original states no obligation");
 if(/導致|造成/.test(z)&&!/\b(caus(?:e[sd]?|ing)|lead(?:s|ing)? to|led to|result(?:s|ed|ing)? in|driv(?:e[sn]?|ing)|produc(?:e[sd]?|ing))\b/i.test(o))e.push(label+" adds 導致/造成 where the original states no cause");
 return e;
}
const QUOTED_SPEAKER=/\b(said|says|stated|according to)\b/i;
const CAUTION_FIELDS=["caution_kind","caution_excerpt","caution_excerpt_zh","caution_locator","caution_confirmed_on"];
// caution_partial marks a translation of only part of the excerpt (節譯).
const CAUTION_KINDS=["policy_change","warning","investigation","statement","risk_research"];
function cautionErrors(c,sec,range,root){
 const has=CAUTION_FIELDS.filter(f=>c[f]!==undefined),extra=["caution_direction","caution_prior_url","caution_partial"].filter(f=>c[f]!==undefined);
 if(c.caution_partial!==undefined&&c.caution_partial!==true)return ["caution_partial is true or absent"];
 if(!has.length)return extra.length?["caution_direction and caution_prior_url need a caution mark"]:[];
 if(has.length!==CAUTION_FIELDS.length)return ["a caution mark needs all of "+CAUTION_FIELDS.join(", ")];
 const e=[],from=require("./render-site.js").CAUTION_FROM_PERIOD;
 if(!(range.start&&range.start>=from))e.push("caution marks start with the "+from+" weekly");
 if(!["featured","briefs","late"].includes(sec))e.push("only featured, brief and late items carry a caution mark");
 if(c.region==="tw")e.push("Taiwan items do not carry a caution mark");
 if(["speech","draft"].includes(c.source_document_type))e.push("speeches and drafts do not carry a caution mark");
 if(!CAUTION_KINDS.includes(c.caution_kind))e.push("caution_kind must be one of "+CAUTION_KINDS.join(", "));
 if(c.caution_kind==="risk_research"&&c.kind!=="research")e.push("risk_research marks a research item");
 if(c.caution_kind!=="risk_research"&&c.kind==="research")e.push("a research item can only be marked risk_research");
 if(c.caution_kind==="policy_change"&&!["binding_policy","official_guidance","official_commentary"].includes(c.source_document_type))e.push("policy_change marks a policy, guidance or official release");
 if((c.caution_kind==="policy_change")!==(c.caution_direction!==undefined))e.push("caution_direction is required for policy_change and only there");
 if(c.caution_direction!==undefined&&!["tighten","loosen","other"].includes(c.caution_direction))e.push("caution_direction must be tighten, loosen or other");
 if(c.caution_prior_url!==undefined&&!(typeof c.caution_prior_url==="string"&&/^https:\/\/\S+$/.test(c.caution_prior_url)))e.push("caution_prior_url must be an https URL");
 const ex=c.caution_excerpt,zh=c.caution_excerpt_zh;
 if(typeof ex!=="string"||ex.trim().length<8||ex.length>120)e.push("caution_excerpt must be 8-120 characters");
 else if(root){
  const ev=String(c.evidence_path||"");
  if(!/^publication\/sources\/[A-Za-z0-9._-]+$/.test(ev))e.push("caution_excerpt needs the item's evidence snapshot");
  else{let t="";try{t=fs.readFileSync(path.join(root,ev),"utf8")}catch{}if(!t.includes(ex))e.push("caution_excerpt must appear verbatim in the evidence snapshot")}
 }
 if(typeof zh!=="string"||!zh.trim()||zh.length>60)e.push("caution_excerpt_zh must be 1-60 characters");
 if(typeof ex==="string"&&isFragment(ex)&&c.caution_partial!==true)e.push("caution_excerpt is a fragment: mark it caution_partial (節譯)");
 e.push(...toneErrors(ex,zh,"caution_excerpt_zh"));
 if(typeof c.caution_locator!=="string"||!/^(標題|摘要|首段)/.test(c.caution_locator)||c.caution_locator.length>80)e.push("caution_locator must start with 標題, 摘要 or 首段");
 if(!(isoDate(c.caution_confirmed_on)&&(!isoDate(c.checked_at)||c.caution_confirmed_on>=c.checked_at)))e.push("caution_confirmed_on must be an ISO date not before checked_at");
 return e;
}
/* 國外反思選讀 items (manager decision 2026-10-20, plans 甲 and 乙; joint review 2026-10-20 batch 1): commentary, statements and risk passages that run
   only in that section. The quoted original is the claim's original_excerpt (verbatim in the pinned snapshot, checked by
   sourceTrace); the line is built by the renderer from these fields and must equal claim_text. Taiwan items never. */
const REFLECT_FIELDS=["reflect_type","reflect_excerpt_zh","reflect_locator","reflect_confirmed_on"];
const REFLECT_OPTIONAL=["reflect_author","reflect_mixed","reflect_partial"];
function reflectionErrors(c){
 const e=[],r=require("./render-site.js"),t=c.reflect_type;
 if(!Object.keys(r.REFLECT_TYPES).includes(t))e.push("reflect_type must be one of "+Object.keys(r.REFLECT_TYPES).join(", "));
 if((t==="research")!==(c.kind==="research"))e.push("reflect_type research marks a research item, and only research items");
 const short=(v,max)=>typeof v==="string"&&v.trim().length>0&&v.length<=max&&!/[\r\n<>\p{Cf}]/u.test(v);
 if(t==="commentary"&&!short(c.reflect_author,120))e.push("expert commentary needs its named author(s) in reflect_author");
 if(c.reflect_author!==undefined&&!short(c.reflect_author,120))e.push("reflect_author must be a short name");
 if(!short(c.source_organization,120))e.push("reflection item needs source_organization");
 if(!(typeof c.source_country==="string"&&(c.source_country==="INTL"||/^[A-Z]{2}(-[A-Z]{3})?$/.test(c.source_country))))e.push("reflection item needs source_country (ISO code or INTL)");
 if(c.source_country==="TW"||c.region==="tw")e.push("Taiwan items are not listed in 國外反思選讀");
 if(!short(c.source_title,300))e.push("reflection item needs source_title");
 if(typeof c.original_excerpt!=="string"||c.original_excerpt.length>300)e.push("reflection original_excerpt must be at most 300 characters");
 if(!short(c.reflect_excerpt_zh,120))e.push("reflect_excerpt_zh must be 1-120 characters");
 if(!short(c.reflect_locator,80))e.push("reflect_locator must be 1-80 characters");
 // The manager-confirmed quote and translation carry the two-pass crosscheck and the translation review (joint review 2026-10-20).
 if(c.claim_class!=="descriptive"||c.risk_tier!=="medium"||c.translation_reviewed!==true)e.push("reflection item is a descriptive, medium-risk claim with a reviewed translation (two-pass crosscheck)");
 if(c.reflect_partial!==undefined&&c.reflect_partial!==true)e.push("reflect_partial is true or absent");
 if(typeof c.original_excerpt==="string"&&isFragment(c.original_excerpt)&&c.reflect_partial!==true)e.push("original_excerpt is a fragment: mark it reflect_partial (節譯)");
 e.push(...toneErrors(c.original_excerpt,c.reflect_excerpt_zh,"reflect_excerpt_zh"));
 if(["statement","joint_statement"].includes(t)&&QUOTED_SPEAKER.test(String(c.original_excerpt||""))&&!short(c.reflect_author,120))e.push("a statement quoting a person names the speaker and role in reflect_author");
 if(t==="joint_statement"&&!/[、，,]/.test(String(c.source_organization||"")))e.push("a joint statement names all of its issuers in source_organization, separated by 、");
 if(c.reflect_mixed!==undefined&&(c.reflect_mixed!==true||!["report","official","research"].includes(t)))e.push("reflect_mixed is true or absent, and only on report, official or research passages");
 if(!(isoDate(c.reflect_confirmed_on)&&(!isoDate(c.checked_at)||c.reflect_confirmed_on>=c.checked_at)))e.push("reflect_confirmed_on must be an ISO date not before checked_at");
 if(!["k12","other_stakeholders"].includes(c.audience))e.push("reflection items concern schools: audience k12 or other_stakeholders");
 if(!isoDate(c.first_disclosed_on))e.push("reflection item needs a YYYY-MM-DD first_disclosed_on");
 if(c.claim_text!==r.reflectionText(c))e.push("reflection claim_text must equal the line built from its fields");
 return e;
}
function weeklyStructure(claims,period,ctx={}){
 const errors=[],r=require("./render-site.js"),keys=[...r.WEEKLY_SECTIONS,...r.TW_SECTIONS].map(x=>x[0]).concat("reflection"),list=claims.filter(c=>c&&typeof c==="object");
 // From the 2026-10-16 period, and whenever a Taiwan item is present, a weekly must use the sectioned layout.
 if(!r.weeklySectioned(list)){
  if((r.periodRange("weekly",period)&&String(period)>=r.TW_FROM_PERIOD)||list.some(c=>c.region==="tw"))errors.push("weekly from "+r.TW_FROM_PERIOD+" or with Taiwan items must use weekly_section (Taiwan area required)");
  return errors;
 }
 const issue=ctx.issue||{},daily=ctx.dailyClaims;
 if(issue.taiwan_not_searched===true&&list.some(c=>c.weekly_section==="taiwan"))errors.push("taiwan_not_searched contradicts Taiwan items in this issue");
 const range=r.periodRange("weekly",period)||{},byId=new Map(list.map(c=>[c.claim_id,c]));
 const inIssue=id=>{const c=byId.get(id);return !!c&&["featured","briefs"].includes(c.weekly_section)};
 const inTw=id=>{const c=byId.get(id);return !!c&&["taiwan","tw_compare"].includes(c.weekly_section)};
 const TW=new Set(["taiwan","tw_compare","tw_note"]);
 for(const c of list){
  const id=c.claim_id,sec=c.weekly_section;
  if(!keys.includes(sec)){errors.push(id+": weekly claim section must be one of "+keys.join(", "));continue}
  // Every value the renderer prints outside claim_text must be a checked shape, not free text.
  if(!isoDate(c.first_disclosed_on))errors.push(id+": first_disclosed_on must be a real YYYY-MM-DD date");
  for(const f of ["claim_text","title_zh"])if(typeof c[f]==="string"&&/\p{Cf}/u.test(c[f]))errors.push(id+": "+f+" contains invisible format characters");
  // A weekly item that repeats a daily item must point at a registered daily claim of the same region.
  if(daily&&typeof c.weekly_source_claim==="string"&&["featured","briefs","late","taiwan"].includes(sec)){
   const d=daily.get(c.weekly_source_claim);
   if(!d)errors.push(id+": weekly_source_claim "+c.weekly_source_claim+" is not a registered daily claim");
   else{
    if((d.region==="tw")!==(sec==="taiwan"))errors.push(id+": weekly section and daily region differ for "+c.weekly_source_claim);
    // Shown as a line linking to the daily item: text, date, link, kind and document type must all be the daily's.
    if(sec!=="featured"){
     if(d.claim_text!==c.claim_text)errors.push(id+": weekly item text must equal its daily claim "+c.weekly_source_claim+" (it is shown as a line linking there)");
     for(const f of ["first_disclosed_on","source_url","kind","source_document_type"])if(d[f]!==c[f])errors.push(id+": weekly item "+f+" must equal its daily claim "+c.weekly_source_claim);
    }
   }
  }
  if(["featured","briefs","background","taiwan","tw_compare"].includes(sec)){
   if(c.kind==="news_policy"&&!["binding_policy","official_guidance","draft","official_commentary","training_event","speech"].includes(c.source_document_type))errors.push(id+": missing or invalid policy document type");
   if(c.kind==="research"&&!["peer_reviewed_article","preprint"].includes(c.source_document_type))errors.push(id+": missing or invalid research document type");
  }
  if(sec==="reflection"){
   if(!(range.start&&range.start>=r.CAUTION_FROM_PERIOD))errors.push(id+": reflection items start with the "+r.CAUTION_FROM_PERIOD+" weekly");
   if(range.start&&!(c.first_disclosed_on>=range.start&&c.first_disclosed_on<=range.end))errors.push(id+": weekly reflection item must be first disclosed within the period");
   errors.push(...reflectionErrors(c).map(e=>id+": "+e));
  }
  if(c.title_zh!==undefined&&typeof c.title_zh==="string"){
   if(/[\u3400-\u9fff]/.test(String(c.source_title))||!/[A-Za-z]/.test(String(c.source_title)))errors.push(id+": title_zh only translates a non-Chinese source title");
   const n=String(c.title_zh).normalize("NFKC").replace(/[\p{Cf}\s]/gu,""),hits=WEEKLY_TITLE_BANNED.filter(w=>n.includes(w));
   if(hits.length)errors.push(id+": title_zh contains editorial or advice words: "+hits.join("、"));
   if(!check({...c,claim_text:c.title_zh}).allow&&check({...c,claim_text:c.title_zh}).reasons.some(r=>r.includes("high-risk assertion")))errors.push(id+": title_zh reads as a high-risk assertion");
  }
  if(c.assertion_type==="editorial_analysis"&&sec!=="overview"&&sec!=="tw_note")errors.push(id+": editorial analysis belongs only in the overview or the Taiwan note");
  // Taiwan items live only in the Taiwan area, and international items never do.
  if(c.region!==undefined&&!["intl","tw"].includes(c.region))errors.push(id+": region must be intl or tw");
  if(TW.has(sec)!==(c.region==="tw"))errors.push(id+": region tw belongs exactly to the Taiwan sections");
  if(c.taiwan_sample!==undefined&&(c.taiwan_sample!==true||!["featured","briefs"].includes(sec)))errors.push(id+": taiwan_sample marks an international featured or brief item");
  if(sec==="taiwan"){
   if(range.start&&!(c.first_disclosed_on>=range.start&&c.first_disclosed_on<=range.end))errors.push(id+": weekly item must be first disclosed within the period");
   if(!(typeof c.weekly_source_claim==="string"&&/^D\d{8}-\d{2}$/.test(c.weekly_source_claim)))errors.push(id+": Taiwan item must name its daily source claim");
  }
  if(sec==="tw_compare"){
   if(!(typeof c.first_disclosed_on==="string"&&range.start&&c.first_disclosed_on<range.start))errors.push(id+": Taiwan comparison document must be first disclosed before the period (this week's Taiwan items go in 臺灣本週動態)");
   const rel=Array.isArray(c.related_claim_ids)?c.related_claim_ids:[];
   if(!rel.length||new Set(rel).size!==rel.length||!rel.every(inIssue))errors.push(id+": Taiwan comparison must relate to distinct international featured or brief items");
  }
  if(sec==="tw_note"){
   if(c.assertion_type!=="editorial_analysis"||c.claim_class!=="descriptive")errors.push(id+": Taiwan note must be descriptive editorial analysis");
   const ids=Array.isArray(c.supporting_claim_ids)?c.supporting_claim_ids:[];
   if(new Set(ids).size!==ids.length||!ids.some(inIssue)||!ids.some(inTw)||!ids.every(x=>inIssue(x)||inTw(x)))errors.push(id+": Taiwan note must cite at least one international item and one Taiwan item of this issue");
   if(typeof c.claim_text!=="string"||c.claim_text.length>150)errors.push(id+": Taiwan note sentence must be at most 150 characters");
   const n=foldText(c.claim_text),hits=WEEKLY_TW_NOTE_BANNED.filter(w=>n.includes(w));
   if(hits.length||ADVICE_PATTERN.test(n))errors.push(id+": Taiwan note uses evaluation, outcome or advice words: "+(hits.join("、")||"advice pattern"));
  }
  if(c.title_zh!==undefined&&(typeof c.title_zh!=="string"||!c.title_zh.trim()||c.title_zh.length>200))errors.push(id+": title_zh must be a short non-empty string");
  if(sec==="featured"&&c.full_text_checked!==true)errors.push(id+": featured weekly item must be checked against the full text");
  const fromCutover=range.start&&range.start>=r.TW_FROM_PERIOD.slice(0,10);
  // Featured items carry the four facets (joint review D5), extended to the 2026-10-09 period (joint review E1b).
  if(sec==="featured"&&range.start&&range.start>="2026-10-09"){
   const need=c.kind==="research"?["樣本","設計","作者所述發現","限制"]:["內容"],miss=need.filter(f=>!String(c.claim_text).includes("。"+f+"："));
   if(miss.length)errors.push(id+": featured item must have the facets "+need.join("、")+" (missing "+miss.join("、")+")");
  }
  if(c.source_country!==undefined&&!(typeof c.source_country==="string"&&(c.source_country==="INTL"||/^[A-Z]{2}(-[A-Z]{3})?$/.test(c.source_country))))errors.push(id+": source_country must be an ISO code or INTL");
  errors.push(...cautionErrors(c,sec,range,ctx.root).map(e=>id+": "+e));
  if(fromCutover&&c.kind!=="research"&&["featured","briefs","late"].includes(sec)&&c.source_country===undefined)errors.push(id+": policy item needs source_country (joint review D4)");
  if(c.self_reported_outcome!==undefined&&c.self_reported_outcome!==true)errors.push(id+": self_reported_outcome is true or absent");
  if(sec==="late"){
   if(!(typeof c.weekly_source_claim==="string"&&/^D\d{8}-\d{2}$/.test(c.weekly_source_claim)))errors.push(id+": late item must name its daily source claim");
   const back=range.start?new Date(Date.parse(range.start+"T00:00:00Z")-14*864e5).toISOString().slice(0,10):"";
   if(!(isoDate(c.first_disclosed_on)&&range.start&&c.first_disclosed_on<range.start&&c.first_disclosed_on>=back))errors.push(id+": late item must be first disclosed in the two weeks before the period");
   if(c.region==="tw")errors.push(id+": Taiwan items go in 臺灣本週動態");
  }
  // An official speech the manager chose to mention (e.g. Ofqual 2026-10-16) need not have run as a daily item.
  if(sec==="briefs"&&c.source_document_type!=="speech"&&!(typeof c.weekly_source_claim==="string"&&/^D\d{8}-\d{2}$/.test(c.weekly_source_claim)))errors.push(id+": weekly brief must name its daily source claim");
  if(c.source_document_type==="speech"&&(c.kind!=="news_policy"||sec!=="briefs"))errors.push(id+": a speech is a news_policy brief");
  if((sec==="featured"||sec==="briefs")&&range.start&&!(c.first_disclosed_on>=range.start&&c.first_disclosed_on<=range.end))errors.push(id+": weekly item must be first disclosed within the period");
  if(sec==="background"){
   if(!(typeof c.first_disclosed_on==="string"&&range.start&&c.first_disclosed_on<range.start))errors.push(id+": background item must be first disclosed before the period");
   const rel=Array.isArray(c.related_claim_ids)?c.related_claim_ids:[];
   if(!rel.length||new Set(rel).size!==rel.length||!rel.every(inIssue))errors.push(id+": background item must relate to distinct featured or brief items of this issue");
  }else if(c.related_claim_ids!==undefined&&sec!=="tw_compare")errors.push(id+": related_claim_ids only apply to background and Taiwan comparison items");
  if(sec==="overview"){
   if(c.assertion_type!=="editorial_analysis"||c.claim_class!=="descriptive")errors.push(id+": overview must be descriptive editorial analysis");
   const ids=Array.isArray(c.supporting_claim_ids)?c.supporting_claim_ids:[];
   if(ids.length<2||new Set(ids).size!==ids.length||!ids.every(inIssue))errors.push(id+": overview needs at least two distinct featured or brief items of this issue");
   else if(new Set(ids.map(x=>byId.get(x).source_url)).size<2)errors.push(id+": overview needs at least two different sources");
   if(typeof c.claim_text!=="string"||c.claim_text.length>150)errors.push(id+": overview sentence must be at most 150 characters");
   const banned=bannedIn(c.claim_text);
   if(banned.length)errors.push(id+": overview uses words reserved for outcome or advice claims: "+banned.join("、"));
  }else if(c.supporting_claim_ids!==undefined&&sec!=="tw_note")errors.push(id+": supporting_claim_ids only apply to the overview and the Taiwan note");
 }
 const count=s=>list.filter(c=>c.weekly_section===s).length;
 if(count("featured")>r.WEEKLY_FEATURED_MAX)errors.push("weekly featured items exceed "+r.WEEKLY_FEATURED_MAX);
 if(count("overview")>r.WEEKLY_OVERVIEW_MAX)errors.push("weekly overview sentences exceed "+r.WEEKLY_OVERVIEW_MAX);
 if(count("background")>r.WEEKLY_BACKGROUND_MAX)errors.push("weekly background items exceed "+r.WEEKLY_BACKGROUND_MAX);
 if(count("tw_note")>r.WEEKLY_TW_NOTE_MAX)errors.push("weekly Taiwan note sentences exceed "+r.WEEKLY_TW_NOTE_MAX);
 if(count("tw_compare")>r.WEEKLY_TW_COMPARE_MAX)errors.push("weekly Taiwan comparison rows exceed "+r.WEEKLY_TW_COMPARE_MAX);
 if(count("reflection")>r.REFLECT_WEEKLY_MAX)errors.push("weekly reflection items exceed "+r.REFLECT_WEEKLY_MAX);
 errors.push(...reflectionSpread(list.filter(c=>c.weekly_section==="reflection")));
 // A reflection item is not a second copy of an item this issue already lists: mark that item instead.
 const listedKeys=new Set(list.filter(c=>["featured","briefs","late","background"].includes(c.weekly_section)).flatMap(c=>[...sourceKeys(c)]));
 for(const c of list.filter(x=>x.weekly_section==="reflection"))if([...sourceKeys(c)].some(k=>listedKeys.has(k)))errors.push(c.claim_id+": this source is already an item of this issue; mark that item instead of adding a reflection item");
 return errors;
}
/* At most two items per organisation, one per source. */
function reflectionSpread(items){
 const errors=[],orgs=new Map(),urls=new Set();
 for(const c of items){const o=String(c.source_organization||"").trim().toLowerCase();orgs.set(o,(orgs.get(o)||0)+1);
  for(const k of sourceKeys(c)){if(urls.has(k))errors.push(c.claim_id+": the same source is listed twice in 國外反思選讀");urls.add(k)}}
 for(const [o,k] of orgs)if(k>2)errors.push("國外反思選讀 lists more than two items from "+o);
 return errors;
}
/* Overview sentences only group what this issue's items say; they may not claim outcomes, trends or advice. */
const WEEKLY_OVERVIEW_BANNED=["成效","有效","效果","提升","提高","改善","導致","导致","因果","證明","证明","證實","证实","顯著","显著","趨勢","趋势","建議","建议","推薦","推荐","應該","应该","必須","必须","臺灣","台灣","台湾"];
/* The Taiwan note may name 臺灣 but, like the overview, makes no outcome, evaluation or advice claim. */
/* Fold invisible characters, spaces and Japanese/variant forms before matching, so 値得 or 効果 do not slip past. */
const VARIANTS={"値":"值","効":"效","応":"應","来":"來","参":"參","与":"與"};
const foldText=t=>String(t).normalize("NFKC").replace(/[\p{Cf}\s]/gu,"").replace(/[値効応来参与]/g,ch=>VARIANTS[ch]);
/* Advice aimed at Taiwan or its agencies, without blocking 對應、因應、應用. */
const ADVICE_PATTERN=/(臺灣|台灣|台湾|我國|我国|教育部|國教署|国教署|政府).{0,12}(應該|应该|應|应|宜|需要|須|须|必須|可參考|可参考|參考|参考|仿效|效法|借鑑|借鉴|借鏡|补强|補強)/;
const WEEKLY_TW_NOTE_BANNED=["較為","較少","較多","較低","較高","更為","更加","不如","不及","遜於","超越","優勢","劣勢","薄弱","缺乏","落差","補強","完善","仿效","效法","借鑑","借鉴","成效","有效","效果","提升","提高","改善","導致","导致","因果","證明","证明","證實","证实","顯著","显著","趨勢","趋势","建議","建议","推薦","推荐","應該","应该","必須","必须","落後","落后","領先","领先","不足","優於","优于","劣於","劣于","借鏡","借镜","值得"];
/* A faithful title translation may say 提升 or 臺灣 (the source title can); it never speaks for the newsletter. */
const WEEKLY_TITLE_BANNED=["本刊","建議","建议","推薦","推荐","應該","应该","必須","必须","呼籲","呼吁"];
const bannedIn=t=>{const n=foldText(t);return WEEKLY_OVERVIEW_BANNED.filter(w=>n.includes(w)).concat(ADVICE_PATTERN.test(n)?["advice pattern"]:[])};
const isoDate=d=>typeof d==="string"&&/^\d{4}-\d{2}-\d{2}$/.test(d)&&Number.isFinite(Date.parse(d+"T00:00:00Z"))&&new Date(d+"T00:00:00Z").toISOString().slice(0,10)===d;
/* Monthly claims: every claim names a known section; scholar items name their research group; an editorial
   analysis sits only under trends, stays descriptive (no human review) and rests on at least two other claims
   in the same issue from at least two different research groups. Structural only: it cannot judge the trend. */
function monthlyStructure(claims){
 const errors=[],{MONTHLY_SECTIONS}=require("./render-site.js"),keys=MONTHLY_SECTIONS.map(x=>x[0]);
 const list=claims.filter(c=>c&&typeof c==="object"),byId=new Map(list.map(c=>[c.claim_id,c]));
 const group=c=>typeof c.research_group==="string"&&c.research_group.trim()?c.research_group.trim():null;
 for(const c of list){
  const id=c.claim_id;
  if(!keys.includes(c.section))errors.push(id+": monthly claim section must be one of "+keys.join(", "));
  if(c.section==="scholars"&&!group(c))errors.push(id+": tracked-scholar claim needs research_group");
  if(c.assertion_type==="editorial_analysis"){
   if(c.section!=="trends")errors.push(id+": editorial analysis belongs only in the trends section");
   if(c.claim_class!=="descriptive")errors.push(id+": trend analysis must stay descriptive");
   const ids=Array.isArray(c.supporting_claim_ids)?c.supporting_claim_ids:[];
   if(new Set(ids).size!==ids.length||ids.length<2)errors.push(id+": trend analysis needs at least two distinct supporting_claim_ids");
   const support=ids.map(x=>byId.get(x));
   if(ids.includes(id)||support.some(x=>!x||x.assertion_type==="editorial_analysis"))errors.push(id+": supporting claims must be other non-analysis claims in this issue");
   else{
    if(support.some(x=>!group(x)))errors.push(id+": every supporting claim needs research_group");
    if(new Set(support.map(group).filter(Boolean)).size<2)errors.push(id+": trend needs at least two different research groups");
   }
  }else if(c.supporting_claim_ids!==undefined)errors.push(id+": supporting_claim_ids only apply to editorial analysis");
 }
 return errors;
}
/* Identity of a source across channels: canonical URL, evidence URL and DOI (manager 2026-10-17: a monthly lists
   weekly and daily items but does not repeat them, and a weekly does not repeat a monthly item). */
const SITE_PREFIX="https://jhchenmooc.github.io/";
const DOI_PREFIX=/^(?:https?:\/\/(?:dx\.|www\.)?doi\.org\/|doi:)/i;
const normDoi=d=>{let x=String(d).trim().replace(DOI_PREFIX,"");try{x=decodeURIComponent(x)}catch{}return x.toLowerCase()};
/* A URL key that ignores www., a trailing slash and host case, besides the canonical form. */
const looseUrl=k=>{try{const u=new URL(k);return "url:"+u.hostname.toLowerCase().replace(/^www\./,"")+u.pathname.replace(/\/+$/,"")+u.search}catch{return ""}};
function sourceKeys(c){
 const keys=new Set();if(!c||typeof c!=="object")return keys;
 for(const u of [c.source_url,c.evidence_source_url]){const k=canonical(u);if(k&&!k.startsWith(SITE_PREFIX)){keys.add(k);const l=looseUrl(k);if(l)keys.add(l)}
  if(typeof u==="string"&&/^https?:\/\/(?:dx\.|www\.)?doi\.org\//i.test(u.trim()))keys.add("doi:"+normDoi(u))}
 if(typeof c.doi==="string"&&c.doi.trim())keys.add("doi:"+normDoi(c.doi));
 return keys;
}
const MONTHLY_ITEM_SECTIONS=["policy","research","tw_policy","tw_research"];
const MONTHLY_ITEM_END=/（(?:臺灣對照，非本[週月]新訊；)?AI 輔助(?:整理|摘要)，未經真人逐則審稿；請參閱原文。）$/,MONTHLY_ANALYSIS_END="（編輯歸納，AI 整理，未經真人審閱。）";
const withoutEnd=t=>String(t).replace(MONTHLY_ITEM_END,"").replace(MONTHLY_ANALYSIS_END,"");
/* Sectioned monthly claims (plan research/drafts/2026-10-17-monthly-redesign-plan.md §8). Structural only. */
function monthlyStructureSectioned(claims,period,ctx={}){
 const errors=[],r=require("./render-site.js"),w=r.monthlyWindow(period),list=claims.filter(c=>c&&typeof c==="object");
 if(!w)return ["monthly period invalid"];
 const issue=ctx.issue||{},byId=new Map(list.map(c=>[c.claim_id,c]));
 const listing=r.monthlyListing({context:issue.monthlyContext||{}},w),listed=new Map(listing.all.map(x=>[x.c.claim_id,x.c]));
 const twListed=new Set(listing.tw.map(x=>x.c.claim_id));
 const sec=id=>(byId.get(id)||{}).section,isAnalysis=c=>["overview_line","overview","tw_note"].includes(c.section)||(c.section==="trends"&&c.assertion_type==="editorial_analysis");
 const numbered=id=>["policy","research","scholars"].includes(sec(id));
 const intlRef=id=>numbered(id)||sec(id)==="background"||(listed.has(id)&&!twListed.has(id));
 const twRef=id=>["tw_policy","tw_research","tw_compare"].includes(sec(id))||twListed.has(id);
 const resolve=id=>byId.get(id)||listed.get(id);
 const others=ctx.otherKeys||new Map(),inWin=d=>isoDate(d)&&d>=w.start&&d<=w.end;
 const lastDay=Date.parse(w.end+"T00:00:00Z");
 for(const c of list){
  const id=c.claim_id,s=c.section;
  if(!r.MONTHLY_KEYS.includes(s)){errors.push(id+": monthly claim section must be one of "+r.MONTHLY_KEYS.join(", "));continue}
  if(s==="reflection"){
   // This month or last month (plan 乙), and not listed in an earlier monthly's 國外反思選讀.
   if(String(period)<r.REFLECT_MONTHLY_FROM)errors.push(id+": monthly reflection items start with the "+r.REFLECT_MONTHLY_FROM+" issue");
   if(!(isoDate(c.first_disclosed_on)&&c.first_disclosed_on>=w.prev+"-01"&&c.first_disclosed_on<=w.end))errors.push(id+": monthly reflection item must be first disclosed this month or last month");
   if(c.date_precision!==undefined)errors.push(id+": reflection items need a full first-disclosure date");
   errors.push(...reflectionErrors(c).map(e=>id+": "+e));
   for(const k of sourceKeys(c))if((ctx.reflectKeys||new Map()).has(k))errors.push(id+": already listed in "+ctx.reflectKeys.get(k));
   continue;
  }
  for(const f of ["claim_text","title_zh"])if(typeof c[f]==="string"&&/\p{Cf}/u.test(c[f]))errors.push(id+": "+f+" contains invisible format characters");
  if(c.title_zh!==undefined&&(typeof c.title_zh!=="string"||!c.title_zh.trim()||c.title_zh.length>200))errors.push(id+": title_zh must be a short non-empty string");
  if(c.region!==undefined&&!["intl","tw"].includes(c.region))errors.push(id+": region must be intl or tw");
  if(["tw_note","tw_policy","tw_compare","tw_research"].includes(s)!==(c.region==="tw"))errors.push(id+": region tw belongs exactly to the Taiwan sections");
  if(isAnalysis(c)){
   if(c.assertion_type!=="editorial_analysis"||c.claim_class!=="descriptive")errors.push(id+": "+s+" must be descriptive editorial analysis");
  }else{
   if(c.assertion_type==="editorial_analysis")errors.push(id+": editorial analysis belongs only in the one-line summary, overview, trends or the Taiwan note");
   // The source title inside the text becomes the link; without it the whole paragraph would be one link.
   if(typeof c.source_title!=="string"||!c.source_title.trim()||!String(c.claim_text).includes(c.source_title))errors.push(id+": monthly item text must contain its source_title (the link to the original)");
   if(!MONTHLY_ITEM_END.test(String(c.claim_text)))errors.push(id+": monthly item must end with the AI disclosure (未經真人逐則審稿；請參閱原文。）)");
   if(c.kind==="news_policy"&&!["binding_policy","official_guidance","draft","official_commentary","training_event","speech"].includes(c.source_document_type))errors.push(id+": missing or invalid policy document type");
   if(c.kind==="research"&&!["peer_reviewed_article","preprint"].includes(c.source_document_type))errors.push(id+": missing or invalid research document type");
   if(c.doi!==undefined&&(typeof c.doi!=="string"||!/^10\.\d{4,9}\/\S+$/.test(normDoi(c.doi))))errors.push(id+": doi must be a DOI such as 10.1234/abc");
   if(!MONTHLY_AUDIENCE_KEYS.includes(c.audience))errors.push(id+": audience must be one of "+MONTHLY_AUDIENCE_KEYS.join(", "));
  }
  if(c.supporting_claim_ids!==undefined&&!isAnalysis(c))errors.push(id+": supporting_claim_ids only apply to editorial analysis");
  if(c.related_claim_ids!==undefined&&!["background","tw_compare"].includes(s))errors.push(id+": related_claim_ids only apply to background and Taiwan documents");
  // An international study with a Taiwan sample is listed again in the Taiwan area (joint review E2b).
  if(c.taiwan_sample!==undefined&&(c.taiwan_sample!==true||c.kind!=="research"||!["research","scholars","background"].includes(s)))errors.push(id+": taiwan_sample marks an international research, scholar or background study");
  // Dates (month precision only where the original prints year and month).
  if(c.date_precision!==undefined){
   // Only official documents and Taiwan journals print a month without a day (plan §5).
   if(c.date_precision!=="month"||!["policy","tw_policy","tw_research","tw_compare"].includes(s))errors.push(id+": date_precision month applies only to official documents and Taiwan journals (policy, tw_policy, tw_research, tw_compare)");
   else{
    if(!/^\d{4}-(0[1-9]|1[0-2])$/.test(String(c.first_disclosed_on))||c.first_disclosed_on!==c.publication_date)errors.push(id+": month-precision item needs first_disclosed_on equal to publication_date as YYYY-MM");
    if(!String(c.claim_text).includes("說明："))errors.push(id+": month-precision item must explain its date basis with 說明：");
    if(s!=="tw_compare"&&![w.month,w.prev].includes(c.first_disclosed_on))errors.push(id+": month-precision item must be dated this month or the previous month");
    if(s==="tw_compare"&&!(c.first_disclosed_on<=w.month))errors.push(id+": Taiwan document must be first disclosed by the end of the period");
   }
  }else if(!isAnalysis(c)&&s!=="scholars"&&!isoDate(c.first_disclosed_on))errors.push(id+": first_disclosed_on must be a real YYYY-MM-DD date");
  if(MONTHLY_ITEM_SECTIONS.includes(s)&&c.date_precision===undefined&&!inWin(c.first_disclosed_on))errors.push(id+": "+s+" item must be first disclosed within "+w.start+" to "+w.end);
  if(s==="scholars"){
   if(!inWin(c.publication_date))errors.push(id+": scholar item must be formally published (publisher online date) within the period");
   if(typeof c.research_group!=="string"||!c.research_group.trim())errors.push(id+": tracked-scholar claim needs research_group");
   if(typeof c.scholar_id!=="string"||!c.scholar_id.trim())errors.push(id+": tracked-scholar claim needs scholar_id (watchlist code)");
  }
  if(s==="background"&&!(isoDate(c.first_disclosed_on)&&c.first_disclosed_on<w.start))errors.push(id+": background item must be first disclosed before the period");
  if(s==="tw_compare"&&c.date_precision===undefined&&!(isoDate(c.first_disclosed_on)&&c.first_disclosed_on<=w.end))errors.push(id+": Taiwan document must be first disclosed by the end of the period");
  if(["background","tw_compare"].includes(s)){
   const rel=Array.isArray(c.related_claim_ids)?c.related_claim_ids:[];
   if(!rel.length||new Set(rel).size!==rel.length||!rel.every(numbered))errors.push(id+": "+s+" must relate to distinct policy, research or scholar items of this issue");
  }
  if(s==="trends"&&!isAnalysis(c)){
   if(typeof c.research_group!=="string"||!c.research_group.trim())errors.push(id+": trend source needs research_group");
   const d=Date.parse(String(c.publication_date)+"T00:00:00Z");
   if(!isoDate(c.publication_date)||d>lastDay||lastDay-d>92*864e5)errors.push(id+": trend source must be published within the three months before the period end");
  }
  if(c.source_country!==undefined&&!(typeof c.source_country==="string"&&(c.source_country==="INTL"||/^[A-Z]{2}(-[A-Z]{3})?$/.test(c.source_country))))errors.push(id+": source_country must be an ISO code or INTL");
  if(s==="policy"&&c.source_country===undefined)errors.push(id+": policy item needs source_country (joint review D4)");
  if(c.self_reported_outcome!==undefined&&c.self_reported_outcome!==true)errors.push(id+": self_reported_outcome is true or absent");
  if(s==="tw_policy"&&(c.kind!=="news_policy"||!["k12","other_stakeholders"].includes(c.audience)))errors.push(id+": Taiwan central document is a policy item for K-12 or other education stakeholders");
  if(s==="tw_research"){
   if(!["k12","other_stakeholders"].includes(c.audience))errors.push(id+": Taiwan research is limited to K-12 and other education stakeholders");
   if(issue.taiwan_journals_not_searched===true)errors.push(id+": taiwan_journals_not_searched contradicts Taiwan research items");
  }
  // Not a repeat of a daily, weekly or another monthly item.
  if(MONTHLY_ITEM_SECTIONS.includes(s)||s==="scholars")for(const k of sourceKeys(c))if(others.has(k))errors.push(id+": source already published in "+others.get(k));
  // Editorial analysis rules.
  const ids=Array.isArray(c.supporting_claim_ids)?c.supporting_claim_ids:[],body=withoutEnd(c.claim_text);
  if(s==="overview_line"){
   if(body.length>r.MONTHLY_OVERVIEW_LINE_MAX)errors.push(id+": one-line summary must be at most "+r.MONTHLY_OVERVIEW_LINE_MAX+" characters");
   if(!ids.every(x=>resolve(x)&&!isAnalysis(resolve(x))))errors.push(id+": one-line summary may cite only this issue's items or listed items");
   const banned=bannedIn(body);if(banned.length)errors.push(id+": one-line summary uses words reserved for outcome or advice claims: "+banned.join("、"));
  }
  if(s==="overview"){
   if(body.length>150)errors.push(id+": overview sentence must be at most 150 characters");
   const refs=ids.map(resolve);
   if(ids.length<2||new Set(ids).size!==ids.length||refs.some(x=>!x||isAnalysis(x))||!ids.every(intlRef))errors.push(id+": overview sentence needs at least two distinct international items of this issue or its listing");
   else if(new Set(refs.map(x=>[...sourceKeys(x)][0]||x.claim_id)).size<2)errors.push(id+": overview sentence needs at least two different sources");
   const banned=bannedIn(body);if(banned.length)errors.push(id+": overview uses words reserved for outcome or advice claims: "+banned.join("、"));
  }
  if(s==="tw_note"){
   if(body.length>150)errors.push(id+": Taiwan note sentence must be at most 150 characters");
   if(new Set(ids).size!==ids.length||!ids.some(intlRef)||!ids.some(twRef)||!ids.every(x=>intlRef(x)||twRef(x)))errors.push(id+": Taiwan note must cite at least one international item and one Taiwan item");
   const n=foldText(body),hits=WEEKLY_TW_NOTE_BANNED.filter(x=>n.includes(x));
   if(hits.length||ADVICE_PATTERN.test(n))errors.push(id+": Taiwan note uses evaluation, outcome or advice words: "+(hits.join("、")||"advice pattern"));
  }
  if(s==="trends"&&isAnalysis(c)){
   const support=ids.map(x=>byId.get(x));
   if(new Set(ids).size!==ids.length||ids.length<2||support.some(x=>!x||x.section!=="trends"||isAnalysis(x)))errors.push(id+": trend needs at least two distinct trend sources of this issue");
   else{
    if(new Set(support.map(x=>String(x.research_group).trim().toLowerCase())).size<2)errors.push(id+": trend needs at least two different research groups");
    if(!support.some(x=>x.source_document_type==="peer_reviewed_article"&&x.audience==="k12"))errors.push(id+": trend needs at least one peer-reviewed K-12 source");
   }
  }
 }
 const count=s=>list.filter(c=>c.section===s).length;
 if(count("overview_line")>1)errors.push("monthly one-line summary must be a single sentence");
 if(count("overview")&&(count("overview")<r.MONTHLY_OVERVIEW_MIN||count("overview")>r.MONTHLY_OVERVIEW_MAX))errors.push("monthly overview needs "+r.MONTHLY_OVERVIEW_MIN+"–"+r.MONTHLY_OVERVIEW_MAX+" sentences");
 if(count("background")>r.MONTHLY_BACKGROUND_MAX)errors.push("monthly background items exceed "+r.MONTHLY_BACKGROUND_MAX);
 if(count("tw_note")>r.MONTHLY_TW_NOTE_MAX)errors.push("monthly Taiwan note sentences exceed "+r.MONTHLY_TW_NOTE_MAX);
 if(count("tw_compare")>r.MONTHLY_TW_COMPARE_MAX)errors.push("monthly Taiwan documents exceed "+r.MONTHLY_TW_COMPARE_MAX);
 if(count("reflection")>r.reflectMonthlyMax(period))errors.push("monthly reflection items exceed "+r.reflectMonthlyMax(period));
 errors.push(...reflectionSpread(list.filter(c=>c.section==="reflection")));
 const research=list.filter(c=>c.section==="research"||c.section==="scholars"),non=research.filter(c=>!["k12","other_stakeholders"].includes(c.audience)).length;
 if(non>r.monthlyNonK12Cap(research.length))errors.push("non-K-12 research ("+non+") exceeds max(2, one third of "+research.length+") across research and scholar items");
 const groups=new Map(),people=new Map(),key=v=>String(v||"").trim().toLowerCase();
 for(const c of list.filter(x=>x.section==="scholars")){groups.set(key(c.research_group),(groups.get(key(c.research_group))||0)+1);people.set(key(c.scholar_id),(people.get(key(c.scholar_id))||0)+1)}
 for(const [g,k] of groups)if(k>4)errors.push("tracked research group "+g+" exceeds 4 scholar items");
 for(const [g,k] of people)if(g&&k>2)errors.push("tracked scholar "+g+" exceeds 2 items");
 return errors;
}
const MONTHLY_AUDIENCE_KEYS=["k12","other_stakeholders","teacher_ed","higher_ed","adult"];
function dailyFact(c,issueDate,backfill,revised){
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
 // A Taiwan item added by a later backfill search was checked on the backfill date, not the issue date.
 // A corrected page (revised_on) may carry claims checked on the correction date.
 const checkedBy=[issueDate,backfill&&c.region==="tw"?backfill:"",revised||""].filter(isoDate).sort().pop()||issueDate;
 if(c.checked_at>checkedBy||c.publication_date>issueDate)errors.push("source or review date occurs after daily issue date");
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
 const encountered=new Set(),weeklyPeriods=editions.map(e=>e&&typeof e.path==="string"&&!LEGACY.has(e.path)&&(/^weekly\/([a-zA-Z0-9_-]+)\/index\.html$/.exec(e.path)||[])[1]).filter(Boolean);
 // Registered daily claims by id, so weekly items can be checked against the daily item they repeat.
 let dailyMap=null;
 const dailyClaims=()=>{if(dailyMap)return dailyMap;dailyMap=new Map();
  for(const e of editions){if(!e||typeof e.claims_file!=="string"||!/^daily\//.test(String(e.path)))continue;
   try{for(const c of JSON.parse(fs.readFileSync(path.join(root,e.claims_file),"utf8")))if(c&&c.claim_id)dailyMap.set(c.claim_id,c)}catch{}}
  return dailyMap};
 // All registered editions with their claims, for the monthly lists and the cross-channel repeat checks.
 let loadedList=null;
 const loaded=()=>{if(loadedList)return loadedList;loadedList=editions.filter(e=>e&&typeof e.path==="string"&&typeof e.claims_file==="string").map(e=>{let claims=[];try{claims=JSON.parse(fs.readFileSync(path.join(root,e.claims_file),"utf8"))}catch{}return {...e,claims:Array.isArray(claims)?claims:[]}});return loadedList};
 const keysOf=(exclude,filter)=>{const m=new Map();for(const e of loaded()){if(e.path===exclude)continue;const ch=e.path.split("/")[0];
   for(const c of e.claims){if(!c||c.assertion_type==="editorial_analysis"||!filter(ch,c,e))continue;for(const k of sourceKeys(c))if(!m.has(k))m.set(k,e.path.replace(/index\.html$/,"")+" "+c.claim_id)}}return m};
 let dailyLinkMap=null;
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
  const renderer=require("./render-site.js"),period=p.split("/")[1],monthlySec=p.startsWith("monthly/")&&renderer.monthlySectioned(issue);
  const monthlyContext=monthlySec?renderer.monthlyContext(issue,loaded()):undefined;
  if(daily&&!dailyLinkMap)dailyLinkMap=renderer.dailyBacklinks(loaded());
  errors.push(...matchBody(dom.document,data,issueDate,p,{...issue,weeklyPeriods,monthlyContext,dailyLinks:daily?dailyLinkMap:undefined}).map(e=>p+": "+e));
  if(p.startsWith("monthly/")){
   // From October 2026 every monthly uses the sectioned layout (manager 2026-10-17).
   if(!renderer.periodRange("monthly",period))errors.push(p+": monthly period must be YYYY-MM");
   else if(!monthlySec&&String(period)>="2026-10")errors.push(p+": monthly from 2026-10 must be registered with indexed_weeklies (sectioned layout)");
   if(monthlySec){
    const idx=issue.indexed_weeklies,w=renderer.monthlyWindow(period),through=issue.indexed_through;
    if(!Array.isArray(idx)||new Set(idx).size!==idx.length||!idx.every(x=>typeof x==="string"&&weeklyPeriods.includes(x)))errors.push(p+": indexed_weeklies must list distinct registered weekly periods");
    if(!isoDate(through)||(w&&through<w.end))errors.push(p+": indexed_through must be a real date on or after the period end (dailies listed up to that date)");
    // Earlier publications only: dailies up to indexed_through, the listed weeklies and earlier monthlies.
    const others=keysOf(p,(ch,c,e)=>(ch==="daily"&&e.path.slice(6,16)<=String(through))||(ch==="weekly"&&Array.isArray(idx)&&idx.includes(e.path.split("/")[1]))||(ch==="monthly"&&e.path.split("/")[1]<period&&["policy","research","tw_policy","tw_research","scholars"].includes(c.section)));
    const reflectKeys=keysOf(p,(ch,c,e)=>ch==="monthly"&&e.path.split("/")[1]<period&&c.section==="reflection");
    errors.push(...monthlyStructureSectioned(data,period,{issue:{...issue,monthlyContext},otherKeys:others,reflectKeys}).map(e=>q+" "+e));
   }else errors.push(...monthlyStructure(data).map(e=>q+" "+e));
  }
  if(issue.indexed_weeklies!==undefined&&!p.startsWith("monthly/"))errors.push(p+": indexed_weeklies applies only to a monthly edition");
  if(issue.taiwan_journals_not_searched!==undefined&&(issue.taiwan_journals_not_searched!==true||!monthlySec))errors.push(p+": taiwan_journals_not_searched must be true on a sectioned monthly edition");
  if(p.startsWith("weekly/")||daily){
   // A later weekly or daily does not repeat an item a monthly already carried (monthlies indexed before it).
   const own=daily?issueDate:(renderer.periodRange("weekly",period)||{}).start||"";
   const monthlyKeys=keysOf(p,(ch,c,e)=>ch==="monthly"&&isoDate(e.indexed_through)&&e.indexed_through<own&&["policy","research","tw_policy","tw_research","scholars"].includes(c.section));
   for(const c of data)if(c&&(daily||["featured","briefs","late","taiwan"].includes(c.weekly_section)))for(const k of sourceKeys(c))if(monthlyKeys.has(k))errors.push(q+" "+c.claim_id+": source already published in "+monthlyKeys.get(k));
  }
  if(p.startsWith("weekly/")){
   // A late item was in no earlier weekly.
   const weeklyKeys=keysOf(p,(ch,c)=>ch==="weekly"&&["featured","briefs","late"].includes(c.weekly_section));
   for(const c of data)if(c&&c.weekly_section==="late")for(const k of sourceKeys(c))if(weeklyKeys.has(k))errors.push(q+" "+c.claim_id+": late item already in "+weeklyKeys.get(k));
  }
  // Reflection fields only on 國外反思選讀 items, which must carry all of them.
  for(const c of data){if(!c||typeof c!=="object")continue;const inR=(p.startsWith("weekly/")&&c.weekly_section==="reflection")||(p.startsWith("monthly/")&&c.section==="reflection"),has=[...REFLECT_FIELDS,...REFLECT_OPTIONAL].filter(f=>c[f]!==undefined);
   if(inR&&REFLECT_FIELDS.some(f=>c[f]===undefined))errors.push(q+" "+c.claim_id+": a 國外反思選讀 item needs all of "+REFLECT_FIELDS.join(", "));
   if(!inR&&has.length)errors.push(q+" "+c.claim_id+": reflect_* fields belong to 國外反思選讀 items only");}
  // Caution marks (plan F2) live on weekly items only, until the monthly carries them.
  if(!p.startsWith("weekly/"))for(const c of data)if(c&&[...CAUTION_FIELDS,"caution_direction","caution_prior_url","caution_partial"].some(f=>c[f]!==undefined))errors.push(q+" "+c.claim_id+": caution marks belong to weekly items only");
  if(p.startsWith("weekly/"))errors.push(...weeklyStructure(data,p.split("/")[1],{dailyClaims:dailyClaims(),issue,root}).map(e=>q+" "+e));
  if(issue.taiwan_not_searched!==undefined&&(issue.taiwan_not_searched!==true||!p.startsWith("weekly/")))errors.push(p+": taiwan_not_searched must be true on a weekly edition");
  if(issue.revised_on!==undefined&&daily&&!(isoDate(issue.revised_on)&&issueDate&&issue.revised_on>=issueDate))errors.push(p+": daily revised_on must be a real date on or after the issue date");
  if(issue.tw_backfilled_on!==undefined){const r=require("./render-site.js"),b=issue.tw_backfilled_on;
   if(!daily||typeof b!=="string"||!/^\d{4}-\d{2}-\d{2}$/.test(b)||!Number.isFinite(Date.parse(b+"T00:00:00Z"))||new Date(b+"T00:00:00Z").toISOString().slice(0,10)!==b||!issueDate||issueDate>=r.DAILY_REGION_FROM||b<issueDate)
    errors.push(p+": tw_backfilled_on must be a real ISO date, not before the issue date, on a daily page dated before "+r.DAILY_REGION_FROM);}
  if(issue.revised_on!==undefined&&!daily&&(!(p.startsWith("weekly/")||monthlySec)||typeof issue.revised_on!=="string"||!/^\d{4}-\d{2}-\d{2}$/.test(issue.revised_on)||!Number.isFinite(Date.parse(issue.revised_on+"T00:00:00Z"))||new Date(issue.revised_on+"T00:00:00Z").toISOString().slice(0,10)!==issue.revised_on))errors.push(p+": revised_on must be a real ISO date on a weekly or sectioned monthly edition");
  const claimIds=new Set();
  for(const c of data){
   if(!c||typeof c!=="object"){errors.push("invalid claim in "+q);continue}
   if(claimIds.has(c.claim_id))errors.push("duplicate claim_id in "+q+": "+c.claim_id);claimIds.add(c.claim_id);
   if(c.decision!=="publish"){errors.push("edition contains unpublished/held claim "+q+" "+c.claim_id);continue}
   if(c.region!==undefined&&!["intl","tw"].includes(c.region))errors.push(q+" "+c.claim_id+": region must be intl or tw");
   if(unnamedForeignAgency(c))errors.push(q+" "+c.claim_id+": a foreign agency in the text must carry its country, e.g. 中國教育部 (manager 2026-10-17)");
   if(daily)errors.push(...dailyFact(c,issueDate||"0000-00-00",issue.tw_backfilled_on,issue.revised_on).map(e=>q+" "+c.claim_id+": "+e));
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
   const result=check(c,{monthPrecision:monthlySec});
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
