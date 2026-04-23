import { calcMeta } from '@/lib/calcMeta';
import SleepCalculator from './Calculator';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { PillarFAQ } from '@/components/seo/PillarFAQ';

export const metadata = calcMeta({
  title: "Sleep Calculator | Optimal Wake-Up Time & REM Cycles Nepal NepaCal",
  description: "Calculate the best time to wake up or go to bed using 90-minute sleep cycles. Improve your sleep quality and feel refreshed every morning.",
  slug: 'sleep',
  keywords: ["sleep calculator nepal", "sleep cycle calculator", "best time to wake up", "90 minute sleep cycles", "bedtime calculator", "improve sleep quality"],
});

const SLEEP_FAQS = [
  {
    question: "How many hours of sleep do I really need?",
    answer: "Most adults need 7-9 hours of quality sleep. Children and teens require more (9-11 hours) for healthy brain development and physical growth."
  },
  {
    question: "What are 'Sleep Cycles'?",
    answer: "A typical cycle lasts 90 minutes, consisting of light, deep, and REM sleep. Waking up at the end of a cycle makes you feel significantly more refreshed."
  },
  {
    question: "Can I catch up on sleep during the weekend?",
    answer: "While you can recover some 'sleep debt', it doesn't fully reverse the cognitive and heart risks of chronic deprivation during the week."
  },
  {
    question: "Why do I feel tired even after 8 hours of sleep?",
    answer: "Quality matters as much as quantity. Factors like caffeine, blue light exposure, and disruptions like sleep apnea can lower the restorative value of your rest."
  },
  {
    question: "What is the best time to wake up?",
    answer: "The best time is at the end of a 90-minute sleep cycle. Our calculator finds these 'golden windows' based on when you plan to go to bed."
  }
];

export default function Page() {
  return (
    <div className="bg-white min-h-screen">
      <CalcWrapper
        title="Sleep Cycle Projector"
        description="Advanced circadian rhythm engine for calculating optimal bedtime and wake-up windows based on standardized 90-minute REM cycles."
        crumbs={[{ label: 'Directory', href: '/directory' }, { label: 'Sleep Calculator' }]}
        isNepal={true}
        relatedCalcs={[
          { name: 'BMI Calculator', slug: 'bmi' },
          { name: 'Water Intake', slug: 'water-intake' },
          { name: 'Age Calculator', slug: 'age-calculator' }
        ]}
        formula="90-Minute Ultradian REM Cycle Protocol"
      >
        <SleepCalculator />
        <div className="hp-container pb-24 border-t border-slate-100 pt-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tighter mb-8 bg-indigo-900 text-white px-6 py-3 rounded-2xl inline-block shadow-lg">
              Recovery Guide: Sleep Optimization
            </h2>
            
            <div className="prose prose-slate max-w-none mb-12">
              <p className="text-slate-700 text-base leading-relaxed mb-6 font-medium">
                Sleep is the most powerful <strong>recovery tool</strong> for the human body. It's not just about how long you stay in bed, but how many complete sleep cycles you experience.
              </p>
              <p className="text-slate-700 text-base leading-relaxed mb-6">
                Our <strong>Circadian Analytics Laboratory</strong> leverages the science of <strong>ultradian rhythms</strong>. By calculating the precise moments your brain naturally shifts between sleep cycles, we help you find the 'perfect' wake-up time, ensuring you start your day in Nepal feeling energized rather than groggy.
              </p>
            </div>

            <PillarFAQ faqs={SLEEP_FAQS} title="Sleep Science & Health FAQ" />
          </div>
        </div>
      </CalcWrapper>
    </div>
  );
}
