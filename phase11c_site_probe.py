import urllib.request, re, json

# METHOD B: Inspect official site HTML/JS for 2081 document references
pages_to_check = [
    'https://www.fenegosida.org/history',
    'https://www.fenegosida.org/notice',
    'https://www.fenegosida.org/notices',
    'https://www.fenegosida.org/report',
    'https://www.fenegosida.org/reports',
    'https://www.fenegosida.org/download',
    'https://www.fenegosida.org/downloads',
    'https://www.fenegosida.org/market',
    'https://www.fenegosida.org/archive',
    'https://www.fenegosida.org/archives',
]

# METHOD C: Extended API probe - alternate endpoint patterns
api_endpoints = [
    'https://api.fenegosida.org/api/website/v1/Dashboard/weeklyreport',
    'https://api.fenegosida.org/api/website/v1/Dashboard/WeeklyReport',
    'https://api.fenegosida.org/api/website/v1/Dashboard/weeklyreportlist',
    'https://api.fenegosida.org/api/website/v1/Dashboard/WeeklyReportList',
    'https://api.fenegosida.org/api/website/v1/Dashboard/WeeklyChartRate',
    'https://api.fenegosida.org/api/website/v1/Dashboard/weeklyChartRate',
    'https://api.fenegosida.org/api/website/v1/Dashboard/WeeklyRates',
    'https://api.fenegosida.org/api/website/v1/Dashboard/allweeklyreports',
    'https://api.fenegosida.org/api/website/v1/Dashboard/weeklydata',
    'https://api.fenegosida.org/api/website/v1/Report/list',
    'https://api.fenegosida.org/api/website/v1/Report/weekly',
    'https://api.fenegosida.org/api/website/v1/WeeklyReport',
    'https://api.fenegosida.org/api/website/v1/History',
    'https://api.fenegosida.org/api/website/v1/history',
    'https://api.fenegosida.org/api/website/v1/Archive',
    'https://api.fenegosida.org/api/website/v1/archive',
    'https://api.fenegosida.org/api/website/v1/Dashboard/MonthlyReport',
    'https://api.fenegosida.org/api/website/v1/Dashboard/YearlyReport',
    'https://api.fenegosida.org/api/website/v1/Dashboard/yearwisehistory',
    'https://api.fenegosida.org/api/website/v1/Dashboard/datewisehistory',
]

found_pdf_urls = []
found_api_endpoints = []
found_doc_refs = []

print('=== METHOD B: SITE HTML/JS INVESTIGATION ===')
for url in pages_to_check:
    try:
        req = urllib.request.Request(url, headers={'User-Agent':'Mozilla/5.0'})
        html = urllib.request.urlopen(req, timeout=8).read().decode('utf-8','ignore')
        
        # Scan for PDF links
        pdfs = re.findall(r'(?:uploads/weekly|/weekly/)[a-zA-Z0-9._/-]+\.pdf', html)
        # Scan for document ID patterns
        docs = re.findall(r'[0-9]{12}[a-z0-9]{6,8}\.pdf', html)
        # Scan for 2081 references
        refs_2081 = re.findall(r'2081[/\-]\d{2}', html)
        
        if pdfs or docs or refs_2081:
            print('  ' + url + ':')
            if pdfs: print('    PDF links: ' + str(pdfs))
            if docs:  print('    Doc IDs:   ' + str(docs))
            if refs_2081: print('    2081 refs: ' + str(refs_2081[:5]))
            found_pdf_urls.extend(pdfs)
            found_doc_refs.extend(docs)
        else:
            print('  ' + url + ': no useful content found (likely React shell or 404)')
    except Exception as e:
        print('  ' + url + ': ' + str(e)[:60])

print()
print('=== METHOD C: EXTENDED API PROBE ===')
for url in api_endpoints:
    try:
        req = urllib.request.Request(url, headers={'User-Agent':'Mozilla/5.0','Accept':'application/json'})
        resp = urllib.request.urlopen(req, timeout=6)
        code = resp.getcode()
        body = resp.read(300).decode('utf-8','ignore')
        if code == 200:
            print('  [200 OK] ' + url)
            print('    Body: ' + body[:200])
            found_api_endpoints.append(url)
        else:
            print('  [' + str(code) + '] ' + url.split('v1/')[-1])
    except urllib.error.HTTPError as e:
        print('  [' + str(e.code) + '] ' + url.split('v1/')[-1])
    except Exception as ex:
        print('  [ERR] ' + url.split('v1/')[-1] + ': ' + str(ex)[:40])

print()
print('=== SUMMARY ===')
print('PDF URLs found: ' + str(len(found_pdf_urls)))
print('Doc ID patterns found: ' + str(len(found_doc_refs)))
print('New API endpoints: ' + str(len(found_api_endpoints)))
