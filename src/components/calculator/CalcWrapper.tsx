'use client';

import React, { Fragment } from 'react';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { JsonLd } from '@/components/seo/JsonLd';


interface Props {
  title: string;
  description: string;
  crumbs: { label: string; href?: string }[];
  isNepal?: boolean;
  relatedCalcs?: { name: string; slug: string }[];
  children: ReactNode;
  formula?: string;
  hideHeader?: boolean;
  disableSchema?: boolean;
}

export function CalcWrapper({
  title, description, crumbs, isNepal,
  children, formula, relatedCalcs, hideHeader = false, disableSchema = false
}: Props) {
  return (
    <div lang={isNepal ? 'ne' : 'en'} className="min-h-screen bg-white">
      <JsonLd 
        type="breadcrumb"
        breadcrumbItems={[
          { name: 'Home', item: 'https://nepacalc.com' },
          ...crumbs.map(c => ({
              name: c.label,
              item: c.href ? `https://nepacalc.com${c.href}` : undefined
          })).filter((x): x is { name: string, item: string } => !!x.item)
        ]}
      />

      {!disableSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": title,
              "description": description,
              "applicationCategory": "UtilitiesApplication",
              "operatingSystem": "All",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              }
            })
          }}
        />
      )}

      <div className="max-w-[94%] mx-auto px-4 sm:px-6 pt-4">
        
        { !hideHeader && (
          <>
            {/* Breadcrumb Path & Back Button */}
            <div className="mb-2 flex flex-wrap items-center gap-4">
              <button 
                onClick={() => window.history.length > 2 ? window.history.back() : (window.location.href = '/')}
                className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-[#5F6368] hover:text-blue-600 transition-all border-r border-[#dadce0] pr-4 py-1"
              >
                <ArrowLeft className="w-4 h-4" /> <span>Back</span>
              </button>

              <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-2 text-[13px] font-medium text-[#5f6368]">
                {/* Only show explicit Home if not already the first crumb */}
                {crumbs[0]?.label.toLowerCase() !== 'home' && (
                  <Link href="/" className="hover:text-blue-600 hover:underline">Home</Link>
                )}
                {crumbs.map((c, i) => (
                  <Fragment key={i}>
                    { (i > 0 || crumbs[0]?.label.toLowerCase() !== 'home') && <span className="text-slate-300">/</span> }
                    {c.href ? (
                      <Link href={c.href} className="hover:text-blue-600 hover:underline">{c.label}</Link>
                    ) : (
                      <span className="text-[#202124] font-bold">{c.label}</span>
                    )
                    }
                  </Fragment>
                ))}
              </nav>
            </div>

            <header className="mb-2 pb-2 border-b border-[#dadce0]">
              <h1 className="text-3xl sm:text-4xl font-black text-[#202124] tracking-tight mb-4 lowercase first-letter:uppercase">
                {title}
              </h1>
              <p className="text-[#5f6368] text-lg font-medium leading-relaxed max-w-2xl">
                {description}
              </p>
            </header>
          </>
        )}

        <div>
          {/* Main Content Area */}
          <main className="w-full">


            <section className="calculator-area">
              {children}
            </section>

            {/* Static Content / Strategy Layer */}
            {formula && (
               <section className="mt-6 pt-6 border-t border-[#dadce0]">
                  <h2 className="text-xl font-black text-[#202124] tracking-tight mb-4">How it works</h2>
                  <div className="bg-[#f8f9fa] p-6 rounded-2xl border border-[#dadce0] font-mono text-sm text-[#5f6368] overflow-x-auto">
                    {formula}
                  </div>
               </section>
            )}

            {/* Related Tools Discovery */}
            {relatedCalcs && relatedCalcs.length > 0 && (
              <section className="mt-6 pt-6 border-t border-[#dadce0]">
                <h2 className="text-xl font-black text-[#202124] tracking-tight mb-4">Related Calculators</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedCalcs.map((calc, i) => (
                    <Link 
                      key={i} 
                      href={calc.slug.startsWith('/') ? (calc.slug.endsWith('/') ? calc.slug : `${calc.slug}/`) : `/calculator/${calc.slug}/`}
                      className="p-5 bg-white border border-[#dadce0] rounded-2xl hover:border-blue-500 hover:bg-blue-50/50 transition-all flex items-center justify-between group"
                    >
                      <span className="text-[14px] font-bold text-[#202124] group-hover:text-blue-600 transition-colors">
                        {calc.name}
                      </span>
                      <ChevronRight className="w-4 h-4 text-[#dadce0] group-hover:text-blue-600 transition-colors" />
                    </Link>
                  ))}
                </div>
              </section>
            )}
            <div className="mt-10 sm:mt-12 pt-8 border-t border-slate-200" aria-hidden="true" />
          </main>
        </div>
      </div>
    </div>
  );
}

