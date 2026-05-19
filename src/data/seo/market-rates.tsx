import React from 'react';
import { SEOContent } from './types';

export const marketRatesSEO: Record<string, SEOContent> = {
  'market-rates/live-gold-price': {
    title: "Live Gold Price in Nepal | 24K & 22K Tola Rates today",
    description: "Real-time gold rates in Nepal today. Federation of Nepal Gold & Silver Dealers Association synced prices for 24K and 22K gold. 1500+ words on investment strategy and purity audits.",
    
    howToUse: {
      steps: [
        "1. Real-time Sync: The engine automatically fetches the latest rates from the Federation of Nepal Gold and Silver Dealers Association.",
        "2. Purity Selection: Choose between 24 Karat (Fine Gold) and 22 Karat (Tejabi Gold) based on your bullion or jewelry requirement.",
        "3. Quantity Mapping: Input the weight in Tolas (standard Nepali unit) or Grams for international parity.",
        "4. Making Charge Check: Add the jeweler's labor and making charges (typically 8% to 15%) to find the final retail price.",
        "5. Historical Analysis: Review the price trend over the last 30 days to identify market entry or exit points.",
        "6. Purity Verification: Use the 'Karat to Percentage' calculator to verify the gold content in your purchase.",
        "7. Hallmarking Check: Learn how to verify hallmarked jewelry for investment security.",
        "8. Tax & Duty Sync: Review the impact of customs duties and VAT (13%) on the final gold valuation in Nepal."
      ]
    },
    
    formula: {
      title: "How Gold is Priced in Nepal",
      description: "Gold pricing in Nepal is derived from international market rates plus customs duty and a small commission set by the Federation.",
      raw: "Final Price = [(International Rate + Customs Duty) × Quantity] + Making Charges + VAT (13%)",
      variables: [
        "International Rate: Spot price from London Bullion Market Association (LBMA).",
        "Customs Duty: Import tax levied by the Nepal Government at the border.",
        "Quantity: Standardized to 1 Tola = 11.66 Grams.",
        "Making Charges: Labor cost for jewelry fabrication."
      ]
    },
    
    content: (
        <div className="space-y-12">
            <div className="bg-amber-50/50 border-l-4 border-amber-600 rounded-r-xl p-8 shadow-sm">
                <h2 className="text-amber-700 font-black text-xs uppercase tracking-[0.3em] mb-3">
                    Gold Rates in Nepal: Everything You Need to Know
                </h2>
                <p className="text-slate-800 text-base leading-relaxed">
                    Gold remains the primary store of value for households in Nepal. In <strong>FY Current Year</strong>, understanding the market is an standard requirement. This <a href="/market-rates/live-gold-price" className="text-amber-600 hover:text-amber-800 underline font-semibold transition-colors">Gold Price Calculator</a> provides a high-precision engine for tracking live rates.
                </p>
            </div>

            <section>
                <h3 className="text-2xl font-black text-slate-900 mb-6">1. The Karat Hierarchy</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-8 bg-white border border-slate-200 rounded-2xl shadow-sm">
                        <h4 className="text-sm font-black uppercase text-amber-600 mb-4">24 Karat (Fine Gold)</h4>
                        <p className="text-xs text-slate-600 leading-relaxed">The purest form of gold (99.9%). Ideal for investment biscuits and coins.</p>
                    </div>
                    <div className="p-8 bg-white border border-slate-200 rounded-2xl shadow-sm">
                        <h4 className="text-sm font-black uppercase text-orange-600 mb-4">22 Karat (Tejabi Gold)</h4>
                        <p className="text-xs text-slate-600 leading-relaxed">Composed of 91.6% gold. The standard for jewelry in Nepal.</p>
                    </div>
                </div>
            </section>

            <section className="bg-slate-900 text-white rounded-2xl p-8 border border-slate-800 shadow-xl overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600 rounded-full blur-[120px] opacity-20 pointer-events-none" />
                <h3 className="text-xl font-black mb-6 relative z-10">Practical Market Insight</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                    <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-xl">
                        <h4 className="text-xs font-black text-amber-400 uppercase mb-2">LBMA Sync</h4>
                        <p className="text-[10px] text-slate-400">Global parity monitoring.</p>
                    </div>
                    <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-xl">
                        <h4 className="text-xs font-black text-amber-400 uppercase mb-2">NRB Regulation</h4>
                        <p className="text-[10px] text-slate-400">Central bank import quotas.</p>
                    </div>
                    <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-xl">
                        <h4 className="text-xs font-black text-amber-400 uppercase mb-2">Retail Transparency</h4>
                        <p className="text-[10px] text-slate-400">Isolating making charges.</p>
                    </div>
                </div>
            </section>

            <section>
                <h3 className="text-2xl font-black text-slate-900 mb-6">Bullion Insights Silo</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <h4 className="font-black text-slate-900 mb-3">Hedge</h4>
                        <p className="text-xs text-slate-600">Preserves purchasing power.</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <h4 className="font-black text-slate-900 mb-3">Hallmark</h4>
                        <p className="text-xs text-slate-600">Official purity guarantee.</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"><h4 className="font-black text-slate-900 mb-3">Accuracy</h4>
                        <p className="text-xs text-slate-600">1 Tola = 11.6638g.
        
        
        </p>
        </div>
        </div>
        </section>
        </div>
    ),
    faqs: [
      { question: "What is the price of gold in Nepal today?", answer: "The gold price in Nepal changes daily based on international market trends and Federation benchmarks." },
      { question: "What is the difference between 24K and 22K gold?", answer: "24K gold is 99.9% pure, while 22K gold is 91.6% pure." },
      { question: "How many grams are in 1 Tola?", answer: "In Nepal, 1 Tola is standardly calculated as 11.66 grams." }
    ]
  },
  'market-rates/exchange-rate': {
    title: "Live Exchange Rates in Nepal | NRB Foreign Currency Calculator",
    description: "Real-time foreign exchange rates in Nepal. Nepal Rastra Bank (NRB) synced buy/sell rates for USD, INR, GBP, and 20+ currencies.",
    howToUse: {
      steps: [
        "1. Real-time NRB Sync: Official daily reference rates.",
        "2. Currency Selection: USD, AUD, GBP, etc.",
        "3. Buy/Sell Check: Market spreads."
      ]
    },
    formula: {
      title: "Exchange Rate Calculation Formula",
      description: "Exchange rates influenced by the INR peg.",
      raw: "NPR Amount = Foreign Currency × Rate",
      variables: ["Rate: Official NRB rate."]
    },
    content: (
        <div className="space-y-12">
            <div className="bg-indigo-50/50 border-l-4 border-indigo-600 rounded-r-xl p-8 shadow-sm">
                <h2 className="text-indigo-700 font-black text-xs uppercase tracking-[0.3em] mb-3">
                    Foreign Exchange Rates Guide for Nepal
                </h2>
                <p className="text-slate-800 text-base leading-relaxed">
                    Foreign exchange rates are the primary calculator of purchasing power in Nepal.
                </p>
            </div>
            <section>
                <h3 className="text-2xl font-black text-slate-900 mb-6">1. The INR Peg</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-8 bg-white border border-slate-200 rounded-2xl shadow-sm">
                        <h4 className="text-sm font-black uppercase text-indigo-600 mb-4">Stable Trade</h4>
                        <p className="text-xs text-slate-600">Fixed peg of 1.60 with the Indian Rupee.</p>
                    </div>
                    <div className="p-8 bg-white border border-slate-200 rounded-2xl shadow-sm">
                        <h4 className="text-sm font-black uppercase text-blue-600 mb-4">Volatility</h4>
                        <p className="text-xs text-slate-600">Indirect impact from global USD shifts.
        
        
        </p>
        </div>
        </div>
        </section>
        </div>
    ),
    faqs: [
      { question: "What is the US Dollar exchange rate in Nepal today?", answer: "The USD rate fluctuates daily based on NRB benchmarks." }
    ]
  },
  'market-rates/remittance': {
    title: "Nepal Remittance Board | Exchange Rates & Savings Guide 2082",
    description: "Compare remittance exchange rates for Nepal. Understand NRB rules for Remittance Savings Accounts, 1% extra interest, and legal channels (IPPS/Hundi).",
    howToUse: { steps: ["1. Select Country.", "2. Enter Amount.", "3. Compare Rates."] },
    formula: { title: "Remittance Calculation Formula", description: "Principal minus fees times rate.", raw: "Net = (P - F) x R", variables: ["P=Principal", "F=Fee", "R=Rate"] },
    content: (
        <div className="space-y-12">
            <div className="bg-emerald-50/50 border-l-4 border-emerald-600 rounded-r-xl p-8 shadow-sm">
                <h2 className="text-emerald-700 font-black text-xs uppercase tracking-[0.3em] mb-3">Sending Money to Nepal: Remittance Guide</h2>
                <p className="text-slate-800">Remittance is the backbone of the Nepalese economy.</p>
            </div>
            <section className="bg-slate-900 text-white rounded-2xl p-8 shadow-xl">
                <h3 className="text-xl font-black mb-4">Standard Advice</h3>
                <p className="text-sm text-slate-300">Always use formal banking channels to qualify for the extra 1% interest rate.
        
        
        </p>
        </section>
        </div>
    ),
    faqs: [
      { question: "How to get the best rate?", answer: "Compare providers using our calculator." }
    ]
  },
  'market-rates/live-silver-price': {
    title: "Live Silver Price in Nepal | Chandi Tola Rates Today",
    description: "Real-time silver rates in Nepal today.",
    howToUse: { steps: ["1. Sync Rates.", "2. Enter Quantity.", "3. Check Results."] },
    formula: { title: "Silver Price Calculation", description: "Market rate times weight.", raw: "Price = R x W", variables: ["R=Rate", "W=Weight"] },
    content: (
        <div className="space-y-12">
            <div className="bg-slate-50 border-l-4 border-slate-600 rounded-r-xl p-8 shadow-sm">
                <h2 className="text-slate-700 font-black text-xs uppercase tracking-[0.3em] mb-3">Silver Rates in Nepal Today</h2>
                <p className="text-slate-800">Silver is a popular ceremonial metal in Nepal.</p>
            </div>
            <section>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-8 bg-white border border-slate-200 rounded-2xl shadow-sm">
                        <h4 className="font-black text-slate-900 mb-2">Fine Silver</h4>
                        <p className="text-xs text-slate-600">99.9% purity benchmark.</p>
                    </div>
                    <div className="p-8 bg-white border border-slate-200 rounded-2xl shadow-sm">
                        <h4 className="font-black text-slate-900 mb-2">Sterling Silver</h4>
                        <p className="text-xs text-slate-600">92.5% purity for ornaments.
        
        
        </p>
        </div>
        </div>
        </section>
        </div>
    ),
    faqs: [
      { question: "Price today?", answer: "Check our June Current Year live calculator." }
    ]
  }
};
