import urllib.request
import re

url = "https://www.fenegosida.org/history"
try:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    html = urllib.request.urlopen(req).read().decode('utf-8')
    links = set(re.findall(r'https?://(?:www\.)?fenegosida\.org/uploads/weekly/[a-zA-Z0-9_.-]+\.pdf', html))
    links2 = set(re.findall(r'/uploads/weekly/[a-zA-Z0-9_.-]+\.pdf', html))
    for link in links.union(links2):
        print(link)
    if not links and not links2:
        print("No PDF links found on the history page.")
except urllib.error.URLError as e:
    if hasattr(e, 'code') and e.code == 403:
        print("HTTP Error 403: Forbidden (Cloudflare block)")
    else:
        print(e)
except Exception as e:
    print(e)
