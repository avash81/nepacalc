import urllib.request, json
url = 'http://web.archive.org/cdx/search/cdx?url=fenegosida.org/uploads/weekly/*&output=json&fl=original&collapse=urlkey'
try:
    req = urllib.request.Request(url, headers={'User-Agent':'Mozilla/5.0'})
    resp = urllib.request.urlopen(req, timeout=15)
    if resp.getcode() == 200:
        data = json.loads(resp.read().decode('utf-8'))
        urls = [r[0] for r in data if r[0] != 'original' and r[0].endswith('.pdf')]
        
        # Filter for 2024 and 2025
        target_urls = [u for u in urls if 'uploads/weekly/24' in u or 'uploads/weekly/25' in u]
        print('Target PDFs (2024-2025): ' + str(len(target_urls)))
        for u in target_urls:
            print('  ' + u)
    else:
        print('Wayback API returned ' + str(resp.getcode()))
except Exception as e:
    print('Wayback API error: ' + str(e))
