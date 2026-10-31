import { calcMeta } from '@/lib/calcMeta';
import ForceCalculator from './Calculator';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata = calcMeta({
  title: "Physics Force Calculator | Newton's Second Law (F = ma) – NepaCalc",
  description: "Calculate Force, Mass, or Acceleration using Newton's Second Law (F = ma). Includes Work (W = Fd), Power (P = W/t), and Pressure (P = F/A) with SI unit conversions.",
  slug: 'physics-force',
  keywords: ["physics force calculator", "calculate f=ma", "newton second law calculator", "mass acceleration force", "work power pressure calculator", "si unit force newtons"],
});

const FORCE_FAQS = [
  {
    question: "What is Newton's Second Law of Motion?",
    answer: "Newton's Second Law states that the net force applied to an object equals its mass multiplied by its acceleration (F = ma). If you double the force on an object, its acceleration doubles. If you double the mass while keeping the force constant, acceleration is cut in half."
  },
  {
    question: "What is a Newton (N) in fundamental SI units?",
    answer: "One Newton is defined as the force required to accelerate a 1-kilogram mass at a rate of 1 meter per second squared (1 N = 1 kg·m/s²). For comparison, an average medium apple in your hand weighs roughly 1 Newton under Earth's gravity."
  },
  {
    question: "How do I calculate mass when I already know force and acceleration?",
    answer: "Rearrange the formula to m = F ÷ a. For example, if an unknown object experiences 100 N of net force and accelerates at 5 m/s², its mass is 100 ÷ 5 = 20 kg. In our calculator, select 'Mass (m)' under the Force mode to compute this instantly."
  },
  {
    question: "What is the difference between mass and weight?",
    answer: "Mass is the fundamental quantity of matter in an object, measured in kilograms (kg), and remains the same anywhere in the universe. Weight is the gravitational force acting on that mass (W = mg), measured in Newtons (N). A 70 kg person weighs ~686 N on Earth, but only ~113 N on the Moon."
  },
  {
    question: "What is the difference between Force and Work?",
    answer: "Force is a push or pull (in Newtons). Work is the measure of energy transferred when that force causes an object to move across a distance (Work = Force × Displacement, in Joules). If you push against a solid concrete wall and it doesn't move, force is exerted, but zero physical work is performed."
  },
  {
    question: "How do I convert Newtons to Pounds-force (lbf)?",
    answer: "1 Newton equals approximately 0.2248 pounds-force (lbf). Conversely, 1 lbf equals 4.4482 Newtons. Our calculator automatically outputs pound-force, kilonewtons (kN), and dynes beneath the primary result."
  }
];

export default function Page() {
  return (
    <>
      <JsonLd
        type="unified"
        name="Physics Force Calculator"
        description="Calculate Force, Mass, Acceleration, Work, Power, and Pressure with Newton's Second Law formulas and SI unit conversions."
        url="https://nepacalc.com/calculator/physics-force/"
        category="EducationalApplication"
        breadcrumbItems={[
          { name: 'Home', item: 'https://nepacalc.com' },
          { name: 'Engineering', item: 'https://nepacalc.com/engineering/' },
          { name: 'Physics Force Calculator', item: 'https://nepacalc.com/calculator/physics-force/' }
        ]}
        faqs={FORCE_FAQS}
      />

      <ForceCalculator />

      {/* Educational & Practical Physics Reference */}
      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 space-y-8">

        {/* Newton's 2nd Law Formula Matrix */}
        <section className="bg-white border border-[#DADCE0] rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-sm font-black uppercase tracking-widest text-[#202124] border-l-4 border-blue-600 pl-3 mb-6">
            Newton's Second Law Equations (F, m, a)
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border border-[#DADCE0] rounded-md overflow-hidden">
              <thead className="bg-[#F8F9FA] text-[#70757A] uppercase font-bold">
                <tr>
                  <th className="px-4 py-3">Unknown Variable</th>
                  <th className="px-4 py-3">Formula</th>
                  <th className="px-4 py-3">Standard SI Unit</th>
                  <th className="px-4 py-3">Real-World Example</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DADCE0] text-[#3C4043]">
                <tr className="hover:bg-[#fcfcfc]">
                  <td className="px-4 py-3 font-bold text-blue-700">Force (F)</td>
                  <td className="px-4 py-3 font-mono font-bold">F = m × a</td>
                  <td className="px-4 py-3">Newtons (N = kg·m/s²)</td>
                  <td className="px-4 py-3 text-[#5F6368]">Pushing a 15 kg cart at 2 m/s² = 30 N</td>
                </tr>
                <tr className="hover:bg-[#fcfcfc]">
                  <td className="px-4 py-3 font-bold text-emerald-700">Mass (m)</td>
                  <td className="px-4 py-3 font-mono font-bold">m = F ÷ a</td>
                  <td className="px-4 py-3">Kilograms (kg)</td>
                  <td className="px-4 py-3 text-[#5F6368]">Car pushed with 1,200 N accelerating at 1 m/s² = 1,200 kg</td>
                </tr>
                <tr className="hover:bg-[#fcfcfc]">
                  <td className="px-4 py-3 font-bold text-purple-700">Acceleration (a)</td>
                  <td className="px-4 py-3 font-mono font-bold">a = F ÷ m</td>
                  <td className="px-4 py-3">Meters/second² (m/s²)</td>
                  <td className="px-4 py-3 text-[#5F6368]">500 N engine thrust on 250 kg bike = 2.0 m/s²</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Real-World Scales of Force */}
        <section className="bg-white border border-[#DADCE0] rounded-xl p-6 sm:p-8 shadow-sm">
          <h3 className="text-sm font-black uppercase tracking-widest text-[#202124] border-l-4 border-emerald-600 pl-3 mb-6">
            Real-World Orders of Magnitude in Force
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { magnitude: '1 N', title: 'Small Apple', desc: 'Gravitational force holding a 100g apple in your palm on Earth.' },
              { magnitude: '700 N', title: 'Average Human', desc: 'Downward gravitational force (weight) of a 71 kg person on Earth.' },
              { magnitude: '3,000–5,000 N', title: 'Car Braking', desc: 'Braking force required to stop a typical passenger sedan safely.' },
              { magnitude: '34,000,000 N', title: 'Saturn V Rocket', desc: 'Liftoff thrust of the Apollo Moon rocket at full engine ignition.' },
            ].map(card => (
              <div key={card.title} className="p-4 bg-[#F8F9FA] border border-[#DADCE0] rounded-xl text-center space-y-1.5">
                <div className="text-xl font-mono font-black text-blue-700">{card.magnitude}</div>
                <div className="text-xs font-bold text-[#202124]">{card.title}</div>
                <p className="text-[11px] text-[#5F6368] leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Force Unit Conversions */}
        <section className="bg-white border border-[#DADCE0] rounded-xl p-6 sm:p-8 shadow-sm">
          <h3 className="text-sm font-black uppercase tracking-widest text-[#202124] border-l-4 border-amber-600 pl-3 mb-6">
            Force Unit Conversion Cheat Sheet
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border border-[#DADCE0] rounded-md overflow-hidden">
              <thead className="bg-[#F8F9FA] text-[#70757A] uppercase font-bold">
                <tr>
                  <th className="px-4 py-3">Unit Name</th>
                  <th className="px-4 py-3">Symbol</th>
                  <th className="px-4 py-3">Value in Newtons (N)</th>
                  <th className="px-4 py-3">Primary Field of Use</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DADCE0] text-[#3C4043]">
                <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-3 font-bold">Newton</td><td className="px-4 py-3 font-mono">N</td><td className="px-4 py-3 font-mono">1.0 N</td><td className="px-4 py-3">International standard physics & engineering</td></tr>
                <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-3 font-bold">Kilonewton</td><td className="px-4 py-3 font-mono">kN</td><td className="px-4 py-3 font-mono">1,000 N</td><td className="px-4 py-3">Civil engineering, bridge loads, construction</td></tr>
                <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-3 font-bold">Pound-force</td><td className="px-4 py-3 font-mono">lbf</td><td className="px-4 py-3 font-mono">~4.4482 N</td><td className="px-4 py-3">US customary engineering, aerospace</td></tr>
                <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-3 font-bold">Dyne</td><td className="px-4 py-3 font-mono">dyn</td><td className="px-4 py-3 font-mono">0.00001 N (10⁻⁵ N)</td><td className="px-4 py-3">CGS units, fluid surface tension measurement</td></tr>
                <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-3 font-bold">Kilogram-force</td><td className="px-4 py-3 font-mono">kgf / kp</td><td className="px-4 py-3 font-mono">~9.80665 N</td><td className="px-4 py-3">Material hardness testing, legacy metric specs</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Frequently Asked Questions */}
        <section className="bg-white border border-[#DADCE0] rounded-xl p-6 sm:p-8 shadow-sm">
          <h3 className="text-sm font-black uppercase tracking-widest text-[#202124] border-l-4 border-blue-600 pl-3 mb-6">
            Frequently Asked Questions
          </h3>
          <div className="space-y-4">
            {FORCE_FAQS.map((faq, i) => (
              <div key={i} className="p-5 border border-[#DADCE0] rounded-xl space-y-2">
                <h4 className="font-bold text-[#202124] text-sm">{faq.question}</h4>
                <p className="text-sm text-[#5F6368] leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </>
  );
}
