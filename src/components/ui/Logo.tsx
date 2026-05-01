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
    sm: { h: 28, font: 'text-[20px]' },
    md: { h: 36, font: 'text-[24px]' },
    lg: { h: 48, font: 'text-[32px]' },
  };

  const { h, font } = sizes[size];

  return (
    <div 
      className={`flex items-center gap-2 group select-none ${className}`}
      role="img"
      aria-label="NepaCalc Logo - Professional Nepal Calculators"
    >
      <img 
        src="/logo.png" 
        alt="NepaCalc" 
        className="object-contain" 
        style={{ height: h, width: h }}
      />
      
      <span className={`${font} font-black tracking-tighter transition-colors font-sans flex items-baseline leading-none ${isWhite ? 'text-white' : 'text-[#202124]'}`}>
        NepaCalc
      </span>
    </div>
  );
};
