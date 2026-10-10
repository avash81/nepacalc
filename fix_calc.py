import re

with open('src/app/calculator/calorie-calculator/Calculator.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

# Replace the details= block
new_details = """details={
        <div className="space-y-8">
          <div className="bg-white border border-[#DADCE0] rounded-lg p-8 shadow-sm">
             <div className="flex items-center gap-3 mb-8 border-l-4 border-[#1A73E8] pl-4">
                <h3 className="text-base font-black text-[#202124] uppercase tracking-tight">Metabolic Expenditure Audit</h3>
             </div>
             <p className="text-sm text-[#5F6368] leading-relaxed">
                The institutional engine for total daily energy expenditure (TDEE) assessment. Calibrated using the 
                <strong> Mifflin-St Jeor Equation</strong>, this tool provides a high-precision verification of 
                biological energy requirements. By synthesizing basal metabolic rates with physical activity 
                multipliers, it defines the mathematical boundary for weight maintenance, hypertrophy planning, 
                and caloric deficit trajectories.
             </p>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg p-8 shadow-sm">
             <div className="flex items-center gap-3 mb-8 border-l-4 border-[#1A73E8] pl-4">
                <h2 className="text-base font-black text-[#202124] uppercase tracking-tight">Nutrition Guide: Caloric Balance</h2>
             </div>
             <div className="space-y-4">
               <p className="text-sm text-[#5F6368] leading-relaxed font-medium">
                 Mastering your <strong>daily calorie intake</strong> is the single most effective way to control your body weight. Whether your goal is fat loss or muscle hypertrophy, the fundamental law of energy balance remains the same.
               </p>
               <p className="text-sm text-[#5F6368] leading-relaxed">
                 Our <strong>Nutritional Intelligence Laboratory</strong> provides a personalized roadmap for your fitness journey. By calculating your <strong>Total Daily Energy Expenditure (TDEE)</strong>, we help you determine the exact calorie targets needed to achieve your specific body goals while maintaining optimal energy levels for your daily life in Nepal.
               </p>
             </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg p-8 shadow-sm">
             <h2 className="text-xl sm:text-2xl font-black text-[#202124] mb-6">Frequently Asked Questions</h2>
             <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-[#202124] mb-2">1. How many calories do I need per day in Nepal?</h3>
                  <p className="text-sm text-[#5F6368] leading-relaxed">This depends on your activity level. A sedentary worker in Kathmandu might need 1,800-2,000 calories, while an active trekker could require over 3,000 calories.</p>
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#202124] mb-2">2. How many calories should I cut to lose 1kg a week?</h3>
                  <p className="text-sm text-[#5F6368] leading-relaxed">To lose 1kg of fat, you need a deficit of roughly 7,700 calories. A daily deficit of 500-700 calories is generally recommended for safe, sustainable weight loss.</p>
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#202124] mb-2">3. Do calories from Dal Bhat count differently?</h3>
                  <p className="text-sm text-[#5F6368] leading-relaxed">A calorie is a unit of energy, but nutritional quality matters. Dal Bhat is a balanced meal providing sustained energy, making it superior to processed snacks.</p>
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#202124] mb-2">4. Should I track my exercise calories separately?</h3>
                  <p className="text-sm text-[#5F6368] leading-relaxed">Our calculator includes an activity factor (TDEE). While exercise burns calories, most people overestimate the burn; tracking through TDEE is more accurate.</p>
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#202124] mb-2">5. What is the minimum calories I should eat daily?</h3>
                  <p className="text-sm text-[#5F6368] leading-relaxed">Generally, men should not go below 1,500 and women below 1,200 calories without medical supervision to ensure adequate nutrient intake.</p>
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#202124] mb-2">6. Why is the Mifflin-St Jeor equation used instead of Harris-Benedict?</h3>
                  <p className="text-sm text-[#5F6368] leading-relaxed">The original Harris-Benedict equation was created in 1919 and tends to overestimate caloric needs by about 5-10%. The Mifflin-St Jeor equation, developed in 1990, accounts for modern lifestyle changes and is clinically proven to be the most accurate predictive formula for today's population.</p>
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#202124] mb-2">7. Should I recalculate my calories as I lose weight?</h3>
                  <p className="text-sm text-[#5F6368] leading-relaxed">Yes. As your body mass decreases, the amount of energy required to sustain it also decreases. You should recalculate your TDEE for every 3 to 5 kilograms of weight lost to ensure your caloric deficit remains mathematically intact.</p>
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#202124] mb-2">8. Why does biological sex impact the calorie calculation?</h3>
                  <p className="text-sm text-[#5F6368] leading-relaxed">Due to hormonal differences, men naturally carry a higher percentage of metabolically active lean muscle mass and lower essential fat percentages than women. Muscle tissue burns significantly more calories at rest, which is reflected in the differing mathematical constants.</p>
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#202124] mb-2">9. How long will it take to see results on a 500-calorie deficit?</h3>
                  <p className="text-sm text-[#5F6368] leading-relaxed">A 500-calorie daily deficit equals a 3,500-calorie weekly deficit. Since 1 kilogram of body fat contains roughly 7,700 calories, this protocol mathematically forces your body to burn exactly 0.45 kg (1 pound) of pure fat every week.</p>
                </div>
             </div>
          </div>
        </div>
      }"""

text = re.sub(r'details=\{\s*<div className="space-y-8">.*?</div>\s*\}', new_details, text, flags=re.DOTALL)

# Remove the faqs block passed to ModernCalcLayout
text = re.sub(r'faqs=\{\[.*?\]\}', '', text, flags=re.DOTALL)

with open('src/app/calculator/calorie-calculator/Calculator.tsx', 'w', encoding='utf-8') as f:
    f.write(text)
