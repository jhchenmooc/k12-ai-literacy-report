"use strict";
/* AI literacy scope fields (research/ai-literacy-scope-criteria.md). Structural only:
 * the labels are self-declared by the screener; this checks presence and form, not
 * whether the classification is correct. */
const CLASSES=["A","B","C","unknown"];
const PUBLISHABLE=["A","B"];
const DIMS=["T-ETH","T-BAS","T-TEA","T-PD","S-ETH","S-BAS","S-LRN","S-SYS"];
// Main audience (mixed audiences are judged by the main one). k12 = kindergarten to
// high-school students and in-service teachers; other_stakeholders = parents,
// principals, education administrators.
const AUDIENCES=["k12","other_stakeholders","teacher_ed","higher_ed","adult","unknown"];
// Which audiences each channel may publish. teacher_ed/higher_ed/adult are kept out
// of daily and weekly candidates; the criteria name no monthly exclusion.
const CHANNEL_AUDIENCES={daily:["k12","other_stakeholders"],weekly:["k12","other_stakeholders"],monthly:["k12","other_stakeholders","teacher_ed","higher_ed","adult"]};
function dimsErrors(dims){
 if(!Array.isArray(dims))return ["ai_lit_dims must be an array"];
 const errors=[];
 if(dims.some(d=>!DIMS.includes(d)))errors.push("ai_lit_dims contains unknown framework code");
 if(new Set(dims).size!==dims.length)errors.push("ai_lit_dims contains duplicates");
 return errors;
}
// Published claims: scope must be A or B, mapped to at least one framework code, with a reason.
function publicationScopeErrors(c){
 const errors=[];
 if(!PUBLISHABLE.includes(c.ai_lit_class))errors.push("AI literacy scope must be A or B to publish (got "+(c.ai_lit_class===undefined?"missing":String(c.ai_lit_class))+")");
 errors.push(...dimsErrors(c.ai_lit_dims));
 if(Array.isArray(c.ai_lit_dims)&&c.ai_lit_dims.length===0)errors.push("ai_lit_dims must name at least one framework code");
 if(typeof c.ai_lit_note!=="string"||c.ai_lit_note.trim().length<8||c.ai_lit_note.length>300||/[\r\n<>]/.test(c.ai_lit_note))errors.push("ai_lit_note missing or invalid");
 return errors;
}
function audienceErrors(c,channel){
 const allowed=CHANNEL_AUDIENCES[channel];
 if(!allowed)return ["unknown publication channel for audience check"];
 if(!AUDIENCES.includes(c.audience))return ["audience missing or invalid (got "+(c.audience===undefined?"missing":String(c.audience))+")"];
 if(!allowed.includes(c.audience))return ["audience "+c.audience+" is not allowed in "+channel+" editions"];
 return [];
}
// Discovery candidates: optional; missing class is recorded as unknown, malformed input fails closed.
function candidateScope(c){
 const cls=c.ai_lit_class===undefined?"unknown":c.ai_lit_class;
 if(!CLASSES.includes(cls))throw Error("invalid ai_lit_class");
 const dims=c.ai_lit_dims===undefined?[]:c.ai_lit_dims;
 const de=dimsErrors(dims);if(de.length)throw Error(de[0]);
 const note=c.ai_lit_note===undefined?"":c.ai_lit_note;
 if(typeof note!=="string"||note.length>300||/[\r\n<>]/.test(note))throw Error("invalid ai_lit_note");
 const audience=c.audience===undefined?"unknown":c.audience;
 if(!AUDIENCES.includes(audience))throw Error("invalid audience");
 return {ai_lit_class:cls,ai_lit_dims:dims,ai_lit_note:note,audience};
}
module.exports={CLASSES,PUBLISHABLE,DIMS,AUDIENCES,CHANNEL_AUDIENCES,publicationScopeErrors,audienceErrors,candidateScope};
