'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { TrendingUp, ShieldCheck, AlertTriangle, Info, Wallet } from 'lucide-react';
import { useSyncState } from '@/hooks/useSyncState';

function fmt(n: number) { return 'Rs. ' + Math.round(n).toLocaleString('en-IN'); }

export default function NepseBonusTaxCalculator() {
  const [state, setState] = useSyncState('nepse_tax_v3', {
    bonusShares: 50, cashDividend: 500, faceValue: 100,
    investorType: 'individual' as 'individual' | 'institutional',
  });
  const { bonusShares, cashDividend, faceValue, investorType } = state;
  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const results = useMemo(() => {
    const taxRate = 0.05;
    const bonusTaxAmount = (bonusShares * faceValue) * taxRate;
    const cashTaxAmount = cashDividend * taxRate;
    const totalTax = bonusTaxAmount + cashTaxAmount;
    const totalDividendValue = (bonusShares * faceValue) + cashDividend;
    return { bonusTaxAmount, cashTaxAmount, totalTax, totalDividendValue, netPayable: totalDividendValue - totalTax };
  }, [bonusShares, cashDividend, faceValue]);

  const inputCls = "w-full h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-sm font-medium focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all";
  const labelCls = "text-[11px] font-bold uppercase text-[#70757A] tracking-wider";

  return (
    <ModernCalcLayout
      crumbs={[{ label: 'Nepal Tools', href: '/nepal/' }, { label: 'Bonus Share Tax' }]}
      title="NEPSE Dividend Tax Calculator"
      description="Calculate dividend withholding tax on bonus shares and cash dividends from listed companies. Based on Nepal Income Tax Act FY 2082/83 — 5% WHT rate."
      icon={TrendingUp}
      inputs={
        <div className="space-y-6">
          <div className="flex gap-2 p-3 bg-[#E6F4EA] border border-[#CEEAD6] rounded-lg items-center">
            <Info className="w-4 h-4 text-[#188038] shrink-0" />
            <p className="text-[10px] text-[#202124] font-bold uppercase tracking-wide">Official Tax Rate: 5% (Listed Companies)</p>
          </div>

          <div className="space-y-2">
            <label className={labelCls}>Investor Type</label>
            <div className="flex bg-[#F1F3F4] p-1 rounded-lg">
              {(['individual', 'institutional'] as const).map(t => (
                <button key={t} onClick={() => update({ investorType: t })}
                  className={`flex-1 py-2 text-xs font-bold uppercase rounded-md transition-all ${investorType === t ? 'bg-white text-[#1A73E8] shadow-sm' : 'text-[#5F6368]'}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className={labelCls}>Bonus Shares Received</label>
              <input type="number" value={bonusShares} min={0}
                onChange={e => update({ bonusShares: Number(e.target.value) })} className={inputCls} />
            </div>
            <div className="space-y-2">
              <label className={labelCls}>Face Value (Rs.)</label>
              <input type="number" value={faceValue} min={1}
                onChange={e => update({ faceValue: Number(e.target.value) })} className={inputCls} />
              <p className="text-[9px] text-[#70757A]">Standard: Rs. 100 per share</p>
            </div>
          </div>

          <div className="space-y-2">
            <label className={labelCls}>Gross Cash Dividend (Rs.)</label>
            <input type="number" value={cashDividend} min={0}
              onChange={e => update({ cashDividend: Number(e.target.value) })} className={inputCls} />
          </div>

          <button className="w-full h-12 bg-[#38761D] hover:bg-[#274e13] text-white font-bold uppercase tracking-widest rounded-md transition-colors shadow-sm">
            Calculate Tax Liability
          </button>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className="p-6 bg-[#FCE8E6] border border-[#FAD2CF] rounded-lg text-center space-y-1">
            <div className="text-[10px] font-bold text-[#D93025] uppercase tracking-wider">Total Tax Liability</div>
            <div className="text-4xl font-black text-[#D93025]">{fmt(results.totalTax)}</div>
            <div className="text-[9px] text-[#70757A] font-bold uppercase">5% Withholding Tax</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white border border-[#DADCE0] rounded-lg text-center">
              <div className="text-[9px] font-bold text-[#70757A] uppercase">Bonus Share Tax</div>
              <div className="text-sm font-black text-[#D93025]">{fmt(results.bonusTaxAmount)}</div>
            </div>
            <div className="p-4 bg-white border border-[#DADCE0] rounded-lg text-center">
              <div className="text-[9px] font-bold text-[#70757A] uppercase">Cash Dividend Tax</div>
              <div className="text-sm font-black text-[#D93025]">{fmt(results.cashTaxAmount)}</div>
            </div>
          </div>

          <div className="bg-[#1A1A2E] text-white rounded-lg p-5 space-y-4">
            <div className="flex items-center gap-2">
              <Wallet className="w-4 h-4 text-[#188038]" />
              <span className="text-[10px] font-black uppercase tracking-wider">Withholding Summary</span>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-white/60">Gross Dividend Value</span>
                <span className="font-black text-[#4CAF50]">{fmt(results.totalDividendValue)}</span>
              </div>
              <div className="h-px bg-white/10" />
              <div className="flex justify-between text-xs">
                <span className="text-white/60">Net Payable (In-Hand)</span>
                <span className="font-black text-white">{fmt(results.netPayable)}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2 p-3 bg-[#FFF7E0] border border-[#FEEFC3] rounded-lg items-start">
            <AlertTriangle className="w-4 h-4 text-[#F29900] shrink-0 mt-0.5" />
            <p className="text-[10px] text-[#202124] leading-tight">Verify final WHT deducted with your DP (Depository Participant) or CDSC portal after dividend processing.</p>
          </div>
        </div>
      }
      howToUse={{ steps: ["Select investor type (Individual or Institutional).", "Enter the number of bonus shares received from the company.", "Enter the face value per share (usually Rs. 100 for Nepal).", "Enter the gross cash dividend amount.", "View total tax, per-category breakdown, and net in-hand amount."] }}
      formula={{ title: "Nepal Dividend WHT Formula", description: "5% Withholding Tax applies to both bonus shares and cash dividends from listed companies.", raw: "Bonus Share Tax = (No. of Shares × Face Value) × 5%\nCash Dividend Tax = Cash Dividend Amount × 5%\nTotal Tax = Bonus Tax + Cash Tax" }}
      faqs={[
        { question: "Who deducts the dividend tax?", answer: "The company distributing the dividend deducts the 5% WHT before crediting shares/cash to your DEMAT account. You receive the net amount directly." },
        { question: "Is the 5% tax final or advance?", answer: "For individuals, the 5% WHT on dividends is generally treated as a final tax. You do not need to include it in your annual income tax return separately." }
      ]}
      sidebar={{ title: "NEPSE Tools", links: [{ label: "Nepal Income Tax", href: "/calculator/nepal-income-tax" }, { label: "Nepal TDS", href: "/calculator/nepal-tds-calculator" }, { label: "CAGR Calculator", href: "/calculator/cagr-calculator" }, { label: "SIP Calculator", href: "/calculator/sip-calculator" }], banner: { title: "Smart Investing", description: "Always account for dividend tax when calculating your effective NEPSE return.", image: "/images/nepse-banner.jpg" } }}
      relatedTools={[{ label: "Nepal Income Tax", href: "/calculator/nepal-income-tax" }, { label: "TDS Calculator", href: "/calculator/nepal-tds-calculator" }, { label: "CAGR Calculator", href: "/calculator/cagr-calculator" }]}
    />
  );
}
