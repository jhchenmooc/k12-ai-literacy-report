# 草稿三張圖（2026-10-12，附錄 A 管理者決定第 20 項 (4)）：靜態 SVG，數字取自主表、extra-sensitivity-output.txt 與第 3.2 節。
# 圖 1 點區間圖（兩期比例與 Wilson 95% 區間，兩期不連線）；圖 2 兩期差距區間（Newcombe 與期刊叢集 bootstrap，含 0 參考線）；
# 圖 3 第 1 項情境（前期區間為帶狀背景，後期各情境的估計與區間）。
# 用法：python3 -I research/p0-annual-trends-2022-2025/supplementary/scripts/make_figures.py research/p0-annual-trends-2022-2025/supplementary/outputs/figures
import math,os,sys
OUT=sys.argv[1]
def wilson(k,n,z=1.959964):
    p=k/n;d=1+z*z/n;c=(p+z*z/(2*n))/d;h=z*math.sqrt(p*(1-p)/n+z*z/(4*n*n))/d;return 100*p,100*(c-h),100*(c+h)
SURF='#fcfcfb';T1='#0b0b0b';T2='#52514e';GRID='#e4e3df';C1='#2a78d6';C2='#eb6834'
FONT="font-family='Noto Sans CJK TC, PingFang TC, Microsoft JhengHei, sans-serif'"
def svg(w,h,body,title):
    return f"<svg xmlns='http://www.w3.org/2000/svg' width='{w}' height='{h}' viewBox='0 0 {w} {h}' role='img' aria-label='{title}' {FONT}><rect width='{w}' height='{h}' fill='{SURF}'/>{body}</svg>"
def t(x,y,s,size=13,fill=T1,anchor='start',weight='normal'):
    return f"<text x='{x:.1f}' y='{y:.1f}' font-size='{size}' fill='{fill}' text-anchor='{anchor}' font-weight='{weight}'>{s}</text>"
def axis(x0,x1,y0,y1,lo,hi,ticks,fmt):
    X=lambda v:x0+(v-lo)/(hi-lo)*(x1-x0);s=''
    for v in ticks:
        s+=f"<line x1='{X(v):.1f}' x2='{X(v):.1f}' y1='{y0}' y2='{y1}' stroke='{GRID}' stroke-width='1'/>"+t(X(v),y1+18,fmt(v),11,T2,'middle')
    return s,X
def marker(x,y,color,shape):
    if shape=='c':return f"<circle cx='{x:.1f}' cy='{y:.1f}' r='5' fill='{color}' stroke='{SURF}' stroke-width='2'/>"
    return f"<rect x='{x-5:.1f}' y='{y-5:.1f}' width='10' height='10' rx='1.5' fill='{color}' stroke='{SURF}' stroke-width='2'/>"
def interval(x0,x1,y,color):
    return f"<line x1='{x0:.1f}' x2='{x1:.1f}' y1='{y:.1f}' y2='{y:.1f}' stroke='{color}' stroke-width='2' stroke-linecap='round'/>"
def legend(x,y):
    return marker(x,y,C1,'c')+t(x+10,y+4,'前期 2022–23',12,T1)+marker(x+120,y,C2,'s')+t(x+130,y+4,'後期 2024–25',12,T1)
# 圖 1
items=[('第 1 項 學生研究占比（主結論：不確定）',(71,92),(118,204)),
       ('第 3 項 學生 AI 倫理（變化不確定，僅供參考）',(25,71),(56,118)),
       ('第 7 項 有成效測量的介入研究（原定分母；不確定）',(18,31),(74,118)),
       ('第 8 項 學生研究中國小與國中（變化不確定）',(23,71),(40,118))]
W,H=820,80+len(items)*70+60;x0,x1=330,790;body=''
ax,X=axis(x0,x1,70,70+len(items)*70,0,100,range(0,101,20),lambda v:f'{v}%');body+=ax
body+=t(20,28,'圖 1　四項比較的兩期比例與 Wilson 95% 區間（敏感度與描述，不是結論；結論見第 2 節）',14,T1,weight='bold')+legend(x0,50)
for i,(lab,a,b) in enumerate(items):
    y=100+i*70;body+=t(20,y+8,lab,12,T1)
    for (k,n),dy,c,sh in ((a,-9,C1,'c'),(b,9,C2,'s')):
        p,lo,hi=wilson(k,n);body+=interval(X(lo),X(hi),y+dy,c)+marker(X(p),y+dy,c,sh)+t(X(hi)+8,y+dy+4,f'{k}／{n}',11,T2)
body+=t(20,H-14,'第 2 項（生成式 AI）前期分子只有 4 篇，主結論只列篇數，不畫入本圖。兩期之間不連線：本報告只比較兩期，不畫逐年趨勢。',11,T2)
open(os.path.join(OUT,'fig1-period-intervals.svg'),'w').write(svg(W,H,body,'圖 1 兩期比例與區間'))
# 圖 2
diffs=[('第 1 項 學生研究占比',-19.3,(-29.4,-7.7),(-34.6,-4.8)),('第 3 項 學生 AI 倫理',12.2,(-2.3,25.7),(-6.2,27.9)),
       ('第 8 項 國小與國中',1.5,(-12.5,14.7),(-11.9,15.9)),('第 8a 項 含中學未細分',-4.9,(-19.2,9.5),(-24.6,12.4))]
W,H=820,90+len(diffs)*60+80;x0,x1=260,790;body=''
ax,X=axis(x0,x1,80,80+len(diffs)*60,-40,40,range(-40,41,10),lambda v:f'{v:+d}' if v else '0');body+=ax
body+=f"<line x1='{X(0):.1f}' x2='{X(0):.1f}' y1='80' y2='{80+len(diffs)*60}' stroke='{T2}' stroke-width='1.5'/>"
body+=t(20,28,'圖 2　兩期差距（後期減前期，百分點）的 95% 區間（敏感度，不是結論）',14,T1,weight='bold')
body+=interval(x0,x0+24,52,T1)+t(x0+30,56,'Newcombe 區間',12)+f"<line x1='{x0+150}' x2='{x0+174}' y1='52' y2='52' stroke='{T2}' stroke-width='2' stroke-dasharray='4 3'/>"+t(x0+180,56,'期刊叢集 bootstrap 區間',12)
for i,(lab,d,nc,cb) in enumerate(diffs):
    y=110+i*60;body+=t(20,y+4,lab,12,T1)
    body+=interval(X(nc[0]),X(nc[1]),y-7,T1)+f"<line x1='{X(cb[0]):.1f}' x2='{X(cb[1]):.1f}' y1='{y+7}' y2='{y+7}' stroke='{T2}' stroke-width='2' stroke-dasharray='4 3'/>"
    body+=f"<circle cx='{X(d):.1f}' cy='{y:.1f}' r='4.5' fill='{T1}' stroke='{SURF}' stroke-width='2'/>"+t(X(max(nc[1],cb[1]))+8,y+4,f'{d:+.1f}',11,T2)
body+=t(20,H-30,'區間跨過 0 的項目，方向無法判斷（「變化不確定」），但區間也包含不小的差距，不能讀成「沒有變化」。',11,T2)
body+=t(20,H-12,'第 1 項差距的區間不含 0，但依規則 3（對象不明比例兩期相差超過 10 個百分點），主結論仍是「不確定」。',11,T2)
open(os.path.join(OUT,'fig2-differences.svg'),'w').write(svg(W,H,body,'圖 2 兩期差距區間'))
# 圖 3
sc=[('主表（逐篇可計）',118,204),('依全文判讀（模型，只作敏感度）',123,219),('同上，只計信心「高」者',121,212),('同上，判不出的 11 篇全算學生',134,230),
    ('同上，判不出的 11 篇全算教師',123,230),('未判定 89 篇全算學生（補讀前的情境）',207,293),('未判定 89 篇全算教師（補讀前的情境）',118,293),('所有對象不明的 A 類全算學生（極端）',267,353)]
W,H=820,100+len(sc)*40+50;x0,x1=330,790;body=''
ax,X=axis(x0,x1,80,80+len(sc)*40,30,90,range(30,91,10),lambda v:f'{v}%');body+=ax
p,lo,hi=wilson(71,92)
body+=f"<rect x='{X(lo):.1f}' y='80' width='{X(hi)-X(lo):.1f}' height='{len(sc)*40}' fill='{C1}' fill-opacity='0.12'/>"+f"<line x1='{X(p):.1f}' x2='{X(p):.1f}' y1='80' y2='{80+len(sc)*40}' stroke='{C1}' stroke-width='2'/>"
body+=t(20,28,'圖 3　第 1 項（學生研究占比）：後期在各情境下的估計（敏感度，不是結論）',14,T1,weight='bold')
body+=f"<rect x='{x0}' y='44' width='24' height='12' fill='{C1}' fill-opacity='0.25'/>"+t(x0+30,55,'前期 71／92（77.2%）及其 95% 區間',12)+marker(x0+290,50,C2,'s')+t(x0+300,55,'後期估計與 95% 區間',12)
for i,(lab,k,n) in enumerate(sc):
    y=100+i*40;q,l,h=wilson(k,n);body+=t(20,y+4,lab,12,T1)+interval(X(l),X(h),y,C2)+marker(X(q),y,C2,'s')+t(X(h)+8,y+4,f'{k}／{n}',11,T2)
body+=t(20,H-14,'「依全文判讀」各列的情境結論還取決於「沒有研究參與者」是否算對象不明（第 3.2 節）；主結論為「不確定」。',11,T2)
open(os.path.join(OUT,'fig3-item1-scenarios.svg'),'w').write(svg(W,H,body,'圖 3 第 1 項情境'))
print('ok')
