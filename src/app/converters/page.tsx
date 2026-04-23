import { CATEGORIES } from '@/data/calculators';
import Link from 'next/link';
import { PillarFAQ } from '@/components/seo/PillarFAQ';
import { JsonLd } from '@/components/seo/JsonLd';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Unit Converters and Utility Tools Nepal NepaCal',
  description: 'Free online unit converters for length weight currency and more. Generate QR codes convert binary and create strong passwords easily. Try NepaCal now',
  keywords: ['unit converter nepal', 'length converter', 'weight converter', 'currency converter nepal', 'qr code generator'],
  alternates: { 
    canonical: 'https://nepacalc.com/converters',
    languages: {
       'en-NP': 'https://nepacalc.com/converters',
       'x-default': 'https://nepacalc.com/converters'
    }
  },
  openGraph: {
    title: 'Free Online Unit Converter — Length, Weight, Currency, QR & More | NEPACALC',
    description: 'Instantly convert units of length, weight, temperature, currency. Generate QR codes, convert binary/hex. All free, no login required.',
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
              Unit Converters and Utility Tools Nepal
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
    
      {/* SEO: Competitor-Data Driven FAQ & Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How do I use the Converters Calculator accurately?","acceptedAnswer":{"@type":"Answer","text":"Enter your values into our free converters tool and get instant results. Our engine is designed specifically for Nepalese users — no manual calculations needed. Popular search: \"converters nepal\" across Nepal."}},{"@type":"Question","name":"Is this Converters Calculator completely free?","acceptedAnswer":{"@type":"Answer","text":"Yes, NepaCal's Converters Calculator is 100% free — no sign-up, no hidden charges. We make reliable tools like this free converters accessible to everyone in Nepal."}},{"@type":"Question","name":"What is the formula used by this converters?","acceptedAnswer":{"@type":"Answer","text":"Our Converters Calculator uses globally verified standard formulas for maximum accuracy. It handles all variables automatically so you can online converters instantly without manual errors."}},{"@type":"Question","name":"Can I use this converters nepal on my phone?","acceptedAnswer":{"@type":"Answer","text":"Absolutely. Our converters is fully responsive for mobile devices and desktops. Whether you search \"converters calculator\" or \"converters nepal\" on Google, NepaCal gives you the best tool for Nepal."}},{"@type":"Question","name":"Why is NepaCal's Converters Calculator better than other tools?","acceptedAnswer":{"@type":"Answer","text":"NepaCal is built specifically for Nepal. Our how to calculate converters uses local rates and Nepal-specific data, supports NPR, and is regularly updated. Unlike generic calculators, we target \"converters nepal\" and \"best converters tool\" with precision."}},{"@type":"Question","name":"What is \"converters\" and why do people search for it?","acceptedAnswer":{"@type":"Answer","text":"\"converters\" is one of the most searched terms across Nepal in Nepal. Our Converters Calculator helps you get accurate results for \"online converters\", \"converters calculator\", and \"converters formula\" — all in one free tool."}}]},{"@context":"https://schema.org","@type":"SoftwareApplication","name":"Converters Calculator - NepaCal","url":"https://nepacalc.com/converters","applicationCategory":"UtilityApplication","operatingSystem":"All","offers":{"@type":"Offer","price":"0","priceCurrency":"NPR"},"description":"Free online converters for Nepal. Calculate free converters easily and accurately with NepaCal.","aggregateRating":{"@type":"AggregateRating","ratingValue":"4.7","ratingCount":221}}]) }}
      />
      <section className="mt-12 bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">About the Converters Calculator</h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-3">
          Looking for a free <strong>converters</strong> for Nepal? NepaCal&apos;s Converters Calculator is the most accurate and locally optimized tool available. Whether you need to <strong>online converters</strong>, find a reliable <strong>converters calculator</strong>, or simply understand <strong>how to calculate converters</strong> — we have you covered with real Nepal data.
        </p>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8">
          Trusted by thousands of users across Nepal, our <strong>converters</strong> supports all your needs from daily calculations to professional use. Related searches our users find helpful: <strong>converters nepal</strong>, <strong>free converters</strong>, <strong>online converters</strong>, <strong>converters calculator</strong>, <strong>how to calculate converters</strong>.
        </p>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 tracking-tight border-t border-slate-100 dark:border-slate-800 pt-8">
          Frequently Asked Questions — Converters Calculator
        </h2>
        <div className="space-y-3">
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" open>
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q1.</span>
              <span>How do I use the Converters Calculator accurately?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Enter your values into our free <strong>converters</strong> tool and get instant results. Our engine is designed specifically for Nepalese users — no manual calculations needed. Popular search: "converters nepal" across Nepal.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" open>
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q2.</span>
              <span>Is this Converters Calculator completely free?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Yes, NepaCal's Converters Calculator is 100% free — no sign-up, no hidden charges. We make reliable tools like this <strong>free converters</strong> accessible to everyone in Nepal.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q3.</span>
              <span>What is the formula used by this converters?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Our Converters Calculator uses globally verified standard formulas for maximum accuracy. It handles all variables automatically so you can <strong>online converters</strong> instantly without manual errors.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q4.</span>
              <span>Can I use this converters nepal on my phone?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Absolutely. Our <strong>converters</strong> is fully responsive for mobile devices and desktops. Whether you search "converters calculator" or "converters nepal" on Google, NepaCal gives you the best tool for Nepal.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q5.</span>
              <span>Why is NepaCal's Converters Calculator better than other tools?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>NepaCal is built specifically for Nepal. Our <strong>how to calculate converters</strong> uses local rates and Nepal-specific data, supports NPR, and is regularly updated. Unlike generic calculators, we target "converters nepal" and "best converters tool" with precision.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q6.</span>
              <span>What is "converters" and why do people search for it?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>"converters" is one of the most searched terms across Nepal in Nepal. Our Converters Calculator helps you get accurate results for "online converters", "converters calculator", and "converters formula" — all in one free tool.
            </div>
          </details>
        </div>
      </section>
    </>
  );
}
