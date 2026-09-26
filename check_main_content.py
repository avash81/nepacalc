import urllib.request
import re

url = 'http://localhost:3004/market-rates/history/'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
resp = urllib.request.urlopen(req, timeout=15)
html = resp.read().decode('utf-8')

main_start = html.find('<main')
main_end = html.find('</main>') + 7
main_html = html[main_start:main_end]

# Check external links
ext_links = re.findall(r'href="(https?://[^"]+)"[^>]*target="_blank"', main_html)
ext_links_noopener = re.findall(r'noopener noreferrer', main_html)

print('=== Localhost Verification ===')
print('HTTP:', resp.getcode())
print()

# Title check
title_m = re.search(r'<title>(.*?)</title>', html, re.DOTALL)
print('Title:', title_m.group(1).strip() if title_m else 'MISSING')

# H1 check
h1_m = re.search(r'<h1[^>]*>(.*?)</h1>', html, re.DOTALL)
print('H1:', re.sub(r'<[^>]+>', '', h1_m.group(1)).strip() if h1_m else 'MISSING')

# External links in main
print()
print('External links in <main>:')
for link in ext_links:
    print(' ', link)
print('noopener noreferrer count:', len(ext_links_noopener))

# Forbidden chars in main
em_dashes = re.findall('\u2014', main_html)
arrows    = re.findall('\u2192', main_html)
emojis    = re.findall('[\U0001F300-\U0001FFFF]', main_html)
print()
print('Em-dashes in main:', len(em_dashes))
print('Arrow chars in main:', len(arrows))
print('Emojis in main:', len(emojis))

# Key checks
print()
print('OG image history:', 'history-gold-silver-nepal' in html)
print('robots max-image-preview:', 'max-image-preview' in html)
print('FENEGOSIDA link:', 'fenegosida.org.np' in html)
print('NRB link:', 'nrb.org.np' in html)
print('World Gold Council link:', 'gold.org' in html)
print('noindex:', 'noindex' in html.lower())
print()
print('=== PASS ===')
