"use strict";
/* Source trace gate: checks whether a source excerpt is really in a pinned
 * local source snapshot. This does not certify translation, context or truth. */
const fs=require("node:fs"),path=require("node:path"),crypto=require("node:crypto");
const {safeFile}=require("./public-site.js");
const SAFE=/^publication\/sources\/[a-zA-Z0-9_-]+\.(txt|md)$/;
function sourceTrace(root,c,options={}){
 const errors=[],claim=c||{};
 if(claim.claim_class==="bibliographic"&&!options.requireBibliographicSnapshot)return errors;
 if(typeof claim.evidence_path!=="string"||!SAFE.test(claim.evidence_path))return ["missing/invalid evidence_path"];
 const full=path.resolve(root,claim.evidence_path),rootSources=path.resolve(root,"publication/sources");
 if(!full.startsWith(rootSources+path.sep))return ["evidence_path outside allowed directory"];
 if(!fs.existsSync(full))return ["source snapshot missing"];
 let bytes;try{bytes=fs.readFileSync(safeFile(root,claim.evidence_path))}catch(e){return ["source snapshot unreadable: "+e.message]}
 const source=bytes.toString("utf8"),sha=crypto.createHash("sha256").update(bytes).digest("hex");
 if(typeof claim.evidence_sha256!=="string"||claim.evidence_sha256!==sha)errors.push("snapshot SHA256 absent or incorrect");
 if(typeof claim.original_excerpt!=="string"||claim.original_excerpt.trim().length<16)errors.push("original_excerpt too short/missing");
 else if(!source.includes(claim.original_excerpt))errors.push("original_excerpt not verbatim in source snapshot");
 if(typeof claim.evidence_source_url!=="string"||claim.evidence_source_url!==claim.source_url)errors.push("evidence source URL not matched to claim");
 if(typeof claim.interpretation_note!=="string"||claim.interpretation_note.trim().length<20)errors.push("interpretation_note missing");
 if(typeof claim.scope_limitation!=="string"||claim.scope_limitation.trim().length<12)errors.push("scope_limitation missing");
 if(!["direct_statement","research_finding","author_opinion","editorial_analysis"].includes(claim.assertion_type))errors.push("assertion_type missing/invalid");
 if(typeof claim.translation_reviewed!=="boolean"||!claim.translation_reviewed)errors.push("translation not reviewed");
 if(claim.assertion_type==="editorial_analysis"&&claim.claim_class==="high_impact"&&!claim.reviewer_id)errors.push("policy recommendation lacks reviewer identity");
 return errors;
}
module.exports={sourceTrace};
