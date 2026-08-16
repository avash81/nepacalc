'use client';
import React, { ReactNode, Fragment, useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { Info, Sigma, HelpCircle, ChevronRight, Calculator, ArrowLeft, Heart, Search, Menu, User, Home, Activity, DollarSign, Settings, CheckCircle2, TrendingUp, AlertCircle } from 'lucide-react';
import { JsonLd } from '@/components/seo/JsonLd';
import { TIER1_SEO_CONTENT } from '@/data/seo-content';
import { usePathname } from 'next/navigation';
import { CALCULATORS } from '@/data/calculators';
import type { MarketRate } from '@/utils/market/fetchRates';


interface ModernCalcLayoutProps {
  title: string;
  description: string;
  icon?: React.ElementType;
  inputs: ReactNode;
  results: ReactNode;
  howToUse?: { steps: string[] };
  formula?: { title: string; description: string; latex?: string; raw?: string; variables?: string[] };
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
  layout?: 'split' | 'stacked';
  ads?: { top?: ReactNode; sidebar?: ReactNode; bottom?: ReactNode; inContent?: ReactNode };
  hideH1?: boolean;
  intro?: ReactNode;
  customSchema?: object;
  compactHeader?: boolean;
  titleClassName?: string;
  sidebarPosition?: 'side' | 'bottom';
  calculatorPosition?: 'main' | 'top';
}

export function ModernCalcLayout({
  title, description, icon: Icon = Calculator, inputs, results, howToUse, formula, faqs, sidebar, relatedTools, seoContent, auditPanel, details, crumbs, slug, fullWidth = false, layout = 'split', ads, hideH1 = false, intro, customSchema, compactHeader = false, titleClassName, sidebarPosition = 'side', calculatorPosition = 'main'
}: ModernCalcLayoutProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [liveRates, setLiveRates] = useState<MarketRate[]>([]);
  const [lastUpdate, setLastUpdate] = useState<string>('');
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  
  const effectiveSlug = React.useMemo(() => {
    if (slug) return slug;
    if (!pathname) return null;
    const parts = pathname.split('/').filter(Boolean);
    const cleanParts = parts.filter(p => p !== 'calculator' && p !== 'app');
    return cleanParts[cleanParts.length - 1] || null;
  }, [slug, pathname]);

  // Try full nested path first (e.g. "math-tools/calculus"), then just the slug key
  const seoEntry = React.useMemo(() => {
    if (!effectiveSlug) return null;
    if (TIER1_SEO_CONTENT[effectiveSlug]) return TIER1_SEO_CONTENT[effectiveSlug];
    // Try building nested key from pathname
    if (pathname) {
      const parts = pathname.split('/').filter(Boolean);
      const clean = parts.filter(p => p !== 'calculator' && p !== 'app');
      if (clean.length >= 2) {
        const nestedKey = clean.slice(-2).join('/');
        if (TIER1_SEO_CONTENT[nestedKey]) return TIER1_SEO_CONTENT[nestedKey];
      }
    }
    return null;
  }, [effectiveSlug, pathname]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Defer market rates fetch — don't block initial paint
  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        const { getLatestRates } = await import('@/utils/market/fetchRates');
        const rates = getLatestRates();
        setLiveRates(rates);
        setLastUpdate(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }));
      } catch (e) { /* silent */ }
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const enrichedSEO = seoContent || seoEntry?.content;
  const enrichedFAQs = (faqs && faqs.length > 0) ? faqs : seoEntry?.faqs || [];
  const enrichedHowTo = (howToUse && howToUse.steps.length > 0) ? howToUse : (seoEntry?.howToUse && seoEntry.howToUse.steps.length > 0) ? seoEntry.howToUse : undefined;
  const enrichedFormula = (formula && formula.title) ? formula : (seoEntry?.formula && seoEntry.formula.title) ? seoEntry.formula : undefined;

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

  const faqQuestions = enrichedFAQs && enrichedFAQs.length > 0 ? enrichedFAQs.map((f: any) => ({
    question: f.question,
    answer: f.answer
  })) : undefined;

  const howToSteps = howToUse && howToUse.steps.length > 0 ? howToUse.steps.map((s: string, i: number) => ({
    name: `Step ${i + 1}`,
    text: s
  })) : undefined;

  const category = CALCULATORS.find(c => c.slug === effectiveSlug)?.category || 'General';

  const calculatorEngineNode = (
    <div className="bg-white border border-[#DADCE0] rounded-lg shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-[#DADCE0] flex items-center gap-3 bg-[#F8F9FA]">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-[#5F6368]" />
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#5F6368]">Calculator Engine</span>
        </div>
      </div>
      {fullWidth ? (
        <div className="flex flex-col lg:flex-row lg:items-start divide-y lg:divide-y-0 lg:divide-x divide-[#DADCE0]">
          <div className="flex-1 w-full bg-white">
            <div className="p-4 lg:p-6">{inputs}</div>
          </div>
          {results && (
            <div className="w-full lg:w-[420px] xl:w-[480px] bg-[#F8F9FA] flex flex-col shrink-0 lg:sticky lg:top-20 lg:max-h-[calc(100vh-100px)] overflow-y-auto border-t lg:border-t-0 border-[#DADCE0]">
              <div className="p-4 lg:p-6 flex-1">
                <div className="mb-4">
                  <h3 className="text-[11px] font-bold uppercase tracking-wider text-[#70757A]">Result Summary</h3>
                </div>
                <div>{results}</div>
              </div>
            </div>
          )}
        </div>
      ) : layout === 'stacked' ? (
        <div className="flex flex-col divide-y divide-[#DADCE0]">
          <div className="p-4 lg:p-6 lg:px-10 bg-white relative">
            <div className="w-full">{inputs}</div>
          </div>
          <div className="p-4 lg:p-8 lg:px-10 bg-[#F8F9FA]">
            <div className="w-full">
              <div className="mb-4">
                <h3 className="text-sm font-black uppercase tracking-wider text-[#202124]">Result Summary</h3>
              </div>
              <div className="w-full">{results}</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row md:items-start divide-y md:divide-y-0 md:divide-x divide-[#DADCE0]">
          <div className="flex-1 w-full bg-white relative">
            <div className="p-4 lg:p-6">{inputs}</div>
          </div>
          <div className="w-full md:w-[320px] lg:w-[450px] bg-white shrink-0 lg:sticky lg:top-20 lg:max-h-[calc(100vh-100px)] overflow-y-auto border-t md:border-t-0 border-[#DADCE0]">
            <div className="p-4 h-full">
              <div className="bg-white border border-[#DADCE0] rounded-md overflow-hidden h-full flex flex-col shadow-sm">
                <div className="px-4 py-2.5 border-b border-[#DADCE0] bg-[#F8F9FA]">
                  <h3 className="text-[11px] font-bold uppercase tracking-wider text-[#70757A]">Result Summary</h3>
                </div>
                <div className="flex-1 p-6 flex flex-col justify-center bg-white">{results}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F1F3F4] font-sans text-[#3C4043] pb-20 lg:pb-0 selection:bg-blue-100">
      {customSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(customSchema) }} />}
      
      <JsonLd 
        type="unified" 
        data={{
          url: pathname ? `https://nepacalc.com${normalizeLink(pathname)}` : undefined,
          breadcrumbUrl: pathname ? `https://nepacalc.com${normalizeLink(pathname)}` : undefined,
          breadcrumb: crumbs && crumbs.length > 0 ? [
            { name: 'Home', item: 'https://nepacalc.com' },
            ...crumbs.map(c => ({ name: c.label, item: c.href ? `https://nepacalc.com${normalizeLink(c.href)}` : undefined })).filter((x): x is { name: string, item: string } => !!x.item)
          ] : undefined,
          calculator: {
            name: title,
            description: description,
            applicationCategory: "EducationalApplication",
            url: pathname ? `https://nepacalc.com${normalizeLink(pathname)}` : undefined,
            isPartOf: crumbs && crumbs[0]?.href ? `https://nepacalc.com${normalizeLink(crumbs[0].href)}#collection` : 'https://nepacalc.com/#website'
          },
          faqs: faqQuestions,
          howto: howToSteps ? { name: `How to use ${title}`, description: description, steps: howToSteps, url: pathname ? `https://nepacalc.com${normalizeLink(pathname)}` : undefined } : undefined
        }} 
      />
      <div className="max-w-[1280px] mx-auto px-4 pt-2 pb-16">
        {((crumbs && crumbs.length > 0) || !hideH1) && (
          <div className={`mb-2 pb-2 flex flex-col md:flex-row md:items-end justify-between gap-2 border-b border-[#dadce0]`}>
            <div>
              {crumbs && crumbs.length > 0 && (
                <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1.5 text-[11px] font-medium text-[#5f6368] mb-1 uppercase tracking-wider">
                  {crumbs.map((c, i) => (
                    <Fragment key={i}>
                      {i > 0 && <span className="text-[#DADCE0] scale-75">/</span>}
                      {c.href ? <Link href={normalizeLink(c.href) as string} className="hover:text-[#1A73E8]">{c.label}</Link> : <span className="text-[#5f6368]">{c.label}</span>}
                    </Fragment>
                  ))}
                </nav>
              )}
              {!hideH1 && (
                <h1 className={titleClassName || `text-lg sm:text-xl font-bold text-[#202124] tracking-tight mb-0`}>{title}</h1>
              )}
            </div>
          </div>
        )}
        {intro && <div className="mb-3">{intro}</div>}
        {ads?.top && <div className="mb-3 flex justify-center no-print">{ads.top}</div>}
        {fullWidth && (
          <div className="mb-2">
            {calculatorEngineNode}
          </div>
        )}
        <div className={`flex flex-col gap-4 ${sidebarPosition === 'bottom' ? '' : 'lg:flex-row'}`}>
          <div className="flex-1 space-y-4 w-full min-w-0">
            {!fullWidth && calculatorEngineNode}
            {ads?.inContent && <div className="flex justify-center no-print">{ads.inContent}</div>}
            {details && <div className="details-container space-y-6 w-full mb-6">{details}</div>}
            {(enrichedHowTo || enrichedFormula) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {enrichedHowTo && (
                  <div className="bg-white border border-[#DADCE0] rounded-lg shadow-sm">
                    <div className="px-5 py-4 border-b border-[#DADCE0] flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-full bg-[#1A73E8] flex items-center justify-center"><Info className="w-3.5 h-3.5 text-[#202124]" /></div>
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
                      <div className="w-6 h-6 rounded-full bg-[#1A73E8] flex items-center justify-center"><Sigma className="w-3.5 h-3.5 text-[#202124]" /></div>
                      <h2 className="text-sm font-bold text-[#202124]">{enrichedFormula.title}</h2>
                    </div>
                    <div className="p-6 space-y-4">
                      <p className="text-sm text-[#5F6368] leading-relaxed">{enrichedFormula.description}</p>
                      {enrichedFormula.raw && <div className="p-4 bg-[#F8F9FA] border border-[#DADCE0] rounded font-mono text-[13px] text-[#202124] overflow-x-auto whitespace-pre">{enrichedFormula.raw}</div>}
                      {(enrichedFormula as any).variables && (
                        <div className="space-y-1.5 pt-2">
                           {(enrichedFormula as any).variables.map((v: string, i: number) => {
                              const eqIdx = v.indexOf(' = ');
                              const key = eqIdx !== -1 ? v.slice(0, eqIdx) : v;
                              const val = eqIdx !== -1 ? v.slice(eqIdx + 3) : '';
                              return (
                                <p key={i} className="text-sm text-[#5F6368] flex items-start gap-2 leading-relaxed">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#dadce0] mt-1.5 shrink-0" />
                                  <span><strong className="text-[#202124]">{key}</strong>{val ? ` = ${val}` : ''}</span>
                                </p>
                              );
                            })}
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

