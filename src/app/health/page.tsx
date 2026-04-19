import { CATEGORIES } from '@/data/calculators';
import Link from 'next/link';
import { ChevronRight, Flame } from 'lucide-react';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { PillarFAQ } from '@/components/seo/PillarFAQ';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Health & Fitness Calculators — BMI, BMR, Calories, Body Fat | NEPACALC',
  description: 'Free health calculators: BMI, BMR, Body Fat %, Daily Calories, Ideal Weight, Water Intake, Pregnancy Due Date, and more. Based on WHO standards.',
  keywords: ['bmi calculator nepal', 'bmr calculator', 'body fat calculator', 'calorie calculator', 'health tools nepal'],
  alternates: { canonical: 'https://nepacalc.com/health' },
};

const HEALTH_FAQS = [
  {
    question: "Are the health calculators designed for medical diagnosis?",
    answer: "No, our health tools, including BMI and calorie calculators, are designed for informational and fitness tracking purposes only. They do not replace professional medical advice."
  },
  {
    question: "What body mass index standard is used?",
    answer: "We follow universally accepted World Health Organization (WHO) and CDC guidelines for all standard fitness metrics and metabolic rate estimations."
  },
  {
    question: "Do the calorie calculators account for activity levels?",
    answer: "Yes, our daily energy expenditure (TDEE) models incorporate standard physiological activity multipliers to provide accurate macronutrient requirements."
  },
  {
    question: "Are these tools suitable for children?",
    answer: "We offer dedicated pediatric tools, such as the Child BMI Calculator, which utilize specific percentile growth charts distinct from adult metric standards."
  }
];

export default function HealthPillarPage() {
  const category = CATEGORIES.find(c => c.id === 'health')!;
  return (
    <CalcWrapper
      title="Health & Fitness"
      description={`${category.calculators.length} WHO-standard health and fitness calculators for body analysis and wellness planning.`}
      crumbs={[{ label: 'Health & Fitness Tools' }]}
    >
      <div className="py-8">

        {/* Clinical Index Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
          {category.calculators.map(calc => (
            <div key={calc.id} className="group flex flex-col gap-1 border-b border-slate-50 pb-4">
              <Link
                href={`/calculator/${calc.slug}`}
                className="text-[16px] font-bold text-[#1a73e8] hover:underline"
              >
                {calc.name}
              </Link>
              <p className="text-[13px] text-[#5f6368] leading-relaxed font-medium">
                {calc.description}
              </p>
            </div>
          ))}
        </div>

        {/* Institutional Authority Block */}
        <div className="mt-24 pt-12 border-t border-[#dadce0]">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl opacity-80">
              <div>
                <h3 className="text-[11px] font-black uppercase tracking-widest text-[#202124] mb-3">Standards</h3>
                <p className="text-[11px] text-[#5f6368] leading-relaxed">All formulas (BMI, BMR, Body Fat) are based on World Health Organization (WHO) and NIH standards.</p>
              </div>
              <div>
                <h3 className="text-[11px] font-black uppercase tracking-widest text-[#202124] mb-3">Data Privacy</h3>
                <p className="text-[11px] text-[#5f6368] leading-relaxed">Physical metrics are processed locally. No personal health information (PHI) is stored or transmitted.</p>
              </div>
              <div>
                <h3 className="text-[11px] font-black uppercase tracking-widest text-[#202124] mb-3">Medical Disclaimer</h3>
                <p className="text-[11px] text-[#5f6368] leading-relaxed">Results are for informational purposes only and do not constitute professional medical advice or diagnosis.</p>
              </div>
           </div>
        </div>
        
        <PillarFAQ faqs={HEALTH_FAQS} title="Health Tools Facts" />
      </div>
    </CalcWrapper>
  );
}
