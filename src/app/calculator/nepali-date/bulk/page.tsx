import type { Metadata } from "next";
import BulkCalculator from "./BulkCalculator";

export const metadata: Metadata = {
  title: "Bulk Nepali Date Converter | Batch AD to BS & BS to AD | NepaCalc",
  description: "Convert thousands of Nepali dates at once. Paste from Excel or upload a file. Auto-detect AD/BS formats. Free bulk date converter for Nepal.",
  alternates: {
    canonical: "https://nepacalc.com/calculator/nepali-date/bulk/",
  },
  openGraph: {
    title: "Bulk Nepali Date Converter | Batch AD to BS & BS to AD",
    description: "Convert thousands of Nepali dates at once. Paste from Excel or upload a file. Auto-detect AD/BS formats.",
    url: "https://nepacalc.com/calculator/nepali-date/bulk/",
    siteName: "NepaCalc",
    images: [
      {
        url: "https://nepacalc.com/images/og/bulk-date.png", // Assuming an image exists, fallback is fine for now
        width: 1200,
        height: 630,
        alt: "Bulk Nepali Date Converter",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function BulkNepaliDatePage() {
  return (
    <div className="bg-[#F1F3F4]">
      <BulkCalculator />
    </div>
  );
}
