# 每千篇比率的逐刊逐年分母（2026-10-12，第三次專家角色審查第 8 條）。
# 分母為公開 repo rerun-dev001/<年>/queries.json 的 panel_size（OpenAlex 面板總篇數，依來源 ID），分子為主要分母篇數（沿用 fouryear_tables.py 的 valid()）。
# 用法：python3 -I research/p0-annual-trends-2022-2025/supplementary/scripts/journal_denominators.py research/trend-corpus > research/p0-annual-trends-2022-2025/supplementary/outputs/journal-denominators.csv
#   另以 --summary 輸出各分層的每千篇、排除 J05、排除占該分層分母超過 20% 的期刊三種版本。
import csv,json,collections,sys
R=sys.argv[1];SUM='--summary' in sys.argv
FILES={2022:'2022/corpus.csv',2023:'2023/corpus.csv',2024:'2024/corpus.csv',2025:'2025/corpus-v2.csv'}
ROLES=('student','inservice_teacher','other_stakeholder')
def valid(x):
    s=x['status_note'];return not(s.startswith('excluded_doctype') or s in('retracted','dedup_secondary') or x['is_retracted']=='true')
J={x['journal_code']:x for x in csv.DictReader(open(R+'/journals.csv',encoding='utf-8'))}
rows=[]
for y,f in FILES.items():
    N=json.load(open(f'{R}/rerun-dev001/{y}/queries.json'))['panel_size']['by_source']
    sid={J[k][f'source_id_{y}']:k for k in J}
    n=collections.Counter()
    for s,v in N.items():n[sid[s.rsplit('/',1)[-1]]]+=v
    m=collections.Counter(x['journal_code'] for x in csv.DictReader(open(R+'/'+f,encoding='utf-8')) if valid(x) and x['ai_lit_class']=='A' and x['audience_role'] in ROLES)
    T=collections.Counter()
    for k in J:T[J[k]['panel_stratum']]+=n[k]
    for k in sorted(J):
        st=J[k]['panel_stratum'];rows.append(dict(year=y,journal_code=k,stratum=st,panel_size=n[k],main_denominator=m[k],share_of_stratum_pct=f'{100*n[k]/T[st]:.1f}' if T[st] else ''))
if not SUM:
    w=csv.DictWriter(sys.stdout,fieldnames=list(rows[0]),lineterminator='\n');w.writeheader();w.writerows(rows)
else:
    for y in FILES:
        for st in sorted({r['stratum'] for r in rows}):
            R_=[r for r in rows if r['year']==y and r['stratum']==st];T=sum(r['panel_size'] for r in R_);M=sum(r['main_denominator'] for r in R_)
            big=[r for r in R_ if r['panel_size']/T>0.2];Tb=T-sum(r['panel_size'] for r in big);Mb=M-sum(r['main_denominator'] for r in big)
            j5=[r for r in R_ if r['journal_code']=='J05']
            ex5=f"{1000*(M-sum(r['main_denominator'] for r in j5))/(T-sum(r['panel_size'] for r in j5)):.1f}" if j5 else '—'
            print(f"{y} {st}：分母 {T}、主要分母 {M}、每千篇 {1000*M/T:.1f}；排除 J05 {ex5}；排除占分層分母超過 20% 的期刊（{'、'.join(r['journal_code']+' '+r['share_of_stratum_pct']+'%' for r in big)}）{1000*Mb/Tb:.1f}")
