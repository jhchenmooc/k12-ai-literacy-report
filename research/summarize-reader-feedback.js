"use strict";
/* Public reader feedback aggregate; intentionally avoids copying issue body or PII. */
const PREFIX="[讀者回饋]";
const LABELS=["事實錯誤／日期或數字錯誤","新聞或政策解讀過度","論文研究方法／因果推論問題","引用來源錯誤／連結失效","學段或臺灣政策適用性問題","文章清晰度與易讀性","建議新增重要來源／議題","一般使用體驗或其他建議"];
function field(body,label){
 const lines=String(body||"").split(/\r?\n/),heading="### "+label;
 const i=lines.findIndex(x=>x.trim()===heading);
 if(i<0)return "";
 for(let j=i+1;j<lines.length;j++){if(/^###\s/.test(lines[j]))break;const v=lines[j].trim();if(v&&v!=="_No response_")return v}
 return "";
}
function aggregate(issues,start,end){
 const selected=issues.filter(i=>!i.pull_request&&typeof i.title==="string"&&i.title.startsWith(PREFIX)&&Date.parse(i.created_at)>=Date.parse(start)&&Date.parse(i.created_at)<Date.parse(end));
 const categories={},accuracies={},clarities={};
 for(const i of selected){
  const type=field(i.body,"回饋類別"),acc=field(i.body,"內容可信度感受（不是事實查核結果）")||field(i.body,"正確性評分"),clarity=field(i.body,"易讀性與解讀清晰度");
  const a=LABELS.includes(type)?type:"未分類";
  categories[a]=(categories[a]||0)+1;
  if(/^[1-5] - /.test(acc))accuracies[acc[0]]=(accuracies[acc[0]]||0)+1;
  if(/^[1-5] - /.test(clarity))clarities[clarity[0]]=(clarities[clarity[0]]||0)+1;
 }
 return {count:selected.length,categories,accuracies,clarities,accuracy_n:Object.values(accuracies).reduce((a,b)=>a+b,0),clarity_n:Object.values(clarities).reduce((a,b)=>a+b,0),issues:selected.map(x=>({number:x.number,url:x.html_url,state:x.state==="closed"?"closed":"open"}))};
}
function render(a,start,end){
 const rows=o=>Object.entries(o).sort((x,y)=>y[1]-x[1]).map(([k,v])=>"- "+k+"："+v+" 筆").join("\n")||"- 無有效分數";
 const safe=issue=>/^https:\/\/github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+\/issues\/[0-9]+$/.test(issue.url||"")?"[#"+issue.number+"]("+issue.url+")":"#"+issue.number;
 const open=a.issues.filter(i=>i.state==="open").length,closed=a.issues.length-open;
 return ["## 讀者回饋週整理",
  "資料窗口（UTC）："+start+" 至 "+end+"（不含結束日）",
  "新增讀者回饋："+a.count+" 筆。這是自願、自選樣本，非代表性調查；回饋不是已確認錯誤，評分不是事實查核結果。","",
  "### 問題類別（回饋筆數）",rows(a.categories),"",
  "### 內容可信度感受（有評分 n="+a.accuracy_n+"，未評分 n="+(a.count-a.accuracy_n)+"）",rows(a.accuracies),"",
  "### 易讀性（有評分 n="+a.clarity_n+"，未評分 n="+(a.count-a.clarity_n)+"）",rows(a.clarities),"",
  "### Issue 狀態（不是更正完成率）",
  "- 開啟中："+open+" 筆；關閉："+closed+" 筆（關閉不代表已驗證或修正）","",
  "### 原始回饋連結（僅列 Issue 編號，不二次轉貼讀者文字）",
  ...a.issues.map(i=>"- "+safe(i)+"（"+(i.state==="closed"?"已關閉":"開啟中")+"）"),"",
  "### 後續核查與更正",
  "1. 優先處理可核對的來源錯誤、政策效力、因果／跨學段解讀；重大安全或隱私疑慮應即時處理，不等待週報。",
  "2. 查核原始來源前不認定讀者主張為真；未能核實則標示待查。",
  "3. 真正修正時以 PR、CI、正式部署及原 Issue 連結留下更正紀錄。",
  "4. 本報表不複製 Issue 內文或標題；它仍會公開連結至原本已公開的回饋，不適合存放兒少及他人個資。"
 ].join("\n");
}

async function api(method,url,token,body){
 const r=await fetch(url,{method,headers:{"Authorization":"Bearer "+token,"Accept":"application/vnd.github+json","X-GitHub-Api-Version":"2022-11-28","User-Agent":"K12-Reader-Feedback-Digest"},body:body?JSON.stringify(body):undefined});
 if(!r.ok)throw Error("GitHub API "+r.status+" "+(await r.text()).slice(0,300));
 return r.json();
}
async function run(){
 const token=process.env.GITHUB_TOKEN,repo=process.env.GITHUB_REPOSITORY;
 if(!token||!repo)throw Error("GitHub Actions GITHUB_TOKEN and GITHUB_REPOSITORY required");
 const end=new Date();end.setUTCHours(0,0,0,0);
 const start=new Date(end.getTime()-7*86400000);
 const startISO=start.toISOString(),endISO=end.toISOString();
 const all=[];for(let page=1;page<=10;page++){
  const chunk=await api("GET","https://api.github.com/repos/"+repo+"/issues?state=all&per_page=100&page="+page+"&since="+encodeURIComponent(startISO),token);
  all.push(...chunk);if(chunk.length<100)break;
 }
 const data=aggregate(all,startISO,endISO);
 console.log("Reader-feedback issues: "+data.count);
 if(!data.count)return;
 const title="讀者回饋週整理｜"+startISO.slice(0,10)+"–"+new Date(end.getTime()-86400000).toISOString().slice(0,10);
 const old=all.find(x=>x.title===title);
 if(old){console.log("Existing summary issue #"+old.number+", skip duplicate");return}
 const issue=await api("POST","https://api.github.com/repos/"+repo+"/issues",token,{title,body:render(data,startISO,endISO)});
 console.log("Published summary issue "+issue.html_url);
}
if(require.main===module)run().catch(e=>{console.error(e);process.exitCode=1});
module.exports={field,aggregate,render};
