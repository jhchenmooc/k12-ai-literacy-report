const fs=require('node:fs'),path=require('node:path'),cp=require('node:child_process');
const root=path.resolve(__dirname,'../fix-review-20261010');
const run=args=>cp.spawnSync('git',args,{cwd:root,encoding:'utf8',maxBuffer:20*1024*1024});
const diff=run(['diff','--binary','HEAD']);if(diff.status!==0)throw Error(diff.stderr);
let patch=diff.stdout;
const untracked=run(['ls-files','--others','--exclude-standard','-z']).stdout.split('\0').filter(Boolean);
for(const file of untracked){const result=run(['diff','--no-index','--binary','--','/dev/null',file]);if(result.status!==1)throw Error(result.stderr);patch+=result.stdout}
const target=path.join(__dirname,'audit-fixes.patch');fs.writeFileSync(target,patch);
const check=cp.spawnSync('git',['apply','--check',target],{cwd:path.resolve(__dirname,'../audit-repo-20261010'),encoding:'utf8'});
const result={baseline:run(['rev-parse','HEAD']).stdout.trim(),branch:run(['branch','--show-current']).stdout.trim(),status:run(['status','--short']).stdout,trackedDiffStat:run(['diff','--stat']).stdout,addedFiles:untracked,patchBytes:Buffer.byteLength(patch),patchCheckAgainstBaseline:check.status,patchCheckOutput:check.stdout+check.stderr};
fs.writeFileSync(path.join(__dirname,'change-summary.json'),JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify({baseline:result.baseline,branch:result.branch,addedFiles:untracked,patchBytes:result.patchBytes,patchCheck:check.status,patchCheckOutput:result.patchCheckOutput},null,2));if(check.status!==0)process.exitCode=1;
