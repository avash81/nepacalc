import urllib.request
import re

url = 'https://www.fenegosida.org/'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    pdfs = re.findall(r'href=[\'"]([^\'"]+\.pdf)[\'"]', html, re.IGNORECASE)
    print("Found PDFs:", pdfs)
except Exception as e:
    print("Error:", e)
