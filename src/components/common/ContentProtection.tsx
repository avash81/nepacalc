
'use client';
import { useEffect } from 'react';

export default function ContentProtection() {
  useEffect(() => {
    const isInput = (target: EventTarget | null) => {
      if (!target) return false;
      const el = target as HTMLElement;
      const tag = el.tagName?.toUpperCase();
      return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || el.isContentEditable;
    };

    // Prevent right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      if (isInput(e.target)) return;
      e.preventDefault();
    };

    // Prevent copy and cut shortcuts
    const handleCopy = (e: ClipboardEvent) => {
      if (isInput(e.target)) return;
      e.preventDefault();
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('copy', handleCopy);
    document.addEventListener('cut', handleCopy);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('cut', handleCopy);
    };
  }, []);

  return null;
}
