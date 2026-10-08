"use strict";
const {test}=require("node:test"),assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path");
const root=path.resolve(__dirname,".."),read=p=>fs.readFileSync(path.join(root,p),"utf8");
test("Google Forms URL is removed and provider disabled",()=>{
 const config=read("feedback/no-login-config.js");
 assert.match(config,/publicFormUrl:\s*null/);
 assert.match(config,/privacyNoticeUrl:\s*null/);
 assert.match(config,/provider:\s*null/);
 assert.match(config,/receiptVerified:\s*false/);
 assert.ok(!config.includes("forms/d/e/"));
});
test("old no-login URL clearly says paused without collecting data",()=>{
 const page=read("feedback/no-login/index.html");
 assert.match(page,/免登入回饋功能暫停/);
 assert.match(page,/不在此頁收集、儲存或提交任何資料/);
 assert.match(page,/issues\/new\?template=reader-feedback.yml/);
 assert.ok(!/<form\b/i.test(page));
 assert.ok(!/href="https:\/\/docs\.google\.com\/forms\//.test(page));
});
test("primary feedback page offers GitHub and does not promote no-login route",()=>{
 const page=read("feedback/index.html");
 assert.match(page,/Google 表單功能已暫停/);
 assert.match(page,/GitHub Issues/);
 assert.ok(!page.includes('href="no-login/"'));
});
test("privacy notice remains accessible as an archival explanation",()=>{
 const page=read("feedback/privacy/index.html");
 assert.match(page,/Google 隱私權政策/);
});
