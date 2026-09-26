import urllib.request
headers = {'User-Agent': 'Mozilla/5.0'}

for m in ['2026-09', '2026-08', '2024-05', '2081-05']:
    req = urllib.request.Request(f'https://api.fenegosida.org/api/website/v1/Dashboard/monthwisehistory?date={m}', headers=headers)
    try:
        with urllib.request.urlopen(req) as res:
            print(f"monthwise {m}: HTTP {res.status}")
            if res.status == 200:
                print(res.read().decode()[:100])
    except Exception as e:
        print(f"monthwise {m}: {e}")

for d in ['2026-09-25', '2026-08-30']:
    req = urllib.request.Request(f'https://api.fenegosida.org/api/website/v1/Dashboard/datewisehistory?date={d}', headers=headers)
    try:
        with urllib.request.urlopen(req) as res:
            print(f"datewise {d}: HTTP {res.status}")
            if res.status == 200:
                print(res.read().decode()[:100])
    except Exception as e:
        print(f"datewise {d}: {e}")
