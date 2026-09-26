import urllib.request, json, re

base_api = 'https://api.fenegosida.org/api/website/v1/Dashboard'

# Probe extended endpoint list for document/report discovery
endpoints = [
    # Date-parameterized history variants
    'monthwisehistory?date=2025-08',  # BS 2082/05
    'monthwisehistory?date=2025-09',
    'monthwisehistory?date=2025-10',
    'monthwisehistory?date=2025-11',
    'monthwisehistory?date=2025-12',
    'monthwisehistory?date=2026-01',  # BS 2082/09-10
    'monthwisehistory?date=2026-02',  # BS 2082/11
    'monthwisehistory?date=2026-03',
    'monthwisehistory?date=2026-04',
    'monthwisehistory?date=2026-05',
    'monthwisehistory?date=2026-06',  # BS 2083/02
    'monthwisehistory?date=2026-07',
    # Try BS-formatted dates
    'monthwisehistory?date=2082-01',
    'monthwisehistory?date=2082-05',
    # Document list endpoints
    'WeeklyReportList',
    'WeeklyChartList',
    'weeklyreport',
    'weeklyreportlist',
    'WeeklyHistory',
    'weeklyhistory',
    'HistoryReport',
    'historyreport',
    'DailyHistory',
    'dailyhistory',
    'RateHistory',
    'ratehistory',
    'PriceHistory',
    'pricehistory',
    'WeeklyData',
    'weeklydata',
    'GetWeeklyReport',
    'GetHistory',
    'GetReports',
    'DownloadReport',
    'WeeklyDownload',
    'Reports',
    'documents',
    'files',
    'uploads',
]

results = {}
for ep in endpoints:
    url = f'{base_api}/{ep}'
    try:
        req = urllib.request.Request(url, headers={'User-Agent':'Mozilla/5.0','Accept':'application/json'})
        resp = urllib.request.urlopen(req, timeout=6)
        code = resp.getcode()
        body = resp.read(400).decode('utf-8', errors='ignore')
        results[ep] = {'code': code, 'body': body[:200]}
    except urllib.error.HTTPError as e:
        results[ep] = {'code': e.code, 'body': ''}
    except Exception as ex:
        results[ep] = {'code': 'ERR', 'body': str(ex)[:60]}

# Summary
print('=== PHASE 11B API NETWORK PROBE ===')
for ep, r in results.items():
    if r['code'] not in [204, 401, 404, 'ERR']:
        print(f'[INTERESTING] {ep}: {r["code"]} — {r["body"][:100]}')

print()
print('--- Status Summary ---')
from collections import Counter
counts = Counter(str(r['code']) for r in results.values())
for status, cnt in sorted(counts.items()):
    print(f'  HTTP {status}: {cnt} endpoints')

# Show any 200 responses with content
print()
print('--- 200 OK Responses ---')
for ep, r in results.items():
    if r['code'] == 200:
        print(f'  {ep}: {r["body"][:200]}')
