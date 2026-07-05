import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  ...calcMeta({
    title: 'Momo Calorie Calculator | Chicken, Veg, Buff, Fried & Steamed Momos',
    description:
      'Calculate calories in chicken, veg, buff, paneer, fried, steamed, tandoori and jhol momos instantly. Get calories per piece, per plate, protein and nutrition facts using our free Momo Calorie Calculator.',
    slug: 'calculator/momo-calorie-counter',
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
    title: 'Momo Calorie Calculator | Chicken, Veg, Buff, Fried & Steamed Momos',
    description: 'Calculate calories in chicken, veg, buff, paneer, fried, steamed, tandoori and jhol momos. Get calories per piece, per plate, protein and nutrition facts instantly.',
    url: 'https://nepacalc.com/calculator/momo-calorie-counter/',
    siteName: 'NepaCalc',
    type: 'website',
    images: [{ url: 'https://nepacalc.com/images/momo-calorie-calculator.webp', alt: 'Momo Calorie Calculator Chicken Veg Buff Fried Steamed' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Momo Calorie Calculator | Chicken, Veg, Buff, Fried & Steamed Momos',
    description: 'Calculate calories in chicken, veg, buff, paneer, fried, steamed, tandoori and jhol momos. Get calories per piece, per plate, protein and nutrition facts instantly.',
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

// ─── Schema: WebApplication (CalculatorApplication) ─────────────────────
const softwareAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  '@id': 'https://nepacalc.com/calculator/momo-calorie-counter/#app',
  name: 'Momo Calorie Calculator',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Any',
  browserRequirements: 'Requires JavaScript',
  url: 'https://nepacalc.com/calculator/momo-calorie-counter/',
  description: 'Calculate calories in steamed, fried, chicken, veg, paneer, buff and pork momos instantly. Free online momo nutrition calculator.',
  image: 'https://nepacalc.com/images/momo-calorie-calculator.webp',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
};

// ─── Schema: FAQPage (Expanded questions) ──────────────────────────────────────
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How many calories are in 5 momos?',
      acceptedAnswer: { '@type': 'Answer', text: '5 steamed veg momos contain approximately 225 calories. 5 steamed chicken momos contain approximately 300 calories. Frying them adds about 125–150 additional calories.' },
    },
    {
      '@type': 'Question',
      name: 'How many calories are in 6 momos?',
      acceptedAnswer: { '@type': 'Answer', text: '6 steamed veg momos contain about 270 calories, while 6 steamed chicken momos contain around 360 calories. If deep-fried, the count increases to approximately 510–540 calories.' },
    },
    {
      '@type': 'Question',
      name: 'How many calories are in 8 momos?',
      acceptedAnswer: { '@type': 'Answer', text: '8 steamed veg momos contain approximately 360 calories, whereas 8 steamed chicken momos contain about 480 calories. Fried variants contain around 680–720 calories.' },
    },
    {
      '@type': 'Question',
      name: 'How many calories are in 10 momos?',
      acceptedAnswer: { '@type': 'Answer', text: '10 steamed vegetable momos contain roughly 450 calories. 10 steamed chicken momos contain approximately 600 calories. Fried plates can exceed 850–900 calories.' },
    },
    {
      '@type': 'Question',
      name: 'How many calories are in 12 momos?',
      acceptedAnswer: { '@type': 'Answer', text: '12 steamed veg momos contain about 540 calories. 12 steamed chicken momos contain around 720 calories. Frying them will push the total past 1,000 calories.' },
    },
    {
      '@type': 'Question',
      name: 'How many calories are in one plate of chicken momos?',
      acceptedAnswer: { '@type': 'Answer', text: 'A standard plate of 10 steamed chicken momos contains approximately 600 calories. A plate of 10 deep-fried chicken momos contains about 850 calories.' },
    },
    {
      '@type': 'Question',
      name: 'Are chicken momos healthy?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes, steamed chicken momos can be healthy. They are high in protein and low in fat, provided you skip creamy or oily dipping sauces like mayonnaise.' },
    },
    {
      '@type': 'Question',
      name: 'Are steamed momos good for weight loss?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. Steaming doesn\'t add oil or trans fats, making steamed vegetable (45 kcal) and chicken (60 kcal) momos excellent options for calorie-controlled weight loss diets.' },
    },
    {
      '@type': 'Question',
      name: 'Which momos have the lowest calories?',
      acceptedAnswer: { '@type': 'Answer', text: 'Steamed vegetable momos have the lowest calories at approximately 45 calories per piece. Steamed mushroom momos are also very low in calories.' },
    },
    {
      '@type': 'Question',
      name: 'Which momos have the highest protein?',
      acceptedAnswer: { '@type': 'Answer', text: 'Steamed chicken momos (5.5g protein per piece) and pork momos (5.5g protein per piece) have the highest protein content among all momo varieties.' },
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
