# 一致性抽樣（方案 4.5，種子用途 2）。用法：python3 -I agreement_sample.py ../2025/corpus-v2.csv → 在目前目錄寫 sample.json。
# A＋B 篩入數 10% 與 50 取大者；C 與 unknown 合計 10（C 9、unknown 1），其餘 A／B 依比例、A／B 內依學段，最大餘數法。
import csv,random,json,sys,math
SEED=20261010+2025*10+2
rows=[x for x in csv.DictReader(open(sys.argv[1],encoding='utf-8',newline='')) if x['ai_lit_class'] in ('A','B','C','unknown')]
ab=sum(x['ai_lit_class'] in 'AB' for x in rows)
N=max(math.ceil(ab*0.10),50)
def lr(total,counts):
    tot=sum(counts.values()); q={k:total*v/tot for k,v in counts.items()}
    a={k:int(q[k]) for k in q}; rem=total-sum(a.values())
    for k in sorted(q,key=lambda k:(-(q[k]-a[k]),k))[:rem]: a[k]+=1
    return a
cls={k:sum(x['ai_lit_class']==k for x in rows) for k in 'A B C unknown'.split()}
NCU=10; NAB=N-NCU
alloc={**lr(NAB,{'A':cls['A'],'B':cls['B']}),'C':NCU-1,'unknown':1}
rng=random.Random(SEED); out=[]; plan={}
for k in ['A','B','C','unknown']:
    pool=[x for x in rows if x['ai_lit_class']==k]
    if k in 'AB':
        st={}
        for x in pool: st[x['stage']]=st.get(x['stage'],0)+1
        sa=lr(alloc[k],st)
        for s in sorted(sa):
            ids=sorted(x['work_id'] for x in pool if x['stage']==s)
            pick=rng.sample(ids,sa[s]) if sa[s] else []
            plan[f'{k}/{s}']=(len(ids),sa[s]); out+=[(i,k,s) for i in pick]
    else:
        ids=sorted(x['work_id'] for x in pool)
        pick=rng.sample(ids,alloc[k]); plan[k]=(len(ids),alloc[k]); out+=[(i,k,'') for i in pick]
print('seed',SEED,'AB',ab,'N',N,json.dumps(plan,ensure_ascii=False))
with open('sample.json','w',encoding='utf-8',newline='') as fh: json.dump([{'work_id':i,'stratum_class':k,'stratum_stage':s} for i,k,s in out],fh,indent=0)
print(len(out))
