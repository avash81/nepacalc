import { Gender, RebateResult } from './types';

export function calculateFemaleRebate(
  gender: Gender, 
  taxBeforeRebate: number
): RebateResult | null {
  if (gender !== 'female' || taxBeforeRebate <= 0) {
    return null;
  }

  const rate = 0.10;
  const amount = taxBeforeRebate * rate;

  return {
    name: 'Female Rebate',
    rate,
    amount
  };
}
