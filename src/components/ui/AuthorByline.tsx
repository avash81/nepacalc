import React from 'react';
import { ShieldCheck, Calendar, ExternalLink, UserCheck } from 'lucide-react';

interface SourceLink {
  label: string;
  url: string;
}

interface AuthorBylineProps {
  /** The fiscal year this content is verified for, e.g. "2082/83 (2025/26)" */
  fiscalYear?: string;
  /** Official government/authority source links */
  sources?: SourceLink[];
  /** Show the full author box or a compact version */
  compact?: boolean;
}

/**
 * AuthorByline — E-E-A-T Trust Component
 * Adds author credentials, last-updated date, and source citations.
 * Place at the BOTTOM of major guide pages (Tax, Salary, NEA, Land).
 */
export function AuthorByline({ fiscalYear = "2082/83 (2025/26)", sources = [], compact = false }: AuthorBylineProps) {
  if (compact) {
    return (
      <div className="flex flex-wrap items-center gap-3 text-[10px] text-[#70757A] font-bold uppercase tracking-wider border-t border-[#F1F3F4] pt-3 mt-4">
        <span className="flex items-center gap-1">
          <UserCheck className="w-3 h-3 text-[#1A73E8]" />
          Verified by Avash Chaudhary
        </span>
        <span className="flex items-center gap-1">
          <Calendar className="w-3 h-3 text-[#188038]" />
          Updated for BS {fiscalYear}
        </span>
        {sources.map((s) => (
          <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1 text-[#1A73E8] hover:underline">
            <ExternalLink className="w-3 h-3" />
            {s.label}
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#DADCE0] rounded-2xl overflow-hidden shadow-sm mt-6">
      {/* Updated badge */}
      <div className="bg-[#E6F4EA] border-b border-[#CEEAD6] px-6 py-2 flex items-center gap-2">
        <Calendar className="w-3.5 h-3.5 text-[#188038]" />
        <span className="text-[10px] font-black uppercase tracking-widest text-[#188038]">
          Updated for BS {fiscalYear}
        </span>
      </div>

      <div className="p-6">
        {/* Author info */}
        <div className="flex items-start gap-4 mb-5">
          <div className="w-12 h-12 bg-[#1A73E8] rounded-full flex items-center justify-center text-white text-lg font-black shrink-0">
            A
          </div>
          <div>
            <div className="text-sm font-black text-[#202124]">Avash Chaudhary</div>
            <div className="text-[10px] text-[#5F6368] font-medium">
              Full-Stack Developer &amp; Finance Researcher · NCIT Alumni
            </div>
            <div className="flex items-center gap-1 mt-1">
              <ShieldCheck className="w-3 h-3 text-[#188038]" />
              <span className="text-[9px] font-black uppercase tracking-wider text-[#188038]">
                Verified Content
              </span>
            </div>
          </div>
        </div>

        <p className="text-[11px] text-[#5F6368] leading-relaxed mb-4">
          All calculations on NepaCalc are written, tested, and verified against official government sources.
          Data is updated annually to reflect the latest budget and regulatory changes from the Inland Revenue Department (IRD),
          Nepal Electricity Authority (NEA), Department of Land Management and Archive (DoLMA), and other authorities.
        </p>

        {/* Source Citations */}
        {sources.length > 0 && (
          <div>
            <div className="text-[9px] font-black uppercase tracking-widest text-[#70757A] mb-2">
              Official Sources
            </div>
            <div className="flex flex-wrap gap-2">
              {sources.map((s) => (
                <a
                  key={s.url}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F8F9FA] border border-[#DADCE0] rounded-full text-[10px] font-bold text-[#1A73E8] hover:bg-[#E8F0FE] transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
