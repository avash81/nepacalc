import { CATEGORIES } from '@/data/calculators';
import Link from 'next/link';
import { PillarFAQ } from '@/components/seo/PillarFAQ';
import { JsonLd } from '@/components/seo/JsonLd';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Converters & Utility Tools — Unit, Length, Weight, Base | NEPACALC',
  description: 'Free online converters: Unit converter, Length, Weight, Currency, QR Generator, Password Generator, Word Counter and more utility tools. All free, all instant.',
  keywords: ['unit converter', 'length converter', 'weight converter', 'currency converter nepal', 'base converter', 'utility tools', 'qr code generator'],
  alternates: { canonical: 'https://nepacalc.com/converters' },
  openGraph: {
    title: 'Converters & Utility Tools | NEPACALC',
    description: 'Free precision converters and utility tools for everyday tasks.',
    url: 'https://nepacalc.com/converters',
  },
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
    <>
      <JsonLd
        type="breadcrumb"
        breadcrumbItems={[
          { name: 'Home', item: 'https://nepacalc.com' },
          { name: 'Converters', item: 'https://nepacalc.com/converters' }
        ]}
      />
      <JsonLd
        type="calculator"
        name="NEPACALC Converters & Utility Suite"
        description="Free precision converters and utility tools for everyday tasks."
        url="https://nepacalc.com/converters"
        category="UtilityApplication"
      />

      <div className="min-h-screen bg-white">
        {/* Hero */}
        <section className="pt-20 pb-8 border-b border-slate-100">
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-2 flex items-center gap-3">
              <span className="text-3xl">🔄</span>
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#0891b2]">Converters & Utility</span>
            </div>
            <h1 className="text-[36px] sm:text-[48px] font-black text-[#202124] tracking-tight leading-tight mb-4">
              Converters & Tools
            </h1>
            <p className="text-[16px] text-[#5f6368] max-w-2xl leading-relaxed">
              {category.calculators.length} precision converters and utility tools for everyday tasks — unit conversion, date math, QR codes, password generation, and more. All free, all instant.
            </p>
          </div>
        </section>

        {/* Tools Grid */}
        <section className="max-w-6xl mx-auto px-6 pb-16 pt-10">
          <h2 className="text-[13px] font-black uppercase tracking-[0.15em] text-[#0891b2] mb-8 border-b-2 border-slate-100 pb-2">
            All Converters & Utility Tools
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {category.calculators.map(calc => (
              <Link
                key={calc.id}
                href={calc.slug.includes('/') ? `/${calc.slug}` : `/calculator/${calc.slug}`}
                className="flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-200 hover:border-[#0891b2] hover:bg-[#0891b208] transition-all group"
              >
                <span className="text-lg flex-shrink-0">{calc.icon}</span>
                <span className="text-[13px] font-medium text-[#202124] group-hover:text-[#0891b2] transition-colors truncate">
                  {calc.name}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* SEO text */}
        <section className="border-t border-slate-200 py-12">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-[16px] font-black text-[#202124] mb-3">
              NEPACALC Converter Accuracy & Standards
            </h2>
            <p className="text-[13px] text-[#5f6368] leading-relaxed">
              Every converter on NEPACALC is built on exact scientific constants and internationally recognized measurement standards. Length and weight conversions adhere to the SI (International System of Units), ensuring that 1 inch is always exactly 2.54 cm and 1 pound is always exactly 0.45359237 kg. Our base converter handles binary, octal, decimal, and hexadecimal conversions up to 64-bit integer precision — ideal for developers and CS students. The QR code generator produces ISO/IEC 18004-compliant machine-readable matrices entirely in-browser. All tools run client-side with zero server round-trips, guaranteeing instant results and full data privacy.
            </p>
          </div>
        </section>

        {/* Institutional Authority Block */}
        <section className="pb-12">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 opacity-80">
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
        </section>

        <div className="max-w-5xl mx-auto px-6 pb-20">
          <PillarFAQ faqs={CONVERTER_FAQS} title="Converter Facts" />
        </div>
      </div>
    </>
  );
}
