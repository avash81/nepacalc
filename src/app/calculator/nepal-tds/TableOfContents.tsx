'use client';
import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const TOC_ITEMS = [
  { id: 'nepal-tds-calculator', label: '1. Nepal TDS Calculator' },
  { id: 'what-is-tds', label: '2. What is Tax Deducted at Source (TDS)?' },
  { id: 'latest-tds-rates', label: '3. Latest Nepal TDS Rates (FY 2083/84)' },
  { id: 'budget-updates', label: '4. FY 2083/84 Budget Updates' },
  { id: 'payment-categories', label: '5. Payment Categories Explained' },
  { id: 'vat-rules', label: '6. VAT Rules for TDS Calculation' },
  { id: 'how-to-calculate', label: '7. How to Calculate Nepal TDS' },
  { id: 'calculation-examples', label: '8. TDS Calculation Examples' },
  { id: 'resident-vs-non-resident', label: '9. Resident vs Non-Resident TDS Rules' },
  { id: 'advance-vs-final', label: '10. Advance Tax vs Final Withholding Tax' },
  { id: 'filing-process', label: '11. TDS Filing Process' },
  { id: 'deposit-deadlines', label: '12. TDS Deposit Deadlines' },
  { id: 'tds-penalties', label: '13. TDS Penalties' },
  { id: 'legal-references', label: '14. Legal References' },
  { id: 'common-mistakes', label: '15. Common TDS Mistakes' },
  { id: 'faqs', label: '16. Frequently Asked Questions' },
  { id: 'related-calculators', label: '17. Related Nepal Tax Calculators' },
  { id: 'official-references', label: '18. Official References & Disclaimer' }
];

export default function TableOfContents({ variant = 'desktop' }: { variant?: 'mobile' | 'desktop' }) {
  const [activeId, setActiveId] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px' }
    );

    TOC_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
      window.history.pushState(null, '', `#${id}`);
      setActiveId(id);
      if (variant === 'mobile') {
        setIsOpen(false);
      }
    }
  };

  if (variant === 'mobile') {
    return (
      <nav className="lg:hidden bg-[#F8F9FA] border border-[#DADCE0] rounded-xl p-6 mb-12">
        <p className="text-sm font-black text-[#202124] uppercase tracking-widest mb-4">Contents</p>
        <ol className="list-none pl-0 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {TOC_ITEMS.map((item, i) => (
            <li key={item.id} className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-[#E8F0FE] text-[#1A73E8] text-[10px] font-black font-mono flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
              <a 
                href={`#${item.id}`} 
                onClick={(e) => scrollToSection(e, item.id)}
                className={`text-sm font-medium hover:underline leading-snug ${activeId === item.id ? 'text-[#1A73E8] font-bold underline' : 'text-[#1A73E8]'}`}
              >
                {item.label.replace(/^\d+\.\s*/, '')}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    );
  }

  return (
    <div className="pr-4 hidden lg:block">
      <p className="text-xs font-black text-[#5F6368] uppercase tracking-widest mb-4 font-mono">Contents</p>
      <ol className="list-none pl-0 border-l-2 border-[#DADCE0] space-y-2">
        {TOC_ITEMS.map((item, i) => (
          <li key={item.id} className="pl-4">
            <a 
              href={`#${item.id}`} 
              onClick={(e) => scrollToSection(e, item.id)}
              className={`text-[13px] hover:text-[#D93025] hover:font-bold transition-colors block py-1 border-l-2 -ml-[18px] pl-[16px] hover:border-[#D93025] ${activeId === item.id ? 'text-[#D93025] font-bold border-[#D93025]' : 'text-[#5F6368] border-transparent'}`}
            >
              <span className={`font-mono text-[10px] mr-2 ${activeId === item.id ? 'text-[#D93025]' : 'text-[#B0B3B8]'}`}>{i + 1}</span>
              {item.label.replace(/^\d+\.\s*/, '')}
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
}
