const fs = require('fs');
const file = 'src/data/seo/nepal-specific.tsx';
let content = fs.readFileSync(file, 'utf8');

const replacement = `  'gold-converter': {
    title: "Gold Converter Nepal: Tola, Gram, Aana, & Lal Calculator",
    description: "Convert gold weight in Nepal instantly. High-precision calculator for Tola to Gram, Lal to Gram (1 Lal = 0.1166g), and traditional Aana units.",
    howToUse: {
      steps: [
        "1. Select Unit: Choose between Tola, Lal, or Grams.",
        "2. Purity Selection: Choose 24k Hallmark or 22k Tejabi gold.",
        "3. Calculation: The tool provides the weight and price conversion instantly."
      ]
    },
    formula: {
      title: "Gold Conversion Factors",
      description: "In Nepal, gold is traditionally measured in Tolas and Lals.",
      raw: "1 Tola = 11.6638 grams | 1 Tola = 100 Lal",
      variables: ["Weight = The mass of gold.", "Rate = The current market price."]
    },
    content: (
        <div className="space-y-16">
            <div className="bg-[#0f172a] text-white rounded-[2.5rem] p-12 border border-slate-800 shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-blue-400 font-black text-xs uppercase tracking-[0.4em] mb-4">
                        Professional Computational Guidance
                    </h2>
                    <h3 className="text-4xl font-black mb-8 leading-tight">
                        Nepal Gold Weight Converter (Tola, Gram, Aana, Lal)
                    </h3>
                    <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-4xl">
                        Navigating traditional jewelry measurements in Nepal can be confusing, especially when balancing historical local scales with modern metric weights. Whether you are auditing family heirlooms, calculating custom jewelry fabrication costs, or verifying weights against the Federation of Nepal Gold and Silver Dealers' Association (FENEGOSIDA) benchmarks, accuracy is paramount.
                    </p>
                    <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-4xl">
                        Our automated gold calculator Nepal simplifies the process. This dynamic system converts instantly between international Grams (g) and traditional domestic units: Tola, Aana, Ratti, and Lal.
                    </p>
                </div>
            </div>

            <section className="space-y-8">
                <h3 className="text-3xl font-black text-slate-900">📐 Understanding the Nepal Gold Measurement System (1 Tola = 100 Lal)</h3>
                <div className="bg-white border border-slate-200 rounded-[2.5rem] p-12 shadow-sm text-slate-700 leading-relaxed space-y-6">
                    <p className="text-slate-600 leading-relaxed text-base">
                        In the Nepali gold market, the <strong>Tola (तोला)</strong> is the foundational baseline unit of mass. However, for smaller pieces of jewelry like rings, nose pins (Phuli), and earrings, jewelers break weights down into <strong>Aana</strong> and <strong>Lal (लाल)</strong>.
                    </p>
                    <p className="text-slate-600 leading-relaxed text-base">
                        The structural mathematical relationship governing the official Nepal gold unit scale follows these exact ratios:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-slate-600 font-medium">
                        <li><strong>1 Tola</strong> = 100 Lal</li>
                        <li><strong>1 Tola</strong> = 16 Aana</li>
                        <li><strong>1 Tola</strong> = 11.6638 Grams</li>
                        <li><strong>1 Aana</strong> = 6.25 Lal</li>
                        <li><strong>1 Lal</strong> = 0.116638 Grams (commonly rounded to 0.1166g)</li>
                    </ul>
                    <p className="text-slate-600 leading-relaxed text-base">
                        If a jeweler tells you an asset weighs 12 Aanas, that equates exactly to 75 Lal, which represents precisely 0.75 Tola of pure gold.
                    </p>
                </div>
            </section>

            <section className="space-y-8">
                <h3 className="text-3xl font-black text-slate-900">🧮 Mathematical Conversion Constants & Formulas</h3>
                <div className="bg-white border border-slate-200 rounded-[2.5rem] p-12 shadow-sm text-slate-700 leading-relaxed space-y-8">
                    <div>
                        <h4 className="text-xl font-bold text-slate-800 mb-4">How to Convert Lal to Gram</h4>
                        <p className="text-slate-600 leading-relaxed text-base mb-2">
                            Because 1 Tola equals 100 Lal and weighs exactly 11.6638 grams, a single Lal is exceptionally light.
                        </p>
                        <div className="bg-slate-50 p-4 rounded-lg font-mono text-sm text-slate-800 mb-2">
                            Weight in Grams = Total Lal × 0.116638
                        </div>
                        <p className="text-slate-600 text-sm italic">
                            Example: If you want to find out how many grams are in 15 Lal: 15 × 0.116638 = 1.7495 grams.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-xl font-bold text-slate-800 mb-4">How to Convert Gram to Lal</h4>
                        <p className="text-slate-600 leading-relaxed text-base mb-2">
                            If you have a digital kitchen scale or a laboratory balance measuring an item in grams, translate it back to traditional units using this division formula:
                        </p>
                        <div className="bg-slate-50 p-4 rounded-lg font-mono text-sm text-slate-800">
                            Weight in Lal = Weight in Grams ÷ 0.116638
                        </div>
                    </div>
                </div>
            </section>

            <section className="space-y-8">
                <h3 className="text-3xl font-black text-slate-900">📊 Official Tola, Lal, and Gram Conversion Matrix</h3>
                <div className="bg-white border border-slate-200 rounded-[2.5rem] p-12 shadow-sm text-slate-700 leading-relaxed overflow-x-auto">
                    <p className="text-slate-600 leading-relaxed text-base mb-6">
                        This reference table outlines the most common transactional weights searched across local Nepali markets. It maps out exactly how traditional weight fractions correspond to modern metric scales:
                    </p>
                    <table className="w-full text-left border-collapse min-w-[600px]">
                        <thead>
                            <tr className="border-b-2 border-slate-200">
                                <th className="py-4 px-4 font-bold text-slate-800">Traditional Weight Unit</th>
                                <th className="py-4 px-4 font-bold text-slate-800">Equivalent Value in Lal</th>
                                <th className="py-4 px-4 font-bold text-slate-800">Weight in Grams (g)</th>
                                <th className="py-4 px-4 font-bold text-slate-800">Fractional Tola Value</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            <tr className="hover:bg-slate-50">
                                <td className="py-3 px-4 font-medium"><strong>1 Lal</strong></td>
                                <td className="py-3 px-4">1 Lal</td>
                                <td className="py-3 px-4">0.1166 g</td>
                                <td className="py-3 px-4">0.01 Tola</td>
                            </tr>
                            <tr className="hover:bg-slate-50">
                                <td className="py-3 px-4 font-medium"><strong>2 Lal</strong></td>
                                <td className="py-3 px-4">2 Lal</td>
                                <td className="py-3 px-4">0.2333 g</td>
                                <td className="py-3 px-4">0.02 Tola</td>
                            </tr>
                            <tr className="hover:bg-slate-50">
                                <td className="py-3 px-4 font-medium"><strong>3 Lal</strong></td>
                                <td className="py-3 px-4">3 Lal</td>
                                <td className="py-3 px-4">0.3499 g</td>
                                <td className="py-3 px-4">0.03 Tola</td>
                            </tr>
                            <tr className="hover:bg-slate-50">
                                <td className="py-3 px-4 font-medium"><strong>6.25 Lal (1 Aana)</strong></td>
                                <td className="py-3 px-4">6.25 Lal</td>
                                <td className="py-3 px-4">0.7290 g</td>
                                <td className="py-3 px-4">0.0625 Tola</td>
                            </tr>
                            <tr className="hover:bg-slate-50">
                                <td className="py-3 px-4 font-medium"><strong>12.5 Lal (2 Aana)</strong></td>
                                <td className="py-3 px-4">12.5 Lal</td>
                                <td className="py-3 px-4">1.4580 g</td>
                                <td className="py-3 px-4">0.125 Tola</td>
                            </tr>
                            <tr className="hover:bg-slate-50">
                                <td className="py-3 px-4 font-medium"><strong>15 Lal</strong></td>
                                <td className="py-3 px-4">15 Lal</td>
                                <td className="py-3 px-4">1.7496 g</td>
                                <td className="py-3 px-4">0.15 Tola</td>
                            </tr>
                            <tr className="hover:bg-slate-50">
                                <td className="py-3 px-4 font-medium"><strong>40 Lal</strong></td>
                                <td className="py-3 px-4">40 Lal</td>
                                <td className="py-3 px-4">4.6655 g</td>
                                <td className="py-3 px-4">0.40 Tola</td>
                            </tr>
                            <tr className="hover:bg-slate-50">
                                <td className="py-3 px-4 font-medium"><strong>50 Lal (8 Aana / Half Tola)</strong></td>
                                <td className="py-3 px-4">50 Lal</td>
                                <td className="py-3 px-4">5.8319 g</td>
                                <td className="py-3 px-4">0.50 Tola</td>
                            </tr>
                            <tr className="hover:bg-slate-50">
                                <td className="py-3 px-4 font-medium"><strong>75 Lal (12 Aana)</strong></td>
                                <td className="py-3 px-4">75 Lal</td>
                                <td className="py-3 px-4">8.7479 g</td>
                                <td className="py-3 px-4">0.75 Tola</td>
                            </tr>
                            <tr className="hover:bg-slate-50">
                                <td className="py-3 px-4 font-medium"><strong>90 Lal</strong></td>
                                <td className="py-3 px-4">90 Lal</td>
                                <td className="py-3 px-4">10.4974 g</td>
                                <td className="py-3 px-4">0.90 Tola</td>
                            </tr>
                            <tr className="hover:bg-slate-50">
                                <td className="py-3 px-4 font-medium"><strong>100 Lal (1 Tola)</strong></td>
                                <td className="py-3 px-4">100 Lal</td>
                                <td className="py-3 px-4">11.6638 g</td>
                                <td className="py-3 px-4">1.00 Tola</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    ),
    faqs: [
      { question: "How many grams are inside 1 Tola of gold in Nepal?", answer: "Under standard regulations enforced across South Asia and monitored by FENEGOSIDA, 1 Tola of gold is strictly equal to 11.6638 grams." },
      { question: "What does \\"Lal\\" mean in gold weight?", answer: "Lal is a traditional sub-unit of weight used primarily in Nepal for measuring precious metals and gemstones. It represents exactly 1/100th of a single Tola." },
      { question: "Why do some calculators show 1 Tola as 11.66g while others show 11.6638g?", answer: "11.66g is a rounded figure used by local merchants for quick verbal calculations. For formal asset valuations, digital invoicing, and bank collateral auditing, the absolute mathematical standard of 11.6638 grams must be utilized to eliminate structural calculation gaps." },
      { question: "Who sets the gold rates in Nepal?", answer: "The Federation of Nepal Gold and Silver Dealers' Association (FENEGOSIDA) sets the benchmark rates daily based on international market trends." }
    ]
  },`;

const startIdx = content.indexOf(`'gold-converter': {`);
if (startIdx === -1) {
    console.error("Could not find 'gold-converter': {");
    process.exit(1);
}

let endIdx = -1;
let braces = 0;
let started = false;

for (let i = startIdx; i < content.length; i++) {
  if (content[i] === '{') {
    braces++;
    started = true;
  } else if (content[i] === '}') {
    braces--;
  }
  
  if (started && braces === 0) {
    if (content.substr(i, 3) === '},\\n') {
        endIdx = i + 3;
    } else if (content.substr(i, 2) === '},') {
        endIdx = i + 2;
    } else {
        endIdx = i + 1;
    }
    break;
  }
}

const finalContent = content.substring(0, startIdx) + replacement + content.substring(endIdx);
fs.writeFileSync(file, finalContent, 'utf8');
console.log("Success");
