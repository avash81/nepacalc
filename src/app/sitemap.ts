import { MetadataRoute } from 'next';
import { fetchFirestoreCollection } from '@/lib/firestore-rest';
import { CATEGORIES, CALCULATORS } from '@/data/calculators';
import { CATEGORY_URL_MAP } from '@/config/GlobalConfig';
import fs from 'fs';
import path from 'path';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://nepacalc.com';
  const cleanUrl = (route: string) => {
    try {
      const url = new URL(route, baseUrl);
      let pathname = url.pathname.replace(/\/+/g, '/');
      if (!pathname.endsWith('/')) pathname += '/';
      url.pathname = pathname;
      return url.href;
    } catch (e) {
      return baseUrl;
    }
  };
  // Updated to today to signal fresh content to crawlers
  const lastModDate = new Date();

  let goldRateDate = lastModDate;
  let forexDate = lastModDate;

  try {
    const fxPath = path.join(process.cwd(), 'public', 'data', 'forex-rates.json');
    if (fs.existsSync(fxPath)) {
      const fxData = JSON.parse(fs.readFileSync(fxPath, 'utf8'));
      if (fxData.nrb_date) {
        forexDate = new Date(fxData.nrb_date + 'T00:00:00Z');
      }
    }
  } catch (e) {
    console.error('sitemap forex date read error:', e);
  }
  try {
    const mrPath = path.join(process.cwd(), 'public', 'data', 'market-rates.json');
    if (fs.existsSync(mrPath)) {
      const mrData = JSON.parse(fs.readFileSync(mrPath, 'utf8'));
      if (mrData.rate_date) {
        goldRateDate = new Date(mrData.rate_date + 'T00:00:00Z');
      }
    }
  } catch (e) {
    console.error('sitemap gold date read error:', e);
  }

  // History year pages — 2019 through 2026, daily updates, high priority for SEO
  const historyYearPages = ['2026', '2025', '2024', '2023', '2022', '2021', '2020', '2019'].map((yr) => ({
    url: cleanUrl(`/market-rates/history/${yr}`),
    lastModified: yr === '2026' ? new Date() : new Date(`${yr}-12-31T00:00:00Z`),
    changeFrequency: yr === '2026' ? ('daily' as const) : ('monthly' as const),
    priority: yr === '2026' ? 0.9 : yr === '2025' ? 0.88 : 0.8,
  }));

  // 1. Static Core Pages
  const staticPages = [
    '',
    '/about',
    '/about/editorial-policy',
    '/about/math-team',
    '/changelog',
    '/pricing',
    '/blog',
    '/blog/momo-calories',
    '/contact',
    '/privacy',
    '/terms',
    '/electricity/nepal-unit-price',
    '/electricity/nea-tariff-rates',
    '/engineering',
    '/engineering/3d',
    '/engineering/geometry',
    '/finance',
    '/health',
    '/converters',
    '/nepal',
    '/water',
    '/water/kukl-bill-payment',
    '/nepal/nepal-budget',
    '/market-rates', '/market-rates/history',
    '/guide',
    '/how-much-gold-can-you-bring-to-nepal',
    '/nepal/bluebook-renewal-nepal',
    '/income-tax',
    '/income-tax/nepal-income-tax-slab-2083-84',
    '/income-tax/how-to-calculate-income-tax-nepal',
  ].map((route) => ({
    url: cleanUrl(route),
    lastModified: (route === '/electricity/nepal-unit-price' || route === '/electricity/nea-tariff-rates') ? new Date('2026-06-19T00:00:00Z') : (route === '/engineering/3d' || route === '/nepal/nepal-budget') ? new Date() : ((route === '/market-rates' || route === '/market-rates/history') ? goldRateDate : lastModDate),
    changeFrequency: (route === '/market-rates' || route === '/market-rates/history') ? ('daily' as const) : ('weekly' as const),
    priority: route === '' ? 1.0 :
              route === '/engineering/3d' ? 0.95 :
              route === '/nepal/nepal-budget' ? 0.95 :
              route === '/nepal/bluebook-renewal-nepal' ? 0.9 :
              route === '/market-rates/history' ? 0.9 :
              (route === '/about/editorial-policy' || route === '/about/math-team' || route === '/changelog') ? 0.8 :
              (route === '/electricity/nea-tariff-rates' || route === '/electricity/nepal-unit-price') ? 0.85 : 0.85,
  }));

  // Image Sitemap for 3D Graph Calculator Mathematical Surfaces
  const imageSitemapEntries = [
    { url: 'https://nepacalc.com/engineering/3d/', images: [
      { loc: 'https://nepacalc.com/images/math/sphere.webp', caption: '3D Graph of a Sphere', title: '3D Sphere Mathematical Surface' },
      { loc: 'https://nepacalc.com/images/math/torus.webp', caption: '3D Graph of a Torus', title: '3D Torus Mathematical Surface' },
      { loc: 'https://nepacalc.com/images/math/cone.webp', caption: '3D Graph of a Cone', title: '3D Cone Mathematical Surface' },
      { loc: 'https://nepacalc.com/images/math/hyperboloid.webp', caption: '3D Graph of a Hyperboloid', title: '3D Hyperboloid Mathematical Surface' },
      { loc: 'https://nepacalc.com/images/math/saddle.webp', caption: '3D Saddle Surface Graph', title: '3D Saddle Surface - Hyperbolic Paraboloid' },
      { loc: 'https://nepacalc.com/images/math/gaussian.webp', caption: '3D Gaussian Surface Graph', title: '3D Gaussian Surface' },
      { loc: 'https://nepacalc.com/images/math/wireframe.webp', caption: '3D Wireframe Rendering Example', title: '3D Graph Wireframe Mode' },
      { loc: 'https://nepacalc.com/images/math/coordinate-system.webp', caption: '3D Cartesian Coordinate System', title: '3D Coordinate Axes' },
    ]},
  ];

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
      lastModified: calc.slug === 'nea-bill' ? new Date('2026-06-19T00:00:00Z') : (isGoldPage || calc.slug.includes('silver') ? goldRateDate : (isMarketRate ? forexDate : lastModDate)),
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

  const allEntries = [...staticPages, ...historyYearPages, ...pillarPages, ...calculatorPages, ...staticBlogPosts, ...dynamicPages];
  
  // Deduplicate by URL to ensure a clean sitemap
  return Array.from(new Map(allEntries.map(item => [item.url, item])).values());
}

