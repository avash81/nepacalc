import urllib.request, json
url = 'http://web.archive.org/cdx/search/cdx?url=fenegosida.org/uploads/weekly/*&output=json&fl=original,mimetype&collapse=urlkey'
req = urllib.request.Request(url, headers={'User-Agent':'Mozilla/5.0'})
resp = urllib.request.urlopen(req, timeout=15)
data = json.loads(resp.read().decode('utf-8'))
for r in data[:10]: print(r)
pdf_count = sum(1 for r in data if r[1] == 'application/pdf')
html_count = sum(1 for r in data if r[1] == 'text/html')
print('Actual application/pdf captures:', pdf_count)
print('Actual text/html captures:', html_count)
