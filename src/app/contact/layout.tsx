import { calcMeta } from '@/lib/calcMeta';

export const metadata = calcMeta({
  title: 'Contact Us',
  description: 'Get in touch with the NepaCalc team. We welcome your feedback, feature requests, and inquiries about our calculator suite.',
  slug: 'contact',
  keywords: ['contact nepacalc', 'nepacalc support', 'feedback'],
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
