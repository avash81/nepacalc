import { CATEGORIES } from '@/data/calculators';
import CategoryClient from './CategoryClient';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return CATEGORIES.map((cat) => ({
    category: cat.id,
  }));
}

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  const category = CATEGORIES.find(c => c.id === params.category);
  if (!category) return { title: 'Not Found' };

  return {
    title: `${category.name} Tools | NEPACALC`,
    description: `Professional ${category.name.toLowerCase()} calculators and tools for the Nepali market.`,
    alternates: {
      canonical: `https://nepacalc.com/calculators/${category.id}`
    }
  };
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  return <CategoryClient categoryId={params.category} />;
}
