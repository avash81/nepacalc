import urllib.request
import re

# Download the main module to find the API service class
req = urllib.request.Request(
    'https://www.fenegosida.org/assets/index-DpXGtvH-.js',
    headers={'User-Agent': 'Mozilla/5.0'}
)
js = urllib.request.urlopen(req, timeout=15).read().decode('utf-8', errors='ignore')

# Find getDateWiseHistory, getRateHistory, getMonthHistory definitions
for fn in ['getDateWiseHistory', 'getRateHistory', 'getMonthHistory']:
    idx = js.find(fn)
    if idx >= 0:
        snippet = js[idx-50:idx+300]
        print(f"\n=== {fn} ===")
        print(snippet)
