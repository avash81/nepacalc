import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { Mail, Globe, MapPin, ExternalLink } from 'lucide-react';
import { FooterDynamicLinks } from './FooterDynamicLinks';
import { FooterScrollTop } from './FooterScrollTop';

const companyLinks = [
  { name: 'About', href: '/about/' },
  { name: 'Editorial Policy', href: '/about/editorial-policy/' },
  { name: 'Data Sources & Methodology', href: '/data-policy/' },
  { name: 'Privacy Policy', href: '/privacy/' },
  { name: 'Terms & Conditions', href: '/terms/' },
  { name: 'Disclaimer', href: '/disclaimer/' },
  { name: 'Contact', href: '/contact/' },
  { name: 'Blog', href: '/blog/' },
  { name: 'Sitemap', href: '/sitemap/' },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0d6e6a] text-white no-print overflow-hidden" style={{ borderTop: '1px solid rgba(255,255,255,0.15)' }}>
      {/* Gradient top accent */}
      <div className="h-[2px] w-full bg-gradient-to-r from-[#1A73E8] via-[#34a853] to-[#ea4335] opacity-70" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 pt-12 pb-24 lg:pb-6">

        {/* ── MAIN GRID: 4 columns ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-10" style={{ borderBottom: '1px solid rgba(255,255,255,0.15)' }}>

          {/* ── SECTION 1: Brand ── */}
          <div className="space-y-5">
            <Link href="/" className="inline-block transition-transform hover:scale-105 duration-300">
              <Logo size="sm" theme="white" />
            </Link>
            <p className="text-[12.5px] leading-relaxed text-white max-w-[240px]">
              NepaCalc is a free platform providing online calculators, converters, financial tools, engineering utilities, educational resources, health calculators and digital tools for users in Nepal and around the world. Built for speed, accuracy and everyday problem solving.
            </p>

          </div>

          {/* ── SECTION 2: Dynamic context-aware links ── */}
          <div>
            <FooterDynamicLinks />
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
                    className="group flex items-center gap-2 text-white hover:text-white/80 transition-colors duration-150 text-[12.5px]"
                  >
                    <div className="w-1 h-1 rounded-full flex-shrink-0 bg-white opacity-70 transition-all duration-200 group-hover:opacity-100 group-hover:scale-150" />
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
                  className="flex items-center gap-2.5 text-white hover:text-white/80 transition-colors duration-150 text-[12.5px] group"
                >
                  <div className="w-7 h-7 rounded-lg bg-white/20 border border-white/30 flex items-center justify-center flex-shrink-0 group-hover:bg-white/30 transition-all duration-200">
                    <Mail className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="font-medium">support@nepacalc.com</span>
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-white text-[12.5px]">
                <div className="w-7 h-7 rounded-lg bg-white/20 border border-white/30 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="font-medium">Kathmandu, Nepal</span>
              </li>
              <li>
                <a
                  href="https://nepacalc.com"
                  className="flex items-center gap-2.5 text-white hover:text-white/80 transition-colors duration-150 text-[12.5px] group"
                >
                  <div className="w-7 h-7 rounded-lg bg-white/20 border border-white/30 flex items-center justify-center flex-shrink-0 group-hover:bg-white/30 transition-all duration-200">
                    <Globe className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="font-medium">nepacalc.com</span>
                  <ExternalLink className="w-3 h-3 opacity-70 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            </ul>

            {/* Trust badges */}
            <div className="mt-6 space-y-2">
              {['Free to Use', 'Privacy First', 'Mobile Friendly', 'Built for Everyone'].map((badge) => (
                <div key={badge} className="flex items-center gap-2 text-[11px] text-white/90">
                  <span className="text-white font-black">✓</span>
                  {badge}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 text-[11px] font-medium tracking-wide text-white">
          <span>&copy; {year} NepaCalc. All Rights Reserved.</span>
          <span className="hidden sm:block text-white/50">•</span>
          <span className="text-white">Built for Everyone. Specialized for Nepal.</span>
          <div className="ml-auto sm:ml-0">
            <FooterScrollTop />
          </div>
        </div>

      </div>
    </footer>
  );
}
