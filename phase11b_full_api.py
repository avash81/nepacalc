import urllib.request, json

def probe_month(ym):
    url = f'https://api.fenegosida.org/api/website/v1/Dashboard/monthwisehistory?date={ym}'
    try:
        req = urllib.request.Request(url, headers={'User-Agent':'Mozilla/5.0','Accept':'application/json'})
        resp = urllib.request.urlopen(req, timeout=8)
        if resp.getcode() == 200:
            data = json.loads(resp.read().decode('utf-8'))
            dates = sorted(set(r['todayDate'] for r in data))
            return dates, data
        return [], []
    except:
        return [], []

# Test all months that returned 200 or might contain 2082-adjacent data
months_to_probe = [
    '2026-07', '2026-08', '2026-09', '2026-10',
]

print('=== API COVERAGE PROBE (AD months) ===')
all_new_dates = []
all_new_records = []
for ym in months_to_probe:
    dates, data = probe_month(ym)
    if dates:
        print(f'{ym}: {len(dates)} trading dates -> {dates}')
        for d in dates:
            all_new_dates.append(d)
        all_new_records.extend(data)
    else:
        print(f'{ym}: No content')

print()
print(f'Total API records found: {len(all_new_records)}')
print(f'Total unique dates: {len(set(all_new_dates))}')

# Show rate types
if all_new_records:
    rate_types = sorted(set(r.get('rateType','') for r in all_new_records))
    print(f'Rate types: {rate_types}')

# Show sample record structure
if all_new_records:
    print()
    print('Sample record:')
    print(json.dumps(all_new_records[0], ensure_ascii=False, indent=2))
