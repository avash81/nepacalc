import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/JsonLd';
import ThreeDCalculatorClient from './ThreeDCalculatorClient';

export const metadata: Metadata = {
  title: 'Free 3D Graphing Calculator — Plot 3D Surfaces Online | NEPACALC',
  description: '3D surface plotter: visualize z=f(x,y) functions with orbit camera, rotation, zoom, wireframe & solid rendering modes. Supports sin, cos, tan, log and more. Free, no login.',
  keywords: ['3d graphing calculator', '3d surface plotter', 'plot z=f(x,y)', '3d math visualizer', '3d function graph'],
  alternates: {
    canonical: 'https://nepacalc.com/engineering/3d/',
  },
  openGraph: { title: 'Free 3D Calculator | NEPACALC', description: '3D surface plotter with orbit camera and wireframe rendering.', url: 'https://nepacalc.com/engineering/3d' },
};

export default function ThreeDPage() {
  return (
    <>
      <JsonLd
        type="breadcrumb"
        breadcrumbItems={[
          { name: 'Home', item: 'https://nepacalc.com' },
          { name: 'Engineering', item: 'https://nepacalc.com/engineering' },
          { name: '3D Calculator', item: 'https://nepacalc.com/engineering/3d' }
        ]}
      />
      <JsonLd type="calculator" name="NEPACALC 3D Calculator" description="3D surface plotter for z=f(x,y) functions with orbit camera rotation and zoom." url="https://nepacalc.com/engineering/3d" category="EducationalApplication" />
      <ThreeDCalculatorClient />
    </>
  );
}
