import Link from 'next/link';
import { CATEGORIES } from '@/data/calculators';
import { ChevronRight } from 'lucide-react';
import { JsonLd } from '@/components/seo/JsonLd';
import { HomePageCalculatorClient } from './HomePageCalculatorClient';

export default function HomePage() {
  return (
    <>
      <JsonLd type="website" />
      <JsonLd type="organization" />
      
      <div className="min-h-screen bg-[var(--bg-page)] font-sans antialiased text-[14px]">
        {/* 1. Precision Tool Console (MOCKUP EXACT RECONSTRUCTION) */}
        <section className="pt-16 pb-12 border-b border-[#F1F3F4] bg-white relative overflow-hidden">
          
          {/* Mockup Background: Grid + Formulas */}
          <div className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none" 
               style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
          </div>
          
          {/* Floating Math Elements */}
          <div className="absolute inset-0 z-0 opacity-10 pointer-events-none select-none">
             <span className="absolute top-[15%] left-[10%] text-xl font-serif italic text-slate-400">nx&apos; = k²w³</span>
             <span className="absolute top-[30%] left-[4%] text-lg font-serif text-slate-300">f(x) = ∫ ...</span>
             <span className="absolute bottom-[30%] left-[8%] text-2xl font-serif text-slate-300">A = πr²</span>
             <span className="absolute top-[10%] right-[15%] text-2xl font-serif text-slate-300">E = mc²</span>
             <span className="absolute bottom-[20%] right-[10%] text-xl font-serif text-slate-300">∑(xᵢ + hⱼ)</span>
             <span className="absolute top-[40%] right-[25%] text-lg font-serif text-slate-200 italic">2πn = λ</span>
          </div>

          {/* Premium Hero Image (Checklist: Media Richness & Alt Optimization) */}
          <div className="absolute inset-x-0 bottom-0 h-full w-full pointer-events-none z-0">
             <img 
               src="/nepacalc_precision_hero.png" 
               alt="NEPACALC Precision Mathematical Laboratory — Professional Financial Tools for Nepal" 
               className="w-full h-full object-cover opacity-10 lg:opacity-20"
               loading="eager"
               decoding="async"
             />
          </div>

          <div className="hp-container flex flex-col items-center relative z-10">
            {/* Heading Stacking As Per Mockup - Optimized LCP */}
            <div className="text-center mb-8 w-full px-4">
               <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#202124] tracking-tight leading-tight mb-4">
                 Nepal’s Precision Tools
                 <span className="block text-[8px] sm:text-[10px] font-black uppercase tracking-[0.4em] text-[#1A73E8] mt-3">
                   EMI · Tax · GPA · 75+ Professional Calculators
                 </span>
               </h1>
            </div>
            
            <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-16">
               {/* Left Precision Callout */}
               <div className="lg:w-[150px] flex justify-center lg:justify-end">
                  <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white border border-slate-200 shadow-xl shadow-slate-200/20 text-[#1A73E8] font-black text-[11px] uppercase tracking-widest group cursor-pointer hover:border-[#1A73E8] transition-all" aria-label="Precision metrics">
                    <div className="w-5 h-5 rounded-full border-2 border-[#1A73E8] flex items-center justify-center p-0.5">
                       <div className="w-full h-full rounded-full bg-[#1A73E8] opacity-20 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    Precision
                  </div>
               </div>

               {/* Centerpiece Calculator */}
               <div className="w-full max-w-[560px] relative z-20 shadow-2xl">
                  <HomePageCalculatorClient />
               </div>

               {/* Right Side Spacer Area */}
               <div className="hidden lg:block lg:w-[150px]" />
            </div>

            {/* Subtext description below focal point */}
            <div className="mt-12 text-center max-w-2xl px-4">
               <p className="text-[#3c4043] text-lg sm:text-xl font-medium tracking-tight leading-relaxed">
                  The authoritative calculation ecosystem for Nepal professionals. Engineered for accuracy. Built for speed.
               </p>
            </div>
          </div>
        </section>

        {/* 2. Calculator Directory - High-Precision Server Component Rendering */}
        <main className="max-w-[1400px] mx-auto px-4 sm:px-8 pt-6 pb-0 sm:pt-8 sm:pb-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 sm:mb-10 border-b border-[#F1F3F4] pb-6 gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#202124] tracking-tight uppercase">Calculator Directory</h2>
              <p className="text-[#5F6368] text-xs sm:text-sm mt-1 font-medium">Browse 75+ Professional Tools — 100% Mobile Optimized</p>
            </div>
            <span className="text-[10px] font-black text-[#188038] uppercase tracking-widest bg-emerald-50 border border-emerald-100 px-4 py-2 rounded-full shrink-0 shadow-sm inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#188038] animate-pulse"></span> Verified Nepal Data
            </span>
          </div>

          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-5 gap-8 space-y-12">
            {CATEGORIES.map(cat => (
              <section key={cat.id} className="break-inside-avoid">
         <div className="flex flex-col gap-4 group mb-6">
                    <div className="w-16 h-16 rounded-3xl bg-[#F8F9FA] border border-[#E8EAED] flex items-center justify-center text-3xl group-hover:border-[#1A73E8] group-hover:bg-blue-50 group-hover:shadow-md transition-all duration-300">
                      {cat.icon}
                    </div>
                    <Link href={`/calculator/category/${cat.id}`}>
                      <h3 className="text-[20px] font-black text-[#202124] hover:text-[#1A73E8] transition-colors tracking-tight leading-tight">
                        {cat.name}
                      </h3>
                    </Link>
                 </div>

                 <nav>
                    <ul className="space-y-2.5">
                      {cat.calculators
                        .sort((a, b) => ((b.isHot ? 2 : 0) + (b.isNew ? 1 : 0)) - ((a.isHot ? 2 : 0) + (a.isNew ? 1 : 0)))
                        .slice(0, 10)
                        .map(calc => (
                          <li key={calc.id} className="flex items-center gap-2 group/link">
                            <Link
                              href={`/calculator/${calc.slug}`}
                              className="text-[14px] text-slate-700 hover:text-blue-600 font-semibold leading-snug flex-1 transition-all duration-200 hover:translate-x-1"
                            >
                              {calc.name}
                            </Link>
                            {calc.isHot && (
                              <span className="text-[9px] font-black bg-orange-700 text-white px-1.5 py-0.5 rounded-full uppercase tracking-tight shrink-0 shadow-sm shadow-orange-500/20">HOT</span>
                            )}
                            {!calc.isHot && calc.isNew && (
                              <span className="text-[9px] font-black bg-blue-700 text-white px-1.5 py-0.5 rounded-full uppercase tracking-tight shrink-0 shadow-sm shadow-blue-500/20">NEW</span>
                            )}
                          </li>
                        ))}
                      {cat.calculators.length > 10 && (
                        <li className="pt-3 border-t border-slate-100 mt-2">
                          <Link
                             href={`/calculator/category/${cat.id}`}
                             className="inline-flex items-center gap-1.5 mt-1 px-4 py-2 text-[12px] font-semibold text-blue-700 bg-blue-50/80 hover:bg-blue-100 rounded-xl transition-all w-max"
                          >
                             View all {cat.calculators.length} tools <ChevronRight className="w-3.5 h-3.5 text-blue-500" />
                          </Link>
                        </li>
                      )}
                    </ul>
                 </nav>
              </section>
            ))}
          </div>
        </main>
        {/* 3. Static SEO Authority Layer (Google Crawler Depth) */}
        <section className="hp-container pt-20 pb-24 border-t border-[#F1F3F4] text-[#3c4043] select-none">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <div>
              <h4 className="text-[11px] font-black uppercase tracking-widest text-[#1A73E8] mb-4 underline decoration-2 underline-offset-8">Institutional Authority</h4>
              <p className="text-[13px] leading-relaxed font-medium">NEPACALC is Nepal&apos;s most advanced mathematical laboratory, providing 75+ professional-grade tools engineered for the latest fiscal environment. Our ecosystem handles everything from Salary calculations to complex Civil Engineering formulas with verified precision.</p>
            </div>
            <div>
              <h4 className="text-[11px] font-black uppercase tracking-widest text-[#1A73E8] mb-4 underline decoration-2 underline-offset-8">Financial Precision</h4>
              <p className="text-[13px] leading-relaxed font-medium">As the leading financial hub for Nepal, we offer comprehensive Income Tax Calculators updated for the latest IRD regulations, EMI tools for local bank rates, and provident fund (EPF/CIT) tools designed for the Nepalese workforce.</p>
            </div>
            <div>
              <h4 className="text-[11px] font-black uppercase tracking-widest text-[#1A73E8] mb-4 underline decoration-2 underline-offset-8">Academic Standards</h4>
              <p className="text-[13px] leading-relaxed font-medium">Our educational suite includes specialized Engineering GPA calculators, Roman Numeral converters, and advanced LCM/GCF tools specifically tailored for the Nepal education curricula (NEB/TU/PU), ensuring accuracy for students and researchers.</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
