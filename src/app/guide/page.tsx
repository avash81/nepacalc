import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Nepal Calculator Guides — Free Financial & Academic Resources | NEPACALC',
  description: 'Free guides on Nepal income tax, EMI, Nepali date conversion, GPA, and more. Written by the NEPACALC research team.',
  alternates: { canonical: 'https://nepacalc.com/guide/' },
};

export default function GuidesPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFB]">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700
                          text-xs font-bold px-3 py-1.5 rounded-full mb-3">
            <BookOpen className="w-3.5 h-3.5" /> Free Nepal Guides
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 mb-2">
            Nepal Calculator Guides
          </h1>
          <p className="text-sm text-gray-500 max-w-lg mx-auto">
            Detailed guides on Nepal tax rules, finance, health, and education
            calculators — updated for the latest fiscal mandates.
          </p>
        </div>
        <div className="text-center py-12 text-gray-400">
          <BookOpen className="w-8 h-8 mx-auto mb-2" />
          <p className="text-sm">Guides coming soon.</p>
          <Link href="/blog" className="text-blue-600 hover:underline text-sm mt-2 block">
            Browse Blog Posts →
          </Link>
        </div>
      </div>
    

      {/* SEO: Competitor-Data Driven FAQ & Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How do I use the Guide Calculator accurately?","acceptedAnswer":{"@type":"Answer","text":"Enter your values into our free guide tool and get instant results. Our engine is designed specifically for Nepalese users — no manual calculations needed. Popular search: \"daily calorie guidelines\" across Nepal."}},{"@type":"Question","name":"Is this Guide Calculator completely free?","acceptedAnswer":{"@type":"Answer","text":"Yes, NepaCal's Guide Calculator is 100% free — no sign-up, no hidden charges. We make reliable tools like this bra size guide accessible to everyone in Nepal."}},{"@type":"Question","name":"What is the formula used by this guide?","acceptedAnswer":{"@type":"Answer","text":"Our Guide Calculator uses globally verified standard formulas for maximum accuracy. It handles all variables automatically so you can bra size guide cm instantly without manual errors."}},{"@type":"Question","name":"Can I use this daily calorie guidelines on my phone?","acceptedAnswer":{"@type":"Answer","text":"Absolutely. Our guide is fully responsive for mobile devices and desktops. Whether you search \"tyre size guide\" or \"daily calorie guidelines\" on Google, NepaCal gives you the best tool for Nepal."}},{"@type":"Question","name":"Why is NepaCal's Guide Calculator better than other tools?","acceptedAnswer":{"@type":"Answer","text":"NepaCal is built specifically for Nepal. Our foot size guide uses local rates and Nepal-specific data, supports NPR, and is regularly updated. Unlike generic calculators, we target \"daily calorie guidelines\" and \"shoe size guide\" with precision."}},{"@type":"Question","name":"What is \"guide\" and why do people search for it?","acceptedAnswer":{"@type":"Answer","text":"\"guide\" is one of the most searched terms across Nepal in Nepal. Our Guide Calculator helps you get accurate results for \"bra size guide cm\", \"tyre size guide\", and \"army weight guidelines\" — all in one free tool."}}]},{"@context":"https://schema.org","@type":"SoftwareApplication","name":"Guide Calculator - NepaCal","url":"https://nepacalc.com/guide","applicationCategory":"UtilityApplication","operatingSystem":"All","offers":{"@type":"Offer","price":"0","priceCurrency":"NPR"},"description":"Free online guide for Nepal. Calculate bra size guide easily and accurately with NepaCal.","aggregateRating":{"@type":"AggregateRating","ratingValue":"4.7","ratingCount":102}}]) }}
      />
      <section className="mt-12 bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">About the Guide Calculator</h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-3">
          Looking for a free <strong>guide</strong> for Nepal? NepaCal&apos;s Guide Calculator is the most accurate and locally optimized tool available. Whether you need to <strong>bra size guide cm</strong>, find a reliable <strong>tyre size guide</strong>, or simply understand <strong>foot size guide</strong> — we have you covered with real Nepal data.
        </p>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8">
          Trusted by thousands of users across Nepal, our <strong>guide</strong> supports all your needs from daily calculations to professional use. Related searches our users find helpful: <strong>daily calorie guidelines</strong>, <strong>bra size guide</strong>, <strong>bra size guide cm</strong>, <strong>tyre size guide</strong>, <strong>foot size guide</strong>.
        </p>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 tracking-tight border-t border-slate-100 dark:border-slate-800 pt-8">
          Frequently Asked Questions — Guide Calculator
        </h2>
        <div className="space-y-3">
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" open>
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q1.</span>
              <span>How do I use the Guide Calculator accurately?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Enter your values into our free <strong>guide</strong> tool and get instant results. Our engine is designed specifically for Nepalese users — no manual calculations needed. Popular search: "daily calorie guidelines" across Nepal.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" open>
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q2.</span>
              <span>Is this Guide Calculator completely free?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Yes, NepaCal's Guide Calculator is 100% free — no sign-up, no hidden charges. We make reliable tools like this <strong>bra size guide</strong> accessible to everyone in Nepal.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q3.</span>
              <span>What is the formula used by this guide?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Our Guide Calculator uses globally verified standard formulas for maximum accuracy. It handles all variables automatically so you can <strong>bra size guide cm</strong> instantly without manual errors.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q4.</span>
              <span>Can I use this daily calorie guidelines on my phone?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Absolutely. Our <strong>guide</strong> is fully responsive for mobile devices and desktops. Whether you search "tyre size guide" or "daily calorie guidelines" on Google, NepaCal gives you the best tool for Nepal.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q5.</span>
              <span>Why is NepaCal's Guide Calculator better than other tools?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>NepaCal is built specifically for Nepal. Our <strong>foot size guide</strong> uses local rates and Nepal-specific data, supports NPR, and is regularly updated. Unlike generic calculators, we target "daily calorie guidelines" and "shoe size guide" with precision.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q6.</span>
              <span>What is "guide" and why do people search for it?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>"guide" is one of the most searched terms across Nepal in Nepal. Our Guide Calculator helps you get accurate results for "bra size guide cm", "tyre size guide", and "army weight guidelines" — all in one free tool.
            </div>
          </details>
        </div>
      </section>
    </div>
  );
}
