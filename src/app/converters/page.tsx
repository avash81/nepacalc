import { CATEGORIES } from '@/data/calculators';
import Link from 'next/link';
import { ChevronRight, Star, Flame } from 'lucide-react';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { PillarFAQ } from '@/components/seo/PillarFAQ';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Converters & Utility Tools — Unit, Length, Weight, Base | NEPACALC',
  description: 'Free online converters: Unit converter, Length, Weight, Currency, QR Generator, Password Generator, Word Counter and more utility tools.',
  keywords: ['unit converter', 'length converter', 'weight converter', 'currency converter nepal', 'utility tools'],
  alternates: { canonical: 'https://nepacalc.com/converters' },
};

const CONVERTER_FAQS = [
  {
    question: "How frequently are the currency and unit rates updated?",
    answer: "Fixed units (such as metric to imperial length/weight) are absolute and constant. Dynamic rates (like gold and currency) map to verified institutional endpoints."
  },
  {
    question: "Can I use these conversions for academic research?",
    answer: "Yes, our unit conversion algorithms use exact scientific constants (e.g., 1 inch = exactly 2.54 cm) ensuring 100% precision for academic and engineering use."
  },
  {
    question: "Do you support base numeral conversions?",
    answer: "Yes. The base converter accurately translates binary, octal, decimal, and hexadecimal numeral systems up to 64-bit integer limits."
  },
  {
    question: "Are the generated passwords cryptographically secure?",
    answer: "Our password generator uses the browser's native crypto framework to generate strong, non-deterministic strings locally on your device."
  }
];

export default function ConvertersPillarPage() {
  const category = CATEGORIES.find(c => c.id === 'utility')!;
  return (
    <CalcWrapper
      title="Converters & Utility"
      description={`${category.calculators.length} precision converters and utility tools for everyday tasks.`}
      crumbs={[{ label: 'Converters & Utility Tools' }]}
    >
      <div className="py-8">

        {/* Clinical Index Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
          {category.calculators.map(calc => (
            <div key={calc.id} className="group flex flex-col gap-1 border-b border-slate-50 pb-4">
              <Link
                href={`/calculator/${calc.slug}`}
                className="text-[16px] font-bold text-[#1a73e8] hover:underline"
              >
                {calc.name}
              </Link>
              <p className="text-[13px] text-[#5f6368] leading-relaxed font-medium">
                {calc.description}
              </p>
            </div>
          ))}
        </div>

        {/* Institutional Authority Block */}
        <div className="mt-24 pt-12 border-t border-[#dadce0]">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl opacity-80">
              <div>
                <h3 className="text-[11px] font-black uppercase tracking-widest text-[#202124] mb-3">Verification</h3>
                <p className="text-[11px] text-[#5f6368] leading-relaxed">Measurement constants based on SI standards and international metric/imperial conventions.</p>
              </div>
              <div>
                <h3 className="text-[11px] font-black uppercase tracking-widest text-[#202124] mb-3">Real-time Data</h3>
                <p className="text-[11px] text-[#5f6368] leading-relaxed">Currency and exchange rates pull live from central bank APIs to ensure calculation validity.</p>
              </div>
              <div>
                <h3 className="text-[11px] font-black uppercase tracking-widest text-[#202124] mb-3">System Logic</h3>
                <p className="text-[11px] text-[#5f6368] leading-relaxed">Base converters and bitwise tools optimized for developer-grade 64-bit precision.</p>
              </div>
           </div>
        </div>
        
        <PillarFAQ faqs={CONVERTER_FAQS} title="Converter Facts" />
      </div>
    </CalcWrapper>
  );
}
