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
const RESEARCH_TYPES={journal_article:"期刊論文",conference_paper:"會議論文"};
const INTERNATIONAL={"O-UNESCO":"UNESCO","O-OECD":"OECD","O-EU-EC":"歐盟執委會","O-COE":"歐洲理事會","O-UNICEF":"UNICEF"};
const COUNTRY={AU:"澳洲",JP:"日本",KR:"韓國","GB-ENG":"英格蘭",GB:"英國",US:"美國",SG:"新加坡",CN:"中國",HK:"香港",TW:"臺灣",CA:"加拿大",NZ:"紐西蘭",DE:"德國",FR:"法國",FI:"芬蘭",EE:"愛沙尼亞",IN:"印度",AE:"阿聯",MX:"墨西哥"};
const ORG_COUNTRY={"O-AU-EDU":"AU","O-JP-MEXT":"JP","O-KR-MOE":"KR","O-UK-DFE":"GB-ENG","O-US-ED":"US","O-SG-MOE":"SG","O-CN-MOE":"CN","O-HK-EDB":"HK","O-TW-MOE":"TW","O-NZ-MOE":"NZ"};
const STATUS={discovered_unverified:["unverified","僅發現・未核"],bibliographic_checked:["checked","書目已核"],content_checked:["fulltext","原文已核"]};
const DAILY_KIND={official_notice:["policy","官方文件"],official_attributed_summary:["policy","官方文件摘要"],research_bibliography:["research","研究書目"],research_abstract_attributed_summary:["research","研究摘要"]};

/* Quick-index year columns always run from the newest year back to at least this year, so later backfill keeps the layout stable. */
const INDEX_FIRST_YEAR=2023;
/* Cache-busting query from the stylesheet content, so readers do not keep an outdated layout after an update. */
const CSS_VERSION=crypto.createHash("sha256").update(fs.readFileSync(path.join(__dirname,"..","assets","site.css"))).digest("hex").slice(0,10);
const cssHref=p=>p+"assets/site.css?v="+CSS_VERSION;

const esc=s=>String(s??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
const up=depth=>depth?"../".repeat(depth):"./";

function shell({depth,current,title,description,head,main}){
 const p=up(depth);
 const nav=[["daily/","每日短訊","daily"],["weekly/","週報","weekly"],["monthly/","月報","monthly"],["archive/","歷年資料庫","archive"],["about/","查核方法","about"]];
 const links=nav.map(([href,label,key])=>'<a href="'+p+href+'"'+(current===key?' aria-current="page"':"")+">"+label+"</a>").join("");
 return '<!doctype html>\n<html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">'+
  '<meta name="description" content="'+esc(description)+'"><title>'+esc(title)+"｜K-12 AI 素養國際動態</title>"+
  '<link rel="stylesheet" href="'+p+'assets/design-system.css"><link rel="stylesheet" href="'+cssHref(p)+'"></head>\n<body>'+
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
 return {records:read("records"),relations:read("relations"),venues,editions};
}

/* ---------- daily ---------- */
function dailyEditions(editions){
 return editions.filter(e=>/^daily\/\d{4}-\d{2}-\d{2}\/index\.html$/.test(e.path)).map(e=>({...e,date:e.path.slice(6,16)})).sort((a,b)=>b.date.localeCompare(a.date));
}
/* The claim text is rendered verbatim; only the source title inside it becomes the link, so the
   gate's text match (claim_text) and direct-anchor rule (source_url) both hold. */
function claimParagraph(c,withId){
 const text=esc(c.claim_text),title=esc(c.source_title),link='<a href="'+esc(c.source_url)+'">'+title+"</a>";
 const body=title&&text.includes(title)?text.replace(title,link):'<a href="'+esc(c.source_url)+'">'+text+"</a>";
 return "<p"+(withId?' data-claim-id="'+esc(c.claim_id)+'"':"")+">"+body+"</p>";
}
function kindBadge(c){const [cls,label]=DAILY_KIND[c.daily_fact_kind]||["policy","短訊"];return '<span class="kind '+cls+'">'+label+"</span>"}
function dailyItem(c,depth,date){
 return '<li class="item">'+kindBadge(c)+claimParagraph(c,false)+'<div class="meta-line"><span>首次公開：'+esc(c.first_disclosed_on||"未知")+"</span><span>來源：" +esc(c.source_organization||"")+'</span><a href="'+up(depth)+"daily/"+date+'/">當日短訊頁</a></div></li>';
}
function renderDailyEdition(e){
 const head='<div class="kicker">每日短訊</div><h1>'+e.date+' 每日短訊</h1><div class="notice"><p>只記錄「誰在哪天發布了什麼」或來源原文的歸屬摘要；由 AI 整理、未經逐則真人審稿，不含解讀、成效判斷或對臺灣的建議。請點連結閱讀原文。</p></div>';
 const main="<article>"+e.claims.map(c=>claimParagraph(c,true)).join("")+"</article>";
 return shell({depth:2,current:"daily",title:e.date+" 每日短訊",description:"K-12 AI 素養每日短訊："+e.date,head,main});
}
function renderDailyIndex(days){
 const head='<div class="kicker">每日短訊</div><h1>每天 09:00，記錄新發布的原始文件</h1><div class="notice"><p><strong>每日短訊只說「誰在哪天發布了什麼」。</strong>由 AI 整理、未經逐則真人審稿；不含政策解讀、研究成效或對臺灣的建議。每則附原文連結，首次公開日須在 7 天內。需要判讀的內容，請看週報與月報。</p></div>';
 const main=days.length?days.map(d=>'<section><h2>'+d.date+'<span class="sub"> '+d.claims.length+' 則</span></h2><ul class="item-list">'+d.claims.map(c=>dailyItem(c,1,d.date)).join("")+"</ul></section>").join(""):
  '<p class="empty">尚無已發布的每日短訊。只有首次公開在 7 天內、可取得原文且屬低風險的來源才會發布；沒有合格項目的日子不發刊，查核紀錄公開於 GitHub。</p>';
 return shell({depth:1,current:"daily",title:"每日短訊",description:"K-12 AI 素養每日短訊列表",head,main});
}

/* ---------- weekly / monthly ---------- */
function renderPeriodIndex(kind,editions){
 const isWeekly=kind==="weekly",label=isWeekly?"週報":"月報",legacy=isWeekly?LEGACY_WEEKLY:LEGACY_MONTHLY;
 const registered=editions.filter(e=>e.path.startsWith(kind+"/")).map(e=>({path:e.path.replace(/index\.html$/,""),title:e.title||label+"："+e.path.split("/")[1],note:e.claims.length+" 則，已通過出版閘門"})).sort((a,b)=>b.path.localeCompare(a.path));
 const rows=[...registered,...legacy].map(x=>'<li class="item"><p><a href="'+esc(x.path.slice(kind.length+1))+'">'+esc(x.title)+'</a></p><div class="meta-line"><span>'+esc(x.note)+"</span></div></li>").join("");
 const head='<div class="kicker">'+label+"</div><h1>"+(isWeekly?"每週精選：完成查核的政策與研究":"每月趨勢：跨週整合")+'</h1><p class="lead">'+(isWeekly?"每則逐句對回原文並標示證據等級；沒有達到查核門檻的週次不發刊，不為湊數放寬標準。":"整合當月週報與重要背景，區分原始發現與本刊分析。")+"</p>";
 const main=(registered.length?"":'<p class="empty">尚無以新版流程登錄的'+label+"；以下為早期版本。</p>")+'<ul class="item-list">'+rows+"</ul>";
 return shell({depth:1,current:kind,title:label,description:"K-12 AI 素養"+label+"列表",head,main});
}

/* ---------- archive ---------- */
function archiveData(records,relations,venues){
 const rel=new Map();for(const r of relations){if(!rel.has(r.subject_id))rel.set(r.subject_id,[]);rel.get(r.subject_id).push(r)}
 const venueName=new Map(venues.map(v=>[v.id,v.name]));
 const kept=records.filter(r=>!r.source_candidate_id);
 const row=r=>{
  const basis=r.year_basis;
  const date=basis==="first_publication"?r.first_published_on+" 首發":basis==="issue_year"?"卷期年（首發日未知）":basis==="event_year"?"會議年（首發日未知）":"未知";
  return {id:r.record_id,year:r.year_value||"未知",title:r.title,url:r.primary_url,date,type:POLICY_TYPES[r.record_type]||RESEARCH_TYPES[r.record_type]||r.record_type,status:STATUS[r.verification_status]||STATUS.discovered_unverified};
 };
 const policy=new Map(),journals=new Map(),conferences=new Map();
 const add=(m,key,name,sub,r)=>{if(!m.has(key))m.set(key,{key,name,sub,rows:[]});m.get(key).rows.push(row(r))};
 for(const r of kept){
  const rs=rel.get(r.record_id)||[];
  if(POLICY_TYPES[r.record_type]){
   const country=(rs.find(x=>x.predicate==="applies_to_country")||{}).object_id;
   const org=(rs.find(x=>x.predicate==="issued_by")||{}).object_id;
   if(INTERNATIONAL[org])add(policy,"0-INTL","國際組織","UNESCO、OECD、歐盟等跨國機構",r);
   else{const c=country||ORG_COUNTRY[org];if(c)add(policy,"1-"+c,COUNTRY[c]||c,org?org:"",r);else add(policy,"9-other","其他／未標國別","",r)}
  }else if(RESEARCH_TYPES[r.record_type]){
   const src=(rs.find(x=>x.predicate==="published_in")||{}).object_id;
   const m=r.record_type==="conference_paper"?conferences:journals,label=m===conferences?"會議":"期刊";
   if(src)add(m,"1-"+src,venueName.get(src)||src,label+" "+src,r);
   else add(m,"9-other","其他"+label,"尚未對應到監測來源",r);
  }
 }
 const sortRows=g=>{g.rows.sort((a,b)=>yearOrder(a.year,b.year)||a.title.localeCompare(b.title));return g};
 const sortGroups=m=>[...m.values()].map(sortRows).sort((a,b)=>a.key.localeCompare(b.key,"en",{numeric:true}));
 return {policy:sortGroups(policy),journals:sortGroups(journals),conferences:sortGroups(conferences)};
}
/* Newest year first; "未知" last. */
function yearOrder(a,b){if(a===b)return 0;if(a==="未知")return 1;if(b==="未知")return -1;return b.localeCompare(a)}
const slug=s=>String(s).replace(/[^A-Za-z0-9]+/g,"-").replace(/^-|-$/g,"").toLowerCase()||"x";
const groupId=g=>"g-"+slug(g.key);
const yearId=(g,y)=>groupId(g)+"-y"+(y==="未知"?"unknown":y);
const LEGEND='<div class="legend"><span><span class="badge checked">書目已核</span> 題名、出處、日期已對過出版者或官方原頁</span><span><span class="badge unverified">僅發現・未核</span> 只核過登記資料，原頁或首發日未核</span><span><span class="badge fulltext">原文已核</span> 內容逐段核對</span></div>';
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
  return '<tr><th scope="row" class="name"><a href="#'+groupId(g)+'" title="'+esc(g.name)+'">'+indexName(g.name)+"</a></th><td>"+g.rows.length+"</td>"+years.map(y=>by.has(y)?'<td><a href="#'+yearId(g,y)+'" aria-label="'+esc(g.name)+" "+esc(y)+" 年 "+by.get(y)+' 筆">'+by.get(y)+"</a></td>":'<td class="none">—</td>').join("")+"</tr>";
 }).join("");
 return '<section class="quick-index" id="index" aria-labelledby="index-h"><h2 id="index-h">快速索引</h2><p class="sub">點名稱跳到該組；點數字直接跳到該年份的第一筆。</p><div class="table-wrap"><table class="index-table"><thead>'+head+"</thead><tbody>"+body+"</tbody></table></div></section>";
}
function groupTable(g){
 const seen=new Set();
 return '<section class="group" id="'+groupId(g)+'"><div class="group-head"><h2>'+esc(g.name)+'</h2><a class="to-index" href="#index">回到索引 ↑</a></div>'+(g.sub?'<p class="sub">'+esc(g.sub)+"・"+g.rows.length+" 筆</p>":'<p class="sub">'+g.rows.length+" 筆</p>")+
  '<div class="table-wrap"><table class="rec-table"><thead><tr><th scope="col">年份</th><th scope="col">名稱</th><th scope="col">日期</th><th scope="col">核對程度</th></tr></thead><tbody>'+
  g.rows.map(r=>{const first=!seen.has(r.year);seen.add(r.year);return "<tr"+(first?' id="'+yearId(g,r.year)+'"':"")+'><td class="year">'+esc(r.year)+'</td><td><a href="'+esc(r.url)+'">'+esc(r.title)+'</a><div class="type">'+esc(r.type)+"</div></td><td>"+esc(r.date)+'</td><td><span class="badge '+r.status[0]+'">'+r.status[1]+"</span></td></tr>"}).join("")+
  "</tbody></table></div></section>";
}
const LISTS={
 policy:{title:"國別 × 年份政策年表",short:"國別政策年表",group:"國別／組織",note:"依國別或國際組織分組",desc:"政策年表"},
 journals:{title:"期刊 × 年份論文清單",short:"期刊論文清單",group:"期刊",note:"依期刊分組",desc:"期刊論文清單"},
 conferences:{title:"會議 × 年份論文清單",short:"會議論文清單",group:"會議",note:"依會議分組",desc:"會議論文清單"}};
function archiveTabs(active){
 return '<nav class="tabs" aria-label="清單類型">'+Object.entries(LISTS).map(([k,v])=>'<a href="../'+k+'/"'+(active===k?' aria-current="page"':"")+">"+v.short+"</a>").join("")+"</nav>";
}
const ARCHIVE_LEAD='<p class="lead">這是可追溯的<strong>書目索引</strong>，不是政策效力或研究結論的認證。每筆標示核對程度；首發日未核實時，以卷期年歸類並註明。週報審查中的候選不列入。</p>';
const SOURCE_NOTE='<div class="info"><p>資料來源：本刊知識庫（<a href="https://github.com/jhchenmooc/k12-ai-literacy-report/tree/main/research/knowledge-base">GitHub 公開</a>）。清單由程式自知識庫產生；發現錯誤請透過<a href="../../feedback/">讀者勘誤</a>回報。</p></div>';
function renderArchiveList(kind,groups){
 const L=LISTS[kind],n=groups.reduce((s,g)=>s+g.rows.length,0);
 const head='<div class="kicker">歷年資料庫</div><h1>'+L.title+"</h1>"+ARCHIVE_LEAD+LEGEND+archiveTabs(kind);
 const main='<p class="sub">共 '+n+" 筆、"+groups.length+" 組，"+L.note+"，組內依年份由新到舊。</p>"+(groups.length?quickIndex(groups,L.group)+groups.map(groupTable).join(""):'<p class="empty">尚無紀錄。</p>')+SOURCE_NOTE;
 return shell({depth:2,current:"archive",title:L.short,description:"K-12 AI 素養歷年資料庫："+L.desc,head,main});
}
/* The former combined research list now points to the two split pages so old links keep working. */
function renderResearchMoved(data){
 const n=counts(data);
 const head='<div class="kicker">歷年資料庫</div><h1>研究清單已分為期刊與會議兩頁</h1>'+ARCHIVE_LEAD;
 const main='<div class="grid-cards"><section class="panel"><div class="label">期刊</div><h2><a href="../journals/">期刊 × 年份論文清單</a></h2><p>'+n.journals+' 筆期刊論文。</p></section><section class="panel"><div class="label">會議</div><h2><a href="../conferences/">會議 × 年份論文清單</a></h2><p>'+n.conferences+" 筆會議論文。</p></section></div>";
 return shell({depth:2,current:"archive",title:"研究清單",description:"K-12 AI 素養歷年資料庫：研究清單已分為期刊與會議兩頁",head,main});
}
function counts(data){const c=g=>g.reduce((s,x)=>s+x.rows.length,0);return {policy:c(data.policy),journals:c(data.journals),conferences:c(data.conferences)}}
function renderArchiveIndex(data){
 const n=counts(data);
 const head='<div class="kicker">歷年資料庫</div><h1>K–12 AI 素養：政策年表與研究清單</h1>'+ARCHIVE_LEAD+LEGEND;
 const panel=(k,label,text)=>'<section class="panel"><div class="label">'+label+'</div><h2><a href="'+k+'/">'+LISTS[k].title+"</a></h2><p>"+text+"</p></section>";
 const main='<div class="grid-cards">'+panel("policy","政策",n.policy+" 筆官方政策、框架與指引，依國別或國際組織分組。")+panel("journals","期刊",n.journals+" 筆期刊論文，依期刊分組。")+panel("conferences","會議",n.conferences+" 筆會議論文，依會議分組。")+"</div>";
 return shell({depth:1,current:"archive",title:"歷年資料庫",description:"K-12 AI 素養歷年資料庫",head,main});
}

/* ---------- about ---------- */
function renderAbout(){
 const head='<div class="kicker">查核方法</div><h1>每一種內容，查到什麼程度</h1><p class="lead">本刊以低人力、可追溯為原則：先篩日期、學段與重複，再核原文；寧可少發，不為湊數放寬門檻。</p>';
 const main='<div class="grid-cards">'+
  '<section class="panel"><div class="label">每日短訊</div><h2>來源存在事實</h2><ul><li>只寫「誰在哪天發布了什麼」或來源原文的歸屬摘要</li><li>首次公開日須在 7 天內，附原文短摘錄與連結</li><li>AI 兩輪對照；未經逐則真人審稿</li><li>不含解讀、成效數字或對臺灣的建議</li></ul></section>'+
  '<section class="panel"><div class="label">週報與月報</div><h2>逐句對回原文</h2><ul><li>政策依 N1–N8、研究依 G1–G6 查核</li><li>首次公開日、學段、樣本與限制逐項核對</li><li>高風險主張（成效、因果、跨學段推論）一律不自動發布</li><li>本刊分析與原始發現分開標示</li></ul></section>'+
  '<section class="panel"><div class="label">歷年資料庫</div><h2>書目索引，不是認證</h2><ul><li><strong>僅發現・未核</strong>：只核過登記資料</li><li><strong>書目已核</strong>：題名、出處、日期對過原頁</li><li><strong>原文已核</strong>：內容逐段核對</li><li>首發日未核實時以卷期年歸類並註明</li></ul></section></div>'+
  '<section class="notice" style="margin-top:28px"><h2>我們不宣稱的事</h2><ul><li>同一個 AI 模型的多次查核彼此一致，不等於獨立真人審閱。</li><li>網站部署成功不等於內容已獲認證。</li><li>創刊特刊與 2026 年 9 月月報為早期版本，未經獨立認證，保留公開更正紀錄。</li><li>讀不到的官方或出版社網站，只能寫「搜尋未見」，不能寫「沒有發布」。</li></ul></section>'+
  '<section class="info" style="margin-top:20px"><h2>更正政策</h2><p>發現錯誤時記錄原說法、錯誤類型、原始來源與修訂內容，在網站明示更正，不默默覆蓋。歡迎透過 <a href="../feedback/">讀者評鑑與勘誤</a>（GitHub Issues）回報。</p></section>';
 return shell({depth:1,current:"about",title:"查核方法與證據等級",description:"K-12 AI 素養國際動態的查核方法、證據等級與更正政策",head,main});
}

/* ---------- homepage blocks ---------- */
const BLOCKS={"daily-latest":(days,data)=>{
  const items=days.flatMap(d=>d.claims.map(c=>({c,date:d.date}))).slice(0,3);
  return items.length?'<ul class="item-list">'+items.map(x=>dailyItem(x.c,0,x.date)).join("")+"</ul>":'<p class="empty">尚無已發布的每日短訊。沒有合格項目的日子不發刊。</p>';
 },"archive-stats":(days,data)=>{const n=counts(data);return '<div class="stats"><div class="stat"><strong>'+n.policy+"</strong><span>政策與框架</span></div>"+'<div class="stat"><strong>'+n.journals+"</strong><span>期刊論文</span></div>"+'<div class="stat"><strong>'+n.conferences+"</strong><span>會議論文</span></div></div>"}};
function fillHomepage(html,days,data){
 let out=html;
 for(const [name,fn] of Object.entries(BLOCKS)){
  const re=new RegExp("(<!-- generated:"+name+":start -->)[\\s\\S]*?(<!-- generated:"+name+":end -->)");
  if(!re.test(out))throw Error("homepage marker missing: "+name);
  out=out.replace(re,(_,a,b)=>a+fn(days,data)+b);
 }
 return out.replace(/href="\.\/assets\/site\.css(\?v=[0-9a-f]*)?"/,'href="'+cssHref("./")+'"');
}

/* ---------- build ---------- */
function build(root){
 const {records,relations,venues,editions}=load(root);
 const days=dailyEditions(editions),data=archiveData(records,relations,venues);
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
 for(const d of days)files["daily/"+d.date+"/index.html"]=renderDailyEdition(d);
 files["index.html"]=fillHomepage(fs.readFileSync(path.join(root,"index.html"),"utf8"),days,data);
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
module.exports={build,archiveData,claimParagraph,renderDailyEdition,fillHomepage,esc};
