import { MetadataRoute } from 'next';
import { fetchFirestoreCollection } from '@/lib/firestore-rest';
import { CATEGORIES, CALCULATORS } from '@/data/calculators';
import { CATEGORY_URL_MAP } from '@/config/GlobalConfig';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://nepacalc.com';
  // Helper to ensure single slashes and trailing slash
  const cleanUrl = (route: string) => {
    let path = route.replace(/\/+/g, '/');
    if (!path.startsWith('/')) path = '/' + path;
    if (!path.endsWith('/')) path = path + '/';
    // Ensure the baseUrl and path combine correctly without double slashes after the domain
    return `${baseUrl}${path}`.replace(/(https?:\/\/nepacalc\.com)\/+/, '$1/');
  };
  // Use a fixed date for base modified to optimize crawl budget but updated to recent publish date
  const lastModDate = new Date('2026-06-19T00:00:00Z');

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
    '/electricity/nepal-unit-price',
    '/electricity/nea-tariff-rates',
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
    url: cleanUrl(route),
    lastModified: (route === '/electricity/nepal-unit-price' || route === '/electricity/nea-tariff-rates') ? new Date('2026-06-19T00:00:00Z') : lastModDate,
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 
              route === '/directory' ? 0.95 : 
              (route === '/electricity/nea-tariff-rates' || route === '/electricity/nepal-unit-price') ? 0.85 : 0.85,
  }));

  // 2. Canonical Pillar Pages (Hubs)
  const pillarPages = CATEGORIES.map((cat) => {
    let path = CATEGORY_URL_MAP[cat.id.toLowerCase()] || `/${cat.id}/`;
    if (!path.endsWith('/')) path += '/';
    return {
      url: cleanUrl(path),
      lastModified: lastModDate,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    };
  });

  // 3. Institutional Calculation Hubs (Individual Tools)
  const calculatorPages = CALCULATORS.map((calc) => {
    const isDirectRoute = calc.slug.includes('/');
    const isMarketRate = calc.category === 'market' || calc.slug.includes('market-rates');
    const isGoldPage = calc.slug === 'market-rates/live-gold-price';
    const isCritical = ['nepal-income-tax', 'nepal-salary', 'loan-emi', 'sip-calculator', 'nepal-land'].includes(calc.id);
    
    return {
      url: cleanUrl(isDirectRoute ? `/${calc.slug}` : `/calculator/${calc.slug}`),
      lastModified: calc.slug === 'nea-bill' ? new Date('2026-06-19T00:00:00Z') : (isMarketRate ? new Date() : lastModDate),
      changeFrequency: isMarketRate ? ('daily' as const) : (isCritical ? 'daily' as const : 'weekly' as const),
      // Gold price is highest-value page — priority 1.0 (same as homepage)
      priority: isGoldPage ? 1.0 : calc.slug === 'nea-bill' ? 0.95 : (isCritical ? 0.9 : (isMarketRate ? 0.9 : 0.75)),
    };
  });

  // 4. Static Blog Posts (hardcoded routes in /src/app/blog/)
  const staticBlogPosts = [
    { slug: 'nepal-income-tax-guide-2082-83',   date: '2026-05-20' },
    { slug: 'nea-electricity-bill-guide-2082',   date: '2026-05-20' },
    { slug: 'income-tax-filing-guide',           date: '2026-05-16' },
    { slug: 'nepal-tds-guide-2083',              date: '2026-05-16' },
    { slug: 'nrb-base-rate-trends',              date: '2026-05-16' },
    { slug: 'nepal-gold-price-analysis-2083',    date: '2026-05-30' },
    { slug: 'nea-tariff-rates-2083-84',          date: '2026-06-15' },
  ].map(({ slug, date }) => ({
    url: cleanUrl(`/blog/${slug}`),
    lastModified: new Date(date),
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }));

  // 5. Dynamic Content (Blogs & Guides from Firestore)
  let dynamicPages: any[] = [];
  try {
    const posts = await fetchFirestoreCollection('posts');
    const guides = await fetchFirestoreCollection('seo_pages');

    const blogPages = posts.map((post: any) => ({
      url: cleanUrl(`/blog/${post.slug}`),
      lastModified: post.updatedAt ? new Date(post.updatedAt) : lastModDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

    const guidePages = guides.map((guide: any) => ({
      url: cleanUrl(`/guide/${guide.slug}`),
      lastModified: guide.updatedAt ? new Date(guide.updatedAt) : lastModDate,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));

    dynamicPages = [...blogPages, ...guidePages];
  } catch (e) {
    console.error('Sitemap dynamic fetch failed:', e);
  }

  const allEntries = [...staticPages, ...pillarPages, ...calculatorPages, ...staticBlogPosts, ...dynamicPages];
  
  // Deduplicate by URL to ensure a clean sitemap
  return Array.from(new Map(allEntries.map(item => [item.url, item])).values());
}

