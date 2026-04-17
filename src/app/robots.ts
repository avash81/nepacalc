import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nepacalc.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/',
        '/api/',
        '/_next/',
        '/calculator/category/', // Disallow the internal un-rewritten paths to favor pillars
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
