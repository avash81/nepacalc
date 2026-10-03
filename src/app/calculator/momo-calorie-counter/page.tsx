import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  ...calcMeta({
    title: 'Momo Calorie Calculator – Calories in Momos',
    description:
      'Calculate calories in momos by type, cooking method and quantity. Estimate calories, protein, carbs and fat for chicken, veg, buff, paneer and more.',
    slug: 'calculator/momo-calorie-counter',
    keywords: [
      'Momo Calorie Calculator',
      'momo calories',
      'calories in momos',
      'chicken momo calories',
      'veg momo calories',
      'steamed momo calories',
      'fried momo calories',
      'calories in chicken momos',
      'calories in 1 momo',
    ],
  }),
  openGraph: {
    title: 'Momo Calorie Calculator – Calories in Momos',
    description: 'Calculate calories in momos by type, cooking method and quantity. Estimate calories, protein, carbs and fat for chicken, veg, buff, paneer and more.',
    url: 'https://nepacalc.com/calculator/momo-calorie-counter/',
    siteName: 'NepaCalc',
    type: 'website',
    images: [{ url: 'https://nepacalc.com/images/momo-calorie-calculator.webp', alt: 'Momo Calorie Calculator' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Momo Calorie Calculator – Calories in Momos',
    description: 'Calculate calories in momos by type, cooking method and quantity. Estimate calories, protein, carbs and fat for chicken, veg, buff, paneer and more.',
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

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How many calories are in one momo?',
      acceptedAnswer: { '@type': 'Answer', text: 'The standard steamed chicken estimate is 60 calories per piece. Other momo types and cooking methods can have different calorie values.' },
    },
    {
      '@type': 'Question',
      name: 'How many calories are in 10 momos?',
      acceptedAnswer: { '@type': 'Answer', text: 'Ten steamed chicken momos are estimated at 600 calories. Select another momo type or cooking method to calculate a different serving.' },
    },
    {
      '@type': 'Question',
      name: 'How many calories are in steamed chicken momos?',
      acceptedAnswer: { '@type': 'Answer', text: 'Approximately 60 calories per steamed chicken momo. Actual calories vary according to recipe, filling and portion size.' },
    },
    {
      '@type': 'Question',
      name: 'Are fried momos higher in calories than steamed momos?',
      acceptedAnswer: { '@type': 'Answer', text: 'Fried momos can contain more calories because cooking oil adds energy. The difference depends on preparation method and amount of oil used.' },
    },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Calculator />
    </>
  );
}
