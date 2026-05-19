import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "Nepal Loan Eligibility Calculator 2083/84 | Bank Loan Limit | NepaCalc",
  description: "Calculate your bank loan eligibility in Nepal based on monthly income and existing EMIs. Follows NRB debt-to-income (DTI) ratio guidelines for 2083/84.",
  slug: 'nepal-loan-eligibility',
  keywords: ["loan eligibility calculator nepal", "bank loan limit nepal", "nrb dti ratio", "how much loan can i get in nepal", "home loan eligibility nepal"],
});

export default function Page() {
  return <Calculator />;
}
