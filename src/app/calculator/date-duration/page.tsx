import { Metadata } from 'next';
import Calculator from './Calculator';

export const metadata: Metadata = {
  title: 'Date Duration Calculator: Days Between Dates | NepaCalc',
  description: 'Calculate the exact duration between two dates in days, weeks, months and years. Include the end date, count business days, and see the result instantly.',
  alternates: {
    canonical: 'https://nepacalc.com/calculator/date-duration/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
    },
  },
  openGraph: {
    title: 'Date Duration Calculator: Days Between Dates | NepaCalc',
    description: 'Calculate the exact duration between two dates in days, weeks, months and years. Include the end date, count business days, and see the result instantly.',
    url: 'https://nepacalc.com/calculator/date-duration/',
    siteName: 'NepaCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Date Duration Calculator: Days Between Dates | NepaCalc',
    description: 'Calculate the exact duration between two dates in days, weeks, months and years. Include the end date, count business days, and see the result instantly.',
  },
};

export default function Page() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I calculate the number of days between two dates?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Subtract the start date from the end date. For example, July 1 to July 5 is 4 elapsed days. Enable Include end date when both dates should be counted."
        }
      },
      {
        "@type": "Question",
        "name": "Does the calculator include leap years?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Date ranges are calculated using the actual calendar dates, including February 29 during leap years."
        }
      },
      {
        "@type": "Question",
        "name": "Does the calculator count weekends?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Calendar-day results include weekends. When business-day counting is enabled, weekends are excluded."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between inclusive and exclusive date counting?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Standard elapsed counting measures the time between the dates without counting the end date as a full day. Inclusive counting counts both the start and end dates."
        }
      },
      {
        "@type": "Question",
        "name": "Can I calculate business days between two dates?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. The calculator shows business days (weekdays only) in the results. Weekend days are shown separately."
        }
      }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Date Duration Calculator",
    "applicationCategory": "CalculatorApplication",
    "operatingSystem": "Any",
    "browserRequirements": "Requires JavaScript",
    "url": "https://nepacalc.com/calculator/date-duration/",
    "description": "Calculate the exact duration between two dates in days, weeks, months and years. Supports business days and inclusive date counting.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Calculate days between two dates",
      "Calculate weeks, months and years",
      "Business days calculation",
      "Inclusive and exclusive date counting",
      "Leap year support"
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://nepacalc.com" },
      { "@type": "ListItem", "position": 2, "name": "Calculators", "item": "https://nepacalc.com/calculator/" },
      { "@type": "ListItem", "position": 3, "name": "Date Duration Calculator", "item": "https://nepacalc.com/calculator/date-duration/" }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Calculator />
    </>
  );
}
