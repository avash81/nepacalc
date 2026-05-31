import Link from 'next/link';
import { Search, Home, ArrowRight, TrendingUp } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 bg-white dark:bg-gray-950">
      <div className="max-w-3xl w-full text-center space-y-12">

        {/* Animated Icon */}
        <div className="relative inline-block mb-8">
          <div className="w-40 h-40 bg-blue-50/50 dark:bg-blue-900/10 rounded-full flex items-center justify-center mx-auto border-2 border-dashed border-blue-100 dark:border-blue-800 animate-[spin_20s_linear_infinite]">
            <div className="w-32 h-32 bg-white dark:bg-gray-900 rounded-full border border-gray-100 dark:border-gray-800 flex items-center justify-center shadow-sm shadow-blue-500/10">
              <Search className="w-12 h-12 text-blue-600" />
            </div>
          </div>
          <div className="absolute -top-4 -right-4 w-14 h-14 bg-red-500 rounded-[1.5rem] flex items-center justify-center text-white font-black text-xs shadow-sm rotate-12">
            404
          </div>
        </div>

        {/* Heading */}
        <div className="space-y-4">
          <h1 className="text-5xl sm:text-6xl font-black text-gray-900 dark:text-white tracking-tighter leading-none">
            Lost in the Numbers?
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-xl max-w-xl mx-auto leading-relaxed font-medium">
            That page doesn&apos;t exist. It may have been renamed or moved. Try one of our most popular calculators below!
          </p>
        </div>

        {/* Search all tools */}
        <div className="w-full max-w-lg mx-auto relative group">
          <div className="absolute inset-0 bg-blue-500/10 blur-xl group-hover:blur-2xl transition-all" />
          <Link
            href="/directory"
            className="relative block w-full px-8 py-6 bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 hover:text-blue-600 hover:border-blue-500 transition-all flex items-center justify-between shadow-sm"
          >
            <span>Browse all 100+ tools...</span>
            <div className="h-10 w-10 bg-gray-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
              <ArrowRight className="w-5 h-5" />
            </div>
          </Link>
        </div>

        {/* Popular Calculators Grid */}
        <div className="space-y-5 pt-4">
          <div className="flex items-center justify-center gap-3">
            <TrendingUp className="w-4 h-4 text-gray-400" />
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Most Popular Calculators</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-left">
            {[
              { name: 'Nepal Vehicle Tax', href: '/calculator/nepal-vehicle-tax', emoji: '🚗' },
              { name: 'SIP Calculator', href: '/calculator/sip-calculator', emoji: '📈' },
              { name: 'Nepal Income Tax', href: '/calculator/nepal-income-tax', emoji: '🧾' },
              { name: 'Live Gold Price', href: '/market-rates/live-gold-price', emoji: '🥇' },
              { name: 'Home Loan / EMI', href: '/calculator/nepal-home-loan', emoji: '🏠' },
              { name: 'BMI Calculator', href: '/calculator/bmi', emoji: '⚖️' },
              { name: 'NEPSE Stock Calc', href: '/calculator/nepal-stocks', emoji: '📊' },
              { name: 'FD Calculator', href: '/calculator/fd-calculator', emoji: '🏦' },
              { name: 'Nepali Date Conv.', href: '/calculator/nepali-date', emoji: '📅' },
            ].map(calc => (
              <Link
                key={calc.href}
                href={calc.href}
                className="flex items-center gap-3 px-4 py-3 bg-gray-50 dark:bg-gray-900 hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-gray-100 dark:border-gray-800 hover:border-blue-200 rounded-2xl text-[11px] font-bold text-gray-700 dark:text-gray-300 hover:text-blue-700 transition-all hover:-translate-y-0.5 hover:shadow-sm"
              >
                <span className="text-lg">{calc.emoji}</span>
                <span>{calc.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Category links */}
        <div className="space-y-4 pt-6 border-t border-gray-100 dark:border-gray-800">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Browse by Category</span>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { name: 'Finance', href: '/finance' },
              { name: 'Nepal Utilities', href: '/nepal' },
              { name: 'Math & Stats', href: '/math-tools' },
              { name: 'Health', href: '/health' },
              { name: 'Engineering', href: '/engineering' },
              { name: 'Converters', href: '/converters' },
            ].map(cat => (
              <Link
                key={cat.name}
                href={cat.href}
                className="px-6 py-3 bg-gray-50 dark:bg-gray-900 hover:bg-blue-50 dark:hover:bg-blue-900/30 border border-gray-100 dark:border-gray-800 text-gray-700 dark:text-gray-300 rounded-[1.2rem] text-[10px] font-black uppercase tracking-widest transition-all hover:-translate-y-1 hover:shadow-md"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-[1.8rem] font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 shadow-sm shadow-blue-500/30 transition-all hover:-translate-y-1 active:scale-95"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          <Link
            href="/directory"
            className="w-full sm:w-auto px-10 py-5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-[1.8rem] font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 transition-all hover:-translate-y-1 active:scale-95"
          >
            All Calculators
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="pt-8 text-[9px] font-black text-gray-300 dark:text-gray-700 uppercase tracking-[0.4em]">
          &copy; NepaCalc — Nepal&apos;s Precision Suite
        </div>

      </div>
    </div>
  );
}
