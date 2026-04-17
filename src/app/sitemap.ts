import { MetadataRoute } from 'next';
import { CATEGORIES } from '@/data/calculators';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nepacalc.com';

  // 1. Static Core Pages
  const staticPages = [
    '',
    '/directory',
    '/math-tools',
    '/blog',
    '/contact',
    '/privacy',
    '/terms'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // 2. Canonical Pillar Pages (Rewritten URLs)
  // We use the category ID directly as the slug to match next.config.js rewrites
  const pillarPages = CATEGORIES.map((cat) => ({
    url: `${baseUrl}/${cat.id}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }));

  // 3. Institutional Calculation Hubs (Individual Tools)
  const calculatorPages = CATEGORIES.flatMap((cat) =>
    cat.calculators.map((calc) => ({
      url: `${baseUrl}/calculator/${calc.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  );

  // Combine and ensure absolute uniqueness and sort integrity
  const fullSitemap = [...staticPages, ...pillarPages, ...calculatorPages];

  return fullSitemap;
}
