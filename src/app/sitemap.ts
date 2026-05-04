import { MetadataRoute } from 'next';
import { fetchFirestoreCollection } from '@/lib/firestore-rest';
import { CATEGORIES, CALCULATORS } from '@/data/calculators';
import { CATEGORY_URL_MAP } from '@/config/GlobalConfig';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://nepacalc.com';
  // Use a fixed date for base modified to optimize crawl budget
  const lastModDate = new Date('2026-04-28T10:00:00Z');

  // 1. Static Core Pages
  const staticPages = [
    '',
    '/about',
    '/pricing',
    '/blog',
    '/contact',
    '/privacy',
    '/terms',
    '/directory',
    '/engineering',
    '/engineering/3d',
    '/engineering/geometry',
    '/finance',
    '/health',
    '/converters',
    '/nepal',
    '/market-rates',
    '/guide',
  ].map((route) => ({
    url: `${baseUrl}${route}/`,
    lastModified: lastModDate,
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : route === '/directory' ? 0.95 : 0.85,
  }));

  // 2. Canonical Pillar Pages (Hubs)
  const pillarPages = CATEGORIES.map((cat) => {
    let path = CATEGORY_URL_MAP[cat.id.toLowerCase()] || `/${cat.id}/`;
    if (!path.endsWith('/')) path += '/';
    return {
      url: `${baseUrl}${path}`,
      lastModified: lastModDate,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    };
  });

  // 3. Institutional Calculation Hubs (Individual Tools)
  const calculatorPages = CALCULATORS.map((calc) => {
    const isDirectRoute = calc.slug.includes('/');
    const isMarketRate = calc.category === 'market' || calc.slug.includes('market-rates');
    const isCritical = ['nepal-income-tax', 'nepal-salary', 'loan-emi', 'sip-calculator', 'nepal-land'].includes(calc.id);
    
    return {
      url: isDirectRoute ? `${baseUrl}/${calc.slug}/` : `${baseUrl}/calculator/${calc.slug}/`,
      lastModified: isMarketRate ? new Date() : lastModDate,
      changeFrequency: isMarketRate ? ('daily' as const) : (isCritical ? 'daily' as const : 'weekly' as const),
      priority: isCritical ? 0.9 : 0.75,
    };
  });

  // 4. Dynamic Content (Blogs & Guides)
  let dynamicPages: any[] = [];
  try {
    const posts = await fetchFirestoreCollection('posts');
    const guides = await fetchFirestoreCollection('seo_pages');

    const blogPages = posts.map((post: any) => ({
      url: `${baseUrl}/blog/${post.slug}/`,
      lastModified: post.updatedAt ? new Date(post.updatedAt) : lastModDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

    const guidePages = guides.map((guide: any) => ({
      url: `${baseUrl}/guide/${guide.slug}/`,
      lastModified: guide.updatedAt ? new Date(guide.updatedAt) : lastModDate,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));

    dynamicPages = [...blogPages, ...guidePages];
  } catch (e) {
    console.error('Sitemap dynamic fetch failed:', e);
  }

  const allEntries = [...staticPages, ...pillarPages, ...calculatorPages, ...dynamicPages];
  
  // Deduplicate by URL to ensure a clean sitemap
  return Array.from(new Map(allEntries.map(item => [item.url, item])).values());
}
