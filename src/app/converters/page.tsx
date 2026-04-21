import { CATEGORIES } from '@/data/calculators';
import Link from 'next/link';
import { PillarFAQ } from '@/components/seo/PillarFAQ';
import { JsonLd } from '@/components/seo/JsonLd';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Converters & Utility Tools — Unit, Length, Weight, Base | NEPACALC',
  description: 'Free online converters: Unit converter, Length, Weight, Currency, QR Generator, Password Generator, Word Counter and more utility tools. All free, all instant.',
  keywords: ['unit converter', 'length converter', 'weight converter', 'currency converter nepal', 'base converter', 'utility tools', 'qr code generator'],
  alternates: { 
    canonical: 'https://nepacalc.com/converters',
    languages: {
       'en-NP': 'https://nepacalc.com/converters',
       'x-default': 'https://nepacalc.com/converters'
    }
  },
  openGraph: {
    title: 'Converters & Utility Tools | NEPACALC',
    description: 'Free precision converters and utility tools for everyday tasks.',
    url: 'https://nepacalc.com/converters',
  },
};

const TOP_TOOLS = [
  { slug: 'unit-converter', title: 'Universal Unit Converter', desc: 'Convert between all major international measurement systems — length, weight, speed, temperature, and more.', icon: '🔄', color: '#0891b2' },
  { slug: 'length-converter', title: 'Length Converter', desc: 'Convert meters, feet, inches, yards, miles, and other dimensional units with full precision.', icon: '📏', color: '#7c3aed' },
  { slug: 'base-converter', title: 'Base Converter', desc: 'Convert numbers between Binary, Octal, Decimal, and Hexadecimal numeral systems up to 64-bit.', icon: '🔟', color: '#059669' },
  { slug: 'qr-generator', title: 'QR Code Generator', desc: 'Generate ISO 18004-compliant QR codes instantly from any URL, text, or custom data string.', icon: '📱', color: '#dc2626' },
];

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
  const existingTools = category.calculators.filter(c => !TOP_TOOLS.some(t => t.slug === c.slug));

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
            <h1 className="text-[18px] sm:text-[24px] font-black text-[#202124] tracking-tight leading-tight mb-2">
              Converters & Tools
            </h1>
            <p className="text-[13px] text-[#5f6368] max-w-2xl leading-relaxed">
              {category.calculators.length} precision converters and utility tools for everyday tasks — unit conversion, date math, QR codes, password generation, and more. All free, all instant.
            </p>
          </div>
        </section>

        {/* Advanced Tools */}
        <section className="max-w-6xl mx-auto px-6 pt-6 pb-16">
          <h2 className="text-[13px] font-black uppercase tracking-[0.15em] text-[#0891b2] mb-8 border-b-2 border-slate-100 pb-2">
            Advanced Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TOP_TOOLS.map(tool => (
              <Link
                href={tool.slug.includes('/') ? `/${tool.slug}` : `/calculator/${tool.slug}`}
                key={tool.title}
                className="group relative rounded-xl border border-slate-200 p-3 hover:border-transparent hover:shadow-lg transition-all duration-300 overflow-hidden block"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(135deg, ${tool.color}08, ${tool.color}15)` }} />
                <div className="relative z-10">
                  <div className="text-xl mb-2">{tool.icon}</div>
                  <h3 className="text-[13px] font-bold text-[#202124] mb-1">{tool.title}</h3>
                  <p className="text-[11px] text-[#5f6368] leading-relaxed mb-2">{tool.desc}</p>
                  <span
                    className="inline-block px-3 py-1 rounded-full text-[10px] font-bold text-white transition-all hover:opacity-90"
                    style={{ background: tool.color }}
                  >
                    Open Tool →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Regular Calculators */}
        <section className="max-w-6xl mx-auto px-6 pb-12">
          <h2 className="text-[13px] font-black uppercase tracking-[0.15em] text-[#0891b2] mb-8 border-b-2 border-slate-100 pb-2">
            Regular Calculators
          </h2>
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {existingTools.map(calc => (
              <Link
                key={calc.id}
                href={calc.slug.includes('/') ? `/${calc.slug}` : `/calculator/${calc.slug}`}
                className="flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-200 hover:border-[#0891b2] hover:bg-[#0891b208] transition-all group min-h-[56px]"
              >
                <span className="text-lg flex-shrink-0">{calc.icon}</span>
                <span className="text-[12px] sm:text-[13px] font-medium text-[#202124] group-hover:text-[#0891b2] transition-colors leading-tight">
                  {calc.name}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section className="max-w-4xl mx-auto px-6 pb-20">
          <PillarFAQ faqs={CONVERTER_FAQS} title="Converter Facts" />
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
      </div>
    </>
  );
}
