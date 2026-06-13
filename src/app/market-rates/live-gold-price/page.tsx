import { calcMeta } from '@/lib/calcMeta';
import GoldDashboardClient from './GoldDashboardClient';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { PillarFAQ } from '@/components/seo/PillarFAQ';

export const metadata = calcMeta({
  title: 'Gold Price & Weight Converter in Nepal | Tola, Ana, Lal to Grams (2026 / 2083 BS)',
  description: 'Calculate today\'s official gold price in Nepal. Converts Tola, Ana, and Lal directly to Grams based on FENEGOSIDA benchmark rates. Check live 24K Fine Gold, 22K Tejabi, and Silver values instantly.',
  slug: 'market-rates/live-gold-price',
  keywords: [
    'gold price in nepal', 'aajako sunko vau', '1 lal gold price in nepal today', '24k gold price today',
    'tejabi sunko rate', 'tola to gram nepal', 'chandi ko vau aajako', 'FENEGOSIDA', '2083 BS',
    '22k gold price nepal', 'gold price kathmandu', '4 ana gold price in nepal',
    'hallmark gold nepal', 'chhapawal sun', 'gold price nepal 2026', 'sunko vau calculator'
  ],
});

const GOLD_FAQS = [
  {
    question: "Who determines the daily gold price in Nepal?",
    answer: "The official daily gold and silver rates in Nepal are determined by the Federation of Nepal Gold and Silver Dealers' Association (FENEGOSIDA), also referred to by the FNGSGJA acronym. Rates are set based on international LBMA spot prices and the USD to NPR exchange rate published by Nepal Rastra Bank (NRB). Rates are published daily at 10:00–11:00 AM NPT except Saturdays and major national holidays — when Friday's closing price carries forward."
  },
  {
    question: "How many grams are in 1 Tola of gold?",
    answer: "In Nepal, 1 Tola of gold is officially equal to exactly 11.6638 grams (precisely 11.6638125g). Jewelers often round this to 11.66g for general calculations. 1 Tola = 10 Ana = 100 Lal. For reverse conversions: 10 Grams = 0.85735 Tola, and 1 Gram = 0.085735 Tola."
  },
  {
    question: "What is 1 Lal of gold in grams and price today?",
    answer: "1 Lal (लाल्) of gold equals exactly 0.1166 grams. Since there are 100 Lals in 1 Tola, the price of 1 Lal is exactly 1% of the daily Tola rate. At the current FENEGOSIDA rate of NPR 292,000 per tola (24K Fine), 1 Lal costs NPR 2,920.00. For 22K Tejabi gold at NPR 289,100/tola, 1 Lal costs NPR 2,891.00. Retail jewelry adds 10–15% making charge (jyala) on top."
  },
  {
    question: "What is the difference between Hallmark, Chhapawal, and Tejabi Gold in Nepal?",
    answer: "Fine Gold (99.99% purity / 24K) is interchangeably called Hallmark Gold or Chhapawal Sun (छापावाल सुन). It trades at NPR 292,000 per Tola. Tejabi Gold (तेजाबी सुन), also referred to as Standard Gold by FNGSGJA, operates at approximately 99.50% purity (22K), carrying a structural discount of NPR 2,900 per Tola (NPR 289,100/Tola). Tejabi is the standard for traditional jewelry production."
  },
  {
    question: "How much is 4 Ana of gold in Nepal?",
    answer: "4 Ana equals 25 Lal, or exactly a quarter of 1 Tola (0.25 Tola), which is 2.9160 grams. At the current FENEGOSIDA rate of NPR 292,000 per tola, 4 Ana of 24K Fine gold costs NPR 73,000. For 22K Tejabi at NPR 289,100/tola, 4 Ana equals NPR 72,275."
  },
  {
    question: "What is 'Aajako Sunko Vau' (आजको सुनको भाउ)?",
    answer: "'Aajako Sunko Vau' (आजको सुनको भाउ) is the Nepali phrase for 'today's gold price'. The official daily rate is published by FENEGOSIDA every morning at approximately 11:00 AM NPT. Important: On Saturdays and national public holidays, no new rate is issued — Friday's closing benchmark carries forward. For 2083 BS (2026 AD), the current rates are: Fine Gold (छापावाल सुन) NPR 292,000/tola, Tejabi Gold (तेजाबी सुन) NPR 289,100/tola, Silver (चाँदी) NPR 4,840/tola."
  },
  {
    question: "What is 2 Lal gold price in Nepal today?",
    answer: "The base raw value of 2 Lal of 24K pure gold is NPR 5,840.00 (NPR 292,000 × 0.02). For 22K Tejabi gold, 2 Lal is priced at NPR 5,782.00 (NPR 289,100 × 0.02). This calculation excludes individual jewelry store fabrication fees (jyala)."
  },
  {
    question: "Does the price shown include making charges and VAT?",
    answer: "No. The rates displayed are for raw bullion metal only. Retailers add Jyala (making charges, typically 5–15% of base metal value) and 13% VAT on finished jewelry. When selling old gold, making charges are excluded — only the raw metal value at the daily buying benchmark is returned."
  },
  {
    question: "How do you convert Silver (Chandi) from Tola to Grams?",
    answer: "Just like gold, silver (चाँदी) trading in Nepal uses the Tola unit. 1 Tola of Silver equals exactly 11.6638 grams. The current FENEGOSIDA baseline is NPR 4,840 per tola, which equals NPR 48.40 per Lal and approximately NPR 415 per 10 grams."
  },
  {
    question: "What is the price of silver per Lal in Nepal?",
    answer: "At the official FENEGOSIDA baseline rate of NPR 4,840 per Tola, silver costs NPR 48.40 per Lal (0.1166 grams). For 1 Ana (10 Lal) of silver, the raw cost is NPR 484.00. Per 10 grams, silver is approximately NPR 4,150."
  }
];

const customSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FinancialProduct",
      "@id": "https://nepacalc.com/market-rates/live-gold-price/#financial-engine",
      "name": "FENEGOSIDA Live-Mapped Gold & Silver Conversion Engine",
      "description": "Calculates real-time values of 24K Fine gold (Chhapawal), 22K Tejabi gold, and Silver (Chandi) across traditional Tola, Lal, Ana, and international Gram mass units.",
      "feesAndCommissionsSpecification": "https://nepacalc.com/market-rates/live-gold-price/#making-charges-and-wastage",
      "provider": {
        "@type": "Organization",
        "name": "Federation of Nepal Gold and Silver Dealers' Association",
        "sameAs": "https://www.fenegosida.org"
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://nepacalc.com/market-rates/live-gold-price/#faq-matrix",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How many grams are in 1 tola of gold in Nepal?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "In Nepal, 1 tola of gold is officially fixed at exactly 11.6638 grams. For reverse conversions: 10 grams = 0.85735 Tola, and 1 gram = 0.085735 Tola."
          }
        },
        {
          "@type": "Question",
          "name": "What is 1 lal of gold converted to grams?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "1 lal of gold is equal to exactly 0.1166 grams. Because 1 full Tola contains precisely 100 lals, dividing 11.6638 grams by 100 provides the precise 0.1166g benchmark metric."
          }
        },
        {
          "@type": "Question",
          "name": "What is the price of 1 lal gold in Nepal today?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Based on current official FENEGOSIDA baseline indicators, the raw cost of 1 Lal of 24K Fine Gold (Chhapawal) is NPR 2,920.00, while 22K Tejabi Gold tracks at NPR 2,891.00 per Lal. For Silver (Chandi), 1 Lal costs NPR 48.40."
          }
        },
        {
          "@type": "Question",
          "name": "How many lal make up 1 ana of gold?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "In traditional Nepalese gold and silver trading systems, exactly 10 lal combine to form 1 ana, which is equivalent to 1.1664 grams of mass weight."
          }
        },
        {
          "@type": "Question",
          "name": "What is the official difference between Hallmark Gold, Chhapawal, and Tejabi Gold in Nepal?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Fine Gold (9999 Purity) is interchangeably referred to as Hallmark Gold or Chhapawal Sun (छापावाल सुन), representing 99.99% pure bullion at NPR 292,000/Tola. Tejabi Gold (तेजाबी सुन), classified by FNGSGJA as Standard Gold, operates at 99.50% purity with a structural discount of NPR 2,900 per Tola (NPR 289,100/Tola)."
          }
        },
        {
          "@type": "Question",
          "name": "What is the price of silver in Nepal today per tola?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The official baseline price of silver (Chandi / चाँदी) in Nepal is NPR 4,840.00 per Tola, which breaks down to NPR 48.40 per Lal and approximately NPR 415.00 per 10 grams."
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
              <span>छापावाल सुन (Fine Gold / Chhapawal Sun)</span>
              <span>•</span>
              <span>तेजाबी सुन (Tejabi/22K Gold)</span>
              <span>•</span>
              <span>चाँदीको भाउ (Silver Rate / Chandi Ko Vau)</span>
              <span>•</span>
              <span>Gold Price in Nepal 2026 / 2083 BS Daily Update</span>
            </div>

            {/* ── Integrated 3-Metal Bullion Matrix ── */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter mb-2">
                Official FENEGOSIDA Purity &amp; Fractional Valuation Chart
              </h2>
              <p className="text-slate-500 text-sm mb-2 font-medium">
                Last Updated: June 13, 2026 (Jestha 30, 2083 BS) | Global Spot Benchmark: $4,239.90 / oz
              </p>

              {/* Saturday / Holiday Policy Note */}
              <div className="mb-6 flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl px-5 py-4">
                <span className="text-amber-600 text-lg mt-0.5">⚠️</span>
                <p className="text-sm text-slate-700 font-medium leading-relaxed">
                  <strong>Important Saturday Pricing Rule:</strong> FENEGOSIDA updates official bullion benchmarks daily from <strong>Sunday through Friday</strong> at approximately 11:00 AM NPT. Because markets are closed on <strong>Saturdays</strong> and major public holidays, rates shown on those days carry over directly from the Friday closing benchmark.
                </p>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm mb-10">
                <table className="w-full text-left">
                  <thead className="bg-slate-900">
                    <tr className="text-[10px] font-black uppercase tracking-widest">
                      <th className="px-4 py-4 text-slate-300">Traditional Unit</th>
                      <th className="px-4 py-4 text-slate-300">Grams</th>
                      <th className="px-4 py-4 text-yellow-400">Fine Gold 24K (छापावाल)<br/><span className="text-yellow-300 font-bold normal-case">NPR 292,000/Tola</span></th>
                      <th className="px-4 py-4 text-amber-300">Tejabi Gold 22K (तेजाबी)<br/><span className="text-amber-200 font-bold normal-case">NPR 289,100/Tola</span></th>
                      <th className="px-4 py-4 text-slate-300">Silver (चाँदी)<br/><span className="text-slate-200 font-bold normal-case">NPR 4,840/Tola</span></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white text-sm font-medium text-slate-700">
                    {[
                      { unit: '1 Lal (लाल्)', g: '0.1166 g', k24: 'NPR 2,920', k22: 'NPR 2,891', sv: 'NPR 48.40' },
                      { unit: '2 Lal', g: '0.2333 g', k24: 'NPR 5,840', k22: 'NPR 5,782', sv: 'NPR 96.80' },
                      { unit: '5 Lal', g: '0.5832 g', k24: 'NPR 14,600', k22: 'NPR 14,455', sv: 'NPR 242.00' },
                      { unit: '1 Ana (आना / 10 Lal)', g: '1.1664 g', k24: 'NPR 29,200', k22: 'NPR 28,910', sv: 'NPR 484.00' },
                      { unit: '4 Ana (Quarter Tola)', g: '2.9160 g', k24: 'NPR 73,000', k22: 'NPR 72,275', sv: 'NPR 1,210' },
                      { unit: '50 Lal (Half Tola)', g: '5.8319 g', k24: 'NPR 1,46,000', k22: 'NPR 1,44,550', sv: 'NPR 2,420' },
                      { unit: '1 Tola (तोला / 100 Lal)', g: '11.6638 g', k24: 'NPR 2,92,000', k22: 'NPR 2,89,100', sv: 'NPR 4,840' },
                      { unit: '10 Grams Bar', g: '10.0000 g', k24: 'NPR 2,50,340', k22: 'NPR 2,47,850', sv: 'NPR 4,150' },
                      { unit: '10 Tola Bar', g: '116.638 g', k24: 'NPR 29,20,000', k22: 'NPR 28,91,000', sv: 'NPR 48,400' },
                    ].map((row, i) => (
                      <tr key={i} className={`hover:bg-amber-50/30 transition-colors ${i === 6 ? 'bg-amber-50 font-black' : ''}`}>
                        <td className="px-4 py-3.5 font-bold text-slate-900">{row.unit}</td>
                        <td className="px-4 py-3.5 text-slate-500 font-mono text-xs">{row.g}</td>
                        <td className="px-4 py-3.5 font-black text-yellow-700">{row.k24}</td>
                        <td className="px-4 py-3.5 font-bold text-amber-700">{row.k22}</td>
                        <td className="px-4 py-3.5 text-slate-500">{row.sv}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Reverse Conversion Note */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                {[
                  { label: '1 Gram →', val: '0.085735 Tola' },
                  { label: '10 Grams →', val: '0.85735 Tola' },
                  { label: '100 Grams →', val: '8.5735 Tola' },
                ].map((item, i) => (
                  <div key={i} className="bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 flex justify-between items-center">
                    <span className="text-xs font-black text-slate-500 uppercase tracking-wider">{item.label}</span>
                    <span className="text-sm font-black text-slate-900">{item.val}</span>
                  </div>
                ))}
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
                Today, the raw cost of <strong>1 Lal</strong> of Fine 24K gold (Chhapawal / छापावाल) in Nepal is <strong className="text-amber-700">NPR 2,920.00</strong>, while <strong>22K Tejabi Gold</strong> per Lal is <strong className="text-amber-600">NPR 2,891.00</strong>. This fraction represents precisely 1% of the official FENEGOSIDA base price for 1 Tola. Final storefront retail prices vary depending on individual jeweler making charges (jyala) and wastage fees.
              </p>

              <h3 className="text-xl font-black text-slate-900 tracking-tight mb-4">2 Lal Gold Price in Nepal Today</h3>
              <p className="text-slate-700 text-base leading-relaxed mb-5 font-medium">
                The base raw value of <strong>2 Lal</strong> of 24K pure gold is exactly <strong className="text-amber-700">NPR 5,840.00</strong> (NPR 292,000 × 0.02). For 22K Tejabi gold configurations, 2 Lal is priced at <strong>NPR 5,782.00</strong> (NPR 289,100 × 0.02). This calculation excludes individual jewelry store fabrication fees.
              </p>

              <h3 className="text-xl font-black text-slate-900 tracking-tight mb-4">How Much is 4 Ana of Gold in Nepal?</h3>
              <p className="text-slate-700 text-base leading-relaxed mb-5 font-medium">
                In traditional Nepalese weight structures, <strong>4 Ana</strong> equals <strong>25 Lal</strong>, representing exactly <strong>a quarter of a Tola (0.25 Tola)</strong>, or a metric weight of <strong>2.9160 Grams</strong>. Based on current FENEGOSIDA rates, the raw value of 4 Ana of 24K Fine gold is <strong className="text-amber-700">NPR 73,000.00</strong>. For 22K Tejabi, 4 Ana equals <strong>NPR 72,275.00</strong>.
              </p>

              <h3 className="text-xl font-black text-slate-900 tracking-tight mb-4">How is the Live Price of Silver (Chandi) Calculated in Nepal?</h3>
              <p className="text-slate-700 text-base leading-relaxed mb-5 font-medium">
                The domestic price of Silver (चाँदीको भाउ) is set daily per Tola by FENEGOSIDA. The current baseline rate is <strong className="text-slate-700">NPR 4,840.00 per Tola</strong>, which breaks down to <strong>NPR 48.40 per Lal</strong> and approximately <strong>NPR 415.00 per 10 Grams</strong>.
              </p>

              <h3 className="text-xl font-black text-slate-900 tracking-tight mb-4">What is &apos;Aajako Sunko Vau&apos; for 22 Carat vs 24 Carat Gold in Nepal?</h3>
              <p className="text-slate-700 text-base leading-relaxed mb-5 font-medium">
                &quot;Aajako Sunko Vau&quot; (आजको सुनको भाउ) refers to the official daily bullion rate published by FENEGOSIDA. When calculating jewelry costs for items like traditional Tilhari or Naugedi malas, retailers use <strong>22 Carat (Tejabi/Hallmark 916)</strong> standards. 22K gold contains 91.6% pure gold mixed with alloys for durability. Its retail price per Tola or Lal is proportionally lower than 24K Fine Gold, though crafting making charges (<em>jyala</em>) apply equally to both.
              </p>

              {/* Hallmark / Chhapawal / FNGSGJA Synonyms */}
              <h3 className="text-xl font-black text-slate-900 tracking-tight mb-4">What is the Official Difference Between Hallmark Gold, Chhapawal, and Tejabi Gold in Nepal?</h3>
              <p className="text-slate-700 text-base leading-relaxed mb-5 font-medium">
                In the Nepalese retail sector, <strong>Fine Gold (9999 Purity)</strong> is interchangeably referred to as <strong>Hallmark Gold</strong> or <strong>Chhapawal Sun (छापावाल सुन)</strong>. It represents 99.99% pure bullion trading at <strong className="text-amber-700">NPR 292,000 per Tola</strong>. <strong>Tejabi Gold (तेजाबी सुन)</strong>, occasionally classified by the <strong>FNGSGJA</strong> (Federation of Nepal Gold Silver Gem &amp; Jewellery Associations) as <em>Standard Gold</em>, operates at a traditional refinement level of roughly 99.50% purity, carrying a structural discount of <strong>NPR 2,900 per Tola</strong> relative to Chhapawal — currently trading at <strong className="text-amber-600">NPR 289,100 per Tola</strong>.
              </p>
            </section>

            {/* ── Full FAQ Component ── */}
            <PillarFAQ faqs={GOLD_FAQS} title="Gold Price in Nepal — Full FAQ (Sunko Vau 2083/2026)" />

            {/* ── Market Volatility History Table ── */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter mb-4">
                Gold Price History &amp; Market Milestones — Nepal 2083 BS
              </h2>
              <p className="text-slate-500 text-sm mb-6 font-medium">
                Key price trajectory markers for 24K Chhapawal gold as tracked by FENEGOSIDA in June 2026 (Jestha–Ashadh 2083 BS).
              </p>
              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm mb-4">
                <table className="w-full text-left">
                  <thead className="bg-slate-800">
                    <tr className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                      <th className="px-5 py-4">Date (2026 / 2083 BS)</th>
                      <th className="px-5 py-4 text-yellow-400">24K Chhapawal Rate (Per Tola)</th>
                      <th className="px-5 py-4">Market State</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white text-sm font-medium text-slate-700">
                    {[
                      { date: 'June 3, 2026 (Jestha 20, 2083)', rate: 'NPR 3,11,300', label: '🏆 All-Time Record High', cls: 'text-green-700 font-black' },
                      { date: 'June 7, 2026 (Jestha 24, 2083)', rate: 'NPR 3,00,800', label: '📉 Sharp Correction (−NPR 8,200)', cls: 'text-red-600 font-bold' },
                      { date: 'June 12–13, 2026 (Jestha 29–30, 2083)', rate: 'NPR 2,92,000', label: '🟡 Stable Consolidation Range', cls: 'text-amber-700 font-bold' },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors">
                        <td className="px-5 py-4 font-bold text-slate-900">{row.date}</td>
                        <td className="px-5 py-4 font-black text-amber-700 text-base">{row.rate}</td>
                        <td className={`px-5 py-4 text-sm ${row.cls}`}>{row.label}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-slate-400 font-medium">Source: FENEGOSIDA daily published rate records. International spot benchmark: $4,239.90/oz XAU/USD.</p>
            </section>

            {/* ── Market Insight ── */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter mb-6">
                Market Insight: Gold Trading in Nepal 2083/84
              </h2>
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-700 text-base leading-relaxed mb-6 font-medium">
                  Gold is more than just a metal in Nepal; it is a vital asset for financial security and cultural heritage. The daily <strong>Gold Rate in Nepal</strong> is influenced by international LBMA (London Bullion Market Association) spot prices and the USD-to-NPR exchange rate published by Nepal Rastra Bank (NRB). Nepal applies approximately 20% customs duty on imported bullion, which creates the significant premium between the international spot price and the FENEGOSIDA domestic benchmark.
                </p>
                <p className="text-slate-700 text-base leading-relaxed mb-6">
                  Our dashboard provides high-precision data mapping directly to the <strong>FENEGOSIDA</strong> (Federation of Nepal Gold and Silver Dealers&apos; Association) official list, ensuring you have the most reliable figures for hallmark jewelry or investment biscuits. For all three trading boards — <strong>Fine Gold (छापावाल / 24K)</strong>, <strong>Tejabi Gold (तेजाबी / 22K)</strong>, and <strong>Silver (चाँदी / Chandi)</strong> — our calculator engine applies the exact conversion coefficients: 11.6638125 grams per Tola and 100 Lal per Tola.
                </p>
              </div>
            </section>

            {/* ══════════════════════════════════════════ */}
            {/* §1  CORE REFERENCE BENCHMARKS             */}
            {/* ══════════════════════════════════════════ */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter mb-2">
                Core Reference Benchmarks: Official Bullion Indices
              </h2>
              <p className="text-slate-500 text-sm mb-6 font-medium">
                Official market baseline rates for raw, uncrafted bullion as authorized for Saturday, June 13, 2026 (Jestha 30, 2083 BS).
              </p>

              <div className="overflow-x-auto rounded-2xl border border-amber-100 shadow-sm mb-6">
                <table className="w-full text-left">
                  <thead className="bg-amber-50">
                    <tr className="text-[10px] font-black text-amber-700 uppercase tracking-widest">
                      <th className="px-5 py-4">Precious Metal &amp; Quality Standard</th>
                      <th className="px-5 py-4">Per Tola (NPR)</th>
                      <th className="px-5 py-4">Per 10 Grams (NPR)</th>
                      <th className="px-5 py-4">Daily Trajectory</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-amber-50 bg-white text-sm font-medium text-slate-700">
                    <tr className="hover:bg-amber-50/40 transition-colors">
                      <td className="px-5 py-4">
                        <div className="font-black text-slate-900">24K Hallmark Gold</div>
                        <div className="text-[11px] text-amber-600 font-bold uppercase tracking-wider">Fine / छापावाल सुन</div>
                      </td>
                      <td className="px-5 py-4 font-black text-yellow-700 text-base">Rs. 2,92,000</td>
                      <td className="px-5 py-4 font-bold text-slate-700">Rs. 2,50,343</td>
                      <td className="px-5 py-4 text-[11px] font-bold text-green-700">🟢 Consolidated Base (Stable)</td>
                    </tr>
                    <tr className="hover:bg-amber-50/40 transition-colors">
                      <td className="px-5 py-4">
                        <div className="font-black text-slate-900">22K Tejabi Gold</div>
                        <div className="text-[11px] text-amber-600 font-bold uppercase tracking-wider">Standard / तेजाबी सुन</div>
                      </td>
                      <td className="px-5 py-4 font-black text-amber-700 text-base">Rs. 2,67,472</td>
                      <td className="px-5 py-4 font-bold text-slate-700">Rs. 2,29,314</td>
                      <td className="px-5 py-4 text-[11px] font-bold text-green-700">🟢 Consolidated Base (Stable)</td>
                    </tr>
                    <tr className="hover:bg-amber-50/40 transition-colors">
                      <td className="px-5 py-4">
                        <div className="font-black text-slate-900">Pure Silver Index</div>
                        <div className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Fine / चाँदी</div>
                      </td>
                      <td className="px-5 py-4 font-black text-slate-700 text-base">Rs. 4,840</td>
                      <td className="px-5 py-4 font-bold text-slate-700">Rs. 4,150</td>
                      <td className="px-5 py-4 text-[11px] font-bold text-blue-600">🔵 Strong Weekly Support</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 flex items-start gap-3">
                <span className="text-amber-600 text-lg mt-0.5">📌</span>
                <p className="text-sm text-slate-700 font-medium leading-relaxed">
                  <strong>Weekend Market Operating Rule:</strong> FENEGOSIDA establishes wholesale bullion benchmarks from <strong>Sunday through Friday</strong> at approximately 11:00 AM NPT. Because official trading benches remain closed on Saturdays and national public holidays, all active retail invoices across Kathmandu and greater Nepal utilize the preceding <strong>Friday evening close</strong> as their mandatory regulatory baseline.
                </p>
              </div>
            </section>

            {/* ══════════════════════════════════════════ */}
            {/* §2  MACRO-ECONOMIC DRIVERS                */}
            {/* ══════════════════════════════════════════ */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter mb-6">
                Macro-Economic Drivers: How the Nepalese Gold Market Operates
              </h2>

              <h3 className="text-lg font-black text-slate-900 tracking-tight mb-3">The Regulatory Framework of FENEGOSIDA and FNGSGJA</h3>
              <p className="text-slate-700 text-sm leading-relaxed mb-5 font-medium">
                Evaluating the <strong>official gold rate in Nepal today</strong> requires analyzing the central banking and regulatory bodies that manage the supply chain. The primary pricing mandate is issued daily by the{' '}
                <a href="https://www.fenegosida.org/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-600 font-bold underline underline-offset-2 hover:text-amber-700 transition-colors">
                  Federation of Nepal Gold and Silver Dealers&apos; Association (FENEGOSIDA)
                </a>. However, alternative tracking boards, such as the <strong>FNGSGJA bullion index 2026</strong> (Federation of Nepal Gold Silver Gem &amp; Jewellery Associations), closely monitor secondary merchant behaviors, market transparency, and retail distribution networks.
              </p>
              <p className="text-slate-600 text-sm font-medium mb-4">Together, these associations evaluate three core components to calculate the opening rate each morning:</p>
              <div className="space-y-3 mb-8">
                {[
                  { icon: '🌐', title: 'International Spot Price (XAU/USD)', body: 'The baseline value of fine bullion traded on global exchanges like the London Bullion Market Association (LBMA) or the London Metal Exchange (LME).', link: null },
                  { icon: '💱', title: 'USD-to-NPR Forex Rate', body: 'Because gold is purchased internationally in US Dollars, fluctuations in the Nepalese Rupee (NPR) can shift domestic costs even if global spot prices remain flat.', link: { href: '/market-rates/exchange-rate/', label: 'Track live currency pairs via our Live Forex Exchange Rates Engine' } },
                  { icon: '🏦', title: 'Commercial Bank Import Quota', body: 'The Nepal Rastra Bank (NRB) strictly regulates the volume of gold that commercial banks can legally import daily to manage foreign cash reserves.', link: { href: 'https://www.nrb.org.np/', label: 'Nepal Rastra Bank (NRB) official portal', external: true } },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 bg-slate-50 border border-slate-200 rounded-xl px-5 py-4">
                    <span className="text-xl">{item.icon}</span>
                    <div>
                      <p className="text-sm font-black text-slate-900 mb-1">{item.title}</p>
                      <p className="text-sm text-slate-600 font-medium leading-relaxed">{item.body}{' '}
                        {item.link && (
                          <a
                            href={item.link.href}
                            {...(item.link.external ? { target: '_blank', rel: 'noopener noreferrer nofollow' } : {})}
                            className="text-amber-600 font-bold underline underline-offset-2 hover:text-amber-700 transition-colors"
                          >
                            {item.link.label}
                          </a>
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-black text-slate-900 tracking-tight mb-3">Customs Duties, Tariffs, and Import Costs</h3>
              <p className="text-slate-700 text-sm leading-relaxed font-medium">
                The retail value of <strong>gold price in Nepal</strong> carries a significant premium over raw international spot quotes due to domestic fiscal policies. Nepal enforces a <strong>20% customs duty</strong> on imported raw gold bars. This import tariff is calculated alongside handling fees, banking commissions, and insurance overhead before bullion is distributed to regional jewelry associations. Consequently, any shifts in national fiscal policy instantly alter the baseline price per Tola. Use our interactive{' '}
                <a href="/calculator/gold-tax/" className="text-amber-600 font-bold underline underline-offset-2 hover:text-amber-700 transition-colors">
                  Gold Tax Calculator
                </a>{' '}to compute your structural customs and import markup.
              </p>
            </section>

            {/* ══════════════════════════════════════════ */}
            {/* §3  WEIGHT PROTOCOL                       */}
            {/* ══════════════════════════════════════════ */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter mb-6">
                Technical Weight Protocol: Traditional vs. Metric Systems
              </h2>

              <h3 className="text-lg font-black text-slate-900 tracking-tight mb-3">Universal Tola-to-Gram Conversion Standard</h3>
              <p className="text-slate-700 text-sm leading-relaxed mb-5 font-medium">
                When utilizing an online <strong>tola to gram converter Nepal</strong>, developers and consumers must align with precise legal and commercial parameters. The mathematical constants used by our calculation engine are defined as follows:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {[
                  { from: '1 Tola', to: '11.6638 Grams', dir: '→' },
                  { from: '1 Gram', to: '0.085735 Tola', dir: '→' },
                  { from: '10 Grams', to: '0.85735 Tola', dir: '→' },
                ].map((item, i) => (
                  <div key={i} className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 text-center">
                    <div className="text-sm font-black text-slate-900">{item.from}</div>
                    <div className="text-amber-500 font-black text-lg my-1">{item.dir}</div>
                    <div className="text-sm font-black text-amber-700">{item.to}</div>
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-black text-slate-900 tracking-tight mb-3">Fractional Weight Breakdown: Lal and Ana Rules</h3>
              <p className="text-slate-700 text-sm leading-relaxed mb-5 font-medium">
                For traditional jewelry, weights are subdivided into smaller fractions known as <strong>Lal (लाल)</strong> and <strong>Ana (आना)</strong>. To avoid transactional errors, understand these exact relationships:
              </p>
              <div className="space-y-3 mb-6">
                <div className="bg-slate-50 border-l-4 border-amber-400 rounded-r-xl px-5 py-4">
                  <p className="text-sm font-black text-slate-900 mb-1">Tola-to-Lal Matrix</p>
                  <p className="text-sm text-slate-600 font-medium">One full Tola consists of exactly <strong>100 Lals</strong>. Therefore, 1 Lal = <strong>0.1166 grams</strong> of metal.</p>
                </div>
                <div className="bg-slate-50 border-l-4 border-amber-400 rounded-r-xl px-5 py-4">
                  <p className="text-sm font-black text-slate-900 mb-1">Ana-to-Lal Matrix</p>
                  <p className="text-sm text-slate-600 font-medium">One full Tola is divided into <strong>16 Anas</strong>. This means 1 Ana = exactly <strong>6.25 Lals</strong>, or <strong>0.7290 grams</strong>.</p>
                </div>
              </div>

              <div className="bg-slate-900 rounded-2xl px-6 py-5 font-mono text-sm text-slate-300 mb-6 overflow-x-auto">
                <pre className="whitespace-pre text-xs leading-relaxed">{`          ┌── 1 Tola (11.6638g) ──┐
          │                       │
16 Ana (0.7290g per Ana)   100 Lal (0.1166g per Lal)`}</pre>
              </div>

              <p className="text-slate-600 text-sm font-medium mb-4">These fractional values convert into today&apos;s raw 24K material costs as follows:</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: '1 Lal Gold Price Today', value: 'Rs. 2,920.00', note: 'Base Material Cost' },
                  { label: '2 Lal Gold Price Today', value: 'Rs. 5,840.00', note: 'Base Material Cost' },
                  { label: '4 Ana Gold Price Today', value: 'Rs. 73,000.00', note: '25 Lal / 2.9160g / Quarter Tola' },
                ].map((item, i) => (
                  <div key={i} className="border border-amber-200 rounded-xl px-5 py-4 bg-amber-50 text-center">
                    <div className="text-[10px] font-black text-amber-700 uppercase tracking-widest mb-1">{item.label}</div>
                    <div className="text-xl font-black text-slate-900">{item.value}</div>
                    <div className="text-[10px] text-slate-500 font-medium mt-1">{item.note}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* ══════════════════════════════════════════ */}
            {/* §4  RETAIL STORE MECHANICS                */}
            {/* ══════════════════════════════════════════ */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter mb-6">
                Retail Store Mechanics: Real-World Cost Calculations
              </h2>

              <h3 className="text-lg font-black text-slate-900 tracking-tight mb-3">Consumer Purchase Invoicing Formula</h3>
              <p className="text-slate-700 text-sm leading-relaxed mb-5 font-medium">
                When entering a retail showroom in Kathmandu, Pokhara, or Lalitpur, the final price on your invoice will be higher than the raw bullion benchmark. Showrooms add manufacturing labor fees (<strong>Jyala</strong>) and material loss margins (<strong>Jarti</strong> or wastage).
              </p>

              <div className="bg-amber-50 border border-amber-200 rounded-2xl px-6 py-5 mb-6">
                <p className="text-[10px] font-black text-amber-700 uppercase tracking-widest mb-3">Definitive Buying Formula</p>
                <code className="block text-xs bg-white border border-amber-200 rounded-xl px-4 py-3 text-amber-900 font-mono leading-relaxed">
                  Final Counter Price = (Total Weight in Tolas × Today&apos;s FENEGOSIDA Rate)<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ Jyala (Making Charges)<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ Jarti (Wastage Fee)<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ 13% VAT
                </code>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {[
                  { icon: '🔨', label: 'Making Charges (Jyala)', body: 'Craftsmanship fee charged per Tola or as a flat percentage of gold value. Ranges from 5% for simple pieces to over 12% for intricate handmade bridal jewelry.' },
                  { icon: '⚖️', label: 'Wastage (Jarti)', body: 'Accounts for minute amounts of precious metal lost during melting, cutting, and polishing. Typically 1–3% of the base metal value.' },
                ].map((item, i) => (
                  <div key={i} className="bg-slate-50 border border-slate-200 rounded-xl px-5 py-4">
                    <p className="text-sm font-black text-slate-900 mb-2">{item.icon} {item.label}</p>
                    <p className="text-sm text-slate-600 font-medium leading-relaxed">{item.body}</p>
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-black text-slate-900 tracking-tight mb-3">Asset Liquidation: How Much Value Do Jewelers Deduct for Old Gold?</h3>
              <p className="text-slate-700 text-sm leading-relaxed mb-4 font-medium">
                If you are planning to sell old family heirlooms for cash, retail stores run a reverse calculation. Merchants do <strong>not</strong> reimburse you for the original making charges, wastage fees, or VAT paid during purchase.
              </p>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5">
                <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-3">Liquidation / Scrap Gold Calculation</p>
                <code className="block text-xs bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 font-mono leading-relaxed">
                  Cash Value = (Verified Raw Weight in Tolas − Purity Refining Variance)<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;× Today&apos;s Daily Buying Benchmark
                </code>
                <p className="text-xs text-slate-500 font-medium mt-3">
                  Merchants test purity via acid test or XRF scrap analyzer, then deduct a standard <strong>2%–5% refining melting loss margin</strong> from the active daily raw gold index.
                </p>
              </div>
            </section>

            {/* ══════════════════════════════════════════ */}
            {/* §5  MARKET HISTORY & VOLATILITY           */}
            {/* ══════════════════════════════════════════ */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter mb-4">
                Market History and Volatility Trends — Nepal 2083 BS
              </h2>
              <p className="text-slate-500 text-sm mb-6 font-medium">
                Understanding the true trajectory of <strong>gold price history in Nepal 2083</strong> requires tracking recent market milestones. The first half of June 2026 was marked by historic market movements:
              </p>

              <div className="space-y-4 mb-6">
                {[
                  {
                    icon: '🏆',
                    date: 'June 3, 2026 (Jestha 20, 2083)',
                    title: 'All-Time Record Peak',
                    rate: 'Rs. 3,11,300 / Tola',
                    body: 'Driven by sudden international rate adjustments, fine gold in the domestic market climbed to an all-time record high.',
                    cls: 'border-green-200 bg-green-50',
                    rateCls: 'text-green-700',
                  },
                  {
                    icon: '📉',
                    date: 'June 7, 2026 (Jestha 24, 2083)',
                    title: 'Single-Day Major Correction',
                    rate: 'Rs. 3,00,800 / Tola (−Rs. 8,200)',
                    body: 'Following a sudden shift in international spot indexes, prices plummeted by an unprecedented Rs. 8,200 per Tola in a single trading day.',
                    cls: 'border-red-200 bg-red-50',
                    rateCls: 'text-red-700',
                  },
                  {
                    icon: '🟡',
                    date: 'June 12–13, 2026 (Jestha 29–30, 2083)',
                    title: 'Current Stabilization Zone',
                    rate: 'Rs. 2,92,000 / Tola',
                    body: 'Over the past week, the market has settled into a reliable support zone, steadying at today\'s FENEGOSIDA benchmark.',
                    cls: 'border-amber-200 bg-amber-50',
                    rateCls: 'text-amber-700',
                  },
                ].map((item, i) => (
                  <div key={i} className={`border rounded-2xl px-6 py-5 ${item.cls}`}>
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{item.icon} {item.date}</p>
                        <p className="text-base font-black text-slate-900 mb-2">{item.title}</p>
                        <p className="text-sm text-slate-600 font-medium leading-relaxed">{item.body}</p>
                      </div>
                      <div className={`text-lg font-black shrink-0 ${item.rateCls}`}>{item.rate}</div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-400 font-medium">Source: FENEGOSIDA daily published rate records. International spot benchmark: $4,239.90/oz XAU/USD.</p>
            </section>

            {/* ══════════════════════════════════════════ */}
            {/* §6  SNIPPET FAQ MODULES                   */}
            {/* ══════════════════════════════════════════ */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter mb-6">
                Frequently Asked Questions — Gold Price Nepal 2083
              </h2>
              <div className="space-y-4">
                {[
                  {
                    q: 'What is the difference between 24K Hallmark and 22K Tejabi gold in Nepal?',
                    a: '24K Hallmark Gold (Chhapawal Sunko Vau today) represents 99.99% pure fine gold — the premier standard for investment bars, gold biscuits, and capital reserves. 22K Tejabi Gold contains roughly 91.6% pure gold blended with copper or zinc for added strength, making it the standard for traditional Nepalese jewelry like Tilhari and Naugedi malas. Currently, 24K trades at Rs. 2,92,000/tola and 22K at Rs. 2,67,472/tola.',
                  },
                  {
                    q: 'What does "Aajako Sunko Vau" mean on local tracking sites?',
                    a: 'Aajako Sunko Vau (आजको सुनको भाउ) is the standard Romanized and native phrasing for "Today\'s Gold Price." Search engine algorithms use this phrase to connect local voice queries with structured digital pricing tools. The rate is published daily by FENEGOSIDA at approximately 11:00 AM NPT, except on Saturdays and public holidays.',
                  },
                  {
                    q: 'How do I check the live silver price in Nepal per tola?',
                    a: 'The daily index for silver (Chandi Ko Vau Aajako / चाँदीको भाउ) tracks independently based on global industrial demand and regional silver-smithing requirements. Today\'s official FENEGOSIDA benchmark is fixed at Rs. 4,840 per Tola, which translates to Rs. 4,150 per 10 grams for raw material transactions, and Rs. 48.40 per Lal. For a dedicated tola to gram converter Nepal and daily silver tracking, visit our Live Silver Price Calculator.',
                    link: { href: '/market-rates/live-silver-price/', label: 'Live Silver Price Calculator' },
                  },
                  {
                    q: 'Does the daily FENEGOSIDA price list include retail VAT?',
                    a: 'No. The baseline price list issued by FENEGOSIDA represents the raw, untraded commercial bullion rate. Under national tax laws, retail jewelry showrooms are required to add a mandatory 13% Value Added Tax (VAT) to the final bill, calculated after adding crafting charges (Jyala) and wastage fees (Jarti).',
                  },
                  {
                    q: 'How is the 22K Tejabi gold price calculated from the 24K rate?',
                    a: 'The 22K Tejabi rate is not simply 91.6% of the 24K price. FENEGOSIDA independently sets the Tejabi rate each morning based on its own market assessment. Currently, the spread between 24K (Rs. 2,92,000) and 22K (Rs. 2,67,472) is Rs. 24,528 per Tola — reflecting both purity difference and market liquidity factors.',
                  },
                  {
                    q: 'What is Jyala and Jadaa (Jarti) charges in gold jewelry — and how do I calculate them?',
                    a: 'Jyala (ज्याला) is the making charge a jeweler adds for craftsmanship labor, typically 5% to 12% of the base gold value per Tola. Jadaa or Jarti (जाडा/जर्ति) is the wastage deduction — the minute gold loss during melting, cutting, and polishing, typically 1%–3%. Both are excluded from resale/liquidation payouts. Understanding what is Jyala and Jadaa charges is essential for auditing your retail invoice before purchase.',
                  },
                ].map((item, i) => (
                  <details key={i} className="group border border-slate-200 rounded-2xl overflow-hidden">
                    <summary className="flex items-center justify-between gap-4 px-6 py-4 cursor-pointer bg-white hover:bg-slate-50 transition-colors list-none">
                      <span className="text-sm font-black text-slate-900">{item.q}</span>
                      <span className="text-slate-400 group-open:rotate-180 transition-transform shrink-0 text-lg">▾</span>
                    </summary>
                    <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
                      <p className="text-sm text-slate-700 font-medium leading-relaxed">
                        {item.a}{' '}
                        {item.link && (
                          <a href={item.link.href} className="text-amber-600 font-bold underline underline-offset-2 hover:text-amber-700 transition-colors">
                            {item.link.label} →
                          </a>
                        )}
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            </section>

          </div>
        </div>
      </CalcWrapper>
    </div>
  );
}
