'use client';
import Link from 'next/link';
import { JsonLd } from '@/components/seo/JsonLd';
import { useLiveRates } from '@/hooks/useLiveRates';

const ADVANCED = [
  {
    title: 'Live Gold Price',
    desc: 'Real-time 24K Hallmark and 22K Tejabi gold prices per tola and gram. Synced with federation benchmarks.',
    href: '/market-rates/live-gold-price',
    icon: '🏆',
    color: '#f59e0b',
    status: 'live',
  },
  {
    title: 'Live Silver Price',
    desc: 'Current silver (Chandi) rates in Nepal. Calculate per tola or gram with live market adjustments.',
    href: '/market-rates/live-silver-price',
    icon: '🥈',
    color: '#64748b',
    status: 'live',
  },
  {
    title: 'Exchange Rate',
    desc: 'Live foreign exchange rates for 20+ currencies including USD, INR, QAR, and SAR. NRB compatible.',
    href: '/market-rates/exchange-rate',
    icon: '💱',
    color: '#059669',
    status: 'live',
  },
  {
    title: 'Remittance Board',
    desc: 'Compare sending rates from Middle East, USA, and Australia to Nepal with live transparency.',
    href: '/market-rates/remittance',
    icon: '💸',
    color: '#4361ee',
    status: 'live',
  },
];

const TOOLS = [
  { name: 'Income Tax Calculator', href: '/calculator/nepal-income-tax', icon: '🧾' },
  { name: 'Salary Calculator', href: '/calculator/nepal-salary', icon: '💵' },
  { name: 'NEPSE Trading Tool', href: '/calculator/nepal-stocks', icon: '📈' },
  { name: 'WACC Calculator', href: '/calculator/nepse-wacc', icon: '📊' },
  { name: 'Land Converter', href: '/calculator/nepal-land', icon: '🏞️' },
  { name: 'VAT Calculator', href: '/calculator/nepal-vat', icon: '🔖' },
  { name: 'Loan EMI Calc', href: '/calculator/loan-emi', icon: '💳' },
  { name: 'SIP Calculator', href: '/calculator/sip-calculator', icon: '💹' },
];

export default function MarketRatesPillar() {
  const { rates, loading } = useLiveRates();

  return (
    <>
      <JsonLd
        type="breadcrumb"
        breadcrumbItems={[
          { name: 'Home', item: 'https://nepacalc.com' },
          { name: 'Market Rates', item: 'https://nepacalc.com/market-rates' }
        ]}
      />
      <JsonLd
        type="calculator"
        name="NEPACALC Live Market Dashboard"
        description="Live gold, silver, and currency rate dashboard for Nepal. Professional-grade financial instruments with NRB and Federation sync."
        url="https://nepacalc.com/market-rates"
        category="FinancialApplication"
      />

      <div className="min-h-screen bg-white">
        {/* Hero */}
        <section className="pt-20 pb-8 border-b border-slate-100 bg-slate-50/30">
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-2 flex items-center gap-3">
              <span className="text-3xl">📊</span>
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#059669]">Live Market Authority</span>
            </div>
            <h1 className="text-[18px] sm:text-[24px] font-black text-[#202124] tracking-tight leading-tight mb-2 lowercase">
              Market Rates <span className="text-[#059669]">&</span> Live Prices
            </h1>
            <p className="text-[13px] text-[#5f6368] max-w-2xl leading-relaxed">
              Official live gold and silver prices from FENEGOSIDA and real-time foreign exchange (Forex) rates from official indices.
              Professional calculations for remittance, taxes, and investments.
            </p>
          </div>
        </section>



        {/* Live Grids */}
        <section className="max-w-6xl mx-auto px-6 pt-6 pb-16">
          <h2 className="text-[13px] font-black uppercase tracking-[0.15em] text-[#059669] mb-8 border-b-2 border-slate-100 pb-2">
            Advanced Live Instruments
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ADVANCED.map(tool => (
              <div
                key={tool.title}
                className="group relative rounded-xl border border-slate-200 p-3 hover:border-transparent hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(135deg, ${tool.color}08, ${tool.color}15)` }} />

                <div className="relative z-10">
                  <div className="text-xl mb-2">{tool.icon}</div>
                  <h3 className="text-[13px] font-bold text-[#202124] mb-1">{tool.title}</h3>
                  <p className="text-[11px] text-[#5f6368] leading-relaxed mb-2">{tool.desc}</p>

                  <Link
                    href={tool.href}
                    className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-white transition-all hover:scale-105 active:scale-95"
                    style={{ background: tool.color }}
                  >
                    Open Live Feed →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Regular tools */}
        <section className="max-w-6xl mx-auto px-6 pb-20">
          <h2 className="text-[13px] font-black uppercase tracking-[0.15em] text-[#5f6368] mb-8 border-b-2 border-slate-100 pb-2">
            Related Financial Tools
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3">
            {TOOLS.map(calc => (
              <Link
                key={calc.name}
                href={calc.href}
                className="flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-200 hover:border-[#059669] hover:bg-[#05966908] transition-all group"
              >
                <span className="text-lg flex-shrink-0">{calc.icon}</span>
                <span className="text-[13px] font-bold text-[#202124] group-hover:text-[#059669] transition-colors truncate">
                  {calc.name}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* SEO Summary */}
        <section className="border-t border-slate-200 py-16 bg-slate-50/50">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-[16px] font-black text-[#202124] mb-6 uppercase tracking-tight">
               Nepal Market Authority Laboratory 2026
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
               <p className="text-[13px] text-[#5f6368] leading-relaxed">
                  The NEPACALC Market Rates pillar provides institutional-grade access to real-time financial indices in Nepal for the fiscal year 2082/2083. Our **live gold price** tool is synchronized with the latest international spot market data and adjusted according to **FENEGOSIDA (Federation of Nepal Gold and Silver Dealers' Association)** benchmarks, including updated 2026 import duties and regional dealer margins. Similarly, our live silver price provides up-to-the-minute **Chandi rates** per tola and 10 grams, essential for the jewelry and investment sectors.
               </p>
               <p className="text-[13px] text-[#5f6368] leading-relaxed">
                  Our exchange rate board offers the most reliable **Forex data** for the Nepalese Rupee (NPR). We track over 20 global currencies with a focus on NPR pairs for migrant workers and traders, including **USD to NPR**, **INR to NPR**, and Middle East currencies. All rates are verified against official indices and **Nepal Rastra Bank (NRB)** daily buying mandates. Whether you are calculating remittance, evaluating jewelry investments, or tracking currency shifts, NEPACALC provides the precision needed for informed financial decisions in Nepal.
               </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
