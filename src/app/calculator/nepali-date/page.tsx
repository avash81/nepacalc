import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
export const metadata = calcMeta({
  title: "Nepali Date Converter | AD to BS & BS to AD NepaCalc",
  description: "Accurate Gregorian (AD) to Bikram Sambat (BS) date converter. Syncs directly with Nepal Panchanga for accurate days, months, and leap years.",
  slug: 'nepali-date',
  keywords: ["nepali date converter", "ad to bs converter", "bs to ad converter", "english to nepali date", "bikram sambat calculator", "nepali calendar converter"],
});
const singleSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": "https://nepacalc.com/calculator/nepali-date/#webapp",
      "name": "Nepali Date Converter",
      "url": "https://nepacalc.com/calculator/nepali-date/",
      "description": "Convert a single date between the English (AD/Gregorian) calendar and the Nepali (BS/Bikram Sambat) calendar, instantly and free.",
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
        "AD to BS date conversion",
        "BS to AD date conversion",
        "Today's date in both calendars",
        "Nepali weekday name display"
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
        { "@type": "ListItem", "position": 3, "name": "Nepali Date" }
      ]
    },
    {
      "@type": "DefinedTerm",
      "name": "Bikram Sambat",
      "alternateName": "BS calendar",
      "description": "The official Hindu lunisolar calendar of Nepal, currently around 56-57 years ahead of the Gregorian (AD) calendar.",
      "inDefinedTermSet": "https://nepacalc.com/calculator/nepali-date/"
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

