import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  ...calcMeta({
    title: 'Momo Calorie Calculator – Calories in Momos',
    description:
      'Calculate calories in momos by type, cooking method and quantity. Estimate calories, protein, carbs and fat for chicken, veg, buff, paneer and more.',
    slug: 'calculator/momo-calorie-counter',
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

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Calculator />
    </>
  );
}
