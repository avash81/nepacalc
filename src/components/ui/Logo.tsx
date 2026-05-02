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
    sm: { h: 32, font: 'text-[16px]' },
    md: { h: 42, font: 'text-[20px]' },
    lg: { h: 56, font: 'text-[28px]' },
  };

  const { h, font } = sizes[size];

  return (
    <div 
      className={`flex items-center gap-2 group select-none ${className}`}
      role="img"
      aria-label="NEPACALC.COM - Professional Nepal Calculators"
    >
      <div className="relative flex items-center justify-center overflow-hidden rounded-lg bg-white/5 backdrop-blur-sm p-1 group-hover:bg-white/10 transition-all">
        <img 
          src="/logo.png" 
          alt="NepaCalc Logo" 
          className="object-contain" 
          style={{ height: h, width: 'auto' }}
        />
      </div>
      
      <div className="flex flex-col justify-center leading-none">
        <span className={`${font} font-black tracking-tighter transition-colors font-sans text-transparent bg-clip-text bg-gradient-to-r ${isWhite ? 'from-white to-gray-300' : 'from-[#1A73E8] to-[#0D47A1]'}`}>
          NEPACALC
        </span>
        <span className="text-[8px] font-black tracking-[0.3em] uppercase opacity-60 ml-0.5">
          .COM
        </span>
      </div>
    </div>
  );
};
