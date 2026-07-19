'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { name: 'Nepal Specific', href: '/nepal/' },
  { name: 'Finance & Tax', href: '/finance/' },
  { name: 'Math Tools', href: '/math-tools/' },
  { name: 'Converters', href: '/converters/' },
  { name: 'Health', href: '/health/' },
  { name: 'Engineering', href: '/engineering/' },
  { name: 'Market Rates', href: '/market-rates/' },
];

export function NavbarLinks() {
  const path = usePathname();

  return (
    <div className="hidden lg:flex items-center gap-2 h-16">
      {navLinks.map((link) => {
        const active = path === link.href || (link.href !== '/' && path.startsWith(link.href));
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`px-4 h-full flex items-center text-[11px] font-black uppercase tracking-[0.12em] transition-all relative group/nav ${
              active ? 'text-[#202124]' : 'text-[#5F6368] hover:text-[#202124]'
            }`}
          >
            {link.name}
            {active && <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#059669] rounded-t-full" />}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#059669] scale-x-0 group-hover/nav:scale-x-100 transition-transform origin-center duration-300 rounded-t-full" />
          </Link>
        );
      })}
    </div>
  );
}
