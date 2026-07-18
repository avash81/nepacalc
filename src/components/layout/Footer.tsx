'use client';

import Link from 'next/link';
import { CALCULATORS } from '@/data/calculators';
import { Logo } from '@/components/ui/Logo';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Globe, ArrowUp } from 'lucide-react';

export function Footer() {
  const year = new Date().getFullYear();
  
  const footerLinks = [
    { 
      title: "Nepal Specialized", 
      items: CALCULATORS.filter(c => c.category === 'nepal').slice(0, 8),
      accent: "#1A73E8"
    },
    { 
      title: "Finance & Market", 
      items: [
        { name: "Exchange Rate Nepal", slug: "market-rates/exchange-rate-nepal" },
        { name: "Currency Converter", slug: "currency-converter" },
        { name: "Live Gold Price", slug: "market-rates/live-gold-price" },
        { name: "Live Silver Price", slug: "market-rates/live-silver-price" },
        { name: "Income Tax Calculator", slug: "nepal-income-tax" },
        { name: "SIP Calculator", slug: "sip-calculator" },
        { name: "Fixed Deposit Calculator", slug: "fd-calculator" },
        { name: "Remittance Calculator", slug: "remittance-calculator" }
      ],
      accent: "#34a853"
    },
    { 
      title: "Health & Science", 
      items: CALCULATORS.filter(c => ['health', 'engineering', 'education'].includes(c.category)).slice(0, 8),
      accent: "#ea4335"
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#080809] text-[#9aa0a6] no-print overflow-hidden" style={{borderTop: '1px solid #1e1e24'}}>
      {/* Top accent line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-[#1A73E8] via-[#34a853] to-[#ea4335] opacity-60" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 py-10">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-8" style={{borderBottom: '1px solid #1e1e24'}}>
          
          {/* Brand column */}
          <div className="space-y-4">
            <Link href="/" className="inline-block transition-transform hover:scale-105 duration-300">
              <Logo size="sm" theme="indigo" />
            </Link>
            <p className="text-[12px] leading-relaxed text-[#6e757c] max-w-[240px]">
              The gold standard for high-precision computational tools in Nepal. Engineered for institutional accuracy and legislative compliance.
            </p>
            <div className="flex items-center gap-2.5">
              {[
                { Icon: Facebook, href: "#" },
                { Icon: Twitter, href: "#" },
                { Icon: Instagram, href: "#" },
                { Icon: Linkedin, href: "#" }
              ].map((social, i) => (
                <a key={i} href={social.href} className="w-8 h-8 rounded-full bg-[#161618] border border-[#252529] flex items-center justify-center text-[#6e757c] hover:bg-[#1A73E8] hover:text-white hover:border-[#1A73E8] transition-all duration-200">
                  <social.Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Dynamic link columns */}
          {footerLinks.map((col, idx) => (
            <div key={idx}>
              <h3
                className="text-white font-black uppercase text-[9px] tracking-[0.25em] mb-4 pl-3"
                style={{ borderLeft: `2px solid ${col.accent}` }}
              >
                {col.title}
              </h3>
              <ul className="space-y-2.5">
                {col.items.map((item) => {
                  const href = item.slug.includes('/') ? `/${item.slug}/` : `/calculator/${item.slug}/`;
                  return (
                  <li key={item.slug}>
                    <Link
                      href={href}
                      className="group flex items-center gap-2 text-[#737980] hover:text-white transition-colors duration-150 text-[12px]"
                    >
                      <div
                        className="w-1 h-1 rounded-full flex-shrink-0 transition-all duration-200 group-hover:scale-150"
                        style={{ background: col.accent, opacity: 0.4 }}
                      />
                      <span className="font-medium group-hover:translate-x-0.5 transition-transform duration-150">{item.name}</span>
                    </Link>
                  </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar — single compact row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-5">
          {/* Left: contact + location */}
          <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-start">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#111114] border border-[#252529] rounded-full">
              <Mail className="w-3 h-3 text-[#1A73E8]" />
              <a href="mailto:support@nepacalc.com" className="text-[11px] font-bold text-[#bdc1c6] hover:text-[#1A73E8] transition-colors">support@nepacalc.com</a>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#111114] border border-[#252529] rounded-full">
              <Globe className="w-3 h-3 text-emerald-500" />
              <span className="text-[11px] font-bold text-[#bdc1c6]">Kathmandu, Nepal</span>
            </div>
          </div>

          {/* Center: legal links */}
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-1.5 font-black uppercase text-[9px] tracking-[0.18em] text-[#4a5058]">
            <Link href="/blog/" className="hover:text-white transition-colors">Blog</Link>
            <Link href="/about/" className="hover:text-white transition-colors">About</Link>
            <Link href="/sitemap/" className="hover:text-white transition-colors">Sitemap</Link>
            <Link href="/terms/" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/privacy/" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/contact/" className="hover:text-white transition-colors">Contact</Link>
          </div>

          {/* Right: back to top + copyright */}
          <div className="flex items-center gap-4">
            <span className="text-[#4a5058] text-[10px] font-bold tracking-tight hidden sm:block">
              &copy; {year} NepaCalc
            </span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#161618] border border-[#2d2d35] text-[#bdc1c6] font-black uppercase text-[9px] tracking-widest rounded-full hover:bg-[#1A73E8] hover:text-white hover:border-[#1A73E8] transition-all duration-200 active:scale-95"
            >
              Top <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
