"""
Phase 11B Clean-Baseline Reconciliation + Controlled Merge
Steps:
  1. Independently verify the 82-row clean baseline
  2. Re-fetch 62 API candidates fresh from official FENEGOSIDA API
  3. Reconcile against clean 82-row baseline
  4. Fabrication check on candidate generation
  5. Controlled merge
  6. Full 144-row independent post-merge audit
"""
import json, csv, urllib.request, datetime, hashlib, shutil

TOLA_FACTOR = 1.1664
EXPECTED_CHECKSUM = '7e564d8924f0bc62'
EXPECTED_ROWS = 82

# Official API keys (Nepali unicode)
GOLD_10G_KEY  = '\u091b\u093e\u092a\u093e\u0935\u093e\u0932 \u0938\u0941\u0928 (\u0967\u0966 \u0917\u094d\u0930\u093e\u092e)'
GOLD_TOLA_KEY = '\u091b\u093e\u092a\u093e\u0935\u093e\u0932 \u0938\u0941\u0928 (\u0967 \u0924\u094b\u0932\u093e)'
SILV_10G_KEY  = '\u0905\u0938\u0932\u0940 \u091a\u093e\u0901\u0926\u0940 \u0926\u0930 (\u0967\u0966 \u0917\u094d\u0930\u093e\u092e)'
SILV_TOLA_KEY = '\u0905\u0938\u0932\u0940 \u091a\u093e\u0901\u0926\u0940 \u0926\u0930 (\u0967 \u0924\u094b\u0932\u093e)'

QUARANTINED_DOCS = {
    '2508291059454hy78y.pdf',
    '2601020304005r106s.pdf',
    '260123044935ehtkpy.pdf',
    '26022008145339a745.pdf',
}

def checksum(path):
    with open(path, 'rb') as f:
        return hashlib.sha256(f.read()).hexdigest()[:16]

def math_ok(rate_10g, rate_tola, tol=0.5):
    if not rate_10g or not rate_tola:
        return False
    return abs(rate_10g * TOLA_FACTOR - rate_tola) / rate_tola * 100 < tol

# ─────────────────────────────────────────────
# STEP 1: Independently verify clean baseline
# ─────────────────────────────────────────────
print('=' * 60)
print('STEP 1: CLEAN BASELINE VERIFICATION')
print('=' * 60)

actual_ck = checksum('public/data/historical-rates.json')
print('Expected checksum : ' + EXPECTED_CHECKSUM)
print('Actual checksum   : ' + actual_ck)
ck_match = actual_ck == EXPECTED_CHECKSUM
print('Checksum match    : ' + str(ck_match))

with open('public/data/historical-rates.json', 'r', encoding='utf-8') as f:
    db = json.load(f)
with open('public/data/historical-rates.csv', 'r', encoding='utf-8') as f:
    csv_rows = list(csv.DictReader(f))

prod = db['data']
gold_prod = [r for r in prod if r['metal'] == 'gold']
silv_prod  = [r for r in prod if r['metal'] == 'silver']
dates_prod = sorted(set(r['date_ad'] for r in prod))

print('JSON rows         : ' + str(len(prod)) + '  (expected ' + str(EXPECTED_ROWS) + ')')
print('CSV rows          : ' + str(len(csv_rows)))
print('Gold              : ' + str(len(gold_prod)))
print('Silver            : ' + str(len(silv_prod)))
print('Unique dates      : ' + str(len(dates_prod)))
print('Earliest          : ' + dates_prod[0])
print('Latest            : ' + dates_prod[-1])
parity = 'PASS' if len(prod) == len(csv_rows) else 'FAIL'
print('JSON/CSV parity   : ' + parity)

# Math audit on baseline
base_math = sum(1 for r in prod if math_ok(r.get('source_rate_10g'), r.get('source_rate_tola')))
print('Math audit        : ' + str(base_math) + '/' + str(len(prod)))

# Quarantine check — ensure no quarantined docs remain
quarantine_leaks = [r for r in prod if r.get('source_document_id','') in QUARANTINED_DOCS]
print('Quarantine leaks  : ' + str(len(quarantine_leaks)))

# Anomaly check
anomalies_base = [r for r in prod if r.get('source_rate_10g', 0) > 900000]
print('Anomalies >900000 : ' + str(len(anomalies_base)))

# Source composition of baseline
src_docs = {}
for r in prod:
    doc = r.get('source_document_id', 'unknown')
    src_docs[doc] = src_docs.get(doc, 0) + 1

# Baseline is valid if all checks pass
baseline_ok = (
    len(prod) == EXPECTED_ROWS and
    parity == 'PASS' and
    base_math == EXPECTED_ROWS and
    len(quarantine_leaks) == 0 and
    len(anomalies_base) == 0
)
print()
print('BASELINE VALID    : ' + str(baseline_ok))
if not baseline_ok:
    print('STOP — baseline does not match expected state. Aborting merge.')
    exit(1)

prod_keys = set(r['date_ad'] + '_' + r['metal'] for r in prod)

# ─────────────────────────────────────────────
# STEP 2: Re-fetch 62 API candidates fresh
# ─────────────────────────────────────────────
print()
print('=' * 60)
print('STEP 2: RE-FETCH OFFICIAL API CANDIDATES (2026-07, 2026-08)')
print('=' * 60)

raw_by_date = {}
for ym in ['2026-07', '2026-08']:
    url = 'https://api.fenegosida.org/api/website/v1/Dashboard/monthwisehistory?date=' + ym
    req = urllib.request.Request(url, headers={'User-Agent':'Mozilla/5.0','Accept':'application/json'})
    resp = urllib.request.urlopen(req, timeout=10)
    data = json.loads(resp.read().decode('utf-8'))
    for r in data:
        d = r['todayDate']
        if d not in raw_by_date:
            raw_by_date[d] = {}
        raw_by_date[d][r['rateType']] = r['baseRatePerGram']

print('Dates returned from API: ' + str(len(raw_by_date)))

candidates = []
cand_math_pass = 0
cand_math_fail = []

for ad_date in sorted(raw_by_date.keys()):
    rec = raw_by_date[ad_date]
    g_10g  = rec.get(GOLD_10G_KEY)
    g_tola = rec.get(GOLD_TOLA_KEY)
    s_10g  = rec.get(SILV_10G_KEY)
    s_tola = rec.get(SILV_TOLA_KEY)
    day = datetime.datetime.strptime(ad_date, '%Y-%m-%d').strftime('%A')
    doc_id = 'FEN-API-' + ad_date
    ep_url = 'https://api.fenegosida.org/api/website/v1/Dashboard/monthwisehistory?date=' + ad_date[:7]

    for metal, m_10g, m_tola, src_cat in [
        ('gold',   g_10g,  g_tola, 'Fine Gold (9999)'),
        ('silver', s_10g,  s_tola, 'Silver'),
    ]:
        if m_10g is None or m_tola is None:
            continue
        diff = abs(m_10g * TOLA_FACTOR - m_tola) / m_tola * 100
        vstat = 'verified' if diff < 0.5 else 'needs_review'
        if diff < 0.5:
            cand_math_pass += 1
        else:
            cand_math_fail.append(ad_date + '_' + metal + ' diff=' + str(round(diff,3)) + '%')

        candidates.append({
            'date_ad': ad_date,
            'date_bs': '',
            'day': day,
            'metal': metal,
            'source_category': src_cat,
            'source_rate_10g': m_10g,
            'source_rate_tola': m_tola,
            'calculated_rate_gram': round(m_tola / 11.664, 2),
            'calculated_rate_kg':   round((m_tola / 11.664) * 1000, 2),
            'source_type': 'fenegosida_api',
            'source_document_id': doc_id,
            'source_url': ep_url,
            'verification_status': vstat,
        })

print('Candidates generated: ' + str(len(candidates)))
print('Math PASS: ' + str(cand_math_pass) + '  FAIL: ' + str(len(cand_math_fail)))
for b in cand_math_fail:
    print('  FAIL: ' + b)

# Anomaly check on candidates
cand_anomalies = [c for c in candidates if c.get('source_rate_10g', 0) > 900000]
print('Candidate anomalies >900000: ' + str(len(cand_anomalies)))

# ─────────────────────────────────────────────
# STEP 3: Fabrication check
# ─────────────────────────────────────────────
print()
print('=' * 60)
print('STEP 3: FABRICATION / PROVENANCE CHECK')
print('=' * 60)
# All candidates must come from direct API fetch (this script)
# Verify none use Phase 10B mock arithmetic pattern:
#   g_10 = 130000.0 + (i * 500)
KNOWN_MOCK_VALUES = set(130000.0 + i * 500 for i in range(6))
mock_hits = [c for c in candidates if c['source_rate_10g'] in KNOWN_MOCK_VALUES]
print('Candidates matching mock arithmetic pattern: ' + str(len(mock_hits)))
print('Source: official FENEGOSIDA API (re-fetched live this session)')
print('Generation method: direct urllib.request → JSON parse → validated field extraction')
print('Fabrication detected: ' + str(len(mock_hits) > 0))

# ─────────────────────────────────────────────
# STEP 4: Duplicate reconciliation vs clean 82
# ─────────────────────────────────────────────
print()
print('=' * 60)
print('STEP 4: DUPLICATE RECONCILIATION vs CLEAN 82-ROW BASELINE')
print('=' * 60)

new_candidates = []
exact_dupes = []
conflicts = []

for c in candidates:
    key = c['date_ad'] + '_' + c['metal']
    if key not in prod_keys:
        new_candidates.append(c)
    else:
        # Check for conflict
        existing = next(r for r in prod if r['date_ad'] + '_' + r['metal'] == key)
        if abs(existing.get('source_rate_10g', 0) - c['source_rate_10g']) < 1:
            exact_dupes.append(key)
        else:
            conflicts.append({
                'key': key,
                'existing_10g': existing.get('source_rate_10g'),
                'candidate_10g': c['source_rate_10g'],
            })

print('Total candidates        : ' + str(len(candidates)))
print('Genuinely new           : ' + str(len(new_candidates)))
print('Exact duplicates        : ' + str(len(exact_dupes)))
print('Conflicts               : ' + str(len(conflicts)))
for cf in conflicts:
    print('  CONFLICT: ' + cf['key'] + ' existing=' + str(cf['existing_10g']) + ' new=' + str(cf['candidate_10g']))

if conflicts:
    print('STOP — conflicts detected. Aborting merge.')
    exit(1)

if len(new_candidates) == 0:
    print('STOP — no new candidates to merge.')
    exit(1)

cand_dates = sorted(set(c['date_ad'] for c in new_candidates))
print('New candidate date range: ' + cand_dates[0] + ' to ' + cand_dates[-1])
print('New candidate dates     : ' + str(len(cand_dates)))

# ─────────────────────────────────────────────
# STEP 5: Pre-merge backup
# ─────────────────────────────────────────────
print()
print('=' * 60)
print('STEP 5: PRE-MERGE BACKUP')
print('=' * 60)

shutil.copy('public/data/historical-rates.json', 'public/data/historical-rates-pre-phase11b-clean.json')
shutil.copy('public/data/historical-rates.csv',  'public/data/historical-rates-pre-phase11b-clean.csv')

bk_json_ck = checksum('public/data/historical-rates-pre-phase11b-clean.json')
print('Backup JSON checksum: ' + bk_json_ck)

# ─────────────────────────────────────────────
# STEP 6: Controlled merge
# ─────────────────────────────────────────────
print()
print('=' * 60)
print('STEP 6: CONTROLLED MERGE')
print('=' * 60)

merged = {}
for r in prod:
    merged[r['date_ad'] + '_' + r['metal']] = r
for c in new_candidates:
    merged[c['date_ad'] + '_' + c['metal']] = c

final = sorted(merged.values(), key=lambda x: (x['date_ad'], x['metal']))
print('Existing rows   : ' + str(len(prod)))
print('New rows added  : ' + str(len(new_candidates)))
print('Final total     : ' + str(len(final)))

# ─────────────────────────────────────────────
# STEP 7: Write production files
# ─────────────────────────────────────────────
db['data'] = final
db['meta']['total_verified_records'] = len(final)
db['meta']['earliest_verified_date'] = final[0]['date_ad']
db['meta']['latest_verified_date']   = final[-1]['date_ad']
db['meta']['last_updated'] = datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')

with open('public/data/historical-rates.json', 'w', encoding='utf-8') as f:
    json.dump(db, f, ensure_ascii=False, indent=2)

CSV_FIELDS = ['date_bs','date_ad','day','metal','source_category',
              'price_per_10g_source','price_per_tola_source',
              'price_per_gram_calculated','price_per_kg_calculated',
              'source_type','source_document_id','source_url','verification_status']

with open('public/data/historical-rates.csv', 'w', encoding='utf-8', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=CSV_FIELDS)
    writer.writeheader()
    for r in final:
        writer.writerow({
            'date_bs':                   r.get('date_bs',''),
            'date_ad':                   r['date_ad'],
            'day':                       r.get('day',''),
            'metal':                     r['metal'],
            'source_category':           r.get('source_category',''),
            'price_per_10g_source':      r.get('source_rate_10g',''),
            'price_per_tola_source':     r.get('source_rate_tola',''),
            'price_per_gram_calculated': r.get('calculated_rate_gram',''),
            'price_per_kg_calculated':   r.get('calculated_rate_kg',''),
            'source_type':               r.get('source_type',''),
            'source_document_id':        r.get('source_document_id',''),
            'source_url':                r.get('source_url',''),
            'verification_status':       r.get('verification_status',''),
        })

# ─────────────────────────────────────────────
# STEP 8: Full 144-row independent post-merge audit
# ─────────────────────────────────────────────
print()
print('=' * 60)
print('STEP 8: FULL POST-MERGE INDEPENDENT AUDIT')
print('=' * 60)

with open('public/data/historical-rates.json', 'r', encoding='utf-8') as f:
    verify_db = json.load(f)
with open('public/data/historical-rates.csv', 'r', encoding='utf-8') as f:
    verify_csv = list(csv.DictReader(f))

vrows = verify_db['data']
vgold   = [r for r in vrows if r['metal'] == 'gold']
vsilver = [r for r in vrows if r['metal'] == 'silver']
vdates  = sorted(set(r['date_ad'] for r in vrows))

print('JSON rows      : ' + str(len(vrows)))
print('CSV rows       : ' + str(len(verify_csv)))
print('Gold           : ' + str(len(vgold)))
print('Silver         : ' + str(len(vsilver)))
print('Unique dates   : ' + str(len(vdates)))
print('Earliest       : ' + vdates[0])
print('Latest         : ' + vdates[-1])
vparity = 'PASS' if len(vrows) == len(verify_csv) else 'FAIL'
print('JSON/CSV parity: ' + vparity)

# Math audit — all rows
v_math_ok = 0
v_math_bad = []
for r in vrows:
    g10 = r.get('source_rate_10g')
    gt  = r.get('source_rate_tola')
    if g10 and gt:
        diff = abs(g10 * TOLA_FACTOR - gt) / gt * 100
        if diff < 0.5:
            v_math_ok += 1
        else:
            v_math_bad.append(r['date_ad'] + '_' + r['metal'] + ' diff=' + str(round(diff,3)) + '%')
print('Math audit     : ' + str(v_math_ok) + '/' + str(len(vrows)) + ' PASS')
for b in v_math_bad:
    print('  FAIL: ' + b)

# Duplicate audit
seen = set()
v_dupes = []
for r in vrows:
    k = r['date_ad'] + '_' + r['metal']
    if k in seen:
        v_dupes.append(k)
    seen.add(k)
print('Duplicates     : ' + str(len(v_dupes)))

# Anomaly audit
v_anomaly = [r for r in vrows if r.get('source_rate_10g', 0) > 900000]
print('Anomaly >900000: ' + str(len(v_anomaly)))

# Quarantine leak audit
v_quaran = [r for r in vrows if r.get('source_document_id','') in QUARANTINED_DOCS]
print('Quarantine leak: ' + str(len(v_quaran)))

# Provenance audit
v_no_src = [r for r in vrows if not r.get('source_url') or not r.get('source_document_id')]
print('Missing prov.  : ' + str(len(v_no_src)))

# Source composition
print()
print('Source composition:')
doc_counts = {}
for r in vrows:
    doc = r.get('source_document_id','unknown')
    doc_counts[doc] = doc_counts.get(doc, 0) + 1

src_type_counts = {}
for r in vrows:
    st = r.get('source_type','unknown')
    src_type_counts[st] = src_type_counts.get(st, 0) + 1

pdf_2081 = sum(v for k,v in doc_counts.items() if 'FEN-WEEKLY-2081' in k)
pdf_2083 = sum(v for k,v in doc_counts.items() if 'FEN-WEEKLY-2083' in k)
api_rows = sum(v for k,v in doc_counts.items() if 'FEN-API' in k)
print('  2081 weekly PDFs       : ' + str(pdf_2081) + ' rows')
print('  2083 weekly PDF        : ' + str(pdf_2083) + ' rows')
print('  FENEGOSIDA API rows    : ' + str(api_rows) + ' rows')
print('  Total                  : ' + str(pdf_2081 + pdf_2083 + api_rows))

# Coverage map
print()
print('Verified coverage windows:')
prev_d = None
ws = None
windows = []
gaps = []
for d in vdates:
    if prev_d is None:
        ws = d
    else:
        diff = (datetime.date.fromisoformat(d) - datetime.date.fromisoformat(prev_d)).days
        if diff > 1:
            windows.append((ws, prev_d))
            gaps.append((prev_d, d))
            ws = d
    prev_d = d
windows.append((ws, vdates[-1]))

for w in windows:
    cnt = len([d for d in vdates if w[0] <= d <= w[1]])
    print('  ' + w[0] + ' -> ' + w[1] + ' (' + str(cnt) + ' dates)')

print()
print('Remaining gaps (calendar):')
for g in gaps:
    gdays = (datetime.date.fromisoformat(g[1]) - datetime.date.fromisoformat(g[0])).days - 1
    print('  ' + g[0] + ' -> ' + g[1] + ' (' + str(gdays) + ' calendar days)')

# Checksums
post_json_ck = checksum('public/data/historical-rates.json')
print()
print('CHECKSUMS:')
print('  Pre-merge  : ' + bk_json_ck)
print('  Post-merge : ' + post_json_ck)
print('  Changed    : ' + str(bk_json_ck != post_json_ck))

# Final verdict
all_pass = (
    len(vrows) == 144 and
    len(vgold) == 72 and
    len(vsilver) == 72 and
    len(vdates) == 72 and
    vparity == 'PASS' and
    v_math_ok == 144 and
    len(v_dupes) == 0 and
    len(v_anomaly) == 0 and
    len(v_quaran) == 0 and
    len(v_no_src) == 0
)
print()
print('=' * 60)
if all_pass:
    print('FINAL STATUS: A — CLEAN-BASELINE MERGE VERIFIED')
    print('144 rows / 72 Gold / 72 Silver / 72 unique dates')
    print('All integrity checks passed.')
else:
    print('FINAL STATUS: C — MERGE BLOCKED BY VALIDATION ISSUE')
    print('Investigate the failures above before proceeding.')
print('=' * 60)
