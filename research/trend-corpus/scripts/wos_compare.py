# D7 Web of Science 對照（2025）：WoS 匯出（Tab delimited）對 OpenAlex 2025 主查詢聯集（DEV-001 重跑版）。
# 用法：python3 -I wos_compare.py <repo>/research/trend-corpus <WoS 匯出檔目錄> [--panel-only]
#   在 scratchpad 執行；寫 wos-compare.csv（每筆 WoS 紀錄的歸類，不含摘要）與 summary.json。
#   --panel-only：先依 SN／EI 篩面板 ISSN、PY 2024–2026、DT Article／Review（用於非依 queries.txt 檢索的匯出）。
# 歸類：in_union（DOI 在 2025 聯集）／oa_other_year（OpenAlex 全庫年份不是 2025，不算漏收）／
#       oa_2025_not_in_union（候選漏收）／not_in_openalex（DOI 在 OpenAlex 查不到）／no_doi（另列，不算漏收）。
import csv,sys,os,glob,json,urllib.request,urllib.parse,time,collections
R,D=sys.argv[1],sys.argv[2];panel_only='--panel-only' in sys.argv
csv.field_size_limit(10**8)
union={(r['doi'] or '').lower().replace('https://doi.org/',''):r['work_id'] for r in csv.DictReader(open(os.path.join(R,'2025','corpus-v2.csv'))) if r['doi']}
ids=set(json.load(open(os.path.join(R,'rerun-dev001','2025','ids-corpus.json'))))
issn={i:x['journal_code'] for x in csv.DictReader(open(os.path.join(R,'journals.csv'))) if x['in_panel']=='yes' for i in x['issns'].split(';') if i}
recs=[]
for f in sorted(glob.glob(os.path.join(D,'*.txt'))+glob.glob(os.path.join(D,'*.tsv'))):
    for r in csv.DictReader(open(f,encoding='utf-8-sig'),delimiter='\t',quoting=csv.QUOTE_NONE):
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
need=[x['doi'] for x in rows if x['doi'] and x['doi'] not in union]
oa={}
for i in range(0,len(need),50):
    chunk=need[i:i+50]
    q=urllib.parse.urlencode({'filter':'doi:'+'|'.join('https://doi.org/'+d for d in chunk),'per-page':'50','select':'id,doi,publication_year,primary_location'})
    for k in range(4):
        try:d=json.load(urllib.request.urlopen('https://api.openalex.org/works?'+q,timeout=60));break
        except Exception as e:time.sleep(2**k)
    for w in d['results']:
        src=((w.get('primary_location') or {}).get('source') or {}).get('id','')
        oa[(w['doi'] or '').lower().replace('https://doi.org/','')]=(w['id'].rsplit('/',1)[1],w['publication_year'],src.rsplit('/',1)[-1])
    time.sleep(0.2)
for x in rows:
    if not x['doi']:x['status']='no_doi'
    elif x['doi'] in union:x['status']='in_union';x['work_id']=union[x['doi']]
    elif x['doi'] in oa:
        wid,yr,src=oa[x['doi']];x['work_id']=wid;x['oa_year']=yr;x['oa_source']=src
        x['status']='in_union' if wid in ids else ('oa_2025_not_in_union' if yr==2025 else 'oa_other_year')
    else:x['status']='not_in_openalex'
F=['UT','doi','PY','EA','DT','journal_code','status','work_id','oa_year','oa_source']
with open('wos-compare.csv','w',newline='') as f:
    w=csv.DictWriter(f,fieldnames=F,extrasaction='ignore',lineterminator='\n');w.writeheader();w.writerows(rows)
S={'wos_records':len(recs),'unique':len(seen),'compared':len(rows),'status':collections.Counter(x['status'] for x in rows),
   'by_journal':collections.Counter(x['journal_code'] or '(non-panel)' for x in rows),'by_PY':collections.Counter(x['PY'] for x in rows)}
json.dump(S,open('summary.json','w'),ensure_ascii=False,indent=1);print(json.dumps(S,ensure_ascii=False))
