import json
with open('public/data/historical-rates.json', 'r', encoding='utf-8') as f:
    db = json.load(f)

print(f"Total: {len(db['data'])}")
date_metal_counts = {}
for r in db['data']:
    date_metal_counts[r['date_ad']] = date_metal_counts.get(r['date_ad'], 0) + 1

for d, c in sorted(date_metal_counts.items()):
    print(f"{d}: {c}")
