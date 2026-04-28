'use client';

import { 
  Zap, 
  Shield, 
  Smartphone, 
  Globe, 
  Search, 
  Database 
} from 'lucide-react';

const FEATURES = [
  {
    title: 'Instant Results',
    description: 'Get precise calculations in milliseconds with our optimized SaaS engine.',
    icon: Zap,
    color: 'text-cp-blue',
    bg: 'bg-cp-blue-light/20'
  },
  {
    title: 'Nepal Compliant',
    description: 'All tax and financial tools are updated for the latest Nepal fiscal mandates.',
    icon: Shield,
    color: 'text-cp-red',
    bg: 'bg-cp-red-light/20'
  },
  {
    title: 'Mobile First',
    description: 'Fully responsive design that works perfectly on your phone or tablet.',
    icon: Smartphone,
    color: 'text-cp-blue',
    bg: 'bg-cp-blue-light/20'
  },
  {
    title: 'Laboratory Grade',
    description: 'Mathematically verified algorithms consistent with international standards.',
    icon: Globe,
    color: 'text-cp-red',
    bg: 'bg-cp-red-light/20'
  },
  {
    title: 'Deep Search',
    description: 'Quickly find the specific tool you need within our expansive directory.',
    icon: Search,
    color: 'text-cp-blue',
    bg: 'bg-cp-blue-light/20'
  },
  {
    title: 'Cloud Persistence',
    description: 'Securely access your saved calculations and data across any device.',
    icon: Database,
    color: 'text-cp-red',
    bg: 'bg-cp-red-light/20'
  }
];

export function FeatureGrid() {
  return (
    <section className="py-24 bg-white">
      <div className="hp-container">
        <div className="text-center mb-16">
          <h2 className="h2-section text-cp-text mb-4">
            Why Choose <span className="text-cp-blue">NepaCalc?</span>
          </h2>
          <p className="text-cp-text-muted max-w-2xl mx-auto text-sm">
            We combined professional-grade precision with a modern user experience to build the ultimate tool suite for Nepal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="p-8 rounded-[2rem] bg-white border border-slate-100 hover:border-cp-blue/30 hover:shadow-2xl hover:shadow-cp-blue/5 transition-all group"
              >
                <div className={`w-14 h-14 ${feature.bg} ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon strokeWidth={2.5} size={28} />
                </div>
                <h3 className="text-xl font-bold text-cp-text mb-3 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
