import json

with open('public/data/historical-rates.json', 'r', encoding='utf-8') as f:
    db = json.load(f)
existing_keys = set(r['date_ad'] + '_' + r['metal'] for r in db['data'])

with open('phase11b_api_candidates.json', 'r', encoding='utf-8') as f:
    cand = json.load(f)

candidates = cand['candidates']
new = [c for c in candidates if c['date_ad'] + '_' + c['metal'] not in existing_keys]
dupes = [c for c in candidates if c['date_ad'] + '_' + c['metal'] in existing_keys]

anomaly_929855 = [c for c in candidates if c['source_rate_10g'] > 900000]
math_fail = [c for c in candidates if c['verification_status'] == 'math_fail']
needs_review = [c for c in candidates if c['verification_status'] == 'needs_review']

gold_new = [c for c in new if c['metal'] == 'gold']
silver_new = [c for c in new if c['metal'] == 'silver']
dates_new = sorted(set(c['date_ad'] for c in new))

print('=== PHASE 11B VALIDATION SUMMARY ===')
print('Total candidates: ' + str(len(candidates)))
print('Duplicates (already in production): ' + str(len(dupes)))
print('Genuinely new: ' + str(len(new)))
print('  New Gold rows: ' + str(len(gold_new)))
print('  New Silver rows: ' + str(len(silver_new)))
print('  New unique dates: ' + str(len(dates_new)))
print('Math FAIL: ' + str(len(math_fail)))
print('Needs Review: ' + str(len(needs_review)))
print('Known anomaly (929855): ' + str(len(anomaly_929855)))
print()
print('Source type: fenegosida_api (Tier 1 Official)')
print('API endpoint: monthwisehistory (public, authenticated by date parameter)')
print()
print('Candidate date range: ' + dates_new[0] + ' to ' + dates_new[-1])
print()
print('Projected production after merge:')
print('  Current: ' + str(len(db['data'])))
print('  + New:   ' + str(len(new)))
print('  = Total: ' + str(len(db['data']) + len(new)))
print('  Gold:    ' + str(65 + len(gold_new)))
print('  Silver:  ' + str(65 + len(silver_new)))
print('  Dates:   ' + str(65 + len(dates_new)))
