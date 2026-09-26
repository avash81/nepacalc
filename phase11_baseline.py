import json, csv

with open('public/data/historical-rates.json', 'r', encoding='utf-8') as f:
    db = json.load(f)

rows = db['data']
gold = [r for r in rows if r['metal'] == 'gold']
silver = [r for r in rows if r['metal'] == 'silver']
dates = sorted(set(r['date_ad'] for r in rows))

print(f'JSON rows: {len(rows)}')
print(f'Gold: {len(gold)}')
print(f'Silver: {len(silver)}')
print(f'Unique dates: {len(dates)}')
print(f'Earliest: {dates[0]}')
print(f'Latest: {dates[-1]}')

with open('public/data/historical-rates.csv', 'r', encoding='utf-8') as f:
    csv_rows = list(csv.DictReader(f))
print(f'CSV rows: {len(csv_rows)}')
parity = "PASS" if len(rows)==len(csv_rows) else "FAIL"
print(f'JSON/CSV parity: {parity}')

# Print coverage windows
prev = None
for d in dates:
    if prev and (( __import__('datetime').date.fromisoformat(d) - __import__('datetime').date.fromisoformat(prev) ).days > 1):
        print(f'  GAP: {prev} -> {d}')
    prev = d

src_docs = set(r.get('source_document_id','') for r in rows)
print(f'Source documents: {len(src_docs)}')
for s in sorted(src_docs):
    print(f'  {s}')
