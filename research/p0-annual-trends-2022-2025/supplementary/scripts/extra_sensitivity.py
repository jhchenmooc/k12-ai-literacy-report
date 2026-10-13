# 四年報告的補充敏感度與探索性分析（2026-10-12，管理者同意做「不需新資料」的部分）。
# 沿用公開 repo research/p0-annual-trends-2022-2025/supplementary/scripts/fouryear_tables.py 的納入條件與各項定義（valid、items），不改公開程式；結果只作敏感度說明，不參與結論規則。
# 用法：python3 -I research/p0-annual-trends-2022-2025/supplementary/scripts/extra_sensitivity.py research/trend-corpus
#   (A) 以期刊為叢集的 bootstrap 區間與設計效應；(B) 不明值的部分識別界限；(C)「狹義 AI 素養」敏感度；
#   (D) 跨年不報面向的逐年篇數；(E) 兩期差距的 Newcombe 區間；(F) 規則 1 隱含的顯著水準（模擬）；
#   (G) 核心面板：WoS Core Collection（所訂版本，不含 ESCI）有命中的 32 刊（管理者 2026-10-12 選定），依事先訂定的規則重算。
#   (H) 兩期差距的期刊叢集 bootstrap 區間（兩期各自以期刊為單位重抽；2026-10-12 第二次專家角色審查建議，另用一個同種子的亂數產生器，不影響 (A)–(G) 的輸出）。
import csv,os,sys,math,random,collections
R=sys.argv[1]
FILES={2022:'2022/corpus.csv',2023:'2023/corpus.csv',2024:'2024/corpus.csv',2025:'2025/corpus-v2.csv'}
RAW={y:list(csv.DictReader(open(os.path.join(R,f),encoding='utf-8'))) for y,f in FILES.items()}
def valid(x):
    s=x['status_note'];return not(s.startswith('excluded_doctype') or s in('retracted','dedup_secondary') or x['is_retracted']=='true')
C={y:[x for x in r if valid(x)] for y,r in RAW.items()}
ROLES=('student','inservice_teacher','other_stakeholder')
INTERV=('experimental','design_based','mixed')
dims=lambda x:[d for d in x['ai_lit_dims'].replace(',',';').split(';') if d]
PER={'early':(2022,2023),'late':(2024,2025)}
def wilson(k,n,z=1.96):
    p=k/n;d=1+z*z/n;c=(p+z*z/(2*n))/d;h=z*math.sqrt(p*(1-p)/n+z*z/(4*n*n))/d;return (max(0.0,c-h),min(1.0,c+h))
f1=lambda v:f'{100*v:.1f}'
def main_rows(rows,narrow=False):
    M=[x for x in rows if x['ai_lit_class']=='A' and x['audience_role'] in ROLES]
    if narrow:M=[x for x in M if not(dims(x) and set(dims(x))<={'S-LRN','T-TEA'})]
    return M
# 各項的 (是否進分母, 是否為分子)，與 fouryear_tables.items() 相同
def unit(k,x):
    S=x['audience_role']=='student'
    if k=='1':return True,S
    if k=='2':return x['genai_flag'] in('yes','no'),x['genai_flag']=='yes'
    if k=='3':return S,'S-ETH' in dims(x)
    if k=='7':return (x['method'] in INTERV and x['outcome_measured'] in('yes','no')),x['outcome_measured']=='yes'
    s8=S and x['stage'] not in('','unknown')
    if k=='8':return s8,x['stage'] in('primary','lower_secondary')
    if k=='8a':return s8,x['stage'] in('primary','lower_secondary','secondary_unspecified')
KEYS=['1','2','3','7','8','8a']
def counts(M,k):
    u=[unit(k,x) for x in M];return sum(a and b for a,b in u),sum(a for a,b in u)
def per_rows(per,narrow=False):return [x for y in PER[per] for x in main_rows(C[y],narrow)]
out=[]
P=lambda *a:out.append(' '.join(str(s) for s in a))

# (A) 期刊叢集 bootstrap（期內重抽期刊）與設計效應
B=4000;rng=random.Random(20261012)
P('## (A) 期刊叢集 bootstrap 95% 區間（每期內以期刊為單位重抽，B=4000，種子 20261012）與設計效應')
for k in KEYS:
    line=[k]
    for per in('early','late'):
        M=per_rows(per);g=collections.defaultdict(lambda:[0,0])
        for x in M:
            d,n=unit(k,x)
            if d:g[x['journal_code']][1]+=1;g[x['journal_code']][0]+=n
        J=[v for v in g.values()];a=sum(v[0] for v in J);n=sum(v[1] for v in J)
        bs=[]
        for _ in range(B):
            s=[J[rng.randrange(len(J))] for _ in J];nn=sum(v[1] for v in s)
            if nn:bs.append(sum(v[0] for v in s)/nn)
        bs.sort();lo,hi=bs[int(0.025*len(bs))],bs[int(0.975*len(bs))-1]
        # 設計效應：ANOVA 估 ICC，平均群大小
        N=n;kk=len(J);p=a/N
        if kk>1 and N>kk:
            ssb=sum(v[1]*(v[0]/v[1]-p)**2 for v in J);ssw=sum(v[0]*(1-v[0]/v[1]) for v in J)
            msb=ssb/(kk-1);msw=ssw/(N-kk);n0=(N-sum(v[1]**2 for v in J)/N)/(kk-1)
            icc=(msb-msw)/(msb+(n0-1)*msw) if (msb+(n0-1)*msw)>0 else 0
            deff=max(1.0,1+(N/kk-1)*icc)
        else:icc,deff=float('nan'),1.0
        wl,wh=wilson(a,n)
        line.append(f'{per} {a}/{n} {f1(a/n)} Wilson {f1(wl)}–{f1(wh)} 叢集bootstrap {f1(lo)}–{f1(hi)} 期刊數 {kk} ICC {icc:.3f} deff {deff:.2f}')
    P(' | '.join(line))

# (B) 部分識別界限：不明值全算為分子或全算為非分子（以及進不進分母）時，比例的可能範圍
P('\n## (B) 部分識別界限（不明值可能的最小與最大比例）')
def tbl_unk(per):
    Ms=per_rows(per);r={}
    G=[x for x in Ms if x['genai_flag'] in('yes','no')];yes=sum(x['genai_flag']=='yes' for x in G);u2=len(Ms)-len(G)
    r['2']=(yes/(len(G)+u2),(yes+u2)/(len(G)+u2),f'{yes}/{len(G)}，旗標不明 {u2}')
    I=[x for x in Ms if x['method'] in INTERV and x['outcome_measured'] in('yes','no')];oy=sum(x['outcome_measured']=='yes' for x in I)
    IU=[x for x in Ms if x['method'] in INTERV and (x['outcome_measured']=='unknown' or (x['outcome_measured']=='' and x['method']!='mixed'))]
    r['7']=(oy/(len(I)+len(IU)),(oy+len(IU))/(len(I)+len(IU)),f'{oy}/{len(I)}，成效不明 {len(IU)}')
    S=sum(x['audience_role']=='student' for x in Ms);M=len(Ms)
    Au=sum(x['ai_lit_class']=='A' and x['audience_role']=='unknown' for y in PER[per] for x in C[y])
    pool={'early':8,'late':89}[per]   # 只寫學生或教師、尚未判定（第 1.2 節）
    r['1-pool']=(S/(M+pool),(S+pool)/(M+pool),f'{S}/{M}，只寫學生或教師而未判定 {pool}（全算為非學生或全算為學生，皆屬主要分母）')
    r['1-all']=(min(S/M,S/(M+Au)),(S+Au)/(M+Au),f'{S}/{M}，對象不明 A 類 {Au}（不明者可能是學生、教師或非中小學）')
    return r
E,L=tbl_unk('early'),tbl_unk('late')
for k in('1-pool','1-all','2','7'):
    e,l=E[k],L[k];ov=not(e[1]<l[0] or l[1]<e[0])
    P(f'{k} 前期 [{f1(e[0])}, {f1(e[1])}]（{e[2]}） 後期 [{f1(l[0])}, {f1(l[1])}]（{l[2]}） 範圍{"重疊" if ov else "不重疊"}')

# (C) 狹義 AI 素養：排除面向只有 S-LRN、T-TEA 的論文
P('\n## (C) 狹義 AI 素養（排除面向只有「用 AI」〔S-LRN、T-TEA〕的論文）')
for per in('early','late'):
    M0,M1=per_rows(per),per_rows(per,True);P(f'{per} 主要分母 {len(M0)} → {len(M1)}（排除 {len(M0)-len(M1)}）')
G=[x for per in('late',) for x in per_rows(per) if x['genai_flag']=='yes']
P(f'後期旗標「是」{len(G)} 篇中，面向只有 S-LRN／T-TEA 者 {sum(bool(dims(x)) and set(dims(x))<={"S-LRN","T-TEA"} for x in G)} 篇')
for k in KEYS:
    s=[]
    for per in('early','late'):
        a,n=counts(per_rows(per,True),k);lo,hi=wilson(a,n);s.append((a,n,lo,hi))
    ov=not(s[0][3]<s[1][2] or s[1][3]<s[0][2])
    P(f'{k} 前期 {s[0][0]}/{s[0][1]}（{f1(s[0][0]/s[0][1])}，{f1(s[0][2])}–{f1(s[0][3])}） 後期 {s[1][0]}/{s[1][1]}（{f1(s[1][0]/s[1][1])}，{f1(s[1][2])}–{f1(s[1][3])}） 區間{"重疊" if ov else "不重疊"} 差 {100*(s[1][0]/s[1][1]-s[0][0]/s[0][1]):+.1f}')

# (D) 跨年不報面向的逐年篇數（只列篇數，不比較）
P('\n## (D) 跨年不報面向的逐年篇數（主要分母；學生面向分母為學生研究，教師面向分母為在職教師研究）')
for d,role in(('S-BAS','student'),('S-SYS','student'),('T-BAS','inservice_teacher'),('T-ETH','inservice_teacher')):
    P(d,' '.join(f'{y}:{sum(d in dims(x) for x in main_rows(C[y]) if x["audience_role"]==role)}/{sum(x["audience_role"]==role for x in main_rows(C[y]))}' for y in FILES))

# (E) 兩期差距（後期減前期）的 Newcombe（Wilson 混合）95% 區間
P('\n## (E) 兩期差距的 Newcombe 95% 區間（百分點；不調整期刊叢集）')
for k in KEYS:
    a1,n1=counts(per_rows('early'),k);a2,n2=counts(per_rows('late'),k)
    p1,p2=a1/n1,a2/n2;l1,u1=wilson(a1,n1);l2,u2=wilson(a2,n2);d=p2-p1
    lo=d-math.sqrt((p2-l2)**2+(u1-p1)**2);hi=d+math.sqrt((u2-p2)**2+(p1-l1)**2)
    P(f'{k} {a1}/{n1} → {a2}/{n2} 差 {100*d:+.1f}（{100*lo:+.1f} 至 {100*hi:+.1f}）')

# (F) 規則 1「兩期 95% Wilson 區間不重疊」在兩期真實比例相同時被觸發的機率（模擬）
P('\n## (F) 規則 1 隱含的顯著水準（兩期真實比例相同時，兩區間不重疊的機率；每格模擬 20,000 次）')
rng2=random.Random(1)
for p,n1,n2 in((0.5,92,204),(0.3,71,118),(0.7,92,204),(0.5,100,100)):
    hit=0;T=20000
    for _ in range(T):
        a=sum(rng2.random()<p for _ in range(n1));b=sum(rng2.random()<p for _ in range(n2))
        l1,u1=wilson(a,n1);l2,u2=wilson(b,n2)
        if u1<l2 or u2<l1:hit+=1
    P(f'p={p} n={n1}/{n2} 不重疊機率 {hit/T:.4f}')

# (G) 核心面板：排除 WoS 2025 對照中 0 命中的 15 刊（wos/report.md 第 4 節），其餘 32 刊；依事先訂定的規則（方案第 5、6.2 節、第 1 節原定分母）
WOS0={'J02','J03','J09','J11','J12','J13','J24','J29','J32','J34','J35','J41','J42','J43','J47'}
JN={x['journal_code']:x for x in csv.DictReader(open(os.path.join(R,'journals.csv'),encoding='utf-8'))}
CORE={c for c in JN if c not in WOS0}
P(f'\n## (G) 核心面板（WoS 核心收錄有命中的 {len(CORE)} 刊；管理者 2026-10-12 選定），依事先訂定的規則')
def core_rows(y):return [x for x in C[y] if x['journal_code'] in CORE]
for y in FILES:
    M=main_rows(core_rows(y))
    st={}
    for c in CORE:
        sd=JN[c]['panel_stratum'];st.setdefault(sd,[0,0]);st[sd][0]+=int(JN[c]['article_review_'+str(y)] or 0)
    per={sd:(sum(1 for x in M if JN[x['journal_code']]['panel_stratum']==sd),v[0]) for sd,v in st.items()}
    P(y,'主要分母',len(M),'；每千篇',' '.join(f'{sd}:{m}/{n}={1000*m/n:.1f}' for sd,(m,n) in sorted(per.items())))
def cat(a1,n1,a2,n2):
    l1,u1=wilson(a1,n1);l2,u2=wilson(a2,n2);d=100*(a2/n2-a1/n1)
    if (u1<l2 or u2<l1) and abs(d)>=5:return ('上升' if d>0 else '下降'),d
    if not(u1<l2 or u2<l1) and (u1-l1)<=0.10 and (u2-l2)<=0.10:return '大致持平',d
    return '變化不確定',d
E=[x for y in PER['early'] for x in main_rows(core_rows(y))];L=[x for y in PER['late'] for x in main_rows(core_rows(y))]
P(f'主要分母 前期 {len(E)}、後期 {len(L)}')
for k in KEYS:
    a1,n1=counts(E,k);a2,n2=counts(L,k);c,d=cat(a1,n1,a2,n2);l1,u1=wilson(a1,n1);l2,u2=wilson(a2,n2)
    note=''
    if k=='2' and min(a1,a2)<5:note='（單格少於 5 篇，依方案第 6.2 節只列篇數）'
    P(f'{k} 前期 {a1}/{n1}（{f1(a1/n1)}，{f1(l1)}–{f1(u1)}） 後期 {a2}/{n2}（{f1(a2/n2)}，{f1(l2)}–{f1(u2)}） 規則 1：{c}（差 {d:+.1f}）{note}')
# 規則 3：各項本身欄位的不明比例
def unk(per):
    Ys=[y for y in PER[per]];rows=[x for y in Ys for x in core_rows(y)];M=main_rows(rows)
    Au=sum(x['ai_lit_class']=='A' and x['audience_role']=='unknown' for x in rows)
    G2=sum(x['genai_flag'] not in('yes','no') for x in M)
    return {'1':(Au,len(M)+Au),'2':(G2,len(M))}
ue,ul=unk('early'),unk('late')
for k in('1','2'):P(f'不明比例 {k}：前期 {ue[k][0]}/{ue[k][1]}（{f1(ue[k][0]/ue[k][1])}） 後期 {ul[k][0]}/{ul[k][1]}（{f1(ul[k][0]/ul[k][1])}）')
# 第 7 項原定分母（有摘要的 A 類介入研究，不限對象；成效欄空白者依 Q24 不算介入研究）
def it7(per):
    A=[x for y in PER[per] for x in core_rows(y) if x['ai_lit_class']=='A']
    I=[x for x in A if x['method'] in INTERV and x['outcome_measured'] in('yes','no')]
    u=sum(x['method'] in INTERV and x['outcome_measured']=='unknown' for x in A)
    return sum(x['outcome_measured']=='yes' for x in I),len(I),u
a1,n1,u1=it7('early');a2,n2,u2=it7('late');c,d=cat(a1,n1,a2,n2)
P(f'7（原定分母） 前期 {a1}/{n1}（{f1(a1/n1)}） 後期 {a2}/{n2}（{f1(a2/n2)}） 規則 1：{c}（差 {d:+.1f}）；成效不明 {u1}/{n1+u1}（{f1(u1/(n1+u1))}） 對 {u2}/{n2+u2}（{f1(u2/(n2+u2))}）')

# (H) 兩期差距的期刊叢集 bootstrap 區間
P('## (H) 兩期差距（後期減前期，百分點）的期刊叢集 bootstrap 95% 區間（兩期各自以期刊為單位重抽，B=4000，種子 20261012，獨立亂數產生器）')
rng3=random.Random(20261012)
for k in KEYS:
    J={}
    for per in('early','late'):
        g=collections.defaultdict(lambda:[0,0])
        for x in per_rows(per):
            d,n=unit(k,x)
            if d:g[x['journal_code']][1]+=1;g[x['journal_code']][0]+=n
        J[per]=list(g.values())
    p0={per:sum(v[0] for v in J[per])/sum(v[1] for v in J[per]) for per in J}
    bs=[]
    for _ in range(B):
        r={}
        for per in('early','late'):
            s_=[J[per][rng3.randrange(len(J[per]))] for _ in J[per]];r[per]=sum(v[0] for v in s_)/sum(v[1] for v in s_)
        bs.append(100*(r['late']-r['early']))
    bs.sort()
    P(f"{k} 差 {100*(p0['late']-p0['early']):+.1f}（叢集 bootstrap {bs[int(0.025*B)]:+.1f} 至 {bs[int(0.975*B)-1]:+.1f}）")
print('\n'.join(out))
