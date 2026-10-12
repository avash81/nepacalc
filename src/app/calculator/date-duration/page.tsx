import { Metadata } from 'next';
import Calculator from './Calculator';

export const metadata: Metadata = {
  title: 'Date Duration Calculator: Days Between Dates | NepaCalc',
  description: 'Calculate the days between two dates with NepaCalc. View total days, weeks, calendar duration and business days, with inclusive counting and leap-year support.',
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
    description: 'Calculate the days between two dates with NepaCalc. View total days, weeks, calendar duration and business days, with inclusive counting and leap-year support.',
    url: 'https://nepacalc.com/calculator/date-duration/',
    siteName: 'NepaCalc',
    type: 'website',
    images: [{ url: 'https://nepacalc.com/images/og/date-duration-calculator.jpg', width: 1200, height: 630, alt: 'Date Duration Calculator - Days Between Dates | NepaCalc' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Date Duration Calculator: Days Between Dates | NepaCalc',
    description: 'Calculate the days between two dates with NepaCalc. View total days, weeks, calendar duration and business days, with inclusive counting and leap-year support.',
    images: ['https://nepacalc.com/images/og/date-duration-calculator.jpg'],
  },
};

export default function Page() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I calculate days between two dates?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Subtract the start date from the end date to get the elapsed day count. If you need to count both the beginning and ending dates as full calendar days, add 1 (inclusive count)."
        }
      },
      {
        "@type": "Question",
        "name": "What is inclusive versus exclusive counting?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Exclusive (standard elapsed) counting measures the duration between dates without counting the end date as a full day (End date − Start date). Inclusive counting includes both the start date and end date (Elapsed days + 1)."
        }
      },
      {
        "@type": "Question",
        "name": "Does the calculator account for leap years?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. The calculator uses exact Gregorian calendar logic. If the selected date range spans February 29 of a leap year (such as 2024 or 2028), that 366th day is automatically included in the count."
        }
      },
      {
        "@type": "Question",
        "name": "Does it count weekends?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. The total calendar days count includes all Saturdays and Sundays. The calculator also breaks out business days (weekdays) and weekend days separately in the results."
        }
      },
      {
        "@type": "Question",
        "name": "Can it calculate business days?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Expand More Results to see the Business Days count, which counts Monday through Friday and excludes weekends (Saturdays and Sundays)."
        }
      },
      {
        "@type": "Question",
        "name": "How are months and years calculated?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Months and years are determined using calendar-based date subtraction rather than dividing by a fixed 30 or 365 days. The calculator accounts for the varying lengths of individual months (28, 29, 30, or 31 days) to show exact elapsed years, months, and remaining days."
        }
      },
      {
        "@type": "Question",
        "name": "Why can the months and years differ from the total number of days?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Total days measure the elapsed time between two dates. The years, months, and days breakdown uses calendar units, and months have different lengths. As a result, the calendar duration does not always convert directly into the same total number of days. Use the total calendar days result when you need the exact day count."
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
