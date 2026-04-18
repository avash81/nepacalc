import { Calculator } from '@/data/calculators';
import { SITE_CONFIG } from '@/lib/calcMeta';

interface Props {
  calculator: Calculator;
}

export default function CalculatorSchema({ calculator }: Props) {
  const url = `${SITE_CONFIG.baseUrl}/calculator/${calculator.slug}`;
  const ogImage = `${SITE_CONFIG.baseUrl}/api/og?title=${encodeURIComponent(calculator.name)}`;

  // 1. SoftwareApplication Schema (The tool itself)
  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: calculator.name,
    operatingSystem: 'Any',
    applicationCategory: 'CalculationApplication',
    url: url,
    description: calculator.description,
    image: ogImage,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  // 2. HowTo Schema (If steps exist)
  const howToSchema = calculator.steps ? {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to use ${calculator.name}`,
    description: `Step-by-step guide on how to perform ${calculator.name.toLowerCase()} calculations accurately.`,
    step: calculator.steps.map((text, index) => ({
      '@type': 'HowToStep',
      name: `Step ${index + 1}`,
      text: text,
      url: `${url}#step-${index + 1}`,
    })),
  } : null;

  // 3. Breadcrumb Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_CONFIG.baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: calculator.category.charAt(0).toUpperCase() + calculator.category.slice(1),
        item: `${SITE_CONFIG.baseUrl}/${calculator.category}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: calculator.name,
        item: url,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      {howToSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
