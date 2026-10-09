"use strict";
const fs=require("node:fs"),path=require("node:path");
const {parseCsv,validate}=require("./validate-knowledge-base.js");
const base=path.join(__dirname,"knowledge-base");
const esc=s=>String(s??"").replaceAll("|","\\|").replaceAll("\n"," ");
function render(records){
 const years=new Map();
 for(const r of records){
  const year=r.year_value||"unknown",basis=r.year_basis||"unknown";
  const key=year+"/"+basis;
  if(!years.has(key))years.set(key,[]);
  years.get(key).push(r);
 }
 const lines=["# K–12 AI 素養歷年資料清單（由 records.csv 產生）","","本檔為長期知識庫的**書目索引**，不是當期新聞出版或政策效力認證。年份標示所據日期類型；unknown 不能視為首次公開於發現日。",""];
 for(const key of [...years.keys()].sort()){
  const [year,basis]=key.split("/");
  lines.push("## "+year+"｜"+basis,"","| 紀錄 | 類型 | 出版／來源日期 | 核查程度 |","|---|---|---|---|");
  for(const r of years.get(key).sort((a,b)=>a.record_id.localeCompare(b.record_id))){
   const title=esc(r.title).replaceAll("[","\\[").replaceAll("]","\\]");
   lines.push("| "+r.record_id+" — ["+title+"]("+r.primary_url+") | "+esc(r.record_type)+" | "+(r.first_published_on||"未知")+" | "+esc(r.verification_status)+" |");
  }
  lines.push("");
 }
 lines.push("資料來源：research/knowledge-base/data/records.csv。分類／國家／期刊／會議由 indexes/index.json 提供；須依原文重新評估任何欲公開發表之主張。","");
 return lines.join("\n");
}
function main(){
 const records=parseCsv(fs.readFileSync(path.join(base,"data","records.csv"),"utf8"));
 const text=render(records),dest=path.join(base,"indexes","YEARS.md");
 if(process.argv.includes("--write"))fs.writeFileSync(dest,text);
 else if(!fs.existsSync(dest)||fs.readFileSync(dest,"utf8")!==text){console.error("outdated yearly Markdown");process.exitCode=1;return}
 console.log("yearly Markdown consistent");
}
if(require.main===module)main();
module.exports={render};
