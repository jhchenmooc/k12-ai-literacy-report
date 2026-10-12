# 重組一致性樣本的摘要（PROTOCOL 第 3 節），逐篇核對 abstract_sha256。只在 scratchpad 執行，輸出 inputs.json 含摘要，不得 commit。
# 用法：python3 -I agreement_inputs.py ../2025/corpus-v2.csv <Scopus 匯出 CSV 目錄>
#   執行目錄位於任何 git 工作目錄內即拒絕（inputs.json 含受限摘要）。同一 DOI 的 Scopus 候選全部保留，
#   取正規化後雜湊相符者（與讀取順序無關）；任何一篇沒有相符候選、OpenAlex 摘要錯誤／缺紀錄／null、
#   abstract_source 不是 openalex／scopus、或 OpenAlex 傳輸失敗，都以非零結束碼退出，不寫也不動 inputs.json。
#   錯誤訊息只列 work_id、來源、長度與雜湊前綴，不輸出摘要原文。norm() 與 corpus 的 abstract_sha256 同一套，不可改動。
import csv,json,sys,re,hashlib,glob,urllib.request,urllib.parse,urllib.error,http.client,os
HERE=os.path.dirname(os.path.abspath(__file__));sys.path.insert(0,HERE)
import safeio  # noqa: E402
def in_git_worktree(path):
    p=os.path.abspath(path)
    while True:
        if os.path.exists(os.path.join(p,'.git')): return p
        q=os.path.dirname(p)
        if q==p: return None
        p=q
g=in_git_worktree(os.getcwd())
if g: safeio.die(f'refusing to run inside a git work tree ({g}): inputs.json would hold restricted abstracts; run in a scratch directory outside any repository')
if len(sys.argv)!=3: safeio.die('usage: agreement_inputs.py <corpus-v2.csv> <Scopus export CSV dir>')
with open(sys.argv[1],encoding='utf-8',newline='') as fh: corp={x['work_id']:x for x in csv.DictReader(fh)}
with open('sample.json',encoding='utf-8') as fh: S=json.load(fh)
def norm(t):
    t=re.sub(r'^\s*abstract\s*[:.]?\s*','',t,flags=re.I)
    t=re.split(r'©|\(c\)|Copyright',t,maxsplit=1,flags=re.I)[0] if re.search(r'©|\(c\)|Copyright',t,flags=re.I) else t
    return re.sub(r'\s+',' ',t).strip()
ndoi=lambda d:re.sub(r'^(https?://(dx\.)?doi\.org/|doi:)','',(d or '').strip().lower())
sha=lambda a:hashlib.sha256(a.encode()).hexdigest()
err=[];seen=set()
if not isinstance(S,list): safeio.die('sample.json: not a JSON list')
for k,s in enumerate(S,1):
    w=s.get('work_id') if isinstance(s,dict) else None
    if not isinstance(w,str) or not w.strip(): err.append(f'sample.json entry {k}: missing, empty or non-string work_id');continue
    if w in seen: err.append(f'{w}: duplicate in sample.json (entry {k})');continue
    seen.add(w)
    if w not in corp: err.append(f'{w}: no record in {os.path.basename(sys.argv[1])}')
    elif corp[w]['abstract_source'] not in ('openalex','scopus'): err.append(f"{w}: abstract_source {corp[w]['abstract_source']!r} is not openalex or scopus")
if err: safeio.die(err)
sc={}
for f in sorted(glob.glob(os.path.join(sys.argv[2],'*.csv'))):
    with open(f,encoding='utf-8-sig',newline='') as fh:
        for r in csv.DictReader(fh):
            if r.get('DOI'): sc.setdefault(ndoi(r['DOI']),[]).append(r.get('Abstract') or '')
oa_ids=[s['work_id'] for s in S if corp[s['work_id']]['abstract_source']=='openalex']
oa={}
for i in range(0,len(oa_ids),50):
    chunk=oa_ids[i:i+50];where=f'OpenAlex batch {i//50+1}'
    q=urllib.parse.urlencode({'filter':'openalex:'+'|'.join(chunk),'per-page':'50','select':'id,abstract_inverted_index'})
    try:
        with urllib.request.urlopen('https://api.openalex.org/works?'+q,timeout=60) as resp: d=json.loads(resp.read().decode('utf-8'))
    except urllib.error.HTTPError as e: safeio.die(f'{where}: transport failure (HTTP {e.code}); inputs.json not written')
    except (urllib.error.URLError,http.client.HTTPException,OSError) as e: safeio.die(f'{where}: transport failure ({type(e).__name__}); inputs.json not written')
    except ValueError: safeio.die(f'{where}: response anomaly: body is not JSON; inputs.json not written')
    res=d.get('results') if isinstance(d,dict) else None
    if not isinstance(res,list): safeio.die(f'{where}: response anomaly: no results array; inputs.json not written')
    for w in res:
        wid=(w.get('id') or '').split('/')[-1] if isinstance(w,dict) else ''
        if wid not in chunk: safeio.die(f'{where}: response anomaly: unrequested result {wid!r}; inputs.json not written')
        if wid in oa: safeio.die(f'{wid}: OpenAlex returned the record twice; inputs.json not written')
        inv=w.get('abstract_inverted_index')
        if not isinstance(inv,dict) or not inv: oa[wid]=None;continue
        pos=sorted((p,t) for t,ps in inv.items() for p in ps)
        oa[wid]=' '.join(t for p,t in pos)
out=[];bad=[]
for s in S:
    c=corp[s['work_id']];want=c['abstract_sha256']
    if c['abstract_source']=='openalex':
        raw=oa.get(s['work_id'])
        if s['work_id'] not in oa: bad.append(f"{s['work_id']}: openalex returned no record");continue
        if raw is None: bad.append(f"{s['work_id']}: openalex abstract is null or empty");continue
        cands=[raw]
    else:
        cands=sc.get(ndoi(c['doi']),[])
        if not cands: bad.append(f"{s['work_id']}: scopus export has no row for its DOI");continue
    normed=sorted(set(norm(x) for x in cands))
    hit=[a for a in normed if sha(a)==want]
    if not hit:
        bad.append(f"{s['work_id']}: {c['abstract_source']} hash mismatch; {len(normed)} distinct candidate(s), lengths {[len(a) for a in normed]}, sha256 prefixes {[sha(a)[:12] for a in normed]}, expected {want[:12]}");continue
    out.append({'work_id':s['work_id'],'title':c['title'],'abstract':hit[0]})
if bad: safeio.die(bad+[f'{len(bad)} of {len(S)} records rejected; inputs.json not written'])
safeio.write_atomic([('inputs.json',safeio.json_bytes(out,ensure_ascii=False))])
print('n',len(out),'hash mismatch',0,[])
