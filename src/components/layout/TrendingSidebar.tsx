'use client';
import React from 'react';
import Link from 'next/link';
import { TrendingUp, ArrowRight, Zap, Star } from 'lucide-react';

/**
 * TrendingSidebar ,  High-aesthetics retention component for Phase 4.
 * Generates smart suggestions based on the current calculator's context.
 */
interface CalculatorLink {
  name: string;
  slug: string;
  category?: string;
  icon?: React.ReactNode;
}

const ALL_TRENDING: CalculatorLink[] = [
  { name: 'Nepal Income Tax', slug: 'nepal-income-tax', category: 'Finance' },
  { name: 'Loan EMI Pro', slug: 'loan-emi', category: 'Finance' },
  { name: 'Engineering GPA Suite', slug: 'engineering-gpa-calculator', category: 'Education' },
  { name: 'Exchange Rate', slug: 'currency-converter', category: 'Market' },
  { name: 'BMI & Body Fat', slug: 'bmi', category: 'Health' },
  { name: 'Nepal Salary Calculator', slug: 'nepal-salary', category: 'Finance' },
  { name: 'Percentage Suite', slug: 'percentage', category: 'Utility' },
];

export function TrendingSidebar({ currentSlug }: { currentSlug?: string }) {
  const suggestions = ALL_TRENDING
    .filter(c => c.slug !== currentSlug)
    .slice(0, 5);

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-lg p-6 shadow-sm space-y-6">
      <div className="flex items-center gap-2 px-1">
        <TrendingUp className="w-5 h-5 text-blue-500" />
        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Trending Tools</h3>
      </div>
      
      <div className="space-y-2">
        {suggestions.map((calc) => (
          <Link 
            key={calc.slug}
            href={calc.slug.includes('/') ? `/${calc.slug}` : `/calculator/${calc.slug}`}
            className="group flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border-2 border-transparent hover:border-blue-500 hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-all duration-300"
          >
            <div className="flex flex-col gap-1">
              <span className="text-[8px] font-black text-blue-600 dark:text-[#1a0dab] uppercase tracking-widest opacity-60">
                {calc.category}
              </span>
              <span className="text-xs font-black text-gray-800 dark:text-[#202124] uppercase tracking-tight group-hover:translate-x-1 transition-transform">
                {calc.name}
              </span>
            </div>
            <div className="w-8 h-8 flex items-center justify-center rounded-xl bg-white dark:bg-gray-900 shadow-sm border border-gray-100 dark:border-gray-800 group-hover:bg-[#1a73e8] group-hover:text-[#202124] transition-all">
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

