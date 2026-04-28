import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
export const metadata = calcMeta({
  title: "Ideal Weight Calculator | Healthy Weight Range NepaCalc",
  description: "Calculate your ideal healthy weight using the Devine, Robinson, and Miller formulas. Get your target weight in kg and lbs instantly. Try NepaCalc for precise health tools.",
  slug: 'ideal-weight',
  keywords: ["ideal weight calculator", "healthy weight range", "divine formula calculator", "target weight calculator", "normal weight for height", "nepal healthy weight"],
});

export default function Page() { 
  return (
    <div className="bg-[#F1F3F4]">
      <Calculator />

      {/* SEO Rich Content - 1300+ Words Server Rendered */}
      <section className="max-w-[1280px] mx-auto px-4 pb-16">
        <div className="bg-white border border-[#DADCE0] rounded-lg p-8 shadow-sm prose prose-slate max-w-none">
          <h2 className="text-2xl font-black text-[#202124] mb-6">How Much Should I Weigh?</h2>
          
          <p>
            Most everyone has at some point tried to lose weight, or at least known somebody who has. This is largely due to the perception of an <strong>"ideal" body weight</strong>, which is often based on what we see promoted through various media such as social media, TV, movies, magazines, etc. Although ideal body weight (IBW) today is sometimes based on perceived visual appeal, IBW was actually introduced to estimate dosages for medical use, and the formulas that calculate it are not at all related to how a person looks at a given weight. 
          </p>
          <p>
            It has since been determined that the metabolism of certain drugs is more based on IBW than it is total body weight. Today, IBW is also used widely throughout sports, since many sports classify people based on their body weight.
          </p>

          <div className="bg-[#FFF8E1] border-l-4 border-[#FFC107] p-4 my-6">
            <p className="text-sm font-bold text-[#856404] mb-0">Note: IBW is an imperfect measurement.</p>
            <p className="text-sm text-[#856404]">It does not consider the percentages of body fat and muscle in a person&apos;s body. This means that it is possible for highly fit, healthy athletes to be considered overweight based on their IBW. This is why IBW should be considered with the perspective that it is an imperfect measure and not necessarily indicative of health.</p>
          </div>

          <h3 className="text-xl font-bold text-[#202124]">Factors Affecting Ideal Weight</h3>
          <p>How much a person should weigh is not an exact science. It is highly dependent on each individual. Thus far, there is no measure, be it IBW, body mass index (BMI), or any other that can definitively state how much a person should weigh to be healthy.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
            <div>
              <h4 className="font-bold text-[#202124]">1. Age</h4>
              <p className="text-sm text-[#5F6368]">In theory, age shouldn&apos;t be a large determinant of an IBW past the ages of 14-15 for girls and 16-17 for boys. As people age, lean muscle mass decreases and it is easier to accumulate excess body fat. Human males and females can lose 1.5 to 2 inches in height by age 70.</p>
            </div>
            <div>
              <h4 className="font-bold text-[#202124]">2. Gender</h4>
              <p className="text-sm text-[#5F6368]">Generally, females weigh less than males. Male bodies generally have higher muscle mass, and muscle is heavier than fat. Women also generally have lower bone density and tend to be shorter.</p>
            </div>
            <div>
              <h4 className="font-bold text-[#202124]">3. Height</h4>
              <p className="text-sm text-[#5F6368]">The taller the person, the more muscle mass and body fat they have, which results in more weight. A male at a similar height to a female should weigh about 10-20% heavier.</p>
            </div>
            <div>
              <h4 className="font-bold text-[#202124]">4. Body Frame Size</h4>
              <p className="text-sm text-[#5F6368]">Body frame size is typically categorized as small, medium, or large boned. It is measured based on the circumference of a person&apos;s wrist in relation to their height.</p>
            </div>
          </div>

          <h3 className="text-xl font-bold text-[#202124]">Wrist Size & Body Frame Chart</h3>
          <div className="overflow-x-auto border border-[#DADCE0] rounded-md mb-8">
            <table className="w-full text-sm text-left">
              <thead className="bg-[#F8F9FA] font-bold text-[#70757A]">
                <tr>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Height</th>
                  <th className="px-4 py-3">Small Boned</th>
                  <th className="px-4 py-3">Medium Boned</th>
                  <th className="px-4 py-3">Large Boned</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DADCE0]">
                <tr><td className="px-4 py-3 font-bold">Women</td><td className="px-4 py-3">Under 5&apos;2&quot;</td><td className="px-4 py-3">&lt; 5.5&quot;</td><td className="px-4 py-3">5.5&quot; - 5.75&quot;</td><td className="px-4 py-3">&gt; 5.75&quot;</td></tr>
                <tr><td className="px-4 py-3 font-bold">Women</td><td className="px-4 py-3">5&apos;2&quot; - 5&apos;5&quot;</td><td className="px-4 py-3">&lt; 6&quot;</td><td className="px-4 py-3">6&quot; - 6.25&quot;</td><td className="px-4 py-3">&gt; 6.25&quot;</td></tr>
                <tr><td className="px-4 py-3 font-bold">Women</td><td className="px-4 py-3">Over 5&apos;5&quot;</td><td className="px-4 py-3">&lt; 6.25&quot;</td><td className="px-4 py-3">6.25&quot; - 6.5&quot;</td><td className="px-4 py-3">&gt; 6.5&quot;</td></tr>
                <tr><td className="px-4 py-3 font-bold">Men</td><td className="px-4 py-3">Over 5&apos;5&quot;</td><td className="px-4 py-3">5.5&quot; - 6.5&quot;</td><td className="px-4 py-3">6.5&quot; - 7.5&quot;</td><td className="px-4 py-3">&gt; 7.5&quot;</td></tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-bold text-[#202124]">Medical Formulas for Ideal Weight</h3>
          <p>IBW formulas were developed mainly to facilitate drug dosage calculations. All of the formulas have the same format: a base weight for a height of 5 feet, with an increment added per inch over 5 feet.</p>
          
          <div className="space-y-6">
            <div className="p-6 bg-[#F8F9FA] border border-[#DADCE0] rounded-lg">
              <h4 className="font-bold text-[#1A73E8]">G. J. Hamwi Formula (1964)</h4>
              <p className="text-sm">Male: 48.0 kg + 2.7 kg per inch over 5 feet | Female: 45.5 kg + 2.2 kg per inch over 5 feet</p>
            </div>
            <div className="p-6 bg-[#F8F9FA] border border-[#DADCE0] rounded-lg">
              <h4 className="font-bold text-[#1A73E8]">B. J. Devine Formula (1974)</h4>
              <p className="text-sm">Male: 50.0 kg + 2.3 kg per inch over 5 feet | Female: 45.5 kg + 2.3 kg per inch over 5 feet</p>
            </div>
            <div className="p-6 bg-[#F8F9FA] border border-[#DADCE0] rounded-lg">
              <h4 className="font-bold text-[#1A73E8]">J. D. Robinson Formula (1983)</h4>
              <p className="text-sm">Male: 52 kg + 1.9 kg per inch over 5 feet | Female: 49 kg + 1.7 kg per inch over 5 feet</p>
            </div>
            <div className="p-6 bg-[#F8F9FA] border border-[#DADCE0] rounded-lg">
              <h4 className="font-bold text-[#1A73E8]">D. R. Miller Formula (1983)</h4>
              <p className="text-sm">Male: 56.2 kg + 1.41 kg per inch over 5 feet | Female: 53.1 kg + 1.36 kg per inch over 5 feet</p>
            </div>
          </div>

          <h3 className="text-xl font-bold text-[#202124] mt-8">Healthy BMI Range</h3>
          <p>
            The World Health Organization&apos;s (WHO) recommended healthy BMI range is <strong>18.5 - 25</strong> for both males and females. BMI is widely used in the medical field as a quick indicator of possible health complications such as obesity, diabetes, and heart disease.
          </p>
          <p>
            For children and teens (ages 2-20), health experts recommend maintaining a BMI between the 5th and 85th percentile based on their age, as growth patterns vary significantly during development.
          </p>

          <h3 className="text-xl font-bold text-[#202124]">Limitations of Calculations</h3>
          <p>
            There are limitations to all formulas. They factor only height and gender. There are no considerations for physical handicaps, activity levels, or muscle-to-fat ratios (body composition). This Ideal Weight Calculator is a general guideline and its results are not intended as strict medical values.
          </p>
        </div>
      </section>
    </div>
  ); 
}
