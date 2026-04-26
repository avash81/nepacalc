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
      slug="nepse-bonus-tax"
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
      details={
        <div className="space-y-8">
          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-black text-[#202124] mb-4">Mastering NEPSE Corporate Actions & Taxation</h2>
            <div className="space-y-4 text-sm text-[#5F6368] leading-relaxed">
              <p>
                When publicly traded companies on the Nepal Stock Exchange (NEPSE) declare corporate actions, the Inland Revenue Department (IRD) imposes a mandatory 5% Withholding Tax (WHT) on all payouts to individuals. Our <strong className="text-[#202124]">nepse bonus tax calculator</strong> is engineered to decouple the often-confusing <strong className="text-[#202124]">bonus share tax calculation nepal</strong> from standard capital gains models. It allows retail and institutional investors to exactly project their net-in-hand dividend yield before the book closure date.
              </p>
              <p>
                Unlike standard <strong className="text-[#202124]">capital gains tax nepal</strong> (which fluctuates between 5% and 7.5% based on the holding period of sold shares), the <strong className="text-[#202124]">withholding tax on dividend nepal 2081</strong> is a flat 5% deduction at the source. This engine accurately parses both stock dividend (bonus shares) and cash dividend inputs to generate a unified liability report.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#202124] mb-4 border-b border-[#F1F3F4] pb-2">The Face Value Mathematics</h3>
            <ul className="space-y-3 text-sm text-[#5F6368] list-disc pl-5">
              <li><strong className="text-[#1A73E8]">Bonus Share Valuation:</strong> The IRD strictly dictates that bonus shares are taxed based on their <span className="italic">Face Value</span> (typically NPR 100 per share in Nepal), not their current market traded price (LTP). Our algorithm uses this absolute constant to calculate your exact liability.</li>
              <li><strong className="text-[#188038]">Cash Dividend Dynamics:</strong> For <strong className="text-[#202124]">cash dividend tax nepal</strong> calculations, the 5% is simply deducted from the gross declared cash amount. In many cases, companies declare just enough cash dividend to cover the tax liability of the bonus shares, ensuring investors do not have to pay tax out-of-pocket to their Depository Participant (DP).</li>
              <li><strong className="text-[#D93025]">Final Withholding Status:</strong> For individual retail investors, this 5% dividend tax is considered the final tax liability on that specific income stream, requiring no further declaration in your annual income tax returns.</li>
            </ul>
          </div>
        </div>
      }
      howToUse={{
        steps: [
          "Select your Investor Type. Individuals pay 5% WHT, whereas Institutional investors may have different rates depending on mutual fund exemptions.",
          "Enter the exact number of Bonus Shares you were allotted by the company.",
          "Verify the Face Value. In NEPSE, this is almost exclusively Rs. 100, though mutual funds usually operate at Rs. 10.",
          "Enter any Gross Cash Dividend received alongside the bonus shares.",
          "Review your 'Total Tax Liability' to see how much money the company will withhold before crediting your DEMAT/Bank account."
        ]
      }}
      formula={{
        title: "Nepal Dividend WHT Formula",
        description: "The official IRD formulation for calculating tax on corporate actions.",
        raw: "1. Bonus Share Tax = (Number of Bonus Shares × Face Value) × 5%\n2. Cash Dividend Tax = Gross Cash Dividend Amount × 5%\n\nTotal Tax Liability = Bonus Share Tax + Cash Dividend Tax"
      }}
      faqs={[
        {
          question: "Who deducts the dividend tax in Nepal?",
          answer: "The company distributing the dividend (often via their Share Registrar or Capital company) automatically deducts the 5% Withholding Tax (WHT) before crediting the shares to your DEMAT or cash to your bank account."
        },
        {
          question: "Why do companies sometimes only give cash dividends for tax purposes?",
          answer: "When a company issues bonus shares, the investor must pay 5% tax on the face value of those shares. To prevent investors from having to pay out of their own pocket, companies often issue a tiny cash dividend exactly equal to that 5% tax burden."
        },
        {
          question: "Is the 5% dividend tax final or advance?",
          answer: "For individual retail investors in Nepal, the 5% WHT on dividends is generally treated as a Final Withholding Tax. This means you do not need to calculate or pay any further income tax on this specific dividend income in your annual returns."
        },
        {
          question: "Are bonus shares taxed on their market price (LTP)?",
          answer: "No. The Inland Revenue Department (IRD) mandates that bonus shares are taxed strictly on their Face Value (usually Rs. 100), regardless of whether the stock is trading at Rs. 200 or Rs. 2000 in the secondary market."
        },
        {
          question: "Do mutual funds pay dividend tax?",
          answer: "In Nepal, registered mutual funds are entirely exempt from paying tax on dividends received from companies. However, when the mutual fund distributes dividends to its own unit holders, a 5% tax is deducted."
        },
        {
          question: "What happens if a company gives bonus shares but NO cash dividend?",
          answer: "If no cash dividend is provided to cover the tax, the investor must manually deposit the 5% tax amount into the company's designated bank account before the Capital will release the bonus shares into the investor's DEMAT account."
        }
      ]}
      sidebar={{ 
        title: "NEPSE Tools", 
        links: [
          { label: "Nepal Income Tax", href: "/calculator/nepal-income-tax/" }, 
          { label: "Nepal TDS", href: "/calculator/nepal-tds/" }, 
          { label: "CAGR Calculator", href: "/calculator/cagr-calculator/" }, 
          { label: "SIP Calculator", href: "/calculator/sip-calculator/" }
        ], 
        banner: { title: "Smart Investing", description: "Always account for dividend tax when calculating your effective NEPSE return.", image: "/images/nepse-banner.jpg" } 
      }}
      relatedTools={[
        { label: "Nepal Income Tax", href: "/calculator/nepal-income-tax/" }, 
        { label: "TDS Calculator", href: "/calculator/nepal-tds/" }, 
        { label: "CAGR Calculator", href: "/calculator/cagr-calculator/" }
      ]}
    />
  );
}
