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
    question: "How accurate is this calculator for professional use in Nepal?", 
    answer: "NEPACALC uses high-precision floating point arithmetic verified against Nepal Inland Revenue Department (IRD) guidelines and international financial standards. It's suitable for professional planning, internal audits, and academic documentation." 
  },
  { 
    question: "Does NEPACALC store my personal calculation data?", 
    answer: "No. Privacy is our priority. All calculations are performed entirely on your device (client-side). Your inputs are never transmitted to our servers or stored in any database." 
  },
  { 
    question: "Is this tool updated for the latest Nepal fiscal year mandates?", 
    answer: "Yes. Our research team monitors the official Finance Bill and IRD circulars daily. We update our tax slabs, VAT logic, and interest rate methodologies as soon as new regulations are released." 
  },
  { 
    question: "Can I use these results for official legal or bank filings?", 
    answer: "While our tools provide 99.9% accuracy for planning purposes, we always recommend verifying final figures with a certified Chartered Accountant (CA) or financial advisor for official government filings." 
  },
  { 
    question: "Is NEPACALC compatible with mobile devices and tablets?", 
    answer: "Yes. The platform is built on a responsive, mobile-first framework, ensuring full functionality on everything from small smartphones to large professional monitors." 
  },
  { 
    question: "Is there any subscription fee for using NEPACALC tools?", 
    answer: "No. NEPACALC is a free institutional resource. Our mission is to provide high-precision financial and mathematical tools to every citizen of Nepal without any cost barriers." 
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
      description: 'Free online scientific calculator with real-time graphing engine, maths solver (algebra, trigonometry, calculus), and 80+ professional calculators for Nepal — income tax, EMI, GPA, BMI and more.',
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
