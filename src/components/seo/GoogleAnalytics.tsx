/**
 * GoogleAnalytics — Performance-First Analytics
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
    // Load after window is fully loaded and browser is idle
    const load = () => {
      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(injectGA, { timeout: 5000 });
      } else {
        setTimeout(injectGA, 3000);
      }
    };

    if (document.readyState === 'complete') {
      load();
    } else {
      window.addEventListener('load', load, { once: true });
    }

    return () => window.removeEventListener('load', load);
  }, []);

  return (
    <Suspense fallback={null}>
      <GAPageTracker />
    </Suspense>
  );
}
