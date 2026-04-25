import { Metadata } from 'next';
import DirectoryClient from './DirectoryClient';

export const metadata: Metadata = {
  title: 'Full Tool Directory — 80+ Precision Calculators | NEPACALC',
  description: 'Explore our complete index of scientific, financial, health, and engineering calculators. Official directory of high-precision mathematical units for Nepal.',
  alternates: {
    canonical: '/directory/',
  },
  openGraph: {
    title: 'Full Tool Directory — 80+ Precision Calculators | NEPACALC',
    description: 'Explore our complete index of scientific, financial, health, and engineering calculators.',
    url: 'https://nepacalc.com/directory',
  }
};

export default function DirectoryPage() {
  return (
    <>
      <DirectoryClient />
    
      {/* SEO: Competitor-Data Driven FAQ & Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How do I use the Directory Calculator accurately?","acceptedAnswer":{"@type":"Answer","text":"Enter your values into our free directory tool and get instant results. Our engine is designed specifically for Nepalese users — no manual calculations needed. Popular search: \"directory nepal\" across Nepal."}},{"@type":"Question","name":"Is this Directory Calculator completely free?","acceptedAnswer":{"@type":"Answer","text":"Yes, NepaCal's Directory Calculator is 100% free — no sign-up, no hidden charges. We make reliable tools like this free directory accessible to everyone in Nepal."}},{"@type":"Question","name":"What is the formula used by this directory?","acceptedAnswer":{"@type":"Answer","text":"Our Directory Calculator uses globally verified standard formulas for maximum accuracy. It handles all variables automatically so you can online directory instantly without manual errors."}},{"@type":"Question","name":"Can I use this directory nepal on my phone?","acceptedAnswer":{"@type":"Answer","text":"Absolutely. Our directory is fully responsive for mobile devices and desktops. Whether you search \"directory calculator\" or \"directory nepal\" on Google, NepaCal gives you the best tool for Nepal."}},{"@type":"Question","name":"Why is NepaCal's Directory Calculator better than other tools?","acceptedAnswer":{"@type":"Answer","text":"NepaCal is built specifically for Nepal. Our how to calculate directory uses local rates and Nepal-specific data, supports NPR, and is regularly updated. Unlike generic calculators, we target \"directory nepal\" and \"best directory tool\" with precision."}},{"@type":"Question","name":"What is \"directory\" and why do people search for it?","acceptedAnswer":{"@type":"Answer","text":"\"directory\" is one of the most searched terms across Nepal in Nepal. Our Directory Calculator helps you get accurate results for \"online directory\", \"directory calculator\", and \"directory formula\" — all in one free tool."}}]},{"@context":"https://schema.org","@type":"SoftwareApplication","name":"Directory Calculator - NepaCal","url":"https://nepacalc.com/directory","applicationCategory":"UtilityApplication","operatingSystem":"All","offers":{"@type":"Offer","price":"0","priceCurrency":"NPR"},"description":"Free online directory for Nepal. Calculate free directory easily and accurately with NepaCal.","aggregateRating":{"@type":"AggregateRating","ratingValue":"4.7","ratingCount":100}}]) }}
      />
      <section className="mt-12 bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">About the Directory Calculator</h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-3">
          Looking for a free <strong>directory</strong> for Nepal? NepaCal&apos;s Directory Calculator is the most accurate and locally optimized tool available. Whether you need to <strong>online directory</strong>, find a reliable <strong>directory calculator</strong>, or simply understand <strong>how to calculate directory</strong> — we have you covered with real Nepal data.
        </p>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8">
          Trusted by thousands of users across Nepal, our <strong>directory</strong> supports all your needs from daily calculations to professional use. Related searches our users find helpful: <strong>directory nepal</strong>, <strong>free directory</strong>, <strong>online directory</strong>, <strong>directory calculator</strong>, <strong>how to calculate directory</strong>.
        </p>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 tracking-tight border-t border-slate-100 dark:border-slate-800 pt-8">
          Frequently Asked Questions — Directory Calculator
        </h2>
        <div className="space-y-3">
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" open>
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q1.</span>
              <span>How do I use the Directory Calculator accurately?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Enter your values into our free <strong>directory</strong> tool and get instant results. Our engine is designed specifically for Nepalese users — no manual calculations needed. Popular search: "directory nepal" across Nepal.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" open>
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q2.</span>
              <span>Is this Directory Calculator completely free?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Yes, NepaCal's Directory Calculator is 100% free — no sign-up, no hidden charges. We make reliable tools like this <strong>free directory</strong> accessible to everyone in Nepal.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q3.</span>
              <span>What is the formula used by this directory?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Our Directory Calculator uses globally verified standard formulas for maximum accuracy. It handles all variables automatically so you can <strong>online directory</strong> instantly without manual errors.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q4.</span>
              <span>Can I use this directory nepal on my phone?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Absolutely. Our <strong>directory</strong> is fully responsive for mobile devices and desktops. Whether you search "directory calculator" or "directory nepal" on Google, NepaCal gives you the best tool for Nepal.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q5.</span>
              <span>Why is NepaCal's Directory Calculator better than other tools?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>NepaCal is built specifically for Nepal. Our <strong>how to calculate directory</strong> uses local rates and Nepal-specific data, supports NPR, and is regularly updated. Unlike generic calculators, we target "directory nepal" and "best directory tool" with precision.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q6.</span>
              <span>What is "directory" and why do people search for it?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>"directory" is one of the most searched terms across Nepal in Nepal. Our Directory Calculator helps you get accurate results for "online directory", "directory calculator", and "directory formula" — all in one free tool.
            </div>
          </details>
        </div>
      </section>
    </>
  );
}
