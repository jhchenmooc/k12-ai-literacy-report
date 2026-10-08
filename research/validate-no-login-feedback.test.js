"use strict";
const {test}=require("node:test"),assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path");
const root=path.resolve(__dirname,"..");
const read=p=>fs.readFileSync(path.join(root,p),"utf8");
test("no-login page and feedback index cross-link",()=>{
 const index=read("feedback/index.html"),page=read("feedback/no-login/index.html");
 assert.ok(index.includes('href="no-login/"'));
 assert.ok(page.includes('href="../"'));
 assert.ok(page.includes('src="../no-login-config.js"'));
});
test("until service configured, no page pretends to submit",()=>{
 const config=read("feedback/no-login-config.js");
 const page=read("feedback/no-login/index.html");
 assert.match(config,/publicFormUrl:\s*null/);
 assert.match(config,/privacyNoticeUrl:\s*null/);
 assert.match(page,/免登入表單尚未開放/);
 assert.match(page,/不會收集或送出/);
 assert.ok(!/<form\b/i.test(page),"Must not provide a deceptive form before a backend is connected");
});
test("no-login endpoint uses HTTPS allowlist and blocks empty/unknown services",()=>{
 const page=read("feedback/no-login/index.html");
 assert.match(page,/docs\\.google\\.com/);
 assert.match(page,/forms\\.gle/);
 assert.match(page,/!allowed/);
 assert.match(page,/!\^https:/);
 assert.match(page,/noopener noreferrer/);
 assert.ok(!page.includes("localStorage"));
 assert.ok(!page.includes("document.cookie"));
});
test("privacy disclosures and report-quality limitation are explicit",()=>{
 const page=read("feedback/no-login/index.html");
 assert.match(page,/個人聯絡資料/);
 assert.match(page,/自選樣本/);
 assert.match(page,/不直接公開/);
 assert.match(page,/尚未同意第三方資料處理條件/);
});
