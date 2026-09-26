"""
Phase 12 — Download all four official PDFs and extract their text tables.
Saves PDFs locally, then extracts text with pdfplumber.
"""
import urllib.request, hashlib, os, json

DOCS = [
    {
        'doc_id': 'FEN-WEEKLY-2082-05-13',
        'filename': '2508291059454hy78y.pdf',
        'url': 'https://www.fenegosida.org/uploads/weekly/2508291059454hy78y.pdf',
        'bs_period': '2082/05/08 - 2082/05/13',
        'ad_period': '2025-08-24 - 2025-08-29',
    },
    {
        'doc_id': 'FEN-WEEKLY-2082-09-18',
        'filename': '2601020304005r106s.pdf',
        'url': 'https://www.fenegosida.org/uploads/weekly/2601020304005r106s.pdf',
        'bs_period': '2082/09/13 - 2082/09/18',
        'ad_period': '2025-12-28 - 2026-01-02',
    },
    {
        'doc_id': 'FEN-WEEKLY-2082-10-09',
        'filename': '260123044935ehtkpy.pdf',
        'url': 'https://www.fenegosida.org/uploads/weekly/260123044935ehtkpy.pdf',
        'bs_period': '2082/10/04 - 2082/10/09',
        'ad_period': '2026-01-18 - 2026-01-23',
    },
    {
        'doc_id': 'FEN-WEEKLY-2082-11-08',
        'filename': '26022008145339a745.pdf',
        'url': 'https://www.fenegosida.org/uploads/weekly/26022008145339a745.pdf',
        'bs_period': '2082/11/03 - 2082/11/08',
        'ad_period': '2026-02-15 - 2026-02-20',
    },
]

os.makedirs('phase12_pdfs', exist_ok=True)
download_results = {}

for doc in DOCS:
    fn = doc['filename']
    local_path = os.path.join('phase12_pdfs', fn)
    print('Downloading: ' + doc['url'])
    try:
        req = urllib.request.Request(
            doc['url'],
            headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
        )
        with urllib.request.urlopen(req, timeout=30) as resp:
            code = resp.getcode()
            content = resp.read()
        
        size = len(content)
        ck = hashlib.sha256(content).hexdigest()[:12]
        
        with open(local_path, 'wb') as f:
            f.write(content)
        
        download_results[fn] = {
            'status': code,
            'size_bytes': size,
            'checksum': ck,
            'local_path': local_path,
            'ok': True,
        }
        print('  HTTP ' + str(code) + '  size=' + str(size) + 'B  sha256=' + ck)
    except Exception as e:
        download_results[fn] = {'status': 'ERR', 'error': str(e), 'ok': False}
        print('  ERROR: ' + str(e))

print()
print('=== DOWNLOAD SUMMARY ===')
ok_count = sum(1 for v in download_results.values() if v.get('ok'))
print('Downloaded OK : ' + str(ok_count) + ' / ' + str(len(DOCS)))

with open('phase12_download_results.json', 'w') as f:
    json.dump(download_results, f, indent=2)
print('Results saved to phase12_download_results.json')
