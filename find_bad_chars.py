import urllib.request
import re

url = 'http://localhost:3004/market-rates/history/'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
resp = urllib.request.urlopen(req, timeout=15)
html = resp.read().decode('utf-8')

# Find em-dashes with context
for m in re.finditer('\u2014', html):
    start = max(0, m.start() - 60)
    end = min(len(html), m.end() + 60)
    print('EM-DASH found at', m.start(), ':', repr(html[start:end]))

# Find emojis with context
for m in re.finditer('[\U0001F300-\U0001FFFF]', html):
    start = max(0, m.start() - 60)
    end = min(len(html), m.end() + 60)
    print('EMOJI found at', m.start(), ':', repr(html[start:end]))
