"use strict";
const {test}=require("node:test"),assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path");
const root=path.join(__dirname,"..");
function read(p){return fs.readFileSync(path.join(root,p),"utf8")}
test("issue feedback form offers both ratings and specific correction evidence",()=>{
 const s=read(".github/ISSUE_TEMPLATE/reader-feedback.yml");
 for(const x of ["正確性評分","易讀性與解讀清晰度","回饋類別","報告頁面網址","具體問題與改善建議","可供核對的原始來源連結","required: true"])assert.ok(s.includes(x),x);
 assert.ok(s.includes("[讀者回饋]"));
});
test("feedback form and login notice are linked from homepage and both archived reports",()=>{
 const places=["index.html","weekly/2026-09-29_10-08/index.html","monthly/2026-09/index.html"];
 for(const p of places){const s=read(p);assert.ok(s.includes("feedback/"),p);assert.ok(s.includes("GitHub"),p)}
});
test("feedback page has working repository issue template url and public privacy warning",()=>{
 const s=read("feedback/index.html");assert.ok(s.includes("https://github.com/jhchenmooc/k12-ai-literacy-report/issues/new?template=reader-feedback.yml"));
 assert.ok(s.includes("個資"));assert.ok(s.includes("公開"));assert.ok(s.includes("1–5"));
});
test("digest schedule aggregates issues rather than writing unverified correction automatically",()=>{
 const workflow=read(".github/workflows/reader-feedback-digest.yml");
 assert.ok(workflow.includes("issues: write"));
 assert.ok(workflow.includes("summarize-reader-feedback.js"));
 const code=read("research/summarize-reader-feedback.js");
 assert.ok(code.includes('startsWith(PREFIX)'));
 assert.ok(code.includes("不代表新聞或論文經正式驗證"));
});
