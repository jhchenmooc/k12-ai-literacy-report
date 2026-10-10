"use strict";
/* Portable, local review checks. No API calls, publication or tracked-file writes. */
const fs=require("node:fs"),path=require("node:path"),os=require("node:os"),crypto=require("node:crypto"),cp=require("node:child_process");
const root=path.resolve(__dirname,"../../.."),manifest=JSON.parse(fs.readFileSync(path.join(__dirname,"evidence-manifest.json"),"utf8"));
const sha=bytes=>crypto.createHash("sha256").update(bytes).digest("hex");
const git=(...args)=>cp.execFileSync("git",args,{cwd:root,maxBuffer:20*1024*1024});
function regular(base,rel){
 const full=path.resolve(base,rel);if(!full.startsWith(base+path.sep))throw Error("Path outside review directory: "+rel);
 let current=base;for(const part of path.relative(base,full).split(path.sep)){current=path.join(current,part);if(fs.lstatSync(current).isSymbolicLink())throw Error("Review file must not be a symlink: "+rel)}
 if(!fs.statSync(full).isFile())throw Error("Expected regular review file: "+rel);return full;
}
let output;
try{
 if(Number(process.versions.node.split(".")[0])<22)throw Error("Use Node.js 22 or newer; the primary validation target is Node 22");
 for(const item of manifest.files)if(sha(fs.readFileSync(regular(__dirname,item.path)))!==item.sha256)throw Error("Archived evidence bytes changed: "+item.path);
 const preserved=JSON.parse(fs.readFileSync(path.join(__dirname,"fixes/source-preservation.json"),"utf8"));
 const integrationPath=path.join(__dirname,"integration/data-baseline.json");
 const integrated=new Map();let integrationUpstream=null;
 if(fs.existsSync(integrationPath)){
  const integration=JSON.parse(fs.readFileSync(integrationPath,"utf8"));
  if(!/^[a-f0-9]{40}$/.test(integration.upstreamCommit)||!Array.isArray(integration.acceptedFiles))throw Error("Invalid upstream integration baseline");
  integrationUpstream=integration.upstreamCommit;
  for(const item of integration.acceptedFiles){
   if(!preserved.some(p=>p.file===item.file)||integrated.has(item.file))throw Error("Unknown or duplicate integration file: "+item.file);
   const expected=sha(git("show",integrationUpstream+":"+item.file));
   if(expected!==item.sha256)throw Error("Integration hash does not match pinned upstream: "+item.file);
   integrated.set(item.file,expected);
  }
 }
 for(const item of preserved){
  const baseline=sha(git("show",manifest.baseline+":"+item.file)),current=sha(fs.readFileSync(regular(root,item.file)));
  if(baseline!==item.baseline||current!==(integrated.get(item.file)||baseline))throw Error("Original or accepted upstream data changed: "+item.file);
 }
 const commands=[
  ["--test",...fs.readdirSync(path.join(root,"research")).filter(n=>n.endsWith(".test.js")).sort().map(n=>"research/"+n)],
  ["research/benchmark-semantic.js","research/benchmarks/semantic-cases-2026-10.json"],
  ["research/validate-blind-pack.js","research/benchmarks/blind-review-candidates-60.json"],
  ["research/compare-source-facts.js","research/benchmarks/structured-source-fact-probes-2026-10-09.json"],
  ["research/validate-knowledge-base.js","."],["research/render-knowledge-base-years.js"],
  ["research/validate-publication.js","."],["research/render-site.js"]
 ];
 output=fs.mkdtempSync(path.join(os.tmpdir(),"k12-independent-review-"));
 const checks=[];
 for(const [index,args] of commands.entries()){
  const result=cp.spawnSync(process.execPath,args,{cwd:root,encoding:"utf8",maxBuffer:20*1024*1024});
  fs.writeFileSync(path.join(output,"command-"+index+".log"),(result.stdout||"")+(result.stderr||""));
  checks.push({args,exitCode:result.status});if(result.status!==0)throw Error("Validation failed; see "+path.join(output,"command-"+index+".log"));
 }
 const fixture=path.join(output,"artifact-fixture");fs.mkdirSync(fixture);
 const files=git("ls-files","-z").toString().split("\0").filter(Boolean);
 for(const file of files){const target=path.join(fixture,file);fs.mkdirSync(path.dirname(target),{recursive:true});fs.copyFileSync(regular(root,file),target)}
 const {buildPublic}=require(path.join(root,"research/public-site.js")),artifact=buildPublic(fixture);
 const parse5=require(path.join(root,"node_modules/parse5")),documents=new Map(),errors=[];
 const nodes=n=>[n,...(n.childNodes||[]).flatMap(nodes)];
 const document=file=>{if(!documents.has(file))documents.set(file,nodes(parse5.parse(fs.readFileSync(path.join(artifact.output,file),"utf8"))));return documents.get(file)};
 let references=0;
 for(const file of artifact.files){
  if(sha(fs.readFileSync(path.join(root,file)))!==sha(fs.readFileSync(path.join(artifact.output,file))))errors.push("Artifact bytes differ: "+file);
  if(!file.endsWith(".html"))continue;
  for(const node of document(file))for(const attr of node.attrs||[]){
   if(!["href","src"].includes(attr.name)||/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(attr.value))continue;
   references++;
   const url=new URL(attr.value,"https://review.invalid/"+file),rel=decodeURIComponent(url.pathname).replace(/^\//,"");
   const target=rel.endsWith("/")?rel+"index.html":rel||"index.html";
   if(!artifact.files.includes(target)){errors.push(file+": missing local target "+attr.value);continue}
   if(url.hash&&target.endsWith(".html")){
    const id=decodeURIComponent(url.hash.slice(1));
    if(id&&!document(target).some(n=>(n.attrs||[]).some(a=>a.name==="id"&&a.value===id)||n.tagName==="a"&&(n.attrs||[]).some(a=>a.name==="name"&&a.value===id)))errors.push(file+": missing fragment "+attr.value);
   }
  }
 }
 if(errors.length)throw Error(errors.join("\n"));
 const report={reviewedHead:git("rev-parse","HEAD").toString().trim(),baseline:manifest.baseline,fixCommit:manifest.fixCommit,node:process.version,platform:process.platform,evidenceFiles:manifest.files.length,preservedSourceFiles:preserved.length,originalUnchangedSourceFiles:preserved.length-integrated.size,acceptedUpstreamSourceFiles:integrated.size,integrationUpstream,checks,artifactFiles:artifact.files.length,localReferences:references,output};
 fs.writeFileSync(path.join(output,"verification.json"),JSON.stringify(report,null,2)+"\n");console.log(JSON.stringify(report,null,2));
}catch(e){console.error(e.message);if(output)console.error("Review output: "+output);process.exitCode=1}
