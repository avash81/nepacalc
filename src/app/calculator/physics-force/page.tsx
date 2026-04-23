import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { PillarFAQ } from '@/components/seo/PillarFAQ';

export const metadata = calcMeta({
  title: "Physics Force Calculator | Newton's Second Law (F=ma) Nepal NepaCal",
  description: "Calculate force, mass, or acceleration instantly using Newton's Second Law. Professional physics tool for students and engineers in Nepal.",
  slug: 'physics-force',
  keywords: ["force calculator nepal", "calculate f=ma", "newton's second law calculator", "physics solver nepal", "force mass acceleration tool", "academic physics"],
});

const FORCE_FAQS = [
  {
    question: "What is Newton's Second Law of Motion?",
    answer: "Newton's Second Law states that the force acting on an object is equal to the mass of that object multiplied by its acceleration (F = ma)."
  },
  {
    question: "How do I calculate force?",
    answer: "Enter the mass (in kg) and the acceleration (in m/s²). The product of these two values gives you the force in Newtons (N)."
  },
  {
    question: "What is a 'Newton'?",
    answer: "One Newton is the amount of force required to accelerate a 1 kilogram mass at a rate of 1 meter per second squared."
  },
  {
    question: "Can I calculate mass if I know force and acceleration?",
    answer: "Yes. By rearranging the formula (m = F/a), our tool can solve for mass when force and acceleration are provided."
  },
  {
    question: "What is the difference between mass and weight?",
    answer: "Mass is the amount of matter in an object, while weight is the force of gravity acting on that mass (W = mg). Our tool focuses on F = ma relationships."
  }
];

export default function Page() {
  return (
    <div className="bg-white min-h-screen">
      <CalcWrapper
        title="Physics Force Solver"
        description="Industrial-grade mechanics engine for calculating net force, inertial mass, and linear acceleration based on Newton's Second Law."
        crumbs={[{ label: 'Directory', href: '/directory' }, { label: 'Force Calculator' }]}
        isNepal={true}
        relatedCalcs={[
          { name: 'Energy Calc', slug: 'physics-energy' },
          { name: 'Scientific Calc', slug: 'scientific-calculator' },
          { name: 'Unit Converter', slug: 'unit-converter' }
        ]}
        formula="Force (F) = Mass (m) × Acceleration (a)"
      >
        <Calculator />
        <div className="hp-container pb-24 border-t border-slate-100 pt-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tighter mb-8 bg-slate-900 text-white px-6 py-3 rounded-2xl inline-block shadow-lg">
              Mechanics Guide: Force & Motion
            </h2>
            
            <div className="prose prose-slate max-w-none mb-12">
              <p className="text-slate-700 text-base leading-relaxed mb-6 font-medium">
                The relationship between <strong>force, mass, and acceleration</strong> is the foundation of modern engineering and mechanical science. It allows us to predict the motion of everything from falling apples to orbiting satellites.
              </p>
              <p className="text-slate-700 text-base leading-relaxed mb-6">
                Our <strong>Mechanics Laboratory</strong> utilizes high-precision algorithms to solve for any unknown variable in Newton's Second Law. Whether you are a student in Nepal studying <strong>classical dynamics</strong> or a structural engineer calculating loads, our engine provides instant results in Newtons (N) with absolute mathematical fidelity.
              </p>
            </div>

            <PillarFAQ faqs={FORCE_FAQS} title="Force & Mechanics FAQ" />
          </div>
        </div>
      </CalcWrapper>
    </div>
  );
}
