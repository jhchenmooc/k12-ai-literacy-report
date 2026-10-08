"use strict";
/* Offline draft generator: never publishes, guesses news, or certifies sources. */
const fs=require("node:fs"),path=require("node:path");
function makeDraft(friday){
 if(!/^\d{4}-\d{2}-\d{2}$/.test(friday))throw Error("Use YYYY-MM-DD");
 const start=new Date(friday+"T00:00:00Z");
 if(!Number.isFinite(start.getTime())||start.toISOString().slice(0,10)!==friday||start.getUTCDay()!==5)throw Error("Start must be a valid Friday");
 const end=new Date(start.getTime()+6*86400000).toISOString().slice(0,10);
 const slug=friday+"_"+end;
 return {filename:slug+".json",data:{
  schema_version:1,period:{start:friday,end},status:"draft_pending_source_verification",
  notice:"Planning worksheet only. NOT registered in publication/issues.json, NOT certified or published.",
  editorial_rules:{target_items:"3–5, fewer when evidence is insufficient",high_risk:"hold",source_required:true},
  items:[],item_template:{
   candidate_id:"",category:"news_policy_or_research",source_url:"",source_title:"",source_publication_date:"",
   source_locator:"",original_excerpt:"",source_checked:false,
   claim_text:"",claim_class:"bibliographic_or_descriptive_or_high_impact",risk_tier:"low_or_medium_or_high",
   scope_limitation:"",translation_reviewed:false,conflict_unresolved:null,decision:"hold",
   ai_crosscheck_status:"not_started",ai_crosscheck_passes:0,ai_crosscheck_record:""
  }
 }};
}
function writeDraft(root,friday){
 const {filename,data}=makeDraft(friday),dir=path.join(root,"research","drafts"),out=path.join(dir,filename);
 fs.mkdirSync(dir,{recursive:true});
 fs.writeFileSync(out,JSON.stringify(data,null,2)+"\n",{flag:"wx"});
 return out;
}
if(require.main===module){
 try{const friday=process.argv[2];if(!friday)throw Error("Usage: node research/scaffold-weekly.js YYYY-MM-DD [project-root]");console.log(writeDraft(path.resolve(process.argv[3]||"."),friday))}
 catch(e){console.error(e.message);process.exitCode=1}
}
module.exports={makeDraft,writeDraft};
