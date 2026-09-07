import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Nepal Calculator Guides ,  Free Financial & Academic Resources | NepaCalc',
  description: 'Free guides on Nepal income tax, EMI, Nepali date conversion, GPA, and more. Written by the NepaCalc research team.',
  alternates: { canonical: 'https://nepacalc.com/guide/' },
};

export default function GuidesPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFB]">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700
                          text-xs font-bold px-3 py-1.5 rounded-full mb-3">
            <BookOpen className="w-3.5 h-3.5" /> Free Nepal Guides
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 mb-2">
            Nepal Calculator Guides
          </h1>
          <p className="text-sm text-gray-500 max-w-lg mx-auto">
            Detailed guides on Nepal tax rules, finance, health, and education
            calculators ,  updated for the latest fiscal mandates.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 mt-8">
          <Link href="/nepal/bluebook-renewal-nepal/" className="block bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="font-bold text-lg text-gray-900 mb-2">Bluebook Renewal in Nepal</h2>
            <p className="text-gray-600 text-sm">Comprehensive guide on vehicle tax, renewal fees, late charges, and online payment across all seven provinces.</p>
          </Link>
        </div>
        <div className="text-center py-8">
          <Link href="/blog/" className="text-blue-600 hover:underline text-sm mt-2 block">
            Browse Blog Posts →
          </Link>
        </div>
      </div>
    </div>
  );
}

