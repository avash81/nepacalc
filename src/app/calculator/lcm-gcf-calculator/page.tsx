import Calculator from './Calculator';

export const metadata = {
  title: 'LCM & GCF Calculator | NEPACALC',
  description: 'Calculate the Least Common Multiple (LCM) and Greatest Common Factor (GCF/HCF) for up to 5 numbers instantly. Step-by-step mathematical tool.',

  openGraph: {
    title: 'LCM & GCF Calculator | NEPACALC',
    description: 'Calculate the Least Common Multiple (LCM) and Greatest Common Factor (GCF/HCF) for up to 5 numbers instantly. Step-by-step mathematical tool.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LCM & GCF Calculator | NEPACALC',
    description: 'Calculate the Least Common Multiple (LCM) and Greatest Common Factor (GCF/HCF) for up to 5 numbers instantly. Step-by-step mathematical tool.',
  },
};

export default function Page() {
  return <Calculator />;
}
