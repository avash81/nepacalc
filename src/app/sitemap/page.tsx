import Link from 'next/link';
import { CATEGORIES } from '@/data/calculators';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Full Site Index — Complete HTML Sitemap',
  description: 'A comprehensive, human-readable directory of every tool and calculator available on NEPACALC. Organized for optimal crawlability and ease of use.',
};

export default function HTMLSitemap() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] pt-20 pb-0 sm:pb-20 font-sans">
       <main className="max-w-4xl mx-auto px-6 bg-white p-12 shadow-sm border border-slate-200 rounded-xl">
          
          {/* Breadcrumb Path & Back Button */}
          <div className="mb-10 flex flex-wrap items-center gap-4">
            <Link 
               href="/"
               className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-[#5F6368] hover:text-blue-600 transition-all border-r border-[#dadce0] pr-4 py-1"
            >
               <ArrowLeft className="w-4 h-4" /> <span>Back</span>
            </Link>

            <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-2 text-[13px] font-medium text-[#5f6368]">
              <Link href="/" className="hover:text-blue-600 hover:underline">Home</Link>
              <span className="text-slate-300">/</span>
              <span className="text-[#202124] font-bold">HTML Sitemap</span>
            </nav>
          </div>

          <header className="mb-12 border-b border-slate-200 pb-8">
             <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-3">HTML Sitemap</h1>
             <p className="text-slate-600 font-medium">
               Complete hierarchical index of the NEPACALC platform. This document outlines our entire organizational structure to assist both users and search engines.
             </p>
          </header>

          <div className="space-y-12">
             {CATEGORIES.map(cat => (
                <section key={cat.id} id={cat.id}>
                   <h2 className="text-xl font-black text-slate-900 border-b-2 border-indigo-500 inline-block pb-1 mb-6 uppercase tracking-tight">
                      {cat.name}
                   </h2>
                                      <ul className="space-y-4 pl-4 border-l-2 border-slate-100 ml-2">

                      {cat.calculators.sort((a,b) => a.name.localeCompare(b.name)).map(calc => (
                         <li key={calc.id} className="relative">
                            <span className="absolute -left-[21px] top-2.5 w-3 h-0.5 bg-slate-200"></span>
                            <Link 
                               href={calc.slug.includes('/') ? `/${calc.slug}` : `/calculator/${calc.slug}`}
                               className="text-base font-semibold text-blue-600 hover:text-blue-800 hover:underline inline-block mr-2"
                            >
                               {calc.name}
                            </Link>
                            <span className="text-sm text-slate-500 hidden sm:inline-block">
                               — {calc.description}
                            </span>
                            <p className="text-xs text-slate-400 sm:hidden mt-0.5 max-w-[280px] leading-tight">
                               {calc.description}
                            </p>
                         </li>
                      ))}
                   </ul>
                </section>
             ))}

             <section>
                <h2 className="text-xl font-black text-slate-900 border-b-2 border-slate-500 inline-block pb-1 mb-6 uppercase tracking-tight">
                   Institutional Resources
                </h2>
                <ul className="space-y-4 pl-4 border-l-2 border-slate-100 ml-2">
                   <li className="relative">
                      <span className="absolute -left-[21px] top-2.5 w-3 h-0.5 bg-slate-200"></span>
                      <Link href="/blog" className="text-base font-semibold text-blue-600 hover:text-blue-800 hover:underline mr-2">Research Library (Blog)</Link>
                      <span className="text-sm text-slate-500 hidden sm:inline-block">— Specialized guides and platform updates.</span>
                   </li>
                   <li className="relative">
                      <span className="absolute -left-[21px] top-2.5 w-3 h-0.5 bg-slate-200"></span>
                      <Link href="/directory" className="text-base font-semibold text-blue-600 hover:text-blue-800 hover:underline mr-2">Visual Tool Directory</Link>
                      <span className="text-sm text-slate-500 hidden sm:inline-block">— Global index of all calculated units and visualizers.</span>
                   </li>
                   <li className="relative">
                      <span className="absolute -left-[21px] top-2.5 w-3 h-0.5 bg-slate-200"></span>
                      <Link href="/nepal" className="text-base font-semibold text-blue-600 hover:text-blue-800 hover:underline mr-2">Nepal-Specific Pillar</Link>
                      <span className="text-sm text-slate-500 hidden sm:inline-block">— Localized tools for the Nepali mathematical standards.</span>
                   </li>
                </ul>
             </section>
             <div className="mt-16 sm:mt-20 pt-8 border-t border-slate-200" aria-hidden="true" />
          </div>
    

      {/* SEO: Competitor-Data Driven FAQ & Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How do I use the Sitemap Calculator accurately?","acceptedAnswer":{"@type":"Answer","text":"Enter your values into our free sitemap tool and get instant results. Our engine is designed specifically for Nepalese users — no manual calculations needed. Popular search: \"sitemap nepal\" across Nepal."}},{"@type":"Question","name":"Is this Sitemap Calculator completely free?","acceptedAnswer":{"@type":"Answer","text":"Yes, NepaCal's Sitemap Calculator is 100% free — no sign-up, no hidden charges. We make reliable tools like this free sitemap accessible to everyone in Nepal."}},{"@type":"Question","name":"What is the formula used by this sitemap?","acceptedAnswer":{"@type":"Answer","text":"Our Sitemap Calculator uses globally verified standard formulas for maximum accuracy. It handles all variables automatically so you can online sitemap instantly without manual errors."}},{"@type":"Question","name":"Can I use this sitemap nepal on my phone?","acceptedAnswer":{"@type":"Answer","text":"Absolutely. Our sitemap is fully responsive for mobile devices and desktops. Whether you search \"sitemap calculator\" or \"sitemap nepal\" on Google, NepaCal gives you the best tool for Nepal."}},{"@type":"Question","name":"Why is NepaCal's Sitemap Calculator better than other tools?","acceptedAnswer":{"@type":"Answer","text":"NepaCal is built specifically for Nepal. Our how to calculate sitemap uses local rates and Nepal-specific data, supports NPR, and is regularly updated. Unlike generic calculators, we target \"sitemap nepal\" and \"best sitemap tool\" with precision."}},{"@type":"Question","name":"What is \"sitemap\" and why do people search for it?","acceptedAnswer":{"@type":"Answer","text":"\"sitemap\" is one of the most searched terms across Nepal in Nepal. Our Sitemap Calculator helps you get accurate results for \"online sitemap\", \"sitemap calculator\", and \"sitemap formula\" — all in one free tool."}}]},{"@context":"https://schema.org","@type":"SoftwareApplication","name":"Sitemap Calculator - NepaCal","url":"https://nepacalc.com/sitemap","applicationCategory":"UtilityApplication","operatingSystem":"All","offers":{"@type":"Offer","price":"0","priceCurrency":"NPR"},"description":"Free online sitemap for Nepal. Calculate free sitemap easily and accurately with NepaCal.","aggregateRating":{"@type":"AggregateRating","ratingValue":"4.7","ratingCount":100}}]) }}
      />
      <section className="mt-12 bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">About the Sitemap Calculator</h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-3">
          Looking for a free <strong>sitemap</strong> for Nepal? NepaCal&apos;s Sitemap Calculator is the most accurate and locally optimized tool available. Whether you need to <strong>online sitemap</strong>, find a reliable <strong>sitemap calculator</strong>, or simply understand <strong>how to calculate sitemap</strong> — we have you covered with real Nepal data.
        </p>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8">
          Trusted by thousands of users across Nepal, our <strong>sitemap</strong> supports all your needs from daily calculations to professional use. Related searches our users find helpful: <strong>sitemap nepal</strong>, <strong>free sitemap</strong>, <strong>online sitemap</strong>, <strong>sitemap calculator</strong>, <strong>how to calculate sitemap</strong>.
        </p>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 tracking-tight border-t border-slate-100 dark:border-slate-800 pt-8">
          Frequently Asked Questions — Sitemap Calculator
        </h2>
        <div className="space-y-3">
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" open>
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q1.</span>
              <span>How do I use the Sitemap Calculator accurately?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Enter your values into our free <strong>sitemap</strong> tool and get instant results. Our engine is designed specifically for Nepalese users — no manual calculations needed. Popular search: "sitemap nepal" across Nepal.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" open>
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q2.</span>
              <span>Is this Sitemap Calculator completely free?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Yes, NepaCal's Sitemap Calculator is 100% free — no sign-up, no hidden charges. We make reliable tools like this <strong>free sitemap</strong> accessible to everyone in Nepal.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q3.</span>
              <span>What is the formula used by this sitemap?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Our Sitemap Calculator uses globally verified standard formulas for maximum accuracy. It handles all variables automatically so you can <strong>online sitemap</strong> instantly without manual errors.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q4.</span>
              <span>Can I use this sitemap nepal on my phone?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Absolutely. Our <strong>sitemap</strong> is fully responsive for mobile devices and desktops. Whether you search "sitemap calculator" or "sitemap nepal" on Google, NepaCal gives you the best tool for Nepal.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q5.</span>
              <span>Why is NepaCal's Sitemap Calculator better than other tools?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>NepaCal is built specifically for Nepal. Our <strong>how to calculate sitemap</strong> uses local rates and Nepal-specific data, supports NPR, and is regularly updated. Unlike generic calculators, we target "sitemap nepal" and "best sitemap tool" with precision.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q6.</span>
              <span>What is "sitemap" and why do people search for it?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>"sitemap" is one of the most searched terms across Nepal in Nepal. Our Sitemap Calculator helps you get accurate results for "online sitemap", "sitemap calculator", and "sitemap formula" — all in one free tool.
            </div>
          </details>
        </div>
      </section>
    </main>
    </div>
  );
}
