"use strict";
const {test}=require("node:test"),assert=require("node:assert/strict");
const {field,aggregate,render}=require("./summarize-reader-feedback.js");
const body="### 回饋類別\n\n新聞或政策解讀過度\n\n### 正確性評分\n\n2 - 存在明顯問題\n\n### 易讀性與解讀清晰度\n\n4 - 清晰\n";
const fixture=[{number:7,title:"[讀者回饋] 讀者輸入的隱私資訊 private@example.test",state:"open",created_at:"2026-10-10T12:00:00Z",body,html_url:"https://github.com/a/b/issues/7"},{number:8,title:"[讀者回饋] 舊問題",created_at:"2026-09-20T12:00:00Z",body},{number:9,title:"一般議題",created_at:"2026-10-10T12:00:00Z",body},{number:10,title:"[讀者回饋] PR",created_at:"2026-10-10T12:00:00Z",body,pull_request:{url:"https://example.com"}}];
test("form labels are extracted correctly",()=>{assert.equal(field(body,"回饋類別"),"新聞或政策解讀過度");assert.equal(field(body,"正確性評分")[0],"2")});
test("only actual reader issues in period count",()=>{const a=aggregate(fixture,"2026-10-08T00:00:00Z","2026-10-15T00:00:00Z");assert.equal(a.count,1);assert.deepEqual(a.accuracies,{"2":1});assert.deepEqual(a.clarities,{"4":1})});
test("aggregation excludes empty or malformed scores",()=>{const a=aggregate([{...fixture[0],body:"### 回饋類別\n\n_No response_"}],"2026-10-08T00:00:00Z","2026-10-15T00:00:00Z");assert.equal(a.count,1);assert.equal(Object.keys(a.accuracies).length,0)});
test("render explains ratings are not factual certification",()=>{const a=aggregate(fixture,"2026-10-08T00:00:00Z","2026-10-15T00:00:00Z");const s=render(a,"2026-10-08T00:00:00Z","2026-10-15T00:00:00Z");assert.match(s,/不是事實查核結果/);assert.match(s,/未評分 n=0/);assert.match(s,/#7/);assert.doesNotMatch(s,/private@example.test/)});

test("supports renamed reader-perceived credibility rating",()=>{const b=body.replace("正確性評分","內容可信度感受（不是事實查核結果）");const a=aggregate([{...fixture[0],body:b}],"2026-10-08T00:00:00Z","2026-10-15T00:00:00Z");assert.equal(a.accuracy_n,1)});
test("denominators show opt-outs and closed does not mean corrected",()=>{const a=aggregate([{...fixture[0],state:"closed",body:"### 回饋類別\n\n文章清晰度與易讀性"}],"2026-10-08T00:00:00Z","2026-10-15T00:00:00Z");const t=render(a,"2026-10-08T00:00:00Z","2026-10-15T00:00:00Z");assert.match(t,/未評分 n=1/);assert.match(t,/關閉不代表已驗證或修正/);assert.doesNotMatch(t,/private@example.test/)});
