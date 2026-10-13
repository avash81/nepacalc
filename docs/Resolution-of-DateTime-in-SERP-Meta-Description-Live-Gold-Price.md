# Resolution of Date/Time in SERP Meta Description for Live Gold Price

**Document:** Technical & SEO Resolution Report  
**Target URL:** `https://nepacalc.com/market-rates/live-gold-price/`  
**File Modified:** `src/app/market-rates/live-gold-price/page.tsx`  
**Git Commits:** `49cab7011c`, `efe54dc3bd`  
**Status:** Verified, Built (`exit 0`), and Deployed to `origin/main`  
**Date:** October 13, 2026  

---

## 1. Problem Statement
In Google search results for queries such as `"gold price in nepal"`, the search snippet was displaying an unwanted relative timestamp prefix (e.g., `3 days ago — ...`) before the meta description text:

> `3 days ago — Check today's live gold price in Nepal. Get official FENEGOSIDA rates for 24K Hallmark and 22K Tejabi gold per tola and 10 grams.`

When official FENEGOSIDA rates remained unchanged over holidays, weekends, or trading pauses, this caused the page to appear outdated to users, despite the rates being accurate and current.

---

## 2. Research & Root-Cause Analysis

### A. Google Search Central Guidelines Review
According to Google's official documentation (*"Add a Byline Date to Google Search Results"*):
1. **Algorithmic Insertion**: Google's crawlers automatically append a byline date if they detect that the page represents time-sensitive content or an editorial article.
2. **Signals Google Uses to Extract Snippet Dates**:
   - Structured Data (`@type: Article`, `datePublished`, `dateModified`).
   - OpenGraph article metadata (`article:published_time`, `article:modified_time`).
   - Prominent on-page publication or update bylines.
3. **No Direct Meta Tag to Hide Dates**: There is no `no-date` meta tag. To prevent Google from adding a date prefix, the page must eliminate article-level date signals and present itself as an evergreen data tool or web application.

### B. What Was Present in NepaCalc's Source Code
Three specific code patterns were signaling to Googlebot that the page was a dated article:

1. **`openGraph.type` set to `'article'`**:
   ```typescript
   // BEFORE:
   openGraph: {
     type: 'article',
     publishedTime: '2026-04-21T02:48:38+05:45',
     modifiedTime: new Date(getLiveData().date).toISOString()
   }
   ```
2. **`Article` Schema Object in `JsonLd`**:
   ```typescript
   // BEFORE:
   article: {
     url: "https://nepacalc.com/market-rates/live-gold-price/",
     headline: "Gold Price in Nepal Today (आजको सुनको भाउ)",
     datePublished: "2026-04-21T02:48:38+05:45",
     dateModified: new Date(rawDate).toISOString(),
   }
   ```
3. **`dateModified` inside `Dataset` Schema**:
   ```typescript
   // BEFORE:
   "@type": "Dataset",
   "dateModified": new Date(rawDate).toISOString()
   ```

---

## 3. Implemented Fix

The page was restructured to be classified as a **live web tool / financial utility** rather than an editorial article:

### 1. Switched OpenGraph from Article to Website
```typescript
// AFTER:
openGraph: {
  title: "Gold Price in Nepal Today | Live FENEGOSIDA Rate",
  description,
  url: 'https://nepacalc.com/market-rates/live-gold-price/',
  siteName: 'NepaCalc',
  images: [{ url: 'https://nepacalc.com/images/og/gold-price-nepal.jpg', width: 1200, height: 630, alt: 'Gold Price in Nepal Today - Live FENEGOSIDA Rate | NepaCalc' }],
  type: 'website',
}
```
*Removed `publishedTime` and `modifiedTime`.*

### 2. Removed `Article` Schema from JSON-LD
The `article` property was removed from the `JsonLd` unified graph, keeping only:
- **`WebPage`**: Declares page structure without an editorial publication date.
- **`BreadcrumbList`**: Preserves navigational hierarchy.
- **`FAQPage`**: Powers rich FAQ snippets in search results.
- **`SpeakableSpecification`**: Retains eligibility for voice assistant queries.

### 3. Removed `dateModified` from `Dataset` Schema
```typescript
// AFTER:
{
  "@context": "https://schema.org",
  "@type": "Dataset",
  "@id": "https://nepacalc.com/market-rates/live-gold-price/#dataset",
  "name": "Live Gold Price in Nepal — FENEGOSIDA Daily Rates",
  "description": "Official daily gold and silver prices in Nepal published by FENEGOSIDA. Includes 24K Hallmark, 22K Tejabi gold rates and silver rates per Tola and per 10 grams.",
  "url": "https://nepacalc.com/market-rates/live-gold-price/",
  "creator": { "@type": "Organization", "name": "NepaCalc", "url": "https://nepacalc.com" },
  "isAccessibleForFree": true,
  "inLanguage": "en",
  "license": "https://creativecommons.org/licenses/by/4.0/",
  "variableMeasured": ["Gold Price 24K per Tola NPR", "Gold Price 22K per Tola NPR", "Silver Price per Tola NPR", "Gold Price per 10g NPR"],
  "measurementTechnique": "Official FENEGOSIDA benchmark rate published daily",
  "hasPart": [...]
}
```

---

## 4. Verification Results

| Check | Expected | Actual |
| :--- | :--- | :--- |
| `dateModified` in `live-gold-price` | 0 instances | **0 found** |
| `datePublished` in `live-gold-price` | 0 instances | **0 found** |
| `publishedTime` in `live-gold-price` | 0 instances | **0 found** |
| `modifiedTime` in `live-gold-price` | 0 instances | **0 found** |
| `openGraph.type` | `'website'` | **`'website'`** |
| TypeScript check (`tsc`) | 0 errors | **0 errors** |
| Full production build (`npm run build`) | Exit code 0 | **Exit code 0** |
| On-page content & UI | Untouched | **100% Intact** |

---

## 5. Expected Outcome
With all article-related timestamps and metadata removed:
1. Google's snippet parser will treat the page like competitor rate portals (e.g., `goldrate.com`), displaying the meta description cleanly without a relative date prefix (`3 days ago —`).
2. Search appearance will remain consistent across weekends, holidays, and periods when market rates do not change.
