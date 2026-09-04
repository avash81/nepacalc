'use client';
import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  theme?: 'indigo' | 'white';
  className?: string;
}

  /* 
   * NepaCalc Master Logo
   * Unified version for Navbar, Footer, and Admin.
   */
export const Logo: React.FC<LogoProps> = ({ size = 'md', theme = 'indigo', className = '' }) => {
  const isWhite = theme === 'white';
  
  const sizes = {
    sm: { h: 38, font: 'text-[16px]' },
    md: { h: 48, font: 'text-[20px]' },
    lg: { h: 64, font: 'text-[28px]' },
  };

  const { h, font } = sizes[size];

  return (
    <div 
      className={`flex items-center group select-none ${className}`}
      role="img"
      aria-label="NEPACALC.COM"
    >
      <div
        className={`flex items-center justify-center rounded-lg transition-all group-hover:scale-105 ${
          isWhite
            ? 'bg-white px-2 py-1 shadow-md'
            : 'bg-transparent'
        }`}
      >
        {/* Phase 1 perf: WebP + explicit dimensions to prevent layout shift */}
        <picture>
          <source srcSet="/logo.webp" type="image/webp" />
          <img
            src="/logo.png"
            alt="NepaCalc Logo"
            className="object-contain"
            width={73}
            height={38}
            style={{
              height: h,
              width: 'auto',
              objectPosition: 'center'
            }}
          />
        </picture>
      </div>
    </div>
  );
};

