"use strict";
const {test}=require("node:test"),assert=require("node:assert/strict"),fs=require("node:fs"),os=require("node:os"),path=require("node:path");
const {makeDraft,writeDraft}=require("./scaffold-weekly.js");
test("Friday period is inclusive through Thursday",()=>{const x=makeDraft("2026-10-09");assert.equal(x.data.period.end,"2026-10-15");assert.equal(x.filename,"2026-10-09_2026-10-15.json")});
test("refuses non-Friday and invalid calendar input",()=>{for(const x of ["2026-10-10","2026-02-30","2026-10-9","not-a-date"])assert.throws(()=>makeDraft(x))});
test("default risk and source metadata are unverified and held",()=>{const d=makeDraft("2026-10-09").data;assert.equal(d.status,"draft_pending_source_verification");assert.equal(d.items.length,0);assert.equal(d.item_template.source_checked,false);assert.equal(d.item_template.translation_reviewed,false);assert.equal(d.item_template.decision,"hold")});
test("writes draft outside publication; refuses overwrite",t=>{const root=fs.mkdtempSync(path.join(os.tmpdir(),"week-draft-"));t.after(()=>fs.rmSync(root,{recursive:true,force:true}));const out=writeDraft(root,"2026-10-09");assert.match(out,/research\/drafts/);assert.equal(fs.existsSync(out),true);assert.equal(fs.existsSync(path.join(root,"publication","issues.json")),false);assert.throws(()=>writeDraft(root,"2026-10-09"),/EEXIST/)});
