import { MetadataRoute } from 'next';
import { fetchFirestoreCollection } from '@/lib/firestore-rest';
import { CATEGORIES, CALCULATORS } from '@/data/calculators';
import { CATEGORY_URL_MAP } from '@/config/GlobalConfig';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://nepacalc.com';
  // Use a slightly older date as base to avoid "too fresh" duplicate timestamp issues
  const lastModDate = new Date('2026-04-20T10:00:00Z');

  // 1. Static Core Pages
  const staticPages = [
    '',
    '/about',
    '/pricing',
    '/blog',
    '/contact',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}/`,
    lastModified: lastModDate,
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // 2. Canonical Pillar Pages (Hubs)
  const pillarPages = CATEGORIES.map((cat) => ({
    url: `${baseUrl}${CATEGORY_URL_MAP[cat.id.toLowerCase()] || `/${cat.id}/`}`,
    lastModified: new Date('2026-04-22T08:30:00Z'),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }));

  // 3. Institutional Calculation Hubs (Individual Tools)
  const calculatorPages = CALCULATORS.map((calc) => {
    const isDirectRoute = calc.slug.includes('/');
    const isMarketRate = calc.category === 'market' || calc.slug.includes('market-rates');
    
    return {
      url: isDirectRoute ? `${baseUrl}/${calc.slug}/` : `${baseUrl}/calculator/${calc.slug}/`,
      lastModified: isMarketRate ? new Date() : new Date('2026-04-24T12:00:00Z'),
      changeFrequency: isMarketRate ? ('daily' as const) : ('monthly' as const),
      priority: 0.7,
    };
  });

  // 4. Dynamic Content (Blogs & Guides)
  let dynamicPages: any[] = [];
  try {
    const posts = await fetchFirestoreCollection('posts');
    const guides = await fetchFirestoreCollection('seo_pages');

    const blogPages = posts.map((post: any) => ({
      url: `${baseUrl}/blog/${post.slug}/`,
      lastModified: new Date(post.updatedAt || new Date()),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));

    const guidePages = guides.map((guide: any) => ({
      url: `${baseUrl}/guide/${guide.slug}/`,
      lastModified: new Date('2026-04-25T05:00:00Z'),
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
