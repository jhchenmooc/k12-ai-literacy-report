"use strict";
const fs=require('node:fs'),path=require('node:path');
const root='D:/codex/ai/audit-repo-20261010';
const {makeDraft,writeDraft}=require(root+'/research/scaffold-weekly.js');
const {merge,ingest}=require(root+'/research/ingest-candidates.js');
const {dailyBrief,create}=require(root+'/research/prepare-daily-brief.js');
const {parseCsv,validate,dateOk,index}=require(root+'/research/validate-knowledge-base.js');
const utils=require(root+'/research/knowledge-base-utils.js');
const preview=require(root+'/research/knowledge-base-import-preview.js').preview;
const batch=(c,id='one')=>({batch_id:id,searched_on:'2026-10-09',sources:[{group:'official',query:'test',status:'ok'}],candidates:c});
const item=(url)=>({source_url:url,source_title:url,source_locator:'paragraph'});
const out=(name,value)=>console.log(JSON.stringify({name,...value}));
for(const [name,urls] of [['path-case',['https://example.org/Doc','https://example.org/doc']],['unknown-query',['https://example.org/read?item=10','https://example.org/read?item=11']]]){
 const r=merge(makeDraft('2026-10-09').data,batch(urls.map(item)));
 out(name,{expected:'2 distinct items',actual:{items:r.worksheet.items.length,duplicates:r.duplicates,unresolved:r.worksheet.unresolved_duplicate_discoveries}});
}
const w=makeDraft('2026-10-09').data;
w.search_runs=[];w.items=[{...item('https://example.org/verified'),candidate_id:'W2026-10-09-A01',ai_lit_class:'A',audience:'k12',source_publication_date:'2026-10-09',first_disclosed_on:'2026-10-09',verification_completed_on:'2026-10-09',source_checked:true,conflict_unresolved:false,decision:'publish'}];
const r=merge(w,batch([{...item('https://example.org/verified'),update_note:{text:'Correction'}}]));
out('nonstring-update-note',{expected:'reject malformed update or retain unresolved update',actual:{duplicates:r.duplicates,unresolved:r.worksheet.unresolved_duplicate_discoveries??[],updates:r.worksheet.items[0].source_updates??[],suggested:dailyBrief(r.worksheet,'2026-10-10').suggested_for_publication}});
try{dailyBrief(makeDraft('2026-10-09').data,'2026-10-10');out('empty-scaffold',{actual:'accepted'})}catch(e){out('empty-scaffold',{expected:'empty daily brief',actual:e.message})}
for(const csv of ['record_id,title\n1,"A"B\n','record_id,title,title\n1,Original,Replacement\n']){
 try{out('invalid-csv',{input:csv,expected:'reject malformed quote or duplicate header',actual:parseCsv(csv)})}catch(e){out('invalid-csv',{actual:e.message})}
}
const rec={record_id:'KB-2026-0001',title:'test',record_type:'framework',primary_url:'https://example.org/test',first_published_on:'',date_precision:'unknown',year_basis:'unknown',year_value:'',verification_status:'discovered_unverified'};
const run={run_id:'r',searched_on:'2026-10-09',source_id:'J01',query:'test',coverage_level:'items_screened',status:'partial',results_seen:'',results_screened:'3',results_recorded:'4'};
out('partial-search-count',{expected:'recorded cannot exceed screened',actual:validate([rec],[],[run],[])});
const fixture=path.join(__dirname,'data-fixture');fs.mkdirSync(path.join(fixture,'research','drafts'),{recursive:true});
const old=makeDraft('2026-10-09');old.data.search_runs=[];old.data.items=[{...w.items[0],verification_completed_on:'2026-10-16'}];
const current=makeDraft('2026-10-16');current.data.search_runs=[];
for(const d of [old,current])fs.writeFileSync(path.join(fixture,'research','drafts',d.filename),JSON.stringify(d.data));
out('cross-week-late-verification',{expected:'older candidate appears as background or pending review',actual:{directOld:dailyBrief(old.data,'2026-10-17').pending.length,cliRoot:create(fixture,'2026-10-17').pending.length}});
out('controls',{dates:{invalid:dateOk('2026-02-30','day'),leap:dateOk('2024-02-29','day')},csv:parseCsv('id,title\r\n1,"A\r\nB, ""C"""\r\n'),urlsDistinct:utils.compare({primary_url:'https://example.org/Doc?item=10'},{primary_url:'https://example.org/doc?item=11'}),previewCount:preview([], [item('https://example.org/Doc'),item('https://example.org/doc')]).length,indexOrder:index([rec],[])===index([rec],[])});
const failureRoot=path.join(__dirname,'data-failure-fixture');fs.mkdirSync(path.join(failureRoot,'research','drafts'),{recursive:true});
const empty=makeDraft('2026-10-09'),target=path.join(failureRoot,'research','drafts',empty.filename),batchFile=path.join(failureRoot,'batch.json');
fs.writeFileSync(target,JSON.stringify(empty.data));fs.writeFileSync(batchFile,JSON.stringify(batch([item('https://example.org/new')])));
const before=fs.readFileSync(target,'utf8'),rename=fs.renameSync;let error;
fs.renameSync=()=>{throw Error('synthetic rename failure')};
try{ingest(failureRoot,'2026-10-09',batchFile)}catch(e){error=e.message}finally{fs.renameSync=rename}
const unchanged=before===fs.readFileSync(target,'utf8'),remaining=fs.readdirSync(path.dirname(target)).filter(x=>x.endsWith('.lock')||x.includes('.tmp-'));
const retried=ingest(failureRoot,'2026-10-09',batchFile);
out('rename-failure-recovery',{error,originalUnchanged:unchanged,remainingLockOrTemp:remaining,retryAdded:retried.added.length});
