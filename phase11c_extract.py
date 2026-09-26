import urllib.request, json, os, subprocess

urls = [
    'https://www.fenegosida.org/uploads/weekly/240419061625x9yc6g.pdf', # mid-April 2024
    'https://www.fenegosida.org/uploads/weekly/240503064620v32ae8.pdf', # May 2024
]

os.makedirs('phase11c_pdfs', exist_ok=True)

for original_url in urls:
    fn = original_url.split('/')[-1]
    wayback_url = 'http://web.archive.org/web/id_/' + original_url
    print('Fetching from wayback: ' + wayback_url)
    try:
        req = urllib.request.Request(wayback_url, headers={'User-Agent':'Mozilla/5.0'})
        content = urllib.request.urlopen(req, timeout=15).read()
        if content[:4] == b'%PDF':
            with open('phase11c_pdfs/' + fn, 'wb') as f:
                f.write(content)
            print('  Saved ' + fn + ' (' + str(len(content)) + ' bytes)')
        else:
            print('  Not a PDF, starts with: ' + str(content[:20]))
    except Exception as e:
        print('  Failed: ' + str(e))
