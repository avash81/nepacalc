import json, shutil

# Immediate rollback
shutil.copy('public/data/historical-rates-pre-phase11b.json', 'public/data/historical-rates.json')
shutil.copy('public/data/historical-rates-pre-phase11b.csv',  'public/data/historical-rates.csv')
print('ROLLBACK COMPLETE')

with open('public/data/historical-rates-pre-phase11b.json', 'r', encoding='utf-8') as f:
    db = json.load(f)

rows = db['data']
print('Baseline rows: ' + str(len(rows)))

# Find every row where ANY numeric field exceeds 900000
print()
print('=== ALL FIELDS WITH VALUE > 900000 ===')
for r in rows:
    for field, val in r.items():
        if isinstance(val, (int, float)) and val > 900000:
            msg = 'date=' + r.get('date_ad','?') + ' metal=' + r.get('metal','?')
            msg += ' src_type=' + r.get('source_type','?')
            msg += ' field=' + field + ' value=' + str(val)
            print(msg)

# Show schema differences between record types
print()
print('=== SCHEMA SAMPLE: API SEED ===')
api_r = next((r for r in rows if r.get('source_type') == 'fenegosida_api'), None)
if api_r:
    for k, v in api_r.items():
        print('  ' + k + ': ' + str(v))

print()
print('=== SCHEMA SAMPLE: 2082 MOCK PDF ===')
mock_r = next((r for r in rows if '2508' in r.get('source_document_id','') or '2601' in r.get('source_document_id','')), None)
if mock_r:
    for k, v in mock_r.items():
        print('  ' + k + ': ' + str(v))

print()
print('=== SCHEMA SAMPLE: ORIGINAL PDF SEED ===')
pdf_r = next((r for r in rows if 'FEN-WEEKLY' in r.get('source_document_id','')), None)
if pdf_r:
    for k, v in pdf_r.items():
        print('  ' + k + ': ' + str(v))
