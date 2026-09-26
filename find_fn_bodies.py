import urllib.request
import re

req = urllib.request.Request(
    'https://www.fenegosida.org/assets/index-DpXGtvH-.js',
    headers={'User-Agent': 'Mozilla/5.0'}
)
js = urllib.request.urlopen(req, timeout=15).read().decode('utf-8', errors='ignore')

# Find M2, U2, L2 function definitions (they are the API functions)
for fn_alias in ['M2=', 'U2=', 'L2=', 'j2=']:
    idx = js.find(fn_alias)
    while idx >= 0:
        snippet = js[idx:idx+400]
        if '/api/' in snippet or 'Dashboard' in snippet or 'history' in snippet.lower():
            print(f"\n=== {fn_alias} at {idx} ===")
            print(snippet)
            break
        idx = js.find(fn_alias, idx+1)
