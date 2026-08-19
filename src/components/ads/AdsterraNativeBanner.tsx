'use client';
import { useEffect, useRef } from 'react';

/**
 * Adsterra Native Banner — PRIMARY ad unit for NepaCalc
 * Key: 22d345deac799bbd1e5fd53ab5746471
 *
 * Placement: After calculator result / before How-it-works / Explanation section.
 * DO NOT place above H1, inside forms, between input controls, or before the
 * primary rate answer on Gold/Silver pages.
 */
export function AdsterraNativeBanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const injected = useRef(false);

  useEffect(() => {
    if (injected.current || !containerRef.current) return;
    injected.current = true;

    const script = document.createElement('script');
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    script.src =
      'https://pl30927103.effectivecpmnetwork.com/22d345deac799bbd1e5fd53ab5746471/invoke.js';
    containerRef.current.appendChild(script);
  }, []);

  return (
    <div className="adsterra-native w-full my-4 no-print" aria-label="Advertisement">
      <div
        ref={containerRef}
        id="container-22d345deac799bbd1e5fd53ab5746471"
      />
    </div>
  );
}
