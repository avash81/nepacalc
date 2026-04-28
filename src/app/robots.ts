import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/admin/',
        '/search/',
        '/*?*', // Block query parameters to avoid duplicate content
      ],
    },
    sitemap: 'https://nepacalc.com/sitemap.xml',
  };
}
