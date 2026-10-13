# 以 OpenAlex 單篇查詢取得作者國別（authorships[].countries 與機構 country_code），只抓公開書目欄位（2026-10-12，附錄 A 管理者決定第 20 項）。
# 用法：python3 -I research/p0-annual-trends-2022-2025/supplementary/scripts/fetch_author_countries.py research/trend-corpus research/p0-annual-trends-2022-2025/supplementary/outputs/author-countries.csv
# 範圍：四年語料中有第一次判讀、排除非論文／撤稿／去重次筆後的 A 類論文。已抓過的 work_id 會略過，可中斷後續跑。
import csv,json,os,sys,time,urllib.request
R,OUT=sys.argv[1:3]
FILES={2022:'2022/corpus.csv',2023:'2023/corpus.csv',2024:'2024/corpus.csv',2025:'2025/corpus-v2.csv'}
def valid(x):
    s=x['status_note'];return not(s.startswith('excluded_doctype') or s in('retracted','dedup_secondary') or x['is_retracted']=='true')
ids=[x['work_id'] for y,f in FILES.items() for x in csv.DictReader(open(os.path.join(R,f),encoding='utf-8')) if valid(x) and x['ai_lit_class']=='A']
done=set()
if os.path.exists(OUT):done={r['work_id'] for r in csv.DictReader(open(OUT,encoding='utf-8'))}
new=not os.path.exists(OUT)
fh=open(OUT,'a',newline='',encoding='utf-8');w=csv.writer(fh)
if new:w.writerow(['work_id','n_authors','author_countries','first_author_countries','institution_countries'])
for i,wid in enumerate(ids):
    if wid in done:continue
    url=f'https://api.openalex.org/works/{wid}?select=id,authorships'
    for t in range(4):
        try:
            d=json.load(urllib.request.urlopen(url,timeout=30));break
        except Exception as e:
            time.sleep(2**t)
    else:
        print('FAIL',wid,file=sys.stderr);continue
    au=d.get('authorships',[])
    ac=sorted({c for a in au for c in (a.get('countries') or [])})
    fa=sorted({c for a in au if a.get('author_position')=='first' for c in (a.get('countries') or [])})
    ic=sorted({(i.get('country_code') or '') for a in au for i in a.get('institutions',[])}-{''})
    w.writerow([wid,len(au),';'.join(ac),';'.join(fa),';'.join(ic)]);fh.flush()
    time.sleep(0.15)
print('total',len(ids))
