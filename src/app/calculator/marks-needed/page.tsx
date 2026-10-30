import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata = calcMeta({
  title: "Marks Needed Calculator | Final Exam Score Predictor – NepaCalc",
  description: "Calculate what marks or percentage you need on your final exam to achieve your target semester or overall grade. Calibrated for Tribhuvan University, Kathmandu University, Pokhara University, and NEB students.",
  slug: 'marks-needed',
  keywords: ["marks needed calculator", "final grade calculator nepal", "exam score needed", "target grade calculator", "university exam marks calculator"],
});

const MARKS_NEEDED_FAQS = [
  {
    question: "How does the Marks Needed Calculator work?",
    answer: "Enter your current internal marks (from assignments, quizzes, and midterm assessments), your target overall percentage, and the final exam weightage. The calculator computes the exact minimum score you must achieve on the final exam using the weighted grade formula."
  },
  {
    question: "What does it mean if the required score is over 100%?",
    answer: "If the calculator shows you need more than 100%, your desired target is mathematically impossible with your current score and the remaining weightage. Even scoring a perfect 100% on the final will not bring your overall average up to that target. You should adjust your target percentage to a realistic tier."
  },
  {
    question: "How do I use this for TU, KU, or PU semester exams?",
    answer: "In most semester programs across Tribhuvan University, Kathmandu University, and Pokhara University, the internal assessment carries 40% (or 30%) weight, and the board final exam carries 60% (or 70%). Enter your obtained internal percentage, your target total (e.g. 60% for 1st Division or 80% for Distinction), and 60 in the final exam weightage field."
  },
  {
    question: "What is exam weightage?",
    answer: "Weightage is the percentage that an exam contributes to your total course grade. For example, if your final exam is worth 60 marks out of a 100-mark course, its weightage is 60%. The remaining 40% represents your coursework, attendance, and midterms."
  },
  {
    question: "Can this calculator be used for individual courses or overall GPA?",
    answer: "It can be used for both. For a single subject, enter your internal score and final weightage. For an entire semester, enter your current accumulated credit percentage and the remaining semester weightage."
  }
];

export default function Page() {
  return (
    <>
      <JsonLd
        type="unified"
        name="Marks Needed Calculator"
        description="Calculate what marks or percentage you need on your final exam to achieve your target semester or overall grade."
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
