'use client';

import { CheckCircle2, Star, Gift, ShieldCheck, Zap } from 'lucide-react';
import Link from 'next/link';

export default function PricingClient() {
  return (
    <div className="min-h-screen bg-white font-sans py-12 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 mb-6 shadow-sm">
            <Gift className="w-4 h-4 text-emerald-600" />
            <span className="text-[11px] font-black text-emerald-600 uppercase tracking-widest">100% Free Access</span>
          </div>
          <h1 className="text-[28px] sm:text-[48px] font-black text-gray-900 tracking-tight mb-6 leading-tight">
            Our Mission is <span className="text-blue-600">Open Access.</span>
          </h1>
          <p className="text-[15px] text-gray-500 max-w-2xl mx-auto leading-relaxed font-medium">
            We believe that precision mathematical tools should be a fundamental right for every student, engineer, and professional in Nepal. No subscriptions, no hidden fees, just pure accuracy.
          </p>
        </div>

        {/* Featured "Free Forever" Card */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-[3rem] blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
          <div className="relative bg-white border border-slate-100 rounded-[3rem] p-8 sm:p-16 shadow-2xl overflow-hidden">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                   <div className="space-y-2">
                      <h2 className="text-3xl font-black text-gray-900">NEPACALC Infinity</h2>
                      <p className="text-[12px] font-black text-blue-600 uppercase tracking-[0.2em]">The Ultimate Precision Suite</p>
                   </div>
                   
                   <div className="flex items-baseline gap-2">
                      <span className="text-6xl font-black text-gray-900">Rs. 0</span>
                      <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">/ Forever</span>
                   </div>

                   <ul className="space-y-4">
                      {[
                        'Access to 150+ Precision Tools',
                        'Real-time Nepal Fiscal Rules',
                        'Advanced 3D Engineering Plotters',
                        'Financial & Tax Compliance Engines',
                        'Unit Converters & Math Solvers',
                        'Zero Tracking, Full Privacy'
                      ].map((feature) => (
                        <li key={feature} className="flex items-center gap-3 text-gray-600 font-medium">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                   </ul>

                   <Link 
                     href="/"
                     className="block w-full py-4 bg-blue-600 hover:bg-slate-900 text-white font-black text-[11px] uppercase tracking-[0.2em] text-center rounded-2xl shadow-xl shadow-blue-500/20 transition-all active:scale-95"
                   >
                     Start Calculating Now →
                   </Link>
                </div>

                <div className="bg-slate-50 rounded-[2.5rem] p-8 space-y-6 border border-slate-100">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                         <ShieldCheck className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                         <h4 className="text-sm font-black text-gray-900">No Sign-up Required</h4>
                         <p className="text-[11px] text-gray-500 font-medium leading-tight">Start using tools immediately without an account.</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                         <Zap className="w-6 h-6 text-amber-500" />
                      </div>
                      <div>
                         <h4 className="text-sm font-black text-gray-900">High Velocity Engine</h4>
                         <p className="text-[11px] text-gray-500 font-medium leading-tight">Native browser speed for 100% instant results.</p>
                      </div>
                   </div>
                   <div className="pt-4 border-t border-slate-200">
                      <p className="text-[11px] text-slate-400 italic leading-relaxed">
                        "Our commitment is to keep NEPACALC free for the lifetime of the project, ensuring academic and professional growth for all."
                      </p>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Support Section */}
        <div className="mt-24 text-center">
           <h3 className="text-[13px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Have a question?</h3>
           <Link href="/contact" className="text-sm font-bold text-blue-600 hover:underline">Contact our research team →</Link>
        </div>

      </div>
    </div>
  );
}
