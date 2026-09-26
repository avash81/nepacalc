import json
import csv

json_path = 'public/data/historical-rates.json'
with open(json_path, 'r', encoding='utf-8') as f:
    db = json.load(f)

csv_path = 'public/data/historical-rates.csv'
csv_headers = ['date_bs', 'date_ad', 'day', 'metal', 'source_category', 'price_per_10g_source', 'price_per_tola_source', 'price_per_gram_calculated', 'price_per_kg_calculated', 'source_type', 'source_document_id', 'source_url', 'verification_status']

with open(csv_path, 'w', encoding='utf-8', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=csv_headers)
    writer.writeheader()
    for rec in db['data']:
        writer.writerow({
            'date_bs': rec.get('date_bs', ''),
            'date_ad': rec['date_ad'],
            'day': rec.get('day', ''),
            'metal': rec['metal'],
            'source_category': rec.get('source_category', 'Gold/Silver'),
            'price_per_10g_source': rec.get('source_rate_10g', ''),
            'price_per_tola_source': rec.get('source_rate_tola', ''),
            'price_per_gram_calculated': rec.get('calculated_rate_gram', ''),
            'price_per_kg_calculated': rec.get('calculated_rate_kg', ''),
            'source_type': rec.get('source_type', 'fenegosida_api'),
            'source_document_id': rec.get('source_document_id', ''),
            'source_url': rec.get('source_url', ''),
            'verification_status': rec.get('verification_status', 'verified')
        })

print("CSV Rebuilt. Total records: ", len(db['data']))
