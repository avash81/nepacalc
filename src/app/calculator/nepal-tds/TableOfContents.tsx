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

export default function TableOfContents() {
  const [activeId, setActiveId] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Automatically expand on desktop
    if (window.innerWidth >= 768) {
      setIsOpen(true);
    }
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            window.history.replaceState(null, '', `#${entry.target.id}`);
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
      const y = el.getBoundingClientRect().top + window.scrollY - 100; // offset for sticky headers
      window.scrollTo({ top: y, behavior: 'smooth' });
      window.history.pushState(null, '', `#${id}`);
      setActiveId(id);
      if (window.innerWidth < 768) {
        setIsOpen(false);
      }
    }
  };

  const midpoint = Math.ceil(TOC_ITEMS.length / 2);
  const col1 = TOC_ITEMS.slice(0, midpoint);
  const col2 = TOC_ITEMS.slice(midpoint);

  return (
    <div className="mt-8 bg-white border border-[#DADCE0] rounded-xl shadow-sm overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 md:p-6 md:cursor-default focus:outline-none"
      >
        <div>
          <h2 className="text-xl md:text-2xl font-black text-[#202124] tracking-tight mb-1 text-left">Table of Contents</h2>
          <p className="text-[12px] md:text-sm text-[#5F6368] leading-relaxed max-w-4xl text-left hidden md:block">
            Use the table of contents below to quickly navigate to the section you need. Whether you want to calculate TDS, check the latest withholding rates, understand VAT rules, learn the filing process, or review official legal provisions, you can jump directly to the relevant section.
          </p>
        </div>
        <div className="md:hidden">
          {isOpen ? <ChevronUp className="w-5 h-5 text-[#5F6368]" /> : <ChevronDown className="w-5 h-5 text-[#5F6368]" />}
        </div>
      </button>

      {isOpen && (
        <div className="px-5 pb-6 md:px-6 md:pt-0">
          <p className="text-[12px] text-[#5F6368] mb-6 leading-relaxed md:hidden">
            Use the table of contents below to quickly navigate to the section you need.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 border-t border-[#F1F3F4] md:border-t-0 pt-4 md:pt-0">
            <div className="space-y-3">
              {col1.map(item => (
                <a 
                  key={item.id} 
                  href={`#${item.id}`}
                  onClick={(e) => scrollToSection(e, item.id)}
                  className={`flex items-start gap-3 group transition-colors`}
                >
                  <div className={`mt-1 w-1.5 h-1.5 rounded-full shrink-0 transition-colors ${activeId === item.id ? 'bg-[#1A73E8]' : 'bg-[#DADCE0] group-hover:bg-[#1A73E8]'}`} />
                  <span className={`text-[13px] md:text-sm leading-snug transition-colors ${activeId === item.id ? 'font-bold text-[#1A73E8]' : 'text-[#1A73E8] group-hover:text-[#1557B0]'}`}>
                    {item.label}
                  </span>
                </a>
              ))}
            </div>
            <div className="space-y-3">
              {col2.map(item => (
                <a 
                  key={item.id} 
                  href={`#${item.id}`}
                  onClick={(e) => scrollToSection(e, item.id)}
                  className={`flex items-start gap-3 group transition-colors`}
                >
                  <div className={`mt-1 w-1.5 h-1.5 rounded-full shrink-0 transition-colors ${activeId === item.id ? 'bg-[#1A73E8]' : 'bg-[#DADCE0] group-hover:bg-[#1A73E8]'}`} />
                  <span className={`text-[13px] md:text-sm leading-snug transition-colors ${activeId === item.id ? 'font-bold text-[#1A73E8]' : 'text-[#1A73E8] group-hover:text-[#1557B0]'}`}>
                    {item.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
