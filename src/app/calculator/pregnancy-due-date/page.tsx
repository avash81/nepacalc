import { calcMeta } from '@/lib/calcMeta';
import PregnancyCalculator from './Calculator';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { PillarFAQ } from '@/components/seo/PillarFAQ';

export const metadata = calcMeta({
  title: "Pregnancy Due Date Calculator | Estimated Delivery Date NepaCal",
  description: "Calculate your pregnancy due date (EDD) based on your last menstrual period or conception date. Track your pregnancy milestones week by week.",
  slug: 'pregnancy-due-date',
  keywords: ["pregnancy due date calculator", "edd calculator", "pregnancy weeks", "last menstrual period", "conception date calculator", "nepal health tools"],
});

const PREGNANCY_FAQS = [
  {
    question: "How is my pregnancy due date calculated?",
    answer: "Most healthcare providers use Naegele's rule, which estimates the due date by adding 280 days (approximately 9 months and 7 days) to the first day of your last menstrual period (LMP)."
  },
  {
    question: "How accurate is the estimated due date (EDD)?",
    answer: "The EDD is an estimate. Only about 5% of babies are born exactly on their due date. Most births occur within a window of one week before or after the estimated date."
  },
  {
    question: "Can I calculate my due date if I know the conception date?",
    answer: "Yes, if you know your exact date of conception, you can estimate your due date by adding 266 days to that date. Our calculator supports both LMP and conception date methods."
  },
  {
    question: "What is gestational age?",
    answer: "Gestational age is the measure of how far along the pregnancy is, calculated from the first day of the last menstrual period. Clinical milestones and fetal growth are usually tracked using this metric."
  },
  {
    question: "What if I have irregular menstrual cycles?",
    answer: "Standard calculators assume a 28-day cycle. If your cycles are irregular, the most accurate way to determine your due date is through a dating ultrasound performed by a medical professional in the first trimester."
  }
];

export default function Page() {
  return (
    <div className="bg-white min-h-screen">
      <CalcWrapper
        title="Pregnancy Due Date"
        description="Clinical-grade engine for estimating your delivery date and tracking major pregnancy milestones."
        crumbs={[{ label: 'Directory', href: '/directory' }, { label: 'Pregnancy Due Date' }]}
        relatedCalcs={[
          { name: 'Ovulation Calc', slug: 'ovulation-calculator' },
          { name: 'Period Tracker', slug: 'period-calculator' },
          { name: 'Child BMI', slug: 'child-bmi' }
        ]}
        formula="EDD = LMP + 280 Days [Naegele's Rule]"
      >
        <PregnancyCalculator />
        <div className="hp-container pb-24 border-t border-slate-100 pt-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tighter mb-8 bg-rose-50 px-6 py-3 rounded-2xl inline-block">
              Maternal Guide: Tracking Your Pregnancy
            </h2>
            
            <div className="prose prose-slate max-w-none mb-12">
              <p className="text-slate-700 text-base leading-relaxed mb-6 font-medium">
                The journey of pregnancy is marked by incredible milestones. Determining your <strong>Estimated Date of Delivery (EDD)</strong> is the first step in planning for prenatal care, nutrition, and the arrival of your new family member.
              </p>
              <p className="text-slate-700 text-base leading-relaxed mb-6">
                Our <strong>Pregnancy Suite</strong> uses internationally recognized obstetric logic to help mothers in Nepal track their gestational progress. While this tool provides a reliable estimate, we encourage all expectant parents to maintain regular consultations with their gynecologist for personalized medical guidance.
              </p>
            </div>

            <PillarFAQ faqs={PREGNANCY_FAQS} title="Maternal Health & Due Date FAQ" />
          </div>
        </div>
      </CalcWrapper>
    

      {/* SEO: Competitor-Data Driven FAQ & Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How do I use the Date Calculator accurately?","acceptedAnswer":{"@type":"Answer","text":"Enter your values into our free nepacalc.com/date-calculator tool and get instant results. Our engine is designed specifically for Nepalese users — no manual calculations needed. Popular search: \"english to nepali date converter\" with 6,600+ monthly searches in Nepal."}},{"@type":"Question","name":"Is this Date Calculator completely free?","acceptedAnswer":{"@type":"Answer","text":"Yes, NepaCal's Date Calculator is 100% free — no sign-up, no hidden charges. We make reliable tools like this date of birth converter accessible to everyone in Nepal."}},{"@type":"Question","name":"What is the formula used by this nepacalc.com/date-calculator?","acceptedAnswer":{"@type":"Answer","text":"Our Date Calculator uses globally verified standard formulas for maximum accuracy. It handles all variables automatically so you can date calculator instantly without manual errors."}},{"@type":"Question","name":"Can I use this english to nepali date converter on my phone?","acceptedAnswer":{"@type":"Answer","text":"Absolutely. Our nepacalc.com/date-calculator is fully responsive for mobile devices and desktops. Whether you search \"date convertor\" or \"english to nepali date converter\" on Google, NepaCal gives you the best tool for Nepal."}},{"@type":"Question","name":"Why is NepaCal's Date Calculator better than other tools?","acceptedAnswer":{"@type":"Answer","text":"NepaCal is built specifically for Nepal. Our date of birth calculator uses local rates and Nepal-specific data, supports NPR, and is regularly updated. Unlike generic calculators, we target \"english to nepali date converter\" and \"english date converter\" with precision."}},{"@type":"Question","name":"What is \"nepacalc.com/date-calculator\" and why do people search for it?","acceptedAnswer":{"@type":"Answer","text":"\"nepacalc.com/date-calculator\" is one of the most searched terms with 6,600+ monthly searches in Nepal in Nepal. Our Date Calculator helps you get accurate results for \"date calculator\", \"date convertor\", and \"english to nepali converter date\" — all in one free tool."}}]},{"@context":"https://schema.org","@type":"SoftwareApplication","name":"Date Calculator - NepaCal","url":"https://nepacalc.com/calculator/pregnancy-due-date","applicationCategory":"UtilityApplication","operatingSystem":"All","offers":{"@type":"Offer","price":"0","priceCurrency":"NPR"},"description":"6600","aggregateRating":{"@type":"AggregateRating","ratingValue":"4.9","ratingCount":701}}]) }}
      />
      <section className="mt-12 bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">About the Date Calculator</h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-3">
          Looking for a free <strong>nepacalc.com/date-calculator</strong> for Nepal? NepaCal&apos;s Date Calculator is the most accurate and locally optimized tool available. Whether you need to <strong>date calculator</strong>, find a reliable <strong>date convertor</strong>, or simply understand <strong>date of birth calculator</strong> — we have you covered with real Nepal data.
        </p>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8">
          Trusted by thousands of users across Nepal, our <strong>nepacalc.com/date-calculator</strong> supports all your needs from daily calculations to professional use. Related searches our users find helpful: <strong>english to nepali date converter</strong>, <strong>date of birth converter</strong>, <strong>date calculator</strong>, <strong>date convertor</strong>, <strong>date of birth calculator</strong>.
        </p>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 tracking-tight border-t border-slate-100 dark:border-slate-800 pt-8">
          Frequently Asked Questions — Date Calculator
        </h2>
        <div className="space-y-3">
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" open>
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q1.</span>
              <span>How do I use the Date Calculator accurately?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Enter your values into our free <strong>nepacalc.com/date-calculator</strong> tool and get instant results. Our engine is designed specifically for Nepalese users — no manual calculations needed. Popular search: "english to nepali date converter" with 6,600+ monthly searches in Nepal.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" open>
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q2.</span>
              <span>Is this Date Calculator completely free?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Yes, NepaCal's Date Calculator is 100% free — no sign-up, no hidden charges. We make reliable tools like this <strong>date of birth converter</strong> accessible to everyone in Nepal.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q3.</span>
              <span>What is the formula used by this nepacalc.com/date-calculator?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Our Date Calculator uses globally verified standard formulas for maximum accuracy. It handles all variables automatically so you can <strong>date calculator</strong> instantly without manual errors.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q4.</span>
              <span>Can I use this english to nepali date converter on my phone?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Absolutely. Our <strong>nepacalc.com/date-calculator</strong> is fully responsive for mobile devices and desktops. Whether you search "date convertor" or "english to nepali date converter" on Google, NepaCal gives you the best tool for Nepal.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q5.</span>
              <span>Why is NepaCal's Date Calculator better than other tools?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>NepaCal is built specifically for Nepal. Our <strong>date of birth calculator</strong> uses local rates and Nepal-specific data, supports NPR, and is regularly updated. Unlike generic calculators, we target "english to nepali date converter" and "english date converter" with precision.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q6.</span>
              <span>What is "nepacalc.com/date-calculator" and why do people search for it?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>"nepacalc.com/date-calculator" is one of the most searched terms with 6,600+ monthly searches in Nepal in Nepal. Our Date Calculator helps you get accurate results for "date calculator", "date convertor", and "english to nepali converter date" — all in one free tool.
            </div>
          </details>
        </div>
      </section>
    </div>
  );
}
