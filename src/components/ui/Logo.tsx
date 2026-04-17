'use client';
import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  theme?: 'indigo' | 'white';
  className?: string;
}

/**
 * NepCalc Master Logo
 * Unified version for Navbar, Footer, and Admin.
 */
export const Logo: React.FC<LogoProps> = ({ size = 'md', theme = 'indigo', className = '' }) => {
  const isWhite = theme === 'white';
  
  const sizes = {
    sm: { glyph: 20, font: 'text-lg' },
    md: { glyph: 28, font: 'text-xl' },
    lg: { glyph: 36, font: 'text-2xl' },
  };

  const { glyph, font } = sizes[size];

  return (
    <div className={`flex items-center gap-2.5 group select-none ${className}`}>
      {/* MINIMALIST LOGO SYMBOL */}
      <div 
        className={`relative rounded-lg flex items-center justify-center shadow-md transition-all duration-300
                    ${isWhite ? 'bg-white shadow-white/10 group-hover:bg-[#1A73E8]' : 'bg-[#1A73E8] shadow-blue-500/20 group-hover:bg-[#1558b0]'}`}
        style={{ width: glyph, height: glyph }}
      >
        <div className="flex flex-col justify-between" style={{ width: glyph * 0.5, height: glyph * 0.4 }}>
          <div className={`h-0.5 rounded-full w-full ${isWhite ? 'bg-slate-900' : 'bg-white'}`} />
          <div className={`h-0.5 rounded-full w-full ${isWhite ? 'bg-slate-900' : 'bg-white'}`} />
        </div>
      </div>
      
      {/* BRAND TEXT */}
      <span className={`${font} font-black tracking-tighter transition-colors font-sans overflow-hidden ${isWhite ? 'text-white' : 'text-[#202124]'}`}>
        NepCalc<span className={isWhite ? 'text-blue-400' : 'text-[#1A73E8]'}>.com</span>
      </span>
    </div>
  );
};
