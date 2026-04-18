import Image from 'next/image';
import Link from 'next/link';
import { Calendar, ArrowLeft, Clock, Share2, Facebook, Twitter, Linkedin, Bookmark, ArrowRight, Home, Target, BookOpen, Calculator } from 'lucide-react';
import { InternalLinks } from '@/components/seo/InternalLinks';
import { ShareResult } from '@/components/calculator/ShareResult';
import { CalcFAQ } from '@/components/calculator/CalcFAQ';
import { InlineCalculator } from '@/components/calculator/CalculatorRegistry';

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function sanitizeUrlEscaped(url: string): string | null {
  const u = url.trim().toLowerCase();
  if (u.startsWith('javascript:') || u.startsWith('data:') || u.startsWith('vbscript:')) return null;
  if (u.startsWith('http://') || u.startsWith('https://') || u.startsWith('/') || u.startsWith('#')) return url;
  return null;
}

function sanitizeUrlRaw(url: unknown): string | null {
  if (typeof url !== 'string') return null;
  const trimmed = url.trim();
  const u = trimmed.toLowerCase();
  if (u.startsWith('javascript:') || u.startsWith('data:') || u.startsWith('vbscript:')) return null;
  if (u.startsWith('http://') || u.startsWith('https://') || u.startsWith('/') || u.startsWith('#')) return trimmed;
  return null;
}

function renderContentString(content: string): string {
  if (!content) return '';
  const escaped = escapeHtml(content);
  return escaped
    .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold text-gray-900 mt-8 mb-3 scroll-mt-20">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 class="text-base font-bold text-gray-800 mt-5 mb-2">$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`(.+?)`/g, '<code class="bg-gray-100 text-blue-700 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')
    .replace(/^\d+\. (.+)$/gm, '<li class="ml-5 list-decimal mb-1">$1</li>')
    .replace(/^- (.+)$/gm, '<li class="ml-5 list-disc mb-1">$1</li>')
    .replace(/!\[(.+?)\]\((.+?)\)/g, (_m, alt, url) => {
      const safe = sanitizeUrlEscaped(String(url));
      if (!safe) return '';
      return `<img src="${safe}" alt="${alt}" loading="lazy" class="w-full h-auto rounded-2xl border border-gray-100 shadow-sm my-8" />`;
    })
    .replace(/\[(.+?)\]\((.+?)\)/g, (_m, label, url) => {
      const safe = sanitizeUrlEscaped(String(url));
      if (!safe) return `<span>${label}</span>`;
      return `<a href="${safe}" class="text-blue-600 underline hover:text-blue-800" rel="noopener noreferrer">${label}</a>`;
    })
    .replace(/^(?!<[hlo]).+$/gm, (l) => l.trim() ? `<p class="mb-4 text-gray-700 leading-relaxed">${l}</p>` : '');
}

export default function BlogPostContent({ post, related }: { post: any; related: any[] }) {
  // Regex for finding [calc:slug]
  const CALC_REGEX = /\[calc:([a-z0-9-]+)\]/g;
  const contentParts = post.content.split(CALC_REGEX);
  
  // Parse FAQs from content for rich results
  const faqs = (() => {
    if (!post?.content) return [];
    const matches = [...post.content.matchAll(/^### (.+\?)\n([\s\S]+?)(?=\n###|\n##|$)/gm)];
    return matches.slice(0, 6).map((m: any) => ({
      question: m[1],
      answer: m[2].trim().substring(0, 400)
    }));
  })();

  const wordCount = post?.content?.split(/\s+/).length || 0;
  const readMins = Math.max(1, Math.round(wordCount / 200));

  const pubDate = post.date
    ? new Date(post.date).toLocaleDateString('en-NP', { year:'numeric', month:'long', day:'numeric' })
    : '';

  // SEO Action Card Data
  const lowerTitle = (post.title || '').toLowerCase();
  const lowerContent = (post.content || '').toLowerCase();
  
  const isSalaryPost = lowerTitle.includes('salary') || lowerContent.includes('salary');
  const isTaxPost = lowerTitle.includes('tax') || lowerContent.includes('tax');
  const isGPAPost = lowerTitle.includes('gpa') || lowerContent.includes('percentage');
  
  const seoNudge = isSalaryPost ? {
    title: 'Precision Salary Planning',
    desc: 'Calculate your exact net salary with SSF, CIT, and 2082 tax slabs.',
    href: '/calculator/nepal-salary',
    label: 'Salary Calculator'
  } : isTaxPost ? {
    title: 'Tax Season Readiness',
    desc: 'Calculate your personal income tax liability with latest 2082/83 slabs.',
    href: '/calculator/nepal-income-tax',
    label: 'Tax Optimizer'
  } : isGPAPost ? {
      title: 'Academic Goal Tracker',
      desc: 'Predict your final CGPA and track semester progress with TU/KU scales.',
      href: '/calculator/engineering-gpa-calculator',
      label: 'GPA Planner'
  } : null;

  return (
    <div className="min-h-screen bg-[#F8FAFB]">
      <div className="max-w-3xl mx-auto px-4 py-6">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-5">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-blue-600">Blog</Link>
          <span>/</span>
          <span className="text-gray-600 truncate">{post.title}</span>
        </nav>

        {/* Category pill */}
        {post.category && (
          <div className="inline-block bg-[#EEF2FF] text-[#4F46E5] text-[10px]
                          font-black px-3 py-1 rounded-full mb-3 uppercase tracking-[0.2em] border border-indigo-100">
            {post.category}
          </div>
        )}

        <h1 className="text-3xl sm:text-5xl font-black text-slate-900
                       leading-tight mb-4 tracking-tighter">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="text-lg text-slate-600 mb-6 leading-relaxed
                        border-l-4 border-blue-600 pl-6 italic font-medium">
            {post.excerpt}
          </p>
        )}

        {/* Meta bar */}
        <div className="flex flex-wrap items-center gap-4 mb-8 pb-4
                        border-b border-gray-100 text-[10px] font-black uppercase tracking-widest text-gray-400">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5" />
            <time dateTime={post.date}>{pubDate}</time>
          </div>
          <span>·</span>
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5" />
            <span>{readMins} min read</span>
          </div>
          <span>·</span>
          <span>{wordCount} words</span>
        </div>

        {/* Top Image (Feature) */}
        {sanitizeUrlRaw(post.imageTop) && (
          <div className="mb-10 w-full overflow-hidden rounded-[2.5rem] shadow-2xl border border-gray-100 relative aspect-video">
             <Image 
              src={sanitizeUrlRaw(post.imageTop)!} 
              alt={`${post.title} Overview`} 
              fill 
              priority
              className="object-cover" 
             />
          </div>
        )}

        {/* Article body with Mixed Content Parsing + Smart Image Injection */}
        <article className="prose prose-sm max-w-none text-slate-700
                           prose-a:text-blue-600 prose-a:font-bold prose-headings:text-slate-900">
           {(() => {
             let hasInjectedMiddle = false;
             return contentParts.map((part: string, index: number) => {
               // Every odd index is a captured slug from the regex split
               if (index % 2 === 1) {
                 return <InlineCalculator key={index} slug={part} />;
               }
               
               // Even index is regular markdown content
               const html = renderContentString(part);
               
               // Logic: Inject middle image after the first block if it has a heading,
               // or if we are at the second block and haven't injected yet.
               const shouldInject = !hasInjectedMiddle && sanitizeUrlRaw(post.imageMiddle) && 
                                   (html.includes('</h2>') || index >= 2);
               
               if (shouldInject) {
                 hasInjectedMiddle = true;
                 // If there's an H2, we try to put it right after it for better flow
                 if (html.includes('</h2>')) {
                    const parts = html.split('</h2>');
                    const firstPart = parts[0] + '</h2>';
                    const rest = parts.slice(1).join('</h2>');
                    return (
                      <React.Fragment key={index}>
                        <div dangerouslySetInnerHTML={{ __html: firstPart }} />
                        <div className="my-10 w-full overflow-hidden rounded-[2.5rem] shadow-2xl border border-gray-100 relative aspect-video">
                           <Image 
                            src={sanitizeUrlRaw(post.imageMiddle)!} 
                            alt={`${post.title} Deep Dive`} 
                            fill 
                            className="object-cover" 
                           />
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: rest }} />
                      </React.Fragment>
                    );
                 }
                 return (
                   <React.Fragment key={index}>
                     <div dangerouslySetInnerHTML={{ __html: html }} />
                     <div className="my-10 w-full overflow-hidden rounded-[2.5rem] shadow-2xl border border-gray-100 relative aspect-video">
                        <Image 
                         src={sanitizeUrlRaw(post.imageMiddle)!} 
                         alt={`${post.title} Context`} 
                         fill 
                         className="object-cover" 
                        />
                     </div>
                   </React.Fragment>
                 );
               }

               return <div key={index} dangerouslySetInnerHTML={{ __html: html }} />;
             });
           })()}
        </article>

        {/* Middle/Bottom Images and other sections... */}
        {sanitizeUrlRaw(post.imageBottom) && (
          <div className="mt-12 w-full overflow-hidden rounded-[2.5rem] shadow-2xl border border-gray-100 relative aspect-video">
             <Image 
              src={sanitizeUrlRaw(post.imageBottom)!} 
              alt={`${post.title} Summary`} 
              fill 
              loading="lazy"
              className="object-cover" 
             />
          </div>
        )}

        {/* Automated Nudges and FAQ etc... */}
        {seoNudge && (
            <div className="mt-12 bg-[#003366] rounded-[2.5rem] p-8 sm:p-12 text-white relative overflow-hidden group shadow-2xl shadow-blue-900/20">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-white/10 transition-all duration-700" />
                <div className="relative z-10">
                    <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-blue-100 mb-6">
                        <Target className="w-4 h-4" /> Recommended Tool
                    </div>
                    <h3 className="text-2xl sm:text-4xl font-black mb-4 tracking-tight leading-tight">
                        {seoNudge.title}
                    </h3>
                    <p className="text-blue-100/80 mb-8 max-w-2xl font-medium leading-relaxed">
                        {seoNudge.desc}
                    </p>
                    <Link href={seoNudge.href} className="inline-flex items-center gap-4 bg-white text-blue-900 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-50 hover:scale-[1.02] active:scale-95 transition-all">
                        Launch {seoNudge.label} <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        )}

        {faqs.length >= 2 && (
          <div className="mt-12">
            <CalcFAQ faqs={faqs} />
          </div>
        )}

        <div className="mt-12 pt-10 border-t border-gray-100">
          <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-4">Share this investigation</div>
          <ShareResult
            title={post.title}
            result="📝 Read full article"
            calcUrl={`https://NEPACALC.com/blog/${post.slug}`}
          />
        </div>
      </div>
    </div>
  );
}
