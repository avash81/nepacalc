import React, { ReactNode, Fragment } from 'react';
import Link from 'next/link';
import { Info, Sigma, HelpCircle, ChevronRight, Calculator, ArrowLeft, Heart, Search, Menu, User, Home, Activity, DollarSign, Settings } from 'lucide-react';
import { JsonLd } from '@/components/seo/JsonLd';

interface ModernCalcLayoutProps {
  title: string;
  description: string;
  icon?: React.ElementType;
  inputs: ReactNode;
  results: ReactNode;
  howToUse?: {
    steps: string[];
  };
  formula?: {
    title: string;
    description: string;
    latex?: string;
    raw?: string;
  };
  faqs?: {
    question: string;
    answer: string;
  }[];
  sidebar?: {
    title: string;
    links: { label: string; href: string }[];
    banner?: {
      title: string;
      description: string;
      image?: string;
    };
  };
  relatedTools?: { label: string; href: string }[];
  seoContent?: ReactNode;
  crumbs?: { label: string; href?: string }[];
}

export function ModernCalcLayout({
  title,
  description,
  icon: Icon = Calculator,
  inputs,
  results,
  howToUse,
  formula,
  faqs,
  sidebar,
  relatedTools,
  seoContent,
  crumbs
}: ModernCalcLayoutProps) {
  
  const faqSchema = faqs && faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  return (
    <div className="min-h-screen bg-[#F1F3F4] font-sans text-[#3C4043] pb-20 lg:pb-0">
      
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
              "priceCurrency": "NPR"
            }
          })
        }}
      />
      
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema)
          }}
        />
      )}

      {crumbs && crumbs.length > 0 && (
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
      )}

      <div className="max-w-[1280px] mx-auto px-4 py-6">
        
        {crumbs && crumbs.length > 0 && (
          <div className="mb-4 flex flex-wrap items-center gap-4">
            <button 
               onClick={() => window.history.length > 2 ? window.history.back() : (window.location.href = '/')}
               className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-[#5F6368] hover:text-[#1A73E8] transition-all border-r border-[#dadce0] pr-4 py-1"
            >
               <ArrowLeft className="w-4 h-4" /> <span>Back</span>
            </button>

            <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-2 text-[12px] font-medium text-[#5f6368]">
              <Link href="/" className="hover:text-[#1A73E8] hover:underline">Home</Link>
              {crumbs.map((c, i) => (
                <Fragment key={i}>
                  <span className="text-[#DADCE0]">/</span>
                  {c.href ? (
                    <Link href={c.href} className="hover:text-[#1A73E8] hover:underline">{c.label}</Link>
                  ) : (
                    <span className="text-[#202124] font-bold">{c.label}</span>
                  )}
                </Fragment>
              ))}
            </nav>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* MAIN CONTENT (2/3) */}
          <div className="flex-1 space-y-6">
            
            {/* 1. HERO CALCULATOR BOX */}
            <div className="bg-white border border-[#DADCE0] rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-[#DADCE0] flex items-center gap-3 bg-[#F8F9FA]">
                <div className="p-2 bg-white rounded-md border border-[#DADCE0]">
                  <Icon className="w-5 h-5 text-[#1A73E8]" />
                </div>
                <h1 className="text-xl font-medium text-[#202124]">{title}</h1>
              </div>
              
              <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-[#DADCE0]">
                {/* Inputs Area */}
                <div className="flex-1 p-8 bg-white">
                  {inputs}
                </div>
                
                {/* Result Summary Area */}
                <div className="w-full md:w-[320px] lg:w-[400px] p-6 bg-[#F8F9FA]">
                  <div className="bg-white border border-[#DADCE0] rounded-md overflow-hidden h-full flex flex-col">
                    <div className="px-4 py-2 border-b border-[#DADCE0] bg-white">
                      <h3 className="text-[11px] font-bold uppercase tracking-wider text-[#70757A]">Result Summary</h3>
                    </div>
                    <div className="flex-1 p-6 flex flex-col justify-center">
                      {results}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. RELATED TOOLS (CHIPS) */}
            {relatedTools && (
              <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-lg p-4 flex flex-wrap gap-2 items-center">
                <span className="text-[11px] font-bold uppercase text-[#70757A] mr-2">Related:</span>
                {relatedTools.map((tool, idx) => (
                  <Link 
                    key={idx} 
                    href={tool.href}
                    className="px-4 py-1.5 bg-white border border-[#DADCE0] rounded-full text-sm font-medium text-[#1A73E8] hover:bg-[#E8F0FE] hover:border-[#1A73E8] transition-all"
                  >
                    {tool.label}
                  </Link>
                ))}
              </div>
            )}

            {/* 3. HOW TO USE & FORMULA GRID */}
            {(howToUse || formula) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* How to Use */}
                {howToUse && (
                  <div className="bg-white border border-[#DADCE0] rounded-lg shadow-sm">
                    <div className="px-5 py-4 border-b border-[#DADCE0] flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-full bg-[#1A73E8] flex items-center justify-center">
                        <Info className="w-3.5 h-3.5 text-white" />
                      </div>
                      <h2 className="text-sm font-bold text-[#202124]">How to use this calculator</h2>
                    </div>
                    <div className="p-6">
                      <ul className="space-y-4">
                        {howToUse.steps.map((step, idx) => (
                          <li key={idx} className="flex gap-3 text-sm leading-relaxed text-[#5F6368]">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#1A73E8] mt-1.5 shrink-0" />
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Formula */}
                {formula && (
                  <div className="bg-white border border-[#DADCE0] rounded-lg shadow-sm">
                    <div className="px-5 py-4 border-b border-[#DADCE0] flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-full bg-[#1A73E8] flex items-center justify-center">
                        <Sigma className="w-3.5 h-3.5 text-white" />
                      </div>
                      <h2 className="text-sm font-bold text-[#202124]">{formula.title}</h2>
                    </div>
                    <div className="p-6 space-y-4">
                      <p className="text-sm text-[#5F6368] leading-relaxed">
                        {formula.description}
                      </p>
                      {formula.raw && (
                        <div className="p-4 bg-[#F8F9FA] border border-[#DADCE0] rounded font-mono text-[13px] text-[#202124] overflow-x-auto whitespace-pre">
                          {formula.raw}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 4. FAQ SECTION */}
            {faqs && faqs.length > 0 && (
              <div className="bg-white border border-[#DADCE0] rounded-lg shadow-sm">
                <div className="px-6 py-5 border-b border-[#DADCE0]">
                  <h2 className="text-base font-bold text-[#202124]">Frequently Asked Questions</h2>
                </div>
                <div className="divide-y divide-[#DADCE0]">
                  {faqs.map((faq, idx) => (
                    <div key={idx} className="p-6 space-y-3">
                      <h3 className="text-sm font-bold text-[#202124]">{faq.question}</h3>
                      <p className="text-sm text-[#5F6368] leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. SEO CONTENT */}
            {seoContent && (
              <div className="bg-white border border-[#DADCE0] rounded-lg shadow-sm p-6 prose prose-sm max-w-none prose-slate text-[#3C4043]">
                {seoContent}
              </div>
            )}
          </div>

          {/* SIDEBAR (1/3) */}
          <div className="w-full lg:w-[320px] space-y-6 no-print">
            
            {/* 5. OTHER TOOLS LIST */}
            {sidebar && (
              <div className="bg-white border border-[#DADCE0] rounded-lg shadow-sm overflow-hidden">
                <div className="px-5 py-4 bg-[#E8F0FE] border-b border-[#DADCE0]">
                  <h2 className="text-[13px] font-bold text-[#1967D2]">{sidebar.title}</h2>
                </div>
                <div className="divide-y divide-[#DADCE0]">
                  {sidebar.links.map((link, idx) => (
                    <Link 
                      key={idx} 
                      href={link.href}
                      className="flex items-center justify-between p-4 hover:bg-[#F8F9FA] transition-colors group"
                    >
                      <span className="text-sm font-medium text-[#3C4043] group-hover:text-[#1A73E8]">{link.label}</span>
                      <ChevronRight className="w-4 h-4 text-[#70757A] group-hover:text-[#1A73E8]" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* 6. BANNER / PROMO */}
            {sidebar?.banner && (
              <div className="bg-white border border-[#DADCE0] rounded-lg shadow-sm p-5 space-y-4">
                {sidebar.banner.image && (
                  <div className="aspect-video bg-[#F8F9FA] rounded border border-[#DADCE0] flex items-center justify-center overflow-hidden">
                    <img src={sidebar.banner.image} alt="Banner" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-[#202124]">{sidebar.banner.title}</h3>
                  <p className="text-[13px] text-[#5F6368] leading-relaxed">
                    {sidebar.banner.description}
                  </p>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* MOBILE BOTTOM NAV */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#DADCE0] px-4 py-2 flex justify-around items-center z-50">
        {[
          { label: 'Health', icon: Activity, active: true },
          { label: 'Finance', icon: DollarSign },
          { label: 'Math', icon: Calculator },
          { label: 'Convert', icon: Home },
        ].map((item) => (
          <button key={item.label} className="flex flex-col items-center gap-1 p-2">
            <item.icon className={`w-5 h-5 ${item.active ? 'text-[#1A73E8]' : 'text-[#5F6368]'}`} />
            <span className={`text-[10px] font-medium ${item.active ? 'text-[#1A73E8]' : 'text-[#5F6368]'}`}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
