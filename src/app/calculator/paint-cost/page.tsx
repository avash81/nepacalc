import { calcMeta } from '@/lib/calcMeta';
import PaintCalculator from './Calculator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  ...calcMeta({
    title: 'Paint Calculator Online: Estimate Paint Needed',
    description:
      'Estimate paint quantity and cost for your project. Enter your wall area, number of coats, coverage per litre and paint price to calculate how much paint you need.',
    slug: 'calculator/paint-cost',
    keywords: [
      'paint calculator',
      'paint calculator online',
      'paint calculator nepal',
      'how much paint do i need',
      'paint coverage calculator',
      'paint cost calculator',
      'wall paint calculator',
      'room paint calculator',
      'paint calculator for one wall',
      'paint coverage per litre',
      'painting cost calculator nepal',
      'interior paint calculator',
      'ceiling paint calculator',
      'gloss paint calculator',
      'masonry paint coverage calculator',
      '1 litre paint coverage in square feet',
      'how to calculate paint coverage in litres',
      'how to calculate square footage for painting',
    ],
  }),
  openGraph: {
    title: 'How Much Paint Do You Need for Your Project?',
    description:
      'Find your estimated paint requirement using surface area, coverage per litre and number of coats. Add your paint price to estimate material cost.',
    url: 'https://nepacalc.com/calculator/paint-cost/',
    siteName: 'NepaCalc',
    type: 'website',
    images: [
      {
        url: 'https://nepacalc.com/images/og/paint-calculator-nepal.jpg',
        width: 1200,
        height: 630,
        alt: 'Paint Calculator - Estimate Paint Quantity and Cost in Nepal',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paint Quantity Calculator for Your Walls',
    description:
      "Calculate the paint needed for your measured area. Use your paint's coverage rate and number of coats to estimate the litres required.",
    images: ['https://nepacalc.com/images/og/paint-calculator-nepal.jpg'],
  },
  alternates: {
    canonical: 'https://nepacalc.com/calculator/paint-cost/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  '@id': 'https://nepacalc.com/calculator/paint-cost/#breadcrumb',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://nepacalc.com/' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://nepacalc.com/calculator/' },
    { '@type': 'ListItem', position: 3, name: 'Paint Calculator', item: 'https://nepacalc.com/calculator/paint-cost/' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How can I calculate how much paint I need?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Measure the surface you want to paint, subtract the area of doors and windows if they will not be painted, and multiply the result by the number of coats. Then divide by the paint coverage per litre. Formula: Paint required (litres) = Net paintable area (sq ft) × Number of coats ÷ Coverage (sq ft per litre per coat). Check the paint container or technical data sheet for its stated coverage rate.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much paint do I need for a 100 sq ft wall?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For a 100 sq ft wall, assuming the paint covers 100 sq ft per litre per coat, you would need approximately 1 litre for one coat or 2 litres for two coats. This estimate excludes extra paint for touch-ups and wastage. Actual requirements depend on the paint product and the condition of the wall.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much paint do I need for 500 sq ft?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For 500 sq ft of paintable surface, using a coverage rate of 100 sq ft per litre per coat, the estimate is 5 litres for one coat or 10 litres for two coats. Use the coverage rate on your chosen paint product for a more accurate result.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much paint do I need for a 12 × 12 room?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A room measuring 12 × 12 ft has a floor area of 144 sq ft, but that is not the total area of its walls. To calculate wall paint, you also need the wall height and the area of any doors or windows that will not be painted. For the ceiling, the area would be 144 sq ft if the ceiling has the same length and width as the floor. Calculate walls and ceiling separately if both will be painted.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much area does 1 litre of paint cover?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A typical estimate is around 100-120 sq ft per litre for one coat on a smooth wall, but coverage varies by product and surface. Rough, porous, or unprepared surfaces may require more paint. Always check the manufacturer coverage information.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the formula for calculating paint coverage in litres?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'First calculate the net paintable area. Divide that area by the coverage per litre, then multiply by the number of coats. For example, a 500 sq ft surface using paint that covers 130 sq ft per litre per coat requires approximately 7.7 litres for two coats: 500 ÷ 130 × 2 = 7.69 litres.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does a paint calculator include doors, windows, and ceilings?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'That depends on the calculator mode. In our calculator, One Wall and Room modes allow you to deduct standard doors and windows, and Room mode has a toggle to include the ceiling area. You can also calculate the ceiling separately using Ceiling mode.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I calculate paint cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Multiply the required litres by the price per litre to estimate the paint cost. If you want the full project cost, add any primer, other materials, and labour charges that apply. Prices vary by product and location, so use current local prices in NPR rather than relying on estimates from another country.',
      },
    },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PaintCalculator />
    </>
  );
}
