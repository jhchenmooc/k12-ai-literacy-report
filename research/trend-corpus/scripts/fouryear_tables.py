# 四年合併報告的主表、三張核心敏感度表、單刊影響、判讀規則與報告用描述表（方案第 1、5、6 節；PROTOCOL 第 12 節；§10 第 20、23–27 項）。
# 用法：python3 -I fouryear_tables.py <repo>/research/trend-corpus [--json out.json] [--tables] [--journal-csv out.csv]
# 判讀規則（全部由程式套用，報告照抄結果）：
#   (a) 期主要分母 < 50 或項目分母 < 20 → 只列篇數（「單格 < 5」只用於描述性交叉附表，§10 第 27 項）；
#   (b) 兩期區間不重疊且差距 ≥ 5 個百分點 → 上升／下降；區間重疊且兩期區間寬度都 ≤ 10 → 大致持平；其他 → 變化不確定；
#   (c) 主表為上升／下降時，任一可計算的核心敏感度表（排除 J35–J47、不明全數計為 A、2023 歸後期）判讀類別不同 → 不確定；
#       只列篇數的核心表不參與，另列點差方向；單刊影響表為附表，不參與（§10 第 26、27 項，DEV-014）；
#   (d) 不論主表判讀為何，該指標的不明率兩期相差 > 10 個百分點 → 不確定（第 1 項：A 類對象不明／(主要分母＋A 類對象不明)；
#       第 2 項：旗標不明；第 7 項：介入研究中成效不明，含成效欄空白的實驗與設計本位研究；第 8 項：學段不明；
#       第 3、5、6 項：面向無不明值）；缺摘要比例（無摘要／範圍判斷＋無摘要）兩期相差 > 10 → 不確定；
#       前後期第一次編碼的主要 model_id 不同 → 不確定；
#   (e) 上升／下降成立時，以 2022–23、2024、2025 三點的點估計檢查相鄰變化是否同向（同向記「逐年一致」，否則「年間起伏」；DEV-014）。
import csv,sys,os,json,math,collections
R=sys.argv[1]
FILES={2022:'2022/corpus.csv',2023:'2023/corpus.csv',2024:'2024/corpus.csv',2025:'2025/corpus-v2.csv'}
RAW={y:list(csv.DictReader(open(os.path.join(R,f),encoding='utf-8'))) for y,f in FILES.items()}
def valid(x):  # 非論文、撤稿、去重次筆不進任何計數（方案第 2.5 節）
    s=x['status_note'];return not(s.startswith('excluded_doctype') or s in('retracted','dedup_secondary') or x['is_retracted']=='true')
C={y:[x for x in r if valid(x)] for y,r in RAW.items()}
# 缺摘要比例：無摘要／(範圍判斷＋無摘要)
RAWN={y:(sum(x['status_note'].startswith('no_abstract') for x in r),sum(1 for x in r if valid(x))) for y,r in RAW.items()}
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
    # 成效不明：成效欄 unknown，或實驗／設計本位研究成效欄空白（混合方法空白＝沒有實施教學，不屬介入研究）
    IU=[x for x in M if x['method'] in INTERV and (x['outcome_measured']=='unknown' or (x['outcome_measured']=='' and x['method']!='mixed'))]
    S8=[x for x in S if x['stage'] not in('','unknown')]
    Au=sum(x['ai_lit_class']=='A' and x['audience_role']=='unknown' for x in rows)
    noabs=sum(x['status_note'].startswith('no_abstract') for x in rows)
    models=collections.Counter(x['model_id'] for x in rows if x['ai_lit_class'])
    return {'main':len(M),'models':dict(models),'unk_aud':Au,'noabs':noabs,'coded_or_noabs':len(rows),
     '1':(len(S),len(M)),'1_unk':(Au,len(M)+Au),
     '2':(sum(x['genai_flag']=='yes' for x in G),len(G)),'2_unk':(len(M)-len(G),len(M)),
     '3':(sum('S-ETH' in dims(x) for x in S),len(S)),
     '5':(sum('T-TEA' in dims(x) for x in T),len(T)),'6':(sum('T-PD' in dims(x) for x in T),len(T)),
     '7':(sum(x['outcome_measured']=='yes' for x in I),len(I)),'7_unk':(len(IU),len(I)+len(IU)),
     '8':(sum(x['stage'] in('primary','lower_secondary') for x in S8),len(S8)),'8_unk':(len(S)-len(S8),len(S)),
     '8a':(sum(x['stage'] in('primary','lower_secondary','secondary_unspecified') for x in S8),len(S8)),
     'S-LRN':(sum('S-LRN' in dims(x) for x in S),len(S))}
def add(a,b):return {k:(tuple(i+j for i,j in zip(a[k],b[k])) if isinstance(a[k],tuple) else (dict(collections.Counter(a[k])+collections.Counter(b[k])) if isinstance(a[k],dict) else a[k]+b[k])) for k in a}
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
def _top15():
    out={}
    for y,r in C.items():
        A=collections.Counter(x['journal_code'] for x in r if x['ai_lit_class']=='A');n=sum(A.values())
        out[y]=tuple(sorted(j for j,c in A.items() if c/n>0.15))
    return out
TOP15=_top15()
SENS=[('main',{}),('excl_J35_J47',{'filt':lambda y,x:x['journal_code'] not in EXCL}),('unknown_as_A',{'ua':True}),('2023_late',{'late2023':True}),
      ('excl_top_journal',{'filt':lambda y,x:x['journal_code'] not in TOP15.get(y,())})]
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
def nab(per):return pct(P[per]['noabs_rate'])
for per,ys in (('early',[2022,2023]),('late',[2024,2025])):
    P[per]['noabs_rate']=(sum(RAWN[y][0] for y in ys),sum(RAWN[y][1] for y in ys))
for k in KEYS:
    cat,diff=res['main']['cat'][k];notes=[];unc=False
    for name in ('excl_J35_J47','unknown_as_A','2023_late'):
        c,d=res[name]['cat'][k]
        if c.startswith('只列篇數'):
            pe,pl=res[name]['periods']['early'][k],res[name]['periods']['late'][k]
            if pe[1] and pl[1]:notes.append(f'{name}: 只列篇數，不參與（點差 {pct(pl)-pct(pe):+.1f}）')
            continue
        if cat in('上升','下降') and c!=cat:notes.append(f'{name}: {c} ≠ {cat}');unc=True
    uk={'1':'1','2':'2','7':'7','8':'8','8a':'8'}.get(k)
    if uk and not cat.startswith('只列篇數'):
        e,l=P['early'][uk+'_unk'],P['late'][uk+'_unk']
        if e[1] and l[1]:
            dd=pct(l)-pct(e);notes.append(f'不明率 {pct(e):.1f}%→{pct(l):.1f}%（差 {dd:+.1f}）')
            if abs(dd)>10:unc=True
    if abs(nab('late')-nab('early'))>10:unc=True;notes.append('缺摘要比例差>10')
    me=max(P['early']['models'],key=P['early']['models'].get);ml=max(P['late']['models'],key=P['late']['models'].get)
    if me!=ml:unc=True;notes.append('model_id 不同')
    if unc:final[k]=('不確定',notes)
    elif cat in('上升','下降'):
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

# ---------- 報告用描述表（--tables）；附表 C 逐刊逐年（--journal-csv） ----------
def pool_remaining(y):
    """解釋補充 a 母體中，有中小學線索、目前仍為 A 類對象不明者（含讀過全文仍判不出或沒有參與者者）。
    2022、2023 的母體檔另列無線索（cue_kind=none）的 A／B 類，不計入。"""
    f={2022:'2022/dev004a-pool.csv',2023:'2023/dev004a-pool.csv',2024:'2024/dev004a-pool39.csv',2025:'2025/dev004a-pool72.csv'}[y]
    rows=list(csv.DictReader(open(os.path.join(R,f))))
    ids={x['work_id'] for x in rows if x.get('cue_kind','cue')!='none'}
    return sum(1 for x in C[y] if x['work_id'] in ids and x['ai_lit_class']=='A' and x['audience_role']=='unknown')
def wil(k,n):
    w=wilson(k,n);return [k,n,round(100*k/n,1),round(w[0],1),round(w[1],1)]
def tables():
    T={}
    ST=['preschool','primary','lower_secondary','upper_secondary','vocational_secondary','secondary_unspecified','k12_multi','k12_unspecified','unknown']
    for y,r in RAW.items():
        sn=collections.Counter(x['status_note'] for x in r);v=C[y]
        T[f'prisma_{y}']={'hits':len(r),'dedup':sn['dedup_secondary'],'nonpaper':sum(c for k,c in sn.items() if k.startswith('excluded_doctype')),
            'retracted':sum(1 for x in r if x['status_note']=='retracted' or (x['is_retracted']=='true' and x['status_note']=='')),
            'noabs':RAWN[y][0],'scope':sum(1 for x in v if x['ai_lit_class']),'class':dict(collections.Counter(x['ai_lit_class'] for x in v if x['ai_lit_class']))}
        A=[x for x in v if x['ai_lit_class']=='A'];M=[x for x in A if x['audience_role'] in ROLES]
        T[f'aud_{y}']=dict(collections.Counter(x['audience_role'] for x in A));T[f'pool_remaining_{y}']=pool_remaining(y)
        T[f'stage_{y}']={role:[sum(1 for x in M if x['audience_role']==role and (x['stage'] or 'unknown')==s) for s in ST] for role in ROLES}
        T[f'method_{y}']=dict(collections.Counter(x['method'] for x in M));T[f'topic_{y}']=dict(collections.Counter(t for x in M for t in x['topic'].split(';') if t))
        T[f'bsub_{y}']=dict(collections.Counter(x['b_subtype'] for x in v if x['ai_lit_class']=='B'))
        T[f'scopus_share_{y}']=(sum(x['abstract_source']=='scopus' for x in v if x['ai_lit_class']),sum(1 for x in v if x['ai_lit_class']))
        q=json.load(open(os.path.join(R,'rerun-dev001',str(y),'queries.json')));sub,op=q['subqueries'],q['outside_panel']
        T[f'panel_share_{y}']=(sum(sub[k]['count'] for k in sub if k in op),sum(op[k]['count'] for k in sub if k in op))
        T[f'neutral_minus_main_{y}']=q['union']['neutral_minus_main']
    for per,ys in (('early',(2022,2023)),('late',(2024,2025))):
        L=collections.Counter()
        for y in ys:
            for x in C[y]:
                if x['ai_lit_class']=='A' and x['audience_role'] in('student','inservice_teacher'):L[(x['audience_role'],x['level'] or 'unknown')]+=1
        T[f'level_{per}']={f'{a}|{b}':c for (a,b),c in sorted(L.items())}
    # 面板分層每千篇、面板無摘要比例（step2-summary）
    strat={}
    for x in csv.DictReader(open(os.path.join(R,'journals.csv'))):
        if x['in_panel']=='yes':
            for y in RAW:strat[(y,x[f'source_id_{y}'])]=x['panel_stratum'];strat[(y,x['journal_code'])]=x['panel_stratum']
    s2=json.load(open(os.path.join(R,'rerun-dev001','step2-summary.json')))['years']
    for y in RAW:
        q=json.load(open(os.path.join(R,'rerun-dev001',str(y),'queries.json')))['panel_size']['by_source']
        tot=collections.Counter()
        for sid,v in q.items():tot[strat.get((y,sid.rsplit('/',1)[-1]),'?')]+=(v['count'] if isinstance(v,dict) else v)
        A=collections.Counter(strat[(y,x['journal_code'])] for x in C[y] if x['ai_lit_class']=='A')
        M=collections.Counter(strat[(y,x['journal_code'])] for x in C[y] if x['ai_lit_class']=='A' and x['audience_role'] in ROLES)
        T[f'per1000_{y}']={k:{'panel':tot[k],'A':A[k],'A_per1000':round(1000*A[k]/tot[k],1),'main':M[k],'main_per1000':round(1000*M[k]/tot[k],2)} for k in tot}
        T[f'panel_missing_abstract_{y}']=(s2[str(y)]['panel_missing_abstract'],s2[str(y)]['panel_size'])
    # 漏收：中性查詢差集抽樣（全部樣本與只用有摘要者）
    NS={2022:'2022/neutral-sample.json',2023:'2023/neutral-sample.json',2024:'2024/neutral-sample.json',2025:'2025/neutral-sample-v2.json'}
    for y,f in NS.items():
        d=json.load(open(os.path.join(R,f)));it=d['items']
        k=[x for x in it if x['ai_lit_class']=='A' and x['audience_role'] in ROLES]
        wa=[x for x in it if x['has_abstract']]
        T[f'leak_{y}']={'all':wil(len(k),len(it)),'with_abstract':wil(len(k),len(wa)),'title_only':len(it)-len(wa),'roles':dict(collections.Counter(x['audience_role'] for x in k))}
    # 第 1 項情境：有中小學線索、尚未判定者全部算學生／在職教師
    early_u=sum(pool_remaining(y) for y in (2022,2023));late_u=sum(pool_remaining(y) for y in (2024,2025))
    Pm=res['main']['periods'];es,em=Pm['early']['1'];ls,lm=Pm['late']['1']
    T['item1_scenario']={'remaining':(early_u,late_u),'all_student':(wil(es+early_u,em+early_u),wil(ls+late_u,lm+late_u)),'all_teacher':(wil(es,em+early_u),wil(ls,lm+late_u))}
    # Web of Science 年份比對
    wf=os.path.join(R,'wos','wos-compare.csv')
    if os.path.exists(wf):
        W=[x for x in csv.DictReader(open(wf)) if x['oa_year'] or x['status']=='in_union']
        def oy(x):return int(x['oa_year']) if x['oa_year'] else 2025
        diff=[x for x in W if x['PY'] and int(x['PY'])!=oy(x)]
        T['wos_year']={'with_oa_year':len(W),'differ':len(diff),'wos_later':sum(int(x['PY'])>oy(x) for x in diff)}
    # 生成式 AI 旗標一致性（第一次對第二次編碼）
    def kap(a,b):
        n=len(a);po=sum(x==y for x,y in zip(a,b))/n;ca,cb=collections.Counter(a),collections.Counter(b);pe=sum(ca[k]*cb[k] for k in set(ca)|set(cb))/n/n
        return round(po,3),(round((po-pe)/(1-pe),3) if pe<1 else None),n
    corp={x['work_id']:x for y in RAW for x in RAW[y]}
    for lab,f in (('2025','2025/coding2.csv'),('backfill','backfill-2022-2024/coding2.csv')):
        rr=[r for r in csv.DictReader(open(os.path.join(R,f))) if corp[r['work_id']]['ai_lit_class'] in('A','B') or r['ai_lit_class'] in('A','B')]
        AA=[r for r in rr if corp[r['work_id']]['ai_lit_class']=='A']
        T[f'genai_kappa_A_{lab}']={'3cat':kap([corp[r['work_id']]['genai_flag'] or 'unknown' for r in AA],[r['genai_flag'] or 'unknown' for r in AA]),'yes_vs_not':kap(['yes' if corp[r['work_id']]['genai_flag']=='yes' else 'not' for r in AA],['yes' if r['genai_flag']=='yes' else 'not' for r in AA])}
        IV=[r for r in AA if corp[r['work_id']]['method'] in INTERV and r['method'] in INTERV]
        T[f'outcome_kappa_{lab}']=kap([corp[r['work_id']]['outcome_measured'] or 'blank' for r in IV],[r['outcome_measured'] or 'blank' for r in IV]) if IV else None
        T[f'genai_kappa_{lab}']=kap([corp[r['work_id']]['genai_flag'] or 'unknown' for r in rr],[r['genai_flag'] or 'unknown' for r in rr])
        mm=lambda c,ro:c=='A' and ro in ROLES
        allr=list(csv.DictReader(open(os.path.join(R,f))))
        T[f'membership_{lab}']=dict(collections.Counter(f"{mm(corp[r['work_id']]['ai_lit_class'],corp[r['work_id']]['audience_role'])}->{mm(r['ai_lit_class'],r['audience_role'])}" for r in allr))
        extra=[r for r in allr if not mm(corp[r['work_id']]['ai_lit_class'],corp[r['work_id']]['audience_role']) and mm(r['ai_lit_class'],r['audience_role'])]
        T[f'extra_{lab}']={'first_A_aud_unknown':sum(corp[r['work_id']]['ai_lit_class']=='A' for r in extra),'first_B':sum(corp[r['work_id']]['ai_lit_class']=='B' for r in extra),
            'role':dict(collections.Counter(r['audience_role'] for r in extra)),'genai_yes':sum(r['genai_flag']=='yes' for r in extra),'journals':dict(collections.Counter(corp[r['work_id']]['journal_code'] for r in extra))}
    # 第 2 項情境：對象不明的 A 類全部計入主要分母
    for per,ys in (('early',(2022,2023)),('late',(2024,2025))):
        rows=[x for y in ys for x in C[y] if x['ai_lit_class']=='A' and (x['audience_role'] in ROLES or x['audience_role']=='unknown') and x['genai_flag'] in('yes','no')]
        T[f'item2_all_unknown_{per}']=(sum(x['genai_flag']=='yes' for x in rows),len(rows))
    return T
def journal_csv(path):
    with open(path,'w',newline='') as f:
        w=csv.writer(f,lineterminator='\n');w.writerow(['journal_code','year','hits','nonpaper_retracted_dedup','scope_judged','A','B','C','unknown','no_abstract','abstract_openalex','abstract_scopus','doctype_checked_scopus','main_denominator'])
        codes=sorted({x['journal_code'] for r in RAW.values() for x in r})
        for j in codes:
            for y,r in RAW.items():
                rr=[x for x in r if x['journal_code']==j]
                if not rr:continue
                v=[x for x in rr if valid(x)];cl=collections.Counter(x['ai_lit_class'] for x in v if x['ai_lit_class'])
                w.writerow([j,y,len(rr),len(rr)-len(v),sum(cl.values()),cl['A'],cl['B'],cl['C'],cl['unknown'],sum(x['status_note'].startswith('no_abstract') for x in rr),
                    sum(x['abstract_source']=='openalex' for x in v if x['ai_lit_class']),sum(x['abstract_source']=='scopus' for x in v if x['ai_lit_class']),
                    sum(1 for x in rr if x['abstract_source']=='scopus' or x['status_note'].startswith('excluded_doctype')),
                    sum(1 for x in v if x['ai_lit_class']=='A' and x['audience_role'] in ROLES)])
if '--tables' in sys.argv:print('## tables',json.dumps(tables(),ensure_ascii=False))
if '--journal-csv' in sys.argv:journal_csv(sys.argv[sys.argv.index('--journal-csv')+1])
