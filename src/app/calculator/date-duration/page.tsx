import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "Date Duration Calculator – Calculate Days Between Two Dates Online",
  description: "Calculate the exact duration between two dates in years, months, weeks and days. Free online Date Duration Calculator with leap year support and accurate calendar calculations.",
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
    
      ,{
        "@type": "Question",
        "name": "How do I calculate days between two dates?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Select the start and end dates and click calculate. The tool automatically counts the exact days between them."
        }
      },
      {
        "@type": "Question",
        "name": "How do I include the end date?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Check the 'Inclusive Audit' box to add 1 day to the total count, ensuring the end date is included in the duration."
        }
      },
      {
        "@type": "Question",
        "name": "Does this calculator include leap years?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, leap years are automatically detected and included in the calendar calculations."
        }
      },
      {
        "@type": "Question",
        "name": "How do I calculate working days?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Select 'Working Days' from the mode dropdown to automatically exclude weekends from the total days count."
        }
      },
      {
        "@type": "Question",
        "name": "How do I calculate business days?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Business days are calculated identically to working days, by automatically excluding Saturdays and Sundays from the duration."
        }
      },
      {
        "@type": "Question",
        "name": "Can I calculate age?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, select 'Age Calculator' mode, enter your date of birth as the start date, and today's date as the end date."
        }
      },
      {
        "@type": "Question",
        "name": "How do I calculate employment duration?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Select 'Employment Duration' mode, enter your joining date and the end date, and the calculator will provide your exact tenure."
        }
      },
      {
        "@type": "Question",
        "name": "Can I calculate months instead of days?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, the comprehensive summary always displays the total equivalent months as well as the standard year/month/day breakdown."
        }
      },
      {
        "@type": "Question",
        "name": "Does this calculator handle leap years automatically?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, the engine accurately accounts for Gregorian calendar rules, including February 29th during leap years."
        }
      },
      {
        "@type": "Question",
        "name": "Can I print or download the result?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, use the 'Print / PDF' button beneath the results to save or print a formatted summary."
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

  
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "HR & Payroll calculations" },
      { "@type": "ListItem", "position": 2, "name": "Construction & Project Management timelines" },
      { "@type": "ListItem", "position": 3, "name": "Legal Contracts and visa validity" },
      { "@type": "ListItem", "position": 4, "name": "Education term durations" },
      { "@type": "ListItem", "position": 5, "name": "Events & Travel planning" }
    ]
  };

  const actionSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": "https://nepacalc.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://nepacalc.com/calculator/date-duration/?start={start_date}&end={end_date}",
      "query-input": "required name=start_date"
    }
  };

  const speakableSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Date Duration Calculator",
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": [".bg-\\[\\#E8F0FE\\] p"]
    },
    "url": "https://nepacalc.com/calculator/date-duration/"
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(actionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <Calculator />
    </>
  );
}
