'use client';
import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  theme?: 'indigo' | 'white';
  className?: string;
}

  /* 
   * EQUALY Master Logo
   * Unified version for Navbar, Footer, and Admin.
   */
export const Logo: React.FC<LogoProps> = ({ size = 'md', theme = 'indigo', className = '' }) => {
  const isWhite = theme === 'white';
  
  const sizes = {
    sm: { glyph: 24, font: 'text-[22px]' },
    md: { glyph: 32, font: 'text-[28px]' },
    lg: { glyph: 40, font: 'text-[36px]' },
  };

  const { glyph, font } = sizes[size];

  return (
    <div className={`flex items-center gap-2 group select-none ${className}`}>
      {/* Precision Sector Symbol */}
      <div 
        className={`relative rounded-full flex items-center justify-center transition-all duration-300 overflow-hidden
                    ${isWhite ? 'bg-white group-hover:bg-[#1A73E8]' : 'bg-[#1A73E8] group-hover:bg-[#1558b0]'}`}
        style={{ width: glyph, height: glyph }}
      >
        {/* Sector Cutout */}
        <div className={`absolute inset-0 translate-x-1/2 translate-y-1/2 rotate-45 ${isWhite ? 'bg-[#202124]' : 'bg-white'}`} style={{ width: glyph, height: glyph }}></div>
      </div>
      
      {/* BRAND TEXT: NEPACALC */}
      <span className={`${font} font-black italic tracking-tighter transition-colors font-sans flex items-baseline leading-none ${isWhite ? 'text-white' : 'text-[#202124]'}`}>
        NEPACALC
      </span>
    </div>
  );
};
