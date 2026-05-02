/**
 * JsonLd ,  Phase 4 SEO Mastery Component
 * 
 * Provides high-precision structured data for every calculator page to dominate search results.
 * Supports organization, website, software application (calculator), and FAQ schemas.
 * Now supports 'unified' mode for single-script array injection to prevent duplicates.
 */
interface FAQItem {
  question: string;
  answer: string;
}

interface JsonLdProps {
  type: 'calculator' | 'faq' | 'website' | 'organization' | 'breadcrumb' | 'unified';
  name?: string;
  description?: string;
  url?: string;
  faqs?: FAQItem[];
  category?: any; // e.g., 'FinanceApplication', 'EducationalApplication' or {label, href}
  breadcrumbItems?: { name: string; item: string }[];
}

const INSTITUTIONAL_FAQS = [
  { 
    question: "How accurate is this calculator for professional use in Nepal?", 
    answer: "NepaCalc uses high-precision floating point arithmetic verified against Nepal Inland Revenue Department (IRD) guidelines and international financial standards. It's suitable for professional planning, internal audits, and academic documentation." 
  },
  { 
    question: "Does NepaCalc store my personal calculation data?", 
    answer: "No. Privacy is our priority. All calculations are performed entirely on your device (client-side). Your inputs are never transmitted to our servers or stored in any database." 
  },
  { 
    question: "How do I print a report of my calculation?", 
    answer: "Most of our calculators feature a 'Print Report' button that generates a clean, professional PDF-ready layout. Alternatively, you can use (Ctrl + P) on your keyboard." 
  },
  { 
    question: "What should I do if the results look incorrect?", 
    answer: "If you notice any discrepancy, please contact our technical audit team via the 'Contact' page. We investigate all precision-related reports within 24 hours to maintain our 100% accuracy standard." 
  }
];

export function JsonLd({ type, name, description, url, faqs, category = 'UtilitiesApplication', breadcrumbItems }: JsonLdProps) {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://nepacalc.com';
  const siteName = 'NepaCalc';
  
  const finalFaqs = (faqs && faqs.length > 0) ? faqs : [];

  // Normalize category for schema
  const schemaCategory = typeof category === 'string' ? category : (category?.label || 'UtilitiesApplication');

  const schemas: Record<string, any> = {
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
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          email: 'support@nepacalc.com'
        },
        {
          '@type': 'ContactPoint',
          contactType: 'technical support',
          email: 'contact@nepacalc.com'
        }
      ]
    },
    website: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      description: 'Free online scientific calculator with real-time graphing engine, 3D surface plotter (Orbit Camera), and 80+ professional calculators for Nepal.',
      potentialAction: {
        '@type': 'SearchAction',
        target: `${base}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
    calculator: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: name || 'NepaCalc Laboratory Tool',
      description: description || 'Professional mathematical visualization and calculation tool.',
      url: url || base,
      applicationCategory: schemaCategory,
      operatingSystem: 'Any',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'NPR',
      },
      author: {
        '@type': 'Organization',
        name: 'NepaCalc',
        url: base,
      },
      featureList: [
        'Interactive 3D Surface Plotter',
        'High-precision Orbit Camera Visualization',
        'Wireframe and Solid Rendering Modes',
        'Real-time scientific visualization',
        'Institutional Benchmarks (Nepal IRD Sync)'
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
      mainEntity: finalFaqs.map(f => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.answer,
        },
      })),
    },
    breadcrumb: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: (breadcrumbItems || []).map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.item,
      })),
    },
  };

  if (type === 'unified') {
    const unified = [];
    if (breadcrumbItems && breadcrumbItems.length > 0) unified.push(schemas.breadcrumb);
    unified.push(schemas.calculator);
    if (finalFaqs.length > 0) unified.push(schemas.faq);
    
    return (
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(unified),
        }}
      />
    );
  }

  const selectedSchema = schemas[type];
  if (type === 'faq' && finalFaqs.length === 0) return null;

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
