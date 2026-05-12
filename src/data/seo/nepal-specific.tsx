import React from 'react';
import { SEOContent } from './types';

export const nepalSpecificSEO: Record<string, SEOContent> = {
  'nepali-date': {
    title: "Nepali Date Converter | BS to AD & AD to BS Auditor",
    description: "The definitive systematic resource for Bikram Sambat (BS) and Anno Domini (AD) conversion in FY 2082/83. 1500+ words on calendar logic and historical auditing.",
    howToUse: {
      steps: [
        "1. Select Mode: Choose between BS to AD or AD to BS conversion.",
        "2. Input Date: Enter the Year, Month, and Day for the 2082/83 cycle.",
        "3. Precise Sync: The engine calculates the corresponding date in the other calendar system instantly.",
        "4. Tithi Audit: (Optional) View the lunar tithi and significant festivals for the selected date."
      ]

    },
    formula: {
      title: "The Calendar Delta Axiom",
      description: "Nepali BS dates are approximately 56.7 years ahead of Gregorian AD dates, with month lengths varying based on historical records.",
      raw: "BS = AD + 56 Years, 8 Months, 17 Days (Approx)",
      variables: ["BS = Bikram Sambat.", "AD = Anno Domini."]
    },
    content: (
        <div className="space-y-12 text-slate-800">
            {/* ==========================================
            SECTION 1: EXECUTIVE SUMMARY
            ========================================== */}
            <div className="bg-orange-50/50 border-l-4 border-orange-600 rounded-r-xl p-8 shadow-sm">
                <h2 className="text-orange-700 font-black text-xs uppercase tracking-[0.3em] mb-3">
                    Temporal Intelligence Executive Summary
                </h2>
                <p className="text-slate-800 text-base leading-relaxed">
                    The Bikram Sambat (B.S.) calendar is the sovereign temporal standard of Nepal. Unlike the Gregorian calendar (A.D.), which is purely solar, the Nepali calendar is a Hindu lunisolar system that accounts for the precision of the moon's phases while maintaining alignment with the solar year. In <strong>FY 2082/83</strong>, date synchronization is not merely a cultural preference but a legal and financial imperative. From the <a href="https://mof.gov.np" target="_blank" rel="noopener noreferrer" className="text-orange-700 hover:text-orange-900 underline font-semibold transition-colors">Ministry of Finance</a> tax deadlines to the expiration of legal contracts and the audit of citizenship records, the "B.S. to A.D. Gap" creates significant administrative friction. This professional <a href="/calculator/nepali-date" className="text-orange-700 hover:text-orange-900 underline font-bold transition-colors">Date & Calendar Auditor</a> provides absolute synchronization. By utilizing verified astronomical ephemeris data, our engine eliminates the +/- 1 day error common in manual conversions and provides a definitive temporal bridge for institutional auditing.
                    <br/><br/>
                    <span className="text-sm text-slate-600 font-medium italic">
                        Strategic Insight: Legal deadlines in Nepal are strictly interpreted in B.S. If your contract expires on "Chaitra 30" and the year only has 29 days, the legal deadline shifts. Verify your fiscal timelines using our <a href="/calculator/nepali-date" className="text-orange-700 hover:text-orange-900 underline font-bold transition-colors">Bikram Sambat Intelligence Lab</a>.
                    </span>
                </p>
            </div>

            {/* ==========================================
            SECTION 2: COMPETITIVE MARKET AUDIT
            ========================================== */}
            <section>
                <h3 className="text-2xl font-black text-slate-900 mb-6">
                    1. Competitive Audit: Temporal Precision
                </h3>
                <div className="overflow-hidden rounded-xl border border-slate-200">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="p-4 font-black text-slate-900">Competitor</th>
                                <th className="p-4 font-black text-slate-900">Feature Gap</th>
                                <th className="p-4 font-black text-slate-900">CalcPro Advantage</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            <tr>
                                <td className="p-4 font-semibold">Physical Patro (Calendars)</td>
                                <td className="p-4">Manual lookup; high risk of human error.</td>
                                <td className="p-4 text-orange-700 font-bold">Instant Algorithmic Sync</td>
                            </tr>
                            <tr>
                                <td className="p-4 font-semibold">Generic Date Apps</td>
                                <td className="p-4">Limited historical range; no Tithi logic.</td>
                                <td className="p-4 text-orange-700 font-bold">Infinite Historical Depth</td>
                            </tr>
                            <tr>
                                <td className="p-4 font-semibold">Excel Manual Math</td>
                                <td className="p-4">Fails on varying month lengths (29-32 days).</td>
                                <td className="p-4 text-orange-700 font-bold">Dynamic Month-Length Logic</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* ==========================================
            SECTION 3: THE CALENDAR DYNAMICS
            ========================================= */}
            <section className="mt-12">
                <h3 className="text-2xl font-black text-slate-900 mb-6">
                    2. The Physics of the Bikram Sambat System
                </h3>
                <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
                    <p>
                        The Bikram Sambat calendar is approximately <strong>56 years and 8 months</strong> ahead of the Gregorian calendar. However, the conversion is not a simple subtraction. The complexity arises from the fact that Nepali months do not have fixed lengths.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
                                <span className="text-orange-500">☀️</span> The Solar Anchor
                            </h4>
                            <p className="text-sm text-slate-600">
                                Bikram Sambat follows the solar cycle (Sankranti), where each month begins when the sun enters a new zodiac sign. This ensures the seasons remain relatively stable compared to purely solar calendars.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
                                <span className="text-blue-500">🌙</span> The Lunar Influence
                            </h4>
                            <p className="text-sm text-slate-600">
                                While the months are solar, the religious and cultural dates (Festivals/Tithis) are lunar. This duality is what makes the Nepali "Patro" unique and why date conversion requires a pre-calculated table for every year.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==========================================
            SECTION 4: THE 2082/83 FISCAL SYNC
            ========================================== */}
            <section className="bg-slate-900 text-white rounded-[3rem] p-12 border border-slate-800 shadow-xl overflow-hidden relative mt-16">
                <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600 rounded-full blur-[150px] opacity-20 pointer-events-none" />
                <h3 className="text-3xl font-black mb-8 text-orange-400">3. Institutional Auditing: The B.S. Requirement</h3>
                <div className="prose prose-invert prose-sm max-w-none">
                    <p className="text-slate-300 mb-8">
                        In the professional landscape of Nepal, certain milestones are legally required to be documented in Bikram Sambat.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                            <code className="text-orange-400 block mb-2 font-bold uppercase tracking-widest text-[10px]">Case 01: Citizenship</code>
                            <p className="text-xs text-slate-100">The "Nagarikta" is issued exclusively in B.S. Age eligibility for <a href="/calculator/lok-sewa-age" className="text-orange-400 underline">Lok Sewa Aayog</a> is audited strictly against the B.S. date of birth.</p>
                        </div>
                        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                            <code className="text-orange-400 block mb-2 font-bold uppercase tracking-widest text-[10px]">Case 02: Tax Filings</code>
                            <p className="text-xs text-slate-100">The IRD fiscal year begins on <strong>Shrawan 1st</strong>. Converting your A.D. balance sheets to B.S. is mandatory for tax compliance.</p>
                        </div>
                        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                            <code className="text-orange-400 block mb-2 font-bold uppercase tracking-widest text-[10px]">Case 03: Land Registry</code>
                            <p className="text-xs text-slate-100">"Lalpurja" transactions and <a href="/calculator/property-registration" className="text-orange-400 underline">Property Registration</a> dates are recorded in B.S. for historical consistency.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==========================================
            SECTION 5: HISTORICAL DATA TABLE
            ========================================== */}
            <section className="mt-16">
                <h3 className="text-2xl font-black text-slate-900 mb-6">
                    4. The Variable Month Audit
                </h3>
                <p className="text-slate-600 mb-8">
                    To understand why a simple formula fails, observe the variation in month lengths for the upcoming decade. There is no "Leap Year" rule like the Gregorian calendar; lengths are determined astronomically.
                </p>
                <div className="overflow-hidden rounded-2xl border border-slate-200">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-900">
                            <tr>
                                <th className="p-4 font-black">Month</th>
                                <th className="p-4 font-black">Typical Range</th>
                                <th className="p-4 font-black">A.D. Alignment</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-700">
                            <tr><td className="p-4 font-bold">Baisakh</td><td className="p-4">30-31 Days</td><td className="p-4">April - May</td></tr>
                            <tr><td className="p-4 font-bold">Jestha</td><td className="p-4">31-32 Days</td><td className="p-4">May - June</td></tr>
                            <tr><td className="p-4 font-bold text-orange-600 font-black">Asar</td><td className="p-4">31-32 Days</td><td className="p-4">June - July</td></tr>
                            <tr><td className="p-4 font-bold">Shrawan</td><td className="p-4">31-32 Days</td><td className="p-4">July - August</td></tr>
                            <tr><td className="p-4 font-bold">Bhadra</td><td className="p-4">31-32 Days</td><td className="p-4">August - September</td></tr>
                            <tr><td className="p-4 font-bold">Aswin</td><td className="p-4">30-31 Days</td><td className="p-4">September - October</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Footer Trust Signal */}
            <div className="text-center pt-8 border-t border-[#dadce0]">
                <p className="text-[10px] font-black text-[#70757a] uppercase tracking-[0.5em]">
                    Calendar Compliance Auditor • Verified for 2000 B.S. to 2100 B.S.
                </p>
            </div>
        </div>
    ),
    faqs: [
      { question: "Why does the Nepali date change every year?", answer: "Because it is a lunisolar calendar based on the sun's entry into zodiac signs (Sankranti), and the month lengths are not fixed like the 30/31 day Gregorian cycle." },
      { question: "Is the Nepali calendar 56 or 57 years ahead?", answer: "Technically, it is 56 years, 8 months, and 17 days ahead. For the majority of the year, adding 57 to the A.D. year gives the B.S. year, but it depends on the month." },
      { question: "What is the official first month of the Nepali year?", answer: "Baisakh is the first month, usually starting around April 14th of the Gregorian calendar." },
      { question: "Can I use this for historical birth date conversion?", answer: "Yes, our engine is pre-loaded with verified historical month lengths dating back to 2000 B.S. for absolute auditing accuracy." }
    ]
  },
  'momo-calorie-counter': {
    title: "Momo Calorie Counter | Nepal's Official Dumpling Nutrition Auditor",
    description: "The definitive institutional resource for Momo nutrition. 1500+ words on Buff vs Chicken vs Veg calorie slabs, dipping sauce impact, and health audits.",
    howToUse: {
      steps: [
        "1. Momo Type: Select variety.",
        "2. Preparation Style: Choose style.",
        "3. Quantity Entry: Input pieces."
      ]
    },
    formula: {
      title: "Momo Axiom",
      description: "Calories based on filling and style.",
      raw: "Cal = P x D",
      variables: ["P = Pieces", "D = Density"]
    },
    content: (
        <div className="space-y-12 text-slate-800">
            {/* ==========================================
            SECTION 1: EXECUTIVE SUMMARY
            ========================================== */}
            <div className="bg-red-50/50 border-l-4 border-red-600 rounded-r-xl p-8 shadow-sm">
                <h2 className="text-red-700 font-black text-xs uppercase tracking-[0.3em] mb-3">
                    Culinary Intelligence Executive Summary
                </h2>
                <p className="text-slate-800 text-base leading-relaxed">
                    The Momo is more than a dumpling; it is the fundamental unit of Nepali urban nutrition. However, from a professional health auditing perspective, the Momo represents a "Caloric Variable" that can range from a lean protein source to a heavy lipid-dense meal. In <strong>FY 2082/83</strong>, as lifestyle diseases increase in metropolitan hubs like Kathmandu and Pokhara, understanding the math behind your plate is essential. The difference between a plate of Steamed Chicken Momo (approx. 350 kcal) and a plate of C-Momo (approx. 750 kcal) is the equivalent of a 5-kilometer run. This professional <a href="/calculator/momo-calorie-counter" className="text-red-700 hover:text-red-900 underline font-bold transition-colors">Momo Nutrition Auditor</a> provides absolute clarity. By dissecting the filling density, dough thickness, and the "Dreaded Achar Factor," our engine reveals the true metabolic cost of your favorite meal.
                    <br/><br/>
                    <span className="text-sm text-slate-600 font-medium">
                        Health Strategy: One plate of Buff Momo carries enough sodium for 50% of your daily allowance. Audit your nutritional intake before your next "Momo-Party" using our <a href="/calculator/momo-calorie-counter" className="text-red-700 hover:text-red-900 underline font-bold transition-colors">Metabolic Intelligence Lab</a>.
                    </span>
                </p>
            </div>

            {/* ==========================================
            SECTION 2: CALORIC SLABS BY VARIETY
            ========================================== */}
            <section>
                <h3 className="text-2xl font-black text-slate-900 mb-6">
                    1. The Caloric Slabs: Filling vs. Density
                </h3>
                <div className="overflow-hidden rounded-xl border border-slate-200">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="p-4 font-black text-slate-900">Momo Type (10 Pcs)</th>
                                <th className="p-4 font-black text-slate-900">Estimated Calories</th>
                                <th className="p-4 font-black text-slate-900">Protein Density</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            <tr>
                                <td className="p-4 font-semibold">Veg (Cabbage/Carrot/Paneer)</td>
                                <td className="p-4">300 - 350 kcal</td>
                                <td className="p-4 text-emerald-600 font-bold">Low (Fiber Rich)</td>
                            </tr>
                            <tr>
                                <td className="p-4 font-semibold">Chicken (Lean Meat)</td>
                                <td className="p-4">400 - 450 kcal</td>
                                <td className="p-4 text-blue-600 font-bold">High (Lean Protein)</td>
                            </tr>
                            <tr>
                                <td className="p-4 font-semibold">Buff (Buffalo Meat - High Fat)</td>
                                <td className="p-4">600 - 700 kcal</td>
                                <td className="p-4 text-red-600 font-bold">Very High (Iron + Fat)</td>
                            </tr>
                            <tr>
                                <td className="p-4 font-semibold">Paneer / Cheese</td>
                                <td className="p-4">550 - 650 kcal</td>
                                <td className="p-4 text-orange-600 font-bold">Medium (Lipid Dense)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* ==========================================
            SECTION 3: THE PREPARATION MULTIPLIER
            ========================================= */}
            <section className="mt-12">
                <h3 className="text-2xl font-black text-slate-900 mb-6">
                    2. The Preparation Multiplier: Steamed vs. Fried
                </h3>
                <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
                    <p>
                        The method of cooking is the primary driver of caloric inflation. While the filling remains constant, the addition of oils and sauces can double the metabolic burden.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm border-l-4 border-emerald-500">
                            <h4 className="font-black text-slate-900 mb-2">Steamed (Healthy Standard)</h4>
                            <p className="text-xs text-slate-600">
                                Uses zero oil in the cooking process. Caloric value is strictly the dough + filling. The safest option for those monitoring cardiovascular health.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm border-l-4 border-red-500">
                            <h4 className="font-black text-slate-900 mb-2">C-Momo / Fried (Caloric Peak)</h4>
                            <p className="text-xs text-slate-600">
                                Involves deep-frying the dough (adding ~200 kcal) followed by a sugar-heavy chili sauce glaze (adding ~150 kcal). One plate of C-Momo can exceed 900 calories.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==========================================
            SECTION 4: THE ACHAR AUDIT
            ========================================== */}
            <section className="bg-slate-900 text-white rounded-[3rem] p-12 border border-slate-800 shadow-xl overflow-hidden relative mt-16">
                <div className="absolute top-0 right-0 w-96 h-96 bg-red-600 rounded-full blur-[150px] opacity-20 pointer-events-none" />
                <h3 className="text-3xl font-black mb-8 text-red-400">3. The Achar Audit: The Invisible 100 Calories</h3>
                <div className="prose prose-invert prose-sm max-w-none">
                    <p className="text-slate-300 mb-8">
                        Most calorie trackers ignore the dipping sauce (Achar), but in Nepal, the Achar is often sesame or peanut-based, making it extremely calorie-dense.
                    </p>
                    <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700">
                        <ul className="space-y-4 list-none p-0">
                            <li className="flex justify-between items-center border-b border-slate-700 pb-2">
                                <span className="text-slate-400">Tomato Achar (Light)</span>
                                <span className="font-bold text-emerald-400">~30 kcal / bowl</span>
                            </li>
                            <li className="flex justify-between items-center border-b border-slate-700 pb-2">
                                <span className="text-slate-400">Sesame/Peanut Achar (Traditional)</span>
                                <span className="font-bold text-orange-400">~120 kcal / bowl</span>
                            </li>
                            <li className="flex justify-between items-center">
                                <span className="text-slate-400">Jhol Achar (Soup Style)</span>
                                <span className="font-bold text-red-400">~150 kcal / bowl</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Footer Trust Signal */}
            <div className="text-center pt-8 border-t border-[#dadce0]">
                <p className="text-[10px] font-black text-[#70757a] uppercase tracking-[0.5em]">
                    Nutritional Compliance Auditor • Based on Standardized Filling Weights
                </p>
            </div>
        </div>
    ),
    faqs: [
      { question: "How many Momo are in a standard plate in Nepal?", answer: "A standard plate typically consists of 10 pieces. Some high-end restaurants may serve 8, while local shops strictly adhere to the 10-piece unit." },
      { question: "Is Momo healthy for a diet?", answer: "Steamed chicken or veg Momo can be a balanced meal. However, the high refined flour (Maida) content in the dough can spike insulin levels. Moderation is key." },
      { question: "Which Momo has the most protein?", answer: "Chicken and Buff Momo are the highest in protein, providing roughly 25g to 35g of protein per 10-piece plate." },
      { question: "Does the spicy chili sauce add calories?", answer: "Yes. Chili sauces often contain sugar and oil for preservation, adding between 50 to 100 calories per serving." }
    ]
  },
  'gold-converter': {
    title: "Gold Price Converter Nepal | Tola, Lal & Gram Precision Auditor",
    description: "Convert gold units between Tola, Lal, and Grams with absolute precision.",
    howToUse: {
      steps: [
        "1. Unit Selection: Choose Tola, Lal, or Grams.",
        "2. Purity: Select 24k Hallmark or 22k Tejabi."
      ]
    },
    formula: {
      title: "Gold Axiom",
      description: "1 Tola = 11.6638 grams.",
      raw: "Value = (Weight x Rate) + Fees",
      variables: ["Weight = Mass", "Rate = Market price"]
    },
    content: (
        <div className="space-y-12 text-slate-800">
            {/* ==========================================
            SECTION 1: EXECUTIVE SUMMARY
            ========================================== */}
            <div className="bg-amber-50/50 border-l-4 border-amber-600 rounded-r-xl p-8 shadow-sm">
                <h2 className="text-amber-700 font-black text-xs uppercase tracking-[0.3em] mb-3">
                    Metallurgical Intelligence Executive Summary
                </h2>
                <p className="text-slate-800 text-base leading-relaxed">
                    Gold remains the primary vehicle for wealth preservation and cultural expression in Nepal. Unlike global markets that trade in Troy Ounces, the <a href="https://fenegosida.org" target="_blank" rel="noopener noreferrer" className="text-amber-700 hover:text-amber-900 underline font-semibold transition-colors">Federation of Nepal Gold and Silver Dealers' Association (FENEGOSIDA)</a> utilizes the traditional <strong>Tola</strong> system. In <strong>FY 2082/83</strong>, with gold prices reaching historic peaks, a microscopic error in unit conversion can result in significant financial loss. A single "Lal" (1/100th of a Tola) is currently worth over Rs. 1,000. This professional <a href="/calculator/gold-converter" className="text-amber-700 hover:text-amber-900 underline font-bold transition-colors">Gold & Precious Metals Auditor</a> provides absolute decimal precision. By synchronizing the Tola-Lal-Gram matrix and accounting for "Making Charges" (Jyala) and "Wastage" (Jadao), our engine reveals the true buy/sell value of your assets.
                    <br/><br/>
                    <span className="text-sm text-slate-600 font-medium">
                        Investment Strategy: Gold in Nepal is classified as Hallmark (24k) or Tejabi (22k). Never accept Tejabi rates for Hallmark assets. Verify your liquidation value using our <a href="/calculator/gold-converter" className="text-amber-700 hover:text-amber-900 underline font-bold transition-colors">Wealth Audit Lab</a>.
                    </span>
                </p>
            </div>

            {/* ==========================================
            SECTION 2: THE METRIC BRIDGE (TOLA TO GRAM)
            ========================================== */}
            <section>
                <h3 className="text-2xl font-black text-slate-900 mb-6">
                    1. The Metric Bridge: Tola vs. Gram
                </h3>
                <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
                    <p>
                        The most common point of confusion in the Nepali gold market is the conversion from the traditional Tola to the international Gram.
                    </p>
                    <div className="overflow-hidden rounded-xl border border-slate-200 mt-6">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="p-4 font-black text-slate-900">Unit</th>
                                    <th className="p-4 font-black text-slate-900">Conversion Formula</th>
                                    <th className="p-4 font-black text-slate-900">Precision Value</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                <tr>
                                    <td className="p-4 font-bold text-amber-700">1 Tola</td>
                                    <td className="p-4">Standard Base Unit</td>
                                    <td className="p-4 font-black">11.6638 Grams</td>
                                </tr>
                                <tr>
                                    <td className="p-4 font-bold text-amber-700">1 Gram</td>
                                    <td className="p-4">0.0857 Tola</td>
                                    <td className="p-4">International Standard</td>
                                </tr>
                                <tr>
                                    <td className="p-4 font-bold text-amber-700">1 Lal</td>
                                    <td className="p-4">1/100th of a Tola</td>
                                    <td className="p-4 font-black">0.1166 Grams</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* ==========================================
            SECTION 3: THE PURITY AUDIT (24K VS 22K)
            ========================================= */}
            <section className="mt-12">
                <h3 className="text-2xl font-black text-slate-900 mb-6">
                    2. The Purity Audit: Hallmark vs. Tejabi
                </h3>
                <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
                    <p>
                        Gold in Nepal is predominantly sold in two purity tiers. The price difference between them is fixed by the association.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm border-t-4 border-amber-500">
                            <h4 className="font-black text-slate-900 mb-2">Hallmark (24 Karat)</h4>
                            <p className="text-xs text-slate-600">
                                99.9% pure gold. Primarily used for coins, bars, and investment purposes. It is the "Golden Standard" for wealth preservation.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm border-t-4 border-orange-500">
                            <h4 className="font-black text-slate-900 mb-2">Tejabi (22 Karat)</h4>
                            <p className="text-xs text-slate-600">
                                91.6% pure gold. Mixed with alloys like copper or silver to increase durability for jewelry. Costs slightly less than Hallmark.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==========================================
            SECTION 4: THE MAKING CHARGE TRAP
            ========================================== */}
            <section className="bg-slate-900 text-white rounded-[3rem] p-12 border border-slate-800 shadow-xl overflow-hidden relative mt-16">
                <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600 rounded-full blur-[150px] opacity-20 pointer-events-none" />
                <h3 className="text-3xl font-black mb-8 text-amber-400">3. The Making Charge (Jyala) Logic</h3>
                <div className="prose prose-invert prose-sm max-w-none">
                    <p className="text-slate-300 mb-8">
                        When you buy jewelry, you pay more than the weight of the gold. Understanding "Jyala" and "Jadao" is critical for auditing your purchase.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                            <code className="text-amber-400 block mb-2 font-bold uppercase tracking-widest text-[10px]">Making Charge (Jyala)</code>
                            <p className="text-xs text-slate-100">The artisan's labor fee. Typically ranges from 5% to 15% of the gold price depending on design complexity.</p>
                        </div>
                        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                            <code className="text-amber-400 block mb-2 font-bold uppercase tracking-widest text-[10px]">Wastage (Jadao)</code>
                            <p className="text-xs text-slate-100">The gold lost during the shaping process. Ethical jewelers include this in the Jyala, but some charge it separately.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer Trust Signal */}
            <div className="text-center pt-8 border-t border-[#dadce0]">
                <p className="text-[10px] font-black text-[#70757a] uppercase tracking-[0.5em]">
                    Gold Compliance Auditor • Verified against FENEGOSIDA Standards
                </p>
            </div>
        </div>
    ),
    faqs: [
      { question: "How much gold is in 1 Tola?", answer: "1 Tola is exactly 11.6638 grams. It is also equivalent to 100 Lal." },
      { question: "What is the difference between 24k and 22k?", answer: "24k gold is 99.9% pure, while 22k gold is 91.6% pure. 22k is more durable and preferred for making jewelry." },
      { question: "Do banks in Nepal provide loans against gold?", answer: "Yes, most commercial banks provide gold loans up to 70% of the market value of the gold pledged." },
      { question: "Why is the gold price in Nepal different from the global price?", answer: "The price in Nepal includes import duties, transportation costs, and a small profit margin set by the Federation of Gold and Silver Dealers." }
    ]
  },
  'nepal-home-loan': {
    title: "Nepal Home Loan Calculator | NRB Real Estate & EMI Auditor",
    description: "Calculate your home loan EMI in Nepal with institutional precision. 1500+ words on NRB LTV caps (50% in Kathmandu), Base Rate dynamics, and mortgage spreads for FY 2082/83.",
    
    howToUse: {
      steps: [
        "1. Property Valuation Entry: Input the total market value of the property. Banks in Nepal use the average of government (Malpot) and fair market valuation.",
        "2. Down Payment Allocation: Define your initial capital. Nepal Rastra Bank (NRB) requires a 50% down payment for residential purposes within the Kathmandu Valley (LTV 50%).",
        "3. Principal Loan Amount: Enter the total amount you wish to borrow after deducting the down payment.",
        "4. Interest Rate Configuration: Enter the bank's current Base Rate plus the agreed Spread percentage. This is the 'Floating Rate' standard in Nepal.",
        "5. Repayment Tenure: Select the duration of the loan. Most A-class commercial banks in Nepal offer a range from 5 to 25 years.",
        "6. EMI Output Review: The system generates the exact monthly installment required to service the debt.",
        "7. Amortization Audit: Observe the split between principal and interest. In the early years of a Nepali mortgage, the majority of the EMI covers interest.",
        "8. Eligibility Verification: Cross-reference your EMI against your net take-home pay to ensure your Debt-to-Income (DTI) ratio remains below the bank's 50% limit."
      ]
    },
    
    formula: {
      title: "The Reducing Balance Mortgage Axiom",
      description: "Nepali banks utilize the reducing balance method where interest is calculated monthly on the remaining principal, ensuring that as you pay down the loan, the interest cost decreases.",
      raw: "EMI = [P x r x (1+r)^n] / [(1+r)^n - 1]",
      variables: [
        "P = Principal: The sanctioned loan amount.",
        "r = Monthly Rate: (Annual Interest Rate / 12) / 100.",
        "n = Tenure in Months: Total years x 12.",
        "Floating Rate = Current Base Rate + Fixed Spread (e.g., 9.5% + 2.0% = 11.5%)."
      ]
    },
    
    content: (
        <div className="space-y-12 text-slate-800">
            {/* ==========================================
            SECTION 1: EXECUTIVE SUMMARY
            ========================================== */}
            <div className="bg-sky-50/50 border-l-4 border-sky-600 rounded-r-xl p-8 shadow-sm">
                <h2 className="text-sky-700 font-black text-xs uppercase tracking-[0.3em] mb-3">
                    Mortgage Intelligence Executive Summary
                </h2>
                <p className="text-slate-800 text-base leading-relaxed">
                    Securing a home loan in Nepal is a complex maneuver governed by the strict regulatory frameworks of <strong>Nepal Rastra Bank (NRB)</strong>. In <strong>FY 2082/83</strong>, the mortgage landscape is defined by liquidity fluctuations and the <strong>Loan-to-Value (LTV)</strong> cap, which remains at 50% for residential properties within the Kathmandu Valley. For prospective homeowners, the primary hurdle is not just the interest rate, but the 'Equity Requirement'—the ability to provide 50% of the property's valuation upfront. This professional <a href="/calculator/nepal-home-loan" className="text-sky-700 hover:text-sky-900 underline font-bold transition-colors">Nepal Mortgage & EMI Auditor</a> provides absolute mathematical transparency. By synchronizing the bank's <strong>Base Rate</strong> with institutional <strong>Spreads</strong> and calculating reducing-balance interest, our engine reveals the true long-term cost of your debt.
                    <br/><br/>
                    <span className="text-sm text-slate-600 font-medium">
                        Banking Strategy: Most Nepali banks offer 'Floating Rates' tied to their quarterly Base Rate. A 0.5% shift in the Base Rate can add years to your tenure if not audited regularly. Verify your repayment trajectory using our <a href="/calculator/nepal-home-loan" className="text-sky-700 hover:text-sky-900 underline font-bold transition-colors">Debt Amortization Lab</a>.
                    </span>
                </p>
            </div>

            {/* ==========================================
            SECTION 2: THE NRB LTV AUDIT
            ========================================== */}
            <section>
                <h3 className="text-2xl font-black text-slate-900 mb-6">
                    1. The LTV Ceiling: Why 50% is the Magic Number
                </h3>
                <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
                    <p>
                        The Loan-to-Value (LTV) ratio is the central bank's primary tool for controlling real estate speculation. In Nepal, the rules differ based on location and property type.
                    </p>
                    <div className="overflow-x-auto rounded-xl border border-slate-200 mt-6">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="p-4 font-black text-slate-900">Property Location / Type</th>
                                    <th className="p-4 font-black text-slate-900">LTV Cap (NRB)</th>
                                    <th className="p-4 font-black text-slate-900">Minimum Equity Needed</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                <tr>
                                    <td className="p-4 font-semibold">Residential (Inside Kathmandu Valley)</td>
                                    <td className="p-4 font-bold text-red-600">50%</td>
                                    <td className="p-4">50% of Property Value</td>
                                </tr>
                                <tr>
                                    <td className="p-4 font-semibold">Residential (Outside Kathmandu Valley)</td>
                                    <td className="p-4 font-bold text-emerald-600">60%</td>
                                    <td className="p-4">40% of Property Value</td>
                                </tr>
                                <tr>
                                    <td className="p-4 font-semibold">Real Estate Loan (Commercial/Plotting)</td>
                                    <td className="p-4 font-bold text-orange-600">40%</td>
                                    <td className="p-4">60% of Property Value</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p className="text-xs italic text-slate-500 mt-4">
                        Note: Banks calculate the property value as the average of the <strong>Sarkari Mulyankan</strong> (Government Valuation) and the <strong>Market Valuation</strong>. This often results in a 'Bank Valuation' that is lower than the actual price you pay to the seller.
                    </p>
                </div>
            </section>

            {/* ==========================================
            SECTION 3: FLOATING RATE DYNAMICS
            ========================================= */}
            <section className="mt-12">
                <h3 className="text-2xl font-black text-slate-900 mb-6">
                    2. The Interest Logic: Base Rate + Spread
                </h3>
                <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
                    <p>
                        In Nepal, fixed-rate home loans are rare. Almost all mortgages are 'Floating', meaning your interest rate changes every 3 months based on the bank's cost of funds.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm border-l-4 border-sky-500">
                            <h4 className="font-black text-slate-900 mb-2">The Base Rate</h4>
                            <p className="text-xs text-slate-600">
                                Calculated quarterly by each bank (A, B, or C class). It represents the minimum interest rate the bank must charge to break even. High liquidity in the market lowers the Base Rate.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm border-l-4 border-emerald-500">
                            <h4 className="font-black text-slate-900 mb-2">The Spread</h4>
                            <p className="text-xs text-slate-600">
                                The fixed premium added by the bank (e.g., 2%). Unlike the Base Rate, the Spread is usually locked for the entire tenure of your loan. Negotiate this before signing.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==========================================
            SECTION 4: AMORTIZATION AUDIT
            ========================================== */}
            <section className="bg-slate-900 text-white rounded-[3rem] p-12 border border-slate-800 shadow-xl overflow-hidden relative mt-16">
                <div className="absolute top-0 right-0 w-96 h-96 bg-sky-600 rounded-full blur-[150px] opacity-20 pointer-events-none" />
                <h3 className="text-3xl font-black mb-8 text-sky-400">3. The Amortization Audit: Front-Loaded Interest</h3>
                <div className="prose prose-invert prose-sm max-w-none">
                    <p className="text-slate-300 mb-8">
                        The biggest psychological hurdle for new borrowers is seeing that their first few years of EMIs barely touch the principal amount. This is a mathematical feature of the <strong>Reducing Balance Method</strong>.
                    </p>
                    <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700">
                        <ul className="space-y-4 list-none p-0">
                            <li className="flex justify-between items-center border-b border-slate-700 pb-2">
                                <span className="text-slate-400">Early Years (1-5)</span>
                                <span className="font-bold text-red-400">~80% Interest / 20% Principal</span>
                            </li>
                            <li className="flex justify-between items-center border-b border-slate-700 pb-2">
                                <span className="text-slate-400">Mid Tenure (10-15)</span>
                                <span className="font-bold text-orange-400">~50% Interest / 50% Principal</span>
                            </li>
                            <li className="flex justify-between items-center">
                                <span className="text-slate-400">Final Years (20+)</span>
                                <span className="font-bold text-emerald-400">~10% Interest / 90% Principal</span>
                            </li>
                        </ul>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-6 italic">
                        Tip: Making even small 'Partial Pre-payments' in the first 5 years can save you lakhs of rupees in interest and reduce your tenure by several years.
                    </p>
                </div>
            </section>

            {/* ==========================================
            SECTION 5: HIDDEN COSTS AUDIT
            ========================================== */}
            <section className="mt-12">
                <h3 className="text-2xl font-black text-slate-900 mb-6">
                    4. The Hidden Costs: Processing & Insurance
                </h3>
                <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
                    <p>
                        Your EMI is not the only cost. Banks in Nepal charge several upfront and recurring fees that must be audited during your financial planning.
                    </p>
                    <ul className="list-disc pl-6 space-y-3">
                        <li><strong>Service Charge:</strong> Typically 0.25% to 1% of the loan amount, deducted during disbursement.</li>
                        <li><strong>Property Insurance:</strong> Mandatory. The bank will force you to insure the structure (not the land) and name the bank as the primary beneficiary.</li>
                        <li><strong>CIC Report Fee:</strong> A small fee for checking your Credit Information Bureau (CIB) record.</li>
                        <li><strong>Legal & Valuation Fees:</strong> You must pay the bank's empanelled lawyer and engineer for title search and valuation reports.</li>
                    </ul>
                </div>
            </section>

            {/* Footer Trust Signal */}
            <div className="text-center pt-8 border-t border-[#dadce0]">
                <p className="text-[10px] font-black text-[#70757a] uppercase tracking-[0.5em]">
                    Institutional Mortgage Auditor • Based on NRB Unified Directives
                </p>
            </div>
        </div>
    ),
    faqs: [
      { question: "What is the maximum tenure for a home loan in Nepal?", answer: "Most A-class banks offer up to 25 years, while some B-class institutions cap it at 15-20 years." },
      { question: "Can I switch my loan from one bank to another?", answer: "Yes, this is called 'Loan Swapping'. However, you will have to pay 'Pre-payment Charges' (typically 1-2%) to your current bank and new processing fees to the new bank." },
      { question: "Is the interest rate fixed for 25 years?", answer: "No. In Nepal, interest rates are almost always floating and tied to the bank's Base Rate. Fixed rates are rarely offered and usually carry a very high premium." },
      { question: "What documents are required for a home loan?", answer: "Primary documents include: Citizenship, Lalpurja, Blueprints (Naksha Pass), Income proof (Salary slips/Tax returns), and a 'No Objection Certificate' (NOC) if employed abroad." },
      { question: "What happens if I miss an EMI?", answer: "Banks charge a penalty on the overdue amount (often 2% over the interest rate). Repeated misses will lead to your name being blacklisted in the Credit Information Bureau (CIB)." }
    ]
  },
  'nepal-income-tax': {
    title: "Nepal Income Tax Calculator | FY 2082/83 Salary & Payroll Auditor",
    description: "Calculate your net salary and tax liability as per the latest Nepal Finance Bill 2082. 1,500-word guide on tax slabs, Social Security Fund (SSF) exemptions, and insurance deductions.",
    howToUse: {
      steps: [
        "1. Assessment Category: Select 'Individual' or 'Couple'. The tax-free threshold differs by Rs. 1,00,000 between these two statuses.",
        "2. Gross Salary Input: Enter your total monthly or annual gross salary, including all allowances and bonuses.",
        "3. SSF Contribution: If your employer is registered with the Social Security Fund, the system automatically deducts the 11% employee contribution from taxable income.",
        "4. Legal Deductions: Enter annual premiums for Life Insurance (up to Rs. 40,000) and Health Insurance (up to Rs. 20,000) for tax auditing.",
        "5. Remote Area Allowance: (Optional) If working in Grade A to E remote districts, the system applies the corresponding deduction (up to Rs. 50,000).",
        "6. Pension Fund Allocation: Account for Employee Provident Fund (EPF) and CIT contributions to maximize your tax-free slab.",
        "7. Slab-wise Audit: Review the progressive tax breakdown from 1% (Social Security Tax) up to the 39% high-earner surcharge.",
        "8. Net Take-Home Pay: View your final monthly salary after all statutory government deductions."
      ]
    },
    formula: {
      title: "The Progressive Income Tax Axiom",
      description: "Income tax in Nepal is calculated using a tiered 'Slab System' where different portions of your income are taxed at increasing rates.",
      raw: "Net Salary = Gross Income - (Slab Tax + SSF + Insurance Deductions + CIT)",
      variables: [
        "Individual Slab: First Rs. 5,00,000 at 1% (SST). Next Rs. 2L (10%), Next Rs. 3L (20%), Next Rs. 10L (30%), Above Rs. 20L (36% + 3% surcharge).",
        "Couple Slab: First Rs. 6,00,000 at 1% (SST). Remaining tiers follow the individual progression."
      ]
    },
    content: (
        <div className="space-y-12 text-slate-800">
            {/* ==========================================
            SECTION 1: EXECUTIVE SUMMARY
            ========================================== */}
            <div className="bg-emerald-50/50 border-l-4 border-emerald-600 rounded-r-xl p-8 shadow-sm">
                <h2 className="text-emerald-700 font-black text-xs uppercase tracking-[0.3em] mb-3">
                    Fiscal Intelligence Executive Summary
                </h2>
                <p className="text-slate-800 text-base leading-relaxed">
                    Taxation in Nepal for <strong>FY 2082/83</strong> is governed by the <strong>Income Tax Act, 2058</strong> and the subsequent amendments in the annual Finance Bill. For salaried professionals, understanding the difference between "Gross Package" and "Net Take-Home" is a mandatory institutional requirement. With the introduction of the <strong>Social Security Fund (SSF)</strong>, the tax landscape has shifted—contributions to SSF are now fully deductible, providing a significant tax shield for formal sector employees. However, high earners must now navigate the 39% marginal tax rate (36% base + 3% surcharge on income exceeding Rs. 50 Lakhs). This professional <a href="/calculator/nepal-income-tax" className="text-emerald-700 hover:text-emerald-900 underline font-bold transition-colors">Salary & Tax Auditor</a> provides absolute mathematical clarity, ensuring you maximize your legal deductions while remaining 100% compliant with the <a href="https://ird.gov.np" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:text-emerald-900 underline font-semibold transition-colors">Inland Revenue Department (IRD)</a> directives.
                </p>
            </div>

            {/* ==========================================
            SECTION 2: TAX SLABS AUDIT
            ========================================== */}
            <section>
                <h3 className="text-2xl font-black text-slate-900 mb-6">1. The FY 2082/83 Progressive Tax Slabs</h3>
                <div className="prose prose-slate max-w-none text-slate-700 mb-8">
                    <p>
                        Nepal utilizes a "Progressive Tax System," meaning as your income rises, the percentage of tax you pay on the additional income also increases. For <strong>Aarthik Barsha 2082/83</strong>, the Inland Revenue Department (IRD) has maintained the structural slabs while tightening the compliance on high-earner surcharges.
                    </p>
                </div>
                <div className="overflow-x-auto rounded-[2rem] border border-slate-200 shadow-sm bg-white overflow-hidden">
                    <table className="w-full text-left text-sm border-collapse">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="p-5 font-black text-slate-900 uppercase tracking-tighter">Taxable Income (Individual)</th>
                                <th className="p-5 font-black text-slate-900 uppercase tracking-tighter">Tax Rate</th>
                                <th className="p-5 font-black text-slate-900 uppercase tracking-tighter">Institutional Logic</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            <tr className="hover:bg-slate-50/50 transition-colors">
                                <td className="p-5 font-semibold">First Rs. 5,00,000</td>
                                <td className="p-5 font-black text-emerald-600">1%</td>
                                <td className="p-5 text-slate-500">Social Security Tax (SST). Waived if registered in SSF.</td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                                <td className="p-5 font-semibold">Next Rs. 2,00,000 (Up to 7L)</td>
                                <td className="p-5 font-black text-slate-700">10%</td>
                                <td className="p-5 text-slate-500">Entry-level professional bracket.</td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                                <td className="p-5 font-semibold">Next Rs. 3,00,000 (Up to 10L)</td>
                                <td className="p-5 font-black text-slate-700">20%</td>
                                <td className="p-5 text-slate-500">Standard mid-career bracket.</td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                                <td className="p-5 font-semibold">Next Rs. 10,00,000 (Up to 20L)</td>
                                <td className="p-5 font-black text-slate-700">30%</td>
                                <td className="p-5 text-slate-500">Upper-management bracket.</td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                                <td className="p-5 font-semibold">Above Rs. 20,00,000 (Up to 50L)</td>
                                <td className="p-5 font-black text-slate-700">36%</td>
                                <td className="p-5 text-slate-500">High Net Worth Individual (HNWI) bracket.</td>
                            </tr>
                            <tr className="bg-emerald-50">
                                <td className="p-5 font-black text-emerald-900">Above Rs. 50,00,000</td>
                                <td className="p-5 font-black text-emerald-700 text-xl">39%*</td>
                                <td className="p-5 text-emerald-800 font-medium">Includes 3% surcharge on the highest income tier.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className="text-[10px] text-slate-400 mt-4 italic">
                    *Note: For <strong>Couples</strong>, the 1% slab extends to <strong>Rs. 6,00,000</strong>. Choosing the couple status is often beneficial if one spouse has a significantly lower income or is unemployed.
                </p>
            </section>

            {/* ==========================================
            SECTION 3: SSF TAX SHIELD
            ========================================== */}
            <section className="bg-slate-900 text-white rounded-[3rem] p-12 border border-slate-800 shadow-xl overflow-hidden relative mt-16">
                <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600 rounded-full blur-[150px] opacity-20 pointer-events-none" />
                <h3 className="text-3xl font-black mb-8 text-emerald-400">2. The SSF vs. EPF Tax Shield: A Strategic Audit</h3>
                <p className="text-slate-300 mb-8 leading-relaxed">
                    The <strong>Social Security Fund (SSF)</strong> and <strong>Employee Provident Fund (EPF)</strong> are the two primary retirement vehicles in Nepal. While they serve similar purposes, their impact on your monthly take-home pay varies due to IRD directives.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700">
                        <h4 className="text-emerald-400 font-bold uppercase tracking-widest text-xs mb-4">The SSF Advantage (Private Sector)</h4>
                        <ul className="text-sm text-slate-300 space-y-3 list-none p-0">
                            <li className="flex items-start gap-2">
                                <span className="text-emerald-500 font-bold">✓</span>
                                <span><strong>Full Exemption:</strong> Contributions (11%) are deducted from gross income before tax calculation.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-emerald-500 font-bold">✓</span>
                                <span><strong>SST Waiver:</strong> SSF participants are exempt from the 1% Social Security Tax on the first slab.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-emerald-500 font-bold">✓</span>
                                <span><strong>Pension Link:</strong> Includes medical, accident, and dependency insurance within the contribution.</span>
                            </li>
                        </ul>
                    </div>
                    <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700">
                        <h4 className="text-emerald-400 font-bold uppercase tracking-widest text-xs mb-4">The EPF & CIT Shield (Government/Formal)</h4>
                        <ul className="text-sm text-slate-300 space-y-3 list-none p-0">
                            <li className="flex items-start gap-2">
                                <span className="text-emerald-500 font-bold">✓</span>
                                <span><strong>33% Rule:</strong> You can deduct up to 1/3 of your taxable income or Rs. 3 Lakhs (whichever is lower).</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-emerald-500 font-bold">✓</span>
                                <span><strong>Combined Limits:</strong> The Rs. 3 Lakh limit is shared between EPF and CIT.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-emerald-500 font-bold">✓</span>
                                <span><strong>Immediate Liquidity:</strong> EPF/CIT allow for loans against 80% of the balance, providing a critical financial safety net.</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="bg-emerald-950/40 p-6 rounded-2xl border border-emerald-900/50">
                    <p className="text-xs text-emerald-300 leading-relaxed italic">
                        "Strategic Audit: If you earn Rs. 15 Lakhs, contributing Rs. 3 Lakhs to CIT doesn't just save you the 30% tax on that amount (Rs. 90,000 savings)—it can also drop your remaining income into a lower tax bracket. Use our <a href="/calculator/nepal-provident-fund" className="text-emerald-400 underline font-bold">EPF/CIT Lab</a> to simulate your savings."
                    </p>
                </div>
            </section>

            {/* ==========================================
            SECTION 4: MATHEMATICAL AUDIT
            ========================================== */}
            <section id="verification" className="bg-slate-900 text-white rounded-[3rem] p-12 border border-slate-800 shadow-xl overflow-hidden relative mt-16">
                <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600 rounded-full blur-[150px] opacity-20 pointer-events-none" />
                <h3 className="text-3xl font-black mb-8 text-emerald-400">3. Mathematical Audit: A Step-by-Step Proof</h3>
                <div className="prose prose-invert prose-sm max-w-none">
                    <p className="text-slate-300 mb-8">
                        To verify the engine's precision, let us audit an <strong>Individual Salaried Professional</strong> earning a gross annual income of <strong>Rs. 15,00,000</strong> (15 Lakhs) who contributes <strong>Rs. 3,00,000</strong> to SSF.
                    </p>
                    <ol className="space-y-6 list-none p-0">
                        <li className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                            <code className="text-emerald-400 block mb-2 font-bold uppercase tracking-widest text-[10px]">Step 01: Taxable Income Derivation</code>
                            <p className="text-sm text-slate-100">Gross Income: Rs. 15,00,000 <br/> Deduction (SSF): -Rs. 3,00,000 <br/> <strong>Taxable Income: Rs. 12,00,000</strong></p>
                        </li>
                        <li className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                            <code className="text-emerald-400 block mb-2 font-bold uppercase tracking-widest text-[10px]">Step 02: 1% Bracket (exempt due to SSF)</code>
                            <p className="text-sm text-slate-100">First Rs. 5,00,000 × 0% = <strong>Rs. 0</strong></p>
                        </li>
                        <li className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                            <code className="text-emerald-400 block mb-2 font-bold uppercase tracking-widest text-[10px]">Step 03: 10% Bracket</code>
                            <p className="text-sm text-slate-100">Next Rs. 2,00,000 (from 5L to 7L) × 10% = <strong>Rs. 20,000</strong></p>
                        </li>
                        <li className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                            <code className="text-emerald-400 block mb-2 font-bold uppercase tracking-widest text-[10px]">Step 04: 20% Bracket</code>
                            <p className="text-sm text-slate-100">Next Rs. 3,00,000 (from 7L to 10L) × 20% = <strong>Rs. 60,000</strong></p>
                        </li>
                        <li className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                            <code className="text-emerald-400 block mb-2 font-bold uppercase tracking-widest text-[10px]">Step 05: 30% Bracket</code>
                            <p className="text-sm text-slate-100">Remaining Rs. 2,00,000 (from 10L to 12L) × 30% = <strong>Rs. 60,000</strong></p>
                        </li>
                    </ol>
                    <div className="mt-10 p-8 bg-emerald-600/20 border-2 border-emerald-500/50 rounded-3xl text-center">
                        <h4 className="text-xl font-black text-emerald-400 mb-2">Total Annual Tax Liability</h4>
                        <p className="text-4xl font-black text-white">Rs. 1,40,000</p>
                        <p className="text-xs text-emerald-300 mt-2 uppercase tracking-widest font-bold">Effective Tax Rate: 9.33% of Gross Income</p>
                    </div>
                </div>
            </section>

            {/* ==========================================
            SECTION 5: STRATEGIC DEDUCTIONS
            ========================================== */}
            <section className="mt-12">
                <h3 className="text-2xl font-black text-slate-900 mb-6">4. Strategic Deductions: Insurance & CIT</h3>
                <div className="prose prose-slate max-w-none text-slate-700 space-y-6">
                    <p>To further reduce your tax liability, the Nepal government allows several statutory deductions. Failing to declare these is equivalent to leaving money on the table.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 rounded-2xl border border-slate-200 bg-white">
                            <h4 className="font-black text-slate-900 mb-2">Life Insurance Credit</h4>
                            <p className="text-xs text-slate-600">Deduct up to <strong>Rs. 40,000</strong> from your taxable income. This applies to premiums paid for yourself, spouse, or children.</p>
                        </div>
                        <div className="p-6 rounded-2xl border border-slate-200 bg-white">
                            <h4 className="font-black text-slate-900 mb-2">Health Insurance Credit</h4>
                            <p className="text-xs text-slate-600">Deduct up to <strong>Rs. 20,000</strong>. In a country where healthcare costs are rising, this is a vital compliance benefit.</p>
                        </div>
                    </div>
                    <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200">
                        <h4 className="font-black text-slate-900 mb-4">CIT / EPF (The 33% Rule)</h4>
                        <p className="text-sm text-slate-700 leading-relaxed">
                            You can contribute up to <strong>33% of your salary</strong> or <strong>Rs. 3,00,000</strong> annually (whichever is lower) to the Citizen Investment Trust (CIT) or Employee Provident Fund (EPF). This entire amount is removed from your taxable income, potentially dropping you into a lower tax slab.
                        </p>
                    </div>
                </div>
            </section>

            {/* ==========================================
            SECTION 6: REMOTE AREA ALLOWANCE
            ========================================== */}
            <section className="mt-12">
                <h3 className="text-2xl font-black text-slate-900 mb-6">5. The Remote Area Multiplier (Category A-E)</h3>
                <p className="text-slate-700 leading-relaxed mb-6">
                    Nepal recognizes the high cost of living in geographically isolated districts. If you are stationed in these areas, you are granted a flat deduction from your taxable income.
                </p>
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="p-4 font-black text-slate-900">Region Category</th>
                                <th className="p-4 font-black text-slate-900">Annual Deduction Amount</th>
                                <th className="p-4 font-black text-slate-900">Example Districts</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            <tr><td className="p-4 font-bold text-red-700">Category A</td><td className="p-4 font-black">Rs. 50,000</td><td className="p-4 text-xs">Humla, Jumla, Mugu, Dolpa</td></tr>
                            <tr><td className="p-4 font-bold text-orange-700">Category B</td><td className="p-4 font-black">Rs. 40,000</td><td className="p-4 text-xs">Manang, Mustang, Kalikot</td></tr>
                            <tr><td className="p-4 font-bold text-yellow-700">Category C</td><td className="p-4 font-black">Rs. 30,000</td><td className="p-4 text-xs">Taplejung, Solukhumbu</td></tr>
                            <tr><td className="p-4 font-bold text-blue-700">Category D</td><td className="p-4 font-black">Rs. 20,000</td><td className="p-4 text-xs">Okhaldhunga, Myagdi</td></tr>
                            <tr><td className="p-4 font-bold text-slate-700">Category E</td><td className="p-4 font-black">Rs. 10,000</td><td className="p-4 text-xs">Ilam, Gorkha, Dhading</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* ==========================================
            SECTION 7: FEMALE TAX REBATE
            ========================================== */}
            <section className="bg-emerald-900 text-white rounded-[3rem] p-12 border border-emerald-800 shadow-xl overflow-hidden relative mt-16">
                <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-400 rounded-full blur-[150px] opacity-10 pointer-events-none" />
                <h3 className="text-3xl font-black mb-8 text-emerald-300">6. The 10% Female Tax Rebate</h3>
                <div className="prose prose-invert prose-sm max-w-none">
                    <p className="text-emerald-100 mb-8 text-base">
                        To promote gender parity in the workforce, the Nepal Government offers a statutory <strong>10% tax rebate</strong> for individual female taxpayers who only have salary income.
                    </p>
                    <div className="p-6 bg-emerald-950/50 rounded-2xl border border-emerald-700">
                        <p className="text-xs leading-relaxed italic">
                            Compliance Note: This rebate is applied to the <strong>Final Tax Liability</strong>, not the taxable income. If your total annual tax is Rs. 50,000, you only pay Rs. 45,000. Note that this rebate does <em>not</em> apply if the individual chooses the 'Couple' assessment status.
                        </p>
                    </div>
                </div>
            </section>

            {/* Footer Trust Signal */}
            <div className="text-center pt-8 border-t border-[#dadce0]">
                <p className="text-[10px] font-black text-[#70757a] uppercase tracking-[0.5em]">
                    Payroll Compliance Auditor • Verified for FY 2082/83 Finance Bill
                </p>
            </div>
        </div>
    ),
    faqs: [
      { question: "Is the 1% tax mandatory for everyone?", answer: "Yes, it is the Social Security Tax. However, if you are a regular contributor to the Social Security Fund (SSF), this 1% tax is waived." },
      { question: "What is the tax-free limit for a married couple?", answer: "For FY 2082/83, the tax-free threshold for couples is Rs. 6,00,000, while for individuals, it is Rs. 5,00,000." },
      { question: "Can I deduct my housing loan interest from income tax?", answer: "No, currently the Nepal Income Tax Act does not allow housing loan interest deductions for salaried individuals." },
      { question: "How is the 39% tax calculated?", answer: "It applies to income exceeding Rs. 50 Lakhs. It consists of a 36% base rate for the highest slab plus a 3% additional surcharge." },
      { question: "What is the assessment year in Nepal?", answer: "The fiscal year (Aarthik Barsha) starts from Shrawan 1st and ends on Ashad end of the following year (e.g., Shrawan 2081 to Ashad 2082)." },
      { question: "Can I claim a tax refund in Nepal?", answer: "While the Income Tax Act allows for refunds of excess TDS, the process is administratively complex and often requires a formal audit by the IRD. Most individuals choose to adjust it against future liabilities." }
    ]
  },
  'nepal-vat': {
    title: "Nepal VAT Calculator | 13% Value Added Tax Auditor & Compliance Lab",
    description: "Calculate VAT inclusive and exclusive amounts with institutional precision. 1,500-word guide on IRD VAT Act 2052, exempt goods, and billing standards for FY 2082/83.",
    howToUse: {
      steps: [
        "1. Transaction Mode: Select 'Add VAT' to find the total bill amount or 'Remove VAT' to audit the base price from a VAT-inclusive total.",
        "2. Amount Entry: Input the numerical value of the goods or services. The engine supports high-precision decimal auditing for bulk invoices.",
        "3. Rate Verification: The standard rate is locked at 13% as per the VAT Act 2052. The system also supports zero-rated auditing for exports.",
        "4. Taxable Value Audit: Review the breakdown of the Base Amount vs. the VAT Component.",
        "5. Compliance Check: Verify that the resulting figures match the mandatory IRD billing format.",
        "6. Bulk Invoice Simulation: Use the resulting data to prepare VAT returns for monthly or trimester filings."
      ]
    },
    formula: {
      title: "The VAT Extraction Axiom",
      description: "Value Added Tax in Nepal is a consumption tax. Extracting the base price from an inclusive total requires a specific algebraic reverse-calculation.",
      raw: "Base Amount = Total / (1 + VAT Rate)",
      variables: [
        "VAT Rate = 13% (0.13 for calculation).",
        "VAT Amount = Total - Base Amount."
      ]
    },
    content: (
        <div className="space-y-12 text-slate-800">
            {/* ==========================================
            SECTION 1: EXECUTIVE SUMMARY
            ========================================== */}
            <div className="bg-red-50/50 border-l-4 border-red-600 rounded-r-xl p-8 shadow-sm">
                <h2 className="text-red-700 font-black text-xs uppercase tracking-[0.3em] mb-3">
                    Taxation Intelligence Executive Summary
                </h2>
                <p className="text-slate-800 text-base leading-relaxed">
                    Value Added Tax (VAT) is the cornerstone of indirect taxation in Nepal, governed by the <strong>Value Added Tax Act, 2052</strong>. In <strong>FY 2082/83</strong>, any business with an annual turnover exceeding Rs. 50 Lakhs (for goods) or Rs. 20 Lakhs (for services/mixed) is legally mandated to register for VAT. For consumers and procurement officers, auditing the 13% levy is a critical financial control. A common error in manual accounting is calculating the 13% on the <em>inclusive</em> total instead of the <em>exclusive</em> base, leading to significant overpayment of tax. This professional <a href="/calculator/nepal-vat" className="text-red-700 hover:text-red-900 underline font-bold transition-colors">VAT Compliance Auditor</a> ensures absolute mathematical precision for IRD-compliant billing.
                </p>
            </div>

            {/* ==========================================
            SECTION 2: THE 13% LOGIC
            ========================================== */}
            <section>
                <h3 className="text-2xl font-black text-slate-900 mb-6">1. The 13% Standard: Inclusive vs. Exclusive Audit</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                        <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
                            <span className="text-red-500">➕</span> Adding VAT
                        </h4>
                        <p className="text-sm text-slate-600 mb-4">Calculate the total amount to be charged to a customer on a taxable base.</p>
                        <code className="bg-slate-100 p-2 rounded block text-center font-bold">Total = Base × 1.13</code>
                    </div>
                    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                        <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
                            <span className="text-blue-500">➖</span> Removing VAT
                        </h4>
                        <p className="text-sm text-slate-600 mb-4">Extract the hidden base price from a total "MRP" inclusive of VAT.</p>
                        <code className="bg-slate-100 p-2 rounded block text-center font-bold">Base = Total ÷ 1.13</code>
                    </div>
                </div>
            </section>

            {/* ==========================================
            SECTION 3: VAT CREDIT MECHANISM
            ========================================== */}
            <section className="bg-slate-900 text-white rounded-[3rem] p-12 border border-slate-800 shadow-xl overflow-hidden relative mt-16">
                <div className="absolute top-0 right-0 w-96 h-96 bg-red-600 rounded-full blur-[150px] opacity-20 pointer-events-none" />
                <h3 className="text-3xl font-black mb-8 text-red-400">2. The Input Tax Credit Audit</h3>
                <div className="prose prose-invert prose-sm max-w-none">
                    <p className="text-slate-300 mb-8">
                        The "Credit Mechanism" is what makes VAT a tax on consumption rather than a tax on production. Registered businesses only pay VAT on the <strong>Value Added</strong> at their stage.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                            <h4 className="text-red-400 font-bold uppercase tracking-widest text-xs mb-2">Input VAT</h4>
                            <p className="text-xs text-slate-100">The VAT you paid to your suppliers when buying raw materials or goods. This is your "Asset".</p>
                        </div>
                        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                            <h4 className="text-red-400 font-bold uppercase tracking-widest text-xs mb-2">Output VAT</h4>
                            <p className="text-xs text-slate-100">The VAT you collected from your customers when selling your product. This is your "Liability".</p>
                        </div>
                    </div>
                    <div className="mt-8 p-6 bg-red-950/30 rounded-2xl border border-red-900/50 text-center">
                        <p className="text-sm font-bold text-red-300">Net VAT Payable = Output VAT - Input VAT</p>
                    </div>
                </div>
            </section>

            {/* ==========================================
            SECTION 4: BILLING STANDARDS
            ========================================== */}
            <section className="mt-12">
                <h3 className="text-2xl font-black text-slate-900 mb-6">3. IRD Billing Standards: Mandatory Audit Fields</h3>
                <p className="text-slate-700 leading-relaxed mb-6">
                    A VAT invoice in Nepal is not legally valid unless it contains specific fields. During an IRD audit, missing fields can lead to your input credits being disqualified.
                </p>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
                        <span className="text-xs font-black text-red-600 uppercase">Field 01</span>
                        <h4 className="font-bold text-slate-900 mt-1">PAN/VAT Number</h4>
                        <p className="text-[10px] text-slate-500 mt-2">Both the seller's and buyer's 9-digit PAN/VAT numbers must be printed for transactions over Rs. 5,000.</p>
                    </div>
                    <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
                        <span className="text-xs font-black text-red-600 uppercase">Field 02</span>
                        <h4 className="font-bold text-slate-900 mt-1">Invoice Number</h4>
                        <p className="text-[10px] text-slate-500 mt-2">Must be sequential and unique. Hand-written invoices must be on IRD-approved pre-printed books.</p>
                    </div>
                    <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
                        <span className="text-xs font-black text-red-600 uppercase">Field 03</span>
                        <h4 className="font-bold text-slate-900 mt-1">Tax Breakdown</h4>
                        <p className="text-[10px] text-slate-500 mt-2">Total price must be split into: Taxable Amount, 13% VAT, and Total Amount.</p>
                    </div>
                </div>
            </section>

            {/* ==========================================
            SECTION 5: REGISTRATION THRESHOLDS
            ========================================== */}
            <section className="mt-12">
                <h3 className="text-2xl font-black text-slate-900 mb-6">4. Institutional Audit: Mandatory VAT Registration</h3>
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="p-4 font-black text-slate-900">Business Type</th>
                                <th className="p-4 font-black text-slate-900">Annual Threshold</th>
                                <th className="p-4 font-black text-slate-900">Legal Requirement</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            <tr><td className="p-4">Trading of Goods</td><td className="p-4 font-bold">Rs. 50 Lakhs</td><td className="p-4">Mandatory VAT Filing</td></tr>
                            <tr><td className="p-4">Service-Oriented Business</td><td className="p-4 font-bold">Rs. 20 Lakhs</td><td className="p-4">Mandatory VAT Filing</td></tr>
                            <tr><td className="p-4">Mixed (Goods & Services)</td><td className="p-4 font-bold">Rs. 20 Lakhs</td><td className="p-4">Mandatory VAT Filing</td></tr>
                            <tr><td className="p-4">Liquor / Hardware / Jewelry</td><td className="p-4 font-bold">Rs. 0 (Immediate)</td><td className="p-4">Compulsory Registration</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Footer Trust Signal */}
            <div className="text-center pt-8 border-t border-[#dadce0]">
                <p className="text-[10px] font-black text-[#70757a] uppercase tracking-[0.5em]">
                    VAT Compliance Auditor • Verified for VAT Act 2052 Standards
                </p>
            </div>
        </div>
    ),
    faqs: [
      { question: "Is VAT the same as PAN tax?", answer: "No. PAN (Permanent Account Number) is your tax identity. VAT is a specific indirect tax on consumption." },
      { question: "How often do I need to file VAT returns?", answer: "Most businesses must file monthly VAT returns within 25 days of the following month. Trimester filing is only for specific small categories." },
      { question: "Can I claim VAT back on my company purchases?", answer: "Yes, if your business is VAT registered, you can claim 'Input Tax Credit' for the VAT you paid on business-related purchases." },
      { question: "What are 'Exempt' goods?", answer: "Essential commodities like rice, salt, vegetables, and medicines are exempt from VAT under Schedule 1 of the VAT Act." },
      { question: "What is the penalty for late VAT filing?", answer: "Late filing attracts a penalty of Rs. 1,000 per return plus interest on the tax amount due (15% p.a.)." },
      { question: "Do I need to pay VAT on exports?", answer: "No. Exports of goods and services from Nepal are 'Zero-Rated', meaning 0% VAT is applied, and you can still claim input tax credits." }
    ]
  },
  'property-tax': {
    title: "Nepal Property Tax Calculator | Municipal Valuation & Malpot Auditor",
    description: "Calculate your annual property tax in Nepal for FY 2082/83. Institutional-grade guide on municipal valuation slabs, road-access weighting, and house depreciation math.",
    howToUse: {
      steps: [
        "1. District & Municipality Selection: Identify your local government body. Tax rates vary by jurisdiction.",
        "2. Land Area Input: Enter the exact land area in Ropani-Aana or Bigha-Katha.",
        "3. Road Access Classification: Select the type of road touching your property (Main Road, Sub-Road, etc.).",
        "4. Structure Type & Age: Select the construction type (RCC, Brick, etc.) and year to apply depreciation.",
        "5. Valuation Slab Mapping: The engine applies the specific Finance Bill slabs of your municipality.",
        "6. Tax Liability Output: View the final annual property tax amount (Integrated Property Tax).",
        "7. Rebate Verification: Check if you are eligible for early payment discounts (usually 10% in Poush).",
        "8. Legal Documentation: Use the report to prepare for your annual tax filing at the Ward Office."
      ]
    },
    formula: {
      title: "The Municipal Valuation Axiom",
      description: "Property tax is determined by the Government Valuation (Sarkari Mulyankan), increasing based on infrastructure access.",
      raw: "Total Tax = (Land Value x Land Tax Rate) + (Depreciated Building Value x Building Tax Rate)",
      variables: [
        "Land Value = Area x (Base Rate x Road Access Multiplier).",
        "Building Value = (Plinth Area x Rate) - Accumulated Depreciation.",
        "Road Access Multiplier = Highest for Pitch Road; lowest for foot-trails."
      ]
    },
    content: (
        <div className="space-y-12">
        <div className="space-y-12 text-slate-800">
        <div className="bg-amber-50/50 border-l-4 border-amber-600 rounded-r-xl p-8 shadow-sm">
        <h2 className="text-amber-700 font-black text-xs uppercase tracking-[0.3em] mb-3">Property Wealth Executive Summary</h2>
        <p className="text-slate-800 text-base leading-relaxed">
        Property taxation in Nepal is governed by the Local Government Operation Act 2074. Municipalities now have the authority to determine land valuation and tax rates. This professional Nepal Property Tax Auditor provides a transparent breakdown of your annual liability based on the latest municipal Finance Bills.
        </p>
        </div>
        <section>
        <h3 className="text-2xl font-black text-slate-900 mb-6">1. The Valuation Engine: Road Access & Infrastructure</h3>
        <p className="text-slate-700 leading-relaxed">
        In Nepal, the "Sarkari Mulyankan" (Government Valuation) of land is strictly determined by infrastructure. The type of road touching your property can increase your tax valuation significantly.
        </p>
        <div className="overflow-hidden rounded-xl border border-slate-200 mt-6">
        <table className="w-full text-left text-sm">
        <thead className="bg-slate-50">
        <tr>
        <th className="p-4 font-black text-slate-900 uppercase">Road Classification</th>
        <th className="p-4 font-black text-slate-900 uppercase">Valuation Weighting</th>
        </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
        <tr><td className="p-4 font-bold text-red-700">Main Highway / Pitch Road</td><td className="p-4">100% (Base Rate)</td></tr>
        <tr><td className="p-4 font-bold text-blue-700">Sub-Road / Gravel Road</td><td className="p-4">60% - 75%</td></tr>
        <tr><td className="p-4 font-bold text-emerald-700">Goreto / Footpath</td><td className="p-4">20% - 30%</td></tr>
        </tbody>
        </table>
        </div>
        </section>
        <section className="bg-white border border-slate-200 rounded-2xl p-8 mb-8 shadow-sm">
        <h3 className="text-xl font-black text-slate-900 mb-6">Building Depreciation Math</h3>
        <p className="text-slate-700 leading-relaxed">
        Buildings depreciate over time. The Nepal government allows annual depreciation: RCC Frame (1%), Brick & Mortar (2-3%), and Mud-Bonded structures.
        </p>
        </section>
        <div className="pt-10 border-t border-slate-200 text-center mt-12">
        <p className="text-[11px] text-slate-400 italic bg-slate-50 inline-block px-6 py-2 rounded-full border border-slate-100">
        Compliance Audit: Last updated Baishakh 2083 (May 2026). Calculations strictly follow the Local Government Operation Act 2074.
        </p>
        </div>
        </div>
        </div>
    ),
    faqs: [
      { question: "When is the deadline to pay property tax?", answer: "Ideally by the end of Poush to receive a 10% discount." },
      { question: "What is Ekikrit Sampatti Kar?", answer: "An Integrated Property Tax based on the combined value of land and buildings." },
      { question: "Where do I pay my property tax?", answer: "At your local Ward Office (Woda Karyalaya) where the property is located." }
    ]
  },
  'foreign-employment': {
    title: "Nepal Foreign Employment ROI Calculator | Migrant Labor Auditor",
    description: "Calculate the true net savings of working abroad for Nepali migrants. Upfront costs, loan interest traps, and destination salary audits.",
    howToUse: {
      steps: [
        "1. Destination Selection: Choose the target country (e.g., South Korea (EPS), UAE, Qatar, Malaysia).",
        "2. Upfront Capital Input: Enter the total cost paid to the Manpower agency, medical tests, visa fees, and flight tickets.",
        "3. Financing Audit: If you took a loan for the upfront capital, enter the loan amount and the high-interest rate (often 24%+ from local lenders).",
        "4. Expected Salary Entry: Input your guaranteed monthly basic salary in the foreign currency.",
        "5. Living Expenses Calibration: Estimate your monthly living cost abroad (food, rent, transport) if not provided by the company.",
        "6. Net Savings Calculation: The system isolates your true disposable income (Salary - Living Cost - Loan EMI).",
        "7. Payback Period Output: View exactly how many months of labor it will take just to recover your initial investment.",
        "8. Long-term Wealth Strategy: Review the projected total savings at the end of your 2-year or 3-year contract."
      ]
    },
    formula: {
      title: "The Migrant Labor Wealth Axiom",
      description: "The true financial value of foreign employment is determined by subtracting upfront debt servicing and foreign living costs from the total contract earnings.",
      raw: "Net Contract Wealth = (Monthly Savings - Loan EMI) x Tenure - Upfront Capital",
      variables: [
        "Upfront Capital = Manpower Fees + Visa + Flights + Medicals.",
        "Monthly Savings = Basic Salary + Overtime - Foreign Living Expenses.",
        "Loan EMI = Monthly payment to local lenders (usually calculated using high-interest simple or compound rates).",
        "Payback Period = Upfront Capital / Monthly Savings.",
        "Net Contract Wealth = Total cash remitted to Nepal after all debts are cleared."
      ]
    },
    content: (
        <div className="space-y-12">
        <div className="space-y-12 text-slate-800">
        {/* ==========================================
        SECTION 1: EXECUTIVE SUMMARY
        ========================================== */}
        <div className="bg-blue-50/50 border-l-4 border-blue-600 rounded-r-xl p-8 shadow-sm">
        <h2 className="text-blue-700 font-black text-xs uppercase tracking-[0.3em] mb-3">
        Migrant Economics Executive Summary
        </h2>
        <p className="text-slate-800 text-base leading-relaxed">
        Foreign employment is the economic backbone of Nepal, contributing to nearly a quarter of the national GDP through remittances. Yet, for the individual migrant worker, the financial reality is often obscured by hidden agency fees, predatory local lending rates, and the high cost of living in destination countries like the UAE or Malaysia. A promised salary of Rs. 1 Lakh per month can mathematically result in zero net savings if the upfront cost was financed at 36% interest. This professional <a href="/calculator/foreign-employment" className="text-blue-700 hover:text-blue-900 underline font-semibold transition-colors">Foreign Employment Auditor</a> provides a brutal, transparent breakdown of your true Return on Investment (ROI). By calculating your exact 'Payback Period' and debt-servicing limits, our engine ensures that your years of hard labor translate into actual generational wealth for your family back home.
        <br/><br/>
        <span className="text-sm text-slate-600 font-medium">
        Wealth Strategy: Do not let your remittance sit idle in a low-yield savings account. Audit how compounding your monthly transfers in our <a href="/calculator/sip-calculator" className="text-blue-700 hover:text-blue-900 underline font-bold transition-colors">SIP Lab</a> can double your total contract wealth.
        </span>
        </p>
        </div>
        {/* ==========================================
        SECTION 2: COMPETITIVE MARKET AUDIT
        ========================================== */}
        <section>
        <h3 className="text-2xl font-black text-slate-900 mb-6">
        1. Competitive Audit: Foreign Employment ROI
        </h3>
        <div className="overflow-hidden rounded-xl border border-slate-200">
        <table className="w-full text-left text-sm">
        <thead className="bg-slate-50">
        <tr>
        <th className="p-4 font-black text-slate-900">Competitor</th>
        <th className="p-4 font-black text-slate-900">Feature Gap</th>
        <th className="p-4 font-black text-slate-900">CalcPro Advantage</th>
        </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
        <tr>
        <td className="p-4 font-semibold">Manpower Agents</td>
        <td className="p-4">Overstates 'Gross' pay; hides debt interest.</td>
        <td className="p-4 text-blue-700 font-bold">Brutal ROI Audit</td>
        </tr>
        <tr>
        <td className="p-4 font-semibold">Facebook Groups</td>
        <td className="p-4">Anecdotal advice; no mathematical modeling.</td>
        <td className="p-4 text-blue-700 font-bold">100% Mathematical Logic</td>
        </tr>
        <tr>
        <td className="p-4 font-semibold">Generic ROI Apps</td>
        <td className="p-4">No local Nepal (DOFE/EPS) context.</td>
        <td className="p-4 text-blue-700 font-bold">Nepal-Specific Compliance</td>
        </tr>
        </tbody>
        </table>
        </div>
        </section>
        {/* ==========================================
        SECTION 3: THE UPFRONT DEBT TRAP
        ========================================= */}
        <section className="mt-12">
        <h3 className="text-2xl font-black text-slate-900 mb-6">
        2. The Capital Cost: The Agency and The Lender
        </h3>
        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
        <p>
        The biggest variable in foreign employment is not how much you earn abroad, but how much you pay to get there. The 'Free Visa, Free Ticket' policy of the Nepal government is rarely enforced, leading to massive upfront capital requirements.
        </p>
        <div className="overflow-hidden rounded-xl border border-slate-200 mt-6">
        <table className="w-full text-left text-sm">
        <thead className="bg-slate-50">
        <tr>
        <th className="p-4 font-black text-slate-900 uppercase">Expense Category</th>
        <th className="p-4 font-black text-slate-900 uppercase">Typical Cost (NPR)</th>
        <th className="p-4 font-black text-slate-900 uppercase">The Financial Threat</th>
        </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
        <tr><td className="p-4 font-bold text-red-700">Manpower / Broker Fees</td><td className="p-4">Rs. 1,00,000 - 3,00,000+</td><td className="p-4 font-bold">Unregulated. Often requires liquidating family assets.</td></tr>
        <tr><td className="p-4 font-bold text-blue-700">Pre-Departure Costs</td><td className="p-4">Rs. 25,000 - 50,000</td><td className="p-4">Medicals, Orientations, DOFE approvals.</td></tr>
        <tr><td className="p-4 font-bold text-orange-700">Predatory Loan Interest</td><td className="p-4">24% to 36% Annually</td><td className="p-4 font-bold text-red-700">Eats up the first 6-12 months of foreign salary.</td></tr>
        </tbody>
        </table>
        </div>
        <p className="text-sm mt-4 text-slate-500 italic">
        Critical Audit Note: If you borrow Rs. 3 Lakhs at 36% interest from a local moneylender (Sahu), your interest alone is Rs. 9,000 per month. If your foreign savings is only Rs. 30,000, nearly 30% of your labor is just paying interest.
        </p>
        </div>
        </section>
        {/* ==========================================
        SECTION 4: EPS KOREA VS MIDDLE EAST
        ========================================== */}
        <section className="bg-white border border-slate-200 rounded-2xl p-8 mb-8 shadow-sm">
        <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
        <span className="text-blue-600">🇰🇷</span> The Golden Standard: The EPS Korea Math
        </h3>
        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
        <p>
        The Employment Permit System (EPS) for South Korea is fundamentally different from the Middle East manpower model. It is a G2G (Government to Government) process that eliminates broker fees, making it the most mathematically sound labor migration route from Nepal.
        </p>
        <ul className="list-disc pl-6 space-y-3 mt-4">
        <li><strong>Low Upfront Cost:</strong> Total processing, including flights and training, is usually under Rs. 1 Lakh. No manpower agencies are involved.</li><li><strong>High Statutory Wage:</strong> The South Korean minimum wage guarantees earnings exceeding Rs. 2 Lakhs per month, legally mandated and protected.</li><li><strong>The Catch - Language Barrier:</strong> The barrier to entry is the TOPIK language test, which requires 6-12 months of dedicated study, representing an 'Opportunity Cost' of lost wages while studying in Nepal.</li><li><strong>Terminal ROI:</strong> An EPS worker completing a 4-year and 10-month contract routinely returns with Rs. 1 Crore+ in net savings, compared to the Rs. 15-20 Lakhs typical of a Gulf contract.</li></ul>
        </div>
        </section>
        {/* ==========================================
        SECTION 5: HIDDEN COST OF LIVING ABROAD
        ========================================== */}
        <section className="bg-slate-900 text-white rounded-2xl p-8 border border-slate-800 shadow-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[120px] opacity-20 pointer-events-none" />
        <h3 className="text-xl font-black mb-6 flex items-center gap-3 relative z-10">
        <span className="text-blue-400">🏙️</span> The Illusion of Gross Salary
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed mb-8 relative z-10">
        A high salary means nothing if the cost of survival in the destination country consumes it. Before signing a contract, you must audit the 'Provided Facilities'.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        <div className="space-y-4">
        <div className="flex items-start gap-4">
        <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 font-bold">1</div>
        <p className="text-sm text-slate-300"><strong className="text-white">Accommodation & Food:</strong> If the company provides housing and a food allowance, your 'Net Savings' approaches your 'Gross Salary'. If not, rent in Dubai or Doha will consume 30% of your paycheck.</p>
        </div>
        <div className="flex items-start gap-4">
        <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 font-bold">2</div>
        <p className="text-sm text-slate-300"><strong className="text-white">Overtime Dependency:</strong> Many contracts show a low basic salary (e.g., 1000 AED) with the promise of high overtime. If the company loses a project, overtime vanishes, and you cannot meet your loan EMI back home.</p>
        </div>
        <div className="flex items-start gap-4">
        <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 font-bold">3</div>
        <p className="text-sm text-slate-300"><strong className="text-white">Remittance Exchange Rate:</strong> Your salary is paid in Riyals or Dirhams. The conversion rate to NPR fluctuates. The NPR peg to the Indian Rupee provides stability against Gulf currencies, but limits massive forex gains.</p>
        </div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl"><h4 className="text-xs font-black text-blue-400 uppercase tracking-widest mb-3">Institutional Strategy</h4>
        <p className="text-xs text-slate-400 leading-relaxed italic">
        "Always calculate your 'Payback Period'. If you pay Rs. 3 Lakhs to go abroad, and save Rs. 30,000 a month, your Payback Period is 10 months. This means for the first 10 months, you are working as an indentured servant just to return to 'Zero'. Only from Month 11 do you actually start making a profit. Check your family's financial stability during those first 10 months using our <a href="/calculator/savings" className="text-blue-400 underline font-bold">Emergency Fund Lab</a>."
        </p></div>
        </div>
        
        </section>
        {/* ==========================================
        SECTION 6: KNOWLEDGE CARDS
        ========================================== */}
        <section className="mt-12">
        <h3 className="text-2xl font-black text-slate-900 mb-6">
        Migration Intelligence Silo
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-300 transition-all">
        <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
        <span className="text-blue-500">🏦</span> IPO Quota Advantage
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
        The Nepal Government now reserves a specific 10% quota in all Initial Public Offerings (IPOs) for migrant workers who remit funds through formal banking channels. This is an instant wealth multiplier.
        </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-green-300 transition-all">
        <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
        <span className="text-green-500">💰</span> Remittance Premium
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
        Banks in Nepal are directed by the central bank (NRB) to provide an additional 1% interest rate on Fixed Deposits and Savings Accounts if the money is sourced from formal foreign remittance.
        </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-red-300 transition-all">
        <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
        <span className="text-red-600">🛡️</span> The DOFE Insurance
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
        Mandatory insurance via the Foreign Employment Board ensures that in case of death or severe disability abroad, the worker's family in Nepal receives compensation (up to Rs. 15 Lakhs+). Never bypass the legal DOFE approval.
        </p>
        </div>
        </div>
        </section>
        {/* ==========================================
        SECTION 7: CASE STUDY
        ========================================== */}
        <section className="bg-blue-50 border border-blue-100 rounded-3xl p-10 relative overflow-hidden mt-12">
        <div className="relative z-10">
        <h3 className="text-2xl font-black text-blue-900 mb-4">
        Strategic Case Study: The UAE Security Guard Audit
        </h3>
        <p className="text-blue-900/70 text-sm leading-relaxed mb-8">
        A worker pays Rs. 2,50,000 to an agency. He borrows this at 24% annual interest. His UAE salary is 1,500 AED (approx. Rs. 54,000). Food is not provided (costs 400 AED/month). The contract is 2 years.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-blue-200 shadow-sm"><h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Monthly Reality Check</h4></div>
        <div className="space-y-2 text-sm text-slate-700"><div className="flex justify-between"><span>Gross Salary:</span> <strong>Rs. 54,000</strong></div>
        </div>
        </div>
        </div>
        
        
        <div className="flex justify-between"><span>Food/Living (400 AED):</span> <strong>- Rs. 14,400</strong></div>
        
        
        
        <div className="flex justify-between border-t pt-2 mt-2 font-bold text-slate-900"><span>True Savings (Remittance):</span> <span>Rs. 39,600</span></div>
        
        
        <div className="bg-white p-6 rounded-2xl border border-blue-200 shadow-md transform md:scale-105"><h4 className="text-xs font-black text-blue-600 uppercase tracking-widest mb-4">The 2-Year Contract Wealth</h4></div>
        <div className="space-y-2 text-sm text-slate-700"><div className="flex justify-between"><span>Total Saved (24 Months):</span> <strong>Rs. 9,50,400</strong></div>
        </div>
        
        
        
        
        <div className="flex justify-between"><span>Loan Repayment + Interest:</span> <strong>- Rs. 3,10,000</strong></div>
        
        
        
        <div className="flex justify-between border-t pt-2 mt-2 font-bold text-blue-700"><span>Net Wealth Generated:</span> <span>Rs. 6,40,400</span></div>
        
        
        
        <p className="text-xs text-blue-900/50 mt-8 italic text-center">
        Audit Observation: The worker spent 2 years away from his family to generate a total net wealth of Rs. 6.4 Lakhs. That is an effective profit of only Rs. 26,000 per month. If a similar job in Nepal pays Rs. 25,000, the foreign contract is mathematically a loss. Validate your potential using our <a href="/calculator/nepal-salary" className="text-blue-600 underline font-bold">Local Salary Auditor</a>.
        </p>
        
        </section>
        {/* ==========================================
        FOOTER TRUST SIGNALS
        ========================================== */}
        <div className="pt-10 border-t border-slate-200 text-center mt-12">
        <p className="text-[11px] text-slate-400 italic bg-slate-50 inline-block px-6 py-2 rounded-full border border-slate-100">
        Compliance Audit: Last updated Baishakh 2083 (May 2026). Calculations strictly factor in Department of Foreign Employment (DOFE) policies and current average Forex rates.
        
        
        
        </p>
        </div>
        </div>
        </div>
    ),
    faqs: [
        { 
        question: "What is the 'Free Visa, Free Ticket' rule in Nepal?", 
        answer: "The government mandates that for specific countries (like Malaysia and Gulf nations), manpower agencies cannot charge more than Rs. 10,000 as processing fees, and the employer must pay for the visa and flight. However, illegal under-the-table fees are still widely reported." 
        },
        { 
        question: "Is the EPS Korea route really cheaper?", 
        answer: "Yes. Because it is a direct Government-to-Government (G2G) system, there are no manpower broker fees. The total cost, including flights and training, is vastly lower than private manpower routes to Europe or the Gulf." 
        },
        { 
        question: "How do I calculate the Payback Period of my migration?", 
        answer: "Divide your total upfront cost (Loan + Agency Fees + Flights) by your expected monthly savings (Salary minus food/rent). If the answer is 12, it takes exactly one year of labor just to break even." 
        },
        { 
        question: "Why should I send money through Banks instead of Hundi?", 
        answer: "Sending via official channels (Banks/IME/Remit) gives you a 1% higher interest rate on deposits in Nepal, qualifies you for the 10% IPO migrant quota, and builds a legal financial history required for future loans or visas." 
        },
        { 
        question: "What happens if I break my contract and return early?", 
        answer: "If you return before the payback period, you will be in severe debt, as the local lender will continue to charge 24-36% interest. You also lose your legal work permit status and any end-of-service gratuity." 
        },
        { 
        question: "Does the basic salary include overtime?", 
        answer: "No. The basic salary is for standard working hours (usually 8 hours/day, 6 days/week). Overtime is calculated separately, usually at 1.25x or 1.5x the basic hourly rate, but it is never guaranteed." 
        },
        { 
        question: "What is the Foreign Employment Board (FEB) Welfare Fund?", 
        answer: "Before leaving Nepal, you must deposit a nominal fee (Rs. 1,500 - 2,500) into the FEB fund. This provides critical financial compensation to your family in the event of your death, injury, or legal trouble abroad." 
        },
        { 
        question: "Should I take a loan from a local moneylender (Sahu)?", 
        answer: "Avoid it if possible. Local moneylenders often charge 24% to 36% annual interest (Sajha/Byaj). Try to secure a 'Foreign Employment Loan' from a commercial or development bank in Nepal, which has regulated, much lower interest rates." 
        },
        ]
        },
        'kukl-bill': {
        title: "KUKL Water Bill Calculator | Kathmandu Utility Auditor",
        description: "Calculate your KUKL water bill with 50% sewage surcharge and late penalty logic. 1500+ words on pipe diameters and volumetric slabs.",
        howToUse: {
        steps: [
        "1. Pipe Diameter: Select connection size (e.g., 1/2 inch).",
        "2. Connection Status: Indicate if metered or unmetered.",
        "3. Volume Input: Enter liters or units."
        ]
        },
        formula: {
        title: "The Municipal Utility Axiom (KUKL Tariffs)",
        description: "Water billing in the Kathmandu Valley is a hybrid model comprising a fixed baseline fee up to a minimum volume, plus an escalating volumetric rate for excess usage, topped with a sewage tax.",
        raw: "Total Bill = [Minimum Fee + (Excess Volume x Rate)] x (1 + Sewage Tax %) + Fines",
        variables: [
        "Minimum Fee = Fixed charge based on pipe diameter (e.g., Rs. 100 for a 1/2 inch pipe providing up to 10,000 Liters).",
        "Excess Volume = Total Consumption - Base Volume (e.g., Usage above 10,000 Liters).",
        "Sewage Surcharge = An automatic 50% added to the base water bill for homes connected to the public sewer system.",
        "Fines = Progressive penalties scaling from 0% to 50% based on the months delayed."
        ]
        },
        content: (
        <div className="space-y-12">
        <div className="bg-cyan-50/50 border-l-4 border-cyan-600 rounded-r-xl p-8 shadow-sm">
        <h2 className="text-cyan-700 font-black text-xs uppercase tracking-[0.3em] mb-3">Municipal Utility Summary</h2>
        <p className="text-slate-800 leading-relaxed">
        In the Kathmandu Valley, water billing is managed by KUKL. The bill includes a 50% sewage surcharge and progressive late fines.
        
        
        
        </p>
        </div>
        </div>
    ),
    faqs: [
      { 
        question: "Why am I being charged when there is no water supply in my area?", 
        answer: "KUKL charges a 'Minimum Base Fee' (e.g., Rs. 100 for a 1/2 inch pipe) simply to maintain your active connection to the grid, regardless of whether water was actually supplied or consumed during that month." 
      },
      { 
        question: "What is the Sewage Surcharge (Dhal Kar)?", 
        answer: "If your house is connected to the municipal sewer system, KUKL automatically adds a 50% surcharge to your total water bill to cover the costs of waste processing and sewer maintenance." 
      },
      { 
        question: "How do I avoid the 50% Sewage Surcharge?", 
        answer: "If your property relies entirely on an independent Septic Tank and has no physical connection to the municipal sewer, you must submit a formal application to your local KUKL branch to have the surcharge officially removed." 
      },
      { 
        question: "What happens if my water meter is broken?", 
        answer: "If the meter is broken, illegible, or deliberately tampered with, KUKL immediately shifts you to the punitive 'Unmetered' tariff. For a standard residential house, this means paying a flat Rs. 780 per month until you pay to install a new meter." 
      },
      { 
        question: "When does the 50% late penalty apply?", 
        answer: "Progressive fines begin in the 3rd month (10%). By the 5th month of non-payment, the penalty maximizes at a flat 50% of the outstanding bill amount. This penalty remains until the entire balance is cleared." 
      },
      { 
        question: "How do I get the 3% early payment rebate?", 
        answer: "To qualify for the 3% discount on your total bill, you must pay the invoice within the first billing month (within 30 days of the meter reading date). This is easiest to achieve using digital wallets." 
      },
      { 
        question: "Can I pay my KUKL bill online?", 
        answer: "Yes, KUKL is fully integrated with digital payment gateways in Nepal. You can use your 'Connection No.' and 'Customer ID' to view and clear your dues via eSewa, Khalti, or your mobile banking app." 
      },
      { 
        question: "Does a 1-inch pipe cost more than a 1/2 inch pipe?", 
        answer: "Significantly more. A 1/2 inch pipe has a base fee of Rs. 100. A 1-inch pipe, considered a commercial-grade connection, has a base fee of Rs. 3,960. Never upgrade your pipe size unless your property absolutely requires commercial volume." 
      },
      { 
        question: "How many liters are in one KUKL 'Unit'?", 
        answer: "One unit on the KUKL meter is equivalent to 1,000 Liters (1 Cubic Meter). If your meter reading jumps by 10 units, you have consumed 10,000 Liters of water." 
      },
      { 
        question: "Will the Melamchi Water Supply change the billing rate?", 
        answer: "While the supply volume increases with Melamchi, the statutory tariff rates (per 1000L) remain determined by the KUKL board. High supply usually leads to high consumption, which pushes households into the expensive 'Excess Volumetric Rate' tier." 
      }
    ]
  },
  'nea-bill': {
    title: "NEA Bill Calculator 2082/83 | Nepal Electricity Bill Auditor",
    description: "Calculate your NEA electricity bill precisely for FY 2082/83. Includes 5A to 60A demand charges, progressive slab rates, and late payment fine logic.",
    
    howToUse: {
      steps: [
        "1. Phase & Ampere Selection: Identify your connection type (Single Phase or Three Phase) and meter capacity (e.g., 5A, 15A, 30A, 60A). This defines your fixed monthly demand charge.",
        "2. Reading Input: Enter your Previous Month's meter reading and Current Month's reading in KWh (Units).",
        "3. Volume Calculation: The system isolates your total consumed units (Current - Previous).",
        "4. Progressive Slab Audit: Observe how your consumption is divided into the NEA's progressive tiers (0-20, 21-30, 31-50, etc.), with higher units costing exponentially more.",
        "5. Fixed Charge Addition: The mandatory monthly service/demand charge is added based on your specific Ampere rating, even if your consumption is 0.",
        "6. Time of Day (ToD) Override (For 3-Phase): If applicable, input peak, off-peak, and normal hour usage for specialized industrial/commercial billing.",
        "7. Penalty/Rebate Synchronization: Input the payment date relative to the meter reading to apply the 2% early rebate or the 5% to 25% late fine.",
        "8. Payment Execution: Use the exact 'Total Payable Amount' to clear your dues via eSewa, Khalti, or the NEA official app."
      ]
    },
    
    formula: {
      title: "The NEA Energy Tariff Axiom",
      description: "Electricity billing in Nepal operates on a highly progressive slab system that penalizes high consumption while subsidizing basic energy needs for low-income households (Lifeline tariff).",
      raw: "Total Bill = Fixed Demand Charge + Σ (Units in Slab × Slab Rate) + Penalty/Rebate",
      variables: [
        "Fixed Demand Charge = Monthly fee based on Ampere capacity.",
        "Units in Slab = Consumed units allocated to specific progressive pricing tiers.",
        "Slab Rate = The cost per unit in that specific tier.",
        "Penalty/Rebate = Time-sensitive financial adjustments based on payment date."
      ]
    },
    
    content: (
        <div className="space-y-12">
        <div className="bg-yellow-50 border-l-4 border-yellow-600 rounded-r-xl p-8 shadow-sm">
        <h2 className="text-yellow-700 font-black text-xs uppercase tracking-[0.3em] mb-3">Energy Intelligence Summary</h2>
        <p className="text-slate-800 leading-relaxed">
        NEA billing is based on a progressive slab system. Higher consumption leads to exponentially higher costs.
        
        
        
        </p>
        </div>
        </div>
    ),
    faqs: [
      { 
        question: "How is the NEA fixed charge calculated?", 
        answer: "The fixed monthly charge depends strictly on the Ampere capacity of your meter (e.g., 5A, 15A, 30A). This is a mandatory maintenance fee you must pay even if your electricity consumption for the month is 0 units." 
      },
      { 
        question: "What is the 5 Ampere 'Lifeline' tariff?", 
        answer: "To subsidize low-income households, the NEA provides 20 units of free electricity per month to households with a basic 5A meter. They only have to pay the Rs. 30 fixed demand charge." 
      },
      { 
        question: "My landlord charges me Rs. 15 per unit from a sub-meter. Is this legal?", 
        answer: "No. The highest domestic slab rate under NEA rules is Rs. 11 per unit (for usage above 250 units). Charging a flat Rs. 15 per unit is illegal profiteering. The sub-meter reading should be processed through the NEA's progressive slab logic." 
      },
      { 
        question: "When does the 25% late fine apply?", 
        answer: "If you fail to pay your electricity bill within 40 days of the meter reading date, a massive 25% penalty is permanently added to the outstanding amount, and your line becomes eligible for physical disconnection." 
      },
      { 
        question: "How do I get the 2% discount on my electricity bill?", 
        answer: "You must pay your entire bill amount within the first 7 days following the meter reading date. The easiest way to secure this is by checking your SC No. on a digital wallet like eSewa or Khalti immediately after the month ends." 
      },
      { 
        question: "Can I run an Air Conditioner on a 5A meter?", 
        answer: "No. A 5A meter provides limited wattage capacity. Turning on a heavy appliance like an AC (typically 1500W+) or a large Geyser will trip the breaker or potentially burn the meter wiring. You need at least a 15A or 30A meter." 
      },
      { 
        question: "What does 'Three Phase' mean?", 
        answer: "Three Phase connections deliver higher voltage (400V vs 230V) and massive load capacity. They are required for industrial machinery, large commercial buildings, and high-capacity elevators. They operate under a completely different, much higher tariff structure." 
      },
      { 
        question: "What happens if my meter is broken or stopped?", 
        answer: "If the meter is found to be defective, the NEA will bill you based on your 'Average Consumption' of the past few months. You must apply to your local distribution center immediately to have the meter replaced to avoid arbitrary billing." 
      },
      { 
        question: "Are government taxes included in the NEA bill?", 
        answer: "No extra VAT is added to domestic electricity consumption. The calculated progressive amount is the final amount. However, for industrial and commercial users, specific municipal or regulatory taxes may apply." 
      },
      { 
        question: "Why did my bill suddenly double in the winter?", 
        answer: "Winter in Nepal requires water heating (geysers/immersion rods) and room heaters, which are the highest electricity-consuming appliances. Pushing your usage from 100 units to 200 units doesn't just double your bill; it pushes you into the expensive Rs. 10.00/unit progressive slab, causing exponential cost increases." 
      }
    ]
  },
  'property-registration': {
    title: "Property Registration Fee Calculator Nepal | Malpot Auditor",
    description: "Calculate land registry fees, service charges, and bagmati/local taxes for property transfer in Nepal.",
    howToUse: {
      steps: [
        "1. Location: Select Municipality type.",
        "2. Gender: Choose owner demographic (for rebates).",
        "3. Valuation: Enter the official Malpot valuation."
      ]
    },
    formula: {
      title: "Registry Axiom",
      description: "Fee = Valuation x (Registry Rate + Service Charge).",
      raw: "Fee = V x R",
      variables: ["V = Official Valuation"]
    },
    content: (
        <div className="space-y-12">
        <div className="bg-slate-50 border-l-4 border-slate-600 rounded-r-xl p-8 shadow-sm">
        <h2 className="text-slate-700 font-black text-xs uppercase tracking-widest mb-3">Real Estate Registration Summary</h2>
        <p className="text-slate-800 leading-relaxed">
        Registering property in Nepal involves several layers of fees including the primary registration fee and local development taxes.
        
        
        </p>
        </div>
        </div>
    ),
    faqs: [
      { question: "Women's rebate on land registry?", answer: "Yes, typically 25% to 50% depending on the location." }
    ]
  },

  'nepal-provident-fund': {
    title: "EPF & CIT Calculator Nepal | Retirement Wealth & Interest Auditor",
    description: "Calculate your Employee Provident Fund (EPF) and Citizen Investment Trust (CIT) growth in Nepal for FY 2082/83. Statutory interest and tax audit.",
    howToUse: {
      steps: [
        "1. Salary Entry: Enter your monthly basic salary. Note that EPF is calculated strictly on the basic component, excluding allowances.",
        "2. Contribution Calibration: Set your contribution percentage. For EPF, the standard is 10% (employee) + 10% (employer). For CIT, you can select a flat monthly amount.",
        "3. Tenure Input: Define your projected years of service to calculate long-term compounded wealth.",
        "4. Interest Rate Audit: The system applies the current statutory interest rates (typically 7.5% - 8% for the 2082/83 cycle).",
        "5. Tax Benefit Mapping: View how much income tax you save annually by making these contributions (subject to the Rs. 3 Lakh limit).",
        "6. Loan Eligibility: See your maximum borrowing capacity (usually up to 80% of your total balance).",
        "7. Terminal Value Output: Review the total projected corpus at the time of retirement, including accumulated interest.",
        "8. Compliance Check: Verify that your employer is depositing the full 20% (10+10) into your official EPF account."
      ]
    },
    formula: {
      title: "The Compounded Retirement Axiom",
      description: "Wealth accumulation in EPF/CIT follows a monthly compounding schedule where interest is credited annually on the average balance.",
      raw: "Future Value = P × [((1 + r/n)^(nt) - 1) / (r/n)]",
      variables: [
        "P = Monthly contribution (Employee + Employer).",
        "r = Annual interest rate (statutory rate).",
        "n = Compounding frequency (Monthly).",
        "t = Tenure in years."
      ]
    },
    content: (
        <div className="space-y-12 text-slate-800">
            {/* Executive Summary */}
            <section>
                <h2 className="text-3xl font-black text-[#202124] mb-6 tracking-tighter uppercase">The Retirement Intelligence Silo: Nepal EPF & CIT Audit</h2>
                <div className="bg-blue-50 border-l-4 border-blue-600 rounded-r-xl p-10 mb-10 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[120px] opacity-10" />
                    <h4 className="text-blue-700 font-black text-xs uppercase tracking-[0.4em] mb-6 mt-0">Wealth Preservation Lab</h4>
                    <p className="text-slate-800 text-base leading-relaxed relative z-10">
                        In the financial landscape of Nepal, the <strong>Employee Provident Fund (EPF/Karmachari Sanchaya Kosh)</strong> and <strong>Citizen Investment Trust (CIT/Nagarik Lagani Kosh)</strong> are the twin pillars of institutional retirement planning. In <strong>FY 2082/83</strong>, these funds serve dual purposes: providing a safety net for the future and offering immediate tax relief through the IRD-approved deduction of up to Rs. 3,00,000. Navigating the compounding math of a 10% salary split requires absolute precision to avoid retirement shortfall. This <a href="/calculator/nepal-provident-fund" className="text-blue-700 hover:text-blue-900 underline font-semibold transition-colors">Retirement Wealth Auditor</a> is engineered to simulate 20-30 year growth cycles, accounting for statutory interest fluctuations and the 80% loan-against-fund provisions.
                    </p>
                </div>
            </section>

            {/* Section 1: EPF vs CIT */}
            <section className="mb-16">
                <h3 className="text-2xl font-black text-[#202124] mb-6">1. Strategic Comparison: EPF vs. CIT</h3>
                <p className="text-sm text-[#5f6368] leading-relaxed mb-8">
                    While both funds offer tax benefits, they operate under different legal frameworks. EPF is mandatory for permanent employees in registered organizations, whereas CIT is a voluntary investment vehicle often used to bridge the gap in retirement savings.
                </p>
                <div className="overflow-hidden rounded-[2rem] border border-[#dadce0] shadow-sm">
                    <table className="w-full text-left text-xs bg-white">
                        <thead className="bg-[#f8f9fa] border-b border-[#dadce0]">
                            <tr>
                                <th className="p-5 font-black text-[#202124] uppercase tracking-widest">Feature</th>
                                <th className="p-5 font-black text-[#202124] uppercase tracking-widest">Employee Provident Fund (EPF)</th>
                                <th className="p-5 font-black text-[#202124] uppercase tracking-widest">Citizen Investment Trust (CIT)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#dadce0]">
                            <tr><td className="p-5 font-bold uppercase">Contribution</td><td className="p-5">10% Employee + 10% Employer</td><td className="p-5">Flexible (Voluntary)</td></tr>
                            <tr><td className="p-5 font-bold uppercase">Tax Benefit</td><td className="p-5">Deductible from Taxable Income</td><td className="p-5">Deductible from Taxable Income</td></tr>
                            <tr><td className="p-5 font-bold uppercase">Loan Limit</td><td className="p-5">Up to 80% of total balance</td><td className="p-5">Up to 80% of total balance</td></tr>
                            <tr className="bg-blue-50/30"><td className="p-5 font-bold uppercase">Primary Source</td><td className="p-5 text-blue-700 font-bold">Karmachari Sanchaya Kosh</td><td className="p-5 text-blue-700 font-bold">Nagarik Lagani Kosh</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Section 2: Compounding Math */}
            <section className="mb-16">
                <h3 className="text-2xl font-black text-[#202124] mb-6">2. Compounding Math: The Wealth Multiplier</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-8 bg-white border border-[#dadce0] rounded-[2rem] shadow-sm">
                        <h4 className="text-sm font-black text-[#202124] uppercase mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-600 rounded-full" /> The 20% Rule
                        </h4>
                        <p className="text-xs text-[#5f6368] leading-relaxed">
                            For every Rs. 1,000 deducted from your basic salary for EPF, your employer is legally mandated to add another Rs. 1,000. This 100% immediate return on investment is the highest guaranteed gain in the Nepali financial market.
                        </p>
                    </div>
                    <div className="p-8 bg-white border border-[#dadce0] rounded-[2rem] shadow-sm">
                        <h4 className="text-sm font-black text-[#202124] uppercase mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-600 rounded-full" /> The 80% Liquidity Shield
                        </h4>
                        <p className="text-xs text-[#5f6368] leading-relaxed">
                            While the fund is for retirement, both <a href="https://ksk.org.np" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">EPF</a> and <a href="https://nlk.org.np" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">CIT</a> allow you to borrow up to 80% of your accumulated balance at competitive interest rates for personal or educational needs.
                        </p>
                    </div>
                </div>
            </section>

            {/* Section 3: Mathematical Verification */}
            <section className="bg-slate-900 text-white rounded-[3rem] p-12 border border-slate-800 shadow-xl overflow-hidden relative mb-16">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-[150px] opacity-20 pointer-events-none" />
                <h3 className="text-3xl font-black mb-8 text-blue-400">3. Mathematical Audit: A 10-Year Simulation</h3>
                <div className="prose prose-invert prose-sm max-w-none">
                    <p className="text-slate-300 mb-8">
                        Let us audit a professional with a <strong>Basic Salary of Rs. 50,000</strong> contributing 10% to EPF over 10 years at a <strong>7.5% annual interest rate</strong>.
                    </p>
                    <ol className="space-y-6 list-none p-0">
                        <li className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                            <code className="text-blue-400 block mb-2 font-bold uppercase tracking-widest text-[10px]">Step 01: Monthly Input</code>
                            <p className="text-sm text-slate-100">Employee (10%): Rs. 5,000 <br/> Employer (10%): Rs. 5,000 <br/> <strong>Total Monthly: Rs. 10,000</strong></p>
                        </li>
                        <li className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                            <code className="text-blue-400 block mb-2 font-bold uppercase tracking-widest text-[10px]">Step 02: Annual Principal</code>
                            <p className="text-sm text-slate-100">Rs. 10,000 × 12 = <strong>Rs. 1,20,000 Per Year</strong></p>
                        </li>
                        <li className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                            <code className="text-blue-400 block mb-2 font-bold uppercase tracking-widest text-[10px]">Step 03: 10-Year Compounding Result</code>
                            <p className="text-sm text-slate-100">Calculated Future Value (at 7.5%): <strong>Rs. 17,40,000 (Approx)</strong> <br/> Total Investment: Rs. 12,00,000 <br/> <strong>Wealth Gain: Rs. 5,40,000</strong></p>
                        </li>
                    </ol>
                    <div className="mt-10 p-8 bg-blue-600/20 border-2 border-blue-500/50 rounded-3xl text-center">
                        <h4 className="text-xl font-black text-blue-400 mb-2">Projected Retirement Corpus</h4>
                        <p className="text-4xl font-black text-white">Rs. 17,40,000</p>
                        <p className="text-xs text-blue-300 mt-2 uppercase tracking-widest font-bold">Audit includes interest compounding on monthly average balance.</p>
                    </div>
                </div>
            </section>

            {/* Footer Trust Signal */}
            <div className="text-center pt-8 border-t border-[#dadce0]">
                <p className="text-[10px] font-black text-[#70757a] uppercase tracking-[0.5em]">
                    Retirement Compliance Auditor • FY 2082/83 EPF/CIT Standard
                </p>
            </div>
        </div>
    ),
    faqs: [
      { question: "What is the interest rate on EPF in Nepal?", answer: "The interest rate for FY 2082/83 is typically between 7.5% and 8% annually, determined by the EPF board." },
      { question: "Can I withdraw my EPF balance before retirement?", answer: "You can withdraw up to 90% if you are unemployed or have reached a specific age, but the 80% loan facility is generally preferred." },
      { question: "Is CIT deduction mandatory?", answer: "No, CIT is a voluntary contribution. However, it is highly recommended for tax optimization up to the Rs. 3 Lakh limit." },
      { question: "Difference between SSF and EPF?", answer: "SSF is a newer integrated social security scheme, whereas EPF is a legacy provident fund. Many private companies are now migrating to SSF." }
    ]
  },
  'nepal-vehicle-tax': {
    title: "Nepal Vehicle Tax Calculator 2082/83 | Bluebook Renewal & CC Slabs",
    description: "Calculate annual vehicle tax for bikes and cars in Nepal. Latest FY 2082/83 CC slabs, insurance, and renewal penalties.",
    howToUse: {
      steps: [
        "1. Vehicle Category Selection: Choose between Two-Wheeler (Bike/Scooter) or Four-Wheeler (Car/Jeep/Van).",
        "2. Engine Capacity (CC) Input: Enter the displacement of your engine in CC (e.g., 150cc, 1200cc).",
        "3. Provincial Audit: Select the province where your vehicle is registered (e.g., Bagmati, Gandaki). Tax slabs vary slightly by province.",
        "4. Insurance Selection: Indicate if you are purchasing new Third-Party Insurance or Full Comprehensive Insurance.",
        "5. Renewal Deadline Input: Enter your bluebook expiry date to check for potential late payment penalties.",
        "6. Slab-wise Calculation: The system isolates the state tax based on the 2082/83 Finance Bill.",
        "7. Final Total Output: View the combined cost including Tax, Insurance, and any mandatory service fees.",
        "8. Digital Execution: Use the exact total to pay via eSewa or Khalti for remote renewal."
      ]
    },
    formula: {
      title: "The Automotive Taxation Axiom",
      description: "Vehicle tax in Nepal is a fixed-slab annual fee based strictly on engine displacement (CC) and vehicle class.",
      raw: "Total Renewal = State Tax(CC) + Insurance Premium + Late Fines",
      variables: [
        "State Tax = Fixed annual fee per CC slab (e.g., Rs. 2,500 for 126-150cc bikes).",
        "Insurance = Mandatory third-party liability coverage.",
        "Late Fines = 5% to 32% of tax amount based on the number of months delayed."
      ]
    },
    content: (
        <div className="space-y-12 text-slate-800">
            {/* Executive Summary */}
            <section>
                <h2 className="text-3xl font-black text-[#202124] mb-6 tracking-tighter uppercase">The Automotive Compliance Encyclopedia: Bluebook Renewal & State Tax</h2>
                <div className="bg-gray-100 border-l-4 border-gray-600 rounded-r-xl p-10 mb-10 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gray-600 rounded-full blur-[120px] opacity-10" />
                    <h4 className="text-gray-700 font-black text-xs uppercase tracking-[0.4em] mb-6 mt-0">Transport Management Intelligence</h4>
                    <p className="text-slate-800 text-base leading-relaxed relative z-10">
                        In Nepal, the annual renewal of the vehicle registration document, commonly known as the <strong>Bluebook</strong>, is a mandatory fiscal obligation governed by the <strong>Department of Transport Management (DOTM)</strong>. In <strong>FY 2082/83</strong>, vehicle tax is calculated using a progressive slab system based on engine capacity (CC). Failure to renew within the 90-day grace period triggers punitive fines that can exceed 32% of the base tax. This <a href="/calculator/nepal-vehicle-tax" className="text-gray-700 hover:text-gray-900 underline font-semibold transition-colors">Vehicle Tax Auditor</a> provides a precise breakdown of state taxes and mandatory insurance premiums, ensuring you are audit-ready for the next fiscal cycle.
                    </p>
                </div>
            </section>

            {/* Section 1: Two-Wheeler Slabs */}
            <section className="mb-16">
                <h3 className="text-2xl font-black text-[#202124] mb-6">1. Two-Wheeler (Bike/Scooter) Tax Slabs 2082/83</h3>
                <p className="text-sm text-[#5f6368] leading-relaxed mb-8">
                    For <strong>Bagmati Province</strong> (the most common registration), the following annual tax slabs apply to two-wheelers. Note that electric vehicles (EVs) operate under a separate, highly subsidized regime.
                </p>
                <div className="overflow-hidden rounded-[2rem] border border-[#dadce0] shadow-sm mb-8">
                    <table className="w-full text-left text-xs bg-white">
                        <thead className="bg-[#f8f9fa] border-b border-[#dadce0]">
                            <tr>
                                <th className="p-5 font-black text-[#202124] uppercase tracking-widest">Engine Capacity (CC)</th>
                                <th className="p-5 font-black text-[#202124] uppercase tracking-widest">Annual State Tax (NPR)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#dadce0]">
                            <tr><td className="p-5">Up to 125cc</td><td className="p-5 font-bold">Rs. 3,000</td></tr>
                            <tr className="bg-blue-50/30"><td className="p-5 font-bold">126cc to 150cc</td><td className="p-5 font-bold">Rs. 5,000</td></tr>
                            <tr><td className="p-5">151cc to 225cc</td><td className="p-5 font-bold">Rs. 6,500</td></tr>
                            <tr><td className="p-5">226cc to 400cc</td><td className="p-5 font-bold text-orange-600">Rs. 11,000</td></tr>
                            <tr className="bg-red-50/30"><td className="p-5 font-black">Above 650cc</td><td className="p-5 font-black text-red-700">Rs. 30,000</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Section 2: Penalty Audit */}
            <section className="mb-16">
                <h3 className="text-2xl font-black text-[#202124] mb-6">2. The Penalty Trap: 5% to 32% Fines</h3>
                <p className="text-sm text-[#5f6368] leading-relaxed mb-6">
                    The most critical component of vehicle renewal is the timing. Nepal law grants a 30-day grace period after the expiry date. Beyond that, the fines escalate rapidly.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 bg-green-50 border border-green-200 rounded-2xl text-center">
                        <h4 className="text-[10px] font-black text-green-700 uppercase mb-2">0 - 30 Days</h4>
                        <p className="text-xl font-black">No Fine</p>
                    </div>
                    <div className="p-6 bg-amber-50 border border-amber-200 rounded-2xl text-center">
                        <h4 className="text-[10px] font-black text-amber-700 uppercase mb-2">31 - 60 Days</h4>
                        <p className="text-xl font-black">5% Fine</p>
                    </div>
                    <div className="p-6 bg-red-50 border border-red-200 rounded-2xl text-center">
                        <h4 className="text-[10px] font-black text-red-700 uppercase mb-2">After 1 Year</h4>
                        <p className="text-xl font-black">32% Fine</p>
                    </div>
                </div>
            </section>

            {/* Section 3: Mathematical Verification */}
            <section className="bg-slate-900 text-white rounded-[3rem] p-12 border border-slate-800 shadow-xl overflow-hidden relative mb-16">
                <div className="absolute top-0 right-0 w-96 h-96 bg-gray-600 rounded-full blur-[150px] opacity-20 pointer-events-none" />
                <h3 className="text-3xl font-black mb-8 text-gray-400">3. Mathematical Audit: A Car Renewal Example</h3>
                <div className="prose prose-invert prose-sm max-w-none">
                    <p className="text-slate-300 mb-8">
                        Let us audit a <strong>1200cc Private Car</strong> renewal in Bagmati Province for FY 2082/83.
                    </p>
                    <ul className="space-y-4 list-none p-0">
                        <li className="flex justify-between border-b border-slate-700 pb-2"><span>Annual State Tax (1001-1500cc):</span> <strong className="text-white">Rs. 23,500</strong></li>
                        <li className="flex justify-between border-b border-slate-700 pb-2"><span>Third-Party Insurance:</span> <strong className="text-white">Rs. 6,500 (Approx)</strong></li>
                        <li className="flex justify-between border-b border-slate-700 pb-2"><span>Service Charge:</span> <strong className="text-white">Rs. 500</strong></li>
                        <li className="flex justify-between pt-4"><span className="text-xl font-black">Total Payable:</span> <strong className="text-2xl text-green-400">Rs. 30,500</strong></li>
                    </ul>
                    <p className="text-[10px] text-slate-500 mt-8 italic">
                        Audit Note: This calculation assumes no late penalties. Add 32% to the State Tax if the renewal is more than one fiscal year overdue.
                    </p>
                </div>
            </section>

            {/* Footer Trust Signal */}
            <div className="text-center pt-8 border-t border-[#dadce0]">
                <p className="text-[10px] font-black text-[#70757a] uppercase tracking-[0.5em]">
                    Automotive Compliance Auditor • FY 2082/83 DOTM Standard
                </p>
            </div>
        </div>
    ),
    faqs: [
      { question: "When is the vehicle tax deadline in Nepal?", answer: "The tax must be paid annually before the bluebook expiry date. You have a 30-day grace period to pay without any penalty." },
      { question: "Is Third-Party Insurance enough for renewal?", answer: "Yes, for bluebook renewal, only Third-Party (TPL) insurance is legally mandatory, though Full Comprehensive insurance is recommended." },
      { question: "How is electric vehicle (EV) tax calculated?", answer: "EVs in Nepal are taxed based on Motor Power (kW) rather than CC, with significantly lower rates to promote clean energy." },
      { question: "What is the penalty for not renewing for 5 years?", answer: "The penalty maximizes at 32% of the total accumulated tax amount for all 5 years, plus mandatory insurance costs for the current year." }
    ]
  },
  'nepse-wacc': {
    title: "NEPSE WACC Calculator | Weighted Average Cost of Capital Nepal",
    description: "Calculate your weighted average cost of capital (WACC) for Nepal Stock Exchange (NEPSE). Meroshare compliant CGT auditor for bonus and right shares.",
    howToUse: {
      steps: [
        "1. Buy Transactions: Enter all your purchase prices and the respective quantities (including broker commissions).",
        "2. Corporate Actions: Input any bonus shares received (at Rs. 0 or Rs. 100 face value) and right shares purchased.",
        "3. Sell History (Optional): Enter quantities sold to maintain an accurate weighted balance of the remaining shares.",
        "4. Broker Fee Calibration: The system automatically accounts for the tiered broker commission structure in Nepal.",
        "5. Meroshare Sync: Use the final WACC output to update your 'My WACC' section in Meroshare.",
        "6. CGT Projection: View your estimated Capital Gains Tax (5% or 7.5%) based on current market prices.",
        "7. Weighted Calculation: The engine isolates the average cost per unit across multiple trading cycles.",
        "8. Digital Audit: Download the calculation log for audit purposes during tax filing."
      ]
    },
    formula: {
      title: "The Weighted Average Cost Axiom",
      description: "In the Nepal market, WACC is the sum of all investment costs divided by the total number of shares currently held.",
      raw: "WACC = Total Cost / Total Quantity",
      variables: [
        "Purchase Price = Includes the rate, broker commission, SEBON fee, and DP charge.",
        "Total Quantity = Total shares held after bonus and right adjustments."
      ]
    },
    content: (
        <div className="space-y-12 text-slate-800">
            {/* Executive Summary */}
            <section>
                <h2 className="text-3xl font-black text-[#202124] mb-6 tracking-tighter uppercase">The Institutional Encyclopedia: NEPSE WACC & Capital Gains Compliance</h2>
                <div className="bg-green-50 border-l-4 border-green-600 rounded-r-xl p-10 mb-10 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-green-600 rounded-full blur-[120px] opacity-10" />
                    <h4 className="text-green-700 font-black text-xs uppercase tracking-[0.4em] mb-6 mt-0">Capital Markets Intelligence Lab</h4>
                    <p className="text-slate-800 text-base leading-relaxed relative z-10">
                        In the <strong>Nepal Stock Exchange (NEPSE)</strong>, the <strong>Weighted Average Cost of Capital (WACC)</strong> is the definitive metric used by the <strong>Securities Board of Nepal (SEBON)</strong> and <strong>CDS & Clearing Ltd (Meroshare)</strong> to determine the cost base of your equity holdings. For <strong>FY 2082/83</strong>, accurately calculating WACC is not just a trading requirement—it is a legal necessity for <strong>Capital Gains Tax (CGT)</strong> compliance. Since NEPSE operates on a 'User-Declared WACC' system in Meroshare, any error in this calculation can lead to underpayment of tax (triggering penalties) or overpayment (reducing net profits). This <a href="/calculator/nepse-wacc" className="text-green-700 hover:text-green-900 underline font-semibold transition-colors">WACC Auditor</a> serves as the high-precision engine for consolidating multiple purchase entries, bonus shares, and right shares into a single, audit-ready cost per unit.
                    </p>
                </div>
            </section>

            {/* Section 1: The WACC Axiom */}
            <section className="mb-16">
                <h3 className="text-2xl font-black text-[#202124] mb-6">1. The WACC Axiom: Beyond Simple Averages</h3>
                <p className="text-sm text-[#5f6368] leading-relaxed mb-8">
                    Unlike a simple average, WACC accounts for the volume of shares at each price point. If you buy 10 shares at Rs. 500 and 100 shares at Rs. 400, your average cost is much closer to Rs. 400. This is the foundation of institutional portfolio management.
                </p>
                <div className="overflow-hidden rounded-[2rem] border border-[#dadce0] shadow-sm mb-8">
                    <table className="w-full text-left text-xs bg-white">
                        <thead className="bg-[#f8f9fa] border-b border-[#dadce0]">
                            <tr>
                                <th className="p-5 font-black text-[#202124] uppercase tracking-widest">Transaction Type</th>
                                <th className="p-5 font-black text-[#202124] uppercase tracking-widest">Cost Basis Adjustment</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#dadce0]">
                            <tr><td className="p-5 font-bold uppercase">Secondary Buy</td><td className="p-5">Purchase Price + Brokerage + SEBON Fee</td></tr>
                            <tr><td className="p-5 font-bold uppercase">IPO Allotment</td><td className="p-5">Rs. 100 per share (usually)</td></tr>
                            <tr className="bg-green-50/30"><td className="p-5 font-bold uppercase">Bonus Shares</td><td className="p-5 text-green-700 font-bold">Rs. 100 or Rs. 0 (depending on company history)</td></tr>
                            <tr><td className="p-5 font-bold uppercase">Right Shares</td><td className="p-5">Rs. 100 per share</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Section 2: Right & Bonus Adjustments */}
            <section className="mb-16">
                <h3 className="text-2xl font-black text-[#202124] mb-6">2. Corporate Action Dilution: Bonus & Right Shares</h3>
                <p className="text-sm text-[#5f6368] leading-relaxed mb-6">
                    Bonus and right shares significantly lower your WACC because they add quantity without a proportional increase in market-priced cost. In Meroshare, you must manually select the appropriate adjustment type for these shares to ensure the <strong>5% (long-term) or 7.5% (short-term)</strong> CGT is applied correctly.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-8 bg-white border border-[#dadce0] rounded-[2rem] shadow-sm">
                        <h4 className="text-sm font-black text-[#202124] uppercase mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-600 rounded-full" /> Bonus Adjustment
                        </h4>
                        <p className="text-xs text-[#5f6368] leading-relaxed">
                            Bonus shares are essentially free, but for tax purposes, they often carry a cost base of Rs. 100. This calculation requires aggregating the face value into your total investment pool.
                        </p>
                    </div>
                    <div className="p-8 bg-white border border-[#dadce0] rounded-[2rem] shadow-sm">
                        <h4 className="text-sm font-black text-[#202124] uppercase mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-600 rounded-full" /> Right Share Impact
                        </h4>
                        <p className="text-xs text-[#5f6368] leading-relaxed">
                            Right shares are always priced at Rs. 100 in Nepal. They provide a strategic opportunity to average down your high-cost secondary purchases.
                        </p>
                    </div>
                </div>
            </section>

            {/* Section 3: Mathematical Verification */}
            <section className="bg-slate-900 text-white rounded-[3rem] p-12 border border-slate-800 shadow-xl overflow-hidden relative mb-16">
                <div className="absolute top-0 right-0 w-96 h-96 bg-green-600 rounded-full blur-[150px] opacity-20 pointer-events-none" />
                <h3 className="text-3xl font-black mb-8 text-green-400">3. Mathematical Audit: A Portfolio Rebalancing Simulation</h3>
                <div className="prose prose-invert prose-sm max-w-none">
                    <p className="text-slate-300 mb-8">
                        Let us audit a portfolio for <strong>NABIL Bank</strong> with multiple buy entries and a bonus adjustment.
                    </p>
                    <ol className="space-y-6 list-none p-0">
                        <li className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                            <code className="text-green-400 block mb-2 font-bold uppercase tracking-widest text-[10px]">Entry 01: Secondary Purchase</code>
                            <p className="text-sm text-slate-100">100 Shares at Rs. 600 = <strong>Rs. 60,000</strong></p>
                        </li>
                        <li className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                            <code className="text-green-400 block mb-2 font-bold uppercase tracking-widest text-[10px]">Entry 02: 10% Bonus Allotment</code>
                            <p className="text-sm text-slate-100">10 Shares at Rs. 100 (Face Value) = <strong>Rs. 1,000</strong></p>
                        </li>
                        <li className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                            <code className="text-green-400 block mb-2 font-bold uppercase tracking-widest text-[10px]">Total Aggregation</code>
                            <p className="text-sm text-slate-100">Total Cost: Rs. 61,000 <br/> Total Quantity: 110 Shares <br/> <strong>Calculated WACC: Rs. 554.55</strong></p>
                        </li>
                    </ol>
                    <div className="mt-10 p-8 bg-green-600/20 border-2 border-green-500/50 rounded-3xl text-center">
                        <h4 className="text-xl font-black text-green-400 mb-2">Portfolio WACC</h4>
                        <p className="text-4xl font-black text-white">Rs. 554.55</p>
                        <p className="text-xs text-green-300 mt-2 uppercase tracking-widest font-bold">This is the exact value to be entered in Meroshare for CGT clearance.</p>
                    </div>
                </div>
            </section>

            {/* Footer Trust Signal */}
            <div className="text-center pt-8 border-t border-[#dadce0]">
                <p className="text-[10px] font-black text-[#70757a] uppercase tracking-[0.5em]">
                    Capital Markets Auditor • FY 2082/83 SEBON/Meroshare Standard
                </p>
            </div>
        </div>
    ),
    faqs: [
      { question: "Does WACC include bonus shares?", answer: "Yes, in the Nepal market, bonus shares are usually adjusted at a face value of Rs. 100 to determine the cost base." },
      { question: "Is broker commission included in WACC?", answer: "Absolutely. SEBON regulations allow you to include broker commissions, SEBON fees, and DP charges in your purchase cost." },
      { question: "Why is WACC important in Meroshare?", answer: "Meroshare uses your declared WACC to calculate the profit on a sale. Capital Gains Tax (5% or 7.5%) is then applied to that profit." },
      { question: "Can I change my WACC after selling?", answer: "No, once a transaction is executed and the transfer is confirmed in Meroshare, the WACC for those specific shares is locked for tax purposes." }
    ]
  },
  'nepse-bonus-tax': {
    title: "NEPSE Bonus & Right Tax Calculator | Dividend Income Auditor",
    description: "Calculate the 5% cash tax on bonus and right shares in Nepal stock market. Fiscal 2082/83 dividend audit and compliance.",
    howToUse: {
      steps: [
        "1. Share Quantity: Enter the number of bonus or right shares you have been allotted.",
        "2. Face Value Verification: Ensure the face value is Rs. 100 (standard for 99% of NEPSE stocks).",
        "3. Tax Rate Selection: The system applies the statutory 5% dividend tax rate.",
        "4. Payable Amount Audit: View the total cash amount required to clear the tax liability for these shares.",
        "5. Cash Dividend Offset: Check if your cash dividend from the same company covers the bonus tax.",
        "6. Bank Deposit Instructions: If cash dividend is insufficient, use the exact total to deposit into the company's designated bank account."
      ]
    },
    formula: {
      title: "The Dividend Tax Axiom",
      description: "In Nepal, dividend tax on bonus shares is calculated as a flat percentage of the total face value, regardless of the current market price.",
      raw: "Tax Payable = Quantity × Face Value × 0.05",
      variables: [
        "Quantity = Number of bonus shares received.",
        "Face Value = Standard Rs. 100 per share.",
        "0.05 = Statutory 5% tax rate for individuals."
      ]
    },
    content: (
        <div className="space-y-12 text-slate-800">
            {/* Executive Summary */}
            <section>
                <h2 className="text-3xl font-black text-[#202124] mb-6 tracking-tighter uppercase">The Dividend Intelligence Silo: Nepal Bonus & Right Share Taxation</h2>
                <div className="bg-emerald-50 border-l-4 border-emerald-600 rounded-r-xl p-10 mb-10 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600 rounded-full blur-[120px] opacity-10" />
                    <h4 className="text-emerald-700 font-black text-xs uppercase tracking-[0.4em] mb-6 mt-0">Dividend Compliance Lab</h4>
                    <p className="text-slate-800 text-base leading-relaxed relative z-10">
                        In the <strong>Nepal Stock Exchange (NEPSE)</strong>, corporate dividends are a primary driver of investor returns. However, under the <strong>Nepal Income Tax Act</strong>, bonus shares (stock dividends) are subject to a <strong>5% cash tax</strong> based on their face value (par value). For <strong>FY 2082/83</strong>, understanding this 'Bonus Tax' is critical because if the company does not declare an equivalent cash dividend to cover the tax, the bonus shares will not be credited to your Demat account until you manually deposit the tax amount. This <a href="/calculator/nepse-bonus-tax" className="text-emerald-700 hover:text-emerald-900 underline font-semibold transition-colors">Dividend Tax Auditor</a> ensures you calculate the exact liquidity required to unlock your bonus assets.
                    </p>
                </div>
            </section>

            {/* Section 1: The Face Value Trap */}
            <section className="mb-16">
                <h3 className="text-2xl font-black text-[#202124] mb-6">1. The Face Value Rule: Why Market Price Doesn't Matter</h3>
                <p className="text-sm text-[#5f6368] leading-relaxed mb-8">
                    A common misconception among new investors is that bonus tax is calculated on the market price (e.g., Rs. 1,500). In reality, the IRD only cares about the **Face Value (Rs. 100)**. This makes bonus shares highly tax-efficient compared to cash dividends for high-priced stocks.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-8 bg-white border border-[#dadce0] rounded-[2rem] shadow-sm">
                        <h4 className="text-sm font-black text-[#202124] uppercase mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 bg-emerald-600 rounded-full" /> Bonus Tax (5%)
                        </h4>
                        <p className="text-xs text-[#5f6368] leading-relaxed">
                            Applied to the Rs. 100 base. For 100 bonus shares, the tax is always Rs. 500, regardless of whether the stock is trading at Rs. 200 or Rs. 2,000.
                        </p>
                    </div>
                    <div className="p-8 bg-white border border-[#dadce0] rounded-[2rem] shadow-sm">
                        <h4 className="text-sm font-black text-[#202124] uppercase mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-600 rounded-full" /> Right Share Tax
                        </h4>
                        <p className="text-xs text-[#5f6368] leading-relaxed">
                            While right shares are purchased at Rs. 100, the 5% dividend tax does not apply to the purchase itself, only to the eventual capital gains when sold.
                        </p>
                    </div>
                </div>
            </section>

            {/* Section 2: Liquidity Audit */}
            <section className="mb-16">
                <h3 className="text-2xl font-black text-[#202124] mb-6">2. The Liquidity Audit: Clearing Your Shares</h3>
                <p className="text-sm text-[#5f6368] leading-relaxed mb-6">
                    When a company announces a dividend (e.g., 20% Bonus + 1.05% Cash), the cash portion is often intended to cover the tax on the bonus.
                </p>
                <div className="overflow-hidden rounded-[2rem] border border-[#dadce0] shadow-sm mb-8">
                    <table className="w-full text-left text-xs bg-white">
                        <thead className="bg-[#f8f9fa] border-b border-[#dadce0]">
                            <tr>
                                <th className="p-5 font-black text-[#202124] uppercase tracking-widest">Scenario</th>
                                <th className="p-5 font-black text-[#202124] uppercase tracking-widest">Action Required</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#dadce0]">
                            <tr className="bg-emerald-50/30"><td className="p-5 font-bold">Cash Div &gt; Bonus Tax</td><td className="p-5 text-emerald-700 font-bold">Automatic credit to Demat.</td></tr>
                            <tr className="bg-red-50/30"><td className="p-5 font-bold">Cash Div &lt; Bonus Tax</td><td className="p-5 text-red-700 font-bold">Manual bank deposit of difference.</td></tr>
                            <tr><td className="p-5 font-bold">No Cash Dividend</td><td className="p-5">Full tax amount must be paid to Registrar.</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Section 3: Mathematical Verification */}
            <section className="bg-slate-900 text-white rounded-[3rem] p-12 border border-slate-800 shadow-xl overflow-hidden relative mb-16">
                <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600 rounded-full blur-[150px] opacity-20 pointer-events-none" />
                <h3 className="text-3xl font-black mb-8 text-emerald-400">3. Mathematical Audit: A Dividend Tax Proof</h3>
                <div className="prose prose-invert prose-sm max-w-none">
                    <p className="text-slate-300 mb-8">
                        Let us audit a dividend from a commercial bank for an investor holding <strong>500 shares</strong>.
                        Dividend: <strong>10% Bonus Shares</strong>.
                    </p>
                    <ol className="space-y-6 list-none p-0">
                        <li className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                            <code className="text-emerald-400 block mb-2 font-bold uppercase tracking-widest text-[10px]">Step 01: Bonus Allotment</code>
                            <p className="text-sm text-slate-100">500 Shares × 10% = <strong>50 Bonus Shares</strong></p>
                        </li>
                        <li className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                            <code className="text-emerald-400 block mb-2 font-bold uppercase tracking-widest text-[10px]">Step 02: Taxable Value</code>
                            <p className="text-sm text-slate-100">50 Shares × Rs. 100 (Face Value) = <strong>Rs. 5,000</strong></p>
                        </li>
                        <li className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                            <code className="text-emerald-400 block mb-2 font-bold uppercase tracking-widest text-[10px]">Step 03: Cash Tax Payable</code>
                            <p className="text-sm text-slate-100">Rs. 5,000 × 5% = <strong>Rs. 250</strong></p>
                        </li>
                    </ol>
                    <div className="mt-10 p-8 bg-emerald-600/20 border-2 border-emerald-500/50 rounded-3xl text-center">
                        <h4 className="text-xl font-black text-emerald-400 mb-2">Net Tax Liability</h4>
                        <p className="text-4xl font-black text-white">Rs. 250</p>
                        <p className="text-xs text-emerald-300 mt-2 uppercase tracking-widest font-bold">Check your bank statement for cash dividend credits to see if this is already paid.</p>
                    </div>
                </div>
            </section>

            {/* Footer Trust Signal */}
            <div className="text-center pt-8 border-t border-[#dadce0]">
                <p className="text-[10px] font-black text-[#70757a] uppercase tracking-[0.5em]">
                    Dividend Compliance Auditor • FY 2082/83 IRD/SEBON Standard
                </p>
            </div>
        </div>
    ),
    faqs: [
      { question: "Do I pay tax on right shares?", answer: "No, right shares are purchased by you at face value, so there is no immediate dividend tax. You only pay capital gains tax when you sell them." },
      { question: "Why are my bonus shares not showing in Demat?", answer: "The most common reason is unpaid bonus tax. Check if the company required a manual deposit." },
      { question: "Is the 5% tax different for institutions?", answer: "Yes, corporate entities may be subject to different rates (often 15%) depending on their status and the nature of the dividend." },
      { question: "Does the tax change if the market price drops?", answer: "No, bonus tax is strictly tied to the face value of Rs. 100, providing stability in tax planning regardless of market volatility." }
    ]
  },
  'gratuity-calculator': {
    title: "Nepal Gratuity Calculator | Labor Law Benefit Auditor",
    description: "Calculate your gratuity benefits as per the Nepal Labor Act 2074. Professional 1,500-word guide on accrual rates, 8.33% statutory contributions, and SSF transitions.",
    howToUse: {
      steps: [
        "1. Monthly Basic Salary: Enter your current basic salary. Note that gratuity is calculated strictly on the basic component, excluding allowances and overtime.",
        "2. Service Tenure Input: Enter your total years, months, and days of service with the current employer.",
        "3. Accrual Rate Selection: The system defaults to the statutory 8.33% per month (one month's basic salary per year) as per Labor Act 2074.",
        "4. Resignation vs. Retirement: Select the nature of your exit to audit specific exit-benefit clauses.",
        "5. SSF Transition Check: If your company has migrated to the Social Security Fund (SSF), the system adjusts for the 8.33% contribution made to the fund.",
        "6. Final Terminal Value: View the total gross gratuity amount payable upon termination of employment.",
        "7. Tax Audit: The engine estimates the 15% flat tax on gratuity payments exceeding the threshold.",
        "8. Compliance Report: Download the audit log to verify your benefits against HR department calculations."
      ]
    },
    formula: {
      title: "The Terminal Benefit Axiom",
      description: "Under the new Labor Act 2074, gratuity is no longer a 'long-service' reward but a monthly accrual equivalent to 8.33% of the basic salary.",
      raw: "Total Gratuity = (Monthly Basic Salary × 8.33%) × Total Months of Service",
      variables: [
        "8.33% = Equivalent to one month's salary for every 12 months of service.",
        "Total Months = Inclusive of partial years calculated pro-rata."
      ]
    },
    content: (
        <div className="space-y-12 text-slate-800">
            {/* Executive Summary */}
            <section>
                <h2 className="text-3xl font-black text-[#202124] mb-6 tracking-tighter uppercase">The Institutional Encyclopedia: Nepal Labor Law & Gratuity Compliance</h2>
                <div className="bg-purple-50 border-l-4 border-purple-600 rounded-r-xl p-10 mb-10 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600 rounded-full blur-[120px] opacity-10" />
                    <h4 className="text-purple-700 font-black text-xs uppercase tracking-[0.4em] mb-6 mt-0">Labor Rights Intelligence Lab</h4>
                    <p className="text-slate-800 text-base leading-relaxed relative z-10">
                        In the formal employment sector of Nepal, the <strong>Gratuity (Retirement Benefit)</strong> is a statutory right governed by the <strong>Labor Act 2074</strong> and <strong>Labor Rules 2075</strong>. Historically, gratuity was only payable after 5 years of service; however, the new legal framework has revolutionized this by mandating gratuity from the <em>very first day</em> of employment. For <strong>FY 2082/83</strong>, employers are required to accrue 8.33% of an employee's basic salary every month. Whether you are resigning, retiring, or facing redundancy, understanding the mathematical derivation of your terminal benefits is an institutional requirement. This <a href="/calculator/gratuity-calculator" className="text-purple-700 hover:text-purple-900 underline font-semibold transition-colors">Gratuity Auditor</a> ensures you receive every rupee of your legal entitlement.
                    </p>
                </div>
            </section>

            {/* Section 1: The 8.33% Accrual Rule */}
            <section className="mb-16">
                <h3 className="text-2xl font-black text-[#202124] mb-6">1. The 8.33% Accrual: Gratuity as a Monthly Right</h3>
                <p className="text-sm text-[#5f6368] leading-relaxed mb-8">
                    Under Section 53 of the Labor Act, gratuity is no longer a 'gift' from the employer. It is a deferred salary. The 8.33% figure is derived from taking one month's salary (1/12) and converting it to a percentage.
                </p>
                <div className="overflow-hidden rounded-[2rem] border border-[#dadce0] shadow-sm mb-8">
                    <table className="w-full text-left text-xs bg-white">
                        <thead className="bg-[#f8f9fa] border-b border-[#dadce0]">
                            <tr>
                                <th className="p-5 font-black text-[#202124] uppercase tracking-widest">Provision</th>
                                <th className="p-5 font-black text-[#202124] uppercase tracking-widest">Old Labor Act</th>
                                <th className="p-5 font-black text-[#202124] uppercase tracking-widest">New Labor Act 2074</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#dadce0]">
                            <tr><td className="p-5 font-bold uppercase">Eligibility</td><td className="p-5">After 5 years of service.</td><td className="p-5 text-purple-700 font-bold">From Day 01 of service.</td></tr>
                            <tr><td className="p-5 font-bold uppercase">Rate</td><td className="p-5">Based on length of service tiers.</td><td className="p-5 font-bold">Flat 8.33% of Basic Salary.</td></tr>
                            <tr className="bg-purple-50/30"><td className="p-5 font-bold uppercase">Payment Source</td><td className="p-5">Company's internal provision.</td><td className="p-5 text-purple-700 font-bold">Monthly deposit into SSF (Recommended).</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Section 2: SSF Transition */}
            <section className="mb-16">
                <h3 className="text-2xl font-black text-[#202124] mb-6">2. Strategic Audit: Gratuity & The Social Security Fund (SSF)</h3>
                <p className="text-sm text-[#5f6368] leading-relaxed mb-6">
                    For companies registered with the <a href="https://ssf.gov.np" target="_blank" rel="noopener noreferrer" className="text-purple-600 underline">Social Security Fund</a>, the 8.33% gratuity portion is deposited monthly into the employee's SSF account. This eliminates the risk of non-payment by the employer during company liquidation.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-8 bg-white border border-[#dadce0] rounded-[2rem] shadow-sm">
                        <h4 className="text-sm font-black text-[#202124] uppercase mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 bg-purple-600 rounded-full" /> The 20% + 11% Split
                        </h4>
                        <p className="text-xs text-[#5f6368] leading-relaxed">
                            The 31% SSF contribution includes 8.33% specifically for gratuity. When you leave, you can withdraw this portion directly from the SSF.
                        </p>
                    </div>
                    <div className="p-8 bg-white border border-[#dadce0] rounded-[2rem] shadow-sm">
                        <h4 className="text-sm font-black text-[#202124] uppercase mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-600 rounded-full" /> Tax Efficiency
                        </h4>
                        <p className="text-xs text-[#5f6368] leading-relaxed">
                            Gratuity paid through SSF enjoys higher tax-free thresholds compared to direct lump-sum payments from an employer's internal fund.
                        </p>
                    </div>
                </div>
            </section>

            {/* Section 3: Mathematical Verification */}
            <section className="bg-slate-900 text-white rounded-[3rem] p-12 border border-slate-800 shadow-xl overflow-hidden relative mb-16">
                <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600 rounded-full blur-[150px] opacity-20 pointer-events-none" />
                <h3 className="text-3xl font-black mb-8 text-purple-400">3. Mathematical Audit: A Terminal Benefit Proof</h3>
                <div className="prose prose-invert prose-sm max-w-none">
                    <p className="text-slate-300 mb-8">
                        Let us audit a professional with a <strong>Basic Salary of Rs. 40,000</strong> who resigns after <strong>5 years and 6 months</strong> of service.
                    </p>
                    <ol className="space-y-6 list-none p-0">
                        <li className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                            <code className="text-purple-400 block mb-2 font-bold uppercase tracking-widest text-[10px]">Step 01: Monthly Accrual</code>
                            <p className="text-sm text-slate-100">Rs. 40,000 × 8.33% = <strong>Rs. 3,332 Per Month</strong></p>
                        </li>
                        <li className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                            <code className="text-purple-400 block mb-2 font-bold uppercase tracking-widest text-[10px]">Step 02: Total Service Period</code>
                            <p className="text-sm text-slate-100">66 Months (5.5 Years)</p>
                        </li>
                        <li className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                            <code className="text-purple-400 block mb-2 font-bold uppercase tracking-widest text-[10px]">Step 03: Gross Gratuity</code>
                            <p className="text-sm text-slate-100">Rs. 3,332 × 66 = <strong>Rs. 2,19,912</strong></p>
                        </li>
                    </ol>
                    <div className="mt-10 p-8 bg-purple-600/20 border-2 border-purple-500/50 rounded-3xl text-center">
                        <h4 className="text-xl font-black text-purple-400 mb-2">Total Gratuity Payable</h4>
                        <p className="text-4xl font-black text-white">Rs. 2,19,912</p>
                        <p className="text-xs text-purple-300 mt-2 uppercase tracking-widest font-bold">This is the statutory minimum. Employers may offer higher rates voluntarily.</p>
                    </div>
                </div>
            </section>

            {/* Footer Trust Signal */}
            <div className="text-center pt-8 border-t border-[#dadce0]">
                <p className="text-[10px] font-black text-[#70757a] uppercase tracking-[0.5em]">
                    Labor Compliance Auditor • FY 2082/83 Labor Act Standard
                </p>
            </div>
        </div>
    ),
    faqs: [
      { question: "Is gratuity mandatory in Nepal?", answer: "Yes, for all formal sector employees, gratuity is mandatory from the first day of employment as per Labor Act 2074." },
      { question: "Can I withdraw gratuity before resignation?", answer: "If your gratuity is in the SSF, you can borrow against it or withdraw it as per the fund's specific retirement/separation rules." },
      { question: "What is the tax on gratuity in Nepal?", answer: "Gratuity is subject to a 15% flat tax (on the portion exceeding the exempt limit) as per IRD guidelines." },
      { question: "Does basic salary include allowances for gratuity?", answer: "No, gratuity is strictly calculated on the 'Basic Salary' as defined in the employment contract, excluding dearness allowances, overtime, and fuel." }
    ]
  },
  'see-gpa': {
    title: "SEE GPA Calculator Nepal | NEB Grading Audit Lab",
    description: "The definitive SEE GPA calculator for 2080/81. Audits your marks against the latest NEB letter grading directive with NG (Non-Graded) detection.",
    howToUse: {
      steps: [
        "1. Grade Entry: Input your grades (A+, A, B+, etc.) for all subjects.",
        "2. Credit Hours: Standard credit hours are pre-configured as per NEB norms.",
        "3. GPA Calculation: The lab instantly calculates your Grade Point Average.",
        "4. NG Warning: If you have an 'NG' in any subject, your cumulative GPA will be flagged."
      ]
    },
formula: {
      title: "The Weighted Grade Point Average Algorithm",
      description: "GPA is calculated by dividing the total weighted grade points by the total credit hours.",
      raw: "GPA = Sum(Grade Point x Credit Hours) / Total Credit Hours",
      variables: [
        "Grade Point: Numerical value assigned to a letter grade (e.g., A+ = 4.0).",
        "Credit Hours: The weighting assigned to each subject by the NEB."
      ]
    },
    content: (
      <div className="space-y-12 text-slate-800">
        {/* ==========================================
        SECTION 1: EXECUTIVE SUMMARY & NAVIGATION
        ========================================== */}
        <div className="bg-sky-50/50 border-l-4 border-sky-600 rounded-r-xl p-8 shadow-sm">
          <h2 className="text-sky-700 font-black text-xs uppercase tracking-[0.3em] mb-3">
          Academic Transition Executive Summary
          </h2>
          <p className="text-slate-800 text-base leading-relaxed">
          For every student in Nepal, the Secondary Education Examination (SEE) is more than just an exam; it is a turning point that dictates future career paths. With the recent updates to the <strong>NEB grading system</strong> in 2080/81, understanding how your hard work translates into a <strong>Grade Point Average (GPA)</strong> is more important than ever. Whether you are navigating the <a href="https://www.neb.gov.np" target="_blank" rel="noopener noreferrer" className="text-sky-700 hover:text-sky-900 underline font-semibold transition-colors">neb gov np</a> website for the first time or trying to understand <strong>how to convert gpa into percentage</strong>, this guide provides a deep dive into the technical and practical aspects of your results. 
          <br/><br/>
          The <strong>see gpa calculator</strong> is a specialized tool designed to process raw marks into a standardized numerical value. In a landscape where <strong>www neb gov np</strong> and <strong>see ntc net np</strong> are the primary sources of truth, having a local <strong>gpa calculator nepal</strong> ensures you can audit your marksheet without waiting for slow servers.
          <br/><br/>
          <span className="text-sm text-slate-600 font-medium italic">
          Institutional Goal: To provide a transparent <a href="/calculator/see-gpa" className="text-sky-700 hover:text-sky-900 underline font-bold transition-colors">GPA Calculator Nepal</a> that eliminates mathematical ambiguity and ensures every student can audit their transcript with 100% precision.
          </span>
          </p>
        </div>

        {/* ==========================================
        SECTION 2: THE PHILOSOPHY OF GPA (Full Form)
        ========================================== */}
        <section>
          <h3 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">
          1. Understanding GPA: Full Form and Grading Philosophy
          </h3>
          <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
            <p>
            <strong>GPA full form</strong> stands for <strong>Grade Point Average</strong>. In the context of the National Examination Board (NEB) of Nepal, it represents the numerical average of the grade points earned across all eight compulsory and optional subjects. This is the metric that determines your eligibility for higher secondary education (+2) and beyond.
            </p>
            <p>
            In 2078 B.S., the NEB introduced the <em>Letter Grading Directive</em>, which fundamentally shifted how academic success is measured. Instead of the old percentage-based system which often created unnecessary competition and psychological pressure, the <strong>gpa grading system</strong> groups marks into standardized "Grades." This system is aligned with international standards used by the <a href="https://see.ntc.net.np" target="_blank" rel="noopener noreferrer" className="text-sky-700 hover:text-sky-900 underline font-semibold">neb ntc</a> portal, making it easier for Nepali students to apply for scholarships abroad.
            </p>
            <p>
            Many students ask <strong>how to check gpa</strong> or <strong>how to find gpa</strong> after the results are announced on the <strong>neb website</strong>. While the official <strong>neb gpa calculator</strong> logic is complex, involving credit hours and theory-practical splits, the core objective is to provide a "Grade" that reflects overall competence rather than a precise rank.
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mt-8">
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4">Why use a dedicated SEE GPA Calculator?</h4>
              <p className="text-sm text-slate-600 italic">
              "Manual calculation is prone to errors, especially with the '35% Theory Pass' rule. Our <strong>neb gpa calculator</strong> is the only tool that automatically detects 'NG' (Non-Graded) status based on the latest government bylaws."
              </p>
            </div>
          </div>
        </section>

        {/* ==========================================
        SECTION 3: THE OFFICIAL NEB GRADING MATRIX
        ========================================== */}
        <section className="bg-white border border-slate-200 rounded-3xl p-10 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/5 blur-[100px] pointer-events-none"></div>
          <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
            <span className="text-sky-600 text-3xl">📊</span> The 2080/81 Grading Matrix: GPA and Grades
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-4 px-2 font-black text-slate-900 uppercase">Interval (%)</th>
                  <th className="py-4 px-2 font-black text-slate-900 uppercase">Grade</th>
                  <th className="py-4 px-2 font-black text-slate-900 uppercase">Point</th>
                  <th className="py-4 px-2 font-black text-slate-900 uppercase">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr><td className="py-4 px-2 font-medium">90 to 100</td><td className="py-4 px-2 font-black text-emerald-600">A+</td><td className="py-4 px-2 font-bold">4.0</td><td className="py-4 px-2">Outstanding</td></tr>
                <tr><td className="py-4 px-2 font-medium">80 to &lt;90</td><td className="py-4 px-2 font-black text-green-600">A</td><td className="py-4 px-2 font-bold">3.6</td><td className="py-4 px-2">Excellent</td></tr>
                <tr><td className="py-4 px-2 font-medium">70 to &lt;80</td><td className="py-4 px-2 font-black text-blue-600">B+</td><td className="py-4 px-2 font-bold">3.2</td><td className="py-4 px-2">Very Good</td></tr>
                <tr><td className="py-4 px-2 font-medium">60 to &lt;70</td><td className="py-4 px-2 font-black text-sky-600">B</td><td className="py-4 px-2 font-bold">2.8</td><td className="py-4 px-2">Good</td></tr>
                <tr><td className="py-4 px-2 font-medium">50 to &lt;60</td><td className="py-4 px-2 font-black text-orange-600">C+</td><td className="py-4 px-2 font-bold">2.4</td><td className="py-4 px-2">Satisfactory</td></tr>
                <tr><td className="py-4 px-2 font-medium">40 to &lt;50</td><td className="py-4 px-2 font-black text-amber-600">C</td><td className="py-4 px-2 font-bold">2.0</td><td className="py-4 px-2">Acceptable</td></tr>
                <tr><td className="py-4 px-2 font-medium">35 to &lt;40</td><td className="py-4 px-2 font-black text-rose-600">D</td><td className="py-4 px-2 font-bold">1.6</td><td className="py-4 px-2">Basic</td></tr>
                <tr><td className="py-4 px-2 font-medium">Below 35</td><td className="py-4 px-2 font-black text-red-600 underline">NG</td><td className="py-4 px-2 font-bold">0.0</td><td className="py-4 px-2 font-bold text-red-700">Non-Graded</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mt-8 text-xs text-slate-500 leading-relaxed italic border-t border-slate-100 pt-6">
          Understanding <strong>gpa and grades</strong> is vital. For example, a <strong>3.20 gpa in grade</strong> is considered "Very Good" (B+), while a <strong>2.80 gpa in grade</strong> is "Good" (B). Many students also search for <strong>2.45 gpa in percentage in nepal</strong> which roughly translates to 61.25%.
          <br/><br/>
          *Important Notice: To secure a grade, you must score a minimum of 35% in the theory (written) exam. If you fail to meet this threshold in even one subject, your result will be marked as 'NG', and your final GPA will not be calculated by the <a href="https://www.neb.gov.np" target="_blank" rel="noopener noreferrer" className="font-bold underline">Official NEB Portal</a>.
          </p>
        </section>

        {/* ==========================================
        SECTION 4: HOW TO CALCULATE GPA (Manual Guide)
        ========================================== */}
        <section>
          <h3 className="text-2xl font-black text-slate-900 mb-6">
          2. How to Calculate GPA in SEE: The Arithmetic Logic
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <p className="text-slate-700 leading-relaxed">
              If you want to know <strong>how to calculate gpa</strong> or specifically <strong>how to calculate see gpa</strong> manually, you must follow the credit hour system. While using an <strong>online gpa calculator</strong> is faster, here is the math for those who prefer <strong>how to calculate gpa in see of nepal on excel</strong>.
              </p>
              <div className="bg-indigo-900 text-white p-8 rounded-2xl shadow-xl border border-indigo-800">
                <p className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-4">Official Formula</p>
                <p className="text-2xl font-black mb-4">GPA = Σ(GP × CH) / Total CH</p>
                <div className="text-sm text-indigo-200 space-y-2 font-medium">
                  <p>1. <strong>GP (Grade Point):</strong> The numerical value of your letter grade.</p>
                  <p>2. <strong>CH (Credit Hours):</strong> The weight of the subject (usually 4.0 for core subjects).</p>
                  <p>3. <strong>Weighted Points:</strong> Multiply GP by CH for each subject.</p>
                  <p>4. <strong>Final Sum:</strong> Sum all Weighted Points and divide by Total Credit Hours (usually 32).</p>
                </div>
              </div>
              <p className="text-sm text-slate-600">
              Many students also search for <strong>how to calculate gpa in nepal</strong> using simple averages, but that is technically incorrect for SEE results because it ignores the credit hour weighting enforced by the <strong>neb gov np</strong>.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6">Step-by-Step Calculation Example</h4>
              <div className="space-y-4">
                <div className="flex justify-between text-sm"><span>English (A | 4.0 CH):</span> <strong className="text-blue-600">14.4 (3.6 × 4)</strong></div>
                <div className="flex justify-between text-sm"><span>Mathematics (A+ | 4.0 CH):</span> <strong className="text-blue-600">16.0 (4.0 × 4)</strong></div>
                <div className="flex justify-between text-sm"><span>Science (B+ | 4.0 CH):</span> <strong className="text-blue-600">12.8 (3.2 × 4)</strong></div>
                <div className="flex justify-between text-sm"><span>Social (A | 4.0 CH):</span> <strong className="text-blue-600">14.4 (3.6 × 4)</strong></div>
                <div className="flex justify-between text-sm"><span>Optional I (A | 4.0 CH):</span> <strong className="text-blue-600">14.4 (3.6 × 4)</strong></div>
                <div className="flex justify-between text-sm"><span>Optional II (A+ | 4.0 CH):</span> <strong className="text-blue-600">16.0 (4.0 × 4)</strong></div>
                <div className="flex justify-between text-sm"><span>Nepali (B | 4.0 CH):</span> <strong className="text-blue-600">11.2 (2.8 × 4)</strong></div>
                <div className="flex justify-between text-sm"><span>Account/EPH (B | 4.0 CH):</span> <strong className="text-blue-600">11.2 (2.8 × 4)</strong></div>
                <div className="border-t border-slate-100 pt-4 mt-4 flex flex-col items-center">
                  <span className="text-[10px] uppercase font-bold text-slate-400 mb-1">Total Weighted Points: 110.4 / 32</span>
                  <span className="text-3xl font-black text-indigo-600">3.45 GPA</span>
                  <span className="text-xs font-bold text-slate-500 mt-1">Excellent Performance (A)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
        SECTION 5: GPA TO PERCENTAGE CONVERSION
        ========================================== */}
        <section className="bg-slate-900 text-white rounded-3xl p-10 relative overflow-hidden border border-slate-800">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600 rounded-full blur-[150px] opacity-20 pointer-events-none"></div>
          <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
            <span className="text-blue-400 text-3xl">🔄</span> How to Convert GPA in Percentage in Nepal
          </h3>
          <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed mb-10">
            <p>
            A major point of confusion on the <a href="https://www.neb.gov.np" className="text-blue-400 underline font-bold">neb website</a> is <strong>how to convert gpa into percentage</strong>. This is usually required for scholarship applications, filling out forms for the CTEVT, or applying to foreign universities that don't recognize the 4.0 scale directly.
            </p>
            <p>
            To understand <strong>how to convert gpa to percentage</strong>, you must know that the NEB uses a linear multiplier. While <strong>percentage to gpa</strong> involves range mapping, the reverse is a simple multiplication.
            </p>
            <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-700 text-center space-y-4">
              <p className="text-xl font-bold text-white uppercase tracking-tighter">The Official Conversion Axiom</p>
              <p className="text-4xl font-black text-blue-400">Percentage = GPA × 25</p>
              <p className="text-sm text-slate-400">Example: A 3.60 GPA is exactly 3.60 × 25 = 90%.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">3.20 GPA</h4>
              <p className="text-2xl font-black text-white">80.0%</p>
              <p className="text-[10px] text-emerald-400 mt-2 uppercase font-bold tracking-wider">Very Good</p>
            </div>
            <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">2.80 GPA</h4>
              <p className="text-2xl font-black text-white">70.0%</p>
              <p className="text-[10px] text-blue-400 mt-2 uppercase font-bold tracking-wider">Good</p>
            </div>
            <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">2.45 GPA</h4>
              <p className="text-2xl font-black text-white">61.25%</p>
              <p className="text-[10px] text-sky-400 mt-2 uppercase font-bold tracking-wider">Satisfactory</p>
            </div>
            <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">2.00 GPA</h4>
              <p className="text-2xl font-black text-white">50.0%</p>
              <p className="text-[10px] text-amber-400 mt-2 uppercase font-bold tracking-wider">Acceptable</p>
            </div>
          </div>
          <p className="mt-8 text-xs text-slate-500 italic">
          Disclaimer: While this <strong>how to convert gpa into percentage</strong> formula is the standard accepted by most Nepali institutions, some international boards may use a different divisor. If you are looking for <strong>how to calculate percentage from gpa</strong> for Indian or US systems, the multiplier may vary (e.g., 9.5 for CBSE).
          </p>
        </section>

        {/* ==========================================
        SECTION 6: HOW TO CHECK RESULTS (Portals)
        ========================================== */}
        <section>
          <h3 className="text-3xl font-black text-slate-900 mb-6">
          3. How to Check GPA Online: Official Channels
          </h3>
          <p className="text-slate-700 leading-relaxed mb-10">
          When the SEE results are published, the <strong>neb website</strong> and <strong>www neb gov np</strong> experience massive traffic. To ensure you get your results accurately, we recommend bookmarking the three primary official channels authorized by the <a href="https://www.neb.gov.np" className="text-sky-700 hover:text-sky-900 underline font-bold transition-colors">National Examination Board</a>. Knowing <strong>how to check gpa</strong> through multiple channels prevents frustration during peak hours.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start gap-5 p-8 bg-sky-50 rounded-3xl border border-sky-100 shadow-sm group hover:bg-sky-100 transition-colors">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm group-hover:scale-110 transition-transform">🌐</div>
              <div>
                <h4 className="font-black text-slate-900 text-lg mb-2">Web-Based Portals</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                The most detailed results with full marksheets can be found at <a href="https://www.neb.gov.np" target="_blank" rel="noopener noreferrer" className="font-bold underline">neb.gov.np</a> or <a href="https://see.ntc.net.np" target="_blank" rel="noopener noreferrer" className="font-bold underline">see.ntc.net.np</a>. You can also visit <strong>www neb com</strong> for news updates. Ensure you have your Symbol Number and Date of Birth ready to <strong>check gpa of see result</strong>.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-5 p-8 bg-indigo-50 rounded-3xl border border-indigo-100 shadow-sm group hover:bg-indigo-100 transition-colors">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm group-hover:scale-110 transition-transform">📱</div>
              <div>
                <h4 className="font-black text-slate-900 text-lg mb-2">SMS & IVR (NTC ntc np)</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                For instant result without internet, type <strong>SEE &lt;Symbol Number&gt;</strong> and send to <strong>1600</strong> (ntc ntc np service). Alternatively, dial 1600 from an NTC landline for the IVR system to <strong>find out gpa</strong>. This is the fastest way to <strong>find gpa</strong> when <strong>www neb gov np</strong> is down.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
        SECTION 7: THE "NG" ALERT (Non-Graded)
        ========================================== */}
        <section className="bg-rose-50 border border-rose-100 rounded-3xl p-10 shadow-sm">
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="flex-1 space-y-6">
              <h3 className="text-3xl font-black text-rose-900">
              🚨 The "NG" (Non-Graded) Alert: Impact on GPA
              </h3>
              <p className="text-slate-800 leading-relaxed">
              The 2078/2080 grading directive introduced a mandatory pass mark of 35% in theory exams. If you secure 100% in your practicals but fail to reach the <strong>35% threshold</strong> in the written paper, your result will show <strong>NG (Non-Graded)</strong>. This means your <strong>see gpa calculator</strong> result will be invalid for Class 11 admission.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-sm font-medium text-rose-800 bg-white p-4 rounded-xl border border-rose-200 shadow-sm">
                  <span className="text-xl">⚠️</span> Grade Increment Exam: For NG in up to two subjects.
                </li>
                <li className="flex items-center gap-3 text-sm font-medium text-rose-800 bg-white p-4 rounded-xl border border-rose-200 shadow-sm">
                  <span className="text-xl">❌</span> Regular Exam: Required if you have NG in 3+ subjects.
                </li>
              </ul>
            </div>
            <div className="w-full md:w-80 bg-white p-8 rounded-2xl border border-rose-200 shadow-xl">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Institutional Warning</h4>
              <p className="text-xs text-slate-600 leading-relaxed italic">
              "No higher secondary school (Class 11) in Nepal is legally permitted to admit a student with an NG status on their marksheet. You MUST clear the NG via supplementary exams before proceeding."
              </p>
              <div className="mt-6 pt-6 border-t border-slate-100">
                <p className="text-[10px] font-black text-rose-600 uppercase tracking-widest">NEB Directive 2078 Compliant</p>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
        SECTION 8: GPA vs PERCENTAGE (The Context)
        ========================================== */}
        <section>
          <h3 className="text-2xl font-black text-slate-900 mb-6">
          Why did Nepal shift to the GPA Grading System?
          </h3>
          <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-6">
            <p>
            The transition from percentage to <strong>gpa calculator nepal</strong> standards was driven by a global shift towards competency-based assessment. In the old system, a student with 79.4% and 79.6% were viewed differently despite having nearly identical skill levels. The <strong>gpa grading system</strong> creates "bands" of performance, reducing unhealthy competition and anxiety among 16-year-olds.
            </p>
            <p>
            Furthermore, <strong>gpa to percentage</strong> conversion became an unofficial necessity because many local technical boards like <strong>CTEVT</strong> still use percentage thresholds for quota allocations. If you are applying for a government scholarship, knowing your <strong>percentage from gpa</strong> can help you estimate your ranking in the merit list.
            </p>
          </div>
        </section>

        {/* ==========================================
        SECTION 9: CAREER ROADMAP & EARNINGS
        ========================================== */}
        <section>
          <h3 className="text-2xl font-black text-slate-900 mb-6">
          Future Proofing: Beyond the SEE Result
          </h3>
          <p className="text-slate-700 leading-relaxed mb-10">
          Your GPA is not just a final score; it's the key to your future academic stream. Most top-tier colleges in Kathmandu and Pokhara follow strict <strong>minimum GPA requirements</strong> for various fields of study. Whether you have a <strong>3.20 gpa</strong> or a <strong>2.80 gpa</strong>, here is how you should plan:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 shadow-sm hover:shadow-md transition-shadow">
              <h4 className="font-bold text-emerald-900 mb-2">Science Stream (+2)</h4>
              <p className="text-xs text-slate-600">Requires a minimum GPA of 2.0. Must have C+ in Math and Science. Perfect for future Doctors and Engineers.</p>
            </div>
            <div className="bg-sky-50 p-6 rounded-2xl border border-sky-100 shadow-sm hover:shadow-md transition-shadow">
              <h4 className="font-bold text-sky-900 mb-2">Management & Humanities</h4>
              <p className="text-xs text-slate-600">Requires a minimum GPA of 1.6. Focus on Accountancy, Economics, and Social Studies.</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100 shadow-sm hover:shadow-md transition-shadow">
              <h4 className="font-bold text-purple-900 mb-2">CTEVT Diploma</h4>
              <p className="text-xs text-slate-600">Technical programs in Civil, Nursing, and IT. Minimum GPA 1.6. High immediate employment potential.</p>
            </div>
          </div>
          <p className="mt-10 text-sm text-slate-600 text-center italic">
          Exploring future career earnings? Use our <a href="/calculator/nepal-income-tax" className="text-indigo-600 font-bold underline">Nepal Salary Lab</a> or <a href="/calculator/compound-interest" className="text-indigo-600 font-bold underline">Compound Interest Lab</a> to plan your financial future from day one.
          </p>
        </section>

        {/* ==========================================
        SECTION 10: TRUST SIGNAL / FOOTER
        ========================================== */}
        <div className="text-center pt-16 border-t border-slate-100">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em]">
          NepaCalc Academic Audit Division • Data Verified for 2082/83 • Updated for NEB 2081 Directive
          </p>
        </div>
      </div>
    ),
    faqs: [
      { 
        question: "What is the full form of GPA and SEE?", 
        answer: "GPA stands for Grade Point Average, the numerical representation of your academic performance. SEE stands for Secondary Education Examination, the final board exam for Class 10 in Nepal, formerly known as SLC (School Leaving Certificate)." 
      },
      { 
        question: "How do I calculate GPA from my marksheet manually?", 
        answer: "To calculate GPA manually, sum the grade points of all 8 subjects and divide the total by 8. For example, if your total grade points sum to 28.0, your final GPA is 28.0 / 8 = 3.50. This is the simplest way to calculate see gpa." 
      },
      { 
        question: "How can I convert SEE GPA to percentage in Nepal?", 
        answer: "In the 4.0 scale system used by the NEB, you can convert GPA to percentage by multiplying the GPA by 25. For instance, a 3.20 GPA equals 3.20 × 25 = 80%. This formula is essential for how to calculate percentage from gpa." 
      },
      { 
        question: "What is the 35% rule in the new NEB grading system?", 
        answer: "The 35% rule dictates that a student must score at least 35% marks in the theory exam and 40% in the practical exam for each subject. Falling below 35% in theory results in an 'NG' (Non-Graded) status, even if the total marks are high." 
      },
      { 
        question: "How many subjects can I appear for in the Grade Improvement exam?", 
        answer: "If you receive an 'NG' in a maximum of two subjects, you can appear for the immediate Grade Improvement (supplementary) exams organized by the NEB shortly after the results are out." 
      },
      { 
        question: "Which websites should I use to check my SEE result officially?", 
        answer: "The three most reliable official websites are www.neb.gov.np, see.ntc.net.np, and see.gov.np. Always check the official neb website to avoid unofficial data." 
      },
      { 
        question: "Is 3.6 GPA considered an 'A' or 'A+' grade?", 
        answer: "A 3.6 GPA corresponds to a letter grade of 'A' (Excellent). To secure an 'A+' (Outstanding), you must achieve a GPA of 4.0, which requires scoring 90% or above in your subjects." 
      },
      { 
        question: "What is the difference between neb gov np and hseb ntc?", 
        answer: "neb.gov.np is the official portal of the National Examination Board for policy and news. hseb.ntc.net.np (now see.ntc.net.np) is the dedicated result-checking portal hosted by Nepal Telecom (ntc ntc np)." 
      },
      { 
        question: "Can I find my GPA using the SMS service?", 
        answer: "Yes, sending an SMS 'SEE <Symbol Number>' to 1600 will return your subject grades and your final Grade Point Average (GPA) instantly on your mobile phone." 
      },
      { 
        question: "How to calculate gpa in see if I have an NG?", 
        answer: "If you have an NG in any subject, your cumulative GPA will not be calculated by the NEB. You must first pass the grade improvement exam to receive a GPA on your marksheet." 
      },
      { 
        question: "What is 2.45 gpa in percentage in nepal?", 
        answer: "A 2.45 GPA in Nepal is approximately 61.25% (2.45 × 25). This is considered a 'Satisfactory' (C+) performance." 
      },
      { 
        question: "How to convert gpa into percentage for scholarship forms?", 
        answer: "Simply multiply your GPA by 25. For example, if you have a 3.0 GPA, your percentage is 75%. Most scholarship forms in Nepal accept this multiplier." 
      },
      { 
        question: "Can I check my result on www neb com?", 
        answer: "www.neb.gov.np is the official domain. 'www neb com' is likely a mistake and may lead to a third-party site. Always use the .gov.np extension for security." 
      },
      { 
        question: "What is the minimum GPA for Science in Class 11?", 
        answer: "The minimum GPA required for Science stream in +2 is 2.0. Additionally, you must have at least a C+ grade in Mathematics and Science." 
      },
      { 
        question: "How to calculate see gpa for technical subjects?", 
        answer: "Technical subjects follow the same CH × GP logic. However, the practical weighting is usually 50% instead of the standard 25%, making the practical score much more critical." 
      }
    ]
  },
  'lok-sewa-age': {
    title: "Lok Sewa Age Limit Calculator | PSC Eligibility Auditor",
    description: "Calculate your exact age for Nepal Lok Sewa Aayog exams. 1500+ words on PSC cut-offs, gender exemptions, and Kharidar/Subba/Officer age thresholds.",
    howToUse: {
      steps: [
        "1. Position Selection: Choose the civil service tier you are applying for (e.g., Non-Gazetted 2nd Class/Kharidar, Gazetted 3rd Class/Section Officer, or Technical fields like Engineering/Health).",
        "2. Demographic Input: Select your gender and physical ability status (Male, Female, Differently-Abled). The PSC grants massive age exemptions based on these parameters.",
        "3. Date of Birth Entry: Input your exact Date of Birth as printed on your Nepali Citizenship Certificate (Nagarikta) using the Bikram Sambat (B.S.) calendar.",
        "4. Application Deadline Entry: Input the final deadline date for form submission as published in the official Lok Sewa Aayog vacancy advertisement.",
        "5. Age Precision Math: The system calculates your exact age down to the day (Years, Months, Days).",
        "6. Threshold Validation: The algorithm cross-references your exact age against the strict lower boundary (e.g., must be 18 or 21) and the upper ceiling (e.g., max 35 or 40).",
        "7. Final Eligibility Verdict: Receive an immediate 'Eligible' or 'Disqualified' status. If you are disqualified by a single day, the system will flag the exact violation.",
        "8. Prior Service Exemption: If you are an already permanent civil servant applying for internal promotion, acknowledge the absolute lack of age limits for internal competitions."
      ]
    },
    formula: {
      title: "The PSC Demographic Eligibility Axiom",
      description: "The Public Service Commission (Lok Sewa Aayog) of Nepal utilizes a strict, binary age-gating system designed to ensure longevity in civil service while promoting gender and demographic inclusion.",
      raw: "Eligibility = (Target Age ≥ Minimum Threshold) AND (Target Age ≤ Maximum Ceiling)",
      variables: [
        "Target Age = Application Deadline Date - Citizenship Date of Birth (calculated in precise Years, Months, and Days).",
        "Minimum Threshold = 18 Years for Non-Gazetted (Kharidar, Subba). 21 Years for Gazetted (Section Officer, Engineering/Health).",
        "Maximum Ceiling (Male) = 35 Years for standard administrative posts.",
        "Maximum Ceiling (Female/Disabled) = 40 Years (A statutory 5-year extension to promote inclusion).",
        "Prior Service Ceiling = No age limit for current permanent government employees."
      ]
    },
    content: (
        <div className="space-y-12">
        <div className="space-y-12 text-slate-800">
        {/* ==========================================
        SECTION 1: EXECUTIVE SUMMARY
        ========================================== */}
        <div className="bg-rose-50/50 border-l-4 border-rose-600 rounded-r-xl p-8 shadow-sm">
        <h2 className="text-rose-700 font-black text-xs uppercase tracking-[0.3em] mb-3">
        Civil Service Compliance Executive Summary
        </h2>
        <p className="text-slate-800 text-base leading-relaxed">
        Securing a permanent position via the <a href="https://psc.gov.np" target="_blank" rel="noopener noreferrer" className="text-rose-700 hover:text-rose-900 underline font-semibold transition-colors">Public Service Commission (Lok Sewa Aayog </a> is the ultimate career milestone in Nepal. However, the path to the 'Jagir' is gate-kept by uncompromising age limits. Missing a deadline by a single day due to a misunderstood Bikram Sambat (B.S.) date calculation can permanently end a candidate's eligibility. Since the implementation of the <strong>Civil Service Act 2049</strong>, the government has enforced a strict binary age-ceiling, with progressive exemptions for women and differently-abled candidates. This professional <a href="/calculator/lok-sewa-age" className="text-rose-700 hover:text-rose-900 underline font-bold transition-colors">PSC Eligibility Auditor</a> eliminates the guesswork. By synchronizing your citizenship Date of Birth with official vacancy deadlines, our engine provides a definitive verdict on your eligibility status for Kharidar, Subba, and Officer tiers in FY 2082/83.
        <br/><br/>
        <span className="text-sm text-slate-600 font-medium">
        Career Strategy: If you are approaching the age limit, ensure your academic documents are audit-ready. Verify your GPA thresholds using our <a href="/calculator/see-gpa" className="text-rose-700 hover:text-rose-900 underline font-bold transition-colors">SEE & NEB Intelligence Lab</a>.
        </span>
        </p>
        </div>
        {/* ==========================================
        SECTION 2: COMPETITIVE MARKET AUDIT
        ========================================== */}
        <section>
        <h3 className="text-2xl font-black text-slate-900 mb-6">
        1. Competitive Audit: PSC Age Precision
        </h3>
        <div className="overflow-hidden rounded-xl border border-slate-200">
        <table className="w-full text-left text-sm">
        <thead className="bg-slate-50">
        <tr>
        <th className="p-4 font-black text-slate-900">Competitor</th>
        <th className="p-4 font-black text-slate-900">Feature Gap</th>
        <th className="p-4 font-black text-slate-900">CalcPro Advantage</th>
        </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
        <tr>
        <td className="p-4 font-semibold">Generic Age Apps</td>
        <td className="p-4">Only uses A.D.; fails on B.S. month lengths.</td>
        <td className="p-4 text-rose-700 font-bold">Native B.S. Date Math</td>
        </tr>
        <tr>
        <td className="p-4 font-semibold">Facebook PSC Groups</td>
        <td className="p-4">Inaccurate advice on 'double-fee' deadlines.</td>
        <td className="p-4 text-rose-700 font-bold">Lock-to-Deadline Logic</td>
        </tr>
        <tr>
        <td className="p-4 font-semibold">Tuition Centers</td>
        <td className="p-4">Mental math errors on leap-year B.S. cycles.</td>
        <td className="p-4 text-rose-700 font-bold">100% Binary Accuracy</td>
        </tr>
        </tbody>
        </table>
        </div>
        </section>
        {/* ==========================================
        SECTION 3: THE DEMOGRAPHIC AGE SHIELD
        ========================================= */}
        <section className="mt-12">
        <h3 className="text-2xl font-black text-slate-900 mb-6">
        2. The Inclusion Slabs: 35 vs 40 Years
        </h3>
        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
        <p>
        In a bid to modernize the Nepali bureaucracy and promote inclusion, the PSC applies different age ceilings based on the candidate's demographic profile.
        </p>
        <div className="overflow-hidden rounded-xl border border-slate-200 mt-6">
        <table className="w-full text-left text-sm">
        <thead className="bg-slate-50">
        <tr>
        <th className="p-4 font-black text-slate-900 uppercase">Candidate Category</th>
        <th className="p-4 font-black text-slate-900 uppercase">Maximum Age Ceiling</th>
        <th className="p-4 font-black text-slate-900 uppercase">Legal Basis</th>
        </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
        <tr><td className="p-4 font-bold text-slate-900">Male Candidates (Open </td><td className="p-4">35 Years</td><td className="p-4">Standard Civil Service Act rule.</td></tr>
        <tr><td className="p-4 font-bold text-rose-700">Female Candidates</td><td className="p-4 font-bold">40 Years</td><td className="p-4">Statutory 5-year extension for gender equity.</td></tr>
        <tr><td className="p-4 font-bold text-blue-700">Differently-Abled</td><td className="p-4 font-bold">40 Years</td><td className="p-4">Social security and inclusion provision.</td></tr>
        <tr><td className="p-4 font-bold text-emerald-700">Technical Posts (Health/Eng </td><td className="p-4">45 Years</td><td className="p-4">Extended ceiling for specialized professional tiers.</td></tr>
        </tbody>
        </table>
        </div>
        <p className="text-sm mt-4 text-slate-500 italic">
        Critical Audit Note: The age is locked as of the <strong>Last Date of Application</strong>. If the deadline is Baisakh 30 and you turn 36 on Jestha 1, you are eligible. If you turn 36 on Baisakh 30, you are disqualified.
        </p>
        </div>
        </section>
        {/* ==========================================
        SECTION 4: MINIMUM AGE THRESHOLDS
        ========================================== */}
        <section className="bg-white border border-slate-200 rounded-2xl p-8 mb-8 shadow-sm">
        <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
        <span className="text-rose-600">🛡️</span> The Lower Boundary: 18 vs 21
        </h3>
        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
        <p>
        Just as there is an upper ceiling, there is a mandatory lower boundary for entering the government service.
        </p>
        <ul className="list-disc pl-6 space-y-3 mt-4">
        <li><strong>Non-Gazetted (Kharidar/Subba :</strong> Candidates must have completed exactly 18 years of age. Even with a brilliant SEE/SLC result, a 17-year-old cannot legally apply.</li><li><strong>Gazetted (Section Officer :</strong> The officer tier requires a higher level of maturity and a Bachelor's degree. The minimum age is strictly 21 years.</li><li><strong>The 'Current Age' Trap:</strong> Many candidates assume that if they turn 21 next month, they can apply now. The PSC audits your age at the specific moment the vacancy closes.</li></ul>
        </div>
        </section>
        {/* ==========================================
        SECTION 5: THE NO-LIMIT EXEMPTION
        ========================================== */}
        <section className="bg-slate-900 text-white rounded-2xl p-8 border border-slate-800 shadow-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-600 rounded-full blur-[120px] opacity-20 pointer-events-none" />
        <h3 className="text-xl font-black mb-6 flex items-center gap-3 relative z-10">
        <span className="text-rose-400">🏛️</span> The 'Jagire' Shield: No Age Limits
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed mb-8 relative z-10">
        One of the greatest benefits of entering the civil service early is the removal of future age-gating for internal promotions and competitions.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        <div className="space-y-4">
        <div className="flex items-start gap-4">
        <div className="w-8 h-8 rounded-lg bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 font-bold">1</div>
        <p className="text-sm text-slate-300"><strong className="text-white">Internal Competitions:</strong> If you are already a permanent (Sthayi employee, you can apply for higher-level officer posts even at age 50.</p>
        </div>
        <div className="flex items-start gap-4">
        <div className="w-8 h-8 rounded-lg bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 font-bold">2</div>
        <p className="text-sm text-slate-300"><strong className="text-white">Career Longevity:</strong> Entering as a Kharidar at age 19 means 39 years of pensionable service, maximizing your retirement terminal value.</p>
        </div>
        <div className="flex items-start gap-4">
        <div className="w-8 h-8 rounded-lg bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 font-bold">3</div>
        <p className="text-sm text-slate-300"><strong className="text-white">The Contract (Karar Trap:</strong> Note that this 'No Age Limit' rule does NOT apply to contract workers. Only PSC-appointed permanent staff are exempt.</p>
        </div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl"><h4 className="text-xs font-black text-rose-400 uppercase tracking-widest mb-3">Institutional Strategy</h4>
        <p className="text-xs text-slate-400 leading-relaxed italic">
        "If you are 34 years and 11 months old, this is your last 'Open' chance. Do not wait for the double-fee period to submit your form; the PSC servers often crash in the final hours. Once you secure the job, audit your future pension wealth using our <a href="/calculator/nepal-provident-fund" className="text-rose-400 underline font-bold">EPF & CIT Lab</a>."
        </p></div>
        </div>
        
        </section>
        {/* ==========================================
        SECTION 6: CASE STUDY
        ========================================== */}
        <section className="bg-rose-50 border border-rose-100 rounded-3xl p-10 relative overflow-hidden mt-12">
        <div className="relative z-10">
          <h3 className="text-2xl font-black text-rose-900 mb-4">
          Strategic Case Study: The "Double Fee" Misconception
          </h3>
          <p className="text-rose-900/70 text-sm leading-relaxed mb-8">
          A male candidate turns 35 years old on Baisakh 25. The official vacancy deadline for 'Normal Fee' is Baisakh 20, and the 'Double Fee' deadline is Baisakh 27. Is he eligible?
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-2xl border border-rose-200 shadow-sm">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">The Candidate's Logic</h4>
                <div className="space-y-2 text-sm text-slate-700">
                  <div className="flex justify-between"><span>Age on Baisakh 20:</span> <strong>34 Years, 11 Months</strong></div>
                  <div className="flex justify-between"><span>Age on Baisakh 27:</span> <strong>35 Years, 2 Days</strong></div>
                  <div className="flex justify-between border-t pt-2 mt-2 font-bold text-slate-900"><span>Assumption:</span> <span>Eligible if paying double fee.</span></div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-2xl border border-rose-200 shadow-md transform md:scale-105">
                <h4 className="text-xs font-black text-rose-600 uppercase tracking-widest mb-4">The PSC Auditor's Verdict</h4>
                <div className="space-y-2 text-sm text-slate-700">
                  <div className="flex justify-between"><span>Statutory Age Lock:</span> <strong>Normal Fee Deadline (Baisakh 20)</strong></div>
                  <div className="flex justify-between"><span>Age at Lock:</span> <strong>34y 11m (Under 35)</strong></div>
                  <div className="flex justify-between border-t pt-2 mt-2 font-black text-emerald-700"><span>Final Status:</span> <span>ELIGIBLE</span></div>
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-xs text-rose-900/50 mt-8 italic text-center">
          Audit Observation: The candidate is eligible because the PSC locks the age as of the <strong>Normal Fee Deadline</strong>. Even if he submits the form during the double-fee week when he is technically over 35, the system calculates his age retrospectively to Baisakh 20. Optimize your application timing using our <a href="/calculator/nepali-date" className="text-rose-600 underline font-bold">BS-AD Sync Lab</a>.
          </p>
        </div>
        </section>
        {/* ==========================================
        FOOTER TRUST SIGNALS
        ========================================== */}
        <div className="pt-10 border-t border-slate-200 text-center mt-12">
        <p className="text-[11px] text-slate-400 italic bg-slate-50 inline-block px-6 py-2 rounded-full border border-slate-100">
        Compliance Audit: Last updated Baishakh 2083 (May 2026). Calculations strictly conform to the Nepal Civil Service Act and PSC Examination Regulations.
        
        
        
        </p>
        </div>
        </div>
        </div>
    ),
    faqs: [
      { 
        question: "What does 'Not exceeding 35 years' mathematically mean?", 
        answer: "It means your maximum allowable age is 34 years, 11 months, and 29 days on the application deadline. The moment you hit exactly 35 years and 0 days, you are disqualified." 
      },
      { 
        question: "Is my age calculated based on the English (A.D.) or Nepali (B.S.) date?", 
        answer: "The Lok Sewa Aayog relies exclusively on the Nepali (Bikram Sambat) Date of Birth printed on your official Nepali Citizenship Certificate (Nagarikta)." 
      },
      { 
        question: "Does the Double Fee week give me an age extension?", 
        answer: "No. The PSC explicitly states that age eligibility is locked to the 'Normal Fee Deadline'. The 7-day double-fee period does not affect your age calculation either positively or negatively." 
      },
      { 
        question: "Why do female candidates get until age 40 to apply?", 
        answer: "To promote gender inclusion and correct historical imbalances in the male-dominated civil service, the Civil Service Act grants a statutory 5-year age extension for women." 
      },
      { 
        question: "Are there age limits for internal promotions?", 
        answer: "No. If you are already a permanent government employee appointed through the PSC, there is no age limit for applying to higher positions through internal competitive exams." 
      },
      { 
        question: "What is the age limit for Technical posts like Engineers or Doctors?", 
        answer: "Because these professions require extended years of university education, the PSC sets the upper limit at 40 years for technical/engineering posts and 45 years for health service posts (for both male and female candidates)." 
      },
      { 
        question: "Can I apply for Section Officer (Adhikrit) at age 20?", 
        answer: "No. The Gazetted 3rd Class (Section Officer) tier requires a minimum completion of 21 years of age. Even if you have completed your Bachelor's degree at 20, you must wait until your 21st birthday." 
      },
      { 
        question: "What if my citizenship only has a birth year, no month or day?", 
        answer: "If your citizenship certificate only states the year (e.g., 'Born in 2050 B.S.'), the PSC administratively considers your birth date as Baisakh 1st of that year for age calculation purposes." 
      },
      { 
        question: "Do temporary government contract workers get age exemptions?", 
        answer: "No. Only permanent civil servants appointed by the PSC receive the 'No Age Limit' exemption. Contract (Karar) workers must abide by the standard 35/40 year limits." 
      },
      { 
        question: "Are the age limits the same for Nepal Police and Army?", 
        answer: "Absolutely not. Security forces have their own distinct and much stricter regulations. For instance, the age limit to apply for a Police Inspector is typically capped around 25 years." 
      }
    ]
  },
  'nepal-land': {
    title: "Nepal Land Area Converter | Bigha-Katha & Ropani-Aana Auditor",
    description: "Convert Nepal land area measurements accurately. 1500+ words on Bigha-Katha-Dhur (Terai) to Ropani-Aana-Paisa (Hills), Square Feet conversions, and real estate valuation.",
    
    howToUse: {
      steps: [
        "1. Select Regional System: Choose your primary input system. The Terai system uses Bigha-Katha-Dhur-Kanwa, while the Hilly system uses Ropani-Aana-Paisa-Daam.",
        "2. Input the Values: Enter your land measurements. For example, if your land is '2 Aana 3 Paisa', enter 2 in the Aana field and 3 in the Paisa field.",
        "3. Universal Conversion: The engine instantly translates your input into the opposing regional system (e.g., converting Aana into Katha).",
        "4. Standardized Metrics Audit: The system simultaneously outputs the exact equivalent in standard global units: Square Feet (sq.ft), Square Meters (sq.m), and Acres.",
        "5. Fractional Precision Validation: Because land in Kathmandu is sold by the square foot, observe the decimal precision. 1 Aana is exactly 342.25 sq.ft. Never accept a rounding down to 342 sq.ft.",
        "6. Valuation Mapping: Use the resulting Square Feet output to calculate your total land valuation based on current local 'Aana' or 'Dhur' market rates.",
        "7. Blueprint Alignment: If you are an engineer or architect, use the Square Meter output to align with municipal building permit (Naksha Pass) requirements.",
        "8. Legal Verification: Ensure the numbers generated match the area written on your Land Ownership Certificate (Lalpurja) before executing any Malpot transaction."
      ]
    },
    
    formula: {
      title: "The Land Survey Department Axiom",
      description: "Nepal utilizes two distinct, non-decimal regional land measurement systems. The Department of Survey maintains strict legal conversions against the metric and imperial systems.",
      raw: "Standardization = (Regional Unit x Conversion Factor) = Base Square Feet",
      variables: [
        "Hilly System Base: 1 Ropani = 16 Aana. 1 Aana = 4 Paisa. 1 Paisa = 4 Daam.",
        "Hilly Conversion: 1 Aana = Exactly 342.25 sq.ft (31.79 sq.m). 1 Ropani = 5476 sq.ft.",
        "Terai System Base: 1 Bigha = 20 Katha. 1 Katha = 20 Dhur. 1 Dhur = 16 Kanwa.",
        "Terai Conversion: 1 Dhur = Exactly 182.25 sq.ft (16.93 sq.m). 1 Katha = 3645 sq.ft.",
        "Cross-System Equivalence: 1 Bigha = 13.31 Ropani (approx)."
      ]
    },
    
    content: (
        <div className="space-y-12">
        <div className="space-y-12 text-slate-800">
        {/* ==========================================
        SECTION 1: EXECUTIVE SUMMARY
        ========================================== */}
        <div className="bg-emerald-50/50 border-l-4 border-emerald-600 rounded-r-xl p-8 shadow-sm">
        <h2 className="text-emerald-700 font-black text-xs uppercase tracking-[0.3em] mb-3">
        Real Estate Measurement Executive Summary
        </h2>
        <p className="text-slate-800 text-base leading-relaxed">
        Real estate in Nepal is governed by two archaic, deeply entrenched measurement systems: the Ropani-Aana system in the hilly regions (including Kathmandu Valley) and the Bigha-Katha system in the Terai plains. In regions where a single 'Aana' of land can exceed Rs. 1 Crore (10 Million), a calculation error of a few decimal points in Square Feet translates to millions of rupees in lost capital. Furthermore, the <a href="https://dos.gov.np" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:text-emerald-900 underline font-semibold transition-colors">Department of Survey (Napi Karyalaya)</a> and the Land Revenue Office (Malpot) mandate absolute precision when registering property ownership certificates (Lalpurja) or approving municipal building blueprints. This professional <a href="/calculator/nepal-land" className="text-emerald-700 hover:text-emerald-900 underline font-bold transition-colors">Land Area Auditor</a> eradicates the opacity of broker negotiations. By providing exact conversions down to the 'Daam' and 'Kanwa' and translating them into globally recognized Square Feet and Square Meters, our engine guarantees mathematical dominance during property transactions.
        <br/><br/>
        <span className="text-sm text-slate-600 font-medium">
        Investment Strategy: Once your exact land area is validated, use the resulting valuation to calculate your borrowing capacity with our <a href="/calculator/nepal-home-loan" className="text-emerald-700 hover:text-emerald-900 underline font-bold transition-colors">Mortgage & Home Loan Lab</a>.
        </span>
        </p>
        </div>
        {/* ==========================================
        SECTION 2: COMPETITIVE MARKET AUDIT
        ========================================== */}
        <section>
        <h3 className="text-2xl font-black text-slate-900 mb-6">
        1. Competitive Audit: Land Area Precision
        </h3>
        <div className="overflow-hidden rounded-xl border border-slate-200">
        <table className="w-full text-left text-sm">
        <thead className="bg-slate-50">
        <tr>
        <th className="p-4 font-black text-slate-900">Competitor</th>
        <th className="p-4 font-black text-slate-900">Feature Gap</th>
        <th className="p-4 font-black text-slate-900">CalcPro Advantage</th>
        </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
        <tr>
        <td className="p-4 font-semibold">Broker Verbal Conversions</td>
        <td className="p-4">Rounds down sq.ft (Skims small fractions).</td>
        <td className="p-4 text-emerald-700 font-bold">Exact Decimal Audit</td>
        </tr>
        <tr>
        <td className="p-4 font-semibold">Online Unit Converters</td>
        <td className="p-4">Generic sq.ft to sq.m; no Paisa/Daam logic.</td>
        <td className="p-4 text-emerald-700 font-bold">Native Lalpurja Math</td>
        </tr>
        <tr>
        <td className="p-4 font-semibold">Manual Formula Sheets</td>
        <td className="p-4">Slow; high risk of mathematical error.</td>
        <td className="p-4 text-emerald-700 font-bold">Instant G2G Calibration</td>
        </tr>
        </tbody>
        </table>
        </div>
        </section>
        {/* ==========================================
        SECTION 3: THE HILLY SYSTEM (ROPANI-AANA) ========================================= */}
        <section className="mt-12">
        <h3 className="text-2xl font-black text-slate-900 mb-6">
        2. The Kathmandu Standard: Ropani, Aana, Paisa, Daam
        </h3>
        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
        <p>
        Used primarily in Kathmandu Valley and hilly districts, this system is highly granular. Because land in the capital is exceptionally expensive, transactions frequently negotiate down to the 'Paisa' and 'Daam'.
        </p>
        <div className="overflow-hidden rounded-xl border border-slate-200 mt-6">
        <table className="w-full text-left text-sm">
        <thead className="bg-slate-50">
        <tr>
        <th className="p-4 font-black text-slate-900 uppercase">Unit</th>
        <th className="p-4 font-black text-slate-900 uppercase">Internal Composition</th>
        <th className="p-4 font-black text-slate-900 uppercase">Exact Square Feet</th>
        <th className="p-4 font-black text-slate-900 uppercase">Square Meters</th>
        </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
        <tr><td className="p-4 font-bold text-emerald-700">1 Ropani</td><td className="p-4">16 Aana</td><td className="p-4 font-bold">5476.00 sq.ft</td><td className="p-4">508.74 sq.m</td></tr>
        <tr><td className="p-4 font-bold text-blue-700">1 Aana</td><td className="p-4">4 Paisa</td><td className="p-4 font-bold">342.25 sq.ft</td><td className="p-4">31.80 sq.m</td></tr>
        <tr><td className="p-4 font-bold text-purple-700">1 Paisa</td><td className="p-4">4 Daam</td><td className="p-4 font-bold">85.56 sq.ft</td><td className="p-4">7.95 sq.m</td></tr>
        <tr><td className="p-4 font-bold text-red-700">1 Daam</td><td className="p-4">Base Unit</td><td className="p-4 font-bold">21.39 sq.ft</td><td className="p-4">1.99 sq.m</td></tr>
        </tbody>
        </table>
        </div>
        <p className="text-sm mt-4 text-slate-500 italic">
        Critical Audit Note: The standard dimensions of 1 Aana are theoretically defined as a 16 ft by 21.39 ft rectangle. If a broker tells you "1 Aana is 342 square feet," they are skimming 0.25 sq.ft. At Rs. 1 Crore per Aana, that 0.25 sq.ft is worth Rs. 7,300. Demand exact decimals.
        </p>
        </div>
        </section>
        {/* ==========================================
        SECTION 4: THE TERAI SYSTEM (BIGHA-KATHA) ========================================== */}
        <section className="bg-white border border-slate-200 rounded-2xl p-8 mb-8 shadow-sm">
        <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
        <span className="text-emerald-500">🌾</span> The Terai Expanse: Bigha, Katha, Dhur
        </h3>
        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
        <p>
        In the southern plains (Terai), agricultural and residential land is measured in much larger base units. The conversion scale here operates on a factor of 20.
        </p>
        <div className="overflow-hidden rounded-xl border border-slate-200 mt-6">
        <table className="w-full text-left text-sm">
        <thead className="bg-slate-50">
        <tr>
        <th className="p-4 font-black text-slate-900 uppercase">Unit</th>
        <th className="p-4 font-black text-slate-900 uppercase">Internal Composition</th>
        <th className="p-4 font-black text-slate-900 uppercase">Exact Square Feet</th>
        <th className="p-4 font-black text-slate-900 uppercase">Square Meters</th>
        </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
        <tr><td className="p-4 font-bold text-emerald-700">1 Bigha</td><td className="p-4">20 Katha</td><td className="p-4 font-bold">72,900 sq.ft</td><td className="p-4">6,772.63 sq.m</td></tr>
        <tr><td className="p-4 font-bold text-blue-700">1 Katha</td><td className="p-4">20 Dhur</td><td className="p-4 font-bold">3,645 sq.ft</td><td className="p-4">338.63 sq.m</td></tr>
        <tr><td className="p-4 font-bold text-purple-700">1 Dhur</td><td className="p-4">16 Kanwa</td><td className="p-4 font-bold">182.25 sq.ft</td><td className="p-4">16.93 sq.m</td></tr>
        </tbody>
        </table>
        </div>
        <p className="mt-4">
        <strong>The Ropani-Bigha Bridge:</strong> A common point of friction is investors from Kathmandu purchasing land in the Terai. It is vital to know that <strong>1 Bigha is substantially larger than 1 Ropani.</strong> In fact, 1 Bigha is mathematically equivalent to 13.31 Ropani.
        </p>
        </div>
        </section>
        {/* ==========================================
        SECTION 5: THE MUNICIPAL BLUEPRINT TRAP
        ========================================== */}
        <section className="bg-slate-900 text-white rounded-2xl p-8 border border-slate-800 shadow-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600 rounded-full blur-[120px] opacity-20 pointer-events-none" />
        <h3 className="text-xl font-black mb-6 flex items-center gap-3 relative z-10">
        <span className="text-emerald-400">🏗️</span> Naksha Pass: The FAR and Setback Mechanics
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed mb-8 relative z-10">
        When you purchase land to build a house, you cannot build on 100% of the area. Municipalities enforce strict Floor Area Ratio (FAR) and setback rules, which are universally calculated in Square Meters, NOT Aana or Dhur.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        <div className="space-y-4">
        <div className="flex items-start gap-4">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold">1</div>
        <p className="text-sm text-slate-300"><strong className="text-white">Ground Coverage Limits:</strong> In Kathmandu, typical residential zoning allows a maximum ground coverage of 70%. If you own 4 Aana (127.18 sq.m), the maximum footprint of your house can only be 89 sq.m.</p>
        </div>
        <div className="flex items-start gap-4">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold">2</div>
        <p className="text-sm text-slate-300"><strong className="text-white">The Setback Rule:</strong> You must leave a minimum of 5 feet (1.52 meters) empty from your neighbor's boundary. If your land is extremely narrow, 5 feet on both sides might render the plot unbuildable.</p>
        </div>
        <div className="flex items-start gap-4">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold">3</div>
        <p className="text-sm text-slate-300"><strong className="text-white">Road Expansion Cut (MaapDanda):</strong> If your plot is adjacent to a non-standard road, the municipality will "cut" your land area to expand the road. Your Lalpurja may say 5 Aana, but your buildable area might only be 4 Aana.</p>
        </div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl"><h4 className="text-xs font-black text-emerald-400 uppercase tracking-widest mb-3">Institutional Strategy</h4>
        <p className="text-xs text-slate-400 leading-relaxed italic">
        "Never value a plot of land solely by its Lalpurja area. Always deduct the road setback (MaapDanda). A 3-Aana plot on an expanding main road might legally become a 2.5-Aana plot upon building permit approval, destroying your expected ROI. Protect your property investments by calculating long-term yields via our <a href="/calculator/property-tax" className="text-emerald-400 underline font-bold">Property Tax Auditor</a>."
        </p></div>
        </div>
        
        </section>
        {/* ==========================================
        SECTION 6: KNOWLEDGE CARDS
        ========================================== */}
        <section className="mt-12">
        <h3 className="text-2xl font-black text-slate-900 mb-6">
        Real Estate Intelligence Silo
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-emerald-300 transition-all">
        <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
        <span className="text-emerald-500">📄</span> Lalpurja Math
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
        The government ownership certificate (Lalpurja) often lists the area in a combined format like 0-4-2-1 (Ropani-Aana-Paisa-Daam). This specifically means 0 Ropani, 4 Aana, 2 Paisa, and 1 Daam.
        </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-300 transition-all">
        <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
        <span className="text-blue-500">📏</span> Haath (Cubit Measurement)
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
        In rural Terai, locals measure land boundaries in 'Haath' (the length from the elbow to the tip of the middle finger). Legally, the government standardizes 1 Haath as exactly 1.5 feet (18 inches).
        </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-red-300 transition-all">
        <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
        <span className="text-red-600">🏦</span> Bank Valuation Limits
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
        Banks will not provide a mortgage on land smaller than 2.5 Aana in Kathmandu or 8 Dhur in the Terai, as plots smaller than this are deemed legally unbuildable and therefore possess low collateral liquidation value.
        </p>
        </div>
        </div>
        </section>
        {/* ==========================================
        SECTION 7: CASE STUDY
        ========================================== */}
        <section className="bg-emerald-50 border border-emerald-100 rounded-3xl p-10 relative overflow-hidden mt-12">
        <div className="relative z-10">
        <h3 className="text-2xl font-black text-emerald-900 mb-4">
        Strategic Case Study: The Fractional Arbitrage
        </h3>
        <p className="text-emerald-900/70 text-sm leading-relaxed mb-8">
        A buyer is purchasing a plot in Lalitpur. The broker verbally claims the plot is "exactly 4 Aana" and quotes a price of Rs. 60 Lakhs per Aana (Total: Rs. 2.40 Crore). However, the Lalpurja explicitly lists the area as 0-3-3-2 (3 Aana, 3 Paisa, 2 Daam).
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-emerald-200 shadow-sm">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">The Mathematical Truth</h4>
          </div>
          <div className="space-y-2 text-sm text-slate-700">
            <div className="flex justify-between"><span>Lalpurja Area:</span> <strong>3 Aana, 3 Paisa, 2 Daam</strong></div>
            <div className="flex justify-between"><span>3 Aana in sq.ft:</span> <strong>1026.75 sq.ft</strong></div>
            <div className="flex justify-between"><span>3 Paisa in sq.ft:</span> <strong>256.68 sq.ft</strong></div>
            <div className="flex justify-between"><span>2 Daam in sq.ft:</span> <strong>42.78 sq.ft</strong></div>
            <div className="flex justify-between border-t pt-2 mt-2 font-bold text-slate-900"><span>Total Exact Area:</span> <span>1326.21 sq.ft</span></div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-emerald-200 shadow-md transform md:scale-105">
            <h4 className="text-xs font-black text-emerald-600 uppercase tracking-widest mb-4">The Financial Impact</h4>
          </div>
          <div className="space-y-2 text-sm text-slate-700">
            <div className="flex justify-between"><span>Actual Area in Decimal Aana:</span> <strong>3.875 Aana</strong></div>
            <div className="flex justify-between"><span>Broker's Verbal Claim:</span> <strong>4.00 Aana</strong></div>
            <div className="flex justify-between"><span>Area Deficit:</span> <strong>0.125 Aana (42.78 sq.ft)</strong></div>
            <div className="flex justify-between border-t pt-2 mt-2 text-red-700"><span>True Value (3.875 x 60L) :</span> <span>Rs. 2,32,50,000</span></div>
            <div className="flex justify-between font-black text-emerald-800 pt-2"><span>Overpayment Averted:</span> <span>Rs. 7,50,000</span></div>
          </div>
        </div>
        
        <p className="text-xs text-emerald-900/50 mt-8 italic text-center">
        Audit Observation: By utilizing the calculator to convert the exact Lalpurja figures (0-3-3-2) into decimal Aana (3.875), the buyer prevents a Rs. 7.5 Lakh overpayment. Brokers frequently round up fractional land measurements to the nearest whole unit. Never pay for "verbal Aanas." If taking a loan for the true amount, structure your EMI using our <a href="/calculator/loan-emi" className="text-emerald-600 underline font-bold">EMI & Amortization Lab</a>.
        </p>
        
        </div>
        </section>
        {/* ==========================================
        FOOTER TRUST SIGNALS
        ========================================== */}
        <div className="pt-10 border-t border-slate-200 text-center mt-12">
        <p className="text-[11px] text-slate-400 italic bg-slate-50 inline-block px-6 py-2 rounded-full border border-slate-100">
        Compliance Audit: Last updated Baishakh 2083 (May 2026). Calculations are strictly synchronized with the Survey Measurement Act (Napi Ain) and the Department of Survey, Government of Nepal.
        
        
        
        </p>
        </div>
        </div>
        </div>
    ),
    faqs: [
      { 
        question: "How many Square Feet are in exactly 1 Aana?", 
        answer: "By government standard, 1 Aana is exactly 342.25 square feet. It is not 342 sq.ft. Always include the decimal during high-value real estate transactions." 
      },
      { 
        question: "What is the equivalent of 1 Katha in the Aana system?", 
        answer: "1 Katha (Terai system) is equivalent to 3,645 square feet. This roughly translates to 10.65 Aana in the Hilly system." 
      },
      { 
        question: "How is the area on the Lalpurja written?", 
        answer: "In the hills, it is written as a sequence: Ropani-Aana-Paisa-Daam (e.g., 1-4-2-1). In the Terai, it is written as Bigha-Katha-Dhur-Kanwa (e.g., 0-10-5-0). If a number is missing, it is represented as a zero." 
      },
      { 
        question: "Is 'Gaj' used in official Nepal documents?", 
        answer: "No. While 'Gaj' (Yard) is sometimes used colloquially (1 Gaj = 9 square feet), the Land Revenue Office only recognizes Aana/Ropani, Bigha/Katha, and Square Meters for legal documentation." 
      },
      { 
        question: "What is the minimum land size required to pass a house map in Kathmandu?", 
        answer: "Municipal rules vary slightly, but generally, you need a minimum of 2.5 Aana (855.62 sq.ft) of buildable land to pass a standard residential blueprint. The plot must also touch a formally recognized road." 
      },
      { 
        question: "Why does my Lalpurja area not match my actual physical land boundary?", 
        answer: "This is a common issue known as 'Napi Mistake'. It happens if neighbors encroach on boundaries, or if roads were expanded without updating the Lalpurja. The physical area measured by an Amin (surveyor) overrides theoretical documents." 
      },
      { 
        question: "How many Square Meters are in 1 Ropani?", 
        answer: "1 Ropani is equivalent to 508.74 Square Meters. This metric is crucial because all modern municipal engineering documents and tax assessments are processed in Square Meters." 
      },
      { 
        question: "What is the difference between carpet area and built-up area?", 
        answer: "While land is measured by plot boundaries, a house is measured differently. 'Carpet Area' is the usable floor space inside the walls. 'Built-up Area' includes the thickness of the walls and balconies." 
      },
      { 
        question: "How many Aana make 1 Bigha?", 
        answer: "1 Bigha (72,900 sq.ft) is mathematically equal to 213 Aana, or 13.31 Ropani." 
      },
      { 
        question: "Can I legally convert my Terai land document into Ropani?", 
        answer: "While you can mathematically convert the value, the legal Lalpurja will always utilize the system native to the geographical district. A Lalpurja in Biratnagar will always be issued in Bigha-Katha." 
      }
    ]
  },
  'nepal-stocks': {
    title: "NEPSE Share Calculator | Capital Gains & Broker Fee Auditor",
    description: "Calculate exact Nepal Stock Exchange (NEPSE) profits. 1500+ words detailing SEBON broker commissions, Rs. 25 DP charges, and the 5% vs 7.5% Capital Gains Tax (CGT).",
    
    howToUse: {
      steps: [
        "1. Transaction Type: Select whether you are executing a 'Buy' or a 'Sell' order. The cost structure differs entirely based on the transaction direction.",
        "2. Input Market Variables: Enter the exact Number of Shares (Quantity) and the Purchase/Sell Price per share.",
        "3. Regulatory Fees Integration: The system automatically calculates and adds the SEBON regulatory fee (0.015%) and the flat Rs. 25 Depository Participant (DP) charge.",
        "4. Sliding Broker Commission: The algorithm applies the exact broker commission slab based on your total transaction volume (ranging from 0.40% down to 0.27% for massive trades).",
        "5. Capital Gains Tax (CGT) Selection (For Sellers): If selling, declare your holding period. Select 'Short Term' (less than 365 days) for a 7.5% tax, or 'Long Term' (greater than 365 days) for a 5% tax.",
        "6. WACC Validation: Input your Weighted Average Cost of Capital (WACC) to ensure CGT is only applied to your net profit, not your gross sales revenue.",
        "7. Final Ledger Output: Review your 'Effective Buy Price' or 'Net Receivable Amount'. This is the exact capital that will be deducted from your bank account or deposited into it.",
        "8. Break-Even Analysis: Check the break-even price to know exactly how much the stock must rise for you to cover all broker and tax fees before realizing a Rs. 1 profit."
      ]
    },
    
    formula: {
      title: "The NEPSE Regulatory Transaction Axiom",
      description: "Trading on the Nepal Stock Exchange involves a layered fee structure enforced by SEBON, the broker, and the Inland Revenue Department (IRD).",
      raw: "Net Realized Capital = Gross Trade Volume ± (Broker Commission + SEBON Fee + DP Charge) - CGT",
      variables: [
        "Gross Trade Volume = Shares x Price per Share.",
        "SEBON Fee = A mandatory 0.015% levy on all transaction volumes.",
        "DP Charge = A flat Rs. 25 fee per stock transaction, regardless of volume.",
        "Broker Commission = Tiered: Up to Rs. 50K (0.40%), 50K-500K (0.37%), 500K-2M (0.34%), 2M-10M (0.30%), above 10M (0.27%).",
        "CGT (Capital Gains Tax) = Levied ONLY on Net Profit (Selling Price - WACC - Fees).",
        "Holding Threshold = Tax is 7.5% if held under 365 days. Drops to 5% if held over 365 days."
      ]
    },
    
    content: (
        <div className="space-y-12">
        <div className="space-y-12 text-slate-800">
        {/* ==========================================
        SECTION 1: EXECUTIVE SUMMARY
        ========================================== */}
        <div className="bg-sky-50/50 border-l-4 border-sky-600 rounded-r-xl p-8 shadow-sm">
        <h2 className="text-sky-700 font-black text-xs uppercase tracking-[0.3em] mb-3">
        Financial Market Compliance Executive Summary
        </h2>
        <p className="text-slate-800 text-base leading-relaxed">
        The <a href="https://nepalstock.com.np" target="_blank" rel="noopener noreferrer" className="text-sky-700 hover:text-sky-900 underline font-semibold transition-colors">Nepal Stock Exchange (NEPSE)</a> is heavily regulated by the Securities Board of Nepal (SEBON). A severe mistake made by retail investors is confusing 'Gross Profit' with 'Net Realized Profit'. Buying a stock for Rs. 500 and selling it for Rs. 510 does not guarantee a Rs. 10 profit; the friction of sliding broker commissions, Rs. 25 flat DP charges, SEBON levies, and Capital Gains Tax (CGT) can quickly turn a theoretical profit into a mathematical loss. Furthermore, the Inland Revenue Department enforces a dual-tier CGT structure designed to penalize short-term speculation (7.5% tax) while rewarding long-term holding (5% tax). This professional <a href="/calculator/nepal-stocks" className="text-sky-700 hover:text-sky-900 underline font-bold transition-colors">NEPSE Broker & Tax Auditor</a> strips away the opacity of your TMS ledger. By simulating the exact SEBON transaction waterfall, our engine reveals your true break-even point and calculates the exact capital that will hit your bank account upon settlement.
        <br/><br/>
        <span className="text-sm text-slate-600 font-medium">
        Wealth Strategy: Once your stock profits are secured, analyze how quickly those returns will compound over a decade using our <a href="/calculator/cagr-calculator" className="text-sky-700 hover:text-sky-900 underline font-bold transition-colors">CAGR & Compound Interest Lab</a>.
        </span>
        </p>
        </div>
        {/* ==========================================
        SECTION 2: THE BROKER COMMISSION SLIDING SCALE
        ========================================= */}
        <section>
        <h3 className="text-2xl font-black text-slate-900 mb-6">
        1. The Friction: SEBON Broker Commission Tiers
        </h3>
        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
        <p>
        Stock brokers in Nepal do not charge a flat fee. SEBON enforces a progressive, sliding scale designed to offer volume discounts to institutional investors while maintaining a higher percentage floor for retail traders.
        </p>
        <div className="overflow-hidden rounded-xl border border-slate-200 mt-6">
        <table className="w-full text-left text-sm">
        <thead className="bg-slate-50">
        <tr>
        <th className="p-4 font-black text-slate-900 uppercase">Transaction Volume (Rs.)</th>
        <th className="p-4 font-black text-slate-900 uppercase">Broker Commission Rate</th>
        <th className="p-4 font-black text-slate-900 uppercase">Impact on Retail Trader</th>
        </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
        <tr><td className="p-4 font-bold">Up to Rs. 50,000</td><td className="p-4 font-bold text-red-700">0.40%</td><td className="p-4">Highest friction. Heavily impacts small capital.</td></tr>
        <tr><td className="p-4 font-bold">Rs. 50,000 to Rs. 5,00,000</td><td className="p-4 font-bold text-orange-700">0.37%</td><td className="p-4">Standard retail trading bracket.</td></tr>
        <tr><td className="p-4 font-bold">Rs. 5,00,000 to Rs. 20,00,000</td><td className="p-4 font-bold text-blue-700">0.34%</td><td className="p-4">High net-worth retail trades.</td></tr>
        <tr><td className="p-4 font-bold">Rs. 20 Lakh to Rs. 1 Crore</td><td className="p-4 font-bold text-green-700">0.30%</td><td className="p-4">Institutional tier. Significant cost savings.</td></tr>
        <tr><td className="p-4 font-bold">Above Rs. 1 Crore</td><td className="p-4 font-bold text-emerald-700">0.27%</td><td className="p-4">Maximum volume discount (Whale tier).</td></tr>
        </tbody>
        </table>
        </div>
        <p className="text-sm mt-4 text-slate-500 italic">
        Critical Audit Note: The broker commission is charged <strong>twice</strong> on a full trade cycle—once when you buy, and once again when you sell. Therefore, a 0.40% commission effectively costs you 0.80% in total friction just to enter and exit a position.
        </p>
        </div>
        </section>
        {/* ==========================================
        SECTION 3: THE FLAT FEES AND INVISIBLE LEVIES
        ========================================== */}
        <section className="bg-white border border-slate-200 rounded-2xl p-8 mb-8 shadow-sm">
        <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
        <span className="text-sky-500">📉</span> The Invisible Ledger Drains
        </h3>
        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
        <p>
        Beyond the broker commission, every transaction (both buy and sell) is subjected to two non-negotiable regulatory fees. If you execute a high volume of small trades (e.g., buying 10 shares of a cheap stock), these flat fees will mathematically destroy your portfolio.
        </p>
        <ul className="list-disc pl-6 space-y-3 mt-4">
        <li><strong>The SEBON Fee (0.015%):</strong> The Securities Board of Nepal levies a microscopic 0.015% tax on the gross volume of every trade to fund regulatory oversight. While small, it scales infinitely with volume.</li><li><strong>The DP Charge (Rs. 25):</strong> This is the deadliest fee for small investors. The Depository Participant (your demat provider) charges a flat <strong>Rs. 25 per transaction</strong>.</li><li><strong>The Micro-Transaction Trap:</strong> If you buy 10 shares of a company at Rs. 200 (Total Rs. 2,000), the Rs. 25 DP charge represents a massive <strong>1.25% instant loss</strong> on your capital, before broker commissions are even applied.</li></ul>
        </div>
        </section>
        {/* ==========================================
        SECTION 4: CAPITAL GAINS TAX (CGT) ALGORITHM
        ========================================== */}
        <section className="bg-slate-900 text-white rounded-2xl p-8 border border-slate-800 shadow-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-600 rounded-full blur-[120px] opacity-20 pointer-events-none" />
        <h3 className="text-xl font-black mb-6 flex items-center gap-3 relative z-10">
        <span className="text-sky-400">🏛️</span> The IRD Tax Shield: 5% vs 7.5% CGT
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed mb-8 relative z-10">
        Capital Gains Tax is the final extraction from your profitable trades. The Inland Revenue Department (IRD) utilizes a holding-period mechanic to discourage day-trading and encourage long-term capital formation.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        <div className="space-y-4">
        <div className="flex items-start gap-4">
        <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-400 font-bold">1</div>
        <p className="text-sm text-slate-300"><strong className="text-white">Short-Term Speculation (7.5%):</strong> If you sell a stock less than 365 days from the date of purchase, the IRD classifies you as a speculator and taxes your net profit at 7.5%.</p>
        </div>
        <div className="flex items-start gap-4">
        <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-400 font-bold">2</div>
        <p className="text-sm text-slate-300"><strong className="text-white">Long-Term Investment (5.0%):</strong> If you hold the stock for 365 days or more, you are rewarded with a reduced CGT rate of 5%. This 2.5% difference can equate to hundreds of thousands of rupees on large portfolios.</p>
        </div>
        <div className="flex items-start gap-4">
        <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-400 font-bold">3</div>
        <p className="text-sm text-slate-300"><strong className="text-white">Taxed Only on Profit (WACC):</strong> Crucially, CGT is only levied on your <em>Net Profit</em>. It is not a tax on revenue. If you sell at a loss (Selling Price is lower than your WACC), the CGT is exactly 0%.</p>
        </div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl"><h4 className="text-xs font-black text-sky-400 uppercase tracking-widest mb-3">Institutional Strategy</h4>
        <p className="text-xs text-slate-400 leading-relaxed italic">
        "Never sell a stock on Day 360 if you hold a massive profit. Waiting 5 more days drops your tax burden by 33%. Furthermore, always calculate your WACC immediately after receiving bonus shares or right shares, as they dramatically lower your average cost and exponentially increase your CGT liability. If reinvesting profits into real estate, validate the returns with our <a href="/calculator/sip-calculator/" className="text-sky-400 underline font-bold">ROI & Cash-on-Cash Lab</a>."
        </p></div>
        </div>
        
        </section>
        {/* ==========================================
        SECTION 5: KNOWLEDGE CARDS
        ========================================== */}
        <section className="mt-12">
        <h3 className="text-2xl font-black text-slate-900 mb-6">
        NEPSE Intelligence Silo
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-sky-300 transition-all">
        <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
        <span className="text-sky-500">🧮</span> WACC Importance
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
        WACC (Weighted Average Cost of Capital) is mandatory before selling. If you forget to calculate WACC in your MeroShare account, the system legally assumes your cost price is Rs. 100, resulting in a maximum possible CGT penalty.
        </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-300 transition-all">
        <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
        <span className="text-blue-500">💰</span> Bonus Share CGT
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
        When a company issues Bonus Shares (dividends), your average cost drops. However, when you sell those specific bonus shares, the holding period starts from the date they were listed, meaning they often trigger the 7.5% short-term tax.
        </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-red-300 transition-all">
        <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
        <span className="text-red-600">⚖️</span> Corporate CGT vs Retail
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
        The 5% and 7.5% CGT tiers apply strictly to individual retail investors. Institutional investors, mutual funds, and corporate trading firms face a flat 10% Capital Gains Tax on all stock market profits.
        </p>
        </div>
        </div>
        </section>
        {/* ==========================================
        SECTION 6: CASE STUDY
        ========================================== */}
        <section className="bg-sky-50 border border-sky-100 rounded-3xl p-10 relative overflow-hidden mt-12">
        <div className="relative z-10">
        <h3 className="text-2xl font-black text-sky-900 mb-4">
        Strategic Case Study: The Rs. 20 Break-Even Trap
        </h3>
        <p className="text-sky-900/70 text-sm leading-relaxed mb-8">
        A retail trader buys 100 shares of a commercial bank at Rs. 300 (Total Rs. 30,000). The stock price immediately jumps to Rs. 305. The trader assumes they have made a Rs. 500 profit and decides to sell within 3 days. Let's run the audit.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-sky-200 shadow-sm">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">The Buying Ledger (Friction)</h4>
          </div>
          <div className="space-y-2 text-sm text-slate-700">
            <div className="flex justify-between"><span>Gross Buy Volume:</span> <strong>Rs. 30,000.00</strong></div>
            <div className="flex justify-between"><span>Broker Comm (0.40%) :</span> <strong>+ Rs. 120.00</strong></div>
            <div className="flex justify-between"><span>SEBON (0.015%) & DP:</span> <strong>+ Rs. 29.50</strong></div>
            <div className="flex justify-between border-t pt-2 mt-2 font-bold text-red-700"><span>True Capital Deployed (WACC) :</span> <span>Rs. 30,149.50</span></div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-sky-200 shadow-md transform md:scale-105">
            <h4 className="text-xs font-black text-sky-600 uppercase tracking-widest mb-4">The Selling Ledger (Collapse)</h4>
          </div>
          <div className="space-y-2 text-sm text-slate-700">
            <div className="flex justify-between"><span>Gross Sell Volume (at 305) :</span> <strong>Rs. 30,500.00</strong></div>
            <div className="flex justify-between"><span>Broker, SEBON & DP Fees:</span> <strong>- Rs. 151.58</strong></div>
            <div className="flex justify-between border-t pt-2 mt-2 font-bold"><span>Net Before Tax:</span> <span>Rs. 30,348.42</span></div>
            <div className="flex justify-between"><span>Taxable Profit:</span> <strong>Rs. 198.92</strong></div>
            <div className="flex justify-between text-red-700"><span>Short-Term CGT (7.5%) :</span> <strong>- Rs. 14.92</strong></div>
            <div className="flex justify-between border-t pt-2 mt-2 font-black text-sky-800"><span>Final Net Profit:</span> <span>Rs. 184.00</span></div>
          </div>
        </div>
        
        <p className="text-xs text-sky-900/50 mt-8 italic text-center">
        Audit Observation: The trader believed they made Rs. 500. The reality is they made a trivial Rs. 184. The combined dual-friction of buying and selling destroyed 63% of their expected profit. This proves why high-frequency trading with small capital is mathematically destined to fail in NEPSE. Scale your long-term holding projections using our <a href="/calculator/sip-calculator" className="text-sky-600 underline font-bold">SIP Wealth Generator</a>.
        </p>
        
        </div>
        </section>
        {/* ==========================================
        FOOTER TRUST SIGNALS
        ========================================== */}
        <div className="pt-10 border-t border-slate-200 text-center mt-12">
        <p className="text-[11px] text-slate-400 italic bg-slate-50 inline-block px-6 py-2 rounded-full border border-slate-100">
        Compliance Audit: Last updated Baishakh 2083 (May 2026). Calculations are strictly synchronized with SEBON regulations, NEPSE trading bylaws, and the Inland Revenue Department (IRD) capital gains directives.
        
        
        
        </p>
        </div>
        </div>
        </div>
    ),
    faqs: [
      { 
        question: "What is WACC and why do I have to calculate it?", 
        answer: "WACC (Weighted Average Cost of Capital) calculates your true average buying price, inclusive of all broker fees. You must calculate it in MeroShare before selling so the government knows exactly how much net profit to tax. If you skip this, you are taxed maximally." 
      },
      { 
        question: "Is the Capital Gains Tax (CGT) final in Nepal?", 
        answer: "Yes. For individual retail investors, the 5% or 7.5% CGT deducted by the broker is considered the 'final withholding tax'. You do not need to pay additional income tax on stock market profits during your annual tax return." 
      },
      { 
        question: "What is the Rs. 25 DP fee?", 
        answer: "The Depository Participant (DP) fee is a flat Rs. 25 charge levied every time shares are debited from or credited to your Demat account, regardless of whether you buy 1 share or 10,000 shares." 
      },
      { 
        question: "Do I pay tax if I sell my shares at a loss?", 
        answer: "No. Capital Gains Tax is only applied to profit. If your selling price (after deducting broker fees) is lower than your WACC, your profit is negative, and the CGT applied is exactly 0%." 
      },
      { 
        question: "How long does it take for the money to reach my bank account after selling?", 
        answer: "NEPSE follows a T+2 (Trade + 2 working days) settlement cycle. Brokers are legally required to deposit the net receivable amount into your linked bank account by the 3rd working day." 
      },
      { 
        question: "Can I negotiate the broker commission?", 
        answer: "No. The commission tiers (0.27% to 0.40%) are strictly hard-coded into the TMS software by SEBON. No broker has the legal authority to offer discounts or alter the rates." 
      },
      { 
        question: "What happens to the 365-day rule if I buy the same stock multiple times?", 
        answer: "The system uses the FIFO (First In, First Out) method. If you buy 100 shares in Jan and 100 shares in Dec, and then sell 100 shares next Feb, the system assumes you sold the Jan shares, granting you the 5% long-term tax rate." 
      },
      { 
        question: "Do I have to pay CGT on cash dividends?", 
        answer: "Cash dividends are taxed at a flat rate of 5% at the source. The company deducts this tax before depositing the remaining dividend directly into your bank account. It has nothing to do with broker CGT." 
      },
      { 
        question: "Why did my WACC suddenly decrease?", 
        answer: "If the company distributed Bonus Shares or Right Shares, your total number of shares increased without you deploying proportional capital. The system recalculates and lowers your average cost per share." 
      },
      { 
        question: "What is the SEBON fee used for?", 
        answer: "The 0.015% SEBON fee is a regulatory levy that funds the operations of the Securities Board of Nepal, ensuring market surveillance, fraud prevention, and system maintenance." 
      }
    ]
  },
  'nepal-tds': {
    title: "Nepal TDS Calculator | IRD Withholding Tax Auditor",
    description: "Calculate exact Tax Deducted at Source (TDS) for Nepal. 1500+ words on 1.5% contract tax, 5% rent/dividend tax, and the 15% professional service penalty.",
    
    howToUse: {
      steps: [
        "1. Income Category Selection: Identify the nature of the transaction. TDS rates vary drastically depending on whether the payment is for Rent (10%), Dividends (5%), Consulting (15%), or Goods Contracts (1.5%).",
        "2. Entity Status: Select whether the receiving party is a registered PAN/VAT entity or an unregistered individual. Unregistered entities often face higher penal TDS rates.",
        "3. Payment Input: Enter the Gross Invoice Amount (the total amount billed before tax).",
        "4. Value Added Tax (VAT) Flagging: If the invoice includes 13% VAT, ensure you separate the base amount. TDS is legally calculated on the Base Amount, NOT the VAT-inclusive amount.",
        "5. Tax Calculation: The system multiplies the base amount by the mandated IRD percentage tier.",
        "6. Net Payout Extraction: Review the 'Net Payable Amount'. This is the exact cash the business must deposit into the vendor's bank account.",
        "7. IRD Liability: The deducted TDS amount is a legal liability. It must be deposited to the Inland Revenue Department via the IRD portal by the 25th of the following Nepali month.",
        "8. Advance Tax Verification: Validate whether the deducted TDS is considered a 'Final Withholding Tax' (no more tax needed) or an 'Advance Tax' (adjusted during the fiscal year-end audit)."
      ]
    },
    
    formula: {
      title: "The IRD Withholding Axiom",
      description: "Tax Deducted at Source (TDS) is an anti-evasion mechanism where the payer is legally forced to act as a tax collector for the government before releasing funds to the payee.",
      raw: "Net Payment = Gross Invoice Amount - (Gross Invoice Amount x Statutory TDS %)",
      variables: [
        "Contract of Goods = 1.5% TDS (for VAT registered vendors).",
        "Consultancy / Professional Services = 15% TDS (e.g., IT contractors, auditors, engineers).",
        "Rent (Individual Landlord) = 10% TDS (Final withholding tax paid to local ward).",
        "Dividends / Interest = 5% TDS (Final withholding for individuals).",
        "Meeting Allowances / Windfall = 15% to 25% TDS.",
        "VAT Rule = If an invoice is Rs. 100 + Rs. 13 VAT, TDS is calculated strictly on the Rs. 100 base."
      ]
    },
    
    content: (
        <div className="space-y-12">
        <div className="space-y-12 text-slate-800">
        {/* ==========================================
        SECTION 1: EXECUTIVE SUMMARY
        ========================================== */}
        <div className="bg-red-50/50 border-l-4 border-red-600 rounded-r-xl p-8 shadow-sm">
        <h2 className="text-red-700 font-black text-xs uppercase tracking-[0.3em] mb-3">
        Corporate Tax Compliance Executive Summary
        </h2>
        <p className="text-slate-800 text-base leading-relaxed">
        In Nepal, the burden of tax collection heavily relies on the Tax Deducted at Source (TDS) mechanism enforced by the <a href="https://ird.gov.np" target="_blank" rel="noopener noreferrer" className="text-red-700 hover:text-red-900 underline font-semibold transition-colors">Inland Revenue Department (IRD)</a>. If a business pays a freelancer Rs. 1,00,000 for consulting services without deducting the mandatory 15% TDS, the IRD legally assumes the business committed tax evasion. During a fiscal audit, the business will be forced to pay the missing Rs. 15,000 out of its own pocket, plus compounding late fines and interest. For freelancers, consultants, and landlords, failing to understand TDS means you will unexpectedly receive significantly less money than you invoiced. This professional <a href="/calculator/nepal-tds" className="text-red-700 hover:text-red-900 underline font-bold transition-colors">TDS Compliance Auditor</a> maps the exact withholding percentages across all commercial transactions. By mathematically separating the gross invoice from the net payout, our engine ensures businesses remain audit-compliant while protecting vendors from illegal over-deductions.
        <br/><br/>
        <span className="text-sm text-slate-600 font-medium">
        Corporate Strategy: Cash flow management is critical when 15% of your invoice is withheld by the government. Model your corporate liquidity reserves using our <a href="/calculator/nepal-salary" className="text-red-700 hover:text-red-900 underline font-bold transition-colors">Payroll & Tax Lab</a>.
        </span>
        </p>
        </div>
        {/* ==========================================
        SECTION 2: THE HIERARCHICAL TDS MATRIX
        ========================================= */}
        <section>
        <h3 className="text-2xl font-black text-slate-900 mb-6">
        1. The IRD Matrix: Goods, Services, and Windfalls
        </h3>
        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
        <p>
        TDS rates in Nepal are not uniform. The government applies low friction to standard commerce (goods) but heavily taxes specialized services and passive income streams.
        </p>
        <div className="overflow-hidden rounded-xl border border-slate-200 mt-6">
        <table className="w-full text-left text-sm">
        <thead className="bg-slate-50">
        <tr>
        <th className="p-4 font-black text-slate-900 uppercase">Nature of Payment</th>
        <th className="p-4 font-black text-slate-900 uppercase">TDS Rate</th>
        <th className="p-4 font-black text-slate-900 uppercase">Regulatory Application</th>
        </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
        <tr><td className="p-4 font-bold">Contract for Goods / Procurement</td><td className="p-4 font-bold text-green-700">1.5%</td><td className="p-4">Standard business supplies. Must be VAT registered.</td></tr>
        <tr><td className="p-4 font-bold">Dividend / Bank Interest (Individual)</td><td className="p-4 font-bold text-blue-700">5.0%</td><td className="p-4">Passive income. Treated as final withholding tax.</td></tr>
        <tr><td className="p-4 font-bold">Building / Land Rent (Individual)</td><td className="p-4 font-bold text-orange-700">10.0%</td><td className="p-4">Paid to the local ward office, not the IRD.</td></tr>
        <tr><td className="p-4 font-bold">Consultancy / Professional Service</td><td className="p-4 font-bold text-red-700">15.0%</td><td className="p-4">Engineers, lawyers, freelancers, IT consultants.</td></tr>
        <tr><td className="p-4 font-bold">Windfall / Lottery Gains</td><td className="p-4 font-bold text-purple-700">25.0%</td><td className="p-4">Game shows, lotteries. Brutal final tax extraction.</td></tr>
        </tbody>
        </table>
        </div>
        <p className="text-sm mt-4 text-slate-500 italic">
        Critical Audit Note: If a payment is made to a person or business that does NOT possess a PAN (Permanent Account Number), the IRD mandates that TDS must be deducted at a punitive rate, often defaulting to 15% regardless of the goods/services provided.
        </p>
        </div>
        </section>
        {/* ==========================================
        SECTION 3: ADVANCE TAX VS FINAL WITHHOLDING
        ========================================== */}
        <section className="bg-white border border-slate-200 rounded-2xl p-8 mb-8 shadow-sm">
        <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
        <span className="text-red-500">🛡️</span> Final Withholding vs Advance Tax
        </h3>
        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
        <p>
        A major point of confusion for freelancers and investors is whether the deducted TDS means their tax obligations for the year are completely finished. The IRD categorizes TDS into two distinct legal states:
        </p>
        <ul className="list-disc pl-6 space-y-3 mt-4">
        <li><strong>Final Withholding Tax:</strong> If TDS is deducted on Bank Interest (5%), Dividends (5%), or Capital Gains (5%/7.5%), this is the final extraction. You do not need to declare this income or pay additional taxes on it during your annual fiscal return.</li><li><strong>Advance Tax:</strong> The 15% TDS deducted from a consultant's invoice is NOT final. It is an "Advance Tax." At the end of the fiscal year, the consultant must calculate their total annual income, apply standard income tax slabs, and then subtract the 15% TDS already paid. If their total tax liability is higher, they must pay the difference. If lower, they can claim a refund (though rare in practice).</li></ul>
        </div>
        </section>
        {/* ==========================================
        SECTION 4: THE VAT INTERACTION
        ========================================== */}
        <section className="bg-slate-900 text-white rounded-2xl p-8 border border-slate-800 shadow-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-600 rounded-full blur-[120px] opacity-20 pointer-events-none" />
        <h3 className="text-xl font-black mb-6 flex items-center gap-3 relative z-10">
        <span className="text-red-400">✖️</span> The VAT & TDS Mathematical Sequence
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed mb-8 relative z-10">
        When an invoice includes the 13% Value Added Tax (VAT) calculating TDS incorrectly is the most common auditing failure in Nepali accounting. TDS must NEVER be calculated on the gross VAT-inclusive total.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        <div className="space-y-4">
        <div className="flex items-start gap-4">
        <div className="w-8 h-8 rounded-lg bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 font-bold">1</div>
        <p className="text-sm text-slate-300"><strong className="text-white">The Base Isolation:</strong> An IT company invoices Rs. 1,00,000 + Rs. 13,000 VAT (Total: Rs. 1,13,000). The accountant must isolate the Rs. 1,00,000 base.</p>
        </div>
        <div className="flex items-start gap-4">
        <div className="w-8 h-8 rounded-lg bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 font-bold">2</div>
        <p className="text-sm text-slate-300"><strong className="text-white">The TDS Strike:</strong> The 1.5% TDS is calculated ONLY on the Rs. 1,00,000 base. The deducted amount is Rs. 1,500.</p>
        </div>
        <div className="flex items-start gap-4">
        <div className="w-8 h-8 rounded-lg bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 font-bold">3</div>
        <p className="text-sm text-slate-300"><strong className="text-white">The Legal Payout:</strong> The paying company releases the remaining base (Rs. 98,500) PLUS the full VAT amount (Rs. 13,000). The total cash paid to the IT company is Rs. 1,11,500.</p>
        </div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl"><h4 className="text-xs font-black text-red-400 uppercase tracking-widest mb-3">Institutional Strategy</h4>
        <p className="text-xs text-slate-400 leading-relaxed italic">
        "If your accountant calculates TDS on the VAT-inclusive amount, you are illegally withholding excess funds from the vendor. This will result in immediate rejection of the TDS return during IRD portal upload. Conversely, if you are a VAT-registered business, ensure your clients return your TDS certificates. Without certificates, you cannot claim the advance tax. Validate your gross margins using our <a href="/calculator/nepal-vat" className="text-red-400 underline font-bold">VAT Ledger Auditor</a>."
        </p></div>
        </div>
        
        </section>
        {/* ==========================================
        SECTION 5: KNOWLEDGE CARDS
        ========================================== */}
        <section className="mt-12">
        <h3 className="text-2xl font-black text-slate-900 mb-6">
        Corporate Compliance Silo
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-red-300 transition-all">
        <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
        <span className="text-red-500">🏢</span> Rent TDS (Local Govt) </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
        By law, the 10% TDS deducted from house rent must be paid to the local Ward Office / Municipality, NOT the Inland Revenue Department. It is the sole jurisdiction of local government.
        </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-300 transition-all">
        <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
        <span className="text-blue-500">⌛</span> The 25th Day Rule
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
        If you deduct TDS in the month of Baishakh, you must deposit that money to the government portal by the 25th of Jestha. Failure to do so triggers a compounding 15% per annum penalty.
        </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-green-300 transition-all">
        <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
        <span className="text-green-600">📜</span> E-TDS Certificate
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
        Deducting the tax is not enough. The business must generate an E-TDS certificate from the IRD portal and provide it to the vendor. The vendor uses this certificate to prove they have paid their taxes.
        </p>
        </div>
        </div>
        </section>
        {/* ==========================================
        SECTION 6: CASE STUDY
        ========================================== */}
        <section className="bg-red-50 border border-red-100 rounded-3xl p-10 relative overflow-hidden mt-12">
        <div className="relative z-10">
        <h3 className="text-2xl font-black text-red-900 mb-4">
        Strategic Case Study: The Freelancer's 15% Shock
        </h3>
        <p className="text-red-900/70 text-sm leading-relaxed mb-8">
        A software developer secures a contract with a corporate firm for Rs. 2,00,000. They expect Rs. 2 Lakh to hit their bank account. However, because they are an independent consultant, the firm applies the statutory 15% Professional Services TDS.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-red-200 shadow-sm">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">The Payout Mechanics</h4>
          </div>
          <div className="space-y-2 text-sm text-slate-700">
            <div className="flex justify-between"><span>Gross Contract Value:</span> <strong>Rs. 2,00,000</strong></div>
            <div className="flex justify-between"><span>Professional TDS Rate:</span> <strong>15%</strong></div>
            <div className="flex justify-between border-t pt-2 mt-2 font-bold text-red-700"><span>Amount Withheld by Firm:</span> <span>Rs. 30,000</span></div>
            <div className="flex justify-between font-black text-slate-900 pt-2"><span>Net Cash Transferred:</span> <span>Rs. 1,70,000</span></div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-red-200 shadow-md transform md:scale-105">
            <h4 className="text-xs font-black text-red-600 uppercase tracking-widest mb-4">The Gross-Up Solution</h4>
          </div>
          <div className="space-y-2 text-sm text-slate-700">
            <div className="flex justify-between"><span>Target Net Required:</span> <strong>Rs. 2,00,000</strong></div>
            <div className="flex justify-between"><span>Gross-Up Formula:</span> <strong>Net / (1 - 0.15)</strong></div>
            <div className="flex justify-between"><span>New Invoiced Amount:</span> <strong>Rs. 2,35,294</strong></div>
            <div className="flex justify-between border-t pt-2 mt-2 text-red-700"><span>15% TDS on New Amount:</span> <span>- Rs. 35,294</span></div>
            <div className="flex justify-between font-black text-red-800 pt-2"><span>Achieved Net Payout:</span> <span>Rs. 2,00,000</span></div>
          </div>
        </div>
        
        <p className="text-xs text-red-900/50 mt-8 italic text-center">
        Audit Observation: Freelancers frequently absorb the 15% TDS as a loss because they fail to negotiate "Net of Tax." If you require exactly Rs. 2 Lakh to survive, you must mathematically "gross up" your invoice to Rs. 2,35,294. The company pays the Rs. 35K tax to the IRD, and you receive your full target amount. Structure your business revenue goals using our <a href="/calculator/sip-calculator/" className="text-red-600 underline font-bold">Financial Business Lab</a>.
        </p>
        
        </div>
        </section>
        {/* ==========================================
        FOOTER TRUST SIGNALS
        ========================================== */}
        <div className="pt-10 border-t border-slate-200 text-center mt-12">
        <p className="text-[11px] text-slate-400 italic bg-slate-50 inline-block px-6 py-2 rounded-full border border-slate-100">
        Compliance Audit: Last updated Baishakh 2083 (May 2026). Calculations are strictly synchronized with the Income Tax Act 2058 (2002) and recent fiscal budget directives issued by the Inland Revenue Department (IRD).
        
        
        
        </p>
        </div>
        </div>
        </div>
    ),
    faqs: [
      { 
        question: "Who is legally responsible for deducting TDS?", 
        answer: "The entity making the payment (the buyer or client) is legally responsible. If they fail to deduct TDS, the IRD will hold them liable for the tax amount, not the person who received the money." 
      },
      { 
        question: "Does TDS apply to individual freelancers without a PAN?", 
        answer: "Yes, and it is punitive. By law, payments exceeding Rs. 1,000 cannot be made to an individual without a PAN. If a company does so, they are usually forced to deduct a flat 15% to remain compliant during audits." 
      },
      { 
        question: "Is TDS calculated on the VAT amount?", 
        answer: "Never. TDS is calculated strictly on the base taxable amount. VAT is a consumer tax and must be passed through completely untouched." 
      },
      { 
        question: "What is a TDS Certificate?", 
        answer: "It is an official document generated from the IRD portal by the payer. It proves to the government that the payer deducted your tax and deposited it under your PAN. Without it, you cannot claim advance tax credit." 
      },
      { 
        question: "Why was 10% TDS deducted from my rent?", 
        answer: "The government mandates a 10% tax on building and land rent. If the landlord is an individual, this 10% is a final withholding tax and must be deposited at the local Ward Office by the tenant." 
      },
      { 
        question: "Can I get a refund if my TDS is higher than my actual tax liability?", 
        answer: "Yes, theoretically. Since 15% consultancy TDS is an 'Advance Tax', if your total year-end tax liability is less than the TDS already deducted, you can carry the credit forward to the next year or claim a refund (though the refund process is heavily scrutinized)." 
      },
      { 
        question: "What is the TDS rate on Bank Interest?", 
        answer: "For individual depositors, the TDS on fixed deposit and savings account interest is 5%. It is automatically deducted by the bank before crediting your account and is considered a final tax." 
      },
      { 
        question: "Do I have to deduct TDS on a Rs. 5,000 stationery purchase?", 
        answer: "No. The IRD generally exempts standard consumer goods purchases under a specific threshold (often Rs. 50,000 per invoice) from the 1.5% goods TDS, provided the supplier issues a valid PAN/VAT invoice." 
      },
      { 
        question: "What is the penalty for not depositing TDS on time?", 
        answer: "If TDS is not deposited by the 25th of the following month, the IRD imposes an immediate 15% per annum interest penalty on the outstanding amount, calculated daily." 
      },
      { 
        question: "Are foreign payments subject to TDS?", 
        answer: "Yes. Payments for software, royalties, or technical services to foreign entities are subject to heavy TDS (often 15%), unless a specific Double Taxation Avoidance Agreement (DTAA) exists with that country." 
      }
    ]
  },
  'nepal-attendance': {
    title: "Nepal University Attendance Calculator | 75% Exam Eligibility Auditor",
    description: "Calculate your mandatory class attendance for TU, KU, POU, and PU. 1500+ words on 75% thresholds, medical leaves, and internal marks auditing for FY 2082/83.",
    
    howToUse: {
      steps: [
        "1. Total Classes Calibration: Input the total number of classes conducted or scheduled for the semester.",
        "2. Presence Entry: Input the number of classes you have physically attended or logged.",
        "3. Threshold Selection: Define the mandatory minimum percentage (Standard is 75% for most Nepali universities).",
        "4. Deficit Analysis: The engine calculates how many more classes you MUST attend to reach the safe zone.",
        "5. Bunk Logic: Determine how many upcoming classes you can safely miss without dropping below the threshold.",
        "6. Medical Leave Sync: Add any documented medical or institutional leaves to adjust your net presence.",
        "7. Internal Marks Audit: Review the correlation between attendance percentages and internal assessment grading.",
        "8. Exam Eligibility Verdict: Receive an immediate institutional status (Eligible or Disqualified)."
      ]
    },
    
    formula: {
      title: "The Academic Eligibility Axiom",
      description: "Attendance is calculated as a simple percentage of total conducted sessions, adjusted for institutional leave policies.",
      raw: "Attendance % = (Classes Attended / Total Classes Conducted) x 100",
      variables: [
        "Classes Attended = Physical presence or verified virtual logs.",
        "Total Classes Conducted = Total sessions scheduled by the department.",
        "Classes to Attend = [(Threshold x Total) / 100] - Attended.",
        "Safe Bunk Count = Attended - [(Threshold x Total) / 100]."
      ]
    },
    
    content: (
        <div className="space-y-12">
        <div className="space-y-12 text-slate-800">
        {/* ==========================================
        SECTION 1: EXECUTIVE SUMMARY
        ========================================== */}
        <div className="bg-indigo-50/50 border-l-4 border-indigo-600 rounded-r-xl p-8 shadow-sm">
        <h2 className="text-indigo-700 font-black text-xs uppercase tracking-[0.3em] mb-3">
        Academic Compliance Executive Summary
        </h2>
        <p className="text-slate-800 text-base leading-relaxed">
        In the Nepali higher education ecosystem—governed by institutions like <strong>Tribhuvan University (TU) </strong>, <strong>Kathmandu University (KU) </strong>, and <strong>Pokhara University (POU) </strong>—the 75% attendance rule is not a suggestion; it is a rigid administrative barrier. Falling below this threshold results in being barred from final board examinations, regardless of academic merit or internal marks. This professional <a href="/calculator/nepal-attendance" className="text-indigo-600 hover:text-indigo-800 underline font-semibold transition-colors">Attendance Auditor</a> is designed to give students absolute control over their eligibility status. By mathematically modeling future class schedules against current presence, our engine provides a predictive roadmap for semester success. Whether you are balancing work-study commitments or recovering from illness, our auditor ensures you remain in the "Safe Zone" for FY 2082/83.
        <br/><br/>
        <span className="text-sm text-slate-600 font-medium">
        Career Strategy: High attendance often correlates with higher internal marks and GPA. Model your academic terminal value using our <a href="/calculator/see-gpa" className="text-indigo-600 hover:text-indigo-800 underline font-bold transition-colors">GPA Intelligence Lab</a>.
        </span>
        </p>
        </div>
        {/* ==========================================
        SECTION 2: UNIVERSITY STANDARDS
        ========================================= */}
        <section>
        <h3 className="text-2xl font-black text-slate-900 mb-6">
        1. The 75% Benchmark: Institutional Breakdown
        </h3>
        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
        <p>
        Most universities in Nepal adhere to the University Grants Commission (UGC) guidelines, which mandate a minimum attendance for student validation.
        </p>
        <div className="overflow-hidden rounded-xl border border-slate-200 mt-6">
        <table className="w-full text-left text-sm">
        <thead className="bg-slate-50">
        <tr>
        <th className="p-4 font-black text-slate-900 uppercase">University</th>
        <th className="p-4 font-black text-slate-900 uppercase">Requirement</th>
        <th className="p-4 font-black text-slate-900 uppercase">Consequence of Failure</th>
        </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
        <tr><td className="p-4 font-bold text-indigo-700">Tribhuvan University (TU)</td><td className="p-4 font-bold">70% - 80%</td><td className="p-4">Barred from Board Exams</td></tr>
        <tr><td className="p-4 font-bold text-sky-700">Kathmandu University (KU)</td><td className="p-4 font-bold">80%</td><td className="p-4">Non-eligibility for Grading</td></tr>
        <tr><td className="p-4 font-bold text-blue-700">Pokhara University (POU)</td><td className="p-4 font-bold">75%</td><td className="p-4">NC (Not Cleared) Status</td></tr>
        <tr><td className="p-4 font-bold text-purple-700">Purbanchal University</td><td className="p-4 font-bold">75%</td><td className="p-4">Administrative Hold</td></tr>
        </tbody>
        </table>
        </div>
        <p className="text-sm mt-4 text-slate-500 italic">
        Audit Note: While the official rule is 75%, many departments allow a 5-10% grace for medical emergencies, provided official documentation is submitted through the proper administrative channels.
        </p>
        </div>
        </section>
        {/* ==========================================
        SECTION 3: MEDICAL & LEAVE LOGISTICS
        ========================================== */}
        <section className="bg-white border border-slate-200 rounded-2xl p-8 mb-8 shadow-sm">
        <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
        <span className="text-indigo-600">🛡️</span> Navigating Medical & Institutional Leaves
        </h3>
        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
        <p>
        Life in Nepal can be unpredictable. Universities recognize this through specific leave categories that can safeguard your eligibility.
        </p>
        <ul className="list-disc pl-6 space-y-3 mt-4">
        <li><strong>Medical Leave:</strong> Requires a doctor's certificate from a recognized hospital. This usually allows the minimum requirement to drop to 60-65% in extreme cases.</li><li><strong>Institutional Duty:</strong> If you are representing your college in sports, debates, or workshops, these missed classes are often marked as 'Appeared' (Attendance given).</li><li><strong>Bereavement Leave:</strong> Typically a 13-day provision in Nepali institutions for immediate family rites, often handled with extreme administrative sensitivity.</li></ul>
        </div>
        </section>
        {/* ==========================================
        SECTION 4: THE INTERNAL MARKS LINK
        ========================================== */}
        <section className="bg-slate-900 text-white rounded-2xl p-8 border border-slate-800 shadow-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600 rounded-full blur-[120px] opacity-20 pointer-events-none" />
        <h3 className="text-xl font-black mb-6 flex items-center gap-3 relative z-10">
        <span className="text-indigo-400">📊</span> Attendance as a Grading Variable
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed mb-8 relative z-10">
        In modern semester systems, attendance isn't just about being allowed to sit for exams—it directly impacts your final GPA through internal assessments.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        <div className="space-y-4">
        <div className="flex items-start gap-4">
        <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 font-bold">1</div>
        <p className="text-sm text-slate-300"><strong className="text-white">Direct Weightage:</strong> Many subjects allocate 5-10% of total marks specifically for attendance consistency.</p>
        </div>
        <div className="flex items-start gap-4">
        <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 font-bold">2</div>
        <p className="text-sm text-slate-300"><strong className="text-white">The Halo Effect:</strong> High attendance indicates to professors that you are a serious candidate, which often results in more favorable subjective grading for viva and projects.</p>
        </div>
        <div className="flex items-start gap-4">
        <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 font-bold">3</div>
        <p className="text-sm text-slate-300"><strong className="text-white">Peer Synergy:</strong> Constant presence allows for better collaboration in lab groups, leading to superior final project quality.</p>
        </div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl"><h4 className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-3">Institutional Strategy</h4>
        <p className="text-xs text-slate-400 leading-relaxed italic">
        "Think of your attendance as 'Equity' in your education. Once it drops below 75%, you lose the ability to participate in the final exam market. If you have been attending regularly but struggle with exams, audit your age-limits for government jobs using our <a href="/calculator/lok-sewa-age" className="text-indigo-400 underline font-bold">Lok Sewa Lab</a>."
        </p></div>
        </div>
        
        </section>
        {/* ==========================================
        SECTION 5: KNOWLEDGE CARDS
        ========================================== */}
        <section className="mt-12">
        <h3 className="text-2xl font-black text-slate-900 mb-6">
        Academic Intelligence Silo
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-300 transition-all">
        <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
        <span className="text-indigo-500">🎓</span> 75% Rule Origin
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
        The rule was established to ensure that students engage with the practical and social elements of campus life, not just rote memorization of textbooks for exams.
        </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-300 transition-all">
        <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
        <span className="text-blue-500">🏫</span> Proxy Culture
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
        While 'Proxy' attendance is common in some large TU colleges, modern biometric systems in private institutions are rapidly making manual rolls obsolete.
        </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-green-300 transition-all">
        <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
        <span className="text-green-600">🏃</span> The 'Safe Zone'
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
        Aiming for 85% provides a buffer for the final weeks of the semester, allowing you to miss classes for intensive self-study or unexpected emergencies.
        </p>
        </div>
        </div>
        </section>
        {/* ==========================================
        SECTION 6: CASE STUDY
        ========================================== */}
        <section className="bg-indigo-50 border border-indigo-100 rounded-3xl p-10 relative overflow-hidden mt-12">
        <div className="relative z-10">
        <h3 className="text-2xl font-black text-indigo-900 mb-4">
        Strategic Case Study: The "Semester Rescue" Audit
        </h3>
        <p className="text-indigo-900/70 text-sm leading-relaxed mb-8">
        A student has attended 40 out of 60 classes. The total semester has 100 classes. They need 75% to appear in boards.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-indigo-200 shadow-sm">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Current Status</h4>
          </div>
          <div className="space-y-2 text-sm text-slate-700">
            <div className="flex justify-between"><span>Total Scheduled:</span> <strong>100</strong></div>
            <div className="flex justify-between"><span>Current Presence:</span> <strong>40/60 (66%)</strong></div>
            <div className="flex justify-between border-t pt-2 mt-2 font-bold text-red-700"><span>Status:</span> <span>High Risk Zone</span></div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-indigo-200 shadow-md transform md:scale-105">
            <h4 className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-4">The Recovery Plan</h4>
          </div>
          <div className="space-y-2 text-sm text-slate-700">
            <div className="flex justify-between"><span>Target Required:</span> <strong>75 Classes</strong></div>
            <div className="flex justify-between"><span>Remaining Classes:</span> <strong>40</strong></div>
            <div className="flex justify-between"><span>Must Attend:</span> <strong>35 more</strong></div>
            <div className="flex justify-between border-t pt-2 mt-2 font-bold text-indigo-700"><span>Verdict:</span> <span>Recoverable</span></div>
          </div>
        </div>
        
        <p className="text-xs text-indigo-900/50 mt-8 italic text-center">
        Audit Observation: The student can only miss 5 more classes out of the remaining 40. This leaves no room for leisure bunking. Prioritize your mental health during high-stress weeks using our <a href="/calculator/sleep" className="text-indigo-600 underline font-bold">Sleep Auditor</a>.
        </p>
        
        </div>
        </section>
        {/* ==========================================
        FOOTER TRUST SIGNALS
        ========================================== */}
        <div className="pt-10 border-t border-slate-200 text-center mt-12">
        <p className="text-[11px] text-slate-400 italic bg-slate-50 inline-block px-6 py-2 rounded-full border border-slate-100">
        Academic Audit: Last updated Baishakh 2083 (May 2026). Calculations are synchronized with UGC Nepal mandates and major university semester bylaws.
        
        
        
        </p>
        </div>
        </div>
        </div>
    ),
    faqs: [
      { 
        question: "What is the minimum attendance required in Tribhuvan University?", 
        answer: "As per TU regulations, a student must have at least 70% to 80% attendance in each subject to be eligible to appear in the final board examination." 
      },
      { 
        question: "What happens if I have 74% attendance?", 
        answer: "Strictly speaking, you are disqualified. However, many colleges allow you to make up the deficit through extra assignments or by submitting a formal medical appeal to the Department Head." 
      },
      { 
        question: "Can medical leave cover my low attendance?", 
        answer: "Yes. If you have a legitimate medical emergency, you can submit a doctor's certificate. This usually allows the department to condone up to 10-15% of your absence." 
      },
      { 
        question: "How do I calculate how many classes I can miss?", 
        answer: "Multiply the total number of classes by 0.75. Subtract this number from your current attendance. If the result is positive, that is your 'Safe Bunk' count." 
      },
      { 
        question: "Does attendance affect my internal marks?", 
        answer: "Yes, in most semester systems, attendance is a direct component of your internal assessment (often worth 5 marks per subject)." 
      },
      { 
        question: "Is biometric attendance mandatory in Nepal?", 
        answer: "While not mandatory by law, most private engineering and medical colleges in Nepal have implemented biometric systems to ensure data integrity." 
      },
      { 
        question: "What is 'NC' status in Pokhara University?", 
        answer: "NC stands for 'Not Cleared'. It is given to students who fail to meet the attendance or internal requirements, meaning they cannot sit for the end-semester exam." 
      },
      { 
        question: "Do labs and theory classes have separate attendance?", 
        answer: "Usually, yes. You must maintain the 75% threshold separately for both theory and practical (lab) sessions to clear the subject." 
      },
      { 
        question: "Can I attend other section classes to make up my attendance?", 
        answer: "This depends entirely on your college administration. Some allow it for genuine clashes, while others strictly only count attendance in your assigned section." 
      },
      { 
        question: "Is there an attendance requirement for Lok Sewa exams?", 
        answer: "No. Public Service Commission (Lok Sewa) exams only care about your degree certificate and age limits, not how often you attended classes during your degree." 
      }
    ]
  }
};


