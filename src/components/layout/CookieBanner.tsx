'use client';
import { useState, useEffect } from 'react';
import { ShieldCheck, X } from 'lucide-react';

export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cp_cookie_consent');
    if (consent) return;
    
    let timer: any;
    const showBanner = () => {
      setShow(true);
      ['scroll', 'mousemove', 'touchstart', 'keydown'].forEach(evt => 
        window.removeEventListener(evt, showBanner)
      );
    };

    ['scroll', 'mousemove', 'touchstart', 'keydown'].forEach(evt => 
      window.addEventListener(evt, showBanner, { passive: true, once: true })
    );

    // Fallback if no interaction
    timer = setTimeout(showBanner, 12000);

    return () => {
      ['scroll', 'mousemove', 'touchstart', 'keydown'].forEach(evt => 
        window.removeEventListener(evt, showBanner)
      );
      clearTimeout(timer);
    };
  }, []);

  const accept = () => {
    localStorage.setItem('cp_cookie_consent', 'true');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 lg:left-auto lg:right-4 lg:w-[320px] z-[9999] animate-in fade-in slide-in-from-bottom-5 duration-700">
      <div className="bg-[#002147] border border-blue-800 rounded-2xl p-4 shadow-lg shadow-blue-900/40 text-blue-50">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="block text-[10px] font-black uppercase tracking-widest text-blue-400 mb-1">Privacy Compliance</span>
            <p className="text-[10px] font-medium leading-relaxed text-blue-100">
              NepaCalc uses session metadata to ensure calculation precision and analytical integrity.
              By continuing, you verify compliance with our professional privacy standards.
            </p>
          </div>
          <button
            onClick={() => setShow(false)}
            className="text-blue-200/70 hover:text-white transition-colors shrink-0"
            aria-label="Close privacy notice"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={accept}
            aria-label="Acknowledge privacy policy and continue"
            className="flex-1 bg-white text-[#002147] text-[9px] font-black uppercase tracking-widest py-2 rounded-xl hover:bg-blue-50 transition-all active:scale-[0.98]"
          >
            Acknowledge &amp; Sync
          </button>
          <a
            href="/privacy/"
            className="text-[9px] font-black uppercase tracking-widest text-blue-300 hover:text-white transition-colors px-2 underline decoration-blue-300/50 underline-offset-4"
            aria-label="Read our privacy policy"
          >
            Policy &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}

