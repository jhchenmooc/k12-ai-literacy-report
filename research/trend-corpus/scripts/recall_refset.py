# 系統性回顧參考集的召回率（方案第 2.4 節、PROTOCOL 第 4 節、Q14）。
# 年份以 OpenAlex publication_year 為準；有 DOI 者以 DOI 查 OpenAlex，沒有 DOI 者以題名查（取第一筆，逐筆核對過題名）。
# 「找到」＝該作品在同一 OpenAlex 年份的檢索命中（各年 corpus 檔的任一列）。參考集某年達 20 篇才報召回率。
# 用法：python3 -I recall_refset.py <repo>/research/trend-corpus [--offline recall.csv]
#   不加 --offline 時查 OpenAlex 並寫出 recall.csv；加 --offline 時讀既有 recall.csv 重算。
import csv,sys,os,json,math,collections,urllib.request,urllib.parse
R=sys.argv[1];OUT=os.path.join(R,'recall.csv')
FILES={2022:'2022/corpus.csv',2023:'2023/corpus.csv',2024:'2024/corpus.csv',2025:'2025/corpus-v2.csv'}
C={y:{x['work_id'] for x in csv.DictReader(open(os.path.join(R,f),encoding='utf-8',newline=''))} for y,f in FILES.items()}
ref=[r for r in csv.DictReader(open(os.path.join(R,'refset.csv'),encoding='utf-8',newline='')) if r['in_panel']=='yes']
def get(u):return json.load(urllib.request.urlopen(u))
if '--offline' in sys.argv:
    rows=list(csv.DictReader(open(OUT,encoding='utf-8',newline='')))
else:
    rows=[]
    for r in ref:
        d=r['included_work_doi'].lower().strip()
        if d:
            w=get('https://api.openalex.org/works?select=id,publication_year&filter=doi:'+urllib.parse.quote(d,safe=':/'))['results'][0];how='doi'
        else:
            q=urllib.parse.quote(r['included_work_title'].replace(',',' ').replace(':',' '))
            w=get('https://api.openalex.org/works?per-page=1&select=id,publication_year&search='+q)['results'][0];how='title'
        rows.append({'refset_id':r['refset_id'],'review_doi':r['review_doi'],'work_id':w['id'].split('/')[-1],'year_openalex':w['publication_year'],'matched_by':how})
    for x in rows:
        y=int(x['year_openalex']);x['in_hits']='yes' if y in C and x['work_id'] in C[y] else ('' if y not in C else 'no')
    with open(OUT,'w',newline='',encoding='utf-8') as f:
        w=csv.DictWriter(f,fieldnames=list(rows[0]));w.writeheader();w.writerows(rows)
def wilson(k,n,z=1.96):
    p=k/n;d=1+z*z/n;c=(p+z*z/(2*n))/d;h=z*math.sqrt(p*(1-p)/n+z*z/(4*n*n))/d;return (100*(c-h),100*(c+h))
REBUILT={'10.1016/j.caeai.2024.100217','10.1016/j.caeai.2026.100551'}
for label,excl in (('全部五篇回顧',False),('排除依引用重建的兩篇（Q14）',True)):
    W=collections.defaultdict(set);Y={};H={}
    for x in rows:
        W[x['work_id']].add(x['review_doi']);Y[x['work_id']]=int(x['year_openalex']);H[x['work_id']]=x['in_hits']
    print(label)
    for y in FILES:
        ws=[i for i in W if Y[i]==y and (not excl or W[i]-REBUILT)]
        if not ws:continue
        k=sum(H[i]=='yes' for i in ws);lo,hi=wilson(k,len(ws))
        print(f'  {y}: {k}/{len(ws)} = {k/len(ws):.3f}（{lo:.1f}–{hi:.1f}）{"" if len(ws)>=20 else "，未達 20 篇，不報"}；未找到 {[i for i in ws if H[i]!="yes"]}')
