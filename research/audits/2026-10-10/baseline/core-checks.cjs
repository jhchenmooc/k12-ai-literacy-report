const fs=require('node:fs'),path=require('node:path'),cp=require('node:child_process'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'../audit-repo-20261010');
const files=cp.execFileSync('git',['ls-files'],{cwd:root,encoding:'utf8'}).trim().split('\n');
const out={sha:cp.execFileSync('git',['rev-parse','HEAD'],{cwd:root,encoding:'utf8'}).trim(),node:process.version,platform:process.platform,locale:Intl.Collator().resolvedOptions().locale,timezone:Intl.DateTimeFormat().resolvedOptions().timeZone,counts:{},jsonErrors:[],syntaxErrors:[],cli:[]};
for(const ext of ['.js','.test.js','.html','.css','.json','.csv','.yml'])out.counts[ext]=files.filter(f=>f.endsWith(ext)).length;
for(const rel of files.filter(f=>f.endsWith('.json')))try{JSON.parse(fs.readFileSync(path.join(root,rel),'utf8'));}catch(e){out.jsonErrors.push({file:rel,error:e.message})}
for(const rel of files.filter(f=>f.endsWith('.js'))){const r=cp.spawnSync(process.execPath,['--check',rel],{cwd:root,encoding:'utf8'});if(r.status!==0)out.syntaxErrors.push({file:rel,status:r.status,error:r.stderr});}
for(const args of [
 ['research/validate-knowledge-base.js','.'],['research/render-knowledge-base-years.js'],['research/validate-publication.js','.'],
 ['research/render-site.js'],['research/benchmark-semantic.js','research/benchmarks/semantic-cases-2026-10.json'],
 ['research/validate-blind-pack.js','research/benchmarks/blind-review-candidates-60.json'],
 ['research/compare-source-facts.js','research/benchmarks/structured-source-fact-probes-2026-10-09.json'],
 ['research/knowledge-base-import-preview.js'],['research/prepare-daily-brief.js','2026-10-10']
]){const r=cp.spawnSync(process.execPath,args,{cwd:root,encoding:'utf8'});const log=args[0].split('/').pop()+'.log';fs.writeFileSync(path.join(__dirname,log),r.stdout+'\nSTDERR:\n'+r.stderr);out.cli.push({args,status:r.status,log});}
const render=require(path.join(root,'research/render-site.js'));
const mismatch=()=>Object.entries(render.build(root)).filter(([p,t])=>fs.readFileSync(path.join(root,p),'utf8')!==t).map(([p])=>p);
out.defaultLocaleMismatch=mismatch();
const original=String.prototype.localeCompare;
String.prototype.localeCompare=function(other,locale,options){return original.call(this,other,locale||'en',options)};
out.forcedEnglishMismatch=mismatch();String.prototype.localeCompare=original;
out.trackedContentMismatch=[];
for(const rel of files){const committed=cp.execFileSync('git',['show','HEAD:'+rel],{cwd:root,maxBuffer:20*1024*1024});const actual=fs.readFileSync(path.join(root,rel));if(!committed.equals(actual))out.trackedContentMismatch.push(rel);}
fs.writeFileSync(path.join(__dirname,'core-results.json'),JSON.stringify(out,null,2)+'\n');console.log(JSON.stringify(out,null,2));
