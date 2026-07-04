import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "Date Duration Calculator – Calculate Days Between Dates Online",
  description: "Calculate the exact duration between two dates in years, months, weeks, and days. Free online Date Duration Calculator with accurate calendar and leap year calculations.",
  slug: 'date-duration',
  keywords: ["date duration calculator", "days between dates", "date difference calculator", "date calculator", "calculate date duration", "online date duration calculator"],
});

export default function Page() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is a Date Duration Calculator?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A Date Duration Calculator calculates the exact duration between two calendar dates in years, months, weeks, and days."
        }
      },
      {
        "@type": "Question",
        "name": "How do I calculate the duration between two dates?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Select a start date and an end date, then click Calculate to instantly view the exact duration."
        }
      },
      {
        "@type": "Question",
        "name": "How are days between two dates calculated?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The calculator compares the selected dates using actual calendar rules, accounting for leap years and different month lengths."
        }
      },
      {
        "@type": "Question",
        "name": "Does the calculator include leap years?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Leap years are automatically included whenever they occur within the selected date range."
        }
      },
      {
        "@type": "Question",
        "name": "Can I calculate years, months, and days between two dates?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. The calculator provides a complete breakdown into years, months, and days."
        }
      },
      {
        "@type": "Question",
        "name": "Can I calculate my exact age?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Enter your birth date and the target date to calculate your exact age."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between inclusive and exclusive date counting?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Inclusive counting includes both the start and end dates, while exclusive counting measures only the elapsed time between them."
        }
      },
      {
        "@type": "Question",
        "name": "Can I calculate business days between two dates?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "If enabled, business day calculations exclude weekends and optionally public holidays."
        }
      },
      {
        "@type": "Question",
        "name": "What is a Date Difference Calculator?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A Date Difference Calculator is another name for a Date Duration Calculator and calculates the time between two dates."
        }
      },
      {
        "@type": "Question",
        "name": "Is the Date Duration Calculator free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. It is completely free to use online."
        }
      }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Date Duration Calculator",
    "applicationCategory": "CalculatorApplication",
    "applicationSubCategory": "Date Calculator",
    "operatingSystem": "Any",
    "browserRequirements": "Requires JavaScript",
    "url": "https://nepacalc.com/calculator/date-duration/",
    "description": "Calculate the exact duration between two dates in years, months, weeks, and days. Free online Date Duration Calculator with automatic leap year support.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Calculate days between two dates",
      "Calculate months and years",
      "Leap year support",
      "Calendar-accurate calculations",
      "Free online calculator"
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <Calculator />
    </>
  );
}
