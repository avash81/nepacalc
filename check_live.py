import urllib.request
import json
import re

checks = {
    'https://nepacalc.com/market-rates/history/': 'History page',
    'https://nepacalc.com/data/historical-rates.json': 'JSON endpoint',
    'https://nepacalc.com/data/historical-rates.csv': 'CSV endpoint',
    'https://nepacalc.com/sitemap.xml': 'Sitemap',
    'https://nepacalc.com/robots.txt': 'robots.txt',
    'https://nepacalc.com/images/og/history-gold-silver-nepal.jpg': 'OG image',
}

results = {}
for url, label in checks.items():
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        r = urllib.request.urlopen(req, timeout=10)
        results[label] = r.getcode()
    except Exception as e:
        results[label] = str(e)

for label, status in results.items():
    icon = 'PASS' if status == 200 else 'FAIL'
    print(f'[{icon}] {label}: {status}')

try:
    req = urllib.request.Request('https://nepacalc.com/market-rates/history/', headers={'User-Agent': 'Mozilla/5.0'})
    r = urllib.request.urlopen(req, timeout=10)
    html = r.read().decode('utf-8')
    title_m = re.search(r'<title>(.*?)</title>', html)
    h1_m = re.search(r'<h1[^>]*>(.*?)</h1>', html, re.DOTALL)
    print(f'[Page] Title: {title_m.group(1).strip() if title_m else "MISSING"}')
    print(f'[Page] H1: {re.sub("<[^>]+>", "", h1_m.group(1)).strip() if h1_m else "MISSING"}')
except Exception as e:
    print(f'[Page check failed]: {e}')
