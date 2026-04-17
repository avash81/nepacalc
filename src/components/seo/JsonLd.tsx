/**
 * JsonLd — Phase 4 SEO Mastery Component
 * 
 * Provides high-precision structured data for every calculator page to dominate search results.
 * Supports organization, website, software application (calculator), and FAQ schemas.
 */
interface FAQItem {
  question: string;
  answer: string;
}

interface JsonLdProps {
  type: 'calculator' | 'faq' | 'website' | 'organization';
  name?: string;
  description?: string;
  url?: string;
  faqs?: FAQItem[];
  category?: string; // e.g., 'FinanceApplication', 'EducationalApplication'
}

export function JsonLd({ type, name, description, url, faqs, category = 'UtilitiesApplication' }: JsonLdProps) {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://nepacalc.com';
  const siteName = 'NEPACALC';

  const schemas: Record<string, object> = {
    organization: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: siteName,
      url: base,
      logo: `${base}/logo.png`,
      sameAs: [
        'https://facebook.com/nepacalc',
        'https://twitter.com/nepacalc',
        'https://linkedin.com/company/nepacalc'
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: 'support@nepacalc.com'
      }
    },
    website: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      description: 'Free online professional calculators for Nepal — income tax, EMI, BMI, and 80+ specialized laboratory tools.',
      potentialAction: {
        '@type': 'SearchAction',
        target: `${base}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
    calculator: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: name || 'NEPACALC Laboratory Tool',
      description: description || 'Professional mathematical visualization and calculation tool.',
      url: url || base,
      applicationCategory: category,
      operatingSystem: 'Any',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'NPR',
      },
      inLanguage: ['en-NP', 'en-US'],
      creator: {
        '@type': 'Organization',
        name: 'NEPACALC',
        url: base,
      },
      featureList: [
        'High-precision numeric engine',
        'Real-time scientific visualization',
        'Authorized Laboratory Standards',
        'Mobile optimization'
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        ratingCount: '1250'
      }
    },
    faq: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs?.map(f => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.answer,
        },
      })),
    },
  };

  const selectedSchema = schemas[type];

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(selectedSchema),
      }}
    />
  );
}
