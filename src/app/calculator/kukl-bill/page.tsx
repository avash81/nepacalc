import { Viewport } from 'next';
import Link from 'next/link';
import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "KUKL Water Bill Calculator Nepal | Calculate Water Charges Online",
  description: "Calculate your KUKL water bill using official Kathmandu Upatyaka Khanepani Limited tariff rates. Estimate water charges, sewerage charges, minimum bills, and monthly water costs based on your meter reading and pipe size.",
  slug: 'kukl-bill',
  canonical: 'https://nepacalc.com/calculator/kukl-bill/',
  ogImage: 'https://nepacalc.com/images/calculators/kukl-og-image.jpg',
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

export const viewport: Viewport = {
  themeColor: '#0F766E',
  width: 'device-width',
  initialScale: 1,
};

const customSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://nepacalc.com/#organization",
      "name": "NepaCalc",
      "url": "https://nepacalc.com/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://nepacalc.com/logo.png"
      },
      "sameAs": [
        "https://www.facebook.com/nepacalc"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://nepacalc.com/#website",
      "url": "https://nepacalc.com/",
      "name": "NepaCalc",
      "publisher": {
        "@id": "https://nepacalc.com/#organization"
      },
      "inLanguage": "en-NP"
    },
    {
      "@type": "WebPage",
      "@id": "https://nepacalc.com/calculator/kukl-bill/#webpage",
      "url": "https://nepacalc.com/calculator/kukl-bill/",
      "name": "KUKL Water Bill Calculator",
      "description": "Calculate your KUKL water bill using official Kathmandu Upatyaka Khanepani Limited tariff rates. Estimate water charges, sewerage charges, minimum bills, and monthly water costs based on your meter reading and pipe size.",
      "isPartOf": {
        "@id": "https://nepacalc.com/#website"
      },
      "about": {
        "@id": "https://nepacalc.com/#organization"
      },
      "primaryImageOfPage": {
        "@type": "ImageObject",
        "url": "https://nepacalc.com/images/kukl-water-bill-calculator.webp"
      },
      "breadcrumb": {
        "@id": "https://nepacalc.com/calculator/kukl-bill/#breadcrumb"
      },
      "mainEntity": {
        "@id": "https://nepacalc.com/calculator/kukl-bill/#calculator"
      },
      "inLanguage": "en-NP"
    },
    {
      "@type": "Article",
      "@id": "https://nepacalc.com/calculator/kukl-bill/#article",
      "headline": "KUKL Water Bill Calculator: Official Tariff Guide, Water Charges and Bill Calculation",
      "description": "Learn how KUKL water bills are calculated using official Kathmandu Upatyaka Khanepani Limited tariff rates. Understand water charges, sewerage charges, meter readings, pipe sizes, minimum billing, and estimate your monthly bill with the NepaCalc KUKL Water Bill Calculator.",
      "articleSection": [
        "Water Bill Calculation",
        "Official KUKL Tariff Rates",
        "Meter Reading Guide",
        "Water Units",
        "Pipe Size Charges",
        "Online Bill Payment",
        "Water Quality Standards",
        "Frequently Asked Questions"
      ],
      "keywords": [
        "KUKL Water Bill Calculator",
        "Water Bill Calculator Nepal",
        "KUKL Tariff",
        "Water Charges Nepal",
        "Kathmandu Water Bill",
        "1 Unit Water in Litres",
        "Water Meter Reading",
        "KUKL Bill",
        "Sewerage Charge",
        "Pipe Size Tariff"
      ],
      "author": {
        "@type": "Organization",
        "@id": "https://nepacalc.com/#organization"
      },
      "publisher": {
        "@id": "https://nepacalc.com/#organization"
      },
      "mainEntityOfPage": {
        "@id": "https://nepacalc.com/calculator/kukl-bill/#webpage"
      },
      "image": {
        "@type": "ImageObject",
        "url": "https://nepacalc.com/images/kukl-water-bill-calculator.webp",
        "width": 1200,
        "height": 630
      },
      "datePublished": "2026-07-01",
      "dateModified": "2026-07-25",
      "inLanguage": "en-NP",
      "isAccessibleForFree": true,
      "about": [
        {
          "@type": "Thing",
          "name": "Kathmandu Upatyaka Khanepani Limited"
        },
        {
          "@type": "Thing",
          "name": "Water Tariff"
        },
        {
          "@type": "Thing",
          "name": "Water Meter"
        },
        {
          "@type": "Thing",
          "name": "Sewerage Charge"
        },
        {
          "@type": "Thing",
          "name": "Kathmandu Valley"
        }
      ]
    },
    {
      "@type": "WebApplication",
      "@id": "https://nepacalc.com/calculator/kukl-bill/#calculator",
      "name": "KUKL Water Bill Calculator",
      "alternateName": [
        "Kathmandu Water Bill Calculator",
        "Water Bill Calculator Nepal",
        "KUKL Bill Calculator"
      ],
      "url": "https://nepacalc.com/calculator/kukl-bill/",
      "applicationCategory": "FinanceApplication",
      "applicationSubCategory": "Utility Bill Calculator",
      "operatingSystem": "Any",
      "browserRequirements": "Requires JavaScript. Works in all modern web browsers.",
      "softwareVersion": "1.0",
      "isAccessibleForFree": true,
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "NPR",
        "availability": "https://schema.org/InStock"
      },
      "creator": {
        "@id": "https://nepacalc.com/#organization"
      },
      "publisher": {
        "@id": "https://nepacalc.com/#organization"
      },
      "about": [
        {
          "@type": "Thing",
          "name": "Kathmandu Upatyaka Khanepani Limited (KUKL)"
        },
        {
          "@type": "Thing",
          "name": "Water Tariff"
        },
        {
          "@type": "Thing",
          "name": "Water Meter"
        },
        {
          "@type": "Thing",
          "name": "Sewerage Charge"
        },
        {
          "@type": "Thing",
          "name": "Utility Bill"
        }
      ],
      "featureList": [
        "Official KUKL tariff calculation",
        "Metered water bill calculation",
        "Official pipe size support",
        "Automatic sewerage charge calculation",
        "Water charge breakdown",
        "Monthly bill estimation",
        "Official tariff table reference",
        "Water unit conversion",
        "Bill calculation examples",
        "Mobile friendly calculator"
      ],
      "keywords": [
        "KUKL Water Bill Calculator",
        "Water Bill Calculator Nepal",
        "KUKL Tariff",
        "Kathmandu Water Bill",
        "Water Charges Nepal",
        "Water Meter Calculator",
        "Sewerage Charge",
        "Water Unit Calculator"
      ],
      "mainEntityOfPage": {
        "@id": "https://nepacalc.com/calculator/kukl-bill/#webpage"
      },
      "inLanguage": "en-NP"
    },
    {
      "@type": "FAQPage",
      "@id": "https://nepacalc.com/calculator/kukl-bill/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How is my KUKL water bill calculated?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "KUKL calculates water bills using the official tariff based on your pipe size, monthly water consumption, minimum applicable charge, additional unit charges above the minimum threshold, and a 50% sewerage charge. This calculator automatically applies these rules to estimate your monthly bill."
          }
        },
        {
          "@type": "Question",
          "name": "What is one unit of water in Nepal?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "One unit of water is equal to 1,000 litres or 1 cubic metre (1 m³). KUKL and other water utilities in Nepal use this measurement when calculating monthly water consumption."
          }
        },
        {
          "@type": "Question",
          "name": "Why does KUKL charge a sewerage fee?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "KUKL applies a sewerage charge equal to 50% of the water charge to support wastewater collection, operation and maintenance of sewerage infrastructure throughout the Kathmandu Valley."
          }
        },
        {
          "@type": "Question",
          "name": "What is the minimum monthly KUKL water bill?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The minimum monthly bill depends on the pipe connection size. Each connection type has an official minimum consumption allowance and minimum water charge before additional consumption charges apply."
          }
        },
        {
          "@type": "Question",
          "name": "How do I read my KUKL water meter?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Subtract the previous meter reading from the current meter reading to determine total water consumption. Every increase of one unit represents 1,000 litres of water used during the billing period."
          }
        },
        {
          "@type": "Question",
          "name": "How can I pay my KUKL water bill online?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "KUKL customers can pay their bills using the official KUKL Customer Portal, KUKL Mobile App, Mobile Banking, Internet Banking, Fonepay-enabled services, ConnectIPS and other supported digital payment channels."
          }
        },
        {
          "@type": "Question",
          "name": "Does pipe size affect my water bill?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. KUKL tariffs vary according to the size of the water connection. Larger pipe sizes have higher minimum consumption limits, higher minimum charges and different additional unit rates."
          }
        },
        {
          "@type": "Question",
          "name": "Can this calculator estimate my monthly KUKL water bill accurately?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. This calculator estimates your monthly KUKL water bill using the official published tariff structure, including pipe size, minimum charges, additional unit rates and the mandatory 50% sewerage charge. Actual bills may differ if KUKL revises tariffs or applies additional service charges."
          }
        }
      ]
    },
    {
      "@type": "HowTo",
      "@id": "https://nepacalc.com/calculator/kukl-bill/#howto",
      "name": "How to Calculate Your KUKL Water Bill",
      "description": "Learn how to calculate your monthly KUKL water bill using the official tariff structure, pipe size, water consumption, and sewerage charges.",
      "inLanguage": "en-NP",
      "totalTime": "PT2M",
      "estimatedCost": {
        "@type": "MonetaryAmount",
        "currency": "NPR",
        "value": "0"
      },
      "tool": [
        {
          "@type": "HowToTool",
          "name": "NepaCalc KUKL Water Bill Calculator"
        }
      ],
      "supply": [
        {
          "@type": "HowToSupply",
          "name": "Current water meter reading"
        },
        {
          "@type": "HowToSupply",
          "name": "Monthly water consumption (units)"
        },
        {
          "@type": "HowToSupply",
          "name": "Pipe connection size"
        }
      ],
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Select your pipe size",
          "text": "Choose the correct KUKL pipe connection size (½\", ¾\", 1\", 1½\", 2\", 3\" or 4\") to apply the official tariff for your connection."
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Enter your monthly water consumption",
          "text": "Enter the total number of water units consumed during the billing period. One unit is equal to 1,000 litres (1 cubic metre)."
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Calculate the bill",
          "text": "Click the Calculate button. The calculator automatically applies the official minimum charge, additional unit charges, and the mandatory 50% sewerage charge."
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Review the bill breakdown",
          "text": "View the detailed calculation including water charge, sewerage charge, total payable amount, and the calculation steps used to estimate your bill."
        },
        {
          "@type": "HowToStep",
          "position": 5,
          "name": "Use the result",
          "text": "Copy, print, or share your estimated KUKL water bill for personal reference or monthly expense planning."
        }
      ],
      "mainEntityOfPage": {
        "@id": "https://nepacalc.com/calculator/kukl-bill/#webpage"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://nepacalc.com/calculator/kukl-bill/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://nepacalc.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Calculators",
          "item": "https://nepacalc.com/calculator/"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Nepal Specific Calculators",
          "item": "https://nepacalc.com/category/nepal-specific/"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "KUKL Water Bill Calculator",
          "item": "https://nepacalc.com/calculator/kukl-bill/"
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
