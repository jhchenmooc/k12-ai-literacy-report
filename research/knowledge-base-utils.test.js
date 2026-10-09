"use strict";
const {test}=require("node:test"),assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path");
const {normalizeDoi,strictUrl,compare,compareAgainst,safeCell,csv}=require("./knowledge-base-utils.js");
const {parseCsv}=require("./validate-knowledge-base.js");
const rows=parseCsv(fs.readFileSync(path.join(__dirname,"knowledge-base","data","records.csv"),"utf8"));
test("DOI normalized but no automatic merging of different manifestations",()=>{
 assert.equal(normalizeDoi("https://doi.org/10.1234/ABC"),"10.1234/abc");
 assert.equal(normalizeDoi("https://dx.doi.org/10.1234/abc"),"10.1234/abc");
 const a={doi:"10.1234/abc",primary_url:"https://publisher.example/a",title:"A"};
 const b={doi:"https://doi.org/10.1234/ABC",primary_url:"https://preprint.example/a",title:"B"};
 assert.equal(compare(a,b).status,"review_same_doi");
});
test("case sensitive paths and arbitrary identity query params stay distinct",()=>{
 assert.notEqual(strictUrl("https://example.org/Doc?id=1"),strictUrl("https://example.org/doc?id=1"));
 assert.notEqual(strictUrl("https://example.org/doc?key=1"),strictUrl("https://example.org/doc?key=2"));
 assert.equal(compare({primary_url:"https://example.org/Doc"},{primary_url:"https://example.org/doc"}).status,"distinct_or_unknown");
 assert.equal(strictUrl("http://example.org/"),"");
 assert.equal(strictUrl("https://a:b@example.org/x"),"");
});
test("repeated source and same title are review flags only",()=>{
 const x=rows[0];assert.equal(compareAgainst(rows,{primary_url:x.primary_url,title:x.title}).length,1);
 assert.equal(compare({title:"same",primary_url:"https://a.example/a"},{title:"Same",primary_url:"https://b.example/b"}).status,"review_same_title");
});
test("safe export neutralizes spreadsheet formulas but preserves original record",()=>{
 const values=["=2+2","+SUM(A1)","-1+2","@SUM(A1)","  =HYPERLINK(1)","\t=1+1"];
 const rows0=values.map(title=>({title}));
 const output=csv(rows0,["title"],{spreadsheetSafe:true});
 const parsed=parseCsv(output);
 assert.ok(parsed.every(x=>x.title.startsWith("'")));
 assert.deepEqual(rows0.map(x=>x.title),values);
 assert.equal(safeCell("Legitimate AI literacy article"),"Legitimate AI literacy article");
 assert.equal(csv([{title:"A, \"B\""}],["title"]), 'title\r\n"A, ""B"""\r\n');
});
test("same source re-scanning does not manufacture a second KB record",()=>{
 const candidate=rows[0];
 assert.equal(compareAgainst(rows,{primary_url:candidate.primary_url,title:candidate.title})[0].status,"review_same_url");
 assert.ok(rows.filter(x=>x.source_candidate_id).length>=9);
});
