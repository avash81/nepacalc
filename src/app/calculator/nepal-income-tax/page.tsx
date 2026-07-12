import Link from 'next/link';
import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "Nepal Income Tax Calculator (2083/84) - Calculate Salary Tax Online",
  description: "Calculate your Nepal income tax instantly using the latest FY 2083/84 income tax slabs. Get an accurate tax breakdown, monthly TDS estimate, SSF adjustment, and annual tax calculation online.",
  slug: 'calculator/nepal-income-tax',
  canonical: '/calculator/nepal-income-tax/',
  keywords: [
    "income tax calculator nepal",
    "ird tax calculator nepal",
    "nepal income tax slab 2083/84",
    "tax calculator nepal",
    "salary tax calculator nepal",
    "income tax nepal 2083 84"
  ],
  ogImage: 'https://nepacalc.com/images/income-tax-calculator-nepal-2083-84.webp'
});

export default function Page() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://nepacalc.com/"},
      {"@type": "ListItem", "position": 2, "name": "Calculators", "item": "https://nepacalc.com/calculator/"},
      {"@type": "ListItem", "position": 3, "name": "Nepal Income Tax Calculator (FY 2083/84)", "item": "https://nepacalc.com/calculator/nepal-income-tax/"}
    ]
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://nepacalc.com/calculator/nepal-income-tax/",
    "url": "https://nepacalc.com/calculator/nepal-income-tax/",
    "name": "Nepal Income Tax Calculator (2083/84) - Calculate Salary Tax Online",
    "description": "Calculate your Nepal income tax instantly using the latest FY 2083/84 income tax slabs. Get an accurate tax breakdown, monthly TDS estimate, SSF adjustment, and annual tax calculation online.",
    "inLanguage": "en-NP",
    "datePublished": "2026-06-15",
    "dateModified": "2026-07-01",
    "isPartOf": {"@type": "WebSite", "name": "NepaCalc", "url": "https://nepacalc.com"}
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Nepal Income Tax Calculator",
    "alternateName": ["IRD Tax Calculator Nepal", "Tax Calculator Nepal", "Nepal Income Tax Calculator 2083/84"],
    "url": "https://nepacalc.com/calculator/nepal-income-tax/",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "All",
    "description": "Calculate your Nepal income tax instantly using the latest FY 2083/84 income tax slabs. Get an accurate tax breakdown, monthly TDS estimate, SSF adjustment, and annual tax calculation online.",
    "offers": {"@type": "Offer", "price": "0", "priceCurrency": "NPR"},
    "featureList": ["Nepal income tax slab 2083/84", "SSF waiver calculation", "Monthly TDS estimate", "Annual tax calculation", "Universal single tax slab"]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What are the Nepal income tax slabs for FY 2083/84?",
        "acceptedAnswer": {"@type": "Answer", "text": "The FY 2083/84 tax system uses five progressive slabs with rates ranging from 1% to 29%."}
      },
      {
        "@type": "Question",
        "name": "Is the first Rs. 10 lakh tax free?",
        "acceptedAnswer": {"@type": "Answer", "text": "No. Income up to Rs. 10 lakh is generally taxed at 1%, which is treated as Social Security Tax. Eligible SSF contributors may receive relief from this amount."}
      },
      {
        "@type": "Question",
        "name": "Are there separate tax slabs for married couples?",
        "acceptedAnswer": {"@type": "Answer", "text": "No. The FY 2083/84 budget introduced a single tax slab structure for all resident individuals."}
      },
      {
        "@type": "Question",
        "name": "How is monthly TDS calculated?",
        "acceptedAnswer": {"@type": "Answer", "text": "Monthly TDS is calculated by estimating annual taxable income, applying the progressive tax slabs, accounting for eligible deductions, and dividing the resulting annual tax across monthly payroll periods."}
      },
      {
        "@type": "Question",
        "name": "Does this calculator support SSF deductions?",
        "acceptedAnswer": {"@type": "Answer", "text": "Yes. The calculator estimates tax after considering applicable SSF-related adjustments where relevant."}
      },
      {
        "@type": "Question",
        "name": "Is this calculator based on the latest Nepal budget?",
        "acceptedAnswer": {"@type": "Answer", "text": "Yes. The calculator is designed to reflect the FY 2083/84 personal income tax structure. Always verify against the final enacted Finance Act and Inland Revenue Department guidance for official compliance."}
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Calculator />

    </>
  );
}
