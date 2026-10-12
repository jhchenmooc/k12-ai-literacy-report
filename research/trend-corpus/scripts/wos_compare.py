# D7 Web of Science 對照（2025）：WoS 匯出（Tab delimited）對 OpenAlex 2025 主查詢聯集（DEV-001 重跑版）。
# 用法：python3 -I wos_compare.py <repo>/research/trend-corpus <WoS 匯出檔目錄> [--panel-only]
#   在 scratchpad 執行；寫 wos-compare.csv（每筆 WoS 紀錄的歸類，不含摘要）與 summary.json。
#   --panel-only：先依 SN／EI 篩面板 ISSN、PY 2024–2026、DT Article／Review（用於非依 queries.txt 檢索的匯出）。
# 歸類：in_union（DOI 在 2025 聯集）／oa_other_year（OpenAlex 全庫年份不是 2025，不算漏收）／
#       oa_2025_not_in_union（候選漏收）／not_in_openalex（DOI 在 OpenAlex 查不到）／no_doi（另列，不算漏收）。
#   OpenAlex 查詢失敗（重試用完、429、5xx、其他 HTTP 錯誤）或回應異常（非 JSON、results 不是陣列、回傳請求以外的 DOI、
#   meta 格式錯誤、分頁後仍少於 meta.count）時以非零結束碼退出，不寫也不動 wos-compare.csv／summary.json。沒有回傳的 DOI 才記 not_in_openalex。
#   同一 DOI 對應多個作品：任一在聯集 → in_union；否則任一為 2025 → oa_2025_not_in_union；否則 oa_other_year。
#   work_id／oa_year／oa_source 取代表作品（聯集內 → 2025 → 全部，同級取 work ID 數字最小者），與回應順序無關；
#   多作品 DOI 另列於 summary.json 的 multi_work_dois。兩檔先寫暫存再依序取代（兩次取代之間中斷可能不一致，見 safeio.py）。
import csv,sys,os,glob,json,urllib.request,urllib.parse,urllib.error,http.client,time,collections,re
HERE=os.path.dirname(os.path.abspath(__file__));sys.path.insert(0,HERE)
import safeio  # noqa: E402
R,D=sys.argv[1],sys.argv[2];panel_only='--panel-only' in sys.argv
csv.field_size_limit(10**8)
ndoi=lambda d:(d or '').strip().lower().replace('https://doi.org/','')
with open(os.path.join(R,'2025','corpus-v2.csv'),encoding='utf-8',newline='') as fh:
    union={ndoi(r['doi']):r['work_id'] for r in csv.DictReader(fh) if r['doi']}
with open(os.path.join(R,'rerun-dev001','2025','ids-corpus.json'),encoding='utf-8') as fh: ids=set(json.load(fh))
with open(os.path.join(R,'journals.csv'),encoding='utf-8',newline='') as fh:
    issn={i:x['journal_code'] for x in csv.DictReader(fh) if x['in_panel']=='yes' for i in x['issns'].split(';') if i}
recs=[]
for f in sorted(glob.glob(os.path.join(D,'*.txt'))+glob.glob(os.path.join(D,'*.tsv'))):
    with open(f,encoding='utf-8-sig',newline='') as fh:
        for r in csv.DictReader(fh,delimiter='\t',quoting=csv.QUOTE_NONE):
            recs.append(r)
seen=set();rows=[]
for r in recs:
    ut=r.get('UT');
    if ut in seen:continue
    seen.add(ut)
    j=issn.get((r.get('SN') or '').strip()) or issn.get((r.get('EI') or '').strip()) or ''
    dt=(r.get('DT') or '');py=(r.get('PY') or '').strip()
    if panel_only and not (j and py in ('2024','2025','2026') and any(t in dt for t in ('Article','Review'))):continue
    rows.append({'UT':ut,'doi':(r.get('DI') or '').strip().lower(),'PY':py,'EA':(r.get('EA') or '').strip(),'DT':dt,'journal_code':j,'SO':r.get('SO','')})
need=list(dict.fromkeys(x['doi'] for x in rows if x['doi'] and x['doi'] not in union))
API='https://api.openalex.org/works?';MAXPAGES=20;WID=re.compile(r'https://openalex\.org/(W[0-9A-Za-z]+)$')
def get(q,where):
    last='no attempt'
    for k in range(4):
        if k: time.sleep(2**(k-1))
        try:
            with urllib.request.urlopen(API+q,timeout=60) as resp: body=resp.read()
        except urllib.error.HTTPError as e:
            last=f'HTTP {e.code}'
            if e.code==429 or e.code>=500: continue
            break
        except (urllib.error.URLError,http.client.HTTPException,OSError,ValueError) as e:
            last=type(e).__name__;continue
        try: return json.loads(body.decode('utf-8'))
        except ValueError: safeio.die(f'{where}: response anomaly: body is not JSON; no output written')
    safeio.die(f'{where}: transport failure after retries ({last}); no output written')
oa=collections.defaultdict(dict)
for i in range(0,len(need),50):
    chunk=need[i:i+50];want=set(chunk);where=f'batch {i//50+1} (DOIs {i+1}-{i+len(chunk)})'
    cursor='*';used=set();count=None;got=0
    for page in range(1,MAXPAGES+2):
        if page>MAXPAGES: safeio.die(f'{where}: response anomaly: more than {MAXPAGES} pages; no output written')
        q=urllib.parse.urlencode({'filter':'doi:'+'|'.join('https://doi.org/'+d for d in chunk),'per-page':'50','cursor':cursor,'select':'id,doi,publication_year,primary_location'})
        d=get(q,f'{where} page {page}')
        res=d.get('results') if isinstance(d,dict) else None
        meta=d.get('meta') if isinstance(d,dict) else None
        if not isinstance(res,list): safeio.die(f'{where} page {page}: response anomaly: no results array; no output written')
        if meta is None: meta={}  # no meta: single page, nothing to compare against
        if not isinstance(meta,dict) or ('count' in meta and type(meta['count']) is not int): safeio.die(f'{where} page {page}: response anomaly: malformed meta; no output written')
        if count is None and 'count' in meta: count=meta['count']
        for w in res:
            m=WID.match(w.get('id') or '') if isinstance(w,dict) else None
            doi=ndoi(w.get('doi')) if m else ''
            if not m or doi not in want: safeio.die(f'{where} page {page}: response anomaly: result {(w.get("id") if isinstance(w,dict) else None)!r} doi {doi!r} was not requested; no output written')
            src=((w.get('primary_location') or {}).get('source') or {}).get('id') or ''
            if m.group(1) not in oa[doi]: got+=1
            oa[doi][m.group(1)]=(m.group(1),w.get('publication_year'),src.rsplit('/',1)[-1])
        nc=meta.get('next_cursor')
        if not res or not nc: break
        if nc in used or nc==cursor: safeio.die(f'{where} page {page}: response anomaly: repeated cursor; no output written')
        used.add(cursor);cursor=nc
        time.sleep(0.2)
    if count is not None and count>got: safeio.die(f'{where}: response anomaly: meta.count {count} but only {got} works received; no output written')
    time.sleep(0.2)
wnum=lambda t:(0,int(t[0][1:]),'') if t[0][1:].isdigit() else (1,0,t[0])
def classify(works):
    inu=[t for t in works if t[0] in ids];y25=[t for t in works if t[1]==2025]
    st='in_union' if inu else ('oa_2025_not_in_union' if y25 else 'oa_other_year')
    return st,min(inu or y25 or works,key=wnum)
for x in rows:
    if not x['doi']:x['status']='no_doi'
    elif x['doi'] in union:x['status']='in_union';x['work_id']=union[x['doi']]
    elif oa.get(x['doi']):
        st,(wid,yr,src)=classify(list(oa[x['doi']].values()));x['work_id']=wid;x['oa_year']=yr;x['oa_source']=src;x['status']=st
    else:x['status']='not_in_openalex'
multi={d:sorted(v,key=lambda t:wnum((t,))) for d,v in sorted(oa.items()) if len(v)>1}
F=['UT','doi','PY','EA','DT','journal_code','status','work_id','oa_year','oa_source']
S={'wos_records':len(recs),'unique':len(seen),'compared':len(rows),'status':collections.Counter(x['status'] for x in rows),
   'by_journal':collections.Counter(x['journal_code'] or '(non-panel)' for x in rows),'by_PY':collections.Counter(x['PY'] for x in rows),
   'multi_work_doi_count':len(multi),'multi_work_dois':multi}
CSVB=safeio.csv_bytes(F,[[x.get(k,'') for k in F] for x in rows],lineterminator='\n')
safeio.write_atomic([('wos-compare.csv',CSVB),('summary.json',safeio.json_bytes(S,ensure_ascii=False,indent=1))]);print(json.dumps(S,ensure_ascii=False))
