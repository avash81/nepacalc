"""
scrape_fenegosida_silver.py
---------------------------
Scrapes the OFFICIAL FENEGOSIDA silver (and gold) historical rates
using the same API endpoints called by their own website.

Endpoints discovered by reverse-engineering the fenegosida.org JS bundle:
  GET /api/website/v1/Dashboard/datewisehistory?date=YYYY-MM-DD
  GET /api/website/v1/Dashboard/monthwisehistory?date=YYYY-MM-DD

Output: fenegosida_silver_raw.json
Schema per record:
  { "date_ad": "YYYY-MM-DD", "tola": 4620, "per_10g": 3963, "source": "FENEGOSIDA" }
"""

import urllib.request
import json
import time
import re
from datetime import date, timedelta
from concurrent.futures import ThreadPoolExecutor, as_completed

BASE = "https://api.fenegosida.org"

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    "Accept": "application/json",
    "Referer": "https://www.fenegosida.org/",
    "Origin": "https://www.fenegosida.org",
}

def fetch_json(url, retries=3):
    for attempt in range(retries):
        try:
            req = urllib.request.Request(url, headers=HEADERS)
            with urllib.request.urlopen(req, timeout=10) as r:
                return json.loads(r.read().decode("utf-8"))
        except Exception as e:
            if attempt < retries - 1:
                time.sleep(1.5 * (attempt + 1))
            else:
                return None

def parse_silver_from_day(data, date_str):
    """Extract silver tola and 10g prices from a day's API response."""
    if not data or not isinstance(data, list):
        return None
    tola = None
    per_10g = None
    for item in data:
        rate_type = item.get("rateType", "")
        rate = item.get("baseRatePerGram") or item.get("todayBaseRatePerGram")
        if not rate:
            continue
        if "चाँदी" in rate_type or "silver" in rate_type.lower():
            if "तोला" in rate_type or "tola" in rate_type.lower():
                tola = int(rate)
            elif "१०" in rate_type or "10" in rate_type:
                per_10g = int(rate)
    if tola is None:
        return None
    return {
        "date_ad": date_str,
        "tola": tola,
        "per_10g": per_10g,
        "source": "FENEGOSIDA",
        "metal": "silver",
        "verification_status": "verified",
        "source_type": "official_api",
    }

def fetch_day(d_str):
    url = f"{BASE}/api/website/v1/Dashboard/datewisehistory?date={d_str}"
    data = fetch_json(url)
    return parse_silver_from_day(data, d_str)

def date_range(start_date, end_date):
    """Generate all dates from start to end inclusive."""
    current = start_date
    while current <= end_date:
        yield current.isoformat()
        current += timedelta(days=1)

def main():
    # Test a single recent date first
    test_date = "2026-09-25"
    print(f"Testing API with {test_date}...")
    url = f"{BASE}/api/website/v1/Dashboard/datewisehistory?date={test_date}"
    data = fetch_json(url)
    print(f"Response: {json.dumps(data, ensure_ascii=False)[:500] if data else 'FAILED'}")

    if data is None:
        print("API appears to require auth. Trying monthwisehistory...")
        url2 = f"{BASE}/api/website/v1/Dashboard/monthwisehistory?date=2026-09-01"
        data2 = fetch_json(url2)
        print(f"Month response: {json.dumps(data2, ensure_ascii=False)[:500] if data2 else 'FAILED'}")
        return

    print("\nAPI works! Starting full historical scrape...")

    # Scrape from 2022-01-01 to today
    start = date(2022, 1, 1)
    end = date.today()
    all_dates = list(date_range(start, end))
    total = len(all_dates)
    print(f"Total dates to scrape: {total}")

    records = []
    done = 0

    with ThreadPoolExecutor(max_workers=10) as executor:
        futures = {executor.submit(fetch_day, d): d for d in all_dates}
        for future in as_completed(futures):
            result = future.result()
            if result:
                records.append(result)
            done += 1
            if done % 50 == 0:
                print(f"  Progress: {done}/{total} dates processed, {len(records)} silver records found")

    # Sort by date descending
    records.sort(key=lambda r: r["date_ad"], reverse=True)

    output_path = "fenegosida_silver_raw.json"
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(records, f, ensure_ascii=False, indent=2)

    print(f"\nDone! {len(records)} silver records saved to {output_path}")
    if records:
        print(f"Date range: {records[-1]['date_ad']} to {records[0]['date_ad']}")
        print(f"Sample: {records[0]}")

if __name__ == "__main__":
    main()
