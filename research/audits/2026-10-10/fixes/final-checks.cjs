const fs=require('node:fs'),path=require('node:path'),cp=require('node:child_process'),crypto=require('node:crypto'),vm=require('node:vm');
const root=path.resolve(__dirname,'../fix-review-20261010');
const git=(...args)=>cp.execFileSync('git',args,{cwd:root});
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const tracked=git('ls-files','-z').toString().split('\0').filter(Boolean);
const protectedFiles=tracked.filter(f=>f.endsWith('.csv')||f.startsWith('publication/sources/')||f.startsWith('research/reference/')||f.startsWith('research/drafts/')||f.startsWith('publication/')&&f.endsWith('.json')||['weekly/2026-09-29_10-08/index.html','monthly/2026-09/index.html'].includes(f));
const preservation=protectedFiles.map(file=>{const baseline=hash(git('show','HEAD:'+file)),current=hash(fs.readFileSync(path.join(root,file)));return {file,baseline,current,unchanged:baseline===current}});
fs.writeFileSync(path.join(__dirname,'source-preservation.json'),JSON.stringify(preservation,null,2)+'\n');
if(preservation.some(x=>!x.unchanged))throw Error('Protected source changed');
function loadCanonical(code){const sandbox={module:{exports:{}},require:require('node:module').createRequire(path.join(root,'research/ingest-candidates.js')),URL,structuredClone};vm.runInNewContext(code+'\nmodule.exports.canonical=canonical;',sandbox);return sandbox.module.exports.canonical}
const oldCanonical=loadCanonical(git('show','HEAD:research/ingest-candidates.js').toString());
const newCanonical=loadCanonical(fs.readFileSync(path.join(root,'research/ingest-candidates.js'),'utf8'));
const observations=[];
function walk(value,file,location){if(!value||typeof value!=='object')return;for(const [key,item] of Object.entries(value)){const where=location+'/'+key;if(key==='source_url'&&typeof item==='string')observations.push({file,location:where,url:item,old:oldCanonical(item),current:newCanonical(item)});if(item&&typeof item==='object')walk(item,file,where)}}
for(const file of tracked.filter(f=>f.endsWith('.json')&&(f.startsWith('research/')||f.startsWith('publication/'))))walk(JSON.parse(fs.readFileSync(path.join(root,file),'utf8')),file,'');
const grouped=new Map();for(const row of observations){if(!row.old)continue;if(!grouped.has(row.old))grouped.set(row.old,[]);grouped.get(row.old).push(row)}
const collisions=[...grouped].filter(([,rows])=>new Set(rows.map(r=>r.current)).size>1).map(([old,rows])=>({old,records:rows}));
const scan={scope:'Tracked research and publication JSON source_url fields; read-only; cannot recover discarded/unrecorded import candidates',observations:observations.length,distinctUrls:new Set(observations.map(x=>x.url)).size,changedKeys:observations.filter(x=>x.old!==x.current),oldKeyCollisions:collisions};
fs.writeFileSync(path.join(__dirname,'historical-url-impact.json'),JSON.stringify(scan,null,2)+'\n');
const commands=[['research/benchmark-semantic.js','research/benchmarks/semantic-cases-2026-10.json'],['research/validate-blind-pack.js','research/benchmarks/blind-review-candidates-60.json'],['research/compare-source-facts.js','research/benchmarks/structured-source-fact-probes-2026-10-09.json'],['research/validate-knowledge-base.js','.'],['research/render-knowledge-base-years.js'],['research/validate-publication.js','.'],['research/render-site.js'],['research/public-site.js','.','--build']];
const results=[];for(const args of commands){const result=cp.spawnSync(process.execPath,args,{cwd:root,encoding:'utf8'});results.push({args,exitCode:result.status,stdout:result.stdout,stderr:result.stderr});}
fs.writeFileSync(path.join(__dirname,'validation-commands.json'),JSON.stringify(results,null,2)+'\n');
console.log(JSON.stringify({protectedFiles:preservation.length,unchanged:preservation.every(x=>x.unchanged),sourceUrlObservations:observations.length,changedKeys:scan.changedKeys.length,oldKeyCollisionGroups:collisions.length,commands:results.map(x=>({args:x.args,exitCode:x.exitCode}))},null,2));
if(results.some(x=>x.exitCode!==0))process.exitCode=1;
