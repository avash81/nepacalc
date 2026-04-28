import { calcMeta } from '@/lib/calcMeta';
import { JsonLd } from '@/components/seo/JsonLd';
import ThreeDCalculatorClient from './ThreeDCalculatorClient';

export const metadata = calcMeta({
  title: '3D Graphing Calculator Online Free No Download',
  description: 'Plot 3D graphs and mathematical surfaces online for free. NepaCalc 3D graphing engine works in your browser no download needed.',
  slug: 'engineering/3d',
  keywords: ['3d graphing calculator', '3d surface plotter', 'plot z=f(x,y)', '3d math visualizer', '3d function graph'],
});

export default function ThreeDPage() {
  return (
    <>
      <JsonLd
        type="breadcrumb"
        breadcrumbItems={[
          { name: 'Home', item: 'https://NepaCalc.com' },
          { name: 'Engineering', item: 'https://NepaCalc.com/engineering' },
          { name: '3D Calculator', item: 'https://NepaCalc.com/engineering/3d' }
        ]}
      />
      <JsonLd type="calculator" name="NepaCalc 3D Calculator" description="3D surface plotter for z=f(x,y) functions with orbit camera rotation and zoom." url="https://NepaCalc.com/engineering/3d" category="EducationalApplication" />
      <ThreeDCalculatorClient />
    </>
  );
}
