# 回溯三年（2022–2024）一致性抽樣（方案 4.5、§10 第 20 項；種子用途 2）。抽樣細節見 DEVIATIONS.csv DEV-012。
# 用法：python3 -I agreement_sample_backfill.py <repo>/research/trend-corpus → 在目前目錄寫 sample.json。
# 每年：N＝A＋B 篩入數 10% 與 30 取大者；C 與 unknown 合計 max(4, round(N×10/125))（比照 2025 的 10/125），
# 其中 unknown 1 篇（該年有 unknown 時），其餘 C；A／B 依比例、A／B 內依學段，最大餘數法（同 agreement_sample.py）。
import csv,random,json,sys,math,os
def lr(total,counts):
    tot=sum(counts.values()); q={k:total*v/tot for k,v in counts.items()}
    a={k:int(q[k]) for k in q}; rem=total-sum(a.values())
    for k in sorted(q,key=lambda k:(-(q[k]-a[k]),k))[:rem]: a[k]+=1
    return a
out=[]
for Y in (2022,2023,2024):
    SEED=20261010+Y*10+2
    rows=[x for x in csv.DictReader(open(os.path.join(sys.argv[1],str(Y),'corpus.csv'))) if x['ai_lit_class'] in ('A','B','C','unknown')]
    cls={k:sum(x['ai_lit_class']==k for x in rows) for k in 'A B C unknown'.split()}
    N=max(math.ceil((cls['A']+cls['B'])*0.10),30); NCU=max(4,round(N*10/125)); NU=1 if cls['unknown'] else 0
    alloc={**lr(N-NCU,{'A':cls['A'],'B':cls['B']}),'C':NCU-NU,'unknown':NU}
    rng=random.Random(SEED); plan={}
    for k in ['A','B','C','unknown']:
        pool=[x for x in rows if x['ai_lit_class']==k]
        if k in 'AB':
            st={}
            for x in pool: st[x['stage']]=st.get(x['stage'],0)+1
            sa=lr(alloc[k],st)
            for s in sorted(sa):
                ids=sorted(x['work_id'] for x in pool if x['stage']==s)
                pick=rng.sample(ids,sa[s]) if sa[s] else []
                plan[f'{k}/{s}']=(len(ids),sa[s]); out+=[(Y,i,k,s) for i in pick]
        else:
            ids=sorted(x['work_id'] for x in pool)
            pick=rng.sample(ids,alloc[k]) if alloc[k] else []; plan[k]=(len(ids),alloc[k]); out+=[(Y,i,k,'') for i in pick]
    print(Y,'seed',SEED,'AB',cls['A']+cls['B'],'N',N,'NCU',NCU,json.dumps(plan,ensure_ascii=False))
json.dump([{'year':y,'work_id':i,'stratum_class':k,'stratum_stage':s} for y,i,k,s in out],open('sample.json','w'),indent=0)
print(len(out))
