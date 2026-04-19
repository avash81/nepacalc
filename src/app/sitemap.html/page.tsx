import Link from 'next/link';
import { CATEGORIES } from '@/data/calculators';

export const metadata = {
  title: 'Full Site Index — Complete HTML Sitemap',
  description: 'A comprehensive, human-readable directory of every tool and calculator available on NEPACALC. Organized for optimal crawlability and ease of use.',
};

export default function HTMLSitemap() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] py-20 font-sans">
       <main className="max-w-4xl mx-auto px-6 bg-white p-12 shadow-sm border border-slate-200 rounded-xl">
          <header className="mb-12 border-b border-slate-200 pb-8">
             <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-3">HTML Sitemap</h1>
             <p className="text-slate-600 font-medium">
               Complete hierarchical index of the NEPACALC platform. This document outlines our entire organizational structure to assist both users and search engines.
             </p>
          </header>

          <div className="space-y-12">
             {CATEGORIES.map(cat => (
                <section key={cat.id} id={cat.id}>
                   <h2 className="text-xl font-black text-slate-900 border-b-2 border-indigo-500 inline-block pb-1 mb-6 uppercase tracking-tight">
                      {cat.name}
                   </h2>
                   
                   <ul className="space-y-4 pl-4 border-l-2 border-slate-100 ml-2">
                      {/* Special injection for Engineering Suite in its category */}
                      {cat.id === 'engineering' && (
                        <>
                          <li className="relative">
                            <span className="absolute -left-[21px] top-2.5 w-3 h-0.5 bg-indigo-200"></span>
                            <Link href="/engineering/graphing" className="text-base font-black text-indigo-600 hover:text-indigo-800 hover:underline mr-2 italic">Graphing Calculator Pro</Link>
                            <span className="text-sm text-slate-500 hidden sm:inline-block">— Advanced 2D function plotter with multi-expression support.</span>
                          </li>
                          <li className="relative">
                            <span className="absolute -left-[21px] top-2.5 w-3 h-0.5 bg-indigo-200"></span>
                            <Link href="/engineering/3d" className="text-base font-black text-indigo-600 hover:text-indigo-800 hover:underline mr-2 italic">3D Surface Visualizer</Link>
                            <span className="text-sm text-slate-500 hidden sm:inline-block">— 3D surface plotter for z=f(x,y) functions.</span>
                          </li>
                          <li className="relative">
                            <span className="absolute -left-[21px] top-2.5 w-3 h-0.5 bg-indigo-200"></span>
                            <Link href="/engineering/geometry" className="text-base font-black text-indigo-600 hover:text-indigo-800 hover:underline mr-2 italic">Geometry Canvas Lab</Link>
                            <span className="text-sm text-slate-500 hidden sm:inline-block">— Interactive geometric construction and measurement tool.</span>
                          </li>
                          <li className="relative">
                            <span className="absolute -left-[21px] top-2.5 w-3 h-0.5 bg-indigo-200"></span>
                            <Link href="/engineering/formulas" className="text-base font-black text-indigo-600 hover:text-indigo-800 hover:underline mr-2 italic">Mathematical Formula Library</Link>
                            <span className="text-sm text-slate-500 hidden sm:inline-block">— Comprehensive library of math and engineering formulas.</span>
                          </li>
                        </>
                      )}

                      {cat.calculators.sort((a,b) => a.name.localeCompare(b.name)).map(calc => (
                         <li key={calc.id} className="relative">
                            <span className="absolute -left-[21px] top-2.5 w-3 h-0.5 bg-slate-200"></span>
                            <Link 
                               href={`/calculator/${calc.slug}`}
                               className="text-base font-semibold text-blue-600 hover:text-blue-800 hover:underline inline-block mr-2"
                            >
                               {calc.name}
                            </Link>
                            <span className="text-sm text-slate-500 hidden sm:inline-block">
                               — {calc.description}
                            </span>
                            <p className="text-xs text-slate-400 sm:hidden mt-0.5 max-w-[280px] leading-tight">
                               {calc.description}
                            </p>
                         </li>
                      ))}
                   </ul>
                </section>
             ))}

             <section>
                <h2 className="text-xl font-black text-slate-900 border-b-2 border-slate-500 inline-block pb-1 mb-6 uppercase tracking-tight">
                   Institutional Resources
                </h2>
                <ul className="space-y-4 pl-4 border-l-2 border-slate-100 ml-2">
                   <li className="relative">
                      <span className="absolute -left-[21px] top-2.5 w-3 h-0.5 bg-slate-200"></span>
                      <Link href="/blog" className="text-base font-semibold text-blue-600 hover:text-blue-800 hover:underline mr-2">Research Library (Blog)</Link>
                      <span className="text-sm text-slate-500 hidden sm:inline-block">— Specialized guides and platform updates.</span>
                   </li>
                   <li className="relative">
                      <span className="absolute -left-[21px] top-2.5 w-3 h-0.5 bg-slate-200"></span>
                      <Link href="/directory" className="text-base font-semibold text-blue-600 hover:text-blue-800 hover:underline mr-2">Visual Tool Directory</Link>
                      <span className="text-sm text-slate-500 hidden sm:inline-block">— Global index of all calculated units and visualizers.</span>
                   </li>
                   <li className="relative">
                      <span className="absolute -left-[21px] top-2.5 w-3 h-0.5 bg-slate-200"></span>
                      <Link href="/nepal" className="text-base font-semibold text-blue-600 hover:text-blue-800 hover:underline mr-2">Nepal-Specific Pillar</Link>
                      <span className="text-sm text-slate-500 hidden sm:inline-block">— Localized tools for the Nepali mathematical standards.</span>
                   </li>
                   <li className="relative">
                      <span className="absolute -left-[21px] top-2.5 w-3 h-0.5 bg-slate-200"></span>
                      <Link href="/contact" className="text-base font-semibold text-blue-600 hover:text-blue-800 hover:underline mr-2">Support & Verification</Link>
                   </li>
                </ul>
             </section>
          </div>
       </main>
    </div>
  );
}
