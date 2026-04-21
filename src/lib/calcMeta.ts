import { Metadata } from 'next';

export const SITE_CONFIG = {
  name: 'NEPACALC',
  domain: 'nepacalc.com',
  baseUrl: 'https://nepacalc.com',
  twitter: '@nepacalcnp',
};

export function calcMeta({ title, description, slug, keywords }: { title: string; description: string; slug: string; keywords: string[] }): Metadata {
  const ogImage = `${SITE_CONFIG.baseUrl}/api/og?title=${encodeURIComponent(title)}`;
  
  // SEO Truncation Mastery
  const seoTitle = title.length > 60 ? title.substring(0, 57) + '...' : title;
  const seoDescription = description.length > 155 ? description.substring(0, 152) + '...' : description;

  return {
    title: seoTitle,
    description: seoDescription,
    keywords,
    openGraph: {
      url: slug.includes('/') ? `${SITE_CONFIG.baseUrl}/${slug}` : `${SITE_CONFIG.baseUrl}/calculator/${slug}`,
      siteName: SITE_CONFIG.name,
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: slug.includes('/') ? `${SITE_CONFIG.baseUrl}/${slug}` : `${SITE_CONFIG.baseUrl}/calculator/${slug}`,
      languages: {
        'en-NP': slug.includes('/') ? `${SITE_CONFIG.baseUrl}/${slug}` : `${SITE_CONFIG.baseUrl}/calculator/${slug}`,
        'x-default': slug.includes('/') ? `${SITE_CONFIG.baseUrl}/${slug}` : `${SITE_CONFIG.baseUrl}/calculator/${slug}`
      }
    },
  };
}
