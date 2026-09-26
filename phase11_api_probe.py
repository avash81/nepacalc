import urllib.request, json, re

# Method C: probe FENEGOSIDA API for historical coverage
base = 'https://api.fenegosida.org/api/website/v1/Dashboard'

endpoints = [
    'monthwisehistory?date=2083-01',
    'monthwisehistory?date=2083-02',
    'monthwisehistory?date=2083-03',
    'monthwisehistory?date=2083-04',
    'monthwisehistory?date=2082-01',
    'monthwisehistory?date=2082-06',
    'monthwisehistory?date=2082-12',
    'WeeklyReportList',
    'WeeklyReport',
    'HistoryList',
    'DailyRateList',
    'monthwisereport',
]

for ep in endpoints:
    url = f'{base}/{ep}'
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        resp = urllib.request.urlopen(req, timeout=5)
        code = resp.getcode()
        body = resp.read(200).decode('utf-8', errors='ignore')
        print(f'OK [{code}] {ep}: {body[:120]}')
    except urllib.error.HTTPError as e:
        print(f'HTTP {e.code}: {ep}')
    except Exception as e:
        print(f'ERR: {ep}: {str(e)[:60]}')
