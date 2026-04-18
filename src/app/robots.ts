import { MetadataRoute } from 'next';
import { headers } from 'next/headers';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function robots(): MetadataRoute.Robots {
  let baseUrl = 'https://nepacalc.com';

  try {
    const headersList = headers();
    const host = headersList.get('host');
    if (host) {
      const protocol = host.includes('localhost') ? 'http' : 'https';
      baseUrl = `${protocol}://${host}`;
    }
  } catch (error) {
    if (process.env.VERCEL_URL) {
      baseUrl = `https://${process.env.VERCEL_URL}`;
    } else if (process.env.NEXT_PUBLIC_SITE_URL) {
      baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
    }
  }

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
