import { calcMeta } from '@/lib/calcMeta';
import GoldDashboardClient from './GoldDashboardClient';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { PillarFAQ } from '@/components/seo/PillarFAQ';

export const metadata = calcMeta({
  title: 'Gold Price & Weight Converter in Nepal | Tola, Ana, Lal to Grams',
  description: 'Calculate raw jewelry weights with the definitive Nepalese Gold Converter. Converts Tola, Ana, and Lal into Grams using official FENEGOSIDA baseline rates. Aajako Sunko Vau 2083 BS.',
  slug: 'market-rates/live-gold-price',
  keywords: [
    'gold price nepal today', 'gold rate per tola', '24k gold price nepal', '22k gold price nepal',
    'gold price kathmandu', 'fenegosida gold rate', '1 tola gold price in nepal', '1 lal gold price in nepal today',
    'aajako sunko vau nepal 2083', 'sunko vau calculator', 'tejabi gold price nepal', 'chandi ko vau',
    'gold price nepal 2026', 'hallmark gold nepal', '4 ana gold price in nepal'
  ],
});

const GOLD_FAQS = [
  {
    question: "Who determines the daily gold price in Nepal?",
    answer: "The official daily gold and silver rates in Nepal are determined by the Federation of Nepal Gold and Silver Dealers' Association (FENEGOSIDA) based on international market indices (LBMA spot price), the USD to NPR exchange rate set by Nepal Rastra Bank (NRB), and local supply-demand factors. Rates are typically published daily at 10:00–11:00 AM except Saturdays and major holidays."
  },
  {
    question: "How many grams are in 1 Tola of gold?",
    answer: "In Nepal, 1 Tola of gold is officially equal to exactly 11.6638 grams (precisely 11.6638125g). Jewelers often round this to 11.66g for general calculations. 1 Tola = 10 Ana = 100 Lal."
  },
  {
    question: "What is 1 Lal of gold in grams and price today?",
    answer: "1 Lal (लाल्) of gold equals exactly 0.1166 grams. Since there are 100 Lals in 1 Tola, the price of 1 Lal is exactly 1% of the daily Tola rate. At the FENEGOSIDA baseline of NPR 292,000 per tola, 1 Lal of Fine 24K gold costs NPR 2,920. Retail jewelry will add 10–15% making charge (jyala) on top."
  },
  {
    question: "What is the difference between Fine Gold (Hallmark) and Tejabi (22K) gold pricing in Nepal?",
    answer: "Fine Gold (Hallmark/छापावाल सुन) has a guaranteed purity of 99.99% (24 Karat) and is used for investment biscuits and coins. Tajabi Gold (तेजाबी सुन) is approximately 91.6% pure (22 Karat) and is the standard for traditional jewelry like Tilhari and Naugedi malas. Tajabi gold trades at around 91.6% of the Fine Gold rate per tola. Both are tracked daily on FENEGOSIDA."
  },
  {
    question: "How much is 4 Ana of gold in Nepal?",
    answer: "4 Ana equals 25 Lal, or exactly a quarter of 1 Tola (0.25 Tola), which is 2.916 grams. To calculate the current market value, divide the daily 24K rate by 4. For example, at NPR 292,000 per tola, 4 Ana costs NPR 73,000 for raw bullion before making charges."
  },
  {
    question: "What is 'Aajako Sunko Vau' (आजको सुनको भाउ)?",
    answer: "'Aajako Sunko Vau' (आजको सुनको भाउ) is the Nepali phrase for 'today's gold price'. The official daily rate is published by FENEGOSIDA every morning. For 2083 BS (2026 AD), Fine Gold (छापावाल सुन) is tracked per tola in NPR, alongside Tejabi Gold (तेजाबी सुन) at 22K and Silver (चाँदी / Chandi) rates."
  },
  {
    question: "What is 2 Lal gold price in Nepal today?",
    answer: "The price of 2 Lal of pure 24K gold is calculated using the formula: Price per Tola × 0.02. At the standard FENEGOSIDA baseline rate of NPR 292,000 per tola, 2 Lal of gold equals NPR 5,840 before any storefront making charges (jyala). For 22K Tejabi, multiply the 22K tola rate by 0.02."
  },
  {
    question: "Does the price shown include making charges and VAT?",
    answer: "No. The rates displayed are for raw bullion metal only. Retailers add 'Jyala' (making charges, typically 5–15% of the base metal value) and 13% VAT on finished jewelry. When selling old gold, making charges are excluded — only the raw metal value is returned."
  },
  {
    question: "How do you convert Silver (Chandi) from Tola to Grams?",
    answer: "Just like gold, silver (चाँदी) trading in Nepal uses the Tola unit. 1 Tola of Silver equals exactly 11.6638 grams. To find the silver price per gram, divide the daily FENEGOSIDA silver rate per tola by 11.6638. For 1 Lal of silver, divide the tola rate by 100."
  },
  {
    question: "How is 22 carat or Tejabi gold priced per Lal in Nepal?",
    answer: "The price of 22 carat Tejabi gold per Lal is calculated by dividing the daily official 22K Tola rate by 100. Since 1 Lal equals 0.1166 grams, a 22K piece of jewelry tracks at approximately 91.6% of the pure 24K baseline value. For example, if 24K is NPR 292,000/tola, then 22K ≈ NPR 267,472/tola, making 1 Lal of 22K ≈ NPR 2,675."
  }
];

const customSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FinancialProduct",
      "@id": "https://nepacalc.com/market-rates/live-gold-price/#financial-data",
      "name": "FENEGOSIDA Mapped Gold Conversion Engine",
      "description": "Calculates real-time values of Fine 24K and Tajabi 22K gold in Nepal across Tola, Lal, Ana, and Gram units. Also covers Silver (Chandi) rates.",
      "feesAndCommissionsSpecification": "https://nepacalc.com/market-rates/live-gold-price/#jewelry-making-charges",
      "provider": {
        "@type": "Organization",
        "name": "Federation of Nepal Gold and Silver Dealers' Association",
        "sameAs": "https://www.fenegosida.org"
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://nepacalc.com/market-rates/live-gold-price/#faq-expanded",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How many grams are in 1 tola of gold in Nepal?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "In Nepal, 1 tola of gold is officially equal to 11.6638 grams. Jewelers often round this to 11.66 grams for general calculations."
          }
        },
        {
          "@type": "Question",
          "name": "What is 1 lal of gold converted to grams?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "1 lal of gold is equal to exactly 0.1166 grams. Since 1 tola contains 100 lals, dividing 11.6638 grams by 100 gives you the precise 0.1166g metric."
          }
        },
        {
          "@type": "Question",
          "name": "How many lal make 1 ana of gold?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "In traditional Nepalese jewelry measurements, 10 lal make up exactly 1 ana of gold, which is equal to 1.1664 grams."
          }
        },
        {
          "@type": "Question",
          "name": "What is the difference between Fine Gold and Tajabi Gold pricing in Nepal?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Fine Gold has a purity of 99.99% (24K), while Tajabi Gold is slightly lower at around 91.6% purity (22K). This causes Tajabi gold to sell at a slightly reduced price per tola compared to fine gold."
          }
        },
        {
          "@type": "Question",
          "name": "How is 22 carat or Tejabi gold priced per Lal in Nepal?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The price of 22 carat or Tejabi gold per Lal is calculated by dividing the daily official 22K Tola rate by 100. Since 1 Lal equals 0.1166 grams, a 22K piece of jewelry tracks exactly at 91.6% to 99.5% of the pure 24K baseline value depending on the specific refine certification."
          }
        },
        {
          "@type": "Question",
          "name": "What is Aajako Sunko Vau in Nepal 2083?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Aajako Sunko Vau (आजको सुनको भाउ) means today's gold price in Nepali. The rate is set daily by FENEGOSIDA and covers Fine Gold (छापावाल सुन/24K), Tejabi Gold (तेजाबी सुन/22K), and Silver (चाँदीको भाउ) per tola."
          }
        }
      ]
    }
  ]
};

export default function Page() {
  return (
    <div className="bg-white min-h-screen">
      {/* Rich JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(customSchema) }}
      />

      <CalcWrapper
        title="Live Gold Price"
        description="Daily precious metal indices synchronized with FENEGOSIDA benchmarks for the Nepalese jewelry market."
        crumbs={[{ label: 'Directory', href: '/directory/' }, { label: 'Gold Price' }]}
        isNepal={true}
        hideHeader={true}
        relatedCalcs={[
          { name: 'Gold Tax Calculator', slug: '/calculator/gold-tax/' },
          { name: 'Live Silver Price', slug: '/market-rates/live-silver-price/' },
          { name: 'Exchange Rates', slug: '/market-rates/exchange-rate/' }
        ]}
      >
        <GoldDashboardClient />

        {/* ── SEO Content Section ── */}
        <div className="hp-container pb-16 border-t border-slate-100 pt-12">
          <div className="max-w-4xl mx-auto space-y-16">

            {/* Localization anchors (visible but subtle) */}
            <div className="text-[11px] text-slate-400 font-medium tracking-wide border border-slate-100 rounded-xl px-5 py-3 bg-slate-50 flex flex-wrap gap-x-4 gap-y-1">
              <span>आजको सुनको भाउ २०८३</span>
              <span>•</span>
              <span>Aajako Sunko Vau Nepal 2083</span>
              <span>•</span>
              <span>छापावाल सुन (Fine Gold)</span>
              <span>•</span>
              <span>तेजाबी सुन (Tejabi/22K Gold)</span>
              <span>•</span>
              <span>चाँदीको भाउ (Silver Rate / Chandi Ko Vau)</span>
              <span>•</span>
              <span>Gold Price in Nepal 2026 / 2083 BS Daily Update</span>
            </div>

            {/* ── Conversion Reference Tables ── */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter mb-2">
                Traditional Nepalese Gold Weight Conversion Table
              </h2>
              <p className="text-slate-500 text-sm mb-8 font-medium">Official unit relationships used by FENEGOSIDA and local jewelers across Nepal.</p>

              <div className="overflow-x-auto rounded-2xl border border-amber-100 shadow-sm mb-10">
                <table className="w-full text-left">
                  <thead className="bg-amber-50">
                    <tr className="text-[10px] font-black text-amber-700 uppercase tracking-widest">
                      <th className="px-5 py-4">Traditional Unit</th>
                      <th className="px-5 py-4">Equivalent</th>
                      <th className="px-5 py-4">Metric Weight</th>
                      <th className="px-5 py-4 hidden sm:table-cell">Search Target</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-amber-50 bg-white text-sm font-medium text-slate-700">
                    <tr className="hover:bg-amber-50/40 transition-colors">
                      <td className="px-5 py-4 font-black text-slate-900">1 Lal (लाल्)</td>
                      <td className="px-5 py-4 text-slate-500">—</td>
                      <td className="px-5 py-4 font-bold text-amber-700">0.1166 g</td>
                      <td className="px-5 py-4 text-[11px] text-slate-400 hidden sm:table-cell">1 lal gold price in nepal today</td>
                    </tr>
                    <tr className="hover:bg-amber-50/40 transition-colors">
                      <td className="px-5 py-4 font-black text-slate-900">1 Ana (आना)</td>
                      <td className="px-5 py-4 text-slate-500">10 Lal</td>
                      <td className="px-5 py-4 font-bold text-amber-700">1.1664 g</td>
                      <td className="px-5 py-4 text-[11px] text-slate-400 hidden sm:table-cell">4 ana gold price in nepal</td>
                    </tr>
                    <tr className="hover:bg-amber-50/40 transition-colors">
                      <td className="px-5 py-4 font-black text-slate-900">1 Tola (तोला)</td>
                      <td className="px-5 py-4 text-slate-500">10 Ana / 100 Lal</td>
                      <td className="px-5 py-4 font-bold text-amber-700">11.6638 g</td>
                      <td className="px-5 py-4 text-[11px] text-slate-400 hidden sm:table-cell">1 tola gold price in nepal today</td>
                    </tr>
                    <tr className="hover:bg-amber-50/40 transition-colors">
                      <td className="px-5 py-4 font-black text-slate-900">10 Tola Bar</td>
                      <td className="px-5 py-4 text-slate-500">1,000 Lal</td>
                      <td className="px-5 py-4 font-bold text-amber-700">116.638 g</td>
                      <td className="px-5 py-4 text-[11px] text-slate-400 hidden sm:table-cell">10 tola gold bar price nepal</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* 24K vs 22K vs Silver Matrix */}
              <h3 className="text-lg font-black text-slate-800 mb-4 tracking-tight">24K vs 22K vs Silver — Complete Purity & Pricing Architecture</h3>
              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm mb-10">
                <table className="w-full text-left">
                  <thead className="bg-slate-800">
                    <tr className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                      <th className="px-5 py-4">Unit</th>
                      <th className="px-5 py-4">Grams</th>
                      <th className="px-5 py-4 text-yellow-400">Fine Gold 24K (छापावाल)</th>
                      <th className="px-5 py-4 text-amber-300">Tejabi Gold 22K (तेजाबी)</th>
                      <th className="px-5 py-4 text-slate-300">Silver (चाँदी)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white text-sm font-medium text-slate-700">
                    {[
                      { unit: '1 Lal', g: '0.1166g', k24: '1/100 of 24K Tola Rate', k22: '1/100 of 22K Tola Rate', silver: '1/100 of Silver Tola Rate' },
                      { unit: '1 Ana', g: '1.1664g', k24: '1/10 of 24K Tola Rate', k22: '1/10 of 22K Tola Rate', silver: '1/10 of Silver Tola Rate' },
                      { unit: '1 Tola', g: '11.6638g', k24: 'Base Market Rate (100%)', k22: '~91.6% of 24K Rate', silver: 'Base Silver Rate' },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors">
                        <td className="px-5 py-4 font-black text-slate-900">{row.unit}</td>
                        <td className="px-5 py-4 text-slate-500">{row.g}</td>
                        <td className="px-5 py-4 text-yellow-700 font-bold">{row.k24}</td>
                        <td className="px-5 py-4 text-amber-700 font-bold">{row.k22}</td>
                        <td className="px-5 py-4 text-slate-500">{row.silver}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Live Fractional Valuation Sheet */}
              <h3 className="text-lg font-black text-slate-800 mb-4 tracking-tight">Live Fractional Valuation — Fine Gold 24K (NPR 292,000/Tola Baseline)</h3>
              <div className="overflow-x-auto rounded-2xl border border-amber-200 shadow-sm">
                <table className="w-full text-left">
                  <thead className="bg-amber-50">
                    <tr className="text-[10px] font-black text-amber-700 uppercase tracking-widest">
                      <th className="px-5 py-4">Weight</th>
                      <th className="px-5 py-4">Grams</th>
                      <th className="px-5 py-4">Formula</th>
                      <th className="px-5 py-4 text-right">Value (NPR)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-amber-50 bg-white text-sm font-medium text-slate-700">
                    {[
                      { w: '1 Lal', g: '0.1166g', f: '1/100 of Tola', v: 'NPR 2,920' },
                      { w: '2 Lal', g: '0.2333g', f: '2/100 of Tola', v: 'NPR 5,840' },
                      { w: '3 Lal', g: '0.3500g', f: '3/100 of Tola', v: 'NPR 8,760' },
                      { w: '10 Lal (1 Ana)', g: '1.1664g', f: '10/100 of Tola', v: 'NPR 29,200' },
                      { w: '15 Lal', g: '1.7496g', f: '15/100 of Tola', v: 'NPR 43,800' },
                      { w: '40 Lal', g: '4.6655g', f: '40/100 of Tola', v: 'NPR 1,16,800' },
                      { w: '50 Lal (Half Tola)', g: '5.8319g', f: '50/100 of Tola', v: 'NPR 1,46,000' },
                      { w: '75 Lal', g: '8.7479g', f: '75/100 of Tola', v: 'NPR 2,19,000' },
                      { w: '1 Tola', g: '11.6638g', f: '100/100 of Tola', v: 'NPR 2,92,000' },
                    ].map((row, i) => (
                      <tr key={i} className={`hover:bg-amber-50/40 transition-colors ${i === 8 ? 'font-black text-slate-900 bg-amber-50' : ''}`}>
                        <td className="px-5 py-4 font-bold">{row.w}</td>
                        <td className="px-5 py-4 text-slate-500">{row.g}</td>
                        <td className="px-5 py-4 text-slate-500 font-mono text-xs">{row.f}</td>
                        <td className="px-5 py-4 text-right font-black text-amber-700">{row.v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* ── AI-Bait Content Block ── */}
            <section className="prose prose-slate max-w-none">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter mb-6">
                Traditional Nepalese Jewelry Weight Rules: Tola, Ana, and Lal to Grams
              </h2>
              <p className="text-slate-700 text-base leading-relaxed mb-5 font-medium">
                When buying or selling jewelry in local markets across Kathmandu, Lalitpur, or Pokhara, transactions use traditional South Asian weight metrics instead of standard metric grams. If you are calculating old family assets or checking daily rates on FENEGOSIDA, use these absolute conversion rules:
              </p>
              <ul className="space-y-3 mb-8 not-prose">
                {[
                  { term: '1 Tola to Grams:', value: 'Exactly 11.6638 Grams defines one full Tola.' },
                  { term: '1 Lal to Grams:', value: 'Exactly 0.1166 Grams defines one Lal. There are precisely 100 Lals in a single Tola.' },
                  { term: '1 Ana to Grams:', value: 'Exactly 1.1664 Grams defines one Ana. In standard Nepalese gold trading, 10 Lal equals 1 Ana.' },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-700 text-sm leading-relaxed font-medium">
                    <span className="mt-1 w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                    <span><strong className="text-slate-900">{item.term}</strong> {item.value}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-xl font-black text-slate-900 tracking-tight mb-4">Official Gold Weight & Valuation Standards in Nepal</h3>
              <p className="text-slate-700 text-base leading-relaxed mb-5 font-medium">
                The official daily price of gold in Nepal is set by the <strong>Federation of Nepal Gold and Silver Dealers&apos; Association (FENEGOSIDA)</strong>. This domestic benchmark is calculated by combining global market metrics from the London Bullion Market Association (LBMA) with the current USD to NPR exchange rates provided by the Nepal Rastra Bank (NRB).
              </p>

              <h3 className="text-xl font-black text-slate-900 tracking-tight mb-4">Real-World Jewelry Pricing Equations (Buying vs. Selling)</h3>
              <div className="space-y-5 not-prose mb-6">
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
                  <p className="text-[11px] font-black text-amber-700 uppercase tracking-widest mb-2">When Buying Gold Jewelry</p>
                  <p className="text-sm text-slate-700 font-medium leading-relaxed mb-3">
                    The total retail price includes the base bullion rate plus the jeweler&apos;s making charges (<em>jyala</em>) and design material loss (<em>wastage/jadaa</em>).
                  </p>
                  <code className="block text-xs bg-white border border-amber-200 rounded-xl px-4 py-3 text-amber-800 font-mono">
                    Total Cost = (Weight in Tolas × Daily FENEGOSIDA Rate) + Jyala + Wastage
                  </code>
                  <p className="text-[11px] text-slate-500 font-medium mt-2">Note: Making charges and wastage typically add an extra 10% to 15% onto the raw market value.</p>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                  <p className="text-[11px] font-black text-slate-600 uppercase tracking-widest mb-2">When Selling Old Gold</p>
                  <p className="text-sm text-slate-700 font-medium leading-relaxed">
                    Retailers determine the cash-back value by subtracting the original wastage calculations and testing the absolute karat purity of the jewelry item. Making charges are completely excluded from resale payouts.
                  </p>
                </div>
              </div>

              {/* Snippet-Optimized Q&A */}
              <h3 className="text-xl font-black text-slate-900 tracking-tight mb-4">1 Lal Gold Price in Nepal Today</h3>
              <p className="text-slate-700 text-base leading-relaxed mb-5 font-medium">
                The raw price of <strong>1 Lal</strong> of Fine 24K gold in Nepal is exactly <strong>1% of the current price of 1 Tola</strong>. When the market rate matches the FENEGOSIDA baseline of NPR 292,000 per tola, <strong>1 Lal of gold is worth exactly NPR 2,920</strong>. To find the total retail cost of finished jewelry, factor in an additional 10% to 15% local making charge (<em>jyala</em>). Use the class <code>.live-per-lal-cost</code> to inject live values dynamically.
              </p>

              <h3 className="text-xl font-black text-slate-900 tracking-tight mb-4">2 Lal Gold Price in Nepal Today</h3>
              <p className="text-slate-700 text-base leading-relaxed mb-5 font-medium">
                To calculate the price of <strong>2 Lal</strong> of pure gold, use the formula: <em>Price per Tola × 0.02</em>. At a standard baseline rate of NPR 292,000 per tola, <strong>2 Lal of gold translates to NPR 5,840</strong> before any storefront design or craftsmanship costs are calculated.
              </p>

              <h3 className="text-xl font-black text-slate-900 tracking-tight mb-4">What is 'Aajako Sunko Vau' for 22 Carat vs 24 Carat Gold in Nepal?</h3>
              <p className="text-slate-700 text-base leading-relaxed mb-5 font-medium">
                &quot;Aajako Sunko Vau&quot; (आजको सुनको भाउ) refers to the official daily bullion rate published by FENEGOSIDA. When calculating jewelry costs for items like traditional Tilhari or Naugedi malas, retailers use <strong>22 Carat (Tejabi/Hallmark 916)</strong> standards. 22K gold contains 91.6% pure gold mixed with alloys for durability. Its retail price per Tola or Lal is proportionally lower than 24K Fine Gold, though crafting making charges (<em>jyala</em>) apply equally to both.
              </p>
            </section>

            {/* ── Full FAQ Component ── */}
            <PillarFAQ faqs={GOLD_FAQS} title="Gold Price in Nepal — Full FAQ (Sunko Vau 2083/2026)" />

            {/* ── Market Insight ── */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter mb-6">
                Market Insight: Gold Trading in Nepal 2083/84
              </h2>
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-700 text-base leading-relaxed mb-6 font-medium">
                  Gold is more than just a metal in Nepal; it is a vital asset for financial security and cultural heritage. The daily <strong>Gold Rate in Nepal</strong> is influenced by international LME (London Metal Exchange) prices and the USD-to-NPR exchange rate.
                </p>
                <p className="text-slate-700 text-base leading-relaxed mb-6">
                  Our dashboard provides high-precision data mapping directly to the <strong>FENEGOSIDA</strong> (Federation of Nepal Gold and Silver Dealers&apos; Association) official list, ensuring you have the most reliable figures for hallmark jewelry or investment biscuits.
                </p>
              </div>
            </section>

          </div>
        </div>
      </CalcWrapper>
    </div>
  );
}
