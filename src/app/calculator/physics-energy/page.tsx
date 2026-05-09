import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { PillarFAQ } from '@/components/seo/PillarFAQ';

export const metadata = calcMeta({
  title: "Kinetic Energy Calculator | Physics (1/2mv²) Nepal NepaCalc",
  description: "Calculate kinetic energy, mass, or velocity instantly using the KE = ½mv² formula. Professional physics tool for students and researchers in Nepal.",
  slug: 'physics-energy',
  keywords: ["kinetic energy calculator nepal", "calculate physics energy", "1/2mv2 formula", "physics solver nepal", "energy mass velocity calc", "academic physics tool"],
});

const ENERGY_FAQS = [
  {
    question: "What is Kinetic Energy?",
    answer: "Kinetic energy is the energy an object possesses due to its motion. It is defined as the work needed to accelerate a body of a given mass from rest to its stated velocity."
  },
  {
    question: "What is the formula for Kinetic Energy?",
    answer: "The formula is KE = ½mv², where m is the mass in kilograms and v is the velocity in meters per second. Our calculator computes this instantly for any input."
  },
  {
    question: "How does velocity affect energy?",
    answer: "Since velocity is squared (v²) in the formula, doubling the speed of an object quadruples its kinetic energy, making speed a critical factor in energy calculations."
  },
  {
    question: "What units are used for energy?",
    answer: "The standard SI unit for energy is the Joule (J). One Joule is equal to one kilogram-meter squared per second squared (kg·m²/s²)."
  },
  {
    question: "Can kinetic energy be negative?",
    answer: "No. Since mass is positive and the square of velocity is always positive, kinetic energy must always be zero or a positive value."
  }
];

export default function Page() {
  return (
    <div className="bg-white min-h-screen">
      <CalcWrapper
        title="Kinetic Energy Engine"
        description="High-precision physics laboratory tool for calculating kinetic energy, mass-energy relationships, and velocity variables using SI standards."
        crumbs={[{ label: 'Directory', href: '/directory' }, { label: 'Kinetic Energy' }]}
        isNepal={true}
        relatedCalcs={[
          { name: 'Force Calc', slug: 'physics-force' },
          { name: 'Scientific Calc', slug: 'scientific-calculator' },
          { name: 'Unit Converter', slug: 'unit-converter' }
        ]}
        formula="KE = ½mv² [Classical Mechanics]"
      >
        <Calculator />
        <div className="hp-container pb-24 border-t border-slate-100 pt-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tighter mb-8 bg-white border border-[#dadce0] text-[#202124] px-6 py-3 rounded-2xl inline-block shadow-sm">
              Physics Guide: Dynamics & Energy
            </h2>
            
            <div className="prose prose-slate max-w-none mb-12">
              <p className="text-slate-700 text-base leading-relaxed mb-6 font-medium">
                Understanding <strong>mechanical energy</strong> is a cornerstone of physics and engineering. It describes the capacity of a moving body to perform work, a concept vital for everything from vehicle safety to renewable energy systems.
              </p>
              <p className="text-slate-700 text-base leading-relaxed mb-6">
                Our <strong>Kinetic Dynamics Laboratory</strong> provides a precise interface for classical mechanics. Whether you are a student in Nepal analyzing laboratory experiments or a researcher calculating the impact forces of moving objects, our engine ensures 100% mathematical accuracy using standard SI units and <strong>relativistic-grade numerical logic</strong>.
              </p>
            </div>

            <PillarFAQ faqs={ENERGY_FAQS} title="Energy & Physics FAQ" />
          </div>
        </div>
      </CalcWrapper>
    
    </div>
  );
}
