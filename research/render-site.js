"use strict";
/* Static site pages derived from publication/issues.json and the v1.7 knowledge base.
   Usage: node research/render-site.js          check generated pages are up to date (CI)
          node research/render-site.js --write  regenerate them
   Never registers editions, changes claims or certifies sources: it only renders what is already recorded. */
const fs=require("node:fs"),path=require("node:path"),crypto=require("node:crypto");
const {parseCsv}=require("./validate-knowledge-base.js");

const LEGACY_WEEKLY=[{path:"weekly/2026-09-29_10-08/",title:"創刊特刊：2026/9/29–10/8",note:"10 天過渡期特刊；早期版本，未經獨立認證，保留公開更正說明。"}];
const LEGACY_MONTHLY=[{path:"monthly/2026-09/",title:"2026 年 9 月月報",note:"跨週趨勢整合；早期版本，未經獨立認證，保留公開更正說明。"}];
const POLICY_TYPES={framework:"框架",official_guidance:"官方指引",government_announcement:"政府公告",policy_review:"政策檢討",binding_policy:"正式政策",draft:"草案",consultation:"意見徵詢"};
const RESEARCH_TYPES={journal_article:"期刊論文",conference_paper:"會議論文",book_chapter:"專書章節",preprint:"預印本"};
const INTERNATIONAL={"O-UNESCO":"UNESCO","O-OECD":"OECD","O-EU-EC":"歐盟執委會","O-EU-COUNCIL":"歐盟理事會","O-COE":"歐洲理事會","O-UNICEF":"UNICEF"};
const COUNTRY={AU:"澳洲",SA:"沙烏地阿拉伯",JP:"日本",KR:"韓國","GB-ENG":"英格蘭",GB:"英國",US:"美國",SG:"新加坡",CN:"中國",HK:"香港",TW:"臺灣",CA:"加拿大",NZ:"紐西蘭",DE:"德國",FR:"法國",FI:"芬蘭",EE:"愛沙尼亞",IN:"印度",AE:"阿聯",MX:"墨西哥",BR:"巴西",CH:"瑞士",CO:"哥倫比亞",CZ:"捷克",EG:"埃及",ET:"衣索比亞","GB-SCT":"蘇格蘭",GH:"迦納",GR:"希臘",ID:"印尼",IT:"義大利",MA:"摩洛哥",NG:"奈及利亞",NO:"挪威",PH:"菲律賓",QA:"卡達",SE:"瑞典",SK:"斯洛伐克",TH:"泰國",TR:"土耳其",VN:"越南",ZA:"南非",EU:"歐盟",DK:"丹麥",ES:"西班牙",IE:"愛爾蘭","GB-WLS":"威爾斯","GB-NIR":"北愛爾蘭"};
const ORG_COUNTRY={"O-AU-EDU":"AU","O-JP-MEXT":"JP","O-KR-MOE":"KR","O-UK-DFE":"GB-ENG","O-US-ED":"US","O-SG-MOE":"SG","O-CN-MOE":"CN","O-HK-EDB":"HK","O-TW-MOE":"TW","O-NZ-MOE":"NZ"};
/* Stage and role tags shown under research titles; "#" text so readers can find them with the browser's own search. Order: role, then school stage. */
const POPULATION_TAGS=[["ROLE_STUDENT","學生"],["ROLE_INSERVICE_TEACHER","在職教師"],["TEACHER_ED","職前師培"],["ROLE_OTHER_STAKEHOLDER","家長行政"],["STAGE_PRESCHOOL","幼兒"],["STAGE_PRIMARY","國小"],["STAGE_LOWER_SECONDARY","國中"],["STAGE_UPPER_SECONDARY","高中職"],["STAGE_SECONDARY","中學未分"],["STAGE_K12_MULTI","K12跨學段"],["STAGE_K12_GENERAL","K12未細分"],["REVIEW_INCLUDES_K12","含K12回顧"]];
/* Topic, method and country tags form a second line under research titles. */
const TOPIC_TAGS=[["TOPIC_GENAI","生成式AI"],["TOPIC_CURRICULUM","AI素養課程"],["TOPIC_ASSESSMENT","評量與量表"],["TOPIC_TEACHER_PD","教師專業發展"],["TOPIC_ETHICS","倫理與安全"],["TOPIC_INTERVENTION","教學介入"],["TOPIC_CT","運算思維與程式"],["TOPIC_LANGUAGE","語言學習"],["TOPIC_STEM","STEM"],["TOPIC_EQUITY","特教與公平"],["TOPIC_POLICY","政策與治理"]];
const METHOD_TAGS=[["METHOD_REVIEW","文獻回顧"],["METHOD_EXPERIMENT","實驗或準實驗"],["METHOD_MIXED","混合方法"],["METHOD_DESIGN","設計本位"],["METHOD_QUALITATIVE","質性個案"],["METHOD_SURVEY","問卷量表"]];
/* AI-literacy scope and framework dimensions form a third line (research/daily-tags.js). */
const {AILIT_TAGS,dailyTagList,dailyTagText}=require("./daily-tags.js");
const STATUS={discovered_unverified:["unverified","僅發現・未核"],bibliographic_checked:["checked","書目已核"],content_checked:["fulltext","原文已核"]};
/* One wording across the three publications (manager decision 2026-10-17, C3): items and analysis. */
const AI_ITEM_NOTE="由 AI 依原文整理，未經真人逐則審稿；請點連結閱讀原文。",AI_ISSUE_NOTE="由 AI 依原文整理，經管理者核准發布，未經真人逐則審稿；請點連結閱讀原文。";
const ANALYSIS_LABEL="編輯歸納（AI 整理，未經真人審閱）";
const relationNote=p=>'<p class="lead">三種刊物：<a href="'+p+'daily/">每日短訊</a>（每天 09:00，記錄新發布的原始文件）、<a href="'+p+'weekly/">週報</a>（每週五，前一週五至週四的精選與一覽）、<a href="'+p+'monthly/">月報</a>（次月 3 日，跨週整理並另收週報沒有收的研究與文件）。週報依首次公開日收錄，首次公開早於週報期間的每日短訊會列在月報的一覽。</p>';

/* Quick-index year columns always run from the newest year back to at least this year, so later backfill keeps the layout stable. */
const INDEX_FIRST_YEAR=2023;
/* Cache-busting query from the stylesheet content, so readers do not keep an outdated layout after an update. */
const CSS_VERSION=crypto.createHash("sha256").update(fs.readFileSync(path.join(__dirname,"..","assets","site.css"))).digest("hex").slice(0,10);
const cssHref=p=>p+"assets/site.css?v="+CSS_VERSION;
/* The tag filter is the only script on the site: an external file on the journal and conference lists (manager 2026-10-12). */
const FILTER_VERSION=crypto.createHash("sha256").update(fs.readFileSync(path.join(__dirname,"..","assets","archive-filter.js"))).digest("hex").slice(0,10);
const filterScript=p=>'<script src="'+p+"assets/archive-filter.js?v="+FILTER_VERSION+'" defer></script>';

const esc=s=>String(s??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
const up=depth=>depth?"../".repeat(depth):"./";
// Stable UTF-16 lexical order: independent of OS locale and ICU version.
const compareText=(a,b)=>a<b?-1:a>b?1:0;

function shell({depth,current,title,description,head,main,script}){
 const p=up(depth);
 const nav=[["daily/","每日短訊","daily"],["weekly/","週報","weekly"],["monthly/","月報","monthly"],["archive/","歷年資料庫","archive"],["about/","查核方法","about"]];
 const links=nav.map(([href,label,key])=>'<a href="'+p+href+'"'+(current===key?' aria-current="page"':"")+">"+label+"</a>").join("");
 return '<!doctype html>\n<html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">'+
  '<meta name="description" content="'+esc(description)+'"><title>'+esc(title)+"｜K-12 AI 素養國際動態</title>"+
  '<link rel="stylesheet" href="'+p+'assets/design-system.css"><link rel="stylesheet" href="'+cssHref(p)+'"><link rel="icon" href="'+p+'assets/favicon.svg" type="image/svg+xml">'+(script?filterScript(p):"")+'</head>\n<body>'+
  '<a class="skip" href="#content">跳至主要內容</a>'+
  '<header class="site-header"><nav class="site-nav" aria-label="主要導覽"><a class="brand" href="'+p+'">K-12 AI 素養國際動態</a>'+links+
  '<a class="nav-feedback" href="'+p+'feedback/">讀者勘誤</a></nav></header>\n'+
  '<div class="page-head">'+head+"</div>\n"+
  '<main id="content" class="content">'+main+"</main>\n"+
  '<footer class="site-footer"><div class="inner"><span>K-12 AI 素養國際動態</span><a href="'+p+'about/">查核方法</a><a href="'+p+'feedback/">讀者評鑑與勘誤（GitHub Issues）</a><a href="'+p+'design-system/">設計系統</a><a href="https://github.com/jhchenmooc/k12-ai-literacy-report">GitHub 原始碼</a></div></footer>\n</body></html>\n';
}

/* ---------- data ---------- */
function load(root){
 const kb=path.join(root,"research","knowledge-base","data");
 const read=n=>parseCsv(fs.readFileSync(path.join(kb,n+".csv"),"utf8"));
 const venues=parseCsv(fs.readFileSync(path.join(root,"research","venue-watchlist.csv"),"utf8"));
 // Sources added after the CSV (J35–J39, C21–C22) exist only in the Markdown table: take their names from there.
 const known=new Set(venues.map(v=>v.id));
 for(const line of fs.readFileSync(path.join(root,"research","venue-watchlist.md"),"utf8").split("\n")){
  const m=line.match(/^\|\s*([JC]\d{2})\s*\|\s*[^|]+\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|/);
  if(!m||known.has(m[1]))continue;
  known.add(m[1]);venues.push({id:m[1],name:m[1][0]==="C"?m[2]+" — "+m[3]:m[2]});
 }
 const manifest=JSON.parse(fs.readFileSync(path.join(root,"publication","issues.json"),"utf8"));
 const editions=(manifest.editions||[]).map(e=>{
  let claims=[];
  try{claims=JSON.parse(fs.readFileSync(path.join(root,e.claims_file),"utf8"))}catch{claims=[]}
  return {...e,claims:Array.isArray(claims)?claims:[]};
 });
 // AI literacy scope C records stay in the knowledge base but are not listed on the site.
 const cFile=path.join(root,"research","ai-literacy-c-records.json");
 const hidden=fs.existsSync(cFile)?JSON.parse(fs.readFileSync(cFile,"utf8")).records.map(x=>x.record_id):[];
 return {records:read("records"),relations:read("relations"),venues,editions,hidden};
}

/* ---------- daily ---------- */
function dailyEditions(editions){
 return editions.filter(e=>/^daily\/\d{4}-\d{2}-\d{2}\/index\.html$/.test(e.path)).map(e=>({...e,date:e.path.slice(6,16)})).sort((a,b)=>compareText(b.date,a.date));
}
/* The claim text is rendered verbatim; only the source title inside it becomes the link, so the
   gate's text match (claim_text) and direct-anchor rule (source_url) both hold. */
function claimBody(c){
 const text=esc(c.claim_text),title=esc(c.source_title),link='<a href="'+esc(c.source_url)+'">'+title+"</a>";
 return title&&text.includes(title)?text.replace(title,link):'<a href="'+esc(c.source_url)+'">'+text+"</a>";
}
function claimParagraph(c,withId){
 return "<p"+(withId?' data-claim-id="'+esc(c.claim_id)+'"':"")+">"+claimBody(c)+"</p>";
}
/* Daily badge (C4): 研究／政策 plus the document type, so a preprint is told apart from a reviewed article. */
const dailyKind=c=>{
 const research=c.kind==="research"||/^research_/.test(String(c.daily_fact_kind)),base=research?"研究":c.source_document_type==="speech"?"官方發言":"政策";
 const sub=SOURCE_TYPES[c.source_document_type],bib=["research_bibliography","official_notice"].includes(c.daily_fact_kind);
 return [research?"research":"policy",base+(sub&&sub!=="演講"?"・"+sub:"")+(bib?"（僅書目）":"")];
};
function kindBadge(c){const [cls,label]=dailyKind(c);return '<span class="kind '+cls+'">'+label+"</span>"}
/* Tag line on the daily list and homepage; the edition page carries the same text as a gate-checked
   data-claim-tags paragraph right after its claim (validate-publication.js). */
function dailyTags(c){
 const tags=dailyTagList(c);
 return tags.length?'<div class="tags3">'+tags.map(t=>'<span class="t">#'+esc(t)+"</span>").join(" ")+"</div>":"";
}
/* List and homepage entries show the title only; the summary stays on the day's page (C8). */
const itemTitle=c=>typeof c.title_zh==="string"&&c.title_zh.trim()?c.title_zh.trim():c.source_title||"";
function dailyEntry(c,href){
 return '<li>'+(isTw(c)?'<span class="kind tw">臺灣</span> ':"")+kindBadge(c)+'<p><a href="'+esc(href+"#"+c.claim_id)+'">'+esc(itemTitle(c))+"</a></p>"+dailyTags(c)+'<div class="meta-line"><span>首次公開：'+esc(c.first_disclosed_on||"未知")+"</span><span>來源："+esc(c.source_organization||"")+"</span></div></li>";
}
/* One card per day: the day's items are listed inside a single brief (manager request 2026-10-11). */
function dailyCard(d,depth){
 return '<li class="item daily-card"><div class="card-head"><h3>'+d.date+' 每日短訊</h3><span class="sub">收錄 '+d.claims.length+' 項</span></div><ol class="brief-items">'+d.claims.map(c=>dailyEntry(c,up(depth)+"daily/"+d.date+"/")).join("")+'</ol><div class="meta-line"><a href="'+up(depth)+"daily/"+d.date+'/">當日短訊頁（含摘要）</a></div></li>';
}
/* From 2026-10-18 each daily page has 國際 and 臺灣 sections (manager decision 2026-10-17; Taiwan = central
   government and Taiwan research only). Earlier pages keep their flat layout. Sectioned daily pages must equal
   this render of their claims (validate-publication.js). */
const DAILY_REGION_FROM="2026-10-18",REGIONS=[["intl","國際"],["tw","臺灣"]],REGION_EMPTY="本期無合格項目。";
const isTw=c=>c&&c.region==="tw";
/* Earlier pages searched later for Taiwan sources carry tw_backfilled_on in issues.json (manager 2026-10-17):
   they switch to the two sections and show a fixed backfill note. */
const dailySectioned=e=>e.date>=DAILY_REGION_FROM||e.claims.some(isTw)||e.tw_backfilled_on!==undefined||e.revised_on!==undefined;
const dailyRevisionText=d=>"本頁於 "+d+" 更正；更正前內容保留於 GitHub 查核紀錄。";
const dailyBackfillText=d=>"本頁臺灣段為 "+d+" 補查臺灣中央來源後補登，當日原未查臺灣來源。";
function dailyItem(c,links){
 const [cls,label]=dailyKind(c),tags=dailyTagList(c),back=links&&links.get(c.claim_id)||[];
 return '<p id="'+esc(c.claim_id)+'" data-claim-kind="'+esc(c.claim_id)+'" data-kind="'+cls+'">'+label+"</p>"+claimParagraph(c,true)+(tags.length?'<p data-claim-tags="'+esc(c.claim_id)+'">'+tags.map(t=>"<span>#"+esc(t)+"</span>").join(" ")+"</p>":"")+
  (back.length?'<p data-claim-links="'+esc(c.claim_id)+'">已收入：'+back.map(l=>'<a href="'+esc(l.href)+'">'+esc(l.label)+"</a>").join("、")+"</p>":"");
}
/* Where each daily item went later (C2): weekly item numbers and monthly list numbers, derived from registered issues. */
function dailyBacklinks(editions){
 const m=new Map(),add=(id,l)=>{if(typeof id!=="string")return;if(!m.has(id))m.set(id,[]);m.get(id).push(l)};
 for(const wk of periodEditions("weekly",editions).sort((a,b)=>compareText(a.period,b.period))){
  const claims=(wk.claims||[]).filter(c=>c&&typeof c==="object");if(!weeklySectioned(claims))continue;
  const n=weeklyNumbers(claims);
  for(const c of claims)if(["featured","briefs","taiwan"].includes(c.weekly_section)){const num=n.get(c.claim_id);add(c.weekly_source_claim,{label:"週報 "+periodLabel(wk.period)+" "+(/^\d+$/.test(num)?"第 "+num+" 則":num),href:"../../weekly/"+wk.period+"/#"+anchor(num)})}
 }
 for(const mo of periodEditions("monthly",editions).filter(monthlySectioned).sort((a,b)=>compareText(a.period,b.period))){
  const e={...mo,claims:(mo.claims||[]).filter(c=>c&&typeof c==="object"),context:monthlyContext(mo,editions)},w=monthlyWindow(mo.period),listing=monthlyListing(e,w),n=monthlyNumbers(e.claims,listing),r=periodRange("monthly",mo.period);
  for(const x of listing.all){const num=n.get(x.c.claim_id);add(/^D\d{8}-\d{2}$/.test(x.c.claim_id)?x.c.claim_id:x.c.weekly_source_claim,{label:"月報 "+r.year+" 年 "+r.month+" 月"+num,href:"../../monthly/"+mo.period+"/#"+anchor(num)})}
 }
 return m;
}
function renderDailyEdition(e){
 const head='<div class="kicker">每日短訊</div><h1>'+e.date+' 每日短訊</h1><div class="notice"><p>只記錄「誰在哪天發布了什麼」或來源原文的歸屬摘要，不含解讀、成效判斷或對臺灣的建議；'+AI_ITEM_NOTE+'</p>'+(e.tw_backfilled_on?"<p>"+dailyBackfillText(e.tw_backfilled_on)+"</p>":"")+(e.revised_on?"<p>"+dailyRevisionText(e.revised_on)+"</p>":"")+'</div>';
 const sectioned=dailySectioned(e),links=sectioned?e.links:null,item=c=>dailyItem(c,links);
 const body=sectioned?REGIONS.map(([r,label])=>{const items=e.claims.filter(c=>(isTw(c)?"tw":"intl")===r);
  return '<section><h2 data-region="'+r+'">'+label+"</h2>"+(items.length?items.map(item).join(""):"<p>"+REGION_EMPTY+"</p>")+"</section>";}).join(""):e.claims.map(item).join("");
 const main="<article>"+body+"</article>";
 return shell({depth:2,current:"daily",title:e.date+" 每日短訊",description:"K-12 AI 素養每日短訊："+e.date,head,main});
}
function renderDailyIndex(days){
 const head='<div class="kicker">每日短訊</div><h1>每天 09:00，記錄新發布的原始文件</h1>'+relationNote("../")+'<div class="notice"><p><strong>每日短訊只說「誰在哪天發布了什麼」。</strong>不含政策解讀、研究成效或對臺灣的建議；每則附原文連結，首次公開日須在 7 天內。'+AI_ITEM_NOTE+'本頁只列標題，摘要請點進當日短訊頁。</p></div>';
 const main=days.length?'<ul class="item-list">'+days.map(d=>dailyCard(d,1)).join("")+"</ul>":
  '<p class="empty">尚無已發布的每日短訊。只有首次公開在 7 天內、可取得原文且屬低風險的來源才會發布；沒有合格項目的日子不發刊，查核紀錄公開於 GitHub。</p>';
 return shell({depth:1,current:"daily",title:"每日短訊",description:"K-12 AI 素養每日短訊列表",head,main});
}

/* ---------- weekly / monthly ---------- */
/* Registered period paths: weekly YYYY-MM-DD_MM-DD (1-10 days inclusive, may cross a year end), monthly YYYY-MM.
   Returns null for anything else, so the gate and the renderer share one definition. */
function periodRange(kind,period){
 const iso=s=>Number.isFinite(Date.parse(s+"T00:00:00Z"))&&new Date(s+"T00:00:00Z").toISOString().slice(0,10)===s;
 if(kind==="monthly"){const m=/^(\d{4})-(0[1-9]|1[0-2])$/.exec(String(period));return m?{year:+m[1],month:+m[2]}:null}
 if(kind!=="weekly")return null;
 const m=/^(\d{4})-(\d{2}-\d{2})_(\d{2}-\d{2})$/.exec(String(period));if(!m)return null;
 const start=m[1]+"-"+m[2],end=(m[3]<m[2]?+m[1]+1:m[1])+"-"+m[3];
 if(!iso(start)||!iso(end))return null;
 const days=(Date.parse(end+"T00:00:00Z")-Date.parse(start+"T00:00:00Z"))/864e5+1;
 return days>=1&&days<=10?{start,end}:null;
}
/* Everything outside <main> is fixed per channel; only the period varies. Weekly <main> holds claim paragraphs
   only; monthly <main> adds the fixed section text below, because every other substantive node must bind to a claim. */
function renderPeriodEdition(kind,e){
 const r=periodRange(kind,e.period);if(!r)throw new Error("invalid "+kind+" period: "+e.period);
 const isWeekly=kind==="weekly",label=isWeekly?"週報":"月報";
 const h1=isWeekly?periodLabel(e.period)+" 週報":r.year+" 年 "+r.month+" 月月報";
 const notice=isWeekly?"每則對回原文並標示來源類型；精選讀全文補上樣本、設計與限制，其他項目一行一則並連到每日短訊。"+AI_ISSUE_NOTE:monthlySectioned(e)?MONTHLY_NOTICE:"整合當月週報與重要背景，區分原始發現與本刊分析；由 AI 整理，未經獨立認證。請點連結閱讀原文。";
 const head='<div class="kicker">'+label+"</div><h1>"+esc(h1)+'</h1><div class="notice"><p>'+notice+"</p></div>";
 const revision=e.revised_on?"<p>"+(isWeekly?weeklyRevisionText:monthlyRevisionText)(e.revised_on)+"</p>":"";
 const main="<article>"+revision+(isWeekly?weeklyMain(e.claims,e):monthlySectioned(e)?monthlyMainSectioned(e):monthlyMain(e.claims))+"</article>";
 return shell({depth:2,current:kind,title:label+" "+e.period,description:"K-12 AI 素養"+label+"："+e.period,head,main});
}
/* Weekly <main> (manager decisions 2026-10-17): an optional overview (editorial analysis, each sentence citing
   numbered items), featured items re-checked against the full text, the week's other daily items, and optional
   background documents first disclosed before the period. Each section is a table or list whose cells other than
   the claims are derived from claim fields here. A weekly whose claims carry no weekly_section keeps the original
   flat layout; sectioned weeklies must equal this render of their claims (the gate re-renders the page). */
const WEEKLY_SECTIONS=[
 ["overview","本週導讀",ANALYSIS_LABEL+"：依本期來源歸納，每句附依據編號；不作評價或建議。"],
 ["featured","本週精選","從本週短訊與候選項目中選出至多 5 則，讀全文補上樣本、方法、作者所述發現與限制（政策為內容）；不寫成效與因果推論。"],
 ["briefs","本週其他短訊","本期其他項目一行一則，摘要請點每日短訊；官方演講等未發每日短訊者列出全文。"],
 ["background","背景補充","與本期項目相關、但首次公開早於本期的文件；非本週新訊。"]];
/* Taiwan area after the international sections (manager decision 2026-10-17): central government and Taiwan
   research only, a 1–2 sentence comparison note (editorial analysis citing both sides), this week's Taiwan items,
   and Taiwan documents set beside this issue's international items. Facts only: no evaluation or advice. */
const TW_SECTIONS=[
 ["tw_note","對照說明",ANALYSIS_LABEL+"：並列本期國際項目與臺灣文件的事實，不作評價或建議。"],
 ["taiwan","臺灣本週動態","本期內首次公開的臺灣中央機關政策與臺灣研究，一行一則，摘要請點每日短訊。"],
 ["tw_compare","臺灣對照","與本期國際項目主題相對應的臺灣中央文件；首發日可早於本期，非本週新訊。"]];
const TW_HEADING="臺灣",TW_INTRO="臺灣部分與國際分開：只收中央機關與臺灣研究；對照只並列事實，不作評價或建議。";
const TW_INTRO_NOT_SEARCHED="臺灣部分與國際分開：只收中央機關與臺灣研究；本期尚未納入臺灣來源查核，對照列為編輯選取的中央文件，非完整蒐集；對照只並列事實，不作評價或建議。";
const TW_NOT_SEARCHED="本期尚未納入臺灣來源查核（2026-10-18 起納入），故無臺灣本週動態。",TW_FROM_PERIOD="2026-10-16";
const WEEKLY_TW_NOTE_MAX=2,WEEKLY_TW_COMPARE_MAX=3;
const WEEKLY_OPTIONAL=new Set(["overview","background","tw_note","tw_compare"]);
const WEEKLY_EMPTY="本期無合格項目。",WEEKLY_FEATURED_MAX=5,WEEKLY_OVERVIEW_MAX=3,WEEKLY_BACKGROUND_MAX=3;
const WEEKLY_COLUMNS=["編號","類型","首次公開","標籤","內容"];
const WEEKLY_FACETS=["樣本","資料","設計","作者所述發現","限制","內容","說明"];
const SOURCE_TYPES={peer_reviewed_article:"同儕審查論文",preprint:"預印本",binding_policy:"正式政策",official_guidance:"官方指引",draft:"草案",official_commentary:"官方新聞",training_event:"活動",speech:"演講"};
const weeklyRevisionText=d=>"本期於 "+d+" 改版，項目編號可能已調整；改版前內容保留於 GitHub 查核紀錄。";
const weeklySectioned=claims=>claims.some(c=>c&&c.weekly_section!==undefined);
/* Items a reader counts: featured and briefs only (not overview sentences or background documents). */
const itemCount=e=>monthlySectioned(e)?e.claims.filter(c=>["policy","research","scholars","background","tw_policy","tw_research","tw_compare"].includes(c.section)).length:weeklySectioned(e.claims)?e.claims.filter(c=>c.weekly_section==="featured"||c.weekly_section==="briefs").length:e.claims.length;
const periodLabel=p=>{const r=periodRange("weekly",p);return r?r.start.replace(/-/g,"/")+"—"+r.end.slice(5).replace(/-/g,"/"):p};
/* An official speech is shown as 官方發言, not 政策 (manager 2026-10-17: 「演講，非政策」). */
const weeklyKind=c=>c.weekly_section==="background"?["background","背景"]:c.weekly_section==="tw_compare"?["tw","對照"]:c.kind==="research"?["research","研究"]:c.source_document_type==="speech"?["policy","官方發言"]:["policy","政策"];
/* Item numbers run across featured then briefs, so overview sentences and background rows can cite them. */
function weeklyNumbers(claims){
 const n=new Map();let i=0,b=0;
 for(const key of ["featured","briefs"])for(const c of claims.filter(x=>x.weekly_section===key))n.set(c.claim_id,String(++i));
 for(const c of claims.filter(x=>x.weekly_section==="background"))n.set(c.claim_id,"背景 "+(++b));
 let t=0,k=0;
 for(const c of claims.filter(x=>x.weekly_section==="taiwan"))n.set(c.claim_id,"臺 "+(++t));
 for(const c of claims.filter(x=>x.weekly_section==="tw_compare"))n.set(c.claim_id,"對照 "+(++k));
 return n;
}
const anchor=num=>"item-"+({"背景":"b","臺":"t","對照":"c","來源":"d","一覽":"l","文件":"f"}[num.split(" ")[0]]||"")+num.replace(/\D/g,"");
const link=x=>'<a href="#'+anchor(x)+'">'+x+"</a>";
const cite=(ids,n)=>"第 "+ids.map(id=>n.get(id)).sort((a,b)=>parseInt(a)-parseInt(b)).map(link).join("、")+" 則";
/* Taiwan note citations: international item numbers, then Taiwan rows by their own labels. */
function citeMixed(ids,n){
 const nums=ids.map(id=>n.get(id)),intl=nums.filter(x=>/^\d+$/.test(x)),tw=nums.filter(x=>!/^\d+$/.test(x));
 return (intl.length?"國際"+cite(ids.filter(id=>/^\d+$/.test(n.get(id))),n):"")+(intl.length&&tw.length?"；":"")+(tw.length?"臺灣："+tw.map(link).join("、"):"");
}
/* Featured text is written as labelled segments (樣本：… 。設計：… 。); each label starts a new line. */
function facetBody(c){
 let body=claimBody(c);
 for(const f of WEEKLY_FACETS)body=body.split("。"+f+"：").join("。<br><strong>"+f+"：</strong>");
 return body;
}
function weeklySummary(claims,e={}){
 const main=claims.filter(c=>c.weekly_section==="featured"||c.weekly_section==="briefs"),cnt=f=>main.filter(f).length;
 const tw=claims.filter(c=>c.weekly_section==="taiwan").length,cmp=claims.filter(c=>c.weekly_section==="tw_compare").length;
 const dims=c=>Array.isArray(c.ai_lit_dims)?c.ai_lit_dims:[];
 return "本期 "+main.length+" 則（精選 "+cnt(c=>c.weekly_section==="featured")+"、其他短訊 "+cnt(c=>c.weekly_section==="briefs")+"）：政策 "+cnt(c=>c.kind!=="research")+"、研究 "+cnt(c=>c.kind==="research")+"；其中對應學生 AI 素養面向者 "+cnt(c=>dims(c).some(d=>d.startsWith("S-")))+" 則、教師面向者 "+cnt(c=>dims(c).some(d=>d.startsWith("T-")))+" 則"+(e.taiwan_not_searched===true?"；臺灣本週動態：本期未查、臺灣對照 "+cmp+" 列":tw||cmp?"；臺灣本週動態 "+tw+" 則、臺灣對照 "+cmp+" 列":"")+"。";
}
function weeklyRow(c,n,claims){
 const [cls,label]=weeklyKind(c),type=SOURCE_TYPES[c.source_document_type]||"其他";
 const tags=c.weekly_section==="background"?"相關："+cite(c.related_claim_ids||[],n):c.weekly_section==="tw_compare"?"對照："+cite(c.related_claim_ids||[],n):dailyTagList(c).map(t=>"<span>#"+esc(t)+"</span>").join(" ");
 const zh=typeof c.title_zh==="string"&&c.title_zh.trim()?c.title_zh.trim():"",rs=zh?' rowspan="2"':"";
 const body=c.weekly_section==="featured"?facetBody(c):claimBody(c);
 return '<tr id="'+anchor(n.get(c.claim_id))+'"><td'+rs+">"+esc(n.get(c.claim_id))+"</td><td"+rs+' data-kind="'+cls+'"><span>'+label+"</span><br>"+type+"</td><td"+rs+">"+esc(c.first_disclosed_on||"未知")+"</td><td"+rs+">"+tags+"</td>"+
  (zh?"<td>中文譯名："+esc(zh)+"</td></tr><tr>":"")+'<td data-claim-id="'+esc(c.claim_id)+'">'+body+"</td></tr>";
}
/* Items repeated from a daily brief are one line each, linking to that daily item (manager decision 2026-10-17, C1). */
const isLine=c=>["briefs","taiwan"].includes(c.weekly_section)&&typeof c.weekly_source_claim==="string"&&/^D\d{8}-\d{2}$/.test(c.weekly_source_claim);
function weeklyLine(c,n){
 const num=n.get(c.claim_id),[,label]=weeklyKind(c),type=SOURCE_TYPES[c.source_document_type]||"其他",d=c.weekly_source_claim,day=d.slice(1,5)+"-"+d.slice(5,7)+"-"+d.slice(7,9);
 return '<li id="'+anchor(num)+'">'+(/^\d+$/.test(num)?"第 "+num+" 則":esc(num))+"｜"+label+"・"+type+"｜"+esc(c.first_disclosed_on||"未知")+"｜"+esc(itemTitle(c))+'｜<a href="../../daily/'+day+"/#"+esc(d)+'">每日短訊 '+day+'</a>｜<a href="'+esc(c.source_url)+'">原文</a></li>';
}
function weeklyItems(items,n,claims){
 const lines=items.filter(isLine),rows=items.filter(c=>!isLine(c));
 return (lines.length?"<ul>"+lines.map(c=>weeklyLine(c,n)).join("")+"</ul>":"")+(rows.length?"<table><thead><tr>"+WEEKLY_COLUMNS.map(h=>'<th scope="col">'+h+"</th>").join("")+"</tr></thead><tbody>"+rows.map(c=>weeklyRow(c,n,claims)).join("")+"</tbody></table>":"");
}
function weeklyMain(claims,e={}){
 if(!weeklySectioned(claims)){if(claims.some(c=>c&&c.region==="tw"))throw new Error("Taiwan items need the sectioned weekly layout");return claims.map(c=>claimParagraph(c,true)).join("");}
 const keys=[...WEEKLY_SECTIONS,...TW_SECTIONS].map(x=>x[0]);
 for(const c of claims)if(!keys.includes(c.weekly_section))throw new Error("weekly claim needs a known weekly_section: "+c.claim_id);
 const n=weeklyNumbers(claims);
 const sections=WEEKLY_SECTIONS.map(([key,heading,intro])=>{
  const items=claims.filter(c=>c.weekly_section===key);
  if(!items.length&&WEEKLY_OPTIONAL.has(key))return "";
  let body;
  if(!items.length)body="<p>"+WEEKLY_EMPTY+"</p>";
  else if(key==="overview")body=items.map(c=>'<p data-claim-id="'+esc(c.claim_id)+'">'+esc(c.claim_text)+"</p><p>依據："+cite(c.supporting_claim_ids||[],n)+"</p>").join("");
  else body=weeklyItems(items,n,claims);
  return "<section"+(key==="overview"?' data-part="overview"':"")+"><h2>"+heading+"</h2><p>"+intro+"</p>"+body+"</section>";
 }).join("");
 const link=(label,p)=>p?"<p>"+label+'：<a href="../'+esc(p)+'/">'+esc(periodLabel(p))+"</a></p>":"";
 const nav=e.nav?link("上一期",e.nav.prev)+link("下一期",e.nav.next):"";
 return "<p>"+weeklySummary(claims,e)+"</p>"+sections+weeklyTaiwan(claims,e,n)+nav;
}
const twAreaShown=(claims,e)=>claims.some(c=>c.region==="tw")||e.taiwan_not_searched===true||String(e.period||"")>=TW_FROM_PERIOD;
function weeklyTaiwan(claims,e,n){
 if(!twAreaShown(claims,e))return "";
 const parts=TW_SECTIONS.map(([key,heading,intro])=>{
  const items=claims.filter(c=>c.weekly_section===key);
  if(!items.length&&WEEKLY_OPTIONAL.has(key))return "";
  let body;
  if(key==="tw_note")body=items.map(c=>'<p data-claim-id="'+esc(c.claim_id)+'">'+esc(c.claim_text)+"</p><p>依據："+citeMixed(c.supporting_claim_ids||[],n)+"</p>").join("");
  else if(!items.length)body="<p>"+(e.taiwan_not_searched===true?TW_NOT_SEARCHED:WEEKLY_EMPTY)+"</p>";
  else body=weeklyItems(items,n,claims);
  return "<h3>"+heading+"</h3><p>"+intro+"</p>"+body;
 }).join("");
 const sample=claims.filter(c=>c.taiwan_sample===true&&/^\d+$/.test(n.get(c.claim_id)||"")).map(c=>c.claim_id);
 return '<hr><section data-region="tw"><h2>'+TW_HEADING+"</h2><p>"+(e.taiwan_not_searched===true?TW_INTRO_NOT_SEARCHED:TW_INTRO)+"</p>"+parts+(sample.length?"<p>本期國際項目中以臺灣為樣本者："+cite(sample,n)+"。</p>":"")+"</section>";
}
/* Neighbouring weekly periods for the 上一期／下一期 links: registered weeklies plus the legacy launch issue. */
function weeklyNav(period,registered){
 const all=[...new Set([...LEGACY_WEEKLY.map(x=>x.path.split("/")[1]),...registered])].filter(p=>periodRange("weekly",p)).sort(compareText);
 const i=all.indexOf(period);
 return i<0?{}:{prev:all[i-1]||null,next:all[i+1]||null};
}
/* Monthly <main> sections. Headings, intros and empty-state lines are fixed text in reviewed code; every other
   node is a claim paragraph placed by its `section` field. The gate re-renders the whole page from the claims. */
const MONTHLY_SECTIONS=[
 ["policy","政策動態",""],
 ["research","研究動態",""],
 ["scholars","本刊追蹤學者本月新作","選取方式：本刊追蹤學者清單上已確認的學者，在本期觀察期間正式刊出、且屬 AI 素養範圍的論文；每人至多 2 則、每個研究群至多 4 則，並標明主要對象。"],
 ["trends","學者觀點動向","本刊分析：彙整追蹤學者近三個月新作中反覆出現的論點；每項至少有兩個不同研究群的來源支持，同一研究群只算一個來源。不含對臺灣的建議，未經真人審閱。"]];
const MONTHLY_EMPTY="本期無合格項目。",MONTHLY_ANALYSIS="本刊分析",MONTHLY_BASIS="依據來源";
const MONTHLY_FIXED=new Set([...MONTHLY_SECTIONS.flatMap(([,h,intro])=>intro?[h,intro]:[h]),MONTHLY_EMPTY,MONTHLY_ANALYSIS,MONTHLY_BASIS]);
function monthlyMain(claims){
 const keys=MONTHLY_SECTIONS.map(x=>x[0]);
 for(const c of claims)if(!keys.includes(c.section))throw new Error("monthly claim needs a known section: "+c.claim_id);
 return MONTHLY_SECTIONS.map(([key,heading,intro])=>{
  const items=claims.filter(c=>c.section===key),para=list=>list.map(c=>claimParagraph(c,true)).join("");
  let body;
  if(!items.length)body="<p>"+MONTHLY_EMPTY+"</p>";
  else if(key==="trends"){
   const analysis=items.filter(c=>c.assertion_type==="editorial_analysis"),basis=items.filter(c=>c.assertion_type!=="editorial_analysis");
   body=(analysis.length?"<h3>"+MONTHLY_ANALYSIS+"</h3>"+para(analysis):"")+(basis.length?"<h3>"+MONTHLY_BASIS+"</h3>"+para(basis):"");
  }else body=para(items);
  return "<section><h2>"+heading+"</h2>"+(intro?"<p>"+intro+"</p>":"")+body+"</section>";
 }).join("");
}
/* ---------- sectioned monthly (manager decisions 2026-10-17; research/drafts/2026-10-17-monthly-redesign-plan.md) ----------
   A monthly registered with `indexed_weeklies` in issues.json uses this layout: a table of contents, then 國際 (one-line
   summary, overview, policy, research, tracked scholars, scholar trends, background), a rule, 臺灣 (note, comparison
   documents, this month's Taiwan daily items, Taiwan research), and 本月整理 (counts and a list of the month's weekly
   and daily items, linked rather than rewritten). Lists and counts come from registered weeklies and dailies; the
   weeklies are frozen by `indexed_weeklies` so a weekly published later does not change an issued monthly. */
const SITE_URL="https://jhchenmooc.github.io/k12-ai-literacy-report/";
const MONTHLY_NOTICE="月報是當月的跨週整理，另收週報沒有收的研究與文件；逐日新訊請看每日短訊，一週精選請看週報。本月報由 AI 依原文整理，經管理者核准發布，未經真人逐則審稿。請點連結閱讀原文。";
/* October 2026 is the transition issue: the September monthly's window ended on 9/29. */
const MONTHLY_WINDOW_START={"2026-10":"2026-09-30"};
function monthlyWindow(period){
 const r=periodRange("monthly",period);if(!r)return null;
 const pad=n=>String(n).padStart(2,"0"),month=r.year+"-"+pad(r.month);
 return {month,prev:r.month===1?(r.year-1)+"-12":r.year+"-"+pad(r.month-1),start:MONTHLY_WINDOW_START[period]||month+"-01",end:month+"-"+pad(new Date(Date.UTC(r.year,r.month,0)).getUTCDate())};
}
const monthlySectioned=e=>!!e&&e.indexed_weeklies!==undefined;
const monthlyRevisionText=d=>"本期於 "+d+" 改版，項目編號可能已調整；改版前內容保留於 GitHub 查核紀錄。";
const MONTHLY_ANALYSIS_NOTE="編輯歸納（AI 整理，未經真人審閱）";
const MONTHLY_INTL=[
 ["overview_line","本月一句話",MONTHLY_ANALYSIS_NOTE+"：用一句話說明本月重點。"],
 ["overview","本月導讀",MONTHLY_ANALYSIS_NOTE+"：依本期項目歸納，每句附依據；不作評價或建議。"],
 ["policy","政策與官方文件","本段只收沒有刊在每日短訊或週報的官方文件；原文僅標示年月者另註明。"],
 ["research","研究","本段只收沒有刊在每日短訊或週報的研究；可收師培、大學與成人對象並標明對象，重要研究依全文列出樣本、設計、作者所述發現與限制。"],
 ["scholars","重要學者本月新作","本刊追蹤學者在本期正式刊出、屬 AI 素養範圍的論文；每人至多 2 則、每個研究群至多 4 則。"],
 ["trends","學者觀點動向",MONTHLY_ANALYSIS_NOTE+"：本刊追蹤學者近三個月新作中反覆出現的論點；每項至少有兩個彼此無合作關係的團隊支持，其中至少一則為以中小學為對象的同儕審查研究。"],
 ["background","背景資料","與本期項目相關、但首次公開早於本期的文件；非本月新訊。"]];
const MONTHLY_TW=[
 ["tw_note","臺灣與國際並列重點",MONTHLY_ANALYSIS_NOTE+"：並列本期國際項目與臺灣項目的事實，不作評價或建議。"],
 ["tw_policy","臺灣本月中央文件","本期首次公開、沒有刊在每日短訊的臺灣中央機關文件；原文僅標示年月者另註明。"],
 ["tw_compare","對應的臺灣中央文件","與本期國際項目主題相對應的臺灣中央文件；首次公開可早於本期。"],
 ["tw_listing","臺灣本月動態一覽","本期首次公開、已刊於每日短訊的臺灣項目。"],
 ["tw_research","臺灣研究","臺灣期刊中以中小學或其他教育關係人為對象的 AI 素養研究。"]];
const MONTHLY_KEYS=[...MONTHLY_INTL,...MONTHLY_TW].map(x=>x[0]).filter(k=>k!=="tw_listing");
const MONTHLY_OPTIONAL=new Set(["overview_line","overview","background","tw_note","tw_compare"]);
const MONTHLY_TW_INTRO="臺灣部分與國際分開：只收中央機關與臺灣研究；只並列事實，不作評價或建議。";
const MONTHLY_TW_NOT_SEARCHED="本期未查臺灣期刊，將於下期補列。";
const MONTHLY_AUDIENCE={k12:"中小學",other_stakeholders:"其他教育關係人",teacher_ed:"師培",higher_ed:"大學",adult:"成人"};
const MONTHLY_COLUMNS=[["num","編號"],["kind","類型"],["date","首次公開"],["audience","對象"],["tags","標籤"],["content","內容"]];
const MONTHLY_OVERVIEW_LINE_MAX=60,MONTHLY_OVERVIEW_MIN=3,MONTHLY_OVERVIEW_MAX=5,MONTHLY_BACKGROUND_MAX=3,MONTHLY_TW_NOTE_MAX=2,MONTHLY_TW_COMPARE_MAX=3;
/* Non-K-12 research (teacher education, higher education, adults) across 研究 and 重要學者本月新作 (manager 2026-10-17). */
const monthlyNonK12Cap=n=>Math.max(2,Math.floor(n/3));
const isNonK12=c=>!["k12","other_stakeholders"].includes(c.audience);
const monthlyKind=c=>c.section==="background"?["background","背景"]:c.section==="tw_compare"?["tw","對照"]:c.section==="tw_research"?["tw","臺灣研究"]:c.section==="tw_policy"?["tw","臺灣政策"]:c.kind==="research"?["research","研究"]:c.source_document_type==="speech"?["policy","官方發言"]:["policy","政策"];
const isDay=d=>typeof d==="string"&&/^\d{4}-\d{2}-\d{2}$/.test(d)&&Number.isFinite(Date.parse(d+"T00:00:00Z"))&&new Date(d+"T00:00:00Z").toISOString().slice(0,10)===d;
/* Item numbers: 1..n across policy, research and scholars; other rows carry their section label. */
function monthlyNumbers(claims,listing){
 const n=new Map(),label=(list,prefix)=>list.forEach((c,i)=>n.set(c.claim_id,prefix+(i+1)));
 let i=0;for(const k of ["policy","research","scholars"])for(const c of claims.filter(x=>x.section===k))n.set(c.claim_id,String(++i));
 label(claims.filter(x=>x.section==="trends"&&x.assertion_type!=="editorial_analysis"),"來源 ");
 label(claims.filter(x=>x.section==="background"),"背景 ");
 label(claims.filter(x=>x.section==="tw_policy"),"文件 ");
 label(claims.filter(x=>x.section==="tw_research"),"臺 ");
 label(claims.filter(x=>x.section==="tw_compare"),"對照 ");
 listing.all.forEach((x,j)=>{if(!n.has(x.c.claim_id))n.set(x.c.claim_id,"一覽 "+(j+1))});
 return n;
}
/* Citations: this issue's numbered items as 第 n 則, every other row by its own label. */
function monthlyCite(ids,n){
 const nums=ids.map(id=>n.get(id)).filter(Boolean),plain=nums.filter(x=>/^\d+$/.test(x)).sort((a,b)=>a-b),other=nums.filter(x=>!/^\d+$/.test(x));
 return [plain.length?"第 "+plain.map(link).join("、")+" 則":"",other.map(link).join("、")].filter(Boolean).join("；");
}
const monthlyDate=(c,w)=>c.section==="scholars"?esc(c.publication_date||"未知")+"（正式刊出）":c.date_precision==="month"?esc(c.first_disclosed_on)+"（原文僅標示年月"+(c.first_disclosed_on===w.prev?"，原文標示上月":"")+"）":esc(c.first_disclosed_on||"未知");
function monthlyRow(c,n,w){
 const [cls,label]=monthlyKind(c),type=SOURCE_TYPES[c.source_document_type]||"其他";
 const tags=c.section==="background"?"相關："+monthlyCite(c.related_claim_ids||[],n):c.section==="tw_compare"?"對照："+monthlyCite(c.related_claim_ids||[],n):dailyTagList(c).map(t=>"<span>#"+esc(t)+"</span>").join(" ")+(c.has_resources===true?" <span>#附可下載資源</span>":"")+(typeof c.doi==="string"&&c.doi?"<br>DOI："+esc(c.doi):"");
 const zh=typeof c.title_zh==="string"&&c.title_zh.trim()?c.title_zh.trim():"",rs=zh?' rowspan="2"':"";
 const td=(col,v,extra="")=>"<td"+rs+' data-col="'+col+'"'+extra+">"+v+"</td>";
 return '<tr id="'+anchor(n.get(c.claim_id))+'">'+td("num",esc(n.get(c.claim_id)))+td("kind","<span>"+label+"</span><br>"+type,' data-kind="'+cls+'"')+td("date",monthlyDate(c,w))+td("audience","<span>"+esc(MONTHLY_AUDIENCE[c.audience]||"未標示")+"</span>")+td("tags",tags)+
  (zh?'<td data-col="content">中文譯名：'+esc(zh)+"</td></tr><tr>":"")+'<td data-col="content" data-claim-id="'+esc(c.claim_id)+'">'+(c.full_text_checked===true?facetBody(c):claimBody(c))+"</td></tr>";
}
const monthlyTable=(items,n,w)=>"<table><thead><tr>"+MONTHLY_COLUMNS.map(([,h])=>'<th scope="col">'+h+"</th>").join("")+"</tr></thead><tbody>"+items.map(c=>monthlyRow(c,n,w)).join("")+"</tbody></table>";
const analysisParas=(items,n)=>items.map(c=>'<p data-claim-id="'+esc(c.claim_id)+'">'+esc(c.claim_text)+"</p>"+(Array.isArray(c.supporting_claim_ids)&&c.supporting_claim_ids.length?"<p>依據："+monthlyCite(c.supporting_claim_ids,n)+"</p>":"")).join("");
/* The registered weeklies and dailies a sectioned monthly lists (render and gate share this). */
function monthlyContext(e,editions){
 const idx=Array.isArray(e.indexed_weeklies)?e.indexed_weeklies:[];
 const objs=list=>(Array.isArray(list)?list:[]).filter(c=>c&&typeof c==="object");
 const weeklies=periodEditions("weekly",editions).filter(x=>idx.includes(x.period)).sort((a,b)=>compareText(a.period,b.period)).map(x=>({period:x.period,claims:objs(x.claims)}));
 // Dailies are frozen at indexed_through, so a later daily cannot change an issued monthly.
 const through=typeof e.indexed_through==="string"?e.indexed_through:"";
 const dailies=dailyEditions(editions).filter(d=>d.date<=through).map(d=>({date:d.date,claims:objs(d.claims)})).sort((a,b)=>compareText(a.date,b.date));
 const months=[...new Set([...LEGACY_MONTHLY.map(x=>x.path.slice(8,15)),...periodEditions("monthly",editions).map(x=>x.period)])].sort(compareText);
 return {weeklies,dailies,months};
}
/* Weekly featured and brief items first disclosed in the window, then daily items not yet in a listed weekly. */
function monthlyListing(e,w){
 const ctx=e.context||{},inWin=d=>isDay(d)&&d>=w.start&&d<=w.end,seen=new Set(),groups=[],tw=[],pending=[];
 for(const wk of ctx.weeklies||[]){
  const n=weeklyNumbers(wk.claims);
  for(const c of wk.claims)if(typeof c.weekly_source_claim==="string")seen.add(c.weekly_source_claim);
  const items=wk.claims.filter(c=>["featured","briefs"].includes(c.weekly_section)&&inWin(c.first_disclosed_on));
  if(items.length)groups.push({weekly:true,label:"週報 "+periodLabel(wk.period),items:items.map(c=>({c,kind:weeklyKind(c)[1],href:"../../weekly/"+wk.period+"/#"+anchor(n.get(c.claim_id)),where:"週報第 "+n.get(c.claim_id)+" 則"}))});
 }
 for(const d of ctx.dailies||[])for(const c of d.claims){
  if(!inWin(c.first_disclosed_on))continue;
  const entry={c,kind:c.kind==="research"?"研究":"政策",href:"../../daily/"+d.date+"/",where:"每日短訊 "+d.date};
  if(isTw(c))tw.push(entry);else if(!seen.has(c.claim_id))pending.push(entry);
 }
 if(pending.length)groups.push({label:"每日短訊（尚未收入上列週報）",items:pending});
 return {groups,tw,all:[...tw,...groups.flatMap(g=>g.items)]};
}
function listingItem(x,n){
 const title=typeof x.c.title_zh==="string"&&x.c.title_zh.trim()?x.c.title_zh.trim():x.c.source_title||"";
 return '<li id="'+anchor(n.get(x.c.claim_id))+'">'+esc(n.get(x.c.claim_id))+"｜"+esc(x.kind)+"｜"+esc(x.c.first_disclosed_on)+"｜"+esc(title)+(typeof x.c.tracked_scholar==="string"&&x.c.tracked_scholar.trim()?"｜追蹤學者":"")+'｜<a href="'+esc(x.href)+'">'+esc(x.where)+'</a>｜<a href="'+esc(x.c.source_url)+'">原文</a></li>';
}
function monthlySummary(e,claims,listing,w){
 const ctx=e.context||{},inWin=d=>d>=w.start&&d<=w.end,dims=c=>Array.isArray(c.ai_lit_dims)?c.ai_lit_dims:[];
 const cnt=k=>claims.filter(c=>c.section===k).length,weeklyItems=listing.groups.filter(g=>g.weekly).reduce((a,g)=>a+g.items.length,0),dailyOnly=listing.all.length-listing.tw.length-weeklyItems;
 const items=claims.filter(c=>["policy","research","scholars","background","tw_policy","tw_research","tw_compare"].includes(c.section));
 const research=claims.filter(c=>c.section==="research"||c.section==="scholars"),non=research.filter(isNonK12).length;
 const aud=Object.entries(MONTHLY_AUDIENCE).map(([k,v])=>[v,items.filter(c=>c.audience===k).length]).filter(([,x])=>x).map(([v,x])=>v+" "+x).join("、");
 return "本期（"+w.start+" 至 "+w.end+"）首次公開、已刊於週報或每日短訊者 "+listing.all.length+" 則（週報 "+(ctx.weeklies||[]).length+" 期 "+weeklyItems+" 則、尚未收入週報的每日短訊 "+dailyOnly+" 則、臺灣 "+listing.tw.length+" 則）。本月報另收：政策與官方文件 "+cnt("policy")+"、研究 "+cnt("research")+"、重要學者本月新作 "+cnt("scholars")+"、背景資料 "+cnt("background")+
  "；對應學生 AI 素養面向者 "+items.filter(c=>dims(c).some(d=>d.startsWith("S-"))).length+" 則、教師面向者 "+items.filter(c=>dims(c).some(d=>d.startsWith("T-"))).length+" 則"+(aud?"；對象："+aud:"")+
  "；非中小學研究 "+non+"／"+research.length+" 則（研究與重要學者本月新作合計；來自本刊追蹤學者清單與檢索紀錄，非系統蒐集）；"+(cnt("tw_policy")?"臺灣本月中央文件 "+cnt("tw_policy")+" 則、":"")+"臺灣研究"+(e.taiwan_journals_not_searched===true?"本期未查":" "+cnt("tw_research")+" 則")+(cnt("tw_compare")?"、對應的臺灣中央文件 "+cnt("tw_compare")+" 列":"")+"。";
}
function monthlyNav(period,months){
 const i=months.indexOf(period);if(i<0)return "";
 const legacy=new Set(LEGACY_MONTHLY.map(x=>x.path.slice(8,15)));
 const one=(label,p)=>{if(!p)return "";const r=periodRange("monthly",p);return "<p>"+label+'：<a href="../'+esc(p)+'/">'+r.year+" 年 "+r.month+" 月"+(legacy.has(p)?"（舊版，未經新查核流程）":"")+"</a></p>"};
 return one("上一期",months[i-1])+one("下一期",months[i+1]);
}
function monthlyMainSectioned(e){
 const claims=e.claims,w=monthlyWindow(e.period);
 for(const c of claims)if(!MONTHLY_KEYS.includes(c.section))throw new Error("monthly claim needs a known section: "+c.claim_id);
 const listing=monthlyListing(e,w),n=monthlyNumbers(claims,listing),of=k=>claims.filter(c=>c.section===k);
 const sec=(key,heading,intro,body,extra="")=>'<section id="sec-'+key+'"'+extra+"><h3>"+heading+"</h3><p>"+intro+"</p>"+body+"</section>";
 const toc=[];
 const part=([key,heading,intro])=>{
  const items=of(key);
  if(key==="tw_listing"){toc.push([key,heading,listing.tw.length]);return sec(key,heading,intro,listing.tw.length?"<ul>"+listing.tw.map(x=>listingItem(x,n)).join("")+"</ul>":"<p>"+WEEKLY_EMPTY+"</p>")}
  if(!items.length&&MONTHLY_OPTIONAL.has(key))return "";
  toc.push([key,heading,["overview_line","overview","tw_note"].includes(key)?null:key==="trends"?items.filter(c=>c.assertion_type==="editorial_analysis").length:items.length]);
  let body;
  if(key==="tw_research"&&e.taiwan_journals_not_searched===true&&!items.length)body="<p>"+MONTHLY_TW_NOT_SEARCHED+"</p>";
  else if(!items.length)body="<p>"+WEEKLY_EMPTY+"</p>";
  else if(["overview_line","overview","tw_note"].includes(key))body=analysisParas(items,n);
  else if(key==="trends"){const a=items.filter(c=>c.assertion_type==="editorial_analysis"),b=items.filter(c=>c.assertion_type!=="editorial_analysis");body=(a.length?"<h4>編輯歸納</h4>"+analysisParas(a,n):"")+(b.length?"<h4>依據來源</h4>"+monthlyTable(b,n,w):"")}
  else body=monthlyTable(items,n,w);
  return sec(key,heading,intro,body,key==="overview"?' data-part="overview"':"");
 };
 const intl=MONTHLY_INTL.map(part).join(""),twParts=MONTHLY_TW.map(part).join("");
 const listingBody=listing.groups.length?listing.groups.map(g=>"<h4>"+esc(g.label)+"（"+g.items.length+" 則）</h4><ul>"+g.items.map(x=>listingItem(x,n)).join("")+"</ul>").join(""):"<p>"+WEEKLY_EMPTY+"</p>";
 const tocItem=([k,h,c])=>'<li><a href="#sec-'+k+'">'+h+(c===null?"":k==="tw_research"&&e.taiwan_journals_not_searched===true?"（本期未查）":"（"+c+"）")+"</a></li>";
 const tocGroup=(k,h,items)=>'<li><a href="#sec-'+k+'">'+h+"</a>"+(items.length?"<ul>"+items.map(tocItem).join("")+"</ul>":"")+"</li>";
 const tocList='<section id="sec-toc"><h2>本期目錄</h2><ul>'+tocGroup("intl","國際",toc.filter(([k])=>!k.startsWith("tw_")))+tocGroup("tw","臺灣",toc.filter(([k])=>k.startsWith("tw_")))+tocGroup("summary","本月整理",[["stats","本月概況",null],["listing","本月週報與每日短訊一覽",listing.all.length-listing.tw.length]])+"</ul></section>";
 const nav=monthlyNav(e.period,(e.context&&e.context.months)||[]),r=periodRange("monthly",e.period);
 return tocList+'<section id="sec-intl" data-region="intl"><h2>國際</h2>'+intl+"</section><hr>"+
  '<section id="sec-tw" data-region="tw"><h2>臺灣</h2><p>'+MONTHLY_TW_INTRO+"</p>"+twParts+"</section>"+
  '<section id="sec-summary"><h2>本月整理</h2>'+sec("stats","本月概況","依本期登記的每日短訊、週報與本月報計算。","<p>"+monthlySummary(e,claims,listing,w)+"</p>")+sec("listing","本月週報與每日短訊一覽","本期首次公開、已刊於週報或每日短訊的項目，依期別列出；內容請見各期。",listingBody)+"</section>"+
  nav+"<p>引用本期：K-12 AI 素養國際動態，月報 "+r.year+" 年 "+r.month+" 月。"+SITE_URL+"monthly/"+esc(e.period)+"/（引用時請註明查閱日期）</p>";
}
const renderWeeklyEdition=e=>renderPeriodEdition("weekly",e),renderMonthlyEdition=e=>renderPeriodEdition("monthly",e);
function periodEditions(kind,editions){
 const re=new RegExp("^"+kind+"/([a-zA-Z0-9_-]+)/index\\.html$");
 return editions.map(e=>({...e,period:(re.exec(e.path)||[])[1]})).filter(e=>e.period&&periodRange(kind,e.period));
}
function renderPeriodIndex(kind,editions){
 const isWeekly=kind==="weekly",label=isWeekly?"週報":"月報",legacy=isWeekly?LEGACY_WEEKLY:LEGACY_MONTHLY;
 const registered=editions.filter(e=>e.path.startsWith(kind+"/")).map(e=>({path:e.path.replace(/index\.html$/,""),title:e.title||label+"："+(isWeekly?periodLabel(e.path.split("/")[1]):e.path.split("/")[1]),note:itemCount(e)+" 則，已通過自動檢查（非內容認證）"})).sort((a,b)=>compareText(b.path,a.path));
 const rows=[...registered,...legacy].map(x=>'<li class="item"><p><a href="'+esc(x.path.slice(kind.length+1))+'">'+esc(x.title)+'</a></p><div class="meta-line"><span>'+esc(x.note)+"</span></div></li>").join("");
 const head='<div class="kicker">'+label+"</div><h1>"+(isWeekly?"每週五：精選與當週一覽":"次月 3 日：跨週整理")+'</h1>'+relationNote("../")+'<p class="lead">'+(isWeekly?"期別為前一週五至週四。精選讀全文補上樣本、方法與限制，其餘一行一則並連到每日短訊；每則標示來源類型。沒有達到查核門檻的週次不發刊，不為湊數放寬標準。":"期別為日曆月。已刊於每日短訊或週報的項目列在一覽，另收週報沒有收的研究與文件；區分原始發現與編輯歸納。")+"</p>";
 const main=(registered.length?"":'<p class="empty">尚無以新版流程登錄的'+label+"；以下為早期版本。</p>")+'<ul class="item-list">'+rows+"</ul>";
 return shell({depth:1,current:kind,title:label,description:"K-12 AI 素養"+label+"列表",head,main});
}

/* ---------- archive ---------- */
function archiveData(records,relations,venues,hidden=[]){
 const rel=new Map();for(const r of relations){if(!rel.has(r.subject_id))rel.set(r.subject_id,[]);rel.get(r.subject_id).push(r)}
 const venueName=new Map(venues.map(v=>[v.id,v.name]));
 /* Weekly candidates stay out until their source has been checked (manager 2026-10-11). */
 const skip=new Set(hidden),kept=records.filter(r=>(!r.source_candidate_id||r.verification_status!=="discovered_unverified")&&!skip.has(r.record_id));
 const row=(r,rs=[])=>{
  const pop=new Set(rs.filter(x=>x.predicate==="has_population").map(x=>x.object_id));
  const tm=new Set(rs.filter(x=>x.predicate==="has_topic"||x.predicate==="has_method").map(x=>x.object_id));
  const ail=new Set(rs.filter(x=>x.predicate==="has_ailit_class"||x.predicate==="has_ailit_dim").map(x=>x.object_id));
  const countries=[...new Set(rs.filter(x=>x.predicate==="studies_country").map(x=>COUNTRY[x.object_id]||x.object_id))];
  const basis=r.year_basis;
  const date=basis==="first_publication"?r.first_published_on+" 首發":basis==="issue_year"?"卷期年（首發日未知）":basis==="event_year"?"會議年（首發日未知）":"未知";
  return {id:r.record_id,year:r.year_value||"未知",title:r.title,url:r.primary_url,date,type:POLICY_TYPES[r.record_type]||RESEARCH_TYPES[r.record_type]||r.record_type,status:STATUS[r.verification_status]||STATUS.discovered_unverified,tags:POPULATION_TAGS.filter(([k])=>pop.has(k)).map(([,t])=>t),tags2:[...TOPIC_TAGS,...METHOD_TAGS].filter(([k])=>tm.has(k)).map(([,t])=>t).concat(countries),tags3:AILIT_TAGS.filter(([k])=>ail.has(k)).map(([,t])=>t).concat(rs.some(x=>x.predicate==="has_citation_flag"&&x.object_id==="CITED_TOP10_SAME_YEAR")?["高引用"]:[])};
 };
 const policy=new Map(),journals=new Map(),conferences=new Map();
 const add=(m,key,name,sub,r)=>{if(!m.has(key))m.set(key,{key,name,sub,rows:[]});m.get(key).rows.push(row(r,rel.get(r.record_id)))};
 for(const r of kept){
  const rs=rel.get(r.record_id)||[];
  if(POLICY_TYPES[r.record_type]){
   const country=(rs.find(x=>x.predicate==="applies_to_country")||{}).object_id;
   const org=(rs.find(x=>x.predicate==="issued_by")||{}).object_id;
   if(INTERNATIONAL[org])add(policy,"0-INTL","國際組織","UNESCO、OECD、歐盟等跨國機構",r);
   else{const c=country||ORG_COUNTRY[org];if(c)add(policy,"1-"+c,COUNTRY[c]||c,org?org:"",r);else add(policy,"9-other","其他／未標國別","",r)}
  }else if(RESEARCH_TYPES[r.record_type]){
   const src=(rs.find(x=>x.predicate==="published_in")||{}).object_id;
   /* Book chapters have no monitored venue code; they sit in their own group on the journals page. */
   if(r.record_type==="book_chapter"){add(journals,"8-book","專書章節","收錄於專書的章節，非期刊論文",r);continue}
   /* Preprints have no venue; they sit in their own group on the journals page (manager 2026-10-11). */
   if(r.record_type==="preprint"){add(journals,"7-preprint","預印本","未經同儕審查的預印本，例如 arXiv",r);continue}
   const m=r.record_type==="conference_paper"?conferences:journals,label=m===conferences?"會議":"期刊";
   if(src)add(m,"1-"+src,venueName.get(src)||src,label+" "+src,r);
   else add(m,"9-other","其他"+label,"尚未對應到監測來源",r);
  }
 }
 const sortRows=g=>{g.rows.sort((a,b)=>yearOrder(a.year,b.year)||compareText(a.title,b.title)||compareText(a.id,b.id));return g};
 const sortGroups=m=>[...m.values()].map(sortRows).sort((a,b)=>compareText(a.key,b.key));
 return {policy:sortGroups(policy),journals:sortGroups(journals),conferences:sortGroups(conferences)};
}
/* Newest year first; "未知" last. */
function yearOrder(a,b){if(a===b)return 0;if(a==="未知")return 1;if(b==="未知")return -1;return compareText(b,a)}
const slug=s=>String(s).replace(/[^A-Za-z0-9]+/g,"-").replace(/^-|-$/g,"").toLowerCase()||"x";
const groupId=g=>"g-"+slug(g.key);
const yearId=(g,y)=>groupId(g)+"-y"+(y==="未知"?"unknown":y);
const LEGEND='<div class="legend"><span><span class="badge checked">書目已核</span> 題名、出處、日期已對過出版者或官方原頁</span><span><span class="badge unverified">僅發現・未核</span> 書目只核過索引登記資料，原頁或首發日未核</span><span><span class="badge fulltext">原文已核</span> 內容逐段核對</span><span class="legend-note">核對程度只指題名、出處、日期等書目資料。研究題名下的「#」標記（學段與身分、主題、方法、AI 素養範圍與框架面向）一律由 <strong>AI 判讀，未經人工核對</strong>，與核對程度無關。</span></div>';
/* "AIED — International Conference …": the long part is hidden on narrow screens; the full name stays in title and the group heading. */
function indexName(name){const i=name.indexOf(" — ");return i<0?esc(name):esc(name.slice(0,i))+'<span class="long">'+esc(name.slice(i))+"</span>"}
/* Quick index without scripts: groups × years matrix of in-page links. */
function quickIndex(groups,label){
 const known=groups.flatMap(g=>g.rows.map(r=>r.year)).filter(y=>/^\d{4}$/.test(y)).map(Number);
 const hi=Math.max(INDEX_FIRST_YEAR,...known),lo=Math.min(INDEX_FIRST_YEAR,...known);
 const years=Array.from({length:hi-lo+1},(_,i)=>String(hi-i));
 if(groups.some(g=>g.rows.some(r=>r.year==="未知")))years.push("未知");
 const head='<tr><th scope="col" class="name">'+label+'</th><th scope="col">合計</th>'+years.map(y=>'<th scope="col">'+esc(y)+"</th>").join("")+"</tr>";
 const body=groups.map(g=>{
  const by=new Map();for(const r of g.rows)by.set(r.year,(by.get(r.year)||0)+1);
  return '<tr data-g="'+groupId(g)+'"><th scope="row" class="name"><a href="#'+groupId(g)+'" title="'+esc(g.name)+'">'+indexName(g.name)+'</a></th><td class="total" data-n="'+g.rows.length+'">'+g.rows.length+"</td>"+years.map(y=>by.has(y)?'<td data-y="'+esc(y)+'"><a href="#'+yearId(g,y)+'" data-n="'+by.get(y)+'" data-label="'+esc(g.name)+" "+esc(y)+' 年 " aria-label="'+esc(g.name)+" "+esc(y)+" 年 "+by.get(y)+' 筆">'+by.get(y)+"</a></td>":'<td class="none">—</td>').join("")+"</tr>";
 }).join("");
 return '<section class="quick-index" id="index" aria-labelledby="index-h"><h2 id="index-h">快速索引</h2><p class="sub">點名稱跳到該組；點數字直接跳到該年份的第一筆。</p><div class="table-wrap"><table class="index-table"><thead>'+head+"</thead><tbody>"+body+"</tbody></table></div></section>";
}
function groupTable(g){
 const seen=new Set();
 return '<section class="group" id="'+groupId(g)+'"><div class="group-head"><h2>'+esc(g.name)+'</h2><a class="to-index" href="#index">回到索引 ↑</a></div>'+(g.sub?'<p class="sub">'+esc(g.sub)+"・"+g.rows.length+' 筆<span class="shown"></span></p>':'<p class="sub">'+g.rows.length+' 筆<span class="shown"></span></p>')+
  '<div class="table-wrap"><table class="rec-table"><thead><tr><th scope="col">年份</th><th scope="col">名稱</th><th scope="col">日期</th><th scope="col">核對程度</th></tr></thead><tbody>'+
  g.rows.map(r=>{const first=!seen.has(r.year);seen.add(r.year);return "<tr"+(first?' id="'+yearId(g,r.year)+'"':"")+' data-year="'+esc(r.year)+'" data-tags="'+esc(rowTags(r).join("|"))+'"><td class="year">'+esc(r.year)+'</td><td><a href="'+esc(r.url)+'">'+esc(r.title)+'</a><div class="type">'+esc(r.type)+(r.tags&&r.tags.length?'<span class="tags">'+r.tags.map(t=>'<span class="t">#'+esc(t)+"</span>").join(" ")+"</span>":"")+"</div>"+(r.tags2&&r.tags2.length?'<div class="tags2">'+r.tags2.map(t=>'<span class="t">#'+esc(t)+"</span>").join(" ")+"</div>":"")+(r.tags3&&r.tags3.length?'<div class="tags3">'+r.tags3.map(t=>'<span class="t">#'+esc(t)+"</span>").join(" ")+"</div>":"")+"</td><td>"+esc(r.date)+'</td><td><span class="badge '+r.status[0]+'">'+r.status[1]+"</span></td></tr>"}).join("")+
  "</tbody></table></div></section>";
}
const LISTS={
 policy:{title:"國別 × 年份政策年表",short:"國別政策年表",group:"國別／組織",note:"依國別或國際組織分組",desc:"政策年表"},
 journals:{title:"期刊 × 年份論文清單",short:"期刊論文清單",group:"期刊",note:"依期刊分組（專書章節另列一組）",desc:"期刊論文清單"},
 conferences:{title:"會議 × 年份論文清單",short:"會議論文清單",group:"會議",note:"依會議分組",desc:"會議論文清單"}};
function archiveTabs(active){
 return '<nav class="tabs" aria-label="清單類型">'+Object.entries(LISTS).map(([k,v])=>'<a href="../'+k+'/"'+(active===k?' aria-current="page"':"")+">"+v.short+"</a>").join("")+"</nav>";
}
const ARCHIVE_LEAD='<p class="lead">這是可追溯的<strong>書目索引</strong>，不是政策效力或研究結論的認證。每筆標示核對程度；首發日未核實時，以卷期年歸類並註明。週報審查中、尚未核對原頁的候選不列入。</p><p class="lead-note">「僅發現・未核」不代表書目有誤：Crossref、OpenAlex、Scopus、Web of Science 等索引資料庫屬二手登記，彼此一致也不升為「書目已核」；本刊不批次核對，只有論文或文件被週報、月報引用時，才逐篇讀出版者或官方原頁，並另做出版查核。</p><p class="lead-note"><strong>篇數與標記不是趨勢統計</strong>：收錄範圍隨監測來源與回推批次而變，不能用來判斷研究增減。研究趨勢以本刊年度論文趨勢報告為準（尚在人工驗證，完成前不對外引用）。</p>';
const SOURCE_NOTE='<div class="info"><p>資料來源：本刊知識庫（<a href="https://github.com/jhchenmooc/k12-ai-literacy-report/tree/main/research/knowledge-base">GitHub 公開</a>）。清單由程式自知識庫產生；發現錯誤請透過<a href="../../feedback/">讀者勘誤</a>回報。</p></div>';
/* Reader guide for the three tag lines: one row per line, colour-matched to the tags; caveats folded into a <details>. */
const TAG_NOTE='<div class="info tag-guide"><p class="tg-lead"><strong>題名下的「#」標記</strong>由 AI 依題名與摘要判讀，<strong>未經人工逐筆核對</strong>；判不出來的不標。可用下方「依標記篩選」勾選任意組合，或用瀏覽器頁內搜尋（Ctrl＋F，Mac 用 ⌘＋F）輸入例如「#國中」逐筆查找。</p>'+
 '<dl class="tg-rows">'+
 '<div class="tg-row tg1"><dt>第一行｜學段與身分</dt><dd><span>身分：<span class="t">#學生</span>　<span class="t">#在職教師</span>　<span class="t">#職前師培</span>　<span class="t">#家長行政</span></span><span>學段：<span class="t">#幼兒</span>　<span class="t">#國小</span>　<span class="t">#國中</span>　<span class="t">#高中職</span>　<span class="t">#中學未分</span>　<span class="t">#K12跨學段</span>　<span class="t">#K12未細分</span></span><span>回顧：<span class="t">#含K12回顧</span>（所回顧的研究有一部分屬中小學，但不是主要對象）</span></dd></div>'+
 '<div class="tg-row tg2"><dt>第二行｜主題、方法、國別</dt><dd><span>主題：<span class="t">#生成式AI</span>　<span class="t">#AI素養課程</span>　<span class="t">#評量與量表</span>　<span class="t">#教師專業發展</span>　<span class="t">#倫理與安全</span>　<span class="t">#教學介入</span>　<span class="t">#運算思維與程式</span>　<span class="t">#語言學習</span>　<span class="t">#STEM</span>　<span class="t">#特教與公平</span>　<span class="t">#政策與治理</span></span><span>方法：<span class="t">#文獻回顧</span>　<span class="t">#實驗或準實驗</span>　<span class="t">#混合方法</span>　<span class="t">#設計本位</span>　<span class="t">#質性個案</span>　<span class="t">#問卷量表</span></span><span>國別：例如 <span class="t">#美國</span>　<span class="t">#香港</span></span></dd></div>'+
 '<div class="tg-row tg3"><dt>第三行｜AI 素養範圍與框架面向</dt><dd><span>範圍：<span class="t">#AI素養核心</span>（研究師生的 AI 素養本身）　<span class="t">#AI工具應用</span>（用 AI 工具教或學其他科目）</span><span>面向：教育部《臺灣中小學教師與學生AI素養框架》8 個面向，例如 <span class="t">#學生AI倫理</span>　<span class="t">#教師AI賦能教學</span></span></dd></div>'+
 '</dl><details class="tg-limits"><summary>判讀限制（請先讀）</summary><ul>'+
 '<li>主題與方法用關鍵字規則判定，可能誤標：risk、writing、policy 等常見字，會讓倫理、語言、政策主題偏多。</li>'+
 '<li><span class="t">#教學介入</span> 只表示研究做了教學介入，不表示有成效。</li>'+
 '<li>國別只有部分論文有標，不能用來比較各國研究多寡。</li>'+
 '<li>框架面向是本刊依共用準則，把國際論文對照臺灣框架的判讀，<strong>不代表論文作者採用此框架</strong>；各輪判讀不一致者不標。</li>'+
 '<li>本刊年度趨勢分析另有操作細則，結果可能不同。</li>'+
 '<li><span class="t">#高引用</span>：OpenAlex 被引次數（2026-10-11 查詢）在同一年回推入庫的趨勢論文中排前 10%；只在同年內比較，不同年份的門檻不同，也不代表研究品質。</li></ul></details></div>';
/* Tag filter panel: hidden until assets/archive-filter.js runs, so pages without scripts look as before.
   Groups follow the three tag lines; only tags present on the page are offered, with their counts on this page. */
const rowTags=r=>[...(r.tags||[]),...(r.tags2||[]),...(r.tags3||[])];
function filterPanel(groups){
 const rows=groups.flatMap(g=>g.rows),n=new Map();
 for(const r of rows)for(const t of new Set(rowTags(r)))n.set(t,(n.get(t)||0)+1);
 const names=list=>list.map(([,t])=>t);
 const fixed=new Set([...names(POPULATION_TAGS),...names(TOPIC_TAGS),...names(METHOD_TAGS),...names(AILIT_TAGS),"高引用"]);
 const countries=[...n.keys()].filter(t=>!fixed.has(t)).sort((a,b)=>n.get(b)-n.get(a)||compareText(a,b));
 const sets=[["role","身分",names(POPULATION_TAGS.filter(([k])=>k.startsWith("ROLE_")||k==="TEACHER_ED"))],["stage","學段與回顧",names(POPULATION_TAGS.filter(([k])=>k.startsWith("STAGE_")||k==="REVIEW_INCLUDES_K12"))],
  ["topic","主題",names(TOPIC_TAGS)],["method","方法",names(METHOD_TAGS)],["class","AI 素養範圍",names(AILIT_TAGS.filter(([k])=>k.startsWith("AILIT_")))],["dim","框架面向",names(AILIT_TAGS.filter(([k])=>!k.startsWith("AILIT_")))],["cite","引用",["高引用"]],["country","國別",countries]];
 const box=(g,t)=>'<label><input type="checkbox" data-group="'+g+'" data-tag="'+esc(t)+'"> #'+esc(t)+' <span class="n">'+n.get(t)+"</span></label>";
 const fields=sets.map(([g,label,tags])=>{const have=tags.filter(t=>n.has(t));return have.length?'<fieldset class="tf-group"><legend>'+label+"</legend>"+have.map(t=>box(g,t)).join("")+"</fieldset>":""}).join("");
 return '<section class="tag-filter" id="tag-filter" aria-labelledby="tf-h" hidden><h2 id="tf-h">依標記篩選</h2>'+
  '<p class="sub">同一組勾多個時，符合任一個即顯示；不同組之間須同時符合。例如勾「#AI工具應用」與「#教師AI賦能教學」，即為教師以 AI 工具教學的研究。數字是本頁有該標記的筆數。篩選結果會寫進網址，可複製分享。</p>'+
  '<details class="tf-fields" open><summary>選擇標記<span class="tf-count"></span></summary>'+fields+'</details><div class="tf-bar"><label><input type="checkbox" id="tf-all"> 所勾標記全部都要符合</label><button type="button" id="tf-clear">清除篩選</button></div>'+
  '<p class="tf-status" id="tf-status" role="status"></p><p class="sub">標記由 AI 依題名與摘要判讀，未經人工逐筆核對；篩出的筆數只供查找，不能當研究趨勢的統計。</p></section>';
}
function renderArchiveList(kind,groups){
 const L=LISTS[kind],n=groups.reduce((s,g)=>s+g.rows.length,0);
 const head='<div class="kicker">歷年資料庫</div><h1>'+L.title+"</h1>"+ARCHIVE_LEAD+LEGEND+archiveTabs(kind);
 const main='<p class="sub">共 '+n+" 筆、"+groups.length+" 組，"+L.note+"，組內依年份由新到舊。</p>"+(kind==="policy"?"":TAG_NOTE+filterPanel(groups))+(groups.length?quickIndex(groups,L.group)+groups.map(groupTable).join(""):'<p class="empty">尚無紀錄。</p>')+SOURCE_NOTE;
 return shell({depth:2,current:"archive",title:L.short,description:"K-12 AI 素養歷年資料庫："+L.desc,head,main,script:kind!=="policy"});
}
/* The former combined research list now points to the two split pages so old links keep working. */
function renderResearchMoved(data){
 const n=counts(data);
 const head='<div class="kicker">歷年資料庫</div><h1>研究清單已分為期刊與會議兩頁</h1>'+ARCHIVE_LEAD;
 const main='<div class="grid-cards"><section class="panel"><div class="label">期刊</div><h2><a href="../journals/">期刊 × 年份論文清單</a></h2><p>'+journalText(n)+'。</p></section><section class="panel"><div class="label">會議</div><h2><a href="../conferences/">會議 × 年份論文清單</a></h2><p>'+n.conferences+" 筆會議論文。</p></section></div>";
 return shell({depth:2,current:"archive",title:"研究清單",description:"K-12 AI 素養歷年資料庫：研究清單已分為期刊與會議兩頁",head,main});
}
/* The journals list also holds book chapters and preprints; count them separately so preprints are not called journal articles. */
function counts(data){const c=g=>g.reduce((s,x)=>s+x.rows.length,0),books=c(data.journals.filter(g=>g.key==="8-book")),preprints=c(data.journals.filter(g=>g.key==="7-preprint"));return {policy:c(data.policy),journals:c(data.journals),articles:c(data.journals)-books-preprints,conferences:c(data.conferences),books,preprints}}
const journalText=n=>n.articles+" 筆期刊論文"+(n.books?"、"+n.books+" 筆專書章節":"")+(n.preprints?"、"+n.preprints+" 筆預印本":"");
function renderArchiveIndex(data){
 const n=counts(data);
 const head='<div class="kicker">歷年資料庫</div><h1>K–12 AI 素養：政策年表與研究清單</h1>'+ARCHIVE_LEAD+LEGEND;
 const panel=(k,label,text)=>'<section class="panel"><div class="label">'+label+'</div><h2><a href="'+k+'/">'+LISTS[k].title+"</a></h2><p>"+text+"</p></section>";
 const main='<div class="grid-cards">'+panel("policy","政策",n.policy+" 筆官方政策、框架與指引，依國別或國際組織分組。")+panel("journals","期刊",journalText(n)+"，依期刊分組。")+panel("conferences","會議",n.conferences+" 筆會議論文，依會議分組。")+"</div>";
 return shell({depth:1,current:"archive",title:"歷年資料庫",description:"K-12 AI 素養歷年資料庫",head,main});
}

/* ---------- about ---------- */
function renderAbout(){
 const head='<div class="kicker">查核方法</div><h1>每一種內容，查到什麼程度</h1><p class="lead">本刊以低人力、可追溯為原則：先篩日期、學段與重複，並依教育部《臺灣中小學教師與學生 AI 素養框架》判斷是否屬 AI 素養，再核原文；寧可少發，不為湊數放寬門檻。</p>';
 const main='<div class="grid-cards">'+
  '<section class="panel"><div class="label">每日短訊</div><h2>來源存在事實</h2><ul><li>只寫「誰在哪天發布了什麼」或來源原文的歸屬摘要</li><li>首次公開日須在 7 天內，附原文短摘錄與連結</li><li>AI 兩輪對照；未經逐則真人審稿</li><li>不含解讀、成效數字或對臺灣的建議</li></ul></section>'+
  '<section class="panel"><div class="label">週報與月報</div><h2>對回原文；精選讀全文</h2><ul><li>政策依 N1–N8、研究依 G1–G6 查核</li><li>週報精選至多 5 則讀全文，補上樣本、設計、作者所述發現與限制；其他短訊一行一則，連到每日短訊的原文歸屬摘要</li><li>AI 兩輪對照（第二輪由隔離子代理對照原文）；未經逐則真人審稿</li><li>高風險主張（成效、因果、跨學段推論）一律不自動發布</li><li>編輯歸納（AI 整理，未經真人審閱；週報導讀、臺灣對照說明、月報一句話、導讀與趨勢）與原始發現分開標示，每句附依據</li><li>背景補充只收首發早於本期的文件，標「背景」，非本週新訊</li><li>週報臺灣區（只收中央機關與臺灣研究）與國際分開；臺灣對照只並列事實，不作評價或建議；每日短訊分國際、臺灣兩段（2026-10-18 以前的頁面已於 10-17 補查臺灣來源）；每則短訊下方列出後來收入的週報與月報編號</li><li>月報（2026 年 10 月起）是當月的跨週整理：已刊於每日短訊或週報的項目只列在「一覽」、不重寫；政策與研究只收沒有刊在每日短訊或週報的項目，可收師培、大學、成人對象的研究（研究與學者新作合計，非中小學不超過三分之一，至少可收 2 則）；原文僅標示年月的文件註明日期依據；次月 3 日刊出。管理者回覆「合併」是發布核准，不代表逐則真人審稿</li></ul></section>'+
  '<section class="panel"><div class="label">歷年資料庫</div><h2>書目索引，不是認證</h2><ul><li><strong>僅發現・未核</strong>：只核過登記資料</li><li><strong>書目已核</strong>：題名、出處、日期對過原頁</li><li><strong>原文已核</strong>：內容逐段核對</li><li>首發日未核實時以卷期年歸類並註明</li><li>題名下的「#」標記由 AI 判讀，未經人工核對；篇數與標記不是趨勢統計</li><li>Crossref、OpenAlex、Scopus、Web of Science 等索引資料庫屬二手登記，不作為升為「書目已核」的依據</li><li>不批次核對；被週報、月報引用時才逐篇讀原頁</li></ul></section></div>'+
  '<section class="notice" style="margin-top:28px"><h2>我們不宣稱的事</h2><ul><li>同一個 AI 模型的多次查核彼此一致，不等於獨立真人審閱。</li><li>網站部署成功不等於內容已獲認證。</li><li>創刊特刊與 2026 年 9 月月報為早期版本，未經獨立認證，保留公開更正紀錄。</li><li>讀不到的官方或出版社網站，只能寫「搜尋未見」，不能寫「沒有發布」。</li></ul></section>'+
  '<section class="info" style="margin-top:20px"><h2>更正政策</h2><p>發現錯誤時記錄原說法、錯誤類型、原始來源與修訂內容，在網站明示更正，不默默覆蓋。歡迎透過 <a href="../feedback/">讀者評鑑與勘誤</a>（GitHub Issues）回報。</p></section>';
 return shell({depth:1,current:"about",title:"查核方法與證據等級",description:"K-12 AI 素養國際動態的查核方法、證據等級與更正政策",head,main});
}

/* ---------- homepage blocks ---------- */
/* Weekly card: the newest registered weekly; the next issue is the Friday after its Thursday end + 7 days. */
const slash=d=>d.replace(/-/g,"/"),mdDay=d=>+d.slice(5,7)+" 月 "+ +d.slice(8,10)+" 日";
const addDays=(d,n)=>new Date(Date.parse(d+"T00:00:00Z")+n*864e5).toISOString().slice(0,10);
function weeklyCard(editions){
 const latest=periodEditions("weekly",editions).sort((a,b)=>compareText(b.period,a.period))[0];
 const rule="每週五彙整前一週五至週四、完成首發與原文查核的 K-12 AI 素養動態。沒有達到查核門檻的項目時不發刊，不為湊數放寬標準。";
 if(!latest)return '<h3 style="font-size:24px;margin:8px 0 6px">尚無以新版流程發布的週報</h3><p style="margin:0 0 12px">'+rule+'</p><a class="button" href="./weekly/">所有週報</a>';
 const {start,end}=periodRange("weekly",latest.period),next=addDays(end,8);
 return '<h3 style="font-size:24px;margin:8px 0 6px">最新週報：'+slash(start)+"—"+slash(end).slice(5)+'</h3><p style="margin:0 0 12px">'+itemCount(latest)+" 則，已通過出版閘門。"+rule+"下一期預定 "+mdDay(next)+"（涵蓋 "+slash(addDays(end,1)).slice(5)+"—"+slash(addDays(end,7)).slice(5)+'）。</p><a class="button" href="./'+esc(latest.path.replace(/index\.html$/,""))+'">閱讀本期週報</a> <a class="button outline" href="./weekly/">所有週報</a>';
}
/* Monthly card: the newest registered monthly; the next one is scheduled on the 29th (month end in February)
   of the following month. With none registered, the next month follows the legacy September 2026 issue. */
function monthlyCard(editions){
 const latest=periodEditions("monthly",editions).sort((a,b)=>compareText(b.period,a.period))[0];
 const base=latest?latest.period:LEGACY_MONTHLY.map(x=>x.path.slice(8,15)).sort().pop();
 let [y,m]=base.split("-").map(Number);if(++m>12){m=1;y++}
 const nm=m===12?1:m+1,next=m+" 月月報預定 "+nm+" 月 3 日刊出，經管理者核准後發布。",about="當月的跨週整理，另收週報沒有收的研究與文件。";
 if(!latest)return '<h3 style="font-size:24px;margin:8px 0 6px">尚無以新版流程發布的月報</h3><p style="margin:0 0 12px">'+about+next+'</p><a class="button" href="./monthly/">所有月報</a>';
 const {year,month}=periodRange("monthly",latest.period);
 return '<h3 style="font-size:24px;margin:8px 0 6px">最新月報：'+year+" 年 "+month+' 月</h3><p style="margin:0 0 12px">'+itemCount(latest)+" 則，已通過出版閘門。"+about+next+'</p><a class="button" href="./'+esc(latest.path.replace(/index\.html$/,""))+'">閱讀本期月報</a> <a class="button outline" href="./monthly/">所有月報</a>';
}
const BLOCKS={"weekly-latest":(days,data,editions)=>weeklyCard(editions),"monthly-latest":(days,data,editions)=>monthlyCard(editions),"daily-latest":(days,data)=>{
  return days.length?'<ul class="item-list">'+dailyCard(days[0],0)+"</ul>":'<p class="empty">尚無已發布的每日短訊。沒有合格項目的日子不發刊。</p>';
 },"archive-stats":(days,data)=>{const n=counts(data),stat=(v,label)=>'<div class="stat"><strong>'+v+"</strong><span>"+label+"</span></div>";return '<div class="stats">'+stat(n.policy,"政策與框架")+stat(n.articles,"期刊論文")+(n.books?stat(n.books,"專書章節"):"")+(n.preprints?stat(n.preprints,"預印本"):"")+stat(n.conferences,"會議論文")+"</div>"}};
function fillHomepage(html,days,data,editions=[]){
 let out=html;
 for(const [name,fn] of Object.entries(BLOCKS)){
  const re=new RegExp("(<!-- generated:"+name+":start -->)[\\s\\S]*?(<!-- generated:"+name+":end -->)");
  if(!re.test(out))throw Error("homepage marker missing: "+name);
  out=out.replace(re,(_,a,b)=>a+fn(days,data,editions)+b);
 }
 return out.replace(/href="\.\/assets\/site\.css(\?v=[0-9a-f]*)?"/,'href="'+cssHref("./")+'"');
}

/* ---------- build ---------- */
function build(root){
 const {records,relations,venues,editions,hidden}=load(root);
 const days=dailyEditions(editions),data=archiveData(records,relations,venues,hidden);
 const files={
  "daily/index.html":renderDailyIndex(days),
  "weekly/index.html":renderPeriodIndex("weekly",editions),
  "monthly/index.html":renderPeriodIndex("monthly",editions),
  "archive/index.html":renderArchiveIndex(data),
  "archive/policy/index.html":renderArchiveList("policy",data.policy),
  "archive/journals/index.html":renderArchiveList("journals",data.journals),
  "archive/conferences/index.html":renderArchiveList("conferences",data.conferences),
  "archive/research/index.html":renderResearchMoved(data),
  "about/index.html":renderAbout()
 };
 const links=dailyBacklinks(editions);
 for(const d of days)files["daily/"+d.date+"/index.html"]=renderDailyEdition({...d,links});
 const weeklyPeriods=periodEditions("weekly",editions).map(e=>e.period);
 for(const kind of ["weekly","monthly"])for(const e of periodEditions(kind,editions))files[kind+"/"+e.period+"/index.html"]=renderPeriodEdition(kind,kind==="weekly"&&weeklySectioned(e.claims)?{...e,nav:weeklyNav(e.period,weeklyPeriods)}:kind==="monthly"&&monthlySectioned(e)?{...e,context:monthlyContext(e,editions)}:e);
 files["index.html"]=fillHomepage(fs.readFileSync(path.join(root,"index.html"),"utf8"),days,data,editions);
 return files;
}
function main(){
 const root=path.resolve(process.argv.find((a,i)=>i>1&&!a.startsWith("--"))||path.join(__dirname,".."));
 const files=build(root),write=process.argv.includes("--write"),stale=[];
 for(const [rel,text] of Object.entries(files)){
  const f=path.join(root,rel),cur=fs.existsSync(f)?fs.readFileSync(f,"utf8"):null;
  if(cur===text)continue;
  if(write){fs.mkdirSync(path.dirname(f),{recursive:true});fs.writeFileSync(f,text)}else stale.push(rel);
 }
 if(stale.length){console.error("outdated generated site pages (run node research/render-site.js --write):\n"+stale.join("\n"));process.exitCode=1;return}
 console.log(write?"site pages written":"site pages consistent",Object.keys(files).length);
}
if(require.main===module)try{main()}catch(e){console.error(e.message);process.exitCode=1}
module.exports={dailyBacklinks,dailyRevisionText,AI_ITEM_NOTE,ANALYSIS_LABEL,monthlySectioned,monthlyContext,monthlyWindow,monthlyNumbers,monthlyListing,monthlyNonK12Cap,MONTHLY_KEYS,MONTHLY_OVERVIEW_LINE_MAX,MONTHLY_OVERVIEW_MIN,MONTHLY_OVERVIEW_MAX,MONTHLY_BACKGROUND_MAX,MONTHLY_TW_NOTE_MAX,MONTHLY_TW_COMPARE_MAX,MONTHLY_ANALYSIS_NOTE,DAILY_REGION_FROM,dailyBackfillText,TW_FROM_PERIOD,TW_SECTIONS,WEEKLY_TW_NOTE_MAX,WEEKLY_TW_COMPARE_MAX,dailySectioned,WEEKLY_OVERVIEW_MAX,WEEKLY_BACKGROUND_MAX,weeklyNav,dailyKind,WEEKLY_SECTIONS,WEEKLY_FEATURED_MAX,weeklyRevisionText,weeklySectioned,build,archiveData,claimParagraph,renderDailyEdition,renderWeeklyEdition,renderMonthlyEdition,periodRange,MONTHLY_SECTIONS,MONTHLY_FIXED,fillHomepage,dailyTags,esc};
