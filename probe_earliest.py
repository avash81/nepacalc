import urllib.request
import json
headers = {'User-Agent': 'Mozilla/5.0'}

# Test back from 2026-08 down to 2020 to find earliest API record
earliest = None
for year in [2026, 2025, 2024, 2023, 2022]:
    for month in range(12, 0, -1):
        m = f"{year}-{month:02d}"
        url = f"https://api.fenegosida.org/api/website/v1/Dashboard/monthwisehistory?date={m}"
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req) as res:
                if res.status == 200:
                    data = res.read().decode('utf-8')
                    if len(data) > 10:
                        print(f"Found data in {m}")
                        earliest = m
        except Exception as e:
            pass

print(f"Earliest API record found: {earliest}")
