'use client';

import { useState, useRef, useEffect } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Calculator, Apple, AlertCircle } from 'lucide-react';
import Link from 'next/link';

const ACTIVITY_LEVELS = [
  { id: 'sedentary',  label: 'Sedentary — little or no exercise', mult: 1.2 },
  { id: 'light',      label: 'Lightly active — light exercise or activity around 1–3 days per week', mult: 1.375 },
  { id: 'moderate',   label: 'Moderately active — moderate exercise or activity around 3–5 days per week', mult: 1.55 },
  { id: 'very',       label: 'Very active — hard exercise or activity around 6–7 days per week', mult: 1.725 },
  { id: 'extra',      label: 'Extra active — very hard training or physically demanding work', mult: 1.9 },
];

export default function CalorieCalculator() {
  const [sex, setSex] = useState<'male' | 'female' | ''>('');
  const [age, setAge] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [activity, setActivity] = useState<string>(ACTIVITY_LEVELS[2].id); // Moderately active default

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<{ tdee: number; bmr: number; mult: number } | null>(null);

  const resultRef = useRef<HTMLDivElement>(null);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!sex) newErrors.sex = 'Please select a biological sex.';

    const numAge = Number(age);
    if (!age) newErrors.age = 'Age is required.';
    else if (isNaN(numAge) || numAge < 15 || numAge > 120) newErrors.age = 'Enter an age between 15 and 120.';

    const numWeight = Number(weight);
    if (!weight) newErrors.weight = 'Weight is required.';
    else if (isNaN(numWeight) || numWeight < 30 || numWeight > 300) newErrors.weight = 'Enter a valid weight (30-300 kg).';

    const numHeight = Number(height);
    if (!height) newErrors.height = 'Height is required.';
    else if (isNaN(numHeight) || numHeight < 100 || numHeight > 250) newErrors.height = 'Enter a valid height (100-250 cm).';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculate = () => {
    const w = Number(weight);
    const h = Number(height);
    const a = Number(age);

    let bmr = 0;
    if (sex === 'male') {
      bmr = 10 * w + 6.25 * h - 5 * a + 5;
    } else {
      bmr = 10 * w + 6.25 * h - 5 * a - 161;
    }

    const mult = ACTIVITY_LEVELS.find((lvl) => lvl.id === activity)!.mult;
    const tdee = bmr * mult;

    setResult({ bmr, tdee, mult });
  };

  const handleCalculate = () => {
    if (!validate()) {
      setResult(null);
      return;
    }
    calculate();
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  };

  // Re-calculate automatically if result already exists and inputs are valid
  useEffect(() => {
    if (result) {
      if (sex && age && weight && height) {
        const w = Number(weight);
        const h = Number(height);
        const a = Number(age);
        if (!isNaN(w) && w >= 30 && w <= 300 && !isNaN(h) && h >= 100 && h <= 250 && !isNaN(a) && a >= 15 && a <= 120) {
          setErrors({});
          calculate();
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sex, age, weight, height, activity]);

  const inputClasses = "w-full h-12 px-4 border border-[#DADCE0] rounded-xl bg-white text-[#202124] text-sm font-medium focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-all shadow-sm";
  const labelClasses = "block text-sm font-bold text-[#202124] mb-2";
  const errorClasses = "text-xs font-semibold text-rose-500 mt-1 flex items-center gap-1";

  return (
    <ModernCalcLayout
      slug="calorie-calculator"
      hideH1={true}
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Calculators', href: '/calculator/' }, { label: 'Calorie Calculator' }]}
      title="Calorie Calculator"
      description="Estimate your daily calorie needs to maintain, lose, or gain weight."
      icon={Apple}
      inputs={
        <div className="space-y-6">
          <div className="mb-2">
            <h1 className="text-2xl font-black text-[#202124] mb-2">Daily Calorie Calculator</h1>
            <div className="space-y-2 mb-4">
              <p className="text-[#5F6368] text-sm leading-relaxed">
                Use this daily calorie calculator to estimate how many calories you need each day based on your age, sex, height, weight, and activity level. It estimates your daily calorie needs for maintaining your current weight, losing weight, or gaining weight.
              </p>
              <p className="text-[#5F6368] text-sm leading-relaxed">
                Enter your details and select the activity level that best reflects your usual routine to get your estimated daily calorie targets. Your results are estimates rather than exact measurements, and your actual calorie needs may vary.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <label className={labelClasses}>Biological sex</label>
            <div className="flex gap-3">
              <label className={`flex items-center gap-2 px-4 py-3 rounded-xl border cursor-pointer transition-all ${sex === 'male' ? 'bg-teal-50 border-teal-500 text-teal-800' : 'bg-white border-[#DADCE0] hover:border-teal-300 text-[#5F6368]'}`}>
                <input
                  type="radio"
                  name="sex"
                  value="male"
                  checked={sex === 'male'}
                  onChange={() => setSex('male')}
                  className="w-4 h-4 text-teal-600 focus:ring-teal-500 border-gray-300"
                />
                <span className="text-sm font-semibold">Male</span>
              </label>
              <label className={`flex items-center gap-2 px-4 py-3 rounded-xl border cursor-pointer transition-all ${sex === 'female' ? 'bg-teal-50 border-teal-500 text-teal-800' : 'bg-white border-[#DADCE0] hover:border-teal-300 text-[#5F6368]'}`}>
                <input
                  type="radio"
                  name="sex"
                  value="female"
                  checked={sex === 'female'}
                  onChange={() => setSex('female')}
                  className="w-4 h-4 text-teal-600 focus:ring-teal-500 border-gray-300"
                />
                <span className="text-sm font-semibold">Female</span>
              </label>
            </div>
            {errors.sex && <div className={errorClasses}><AlertCircle className="w-3.5 h-3.5" />{errors.sex}</div>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className={labelClasses} htmlFor="age">Age (years)</label>
              <input
                id="age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className={inputClasses}
                placeholder="e.g. 25"
                min="15"
                max="120"
              />
              {errors.age && <div className={errorClasses}><AlertCircle className="w-3.5 h-3.5" />{errors.age}</div>}
            </div>
            <div className="space-y-2">
              <label className={labelClasses} htmlFor="weight">Weight (kg)</label>
              <input
                id="weight"
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className={inputClasses}
                placeholder="e.g. 70"
                min="30"
                max="300"
              />
              {errors.weight && <div className={errorClasses}><AlertCircle className="w-3.5 h-3.5" />{errors.weight}</div>}
            </div>
          </div>

          <div className="space-y-2">
            <label className={labelClasses} htmlFor="height">Height (cm)</label>
            <input
              id="height"
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className={inputClasses}
              placeholder="e.g. 175"
              min="100"
              max="250"
            />
            {errors.height && <div className={errorClasses}><AlertCircle className="w-3.5 h-3.5" />{errors.height}</div>}
          </div>

          <div className="space-y-2">
            <label className={labelClasses} htmlFor="activity">Activity level</label>
            <select
              id="activity"
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              className={inputClasses + " cursor-pointer appearance-none"}
              style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%235F6368%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.4-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem top 50%', backgroundSize: '0.65rem auto' }}
            >
              {ACTIVITY_LEVELS.map((lvl) => (
                <option key={lvl.id} value={lvl.id}>
                  {lvl.label}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleCalculate}
            className="w-full h-14 mt-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-base"
          >
            <Calculator className="w-5 h-5" /> Calculate Calories
          </button>
        </div>
      }
      results={
        <div className="space-y-6" ref={resultRef}>
          {result ? (
            <>
              <div className="mb-4">
                <h2 className="text-xl font-black text-[#202124]">Your Estimated Daily Calorie Needs</h2>
              </div>

              <div className="p-8 bg-teal-50 border border-teal-200 rounded-2xl text-center space-y-3 shadow-sm">
                <div className="text-sm font-bold text-teal-800 uppercase tracking-widest">
                  Estimated maintenance calories
                </div>
                <div className="text-5xl font-black text-teal-700 tracking-tighter">
                  {Math.round(result.tdee).toLocaleString()} <span className="text-xl">kcal/day</span>
                </div>
                <p className="text-xs text-teal-700 font-medium max-w-sm mx-auto leading-relaxed">
                  This is an estimate of the calories you may need each day to maintain your current weight.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 bg-white border border-[#DADCE0] rounded-xl shadow-sm">
                  <h3 className="text-sm font-black text-[#202124] uppercase tracking-wide mb-1">Lose weight</h3>
                  <p className="text-[11px] text-[#5F6368] mb-3">Moderate deficit (approx. 0.5 kg/week)</p>
                  <div className="text-2xl font-black text-blue-600">
                    {Math.max(1200, Math.round(result.tdee - 500)).toLocaleString()} <span className="text-sm">kcal/day</span>
                  </div>
                  {result.tdee - 500 < 1200 && (
                    <p className="text-[10px] text-rose-500 mt-2 font-medium leading-tight">
                      *Target limited to minimum safe intake.
                    </p>
                  )}
                </div>

                <div className="p-5 bg-white border border-[#DADCE0] rounded-xl shadow-sm">
                  <h3 className="text-sm font-black text-[#202124] uppercase tracking-wide mb-1">Gain weight</h3>
                  <p className="text-[11px] text-[#5F6368] mb-3">Modest surplus (approx. 0.25 kg/week)</p>
                  <div className="text-2xl font-black text-emerald-600">
                    {Math.round(result.tdee + 250).toLocaleString()} <span className="text-sm">kcal/day</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <p className="text-xs text-[#5F6368] leading-relaxed">
                  <strong>Note:</strong> This calculator provides an estimate based on the Mifflin-St Jeor equation, not a medical diagnosis or personalized medical advice. Results vary by individual. Generally, men should not go below 1,500 and women below 1,200 calories without medical supervision.
                </p>
              </div>
            </>
          ) : (
            <div className="p-12 text-center opacity-40 border-2 border-dashed border-[#DADCE0] rounded-2xl">
              <Calculator className="w-12 h-12 mx-auto mb-4 text-[#70757A]" />
              <p className="text-sm font-bold uppercase tracking-widest text-[#70757A]">
                Submit the form to view results
              </p>
            </div>
          )}
        </div>
      }
      details={
        <div className="space-y-8">
          {/* Section 1: Merged S1 + S2 */}
          <div className="space-y-2">
            <h2 className="text-xl font-black text-[#202124]">How Many Calories Do You Need Each Day?</h2>
            <p className="text-sm text-[#5F6368] leading-relaxed">
              The number of calories you need each day depends on several personal factors, including your age, sex, height, weight, and activity level. These variables determine your body&apos;s baseline energy expenditure and how much fuel is required to maintain your current weight.
            </p>
            <p className="text-sm text-[#5F6368] leading-relaxed">
              Calorie requirements also change based on your individual goals. Maintaining weight generally involves matching your calorie intake to your daily energy expenditure, whereas losing or gaining weight requires adjusting intake relative to that baseline. Because individual metabolism and lifestyle factors vary, there is no single calorie target that works for everyone.
            </p>
          </div>

          {/* Section 2: What Are BMR and TDEE? with BMR Calculator link */}
          <div className="space-y-2">
            <h2 className="text-xl font-black text-[#202124]">What Are BMR and TDEE?</h2>
            <p className="text-sm text-[#5F6368] leading-relaxed">
              Basal Metabolic Rate (BMR) is the estimated amount of energy your body uses at complete rest to support vital biological functions such as breathing, circulation, and cellular repair.
            </p>
            <p className="text-sm text-[#5F6368] leading-relaxed">
              Total Daily Energy Expenditure (TDEE) is the estimated total energy your body expends throughout the day once physical activity and movement are factored in.
            </p>
            <p className="text-sm text-[#5F6368] leading-relaxed">
              While BMR represents the energy needed just to stay alive at rest, TDEE reflects your overall daily energy requirement. You can also use our{' '}
              <Link href="/calculator/bmr/" className="text-teal-600 font-semibold hover:underline">
                BMR Calculator
              </Link>{' '}
              to explore your basal metabolic rate in detail.
            </p>
          </div>

          {/* Section 3: How Does Activity Level Affect Your Calorie Needs? */}
          <div className="space-y-2">
            <h2 className="text-xl font-black text-[#202124]">How Does Activity Level Affect Your Calorie Needs?</h2>
            <p className="text-sm text-[#5F6368] leading-relaxed">
              Your activity level affects your estimated daily calorie needs. Someone who spends most of the day sitting generally uses less energy than someone who exercises regularly or has a physically demanding routine.
            </p>
            <p className="text-sm text-[#5F6368] leading-relaxed">
              This calculator uses five activity levels to estimate your Total Daily Energy Expenditure (TDEE):
            </p>
            <ul className="space-y-1 pl-4 text-sm text-[#5F6368]">
              <li className="leading-relaxed"><strong className="text-[#202124]">Sedentary:</strong> Little or no regular exercise.</li>
              <li className="leading-relaxed"><strong className="text-[#202124]">Lightly active:</strong> Light exercise or activity on some days.</li>
              <li className="leading-relaxed"><strong className="text-[#202124]">Moderately active:</strong> Moderate exercise or regular daily movement.</li>
              <li className="leading-relaxed"><strong className="text-[#202124]">Very active:</strong> Frequent vigorous exercise or a physically demanding routine.</li>
              <li className="leading-relaxed"><strong className="text-[#202124]">Extra active:</strong> Very high activity levels, such as intense training combined with physically demanding work.</li>
            </ul>
            <p className="text-sm text-[#5F6368] leading-relaxed">
              Choose the level that best reflects your usual routine. These categories are estimates, and your actual energy needs may vary depending on your daily activities.
            </p>
          </div>

          {/* Section 4: Maintenance Calories, Weight Loss, and Weight Gain with BMI link */}
          <div className="space-y-2">
            <h2 className="text-xl font-black text-[#202124]">Maintenance Calories, Weight Loss, and Weight Gain</h2>
            <p className="text-sm text-[#5F6368] leading-relaxed">
              Maintenance calories represent the estimated daily intake required to keep your body weight stable. This calculator uses your estimated TDEE as that baseline figure.
            </p>
            <ul className="space-y-1 pl-4 text-sm text-[#5F6368]">
              <li className="leading-relaxed"><strong className="text-[#202124]">Maintain weight:</strong> Your estimated target equals your calculated TDEE.</li>
              <li className="leading-relaxed"><strong className="text-[#202124]">Lose weight:</strong> The calculator applies a moderate reduction of 500 kcal/day below maintenance (with a minimum safety floor of 1,200 kcal/day).</li>
              <li className="leading-relaxed"><strong className="text-[#202124]">Gain weight:</strong> The calculator applies a modest surplus of 250 kcal/day above maintenance.</li>
            </ul>
            <p className="text-sm text-[#5F6368] leading-relaxed">
              These targets reflect standard calculation formulas rather than guaranteed outcomes. For another perspective on your body measurements, you can also check our{' '}
              <Link href="/calculator/bmi/" className="text-teal-600 font-semibold hover:underline">
                BMI Calculator
              </Link>.
            </p>
          </div>

          {/* Section 5: Merged S7 + S8 with calorie intake calculator keyword and NHS link */}
          <div className="space-y-2">
            <h2 className="text-xl font-black text-[#202124]">Are Calorie Calculator Results Exact?</h2>
            <p className="text-sm text-[#5F6368] leading-relaxed">
              A calorie intake calculator provides an estimate of your daily energy requirements rather than an exact laboratory measurement. Predictive formulas cannot fully account for individual differences in metabolic rate, genetics, body composition, or hormonal health.
            </p>
            <p className="text-sm text-[#5F6368] leading-relaxed">
              Use your estimated results as an informed starting point rather than an inflexible rule. For broader evidence-based guidance on energy balance and nutrition, consult a qualified healthcare professional or review the{' '}
              <a
                href="https://www.who.int/news-room/fact-sheets/detail/healthy-diet"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-600 font-semibold hover:underline"
              >
                World Health Organization (WHO) healthy diet guidance
              </a>.
            </p>
          </div>

          {/* Section 6: Frequently Asked Questions */}
          <div className="space-y-4">
            <h2 className="text-xl font-black text-[#202124]">Frequently Asked Questions</h2>

            <div className="space-y-2">
              <h3 className="text-base font-bold text-[#202124]">How do I calculate my daily calorie needs?</h3>
              <p className="text-sm text-[#5F6368] leading-relaxed">
                Daily calorie needs are estimated using your age, sex, height, weight, and activity level. A calorie calculator uses these details to estimate your BMR and TDEE to provide a daily calorie target.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-bold text-[#202124]">What are maintenance calories?</h3>
              <p className="text-sm text-[#5F6368] leading-relaxed">
                Maintenance calories are the estimated number of calories you need each day to maintain your current weight. Your activity level and personal characteristics determine this figure.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-bold text-[#202124]">Does activity level affect how many calories I need?</h3>
              <p className="text-sm text-[#5F6368] leading-relaxed">
                Yes. Physical activity increases the total energy your body burns each day. A more active routine requires more energy than a sedentary routine, though exact energy expenditure varies between individuals.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-bold text-[#202124]">Can a calorie calculator tell me how many calories to eat to lose weight?</h3>
              <p className="text-sm text-[#5F6368] leading-relaxed">
                A calorie calculator estimates a lower daily calorie target relative to your maintenance needs (such as a 500 kcal deficit). However, the result is an estimate and does not guarantee a specific rate of weight change.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-bold text-[#202124]">Is a calorie calculator result exact?</h3>
              <p className="text-sm text-[#5F6368] leading-relaxed">
                No. Calorie calculators provide estimates based on mathematical population models. Your actual daily energy expenditure may vary.
              </p>
            </div>
          </div>

          {/* Section 7: How the Calorie Calculator Works with PubMed citation */}
          <div className="space-y-4">
            <h2 className="text-xl font-black text-[#202124]">How the Calorie Calculator Works</h2>
            <p className="text-sm text-[#5F6368] leading-relaxed">
              This daily calorie calculator estimates your energy needs using your age, sex, weight, height, and activity level through three steps:
            </p>

            <div className="space-y-1">
              <p className="text-sm font-bold text-[#202124]">1. Estimate your Basal Metabolic Rate (BMR)</p>
              <p className="text-sm text-[#5F6368] leading-relaxed">
                The calculator uses the Mifflin-St Jeor equation (originally published in{' '}
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/2305711/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-600 font-semibold hover:underline"
                >
                  The American Journal of Clinical Nutrition
                </a>) to estimate the energy your body expends at rest based on your weight in kilograms, height in centimeters, age, and biological sex.
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-bold text-[#202124]">2. Estimate your Total Daily Energy Expenditure (TDEE)</p>
              <p className="text-sm text-[#5F6368] leading-relaxed">
                Your estimated BMR is multiplied by an activity factor (ranging from 1.2 to 1.9) corresponding to your chosen activity level to estimate your daily calorie burn.
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-bold text-[#202124]">3. Calculate your calorie targets</p>
              <p className="text-sm text-[#5F6368] leading-relaxed">
                Using your TDEE, the tool calculates daily calorie targets for weight maintenance, a moderate deficit for weight loss, or a modest surplus for weight gain.
              </p>
            </div>
          </div>

          {/* Section 8: Related Calculators */}
          <div className="space-y-3 pt-4 border-t border-[#DADCE0]">
            <h2 className="text-xl font-black text-[#202124]">Related Calculators</h2>
            <ul className="space-y-2 text-sm text-[#5F6368]">
              <li>
                <Link href="/calculator/water-intake/" className="text-teal-600 font-semibold hover:underline">
                  Water Intake Calculator
                </Link>{' '}
                — Estimate your recommended daily fluid and hydration needs.
              </li>
              <li>
                <Link href="/calculator/body-fat/" className="text-teal-600 font-semibold hover:underline">
                  Body Fat Calculator
                </Link>{' '}
                — Estimate your body composition and body fat percentage.
              </li>
            </ul>
          </div>
        </div>
      }
    />
  );
}
