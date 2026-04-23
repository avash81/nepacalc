import { calcMeta } from '@/lib/calcMeta';
import SEEGPACalculator from './Calculator';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { PillarFAQ } from '@/components/seo/PillarFAQ';

export const metadata = calcMeta({
  title: "SEE GPA Calculator | Calculate SEE Results Nepal NepaCal",
  description: "Calculate your SEE (Secondary Education Examination) GPA accurately. Convert marks to letter grades and see your overall performance as per NEB Nepal standards.",
  slug: 'see-gpa',
  keywords: ["see gpa calculator", "calculate see results", "see grading system nepal", "neb see gpa", "convert see marks to gpa", "secondary education examination"],
});

const SEE_FAQS = [
  {
    question: "How is the SEE GPA calculated in Nepal?",
    answer: "The SEE GPA is calculated by averaging the grade points of all subjects. Each letter grade (A+, A, B+, etc.) is assigned a point value (4.0, 3.6, 3.2, etc.) as per the National Examination Board (NEB) standards."
  },
  {
    question: "What is the minimum grade required to pass the SEE?",
    answer: "As per current NEB regulations, students must secure at least 35% marks (Grade D) in each subject's theoretical component to be eligible for admission into Grade 11 (+2)."
  },
  {
    question: "How do internal (practical) marks affect the final SEE GPA?",
    answer: "Final grades are composed of 75% external examination and 25% internal assessment. High internal/practical scores can significantly improve your subject grade and overall GPA."
  },
  {
    question: "Can I use this tool for both regular and technical streams?",
    answer: "Yes, our engine supports the standard subjects for both the general and technical SEE streams, allowing all students across Nepal to estimate their results with precision."
  },
  {
    question: "How many subjects are included in the SEE GPA calculation?",
    answer: "Typically, the GPA is calculated across 8 subjects, including compulsory subjects (English, Nepali, Math, Science, Social Studies) and your chosen optional subjects."
  }
];

export default function Page() {
  return (
    <div className="bg-white min-h-screen">
      <CalcWrapper
        title="SEE GPA Calculator"
        description="The most accurate tool for calculating Secondary Education Examination (SEE) results based on latest NEB grading mandates."
        crumbs={[{ label: 'Directory', href: '/directory' }, { label: 'SEE GPA' }]}
        isNepal={true}
        relatedCalcs={[
          { name: 'GPA Calculator', slug: 'gpa' },
          { name: 'Marks to Percentage', slug: 'marks-percentage' },
          { name: 'University GPA', slug: 'university-gpa' }
        ]}
        formula="Final GPA = Average(Subject Grade Points)"
      >
        <SEEGPACalculator />
        <div className="hp-container pb-24 border-t border-slate-100 pt-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tighter mb-8 bg-green-50 px-6 py-3 rounded-2xl inline-block">
              Student Guide: SEE Grading in Nepal
            </h2>
            
            <div className="prose prose-slate max-w-none mb-12">
              <p className="text-slate-700 text-base leading-relaxed mb-6 font-medium">
                The <strong>Secondary Education Examination (SEE)</strong> is the gateway to higher education in Nepal. Understanding how your marks translate into the <strong>Letter Grading System</strong> is crucial for choosing your stream in Grade 11, whether it's Science, Management, or Humanities.
              </p>
              <p className="text-slate-700 text-base leading-relaxed mb-6">
                Our calculator is updated with the latest <strong>NEB (National Examination Board)</strong> grading scheme, providing students and parents with a fast, reliable way to estimate performance before or after the official result declaration.
              </p>
            </div>

            <PillarFAQ faqs={SEE_FAQS} title="SEE Results & Grading FAQ" />
          </div>
        </div>
      </CalcWrapper>
    </div>
  );
}
