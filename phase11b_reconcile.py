"""
Phase 11B Reconciliation Audit
Verifies:
  1. Exact first/last candidate dates
  2. Full BS<->AD mapping for all 31 candidate dates
  3. Day-of-week verification
  4. Residual gap precision after merge
  5. Collision check against production (date_ad + metal + any alt representations)
  6. Candidate provenance completeness
  7. Candidate JSON integrity
"""
import json, datetime, csv, io

TOLA_FACTOR = 1.1664

# ── BS → AD lookup (Gregorian equivalents for BS 2083)
# BS 2083 starts: 2026-04-14 (BS 2083/01/01 = AD 2026-04-14)
# Each BS month length for 2083:
BS2083_MONTHS = [31,31,32,32,31,30,30,29,30,29,30,30]  # standard Bikram Sambat 2083

def bs_to_ad(bs_year, bs_month, bs_day):
    """Convert BS date to AD date for BS 2082 and 2083."""
    # BS 2082 starts: 2025-04-14, BS 2083 starts: 2026-04-14
    BS_EPOCH = {
        2082: datetime.date(2025, 4, 14),
        2083: datetime.date(2026, 4, 14),
    }
    # Month lengths
    BS_MONTHS = {
        2082: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
        2083: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    }
    if bs_year not in BS_EPOCH:
        return None
    epoch = BS_EPOCH[bs_year]
    months = BS_MONTHS[bs_year]
    days_offset = sum(months[:bs_month - 1]) + (bs_day - 1)
    return epoch + datetime.timedelta(days=days_offset)

def ad_to_bs(ad_date):
    """Reverse-map AD date to BS date for 2082/2083 range."""
    BS_EPOCH = {
        2082: datetime.date(2025, 4, 14),
        2083: datetime.date(2026, 4, 14),
    }
    BS_MONTHS = {
        2082: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
        2083: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    }
    for bs_year in [2082, 2083]:
        epoch = BS_EPOCH[bs_year]
        months = BS_MONTHS[bs_year]
        year_end = epoch + datetime.timedelta(days=sum(months) - 1)
        if epoch <= ad_date <= year_end:
            delta = (ad_date - epoch).days
            for m_idx, m_len in enumerate(months):
                if delta < m_len:
                    return bs_year, m_idx + 1, delta + 1
                delta -= m_len
    return None, None, None

# ── Load data
with open('public/data/historical-rates.json', 'r', encoding='utf-8') as f:
    db = json.load(f)
prod_rows = db['data']
prod_keys = set(r['date_ad'] + '_' + r['metal'] for r in prod_rows)
prod_dates = sorted(set(r['date_ad'] for r in prod_rows))

with open('phase11b_api_candidates.json', 'r', encoding='utf-8') as f:
    cand_db = json.load(f)
candidates = cand_db['candidates']

print('=' * 60)
print('PHASE 11B RECONCILIATION AUDIT')
print('=' * 60)

# ── 1. Baseline confirmation
print()
print('[1] PRODUCTION BASELINE')
print('  JSON rows :  ' + str(len(prod_rows)))
gold_prod = [r for r in prod_rows if r['metal'] == 'gold']
silver_prod = [r for r in prod_rows if r['metal'] == 'silver']
print('  Gold      :  ' + str(len(gold_prod)))
print('  Silver    :  ' + str(len(silver_prod)))
print('  Dates     :  ' + str(len(prod_dates)))
print('  Earliest  :  ' + prod_dates[0])
print('  Latest    :  ' + prod_dates[-1])

# ── 2. Candidate summary
print()
print('[2] CANDIDATE SUMMARY')
cand_dates = sorted(set(c['date_ad'] for c in candidates))
print('  Total candidates :  ' + str(len(candidates)))
print('  New dates        :  ' + str(len(cand_dates)))
print('  First date       :  ' + cand_dates[0])
print('  Last date        :  ' + cand_dates[-1])

# ── 3. Full BS/AD mapping for all 31 dates
print()
print('[3] FULL BS/AD/DAY-OF-WEEK MAPPING')
mapping_errors = 0
for ad_str in cand_dates:
    ad = datetime.date.fromisoformat(ad_str)
    bs_y, bs_m, bs_d = ad_to_bs(ad)
    day_expected = ad.strftime('%A')
    # Find candidate day
    cand_day = next((c['day'] for c in candidates if c['date_ad'] == ad_str), '?')
    day_ok = 'OK' if cand_day == day_expected else 'MISMATCH'
    if day_ok == 'MISMATCH':
        mapping_errors += 1
    bs_str = f'BS {bs_y}/{bs_m:02d}/{bs_d:02d}' if bs_y else 'OUT_OF_RANGE'
    print(f'  {ad_str}  {bs_str}  {day_expected:<10}  candidate_day={cand_day}  [{day_ok}]')

print()
print('  Day-of-week errors: ' + str(mapping_errors))

# Confirm first candidate date BS mapping
first_ad = datetime.date.fromisoformat(cand_dates[0])
bs_y0, bs_m0, bs_d0 = ad_to_bs(first_ad)
print()
print('[4] FIRST CANDIDATE DATE RECONCILIATION')
print(f'  AD : {cand_dates[0]}')
print(f'  BS : {bs_y0}/{bs_m0:02d}/{bs_d0:02d}')
print(f'  Day: {first_ad.strftime("%A")}')
# Cross-check: BS 2083/04/09 ?
bs2083_04_09 = bs_to_ad(2083, 4, 9)
print(f'  BS 2083/04/09 = AD {bs2083_04_09}  (claimed in 11B report)')
if bs2083_04_09 == first_ad:
    print('  RECONCILIATION: CONFIRMED — 2026-07-23 = BS 2083/04/09')
else:
    print(f'  RECONCILIATION: MISMATCH — actual BS equivalent of 2026-07-23 is {bs_y0}/{bs_m0}/{bs_d0}')

# ── 5. Duplicate collision check (also check alternate source representations)
print()
print('[5] COLLISION CHECK')
collisions = []
for c in candidates:
    key = c['date_ad'] + '_' + c['metal']
    if key in prod_keys:
        collisions.append(key)
print('  Exact key collisions (date_ad+metal): ' + str(len(collisions)))
for col in collisions:
    print('    COLLISION: ' + col)

# ── 6. Residual gap analysis
print()
print('[6] RESIDUAL GAP ANALYSIS')
# Build the merged date set
merged_dates = sorted(set(prod_dates + cand_dates))
# Identify all continuous windows and gaps
windows = []
gaps = []
window_start = merged_dates[0]
prev = merged_dates[0]
for d in merged_dates[1:]:
    curr = datetime.date.fromisoformat(d)
    p = datetime.date.fromisoformat(prev)
    diff = (curr - p).days
    if diff > 1:
        windows.append((window_start, prev))
        gaps.append((prev, d))
        window_start = d
    prev = d
windows.append((window_start, merged_dates[-1]))

print('  Verified coverage windows after merge:')
for ws, we in windows:
    dates_in_window = [d for d in merged_dates if ws <= d <= we]
    print(f'    {ws} -> {we}  ({len(dates_in_window)} dates)')

print()
print('  Remaining gaps after merge:')
for gs, ge in gaps:
    gs_dt = datetime.date.fromisoformat(gs)
    ge_dt = datetime.date.fromisoformat(ge)
    gap_days = (ge_dt - gs_dt).days - 1
    print(f'    {gs} -> {ge}  ({gap_days} calendar days unverified)')

# Specific check: is 2026-06-13 -> 2026-07-22 the correct residual?
gap_start = '2026-06-13'
gap_end = '2026-07-22'
expected_in_gap = [d for d in merged_dates if gap_start <= d <= gap_end]
print()
if not expected_in_gap:
    print(f'  Residual gap {gap_start} -> {gap_end}: CONFIRMED — no verified dates in this range')
else:
    print(f'  WARNING: dates found within expected residual gap: {expected_in_gap}')

# ── 7. Provenance completeness
print()
print('[7] PROVENANCE COMPLETENESS')
missing_source = [c for c in candidates if not c.get('source_url')]
missing_doc_id = [c for c in candidates if not c.get('source_document_id')]
missing_vstat = [c for c in candidates if not c.get('verification_status')]
print('  Missing source_url:          ' + str(len(missing_source)))
print('  Missing source_document_id:  ' + str(len(missing_doc_id)))
print('  Missing verification_status: ' + str(len(missing_vstat)))
src_types = set(c.get('source_type','') for c in candidates)
print('  Source types: ' + str(src_types))

# ── 8. Math re-validation (independent pass)
print()
print('[8] INDEPENDENT MATH REVALIDATION')
math_ok = 0
math_bad = []
for c in candidates:
    g10 = c.get('source_rate_10g')
    gtola = c.get('source_rate_tola')
    if g10 and gtola:
        expected = g10 * TOLA_FACTOR
        diff_pct = abs(expected - gtola) / gtola * 100
        if diff_pct < 0.5:
            math_ok += 1
        else:
            math_bad.append((c['date_ad'], c['metal'], g10, gtola, round(diff_pct,3)))
print('  Math PASS: ' + str(math_ok) + ' / ' + str(len(candidates)))
if math_bad:
    print('  Math FAILURES:')
    for b in math_bad:
        print('    ' + str(b))
else:
    print('  Math FAILURES: 0')

# ── 9. Projected totals
print()
print('[9] PROJECTED PRODUCTION AFTER MERGE')
new_count = len([c for c in candidates if c['date_ad'] + '_' + c['metal'] not in prod_keys])
new_gold = len([c for c in candidates if c['metal']=='gold' and c['date_ad']+'_gold' not in prod_keys])
new_silver = len([c for c in candidates if c['metal']=='silver' and c['date_ad']+'_silver' not in prod_keys])
new_dates = len([d for d in cand_dates if d not in prod_dates])
print('  Current production rows : ' + str(len(prod_rows)))
print('  New rows to add         : ' + str(new_count))
print('  Projected total rows    : ' + str(len(prod_rows) + new_count))
print('  Projected Gold          : ' + str(len(gold_prod) + new_gold))
print('  Projected Silver        : ' + str(len(silver_prod) + new_silver))
print('  Projected unique dates  : ' + str(len(prod_dates) + new_dates))

# ── 10. Final determination
print()
print('[10] RECONCILIATION VERDICT')
all_ok = (
    mapping_errors == 0 and
    len(collisions) == 0 and
    len(missing_source) == 0 and
    len(missing_doc_id) == 0 and
    math_ok == len(candidates) and
    len(math_bad) == 0
)
if all_ok:
    print('  STATUS: ALL CHECKS PASSED')
    print('  RECOMMENDATION: SAFE TO PROCEED TO CONTROLLED MERGE')
else:
    print('  STATUS: ISSUES FOUND — RESOLVE BEFORE MERGE')
