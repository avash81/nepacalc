'use client';
import { useEffect, useRef } from 'react';

/**
 * Adsterra 160x300 Desktop Sidebar Banner
 * Key: 577da1a01aee332ee7dfd28fb0b4de3c
 */
export function Adsterra160x300() {
  const containerRef = useRef<HTMLDivElement>(null);
  const injected = useRef(false);

  useEffect(() => {
    if (injected.current || !containerRef.current) return;
    injected.current = true;

    if (typeof window !== 'undefined') {
      (window as any).atOptions = {
        key: '577da1a01aee332ee7dfd28fb0b4de3c',
        format: 'iframe',
        height: 300,
        width: 160,
        params: {}
      };
    }

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.highperformanceformat.com/577da1a01aee332ee7dfd28fb0b4de3c/invoke.js';
    containerRef.current.appendChild(script);
  }, []);

  return (
    <div className="adsterra-160x300 hidden lg:flex justify-center my-4 no-print" aria-label="Advertisement">
      <div ref={containerRef} />
    </div>
  );
}
