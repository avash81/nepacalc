import { calcMeta } from '@/lib/calcMeta';
import type { Metadata } from 'next';
import WeightCalculator from './Calculator';

const baseMeta = calcMeta({
  title: "Weight Converter: Kg to Tola, Grams & Pounds",
  description: "Convert kilograms, grams, pounds, ounces and Nepal-standard tola with an online weight converter. View common conversions and estimate gold value per tola.",
  slug: 'weight-converter',
  keywords: ["weight converter nepal", "convert kg to lbs", "gram to kg calculator", "tola to gram converter", "mass converter tool", "how many tola in 1 kg", "kg to tola"],
});

export const metadata: Metadata = {
  ...baseMeta,
  title: "Weight Converter: Kg to Tola, Grams & Pounds",
  description: "Convert kilograms, grams, pounds, ounces and Nepal-standard tola with an online weight converter. View common conversions and estimate gold value per tola.",
  openGraph: {
    ...baseMeta.openGraph,
    title: "Weight Converter: Kg to Tola, Grams & Pounds",
    description: "Convert kilograms, grams, pounds, ounces and Nepal-standard tola with an online weight converter. View common conversions and estimate gold value per tola.",
    url: "https://nepacalc.com/calculator/weight-converter/",
  },
  twitter: {
    ...baseMeta.twitter,
    title: "Weight Converter: Kg to Tola, Grams & Pounds",
    description: "Convert kilograms, grams, pounds, ounces and Nepal-standard tola with an online weight converter. View common conversions and estimate gold value per tola.",
  },
  alternates: {
    canonical: "https://nepacalc.com/calculator/weight-converter/",
    languages: {
      'en-NP': "https://nepacalc.com/calculator/weight-converter/",
      'x-default': "https://nepacalc.com/calculator/weight-converter/",
    },
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  '@id': 'https://nepacalc.com/calculator/weight-converter/#breadcrumb',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://nepacalc.com/' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://nepacalc.com/calculator/' },
    { '@type': 'ListItem', position: 3, name: 'Weight Converter', item: 'https://nepacalc.com/calculator/weight-converter/' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How many Tola are in 1 kg?',
      acceptedAnswer: { '@type': 'Answer', text: 'One kilogram is approximately 85.7353 Tola when using a Tola definition of 11.6638 grams. The result may differ if a different regional Tola standard is used.' },
    },
    {
      '@type': 'Question',
      name: 'How many grams are in 1 Tola?',
      acceptedAnswer: { '@type': 'Answer', text: 'Using the 11.6638-gram Tola definition, 1 Tola = 11.6638 grams. Check which Tola standard applies when converting precious-metal weights.' },
    },
    {
      '@type': 'Question',
      name: 'How do I convert kilograms to pounds?',
      acceptedAnswer: { '@type': 'Answer', text: 'Multiply the weight in kilograms by 2.20462262 to convert it to pounds. For example, 5 kg is approximately 11.0231 pounds.' },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between a troy ounce and an ounce?',
      acceptedAnswer: { '@type': 'Answer', text: 'A standard avoirdupois ounce equals approximately 28.3495 grams, while a troy ounce equals approximately 31.1035 grams. Troy ounces are commonly used to measure precious metals such as gold and silver.' },
    },
    {
      '@type': 'Question',
      name: 'How many kilograms are in a metric tonne?',
      acceptedAnswer: { '@type': 'Answer', text: 'One metric tonne equals 1,000 kilograms. For example, 2 metric tonnes equal 2,000 kg. A metric tonne is different from a US short ton and an Imperial long ton.' },
    },
    {
      '@type': 'Question',
      name: 'Can I use this converter to estimate the value of silver by Tola?',
      acceptedAnswer: { '@type': 'Answer', text: 'This converter can convert silver weight between supported units. For silver value in Nepal, check the current silver price in Nepal. For dedicated silver weight conversion, use the silver converter.' },
    },
    {
      '@type': 'Question',
      name: 'Is weight the same as mass?',
      acceptedAnswer: { '@type': 'Answer', text: 'Not exactly. Mass measures the amount of matter in an object, while weight is the force of gravity acting on that mass. In everyday use, people often use weight to mean mass.' },
    },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <WeightCalculator />
    </>
  );
}
