# 取 2025 A／B 類的 OpenAlex 開放取用位置與授權（25 次請求），寫 oa.json。用法：python3 -I fulltext_oa_locations.py ../2025/corpus-v2.csv
import csv,json,sys,urllib.request,urllib.parse
corp=[x for x in csv.DictReader(open(sys.argv[1],encoding='utf-8',newline='')) if x['ai_lit_class'] in ('A','B')]
ids=sorted(x['work_id'] for x in corp); res={}
for i in range(0,len(ids),50):
    q=urllib.parse.urlencode({'filter':'openalex:'+'|'.join(ids[i:i+50]),'per-page':'50','select':'id,open_access,best_oa_location,locations'})
    d=json.load(urllib.request.urlopen('https://api.openalex.org/works?'+q,timeout=60))
    for w in d['results']:
        locs=[{'url':l.get('landing_page_url'),'pdf':l.get('pdf_url'),'lic':l.get('license'),'ver':l.get('version'),'src':(l.get('source') or {}).get('display_name'),'type':(l.get('source') or {}).get('type'),'is_oa':l.get('is_oa')} for l in (w.get('locations') or [])]
        res[w['id'].split('/')[-1]]={'oa':w['open_access'],'locs':locs}
with open('oa.json','w',encoding='utf-8',newline='') as fh: json.dump(res,fh)
print(len(res))
