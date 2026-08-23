import Calculator from './Calculator';
export const metadata = {
  title: "BS to AD & AD to BS Date Converter | NepaCalc",
  description: "Convert BS to AD and AD to BS with NepaCalc's free Nepali date converter. Get fast, accurate date conversions online.",
  alternates: {
    canonical: "https://nepacalc.com/calculator/nepali-date/",
  },
  robots: "index,follow",
  openGraph: {
    title: "BS to AD & AD to BS Date Converter | NepaCalc",
    description: "Convert BS to AD and AD to BS with NepaCalc's free Nepali date converter. Get fast, accurate date conversions online.",
    url: "https://nepacalc.com/calculator/nepali-date/",
    type: "website",
    siteName: "NepaCalc",
    images: [{ url: "https://nepacalc.com/images/og/default-og.png" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "BS to AD & AD to BS Date Converter | NepaCalc",
    description: "Convert BS to AD and AD to BS with NepaCalc's free Nepali date converter. Get fast, accurate date conversions online.",
    images: ["https://nepacalc.com/images/og/default-og.png"]
  }
};
const singleSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://nepacalc.com/calculator/nepali-date/#webpage",
      "url": "https://nepacalc.com/calculator/nepali-date/",
      "name": "BS to AD & AD to BS Date Converter | NepaCalc",
      "description": "Convert BS to AD and AD to BS with NepaCalc's free Nepali date converter. Get fast, accurate date conversions online.",
      "inLanguage": "en-NP",
      "isPartOf": { "@id": "https://nepacalc.com/#website" }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://nepacalc.com/" },
        { "@type": "ListItem", "position": 2, "name": "Calculators", "item": "https://nepacalc.com/calculators/" },
        { "@type": "ListItem", "position": 3, "name": "Nepali Date Converter", "item": "https://nepacalc.com/calculator/nepali-date/" }
      ]
    }
  ]
};

export default function Page() {
  return (
    <div className="bg-[#F1F3F4]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(singleSchema) }}
      />
      <Calculator />
    </div>
  );
}

