import { Calculator } from '@/data/calculators';
import { SITE_CONFIG } from '@/lib/calcMeta';
import { JsonLd } from '@/components/seo/JsonLd';

interface Props {
  calculator: Calculator;
}

/**
 * CalculatorSchema — generates SoftwareApplication and optional HowTo schema
 * for individual calculator pages.
 *
 * IMPORTANT: Does NOT generate BreadcrumbList.
 * Breadcrumb ownership belongs to the page layout (CalcWrapper / CalculatorLayout / ModernCalcLayout).
 * Adding a second breadcrumb here would create duplicate BreadcrumbList schemas on the same page.
 */
export default function CalculatorSchema({ calculator }: Props) {
  let url = calculator.slug.includes('/')
    ? `${SITE_CONFIG.baseUrl}/${calculator.slug}`
    : `${SITE_CONFIG.baseUrl}/calculator/${calculator.slug}`;
  if (!url.endsWith('/')) url += '/';

  // HowTo Schema (only if steps exist)
  const howToSchema = calculator.steps ? {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to use ${calculator.name}`,
    description: `Step-by-step guide for ${calculator.name.toLowerCase()} calculations.`,
    step: calculator.steps.map((text, index) => ({
      '@type': 'HowToStep',
      name: `Step ${index + 1}`,
      text: text,
      url: `${url}#step-${index + 1}`,
    })),
  } : null;

  return (
    <>
      {/* SoftwareApplication schema via centralized JsonLd component */}
      <JsonLd
        type="calculator"
        data={{
          name: calculator.name,
          description: calculator.description,
          url: url,
          applicationCategory: 'EducationalApplication',
        }}
      />

      {/* HowTo schema — only rendered when the calculator has defined steps */}
      {howToSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
      )}
    </>
  );
}
