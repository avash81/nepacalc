import urllib.request, json
url = 'http://web.archive.org/cdx/search/cdx?url=fenegosida.org/uploads/weekly/*&output=json&fl=original&collapse=urlkey'
try:
    req = urllib.request.Request(url, headers={'User-Agent':'Mozilla/5.0'})
    resp = urllib.request.urlopen(req, timeout=15)
    if resp.getcode() == 200:
        data = json.loads(resp.read().decode('utf-8'))
        urls = [r[0] for r in data if r[0] != 'original' and r[0].endswith('.pdf')]
        print('Wayback PDFs found: ' + str(len(urls)))
        for u in urls[:20]:
            print('  ' + u)
    else:
        print('Wayback API returned ' + str(resp.getcode()))
except Exception as e:
    print('Wayback API error: ' + str(e))
