"use strict";
const test=require("node:test"),assert=require("node:assert");
const {issuedPagesTouched}=require("./check-daily-pr-scope.js");
test("daily PR scope: issued weekly and monthly pages are flagged, list pages and daily pages are not",()=>{
 assert.deepEqual(issuedPagesTouched(["daily/2026-10-18/index.html","daily/index.html","weekly/index.html","monthly/index.html","index.html","publication/issues.json"]),[]);
 assert.deepEqual(issuedPagesTouched(["weekly/2026-10-09_10-15/index.html","monthly/2026-10/index.html","daily/2026-10-18/index.html"]),["weekly/2026-10-09_10-15/index.html","monthly/2026-10/index.html"]);
});
