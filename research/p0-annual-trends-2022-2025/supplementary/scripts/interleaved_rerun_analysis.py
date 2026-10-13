# 交錯重判分析（2026-10-12，附錄 A 管理者決定第 20 項 (1)）：同一場判讀、前後期混洗的兩組一致性樣本 249 篇，
# 以凍結的範圍判斷提示（prompts/scope.md，SHA-256 3f0bcf51…）重判範圍類別與對象，與語料的第一次判讀比較。
# 用法：python3 -I research/p0-annual-trends-2022-2025/supplementary/scripts/interleaved_rerun_analysis.py research/trend-corpus <重判輸出目錄> <mapping.json> <輸入目錄>
import csv,json,os,sys,glob,math,collections,re
R,OUTD,MAP,IND=sys.argv[1:5]
FILES={2022:'2022/corpus.csv',2023:'2023/corpus.csv',2024:'2024/corpus.csv',2025:'2025/corpus-v2.csv'}
ROLES=('student','inservice_teacher','other_stakeholder')
C={}
for y,f in FILES.items():
    for x in csv.DictReader(open(os.path.join(R,f),encoding='utf-8')):x['_y']=y;C[x['work_id']]=x
mp=json.load(open(MAP))
inp={}
for f in glob.glob(os.path.join(IND,'*.jsonl')):
    for l in open(f,encoding='utf-8'):r=json.loads(l);inp[r['work_id']]=r
out={}
for f in sorted(glob.glob(os.path.join(OUTD,'*.jsonl'))):
    for l in open(f,encoding='utf-8'):
        if l.strip():r=json.loads(l);out[r['work_id']]=r
assert set(out)==set(mp),(len(out),len(mp))
# 證據片段驗證（逐字、≤15 詞）
bad=0
for k,r in out.items():
    txt=inp[k]['title']+' '+inp[k]['abstract']
    for e in r.get('evidence',[]):
        s=e.get('span','')
        if s and (s not in txt or len(s.split())>15):bad+=1
def wilson(k,n,z=1.959964):
    if n==0:return float('nan'),float('nan')
    p=k/n;d=1+z*z/n;c=(p+z*z/(2*n))/d;h=z*math.sqrt(p*(1-p)/n+z*z/(4*n*n))/d;return 100*(c-h),100*(c+h)
def f(k,n):
    lo,hi=wilson(k,n);return f'{k}/{n}（{100*k/n:.1f}%，{lo:.1f}–{hi:.1f}）' if n else '0/0'
rows=[]
for k,r in out.items():
    w=mp[k];c=C[w];rows.append(dict(w=w,per='前期' if c['_y']<2024 else '後期',adj=bool(c['adjustments']),
        c1=c['ai_lit_class'],a1=c['audience_role'],c2=r['ai_lit_class'],a2=r['audience_role']))
print('重判篇數',len(rows),'證據片段不合格',bad,'model_id',collections.Counter(r.get('model_id','') for r in out.values()).most_common(2))
def stats(S,cls,aud):
    A=[x for x in S if x[cls]=='A'];M=[x for x in A if x[aud] in ROLES];U=[x for x in A if x[aud]=='unknown']
    return len(S),len(A),len(M),len(U)
for lab,flt in (('全部',lambda x:True),('排除語料 adjustments 非空者',lambda x:not x['adj'])):
    print('##',lab)
    for p in ('前期','後期'):
        S=[x for x in rows if x['per']==p and flt(x)]
        n,a1,m1,u1=stats(S,'c1','a1');_,a2,m2,u2=stats(S,'c2','a2')
        print(f'{p} n={n}｜第一次：A {a1}、主要分母 {m1}、A 類對象不明 {u1}，不明比例 {f(u1,m1+u1)}｜交錯重判：A {a2}、主要分母 {m2}、A 類對象不明 {u2}，不明比例 {f(u2,m2+u2)}')
        cagree=sum(x['c1']==x['c2'] for x in S);aagree=sum(x['a1']==x['a2'] for x in S if x['c1']=='A' and x['c2']=='A');na=sum(x['c1']=='A' and x['c2']=='A' for x in S)
        mm=sum((x['c1']=='A' and x['a1'] in ROLES)==(x['c2']=='A' and x['a2'] in ROLES) for x in S)
        print(f'   範圍類別一致 {cagree}/{n}；雙方皆 A 者對象一致 {aagree}/{na}；主要分母歸屬一致 {mm}/{n}')
        tr=collections.Counter((x['a1'],x['a2']) for x in S if x['c1']=='A' and x['c2']=='A' and x['a1']!=x['a2'])
        print('   對象改變（第一次→重判）',dict(tr))
