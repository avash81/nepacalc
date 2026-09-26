import json

with open('public/data/historical-rates.json', 'r', encoding='utf-8') as f:
    db = json.load(f)

records = db['data']

gold_count = sum(1 for r in records if r['metal'].lower() == 'gold')
silver_count = sum(1 for r in records if r['metal'].lower() == 'silver')
unique_dates = len(set(r['date_ad'] for r in records))
sources_used = set(r.get('source_type', 'unknown') for r in records)
document_ids = set(r.get('source_document_id', 'unknown') for r in records)

print(f"Total Records: {len(records)}")
print(f"Gold Count: {gold_count}")
print(f"Silver Count: {silver_count}")
print(f"Unique Dates: {unique_dates}")
print(f"Source Types: {sources_used}")
print(f"Document IDs: {document_ids}")

anomalies = [r for r in records if r.get('price_per_10g_source') == 929855]
print(f"Anomalies found: {len(anomalies)}")

mismatch = False
for r in records:
    expected_tola = float(r['price_per_10g_source']) * 1.1664
    actual_tola = float(r['price_per_tola_source'])
    diff = abs(expected_tola - actual_tola)
    if r['metal'] == 'gold' and diff > 150:
        print(f"Math error in {r['date_ad']} Gold")
        mismatch = True
    elif r['metal'] == 'silver' and diff > 15:
        print(f"Math error in {r['date_ad']} Silver")
        mismatch = True

print(f"Math Audit Passed: {not mismatch}")
