# 第一次（corpus-v2）對第二次編碼（out/batch*.jsonl）的一致率與 Cohen κ；寫 agreement.csv（另加「雙方皆 K-12 對象的 A 類」面向列見 2025/agreement.csv）。
# 用法：python3 -I agreement_kappa.py ../2025/corpus-v2.csv [--allow-partial]（在含 sample.json 與 out/ 的目錄執行）
#   先驗證後寫檔：sample.json 的 work_id 重複／缺少／非字串、corpus 無對應、batch 內任何重複（含同值）、
#   batch 有 sample 以外的 work_id，都以非零結束碼拒絕，不動既有 agreement.csv。
#   batch 的 ai_lit_class／audience_role／stage／method／ai_lit_dims 不在 codebook 允許值內也拒絕。batch 的值（模型輸出）
#   不直接印出：work_id 只在形如 W 加數字時列出，model_id 只在是一般代號時列出，其餘只列型別、長度與雜湊。
#   sample 中有未編碼者：預設拒絕；--allow-partial 只寫 agreement.partial.csv 與 partial-missing.txt（不寫正式檔名）。
import csv,json,sys,glob,collections,math,os
HERE=os.path.dirname(os.path.abspath(__file__));sys.path.insert(0,HERE)
import safeio  # noqa: E402
args=[a for a in sys.argv[1:] if a!='--allow-partial'];partial='--allow-partial' in sys.argv[1:]
if len(args)!=1: safeio.die('usage: agreement_kappa.py <corpus-v2.csv> [--allow-partial]')
with open(args[0],encoding='utf-8',newline='') as fh: corp={x['work_id']:x for x in csv.DictReader(fh)}
err=[]
B=safeio.read_jsonl_batches(sorted(glob.glob('out/batch*.jsonl')),err);safeio.check_code2_values(B,err)
c2={w:o for w,(o,_,_) in B.items()}
with open('sample.json',encoding='utf-8') as fh: S=json.load(fh)
ids=[];seen=set()
for k,s in enumerate(S if isinstance(S,list) else [],1):
    w=s.get('work_id') if isinstance(s,dict) else None
    if not isinstance(w,str) or not w.strip(): err.append(f'sample.json entry {k}: missing, empty or non-string work_id');continue
    if w in seen: err.append(f'{w}: duplicate in sample.json (entry {k})');continue
    seen.add(w);ids.append(w)
    if w not in corp: err.append(f'{w}: sample.json entry {k} has no record in {os.path.basename(args[0])}')
if not isinstance(S,list): err.append('sample.json: not a JSON list')
for w in sorted(set(c2)-seen): err.append(f'{safeio.show_id(w)}: second coding in out/ is not in sample.json')
missing=[i for i in ids if i not in c2]
if missing and not partial: err.append(f'{len(missing)} sampled work_id(s) have no second coding (use --allow-partial for an exploratory agreement.partial.csv): '+' '.join(missing))
if err: safeio.die(err)
print('coded',len(c2),'missing',missing)
ids=[i for i in ids if i in c2]
def kappa(a,b):
    n=len(a); 
    if n==0: return None,None
    po=sum(x==y for x,y in zip(a,b))/n
    ca,cb=collections.Counter(a),collections.Counter(b)
    pe=sum(ca[k]*cb[k] for k in set(ca)|set(cb))/n/n
    return po,(po-pe)/(1-pe) if pe<1 else None
def lst(v):
    if isinstance(v,list): return v
    try: return json.loads(v) if v and v.startswith('[') else [t for t in (v or '').replace(';',',').split(',') if t.strip()]
    except: return []
rows=[]
def rep(name,a,b,pos=None,unk='unknown'):
    po,k=kappa(a,b)
    keep=[(x,y) for x,y in zip(a,b) if not (x==unk and y==unk)]
    po2,k2=kappa([x for x,_ in keep],[y for _,y in keep])
    ur1=sum(x==unk for x in a)/len(a); ur2=sum(y==unk for y in b)/len(b)
    npos='' if pos is None else sum(x==pos or y==pos for x,y in zip(a,b))
    rows.append([name,len(a),round(po,3),None if k is None else round(k,3),len(keep),None if po2 is None else round(po2,3),None if k2 is None else round(k2,3),round(ur1,3),round(ur2,3),npos])
g1=lambda f:[corp[i][f] or '' for i in ids]; g2=lambda f:[c2[i].get(f) or '' for i in ids]
cls1,cls2=g1('ai_lit_class'),g2('ai_lit_class')
rep('A vs non-A',[('A' if x=='A' else 'nonA') for x in cls1],[('A' if x=='A' else 'nonA') for x in cls2],pos='A',unk='__')
rep('A/B/C/unknown',cls1,cls2)
ab=[i for i in ids if corp[i]['ai_lit_class'] in 'AB' and c2[i]['ai_lit_class'] in ('A','B')]
rep('A vs B (both A/B)',[corp[i]['ai_lit_class'] for i in ab],[c2[i]['ai_lit_class'] for i in ab],pos='A',unk='__')
sub=[i for i in ids if corp[i]['ai_lit_class'] in ('A','B') or c2[i]['ai_lit_class'] in ('A','B')]
for f in ('audience_role','stage','method'):
    rep(f+' (A/B either)',[corp[i][f] or 'unknown' for i in sub],[c2[i].get(f) or 'unknown' for i in sub])
dims=['T-PD','T-TEA','T-BAS','T-ETH','S-SYS','S-LRN','S-BAS','S-ETH']
for d in dims:
    rep('dim '+d,[d in lst(corp[i]['ai_lit_dims']) for i in sub],[d in lst(c2[i].get('ai_lit_dims')) for i in sub],pos=True,unk='__')
H=['dimension','n','agree','kappa','n_excl_both_unknown','agree_excl','kappa_excl','unknown_rate_c1','unknown_rate_c2','n_positive_either']
if partial and missing: safeio.write_atomic([('agreement.partial.csv',safeio.csv_bytes(H,rows)),('partial-missing.txt',''.join(i+'\n' for i in missing).encode('utf-8'))])
else: safeio.write_atomic([('agreement.csv',safeio.csv_bytes(H,rows))])
for r in rows: print(r)
print('model_ids',collections.Counter(safeio.show_label(c2[i].get('model_id')) for i in ids))
cm=collections.Counter((corp[i]['ai_lit_class'],c2[i]['ai_lit_class']) for i in ids); print('class crosstab',sorted(cm.items()))
