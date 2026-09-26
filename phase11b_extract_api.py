import urllib.request, json, datetime

TOLA_FACTOR = 1.1664
months = ['2026-07', '2026-08']

raw_by_date = {}
for ym in months:
    url = f'https://api.fenegosida.org/api/website/v1/Dashboard/monthwisehistory?date={ym}'
    req = urllib.request.Request(url, headers={'User-Agent':'Mozilla/5.0','Accept':'application/json'})
    resp = urllib.request.urlopen(req, timeout=8)
    data = json.loads(resp.read().decode('utf-8'))
    for r in data:
        d = r['todayDate']
        rt = r['rateType']
        val = r['baseRatePerGram']
        if d not in raw_by_date:
            raw_by_date[d] = {}
        raw_by_date[d][rt] = val

with open('public/data/historical-rates.json', 'r', encoding='utf-8') as f:
    db = json.load(f)
existing_keys = set(r['date_ad'] + '_' + r['metal'] for r in db['data'])

candidates = []
math_pass = 0
math_review = 0
math_fail = 0
skipped_dupe = 0
skipped_missing = 0

for ad_date in sorted(raw_by_date.keys()):
    rec = raw_by_date[ad_date]
    g_10g = rec.get('\u091b\u093e\u092a\u093e\u0935\u093e\u0932 \u0938\u0941\u0928 (\u0967\u0966 \u0917\u094d\u0930\u093e\u092e)')
    g_tola = rec.get('\u091b\u093e\u092a\u093e\u0935\u093e\u0932 \u0938\u0941\u0928 (\u0967 \u0924\u094b\u0932\u093e)')
    s_10g = rec.get('\u0905\u0938\u0932\u0940 \u091a\u093e\u0901\u0926\u0940 \u0926\u0930 (\u0967\u0966 \u0917\u094d\u0930\u093e\u092e)')
    s_tola = rec.get('\u0905\u0938\u0932\u0940 \u091a\u093e\u0901\u0926\u0940 \u0926\u0930 (\u0967 \u0924\u094b\u0932\u093e)')
    
    day_name = datetime.datetime.strptime(ad_date, '%Y-%m-%d').strftime('%A')
    doc_id = 'FEN-API-' + ad_date
    
    for metal, m_10g, m_tola, src_cat in [
        ('gold', g_10g, g_tola, 'Fine Gold (9999)'),
        ('silver', s_10g, s_tola, 'Silver'),
    ]:
        key = ad_date + '_' + metal
        if key in existing_keys:
            skipped_dupe += 1
            continue
        if m_10g is None or m_tola is None:
            skipped_missing += 1
            continue
        
        expected = round(m_10g * TOLA_FACTOR, 2)
        diff_pct = abs(expected - m_tola) / m_tola * 100
        if diff_pct < 0.5:
            vstat = 'verified'
            math_pass += 1
        elif diff_pct < 2.0:
            vstat = 'needs_review'
            math_review += 1
        else:
            vstat = 'math_fail'
            math_fail += 1
        
        candidates.append({
            'date_ad': ad_date,
            'date_bs': 'TBD',
            'day': day_name,
            'metal': metal,
            'source_category': src_cat,
            'source_rate_10g': m_10g,
            'source_rate_tola': m_tola,
            'calculated_rate_gram': round(m_tola / 11.664, 2),
            'calculated_rate_kg': round((m_tola / 11.664) * 1000, 2),
            'source_type': 'fenegosida_api',
            'source_document_id': doc_id,
            'source_url': 'https://api.fenegosida.org/api/website/v1/Dashboard/monthwisehistory?date=' + ad_date[:7],
            'verification_status': vstat,
            'math_diff_pct': round(diff_pct, 4),
        })

print('=== PHASE 11B API EXTRACTION ===')
print('Months probed: 2026-07, 2026-08')
print('Raw date-records: ' + str(len(raw_by_date)))
print('Skipped (already in production): ' + str(skipped_dupe))
print('Skipped (missing fields): ' + str(skipped_missing))
print('New candidate metal-rows: ' + str(len(candidates)))
print('Math PASS: ' + str(math_pass))
print('Math NEEDS_REVIEW: ' + str(math_review))
print('Math FAIL: ' + str(math_fail))

bad_gold = [c for c in candidates if c['metal']=='gold' and c['source_rate_10g'] > 500000]
bad_silver = [c for c in candidates if c['metal']=='silver' and c['source_rate_10g'] > 50000]
print('Anomaly Gold >500000/10g: ' + str(len(bad_gold)))
print('Anomaly Silver >50000/10g: ' + str(len(bad_silver)))

cand_dates = sorted(set(c['date_ad'] for c in candidates))
print('New candidate unique dates: ' + str(len(cand_dates)))
for d in cand_dates:
    gold_r = next((c for c in candidates if c['date_ad']==d and c['metal']=='gold'), None)
    silv_r = next((c for c in candidates if c['date_ad']==d and c['metal']=='silver'), None)
    g_str = str(gold_r['source_rate_10g']) if gold_r else 'N/A'
    s_str = str(silv_r['source_rate_10g']) if silv_r else 'N/A'
    print('  ' + d + '  Gold/10g=' + g_str + '  Silver/10g=' + s_str)

with open('phase11b_api_candidates.json', 'w', encoding='utf-8') as f:
    json.dump({'candidates': candidates, 'total': len(candidates)}, f, ensure_ascii=False, indent=2)
print('Saved: phase11b_api_candidates.json')
