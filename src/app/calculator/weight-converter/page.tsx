import { calcMeta } from '@/lib/calcMeta';
import type { Metadata } from 'next';
import WeightCalculator from './Calculator';

const baseMeta = calcMeta({
  title: "Weight Converter: Kg to Tola, Grams & Pounds",
  description: "Convert kilograms, grams, pounds, ounces and Nepal-standard tola with an online weight converter. View common conversions and estimate gold value per tola.",
  slug: 'weight-converter',
  keywords: ["weight converter nepal", "convert kg to lbs", "gram to kg calculator", "tola to gram converter", "mass converter tool", "how many tola in 1 kg", "kg to tola"],
});

export const metadata: Metadata = {
  ...baseMeta,
  title: "Weight Converter: Kg to Tola, Grams & Pounds",
  description: "Convert kilograms, grams, pounds, ounces and Nepal-standard tola with an online weight converter. View common conversions and estimate gold value per tola.",
  openGraph: {
    ...baseMeta.openGraph,
    title: "Weight Converter: Kg to Tola, Grams & Pounds",
    description: "Convert kilograms, grams, pounds, ounces and Nepal-standard tola with an online weight converter. View common conversions and estimate gold value per tola.",
    url: "https://nepacalc.com/calculator/weight-converter/",
  },
  twitter: {
    ...baseMeta.twitter,
    title: "Weight Converter: Kg to Tola, Grams & Pounds",
    description: "Convert kilograms, grams, pounds, ounces and Nepal-standard tola with an online weight converter. View common conversions and estimate gold value per tola.",
  },
  alternates: {
    canonical: "https://nepacalc.com/calculator/weight-converter/",
    languages: {
      'en-NP': "https://nepacalc.com/calculator/weight-converter/",
      'x-default': "https://nepacalc.com/calculator/weight-converter/",
    },
  },
};

export default function Page() {
  return (
    <WeightCalculator />
  );
}
