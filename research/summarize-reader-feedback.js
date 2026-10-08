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
  const type=field(i.body,"回饋類別"),acc=field(i.body,"正確性評分"),clarity=field(i.body,"易讀性與解讀清晰度");
  const a=LABELS.includes(type)?type:"未分類";
  categories[a]=(categories[a]||0)+1;
  if(/^[1-5] - /.test(acc))accuracies[acc[0]]=(accuracies[acc[0]]||0)+1;
  if(/^[1-5] - /.test(clarity))clarities[clarity[0]]=(clarities[clarity[0]]||0)+1;
 }
 return {count:selected.length,categories,accuracies,clarities,issues:selected.map(x=>({number:x.number,url:x.html_url,title:String(x.title).slice(0,130)}))};
}
function render(a,start,end){
 const rows=(o)=>Object.entries(o).sort((x,y)=>y[1]-x[1]).map(([k,v])=>"- "+k+"："+v+" 筆").join("\n")||"- 本週無回饋";
 return ["## 讀者回饋週整理","資料窗口（UTC）："+start+" 至 "+end+"（不含結束日）","本週收到 **"+a.count+"** 筆讀者回饋。以下評分僅代表自願參與的讀者觀感，不代表新聞或論文經正式驗證。","","### 回饋類別",rows(a.categories),"","### 正確性評分（有填數字者）",rows(a.accuracies),"","### 易讀性評分（有填數字者）",rows(a.clarities),"","### 待核對回饋單",...a.issues.map(x=>"- [#"+x.number+"]("+x.url+") "+x.title.replace(/[\r\n]/g," ")),"","### 編輯改善流程","1. 先核對讀者指出的原始來源、日期、效力及學段。","2. 來源不足或高風險推論先標示待查，不以讀者意見直接取代證據。","3. 真正需要更正的內容經 PR、required verify、Pages 部署後回覆原 Issue 並記錄更正。","4. 本摘要為自動整理，尚未判定每則回饋的真偽，也不表示所有改善已完成。"].join("\n");
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
