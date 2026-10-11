"use strict";
/* Daily tag line: fixed labels derived only from a claim's audience, ai_lit_class and ai_lit_dims.
 * Shared by the renderer and the publication gate, which accepts the line only when its text equals
 * dailyTagText(claim) (manager decision 2026-10-11). Tags are AI judgments, not verified facts. */
/* AI-literacy scope and framework dimensions (AI judgment against the Taiwan MOE framework); also used by the archive. */
const AILIT_TAGS=[["AILIT_A","AI素養核心"],["AILIT_B","AI工具應用"],["S-BAS","學生AI基礎與技術"],["S-ETH","學生AI倫理"],["S-LRN","學生AI賦能學習"],["S-SYS","學生AI系統設計"],["T-BAS","教師AI基礎與技術"],["T-ETH","教師AI倫理"],["T-TEA","教師AI賦能教學"],["T-PD","教師AI專業發展"]];
const DAILY_AUDIENCE_TAGS={k12:"中小學",other_stakeholders:"家長行政"};
function dailyTagList(c){
 const dims=new Set(Array.isArray(c.ai_lit_dims)?c.ai_lit_dims:[]);
 return [DAILY_AUDIENCE_TAGS[c.audience]].concat(AILIT_TAGS.filter(([k])=>k==="AILIT_"+c.ai_lit_class||dims.has(k)).map(([,t])=>t)).filter(Boolean);
}
function dailyTagText(c){return dailyTagList(c).map(t=>"#"+t).join(" ")}
module.exports={AILIT_TAGS,DAILY_AUDIENCE_TAGS,dailyTagList,dailyTagText};
