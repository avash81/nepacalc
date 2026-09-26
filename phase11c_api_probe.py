import urllib.request, json

# AD months corresponding to BS 2081 (Apr 2024 - Apr 2025)
months = [
    '2024-04','2024-05','2024-06','2024-07','2024-08',
    '2024-09','2024-10','2024-11','2024-12',
    '2025-01','2025-02','2025-03','2025-04',
]

print('=== API PROBE: BS 2081 AD months ===')
findings = {}
for ym in months:
    url = 'https://api.fenegosida.org/api/website/v1/Dashboard/monthwisehistory?date=' + ym
    try:
        req = urllib.request.Request(url, headers={'User-Agent':'Mozilla/5.0','Accept':'application/json'})
        resp = urllib.request.urlopen(req, timeout=8)
        code = resp.getcode()
        if code == 200:
            data = json.loads(resp.read().decode('utf-8'))
            dates = sorted(set(r['todayDate'] for r in data))
            print('  ' + ym + ': 200 OK — ' + str(len(dates)) + ' dates: ' + str(dates))
            findings[ym] = dates
        else:
            print('  ' + ym + ': HTTP ' + str(code))
    except urllib.error.HTTPError as e:
        print('  ' + ym + ': HTTP ' + str(e.code))
    except Exception as ex:
        print('  ' + ym + ': ERR ' + str(ex)[:50])

print()
print('Months with API data: ' + str(len(findings)))
