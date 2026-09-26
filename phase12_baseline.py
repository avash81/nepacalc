import json, csv, hashlib

def checksum(path):
    with open(path, 'rb') as f:
        return hashlib.sha256(f.read()).hexdigest()[:16]

with open('public/data/historical-rates.json', 'r', encoding='utf-8') as f:
    db = json.load(f)
with open('public/data/historical-rates.csv', 'r', encoding='utf-8') as f:
    csv_rows = list(csv.DictReader(f))

rows = db['data']
gold = [r for r in rows if r['metal']=='gold']
silv = [r for r in rows if r['metal']=='silver']
dates = sorted(set(r['date_ad'] for r in rows))
ck = checksum('public/data/historical-rates.json')

print('=== PHASE 12 BASELINE VERIFICATION ===')
print('JSON rows         : ' + str(len(rows)))
print('CSV rows          : ' + str(len(csv_rows)))
print('Gold              : ' + str(len(gold)))
print('Silver            : ' + str(len(silv)))
print('Unique dates      : ' + str(len(dates)))
print('Earliest          : ' + dates[0])
print('Latest            : ' + dates[-1])
print('JSON/CSV parity   : ' + ('PASS' if len(rows)==len(csv_rows) else 'FAIL'))
print('Checksum          : ' + ck)
print('Expected checksum : ede5ea177f0157ee')
print('Match             : ' + str(ck == 'ede5ea177f0157ee'))

QUARANTINED = {'2508291059454hy78y.pdf','2601020304005r106s.pdf','260123044935ehtkpy.pdf','26022008145339a745.pdf'}
leaks = [r for r in rows if r.get('source_document_id','') in QUARANTINED]
anomalies = [r for r in rows if r.get('source_rate_10g',0) > 900000]
print('Quarantine leaks  : ' + str(len(leaks)))
print('Anomalies >900000 : ' + str(len(anomalies)))

import re
MOCK_VALS = set(130000.0 + i*500 for i in range(30))
mock_hits = [r for r in rows if r.get('source_rate_10g') in MOCK_VALS]
print('Mock pattern hits : ' + str(len(mock_hits)))
print('BASELINE OK       : ' + str(len(rows)==144 and len(leaks)==0 and len(anomalies)==0 and len(mock_hits)==0))
