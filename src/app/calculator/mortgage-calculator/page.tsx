import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
export const metadata = calcMeta({
  title: 'Nepal Mortgage Calculator 2083 | Home Loan EMI & Interest',
  description: 'Calculate your Nepal home loan EMI, total interest, and repayment schedule instantly. Advanced mortgage calculator updated for 2083 bank rates.',
  slug: 'mortgage-calculator',
  keywords: ["mortgage calculator nepal", "home loan emi calculator", "nepal home loan calculator 2083", "property loan emi nepal", "housing loan calculator", "nrb home loan rules"],
});
export default function Page() { return <Calculator />; }

