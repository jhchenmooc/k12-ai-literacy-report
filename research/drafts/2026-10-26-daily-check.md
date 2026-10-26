# 每日短訊查核紀錄：2026-10-26（1 則）

> 每日短訊例行作業，由排程觸發，在每日短訊專用 session 執行。
>
> - **檢索：** 同 session 三個子代理分頭檢索（國際研究、國際政策、臺灣中央來源），判讀由本 session 複核。SLE 一篇由本 session 直接讀出版社頁。
> - **查詢時間：** 2026-10-26T00:10Z–00:35Z（UTC）。
> - **請求紀錄：** 都沒帶 email 或 mailto。SAGE 回 403，未繞過；ScienceDirect 只回轉址頁，未跟進。
> - **結果：發布 1 則**（國際研究 1 則；國際政策、臺灣 0 則）。
> - **J51 首例：** Smart Learning Environments 於 2026-10-25 列入監測清單（J51），本期第一則即出自這本期刊。

## 國際

### 查詢

| 來源 | 查詢 | 狀態 | 結果 |
|---|---|---|---|
| Crossref | `filter=from-created-date:2026-10-25,until-created-date:2026-10-25,type:journal-article`，六組 `query.bibliographic`，每組 rows=40 | 200 | 各組總數 190／165／383／1230／120／328，各取 40 |
| Crossref（created 10-26） | 同六組；另查不加條件的總數 | 200 | 查詢時 0 筆 |
| Crossref（proceedings-article） | 10-25、10-26 | 200 | 8／0，皆 ITEMA 2025 或 CLIB 2026，無合格項目 |
| Crossref（監測期刊 ISSN） | 24 本（加入 J51 2196-7091）；帶關鍵詞 rows=60、不帶 rows=200 | 200（J40 一次 429，重試成功） | 10-25：J32 1、J33 4、J41 1、J48 68，J51 0；10-26：0 |
| 教學代理人 | Crossref 兩組 × 期刊／會議論文；OpenAlex（10-19 起）四組；arXiv 一組 | 200 | Crossref 無教學代理人研究；OpenAlex 1 筆（10-24 已列觀察）；arXiv 10-19 後 0 |
| arXiv API（https） | 三組（同 10-20） | 200 | 去重 183 筆，10-19 後提交 73 筆，未判過者皆不合格；API 最新提交日只到 10-22 |
| alphaXiv | discover_papers 一組，published_after 2026-10-19 | 連線成功 | 9 筆，與 arXiv 重疊，皆不合格 |
| 出版者頁面 | SpringerOpen（SLE）、ijpdll、hrmars、journal.uny.ac.id、nature.com、reference-global.com | 200 | — |
| 出版者頁面 | SAGE（Educational Policy） | 403 | — |
| 出版者頁面 | ScienceDirect | 200 但只是轉址頁 | 讀不到 |
| GOV.UK | DfE、Ofqual、Ofsted（10-19 起）以 Content API 逐筆讀，共 105 筆；關鍵詞五組 | 200 | 無新項目；關鍵詞命中 3 筆皆非教育機關，C |
| Federal Register | term 三組、ED 篩選、ED × AI、10-26 期、public inspection | 200 | 10-26 期 99 筆，ED 只有 2026-21804（10-24 已讀，無 AI）；10-27 期無 ED 文件 |
| MEXT | 報道発表、新着、大臣會見列表 | 200 | 無新項目；10-23 記者會見「テキスト版」仍寫「後日、アップロードします。」 |
| 中國教育部 | 9 個欄目與首頁 | 200 | 10-25 首頁兩則無 AI，C；另有一欄目網址列表為空，下次核對路徑 |
| 香港政府新聞公報 | 10-25 全日（英 8、中 9）；10-26 | 200 | 10-25 無 AI 字詞；10-26 查詢時尚未上載 |
| 韓國 KICE／韓國教育部／KERIS | 列表 | 200（韓國教育部第一次 connection reset，重試成功） | 無新項目 |
| UNESCO | `/en/newsroom` | 200 | 無新項目 |
| Eurydice | /news | 200 | 無新項目 |

### 發布

| 編號 | 來源 | 首發日（依據） | 範圍 | 對象 | 型態 |
|---|---|---|---|---|---|
| D20261026-01 | J51 Smart Learning Environments Bergdahl〈Student epistemic agency in AI-mediated practices〉 https://doi.org/10.1186/s40561-026-00464-y | 2026-10-24（SpringerOpen 頁 Published；Crossref published-online 同日） | A（S-ETH、S-BAS） | k12（瑞典一所學校 47 名七年級學生） | 作者摘要型 |

- **摘要依據：** 摘要第 2 至 4 句與第 6 句。第 6 句為作者報告的描述性結果（問卷調查，非介入研究）。
- **第二輪對照：** 由隔離子代理進行，判定基本一致。依建議修改三處，修正後一致：
  - 「較強／較弱」改為原文的「強／弱」。
  - 「AI 課程」改為「AI 教學」。
  - 改寫問卷發放句。
- **候選池與知識庫：**
  - 候選池新增 W2026-10-23-A10（batch 2026-10-26-daily-1）。
  - 沿用 #381 已入庫的 KB-2026-0433，改為 bibliographic_checked 並連上 source_candidate_id，不另建紀錄。
  - 知識庫驗證程式目前只接受到 J50，所以暫不加 published_in J51；未修改驗證程式或測試。

### E5a 前 7 天回查（政策，首次公開 10-19～10-26）

- **GOV.UK：** 三機構 105 筆以 Content API 逐筆讀過，沒有新的 AI 項目。HM Treasury AI 計畫（10-24）已判 C；Home Office、BIST 的 AI 項目都不是教育，C。
- **Federal Register：** 窗口內 term 命中都不是教育機關；ED 的 6 筆都已判過。
- **中國教育部：** 10-19 後 27 篇原頁都讀過。補記一則前幾日未列的項目：〈中俄总理第三十一次定期会晤联合公报(全文)〉（10-22）。
  - AI 相關段為「扩大人工智能领域青年学者、研究人员、专家和科学教育工作者交流互访。商定共同推进机器学习国际学校建设」。
  - 對象是研究人員與學者（adult），C。
- **UNESCO、MEXT、韓國、Eurydice、香港：** 窗口內項目都已判過。

無漏收。

### 待補（監測清單內，未達門檻）

| 項目 | 首次公開 | 範圍 | 對象 | 說明 |
|---|---|---|---|---|
| J41 Computers and Education Open `10.1016/j.caeo.2026.100429`（Fong 等，〈Human Perspectives Versus ChatGPT Evaluations of Feedback〉） | 不明（Crossref 只有 2026-10，無 published-online；ScienceDirect 只回轉址頁；OpenAlex 404） | 待判 | 不明 | 讀不到摘要；見瀏覽器清單 |

### 列觀察（出處不在監測清單）

- **`10.30935/ijpdll/19665`**：International Journal of Professional Development, Learners and Learning（Bastas）。
  - 篇名：Kharbach、Woodworth、Sawchuk〈K-12 AI literacy frameworks after generative AI: A scoping review〉。
  - 首次公開 2026-10-25（出版社頁）。
  - 內容：2024–2025 年 K-12 AI 素養框架的範疇回顧，納入 50 篇。
  - 判定：A，k12。在四筆中最接近可發。
- **`10.6007/ijarbss/v16-i10/29204`**：International Journal of Academic Research in Business and Social Sciences（HRMARS）。
  - 內容：8 名高中生評估 AI 產生的節能建議與信任的質性研究。
  - 首次公開 2026-10-25。
  - 判定：A 邊界，k12；商管社科期刊，審查品質未核實。
- **`10.21831/jpip.v19i2.98797`**：Jurnal Penelitian Ilmu Pendidikan（Universitas Negeri Yogyakarta）。
  - 內容：伊斯蘭小學課程整合 AI 倫理的概念模型，方法為文獻與文件分析。
  - 首次公開 2026-10-19。
  - 判定：A 偏弱，k12。
- **`10.2478/bjes-2026-0019`**：TalTech Journal of European Studies（De Gruyter）。
  - 內容：以愛沙尼亞 AI Leap 為例，分析歐盟 AI 法與 GDPR 下教育 AI 的高風險分類，屬法律分析。
  - 首次公開 2026-10-25。
  - 判定：對象不明，C 或邊界。

### 不收

- **監測期刊：**
  - J33 `s41599-026-09533-6`：生成式 AI 與倫理理解，研究公眾道德判斷，非教育，C。
  - J32 `s44217-026-02258-3`：大學軟體工程課程，higher_ed，非 AI。
  - 其餘 J33、J48 命中皆非教育或非 AI；J51 這兩天無新登記。
- **Crossref 關鍵詞命中：**
  - teacher_ed：`10.59698/kognisi.v4i1.647`。
  - higher_ed：`10.70088/1e1ya973`、`10.67785/pjpp.8.283`、`10.12973/eu-jer.16.1.23`、`10.1177/10711813261498757`、`10.70171/wrwxkz66`、`10.70088/27vb8056`。
  - teacher_ed／higher_ed：`10.58218/lambda.v6i3.4708`。
  - adult／higher_ed：`10.46787/ijaipil.v1i4.8089`。
  - higher_ed 或 unknown：`10.35452/caless.1941359`。
  - 機器學習只是方法，C：`10.61424/issej.v4i4.1119`。
  - 無摘要、對象不明：`10.33902/jpsp.202648559`。
  - 卷首導論，SAGE 403：`10.1177/08959048261498211`。
  - 其餘首次公開早於 10-19。
- **arXiv：**
  - 已判過：2610.28859、2610.26758、2610.31481、2610.30599、2610.30195、2610.29140、2610.30828、2610.31041。
  - 2610.31335：大一線性代數學生，higher_ed。
  - 其餘為技術論文，C。

## 臺灣

| 來源 | 狀態 | 列表最新項目 | 10-25 08:26 後新筆數 |
|---|---|---|---|
| 教育部即時新聞 RSS | 200 | 2026-10-25 08:35 | 2（AI 相關 1 則，C） |
| 資訊及科技教育司 RSS | 200 | 2026-10-07 | 0 |
| 國教署即時新聞 | 200 | 2026-10-21 | 0 |
| 行政院公報開放資料 | 200 | 115-10-22 期 | 0（10-23 期仍未補出，四處確認） |
| 行政院本院新聞 RSS | 200 | 2026-10-25 17:16 | 2（無 AI） |
| 國科會新聞資料 RSS | 200 | 2026-10-20 | 0 |
| 數位發展部新聞發布（第 1 頁） | 200 | 2026-10-22 | 0 |
| 師資培育及藝術教育司 RSS | 200 | 2026-10-25 08:35 | 1（與教育部 RSS 重複，無 AI） |
| 學生事務及特殊教育司 RSS | 200 | 2026-10-22 16:35 | 0 |

- **〈扎根國中小交通安全教育 打造安心學習環境〉**（國教署，2026-10-25 08:30）
  - 主題是交通安全教育重點學校。AI 只出現在一所國中「運用AI進行交通安全課程轉化」一句，屬個別學校的教學工具應用，不涉學生 AI 素養，C。
- **〈教育家人物典範 臺中市立廍子國中校長賴文宗打造無障礙三喜校園〉**：無 AI，不收。
- **行政院公報 115-10-23 期：** 仍未補出。四處確認：最新下載、本月清單、首頁本期，以及以出版日期直接查詢的期別清單，都停在 10-22（第 196 期）。下一期出刊時再確認。

臺灣段無新項目。

## 候選池與知識庫

候選池 W2026-10-23-A10 新增並改為 publish；知識庫沿用 KB-2026-0433（改為 bibliographic_checked），無新增紀錄與關係。

## 需要管理者處理

- **補查：**
  - MEXT 10-23 大臣記者會見文字版仍未上傳，頁面列出的關鍵詞無 AI，10-27 再查。
  - 行政院公報 10-23 期仍未補出。
  - 香港 10-26 全日公報，10-27 查。
- **來源擴充（供參考）：** 觀察項中 `10.30935/ijpdll/19665`（K-12 AI 素養框架範疇回顧）內容與本刊主題最直接。是否發布或評估該期刊，由管理者決定。

## 請管理者用瀏覽器處理（2026-10-26）

1. https://doi.org/10.1016/j.caeo.2026.100429 （J41 Computers and Education Open，Fong 等〈Human Perspectives Versus ChatGPT Evaluations of Feedback〉；ScienceDirect 對程式只回轉址頁，Crossref 只有出版年月、無摘要）
   - 要什麼：文章頁「Available online」日期與摘要（截圖或全文 PDF）。
   - 拿到後：若首次上線在 10-19 之後、對象為中小學師生且屬 A／B，可補發（上線日後 7 天內）。

前幾日清單已處理完畢，無延續項目。
