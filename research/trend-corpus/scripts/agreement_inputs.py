# 重組一致性樣本的摘要（PROTOCOL 第 3 節），逐篇核對 abstract_sha256。只在 scratchpad 執行，輸出 inputs.json 含摘要，不得 commit。
# 用法：python3 -I agreement_inputs.py ../2025/corpus-v2.csv <Scopus 匯出 CSV 目錄>
import csv,json,sys,re,hashlib,glob,urllib.request,urllib.parse,os
corp={x['work_id']:x for x in csv.DictReader(open(sys.argv[1]))}
S=json.load(open('sample.json'))
def norm(t):
    t=re.sub(r'^\s*abstract\s*[:.]?\s*','',t,flags=re.I)
    t=re.split(r'©|\(c\)|Copyright',t,maxsplit=1,flags=re.I)[0] if re.search(r'©|\(c\)|Copyright',t,flags=re.I) else t
    return re.sub(r'\s+',' ',t).strip()
sc={}
for f in glob.glob(sys.argv[2]+'/*.csv'):
    for r in csv.DictReader(open(f,encoding='utf-8-sig')):
        if r.get('DOI'): sc[r['DOI'].lower()]=r.get('Abstract') or ''
oa_ids=[s['work_id'] for s in S if corp[s['work_id']]['abstract_source']=='openalex']
oa={}
ctx=None
for i in range(0,len(oa_ids),50):
    q=urllib.parse.urlencode({'filter':'openalex:'+'|'.join(oa_ids[i:i+50]),'per-page':'50','select':'id,abstract_inverted_index'})
    d=json.load(urllib.request.urlopen('https://api.openalex.org/works?'+q,timeout=60))
    for w in d['results']:
        inv=w['abstract_inverted_index'] or {}
        pos=sorted((p,t) for t,ps in inv.items() for p in ps)
        oa[w['id'].split('/')[-1]]=' '.join(t for p,t in pos)
out=[];bad=[]
for s in S:
    c=corp[s['work_id']]
    raw=oa.get(s['work_id'],'') if c['abstract_source']=='openalex' else sc.get(c['doi'].lower().replace('https://doi.org/',''),'')
    a=norm(raw); h=hashlib.sha256(a.encode()).hexdigest()
    if h!=c['abstract_sha256']: bad.append((s['work_id'],c['abstract_source'],len(a)))
    out.append({'work_id':s['work_id'],'title':c['title'],'abstract':a})
json.dump(out,open('inputs.json','w'),ensure_ascii=False)
print('n',len(out),'hash mismatch',len(bad),bad[:10])
