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
test("configured public form is staged, never claims verified receipt",()=>{
 const config=read("feedback/no-login-config.js");
 const page=read("feedback/no-login/index.html");
 assert.match(config,/publicFormUrl:\s*"https:\/\/docs\.google\.com\/forms\/d\/e\//);
 assert.match(config,/privacyNoticeUrl:\s*"https:\/\/jhchenmooc\.github\.io\//);
 assert.match(config,/receiptVerified:\s*false/);
 assert.match(page,/收件功能待驗收/);
 assert.match(page,/是否能實際送出/);
 assert.ok(!/<form\b/i.test(page),"External collection must never look like an internal fake form");
});
test("no-login endpoint uses HTTPS allowlist and blocks empty/unknown services",()=>{
 const page=read("feedback/no-login/index.html");
 assert.match(page,/docs\\.google\\.com/);
 assert.match(page,/forms\\.gle/);
 assert.match(page,/!allowed/);
 assert.ok(page.includes("!/^https:"));
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

test("privacy notice is published and never overclaims no-login or data retention",()=>{const page=read("feedback/privacy/index.html");assert.match(page,/是否要求登入/);assert.match(page,/Google 隱私權政策/);assert.match(page,/不保證固定刪除期限/);assert.match(page,/自願提供/)});
