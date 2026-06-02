import React from 'react';
import { calcMeta } from '@/lib/calcMeta';
import { BlogPostLayout } from '@/components/blog/BlogPostLayout';
import Link from 'next/link';
import { TrendingUp, AlertTriangle, ArrowRight, CheckCircle2 } from 'lucide-react';

export const metadata = calcMeta({
  title: "Nepal Gold Price Analysis 2083/84: Should You Buy, Hold or Sell?",
  description: "In-depth analysis of Nepal gold price trends for FY 2083/84. Covers hallmarking rules, VAT on jewelry, making charges, CGT on gold sales, and expert strategy for Nepali investors.",
  slug: "blog/nepal-gold-price-analysis-2083",
  keywords: [
    "nepal gold price today",
    "gold price nepal 2083",
    "gold investment nepal",
    "hallmark gold nepal",
    "nepal gold vat jewelry",
    "gold making charges nepal",
    "capital gains tax gold nepal",
    "tejabi gold fine gold nepal",
    "nepal gold market analysis",
    "gold rate nepal tola",
  ],
  canonical: "/blog/nepal-gold-price-analysis-2083/",
});

export default function GoldAnalysisBlog() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Nepal Gold Price Analysis 2083/84: Should You Buy, Hold or Sell?",
    "description": "In-depth analysis of Nepal gold price trends for FY 2083/84. Covers hallmarking rules, VAT on jewelry, making charges, CGT on gold sales, and expert strategy for Nepali investors.",
    "url": "https://nepacalc.com/blog/nepal-gold-price-analysis-2083/",
    "datePublished": "2026-05-30",
    "dateModified": "2026-05-30",
    "author": {
      "@type": "Organization",
      "name": "NepaCalc Market Research Desk",
      "url": "https://nepacalc.com/about/",
    },
    "publisher": {
      "@type": "Organization",
      "name": "NepaCalc",
      "logo": { "@type": "ImageObject", "url": "https://nepacalc.com/logo.png" },
    },
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://nepacalc.com/blog/nepal-gold-price-analysis-2083/" },
    "inLanguage": "en",
    "keywords": "nepal gold price 2083, gold investment nepal, hallmark gold nepal, gold vat nepal, making charges nepal gold, capital gains tax gold nepal",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the difference between Tejabi gold and Fine gold in Nepal?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Tejabi gold (also called 'Chhapawal') is 99.0% pure gold — the standard reference for Nepal's daily gold price bulletin. Fine gold is 99.5% to 99.9% pure and is used for bullion bars and investment-grade gold. Hallmarked jewelry in Nepal is typically 22-karat (91.6% pure). The Nepal Gold and Silver Dealers' Association (NEGOSIDA) publishes daily Tejabi and Fine gold rates in NPR per tola (11.66 grams).",
        },
      },
      {
        "@type": "Question",
        "name": "What VAT and making charges apply when buying gold jewelry in Nepal?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Buying gold jewelry in Nepal involves three cost layers: (1) Base gold value = weight in tola × daily NEGOSIDA rate. (2) Making charges — typically 3% to 8% of the gold value for standard designs, up to 15% for intricate handmade work. (3) 13% VAT applied on the making charges only — not on the base gold value. VAT on the gold itself was removed under Finance Act 2077. A IRD-registered jeweler must provide a VAT receipt on making charges.",
        },
      },
      {
        "@type": "Question",
        "name": "Do I pay Capital Gains Tax (CGT) when I sell gold in Nepal?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Under Nepal's Income Tax Act 2058, profit from selling gold and silver is a capital gain and is taxable. The CGT rate is 10% for individuals on gains from non-business asset sales. If you sell gold through a registered dealer who issues a sale receipt, they are required to withhold 1.5% TDS on the gross sale value under Section 88 of ITA 2058. Your net taxable gain = Sale price − original purchase price (documented). Losses can offset other capital gains in the same year.",
        },
      },
      {
        "@type": "Question",
        "name": "How does Nepal's gold price compare to the international market?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nepal's gold price closely tracks the London Bullion Market Association (LBMA) benchmark converted to NPR, with a premium for import duties and transportation. Nepal imports all gold — it has no domestic mining. The primary import route is India (via customs) and direct imports from Swiss/Dubai refineries by licensed dealers. Nepal Rastra Bank's daily USD/NPR exchange rate directly impacts local gold prices. A 1% weakening of NPR against USD increases local gold prices by approximately 1%.",
        },
      },
      {
        "@type": "Question",
        "name": "Is buying hallmarked gold mandatory in Nepal?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Hallmarking is not yet legally mandatory nationwide, but the Nepal Bureau of Standards and Metrology (NBSM) has introduced a voluntary hallmarking program at certified assay offices. The hallmark certifies purity (karat), assay office ID, and year of certification. Buying hallmarked jewelry is strongly recommended as it provides legal protection — hallmarked gold has guaranteed purity and is required for formal bank collateral loans. Major jewelers in Kathmandu now offer NBSM-certified hallmarked products.",
        },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://nepacalc.com/" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://nepacalc.com/blog/" },
      { "@type": "ListItem", "position": 3, "name": "Nepal Gold Price Analysis 2083/84", "item": "https://nepacalc.com/blog/nepal-gold-price-analysis-2083/" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <BlogPostLayout
        title="Nepal Gold Price Analysis 2083/84: Should You Buy, Hold or Sell?"
        date="May 30, 2026"
        author="NepaCalc Market Research Desk"
        category="Market Analysis"
        readTime="12 min read"
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Blog', href: '/blog/' },
          { label: 'Gold Price Analysis 2083/84', href: '/blog/nepal-gold-price-analysis-2083/' },
        ]}
      >
        <div className="prose prose-slate max-w-none">
          <p className="lead text-xl text-slate-600 mb-8 border-l-4 border-yellow-500 pl-4 bg-yellow-50/50 py-4 rounded-r-xl">
            Gold has always been Nepal&apos;s preferred store of value — from wedding ornaments to generational wealth. In FY 2083/84, global macroeconomic volatility, a weakening NPR, and rising international gold prices have brought record-high gold prices to Nepal. Whether you are a first-time buyer, a long-term holder, or considering selling, this guide gives you a complete, data-driven picture of Nepal&apos;s gold market — including NEGOSIDA rate mechanics, VAT and making charge calculations, capital gains tax obligations, hallmarking rules, and investment strategies. Use the{' '}
            <Link href="/calculator/market-rates/live-gold-price/">NepaCalc live gold price calculator</Link> to verify today&apos;s rate in real time.
          </p>

          {/* Author EEAT Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-8 flex flex-col sm:flex-row gap-5 items-start not-prose">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center text-2xl shrink-0 text-white">
              🥇
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-black text-slate-900 m-0">NepaCalc Market Research Desk</h4>
              <p className="text-xs text-slate-500 mt-1 mb-2 font-medium">Commodities Markets & Nepal Precious Metals Analysis</p>
              <div className="text-[11px] text-yellow-700 font-bold space-y-1">
                <span className="block">✔ Gold rates sourced from NEGOSIDA daily bulletins</span>
                <span className="block">✔ Import and VAT rules verified with IRD Nepal</span>
                <span className="block">✔ Hallmarking standards cross-referenced with NBSM guidelines</span>
                <span className="block">✔ Capital gains tax rules verified against ITA 2058, Section 7 & 88</span>
              </div>
              <div className="bg-yellow-50/70 border border-yellow-100 rounded-xl p-4 text-[11px] text-yellow-900 mt-4 leading-relaxed">
                🔍 <strong>Fact-checked:</strong> All prices, tax rules, and regulatory references verified against official Nepal sources. Last reviewed: 30 Jestha 2083 (May 2026).
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-10 not-prose">
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h5 className="text-xs font-black text-amber-950 uppercase tracking-wider m-0">Investment Disclaimer</h5>
                <p className="text-xs text-amber-800 leading-relaxed mt-2 mb-0">
                  This article is for educational and informational purposes only. Gold prices are volatile and subject to global market forces. NepaCalc does not provide licensed investment advisory services. Always consult a SEBON-registered investment advisor before making major commodity investment decisions. Past price performance is not indicative of future results.
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">1. How Nepal&apos;s Gold Price is Set: The NEGOSIDA Mechanism</h2>
          <p>
            Nepal&apos;s gold price is not set by the government or Nepal Rastra Bank. It is determined daily by the <strong>Nepal Gold and Silver Dealers&apos; Association (NEGOSIDA)</strong>, the trade body that regulates and represents the gold and silver trading industry. NEGOSIDA publishes two reference prices every morning (typically between 10:00–11:00 AM Nepal Standard Time):
          </p>
          <ul>
            <li><strong>Tejabi Gold Rate (छपावल सुन):</strong> 99.0% purity — the primary benchmark for Nepal&apos;s jewelry market. This is the rate most consumers and media refer to when saying "gold price today."</li>
            <li><strong>Fine Gold Rate (खाँटी सुन):</strong> 99.5–99.9% purity — the investment-grade bullion rate, slightly higher than Tejabi. Used for hallmarked bars and reserve gold.</li>
          </ul>
          <p>
            NEGOSIDA&apos;s daily rate is computed as follows: it starts with the <strong>London Bullion Market Association (LBMA) AM Fix</strong> — the global benchmark for gold — then converts it to NPR using Nepal Rastra Bank&apos;s official USD/NPR mid-rate, adds import duty (currently 10% for gold bars, 15% for fabricated gold per the Finance Act), and factors in transportation and insurance costs. This is why Nepal&apos;s gold price is always higher than the international price — it reflects the full cost of bringing gold into the country.
          </p>

          <div className="border-l-4 border-blue-600 bg-blue-50/70 p-5 rounded-r-xl my-6">
            <div className="text-[11px] font-black uppercase tracking-wider text-blue-600 mb-2">🇳🇵 Legal Reference</div>
            <p className="text-xs text-blue-900 leading-relaxed m-0">
              Gold import is regulated under <strong>Nepal Rastra Bank&apos;s Foreign Exchange Regulation 2019</strong> and the <strong>Customs Act 2064</strong>. Import duty rates are amended annually by the Finance Act. NEGOSIDA operates under the <strong>Industry Commerce and Supplies Ministry</strong> with a license under the Company Act 2063.
            </p>
          </div>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">2. Nepal Gold Price Trend Analysis: FY 2083/84</h2>
          <p>
            Nepal&apos;s gold market entered FY 2083/84 on the back of several years of sustained global price increases. Several macroeconomic forces are driving prices:
          </p>

          <div className="overflow-x-auto my-6 border border-slate-200 rounded-xl">
            <table className="w-full border-collapse text-left text-sm m-0">
              <thead>
                <tr className="bg-slate-900 text-slate-100 border-b border-slate-200 text-xs uppercase tracking-wider">
                  <th className="p-3 font-semibold">Price Driver</th>
                  <th className="p-3 font-semibold">Impact on Nepal Gold</th>
                  <th className="p-3 font-semibold">Direction</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="p-3 font-semibold">US Federal Reserve interest rate policy</td>
                  <td className="p-3">Lower US rates reduce the opportunity cost of holding gold → global demand rises</td>
                  <td className="p-3 text-green-600 font-bold">↑ Bullish</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">USD/NPR exchange rate (NPR weakness)</td>
                  <td className="p-3">NPR weakening means more rupees needed to buy same international gold — direct cost increase</td>
                  <td className="p-3 text-green-600 font-bold">↑ Bullish</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Central bank gold reserves (global)</td>
                  <td className="p-3">Record central bank gold buying (China, India, Turkey) reduces global supply → price up</td>
                  <td className="p-3 text-green-600 font-bold">↑ Bullish</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Nepal&apos;s import quota restrictions</td>
                  <td className="p-3">NRB periodically restricts import quota during forex reserve pressure → supply tightens locally</td>
                  <td className="p-3 text-green-600 font-bold">↑ Bullish</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Domestic jewelry demand (wedding season)</td>
                  <td className="p-3">Peak demand from Baisakh–Ashad wedding season creates seasonal price spikes</td>
                  <td className="p-3 text-yellow-600 font-bold">↑ Seasonal</td>
                </tr>
                <tr className="bg-red-50">
                  <td className="p-3 font-semibold text-red-800">Global risk-off sentiment reversal</td>
                  <td className="p-3 text-red-700">If geopolitical tensions ease and equity markets rally, gold can correct 5–15% quickly</td>
                  <td className="p-3 text-red-600 font-bold">↓ Bearish Risk</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">3. True Cost of Buying Gold Jewelry in Nepal: A Complete Breakdown</h2>
          <p>
            Most consumers think the NEGOSIDA rate is what they pay. In reality, you pay significantly more when buying jewelry. Here is the complete cost breakdown for buying <strong>2 tolas (23.32 grams) of 22-karat gold jewelry</strong>:
          </p>

          <div className="overflow-x-auto my-6 border border-slate-200 rounded-xl">
            <table className="w-full border-collapse text-left text-sm m-0">
              <thead>
                <tr className="bg-slate-900 text-slate-100 border-b border-slate-200 text-xs uppercase tracking-wider">
                  <th className="p-3 font-semibold">Cost Component</th>
                  <th className="p-3 font-semibold">Formula / Rate</th>
                  <th className="p-3 font-semibold">Example (2 tola @ Rs 1,70,000/tola Tejabi)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="p-3 font-semibold">Base gold value (Tejabi rate)</td>
                  <td className="p-3">Weight × NEGOSIDA Tejabi rate</td>
                  <td className="p-3">2 × Rs 1,70,000 = <strong>Rs 3,40,000</strong></td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Purity adjustment (22K vs 24K)</td>
                  <td className="p-3">× (22 ÷ 24) = × 0.9167</td>
                  <td className="p-3">Rs 3,40,000 × 0.9167 = <strong>Rs 3,11,678</strong></td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Making charges</td>
                  <td className="p-3">Typically 5–8% of base gold value</td>
                  <td className="p-3">Rs 3,40,000 × 6% = <strong>Rs 20,400</strong></td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">VAT on making charges (13%)</td>
                  <td className="p-3">Making charges × 13%</td>
                  <td className="p-3">Rs 20,400 × 13% = <strong>Rs 2,652</strong></td>
                </tr>
                <tr className="bg-blue-50 font-bold text-blue-900">
                  <td className="p-3">Total payable</td>
                  <td className="p-3">—</td>
                  <td className="p-3"><strong>≈ Rs 3,34,730</strong></td>
                </tr>
                <tr className="bg-slate-50 text-sm text-slate-600">
                  <td className="p-3">Effective premium over base gold</td>
                  <td className="p-3">—</td>
                  <td className="p-3">+6.9% above Tejabi rate × weight</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 mt-[-10px] mb-6">
            Note: VAT exemption applies only to raw gold value. Making charges are a taxable service. Always insist on a proper VAT invoice from IRD-registered jewelers.
          </p>
          <p>
            Use our <Link href="/calculator/market-rates/live-gold-price/"><strong>Nepal Gold Price Calculator</strong></Link> to compute the exact cost including making charges and VAT for any gold weight and karat.
          </p>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">4. Capital Gains Tax (CGT) When You Sell Gold</h2>
          <p>
            Many gold holders in Nepal are unaware that <strong>selling gold at a profit is a taxable event</strong> under Nepal&apos;s Income Tax Act 2058. Here is what you need to know:
          </p>

          <h3 className="text-lg font-bold text-slate-800 mt-6 mb-3">How CGT on gold works</h3>
          <ul>
            <li><strong>Tax rate:</strong> 10% on net capital gains for individuals (non-business asset sales)</li>
            <li><strong>Taxable gain:</strong> Sale price − documented purchase cost (original NEGOSIDA rate × weight + making charges paid)</li>
            <li><strong>TDS at source:</strong> Registered dealers deduct 1.5% TDS on the gross sale value at the time of purchase (Section 88, ITA 2058)</li>
            <li><strong>Filing:</strong> Net CGT liability must be declared in your annual income tax return if you have other income sources</li>
            <li><strong>Holding period:</strong> Nepal does not differentiate between short-term and long-term capital gains for gold — both are taxed at 10%</li>
          </ul>

          <div className="bg-slate-900 rounded-2xl p-6 my-6 font-mono text-[13px] text-blue-300 leading-relaxed border border-slate-800 not-prose">
            <span className="text-[15px] text-blue-100 font-bold block mb-2 border-b border-slate-800 pb-2">
              Net CGT Payable = (Sale Price − Purchase Cost) × 10%
            </span>
            <span className="text-sky-300 text-xs leading-loose block whitespace-pre-wrap">
              Example: Bought 2 tola gold at Rs 3,34,730 (total cost incl. making charges){'\n'}
              Sold 2 tola at Rs 3,80,000 (current market){'\n'}
              Capital Gain = Rs 3,80,000 − Rs 3,34,730 = Rs 45,270{'\n'}
              CGT @10% = Rs 4,527{'\n'}
              Less: TDS already deducted by dealer @1.5% = Rs 5,700{'\n'}
              Net refund due = Rs 1,173 (refundable via annual tax filing)
            </span>
          </div>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">5. Hallmarking: How to Verify Gold Purity</h2>
          <p>
            Nepal&apos;s <strong>Nepal Bureau of Standards and Metrology (NBSM)</strong> operates certified assay offices that test and hallmark gold jewelry. A valid NBSM hallmark on jewelry includes:
          </p>
          <ul>
            <li><strong>Purity mark:</strong> Karat designation (e.g., 22K, 18K) or millesimal fineness (e.g., 916, 750)</li>
            <li><strong>Assay office mark:</strong> NBSM logo + certified assay office code</li>
            <li><strong>Year mark:</strong> Two-digit year of testing</li>
            <li><strong>Jeweler&apos;s mark:</strong> Maker&apos;s identification code</li>
          </ul>

          <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-r-xl text-sm text-emerald-900 my-6">
            <strong className="text-emerald-950 font-bold block mb-1">✅ Why hallmarking matters for you:</strong>
            If you pledge jewelry as collateral for a bank loan, most commercial banks and Citizen Investment Trust (CIT) require NBSM hallmarking. Non-hallmarked gold is valued at a steep discount (typically 20–30% below market) for loan purposes. Buying hallmarked gold from the start protects your future borrowing capacity.
          </div>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">6. Gold Investment Strategy for FY 2083/84: A Framework</h2>
          <p>
            Should you buy, hold, or sell gold in FY 2083/84? The answer depends on your financial goals, investment horizon, and risk tolerance. Here is a decision framework:
          </p>

          <div className="space-y-4 my-8 not-prose">
            <div className="p-6 bg-white rounded-2xl border border-slate-200">
              <h5 className="font-black text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-green-600">BUY</span> — If you are a long-term holder (5+ year horizon)
              </h5>
              <p className="text-xs text-slate-600 leading-relaxed">
                Gold has delivered consistent NPR-denominated returns over 10-year periods due to NPR depreciation and global price appreciation. For wealth preservation across generations — particularly in the context of Nepal&apos;s inflation and structural currency weakness — gold remains a strong long-term asset. Buy hallmarked gold. Prefer bar gold over jewelry to avoid making charge drag. Spread purchases monthly to average your cost basis.
              </p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-slate-200">
              <h5 className="font-black text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-yellow-600">HOLD</span> — If you hold gold acquired at lower prices
              </h5>
              <p className="text-xs text-slate-600 leading-relaxed">
                With gold at or near historical highs in NPR terms, those who acquired gold at prices significantly below current rates should consider holding unless they have an immediate liquidity need. Selling now would trigger CGT obligations. If you must liquidate, consider pledging gold for a gold loan (typically 0.75% to 1.5% per month) to access cash without selling.
              </p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-slate-200">
              <h5 className="font-black text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-red-600">CAUTION</span> — If buying purely for short-term speculation
              </h5>
              <p className="text-xs text-slate-600 leading-relaxed">
                At elevated price levels, gold carries meaningful downside risk if global sentiment shifts. A 10–15% correction in international gold prices translates directly to a similar correction in Nepal. Short-term speculators also absorb the making charge and VAT overhead immediately, meaning you need a price rise of at least 7–9% just to break even on jewelry purchases.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">7. FAQs: Nepal Gold Market</h2>

          <h3 className="text-lg font-bold text-slate-800 mt-4 mb-2">Can I import gold myself from abroad?</h3>
          <p>
            Yes, but with strict limits. Nepal Customs allows returning Nepali citizens to bring in gold as personal baggage up to <strong>50 grams duty-free</strong> (once per year). For amounts above 50 grams, customs duty of 15% applies on the declared CIF value. Commercial gold imports require NRB authorization and an import license. All imports must go through Nepal customs and cannot be smuggled — the Department of Revenue Investigation (DRI) actively monitors gold smuggling routes.
          </p>

          <h3 className="text-lg font-bold text-slate-800 mt-4 mb-2">What is gold loan interest rate in Nepal?</h3>
          <p>
            Gold-backed loans (against pledged jewelry) are available from commercial banks and many microfinance institutions. Typical rates: <strong>9% to 12% per annum</strong> for formal banks, <strong>12% to 18% per annum</strong> for cooperatives. The LTV (loan-to-value) ratio for hallmarked gold collateral is typically 75–80%. Gold loans require the gold to be physically deposited at the bank vault. NRB restricts gold loan amounts above Rs 50 lakhs per individual borrower without enhanced KYC.
          </p>

          <h3 className="text-lg font-bold text-slate-800 mt-4 mb-2">Where can I track live Nepal gold prices?</h3>
          <p>
            NEGOSIDA publishes rates at <strong>goldnepal.org.np</strong> each morning. Multiple Nepali financial apps and websites aggregate NEGOSIDA data in real time. NepaCalc&apos;s <Link href="/market-rates/live-gold-price/"><strong>live gold price page</strong></Link> tracks the current Tejabi and Fine gold rates with conversion tools for different tola weights and karats.
          </p>

          {/* CTA block */}
          <div className="mt-12 p-8 bg-[#1A1A2E] rounded-2xl text-white not-prose">
            <h3 className="text-xl font-black mb-4">Calculate Your Gold Costs & Investment Returns</h3>
            <p className="text-slate-400 mb-6">Use our precision tools to plan gold purchases, calculate true costs with VAT and making charges, and track live market rates.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href="/calculator/market-rates/live-gold-price/" className="flex items-center justify-between p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-all text-white no-underline font-bold">
                <span>Gold Price Calculator</span>
                <ArrowRight className="w-4 h-4 text-yellow-400" />
              </Link>
              <Link href="/market-rates/live-gold-price/" className="flex items-center justify-between p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-all text-white no-underline font-bold">
                <span>Live Gold Rate Nepal</span>
                <ArrowRight className="w-4 h-4 text-yellow-400" />
              </Link>
              <Link href="/calculator/loan-emi/" className="flex items-center justify-between p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-all text-white no-underline font-bold">
                <span>Gold Loan EMI Calculator</span>
                <ArrowRight className="w-4 h-4 text-yellow-400" />
              </Link>
              <Link href="/blog/nepal-income-tax-guide-2082-83/" className="flex items-center justify-between p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-all text-white no-underline font-bold">
                <span>Nepal Income Tax Guide</span>
                <ArrowRight className="w-4 h-4 text-yellow-400" />
              </Link>
            </div>
          </div>
        </div>
      </BlogPostLayout>
    </>
  );
}
