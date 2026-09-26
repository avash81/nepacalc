import json
import csv
from datetime import datetime

# Load existing JSON
with open('public/data/historical-rates.json', encoding='utf-8-sig') as f:
    hist_json = json.load(f)

existing_data = hist_json['data']

# Load Gahana JSON
with open('C:/Users/hp/.gemini/antigravity/brain/a9e690cf-cc5b-4b10-aba5-a2bc47078db3/scratch/gahana_dataset.json', encoding='utf-8') as f:
    gahana_data = json.load(f)

# Convert Gahana data to the historical-rates format
# Sample Gahana: { 'Date_AD': '09/25/2026', 'Date_BS': '06/09/2083', 'Price_Clean': '298600' }
new_records = []
for g in gahana_data:
    try:
        # Date AD is MM/DD/YYYY, convert to YYYY-MM-DD
        dt_obj = datetime.strptime(g['Date_AD'], '%m/%d/%Y')
        date_ad = dt_obj.strftime('%Y-%m-%d')
        day_str = dt_obj.strftime('%A')
        
        # Date BS is MM/DD/YYYY in Gahana (e.g. 06/09/2083) -> convert to YYYY/MM/DD
        parts = g['Date_BS'].split('/')
        if len(parts) == 3:
            # Gahana format is MM/DD/YYYY. FENEGOSIDA uses YYYY/MM/DD.
            # Example: 06/09/2083 -> 2083/06/09
            m, d, y = parts
            date_bs = f"{y}/{m}/{d}"
        else:
            date_bs = g['Date_BS']
            
        rate_tola = float(g['Price_Clean'])
        # 1 Tola = 11.6638 grams exactly for FENEGOSIDA, or just use 11.66
        # Let's derive the 10g rate: rate_10g = (rate_tola / 11.66) * 10 
        # Actually FENEGOSIDA has slight rounding. We'll use 11.6638
        rate_10g = round((rate_tola / 11.6638038) * 10, 2)
        rate_gram = round(rate_10g / 10, 2)
        rate_kg = round(rate_10g * 100, 2)
        
        record = {
            "date_ad": date_ad,
            "date_bs": date_bs,
            "day": day_str,
            "source_document_id": "GAHANA-ARCHIVE",
            "source_url": "https://gahanaonline.com/gold-rate-history/",
            "source_type": "archive_web_scrape",
            "verification_status": "unverified",
            "metal": "gold",
            "source_category": "Fine Gold (9999)",
            "source_rate_10g": rate_10g,
            "source_rate_tola": rate_tola,
            "calculated_rate_gram": rate_gram,
            "calculated_rate_kg": rate_kg
        }
        new_records.append(record)
    except Exception as e:
        print(f"Skipping record {g} due to error: {e}")

# Merge and deduplicate by date_ad + metal
# FENEGOSIDA takes precedence over Gahana
all_records_dict = {}

# Add Gahana first (so FENEGOSIDA overwrites if same date)
for r in new_records:
    key = r['date_ad'] + '_' + r['metal']
    all_records_dict[key] = r

for r in existing_data:
    key = r['date_ad'] + '_' + r['metal']
    all_records_dict[key] = r

merged_data = list(all_records_dict.values())
# Sort descending by date_ad
merged_data.sort(key=lambda x: x['date_ad'], reverse=True)

hist_json['data'] = merged_data
hist_json['meta']['total_records'] = len(merged_data)
hist_json['meta']['last_updated'] = datetime.now().strftime('%Y-%m-%dT%H:%M:%SZ')
hist_json['meta']['sources'].append("Gahana Online Archive")

# Write JSON
with open('public/data/historical-rates.json', 'w', encoding='utf-8') as f:
    json.dump(hist_json, f, indent=2)
    
# Write CSV
if len(merged_data) > 0:
    keys = merged_data[0].keys()
    with open('public/data/historical-rates.csv', 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=keys)
        writer.writeheader()
        writer.writerows(merged_data)

print(f"Merged {len(new_records)} Gahana records. Total is now {len(merged_data)}.")
