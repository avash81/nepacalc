'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FOOTER_CATEGORIES, getFooterCategory } from '@/data/footer-links';

export function FooterDynamicLinks() {
  const pathname = usePathname();
  const categoryKey = getFooterCategory(pathname);
  const dynamicGroup = FOOTER_CATEGORIES[categoryKey] ?? FOOTER_CATEGORIES.default;

  return (
    <>
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
    </>
  );
}
