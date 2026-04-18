'use client';

import React from 'react';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { TrendingSidebar } from '@/components/layout/TrendingSidebar';
import { ChevronRight, ArrowLeft, ShieldCheck, Globe } from 'lucide-react';
import { JsonLd } from '@/components/seo/JsonLd';

interface Props {
  title: string;
  description: string;
  crumbs: { label: string; href?: string }[];
  isNepal?: boolean;
  relatedCalcs?: { name: string; slug: string }[];
  children: ReactNode;
  formula?: string;
}

/**
 * CalcWrapper — Phase 4 Premium Layout & A11y
 * 
 * Standardized wrapper for all 60+ calculators.
 * Implements high-aesthetics grid, sidebar retention, and full ARIA compliance.
 */
export function CalcWrapper({
  title, description, crumbs, isNepal,
  children, formula, relatedCalcs
}: Props) {
  return (
    <div lang={isNepal ? 'ne' : 'en'} className="min-h-screen bg-[#FDFDFD] dark:bg-gray-950 transition-colors duration-300">
      <JsonLd 
        type="breadcrumb"
        breadcrumbItems={[
          { name: 'Home', item: 'https://nepacalc.com' },
          ...crumbs.map(c => ({
              name: c.label,
              item: c.href ? `https://nepacalc.com${c.href}` : `https://nepacalc.com/calculator/${title.toLowerCase().replace(/ /g, '-')}`
          }))
        ]}
      />
      <div className="max-w-7xl mx-auto px-4 pt-24 pb-12 sm:pb-20">

        <div className="flex items-center justify-between mb-12 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-4 rounded-[2rem] shadow-sm">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => window.history.back()}
              className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.15em] text-gray-500 hover:text-blue-600 transition-all border-r border-gray-100 dark:border-gray-800 pr-8 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1.5 transition-transform" />
              Back
            </button>
            <nav aria-label="Breadcrumb" className="text-[10px] font-black uppercase tracking-[0.15em] text-gray-400 dark:text-gray-500 flex items-center gap-2 flex-wrap">
              <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</Link>
              {crumbs.map((c, i) => (
                <React.Fragment key={i}>
                  <ChevronRight className="w-3 h-3 text-gray-300 dark:text-gray-800" />
                  {c.href ? (
                    <Link href={c.href} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{c.label}</Link>
                  ) : (
                    <span className="text-gray-900 dark:text-gray-200" aria-current="page">{c.label}</span>
                  )}
                </React.Fragment>
              ))}
            </nav>
          </div>
        </div>

        {/* ── HEADER ────────────────────────────────────────────── */}
        <header className="mb-8 max-w-3xl">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-6 tracking-tight leading-tight">
            {title}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-xl leading-relaxed font-medium">
            {description}
          </p>
          
          {isNepal && (
            <div className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-red-600 dark:text-red-400 bg-red-50/50 dark:bg-red-900/10 border border-red-100/50 dark:border-red-900/20 rounded-2xl px-6 py-2.5 mt-8 animate-in fade-in slide-in-from-left-4">
              <span className="w-2 h-2 bg-red-600 dark:bg-red-400 rounded-full animate-pulse shadow-sm shadow-red-500/50" />
              Verified Nepal Fiscal Mandates
            </div>
          )}
        </header>

        {/* ── CORE CONTENT GRID ────────────────────────────────── */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-10 items-start">
          <main className="space-y-12">
            <section aria-label="Calculator Tool">
              {children}
            </section>

            {/* ── METHODOLOGY ───────────────────────────────────────── */}
            {formula && (
               <section className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[2.5rem] p-8 sm:p-12 shadow-sm animate-in fade-in duration-700">
                  <h2 className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.4em] mb-8 flex items-center gap-3">
                    <div className="w-1.5 h-4 bg-blue-600 rounded-full" />
                    How we calculate
                  </h2>
                  <div className="font-mono text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-950 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 inline-block shadow-inner w-full overflow-x-auto whitespace-pre-wrap">
                    {formula}
                  </div>
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    <p className="text-[10px] text-gray-400 font-bold leading-relaxed uppercase tracking-widest">
                      Our algorithms are verified against official Nepal IRD guidelines and international financial standards. 
                      Updated regularly for current regulatory integrity.
                    </p>
                    <div className="flex gap-4 items-center">
                       <div className="h-px bg-gray-50 dark:bg-gray-800 flex-1" />
                       <span className="text-[8px] font-black text-gray-300 dark:text-gray-700 uppercase tracking-widest">Algorithm V4.0.0</span>
                    </div>
                  </div>
               </section>
            )}
            {/* ── RELATED TOOLS (SEO LINK EQUITY) ───────────────────── */}
            {relatedCalcs && relatedCalcs.length > 0 && (
              <section className="pt-8">
                <h2 className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.4em] mb-8 flex items-center gap-3">
                  <div className="w-1.5 h-4 bg-orange-500 rounded-full" />
                  Related Professional Units
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedCalcs.map((calc, i) => (
                    <Link 
                      key={i} 
                      href={`/calculator/${calc.slug}`}
                      className="group p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[2rem] hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/5 transition-all flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-lg group-hover:scale-110 transition-transform">
                            📋
                         </div>
                         <span className="text-sm font-bold text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                           {calc.name}
                         </span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-300 dark:text-gray-700 group-hover:text-blue-500 transform group-hover:translate-x-1 transition-all" />
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </main>

          {/* ── SIDEBAR (Retention/SEO) ─────────────────────────── */}
          <aside className="sticky top-10 space-y-8 hidden xl:block">
            <TrendingSidebar currentSlug={crumbs.length > 0 ? crumbs[crumbs.length - 1].label.toLowerCase().replace(/\s+/g, '-') : undefined} />
            {/* Removed Power Optimization Block for spatial efficiency */}
          </aside>
        </div>

        {/* ── FOOTER & COMPLIANCE ─────────────────────────────── */}
        <footer className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-900 space-y-8">
          
          {/* Mobile Trending Hub (only visible on mobile) */}
          <div className="xl:hidden border-b border-gray-50 dark:border-gray-900 pb-12">
            <TrendingSidebar />
          </div>

          <div className="bg-slate-50 dark:bg-gray-900/50 border border-slate-100 dark:border-gray-800 rounded-[2.5rem] p-6 sm:p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-blue-600/10 transition-colors" />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start relative z-10">
               <div className="space-y-6">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-0.5 bg-blue-600" />
                     <h3 className="text-[10px] font-black text-blue-800 dark:text-blue-400 uppercase tracking-[0.3em]">Institutional Verification</h3>
                  </div>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed font-bold">
                    NEPACALC maintains strict mathematical integrity aligned with latest Nepal regulations and international standards. 
                    Computed results are verified against official IRD and NRB mandates for current fiscal accuracy.
                  </p>
                  <div className="flex flex-wrap gap-4">
                     <span className="flex items-center gap-2 text-[8px] font-black uppercase text-blue-600 border border-blue-200 bg-blue-50 px-3 py-1.5 rounded-full">
                        <ShieldCheck className="w-3 h-3" /> PRECISION V4
                     </span>
                     <span className="flex items-center gap-2 text-[8px] font-black uppercase text-gray-400 border border-gray-200 px-3 py-1.5 rounded-full">
                        <Globe className="w-3 h-3" /> PRIVATE COMPUTE
                     </span>
                  </div>
               </div>

               <div className="space-y-6 lg:border-l lg:border-gray-200/50 dark:lg:border-gray-800 lg:pl-12">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-0.5 bg-red-600" />
                     <h3 className="text-[10px] font-black text-red-800 dark:text-red-400 uppercase tracking-[0.3em]">Compliance Notice</h3>
                  </div>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 leading-relaxed font-bold italic">
                    All calculations are provided for planning and informational purposes only. This service is not a substitute for certified financial or legal consultation. User acknowledges that algorithmic outputs depend on browser-side execution accuracy.
                  </p>
                  <div className="text-[9px] font-black text-gray-300 dark:text-gray-700 uppercase tracking-[0.2em] pt-2">
                    &copy; NEPACALC Research &middot; Institutional Edition
                  </div>
               </div>
            </div>
          </div>
          
          <div className="pb-16" />
        </footer>

        {/* ── BREADCRUMB SCHEMA (SEO MASTERY) ──────────────────── */}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              'itemListElement': [
                { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://NEPACALC.com' },
                ...crumbs.map((c, i) => ({
                  '@type': 'ListItem',
                  'position': i + 2,
                  'name': c.label,
                  'item': c.href ? `https://NEPACALC.com${c.href}` : undefined
                })).filter(x => x.item)
              ]
            })
          }}
        />
      </div>
    </div>
  );
}
