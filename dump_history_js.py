import urllib.request
import re

# Full history chunk to find API calls
req = urllib.request.Request(
    'https://www.fenegosida.org/assets/History-5Shk2RLM.js',
    headers={'User-Agent': 'Mozilla/5.0'}
)
js = urllib.request.urlopen(req, timeout=15).read().decode('utf-8', errors='ignore')

# Print the whole file - it's only 12KB
print(js)
