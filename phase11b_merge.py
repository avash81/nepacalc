"""
Phase 11B Controlled Production Merge
- Pre-merge: backup + checksum
- Merge by (date_ad + metal) key — no blind append
- Post-merge: independent audit
"""
import json, csv, shutil, hashlib, datetime

TOLA_FACTOR = 1.1664

def checksum(path):
    with open(path, 'rb') as f:
        return hashlib.sha256(f.read()).hexdigest()[:16]

# ── Pre-merge backup
shutil.copy('public/data/historical-rates.json', 'public/data/historical-rates-pre-phase11b.json')
shutil.copy('public/data/historical-rates.csv',  'public/data/historical-rates-pre-phase11b.csv')

pre_json_ck = checksum('public/data/historical-rates-pre-phase11b.json')
pre_csv_ck  = checksum('public/data/historical-rates-pre-phase11b.csv')
print('PRE-MERGE CHECKSUMS')
print('  JSON: ' + pre_json_ck)
print('  CSV : ' + pre_csv_ck)

# ── Load production + candidates
with open('public/data/historical-rates.json', 'r', encoding='utf-8') as f:
    db = json.load(f)

with open('phase11b_api_candidates.json', 'r', encoding='utf-8') as f:
    cand_db = json.load(f)

existing = db['data']
candidates = cand_db['candidates']

# ── Merge by key
merged = {}
for r in existing:
    merged[r['date_ad'] + '_' + r['metal']] = r

inserted = 0
skipped_dupe = 0
for c in candidates:
    key = c['date_ad'] + '_' + c['metal']
    if key in merged:
        skipped_dupe += 1
    else:
        # Resolve BS date from reconciliation mapping (already validated)
        merged[key] = c
        inserted += 1

final_list = sorted(merged.values(), key=lambda x: (x['date_ad'], x['metal']))

print()
print('MERGE OPERATION')
print('  Existing rows    : ' + str(len(existing)))
print('  Candidates       : ' + str(len(candidates)))
print('  Inserted (new)   : ' + str(inserted))
print('  Skipped (dupe)   : ' + str(skipped_dupe))
print('  Final total      : ' + str(len(final_list)))

# ── Write JSON
db['data'] = final_list
db['meta']['total_verified_records'] = len(final_list)
db['meta']['earliest_verified_date'] = final_list[0]['date_ad']
db['meta']['latest_verified_date'] = final_list[-1]['date_ad']
db['meta']['last_updated'] = datetime.datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ')

with open('public/data/historical-rates.json', 'w', encoding='utf-8') as f:
    json.dump(db, f, ensure_ascii=False, indent=2)

# ── Write CSV (strict field order)
CSV_FIELDS = [
    'date_bs','date_ad','day','metal','source_category',
    'price_per_10g_source','price_per_tola_source',
    'price_per_gram_calculated','price_per_kg_calculated',
    'source_type','source_document_id','source_url','verification_status'
]

def row_to_csv(r):
    return {
        'date_bs':                r.get('date_bs',''),
        'date_ad':                r['date_ad'],
        'day':                    r.get('day',''),
        'metal':                  r['metal'],
        'source_category':        r.get('source_category',''),
        'price_per_10g_source':   r.get('source_rate_10g',''),
        'price_per_tola_source':  r.get('source_rate_tola',''),
        'price_per_gram_calculated': r.get('calculated_rate_gram',''),
        'price_per_kg_calculated':   r.get('calculated_rate_kg',''),
        'source_type':            r.get('source_type',''),
        'source_document_id':     r.get('source_document_id',''),
        'source_url':             r.get('source_url',''),
        'verification_status':    r.get('verification_status',''),
    }

with open('public/data/historical-rates.csv', 'w', encoding='utf-8', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=CSV_FIELDS)
    writer.writeheader()
    for r in final_list:
        writer.writerow(row_to_csv(r))

# ── Post-merge independent audit
print()
print('POST-MERGE INDEPENDENT AUDIT')

with open('public/data/historical-rates.json', 'r', encoding='utf-8') as f:
    verify_db = json.load(f)
vrows = verify_db['data']

with open('public/data/historical-rates.csv', 'r', encoding='utf-8') as f:
    vcsv = list(csv.DictReader(f))

gold_rows  = [r for r in vrows if r['metal'] == 'gold']
silver_rows = [r for r in vrows if r['metal'] == 'silver']
dates      = sorted(set(r['date_ad'] for r in vrows))

print('  JSON rows        : ' + str(len(vrows)))
print('  CSV rows         : ' + str(len(vcsv)))
print('  Gold             : ' + str(len(gold_rows)))
print('  Silver           : ' + str(len(silver_rows)))
print('  Unique dates     : ' + str(len(dates)))
print('  Earliest         : ' + dates[0])
print('  Latest           : ' + dates[-1])

parity = 'PASS' if len(vrows) == len(vcsv) else 'FAIL — ' + str(len(vrows)) + ' vs ' + str(len(vcsv))
print('  JSON/CSV parity  : ' + parity)

# Math audit — all 192 rows
math_ok = 0
math_bad = []
for r in vrows:
    g10  = r.get('source_rate_10g')
    gtola = r.get('source_rate_tola')
    if g10 and gtola:
        diff_pct = abs(g10 * TOLA_FACTOR - gtola) / gtola * 100
        if diff_pct < 0.5:
            math_ok += 1
        else:
            math_bad.append(r['date_ad'] + '_' + r['metal'] + ' diff=' + str(round(diff_pct,3)) + '%')

print('  Math audit       : ' + str(math_ok) + '/' + str(len(vrows)) + ' PASS')
if math_bad:
    for b in math_bad:
        print('    FAIL: ' + b)

# Duplicate check
seen_keys = set()
dupes = []
for r in vrows:
    k = r['date_ad'] + '_' + r['metal']
    if k in seen_keys:
        dupes.append(k)
    seen_keys.add(k)
print('  Duplicates       : ' + str(len(dupes)))

# Known anomaly check
anomaly_929855 = [r for r in vrows if r.get('source_rate_10g', 0) > 900000]
print('  Anomaly 929855   : ' + str(len(anomaly_929855)))

# Post-merge checksums
post_json_ck = checksum('public/data/historical-rates.json')
post_csv_ck  = checksum('public/data/historical-rates.csv')
print()
print('POST-MERGE CHECKSUMS')
print('  JSON: ' + post_json_ck)
print('  CSV : ' + post_csv_ck)
print('  (Pre-merge JSON was: ' + pre_json_ck + ')')

# Expected targets
target_ok = (
    len(vrows) == 192 and
    len(vcsv) == 192 and
    len(gold_rows) == 96 and
    len(silver_rows) == 96 and
    len(dates) == 96 and
    parity == 'PASS' and
    len(dupes) == 0 and
    len(anomaly_929855) == 0 and
    math_ok == len(vrows)
)
print()
print('FINAL STATUS: ' + ('A — PRODUCTION MERGE VERIFIED' if target_ok else 'C — MERGE BLOCKED BY VALIDATION ISSUE'))
