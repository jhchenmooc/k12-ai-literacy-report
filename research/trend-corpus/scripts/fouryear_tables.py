# 四年合併報告的主表、三張核心敏感度表、單刊影響與判讀規則（方案第 1、5 節；PROTOCOL 第 12 節；§10 第 20、23–25 項）。
# 用法：python3 -I fouryear_tables.py <repo>/research/trend-corpus [--json out.json]
# 判讀規則（全部由程式套用，報告照抄結果）：
#   (a) 期主要分母 < 50 或項目分母 < 20 → 只列篇數；
#   (b) 兩期區間不重疊且差距 ≥ 5 個百分點 → 上升／下降；區間重疊且兩期區間寬度都 ≤ 10 → 大致持平；其他 → 變化不確定；
#   (c) 主表為上升／下降時，任一可計算的敏感度表判讀類別不同 → 不確定（只列篇數的敏感度表不參與，另列）；
#   (d) 該指標的不明率兩期相差 > 10 個百分點 → 不確定（第 1 項：A 類對象不明／(主要分母＋A 類對象不明)；第 2 項：旗標不明；
#       第 7 項：成效測量不明；第 8 項：學段不明；第 3、5、6 項：面向無不明值）；缺摘要比例兩期相差 > 10 → 不確定；
#   (e) 上升／下降成立時，以 2022–23、2024、2025 三點的點估計檢查相鄰變化是否同向（同向記「逐年一致」，否則「年間起伏」）。
import csv,sys,os,json,math,collections
R=sys.argv[1]
FILES={2022:'2022/corpus.csv',2023:'2023/corpus.csv',2024:'2024/corpus.csv',2025:'2025/corpus-v2.csv'}
RAW={y:list(csv.DictReader(open(os.path.join(R,f),encoding='utf-8'))) for y,f in FILES.items()}
def valid(x):  # 非論文、撤稿、去重次筆不進任何計數（方案第 2.5 節）
    s=x['status_note'];return not(s.startswith('excluded_doctype') or s in('retracted','dedup_secondary') or x['is_retracted']=='true')
C={y:[x for x in r if valid(x)] for y,r in RAW.items()}
EXCL={x['journal_code'] for x in csv.DictReader(open(os.path.join(R,'journals.csv'))) if x.get('j35_j47_sensitivity')=='exclude'}
ROLES=('student','inservice_teacher','other_stakeholder')
def wilson(k,n,z=1.96):
    if n==0:return None
    p=k/n;d=1+z*z/n;c=(p+z*z/(2*n))/d;h=z*math.sqrt(p*(1-p)/n+z*z/(4*n*n))/d;return (max(0.0,100*(c-h)),min(100.0,100*(c+h)))
dims=lambda x:[d for d in x['ai_lit_dims'].replace(',',';').split(';') if d]
INTERV=('experimental','design_based','mixed')
def items(rows,unknown_as_A=False):
    M=[x for x in rows if (x['ai_lit_class']=='A' or (unknown_as_A and x['ai_lit_class']=='unknown')) and x['audience_role'] in ROLES]
    S=[x for x in M if x['audience_role']=='student'];T=[x for x in M if x['audience_role']=='inservice_teacher']
    G=[x for x in M if x['genai_flag'] in('yes','no')]
    I=[x for x in M if x['method'] in INTERV and x['outcome_measured'] in('yes','no')]
    S8=[x for x in S if x['stage'] not in('','unknown')]
    Au=sum(x['ai_lit_class']=='A' and x['audience_role']=='unknown' for x in rows)
    noabs=sum(x['status_note'].startswith('no_abstract') for x in rows)
    return {'main':len(M),'unk_aud':Au,'noabs':noabs,'coded_or_noabs':len(rows),
     '1':(len(S),len(M)),'1_unk':(Au,len(M)+Au),
     '2':(sum(x['genai_flag']=='yes' for x in G),len(G)),'2_unk':(len(M)-len(G),len(M)),
     '3':(sum('S-ETH' in dims(x) for x in S),len(S)),
     '5':(sum('T-TEA' in dims(x) for x in T),len(T)),'6':(sum('T-PD' in dims(x) for x in T),len(T)),
     '7':(sum(x['outcome_measured']=='yes' for x in I),len(I)),'7_unk':(sum(x['method'] in INTERV and x['outcome_measured']=='unknown' for x in M),len(I)+sum(x['method'] in INTERV and x['outcome_measured']=='unknown' for x in M)),
     '8':(sum(x['stage'] in('primary','lower_secondary') for x in S8),len(S8)),'8_unk':(len(S)-len(S8),len(S)),
     '8a':(sum(x['stage'] in('primary','lower_secondary','secondary_unspecified') for x in S8),len(S8)),
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
pct=lambda t:100*t[0]/t[1] if t[1] else None
def category(P,k):
    (a,n1),(b,n2)=P['early'][k],P['late'][k]
    if P['early']['main']<50 or P['late']['main']<50:return '只列篇數（期主要分母<50）',None
    if n1<20 or n2<20:return '只列篇數（分母<20）',None
    l1,h1=wilson(a,n1);l2,h2=wilson(b,n2);p1,p2=100*a/n1,100*b/n2
    if not(h1<l2 or h2<l1) and max(h1-l1,h2-l2)<=10:return '大致持平',round(p2-p1,1)
    if (h1<l2 or h2<l1) and abs(p2-p1)>=5:return ('上升' if p2>p1 else '下降'),round(p2-p1,1)
    return '變化不確定',round(p2-p1,1)
SENS=[('main',{}),('excl_J35_J47',{'filt':lambda y,x:x['journal_code'] not in EXCL}),('unknown_as_A',{'ua':True}),('2023_late',{'late2023':True}),
      ('excl_top_journal',{'filt':lambda y,x:x['journal_code']!={2022:'J05',2023:'J02',2024:'J05'}.get(y)})]
res={}
for name,args in SENS:
    Y,P=table(**args);res[name]={'years':Y,'periods':P,'cat':{k:category(P,k) for k in KEYS}}
# 對象不明全部計入（決定 19 a(3) 的四年版）：A 類對象不明者全部算學生／全部算在職教師，第 1 項
def aud_bounds():
    out={}
    for per,ys in (('early',[2022,2023]),('late',[2024,2025])):
        S=sum(res['main']['years'][y]['1'][0] for y in ys);M=sum(res['main']['years'][y]['main'] for y in ys);U=sum(res['main']['years'][y]['unk_aud'] for y in ys)
        out[per]={'all_student':(S+U,M+U),'all_teacher':(S,M+U)}
    return out
final={}
P=res['main']['periods']
for k in KEYS:
    cat,diff=res['main']['cat'][k];notes=[]
    if cat in('上升','下降'):
        for name in ('excl_J35_J47','unknown_as_A','2023_late','excl_top_journal'):
            c=res[name]['cat'][k][0]
            if c.startswith('只列篇數'):notes.append(f'{name}: 只列篇數，不參與');continue
            if c!=cat and name!='excl_top_journal':notes.append(f'{name}: {c} ≠ {cat}')
        uk=k.split('a')[0] if k!='S-LRN' else None
        unk=P['early'].get(f'{uk}_unk'),P['late'].get(f'{uk}_unk')
        if unk[0] and unk[0][1] and unk[1][1] and abs(pct(unk[1])-pct(unk[0]))>10:notes.append(f'不明率 {pct(unk[0]):.1f}%→{pct(unk[1]):.1f}%（差>10）')
        if any('≠' in n or '不明率' in n for n in notes):final[k]=('不確定',notes)
        else:
            Y=res['main']['years'];seq=[pct(P['early'][k]),pct(Y[2024][k]),pct(Y[2025][k])]
            mono=all((b-a)*(1 if cat=='上升' else -1)>=0 for a,b in zip(seq,seq[1:]))
            final[k]=(cat+('，逐年一致' if mono else '，年間起伏'),notes)
    else:final[k]=(cat,notes)
out={'sens':res,'final':final,'aud_bounds':aud_bounds()}
if '--json' in sys.argv:json.dump(out,open(sys.argv[sys.argv.index('--json')+1],'w'),ensure_ascii=False,indent=1)
def fmt(t):
    k,n=t
    if n==0:return '—'
    lo,hi=wilson(k,n);return f'{k}／{n}（{100*k/n:.1f}%，{lo:.1f}–{hi:.1f}）'
for name in res:
    Y,P=res[name]['years'],res[name]['periods']
    print('##',name,'main',{y:Y[y]['main'] for y in Y},{p:P[p]['main'] for p in P})
    for k in KEYS:print(' ',k,' | '.join(f'{Y[y][k][0]}／{Y[y][k][1]}' for y in Y),'|| early',fmt(P['early'][k]),'late',fmt(P['late'][k]),'→',res[name]['cat'][k])
print('## final');[print(' ',k,v) for k,v in final.items()]
P=res["main"]["periods"];print("## unknown rates",{k:(P["early"][k],P["late"][k]) for k in ("1_unk","2_unk","7_unk","8_unk")})
print('## aud_bounds',out['aud_bounds'])
