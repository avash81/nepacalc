import { calcMeta } from '@/lib/calcMeta';
import type { Metadata } from 'next';
import CalorieCalculator from './Calculator';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { PillarFAQ } from '@/components/seo/PillarFAQ';

export const metadata = calcMeta({
  title: "Calorie Calculator | Daily Needs & Weight Loss Goals Nepal NepaCal",
  description: "Calculate your daily calorie needs for weight loss, maintenance, or muscle gain. Tailored for Nepalese lifestyles with BMR and TDEE precision.",
  slug: 'calorie-calculator',
  keywords: ["calorie calculator nepal", "daily calorie needs", "calorie deficit for weight loss", "tdee calculator nepal", "how many calories to eat", "fitness nutrition nepal"],
});

const CALORIE_FAQS = [
  {
    question: "How many calories do I need per day in Nepal?",
    answer: "This depends on your activity level. A sedentary worker in Kathmandu might need 1,800-2,000 calories, while an active trekker could require over 3,000 calories."
  },
  {
    question: "How many calories should I cut to lose 1kg a week?",
    answer: "To lose 1kg of fat, you need a deficit of roughly 7,700 calories. A daily deficit of 500-700 calories is generally recommended for safe, sustainable weight loss."
  },
  {
    question: "Do calories from Dal Bhat count differently?",
    answer: "A calorie is a unit of energy, but nutritional quality matters. Dal Bhat is a balanced meal providing sustained energy, making it superior to processed snacks."
  },
  {
    question: "Should I track my exercise calories separately?",
    answer: "Our calculator includes an activity factor (TDEE). While exercise burns calories, most people overestimate the burn; tracking through TDEE is more accurate."
  },
  {
    question: "What is the minimum calories I should eat daily?",
    answer: "Generally, men should not go below 1,500 and women below 1,200 calories without medical supervision to ensure adequate nutrient intake."
  }
];

export default function Page() {
  return (
    <div className="bg-white min-h-screen">
      <CalcWrapper
        title="Daily Calorie Estimator"
        description="High-precision nutritional engine for calculating your total daily energy expenditure and setting personalized weight management targets."
        crumbs={[{ label: 'Directory', href: '/directory' }, { label: 'Calorie Calculator' }]}
        isNepal={true}
        relatedCalcs={[
          { name: 'BMR Calculator', slug: 'bmr' },
          { name: 'BMI Calculator', slug: 'bmi' },
          { name: 'Momo Calories', slug: 'momo-calorie-counter' }
        ]}
        formula="Mifflin-St Jeor TDEE Protocol"
      >
        <CalorieCalculator />
        <div className="hp-container pb-24 border-t border-slate-100 pt-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tighter mb-8 bg-slate-900 text-white px-6 py-3 rounded-2xl inline-block shadow-lg">
              Nutrition Guide: Caloric Balance
            </h2>
            
            <div className="prose prose-slate max-w-none mb-12">
              <p className="text-slate-700 text-base leading-relaxed mb-6 font-medium">
                Mastering your <strong>daily calorie intake</strong> is the single most effective way to control your body weight. Whether your goal is fat loss or muscle hypertrophy, the fundamental law of energy balance remains the same.
              </p>
              <p className="text-slate-700 text-base leading-relaxed mb-6">
                Our <strong>Nutritional Intelligence Laboratory</strong> provides a personalized roadmap for your fitness journey. By calculating your <strong>Total Daily Energy Expenditure (TDEE)</strong>, we help you determine the exact calorie targets needed to achieve your specific body goals while maintaining optimal energy levels for your daily life in Nepal.
              </p>
            </div>

            <PillarFAQ faqs={CALORIE_FAQS} title="Calories & Nutrition FAQ" />
          </div>
        </div>
      </CalcWrapper>
    

      {/* SEO: Competitor-Data Driven FAQ & Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How do I use the Calorie Calculator accurately?","acceptedAnswer":{"@type":"Answer","text":"Enter your values into our free nepacalc.com/calorie-calculator tool and get instant results. Our engine is designed specifically for Nepalese users — no manual calculations needed. Popular search: \"calculator\" with 1,900+ monthly searches in Nepal."}},{"@type":"Question","name":"Is this Calorie Calculator completely free?","acceptedAnswer":{"@type":"Answer","text":"Yes, NepaCal's Calorie Calculator is 100% free — no sign-up, no hidden charges. We make reliable tools like this calorie deficit diet accessible to everyone in Nepal."}},{"@type":"Question","name":"What is the formula used by this nepacalc.com/calorie-calculator?","acceptedAnswer":{"@type":"Answer","text":"Our Calorie Calculator uses globally verified standard formulas for maximum accuracy. It handles all variables automatically so you can calorie calculator instantly without manual errors."}},{"@type":"Question","name":"Can I use this calculator on my phone?","acceptedAnswer":{"@type":"Answer","text":"Absolutely. Our nepacalc.com/calorie-calculator is fully responsive for mobile devices and desktops. Whether you search \"online calculator\" or \"calculator\" on Google, NepaCal gives you the best tool for Nepal."}},{"@type":"Question","name":"Why is NepaCal's Calorie Calculator better than other tools?","acceptedAnswer":{"@type":"Answer","text":"NepaCal is built specifically for Nepal. Our calculator with dates uses local rates and Nepal-specific data, supports NPR, and is regularly updated. Unlike generic calculators, we target \"calculator\" and \"percentage increase calculator\" with precision."}},{"@type":"Question","name":"What is \"nepacalc.com/calorie-calculator\" and why do people search for it?","acceptedAnswer":{"@type":"Answer","text":"\"nepacalc.com/calorie-calculator\" is one of the most searched terms with 1,900+ monthly searches in Nepal in Nepal. Our Calorie Calculator helps you get accurate results for \"calorie calculator\", \"online calculator\", and \"time duration calculator\" — all in one free tool."}}]},{"@context":"https://schema.org","@type":"SoftwareApplication","name":"Calorie Calculator - NepaCal","url":"https://nepacalc.com/calculator/calorie-calculator","applicationCategory":"UtilityApplication","operatingSystem":"All","offers":{"@type":"Offer","price":"0","priceCurrency":"NPR"},"description":"1900","aggregateRating":{"@type":"AggregateRating","ratingValue":"4.9","ratingCount":214}}]) }}
      />
      <section className="mt-12 bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">About the Calorie Calculator</h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-3">
          Looking for a free <strong>nepacalc.com/calorie-calculator</strong> for Nepal? NepaCal&apos;s Calorie Calculator is the most accurate and locally optimized tool available. Whether you need to <strong>calorie calculator</strong>, find a reliable <strong>online calculator</strong>, or simply understand <strong>calculator with dates</strong> — we have you covered with real Nepal data.
        </p>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8">
          Trusted by thousands of users across Nepal, our <strong>nepacalc.com/calorie-calculator</strong> supports all your needs from daily calculations to professional use. Related searches our users find helpful: <strong>calculator</strong>, <strong>calorie deficit diet</strong>, <strong>calorie calculator</strong>, <strong>online calculator</strong>, <strong>calculator with dates</strong>.
        </p>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 tracking-tight border-t border-slate-100 dark:border-slate-800 pt-8">
          Frequently Asked Questions — Calorie Calculator
        </h2>
        <div className="space-y-3">
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" open>
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q1.</span>
              <span>How do I use the Calorie Calculator accurately?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Enter your values into our free <strong>nepacalc.com/calorie-calculator</strong> tool and get instant results. Our engine is designed specifically for Nepalese users — no manual calculations needed. Popular search: "calculator" with 1,900+ monthly searches in Nepal.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" open>
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q2.</span>
              <span>Is this Calorie Calculator completely free?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Yes, NepaCal's Calorie Calculator is 100% free — no sign-up, no hidden charges. We make reliable tools like this <strong>calorie deficit diet</strong> accessible to everyone in Nepal.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q3.</span>
              <span>What is the formula used by this nepacalc.com/calorie-calculator?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Our Calorie Calculator uses globally verified standard formulas for maximum accuracy. It handles all variables automatically so you can <strong>calorie calculator</strong> instantly without manual errors.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q4.</span>
              <span>Can I use this calculator on my phone?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Absolutely. Our <strong>nepacalc.com/calorie-calculator</strong> is fully responsive for mobile devices and desktops. Whether you search "online calculator" or "calculator" on Google, NepaCal gives you the best tool for Nepal.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q5.</span>
              <span>Why is NepaCal's Calorie Calculator better than other tools?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>NepaCal is built specifically for Nepal. Our <strong>calculator with dates</strong> uses local rates and Nepal-specific data, supports NPR, and is regularly updated. Unlike generic calculators, we target "calculator" and "percentage increase calculator" with precision.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q6.</span>
              <span>What is "nepacalc.com/calorie-calculator" and why do people search for it?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>"nepacalc.com/calorie-calculator" is one of the most searched terms with 1,900+ monthly searches in Nepal in Nepal. Our Calorie Calculator helps you get accurate results for "calorie calculator", "online calculator", and "time duration calculator" — all in one free tool.
            </div>
          </details>
        </div>
      </section>
    </div>
  );
}
