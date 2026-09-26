import urllib.request
import re
import json
import concurrent.futures
import time

all_data = []

def fetch_page(page):
    url = f"https://notifynepal.com/en/silver-price-history-nepal?page={page}"
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'})
        html = urllib.request.urlopen(req).read().decode('utf-8')
        
        matches = re.findall(r'\\"date_ad\\":\\"(\d{4}-\d{2}-\d{2})\\",\\"date_bs\\":\\"(\d{4}-\d{2}-\d{2})\\".*?\\"silver_per_tola\\":(\d+)', html)
        
        records = []
        for m in matches:
            date_ad, date_bs, silver_tola = m
            records.append({
                "date_ad": date_ad,
                "date_bs": date_bs,
                "tola": int(silver_tola)
            })
        print(f"Page {page} done, got {len(records)} records")
        return records
    except Exception as e:
        print(f"Page {page} error: {e}")
        return []

print("Starting threaded fetch...")
with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
    results = executor.map(fetch_page, range(1, 215))

for r in results:
    all_data.extend(r)

unique_data = {f"{r['date_ad']}": r for r in all_data}.values()
with open("silver_notifynepal_raw.json", "w") as f:
    json.dump(list(unique_data), f, indent=2)
    
print("Done! Total unique records:", len(unique_data))
