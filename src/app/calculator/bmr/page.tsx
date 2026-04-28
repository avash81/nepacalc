import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
import Link from 'next/link';

export const metadata = calcMeta({
  title: "BMR Calculator | Basal Metabolic Rate & TDEE NepaCalc",
  description: "Find your Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE). Accurate calorie needs calculator using Mifflin-St Jeor equation. Try NepaCalc today.",
  slug: 'bmr',
  keywords: ["bmr calculator", "basal metabolic rate nepal", "tdee calculator", "calorie needs calculator", "mifflin st jeor equation", "weight loss calories"],
});

export default function Page() {
  return (
    <div className="bg-[#F1F3F4]">
      <Calculator />

      {/* SEO Rich Content - ~1800-2000 Words Server Rendered */}
      <section className="max-w-[1280px] mx-auto px-4 pb-16">
        <div className="bg-white border border-[#DADCE0] rounded-lg p-8 shadow-sm">
          <article className="prose prose-slate max-w-none">
            <h2 className="text-3xl font-black text-[#202124] mb-6">Basal Metabolic Rate (BMR): The Engine of Your Body</h2>
            
            <p className="lead text-lg text-[#5F6368]">
              Whether you are looking to lose weight in Kathmandu or gain muscle in Pokhara, everything starts with one number: your <strong>Basal Metabolic Rate (BMR)</strong>. At <strong>NepaCalc</strong>, we use the most scientifically validated equations to help you understand your body&apos;s baseline energy requirements.
            </p>

            <div className="my-10 p-8 bg-[#FFF8E1] border-l-8 border-[#FFC107] rounded-r-2xl">
              <h3 className="text-[#856404] font-black mb-2">What is BMR?</h3>
              <p className="text-sm">
                Your BMR is the number of calories your body burns just to stay alive while at rest. This includes energy for breathing, circulating blood, controlling body temperature, cell growth, brain function, and nerve function. It accounts for about <strong>60% to 75%</strong> of your total daily calorie burn.
              </p>
            </div>

            <h3 className="text-2xl font-black text-[#202124] mt-12">Mifflin-St Jeor vs. Harris-Benedict</h3>
            <p>Our calculator defaults to the <strong>Mifflin-St Jeor Equation</strong>, which is currently considered the most accurate for modern populations. For historical context, we also provide insights into the older Harris-Benedict formula.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
              <div className="p-6 border rounded-xl bg-white shadow-sm">
                <h4 className="font-bold text-[#1A73E8]">Mifflin-St Jeor (Men)</h4>
                <code className="text-xs">BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) + 5</code>
              </div>
              <div className="p-6 border rounded-xl bg-white shadow-sm">
                <h4 className="font-bold text-[#1A73E8]">Mifflin-St Jeor (Women)</h4>
                <code className="text-xs">BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) - 161</code>
              </div>
            </div>

            <h3 className="text-2xl font-black text-[#202124] mt-12">BMR vs. TDEE: What&apos;s the difference?</h3>
            <p>
              While BMR is your rest state, <strong>Total Daily Energy Expenditure (TDEE)</strong> is the total number of calories you burn in a day, including activity. To find your TDEE, we multiply your BMR by an <strong>Activity Factor</strong>:
            </p>
            <div className="overflow-x-auto border rounded-xl my-6">
              <table className="w-full text-sm">
                <thead className="bg-[#F8F9FA] font-bold">
                  <tr><th className="p-4">Activity Level</th><th className="p-4">Multiplier</th><th className="p-4">Description</th></tr>
                </thead>
                <tbody className="divide-y">
                  <tr><td className="p-4">Sedentary</td><td className="p-4">1.2</td><td className="p-4">Little to no exercise, desk job.</td></tr>
                  <tr><td className="p-4">Lightly Active</td><td className="p-4">1.375</td><td className="p-4">Light exercise 1-3 days/week.</td></tr>
                  <tr><td className="p-4">Moderately Active</td><td className="p-4">1.55</td><td className="p-4">Moderate exercise 3-5 days/week.</td></tr>
                  <tr><td className="p-4">Very Active</td><td className="p-4">1.725</td><td className="p-4">Hard exercise 6-7 days/week.</td></tr>
                  <tr><td className="p-4">Extra Active</td><td className="p-4">1.9</td><td className="p-4">Physical job or training 2x/day.</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-2xl font-black text-[#202124] mt-12">Factors that Influence your Metabolism</h3>
            <ul className="list-disc pl-6 space-y-4">
              <li><strong>Muscle Mass:</strong> Muscle tissue burns more calories than fat tissue, even at rest. This is why resistance training can "boost" your BMR.</li>
              <li><strong>Age:</strong> BMR typically decreases by 1-2% per decade after the age of 20, largely due to loss of lean muscle mass.</li>
              <li><strong>Genetics:</strong> Some individuals naturally have a higher metabolic rate than others.</li>
              <li><strong>Hormones:</strong> Thyroid hormones are the primary regulators of BMR. An underactive thyroid (hypothyroidism) can significantly lower BMR.</li>
              <li><strong>Environment:</strong> In very cold or hot temperatures, the body must work harder to maintain core temperature, slightly increasing BMR.</li>
            </ul>

            <h3 className="text-2xl font-black text-[#202124] mt-12">Weight Loss Strategy: The Calorie Deficit</h3>
            <p>
              To lose weight safely, health experts recommend a <strong>Calorie Deficit</strong> of 500 to 750 calories below your TDEE. This typically leads to a weight loss of 0.5kg to 1kg per week. 
            </p>
            <div className="bg-red-50 p-6 rounded-xl border border-red-100 my-6">
              <p className="text-sm font-bold text-red-800 mb-2">⚠️ Warning: The Starvation Mode</p>
              <p className="text-sm text-red-700">Dropping your calories below your BMR for extended periods can trigger a protective metabolic slowdown often called "Starvation Mode". This makes long-term weight loss harder. Always aim to eat at least your BMR amount.</p>
            </div>

            <h3 className="text-2xl font-black text-[#202124] mt-12">Frequently Asked Questions (FAQ)</h3>
            <div className="space-y-6">
              <div className="border-b pb-6">
                <h4 className="font-bold">1. Can I increase my BMR?</h4>
                <p className="text-sm text-[#5F6368]">Yes. The most effective way is to increase your lean body mass through strength training. More muscle means a higher baseline burn.</p>
              </div>
              <div className="border-b pb-6">
                <h4 className="font-bold">2. Is BMR the same as RMR?</h4>
                <p className="text-sm text-[#5F6368]">Resting Metabolic Rate (RMR) is similar but slightly less restrictive in measurement conditions. For most practical purposes, BMR and RMR are used interchangeably.</p>
              </div>
              <div>
                <h4 className="font-bold">3. How accurate is this calculator?</h4>
                <p className="text-sm text-[#5F6368]">While highly accurate for the majority, it cannot account for individual hormonal health or exact body composition. For clinical precision, a gas exchange test (Indirect Calorimetry) is required.</p>
              </div>
            </div>

            <div className="mt-16 p-8 bg-[#202124] text-white rounded-2xl flex flex-col md:flex-row items-center gap-8">
              <div className="text-6xl">🥗</div>
              <div>
                <h3 className="text-white text-xl font-bold mb-2">Track Your Progress</h3>
                <p className="text-sm text-gray-400 mb-4">
                  Combine your BMR data with our other health tools for a complete profile.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Link href="/calculator/bmi/" className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full text-white no-underline">BMI Tool</Link>
                  <Link href="/calculator/body-fat/" className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full text-white no-underline">Body Fat %</Link>
                  <Link href="/calculator/ideal-weight/" className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full text-white no-underline">Ideal Weight</Link>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
