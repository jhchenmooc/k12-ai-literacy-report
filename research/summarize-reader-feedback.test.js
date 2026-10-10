"use strict";
const {test}=require("node:test"),assert=require("node:assert/strict");
const {field,aggregate,render}=require("./summarize-reader-feedback.js");
const fs=require("node:fs"),path=require("node:path"),vm=require("node:vm");
const body="### 回饋類別\n\n新聞或政策解讀過度\n\n### 正確性評分\n\n2 - 存在明顯問題\n\n### 易讀性與解讀清晰度\n\n4 - 清晰\n";
const fixture=[{number:7,title:"[讀者回饋] 讀者輸入的隱私資訊 private@example.test",state:"open",created_at:"2026-10-10T12:00:00Z",body,html_url:"https://github.com/a/b/issues/7"},{number:8,title:"[讀者回饋] 舊問題",created_at:"2026-09-20T12:00:00Z",body},{number:9,title:"一般議題",created_at:"2026-10-10T12:00:00Z",body},{number:10,title:"[讀者回饋] PR",created_at:"2026-10-10T12:00:00Z",body,pull_request:{url:"https://example.com"}}];
test("form labels are extracted correctly",()=>{assert.equal(field(body,"回饋類別"),"新聞或政策解讀過度");assert.equal(field(body,"正確性評分")[0],"2")});
test("only actual reader issues in period count",()=>{const a=aggregate(fixture,"2026-10-08T00:00:00Z","2026-10-15T00:00:00Z");assert.equal(a.count,1);assert.deepEqual(a.accuracies,{"2":1});assert.deepEqual(a.clarities,{"4":1})});
test("aggregation excludes empty or malformed scores",()=>{const a=aggregate([{...fixture[0],body:"### 回饋類別\n\n_No response_"}],"2026-10-08T00:00:00Z","2026-10-15T00:00:00Z");assert.equal(a.count,1);assert.equal(Object.keys(a.accuracies).length,0)});
test("render explains ratings are not factual certification",()=>{const a=aggregate(fixture,"2026-10-08T00:00:00Z","2026-10-15T00:00:00Z");const s=render(a,"2026-10-08T00:00:00Z","2026-10-15T00:00:00Z");assert.match(s,/不是事實查核結果/);assert.match(s,/未評分 n=0/);assert.match(s,/#7/);assert.doesNotMatch(s,/private@example.test/)});

test("supports renamed reader-perceived credibility rating",()=>{const b=body.replace("正確性評分","內容可信度感受（不是事實查核結果）");const a=aggregate([{...fixture[0],body:b}],"2026-10-08T00:00:00Z","2026-10-15T00:00:00Z");assert.equal(a.accuracy_n,1)});
test("denominators show opt-outs and closed does not mean corrected",()=>{const a=aggregate([{...fixture[0],state:"closed",body:"### 回饋類別\n\n文章清晰度與易讀性"}],"2026-10-08T00:00:00Z","2026-10-15T00:00:00Z");const t=render(a,"2026-10-08T00:00:00Z","2026-10-15T00:00:00Z");assert.match(t,/未評分 n=1/);assert.match(t,/關閉不代表已驗證或修正/);assert.doesNotMatch(t,/private@example.test/)});

async function runOffline(pageData){
 const source=fs.readFileSync(path.join(__dirname,"summarize-reader-feedback.js"),"utf8"),moduleObj={exports:{}},posts=[],gets=[],errors=[];
 const DateFixed=class extends Date{constructor(...args){super(...(args.length?args:["2026-10-15T12:00:00Z"]));}};
 const sandbox={module:moduleObj,require:{main:moduleObj},Date:DateFixed,console:{log(){},error:e=>errors.push(String(e))},process:{env:{GITHUB_TOKEN:"offline-test",GITHUB_REPOSITORY:"a/b"},exitCode:0},fetch:async(url,options)=>{
  if(options.method==="POST"){posts.push(JSON.parse(options.body));return {ok:true,json:async()=>({html_url:"https://github.com/a/b/issues/2000"})};}
  const page=Number(new URL(url).searchParams.get("page"));gets.push(page);
  const response=pageData(page);if(response instanceof Error)throw response;
  return {ok:true,json:async()=>response};
 }};
 vm.runInNewContext(source.replace('if(require.main===module)run().catch(e=>{console.error(e);process.exitCode=1});','if(require.main===module)globalThis.testRun=run().catch(e=>{console.error(e);process.exitCode=1});'),sandbox);
 await sandbox.testRun;
 return {posts,gets,errors,exitCode:sandbox.process.exitCode};
}
const manyPage=page=>Array.from({length:100},(_,i)=>({...fixture[0],number:(page-1)*100+i+1,title:"[讀者回饋] fixture"}));
test("all 1001 reader submissions are collected before publishing",async()=>{
 const r=await runOffline(page=>page<=10?manyPage(page):page===11?[{...fixture[0],number:1001}]:[]);
 assert.equal(r.gets.length,11);assert.equal(r.posts.length,1);assert.match(r.posts[0].body,/新增讀者回饋：1001 筆/);assert.equal(r.exitCode,0);
});
test("an existing summary after page ten prevents duplicate publication",async()=>{
 const r=await runOffline(page=>page<=10?manyPage(page):[{...fixture[0],number:1001,title:"讀者回饋週整理｜2026-10-08–2026-10-14"}]);
 assert.equal(r.gets.length,11);assert.equal(r.posts.length,0);assert.equal(r.exitCode,0);
});
test("a pull request with the digest title is not an existing summary issue",async()=>{
 const r=await runOffline(()=>[{...fixture[0]},{...fixture[0],number:20,title:"讀者回饋週整理｜2026-10-08–2026-10-14",pull_request:{url:"https://github.com/a/b/pull/20"}}]);
 assert.equal(r.posts.length,1);assert.equal(r.exitCode,0);
});
test("failed or malformed later pages never publish partial summaries",async()=>{
 for(const bad of [new Error("mock network failure"),{message:"unexpected response"}]){
  const r=await runOffline(page=>page<=10?manyPage(page):bad);
  assert.equal(r.gets.length,11);assert.equal(r.posts.length,0);assert.equal(r.exitCode,1);assert.equal(r.errors.length,1);
 }
});
test("an exactly full page requests the empty last page and an empty window does not post",async()=>{
 const r=await runOffline(page=>page===1?manyPage(page):[]);
 assert.deepEqual(r.gets,[1,2]);assert.equal(r.posts.length,1);
 const empty=await runOffline(()=>[]);assert.equal(empty.posts.length,0);
});

test("repeated or overlapping pages fail without publishing or looping",async()=>{
 for(const second of [manyPage(1),[{...fixture[0],number:50},{...fixture[0],number:101}]]){
  const r=await runOffline(page=>page===1?manyPage(1):page===2?second:new Error("must stop before page three"));
  assert.deepEqual(r.gets,[1,2]);assert.equal(r.posts.length,0);assert.equal(r.exitCode,1);
  assert.match(r.errors[0],/duplicate issue number/);
 }
});
test("malformed issue items fail without a partial publication",async()=>{
 for(const bad of [null,[],{}, {...fixture[0],number:"101"},{...fixture[0],number:0},{...fixture[0],number:101,created_at:"not a date"},{...fixture[0],number:101,state:"unknown"}]){
  const r=await runOffline(page=>page===1?manyPage(1):[bad]);
  assert.deepEqual(r.gets,[1,2]);assert.equal(r.posts.length,0);assert.equal(r.exitCode,1);
  assert.match(r.errors[0],/invalid issue item/);
 }
});
