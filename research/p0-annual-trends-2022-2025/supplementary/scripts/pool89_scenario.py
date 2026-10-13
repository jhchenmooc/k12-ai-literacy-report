# 後期 89 篇補讀全文的敏感度情境（選項 A，管理者 2026-10-12；草稿附錄 A 管理者決定第 19 項）。
# 主表的第 1、3、8 項先以語料重現，再把補讀判為 k（屬中小學）的論文加入後期主要分母，重算三項；不改主表。
# 用法：python3 -I research/p0-annual-trends-2022-2025/supplementary/scripts/pool89_scenario.py research/trend-corpus research/p0-annual-trends-2022-2025/supplementary/outputs/pool89-fulltext-coding-public.csv
import csv,os,sys,math
R,P=sys.argv[1],sys.argv[2]
FILES={2022:'2022/corpus.csv',2023:'2023/corpus.csv',2024:'2024/corpus.csv',2025:'2025/corpus-v2.csv'}
ROLES=('student','inservice_teacher','other_stakeholder')
def valid(x):
    s=x['status_note'];return not(s.startswith('excluded_doctype') or s in('retracted','dedup_secondary') or x['is_retracted']=='true')
def wilson(k,n,z=1.959964):
    if n==0:return float('nan'),float('nan')
    p=k/n;d=1+z*z/n;c=(p+z*z/(2*n))/d;h=z*math.sqrt(p*(1-p)/n+z*z/(4*n*n))/d;return 100*(c-h),100*(c+h)
def fmt(k,n):
    if n==0:return '0／0'
    lo,hi=wilson(k,n);return f'{k}／{n}（{100*k/n:.1f}%，{lo:.1f}–{hi:.1f}）'
main={};per=lambda y:'前期' if y<2024 else '後期'
for y,f in FILES.items():
    for x in csv.DictReader(open(os.path.join(R,f),encoding='utf-8')):
        if valid(x) and x['ai_lit_class']=='A' and x['audience_role'] in ROLES:
            main[x['work_id']]=dict(year=y,role=x['audience_role'],stage=x['stage'],dims=x['ai_lit_dims'].split(';') if x['ai_lit_dims'] else [])
ft={r['work_id']:r for r in csv.DictReader(open(P,encoding='utf-8'))}
add={w:dict(year=int(r['year']),role=r['audience_role'],stage=r['stage'],dims=[d for d in r['ai_lit_dims'].split(';') if d]) for w,r in ft.items() if r['ft_result']=='k'}
assert not set(add)&set(main)
def items(pop,label):
    out={}
    for p in ('前期','後期'):
        U=[v for v in pop.values() if per(v['year'])==p];S=[v for v in U if v['role']=='student']
        out[p]=dict(n=len(U),i1=(len(S),len(U)),i3=(sum('S-ETH' in v['dims'] for v in S),len(S)),
                    i8=(sum(v['stage'] in('primary','lower_secondary') for v in S),len(S)),
                    i8a=(sum(v['stage'] in('primary','lower_secondary','secondary_unspecified') for v in S),len(S)))
    print(f'## {label}')
    for k,name in (('i1','第 1 項 學生比例'),('i3','第 3 項 學生 AI 倫理'),('i8','第 8 項 國小與國中'),('i8a','第 8a 項 含中學未細分')):
        a,b=out['前期'][k],out['後期'][k]
        lo1,hi1=wilson(*a);lo2,hi2=wilson(*b)
        overlap='重疊' if not(hi1<lo2 or hi2<lo1) else '不重疊'
        print(f'{name}：前期 {fmt(*a)}；後期 {fmt(*b)}；差 {100*(b[0]/b[1]-a[0]/a[1]):+.1f}；區間{overlap}')
    return out
items(main,'主表（重現）')
items({**main,**add},'依全文判讀：後期加入補讀判為 k 者')
from collections import Counter
print('補讀結果',Counter((r['year'],r['ft_result']) for r in ft.values()))
print('k 的對象',Counter((r['year'],r['audience_role']) for r in ft.values() if r['ft_result']=='k'))
