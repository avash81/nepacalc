import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/*?utm_',
          '/*?ref=',
          '/*?source='
        ]
      },
      {
        userAgent: 'bingbot',
        allow: '/',
        crawlDelay: 2
      },
      {
        userAgent: 'YandexBot',
        allow: '/',
        crawlDelay: 5
      },
      {
        userAgent: ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'OAI-SearchBot', 'Google-Extended'],
        allow: '/'
      }
    ],
    sitemap: 'https://nepacalc.com/sitemap.xml',
  };
}

