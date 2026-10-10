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
