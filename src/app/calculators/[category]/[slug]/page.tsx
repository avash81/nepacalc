import { CALCULATORS } from '@/data/calculators';
import CalculatorClient from './CalculatorClient';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return CALCULATORS.map((calc) => ({
    category: calc.category,
    slug: calc.slug,
  }));
}

export async function generateMetadata({ params }: { params: { category: string, slug: string } }): Promise<Metadata> {
  const calc = CALCULATORS.find(c => c.slug === params.slug);
  if (!calc) return { title: 'Not Found' };

  return {
    title: `${calc.name} | NEPACALC`,
    description: calc.description,
    openGraph: {
      title: calc.name,
      description: calc.description,
      url: `https://nepacalc.com/calculators/${params.category}/${calc.slug}`,
      siteName: 'NEPACALC',
      type: 'article',
    },
    alternates: {
      canonical: `https://nepacalc.com/calculators/${params.category}/${calc.slug}`
    }
  };
}

export default function CalculatorPage({ params }: { params: { category: string, slug: string } }) {
  return <CalculatorClient slug={params.slug} />;
}
