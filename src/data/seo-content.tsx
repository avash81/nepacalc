import { SEOContent } from './seo/types';
import { TIER1_SEO_CONTENT as MODULAR_SEO } from './seo';

export type { SEOContent };
export const TIER1_SEO_CONTENT: Record<string, SEOContent> = MODULAR_SEO;

