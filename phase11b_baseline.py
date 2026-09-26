import json, csv, hashlib

with open('public/data/historical-rates.json', 'r', encoding='utf-8') as f:
    raw = f.read()
    db = json.loads(raw)

rows = db['data']
gold = [r for r in rows if r['metal'] == 'gold']
silver = [r for r in rows if r['metal'] == 'silver']
dates = sorted(set(r['date_ad'] for r in rows))
docs = sorted(set(r.get('source_document_id','') for r in rows))

with open('public/data/historical-rates.csv', 'r', encoding='utf-8') as f:
    csv_rows = list(csv.DictReader(f))

chk = hashlib.sha256(raw.encode()).hexdigest()[:12]

print('=== PHASE 11B BASELINE ===')
print(f'JSON rows:     {len(rows)}')
print(f'CSV rows:      {len(csv_rows)}')
print(f'Gold rows:     {len(gold)}')
print(f'Silver rows:   {len(silver)}')
print(f'Unique dates:  {len(dates)}')
print(f'Earliest:      {dates[0]}')
print(f'Latest:        {dates[-1]}')
parity = 'PASS' if len(rows)==len(csv_rows) else 'FAIL'
print(f'JSON/CSV parity: {parity}')
print(f'JSON checksum:   {chk}')
print(f'Source docs:   {len(docs)}')
for d in docs[:10]:
    print(f'  {d}')
