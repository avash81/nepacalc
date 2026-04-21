'use client';
import Link from 'next/link';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#f2f2f2] text-[#5f6368] pt-4 pb-20 sm:pb-2 sm:pt-2 no-print border-t border-[#dadce0] text-[13px]">
      <div className="hp-container flex flex-wrap justify-center sm:justify-end items-center gap-2">
        <Link href="/blog" className="hover:text-[#3c4043] transition-colors">blog</Link>
        <span className="text-[#70757a]">|</span>
        <Link href="/about" className="hover:text-[#3c4043] transition-colors">about us</Link>
        <span className="text-[#70757a]">|</span>
        <Link href="/sitemap/" className="hover:text-[#3c4043] transition-colors">sitemap</Link>
        <span className="text-[#70757a]">|</span>
        <Link href="/terms" className="hover:text-[#3c4043] transition-colors">terms of use</Link>
        <span className="text-[#70757a]">|</span>
        <Link href="/privacy" className="hover:text-[#3c4043] transition-colors">privacy policy</Link>
        <span className="text-[#70757a]">|</span>
        <Link href="/contact" className="hover:text-[#3c4043] transition-colors font-bold">contact us</Link>
        <span className="ml-2">© {year} nepacalc.com</span>
      </div>
    </footer>
  );
}
