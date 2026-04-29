import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: [
        '/',
        '/favicon.ico',
        '/favicon.png',
        '/favicon-48x48.png',
        '/logo.png'
      ],
      disallow: [
        '/api/',
        '/admin/',
        '/search/',
      ],
    },
    sitemap: 'https://nepacalc.com/sitemap.xml',
  };
}
