import React from 'react';
import Link from 'next/link';
import { TrendingUp, Wallet, Zap, GraduationCap, MapPin, Calendar, Car, Home, LineChart, Landmark } from 'lucide-react';

const TOP_CALCS = [
  { name: 'Income Tax', slug: 'nepal-income-tax', icon: Wallet, color: 'text-emerald-600', desc: 'FY 2083/84 Slabs' },
  { name: 'EMI Calculator', slug: 'loan-emi', icon: Landmark, color: 'text-blue-600', desc: 'Home & Car Loans' },
  { name: 'SEE GPA', slug: 'see-gpa', icon: GraduationCap, color: 'text-indigo-600', desc: 'New 2083 System' },
  { name: 'NEA Bill', slug: 'nea-bill', icon: Zap, color: 'text-amber-600', desc: 'Domestic Tariff' },
  { name: 'Salary Tool', slug: 'nepal-salary', icon: Landmark, color: 'text-cyan-600', desc: 'Net Pay & SSF' },
  { name: 'Stock Market', slug: 'nepal-stocks', icon: LineChart, color: 'text-rose-600', desc: 'NEPSE Commissions' },
  { name: 'Date Converter', slug: 'nepali-date', icon: Calendar, color: 'text-orange-600', desc: 'AD to BS Instant' },
  { name: 'Land Measurement', slug: 'nepal-land', icon: MapPin, color: 'text-green-600', desc: 'Ropani, Aana, Bigha' },
  { name: 'Vehicle Tax', slug: 'nepal-vehicle-tax', icon: Car, color: 'text-slate-600', desc: 'Annual Bluebook' },
  { name: 'Home Loan', slug: 'nepal-home-loan', icon: Home, color: 'text-purple-600', desc: 'Affordability Check' },
];

export function TopCalculators() {
  return (
    <section className="py-8 bg-[#F1F3F4]">
      <div className="hp-container">
        <div className="flex items-center gap-2 mb-8">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-bold text-[#202124]">Trending Calculators in Nepal</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {TOP_CALCS.map((calc) => (
            <Link 
              key={calc.slug}
              href={`/calculator/${calc.slug}/`}
              className="group p-5 border border-[#dadce0] rounded-xl hover:border-blue-600 hover:shadow-md transition-all bg-white"
            >
              <div className={`${calc.color} mb-3 group-hover:scale-110 transition-transform`}>
                <calc.icon className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-[#202124] mb-1 group-hover:text-blue-600">{calc.name}</h3>
              <p className="text-[11px] text-[#5f6368] leading-tight">{calc.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

