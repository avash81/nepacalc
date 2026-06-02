import { calcMeta } from '@/lib/calcMeta';
import type { Metadata } from 'next';
import CalorieCalculator from './Calculator';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { PillarFAQ } from '@/components/seo/PillarFAQ';

export const metadata = calcMeta({
  title: "Calorie Calculator | Daily Needs & Weight Loss Goals Nepal NepaCalc",
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
      <CalcWrapper disableSchema={true}
        title="Daily Calorie Estimator"
        description="High-precision nutritional engine for calculating your total daily energy expenditure and setting personalized weight management targets."
        crumbs={[{ label: 'Directory', href: '/directory' }, { label: 'Calorie Calculator' }]}
        isNepal={true}
        hideHeader={true}
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
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tighter mb-8 bg-white border border-[#dadce0] text-[#202124] px-6 py-3 rounded-2xl inline-block shadow-sm">
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

            <PillarFAQ disableSchema={true} faqs={CALORIE_FAQS} title="Calories & Nutrition FAQ" />
          </div>
        </div>
      </CalcWrapper>    </div>
  );
}

