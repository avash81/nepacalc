import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  ...calcMeta({
    title: 'Free Area Calculator – Find Area of Any Shape Online',
    description:
      'Free online area calculator to find the area of any shape: square, rectangle, circle, triangle, trapezoid, parallelogram or ellipse. Instant results in m², sq ft, acres and hectares.',
    slug: 'area-calculator',
    keywords: [
      'area calculator',
      'online area calculator',
      'free area calculator',
      'shape area calculator',
      'find area',
      'calculate area formula',
      'area formula calculator',
      'total area calculator',
      'net area calculator',
      'area computation',
      'area measurement',
      'area measurement tool',
      'measure area online',
      'area solver',
      'chetrafal calculator',
    ],
  }),
  openGraph: {
    title: 'Free Area Calculator – Find the Area of Any 2D Shape Online',
    description:
      'Find the area of squares, rectangles, circles, triangles, trapezoids, parallelograms, and ellipses. Instant metric, imperial, acre and hectare conversions.',
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
      name: 'How do I calculate the area of an irregular plot or field?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Divide the plot into non-overlapping triangles, measure each triangle\'s three side lengths, and apply Heron\'s formula (A = √[s(s-a)(s-b)(s-c)]) to each sub-area, then sum them. This triangulation method works for any irregular polygon, field, or land parcel.',
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
      name: 'How many square feet are in 1 acre?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'One acre equals exactly 43,560 square feet (4,046.86 m² or 0.4047 hectares). It is the standard land unit in the US, UK, Canada, and parts of South Asia, roughly the size of a standard football field.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between an acre and a hectare?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A hectare equals 10,000 square meters (107,639 sq ft or 2.471 acres), the standard in metric countries: Europe, Australia, China, and most of Asia. An acre (43,560 sq ft) is used in the US, UK, and Canada. Both appear automatically in the multi-unit results table above.',
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
    {
      '@type': 'Question',
      name: 'How is net area calculated for wall painting?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Net wall area equals total gross wall area (2 × (Length + Width) × Height) minus openings for doors and windows. This gives the exact paintable surface area to estimate paint gallons or liters.',
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
