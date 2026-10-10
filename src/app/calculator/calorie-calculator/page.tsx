import type { Metadata } from 'next';
import CalorieCalculator from './Calculator';

const canonical = 'https://nepacalc.com/calculator/calorie-calculator/';
const ogImage   = 'https://nepacalc.com/og-image.png';

export const metadata: Metadata = {
  title: 'Daily Calorie Calculator | Estimate Your Needs',
  description:
    'Use this daily calorie calculator to estimate maintenance calories and daily targets for weight loss or gain based on your age, body size, and activity.',
  alternates: {
    canonical,
    languages: { 'en-NP': canonical, 'x-default': canonical },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Daily Calorie Calculator | Estimate Your Needs',
    description:
      'Use this daily calorie calculator to estimate maintenance calories and daily targets for weight loss or gain based on your age, body size, and activity.',
    url: canonical,
    siteName: 'NepaCalc Nepal',
    type: 'website',
    locale: 'en_NP',
    images: [{ url: ogImage, width: 1200, height: 630, alt: 'Daily Calorie Calculator' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Daily Calorie Calculator | Estimate Your Needs',
    description:
      'Use this daily calorie calculator to estimate maintenance calories and daily targets for weight loss or gain based on your age, body size, and activity.',
    images: [ogImage],
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  '@id': 'https://nepacalc.com/calculator/calorie-calculator/#breadcrumb',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://nepacalc.com/' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://nepacalc.com/calculator/' },
    { '@type': 'ListItem', position: 3, name: 'Calorie Calculator', item: 'https://nepacalc.com/calculator/calorie-calculator/' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I calculate my daily calorie needs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Daily calorie needs are estimated using your age, sex, height, weight, and activity level. A calorie calculator uses these details to estimate your BMR and TDEE to provide a daily calorie target.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are maintenance calories?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Maintenance calories are the estimated number of calories you need each day to maintain your current weight. Your activity level and personal characteristics determine this figure.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does activity level affect how many calories I need?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Physical activity increases the total energy your body burns each day. A more active routine requires more energy than a sedentary routine, though exact energy expenditure varies between individuals.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can a calorie calculator tell me how many calories to eat to lose weight?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A calorie calculator estimates a lower daily calorie target relative to your maintenance needs (such as a 500 kcal deficit). However, the result is an estimate and does not guarantee a specific rate of weight change.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is a calorie calculator result exact?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Calorie calculators provide estimates based on mathematical population models. Your actual daily energy expenditure may vary.',
      },
    },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <CalorieCalculator />
    </>
  );
}
