'use client';
import { useState, useEffect } from 'react';
import { ShieldCheck, X } from 'lucide-react';

export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cp_cookie_consent');
    if (consent) return;
    const timer = setTimeout(() => setShow(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const accept = () => {
    localStorage.setItem('cp_cookie_consent', 'true');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 lg:left-auto lg:right-6 lg:w-[400px] z-[9999] animate-in fade-in slide-in-from-bottom-5 duration-700">
      <div className="bg-[#002147] border border-white/10 rounded-[2rem] p-6 shadow-2xl shadow-blue-900/40 text-white">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-[12px] font-black uppercase tracking-widest text-blue-400 mb-1">Privacy Compliance</h4>
            <p className="text-[11px] font-medium leading-relaxed text-white">
              NEPACALC uses session metadata to ensure calculation precision and analytical integrity.
              By continuing, you verify compliance with our professional privacy standards.
            </p>
          </div>
          <button
            onClick={() => setShow(false)}
            className="text-white/70 hover:text-white transition-colors shrink-0"
            aria-label="Close privacy notice"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={accept}
            aria-label="Acknowledge privacy policy and continue"
            className="flex-1 bg-white text-black text-[10px] font-black uppercase tracking-widest py-3 rounded-2xl hover:bg-blue-50 transition-all active:scale-[0.98]"
          >
            Acknowledge &amp; Sync
          </button>
          <a
            href="/privacy"
            className="text-[10px] font-black uppercase tracking-widest text-white/70 hover:text-white transition-colors px-2 underline decoration-white/20 underline-offset-4"
            aria-label="Read our privacy policy"
          >
            Policy &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}
