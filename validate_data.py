import json
with open('public/data/historical-rates.json', 'r', encoding='utf-8') as f:
    data = json.load(f)
records = data['data']
gold = [r for r in records if r['metal'] == 'gold']
silver = [r for r in records if r['metal'] == 'silver']
prim = [r for r in silver if r.get('source_priority') == 'primary']
sec = [r for r in silver if r.get('source_priority') == 'secondary']
silver_dates = sorted([r['date_ad'] for r in silver])
gold_dates = sorted([r['date_ad'] for r in gold])
print('=== Data Validation ===')
print('Total records: ' + str(len(records)))
print('Gold: ' + str(len(gold)) + ' | oldest: ' + gold_dates[0] + ' | newest: ' + gold_dates[-1])
print('Silver total: ' + str(len(silver)) + ' | oldest: ' + silver_dates[0] + ' | newest: ' + silver_dates[-1])
print('Silver primary (FENEGOSIDA): ' + str(len(prim)))
print('Silver secondary (NotifyNepal): ' + str(len(sec)))
sp = next((r for r in prim), None)
if sp:
    print('Sample primary: ' + sp['date_ad'] + ' tola=' + str(sp['source_rate_tola']))
