import type { Metadata } from "next";
import BulkCalculator from "./BulkCalculator";
import { BulkNepaliDateSeoContent } from "@/components/calculator/BulkNepaliDateSeoContent";
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Bulk AD/BS Date Converter | NepaCalc",
  description: "Convert multiple Nepali BS dates to AD or AD dates to BS with our free bulk date converter. Fast, accurate, and easy for Excel and CSV data.",
  alternates: {
    canonical: "https://nepacalc.com/calculator/nepali-date/bulk/",
  },
  robots: "index, follow",
  openGraph: {
    title: "Bulk AD/BS Date Converter | NepaCalc",
    description: "Convert multiple Nepali BS dates to AD or AD dates to BS with our free bulk date converter. Fast, accurate, and easy for Excel and CSV data.",
    url: "https://nepacalc.com/calculator/nepali-date/bulk/",
    siteName: "NepaCalc",
    images: [
      {
        url: "https://nepacalc.com/images/og/default-og.png",
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
    title: "Bulk AD/BS Date Converter | NepaCalc",
    description: "Convert multiple BS and AD dates instantly with NepaCalc's free bulk Nepali date converter.",
    images: ["https://nepacalc.com/images/og/default-og.png"],
  },
};

const bulkSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://nepacalc.com/calculator/nepali-date/bulk/#webpage",
      "url": "https://nepacalc.com/calculator/nepali-date/bulk/",
      "name": "Bulk AD/BS Date Converter | NepaCalc",
      "description": "Convert multiple Nepali BS dates to AD or AD dates to BS with our free bulk date converter. Fast, accurate, and easy for Excel and CSV data.",
      "inLanguage": "en-NP",
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
      <div className="max-w-[1280px] mx-auto px-4 pt-0 pb-10">
        <BulkNepaliDateSeoContent />
        <div className="mt-6 mb-4 p-4 bg-white border border-[#DADCE0] rounded-lg text-sm text-[#5F6368]">
          Need to convert a single date? Use the{" "}
          <Link href="/calculator/nepali-date/" className="text-[#1A73E8] underline hover:no-underline font-semibold">
            Nepali Date Converter
          </Link>.
        </div>
      </div>
    </div>
  );
}

