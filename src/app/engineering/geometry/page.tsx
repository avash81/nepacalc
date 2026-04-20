import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/JsonLd';
import GeometryCanvasClient from './GeometryCanvasClient';

export const metadata: Metadata = {
  title: 'Free Interactive Geometry Tool — Constructions | NEPACALC',
  description: 'Interactive geometry canvas: construct points, lines, circles, and polygons with real-time measurements. Drag objects, measure angles and distances. Free online geometry tool.',
  keywords: ['geometry tool', 'interactive geometry', 'draw circles online', 'geometry canvas', 'compass and straightedge', 'measure angles online'],
  openGraph: { title: 'Free Geometry Tool | NEPACALC', description: 'Interactive constructions with measurements.', url: 'https://nepacalc.com/engineering/geometry' },
};

export default function GeometryPage() {
  return (
    <>
      <JsonLd
        type="breadcrumb"
        breadcrumbItems={[
          { name: 'Home', item: 'https://nepacalc.com' },
          { name: 'Engineering', item: 'https://nepacalc.com/engineering' },
          { name: 'Geometry Canvas', item: 'https://nepacalc.com/engineering/geometry' }
        ]}
      />
      <JsonLd type="calculator" name="NEPACALC Geometry Canvas" description="Interactive geometry construction tool with points, lines, circles, polygons and measurements." url="https://nepacalc.com/engineering/geometry" category="EducationalApplication" />
      <GeometryCanvasClient />
    </>
  );
}
