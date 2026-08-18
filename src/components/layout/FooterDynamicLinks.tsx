'use client';
import Link from 'next/link';

const CALC_LINKS = [
  { name: 'All Calculators', href: '/calculator/' },
  { name: 'Nepal Calculators', href: '/nepal/' },
  { name: 'Finance & Investment', href: '/finance/' },
  { name: 'Math Calculators', href: '/math-tools/' },
  { name: 'Engineering Calculators', href: '/engineering/' },
  { name: 'Health Calculators', href: '/health/' },
  { name: 'Converters', href: '/converters/' },
];

export function FooterDynamicLinks() {
  return (
    <>
      <h3
        className="text-white font-black uppercase text-[9px] tracking-[0.25em] mb-5 pl-3"
        style={{ borderLeft: '2px solid #1A73E8' }}
      >
        Calculators
      </h3>
      <ul className="space-y-2.5">
        {CALC_LINKS.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="group flex items-center gap-2 text-white hover:text-white/80 transition-colors duration-150 text-[12.5px]"
            >
              <div
                className="w-1 h-1 rounded-full flex-shrink-0 bg-white opacity-70 transition-all duration-200 group-hover:opacity-100 group-hover:scale-150"
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
