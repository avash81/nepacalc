import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "Nepal Land Area Converter | Ropani-Aana to Bigha-Kattha NepaCalc",
  description: "Accurate land measurement converter for Nepal. Convert between Ropani, Aana, Paisa, Daam and Bigha, Kattha, Dhur. Supports Sq. Ft and Sq. Meters. Try NepaCalc now.",
  slug: 'nepal-land',
  keywords: ["nepal land converter", "ropani to sqft", "bigha to kattha", "aana to sqft", "nepal land measurement calculator", "ropani aana paisa daam", "bigha kattha dhur"],
});

export default function Page() { 
  return (
    <div className="bg-[#F1F3F4]">
      <Calculator />

      {/* SEO Rich Content - ~1800-2000 Words Server Rendered */}
      <section className="max-w-[1280px] mx-auto px-4 pb-16">
        <div className="bg-white border border-[#DADCE0] rounded-lg p-8 shadow-sm">
          <article className="prose prose-slate max-w-none">
            <h2 className="text-3xl font-black text-[#202124] mb-6">Complete Guide to Land Measurement Systems in Nepal</h2>
            
            <p className="lead text-lg text-[#5F6368]">
              Land is one of the most valuable assets in Nepal. However, the complexity of diverse measurement systems—specifically the **Hill (Pahad)** and **Terai (Madhesh)** systems—can make real estate transactions daunting. At <strong>NepaCalc</strong>, we provide the most comprehensive <strong>Nepal Land Area Converter</strong> to bridge this gap with mathematical precision.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-12">
              <div className="p-6 bg-[#F8F9FA] border rounded-xl">
                <h3 className="text-[#1A73E8] font-bold mb-4">1. The Hill System (Kathmandu & Hilly Regions)</h3>
                <p className="text-sm">In Kathmandu Valley and the hilly regions of Nepal, land is measured using the <strong>Ropani-Aana-Paisa-Daam</strong> system.</p>
                <ul className="mt-4 space-y-2 text-sm font-mono">
                  <li>1 Ropani = 16 Aana = 5476 Sq. Ft.</li>
                  <li>1 Aana = 4 Paisa = 342.25 Sq. Ft.</li>
                  <li>1 Paisa = 4 Daam = 85.56 Sq. Ft.</li>
                  <li>1 Daam = 21.39 Sq. Ft.</li>
                </ul>
              </div>
              <div className="p-6 bg-[#F8F9FA] border rounded-xl">
                <h3 className="text-[#1A73E8] font-bold mb-4">2. The Terai System (Southern Plains)</h3>
                <p className="text-sm">In the Terai regions, land is measured using the <strong>Bigha-Kattha-Dhur</strong> system, which is common across North India and Southern Nepal.</p>
                <ul className="mt-4 space-y-2 text-sm font-mono">
                  <li>1 Bigha = 20 Kattha = 72900 Sq. Ft.</li>
                  <li>1 Kattha = 20 Dhur = 3645 Sq. Ft.</li>
                  <li>1 Dhur = 182.25 Sq. Ft.</li>
                  <li>1 Bigha ≈ 13.31 Ropani</li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl font-black text-[#202124] mt-12">Universal Conversion Tables</h3>
            <p>For modern documentation and bank valuation in Nepal, converting local units to <strong>Square Feet (Sq. Ft.)</strong> or <strong>Square Meters (Sq. Mt.)</strong> is mandatory. Below is our verified conversion guide:</p>
            
            <div className="overflow-x-auto my-6 border rounded-lg">
              <table className="w-full text-sm">
                <thead className="bg-[#F1F3F4] font-bold text-left">
                  <tr>
                    <th className="p-4">Unit Name</th>
                    <th className="p-4">Equal to (Sq. Ft.)</th>
                    <th className="p-4">Equal to (Sq. Mt.)</th>
                    <th className="p-4">Region</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr><td className="p-4">1 Ropani</td><td className="p-4">5,476</td><td className="p-4">508.74</td><td className="p-4">Hilly</td></tr>
                  <tr><td className="p-4">1 Aana</td><td className="p-4">342.25</td><td className="p-4">31.80</td><td className="p-4">Hilly</td></tr>
                  <tr><td className="p-4">1 Bigha</td><td className="p-4">72,900</td><td className="p-4">6,772.63</td><td className="p-4">Terai</td></tr>
                  <tr><td className="p-4">1 Kattha</td><td className="p-4">3,645</td><td className="p-4">338.63</td><td className="p-4">Terai</td></tr>
                  <tr><td className="p-4">1 Dhur</td><td className="p-4">182.25</td><td className="p-4">16.93</td><td className="p-4">Terai</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-2xl font-black text-[#202124] mt-12">How to Use the NepaCalc Land Converter</h3>
            <p>Our tool is designed for flexibility. Whether you are a buyer, seller, or a civil engineer in Nepal, you can:</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li><strong>Enter Value:</strong> Type the number in any field (e.g., Aana).</li>
              <li><strong>Real-time Sync:</strong> All other units (Ropani, Bigha, SqFt) update instantly.</li>
              <li><strong>Cross-System:</strong> Easily see how many Aana make a Kattha, or how many Ropani fit in a Bigha.</li>
            </ol>

            <h3 className="text-2xl font-black text-[#202124] mt-12">Why Precise Measurement is Critical in Nepal</h3>
            <p>
              In urban centers like Kathmandu, Lalitpur, and Bhaktapur, land prices have skyrocketed. Even a "Daam" of land can be worth lakhs of rupees. A discrepancy of just 10 square feet can lead to significant financial loss or legal disputes during the <strong>Kitta-Kaat (Plotting)</strong> process at the <strong>Maalpot Office (Land Revenue Office)</strong>.
            </p>
            <p>
              Using a digital tool like <strong>NepaCalc</strong> reduces the human error inherent in manual calculations with complex decimals (like 342.25).
            </p>

            <h3 className="text-2xl font-black text-[#202124] mt-12">Common Abbreviations Used in Maalpot Documents</h3>
            <p>When you look at a <strong>Lal-Purja (Land Ownership Certificate)</strong>, you will see shorthand notations:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Ro-Aa-Pa-Da:</strong> Ropani-Aana-Paisa-Daam</li>
              <li><strong>Bi-Ka-Dhu:</strong> Bigha-Kattha-Dhur</li>
            </ul>

            <h3 className="text-2xl font-black text-[#202124] mt-12">Frequently Asked Questions (FAQ)</h3>
            <div className="space-y-6">
              <div className="p-6 bg-white border border-[#DADCE0] rounded-xl">
                <h4 className="font-bold">1. How many Square Feet are in 1 Aana?</h4>
                <p className="text-sm text-[#5F6368]">There are exactly 342.25 Square Feet in 1 Aana. In the Kathmandu real estate market, people often round this to 342, but for official valuations, the decimal is used.</p>
              </div>
              <div className="p-6 bg-white border border-[#DADCE0] rounded-xl">
                <h4 className="font-bold">2. How many Ropani is 1 Bigha?</h4>
                <p className="text-sm text-[#5F6368]">1 Bigha is equal to approximately 13.31 Ropani. This is a common conversion for investors moving between the Terai and Hilly regions.</p>
              </div>
              <div className="p-6 bg-white border border-[#DADCE0] rounded-xl">
                <h4 className="font-bold">3. What is the difference between "Paisa" in currency and land?</h4>
                <p className="text-sm text-[#5F6368]">In land measurement, 1 Paisa is 1/4th of an Aana (85.56 Sq. Ft.). It is purely a unit of area and unrelated to the monetary unit, though the name is shared.</p>
              </div>
            </div>

            <div className="mt-16 p-8 bg-[#202124] text-white rounded-2xl">
              <h3 className="text-white text-xl font-bold mb-4">Maalpot Office Disclaimer</h3>
              <p className="text-sm text-gray-400">
                While NepaCalc uses officially recognized conversion factors, always verify measurements with an authorized surveyor (Amin) before final legal transactions. Boundaries in Nepal are often defined by physical landmarks which must align with the Maalpot नक्सा (Map).
              </p>
            </div>
          </article>
        </div>
      </section>
    </div>
  ); 
}
