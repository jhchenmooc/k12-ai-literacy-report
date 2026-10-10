"use strict";
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),cp=require('node:child_process');
const repo=path.resolve(__dirname,'../../audit-repo-20261010');
const {validate}=require(path.join(repo,'research/validate-publication.js'));
const excerpt='This fictional agency published a nonbinding advisory for secondary-school educators.\n';
const claim={audience:'k12',ai_lit_class:'A',ai_lit_dims:['T-PD'],ai_lit_note:'Synthetic teacher AI literacy notice',evidence_path:'publication/sources/fixture.txt',evidence_sha256:crypto.createHash('sha256').update(excerpt).digest('hex'),original_excerpt:excerpt.trim(),evidence_source_url:'https://example.org/official',interpretation_note:'Synthetic notice states only a nonbinding advisory.',scope_limitation:'No legal force or intervention outcome is claimed.',assertion_type:'direct_statement',translation_reviewed:true,claim_id:'C1',kind:'news_policy',claim_class:'descriptive',risk_tier:'medium',ai_crosscheck_status:'concordant',ai_crosscheck_passes:2,ai_crosscheck_record:'Synthetic two-pass crosscheck record',claim_text:'Synthetic notice',source_url:'https://example.org/official',source_locator:'Paragraph 1',checked_at:'2026-10-10',publication_date:'2026-10-10',source_type:'official',source_checked:true,scope_checked:true,outcome_checked:false,independent_review:false,conflict_unresolved:false,decision:'publish',level:'N-V2'};
function put(dir,file,text){const f=path.join(dir,file);fs.mkdirSync(path.dirname(f),{recursive:true});fs.writeFileSync(f,text)}
function setup(name,html){const dir=path.join(__dirname,name);put(dir,'publication/issues.json',JSON.stringify({editions:[{path:'weekly/2026-10-09_10-15/index.html',claims_file:'publication/claims/a.json'}]}));put(dir,'publication/claims/a.json',JSON.stringify([claim]));put(dir,'publication/sources/fixture.txt',excerpt);put(dir,'weekly/2026-10-09_10-15/index.html',html||'<main><p data-claim-id="C1">Synthetic notice</p></main>');return dir}
const results={};
results.control=validate(setup('control'));
const {sourceTrace}=require(path.join(repo,'research/validate-source-trace.js'));
results.source_trace_checks={};
for(const [name,delta] of Object.entries({valid:{},wrong_hash:{evidence_sha256:'0'.repeat(64)},missing_excerpt:{original_excerpt:''},wrong_url:{evidence_source_url:'https://example.org/other'},path_traversal:{evidence_path:'publication/sources/../../README.md'},translation_not_reviewed:{translation_reviewed:false}}))results.source_trace_checks[name]=sourceTrace(path.join(__dirname,'control'),{...claim,...delta});
const {check}=require(path.join(repo,'research/validate-claims.js'));
results.claim_checks={};
for(const [name,delta] of Object.entries({valid:{},high_risk:{risk_tier:'high',claim_class:'high_impact',level:'N-V3',outcome_checked:true,independent_review:true},unknown_conflict:{conflict_unresolved:undefined},invalid_date:{publication_date:'2026-02-30'},unsafe_source:{source_url:'javascript:void(0)'},medium_no_crosscheck:{ai_crosscheck_passes:1}}))results.claim_checks[name]=check({...claim,...delta});
for(const entity of ['Tab','NewLine'])results['named_entity_'+entity]=validate(setup('named-entity-'+entity,'<main><p data-claim-id="C1"><a href="java&'+entity+';script:void(0)">Synthetic notice</a></p></main>'));
results.literal_javascript=validate(setup('literal-javascript','<main><p data-claim-id="C1"><a href="javascript:void(0)">Synthetic notice</a></p></main>'));
results.comment_fake_main=validate(setup('comment-fake-main','<html><!-- <main><p data-claim-id="C1">Synthetic notice</p></main> --><body><p>Unreviewed visible content</p></body></html>'));
const extra=setup('unregistered-file');put(extra,'weekly/2026-10-09_10-15/extra.html','<main><p>Unreviewed publication content</p></main>');results.unregistered_file=validate(extra);
results.extraneous_binding_attr=validate(setup('extraneous-binding-attr','<main><p xdata-claim-id="C1">Synthetic notice</p></main>'));
const input=path.join(__dirname,'duplicate-id.json');fs.writeFileSync(input,JSON.stringify([{...claim,decision:'hold'},{...claim,risk_tier:'high',claim_class:'high_impact',decision:'publish'}]));
const cli=cp.spawnSync(process.execPath,[path.join(repo,'research/validate-claims.js'),input],{encoding:'utf8'});results.duplicate_id_cli={exit_status:cli.status,stdout:cli.stdout,stderr:cli.stderr};
const heldInput=path.join(__dirname,'held-valid.json');fs.writeFileSync(heldInput,JSON.stringify([{...claim,decision:'hold'}]));const held=cp.spawnSync(process.execPath,[path.join(repo,'research/validate-claims.js'),heldInput],{encoding:'utf8'});results.held_valid_cli={exit_status:held.status,stdout:held.stdout};
const data=JSON.stringify(results,null,2);fs.writeFileSync(path.join(__dirname,'results.json'),data);console.log(data);
