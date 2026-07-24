'use client';

import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const TOC_ITEMS = [
  { id: 'calculator', label: '1. KUKL Water Bill Calculator' },
  { id: 'how-bill-calculated', label: '2. How KUKL Calculates Your Water Bill' },
  { id: 'tariff-rates', label: '3. Official KUKL Water Tariff Rates' },
  { id: 'pipe-sizes', label: '4. Pipe Connection Sizes & Charges' },
  { id: 'water-unit', label: '5. What Is 1 Unit of Water?' },
  { id: 'meter-reading', label: '6. How to Read Your Water Meter' },
  { id: 'charges', label: '7. Understanding Water Charges' },
  { id: 'examples', label: '8. KUKL Water Bill Examples' },
  { id: 'online-payment', label: '9. How to Check & Pay Your KUKL Bill Online' },
  { id: 'water-quality', label: '10. Drinking Water Quality Standards in Nepal' },
  { id: 'faqs', label: '11. Frequently Asked Questions' }
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
    if (id === 'calculator') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setActiveId(id);
        if (window.innerWidth < 768) setIsOpen(false);
        return;
    }
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
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
    <nav aria-label="Table of Contents" className="mb-8 bg-white border border-[#DADCE0] rounded-xl shadow-sm overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 md:p-6 focus:outline-none"
      >
        <div>
          <h2 className="text-xl md:text-2xl font-black text-[#202124] tracking-tight mb-2 text-left">Table of Contents</h2>
          <p className="text-[12px] md:text-sm text-[#5F6368] leading-relaxed max-w-4xl text-left hidden md:block">
            Whether you want to calculate your monthly KUKL water bill, understand the official tariff rates, learn how water meter readings are converted into billable units, or pay your bill online, this guide explains each step in a simple and practical way. Use the sections below to jump directly to the information you need.
          </p>
        </div>
        <div className="md:hidden">
          {isOpen ? <ChevronUp className="w-5 h-5 text-[#5F6368]" /> : <ChevronDown className="w-5 h-5 text-[#5F6368]" />}
        </div>
      </button>

      {isOpen && (
        <div className="px-5 pb-6 md:px-6 md:pt-0">
          <p className="text-[12px] text-[#5F6368] mb-6 leading-relaxed md:hidden">
            Use the sections below to jump directly to the information you need.
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
    </nav>
  );
}
