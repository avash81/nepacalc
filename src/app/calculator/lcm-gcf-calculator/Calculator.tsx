'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { useSyncState } from '@/hooks/useSyncState';
import { Binary, Sigma, Info, Scale, ShieldCheck, Microscope, Compass } from 'lucide-react';
import { LCM_GCF_FAQS } from './faqs';

export default function LcmGcfCalculator() {
  const [state, setState] = useSyncState('lcm_gcf_v4', { inputVal: '12, 18, 24' });
  const { inputVal } = state;
  const updateState = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const r = useMemo(() => {
    const arr = inputVal.split(/[,\s]+/).map(s => parseInt(s)).filter(n => !isNaN(n) && n > 0);
    if (arr.length === 0) return null;
    
    if (arr.some(n => n > 1000000)) return { error: "Please enter numbers below 1,000,000." };
    
    const gcd2 = (a: number, b: number): number => b === 0 ? a : gcd2(b, a % b);
    const lcm2 = (a: number, b: number) => (a * b) / gcd2(a, b);
    const getPF = (n: number) => {
      let d = 2; const f = []; let t = n;
      while (t > 1) { while (t % d === 0) { f.push(d); t /= d; } d++; if (d * d > t) { if (t > 1) f.push(t); break; } }
      return f;
    };
    let gcf = arr[0], lcm = arr[0];
    for (let i = 1; i < arr.length; i++) { gcf = gcd2(gcf, arr[i]); lcm = lcm2(lcm, arr[i]); }
    return { lcm, gcf, nums: arr, factors: arr.map(n => ({ n, f: getPF(n) })) };
  }, [inputVal]);

  return (
    <ModernCalcLayout
      crumbs={[{ label: 'Math Tools', href: '/math-tools/' }, { label: 'LCM & GCF Calculator' }]}
      title="LCM & GCF Calculator"
      description="The definitive computational resource for Least Common Multiple and Greatest Common Factor. Features Euclidean algorithms, prime factorization trees, and academic proofs for NEB and TU standards."
      icon={Binary}
      inputs={
        <div className="space-y-6">
          <div className="space-y-3">
            <label className="text-[11px] font-bold uppercase text-[#70757A] tracking-wider block">Numeric Input Dataset (Integers only)</label>
            <textarea 
              value={inputVal} 
              onChange={e => updateState({ inputVal: e.target.value })}
              className="w-full h-32 p-5 border border-[#DADCE0] rounded-lg bg-[#F8F9FA] font-mono text-xl font-black focus:border-[#1A73E8] focus:bg-white focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all resize-none shadow-inner text-[#202124]"
              placeholder="e.g. 12, 18, 24" 
            />
          </div>

          <div className="space-y-3">
            <label className="text-[11px] font-bold uppercase text-[#70757A] tracking-wider block">Standardized Academic Problem Sets</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { label: 'SEE Standard Set', data: '12, 18, 24' },
                { label: 'Prime Atom Set', data: '7, 13, 19' },
                { label: 'Harmonic Multiples', data: '15, 30, 45, 60' },
                { label: 'Engineering Constants', data: '120, 150, 200' },
              ].map(d => (
                <button key={d.label} onClick={() => updateState({ inputVal: d.data })}
                  className="p-3 border border-[#DADCE0] bg-white rounded-lg hover:border-[#1A73E8] text-left flex justify-between items-center transition-all group shadow-sm">
                  <span className="text-[11px] font-bold text-[#202124]">{d.label}</span>
                  <span className="text-[10px] font-mono text-[#1A73E8] font-bold group-hover:underline">{d.data}</span>
                </button>
              ))}
            </div>
          </div>

          {r && 'error' in r ? (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center shadow-sm">
                <div className="text-red-600 font-bold text-lg mb-2">Maximum Value Exceeded</div>
                <div className="text-red-500 text-sm">{r.error}</div>
            </div>
          ) : r && (
            <div className="bg-white border border-[#DADCE0] rounded-xl overflow-hidden shadow-sm">
              <div className="px-5 py-4 bg-[#F8F9FA] border-b border-[#DADCE0] flex items-center gap-2">
                <Microscope className="w-5 h-5 text-[#1A73E8]" />
                <h3 className="text-[11px] font-bold uppercase text-[#70757A] tracking-wider">Prime Factorization Decomposition</h3>
              </div>
              <div className="divide-y divide-[#DADCE0]">
                {r.factors.map(({ n, f }) => (
                  <div key={n} className="px-5 py-4 flex justify-between items-center bg-white hover:bg-slate-50 transition-colors">
                    <span className="text-sm font-black text-[#202124] w-12">{n}</span>
                    <span className="text-xs font-mono font-bold text-[#1A73E8] bg-[#E8F0FE] px-4 py-1.5 rounded-full border border-[#C5D9F7]">{f.length ? f.join(' × ') : 'Atomic (Prime)'}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      }
      results={
        <div className="space-y-6">
          {r && !('error' in r) ? (
            <>
              <div className="p-10 bg-white border border-[#DADCE0] rounded-2xl text-center shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Scale className="w-24 h-24" />
                </div>
                <div className="text-[11px] font-bold uppercase text-[#70757A] tracking-wider mb-3">Least Common Multiple (LCM)</div>
                <div className="text-7xl font-black text-[#1A73E8] tracking-tighter font-mono break-all mb-4">{r.lcm.toLocaleString()}</div>
                <div className="mt-4 text-[11px] font-bold text-[#202124] uppercase tracking-widest bg-[#1A73E8] py-2 px-6 rounded-full inline-block shadow-sm">Universal Multiple</div>
              </div>

              <div className="p-10 bg-[#E6F4EA] border border-[#CEEAD6] rounded-2xl text-center shadow-md group">
                <div className="text-[11px] font-bold uppercase text-[#0F5223] tracking-wider mb-3">Greatest Common Factor (GCF/HCF)</div>
                <div className="text-7xl font-black text-[#188038] tracking-tighter font-mono break-all mb-4">{r.gcf.toLocaleString()}</div>
                <div className="mt-4 text-[11px] font-bold text-[#202124] uppercase tracking-widest bg-[#188038] py-2 px-6 rounded-full inline-block shadow-sm">Highest Common Divisor</div>
              </div>

              {r.nums.length === 2 && (
                <div className="p-8 bg-[#1A1A2E] rounded-2xl border border-slate-800 text-white shadow-sm relative overflow-hidden">
                  <div className="absolute -bottom-8 -right-8 opacity-10">
                    <Sigma className="w-32 h-32" />
                  </div>
                  <div className="flex items-center gap-3 mb-6">
                    <ShieldCheck className="w-6 h-6 text-[#8AB4F8]" />
                    <h4 className="text-lg font-bold tracking-tight">The Fundamental Identity Proof</h4>
                  </div>
                  <div className="space-y-6 relative z-10">
                    <p className="text-sm font-medium text-slate-300 leading-relaxed">
                        According to the product theorem of integers, the product of two numbers is mathematically identical to the product of their LCM and GCF.
                    </p>
                    <div className="p-5 bg-[#f8f9fa] rounded-xl border border-[#dadce0] font-mono text-xl text-[#8AB4F8] flex flex-col gap-4">
                      <div className="flex justify-between items-center border-b border-[#dadce0] pb-2">
                        <span className="text-xs text-[#202124]/50 uppercase tracking-widest">Identity</span>
                        <span>LCM(a,b) × GCF(a,b)</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[#202124]">{r.lcm} × {r.gcf}</span>
                        <span className="text-[#202124]">=</span>
                        <span className="text-[#202124] font-black">{(r.lcm * r.gcf).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : r && 'error' in r ? (
             <div className="p-16 bg-[#F8F9FA] border-2 border-dashed border-red-300 rounded-lg text-center space-y-6">
               <div className="max-w-xs mx-auto">
                   <p className="text-lg font-bold text-red-600">Computation Halted</p>
                   <p className="text-sm text-red-500 mt-2">{r.error}</p>
               </div>
            </div>
          ) : (
            <div className="p-16 bg-[#F8F9FA] border-2 border-dashed border-[#DADCE0] rounded-lg text-center space-y-6">
               <div className="bg-white p-4 rounded-full w-20 h-20 mx-auto flex items-center justify-center shadow-sm">
                    <Info className="w-10 h-10 text-[#70757A]" />
               </div>
               <div className="max-w-xs mx-auto">
                   <p className="text-lg font-bold text-[#202124]">Awaiting Numeric Input</p>
                   <p className="text-sm text-[#5F6368] mt-2">Please enter a dataset of positive integers to trigger the computational engine.</p>
               </div>
            </div>
          )}
        </div>
      }
      details={
        <div className="space-y-12">
          
          <section className="bg-white border border-[#DADCE0] rounded-2xl p-8 sm:p-10 shadow-sm relative overflow-hidden">
            <h2 className="text-3xl font-black text-[#202124] tracking-tight mb-8">LCM vs GCF: A Comprehensive Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-[#F8F9FA] border-b-2 border-[#1A73E8]">
                    <th className="p-4 font-bold text-[#202124]">Feature</th>
                    <th className="p-4 font-bold text-[#1A73E8]">LCM (Least Common Multiple)</th>
                    <th className="p-4 font-bold text-[#188038]">GCF (Greatest Common Factor)</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-[#5F6368]">
                  <tr className="border-b border-[#DADCE0]">
                    <td className="p-4 font-bold text-[#202124] bg-[#F8F9FA]">Definition</td>
                    <td className="p-4">The smallest positive integer that is a multiple of all the numbers in a set.</td>
                    <td className="p-4">The largest positive integer that perfectly divides all the numbers in a set.</td>
                  </tr>
                  <tr className="border-b border-[#DADCE0]">
                    <td className="p-4 font-bold text-[#202124] bg-[#F8F9FA]">Purpose</td>
                    <td className="p-4">Used to find a common meeting point or synchronization point in the future.</td>
                    <td className="p-4">Used to divide things into smaller, equal sections or groups.</td>
                  </tr>
                  <tr className="border-b border-[#DADCE0]">
                    <td className="p-4 font-bold text-[#202124] bg-[#F8F9FA]">How Calculated (Prime Factors)</td>
                    <td className="p-4">Multiply the highest powers of all prime factors present in the numbers.</td>
                    <td className="p-4">Multiply the lowest powers of common prime factors shared by all numbers.</td>
                  </tr>
                  <tr className="border-b border-[#DADCE0]">
                    <td className="p-4 font-bold text-[#202124] bg-[#F8F9FA]">Example (12 and 18)</td>
                    <td className="p-4">LCM = 36 (36 ÷ 12 = 3; 36 ÷ 18 = 2)</td>
                    <td className="p-4">GCF = 6 (12 ÷ 6 = 2; 18 ÷ 6 = 3)</td>
                  </tr>
                  <tr className="border-b border-[#DADCE0]">
                    <td className="p-4 font-bold text-[#202124] bg-[#F8F9FA]">School Mathematics</td>
                    <td className="p-4">Finding common denominators to add or subtract fractions.</td>
                    <td className="p-4">Simplifying fractions to their lowest possible terms.</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-[#202124] bg-[#F8F9FA] rounded-bl-lg">Engineering & Science</td>
                    <td className="p-4">Synchronizing cycles, gear tooth ratios, electrical phase alignment.</td>
                    <td className="p-4">Material optimization, calculating maximum uniform segment sizes.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="bg-white border border-[#DADCE0] rounded-2xl p-8 sm:p-10 shadow-sm">
            <h2 className="text-3xl font-black text-[#202124] tracking-tight mb-8">Worked Example: Finding LCM and GCF of 12 and 18</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-[#F8F9FA] p-6 rounded-xl border border-[#DADCE0]">
                <h3 className="font-bold text-[#1A73E8] mb-4 text-lg">Step 1: Prime Factorization</h3>
                <ul className="space-y-3 font-mono text-sm">
                  <li className="flex justify-between items-center bg-white p-3 rounded shadow-sm border border-[#DADCE0]">
                    <span className="font-bold text-[#202124]">12</span>
                    <span>2 × 2 × 3 = 2² × 3</span>
                  </li>
                  <li className="flex justify-between items-center bg-white p-3 rounded shadow-sm border border-[#DADCE0]">
                    <span className="font-bold text-[#202124]">18</span>
                    <span>2 × 3 × 3 = 2 × 3²</span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <div className="bg-[#E6F4EA] p-6 rounded-xl border border-[#CEEAD6]">
                  <h3 className="font-bold text-[#188038] mb-2 text-lg">Step 2: Calculate GCF</h3>
                  <p className="text-sm text-[#5F6368] mb-2">Take the lowest power of common primes:</p>
                  <p className="font-mono text-lg font-bold text-[#188038]">GCF = 2¹ × 3¹ = 6</p>
                </div>
                <div className="bg-[#E8F0FE] p-6 rounded-xl border border-[#C5D9F7]">
                  <h3 className="font-bold text-[#1A73E8] mb-2 text-lg">Step 3: Calculate LCM</h3>
                  <p className="text-sm text-[#5F6368] mb-2">Take the highest power of all primes:</p>
                  <p className="font-mono text-lg font-bold text-[#1A73E8]">LCM = 2² × 3² = 4 × 9 = 36</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white border border-[#DADCE0] rounded-2xl p-8 sm:p-10 shadow-sm">
            <h2 className="text-3xl font-black text-[#202124] tracking-tight mb-6">Euclidean Algorithm Example</h2>
            <p className="text-[#5F6368] mb-6">The Euclidean Algorithm is a highly efficient method for finding the GCF of two numbers without needing to find their prime factors. Let's find the GCF of <strong>48</strong> and <strong>18</strong>.</p>
            
            <div className="bg-[#1A1A2E] text-white p-6 rounded-xl font-mono text-sm space-y-4 shadow-inner">
              <div className="flex items-center gap-4">
                <span className="text-[#8AB4F8] w-24">Step 1:</span>
                <span>48 ÷ 18 = 2 <span className="text-green-400">remainder 12</span></span>
              </div>
              <div className="flex items-center gap-4 opacity-80">
                <span className="text-[#8AB4F8] w-24">Shift left:</span>
                <span className="text-xs">Take the divisor (18) and the remainder (12) for the next step.</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[#8AB4F8] w-24">Step 2:</span>
                <span>18 ÷ 12 = 1 <span className="text-green-400">remainder 6</span></span>
              </div>
              <div className="flex items-center gap-4 opacity-80">
                <span className="text-[#8AB4F8] w-24">Shift left:</span>
                <span className="text-xs">Take the divisor (12) and the remainder (6) for the next step.</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[#8AB4F8] w-24">Step 3:</span>
                <span>12 ÷ 6 = 2 <span className="text-green-400 font-bold underline">remainder 0</span></span>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-700 text-[#8AB4F8] font-bold">
                Final Answer: The last non-zero remainder is 6. Therefore, GCF(48, 18) = 6.
              </div>
            </div>
            <p className="text-sm text-[#5F6368] mt-6 italic">Why it works: This algorithm relies on the principle that the greatest common divisor of two numbers does not change if the larger number is replaced by its difference with the smaller number.</p>
          </section>

          <section className="bg-white border border-[#DADCE0] rounded-2xl p-8 sm:p-10 shadow-sm">
            <h2 className="text-3xl font-black text-[#202124] tracking-tight mb-8">Prime Factorization Example</h2>
            <div className="flex flex-col items-center">
              <p className="text-[#5F6368] text-center max-w-2xl mb-8">Prime factorization breaks down a composite number into the prime numbers that multiply together to create it. Here is the visual step-by-step factorization of <strong>60</strong>.</p>
              
              <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-xl p-8 w-full max-w-md shadow-sm">
                <div className="flex flex-col items-center space-y-4 font-mono font-bold text-xl text-[#202124]">
                  <div className="text-3xl mb-2 text-[#1A73E8]">60</div>
                  <div className="text-slate-400 text-sm">↓ (Divide by prime 2)</div>
                  <div>2 × <span className="text-[#1A73E8]">30</span></div>
                  <div className="text-slate-400 text-sm">↓ (Divide by prime 2)</div>
                  <div>2 × 2 × <span className="text-[#1A73E8]">15</span></div>
                  <div className="text-slate-400 text-sm">↓ (Divide by prime 3)</div>
                  <div>2 × 2 × 3 × <span className="text-green-600">5</span></div>
                  
                  <div className="w-full border-t border-[#DADCE0] my-4 pt-4 text-center">
                    <span className="text-xs text-[#70757A] uppercase tracking-widest block mb-2 font-sans">Final Result</span>
                    <span className="text-2xl text-[#1A73E8]">2² × 3 × 5</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section className="bg-[#E8F0FE] border border-[#C5D9F7] rounded-2xl p-8 shadow-sm">
              <h3 className="text-2xl font-black text-[#1A73E8] tracking-tight mb-6">When Should You Use LCM?</h3>
              <ul className="space-y-4 text-[#202124]">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-[#1A73E8] shrink-0" />
                  <div><strong>School Mathematics:</strong> Finding a common denominator to add or subtract fractions (e.g. 1/4 + 1/6 needs LCM of 12).</div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-[#1A73E8] shrink-0" />
                  <div><strong>Timetables & Scheduling:</strong> Finding when two buses, trains, or overlapping shifts will next coincide.</div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-[#1A73E8] shrink-0" />
                  <div><strong>Traffic Lights:</strong> Calculating the exact moment multiple independent traffic lights will turn green simultaneously.</div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-[#1A73E8] shrink-0" />
                  <div><strong>Machine Cycles:</strong> Synchronizing mechanical gears and rotating machinery parts.</div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-[#1A73E8] shrink-0" />
                  <div><strong>Electrical Synchronization:</strong> Aligning alternating current (AC) phases and waveforms.</div>
                </li>
              </ul>
            </section>

            <section className="bg-[#E6F4EA] border border-[#CEEAD6] rounded-2xl p-8 shadow-sm">
              <h3 className="text-2xl font-black text-[#188038] tracking-tight mb-6">When Should You Use GCF?</h3>
              <ul className="space-y-4 text-[#202124]">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-[#188038] shrink-0" />
                  <div><strong>Simplifying Fractions:</strong> Dividing the numerator and denominator by their GCF to reach the lowest possible terms.</div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-[#188038] shrink-0" />
                  <div><strong>Ratios:</strong> Simplifying ingredient ratios or chemical formulas.</div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-[#188038] shrink-0" />
                  <div><strong>Grouping Objects:</strong> Distributing different items evenly into the maximum number of identical groups with nothing left over.</div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-[#188038] shrink-0" />
                  <div><strong>Geometry & Tiles:</strong> Finding the largest possible square tile size that fits perfectly in a rectangular room without cutting.</div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-[#188038] shrink-0" />
                  <div><strong>Engineering Measurements:</strong> Finding the largest uniform segment lengths for materials cutting.</div>
                </li>
              </ul>
            </section>
          </div>

          <section className="bg-gradient-to-br from-[#1A1A2E] to-[#16213E] text-white rounded-2xl p-8 sm:p-10 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 opacity-10 pointer-events-none text-9xl font-black select-none mr-4 mt-2">नेपाल</div>
             <h2 className="text-3xl font-black mb-6 border-b border-slate-700 pb-4 relative z-10">Nepalese Academic Roadmap & Education Alignment</h2>
             <div className="prose prose-md prose-invert max-w-none leading-relaxed space-y-6 relative z-10">
               <p>
                 For students in Nepal, the concepts of LCM (Lasa) and HCF (Masa) are essential building blocks. These topics are formally introduced in early education and become critical components of the <strong>Compulsory Mathematics</strong> and <strong>Optional Mathematics</strong> papers in the <strong>Secondary Education Examination (SEE)</strong> and <strong>NEB Mathematics</strong> exams for Grades 11 and 12.
               </p>
               <p>
                 Mastering Prime Factorization and the Euclidean Algorithm is the gateway to algebraic simplification and solving quadratic equations. By visualizing the factor trees, this calculator goes beyond providing the final answer—it teaches the mathematical logic required to succeed.
               </p>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                 <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700">
                   <h4 className="text-lg font-bold text-[#8AB4F8] mb-2">Engineering Entrance (IOE)</h4>
                   <p className="text-sm text-slate-300">The Institute of Engineering (IOE) entrance exams frequently feature time-pressured aptitude questions involving cyclic patterns, rotating gears, and signal synchronization. These are all advanced LCM applications.</p>
                 </div>
                 <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700">
                   <h4 className="text-lg font-bold text-[#8AB4F8] mb-2">Lok Sewa Aptitude Tests</h4>
                   <p className="text-sm text-slate-300">Lok Sewa Aayog (Public Service Commission) IQ and Aptitude tests heavily test numerical reasoning. Questions about bells ringing at intervals or distributing objects equally are classic LCM and HCF problems.</p>
                 </div>
                 <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700">
                   <h4 className="text-lg font-bold text-[#8AB4F8] mb-2">Bachelor Level Mathematics</h4>
                   <p className="text-sm text-slate-300">At Kathmandu University (KU) and Tribhuvan University (TU), Number Theory and the Euclidean Algorithm are taught as primary examples of computational efficiency in BSc.CSIT and Engineering mathematics courses.</p>
                 </div>
                 <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700">
                   <h4 className="text-lg font-bold text-[#8AB4F8] mb-2">SEE / NEB Mathematics</h4>
                   <p className="text-sm text-slate-300">Directly applicable to the algebraic fractions and polynomial factorization chapters required by the National Examination Board curriculum.</p>
                 </div>
               </div>
             </div>
           </section>

        </div>
      }
      howToUse={{
        steps: [
          "Dataset Input: Type your positive integers into the primary text area. You can use commas (12, 18) or spaces (12 18) to delineate terms.",
          "Prime Factorization Audit: Observe the automatically generated factor tree in the left panel. This identifies the prime components for every valid entry.",
          "Analyze the LCM: Review the blue primary result card. This value represents the smallest integer divisible by your entire dataset.",
          "Check the GCF (HCF): Review the green secondary result card. This value is the largest integer that divides every number in your set without a remainder.",
          "Verify the Proof: For any pair of numbers, scroll to the 'Fundamental Identity Proof' to see the cross-verification of the $LCM \\times GCF = a \\times b$ theorem."
        ]
      }}
      formula={{
        title: "The Logic of Common Multiplicity",
        description: "These LaTeX-formatted identities represent the recursive and algebraic logic used by our engine.",
        raw: "$$\\begin{aligned} \\text{Recursive GCF: } & \\text{gcd}(a, 0) = a \\\\ \\text{Euclidean Step: } & \\text{gcd}(a, b) = \\text{gcd}(b, a \\pmod b) \\\\ \\text{LCM Derivation: } & \\text{lcm}(a, b) = \\frac{|a \\times b|}{\\text{gcd}(a, b)} \\\\ \\text{Iterative Set: } & \\text{lcm}(a, b, c) = \\text{lcm}(\\text{lcm}(a, b), c) \\\\ \\text{Factor Sum: } & a = \\prod p_i^{a_i}, b = \\prod p_i^{b_i} \\implies \\text{gcd}(a,b) = \\prod p_i^{\\min(a_i, b_i)} \\end{aligned}$$"
      }}
      faqs={LCM_GCF_FAQS}
      sidebar={{ title: "Math Tools", links: [
          { label: "Fraction Calculator", href: "/calculator/fraction-calculator/" },
          { label: "Decimal to Fraction", href: "/calculator/decimal-to-fraction/" },
          { label: "Percentage Calculator", href: "/calculator/percentage/" },
          { label: "Standard Deviation", href: "/calculator/standard-deviation/" },
          { label: "Scientific Calculator", href: "/calculator/scientific/" }
        ], banner: { title: "Number Theory", description: "Standardizing mathematical logic for Nepal's digital age.", image: "/images/math-banner.jpg" } }}
      relatedTools={[
        { label: "Fraction Calculator", href: "/calculator/fraction-calculator/" },
        { label: "Percentage Calculator", href: "/calculator/percentage/" },
        { label: "Matrix Calculator", href: "/calculator/matrix/" },
        { label: "Decimal to Fraction", href: "/calculator/decimal-to-fraction/" }
      ]}
    />
  );
}
