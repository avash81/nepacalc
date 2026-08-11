import { Metadata } from 'next';

export const SITE_CONFIG = {
  name: 'NepaCalc',
  domain: 'nepacalc.com',
  baseUrl: 'https://nepacalc.com',
  twitter: '@nepacalc',
};

/**
 * SEO Generator — Strictly follows "No Special Characters" Rule
 * No pipes, no dashes, no ampersands, no colons.
 */
export function calcMeta({ title, description, slug, keywords = [], canonical, ogImage: customOgImage }: { title: string; description: string; slug: string; keywords?: string[]; canonical?: string; ogImage?: string }): Metadata {
  const ogImage = customOgImage ? customOgImage : `${SITE_CONFIG.baseUrl}/og-image.png`;
  
  // Keep standard SEO punctuation: commas, pipes, ampersands, hyphens
  let seoTitle = title.trim();

  const brandSuffix = ` | ${SITE_CONFIG.name}`;
  if (!seoTitle.toLowerCase().includes(SITE_CONFIG.name.toLowerCase())) {
    if (seoTitle.length + brandSuffix.length > 60) {
      seoTitle = seoTitle.substring(0, 60 - brandSuffix.length).trim();
    }
    seoTitle = `${seoTitle}${brandSuffix}`;
  } else if (seoTitle.length > 60) {
    seoTitle = seoTitle.substring(0, 60).trim();
  }
  
  // Clean Description — Must end with Brand reference or CTA
  let seoDescription = description.trim();

  const descSuffix = ' Try NepaCalc now.';
  if (!seoDescription.toLowerCase().includes('nepacalc')) {
    if (seoDescription.length + descSuffix.length > 155) {
      seoDescription = seoDescription.substring(0, 155 - descSuffix.length).trim();
    }
    seoDescription = `${seoDescription}${descSuffix}`;
  } else if (seoDescription.length > 155) {
    seoDescription = seoDescription.substring(0, 155).trim();
  }

  const globalKeywords = [...new Set([...keywords, 'NepaCalc', 'Nepal Calculator', 'Free Online Tools'])];

  // Fix slug formatting for canonical (ensure no double slashes and ends with slash)
  const cleanSlug = slug.startsWith('/') ? slug.substring(1) : slug;
  
  // Categorization Logic for Canonical URLs
  const rootCategories = ['nepal', 'finance', 'health', 'education', 'utility', 'engineering', 'market-rates', 'forex', 'investment', 'retail', 'financial', 'math-tools', 'converters', 'directory', 'guide', 'blog', 'search', 'sitemap', 'pricing', 'about', 'contact', 'terms', 'privacy', 'electricity'];
  const isRootLevel = rootCategories.includes(cleanSlug.split('/')[0]);

  let canonicalPath = canonical ? canonical : (isRootLevel ? `/${cleanSlug}/` : `/calculator/${cleanSlug}/`);

  let canonicalUrl: string;
  try {
    const url = new URL(canonicalPath, SITE_CONFIG.baseUrl);
    let pathname = url.pathname.replace(/\/+/g, '/');
    if (!pathname.endsWith('/')) pathname += '/';
    url.pathname = pathname;
    canonicalUrl = url.href;
  } catch (e) {
    canonicalUrl = SITE_CONFIG.baseUrl;
  }

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

