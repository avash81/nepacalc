'use client';
import { useMemo, useState, useCallback } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { useLiveRates } from '@/hooks/useLiveRates';
import { 
  Landmark, Zap, Globe, History, Wallet, ExternalLink
} from 'lucide-react';
import { 
  PieChart as RePieChart, Pie, Cell, Tooltip, ResponsiveContainer
} from 'recharts';

const TOLA_GRAMS  = 11.66381;   // official FENEGOSIDA standard
const LAL_GRAMS   = TOLA_GRAMS / 100;  // 0.1166381
const AANA_LAL    = 6.25;
const AANA_GRAMS  = AANA_LAL * LAL_GRAMS;  // 0.72899
const RATTI_GRAMS = LAL_GRAMS / 1.2;   // 1 Lal = 1.2 Ratti approx

type UnitMode = 'tola' | 'lal' | 'aana' | 'gram';
type PurityType = 'hallmark' | 'tejabi';
type ChargeType = 'fixed' | 'percent';

interface CalcState {
  tola: string;
  lal: string;
  aana: string;
  gram: string;
  purity: PurityType;
  chargeType: ChargeType;
  chargeValue: string;
}

const EMPTY: CalcState = {
  tola: '', lal: '', aana: '', gram: '',
  purity: 'hallmark', chargeType: 'fixed', chargeValue: '5000'
};

function fmt(n: number) {
  return 'Rs. ' + Math.round(n).toLocaleString('en-IN');
}
function dp(n: number, d = 4) {
  return parseFloat(n.toFixed(d));
}

export default function GoldConverter({ initialAssetId, isEmbed = false }: { initialAssetId?: string; isEmbed?: boolean }) {
  const { rates, loading } = useLiveRates();
  const [state, setState] = useState<CalcState>(EMPTY);

  const liveRate = useMemo(() => {
    if (!rates?.gold) return 0;
    return state.purity === 'hallmark'
      ? rates.gold.tolaNPR.current
      : Math.round(rates.gold.tolaNPR.current * 0.916);
  }, [rates, state.purity]);

  // Master derived values from any input field
  const derived = useMemo(() => {
    // Figure out base grams from whichever field was last filled
    let grams = 0;
    if (state.gram !== '' && parseFloat(state.gram) > 0) {
      grams = parseFloat(state.gram);
    } else if (state.tola !== '' && parseFloat(state.tola) > 0) {
      grams = parseFloat(state.tola) * TOLA_GRAMS;
    } else if (state.lal !== '' && parseFloat(state.lal) > 0) {
      grams = parseFloat(state.lal) * LAL_GRAMS;
    } else if (state.aana !== '' && parseFloat(state.aana) > 0) {
      grams = parseFloat(state.aana) * AANA_GRAMS;
    }
    const tola  = dp(grams / TOLA_GRAMS);
    const lal   = dp(grams / LAL_GRAMS, 2);
    const aana  = dp(grams / AANA_GRAMS, 2);
    const ratti = dp(grams / RATTI_GRAMS, 2);
    return { grams: dp(grams), tola, lal, aana, ratti };
  }, [state.gram, state.tola, state.lal, state.aana]);

  const result = useMemo(() => {
    const basePrice  = (derived.grams / TOLA_GRAMS) * liveRate;
    const charge     = parseFloat(state.chargeValue) || 0;
    const makingCost = state.chargeType === 'fixed' ? charge : (basePrice * charge) / 100;
    const total      = basePrice + makingCost;
    const efficiency = total > 0 ? (basePrice / total) * 100 : 100;
    const gramToLal  = dp(derived.grams * (100 / TOLA_GRAMS), 2);
    return { basePrice: Math.round(basePrice), makingCost: Math.round(makingCost), total: Math.round(total), efficiency };
  }, [derived, liveRate, state.chargeType, state.chargeValue]);

  // Sync all fields when one is changed
  const handleTola = useCallback((v: string) => {
    const n = parseFloat(v) || 0;
    const g = n * TOLA_GRAMS;
    setState(s => ({ ...s, tola: v, lal: v === '' ? '' : dp(n * 100, 2).toString(), aana: v === '' ? '' : dp(n * 16, 2).toString(), gram: v === '' ? '' : dp(g).toString() }));
  }, []);

  const handleLal = useCallback((v: string) => {
    const n = parseFloat(v) || 0;
    const g = n * LAL_GRAMS;
    setState(s => ({ ...s, lal: v, tola: v === '' ? '' : dp(n / 100).toString(), aana: v === '' ? '' : dp(n / AANA_LAL, 2).toString(), gram: v === '' ? '' : dp(g).toString() }));
  }, []);

  const handleAana = useCallback((v: string) => {
    const n = parseFloat(v) || 0;
    const g = n * AANA_GRAMS;
    setState(s => ({ ...s, aana: v, tola: v === '' ? '' : dp(n / 16).toString(), lal: v === '' ? '' : dp(n * AANA_LAL, 2).toString(), gram: v === '' ? '' : dp(g).toString() }));
  }, []);

  const handleGram = useCallback((v: string) => {
    const n = parseFloat(v) || 0;
    setState(s => ({ ...s, gram: v, tola: v === '' ? '' : dp(n / TOLA_GRAMS).toString(), lal: v === '' ? '' : dp(n / LAL_GRAMS, 2).toString(), aana: v === '' ? '' : dp(n / AANA_GRAMS, 2).toString() }));
  }, []);

  const hasInput = derived.grams > 0;

  // ─── INPUTS ─────────────────────────────────────────────────────────────────
  const inputsComponent = (
    <div className="space-y-5">
      {/* Purity Selector */}
      <div className="space-y-2">
        <label className="text-[11px] font-black text-[#5F6368] uppercase tracking-wider">Gold Standard</label>
        <div className="grid grid-cols-2 gap-3">
          {(['hallmark', 'tejabi'] as const).map(p => (
            <button
              key={p}
              onClick={() => setState(s => ({ ...s, purity: p }))}
              className={`h-11 rounded-md border text-[10px] font-black uppercase tracking-wide transition-all ${state.purity === p ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-[#DADCE0] bg-white text-[#5F6368] hover:border-amber-400'}`}
            >
              {p === 'hallmark' ? '24K Hallmark (छापावाल)' : '22K Tejabi (तेजाबी)'}
            </button>
          ))}
        </div>
      </div>

      {/* Bidirectional Unit Inputs */}
      <div className="space-y-2">
        <label className="text-[11px] font-black text-[#5F6368] uppercase tracking-wider">Enter Any Unit — All Others Auto-Calculate</label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Tola (तोला)', val: state.tola, fn: handleTola, hint: '1 Tola = 11.6638g' },
            { label: 'Lal (लाल)', val: state.lal, fn: handleLal, hint: '100 Lal = 1 Tola' },
            { label: 'Aana (आना)', val: state.aana, fn: handleAana, hint: '16 Aana = 1 Tola' },
            { label: 'Gram (ग्राम)', val: state.gram, fn: handleGram, hint: '11.6638g = 1 Tola' },
          ].map(({ label, val, fn, hint }) => (
            <div key={label} className="space-y-1">
              <div className="text-[9px] font-black text-[#5F6368] uppercase tracking-wider">{label}</div>
              <input
                type="number"
                min="0"
                step="any"
                placeholder="0"
                value={val}
                onChange={e => fn(e.target.value)}
                className="w-full h-11 px-3 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-amber-400 outline-none transition-all placeholder:text-slate-300"
              />
              <div className="text-[8px] text-slate-400">{hint}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Ratti display (read-only) */}
      {hasInput && (
        <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg grid grid-cols-2 gap-2 text-center">
          <div>
            <div className="text-[8px] font-black text-amber-700 uppercase tracking-wider">Ratti (रत्ती)</div>
            <div className="text-sm font-black text-amber-800">{derived.ratti}</div>
          </div>
          <div>
            <div className="text-[8px] font-black text-amber-700 uppercase tracking-wider">Exact Grams</div>
            <div className="text-sm font-black text-amber-800">{derived.grams}g</div>
          </div>
        </div>
      )}

      {/* Crafting Charge */}
      <div className="space-y-2">
        <label className="text-[11px] font-black text-[#5F6368] uppercase tracking-wider">Crafting Charge (Jyala/Jarti)</label>
        <div className="flex gap-3">
          <select
            value={state.chargeType}
            onChange={e => setState(s => ({ ...s, chargeType: e.target.value as ChargeType }))}
            className="w-1/3 h-11 px-3 bg-white border border-[#DADCE0] rounded-md text-[10px] font-black uppercase text-[#202124] focus:border-amber-400 outline-none appearance-none"
          >
            <option value="fixed">Fixed Rs.</option>
            <option value="percent">Percent %</option>
          </select>
          <input
            type="number"
            value={state.chargeValue}
            onChange={e => setState(s => ({ ...s, chargeValue: e.target.value }))}
            className="w-2/3 h-11 px-3 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-amber-400 outline-none transition-all"
          />
        </div>
      </div>

      {/* FENEGOSIDA note + back-link */}
      <div className="p-3 bg-[#FFF9E6] border border-[#F29900] rounded-md flex gap-2">
        <Zap className="w-4 h-4 text-[#F29900] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="text-[10px] text-[#5F6368] font-bold leading-relaxed uppercase">
            Rates synced with <span className="text-[#F29900]">FENEGOSIDA</span> daily benchmarks.
          </p>
          <p className="text-[10px] text-[#5F6368] font-bold">
            Calibrated to current FENEGOSIDA benchmarks.{' '}
            <a href="/market-rates/live-gold-price/" className="text-[#1A73E8] hover:underline">
              View Daily Pricing Index →
            </a>
          </p>
        </div>
      </div>

      <button
        onClick={() => setState(EMPTY)}
        className="w-full h-11 bg-[#38761D] hover:bg-[#274e13] text-white text-[11px] font-black uppercase tracking-widest rounded-md transition-colors shadow-sm"
      >
        Generate Metal Audit Report
      </button>
    </div>
  );

  // ─── RESULTS ─────────────────────────────────────────────────────────────────
  const resultsComponent = (
    <div className="space-y-5 h-full flex flex-col justify-center">
      {!hasInput ? (
        <div className="text-center py-12 text-slate-300">
          <div className="text-5xl mb-3">⚖️</div>
          <div className="text-[11px] font-black uppercase tracking-widest">Enter any weight above</div>
          <div className="text-[10px] mt-1 text-slate-300">All units auto-convert in real time</div>
        </div>
      ) : (
        <>
          {/* Total valuation */}
          <div className="bg-[#E8F0FE] rounded-xl p-6 text-center space-y-1">
            <div className="text-[10px] font-black text-[#1A73E8] uppercase tracking-wider">Estimated Jewelry Valuation</div>
            <div className="text-4xl font-black text-[#1A73E8]">{fmt(result.total)}</div>
            <div className="text-[9px] font-bold text-[#5F6368] uppercase tracking-wider">
              {derived.grams}g • {derived.tola} Tola • {derived.lal} Lal • {derived.aana} Aana
            </div>
          </div>

          {/* Breakdown grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="border border-[#DADCE0] rounded-xl p-4 text-center bg-white">
              <div className="text-[9px] font-black text-[#202124] uppercase tracking-wider mb-1">Calculation Base Rate</div>
              <div className="text-base font-black text-[#202124]">{fmt(liveRate)}<span className="text-[9px] text-slate-400">/Tola</span></div>
            </div>
            <div className="border border-[#DADCE0] rounded-xl p-4 text-center bg-white">
              <div className="text-[9px] font-black text-[#D93025] uppercase tracking-wider mb-1">Crafting Cost</div>
              <div className="text-base font-black text-[#D93025]">{fmt(result.makingCost)}</div>
            </div>
            <div className="border border-[#DADCE0] rounded-xl p-4 text-center bg-white">
              <div className="text-[9px] font-black text-slate-500 uppercase tracking-wider mb-1">Metal Value</div>
              <div className="text-base font-black text-slate-800">{fmt(result.basePrice)}</div>
            </div>
            <div className="border border-[#DADCE0] rounded-xl p-4 text-center bg-white">
              <div className="text-[9px] font-black text-[#188038] uppercase tracking-wider mb-1">Metal Efficiency</div>
              <div className="text-base font-black text-[#188038]">{result.efficiency.toFixed(1)}%</div>
            </div>
          </div>

          {/* Metal retention bar */}
          <div className="border border-[#DADCE0] rounded-xl p-4 bg-[#F8F9FA]">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[9px] font-black text-[#5F6368] uppercase tracking-wider">Metal Retention Efficiency</span>
              <span className="text-[10px] font-black text-[#188038]">{result.efficiency.toFixed(1)}%</span>
            </div>
            <div className="h-2 w-full bg-white rounded-full overflow-hidden border border-[#DADCE0]">
              <div className="h-full bg-[#188038] transition-all duration-500" style={{ width: `${result.efficiency}%` }} />
            </div>
            <p className="text-[9px] text-slate-400 mt-2">
              Crafting (Jyala) in Nepal typically ranges 5–15%. A score above 85% means good value.
            </p>
          </div>

          {/* Pie Chart */}
          {result.total > 0 && (
            <div className="bg-white border border-[#DADCE0] rounded-xl p-4">
              <div className="text-[9px] font-black text-[#5F6368] uppercase tracking-widest mb-3">Valuation Breakdown</div>
              <div className="h-[160px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                    <Pie data={[{ name: 'Metal', value: result.basePrice }, { name: 'Crafting', value: result.makingCost }]}
                      cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={2} dataKey="value" stroke="none">
                      <Cell fill="#1A73E8" />
                      <Cell fill="#DADCE0" />
                    </Pie>
                    <Tooltip formatter={(v: number) => fmt(v)} contentStyle={{ borderRadius: '8px', fontSize: '10px', fontWeight: 'bold' }} />
                  </RePieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-4 text-[9px] font-bold text-[#5F6368] uppercase">
                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#1A73E8]" /> Metal</div>
                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#DADCE0]" /> Crafting</div>
              </div>
            </div>
          )}

          {/* Bringing gold to Nepal link */}
          <a href="/calculator/gold-tax/" className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors">
            <span className="text-lg">✈️</span>
            <div>
              <div className="text-[10px] font-black text-slate-700 uppercase tracking-wider">Bringing Gold into Nepal?</div>
              <div className="text-[9px] text-slate-500">Estimate customs duty with our Gold Tax Calculator →</div>
            </div>
          </a>
        </>
      )}
    </div>
  );

  if (isEmbed) {
    return (
      <div className="space-y-6">
        {inputsComponent}
        <div className="pt-6 border-t border-[#DADCE0]">
          {resultsComponent}
        </div>
      </div>
    );
  }

  return (
    <ModernCalcLayout
      slug="gold-converter"
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Nepal', href: '/nepal/' }, { label: 'Nepal Gold Unit Converter' }]}
      title="Nepal Gold Unit Converter"
      description="Bidirectional converter for Tola, Lal, Aana, Ratti & Gram. Calculate jewelry valuation with live FENEGOSIDA rates."
      icon={Landmark}
      inputs={inputsComponent}
      results={resultsComponent}
      details={
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Purity audit card */}
            <div className="bg-white border border-[#DADCE0] rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1.5 h-4 bg-amber-500 rounded-full" />
                <h2 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Understanding Nepal Gold Measurements</h2>
              </div>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-[#F8F9FA] border border-[#DADCE0] flex justify-between items-center">
                  <span className="text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">Active Standard</span>
                  <span className="text-sm font-black text-amber-600">{state.purity === 'tejabi' ? '22K Tejabi (91.6%)' : '24K Hallmark (99.9%)'}</span>
                </div>
                {hasInput && (
                  <>
                    <div className="p-3 rounded-lg bg-[#F8F9FA] border border-[#DADCE0] flex justify-between items-center">
                      <span className="text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">Metal Bullion Value</span>
                      <span className="text-sm font-black text-[#202124]">{fmt(result.basePrice)}</span>
                    </div>
                    <div className="p-3 rounded-lg bg-[#E8F0FE] border border-[#1A73E8] flex justify-between items-center">
                      <span className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider">Grand Total</span>
                      <span className="text-sm font-black text-[#1A73E8]">{fmt(result.total)}</span>
                    </div>
                  </>
                )}
                <div className="mt-4 pt-4 border-t border-[#DADCE0] text-[11px] text-slate-500 leading-relaxed">
                  Understanding the structural purity and weight measurements of precious metals is crucial for both buyers and sellers in the domestic market. Before evaluating jewelry pieces, it is important to factor in extra costs that may arise during transactions. This involves recognizing the difference between Hallmark and Tejabi standards, checking the daily benchmark rate, and estimating potential duties if you are bringing items from abroad. For accurate estimation of import duties, VAT, and making charges associated with foreign or domestic purchases, you can utilize our <a href="/calculator/gold-tax/" className="text-amber-600 font-bold hover:underline">Gold Tax Calculator</a> to determine your exact financial obligations.
                </div>
              </div>
            </div>

            {/* Quick reference card */}
            <div className="bg-white border border-[#DADCE0] rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1.5 h-4 bg-amber-500 rounded-full" />
                <h2 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Nepal Gold Conversion Table</h2>
              </div>
              <div className="space-y-2 text-[11px] text-slate-600 font-medium">
                <div className="flex justify-between border-b border-slate-100 pb-1"><span>1 Tola</span><span className="font-black text-slate-800">= 11.6638 g = 100 Lal = 16 Aana</span></div>
                <div className="flex justify-between border-b border-slate-100 pb-1"><span>1 Aana</span><span className="font-black text-slate-800">= 6.25 Lal = 0.7290 g</span></div>
                <div className="flex justify-between border-b border-slate-100 pb-1"><span>1 Lal</span><span className="font-black text-slate-800">= 0.116638 g = 0.01 Tola</span></div>
                <div className="flex justify-between border-b border-slate-100 pb-1"><span>1 Gram</span><span className="font-black text-slate-800">= 8.5735 Lal = 0.0857 Tola</span></div>
                <div className="flex justify-between"><span>1 Ratti</span><span className="font-black text-slate-800">≈ 0.0972 g</span></div>
              </div>
            </div>
          </div>

          {/* Authority + links */}
          <div className="bg-slate-900 rounded-xl p-6 text-white mb-6">
            <h2 className="text-[11px] font-black text-slate-300 uppercase tracking-widest mb-3">🏛️ Official Nepal Gold Measurement Standard</h2>
            <div className="text-[12px] text-slate-300 leading-relaxed mb-6 space-y-4">
              <p>
                In the highly dynamic and ever-changing landscape of precious metal trading within Nepal, staying informed about the daily benchmark prices is absolutely essential for making sound financial decisions. The domestic market pricing structure for precious metals depends heavily on various global macroeconomic indicators, international supply chains, currency exchange rate fluctuations, and local seasonal demand spikes. Whether you are an individual retail consumer planning a purchase for an upcoming cultural event, or a commercial entity managing significant bullion reserves, obtaining the most accurate, real-time market updates is critical. To ensure you have access to the exact current figures driving the local trade, always check the <a href="/market-rates/live-gold-price/" className="text-amber-400 underline hover:text-amber-300 font-bold">Live Gold Price Today</a> before initiating any transaction.
              </p>
              <p>
                Our conversion engine is permanently calibrated to the statutory benchmarks maintained by the{' '}
                <a href="https://www.fenegosida.org/" target="_blank" rel="nofollow noopener" className="text-amber-400 underline hover:text-amber-300">
                  FENEGOSIDA Official Portal
                </a>, which serves as the primary governing body for daily rate announcements in the country. This guarantees that every calculation you perform aligns perfectly with the standard retail rates applied by authorized jewelers nationwide. Furthermore, to provide comprehensive consumer protection and structural accuracy, these measurements are strictly aligned with the overarching metrology and standardization guidelines enforced by the{' '}
                <a href="http://www.nbsm.gov.np/" target="_blank" rel="nofollow noopener" className="text-amber-400 underline hover:text-amber-300">
                  Nepal Bureau of Standards & Metrology (NBSM)
                </a>.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <a href="https://www.fenegosida.org/" target="_blank" rel="nofollow noopener" className="flex items-center gap-2 p-3 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors">
                <ExternalLink className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <div>
                  <div className="text-[9px] font-black text-amber-400 uppercase tracking-wider">FENEGOSIDA</div>
                  <div className="text-[9px] text-slate-400">Daily Gold Rate Authority</div>
                </div>
              </a>
              <a href="http://www.nbsm.gov.np/" target="_blank" rel="nofollow noopener" className="flex items-center gap-2 p-3 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors">
                <ExternalLink className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <div>
                  <div className="text-[9px] font-black text-amber-400 uppercase tracking-wider">NBSM Nepal</div>
                  <div className="text-[9px] text-slate-400">Statutory Metrology Laws</div>
                </div>
              </a>
            </div>
          </div>

          {/* SEO Content Section */}
          <div className="bg-white border border-[#DADCE0] rounded-xl p-6 shadow-sm">
            <h2 className="text-[13px] font-black text-[#202124] uppercase tracking-widest mb-4">Who Uses This Converter?</h2>
            <p className="text-[12px] text-slate-600 mb-6 leading-relaxed">
              This Nepal Gold Unit Converter is useful for jewellery buyers, gold investors, jewellers, pawn shops, students, and anyone needing to convert between traditional Nepal gold units and metric measurements. Whether you are auditing family heirlooms or checking retail invoices, this tool provides exact mathematical clarity. For those interested in understanding the broader economic factors, including inflation rates, global supply constraints, and Rastra Bank policies that influence these domestic valuations throughout the year, explore our comprehensive <a href="/blog/nepal-gold-price-analysis-2083/" className="text-blue-600 font-bold hover:underline">Nepal Gold Price Analysis 2083</a>.
            </p>

            <h2 className="text-[13px] font-black text-[#202124] uppercase tracking-widest mb-4">Popular Nepal Gold Conversions</h2>
            <ul className="text-[12px] text-slate-600 space-y-2 mb-6 bg-[#F8F9FA] p-4 rounded-lg border border-[#DADCE0]">
              <li>1 Tola = 100 Lal = 16 Aana = 11.6638 g</li>
              <li>50 Lal = 0.5 Tola = 5.8319 g</li>
              <li>40 Lal = 4.6655 g</li>
              <li>25 Lal = 2.9159 g</li>
              <li>15 Lal = 1.7496 g</li>
              <li>1 Gram = 8.5735 Lal</li>
              <li>1 Lal = 0.116638 g</li>
            </ul>

            <h2 className="text-[13px] font-black text-[#202124] uppercase tracking-widest mb-4">Common Nepal Gold Weight Conversions</h2>
            <ul className="text-[12px] text-slate-600 grid grid-cols-2 gap-2 mb-6">
              <li>• Tola to Lal</li>
              <li>• Lal to Tola</li>
              <li>• Gram to Lal</li>
              <li>• Lal to Gram</li>
              <li>• Gram to Aana</li>
              <li>• Aana to Gram</li>
              <li>• Tola to Gram</li>
              <li>• Gram to Tola</li>
            </ul>
            <p className="text-[12px] text-slate-600 leading-relaxed border-t border-[#DADCE0] pt-6">
              While gold remains the most frequently converted and analyzed precious metal due to its high value and cultural significance, silver (Chandi) also plays a monumental role in the Nepalese market. Silver is widely used for crafting traditional utensils, religious idols, anklets (payal), and various other ornamental artifacts. Because the unit system for silver is identical to gold (utilizing Tolas and Grams), this converter is fully capable of handling silver weight conversions as well. If you are actively trading or planning to purchase silver items, we strongly recommend checking the <a href="/market-rates/live-silver-price/" className="text-blue-600 font-bold hover:underline">Live Silver Price Today</a> to ensure you receive the most accurate valuation based on the current market benchmarks.
            </p>
          </div>
        </div>
      }
      howToUse={{
        steps: [
          "Enter any weight in Tola, Lal, Aana, or Gram — all other fields auto-convert instantly.",
          "Select your gold standard: 24K Hallmark (99.9% purity) or 22K Tejabi (91.6% purity).",
          "The live rate syncs automatically from FENEGOSIDA daily benchmarks.",
          "Add your jeweler's crafting charge (Jyala) as a fixed Rs. amount or a percentage.",
          "Review the Metal Retention Efficiency score to evaluate the value of your ornament."
        ]
      }}
      formula={{
        title: "Precious Metal Valuation Calculus",
        description: "Official industrial algorithm used by jewelry associations in Nepal.",
        raw: "Total = (Grams ÷ 11.6638) × Rate/Tola + Crafting Charge",
        variables: [
          "1 Tola = 11.6638 grams = 100 Lal = 16 Aana",
          "1 Lal = 0.116638 g | 1 Gram = 8.5735 Lal",
          "Hallmark: 24K (99.9%) | Tejabi: 22K (91.6%)"
        ]
      }}
      faqs={[
        { question: "How many grams are in 1 Tola of gold in Nepal?", answer: "One Tola of gold equals 11.6638 grams according to the official Nepal gold measurement system. One Tola is also equal to 100 Lal or 16 Aana." },
        { question: "How many Lal (Laal) are in 1 Tola?", answer: "One Tola contains exactly 100 Lal (Laal). This is the standard conversion used by jewellery shops and the Federation of Nepal Gold and Silver Dealers' Association (FENEGOSIDA)." },
        { question: "How many Aana are in 1 Tola?", answer: "One Tola equals 16 Aana. Each Aana is equal to 6.25 Lal or approximately 0.729 grams." },
        { question: "How do I convert Gram to Lal?", answer: "Divide the weight in grams by 0.116638. Example: 1 gram = 8.5735 Lal, 5 grams = 42.87 Lal, 10 grams = 85.74 Lal. The Nepal Gold Unit Converter performs this calculation automatically." },
        { question: "How do I convert Lal to Gram?", answer: "Multiply the total Lal by 0.116638. Example: 15 Lal = 1.7496 grams, 20 Lal = 2.3328 grams, 25 Lal = 2.9159 grams, 40 Lal = 4.6655 grams, 50 Lal = 5.8319 grams." },
        { question: "How many grams is 15 Lal?", answer: "15 Lal = 1.7496 grams, which is 0.15 Tola." },
        { question: "How many grams is 20 Lal?", answer: "20 Lal = 2.3328 grams, or 0.20 Tola." },
        { question: "How many grams is 25 Lal?", answer: "25 Lal = 2.9159 grams, or 0.25 Tola." },
        { question: "How many grams is 40 Lal?", answer: "40 Lal = 4.6655 grams, which equals 0.40 Tola." },
        { question: "How many grams is 50 Lal?", answer: "50 Lal = 5.8319 grams, which is exactly half a Tola (0.5 Tola)." },
        { question: "What is Lal in Nepal?", answer: "Lal (लाल) is a traditional gold weight unit used in Nepal. 100 Lal = 1 Tola, 1 Lal = 0.116638 grams. Jewellers commonly use Lal when measuring smaller ornaments." },
        { question: "What is Aana in Nepal gold measurement?", answer: "Aana (आना) is another traditional Nepali gold weight unit. 16 Aana = 1 Tola, 1 Aana = 6.25 Lal, 1 Aana = 0.729 grams." },
        { question: "What is the difference between Hallmark and Tejabi gold?", answer: "Hallmark gold is certified for purity and generally refers to 24K (99.9%) or other certified purity levels. Tejabi gold is traditionally 22K (91.6%) and is commonly used for jewellery because it is more durable than pure 24K gold." },
        { question: "How many Lal are in 1 Gram?", answer: "One Gram equals approximately 8.5735 Lal. You can convert Gram to Lal instantly using the Nepal Gold Unit Converter, which uses the official conversion factor based on 1 Tola = 11.6638 grams = 100 Lal." },
        { question: "Who sets gold rates in Nepal?", answer: "Daily gold prices in Nepal are published by the Federation of Nepal Gold and Silver Dealers' Association (FENEGOSIDA). The Nepal Gold Unit Converter uses the official Nepal gold measurement system for accurate weight conversions, while current market prices should always be verified using the latest FENEGOSIDA rate." }
      ]}
      sidebar={{
        title: "Market Suite",
        subtitle: "Related Tools",
        links: [
          { label: "Live Gold Price", href: "/market-rates/live-gold-price/", icon: History },
          { label: "Gold Tax Calculator", href: "/calculator/gold-tax/", icon: Wallet },
          { label: "Currency Converter", href: "/calculator/currency-converter/", icon: Globe },
          { label: "FENEGOSIDA (Official)", href: "https://www.fenegosida.org/", icon: ExternalLink },
        ],
      }}
      relatedTools={[
        { label: "Live Gold Price Today", href: "/market-rates/live-gold-price/" },
        { label: "Gold Tax Calculator", href: "/calculator/gold-tax/" },
        { label: "Nepal Income Tax", href: "/calculator/nepal-income-tax/" },
        { label: "Currency Converter", href: "/calculator/currency-converter/" }
      ]}
    />
  );
}
