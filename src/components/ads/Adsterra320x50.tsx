'use client';
import { useEffect, useRef } from 'react';

/**
 * Adsterra 320x50 Mobile Banner
 * Key: 10bde26e6c890b23721de90906d11319
 */
export function Adsterra320x50() {
  const containerRef = useRef<HTMLDivElement>(null);
  const injected = useRef(false);

  useEffect(() => {
    if (injected.current || !containerRef.current) return;
    injected.current = true;

    // Define atOptions globally for the invoke script
    if (typeof window !== 'undefined') {
      (window as any).atOptions = {
        key: '10bde26e6c890b23721de90906d11319',
        format: 'iframe',
        height: 50,
        width: 320,
        params: {}
      };
    }

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.highperformanceformat.com/10bde26e6c890b23721de90906d11319/invoke.js';
    containerRef.current.appendChild(script);
  }, []);

  return (
    <div className="adsterra-320x50 w-full flex justify-center my-4 no-print sm:hidden" aria-label="Advertisement">
      <div ref={containerRef} />
    </div>
  );
}
