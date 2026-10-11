'use client';

import { useMemo } from 'react';
import { useSyncState } from '@/hooks/useSyncState';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { PaintBucket } from 'lucide-react';
import Link from 'next/link';

type Mode = 'quick' | 'wall' | 'room' | 'ceiling' | 'cost';

function CompactField({
  id,
  label,
  unit,
  value,
  onChange,
  min = 0,
  hint,
}: {
  id: string;
  label: string;
  unit?: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  hint?: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-0.5">
        <label htmlFor={id} className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider block">
          {label}
        </label>
        {unit && <span className="text-[10px] text-[#9AA0A6]">({unit})</span>}
      </div>
      <input
        id={id}
        type="number"
        min={min}
        value={value}
        onChange={e => onChange(Math.max(min, Number(e.target.value) || 0))}
        className="w-full h-9 px-3 bg-white border border-[#DADCE0] rounded-lg text-sm font-bold text-[#202124] focus:border-[#1967D2] focus:ring-1 focus:ring-[#1967D2] outline-none"
      />
      {hint && <p className="text-[10px] text-[#9AA0A6] mt-0.5">{hint}</p>}
    </div>
  );
}

function StatRow({
  label,
  value,
  sub,
  highlight,
}: {
  label: string;
  value: string;
  sub?: string;
  highlight?: boolean;
}) {
  return (
    <div className={`flex items-center justify-between px-3.5 py-2 ${highlight ? 'bg-[#E8F0FE]' : 'hover:bg-slate-50'}`}>
      <div>
        <span className={`text-xs sm:text-sm font-semibold ${highlight ? 'text-[#1967D2] font-black' : 'text-[#202124]'}`}>
          {label}
        </span>
        {sub && <p className="text-[10px] text-[#9AA0A6]">{sub}</p>}
      </div>
      <span className={`text-xs sm:text-sm font-black text-right ${highlight ? 'text-[#1967D2] text-base' : 'text-[#202124]'}`}>
        {value}
      </span>
    </div>
  );
}

export default function PaintCalculator() {
  const [mode, setMode] = useSyncState<Mode>('pnt_v5_mode', 'room');

  // Quick area mode
  const [quickArea, setQuickArea] = useSyncState('pnt_v5_qa', 500);

  // Wall mode
  const [wLen, setWLen] = useSyncState('pnt_v5_wl', 12);
  const [wHt, setWHt] = useSyncState('pnt_v5_wh', 9);
  const [nWalls, setNWalls] = useSyncState('pnt_v5_nw', 4);
  const [wDoors, setWDoors] = useSyncState('pnt_v5_wd', 1);
  const [wWins, setWWins] = useSyncState('pnt_v5_ww', 2);

  // Room mode
  const [rLen, setRLen] = useSyncState('pnt_v5_rl', 15);
  const [rWid, setRWid] = useSyncState('pnt_v5_rw', 12);
  const [rHt, setRHt] = useSyncState('pnt_v5_rh', 9);
  const [rDoors, setRDoors] = useSyncState('pnt_v5_rd', 1);
  const [rWins, setRWins] = useSyncState('pnt_v5_rwin', 2);
  const [inclCeil, setInclCeil] = useSyncState('pnt_v5_ic', false);

  // Ceiling mode
  const [cLen, setCLen] = useSyncState('pnt_v5_cl', 15);
  const [cWid, setCWid] = useSyncState('pnt_v5_cw', 12);

  // Shared paint settings
  const [coats, setCoats] = useSyncState('pnt_v5_coats', 2);
  const [coverage, setCoverage] = useSyncState('pnt_v5_cov', 100);
  const [price, setPrice] = useSyncState('pnt_v5_pr', 450);

  // Cost mode extras
  const [addPrimer, setAddPrimer] = useSyncState('pnt_v5_ap', false);
  const [pCov, setPCov] = useSyncState('pnt_v5_pcov', 80);
  const [pPrice, setPPrice] = useSyncState('pnt_v5_ppr', 300);
  const [addLabour, setAddLabour] = useSyncState('pnt_v5_al', false);
  const [labRate, setLabRate] = useSyncState('pnt_v5_lr', 20);

  // Paintable area calculation
  const paintableArea = useMemo(() => {
    const doorArea = 21;
    const winArea = 15;
    if (mode === 'quick') return Math.max(0, quickArea);
    if (mode === 'wall') return Math.max(0, wLen * wHt * nWalls - wDoors * doorArea - wWins * winArea);
    if (mode === 'ceiling') return Math.max(0, cLen * cWid);
    const wallNet = Math.max(0, 2 * (rLen + rWid) * rHt - rDoors * doorArea - rWins * winArea);
    return wallNet + (inclCeil ? rLen * rWid : 0);
  }, [mode, quickArea, wLen, wHt, nWalls, wDoors, wWins, rLen, rWid, rHt, rDoors, rWins, inclCeil, cLen, cWid]);

  // Derived calculation results
  const calc = useMemo(() => {
    const area = Math.round(paintableArea);
    const exact = coverage > 0 ? (area * coats) / coverage : 0;
    const litres = Math.ceil(exact);
    const paintCost = litres * price;
    const primerL = addPrimer && pCov > 0 ? Math.ceil(area / pCov) : 0;
    const primerCost = primerL * pPrice;
    const labCost = addLabour ? Math.round(area * labRate) : 0;
    return {
      area,
      exact: exact.toFixed(1),
      litres,
      paintCost,
      primerL,
      primerCost,
      labCost,
      total: paintCost + primerCost + labCost,
    };
  }, [paintableArea, coats, coverage, price, addPrimer, pCov, pPrice, addLabour, labRate]);

  const MODES: { id: Mode; label: string }[] = [
    { id: 'quick', label: 'Quick' },
    { id: 'wall', label: 'One Wall' },
    { id: 'room', label: 'Room' },
    { id: 'ceiling', label: 'Ceiling' },
    { id: 'cost', label: 'Full Cost' },
  ];

  return (
    <ModernCalcLayout
      slug="paint-cost"
      crumbs={[
        { label: 'Home', href: '/' },
        { label: 'Calculators', href: '/calculator/' },
        { label: 'Paint Calculator' },
      ]}
      title="Calculate Paint Quantity and Painting Cost"
      description="Estimate paint quantity, coverage, and total painting costs in Nepal for a single wall, room, or ceiling. Calculate litres, coats, and NPR budget."
      icon={PaintBucket}
      faqLayout="static"
      inputs={
        <div className="flex flex-col justify-between h-full space-y-3">
          <div className="space-y-3">
            {/* Mode Selector Tabs */}
          <div>
            <div className="grid grid-cols-5 gap-1 bg-[#F1F3F4] p-1 rounded-lg">
              {MODES.map(m => (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id)}
                  className={`py-1 text-[11px] font-bold rounded-md transition-all text-center ${
                    mode === m.id ? 'bg-white text-[#202124] shadow-xs' : 'text-[#5F6368] hover:text-[#202124]'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Mode */}
          {mode === 'quick' && (
            <CompactField
              id="qa"
              label="Total Paintable Area"
              unit="sq ft"
              value={quickArea}
              onChange={setQuickArea}
              min={1}
              hint="Net wall area after subtracting doors and windows."
            />
          )}

          {/* One Wall Mode */}
          {mode === 'wall' && (
            <div className="space-y-2.5">
              <div className="grid grid-cols-3 gap-2">
                <CompactField id="wl" label="Length" unit="ft" value={wLen} onChange={setWLen} min={1} />
                <CompactField id="wh" label="Height" unit="ft" value={wHt} onChange={setWHt} min={1} />
                <CompactField id="nw" label="Walls" value={nWalls} onChange={setNWalls} min={1} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <CompactField id="wd" label="Doors" value={wDoors} onChange={setWDoors} min={0} hint="~21 sq ft each" />
                <CompactField id="ww" label="Windows" value={wWins} onChange={setWWins} min={0} hint="~15 sq ft each" />
              </div>
            </div>
          )}

          {/* Room Mode & Full Cost Mode */}
          {(mode === 'room' || mode === 'cost') && (
            <div className="space-y-2.5">
              <div className="grid grid-cols-3 gap-2">
                <CompactField id="rl" label="Length" unit="ft" value={rLen} onChange={setRLen} min={1} />
                <CompactField id="rw" label="Width" unit="ft" value={rWid} onChange={setRWid} min={1} />
                <CompactField id="rh" label="Height" unit="ft" value={rHt} onChange={setRHt} min={1} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <CompactField id="rd" label="Doors" value={rDoors} onChange={setRDoors} min={0} hint="~21 sq ft each" />
                <CompactField id="rw2" label="Windows" value={rWins} onChange={setRWins} min={0} hint="~15 sq ft each" />
              </div>
              <label className="flex items-center gap-2 cursor-pointer pt-0.5">
                <input
                  type="checkbox"
                  checked={inclCeil}
                  onChange={e => setInclCeil(e.target.checked)}
                  className="w-3.5 h-3.5 rounded border-[#DADCE0] text-[#1967D2] cursor-pointer"
                />
                <span className="text-xs font-semibold text-[#202124]">Include ceiling area</span>
              </label>
            </div>
          )}

          {/* Ceiling Mode */}
          {mode === 'ceiling' && (
            <div className="grid grid-cols-2 gap-2">
              <CompactField id="cl" label="Room Length" unit="ft" value={cLen} onChange={setCLen} min={1} />
              <CompactField id="cw" label="Room Width" unit="ft" value={cWid} onChange={setCWid} min={1} />
            </div>
          )}

          {/* Cost Mode Extra Options */}
          {mode === 'cost' && (
            <div className="space-y-2 pt-1">
              <div className="border border-[#DADCE0] rounded-lg p-2.5 space-y-1.5">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={addPrimer}
                    onChange={e => setAddPrimer(e.target.checked)}
                    className="w-3.5 h-3.5 rounded border-[#DADCE0] text-[#1967D2] cursor-pointer"
                  />
                  <span className="text-xs font-semibold text-[#202124]">Add primer coat</span>
                </label>
                {addPrimer && (
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <CompactField id="pc" label="Primer Coverage" unit="sq ft/L" value={pCov} onChange={setPCov} min={10} hint="70-90 sq ft/L" />
                    <CompactField id="pp" label="Primer Price" unit="NPR/L" value={pPrice} onChange={setPPrice} min={1} />
                  </div>
                )}
              </div>

              <div className="border border-[#DADCE0] rounded-lg p-2.5 space-y-1.5">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={addLabour}
                    onChange={e => setAddLabour(e.target.checked)}
                    className="w-3.5 h-3.5 rounded border-[#DADCE0] text-[#1967D2] cursor-pointer"
                  />
                  <span className="text-xs font-semibold text-[#202124]">Add labour charges</span>
                </label>
                {addLabour && (
                  <div className="pt-1">
                    <CompactField id="lr" label="Labour Rate" unit="NPR/sq ft" value={labRate} onChange={setLabRate} min={1} hint="Typical: NPR 15-30 per sq ft" />
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="border-t border-[#DADCE0] pt-2" />

          {/* Paint Settings */}
          <div className="space-y-2">
            <div>
              <label className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider block mb-1">
                Number of Coats
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {[1, 2, 3, 4].map(n => (
                  <button
                    key={n}
                    onClick={() => setCoats(n)}
                    className={`py-1 text-xs font-bold rounded-md border transition-all ${
                      coats === n ? 'bg-[#E8F0FE] border-[#1967D2] text-[#1967D2]' : 'bg-white border-[#DADCE0] text-[#5F6368] hover:bg-slate-50'
                    }`}
                  >
                    {n} coat{n > 1 ? 's' : ''}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <CompactField
                id="cov"
                label="Coverage"
                unit="sq ft/L"
                value={coverage}
                onChange={setCoverage}
                min={10}
                hint="Smooth: 100-120. Rough: 70-90."
              />
              <CompactField
                id="pr"
                label="Paint Price"
                unit="NPR/L"
                value={price}
                onChange={setPrice}
                min={1}
                hint="Price per litre in NPR."
              />
            </div>
          </div>
        </div>

          <div className="pt-2 border-t border-[#F1F3F4]">
            <p className="text-[11px] text-[#9AA0A6] leading-relaxed px-0.5 m-0">
              Estimates only. Actual paint quantity varies with surface texture, product, and application method. Always check the coverage rate on your paint can.
            </p>
          </div>
        </div>
      }
      results={
        <div className="space-y-2.5">
          {/* Main Result Card */}
          <div className="bg-[#E8F0FE] border border-[#1967D2]/30 rounded-xl p-3 sm:p-3.5 text-center" aria-live="polite">
            <div className="text-[11px] font-black text-[#1967D2] uppercase tracking-widest mb-0.5">Paint Required</div>
            <div className="text-4xl sm:text-5xl font-black text-[#202124] leading-none">{calc.litres}</div>
            <div className="text-sm font-bold text-[#5F6368] mt-1">litres</div>
            <div className="mt-1 text-xs text-[#5F6368]">{calc.exact} L exact (rounded up to nearest whole litre)</div>
          </div>

          {/* Area Breakdown Table */}
          <div className="bg-white border border-[#DADCE0] rounded-xl overflow-hidden">
            <div className="px-3.5 py-2 bg-[#F8F9FA] border-b border-[#DADCE0]">
              <span className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Area Breakdown</span>
            </div>
            <div className="divide-y divide-[#F1F3F4]">
              <StatRow label="Paintable Area" value={`${calc.area.toLocaleString()} sq ft`} />
              <StatRow label="Coats" value={`${coats}`} />
              <StatRow label="Total Coating Area" value={`${(calc.area * coats).toLocaleString()} sq ft`} sub="area × coats" />
              <StatRow label="Coverage Rate" value={`${coverage} sq ft/L`} />
            </div>
          </div>

          {/* Cost Breakdown Table */}
          <div className="bg-white border border-[#DADCE0] rounded-xl overflow-hidden">
            <div className="px-3.5 py-2 bg-[#F8F9FA] border-b border-[#DADCE0]">
              <span className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Cost Breakdown (NPR)</span>
            </div>
            <div className="divide-y divide-[#F1F3F4]">
              <StatRow
                label={`Paint (${calc.litres} L)`}
                value={`NPR ${calc.paintCost.toLocaleString()}`}
                sub={`${calc.litres} L × NPR ${price}/L`}
              />
              {addPrimer && (
                <StatRow
                  label={`Primer (${calc.primerL} L)`}
                  value={`NPR ${calc.primerCost.toLocaleString()}`}
                  sub={`${calc.primerL} L × NPR ${pPrice}/L`}
                />
              )}
              {addLabour && (
                <StatRow
                  label="Labour"
                  value={`NPR ${calc.labCost.toLocaleString()}`}
                  sub={`${calc.area} sq ft × NPR ${labRate}/sq ft`}
                />
              )}
              <StatRow label="Total Estimate" value={`NPR ${calc.total.toLocaleString()}`} highlight />
            </div>
          </div>
        </div>
      }
      details={
        <div className="space-y-6">
          {/* Intro: Calculate Paint Required for Your Walls or Room */}
          <div className="bg-white border border-[#DADCE0] rounded-xl p-5 sm:p-7 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-black text-[#202124] mb-3">
              Calculate Paint Required for Your Walls or Room
            </h2>
            <p className="text-sm text-[#5F6368] leading-relaxed mb-2">
              Use this paint calculator to estimate how much paint you need for your walls or room. Enter your measurements, select the number of coats, and provide the paint coverage rate to calculate the estimated paint quantity in litres.
            </p>
            <p className="text-sm text-[#5F6368] leading-relaxed mb-2">
              For a single wall, enter its width and height. For a room, measure the walls you want to paint. If you also want to paint the ceiling, calculate its area separately. Subtract doors and windows that will not be painted, where applicable.
            </p>
            <p className="text-sm text-[#5F6368] leading-relaxed">
              The amount of paint you need depends on the paintable area, number of coats, paint coverage, and surface condition. Check the paint container or manufacturer&apos;s instructions for the recommended coverage rate.
            </p>
          </div>

          {/* Section: How Much Paint Do You Need? */}
          <div className="bg-white border border-[#DADCE0] rounded-xl p-5 sm:p-7 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-black text-[#202124] mb-4">
              How Much Paint Do You Need?
            </h2>
            <p className="text-sm text-[#5F6368] leading-relaxed mb-4">
              Paint quantity depends on the total paintable surface area, the number of coats, and the coverage rate of your specific paint product.
            </p>

            <div className="space-y-4">
              <div className="border-l-3 border-[#1967D2] pl-3.5 py-0.5">
                <h3 className="text-base font-bold text-[#202124] mb-1">How much paint for 100 sq. ft.?</h3>
                <p className="text-sm text-[#5F6368] leading-relaxed">
                  For a 100 sq ft wall, assuming the paint covers 100 sq ft per litre per coat, you need approximately 1 litre for one coat or 2 litres for two coats. This estimate excludes extra paint for touch-ups and wastage. Actual requirements depend on the paint product and the condition of the wall.
                </p>
              </div>

              <div className="border-l-3 border-[#1967D2] pl-3.5 py-0.5">
                <h3 className="text-base font-bold text-[#202124] mb-1">How much paint for 1,000 sq. ft.?</h3>
                <p className="text-sm text-[#5F6368] leading-relaxed">
                  Suppose you need to paint 1,000 square feet of wall area, the paint covers 100 square feet per litre per coat, and you plan to apply two coats.
                  <br />
                  <strong>Paint required = 1,000 × 2 ÷ 100 = 20 litres</strong>
                  <br />
                  This is the estimated quantity before any extra allowance for waste, touch-ups, or package-size rounding. The actual amount may vary with the paint product and surface condition.
                </p>
              </div>

              <div className="border-l-3 border-[#1967D2] pl-3.5 py-0.5">
                <h3 className="text-base font-bold text-[#202124] mb-1">How much paint does 1 litre cover?</h3>
                <p className="text-sm text-[#5F6368] leading-relaxed">
                  One litre of paint can cover approximately 100-120 square feet of a smooth wall with one coat, depending on the paint product and surface condition. Actual coverage varies by manufacturer, paint type, surface texture, and application method, so always check the coverage rate on the paint container or technical data sheet. Rough, porous, or unprimed surfaces may require more paint than smooth, prepared walls. Exterior masonry paint and specialist finishes can also have different coverage rates.
                </p>
              </div>
            </div>
          </div>

          {/* Section: How Much Area Does 1 Litre of Paint Cover? & Formula */}
          <div className="bg-white border border-[#DADCE0] rounded-xl p-5 sm:p-7 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-black text-[#202124] mb-4">
              How Much Area Does 1 Litre of Paint Cover?
            </h2>
            <p className="text-sm text-[#5F6368] leading-relaxed mb-4">
              One litre of paint can cover approximately 100-120 square feet of a smooth wall with one coat, depending on the paint product and surface condition. Actual coverage varies by manufacturer, paint type, surface texture, and application method, so always check the coverage rate on the paint container or refer to official manufacturer resources such as Dulux&apos;s{' '}
              <a
                href="https://www.dulux.com.au/services/paint-calculator/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1967D2] font-semibold hover:underline"
              >
                paint coverage and calculation guidance
              </a>
              .
            </p>
            <p className="text-sm text-[#5F6368] leading-relaxed mb-6">
              Rough, porous, or unprimed surfaces may require more paint than smooth, prepared walls. Exterior masonry paint and specialist finishes can also have different coverage rates.
            </p>

            <h3 className="text-lg font-bold text-[#202124] mb-2">How to Calculate Paint Coverage in Litres</h3>
            <p className="text-sm text-[#5F6368] leading-relaxed mb-3">
              Use this formula to estimate the amount of paint required:
            </p>
            <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-lg p-3.5 font-mono text-xs sm:text-sm text-[#202124] mb-4">
              <strong>Paint required (litres) = Paintable area (sq. ft.) × Number of coats ÷ Coverage per litre (sq. ft.)</strong>
            </div>

            <p className="text-sm text-[#5F6368] font-semibold mb-2">To calculate the paintable area:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-sm text-[#5F6368] leading-relaxed mb-6">
              <li>Measure the width and height of each wall.</li>
              <li>Multiply the width by the height to calculate each wall&apos;s area.</li>
              <li>Add the areas of the walls you plan to paint.</li>
              <li>Subtract the areas of doors and windows that will not be painted.</li>
              <li>Multiply the remaining area by the number of coats.</li>
              <li>Divide by the paint&apos;s coverage rate per litre.</li>
            </ol>

            <h3 className="text-lg font-bold text-[#202124] mb-2">Example: How Much Paint Is Needed for 1,000 Square Feet?</h3>
            <p className="text-sm text-[#5F6368] leading-relaxed mb-4">
              Suppose you need to paint 1,000 square feet of wall area, the paint covers 100 square feet per litre per coat, and you plan to apply two coats:
            </p>
            <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-lg p-3 text-sm text-[#202124] mb-4">
              Paint required = 1,000 × 2 ÷ 100 = <strong>20 litres</strong>
            </div>
            <p className="text-sm text-[#5F6368] leading-relaxed mb-6">
              This is the estimated quantity before any extra allowance for waste, touch-ups, or package-size rounding. The actual amount may vary with the paint product and surface condition.
            </p>

            <div className="overflow-x-auto border border-[#DADCE0] rounded-xl">
              <table className="w-full text-sm">
                <thead className="bg-[#F8F9FA] border-b border-[#DADCE0]">
                  <tr>
                    <th className="px-4 py-2.5 text-left font-black text-[#202124] text-[11px] uppercase tracking-wider">Wall Area</th>
                    <th className="px-4 py-2.5 text-right font-black text-[#202124] text-[11px] uppercase tracking-wider">1 Coat (100 sq ft/L)</th>
                    <th className="px-4 py-2.5 text-right font-black text-[#202124] text-[11px] uppercase tracking-wider">2 Coats</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F3F4]">
                  {[
                    ['100 sq ft', '1 L', '2 L'],
                    ['200 sq ft', '2 L', '4 L'],
                    ['500 sq ft', '5 L', '10 L'],
                    ['1,000 sq ft', '10 L', '20 L'],
                    ['1,500 sq ft', '15 L', '30 L'],
                    ['2,000 sq ft', '20 L', '40 L'],
                  ].map(([a, c1, c2]) => (
                    <tr key={a} className="hover:bg-slate-50">
                      <td className="px-4 py-2 font-semibold text-[#202124]">{a}</td>
                      <td className="px-4 py-2 text-right text-[#5F6368]">{c1}</td>
                      <td className="px-4 py-2 text-right font-bold text-[#1967D2]">{c2}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section: How to Calculate Paint for a Wall, Room, or Ceiling */}
          <div className="bg-white border border-[#DADCE0] rounded-xl p-5 sm:p-7 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-black text-[#202124] mb-3">
              How to Calculate Paint for a Wall, Room, or Ceiling
            </h2>
            <p className="text-sm text-[#5F6368] leading-relaxed mb-5">
              To estimate how much paint you need, calculate the surface area you plan to paint, not just the floor area of the room. Measure the walls or ceiling, subtract any doors and windows you will not paint, and use the paint&apos;s stated coverage rate to estimate the required litres. If you need to calculate irregular wall dimensions or convert units between square feet and square meters, you can use our{' '}
              <Link href="/calculator/area-calculator/" className="text-[#1967D2] font-semibold hover:underline">
                Area Calculator
              </Link>{' '}
              to determine your total surface area first.
            </p>

            <div className="space-y-5">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#202124] mb-1.5">How Much Paint Do You Need for One Wall?</h3>
                <p className="text-sm text-[#5F6368] leading-relaxed mb-2">
                  For a single wall, multiply its width by its height to calculate the area:
                </p>
                <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-lg p-2.5 font-mono text-xs sm:text-sm text-[#202124] mb-2">
                  Wall area = Wall width × Wall height
                </div>
                <p className="text-sm text-[#5F6368] leading-relaxed">
                  For example, a wall that is 12 feet wide and 9 feet high has an area of 108 square feet. If a door or window will not be painted, subtract its area from 108 square feet before estimating the paint required. The amount of paint you need will depend on the product&apos;s coverage rate and the number of coats.
                </p>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#202124] mb-1.5">How to Calculate Paint for a Whole Room</h3>
                <p className="text-sm text-[#5F6368] leading-relaxed mb-2">
                  To calculate the area of four rectangular walls, add the room&apos;s length and width, then multiply the result by twice the wall height:
                </p>
                <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-lg p-2.5 font-mono text-xs sm:text-sm text-[#202124] mb-2">
                  Total wall area = 2 × (Room length + Room width) × Wall height
                </div>
                <p className="text-sm text-[#5F6368] leading-relaxed">
                  Next, subtract the area of any doors and windows that will not be painted. Multiply the remaining area by the number of coats, then divide by the paint&apos;s coverage per litre. Remember that a room&apos;s floor area is different from its total wall area. For a more useful estimate, measure the room dimensions and wall height.
                </p>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#202124] mb-1.5">How to Calculate Paint for a Ceiling</h3>
                <p className="text-sm text-[#5F6368] leading-relaxed mb-2">
                  For a rectangular ceiling, multiply the room&apos;s length by its width:
                </p>
                <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-lg p-2.5 font-mono text-xs sm:text-sm text-[#202124] mb-2">
                  Ceiling area = Room length × Room width
                </div>
                <p className="text-sm text-[#5F6368] leading-relaxed">
                  Use the ceiling area as the paintable surface area, then account for the number of coats and the coverage rate stated for your paint. Calculate the ceiling separately from the walls so you can estimate its paint requirement independently.
                </p>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#202124] mb-1.5">How Do You Calculate the Total Paint Required?</h3>
                <p className="text-sm text-[#5F6368] leading-relaxed mb-2">
                  Use this formula for walls or ceilings:
                </p>
                <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-lg p-2.5 font-mono text-xs sm:text-sm text-[#202124] mb-2">
                  Paint required (litres) = Net paintable area × Number of coats ÷ Coverage per litre
                </div>
                <p className="text-sm text-[#5F6368] leading-relaxed">
                  For example, if the net paintable area is 500 square feet, the paint covers 130 square feet per litre per coat, and you need two coats: 500 × 2 ÷ 130 = 7.69 litres. This is an estimate. The actual quantity depends on the paint product and surface, so check the coverage information on the paint container or technical data sheet.
                </p>
              </div>
            </div>
          </div>

          {/* Section: Paint Cost Calculator: Estimate Your Painting Cost */}
          <div className="bg-white border border-[#DADCE0] rounded-xl p-5 sm:p-7 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-black text-[#202124] mb-3">
              Paint Cost Calculator: Estimate Your Painting Cost
            </h2>
            <p className="text-sm text-[#5F6368] leading-relaxed mb-5">
              The cost of painting a room depends on how much paint you need, the price per litre, the number of coats, and whether you are doing the work yourself or hiring a painter. A paint cost calculator helps you estimate material expenses before buying paint or planning your project.
            </p>

            <div className="space-y-5">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#202124] mb-1.5">How to Calculate Paint Cost</h3>
                <p className="text-sm text-[#5F6368] leading-relaxed mb-2">
                  You can estimate the paint cost using this simple formula:
                </p>
                <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-lg p-2.5 font-mono text-xs sm:text-sm text-[#202124] mb-2">
                  Paint cost = Paint required in litres × Price per litre
                </div>
                <p className="text-sm text-[#5F6368] leading-relaxed">
                  For example, if your project requires 10 litres of paint, multiply 10 by the price per litre of the paint you plan to buy. This gives you the estimated paint cost before labour and other expenses.
                </p>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#202124] mb-2">What Affects the Total Painting Cost?</h3>
                <ul className="space-y-1.5 text-sm text-[#5F6368] list-disc pl-5">
                  <li><strong>Paint quantity:</strong> Larger paintable areas and additional coats generally require more paint.</li>
                  <li><strong>Paint type and price:</strong> Different products have different prices and coverage rates.</li>
                  <li><strong>Surface condition:</strong> Rough, porous, or poorly prepared surfaces may require more paint or preparation.</li>
                  <li><strong>Primer and additional materials:</strong> Include primer and putty if your project requires them.</li>
                  <li><strong>Labour charges:</strong> If you hire a painter, calculate labour separately from the paint cost.</li>
                  <li><strong>Walls and ceilings:</strong> Include each surface you intend to paint so your estimate reflects the full project.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#202124] mb-1.5">How to Estimate the Cost of Painting a Room</h3>
                <p className="text-sm text-[#5F6368] leading-relaxed mb-2">
                  First, calculate the net area of the walls and ceiling you plan to paint. Subtract doors and windows that will not be painted, then estimate the paint quantity based on the product&apos;s coverage rate and the number of coats.
                </p>
                <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-lg p-2.5 font-mono text-xs sm:text-sm text-[#202124] mb-2">
                  Estimated project cost = Paint cost + Other material costs + Labour cost
                </div>
                <p className="text-sm text-[#5F6368] leading-relaxed mb-4">
                  Use the paint cost calculator above to estimate your paint quantity and material cost. The result is an estimate rather than a final contractor quote. Actual costs depend on the paint product, surface preparation, labour arrangement, and project requirements.
                </p>

                <div className="overflow-x-auto border border-[#DADCE0] rounded-xl">
                  <table className="w-full text-sm">
                    <thead className="bg-[#F8F9FA] border-b border-[#DADCE0]">
                      <tr>
                        <th className="px-4 py-2.5 text-left font-black text-[#202124] text-[11px] uppercase tracking-wider">Cost Item</th>
                        <th className="px-4 py-2.5 text-right font-black text-[#202124] text-[11px] uppercase tracking-wider">Typical Range (Nepal)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F1F3F4]">
                      {[
                        ['Interior emulsion paint', 'NPR 350-700 per litre'],
                        ['Exterior weather coat', 'NPR 600-1,200 per litre'],
                        ['Primer', 'NPR 250-400 per litre'],
                        ['Labour (interior walls)', 'NPR 15-30 per sq ft'],
                        ['Putty / pari application', 'NPR 8-15 per sq ft'],
                      ].map(([i, r]) => (
                        <tr key={i} className="hover:bg-slate-50">
                          <td className="px-4 py-2 font-medium text-[#202124]">{i}</td>
                          <td className="px-4 py-2 text-right font-bold text-[#1967D2]">{r}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Paint Coverage by Type and Surface */}
          <div className="bg-white border border-[#DADCE0] rounded-xl p-5 sm:p-7 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-black text-[#202124] mb-3">
              Paint Coverage by Type and Surface
            </h2>
            <p className="text-sm text-[#5F6368] leading-relaxed mb-5">
              Paint coverage depends on the type of paint you use and the surface you are painting. Interior wall paint, gloss paint, exterior masonry paint, and primer can all have different coverage rates. For a reliable estimate, check the coverage per litre on the product label or technical data sheet.
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-[#202124] mb-1">Interior Paint Coverage Calculator</h3>
                <p className="text-sm text-[#5F6368] leading-relaxed">
                  For interior walls, calculate the paintable wall area, subtract doors and windows you will not paint, and enter the coverage rate for your chosen paint. Typical coverage ranges from approximately 100 to 120 sq ft per litre (8-14 m² per litre) for matt or emulsion paint, and 120-140 sq ft per litre for eggshell or satin finishes. Treat these as indicative ranges, not universal rates.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-[#202124] mb-1">Gloss Paint Coverage Calculator</h3>
                <p className="text-sm text-[#5F6368] leading-relaxed">
                  Gloss paint is commonly used on surfaces such as doors, trim, and metal. Your paint requirement depends on the product&apos;s stated coverage, the condition of the surface, and the number of coats. Gloss paint typically covers 90-110 sq ft per litre on smooth surfaces. Divide total area by coverage per litre and multiply by number of coats.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-[#202124] mb-1">Exterior and Masonry Paint Coverage Calculator</h3>
                <p className="text-sm text-[#5F6368] leading-relaxed">
                  Exterior masonry paint is used on suitable exterior surfaces such as rendered or masonry walls. Rough or porous surfaces can absorb more paint and reduce coverage compared with smooth, prepared surfaces. Indicative coverage ranges between 60 and 80 sq ft per litre (approximately 6-10 m² per litre). Actual coverage varies by product and wall condition.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-[#202124] mb-1.5">How Does Surface Condition Affect Paint Coverage?</h3>
                <ul className="space-y-1 text-sm text-[#5F6368] list-disc pl-5">
                  <li><strong>Smooth, prepared surfaces:</strong> May provide better coverage than rough or porous surfaces.</li>
                  <li><strong>Rough or porous surfaces:</strong> Can absorb more paint and require additional material.</li>
                  <li><strong>Unprimed surfaces:</strong> May need a suitable primer before the finish coats.</li>
                  <li><strong>Major colour changes:</strong> May require primer or additional coats to achieve an even finish.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-base font-bold text-[#202124] mb-1">Does the Number of Coats Change Paint Quantity?</h3>
                <p className="text-sm text-[#5F6368] leading-relaxed">
                  Yes. Each coat uses additional paint. If the area and coverage rate stay the same, two coats require approximately twice as much paint as one coat. Use this formula:
                  <br />
                  <strong>Paint required (litres) = Paintable area × Number of coats ÷ Coverage per litre</strong>
                </p>
              </div>
            </div>
          </div>

          {/* Related Calculators */}
          <div className="bg-white border border-[#DADCE0] rounded-xl p-5 sm:p-7 shadow-xs">
            <h2 className="text-xl font-black text-[#202124] mb-3">Related Calculators</h2>
            <ul className="text-sm text-[#5F6368] space-y-2">
              <li>
                <Link href="/calculator/brick-calculator/" className="text-[#1967D2] font-bold hover:underline">
                  Brick Calculator
                </Link>
                {' '}: Estimate the number of bricks and mortar needed for a wall.
              </li>
              <li>
                <Link href="/calculator/concrete-mix/" className="text-[#1967D2] font-bold hover:underline">
                  Concrete Mix Calculator
                </Link>
                {' '}: Calculate cement, sand, and aggregate volume ratios.
              </li>
              <li>
                <Link href="/calculator/area-calculator/" className="text-[#1967D2] font-bold hover:underline">
                  Area Calculator
                </Link>
                {' '}: Convert and calculate area between square feet, square meters, ropani, aana, and bigha.
              </li>
            </ul>
          </div>
        </div>
      }
      faqs={[
        {
          question: 'How can I calculate how much paint I need?',
          answer: (
            <div className="space-y-2.5">
              <p>Measure the surface you want to paint, subtract the area of doors and windows if they will not be painted, and multiply the result by the number of coats. Then divide by the paint&apos;s coverage per litre.</p>
              <p className="font-semibold text-[#202124]">Formula:</p>
              <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded px-3 py-2 font-mono text-xs text-[#202124] leading-relaxed">
                Paint required (litres) = Net paintable area (sq ft) × Number of coats ÷ Coverage (sq ft per litre per coat)
              </div>
              <p>Check the paint container or technical data sheet for its stated coverage rate.</p>
            </div>
          ),
        },
        {
          question: 'How much paint do I need for a 100 sq ft wall?',
          answer: (
            <div className="space-y-2.5">
              <p>For a 100 sq ft wall, assuming the paint covers 100 sq ft per litre per coat, you would need approximately <strong className="text-[#202124]">1 litre for one coat or 2 litres for two coats</strong>. This estimate excludes extra paint for touch-ups and wastage.</p>
              <p>Actual requirements depend on the paint product and the condition of the wall.</p>
            </div>
          ),
        },
        {
          question: 'How much paint do I need for 500 sq ft?',
          answer: (
            <div className="space-y-2.5">
              <p>For 500 sq ft of paintable surface, using a coverage rate of 100 sq ft per litre per coat, the estimate is <strong className="text-[#202124]">5 litres for one coat or 10 litres for two coats</strong>.</p>
              <p>Use the coverage rate on your chosen paint product for a more accurate result.</p>
            </div>
          ),
        },
        {
          question: 'How much paint do I need for a 12 × 12 room?',
          answer: (
            <div className="space-y-2.5">
              <p>A room measuring 12 × 12 ft has a floor area of 144 sq ft, but that is not the total area of its walls. To calculate wall paint, you also need the wall height and the area of any doors or windows that will not be painted.</p>
              <p>For the ceiling, the area would be 144 sq ft if the ceiling has the same length and width as the floor. Calculate walls and ceiling separately if both will be painted.</p>
            </div>
          ),
        },
        {
          question: 'How much area does 1 litre of paint cover?',
          answer: (
            <div className="space-y-2.5">
              <p>A typical estimate is around <strong className="text-[#202124]">100–120 sq ft per litre for one coat on a smooth wall</strong>, but coverage varies by product and surface. Rough, porous, or unprepared surfaces may require more paint.</p>
              <p>Always check the manufacturer&apos;s coverage information.</p>
            </div>
          ),
        },
        {
          question: 'What is the formula for calculating paint coverage in litres?',
          answer: (
            <div className="space-y-2.5">
              <p>First calculate the net paintable area. Divide that area by the coverage per litre, then multiply by the number of coats.</p>
              <p>For example, a 500 sq ft surface using paint that covers 130 sq ft per litre per coat requires approximately 7.7 litres for two coats:</p>
              <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded px-3 py-2 font-mono text-xs text-[#202124]">
                500 ÷ 130 × 2 = 7.69 litres
              </div>
            </div>
          ),
        },
        {
          question: 'Does a paint calculator include doors, windows, and ceilings?',
          answer: (
            <div className="space-y-2.5">
              <p>That depends on the calculator. A room-based calculator may ask for wall dimensions and openings, while some tools also include ceilings, trim, or other surfaces.</p>
              <p>Check which measurements and surfaces the tool supports before relying on its estimate.</p>
            </div>
          ),
        },
        {
          question: 'How do I calculate paint cost?',
          answer: (
            <div className="space-y-2.5">
              <p>Multiply the required litres by the price per litre to estimate the paint cost. If you want the full project cost, add any primer, other materials, and labour charges that apply.</p>
              <p>Prices vary by product and location, so use current local prices rather than relying on estimates from another country.</p>
            </div>
          ),
        },
      ]}
    />
  );
}
