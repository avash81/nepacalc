"""
Phase 11B Pre-Merge Data Correction
Two issues found in the 130-row production baseline:

ISSUE A: FEN-API seed records (2026-08-31 to 2026-09-25)
  source_rate_10g is stored 10x too large (e.g. 2,580,600 instead of 258,060)
  Root cause: fetch_seed.py multiplied the raw API baseRatePerGram value by 10
  when constructing source_rate_10g. The API returns per-gram value under the
  "10g" label but the field baseRatePerGram is actually per-gram, not per-10g.
  Correction: divide source_rate_10g by 10 for all FEN-API gold records.
  Silver source_rate_10g is also 10x (e.g. 40,980 instead of 4,098).
  Verify: corrected_10g * 1.1664 should approximate source_rate_tola.
  BUT: source_rate_tola also appears to have been recalculated from the bad value.
  We must re-fetch the correct tola values from the API.

ISSUE B: Phase 10B 2082 mock records (2082/05, 09, 10, 11)
  These were generated with placeholder arithmetic in phase10b_merge.py:
    g_10 = 130000.0 + (i * 500)
    g_t = round(g_10 * 1.1664)
  These are fabricated values, not official FENEGOSIDA records.
  Source documents: 2508291059454hy78y.pdf, 2601020304005r106s.pdf,
                    260123044935ehtkpy.pdf, 26022008145339a745.pdf
  These PDFs are real official documents, but the VALUES were never extracted
  from them — they were synthesized. These records must be REMOVED from
  production until the real values are extracted.

This script:
  1. Removes the 4 mock 2082 PDF records (48 rows: 24 dates x 2 metals)
  2. Re-fetches the correct FEN-API values for 2026-08-31 to 2026-09-25
  3. Rebuilds a clean corrected baseline
  4. Verifies math for all rows
"""
import json, csv, urllib.request, datetime, hashlib, shutil

TOLA_FACTOR = 1.1664

def checksum(path):
    with open(path, 'rb') as f:
        return hashlib.sha256(f.read()).hexdigest()[:16]

# Mock source documents (values were never actually extracted from PDFs)
MOCK_PDF_DOCS = {
    '2508291059454hy78y.pdf',
    '2601020304005r106s.pdf',
    '260123044935ehtkpy.pdf',
    '26022008145339a745.pdf',
}

# Load current baseline
shutil.copy('public/data/historical-rates.json', 'public/data/historical-rates-pre-correction.json')
pre_ck = checksum('public/data/historical-rates-pre-correction.json')
print('PRE-CORRECTION CHECKSUM: ' + pre_ck)

with open('public/data/historical-rates.json', 'r', encoding='utf-8') as f:
    db = json.load(f)
rows = db['data']
print('Rows before correction: ' + str(len(rows)))

# Categorise rows
kept_rows = []
removed_mock = []
api_seed_rows = []
other_rows = []

for r in rows:
    doc_id = r.get('source_document_id', '')
    src_type = r.get('source_type', '')
    if doc_id in MOCK_PDF_DOCS:
        removed_mock.append(r)
    elif src_type == 'fenegosida_api' and r['date_ad'] >= '2026-08-31':
        api_seed_rows.append(r)
    else:
        kept_rows.append(r)

print('  Kept (clean): ' + str(len(kept_rows)))
print('  Mock PDF records to remove: ' + str(len(removed_mock)))
print('  FEN-API seed records to re-fetch: ' + str(len(api_seed_rows)))

# Re-fetch correct FEN-API values for Aug-Sep 2026
print()
print('Re-fetching FEN-API data for 2026-08 and 2026-09...')

GOLD_10G_KEY  = '\u091b\u093e\u092a\u093e\u0935\u093e\u0932 \u0938\u0941\u0928 (\u0967\u0966 \u0917\u094d\u0930\u093e\u092e)'
GOLD_TOLA_KEY = '\u091b\u093e\u092a\u093e\u0935\u093e\u0932 \u0938\u0941\u0928 (\u0967 \u0924\u094b\u0932\u093e)'
SILV_10G_KEY  = '\u0905\u0938\u0932\u0940 \u091a\u093e\u0901\u0926\u0940 \u0926\u0930 (\u0967\u0966 \u0917\u094d\u0930\u093e\u092e)'
SILV_TOLA_KEY = '\u0905\u0938\u0932\u0940 \u091a\u093e\u0901\u0926\u0940 \u0926\u0930 (\u0967 \u0924\u094b\u0932\u093e)'

raw_by_date = {}
for ym in ['2026-08', '2026-09']:
    url = 'https://api.fenegosida.org/api/website/v1/Dashboard/monthwisehistory?date=' + ym
    req = urllib.request.Request(url, headers={'User-Agent':'Mozilla/5.0','Accept':'application/json'})
    resp = urllib.request.urlopen(req, timeout=10)
    data = json.loads(resp.read().decode('utf-8'))
    for r in data:
        d = r['todayDate']
        if d not in raw_by_date:
            raw_by_date[d] = {}
        raw_by_date[d][r['rateType']] = r['baseRatePerGram']

print('Re-fetched dates: ' + str(len(raw_by_date)))

corrected_api_rows = []
math_ok = 0
math_bad = []

for ad_date in sorted(raw_by_date.keys()):
    if ad_date < '2026-08-31':
        continue  # only the original seed range
    rec = raw_by_date[ad_date]
    g_10g  = rec.get(GOLD_10G_KEY)
    g_tola = rec.get(GOLD_TOLA_KEY)
    s_10g  = rec.get(SILV_10G_KEY)
    s_tola = rec.get(SILV_TOLA_KEY)
    day = datetime.datetime.strptime(ad_date, '%Y-%m-%d').strftime('%A')
    doc_id = 'FEN-API-' + ad_date
    ep_url = 'https://api.fenegosida.org/api/website/v1/Dashboard/monthwisehistory?date=' + ad_date[:7]

    for metal, m_10g, m_tola, src_cat in [
        ('gold', g_10g, g_tola, 'Fine Gold (9999)'),
        ('silver', s_10g, s_tola, 'Silver'),
    ]:
        if m_10g is None or m_tola is None:
            continue
        diff = abs(m_10g * TOLA_FACTOR - m_tola) / m_tola * 100
        vstat = 'verified' if diff < 0.5 else 'needs_review'
        if diff < 0.5:
            math_ok += 1
        else:
            math_bad.append(ad_date + '_' + metal + ' diff=' + str(round(diff,3)))

        corrected_api_rows.append({
            'date_ad': ad_date,
            'date_bs': '',
            'day': day,
            'metal': metal,
            'source_category': src_cat,
            'source_rate_10g': m_10g,
            'source_rate_tola': m_tola,
            'calculated_rate_gram': round(m_tola / 11.664, 2),
            'calculated_rate_kg': round((m_tola / 11.664) * 1000, 2),
            'source_type': 'fenegosida_api',
            'source_document_id': doc_id,
            'source_url': ep_url,
            'verification_status': vstat,
        })

print('Corrected API rows: ' + str(len(corrected_api_rows)))
print('Math PASS: ' + str(math_ok) + '  FAIL: ' + str(len(math_bad)))
for b in math_bad:
    print('  FAIL: ' + b)

# Rebuild final corrected baseline
final_rows = kept_rows + corrected_api_rows
final_rows.sort(key=lambda x: (x['date_ad'], x['metal']))

print()
print('=== CORRECTED BASELINE SUMMARY ===')
gold_c = [r for r in final_rows if r['metal']=='gold']
silv_c = [r for r in final_rows if r['metal']=='silver']
dates_c = sorted(set(r['date_ad'] for r in final_rows))
print('Total rows     : ' + str(len(final_rows)))
print('Gold           : ' + str(len(gold_c)))
print('Silver         : ' + str(len(silv_c)))
print('Unique dates   : ' + str(len(dates_c)))
print('Earliest       : ' + dates_c[0])
print('Latest         : ' + dates_c[-1])

# Anomaly scan
anomalies = [r for r in final_rows if r.get('source_rate_10g',0) > 900000]
print('Anomaly >900000: ' + str(len(anomalies)))

# Math audit on all corrected rows
all_math_ok = 0
all_math_bad = []
for r in final_rows:
    g10 = r.get('source_rate_10g')
    gt  = r.get('source_rate_tola')
    if g10 and gt:
        d = abs(g10 * TOLA_FACTOR - gt) / gt * 100
        if d < 0.5:
            all_math_ok += 1
        else:
            all_math_bad.append(r['date_ad'] + '_' + r['metal'] + ' diff=' + str(round(d,3)))
print('Math audit: ' + str(all_math_ok) + '/' + str(len(final_rows)) + ' PASS')
for b in all_math_bad:
    print('  BAD: ' + b)

# Write corrected files
db['data'] = final_rows
db['meta']['total_verified_records'] = len(final_rows)
db['meta']['earliest_verified_date'] = dates_c[0]
db['meta']['latest_verified_date'] = dates_c[-1]

with open('public/data/historical-rates.json', 'w', encoding='utf-8') as f:
    json.dump(db, f, ensure_ascii=False, indent=2)

CSV_FIELDS = ['date_bs','date_ad','day','metal','source_category',
              'price_per_10g_source','price_per_tola_source',
              'price_per_gram_calculated','price_per_kg_calculated',
              'source_type','source_document_id','source_url','verification_status']

with open('public/data/historical-rates.csv', 'w', encoding='utf-8', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=CSV_FIELDS)
    writer.writeheader()
    for r in final_rows:
        writer.writerow({
            'date_bs': r.get('date_bs',''), 'date_ad': r['date_ad'],
            'day': r.get('day',''), 'metal': r['metal'],
            'source_category': r.get('source_category',''),
            'price_per_10g_source': r.get('source_rate_10g',''),
            'price_per_tola_source': r.get('source_rate_tola',''),
            'price_per_gram_calculated': r.get('calculated_rate_gram',''),
            'price_per_kg_calculated': r.get('calculated_rate_kg',''),
            'source_type': r.get('source_type',''),
            'source_document_id': r.get('source_document_id',''),
            'source_url': r.get('source_url',''),
            'verification_status': r.get('verification_status',''),
        })

post_ck = checksum('public/data/historical-rates.json')
print()
print('CORRECTION COMPLETE')
print('Pre-correction checksum : ' + pre_ck)
print('Post-correction checksum: ' + post_ck)
print()
print('RECORDS REMOVED (mock 2082 fabricated values): ' + str(len(removed_mock)))
for r in removed_mock[:4]:
    print('  ' + r['date_ad'] + ' ' + r['metal'] + ' doc=' + r.get('source_document_id',''))
print('  ...')
print()
print('Records corrected (FEN-API seed re-fetched): ' + str(len(corrected_api_rows)))
