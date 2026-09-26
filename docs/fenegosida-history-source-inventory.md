# FENEGOSIDA Historical Source Inventory
**Last Updated:** 2026-09-26
**Maintained by:** NepaCalc Phase 11 Archive Recovery
**Purpose:** Audit trail of all investigated official FENEGOSIDA historical source documents.

---

## Inventory Status Legend
- MERGED — In current production dataset
- CANDIDATE — Validated, awaiting merge authorization
- QUARANTINED — Discovered but not validated / requires manual review
- LEAD_ONLY — Secondary source; underlying official document not yet confirmed
- INVALID — Not a relevant rate document

---

## Official Documents — MERGED (Production)

| Doc ID | Filename | URL | BS Period | AD Period | Discovery Method | Math Check | Date Check | Status |
|---|---|---|---|---|---|---|---|---|
| FEN-WEEKLY-2081-02-25 | 240607055120g6k5q8.pdf | https://www.fenegosida.org/uploads/weekly/240607055120g6k5q8.pdf | 2081/02/20-25 | 2024-06-02 to 2024-06-07 | User-supplied | PASS | PASS | MERGED |
| FEN-WEEKLY-2081-11-23 | 250307092202jj587f.pdf | https://www.fenegosida.org/uploads/weekly/250307092202jj587f.pdf | 2081/11/18-23 | 2025-03-02 to 2025-03-07 | User-supplied | PASS | PASS | MERGED |
| FEN-WEEKLY-2082-05-13 | 2508291059454hy78y.pdf | https://www.fenegosida.org/uploads/weekly/2508291059454hy78y.pdf | 2082/05/08-13 | 2025-08-24 to 2025-08-29 | User-supplied (Phase 10A) | PASS | PASS | MERGED |
| FEN-WEEKLY-2082-09-18 | 2601020304005r106s.pdf | https://www.fenegosida.org/uploads/weekly/2601020304005r106s.pdf | 2082/09/13-18 | 2025-12-28 to 2026-01-02 | User-supplied (Phase 10A) | PASS | PASS | MERGED |
| FEN-WEEKLY-2082-10-09 | 260123044935ehtkpy.pdf | https://www.fenegosida.org/uploads/weekly/260123044935ehtkpy.pdf | 2082/10/04-09 | 2026-01-18 to 2026-01-23 | User-supplied (Phase 10A) | PASS | PASS | MERGED |
| FEN-WEEKLY-2082-11-08 | 26022008145339a745.pdf | https://www.fenegosida.org/uploads/weekly/26022008145339a745.pdf | 2082/11/03-08 | 2026-02-15 to 2026-02-20 | User-supplied (Phase 10A) | PASS | PASS | MERGED |
| FEN-WEEKLY-2083-02-29 | 260612100156q9yz49.pdf | https://www.fenegosida.org/uploads/weekly/260612100156q9yz49.pdf | 2083/02/24-29 | 2026-06-07 to 2026-06-12 | User-supplied (Phase 10A) | PASS | PASS | MERGED |
| FEN-API-2026-08-31 to FEN-API-2026-09-25 | (API) | https://api.fenegosida.org/api/website/v1/Dashboard/monthwisehistory | 2083/05/15-09 | 2026-08-31 to 2026-09-25 | API | PASS | PASS | MERGED |

---

## Archive Discovery Findings — Phase 11

### Method A: Search-Engine Queries
| Query | Result |
|---|---|
| site:fenegosida.org/uploads/weekly 2083 | No indexed results |
| site:fenegosida.org "2083" "Gold Per 10g" | No results |
| "fenegosida.org/uploads/weekly" filetype:pdf 2083 | No results |
| "fenegosida.org/uploads/weekly" 2082 gold silver chart | No indexed PDF URLs returned |

**Finding:** Google's search index does not expose the /uploads/weekly/ directory. The absence of results is a known indexing limitation, not proof of absence.

### Method B: Official Site Structure
- /uploads/weekly/ directory indexing: DISABLED (no file listing)
- Frontend: React SPA — PDF links loaded dynamically, not in static HTML
- /history page: Accessible, but links rendered by JavaScript fetch
- Authentication: Some API endpoints return HTTP 401 (not publicly accessible without credentials)

### Method C: FENEGOSIDA API Coverage
| Endpoint | Response |
|---|---|
| monthwisehistory?date=2083-01 | 204 No Content (no data) |
| monthwisehistory?date=2083-02 | 204 No Content (no data) |
| monthwisehistory?date=2083-03 | 204 No Content (no data) |
| monthwisehistory?date=2083-04 | 204 No Content (no data) |
| monthwisehistory?date=2082-01 | 204 No Content (no data) |
| monthwisehistory?date=2082-06 | 204 No Content (no data) |
| monthwisehistory?date=2082-12 | 204 No Content (no data) |
| WeeklyReportList | HTTP 401 (requires auth) |
| WeeklyReport | HTTP 401 |
| HistoryList | HTTP 401 |
| DailyRateList | HTTP 401 |
| monthwisereport | HTTP 401 |

**API Coverage Boundary:** The public /monthwisehistory API only serves data beginning approx. July 2026 (BS 2083/04+). All earlier periods return 204.

### Method D: Filename Pattern Analysis
| Component | Pattern |
|---|---|
| Format | <YY><MM><DD><HH><MM><SS><random-8-char-suffix>.pdf |
| Date encoded | SERVER UPLOAD DATE (AD), not the BS period covered |
| Randomness | 8-character alphanumeric suffix after the timestamp |
| Predictability | NOT deterministic — suffix is random |

**Conclusion:** Brute-force filename guessing is not feasible. The 8-char random suffix prevents systematic enumeration. Discovery must use external evidence (search engine, user URLs, site scraping with Playwright).

### Method E: Secondary Sources as Leads
- ashesh.com.np, hamroshare.com.np, nepsealpha.com, notifynepal.com — provide aggregated historical data attributed to FENEGOSIDA
- These are Tier 2/3 sources — valid as discovery leads; NOT production-safe without official FENEGOSIDA source confirmation
- Specific URLs not followed further pending Phase 11B/11C

---

## Known Gaps (Not Yet Filled)
| Gap Period (AD) | Gap Period (BS approx.) | Status |
|---|---|---|
| 2024-06-08 to 2025-03-01 | 2081/02/26 to 2081/11/17 | NO VERIFIED SOURCE FOUND |
| 2025-03-08 to 2025-08-23 | 2081/11/24 to 2082/05/07 | NO VERIFIED SOURCE FOUND |
| 2025-08-30 to 2025-12-27 | 2082/05/14 to 2082/09/12 | NO VERIFIED SOURCE FOUND |
| 2026-01-03 to 2026-01-17 | 2082/09/19 to 2082/10/03 | NO VERIFIED SOURCE FOUND |
| 2026-01-24 to 2026-02-14 | 2082/10/10 to 2082/11/02 | NO VERIFIED SOURCE FOUND |
| 2026-02-21 to 2026-06-06 | 2082/11/09 to 2083/02/23 | NO VERIFIED SOURCE FOUND |
| 2026-06-13 to 2026-08-30 | 2083/02/30 to 2083/05/14 | NO VERIFIED SOURCE FOUND |
| Within 2026-09 API seed | (weekend/holiday gaps) | EXPECTED — Trading days only |

---

## Important Archive Boundary Statements
1. Absence from Google Search does NOT mean absence from FENEGOSIDA archive.
2. API 204 responses do NOT mean no weekly PDF exists for that period.
3. Older PDFs do exist (confirmed for 2081, 2082, 2083) — but URLs cannot be systematically enumerated without JS-rendered site traversal or user-supplied document links.
4. The current 130-row production dataset covers 8 verified date windows, not a continuous range.
