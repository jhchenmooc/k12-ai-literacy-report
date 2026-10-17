"use strict";
/* A daily PR merges without the manager (permission B) only when it leaves every issued weekly and monthly page
   unchanged. Daily items feed the weekly and monthly lists, so a daily correction or backfill can re-render an issued
   page; such a PR waits for the manager (decision 2026-10-17, A2). Run: node research/check-daily-pr-scope.js [base] */
const {execFileSync}=require("child_process");
const ISSUE_PAGE=/^(weekly|monthly)\/[^/]+\/index\.html$/;
const issuedPagesTouched=paths=>paths.filter(p=>ISSUE_PAGE.test(p));
if(require.main===module){
 // In CI the checkout is the PR merge commit, so a two-dot diff against the fetched base is exactly the PR's change.
 const args=process.argv.slice(2),base=args.find(a=>!a.startsWith("--"))||"origin/main",range=args.includes("--two-dot")?[base,"HEAD"]:[base+"...HEAD"];
 const paths=execFileSync("git",["diff","--name-only",...range],{encoding:"utf8"}).split("\n").filter(Boolean);
 const hit=issuedPagesTouched(paths);
 if(hit.length){console.error("Daily PR changes issued weekly or monthly pages; do not auto-merge, ask the manager:\n"+hit.join("\n"));process.exitCode=1}
 else console.log("Daily PR leaves issued weekly and monthly pages unchanged ("+paths.length+" files).");
}
module.exports={issuedPagesTouched};
