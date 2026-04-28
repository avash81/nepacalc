'use client';
import React, { ReactNode, Fragment, useState, useEffect } from 'react';
import Link from 'next/link';
import { Info, Sigma, HelpCircle, ChevronRight, Calculator, ArrowLeft, Heart, Search, Menu, User, Home, Activity, DollarSign, Settings, CheckCircle2, TrendingUp, AlertCircle } from 'lucide-react';
import { JsonLd } from '@/components/seo/JsonLd';
import { TIER1_SEO_CONTENT } from '@/data/seo-content';
import { getLatestRates, MarketRate } from '@/utils/market/fetchRates';
import { usePathname } from 'next/navigation';
import { RecentSidebar } from './RecentSidebar';
import { CALCULATORS } from '@/data/calculators';

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
  details?: ReactNode;
  crumbs?: { label: string; href?: string }[];
  slug?: string;
  fullWidth?: boolean;
  ads?: { top?: ReactNode; sidebar?: ReactNode; bottom?: ReactNode; inContent?: ReactNode };
  hideH1?: boolean;
}

export function ModernCalcLayout({
  title, description, icon: Icon = Calculator, inputs, results, howToUse, formula, faqs, sidebar, relatedTools, seoContent, details, crumbs, slug, fullWidth = false, ads, hideH1 = false
}: ModernCalcLayoutProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [liveRates, setLiveRates] = useState<MarketRate[]>([]);
  const [lastUpdate, setLastUpdate] = useState<string>('');
  const pathname = usePathname();

  useEffect(() => {
    const rates = getLatestRates();
    setLiveRates(rates);
    setLastUpdate(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }));
  }, []);

  const effectiveSlug = slug || pathname?.split('/').filter(Boolean).pop();
  const enrichedSEO = seoContent || (effectiveSlug && TIER1_SEO_CONTENT[effectiveSlug]?.content);
  const enrichedFAQs = (faqs && faqs.length > 0) ? faqs : (effectiveSlug && TIER1_SEO_CONTENT[effectiveSlug]?.faqs) || [];

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

  return (
    <div className="min-h-screen bg-[#F1F3F4] font-sans text-[#3C4043] pb-20 lg:pb-0">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": title,
        "description": description,
        "applicationCategory": "UtilitiesApplication",
        "operatingSystem": "All",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "NPR" }
      })}} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      {crumbs && crumbs.length > 0 && (
        <JsonLd type="breadcrumb" breadcrumbItems={[
          { name: 'Home', item: 'https://nepacalc.com' },
          ...crumbs.map(c => ({ name: c.label, item: c.href ? `https://nepacalc.com${normalizeLink(c.href)}` : undefined })).filter((x): x is { name: string, item: string } => !!x.item)
        ]} />
      )}
      <div className="max-w-[1280px] mx-auto px-4 pt-1 pb-8">
        <div className="mb-3 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#dadce0] pb-3">
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
            {!hideH1 && <h1 className="text-2xl sm:text-3xl font-bold text-[#202124] tracking-tight">{title}</h1>}
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
        {ads?.top && <div className="mb-6 flex justify-center no-print">{ads.top}</div>}
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-1 space-y-6">
            <div className="bg-white border border-[#DADCE0] rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-3 border-b border-[#DADCE0] flex items-center gap-3 bg-[#F8F9FA]">
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-[#1A73E8]" />
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#70757A]">Calculator Engine</span>
                </div>
              </div>
              {fullWidth ? <div className="p-0">{inputs}</div> : (
                <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-[#DADCE0]">
                  <div className="flex-1 p-4 lg:p-6 bg-white">{inputs}</div>
                  <div className="w-full md:w-[320px] lg:w-[400px] p-4 bg-[#F8F9FA]">
                    <div className="bg-white border border-[#DADCE0] rounded-md overflow-hidden h-full flex flex-col">
                      <div className="px-4 py-2 border-b border-[#DADCE0] bg-white">
                        <h3 className="text-[11px] font-bold uppercase tracking-wider text-[#70757A]">Result Summary</h3>
                      </div>
                      <div className="flex-1 p-6 flex flex-col justify-center">{results}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {ads?.inContent && <div className="flex justify-center no-print">{ads.inContent}</div>}
            {details && <div className="space-y-6">{details}</div>}
            {/* Smart Internal Linking - Critical for Indexing all 80+ pages */}
            {(relatedTools || (effectiveSlug && CALCULATORS.find(c => c.slug === effectiveSlug))) && (
              <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-lg p-4">
                <div className="flex items-center justify-between mb-3 px-1">
                   <span className="text-[11px] font-black uppercase text-[#70757A] tracking-widest">Recommended Tools</span>
                   <Link href="/calculators/" className="text-[10px] font-bold text-[#1A73E8] hover:underline uppercase">View All</Link>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(relatedTools || CALCULATORS
                    .filter(c => {
                      const current = CALCULATORS.find(curr => curr.slug === effectiveSlug);
                      return c.category === current?.category && c.slug !== effectiveSlug;
                    })
                    .slice(0, 5)
                    .map(c => ({ label: c.name, href: `/calculator/${c.slug}/` }))
                  ).map((tool, idx) => (
                    <Link key={idx} href={normalizeLink(tool.href) as string} className="px-4 py-2 bg-white border border-[#DADCE0] rounded-lg text-xs font-bold text-[#3C4043] hover:text-[#1A73E8] hover:border-[#1A73E8] hover:shadow-sm transition-all">
                      {tool.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {(howToUse || formula) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {howToUse && (
                  <div className="bg-white border border-[#DADCE0] rounded-lg shadow-sm">
                    <div className="px-5 py-4 border-b border-[#DADCE0] flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-full bg-[#1A73E8] flex items-center justify-center"><Info className="w-3.5 h-3.5 text-white" /></div>
                      <h2 className="text-sm font-bold text-[#202124]">How to use</h2>
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
                {formula && (
                  <div className="bg-white border border-[#DADCE0] rounded-lg shadow-sm">
                    <div className="px-5 py-4 border-b border-[#DADCE0] flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-full bg-[#1A73E8] flex items-center justify-center"><Sigma className="w-3.5 h-3.5 text-white" /></div>
                      <h2 className="text-sm font-bold text-[#202124]">{formula.title}</h2>
                    </div>
                    <div className="p-6 space-y-4">
                      <p className="text-sm text-[#5F6368] leading-relaxed">{formula.description}</p>
                      {formula.raw && <div className="p-4 bg-[#F8F9FA] border border-[#DADCE0] rounded font-mono text-[13px] text-[#202124] overflow-x-auto whitespace-pre">{formula.raw}</div>}
                    </div>
                  </div>
                )}
              </div>
            )}
            {enrichedSEO ? (
              <div className="bg-white border border-[#DADCE0] rounded-lg shadow-sm p-6 prose prose-sm max-w-none prose-slate text-[#3C4043] prose-headings:text-[#202124] prose-headings:font-bold prose-h2:text-lg prose-h3:text-base">
                {enrichedSEO}
              </div>
            ) : (
              <div className="bg-white border border-[#DADCE0] rounded-lg shadow-sm p-8">
                <article className="prose prose-sm max-w-none prose-slate">
                  <h2 className="text-xl font-bold text-[#202124] mb-4">About {title}</h2>
                  <p className="leading-relaxed text-[#5F6368]">
                    The <strong>{title}</strong> on NepaCalc is a professional-grade computational tool designed for accuracy and ease of use. {description} 
                  </p>
                  <p className="leading-relaxed text-[#5F6368] mt-4">
                    As part of the NepaCalc Laboratory suite, this tool follows standard mathematical and institutional protocols to ensure that every calculation is precise. Whether you are using it for academic research, professional financial planning, or daily utility needs in Nepal, our engine provides reliable results instantly without requiring any registration or data entry beyond the necessary variables.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-4 items-center border-t border-[#F1F3F4] pt-6">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#188038]" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#70757A]">High Precision</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#188038]" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#70757A]">Mobile Verified</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#188038]" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#70757A]">Free Forever</span>
                    </div>
                  </div>
                </article>
              </div>
            )}
            {enrichedFAQs && enrichedFAQs.length > 0 && (
              <div className="bg-white border border-[#DADCE0] rounded-lg shadow-sm overflow-hidden">
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
