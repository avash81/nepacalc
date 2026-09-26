import urllib.request
import re

url = 'http://localhost:3004/market-rates/history/'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
resp = urllib.request.urlopen(req, timeout=10)
html = resp.read().decode('utf-8')

em_dashes = [m.start() for m in re.finditer('\u2014', html)]
arrows    = [m.start() for m in re.finditer('\u2192', html)]
emojis    = [m.start() for m in re.finditer('[\U0001F300-\U0001FFFF]', html)]

print('HTTP status:', resp.getcode())

h1_start = html.find('<h1')
h1_end   = html.find('</h1>')
print('H1 text:', html[h1_start:h1_end+5] if h1_start != -1 else 'MISSING')

print('Em-dashes in HTML:', len(em_dashes))
print('Arrow chars in HTML:', len(arrows))
print('Emoji chars in HTML:', len(emojis))
print('OG image history tag:', 'history-gold-silver-nepal' in html)
print('Canonical present:', 'market-rates/history' in html)
print('Dataset schema present:', '"@type":"Dataset"' in html.replace(' ', '') or "'@type':'Dataset'" in html.replace(' ', ''))
print('How to Read section:', 'How to Read' in html)
print('Related Tools section:', 'Related Tools' in html)
print('Dataset last updated:', 'Dataset last updated' in html)
print('Gold Converter link:', '/calculator/gold-converter/' in html)
print('Silver Converter link:', '/calculator/silver-converter/' in html)
print('Download JSON button:', 'historical-rates.json' in html)
print('Download CSV button:', 'historical-rates.csv' in html)
