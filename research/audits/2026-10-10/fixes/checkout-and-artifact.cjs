const fs=require('node:fs'),path=require('node:path'),cp=require('node:child_process'),crypto=require('node:crypto');
const suffix=process.argv[2]||'';
if(!/^(?:-self-review)?$/.test(suffix))throw Error('Invalid verification suffix');
const root=path.resolve(__dirname,'../fix-review-20261010'),scratch=path.join(__dirname,'checkout-staging'+suffix),out=path.join(__dirname,'checkout-autocrlf-true'+suffix);
const git=(cwd,...args)=>cp.execFileSync('git',args,{cwd});
const names=git(root,'ls-files','--cached','--others','--exclude-standard','-z').toString().split('\0').filter(Boolean);
fs.mkdirSync(scratch);fs.mkdirSync(out);
for(const file of names){const target=path.join(scratch,file);fs.mkdirSync(path.dirname(target),{recursive:true});fs.copyFileSync(path.join(root,file),target)}
git(scratch,'init','-q');git(scratch,'config','core.autocrlf','true');git(scratch,'add','--all');git(scratch,'checkout-index','--all','--prefix='+out.replace(/\\/g,'/')+'/');
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const binary=file=>file.endsWith('.csv')||file.startsWith('publication/sources/')||file.startsWith('research/reference/');
const byteChecks=names.filter(binary).map(file=>({file,unchanged:sha(fs.readFileSync(path.join(root,file)))===sha(fs.readFileSync(path.join(out,file)))}));
const textFiles=names.filter(file=>!binary(file)&&/\.(js|json|html|css|svg|md|ya?ml)$/.test(file));
const crlf=textFiles.filter(file=>fs.readFileSync(path.join(out,file),'utf8').includes('\r\n'));
const rendered=cp.spawnSync(process.execPath,['research/render-site.js'],{cwd:out,encoding:'utf8'});
const parse5=require(path.join(root,'node_modules/parse5')),{inventory}=require(path.join(root,'research/public-site.js'));
const expected=inventory(root).files,artifact=path.join(root,'_public_site'),missing=[],internalLinks=[];
const all=node=>[node,...(node.childNodes||[]).flatMap(all)];
for(const file of expected){if(!fs.existsSync(path.join(artifact,file))||sha(fs.readFileSync(path.join(root,file)))!==sha(fs.readFileSync(path.join(artifact,file))))missing.push(file);if(!file.endsWith('.html'))continue;
 for(const node of all(parse5.parse(fs.readFileSync(path.join(artifact,file),'utf8'))))for(const a of node.attrs||[]){if(!['href','src'].includes(a.name)||/^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(a.value))continue;
  const url=new URL(a.value,'https://local.test/'+file),rel=decodeURIComponent(url.pathname).replace(/^\//,''),dest=path.join(artifact,rel.endsWith('/')?rel+'index.html':rel||'index.html');
  if(!fs.existsSync(dest))internalLinks.push({file,url:a.value,missing:rel});
 }
}
const result={checkout:{autocrlf:true,textFiles:textFiles.length,crlfViolations:crlf,protectedByteChecks:byteChecks,renderExit:rendered.status,renderOutput:rendered.stdout+rendered.stderr},artifact:{files:expected.length,missingOrChanged:missing,brokenLocalLinks:internalLinks}};
fs.writeFileSync(path.join(__dirname,'checkout-and-artifact'+suffix+'.json'),JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify({checkedOut:names.length,crlfViolations:crlf.length,byteChecks:byteChecks.length,byteFailures:byteChecks.filter(x=>!x.unchanged).length,renderExit:rendered.status,artifactFiles:expected.length,missingOrChanged:missing,brokenLocalLinks:internalLinks},null,2));
if(crlf.length||byteChecks.some(x=>!x.unchanged)||rendered.status||missing.length||internalLinks.length)process.exitCode=1;
