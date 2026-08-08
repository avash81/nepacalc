'use client';
import Link from 'next/link';
import { Fragment } from 'react';

interface NepaliDatePageHeaderProps {
  currentPage: 'single' | 'bulk';
}

const TABS = [
  { key: 'single', label: 'Single Date', href: '/calculator/nepali-date/' },
  { key: 'bulk',   label: 'Bulk Convert', href: '/calculator/nepali-date/bulk/' },
] as const;

const CRUMBS_SINGLE = [
  { label: 'Home', href: '/' },
  { label: 'Calculators', href: '/nepal/' },
  { label: 'Nepali Date' },
];

const CRUMBS_BULK = [
  { label: 'Home', href: '/' },
  { label: 'Calculators', href: '/nepal/' },
  { label: 'Nepali Date', href: '/calculator/nepali-date/' },
  { label: 'Bulk Convert' },
];

const META = {
  single: {
    title: 'Nepali Date Converter',
    subtitle: 'Convert any single date between English (AD/Gregorian) and Nepali (BS/Bikram Sambat) calendars.',
  },
  bulk: {
    title: 'Nepali Date — Bulk Converter',
    subtitle: 'Paste a list, upload an Excel or CSV file, or pick from the full-year calendar to convert hundreds of dates at once.',
  },
};

export function NepaliDatePageHeader({ currentPage }: NepaliDatePageHeaderProps) {
  const crumbs = currentPage === 'single' ? CRUMBS_SINGLE : CRUMBS_BULK;
  const { title, subtitle } = META[currentPage];

  return (
    <div style={{ marginBottom: '20px' }}>
      {/* ── Breadcrumb ──────────────────────────────────────── */}
      <nav
        aria-label="Breadcrumb"
        style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '4px',
          fontSize: '12.5px',
          color: '#6b7280',
          marginBottom: '10px',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
        }}
      >
        {crumbs.map((c, i) => (
          <Fragment key={i}>
            {i > 0 && (
              <span style={{ color: '#d1d5db', userSelect: 'none' }}>/</span>
            )}
            {c.href ? (
              <Link
                href={c.href}
                style={{ color: '#6b7280', textDecoration: 'none' }}
                className="nepali-date-crumb-link"
              >
                {c.label}
              </Link>
            ) : (
              <span style={{ color: '#374151', fontWeight: 500 }}>{c.label}</span>
            )}
          </Fragment>
        ))}
      </nav>

      {/* ── H1 + Subtitle ───────────────────────────────────── */}
      <h1
        style={{
          fontFamily: 'Georgia, "Iowan Old Style", serif',
          fontSize: '26px',
          fontWeight: 700,
          color: '#0f1729',
          margin: '0 0 6px 0',
          letterSpacing: '-0.01em',
          lineHeight: 1.2,
        }}
      >
        {title}
      </h1>
      <p
        style={{
          fontSize: '14px',
          color: '#6b7280',
          margin: '0 0 16px 0',
          lineHeight: 1.5,
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
        }}
      >
        {subtitle}
      </p>

      {/* ── Tab Row ─────────────────────────────────────────── */}
      <div
        style={{
          borderBottom: '1px solid #e4e7ef',
          display: 'flex',
          gap: '0',
        }}
      >
        {TABS.map((tab) => {
          const isActive = tab.key === currentPage;
          return (
            <Link
              key={tab.key}
              href={tab.href}
              style={{
                display: 'inline-block',
                paddingBottom: '10px',
                paddingTop: '2px',
                marginRight: '26px',
                fontSize: '14.5px',
                fontWeight: 700,
                color: isActive ? '#0f1729' : '#2454d6',
                textDecoration: 'none',
                borderBottom: isActive ? '2px solid #2454d6' : '2px solid transparent',
                transition: 'color 0.12s ease',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
                whiteSpace: 'nowrap',
              }}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>

      {/* Hover styles injected once */}
      <style>{`
        .nepali-date-crumb-link:hover { text-decoration: underline; color: #2454d6 !important; }
      `}</style>
    </div>
  );
}
