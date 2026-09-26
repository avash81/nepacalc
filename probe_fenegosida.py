import urllib.request
import re

# Download the fenegosida JS bundle to find all API call patterns
req = urllib.request.Request(
    'https://www.fenegosida.org/assets/index-DpXGtvH-.js',
    headers={'User-Agent': 'Mozilla/5.0'}
)
js = urllib.request.urlopen(req, timeout=15).read().decode('utf-8', errors='ignore')
print(f"Bundle size: {len(js)} chars")

# Find all API paths
apis = re.findall(r'"/api/[^"]{3,80}"', js)
apis2 = re.findall(r"'/api/[^']{3,80}'", js)
all_apis = list(set(apis + apis2))
print("API paths found:")
for a in sorted(all_apis):
    print(" ", a)

# Also look for history/silver/date patterns
hist = [x for x in re.findall(r'"[^"]{5,100}"', js) if any(k in x.lower() for k in ['histor', 'silver', 'chandi', 'rate', 'date', 'week', 'month'])]
print("\nInteresting strings:")
for h in sorted(set(hist))[:30]:
    print(" ", h)
