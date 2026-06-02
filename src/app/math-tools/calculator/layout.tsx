import { calcMeta } from '@/lib/calcMeta';

export const metadata = calcMeta({
  title: 'Free Online Graphing Calculator',
  description: 'Plot functions, solve equations, and visualize mathematics with our free online graphing calculator.',
  slug: 'math-tools/calculator',
  keywords: ['graphing calculator', 'online calculator', 'plot graph', 'math tools'],
});

export default function CalculatorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
