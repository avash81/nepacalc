import { Metadata } from 'next';

export const SITE_CONFIG = {
  name: 'NepaCalc',
  domain: 'nepacalc.com',
  baseUrl: 'https://nepacalc.com',
  twitter: '@nepacalcnp',
};

/**
 * SEO Generator — Strictly follows "No Special Characters" Rule
 * No pipes, no dashes, no ampersands, no colons.
 */
export function calcMeta({ title, description, slug, keywords = [], canonical }: { title: string; description: string; slug: string; keywords?: string[]; canonical?: string }): Metadata {
  const ogImage = `${SITE_CONFIG.baseUrl}/api/og?title=${encodeURIComponent(title)}`;
  
  // Clean Title — Brand enforced at end with a space, NO symbols
  let seoTitle = title
    .replace(/[|&—\-_:]/g, ' ') // Remove symbols
    .replace(/\s+/g, ' ')       // Normalize spaces
    .trim();

  const brandSuffix = ` ${SITE_CONFIG.name}`;
  if (!seoTitle.toLowerCase().includes(SITE_CONFIG.name.toLowerCase())) {
    if (seoTitle.length + brandSuffix.length > 60) {
      seoTitle = seoTitle.substring(0, 60 - brandSuffix.length).trim();
    }
    seoTitle = `${seoTitle}${brandSuffix}`;
  } else if (seoTitle.length > 60) {
    seoTitle = seoTitle.substring(0, 60).trim();
  }
  
  // Clean Description — Must end with Brand reference or CTA
  let seoDescription = description
    .replace(/[|&—\-_:]/g, ' ') // Remove symbols
    .replace(/\s+/g, ' ')       // Normalize spaces
    .trim();

  const descSuffix = ' Try NepaCalc now.';
  if (!seoDescription.toLowerCase().includes('nepacalc')) {
    if (seoDescription.length + descSuffix.length > 160) {
      seoDescription = seoDescription.substring(0, 160 - descSuffix.length).trim();
    }
    seoDescription = `${seoDescription}${descSuffix}`;
  } else if (seoDescription.length > 160) {
    seoDescription = seoDescription.substring(0, 160).trim();
  }

  const globalKeywords = [...new Set([...keywords, 'NepaCalc', 'Nepal Calculator', 'Free Online Tools'])];

  // Fix slug formatting for canonical (ensure no double slashes and ends with slash)
  const cleanSlug = slug.startsWith('/') ? slug.substring(1) : slug;
  let canonicalPath = canonical ? canonical : (cleanSlug.includes('/') ? `/${cleanSlug}/` : `/calculator/${cleanSlug}/`);
  
  // Ensure it starts with / and ends with /
  if (!canonicalPath.startsWith('/')) canonicalPath = '/' + canonicalPath;
  if (!canonicalPath.endsWith('/')) canonicalPath += '/';
  
  const canonicalUrl = `${SITE_CONFIG.baseUrl}${canonicalPath.replace(/\/+/g, '/')}`;

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: globalKeywords,
    openGraph: {
      url: canonicalUrl,
      siteName: 'NepaCalc Nepal',
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
