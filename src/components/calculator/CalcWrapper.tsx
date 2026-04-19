'use client';

import React, { Fragment } from 'react';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';
import { JsonLd } from '@/components/seo/JsonLd';
import { CategorySidebar } from '@/components/layout/CategorySidebar';

interface Props {
  title: string;
  description: string;
  crumbs: { label: string; href?: string }[];
  isNepal?: boolean;
  relatedCalcs?: { name: string; slug: string }[];
  children: ReactNode;
  formula?: string;
}

export function CalcWrapper({
  title, description, crumbs, isNepal,
  children, formula, relatedCalcs
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

      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 pt-24 pb-20">
        
        {/* Breadcrumb Path */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-[13px] font-medium text-[#5f6368]">
          <Link href="/" className="hover:text-blue-600 hover:underline">Home</Link>
          {crumbs.map((c, i) => (
            <Fragment key={i}>
              <span className="text-slate-300">/</span>
              {c.href ? (
                <Link href={c.href} className="hover:text-blue-600 hover:underline">{c.label}</Link>
              ) : (
                <span className="text-[#202124] font-bold">{c.label}</span>
              )}
            </Fragment>
          ))}
        </nav>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* 1. Left Sidebar (Fixed 200px Category Navigator) */}
          <aside className="hidden lg:block w-[200px] shrink-0 sticky top-24">
            <CategorySidebar />
          </aside>

          {/* 2. Main Content Area */}
          <main className="flex-1 min-w-0">
            <header className="mb-10 pb-8 border-b border-[#dadce0]">
              <h1 className="text-3xl sm:text-4xl font-black text-[#202124] tracking-tight mb-4 lowercase first-letter:uppercase">
                {title}
              </h1>
              <p className="text-[#5f6368] text-lg font-medium leading-relaxed max-w-2xl">
                {description}
              </p>
            </header>

            <section className="calculator-area">
              {children}
            </section>

            {/* Static Content / Strategy Layer */}
            {formula && (
               <section className="mt-16 pt-12 border-t border-[#dadce0]">
                  <h2 className="text-xl font-black text-[#202124] tracking-tight mb-6">How it works</h2>
                  <div className="bg-[#f8f9fa] p-6 rounded-2xl border border-[#dadce0] font-mono text-sm text-[#5f6368] overflow-x-auto">
                    {formula}
                  </div>
               </section>
            )}

            {/* Related Tools Discovery */}
            {relatedCalcs && relatedCalcs.length > 0 && (
              <section className="mt-16 pt-12 border-t border-[#dadce0]">
                <h2 className="text-xl font-black text-[#202124] tracking-tight mb-8">Related Calculators</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedCalcs.map((calc, i) => (
                    <Link 
                      key={i} 
                      href={`/calculator/${calc.slug}`}
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
          </main>
        </div>
      </div>
    </div>
  );
}
