import { MetadataRoute } from 'next';
import { headers } from 'next/headers';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

export default function robots(): MetadataRoute.Robots {
  const host = headers().get('host') || 'www.nepacalc.com';
  const protocol = host.includes('localhost') ? 'http' : 'https';
  const baseUrl = `${protocol}://${host}`;

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/',
        '/api/',
        '/_next/',
        '/calculator/category/', 
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
