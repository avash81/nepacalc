import { Metadata } from 'next';

export const SITE_CONFIG = {
  name: 'NepaCal',
  domain: 'nepacalc.com',
  baseUrl: 'https://nepacalc.com',
  twitter: '@nepacalcnp',
};

/**
 * SEO Generator — Strictly follows "No Special Characters" Rule
 * No pipes, no dashes, no ampersands, no colons.
 */
export function calcMeta({ title, description, slug, keywords = [] }: { title: string; description: string; slug: string; keywords?: string[] }): Metadata {
  const ogImage = `${SITE_CONFIG.baseUrl}/api/og?title=${encodeURIComponent(title)}`;
  
  // Clean Title — Brand enforced at end with a space, NO symbols
  let seoTitle = title
    .replace(/[|&—\-_:]/g, ' ') // Remove symbols
    .replace(/\s+/g, ' ')       // Normalize spaces
    .trim();

  if (!seoTitle.toLowerCase().includes(SITE_CONFIG.name.toLowerCase())) {
    seoTitle = `${seoTitle} ${SITE_CONFIG.name}`;
  }
  
  // Clean Description — Must end with Brand reference or CTA
  let seoDescription = description
    .replace(/[|&—\-_:]/g, ' ') // Remove symbols
    .replace(/\s+/g, ' ')       // Normalize spaces
    .trim();

  if (!seoDescription.toLowerCase().includes('nepacal')) {
    seoDescription = `${seoDescription} Try NepaCal now`;
  }

  // Length Control
  seoTitle = seoTitle.length > 60 ? seoTitle.substring(0, 60) : seoTitle;
  seoDescription = seoDescription.length > 160 ? seoDescription.substring(0, 160) : seoDescription;

  const globalKeywords = [...new Set([...keywords, 'NepaCal', 'Nepal Calculator', 'Free Online Tools'])];

  // Fix slug formatting for canonical (ensure no double slashes and ends with slash)
  const cleanSlug = slug.startsWith('/') ? slug.substring(1) : slug;
  const canonicalPath = cleanSlug.includes('/') ? `/${cleanSlug}/` : `/calculator/${cleanSlug}/`;
  const canonicalUrl = `${SITE_CONFIG.baseUrl}${canonicalPath.replace(/\/+/g, '/')}`;

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: globalKeywords,
    openGraph: {
      url: canonicalUrl,
      siteName: 'NepaCal Nepal',
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
      canonical: canonicalUrl,
      languages: {
        'en-NP': canonicalUrl,
        'x-default': canonicalUrl
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
