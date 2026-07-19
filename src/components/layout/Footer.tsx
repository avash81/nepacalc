'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/ui/Logo';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Globe, MapPin, ArrowUp, ExternalLink } from 'lucide-react';
import { FOOTER_CATEGORIES, getFooterCategory } from '@/data/footer-links';

const companyLinks = [
  { name: 'About', href: '/about/' },
  { name: 'Editorial Policy', href: '/about/editorial-policy/' },
  { name: 'Privacy Policy', href: '/privacy/' },
  { name: 'Terms & Conditions', href: '/terms/' },
  { name: 'Disclaimer', href: '/disclaimer/' },
  { name: 'Contact', href: '/contact/' },
  { name: 'Blog', href: '/blog/' },
  { name: 'Sitemap', href: '/sitemap/' },
];

const socialLinks = [
  { Icon: Facebook, href: '#', label: 'Facebook' },
  { Icon: Twitter, href: '#', label: 'Twitter' },
  { Icon: Instagram, href: '#', label: 'Instagram' },
  { Icon: Linkedin, href: '#', label: 'LinkedIn' },
];

export function Footer() {
  const pathname = usePathname();
  const categoryKey = getFooterCategory(pathname);
  const dynamicGroup = FOOTER_CATEGORIES[categoryKey] ?? FOOTER_CATEGORIES.default;
  const year = new Date().getFullYear();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative bg-[#080809] text-[#9aa0a6] no-print overflow-hidden" style={{ borderTop: '1px solid #1e1e24' }}>
      {/* Gradient top accent */}
      <div className="h-[2px] w-full bg-gradient-to-r from-[#1A73E8] via-[#34a853] to-[#ea4335] opacity-70" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 pt-12 pb-6">

        {/* ── MAIN GRID: 4 columns ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-10" style={{ borderBottom: '1px solid #1e1e24' }}>

          {/* ── SECTION 1: Brand ── */}
          <div className="space-y-5">
            <Link href="/" className="inline-block transition-transform hover:scale-105 duration-300">
              <Logo size="sm" theme="indigo" />
            </Link>
            <p className="text-[12.5px] leading-relaxed text-[#9aa0a6] max-w-[240px]">
              NepaCalc is Nepal's trusted platform for calculators, financial tools, market rates, engineering utilities, and educational resources. Built for accuracy, speed, and Nepal-specific calculations.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-2.5">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-full bg-[#161618] border border-[#252529] flex items-center justify-center text-[#9aa0a6] hover:bg-[#1A73E8] hover:text-white hover:border-[#1A73E8] transition-all duration-200"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* ── SECTION 2: Dynamic context-aware links ── */}
          <div>
            <h3
              className="text-white font-black uppercase text-[9px] tracking-[0.25em] mb-5 pl-3"
              style={{ borderLeft: '2px solid #1A73E8' }}
            >
              {dynamicGroup.heading}
            </h3>
            <ul className="space-y-2.5">
              {dynamicGroup.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-[#9aa0a6] hover:text-white transition-colors duration-150 text-[12.5px]"
                  >
                    <div
                      className="w-1 h-1 rounded-full flex-shrink-0 bg-[#1A73E8] opacity-50 transition-all duration-200 group-hover:opacity-100 group-hover:scale-150"
                    />
                    <span className="font-medium group-hover:translate-x-0.5 transition-transform duration-150">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── SECTION 3: Company ── */}
          <div>
            <h3
              className="text-white font-black uppercase text-[9px] tracking-[0.25em] mb-5 pl-3"
              style={{ borderLeft: '2px solid #34a853' }}
            >
              Company
            </h3>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-[#9aa0a6] hover:text-white transition-colors duration-150 text-[12.5px]"
                  >
                    <div className="w-1 h-1 rounded-full flex-shrink-0 bg-[#34a853] opacity-50 transition-all duration-200 group-hover:opacity-100 group-hover:scale-150" />
                    <span className="font-medium group-hover:translate-x-0.5 transition-transform duration-150">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── SECTION 4: Contact ── */}
          <div>
            <h3
              className="text-white font-black uppercase text-[9px] tracking-[0.25em] mb-5 pl-3"
              style={{ borderLeft: '2px solid #ea4335' }}
            >
              Contact
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:support@nepacalc.com"
                  className="flex items-center gap-2.5 text-[#9aa0a6] hover:text-white transition-colors duration-150 text-[12.5px] group"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#161618] border border-[#252529] flex items-center justify-center flex-shrink-0 group-hover:bg-[#1A73E8] group-hover:border-[#1A73E8] transition-all duration-200">
                    <Mail className="w-3.5 h-3.5 text-[#1A73E8] group-hover:text-white transition-colors duration-200" />
                  </div>
                  <span className="font-medium">support@nepacalc.com</span>
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-[#9aa0a6] text-[12.5px]">
                <div className="w-7 h-7 rounded-lg bg-[#161618] border border-[#252529] flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                </div>
                <span className="font-medium">Kathmandu, Nepal</span>
              </li>
              <li>
                <a
                  href="https://nepacalc.com"
                  className="flex items-center gap-2.5 text-[#9aa0a6] hover:text-white transition-colors duration-150 text-[12.5px] group"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#161618] border border-[#252529] flex items-center justify-center flex-shrink-0 group-hover:bg-[#1A73E8] group-hover:border-[#1A73E8] transition-all duration-200">
                    <Globe className="w-3.5 h-3.5 text-[#1A73E8] group-hover:text-white transition-colors duration-200" />
                  </div>
                  <span className="font-medium">nepacalc.com</span>
                  <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            </ul>

            {/* Trust badges */}
            <div className="mt-6 space-y-2">
              {['Independent Publisher', 'Nepal-focused', 'Privacy First', 'Free to Use'].map((badge) => (
                <div key={badge} className="flex items-center gap-2 text-[11px] text-[#6e757c]">
                  <span className="text-emerald-500 font-black">✓</span>
                  {badge}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 text-[10px] font-bold tracking-wide text-[#4a5058]">
          <span>&copy; {year} NepaCalc. All Rights Reserved.</span>
          <span className="hidden sm:block text-[#2d3136]">•</span>
          <span className="text-[#4a5058]">Built for Nepal.</span>
          <div className="ml-auto sm:ml-0">
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
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
