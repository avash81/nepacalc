import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata = calcMeta({
  title: "Marks Needed Calculator | Final Grade Predictor NepaCalc",
  description: "Calculate exactly what you need to score on your final exam to reach your target overall class grade. Perfect for students planning their study goals.",
  slug: 'marks-needed',
  keywords: ["marks needed calculator", "final grade calculator", "exam score needed", "target grade calculator", "university grade calculator"],
});

const MARKS_NEEDED_FAQS = [
  {
    question: "How does the Marks Needed Calculator work?",
    answer: "Enter your current marks (from internal/term exams), your target overall percentage, and the weightage of the final exam. The calculator then computes exactly what score you need in the final exam using the formula: Final Needed = (Target - Current × (1 - Final Weight)) / Final Weight."
  },
  {
    question: "What if the required marks exceed 100%?",
    answer: "If the calculator shows you need more than 100%, it means your target is mathematically impossible to achieve given your current marks and the remaining exam weightage. You would need to revise your target percentage to a realistic value."
  },
  {
    question: "How do I use this for TU/KU/PU university exams in Nepal?",
    answer: "In most Nepali universities, the final board exam carries 60-80% weightage and internal marks carry 20-40%. Enter your obtained internal marks, your desired total percentage (e.g., 70%), and the final exam weightage (e.g., 60) to find exactly what board exam score you need."
  },
  {
    question: "Can I use this calculator for SEE or NEB examinations?",
    answer: "Yes. For the NEB grading system, determine the equivalent percentage for your target grade (e.g., A+ = 90%+, A = 80%+, B+ = 70%+), then enter it as your target. This tells you exactly what board marks you need to achieve that grade."
  },
  {
    question: "What does 'Exam Weightage' mean?",
    answer: "Exam weightage is the percentage contribution of the final exam to your overall grade. For example, if your final exam is worth 60% of your total marks, enter 60 in the weightage field. The remaining 40% would be your internal/continuous assessment marks."
  }
];

export default function Page() {
  return (
    <>
      <JsonLd
        type="unified"
        name="Marks Needed Calculator"
        description="Calculate exactly what you need to score on your final exam to reach your target overall class grade. Perfect for students planning their study goals."
        url="https://nepacalc.com/calculator/marks-needed/"
        category="EducationalApplication"
        breadcrumbItems={[
          { name: 'Home', item: 'https://nepacalc.com' },
          { name: 'Math Tools', item: 'https://nepacalc.com/math-tools/' },
          { name: 'Marks Needed Calculator', item: 'https://nepacalc.com/calculator/marks-needed/' }
        ]}
        faqs={MARKS_NEEDED_FAQS}
      />
      <Calculator />
    </>
  );
}
