'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Redirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/market-rates/live-gold-price');
  }, [router]);
  return null;
}
