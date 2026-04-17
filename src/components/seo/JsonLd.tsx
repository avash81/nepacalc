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
  type: 'calculator' | 'faq' | 'website' | 'organization' | 'breadcrumb';
  name?: string;
  description?: string;
  url?: string;
  faqs?: FAQItem[];
  category?: string; // e.g., 'FinanceApplication', 'EducationalApplication'
  breadcrumbItems?: { name: string; item: string }[];
}

const INSTITUTIONAL_FAQS = [
  { 
    question: "How accurate is this calculator for professional use?", 
    answer: "NEPACALC uses high-precision floating point arithmetic verified against international SI units and local Nepal mandates to ensure results are suitable for professional and academic documentation." 
  },
  { 
    question: "Does NEPACALC store my calculation data?", 
    answer: "Privacy is paramount. All calculations are performed on the client-side. NEPACALC does not store, transmit, or record your specific input data, maintaining absolute user confidentiality." 
  },
  { 
    question: "Is this tool compatible with mobile devices?", 
    answer: "Yes. The entire NEPACALC laboratory is built on a responsive framework designed for high performance on both modern smartphones and professional desktop workstations." 
  },
  { 
    question: "Are the formulas updated for the current mandates?", 
    answer: "Our research team monitors local fiscal and academic mandates daily. Formulas are updated as soon as new guidelines are released by authorized bodies in Nepal." 
  },
  { 
    question: "Can I use these results for official documentation?", 
    answer: "While our tools provide high-precision approximations, we recommend cross-verifying results with a certified professional for high-stakes legal or financial filings." 
  },
  { 
    question: "Is there a cost to use NEPACALC tools?", 
    answer: "No. The NEPACALC platform is a free institutional resource provided to the people of Nepal to enhance scientific and financial literacy nationwide." 
  }
];

export function JsonLd({ type, name, description, url, faqs, category = 'UtilitiesApplication', breadcrumbItems }: JsonLdProps) {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://nepacalc.com';
  const siteName = 'NEPACALC';
  
  // Use provided FAQs or fallback to Institutional ones
  const finalFaqs = (faqs && faqs.length > 0) ? faqs : INSTITUTIONAL_FAQS;

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
      itemListElement: breadcrumbItems?.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.item,
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
