'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { TrendingUp, Info, BarChart2 } from 'lucide-react';
import { useSyncState } from '@/hooks/useSyncState';

function fmt(n: number) { return Math.round(n).toLocaleString('en-IN'); }

const PRESETS = [
  { label: 'NEPSE Average', initial: 100000, final: 250000, years: 5 },
  { label: 'FD Return',     initial: 100000, final: 161000, years: 6 },
  { label: 'Real Estate',   initial: 500000, final: 2000000, years: 10 },
];

export default function CAGRCalculator() {
  const [state, setState] = useSyncState('cagr_v4', { initial: 100000, finalV: 250000, years: 5 });
  const { initial, finalV, years } = state;
  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const cagr = useMemo(() => {
    if (initial <= 0 || finalV <= 0 || years <= 0) return 0;
    return (Math.pow(finalV / initial, 1 / years) - 1) * 100;
  }, [initial, finalV, years]);

  const totalGrowth = finalV > 0 && initial > 0 ? ((finalV - initial) / initial * 100).toFixed(1) : '0';
  const inputCls = "w-full h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-sm font-medium focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all";
  const labelCls = "text-[11px] font-bold uppercase text-[#70757A] tracking-wider";

  return (
    <ModernCalcLayout
      crumbs={[{ label: 'Finance', href: '/finance/' }, { label: 'CAGR Calculator' }]}
      title="CAGR Calculator"
      description="Calculate the Compound Annual Growth Rate of any investment. Compare NEPSE stocks, FD returns, and real estate to make smarter financial decisions."
      icon={TrendingUp}
      inputs={
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className={labelCls}>Initial Value (Rs.)</label>
              <input type="number" value={initial} min={0} onChange={e => update({ initial: Number(e.target.value) })} className={inputCls} />
            </div>
            <div className="space-y-2">
              <label className={labelCls}>Final Value (Rs.)</label>
              <input type="number" value={finalV} min={0} onChange={e => update({ finalV: Number(e.target.value) })} className={inputCls} />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <label className={labelCls}>Duration</label>
              <span className="text-[11px] font-black text-[#1A73E8]">{years} years</span>
            </div>
            <input type="number" value={years} min={1} max={50} onChange={e => update({ years: Number(e.target.value) })} className={inputCls} />
            <input type="range" min={1} max={30} step={1} value={years} onChange={e => update({ years: Number(e.target.value) })} className="w-full accent-[#1A73E8]" />
          </div>

          <div className="space-y-2">
            <label className={labelCls}>Quick Scenarios</label>
            <div className="space-y-2">
              {PRESETS.map(p => (
                <button key={p.label} onClick={() => update({ initial: p.initial, finalV: p.final, years: p.years })}
                  className="w-full p-3 border border-[#DADCE0] bg-white hover:bg-[#F8F9FA] rounded-lg text-left flex justify-between items-center transition-all">
                  <span className="text-[12px] font-bold text-[#202124]">{p.label}</span>
                  <span className="text-[10px] text-[#5F6368]">{fmt(p.initial)} → {fmt(p.final)} / {p.years}yr</span>
                </button>
              ))}
            </div>
          </div>

          <button className="w-full h-12 bg-[#38761D] hover:bg-[#274e13] text-white font-bold uppercase tracking-widest rounded-md transition-colors shadow-sm">
            Calculate CAGR
          </button>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className="p-6 bg-[#E8F0FE] border border-[#DADCE0] rounded-lg text-center space-y-1">
            <div className="flex items-center justify-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#1A73E8]" />
              <span className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider">Compound Annual Growth Rate</span>
            </div>
            <div className="text-5xl font-black text-[#188038]">{cagr.toFixed(2)}%</div>
            <div className="text-[9px] text-[#70757A] font-bold uppercase">per year, compounded</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white border border-[#DADCE0] rounded-lg text-center">
              <div className="text-[9px] font-bold text-[#70757A] uppercase">Total Growth</div>
              <div className="text-sm font-black text-[#188038]">+{totalGrowth}%</div>
            </div>
            <div className="p-4 bg-white border border-[#DADCE0] rounded-lg text-center">
              <div className="text-[9px] font-bold text-[#70757A] uppercase">Net Gain</div>
              <div className="text-sm font-black">Rs. {fmt(finalV - initial)}</div>
            </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg overflow-hidden">
            <div className="px-4 py-2 bg-[#F8F9FA] border-b border-[#DADCE0]">
              <span className="text-[10px] font-bold text-[#70757A] uppercase">Summary</span>
            </div>
            <div className="divide-y divide-[#DADCE0]">
              {[['Initial Investment', `Rs. ${fmt(initial)}`], ['Final Value', `Rs. ${fmt(finalV)}`], ['Period', `${years} years`]].map(([l, v]) => (
                <div key={l} className="p-3 flex justify-between text-xs">
                  <span className="text-[#5F6368]">{l}</span>
                  <span className="font-black">{v}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2 p-3 bg-[#FFF7E0] border border-[#FEEFC3] rounded-lg items-start">
            <Info className="w-4 h-4 text-[#F29900] shrink-0 mt-0.5" />
            <p className="text-[10px] text-[#202124] leading-tight">CAGR smooths out volatility for fair comparison. It does not represent guaranteed future returns.</p>
          </div>
        </div>
      }
      howToUse={{ steps: ["Enter the initial investment value.", "Enter the final value after the investment period.", "Set the number of years.", "Or use Quick Scenarios to compare real Nepal investment benchmarks."] }}
      formula={{ title: "CAGR Formula", description: "CAGR measures the mean annual growth rate of an investment over a specified time period longer than one year.", raw: "CAGR = [(Final Value / Initial Value)^(1/Years)] − 1" }}
      faqs={[
        { question: "What is a good CAGR in Nepal?", answer: "For context: FD returns average 7-9% CAGR, NEPSE historically averages 10-15% CAGR (with high volatility), and real estate in major cities has delivered 12-18% CAGR over the last decade." },
        { question: "How is CAGR different from simple growth?", answer: "Simple growth is just the total percentage change. CAGR annualizes that growth, making it easier to compare investments over different time periods." }
      ]}
      sidebar={{ title: "Investment Tools", links: [{ label: "SIP Calculator", href: "/calculator/sip-calculator" }, { label: "FD Calculator", href: "/calculator/fd-calculator" }, { label: "Compound Interest", href: "/calculator/compound-interest" }, { label: "NEPSE Tools", href: "/calculator/nepal-stocks" }], banner: { title: "Compare Returns", description: "Always compare investments on an annualized basis — CAGR is the professional standard.", image: "/images/invest-banner.jpg" } }}
      relatedTools={[{ label: "SIP Calculator", href: "/calculator/sip-calculator" }, { label: "FD Calculator", href: "/calculator/fd-calculator" }, { label: "Compound Interest", href: "/calculator/compound-interest" }]}
    />
  );
}
