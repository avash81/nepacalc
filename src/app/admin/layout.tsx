'use client';
import { Metadata } from 'next';
import { ReactNode, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getFirebaseAuth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function AdminRootLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const auth = getFirebaseAuth();
    if (!auth) {
      // Firebase not configured ,  allow only login page
      if (pathname !== '/admin/login') router.replace('/admin/login');
      setChecking(false);
      return;
    }

    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user && pathname !== '/admin/login') {
        router.replace('/admin/login');
      } else if (user && pathname === '/admin/login') {
        router.replace('/admin');
      }
      setChecking(false);
    });

    return () => unsub();
  }, [pathname, router]);

  if (checking) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-blue-600/20 border-t-blue-600 rounded-full animate-spin" />
          <p className="text-xs text-gray-400 font-medium">Verifying session...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

