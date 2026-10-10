# 第一次（corpus-v2）對第二次編碼（out/batch*.jsonl）的一致率與 Cohen κ；寫 agreement.csv（另加「雙方皆 K-12 對象的 A 類」面向列見 2025/agreement.csv）。
# 用法：python3 -I agreement_kappa.py ../2025/corpus-v2.csv（在含 sample.json 與 out/ 的目錄執行）
import csv,json,sys,glob,collections,math
corp={x['work_id']:x for x in csv.DictReader(open(sys.argv[1]))}
c2={}
for f in sorted(glob.glob('out/batch*.jsonl')):
    for l in open(f):
        if l.strip(): o=json.loads(l); c2[o['work_id']]=o
S=json.load(open('sample.json')); ids=[s['work_id'] for s in S]
missing=[i for i in ids if i not in c2]; print('coded',len(c2),'missing',missing)
ids=[i for i in ids if i in c2]
def kappa(a,b):
    n=len(a); 
    if n==0: return None,None
    po=sum(x==y for x,y in zip(a,b))/n
    ca,cb=collections.Counter(a),collections.Counter(b)
    pe=sum(ca[k]*cb[k] for k in set(ca)|set(cb))/n/n
    return po,(po-pe)/(1-pe) if pe<1 else None
def lst(v):
    if isinstance(v,list): return v
    try: return json.loads(v) if v and v.startswith('[') else [t for t in (v or '').replace(';',',').split(',') if t.strip()]
    except: return []
rows=[]
def rep(name,a,b,pos=None,unk='unknown'):
    po,k=kappa(a,b)
    keep=[(x,y) for x,y in zip(a,b) if not (x==unk and y==unk)]
    po2,k2=kappa([x for x,_ in keep],[y for _,y in keep])
    ur1=sum(x==unk for x in a)/len(a); ur2=sum(y==unk for y in b)/len(b)
    npos='' if pos is None else sum(x==pos or y==pos for x,y in zip(a,b))
    rows.append([name,len(a),round(po,3),None if k is None else round(k,3),len(keep),None if po2 is None else round(po2,3),None if k2 is None else round(k2,3),round(ur1,3),round(ur2,3),npos])
g1=lambda f:[corp[i][f] or '' for i in ids]; g2=lambda f:[c2[i].get(f) or '' for i in ids]
cls1,cls2=g1('ai_lit_class'),g2('ai_lit_class')
rep('A vs non-A',[('A' if x=='A' else 'nonA') for x in cls1],[('A' if x=='A' else 'nonA') for x in cls2],pos='A',unk='__')
rep('A/B/C/unknown',cls1,cls2)
ab=[i for i in ids if corp[i]['ai_lit_class'] in 'AB' and c2[i]['ai_lit_class'] in ('A','B')]
rep('A vs B (both A/B)',[corp[i]['ai_lit_class'] for i in ab],[c2[i]['ai_lit_class'] for i in ab],pos='A',unk='__')
sub=[i for i in ids if corp[i]['ai_lit_class'] in ('A','B') or c2[i]['ai_lit_class'] in ('A','B')]
for f in ('audience_role','stage','method'):
    rep(f+' (A/B either)',[corp[i][f] or 'unknown' for i in sub],[c2[i].get(f) or 'unknown' for i in sub])
dims=['T-PD','T-TEA','T-BAS','T-ETH','S-SYS','S-LRN','S-BAS','S-ETH']
for d in dims:
    rep('dim '+d,[d in lst(corp[i]['ai_lit_dims']) for i in sub],[d in lst(c2[i].get('ai_lit_dims')) for i in sub],pos=True,unk='__')
w=csv.writer(open('agreement.csv','w'));w.writerow(['dimension','n','agree','kappa','n_excl_both_unknown','agree_excl','kappa_excl','unknown_rate_c1','unknown_rate_c2','n_positive_either'])
w.writerows(rows)
for r in rows: print(r)
print('model_ids',collections.Counter(c2[i].get('model_id') for i in ids))
cm=collections.Counter((corp[i]['ai_lit_class'],c2[i]['ai_lit_class']) for i in ids); print('class crosstab',sorted(cm.items()))
