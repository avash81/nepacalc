import { MetadataRoute } from 'next';
import { headers } from 'next/headers';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://calculator-workbro81-2035s-projects.vercel.app';

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
