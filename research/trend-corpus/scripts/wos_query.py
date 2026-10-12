# D7 Web of Science 對照：由 2025 主查詢（DEV-001 重跑版，rerun-dev001/2025/queries.json 的 M1–M7、C1–C4、A1–A6）
# 與面板期刊 ISSN 產生 WoS 進階檢索式（只印出，不連線）。
# 用法：python3 -I wos_query.py <repo>/research/trend-corpus > wos/queries.txt
import csv,sys,os,json,re
R=sys.argv[1]
q=json.load(open(os.path.join(R,'rerun-dev001','2025','queries.json'),encoding='utf-8'))['subqueries']
s=lambda k:q[k]['filter'].split('title_and_abstract.search:',1)[1]
inner=lambda t:t[1:-1] if t.startswith('(') and t.endswith(')') else t
both=lambda t:'(TI=('+t+') OR AB=('+t+'))'
M=' OR '.join(inner(s(k)) for k in ['M1','M2','M3','M4','M5','M6','M7'])
def pair(k):  # (X) AND (Y)：OpenAlex 對題名＋摘要整體比對；WoS 拆成兩邊各自在題名或摘要
    a,b=re.split(r'\)? AND \(?',inner(s(k)) if not s(k).startswith('(("') else s(k),maxsplit=1)
    a=a.strip('() ') ; b=b.strip('() ')
    return '('+both(a if a.startswith('"') and ' OR ' not in a else a)+' AND '+both(b)+')'
C=[pair(k) for k in ['C1','C2','C3','C4']]
A=[pair(k) for k in ['A1','A2','A3','A4','A5','A6']]
issns=[i for x in csv.DictReader(open(os.path.join(R,'journals.csv'),encoding='utf-8',newline='')) if x['in_panel']=='yes' for i in x['issns'].split(';') if i]
print('# Web of Science Core Collection 進階檢索（Advanced Search），檢索欄位用 TI（題名）與 AB（摘要），對應 OpenAlex title_and_abstract.search。')
print('# 依序執行 #1～#5，最後執行 #6。詞組與 2025 主查詢（DEV-001 重跑版）相同；期刊為 journals.csv in_panel=yes 的全部 ISSN（%d 個）。由 scripts/wos_query.py 產生。'%len(issns))
for n,(title,body) in enumerate([('AI 詞組（M1–M7）',both(M)),('組合子查詢（C1–C4）',' OR '.join(C)),('泛稱 AI × 對象詞（A1–A6，DEV-001）',' OR '.join(A)),
  ('面板期刊 ISSN','IS=('+' OR '.join('"'+i+'"' for i in issns)+')'),('年份與文件類型（2025 對照取前後各一年）','PY=(2024-2026) AND DT=(Article OR Review)'),('合併','(#1 OR #2 OR #3) AND #4 AND #5')],1):
    print();print('#%d %s'%(n,title));print(body)
