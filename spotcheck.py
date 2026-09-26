import json
from collections import defaultdict

data = json.loads(open('public/data/historical-rates.json', encoding='utf-8-sig').read())
records = data['data']

# Spot check: pick 5 dates per year from Gahana records (unverified)
gahana = [r for r in records if r['source_type'] == 'archive_web_scrape' and r['metal'] == 'gold']
by_year = defaultdict(list)
for r in gahana:
    by_year[r['date_ad'][:4]].append(r)

print('Gahana gold records by year:')
for yr in sorted(by_year.keys()):
    print(f'  {yr}: {len(by_year[yr])} records')

print()
print('Sample spot-check dates (5 per year):')
for yr in sorted(by_year.keys()):
    # pick evenly spaced samples
    lst = by_year[yr]
    step = max(1, len(lst)//5)
    samples = [lst[i] for i in range(0, len(lst), step)][:5]
    for s in samples:
        print(f"  {s['date_ad']} | BS: {s['date_bs']} | Tola: {int(s['source_rate_tola'])}")
