const fs = require('fs');

const filePath = 'c:/Users/hp/Desktop/Movie/calcpro-FIXED/calcpro-final-build/src/data/seo/utility.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const paintCostSeo = `
  'paint-cost': {
    title: "Paint Calculator & Coverage Estimator | Volume vs Surface Metrics",
    description: "Accurate paint estimation using standard volumetric coverage formulas. Learn how surface porosity and Nepal's climate affect paint volume requirements.",
    howToUse: {
      steps: [
        "Measure the height and width of your walls to find the total square footage (Area = Height × Width).",
        "Subtract the area of doors and windows.",
        "Enter the 'Total Wall Area' into the calculator.",
        "Select the number of coats you plan to apply (Darker colors or new walls typically require 2-3 coats).",
        "Input the cost per liter of the paint you wish to buy.",
        "Adjust the coverage value if your paint brand specifies a different coverage rate."
      ]
    },
    formula: {
      title: "The Volumetric Coverage Formula",
      description: "Our paint calculator uses the standard volumetric coverage formula with ceiling rounding to ensure you always purchase enough paint without excessive waste.",
      raw: "Liters Needed = Ceiling((Wall Area × Number of Coats) / Coverage per Liter)"
    },
    content: (
      <div className="space-y-12">
        {/* SECTION 1: QUICK SUMMARY */}
        <div className="bg-[#1a1a2e] border-l-4 border-blue-500 rounded-r-xl p-8 shadow-sm">
          <h2 className="text-blue-400 font-black text-xs uppercase tracking-[0.3em] mb-3">
            Executive Summary
          </h2>
          <p className="text-white text-base leading-relaxed">
            Accurate paint estimation is the difference between a seamless renovation and a frustrating mid-project color mismatch. Paint batches vary slightly between production runs, so running out mid-wall is a critical problem.
            <br/><br/>
            <span className="text-sm text-slate-400">
              Related Tool: Try our <a href="/calculator/area-calculator" className="text-blue-400 hover:text-blue-300 underline font-bold">Area Calculator</a> to determine exact wall dimensions.
            </span>
          </p>
        </div>

        {/* SECTION 2: DEEP DIVE */}
        <section>
          <h3 className="text-2xl font-black text-white mb-6">
            Paint Coverage Science: How Volume, Surface & Coats Interact
          </h3>
          <div className="prose prose-slate max-w-none text-slate-300 leading-relaxed space-y-4">
            <p>
              The key variable is coverage rate, the area a given volume of paint covers at adequate opacity. This varies by paint quality (premium paints cover 10–15% more), wall texture, and application method.
            </p>
            <p>
              We recommend using the rate printed on your specific paint can for the most accurate estimate.
            </p>
            
            <div className="bg-amber-900/20 border border-amber-500/30 rounded-lg p-5 my-8 flex gap-4 items-start">
              <div className="text-amber-500 text-xl">💡</div>
              <div>
                <strong className="block text-amber-500 text-sm uppercase tracking-wider mb-1">Common Pitfall</strong>
                <p className="text-sm text-amber-200/80 m-0">
                  Most people forget to subtract the area of windows and doors, leading to over-purchasing. Always measure these negative spaces before finalizing your total square footage.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2.5: VARIABLE LEGEND */}
        <section className="bg-slate-900/50 rounded-2xl p-8 border border-slate-700/50">
          <h3 className="text-xl font-black text-blue-400 mb-6 flex items-center gap-3">
            <span>📐</span> Variable Decomposition
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-900/50 border border-blue-500/30 flex items-center justify-center font-mono font-bold text-blue-300">
                A
              </div>
              <div>
                <strong className="text-white block mb-1">Total Wall Area</strong>
                <p className="text-sm text-slate-400 leading-relaxed m-0">
                  The net square footage (or meters) of the walls to be painted, after subtracting all negative spaces like doors and windows.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-green-900/50 border border-green-500/30 flex items-center justify-center font-mono font-bold text-green-300">
                C
              </div>
              <div>
                <strong className="text-white block mb-1">Coverage Rate</strong>
                <p className="text-sm text-slate-400 leading-relaxed m-0">
                  The specific spreading rate of the paint (e.g., 120 sq.ft per liter). Premium paints generally have a higher coverage rate than standard emulsions.
                </p>
              </div>
            </li>
          </ul>
        </section>

        {/* SECTION 3: VARIABLE CARDS (LOCALIZATION) */}
        <section>
          <h3 className="text-2xl font-black text-white mb-6">
            Factors Affecting Paint Coverage in Nepal
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="group bg-[#16213e] p-6 rounded-xl border border-blue-900/30 shadow-sm hover:border-blue-500 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-2 w-2 rounded-full bg-blue-500 group-hover:scale-150 transition-transform" />
                <h4 className="text-lg font-bold text-white">Surface Porosity</h4>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Raw concrete and exposed brick (common in Nepal construction) are highly porous and may require a primer coat plus a 20–30% increase in paint volume compared to smooth, pre-painted drywall.
              </p>
            </div>

            <div className="group bg-[#16213e] p-6 rounded-xl border border-blue-900/30 shadow-sm hover:border-green-500 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-2 w-2 rounded-full bg-green-500 group-hover:scale-150 transition-transform" />
                <h4 className="text-lg font-bold text-white">Monsoon Humidity</h4>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                High humidity during Nepal's monsoon season (June–September) extends drying time and can require thinner coats, potentially increasing the number of passes needed for full coverage.
              </p>
            </div>

            <div className="group bg-[#16213e] p-6 rounded-xl border border-blue-900/30 shadow-sm hover:border-purple-500 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-2 w-2 rounded-full bg-purple-500 group-hover:scale-150 transition-transform" />
                <h4 className="text-lg font-bold text-white">Color Transition</h4>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Painting a light color over a dark wall (or vice versa) typically requires 3 coats instead of the standard 2 to achieve a uniform finish without bleed-through.
              </p>
            </div>

            <div className="group bg-[#16213e] p-6 rounded-xl border border-blue-900/30 shadow-sm hover:border-orange-500 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-2 w-2 rounded-full bg-orange-500 group-hover:scale-150 transition-transform" />
                <h4 className="text-lg font-bold text-white">Application Method</h4>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Spraying wastes more paint into the air compared to rolling or brushing. Adjust your volume estimates by adding an extra 10% if using professional spray equipment.
              </p>
            </div>

          </div>
        </section>

        {/* SECTION 4: CASE STUDY */}
        <section className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-10 text-white relative overflow-hidden shadow-lg border border-slate-700">
          <div className="relative z-10">
            <h3 className="text-2xl font-black text-white mb-4">
              Strategic Case Study: Kathmandu Living Room
            </h3>
            <p className="text-slate-300 leading-relaxed mb-6">
              Consider a standard living room in Kathmandu measuring 400 sq.ft. Using a premium emulsion with a coverage rate of 120 sq.ft per liter over a previously painted wall.
            </p>
            
            <div className="bg-black/40 p-6 rounded-xl border border-white/10 font-mono text-sm relative group">
              <button className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-xs px-3 py-1.5 rounded-md text-slate-300 transition-colors flex items-center gap-2" onClick={(e) => e.preventDefault()}>
                <span>📋</span> Copy Example
              </button>
              
              <div className="mb-2"><span className="text-blue-400">Total Area:</span> 400 sq.ft</div>
              <div className="mb-2"><span className="text-blue-400">Coats Required:</span> 2</div>
              <div className="mb-2"><span className="text-blue-400">Total Coverage Needed:</span> 800 sq.ft</div>
              
              <div className="mt-6 pt-4 border-t border-white/20 font-bold text-green-400 text-base">
                Final Requirement: 800 ÷ 120 = 6.67 Liters (Buy 7 Liters)
              </div>
            </div>
          </div>
        </section>
        
        {/* SECTION 5: TRUST SIGNALS */}
        <div className="pt-8 border-t border-slate-800 text-center">
           <p className="text-[10px] text-slate-500 italic">
             Last updated: Baishakh 2081 (May 2024) based on the latest local construction material standards.
           </p>
        </div>
      </div>
    ),
    faqs: [
      { question: "How much paint do I need for a 10x10 room?", answer: "A 10x10 room with 8-foot ceilings has roughly 320 sq.ft of wall space. For two coats, you need to cover 640 sq.ft. At 120 sq.ft per liter, you will need approximately 5.5 liters." },
      { question: "Does primer reduce the amount of paint needed?", answer: "Yes, especially on new or porous walls. A primer seals the surface so the expensive topcoat isn't absorbed, often saving you an entire coat of colored paint." },
      { question: "Why is my paint usage higher than the calculator predicts?", answer: "Variables like heavy wall texture, high porosity, or using a thick-napped roller can decrease your actual coverage rate compared to the manufacturer's ideal specifications." }
    ]
  },
`;

content = content.replace('};', paintCostSeo + '\n};');
fs.writeFileSync(filePath, content, 'utf8');
console.log('Appended paint-cost to utility.tsx');
