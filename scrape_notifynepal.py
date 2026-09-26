import urllib.request
import re
import json
import time

all_data = []

for page in range(1, 215):
    url = f"https://notifynepal.com/en/silver-price-history-nepal?page={page}"
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
        html = urllib.request.urlopen(req).read().decode('utf-8')
        
        # matches will find date_ad, date_bs, silver_tola
        matches = re.findall(r'\\"date_ad\\":\\"(\d{4}-\d{2}-\d{2})\\",\\"date_bs\\":\\"(\d{4}-\d{2}-\d{2})\\".*?\\"silver_per_tola\\":(\d+)', html)
        
        if not matches:
            break
            
        for m in matches:
            date_ad, date_bs, silver_tola = m
            all_data.append({
                "date_ad": date_ad,
                "date_bs": date_bs,
                "tola": int(silver_tola)
            })
            
        print(f"Page {page} extracted {len(matches)} records. Total: {len(all_data)}")
        time.sleep(0.5)
        
    except Exception as e:
        print(f"Error on page {page}: {e}")
        break

unique_data = {f"{r['date_ad']}": r for r in all_data}.values()

with open("silver_notifynepal_raw.json", "w") as f:
    json.dump(list(unique_data), f, indent=2)
    
print("Done! Total unique records:", len(unique_data))
