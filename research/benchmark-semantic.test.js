"use strict";
const {test}=require("node:test"),assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path");
const {triage,evaluate}=require("./benchmark-semantic.js");
const data=JSON.parse(fs.readFileSync(path.join(__dirname,"benchmarks/semantic-cases-2026-10.json"),"utf8"));
test("paired synthetic dataset has ten groups and 30 cases",()=>{
 assert.equal(data.cases.length,30);
 const groups=new Set(data.cases.map(x=>x.source_group));assert.equal(groups.size,10);
 for(const id of groups){const a=data.cases.filter(x=>x.source_group===id);assert.equal(a.length,3);assert.equal(a.filter(x=>x.expected==="unsupported").length,2)}
});
test("all case labels are explicitly provisional",()=>assert.ok(data.cases.every(x=>x.gold_status==="provisional_editorial_label")));
test("no automatic semantic approval",()=>{for(const c of data.cases)assert.equal(triage(c.claim).decision,"review")});
test("baseline is reproducible including two misses",()=>{const r=evaluate(data.cases);assert.deepEqual([r.total,r.TP,r.FN,r.FP,r.TN],[30,18,2,1,9]);assert.deepEqual(r.undetected,["N01-SUBTLE","N04-SUBTLE"])});
test("obvious causal overclaim and policy mandate receive warnings",()=>{assert.ok(triage("實驗證明所有中小學生學業成績顯著提升").flags.length);assert.ok(triage("全國學校必須強制開設課程").flags.length)});
