# PHASE 11D-M FINAL REPORT

## 1. Baseline Verification
- **JSON rows:** 144
- **CSV rows:** 144
- **Gold:** 72
- **Silver:** 72
- **Unique dates:** 72
- **Production checksum:** ede5ea177f0157ee
- **Anomalies/conflicts/duplicates:** 0
- **Verification:** PASS

## 2. Input Processing
- Loaded canonical baseline JSON/CSV
- Loaded phase11d_secondary_gap_map.json/.csv
- Candidate records evaluated: 5 mapped historical dates (representing both Gold and Silver)

## 3. Source Classification & Controlled Eligibility
- **CLASS A (Officially verified):** 0
- **CLASS B (Official reference identified but content inaccessible):** 2 (BS 2082 periods tied to quarantined PDFs) -> QUARANTINED_CLASS_B
- **CLASS C (Secondary source only):** 3 (BS 2081 periods sourced strictly from aggregators) -> QUARANTINED_CLASS_C
- **CLASS D (Invalid / unreliable):** 0
- **Merge-eligible records:** 0

## 4. Disposition Actions
- Merged count: 0
- Quarantined count: 5 dates (10 individual metal records)
- Rejected count: 0
- Created phase11dm_controlled_merge_report.json
- Created phase11dm_controlled_merge_report.csv detailing the disposition and reason for each record

## 5. Post-Merge Audit
- **Rows:** 144
- **Gold:** 72
- **Silver:** 72
- **Unique dates:** 72
- **Checksum:** ede5ea177f0157ee
- **Production changes:** 0
- **Fabricated values:** 0

## 6. Final Status
**PHASE 11D-M STATUS: CLOSED — NO ELIGIBLE OFFICIAL RECORDS**

The historical dataset explicitly remains at 144 verified primary-source rows. The dataset is accurately classified as a **PARTIALLY RECOVERED HISTORICAL DATASET — PRIMARY-SOURCE GAPS REMAIN**.
