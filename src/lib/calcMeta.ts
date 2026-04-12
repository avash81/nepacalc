import { Metadata } from 'next';

export const SITE_CONFIG = {
  name: 'CalcPro.NP',
  domain: 'calcpro.com.np',
  baseUrl: 'https://calcpro.com.np',
  twitter: '@calcpronp',
};

export function calcMeta({ title, description, slug, keywords }: { title: string; description: string; slug: string; keywords: string[] }): Metadata {
  const ogImage = `https://calcpro.com.np/api/og?title=${encodeURIComponent(title)}`;
  
  return {
    title,
    description,
    keywords,
    openGraph: {
      url: `${SITE_CONFIG.baseUrl}/calculator/${slug}`,
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
      canonical: `${SITE_CONFIG.baseUrl}/calculator/${slug}`,
    },
  };
}
