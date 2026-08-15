import React from 'react';

export interface JsonLdProps {
  type:
    | 'organization'
    | 'website'
    | 'webpage'
    | 'collection'
    | 'itemList'
    | 'calculator'
    | 'article'
    | 'dataset'
    | 'faq'
    | 'breadcrumb'
    | 'howto'
    | 'unified';

  data?: Record<string, any>;

  // Legacy props support to avoid breaking existing pages that haven't been updated yet
  name?: string;
  description?: string;
  url?: string;
  faqs?: any[];
  category?: any;
  breadcrumbItems?: any[];
}

export function JsonLd(props: JsonLdProps) {
  const { type } = props;
  
  // To support legacy usage where data was passed directly as props
  const data = props.data || {
    name: props.name,
    description: props.description,
    url: props.url,
    faqs: props.faqs,
    questions: props.faqs, // map faqs to questions
    category: props.category,
    applicationCategory: typeof props.category === 'string' ? props.category : props.category?.label,
    items: props.breadcrumbItems,
    breadcrumb: props.breadcrumbItems,
    calculator: {
      name: props.name,
      description: props.description,
      url: props.url,
      applicationCategory: typeof props.category === 'string' ? props.category : props.category?.label,
    }
  };

  const schema = generateSchema(type, data);

  if (!schema) return null;

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}

function generateSchema(
  type: JsonLdProps['type'],
  data: Record<string, any>
): Record<string, any> | null {
  const orgId = 'https://nepacalc.com/#organization';
  const websiteId = 'https://nepacalc.com/#website';

  switch (type) {
    /*
     * ============================================================
     * ORGANIZATION
     * ============================================================
     */
    case 'organization':
      return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': orgId,
        name: data.name || 'NepaCalc',
        url: 'https://nepacalc.com/',
        logo: {
          '@type': 'ImageObject',
          url: data.logo || 'https://nepacalc.com/logo.png',
        },
        description: data.description || 'NepaCalc provides free online calculators, converters and digital tools for Nepal and international users.',
      };

    /*
     * ============================================================
     * WEBSITE
     * ============================================================
     */
    case 'website':
      return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': websiteId,
        url: 'https://nepacalc.com/',
        name: data.name || 'NepaCalc',
        description: data.description || 'Free online calculators, converters and digital tools.',
        inLanguage: 'en-NP',
      };

    /*
     * ============================================================
     * WEBPAGE
     * ============================================================
     */
    case 'webpage':
      return {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': data.url ? `${data.url}#webpage` : undefined,
        url: data.url,
        name: data.name,
        description: data.description,
        isPartOf: { '@id': data.isPartOf || websiteId },
        mainEntity: data.mainEntity ? { '@id': data.mainEntity } : undefined,
      };

    /*
     * ============================================================
     * CALCULATOR / SOFTWARE APPLICATION
     * ============================================================
     */
    case 'calculator':
      return {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        '@id': data.url ? `${data.url}#softwareapplication` : undefined,
        name: data.name,
        description: data.description,
        url: data.url,
        applicationCategory: data.applicationCategory || 'EducationalApplication',
        operatingSystem: 'Web',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        isPartOf: data.isPartOf ? { '@id': data.isPartOf } : undefined,
        mainEntityOfPage: data.url ? { '@id': `${data.url}#webpage` } : undefined,
      };

    /*
     * ============================================================
     * ARTICLE
     * ============================================================
     */
    case 'article':
      return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        '@id': data.url ? `${data.url}#article` : undefined,
        headline: data.headline || data.name,
        description: data.description,
        url: data.url,
        datePublished: data.datePublished,
        dateModified: data.dateModified,
        author: data.author ? { '@type': 'Organization', name: data.author } : undefined,
        publisher: { '@id': orgId },
        isPartOf: { '@id': websiteId },
        mainEntityOfPage: data.url ? { '@id': `${data.url}#webpage` } : undefined,
      };

    /*
     * ============================================================
     * DATASET
     * ============================================================
     */
    case 'dataset':
      return {
        '@context': 'https://schema.org',
        '@type': 'Dataset',
        '@id': data.url ? `${data.url}#dataset` : undefined,
        name: data.name,
        description: data.description,
        url: data.url,
        dateModified: data.dateModified,
        temporalCoverage: data.temporalCoverage,
        spatialCoverage: data.spatialCoverage,
        creator: { '@id': orgId },
        license: data.license,
        isPartOf: data.isPartOf ? { '@id': data.isPartOf } : undefined,
        mainEntityOfPage: data.url ? { '@id': `${data.url}#webpage` } : undefined,
      };

    /*
     * ============================================================
     * HOWTO
     * ============================================================
     */
    case 'howto':
      if (!data.steps?.length) return null;
      return {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        '@id': data.url ? `${data.url}#howto` : undefined,
        name: data.name,
        description: data.description,
        step: data.steps.map((step: any, index: number) => ({
          '@type': 'HowToStep',
          position: index + 1,
          name: step.name,
          text: step.text,
        })),
        mainEntityOfPage: data.url ? { '@id': `${data.url}#webpage` } : undefined,
      };

    /*
     * ============================================================
     * FAQ
     * ============================================================
     */
    case 'faq':
      if (!data.questions?.length) return null;

      return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        '@id': data.url ? `${data.url}#faqpage` : undefined,
        mainEntity: data.questions.map((item: any) => ({
          '@type': 'Question',
          name: item.q || item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.a || item.answer,
          },
        })),
      };

    /*
     * ============================================================
     * BREADCRUMB
     * ============================================================
     */
    case 'breadcrumb':
      if (!data.items?.length) return null;

      return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        '@id': data.url ? `${data.url}#breadcrumb` : undefined,
        itemListElement: data.items.map((crumb: any, index: number) => {
          // Resolve the URL — support both `item` and `url` fields on the crumb object
          const resolvedUrl = crumb.item || crumb.url || (index === data.items.length - 1 ? data.url : undefined);
          return {
            '@type': 'ListItem',
            position: index + 1,
            name: crumb.name,
            // `item` is REQUIRED by Google — must always be a full absolute URL
            item: resolvedUrl || 'https://nepacalc.com/',
          };
        }),
      };

    /*
     * ============================================================
     * COLLECTION PAGE
     * ============================================================
     */
    case 'collection':
      return {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        '@id': data.url ? `${data.url}#collection` : undefined,
        url: data.url,
        name: data.name,
        description: data.description,
        isPartOf: { '@id': websiteId },
        mainEntity: data.url ? { '@id': `${data.url}#itemlist` } : undefined,
        inLanguage: 'en-NP',
      };

    /*
     * ============================================================
     * ITEM LIST
     * ============================================================
     */
    case 'itemList':
      if (!data.items?.length) return null;

      return {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        '@id': data.url ? `${data.url}#itemlist` : undefined,
        name: data.name,
        description: data.description,
        numberOfItems: data.items.length,
        itemListOrder: 'https://schema.org/ItemListOrderAscending',
        itemListElement: data.items.map((item: any, index: number) => ({
          '@type': 'ListItem',
          position: item.position || index + 1,
          name: item.name,
          url: item.url,
        })),
      };

    /*
     * ============================================================
     * UNIFIED
     * ============================================================
     */
    case 'unified':
      return {
        '@context': 'https://schema.org',
        '@graph': [
          ...(data.webpage ? [generateSchema('webpage', data.webpage)] : []),
          ...(data.collection ? [generateSchema('collection', data.collection)] : []),
          ...(data.itemList ? [generateSchema('itemList', data.itemList)] : []),
          ...(data.breadcrumb ? [generateSchema('breadcrumb', { items: data.breadcrumb, url: data.url || data.breadcrumbUrl })] : []),
          ...(data.calculator || (data.name && data.url && !data.webpage && !data.article && !data.dataset) ? [generateSchema('calculator', data.calculator || data)] : []),
          ...(data.article ? [generateSchema('article', data.article)] : []),
          ...(data.dataset ? [generateSchema('dataset', data.dataset)] : []),
          ...(data.howto ? [generateSchema('howto', data.howto)] : []),
          ...(data.questions || data.faqs ? [generateSchema('faq', { questions: data.questions || data.faqs, url: data.url })] : []),
        ].filter(Boolean),
      };

    default:
      return null;
  }
}
