import React from 'react';

export interface SEOContent {
  title: string;
  description: string;
  howToUse?: { steps: string[] };
  formula?: {
    title: string;
    description: string;
    latex?: string;
    raw?: string;
  };
  content: React.ReactNode;
  faqs?: { question: string; answer: string }[];
}
