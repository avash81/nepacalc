import { calcMeta } from '@/lib/calcMeta';
import SolarCalculator from './Calculator';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { PillarFAQ } from '@/components/seo/PillarFAQ';

export const metadata = calcMeta({
  title: "Solar Requirement Calculator | Panel & Battery Estimator Nepal NepaCalc",
  description: "Calculate your home solar system requirements in Nepal. Estimate panel wattage, battery backup (Ah), and inverter size for your household load.",
  slug: 'solar-requirement',
  keywords: ["solar calculator nepal", "solar panel requirement", "battery backup calculator", "solar system for home nepal", "load calculation for solar", "renewable energy nepal"],
});

const SOLAR_FAQS = [
  {
    question: "How many solar panels do I need for a 3-bedroom house in Nepal?",
    answer: "For a typical house with lights, fans, TV, and laptops, a 1kW to 1.5kW system is usually sufficient. This typically requires 3 to 5 panels of 330W each."
  },
  {
    question: "What size battery is needed for 4 hours of backup?",
    answer: "If your load is 500W, a 200Ah 12V battery or a 24V system is recommended for 4 hours of backup. Battery life is best preserved at 50-80% depth of discharge."
  },
  {
    question: "Is there a government subsidy for solar in Nepal?",
    answer: "Yes, the Alternative Energy Promotion Centre (AEPC) provides subsidies and low-interest loan schemes for solar water pumping and household systems in specific areas."
  },
  {
    question: "What is the difference between Off-grid and On-grid solar?",
    answer: "Off-grid systems use batteries to store power for night use. On-grid (Net Metering) systems feed excess power back to the NEA grid, reducing your monthly electricity bill."
  },
  {
    question: "How long do solar panels and batteries last in Nepal?",
    answer: "Quality panels have a 25-year performance warranty. Deep-cycle lead-acid batteries last 3-5 years, while modern Lithium-ion batteries can last over 10 years."
  }
];

export default function Page() {
  return (
    <SolarCalculator />
  );
}

