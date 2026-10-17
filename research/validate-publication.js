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
 }else if(issueDate&&require("./render-site.js").dailySectioned({date:issueDate,claims})){
  // 國際／臺灣 sections: headings and empty-section lines are renderer text, so the page must equal the render.
  let expected=null;try{expected=parse5.parse(require("./render-site.js").renderDailyEdition({date:issueDate,claims}))}catch(e){errors.push("daily renderer refused claims: "+e.message)}
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
  if((node.attrs||[]).some(a=>a.namespace||!(node===main?((a.name==="id"&&a.value==="content")||(a.name==="class"&&a.value==="content")):["data-claim-id","href","datetime","colspan","rowspan","scope"].includes(a.name)||(["data-claim-tags","data-claim-kind"].includes(a.name)&&node.tagName==="p")||(a.name==="data-kind"&&node.tagName==="p"&&attr(node,"data-claim-kind")!==undefined)||(a.name==="data-kind"&&node.tagName==="td"&&["policy","research","background"].includes(a.value))||(a.name==="id"&&node.tagName==="tr"&&/^item-(\d+|b\d+|t\d+|c\d+)$/.test(a.value))||(a.name==="data-region"&&["h2","section"].includes(node.tagName)&&["intl","tw"].includes(a.value)))))errors.push("dynamic/hidden or unsupported HTML attributes within main");
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
/* Sectioned weekly claims: every claim names a known section; at most five featured items, each marked as
   checked against the full text; every other item names the daily claim it repeats. Structural only. */
function weeklyStructure(claims,period){
 const errors=[],r=require("./render-site.js"),keys=[...r.WEEKLY_SECTIONS,...r.TW_SECTIONS].map(x=>x[0]),list=claims.filter(c=>c&&typeof c==="object");
 if(!r.weeklySectioned(list))return errors;
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
  if(["featured","briefs","background"].includes(sec)){
   if(c.kind==="news_policy"&&!["binding_policy","official_guidance","draft","official_commentary","training_event","speech"].includes(c.source_document_type))errors.push(id+": missing or invalid policy document type");
   if(c.kind==="research"&&!["peer_reviewed_article","preprint"].includes(c.source_document_type))errors.push(id+": missing or invalid research document type");
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
   if(!(typeof c.first_disclosed_on==="string"&&range.end&&c.first_disclosed_on<=range.end))errors.push(id+": Taiwan comparison document must be first disclosed by the end of the period");
   const rel=Array.isArray(c.related_claim_ids)?c.related_claim_ids:[];
   if(!rel.length||new Set(rel).size!==rel.length||!rel.every(inIssue))errors.push(id+": Taiwan comparison must relate to distinct international featured or brief items");
  }
  if(sec==="tw_note"){
   if(c.assertion_type!=="editorial_analysis"||c.claim_class!=="descriptive")errors.push(id+": Taiwan note must be descriptive editorial analysis");
   const ids=Array.isArray(c.supporting_claim_ids)?c.supporting_claim_ids:[];
   if(new Set(ids).size!==ids.length||!ids.some(inIssue)||!ids.some(inTw)||!ids.every(x=>inIssue(x)||inTw(x)))errors.push(id+": Taiwan note must cite at least one international item and one Taiwan item of this issue");
   if(typeof c.claim_text!=="string"||c.claim_text.length>150)errors.push(id+": Taiwan note sentence must be at most 150 characters");
   const n=String(c.claim_text).normalize("NFKC").replace(/[\p{Cf}\s]/gu,""),hits=WEEKLY_TW_NOTE_BANNED.filter(w=>n.includes(w));
   if(hits.length)errors.push(id+": Taiwan note uses evaluation, outcome or advice words: "+hits.join("、"));
  }
  if(c.title_zh!==undefined&&(typeof c.title_zh!=="string"||!c.title_zh.trim()||c.title_zh.length>200))errors.push(id+": title_zh must be a short non-empty string");
  if(sec==="featured"&&c.full_text_checked!==true)errors.push(id+": featured weekly item must be checked against the full text");
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
 return errors;
}
/* Overview sentences only group what this issue's items say; they may not claim outcomes, trends or advice. */
const WEEKLY_OVERVIEW_BANNED=["成效","有效","效果","提升","提高","改善","導致","导致","因果","證明","证明","證實","证实","顯著","显著","趨勢","趋势","建議","建议","推薦","推荐","應該","应该","必須","必须","臺灣","台灣","台湾"];
/* The Taiwan note may name 臺灣 but, like the overview, makes no outcome, evaluation or advice claim. */
const WEEKLY_TW_NOTE_BANNED=["成效","有效","效果","提升","提高","改善","導致","导致","因果","證明","证明","證實","证实","顯著","显著","趨勢","趋势","建議","建议","推薦","推荐","應該","应该","必須","必须","落後","落后","領先","领先","不足","優於","优于","劣於","劣于","借鏡","借镜","值得"];
/* A faithful title translation may say 提升 or 臺灣 (the source title can); it never speaks for the newsletter. */
const WEEKLY_TITLE_BANNED=["本刊","建議","建议","推薦","推荐","應該","应该","必須","必须","呼籲","呼吁"];
const bannedIn=t=>{const n=String(t).normalize("NFKC").replace(/[\p{Cf}\s]/gu,"");return WEEKLY_OVERVIEW_BANNED.filter(w=>n.includes(w))};
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
 const encountered=new Set(),weeklyPeriods=editions.map(e=>e&&typeof e.path==="string"&&!LEGACY.has(e.path)&&(/^weekly\/([a-zA-Z0-9_-]+)\/index\.html$/.exec(e.path)||[])[1]).filter(Boolean);
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
  errors.push(...matchBody(dom.document,data,issueDate,p,{...issue,weeklyPeriods}).map(e=>p+": "+e));
  if(p.startsWith("monthly/"))errors.push(...monthlyStructure(data).map(e=>q+" "+e));
  if(p.startsWith("weekly/"))errors.push(...weeklyStructure(data,p.split("/")[1]).map(e=>q+" "+e));
  if(issue.taiwan_not_searched!==undefined&&(issue.taiwan_not_searched!==true||!p.startsWith("weekly/")))errors.push(p+": taiwan_not_searched must be true on a weekly edition");
  if(issue.revised_on!==undefined&&(!p.startsWith("weekly/")||typeof issue.revised_on!=="string"||!/^\d{4}-\d{2}-\d{2}$/.test(issue.revised_on)||!Number.isFinite(Date.parse(issue.revised_on+"T00:00:00Z"))||new Date(issue.revised_on+"T00:00:00Z").toISOString().slice(0,10)!==issue.revised_on))errors.push(p+": revised_on must be a real ISO date on a weekly edition");
  const claimIds=new Set();
  for(const c of data){
   if(!c||typeof c!=="object"){errors.push("invalid claim in "+q);continue}
   if(claimIds.has(c.claim_id))errors.push("duplicate claim_id in "+q+": "+c.claim_id);claimIds.add(c.claim_id);
   if(c.decision!=="publish"){errors.push("edition contains unpublished/held claim "+q+" "+c.claim_id);continue}
   if(c.region!==undefined&&!["intl","tw"].includes(c.region))errors.push(q+" "+c.claim_id+": region must be intl or tw");
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
