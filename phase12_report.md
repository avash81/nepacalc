# PHASE 12 FINAL REPORT

## 1. Frozen Production Baseline
- **JSON rows:** 144
- **CSV rows:** 144
- **Gold:** 72
- **Silver:** 72
- **Unique dates:** 72
- **Expected checksum:** ede5ea177f0157ee
- **Actual checksum:** ede5ea177f0157ee
- **Production changes:** 0
- **Baseline Match:** PASS

## 2. Schema QA
All production records contain the required historical-rate fields with correct data types. No unexpected nulls or invalid categories were found. 
- **Schema QA:** PASS

## 3. Record Identity QA
- **Duplicate logical records:** 0
- **Duplicate source records:** 0
- **Record Identity QA:** PASS

## 4. Gold/Silver Pair QA
- **Dates with both Gold + Silver:** 72
- **Gold-only dates:** 0
- **Silver-only dates:** 0
- **Gold/Silver Pair QA:** PASS

## 5. Date & Day-Name QA
- **Date Validation:** PASS (Valid chronological AD dates, no future dates).
- **Day-Name Validation:** PASS (144/144 records correctly map day_name to the calendar effective_date_ad).

## 6. Price Mathematical Consistency
All records successfully passed the established relationship: price_per_tola ≈ price_per_10g × 1.1664.
Calculated fields correctly mirror price_per_tola_source / 11.664 for gram, and gram * 1000 for kg, respecting reasonable rounding tolerances.
- **Mathematical Consistency:** PASS (144/144)

## 7. Source-Value Integrity
No calculated values have been stored as source values. 
- **Fabricated/mock-pattern records:** 0
- **Source-Value Integrity:** PASS

## 8. Anomaly QA
- **Known production anomalies:** 0
- No negative, impossible, or unsupported values found.

## 9. Source & Provenance QA
- **Official API / PDF records:** 144
- **Secondary-only records (Ashesh, Gahana, etc.):** 0 (Successfully quarantined out of production).
- **Provenance QA:** PASS

## 10. Verification-Status QA
All 144 records carry a erified status backed by primary sources.

## 11. Coverage QA
**Verified date ranges in production:**
- 2024-06-02 → 2024-06-07 (6 unique dates, 12 rows, official_weekly_pdf)
- 2025-03-02 → 2025-03-07 (6 unique dates, 12 rows, official_weekly_pdf)
- 2026-06-07 → 2026-06-12 (6 unique dates, 12 rows, official_weekly_pdf)
- 2026-07-23 → 2026-09-25 (54 unique dates, 108 rows, fenegosida_api)

**Explicit Unresolved Primary-Source Gaps:**
- 2024-06-08 → 2025-03-01
- 2025-03-08 → 2026-06-06 (includes the inaccessible BS 2082 PDF periods)
- 2026-06-13 → 2026-07-22

The dataset is explicitly a **PARTIALLY RECOVERED HISTORICAL DATASET — PRIMARY-SOURCE GAPS REMAIN**.

## 12. Checksum / JSON / CSV Parity
- **JSON/CSV Parity:** PASS (144 identical logical records).
- **Final canonical checksum:** ede5ea177f0157ee

## 13. Sorting, Null/Zero, Unit, & Metal Terminology QA
- Deterministic sorting (date_ad asc) confirmed.
- No nulls, zero source prices, or negative prices present.
- Source units (10g, tola) and calculated units (gram, kg) perfectly segregated and preserved.
- Source metal terminology preserved exactly.

## 14. Output Files Created
- phase12_final_dataset_qa.json
- phase12_final_dataset_qa.csv

## 15. Final Status
**PHASE 12 STATUS: PASS — DATASET READY FOR HISTORICAL PAGE IMPLEMENTATION**
