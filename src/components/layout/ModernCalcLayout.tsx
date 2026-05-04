'use client';
import React, { ReactNode, Fragment, useState, useEffect, useCallback, lazy, Suspense } from 'react';
import Link from 'next/link';
import { Info, Sigma, HelpCircle, ChevronRight, Calculator, ArrowLeft, Heart, Search, Menu, User, Home, Activity, DollarSign, Settings, CheckCircle2, TrendingUp, AlertCircle } from 'lucide-react';
import { JsonLd } from '@/components/seo/JsonLd';
import { TIER1_SEO_CONTENT } from '@/data/seo-content';
import { usePathname } from 'next/navigation';
import { RecentSidebar } from './RecentSidebar';
import { CALCULATORS } from '@/data/calculators';
import type { MarketRate } from '@/utils/market/fetchRates';

interface ModernCalcLayoutProps {
  title: string;
  description: string;
  icon?: React.ElementType;
  inputs: ReactNode;
  results: ReactNode;
  howToUse?: { steps: string[] };
  formula?: { title: string; description: string; latex?: string; raw?: string };
  faqs?: { question: string; answer: string }[];
  sidebar?: {
    title: string;
    subtitle?: string;
    links: { label: string; href: string; icon?: React.ElementType }[];
    banner?: { title: string; description: string; buttonText?: string; image?: string };
    rates?: { title: string; items: { label: string; value: string }[]; footer?: string };
    whyUs?: { title: string; items: { title: string; description: string; icon?: React.ElementType }[] };
  };
  relatedTools?: { label: string; href: string }[];
  seoContent?: ReactNode;
  auditPanel?: ReactNode;
  details?: ReactNode;
  crumbs?: { label: string; href?: string }[];
  slug?: string;
  fullWidth?: boolean;
  ads?: { top?: ReactNode; sidebar?: ReactNode; bottom?: ReactNode; inContent?: ReactNode };
  hideH1?: boolean;
  intro?: ReactNode;
  customSchema?: object;
}

export function ModernCalcLayout({
  title, description, icon: Icon = Calculator, inputs, results, howToUse, formula, faqs, sidebar, relatedTools, seoContent, auditPanel, details, crumbs, slug, fullWidth = false, ads, hideH1 = false, intro, customSchema
}: ModernCalcLayoutProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [liveRates, setLiveRates] = useState<MarketRate[]>([]);
  const [lastUpdate, setLastUpdate] = useState<string>('');
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Defer market rates fetch ,  don't block initial paint
  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        const { getLatestRates } = await import('@/utils/market/fetchRates');
        const rates = getLatestRates();
        setLiveRates(rates);
        setLastUpdate(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }));
      } catch (e) { /* silent */ }
    }, 800); // defer 800ms after first paint
    return () => clearTimeout(timer);
  }, []);

  const effectiveSlug = slug || pathname?.split('/').filter(Boolean).pop();
  const seoEntry = effectiveSlug ? TIER1_SEO_CONTENT[effectiveSlug] : null;

  const enrichedSEO = seoContent || seoEntry?.content;
  const enrichedFAQs = (faqs && faqs.length > 0) ? faqs : seoEntry?.faqs || [];
  const enrichedHowTo = howToUse || seoEntry?.howToUse;
  const enrichedFormula = formula || seoEntry?.formula;

  // Track History
  useEffect(() => {
    if (!title || !pathname || typeof window === 'undefined') return;
    try {
      const history = JSON.parse(localStorage.getItem('cp_recent') || '[]');
      const normalizedPath = normalizeLink(pathname) as string;
      const current = { label: title, href: normalizedPath };
      const filtered = history.filter((h: any) => h.href !== normalizedPath);
      const newHistory = [current, ...filtered].slice(0, 12);
      localStorage.setItem('cp_recent', JSON.stringify(newHistory));
    } catch (e) {
      console.warn('Failed to save history', e);
    }
  }, [title, pathname]);

  const normalizeLink = (href: string | undefined) => {
    if (!href) return href;
    if (href.startsWith('http')) return href;
    let normalized = href.startsWith('/') ? href : `/${href}`;
    if (!normalized.endsWith('/')) normalized += '/';
    return normalized;
  };

  const faqSchema = (enrichedFAQs && enrichedFAQs.length > 0) ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": enrichedFAQs.map(f => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": { "@type": "Answer", "text": f.answer }
    }))
  } : null;

  const howToSchema = (howToUse && howToUse.steps.length > 0) ? {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `How to use ${title}`,
    "description": description,
    "step": howToUse.steps.map((s, i) => ({
      "@type": "HowToStep",
      "position": i + 1,
      "text": s,
      "name": `Step ${i + 1}`
    }))
  } : null;

  const category = CALCULATORS.find(c => c.slug === effectiveSlug)?.category || 'General';

  return (
    <div className="min-h-screen bg-[#F1F3F4] font-sans text-[#3C4043] pb-20 lg:pb-0 selection:bg-blue-100">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": title,
        "description": description,
        "image": "https://nepacalc.com/logo.png",
        "applicationCategory": "BusinessApplication, FinanceApplication, EducationApplication",
        "operatingSystem": "All",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "NPR" },
        "publisher": {
          "@type": "Organization",
          "name": "NepaCalc",
          "url": "https://nepacalc.com",
          "logo": {
            "@type": "ImageObject",
            "url": "https://nepacalc.com/logo.png",
            "width": "1024",
            "height": "1024"
          }
        }
      })}} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      {howToSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />}
      {customSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(customSchema) }} />}
      {crumbs && crumbs.length > 0 && (
        <JsonLd type="breadcrumb" breadcrumbItems={[
          { name: 'Home', item: 'https://nepacalc.com' },
          ...crumbs.map(c => ({ name: c.label, item: c.href ? `https://nepacalc.com${normalizeLink(c.href)}` : undefined })).filter((x): x is { name: string, item: string } => !!x.item)
        ]} />
      )}
      <div className="max-w-[1280px] mx-auto px-4 pt-4 pb-8">
        <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#dadce0] pb-4">
          <div>
            {crumbs && crumbs.length > 0 && (
              <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1.5 text-[11px] font-medium text-[#5f6368] mb-2 uppercase tracking-wider">
                <Link href="/" className="hover:text-[#1A73E8]">Home</Link>
                {crumbs.map((c, i) => (
                  <Fragment key={i}>
                    <span className="text-[#DADCE0] scale-75">/</span>
                    {c.href ? <Link href={normalizeLink(c.href) as string} className="hover:text-[#1A73E8]">{c.label}</Link> : <span className="text-[#5f6368]">{c.label}</span>}
                  </Fragment>
                ))}
              </nav>
            )}
            {!hideH1 && <h1 className="text-3xl sm:text-4xl font-bold text-[#202124] tracking-tight mb-1">{title}</h1>}
          </div>
          <div className="flex items-center gap-3">
             <button onClick={() => window.print()} className="hidden sm:flex items-center gap-1.5 text-[11px] font-bold text-[#5F6368] hover:text-[#1A73E8] transition-all bg-white px-3 py-1.5 border border-[#dadce0] rounded-md shadow-sm">
                <span>Print</span>
             </button>
             <button onClick={() => window.history.length > 2 ? window.history.back() : (window.location.href = '/')} className="flex items-center gap-1.5 text-[11px] font-bold text-[#5F6368] hover:text-[#1A73E8] transition-all bg-white px-3 py-1.5 border border-[#dadce0] rounded-md shadow-sm">
                <ArrowLeft className="w-3.5 h-3.5" /> <span>Back</span>
             </button>
          </div>
        </div>
        {intro && <div className="mb-8">{intro}</div>}
        {ads?.top && <div className="mb-6 flex justify-center no-print">{ads.top}</div>}
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-1 space-y-6">
            <div className="bg-white border border-[#DADCE0] rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-[#DADCE0] flex items-center gap-3 bg-[#F8F9FA]">
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-[#5F6368]" />
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#5F6368]">Calculator Engine</span>
                </div>
              </div>
              {fullWidth ? <div className="p-0">{inputs}</div> : (
                <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-[#DADCE0]">
                  <div className="flex-1 p-4 lg:p-6 bg-white">{inputs}</div>
                  <div className="w-full md:w-[320px] lg:w-[450px] p-4 bg-white">
                    <div className="bg-white border border-[#DADCE0] rounded-md overflow-hidden h-full flex flex-col shadow-sm">
                      <div className="px-4 py-2.5 border-b border-[#DADCE0] bg-[#F8F9FA]">
                        <h3 className="text-[11px] font-bold uppercase tracking-wider text-[#70757A]">Result Summary</h3>
                      </div>
                      <div className="flex-1 p-6 flex flex-col justify-center bg-white">{results}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {ads?.inContent && <div className="flex justify-center no-print">{ads.inContent}</div>}
            {details && <div className="details-container space-y-6">{details}</div>}
            {(enrichedHowTo || enrichedFormula) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {enrichedHowTo && (
                  <div className="bg-white border border-[#DADCE0] rounded-lg shadow-sm">
                    <div className="px-5 py-4 border-b border-[#DADCE0] flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-full bg-[#1A73E8] flex items-center justify-center"><Info className="w-3.5 h-3.5 text-white" /></div>
                      <h2 className="text-sm font-bold text-[#202124]">How to use</h2>
                    </div>
                    <div className="p-6">
                      <ul className="space-y-4">
                        {enrichedHowTo.steps.map((step, idx) => (
                          <li key={idx} className="flex gap-3 text-sm leading-relaxed text-[#5F6368]">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#1A73E8] mt-1.5 shrink-0" />
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
                {enrichedFormula && (
                  <div className="bg-white border border-[#DADCE0] rounded-lg shadow-sm">
                    <div className="px-5 py-4 border-b border-[#DADCE0] flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-full bg-[#1A73E8] flex items-center justify-center"><Sigma className="w-3.5 h-3.5 text-white" /></div>
                      <h2 className="text-sm font-bold text-[#202124]">{enrichedFormula.title}</h2>
                    </div>
                    <div className="p-6 space-y-4">
                      <p className="text-sm text-[#5F6368] leading-relaxed">{enrichedFormula.description}</p>
                      {enrichedFormula.raw && <div className="p-4 bg-[#F8F9FA] border border-[#DADCE0] rounded font-mono text-[13px] text-[#202124] overflow-x-auto whitespace-pre">{enrichedFormula.raw}</div>}
                      {(enrichedFormula as any).variables && (
                        <div className="space-y-1.5 pt-2">
                           {(enrichedFormula as any).variables.map((v: string, i: number) => (
                             <p key={i} className="text-[11px] text-[#70757A] flex items-center gap-2">
                               <span className="w-1 h-1 rounded-full bg-[#dadce0]" /> {v}
                             </p>
                           ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
            {enrichedSEO && (
              <Suspense fallback={<div className="h-32 bg-white border border-[#DADCE0] rounded-lg animate-pulse" />}>
                <div className="seo-content-section bg-white border border-[#DADCE0] rounded-lg shadow-sm p-6 lg:p-8 prose prose-sm max-w-none prose-slate text-[#3C4043] prose-headings:text-[#202124] prose-headings:font-bold prose-h2:text-xl prose-h3:text-lg">
                  {enrichedSEO}
                </div>
              </Suspense>
            )}
            {auditPanel && (
              <div className="audit-panel-section space-y-6">
                {auditPanel}
              </div>
            )}
            {enrichedFAQs && enrichedFAQs.length > 0 && (
              <div className="faq-section bg-white border border-[#DADCE0] rounded-lg shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-[#DADCE0] flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-[#1A73E8]" />
                  <h2 className="text-base font-black text-[#202124]">Frequently Asked Questions</h2>
                </div>
                <div className="divide-y divide-[#DADCE0]">
                  {enrichedFAQs.map((faq, idx) => (
                    <div key={idx} className="bg-white">
                      <button onClick={() => setOpenFaq(openFaq === idx ? null : idx)} className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#F8F9FA] transition-all group">
                        <h3 className={`text-sm font-bold pr-8 transition-colors ${openFaq === idx ? 'text-[#1A73E8]' : 'text-[#202124]'}`}>{faq.question}</h3>
                        <ChevronRight className={`w-4 h-4 text-[#70757A] transition-transform duration-300 ${openFaq === idx ? 'rotate-90 text-[#1A73E8]' : ''}`} />
                      </button>
                      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === idx ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="px-6 pb-6 text-sm leading-relaxed text-[#5F6368] border-t border-[#F1F3F4] pt-4">{faq.answer}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
          <div className="w-full lg:w-[320px] space-y-8 no-print">
            <div className="space-y-8">
            <RecentSidebar />
            {sidebar && (
              <div className="bg-white border border-[#DADCE0] rounded-lg shadow-sm overflow-hidden">
                <div className="px-5 py-4 bg-white border-b border-[#DADCE0]">
                  <h2 className="text-[13px] font-black text-[#202124] uppercase tracking-wider">{sidebar.title}</h2>
                  {sidebar.subtitle && <p className="text-[10px] font-bold text-[#70757A] uppercase mt-1">{sidebar.subtitle}</p>}
                </div>
                <div className="p-4 space-y-2">
                  {sidebar.links.map((link, idx) => (
                    <Link key={idx} href={normalizeLink(link.href) as string} className="flex items-center gap-3 p-3 rounded-md hover:bg-[#F8F9FA] transition-all group">
                      <div className="w-8 h-8 rounded-lg bg-[#F1F3F4] group-hover:bg-[#E8F0FE] flex items-center justify-center transition-colors">
                        {link.icon ? <link.icon className="w-4 h-4 text-[#5F6368] group-hover:text-[#1A73E8]" /> : <ChevronRight className="w-4 h-4 text-[#5F6368] font-black" />}
                      </div>
                      <span className="text-sm font-bold text-[#3C4043] group-hover:text-[#1A73E8]">{link.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {sidebar?.banner && (
              <div className="relative rounded-lg overflow-hidden shadow-md group">
                <div className="absolute inset-0 bg-[#1A73E8] opacity-90 group-hover:opacity-95 transition-opacity" />
                <div className="relative p-6 space-y-4">
                  <h3 className="text-base font-black text-white leading-tight">{sidebar.banner.title}</h3>
                  <p className="text-[11px] text-blue-50 font-bold leading-relaxed">{sidebar.banner.description}</p>
                  <button className="bg-white text-[#1A73E8] text-[11px] font-black uppercase tracking-widest px-6 py-2.5 rounded-md shadow-lg hover:scale-105 transition-transform">{sidebar.banner.buttonText || 'Get Advice'}</button>
                </div>
              </div>
            )}
            <div className="bg-white border border-[#DADCE0] rounded-lg shadow-sm overflow-hidden mb-8 transition-all hover:shadow-md">
              <div className="px-6 py-5 border-b border-[#DADCE0] bg-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#D93025] rounded-full animate-pulse shadow-[0_0_8px_rgba(217,48,37,0.5)]" />
                  <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Financial Rates</h3>
                </div>
                <div className="flex items-center gap-2">
                   <span className="text-[8px] font-bold text-[#70757A] uppercase">Live</span>
                </div>
              </div>
              <div className="p-4 space-y-3">
                 <div className="flex justify-between items-center text-[9px] text-[#70757A] font-bold uppercase tracking-widest mb-1"><span>Metric</span><span>Value</span></div>
                 {liveRates.length > 0 ? liveRates.map((item, i) => (
                   <div key={i} className="flex justify-between items-center text-sm group cursor-help border-b border-[#F8F9FA] pb-2 last:border-0 last:pb-0">
                      <span className="text-[#5F6368] font-medium group-hover:text-[#1A73E8] transition-colors">{item.label}</span>
                      <div className="flex items-center gap-2">
                        {item.trend === 'up' && <TrendingUp className="w-3 h-3 text-[#188038]" />}
                        {item.trend === 'down' && <TrendingUp className="w-3 h-3 text-[#D93025] rotate-180" />}
                        <span className="font-black text-[#202124]">{item.value}</span>
                      </div>
                   </div>
                 )) : <div className="py-4 flex flex-col items-center gap-2 opacity-40"><div className="w-4 h-4 border-2 border-[#1A73E8] border-t-transparent rounded-full animate-spin" /></div>}
                 <div className="pt-3 border-t border-[#F1F3F4] flex items-center justify-between">
                    <p className="text-[9px] font-black text-[#202124] uppercase tracking-tighter">Verified Data</p>
                    <p className="text-[9px] font-bold text-[#70757A]">{lastUpdate}</p>
                 </div>
              </div>
            </div>
            {sidebar?.whyUs && (
              <div className="bg-white border border-[#DADCE0] rounded-lg shadow-sm p-6 space-y-5">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1A73E8]" />
                  <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">{sidebar.whyUs.title}</h3>
                </div>
                <div className="space-y-4">
                  {sidebar.whyUs.items.map((item, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="shrink-0 mt-0.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#188038]" /></div>
                      <div className="space-y-0.5">
                        <p className="text-[11px] font-black text-[#3C4043]">{item.title}</p>
                        <p className="text-[10px] leading-relaxed text-[#70757A] font-medium">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}



            {ads?.sidebar && <div className="flex justify-center no-print pt-4">{ads.sidebar}</div>}

            {/* ── DISCOVER MORE TOOLS ──────── */}
            <div className="bg-white border border-[#DADCE0] rounded-lg shadow-sm overflow-hidden transition-all hover:shadow-md">
              <div className="px-5 py-4 border-b border-[#DADCE0] flex items-center gap-2.5">
                <div className="w-1.5 h-4 bg-[#1A73E8] rounded-full" />
                <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Discover More Tools</h3>
              </div>
              <div className="p-2 space-y-1">
                {(relatedTools && relatedTools.length > 0) ? (
                  relatedTools.map((rel, idx) => (
                    <Link 
                      key={idx} 
                      href={normalizeLink(rel.href) as string}
                      className="flex items-center gap-3 p-3 hover:bg-[#F8F9FA] rounded-md transition-all group border-b border-[#F8F9FA] last:border-0"
                    >
                      <div className="w-8 h-8 rounded bg-[#F1F3F4] flex items-center justify-center text-sm group-hover:bg-[#E8F0FE] transition-colors">
                        {idx + 1}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-[12px] font-bold text-[#3C4043] group-hover:text-[#1A73E8] transition-colors truncate">{rel.label}</h4>
                        <p className="text-[9px] text-[#70757A] truncate font-medium">Precision calculation tool</p>
                      </div>
                    </Link>
                  ))
                ) : (
                  CALCULATORS
                    .filter(c => c.category === category && c.slug !== effectiveSlug)
                    .sort((a, b) => {
                       if (!mounted) return 0; // Keep stable for hydration
                       return Math.random(), 0.5; // Shuffle after mount
                    })
                    .slice(0, 8)
                    .map(related => (
                      <Link 
                        key={related.id} 
                        href={related.slug.includes('/') ? `/${related.slug}/` : `/calculator/${related.slug}/`}
                        className="flex items-center gap-3 p-3 hover:bg-[#F8F9FA] rounded-md transition-all group"
                      >
                        <span className="text-xl grayscale group-hover:grayscale-0 transition-all">{related.icon}</span>
                        <div className="min-w-0">
                          <h4 className="text-[12px] font-bold text-[#3C4043] group-hover:text-[#1A73E8] transition-colors truncate">{related.name}</h4>
                          <p className="text-[9px] text-[#70757A] truncate font-medium">{related.description}</p>
                        </div>
                      </Link>
                    ))
                )}
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
      {ads?.bottom && <div className="mt-8 flex justify-center no-print pb-20 lg:pb-8">{ads.bottom}</div>}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#DADCE0] px-4 py-2 flex justify-around items-center z-50">
        {[ 
          { label: 'Home', icon: Home, href: '/' },
          { label: 'Health', icon: Activity, href: '/health/' }, 
          { label: 'Finance', icon: DollarSign, href: '/finance/' }, 
          { label: 'Math', icon: Calculator, href: '/math-tools/' }, 
          { label: 'Convert', icon: TrendingUp, href: '/converters/' } 
        ].map((item) => (
          <Link key={item.label} href={item.href} className="flex flex-col items-center gap-1 p-2">
            <item.icon className="w-5 h-5 text-[#5F6368]" />
            <span className="text-[10px] font-medium text-[#5F6368]">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
