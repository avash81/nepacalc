import React from 'react';

export interface JsonLdProps {
  type:
    | 'organization'
    | 'website'
    | 'calculator'
    | 'faq'
    | 'breadcrumb'
    | 'collection'
    | 'itemList'
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
): Record<string, any> {
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
        '@id': 'https://nepacalc.com/#organization',
        name: data.name || 'NepaCalc',
        url: 'https://nepacalc.com/',
        logo: {
          '@type': 'ImageObject',
          url:
            data.logo ||
            'https://nepacalc.com/logo.png',
        },
        description:
          data.description ||
          'NepaCalc provides free online calculators, converters and digital tools for Nepal and international users.',
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
        '@id': 'https://nepacalc.com/#website',
        url: 'https://nepacalc.com/',
        name: data.name || 'NepaCalc',
        description:
          data.description ||
          'Free online calculators, converters and digital tools.',
        publisher: {
          '@id': 'https://nepacalc.com/#organization',
        },
        inLanguage: 'en-NP',
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
        '@id': data.url
          ? `${data.url}#software`
          : undefined,
        name: data.name,
        description: data.description,
        url: data.url,
        applicationCategory:
          data.applicationCategory ||
          'EducationalApplication',
        operatingSystem: 'Web',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
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
        mainEntity: data.questions.map(
          (item: any) => ({
            '@type': 'Question',
            name: item.q || item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.a || item.answer,
            },
          })
        ),
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
        itemListElement: data.items.map(
          (
            item: any,
            index: number
          ) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            ...(item.url || item.item
              ? {
                  item: item.url || item.item,
                }
              : {}),
          })
        ),
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
        '@id': data.url
          ? `${data.url}#collection`
          : undefined,
        url: data.url,
        name: data.name,
        description: data.description,
        isPartOf: {
          '@id': 'https://nepacalc.com/#website',
        },
        about: data.about
          ? {
              '@type': 'Thing',
              name: data.about,
            }
          : undefined,
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
        '@id': data.url
          ? `${data.url}#itemlist`
          : undefined,
        name: data.name,
        description: data.description,
        numberOfItems: data.items.length,
        itemListOrder: 'https://schema.org/ItemListOrderAscending',
        itemListElement: data.items.map(
          (
            item: any,
            index: number
          ) => ({
            '@type': 'ListItem',
            position: item.position || index + 1,
            name: item.name,
            url: item.url,
          })
        ),
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
          ...(data.breadcrumb
            ? [
                generateSchema('breadcrumb', {
                  items: data.breadcrumb,
                }),
              ]
            : []),

          ...(data.calculator || (data.name && data.url)
            ? [
                generateSchema('calculator', data.calculator || data),
              ]
            : []),

          ...(data.questions || data.faqs
            ? [
                generateSchema('faq', {
                  questions: data.questions || data.faqs,
                }),
              ]
            : []),
        ].filter(Boolean),
      };

    default:
      return null;
  }
}
