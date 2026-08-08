import type { Metadata } from "next";
import BulkCalculator from "./BulkCalculator";

export const metadata: Metadata = {
  title: "Bulk Nepali Date Converter (BS ⇄ AD) – Convert Multiple Dates",
  description: "Convert multiple Nepali BS dates to AD or AD dates to BS at once with our free bulk Nepali date converter. Fast, accurate and easy for lists, Excel and CSV data.",
  alternates: {
    canonical: "https://nepacalc.com/calculator/nepali-date/bulk/",
  },
  openGraph: {
    title: "Bulk Nepali Date Converter (BS ⇄ AD)",
    description: "Convert multiple Nepali BS and AD dates at once with our free bulk date converter.",
    url: "https://nepacalc.com/calculator/nepali-date/bulk/",
    siteName: "NepaCalc",
    images: [
      {
        url: "https://nepacalc.com/images/og/bulk-date.png",
        width: 1200,
        height: 630,
        alt: "Bulk Nepali Date Converter",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bulk Nepali Date Converter (BS ⇄ AD)",
    description: "Convert multiple BS and AD dates instantly with NepaCalc's free bulk Nepali date converter.",
    images: ["https://nepacalc.com/images/og/bulk-date.png"],
  },
};

const bulkSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": "https://nepacalc.com/calculator/nepali-date/bulk/#webapp",
      "name": "Nepali Date Bulk Converter",
      "url": "https://nepacalc.com/calculator/nepali-date/bulk/",
      "description": "Convert many AD/BS dates at once by pasting a list, uploading an Excel or CSV file, or picking dates from a full-year Nepali or English calendar.",
      "applicationCategory": "UtilitiesApplication",
      "operatingSystem": "Any (web browser)",
      "browserRequirements": "Requires JavaScript",
      "isAccessibleForFree": true,
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "featureList": [
        "Bulk paste conversion, up to 100,000 dates",
        "Multi-column Excel paste detection",
        "File upload with automatic date-column detection (.xlsx, .csv)",
        "Full-year AD and BS calendar picker",
        "Per-column and full-table copy to clipboard",
        "Download results as .xlsx or .csv"
      ],
      "inLanguage": ["en", "ne"],
      "publisher": { "@id": "https://nepacalc.com/#organization" },
      "isPartOf": { "@id": "https://nepacalc.com/#website" }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://nepacalc.com/" },
        { "@type": "ListItem", "position": 2, "name": "Calculators", "item": "https://nepacalc.com/calculators/" },
        { "@type": "ListItem", "position": 3, "name": "Nepali Date", "item": "https://nepacalc.com/calculator/nepali-date/" },
        { "@type": "ListItem", "position": 4, "name": "Bulk Convert" }
      ]
    }
  ]
};

export default function BulkNepaliDatePage() {
  return (
    <div className="bg-[#F1F3F4]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bulkSchema) }}
      />
      <BulkCalculator />
    </div>
  );
}
