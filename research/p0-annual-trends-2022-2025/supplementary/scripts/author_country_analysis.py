# 作者國別分析（2026-10-12，附錄 A 管理者決定第 20 項 (2)）：讀 research/p0-annual-trends-2022-2025/supplementary/outputs/author-countries.csv（OpenAlex authorships），
# 報告主要分母各期的作者國別分布（任一作者、第一作者），以及第 1 項依第一作者國別分組的敏感度。只作描述與敏感度。
# 用法：python3 -I research/p0-annual-trends-2022-2025/supplementary/scripts/author_country_analysis.py research/trend-corpus research/p0-annual-trends-2022-2025/supplementary/outputs/author-countries.csv
import csv,os,sys,math,collections
R,CF=sys.argv[1:3]
FILES={2022:'2022/corpus.csv',2023:'2023/corpus.csv',2024:'2024/corpus.csv',2025:'2025/corpus-v2.csv'}
ROLES=('student','inservice_teacher','other_stakeholder')
def valid(x):
    s=x['status_note'];return not(s.startswith('excluded_doctype') or s in('retracted','dedup_secondary') or x['is_retracted']=='true')
def wilson(k,n,z=1.959964):
    p=k/n;d=1+z*z/n;c=(p+z*z/(2*n))/d;h=z*math.sqrt(p*(1-p)/n+z*z/(4*n*n))/d;return 100*(c-h),100*(c+h)
def f(k,n):
    if not n:return '0/0'
    lo,hi=wilson(k,n);return f'{k}/{n}（{100*k/n:.1f}%，{lo:.1f}–{hi:.1f}）'
CO={r['work_id']:r for r in csv.DictReader(open(CF,encoding='utf-8'))}
M={'前期':[],'後期':[]};A={'前期':[],'後期':[]}
for y,fn in FILES.items():
    for x in csv.DictReader(open(os.path.join(R,fn),encoding='utf-8')):
        if valid(x) and x['ai_lit_class']=='A':
            p='前期' if y<2024 else '後期';A[p].append(x)
            if x['audience_role'] in ROLES:M[p].append(x)
def cs(x,k):return [c for c in CO[x['work_id']][k].split(';') if c]
EA={'CN','HK','TW','KR','JP','SG','MO'}
for lab,D in (('主要分母',M),('A 類（不限對象）',A)):
    print(f'## {lab}')
    for p in D:
        S=D[p];n=len(S);none=sum(not cs(x,'author_countries') for x in S)
        fa=collections.Counter((cs(x,'first_author_countries') or ['不明'])[0] for x in S)
        anyc=collections.Counter(c for x in S for c in cs(x,'author_countries'))
        ea=sum(bool(set(cs(x,'first_author_countries'))&EA) for x in S)
        print(f'{p} n={n}；國別不明 {none}；第一作者國別前五：'+'、'.join(f'{c} {k}' for c,k in fa.most_common(5))+f'；任一作者含：'+'、'.join(f'{c} {k}' for c,k in anyc.most_common(6))+f'；第一作者屬東亞（CN、HK、TW、KR、JP、SG、MO）{f(ea,n)}；含臺灣作者 {sum("TW" in cs(x,"author_countries") for x in S)}')
print('## 第 1 項（學生比例）依第一作者是否屬東亞分組（敏感度）')
for g,cond in (('東亞',lambda x:bool(set(cs(x,'first_author_countries'))&EA)),('非東亞或不明',lambda x:not set(cs(x,'first_author_countries'))&EA)):
    r=[]
    for p in M:
        S=[x for x in M[p] if cond(x)];r.append(f"{p} {f(sum(x['audience_role']=='student' for x in S),len(S))}")
    print(g,'；'.join(r))
print('## A 類中屬主要分母的比例（對象不明以外），依第一作者是否屬東亞')
for g,cond in (('東亞',lambda x:bool(set(cs(x,'first_author_countries'))&EA)),('非東亞或不明',lambda x:not set(cs(x,'first_author_countries'))&EA)):
    r=[]
    for p in A:
        S=[x for x in A[p] if cond(x)];u=sum(x['audience_role']=='unknown' for x in S);m=sum(x['audience_role'] in ROLES for x in S)
        r.append(f'{p} 對象不明比例 {f(u,u+m)}')
    print(g,'；'.join(r))
