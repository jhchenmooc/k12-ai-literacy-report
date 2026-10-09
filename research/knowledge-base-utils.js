"use strict";
/* v1.7 knowledge-base utilities. Deliberately never import publication writers. */
const fs=require("node:fs"),path=require("node:path");
const {parseCsv}=require("./validate-knowledge-base.js");
function normalizeDoi(value){
 if(typeof value!=="string")return "";
 const doi=value.trim().replace(/^https?:\/\/(?:dx\.)?doi\.org\//i,"").replace(/^doi:\s*/i,"").toLowerCase();
 return /^10\.\d{4,9}\/\S+$/.test(doi)?doi:"";
}
function strictUrl(value){
 try{
  const u=new URL(value);
  if(u.protocol!=="https:"||u.username||u.password)return "";
  u.hash="";
  // Do not lowercase URL paths or strip potentially identity-bearing query parameters.
  return u.toString();
 }catch{return ""}
}
function compare(a,b){
 const da=normalizeDoi(a.doi),db=normalizeDoi(b.doi);
 // Same DOI on independently labeled manifestations is a review, not an overwrite.
 if(da&&db&&da===db)return {status:"review_same_doi",reason:"Same DOI; version/manifestation must be checked"};
 const ua=strictUrl(a.primary_url),ub=strictUrl(b.primary_url);
 if(ua&&ub&&ua===ub)return {status:"review_same_url",reason:"Same source URL; page content may have changed"};
 if(a.title&&b.title&&a.title.trim().toLocaleLowerCase()===b.title.trim().toLocaleLowerCase())return {status:"review_same_title",reason:"Title similarity alone cannot merge"};
 return {status:"distinct_or_unknown",reason:"No proven identity; preserve both"};
}
function compareAgainst(records,candidate){
 return records.map(x=>({record_id:x.record_id,...compare(x,candidate)})).filter(x=>x.status!=="distinct_or_unknown");
}
function quote(value){return '"'+String(value??"").replace(/"/g,'""')+'"'}
function safeCell(value){
 const s=String(value??"");
 // Workbooks can interpret initial =,+,-,@ and control-prefix variants as formulas.
 // Prefix text with a single apostrophe only in the derived export.
 return /^[\s\u0000-\u001f]*[=+\-@]/u.test(s)?"'"+s:s;
}
function csv(rows,keys,{spreadsheetSafe=false}={}){
 return keys.join(",")+"\r\n"+rows.map(r=>keys.map(k=>quote(spreadsheetSafe?safeCell(r[k]):r[k])).join(",")).join("\r\n")+"\r\n";
}
function main(){
 const dir=path.join(__dirname,"knowledge-base"),records=parseCsv(fs.readFileSync(path.join(dir,"data","records.csv"),"utf8"));
 const keys=Object.keys(records[0]||{});
 if(!keys.length)throw Error("No knowledge records");
 const out=csv(records,keys,{spreadsheetSafe:true});
 // Explicit stdout only: cannot overwrite original CSV, candidate JSON or publication files.
 process.stdout.write(out);
}
if(require.main===module)main();
module.exports={normalizeDoi,strictUrl,compare,compareAgainst,safeCell,csv};
