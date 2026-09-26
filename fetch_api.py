import urllib.request
import re
try:
    js = urllib.request.urlopen('https://www.fenegosida.org/assets/index-DpXGtvH-.js').read().decode('utf-8')
    urls = re.findall(r'https?://[^\s\"\'\]*api[^\s\"\'\]*', js)
    print('Found API URLs in JS:', set(urls))
except Exception as e:
    print('Error:', e)
