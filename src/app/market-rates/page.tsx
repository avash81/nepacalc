'use client';
import Link from 'next/link';
import { Activity, ArrowRight } from 'lucide-react';
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

      <div className="min-h-screen bg-[#F8FAFC]">
        {/* Billboard Hero */}
        <section className="pt-20 pb-16 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-xl shadow-emerald-600/10">
                 <Activity className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-emerald-600">Live Market Hub</span>
            </div>
            
            <h1 className="text-[28px] sm:text-[42px] font-black text-slate-900 tracking-tighter leading-none mb-4">
              Market Rates <span className="text-emerald-600">&</span> Live Prices
            </h1>
            <p className="text-[15px] text-slate-500 max-w-2xl font-medium leading-relaxed mb-12">
              The authoritative dashboard for Nepal's financial indices. Track real-time FENEGOSIDA gold benchmarks and official NRB forex buying/selling mandates with institutional precision.
            </p>

            {/* Live Billboard Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
               {loading ? (
                  [1,2,3,4].map(i => <div key={i} className="h-32 bg-slate-100 rounded-3xl animate-pulse" />)
               ) : (
                  <>
                    <Link href="/market-rates/live-gold-price" className="group p-6 bg-white border border-slate-200 rounded-[2rem] hover:border-amber-400 hover:shadow-xl transition-all duration-300">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Gold 24K (Hallmark)</p>
                       <div className="text-2xl font-black text-slate-900 tracking-tighter mb-2">Rs. {(rates?.gold.tolaNPR.current ?? 0).toLocaleString()}</div>
                       <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black">+{rates?.gold.tolaNPR.changePercent24h}%</span>
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Per Tola</span>
                       </div>
                    </Link>
                    <Link href="/market-rates/live-gold-price" className="group p-6 bg-white border border-slate-200 rounded-[2rem] hover:border-amber-300 hover:shadow-xl transition-all duration-300">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Gold 22K (Tejabi)</p>
                       <div className="text-2xl font-black text-slate-900 tracking-tighter mb-2">Rs. {Math.round((rates?.gold.tolaNPR.current ?? 0) * 0.916).toLocaleString()}</div>
                       <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black">+{rates?.gold.tolaNPR.changePercent24h}%</span>
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Per Tola</span>
                       </div>
                    </Link>
                    <Link href="/market-rates/live-silver-price" className="group p-6 bg-white border border-slate-200 rounded-[2rem] hover:border-slate-400 hover:shadow-xl transition-all duration-300">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Silver (Chandi)</p>
                       <div className="text-2xl font-black text-slate-900 tracking-tighter mb-2">Rs. {(rates?.silver.tolaNPR.current ?? 0).toLocaleString()}</div>
                       <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 text-[10px] font-black">{rates?.silver.tolaNPR.changePercent24h}%</span>
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Per Tola</span>
                       </div>
                    </Link>
                    <Link href="/market-rates/exchange-rate" className="group p-6 bg-white border border-slate-200 rounded-[2rem] hover:border-emerald-400 hover:shadow-xl transition-all duration-300">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">USD / NPR Forex</p>
                       <div className="text-2xl font-black text-slate-900 tracking-tighter mb-2">Rs. {(rates?.forex.usd.current ?? 0).toFixed(2)}</div>
                       <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black">+{rates?.forex.usd.changePercent24h}%</span>
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">By NRB Indices</span>
                       </div>
                    </Link>
                  </>
               )}
            </div>
          </div>
        </section>

        {/* Dashboard Navigation */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex items-center justify-between mb-12">
             <div>
                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Institutional Dashboards</h2>
                <p className="text-[13px] text-slate-500 font-medium">Deep-dive into specific market instruments and historical trends.</p>
             </div>
             <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full border border-emerald-100">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[9px] font-black text-emerald-700 uppercase tracking-widest">Live Laboratory</span>
             </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ADVANCED.map(tool => (
              <Link
                key={tool.title}
                href={tool.href}
                className="group relative rounded-[2rem] border border-slate-200 p-8 hover:border-transparent hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 overflow-hidden flex flex-col bg-white"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(135deg, ${tool.color}08, ${tool.color}15)` }} />
                
                <div className="relative z-10 flex flex-col flex-1">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-inner mb-6 bg-slate-50 group-hover:scale-110 transition-transform">
                     {tool.icon}
                  </div>
                  <h3 className="text-[17px] font-black text-slate-900 mb-3 tracking-tight">{tool.title}</h3>
                  <p className="text-[13px] text-slate-500 leading-relaxed font-medium mb-8 flex-1">{tool.desc}</p>
                  
                  <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-900 transition-colors">
                     <span>Enter Dashboard</span>
                     <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Regular tools */}
        <section className="max-w-7xl mx-auto px-6 pb-24">
          <div className="p-10 bg-slate-900 rounded-[3rem] text-white">
             <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12">
                <div>
                   <h2 className="text-2xl font-black tracking-tight mb-2">Related Financial Calculators</h2>
                   <p className="text-[14px] text-white/50 font-medium">Supporting instruments for taxation, trading, and asset valuation.</p>
                </div>
             </div>
             
             <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
               {TOOLS.map(calc => (
                 <Link
                   key={calc.name}
                   href={calc.href}
                   className="flex items-center gap-4 px-6 py-5 rounded-[1.5rem] bg-white/5 hover:bg-white/10 hover:translate-y-[-2px] transition-all border border-white/5 group"
                 >
                   <span className="text-xl flex-shrink-0 group-hover:scale-110 transition-transform">{calc.icon}</span>
                   <span className="text-[13px] font-bold text-white/90 group-hover:text-white transition-colors truncate">
                     {calc.name}
                   </span>
                 </Link>
               ))}
             </div>
          </div>
        </section>

        {/* SEO Technical Context */}
        <section className="border-t border-slate-200 py-20 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-[18px] font-black text-slate-900 mb-8 uppercase tracking-tighter border-b-2 border-emerald-500 inline-block pb-1">
               Nepal Market Indices & Real-time Evaluation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
               <p className="text-[14px] text-slate-500 leading-relaxed font-medium">
                  NEPACALC serves as the high-authority hub for real-time market tracking in Nepal. Unlike generic trackers, our system strictly adheres to the official mandates published by the **Nepal Rastra Bank (NRB)** for forex and the **FENEGOSIDA** (Federation of Nepal Gold and Silver Dealers' Association) for metals. Each price displayed is calculated using standard international spot market indices adjusted for domestic customs duties (approx. 20%) and regional dealer margins, ensuring absolute transparency for commercial and personal financial planning.
               </p>
               <p className="text-[14px] text-slate-500 leading-relaxed font-medium">
                  Our live market laboratory operates 24/7, tracking volatility across major global remit corridors including the Middle East, USA, and Australia. Whether you are tracking **24K Hallmark Gold** trends, evaluating **USD to NPR** buying/selling splits, or comparing remittance provider payouts, our dashboard delivers institutional-grade precision with zero rounded-error variance. All financial calculations are executed entirely client-side for absolute privacy and maximum speed.
               </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
