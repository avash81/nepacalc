import urllib.request, json

endpoints = [
    'https://api.fenegosida.org/api/website/v1/Dashboard/WeeklyChartRate?date=2024-05-15',
    'https://api.fenegosida.org/api/website/v1/Dashboard/WeeklyChartRate?date=2024-06-05',
    'https://api.fenegosida.org/api/website/v1/Dashboard/datewisehistory?date=2024-05-15',
    'https://api.fenegosida.org/api/website/v1/Dashboard/datewisehistory?date=2024-06-05'
]

print('=== API PROBE: DATE ENDPOINTS ===')
for url in endpoints:
    try:
        req = urllib.request.Request(url, headers={'User-Agent':'Mozilla/5.0','Accept':'application/json'})
        resp = urllib.request.urlopen(req, timeout=6)
        code = resp.getcode()
        body = resp.read(300).decode('utf-8','ignore')
        if code == 200:
            print('  [200 OK] ' + url)
            print('    Body: ' + body[:200])
        else:
            print('  [' + str(code) + '] ' + url)
    except urllib.error.HTTPError as e:
        print('  [' + str(e.code) + '] ' + url)
    except Exception as ex:
        print('  [ERR] ' + url + ': ' + str(ex)[:40])
