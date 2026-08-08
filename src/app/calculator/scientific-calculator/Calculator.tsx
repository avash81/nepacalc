'use client';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import AllInOneCalculator from '@/components/calculator/AllInOneCalculator';
import { Calculator, History, Landmark, Binary } from 'lucide-react';

export default function ScientificCalculator() {
  return (
    <ModernCalcLayout
      slug="scientific-calculator"
      fullWidth={true}
      crumbs={[{ label: 'Math Tools', href: '/math-tools/' }, { label: 'Scientific Calculator' }]}
      title="Institutional Scientific Calculator & CAS"
      description="The definitive online scientific calculator. Featuring a Symbolic Computer Algebra System (CAS), trigonometry, algebra, and calculus functions. Fully aligned with NEB, TU, and international STEM standards."
      icon={Calculator}
      inputs={
        <div className="w-full max-w-4xl mx-auto py-2">
          <AllInOneCalculator />
        </div>
      }
      results={null}
      details={
        <div className="space-y-12 pt-6">
          {/* Section 1: Philosophy of Computation */}
          <section className="bg-white border border-[#DADCE0] rounded-lg p-8 sm:p-12 shadow-sm relative overflow-hidden">
            <div className="absolute -top-12 -right-12 opacity-5">
              <History className="w-64 h-64" />
            </div>
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-[#E8F0FE] p-3.5 rounded-2xl">
                <Landmark className="w-7 h-7 text-[#1A73E8]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#202124] tracking-tight">The Silicon Sage: Evolution of the Scientific Calculator</h2>
            </div>
            <div className="prose prose-md text-[#5F6368] max-w-none leading-relaxed space-y-4">
              <p>
                A scientific calculator is not merely an arithmetic tool; it is a portable portal to the laws of physics and the abstract beauty of higher mathematics. From the mechanical slide rule to modern digital engines, humanity has always sought precision in calculation.
              </p>
              <p>
                In the academic ecosystem of Nepal, the scientific calculator is a mandatory companion for students under the <a href="https://neb.gov.np" className="text-[#1A73E8] font-bold hover:underline">National Examination Board (NEB)</a> and university programs at TU and KU.
              </p>
            </div>
          </section>

          {/* Section 2: Order of Operations */}
          <section className="bg-[#F8F9FA] border border-[#DADCE0] rounded-lg p-8 sm:p-12 shadow-sm">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-[#E6F4EA] p-3.5 rounded-2xl">
                <Binary className="w-7 h-7 text-[#188038]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#202124] tracking-tight">The BODMAS Axiom: Why Precision Matters</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-[#202124] border-l-4 border-[#1A73E8] pl-4">Holistic Evaluation</h3>
                <p className="text-[#5F6368] leading-relaxed">
                  Calculators parse entire mathematical expressions ensuring that exponents, trigonometry, and parenthetical groups take precedence according to universal algebraic principles.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-[#DADCE0] space-y-3">
                <h4 className="text-base font-bold text-[#202124]">Operational Hierarchy</h4>
                <ul className="space-y-2 text-[#5F6368] text-xs">
                  <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#1A73E8]" /><span><strong>Brackets:</strong> (x) evaluated first</span></li>
                  <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#188038]" /><span><strong>Orders:</strong> Powers and roots</span></li>
                  <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#D93025]" /><span><strong>Div/Mult:</strong> Left-to-right precedence</span></li>
                  <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#F29900]" /><span><strong>Add/Sub:</strong> Final resolution</span></li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      }
    />
  );
}
