'use client';
import Link from 'next/link';
import { Activity, ArrowRight, TrendingUp, TrendingDown, DollarSign, Coins, CreditCard, Landmark, Receipt, Calculator, Briefcase, Ruler, BarChart3, Wallet } from 'lucide-react';
import { JsonLd } from '@/components/seo/JsonLd';
import { useLiveRates } from '@/hooks/useLiveRates';

const DASHBOARDS = [
  {
    title: 'Live Gold Price',
    desc: 'Real-time 24K Hallmark and 22K Tejabi gold prices per tola and gram.',
    href: '/market-rates/live-gold-price',
    icon: <Coins className="w-6 h-6 text-amber-500" />,
    color: '#f59e0b',
  },
  {
    title: 'Live Silver Price',
    desc: 'Current silver (Chandi) rates in Nepal with live market adjustments.',
    href: '/market-rates/live-silver-price',
    icon: <div className="w-6 h-6 rounded-full bg-slate-200 border-2 border-slate-400" />,
    color: '#64748b',
  },
  {
    title: 'Exchange Rate',
    desc: 'Live foreign exchange rates for 20+ currencies. NRB compatible.',
    href: '/market-rates/exchange-rate',
    icon: <DollarSign className="w-6 h-6 text-emerald-600" />,
    color: '#059669',
  },
  {
    title: 'Remittance Board',
    desc: 'Compare sending rates from Middle East, USA, and Australia to Nepal.',
    href: '/market-rates/remittance',
    icon: <Landmark className="w-6 h-6 text-blue-600" />,
    color: '#4361ee',
  },
];

const RELATED_TOOLS = [
  { name: 'Income Tax', href: '/calculator/nepal-income-tax', icon: <Receipt className="w-4 h-4" /> },
  { name: 'Salary Calc', href: '/calculator/nepal-salary', icon: <Wallet className="w-4 h-4" /> },
  { name: 'Stocks', href: '/calculator/nepal-stocks', icon: <TrendingUp className="w-4 h-4" /> },
  { name: 'WACC Tool', href: '/calculator/nepse-wacc', icon: <BarChart3 className="w-4 h-4" /> },
  { name: 'Land Converter', href: '/calculator/nepal-land', icon: <Ruler className="w-4 h-4" /> },
  { name: 'VAT / Tax', href: '/calculator/status-vat', icon: <Receipt className="w-4 h-4" /> },
  { name: 'Loan EMI', href: '/calculator/loan-emi', icon: <CreditCard className="w-4 h-4" /> },
  { name: 'SIP Planner', href: '/calculator/sip-calculator', icon: <Activity className="w-4 h-4" /> },
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
      
      <div className="min-h-screen bg-[#FDFDFD]">
        {/* Modern Clean Header */}
        <header className="pt-24 pb-12 bg-white border-b border-slate-100">
          <div className="hp-container">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 mb-6 text-emerald-600">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center">
                    <Activity className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Market Authority</span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.1] mb-4">
                  Live Market <span className="text-emerald-600">Indices.</span>
                </h1>
                <p className="text-[15px] sm:text-[16px] text-slate-500 font-medium leading-relaxed italic">
                  "Institutional data calibrated for precision. Nepal's most accurate dashboard for gold, silver, and forex benchmarks."
                </p>
              </div>
              
              <div className="flex items-center gap-4 py-3 px-5 bg-slate-50 rounded-2xl border border-slate-100">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                 <div className="flex flex-col">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Feed Status</span>
                    <span className="text-[11px] font-bold text-slate-900">Synchronized with NRB + FENEGOSIDA</span>
                 </div>
              </div>
            </div>
          </div>
        </header>

        <main className="hp-container py-12 space-y-20">
          {/* 1. Live Billboard Section */}
          <section>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {loading || !rates ? (
                [1, 2, 3, 4].map(i => (
                  <div key={i} className="h-32 bg-slate-50 rounded-[2rem] animate-pulse border border-slate-100" />
                ))
              ) : (
                <>
                  <RateCard 
                    label="Gold 24K Hallmark" 
                    value={rates.gold.tolaNPR.current} 
                    change={rates.gold.tolaNPR.changePercent24h} 
                    unit="Per Tola"
                    href="/market-rates/live-gold-price"
                    color="amber"
                  />
                  <RateCard 
                    label="Gold 22K Tejabi" 
                    value={Math.round(rates.gold.tolaNPR.current * 0.916)} 
                    change={rates.gold.tolaNPR.changePercent24h} 
                    unit="Per Tola"
                    href="/market-rates/live-gold-price"
                    color="amber"
                  />
                  <RateCard 
                    label="Silver (Chandi)" 
                    value={rates.silver.tolaNPR.current} 
                    change={rates.silver.tolaNPR.changePercent24h} 
                    unit="Per Tola"
                    href="/market-rates/live-silver-price"
                    color="slate"
                  />
                  <RateCard 
                    label="USD / NPR Forex" 
                    value={rates.forex.usd.current} 
                    change={rates.forex.usd.changePercent24h} 
                    unit="By NRB Feed"
                    href="/market-rates/exchange-rate"
                    color="emerald"
                    isForex
                  />
                </>
              )}
            </div>
          </section>

          {/* 2. Deep-Dive Dashboards */}
          <section>
            <h2 className="text-[13px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8 text-center">Institutional Data Suites</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {DASHBOARDS.map((d, i) => (
                <Link key={i} href={d.href} className="group p-8 bg-white border border-slate-100 rounded-[2.5rem] hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-500 flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    {d.icon}
                  </div>
                  <h3 className="text-lg font-black text-slate-800 mb-2 tracking-tight">{d.title}</h3>
                  <p className="text-[13px] text-slate-400 font-medium mb-8 flex-1">{d.desc}</p>
                  <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-2 border-b border-transparent group-hover:border-blue-200 pb-1 transition-all">
                    Enter Dashboard <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* 3. Related Calculations (The Unmanaged Part) */}
          <section className="bg-slate-900 rounded-[3rem] p-8 sm:p-16 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] pointer-events-none" />
            
            <div className="relative z-10">
              <div className="mb-12">
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-3">Related Solutions.</h2>
                <p className="text-[14px] text-slate-400 font-medium max-w-xl">Deep integration with Nepal's fiscal environment including real-time tax slabs and stock valuation tools.</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {RELATED_TOOLS.map((tool, i) => (
                  <Link key={i} href={tool.href} className="group flex flex-col sm:flex-row sm:items-center gap-3 p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all">
                    <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-white/50 group-hover:text-blue-400 group-hover:bg-blue-400/10 transition-all">
                      {tool.icon}
                    </div>
                    <span className="text-[13px] font-bold text-white/80 group-hover:text-white transition-colors">
                      {tool.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* 4. Methodology Context */}
          <section className="py-20 border-t border-slate-100">
            <div className="max-w-4xl mx-auto">
               <h3 className="text-xs font-black text-emerald-600 uppercase tracking-[0.3em] mb-4">Official Methodology</h3>
               <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-8">How we maintain 100% precision.</h2>
               <div className="prose prose-slate prose-sm font-medium text-slate-500 max-w-none space-y-6">
                 <p>
                    NEPACALC serves as the authoritative digital index for market prices in Nepal. Our data feed bypasses generic global aggregators, connecting directly to provincial benchmark sources. For precious metals, we utilize a proprietary weighting algorithm that combines **LME spot prices** with the **FENEGOSIDA official rate** and current customs duty mandates to provide the most realistic "on-the-ground" price for consumers.
                 </p>
                 <p>
                    Forex data is refreshed every 15 minutes, synchronized with the **Nepal Rastra Bank's** official reference rate. Unlike commercial bank apps that show varied selling/buying spreads, NEPACALC provides the pure institutional mid-rate, serving as an unbiased baseline for remittance and international trade calculations. All data is processed client-side, ensuring your financial tracking remains 100% private.
                 </p>
               </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

function RateCard({ label, value, change, unit, href, color, isForex }: any) {
  const isUp = parseFloat(change) >= 0;
  
  return (
    <Link href={href} className={`group p-4 sm:p-6 bg-white border border-slate-100 rounded-[2rem] hover:shadow-2xl transition-all duration-300 flex flex-col justify-between min-h-[140px] sm:min-h-[160px] ${
      color === 'amber' ? 'hover:border-amber-400' : color === 'emerald' ? 'hover:border-emerald-400' : 'hover:border-slate-400'
    }`}>
      <div>
        <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 truncate">{label}</p>
        <div className="flex items-baseline gap-1">
          <span className="text-sm font-black text-slate-400">Rs.</span>
          <span className="text-[19px] sm:text-2xl font-black text-slate-900 tracking-tighter">
            {isForex ? value.toFixed(2) : value.toLocaleString()}
          </span>
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-4">
        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black ${
          isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
        }`}>
          {isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          <span>{isUp ? '+' : ''}{change}%</span>
        </div>
        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{unit}</span>
      </div>
    </Link>
  );
}

