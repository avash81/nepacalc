import React from 'react';
import { TIER1_SEO_CONTENT } from '@/data/seo-content';

interface Props {
  slug: string;
  onData: (data: {
    content?: React.ReactNode;
    faqs?: { question: string; answer: string }[];
    howToUse?: { steps: string[] };
    formula?: { title: string; description: string; latex?: string; raw?: string };
  } | null) => void;
}

// This component is intentionally a plain module — imported via next/dynamic
// so webpack treats seo-content as an async chunk, NOT part of the main client bundle.
export function SeoContentBySlug({ slug, onData }: Props) {
  const entry = TIER1_SEO_CONTENT[slug] || null;
  // Call onData synchronously during render — parent reads this via ref callback
  onData(entry);
  return null;
}

export function getSeoEntry(slug: string) {
  return TIER1_SEO_CONTENT[slug] || null;
}

