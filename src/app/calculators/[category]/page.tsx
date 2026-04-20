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
    title: `${category.name} Calculators | ${category.name} Tools Nepal | NEPACALC`,
    description: `Access professional ${category.name.toLowerCase()} calculators for the Nepali market. Free tools including ${category.calculators.slice(0, 3).map(c => c.name).join(', ')} and more. Accurate, fast, and no sign-up required.`,
    alternates: {
      canonical: `https://nepacalc.com/calculators/${category.id}/`
    }
  };
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  return <CategoryClient categoryId={params.category} />;
}
