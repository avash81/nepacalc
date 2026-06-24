import Link from 'next/link';
import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "KUKL Water Bill Calculator Nepal (FY 2083/84) | Kathmandu Water Bill Calculator",
  description: "Calculate your KUKL water bill online using the latest Kathmandu water tariff rates. Includes sewerage charges, minimum billing, and connection-size calculations.",
  slug: 'kukl-bill',
  canonical: 'https://nepacalc.com/calculator/kukl-bill/',
  keywords: [
    "kukl bill calculator", "kukl water bill calculator", "water bill calculator nepal", 
    "calculate water bill nepal", "how to calculate water bill in nepal", 
    "water bill formula nepal", "kukl water rate", "kukl tariff rate", 
    "water bill per unit in nepal", "1 unit water in litres in nepal", 
    "1 unit water = 1000 litres", "how much is 1 unit water", 
    "water bill payment nepal", "kukl online payment", "how to pay water bill online", 
    "how to check water bill online", "water bill check nepal"
  ]
});

const customSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": "https://nepacalc.com/calculator/kukl-bill/#webapp",
      "name": "KUKL Water Bill Calculator",
      "url": "https://nepacalc.com/calculator/kukl-bill/",
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "All",
      "description": "Calculate KUKL and NWSC water bills based on official tariff matrices, pipe sizes, and mandatory sewerage taxes."
    },
    {
      "@type": "HowTo",
      "@id": "https://nepacalc.com/calculator/kukl-bill/#howto",
      "name": "How to calculate a KUKL water bill",
      "description": "Step-by-step guide to calculating water utility charges in the Kathmandu Valley.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Identify Connection Size",
          "text": "Determine your water pipe connection size, typically 0.5 inches for standard residential taps."
        },
        {
          "@type": "HowToStep",
          "name": "Calculate Base Water Charge",
          "text": "Apply the fixed minimum charge for the first 10,000 liters (10 units), then multiply any additional units consumed by the variable excess rate."
        },
        {
          "@type": "HowToStep",
          "name": "Add Sewerage Charge",
          "text": "Calculate 50% of the total water charge and add it to the subtotal. This is the mandatory sewerage tax applied to all properties."
        }
      ]
    },
    {
      "@type": "FAQPage",
      "@id": "https://nepacalc.com/calculator/kukl-bill/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How is a water bill calculated in Nepal?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A water bill in Nepal is calculated by adding the net water consumption charge to a mandatory sewerage fee. The consumption charge consists of a fixed pipeline fee for baseline allocation plus an additional per-unit rate for any excess water used. A 50% wastewater surcharge is then applied to that combined subtotal."
          }
        },
        {
          "@type": "Question",
          "name": "What is 1 unit of water in litres?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Exactly 1 unit of water equals 1,000 litres. This metric aligns with 1 cubic meter of volumetric water flow passing through your property's physical utility meter."
          }
        },
        {
          "@type": "Question",
          "name": "What is the KUKL sewerage charge?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The sewerage charge is a public utility assessment equal to exactly 50% of your total monthly water consumption charge. It is automatically collected by KUKL to fund the construction and processing operations of wastewater management systems across the Kathmandu Valley."
          }
        },
        {
          "@type": "Question",
          "name": "What are the latest KUKL water rates?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Tariff rates are updated each fiscal year by KUKL. For the current rates, enter your pipe size and units into the calculator above — it applies the latest official tariff automatically so you always get an accurate result."
          }
        },
        {
          "@type": "Question",
          "name": "What is the minimum KUKL bill?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "There is a mandatory minimum monthly charge even if you use zero water. The exact amount depends on your pipe connection size (0.5-inch or 0.75-inch). Use the calculator above and enter 0 units to see the minimum payable for your connection."
          }
        }
      ]
    }
  ]
};

export default function Page() {
  return (
    <div className="bg-[#F1F3F4] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(customSchema) }}
      />
      
      <>
      <Calculator />
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <p className="p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg text-slate-700"><strong>Also useful:</strong> Beyond utility bills, annual income tax is one of the most important financial obligations for Kathmandu residents. Use the <Link href="/calculator/nepal-income-tax/" className="text-blue-600 hover:underline">Nepal Income Tax Calculator</Link> to estimate your FY 2083/84 tax liability.</p>
      </div>
    </>
    </div>
  );
}
