"use strict";
/* Read-only bridge: new source discovery => KB review suggestions. Never writes. */
const fs=require("node:fs"),path=require("node:path");
const {parseCsv}=require("./validate-knowledge-base.js");
const {compareAgainst,strictUrl}=require("./knowledge-base-utils.js");
function preview(records,items){
 if(!Array.isArray(records)||!Array.isArray(items))throw Error("invalid input");
 const out=[],seen=new Set();
 for(const item of items){
  const url=item.source_url||item.primary_url;
  if(!strictUrl(url)||!item.source_title&&!item.title)throw Error("source URL/title required");
  const suggestion={source_url:url,title:item.source_title||item.title,doi:item.doi||"",source_candidate_id:item.candidate_id||null};
  // Retain original discovery info only. It is not a first-publication certification.
  const key=url;
  const withinBatch=seen.has(key);seen.add(key);
  const matches=compareAgainst(records,{primary_url:url,doi:suggestion.doi,title:suggestion.title});
  out.push({...suggestion,discovery_status:withinBatch?"repeat_in_batch":matches.length?"review_existing":"new_unverified",matches,publication_decision:"not_applicable",verified:false});
 }
 return out;
}
function main(){
 const root=__dirname,recordFile=path.join(root,"knowledge-base","data","records.csv");
 const records=parseCsv(fs.readFileSync(recordFile,"utf8"));
 const source=process.argv[2]||path.join(root,"drafts","2026-10-09_2026-10-15.json");
 const worksheet=JSON.parse(fs.readFileSync(path.resolve(source),"utf8"));
 if(!Array.isArray(worksheet.items))throw Error("worksheet requires items");
 const suggestions=preview(records,worksheet.items);
 process.stdout.write(JSON.stringify({mode:"read_only_review_preview",items:suggestions},null,2)+"\n");
}
if(require.main===module)try{main()}catch(e){console.error(e.message);process.exitCode=1}
module.exports={preview};
