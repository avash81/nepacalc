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
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "How to use the Nepal Calculators and Tools at NepaCal tool?", "acceptedAnswer": { "@type": "Answer", "text": "Simply enter your data and our free nepal calculator tool will provide instant results tailored for Nepal." } },
            { "@type": "Question", "name": "Is this Nepal Calculators and Tools at NepaCal free?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, NepaCal's Nepal Calculators and Tools at NepaCal is 100% free with no registration required." } }
          ]
        }) }}
      />
      <section className="mt-12 bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">About the Nepal Calculators and Tools at NepaCal</h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-3">
          Our free <strong>nepal calculator</strong> is optimized for Nepalese users. Whether you need an online nepal calculator or want to calculate accurately — NepaCal is your best tool.
        </p>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8">
          Related: <strong>nepal calculator</strong>, <strong>dollar to rupee nepali</strong>, <strong>nepali time right now</strong>, <strong>american dollar in nepali rupees</strong>, <strong>pound into nepali</strong>, <strong>dollar into nepali</strong>.
        </p>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 tracking-tight border-t border-slate-100 dark:border-slate-800 pt-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" open>
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q1.</span>
              <span>How do I use the Nepal Calculators and Tools at NepaCal?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              Enter your values above to get results instantly.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" open>
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q2.</span>
              <span>Is it accurate for Nepal?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              Yes, our <strong>nepal calculator</strong> is regularly updated to reflect local standards.
            </div>
          </details>
        </div>
      </section>
    </div>
  );
}
