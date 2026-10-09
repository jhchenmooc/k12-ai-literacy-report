"use strict";
/* The publication gate and artifact builder share this exact public-file policy.
 * New utility pages/resources must be explicitly reviewed and added here. */
const fs=require("node:fs"),path=require("node:path");
const LEGACY=new Set(["weekly/2026-09-29_10-08/index.html","monthly/2026-09/index.html"]);
const STATIC_HTML=new Set(["index.html","daily/index.html","weekly/index.html","monthly/index.html","about/index.html","archive/index.html","archive/policy/index.html","archive/journals/index.html","archive/conferences/index.html","archive/research/index.html","feedback/index.html","feedback/no-login/index.html","feedback/privacy/index.html","design-system/index.html"]);
const RESOURCES=new Set([".nojekyll","assets/site.css","assets/design-system.css","assets/favicon.svg","feedback/no-login-config.js","publication/issues.json"]);
const PUBLIC_DIRS=["daily","weekly","monthly","about","archive","feedback","design-system","assets"];
function safeFile(root,rel){
 const base=path.resolve(root),full=path.resolve(base,rel);
 if(!full.startsWith(base+path.sep))throw Error("public path outside repository: "+rel);
 let current=base;
 for(const part of path.relative(base,full).split(path.sep)){
  current=path.join(current,part);const stat=fs.lstatSync(current);
  if(stat.isSymbolicLink())throw Error("symbolic link forbidden in public path: "+rel);
 }
 if(!fs.statSync(full).isFile())throw Error("public path must be a regular file: "+rel);
 return full;
}
function inventory(root,manifest){
 const errors=[],files=[];
 if(!manifest){
  try{manifest=JSON.parse(fs.readFileSync(safeFile(root,"publication/issues.json"),"utf8"));}
  catch(e){return {ok:false,errors:[e.message],files,editions:[]}}
 }
 if(!manifest||typeof manifest!=="object"||Array.isArray(manifest)||!Array.isArray(manifest.editions))return {ok:false,errors:["Invalid issues manifest: editions array required"],files,editions:[]};
 const declared=new Set(LEGACY);
 for(const issue of Array.isArray(manifest.editions)?manifest.editions:[]){if(issue&&typeof issue.path==="string"&&/^(weekly|monthly|daily)\/[a-zA-Z0-9_-]+\/index\.html$/.test(issue.path))declared.add(issue.path)}
 const allowed=new Set([...STATIC_HTML,...RESOURCES,...declared]);
 function inspect(rel){
  const full=path.join(root,rel);let stat;try{stat=fs.lstatSync(full)}catch(e){errors.push(rel+": "+e.message);return}
  if(stat.isSymbolicLink()){errors.push("symbolic link forbidden in public path: "+rel);return}
  if(stat.isDirectory()){for(const name of fs.readdirSync(full))inspect(rel+"/"+name);return}
  if(!stat.isFile()){errors.push("non-regular public file: "+rel);return}
  if(!allowed.has(rel)){errors.push("Unknown public file (blocked): "+rel);return}
  try{safeFile(root,rel);files.push(rel)}catch(e){errors.push(e.message)}
 }
 for(const rel of ["index.html",".nojekyll","publication/issues.json"]){if(fs.existsSync(path.join(root,rel)))inspect(rel)}
 for(const rel of PUBLIC_DIRS){if(fs.existsSync(path.join(root,rel)))inspect(rel)}
 return {ok:errors.length===0,errors,files:files.sort(),editions:files.filter(f=>declared.has(f)).sort()};
}
function buildPublic(root){
 root=path.resolve(root);const listed=inventory(root);
 if(!listed.ok)throw Error(listed.errors.join("\n"));
 const validated=require("./validate-publication.js").validate(root);
 if(!validated.ok)throw Error("Publication validation failed:\n"+validated.errors.join("\n"));
 for(const rel of ["index.html",".nojekyll","archive/index.html","about/index.html"]){if(!listed.files.includes(rel))throw Error("required public file missing: "+rel)}
 // No recursive deletion or copying: refuse stale output and copy only inventory files.
 const output=path.join(root,"_public_site");
 if(fs.existsSync(output)){
  const stat=fs.lstatSync(output);if(stat.isSymbolicLink()||!stat.isDirectory()||fs.readdirSync(output).length)throw Error("public output must be a new or empty regular directory");
 }else fs.mkdirSync(output);
 for(const rel of listed.files){
  const source=safeFile(root,rel),dest=path.join(output,...rel.split("/"));
  fs.mkdirSync(path.dirname(dest),{recursive:true});fs.copyFileSync(source,dest,fs.constants.COPYFILE_EXCL);
 }
 return {output,files:listed.files};
}
// Publish the shared policy before CLI execution can load the validation gate.
module.exports={LEGACY,STATIC_HTML,RESOURCES,inventory,buildPublic,safeFile};
if(require.main===module)try{
 const args=process.argv.slice(2),root=path.resolve(args.find(a=>!a.startsWith("--"))||".");
 const result=args.includes("--build")?buildPublic(root):inventory(root);
 console.log(JSON.stringify(result,null,2));if(result.ok===false)process.exitCode=1;
}catch(e){console.error(e.message);process.exitCode=1}
