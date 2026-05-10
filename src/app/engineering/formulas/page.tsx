import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/JsonLd';
import FormulaReferenceClient from './FormulaReferenceClient';

export const metadata: Metadata = {
  title: 'Math Formula Reference ,  Algebra, Calculus & Physics | NepaCalc',
  description: 'Comprehensive math formula reference from school to engineering level. Covers algebra, geometry, trigonometry, calculus, statistics, physics, and engineering formulas. Beautifully rendered, searchable.',
  keywords: ['math formulas', 'algebra formulas', 'calculus formulas', 'trigonometry formulas', 'physics formulas', 'engineering formulas', 'formula sheet', 'math reference'],
  openGraph: { title: 'Math Formula Reference | NepaCalc', description: 'Complete formula reference from school to engineering level.', url: 'https://NepaCalc.com/engineering/formulas' },
};

export default function FormulasPage() {
  return (
    <>
      <JsonLd
        type="breadcrumb"
        breadcrumbItems={[
          { name: 'Home', item: 'https://NepaCalc.com' },
          { name: 'Engineering', item: 'https://NepaCalc.com/engineering' },
          { name: 'Formula Reference', item: 'https://NepaCalc.com/engineering/formulas' }
        ]}
      />
      <JsonLd type="calculator" name="NepaCalc Math Formula Reference" description="Comprehensive math formula reference covering algebra, geometry, trigonometry, calculus, statistics, physics, and engineering." url="https://NepaCalc.com/engineering/formulas" category="EducationalApplication" />
      <FormulaReferenceClient />
    </>
  );
}

