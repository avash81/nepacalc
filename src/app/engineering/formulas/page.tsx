import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/JsonLd';
import FormulaReferenceClient from './FormulaReferenceClient';

export const metadata: Metadata = {
  title: 'Math Formula Reference — Algebra, Calculus & Physics | NEPACALC',
  description: 'Comprehensive math formula reference from school to engineering level. Covers algebra, geometry, trigonometry, calculus, statistics, physics, and engineering formulas. Beautifully rendered, searchable.',
  keywords: ['math formulas', 'algebra formulas', 'calculus formulas', 'trigonometry formulas', 'physics formulas', 'engineering formulas', 'formula sheet', 'math reference'],
  openGraph: { title: 'Math Formula Reference | NEPACALC', description: 'Complete formula reference from school to engineering level.', url: 'https://nepacalc.com/engineering/formulas' },
};

export default function FormulasPage() {
  return (
    <>
      <JsonLd
        type="breadcrumb"
        breadcrumbItems={[
          { name: 'Home', item: 'https://nepacalc.com' },
          { name: 'Engineering', item: 'https://nepacalc.com/engineering' },
          { name: 'Formula Reference', item: 'https://nepacalc.com/engineering/formulas' }
        ]}
      />
      <JsonLd type="calculator" name="NEPACALC Math Formula Reference" description="Comprehensive math formula reference covering algebra, geometry, trigonometry, calculus, statistics, physics, and engineering." url="https://nepacalc.com/engineering/formulas" category="EducationalApplication" />
      <FormulaReferenceClient />
    </>
  );
}
