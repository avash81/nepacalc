import urllib.request
import re

url = "https://api.fenegosida.org/api/website/v1/Dashboard/WeeklyChartRate"
try:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    data = urllib.request.urlopen(req).read().decode('utf-8')
    print("WeeklyChartRate endpoint response length:", len(data))
    print(data[:500])
except Exception as e:
    print(e)
