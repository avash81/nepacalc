import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  ...calcMeta({
    title: 'Momo Calorie Calculator – Calculate Calories in Chicken, Veg & Steamed Momos',
    description:
      'Calculate calories, protein, fat and carbs in chicken, buff, veg, steamed, fried and tandoori momos. Instant nutrition calculator with calories per piece and plate.',
    slug: 'momo-calorie-counter',
    keywords: [
      'Momo Calorie Calculator',
      'momo calories',
      'calories in momos',
      'chicken momo calories',
      'veg momo calories',
      'steamed momo calories',
      'fried momo calories',
      'buff momo calories',
      'calories in chicken momos',
      'calories in veg momos',
      'calories in 1 momo',
      'calories in 1 plate momos',
      'jhol momo calories',
      'paneer momo calories',
      'tandoori momo calories',
      'calories per momo',
      'calories per plate momos',
    ],
  }),
  openGraph: {
    title: 'Momo Calorie Calculator – Chicken, Veg & Fried Momos',
    description: 'Estimate calories in chicken, veg, steamed, fried and jhol momos instantly.',
    url: 'https://nepacalc.com/calculator/momo-calorie-counter/',
    siteName: 'NepaCalc',
    type: 'website',
    images: [{ url: 'https://nepacalc.com/images/momo-calorie-calculator.webp', alt: 'Momo Calorie Calculator' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Momo Calorie Calculator – Chicken, Veg & Fried Momos',
    description: 'Estimate calories in chicken, veg, steamed, fried and jhol momos instantly.',
    images: ['https://nepacalc.com/images/momo-calorie-calculator.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: {
    canonical: 'https://nepacalc.com/calculator/momo-calorie-counter/',
  },
};

// ─── Schema: WebPage ─────────────────────────────────────────────────────────
const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://nepacalc.com/calculator/momo-calorie-counter/#webpage',
  url: 'https://nepacalc.com/calculator/momo-calorie-counter/',
  name: 'Momo Calorie Calculator – Calculate Calories in Chicken, Veg & Steamed Momos',
  headline: 'Momo Calorie Calculator',
  description: 'Calculate calories in chicken, veg, fried, steamed, paneer and buff momos instantly. Estimate calories per piece or plate with a full nutritional breakdown.',
  inLanguage: 'en',
  dateModified: '2026-06-27',
  image: 'https://nepacalc.com/images/momo-calorie-calculator.webp',
  isPartOf: { '@type': 'WebSite', url: 'https://nepacalc.com/' },
  breadcrumb: { '@id': 'https://nepacalc.com/calculator/momo-calorie-counter/#breadcrumb' },
  mainEntity: { '@id': 'https://nepacalc.com/calculator/momo-calorie-counter/#app' },
};

// ─── Schema: BreadcrumbList ───────────────────────────────────────────────────
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  '@id': 'https://nepacalc.com/calculator/momo-calorie-counter/#breadcrumb',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://nepacalc.com/' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://nepacalc.com/calculator/' },
    { '@type': 'ListItem', position: 3, name: 'Momo Calorie Calculator', item: 'https://nepacalc.com/calculator/momo-calorie-counter/' },
  ],
};

// ─── Schema: SoftwareApplication (CalculatorApplication) ─────────────────────
const softwareAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  '@id': 'https://nepacalc.com/calculator/momo-calorie-counter/#app',
  name: 'Momo Calorie Calculator',
  applicationCategory: 'CalculatorApplication',
  operatingSystem: 'Web',
  url: 'https://nepacalc.com/calculator/momo-calorie-counter/',
  description: 'Calculate calories in steamed, fried, chicken, veg, paneer, buff and pork momos instantly. Free online momo nutrition calculator.',
  image: 'https://nepacalc.com/images/momo-calorie-calculator.webp',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
};

// ─── Schema: FAQPage (4 core questions) ──────────────────────────────────────
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How many calories are in one chicken momo?',
      acceptedAnswer: { '@type': 'Answer', text: 'One steamed chicken momo contains approximately 45–60 calories depending on size, filling and wrapper thickness.' },
    },
    {
      '@type': 'Question',
      name: 'How many calories are in fried momos?',
      acceptedAnswer: { '@type': 'Answer', text: 'Fried momos absorb cooking oil and contain significantly more calories than steamed momos. Fried chicken momos contain approximately 85 kcal per piece.' },
    },
    {
      '@type': 'Question',
      name: 'How many calories are in one plate of momos?',
      acceptedAnswer: { '@type': 'Answer', text: 'A standard plate of 8–10 steamed chicken momos contains approximately 480–600 calories depending on serving size and filling.' },
    },
    {
      '@type': 'Question',
      name: 'Which momo has the lowest calories?',
      acceptedAnswer: { '@type': 'Answer', text: 'Steamed vegetable momos have the lowest calorie count at approximately 45 calories per piece.' },
    },
  ],
};

// ─── Schema: SearchAction ─────────────────────────────────────────────────────
const searchActionSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://nepacalc.com/#website',
  url: 'https://nepacalc.com/',
  name: 'NepaCalc',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://nepacalc.com/search?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(searchActionSchema) }} />
      <Calculator />
    </>
  );
}
