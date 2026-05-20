/**
 * @fileoverview Blog Index Page ,  Reverted to Old Structure
 *
 * Fetches all published blog posts from Firestore.
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { fetchFirestoreCollection } from '@/lib/firestore-rest';

export const metadata: Metadata = {
  title: 'Blog & Financial Guides | NepaCalc',
  description: 'Expert tips on Nepal income tax, salary planning, and professional calculator tutorials.',
  alternates: { canonical: 'https://nepacalc.com/blog/' },
  robots: { index: false, follow: false },
};

const STATIC_POSTS = [
  {
    id: 'static-nepal-income-tax-guide-2082-83',
    slug: 'nepal-income-tax-guide-2082-83',
    category: 'Finance & Tax',
    title: 'Nepal Income Tax 2082/83 — Complete Guide to Slabs, SSF Waiver and TDS Rules',
    excerpt: 'Complete guide to Nepal income tax for FY 2082/83. Covers IRD-verified tax slabs for single and married filers, SSF waiver, EPF/CIT deductions, female 10% rebate, TDS process, and worked examples.',
    date: '2026-05-20',
    status: 'published'
  },
  {
    id: 'static-nea-electricity-bill-guide-2082',
    slug: 'nea-electricity-bill-guide-2082',
    category: 'Utility Guide',
    title: 'How to Calculate Your NEA Electricity Bill in Nepal 2082/83 — Slab Rates, Unit Cost & Late Fines',
    excerpt: 'Complete guide to calculating your Nepal NEA electricity bill for 2082/83. Official progressive slab rates for 5A, 15A, 30A meters. Unit cost table, VAT rules, digital payment rebate and late fine schedule.',
    date: '2026-05-20',
    status: 'published'
  },
  {
    id: 'static-income-tax-filing-guide',
    slug: 'income-tax-filing-guide',
    category: 'Finance Guide',
    title: 'How to File Income Tax in Nepal 2083/84: A Step-by-Step Guide',
    excerpt: 'Learn how to file your income tax in Nepal for FY 2083/84. Complete guide on IRD registration, PAN, tax slabs, and SSF deductions.',
    date: '2026-05-16',
    status: 'published'
  },
  {
    id: 'static-nepal-tds-guide-2083',
    slug: 'nepal-tds-guide-2083',
    category: 'Taxation',
    title: 'Nepal TDS Guide 2083/84: Essential Tax Rules for Professionals and Landlords',
    excerpt: 'Learn about the latest Tax Deducted at Source (TDS) rates in Nepal for FY 2083/84. Comprehensive guide for freelancers, rent owners, and businesses.',
    date: '2026-05-16',
    status: 'published'
  },
  {
    id: 'static-nrb-base-rate-trends',
    slug: 'nrb-base-rate-trends',
    category: 'Market Analysis',
    title: 'NRB Base Rate Trends 2083/84: A Guide for Loan Borrowers in Nepal',
    excerpt: 'Analyze the latest Nepal Rastra Bank base rate trends for FY 2083/84. How falling interest rates impact your Home, Auto, and Personal loan EMIs.',
    date: '2026-05-16',
    status: 'published'
  }
];

export default async function BlogIndexPage() {
  let posts: any[] = [];
  try {
    posts = await fetchFirestoreCollection('posts');
  } catch (error) {
    console.error('Firestore fetch error:', error);
  }

  const combined = [...STATIC_POSTS, ...(posts || [])];
  const uniquePostsMap = new Map();
  combined.forEach(p => {
    if (p && p.slug && p.status === 'published') {
      if (!uniquePostsMap.has(p.slug)) {
        uniquePostsMap.set(p.slug, p);
      }
    }
  });

  const publishedPosts = Array.from(uniquePostsMap.values())
    .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="min-h-screen bg-[#F8FAFB]">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <header className="mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
            Blog & <span className="text-blue-600">Guides</span>
          </h1>
          <p className="text-gray-500 max-w-2xl">
            Stay informed with the latest financial updates and expert guides for Nepal.
          </p>
        </header>

        {publishedPosts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg border border-dashed border-gray-200">
            <p className="text-gray-400">No blog posts found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {publishedPosts.map((post) => (
              <Link 
                key={post.id} 
                href={`/blog/${post.slug}/`}
                className="group flex flex-col bg-white border border-gray-100 rounded-2xl p-6 transition-all hover:shadow-sm hover:border-blue-300"
              >
                <div className="mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-1 rounded">
                    {post.category || 'Post'}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 mb-3 leading-tight">
                  {post.title}
                </h2>
                <p className="text-gray-500 text-sm mb-6 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="mt-auto flex items-center justify-between text-[11px] text-gray-400 font-medium">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-blue-600 transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

