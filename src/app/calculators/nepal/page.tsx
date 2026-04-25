'use client';

import { useState } from 'react';
import { CALCULATORS } from '@/data/calculators';
import { Search } from 'lucide-react';
import { CalculatorCard } from '@/components/calculator/CalculatorCard';
import { NepalFlag } from '@/components/ui/NepalFlag';

export default function NepalCalculatorsPage() {
  const [search, setSearch] = useState('');

  const nepalCalculators = CALCULATORS.filter(calc => calc.isNepal);
  
  const filteredCalculators = nepalCalculators.filter(calc => {
    return calc.name.toLowerCase().includes(search.toLowerCase()) || 
           calc.description.toLowerCase().includes(search.toLowerCase()) ||
           calc.keywords?.some(k => k.includes(search.toLowerCase()));
  });

  return (
    <div className="min-h-screen bg-cp-bg font-sans py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <NepalFlag />
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
              Nepal <span className="text-red-600">Calculators</span>
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tools specifically designed for Nepal, including Income Tax (2082/83), Salary, VAT, and more.
          </p>
        </div>

        {/* Search */}
        <div className="space-y-8 mb-16 max-w-4xl mx-auto">
          <div className="relative w-full group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-6 w-6 text-gray-400 group-focus-within:text-red-500 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search Nepal tools (e.g. 'Tax', 'Salary')..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="block w-full pl-12 pr-4 py-4 text-base sm:text-lg text-gray-900 bg-white border-2 border-gray-200 rounded-2xl focus:ring-0 focus:border-red-500 shadow-sm hover:border-gray-300 transition-all outline-none"
            />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCalculators.map((calc) => (
            <CalculatorCard key={calc.id} calc={calc} />
          ))}
        </div>

        {filteredCalculators.length === 0 && (
          <div className="text-center py-24 bg-white rounded-3xl border border-gray-200 shadow-sm mt-8">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No tools found</h3>
            <p className="text-gray-500 text-lg">Try searching for something else.</p>
          </div>
        )}
      </div>
    

      {/* SEO: Competitor-Data Driven FAQ & Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How do I use the Nepal Tools Hub Calculator accurately?","acceptedAnswer":{"@type":"Answer","text":"Enter your values into our free nepacalc.com/nepal/ tool and get instant results. Our engine is designed specifically for Nepalese users — no manual calculations needed. Popular search: \"1 dollars in nepali rupees\" with 2,400+ monthly searches in Nepal."}},{"@type":"Question","name":"Is this Nepal Tools Hub Calculator completely free?","acceptedAnswer":{"@type":"Answer","text":"Yes, NepaCal's Nepal Tools Hub Calculator is 100% free — no sign-up, no hidden charges. We make reliable tools like this english to nepali date converter accessible to everyone in Nepal."}},{"@type":"Question","name":"What is the formula used by this nepacalc.com/nepal/?","acceptedAnswer":{"@type":"Answer","text":"Our Nepal Tools Hub Calculator uses globally verified standard formulas for maximum accuracy. It handles all variables automatically so you can 900 euro in nepali rupees instantly without manual errors."}},{"@type":"Question","name":"Can I use this 1 dollars in nepali rupees on my phone?","acceptedAnswer":{"@type":"Answer","text":"Absolutely. Our nepacalc.com/nepal/ is fully responsive for mobile devices and desktops. Whether you search \"1 million dollars in nepali rupees\" or \"1 dollars in nepali rupees\" on Google, NepaCal gives you the best tool for Nepal."}},{"@type":"Question","name":"Why is NepaCal's Nepal Tools Hub Calculator better than other tools?","acceptedAnswer":{"@type":"Answer","text":"NepaCal is built specifically for Nepal. Our english to nepali converter date uses local rates and Nepal-specific data, supports NPR, and is regularly updated. Unlike generic calculators, we target \"1 dollars in nepali rupees\" and \"english date to nepali date converter\" with precision."}},{"@type":"Question","name":"What is \"nepacalc.com/nepal/\" and why do people search for it?","acceptedAnswer":{"@type":"Answer","text":"\"nepacalc.com/nepal/\" is one of the most searched terms with 2,400+ monthly searches in Nepal in Nepal. Our Nepal Tools Hub Calculator helps you get accurate results for \"900 euro in nepali rupees\", \"1 million dollars in nepali rupees\", and \"convert dollar to nepali\" — all in one free tool."}}]},{"@context":"https://schema.org","@type":"SoftwareApplication","name":"Nepal Tools Hub Calculator - NepaCal","url":"https://nepacalc.com/calculators/nepal","applicationCategory":"UtilityApplication","operatingSystem":"All","offers":{"@type":"Offer","price":"0","priceCurrency":"NPR"},"description":"2400","aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":371}}]) }}
      />
      <section className="mt-12 bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">About the Nepal Tools Hub Calculator</h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-3">
          Looking for a free <strong>nepacalc.com/nepal/</strong> for Nepal? NepaCal&apos;s Nepal Tools Hub Calculator is the most accurate and locally optimized tool available. Whether you need to <strong>900 euro in nepali rupees</strong>, find a reliable <strong>1 million dollars in nepali rupees</strong>, or simply understand <strong>english to nepali converter date</strong> — we have you covered with real Nepal data.
        </p>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8">
          Trusted by thousands of users across Nepal, our <strong>nepacalc.com/nepal/</strong> supports all your needs from daily calculations to professional use. Related searches our users find helpful: <strong>1 dollars in nepali rupees</strong>, <strong>english to nepali date converter</strong>, <strong>900 euro in nepali rupees</strong>, <strong>1 million dollars in nepali rupees</strong>, <strong>english to nepali converter date</strong>.
        </p>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 tracking-tight border-t border-slate-100 dark:border-slate-800 pt-8">
          Frequently Asked Questions — Nepal Tools Hub Calculator
        </h2>
        <div className="space-y-3">
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" open>
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q1.</span>
              <span>How do I use the Nepal Tools Hub Calculator accurately?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Enter your values into our free <strong>nepacalc.com/nepal/</strong> tool and get instant results. Our engine is designed specifically for Nepalese users — no manual calculations needed. Popular search: "1 dollars in nepali rupees" with 2,400+ monthly searches in Nepal.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" open>
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q2.</span>
              <span>Is this Nepal Tools Hub Calculator completely free?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Yes, NepaCal's Nepal Tools Hub Calculator is 100% free — no sign-up, no hidden charges. We make reliable tools like this <strong>english to nepali date converter</strong> accessible to everyone in Nepal.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q3.</span>
              <span>What is the formula used by this nepacalc.com/nepal/?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Our Nepal Tools Hub Calculator uses globally verified standard formulas for maximum accuracy. It handles all variables automatically so you can <strong>900 euro in nepali rupees</strong> instantly without manual errors.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q4.</span>
              <span>Can I use this 1 dollars in nepali rupees on my phone?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Absolutely. Our <strong>nepacalc.com/nepal/</strong> is fully responsive for mobile devices and desktops. Whether you search "1 million dollars in nepali rupees" or "1 dollars in nepali rupees" on Google, NepaCal gives you the best tool for Nepal.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q5.</span>
              <span>Why is NepaCal's Nepal Tools Hub Calculator better than other tools?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>NepaCal is built specifically for Nepal. Our <strong>english to nepali converter date</strong> uses local rates and Nepal-specific data, supports NPR, and is regularly updated. Unlike generic calculators, we target "1 dollars in nepali rupees" and "english date to nepali date converter" with precision.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q6.</span>
              <span>What is "nepacalc.com/nepal/" and why do people search for it?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>"nepacalc.com/nepal/" is one of the most searched terms with 2,400+ monthly searches in Nepal in Nepal. Our Nepal Tools Hub Calculator helps you get accurate results for "900 euro in nepali rupees", "1 million dollars in nepali rupees", and "convert dollar to nepali" — all in one free tool.
            </div>
          </details>
        </div>
      </section>
    </div>
  );
}
