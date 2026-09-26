import json, csv, hashlib

def checksum(p):
    with open(p,'rb') as f: return hashlib.sha256(f.read()).hexdigest()[:16]

with open('public/data/historical-rates.json','r',encoding='utf-8') as f: db=json.load(f)
with open('public/data/historical-rates.csv','r',encoding='utf-8') as f: cr=list(csv.DictReader(f))

rows=db['data']
gold=[r for r in rows if r['metal']=='gold']
silv=[r for r in rows if r['metal']=='silver']
dates=sorted(set(r['date_ad'] for r in rows))
ck=checksum('public/data/historical-rates.json')

QUARANTINE={'2508291059454hy78y.pdf','2601020304005r106s.pdf','260123044935ehtkpy.pdf','26022008145339a745.pdf'}
leaks=[r for r in rows if r.get('source_document_id','') in QUARANTINE]
anom=[r for r in rows if r.get('source_rate_10g',0)>900000]
MOCK=set(130000.0+i*500 for i in range(50))
mock_hits=[r for r in rows if r.get('source_rate_10g') in MOCK]

print('=== PHASE 11C BASELINE VERIFICATION ===')
print('JSON rows        : ' + str(len(rows)) + '  (expected 144)')
print('CSV rows         : ' + str(len(cr)))
print('Gold             : ' + str(len(gold)))
print('Silver           : ' + str(len(silv)))
print('Unique dates     : ' + str(len(dates)))
print('Earliest         : ' + dates[0])
print('Latest           : ' + dates[-1])
print('JSON/CSV parity  : ' + ('PASS' if len(rows)==len(cr) else 'FAIL'))
print('Checksum         : ' + ck)
print('Expected         : ede5ea177f0157ee')
print('Match            : ' + str(ck=='ede5ea177f0157ee'))
print('Quarantine leaks : ' + str(len(leaks)))
print('Anomalies >900k  : ' + str(len(anom)))
print('Mock pattern hits: ' + str(len(mock_hits)))
ok = len(rows)==144 and len(cr)==144 and len(leaks)==0 and len(anom)==0 and len(mock_hits)==0 and ck=='ede5ea177f0157ee'
print('BASELINE OK      : ' + str(ok))

print()
print('BS 2081 currently in production:')
bs2081=[r for r in rows if r.get('date_ad','')>='2024-04-14' and r.get('date_ad','')<=  '2025-04-13' and r.get('metal')=='gold']
for r in bs2081:
    print('  ' + r['date_ad'] + '  ' + r.get('source_document_id',''))
