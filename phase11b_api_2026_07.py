import urllib.request, json

url = 'https://api.fenegosida.org/api/website/v1/Dashboard/monthwisehistory?date=2026-07'
req = urllib.request.Request(url, headers={'User-Agent':'Mozilla/5.0','Accept':'application/json'})
resp = urllib.request.urlopen(req, timeout=8)
data = json.loads(resp.read().decode('utf-8'))

print(f'Records returned: {len(data)}')
print(json.dumps(data[:4], ensure_ascii=False, indent=2))
print('...')
# Group by date
dates = sorted(set(r['todayDate'] for r in data))
print(f'Unique dates: {len(dates)}')
for d in dates:
    day_recs = [r for r in data if r['todayDate']==d]
    print(f'  {d}: {[r[\"rateType\"] for r in day_recs]}')
