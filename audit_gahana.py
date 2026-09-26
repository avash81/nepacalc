"""
Full Gahana data audit script.
Produces a detailed report covering:
  1. Record counts by source
  2. Duplicate detection (same date + metal)
  3. Malformed date/price detection
  4. BS/AD date consistency check
  5. 25 distributed spot check candidates
  6. FENEGOSIDA vs Gahana overlap reconciliation
"""
import json
import re
from collections import defaultdict
from datetime import datetime, timedelta

# ── load data ────────────────────────────────────────────────────────────────
with open("public/data/historical-rates.json", encoding="utf-8-sig") as f:
    raw = json.load(f)

records = raw["data"]

fenegosida = [r for r in records if r.get("source_type") == "official_weekly_pdf"]
gahana     = [r for r in records if r.get("source_document_id", "").startswith("GAHANA")]

print("=" * 70)
print("NEPACALC HISTORICAL DATA AUDIT REPORT")
print("=" * 70)
print(f"\nTotal records        : {len(records)}")
print(f"FENEGOSIDA (verified): {len(fenegosida)}")
print(f"Gahana (unverified)  : {len(gahana)}")

# ── 1. DUPLICATES ─────────────────────────────────────────────────────────────
print("\n" + "─" * 70)
print("1. DUPLICATE CHECK (same date_ad + metal)")
seen = defaultdict(list)
for r in records:
    key = r["date_ad"] + "_" + r.get("metal", "")
    seen[key].append(r)

dupes = {k: v for k, v in seen.items() if len(v) > 1}
if dupes:
    print(f"  !! {len(dupes)} duplicate keys found:")
    for k, v in list(dupes.items())[:10]:
        sources = [x.get("source_document_id","?") for x in v]
        print(f"     {k}  →  {sources}")
else:
    print("  OK — No duplicates found")

# ── 2. MALFORMED DATES ────────────────────────────────────────────────────────
print("\n" + "─" * 70)
print("2. MALFORMED DATE CHECK")

ad_re  = re.compile(r"^\d{4}-\d{2}-\d{2}$")
bs_re  = re.compile(r"^\d{4}/\d{2}/\d{2}$")
bad_ad, bad_bs = [], []

for r in records:
    if not ad_re.match(str(r.get("date_ad", ""))):
        bad_ad.append(r)
    if not bs_re.match(str(r.get("date_bs", ""))):
        bad_bs.append(r)

print(f"  date_ad malformed: {len(bad_ad)}")
for r in bad_ad[:5]:
    print(f"    {r.get('date_ad')} | {r.get('source_document_id')}")
print(f"  date_bs malformed: {len(bad_bs)}")
for r in bad_bs[:5]:
    print(f"    {r.get('date_bs')} | {r.get('source_document_id')}")

# ── 3. MALFORMED PRICES ───────────────────────────────────────────────────────
print("\n" + "─" * 70)
print("3. MALFORMED / SUSPICIOUS PRICE CHECK")
bad_price = []
for r in records:
    t = r.get("source_rate_tola", 0)
    g10 = r.get("source_rate_10g", 0)
    metal = r.get("metal", "")
    if metal == "gold":
        if not (50000 <= float(t or 0) <= 500000):
            bad_price.append(("tola_out_of_range", r))
        if not (40000 <= float(g10 or 0) <= 450000):
            bad_price.append(("10g_out_of_range", r))
    elif metal == "silver":
        if not (500 <= float(t or 0) <= 20000):
            bad_price.append(("tola_out_of_range", r))

print(f"  Out-of-range prices: {len(bad_price)}")
for reason, r in bad_price[:10]:
    print(f"    {reason}: {r.get('date_ad')} | tola={r.get('source_rate_tola')} | 10g={r.get('source_rate_10g')} | {r.get('source_document_id')}")

# ── 4. BS/AD CONSISTENCY (spot sample) ────────────────────────────────────────
print("\n" + "─" * 70)
print("4. BS/AD CONSISTENCY SAMPLE (checking year part only)")
# The BS year should roughly be AD year + 56 or 57
inconsistent_year = []
for r in records:
    try:
        ad_yr = int(str(r["date_ad"])[:4])
        bs_yr = int(str(r["date_bs"])[:4])
        diff = bs_yr - ad_yr
        if diff not in (56, 57):
            inconsistent_year.append((ad_yr, bs_yr, diff, r))
    except Exception:
        pass

print(f"  BS-AD year diff inconsistencies: {len(inconsistent_year)}")
for ad_yr, bs_yr, diff, r in inconsistent_year[:10]:
    print(f"    AD={ad_yr} BS={bs_yr} diff={diff} | {r.get('date_ad')} {r.get('date_bs')} | {r.get('source_document_id')}")

# ── 5. 25 DISTRIBUTED SPOT-CHECK CANDIDATES ───────────────────────────────────
print("\n" + "─" * 70)
print("5. 25 DISTRIBUTED SPOT-CHECK CANDIDATES (from Gahana gold)")

gold_gahana = [r for r in gahana if r.get("metal") == "gold"]
gold_gahana.sort(key=lambda r: r["date_ad"])

by_year = defaultdict(list)
for r in gold_gahana:
    by_year[r["date_ad"][:4]].append(r)

spot_checks = []
target_per_year = 5
for yr in sorted(by_year.keys()):
    pool = by_year[yr]
    # Pick evenly spaced (beginning, quarter, mid, three-quarter, end)
    indices = [0, len(pool)//4, len(pool)//2, 3*len(pool)//4, len(pool)-1]
    for idx in indices:
        r = pool[min(idx, len(pool)-1)]
        spot_checks.append(r)
    if len(spot_checks) >= 25:
        break

print(f"  {'Date (AD)':<14} {'Date (BS)':<14} {'Tola Price':>12}  Source")
print(f"  {'-'*14} {'-'*14} {'-'*12}  {'-'*20}")
for r in spot_checks[:25]:
    print(f"  {r['date_ad']:<14} {r['date_bs']:<14} {int(r['source_rate_tola'] or 0):>12}  {r.get('source_document_id','')}")

# ── 6. FENEGOSIDA vs GAHANA OVERLAP RECONCILIATION ───────────────────────────
print("\n" + "─" * 70)
print("6. FENEGOSIDA vs GAHANA OVERLAP RECONCILIATION")

fenegosida_idx = {}
for r in fenegosida:
    if r.get("metal") == "gold":
        fenegosida_idx[r["date_ad"]] = r

matches, conflicts, tolerance = [], [], 500  # Rs 500 tolerance for rounding

for r in gold_gahana:
    d = r["date_ad"]
    if d in fenegosida_idx:
        f = fenegosida_idx[d]
        g_tola = float(r.get("source_rate_tola") or 0)
        f_tola = float(f.get("source_rate_tola") or 0)
        diff   = abs(g_tola - f_tola)
        if diff <= tolerance:
            matches.append((d, g_tola, f_tola, diff))
        else:
            conflicts.append((d, g_tola, f_tola, diff))

print(f"\n  Gahana gold records overlapping FENEGOSIDA dates: {len(matches)+len(conflicts)}")
print(f"  Exact / corroborated (diff <= Rs {tolerance}): {len(matches)}")
print(f"  Conflicts (diff > Rs {tolerance})            : {len(conflicts)}")

if matches:
    print(f"\n  Sample corroborated matches (showing up to 10):")
    print(f"  {'Date':<14} {'Gahana Tola':>12} {'FENEGOSIDA Tola':>16} {'Diff':>8}")
    print(f"  {'-'*14} {'-'*12} {'-'*16} {'-'*8}")
    for d, g, f_, diff in matches[:10]:
        print(f"  {d:<14} {int(g):>12} {int(f_):>16} {int(diff):>8}")

if conflicts:
    print(f"\n  !! CONFLICTS (showing all):")
    print(f"  {'Date':<14} {'Gahana Tola':>12} {'FENEGOSIDA Tola':>16} {'Diff':>8}")
    print(f"  {'-'*14} {'-'*12} {'-'*16} {'-'*8}")
    for d, g, f_, diff in conflicts[:20]:
        print(f"  {d:<14} {int(g):>12} {int(f_):>16} {int(diff):>8}")

# ── SUMMARY ───────────────────────────────────────────────────────────────────
print("\n" + "=" * 70)
print("AUDIT SUMMARY")
print("=" * 70)
print(f"  Duplicates              : {len(dupes)}")
print(f"  Malformed date_ad       : {len(bad_ad)}")
print(f"  Malformed date_bs       : {len(bad_bs)}")
print(f"  Out-of-range prices     : {len(bad_price)}")
print(f"  BS-AD year inconsist.   : {len(inconsistent_year)}")
print(f"  Gahana/FENEGOSIDA overlap")
print(f"    Corroborated          : {len(matches)}")
print(f"    Conflicts             : {len(conflicts)}")
verdict = "CLEAN" if not (dupes or bad_ad or bad_bs or bad_price or inconsistent_year or conflicts) else "NEEDS REVIEW"
print(f"\n  Overall: {verdict}")
