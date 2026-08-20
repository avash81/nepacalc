'use client';
import { useEffect, useRef } from 'react';

/**
 * HilltopAds — 300x250 zone #7338829
 * Test deployment: Live Gold Price, Vehicle Tax, NEA Bill
 * Script host: relieved-understanding.com
 */
export function HilltopAds300x250() {
  const ref = useRef<HTMLDivElement>(null);
  const injected = useRef(false);

  useEffect(() => {
    if (injected.current || !ref.current) return;
    injected.current = true;

    const s = document.createElement('script');
    s.src =
      '//relieved-understanding.com/b/XkVKs.d-Gjld0pYFWecc/fe/mS9/utZ-U/lPkWPVT/cTzmMCzngM4/M/jgkQtZNLz/MszOOKDug/z/MUwl';
    s.async = true;
    s.referrerPolicy = 'no-referrer-when-downgrade';
    ref.current.appendChild(s);
  }, []);

  return (
    <div
      ref={ref}
      className="flex justify-center items-center my-4 no-print"
      style={{ minHeight: '250px', width: '300px', maxWidth: '100%' }}
      aria-hidden="true"
    />
  );
}
