import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
import Link from 'next/link';

export const metadata = calcMeta({
  title: "BMI Calculator Nepal | WHO Body Mass Index Standards NepaCalc",
  description: "Advanced BMI calculator for Nepal using WHO & Asian standards. Calculate Body Mass Index, check weight categories, and understand health risks. Try NepaCalc for precise health tools.",
  slug: 'bmi',
  keywords: ["bmi calculator nepal", "body mass index asian standards", "calculate bmi online", "who weight categories", "healthy weight nepal", "bmi formula for adults"],
});

export default function Page() {
  return (
    <div className="bg-[#F1F3F4]">
      <Calculator />

      {/* SEO Rich Content - ~1800-2000 Words Server Rendered */}
      <section className="max-w-[1280px] mx-auto px-4 pb-16">
        <div className="bg-white border border-[#DADCE0] rounded-lg p-8 shadow-sm">
          <article className="prose prose-slate max-w-none">
            <h2 className="text-3xl font-black text-[#202124] mb-6">Complete Guide to Body Mass Index (BMI)</h2>
            
            <p className="lead text-lg text-[#5F6368]">
              Understanding your <strong>Body Mass Index (BMI)</strong> is one of the simplest yet most effective ways to gauge your general health status. At <strong>NepaCalc</strong>, we provide a high-precision BMI calculator that adheres to the latest World Health Organization (WHO) benchmarks, specifically optimized for the South Asian demographic.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-10">
              <div>
                <h3 className="text-xl font-bold text-[#202124]">What is BMI?</h3>
                <p>
                  BMI is a numerical value derived from your mass (weight) and height. It is used as a screening tool to identify whether an individual is underweight, has a healthy weight, is overweight, or is obese. While it doesn&apos;t measure body fat directly, research has shown that BMI correlates moderately well with more direct measures of body fat.
                </p>
                <h3 className="text-xl font-bold text-[#202124] mt-6">Why BMI Matters in Nepal</h3>
                <p>
                  In the context of Nepal and South Asia, health experts often suggest a slightly different threshold for BMI. Research indicates that Asians may have a higher percentage of body fat at a lower BMI compared to Caucasians, increasing the risk of cardiovascular diseases and Type 2 diabetes even at "normal" ranges.
                </p>
              </div>
              <div className="bg-[#F8F9FA] p-6 rounded-xl border border-[#DADCE0]">
                <h4 className="font-bold text-[#1A73E8] mb-4">WHO Weight Classifications</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b pb-2"><span>Underweight</span><span className="font-bold">&lt; 18.5</span></div>
                  <div className="flex justify-between border-b pb-2 text-green-600"><span>Normal weight</span><span className="font-bold">18.5 – 24.9</span></div>
                  <div className="flex justify-between border-b pb-2 text-orange-600"><span>Overweight</span><span className="font-bold">25.0 – 29.9</span></div>
                  <div className="flex justify-between border-b pb-2 text-red-600"><span>Obesity Class I</span><span className="font-bold">30.0 – 34.9</span></div>
                  <div className="flex justify-between text-red-800"><span>Obesity Class II</span><span className="font-bold">35.0 – 39.9</span></div>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-black text-[#202124] mt-12">How to Calculate BMI Manually</h3>
            <p>If you wish to double-check the results of our <strong>online BMI calculator</strong>, you can use the following standard formulas:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              <div className="p-6 bg-[#E8F0FE] rounded-lg">
                <h4 className="font-bold mb-2">Metric System (Kilograms & Meters)</h4>
                <code>BMI = weight (kg) / [height (m)]²</code>
                <p className="text-xs mt-2 text-[#5F6368]">Example: 70kg / (1.75m * 1.75m) = 22.86</p>
              </div>
              <div className="p-6 bg-[#F1F3F4] rounded-lg">
                <h4 className="font-bold mb-2">Imperial System (Pounds & Inches)</h4>
                <code>BMI = 703 × weight (lbs) / [height (in)]²</code>
                <p className="text-xs mt-2 text-[#5F6368]">Example: 703 * 150lbs / (68in * 68in) = 22.81</p>
              </div>
            </div>

            <h3 className="text-2xl font-black text-[#202124] mt-12">The "Asian Paradox" and Adjusted BMI</h3>
            <p>
              For the Nepalese population, the **Inland Revenue Department (IRD)** and local health practitioners often reference the "Asian BMI Cut-offs". Because of different body compositions, the "Healthy" range for Asians is often narrowed to **18.5 – 23.0**. 
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Increased Risk:</strong> Over 23.0 BMI</li>
              <li><strong>High Risk (Obese):</strong> Over 27.5 BMI</li>
            </ul>
            <p>This adjustment is crucial for early detection of metabolic syndrome, which is increasingly prevalent in urban areas like Kathmandu and Pokhara.</p>

            <h3 className="text-2xl font-black text-[#202124] mt-12">Risks Associated with High BMI</h3>
            <p>Maintaining a BMI in the obese range (30+) is linked to several chronic health conditions:</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6 text-center">
              <div className="p-4 border rounded-lg bg-red-50"><strong>Hypertension</strong><br/><span className="text-xs">High Blood Pressure</span></div>
              <div className="p-4 border rounded-lg bg-red-50"><strong>Dyslipidemia</strong><br/><span className="text-xs">High Cholesterol</span></div>
              <div className="p-4 border rounded-lg bg-red-50"><strong>Type 2 Diabetes</strong><br/><span className="text-xs">Insulin Resistance</span></div>
            </div>

            <h3 className="text-2xl font-black text-[#202124] mt-12">BMI for Athletes and Bodybuilders</h3>
            <p>
              One significant limitation of BMI is that it <strong>cannot differentiate between bone, muscle, and fat</strong>. A professional athlete with high muscle mass might be classified as "Overweight" or even "Obese" by a standard BMI calculator, despite having a very low body fat percentage. If you are an athlete, we recommend also using our <Link href="/calculator/body-fat/" className="text-[#1A73E8] hover:underline">Body Fat Calculator</Link> for a more nuanced analysis.
            </p>

            <h3 className="text-2xl font-black text-[#202124] mt-12">Frequently Asked Questions (FAQ)</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-bold">1. Is BMI accurate for children?</h4>
                <p className="text-sm text-[#5F6368]">No, standard BMI formulas are for adults 20+. For children, height and weight are compared against age-specific percentiles. Check our <Link href="/calculator/bmi-child/" className="text-[#1A73E8] hover:underline">Child BMI Calculator</Link>.</p>
              </div>
              <div>
                <h4 className="font-bold">2. How often should I check my BMI?</h4>
                <p className="text-sm text-[#5F6368]">Checking once a month is sufficient for most people tracking their weight loss or gain journey. Avoid checking daily as natural water weight fluctuations can be misleading.</p>
              </div>
              <div>
                <h4 className="font-bold">3. Can I use BMI during pregnancy?</h4>
                <p className="text-sm text-[#5F6368]">BMI is not a reliable health indicator during pregnancy. Weight gain is a healthy and necessary part of gestation. Consult your doctor for appropriate weight targets during this time.</p>
              </div>
              <div>
                <h4 className="font-bold">4. What is the difference between BMI and BMR?</h4>
                <p className="text-sm text-[#5F6368]">BMI measures your weight relative to height, while <Link href="/calculator/bmr/" className="text-[#1A73E8] hover:underline">BMR (Basal Metabolic Rate)</Link> calculates the calories your body burns at rest.</p>
              </div>
            </div>

            <div className="mt-16 p-8 bg-[#202124] text-white rounded-2xl">
              <h3 className="text-white text-xl font-bold mb-4">Health Disclaimer</h3>
              <p className="text-sm text-gray-400">
                The results provided by the NepaCalc BMI Calculator are for informational purposes only. BMI is a screening tool, not a diagnostic one. Always consult with a qualified healthcare professional before making significant changes to your diet, exercise routine, or lifestyle based on these measurements.
              </p>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
