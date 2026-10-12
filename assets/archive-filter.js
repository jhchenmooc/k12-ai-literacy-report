"use strict";
/* Tag filter for the journal and conference lists (manager 2026-10-12).
   Progressive enhancement: without scripts every record stays visible and the filter panel stays hidden.
   Tags are AI judgments from titles and abstracts; filtered counts are a finding aid, not statistics.
   Rule: within one group any checked tag matches; across groups all must match. "All" makes every checked tag required.
   Shared code review boundary: changes need the same review as research/render-site.js. */
(function(){
 function matches(tags,selected,all){
  for(const want of selected){
   if(!want.length)continue;
   if(all?!want.every(t=>tags.has(t)):!want.some(t=>tags.has(t)))return false;
  }
  return true;
 }
 if(typeof module!=="undefined"&&module.exports){module.exports={matches};return}
 const panel=document.getElementById("tag-filter");if(!panel)return;
 const boxes=Array.from(panel.querySelectorAll("input[data-tag]"));
 const fieldsBox=panel.querySelector("details.tf-fields"),count=panel.querySelector(".tf-count");
 const allBox=document.getElementById("tf-all"),clear=document.getElementById("tf-clear"),status=document.getElementById("tf-status");
 const rows=Array.from(document.querySelectorAll(".rec-table tbody tr")).map(tr=>({tr,tags:new Set((tr.getAttribute("data-tags")||"").split("|").filter(Boolean)),year:tr.getAttribute("data-year"),group:tr.closest("section.group")}));
 const groups=Array.from(document.querySelectorAll("section.group"));
 const indexRows=Array.from(document.querySelectorAll(".index-table tbody tr[data-g]"));
 for(const tr of indexRows)for(const td of tr.querySelectorAll("td[data-y]")){
  const a=td.querySelector("a");if(!a)continue;
  const dash=document.createElement("span");dash.className="dash";dash.textContent="—";dash.hidden=true;td.appendChild(dash);
 }
 let active=false;
 function selected(){
  const by=new Map();
  for(const b of boxes)if(b.checked){const g=b.getAttribute("data-group");if(!by.has(g))by.set(g,[]);by.get(g).push(b.getAttribute("data-tag"))}
  return Array.from(by.values());
 }
 function writeUrl(){
  try{
   const u=new URL(location.href);u.searchParams.delete("tag");u.searchParams.delete("all");
   for(const b of boxes)if(b.checked)u.searchParams.append("tag",b.getAttribute("data-tag"));
   if(allBox.checked)u.searchParams.set("all","1");
   history.replaceState(null,"",u.pathname+u.search+u.hash);
  }catch(e){/* history may be unavailable in previews; the filter still works */}
 }
 function apply(save){
  const sel=selected(),all=allBox.checked;active=sel.length>0;
  const shown=new Map();let n=0;
  for(const r of rows){
   const ok=!active||matches(r.tags,sel,all);r.tr.hidden=!ok;
   if(!ok)continue;n++;
   const k=r.group?r.group.id:"";if(!shown.has(k))shown.set(k,new Map());
   const m=shown.get(k);m.set(r.year,(m.get(r.year)||0)+1);
  }
  for(const g of groups){
   const m=shown.get(g.id);g.hidden=!m;
   const s=g.querySelector(".shown");if(s){let c=0;if(m)for(const v of m.values())c+=v;s.textContent=active&&m?"・篩選後 "+c+" 筆":""}
  }
  for(const tr of indexRows){
   const m=shown.get(tr.getAttribute("data-g"));tr.hidden=!m;
   let sum=0;
   for(const td of tr.querySelectorAll("td[data-y]")){
    const a=td.querySelector("a"),dash=td.querySelector(".dash");if(!a)continue;
    const c=active?(m&&m.get(td.getAttribute("data-y")))||0:Number(a.getAttribute("data-n"));sum+=c;
    a.hidden=!c;dash.hidden=!!c;td.classList.toggle("none",!c);
    if(c){a.textContent=String(c);a.setAttribute("aria-label",a.getAttribute("data-label")+c+" 筆")}
   }
   const t=tr.querySelector("td.total");if(t)t.textContent=String(active?sum:t.getAttribute("data-n"));
  }
  status.textContent=active?"符合 "+n+"／"+rows.length+" 筆":"未篩選，共 "+rows.length+" 筆";
  const k=boxes.filter(b=>b.checked).length;if(count)count.textContent=k?"（已勾 "+k+" 個）":"";
  clear.disabled=!active;
  if(save)writeUrl();
 }
 /* With a filter on, the first record of a year may be hidden: jump to the first visible one instead. */
 document.addEventListener("click",ev=>{
  const a=ev.target.closest&&ev.target.closest(".index-table td[data-y] a");
  if(!a||!active)return;
  const g=a.closest("tr").getAttribute("data-g"),y=a.closest("td").getAttribute("data-y");
  const hit=rows.find(r=>!r.tr.hidden&&r.group&&r.group.id===g&&r.year===y);
  if(!hit)return;
  ev.preventDefault();
  hit.tr.tabIndex=-1;hit.tr.scrollIntoView({block:"start"});hit.tr.focus({preventScroll:true});
 });
 panel.addEventListener("change",()=>apply(true));
 clear.addEventListener("click",()=>{for(const b of boxes)b.checked=false;allBox.checked=false;apply(true)});
 try{
  const p=new URLSearchParams(location.search),want=new Set(p.getAll("tag"));
  for(const b of boxes)b.checked=want.has(b.getAttribute("data-tag"));
  allBox.checked=p.get("all")==="1";
 }catch(e){}
 /* On narrow screens the tag list is long: start folded unless the link already carries a filter. */
 try{if(fieldsBox&&window.matchMedia("(max-width:700px)").matches&&!boxes.some(b=>b.checked))fieldsBox.open=false}catch(e){}
 panel.hidden=false;
 apply(false);
})();
