import React from 'react';
import Link from 'next/link';
import { ChevronRight, Calendar, User, Clock, Tag, Share2, Facebook, Twitter, Linkedin, Copy } from 'lucide-react';

interface BlogPostLayoutProps {
  children: React.ReactNode;
  title: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
  crumbs: { label: string; href: string }[];
}

export function BlogPostLayout({
  children,
  title,
  date,
  author,
  category,
  readTime,
  crumbs
}: BlogPostLayoutProps) {
  return (
    <div className="bg-[#F8F9FA] min-h-screen">
      {/* Article Header */}
      <div className="bg-white border-b border-slate-200 pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#5F6368] mb-8 overflow-x-auto whitespace-nowrap scrollbar-hide">
            {crumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <ChevronRight className="w-3 h-3 text-slate-300" />}
                <Link href={crumb.href} className="hover:text-[#1A73E8] transition-colors">{crumb.label}</Link>
              </React.Fragment>
            ))}
          </nav>

          <h1 className="text-4xl sm:text-5xl font-black text-[#202124] tracking-tight leading-[1.1] mb-8">
            {title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#1A73E8]" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-[#1A73E8]" />
              <span>{author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#1A73E8]" />
              <span>{readTime}</span>
            </div>
            <div className="px-3 py-1 bg-[#E8F0FE] text-[#1A73E8] rounded-full text-[10px]">
              {category}
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100">
          <article className="prose prose-slate prose-lg max-w-none prose-headings:font-black prose-headings:tracking-tight prose-a:text-[#1A73E8] prose-a:no-underline hover:prose-a:underline prose-strong:text-[#202124] prose-img:rounded-3xl">
            {children}
          </article>

          {/* Sharing Footer */}
          <div className="mt-20 pt-10 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#5F6368]">Share This Guide</span>
              <div className="flex items-center gap-2">
                <button className="w-10 h-10 rounded-full bg-[#1877F2]/10 flex items-center justify-center text-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-all">
                  <Facebook className="w-4 h-4" />
                </button>
                <button className="w-10 h-10 rounded-full bg-[#1DA1F2]/10 flex items-center justify-center text-[#1DA1F2] hover:bg-[#1DA1F2] hover:text-white transition-all">
                  <Twitter className="w-4 h-4" />
                </button>
                <button className="w-10 h-10 rounded-full bg-[#0A66C2]/10 flex items-center justify-center text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white transition-all">
                  <Linkedin className="w-4 h-4" />
                </button>
                <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-all">
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2 px-6 py-3 bg-[#E8F0FE] rounded-2xl border border-[#D2E3FC]">
              <Tag className="w-4 h-4 text-[#1A73E8]" />
              <span className="text-[11px] font-black text-[#1A73E8] uppercase tracking-wider">Expert Verified</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
