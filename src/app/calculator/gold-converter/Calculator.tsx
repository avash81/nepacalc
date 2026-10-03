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

const TOLA_GRAMS  = 11.6641;   // official FENEGOSIDA standard
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
  purity: 'hallmark', chargeType: 'fixed', chargeValue: '0'
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
            { label: 'Tola (तोला)', val: state.tola, fn: handleTola, hint: '1 Tola = 11.664g' },
            { label: 'Lal (लाल)', val: state.lal, fn: handleLal, hint: '100 Lal = 1 Tola' },
            { label: 'Aana (आना)', val: state.aana, fn: handleAana, hint: '16 Aana = 1 Tola' },
            { label: 'Gram (ग्राम)', val: state.gram, fn: handleGram, hint: '11.664g = 1 Tola' },
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
                onWheel={(e) => (e.target as HTMLInputElement).blur()}
                className="w-full h-11 px-3 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-amber-400 outline-none transition-all placeholder:text-slate-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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
            onWheel={(e) => (e.target as HTMLInputElement).blur()}
            className="w-2/3 h-11 px-3 bg-white border border-[#DADCE0] rounded-md text-sm font-bold text-[#202124] focus:border-amber-400 outline-none transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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
        className="w-full h-9 bg-slate-100 hover:bg-slate-200 text-slate-500 text-[10px] font-bold uppercase tracking-widest rounded-md transition-colors"
      >
        Reset
      </button>
    </div>
  );

  // ─── RESULTS ─────────────────────────────────────────────────────────────────
  const resultsComponent = (
    <div className="space-y-4 h-full flex flex-col justify-center">
      {!hasInput ? (
        <div className="text-center py-12 text-slate-300">
          <div className="text-5xl mb-3"></div>
          <div className="text-[11px] font-black uppercase tracking-widest">Enter any weight above</div>
          <div className="text-[10px] mt-1 text-slate-300">All units auto-convert in real time</div>
        </div>
      ) : (
        <>
          {/* Total valuation */}
          <div className="bg-[#E8F0FE] rounded-xl p-5 text-center space-y-1">
            <div className="text-[10px] font-black text-[#1A73E8] uppercase tracking-wider">Estimated Jewelry Valuation</div>
            <div className="text-4xl font-black text-[#1A73E8]">{fmt(result.total)}</div>
            <div className="text-[9px] font-bold text-[#5F6368] uppercase tracking-wider">
              {derived.grams}g • {derived.tola} Tola • {derived.lal} Lal • {derived.aana} Aana
            </div>
          </div>

          {/* Unified Breakdown */}
          <div className="bg-white border border-[#DADCE0] rounded-xl overflow-hidden shadow-sm">
            <div className="grid grid-cols-2 divide-x divide-[#DADCE0] border-b border-[#DADCE0]">
              <div className="p-3 text-center">
                <div className="text-[9px] font-black text-[#202124] uppercase tracking-wider mb-0.5">Calculation Base Rate</div>
                <div className="text-sm font-black text-[#202124]">{fmt(liveRate)}<span className="text-[8px] text-slate-400 ml-1">/Tola</span></div>
              </div>
              <div className="p-3 text-center">
                <div className="text-[9px] font-black text-slate-500 uppercase tracking-wider mb-0.5">Metal Value</div>
                <div className="text-sm font-black text-slate-800">{fmt(result.basePrice)}</div>
              </div>
            </div>
            <div className="p-3 bg-[#F8F9FA]">
              <div className="flex justify-between items-end mb-1.5">
                <div className="text-[9px] font-black text-[#5F6368] uppercase tracking-widest">Valuation Breakdown</div>
                <div className="text-[9px] font-bold text-[#D93025]">Crafting: {fmt(result.makingCost)}</div>
              </div>
              <div className="h-3 w-full bg-[#E8EAED] rounded-full overflow-hidden flex shadow-inner">
                <div className="h-full bg-[#1A73E8] transition-all duration-500" style={{ width: `${result.total > 0 ? (result.basePrice/result.total)*100 : 100}%` }} />
                <div className="h-full bg-[#D93025] transition-all duration-500" style={{ width: `${result.total > 0 ? (result.makingCost/result.total)*100 : 0}%` }} />
              </div>
              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#1A73E8]" />
                  <span className="text-[9px] font-black text-[#5F6368] uppercase">Metal ({result.total > 0 ? (result.basePrice/result.total*100).toFixed(1) : '100.0'}%)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#D93025]" />
                  <span className="text-[9px] font-black text-[#5F6368] uppercase">Crafting ({result.total > 0 ? (result.makingCost/result.total*100).toFixed(1) : '0.0'}%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Metal retention bar */}
          <div className="border border-[#DADCE0] rounded-xl p-3 bg-white shadow-sm">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[9px] font-black text-[#5F6368] uppercase tracking-wider">Metal Retention Efficiency</span>
              <span className="text-[10px] font-black text-[#188038]">{result.efficiency.toFixed(1)}%</span>
            </div>
            <div className="h-1.5 w-full bg-[#E8EAED] rounded-full overflow-hidden">
              <div className="h-full bg-[#188038] transition-all duration-500" style={{ width: `${result.efficiency}%` }} />
            </div>
            <p className="text-[8px] text-slate-400 mt-1.5 leading-tight">
              Crafting (Jyala) typically ranges 5–15%. Score &gt; 85% means good value.
            </p>
          </div>
        </>
      )}
    </div>
  );

  const resultsBottomComponent = (
    <a href="/calculator/gold-tax/" className="flex items-center gap-2 p-3 bg-white border border-[#DADCE0] rounded-md hover:bg-slate-50 transition-colors shadow-sm">
      <span className="text-lg">✈️</span>
      <div>
        <div className="text-[10px] font-black text-[#202124] uppercase tracking-wider">Bringing Gold into Nepal?</div>
        <div className="text-[9px] text-[#5F6368]">Estimate customs duty with our Gold Tax Calculator →</div>
      </div>
    </a>
  );

  if (isEmbed) {
    return (
      <div className="space-y-6">
        {inputsComponent}
        <div className="pt-6 border-t border-[#DADCE0]">
          {resultsComponent}
          <div className="mt-4">{resultsBottomComponent}</div>
        </div>
      </div>
    );
  }

  return (
    <ModernCalcLayout
      slug="gold-converter"
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Nepal', href: '/nepal/' }, { label: 'Nepal Gold Unit Converter' }]}
      title="Nepal Gold Unit Converter"
      titleClassName="text-[16px] font-bold text-[#202124] tracking-tight mb-1"
      description="Bidirectional converter for Tola, Lal, Aana, Ratti & Gram. Calculate jewelry valuation with live FENEGOSIDA rates."
      icon={Landmark}
      compactHeader={true}
      inputs={inputsComponent}
      results={resultsComponent}
      resultsBottom={resultsBottomComponent}
    />
  );
}


