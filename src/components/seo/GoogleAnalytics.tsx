/**
 * GoogleAnalytics — Performance-First Analytics Bridge
 * 
 * Strategy: Smart Delayed Hydration.
 * We avoid loading the heavy GTM script until the user actually interacts with the page 
 * (scroll, click, or mouse move). This ensures a 100/100 Lighthouse Performance score 
 * by keeping the main thread clear for initial LCP and FCP.
 */
'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';

function GoogleAnalyticsInner({ gaId }: { gaId: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname && gaId) {
      // @ts-ignore
      if (typeof window.gtag === 'function') {
        const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');
        // @ts-ignore
        window.gtag('config', gaId, {
          page_path: url,
        });
      }
    }
  }, [pathname, searchParams, gaId]);

  return null;
}

export function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID || 'G-G78ED8CZ3D';
  const [loadAnalytics, setLoadAnalytics] = useState(false);

  useEffect(() => {
    // Delay loading analytics until first user interaction
    const handleInteraction = () => {
      setLoadAnalytics(true);
      removeListeners();
    };

    const removeListeners = () => {
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('mousemove', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };

    window.addEventListener('scroll', handleInteraction, { passive: true });
    window.addEventListener('mousemove', handleInteraction, { passive: true });
    window.addEventListener('touchstart', handleInteraction, { passive: true });
    window.addEventListener('keydown', handleInteraction, { passive: true });

    // Fallback: Load anyway after 6 seconds if no interaction
    const timer = setTimeout(() => {
      setLoadAnalytics(true);
    }, 6000);

    return () => {
      removeListeners();
      clearTimeout(timer);
    };
  }, []);

  if (!gaId) return null;

  return (
    <>
      <Suspense fallback={null}>
        <GoogleAnalyticsInner gaId={gaId} />
      </Suspense>
      {loadAnalytics && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </>
      )}
    </>
  );
}
