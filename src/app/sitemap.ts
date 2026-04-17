import { MetadataRoute } from 'next';
import { CATEGORIES } from '@/data/calculators';
import { headers } from 'next/headers';

export const dynamic = 'force-dynamic';

export default function sitemap(): MetadataRoute.Sitemap {
  const headersList = headers();
  const host = headersList.get('host');
  const protocol = host?.includes('localhost') ? 'http' : 'https';
  
  // Dynamic Base Resolution: Use current host or default to production
  const baseUrl = host ? `${protocol}://${host}` : (process.env.NEXT_PUBLIC_SITE_URL || 'https://nepacalc.com');

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

  return [...staticPages, ...pillarPages, ...calculatorPages];
}
