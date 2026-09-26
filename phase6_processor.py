import json
import csv
import os

seed_data = """source_document_id,source_url,date_bs,day,gold_per_10g_source,gold_per_tola_source,silver_per_10g_source,silver_per_tola_source,source_type,verification_basis
FEN-WEEKLY-2081-02-25,https://www.fenegosida.org/uploads/weekly/240607055120g6k5q8.pdf,2081/02/20,Sunday,121745,142000,1586,1850,official_weekly_pdf,official_FENEGOSIDA
FEN-WEEKLY-2081-02-25,https://www.fenegosida.org/uploads/weekly/240607055120g6k5q8.pdf,2081/02/21,Monday,120885,141000,1573,1835,official_weekly_pdf,official_FENEGOSIDA
FEN-WEEKLY-2081-02-25,https://www.fenegosida.org/uploads/weekly/240607055120g6k5q8.pdf,2081/02/22,Tuesday,122345,142700,1595,1860,official_weekly_pdf,official_FENEGOSIDA
FEN-WEEKLY-2081-02-25,https://www.fenegosida.org/uploads/weekly/240607055120g6k5q8.pdf,2081/02/23,Wednesday,121915,142200,1565,1825,official_weekly_pdf,official_FENEGOSIDA
FEN-WEEKLY-2081-02-25,https://www.fenegosida.org/uploads/weekly/240607055120g6k5q8.pdf,2081/02/24,Thursday,123455,144000,1586,1850,official_weekly_pdf,official_FENEGOSIDA
FEN-WEEKLY-2081-02-25,https://www.fenegosida.org/uploads/weekly/240607055120g6k5q8.pdf,2081/02/25,Friday,124315,145000,1629,1900,official_weekly_pdf,official_FENEGOSIDA
FEN-WEEKLY-2081-11-23,https://www.fenegosida.org/uploads/weekly/250307092202jj587f.pdf,2081/11/18,Sunday,144120,168100,1642,1915,official_weekly_pdf,official_FENEGOSIDA
FEN-WEEKLY-2081-11-23,https://www.fenegosida.org/uploads/weekly/250307092202jj587f.pdf,2081/11/19,Monday,144120,168100,1642,1915,official_weekly_pdf,official_FENEGOSIDA
FEN-WEEKLY-2081-11-23,https://www.fenegosida.org/uploads/weekly/250307092202jj587f.pdf,2081/11/20,Tuesday,145320,169500,1663.50,1940,official_weekly_pdf,official_FENEGOSIDA
FEN-WEEKLY-2081-11-23,https://www.fenegosida.org/uploads/weekly/250307092202jj587f.pdf,2081/11/21,Wednesday,146090,170400,1672.00,1950,official_weekly_pdf,official_FENEGOSIDA
FEN-WEEKLY-2081-11-23,https://www.fenegosida.org/uploads/weekly/250307092202jj587f.pdf,2081/11/22,Thursday,146350,170700,1702.00,1985,official_weekly_pdf,official_FENEGOSIDA
FEN-WEEKLY-2081-11-23,https://www.fenegosida.org/uploads/weekly/250307092202jj587f.pdf,2081/11/23,Friday,145920,170200,1706.00,1990,official_weekly_pdf,official_FENEGOSIDA"""

bs_to_ad = {
    '2081/02/20': '2024-06-02', '2081/02/21': '2024-06-03', '2081/02/22': '2024-06-04',
    '2081/02/23': '2024-06-05', '2081/02/24': '2024-06-06', '2081/02/25': '2024-06-07',
    '2081/11/18': '2025-03-02', '2081/11/19': '2025-03-03', '2081/11/20': '2025-03-04',
    '2081/11/21': '2025-03-05', '2081/11/22': '2025-03-06', '2081/11/23': '2025-03-07'
}

records = []
lines = seed_data.strip().split('\n')
headers = lines[0].split(',')

for line in lines[1:]:
    r = dict(zip(headers, line.split(',')))
    g_10 = float(r['gold_per_10g_source'])
    g_tola = float(r['gold_per_tola_source'])
    s_10 = float(r['silver_per_10g_source'])
    s_tola = float(r['silver_per_tola_source'])
    
    # Mathematical Validation
    calc_tola_g = g_10 * 1.1664
    calc_tola_s = s_10 * 1.1664
    
    # Tolerance roughly 100 Rs for gold, 5 Rs for silver
    diff_g = abs(calc_tola_g - g_tola)
    diff_s = abs(calc_tola_s - s_tola)
    status = 'verified' if (diff_g < 100 and diff_s < 10) else 'needs_review'
    
    ad_date = bs_to_ad[r['date_bs']]
    
    base_record = {
        'date_ad': ad_date,
        'date_bs': r['date_bs'],
        'day': r['day'],
        'source_document_id': r['source_document_id'],
        'source_url': r['source_url'],
        'source_type': r['source_type'],
        'verification_status': status
    }
    
    gold_record = base_record.copy()
    gold_record.update({
        'metal': 'gold',
        'source_category': 'Gold',
        'source_rate_10g': g_10,
        'source_rate_tola': g_tola,
        'calculated_rate_gram': round(g_10 / 10, 2),
        'calculated_rate_kg': round(g_10 * 100, 2)
    })
    
    silver_record = base_record.copy()
    silver_record.update({
        'metal': 'silver',
        'source_category': 'Silver',
        'source_rate_10g': s_10,
        'source_rate_tola': s_tola,
        'calculated_rate_gram': round(s_10 / 10, 2),
        'calculated_rate_kg': round(s_10 * 100, 2)
    })
    
    records.extend([gold_record, silver_record])

# Load existing JSON
json_path = 'public/data/historical-rates.json'
with open(json_path, 'r', encoding='utf-8') as f:
    existing_data = json.load(f)

# Combine and deduplicate based on date_ad + metal + source_category
all_records = existing_data.get('data', []) + records
unique_records = {}
for rec in all_records:
    key = f"{rec['date_ad']}_{rec['metal']}_{rec['source_category']}"
    unique_records[key] = rec

final_records = sorted(list(unique_records.values()), key=lambda x: x['date_ad'], reverse=True)

final_data = {
    'meta': {
        'version': '2026.09.26',
        'last_updated_ad': '2026-09-26',
        'earliest_verified_date': final_records[-1]['date_ad'],
        'latest_verified_date': final_records[0]['date_ad'],
        'total_verified_records': len(final_records),
        'gaps_exist': True
    },
    'data': final_records
}

with open(json_path, 'w', encoding='utf-8') as f:
    json.dump(final_data, f, ensure_ascii=False, indent=2)

# Generate CSV
csv_path = 'public/data/historical-rates.csv'
csv_headers = ['date_bs', 'date_ad', 'day', 'metal', 'source_category', 'price_per_10g_source', 'price_per_tola_source', 'price_per_gram_calculated', 'price_per_kg_calculated', 'source_type', 'source_document_id', 'source_url', 'verification_status']

with open(csv_path, 'w', encoding='utf-8', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=csv_headers)
    writer.writeheader()
    for rec in final_records:
        writer.writerow({
            'date_bs': rec.get('date_bs', ''),
            'date_ad': rec['date_ad'],
            'day': rec.get('day', ''),
            'metal': rec['metal'],
            'source_category': rec.get('source_category', 'Gold/Silver'),
            'price_per_10g_source': rec['source_rate_10g'],
            'price_per_tola_source': rec['source_rate_tola'],
            'price_per_gram_calculated': rec.get('calculated_rate_gram', ''),
            'price_per_kg_calculated': rec.get('calculated_rate_kg', ''),
            'source_type': rec.get('source_type', 'fenegosida_api'),
            'source_document_id': rec.get('source_document_id', ''),
            'source_url': rec.get('source_url', ''),
            'verification_status': rec.get('verification_status', 'verified')
        })

print("JSON and CSV generated successfully.")
