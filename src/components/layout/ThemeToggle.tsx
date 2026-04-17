'use client';

import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial theme from document or localStorage
    const isDarkGlobal = document.documentElement.classList.contains('dark') || 
                         localStorage.getItem('theme') === 'dark' ||
                         (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    setIsDark(isDarkGlobal);
    if (isDarkGlobal) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    if (newDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 text-[#5F6368] hover:bg-[#F1F3F4] dark:text-gray-400 dark:hover:bg-gray-800 rounded-full transition-all group relative"
      aria-label="Toggle Theme"
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      <div className="relative w-5 h-5 overflow-hidden">
        <Sun 
          className={`w-5 h-5 absolute transition-all duration-500 ${
            isDark ? 'translate-y-[-120%] opacity-0 rotate-90' : 'translate-y-0 opacity-100 rotate-0'
          }`}
        />
        <Moon 
          className={`w-5 h-5 absolute transition-all duration-500 ${
            isDark ? 'translate-y-0 opacity-100 rotate-0' : 'translate-y-[120%] opacity-0 -rotate-90'
          }`}
        />
      </div>
    </button>
  );
}
