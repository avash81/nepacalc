import re
import os

file_path = r"c:\Users\hp\Desktop\Movie\calcpro-FIXED\calcpro-final-build\src\data\seo\health.tsx"

with open(file_path, "r", encoding="utf-8") as f:
    text = f.read()

def replace_content_block(full_text, calc_id, new_content_jsx):
    pattern = r"('" + calc_id + r"'|\"" + calc_id + r"\")\s*:\s*\{"
    match = re.search(pattern, full_text)
    if not match:
        print(f"Could not find {calc_id}")
        return full_text
    start_idx = match.start()
    content_match = re.search(r"content\s*:\s*(?:\(|<)", full_text[start_idx:])
    if not content_match:
        print(f"Could not find content: for {calc_id}")
        return full_text
    
    # Extract the matched char '(' or '<'
    char_start = content_match.group()[-1]
    content_start_idx = start_idx + content_match.start() + len(content_match.group()) - 1
    
    if char_start == '(':
        open_count = 0
        end_idx = content_start_idx
        for i in range(content_start_idx, len(full_text)):
            if full_text[i] == '(':
                open_count += 1
            elif full_text[i] == ')':
                open_count -= 1
                if open_count == 0:
                    end_idx = i + 1
                    break
        replacement = f"(\n{new_content_jsx}\n    )"
        return full_text[:content_start_idx] + replacement + full_text[end_idx:]
    else:
        print(f"Unexpected char for {calc_id}: {char_start}")
    return full_text

# Define generic large sections for expansion
section_south_asian_health = '''
            <section className="mt-12 bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                <h3 className="text-2xl font-black text-slate-900 mb-6">Understanding the South Asian and Nepalese Health Context</h3>
                <p className="text-slate-700 leading-relaxed mb-4">
                    When discussing health metrics, it is impossible to ignore the unique genetic, cultural, and dietary contexts of the South Asian population, particularly in Nepal. Studies have consistently shown that South Asians have a higher predisposition to central adiposity, meaning fat is stored predominantly around the abdominal area. This visceral fat is metabolically active and significantly increases the risk of insulin resistance, Type 2 Diabetes, and cardiovascular diseases, even at lower overall body weights compared to Caucasian populations. Therefore, standard global metrics often need to be recalibrated.
                </p>
                <p className="text-slate-700 leading-relaxed mb-4">
                    In Nepal, the rapid urbanization and shift from traditional, physically demanding agrarian lifestyles to more sedentary urban routines have accelerated these health risks. The traditional Nepali diet, heavily reliant on refined carbohydrates (like large portions of white rice in Dal Bhat) and high-sodium pickles, combined with decreasing physical activity, creates a perfect storm for metabolic syndrome. Health practitioners in Nepal are increasingly advocating for stricter personal health benchmarks. For instance, while the global healthy BMI limit is up to 24.9, the World Health Organization (WHO) has suggested that public health action for South Asians should be triggered at a BMI of 23.
                </p>
                <p className="text-slate-700 leading-relaxed mb-4">
                    Furthermore, the healthcare infrastructure in Nepal is heavily skewed towards curative rather than preventive care. By empowering individuals with accurate, easy-to-use health calculators, we bridge a critical gap. Tracking your daily metrics at home reduces the burden on the healthcare system and encourages proactive lifestyle modifications. Small changes, such as replacing a portion of white rice with complex carbohydrates like millet (kodo) or buckwheat (phapar), increasing the intake of green leafy vegetables (saag), and incorporating daily brisk walking, can have profound effects on long-term health outcomes.
                </p>
                <p className="text-slate-700 leading-relaxed mb-4">
                    Culturally, food in Nepal is closely tied to hospitality and celebration, making dietary restrictions challenging. However, awareness is growing. The integration of modern nutritional science with traditional knowledge is key. Using calculators to determine baseline requirements allows individuals to enjoy festive foods like sel roti, momo, and sweets in moderation without completely derailing their metabolic health. The goal is not deprivation, but informed, balanced living that respects both cultural heritage and biological necessities.
                </p>
                <p className="text-slate-700 leading-relaxed">
                    By acknowledging these regional nuances, these calculators are not just numerical outputs; they are personalized health compasses. They provide the necessary friction to stop and evaluate daily habits, ensuring that every individual in Nepal and the broader South Asian diaspora can make health choices that are genetically and culturally appropriate, paving the way for a healthier, more vibrant life.
                </p>
            </section>
'''

section_holistic_wellness = '''
            <section className="mt-12 bg-slate-900 text-white rounded-2xl p-8 border border-slate-800 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full blur-[120px] opacity-20 pointer-events-none" />
                <h3 className="text-2xl font-black text-indigo-400 mb-6 relative z-10">Holistic Wellness: Beyond the Numbers</h3>
                <div className="relative z-10 space-y-4 text-slate-300 leading-relaxed">
                    <p>
                        While quantitative measurements provide excellent benchmarks, true health is fundamentally qualitative and holistic. The numbers generated by calculators are merely indicators, not defining characteristics of your overall well-being. A comprehensive approach to health requires integrating these metrics with subjective measures of wellness: how you feel, your energy levels, sleep quality, mental clarity, and emotional resilience. Obsessing over a single number can lead to anxiety and disordered habits, whereas viewing these metrics as one piece of a larger puzzle fosters sustainable, lifelong health.
                    </p>
                    <p>
                        Mental health plays an outsized role in physical health outcomes. Chronic stress elevates cortisol levels, which can lead to increased fat storage, disrupted sleep cycles, and impaired reproductive health. Therefore, managing stress through mindfulness, meditation, or spending time in nature is just as crucial as hitting your daily step count or calorie target. In Nepal, practices deeply rooted in local culture, such as yoga and Vipassana meditation, offer powerful tools for stress regulation and autonomic nervous system balance.
                    </p>
                    <p>
                        Consistency over perfection is another cornerstone of holistic wellness. The human body is incredibly adaptive, but it responds best to gradual, sustained changes rather than extreme, short-term shocks. A consistent 10% caloric deficit, regular moderate exercise, and adequate hydration will yield far better long-term results than a crash diet followed by a binge. This principle of homeostasis means that your body wants to find a balance; your job is to gently guide it toward a healthier equilibrium.
                    </p>
                    <p>
                        Furthermore, social and environmental factors—often termed the social determinants of health—significantly impact your ability to maintain physical wellness. Having a supportive community, access to clean water, fresh air, and safe spaces for physical activity are vital. In the context of rapidly growing cities in Nepal, advocating for better urban planning and community health resources goes hand in hand with individual health tracking.
                    </p>
                    <p>
                        Ultimately, the goal of using these tools is self-empowerment. They demystify the complex biochemical processes of your body, translating them into actionable, everyday steps. By combining the precision of numerical tracking with the wisdom of holistic self-care, you can cultivate a resilient, vibrant state of health that enables you to fully engage with life's challenges and opportunities.
                    </p>
                </div>
            </section>
'''

section_nutrition_exercise = '''
            <section className="mt-12 bg-emerald-50 rounded-2xl p-8 border border-emerald-200">
                <h3 className="text-2xl font-black text-emerald-900 mb-6">The Synergy of Nutrition and Exercise</h3>
                <p className="text-emerald-800 leading-relaxed mb-4">
                    The interplay between what you consume and how you move is the primary driver of physical transformation. Nutrition provides the building blocks and energy, while exercise provides the stimulus for adaptation. Without proper nutrition, exercise can lead to depletion and injury; without exercise, even optimal nutrition cannot build muscle or improve cardiovascular capacity. Understanding this synergy is crucial for interpreting the data provided by health calculators.
                </p>
                <p className="text-emerald-800 leading-relaxed mb-4">
                    Macronutrients—proteins, carbohydrates, and fats—each play specific, irreplaceable roles. Proteins are essential for tissue repair, immune function, and maintaining lean muscle mass, especially crucial when in a caloric deficit. In the Nepali diet, protein sources often need to be consciously increased, incorporating more lentils, beans, paneer, eggs, or lean meats. Carbohydrates are the body's preferred energy source for high-intensity activity, while healthy fats are vital for hormone production and cognitive function.
                </p>
                <p className="text-emerald-800 leading-relaxed mb-4">
                    On the exercise front, a balanced routine includes both cardiovascular training and resistance training. Cardiovascular exercise, such as running, cycling, or brisk walking, improves heart health, increases mitochondrial density, and aids in energy expenditure. Resistance training, whether using weights or body weight, is critical for increasing bone density, building lean muscle mass, and naturally elevating your basal metabolic rate. This means that as you build muscle, your body burns more calories even while resting.
                </p>
                <p className="text-emerald-800 leading-relaxed mb-4">
                    Timing also plays a role, though overall daily intake and expenditure are most important. Consuming a mix of protein and carbohydrates after a strenuous workout can enhance recovery and glycogen replenishment. Similarly, staying hydrated throughout the day ensures that cellular processes, including lipolysis (fat burning) and protein synthesis, function optimally.
                </p>
                <p className="text-emerald-800 leading-relaxed">
                    By strategically aligning your diet and exercise habits with the insights gained from health calculators, you create an environment where your body can thrive. It is not about restriction or punishment, but about fueling your body intelligently to support the demands of your lifestyle and achieve your specific health goals.
                </p>
            </section>
'''

section_cycle_health = '''
            <section className="mt-12 bg-pink-50 rounded-2xl p-8 border border-pink-200 shadow-sm">
                <h3 className="text-2xl font-black text-pink-900 mb-6">The Intricacies of Reproductive Health and Cycle Tracking</h3>
                <p className="text-pink-800 leading-relaxed mb-4">
                    The female reproductive system is a complex, finely tuned network of hormonal signals that governs not just fertility, but overall health. The menstrual cycle is often considered a "fifth vital sign," providing critical insights into a woman's hormonal balance, nutritional status, and stress levels. Irregularities in the cycle can be early indicators of underlying issues such as Polycystic Ovary Syndrome (PCOS), thyroid dysfunction, or extreme physical or emotional stress.
                </p>
                <p className="text-pink-800 leading-relaxed mb-4">
                    Throughout a typical cycle, the fluctuation of estrogen and progesterone affects everything from energy levels and mood to basal body temperature and metabolic rate. During the follicular phase, rising estrogen levels often bring increased energy and insulin sensitivity. In contrast, the luteal phase, dominated by progesterone, can increase the basal metabolic rate slightly and may lead to fluid retention or changes in appetite. Understanding these phases allows women to sync their diet and exercise routines with their natural biological rhythms, a practice gaining popularity as "cycle syncing."
                </p>
                <p className="text-pink-800 leading-relaxed mb-4">
                    In Nepal, discussions around menstruation and reproductive health have historically been stigmatized, leading to a lack of awareness and delayed medical intervention for common issues. However, the paradigm is shifting. Digital health tools and calculators empower women with the knowledge to understand their bodies privately and accurately. By predicting cycle lengths, ovulation windows, and fertile days, these tools provide actionable data for both family planning and general health monitoring.
                </p>
                <p className="text-pink-800 leading-relaxed mb-4">
                    Proper nutrition plays a pivotal role in maintaining hormonal harmony. Deficiencies in key nutrients, such as iron (due to blood loss during menstruation), Vitamin D, magnesium, and healthy fats, can exacerbate PMS symptoms and disrupt cycle regularity. Ensuring a diet rich in these micronutrients is essential. Additionally, managing stress through lifestyle interventions is crucial, as the stress hormone cortisol can directly interfere with the production of reproductive hormones, leading to anovulatory cycles or amenorrhea.
                </p>
                <p className="text-pink-800 leading-relaxed">
                    Embracing cycle tracking is a powerful step towards bodily autonomy and proactive health management. It transforms what is often a mysterious or frustrating biological process into a predictable, manageable, and ultimately empowering aspect of a woman's health journey.
                </p>
            </section>
'''

section_pediatric_health = '''
            <section className="mt-12 bg-sky-50 rounded-2xl p-8 border border-sky-200 shadow-sm">
                <h3 className="text-2xl font-black text-sky-900 mb-6">Pediatric Health and Growth Tracking: A Foundation for the Future</h3>
                <p className="text-sky-800 leading-relaxed mb-4">
                    Monitoring the growth and development of children is fundamentally different from tracking adult health metrics. Children are in a continuous state of physical and cognitive development, and their bodies require adequate energy and nutrients to support this rapid growth. Health metrics for children, such as BMI-for-age percentiles, are designed to compare a child's measurements against standard growth charts rather than absolute values. This comparative approach ensures that variations in growth spurts and developmental stages are accurately accounted for.
                </p>
                <p className="text-sky-800 leading-relaxed mb-4">
                    In Nepal, the landscape of pediatric health is dual-faceted. While undernutrition and stunting remain challenges in certain rural areas, urban centers are increasingly facing a rise in childhood obesity. This 'double burden of malnutrition' requires nuanced health tracking. Regular monitoring helps identify deviations from a child's expected growth trajectory early on, allowing for timely nutritional interventions, whether that involves addressing deficiencies or encouraging a more active lifestyle and balanced diet to prevent excessive weight gain.
                </p>
                <p className="text-sky-800 leading-relaxed mb-4">
                    The environment in which a child grows profoundly impacts their health outcomes. With the proliferation of screen time, sedentary entertainment, and ultra-processed foods, maintaining a healthy lifestyle for children requires conscious effort from parents and caregivers. Encouraging unstructured outdoor play, minimizing sugary beverages, and providing a diet rich in whole grains, proteins, and fresh fruits and vegetables are foundational habits that shape a child's lifelong relationship with health and food.
                </p>
                <p className="text-sky-800 leading-relaxed mb-4">
                    It is crucial to approach pediatric health metrics with sensitivity. Conversations around weight and body composition should always focus on health, strength, and energy rather than appearance. Stigmatizing a child's weight can lead to deep-seated psychological issues and disordered eating patterns. The goal of using child-specific calculators is to provide parents and healthcare providers with objective data to support the child's optimal development in a positive, nurturing environment.
                </p>
                <p className="text-sky-800 leading-relaxed">
                    By establishing a baseline of health tracking early in life, we can foster a generation that is intuitively connected to their well-being, equipped with the knowledge and habits necessary to thrive in an increasingly complex world.
                </p>
            </section>
'''

section_data_tracking = '''
            <section className="mt-12 bg-indigo-50 rounded-2xl p-8 border border-indigo-200 shadow-sm">
                <h3 className="text-2xl font-black text-indigo-900 mb-6">The Power of Data Tracking in Modern Health</h3>
                <p className="text-indigo-800 leading-relaxed mb-4">
                    We live in an era where data drives almost every aspect of our lives, from personal finance to daily commutes. Applying this data-driven approach to personal health—often referred to as the 'Quantified Self' movement—can yield transformative results. By consistently tracking metrics over time, you remove the guesswork from your health regimen. You transition from subjective feelings, which can be easily influenced by daily mood or fatigue, to objective reality. This empirical approach allows you to identify trends, pinpoint exactly what interventions are working, and make micro-adjustments before small issues become major health concerns.
                </p>
                <p className="text-indigo-800 leading-relaxed mb-4">
                    However, effective data tracking requires the right mindset. The objective is not to achieve absolute perfection every single day, but to observe the moving average. For instance, weight can fluctuate by several pounds a day due to sodium intake, hydration levels, and hormonal changes. If you only look at daily numbers, you might feel discouraged. But by zooming out and looking at a monthly trendline, you can clearly see the progress. This macro-perspective is crucial for maintaining motivation and consistency.
                </p>
                <p className="text-indigo-800 leading-relaxed mb-4">
                    Moreover, integrating digital health calculators into your routine creates a positive feedback loop. When you see tangible evidence that your efforts—whether it's drinking more water, improving sleep hygiene, or maintaining a caloric deficit—are positively impacting your metrics, it reinforces the behavior. This psychological reinforcement is often the missing link in long-term habit formation. It turns abstract health goals into a gamified, achievable process.
                </p>
                <p className="text-indigo-800 leading-relaxed mb-4">
                    In developing regions like Nepal, where access to comprehensive preventative healthcare can be limited by geography or resources, self-tracking becomes even more vital. It democratizes health information, placing the power of monitoring back into the hands of the individual. By utilizing free, accessible online tools, anyone with an internet connection can build a detailed personal health profile. This profile can then be shared with healthcare professionals during consultations, facilitating a much more informed and effective medical dialogue.
                </p>
                <p className="text-indigo-800 leading-relaxed">
                    Ultimately, data tracking is about cultivating a deeper, more attuned relationship with your own body. It teaches you to listen to biological signals and respond with scientifically backed adjustments, leading to a more vibrant, controlled, and fulfilling life.
                </p>
            </section>
'''

section_faqs_extended = '''
            <section className="mt-12">
                <h3 className="text-2xl font-black text-slate-900 mb-6">Extended Expert Insights and Common Queries</h3>
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <h4 className="font-bold text-lg text-slate-800 mb-2">How frequently should I update my metrics?</h4>
                        <p className="text-slate-600 leading-relaxed">
                            For weight and body composition metrics, calculating once every 2 to 4 weeks is optimal. Daily fluctuations in water weight, sodium intake, and digestion can cause significant variations that do not reflect true changes in tissue mass. For cycle and pregnancy tracking, daily or weekly logging is necessary to maintain an accurate timeline. Consistency is more important than frequency.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <h4 className="font-bold text-lg text-slate-800 mb-2">Can these calculators replace professional medical advice?</h4>
                        <p className="text-slate-600 leading-relaxed">
                            Absolutely not. These calculators are educational and screening tools designed to provide a baseline understanding of your health metrics based on mathematical formulas and population averages. They cannot account for individual medical histories, genetic conditions, or specific physiological anomalies. Always consult with a qualified healthcare provider or registered dietitian for personalized medical advice, diagnosis, or treatment plans.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <h4 className="font-bold text-lg text-slate-800 mb-2">Why might my results differ from other sources?</h4>
                        <p className="text-slate-600 leading-relaxed">
                            Different calculators may use different underlying formulas. For example, BMR can be calculated using Mifflin-St Jeor, Harris-Benedict, or Katch-McArdle equations, each yielding slightly different results. Our tools transparently display the formulas used (e.g., U.S. Navy Method for Body Fat, Mifflin-St Jeor for BMR) to ensure you understand the methodology behind your results.
                        </p>
                    </div>
                     <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <h4 className="font-bold text-lg text-slate-800 mb-2">How does age factor into these calculations?</h4>
                        <p className="text-slate-600 leading-relaxed">
                            Age is a critical variable in most health equations. As we age, our basal metabolic rate naturally decreases due to a gradual loss of lean muscle mass and changes in cellular metabolism. Similarly, fertility metrics and ideal weight ranges shift over time. By accurately inputting your age, the calculators adjust the output to reflect the biological realities of your specific life stage, ensuring the data remains relevant and actionable.
                        </p>
                    </div>
                </div>
            </section>
'''

calculators = {
    'bmi': {
        'intro': "Body Mass Index (BMI) is a fundamental screening tool used globally to categorize human weight in relation to height. It provides a simple numeric measure that helps individuals and healthcare providers identify potential weight-related health risks. While it doesn't directly measure body fat, it correlates strongly with more direct measures of body fat and serves as a vital early warning system for metabolic diseases.",
        'links': [('bmr', 'BMR Calculator'), ('calorie-calculator', 'Calorie Calculator'), ('body-fat', 'Body Fat Percentage'), ('ideal-weight', 'Ideal Weight Tool'), ('lean-body-mass', 'Lean Mass Tracker')],
        'sections': [section_south_asian_health, section_holistic_wellness, section_nutrition_exercise, section_data_tracking, section_faqs_extended]
    },
    'bmr': {
        'intro': "Your Basal Metabolic Rate (BMR) represents the minimum number of calories your body requires to perform basic life-sustaining functions at rest, such as breathing, circulating blood, and regulating body temperature. It accounts for about 60-75% of your total daily energy expenditure. Knowing your BMR is the absolute first step in constructing any diet plan, whether your goal is weight loss, muscle gain, or maintenance.",
        'links': [('bmi', 'BMI Calculator'), ('calorie-calculator', 'Daily Calorie Needs'), ('ideal-weight', 'Ideal Weight Goal'), ('water-intake', 'Hydration Calculator'), ('body-fat', 'Body Fat Estimation')],
        'sections': [section_nutrition_exercise, section_holistic_wellness, section_south_asian_health, section_data_tracking, section_faqs_extended]
    },
    'calorie-calculator': {
        'intro': "A Calorie Calculator is your daily nutritional compass. By calculating your Total Daily Energy Expenditure (TDEE), it determines exactly how much energy you burn in a day based on your BMR and activity level. Managing the balance between the calories you consume and the calories you burn is the scientifically proven method for weight management, ensuring you achieve your goals safely and predictably.",
        'links': [('bmr', 'BMR Baseline'), ('bmi', 'BMI Assessment'), ('ideal-weight', 'Target Weight'), ('lean-body-mass', 'Lean Mass Info'), ('water-intake', 'Water Requirements')],
        'sections': [section_nutrition_exercise, section_holistic_wellness, section_south_asian_health, section_data_tracking, section_faqs_extended]
    },
    'body-fat': {
        'intro': "The Body Fat Calculator uses body circumference measurements to estimate the percentage of your total weight that is composed of fat tissue. Unlike weight or BMI, body fat percentage provides a much clearer picture of your actual body composition and physical fitness. Lowering your body fat while preserving lean muscle is the true essence of healthy weight loss and metabolic optimization.",
        'links': [('lean-body-mass', 'Lean Body Mass Tool'), ('bmi', 'BMI Checker'), ('calorie-calculator', 'Calorie Needs'), ('ideal-weight', 'Ideal Weight Range'), ('bmr', 'BMR Calculator')],
        'sections': [section_nutrition_exercise, section_south_asian_health, section_holistic_wellness, section_data_tracking, section_faqs_extended]
    },
    'ideal-weight': {
        'intro': "An Ideal Weight Calculator helps you discover the healthy weight range for your specific height and gender using scientifically validated formulas like Devine, Robinson, and Miller. Rather than striving for an unrealistic aesthetic standard, this tool provides a medical baseline aimed at minimizing the risk of chronic illnesses such as hypertension, diabetes, and cardiovascular diseases.",
        'links': [('bmi', 'BMI Status'), ('body-fat', 'Body Fat Metrics'), ('calorie-calculator', 'Calorie Guide'), ('lean-body-mass', 'Lean Mass Tracker'), ('bmr', 'Metabolic Rate')],
        'sections': [section_south_asian_health, section_holistic_wellness, section_nutrition_exercise, section_data_tracking, section_faqs_extended]
    },
    'water-intake': {
        'intro': "Proper hydration is the cornerstone of human physiology. A Water Intake Calculator personalizes your daily fluid requirements based on your body weight and physical activity levels. From regulating body temperature and lubricating joints to flushing out toxins and optimizing cognitive function, maintaining optimal hydration is critical for immediate performance and long-term health.",
        'links': [('calorie-calculator', 'Calorie Needs'), ('bmr', 'Metabolic Rate'), ('sleep', 'Sleep Cycle Planner'), ('ideal-weight', 'Weight Management'), ('body-fat', 'Body Composition')],
        'sections': [section_data_tracking, section_holistic_wellness, section_nutrition_exercise, section_south_asian_health, section_faqs_extended]
    },
    'pregnancy-due-date': {
        'intro': "The Pregnancy Due Date Calculator provides expecting parents with an estimated timeline for their pregnancy journey. Using the standard Naegele's Rule based on the Last Menstrual Period (LMP), it estimates the pivotal day of delivery. This allows for proper medical planning, tracking of developmental milestones, and emotional preparation for the arrival of a new life.",
        'links': [('ovulation-calculator', 'Ovulation Tracker'), ('period-calculator', 'Period Predictor'), ('water-intake', 'Pregnancy Hydration'), ('sleep', 'Sleep Planning'), ('bmi', 'Maternal BMI')],
        'sections': [section_cycle_health, section_holistic_wellness, section_south_asian_health, section_data_tracking, section_faqs_extended]
    },
    'bmi-child': {
        'intro': "The Child BMI Calculator is an essential pediatric tool that assesses a child's growth trajectory by comparing their Body Mass Index against standard age and gender percentiles. Because children are continuously growing, their BMI must be interpreted relative to their peers. This tool helps identify early risks of malnutrition or childhood obesity, allowing for timely and supportive interventions.",
        'links': [('age-calculator', 'Age Calculator'), ('water-intake', 'Daily Hydration'), ('sleep', 'Sleep Requirements'), ('ideal-weight', 'Adult Weight Range'), ('bmi', 'Adult BMI')],
        'sections': [section_pediatric_health, section_holistic_wellness, section_nutrition_exercise, section_data_tracking, section_faqs_extended]
    },
    'sleep': {
        'intro': "A Sleep Calculator leverages the science of human circadian rhythms and 90-minute sleep cycles to optimize your rest. Waking up in the middle of deep sleep causes grogginess and sleep inertia. By calculating precise bedtimes and wake times that align with the end of a natural cycle, this tool helps you wake up feeling refreshed, alert, and fully recovered.",
        'links': [('water-intake', 'Hydration Guide'), ('bmr', 'Resting Metabolism'), ('period-calculator', 'Cycle Tracker'), ('age-calculator', 'Age Tracking'), ('calorie-calculator', 'Energy Needs')],
        'sections': [section_holistic_wellness, section_cycle_health, section_data_tracking, section_nutrition_exercise, section_faqs_extended]
    },
    'ovulation-calculator': {
        'intro': "The Ovulation Calculator is a powerful predictive tool for family planning and reproductive health. By analyzing your menstrual cycle length, it identifies your fertile window—the days you are most likely to conceive. Whether you are trying to become pregnant or simply wish to understand your body's hormonal fluctuations better, this calculator provides vital, personalized biological insights.",
        'links': [('period-calculator', 'Period Tracker'), ('pregnancy-due-date', 'Due Date Predictor'), ('water-intake', 'Hydration Needs'), ('sleep', 'Sleep Optimization'), ('bmi', 'Health Baseline')],
        'sections': [section_cycle_health, section_holistic_wellness, section_south_asian_health, section_data_tracking, section_faqs_extended]
    },
    'period-calculator': {
        'intro': "A Period Calculator helps you predict your upcoming menstrual cycles, allowing you to plan your life, workouts, and travel with confidence. The menstrual cycle is a vital sign of female health. Tracking cycle length and regularity can help identify hormonal imbalances early, reduce the anxiety of unexpected periods, and foster a deeper connection with your body's natural rhythms.",
        'links': [('ovulation-calculator', 'Fertility Window'), ('pregnancy-due-date', 'Pregnancy Planning'), ('sleep', 'Rest Calculator'), ('water-intake', 'Hydration Goals'), ('bmi', 'Body Mass Index')],
        'sections': [section_cycle_health, section_holistic_wellness, section_data_tracking, section_nutrition_exercise, section_faqs_extended]
    },
    'age-calculator': {
        'intro': "The Age Calculator provides absolute precision in determining chronological age in years, months, and days. Whether calculating age for legal document verification, educational enrollment, pediatric growth tracking, or simply satisfying curiosity about the exact duration between two dates, this tool eliminates manual calendar counting errors and handles leap years automatically.",
        'links': [('bmi-child', 'Pediatric BMI'), ('ideal-weight', 'Weight by Age'), ('bmr', 'Metabolism by Age'), ('sleep', 'Sleep by Age'), ('pregnancy-due-date', 'Due Date Tracking')],
        'sections': [section_data_tracking, section_pediatric_health, section_faqs_extended, section_holistic_wellness, section_south_asian_health]
    },
    'lean-body-mass': {
        'intro': "The Lean Body Mass (LBM) Calculator determines the weight of everything in your body except fat—this includes your organs, bones, blood, and most importantly, muscle tissue. Preserving or increasing LBM is crucial for maintaining a high metabolic rate, protecting against osteoporosis, and ensuring functional strength and mobility as you age.",
        'links': [('body-fat', 'Body Fat Percent'), ('bmr', 'BMR Tracker'), ('calorie-calculator', 'Calorie Planner'), ('bmi', 'BMI Check'), ('ideal-weight', 'Target Weight')],
        'sections': [section_nutrition_exercise, section_holistic_wellness, section_south_asian_health, section_data_tracking, section_faqs_extended]
    }
}

for calc_id, data in calculators.items():
    intro = data['intro']
    links = data['links']
    
    link_html = ""
    for slug, link_text in links:
        link_html += f'                        <li><a href="/calculator/{slug}/" className="text-sky-600 hover:text-sky-800 underline font-semibold transition-colors">{link_text}</a></li>\\n'

    jsx_content = f'''        <div className="space-y-12 max-w-4xl mx-auto text-slate-800">
            {{/* Hero Section */}}
            <div className="bg-sky-50 border-l-4 border-sky-600 rounded-r-xl p-8 shadow-sm">
                <h2 className="text-3xl font-black text-slate-900 mb-4 capitalize">Comprehensive Guide: {calc_id.replace('-', ' ')}</h2>
                <p className="text-lg leading-relaxed text-slate-700">
                    {intro}
                </p>
                
                <div className="mt-8 bg-white p-6 rounded-xl border border-sky-100">
                    <h4 className="text-sm font-black text-sky-800 uppercase tracking-wider mb-4">Explore Related Calculators</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
{link_html}                    </ul>
                </div>
            </div>

            {data['sections'][0]}
            {data['sections'][1]}
            {data['sections'][2]}
            {data['sections'][3]}
            {data['sections'][4]}

            {{/* Final Wrap-up */}}
            <section className="mt-12 bg-slate-50 rounded-2xl p-8 border border-slate-200 text-center">
                <h3 className="text-xl font-black text-slate-900 mb-4">Empower Your Health Journey</h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                    Knowledge is the first step toward lasting health transformation. By utilizing tools like the {calc_id.replace('-', ' ')} calculator, you equip yourself with the data needed to make informed, highly personalized decisions. Remember, these metrics are waypoints on your journey, not the final destination. 
                </p>
                <p className="text-slate-500 text-sm italic">
                    Disclaimer: This tool provides estimations based on standard mathematical formulas and should not replace professional medical advice. Always consult a healthcare provider for medical concerns.
                </p>
            </section>
        </div>'''

    text = replace_content_block(text, calc_id, jsx_content)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(text)

print("Expansion complete.")
