'use client';
import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { CATEGORIES } from '@/data/calculators';
import { Printer, Info, Star } from 'lucide-react';
import { GLOBAL_CONFIG, CATEGORY_PURPOSE_MAP } from '@/config/GlobalConfig';
import { CALCULATORS } from '@/data/calculators';
import CalculatorSchema from '@/components/seo/CalculatorSchema';
import RelatedCalculators from '@/components/calculator/RelatedCalculators';

interface CalculatorLayoutProps {
  children?: React.ReactNode;
  title: string;
  description: string;
  badge?: string;
  badgeColor?: string;
  purpose?: string; // MDCalc style purpose tag
  category?: string | { label: string; href: string };
  categoryHref?: string;
  topHeaderPanel?: React.ReactNode;
  leftPanel?: React.ReactNode;
  rightPanel?: React.ReactNode;
  faqSection?: React.ReactNode;
  faqs?: { question: string; answer: string }[];
  focusKeyword?: string;
  slug?: string;
}

export function CalculatorLayout({
  children,
  title,
  description,
  purpose,
  category,
  categoryHref,
  topHeaderPanel,
  leftPanel,
  rightPanel,
  faqSection,
  faqs,
  slug
}: CalculatorLayoutProps) {
  const pathname = usePathname();
  const catLabel = typeof category === 'object' ? category.label : category;
  const catLink = typeof category === 'object' ? category.href : categoryHref;
  
  // Auto-resolve slug from path if not provided
  const resolvedSlug = slug || pathname.split('/').pop() || '';
  const calculatorData = CALCULATORS.find(c => c.slug === resolvedSlug);
  
  // Resolve automatic purpose if not provided
  const autoPurpose = purpose || (catLabel ? CATEGORY_PURPOSE_MAP[catLabel.toLowerCase()] : null);

  const [isFavorite, setIsFavorite] = React.useState(false);

  // Track Recently Used (MDCalc style) and check Favorites
  useEffect(() => {
    if (typeof window === 'undefined' || !title) return;
    const history = JSON.parse(localStorage.getItem('cp_recent') || '[]');
    const currentHref = window.location.pathname;
    const current = { title, href: currentHref, date: new Date().toISOString() };
    const filtered = history.filter((h: any) => h.href !== current.href);
    localStorage.setItem('cp_recent', JSON.stringify([current, ...filtered].slice(0, 10)));
    
    // Check Favorites
    const favs = JSON.parse(localStorage.getItem('cp_favs') || '[]');
    setIsFavorite(favs.some((f: any) => f.href === currentHref));
  }, [title]);

  const toggleFavorite = () => {
    const favs = JSON.parse(localStorage.getItem('cp_favs') || '[]');
    const href = window.location.pathname;
    let newFavs;
    if (isFavorite) {
      newFavs = favs.filter((f: any) => f.href !== href);
    } else {
      newFavs = [{ title, href }, ...favs].slice(0, 20); // Keep max 20
    }
    localStorage.setItem('cp_favs', JSON.stringify(newFavs));
    setIsFavorite(!isFavorite);
    window.dispatchEvent(new Event('cp_favs_updated'));
  };

  const renderCategoryGrid = () => (
    <div className="no-print">
      <h4 className="text-[11px] font-black uppercase text-slate-500 mb-6 tracking-widest text-center">Explore More Calculators</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {CATEGORIES.map(cat => (
            <div key={cat.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <Link href={`/calculator/category/${cat.id}`} className="flex items-center gap-2 text-[14px] font-black text-slate-800 hover:text-blue-600 mb-4 transition-colors">
                 <span>{cat.icon}</span> {cat.name}
              </Link>
              <ul className="space-y-3">
                  {cat.calculators.slice(0, 4).map(calc => (
                    <li key={calc.id} className="leading-snug">
                      <Link href={`/calculator/${calc.slug}`} className="text-[13px] font-medium text-slate-500 hover:text-blue-600 transition-colors flex items-start gap-2 group">
                        <span className="text-slate-300 group-hover:text-blue-400 mt-0.5">•</span>
                        <span>{calc.name}</span>
                      </Link>
                    </li>
                  ))}
                  {cat.calculators.length > 4 && (
                    <li className="pt-2"><Link href={`/calculator/category/${cat.id}`} className="text-[11px] uppercase tracking-widest text-blue-600 font-bold hover:underline">View All &rarr;</Link></li>
                  )}
              </ul>
            </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[var(--bg-page)] font-sans antialiased pb-24 lg:pb-0 pt-24">
      {/* 0. SEO Power Injection (JSON-LD & Multi-Image Architecture) */}
      {calculatorData && <CalculatorSchema calculator={calculatorData} />}

      {/* 1. Premium Grade Breadcrumb/Header */}
      <div className="bg-[#F8F9FA] text-[#5F6368] py-3 border-b border-[#DADCE0] no-print relative overflow-hidden">
        <div className="hp-container flex items-center gap-2.5 text-[10px] font-black uppercase tracking-[0.2em] relative z-10">
          <button 
            type="button"
            onClick={() => window.history.length > 2 ? window.history.back() : (window.location.href = '/')}
            className="flex items-center gap-1 hover:text-[#1A73E8] text-[#5F6368] border-r border-[#DADCE0] pr-3 mr-1 transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
            BACK
          </button>
          <Link href="/" className="hover:text-[#1A73E8] transition-all text-[#5F6368] hidden sm:inline-block border-b border-transparent hover:border-[#1A73E8]">Home</Link>
          {catLabel && (
            <>
              <span className="opacity-40 text-slate-300 hidden sm:inline-block">/</span>
              <Link href={catLink || '/calculator'} className="hover:text-[#1A73E8] transition-all text-[#5F6368] hidden sm:inline-block border-b border-transparent hover:border-[#1A73E8]">
                {catLabel}
              </Link>
            </>
          )}
          <span className="opacity-40 text-slate-300 hidden sm:inline-block">/</span>
          <span className="text-[#202124] truncate tracking-widest flex-1 sm:flex-none" title={title}>{title}</span>
        </div>
      </div>

      <main className="hp-container py-6 sm:py-8">
        {/* 2. Professional Header Section */}
        <header className="mb-6 sm:mb-8 border-b-2 border-slate-200/60 pb-5 flex flex-col sm:flex-row justify-between items-start gap-4">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#202124] tracking-tighter">
                {title}
              </h1>
              {autoPurpose && (
                <div className="flex items-center gap-1.5 px-4 py-1.5 bg-blue-50 text-[#1A73E8] text-[10px] font-black uppercase tracking-widest rounded-full border border-blue-100 shadow-sm">
                  <Info className="w-3.5 h-3.5" />
                  {autoPurpose}
                </div>
              )}
            </div>
            <p className="text-[15px] sm:text-base text-slate-600 font-medium leading-relaxed max-w-3xl">
              {description}
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={toggleFavorite} 
              className={`group flex items-center justify-center w-12 h-12 border-2 rounded-xl transition-all duration-300 shadow-sm active:scale-[0.98]
                ${isFavorite ? 'bg-yellow-50 border-yellow-300 text-yellow-500' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50 hover:border-slate-300 hover:text-yellow-500'}`}
              title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            >
              <Star className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
            <button 
              onClick={() => window.print()} 
              className="group flex items-center gap-2.5 px-6 py-3 bg-white border-2 border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-[11px] font-black uppercase tracking-[0.2em] text-slate-700 no-print active:scale-[0.98]"
            >
              <Printer className="w-4 h-4 text-slate-500 group-hover:text-blue-600 transition-colors" />
              Print Report
            </button>
          </div>
        </header>

        {/* 3. Main Content Area */}
        {/* PRINT ONLY: Top Level Results Stack (Guarantees Results Print First) */}
        {leftPanel && rightPanel && (
           <div className="hidden print:block w-full mb-10 pb-8 border-b-2 border-slate-900">
              <div className="text-xl font-black uppercase tracking-widest text-slate-900 mb-6 drop-shadow-sm">System Generated Results</div>
              <div className="print-result-wrapper">
                 {rightPanel}
              </div>
           </div>
        )}

        {topHeaderPanel && (
           <section className="w-full mb-8 print:hidden">
             {topHeaderPanel}
           </section>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-10 gap-x-8 items-start print:flex print:flex-col print:gap-y-6">
          {leftPanel && rightPanel ? (
            <>
              {/* Refactored 60/40 Split */}
              <section className="lg:col-span-6 space-y-6 print:w-full">
                <div className="print:block hidden text-sm font-black uppercase text-slate-500 mb-4 border-b pb-2">Calculation Inputs</div>
                <article className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden print:border-none print:shadow-none">
                  {leftPanel}
                </article>
              </section>
              <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-6 print:hidden">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                  {rightPanel}
                </div>
              </aside>
            </>
          ) : (
            <>
              {/* Backwards Compatible Single Column */}
              <section className="lg:col-span-10 space-y-6 print:w-full">
                {children}
              </section>
            </>
          )}
        </div>
        
        {/* 4. SEO Category Silo (Automated Internal Linking) */}
        {resolvedSlug && (
          <div className="hp-container pb-12">
             <RelatedCalculators currentSlug={resolvedSlug} category={calculatorData?.category || 'utility'} />
          </div>
        )}

        <section className="mt-12 pt-12 border-t border-slate-200 print:hidden">
          {renderCategoryGrid()}
        </section>

        {/* 4. Shared FAQ/Detail Section (Solves 'No Content' SEO Warning) */}
        <section className="mt-10 pt-8 border-t border-slate-200 print:hidden">
          {faqSection ? (
             <div className="prose prose-slate max-w-none prose-headings:text-[#202124] prose-a:text-[#1A73E8] prose-p:text-slate-600 prose-strong:text-black prose-sm font-medium">
                {faqSection}
             </div>
          ) : (
             <div className="prose prose-slate max-w-none prose-sm">
                 <h2 className="text-xl font-black text-[#202124] uppercase tracking-tight mb-4">Laboratory Standards: {title}</h2>
                 <p className="text-slate-600 leading-relaxed font-medium">As part of the <strong>NEPACALC primary precision ecosystem</strong>, this specific <em>{title}</em> is engineered to provide high-fidelity results for professional, academic, and financial workflows. Our <strong>data-driven methodology</strong> ensures that every calculation is performed using the latest mathematical algorithms and verified against current Nepal institutional benchmarks. By removing the complexity of manual estimation, NEPACALC empowers users in Kathmandu and throughout the provinces with professional-grade data analysis.</p>
                 
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 mb-10">
                     <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl">
                         <h4 className="text-[10px] font-black text-[#1A73E8] uppercase tracking-widest mb-2">Institutional Accuracy</h4>
                         <p className="text-[11px] text-slate-500 font-bold leading-relaxed">Every tool in the NEPACALC laboratory undergoes rigorous verification. We utilize advanced floating-point arithmetic to match both international SI units and local Nepal standardization mandates for various fiscal and scientific applications.</p>
                     </div>
                     <div className="p-5 bg-blue-50/50 border border-blue-100 rounded-2xl">
                         <h4 className="text-[10px] font-black text-[#1A73E8] uppercase tracking-widest mb-2">Research Documentation</h4>
                         <p className="text-[11px] text-slate-500 font-bold leading-relaxed">Built for high-performance and regulatory compliance, NEPACALC provides the authoritative digital foundation for decision-critical reports, engineering drafts, and academic research papers across the nation.</p>
                     </div>
                 </div>

                 <h3 className="text-lg font-black text-[#202124] uppercase tracking-tight mt-10 mb-5 border-l-4 border-blue-600 pl-4">Methodology & Scientific Rigor</h3>
                 <p className="text-slate-600 leading-relaxed font-medium mb-6">Our engineering team prioritizes <strong>Semantic Logical Accuracy (SLA)</strong>. This means the <em>{title}</em> doesn&apos;t just calculate numbers; it follows a validated logic path consistent with professional standards. Whether you are calculating financial TDS, engineering load capacities, or academic GPA scores, the underlying formulas are reviewed against the <strong>latest fiscal directives</strong> from the Nepal Inland Revenue Department (IRD) and other presiding governing bodies to maintain topical authority.</p>

                 <h3 className="text-lg font-black text-[#202124] uppercase tracking-tight mt-10 mb-6 border-l-4 border-blue-600 pl-4">Verification & Technical FAQ</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mt-4">
                    <div className="space-y-2">
                       <h4 className="text-[13px] font-black text-slate-900 leading-tight">1. How accurate is this calculator for professional use?</h4>
                       <p className="text-[12px] text-slate-500 leading-relaxed font-medium">NEPACALC uses high-precision arithmetic verified against local Nepal mandates to ensure results are suitable for professional, bank-ready, and academic documentation templates.</p>
                    </div>
                    <div className="space-y-2">
                       <h4 className="text-[13px] font-black text-slate-900 leading-tight">2. Does NEPACALC store my calculation data?</h4>
                       <p className="text-[12px] text-slate-500 leading-relaxed font-medium">Privacy is paramount. All calculations are performed local-first. NEPACALC does not record or transmit your input data, maintaining absolute user confidentiality and data security.</p>
                    </div>
                    <div className="space-y-2">
                       <h4 className="text-[13px] font-black text-slate-900 leading-tight">3. Is this tool compatible with modern mobile devices?</h4>
                       <p className="text-[12px] text-slate-500 leading-relaxed font-medium">Yes. The entire NEPACALC laboratory is built on a responsive mobile-first framework designed for high performance on both smartphones and professional workstations.</p>
                    </div>
                    <div className="space-y-2">
                       <h4 className="text-[13px] font-black text-slate-900 leading-tight">4. Are the formulas updated for the latest mandates?</h4>
                       <p className="text-[12px] text-slate-500 leading-relaxed font-medium">Our research team monitors IRD and Presiding Ministry mandates daily. Formulas are updated as soon as new guidelines are released by authorized bodies in Nepal.</p>
                    </div>
                 </div>

                 <div className="mt-12 p-6 bg-slate-900 rounded-3xl text-white">
                    <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 mb-2">Institutional References</h5>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-bold">
                       <a href="https://ird.gov.np" target="_blank" rel="nofollow noopener noreferrer" className="hover:text-blue-400 transition-colors flex items-center gap-1.5 underline decoration-blue-500/50">Nepal Inland Revenue Dept →</a>
                       <a href="https://nrb.org.np" target="_blank" rel="nofollow noopener noreferrer" className="hover:text-blue-400 transition-colors flex items-center gap-1.5 underline decoration-blue-500/50">Nepal Rastra Bank →</a>
                       <a href="https://nepal.gov.np" target="_blank" rel="nofollow noopener noreferrer" className="hover:text-blue-400 transition-colors flex items-center gap-1.5 underline decoration-blue-500/50">Government of Nepal →</a>
                    </div>
                 </div>
              </div>
          )}
        </section>
      </main>
    </div>
  );
}
