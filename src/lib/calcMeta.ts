import { Metadata } from 'next';

export const SITE_CONFIG = {
  name: 'NEPACALC',
  domain: 'nepacalc.com',
  baseUrl: 'https://nepacalc.com',
  twitter: '@nepacalcnp',
};

export function calcMeta({ title, description, slug, keywords = [] }: { title: string; description: string; slug: string; keywords?: string[] }): Metadata {
  const ogImage = `${SITE_CONFIG.baseUrl}/api/og?title=${encodeURIComponent(title)}`;
  
  // SEO Truncation & Brand Enforcement Mastery
  let displayTitle = title;
  if (!displayTitle.includes(SITE_CONFIG.name)) {
    displayTitle = `${title} | ${SITE_CONFIG.name}`;
  }
  
  const seoTitle = displayTitle.length > 60 ? displayTitle.substring(0, 57) + '...' : displayTitle;
  const seoDescription = description.length > 155 ? description.substring(0, 152) + '...' : description;

  // Force Brand Keywords Globally
  const globalKeywords = [...new Set([...keywords, 'NEPACALC', 'Official NEPACALC', 'Nepal Calculator Platform', 'Interactive 3D Plotter'])];

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: globalKeywords,
    openGraph: {
      url: slug.includes('/') ? `${SITE_CONFIG.baseUrl}/${slug}` : `${SITE_CONFIG.baseUrl}/calculator/${slug}`,
      siteName: 'NEPACALC — Official Mathematical Platform',
      title: seoTitle,
      description: seoDescription,
      type: 'website',
      locale: 'en_NP',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: seoTitle,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      images: [ogImage],
    },
    alternates: {
      canonical: slug.includes('/') ? `${SITE_CONFIG.baseUrl}/${slug}` : `${SITE_CONFIG.baseUrl}/calculator/${slug}`,
      languages: {
        'en-NP': slug.includes('/') ? `${SITE_CONFIG.baseUrl}/${slug}` : `${SITE_CONFIG.baseUrl}/calculator/${slug}`,
        'x-default': slug.includes('/') ? `${SITE_CONFIG.baseUrl}/${slug}` : `${SITE_CONFIG.baseUrl}/calculator/${slug}`
      }
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}
