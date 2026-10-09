"use strict";
/**
 * Conservative, typed assertion vs. source fact comparisons.
 * Neither parses arbitrary prose nor authenticates external primary sources.
 * This tool NEVER returns a publish decision.
 */
const fs=require("node:fs");
const OPS=new Set(["eq","gt","gte","lt","lte"]);
const FIELDS={
 "sample.initial_recruited":{type:"integer",scope:"source"},
 "sample.analysed":{type:"integer",scope:"source"},
 "sample.experimental":{type:"integer",scope:"source"},
 "sample.control":{type:"integer",scope:"source"},
 "sample.population":{type:"string",scope:"source"},
 "study.design":{type:"string",scope:"source"},
 "study.task":{type:"string",scope:"source"},
 "event.participant_countries":{type:"integer",scope:"source"},
 "event.kind":{type:"string",scope:"source"},
 "policy.binding_mandate":{type:"boolean",scope:"source"},
 "outcome.randomized_learning_result_reported":{type:"boolean",scope:"source"}
};
function validValue(type,v){return type==="integer"?Number.isSafeInteger(v)&&v>=0:type==="boolean"?typeof v==="boolean":typeof v==="string"&&v.trim().length>0;}
function validateCard(card){
 const errors=[];
 if(!card||typeof card!=="object"||Array.isArray(card))return ["invalid card"];
 if(typeof card.card_id!=="string"||!card.card_id.trim())errors.push("missing card_id");
 if(typeof card.source_url!=="string"||!/^https:\/\/[^ /]+/.test(card.source_url))errors.push("invalid source_url");
 if(!["publisher_index_excerpt","saved_primary_excerpt","full_primary_snapshot"].includes(card.evidence_level))errors.push("invalid evidence_level");
 if(card.evidence_level==="full_primary_snapshot"&&card.full_text_verified!==true)errors.push("full_snapshot level cannot be claimed without full_text_verified");
 if(!Array.isArray(card.facts)||!card.facts.length){errors.push("no facts");return errors;}
 const seen=new Set();
 for(const fact of card.facts){
  if(!fact||typeof fact!=="object"||Array.isArray(fact)||typeof fact.key!=="string"||!Object.hasOwn(FIELDS,fact.key)){errors.push("unrecognized fact key");continue;}
  if(seen.has(fact.key))errors.push("duplicate fact key "+fact.key);seen.add(fact.key);
  if(!validValue(FIELDS[fact.key].type,fact.value))errors.push("invalid value "+fact.key);
  if(typeof fact.locator!=="string"||fact.locator.trim().length<8)errors.push("missing locator "+fact.key);
  if(typeof fact.excerpt!=="string"||fact.excerpt.trim().length<12)errors.push("missing excerpt "+fact.key);
  if(fact.evidence_checked!==false)errors.push("fact must remain evidence_checked:false until independently verified "+fact.key);
 }
 return errors;
}
function compare(card,claim){
 const errors=validateCard(card);
 if(!claim||typeof claim!=="object"||Array.isArray(claim))errors.push("invalid claim");
 else if(claim.assertions!==undefined&&(!Array.isArray(claim.assertions)||claim.assertions.some(a=>!a||typeof a!=="object"||Array.isArray(a)||typeof a.key!=="string")))errors.push("invalid assertions");
 if(errors.length)return {status:"invalid_input",reason:errors,publication_decision:"hold"};
 if(claim.source_id!==card.card_id)return {status:"invalid_input",reason:["source/card mismatch"],publication_decision:"hold"};
 if(!Array.isArray(claim.assertions)||!claim.assertions.length)return {status:"cannot_determine",reason:["no structured assertions"],publication_decision:"hold"};
 const matches=[],conflicts=[],unknowns=[];
 const factMap=new Map(card.facts.map(f=>[f.key,f]));
 for(const a of claim.assertions){
  const info=Object.hasOwn(FIELDS,a.key)?FIELDS[a.key]:undefined;
  if(!info||!OPS.has(a.op)||!validValue(info.type,a.value)||(info.type!=="integer"&&a.op!=="eq")){
   unknowns.push({key:a?.key||"",reason:"invalid_or_unsupported_assertion"});continue;
  }
  const f=factMap.get(a.key);
  if(!f){unknowns.push({key:a.key,reason:"no_source_fact"});continue;}
  const value=f.value,target=a.value;
  const okay=a.op==="eq"?value===target:a.op==="gt"?value>target:a.op==="gte"?value>=target:a.op==="lt"?value<target:value<=target;
  const item={key:a.key,expected:target,recorded:value,op:a.op,locator:f.locator,excerpt:f.excerpt};
  (okay?matches:conflicts).push(item);
 }
 const status=conflicts.length?"conflict_with_entered_evidence":unknowns.length?"cannot_determine":"consistent_with_entered_evidence";
 return {status,matches,conflicts,unknowns,
  evidence_level:card.evidence_level,
  full_text_verified:card.full_text_verified===true,
  note:"All findings compare manually structured values, not original source truth or full natural-language semantics.",
  publication_decision:"hold"};
}
function evaluate(data){
 if(!data||!Array.isArray(data.cards)||!Array.isArray(data.cases))throw Error("cards and cases required");
 const map=new Map(data.cards.map(x=>[x?.card_id,x]));
 if(map.size!==data.cards.length)throw Error("duplicate card IDs");
 return data.cases.map(c=>({case_id:c?.case_id,...compare(map.get(c?.source_id),c)}));
}
if(require.main===module){
 try{
  const input=process.argv[2];if(!input)throw Error("Usage: node research/compare-source-facts.js path/to/cases.json");
  const result=evaluate(JSON.parse(fs.readFileSync(input,"utf8")));
  process.stdout.write(JSON.stringify({notice:"STRUCTURAL TRIAGE ONLY — NOT SOURCE AUTHENTICATION OR PUBLICATION",results:result},null,2)+"\n");
  if(result.some(x=>x.status==="invalid_input"))process.exitCode=1;
 }catch(e){console.error(e.message);process.exitCode=1;}
}
module.exports={compare,evaluate,validateCard};
