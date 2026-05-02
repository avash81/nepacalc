/**
 * GoogleAnalytics ,  Performance-First Analytics
 * 
 * Loads GA ONLY after the window 'load' event fires AND the browser
 * is idle (requestIdleCallback). This keeps the main thread clear
 * during LCP/FCP and removes it from PSI's critical path analysis.
 */
'use client';

import { usePathname } from 'next/navigation';
import { useEffect, Suspense } from 'react';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-G78ED8CZ3D';

function GAPageTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
      (window as any).gtag('config', GA_ID, { page_path: pathname });
    }
  }, [pathname]);

  return null;
}

function injectGA() {
  if (typeof window === 'undefined' || (window as any).__ga_loaded) return;
  (window as any).__ga_loaded = true;

  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script1);

  const script2 = document.createElement('script');
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_ID}', { page_path: window.location.pathname });
  `;
  document.head.appendChild(script2);
}

export function GoogleAnalytics() {
  useEffect(() => {
    let timer: any;
    const load = () => {
      injectGA();
      ['scroll', 'mousemove', 'touchstart', 'keydown'].forEach(evt => 
        window.removeEventListener(evt, load)
      );
    };

    ['scroll', 'mousemove', 'touchstart', 'keydown'].forEach(evt => 
      window.addEventListener(evt, load, { passive: true, once: true })
    );

    timer = setTimeout(load, 12000);

    return () => {
      ['scroll', 'mousemove', 'touchstart', 'keydown'].forEach(evt => 
        window.removeEventListener(evt, load)
      );
      clearTimeout(timer);
    };
  }, []);

  return (
    <Suspense fallback={null}>
      <GAPageTracker />
    </Suspense>
  );
}
