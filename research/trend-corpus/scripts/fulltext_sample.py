# 全文對照抽樣（方案 4.5／PROTOCOL 第 8 節，種子用途 3）：學段已知／不明 × gold（含 diamond）／hybrid／green 分層，最大餘數法配 20 篇；各層依種子排序，讀不到依序遞補。
# 授權：cc-by、cc-by-nc、cc-by-nd、cc-by-nc-nd、cc0／public-domain（DEV-007）。用法：python3 -I fulltext_sample.py ../2025/corpus-v2.csv（需 oa.json）
import csv,json,sys,random,collections
corp={x['work_id']:x for x in csv.DictReader(open(sys.argv[1])) if x['ai_lit_class'] in ('A','B')}
oa=json.load(open('oa.json'))
OK={'cc-by','cc-by-nc','cc-by-nd','cc-by-nc-nd','cc0','public-domain'}
el={}
for w,v in oa.items():
    locs=[l for l in v['locs'] if l['is_oa'] and l['lic'] in OK]
    if not locs: continue
    st=v['oa']['oa_status']; og='gold' if st in('gold','diamond') else ('hybrid' if st=='hybrid' else 'green')
    sg='known' if corp[w]['stage'] not in ('','unknown') else 'unknown'
    el[w]=(sg,og,locs)
strata=collections.defaultdict(list)
for w,(sg,og,_) in el.items(): strata[(sg,og)].append(w)
tot=sum(len(v) for v in strata.values()); N=20
q={k:N*len(v)/tot for k,v in strata.items()}; a={k:int(q[k]) for k in q}
for k in sorted(q,key=lambda k:(-(q[k]-a[k]),k))[:N-sum(a.values())]: a[k]+=1
rng=random.Random(20261010+2025*10+3); order={}
for k in sorted(strata):
    ids=sorted(strata[k]); rng.shuffle(ids); order['|'.join(k)]={'n':len(ids),'quota':a[k],'order':[{'work_id':i,'class':corp[i]['ai_lit_class'],'stage':corp[i]['stage'],'title':corp[i]['title'][:90],'doi':corp[i]['doi'],'locs':[(l['src'],l['lic'],l['ver'],l['url'],l['pdf']) for l in el[i][2]]} for i in ids]}
json.dump(order,open('ft-order.json','w'),ensure_ascii=False,indent=1)
print('eligible',tot,{k:(v['n'],v['quota']) for k,v in order.items()})
