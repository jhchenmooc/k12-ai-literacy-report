# 四年合併報告的主表與三張核心敏感度表（方案第 1、5 節；PROTOCOL 第 12 節；§10 第 20、23 項）。
# 用法：python3 -I fouryear_tables.py <repo>/research/trend-corpus [--json out.json]
import csv,sys,os,json,math,collections
R=sys.argv[1]
FILES={2022:'2022/corpus.csv',2023:'2023/corpus.csv',2024:'2024/corpus.csv',2025:'2025/corpus-v2.csv'}
C={y:list(csv.DictReader(open(os.path.join(R,f),encoding='utf-8'))) for y,f in FILES.items()}
EXCL={x['journal_code'] for x in csv.DictReader(open(os.path.join(R,'journals.csv'))) if x.get('j35_j47_sensitivity')=='exclude'}
ROLES=('student','inservice_teacher','other_stakeholder')
def wilson(k,n,z=1.96):
    if n==0:return None
    p=k/n;d=1+z*z/n;c=(p+z*z/(2*n))/d;h=z*math.sqrt(p*(1-p)/n+z*z/(4*n*n))/d;return (max(0.0,100*(c-h)),min(100.0,100*(c+h)))
dims=lambda x:[d for d in x['ai_lit_dims'].replace(',',';').split(';') if d]
def items(rows,unknown_as_A=False):
    M=[x for x in rows if (x['ai_lit_class']=='A' or (unknown_as_A and x['ai_lit_class']=='unknown')) and x['audience_role'] in ROLES]
    S=[x for x in M if x['audience_role']=='student'];T=[x for x in M if x['audience_role']=='inservice_teacher']
    G=[x for x in M if x['genai_flag'] in('yes','no')]
    I=[x for x in M if x['method'] in('experimental','design_based','mixed') and x['outcome_measured'] in('yes','no')]
    S8=[x for x in S if x['stage'] not in('','unknown')]
    return {'main':len(M),
     '1':(len(S),len(M)),'2':(sum(x['genai_flag']=='yes' for x in G),len(G)),'2_unknown':len(M)-len(G),
     '3':(sum('S-ETH' in dims(x) for x in S),len(S)),'4':(sum('S-BAS' in dims(x) for x in S),len(S)),
     '5':(sum('T-TEA' in dims(x) for x in T),len(T)),'6':(sum('T-PD' in dims(x) for x in T),len(T)),
     '7':(sum(x['outcome_measured']=='yes' for x in I),len(I)),
     '8':(sum(x['stage'] in('primary','lower_secondary') for x in S8),len(S8)),
     '8a':(sum(x['stage'] in('primary','lower_secondary','secondary_unspecified') for x in S8),len(S8)),'8_unknown':len(S)-len(S8),
     'S-LRN':(sum('S-LRN' in dims(x) for x in S),len(S))}
def add(a,b):return {k:(tuple(i+j for i,j in zip(a[k],b[k])) if isinstance(a[k],tuple) else a[k]+b[k]) for k in a}
def table(filt=lambda y,x:True,ua=False,late2023=False):
    Y={y:items([x for x in C[y] if filt(y,x)],ua) for y in C}
    early=[2022] if late2023 else [2022,2023];late=[2023,2024,2025] if late2023 else [2024,2025]
    P={'early':Y[early[0]],'late':Y[late[0]]}
    for y in early[1:]:P['early']=add(P['early'],Y[y])
    for y in late[1:]:P['late']=add(P['late'],Y[y])
    return Y,P
KEYS=['1','2','3','5','6','7','8','8a','S-LRN']
def fmt(t):
    k,n=t
    if n==0:return '—'
    if n<20:return f'{k}／{n}（只列篇數）'
    lo,hi=wilson(k,n);return f'{k}／{n}（{100*k/n:.1f}%，{lo:.1f}–{hi:.1f}）'
def judge(P):
    out={}
    for k in KEYS:
        (a,n1),(b,n2)=P['early'][k],P['late'][k]
        if n1<20 or n2<20:out[k]='只列篇數';continue
        l1,h1=wilson(a,n1);l2,h2=wilson(b,n2);p1,p2=100*a/n1,100*b/n2
        overlap=not(h1<l2 or h2<l1)
        if not overlap and abs(p2-p1)>=5:out[k]='上升' if p2>p1 else '下降'
        elif overlap and max(h1-l1,h2-l2)<=10:out[k]='大致持平'
        else:out[k]='變化不確定'
        out[k+'_diff']=round(p2-p1,1)
    return out
res={}
for name,args in [('main',{}),('excl_J35_J47',{'filt':lambda y,x:x['journal_code'] not in EXCL}),('unknown_as_A',{'ua':True}),('2023_late',{'late2023':True}),
                 # 單刊影響（方案第 5 節）：該年 A 類占比超過 15% 的期刊排除後重算（2022 J05、2023 J02、2024 J05；2025 無）
                 ('excl_top_journal',{'filt':lambda y,x:x['journal_code']!={2022:'J05',2023:'J02',2024:'J05'}.get(y)})]:
    Y,P=table(**args);res[name]={'years':Y,'periods':P,'judge':judge(P)}
if '--json' in sys.argv:json.dump(res,open(sys.argv[sys.argv.index('--json')+1],'w'),ensure_ascii=False,indent=1)
for name in res:
    print('##',name)
    Y,P,J=res[name]['years'],res[name]['periods'],res[name]['judge']
    print('main',{y:Y[y]['main'] for y in Y},{p:P[p]['main'] for p in P})
    for k in KEYS:print(k,' | '.join(fmt(Y[y][k]) for y in Y),'|| early',fmt(P['early'][k]),'late',fmt(P['late'][k]),'→',J.get(k),J.get(k+'_diff',''))
    print('genai unknown',{y:Y[y]['2_unknown'] for y in Y},'stage unknown',{y:Y[y]['8_unknown'] for y in Y})
