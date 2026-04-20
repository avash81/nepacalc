import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/JsonLd';
import GraphingCalculatorClient from './GraphingCalculatorClient';

export const metadata: Metadata = {
  title: 'Free Online Graphing Calculator — Plot Functions | NEPACALC',
  description: 'Interactive graphing calculator: plot multiple functions simultaneously with custom colors, infinite pan & zoom, real-time rendering. Supports sin, cos, tan, log, polynomials, and more. Free, no login required.',
  keywords: ['graphing calculator', 'function plotter', 'graph functions online', 'desmos alternative', 'plot equations', 'math grapher'],
  openGraph: {
    title: 'Free Graphing Calculator | NEPACALC',
    description: 'Plot multiple functions with custom colors, pan, zoom, and real-time rendering.',
    url: 'https://nepacalc.com/engineering/graphing',
  },
};

export default function GraphingPage() {
  return (
    <>
      <JsonLd
        type="breadcrumb"
        breadcrumbItems={[
          { name: 'Home', item: 'https://nepacalc.com' },
          { name: 'Engineering', item: 'https://nepacalc.com/engineering' },
          { name: 'Graphing Calculator', item: 'https://nepacalc.com/engineering/graphing' }
        ]}
      />
      <JsonLd
        type="calculator"
        name="NEPACALC Graphing Calculator"
        description="Interactive graphing calculator with multi-expression support, custom colors, infinite pan & zoom."
        url="https://nepacalc.com/engineering/graphing"
        category="EducationalApplication"
      />
      <GraphingCalculatorClient />
    </>
  );
}
