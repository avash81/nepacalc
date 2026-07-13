import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
import { IncomeTaxSeoContent } from './components/IncomeTaxSeoContent';

export const metadata = calcMeta({
  title: "Nepal Income Tax Calculator (FY 2083/84) — IRD Tax Calculator Nepal",
  description: "Calculate Nepal income tax instantly using the FY 2083/84 Finance Act and IRD tax slabs. Estimate annual tax, monthly TDS, deductions, effective tax rate and net income after tax for salary, business, freelance and rental income. Free.",
  slug: 'calculator/nepal-income-tax',
  canonical: '/calculator/nepal-income-tax/',
  keywords: [
    "Nepal Income Tax Calculator",
    "Income Tax Calculator Nepal",
    "IRD Tax Calculator Nepal",
    "Salary Tax Calculator Nepal",
    "Tax Calculator Nepal",
    "Nepal Income Tax Slab 2083/84",
    "Monthly TDS Calculator Nepal",
    "Finance Act 2083",
    "Personal Income Tax Nepal",
    "Freelance Tax Calculator Nepal",
    "Business Income Tax Nepal",
    "Rental Income Tax Nepal",
    "Female Tax Rebate Nepal",
    "NRN Tax Calculator Nepal",
  ],
  ogImage: 'https://nepacalc.com/images/nepal-income-tax-calculator-2083-2084.webp'
});

export default function Page() {

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {"@type": "ListItem", "position": 1, "name": "Home",                                      "item": "https://nepacalc.com/"},
      {"@type": "ListItem", "position": 2, "name": "Calculators",                               "item": "https://nepacalc.com/calculator/"},
      {"@type": "ListItem", "position": 3, "name": "Finance Calculators",                       "item": "https://nepacalc.com/calculator/finance/"},
      {"@type": "ListItem", "position": 4, "name": "Nepal Income Tax Calculator (FY 2083/84)",  "item": "https://nepacalc.com/calculator/nepal-income-tax/"}
    ]
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://nepacalc.com/calculator/nepal-income-tax/",
    "url": "https://nepacalc.com/calculator/nepal-income-tax/",
    "name": "Nepal Income Tax Calculator (FY 2083/84) — IRD Tax Calculator Nepal",
    "description": "Calculate Nepal income tax instantly using the FY 2083/84 Finance Act and IRD tax slabs. Estimate annual tax, monthly TDS, eligible deductions, effective tax rate and net income after tax.",
    "inLanguage": "en-NP",
    "datePublished": "2026-06-15",
    "dateModified": "2026-07-13",
    "isPartOf": {"@type": "WebSite", "name": "NepaCalc", "url": "https://nepacalc.com"},
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["#page-title", "#intro", "#slabs", "#faq"]
    }
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Nepal Income Tax Calculator",
    "alternateName": ["IRD Tax Calculator Nepal", "Tax Calculator Nepal", "Nepal Income Tax Calculator 2083/84"],
    "url": "https://nepacalc.com/calculator/nepal-income-tax/",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "All",
    "description": "Calculate Nepal income tax instantly using the latest FY 2083/84 income tax slabs under the Finance Act 2083. Estimate annual income tax, monthly TDS, SSF, effective tax rate and take-home salary.",
    "offers": {"@type": "Offer", "price": "0", "priceCurrency": "NPR"},
    "featureList": [
      "Nepal income tax slab 2083/84",
      "SSF waiver calculation",
      "Monthly TDS estimate",
      "Annual tax calculation",
      "Universal single tax slab",
      "Female rebate (10%)",
      "Deduction breakdown table",
      "PDF export",
      "Copy and share results"
    ]
  };

  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Nepal Income Tax Calculator FY 2083/84",
    "operatingSystem": "Web",
    "applicationCategory": "FinanceApplication",
    "url": "https://nepacalc.com/calculator/nepal-income-tax/",
    "offers": {"@type": "Offer", "price": "0", "priceCurrency": "NPR"},
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "1240",
      "reviewCount": "312",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  const imageObjectSchema = {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "url": "https://nepacalc.com/images/nepal-income-tax-calculator-2083-2084.webp",
    "name": "Nepal Income Tax Calculator FY 2083 2084",
    "description": "Nepal Income Tax Calculator for FY 2083/84 under Finance Act 2083",
    "width": 1200,
    "height": 630,
    "contentUrl": "https://nepacalc.com/images/nepal-income-tax-calculator-2083-2084.webp"
  };

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "NepaCalc",
    "url": "https://nepacalc.com",
    "logo": "https://nepacalc.com/logo.png",
    "sameAs": [
      "https://www.facebook.com/nepacalc",
      "https://twitter.com/nepacalc",
      "https://ird.gov.np",
      "https://mof.gov.np",
      "https://ssf.gov.np"
    ],
    "publisher": {"@type": "Organization", "name": "NepaCalc"},
    "knowsAbout": [
      "Nepal Income Tax",
      "Finance Act 2083",
      "Inland Revenue Department Nepal",
      "Tax Deducted at Source Nepal",
      "Social Security Fund Nepal"
    ]
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "NepaCalc",
    "url": "https://nepacalc.com/",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://nepacalc.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Calculate Income Tax in Nepal",
    "description": "Step-by-step guide to calculating Nepal income tax for FY 2083/84 using the Finance Act 2083.",
    "step": [
      {"@type": "HowToStep", "position": 1, "name": "Enter annual or monthly salary",        "text": "Provide your base salary on a monthly or annual basis using the toggle."},
      {"@type": "HowToStep", "position": 2, "name": "Add bonus if applicable",               "text": "Include any guaranteed bonuses or festival allowances."},
      {"@type": "HowToStep", "position": 3, "name": "Enter SSF, EPF and CIT contributions",  "text": "Provide your retirement contributions to lower your taxable income."},
      {"@type": "HowToStep", "position": 4, "name": "Enter eligible deductions",             "text": "Input life insurance, medical insurance, education and other approved deductions."},
      {"@type": "HowToStep", "position": 5, "name": "Calculate taxable income",              "text": "The calculator automatically applies deduction caps from Finance Act 2083."},
      {"@type": "HowToStep", "position": 6, "name": "Apply FY 2083/84 tax slabs",           "text": "The system applies the progressive 1% to 29% income tax slabs."},
      {"@type": "HowToStep", "position": 7, "name": "View annual tax and monthly TDS",      "text": "Review your final annual income tax, monthly TDS, effective rate and take-home salary."}
    ]
  };

  const faqs = [
    { q: "What are the Nepal income tax slabs for FY 2083/84?",  a: "Nepal introduced a simplified five-slab personal income tax structure under the Finance Act 2083. Resident individuals are taxed progressively at 1%, 10%, 20%, 27% and 29% depending on their annual taxable income." },
    { q: "Is the first Rs. 10 lakh tax free in Nepal?",          a: "No. The first Rs. 10 lakh is generally subject to a 1% Social Security Tax. Eligible Social Security Fund (SSF) contributors may qualify for relief on this first slab according to applicable tax provisions." },
    { q: "How is monthly TDS calculated in Nepal?",              a: "Monthly Tax Deducted at Source (TDS) is estimated by converting monthly salary into annual taxable income, deducting eligible retirement contributions and approved deductions, applying the FY 2083/84 progressive tax slabs, and dividing the total annual tax across payroll periods." },
    { q: "Does the calculator include SSF deductions?",          a: "Yes. The calculator considers Social Security Fund (SSF), Employees Provident Fund (EPF) and Citizen Investment Trust (CIT) retirement contributions within the limits permitted under the Income Tax Act." },
    { q: "Can I include insurance deductions?",                  a: "Yes. The calculator supports current government deduction limits for Life Insurance (Rs. 40,000), Medical Insurance (Rs. 20,000), and Building Insurance (Rs. 10,000)." },
    { q: "Does this calculator support education deductions?",   a: "Yes. Eligible tuition fees may qualify for an education deduction of 25% of tuition, subject to a maximum annual deduction of Rs. 25,000 as permitted under the Finance Act 2083." },
    { q: "Can donations reduce my income tax?",                  a: "Yes. Approved donations to eligible tax-exempt institutions may be deducted up to Rs. 3,00,000, subject to limits prescribed under the Inland Revenue Department guidelines." },
    { q: "Is there a different tax slab for married couples?",   a: "No. Beginning FY 2083/84, Nepal follows a single personal income tax slab structure for all resident individuals." },
    { q: "How is income tax calculated in Nepal?",               a: "Income tax is calculated by first determining annual taxable income after eligible deductions. The FY 2083/84 progressive tax slabs are then applied to each portion of taxable income separately to determine the total annual tax liability." },
    { q: "Is this calculator updated for Budget 2083/84?",       a: "Yes. The calculator follows the latest FY 2083/84 Finance Act and Nepal Government Budget provisions, including revised tax slabs, updated deduction limits and current personal income tax rules." }
  ];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": "https://nepacalc.com/calculator/nepal-income-tax/#article",
    "headline": "Nepal Income Tax Calculator (FY 2083/84)",
    "description": "Complete guide to calculating Nepal personal income tax — salary, business, freelance, rental and professional income — under the Finance Act 2083/84.",
    "author": { "@type": "Organization", "name": "NepaCalc", "url": "https://nepacalc.com" },
    "publisher": {
      "@type": "Organization",
      "name": "NepaCalc",
      "logo": { "@type": "ImageObject", "url": "https://nepacalc.com/logo.png" }
    },
    "datePublished": "2026-06-15",
    "dateModified": "2026-07-13",
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://nepacalc.com/calculator/nepal-income-tax/" },
    "image": "https://nepacalc.com/images/nepal-income-tax-calculator-2083-2084.webp",
    "inLanguage": "en-NP",
    "about": [
      { "@type": "Thing", "name": "Nepal Income Tax" },
      { "@type": "Thing", "name": "Finance Act 2083" },
      { "@type": "Thing", "name": "Tax Deducted at Source" },
      { "@type": "Thing", "name": "Inland Revenue Department Nepal" }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {"@type": "Answer", "text": f.a}
    }))
  };

  const schemas = [
    breadcrumbSchema,
    webPageSchema,
    webAppSchema,
    softwareAppSchema,
    imageObjectSchema,
    howToSchema,
    articleSchema,
    faqSchema,
  ];

  return (
    <>
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <Calculator />
      <IncomeTaxSeoContent />
    </>
  );
}
