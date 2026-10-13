# 批次與位置效應（2026-10-12，附錄 A 管理者決定第 20 項 (3)）：
# (a) 第二次判讀逐批的範圍類別一致率與批次 bootstrap κ 區間（兩組一致性樣本）；
# (b) 第一次判讀依批內位置的 A 類比例與 A 類對象不明比例；各年批次間 A 類比例的離散（置換檢定）。
# 用法：python3 -I research/p0-annual-trends-2022-2025/supplementary/scripts/batch_effects.py research/trend-corpus
import csv,os,sys,random,collections
R=sys.argv[1]
FILES={2022:'2022/corpus.csv',2023:'2023/corpus.csv',2024:'2024/corpus.csv',2025:'2025/corpus-v2.csv'}
C={}
for y,f in FILES.items():
    for x in csv.DictReader(open(os.path.join(R,f),encoding='utf-8')):x['_y']=y;C[x['work_id']]=x
def kappa(pairs):
    n=len(pairs);
    if n==0:return float('nan')
    po=sum(a==b for a,b in pairs)/n;ca=collections.Counter(a for a,_ in pairs);cb=collections.Counter(b for _,b in pairs)
    pe=sum(ca[k]*cb[k] for k in set(ca)|set(cb))/n/n
    return (po-pe)/(1-pe) if pe<1 else 1.0
rng=random.Random(20261012)
print('## (a) 第二次判讀逐批的範圍類別（A／B／C／不明）一致率')
for lab,fn,v1 in (('2025 年樣本','2025/coding2.csv',None),('回溯三年樣本','backfill-2022-2024/coding2.csv',None)):
    B=collections.defaultdict(list)
    for x in csv.DictReader(open(os.path.join(R,fn),encoding='utf-8')):
        c=C[x['work_id']];first=c['ai_lit_class']
        B[x['batch_id']].append((first,x['ai_lit_class']))
    allp=[p for v in B.values() for p in v]
    print(lab,'；'.join(f'{b} {sum(a==c for a,c in v)}/{len(v)}' for b,v in sorted(B.items())),f'｜全部 κ {kappa(allp):.3f}')
    ks=[]
    keys=list(B)
    for _ in range(4000):
        s=[p for _ in keys for p in B[keys[rng.randrange(len(keys))]]];ks.append(kappa(s))
    ks.sort();print(f'   批次 bootstrap κ 95% 區間 {ks[100]:.3f}–{ks[3899]:.3f}（{len(keys)} 批，重抽批次）')
print('## (b) 第一次判讀的位置與批次效應（範圍判斷批次，batch_id、position）')
rows=[x for x in C.values() if x['ai_lit_class'] and x['batch_id'] and x['position']]
bins=[(1,5),(6,10),(11,15),(16,20),(21,999)]
for lo,hi in bins:
    S=[x for x in rows if lo<=int(x['position'])<=hi]
    if not S:continue
    A=[x for x in S if x['ai_lit_class']=='A'];U=sum(x['audience_role']=='unknown' for x in A)
    print(f'位置 {lo}–{hi if hi<999 else "以上"}：n={len(S)}，A 類 {100*len(A)/len(S):.1f}%，A 類中對象不明 {100*U/len(A) if A else 0:.1f}%')
for y in FILES:
    S=[x for x in rows if x['_y']==y];g=collections.defaultdict(list)
    for x in S:g[x['batch_id']].append(x['ai_lit_class']=='A')
    def disp(groups):
        p=sum(sum(v) for v in groups)/sum(len(v) for v in groups)
        return sum(len(v)*(sum(v)/len(v)-p)**2 for v in groups)/(p*(1-p)*(len(groups)-1)) if 0<p<1 else 0
    G=list(g.values());obs=disp(G);flat=[a for v in G for a in v];sizes=[len(v) for v in G];cnt=0
    for _ in range(2000):
        rng.shuffle(flat);i=0;H=[]
        for s in sizes:H.append(flat[i:i+s]);i+=s
        cnt+=disp(H)>=obs
    print(f'{y} 年：{len(G)} 批，A 類比例的批間離散比 {obs:.2f}，置換 p＝{cnt/2000:.2f}')
