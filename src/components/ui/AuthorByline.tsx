import React from 'react';
import { ShieldCheck, Calendar, ExternalLink, UserCheck } from 'lucide-react';

interface SourceLink {
  label: string;
  url: string;
}

interface AuthorBylineProps {
  /** The fiscal year this content is verified for, e.g. "2083/84 (2026/27)" */
  fiscalYear?: string;
  /** Official government/authority source links */
  sources?: SourceLink[];
  /** Show the full author box or a compact version */
  compact?: boolean;
}

/**
 * AuthorByline ,  E-E-A-T Trust Component
 * Adds author credentials, last-updated date, and source citations.
 * Place at the BOTTOM of major guide pages (Tax, Salary, NEA, Land).
 */
export function AuthorByline({ fiscalYear = "2083/84 (2026/27)", sources = [], compact = false }: AuthorBylineProps) {
  // Disabled for now as per user request
  return null;
}

