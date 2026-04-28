import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/JsonLd';
import GeometryCanvasClient from './GeometryCanvasClient';

export const metadata: Metadata = {
  title: 'Free Interactive Geometry Tool — Constructions | NepaCalc',
  description: 'Interactive geometry canvas: construct points, lines, circles, and polygons with real-time measurements. Drag objects, measure angles and distances. Free online geometry tool.',
  keywords: ['geometry tool', 'interactive geometry', 'draw circles online', 'geometry canvas', 'compass and straightedge', 'measure angles online'],
  openGraph: { title: 'Free Geometry Tool | NepaCalc', description: 'Interactive constructions with measurements.', url: 'https://NepaCalc.com/engineering/geometry' },
};

export default function GeometryPage() {
  return (
    <>
      <JsonLd
        type="breadcrumb"
        breadcrumbItems={[
          { name: 'Home', item: 'https://NepaCalc.com' },
          { name: 'Engineering', item: 'https://NepaCalc.com/engineering' },
          { name: 'Geometry Canvas', item: 'https://NepaCalc.com/engineering/geometry' }
        ]}
      />
      <JsonLd type="calculator" name="NepaCalc Geometry Canvas" description="Interactive geometry construction tool with points, lines, circles, polygons and measurements." url="https://NepaCalc.com/engineering/geometry" category="EducationalApplication" />
      <GeometryCanvasClient />
    
      <section className="mt-12 bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl shadow-slate-200/40">
        <h2 className="text-2xl font-black text-slate-900 mb-6 tracking-tight">Interactive Euclidean Constructions</h2>
        <p className="text-slate-600 text-base leading-relaxed mb-6 font-medium">
          The Interactive Geometry Canvas by NepaCalc is a digital laboratory for Euclidean constructions. Built specifically for the Nepalese curriculum (SEE and NEB), this tool allows you to construct points, lines, circles, and complex polygons with millimeter precision.
        </p>
        <p className="text-slate-600 text-base leading-relaxed mb-10">
          Features include real-time angle measurement, distance tracking, and object snapping, making it the perfect companion for geometry assignments, architectural sketching, and mathematical proofs. Explore the world of shapes with a tool that feels as natural as a compass and straightedge but with digital accuracy.
        </p>
        
        <h3 className="text-xl font-bold text-slate-900 mb-6 border-t border-slate-100 pt-8">
          Geometry Canvas FAQs
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <h4 className="font-bold text-slate-900 mb-2">How do I measure an angle between two lines?</h4>
            <p className="text-sm text-slate-500 leading-relaxed">Select the &apos;Angle&apos; tool from the toolbar and click on three points (or two intersecting lines). The interior angle will be displayed and updated in real-time as you drag the objects.</p>
          </div>
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <h4 className="font-bold text-slate-900 mb-2">Can I construct a circle with a specific radius?</h4>
            <p className="text-sm text-slate-500 leading-relaxed">Yes, choose the &apos;Circle&apos; tool, define your center point, and drag to the desired radius. You can also view the exact radius in the properties panel for precise adjustments.</p>
          </div>
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <h4 className="font-bold text-slate-900 mb-2">Is this tool suitable for engineering drawings?</h4>
            <p className="text-sm text-slate-500 leading-relaxed">While optimized for education, its high-precision snapping and measurement features make it excellent for conceptual engineering sketches and basic CAD-like drafting.</p>
          </div>
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <h4 className="font-bold text-slate-900 mb-2">Does it support area calculations?</h4>
            <p className="text-sm text-slate-500 leading-relaxed">Yes, when you construct a closed polygon, the tool automatically calculates and displays the internal area in square units based on the current grid scale.</p>
          </div>
        </div>
      </section>
    </>
  );
}
