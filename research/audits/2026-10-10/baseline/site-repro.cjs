"use strict";
// Offline, read-only probes. No real API calls; no repository files are written.
const fs=require("node:fs"),path=require("node:path"),vm=require("node:vm");
const root=path.resolve(__dirname,"../audit-repo-20261010");
const {validateCard}=require(path.join(root,"research/compare-source-facts.js"));
const {auditCoverage}=require(path.join(root,"research/audit-chinese-claim-coverage.js"));
const result={repo:root,diagnostic_inputs:[],local_links:null,pagination:null};
for(const [name,fn] of [
 ["facts_object",()=>validateCard({card_id:"C",source_url:"https://example.org",evidence_level:"saved_primary_excerpt",facts:{}})],
 ["null_assertion",()=>auditCoverage({claim:"招募 194 人",assertions:[null]})],
 ["null_number_annotation",()=>auditCoverage({claim:"194 人",number_annotations:[null]})]
]){try{result.diagnostic_inputs.push({name,result:fn(),threw:false});}catch(e){result.diagnostic_inputs.push({name,threw:true,error:e.name,message:e.message});}}

const pages=[];
function walk(rel){const abs=path.join(root,rel);if(fs.statSync(abs).isDirectory()){for(const f of fs.readdirSync(abs))walk(path.join(rel,f));}else if(rel.endsWith(".html"))pages.push(rel);}
for(const rel of ["index.html","daily","weekly","monthly","archive","about","feedback","design-system"])walk(rel);
let checked=0;const bad=[];
for(const rel of pages){const text=fs.readFileSync(path.join(root,rel),"utf8");for(const m of text.matchAll(/(?:href|src)=["']([^"']+)["']/g)){
 const href=m[1].replace(/&amp;/g,"&");if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(href))continue;
 const [p,hash]=href.split("#"),clean=p.split("?")[0];let target=clean?path.resolve(root,path.dirname(rel),decodeURIComponent(clean)):path.join(root,rel);
 if(fs.existsSync(target)&&fs.statSync(target).isDirectory())target=path.join(target,"index.html");checked++;
 if(!fs.existsSync(target)){bad.push({page:rel,href,reason:"missing target"});continue;}
 if(hash&&target.endsWith(".html")){const id=decodeURIComponent(hash),dest=fs.readFileSync(target,"utf8");if(!dest.includes('id="'+id+'"')&&!dest.includes("id='"+id+"'")&&!dest.includes('name="'+id+'"'))bad.push({page:rel,href,reason:"missing fragment"});}
}}
result.local_links={html_pages:pages.length,checked,bad,limitation:"Static href/src and fragment existence only; no browser or external link requests."};

async function pagination(){
 const source=fs.readFileSync(path.join(root,"research/summarize-reader-feedback.js"),"utf8");
 const moduleObj={exports:{}};const mockRequire=Object.assign(x=>require(x),{main:moduleObj});
 let gets=0;const posts=[],messages=[];
 const DateFixed=class extends Date{constructor(...args){super(...(args.length?args:["2026-10-10T12:00:00Z"]));}};
 const fixture=number=>({number,title:"[讀者回饋] fixture",body:"",created_at:"2026-10-07T01:00:00Z",html_url:"https://github.com/a/b/issues/"+number,state:"open"});
 const sandbox={require:mockRequire,module:moduleObj,Date:DateFixed,console:{log:x=>messages.push(String(x)),error:x=>messages.push(String(x))},process:{env:{GITHUB_TOKEN:"fake-offline",GITHUB_REPOSITORY:"a/b"},exitCode:0},fetch:async(url,opt)=>{
  if(opt.method==="POST"){posts.push(JSON.parse(opt.body));return {ok:true,json:async()=>({html_url:"offline://mock"})};}
  gets++;const page=Number(new URL(url).searchParams.get("page"));const data=page<=10?Array.from({length:100},(_,i)=>fixture((page-1)*100+i+1)):page===11?[fixture(1001)]:[];
  return {ok:true,json:async()=>data};
 }};
 // Await the script's async run instead of waiting an arbitrary amount of time.
 vm.runInNewContext(source.replace('if(require.main===module)run().catch(e=>{console.error(e);process.exitCode=1});','if(require.main===module)globalThis.probeRun=run().catch(e=>{console.error(e);process.exitCode=1});'),sandbox);
 await sandbox.probeRun;
 return {mock_available_feedback:1001,get_requests:gets,post_requests:posts.length,reported_count:Number(posts[0]?.body.match(/新增讀者回饋：(\d+)/)?.[1]),messages,exitCode:sandbox.process.exitCode,external_requests:0};
}
pagination().then(p=>{result.pagination=p;console.log(JSON.stringify(result,null,2));}).catch(e=>{console.error(e);process.exitCode=1;});
