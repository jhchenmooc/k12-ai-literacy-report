# 回溯三年（2022–2024）合併一致性：第一次（各年 corpus.csv）對第二次（out/batch*.jsonl）；κ 用三年合併值，另附各年 A／B 列供參考。
# 用法：python3 -I agreement_kappa_backfill.py <repo>/research/trend-corpus（在含 sample.json 與 out/ 的目錄執行）→ 寫 agreement.csv、coding2.csv
import csv,json,sys,glob,collections,os
R=sys.argv[1]
import hashlib;PSHA=hashlib.sha256(open(os.path.join(R,'prompts','code2.md'),'rb').read()).hexdigest()
corp={}
for y in (2022,2023,2024):
    for x in csv.DictReader(open(os.path.join(R,str(y),'corpus.csv'))): corp[x['work_id']]=x
c2={};bid={}
for f in sorted(glob.glob('out/batch*.jsonl')):
    for l in open(f):
        if l.strip(): o=json.loads(l); c2[o['work_id']]=o; bid[o['work_id']]='CB-'+os.path.basename(f)[5:-6]
S=json.load(open('sample.json')); year={s['work_id']:s['year'] for s in S}
ids=[s['work_id'] for s in S]; missing=[i for i in ids if i not in c2]; print('coded',len(c2),'missing',missing)
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
w=csv.writer(open('agreement.csv','w',newline=''),lineterminator='\n');w.writerow(['dimension','n','agree','kappa','n_excl_both_unknown','agree_excl','kappa_excl','unknown_rate_c1','unknown_rate_c2','n_positive_either','subset']);w.writerows(rows)
for r in rows: print(r)
print('model_ids',collections.Counter(c2[i].get('model_id') for i in ids))
print('class crosstab',sorted(collections.Counter((corp[i]['ai_lit_class'],c2[i]['ai_lit_class']) for i in ids).items()))
st={s['work_id']:s for s in S}
F=['year','work_id','stratum_class','stratum_stage','batch_id','ai_lit_class','b_subtype','audience_role','stage','ai_lit_dims','level','topic','method','outcome_measured','genai_flag','ai_lit_note','rationale','codebook_version','prompt_sha256','model_id']
with open('coding2.csv','w',newline='') as f:
    w=csv.writer(f,lineterminator='\n');w.writerow(F)
    for i in ids:
        o=c2[i];j=lambda v:';'.join(v) if isinstance(v,list) else (v or '')
        w.writerow([year[i],i,st[i]['stratum_class'],st[i]['stratum_stage'],bid[i],o.get('ai_lit_class',''),o.get('b_subtype',''),o.get('audience_role',''),o.get('stage',''),j(o.get('ai_lit_dims')),o.get('level',''),j(o.get('topic')),o.get('method',''),o.get('outcome_measured',''),o.get('genai_flag',''),o.get('ai_lit_note',''),o.get('rationale',''),'v2',PSHA,o.get('model_id','')])
