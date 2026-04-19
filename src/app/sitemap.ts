import { MetadataRoute } from 'next';
import { fetchFirestoreCollection } from '@/lib/firestore-rest';
import { CATEGORIES } from '@/data/calculators';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Use environment variables for the absolute URL or fallback to the provided Verel URL
  const baseUrl = 'https://nepacalc.com';

  // 1. Static Core Pages
  const staticPages = [
    '',
    '/directory',
    '/blog',
    '/contact',
    '/privacy',
    '/terms',
    '/engineering',
    '/engineering/graphing',
    '/engineering/3d',
    '/engineering/geometry',
    '/engineering/formulas'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // 2. Canonical Pillar Pages (Rewritten URLs)
  const catIdToSlug: Record<string, string> = {
    utility: 'converters',
    education: 'math-tools',
  };

  const pillarPages = CATEGORIES.map((cat) => ({
    url: `${baseUrl}/${catIdToSlug[cat.id] || cat.id}`,
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

  // 4. Dynamic Content (Blogs & Guides)
  let dynamicPages: any[] = [];
  try {
    const posts = await fetchFirestoreCollection('posts');
    const guides = await fetchFirestoreCollection('seo_pages');

    const blogPages = posts.map((post: any) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt || new Date()),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));

    const guidePages = guides.map((guide: any) => ({
      url: `${baseUrl}/guide/${guide.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));

    dynamicPages = [...blogPages, ...guidePages];
  } catch (e) {
    console.error('Sitemap dynamic fetch failed:', e);
  }

  return [...staticPages, ...pillarPages, ...calculatorPages, ...dynamicPages];
}
