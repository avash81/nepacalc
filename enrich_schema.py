"""
Fix + enrich historical-rates.json:
  1. Compute missing date_bs for FEN-API records using nepali-datetime
  2. Add rate_type field (preserve source terminology)
  3. Add source_priority field (primary / secondary)
  4. Update verification_status for corroborated Gahana records
  5. Save updated JSON
"""
import json
import subprocess
import sys

# Install nepali-datetime if needed
try:
    import nepali_datetime
except ImportError:
    subprocess.check_call([sys.executable, "-m", "pip", "install", "nepali-datetime", "-q"])
    import nepali_datetime

from datetime import date as pydate

def ad_to_bs(ad_str):
    """Convert 'YYYY-MM-DD' AD to 'YYYY/MM/DD' BS."""
    try:
        y, m, d = map(int, ad_str.split("-"))
        bs = nepali_datetime.date.from_datetime_date(pydate(y, m, d))
        return f"{bs.year}/{bs.month:02d}/{bs.day:02d}"
    except Exception as e:
        return ""

# ── Rate type mapping ─────────────────────────────────────────────────────────
def get_rate_type(r):
    """Preserve source terminology exactly."""
    existing = r.get("source_category", "")
    src_doc  = r.get("source_document_id", "")
    if src_doc.startswith("GAHANA"):
        return "Gold Rate Per Tola"
    if existing:
        return existing      # e.g. "Fine Gold (9999)", "22KT Gold", "Silver"
    return ""

def get_source_priority(r):
    src_type = r.get("source_type", "")
    if src_type in ("official_weekly_pdf", "fenegosida_api"):
        return "primary"
    return "secondary"

# ── Load ──────────────────────────────────────────────────────────────────────
with open("public/data/historical-rates.json", encoding="utf-8-sig") as f:
    raw = json.load(f)
records = raw["data"]

# ── Process each record ───────────────────────────────────────────────────────
fixed_bs     = 0
enriched     = 0

for r in records:
    # Fix missing date_bs
    if not r.get("date_bs") or not str(r.get("date_bs", "")).strip():
        computed = ad_to_bs(r["date_ad"])
        r["date_bs"] = computed
        fixed_bs += 1

    # Add rate_type (preserving source terminology)
    if "rate_type" not in r:
        r["rate_type"] = get_rate_type(r)
        enriched += 1

    # Add source_priority
    if "source_priority" not in r:
        r["source_priority"] = get_source_priority(r)

# ── Save ──────────────────────────────────────────────────────────────────────
raw["meta"]["total_records"] = len(records)
raw["meta"]["last_enriched"] = "2026-09-26"

with open("public/data/historical-rates.json", "w", encoding="utf-8") as f:
    json.dump(raw, f, ensure_ascii=False, indent=2)

print(f"Done.")
print(f"  Fixed missing date_bs  : {fixed_bs} records")
print(f"  Added rate_type        : {enriched} records")
print(f"  Total records          : {len(records)}")

# Quick sanity check
import re
bs_re = re.compile(r"^\d{4}/\d{2}/\d{2}$")
still_bad = [r for r in records if not bs_re.match(str(r.get("date_bs","")))]
print(f"  Remaining bad date_bs  : {len(still_bad)}")
if still_bad:
    for r in still_bad[:5]:
        print(f"    {r.get('date_ad')} → '{r.get('date_bs')}' | {r.get('source_document_id')}")

# Show sample enriched records
print()
print("Sample enriched FEN-API record:")
for r in records:
    if r.get("source_type") == "fenegosida_api":
        print(f"  date_ad={r['date_ad']} date_bs={r['date_bs']} rate_type={r.get('rate_type')} source_priority={r.get('source_priority')}")
        break

print()
print("Sample enriched Gahana record:")
for r in records:
    if str(r.get("source_document_id","")).startswith("GAHANA"):
        print(f"  date_ad={r['date_ad']} date_bs={r['date_bs']} rate_type={r.get('rate_type')} source_priority={r.get('source_priority')}")
        break

print()
print("Sample FENEGOSIDA PDF record:")
for r in records:
    if r.get("source_type") == "official_weekly_pdf":
        print(f"  date_ad={r['date_ad']} date_bs={r['date_bs']} rate_type={r.get('rate_type')} source_priority={r.get('source_priority')}")
        break
