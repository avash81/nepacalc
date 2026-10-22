import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  ...calcMeta({
    title: 'Area Calculator – Calculate Area of Any Shape (m², ft², Aana)',
    description:
      'Free online area calculator to calculate surface area for squares, rectangles, circles, triangles, trapezoids, and plots. Supports metric, imperial, and Nepali land units.',
    slug: 'area-calculator',
    keywords: [
      'area calculator',
      'online area calculator',
      'shape area calculator',
      'find area',
      'total area calculator',
      'area computation',
      'area measurement tool',
      'chetrafal calculator',
      'area plot calculator',
      'calculate area formula',
    ],
  }),
  openGraph: {
    title: 'Area Calculator – Calculate Area of Any Shape Online',
    description:
      'Free online area calculator to calculate surface area for squares, rectangles, circles, triangles, trapezoids, and plots with live conversions.',
    url: 'https://nepacalc.com/calculator/area-calculator/',
    siteName: 'NepaCalc',
    type: 'website',
  },
  alternates: {
    canonical: 'https://nepacalc.com/calculator/area-calculator/',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://nepacalc.com/' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://nepacalc.com/calculator/' },
    { '@type': 'ListItem', position: 3, name: 'Area Calculator', item: 'https://nepacalc.com/calculator/area-calculator/' },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Area Calculator',
  operatingSystem: 'All',
  applicationCategory: 'UtilitiesApplication',
  url: 'https://nepacalc.com/calculator/area-calculator/',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  description: 'Interactive 2D shape area calculator supporting metric, imperial, and regional land measurement units.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I calculate the area of a room or floor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Measure the length and width of the room in feet or meters. Multiply length by width to get the square footage or square meters. For example, a 12 ft by 14 ft bedroom has an area of 168 sq ft (15.61 m²). If tiling, add 10% for cutting waste.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I find the area of an irregular plot of land (chetrafal)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Divide the irregular parcel into non-overlapping triangles. Measure the three side lengths of each triangle and apply Heron\'s formula (A = √[s(s-a)(s-b)(s-c)]) to calculate each triangle\'s area, then sum them together for total land area.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I convert square meters (m²) to square feet (sq ft)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '1 square meter equals exactly 10.7639 square feet. To convert square meters to square feet, multiply by 10.7639. To convert square feet to square meters, divide by 10.7639.',
      },
    },
    {
      '@type': 'Question',
      name: 'How many square feet are in 1 Aana and 1 Ropani?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In the Kathmandu Valley and hilly regions of Nepal: 1 Aana = 342.25 square feet (31.80 m²). 1 Ropani = 16 Aana = 5,476 square feet (508.74 m²).',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Heron\'s Formula for triangle area?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Heron\'s formula calculates the area of a triangle when all 3 side lengths (a, b, c) are known without needing perpendicular height. First calculate semi-perimeter s = (a + b + c) / 2. Then Area = √[s × (s - a) × (s - b) × (s - c)].',
      },
    },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Calculator />
    </>
  );
}
