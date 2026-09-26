import urllib.request, json, re

# Method B: Inspect official site pages for JS bundle references to document endpoints
pages = [
    'https://www.fenegosida.org/history',
    'https://www.fenegosida.org/',
    'https://www.fenegosida.org/notices',
    'https://www.fenegosida.org/downloads',
    'https://www.fenegosida.org/reports',
    'https://www.fenegosida.org/market',
]

endpoint_patterns = [
    r'WeeklyReport\w*',
    r'HistoryList\w*',
    r'weeklyhistory\w*',
    r'monthwisehistory\w*',
    r'DailyRate\w*',
    r'uploads/weekly',
    r'/api/[a-zA-Z0-9/_-]+',
    r'\.pdf',
    r'getReport\w*',
    r'download\w*',
    r'PriceHistory\w*',
    r'RateHistory\w*',
    r'WeeklyData\w*',
    r'GetWeekly\w*',
    r'datewisehistory\w*',
]

found_endpoints = set()
found_pdfs = set()

for page_url in pages:
    try:
        req = urllib.request.Request(page_url, headers={'User-Agent':'Mozilla/5.0'})
        html = urllib.request.urlopen(req, timeout=8).read().decode('utf-8', errors='ignore')
        
        # Find script bundle URLs
        scripts = re.findall(r'src="([^"]+\.js[^"]*)"', html)
        for s in scripts[:5]:  # Check first 5 JS bundles
            if 'fenegosida' in s or s.startswith('/'):
                full_url = s if s.startswith('http') else 'https://www.fenegosida.org' + s
                try:
                    req2 = urllib.request.Request(full_url, headers={'User-Agent':'Mozilla/5.0'})
                    js_content = urllib.request.urlopen(req2, timeout=8).read().decode('utf-8', errors='ignore')
                    for patt in endpoint_patterns:
                        matches = re.findall(patt, js_content[:50000])
                        for m in matches:
                            found_endpoints.add(m[:80])
                except: pass
        
        # Search HTML directly for PDF links and API paths
        pdf_links = re.findall(r'/uploads/weekly/[a-zA-Z0-9._-]+\.pdf', html)
        api_paths = re.findall(r'/api/[a-zA-Z0-9/._-]+', html)
        found_pdfs.update(pdf_links)
        found_endpoints.update(api_paths)
        
    except Exception as e:
        print('Page ' + page_url + ': ' + str(e)[:60])

print('=== BROWSER/HTML INVESTIGATION ===')
print('PDF links found in HTML: ' + str(len(found_pdfs)))
for p in found_pdfs:
    print('  ' + p)
print('API endpoint patterns found: ' + str(len(found_endpoints)))
for ep in sorted(found_endpoints)[:30]:
    print('  ' + ep)
