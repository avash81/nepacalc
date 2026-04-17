/**
 * @fileoverview Blog Page (RSC) — NEPACALC
 *
 * Refactored to React Server Component (RSC) for maximum SEO impact.
 * Fetches all published blog posts and SEO guide pages server-side.
 * Standardizes metadata and structured data for search engine dominance.
 * 
 * @module src/app/blog/page.tsx
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, BookOpen, FileText, Search } from 'lucide-react';
import { fetchFirestoreCollection } from '@/lib/firestore-rest';

// --- SEO CONFIGURATION ---
export const metadata: Metadata = {
  title: 'Blog & Financial Guides | NEPACALC Precision',
  description: 'Expert tips on Nepal income tax, salary planning, SSF, home loans, and professional calculator tutorials. Stay financially informed with the latest updates.',
  alternates: { canonical: 'https://nepacalc.com/blog' },
  openGraph: {
    title: 'NEPACALC Blog — Expert Nepal Calculation Guides',
    description: 'Expert financial advice and calculator walkthroughs for Nepal.',
    url: 'https://nepacalc.com/blog',
    siteName: 'NEPACALC',
    type: 'website',
  },
};

interface ContentItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  date: string;
  status: string;
  type: 'post' | 'guide';
  wordCount?: number;
}

export default async function BlogIndexPage({
  searchParams
}: {
  searchParams: { type?: string }
}) {
  const currentTab = searchParams.type || 'all';

  // Fetch all content server-side
  const [postsRaw, guidesRaw] = await Promise.all([
    fetchFirestoreCollection('posts'),
    fetchFirestoreCollection('seo_pages')
  ]);

  let posts: ContentItem[] = [];
  let guides: ContentItem[] = [];

  try {
    posts = (postsRaw || [])
      .filter((p: any) => p && p.status === 'published')
      .map((p: any) => ({ ...p, type: 'post' as const }));

    guides = (guidesRaw || [])
      .filter((p: any) => p && p.status === 'published')
      .map((p: any) => ({ ...p, type: 'guide' as const }));
  } catch (error) {
    console.error('Blog Render mapping error:', error);
    // Graceful fallback if data shape is unexpectedly corrupted
  }

  // Combine and sort by date descending
  let items = [...posts, ...guides].sort((a, b) => {
    const da = a.date ? new Date(a.date).getTime() : 0;
    const db = b.date ? new Date(b.date).getTime() : 0;
    return (isNaN(db) ? 0 : db) - (isNaN(da) ? 0 : da);
  });

  // Apply tab filtering server-side
  if (currentTab === 'posts') items = items.filter(i => i.type === 'post');
  else if (currentTab === 'guides') items = items.filter(i => i.type === 'guide');

  const tabs = [
    { id: 'all',    label: 'All Content', count: posts.length + guides.length, href: '/blog' },
    { id: 'posts',  label: 'Blog Posts',  count: posts.length, href: '/blog?type=posts' },
    { id: 'guides', label: 'Guides',      count: guides.length, href: '/blog?type=guides' },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-page)] dark:bg-gray-950 transition-colors duration-300">
      <div className="hp-container py-8 sm:py-20">

        {/* --- HEADER --- */}
        <header className="mb-16 text-center lg:text-left max-w-3xl animate-fade-in">
          <div className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-[var(--primary)] bg-[var(--primary-light)] border border-[var(--primary-light)] rounded-2xl px-6 py-2.5 mb-8 shadow-sm">
            <span className="w-2 h-2 bg-[var(--primary)] rounded-full animate-pulse shadow-sm shadow-blue-500/50" />
            Mathematical Insights
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-[var(--text-main)] mb-8 tracking-tighter leading-[0.9]">
            Scientific <span className="text-[var(--primary)]">Resources</span>
          </h1>
          <p className="text-[var(--text-secondary)] text-xl leading-relaxed font-medium">
             Expert financial guidance, local tax intelligence, and professional calculator tutorials for the latest Nepal fiscal ecosystem.
          </p>
        </header>

        {/* --- TABS --- */}
        <div className="flex flex-wrap gap-2 mb-12 border-b border-gray-100 dark:border-gray-900 pb-8">
          {tabs.map((tab) => (
            <Link
              key={tab.id}
              href={tab.href}
              className={`group flex items-center gap-4 px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all
                ${currentTab === tab.id
                  ? 'bg-gray-900 text-white dark:bg-white dark:text-black shadow-xl shadow-gray-200/20 dark:shadow-none'
                  : 'text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20'}`}
            >
              {tab.label}
              <span className={`px-2 py-0.5 rounded-lg text-[9px]
                ${currentTab === tab.id ? 'bg-white/20 dark:bg-black/10' : 'bg-gray-100 dark:bg-gray-800'}`}>
                {tab.count}
              </span>
            </Link>
          ))}
        </div>

        {/* --- CONTENT GRID --- */}
        {items.length === 0 ? (
          <div className="text-center py-32 bg-[var(--bg-surface)] rounded-[3rem] border border-[var(--border)] shadow-sm">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-6 opacity-50" />
            <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-widest text-center">No articles found in this category</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item) => {
              const href = item.type === 'guide' ? `/guide/${item.slug}` : `/blog/${item.slug}`;
              const readMins = Math.max(1, Math.round((item.wordCount || 800) / 200));
              const isSalaryFocus = item.title.toLowerCase().includes('salary') || item.excerpt.toLowerCase().includes('salary');

              return (
                <Link key={item.id} href={href} className="group relative flex flex-col bg-[var(--bg-surface)] border border-[var(--border)] rounded-[2rem] p-8 transition-all hover:border-[var(--primary)] hover:shadow-xl active:scale-[0.98] shadow-sm">
                  
                  {/* Badge */}
                  <div className="flex items-center justify-between mb-8">
                    <span className={`text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full border
                      ${item.type === 'guide' 
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800/50' 
                        : 'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800/50'}`}>
                      {item.type}
                    </span>
                    {isSalaryFocus && (
                        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                            <ArrowRight className="w-4 h-4" />
                        </div>
                    )}
                  </div>

                  <h2 className="text-2xl font-black text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors mb-6 leading-tight">
                    {item.title}
                  </h2>

                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-8 line-clamp-2">
                    {item.excerpt}
                  </p>

                  <div className="mt-auto pt-6 border-t border-gray-50 dark:border-gray-800 flex items-center justify-between">
                    <div className="flex items-center gap-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                       <span className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5" />
                          {item.date && !isNaN(new Date(item.date).getTime()) 
                            ? new Date(item.date).toLocaleDateString('en-NP', { month: 'short', day: 'numeric' })
                            : 'Recent'}
                       </span>
                       <span>·</span>
                       <span className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5" />
                          {readMins}m
                       </span>
                    </div>
                  </div>

                  {/* Auto-Linking Strategy (Phase 2 SEO) */}
                  {isSalaryFocus && (
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-blue-600 text-white text-[8px] font-black uppercase px-4 py-2 rounded-2xl translate-y-2 group-hover:translate-y-0 duration-300 pointer-events-none">
                         Try Salary Calc →
                      </div>
                  )}
                </Link>
              );
            })}
          </div>
        )}

        {/* --- NEWSLETTER CTA --- */}
         <section className="mt-32 bg-gray-950 dark:bg-white rounded-[4rem] p-12 sm:p-20 text-center relative overflow-hidden">
            <div className="relative z-10 space-y-8">
               <h2 className="text-white dark:text-black text-3xl sm:text-5xl font-black tracking-tight">Stay ahead of the <span className="text-blue-500">market.</span></h2>
               <p className="text-white/60 dark:text-black/60 max-w-xl mx-auto text-lg">Join our growing community of Nepal professionals receiving weekly tax insights and 2082/83 financial alerts.</p>
               <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input type="email" placeholder="Your work email" className="flex-1 bg-white/10 dark:bg-gray-100 border border-white/20 dark:border-gray-200 rounded-2xl px-6 py-4 text-white dark:text-black focus:outline-none focus:border-blue-500 transition-all font-medium" />
                  <button className="bg-blue-600 text-white font-black text-[10px] uppercase tracking-[0.2em] px-10 py-5 rounded-2xl hover:bg-blue-500 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-blue-600/30">Get Alerts</button>
               </div>
            </div>
         </section>

      </div>
    </div>
  );
}
