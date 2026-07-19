import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { NavbarLinks } from './NavbarLinks';
import { NavbarActions } from './NavbarActions';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white text-[#202124] z-[200] select-none border-b border-[#e8eaed] no-print shadow-sm">
      <div className="hp-container h-full flex items-center justify-between">
        
        {/* Left: Logo + Desktop Links */}
        <div className="flex items-center gap-14">
          <Link href="/" className="hover:opacity-80 transition-opacity" aria-label="NepaCalc Home">
             <Logo size="sm" theme="indigo" />
          </Link>
          
          <NavbarLinks />
        </div>

        {/* Right: Actions */}
        <NavbarActions />
      </div>
    </nav>
  );
}

