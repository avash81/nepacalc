import { calcMeta } from '@/lib/calcMeta';
import type { Metadata } from 'next';
import CalorieCalculator from './Calculator';

export const metadata = calcMeta({
  title: "Calorie Calculator | Daily Needs & Weight Loss Goals Nepal NepaCalc",
  description: "Calculate your daily calorie needs for weight loss, maintenance, or muscle gain. Tailored for Nepalese lifestyles with BMR and TDEE precision.",
  slug: 'calorie-calculator',
  keywords: ["calorie calculator nepal", "daily calorie needs", "calorie deficit for weight loss", "tdee calculator nepal", "how many calories to eat", "fitness nutrition nepal"],
});

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  '@id': 'https://nepacalc.com/calculator/calorie-calculator/#breadcrumb',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://nepacalc.com/' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://nepacalc.com/calculator/' },
    { '@type': 'ListItem', position: 3, name: 'Calorie Calculator', item: 'https://nepacalc.com/calculator/calorie-calculator/' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How many calories do I need per day in Nepal?',
      acceptedAnswer: { '@type': 'Answer', text: 'This depends on your activity level. A sedentary worker in Kathmandu might need 1,800-2,000 calories, while an active trekker could require over 3,000 calories.' },
    },
    {
      '@type': 'Question',
      name: 'How many calories should I cut to lose 1kg a week?',
      acceptedAnswer: { '@type': 'Answer', text: 'To lose 1kg of fat, you need a deficit of roughly 7,700 calories. A daily deficit of 500-700 calories is generally recommended for safe, sustainable weight loss.' },
    },
    {
      '@type': 'Question',
      name: 'Do calories from Dal Bhat count differently?',
      acceptedAnswer: { '@type': 'Answer', text: 'A calorie is a unit of energy, but nutritional quality matters. Dal Bhat is a balanced meal providing sustained energy, making it superior to processed snacks.' },
    },
    {
      '@type': 'Question',
      name: 'Should I track my exercise calories separately?',
      acceptedAnswer: { '@type': 'Answer', text: 'Our calculator includes an activity factor (TDEE). While exercise burns calories, most people overestimate the burn; tracking through TDEE is more accurate.' },
    },
    {
      '@type': 'Question',
      name: 'What is the minimum calories I should eat daily?',
      acceptedAnswer: { '@type': 'Answer', text: 'Generally, men should not go below 1,500 and women below 1,200 calories without medical supervision to ensure adequate nutrient intake.' },
    },
    {
      '@type': 'Question',
      name: 'Why is the Mifflin-St Jeor equation used instead of Harris-Benedict?',
      acceptedAnswer: { '@type': 'Answer', text: 'The original Harris-Benedict equation was created in 1919 and tends to overestimate caloric needs by about 5-10%. The Mifflin-St Jeor equation, developed in 1990, accounts for modern lifestyle changes and is clinically proven to be the most accurate predictive formula for today\'s population.' },
    },
    {
      '@type': 'Question',
      name: 'Should I recalculate my calories as I lose weight?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. As your body mass decreases, the amount of energy required to sustain it also decreases. You should recalculate your TDEE for every 3 to 5 kilograms of weight lost to ensure your caloric deficit remains mathematically intact.' },
    },
    {
      '@type': 'Question',
      name: 'Why does biological sex impact the calorie calculation?',
      acceptedAnswer: { '@type': 'Answer', text: 'Due to hormonal differences, men naturally carry a higher percentage of metabolically active lean muscle mass and lower essential fat percentages than women. Muscle tissue burns significantly more calories at rest, which is reflected in the differing mathematical constants.' },
    },
    {
      '@type': 'Question',
      name: 'How long will it take to see results on a 500-calorie deficit?',
      acceptedAnswer: { '@type': 'Answer', text: 'A 500-calorie daily deficit equals a 3,500-calorie weekly deficit. Since 1 kilogram of body fat contains roughly 7,700 calories, this protocol mathematically forces your body to burn exactly 0.45 kg (1 pound) of pure fat every week.' },
    }
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <CalorieCalculator />
    </>
  );
}
