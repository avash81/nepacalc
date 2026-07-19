import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
import Link from 'next/link';

export const metadata = calcMeta({
  title: 'Nepal Gold Unit Converter – Tola, Lal, Aana & Gram Calculator',
  description: 'Convert Nepal gold weight instantly between Tola, Lal (Laal), Aana and Gram using the official Nepal gold measurement system. Free two-way Nepal Gold Unit Converter with accurate conversions and optional gold value calculation.',
  slug: 'gold-converter',
  canonical: 'https://nepacalc.com/calculator/gold-converter/',
  keywords: [
    'tola to gram converter', 'lal to gram nepal', 'gram to lal nepal',
    '1 lal in gram', '1 tola in lal', 'aana to gram converter',
    'gold weight converter nepal', 'nepal gold unit calculator',
    'gold jewelry auditor nepal', 'tola lal aana ratti converter',
    '15 lal in gram', '17 lal gold nepal', '40 lal in gram',
    'how many lal in 1 tola', 'gold converter fenegosida',
    'tejabi gold calculator', 'hallmark gold converter nepal',
    'laal gold unit nepal', 'metal retention efficiency'
  ],
});

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": "https://nepacalc.com/calculator/gold-converter/#breadcrumb",
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
      "name": "Nepal Gold Unit Converter",
      "item": "https://nepacalc.com/calculator/gold-converter/"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How many grams are in 1 Tola of gold in Nepal?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "One Tola of gold equals 11.6638 grams according to the official Nepal gold measurement system. One Tola is also equal to 100 Lal or 16 Aana."
      }
    },
    {
      "@type": "Question",
      "name": "How many Lal are in 1 Gram?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "1 Gram equals approximately 8.5735 Lal using the official Nepal gold measurement standard. You can convert Gram to Lal instantly using the Nepal Gold Unit Converter, which uses the official conversion factor based on 1 Tola = 11.6638 grams = 100 Lal."
      }
    },
    {
      "@type": "Question",
      "name": "How many Lal (Laal) are in 1 Tola?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "One Tola contains exactly 100 Lal (Laal). This is the standard conversion used by jewellery shops and the Federation of Nepal Gold and Silver Dealers' Association (FENEGOSIDA)."
      }
    },
    {
      "@type": "Question",
      "name": "How many Aana are in 1 Tola?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "One Tola equals 16 Aana. Each Aana is equal to 6.25 Lal or approximately 0.729 grams."
      }
    },
    {
      "@type": "Question",
      "name": "How do I convert Gram to Lal?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Divide the weight in grams by 0.116638. Example: 1 gram = 8.5735 Lal, 5 grams = 42.87 Lal, 10 grams = 85.74 Lal. The Nepal Gold Unit Converter performs this calculation automatically."
      }
    },
    {
      "@type": "Question",
      "name": "How do I convert Lal to Gram?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Multiply the total Lal by 0.116638. Example: 15 Lal = 1.7496 grams, 20 Lal = 2.3328 grams, 25 Lal = 2.9159 grams, 40 Lal = 4.6655 grams, 50 Lal = 5.8319 grams."
      }
    },
    {
      "@type": "Question",
      "name": "How many grams is 15 Lal?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "15 Lal = 1.7496 grams, which is 0.15 Tola."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between Hallmark and Tejabi gold?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Hallmark gold is certified for purity and generally refers to 24K (99.9%) or other certified purity levels. Tejabi gold is traditionally 22K (91.6%) and is commonly used for jewellery because it is more durable than pure 24K gold."
      }
    },
    {
      "@type": "Question",
      "name": "Who sets gold rates in Nepal?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Daily gold prices in Nepal are published by the Federation of Nepal Gold and Silver Dealers' Association (FENEGOSIDA). The Nepal Gold Unit Converter uses the official Nepal gold measurement system for accurate weight conversions, while current market prices should always be verified using the latest FENEGOSIDA rate."
      }
    }
  ]
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Calculator />
      

    </>
  );
}
