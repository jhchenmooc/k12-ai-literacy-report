"use strict";
const test=require("node:test"),assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path");
const {parseWatchlist,queries,selectTiers,collectWorks,searchRunRows,EDU}=require("./scholar-watch-run.js");
const md=`## 0. 使用規則
| S99 | 不該被讀到 | x | x | x | ORCID 0000-0000-0000-0000 |
## 2. A1 核心
| ID | 學者 | 單位 | 主題 | 著作 | 確認 |
|---|---|---|---|---|---|
| S01 | One | U | t | w | ORCID 0000-0001-5843-4854。**已確認** |
## 2b. A2 核心
| T07 | Seven | U | t | w | Yao：A5032462085；ORCID 0000-0002-2545-8910。檢索須加教育主題詞。另一組 ORCID 0000-0001-5174-8586 勿用 |
| T04 | Four | U | t | w | Yuan：A5029607042（北教大）。無公開 ORCID。檢索須加教育主題詞 |
## 3c. V 監測期刊
| V17 | Yang | U | w | A5061103584；ORCID 0000-0002-9966-248X。ORCID 查詢混入同名者，依作者檢索改用作者 ID A5061103584 |
## 3d. 維護紀錄
| V17 | Yang | 28 | 5 | 8 | 5 |
`;
test("watchlist parsing picks tier, identifier and topic filter from the confirmation column",()=>{
 const s=parseWatchlist(md);
 assert.deepEqual(s.map(x=>[x.id,x.tier,x.filter,x.edu_topic]),[
  ["S01","A1","author.orcid:0000-0001-5843-4854",false],
  ["T07","A2","author.orcid:0000-0002-2545-8910",true],
  ["T04","A2","author.id:A5029607042",true],
  ["V17","V","author.id:A5061103584",false]]);
 assert.deepEqual(selectTiers(s,["A2"]).map(x=>x.id),["T07","T04"]);
 assert.throws(()=>selectTiers(s,["Z9"]),/unknown tier/);
});
test("real watchlist parses without duplicates and every scholar has an identifier",()=>{
 const s=parseWatchlist(fs.readFileSync(path.join(__dirname,"scholar-watchlist.md"),"utf8"));
 assert.ok(s.length>=90);
 for(const x of s)assert.match(x.filter,/^author\.(orcid:\d{4}-\d{4}-\d{4}-\d{3}[\dX]|id:A\d+)$/);
 assert.equal(s.find(x=>x.id==="V17").filter,"author.id:A5061103584");
 assert.equal(s.find(x=>x.id==="S06").edu_topic,true);
});
test("queries never carry email or key; topic-filtered scholars also get an unfiltered check",()=>{
 const [a]=queries({filter:"author.orcid:0000-0001-5843-4854",edu_topic:false},"2026-10-09","2026-10-15");
 assert.equal(a.url,"https://api.openalex.org/works?filter=author.orcid:0000-0001-5843-4854,from_publication_date:2026-10-09,to_publication_date:2026-10-15&per_page=200");
 const b=queries({filter:"author.id:A5029607042",edu_topic:true},"2026-08-29","2026-10-10");
 assert.deepEqual(b.map(x=>x.role),["primary","supplementary_unfiltered"]);
 assert.ok(b[0].url.includes("&search="+encodeURIComponent(EDU)));
 for(const x of [a,...b])assert.doesNotMatch(x.url,/mailto|api_key|@/);
 assert.throws(()=>queries({filter:"author.id:A1",edu_topic:false},"2026-02-30","2026-03-01"),/invalid date/);
});
test("works are deduplicated across co-authoring scholars and matched to KB and pool by DOI",()=>{
 const w={id:"https://openalex.org/W1",doi:"https://doi.org/10.1/ABC",title:"T",publication_date:"2026-09-01",
  abstract_inverted_index:{AI:[0],literacy:[1]},
  authorships:[{author:{orcid:"https://orcid.org/0000-0001-5843-4854"},institutions:[{display_name:"Monash"}]},{author:{id:"https://openalex.org/A5029607042"},institutions:[]}]};
 const out=collectWorks([{scholar:{id:"S01",filter:"author.orcid:0000-0001-5843-4854"},data:{results:[w]}},{scholar:{id:"T04",filter:"author.id:A5029607042"},data:{results:[w]}}],
  {kbRecords:[{record_id:"KB-2026-0001",doi:"10.1/abc"}],poolItems:[{candidate_id:"W2026-10-09-A01",doi:"https://doi.org/10.1/abc"}]});
 assert.equal(out.length,1);
 assert.deepEqual(out[0].scholar_ids,["S01","T04"]);
 assert.deepEqual(out[0].scholar_affiliations,{S01:["Monash"],T04:[]});
 assert.equal(out[0].in_kb,"KB-2026-0001");
 assert.equal(out[0].in_candidate_pool,"W2026-10-09-A01");
 assert.equal(out[0].abstract_for_screening_only,"AI literacy");
});
test("search_runs rows record failures as failures and keep the established run_id format",()=>{
 const runs=[
  {scholar_id:"S01",role:"primary",url:"https://api.openalex.org/works?filter=author.orcid:0000-0001-5843-4854,from_publication_date:2026-10-09,to_publication_date:2026-10-15&per_page=200",utc:"2026-10-15T08:00:00Z",http:200,status:"ok",total:3},
  {scholar_id:"T04",role:"supplementary_unfiltered",url:"https://api.openalex.org/works?filter=author.id:A1,from_publication_date:2026-10-09,to_publication_date:2026-10-15&per_page=200",utc:"x",http:200,status:"ok",total:9},
  {scholar_id:"T07",role:"primary",url:"https://api.openalex.org/works?filter=author.id:A5032462085,from_publication_date:2026-10-09,to_publication_date:2026-10-15&per_page=200",utc:"2026-10-15T08:00:01Z",http:503,status:"failed",total:null}];
 const rows=searchRunRows(runs,{runDate:"2026-10-15",label:"weekly run (A1/A2)",details:"research/p0-scholar-weekly-2026-10-15/",screened:{S01:2}});
 assert.equal(rows.length,2);
 assert.match(rows[0],/^"SCHOLAR-20261015-S01","2026-10-15","S01","OpenAlex works filter author\.orcid:0000-0001-5843-4854,from_publication_date:2026-10-09,to_publication_date:2026-10-15&per_page=200","2026-10-09","2026-10-15","items_screened","ok","3","2","0",/);
 assert.match(rows[1],/"query_scoped","unavailable","","","",/);
 assert.match(rows[1],/Query failed \(HTTP 503\); not a zero-hit result/);
});

/* D2: cursor paging with a mocked transport (no network). */
const os=require("node:os"),{fetchAll,runFetch,MAX_PAGES}=require("./scholar-watch-run.js");
function pager(total,{perPage=200,fail={},repeat=false,countDelta=0}={}){
 const works=Array.from({length:total},(_,i)=>({id:"https://openalex.org/W"+(i+1),doi:"https://doi.org/10.9/"+(i+1),title:"T"+(i+1)}));
 const calls=[];
 const getter=async url=>{
  calls.push(url);
  if(fail[calls.length])return {http:fail[calls.length],data:null,utc:"u"+calls.length};
  const cur=new URL(url).searchParams.get("cursor"),off=cur==="*"?0:Number(cur);
  const next=off+perPage<total?String(repeat?perPage:off+perPage):null;
  return {http:200,utc:"u"+calls.length,data:{meta:{count:total+countDelta,per_page:perPage,next_cursor:next},results:works.slice(off,off+perPage)}};
 };
 return {getter,calls};
}
const URL0="https://api.openalex.org/works?filter=author.id:A1,from_publication_date:2026-10-01,to_publication_date:2026-10-07&per_page=200";
test("201 results: two cursor requests collect all works",async()=>{
 const {getter,calls}=pager(201);
 const r=await fetchAll(URL0,{getter});
 assert.equal(calls.length,2);
 assert.match(calls[0],/&cursor=\*$/);assert.match(calls[1],/&cursor=200$/);
 assert.equal(r.data.results.length,201);assert.equal(r.total,201);assert.equal(r.count_mismatch,false);
 assert.equal(r.data.meta.next_cursor,null);
});
test("a failed second page fails the whole query, never zero or partial",async()=>{
 const {getter}=pager(201,{fail:{2:503}});
 const r=await fetchAll(URL0,{getter});
 assert.equal(r.data,null);assert.match(r.reason,/page 2 failed \(HTTP 503\)/);
});
test("repeated cursor and page cap fail the query",async()=>{
 const rep=await fetchAll(URL0,{getter:pager(601,{repeat:true}).getter});
 assert.equal(rep.data,null);assert.match(rep.reason,/repeated cursor after page 2/);
 const cap=await fetchAll(URL0,{getter:pager(5,{perPage:1}).getter,maxPages:3});
 assert.equal(cap.data,null);assert.match(cap.reason,/more than 3 pages/);
 assert.equal(MAX_PAGES,20);
});
test("meta.count differing from received works is recorded, not a failure",async()=>{
 const r=await fetchAll(URL0,{getter:pager(3,{countDelta:2}).getter});
 assert.ok(r.data);assert.equal(r.total,5);assert.equal(r.received,3);assert.equal(r.count_mismatch,true);
});
test("fetch writes merged raw only for complete queries and stale raw is not reused after a failure",async()=>{
 const out=fs.mkdtempSync(path.join(os.tmpdir(),"scholar-d2-"));
 try{
  const scholars=[{id:"S01",tier:"A1",filter:"author.id:A1",edu_topic:false},{id:"S02",tier:"A1",filter:"author.id:A2",edu_topic:false}];
  let runs=await runFetch(scholars,{from:"2026-10-01",to:"2026-10-07",out,getter:pager(201).getter});
  assert.deepEqual(runs.map(r=>[r.status,r.total,r.pages,r.received]),[["ok",201,2,201],["ok",201,2,201]]);
  assert.equal(JSON.parse(fs.readFileSync(path.join(out,"raw","S01_primary.json"),"utf8")).results.length,201);
  const stale=fs.readFileSync(path.join(out,"raw","S02_primary.json"));
  runs=await runFetch(scholars,{from:"2026-10-01",to:"2026-10-07",out,getter:pager(201,{fail:{4:500}}).getter});
  assert.deepEqual(runs.map(r=>r.status),["ok","failed"]);
  assert.match(runs[1].reason,/page 2 failed/);
  assert.deepEqual(fs.readFileSync(path.join(out,"raw","S02_primary.json")),stale);
  const rows=searchRunRows(JSON.parse(fs.readFileSync(path.join(out,"runs.json"),"utf8")).runs,{runDate:"2026-10-08",label:"t",details:"d"});
  assert.match(rows[1],/"query_scoped","unavailable","","","",/);
  assert.match(rows[0],/,"ok","201",/);
  assert.match(rows[0],/to_publication_date:2026-10-07&per_page=200",/);
  assert.deepEqual(fs.readdirSync(path.join(out,"raw")).filter(f=>f.endsWith(".tmp")),[]);
 }finally{fs.rmSync(out,{recursive:true,force:true})}
});
