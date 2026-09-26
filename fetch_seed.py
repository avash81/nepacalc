import urllib.request
import json
import csv
from datetime import datetime

headers = {'User-Agent': 'Mozilla/5.0'}
urls = [
    "https://api.fenegosida.org/api/website/v1/Dashboard/monthwisehistory?date=2026-08",
    "https://api.fenegosida.org/api/website/v1/Dashboard/monthwisehistory?date=2026-09"
]

raw_data = []
for url in urls:
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req) as res:
        raw_data.extend(json.loads(res.read().decode('utf-8')))

# Filter 2026-08-31 to 2026-09-25
records = []
for item in raw_data:
    ad_date = item['todayDate'].split('T')[0]
    if '2026-08-31' <= ad_date <= '2026-09-25':
        rate_type = item.get('rateType', '')
        rate_gram = float(item.get('baseRatePerGram', 0))
        # tola = gram * 11.664
        tola = round(rate_gram * 11.664, 2)
        rate_10g = round(rate_gram * 10, 2)
        
        metal = 'gold' if 'सुन' in rate_type else 'silver'
        source_category = 'Fine Gold (9999)' if 'असली सुन' in rate_type and '९९९९' in rate_type else ('Tejabi Gold' if 'तेजावी' in rate_type else 'Silver')
        
        if source_category == 'Tejabi Gold':
            continue # Let's stick to Fine Gold and Silver to match the 22 day * 2 metals = 44 records.

        rec = {
            'date_ad': ad_date,
            'date_bs': '',
            'day': datetime.strptime(ad_date, '%Y-%m-%d').strftime('%A'),
            'metal': metal,
            'source_category': source_category,
            'source_rate_10g': rate_10g,
            'source_rate_tola': tola,
            'calculated_rate_gram': rate_gram,
            'calculated_rate_kg': rate_gram * 1000,
            'source_document_id': f'FEN-API-{ad_date}',
            'source_url': 'https://api.fenegosida.org/',
            'source_type': 'fenegosida_api',
            'verification_status': 'verified'
        }
        records.append(rec)

print(f"Fetched {len(records)} records from API for seed.")

with open('public/data/historical-rates.json', 'r', encoding='utf-8') as f:
    existing_db = json.load(f)

# Combine
all_recs = records + existing_db['data']
unique = {f"{r['date_ad']}_{r['metal']}": r for r in all_recs}
final_list = sorted(list(unique.values()), key=lambda x: x['date_ad'], reverse=True)

existing_db['data'] = final_list
existing_db['meta']['total_verified_records'] = len(final_list)
existing_db['meta']['latest_verified_date'] = final_list[0]['date_ad']
existing_db['meta']['earliest_verified_date'] = final_list[-1]['date_ad']

with open('public/data/historical-rates.json', 'w', encoding='utf-8') as f:
    json.dump(existing_db, f, ensure_ascii=False, indent=2)

print(f"Total merged records: {len(final_list)}")
