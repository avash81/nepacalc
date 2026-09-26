import urllib.request
import re

base = 'https://www.fenegosida.org/'
chunks = [
    'assets/History-5Shk2RLM.js',
    'assets/WeeklyReports-DuEUrEkS.js',
]

for chunk in chunks:
    print(f"\n=== {chunk} ===")
    req = urllib.request.Request(base + chunk, headers={'User-Agent': 'Mozilla/5.0'})
    js = urllib.request.urlopen(req, timeout=15).read().decode('utf-8', errors='ignore')
    print(f"Size: {len(js)} chars")

    # Find all API paths
    apis = re.findall(r'"/api/[^"]{3,120}"', js)
    apis2 = re.findall(r"'/api/[^']{3,120}'", js)
    all_apis = list(set(apis + apis2))
    print("API paths:")
    for a in sorted(all_apis):
        print(" ", a)

    # Also find any url construction patterns
    urls = re.findall(r'["`]https?://[^"`]{5,120}["`]', js)
    if urls:
        print("Full URLs:")
        for u in sorted(set(urls))[:20]:
            print(" ", u)

    # Find date/silver/history patterns
    interesting = re.findall(r'["\'][^"\']{5,80}["\']', js)
    kw = [x for x in interesting if any(k in x.lower() for k in ['histor', 'silver', 'chandi', 'rate', 'week', 'page', 'from', 'startdate', 'enddate', 'month', 'year'])]
    if kw:
        print("Interesting strings:")
        for h in sorted(set(kw))[:30]:
            print(" ", h)
