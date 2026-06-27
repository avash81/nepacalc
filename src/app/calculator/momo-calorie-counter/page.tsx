import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  ...calcMeta({
    title: 'Momo Calorie Calculator – Calories in Chicken, Veg & Buff Momos',
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
    title: 'Momo Calorie Calculator',
    description:
      'Calculate calories in chicken, buff, veg, fried and steamed momos.',
    url: 'https://nepacalc.com/calculator/momo-calorie-counter/',
    siteName: 'NepaCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Momo Calorie Calculator',
    description:
      'Calculate calories in chicken, buff, veg, fried and steamed momos.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
  alternates: {
    canonical: 'https://nepacalc.com/calculator/momo-calorie-counter/',
  },
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://nepacalc.com/calculator/momo-calorie-counter/#webpage',
  url: 'https://nepacalc.com/calculator/momo-calorie-counter/',
  name: 'Momo Calorie Calculator (Chicken, Veg, Fried & Steamed)',
  description:
    'Calculate calories in chicken, veg, fried, steamed, paneer and buff momos instantly. Estimate calories per piece or plate with a detailed nutritional breakdown.',
  inLanguage: 'en',
  isPartOf: {
    '@type': 'WebSite',
    url: 'https://nepacalc.com/',
  },
  breadcrumb: {
    '@id': 'https://nepacalc.com/calculator/momo-calorie-counter/#breadcrumb',
  },
  mainEntity: {
    '@id': 'https://nepacalc.com/calculator/momo-calorie-counter/#app',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  '@id': 'https://nepacalc.com/calculator/momo-calorie-counter/#breadcrumb',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://nepacalc.com/',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Calculators',
      item: 'https://nepacalc.com/calculator/',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Momo Calorie Calculator',
      item: 'https://nepacalc.com/calculator/momo-calorie-counter/',
    },
  ],
};

const softwareAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  '@id': 'https://nepacalc.com/calculator/momo-calorie-counter/#app',
  name: 'Momo Calorie Calculator',
  applicationCategory: 'HealthApplication',
  applicationSubCategory: 'Nutrition Calculator',
  operatingSystem: 'Web Browser',
  url: 'https://nepacalc.com/calculator/momo-calorie-counter/',
  description:
    'Calculate calories in steamed, fried, chicken, veg, paneer, buff and pork momos instantly.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How many calories are in one chicken momo?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'One steamed chicken momo typically contains around 40–60 calories depending on its size, filling and wrapper thickness.',
      },
    },
    {
      '@type': 'Question',
      name: 'How many calories are in steamed momos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Steamed momos generally contain 35–60 calories per piece depending on the filling. Chicken steamed momos are around 60 kcal, veg steamed momos around 45 kcal, and buff steamed momos around 65 kcal.',
      },
    },
    {
      '@type': 'Question',
      name: 'How many calories are in fried momos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Fried momos absorb cooking oil, making them significantly higher in calories than steamed momos. Fried chicken momos contain approximately 85 kcal per piece.',
      },
    },
    {
      '@type': 'Question',
      name: 'How many calories are in one plate of momos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A typical plate of 8–10 steamed chicken momos contains approximately 480–600 calories depending on serving size and filling.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are momos healthy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Steamed momos can be part of a balanced diet. They provide protein and carbohydrates while keeping fat relatively low. Choosing steamed over fried and avoiding high-calorie sauces reduces overall calorie intake.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which momo has the lowest calories?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Steamed vegetable momos have the lowest calorie count, containing approximately 45 calories per piece.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to use the Momo Calorie Calculator',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Select momo type',
      text: 'Choose your momo filling from the dropdown: Chicken, Veg, Buff, Paneer, Pork, Beef, Cheese or others.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Select cooking method',
      text: 'Choose Steamed, Fried, Tandoori, C-Momo or Jhol.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Enter quantity',
      text: 'Use the +/- buttons or quick preset buttons to select the number of pieces.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'View calories and nutrition',
      text: 'Instantly see calories, protein, fat, carbs, fiber, serving weight and daily value percentage.',
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <Calculator />
    </>
  );
}
