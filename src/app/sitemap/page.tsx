import Link from 'next/link';
import { CATEGORIES } from '@/data/calculators';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Full Site Index ,  Complete HTML Sitemap',
  description: 'A comprehensive, human-readable directory of every tool and calculator available on NepaCalc. Organized for optimal crawlability and ease of use.',
  alternates: {
    canonical: 'https://NepaCalc.com/sitemap/',
  },
};

export default function HTMLSitemap() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] pt-10 pb-0 sm:pb-10 font-sans">
       <main className="max-w-4xl mx-auto px-6 bg-white p-8 shadow-sm border border-slate-200 rounded-xl">
          
          {/* Breadcrumb Path & Back Button */}
          <div className="mb-10 flex flex-wrap items-center gap-4">
            <Link 
               href="/"
               className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-[#5F6368] hover:text-blue-600 transition-all border-r border-[#dadce0] pr-4 py-1"
            >
               <ArrowLeft className="w-4 h-4" /> <span>Back</span>
            </Link>

            <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-2 text-[13px] font-medium text-[#5f6368]">
              <Link href="/" className="hover:text-blue-600 hover:underline">Home</Link>
              <span className="text-slate-300">/</span>
              <span className="text-[#202124] font-bold">HTML Sitemap</span>
            </nav>
          </div>

          <header className="mb-8 border-b border-slate-200 pb-8">
             <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-3">HTML Sitemap</h1>
             <p className="text-slate-600 font-medium">
               Complete hierarchical index of the NepaCalc platform. This document outlines our entire organizational structure to assist both users and search engines.
             </p>
          </header>

          <div className="space-y-8">
             {CATEGORIES.map(cat => (
                <section key={cat.id} id={cat.id}>
                   <h2 className="text-xl font-black text-slate-900 border-b-2 border-indigo-500 inline-block pb-1 mb-6 uppercase tracking-tight">
                      {cat.name}
                   </h2>
                                      <ul className="space-y-4 pl-4 border-l-2 border-slate-100 ml-2">

                      {cat.calculators.sort((a,b) => a.name.localeCompare(b.name)).map(calc => (
                         <li key={calc.id} className="relative">
                            <span className="absolute -left-[21px] top-2.5 w-3 h-0.5 bg-slate-200"></span>
                            <Link 
                               href={calc.slug.includes('/') ? `/${calc.slug}/` : `/calculator/${calc.slug}/`}
                               className="text-base font-semibold text-blue-600 hover:text-blue-800 hover:underline inline-block mr-2"
                            >
                               {calc.name}
                            </Link>
                            <span className="text-sm text-slate-500 hidden sm:inline-block">
                               ,  {calc.description}
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
                      <Link href="/blog/" className="text-base font-semibold text-blue-600 hover:text-blue-800 hover:underline mr-2">Research Library (Blog)</Link>
                      <span className="text-sm text-slate-500 hidden sm:inline-block">,  Specialized guides and platform updates.</span>
                   </li>
                   <li className="relative">
                      <span className="absolute -left-[21px] top-2.5 w-3 h-0.5 bg-slate-200"></span>
                      <Link href="/directory/" className="text-base font-semibold text-blue-600 hover:text-blue-800 hover:underline mr-2">Visual Tool Directory</Link>
                      <span className="text-sm text-slate-500 hidden sm:inline-block">,  Global index of all calculated units and visualizers.</span>
                   </li>
                   <li className="relative">
                      <span className="absolute -left-[21px] top-2.5 w-3 h-0.5 bg-slate-200"></span>
                      <Link href="/nepal/" className="text-base font-semibold text-blue-600 hover:text-blue-800 hover:underline mr-2">Nepal-Specific Pillar</Link>
                      <span className="text-sm text-slate-500 hidden sm:inline-block">,  Localized tools for the Nepali mathematical standards.</span>
                   </li>
                </ul>
             </section>
             <div className="mt-16 sm:mt-20 pt-8 border-t border-slate-200" aria-hidden="true" />
          </div>
       </main>
    </div>
  );
}
