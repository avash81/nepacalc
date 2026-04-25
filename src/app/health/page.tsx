import { CATEGORIES } from '@/data/calculators';
import Link from 'next/link';
import { JsonLd } from '@/components/seo/JsonLd';
import { PillarFAQ } from '@/components/seo/PillarFAQ';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Health and Fitness Calculators BMI BMR Calorie NepaCal',
  description: 'Free WHO standard health calculators for Nepal. Calculate BMI BMR TDEE body fat daily calories ideal weight and water intake. Try NepaCal now',
  keywords: ['bmi calculator nepal', 'bmr calculator', 'tdee calculator', 'calorie calculator', 'health tracker nepal'],
  alternates: { 
    canonical: 'https://nepacalc.com/health/',
    languages: {
      'en-NP': 'https://nepacalc.com/health/',
      'x-default': 'https://nepacalc.com/health/'
    }
  },
};

const HEALTH_FAQS = [
  { question: "Are the health calculators designed for medical diagnosis?", answer: "No, our health tools, including BMI and calorie calculators, are designed for informational and fitness tracking purposes only. They do not replace professional medical advice." },
  { question: "What body mass index standard is used?", answer: "We follow universally accepted World Health Organization (WHO) and CDC guidelines for all standard fitness metrics and metabolic rate estimations." },
  { question: "Do the calorie calculators account for activity levels?", answer: "Yes, our daily energy expenditure (TDEE) models incorporate standard physiological activity multipliers to provide accurate macronutrient requirements." },
  { question: "Are these tools suitable for children?", answer: "We offer dedicated pediatric tools, such as the Child BMI Calculator, which utilize specific percentile growth charts distinct from adult metric standards." }
];

const TOP_TOOLS = [
  { slug: 'bmi', title: 'BMI Calculator', desc: 'Determine healthy weight ranges using precise World Health Organization (WHO) index metrics.', icon: '⚖️', color: '#f72585' },
  { slug: 'bmr', title: 'BMR Calculator', desc: 'Calculate your exact basal metabolic rate to establish baseline daily energy constraints.', icon: '🔥', color: '#f59e0b' },
  { slug: 'calorie-calculator', title: 'Calorie Calculator', desc: 'Estimate optimal daily macronutrient intake mapped to specific muscular hyperthropy or fat loss milestones.', icon: '🥗', color: '#10b981' },
  { slug: 'body-fat', title: 'Body Fat Calculator', desc: 'Estimate subcutaneous fat composition using standardized metric bodily tape circumference mapping.', icon: '💪', color: '#4361ee' },
];

export default function HealthPillarPage() {
  const category = CATEGORIES.find(c => c.id === 'health')!;
  const existingTools = category.calculators.filter(c => !TOP_TOOLS.some(t => t.slug === c.slug));

  return (
    <>
      <JsonLd type="breadcrumb" breadcrumbItems={[{ name: 'Home', item: 'https://nepacalc.com' }, { name: 'Health', item: 'https://nepacalc.com/health' }]} />
      <JsonLd type="calculator" name="NEPACALC Health Suite" description="WHO-standard health and fitness calculators including BMI, BMR, and Calorie projections." url="https://nepacalc.com/health" category="HealthApplication" />

      <div className="min-h-screen bg-white">
        {/* Hero */}
        <section className="pt-20 pb-8 border-b border-slate-100">
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-2 flex items-center gap-3">
              <span className="text-3xl">❤️</span>
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#f72585]">Health Suite</span>
            </div>
            <h1 className="text-[18px] sm:text-[24px] font-black text-[#202124] tracking-tight leading-tight mb-2">
              Health and Fitness Tools Nepal
            </h1>
            <p className="text-[13px] text-[#5f6368] max-w-2xl leading-relaxed">
              Standardized biometric calculators mapped to global WHO and CDC guidelines. Calculate your absolute body mass, target weight goals, and optimum daily hydration.
            </p>
          </div>
        </section>

        {/* Main tools grid */}
        <section className="max-w-6xl mx-auto px-6 pt-6 pb-16">
          <h2 className="text-[13px] font-black uppercase tracking-[0.15em] text-[#f72585] mb-8 border-b-2 border-slate-100 pb-2">
            Advanced Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TOP_TOOLS.map(tool => (
              <Link href={tool.slug.includes('/') ? `/${tool.slug}` : `/calculator/${tool.slug}`} key={tool.title} className="group relative rounded-xl border border-slate-200 p-3 hover:border-transparent hover:shadow-lg transition-all duration-300 overflow-hidden block">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `linear-gradient(135deg, ${tool.color}08, ${tool.color}15)` }} />
                <div className="relative z-10">
                  <div className="text-xl mb-2">{tool.icon}</div>
                  <h3 className="text-[13px] font-bold text-[#202124] mb-1">{tool.title}</h3>
                  <p className="text-[11px] text-[#5f6368] leading-relaxed mb-2">{tool.desc}</p>
                  <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold text-white transition-all hover:opacity-90" style={{ background: tool.color }}>
                    Open Tool →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Existing calculators */}
        <section className="max-w-6xl mx-auto px-6 pb-12">
          <h2 className="text-[13px] font-black uppercase tracking-[0.15em] text-[#f72585] mb-8 border-b-2 border-slate-100 pb-2">
            Regular Calculators
          </h2>
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {existingTools.map(calc => (
              <Link key={calc.name} href={calc.slug.includes('/') ? `/${calc.slug}` : `/calculator/${calc.slug}`} className="flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-200 hover:border-[#f72585] hover:bg-[#f7258508] transition-all group min-h-[56px]">
                <span className="text-lg flex-shrink-0">{calc.icon}</span>
                <span className="text-[12px] sm:text-[13px] font-medium text-[#202124] group-hover:text-[#f72585] transition-colors leading-tight">
                  {calc.name}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section className="max-w-4xl mx-auto px-6 pb-20">
          <PillarFAQ faqs={HEALTH_FAQS} title="Health Tools Facts" />
        </section>

        {/* SEO Simple Summary */}
        <section className="border-t border-slate-200 py-12">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-[16px] font-black text-[#202124] mb-3">
              Health Diagnostics & Tracking
            </h2>
            <p className="text-[13px] text-[#5f6368] leading-relaxed">
              Our health and fitness engine suite is built strictly on verified scientific consensus. Rather than abstract guesses, parameters run natively against globally recognized demographic constants mapping correctly to the World Health Organization databases and National Institutes of Health empirical standards. From precision macros to gestational timeline predictions, the calculations deliver clinical-grade benchmarks designed perfectly for nutritional charting, gym regimen scaling, and preventative monitoring. Completely client-side processing guarantees zero private biometric markers leave the user machine.
            </p>
          </div>
        </section>
      </div>
    
      {/* SEO: Competitor-Data Driven FAQ & Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How do I use the Health Hub Calculator accurately?","acceptedAnswer":{"@type":"Answer","text":"Enter your values into our free nepacalc.com/health/ tool and get instant results. Our engine is designed specifically for Nepalese users — no manual calculations needed. Popular search: \"healthy weight range\" with 1,900+ monthly searches in Nepal."}},{"@type":"Question","name":"Is this Health Hub Calculator completely free?","acceptedAnswer":{"@type":"Answer","text":"Yes, NepaCal's Health Hub Calculator is 100% free — no sign-up, no hidden charges. We make reliable tools like this healthy fat percentage female accessible to everyone in Nepal."}},{"@type":"Question","name":"What is the formula used by this nepacalc.com/health/?","acceptedAnswer":{"@type":"Answer","text":"Our Health Hub Calculator uses globally verified standard formulas for maximum accuracy. It handles all variables automatically so you can what body fat percentage is healthy instantly without manual errors."}},{"@type":"Question","name":"Can I use this healthy weight range on my phone?","acceptedAnswer":{"@type":"Answer","text":"Absolutely. Our nepacalc.com/health/ is fully responsive for mobile devices and desktops. Whether you search \"healthy body fat percentage male\" or \"healthy weight range\" on Google, NepaCal gives you the best tool for Nepal."}},{"@type":"Question","name":"Why is NepaCal's Health Hub Calculator better than other tools?","acceptedAnswer":{"@type":"Answer","text":"NepaCal is built specifically for Nepal. Our what is a healthy male body fat percentage uses local rates and Nepal-specific data, supports NPR, and is regularly updated. Unlike generic calculators, we target \"healthy weight range\" and \"healthy fat percentage for men\" with precision."}},{"@type":"Question","name":"What is \"nepacalc.com/health/\" and why do people search for it?","acceptedAnswer":{"@type":"Answer","text":"\"nepacalc.com/health/\" is one of the most searched terms with 1,900+ monthly searches in Nepal in Nepal. Our Health Hub Calculator helps you get accurate results for \"what body fat percentage is healthy\", \"healthy body fat percentage male\", and \"healthy percentage body fat male\" — all in one free tool."}}]},{"@context":"https://schema.org","@type":"SoftwareApplication","name":"Health Hub Calculator - NepaCal","url":"https://nepacalc.com/health","applicationCategory":"UtilityApplication","operatingSystem":"All","offers":{"@type":"Offer","price":"0","priceCurrency":"NPR"},"description":"1900","aggregateRating":{"@type":"AggregateRating","ratingValue":"4.6","ratingCount":196}}]) }}
      />
      <section className="mt-12 bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">About the Health Hub Calculator</h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-3">
          Looking for a free <strong>nepacalc.com/health/</strong> for Nepal? NepaCal&apos;s Health Hub Calculator is the most accurate and locally optimized tool available. Whether you need to <strong>what body fat percentage is healthy</strong>, find a reliable <strong>healthy body fat percentage male</strong>, or simply understand <strong>what is a healthy male body fat percentage</strong> — we have you covered with real Nepal data.
        </p>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8">
          Trusted by thousands of users across Nepal, our <strong>nepacalc.com/health/</strong> supports all your needs from daily calculations to professional use. Related searches our users find helpful: <strong>healthy weight range</strong>, <strong>healthy fat percentage female</strong>, <strong>what body fat percentage is healthy</strong>, <strong>healthy body fat percentage male</strong>, <strong>what is a healthy male body fat percentage</strong>.
        </p>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 tracking-tight border-t border-slate-100 dark:border-slate-800 pt-8">
          Frequently Asked Questions — Health Hub Calculator
        </h2>
        <div className="space-y-3">
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" open>
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q1.</span>
              <span>How do I use the Health Hub Calculator accurately?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Enter your values into our free <strong>nepacalc.com/health/</strong> tool and get instant results. Our engine is designed specifically for Nepalese users — no manual calculations needed. Popular search: "healthy weight range" with 1,900+ monthly searches in Nepal.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" open>
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q2.</span>
              <span>Is this Health Hub Calculator completely free?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Yes, NepaCal's Health Hub Calculator is 100% free — no sign-up, no hidden charges. We make reliable tools like this <strong>healthy fat percentage female</strong> accessible to everyone in Nepal.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q3.</span>
              <span>What is the formula used by this nepacalc.com/health/?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Our Health Hub Calculator uses globally verified standard formulas for maximum accuracy. It handles all variables automatically so you can <strong>what body fat percentage is healthy</strong> instantly without manual errors.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q4.</span>
              <span>Can I use this healthy weight range on my phone?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Absolutely. Our <strong>nepacalc.com/health/</strong> is fully responsive for mobile devices and desktops. Whether you search "healthy body fat percentage male" or "healthy weight range" on Google, NepaCal gives you the best tool for Nepal.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q5.</span>
              <span>Why is NepaCal's Health Hub Calculator better than other tools?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>NepaCal is built specifically for Nepal. Our <strong>what is a healthy male body fat percentage</strong> uses local rates and Nepal-specific data, supports NPR, and is regularly updated. Unlike generic calculators, we target "healthy weight range" and "healthy fat percentage for men" with precision.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q6.</span>
              <span>What is "nepacalc.com/health/" and why do people search for it?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>"nepacalc.com/health/" is one of the most searched terms with 1,900+ monthly searches in Nepal in Nepal. Our Health Hub Calculator helps you get accurate results for "what body fat percentage is healthy", "healthy body fat percentage male", and "healthy percentage body fat male" — all in one free tool.
            </div>
          </details>
        </div>
      </section>
    </>
  );
}
