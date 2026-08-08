import type { Metadata } from "next";
import BulkCalculator from "./BulkCalculator";
import { BulkNepaliDateSeoContent } from "@/components/calculator/BulkNepaliDateSeoContent";
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Bulk Nepali Date Converter BS to AD Convert Multiple Dates",
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-0 pb-10">
        <BulkNepaliDateSeoContent />
        
        {/* Related Calculators */}
        <div className="mt-8 mb-6">
          <h2 className="text-xl font-bold text-[#202124] mb-4 font-serif">Related Calculators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Link href="/calculator/nea-bill/" className="bg-white border border-[#e4e7ef] rounded-xl p-4 hover:border-blue-600 hover:shadow-sm transition-all group">
              <div className="font-semibold text-[#0f1729] mb-1 group-hover:text-blue-600">Electricity Bill</div>
              <div className="text-[13px] text-slate-500 line-clamp-2">Calculate Nepal Electricity Authority (NEA) billing and unit slabs.</div>
            </Link>
            <Link href="/calculator/nepal-vehicle-tax/" className="bg-white border border-[#e4e7ef] rounded-xl p-4 hover:border-blue-600 hover:shadow-sm transition-all group">
              <div className="font-semibold text-[#0f1729] mb-1 group-hover:text-blue-600">Vehicle Tax</div>
              <div className="text-[13px] text-slate-500 line-clamp-2">Calculate road tax and bluebook renewal fees for vehicles in Nepal.</div>
            </Link>
            <Link href="/calculator/kukl-bill/" className="bg-white border border-[#e4e7ef] rounded-xl p-4 hover:border-blue-600 hover:shadow-sm transition-all group">
              <div className="font-semibold text-[#0f1729] mb-1 group-hover:text-blue-600">KUKL Water Bill</div>
              <div className="text-[13px] text-slate-500 line-clamp-2">Calculate Kathmandu Upatyaka Khanepani Limited bill and sewerage tax.</div>
            </Link>
          </div>
        </div>


      </div>
    </div>
  );
}

