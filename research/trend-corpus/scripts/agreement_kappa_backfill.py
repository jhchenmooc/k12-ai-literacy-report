# 回溯三年（2022–2024）合併一致性：第一次（各年 corpus.csv）對第二次（out/batch*.jsonl）；κ 用三年合併值，另附各年 A／B 列供參考。
# 用法：python3 -I agreement_kappa_backfill.py <repo>/research/trend-corpus [--allow-partial]（在含 sample.json 與 out/ 的目錄執行）→ 寫 agreement.csv、coding2.csv
#   先驗證後寫檔：sample.json 的 work_id 重複／缺少／非字串、year 不是 2022–2024 或與該 work_id 所在年份 corpus 不符、
#   batch 內任何重複（含同值）、batch 有 sample 以外的 work_id，都以非零結束碼拒絕，兩個既有輸出都不動。
#   sample 中有未編碼者：預設拒絕；--allow-partial 只寫 agreement.partial.csv、coding2.partial.csv 與 partial-missing.txt。
#   兩檔先都寫成暫存檔再依序取代；兩次取代之間中斷時兩檔可能不一致（已知限制，見 safeio.py）。
import csv,json,sys,glob,collections,os
HERE=os.path.dirname(os.path.abspath(__file__));sys.path.insert(0,HERE)
import safeio  # noqa: E402
args=[a for a in sys.argv[1:] if a!='--allow-partial'];partial='--allow-partial' in sys.argv[1:]
if len(args)!=1: safeio.die('usage: agreement_kappa_backfill.py <research/trend-corpus> [--allow-partial]')
R=args[0]
import hashlib
with open(os.path.join(R,'prompts','code2.md'),'rb') as fh: PSHA=hashlib.sha256(fh.read()).hexdigest()
corp={};cyear={}
for y in (2022,2023,2024):
    with open(os.path.join(R,str(y),'corpus.csv'),encoding='utf-8',newline='') as fh:
        for x in csv.DictReader(fh): corp[x['work_id']]=x;cyear.setdefault(x['work_id'],set()).add(y)
err=[]
B=safeio.read_jsonl_batches(sorted(glob.glob('out/batch*.jsonl')),err)
c2={w:o for w,(o,_,_) in B.items()};bid={w:'CB-'+os.path.basename(f)[5:-6] for w,(_,f,_) in B.items()}
with open('sample.json',encoding='utf-8') as fh: S=json.load(fh)
ids=[];st={}
if not isinstance(S,list): err.append('sample.json: not a JSON list');S=[]
for k,s in enumerate(S,1):
    w=s.get('work_id') if isinstance(s,dict) else None
    if not isinstance(w,str) or not w.strip(): err.append(f'sample.json entry {k}: missing, empty or non-string work_id');continue
    if w in st: err.append(f'{w}: duplicate in sample.json (entry {k})');continue
    st[w]=s;ids.append(w)
    y=s.get('year')
    if w not in corp: err.append(f'{w}: sample.json entry {k} has no record in 2022-2024 corpus.csv')
    elif type(y) is not int or y not in (2022,2023,2024): err.append(f'{w}: sample.json entry {k} year {y!r} is not 2022-2024')
    elif y not in cyear[w]: err.append(f'{w}: sample.json entry {k} year {y} but the work is in corpus year(s) {sorted(cyear[w])}')
    for f in ('stratum_class','stratum_stage'):
        if not isinstance(s.get(f),str): err.append(f'{w}: sample.json entry {k} {f} missing or not a string')
year={w:st[w]['year'] for w in ids}
for w in sorted(set(c2)-set(st)): err.append(f'{w}: second coding in out/ is not in sample.json')
missing=[i for i in ids if i not in c2]
if missing and not partial: err.append(f'{len(missing)} sampled work_id(s) have no second coding (use --allow-partial for exploratory *.partial.csv): '+' '.join(missing))
if err: safeio.die(err)
print('coded',len(c2),'missing',missing)
ids=[i for i in ids if i in c2]
def kappa(a,b):
    n=len(a)
    if n==0: return None,None
    po=sum(x==y for x,y in zip(a,b))/n; ca,cb=collections.Counter(a),collections.Counter(b)
    pe=sum(ca[k]*cb[k] for k in set(ca)|set(cb))/n/n
    return po,(po-pe)/(1-pe) if pe<1 else None
def lst(v):
    if isinstance(v,list): return v
    return [t for t in (v or '').replace(';',',').split(',') if t.strip()]
rows=[]
def rep(name,a,b,subset,pos=None,unk='unknown'):
    if not a: return
    po,k=kappa(a,b); keep=[(x,y) for x,y in zip(a,b) if not (x==unk and y==unk)]
    po2,k2=kappa([x for x,_ in keep],[y for _,y in keep])
    npos='' if pos is None else sum(x==pos or y==pos for x,y in zip(a,b))
    r=lambda v:None if v is None else round(v,3)
    rows.append([name,len(a),r(po),r(k),len(keep),r(po2),r(k2),round(sum(x==unk for x in a)/len(a),3),round(sum(y==unk for y in b)/len(b),3),npos,subset])
def block(ids,subset,full=True):
    cls1=[corp[i]['ai_lit_class'] for i in ids]; cls2=[c2[i]['ai_lit_class'] for i in ids]
    rep('A vs non-A',[('A' if x=='A' else 'nonA') for x in cls1],[('A' if x=='A' else 'nonA') for x in cls2],subset,pos='A',unk='__')
    rep('A/B/C/unknown',cls1,cls2,subset)
    ab=[i for i in ids if corp[i]['ai_lit_class'] in ('A','B') and c2[i]['ai_lit_class'] in ('A','B')]
    rep('A vs B (both A/B)',[corp[i]['ai_lit_class'] for i in ab],[c2[i]['ai_lit_class'] for i in ab],subset,pos='A',unk='__')
    if not full: return
    sub=[i for i in ids if corp[i]['ai_lit_class'] in ('A','B') or c2[i]['ai_lit_class'] in ('A','B')]
    for f in ('audience_role','stage','method'):
        rep(f+' (A/B either)',[corp[i][f] or 'unknown' for i in sub],[c2[i].get(f) or 'unknown' for i in sub],subset)
    for d in ['T-PD','T-TEA','T-BAS','T-ETH','S-SYS','S-LRN','S-BAS','S-ETH']:
        rep('dim '+d,[d in lst(corp[i]['ai_lit_dims']) for i in sub],[d in lst(c2[i].get('ai_lit_dims')) for i in sub],subset,pos=True,unk='__')
block(ids,'all_sampled_2022-2024')
for y in (2022,2023,2024): block([i for i in ids if year[i]==y],f'year_{y}',full=False)
AGREE=safeio.csv_bytes(['dimension','n','agree','kappa','n_excl_both_unknown','agree_excl','kappa_excl','unknown_rate_c1','unknown_rate_c2','n_positive_either','subset'],rows,lineterminator='\n')
for r in rows: print(r)
print('model_ids',collections.Counter(c2[i].get('model_id') for i in ids))
print('class crosstab',sorted(collections.Counter((corp[i]['ai_lit_class'],c2[i]['ai_lit_class']) for i in ids).items()))
F=['year','work_id','stratum_class','stratum_stage','batch_id','ai_lit_class','b_subtype','audience_role','stage','ai_lit_dims','level','topic','method','outcome_measured','genai_flag','ai_lit_note','rationale','codebook_version','prompt_sha256','model_id']
j=lambda v:';'.join(v) if isinstance(v,list) else (v or '')
out=[]
for i in ids:
    o=c2[i]
    out.append([year[i],i,st[i]['stratum_class'],st[i]['stratum_stage'],bid[i],o.get('ai_lit_class',''),o.get('b_subtype',''),o.get('audience_role',''),o.get('stage',''),j(o.get('ai_lit_dims')),o.get('level',''),j(o.get('topic')),o.get('method',''),o.get('outcome_measured',''),o.get('genai_flag',''),o.get('ai_lit_note',''),o.get('rationale',''),'v2',PSHA,o.get('model_id','')])
CODING=safeio.csv_bytes(F,out,lineterminator='\n')
if partial and missing: safeio.write_atomic([('agreement.partial.csv',AGREE),('coding2.partial.csv',CODING),('partial-missing.txt',''.join(i+'\n' for i in missing).encode('utf-8'))])
else: safeio.write_atomic([('agreement.csv',AGREE),('coding2.csv',CODING)])
