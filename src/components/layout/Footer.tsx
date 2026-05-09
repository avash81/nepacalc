import Link from 'next/link';
import { CALCULATORS } from '@/data/calculators';
import { Logo } from '@/components/ui/Logo';

export function Footer() {
  const year = new Date().getFullYear();
  
  // Categorized links for SEO indexing
  const footerLinks = [
    { title: "Nepal Tools", items: CALCULATORS.filter(c => c.category === 'nepal').slice(0, 10) },
    { title: "Finance & Health", items: CALCULATORS.filter(c => ['finance', 'health'].includes(c.category)).slice(0, 10) },
    { title: "Math & Engineering", items: CALCULATORS.filter(c => ['education', 'engineering'].includes(c.category)).slice(0, 10) },
  ];

  return (
    <footer className="bg-[#1a1a1a] text-[#bdc1c6] pt-16 pb-8 no-print border-t border-[#3c4043] text-[13px]">
      <div className="max-w-[1280px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link href="/" className="inline-block group">
              <Logo size="sm" theme="indigo" />
            </Link>
            <p className="text-xs leading-relaxed text-[#9aa0a6] font-medium">
              Nepal&apos;s leading platform for high-precision calculators, converters, and engineering tools. Built for accuracy, localized for Nepal.
            </p>
            <div className="flex flex-col gap-2">
              <a href="mailto:support@nepacalc.com" className="text-[#1A73E8] font-bold hover:underline">support@nepacalc.com</a>
              <p className="text-[10px] uppercase font-black tracking-widest text-[#5f6368]">Verified Authority Site</p>
            </div>
          </div>

          {/* Dynamic Columns for Indexing */}
          {footerLinks.map((col, idx) => (
            <div key={idx}>
              <h3 className="text-[#202124] font-black uppercase text-[11px] tracking-widest mb-6 border-l-4 border-[#1A73E8] pl-3">{col.title}</h3>
              <ul className="space-y-3">
                {col.items.map((item) => (
                  <li key={item.slug}>
                    <Link href={`/calculator/${item.slug}/`} className="text-[#9aa0a6] hover:text-[#1A73E8] transition-colors font-medium hover:pl-1 duration-200 block">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#3c4043] pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 font-bold uppercase text-[10px] tracking-wider">
            <Link href="/blog/" className="hover:text-[#202124] transition-colors">Blog</Link>
            <Link href="/about/" className="hover:text-[#202124] transition-colors">About</Link>
            <Link href="/sitemap/" className="hover:text-[#202124] transition-colors">Sitemap</Link>
            <Link href="/terms/" className="hover:text-[#202124] transition-colors">Terms</Link>
            <Link href="/privacy/" className="hover:text-[#202124] transition-colors">Privacy</Link>
            <Link href="/contact/" className="hover:text-[#202124] transition-colors">Contact</Link>
          </div>
          <div className="text-[#70757a] text-[11px] font-medium">
            &copy; {year} NepaCalc, All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  );
}
