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
    </div>
  );
}
